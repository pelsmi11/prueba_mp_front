import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "https://prueba-mp-backend-834460423898.us-central1.run.app/api/v1/",
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
