"use client";
import GlobalApi from "@/services/globalApi";
import { createContext, useContext, useEffect, useState } from "react";

type ClassContextProviderProps = {
  children: React.ReactNode;
};

export type Class = {
  id: number;
  class: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
};

type ClassContext = {
  classes: Class[]; // An array of Class objects
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  loading: boolean;
  getAllClassesList: () => void;
};

const ClassContext = createContext<ClassContext | null>(null);

export function ClassContextProvider({ children }: ClassContextProviderProps) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getAllClassesList = () => {
    setLoading(true); // Start loading
    GlobalApi.getAllClass()
      .then((resp: any) => {
        setClasses(resp.data);
      })
      .finally(() => {
        setLoading(false); // Stop loading once the API call completes
      });
  };

  return (
    <ClassContext.Provider
      value={{ classes, setClasses, getAllClassesList, loading }}
    >
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
