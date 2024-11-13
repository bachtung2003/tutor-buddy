"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Assignment } from "@/components/student/achievement/demoData";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Assignment>[] = [
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => <div>{row.getValue("course")}</div>,
  },
  {
    accessorKey: "finishedDate",
    header: "Finished At",
    cell: ({ row }) => <div>{row.getValue("finishedDate")}</div>,
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => (
      <div className="font-bold text-primary">{row.getValue("grade")}</div>
    ),
  },
];
