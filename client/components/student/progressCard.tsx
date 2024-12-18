import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import ProgressCard from "./singleCardProgress";
import { Figma } from "lucide-react";
import { Badge } from "../ui/badge";

type CombinedData = {
  course: string;
  lessonTitle: string;
  score: number;
  status: string;
};

type CompletionPercentageProps = {
  data: CombinedData[];
};

const Progress: React.FC<CompletionPercentageProps> = ({ data }) => {
  const topNearlyCompletedCourses = React.useMemo(() => {
    if (data.length === 0) return [];

    // Calculate completion percentage per course
    const courseCompletion = data.reduce<
      Record<string, { completed: number; total: number }>
    >((acc, item) => {
      if (!acc[item.course]) {
        acc[item.course] = { completed: 0, total: 0 };
      }
      acc[item.course].total += 1;
      if (item.status === "Submitted") {
        acc[item.course].completed += 1;
      }
      return acc;
    }, {});

    const completionPercentages = Object.entries(courseCompletion).map(
      ([course, { completed, total }]) => ({
        course,
        percentage: (completed / total) * 100,
      })
    );

    // Sort courses by completion percentage in descending order
    const sortedCourses = completionPercentages.sort(
      (a, b) => b.percentage - a.percentage
    );

    // Return top 2 nearly completed courses
    return sortedCourses.slice(0, 2);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#1C1D1D] flex justify-between">
          <div>Pick Up Where You Left Off</div>
          <Link href="#">
            <Badge>All</Badge>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-4 gap-4 flex flex-col">
        {topNearlyCompletedCourses.length > 0 ? (
          topNearlyCompletedCourses.map(({ course, percentage }, index) => (
            <div key={index} className="flex justify-between flex-col">
              <ProgressCard
                icon={Figma} // Use the Lucide icon
                title={course}
                progressPercentage={parseInt(percentage.toFixed(0))} // Example progress value
              />
            </div>
          ))
        ) : (
          <div className="flex justify-between flex-col mb-2 gap-5">
            <br />
            <br />
            <div className="text-center text-sm text-gray-500">
              No progress data available yet.
            </div>
            <br />
            <br />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Progress;
