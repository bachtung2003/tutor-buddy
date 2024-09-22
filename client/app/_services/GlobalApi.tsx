import axios from "axios";

// Define base URL dynamically if necessary (depending on Docker setup or different environment URLs)
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";
// Define the type based on the model
type ClassData = {
  id?: number; // Optional because it may be auto-generated by the database
  class: string;
};

type UserData = {
  username: string;
  password: string;
};

// Axios instance with base URL
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const getAllClass = () => apiInstance.get("/classupdate");

const addClass = (data: ClassData) => apiInstance.post("/classupdate", data);

// Function to get class details by ID
const getClassDetails = (id: string) => apiInstance.get(`/classupdate/${id}`);

const getAllStudents = () => apiInstance.get("/studentupdate");

const addStudent = (data: any) =>
  apiInstance.post("/studentupdate", data, {
    headers: { accessToken: sessionStorage.getItem("accessToken") || "" },
  });

const getStudentDetails = (id: string) =>
  apiInstance.get(`/studentupdate/${id}`);

const registerUser = (data: UserData) => apiInstance.post("/auth", data);

const loginUser = (data: UserData) => apiInstance.post("/auth/login", data);

export default {
  getAllClass,
  addClass,
  getClassDetails,
  getAllStudents,
  addStudent,
  getStudentDetails,
  registerUser,
  loginUser,
};
