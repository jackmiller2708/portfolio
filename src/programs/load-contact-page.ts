import { Effect } from "effect";
import { astroContentRepository } from "@services/AstroContentRepository";
import type { ContentRepository } from "@services/ContentRepository";
import type { AdvisoryRecommendation } from "@domain/advisory";
import { buildAdvisoryRecommendations } from "@utils/advisory";
import {
  initialContactState,
  submittingContactState,
  type ContactIntakeState
} from "@utils/contact-state";

type ContactStateByKind<TKind extends ContactIntakeState["kind"]> = Extract<
  ContactIntakeState,
  { readonly kind: TKind }
>;

export type ContactPageViewModel = {
  readonly title: string;
  readonly summary: string;
  readonly availability: string;
  readonly contactEmail: string;
  readonly nonFitCriteria: readonly string[];
  readonly advisoryRecommendations: readonly AdvisoryRecommendation[];
  readonly states: {
    readonly initial: ContactStateByKind<"initial">;
    readonly submitting: ContactStateByKind<"submitting">;
    readonly success: ContactStateByKind<"success">;
    readonly validation: ContactStateByKind<"validation">;
    readonly blocked: ContactStateByKind<"blocked">;
    readonly delivery: ContactStateByKind<"delivery">;
  };
};

export const loadContactPageFromRepository = (repository: ContentRepository) =>
  Effect.gen(function* () {
    const site = yield* repository.getSiteMeta;
    const services = yield* repository.listServices;

    return {
      title: "Request an Angular frontend audit",
      summary:
        "Send the product context, Angular version, team size, current pain, and timeline. I will use that to decide whether the right first step is an audit, stabilization sprint, architecture advisory, or no-fit.",
      availability: site.availability,
      contactEmail: site.contactEmail,
      nonFitCriteria: site.nonFitCriteria,
      advisoryRecommendations: buildAdvisoryRecommendations(services),
      states: {
        initial: initialContactState,
        submitting: submittingContactState,
        success: {
          kind: "success",
          message:
            "Thanks. I will review the context and reply with the most reasonable next step: audit, stabilization sprint, advisory, or no-fit."
        },
        validation: {
          kind: "validation",
          message: "Some required fields need attention before this inquiry can be sent.",
          summary: ["Required fields must be complete and consent must be checked."]
        },
        blocked: {
          kind: "blocked",
          message:
            "This inquiry could not be accepted. Use the direct email fallback if this is a legitimate request."
        },
        delivery: {
          kind: "delivery",
          message:
            "The inquiry could not be delivered right now. Try again or use the direct email fallback."
        }
      }
    } satisfies ContactPageViewModel;
  });

export const loadContactPage = loadContactPageFromRepository(astroContentRepository);
