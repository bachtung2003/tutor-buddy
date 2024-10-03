"use client";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect } from "react";
import { useTheme } from "next-themes";
import GlobalApi from "@/app/_services/GlobalApi";

const Dashboard = () => {
  const { setTheme } = useTheme();
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    setTheme("system");
  }, []);

  useEffect(() => {
    // Get the userRole from localStorage
    const userRole: any = GlobalApi.getSession();

    if (userRole) {
      // Redirect based on userRole
      if (userRole.role === "teacher") {
        router.replace("/dashboard/teacher");
      } else if (userRole.role === "student") {
        router.replace("/dashboard/student");
      }
    } else {
      // If no role is found, perhaps redirect to login page
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Show a loading screen or blank page while checking the session */}
      <div>Loading...</div>
    </div>
  );
};

export default Dashboard;
