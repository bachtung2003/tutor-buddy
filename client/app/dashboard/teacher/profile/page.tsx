"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
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
import { useState, FormEvent } from "react";

const page = () => {
  const [courseName, setCourseName] = useState("");
  const [language, setLanguage] = useState("English");
  const [objectives, setObjectives] = useState("");
  const [description, setDescription] = useState("");
  const [mainPicture, setMainPicture] = useState("Scan.png");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      courseName,
      language,
      objectives,
      description,
      mainPicture,
    };

    console.log("Form Data:", formData);

    // Here you can handle form submission, e.g., send data to a backend
  };
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
      </div>
      <Separator className="my-4" />
      {/* Page Body */}
      <div>
        <form onSubmit={handleSubmit} className="my-6 mx-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Section */}
            <table className="md:col-span-3 space-y-4 border-spacing-y-3 border-separate table-auto">
              <tbody>
                {/* Name */}
                <tr>
                  <td className="w-44">
                    <label className=" font-medium">Username</label>
                  </td>
                  <td>
                    <Input
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="Write your course name here"
                      className="border "
                      required
                    />
                  </td>
                </tr>

                {/* Language */}
                <tr>
                  <td>
                    <label className=" font-medium">Language(s)</label>
                  </td>
                  <td>
                    <Select onValueChange={(value) => setLanguage(value)}>
                      <SelectTrigger className="w-fit border">
                        <Globe className="mr-2" />
                        <SelectValue placeholder={language} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>

                {/* Course Objectives */}
                <tr>
                  <td>
                    <label className=" font-medium">Course Objectives</label>
                  </td>
                  <td>
                    <Input
                      value={objectives}
                      onChange={(e) => setObjectives(e.target.value)}
                      placeholder="Write bullet points of key objectives this course covers"
                      required
                    />
                  </td>
                </tr>

                {/* Course Description */}
                <tr>
                  <td>
                    <label className=" font-medium">Course Description</label>
                  </td>
                  <td>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="This is the course details, where teachers describe the course’s target students, what it includes, what it brings to students."
                      className="border "
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Right Section - Course Pictures */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Course Pictures</h2>

              {/* Main Picture */}
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 px-4 py-2 rounded-lg text-blue-600 font-semibold">
                  {mainPicture}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-500"
                  onClick={() => setMainPicture("")}
                >
                  X
                </Button>
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
      </div>
    </div>
  );
};

export default page;
