"use client";
import Image from "next/image";
import { Link, usePathname } from "@/features/i18n/routing";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useResultsMenu } from "@/features/results/hooks/useResultsMenu";
import { useActivityCategories } from "@/features/activities/hooks/useActivityCategories";
import LocaleSwitcher from "@/features/i18n/LocaleSwitcher";

type SubLinks = {
  id: string;
  label: string;
  href: string;
};

type LinkDataType = {
  id: "home" | "project" | "team" | "results" | "activities" | "media";
  href?: string;
  icon?: string;
  subLinks?: SubLinks[];
};

const LINKS_DATA: LinkDataType[] = [
  {
    id: "home",
    href: "/",
  },
  {
    id: "project",
    href: "/aboutProject",
  },
  {
    id: "team",
    href: "/team",
  },
  {
    id: "results",
    icon: "/icons/arrow.svg",
    subLinks: [],
  },
  {
    id: "activities",
    icon: "/icons/arrow.svg",
    subLinks: [],
  },
  {
    id: "media",
    href: "/media",
  },
];

const Header = () => {
  const pathname = usePathname();
  const [isOpenSubLinks, setIsOpenSubLinks] = useState<string | null>(null);
  const [isOpenNavMenu, setIsOpenNavMenu] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const locale = useLocale();
  const tHeader = useTranslations("header");
  const tActivities = useTranslations("activities");
  const { data: results = [] } = useResultsMenu(locale);
  const { data: activityCategories = [] } = useActivityCategories(locale);

  const resultSubLinks: SubLinks[] = results.map((result) => ({
    id: String(result.id),
    label: result.title,
    href: `/results/${result.id}`,
  }));

  const activitySubLinks: SubLinks[] = [
    {
      id: "all-activities",
      label: tActivities("allActivities"),
      href: "/activities",
    },
    ...activityCategories.map((category) => ({
      id: `activity-category-${category.id}`,
      label: category.category_name,
      href: `/activities/category/${category.id}`,
    })),
  ];

  const linksData = LINKS_DATA.map((link) =>
    link.id === "results"
      ? {
          ...link,
          subLinks: resultSubLinks,
        }
      : link.id === "activities"
        ? { ...link, subLinks: activitySubLinks }
        : link,
  );

  const getCleanPathname = (path: string) => {
    if (!path) return "/";

    return path.replace(/^\/(en|ka)/, "") || "/";
  };

  const cleanPathname = getCleanPathname(pathname);

  const toggleSubMenu = (id: string) => {
    setIsOpenSubLinks((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsVisible(true);
        return;
      }

      setIsVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setIsOpenSubLinks(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`bg-white
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
      `}
    >
      <div
        ref={boxRef}
        className="max-w-7xl mx-auto  flex items-center justify-between"
      >
        <Link href={"/"} className="outline-none">
          <Image
            width={100}
            height={100}
            src={"/images/logo/logo.svg"}
            alt={tHeader("home")}
            className="w-11 h-11 md:w-18 md:h-18 xl:w-20 xl:h-20"
          />
        </Link>

        {/* Mobile nav bar  */}
        <nav
          className={`fixed xl:hidden w-full top-0 ${
            isOpenNavMenu ? "translate-x-0" : "translate-x-full"
          }
         transition-all
          duration-300
           ease-in-out
            left-0
            flex flex-col
            h-screen

            overflow-y-auto
            justify-start
             items-center
                bg-[#ffffff]/20
                 backdrop-blur-2xl

                 `}
        >
          <ul
            className="w-full
         h-full
          flex
          flex-col
           mt-10
            p-6
            gap-2
            "
          >
            {linksData.map((link) => (
              <li
                key={link.id}
                className="py-2.5 w-full pr-6 text-black capitalize"
              >
                {link.subLinks ? (
                  <button
                    onClick={() => toggleSubMenu(link.id)}
                    className={`text-[16px] w-full flex items-center justify-between leading-6 capitalize cursor-pointer ${
                      isOpenSubLinks === link.id
                        ? "text-[#ED6502]"
                        : "text-[#1E1E1E]"
                    }`}
                  >
                    {tHeader(link.id)}
                    {link.icon && (
                      <Image
                        className={`${
                          isOpenSubLinks === link.id ? "rotate-180" : "rotate-0"
                        } transition-all xl:hidden duration-200 ease`}
                        width={14}
                        height={14}
                        src={link.icon}
                        alt=""
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    onClick={() => {
                      setIsOpenSubLinks(null);
                    }}
                    href={link.href || "/"}
                    className={`text-[16px] flex items-center justify-between leading-6 ${
                      cleanPathname === link.href
                        ? "text-[#ED6502] font-bold"
                        : "text-[#1E1E1E] font-normal"
                    }`}
                  >
                    {tHeader(link.id)}
                  </Link>
                )}
                {link.subLinks && (
                  <div
                    className={`grid transition-all w-full duration-300 ease-in-out ${
                      isOpenSubLinks === link.id
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <ul className="overflow-hidden w-full pl-3">
                      {link.subLinks.map((subLink) => (
                        <li
                          key={subLink.id}
                          className="py-2.5 w-full pr-6 text-black capitalize"
                        >
                          <Link
                            onClick={() => {
                              setIsOpenNavMenu(false);
                              setIsOpenSubLinks(null);
                            }}
                            href={subLink.href}
                            className={`block w-full break-words whitespace-normal ${
                              cleanPathname === subLink.href
                                ? "text-[#ED6502] font-bold"
                                : "text-[#1E1E1E] font-normal"
                            }`}
                          >
                            {subLink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Desktop navbar */}
        <nav className="hidden xl:flex items-center justify-between">
          <ul className="flex items-center gap-2">
            {linksData.map((link) => (
              <li key={link.id} className="py-3 px-6">
                {link.subLinks ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleSubMenu(link.id)}
                      className={`capitalize ${
                        link.subLinks.some(
                          (subLink) => subLink.href === cleanPathname,
                        )
                          ? "text-[#ED6502]"
                          : isOpenSubLinks === link.id
                            ? "text-[#ED6502]"
                            : "text-[#1E1E1E]"
                      }  text-[18px] leading-6 tracking-[4%] cursor-pointer`}
                    >
                      <span className="inline-grid">
                        <span
                          className={`[grid-area:1/1] ${
                            link.subLinks.some(
                              (subLink) => subLink.href === cleanPathname,
                            )
                              ? "font-bold"
                              : "font-normal"
                          }`}
                        >
                          {tHeader(link.id)}
                        </span>
                        <span
                          aria-hidden="true"
                          className="invisible font-bold [grid-area:1/1]"
                        >
                          {tHeader(link.id)}
                        </span>
                      </span>
                    </button>
                    <ul
                      className={`absolute
                           left-0
                            shadow-xl
                            shadow-black/4
                            text-[18px]
                             duration-200
                             w-[360px] max-w-[calc(100vw-2rem)]
                              leading-6 tracking-[4%]
                              capitalize
                               top-10
                                   bg-white
                                     rounded-xl
                                     text-[#1E1E1E]
                                      max-h-[min(70vh,400px)] overflow-y-auto
                                      ${
                                        isOpenSubLinks === link.id
                                          ? "opacity-100 pointer-events-auto translate-y-0"
                                          : "opacity-0 pointer-events-none translate-y-2"
                                      }
                                      `}
                    >
                      {link.subLinks.map((subLink) => (
                        <li key={subLink.id} className=" w-full">
                          <Link
                            href={subLink.href}
                            onClick={() => setIsOpenSubLinks(null)}
                            className="block w-full break-words whitespace-normal text-left p-2.5 hover:text-[#ED6502] transition-colors text-[16px] leading-5.5"
                          >
                            {subLink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    onClick={() => {
                      setIsOpenNavMenu(false);
                      setIsOpenSubLinks(null);
                    }}
                    href={link.href || "/"}
                    className={`capitalize text-[18px] leading-6 tracking-[4%] ${
                      cleanPathname === link.href
                        ? "text-[#ED6502]"
                        : "text-[#1E1E1E]"
                    }`}
                  >
                    <span className="inline-grid">
                      <span
                        className={`[grid-area:1/1] ${cleanPathname === link.href ? "font-bold" : "font-normal"}`}
                      >
                        {tHeader(link.id)}
                      </span>
                      <span
                        aria-hidden="true"
                        className="invisible font-bold [grid-area:1/1]"
                      >
                        {tHeader(link.id)}
                      </span>
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Change Lang & Nav drop menu */}
        <div className="flex items-center">
          <LocaleSwitcher />
          <button
            onClick={() => setIsOpenNavMenu((prev) => !prev)}
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
  );
};

export default Header;
