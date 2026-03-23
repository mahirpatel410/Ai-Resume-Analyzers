require("dotenv").config();

const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

// ✅ Gemini import
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY); // your Gemini key

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("🚀 API HIT");

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    console.log("📄 Extracted:", text.substring(0, 100));

    // ✅ SAFE MODEL (WORKS)
    const model = genAI.getGenerativeModel({
      model: "gemini-pro"
    });

    const result = await model.generateContent(
      `Analyze this resume and give:
1. Score out of 100
2. Strengths
3. Weaknesses
4. Suggestions

Resume:
${text}`
    );

    const analysis = result.response.text();

    res.json({
      message: "Success",
      analysis
    });

  } catch (err) {
    console.log("❌ ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});