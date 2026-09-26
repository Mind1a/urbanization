import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/features/i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");
  const tHeader = useTranslations("header");

  return (
    <footer className="bg-[#535353] px-6 pt-6 md:px-8 md:pt-8 xl:px-20 xl:pt-5">
      <div className="mx-auto max-w-7xl pb-3 pt-5">
        <div className="flex flex-col gap-8 pb-8 sm:flex-row sm:justify-between md:pb-11 xl:pb-16">
          <Link href="/" className="w-fit" aria-label={tHeader("home")}>
            <Image
              width={100}
              height={100}
              src="/images/logo/logo_light.svg"
              alt=""
              className="h-18 w-18 md:h-25 md:w-25 xl:h-30 xl:w-30"
            />
          </Link>

          <nav aria-label={t("explore")} className="flex flex-wrap gap-x-12 gap-y-6 text-white md:gap-x-24 xl:gap-x-40">
            <div>
              <h2 className="text-sm font-bold md:text-base xl:text-xl">{t("explore")}</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm md:text-base xl:text-lg">
                <li><Link href="/aboutProject">{tHeader("project")}</Link></li>
                <li><Link href="/team">{tHeader("team")}</Link></li>
                <li><Link href="/activities">{tHeader("activities")}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-bold md:text-base xl:text-xl">{t("contact.title")}</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm md:text-base xl:text-lg">
                <li><a href="tel:+995322220009">(+995 32) 222 00 09</a></li>
                <li><a href="mailto:info@iliauni.edu.ge">info@iliauni.edu.ge</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="-mx-6 h-0.5 bg-[#6B6B6B52] md:-mx-8 md:h-1 xl:-mx-20" />
      <div className="mx-auto max-w-7xl pb-3 md:pb-5">
        <div className="flex flex-col-reverse items-center gap-2 pt-3 text-center text-xs leading-4 text-[#FFFFFF99] md:flex-row md:justify-between md:pt-5 md:text-left md:text-sm md:leading-5">
          <p>© {new Date().getFullYear()} {t("copyright")}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-7">
            <Link href="/privacy-policy">{t("docs.privacy")}</Link>
            <Link href="/cookies">{t("docs.cookies")}</Link>
            <Link href="/terms-of-use">{t("docs.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
