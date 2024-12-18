"use client";
import AllCoursesSection from "@/components/admin/courses/allCoursesSection";
import { useCourseContext } from "@/contexts/courses-data";
import React, { useEffect } from "react";

const page = () => {
  const { unregisteredCourses, getAllUnregisteredCourses } = useCourseContext();
  useEffect(() => {
    getAllUnregisteredCourses();
  }, []);
  return (
    <div className="mt-6 mx-8">
      <div className="text-3xl text-primary">All Courses</div>
      <div className="text-gray-500 font-thin">
        Modify courses as your wishes!
      </div>
      <main>
        {/* top courses */}
        <section>
          <h2 className="text-2xl text-primary font-semibold my-4"></h2>
          <div>
            <AllCoursesSection courses={unregisteredCourses} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
