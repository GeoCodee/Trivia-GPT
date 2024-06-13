"use client";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

export function DisplayTrivia(props) {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardDescription className=" w-full text-left text-lg">
          Question:{" "}
          <span>
            {activeQuestion + 1}/{questionQuantity}
          </span>
          <br />
          {showResult ? <span> Done!</span> : ""}
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
    </Card>
  );
}
