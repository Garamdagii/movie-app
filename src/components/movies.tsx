import { CardDescription } from "./ui/card";
import { Star } from "lucide-react";

export const Movies = ({
  poster_path,
  title,
  vote_average,
  onClick,
}: {
  poster_path: string;
  title: string;
  vote_average: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col w-fit h-[439px] bg-[#F4F4F5] rounded-[8px]"
    >
      <img className="w-[230px] h-[340px]" src={poster_path}></img>
      <div className="flex flex-col p-2 items-start ">
        <div className="flex gap-1">
          <Star className="size-[16px] fill-[#FDE047] stroke-[#FDE047]" />
          <div className="flex">
            <CardDescription
              className={"text-sm font-medium leading-[20px] text-[#09090B]"}
            >
              {vote_average}{" "}
            </CardDescription>
            <p className=" flex items-center text-xs leading-[16px] text-[#71717A]">
              /10
            </p>
          </div>
        </div>
        <p className="w-[214px] h-[56px] flex text-lg leading-[28px] text-[#09090B] text-wrap overflow-hidden hover:overflow-visible">
          {title}
        </p>
        {/* <CardTitle
          className={"w-[214px] flex text-lg leading-[28px] text-[#09090B]"}
        >
          {title}
        </CardTitle> */}
      </div>
    </div>
  );
};
