// GlobalApi.tsx
import apiInstance from "@/utils/apiInstance";
import { setAuthToken, setRefreshToken } from "@/utils/auth";

type ClassData = {
  id?: number;
  class: string;
};

type UserData = {
  username: string;
  password: string;
  role: string;
};

type CourseData = {
  course_id?: number;
  title: string;
  objective: string;
  description: string;
  status: string;
  thumb_img: string;
};

const getAllClass = () => apiInstance.get("/classupdate");

const addClass = (data: ClassData) => apiInstance.post("/classupdate", data);

const getClassDetails = (id: string) => apiInstance.get(`/classupdate/${id}`);

const getAllStudents = () => apiInstance.get("/studentupdate");

const addStudent = (data: any) => apiInstance.post("/studentupdate", data);

const getStudentDetails = (id: string) =>
  apiInstance.get(`/studentupdate/${id}`);

const registerUser = (data: UserData) =>
  apiInstance.post("/auth", data).then((resp) => resp);

const loginUser = (data: UserData) =>
  apiInstance.post("/auth/login", data).then((resp) => {
    setAuthToken(resp.data.accessToken);
    setRefreshToken(resp.data.refreshToken);
    return resp;
  });

//Courses
const getAllCourse = () => apiInstance.get("/courseupdate");
const addCourse = (data: CourseData) => apiInstance.post("/courseupdate", data);

//Lessons
const getAllLesson = (courseId: string) =>
  apiInstance.get(`/lessonupdate/${courseId}`);

export default {
  getAllClass,
  addClass,
  getClassDetails,
  getAllStudents,
  addStudent,
  getStudentDetails,
  registerUser,
  loginUser,
  addCourse,
  getAllCourse,
  getAllLesson,
};
