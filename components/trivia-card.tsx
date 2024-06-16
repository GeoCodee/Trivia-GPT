"use client";

import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  QuestionInterface,
  ResultInterface,
  SaveResultInterface,
} from "@/app/trivia/action";
import { Dialog } from "./ui/dialog";
import { HistoryDialog } from "./triviaHistory-dialog";

export function TriviaCard(props: { values: QuestionInterface | null }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  // const [checked, setChecked] = useState(false);
  const [questionQuantity, setQuestionQuantity] = useState(1);
  const [questionDetails, setQuestionDetails] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<ResultInterface>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [questionHistory, setQuestionHistory] = useState<SaveResultInterface>({
    questionsHistoryArray: [],
  });

  const triviaQuestions = props.values?.questions;
  const triviaQuestionsQuantity = triviaQuestions ? triviaQuestions.length : 0;
  const { question, options, correctAnswer } = triviaQuestions
    ? triviaQuestions[activeQuestion]
    : { question: "", options: [], correctAnswer: "" };

  useEffect(() => {
    setQuestionQuantity(triviaQuestionsQuantity);
    setQuestionDetails(question);
  }, [question, triviaQuestionsQuantity]);
  //[question, triviaQuestions]
  const selectAnswer = (answer: string, id: number) => {
    if (answer === correctAnswer) {
      console.log("You have selected the right answer");
      setSelectedAnswer(true);

      saveResults({
        selectedAnswer: answer,
        correctAnswer: correctAnswer,
        questionIndex: activeQuestion,
        question: question,
        isRight: true,
      });
    } else {
      console.log("false");
      setSelectedAnswer(false);

      saveResults({
        selectedAnswer: answer,
        correctAnswer: correctAnswer,
        questionIndex: activeQuestion,
        question: question,
        isRight: false,
      });
    }

    incrementResults();

    if (activeQuestion != triviaQuestionsQuantity) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const incrementResults = () => {
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
  };

  const saveResults = (newResults: {
    selectedAnswer: string;
    correctAnswer: string;
    questionIndex: number;
    question: string;
    isRight: boolean;
  }) => {
    setQuestionHistory((prevState) => ({
      questionsHistoryArray: [
        ...prevState.questionsHistoryArray,
        {
          questionIndex: newResults.questionIndex,
          question: newResults.question,
          selectedAnswer: newResults.selectedAnswer,
          correctAnswer: newResults.correctAnswer,
          isRight: newResults.isRight,
        },
      ],
    }));

    console.log(questionHistory);
  };

  return (
    <Card className="w-1/2">
      {showResult ? (
        <>
          <CardHeader>
            <CardDescription className="w-full text-left text-lg">
              Trivia Complete
            </CardDescription>
            <div className="border-b-4 border-indigo-500 border-solid"></div>
          </CardHeader>
          <CardContent>
            <div className="font-mono font-bold py-2">Results:</div>
            <div className="font-mono font-medium py-4">
              <h3>Overall: {(result.score / 25) * 100}</h3>
              <p>
                Total Questions: <span>{questionQuantity}</span>
              </p>
              <p>
                Total Score: <span>{result.score}</span>
              </p>
              <p>
                Correct Answers: <span>{result.correctAnswers}</span>
              </p>
              <p>
                Wrong Answers: <span>{result.wrongAnswers}</span>
              </p>
            </div>

            <div>
              <HistoryDialog triviaHistory={questionHistory}></HistoryDialog>
            </div>
            <div className="py-1"></div>
            <Button
              className="py-4 w-full hover:bg-indigo-500"
              onClick={() => window.location.reload()}
            >
              Restart
            </Button>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardDescription className=" w-full text-left text-lg">
              Question:{" "}
              <span>
                {activeQuestion + 1}/{questionQuantity}
              </span>
            </CardDescription>
            <div className="border-b-4 border-indigo-500 border-solid"></div>
          </CardHeader>
          <CardContent>
            <div className="font-mono font-medium py-4">{questionDetails}</div>
            <div className="grid grid-rows-4 gap-2 text-left">
              {options.map((option, idx) => (
                <Button
                  className="bg-slate-500 hover:bg-indigo-500"
                  key={idx}
                  onClick={() => selectAnswer(option, idx)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
