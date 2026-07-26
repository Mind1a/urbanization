"use client";
import Image from "next/image";
import Link from "next/link";
import { useMedia } from "./hooks/useMedia";
import { log } from "console";

export default function Articles() {
  const { data: mediaArticles } = useMedia();
  const formatter = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString().replaceAll("/", ".");
  };

  return (
    <div className="mx-auto max-w-7xl w-full">
      <div className="flex flex-col gap-6">
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
