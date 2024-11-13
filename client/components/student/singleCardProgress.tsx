import React from "react";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react"; // Import LucideIcon type

// Define the card props
interface ProgressCardProps {
  icon: LucideIcon; // Use LucideIcon type for the icon prop
  title: string; // Title text
  progressPercentage: number; // Progress percentage
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  icon: Icon, // Destructure the icon prop
  title,
  progressPercentage,
}) => {
  return (
    <div className="flex items-center p-3 border border-blue-500 rounded-lg shadow-md">
      {/* Icon from Lucide */}
      <div className="mr-4">
        <Icon className="w-7 h-7 text-blue-600" />{" "}
        {/* Set the size and color */}
      </div>

      {/* Content section */}
      <div className="flex-1">
        <div className="text-blue-600 font-bold text-sm">{title}</div>
        <div className="text-gray-500 text-xs">{progressPercentage}%</div>

        {/* Progress Bar */}
        <Progress
          value={progressPercentage}
          className="mt-2 bg-blue-200 h-1 rounded-full"
        />
      </div>
    </div>
  );
};

export default ProgressCard;
