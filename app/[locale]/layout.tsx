import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/features/i18n/routing";
import { notFound } from "next/navigation";
import Footer from "@/features/common/components/primitives/Footer";
import Header from "../../features/common/components/primitives/Header";

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

  return (
    <NextIntlClientProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 px-6 pt-6 md:px-8 md:pt-8 xl:pt-5 xl:px-20">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
