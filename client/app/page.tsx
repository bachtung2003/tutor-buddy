"use client";
import Register from "@/components/auth-register";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state to prevent page render

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      // Redirect based on userRole
      router.replace("/dashboard");
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
      <Register />
    </div>
  );
}
