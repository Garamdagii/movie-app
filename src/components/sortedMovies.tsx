import React, { useEffect, useState } from "react";
import axios from "axios";
import { Movies } from "./movies";
import { useRouter } from "next/navigation";
import { Label } from "./label";

type TitleTypes = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: string;
  vote_count: number;
};

export const SortedMovies = ({}) => {
  const [dataUpcoming, setDataUpcoming] = useState<TitleTypes[]>();
  const [dataToprated, setDataToprated] = useState<TitleTypes[]>();
  const [dataPopular, setDataPopular] = useState<TitleTypes[]>();

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  useEffect(() => {
    upcoming();
    toprated();
    popular();
  }, []);

  const upcoming = () => {
    return axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setDataUpcoming(res.data.results))
      .catch((err) => console.log(err, "error"));
  };

  const toprated = () => {
    return axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setDataToprated(res.data.results))
      .catch((err) => console.log(err, "error"));
  };

  const popular = () => {
    return axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setDataPopular(res.data.results))
      .catch((err) => console.log(err, "error"));
  };

  return (
    <div>
      <div className="flex flex-col gap-8 px-20 w-full">
        <Label text="Upcoming" />
        <div className="flex flex-wrap gap-[32px]">
          {dataUpcoming?.splice(0, 10).map((data, index) => {
            return (
              <Movies
                key={index}
                onClick={() => handleOnClick(data.id)}
                poster_path={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                title={data.title}
                vote_average={data.vote_average}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-8 px-20 w-full">
        <Label text="Toprated" />
        <div className="flex flex-wrap gap-[32px]">
          {dataToprated?.splice(0, 10).map((data, index) => {
            return (
              <Movies
                onClick={() => handleOnClick(data.id)}
                key={index}
                poster_path={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                title={data.title}
                vote_average={data.vote_average}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-8 px-20 w-full">
        <Label text="Popular" />
        <div className="flex flex-wrap gap-[32px]">
          {dataPopular?.splice(0, 10).map((data, index) => {
            return (
              <Movies
                onClick={() => handleOnClick(data.id)}
                key={index}
                poster_path={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                title={data.title}
                vote_average={data.vote_average}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
