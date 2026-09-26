import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutProject() {
  const t = useTranslations("aboutProject");
  const methodology = [
    { src: "/images/aboutProject/second.png", text: t("method1") },
    { src: "/images/aboutProject/third.png", text: t("method2") },
    { src: "/images/aboutProject/fourth.png", text: t("method3") },
  ];

  return (
    <div className="mx-auto w-full bg-white px-[24px] pb-[40px] text-[#202020] sm:max-w-[744px] sm:px-[32px] sm:pb-[60px] lg:max-w-[1440px] lg:px-[80px] lg:pb-[80px]">
      <section className="flex flex-col gap-[16px] py-[12px] sm:gap-[20px] sm:py-[20px] lg:gap-[36px] lg:py-[36px]">
        <h1 className="text-[16px] font-bold leading-[20px] sm:text-[24px] sm:leading-[44px] lg:text-[32px] lg:leading-[40px]">
          {t("title")}
        </h1>

        <div className="flex flex-col gap-[12px] sm:gap-[16px]">
          <Image
            src="/images/aboutProject/first.png"
            alt={t("imageAlt")}
            width={1280}
            height={472}
            className="h-[164px] w-full rounded-[16px] object-cover sm:h-[364px] sm:rounded-[24px] lg:h-[472px]"
            priority
          />

          <div className="text-[14px] leading-[22px] sm:text-[18px] sm:leading-[28px] lg:text-[20px] lg:leading-[32px]">
            <div className="text-[14px] font-bold leading-[18px] sm:text-[20px] sm:leading-[24px] lg:text-[20px] lg:leading-[32px]">
              <p>{t("projectName")}</p>
              <p>{t("subtitle")}</p>
            </div>

            {["intro1", "intro2", "intro3", "intro4"].map((key) => (
              <p key={key} className="mt-[12px] sm:mt-[16px] lg:mt-[24px]">
                {t(key as "intro1" | "intro2" | "intro3" | "intro4")}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-[16px] flex flex-col gap-[12px] py-[12px] sm:mt-[20px] sm:py-[20px] lg:mt-[36px] lg:gap-[16px] lg:py-[36px]">
        <h2 className="text-[16px] font-bold leading-[20px] sm:text-[24px] sm:leading-[44px] lg:text-[32px] lg:leading-[40px]">
          {t("missionTitle")}
        </h2>
        <p className="text-[14px] leading-[22px] sm:text-[18px] sm:leading-[28px] lg:text-[20px] lg:leading-[32px]">
          {t("missionBody")}
        </p>
      </section>

      <section className="mt-[16px] flex flex-col gap-[16px] py-[12px] sm:mt-[20px] sm:gap-[20px] sm:py-[20px] lg:mt-[36px] lg:gap-[36px] lg:py-[36px]">
        <h2 className="text-[16px] font-bold leading-[20px] sm:text-[24px] sm:leading-[44px] lg:text-[32px] lg:leading-[40px]">
          {t("methodologyTitle")}
        </h2>

        {methodology.map(({ src, text }) => (
          <div key={src} className="flex flex-col gap-[8px] sm:flex-row sm:items-start sm:gap-[20px] lg:gap-[36px]">
            <Image
              src={src}
              alt={t("methodImageAlt")}
              width={416}
              height={260}
              className="h-[164px] w-full rounded-[16px] object-cover sm:h-[160px] sm:w-[248px] sm:shrink-0 lg:h-[260px] lg:w-[416px] lg:rounded-[24px]"
            />
            <p className="text-[12px] leading-[18px] sm:flex-1 sm:text-[16px] sm:leading-[24px] lg:text-[20px] lg:leading-[32px]">
              {text}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
