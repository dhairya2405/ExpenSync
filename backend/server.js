// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const incomeRoutes = require("./routes/incomeRoutes");
// const expenseRoutes = require("./routes/expenseRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");

// const app = express();

// // Enhanced CORS configuration for Vercel deployment
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (mobile apps, curl requests, etc.)
//     if (!origin) return callback(null, true);
    
//     const allowedOrigins = [
//       "https://expen-sync.vercel.app",
//       "http://localhost:3000",
//       "http://localhost:5173", // Vite dev server
//       process.env.CLIENT_URL
//     ].filter(Boolean); // Remove any undefined values
    
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204 // Some legacy browsers choke on 204
// };

// app.use(cors(corsOptions));

// // Handle preflight requests explicitly
// app.options("*", cors(corsOptions));

// // Additional middleware to handle CORS issues
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   console.log(`Request from origin: ${origin}, method: ${req.method}, path: ${req.path}`);
  
//   res.header('Access-Control-Allow-Origin', 'https://expen-sync.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
//   res.header('Access-Control-Allow-Credentials', 'true');
  
//   // Handle preflight requests
//   if (req.method === 'OPTIONS') {
//     console.log('Handling OPTIONS preflight request');
//     res.sendStatus(204);
//   } else {
//     next();
//   }
// });

// app.use(express.json()); // Parse JSON body

// connectDB();

// // Health check endpoint
// app.get("/", (req, res) => {
//   res.json({ 
//     message: "Expense Tracker API is running!", 
//     timestamp: new Date().toISOString(),
//     cors: "enabled"
//   });
// });

// // API health check
// app.get("/api/health", (req, res) => {
//   res.json({ 
//     status: "healthy", 
//     timestamp: new Date().toISOString(),
//     cors: {
//       origin: req.headers.origin,
//       method: req.method
//     }
//   });
// });

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/income", incomeRoutes);
// app.use("/api/v1/expense", expenseRoutes);
// app.use("/api/v1/dashboard", dashboardRoutes);

// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend is working!" });
// });

// // Note: Local uploads folder removed - now using Cloudinary for image storage

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Enhanced CORS configuration for Vercel deployment
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "https://expen-sync-frontend.vercel.app", // your frontend
      "http://localhost:3000",
      "http://localhost:5173", // vite dev
      process.env.CLIENT_URL
    ].filter(Boolean);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(`Request from origin: ${origin}, method: ${req.method}, path: ${req.path}`);

  res.header("Access-Control-Allow-Origin", "https://expen-sync-frontend.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

// connect DB
connectDB();

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API is running!",
    timestamp: new Date().toISOString(),
    cors: "enabled"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    cors: {
      origin: req.headers.origin,
      method: req.method
    }
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// ❌ remove app.listen (Vercel handles it)
// ✅ export app instead
module.exports = app;
