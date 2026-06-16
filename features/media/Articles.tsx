"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const articles = [
  {
    src: "/images/articles/article-1.jpg",
    alt: "Article 1",
    date: "12.05.2025",
    headline: "Headline",
  },
  {
    src: "/images/articles/article-2.jpg",
    alt: "Article 2",
    date: "12.05.2025",
    headline: "Headline",
  },
  {
    src: "/images/articles/article-1.jpg",
    alt: "Article 3",
    date: "12.05.2025",
    headline: "Headline",
  },
  {
    src: "/images/articles/article-2.jpg",
    alt: "Article 4",
    date: "12.05.2025",
    headline: "Headline",
  },
];

export default function Articles() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateState = useCallback(() => {
    if (!emblaApi) return;
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

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] md:text-[32px] font-bold text-[#1E1E1E]">
          Articles
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="h-10 w-10 rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition"
          >
            <Image
              src="/icons/right-arrow.svg"
              alt="previous"
              width={44}
              height={44}
              className="rotate-180 h-9 w-9"
            />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="h-10 w-10 rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition"
          >
            <Image
              src="/icons/right-arrow.svg"
              alt="next"
              width={44}
              height={44}
              className="h-9 w-9"
            />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {articles.map((article, i) => (
            <div
              key={i}
              className="flex-none w-[85%] md:w-[47%] lg:w-[31%] min-w-0"
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src={article.src}
                  alt={article.alt}
                  width={600}
                  height={400}
                  className="w-full h-48 md:h-60 object-cover"
                />
              </div>

              {/* Date */}
              <p className="mt-3 text-[13px] text-[#888888]">{article.date}</p>

              {/* Headline */}
              <h3 className="mt-1 text-[16px] md:text-[18px] font-bold text-[#1E1E1E]">
                {article.headline}
              </h3>

              {/* Button */}
              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 transition text-white font-semibold text-[15px] py-3 rounded-full">
                Read Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
