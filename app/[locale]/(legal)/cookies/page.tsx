import { useTranslations } from "next-intl";

const Cookies = () => {
  const t = useTranslations("cookiesPolicy");
  return (
    <section
      aria-labelledby="cookies-heading"
      className="mx-[24px] mt-0 mb-[32px] md:mx-[32px] md:mb-[40px] lg:mx-[80px] lg:mt-[32px] lg:mb-[64px] flex justify-center items-center"
    >
      <div className="max-w-[1280px] w-full">
        <h1
          id="cookies-heading"
          className="font-bold text-[16px] md:text-[24px] lg:text-[32px] mt-[12px] mb-[16px] md:my-[20px] lg:my-[36px]"
        >
          {t("title")}
        </h1>

        <p className="text-[14px] md:text-[18px] lg:text-[20px] mb-2 md:mb-4 lg:mb-8 leading-5 md:leading-7 lg:leading-8">
          {t("intro")}
        </p>

        <p className="text-[14px] md:text-[18px] lg:text-[20px] mb-2 md:mb-4 lg:mb-8 leading-5 md:leading-7 lg:leading-8">
          <strong>{t("useLabel")}</strong> {t("useBody")}
        </p>

        <p className="text-[14px] md:text-[18px] lg:text-[20px] mb-2 md:mb-4 lg:mb-8 leading-5 md:leading-7 lg:leading-8">
          <strong>{t("trackingLabel")}</strong> {t("trackingBody")}
        </p>

        <p className="text-[14px] md:text-[18px] lg:text-[20px] mb-2 md:mb-4 lg:mb-9">
          <strong>{t("choiceLabel")}</strong> {t("choiceBody")}
        </p>
      </div>
    </section>
  );
};

export default Cookies;
