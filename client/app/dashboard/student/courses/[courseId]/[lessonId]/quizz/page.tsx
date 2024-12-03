"use client";
import { Button } from "@/components/ui/button";
import { useAssignmentContext } from "@/contexts/assignment-data";
import globalApi from "@/services/globalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) => {
  const { assignments } = useAssignmentContext();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number[]>
  >({});
  const [currentAnswers, setCurrentAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);

  // Redirect if there are no assignments
  useEffect(() => {
    if (!assignments || assignments.length === 0) {
      router.back();
    }
  }, [assignments, router]);

  const handleNext = () => {
    const assignmentId = assignments[currentIndex].assignment_id;

    // Merge currentAnswers into selectedAnswers
    setSelectedAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [assignmentId]: [...currentAnswers], // Preserve answers for the current question
      };

      // If it's the last assignment, calculate the score after merging
      if (currentIndex === assignments.length - 1) {
        calculateScore(updatedAnswers); // Pass the updated answers
      }

      return updatedAnswers;
    });

    if (currentIndex < assignments.length - 1) {
      // Move to the next question and reset currentAnswers
      setCurrentIndex((prev) => prev + 1);
      setCurrentAnswers([]); // Clear answers for the next question
    }
  };

  const handleAnswerSelection = (answerIndex: number) => {
    setCurrentAnswers(
      (prev) =>
        prev.includes(answerIndex)
          ? prev.filter((index) => index !== answerIndex) // Deselect
          : [...prev, answerIndex] // Select
    );
    console.log(currentAnswers);
  };

  const calculateScore = (updatedAnswers: Record<number, number[]>) => {
    let totalScore = 0;

    assignments.forEach((assignment) => {
      const selected = updatedAnswers[assignment.assignment_id] || [];
      const correctAnswers = assignment.answers
        .map((answer, index) => (answer.isCorrect ? index : null))
        .filter((index): index is number => index !== null);

      if (
        selected.length === correctAnswers.length &&
        selected.every((answerIndex) => correctAnswers.includes(answerIndex))
      ) {
        totalScore += 100 / assignments.length; // Each assignment contributes equally to the score
      }
    });

    setScore(totalScore);
  };

  const setReturn = (score: number) => {
    if (score) {
      const data = {
        course_id: parseInt(params.courseId),
        lesson_id: parseInt(params.lessonId),
        score: score,
      };
      globalApi.addLessonScore(data);
      router.back();
    } else {
      router.back();
    }
  };

  if (!assignments || assignments.length === 0) return null;

  return (
    <div>
      <header className="bg-primary text-white p-8 text-left">
        <div
          className="capitalize cursor-pointer text-white hover:underline"
          onClick={() => router.back()}
        >
          Go Back
        </div>
        <h1 className="text-3xl font-bold">Assignments</h1>
      </header>

      <main className="p-6 space-y-6 max-w-5xl mx-auto">
        {score === null ? (
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-center">
              {assignments[currentIndex]?.title}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {assignments[currentIndex]?.answers.map((answer, index) => (
                <div
                  key={index}
                  className={`rounded-md flex justify-center items-center h-12 cursor-pointer hover:bg-primary hover:text-white ${
                    currentAnswers.includes(index)
                      ? "bg-yellow-600 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleAnswerSelection(index)}
                >
                  {answer.text}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button onClick={handleNext}>
                {currentIndex < assignments.length - 1 ? "Next" : "Submit"}
              </Button>
            </div>
          </section>
        ) : (
          <section className="bg-gray-50 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-semibold">Your Score: {score}</h2>
            <p className="text-lg">Thank you for completing the assignments!</p>
            <Button onClick={() => setReturn(score)}>Return</Button>
          </section>
        )}
      </main>
    </div>
  );
};

export default Page;
