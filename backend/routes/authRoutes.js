const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Upload to Cloudinary using buffer
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "expense-tracker/profile-images", // Organize images in folders
                    transformation: [
                        { width: 400, height: 400, crop: "fill" }, // Resize and crop to square
                        { quality: "auto" }, // Auto optimize quality
                        { format: "auto" } // Auto choose best format
                    ]
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(req.file.buffer);
        });

        res.status(200).json({ 
            imageUrl: result.secure_url,
            publicId: result.public_id,
            message: "Image uploaded successfully"
        });

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        res.status(500).json({ 
            message: "Error uploading image to cloud storage",
            error: error.message 
        });
    }
});

module.exports = router;
