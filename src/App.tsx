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
            className="w-full h-[85vh] sm:h-[820px] lg:h-[850px] flex flex-col items-center justify-start p-1 sm:p-10 rounded-md"
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
                  "flex flex-row justify-center items-center gap-4 w-4/5"
                )}
              >
                <div className="flex flex-col gap-8 justify-center items-start p-6">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#312e81]">
                    Try Our Free Phone Number Lookup
                  </div>
                  <div className="text-base md:text-lg font-medium text-[#8a8cd0]">
                    Use our free phone number lookup to find out who's calling
                    you. Our comprehensive database includes millions of phone
                    numbers.
                  </div>
                  <div className="w-full flex flex-row gap-4 items-center">
                    <div className="px-20 py-4 rounded-2xl text-white text-center bg-[#6366f1] cursor-pointer hover:bg-[#7a7be4]">
                      Get Premium
                    </div>
                    <div className="px-20 py-4 rounded-2xl text-[#6366f1] text-center cursor-pointer border border-[#6366f1] hover:bg-[#7a7be4] hover:text-white">
                      Book a Demo
                    </div>
                  </div>

                  <div className="w-4/5 h-[280px] flex flex-col overflow-hidden relative">
                    {previousReviewIndex !== null && (
                      <Reviews
                        key={`prev-${reviewKey}`}
                        reviewData={reviewData[previousReviewIndex]}
                        classList="absolute w-full animate-slideOutToTop mr-4"
                      />
                    )}
                    <Reviews
                      key={`current-${reviewKey}`}
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
                    "h-full flex items-center justify-center"
                  )}
                >
                  <div className="rounded-xl overflow-clip">
                    <VideoPlayer />
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  delayedEffect ? "w-full" : "lg:w-2/3",
                  "w-full transition-all ease-in-out duration-500 z-50 relative"
                )}
              >
                <PhoneInput
                  onFocus={() => {
                    setIsFocused(true);
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
                  "w-full lg:w-3/5"
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
