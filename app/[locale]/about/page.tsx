import { staticPageMetadata, type LocalePageProps } from "@/lib/seo";
import { requireLocale } from "@/lib/server-data";
import AboutLab from "@/features/aboutUs/components/AboutLab";

const page = () => {
  return (
    <div>
      <AboutLab />
    </div>
  );
};

export default page;

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  return staticPageMetadata(requireLocale(locale), "about");
}
