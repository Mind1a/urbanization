"use client";

import { useTranslations } from "next-intl";

export default function BlogsError({ reset }: { reset: () => void }) {
  const t = useTranslations("blogs");
  return (
    <div role="alert" className="mx-auto max-w-7xl px-6 py-16 text-center md:px-8">
      <h1 className="text-2xl font-bold text-[#1E1E1E]">{t("loadError")}</h1>
      <button onClick={reset} className="mt-6 cursor-pointer rounded-full bg-[#ED6502] px-6 py-3 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED6502]">{t("retry")}</button>
    </div>
  );
}
