

import { Film } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";

export const Footer = ({}) => {
  return (
    <div className="flex py-10 w-full h-[280px] bg-[#4338CA] gap-[120px] px-[60px]">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-2">
          <Film className="size-[20px] stroke-[#FAFAFA]" />
          <p className="text-base italic font-bold leading-[20px] text-[#FAFAFA]">
            Movie Z
          </p>
        </div>
        <p className="text-sm leading-[20px] text-[#FAFAFA]">
          © 2024 Movie Z. All Rights Reserved.
        </p>
      </div>
      <div className="flex justify-end items-start gap-[96px] w-full">
        <div className="flex flex-col">
          <h3 className="text-sm leading-[20px] text-[#FAFAFA]">
            Contact Information
          </h3>
          <div className="flex gap-3 pt-3">
            <Mail className="size-[16px] stroke-[#FAFAFA] self-center" />
            <div className="flex flex-col">
              <h4 className="text-sm font-medium leading-[20px] text-[#FAFAFA]">
                Email:
              </h4>
              <a
                href="support@movieZ.com"
                className="text-sm leading-[20px] text-[#FAFAFA]"
              >
                support@movieZ.com
              </a>
            </div>
          </div>

          <div className="flex gap-3 pt-8">
            <Phone className="size-[16px] stroke-[#FAFAFA] flex self-center" />
            <div className="flex flex-col">
              <h4 className="text-sm font-medium leading-[20px] text-[#FAFAFA]">
                Phone:
              </h4>
              <p className="text-sm leading-[20px] text-[#FAFAFA]">
                +976 (11) 123-4567
              </p>
            </div>
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
