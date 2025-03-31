import { Badge } from "@/components/ui/badge";
import { axiosInstance } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const jobTitle = ["Director", "Writers", "Stars"];

type Props = {
  overview: string;
  genres: string;
  jobTitle: string;
};
type DataTypes = {
  genres: genres[];
  overview: string;
};
type genres = {
  id: number;
  name: string;
};
type CreditTypes = {
  overview: string;
  cast: cast[];
  crew: crew[];
};

type cast = {
  id: number;
  known_for_department: string;
  name: string;
};

type crew = {
  id: number;
  known_for_department: string;
  name: string;
  department: string;
  job: string;
};

export const MovieDetails = ({}) => {
  const [dataSpecific, setDataSpecific] = useState<DataTypes>();
  const [dataCredits, setDataCredits] = useState<CreditTypes>();

  const { id } = useParams();

  useEffect(() => {
    movieCredits();
    specificMovies();
  }, []);

  const specificMovies = async () => {
    await axiosInstance.get(`movie/${id}?language=en-US`).then((res) => {
      setDataSpecific(res.data);
    });
  };

  const movieCredits = async () => {
    await axiosInstance
      .get(`movie/${id}/credits?language=en-US`)
      .then((res) => {
        setDataCredits(res.data);
      });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        {dataSpecific?.genres.map((value, index) => {
          return (
            <Badge
              className="flex py-[2px] px-[10px] justify-center items-center rounded-9999px border solid border-[#E4E4E7]
            text-sm font-semibold leading-[16px] text-[#09090B]"
              variant="outline"
              key={index}
            >
              {value.name}
            </Badge>
          );
        })}
      </div>

      <p className="w-fit text-base leading-[24px] text-[#09090B]">
        {dataSpecific?.overview}
      </p>

      <div className="flex flex-col gap-5">
        {jobTitle.map((value, index) => {
          return (
            <div key={index} className="flex gap-[53px]">
              <h3 className="w-fit text-base font-bold leading-[28px] text-[#09090B]">
                {value}
              </h3>
              {index == 0 &&
                dataCredits?.crew.map((value, index) => {
                  return (
                    value.department === "Directing" &&
                    value.job === "Director" && <p key={index}>{value.name}</p>
                  );
                })}
              {index == 1 &&
                dataCredits?.crew.map((value, index) => {
                  return (
                    value.department === "Writing" &&
                    value.job === "Writer" && <p key={index}>{value.name}</p>
                  );
                })}
              {index == 2 &&
                dataCredits?.cast.slice(0, 3).map((value, index) => {
                  return (
                    value.known_for_department === "Acting" && (
                      <p key={index}>{value.name}</p>
                    )
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
