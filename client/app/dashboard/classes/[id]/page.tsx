import React from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import { Student } from "@/contexts/students-data";

const ClassDetails = async ({ params }: { params: { id: string } }) => {
  const classDetails = await GlobalApi.getClassDetails(params.id);
  const allStudentsInClass = await GlobalApi.getStudentDetails(params.id); // Assuming this returns a list of students

  return (
    <div className="p-7">
      <div className="font-bold text-2xl flex justify-between items-center">
        Class Details
      </div>

      <div className="flex mt-8">
        {classDetails.data ? (
          <div>
            <p>ID: {classDetails.data.id}</p>
            <p>Class: {classDetails.data.class}</p>
            <p>Created At: {classDetails.data.createdAt}</p>
            <p>Updated At: {classDetails.data.updatedAt}</p>
          </div>
        ) : (
          <p>No classes found.</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-lg">Students in this Class:</h3>
        {allStudentsInClass.data && allStudentsInClass.data.length > 0 ? (
          <ul className="list-disc ml-6">
            {allStudentsInClass.data.map((student: Student, id: number) => (
              <li key={id}>
                <p>Name: {student.name}</p>
                <p>Contact: {student.contact}</p>
                <p>Address: {student.address}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default ClassDetails;
