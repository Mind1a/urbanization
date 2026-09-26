"use client";

import { motion } from "motion/react";
import { Locale, routing, usePathname, useRouter } from "@/features/i18n/routing";

type Props = {
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({ defaultValue, label }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const variants = {
    [routing.locales[0]]: { x: "0%" },
    [routing.locales[1]]: { x: "100%" },
  };

  function changeLocale(nextLocale: Locale) {
    if (nextLocale === defaultValue) return;

    router.replace(`${pathname}${window.location.search}`, { locale: nextLocale });
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="relative flex min-h-10 w-[92px] rounded-full border border-[#64748B] bg-[#F1F5F9] p-1 sm:w-[104px]"
    >
      <motion.div
        className="absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full border border-[#CBD5E1] bg-white shadow-sm"
        variants={variants}
        initial={false}
        animate={defaultValue}
        transition={{ ease: "easeInOut", duration: 0.15 }}
      />

      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => changeLocale(locale)}
          lang={locale}
          aria-pressed={locale === defaultValue}
          className={`relative z-10 flex min-h-8 w-1/2 cursor-pointer items-center justify-center rounded-full text-sm text-[#1E293B] ${locale === defaultValue ? "font-bold" : "font-normal"}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
