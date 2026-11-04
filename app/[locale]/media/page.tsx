import AboutSection from "@/features/media/AboutSection";
import Articles from "@/features/media/Articles";
import ServerHydration from "@/features/query/ServerHydration";
import { loadMedia, requireLocale } from "@/lib/server-data";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo";

export async function generateMetadata({ params }: LocalePageProps) {
  return staticPageMetadata(requireLocale((await params).locale), "media");
}

export default async function MediaPage({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const articles = await loadMedia(locale);
  return (
    <ServerHydration queries={[{ queryKey: ["media", locale], data: articles }]}>
      <div className="px-6 md:px-8 xl:px-20 mb-8 md:mb-10 lg:mb-16">
        <AboutSection />
        <Articles />
      </div>
    </ServerHydration>
  );
}
