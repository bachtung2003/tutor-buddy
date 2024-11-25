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
};

const CourseContext = createContext<CourseContext | null>(null);

export function CourseContextProvider({
  children,
}: CourseContextProviderProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  return (
    <CourseContext.Provider
      value={{ courses, setCourses, getAllCoursesList, loading }}
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
