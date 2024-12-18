"use client";

import React, { useEffect } from "react";
import AddNewStudent from "./_components/AddNewStudent";
import { useStudentContext } from "@/contexts/students-data";
import { ring2 } from "ldrs";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useStudentCourseContext } from "@/contexts/student-courses-data";

const Student = () => {
  const { getStudentListPerTeacher, registeredStudents } =
    useStudentCourseContext();
  useEffect(() => {
    getStudentListPerTeacher();
    // This code will only run in the browser
    if (typeof window !== "undefined") {
      ring2.register();
    }
  }, []);
  console.log(registeredStudents);
  return (
    <div className="p-7">
      <div className="flex mt-8 mb-4 ">Student Details</div>

      <DataTable columns={columns} data={registeredStudents} />
    </div>
  );
};

export default Student;
