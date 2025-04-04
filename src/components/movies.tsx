"use client";

import { Star } from "lucide-react";
import Image from "next/image";

type Props = {
  poster_path: string;
  vote_average: string;
  title: string;
  onClick: () => void;
};

export const Movies = ({
  poster_path,
  vote_average,
  title,
  onClick,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col w-fit h-[439px] bg-[#F4F4F5] rounded-[8px]"
    >
      <div className="w-[230px] h-[340px]">
        <Image
          width={230}
          height={340}
          style={{ width: "230px", height: "340px" }}
          priority
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt="image"
          className="rounded-[8px]"
          unoptimized
        />
      </div>

      <div className="flex flex-col p-2 items-start ">
        <div className="flex gap-1">
          <Star className="size-[16px] fill-[#FDE047] stroke-[#FDE047]" />
          <div className="flex">
            <p className={"text-sm font-medium leading-[20px] text-[#09090B]"}>
              {vote_average}{" "}
            </p>
            <p className=" flex items-center text-xs leading-[16px] text-[#71717A]">
              /10
            </p>
          </div>
        </div>
        <h3 className="w-[214px] h-[56px] flex text-lg leading-[28px] text-[#09090B] text-wrap overflow-hidden hover:overflow-visible">
          {title}
        </h3>
      </div>
    </div>
  );
};
