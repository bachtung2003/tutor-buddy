// apiInstance.ts
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
  headers: { "Content-Type": "application/json" },
});

// Axios request interceptor to add token from cookie to requests
apiInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Axios response interceptor to check if token is expired or invalid
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/token`, {
            refreshToken,
          });
          Cookies.set("accessToken", data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return apiInstance(originalRequest); // Retry with new token
        } catch (err) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
