import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
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
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    redactionStatus: z.enum(["public", "redacted", "synthetic"])
  })
});

const labPosts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lab-posts" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    topic: z.enum(["Angular", "RxJS", "TypeScript", "Architecture"]),
    takeaway: z.string()
  })
});

const auditFindings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/audit-findings" }),
  schema: z.object({
    title: z.string(),
    severity: z.enum(["critical", "high", "medium", "low"]),
    area: z.enum(["state", "data access", "errors", "performance", "architecture", "testing"]),
    evidence: z.string(),
    risk: z.string(),
    recommendation: z.string(),
    sprint: z.number().optional()
  })
});

const siteMeta = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/site-meta" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    availability: z.string(),
    contactEmail: z.email()
  })
});

export const collections = {
  services,
  "case-studies": caseStudies,
  "lab-posts": labPosts,
  "audit-findings": auditFindings,
  "site-meta": siteMeta
};
