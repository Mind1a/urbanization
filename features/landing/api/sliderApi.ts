import { safeFetch } from "@/lib/apiClient";
import { Slider } from "../types/sliderTypes";

export const getSlider = async (locale: string): Promise<Slider[]> => {
  return safeFetch<Slider[]>(`/${locale}/api/slider/`);
};
