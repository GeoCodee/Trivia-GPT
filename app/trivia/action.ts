import axios from "axios";
import OpenAI from "openai";

interface AxiosResponseData {
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export interface QuestionInterface {
  totalQuestions: number;
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export interface SaveResultInterface {
  questionsHistoryArray: {
    questionIndex: number;
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isRight: boolean;
  }[];
}

export interface ResultInterface {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export const questions: QuestionInterface = {
  totalQuestions: 5,
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Madrid", "Paris", "Rome", "Berlin"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: "Jupiter",
    },
    {
      id: 3,
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Maldives", "Vatican City", "San Marino"],
      correctAnswer: "Vatican City",
    },
    {
      id: 4,
      question: "What is the most widely spoken language in the world?",
      options: ["English", "Mandarin", "Spanish", "Hindi"],
      correctAnswer: "Mandarin",
    },
    {
      id: 5,
      question: "Who is the founder of Microsoft?",
      options: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
      correctAnswer: "Bill Gates",
    },
  ],
};

// Define a default value for QuestionInterface
const defaultQuestions: QuestionInterface = {
  totalQuestions: 0,
  questions: [],
};

// export const generateQuestions = async (
//   numOfQuestions: number
// ): Promise<QuestionInterface> => {
//   try {
//     const response = await axios.post<AxiosResponseData>("/api/createTrivia", {
//       numOfQuestions: numOfQuestions,
//     });

//     const questions: QuestionInterface = {
//       totalQuestions: response.data.questions.length,
//       questions: response.data.questions.map((item) => ({
//         id: item.id,
//         question: item.question,
//         options: item.options,
//         correctAnswer: item.correctAnswer,
//       })),
//     };

//     return questions;
//   } catch (error) {
//     console.log(error);
//     return defaultQuestions;
//   }
// };

export const generateQuestions = (
  numOfQuestions: number
): QuestionInterface => {
  let questions: QuestionInterface = defaultQuestions;
  try {
    axios
      .get<AxiosResponseData>("/api/createTrivia")
      .then((response) => {
        questions = {
          totalQuestions: response.data.questions.length,
          questions: response.data.questions.map((item) => ({
            id: item.id,
            question: item.question,
            options: item.options,
            correctAnswer: item.correctAnswer,
          })),
        };
      })
      .catch((error) => {
        console.error(error);
      });
    return questions;
  } catch (error) {
    console.error("Failed to fetch questions");
    return defaultQuestions;
  }
};
