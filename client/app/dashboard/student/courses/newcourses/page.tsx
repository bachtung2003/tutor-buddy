"use client";
import CourseCard from "@/components/student/courses/newCourses/newCourseCard";
import ItemPagination from "@/components/ui/item-pagination";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react"; // Import icons
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useCourseContext } from "@/contexts/courses-data";
import globalApi from "@/services/globalApi";

const Page = () => {
  const { getAllUnregisteredCourses, unregisteredCourses } = useCourseContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  // Calculate the total number of pages
  const totalPages = Math.ceil(unregisteredCourses.length / pageSize);

  useEffect(() => {
    getAllUnregisteredCourses();
  }, []);
  console.log(unregisteredCourses);
  if (!unregisteredCourses) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }
  // Get the courses to display on the current page
  const getPaginatedCourses = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return unregisteredCourses.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="my-6 mx-8">
      <div className="flex justify-between items-center">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-1">
            <Link href="/dashboard/student/courses">
              <ArrowLeft />
            </Link>
            <div className="text-3xl text-primary font-bold">New Courses</div>
          </div>
          <div className="text-gray-500 font-thin">
            Subcribe for more class sessions
          </div>
        </div>
        {/* Button to add a new course */}
        {/* <Link href="#">
          <Button className="hover:bg-blue-500">+ New Course</Button>
        </Link> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Course Cards */}
        {getPaginatedCourses().map((course, index) => (
          <CourseCard
            key={index}
            id={course.course_id.toString()}
            title={course.title}
            description={course.objective}
            teacherName={course.teacher_fullname ? course.teacher_fullname : ""}
            teacherProfile={
              course.teacher_profile_picture
                ? course.teacher_profile_picture
                : ""
            }
          />
        ))}
      </div>

      {/* Pagination and other controls */}
      <div className="flex justify-between mt-8">
        {/* Rows per page control */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Courses per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[3, 6, 9].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-1">
          <ItemPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
