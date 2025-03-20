import { CardDescription, CardTitle } from "./ui/card";
import { Star } from "lucide-react";

export const Movies = ({
  poster_path,
  title,
  vote_average,
}: {
  poster_path: string;
  title: string;
  vote_average: string;
}) => {
  return (
    <div className="flex flex-col w-fit h-fit">
      <img className="w-[230px] h-[340px]" src={poster_path}></img>
      <div className="flex flex-col p-2 ">
        <div className="flex gap-1">
          <Star className="size-[16px] fill-[#FDE047] stroke-[#FDE047]" />
          <div className="flex">
            <CardDescription className="text-sm font-medium leading-[20px] text-[#09090B]">
              {vote_average}{" "}
            </CardDescription>
            <p className=" flex items-center text-xs leading-[16px] text-[#71717A]">
              /10
            </p>
          </div>
        </div>
        <CardTitle
          className={
            "w-[214px] flex flex-wrap text-lg leading-[28px] text-[#09090B] truncate overflow-hidden  text-ellipsis"
          }
        >
          {title}
        </CardTitle>
      </div>
    </div>
  );
};
