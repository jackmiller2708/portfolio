# Quality Gate: Manual Checklists

While automated testing catches the majority of regressions, certain experiential attributes require manual validation against these checklists before finalizing a phase.

## Keyboard Navigation

Verify the application can be operated completely via keyboard without a mouse:

- [ ] **Tab Order**: Pressing `Tab` moves focus left-to-right, top-to-bottom in a logical flow.
- [ ] **Focus Visibility**: Every interactive element (links, buttons, form inputs) has a clearly visible focus indicator (`outline` or equivalent style).
- [ ] **No Focus Traps**: Focus never gets "stuck" inside a component (e.g., you can always `Tab` or `Shift+Tab` out of forms and overlays).
- [ ] **Interactive Elements**: All interactive controls can be activated using the `Enter` or `Space` key.
- [ ] **Skip Links (if applicable)**: Ensure skip links (like "Skip to main content") function correctly.

## Reduced Motion Verification

Verify the application respects user operating system preferences for reduced motion:

- [ ] **Simulate Preference**: In Chrome DevTools > Rendering > Emulate CSS media feature `prefers-reduced-motion` > set to `reduce`.
- [ ] **Disable Animations**: Ensure non-essential animations (e.g., page transitions, decorative hovering, infinite loops) are disabled.
- [ ] **Instant Transitions**: Ensure state changes (e.g., form validation appearances, button active states) happen instantly rather than fading or sliding.
- [ ] **HeroSystemMap**: Ensure the system map does not automatically pan or scale when the user prefers reduced motion.
