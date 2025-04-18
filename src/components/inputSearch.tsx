"use client";

import { Search } from "lucide-react";
import { Label } from "./label";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DataTypes = {
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  id: string;
};

export const Input = () => {
  const [dataSearchMovies, setDataSearchMovies] = useState<DataTypes[]>();
  const [inputText, setInputText] = useState("");

  const inputRef = useRef("");

  useEffect(() => {
    fetchDataSearch();
  }, [inputText]);

  const fetchDataSearch = async () => {
    await axiosInstance
      .get(`search/movie?query=${inputText}&language=en-US&page=1`)
      .then((res) => {
        setDataSearchMovies(res.data.results);
        // console.log(res.data.results);
      });
  };

  const handleOnChanges = (event: ChangeEvent<HTMLInputElement>) => {
    inputRef.current = event.target.value;
    setInputText(event.target.value);
  };

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
    setInputText("");
  };
  return (
    <div className="relative">
      <div className="flex w-[379px] gap-[10px] px-3 items-center rounded-[8px] border solid border-[#E4E4E7]">
        <Search className="size-[16px] opacity-[0.5] stroke-[#09090B]" />
        <input
          ref={inputRef}
          onChange={(event) => handleOnChanges(event)}
          type="text"
          placeholder="Search"
          className="flex w-full py-2 items-center text-sm leading-[20px] text-[#71717A] border-none shadow-none focus-visible:outline-none focus-visible:border-none"
        />
      </div>
      {inputText && (
        <div className="flex flex-col w-[577px] absolute z-50 bg-white">
          <div>
            {dataSearchMovies?.slice(0, 5).map((value, index) => {
              return (
                <div key={index} onClick={() => handleOnClick(value.id)}>
                  <div className="flex items-start p-3 gap-4 rounded-lg">
                    <div className="flex w-[67px] h-[100px]">
                      <Image
                        className="rounded-[6px]"
                        style={{ width: "auto", height: "auto" }}
                        width={67}
                        height={100}
                        priority
                        src={`https://image.tmdb.org/t/p/original${value.poster_path}`}
                        alt="image"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <h3 className="text-[20px] font-semibold leading-[28px] text-[#09090B]">
                        {value.title}
                      </h3>
                      <div className="flex w-[454px]">
                        <Label
                          text={value.release_date.slice(0, 4)}
                          seeMore={true}
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>
          <button className="flex h-[40px] px-2 py-3 justify-center items-center rounded-[6px] bg-[#FFF] text-sm font-medium leading-[20px] text-[#09090B]">{`See all results for ${inputText}`}</button>
        </div>
      )}
    </div>
  );
};
