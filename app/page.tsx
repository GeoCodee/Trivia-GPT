import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { WelcomeCard } from "@/components/welcome-card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="w-full">
        <div className="p-2 text-right">
          <ModeToggle></ModeToggle>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <WelcomeCard />
      </main>
    </div>
  );
}
