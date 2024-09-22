"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { createContext, useContext, useEffect, useState } from "react";

type StudentContextProviderProps = {
  children: React.ReactNode;
};

export type Student = {
  address: string;
  createdAt: string;
  updatedAt: string;
  contact: string;
  class: string;
  name: string;
  ClassId: number;
  id?: number;
};

type StudentContext = {
  students: Student[]; // An array of Class objects
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  loading: boolean;
};

const StudentContext = createContext<StudentContext | null>(null);

export function StudentContextProvider({
  children,
}: StudentContextProviderProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const GetAllStudentsList = () => {
    setLoading(true); // Start loading
    GlobalApi.getAllStudents()
      .then((resp: any) => {
        setStudents(resp.data);
      })
      .finally(() => {
        setLoading(false); // Stop loading once the API call completes
      });
  };

  useEffect(() => {
    GetAllStudentsList();
  }, []);

  return (
    <StudentContext.Provider value={{ students, setStudents, loading }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error(
      "useStudentContext must be used within a StudentContextProvider"
    );
  }
  return context;
}
