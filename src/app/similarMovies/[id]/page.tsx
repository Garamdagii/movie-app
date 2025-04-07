"use client";

import { Label, Movies } from "@/components";
import { axiosInstance } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DataTypes = {
  backdrop_path: string;
  genre_ids: number[];
  genres: { id: number; name: string };
  id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: string;
  vote_count: number;
  key: string;
};

const SimilarMovies = () => {
  const [dataSimilarMovies, setDataSimilarMovies] = useState<DataTypes[]>();

  const { id } = useParams();

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  useEffect(() => {
    fetchDataSimilarMovies();
  }, []);

  const fetchDataSimilarMovies = async () => {
    await axiosInstance
      .get(`movie/${id}/similar?language=en-US&page=1`)
      .then((res) => {
        setDataSimilarMovies(res.data.results);
      });
  };

  return (
    <div className="flex flex-col gap-8">
      <Label text="More like this" onClick={() => {}} />
      <div className="flex flex-wrap gap-[32px]">
        {dataSimilarMovies?.map((el, index) => {
          return (
            <Movies
              key={index}
              onClick={() => handleOnClick(el.id)}
              poster_path={el.poster_path}
              title={el.title}
              vote_average={el.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SimilarMovies;
