"use client";

import { Label, Movies } from "@/components";
import { axiosInstance } from "@/lib/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Types = {
  results: results[];
};

type results = {
  backdrop_path: string;
  id: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: string;
  vote_count: number;
  key: string;
};

const SimilarMovies = () => {
  const [dataSimilarMovies, setDataSimilarMovies] = useState<Types>();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(parseInt(page || "1"));

  const { id } = useParams();

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  useEffect(() => {
    fetchDataSimilarMovies();
  }, []);

  const fetchDataSimilarMovies = async () => {
    await axiosInstance
      .get(`movie/${id}/similar?language=en-US&page=${currentPage}`)
      .then((res) => {
        setDataSimilarMovies(res.data);
      });
  };

  return (
    <div className="flex flex-col gap-8 px-[80px] pt-[52px] pb-[76px]">
      <Label text="More like this" seeMore={false} onClick={() => {}} />
      <div className="flex flex-wrap gap-[32px]">
        {dataSimilarMovies?.results.map((data, index) => {
          return (
            <Movies
              key={index}
              onClick={() => handleOnClick(data.id)}
              poster_path={data.poster_path}
              title={data.title}
              vote_average={data.vote_average}
            />
          );
        })}
      </div>
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default SimilarMovies;
