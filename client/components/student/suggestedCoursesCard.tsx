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
import SuggestedCard from "./singleCardSuggested";
import { CheckCircle, GraduationCap } from "lucide-react";
import { Badge } from "../ui/badge";

export function Suggested() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-[#1C1D1D] flex justify-between">
          <div>Suggested Courses</div>
          <Link href={"#"}>
            <Badge>All</Badge>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-4">
        <div className="flex justify-between flex-col mb-4">
          <SuggestedCard
            icon={GraduationCap}
            title="UX Design Fundamentals"
            description="How To Install Figma?"
            exploreText="Explore"
            exploreVariant="default" // Default blue button
          />
        </div>
        <div className="flex justify-between flex-col">
          <SuggestedCard
            icon={CheckCircle}
            title="Interaction Design"
            description="Create Your First Project"
            exploreText="Explore"
            exploreVariant="outlined" // Outlined button variant
          />
        </div>
      </CardContent>
    </Card>
  );
}
