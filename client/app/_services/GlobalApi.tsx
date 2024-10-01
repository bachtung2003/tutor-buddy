import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

type ClassData = {
  id?: number;
  class: string;
};

type UserData = {
  username: string;
  password: string;
  role: string;
};

// Axios instance with base URL
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Set access token in cookie
const setAuthToken = (token: string) => {
  Cookies.set("accessToken", token, {
    expires: 7, // Expire after 7 days
    secure: process.env.NODE_ENV === "production", // Use secure cookie in production
    sameSite: "Strict", // Prevent CSRF
  });
};

// Set refresh token in an HTTP-only cookie
const setRefreshToken = (token: string) => {
  Cookies.set("refreshToken", token, {
    expires: 7, // Expire after 7 days
    secure: process.env.NODE_ENV === "production", // Use secure cookie in production
    sameSite: "Strict",
    httpOnly: true, // Make this cookie HTTP-only
  });
};

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
      const refreshToken = Cookies.get("refreshToken"); // Get refresh token from cookies

      if (refreshToken) {
        try {
          // Request a new access token using the refresh token
          const { data } = await axios.post("/auth/token", { refreshToken });
          Cookies.set("accessToken", data.accessToken); // Store the new access token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`; // Retry with new token
          return apiInstance(originalRequest); // Retry the original request
        } catch (err) {
          Cookies.remove("accessToken"); // Remove tokens if refresh failed
          Cookies.remove("refreshToken");
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

const getSession = () => {
  const session = Cookies.get("accessToken");
  if (!session) return null;
  return jwtDecode(session);
};

const getAllClass = () => apiInstance.get("/classupdate");

const addClass = (data: ClassData) => apiInstance.post("/classupdate", data);

const getClassDetails = (id: string) => apiInstance.get(`/classupdate/${id}`);

const getAllStudents = () => apiInstance.get("/studentupdate");

const addStudent = (data: any) => apiInstance.post("/studentupdate", data);

const getStudentDetails = (id: string) =>
  apiInstance.get(`/studentupdate/${id}`);

const registerUser = (data: UserData) =>
  apiInstance.post("/auth", data).then((resp) => {
    return resp;
  });

const loginUser = (data: UserData) =>
  apiInstance.post("/auth/login", data).then((resp) => {
    setAuthToken(resp.data.accessToken); // Store token in cookie
    setRefreshToken(resp.data.refreshToken); // Store token in cookie
    return resp;
  });

export default {
  getSession,
  getAllClass,
  addClass,
  getClassDetails,
  getAllStudents,
  addStudent,
  getStudentDetails,
  registerUser,
  loginUser,
};
