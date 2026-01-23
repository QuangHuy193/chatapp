import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3456/api"
      : "/api",
  withCredentials: true,
});

// gắn token vô req gửi đi
api.interceptors.request.use((config) => {
  // chỉ lấy tại thời điểm này, không thay đổi
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
export default api;
