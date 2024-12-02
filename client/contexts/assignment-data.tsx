"use client";
import GlobalApi from "@/services/globalApi";
import { createContext, useContext, useEffect, useState } from "react";

type AssignmentContextProviderProps = {
  children: React.ReactNode;
};

export type Answer = {
  text: string;
  isCorrect: boolean;
  answer_id?: number;
  assignment_id: number;
};

export type Assignment = {
  assignment_id: number;
  lesson_id: number;
  title: string;
  answers: Answer[];
  id?: string;
};

type AssignmentContext = {
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  loading: boolean;
  getAllAssignmentsList: (lesson_id: string) => void;
  addAssignment: (data: Assignment[] | Assignment) => void;
};

const AssignmentContext = createContext<AssignmentContext | null>(null);

export function AssignmentContextProvider({
  children,
}: AssignmentContextProviderProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllAssignmentsList = (lesson_id: string) => {
    setLoading(true); // Start loading
    GlobalApi.getAllAssignment(lesson_id)
      .then((resp: any) => {
        setAssignments(resp.data);
      })
      .finally(() => {
        setLoading(false); // Stop loading once the API call completes
      });
  };
  const addAssignment = (data: Assignment[] | Assignment) => {
    setLoading(true);

    // Ensure data is always treated as an array
    const assignmentsToAdd = Array.isArray(data) ? data : [data];

    Promise.all(
      assignmentsToAdd.map((assignment) => GlobalApi.addAssignment(assignment))
    )
      .then((responses) => {
        const newAssignments = responses.map((resp) => resp.data);
        setAssignments((prev) => [...prev, ...newAssignments]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments: assignments,
        setAssignments: setAssignments,
        getAllAssignmentsList: getAllAssignmentsList,
        addAssignment: addAssignment,
        loading,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
}

export const useAssignmentContext = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error(
      "useLessonContext must be used within a LessonContextProvider"
    );
  }
  return context;
};
