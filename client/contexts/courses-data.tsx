"use client";
import GlobalApi from "@/services/globalApi";
import { createContext, useContext, useEffect, useState } from "react";

type CourseContextProviderProps = {
  children: React.ReactNode;
};

export type Course = {
  course_id: number;
  title: string;
  language: string;
  objective: string;
  description: string;
  teacher_id: number;
  status: string;
  thumb_img: string;
};

type CourseContext = {
  courses: Course[]; // An array of Class objects
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  loading: boolean;
  getAllCoursesList: () => void;
  singleCourse: Course | undefined; // Allow undefined
  setSingleCourse: React.Dispatch<React.SetStateAction<Course | undefined>>; // Allow undefined
  getCourseDetails: (course_id: string) => void;
};

const CourseContext = createContext<CourseContext | null>(null);

export function CourseContextProvider({
  children,
}: CourseContextProviderProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [singleCourse, setSingleCourse] = useState<Course>();
  const getAllCoursesList = () => {
    setLoading(true); // Start loading
    GlobalApi.getAllCourse()
      .then((resp: any) => {
        setCourses(resp.data);
      })
      .finally(() => {
        setLoading(false); // Stop loading once the API call completes
      });
  };
  const getCourseDetails = (course_id: string) => {
    GlobalApi.getCourseDetails(course_id).then((resp: any) => {
      setSingleCourse(resp.data);
    });
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        getAllCoursesList,
        loading,
        singleCourse,
        setSingleCourse,
        getCourseDetails,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error(
      "useCourseContext must be used within a CourseContextProvider"
    );
  }
  return context;
}
