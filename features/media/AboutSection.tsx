"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutSection() {
  const t = useTranslations("media");
  return (
    <div className="mx-auto max-w-7xl w-full my-9 md:mb-6 lg:mb-8 ">
      <h1 className="text-[16px] md:text-[24px] lg:text-[32px] font-bold text-[#1E1E1E] mb-4">
        {t("title")}
      </h1>

      <p className="text-[14px] md:text-[18px] lg:text-[20px] text-[#1E1E1E] leading-relaxed ">
        {t("description")}
      </p>
    </div>
  );
}
