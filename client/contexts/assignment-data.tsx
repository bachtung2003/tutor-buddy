"use client";
import GlobalApi from "@/services/globalApi";
import { createContext, useContext, useEffect, useState } from "react";

type AssignmentContextProviderProps = {
  children: React.ReactNode;
};

export type Answer = {
  text: string;
  isCorrect: boolean;
  answer_id: number;
  assignment_id: number;
};

export type Assignment = {
  assignment_id: number;
  lesson_id: number;
  title: string;
  answers: Answer[];
};

type AssignmentContext = {
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  loading: boolean;
  getAllAssignmentsList: (lesson_id: string) => void;
  addAssignment: (data: Assignment[] | Assignment) => void;
  updateAssignment: (lesson_id: string, data: Assignment[]) => void;
  fullAssignments: Assignment[];
  setFullAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  getFullAssignment: () => void;
  deleteAssignment: (lesson_id: string, assignment_id: string) => void;
};

const AssignmentContext = createContext<AssignmentContext | null>(null);

export function AssignmentContextProvider({
  children,
}: AssignmentContextProviderProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [fullAssignments, setFullAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getFullAssignment = () => {
    GlobalApi.getFullAssignment().then((resp: any) => {
      setFullAssignments(resp.data);
    });
  };

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
  const updateAssignment = (lesson_id: string, data: Assignment[]) => {
    // Ensure data is always treated as an array
    const assignmentsToUpdate = Array.isArray(data) ? data : [data];
    Promise.all(
      assignmentsToUpdate.map((assignment) =>
        GlobalApi.updateAssignment(lesson_id, assignment)
      )
    )
      .then((responses) => {
        console.log(responses);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteAssignment = (lesson_id: string, assignment_id: string) => {
    GlobalApi.deleteAssignment(lesson_id, assignment_id);
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments: assignments,
        setAssignments: setAssignments,
        getAllAssignmentsList: getAllAssignmentsList,
        addAssignment: addAssignment,
        loading,
        updateAssignment,
        fullAssignments,
        setFullAssignments,
        getFullAssignment,
        deleteAssignment,
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
