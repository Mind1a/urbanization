import Activities from "@/features/activities/Activities";
import ServerHydration from "@/features/query/ServerHydration";
import JsonLd from "@/features/seo/JsonLd";
import { contentLocales, loadActivities, loadCategory, requireLocale } from "@/lib/server-data";
import { createPageMetadata, seoCopy } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string; categoryId: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: requestedLocale, categoryId } = await params;
  const locale = requireLocale(requestedLocale);
  const category = await loadCategory(locale, categoryId);
  const locales = await contentLocales(locale, categoryId, loadCategory);
  return createPageMetadata({
    locale, path: `/activities/category/${category.id}`,
    title: category.category_name,
    description: `${category.category_name}. ${seoCopy(locale).pages.activities.description}`, locales,
  });
}

export default async function ActivityCategoryPage({ params }: Props) {
  const { locale: requestedLocale, categoryId } = await params;
  const locale = requireLocale(requestedLocale);
  const category = await loadCategory(locale, categoryId);
  const activities = await loadActivities(locale, category.id);
  return (
    <ServerHydration queries={[{ queryKey: ["activities", locale, category.id], data: activities }]}>
      <JsonLd data={breadcrumbSchema(locale, [
        { name: seoCopy(locale).pages.activities.title, path: "/activities" },
        { name: category.category_name, path: `/activities/category/${category.id}` },
      ])} />
      <Activities categoryId={category.id} categoryName={category.category_name} />
    </ServerHydration>
  );
}
