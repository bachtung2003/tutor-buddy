"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  GraduationCap,
  Hand,
  LayoutDashboard,
  Settings,
  University,
  User,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false); // For the sidebar toggle
  const [isMobile, setIsMobile] = useState(false); // Track screen size

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard/teacher",
    },
    {
      id: 2,
      name: "Classes",
      icon: University,
      path: "/dashboard/teacher/classes",
    },
    {
      id: 3,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/teacher/students",
    },
    {
      id: 4,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/teacher/attendance",
    },
    {
      id: 5,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/teacher/settings",
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when navigating or clicking outside
  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener("click", handleClose);

    return () => window.removeEventListener("click", handleClose);
  }, []);

  // Determine mobile or desktop view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        // Mobile view: sidebar becomes a dropdown
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            className="fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-lg shadow-lg"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

          {isOpen && (
            <div
              className="fixed top-12 left-4 bg-white shadow-md rounded-lg p-4 w-48 z-50 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {menuList.map((menu, index) => (
                <Link key={index} href={menu.path} onClick={toggleMenu}>
                  <div className="flex gap-2 mb-2 p-3 text-slate-500 hover:bg-primary hover:text-white rounded-lg cursor-pointer">
                    <menu.icon />
                    <h2>{menu.name}</h2>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Desktop view: sidebar stays open on the left
        <div className="fixed top-0 left-0 h-screen w-64 p-2 bg-white shadow-md">
          <div className="flex justify-center">
            <Image src={"/logo.svg"} alt="logo" width={140} height={100} />
          </div>
          <hr className="my-4" />
          <div className="mt-5 p-3">
            {menuList.map((menu, index) => (
              <Link key={index} href={menu.path}>
                <div className="flex gap-2 mb-2 p-3 text-slate-500 hover:bg-primary hover:text-white rounded-lg cursor-pointer">
                  <menu.icon />
                  <h2>{menu.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNav;
