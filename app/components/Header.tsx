"use client"
import { div, li } from "motion/react-client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"


type SubLinks = {
  label: string
  href: string
}

type LinkDataType = {
  label: string,
  href?: string
  icon?: string
  subLinks?: SubLinks[]
}

const LINKS_DATA: LinkDataType[] = [
  {
    label: "home",
    href: "/en"
  },

  {
    label: "about us",
    href: "/about"
  },

  {
    label: "our project",
    icon: "images/logo/arrow.svg",
    subLinks: [
      {
        label: "description",
        href: "/"
      },
      {
        label: "mission/main questions",
        href: "/"
      },
      {
        label: "methodology",
        href: "/"
      }
    ]
  },

  {
    label: "team",
    icon: "images/logo/arrow.svg",
    subLinks: [
      {
        label: "nana zazanashvili",
        href: "/"
      },
      {
        label: "ia kupatadze",
        href: "/"
      },
      {
        label: "andro mindiashvili",
        href: "/"
      },
      {
        label: "ana khibaia",
        href: "/"
      },
      {
        label: "tornike larajuli",
        href: "/"
      }
    ]
  },
  {
    label: "results",
    icon: "images/logo/arrow.svg",
    subLinks: [
      {
        label: "urban growth",
        href: "/"
      },
      {
        label: "block transformation",
        href: "/"
      },
      {
        label: "housing typologies",
        href: "/"
      }
    ]
  },
  {
    label: "activities",
    icon: "images/logo/arrow.svg",
    subLinks: [
      {
        label: "seminars",
        href: "/"
      },
      {
        label: "discussions",
        href: "/"
      },
      {
        label: "exhibitions",
        href: "/"
      },
      {
        label: "presentations",
        href: "/"
      }
    ]
  },
  {
    label: "media",
    href: "/media"
  }
]

const Header = () => {
  const pathname = usePathname()
  const [lang, setLang] = useState("eng")
  const [isOpenSubLinks, setIsOpenSubLinks] = useState<string | null>(null)
  const [isOpenNavMenu, setIsOpenNavMenu] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  const toggleSubMenu = (label: string) => {
    setIsOpenSubLinks(prev => prev === label ? null : label)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setIsOpenSubLinks(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  return (
    <header className="bg-white  w-full pt-2 ">
      <div ref={boxRef} className="max-w-7xl mx-auto p-6 flex items-center justify-between">
        <Link href={'/'}>
          <Image width={100} height={100} src={'/images/logo/logo.svg'} alt="Website logo" className="w-11 h-11 md:w-18 md:h-18 lg:w-20 lg:h-20" />
        </Link>

        {/* Mobile nav bar  */}
        <nav className={`fixed lg:hidden w-full top-0 ${isOpenNavMenu ? "translate-x-0" : "translate-x-full"}
         transition-all
          duration-300
           ease-in-out
            left-0 flex
             items-center
              justify-center
               h-full
                bg-[#ffffff6b]
                 backdrop-blur-2xl
                 `}>
          <ul className="w-full
         h-full
          flex
          flex-col
           mt-22
            p-6
            gap-2
            ">
          {
            LINKS_DATA.map(link => (
              <li key={link.label} className="py-2.5 w-full pr-6 text-black capitalize">
                {
                  link.subLinks ? (
                    <button onClick={() => toggleSubMenu(link.label)} className="text-[16px] w-full flex items-center justify-between leading-6 capitalize">
                      {link.label}
                      {link.icon && <Image className={`${isOpenSubLinks === link.label ? "rotate-180" : "rotate-0"} transition-all lg:hidden duration-200 ease`} width={14} height={14} src={link.icon} alt="" />}
                    </button>
                  ) : (
                      <Link href={link.href || "/"} className={`text-[16px] flex items-center justify-between leading-6`}>
                        {link.label}
                      </Link>
                  )
                }
                {
                  link.subLinks && (
                    <div className={`grid transition-all w-full  duration-300 ease-in-out ${isOpenSubLinks === link.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <ul className="overflow-hidden w-full pl-3">
                        {
                          link.subLinks.map(subLink => (
                            <li key={subLink.label} className="py-2.5 w-full  pr-6 text-black capitalize">
                              <Link href={subLink.href} className="w-full">
                                {subLink.label}
                              </Link>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  )
                }
              </li>
            ))
          }
        </ul>
      </nav>
        {/* Desktop navbar */}
        <nav className="hidden lg:block">
          <ul className="flex items-center justify-between">
            {
              LINKS_DATA.map(link => (
                <li key={link.label} className="py-3 px-6">
                  {
                    link.subLinks ? (
                      <div onClick={() => toggleSubMenu(link.label)} className={`capitalize ${isOpenSubLinks === link.label ? "text-[#ED6502]" : "text-[#1E1E1E]"}  relative group text-[18px] leading-6  tracking-[4%] cursor-pointer`}>
                        {link.label}

                        <ul className={`absolute
                           left-0
                            shadow-xl
                             duration-200
                              w-58.75
                               top-10
                                   bg-white
                                     rounded-xl
                                     text-[#1E1E1E]
                                      overflow-hidden
                                      ${isOpenSubLinks === link.label ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2"}
                                      `}>
                          {
                            link.subLinks.map(subLink => (
                              <li key={subLink.label} className=" w-full text-nowrap p-2.5 hover:bg-[#ED6502]  hover:text-white">
                                <Link href={subLink.href} className=" block w-full ">
                                    {
                                      subLink.label
                                    }
                                </Link>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    ) : (
                      <Link href={link.href || "/"} className={` capitalize text-[18px] leading-6 tracking-[4%] ${pathname === link.href ? "text-[#ED6502] font-bold" : "text-[#1E1E1E] font-normal"}`}>
                        {link.label}
                      </Link>
                    )
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        {/* Change Lang & Nav drop menu */}
        <div className="flex items-center">
          <button onClick={() => setLang(prev => prev === "eng" ? "geo" : "eng")} className="py-2.5 px-3 capitalize lg:font-medium lg:text-[18px] lg:leading-6 lg:px-4 lg:py-7">
            {lang}
          </button>
          <button
            onClick={() => setIsOpenNavMenu(prev => !prev)}
            className="relative w-11 h-11 flex items-center justify-center z-50 lg:hidden"
          >
            <span
              className={`
      absolute w-6 h-0.5 bg-black rounded
      transition-all duration-300
      ${isOpenNavMenu ? "rotate-45" : "-translate-y-2"}
    `}
            />

            <span
              className={`
      absolute w-6 h-0.5 bg-black rounded
      transition-all duration-300
      ${isOpenNavMenu ? "opacity-0" : "opacity-100"}
    `}
            />

            <span
              className={`
      absolute w-6 h-0.5 bg-black rounded
      transition-all duration-300
      ${isOpenNavMenu ? "-rotate-45" : "translate-y-2"}
    `}
            />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
