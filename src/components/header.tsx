"use client";

import { Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Moon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "./inputSearch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import axios from "axios";

type genreTypes = {
  id: number;
  name: string;
};

export const Header = ({}) => {
  const [genres, setGenres] = useState<genreTypes[]>();

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setGenres(res.data.genres))
      .catch((err) => console.log(`error`, err));
  }, []);

  return (
    <div className="flex w-full px-4 py-3 justify-center items-center">
      <div className="flex justify-between items-center w-[1280px]">
        <div className="flex justify-center items-center gap-2">
          <Film className="size-[20px] stroke-[#4338CA]" />
          <p className="text-base italic font-bold leading-[20px] text-[#4338CA]">
            Movie Z
          </p>
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2 justify-center items-center">
              {" "}
              <ChevronDown className="size-[16px] stroke-[#18181B]" /> Genre
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                See lists of movies by genre
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {genres?.map((genre, index) => {
                return (
                  <DropdownMenuItem key={index}>
                    <Badge variant="outline"> {genre.name}</Badge>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <div>
            <select>
              <option value="">
                <ChevronDown />
              </option>
            </select>
            <select className="appearance-none">
              <option value="">Genre</option>
              {genres?.map((genre, index) => {
                return (
                  <option key={index} value={genre.name}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div> */}

          {/* <div className="flex w-[379px] gap-[10px] px-3 items-center rounded-[8px] border solid border-[#E4E4E7]">
            <Search className="size-[16px] opacity-[0.5] stroke-[#09090B]" />
            <Input
              className=
                "flex w-full py-2 items-center text-sm leading-[20px] text-[#71717A] border-none shadow-none focus-visible:outline-none focus-visible:border-none"
            />
          </div> */}

          <Input />
        </div>
        <Button
          className={
            "flex justify-center items-center size-[36px] py-2 px-4 rounded-[10px] border solid border-[#E4E4E7] shadow-sm shadow-[#E4E4E7] bg-[#FFF]"
          }
        >
          {" "}
          <Moon className="size-[16px] stroke-[#18181B]" />
        </Button>
      </div>
    </div>
  );
};
