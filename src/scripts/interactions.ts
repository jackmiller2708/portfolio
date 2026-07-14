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

  const phaseLabels = [...phases].reduce<Record<string, string>>((labels, phase) => {
    const key = phase.dataset.phase;

    if (key) {
      labels[key] = phase.textContent?.trim() ?? key;
    }

    return labels;
  }, {});

  const updatePanel = () => {
    if (!activeFinding || !label || !title || !copy) {
      return;
    }

    withStateFade(panel, () => {
      label.textContent = phaseLabels[activePhase] ?? phaseLabels.symptom ?? activePhase;
      title.textContent = activeFinding.dataset.title ?? "";
      copy.textContent = activeFinding.dataset[activePhase] ?? "";
    });
  };

  const setRovingTabindex = (items: HTMLButtonElement[], active: HTMLButtonElement) => {
    for (const item of items) {
      item.tabIndex = item === active ? 0 : -1;
    }
  };

  const selectFinding = (finding: HTMLButtonElement) => {
    activeFinding = finding;
    for (const item of findings) {
      const isActive = item === finding;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    }
    setRovingTabindex(findingsList, finding);
    updatePanel();
  };

  const selectPhase = (phase: HTMLButtonElement) => {
    activePhase = phase.dataset.phase ?? "symptom";
    for (const item of phases) {
      const isActive = item === phase;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    }
    setRovingTabindex(phasesList, phase);
    updatePanel();
  };

  const findingsList = [...findings];
  const phasesList = [...phases];

  setRovingTabindex(findingsList, findingsList[0]);
  setRovingTabindex(phasesList, phasesList[0]);

  for (const finding of findings) {
    finding.addEventListener("click", () => selectFinding(finding));
  }

  findingsList.forEach((finding, index) => {
    finding.addEventListener("keydown", (event) => {
      let nextIndex: number | null = null;

      if (event.key === "ArrowDown") nextIndex = (index + 1) % findingsList.length;
      else if (event.key === "ArrowUp") nextIndex = (index - 1 + findingsList.length) % findingsList.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = findingsList.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        const next = findingsList[nextIndex];
        next.focus();
        selectFinding(next);
      }
    });
  });

  for (const phase of phases) {
    phase.addEventListener("click", () => selectPhase(phase));
  }

  phasesList.forEach((phase, index) => {
    phase.addEventListener("keydown", (event) => {
      let nextIndex: number | null = null;

      if (event.key === "ArrowRight") nextIndex = (index + 1) % phasesList.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + phasesList.length) % phasesList.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = phasesList.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        const next = phasesList[nextIndex];
        next.focus();
        selectPhase(next);
      }
    });
  });
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
