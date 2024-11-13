import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming Button is part of shadcn UI

interface SuggestedCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  exploreText: string;
  exploreVariant?: "default" | "outlined"; // Allow customization for the explore button
}

const SuggestedCard: React.FC<SuggestedCardProps> = ({
  icon: Icon,
  title,
  description,
  exploreText,
  exploreVariant = "default", // Default variant
}) => {
  return (
    <div className="flex items-center justify-between p-[1.12rem] bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Icon section */}
      <div className="mr-4">
        <Icon className="w-7 h-7 text-black" />
      </div>

      {/* Content section */}
      <div className="flex-1">
        <div className="font-bold text-sm text-black">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>

      {/* Explore button */}
      <div>
        <Button
          variant={exploreVariant === "default" ? "default" : "outline"}
          className={
            exploreVariant === "default"
              ? "text-white bg-primary hover:bg-blue-700"
              : "text-primary border border-primary hover:bg-blue-100"
          }
        >
          {exploreText}
        </Button>
      </div>
    </div>
  );
};

export default SuggestedCard;
