import { describe, expect, it } from "vitest";
import type { SiteMeta } from "@domain/site";
import { buildPageSeo } from "./seo";

const site: SiteMeta = {
  title: "Nguyen Ngoc Huy / Jack",
  description: "Default description.",
  siteUrl: "https://example.com/",
  ogImage: "/og/default.png",
  availability: "Available",
  contactEmail: "jackmiller0899@gmail.com",
  credibilityPoints: [],
  nonFitCriteria: [],
  about: {
    context: "Context",
    philosophy: "Boundaries matter.",
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

    expect(seo.title).toBe("Services | Nguyen Ngoc Huy / Jack");
    expect(seo.canonicalUrl).toBe("https://example.com/services");
    expect(seo.ogImage).toBe("https://example.com/og/default.png");
  });
});
