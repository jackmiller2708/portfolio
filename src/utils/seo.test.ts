import { describe, expect, it } from "vitest";
import type { SiteMeta } from "@domain/site";
import { buildPageSeo } from "./seo";

const site: SiteMeta = {
  title: "Frontend Systems Portfolio",
  description: "Default description.",
  siteUrl: "https://example.com/",
  ogImage: "/og/default.png",
  availability: "Available",
  contactEmail: "hello@example.com",
  proofPoints: [],
  nonFitCriteria: [],
  about: {
    context: "Context",
    workingStyle: [],
    qualityPhilosophy: [],
    communication: "Async"
  }
};

describe("buildPageSeo", () => {
  it("normalizes canonical and Open Graph URLs", () => {
    const seo = buildPageSeo(site, {
      path: "/services/",
      title: "Services",
      description: "Service page."
    });

    expect(seo.title).toBe("Services | Frontend Systems Portfolio");
    expect(seo.canonicalUrl).toBe("https://example.com/services");
    expect(seo.ogImage).toBe("https://example.com/og/default.png");
  });
});
