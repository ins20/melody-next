"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Menu, Music } from "@/lib/types";
import Link from "next/link";
import { getAllGenres } from "@/lib/api";
import { MenuSelect } from "./menu-select";
import { useEffect, useRef, useState } from "react";

type Props = {
  menu: Menu[];
  data: Music[];
};

const Dashboard = ({ menu, data }: Props) => {
  const [filteredData, setFilteredData] = useState<Music[]>(data);
  const [currentAudio, setCurrentAudio] = useState<string>("");
  const ref = useRef<HTMLAudioElement>(null);
  const handlePlay = (audio: string) => {
    if (ref.current) {
      if (!currentAudio || audio) {
        ref.current.volume = 0.1;
        ref.current.src = audio;
        ref.current.currentTime = 40;
        setCurrentAudio(audio);
        ref.current.play();
      }

      if (currentAudio === audio) {
        ref.current.volume = 0;
        ref.current.src = "";
        setCurrentAudio("");
        ref.current.play();
      }
    }
  };
  return (
    <div className="flex sm:flex-row flex-col gap-5 p-10">
      <MenuSelect items={menu} setData={setFilteredData} data={filteredData} />
      <audio ref={ref} />

      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {filteredData.length ? (
          filteredData.map(({ id, title, image, authors, audio }) => (
            <Card
              className="h-fit rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 "
              key={String(id)}
            >
              <CardHeader className="relative">
                <img
                  src={image}
                  alt="Product Image"
                  className={`w-full h-48 bg-conta in bg-center cursor-pointer ${
                    currentAudio === audio && "animate-ping"
                  }`}
                  onClick={() => handlePlay(audio)}
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-2 h-20">
                  {title}
                </CardTitle>
                <CardDescription className="mb-4 h-10">
                  {authors.map(({ label }) => label).join(", ")}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Link href={String(id)}>
                  <Button className="py-2 px-4 rounded-full">Подробнее</Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <>Ничего не найдено</>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
