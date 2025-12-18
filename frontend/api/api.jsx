import axios from "axios";

// The property should be 'baseURL' (not 'baseUrl'), and ensure REACT_APP_BACKEND_URL is used since React only exposes env vars prefixed with REACT_APP_ by default
const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
})

export default api;