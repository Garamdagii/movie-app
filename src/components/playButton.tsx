import { axiosInstance } from "@/lib/utils";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

export const PlayButton = ({
  id,
  isDetail,
}: {
  id: string;
  isDetail: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataMovieTrailer, setDataMovieTrailer] = useState<DataTypes[]>();

  useEffect(() => {
    fetchDataMovieTrailer();
  }, []);

  const fetchDataMovieTrailer = async () => {
    await axiosInstance.get(`movie/${id}/videos?language=en-US`).then((res) => {
      setDataMovieTrailer(res.data.results);
    });
  };

  return (
    <div onClick={() => setIsPlaying(true)}>
      <Dialog>
        <DialogTrigger className="flex gap-3 w-fit justify-center items-center">
          <div
            className={`flex h-[40px] px-2 py-4 gap-2 justify-center items-center ${
              isDetail
                ? "rounded-[999px] bg-[#FFF] w-[40px]"
                : "rounded-[6px] bg-[#F4F4F5] text-sm font-medium leading-[20px] text-[#18181B] w-fit"
            } `}
          >
            <Play className="size-[16px] stroke-[#18181B]" />
            {isDetail ? null : "Watch Trailer"}
          </div>
          <div>
            {isDetail ? (
              <div className="flex">
                <p className="text-base leading-[24px] text-[#FFF]">
                  Play Trailer
                </p>
                <p className="text-sm leading-[20px] text-[#FFF]">2:35</p>
              </div>
            ) : null}
          </div>
        </DialogTrigger>
        <DialogContent className="size-[100px] [&>button]:hidden bg-transparent border-none p-0 gap-0 margin-0 top-[30%] left-[30%] shadow-0 rounded-0">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          {dataMovieTrailer?.slice(0, 1).map((el, index) => (
            <div key={index} className="">
              <iframe
                width="1000"
                height="500"
                src={`https://www.youtube.com/embed/${el.key}?si=6jPOXrrh0EhAEg4b`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};
