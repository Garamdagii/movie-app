import { Search } from "lucide-react";
import { Label } from "./label";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

type DataTypes = {
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

export const Input = () => {
  const [dataSearch, setDataSearch] = useState<DataTypes[]>();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    searchMovies();
  }, [inputText]);

  const searchMovies = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${inputText}&language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => {
        setDataSearch(res.data.results);
        // console.log(res.data.results);
      });
  };

  const handleOnChanges = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <div className="flex w-[379px] gap-[10px] px-3 items-center rounded-[8px] border solid border-[#E4E4E7]">
        <Search className="size-[16px] opacity-[0.5] stroke-[#09090B]" />
        <input
          onChange={(event) => handleOnChanges(event)}
          type="text"
          placeholder="Search"
          className="flex w-full py-2 items-center text-sm leading-[20px] text-[#71717A] border-none shadow-none focus-visible:outline-none focus-visible:border-none"
        />
      </div>
      {dataSearch?.slice(0, 5).map((value, index) => {
        return (
          <div className="flex flex-col w-[577px]" key={index}>
            <div className="flex items-start p-3 gap-4 rounded-lg">
              <Image
                className="rounded-[6px]"
                width={67}
                height={100}
                src={`https://image.tmdb.org/t/p/original${value.poster_path}`}
                alt="image"
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-[20px] font-semibold leading-[28px] text-[#09090B]">
                  {value.title}
                </h3>
                <div className="w-[577px]">
                  <Label text={value.release_date.slice(0, 4)} />
                </div>
              </div>
            </div>
            <Separator
            //   orientation="vertical"
            //   className="flex self-stretch py-2 px-0 border solid h-[1px] border-[#E4E4E7]"
            />
          </div>
        );
      })}
    </div>
  );
};
