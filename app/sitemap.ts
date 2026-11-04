import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/features/i18n/routing";
import { indexingEnabled, languageAlternates, localizedUrl, staticRoutes } from "@/lib/seo";
import { loadActivities, loadCategories, loadMedia, loadResults } from "@/lib/server-data";

// Generate at request time so builds do not depend on the API being awake.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!indexingEnabled()) return [];

  const paths = new Map<string, Set<Locale>>(
    Object.values(staticRoutes).map((path) => [path, new Set(routing.locales)]),
  );
  const content = await Promise.all(routing.locales.map(async (locale) => {
    const [media, activities, results, categories] = await Promise.all([
      loadMedia(locale), loadActivities(locale), loadResults(locale), loadCategories(locale),
    ]);
    return { locale, paths: [
      ...media.map((item) => `/media/${item.id}`),
      ...activities.map((item) => `/activities/${item.id}`),
      ...results.map((item) => `/results/${item.id}`),
      ...categories.map((item) => `/activities/category/${item.id}`),
    ] };
  }));

  // If an upstream request fails, fail the response instead of publishing a
  // successful but incomplete sitemap that drops previously indexed content.
  for (const entry of content) {
    for (const path of entry.paths) {
      const locales = paths.get(path) ?? new Set<Locale>();
      locales.add(entry.locale);
      paths.set(path, locales);
    }
  }

  return [...paths].flatMap(([path, locales]) => [...locales].map((locale) => ({
    url: localizedUrl(locale, path),
    alternates: { languages: languageAlternates(path, [...locales]) },
    // The API has publication dates, not modification dates; do not invent lastmod.
  })));
}
