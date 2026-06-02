import { Effect } from "effect";
import type { AuditFinding } from "@domain/audit";
import type { LabPost } from "@domain/lab";
import type { ServiceOffer } from "@domain/service";
import type { SiteMeta } from "@domain/site";
import type { ContentRepository } from "@services/ContentRepository";

export type HomePageViewModel = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly summary: string;
  };
  readonly proofPoints: SiteMeta["proofPoints"];
  readonly services: readonly ServiceOffer[];
  readonly auditPreview: {
    readonly summary: string;
    readonly findings: readonly AuditFinding[];
  };
  readonly labPreview: readonly LabPost[];
  readonly heroMap: {
    readonly label: string;
    readonly nodes: readonly string[];
  };
  readonly cta: {
    readonly title: string;
    readonly summary: string;
    readonly href: string;
    readonly label: string;
  };
};

export const loadHomePageFromRepository = (
  repository: ContentRepository
): Effect.Effect<HomePageViewModel> =>
  Effect.gen(function* () {
    const site = yield* repository.getSiteMeta;
    const services = yield* repository.listServices;
    const auditFindings = yield* repository.listAuditFindings;
    const labPosts = yield* repository.listLabPosts;
    const systemMap = yield* repository.getSystemMap;

    return {
      hero: {
        eyebrow: "Angular Frontend Systems Engineer",
        title: "I make complex frontend systems explicit, safer, and easier to evolve.",
        summary:
          "Architecture audits, refactors, and stabilization work for Angular teams dealing with unclear state, data flow, ownership, and errors."
      },
      proofPoints: site.proofPoints,
      services: services.slice(0, 3),
      auditPreview: {
        summary:
          "A sample of the report style: observable evidence, system risk, and a sequenced recommendation.",
        findings: auditFindings.slice(0, 2)
      },
      labPreview: labPosts.slice(0, 3),
      heroMap: {
        label: systemMap.fallbackLabel,
        nodes: systemMap.nodes.map((node) => node.label)
      },
      cta: {
        title: "Start with a scoped diagnostic.",
        summary:
          "Share the current system shape and the risk you want made explicit. The first response can focus on fit, scope, and next steps.",
        href: "/contact",
        label: "Start a diagnostic"
      }
    };
  });
