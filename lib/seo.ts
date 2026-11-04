import type { Metadata } from "next";
import { routing, type Locale } from "@/features/i18n/routing";
import en from "@/features/i18n/messages/en.json";
import ka from "@/features/i18n/messages/ka.json";

const configuredUrl = new URL(process.env.SITE_URL || "https://saburtalo.iliauni.edu.ge");
if (!["https:", "http:"].includes(configuredUrl.protocol) || configuredUrl.username || configuredUrl.password) {
  throw new Error("SITE_URL must be a public HTTP(S) origin without credentials.");
}

export const siteUrl = configuredUrl.origin;
export const publisherName = "Ilia State University";
export const staticRoutes = {
  home: "",
  about: "/about",
  project: "/aboutProject",
  team: "/team",
  activities: "/activities",
  media: "/media",
  privacy: "/privacy-policy",
  cookies: "/cookies",
  terms: "/terms-of-use",
} as const;

export type StaticPage = keyof typeof staticRoutes;
export type LocalePageProps = { params: Promise<{ locale: string }> };
export type DetailPageProps = { params: Promise<{ locale: string; id: string }> };

export function seoCopy(locale: Locale) {
  return (locale === "ka" ? ka : en).metadata;
}

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function localizedUrl(locale: Locale, path = "") {
  return absoluteUrl(`/${locale}${path}`);
}

export function languageAlternates(path: string, locales: readonly Locale[] = routing.locales) {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [locale, localizedUrl(locale, path)]),
  );
  if (locales.includes(routing.defaultLocale)) {
    languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  }
  return languages;
}

export function indexingEnabled() {
  return process.env.SEO_NOINDEX !== "true" &&
    process.env.NODE_ENV === "production" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
}

export function robotsMetadata(): Metadata["robots"] {
  const index = indexingEnabled();
  return {
    index,
    follow: true,
    googleBot: {
      index,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function plainText(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/\s+/g, " ").trim();
}

export function summarize(value: string, limit = 160) {
  const text = plainText(value);
  if (text.length <= limit) return text;
  const excerpt = text.slice(0, limit - 1);
  const lastSpace = excerpt.lastIndexOf(" ");
  return `${excerpt.slice(0, lastSpace > limit * 0.6 ? lastSpace : excerpt.length).trimEnd()}…`;
}

export function distinguishTitle(item: { id: number; title: string }, collection: { title: string }[], label: string) {
  const title = plainText(item.title);
  const duplicates = collection.filter((entry) => plainText(entry.title) === title);
  return duplicates.length > 1 ? `${title} (${label} ${item.id})` : title;
}

export function apiAssetUrl(path: string | null | undefined) {
  if (!path) return undefined;
  const base = process.env.NEXT_PUBLIC_URBAN_API_URL?.trim().replace(/\/+$/, "");
  return `${base}/static/${path.replace(/^\/+/, "")}`;
}

export function isoDate(value: string | undefined) {
  if (!value) return undefined;
  // The API's dates have no offset; keep calendar dates without inventing a timezone.
  const date = /^\d{4}-\d{2}-\d{2}/.exec(value)?.[0];
  if (!date) return undefined;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(date) ? date : undefined;
}

type PageMetadataOptions = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  article?: { publishedTime?: string; author?: string };
  locales?: readonly Locale[];
};

export function createPageMetadata({ locale, path, title, description, image, article, locales }: PageMetadataOptions): Metadata {
  const copy = seoCopy(locale);
  const fullTitle = path ? `${plainText(title)} | ${copy.title}` : copy.pages.home.title;
  const summary = summarize(description || copy.description);
  const url = localizedUrl(locale, path);
  const socialImage = image
    ? { url: image, alt: plainText(title) }
    : { url: absoluteUrl("/og"), width: 1200, height: 630, alt: copy.pages.home.title };

  return {
    title: { absolute: fullTitle },
    description: summary,
    alternates: { canonical: url, languages: languageAlternates(path, locales) },
    robots: robotsMetadata(),
    openGraph: {
      type: article ? "article" : "website",
      title: fullTitle,
      description: summary,
      url,
      siteName: copy.title,
      locale: locale === "ka" ? "ka_GE" : "en_US",
      alternateLocale: (locales ?? routing.locales)
        .filter((other) => other !== locale)
        .map((other) => other === "ka" ? "ka_GE" : "en_US"),
      images: [socialImage],
      ...(article ? { publishedTime: article.publishedTime, authors: article.author ? [article.author] : undefined } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: summary, images: [socialImage] },
  };
}

export function staticPageMetadata(locale: Locale, page: StaticPage) {
  const copy = seoCopy(locale).pages[page];
  return createPageMetadata({ locale, path: staticRoutes[page], ...copy });
}
