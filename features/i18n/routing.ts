import { defineRouting } from "next-intl/routing";

import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ka"],

  defaultLocale: "en",
  // Page metadata checks the API before advertising translated detail URLs.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
