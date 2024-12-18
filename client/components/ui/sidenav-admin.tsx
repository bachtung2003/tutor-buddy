"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  GraduationCap,
  LayoutDashboard,
  Settings,
  BookOpenText,
  Menu,
  X,
  Trophy,
  Rss,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false); // For the sidebar toggle
  const [isMobile, setIsMobile] = useState(false); // Track screen size
  const pathname = usePathname(); // Get the current path

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard/admin",
    },
    {
      id: 2,
      name: "All Courses",
      icon: BookOpenText,
      path: "/dashboard/admin/courses",
    },
    {
      id: 3,
      name: "All Users",
      icon: User2,
      path: "/dashboard/admin/users",
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when navigating or clicking outside, but exclude menu and button
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (!document.getElementById("mobile-menu")?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
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
  const isActive = (menuPath: string) => {
    // Ensure exact match for non-Dashboard routes
    if (menuPath === "/dashboard/admin") {
      return pathname === menuPath;
    }
    // Highlight for child routes under specific menu items, excluding "Dashboard"
    return pathname.startsWith(menuPath) && pathname !== "/dashboard/admin";
  };

  return (
    <div>
      {isMobile ? (
        // Mobile view: sidebar becomes a dropdown
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent window click handler from firing
              toggleMenu();
            }}
            className="absolute top-3 left-6 z-50 p-2 bg-white rounded-lg shadow-lg"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

          {isOpen && (
            <div
              id="mobile-menu" // Add an ID to target the menu div
              className="absolute top-16 left-6 bg-white shadow-md rounded-lg p-4 w-48 z-50 transition-all duration-300"
              onClick={(e) => e.stopPropagation()} // Prevent window click handler from firing
            >
              {menuList.map((menu, index) => (
                // In your Link component
                <Link
                  key={index}
                  href={menu.path}
                  prefetch={true}
                  onClick={toggleMenu}
                >
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
        <div className="absolute top-0 left-0 h-screen w-64 p-2 bg-white shadow-md">
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
