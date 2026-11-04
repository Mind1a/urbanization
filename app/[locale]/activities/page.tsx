import Activities from "@/features/activities/Activities";
import ServerHydration from "@/features/query/ServerHydration";
import { loadActivities, requireLocale } from "@/lib/server-data";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo";

export async function generateMetadata({ params }: LocalePageProps) {
  return staticPageMetadata(requireLocale((await params).locale), "activities");
}

export default async function ActivitiesPage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const activities = await loadActivities(locale);
  return (
    <ServerHydration queries={[{ queryKey: ["activities", locale, undefined], data: activities }]}>
      <Activities />
    </ServerHydration>
  );
}
