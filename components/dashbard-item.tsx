"use client";
import { Music } from "@/lib/types";
import React from "react";
import Player from "./player";

type Props = {
  data: Music;
};

const DashboardItem = ({ data }: Props) => {
  return (
    <div className="px-10 w-full flex flex-col">
      <div className="flex grow">
        <div className="w-full">
          <div className="mb-8">
            <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-right">
              {" "}
              {data.title}
            </h2>
            <div className="flex justify-between w-full items-end">
              <h3 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                {data.authors.map(({ label }) => label).join(", ")}{" "}
              </h3>
              <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
                {data.genres.map(({ label }) => label).join(", ")}{" "}
              </h4>
            </div>
          </div>
          <div className="flex justify-between">
            <iframe
              className="w-full h-[450px]"
              src={data.video}
              title={data.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <Player src={data.audio} />
    </div>
  );
};

export default DashboardItem;
