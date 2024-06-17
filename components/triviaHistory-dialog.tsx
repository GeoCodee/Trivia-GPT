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
                <div className="flex items-center">
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
                Question: {item.question}
                <br></br>
                Selected Answer: {item.selectedAnswer}
                <br></br>
                Correct Answer: {item.correctAnswer}
              </div>
            </div>
          ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
