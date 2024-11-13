import { columns } from "@/components/student/assignments/asmColumns";
import { DataTable } from "@/components/student/assignments/data-table";
import { data } from "@/components/student/assignments/demoData";
import React from "react";

const page = () => {
  // Ensure that `data` is defined. If it's undefined or null, fallback to an empty array.
  const assignmentsData = data || [];

  return (
    <div className="mt-6 mx-8">
      <div className="mt-5">
        {/* Use the fallback data array */}
        <DataTable columns={columns} data={assignmentsData} />
      </div>
    </div>
  );
};

export default page;