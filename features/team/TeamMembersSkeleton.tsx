const TeamMembersSkeleton = () => {
  return (
    <div aria-hidden="true" className="px-6 md:px-8 xl:px-20">
      <section className="mx-auto max-w-7xl animate-pulse">
        {/* Header */}
        <div className="my-3 flex items-center justify-between sm:my-4 lg:my-9">
          <div className="h-6 w-36 rounded-md bg-gray-200 md:h-8 md:w-48 lg:h-10" />

          <div className="flex items-center gap-5">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="h-10 w-10 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Selected member */}
        <div className="mb-11 flex flex-col gap-4 xs:flex-row xs:gap-6 lg:mb-12 lg:gap-9">
          <div className="h-[392px] w-full shrink-0 rounded-2xl bg-gray-200 xs:h-[336px] xs:w-[240px] md:h-[400px] md:w-[300px] lg:h-[448px] lg:w-[416px]" />

          <div className="flex flex-1 flex-col gap-3">
            <div className="h-5 w-48 rounded bg-gray-200 sm:h-6 sm:w-64" />

            <div className="mt-3 h-5 w-56 rounded bg-gray-200 sm:h-6 sm:w-72" />

            <div className="mt-8 space-y-3 lg:mt-12">
              <div className="h-4 w-full rounded bg-gray-200 sm:h-5" />
              <div className="h-4 w-full rounded bg-gray-200 sm:h-5" />
              <div className="h-4 w-11/12 rounded bg-gray-200 sm:h-5" />
              <div className="h-4 w-4/5 rounded bg-gray-200 sm:h-5" />
              <div className="h-4 w-2/3 rounded bg-gray-200 sm:h-5" />
            </div>
          </div>
        </div>

        {/* Member thumbnails */}
        <div className="overflow-hidden">
          <div className="flex gap-5 lg:justify-between">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="shrink-0 overflow-hidden rounded-2xl">
                <div className="aspect-square w-[164px] rounded-2xl bg-gray-200 sm:w-[152px] lg:w-[236px]" />

                <div className="space-y-2 bg-white px-2 py-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamMembersSkeleton;
