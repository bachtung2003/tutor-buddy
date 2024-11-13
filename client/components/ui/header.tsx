"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies
import { getSession } from "@/utils/auth";
import SearchBar from "./search-bar";

const Header = () => {
  const router = useRouter();

  // State to hold the user data only after client-side rendering
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch session data on the client side
    const fetchedUser = getSession();
    setUser(fetchedUser);
  }, []);

  const handleLogout = () => {
    // Clear tokens from cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    // Redirect and refresh page to reflect logout immediately
    router.replace("/login");
    router.refresh(); // Forces Next.js to re-render the page and re-check cookies
  };

  // Prevent server-side rendering of the user information to avoid mismatch
  if (!user) {
    return null; // Optionally, you can return a loader or skeleton here
  }

  return (
    <div className="p-7 shadow-sm border flex justify-between h-[68px]">
      <div className="self-center">
        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>

      <div className="self-center flex flex-row">
        <User />
        <div className="mx-2 text-sm self-center">{user?.username}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button aria-label="User Menu">
              <ChevronDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/dashboard")}>
              Account Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
