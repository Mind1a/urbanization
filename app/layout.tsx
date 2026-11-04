import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/features/query/QueryProvider";
import localFont from "next/font/local"

import { Toaster } from "react-hot-toast";
import { getLocale } from "next-intl/server";
import { robotsMetadata, siteUrl } from "@/lib/seo";


const helvetica = localFont({
  variable: "--font-helvetica",
  display: "swap",
  src: [
    {
      path: "../public/font/Helvetica.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/font/Helvetica-Bold.ttf",
      weight: "700",
      style: "normal"
    },
  ]
})



export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Saburtalo Urban Transformation",
  title: "Saburtalo Urban Transformation | Ilia State University",
  description: "Research on the urban and architectural transformation of Saburtalo, Tbilisi, at Ilia State University.",
  robots: robotsMetadata(),
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [{ url: "/images/logo/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${helvetica.variable}`}>
      <body>
        <QueryProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#4E876D",
                color: "#fff",
              },
              success: {
                iconTheme: {
                  primary: "#fff",
                  secondary: "#4E876D",
                },
              },
              error: {
                style: {
                  background: "#ef4444",
                  color: "#fff",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#ef4444",
                },
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
