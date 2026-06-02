import type { PageSeo, PageSeoInput, SiteMeta } from "@domain/site";

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

const normalizePath = (path: string) => {
  if (path === "/") {
    return "/";
  }

  return `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;
};

export const buildPageSeo = (site: SiteMeta, input: PageSeoInput): PageSeo => {
  const path = normalizePath(input.path);
  const siteUrl = trimTrailingSlash(site.siteUrl);
  const title = input.title ? `${input.title} | ${site.title}` : site.title;
  const description = input.description ?? site.description;
  const ogImage = input.ogImage ?? site.ogImage;
  const canonicalUrl = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`,
    ogUrl: canonicalUrl
  };
};
