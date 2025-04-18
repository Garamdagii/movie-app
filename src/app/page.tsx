"use client";

import { NowPlaying, SortedMovies } from "@/components";

const data = [
  {
    titleName: "Upcoming",
    movieData: "upcoming",
  },
  {
    titleName: "Top Rated",
    movieData: "top_rated",
  },
  {
    titleName: "Popular",
    movieData: "popular",
  },
];

export default function Home() {
  return (

    <div className="flex flex-col w-screen h-fit gap-[24px] ">
      <NowPlaying />
      <div className="flex flex-col gap-8 px-20 py-[52px] w-full">
        {data.map((el, index) => {
          return (
            <div key={index}>
              <SortedMovies titleName={el.titleName} movieData={el.movieData} />
            </div>
          );
        })}
      </div>
    </div>


  );
}
