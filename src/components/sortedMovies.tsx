"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { Label } from "./label";
import { Movies } from "./movies";

type TitleTypes = {
  id: string;
  title: string;
  poster_path: string;
  vote_average: string;
};

const titleName = [
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

export const SortedMovies = ({
  movieData,
  titleName,
}: {
  movieData: string;
  titleName: string;
}) => {
  const [data, setData] = useState<TitleTypes[]>();

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  const handleSeeMore = (movieData: string) => {
    router.push(`/seeMoreMovies/${movieData}`);
  };

  useEffect(() => {
    sortedMovies();
  }, []);

  const sortedMovies = async () => {
    await axiosInstance
      .get(`movie/${movieData}?language=en-US&page=1`)
      .then((res) => {
        setData(res.data.results);
      });
  };

  return (
    <div className="flex flex-col gap-8">
      <Label
        text={titleName}
        seeMore={true}
        onClick={() => handleSeeMore(movieData)}
      />
      <div className="flex flex-wrap gap-[32px]">
        {data?.slice(0, 10).map((el, index) => {
          return (
            <Movies
              key={index}
              onClick={() => handleOnClick(el.id)}
              title={el.title}
              vote_average={el.vote_average}
              poster_path={el.poster_path}
            />
          );
        })}
      </div>
    </div>
  );
};
