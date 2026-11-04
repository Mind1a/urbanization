import type { Locale } from "@/features/i18n/routing";
import { absoluteUrl, isoDate, localizedUrl, plainText, publisherName, seoCopy, siteUrl, summarize } from "./seo";

export function websiteSchema(locale: Locale) {
  const copy = seoCopy(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        "@id": `${siteUrl}/#publisher`,
        name: publisherName,
        url: "https://iliauni.edu.ge/",
        logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo/logo.svg") },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: copy.pages.home.title,
        description: copy.description,
        inLanguage: ["en", "ka"],
        publisher: { "@id": `${siteUrl}/#publisher` },
      },
    ],
  };
}

export function breadcrumbSchema(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: locale === "ka" ? "მთავარი" : "Home", path: "" },
      ...items,
    ].map((item, index) => ({
      "@type": "ListItem", position: index + 1,
      name: plainText(item.name), item: localizedUrl(locale, item.path),
    })),
  };
}

export function contentSchema({ locale, path, title, description, image, date, author, type = "Article", pdf }: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  date?: string;
  author?: string;
  type?: "Article" | "CreativeWork";
  pdf?: string;
}) {
  const url = localizedUrl(locale, path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#content`,
    ...(type === "Article" ? { headline: plainText(title) } : {}),
    name: plainText(title),
    description: summarize(description),
    url,
    mainEntityOfPage: url,
    inLanguage: locale,
    image,
    datePublished: isoDate(date),
    author: author ? { "@type": "Person", name: author } : undefined,
    publisher: { "@id": `${siteUrl}/#publisher` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    encoding: pdf ? { "@type": "MediaObject", contentUrl: pdf, encodingFormat: "application/pdf" } : undefined,
  };
}
