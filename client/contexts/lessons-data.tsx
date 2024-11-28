"use client";
import GlobalApi from "@/services/globalApi";
import { createContext, useContext, useEffect, useState } from "react";

type LessonContextProviderProps = {
  children: React.ReactNode;
};

export type Lesson = {
  course_id: number;
  title: string;
  description: string;
  lesson_url: string;
  lesson_id?: number; // Optional as it's generated by the server
  createdAt?: Date;
  updatedAt?: Date;
  duration: number;
};

type LessonContext = {
  lessons: Lesson[]; // An array of Lesson objects
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
  loading: boolean;
  getAllLessonsList: (course_id: string) => void;
  addLesson: (data: Omit<Lesson, "lesson_id">) => Promise<number | null>;
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

  const addLesson = async (
    data: Omit<Lesson, "lesson_id">
  ): Promise<number | null> => {
    try {
      const resp = await GlobalApi.addLesson(data);
      if (resp.data.error) {
        alert(resp.data.error);
        return null;
      } else {
        const newLesson = resp.data;
        setLessons((prevLessons) => [...prevLessons, newLesson]);
        return newLesson.lesson_id; // Return the generated lesson_id
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
      return null;
    }
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