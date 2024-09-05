import React, { useState } from "react";
import { countryList } from "@/utils/countryList";
import {
  CaretDown,
  Globe,
  MagnifyingGlass,
  WarningCircle,
} from "@phosphor-icons/react";
import { cn } from "@/utils/cn";

const PhoneInput = (props: {
  onFocus: () => void;
  onSearch: (phoneNumber: string) => void;
  errorMessage: string | null;
}) => {
  const defaultCountry = {
    countryCode: "NP",
    countryName: "Nepal",
    phoneCode: "+977",
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    defaultCountry || countryList[0]
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryCode = event.target.value;
    const country = countryList.find(
      (c) => c.countryCode === selectedCountryCode
    );
    if (country) setSelectedCountry(country);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const temp = event.target.value.split(" ");

    if (temp[0].charAt(0) === "+" && temp.length > 1) {
      const newCountry = countryList.find(
        (country) => country.phoneCode === temp[0]
      );

      newCountry !== undefined && setSelectedCountry(newCountry);
      setPhoneNumber(temp[1]);
      return;
    }
    setPhoneNumber(event.target.value);
  };

  return (
    <div className="relative pb-6">
      <div className="text-red-500 text-sm absolute left-6 bottom-0">
        {props.errorMessage ? (
          <div className="flex flex-row items-center gap-2">
            <span>
              <WarningCircle />
            </span>
            <span>{props.errorMessage}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={cn(
          props.errorMessage && props.errorMessage.length > 0
            ? "border-red-500"
            : "border-[#6366f1]",
          "flex flex-row items-center h-14 sm:h-16 rounded-full bg-white w-full gap-2 border px-2"
        )}
      >
        <div className="relative inline-flex items-center h-full">
          <div className="h-full flex items-center px-4 border-gray-300 rounded-full bg-white shadow-sm">
            {selectedCountry.countryName === "International" ? (
              <div className="w-5 h-4 sm:w-6 sm:h-6">
                <Globe className="w-full h-full" />
              </div>
            ) : (
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.countryCode}.svg`}
                alt={`${selectedCountry.countryName} flag`}
                className="w-5 h-3 sm:w-6 sm:h-4 sm:mr-2"
              />
            )}
            <span className="text-gray-700 text-sm sm:text-base flex flex-row items-center gap-1 sm:gap-2">
              {selectedCountry.phoneCode} <CaretDown className="w-3 sm:w-6" />
            </span>
            <select
              onChange={handleChange}
              value={selectedCountry.countryCode}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base"
            >
              {countryList.map((country, index) => (
                <option key={index} value={country.countryCode}>
                  {country.countryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-full text-sm sm:text-base flex-grow">
          <input
            className="h-full outline-none rounded-full w-full"
            placeholder="Enter Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            onFocus={props.onFocus}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.onSearch(
                  selectedCountry.phoneCode + phoneNumber.replace(/\s/g, "")
                );
              }
            }}
          />
        </div>
        <div
          className="w-12 h-12 sm:w-16 sm:h-full text-base rounded-full p-1 sm:p-2 cursor-pointer"
          onClick={() => {
            props.onSearch(
              selectedCountry.phoneCode + phoneNumber.replace(/\s/g, "")
            );
          }}
        >
          <div
            className={cn(
              props.errorMessage && props.errorMessage.length > 0
                ? "bg-red-500 hover:bg-red-400"
                : "bg-[#6366f1] hover:bg-[#7a7be4]",
              "w-full h-full text-base rounded-full flex items-center justify-center "
            )}
          >
            <MagnifyingGlass className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneInput;
