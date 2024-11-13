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

export function GradesCard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-[#1C1D1D]">Your Grades</CardTitle>
      </CardHeader>
      <CardContent className="mx-4">
        <div className="flex justify-between flex-col mb-2">
          <div className="text-sm font-semibold">Linear Algebra</div>
          <div className="flex justify-between mt-2">
            <div className="text-blue-500 text-sm">Total</div>
            <div className="text-sm text-primary">100/100</div>
          </div>
        </div>
        <div className="flex justify-between flex-col">
          <div className="text-sm font-semibold">Calculus</div>
          <div className="flex justify-between mt-2">
            <div className="text-blue-500 text-sm">Total</div>
            <div className="text-sm text-primary">100/100</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center ">
        <Link href={"/dashboard/student/assignments"} className="w-full">
          <Button className="w-full text-primary bg-[#FFF5F0] text-sm shadow-none hover:text-white hover:bg-primary">
            see more
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
