"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

type Article = {
  id: number;
  src: string;
  alt: string;
  date: string;
  title: string;
  text: string;
};

export default function ArticlesCarousel({
  articles,
}: {
  articles: Article[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });

  return (
    <section className="mt-20">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-[26px] font-bold text-[#1f1f1f]">Articles</h2>

        <div className="flex gap-6">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="text-4xl text-gray-500"
          >
            ‹
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="text-4xl text-black"
          >
            ›
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {articles.map((article) => (
            <div key={article.id} className="min-w-0 flex-[0_0_calc(50%-6px)]">
              <Image
                src={article.src}
                alt={article.alt}
                width={520}
                height={250}
                className="h-[205px] w-full rounded-[14px] object-cover"
              />

              <p className="mt-4 text-sm text-gray-500">{article.date}</p>

              <h3 className="mt-1 text-lg text-[#1f1f1f]">{article.title}</h3>

              <Link
                href={`/media/${article.id}`}
                className="mt-8 flex h-11 w-full items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white"
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
