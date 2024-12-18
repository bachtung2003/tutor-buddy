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

type CombinedData = {
  course: string;
  lessonTitle: string;
  score: number;
  status: string;
};

type TopCoursesProps = {
  data: CombinedData[];
};

const GradesCard: React.FC<TopCoursesProps> = ({ data }) => {
  const topCourses = React.useMemo(() => {
    if (data.length === 0) return [];

    // Calculate average scores per course
    const courseScores = data.reduce<
      Record<string, { total: number; count: number }>
    >((acc, item) => {
      if (!acc[item.course]) {
        acc[item.course] = { total: 0, count: 0 };
      }
      acc[item.course].total += item.score;
      acc[item.course].count += 1;
      return acc;
    }, {});

    const averageScores = Object.entries(courseScores).map(
      ([course, { total, count }]) => ({
        course,
        averageScore: total / count,
      })
    );

    // Sort by average score in descending order
    const sortedCourses = averageScores.sort(
      (a, b) => b.averageScore - a.averageScore
    );

    // Return top 2 courses
    return sortedCourses.slice(0, 2);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#1C1D1D]">Your Grades</CardTitle>
      </CardHeader>
      <CardContent className="mx-4">
        {topCourses.length > 0 ? (
          topCourses.map(({ course, averageScore }) => (
            <div key={course} className="flex justify-between flex-col mb-2">
              <div className="text-sm font-semibold">{course}</div>
              <div className="flex justify-between mt-2">
                <div className="text-blue-500 text-sm">Total</div>
                <div className="text-sm text-primary">
                  {averageScore.toFixed(2)}/100
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-between flex-col mb-2 gap-[9px]">
            <br />
            <br />
            <div className="text-center text-sm text-gray-500">
              You are not registered in any courses yet.
            </div>
            <br />
            <br />
          </div>
        )}
      </CardContent>
      {topCourses.length > 0 && (
        <CardFooter className="flex justify-center">
          <Link href="/dashboard/student/assignments" className="w-full">
            <Button className="w-full text-primary bg-[#FFF5F0] text-sm shadow-none hover:text-white hover:bg-primary">
              see more
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default GradesCard;
