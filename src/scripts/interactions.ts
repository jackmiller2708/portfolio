const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const withStateFade = (panel: HTMLElement | null, update: () => void) => {
  if (!panel || prefersReducedMotion.matches) {
    update();
    return;
  }

  panel.classList.add("is-updating");
  window.setTimeout(() => {
    update();
    panel.classList.remove("is-updating");
  }, 90);
};

const isSmallViewport = () => window.matchMedia("(max-width: 760px)").matches;

const initDiagnosticSelectors = () => {
  const selectors = document.querySelectorAll<HTMLElement>("[data-diagnostic-selector]");

  for (const selector of selectors) {
    if (selector.dataset.diagnosticReady === "true") {
      continue;
    }

    selector.dataset.diagnosticReady = "true";
    const options = selector.querySelectorAll<HTMLButtonElement>("[data-diagnostic-option]");
    const result = selector.querySelector<HTMLElement>("[data-diagnostic-result]");
    const title = selector.querySelector<HTMLElement>("[data-diagnostic-title]");
    const pain = selector.querySelector<HTMLElement>("[data-diagnostic-pain]");
    const service = selector.querySelector<HTMLAnchorElement>("[data-diagnostic-service]");
    const reference = selector.querySelector<HTMLAnchorElement>("[data-diagnostic-reference]");
    const mapState = selector.querySelector<HTMLElement>("[data-diagnostic-map-state]");
    const cta = selector.querySelector<HTMLAnchorElement>("[data-diagnostic-cta]");

    const activate = (option: HTMLButtonElement) => {
      for (const item of options) {
        const isActive = item === option;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      }

      if (!result || !title || !pain || !service || !reference || !mapState || !cta) {
        return;
      }

      withStateFade(result, () => {
        title.textContent = option.dataset.label ?? "";
        pain.textContent = option.dataset.pain ?? "";
        service.textContent = option.dataset.serviceTitle ?? "";
        service.href = option.dataset.serviceHref ?? "/services";
        reference.textContent = option.dataset.auditTitle ?? "";
        reference.href = option.dataset.auditHref ?? "/sample-audit";
        mapState.textContent = option.dataset.systemState ?? "";
        cta.textContent = option.dataset.ctaLabel ?? "Start diagnostic";
        cta.href = option.dataset.ctaHref ?? "/contact";
      });

      if (isSmallViewport()) {
        window.setTimeout(() => {
          result.scrollIntoView({
            behavior: prefersReducedMotion.matches ? "auto" : "smooth",
            block: "nearest"
          });
        }, 220);
      }

      const map = document.querySelector<HTMLElement>("[data-system-map]");
      const stateButton = map?.querySelector<HTMLButtonElement>(
        `[data-map-state="${option.dataset.systemState ?? "messy"}"]`
      );
      stateButton?.click();
    };

    for (const option of options) {
      option.addEventListener("click", () => activate(option));
      option.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
          return;
        }

        event.preventDefault();
        const current = [...options].indexOf(option);
        const offset = event.key === "ArrowRight" ? 1 : -1;
        const next = options[(current + offset + options.length) % options.length];
        next?.focus();
      });
    }
  }
};

const initAuditWalkthrough = () => {
  const walkthrough = document.querySelector<HTMLElement>("[data-audit-walkthrough]");

  if (!walkthrough || walkthrough.dataset.walkthroughReady === "true") {
    return;
  }

  walkthrough.dataset.walkthroughReady = "true";
  const findings = walkthrough.querySelectorAll<HTMLButtonElement>("[data-walkthrough-finding]");
  const phases = walkthrough.querySelectorAll<HTMLButtonElement>("[data-phase]");
  const panel = walkthrough.querySelector<HTMLElement>(".audit-walkthrough__panel");
  const label = walkthrough.querySelector<HTMLElement>("[data-phase-label]");
  const title = walkthrough.querySelector<HTMLElement>("[data-walkthrough-title]");
  const copy = walkthrough.querySelector<HTMLElement>("[data-walkthrough-copy]");
  let activeFinding = findings[0];
  let activePhase = "symptom";

  const phaseLabels: Record<string, string> = {
    symptom: "Symptom",
    evidence: "Evidence",
    risk: "Risk",
    recommendation: "Recommendation",
    sprint: "Sprint sequence"
  };

  const updatePanel = () => {
    if (!activeFinding || !label || !title || !copy) {
      return;
    }

    withStateFade(panel, () => {
      label.textContent = phaseLabels[activePhase] ?? "Symptom";
      title.textContent = activeFinding.dataset.title ?? "";
      copy.textContent = activeFinding.dataset[activePhase] ?? "";
    });
  };

  for (const finding of findings) {
    finding.addEventListener("click", () => {
      activeFinding = finding;
      for (const item of findings) {
        const isActive = item === finding;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      }
      updatePanel();
    });
  }

  for (const phase of phases) {
    phase.addEventListener("click", () => {
      activePhase = phase.dataset.phase ?? "symptom";
      for (const item of phases) {
        const isActive = item === phase;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      }
      updatePanel();
    });
  }
};

const initAdvisoryFlow = () => {
  const advisoryFlow = document.querySelector<HTMLElement>("[data-advisory-flow]");

  if (!advisoryFlow || advisoryFlow.dataset.advisoryReady === "true") {
    return;
  }

  advisoryFlow.dataset.advisoryReady = "true";
  const options = advisoryFlow.querySelectorAll<HTMLButtonElement>("[data-advisory-option]");
  const result = advisoryFlow.querySelector<HTMLElement>(".advisory-flow__result");
  const title = advisoryFlow.querySelector<HTMLElement>("[data-advisory-title]");
  const reason = advisoryFlow.querySelector<HTMLElement>("[data-advisory-reason]");
  const link = advisoryFlow.querySelector<HTMLAnchorElement>("[data-advisory-link]");
  const pain = document.querySelector<HTMLTextAreaElement>("#pain");
  const engagementType = document.querySelector<HTMLSelectElement>("#engagementType");

  const activate = (option: HTMLButtonElement) => {
    for (const item of options) {
      const isActive = item === option;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    }

    withStateFade(result, () => {
      if (title) title.textContent = option.dataset.serviceTitle ?? "";
      if (reason) reason.textContent = option.dataset.reason ?? "";
      if (link) link.href = option.dataset.contactHref ?? "/contact";
    });

    if (pain) pain.value = `${option.dataset.label ?? ""}: ${option.dataset.pain ?? ""}`;
    if (engagementType) {
      engagementType.value = option.dataset.id === "refactor-planning" ? "advisory" : "diagnosis";
    }
  };

  for (const option of options) {
    option.addEventListener("click", () => activate(option));
  }
};

const initInteractions = () => {
  initDiagnosticSelectors();
  initAuditWalkthrough();
  initAdvisoryFlow();
};

document.addEventListener("DOMContentLoaded", initInteractions);
document.addEventListener("astro:after-swap", () => window.requestAnimationFrame(initInteractions));
document.addEventListener("astro:page-load", initInteractions);
initInteractions();
