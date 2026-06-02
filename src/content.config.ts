import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    clientPain: z.string(),
    outputs: z.array(z.string()),
    bestFit: z.array(z.string()),
    notFit: z.array(z.string()),
    cta: z.object({
      label: z.string(),
      href: z.string()
    }),
    priority: z.number()
  })
});

const caseStudies = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    redactionStatus: z.enum(["public", "redacted", "synthetic"])
  })
});

const labPosts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    topic: z.enum(["Angular", "RxJS", "TypeScript", "Architecture"]),
    takeaway: z.string()
  })
});

const auditFindings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    severity: z.enum(["critical", "high", "medium", "low"]),
    area: z.enum(["state", "data access", "errors", "performance", "architecture", "testing"]),
    evidence: z.string(),
    risk: z.string(),
    recommendation: z.string()
  })
});

export const collections = {
  services,
  caseStudies,
  labPosts,
  auditFindings
};
