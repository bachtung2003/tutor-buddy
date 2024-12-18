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
import { usePathname } from "next/navigation"; // Hook to get current path

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false); // For the sidebar toggle
  const [isMobile, setIsMobile] = useState(false); // Track screen size
  const pathname = usePathname(); // Get the current path

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard/teacher",
    },
    {
      id: 2,
      name: "My Courses",
      icon: University,
      path: "/dashboard/teacher/classes",
    },
    {
      id: 3,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/teacher/students",
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

  // Helper function to check if the path is active
  const isActive = (menuPath: string) => pathname === menuPath;

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
            className="fixed top-3 left-6 z-50 p-2 bg-white rounded-lg shadow-lg"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

          {isOpen && (
            <div
              className="fixed top-16 left-6 bg-white shadow-md rounded-lg p-4 w-48 z-50 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {menuList.map((menu, index) => (
                <Link key={index} href={menu.path} onClick={toggleMenu}>
                  <div
                    className={`flex gap-2 mb-2 p-3 text-slate-500 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${
                      isActive(menu.path) ? "bg-primary text-white" : ""
                    }`}
                  >
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
            <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
          </div>
          <hr className="my-3" />
          <div className="mt-3 p-3">
            {menuList.map((menu, index) => (
              <Link key={index} href={menu.path}>
                <div
                  className={`flex gap-2 mb-2 p-3 text-slate-500 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${
                    isActive(menu.path) ? "bg-primary text-white" : ""
                  }`}
                >
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
