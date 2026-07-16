"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSlider } from "../hooks/useSlider";

export default function Hero() {
  const { data: slides = [], isLoading } = useSlider();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateState);
    updateState();
    return () => {
      emblaApi.off("select", updateState);
    };
  }, [emblaApi, updateState]);

  useEffect(() => {
    if (!emblaApi || slides.length === 0) return;

    emblaApi.reInit();
    updateState();
  }, [emblaApi, slides, updateState]);

  return (
    <div className="px-6 md:px-8 xl:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] md:text-[24px] lg:text-[32px] my-9 font-bold text-[#1E1E1E]">
            Saburtalo District Urban Transformations
          </h2>
          <div className="flex gap-5">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 text-[44px] h-11 w-11 cursor-pointer"
            >
              <Image
                src={"/icons/right-arrow.svg"}
                alt="right arrow image"
                width={44}
                height={44}
                className="rotate-180 h-9 w-9 md:h-11 md:w-11 "
              />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="h-11 w-11 rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 text-[44px] cursor-pointer"
            >
              <Image
                src={"/icons/right-arrow.svg"}
                alt="right arrow image"
                width={44}
                height={44}
                className="h-9 w-9 md:h-11 md:w-11 "
              />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide) => (
              <div key={slide.id} className="flex-none w-full min-w-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_GEOVERBS_API_URL}/static/${slide.img}`}
                  alt={slide.alt}
                  width={1000}
                  height={500}
                  className="w-full md:h-118 h-72 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="mt-6 text-[#1E1E1E] text-[12px] md:text-[18px] lg:text-[20px] leading-relaxed mb-25">
          This project examines one of Tbilisi’s districts, Saburtalo, from
          urban, geographical, and architectural perspectives, focusing on its
          transformation from a peripheral settlement to a central district
          during the late 19th century through the 1990s, and its ongoing
          evolution today.
        </p>
      </div>
    </div>
  );
}
