"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Layers, Palette, Circle } from "lucide-react"; // Import icons
import { getSession } from "@/utils/auth";
import Image from "next/image";
import defaultImage from "@/public/default-avatar.jpg";

// Define the Courses type for the props
type Courses = {
  id: string;
  title: string;
  description: string;
  teacherName: string;
  teacherProfile: string;
};

const CourseCard: React.FC<Courses> = ({
  id,
  title,
  description,
  teacherName,
  teacherProfile,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [bgClass, setBgClass] = useState("blue"); // Set default background class
  const [randomIcon, setRandomIcon] = useState<React.ReactNode>(null); // State for random icon
  const [user, setUser] = useState<any>(null); // Hold user data in state

  // Array of background color classes
  const bgClasses = [
    "blue",
    "green",
    "yellow",
    "red",
    "purple",
    "pink",
    "indigo",
    "gray",
  ];

  // Array of class icons
  const classIcon = [
    <BookOpen size={48} />,
    <Layers size={48} />,
    <Palette size={48} />,
  ];

  // Function to get a random background class
  const getRandomBgClass = () => {
    const randomIndex = Math.floor(Math.random() * bgClasses.length);
    return bgClasses[randomIndex];
  };

  // Function to get a random icon
  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * classIcon.length);
    return classIcon[randomIndex];
  };

  // Set the random background class and icon when the component mounts
  useEffect(() => {
    setBgClass(getRandomBgClass());
    setRandomIcon(getRandomIcon());
    const session = getSession();
    setUser(session);
  }, []);

  // Avoid rendering the username until we have user data
  if (!user) {
    return <div>Loading...</div>; // Optional: Loading state
  }

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-200 ease-in-out">
      <div
        className={`flex items-center mb-4 gap-4 p-4 border bg-${bgClass}-50 rounded-lg`}
      >
        {/* Icon section with fixed width */}
        <div
          className={`relative w-32 h-24 flex justify-center items-center border bg-${bgClass}-200 rounded-lg min-w-max`}
        >
          {randomIcon} {/* Rendering the random icon */}
        </div>
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-xl font-semibold text-blue-600 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Footer content */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link href={`/dashboard/student/courses/${id}`}>
            <Button className="bg-primary text-white hover:bg-blue-500">
              View
            </Button>
          </Link>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <div className="inline-block w-7 h-7 border rounded-full">
              <Image
                src={teacherProfile ? teacherProfile : defaultImage}
                width={100}
                height={100}
                alt="teacher_picture"
                className="border rounded-full"
              ></Image>
            </div>
            <div className="w-max">{teacherName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
