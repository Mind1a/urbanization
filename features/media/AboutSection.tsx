import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Hero Image */}
      <div className="rounded-2xl overflow-hidden">
        <Image
          src="/images/media/media-hero-img.png"
          alt="Saburtalo district"
          width={1200}
          height={600}
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>

      {/* Headline */}
      <h1 className="mt-6 text-[20px] md:text-[28px] lg:text-[36px] font-bold text-[#1E1E1E]">
        Headline
      </h1>

      {/* Description */}
      <p className="mt-4 text-[13px] md:text-[16px] lg:text-[18px] text-[#1E1E1E] leading-relaxed">
        Lorem ipsum dolor sit amet consectetur. Ipsum egestas convallis sed
        fusce. Placerat nulla ac nisi eget ante. Eu mattis massa sit ultrices
        urna sapien sodales sit erat. Consectetur odio non potenti pellentesque
        vulputate semper. Dis libero nisi sollicitudin pellentesque cum lectus.
        Fermentum amet bibendum dictumst aliquet nulla a hendrerit in odio. In
        eget orci lacinia sed leo neque at sit. Dictum varius sed sagittis
        integer laoreet. Vitae cras id eget dui at amet sagittis. Facilisis id
        sapien ullamcorper eu faucibus diam quam. Lacus lorem vulputate in cras
        placerat sit scelerisque lobortis aenean.
      </p>
    </div>
  );
}
