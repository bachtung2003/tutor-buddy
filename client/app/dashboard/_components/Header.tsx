"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useRouter } from "next/navigation"; // Assuming you want to use router for navigation

const Header = () => {
  const router = useRouter();

  return (
    <div className="p-7 shadow-sm border flex justify-between h-[92px]">
      <div></div>
      <div className="self-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button aria-label="User Menu" >
              <User />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/dashboard")}>
              Account Details
            </DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
