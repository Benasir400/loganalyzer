import { useState } from "react";
import { uploadLog } from "../api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      await uploadLog(formData);
      alert("Log uploaded");
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}
