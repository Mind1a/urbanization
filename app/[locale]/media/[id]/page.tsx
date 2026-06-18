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
    <main className="py-8">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="mb-3 flex gap-2 text-sm">
          <span className="text-gray-400">Media</span>
          <span className="text-gray-400">/</span>
          <span className="text-[#1f1f1f]">{article.title}</span>
        </div>

        <Image
          src={article.src}
          alt={article.alt}
          width={1200}
          height={420}
          priority
          className="h-[325px] w-full rounded-[18px] object-cover"
        />

        <h1 className="mt-7 text-[28px] font-bold text-[#1f1f1f]">
          {article.title}
        </h1>

        <p className="mt-6 max-w-[980px] text-[15px] leading-[1.55] text-[#333]">
          {article.text}
        </p>

        <ArticlesCarousel articles={otherArticles} />
      </div>
    </main>
  );
}
