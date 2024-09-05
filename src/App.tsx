import NavBar from "@/components/NavBar";
import PhoneInput from "./components/PhoneInput";
import { useEffect, useState } from "react";
import { cn } from "./utils/cn";
import ResultBox from "./components/ResultBox";
import { fetchFakeData } from "./utils/responseAPI";
import { responseType } from "./utils/types/responseType";
import Reviews from "./components/Reviews";
import { reviewData } from "./utils/reviewData";
import z from "zod";
import VideoPlayer from "@/components/VideoPlayer";

function App() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [delayedEffect, setDelayedEffect] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<responseType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State for reviews
  const [currentReviewIndex, setCurrentReviewIndex] = useState<number>(0);
  const [previousReviewIndex, setPreviousReviewIndex] = useState<number | null>(
    null
  );
  const [reviewKey, setReviewKey] = useState<number>(0);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        setDelayedEffect(true);
      }, 600);
    } else {
      setDelayedEffect(false);
    }
  }, [isFocused]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPreviousReviewIndex(currentReviewIndex);
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === reviewData.length - 1 ? 0 : prevIndex + 1
      );
      setReviewKey((prevKey) => prevKey + 1);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentReviewIndex]);

  const phoneNumberValidator = z
    .string({
      required_error: "Enter a valid phone number",
      invalid_type_error: "Enter a valid phone number",
    })
    .regex(/^\+(\d{4,})(\s\d{4,})*$/, "Enter a valid phone number");

  const handleSearch = (phoneNumber: string) => {
    try {
      phoneNumberValidator.parse(phoneNumber);
      setIsLoading(true);
      if (!isFocused) {
        setIsFocused(true);
      }
      setIsLoading(true);
      setError(null);
      setResponseData(null);

      fetchFakeData(phoneNumber)
        .then((response) => {
          setResponseData(response);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } catch (e) {
      setError("Enter a valid phone number");
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-screen min-h-screen pb-10 bg-gradient-to-br from-blue-200 via-indigo-100 to-blue-100">
        <NavBar />

        <div
          className={cn(
            isFocused
              ? "flex-col animate-fadeInToView"
              : "flex-row animate-fadeInToView",
            "flex items-center sm:px-2 md:px-8 w-full"
          )}
        >
          <div
            className="w-full h-[95vh] sm:h-[820px] lg:h-[850px] flex flex-col items-center justify-start p-1 rounded-md"
            onClick={(e: any) => {
              if (e.target !== e.currentTarget) return;
              setIsFocused(false);
            }}
          >
            <div
              className={cn(
                isFocused ? "h-full" : "h-full",
                "w-full sm:h-full flex flex-col items-center gap-4 lg:gap-8"
              )}
            >
              <div
                className={cn(
                  "transition-all duration-500 ease-out",
                  isFocused
                    ? "animate-fadeOutThenShrink"
                    : "animate-growThenFadeIn",
                  "flex flex-row justify-center items-center gap-1 xl:gap-4 w-full 2xl:w-4/5"
                )}
              >
                <div className="flex flex-col gap-8 justify-center items-start p-6">
                  <div className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#312e81]">
                    Try Our Free Phone Number Lookup
                  </div>
                  <div className="text-base xl:text-lg font-medium text-[#8a8cd0] line-clamp-2">
                    Use our free phone number lookup to find out who's calling
                    you. Our comprehensive database includes millions of phone
                    numbers.
                  </div>
                  <div className="w-full flex flex-row gap-4 items-center">
                    <div className="text-xs sm:text-base px-10 py-3 sm:px-10 sm:py-3 xl:px-16 xl:py-3 rounded-md sm:rounded-xl text-white text-center bg-[#6366f1] cursor-pointer hover:bg-[#7a7be3]">
                      Get Premium
                    </div>
                    <div className="text-xs sm:text-base px-10 py-3 sm:px-10 sm:py-3 xl:px-16 xl:py-3 rounded-md sm:rounded-xl text-[#6366f1] text-center cursor-pointer border border-[#6366f1] hover:bg-[#7a7be4] hover:text-white">
                      Book a Demo
                    </div>
                  </div>

                  <div className="w-full xl:w-3/4 h-[280px] flex flex-row overflow-hidden relative gap-5">
                    {previousReviewIndex !== null && (
                      <Reviews
                        // key={`prev-${reviewKey}`}
                        reviewData={reviewData[previousReviewIndex]}
                        classList="absolute w-full animate-slideOutToTop"
                      />
                    )}
                    <Reviews
                      // key={`current-${reviewKey}`}
                      reviewData={reviewData[currentReviewIndex]}
                      classList="absolute w-full animate-slideInFromBottom"
                    />
                  </div>
                </div>

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
                    <VideoPlayer />
                  </div>
                </div>
              </div>

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
                  isFocused && delayedEffect
                    ? "flex animate-growThenFadeIn"
                    : "hidden",
                  "w-11/12 sm:w-3/4 md:w-2/3 lg:w-[600px]"
                )}
              >
                <ResultBox resultData={responseData} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
