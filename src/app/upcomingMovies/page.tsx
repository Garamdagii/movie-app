import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "@/components/label";
import { Movies } from "@/components/movies";

type DataTypes = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: string;
  vote_count: number;
};

const Upcoming = () => {
  const [dataUpcoming, setDataUpcoming] = useState<DataTypes[]>();

  useEffect(() => {
    upcoming();
  }, []);

  const upcoming = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_keyd67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => {
        setDataUpcoming(res.data);
      });
  };

  return (
    <div>
      <Label text="Upcoming" />
      <Movies />
    </div>
  );
};
