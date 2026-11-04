import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/features/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { seoCopy } from "@/lib/seo";
import { loadCategories, loadResults } from "@/lib/server-data";
import ServerHydration from "@/features/query/ServerHydration";
import JsonLd from "@/features/seo/JsonLd";
import { websiteSchema } from "@/lib/structured-data";
import Footer from "@/features/common/components/primitives/Footer";
import Header from "../../features/common/components/primitives/Header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const copy = seoCopy(locale);
  return {
    title: { default: copy.title, template: `%s | ${copy.title}` },
    description: copy.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // params is now asynchronous due to Next.js 15+ behavior
  params: Promise<{ locale: string }>;
}) {
  // unwrap the promise before accessing its properties to satisfy the
  // "Dynamic APIs are Asynchronous" requirement described in the error
  const { locale } = await params;

  // make sure the incoming locale is one of the supported locales;
  // otherwise we should trigger a 404 so Next.js doesn't continue
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // inform next-intl of the current request locale. this is especially
  // important if we later enable static rendering for these routes
  setRequestLocale(locale);

  const messages = await getMessages();
  const navigation = await Promise.allSettled([loadResults(locale), loadCategories(locale)]);
  const queries = [
    { queryKey: ["results-menu", locale], data: navigation[0].status === "fulfilled" ? navigation[0].value : undefined },
    { queryKey: ["activity-categories", locale], data: navigation[1].status === "fulfilled" ? navigation[1].value : undefined },
  ];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ServerHydration queries={queries}>
        <JsonLd data={websiteSchema(locale)} />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 pt-[96px] xl:pt-[132px] md:pt-[128px]">
            {children}
          </main>
          <Footer />
        </div>
      </ServerHydration>
    </NextIntlClientProvider>
  );
}
