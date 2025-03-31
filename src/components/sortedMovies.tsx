import { Movies } from "./movies";
import { Label } from "./label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

type TitleTypes = {
  id: string;
  title: string;
  poster_path: string;
  vote_average: string;
};

export const SortedMovies = ({ movieData }: { movieData: string }) => {
  const [data, setData] = useState<TitleTypes[]>();

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  useEffect(() => {
    sortedMovies();
  }, []);

  const sortedMovies = async () => {
    await axiosInstance
      .get(`movie/${movieData}?language=en-US&page=1`)
      .then((res) => {
        setData(res.data.results);
      });
  };

  return (
    <div className="flex flex-wrap gap-[32px]">
      {data?.slice(0, 10).map((el, index) => {
        return (
          <Movies
            key={index}
            onClick={() => handleOnClick(el.id)}
            title={el.title}
            vote_average={el.vote_average}
            poster_path={el.poster_path}
          />
        );
      })}
    </div>
  );
};
