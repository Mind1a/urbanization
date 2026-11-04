import assert from "node:assert/strict";

const base = new URL(process.env.SEO_CHECK_URL || "http://127.0.0.1:3000");
const origin = new URL(process.env.SITE_URL || "https://saburtalo.iliauni.edu.ge").origin;
const headers = { "user-agent": "Googlebot" };
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1].toLowerCase(), decode(match[2])]));
}

async function request(path) {
  const response = await fetch(new URL(path, base), { headers, signal: AbortSignal.timeout(60000) });
  return { response, text: await response.text() };
}

const { response: sitemapResponse, text: sitemap } = await request("/sitemap.xml");
assert.equal(sitemapResponse.status, 200, "sitemap must be available");
assert.match(sitemapResponse.headers.get("content-type"), /xml/);
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
  const url = decode(/<loc>(.*?)<\/loc>/.exec(match[1])?.[1] || "");
  const languages = [...match[1].matchAll(/<xhtml:link\s+[^>]*>/g)].map((tag) => attributes(tag[0]));
  return { url, languages };
});
assert(entries.length >= 18, "all nine static pages must exist in both languages");
assert.equal(new Set(entries.map(({ url }) => url)).size, entries.length, "sitemap must not contain duplicate URLs");
const knownUrls = new Set(entries.map(({ url }) => url));
const titles = new Set();

for (const { url, languages } of entries) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, origin, "sitemap URLs must use the production origin");
  const locale = parsed.pathname.split("/")[1];
  assert(["en", "ka"].includes(locale));
  const { response, text } = await request(parsed.pathname);
  assert.equal(response.status, 200, `${parsed.pathname}: expected a real page`);
  const markup = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const tags = [...markup.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map((tag) => attributes(tag[0]));
  const meta = (name) => tags.filter((tag) => tag.name === name || tag.property === name);
  const title = decode(/<title>(.*?)<\/title>/.exec(markup)?.[1] || "");
  assert(title && !/Create Next App|Lorem ipsum/i.test(title), `${parsed.pathname}: meaningful title`);
  assert(!titles.has(title), `${parsed.pathname}: unique title`);
  titles.add(title);
  assert.equal(meta("description").length, 1, `${parsed.pathname}: one description`);
  assert(meta("description")[0].content.length > 25 && meta("description")[0].content.length <= 160);
  const canonical = tags.filter((tag) => tag.rel === "canonical");
  assert.equal(canonical.length, 1, `${parsed.pathname}: one canonical`);
  assert.equal(canonical[0].href, url);
  assert.match(markup, new RegExp(`<html[^>]*lang="${locale}"`));
  assert.equal([...markup.matchAll(/<h1\b/g)].length, 1, `${parsed.pathname}: exactly one server-rendered H1`);
  assert.equal(meta("og:url")[0]?.content, url);
  assert(meta("og:image")[0]?.content.startsWith("http"));
  assert.equal(meta("twitter:card")[0]?.content, "summary_large_image");
  assert(!meta("robots").some((tag) => /noindex/.test(tag.content)), `${parsed.pathname}: production must be indexable`);
  for (const alternate of languages) {
    assert(knownUrls.has(alternate.href), `${parsed.pathname}: alternate must be in sitemap`);
    assert(tags.some((tag) => tag.rel === "alternate" && tag.hreflang === alternate.hreflang && tag.href === alternate.href), `${parsed.pathname}: HTML and sitemap alternates must agree`);
  }
  const schemas = [...text.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  assert(schemas.some((schema) => schema["@graph"]?.some((entry) => entry["@type"] === "WebSite")), `${parsed.pathname}: website structured data`);
  if (/\/(media|results|activities)\/\d+$/.test(parsed.pathname)) {
    assert(schemas.some((schema) => ["Article", "CreativeWork"].includes(schema["@type"])), `${parsed.pathname}: content structured data`);
    assert(schemas.some((schema) => schema["@type"] === "BreadcrumbList"));
    assert.match(markup, /<article\b/, `${parsed.pathname}: content must exist without JavaScript`);
  }
  console.log(`PASS ${parsed.pathname}`);
}

const { response: robotsResponse, text: robots } = await request("/robots.txt");
assert.equal(robotsResponse.status, 200);
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(!/Disallow: \/_next\//.test(robots), "search engines must be able to load scripts, styles and images");
const image = await fetch(new URL("/og", base));
assert.equal(image.status, 200);
assert.match(image.headers.get("content-type"), /image\/png/);
for (const path of ["/en/media/not-a-number", "/ka/results/0", "/en/activities/-1", "/en/activities/category/0", "/en/nonexistent-page", "/en/media/2147483647", "/ka/results/2147483647", "/en/activities/2147483647"]) {
  const { response, text } = await request(path);
  assert.equal(response.status, 404, `${path}: must return 404, not a successful empty page`);
  assert.match(text, /name="robots" content="[^"]*noindex/);
}
console.log(`SEO checks passed for ${entries.length} pages, sitemap, robots, social image and invalid routes.`);
