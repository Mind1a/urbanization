import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto w-[343px] py-6 md:w-[680px] xl:w-[1280px]">
        <p className="mb-3 hidden text-[14px] text-[#1E1E1E99] md:block">
          Activities
          <span className="mx-2">/</span>
          <span className="text-[#1E1E1E]">Typologies of Transformation</span>
        </p>

        <picture>
          <source media="(min-width: 1280px)" srcSet="/Rectangledesktop.svg" />

          <Image
            src="/Rectanglee.svg"
            alt="Typologies of Transformation"
            width={680}
            height={364}
            priority
            className="
              block
              h-[188px]
              w-[343px]
              rounded-[16px]
              object-cover
              md:h-[364px]
              md:w-[680px]
              md:rounded-[24px]
              xl:h-[472px]
              xl:w-[1280px]
            "
          />
        </picture>
      </section>
    </main>
  );
}
