import { Badge } from "@/components/ui/badge";
type Props = {
  overview: string;
  genres: string;
  text: string;
};

export const MovieDetails = ({ overview, genres, text }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <Badge variant="outline">{genres}</Badge>
      <p className="w-full text-base leading-[24px] text-[#09090B]">
        {overview}
      </p>
      <div>
        <div>
          <h3 className="w-full text-base font-fold leading-[24px] text-[#09090B]">
            Director
          </h3>
          <p className="w-full text-base leading-[24px] text-[#09090B]">
            {text}
          </p>
        </div>
        <div>
          <h3 className="w-full text-base font-fold leading-[24px] text-[#09090B]">
            Writers
          </h3>
          <p className="w-full text-base leading-[24px] text-[#09090B]">
            {text}
          </p>
        </div>
        <div>
          <h3 className="w-full text-base font-fold leading-[24px] text-[#09090B]">
            Stars
          </h3>
          <p className="w-full text-base leading-[24px] text-[#09090B]">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
