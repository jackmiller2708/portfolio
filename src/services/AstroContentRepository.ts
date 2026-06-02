import { Effect } from "effect";
import { getCollection, getEntry } from "astro:content";
import type { AuditFinding } from "@domain/audit";
import type { CaseStudy } from "@domain/case-study";
import type { LabPost } from "@domain/lab";
import type { SystemMap } from "@domain/system-map";
import type { ContentRepository } from "./ContentRepository";

const toServiceOffer = (entry: {
  readonly id: string;
  readonly data: {
    readonly title: string;
    readonly summary: string;
    readonly clientPain: string;
    readonly outputs: readonly string[];
    readonly bestFit: readonly string[];
    readonly notFit: readonly string[];
    readonly cta: {
      readonly label: string;
      readonly href: string;
    };
  };
}) => ({
  id: entry.id,
  title: entry.data.title,
  summary: entry.data.summary,
  clientPain: entry.data.clientPain,
  outputs: entry.data.outputs,
  bestFit: entry.data.bestFit,
  notFit: entry.data.notFit,
  cta: entry.data.cta
});

const toAuditFinding = (entry: {
  readonly id: string;
  readonly data: Omit<AuditFinding, "id">;
}) => ({
  id: entry.id,
  title: entry.data.title,
  severity: entry.data.severity,
  area: entry.data.area,
  evidence: entry.data.evidence,
  risk: entry.data.risk,
  recommendation: entry.data.recommendation,
  sprint: entry.data.sprint
});

const toLabPost = (entry: {
  readonly id: string;
  readonly data: Omit<LabPost, "id" | "slug">;
}): LabPost => ({
  id: entry.id,
  slug: entry.id,
  title: entry.data.title,
  summary: entry.data.summary,
  topic: entry.data.topic,
  takeaway: entry.data.takeaway,
  codeLanguage: entry.data.codeLanguage,
  relatedServices: entry.data.relatedServices
});

const toCaseStudy = (entry: {
  readonly id: string;
  readonly data: Omit<CaseStudy, "id" | "slug">;
}): CaseStudy => ({
  id: entry.id,
  slug: entry.id,
  title: entry.data.title,
  summary: entry.data.summary,
  redactionStatus: entry.data.redactionStatus,
  context: entry.data.context,
  constraints: entry.data.constraints,
  problem: entry.data.problem,
  decisions: entry.data.decisions,
  tradeoffs: entry.data.tradeoffs,
  beforeAfter: entry.data.beforeAfter,
  evidence: entry.data.evidence,
  result: entry.data.result,
  recommendation: entry.data.recommendation
});

const toSystemMap = (entry: {
  readonly id: string;
  readonly data: Omit<SystemMap, "id">;
}): SystemMap => ({
  id: entry.id,
  title: entry.data.title,
  summary: entry.data.summary,
  fallbackLabel: entry.data.fallbackLabel,
  nodes: entry.data.nodes,
  groups: entry.data.groups,
  edges: entry.data.edges,
  riskMarkers: entry.data.riskMarkers,
  decisionMarkers: entry.data.decisionMarkers,
  states: entry.data.states
});

export const astroContentRepository: ContentRepository = {
  listServices: Effect.promise(async () => {
    const entries = await getCollection("services");

    return entries
      .toSorted((left, right) => left.data.priority - right.data.priority)
      .map(toServiceOffer);
  }),
  listAuditFindings: Effect.promise(async () => {
    const entries = await getCollection("audit-findings");

    return entries.map(toAuditFinding);
  }),
  listLabPosts: Effect.promise(async () => {
    const entries = await getCollection("lab-posts");

    return entries.map(toLabPost);
  }),
  listCaseStudies: Effect.promise(async () => {
    const entries = await getCollection("case-studies");

    return entries.map(toCaseStudy);
  }),
  getCaseStudyBySlug: (slug) =>
    Effect.promise(async () => {
      const entry = await getEntry("case-studies", slug);

      if (!entry) {
        throw new Error(`Missing case study: ${slug}`);
      }

      return toCaseStudy(entry);
    }),
  getLabPostBySlug: (slug) =>
    Effect.promise(async () => {
      const entry = await getEntry("lab-posts", slug);

      if (!entry) {
        throw new Error(`Missing lab post: ${slug}`);
      }

      return toLabPost(entry);
    }),
  getSystemMap: Effect.promise(async () => {
    const entry = await getEntry("system-map", "main");

    if (!entry) {
      throw new Error("Missing system map");
    }

    return toSystemMap(entry);
  }),
  getSiteMeta: Effect.promise(async () => {
    const entry = await getEntry("site-meta", "main");

    if (!entry) {
      throw new Error("Missing site metadata");
    }

    return entry.data;
  })
};
