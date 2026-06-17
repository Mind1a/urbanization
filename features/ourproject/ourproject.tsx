import Image from "next/image";

const OurProject = () => {
  return (
    <div className="mx-auto w-full max-w-[1440px] bg-white px-[80px] pb-[80px] text-[#202020]">
      <section className="flex flex-col gap-[36px] py-[36px]">
        <h1 className="text-[32px] font-bold leading-[40px]">
          About the Project
        </h1>

        <div className="flex flex-col gap-[16px]">
          <Image
            src="/images/ourproject/first.png"
            alt="Saburtalo district"
            width={1280}
            height={472}
            className="h-[472px] w-full rounded-[24px] object-cover"
            priority
          />

          <div className="text-[20px] leading-[32px]">
            <p className="font-bold">
              “Urban transformation of the Saburtalo district”
            </p>
            <p className="font-bold">
              Urban Transformation of Tbilisi through the Lens of Saburtalo
            </p>

            <p className="mt-[24px]">
              This project examines one of Tbilisi’s districts, Saburtalo, from
              urban, geographical, and architectural perspectives, focusing on
              its transformation from a peripheral settlement to a central
              district during the late 19th century through the 1990s, and its
              ongoing evolution today.
            </p>

            <p className="mt-[24px]">
              The urban development of Saburtalo reflects the broader political
              and socio-economic transformations of the country. Key stages in
              the district’s formation coincide with the Soviet period, during
              which shifting approaches shaped urban, architectural, and housing
              policies. These include the implementation of individual
              reconstruction projects in the 1920s; the development of Tbilisi’s
              first General Plan in the 1930s–40s, within the broader context of
              the socialist reconstruction of Soviet cities and early attempts to
              articulate a systematic vision for the area’s transformation into
              a residential district; and, from the 1950s onward, the expansion
              of mass housing construction.
            </p>

            <p className="mt-[24px]">
              Scholars of Tbilisi and Georgian Soviet architecture (L. Sumbadze
              and B. Lortkipanidze 1936; V. Beridze 1960; N. Janberidze 1971;
              T. Beridze 1977; T. Kintsurashvili 1978; N. Jashi 1983; T.
              Kvirkvelia 1985; V. Jaoshvili 1989; N. Asatiani 1989, 1992; I.
              Tsitsishvili; V. Vardosanidze 2009; Chanashvili 2019; Claire
              Kaiser 2024) provide valuable insights into the architectural and
              urban development of Tbilisi. However, their works do not focus in
              depth on individual city districts, and many aspects of
              Saburtalo’s formation process therefore remain insufficiently
              explored.
            </p>

            <p className="mt-[24px]">
              The project developed by our research team seeks to address this
              gap by examining: (1) the process of Saburtalo’s urban
              transformation from the late nineteenth century to the 1990s, and
              (2) the architectural characteristics and specificities of
              residential construction in the district.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-[36px] flex flex-col gap-[16px] py-[36px]">
        <h2 className="text-[32px] font-bold leading-[40px]">Our Mission</h2>

        <p className="text-[20px] leading-[32px]">
          This project examines the urban development of Saburtalo, one of
          Tbilisi&apos;s central districts, through spatial analysis, fieldwork,
          and archival research — including official resolutions, cartographic
          materials, aerial photographs, plans, and photo and video documents. By
          constructing a chronological narrative of the district&apos;s growth,
          the study aims to reveal how Saburtalo&apos;s structure and urban
          fabric have evolved over time. A particular focus is placed on the
          architectural characteristics of residential construction, exploring
          how residential typologies have both responded to and shaped the
          district&apos;s broader spatial transformation. The central research
          questions of the study are as follows: How did the urban structure of
          Saburtalo as a residential district evolve from the late nineteenth
          century to the 1990s? Taking Saburtalo as a case study, how did housing
          typologies change between the late nineteenth century and the 1990s?
          Which political and socio-economic processes shaped these
          transformations? Within which urban planning and architectural
          discourses did this transformation occur?
        </p>
      </section>

      <section className="mt-[36px] flex flex-col gap-[36px] py-[36px]">
        <h2 className="text-[32px] font-bold leading-[40px]">Methodology</h2>

        <div className="flex items-start gap-[36px]">
          <Image
            src="/images/ourproject/second.png"
            alt="Methodology archive"
            width={416}
            height={260}
            className="h-[260px] w-[416px] shrink-0 rounded-[24px] object-cover"
          />

          <p className="flex-1 text-[20px] leading-[32px]">
            At the initial stage of the research, a desk study and literature
            review will be conducted to examine professional literature.
            Simultaneously, archival work will involve collecting materials from
            various sources, such as the National Archives of Georgia.
          </p>
        </div>

        <div className="flex items-start gap-[36px]">
          <Image
            src="/images/ourproject/third.png"
            alt="Architectural archive"
            width={416}
            height={260}
            className="h-[260px] w-[416px] shrink-0 rounded-[24px] object-cover"
          />

          <p className="flex-1 text-[20px] leading-[32px]">
            the Archive of the Union of Georgian Architects, and private family
            archives of architects. This includes documents, maps, aerial
            photos, urban development plans, and photo and video materials. By
            organizing these materials, a spatial development analysis of the
            area will be performed,
          </p>
        </div>

        <div className="flex items-start gap-[36px]">
          <Image
            src="/images/ourproject/fourth.png"
            alt="Urban plan"
            width={416}
            height={260}
            className="h-[260px] w-[416px] shrink-0 rounded-[24px] object-cover"
          />

          <p className="flex-1 text-[20px] leading-[32px]">
            and graphical representations illustrating the chronological growth
            of the Saburtalo territory will be created. Building types will be
            identified through spatial development analysis and fieldwork.
            Relevant archival architectural projects will be retrieved,
            digitized using appropriate software, and systematically organized
            and analyzed.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OurProject;