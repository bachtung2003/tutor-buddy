import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCourseContext } from "@/contexts/courses-data";
import { useEffect, useState } from "react";
export default function SheetDemo() {
  const { updateCourseInfo, singleCourse } = useCourseContext();

  // State to manage form data
  const [formData, setFormData] = useState({
    title: "",
    language: "",
    objective: "",
    description: "",
    status: "",
  });

  // Load initial data when the sheet opens
  useEffect(() => {
    if (singleCourse) {
      setFormData({
        title: singleCourse.title || "",
        language: singleCourse.language || "",
        objective: singleCourse.objective || "",
        description: singleCourse.description || "",
        status: "pending",
      });
    }
  }, [singleCourse]);

  // Generic handler for input changes
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (singleCourse?.course_id) {
      updateCourseInfo(singleCourse.course_id.toString(), {
        ...singleCourse,
        ...formData, // Updated fields
      });
      window.location.reload(); // Reload the page after successful update
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-primary text-white w-full">
          Edit Course
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Course</SheetTitle>
            <SheetDescription>
              Make changes to your course here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {/* Course Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Course Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Language Dropdown */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right">
                Language
              </Label>
              <Select
                onValueChange={(value) => handleChange("language", value)}
                value={formData.language}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Course Objective */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="objective" className="text-right">
                Objective
              </Label>
              <Input
                id="objective"
                value={formData.objective}
                onChange={(e) => handleChange("objective", e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Course Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
