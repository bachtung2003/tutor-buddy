"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { createContext, useContext, useEffect, useState } from "react";

type ClassContextProviderProps = {
  children: React.ReactNode;
};

export type Class = {
  id: number;
  class: string;
  createdAt: string;
  updatedAt: string;
};

type ClassContext = {
  classes: Class[]; // An array of Class objects
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  loading: boolean;
};

const ClassContext = createContext<ClassContext | null>(null);

export function ClassContextProvider({ children }: ClassContextProviderProps) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const GetAllClassesList = () => {
    setLoading(true); // Start loading
    GlobalApi.getAllClass()
      .then((resp: any) => {
        setClasses(resp.data);
      })
      .finally(() => {
        setLoading(false); // Stop loading once the API call completes
      });
  };

  useEffect(() => {
    GetAllClassesList();
  }, []);

  return (
    <ClassContext.Provider value={{ classes, setClasses, loading }}>
      {children}
    </ClassContext.Provider>
  );
}

export function useClassContext() {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error(
      "useClassContext must be used within a ClassContextProvider"
    );
  }
  return context;
}
