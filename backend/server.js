
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

// Diagnostic information
console.log("========================================");
console.log("FARMITRA SERVER FILE:", __filename);
console.log("FARMITRA WORKING DIRECTORY:", process.cwd());
console.log("========================================");

const connectDB = require("./config/db");

// Existing routes
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const farmRoutes = require("./routes/farmRoutes");
const cropRoutes = require("./routes/cropRoutes");
const irrigationRoutes = require("./routes/irrigationRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const chatRoutes = require("./routes/chatRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const fertilizerRoutes = require("./routes/fertilizerRoutes");
const marketRoutes = require("./routes/marketRoutes");

// Initialize Express
const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Home route
app.get("/", (req, res) => {
  res.send("FARMITRA Backend is Running!");
});

// Health check
app.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "Hello FARMITRA"
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/crop", cropRoutes);
app.use("/api/crop-ai", cropRoutes);
app.use("/api/irrigation", irrigationRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/fertilizer", fertilizerRoutes);
app.use("/api/market", marketRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    requestedURL: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("FARMITRA SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`FARMITRA Backend running on http://localhost:${PORT}`);
});
