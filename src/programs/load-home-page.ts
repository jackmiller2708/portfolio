import { Effect } from "effect";
import type { ServiceOffer } from "@domain/service";

export type HomePageViewModel = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly summary: string;
  };
  readonly services: readonly ServiceOffer[];
};

const services: readonly ServiceOffer[] = [
  {
    id: "angular-system-audit",
    title: "Angular System Audit",
    summary:
      "Find architecture, state, data, and error risks before they become delivery blockers.",
    clientPain: "The frontend is hard to change and nobody can point to the real risk boundaries.",
    outputs: ["risk map", "finding list", "stabilization roadmap"],
    bestFit: ["Angular product teams", "legacy refactor planning"],
    notFit: ["greenfield marketing pages"],
    cta: { label: "Discuss an audit", href: "/contact" }
  },
  {
    id: "frontend-stabilization",
    title: "Frontend Stabilization",
    summary: "Make complex Angular flows safer through explicit state, data, and error models.",
    clientPain: "Critical workflows are brittle and fixes keep creating new regressions.",
    outputs: ["refactor plan", "typed workflow model", "testable boundaries"],
    bestFit: ["teams with active delivery pressure"],
    notFit: ["pure visual redesigns"],
    cta: { label: "Start stabilization", href: "/contact" }
  },
  {
    id: "architecture-advisory",
    title: "Architecture Advisory",
    summary:
      "Get senior frontend architecture input before a rewrite, migration, or major feature push.",
    clientPain: "The team needs a practical decision path, not abstract architecture advice.",
    outputs: ["decision records", "tradeoff map", "implementation sequence"],
    bestFit: ["technical leads", "product engineering teams"],
    notFit: ["one-off bug tickets"],
    cta: { label: "Plan advisory", href: "/contact" }
  }
];

export const loadHomePage = Effect.succeed<HomePageViewModel>({
  hero: {
    eyebrow: "Angular Frontend Systems Engineer",
    title: "I make complex frontend systems explicit, safer, and easier to evolve.",
    summary:
      "Architecture audits, refactors, and stabilization work for Angular teams dealing with unclear state, data flow, ownership, and errors."
  },
  services
});
