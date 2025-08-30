// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {});
//         console.log("MongoDB Connected")
//     }
//     catch (err) {
//         console.error(" Error connecting to mongodb ", err);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Log DB URI in development (not in production)
    if (process.env.NODE_ENV !== "production") {
      console.log("Connecting to MongoDB URI:", process.env.MONGO_URI);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
