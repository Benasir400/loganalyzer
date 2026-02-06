import axios from "axios";

// ===============================
// AXIOS INSTANCE
// ===============================
const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ===============================
// AUTH APIs
// ===============================
export const signup = (userData) => {
  return API.post("/auth/signup", userData);
};

export const login = (userData) => {
  return API.post("/auth/login", userData);
};

// ===============================
// LOG APIs  ✅ FIXED
// ===============================
export const uploadLog = (file, email) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  // ⚠️ DO NOT SET HEADERS
  return API.post("/logs/upload", formData);
};

export const getLogs = (email) => {
  return API.get(`/logs/${email}`);
};
export const exportReport = (email) => {
  return API.get(`/logs/export/${email}`, {
    responseType: "blob"
  });
};


export default API;
