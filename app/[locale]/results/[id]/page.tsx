import ResultDetails from "@/features/results/components/ResultDetails";
import ServerHydration from "@/features/query/ServerHydration";
import JsonLd from "@/features/seo/JsonLd";
import { contentLocales, loadResult, requireLocale } from "@/lib/server-data";
import { apiAssetUrl, createPageMetadata, type DetailPageProps } from "@/lib/seo";
import { breadcrumbSchema, contentSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: DetailPageProps) {
  const { locale: requestedLocale, id } = await params;
  const locale = requireLocale(requestedLocale);
  const result = await loadResult(locale, id);
  const locales = await contentLocales(locale, id, loadResult);
  return createPageMetadata({
    locale, path: `/results/${result.id}`,
    title: result.title, description: result.timelines[0]?.description || result.title,
    image: apiAssetUrl(result.timelines[0]?.img), locales,
  });
}

export default async function ResultPage({ params }: DetailPageProps) {
  const { locale: requestedLocale, id } = await params;
  const locale = requireLocale(requestedLocale);
  const result = await loadResult(locale, id);
  const path = `/results/${result.id}`;
  return (
    <ServerHydration queries={[{ queryKey: ["result-details", locale, id], data: result }]}>
      <JsonLd data={contentSchema({
        locale, path, title: result.title,
        description: result.timelines[0]?.description || result.title,
        image: apiAssetUrl(result.timelines[0]?.img),
        pdf: apiAssetUrl(result.pdf), type: "CreativeWork",
      })} />
      <JsonLd data={breadcrumbSchema(locale, [{ name: result.title, path }])} />
      <ResultDetails id={id} />
    </ServerHydration>
  );
}
