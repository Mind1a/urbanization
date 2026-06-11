"use client"
import { div } from "motion/react-client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"


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

  const toggleSubMenu = (label: string) => {
    setIsOpenSubLinks(prev => prev === label ? null : label)
  }
  return (
    <header className="bg-white  w-full pt-2 xl:pt-5 ">
     <div className="max-w-7xl mx-auto p-6 flex items-center justify-between">
        <Link href={'/'}>
          <Image width={100} height={100} src={'/images/logo/logo.svg'} alt="Website logo" className="w-11 h-11" />
        </Link>
     {/* Change Lang & Nav drop menu */}
     <div className="flex items-center">
        <button  className="py-2.5 px-3 capitalize">eng</button>
      <button className="py-3.5 px-3">
            <Image width={21} height={16} src={'images/logo/nav_drop_menu.svg'} alt="Navigation dro menu icon" />
      </button>
     </div>
     </div>

      <nav className="absolute w-full top-0 hidden left-0 flex items-center justify-center h-full bg-[#ffffff6b] backdrop-blur-2xl">
        <ul className="w-full h-full flex  flex-col mt-22 p-6  gap-2">
          {
            LINKS_DATA.map(link => (
              <li key={link.label} className="py-2.5 w-full pr-6 text-black capitalize">
                {
                  link.subLinks ? (
                    <button onClick={() => toggleSubMenu(link.label)} className="text-[16px] w-full flex items-center justify-between leading-6 capitalize">
                      {link.label}
                      {link.icon && <Image width={14} height={14} src={link.icon} alt="" />}
                      </button>
                  ) : (
                      <Link href={link.href || ""} className={`text-[16px] flex items-center justify-between leading-6`}>
                        {link.label}
                      </Link>
                  )
                }
                {
                  link.subLinks &&  (
                    <div className={`grid transition-all w-full  duration-300 ease-in-out ${isOpenSubLinks === link.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <ul className="overflow-hidden w-full">
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

    </header>
  )
}

export default Header
