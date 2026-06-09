/**
 * Configuration for next-intl. This file is required so that the runtime
 * (and the plugin) can validate locales and load the correct translations.
 *
 * See https://next-intl.dev/docs/getting-started/app-router#configuration
 */

/** @type {import('next-intl').Config} */
const config = {
  locales: ["en", "ka"],
  defaultLocale: "en",
};

export default config;
