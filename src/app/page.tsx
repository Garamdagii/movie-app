"use client";

import { SortedMovies } from "@/components/sortedMovies";
import { NowPlaying } from "@/components/nowPlaying";
import { Label } from "@/components/label";

const titleData = [
  {
    text: "Upcoming",
    movieData: "upcoming",
  },
  {
    text: "Top Rated",
    movieData: "top_rated",
  },
  {
    text: "Popular",
    movieData: "popular",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-fit gap-[24px] ">
      <NowPlaying />
      {titleData.map((el, index) => {
        return (
          <div key={index} className="flex flex-col gap-8 px-20 w-full">
            <Label text={el.text} />
            <SortedMovies movieData={el.movieData} />
          </div>
        );
      })}
    </div>
  );
}
