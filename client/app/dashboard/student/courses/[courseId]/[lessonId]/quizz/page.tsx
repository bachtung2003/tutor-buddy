"use client";
import { Button } from "@/components/ui/button";
import { useAssignmentContext } from "@/contexts/assignment-data";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page: React.FC = () => {
  const { assignments } = useAssignmentContext();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number[]>
  >({});
  const [score, setScore] = useState<number | null>(null);

  // Redirect if there are no assignments
  useEffect(() => {
    if (!assignments || assignments.length === 0) {
      router.back();
    }
  }, [assignments, router]);

  // Reset selected answers when moving to the next question
  const handleNext = () => {
    if (currentIndex < assignments.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswers((prev) => ({
        ...prev,
        [assignments[currentIndex].assignment_id]: [], // Clear answers for the current question
      }));
    } else {
      calculateScore();
    }
  };

  const handleAnswerSelection = (assignmentId: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [assignmentId]: prev[assignmentId]?.includes(answerIndex)
        ? prev[assignmentId].filter((index) => index !== answerIndex) // Deselect
        : [...(prev[assignmentId] || []), answerIndex], // Select
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;

    assignments.forEach((assignment) => {
      const selected = selectedAnswers[assignment.assignment_id] || [];
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
                  className={` rounded-md flex justify-center items-center h-12 cursor-pointer hover:bg-primary hover:text-white ${
                    selectedAnswers[
                      assignments[currentIndex].assignment_id
                    ]?.includes(index)
                      ? "bg-yellow-600 text-white"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    handleAnswerSelection(
                      assignments[currentIndex].assignment_id,
                      index
                    )
                  }
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
            <Button onClick={() => router.back()}>Return</Button>
          </section>
        )}
      </main>
    </div>
  );
};

export default Page;
