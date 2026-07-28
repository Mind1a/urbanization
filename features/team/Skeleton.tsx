export default function Skeleton() {
  return (
    <div className="px-6 md:px-8 xl:px-20 animate-pulse">
      {/* 1. TeamMembers Section Skeleton */}
      <section className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between my-3 sm:my-4 lg:my-9">
          <div className="h-6 md:h-8 lg:h-10 w-48 bg-gray-200 rounded-md" />
          <div className="flex items-center gap-5">
            <div className="w-[40px] h-[40px] bg-gray-200 rounded-full" />
            <div className="w-[40px] h-[40px] bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Selected Member Detail Skeleton */}
        <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 lg:gap-9 mb-11 lg:mb-12">
          {/* Main Photo Placeholder */}
          <div className="relative h-[392px] xs:h-[336px] md:h-[400px] lg:h-[448px] w-full xs:w-[240px] md:w-[300px] lg:w-[416px] shrink-0 rounded-2xl bg-gray-200 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-gray-300/60 backdrop-blur-md px-5 py-3 flex items-center justify-between">
              <div className="space-y-2 w-2/3">
                <div className="h-5 lg:h-6 bg-gray-400 rounded w-3/4" />
                <div className="h-4 lg:h-5 bg-gray-400/70 rounded w-1/2" />
              </div>
              <div className="w-8 h-8 bg-gray-400 rounded-full shrink-0" />
            </div>
          </div>

          {/* Info Details Placeholder */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="h-5 sm:h-6 lg:h-7 bg-gray-200 rounded w-1/3" />
            <div className="h-5 sm:h-6 lg:h-7 bg-gray-200 rounded w-1/2 mt-1" />
            <div className="space-y-3 mt-8 lg:mt-12">
              <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-full" />
              <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-11/12" />
              <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-4/5" />
            </div>
          </div>
        </div>

        {/* Thumbnails Strip Skeleton */}
        <div className="overflow-hidden">
          <div className="flex gap-5 lg:justify-between">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="shrink-0 w-[164px] sm:w-[152px] lg:w-[236px]"
              >
                <div className="w-full aspect-1/1 bg-gray-200 rounded-2xl" />
                <div className="bg-white/90 px-2 py-1.5 w-full space-y-2 mt-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. IliaState Section Skeleton */}
      <section className="max-w-7xl mx-auto pt-[44px] pb-[44px] sm:pt-[56px] sm:pb-[60px] lg:pt-[32px] lg:pb-[100px]">
        {/* Title Placeholder */}
        <div className="py-[16px] sm:py-[20px] lg:py-[36px]">
          <div className="h-6 md:h-8 lg:h-10 w-56 bg-gray-200 rounded-md" />
        </div>

        {/* University Photo Placeholder */}
        <div className="w-full aspect-342/188 sm:aspect-600/288 md:aspect-680/288 lg:aspect-1280/472 rounded-2xl bg-gray-200 mb-3 sm:mb-4 lg:mb-6" />

        {/* Description Lines Placeholder */}
        <div className="space-y-3 mb-4 lg:mb-9">
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-full" />
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-11/12" />
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-4/5" />
        </div>

        {/* Visit Website Link Placeholder */}
        <div className="h-6 lg:h-7 w-36 bg-gray-200 rounded-md" />
      </section>
    </div>
  );
}
