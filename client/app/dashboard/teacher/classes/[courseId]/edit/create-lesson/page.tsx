"use client";
import { Undo2 } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; // Usage: App router
import { Button } from "@/components/ui/button";

interface FormData {
  title: string;
  description: string;
  url: string;
  questions: Question[];
}

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  title: string;
  answers: Answer[];
}

const page = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    url: "",
    questions: [],
  });

  const handleQuestionChange = (id: number, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.map((q) =>
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
      questions: prevForm.questions.map((q) =>
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
      questions: prevForm.questions.map((q) =>
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
      questions: prevForm.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: [...q.answers, { text: "", isCorrect: false }],
            }
          : q
      ),
    }));
  };

  const removeAnswer = (questionId: number, answerIndex: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      questions: prevForm.questions.map((q) =>
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
      questions: [
        ...prevForm.questions,
        {
          id: prevForm.questions.length + 1, // Sequential ID
          title: "",
          answers: [{ text: "", isCorrect: false }],
        },
      ],
    }));
  };

  const removeQuestion = (questionId: number) => {
    setForm((prevForm) => {
      const updatedQuestions = prevForm.questions
        .filter((q) => q.id !== questionId) // Remove the question
        .map((q, index) => ({ ...q, id: index + 1 })); // Reset IDs sequentially

      return { ...prevForm, questions: updatedQuestions };
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Add your submission logic here
  };

  return (
    <div className="my-6 mx-8">
      <div className="flex justify-between items-center mb-5">
        <button>
          <div
            className="flex items-center gap-1"
            onClick={() => router.back()}
          >
            <Undo2 />
            <div className="text-3xl text-primary font-bold">Back</div>
          </div>
        </button>
      </div>

      {/* Form */}
      <h2 className="text-xl font-semibold my-5">Upload Lessons</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Notes"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Enter a description..."
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          ></textarea>
        </div>

        {/* URL */}
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Url
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={form.url}
            onChange={handleInputChange}
            placeholder="https://....."
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {renderVideoPreview(form.url)}
        </div>

        <p className="block text-sm font-medium text-gray-700">Assignments</p>
        {form.questions.map((question) => (
          <div key={question.id} className="space-y-4 border-b pb-4 relative">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Question {question.id}
              </label>
              <button
                type="button"
                onClick={() => removeQuestion(question.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove Question
              </button>
            </div>
            <input
              type="text"
              value={question.title}
              onChange={(e) =>
                handleQuestionChange(question.id, e.target.value)
              }
              placeholder="Enter question text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
            {question.answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={() => handleCorrectToggle(question.id, index)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerChange(question.id, index, e.target.value)
                  }
                  placeholder={`Answer ${index + 1}`}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
                <button
                  type="button"
                  onClick={() => removeAnswer(question.id, index)}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addAnswer(question.id)}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              + Add selection
            </button>
          </div>
        ))}

        <div>
          <button
            type="button"
            onClick={addQuestion}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md"
          >
            + Add questions
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center mt-6 gap-3">
          <Button type="submit" className="bg-primary text-white">
            Save
          </Button>
          <Button
            type="submit"
            className="bg-white border text-black hover:bg-gray-200"
          >
            Save Draft
          </Button>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-gray-500 mt-4">
          By Clicking 'Save Changes', You Agree The Content Moderation From
          TutorBuddy Admin Team
        </p>
      </form>
    </div>
  );
};

export default page;
