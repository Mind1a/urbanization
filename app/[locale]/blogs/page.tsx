import { getTranslations } from "next-intl/server";
import BlogCard from "@/features/blog/components/BlogCard";
import { loadBlogs, requireLocale } from "@/lib/server-data";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo";

export async function generateMetadata({ params }: LocalePageProps) {
  return staticPageMetadata(requireLocale((await params).locale), "blogs");
}

export default async function BlogsPage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const [blogs, t] = await Promise.all([loadBlogs(locale), getTranslations({ locale, namespace: "blogs" })]);
  return (
    <div className="px-6 pb-16 md:px-8 md:pb-20 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="my-9 md:mb-8">
          <h1 className="mb-4 text-2xl font-bold text-[#1E1E1E] md:text-[32px]">{t("title")}</h1>
          <p className="max-w-4xl text-base leading-relaxed text-[#1E1E1E] md:text-lg lg:text-xl">{t("description")}</p>
        </div>
        {blogs.length ? (
          <div className="flex flex-col gap-6 md:gap-8">{blogs.map((blog) => <BlogCard key={blog.id} blog={blog} locale={locale} />)}</div>
        ) : (
          <div className="py-16 text-center"><p className="text-xl font-medium">{t("empty")}</p><p className="mt-2 text-[#1E1E1E99]">{t("checkSoon")}</p></div>
        )}
      </div>
    </div>
  );
}
