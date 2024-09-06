import { cn } from "@/utils/cn";
import { reviewType } from "@/utils/types/reviewTypes";
import { Quotes, Star } from "@phosphor-icons/react";
import React from "react";

export default function Reviews(props: {
  reviewData: reviewType;
  classList: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-[#6366f1] p-4 sm:p-6 lg:p-8 w-full h-full flex flex-col justify-center gap-4 sm:gap-6",
        props.classList
      )}
    >
      <div className="text-white flex flex-col gap-2">
        <div className="">
          <Quotes className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="text-base h-[78px] md:h-full overflow-hidden text-ellipsis whitespace-normal line-clamp-3">
          {props.reviewData.review}
        </div>
      </div>
      <div className="flex flex-row gap-2 sm:gap-4">
        {Array.from({ length: props.reviewData.rating }).map((_, index) => (
          <Star key={index} weight="fill" className="2-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
        ))}
      </div>
      <div className={cn("flex flex-row items-center gap-2 sm:gap-4")}>
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#f1f2f3] overflow-clip flex flex-row">
          <img
            src="https://pbs.twimg.com/media/FjXRjHWWIAAq9AF.jpg"
            alt="pfp"
          />
        </div>

        <div className="flex-grow flex flex-col gap-1 w-3/4">
          <div className="text-base sm:text-lg font-medium text-white">
            {props.reviewData.name}
          </div>
          <div className="text-xs sm:text-sm text-gray-200 text-ellipsis whitespace-normal line-clamp-2">
            {props.reviewData.title}
          </div>
        </div>
      </div>
    </div>
  );
}
