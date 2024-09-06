import React from "react";
import NavBar from "@/components/NavBar";
import PhoneInput from "@/components/PhoneInput";
import { useCallback, useEffect, useReducer, useState } from "react";
import { cn } from "@/utils/cn";
import ResultBox from "@/components/ResultBox";
import { fetchFakeData } from "@/utils/responseAPI";
import { responseType } from "@/utils/types/responseType";
import Reviews from "@/components/Reviews";
import { reviewData } from "@/utils/reviewData";
import z from "zod";
import VideoPlayer from "@/components/VideoPlayer";
import MainSectionLeft from "./Components/MainSectionLeft";

type ReviewState = {
  currentReviewIndex: number;
  previousReviewIndex: number | null;
  reviewKey: number;
};

type ReviewAction = { type: "next" };

const reviewReducer = (
  state: ReviewState,
  action: ReviewAction
): ReviewState => {
  switch (action.type) {
    case "next":
      return {
        ...state,
        previousReviewIndex: state.currentReviewIndex,
        currentReviewIndex: (state.currentReviewIndex + 1) % reviewData.length,
        reviewKey: state.reviewKey + 1,
      };
    default:
      return state;
  }
};

const phoneNumberValidator = z
  .string({
    required_error: "Enter a valid phone number",
    invalid_type_error: "Enter a valid phone number",
  })
  .regex(/^\+(\d{4,})(\s\d{4,})*$/, "Enter a valid phone number");

function LookUp() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [delayedEffect, setDelayedEffect] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<responseType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [{ currentReviewIndex, previousReviewIndex, reviewKey }, dispatch] =
    useReducer(reviewReducer, {
      currentReviewIndex: 0,
      previousReviewIndex: null,
      reviewKey: 0,
    });

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setDelayedEffect(true);
      }, 600);
    } else {
      setDelayedEffect(false);
    }
  }, [isFocused]);

  useEffect(() => {
    const intervalId = setInterval(() => dispatch({ type: "next" }), 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = useCallback(
    (phoneNumber: string) => {
      try {
        phoneNumberValidator.parse(phoneNumber);
        setIsLoading(true);
        setError(null);
        setResponseData(null);
        if (!isFocused) setIsFocused(true);

        fetchFakeData(phoneNumber)
          .then((response) => setResponseData(response))
          .catch((err) => setError(err.message))
          .finally(() => setIsLoading(false));
      } catch {
        setError("Enter a valid phone number");
        setIsLoading(false);
      }
    },
    [isFocused]
  );

  return (
    <>
      <div
        className={cn(
          isFocused
            ? "flex-col animate-fadeInToView"
            : "flex-row animate-fadeInToView",
          "flex items-center sm:px-2 md:px-8 w-full"
        )}
      >
        <div
          className={cn(
            "w-full h-[100vh] sm:h-[820px] lg:h-[850px] flex flex-col items-center justify-start p-1 rounded-md"
          )}
          onClick={(e: any) => {
            if (e.target !== e.currentTarget) return;
            setIsFocused(false);
          }}
        >
          <div
            className={cn(
              isFocused ? "h-full" : "h-full",
              "w-full sm:h-full flex flex-col items-center"
            )}
          >
            <div
              className={cn(
                "transition-all duration-500 ease-out",
                isFocused
                  ? "animate-fadeOutThenShrink"
                  : "animate-growThenFadeIn",
                "flex flex-row justify-center items-center gap-1 xl:gap-4 w-full 2xl:w-4/5 h-full"
              )}
            >
              <div className="flex flex-col gap-8 justify-center items-start p-6 overflow-hidden relative">
                {/* Main Section Left */}
                <MainSectionLeft />

                <div className="w-full xl:w-3/4 h-[300px] relative flex -z-20">
                  {previousReviewIndex !== null && (
                    <Reviews
                      key={`prev-${reviewKey}`}
                      reviewData={reviewData[previousReviewIndex]}
                      classList="top-[3%] w-full h-[92%] animate-slideOutToTop mb-10"
                    />
                  )}
                  <Reviews
                    key={`current-${reviewKey}`}
                    reviewData={reviewData[currentReviewIndex]}
                    classList="absolute top-[3%] w-full h-[92%] animate-slideInFromBottom"
                  />
                </div>
              </div>

              {/* Main Section Right */}
              <div
                className={cn(
                  "transition-all duration-100 ease-out",
                  isFocused
                    ? "animate-fadeOutThenShrink"
                    : "animate-growThenFadeIn",
                  "xl:w-auto flex-grow h-full items-center justify-center xl:flex hidden"
                )}
              >
                <div className="rounded-xl overflow-clip w-2/5 xl:w-full flex flex-row items-center">
                  <VideoPlayer
                    url="https://www.youtube.com/watch?v=w47oTyA4hhg"
                    thumb="https://echo.win/images/featured/other_resized.webp"
                  />
                </div>
              </div>
            </div>

            {/* Phone Input Section */}
            <div
              className={cn(
                delayedEffect ? "w-full lg:w-4/5" : "lg:w-2/5",
                "w-11/12 md:w-full transition-all ease-in-out duration-500 z-50 relative"
              )}
            >
              <PhoneInput
                onFocus={(s) => {
                  setIsFocused(s);
                }}
                onSearch={(phoneNumber) => handleSearch(phoneNumber)}
                errorMessage={error}
              />
            </div>

            <div
              className={cn(
                isFocused && delayedEffect ? "h-auto sm:h-full" : "",
                "w-full flex items-center justify-center"
              )}
              onClick={(e: any) => {
                if (e.target !== e.currentTarget) return;
                setIsFocused(false);
              }}
            >
              <div
                className={cn(
                  isFocused && delayedEffect
                    ? "flex animate-growThenFadeIn"
                    : "hidden",
                  "w-11/12 sm:w-3/4 md:w-2/3 lg:w-[600px] h-full"
                )}
              >
                <ResultBox resultData={responseData} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LookUp;
