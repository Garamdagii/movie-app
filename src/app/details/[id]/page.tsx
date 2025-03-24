"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Movies } from "@/components/movies";
import { CardDescription, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Label } from "@/components/label";

type TitleTypes = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
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
// { params: {id : string }
// { params }: { params: Promise<{ id: string }> }

const Details = () => {
  const [dataSimilar, setDataSimilar] = useState<TitleTypes[]>();
  const [data, setData] = useState<TitleTypes>();

  const { id } = useParams();

  useEffect(() => {
    similarMovies();
    specificMovies();
  }, []);

  const similarMovies = () => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setDataSimilar(res.data.results))
      .catch((err) => console.log(err, "error"));
  };

  const specificMovies = () => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "error"));
  };

  return (
    <div className="w-screen h-screen">
      <Header />
      <div>
        <div className="flex flex-col">
          <CardTitle className={"text-[#09090B]"}>{data?.title}</CardTitle>
          <p className="text-lg leading-[28px] text-[#09090B]">
            {data?.release_date}· PG · 2h 40m
          </p>
        </div>
        <div>
          <p className="text-sm font-medium leading-[16px] text-[#09090B]">
            Rating
          </p>
          <Star className="size-[28px] fill-[#FDE047] stroke-[#FDE047]" />
          <div className="flex">
            <CardDescription className="text-[#09090B] text-lg font-semibold leading-[28px]">
              {data?.vote_average}{" "}
            </CardDescription>
            <p className=" flex items-center text-xs leading-[16px] text-[#71717A]">
              /10
            </p>
          </div>

          <p className="text-sm leading-[16px] text-[#71717A]">
            {data?.vote_count}
          </p>
        </div>
        <div>
          <img className="w-[290px] h-[428px] src={`https://image.tmdb.org/t/p/original${data.poster_path}`}"></img>
          <div className="w-[760px] h-[428px] pl-[24px] pb-[24px]"></div>
        </div>
      </div>

      <div className="flex flex-col gap-8 px-20 w-full">
        <Label text="More like this" />
        <div className="flex flex-wrap gap-[32px]">
          {dataSimilar?.splice(0, 5).map((data, index) => {
            return (
              <Movies
                onClick={() => {
                  return;
                }}
                key={index}
                poster_path={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                title={data.title}
                vote_average={data.vote_average}
              />
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Details;
