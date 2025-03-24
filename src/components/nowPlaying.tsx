"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

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

export const NowPlaying = () => {
  const [data, setData] = useState<TitleTypes[]>();

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setData(res.data.results))
      .catch((err) => console.log(err, "error"));
  }, []);

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {data?.splice(0, 3).map((data, index) => {
            return (
              <CarouselItem className="relative w-full h-full" key={index}>
                <div className="w-full h-[600px]">
                  <Image
                    // width={1440}
                    // height={600}
                    fill={true}
                    src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                    alt="image"
                  />
                </div>
                <Card className="w-fit h-fit absolute top-[178px] left-[140px] z-50 bg-transparent border-none shadow-none gap-4 p-0">
                  <CardHeader>
                    <p className="text-base leading-[24px] text-[#FFF]">
                      Now Playing:
                    </p>
                    <CardTitle className="w-full text-[36px] leading-[40px] font-bold text-[#FFF] ">
                      {data.title}
                    </CardTitle>
                    <div className="flex gap-1">
                      <Star className="size-[28px] fill-[#FDE047] stroke-[#FDE047]" />
                      <div className="flex justify-center items-center">
                        <p className="text-lg font-semibold leading-[28px] text-[#FAFAFA]">
                          {data.vote_average}{" "}
                        </p>
                        <p className="text-base leading-[24px] text-[#71717A]">
                          /10
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="w-[302px]">
                    <p className="text-xs leading-[16px] text-[#FAFAFA]">
                      {data.overview}
                    </p>
                  </CardContent>
                  <Button className="w-fit flex h-[40px] py-2 px-4 justify-center items-center gap-2 rounded-[6px] bg-[#F4F4F5] text-sm font-medium leading-[20px] text-[#18181B]">
                    <Play className="size-[16px] stroke-[#18181B]" />
                    Watch Trailer
                  </Button>
                  {/* <CardFooter>
                    <p>Card Footer</p>
                  </CardFooter> */}
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-[44px]" />
        <CarouselNext className="right-[44px]" />
      </Carousel>
    </div>
  );
};
