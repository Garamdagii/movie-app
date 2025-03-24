"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SortedMovies } from "@/components/sortedMovies";
import { NowPlaying } from "@/components/nowPlaying";

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

// interface propsType {}
// type propsType {}

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen gap-[24px]">
      <Header />
      <NowPlaying />

      {/* <Carousel>
        <CarouselContent>
          {dataNow?.splice(0, 3).map((data, index) => {
            return (
              <CarouselItem className="relative w-full h-full" key={index}>
                <img
                  className="w-full h-[600px]"
                  src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                ></img>
                <Card
                  className={
                    "w-[404px] h-fit gap-4 absolute top-[178px] left-[140px] z-50 bg-transparent border-none"
                  }
                >
                  <CardHeader>
                    <CardDescription>Now Playing:</CardDescription>
                    <CardTitle>{data.title}</CardTitle>

                    <CardDescription>{data.vote_average}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="w-[302px]">{data.overview}</p>
                  </CardContent>
                  <CardFooter>
                    <Button>Watch Trailer</Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-[44px]" />
        <CarouselNext className="right-[44px]" />
      </Carousel> */}
      <SortedMovies />

      <Footer />
    </div>
  );
}
