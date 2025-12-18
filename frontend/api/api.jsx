import axios from "axios";

// Vite uses import.meta.env for environment variables, prefixed with VITE_
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
    withCredentials: true,
})

export default api;