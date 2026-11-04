# SEO configuration and verification

The production origin is `https://saburtalo.iliauni.edu.ge`. English and Georgian pages use `/en` and `/ka`. Set `SITE_URL` only if the production origin changes; it must be an absolute HTTP(S) URL. `.env.example` lists the supported variables.

Every public route defines its own title, description, canonical, language alternates, Open Graph and Twitter card. Detail metadata comes from the same request-cached API data as the page. Alternate detail URLs are advertised only when that translation exists. `x-default` points to the English version when available. Query strings do not create new canonical URLs. Next.js normalizes trailing slashes.

If multiple media or activity records have the same API title, their metadata adds a localized record reference to distinguish them. Visible headings retain the original title. Publication dates use the API's calendar components so server and browser locale/timezone differences do not cause hydration errors.

API data is rendered on the server and hydrated into React Query, including navigation links, lists and detail content. Server API responses are revalidated every five minutes; React Query retains its existing ten-minute browser cache. Requests time out after 15 seconds. Missing content returns 404 with noindex; upstream outages remain server errors instead of being mislabeled as missing pages. Invalid identifiers are rejected before calling the API.

`/sitemap.xml` includes static routes, media, activities, categories and results in every available language. It is generated at request time, so a production build does not depend on the API. A failed initial API fetch fails the sitemap response instead of silently dropping content. Modification timestamps are omitted because the API does not provide them. `/robots.txt` advertises this sitemap and leaves scripts, styles and images crawlable.

JSON-LD describes the university, website, detail content and breadcrumbs. Dates and activity authors come from the API; unknown authors and modification dates are omitted. JSON-LD escapes `<` to prevent API text from terminating its script element. Research results use `CreativeWork` and link to their PDF when available.

Article cards use API images. Other pages use the locally generated 1200×630 PNG at `/og`, which needs no external font/image service. Favicon and Apple touch icon derive from the existing university logo.

Development and Vercel preview environments are noindex. Set `SEO_NOINDEX=true` on staging hosted elsewhere. Production should use `SEO_NOINDEX=false` (or leave it unset). Ownership tokens are optional: `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`. These are verification values, not private API keys.

Build and run the production server, then check its actual HTML without JavaScript:

```sh
npm run build
npm run start
npm run check:seo
```

For a different local port, run `SEO_CHECK_URL=http://127.0.0.1:3012 npm run check:seo`. This check reads the sitemap and verifies every listed page, localized canonical/alternate links, server-rendered headings, structured data, social metadata, robots, the share image and invalid routes. The API must be available for the initial uncached run.

After deployment, verify the domain in Google Search Console and Bing Webmaster Tools, submit `https://saburtalo.iliauni.edu.ge/sitemap.xml`, and inspect representative Georgian/English detail URLs. Use Google's Rich Results Test for article/breadcrumb markup and PageSpeed Insights for production performance. These account actions and deployment are separate from the repository changes. Search ranking depends on content and search engines; metadata does not guarantee a ranking.
