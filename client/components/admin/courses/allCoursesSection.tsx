"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useCourseContext } from "@/contexts/courses-data";

// Define the Course type
type Course = {
  teacher_id: number;
  course_id: number;
  title: string;
  language: string;
  status: string;
  Student?: Student[];
};

type Student = {
  student_id: number;
};

interface TopCoursesSectionProps {
  courses: Course[];
}

// Component definition
const AllCoursesSection: React.FC<TopCoursesSectionProps> = ({ courses }) => {
  const { deleteCourse } = useCourseContext();
  const [selectedCourses, setSelectedCourses] = React.useState<number[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const handleCheckboxChange = (courseId: number) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleDeleteSelected = () => {
    selectedCourses.map((courseId) => {
      deleteCourse(courseId.toString());
    });
    setSuccessMessage("Courses deleted successfully! Reload in 3 seconds");

    setTimeout(() => {
      setSuccessMessage(null);
      window.location.reload(); // Reload the page after 3 seconds
    }, 3000);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Showing total courses</CardDescription>
        </div>
        <div className="flex flex-col justify-center px-6 py-4 sm:px-8 sm:py-6">
          <Button
            onClick={handleDeleteSelected}
            disabled={!selectedCourses.length}
          >
            Delete Selected
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
            {successMessage}
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Select</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="text-center">Teacher ID</TableHead>
              <TableHead className="text-center">Students</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.course_id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.course_id)}
                    onChange={() => handleCheckboxChange(course.course_id)}
                  />
                </TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.language}</TableCell>
                <TableCell className="text-center">
                  {course.teacher_id}
                </TableCell>
                <TableCell className="text-center">
                  {course.Student?.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Exporting component
export default AllCoursesSection;
