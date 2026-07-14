import Image from "next/image";
import localFont from "next/font/local";

const helvetica = localFont({
  src: "../../../public/font/Helvetica.ttf",
  display: "swap",
});
function AuthorCard() {
  return (
    <div className="relative h-110 w-[342px] overflow-hidden rounded-2xl md:h-auto md:w-[240px] md:rounded-[24px] xl:w-[295px]">
      <Image
        src="/Rectangle.png"
        alt="Andreas Lechner"
        width={416}
        height={360}
        priority
        className="h-[392px] w-full object-cover object-[center_10%] md:h-[264px] md:object-top xl:h-[448px] xl:object-center"
      />

      <div className="absolute bottom-0 left-0 w-full bg-[linear-gradient(180deg,#4A4A4A_0%,#1E1E1E_100%)] px-[20px] py-[12px] md:static md:h-[72px] md:py-0 xl:absolute xl:h-[88px] xl:py-0">
        <div className="flex h-full flex-col justify-center">
          <h3 className="text-[20px] font-bold leading-[24px] text-white md:text-[16px] md:leading-[20px] xl:text-[20px] xl:leading-[24px]">
            Andreas Lechner
          </h3>

          <p className="mt-[4px] text-[16px] leading-[20px] text-white/80 md:text-[12px] md:leading-[16px] xl:text-[18px] xl:leading-[20px]">
            Architect, Educator & Writer
          </p>
        </div>
      </div>
    </div>
  );
}

type ActivityProps = {
  activity: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
};

export default function ActivityDetails({ activity }: ActivityProps) {
  return (
    <main className={`${helvetica.className} min-h-screen bg-white`}>
      <section className="mx-auto w-[343px] py-6 md:w-[680px] xl:w-[1280px]">
        <p className="mb-3 hidden text-[14px] leading-[20px] text-[#1E1E1E99] md:block">
          Activities
          <span className="mx-2">/</span>
          <span className="text-[#1E1E1E]">{activity.title}</span>
        </p>

        <picture>
          <source media="(min-width: 1280px)" srcSet="/Rectangledesktop.svg" />

          <Image
            src={activity.image}
            alt="Typologies of Transformation"
            width={1280}
            height={472}
            priority
            className="block h-[188px] w-[343px] rounded-[16px] object-cover md:h-[364px] md:w-[680px] md:rounded-[24px] xl:h-[472px] xl:w-[1280px]"
          />
        </picture>

        <h1 className="mt-[16px] w-[342px] text-[24px] leading-[32px] text-[#1E1E1E] md:mt-[20px] md:w-[680px] md:text-[32px] md:leading-[40px] xl:mt-[36px] xl:w-[1280px] xl:text-[48px] xl:leading-[56px]">
          Typologies of Transformation
        </h1>

        <div className="mt-[16px] flex w-[342px] flex-col gap-[8px] md:mt-[20px] md:w-[680px] md:gap-[16px] xl:mt-[36px] xl:w-[1280px]">
          <p className="text-[14px] leading-[20px] text-[#1E1E1E] md:text-[16px] md:leading-[28px] xl:text-[20px] xl:leading-[32px]">
            {activity.description}
          </p>

          <p className="text-[14px] leading-[20px] text-[#1E1E1E] md:text-[16px] md:leading-[28px] xl:text-[20px] xl:leading-[32px]">
            Here, the concept of Umbau German for “Transformation” reframes
            architectural reasoning and practice - extending beyond maintenance,
            technical renovation or adaptive reuse. It proposes a more nuanced
            dialogue with typology, historical continuity and material
            articulation that started with his 2021 “Thinking Design - Blueprint
            for an Architecture of Typology” Park Books: Zurich 2021.
          </p>

          <p className="text-[14px] leading-[20px] text-[#1E1E1E] md:text-[16px] md:leading-[28px] xl:text-[20px] xl:leading-[32px]">
            Structured around theoretical inquiry, topological analysis and
            drawing-based research, the talk invites to discern the latent
            spatial potentials - architectural affordance - embedded in existing
            structures. These affordance, understood as both ecological and
            cultural prompts, offer new ways of engaging with the resilience,
            adaptability and social intelligence of the built environment,
            ultimately repositioning “Umbau” not as a niche activity but as
            architecture’s disciplinary core - at once critical praxis and
            artistic endeavor.
          </p>
        </div>

        <section className="mt-[80px] w-[342px] md:mt-[88px] md:w-[680px] xl:mt-[96px] xl:w-[1280px]">
          <h2 className="text-[20px] font-bold leading-[24px] text-[#1E1E1E] md:text-[24px] md:leading-[32px] xl:text-[32px] xl:leading-[40px]">
            Biography of an Author
          </h2>

          <div className="mt-[20px] flex flex-col gap-[20px] md:hidden">
            <AuthorCard />

            <div className="space-y-[24px] text-[16px] leading-[26px] text-[#1E1E1E]">
              <p>
                Andreas Lechner is an architect, educator, and writer whose
                practice is rooted in contextually sensitive, research-driven
                design. He holds a PhD and a Master of Architecture from TU
                Graz, where he currently serves as Associate Professor at the
                Faculty of Architecture.
              </p>

              <p>
                Before founding Studio Andreas Lechner, he studied and worked
                with Pritzker Architecture Prize–winning architects, drawing on
                formative experiences in Los Angeles, Berlin, Vienna, and Tokyo.
              </p>

              <p>
                He is the author of the award-winning, based on his
                habilitation, and has held postdoctoral research positions at
                Università Iuav di Venezia and Royal Danish Academy in
                Copenhagen.
              </p>

              <p>
                Lechner lectures and teaches internationally, serves as a
                visiting professor at Politecnico di Milano, and leads the
                research group "Counterintuitive Typologies" supported by the
                Austrian Research Promotion Agency. He is also co-editor of GAM
                – Graz Architecture Magazine and of a forthcoming special issue
                of The Journal of Architecture.
              </p>
            </div>
          </div>

          <div className="mt-[20px] hidden md:block xl:hidden">
            <div className="grid grid-cols-[240px_416px] gap-x-[24px]">
              <AuthorCard />

              <div className="space-y-[24px] text-[18px] leading-[28px] text-[#1E1E1E]">
                <p>
                  Andreas Lechner is an architect, educator, and writer whose
                  practice is rooted in contextually sensitive, research-driven
                  design. He holds a PhD and a Master of Architecture from TU
                  Graz, where he currently serves as Associate Professor at the
                  Faculty of Architecture.
                </p>

                <p>
                  Before founding Studio Andreas Lechner, he studied and worked
                  with Pritzker Architecture Prize–winning architects, drawing
                  on formative experiences in Los Angeles, Berlin, Vienna, and
                  Tokyo.
                </p>
              </div>
            </div>

            <div className="mt-[20px] space-y-[24px] text-[18px] leading-[28px] text-[#1E1E1E]">
              <p>
                He is the author of the award-winning, based on his
                habilitation, and has held postdoctoral research positions at
                Università Iuav di Venezia and Royal Danish Academy in
                Copenhagen.
              </p>

              <p>
                Lechner lectures and teaches internationally, serves as a
                visiting professor at Politecnico di Milano, and leads the
                research group "Counterintuitive Typologies" supported by the
                Austrian Research Promotion Agency. He is also co-editor of GAM
                – Graz Architecture Magazine and of a forthcoming special issue
                of The Journal of Architecture.
              </p>
            </div>
          </div>

          <div className="mt-[36px] hidden xl:flex xl:gap-[36px]">
            <AuthorCard />

            <div className="w-[828px] space-y-[32px] text-[20px] leading-[32px] text-[#1E1E1E]">
              <p>
                Andreas Lechner is an architect, educator, and writer whose
                practice is rooted in contextually sensitive, research-driven
                design. He holds a PhD and a Master of Architecture from TU
                Graz, where he currently serves as Associate Professor at the
                Faculty of Architecture.
              </p>

              <p>
                Before founding Studio Andreas Lechner, he studied and worked
                with Pritzker Architecture Prize–winning architects, drawing on
                formative experiences in Los Angeles, Berlin, Vienna, and Tokyo.
                He is the author of the award-winning, based on his
                habilitation, and has held postdoctoral research positions at
                Università Iuav di Venezia and Royal Danish Academy in
                Copenhagen.
              </p>

              <p>
                Lechner lectures and teaches internationally, serves as a
                visiting professor at Politecnico di Milano, and leads the
                research group "Counterintuitive Typologies" supported by the
                Austrian Research Promotion Agency. He is also co-editor of GAM
                – Graz Architecture Magazine and of a forthcoming special issue
                of The Journal of Architecture.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
