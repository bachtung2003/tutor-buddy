"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Assignment } from "@/components/student/assignments/demoData";
import { ArrowUpDown } from "lucide-react";

type Assignments = {
  course?: string;
  lessonTitle?: string;
  score: number;
  status: string;
};
export const columns: ColumnDef<Assignments>[] = [
  {
    accessorKey: "lessonTitle",
    header: "Lesson Title",
    cell: ({ row }) => <div>{row.getValue("lessonTitle")}</div>,
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => <div>{row.getValue("course")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "Submitted" ? "default" : "destructive"}>
          {status}
        </Badge>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = rowA.getValue(columnId) as string;
      const statusB = rowB.getValue(columnId) as string;

      // Custom sorting logic
      if (statusA === statusB) return 0;
      if (statusA === "Submitted") return -1; // Submitted should come before Unsubmitted
      return 1; // Unsubmitted should come after Submitted
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => <div className="font-bold">{row.getValue("score")}</div>,
  },
];
