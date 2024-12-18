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
import Link from "next/link";

// Define the Course type
type Course = {
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
const TopCoursesSection: React.FC<TopCoursesSectionProps> = ({ courses }) => {
  // Sort courses by the number of students and pick the top 3
  const topCourses = courses
    .map((course) => ({
      ...course,
      studentCount: course.Student ? course.Student.length : 0, // Add student count as a property
    }))
    .sort((a, b) => b.studentCount - a.studentCount) // Sort by student count (descending)
    .slice(0, 3); // Select the top 3 courses

  console.log(topCourses);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Top 3 Courses</CardTitle>
          <CardDescription>Showing top 3 most learners courses</CardDescription>
        </div>
        <div className="flex flex-col justify-center px-6 py-4 sm:px-8 sm:py-6">
          <Link href={"/dashboard/teacher/classes"}>
            <Button>View All</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Students</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.course_id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.language}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell className="text-right">
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
export default TopCoursesSection;
