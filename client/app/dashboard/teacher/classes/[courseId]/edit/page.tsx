"use client";
import DataTableDemo from "@/components/teacher/courses/courseDetails/edit/lesson-manager";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId; // Replace this with dynamic courseId if needed
  const router = useRouter();

  return (
    <div className="my-6 mx-8">
      <div className="flex justify-between items-center">
        {/* Page Header */}
        <div>
          <div className="text-3xl text-primary font-bold">
            Physic 3 - Fundamentals
          </div>
          <div className="text-gray-500 font-thin">Edit your lessons</div>
        </div>
        {/* Button to add a new course */}
        <Link
          href={`/dashboard/teacher/classes/${params.courseId}/edit/create-lesson`}
        >
          <Button className="hover:bg-blue-500">+ Create New Lesson</Button>
        </Link>
      </div>

      <div>
        <DataTableDemo courseId={courseId} />
      </div>
      <div className="flex justify-center items-center">
        <Button onClick={() => router.back()}>Done Editing</Button>
      </div>
    </div>
  );
};

export default page;
