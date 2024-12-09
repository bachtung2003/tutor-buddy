"use client";
import { columns } from "@/components/student/assignments/asmColumns";
import { DataTable } from "@/components/student/assignments/data-table";
import { useCourseContext } from "@/contexts/courses-data";
import { useLessonContext } from "@/contexts/lessons-data";
import { useScoresContext } from "@/contexts/scores-data";
import { useStudentCourseContext } from "@/contexts/student-courses-data";
import React, { useEffect } from "react";

const Page = () => {
  const { courses, getRegisteredCourses } = useCourseContext();
  const { allLessons, getLessons } = useLessonContext();
  const { allScores, getAllScores } = useScoresContext();
  const { getAllRegisteredCourses } = useStudentCourseContext();

  useEffect(() => {
    getLessons();
    getRegisteredCourses();
    getAllScores();
    getAllRegisteredCourses();
  }, []);

  // Combine data from multiple contexts
  const combinedData = allLessons
    .map((lesson) => {
      const course = courses.find((c) => c.course_id === lesson.course_id);
      const scores = allScores.find((s) => s.lesson_id === lesson.lesson_id);
      return {
        course: course?.title,
        lessonTitle: lesson.title,
        score: scores ? scores.score : 0, // Assuming the first score is relevant
        status: scores ? "Submitted" : "Unsubmitted",
      };
    })
    .filter((entry) => entry.course !== undefined);
  console.log(combinedData);

  return (
    <div className="mt-6 mx-8">
      <div className="mt-5">
        <DataTable columns={columns} data={combinedData} />
      </div>
    </div>
  );
};

export default Page;
