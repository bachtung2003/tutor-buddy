"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Student } from "@/contexts/student-courses-data";

// This type is used to define the shape of our data.

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.index + 1, // Auto-increment ID based on row index
  },
  {
    accessorKey: "username",
    header: "Full Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const singleClass = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem
  //             onClick={() =>
  //               navigator.clipboard.writeText(singleClass.class.toString())
  //             }
  //           >
  //             Copy class name
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             <Link href={`/dashboard/classes/${singleClass.id}`}>
  //               View class details
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>Change class name</DropdownMenuItem>
  //           <DropdownMenuItem>Delete class</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
