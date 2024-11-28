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

//Lessons
const getAllLesson = (course_id: string) =>
  apiInstance.get(`/lessonupdate/${course_id}`);
const addLesson = (data: LessonData) =>
  apiInstance.post("/lessonupdate", data).then((response) => response);

//Assignments
const getAllAssignment = (lesson_id: string) =>
  apiInstance.get(`/assignmentupdate/${lesson_id}`);
const addAssignment = (data: AssignmentData | AssignmentData[]) => {
  // Ensure data is always treated as an array
  const assignmentsToAdd = Array.isArray(data) ? data : [data];

  // Send the API request for the list of assignments
  return apiInstance.post("/assignmentupdate", assignmentsToAdd);
};

// // Answers
// const getAllAnswers = (assignmentId: string) =>
//   apiInstance.get(`/answers/${assignmentId}`);
// const addAnswer = (data: AnswerData) => apiInstance.post("/answers", data);
// const updateAnswer = (answerId: string, data: Partial<AnswerData>) =>
//   apiInstance.put(`/answers/${answerId}`, data);
// const deleteAnswer = (answerId: string) =>
//   apiInstance.delete(`/answers/${answerId}`);

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
  getAllLesson,
  addLesson,
  // getAllAnswers,
  // addAnswer,
  // updateAnswer,
  // deleteAnswer,
  getAllAssignment,
  addAssignment,
};
