import { SaveResultInterface } from "@/app/trivia/action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CircleCheck, CircleX } from "lucide-react";

export function HistoryDialog(props: { triviaHistory: SaveResultInterface }) {
  console.log(props.triviaHistory);
  return (
    <Dialog>
      <DialogTrigger asChild className="py-4">
        <Button className="w-full hover:bg-indigo-500">See History</Button>
      </DialogTrigger>
      <DialogContent
        className={
          "w-10/12 h-4/6 overflow-y-scroll lg:max-w-screen-lg lg:max-h-screen"
        }
      >
        <DialogHeader>
          <DialogTitle className="font-mono">Trivia History</DialogTitle>
          {props.triviaHistory.questionsHistoryArray.map((item, idx) => (
            <div
              className={
                item.isRight
                  ? "py-2 bg-green-500 rounded-sm"
                  : "py-2 bg-red-500 rounded-sm"
              }
              key={idx}
            >
              <div className="font-mono p-2 text-left">
                <div className="flex items-center font-bold">
                  <span className="mr-2">
                    Question {item.questionIndex + 1}:{" "}
                  </span>{" "}
                  {item.isRight ? (
                    <CircleCheck></CircleCheck>
                  ) : (
                    <CircleX></CircleX>
                  )}
                </div>
                <br></br>
                <div className="font-mono lg:text-2xl">{item.question}</div>
                <br></br>
                <div className="px-4 py-3 bg-gray-200 rounded-lg dark:bg-gray-800">
                  Selected Answer: {item.selectedAnswer}
                </div>
                <br></br>
                <div className="px-4 py-3 bg-gray-200 rounded-lg dark:bg-gray-800">
                  Correct Answer: {item.correctAnswer}
                </div>
              </div>
            </div>
          ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
