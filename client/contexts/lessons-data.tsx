"use client";
import GlobalApi from "@/services/globalApi";
import { createContext, useContext, useEffect, useState } from "react";

type LessonContextProviderProps = {
  children: React.ReactNode;
};

export type Lesson = {
  lesson_id: number;
  course_id: number;
  title: string;
  description: string;
  lesson_url: string;
};

type LessonContext = {
  lessons: Lesson[]; // An array of Class objects
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
  loading: boolean;
  getAllLessonsList: (course_id: string) => void;
  addLesson: (data: Lesson) => void;
};

const LessonContext = createContext<LessonContext | null>(null);

export function LessonContextProvider({
  children,
}: LessonContextProviderProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getAllLessonsList = (course_id: string) => {
    setLoading(true); // Start loading
    GlobalApi.getAllLesson(course_id)
      .then((resp: any) => {
        setLessons(resp.data);
      })
      .finally(() => {
        setLoading(false); // Stop loading once the API call completes
      });
  };
  const addLesson = (data: Lesson) => {
    GlobalApi.addLesson(data).then((resp: any) => {
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        setLessons((prevLessons) => [...prevLessons, resp.data]);
      }
    });
  };

  return (
    <LessonContext.Provider
      value={{ lessons, setLessons, getAllLessonsList, addLesson, loading }}
    >
      {children}
    </LessonContext.Provider>
  );
}

export const useLessonContext = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error(
      "useLessonContext must be used within a LessonContextProvider"
    );
  }
  return context;
};
