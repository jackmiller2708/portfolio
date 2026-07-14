import type { CaseStudy } from "@domain/case-study";
import type { LabPost } from "@domain/lab";
import type { ServiceOffer } from "@domain/service";
import type { RecommendedRead } from "@domain/recommended-read";

export const buildCaseStudyRecommendedReads = (
  currentSlug: string,
  caseStudies: readonly CaseStudy[],
  labPosts: readonly LabPost[]
): readonly RecommendedRead[] => {
  const caseRead = caseStudies.find((caseStudy) => caseStudy.slug !== currentSlug);
  const labRead = labPosts[0];

  return [
    caseRead && {
      label: "Next case",
      title: caseRead.title,
      summary: caseRead.summary,
      href: `/case-studies/${caseRead.slug}`
    },
    labRead && {
      label: "Technical note",
      title: labRead.title,
      summary: labRead.summary,
      href: `/lab/${labRead.slug}`
    }
  ].filter((read): read is RecommendedRead => Boolean(read));
};

export const buildLabRecommendedReads = (
  post: LabPost,
  services: readonly ServiceOffer[],
  caseStudies: readonly CaseStudy[]
): readonly RecommendedRead[] => {
  const relatedServiceIds = new Set(post.relatedServices ?? []);
  const service = services.find((offer) => !relatedServiceIds.has(offer.id)) ?? services[0];
  const caseStudy = caseStudies[0];

  return [
    service && {
      label: "Related service",
      title: service.title,
      summary: service.summary,
      href: service.cta.href
    },
    caseStudy && {
      label: "Reference engagement",
      title: caseStudy.title,
      summary: caseStudy.summary,
      href: `/case-studies/${caseStudy.slug}`
    }
  ].filter((read): read is RecommendedRead => Boolean(read));
};
