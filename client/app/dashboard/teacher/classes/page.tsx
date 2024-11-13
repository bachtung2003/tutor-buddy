// "use client";

// import React, { useEffect } from "react";
// import AddNewClass from "./_components/AddNewClass";
// import { DataTable } from "../../../../components/ui/data-table";
// import { columns } from "./columns";
// import { useClassContext } from "@/contexts/classes-data";
// import { ring2 } from "ldrs";

// const Page = () => {
//   const { classes, loading } = useClassContext();

//   useEffect(() => {
//     // This code will only run in the browser
//     if (typeof window !== "undefined") {
//       ring2.register();
//     }
//   }, []);

//   return (
//     <div className="p-7 ">
//       <div className="font-bold text-2xl flex justify-between items-center">
//         Class
//         <AddNewClass />
//       </div>
//       <div className="flex mt-8 mb-4">Class Details</div>
//       {loading ? (
//         <div className="flex justify-center mt-8">
//           <l-ring-2
//             size="40"
//             stroke="5"
//             stroke-length="0.25"
//             bg-opacity="0.1"
//             speed="0.8"
//             color="black"
//           ></l-ring-2>
//         </div>
//       ) : (
//         <DataTable columns={columns} data={classes} />
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";
import CourseCard from "@/components/teacher/courses/courseCard";
import { data, Courses } from "@/components/teacher/courses/demoCourses";
import ItemPagination from "@/components/ui/item-pagination";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ITEMS_PER_PAGE = 6; // Number of courses per page

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / pageSize);

  // Get the courses to display on the current page
  const getPaginatedCourses = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
        {getPaginatedCourses().map(
          (course: Courses, index: React.Key | null | undefined) => (
            <CourseCard
              key={index}
              id={course.id}
              imageUrl={course.imageUrl}
              title={course.title}
              description={course.description}
              academy={course.academy}
              logoUrl={course.logoUrl}
            />
          )
        )}
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
