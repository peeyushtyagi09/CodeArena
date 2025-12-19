import axios from "axios";

// Vite uses import.meta.env for environment variables, prefixed with VITE_
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL: `${BACKEND_URL}/auth`, 
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    res => res, 
    async err => {
        if(err.response?.status === 401) {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) return Promise.reject(err);
            
            try {
                const r = await axios.post(
                    `${BACKEND_URL}/auth/token/refresh`,
                    {token: refreshToken}
                );
                localStorage.setItem("accessToken", r.data.accessToken);
                localStorage.setItem("refreshToken", r.data.refreshToken);

                err.config.headers.Authorization = `Bearer ${r.data.accessToken}`;
                return axios(err.config);
            }catch {
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(err);
    }
);

export default api;