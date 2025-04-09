"use client";

import { Film } from "lucide-react";
import { useRouter } from "next/navigation";

export const Logo = ({ isHeader }: { isHeader: boolean }) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/");
  };

  return (
    <div
      onClick={handleOnClick}
      className={`flex ${
        isHeader ? "justify-center items-center" : "items-center"
      } gap-2`}
    >
      <Film
        className={`size-[20px] ${
          isHeader ? "stroke-[#4338CA]" : "stroke-[#FAFAFA]"
        } `}
      />
      <p
        className={`text-base italic font-bold leading-[20px] ${
          isHeader ? "text-[#4338CA]" : "text-[#FAFAFA]"
        } `}
      >
        Movie Z
      </p>
    </div>
  );
};
