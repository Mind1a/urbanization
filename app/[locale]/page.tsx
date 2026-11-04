import Landing from "@/features/landing/components/Landing";
import ServerHydration from "@/features/query/ServerHydration";
import { loadSlider, requireLocale } from "@/lib/server-data";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo";

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return staticPageMetadata(requireLocale(locale), "home");
}

export default async function Home({ params }: LocalePageProps) {
  const locale = requireLocale((await params).locale);
  const slides = await loadSlider(locale);
  return (
    <ServerHydration queries={[{ queryKey: ["slider", locale], data: slides }]}>
      <Landing />
    </ServerHydration>
  );
}
