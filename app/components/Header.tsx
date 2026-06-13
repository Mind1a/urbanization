"use client"
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
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const toggleSubMenu = (label: string) => {
    setIsOpenSubLinks(prev => prev === label ? null : label)
  }


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if(currentScrollY <= 0) {
        setIsVisible(true)
        return
      }

      if(currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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
    <header className={`bg-white
      fixed
      left-0
      w-full
      transition-transform duration-300
      z-50
      ${isVisible ? "translate-y-0" : "-translate-y-full"}
      px-[24px]
      pt-[24px]
      md:px-[32px]
      md:pt-[32px]
      xl:pt-[20px]
      xl:px-[80px]
      `}>
      <div ref={boxRef} className="max-w-7xl mx-auto  flex items-center justify-between">
        <Link href={'/'} className="outline-none">
          <Image width={100} height={100} src={'/images/logo/logo.svg'} alt="Website logo" className="w-11 h-11 md:w-[72px] md:h-[72px] xl:w-20 xl:h-20" />
        </Link>

        {/* Mobile nav bar  */}
        <nav className={`fixed xl:hidden w-full top-0 ${isOpenNavMenu ? "translate-x-0" : "translate-x-full"}
         transition-all
          duration-300
           ease-in-out
            left-0 flex
            h-screen
             items-center
              justify-center
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
                    <button onClick={() => toggleSubMenu(link.label)} className={`text-[16px] w-full flex items-center justify-between leading-6 capitalize cursor-pointer ${isOpenSubLinks === link.label ? "text-[#ED6502]" : "text-[#1E1E1E]"}`}>
                      {link.label}
                      {link.icon && <Image className={`${isOpenSubLinks === link.label ? "rotate-180" : "rotate-0"} transition-all xl:hidden duration-200 ease`} width={14} height={14} src={link.icon} alt="" />}
                    </button>
                  ) : (
                      <Link href={link.href || "/"} className={`text-[16px] flex items-center justify-between leading-6 ${pathname === link.href ? "text-[#ED6502] font-bold" : "text-[#1E1E1E] font-normal"}`}>
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
                              <Link href={subLink.href} className={`w-full ${pathname === subLink.href ? "text-[#ED6502] font-bold" : "text-[#1E1E1E] font-normal"}`}>
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
                      <div onClick={() => toggleSubMenu(link.label)} className={`capitalize ${isOpenSubLinks === link.label ? "text-[#ED6502]" : "text-[#1E1E1E]"}  relative group text-[18px] leading-6  tracking-[4%] cursor-pointer`}>
                        {link.label}

                        <ul className={`absolute
                           left-0
                            shadow-xl
                             duration-200
                             w-[235px]

                               top-10
                                   bg-white
                                     rounded-xl
                                     text-[#1E1E1E]
                                      overflow-hidden
                                      ${isOpenSubLinks === link.label ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2"}
                                      `}>
                          {
                            link.subLinks.map(subLink => (
                              <li key={subLink.label} className=" w-full">
                                <Link href={subLink.href} className="block w-full p-[10px]  hover:bg-[#ED6502] hover:text-white transition-colors text-[16px] leading-[22px]">
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
                      <Link href={link.href || "/"} className={`capitalize text-[18px] leading-6 tracking-[4%] ${pathname === link.href ? "text-[#ED6502] font-bold" : "text-[#1E1E1E] font-normal"}`}>
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
          <button onClick={() => setLang(prev => prev === "eng" ? "geo" : "eng")} className="w-[51px] h-[44px] md:w-[59px] md:h-[48px] xl:w-[65px] xl:h-[80px] capitalize xl:font-medium xl:text-[18px] xl:leading-6 xl:px-4 xl:py-[28px] cursor-pointer">
            {lang}
          </button>
          <button
            onClick={() => setIsOpenNavMenu(prev => !prev)}
            className="relative w-[44px] h-[44px] md:w-[48px] md:h-[48px] flex items-center justify-center z-50 xl:hidden"
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
