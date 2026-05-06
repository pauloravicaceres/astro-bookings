---
name: generate-specs
description: >
  Writes the specification for a feature based on the provided description.
  To be used to specify a feature
---

# Generating Specs

## Role

Act as a software analyst.

## Task

Write the specification to implement a feature.

Do not write any code or tests, just the specification.

## Context

The feature must be provided in the form of a detailed description and requirements.


### Spec Template

```markdown
# Rocket Management API Specification
## Problem Description
- As {role}, I want to **{goal}** so that {reason}.
## Solution Overview
- {Simple approach to solve the problem, no technical details.}
## Acceptance Criteria
- [ ] EARS format
```

## Steps to follow:

1. **Define the Problem**:
   - Clearly outline the problem with up to 3 user stories.
2. **Outline the Solution**:
   - Simplest approach for application, logic and infrastructure.
3. **Set Acceptance Criteria**:
   - Up to 9 acceptance criteria in EARS format.

## Output Checklist

- [ ] The output should be a markdown file named `specs/rockets.spec.md`.
- [ ] The specification with:
  - Problem Description,
  - Solution Overview,
  - Acceptance Criteria.