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
import { Course, useCourseContext } from "@/contexts/courses-data";
import globalApi from "@/services/globalApi";
import { getSession } from "@/utils/auth";
import { UploadButton } from "@/components/ui/uploadthing";

const CreateCourseForm = () => {
  const [image, setImage] = useState<{
    fileUrl: string;
    fileKey: string;
  }>({
    fileUrl: "",
    fileKey: "",
  });
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("English");
  const [objective, setObjectives] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const { courses, setCourses } = useCourseContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Check for empty fields
    if (!title || !objective || !description || !language) {
      alert("Please fill out all required fields.");
      return;
    }

    // Check title length (max 30 characters)
    if (title.length > 30) {
      alert("Course title must be at most 30 characters.");
      return;
    }

    // Check course objectives length (max 60 characters)
    if (objective.length > 60) {
      alert("Course objectives must be at most 60 characters.");
      return;
    }
    const course_id = courses.length + 1;
    const userData: any = getSession();
    const teacher_id = userData.id;
    const thumb_img = image.fileUrl;
    // Collect form data
    const formData = {
      title,
      language,
      objective,
      description,
      thumb_img,
      status,
      course_id,
      teacher_id,
    };

    console.log("Form Data:", formData);
    globalApi.addCourse(formData).then((resp: any) => {
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        setCourses((prevCourses) => [...prevCourses, formData]);
      }
    });
  };

  return (
    <div className="my-6 mx-8">
      <form onSubmit={handleSubmit}>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Course Objectives */}
            <div>
              <label className="block font-medium mb-1">
                Course Objectives
              </label>
              <Input
                value={objective}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder="Write bullet points of key objectives this course covers"
                required
              />
            </div>

            {/* Course Description */}
            <div>
              <label className="block font-medium mb-1">
                Course Description
              </label>
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
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    // Update with actual property names from ClientUploadedFileData
                    const { url, key } = res[0];
                    setImage({ fileUrl: url, fileKey: key });
                    alert("Upload Completed");
                  } else {
                    alert("No file uploaded");
                  }
                }}
                onUploadError={(error: Error) => {
                  // Handle upload errors
                  alert(`ERROR! ${error.message}`);
                }}
              />
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
    </div>
  );
};

export default CreateCourseForm;
