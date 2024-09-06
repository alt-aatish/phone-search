import fakeData from "./responseData";
import { responseType } from "./types/responseType";

export const fetchFakeData = (phoneNumber: string): Promise<responseType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = fakeData.find((data: responseType) => data.phoneNumber === phoneNumber);
      if (result) {
        resolve(result);
      } else {
        reject(new Error("No data found for the provided phone number."));
      }
    }, 2000);
  });
};