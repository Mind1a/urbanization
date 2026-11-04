import ActivityDetails from "@/features/activities/components/ActivityDetails";
import ServerHydration from "@/features/query/ServerHydration";
import JsonLd from "@/features/seo/JsonLd";
import { contentLocales, loadActivity, loadActivities, requireLocale } from "@/lib/server-data";
import { apiAssetUrl, createPageMetadata, distinguishTitle, isoDate, seoCopy, type DetailPageProps } from "@/lib/seo";
import { breadcrumbSchema, contentSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: DetailPageProps) {
  const { locale: requestedLocale, id } = await params;
  const locale = requireLocale(requestedLocale);
  const [activity, activities] = await Promise.all([loadActivity(locale, id), loadActivities(locale)]);
  const locales = await contentLocales(locale, id, loadActivity);
  return createPageMetadata({
    locale, path: `/activities/${activity.id}`,
    title: distinguishTitle(activity, activities, locale === "ka" ? "აქტივობა" : "Activity"), description: activity.description,
    image: apiAssetUrl(activity.img),
    article: { publishedTime: isoDate(activity.datetime), author: activity.author_name }, locales,
  });
}

export default async function ActivityPage({ params }: DetailPageProps) {
  const { locale: requestedLocale, id } = await params;
  const locale = requireLocale(requestedLocale);
  const activity = await loadActivity(locale, id);
  const path = `/activities/${activity.id}`;
  return (
    <ServerHydration queries={[{ queryKey: ["activity", locale, id], data: activity }]}>
      <JsonLd data={contentSchema({
        locale, path, title: activity.title, description: activity.description,
        image: apiAssetUrl(activity.img), date: activity.datetime, author: activity.author_name,
      })} />
      <JsonLd data={breadcrumbSchema(locale, [
        { name: seoCopy(locale).pages.activities.title, path: "/activities" },
        { name: activity.title, path },
      ])} />
      <ActivityDetails id={id} />
    </ServerHydration>
  );
}
