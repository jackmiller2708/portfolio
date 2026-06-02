import { Effect } from "effect";
import { getCollection, getEntry } from "astro:content";
import type { AuditFinding } from "@domain/audit";
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

    return entries.map((entry) => ({
      id: entry.id,
      slug: entry.id,
      title: entry.data.title,
      summary: entry.data.summary,
      topic: entry.data.topic,
      takeaway: entry.data.takeaway
    }));
  }),
  listCaseStudies: Effect.promise(async () => {
    const entries = await getCollection("case-studies");

    return entries.map((entry) => ({
      id: entry.id,
      slug: entry.id,
      title: entry.data.title,
      summary: entry.data.summary,
      redactionStatus: entry.data.redactionStatus
    }));
  }),
  getSiteMeta: Effect.promise(async () => {
    const entry = await getEntry("site-meta", "main");

    if (!entry) {
      throw new Error("Missing site metadata");
    }

    return entry.data;
  })
};
