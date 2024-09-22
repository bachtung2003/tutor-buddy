"use client";
import Image from "next/image";
import {
  GraduationCap,
  Hand,
  LayoutDashboard,
  Settings,
  University,
  User,
} from "lucide-react";
import React from "react";
import Link from "next/link";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Classes",
      icon: University,
      path: "/dashboard/classes",
    },
    {
      id: 3,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 4,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 5,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];
  return (
    <div className="border shadow-md h-screen p-2">
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
      <div className="flex gap-2 items-center bottom-5 fixed">
        <User />
        <div>
          <h2 className="text-sm font-bold">admin</h2>
          <h2 className="text-xs text-slate-400">admin@gmail.com</h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
