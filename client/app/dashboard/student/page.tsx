"use client";
import { getSession } from "@/utils/auth";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { GradesCard } from "@/components/student/gradesCard";
import { CalendarComponent } from "@/components/student/calendarComponent";
import { ProcessesCard } from "@/components/student/blogsCard";
import { Suggested } from "@/components/student/suggestedCoursesCard";
import { Progress } from "@/components/student/progressCard";

const Home = () => {
  const { setTheme } = useTheme();
  const [user, setUser] = useState<any>(null); // Hold user data in state

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

  return (
    <div className="mt-6 mx-8">
      <div className="text-3xl">Hello {user?.username} 👋🏻</div>
      <div className="text-gray-500 font-thin">
        Let's learn something new today!
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 min-[930px]:grid-cols-2 xl:grid-cols-4 xl:gap-5 ">
        <div className="h-full">
          <GradesCard />
        </div>
        <div className="xl:col-span-2 h-full">
          <ProcessesCard />
        </div>
        <div className="h-full flex items-stretch">
          <CalendarComponent />
        </div>
        <div className="xl:col-span-2 h-full">
          <Progress />
        </div>
        <div className="xl:col-span-2 h-full">
          <Suggested />
        </div>
      </div>
    </div>
  );
};

export default Home;
