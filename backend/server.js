const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ✅ CORS (only once)
app.use(cors({
  origin: "https://ai-resume-analyzers-ebon.vercel.app",
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/dashboard"));
app.use("/api/resume", require("./routes/resumeRoutes"));

// ✅ Single test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ PORT FIX (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

// Start server AFTER DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch(err => {
    console.log("DB Connection Error:", err);
  });