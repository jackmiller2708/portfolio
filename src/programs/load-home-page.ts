import { Effect } from "effect";
import type { AuditFinding } from "@domain/audit";
import type { LabPost } from "@domain/lab";
import type { ServiceOffer } from "@domain/service";
import type { SiteMeta } from "@domain/site";
import type { SystemMap } from "@domain/system-map";
import type { CaseStudy } from "@domain/case-study";
import type { DiagnosticOption, DiagnosticOptionSeed } from "@domain/diagnostic";
import type { ContentRepository } from "@services/ContentRepository";

const diagnosticSeeds: readonly DiagnosticOptionSeed[] = [
  {
    id: "unclear-state",
    label: "Unclear state",
    pain: "Ownership is spread across components, services, and route effects.",
    serviceId: "angular-system-audit",
    auditFindingId: "implicit-state",
    systemMapState: "messy",
    ctaLabel: "Explore this"
  },
  {
    id: "cache-data",
    label: "Cache and data behavior",
    pain: "Screens disagree because cache rules, refresh timing, and API state are implicit.",
    serviceId: "frontend-stabilization",
    auditFindingId: "cache-semantics",
    systemMapState: "explicit",
    ctaLabel: "Discuss data flow"
  },
  {
    id: "error-recovery",
    label: "Weak error recovery",
    pain: "Failures reach users without a named recovery path or testable fallback.",
    serviceId: "frontend-stabilization",
    auditFindingId: "unhandled-errors",
    systemMapState: "explicit",
    ctaLabel: "Review recovery paths"
  },
  {
    id: "refactor-planning",
    label: "Refactor planning",
    pain: "The team knows the system needs change but lacks a low-risk sequence.",
    serviceId: "architecture-advisory",
    auditFindingId: "implicit-state",
    systemMapState: "explicit",
    ctaLabel: "Plan the sequence"
  }
];

const findById = <Value extends { readonly id: string }>(
  values: readonly Value[],
  id: string
): Value | undefined => values.find((value) => value.id === id);

const buildDiagnostics = (
  services: readonly ServiceOffer[],
  auditFindings: readonly AuditFinding[]
): readonly DiagnosticOption[] =>
  diagnosticSeeds.map((seed) => {
    const service = findById(services, seed.serviceId) ?? services[0];
    const finding = findById(auditFindings, seed.auditFindingId) ?? auditFindings[0];

    return {
      id: seed.id,
      label: seed.label,
      pain: seed.pain,
      recommendedService: {
        id: service?.id ?? seed.serviceId,
        title: service?.title ?? "Frontend systems diagnostic",
        href: service ? `/services#${service.id}` : "/services"
      },
      auditFinding: {
        id: finding?.id ?? seed.auditFindingId,
        title: finding?.title ?? "Sample audit finding",
        href: finding ? `/sample-audit#${finding.id}` : "/sample-audit"
      },
      systemMapState: seed.systemMapState,
      referenceHref: finding ? `/sample-audit#${finding.id}` : "/sample-audit",
      cta: {
        label: seed.ctaLabel,
        href: `/contact?diagnostic=${seed.id}`
      }
    };
  });

const buildReferenceCards = (caseStudies: readonly CaseStudy[]) =>
  caseStudies.slice(0, 2).map((caseStudy) => ({
    slug: caseStudy.slug,
    title: caseStudy.title,
    problem: caseStudy.problem,
    decision: caseStudy.decisions[0]?.title ?? "Make the system boundary explicit",
    result: caseStudy.result,
    href: `/case-studies/${caseStudy.slug}`
  }));

export type HomePageViewModel = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly summary: string;
  };
  readonly credibilityPoints: SiteMeta["credibilityPoints"];
  readonly services: readonly ServiceOffer[];
  readonly auditPreview: {
    readonly summary: string;
    readonly findings: readonly AuditFinding[];
  };
  readonly diagnostics: readonly DiagnosticOption[];
  readonly explorationStrip: readonly {
    readonly label: string;
    readonly href: string;
  }[];
  readonly referenceCards: ReturnType<typeof buildReferenceCards>;
  readonly labPreview: readonly LabPost[];
  readonly heroMap: SystemMap;
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
    const caseStudies = yield* repository.listCaseStudies;
    const systemMap = yield* repository.getSystemMap;

    return {
      hero: {
        eyebrow: "Angular Frontend Systems Engineer",
        title: "I make complex frontend systems explicit, safer, and easier to evolve.",
        summary:
          "Architecture audits, refactors, and stabilization work for Angular teams dealing with unclear state, data flow, ownership, and errors."
      },
      credibilityPoints: site.credibilityPoints,
      services: services.slice(0, 3),
      auditPreview: {
        summary:
          "A sample of the report style: observable evidence, system risk, and a sequenced recommendation.",
        findings: auditFindings.slice(0, 2)
      },
      diagnostics: buildDiagnostics(services, auditFindings),
      explorationStrip: [
        { label: "System map", href: "#system-map" },
        { label: "Past work", href: "#past-work" },
        { label: "Audit findings", href: "/sample-audit" },
        { label: "Lab notes", href: "/lab" }
      ],
      referenceCards: buildReferenceCards(caseStudies),
      labPreview: labPosts.slice(0, 3),
      heroMap: systemMap,
      cta: {
        title: "Start with a scoped diagnostic.",
        summary:
          "Share the current system shape and the risk you want made explicit. The first response can focus on fit, scope, and next steps.",
        href: "/contact",
        label: "Start a diagnostic"
      }
    };
  });
