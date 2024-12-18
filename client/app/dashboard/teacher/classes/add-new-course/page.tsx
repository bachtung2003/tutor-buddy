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
import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { Course, useCourseContext } from "@/contexts/courses-data";
import globalApi from "@/services/globalApi";
import { getSession } from "@/utils/auth";
import { UploadButton } from "@/components/ui/uploadthing";
import { useRouter, usePathname } from "next/navigation"; // Usage: App router

const CreateCourseForm = () => {
  const router = useRouter();
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
  const [showSuccess, setShowSuccess] = useState(false); // Success message state
  const { unregisteredCourses, getAllUnregisteredCourses, setCourses } =
    useCourseContext();

  useEffect(() => {
    getAllUnregisteredCourses();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation checks
    if (!title || !objective || !description || !language) {
      alert("Please fill out all required fields.");
      return;
    }
    if (title.length > 30) {
      alert("Course title must be at most 30 characters.");
      return;
    }
    if (objective.length > 60) {
      alert("Course objectives must be at most 60 characters.");
      return;
    }

    const course_id = unregisteredCourses.length + 1;
    const userData: any = getSession();
    const teacher_id = userData.id;
    const thumb_img = image.fileUrl;

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

    try {
      const resp = await globalApi.addCourse(formData);
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        setCourses((prevCourses) => [...prevCourses, formData]);
        setShowSuccess(true); // Show success message
        setTimeout(() => {
          router.back(); // Redirect after 3 seconds
        }, 3000);
      }
    } catch (error) {
      alert("An error occurred while adding the course.");
    }
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

            <div>
              <label className="block font-medium mb-1">Course Name</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write your course name here"
                className="border"
                required
              />
            </div>

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

            <div>
              <label className="block font-medium mb-1">
                Course Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="This is the course details, where teachers describe the course’s target students, what it includes, what it brings to students."
                className="border"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Course Pictures</h2>
            <div className="flex items-center space-x-2">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    const { url, key } = res[0];
                    setImage({ fileUrl: url, fileKey: key });
                    alert("Upload Completed");
                  } else {
                    alert("No file uploaded");
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Link href={"/dashboard/teacher/classes"}>
            <Button
              type="button"
              variant="outline"
              className="text-gray-600"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="bg-blue-600 text-white">
            Save Changes
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          By Clicking ‘Save Changes’, You Agree The Content Moderation From
          TutorBuddy Admin Team
        </p>
      </form>

      {showSuccess && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold">Course Added Successfully!</h2>
            <p className="mt-2 text-gray-500">
              You will be redirected shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourseForm;
