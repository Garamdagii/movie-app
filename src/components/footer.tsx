import { Film } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";

export const Footer = ({}) => {
  return (
    <div className="flex py-10 w-full h-[280px] bg-[#4338CA] justify-center items-start">
      <div className="flex flex-col gap-3">
        <div className="flex justify-center items-center gap-2">
          <Film className="size-[20px] stroke-[#4338CA]" />
          <p className="text-base italic font-bold leading-[20px] text-[#4338CA]">
            Movie Z
          </p>
        </div>
        <p className="text-sm leading-[20px] text-[#FAFAFA]">
          © 2024 Movie Z. All Rights Reserved.
        </p>
      </div>
      <div>
        <div>
          <div>
            <h3>Contact Information</h3>
            <Mail />
            <h4>Email:</h4>
            <a href="support@movieZ.com">support@movieZ.com</a>
          </div>

          <div>
            <Phone />
            <h4>Phone:</h4>
            <p>+976 (11) 123-4567</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-medium leading-[20px] text-[#FAFAFA]">
            Follow us{" "}
          </h4>
          <div className="flex gap-3">
            <a
              href="support@movieZ.com"
              className="text-sm font-medium leading-[20px] text-[#FAFAFA]"
            >
              Facebook
            </a>
            <a
              href="support@movieZ.com"
              className="text-sm font-medium leading-[20px] text-[#FAFAFA]"
            >
              Instagram
            </a>
            <a
              href="support@movieZ.com"
              className="text-sm font-medium leading-[20px] text-[#FAFAFA]"
            >
              Twitter
            </a>
            <a
              href="support@movieZ.com"
              className="text-sm font-medium leading-[20px] text-[#FAFAFA]"
            >
              Youtube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
