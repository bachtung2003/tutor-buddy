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
  unregisteredCourses: Course[];
  setUnregisteredCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  loading: boolean;
  getAllCoursesList: () => void;
  singleCourse: Course | undefined; // Allow undefined
  setSingleCourse: React.Dispatch<React.SetStateAction<Course | undefined>>; // Allow undefined
  getCourseDetails: (course_id: string) => void;
  updateCourseInfo: (course_id: string, data: Course) => void;
  deleteCourse: (course_id: string) => Promise<void>;
  topCourses: Course[];
  setTopCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  getTopCourses: () => void;
  getAllUnregisteredCourses: () => void;
  getRegisteredCourses: () => void;
};

const CourseContext = createContext<CourseContext | null>(null);

export function CourseContextProvider({
  children,
}: CourseContextProviderProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [unregisteredCourses, setUnregisteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [singleCourse, setSingleCourse] = useState<Course>();
  const [topCourses, setTopCourses] = useState<Course[]>([]);
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
  const updateCourseInfo = (course_id: string, data: Course) => {
    GlobalApi.updateCourse(course_id, data).then((resp: any) => {
      setSingleCourse(resp.data);
    });
  };
  const deleteCourse = async (course_id: string) => {
    try {
      await GlobalApi.deleteCourse(course_id);
      // Update the courses array by filtering out the deleted course
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.course_id !== Number(course_id))
      );
      console.log(`Course with id ${course_id} has been deleted.`);
    } catch (error) {
      console.error("Error deleting the course:", error);
    }
  };
  const getTopCourses = () => {
    GlobalApi.getTopCourse().then((resp: any) => {
      setTopCourses(resp.data);
    });
  };
  const getAllUnregisteredCourses = () => {
    GlobalApi.getAllUnregisteredCourses().then((resp: any) => {
      setUnregisteredCourses(resp.data);
    });
  };
  const getRegisteredCourses = () => {
    GlobalApi.getAllRegisteredCourses().then((resp: any) => {
      setCourses(resp.data);
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
        updateCourseInfo,
        deleteCourse,
        topCourses,
        setTopCourses,
        getTopCourses,
        getAllUnregisteredCourses,
        getRegisteredCourses,
        unregisteredCourses,
        setUnregisteredCourses,
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
