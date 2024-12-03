"use client";
import GlobalApi from "@/services/globalApi";
import { createContext, useContext, useEffect, useState } from "react";

type ScoresContextProviderProps = {
  children: React.ReactNode;
};

export type Scores = {
  score_id?: number;
  student_id?: number;
  course_id: number;
  lesson_id: number;
  score: number;
};

type ScoresContext = {
  allScores: Scores[];
  setAllScores: React.Dispatch<React.SetStateAction<Scores[]>>;
  getAllScores: () => void;
  courseScores: Scores[];
  setCourseScores: React.Dispatch<React.SetStateAction<Scores[]>>;
  getCourseScores: (course_id: string) => void;
};

const ScoresContext = createContext<ScoresContext | null>(null);

export function ScoresContextProvider({
  children,
}: ScoresContextProviderProps) {
  const [allScores, setAllScores] = useState<Scores[]>([]);
  const [courseScores, setCourseScores] = useState<Scores[]>([]);

  const getCourseScores = (course_id: string) => {
    GlobalApi.getCourseScore(course_id).then((resp: any) => {
      setCourseScores(resp.data);
    });
  };
  const getAllScores = () => {
    GlobalApi.getAllScores().then((resp: any) => {
      setAllScores(resp.data);
    });
  };

  return (
    <ScoresContext.Provider
      value={{
        allScores,
        setAllScores,
        getAllScores,
        courseScores,
        setCourseScores,
        getCourseScores,
      }}
    >
      {children}
    </ScoresContext.Provider>
  );
}

export function useScoresContext() {
  const context = useContext(ScoresContext);
  if (!context) {
    throw new Error(
      "useScoresContext must be used within a ScoresContextProvider"
    );
  }
  return context;
}
