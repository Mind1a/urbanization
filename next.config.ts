import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const apiBaseUrl = process.env.NEXT_PUBLIC_URBAN_API_URL?.trim();

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_URBAN_API_URL is not configured.");
}

const apiUrl = new URL(apiBaseUrl);

if (apiUrl.protocol !== "http:" && apiUrl.protocol !== "https:") {
  throw new Error("NEXT_PUBLIC_URBAN_API_URL must use HTTP or HTTPS.");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: apiUrl.protocol.slice(0, -1) as "http" | "https",
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: `${apiUrl.pathname.replace(/\/+$/, "")}/static/**`,
      },
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, /url/],
        }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  // ...other config
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./features/i18n/request.ts",
});

// make sure we wrap the configuration so the plugin can inject the
// required runtime support and locate the next-intl config file
export default withNextIntl(nextConfig);
