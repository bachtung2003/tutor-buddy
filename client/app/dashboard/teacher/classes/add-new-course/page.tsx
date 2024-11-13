"use client";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";

const CreateCourseForm = () => {
  const [courseName, setCourseName] = useState("");
  const [language, setLanguage] = useState("English");
  const [objectives, setObjectives] = useState("");
  const [description, setDescription] = useState("");
  const [mainPicture, setMainPicture] = useState("Scan.png");
  const [wallpaper, setWallpaper] = useState("Scan.png");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      courseName,
      language,
      objectives,
      description,
      mainPicture,
      wallpaper,
    };

    console.log("Form Data:", formData);

    // Here you can handle form submission, e.g., send data to a backend
  };

  return (
    <form onSubmit={handleSubmit} className="my-6 mx-8">
      <h1 className="text-3xl text-primary font-bold mb-2">
        Create New Course
      </h1>
      <p className="text-gray-500 mb-6">
        It may take a few minutes to be uploaded and viewed by other users.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Section */}
        <div className="md:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold">Course Information</h2>

          {/* Course Name */}
          <div>
            <label className="block font-medium mb-1">Course Name</label>
            <Input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Write your course name here"
              className="border "
              required
            />
          </div>

          {/* Language */}
          <div>
            <label className="block font-medium mb-1">Language(s)</label>
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
          </div>

          {/* Course Objectives */}
          <div>
            <label className="block font-medium mb-1">Course Objectives</label>
            <Input
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="Write bullet points of key objectives this course covers"
              required
            />
          </div>

          {/* Course Description */}
          <div>
            <label className="block font-medium mb-1">Course Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="This is the course details, where teachers describe the course’s target students, what it includes, what it brings to students."
              className="border "
              required
            />
          </div>
        </div>

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
      <div className="flex items-center justify-between mt-6">
        <Link href={"/dashboard/teacher/classes"}>
          <Button type="button" variant="outline" className="text-gray-600">
            Cancel
          </Button>
        </Link>
        <Button type="submit" className="bg-blue-600 text-white">
          Save Changes
        </Button>
      </div>

      {/* Footer Text */}
      <p className="text-xs text-gray-500 mt-4">
        By Clicking ‘Save Changes’, You Agree The Content Moderation From
        TutorBuddy Admin Team
      </p>
    </form>
  );
};

export default CreateCourseForm;
