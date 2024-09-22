"use client";
import React from "react";
import { User } from "lucide-react";

const Header = () => {
  return (
    <div className="p-7 shadow-sm border flex justify-between">
      <div></div>
      <div>
        <User />
      </div>
    </div>
  );
};

export default Header;
