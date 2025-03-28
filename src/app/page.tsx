"use client";

import axios from "axios";
import { SortedMovies } from "@/components/sortedMovies";
import { NowPlaying } from "@/components/nowPlaying";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-fit gap-[24px]">
      <NowPlaying />
      <SortedMovies />
    </div>
  );
}
