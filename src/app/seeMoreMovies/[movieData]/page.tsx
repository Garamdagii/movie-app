"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Label, Movies } from "@/components";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TitleTypes = {
  results: results[];
  total_pages: number;
  total_results: number;
};

type results = {
  id: string;
  title: string;
  poster_path: string;
  vote_average: string;
};

const SeeMoreMovies = () => {
  const [data, setData] = useState<TitleTypes>();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(parseInt(page || "1"));
  const { movieData } = useParams();

  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  // console.log(page);

  useEffect(() => {
    sortedMovies();
  }, []);

  const sortedMovies = async () => {
    const dataUrl = `movie/${movieData}?language=en-US&page=${currentPage}`;
    await axiosInstance.get(dataUrl).then((res) => {
      setData(res.data);
    });
  };

  const handlePreviousPages = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPages = () => {
    if (currentPage !== 10) setCurrentPage(currentPage + 1);
  };

  // const pages = total_pages?.forEach((value, key) => {
  //   [key] = value;
  // });

  const pages = [1, 2, 3];

  return (
    <div className="flex flex-col gap-8 px-[80px] py-[52px]">
      <Label text={`${movieData}`} />
      <div className="flex flex-wrap gap-8">
        {data?.results.map((el, index) => {
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePreviousPages} />
          </PaginationItem>
          {pages.map((page, index) => (
            <PaginationLink
              key={index}
              isActive={currentPage == index + 1}
              href={`movie/${movieData}?language=en-US&page=${index + 1}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={handleNextPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default SeeMoreMovies;
