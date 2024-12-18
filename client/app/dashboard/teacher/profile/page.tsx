"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { FormEvent } from "react";
import defaultAvatar from "@/public/default-avatar.jpg";
import Image from "next/image";
import { getSession } from "@/utils/auth";
import { useCourseContext } from "@/contexts/courses-data";
import TopCoursesSection from "@/components/teacher/topCoursesSection";
import { UploadButton } from "@/components/ui/uploadthing";
import globalApi from "@/services/globalApi";

interface Profile {
  fullname: string;
  phone: string;
  email: string;
  address: string;
  profile_picture: string;
}

const page = () => {
  const [image, setImage] = useState<{
    fileUrl: string;
    fileKey: string;
  }>({
    fileUrl: "",
    fileKey: "",
  });
  const [tempInfos, setTempInfos] = useState<Profile>({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    profile_picture: "",
  });
  const [user, setUser] = useState<any>(null); // Hold user data in state
  const [editing, setEditing] = useState(false); // State to control form visibility
  const { topCourses, getTopCourses } = useCourseContext();

  useEffect(() => {
    globalApi.getUserInfos().then((resp) => {
      setUser(resp.data);
    });
    getTopCourses();
  }, []);
  useEffect(() => {
    if (user) {
      setTempInfos({
        fullname: user.fullname || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
        profile_picture: user.profile_picture || defaultAvatar.src,
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleChange = (key: string, newValue: string) => {
    setTempInfos((prevState) => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    globalApi.updateUserInfos(tempInfos);
    console.log("Form Data:", tempInfos);

    // Here you can handle form submission, e.g., send data to a backend
  };

  // Handle Image Upload
  const handleImageUploadComplete = (res: any) => {
    if (res && res.length > 0) {
      // Update with actual property names from ClientUploadedFileData
      const { url, key } = res[0];
      setImage({ fileUrl: url, fileKey: key });
      const profile_picture_url = url;
      handleChange("profile_picture", profile_picture_url); // Update main picture in state
    } else {
      alert("No file uploaded");
    }
  };

  // Avoid rendering the username until we have user data
  if (!user) {
    return <div>Loading...</div>; // Optional: Loading state
  }

  return (
    <div className="my-6 mx-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="text-3xl text-primary font-bold">My Profile</div>
          <div className="text-gray-500 font-thin">
            Manage profile information for account security
          </div>
        </div>
        <Button onClick={handleEditToggle} className="bg-blue-600 text-white">
          {editing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <Separator className="my-4" />

      {/* Page Body */}
      <div>
        {editing ? (
          <form onSubmit={handleSubmit} className="my-6 mx-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left Section */}
              <table className="md:col-span-3 space-y-4 border-spacing-y-3 border-separate table-auto">
                <tbody>
                  {/* User Details Fields */}
                  <tr>
                    <td className="w-44">
                      <label className="font-medium">Username:</label>
                    </td>
                    <td>
                      <p>{user.username}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-44">
                      <label className="font-medium">Role:</label>
                    </td>
                    <td>
                      <p>{user.role}</p>
                    </td>
                  </tr>
                  {[
                    {
                      label: "Full Name",
                      value: user.fullname,
                      id: "fullname",
                    },
                    { label: "Phone", value: user.phone, id: "phone" },
                    { label: "Email", value: user.email, id: "email" },
                    { label: "Address", value: user.address, id: "address" },
                  ].map(({ label, value, id }) => (
                    <tr key={label}>
                      <td className="w-44">
                        <label className="font-medium">{label}:</label>
                      </td>
                      <td>
                        <Input
                          onChange={(e) => {
                            handleChange(id, e.target.value);
                          }}
                          defaultValue={value}
                        ></Input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Right Section - Profile Picture */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Profile Picture</h2>
                <div className="flex flex-col items-center gap-4 space-x-2">
                  <Image
                    src={tempInfos.profile_picture}
                    alt="Profile Picture"
                    className="rounded-full"
                    width={200}
                    height={200}
                  />
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={handleImageUploadComplete}
                    onUploadError={(error: Error) => {
                      // Handle upload errors
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center mt-6">
              <Button type="submit" className="bg-blue-600 text-white">
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="my-6 mx-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left Section */}
              <table className="md:col-span-3 space-y-4 border-spacing-y-3 border-separate table-auto">
                <tbody>
                  {/* User Details Fields */}
                  {[
                    { label: "Username", value: user.username },
                    { label: "Role", value: user.role },
                    { label: "Full Name", value: user.fullname },
                    { label: "Phone", value: user.phone },
                    { label: "Email", value: user.email },
                    { label: "Address", value: user.address },
                  ].map(({ label, value }) => (
                    <tr key={label}>
                      <td className="w-44">
                        <label className="font-medium">{label}:</label>
                      </td>
                      <td>
                        <p>{value}</p>
                      </td>
                    </tr>
                  ))}

                  {/* Course Objectives */}
                  <tr className="mt-4">
                    <td colSpan={2}>
                      <TopCoursesSection courses={topCourses} />
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Right Section - Profile Picture */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Profile Picture</h2>
                <div className="flex flex-col items-center gap-4 space-x-2">
                  <Image
                    src={tempInfos.profile_picture}
                    alt="Profile Picture"
                    className="rounded-full"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
