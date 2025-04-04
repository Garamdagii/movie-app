"use client";

import Image from "next/image";
import { Star } from "lucide-react";
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
import { axiosInstance } from "@/lib/utils";
import { PlayButton } from "./playButton";

type TitleTypes = {
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  overview: string;
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
    axiosInstance.get("movie/now_playing?language=en-US&page=1").then((res) => {
      setData(res.data.results);
    });
    // .catch((err) => console.log(err, "error"));
  }, []);

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {data?.splice(0, 3).map((data, index) => {
            return (
              <CarouselItem className="relative w-full h-full" key={index}>
                <div className="flex w-full h-[600px] relative">
                  <Image
                    // style={{ width: "100vw", height: "600px" }}
                    priority
                    fill={true}
                    // width={0}
                    // height={0}
                    src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                    alt="image"
                  />
                </div>

                <Card className="w-[404px] h-fit absolute top-[178px] left-[140px] z-50 bg-transparent border-none shadow-none gap-4">
                  <CardHeader className="p-0">
                    <p className="text-base leading-[24px] text-[#FFF]">
                      Now Playing:
                    </p>
                    <CardTitle className="w-full text-[36px] leading-[40px] font-bold text-[#FFF] p-0">
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
                  <CardContent className="w-[302px] p-0">
                    <p className="text-xs leading-[16px] text-[#FAFAFA]">
                      {data.overview}
                    </p>
                  </CardContent>
                  <PlayButton isDetail={false} id={data.id} />
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
