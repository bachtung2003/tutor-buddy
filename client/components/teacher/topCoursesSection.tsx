"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

export default function TopCoursesSection() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Top 3 courses</CardTitle>
          <CardDescription>Showing top 3 most learners courses</CardDescription>
        </div>
        <div className="flex flex-col justify-center px-6 py-4 sm:px-8 sm:py-6">
          <Button>View All</Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead className="text-right">Learners</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">01</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>Thereotical Model Of Computing</TableCell>
              <TableCell className="text-right">250</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">02</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>Physic 2</TableCell>
              <TableCell className="text-right">400</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">03</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>Next.js Programming</TableCell>
              <TableCell className="text-right">600</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
