"use client";

import { Locale, usePathname, useRouter } from "@/features/i18n/routing";

type Props = {
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({ defaultValue, label }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function changeLocale(nextLocale: Locale) {
    if (nextLocale === defaultValue) return;

    router.replace(`${pathname}${window.location.search}`, { locale: nextLocale });
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => changeLocale(defaultValue === "en" ? "ka" : "en")}
      className="w-12.75 h-11 md:w-14.75 md:h-12 xl:w-16.25 xl:h-20 capitalize xl:font-medium xl:text-[18px] xl:leading-6 xl:px-4 xl:py-7 cursor-pointer"
    >
      {defaultValue === "en" ? "eng" : "geo"}
    </button>
  );
}
