import React, { useEffect, useState } from "react";
import { Category } from "./category";
import { Movies } from "./labeledMovies";
import axios from "axios";

export const Toprated = ({}) => {
  const [data, setData] = useState<TitleType[]>();

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setData(res.data.results))
      .catch((err) => console.log(`error`, err));
  }, []);
  return (
    <div className="flex flex-col gap-8 px-20 w-full">
      <Category label="Toprated" />
      <div className="flex flex-wrap gap-[32px]">
        {data?.splice(0, 10).map((data, index) => {
          return (
            <Movies
              key={index}
              poster_path={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              title={data.title}
              vote_average={data.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
};
