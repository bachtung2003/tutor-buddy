"use client";
import Login from "@/components/auth-login";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getSession } from "@/utils/auth";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state to prevent page render

  useEffect(() => {
    // Get the userRole from localStorage
    const userRole: any = getSession();

    if (userRole) {
      // Redirect based on userRole
      if (userRole.role === "teacher") {
        router.replace("/dashboard/teacher");
      } else if (userRole.role === "student") {
        router.replace("/dashboard/student");
      }
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Show a loading screen or blank page while checking the session */}
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Show the registration component only after checking session */}
      <Login />
    </div>
  );
}
