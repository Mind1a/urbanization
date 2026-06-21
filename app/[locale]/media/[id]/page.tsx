import ArticlesCarousel from "@/features/media/ArticlesCarousel";
import { mediaArticles } from "@/features/media/data/mediaData";
import { log } from "console";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = mediaArticles.find((item) => item.id === Number(id));
  console.log(article);

  if (!article) notFound();

  const otherArticles = mediaArticles.filter((item) => item.id !== article.id);

  return (
    <main
      className="px-6
      md:px-8
      xl:px-20 pb-30"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-3 md:flex gap-2 text-sm hidden text-[14px] lg:text-[20px]">
          <span className="text-[#1E1E1E99]">Media</span>
          <span className="text-[#1E1E1E99]">/</span>
          <span className="text-[#1E1E1E]">{article.title}</span>
        </div>

        <Image
          src={article.src}
          alt={article.alt}
          width={1200}
          height={420}
          priority
          className="h-[188px] xs:h-[364px] md:h-[472px] w-full rounded-[18px] object-cover"
        />

        <h1 className="my-4 md:my-5 lg:my-7.25 text-[16px] md:text-[24px] lg:text-[32px] font-semibold text-[#1E1E1E]">
          {article.title}
        </h1>

        <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-[20px] md:leading-[28px] lg:leading-[32px] text-[#333]">
          {article.text}
        </p>

        <ArticlesCarousel articles={otherArticles} />
      </div>
    </main>
  );
}
