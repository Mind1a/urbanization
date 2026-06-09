import { useTranslations } from "next-intl";
import Link from "next/link";

const NotFound = () => {
  const t = useTranslations(`notFound`);
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-dvh text-center font-[Noto bold] ">
        <span className=" font-bold text-[140px] leading-40 opacity-25 mb-6">
          404
        </span>
        <h1 className="mb-4 text-[32px] font-bold font-[Nato bold] leading-[40px] ">
          {t(`title`)}
        </h1>
        <p className="max-w-120 mb-6 font-[Nato regular] leading-7 text-[#475569]">
          {t(`paragraph`)}
        </p>
        <Link
          href="/"
          className="text-[#4E876D] underline font-[Nato bold] font-bold leading-7"
        >
          {t(`link`)}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
