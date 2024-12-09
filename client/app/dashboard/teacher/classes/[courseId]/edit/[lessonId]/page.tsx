"use client";
import { Button } from "@/components/ui/button";
import { useAssignmentContext } from "@/contexts/assignment-data";
import { useCourseContext } from "@/contexts/courses-data";
import { useLessonContext } from "@/contexts/lessons-data";
import axios from "axios";
import { PlayCircle, Star, Undo2, Users, Copy } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
  // answer_id: number;
  // assignment_id: number;
  text: string;
  isCorrect: boolean;
}

interface Assignment {
  assignment_id: number;
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

  const { getCourseDetails, singleCourse } = useCourseContext();
  const { getSingleLesson, lessonDetails, updateLesson } = useLessonContext();
  const {
    getAllAssignmentsList,
    assignments,
    updateAssignment,
    getFullAssignment,
    fullAssignments,
    deleteAssignment,
  } = useAssignmentContext();

  useEffect(() => {
    getCourseDetails(params.courseId);
    getSingleLesson(params.lessonId);
    getAllAssignmentsList(params.lessonId);
  }, []);
  console.log(assignments);

  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    lesson_url: "",
    duration: 0,
    assignments: [],
  });
  const [tempLessonDetails, setTempLessonDetails] = useState({
    title: "",
    description: "",
    lesson_url: "",
  });
  // Update tempLessonDetails when lessonDetails changes
  useEffect(() => {
    if (lessonDetails) {
      setTempLessonDetails({
        title: lessonDetails.title || "",
        description: lessonDetails.description || "",
        lesson_url: lessonDetails.lesson_url || "",
      });
    }
  }, [lessonDetails]);

  const [tempAssignments, setTempAssignments] = useState<Assignment[]>([]);
  useEffect(() => {
    if (assignments) {
      setTempAssignments(assignments);
      getFullAssignment();
    }
  }, [assignments]);
  console.log(tempAssignments);
  console.log(fullAssignments);

  const handleDeleteAssignment = (deleteIndex: number) => {
    setTempAssignments((prevItems) => {
      const deletedAssignment = prevItems[deleteIndex];
      const updatedAssignments = prevItems.filter(
        (_, index) => index !== deleteIndex
      );
      const assignment_id = deletedAssignment.assignment_id;

      // Log or use the assignment_id of the deleted assignment
      console.log("Deleted Assignment ID:", deletedAssignment.assignment_id);
      deleteAssignment(params.lessonId, assignment_id.toString());

      return updatedAssignments;
    });
  };

  const handleDeleteAnswer = (assignmentIndex: number, deleteIndex: number) => {
    setTempAssignments((prevData) =>
      prevData.map((assignment, index) => {
        if (index === assignmentIndex) {
          return {
            ...assignment,
            answers: assignment.answers.filter((_, i) => i !== deleteIndex),
          };
        }
        return assignment;
      })
    );
  };

  const handleQuestionTitleChange = (
    asmIndex: number,
    key: string,
    newValue: string
  ) => {
    setTempAssignments((prevData) =>
      prevData.map((assignment, index) => {
        if (index === asmIndex) {
          return {
            ...assignment,
            [key]: newValue,
          };
        }
        return assignment;
      })
    );
  };

  const handleCorrectToggle = (
    parentIndex: number,
    childIndex: number,
    key: string,
    newValue: boolean
  ) => {
    setTempAssignments((prevData) =>
      prevData.map((parent, pIndex) =>
        pIndex === parentIndex
          ? {
              ...parent,
              answers: parent.answers.map((child, cIndex) =>
                cIndex === childIndex ? { ...child, [key]: newValue } : child
              ),
            }
          : parent
      )
    );
  };

  const handleAnswerChange = (
    parentIndex: number,
    childIndex: number,
    key: string,
    newValue: string
  ) => {
    setTempAssignments((prevData) =>
      prevData.map((parent, pIndex) =>
        pIndex === parentIndex
          ? {
              ...parent,
              answers: parent.answers.map((child, cIndex) =>
                cIndex === childIndex ? { ...child, [key]: newValue } : child
              ),
            }
          : parent
      )
    );
  };

  const handleSaveLessonDetails = () => {
    setForm((prevForm) => ({
      ...prevForm,
      title: tempLessonDetails.title,
      description: tempLessonDetails.description,
    }));
  };

  const addAnswer = (questionIndex: number) => {
    setTempAssignments((prevData) =>
      prevData.map((parent, pIndex) =>
        pIndex === questionIndex
          ? {
              ...parent,
              answers: [
                ...parent.answers,
                {
                  text: "New Answer",
                  isCorrect: false,
                },
              ],
            }
          : parent
      )
    );
  };

  const addQuestion = () => {
    setTempAssignments((prevForm) => [
      ...prevForm,
      {
        assignment_id:
          fullAssignments.length +
          (tempAssignments.length - assignments.length + 1), // Ensure unique ID for the new question
        title: "New Question",
        answers: [
          {
            text: "New Answer",
            isCorrect: false,
          },
        ],
      },
    ]);
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

  const handleSubmit = async () => {
    if (!apiKey) {
      throw new Error(
        "API key is missing. Please set NEXT_PUBLIC_YOUTUBE_API_KEY."
      );
    }
    const duration = await fetchVideoDuration(
      tempLessonDetails.lesson_url,
      apiKey
    );
    if (duration) {
      const lessonData = {
        course_id: parseInt(params.courseId),
        title: tempLessonDetails.title,
        description: tempLessonDetails.description,
        lesson_url: tempLessonDetails.lesson_url,
        duration: duration,
      };
      updateLesson(params.lessonId, lessonData);
    }
    const assignmentsWithLessonId = tempAssignments.map(
      (assignment, index) => ({
        ...assignment,
        lesson_id: parseInt(params.lessonId),
        answers: assignment.answers.map((answer, answerIndex) => ({
          ...answer,
          answer_id: answerIndex + 1,
          assignment_id: assignment.assignment_id,
        })),
      })
    );
    console.log(assignmentsWithLessonId);

    updateAssignment(params.lessonId, assignmentsWithLessonId);
  };

  if (!lessonDetails || !assignments) {
    return <div>Loading...</div>; // or a loader component
  }

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
              {tempLessonDetails?.title}
            </h2>
          </div>
          <div className="flex justify-center">
            <h2 className="text-lg font-light text-justify mb-4">
              {tempLessonDetails?.description}
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
                <div className="grid gap-4">
                  <Label>Title</Label>
                  <Input
                    value={tempLessonDetails.title}
                    onChange={(e) =>
                      setTempLessonDetails({
                        ...tempLessonDetails,
                        title: e.target.value,
                      })
                    }
                  />
                  <Label>Description</Label>
                  <textarea
                    value={tempLessonDetails.description}
                    onChange={(e) =>
                      setTempLessonDetails({
                        ...tempLessonDetails,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                  ></textarea>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" onClick={handleSaveLessonDetails}>
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold mb-4">Lesson Video</h2>
          </div>
          {renderVideoPreview(
            tempLessonDetails ? tempLessonDetails.lesson_url : "Wrong URLs"
          )}
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
                      defaultValue={tempLessonDetails.lesson_url}
                      onChange={(e) =>
                        setTempLessonDetails({
                          ...tempLessonDetails,
                          lesson_url: e.target.value,
                        })
                      }
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
          </div>
        </section>
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold">Assignments</h2>
          </div>
          <div className="flex justify-center flex-col">
            {tempAssignments.map((assignment, assignmentIndex) => (
              <div
                key={assignmentIndex}
                className="space-y-4 border-b py-4 relative"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-xl font-medium text-gray-700">
                    Question {assignmentIndex + 1}: {assignment.title}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDeleteAssignment(assignmentIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
                {assignment.answers.map((answer, index) => (
                  <div
                    key={index}
                    className="flex  items-center justify-between space-x-3"
                  >
                    {answer.isCorrect ? (
                      <div className="text-primary  hover:bg-gray-50">
                        {answer.text}
                      </div>
                    ) : (
                      <div className=" hover:bg-gray-50">{answer.text}</div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteAnswer(assignmentIndex, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addAnswer(assignmentIndex)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  + Add selection
                </button>
              </div>
            ))}
          </div>
          <div className="my-4 flex justify-center gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                  <DialogDescription>Change assignments</DialogDescription>
                </DialogHeader>
                <div className="flex justify-center flex-col">
                  {tempAssignments.map((assignment, assignmentIndex) => (
                    <div
                      key={assignmentIndex}
                      className="space-y-4 border-b py-4 relative"
                    >
                      <div className="flex gap-6 items-center">
                        <label className="block text-lg font-medium text-gray-700">
                          Q{assignmentIndex + 1}:
                        </label>
                        <Input
                          onChange={(e) =>
                            handleQuestionTitleChange(
                              assignmentIndex,
                              "title",
                              e.target.value
                            )
                          }
                          value={assignment.title}
                        ></Input>
                      </div>
                      {assignment.answers.map((answer, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="flex gap-2 items-center">
                            <input
                              type="checkbox"
                              defaultChecked={answer.isCorrect}
                              onChange={() =>
                                handleCorrectToggle(
                                  assignmentIndex,
                                  index,
                                  "isCorrect",
                                  !answer.isCorrect
                                )
                              }
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <Input
                              onChange={(e) =>
                                handleAnswerChange(
                                  assignmentIndex,
                                  index,
                                  "text",
                                  e.target.value
                                )
                              }
                              value={answer.text}
                            ></Input>
                          </div>
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
            <div>
              <button
                type="button"
                onClick={addQuestion}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md text-sm"
              >
                + Add questions
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-center">
            <Button onClick={handleSubmit}>Done</Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
