import type { PaginationSearchParams } from "@/lib/pagination";
import AboutSection from "@/features/media/AboutSection";
import Articles from "@/features/media/Articles";
import ServerHydration from "@/features/query/ServerHydration";
import { loadMedia, requireLocale, requirePagination } from "@/lib/server-data";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo";

export async function generateMetadata({ params, searchParams }: LocalePageProps & PaginationSearchParams) {
  const locale = requireLocale((await params).locale);
  const items = await loadMedia(locale);
  const pagination = requirePagination(items.length, (await searchParams).page);
  return staticPageMetadata(locale, "media", pagination.page);
}

export default async function MediaPage({ params, searchParams }: LocalePageProps & PaginationSearchParams) {
  const locale = requireLocale((await params).locale);
  const articles = await loadMedia(locale);
  const { page } = requirePagination(articles.length, (await searchParams).page);
  return (
    <ServerHydration queries={[{ queryKey: ["media", locale], data: articles }]}>
      <div className="px-6 md:px-8 xl:px-20 mb-8 md:mb-10 lg:mb-16">
        <AboutSection />
        <Articles page={page} />
      </div>
    </ServerHydration>
  );
}
