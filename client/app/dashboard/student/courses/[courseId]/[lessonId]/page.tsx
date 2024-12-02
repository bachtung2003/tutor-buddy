"use client";
import { useAssignmentContext } from "@/contexts/assignment-data";
import { useCourseContext } from "@/contexts/courses-data";
import { useLessonContext } from "@/contexts/lessons-data";
import { Star, Undo2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = ({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) => {
  const router = useRouter();
  const { getCourseDetails, singleCourse } = useCourseContext();
  const { getSingleLesson, lessonDetails } = useLessonContext();
  const { getAllAssignmentsList, assignments } = useAssignmentContext();

  useEffect(() => {
    getCourseDetails(params.courseId);
    getSingleLesson(params.lessonId);
    getAllAssignmentsList(params.lessonId);
  }, []);

  console.log(assignments);
  const renderVideoPreview = (url: string) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      const videoId = match[1];
      return (
        <div className="w-full aspect-video mt-4">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            allowFullScreen
            className="w-full h-full rounded-md"
          ></iframe>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white p-8 text-left">
        <div className="flex gap-1 items-center">
          <Undo2 size={"15px"} />
          <div
            className="capitalize cursor-pointer text-white hover:underline"
            onClick={() => router.back()}
          >
            Go Back
          </div>
        </div>

        <h1 className="text-3xl font-bold">{singleCourse?.title}</h1>
        <div className="flex space-x-4 items-center mt-2">
          <p className="text-sm">ACCESSTRADE Academy</p>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="w-4 h-4 text-orange-400" />
            <Star className="w-4 h-4 text-orange-400" />
            <Star className="w-4 h-4 text-orange-400" />
            <Star className="w-4 h-4 text-orange-400" />
            <span className="ml-1">4 Ratings</span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Users className="w-4 h-4" />
            <span>221 Students</span>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Lesson */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold mb-4">
              {lessonDetails?.title}
            </h2>
          </div>
          <div className="flex justify-center">
            <h2 className="text-lg font-light text-justify mb-4">
              {lessonDetails?.description}
            </h2>
          </div>
        </section>

        {/* Video */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold mb-4">Lesson Video</h2>
          </div>
          {renderVideoPreview(lessonDetails ? lessonDetails.lesson_url : "")}
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold mb-4">Assignments</h2>
          </div>
          <div className="flex justify-center">
            <h2 className="text-lg font-light text-justify mb-4">
              There are {assignments.length} multiple choice question(s) that
              are waiting for you.
            </h2>
          </div>
          <div className="flex justify-center">
            <Link
              href={`/dashboard/student/courses/${params.courseId}/${params.lessonId}/quizz`}
            >
              <Button>Take the test now</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
