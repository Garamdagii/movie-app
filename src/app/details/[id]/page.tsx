"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star, Play } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  CardDescription,
  Label,
  MovieDetails,
  Movies,
} from "@/components";
import { axiosInstance } from "@/lib/utils";

type TitleTypes = {
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
};

const Details = () => {
  const [dataSimilar, setDataSimilar] = useState<TitleTypes[]>();
  const [data, setData] = useState<TitleTypes>();

  const { id } = useParams();

  useEffect(() => {
    similarMovies();
    specificMovies();
  }, []);

  const similarMovies = async () => {
    await axiosInstance
      .get(`movie/${id}/similar?language=en-US&page=1`)
      .then((res) => {
        setDataSimilar(res.data.results);
      });
  };

  const specificMovies = async () => {
    await axiosInstance.get(`movie/${id}?language=en-US`).then((res) => {
      setData(res.data);
    });
  };

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  return (
    <div className="w-screen h-fit">
      <div className="flex flex-col gap-8 pt-[52px] pb-[113px] px-[180px] w-full">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-[#09090B] text-4xl font-bold leading-[40px] ">
              {data?.title}
            </h3>
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
                  <p className="text-[#09090B] text-lg font-semibold leading-[28px]">
                    {data?.vote_average}{" "}
                  </p>
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
          <div className="flex flex-wrap gap-[32px]">
            {dataSimilar?.slice(0, 5).map((el, index) => {
              return (
                <Movies
                  key={index}
                  onClick={() => handleOnClick(el.id)}
                  poster_path={`https://image.tmdb.org/t/p/original${el.poster_path}`}
                  title={el.title}
                  vote_average={el.vote_average}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

// getfetchdata
// async
// await

// suspense
// fallback - skeleteon bichih

// { params: {id : string }
// { params }: { params: Promise<{ id: string }> }
