import { config } from "../config";
import { ListOption } from "../interfaces";

// this function is a typeGuard to se if the data has the 2 necessary fields and types
const isValidObj = (data: any): data is ListOption => {
  return typeof data.value === "string" && typeof data.label === "string";
};

export const fetchCountryData = async (): Promise<ListOption[]> => {
  try {
    const response = await fetch(config.countriesUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch country data");
    }
    const data = await response.json();    
    const validCountries = data.filter(isValidObj); // typeguarding the incoming data
    return validCountries;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
