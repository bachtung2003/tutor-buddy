"use client";
import { getSession } from "@/utils/auth";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import ChartSection from "@/components/teacher/chartSection";
import TopCoursesSection from "@/components/teacher/topCoursesSection";

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
        Let's spread something new today!
      </div>
      <main>
        {/*statistics */}
        <section>
          <h2 className="text-2xl text-primary font-semibold my-4">
            Statistics
          </h2>
          <div>
            <ChartSection />
          </div>
        </section>
        {/*top courses */}
        <section>
          <h2 className="text-2xl text-primary font-semibold my-4">
            Your Top Courses
          </h2>
          <div>
            <TopCoursesSection />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
