import type { Effect } from "effect";
import type { AuditFinding } from "@domain/audit";
import type { CaseStudy } from "@domain/case-study";
import type { LabPost } from "@domain/lab";
import type { ServiceOffer } from "@domain/service";
import type { SiteMeta } from "@domain/site";
import type { SystemMap } from "@domain/system-map";

export type ContentRepository = {
  readonly listServices: Effect.Effect<readonly ServiceOffer[]>;
  readonly listAuditFindings: Effect.Effect<readonly AuditFinding[]>;
  readonly listLabPosts: Effect.Effect<readonly LabPost[]>;
  readonly listCaseStudies: Effect.Effect<readonly CaseStudy[]>;
  readonly getCaseStudyBySlug: (slug: string) => Effect.Effect<CaseStudy>;
  readonly getLabPostBySlug: (slug: string) => Effect.Effect<LabPost>;
  readonly getSystemMap: Effect.Effect<SystemMap>;
  readonly getSiteMeta: Effect.Effect<SiteMeta>;
};
