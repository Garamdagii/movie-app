"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Label, Movies } from "@/components";

type TitleTypes = {
  id: string;
  title: string;
  poster_path: string;
  vote_average: string;
};

const SeeMoreMovies = () => {
  const [data, setData] = useState<TitleTypes[]>();

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
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

  const { movieData } = useParams();

  return (
    <div className="flex flex-col gap-8 px-[80px] py-[52px]">
      <Label text={`${movieData}`} />
      <div className="flex flex-wrap gap-8">
        {data?.map((el, index) => {
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

export default SeeMoreMovies;
