"use client";
import CourseCard from "@/components/teacher/courses/courseCard";
import ItemPagination from "@/components/ui/item-pagination";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCourseContext } from "@/contexts/courses-data";

const ITEMS_PER_PAGE = 6; // Number of courses per page

const Page = () => {
  const { courses, loading, getAllCoursesList } = useCourseContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    // Fetch courses on page load
    getAllCoursesList();
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(courses.length / pageSize);

  // Get the courses to display on the current page
  const getPaginatedCourses = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return courses.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <div className="my-6 mx-8">
      <div className="flex justify-between items-center">
        {/* Page Header */}
        <div>
          <div className="text-3xl text-primary font-bold">My Courses</div>
          <div className="text-gray-500 font-thin">Your published courses</div>
        </div>
        {/* Button to add a new course */}
        <Link href="/dashboard/teacher/classes/add-new-course">
          <Button className="hover:bg-blue-500">+ Create New Course</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Course Cards */}
        {getPaginatedCourses().map((course, index) => (
          <CourseCard
            key={index}
            id={course.course_id.toString()}
            title={course.title}
            description={course.objective}
            teacherName="Tung" // Static teacher name
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
