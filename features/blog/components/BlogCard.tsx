import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link, type Locale } from "@/features/i18n/routing";
import { apiAssetUrl, plainText } from "@/lib/seo";
import { formatCalendarDate } from "@/lib/date";
import type { Blog } from "../types/blogTypes";

export default async function BlogCard({ blog, locale, compact = false }: {
  blog: Blog;
  locale: Locale;
  compact?: boolean;
}) {
  const t = await getTranslations({ locale, namespace: "blogs" });
  const Heading = compact ? "h3" : "h2";
  const image = apiAssetUrl(blog.img);
  return (
    <article className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl ring-1 ring-transparent transition-shadow hover:ring-[#ED6502] focus-within:ring-[#ED6502] ${compact ? "" : "sm:flex-row sm:gap-6"}`}>
      <Link href={`/blogs/${blog.id}`} locale={locale} className={`relative block shrink-0 overflow-hidden bg-[#F3F3F3] focus-visible:outline-2 focus-visible:outline-[#ED6502] ${compact ? "aspect-[16/10]" : "aspect-[16/10] sm:aspect-square sm:w-[220px] lg:w-[260px]"}`} aria-label={blog.title} tabIndex={-1} aria-hidden="true">
        {image && <Image src={image} alt="" fill sizes={compact ? "(min-width: 1280px) 410px, (min-width: 768px) 33vw, 100vw" : "(min-width: 640px) 260px, 100vw"} className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />}
      </Link>
      <div className={`flex min-w-0 flex-1 flex-col items-start gap-3 p-4 ${compact ? "md:p-5" : "sm:py-3 sm:pr-5 lg:gap-4"}`}>
        <time dateTime={blog.datetime} className="text-sm text-[#1E1E1E99] md:text-base">{formatCalendarDate(blog.datetime)}</time>
        <Heading className={`font-bold leading-snug text-[#1E1E1E] ${compact ? "text-lg md:text-xl" : "text-lg md:text-2xl"}`}>
          <Link href={`/blogs/${blog.id}`} locale={locale} className="transition-colors hover:text-[#ED6502] focus-visible:outline-2 focus-visible:outline-[#ED6502]">{blog.title}</Link>
        </Heading>
        <p className={`line-clamp-3 leading-relaxed text-[#1E1E1ECC] ${compact ? "text-sm md:text-base" : "text-base lg:text-xl"}`}>{plainText(blog.description)}</p>
        <Link href={`/blogs/${blog.id}`} locale={locale} className="mt-auto pt-1 text-base font-medium text-[#ED6502] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[#ED6502]">
          {t("readMore")} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
