import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content: `
        You will give me trivia questions in JSON format. Your response should not include anything aside from the JSON format. The interface below is the format of your JSON response.

        Notes:
        -The number of questions will depend on my next prompt.
        -For each question, you will need to give me 4 options
        -No need to add new lines to your responses
        -Make the trivia questions interesting and not too generic
        

        export interface QuestionInterface {
            questions: {
                id: number;
                question: string;
                options: string[];
                correctAnswer: string;
            }[];
        }
        `,
};

export async function GET(req: any) {
  try {
    // const body = await req.json();
    // const { numOfQuestions } = body;

    // let { numOfQuestions } = req.query;
    // If numOfQuestions is not provided or not a valid number, default it to 5
    // const numOfQuestions = 5;
    const numOfQuestions: OpenAI.Chat.ChatCompletionMessageParam = {
      role: "user",
      content: "10",
    };

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-05-13",
      messages: [instructionMessage, numOfQuestions],
    });

    // console.log(response.choices[0].message);
    // const triviaQuestions = response.choices[0].message.content
    //   ? JSON.parse(response.choices[0].message.content)
    //   : "";

    const triviaQuestions = response.choices[0].message.content
      ? JSON.parse(response.choices[0].message.content)
      : "";

    return NextResponse.json(triviaQuestions);
  } catch (error) {
    console.log("[Retrieve Trivia Questions Error]", error);
    return new NextResponse(`Internal Error: ${error}`, { status: 500 });
  }
}
