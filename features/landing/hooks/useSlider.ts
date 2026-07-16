import { useQuery } from "@tanstack/react-query";
import { getSlider } from "../api/sliderApi";
import { Slider } from "../types/sliderTypes";

export const useSlider = () => {
    return useQuery<Slider[], Error>({
        queryKey: ["slider"],
        queryFn: getSlider,
    });
};
