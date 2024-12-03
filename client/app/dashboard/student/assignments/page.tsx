"use client";
import { columns } from "@/components/student/assignments/asmColumns";
import { DataTable } from "@/components/student/assignments/data-table";
import { data } from "@/components/student/assignments/demoData";
import { useCourseContext } from "@/contexts/courses-data";
import { useLessonContext } from "@/contexts/lessons-data";
import { useScoresContext } from "@/contexts/scores-data";
import { useStudentCourseContext } from "@/contexts/student-courses-data";
import React, { useEffect } from "react";

const page = () => {
  const {
    unregisteredCourses,
    courses,
    getAllUnregisteredCourses,
    getRegisteredCourses,
  } = useCourseContext();
  const { allLessons, getLessons } = useLessonContext();
  const { allScores, getAllScores } = useScoresContext();
  const { signupCourse, getAllRegisteredCourses } = useStudentCourseContext();
  useEffect(() => {
    getLessons();
    getRegisteredCourses();
    getAllScores();
    getAllRegisteredCourses();
  }, []);

  const combinedData = allLessons
    .map((sign) => {
      const course = courses.find((c) => c.course_id == sign.course_id);
      const score = allScores.find((s) => s.course_id == sign.course_id);
      const lesson = allLessons.find((l) => l.course_id == sign.course_id);
      return {
        course: course?.title,
        lessonTitle: lesson?.title,
        score: score ? score.score : 0,
        status: score ? "Submitted" : "Unsubmitted",
      };
    })
    .filter((data) => data.course !== undefined);
  // Ensure that `data` is defined. If it's undefined or null, fallback to an empty array.
  const testData = data || [];
  console.log(combinedData);
  return (
    <div className="mt-6 mx-8">
      <div className="mt-5">
        {/* Use the fallback data array */}
        <DataTable columns={columns} data={combinedData} />
      </div>
    </div>
  );
};

export default page;
