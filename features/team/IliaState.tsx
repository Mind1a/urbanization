import Image from "next/image";

export default function IliaState() {
  return (
    <div
      className="px-6
      md:px-8
      xl:px-20"
    >
      <section className="max-w-7xl mx-auto pt-[44px] pb-[44px] sm:pt-[56px] sm:pb-[60px] lg:pt-[32px] lg:pb-[100px]">
        <h2 className="py-[16px] sm:py-[20px] lg:py-[36px] text-[16px] md:text-[24px] lg:text-[32px] font-bold tracking-tight text-[#1E1E1E]">
          Ilia State University
        </h2>

        {/* University Photo */}
        <div className="relative w-full aspect-342/188 sm:aspect-600/288 md:aspect-680/288 lg:aspect-1280/472 rounded-2xl overflow-hidden mb-3 sm:mb-4 lg:mb-6">
          <Image
            src="/images/team/ilia.jpg"
            alt="Ilia State University building in Tbilisi, Georgia"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>

        {/* Description */}
        <p className="text-[14px] sm:text-[18px] lg:text-[20px] text-[#1E1E1E] leading-relaxed mb-4 lg:mb-9">
          Located in Tbilisi, Georgia, Ilia State University (ISU) is one of the
          leading public research and higher education institutions in the South
          Caucasus. Established in 2006 through the merger of six different
          academic institutions, it has quickly grown into a flagship for
          scientific advancement and modern education.
        </p>

        {/* Visit Website link */}
        <a
          href="https://iliauni.edu.ge"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-[14px] sm:text-[18px] lg:text-[20px] text-[#1E1E1E] hover:text-[#ED6502] transition-all duration-300 group"
        >
          Visit Website
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#1E1E1E] group-hover:text-[#ED6502] transition-all duration-300 group-hover:rotate-45"
          >
            <path
              d="M8 24L24 8M24 20V8H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>
    </div>
  );
}
