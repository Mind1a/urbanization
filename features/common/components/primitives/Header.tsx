"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ArrowIcon from "@/icons/arrow.svg"

type SubLinks = {
  id: string
  label: string
  href: string
}

type LinkDataType = {
  id: string
  label: string,
  href?: string
  icon?: string
  subLinks?: SubLinks[]
}

const LINKS_DATA: LinkDataType[] = [
  {
    id: "home",
    label: "home",
    href: "/"
  },

  {
    id: "about",
    label: "about us",
    href: "/about"
  },

  {
    id: "project",
    label: "our project",
    icon: "/icons/arrow.svg",
    subLinks: [
      {
        id: "p-desc",
        label: "description",
        href: "/project/description"
      },
      {
        id: "p-mission",
        label: "mission/main questions",
        href: "/project/mission-main-questions"
      },
      {
        id: "p-method",
        label: "methodology",
        href: "/project/methodology"
      }
    ]
  },

  {
    id: "team",
    label: "team",
    icon: "/icons/arrow.svg",
    subLinks: [
      {
        id: "t-nana",
        label: "nana zazanashvili",
        href: "/team/nana-zazanashvili"
      },
      {
        id: "t-ia",
        label: "ia kupatadze",
        href: "/team/ia-kupatadze"
      },
      {
        id: "t-andro",
        label: "andro mindiashvili",
        href: "/team/andro-mindiashvili"
      },
      {
        id: "t-ana",
        label: "ana khibaia",
        href: "/team/ana-khibaia"
      },
      {
        id: "t-tornike",
        label: "tornike larajuli",
        href: "/larajuli"
      }
    ]
  },
  {
    id: "result",
    label: "results",
    icon: "/icons/arrow.svg",
    subLinks: [
      {
        id: "r-grouth",
        label: "urban growth",
        href: "/result/growth"
      },
      {
        id: "r-block",
        label: "block transformation",
        href: "/resut/block-transformation"
      },
      {
        id: "r-housing",
        label: "housing typologies",
        href: "/result/typologies"
      }
    ]
  },
  {
    id: "activities",
    label: "activities",
    icon: "/icons/arrow.svg",
    subLinks: [
      {
        id: "a-seminars",
        label: "seminars",
        href: "/activities/seminars"
      },
      {
        id: "a-discussions",
        label: "discussions",
        href: "/activities/discussions"
      },
      {
        id: "a-exhibitions",
        label: "exhibitions",
        href: "/activities/exhibitions"
      },
      {
        id: "a.presentations",
        label: "presentations",
        href: "/activities/presentations"
      }
    ]
  },
  {
    id: "media",
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
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const getCleanPathname = (path: string) => {
    if (!path) return "/"

    return path.replace(/^\/(en|ka)/, "") || "/"
  }

  const cleanPathname = getCleanPathname(pathname);

  const toggleSubMenu = (id: string) => {
    setIsOpenSubLinks(prev => prev === id ? null : id)
  }


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 0) {
        setIsVisible(true)
        return
      }

      setIsVisible(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)

  }, [lastScrollY])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setIsOpenSubLinks(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  return (
    <header className={`bg-white
      fixed
      left-0
      w-full
      transition-transform duration-300
      z-50
      ${isVisible ? "translate-y-0" : "-translate-y-full"}
      px-6
      pt-6
      md:px-8
      md:pt-8
      xl:pt-5
      xl:px-20
      `}>
      <div ref={boxRef} className="max-w-7xl mx-auto  flex items-center justify-between">
        <Link href={'/'} className="outline-none">
          <Image width={100} height={100} src={'/images/logo/logo.svg'} alt="Website logo" className="w-11 h-11 md:w-18 md:h-18 xl:w-20 xl:h-20" />
        </Link>

        {/* Mobile nav bar  */}
        <nav className={`fixed xl:hidden w-full top-0 ${isOpenNavMenu ? "translate-x-0" : "translate-x-full"}
         transition-all
          duration-300
           ease-in-out
            left-0
            flex flex-col
            h-screen
            overflow-y-auto
            justify-start
             items-center
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
                <li key={link.id} className="py-2.5 w-full pr-6 text-black capitalize">
                  {
                    link.subLinks ? (
                      <button onClick={() => toggleSubMenu(link.id)} className={`text-[16px] w-full flex items-center justify-between leading-6 capitalize cursor-pointer ${isOpenSubLinks === link.id ? "text-[#ED6502]" : "text-[#1E1E1E]"}`}>
                        {link.label}
                        {link.icon && <Image className={`${isOpenSubLinks === link.id ? "rotate-180" : "rotate-0"} transition-all xl:hidden duration-200 ease`} width={14} height={14} src={link.icon} alt="" />}
                      </button>
                    ) : (
                      <Link onClick={() => {

                        setIsOpenSubLinks(null)
                      }} href={link.href || "/"} className={`text-[16px] flex items-center justify-between leading-6 ${cleanPathname === link.href ? "text-[#ED6502] font-bold" : "text-[#1E1E1E] font-normal"}`}>
                        {link.label}
                      </Link>
                    )
                  }
                  {
                    link.subLinks && (
                      <div className={`grid transition-all w-full  duration-300 ease-in-out ${isOpenSubLinks === link.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <ul className="overflow-hidden w-full pl-3">
                          {
                            link.subLinks.map(subLink => (
                              <li key={subLink.id} className="py-2.5 w-full  pr-6 text-black capitalize">
                                <Link onClick={() => {
                                  setIsOpenNavMenu(false)
                                  setIsOpenSubLinks(null)
                                }} href={subLink.href} className={`w-full ${cleanPathname === subLink.href ? "text-[#ED6502] font-bold" : "text-[#1E1E1E] font-normal"}`}>
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
        <nav className="hidden xl:flex items-center justify-between">
          <ul className="flex items-center gap-2">
            {
              LINKS_DATA.map(link => (
                <li key={link.label} className="py-3 px-6  ">
                  {
                    link.subLinks ? (
                      <button onClick={() => toggleSubMenu(link.id)} className={`capitalize ${isOpenSubLinks === link.id ? "text-[#ED6502]" : "text-[#1E1E1E]"}  relative group text-[18px] leading-6  tracking-[4%] cursor-pointer`}>
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
                                      ${isOpenSubLinks === link.id ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2"}
                                      `}>
                          {
                            link.subLinks.map(subLink => (
                              <li key={subLink.id} className=" w-full">
                                <Link  href={subLink.href} className="block w-full text-left p-2.5  hover:bg-[#ED6502] hover:text-white transition-colors text-[16px] leading-5.5">
                                  {
                                    subLink.label
                                  }
                                </Link>
                              </li>
                            ))
                          }
                        </ul>
                      </button>
                    ) : (
                      <Link onClick={() => {
                        setIsOpenNavMenu(false)
                        setIsOpenSubLinks(null)
                      }} href={link.href || "/"} className={`capitalize text-[18px] leading-6 tracking-[4%] ${cleanPathname === link.href ? "text-[#ED6502] font-bold" : "text-[#1E1E1E] font-normal"}`}>
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
          <button onClick={() => setLang(prev => prev === "eng" ? "geo" : "eng")} className="w-12.75 h-11 md:w-14.75 md:h-12 xl:w-16.25 xl:h-20 capitalize xl:font-medium xl:text-[18px] xl:leading-6 xl:px-4 xl:py-7 cursor-pointer">
            {lang}
          </button>
          <button
            onClick={() => setIsOpenNavMenu(prev => !prev)}
            className="relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center z-50 xl:hidden"
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
