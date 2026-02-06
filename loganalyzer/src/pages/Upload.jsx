import './Upload.css';
import { useState } from "react";
import { uploadLog } from "../api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
  if (!file) {
    alert("Select a file 📄");
    return;
  }

  const email = localStorage.getItem("email");

  if (!email) {
    alert("Please login again");
    return;
  }

  try {
    setLoading(true);
    await uploadLog(file, email);
    alert("Upload successful ✅");
  } catch (err) {
    alert("Upload failed ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="upload-page">
      <h1>📤 Upload Log File</h1>

      <div className="upload-box">
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="file"
          accept=".log,.txt"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload 🚀"}
        </button>
      </div>
    </div>
  );
}
