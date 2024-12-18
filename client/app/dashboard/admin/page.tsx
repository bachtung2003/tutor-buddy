"use client";
import TopCoursesSection from "@/components/admin/topCoursesSection";
import UserChart from "@/components/admin/userChart";
import { useCourseContext } from "@/contexts/courses-data";
import globalApi from "@/services/globalApi";
import { getSession } from "@/utils/auth";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { setTheme } = useTheme();
  const [user, setUser] = useState<any>(null); // Hold user data in state
  const { topCourses, getAllTopCourses } = useCourseContext();
  const [allUsers, getAllUsers] = useState(null);

  useEffect(() => {
    setTheme("system");
    getAllTopCourses();
    globalApi.getAllUsers().then((resp) => {
      getAllUsers(resp.data);
    });
    // Fetch user data on the client side after hydration
    const session = getSession();
    setUser(session); // Set the user state after fetching session data
  }, []);

  // Avoid rendering the username until we have user data
  if (!user) {
    return <div>Loading...</div>; // Optional: Loading state
  }
  if (!allUsers) {
    return <div>Loading...</div>; // Optional: Loading state
  }
  console.log(allUsers);
  return (
    <div className="mt-6 mx-8">
      <div className="text-3xl">Hello {user?.username} 👋🏻</div>
      <div className="text-gray-500 font-thin">
        Check your TutorBuddy today!
      </div>
      <main>
        {/* top courses */}
        <section>
          <h2 className="text-2xl text-primary font-semibold my-4">
            Top Courses
          </h2>
          <div>
            <TopCoursesSection courses={topCourses} />
          </div>
        </section>

        {/* user chart */}
        <section>
          <h2 className="text-2xl text-primary font-semibold my-4">
            All Users
          </h2>
          <div>
            <UserChart data={allUsers} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
