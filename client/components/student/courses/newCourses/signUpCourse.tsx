import { Button } from "@/components/ui/button";
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
import { useStudentCourseContext } from "@/contexts/student-courses-data";
import { useRouter } from "next/navigation";
interface SignUpCourseProps {
  course_id: string;
  student_id: string;
}

export default function SignUpCourse({
  course_id,
  student_id,
}: SignUpCourseProps) {
  const { addStudentCourse } = useStudentCourseContext();
  const router = useRouter(); // Initialize the Next.js router

  // Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      course_id: parseInt(course_id),
      student_id: parseInt(student_id),
    };
    addStudentCourse(data);
    // Navigate back to the desired page after successful submission
    router.push("/dashboard/student/courses");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-primary text-white w-full">
          Sign-up
        </Button>
      </SheetTrigger>
      <SheetContent side="mid">
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Sign-up</SheetTitle>
            <SheetDescription>
              By choosing to Sign-Up for this course, you have agreed to all the
              terms and conditions of the author.
            </SheetDescription>
          </SheetHeader>

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Done</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
