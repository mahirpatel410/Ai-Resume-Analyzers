import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {

  const [data, setData] = useState(null);
  const [result, setResult] = useState("");

  // 🔐 Get dashboard data
  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get("/dashboard", {
      headers: {
        Authorization: token
      }
    })
    .then(res => setData(res.data))
    .catch(err => {
      console.log("Dashboard error:", err.response?.data || err.message);
    });

  }, []);

  // 📄 Upload Resume
  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const res = await API.post("/upload", formData, {
        headers: {
          Authorization: token   // ✅ ONLY this header
        }
      });

      console.log("SUCCESS:", res.data);
      setResult(res.data.text || "No text returned");

    } catch (err) {
      console.log("UPLOAD ERROR:", err.response?.data || err.message);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Dashboard</h2>

      {/* 🔐 User Data */}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}

      {/* 📄 Upload Section */}
      <h3>Upload Resume</h3>
      <input type="file" onChange={upload} />

      {/* 📊 Result */}
      <h3>Extracted Text:</h3>
      <pre>{result}</pre>

    </div>
  );
}

export default Dashboard;