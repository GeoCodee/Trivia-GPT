import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function WelcomeCard() {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardDescription className="p-2 font-mono text-white font-medium w-full text-center text-2xl">
          Trivia App, made with NEXT JS. Powered by ChatGPT API
        </CardDescription>
        <div className="text-center ">
          <Link href={"https://github.com/GeoCodee"}>
            <Button className="bg-slate-500">
              <Github></Github>
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {/* <div className="p-2 w-full text-center">
          How many questions do you want?
        </div> */}
        <div className="p-2 w-full">
          <Link href="/trivia">
            <Button className="w-full hover:bg-green-700">Start Trivia</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
