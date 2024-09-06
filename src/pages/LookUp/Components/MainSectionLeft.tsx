import React from "react";

function MainSectionLeft() {
  return (
    <>
      <div className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#312e81]">
        Try Our Free Phone Number Lookup
      </div>
      <div className="text-base xl:text-lg font-medium text-[#8a8cd0] line-clamp-2">
        Use our free phone number lookup to find out who's calling you. Our
        comprehensive database includes millions of phone numbers.
      </div>
      <div className="w-full flex flex-row gap-4 items-center">
        <div className="text-xs sm:text-base px-10 py-3 sm:px-10 sm:py-3 xl:px-16 xl:py-3 rounded-md sm:rounded-xl text-white text-center bg-[#6366f1] cursor-pointer hover:bg-[#7a7be3]">
          Get Premium
        </div>
        <div className="text-xs sm:text-base px-10 py-3 sm:px-10 sm:py-3 xl:px-16 xl:py-3 rounded-md sm:rounded-xl text-[#6366f1] text-center cursor-pointer border border-[#6366f1] hover:bg-[#7a7be4] hover:text-white">
          Book a Demo
        </div>
      </div>
    </>
  );
}

export default MainSectionLeft;
