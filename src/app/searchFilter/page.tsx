import { Movies } from "@/components";
import { axiosInstance } from "@/lib/utils";
import { useEffect, useState } from "react";

type Types = {
  genres: genres[];
};
type genres = {
  id: number;
  name: string;
};

const Search = () => {
  const [dataSearh, setDataSearch] = useState<Types[]>();
  const [dataGenres, setDataGenres] = useState<genres[]>();

  useEffect(() => {
    searchMovies();
    genreLists();
  }, []);

  const searchMovies = async () => {
    await axiosInstance
      .get("discover/movie?language=en&with_genres=28&page=1")
      .then((res) => setDataSearch(res.data.results));
  };

  const genreLists = async () => {
    await axiosInstance
      .get("genre/movie/list?language=en")
      .then((res) => setDataGenres(res.data));
  };

  return (
    <div>
      {dataGenres?.map((el, index) => {
        return (
          <div>
            <p>{el.name}</p>
          </div>
        );
      })}
    </div>
  );
};
