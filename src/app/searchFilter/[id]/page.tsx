"use client";

import { MovieGenres, Movies, Separator } from "@/components";
import { axiosInstance } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Types = {
  poster_path: string;
  vote_average: string;
  title: string;
  id: string;
};

const SearchFilter = () => {
  const { id } = useParams();

  const [dataFiltered, setDataFiltered] = useState<Types[]>();

  useEffect(() => {
    fetchDataFiltered();
  }, []);

  const fetchDataFiltered = async () => {
    await axiosInstance
      .get(`discover/movie?language=en&with_genres=${id}&page=1`)
      .then((res) => {
        setDataFiltered(res.data.results);
      });
  };

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  return (
    <div className="flex flex-col gap-8 px-[80px]">
      <h2 className="text-[30px] font-semibold leading-[36px] text-[#09090B]">
        Search Filter
      </h2>
      <div className="flex gap-[1px]">
        <div className="flex flex-col gap-5 w-[387px]">
          <h3>Genres</h3>
          <p>See lists of movies by genre</p>
          <MovieGenres />
        </div>
        <Separator orientation={"vertical"} />

        <div className="flex flex-col gap-8">
          <h3>titles in </h3>
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            {dataFiltered?.map((el, index) => {
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
      </div>
    </div>
  );
};

export default SearchFilter;
