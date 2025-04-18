import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";

export const Label = ({
  text,
  seeMore,
  onClick,
}: {
  text: string;
  seeMore: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <p className="text-2xl font-semibold leading-[32px] text-[#09090B]">
        {text}
      </p>
      {seeMore && (
        <Button
          onClick={onClick}
          className="flex h-[36px] gap-2 px-4 py-2 justify-center items-center rounded-1 bg-[#FFF] text-[#09090B] text-sm font-medium leading-[20px] hover:border hover:solid hover:bg-gray-50"
        >
          See more <MoveRight className="size-[16px] stroke-[#18181B]" />
        </Button>
      )}
    </div>
  );
};
