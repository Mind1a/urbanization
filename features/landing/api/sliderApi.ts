import { safeFetch } from "@/lib/apiClient";
import { Slider } from "../types/sliderTypes";

export const getSlider = async (): Promise<Slider[]> => {
  return safeFetch<Slider[]>("/api/slider/");
};
