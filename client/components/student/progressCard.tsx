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

export function Progress() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-[#1C1D1D] flex justify-between">
          <div>Pick Up Where You Left Off</div>
          <Link href={"#"}>
            <Badge>All</Badge>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-4">
        <div className="flex justify-between flex-col mb-4">
          <ProgressCard
            icon={Figma} // Use the Lucide icon
            title="User Experience (UX) Design"
            progressPercentage={65} // Example progress value
          />
        </div>
        <div className="flex justify-between flex-col">
          <ProgressCard
            icon={Figma} // Use the Lucide icon
            title="User Experience (UX) Design"
            progressPercentage={65} // Example progress value
          />
        </div>
      </CardContent>
    </Card>
  );
}
