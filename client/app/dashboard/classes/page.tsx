"use client";

import React, { useEffect } from "react";
import AddNewClass from "./_components/AddNewClass";
import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";
import { useClassContext } from "@/contexts/classes-data";
import { ring2 } from "ldrs";

const Page = () => {
  const { classes, loading } = useClassContext();

  useEffect(() => {
    // This code will only run in the browser
    if (typeof window !== "undefined") {
      ring2.register();
    }
  }, []);

  return (
    <div className="p-7">
      <div className="font-bold text-2xl flex justify-between items-center">
        Class
        <AddNewClass />
      </div>
      <div className="flex mt-8 mb-4">Class Details</div>
      {loading ? (
        <div className="flex justify-center mt-8">loading</div>
      ) : (
        <DataTable columns={columns} data={classes} />
      )}
    </div>
  );
};

export default Page;
