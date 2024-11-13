import React from "react";
import { Input } from "./input";
import { Search, Command } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center border-2 border-primary rounded-sm px-3 w-full max-w-md">
      {/* Search Icon */}
      <Search className="w-5 h-5 text-primary mr-2" />

      {/* Input field */}
      <Input
        type="text"
        placeholder="Search"
        className="flex-1 border-none placeholder-gray-400 text-sm focus-visible:ring-0"
      />

      {/* Keyboard shortcut indicator */}
      <div className="flex items-center space-x-1">
        <div className="bg-blue-100 text-primary px-1.5 py-0.5 rounded text-xs">
          ⌘
        </div>
        <div className="bg-blue-100 text-primary px-1.5 py-0.5 rounded text-xs">
          F
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
