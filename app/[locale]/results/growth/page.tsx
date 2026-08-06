"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Page() {
  const [isActiveYear, setIsActiveYear] = useState("1950")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="px-6 pt-6 md:px-8 md:pt-8 xl:pt-5 xl:px-20">
      <div className='max-w-7xl mx-auto md:py-5 lg:py-9'>

        {isLoading ? (
          <div className="h-5 md:h-11 lg:h-10 max-w-105 lg:max-w-2xl bg-gray-200 rounded-2xl animate-pulse mb-1" />
        ) : (
          <h2 className='font-bold text-left text-[16px] leading-5 max-w-105 lg:max-w-full md:text-[24px] md:leading-11 lg:text-[32px] lg:leading-10'>
            Transformation of Saburtalo District from 1950s till today
          </h2>
        )}

        {isLoading ? (
          <div className="w-full lg:h-165 md:h-72 h-47 bg-gray-200 rounded-2xl animate-pulse mt-4" />
        ) : (
          <Image width={100} height={100} src={'/images/results/growth.svg'} alt="Saburtalo district growth chart" priority className="w-full lg:h-165 md:h-72 h-47 object-contain" />
        )}

        <div className="flex items-center w-full mb-9 mt-6 justify-between sm:justify-start gap-3">
          {isLoading ? (
            ["1950", "1960", "1980"].map(year => (
              <div key={year} className="lg:px-5.25 lg:py-3 md:py-2.5 md:px-5.75 px-5.5 py-3.5 rounded-full bg-gray-200 animate-pulse w-16 h-11" />
            ))
          ) : (
            ["1950", "1960", "1980"].map(year => (
              <button
                aria-pressed={isActiveYear === year}
                key={year}
                onClick={() => setIsActiveYear(year)}
                className={`lg:px-5.25 lg:py-3 md:py-2.5 md:px-5.75 px-5.5 py-3.5 ${isActiveYear === year ? "bg-[#ED6502] text-white" : "border text-[#1E1E1E] border-[#1E1E1E]"} rounded-full cursor-pointer text-[14px] leading-5 md:text-[18px] md:leading-7 lg:text-[20px] lg:leading-6`}
              >
                {year}
              </button>
            ))
          )}
        </div>

        {isLoading ? (
          <div className="h-5 w-24 bg-gray-200 rounded-2xl animate-pulse" />
        ) : (
          <Link href={'/'} className="underline text-[14px] leading-5 md:text-[16px] md:leading-6 lg:leading-8 text-[#1E1E1E99]">
            Download PDF
          </Link>
        )}

        {isLoading ? (
          <div className="mt-6 mb-11 lg:mt-9 max-w-302 space-y-2">
            <div className="h-4 bg-gray-200 rounded-2xl animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded-2xl animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded-2xl animate-pulse w-5/6" />
            <div className="h-4 bg-gray-200 rounded-2xl animate-pulse w-3/4" />
          </div>
        ) : (
          <p className="text-[14px] md:text-[18px] md:leading-7 leading-5 lg:text-[20px] lg:leading-8 text-[#1E1E1E] mt-6 mb-11 lg:mt-9 max-w-302">
            This is a sample text about the development and urban expansion of the Saburtalo district in Tbilisi. Saburtalo has evolved into one of the city&apos;s most active and rapidly developing areas, combining residential, commercial, and educational functions. The district has experienced significant urban growth, transforming from a suburban landscape into a dense metropolitan environment. Major avenues such as Pekini, Vazha-Pshavela, and Kazbegi serve as key structural axes of its development. Modern residential complexes and business centers continue to reshape its skyline. Today, Saburtalo represents a balanced example of ongoing urbanization within Tbilisi.
          </p>
        )}
      </div>
    </div>
  )
}
