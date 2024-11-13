"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Courses } from "@/components/student/courses/demoCourses";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const CourseCard: React.FC<Courses> = ({
  id,
  imageUrl,
  title,
  description,
  academy,
  logoUrl,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [bgClass, setBgClass] = useState("blue"); // Set default background class

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

  // Function to get a random background class
  const getRandomBgClass = () => {
    const randomIndex = Math.floor(Math.random() * bgClasses.length);
    return bgClasses[randomIndex];
  };

  // Set the random background class when the component mounts
  useEffect(() => {
    const randomClass = getRandomBgClass();
    setBgClass(randomClass);
    // console.log(`Assigned background class: ${randomClass}`); // Debug log
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCheckProfile = () => {
    console.log("Check author profile clicked");
  };

  const handleRemoveCourse = () => {
    console.log("Remove course clicked");
  };

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <div
        className={`flex items-center mb-4 gap-2 p-2 border bg-${bgClass}-50 rounded-lg`}
      >
        {/* Image section */}
        <div
          className={`relative h-32 w-full flex justify-center items-center border bg-${bgClass}-200 rounded-lg`}
        >
          {imageUrl} {/* Rendering the JSX icon or image */}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Text content */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        {/* Footer content */}
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <Link href={`/dashboard/student/courses/${id}`}>
              <Button className="bg-primary text-white hover:bg-blue-500">
                View
              </Button>
            </Link>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <div className="inline-block w-6 h-6">
                {logoUrl} {/* Rendering the JSX logo */}
              </div>
              {academy}
            </div>
          </div>

          {/* Dropdown menu trigger */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreHorizontal
                className="text-gray-500 cursor-pointer"
                onClick={handleDropdownToggle}
              />
            </DropdownMenuTrigger>

            {isDropdownOpen && (
              <DropdownMenuContent className="absolute right-0 mt-2 bg-white shadow-md border rounded-lg z-50 min-w-[11rem]">
                <DropdownMenuItem onClick={handleCheckProfile}>
                  Edit course
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRemoveCourse}>
                  Remove this course
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
