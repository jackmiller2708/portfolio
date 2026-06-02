---
title: Unhandled data and error states in user-facing flows
severity: high
area: errors
evidence: Loading, empty, retry, and failure states are handled inconsistently across screens.
risk: Users see broken or ambiguous states during normal API failures.
recommendation: Introduce typed request states and shared error presentation rules.
sprint: 1
---

The audit checks whether user-facing failure states are designed or accidental.
