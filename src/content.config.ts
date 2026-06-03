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
    redactionStatus: z.enum(["public", "redacted", "synthetic"]),
    context: z.string(),
    constraints: z.array(z.string()),
    problem: z.string(),
    decisions: z.array(
      z.object({
        title: z.string(),
        rationale: z.string()
      })
    ),
    tradeoffs: z.array(z.string()),
    beforeAfter: z.object({
      before: z.array(z.string()),
      after: z.array(z.string())
    }),
    evidence: z.array(
      z.object({
        label: z.string(),
        detail: z.string()
      })
    ),
    result: z.string(),
    recommendation: z.string()
  })
});

const labPosts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lab-posts" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    topic: z.enum(["Angular", "RxJS", "TypeScript", "Architecture"]),
    takeaway: z.string(),
    codeLanguage: z.string().optional(),
    relatedServices: z.array(z.string()).optional()
  })
});

const systemMap = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/system-map" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    fallbackLabel: z.string(),
    nodes: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        group: z.string(),
        description: z.string()
      })
    ),
    groups: z.array(
      z.object({
        id: z.string(),
        label: z.string()
      })
    ),
    edges: z.array(
      z.object({
        from: z.string(),
        to: z.string(),
        label: z.string()
      })
    ),
    riskMarkers: z.array(
      z.object({
        nodeId: z.string(),
        label: z.string()
      })
    ),
    decisionMarkers: z.array(
      z.object({
        nodeId: z.string(),
        label: z.string()
      })
    ),
    states: z.object({
      messy: z.string(),
      explicit: z.string()
    })
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
    siteUrl: z.url(),
    ogImage: z.string(),
    availability: z.string(),
    contactEmail: z.email(),
    credibilityPoints: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        detail: z.string()
      })
    ),
    nonFitCriteria: z.array(z.string()),
    about: z.object({
      context: z.string(),
      philosophy: z.string(),
      workingStyle: z.array(z.string()),
      qualityPhilosophy: z.array(z.string()),
      communication: z.string()
    })
  })
});

export const collections = {
  services,
  "case-studies": caseStudies,
  "lab-posts": labPosts,
  "audit-findings": auditFindings,
  "site-meta": siteMeta,
  "system-map": systemMap
};
