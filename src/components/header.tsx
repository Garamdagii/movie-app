"use client";

import { Moon, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Badge, Button, Logo, Input } from "@/components";
import { axiosInstance } from "@/lib/utils";
import { useRouter } from "next/navigation";

type genreTypes = {
  id: string;
  name: string;
};

export const Header = ({}) => {
  const [dataMovieGenres, setDataMovieGenres] = useState<genreTypes[]>();

  useEffect(() => {
    axiosInstance.get("genre/movie/list?language=en").then((res) => {
      setDataMovieGenres(res.data.genres);
    });
  }, []);

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/searchFilter/${id}`);
  };

  return (
    <div className="flex w-full px-4 py-3 justify-center items-center">
      <div className="flex justify-between items-center w-[1280px]">
        <Logo isHeader={true} />
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
              {dataMovieGenres?.map((genre, index) => {
                return (
                  <DropdownMenuItem key={index}>
                    <Badge
                      variant="outline"
                      onClick={() => handleOnClick(genre.id)}
                    >
                      {genre.name}
                    </Badge>
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

          <Input />
        </div>
        <Button
          className={
            "flex justify-center items-center size-[36px] py-2 px-4 rounded-[10px] border solid border-[#E4E4E7] shadow-sm shadow-[#E4E4E7] bg-[#FFF]"
          }
        >
          <Moon className="size-[16px] stroke-[#18181B]" />
        </Button>
      </div>
    </div>
  );
};
