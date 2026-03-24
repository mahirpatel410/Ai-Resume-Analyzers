import React, { useState } from "react";
import API from "../api";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false); // ✅ ADDED

  const uploadResume = async () => {
    if (!file) {
      alert("Select file first");
      return;
    }

    setLoading(true); // ✅ START LOADING

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await API.post("/api/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setAnalysis(res.data.analysis);

    } catch (err) {
      console.log("Error:", err);
      alert("Upload failed");
    }

    setLoading(false); // ✅ STOP LOADING
  };

  return (
    <div style={{
      maxWidth: "700px",
      margin: "50px auto",
      fontFamily: "Arial",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#2c3e50" }}>🚀 AI Resume Analyzer</h1>

      <div style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#fafafa"
      }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <br /><br />

        <button
          onClick={uploadResume}
          style={{
            padding: "10px 20px",
            background: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Upload & Analyze
        </button>

        {/* ✅ LOADING MESSAGE */}
        {loading && <p style={{ marginTop: "10px" }}>⏳ Analyzing resume...</p>}
      </div>

      {/* ✅ RESULT */}
      {analysis && (
        <div style={{
          marginTop: "30px",
          padding: "20px",
          background: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          textAlign: "left"
        }}>
          <h2>📊 AI Analysis</h2>

          <pre style={{
            whiteSpace: "pre-wrap",
            fontSize: "14px"
          }}>
            {analysis}
          </pre>
        </div>
      )}
    </div>
  );
}

export default UploadResume;