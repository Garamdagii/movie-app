"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Label, MovieDetails, Movies, PlayButton } from "@/components";
import { axiosInstance } from "@/lib/utils";

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

const Details = () => {
  const [dataSimilarMovies, setDataSimilarMovies] = useState<DataTypes[]>();
  const [dataSpecificMovies, setDataSpecificMovies] = useState<DataTypes>();

  const { id }: { id: string } = useParams();

  useEffect(() => {
    fetchDataSimilarMovies();
    fetchDataSpecificMovies();
  }, []);

  const fetchDataSimilarMovies = async () => {
    await axiosInstance
      .get(`movie/${id}/similar?language=en-US&page=1`)
      .then((res) => {
        setDataSimilarMovies(res.data.results);
      });
  };

  const fetchDataSpecificMovies = async () => {
    await axiosInstance.get(`movie/${id}?language=en-US`).then((res) => {
      setDataSpecificMovies(res.data);
    });
  };

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  const handleMore = (id: string) => {
    router.push(`/similarMovies/${id}`);
  };

  return (
    <div className="w-screen h-fit">
      <div className="flex flex-col gap-8 pt-[52px] pb-[113px] px-[180px] w-full">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-[#09090B] text-4xl font-bold leading-[40px] ">
              {dataSpecificMovies?.title}
            </h3>
            <p className="text-lg leading-[28px] text-[#09090B]">
              {dataSpecificMovies?.release_date}· PG · 2h 40m
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
                    {dataSpecificMovies?.vote_average}{" "}
                  </p>
                  <p className=" flex items-center text-xs leading-[16px] text-[#71717A]">
                    /10
                  </p>
                </div>
                <p className="text-sm leading-[16px] text-[#71717A]">
                  {dataSpecificMovies?.vote_count}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 pt-6">
          <Image
            style={{ width: "290px", height: "428px" }}
            width={0}
            height={0}
            priority
            src={`https://image.tmdb.org/t/p/original${dataSpecificMovies?.poster_path}`}
            alt="detail1"
            unoptimized
          />

          <div className="flex relative w-full h-full">
            <Image
              style={{ width: "760px", height: "428px" }}
              width={0}
              height={0}
              priority
              src={`https://image.tmdb.org/t/p/original${dataSpecificMovies?.backdrop_path}`}
              alt="detail2"
              unoptimized
            />

            <div className="flex items-center absolute left-[24px] bottom-[24px] z-0">
              <PlayButton id={`${id}`} isDetail={true} />
            </div>
          </div>
        </div>
        <MovieDetails />

        <div className="flex flex-col gap-8">
          <Label
            text="More like this"
            seeMore={true}
            onClick={() => handleMore(id)}
          />
          <div className="flex flex-wrap gap-[32px]">
            {dataSimilarMovies?.slice(0, 5).map((el, index) => {
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
      </div>
    </div>
  );
};

export default Details;
