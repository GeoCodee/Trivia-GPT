"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadState() {
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader>
        <CardDescription className="w-full font-mono text-center text-lg">
          Loading Trivia Questions...
        </CardDescription>
        <div className="border-b-4 border-indigo-500 border-solid"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="w-full h-20 rounded-lg" />

          <Skeleton className="h-8 w-full rounded-sm" />
          <Skeleton className=" h-8 w-full rounded-sm" />
          <Skeleton className=" h-8 w-full rounded-sm" />
          <Skeleton className=" h-8 w-full rounded-sm" />
        </div>
      </CardContent>
    </Card>
  );
}
