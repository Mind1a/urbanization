import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/features/i18n/routing";
import BlogCard from "@/features/blog/components/BlogCard";
import JsonLd from "@/features/seo/JsonLd";
import { contentLocales, loadBlog, loadBlogs, requireLocale } from "@/lib/server-data";
import { apiAssetUrl, createPageMetadata, distinguishTitle, isoDate, type DetailPageProps } from "@/lib/seo";
import { breadcrumbSchema, contentSchema } from "@/lib/structured-data";
import { formatCalendarDate } from "@/lib/date";
import { externalUrl } from "@/lib/external-url";

export async function generateMetadata({ params }: DetailPageProps) {
  const { locale: requestedLocale, id } = await params;
  const locale = requireLocale(requestedLocale);
  const [blog, blogs, locales] = await Promise.all([loadBlog(locale, id), loadBlogs(locale), contentLocales(locale, id, loadBlog)]);
  return createPageMetadata({
    locale, path: `/blogs/${blog.id}`,
    title: distinguishTitle(blog, blogs, locale === "ka" ? "ბლოგი" : "Blog"),
    description: blog.description, image: apiAssetUrl(blog.img),
    article: { publishedTime: isoDate(blog.datetime) }, locales,
  });
}

export default async function BlogPage({ params }: DetailPageProps) {
  const { locale: requestedLocale, id } = await params;
  const locale = requireLocale(requestedLocale);
  const [blog, t] = await Promise.all([loadBlog(locale, id), getTranslations({ locale, namespace: "blogs" })]);
  const path = `/blogs/${blog.id}`;
  const image = apiAssetUrl(blog.img);
  const source = externalUrl(blog.link);
  const recent = (blog.recent ?? []).filter((item, index, items) => item.id !== blog.id && items.findIndex((other) => other.id === item.id) === index);
  return (
    <div className="px-6 pb-16 md:px-8 md:pb-24 xl:px-20">
      <JsonLd data={contentSchema({ locale, path, title: blog.title, description: blog.description, image, date: blog.datetime, type: "BlogPosting" })} />
      <JsonLd data={breadcrumbSchema(locale, [{ name: t("title"), path: "/blogs" }, { name: blog.title, path }])} />
      <div className="mx-auto max-w-7xl">
        <nav aria-label={t("breadcrumb")} className="my-6 flex items-center gap-2 text-sm md:my-8 md:text-base">
          <Link href="/blogs" locale={locale} className="shrink-0 text-[#ED6502] hover:underline">{t("title")}</Link>
          <span aria-hidden="true" className="text-[#1E1E1E66]">/</span>
          <span aria-current="page" className="truncate text-[#1E1E1E99]">{blog.title}</span>
        </nav>
        <article>
          {image && <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-[#F3F3F3] md:aspect-[1280/472]"><Image src={image} alt={blog.title} fill priority sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" /></div>}
          <div className="mx-auto mt-6 max-w-4xl md:mt-9">
            <time dateTime={blog.datetime} className="text-sm text-[#1E1E1E99] md:text-base">{formatCalendarDate(blog.datetime)}</time>
            <h1 className="mt-3 mb-6 text-2xl font-bold leading-snug text-[#1E1E1E] md:text-[32px]">{blog.title}</h1>
            <div className="whitespace-pre-line break-words text-base leading-7 text-[#333] md:text-lg md:leading-8 lg:text-xl lg:leading-9">{blog.description}</div>
            {source && <a href={source} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#ED6502] px-6 py-3 text-base font-medium text-[#ED6502] transition-colors hover:bg-[#ED6502] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED6502]">{t("source")}<span aria-hidden="true">↗</span><span className="sr-only">{t("newTab")}</span></a>}
          </div>
        </article>
        {recent.length > 0 && <section aria-labelledby="recent-blogs" className="mt-16 border-t border-[#1E1E1E1A] pt-8 md:mt-20 md:pt-10">
          <h2 id="recent-blogs" className="mb-6 text-2xl font-bold text-[#1E1E1E] md:text-[28px]">{t("recent")}</h2>
          <div className="grid gap-6 md:grid-cols-3">{recent.map((item) => <BlogCard key={item.id} blog={item} locale={locale} compact />)}</div>
        </section>}
      </div>
    </div>
  );
}
