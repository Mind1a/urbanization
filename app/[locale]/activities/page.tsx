import type { PaginationSearchParams } from "@/lib/pagination";
import Activities from "@/features/activities/Activities";
import ServerHydration from "@/features/query/ServerHydration";
import { loadActivities, requireLocale, requirePagination } from "@/lib/server-data";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo";

export async function generateMetadata({ params, searchParams }: LocalePageProps & PaginationSearchParams) {
  const locale = requireLocale((await params).locale);
  const items = await loadActivities(locale);
  const pagination = requirePagination(items.length, (await searchParams).page);
  return staticPageMetadata(locale, "activities", pagination.page);
}

export default async function ActivitiesPage({ params, searchParams }: LocalePageProps & PaginationSearchParams) {
  const locale = requireLocale((await params).locale);
  const activities = await loadActivities(locale);
  const { page } = requirePagination(activities.length, (await searchParams).page);
  return (
    <ServerHydration queries={[{ queryKey: ["activities", locale, undefined], data: activities }]}>
      <Activities page={page} />
    </ServerHydration>
  );
}
