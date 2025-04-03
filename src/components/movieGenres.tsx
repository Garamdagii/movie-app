"use client";

import { axiosInstance } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type genreTypes = {
  id: string;
  name: string;
};

export const MovieGenres = () => {
  const [dataMovieGenres, setDataMovieGenres] = useState<genreTypes[]>();

  useEffect(() => {
    axiosInstance.get("genre/movie/list?language=en").then((res) => {
      setDataMovieGenres(res.data.genres);
    });
  }, []);

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/searchFilter/${id}`);
  };

  return (
    <div className="flex flex-wrap gap-4 w-[387px]">
      {dataMovieGenres?.map((genre, index) => {
        return (
          <div
            key={index}
            onClick={() => handleOnClick(genre.id)}
            className="flex gap-2 py-[2px] px-[10px] rounded-[999px] border solid border-[#E4E4E7]"
          >
            <Badge className="text-xs font-semibold leading-[16px] text-[#09090B] bg-white">
              {genre.name}
              <ChevronRight className="size-[16px] stroke-[#09090B]" />
            </Badge>
          </div>
        );
      })}
    </div>
  );
};

{
  /* <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/(iV46TJKL8cU)?si=q5xt0VN5KcjuCgG4"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>; */
}
