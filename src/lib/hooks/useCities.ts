import { useState, useEffect } from "react";
import { stateCityData } from "../data/stateCityData";

export function useCities(selectedState: string) {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    // Update cities based on selectedState
    setCities(stateCityData[selectedState] || []);
  }, [selectedState]);

  // Log cities after state has been updated
  useEffect(() => {
    console.log('Updated Cities:', cities);
  }, [cities]);

  return cities;
}
