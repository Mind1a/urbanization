import { staticPageMetadata, type LocalePageProps } from "@/lib/seo";
import { requireLocale } from "@/lib/server-data";
import AboutProject from "@/features/aboutProject/aboutProject";

const AboutProjectPage = () => {
  return <AboutProject />;
};

export default AboutProjectPage;

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return staticPageMetadata(requireLocale(locale), "project");
}
