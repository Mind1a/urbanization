import Image from "next/image";
import { introBlocks } from "../data/data";

const AboutHero = () => {
  return (
    <section className="lg:max-w-7xl w-full lg:h-223 md:max-w-170 md:h-180 max-w-85.5 h-132 flex flex-col justify-center my-auto">
      <h2 className="font-bold lg:text-[32px] md:text-2xl text-base leading-5 md:leading-11 lg:leading-10 text-[#1E1E1E] lg:mb-9 md:mb-5 mb-4">
        The Architecture and Urban Studies Laboratory
      </h2>
      <div className="w-full space-y-6">
        <Image
          src={"/images/about/png/Hero.png"}
          alt="მთავარი სურათი"
          width={1280}
          height={472}
          className="max-w-85.5 max-h-47 md:max-w-170 md:max-h-91 lg:max-w-7xl lg:max-h-118 w-full"
        />

        {introBlocks.map((block) => (
          <div key={block.id} className="space-y-2 md:space-y-4">
            <h3 className="font-bold lg:text-2xl lg:leading-8 md:text-xl md:leading-6 text-[15px] leading-5">
              {block.heading}
            </h3>
            <p className="text-[14px] leading-5 md:text-[18px] md:leading-7 lg:text-[20px] lg:leading-8">
              {block.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutHero;
