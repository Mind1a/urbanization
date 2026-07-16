import { Slider } from "../types/sliderTypes";

export const getSlider = async (): Promise<Slider[]> => {
    const res = await fetch("/api/slider/");

    if (!res.ok) {
        throw new Error("Failed to fetch slider");
    }
    return res.json();
};