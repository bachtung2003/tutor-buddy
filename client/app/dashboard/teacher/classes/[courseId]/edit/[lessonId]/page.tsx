"use client";
import { Button } from "@/components/ui/button";
import { useAssignmentContext } from "@/contexts/assignment-data";
import { useCourseContext } from "@/contexts/courses-data";
import { useLessonContext } from "@/contexts/lessons-data";
import axios from "axios";
import { PlayCircle, Star, Undo2, Users, Copy } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  title: string;
  description: string;
  lesson_url: string;
  duration: number;
  assignments: Assignment[];
}

interface Answer {
  answer_id: number;
  assignment_id: number;
  text: string;
  isCorrect: boolean;
}

interface Assignment {
  id: number;
  title: string;
  answers: Answer[];
}

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const page = ({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) => {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    lesson_url: "",
    duration: 0,
    assignments: [],
  });

  const { getCourseDetails, singleCourse } = useCourseContext();
  const { getSingleLesson, lessonDetails } = useLessonContext();
  const { getAllAssignmentsList, assignments } = useAssignmentContext();

  useEffect(() => {
    getCourseDetails(params.courseId);
    getSingleLesson(params.lessonId);
    getAllAssignmentsList(params.lessonId);
  }, []);

  console.log(assignments);

  const handleQuestionChange = (id: number, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      assignments: prevForm.assignments.map((q) =>
        q.id === id ? { ...q, title: value } : q
      ),
    }));
  };

  const handleAnswerChange = (
    questionId: number,
    answerIndex: number,
    value: string
  ) => {
    setForm((prevForm) => ({
      ...prevForm,
      assignments: prevForm.assignments.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a, index) =>
                index === answerIndex ? { ...a, text: value } : a
              ),
            }
          : q
      ),
    }));
  };

  const handleCorrectToggle = (questionId: number, answerIndex: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      assignments: prevForm.assignments.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a, index) =>
                index === answerIndex ? { ...a, isCorrect: !a.isCorrect } : a
              ),
            }
          : q
      ),
    }));
  };

  const addAnswer = (questionId: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      assignments: prevForm.assignments.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: [
                ...q.answers,
                {
                  text: "",
                  isCorrect: false,
                  assignment_id: questionId,
                  answer_id: q.answers.length
                    ? Math.max(...q.answers.map((a) => a.answer_id)) + 1
                    : 1, // Increment based on the highest answer_id or start from 1
                },
              ],
            }
          : q
      ),
    }));
  };

  const removeAnswer = (questionId: number, answerIndex: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      assignments: prevForm.assignments.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.filter((_, index) => index !== answerIndex),
            }
          : q
      ),
    }));
  };

  const addQuestion = () => {
    setForm((prevForm) => ({
      ...prevForm,
      assignments: [
        ...prevForm.assignments,
        {
          id: prevForm.assignments.length + 1, // Sequential ID
          title: "",
          answers: [
            {
              text: "",
              isCorrect: false,
              assignment_id: prevForm.assignments.length + 1,
              answer_id: 1,
            },
          ],
        },
      ],
    }));
  };

  const removeQuestion = (questionId: number) => {
    setForm((prevForm) => {
      const updatedQuestions = prevForm.assignments
        .filter((q) => q.id !== questionId) // Remove the question
        .map((q, index) => ({ ...q, id: index + 1 })); // Reset IDs sequentially

      return { ...prevForm, assignments: updatedQuestions };
    });
  };

  const renderVideoPreview = (url: string) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      const videoId = match[1];
      return (
        <div className="w-full aspect-video mt-4">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            allowFullScreen
            className="w-full h-full rounded-md"
          ></iframe>
        </div>
      );
    }
    return null;
  };

  const fetchVideoDuration = async (url: string, apiKey: string) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(youtubeRegex);

    if (match && match[1]) {
      const videoId = match[1];

      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`
        );
        const duration = response.data.items[0]?.contentDetails?.duration;

        if (duration) {
          // Convert ISO 8601 duration format to readable format (optional)
          return convertISO8601ToSeconds(duration);
        }
      } catch (error) {
        console.error("Error fetching video duration:", error);
      }
    }
    return null;
  };

  const convertISO8601ToSeconds = (isoDuration: string) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = isoDuration.match(regex);

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (matches) {
      hours = matches[1] ? parseInt(matches[1]) : 0;
      minutes = matches[2] ? parseInt(matches[2]) : 0;
      seconds = matches[3] ? parseInt(matches[3]) : 0;
    }

    // Convert all to seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  };

  // Inside your form handler or onChange event
  const handleUrlChange = async (url: string) => {
    setForm((prevForm) => ({ ...prevForm, url }));
    if (!apiKey) {
      throw new Error(
        "API key is missing. Please set NEXT_PUBLIC_YOUTUBE_API_KEY."
      );
    }
    const duration = await fetchVideoDuration(url, apiKey);
    if (duration) {
      console.log("Video Duration:", duration);
      // Update the form or UI with the video duration
      setForm((prevForm) => ({ ...prevForm, duration }));
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white p-8 text-left">
        <div className="flex gap-1 items-center">
          <Undo2 size={"15px"} />
          <div
            className="capitalize cursor-pointer text-white hover:underline"
            onClick={() => router.back()}
          >
            Go Back
          </div>
        </div>

        <h1 className="text-3xl font-bold">{singleCourse?.title}</h1>
        <div className="flex space-x-4 items-center mt-2">
          <p className="text-sm">ACCESSTRADE Academy</p>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="w-4 h-4 text-orange-400" />
            <Star className="w-4 h-4 text-orange-400" />
            <Star className="w-4 h-4 text-orange-400" />
            <Star className="w-4 h-4 text-orange-400" />
            <span className="ml-1">4 Ratings</span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Users className="w-4 h-4" />
            <span>221 Students</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Lesson */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold mb-4">
              {lessonDetails?.title}
            </h2>
          </div>
          <div className="flex justify-center">
            <h2 className="text-lg font-light text-justify mb-4">
              {lessonDetails?.description}
            </h2>
          </div>
          <div className="flex justify-center gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                  <DialogDescription>
                    Change lesson title and description
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label className="">Title</Label>
                    <Input id="title" placeholder={lessonDetails?.title} />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="">
                      Description
                    </Label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      // onChange={handleInputChange}
                      placeholder={lessonDetails?.description}
                      rows={4}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    ></textarea>
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">Undo</Button>
          </div>
        </section>
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold mb-4">Lesson Video</h2>
          </div>
          {renderVideoPreview(lessonDetails ? lessonDetails.lesson_url : "")}
          <div className="my-4 flex justify-center gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                  <DialogDescription>
                    Change the lesson video link
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      defaultValue="https://ui.shadcn.com/docs/installation"
                      readOnly
                    />
                  </div>
                  <Button type="submit" size="sm" className="px-3">
                    <span className="sr-only">Copy</span>
                    <Copy />
                  </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">Undo</Button>
          </div>
        </section>
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold">Assignments</h2>
          </div>
          <div className="flex justify-center flex-col">
            {assignments.map((assignment, index) => (
              <div key={index} className="space-y-4 border-b py-4 relative">
                <div className="flex justify-between items-center">
                  <label className="block text-xl font-medium text-gray-700">
                    Question {assignment.id}: {assignment.title}
                  </label>
                </div>
                {assignment.answers.map((answer, index) => (
                  <div key={index} className="flex  items-center space-x-3">
                    {answer.isCorrect ? (
                      <div className="text-primary  hover:bg-gray-50">
                        {answer.text}
                      </div>
                    ) : (
                      <div className=" hover:bg-gray-50">{answer.text}</div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="my-4 flex justify-center gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                  <DialogDescription>Change assignments</DialogDescription>
                </DialogHeader>
                <div className="flex justify-center flex-col">
                  {assignments.map((assignment, index) => (
                    <div
                      key={index}
                      className="space-y-4 border-b py-4 relative"
                    >
                      <div className="flex justify-between items-center">
                        <label className="block text-xl font-medium text-gray-700">
                          Question {assignment.id}: {assignment.title}
                        </label>
                        <button
                          type="button"
                          // onClick={() => removeAnswer(question.id, index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </div>
                      {assignment.answers.map((answer, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between space-x-3"
                        >
                          <div className="flex gap-2 items-center">
                            <input
                              type="checkbox"
                              checked={answer.isCorrect}
                              // onChange={() =>
                              //   handleCorrectToggle(question.id, index)
                              // }
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <div>{answer.text}</div>
                          </div>

                          <button
                            type="button"
                            // onClick={() => removeAnswer(question.id, index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">Undo</Button>
          </div>
        </section>
        <section>
          <div className="flex justify-center">
            <Button>Done</Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
