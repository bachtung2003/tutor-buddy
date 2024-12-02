"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useState, FormEvent } from "react";
import defaultAvatar from "@/public/default-avatar.jpg";
import Image from "next/image";
import { getSession } from "@/utils/auth";
import { useCourseContext } from "@/contexts/courses-data";
import TopCoursesSection from "@/components/teacher/profile/topCoursesSection";

const page = () => {
  const [courseName, setCourseName] = useState("");
  const [language, setLanguage] = useState("English");
  const [objectives, setObjectives] = useState("");
  const [description, setDescription] = useState("");
  const [mainPicture, setMainPicture] = useState(defaultAvatar);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      courseName,
      language,
      objectives,
      description,
      mainPicture,
    };

    console.log("Form Data:", formData);

    // Here you can handle form submission, e.g., send data to a backend
  };
  const [user, setUser] = useState<any>(null); // Hold user data in state
  const { topCourses, getTopCourses } = useCourseContext();
  useEffect(() => {
    // Fetch user data on the client side after hydration
    const session = getSession();
    setUser(session); // Set the user state after fetching session data
    getTopCourses();
  }, []);

  // Avoid rendering the username until we have user data
  if (!user) {
    return <div>Loading...</div>; // Optional: Loading state
  }
  return (
    <div className="my-6 mx-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="text-3xl text-primary font-bold">My Profile</div>
          <div className="text-gray-500 font-thin">
            Manage profile information for account security
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      {/* Page Body */}
      <div>
        <form onSubmit={handleSubmit} className="my-6 mx-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Section */}
            <table className="md:col-span-3 space-y-4 border-spacing-y-3 border-separate table-auto">
              <tbody>
                {/* Name */}
                <tr>
                  <td className="w-44">
                    <label className=" font-medium">Username</label>
                  </td>
                  <td>
                    <p>{user.username}</p>
                  </td>
                </tr>

                {/* Language */}
                <tr>
                  <td>
                    <label className=" font-medium">Role</label>
                  </td>
                  <td>
                    <p>{user.role}</p>
                  </td>
                </tr>

                {/* Course Objectives */}
                <tr>
                  <td colSpan={2}>
                    <TopCoursesSection courses={topCourses} />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Right Section - Course Pictures */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Profile Pictures</h2>

              {/* Main Picture */}
              <div className="flex flex-col items-center gap-4 space-x-2">
                <Image
                  src={defaultAvatar}
                  alt="default"
                  className="rounded-full"
                  width={200}
                  height={200}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-500"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center mt-6">
            <Button type="submit" className="bg-blue-600 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
