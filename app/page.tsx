"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center flex-col justify-center">
      <h2 className="font-extrabold tracking-wider lg:text-9xl text-center gradient-animation leading-snug">
        Откройте мир музыки вместе с Melody
      </h2>
      <Link href={"dashboard"}>
        <Button variant={"ghost"}>
          Попробовать MELODY{" "}
          <ArrowRightIcon className="ml-2 h-4 w-4 animate-pulse" />
        </Button>
      </Link>
    </div>
  );
}
