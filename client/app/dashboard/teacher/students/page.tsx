"use client";

import React, { useEffect } from "react";
import AddNewStudent from "./_components/AddNewStudent";
import { useStudentContext } from "@/contexts/students-data";
import { ring2 } from "ldrs";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

const Student = () => {
  const { students, loading } = useStudentContext();
  useEffect(() => {
    // This code will only run in the browser
    if (typeof window !== "undefined") {
      ring2.register();
    }
  }, []);
  return (
    <div className="p-7">
      <div className="font-bold text-2xl flex justify-between items-center">
        Student
        <AddNewStudent />
      </div>
      <div className="flex mt-8 mb-4">Class Details</div>
      {loading ? (
        <div className="flex justify-center mt-8">
          <l-ring-2
            size="40"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="black"
          ></l-ring-2>
        </div>
      ) : (
        <DataTable columns={columns} data={students} />
      )}
    </div>
  );
};

export default Student;
