require("dotenv").config();

const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

// ✅ MULTER SETUP
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// ✅ ROUTE
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("🚀 API HIT");

    // ✅ CHECK FILE
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ READ PDF
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text || "";

    console.log("📄 Extracted:", text.substring(0, 100));

    // ✅ SAFE WORD COUNT
    const words = text.trim().split(/\s+/).length;

    // ✅ BETTER SCORE LOGIC
    const score = Math.min(60 + words / 5, 100).toFixed(1);

    // ✅ PROFESSIONAL OUTPUT
    const analysis = `
📊 Resume Score: ${score} / 100

🔥 Strengths:
✔ Resume contains ${words} words
✔ Good basic structure

⚠️ Improvements:
➤ Add more real-world projects
➤ Add technical skills section
➤ Improve formatting & readability
➤ Use bullet points for clarity
`;

    // ✅ RESPONSE
    res.json({ analysis });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;