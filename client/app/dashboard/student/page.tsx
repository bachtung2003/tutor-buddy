"use client";
import { getSession } from "@/utils/auth";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import GradesCard from "@/components/student/gradesCard";
import { CalendarComponent } from "@/components/student/calendarComponent";
import { ProcessesCard } from "@/components/student/blogsCard";
import { Suggested } from "@/components/student/suggestedCoursesCard";
import Progress from "@/components/student/progressCard";
import { useCourseContext } from "@/contexts/courses-data";
import { useLessonContext } from "@/contexts/lessons-data";
import { useScoresContext } from "@/contexts/scores-data";
import { useStudentCourseContext } from "@/contexts/student-courses-data";

const Home = () => {
  const { setTheme } = useTheme();
  const [user, setUser] = useState<any>(null); // Hold user data in state

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
    .filter((entry) => entry.course !== undefined)
    .map((data) => ({
      course: data.course as string,
      lessonTitle: data.lessonTitle as string,
      score: data.score,
      status: data.status,
    })); // Cast to ensure correct types

  useEffect(() => {
    setTheme("system");

    // Fetch user data on the client side after hydration
    const session = getSession();
    setUser(session); // Set the user state after fetching session data
  }, []);

  // Avoid rendering the username until we have user data
  if (!user) {
    return <div>Loading...</div>; // Optional: Loading state
  }

  console.log(combinedData);
  return (
    <div className="mt-6 mx-8">
      <div className="text-3xl">Hello {user?.username} 👋🏻</div>
      <div className="text-gray-500 font-thin">
        Let's learn something new today!
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 min-[930px]:grid-cols-2 xl:grid-cols-4 xl:gap-5 ">
        <div className="h-full">
          <GradesCard data={combinedData} />
        </div>
        <div className="xl:col-span-2 h-full">
          <ProcessesCard />
        </div>
        <div className="h-full flex items-stretch">
          <CalendarComponent />
        </div>
        <div className="xl:col-span-2 h-full">
          <Progress data={combinedData} />
        </div>
        <div className="xl:col-span-2 h-full">
          <Suggested />
        </div>
      </div>
    </div>
  );
};

export default Home;
