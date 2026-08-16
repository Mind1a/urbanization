"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IMediaItem } from "./types/mediaTypes";

export default function ArticlesCarousel({
  articles,
}: {
  articles: IMediaItem[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    updateButtons();
  }, [emblaApi, updateButtons]);

  return (
    <section className="mt-20">
      <div className="my-4 md:my-5 lg:my-7.25 flex items-center justify-between">
        <h2 className="text-[16px] md:text-[24px] lg:text-[32px] font-bold text-[#1f1f1f]">
          Articles
        </h2>

        <div className="flex gap-5">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={prevDisabled}
            className="disabled:opacity-40 transition-opacity"
          >
            <Image
              src={"/icons/right-arrow.svg"}
              alt="right arrow"
              width={44}
              height={44}
              className="rotate-180"
            />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={nextDisabled}
            className="disabled:opacity-40 transition-opacity"
          >
            <Image
              src={"/icons/right-arrow.svg"}
              alt="right arrow"
              width={44}
              height={44}
            />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="min-w-0 sm:flex-[0_0_calc(50%-8px)] flex-[0_0_calc(100%-8px)] flex flex-col"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_URBAN_API_URL}/static/${article.img}`}
                alt={article.title}
                width={520}
                height={250}
                className="aspect-342/164 sm:aspect-340/220 lg:aspect-632/300 w-full rounded-[14px] object-cover"
              />

              <p className="mt-1 sm:mt-5 text-sm text-[#1E1E1E99] self-end sm:self-start">
                {/* {article.date} */}
              </p>

              <h3 className="mt-1 sm:mt-2 text-lg text-[#1f1f1f]">
                {article.title}
              </h3>

              <Link
                href={`/media/${article.id}`}
                className="mt-8 sm:mt-6 lg:mt-11 py-4 flex w-full items-center justify-center rounded-full bg-[#ED6502] text-[15px] sm:text-[18px] lg:text-[20px] font-bold text-white"
              >
                Read Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
