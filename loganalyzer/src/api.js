import axios from "axios";

// ===============================
// AXIOS INSTANCE
// ===============================
const API = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: false, // no cookies, no token
});

// ===============================
// AUTH APIs
// ===============================
export const signup = async (userData) => {
  return await API.post("/auth/signup", userData);
};

export const login = async (userData) => {
  return await API.post("/auth/login", userData);
};

// ===============================
// LOG APIs
// ===============================
export const uploadLog = async (file, email) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  return await API.post("/logs/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getLogs = async (email) => {
  return await API.get(`/logs/${email}`);
};

export default API;
