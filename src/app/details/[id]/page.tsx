"use client";

import { Movies } from "@/components/movies";
import { CardDescription, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Label } from "@/components/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { MovieDetails } from "@/components/movieDetails";

type TitleTypes = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: { id: number; name: string };
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

// getfetchdata
// async
// await

// suspense
// fallback - skeleteon bichih

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

  const similarMovies = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => {
        setDataSimilar(res.data.results);
      });
  };

  const specificMovies = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => {
        setData(res.data);
      });
  };

  return (
    <div className="w-screen h-fit">
      <div className="flex flex-col gap-8 pt-[52px] pb-[113px] px-[180px] w-full">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-[#09090B] text-4xl font-bold leading-[40px] ">
              {data?.title}
            </CardTitle>
            <p className="text-lg leading-[28px] text-[#09090B]">
              {data?.release_date}· PG · 2h 40m
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-[16px] text-[#09090B]">
              Rating
            </p>
            <div className="flex gap-1">
              <Star className="size-[28px] fill-[#FDE047] stroke-[#FDE047] self-center" />
              <div>
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
            </div>
          </div>
        </div>

        <div className="flex gap-8 pt-6">
          <Image
            width={290}
            height={428}
            src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
            alt="detail"
          />
          <div className="flex relative w-full h-full">
            <Image
              width={760}
              height={428}
              src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
              alt="detail"
            />
            <div className="flex gap-3 items-center absolute left-[24px] bottom-[24px] z-50">
              <Button className="flex size-[40px] py-2 px-4 justify-center items-center rounded-[999px] bg-[#FFF]">
                <Play className="size-[16px] stroke-[#18181B]" />
              </Button>
              <p className="text-base leading-[24px] text-[#FFF]">
                Play Trailer
              </p>
              <p className="text-sm leading-[20px] text-[#FFF]">2:35</p>
            </div>
          </div>
        </div>
        <MovieDetails />

        <div className="flex flex-col gap-8">
          <Label text="More like this" />
          <Movies movieData="similar" />
          {/* <div className="flex flex-wrap gap-[32px]">
            {dataSimilar?.splice(0, 5).map((data, index) => {
              return (
                <Movies
                  key={index}
                  poster_path={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                  title={data.title}
                  vote_average={data.vote_average}
                />
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Details;
