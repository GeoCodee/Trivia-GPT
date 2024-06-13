"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { TriviaCard } from "@/components/trivia-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { questions, generateQuestions, QuestionInterface } from "./action";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadState } from "@/components/load-state";
import { HistoryDialog } from "@/components/triviaHistory-dialog";

export default function TriviaPage() {
  const [triviaQuestions, setTriviaQuestions] =
    useState<QuestionInterface | null>({
      totalQuestions: 0,
      questions: [
        {
          id: 0,
          question: "error",
          options: [],
          correctAnswer: "",
        },
      ],
    });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const response = await fetch("/api/createTrivia?numOfQuestions=5");
      if (!response.ok) {
        throw new Error("Failed to fetch trivia questions");
      }
      const data: QuestionInterface = await response.json();
      // setTimeout((res) => 1000);
      await setTriviaQuestions(data);
      console.log(data);
      // setTriviaQuestions(data);
    } catch (err) {
      throw new Error("Failed to load trivia questions");
    } finally {
      // setTimeout((res) => 1000);

      setIsLoading(false);
    }
  }
  // console.log(`Trivia Questions: ${triviaQuestions}`);

  return (
    <div>
      <header className="w-full">
        <div className="p-2 text-right">
          <ModeToggle></ModeToggle>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {isLoading ? (
          <LoadState></LoadState>
        ) : (
          <TriviaCard values={triviaQuestions}></TriviaCard>
        )}
      </main>
    </div>
  );
}
