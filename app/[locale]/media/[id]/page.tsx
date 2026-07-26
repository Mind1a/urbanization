"use client";
import ArticlesCarousel from "@/features/media/ArticlesCarousel";
import { mediaArticles } from "@/features/media/data/mediaData";
import { useEachMedia } from "@/features/media/hooks/useMedia";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Usable, use } from "react";

export default function ArticlePage() {
  const params = useParams();
  const id = params.id;
  const { data: article } = useEachMedia(Number(id));
  console.log(article);

  // if (!article) notFound();

  return (
    <main
      className="px-6
      md:px-8
      xl:px-20 pb-30"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-3 md:flex gap-2 text-sm hidden text-[14px] lg:text-[20px]">
          <Link href={"/media"} className="text-[#1E1E1E99]">
            Media
          </Link>
          <span className="text-[#1E1E1E99]">/</span>
          <span className="text-[#1E1E1E]">{article?.[0].title}</span>
        </div>

        {article?.[0].img && (
          <Image
            src={`${process.env.NEXT_PUBLIC_URBAN_API_URL}/static/${article?.[0].img}`}
            alt={article?.[0].title}
            width={1200}
            height={420}
            priority
            className="h-[188px] xs:h-[364px] md:h-[472px] w-full rounded-[18px] object-cover"
          />
        )}

        <h1 className="my-4 md:my-5 lg:my-7.25 text-[16px] md:text-[24px] lg:text-[32px] font-semibold text-[#1E1E1E]">
          {article?.[0].title}
        </h1>

        <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-[20px] md:leading-[28px] lg:leading-[32px] text-[#333]">
          {article?.[0].description}
        </p>

        {article?.[1].recents && (
          <ArticlesCarousel articles={article?.[1].recents} />
        )}
      </div>
    </main>
  );
}
