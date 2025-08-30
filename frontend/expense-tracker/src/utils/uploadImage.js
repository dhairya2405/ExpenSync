import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(imageFile.type)) {
        throw new Error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (imageFile.size > maxSize) {
        throw new Error('Image size must be less than 5MB');
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 30000, // 30 seconds timeout for image upload
        });

        // Return the Cloudinary URL and additional data
        return {
            imageUrl: response.data.imageUrl,
            publicId: response.data.publicId,
            message: response.data.message
        };
    }
    catch (error) {
        console.error('Error uploading image:', error);
        
        // Provide more specific error messages
        if (error.response?.status === 400) {
            throw new Error(error.response.data.message || 'Invalid image file');
        } else if (error.response?.status === 500) {
            throw new Error('Server error while uploading image. Please try again.');
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('Upload timeout. Please check your connection and try again.');
        } else {
            throw new Error('Failed to upload image. Please try again.');
        }
    }
};

export default uploadImage;