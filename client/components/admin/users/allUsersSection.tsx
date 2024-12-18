"use client";

import * as React from "react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useCourseContext } from "@/contexts/courses-data";
import globalApi from "@/services/globalApi";

// Define the User type
type User = {
  user_id: number;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  role: string;
};

interface UsersSectionProps {
  users: User[];
}

const AllUsersSection: React.FC<UsersSectionProps> = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const handleCheckboxChange = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelected = () => {
    selectedUsers.map((userId) => {
      globalApi.deleteUser(userId.toString());
    });
    setSuccessMessage("Users deleted successfully!");

    setTimeout(() => {
      setSuccessMessage(null);
      window.location.reload(); // Reload the page after 3 seconds
    }, 3000);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>All Users</CardTitle>
          <CardDescription>Showing all users in the system</CardDescription>
        </div>
        <div className="flex flex-col justify-center px-6 py-4 sm:px-8 sm:py-6">
          <Button
            onClick={handleDeleteSelected}
            disabled={!selectedUsers.length}
          >
            Delete Selected
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
            {successMessage}
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Select</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.user_id)}
                    onChange={() => handleCheckboxChange(user.user_id)}
                  />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-center">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AllUsersSection;
