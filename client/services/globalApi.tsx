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

type StudentCourseData = {
  student_course_id?: number;
  student_id: number;
  course_id: number;
  completion_status?: boolean;
};

type LessonData = {
  course_id: number;
  title: string;
  description: string;
  lesson_url: string;
  duration: number;
};

type AssignmentData = {
  assignment_id: number;
  lesson_id: number;
  title: string;
  answers: AnswerData[];
};

type AnswerData = {
  answer_id?: number;
  assignment_id: number;
  text: string;
  isCorrect: boolean;
};

type Scores = {
  score_id?: number;
  student_id?: number;
  course_id: number;
  lesson_id: number;
  score: number;
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
const getCourseDetails = (course_id: string) =>
  apiInstance.get(`/courseupdate/${course_id}`);
const updateCourse = (course_id: string, data: CourseData) =>
  apiInstance.put(`/courseupdate/${course_id}`, data);
const deleteCourse = (course_id: string) => {
  return apiInstance.delete(`/courseupdate/${course_id}`);
};
const getTopCourse = () => apiInstance.get("/courseupdate/sorted/top-3");
const getAllUnregisteredCourses = () =>
  apiInstance.get("/courseupdate/unregistered/all-courses");

//StudentCourses
const getAllRegisteredCourses = () => apiInstance.get("/studentcourseupdate");
const addStudentCourse = (data: StudentCourseData) =>
  apiInstance.post("/studentcourseupdate", data);
const deleteRegisteredCourse = (course_id: string) =>
  apiInstance.delete(`/studentcourseupdate/${course_id}`);

//Lessons
const getLessons = () => apiInstance.get("/lessonupdate");
const getAllLesson = (course_id: string) =>
  apiInstance.get(`/lessonupdate/${course_id}`);
const addLesson = (data: LessonData) =>
  apiInstance.post("/lessonupdate", data).then((response) => response);
const getSingleLesson = (lesson_id: string) =>
  apiInstance.get(`/lessonupdate/getlesson/${lesson_id}`);
const updateLesson = (lesson_id: string, data: LessonData) =>
  apiInstance.put(`/lessonupdate/${lesson_id}`, data);

//Assignments
const getAllAssignment = (lesson_id: string) =>
  apiInstance.get(`/assignmentupdate/${lesson_id}`);
const addAssignment = (data: AssignmentData | AssignmentData[]) => {
  // Ensure data is always treated as an array
  const assignmentsToAdd = Array.isArray(data) ? data : [data];
  // Send the API request for the list of assignments
  return apiInstance.post("/assignmentupdate", assignmentsToAdd);
};

// Scores
const getAllScores = () => apiInstance.get("/scoresupdate/all");
const addLessonScore = (data: Scores) =>
  apiInstance.post("/scoresupdate", data);
const getCourseScore = (course_id: string) =>
  apiInstance.get(`/scoresupdate/${course_id}`);
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
  getCourseDetails,
  updateCourse,
  deleteCourse,
  getTopCourse,
  getAllUnregisteredCourses,
  getAllRegisteredCourses,
  addStudentCourse,
  deleteRegisteredCourse,
  getLessons,
  getAllLesson,
  addLesson,
  getSingleLesson,
  updateLesson,
  getAllAssignment,
  addAssignment,
  addLessonScore,
  getCourseScore,
  getAllScores,
};
