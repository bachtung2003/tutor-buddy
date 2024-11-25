"use client";
import React, { useEffect } from "react";
import SideNav from "../../../components/ui/sidenav-teacher";
import Header from "../../../components/ui/header";
import { useCourseContext } from "@/contexts/courses-data";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { getAllCoursesList } = useCourseContext();
  useEffect(() => {
    getAllCoursesList();
  }, []);
  return (
    <div>
      <div className="md:w-64 absolute md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;
