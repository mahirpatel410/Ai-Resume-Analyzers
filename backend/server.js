const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors({
  origin: "https://ai-resume-analyzers-ebon.vercel.app",
  credentials: true
}));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/dashboard")); // ✅ only once
app.use("/api/resume", require("./routes/resumeRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server AFTER DB connection
connectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => {
    console.log("DB Connection Error:", err);
  });