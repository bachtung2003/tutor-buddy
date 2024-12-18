"use client";
import GlobalApi from "@/services/globalApi";
import { createContext, useContext, useEffect, useState } from "react";

type StudentCourseContextProviderProps = {
  children: React.ReactNode;
};

export type StudentCourses = {
  student_course_id?: number;
  student_id: number;
  course_id: number;
  completion_status?: boolean;
};

export type Student = {
  address: string;
  phone: string;
  email: string;
  username: string;
  course: string;
};

type StudentCourseContext = {
  signupCourse: StudentCourses[];
  setSignupCourse: React.Dispatch<React.SetStateAction<StudentCourses[]>>;
  addStudentCourse: (data: StudentCourses) => void;
  deleteRegisteredCourse: (course_id: string) => boolean;
  getAllRegisteredCourses: () => void;
  getStudentListPerTeacher: () => void;
  registeredStudents: Student[];
  setRegisteredStudents: React.Dispatch<React.SetStateAction<Student[]>>;
};

const StudentCourseContext = createContext<StudentCourseContext | null>(null);

export function StudentCourseContextProvider({
  children,
}: StudentCourseContextProviderProps) {
  const [signupCourse, setSignupCourse] = useState<StudentCourses[]>([]);
  const [registeredStudents, setRegisteredStudents] = useState<Student[]>([]);

  const getAllRegisteredCourses = () => {
    GlobalApi.getAllRegisteredCourses().then((resp: any) => {
      setSignupCourse(resp.data);
    });
  };

  const addStudentCourse = (data: StudentCourses) => {
    GlobalApi.addStudentCourse(data).then((resp: any) => {
      console.log(resp.data);
    });
  };

  const deleteRegisteredCourse = (course_id: string) => {
    try {
      GlobalApi.deleteRegisteredCourse(course_id).then((resp: any) => {
        console.log(resp.data);
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getStudentListPerTeacher = () => {
    GlobalApi.getStudentListPerTeacher().then((resp: any) => {
      const result: any = [];
      resp.data.forEach(
        (student: {
          courses: any[];
          user_id: any;
          username: any;
          address: any;
          email: any;
          phone: any;
        }) => {
          student.courses.forEach((course) => {
            result.push({
              user_id: student.user_id,
              username: student.username,
              address: student.address,
              email: student.email,
              phone: student.phone,
              course: course,
            });
          });
        }
      );
      setRegisteredStudents(result);
    });
  };

  return (
    <StudentCourseContext.Provider
      value={{
        signupCourse,
        setSignupCourse,
        addStudentCourse,
        deleteRegisteredCourse,
        getAllRegisteredCourses,
        getStudentListPerTeacher,
        registeredStudents,
        setRegisteredStudents,
      }}
    >
      {children}
    </StudentCourseContext.Provider>
  );
}

export function useStudentCourseContext() {
  const context = useContext(StudentCourseContext);
  if (!context) {
    throw new Error(
      "useCourseContext must be used within a CourseContextProvider"
    );
  }
  return context;
}
