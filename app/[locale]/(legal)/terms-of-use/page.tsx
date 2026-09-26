import { useTranslations } from "next-intl";

const TermsOfUsePage = () => {
  const t = useTranslations("termsOfUse");
  return (
    <section
      aria-labelledby="terms-heading"
      className="mx-[24px] mt-0 mb-[32px] md:mx-[32px] md:mb-[40px] lg:mx-[80px] lg:mt-[32px] lg:mb-[64px] flex justify-center items-center"
    >
      <div className="max-w-[1280px] w-full">
        <h1
          id="terms-heading"
          className="font-bold text-[16px] md:text-[24px] lg:text-[32px] mt-[12px] mb-[16px] md:my-[20px] lg:my-[36px]"
        >
          {t("title")}
        </h1>

        <div className="mb-3 md:mb-5 lg:mb-8">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            {t("ownershipTitle")}
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            {t("ownershipBody")}
          </p>
        </div>

        <div className="mb-3 md:mb-5 lg:mb-8">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            {t("permittedTitle")}
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            {t("permittedBody")}
          </p>
          <ul className="list-disc pl-8 text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            <li>
              {t("attribution")}
            </li>

            <li>
              {t("nonCommercial")}
            </li>
          </ul>
        </div>

        <div className="mb-3 md:mb-5 lg:mb-8">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            {t("natureTitle")}
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            {t("natureBody")}
          </p>
          <ul className="list-disc pl-7 text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            <li>
              {t("historicalAccuracy")}
            </li>
            <li>
              {t("noLegalStanding")}
            </li>
          </ul>
        </div>

        <div className="mb-3 md:mb-5 lg:mb-9">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            {t("contactTitle")}
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            {t("contactBody")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfUsePage;
