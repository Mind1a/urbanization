import ArticleDetails from "@/features/media/ArticleDetails";
import ServerHydration from "@/features/query/ServerHydration";
import JsonLd from "@/features/seo/JsonLd";
import { contentLocales, loadArticle, loadMedia, requireLocale } from "@/lib/server-data";
import { apiAssetUrl, createPageMetadata, distinguishTitle, isoDate, seoCopy, type DetailPageProps } from "@/lib/seo";
import { breadcrumbSchema, contentSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: DetailPageProps) {
  const { locale: requestedLocale, id } = await params;
  const locale = requireLocale(requestedLocale);
  const [article, articles] = await Promise.all([loadArticle(locale, id), loadMedia(locale)]);
  const locales = await contentLocales(locale, id, loadArticle);
  return createPageMetadata({
    locale, path: `/media/${article.id}`,
    title: distinguishTitle(article, articles, locale === "ka" ? "სტატია" : "Article"), description: article.description,
    image: apiAssetUrl(article.img),
    article: { publishedTime: isoDate(article.datetime) }, locales,
  });
}

export default async function ArticlePage({ params }: DetailPageProps) {
  const { locale: requestedLocale, id } = await params;
  const locale = requireLocale(requestedLocale);
  const article = await loadArticle(locale, id);
  const path = `/media/${article.id}`;
  return (
    <ServerHydration queries={[{ queryKey: ["media", locale, Number(id)], data: article }]}>
      <JsonLd data={contentSchema({
        locale, path, title: article.title, description: article.description,
        image: apiAssetUrl(article.img), date: article.datetime,
      })} />
      <JsonLd data={breadcrumbSchema(locale, [
        { name: seoCopy(locale).pages.media.title, path: "/media" },
        { name: article.title, path },
      ])} />
      <ArticleDetails id={Number(id)} />
    </ServerHydration>
  );
}
