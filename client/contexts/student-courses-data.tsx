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

type StudentCourseContext = {
  signupCourse: StudentCourses[];
  setSignupCourse: React.Dispatch<React.SetStateAction<StudentCourses[]>>;
  addStudentCourse: (data: StudentCourses) => void;
  deleteRegisteredCourse: (course_id: string) => boolean;
  getAllRegisteredCourses: () => void;
};

const StudentCourseContext = createContext<StudentCourseContext | null>(null);

export function StudentCourseContextProvider({
  children,
}: StudentCourseContextProviderProps) {
  const [signupCourse, setSignupCourse] = useState<StudentCourses[]>([]);

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
  return (
    <StudentCourseContext.Provider
      value={{
        signupCourse,
        setSignupCourse,
        addStudentCourse,
        deleteRegisteredCourse,
        getAllRegisteredCourses,
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
