import React from "react";
import InfoField from "./InfoField";
import {
  Binoculars,
  City,
  Flag,
  MapPin,
  Phone,
  User,
} from "@phosphor-icons/react";
import Logo from "./Logo";
import { responseType } from "@/utils/types/responseType";
import { Placeholder } from "./PlaceHolder";

import Lottie from "lottie-react";
import SearchAnim from "@/utils/animation/search.json";

export default function ResultBox(props: {
  resultData: responseType | null;
  isLoading: boolean;
}) {
  const { resultData, isLoading } = props;

  return (
    <>
      {props.resultData || props.isLoading ? (
        <div className="w-full rounded-2xl h-full flex flex-col gap-2 bg-white px-6 sm:px-8 animate-fadeInToView border border-gray-300 relative">
          <div className="flex items-start h-full absolute top-4 sm:top-8 right-4 z-20">
            {isLoading ? (
              <></>
            ) : (
              resultData && (
                <img
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${resultData?.countryCode}.svg`}
                  alt={`${resultData?.countryCode} flag`}
                  className="w-8 h-6 sm:w-8 sm:h-6 sm:mr-2"
                />
              )
            )}
          </div>
          <div className="flex flex-row items-center gap-4 sm:gap-6 bg-white rounded-t-3xl py-4 pt-6 sm:pt-8 sm:py-8 relative">
            <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-[#f1f2f3] overflow-clip">
              {isLoading ? (
                <Placeholder width="w-32" height="h-32" />
              ) : (
                <img src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="Display" />
              )}
            </div>
            <div className="flex-grow flex flex-col sm:gap-1">
              {isLoading ? (
                <div className="flex flex-col gap-2">
                  <Placeholder width="w-1/4" height="h-4" />
                  <Placeholder width="w-2/3" height="h-8" />
                  <Placeholder width="w-1/3" height="h-4" />
                </div>
              ) : (
                <>
                  <div className="text-xs sm:text-sm font-medium text-[#979ca1]">Name</div>
                  <div className="text-xl sm:text-3xl font-medium">{resultData?.name}</div>
                  <div className="text-sm sm:text-base">{resultData?.location}</div>
                </>
              )}
            </div>
          </div>
          <div className="flex-grow flex flex-col gap-4 border-t border-[#e4e4e7] py-4 sm:py-8 px-2">
            {isLoading ? (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div className="flex flex-col items-start gap-4" key={index}>
                    <Placeholder width="w-1/6" height="h-4" />
                    {
                      index === 5 ? <Placeholder width="w-1/2" height="h-4" /> : <Placeholder width="w-4/5" height="h-4" />
                    }
                  </div>
                ))}
              </>
            ) : (
              <>
                <InfoField
                  field="Name"
                  icon={User}
                  text={resultData ? resultData?.name : ""}
                />
                <InfoField
                  field="National Format"
                  icon={Phone}
                  text={resultData ? resultData?.nationalFormat : ""}
                />
                <InfoField
                  field="Carrier"
                  icon={City}
                  text={resultData ? resultData?.carrier : ""}
                />
                <InfoField
                  field="Country"
                  icon={Flag}
                  text={resultData ? resultData?.countryCode : ""}
                />
                <InfoField
                  field="Location"
                  icon={MapPin}
                  text={resultData ? resultData?.location : ""}
                />
                <InfoField
                  field="Fraud"
                  icon={Binoculars}
                  text={
                    resultData
                      ? resultData?.fraud == null
                        ? "Genuine Number"
                        : "Possible Fraud"
                      : ""
                  }
                />
              </>
            )}
          </div>

          <div className="w-full flex items-end justify-end absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
            <div className="text-[#bfc1c4] flex flex-col justify-end">
              <div>powered by</div>
              <div className="w-24 border-5 border-red-500 sm:w-32">
                <Logo variant="mono-reverse" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-2xl h-full flex flex-col items-center justify-center bg-white p-10 relative border border-gray-300">
          {/* Enhanced 'No Result' Content */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-40 mb-4">
              <Lottie animationData={SearchAnim} loop={true} className="w-full h-full" />
            </div>
            <div className="text-2xl font-semibold text-gray-700">
              No results to display
            </div>
            <div className="text-lg text-gray-500">
              Enter a number to get started with your search.
            </div>
          </div>
          <div className="w-full flex items-end justify-end absolute bottom-3 right-2 sm:bottom-4 sm:right-4">
            <div className="text-[#bfc1c4] flex flex-col justify-end">
              <div>powered by</div>
              <div className="w-24 border-5 border-red-500 sm:w-32">
                <Logo variant="mono-reverse" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
