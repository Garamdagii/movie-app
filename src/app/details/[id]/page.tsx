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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

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

type CreditTypes = {
  overview: string;
  cast: cast[];
  crew: crew[];
};

type cast = {
  id: number;
  known_for_department: string;
  name: string;
};

type crew = {
  id: number;
  known_for_department: string;
  name: string;
  department: string;
  job: string;
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
  const [dataCredits, setDataCredits] = useState<CreditTypes>();

  const { id } = useParams();

  useEffect(() => {
    similarMovies();
    specificMovies();
    movieCredits();
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

  const movieCredits = () => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setDataCredits(res.data))
      .catch((err) => console.log(err, "error"));
  };

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="w-full flex flex-col justify-center items-center gap-8 pt-[52px] pb-[113px]">
        <div className="flex justify-between w-[1080px]">
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
      </div>

      <div className="flex gap-3">
        {data?.genres.map((value, index) => {
          return (
            <div
              key={index}
              className="flex py-[2px] px-[10px] items-start rounded-[9999px] border solid botder-[#E4E4E7]"
            >
              <p className="text-xs font-semibold leading-[16px text-[#09090B]">
                {value.name}
              </p>
            </div>
          );
        })}
      </div>

      {dataCredits?.crew.map((value, index) => {
        return (
          value.department === "Directing" &&
          value.job === "Director" && <p key={index}>{value.name}</p>
        );
      })}
      {dataCredits?.crew.map((value, index) => {
        return (
          value.department === "Writing" && <p key={index}>{value.name}</p>
        );
      })}
      {dataCredits?.cast.slice(0, 3).map((value, index) => {
        return (
          value.known_for_department === "Acting" && (
            <p key={index}>{value.name}</p>
          )
        );
      })}

      <Footer />
    </div>
  );
};

export default Details;
