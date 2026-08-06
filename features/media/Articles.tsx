"use client";
import Image from "next/image";
import Link from "next/link";
import { useMedia } from "./hooks/useMedia";
import { log } from "console";

export default function Articles() {
  const { data: mediaArticles, isLoading } = useMedia();
  // const mediaArticles = [];
  // const isLoading = false;
  const formatter = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString().replaceAll("/", ".");
  };

  return (
    <div className="mx-auto max-w-7xl w-full">
      <div className="flex flex-col gap-6">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <ArticleSkeleton key={i} />)}
        {!isLoading && mediaArticles?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-[18px] md:text-[20px] font-medium text-[#1E1E1E]">
              No articles available yet
            </p>
            <p className="text-[14px] md:text-[16px] text-[#1E1E1E99]">
              Check back soon — new articles are on the way.
            </p>
          </div>
        )}
        {mediaArticles &&
          mediaArticles.map((article, i) => (
            <div
              key={i}
              className="flex flex-col xs:flex-row gap-6 rounded-2xl transition-all duration-300 hover:ring-2 hover:ring-[#ED6502] group"
            >
              {/* Image */}
              <div className="flex-none rounded-2xl overflow-hidden lg:w-[260px] lg:h-[260px] xs:w-[240px] xs:h-[208px] w-full aspect-[342/164]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_URBAN_API_URL}/static/${article.img}`}
                  alt={article.title}
                  width={260}
                  height={260}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-start md:gap-3 lg:gap-4 flex-1 p-3">
                <div className="flex items-start justify-between">
                  <h2 className="text-[15px] md:text-[20px] lg:text-[24px] font-bold text-[#1E1E1E]">
                    {article.title}
                  </h2>
                  <span className="text-[12px] md:text-[15px] lg:text-[20px] text-[#1E1E1E99] whitespace-nowrap">
                    {formatter(article.datetime)}
                  </span>
                </div>
                <p className="text-[14px] md:text-[18px] lg:text-[20px] text-[#1E1E1ECC] line-clamp-3">
                  {article.description}
                </p>

                <Link
                  href={`media/${article.id}`}
                  className="text-left text-[15px] md:text-[18px] lg:text-[20px] font-medium text-[#1E1E1E] hover:underline group-hover:text-[#ED6502] transition-colors duration-300 w-fit"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="flex flex-col xs:flex-row gap-6 rounded-2xl animate-pulse">
      {/* Image */}
      <div className="flex-none rounded-2xl overflow-hidden lg:w-[260px] lg:h-[260px] xs:w-[240px] xs:h-[208px] w-full aspect-[342/164] bg-gray-200" />

      {/* Content */}
      <div className="flex flex-col justify-start md:gap-3 lg:gap-4 flex-1 p-3">
        <div className="flex items-start justify-between gap-4">
          <div className="h-[15px] md:h-[20px] lg:h-[24px] w-2/3 bg-gray-200 rounded" />
          <div className="h-[12px] md:h-[15px] lg:h-[20px] w-16 bg-gray-200 rounded shrink-0" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-[14px] md:h-[18px] lg:h-[20px] w-full bg-gray-200 rounded" />
          <div className="h-[14px] md:h-[18px] lg:h-[20px] w-full bg-gray-200 rounded" />
          <div className="h-[14px] md:h-[18px] lg:h-[20px] w-3/4 bg-gray-200 rounded" />
        </div>

        <div className="h-[15px] md:h-[18px] lg:h-[20px] w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
