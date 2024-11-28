"use client";
import React, { useEffect, useState } from "react";
import { data } from "@/components/student/courses/demoCourses";
import {
  CirclePlay,
  Clock4,
  Globe,
  MonitorSmartphone,
  Star,
  Undo2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ChevronDown, PlayCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import DataTableDemo from "@/components/teacher/courses/courseDetails/student-manager";
import SheetDemo from "@/components/teacher/courses/courseDetails/edit-basic-course-info";
import Link from "next/link";
import { useRouter } from "next/navigation";
import globalApi from "@/services/globalApi";
import { useCourseContext } from "@/contexts/courses-data";
import { useLessonContext } from "@/contexts/lessons-data";

const page = ({ params }: { params: { courseId: string } }) => {
  const { getCourseDetails, singleCourse } = useCourseContext();
  const { getAllLessonsList, lessons } = useLessonContext();
  useEffect(() => {
    getCourseDetails(params.courseId);

    // Fetch courses on page load
    getAllLessonsList(params.courseId);
  }, []);
  console.log(lessons);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const totalDurationInSeconds = lessons.reduce(
    (total, lesson) => total + lesson.duration,
    0
  );
  const description = singleCourse ? singleCourse.description : "";
  const convertSecondsToTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Pad with leading zeros if needed
    const hoursStr = hours.toString().padStart(2, "0");
    const minutesStr = minutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
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

      {/* Content */}
      <main className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Course Details */}
        <div className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <Image
              src={singleCourse?.thumb_img}
              alt="Course Thumbnail"
              width={400}
              height={200}
              className="w-full h-56 object-cover rounded-lg"
            />
          </div>
          <div className="flex-grow space-y-4">
            <p className=" text-black text-2xl text-center font-extrabold">
              RESUME
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-1">
                <Clock4 />
                <strong> Duration:</strong>{" "}
                {convertSecondsToTime(totalDurationInSeconds)}
              </li>
              <li className="flex gap-1">
                <CirclePlay />
                <strong>Giáo trình:</strong> {lessons.length} lessons
              </li>
              <li className="flex gap-1">
                <Globe />
                <strong>{singleCourse?.language}</strong>
              </li>
              <li className="flex gap-1">
                <MonitorSmartphone />
                Learn on all devices: Mobile, TV, PC
              </li>
            </ul>
            <div className="flex gap-2">
              <SheetDemo />
              <Button className="bg-red-500 hover:bg-red-400 text-white w-full">
                Delete Course
              </Button>
            </div>
          </div>
        </div>

        {/* Course Description */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Giới thiệu khoá học</h2>
          </div>
          <p
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, "<br />"),
            }}
          ></p>
        </section>

        {/*/ Course Contents */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Nội dung khoá học</h2>
            <Link href={`/dashboard/teacher/classes/${params.courseId}/edit`}>
              <Button>Edit</Button>
            </Link>
          </div>

          {/* Dropdown for Course Content */}
          <Accordion type="single" collapsible>
            <AccordionItem value="content">
              <AccordionTrigger className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-5 h-5 text-gray-800" />
                  <span className="font-semibold">Mục lục</span>
                </div>
                <span className="text-blue-500 text-sm">
                  {lessons.length} Lessons -{" "}
                  {convertSecondsToTime(totalDurationInSeconds)}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                {lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-gray-600" />
                      <span>{lesson.title}</span>
                    </div>
                    <span className="text-gray-500">
                      {convertSecondsToTime(lesson.duration)}
                    </span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Students */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Student Manager</h2>
          <div>
            <DataTableDemo />
          </div>
        </section>
      </main>
    </div>
  );
};

export default React.memo(page);
