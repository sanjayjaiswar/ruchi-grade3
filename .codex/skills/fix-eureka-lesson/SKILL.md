---
name: fix-eureka-lesson
description: Repair and fully implement a named Eureka Math Grade 3 module lesson using the local Teacher Edition as the factual source of truth and Lesson 20 quality as the interaction and visual baseline. Use for requests such as "fix Module 2 Lesson 21," "make this lesson source-faithful," "apply the Lesson 20 pattern," or lesson-level content, visual, animation, Blank/Solved, and browser acceptance work.
---

# Fix Eureka Lesson

Implement the requested lesson completely. Do not stop at an audit, generic scaffold, metadata rewrite, or code-only assumption.

## Required workflow

1. Parse the module and lesson from the request. Work only in this Grade 3 repository.
2. Read `references/lesson-20-baseline.md` before changing lesson code.
3. Locate the matching local Teacher Edition PDF. Treat it as the source of truth; never derive curriculum facts from the portal.
4. Render and inspect the lesson objective, Concept Development, Problem Set, Student Debrief, and answer-key pages. Use text extraction only as a search aid.
5. Build a compact source contract containing:
   - exact objective and instructional sequence;
   - every official problem in order;
   - exact quantities, equations, units, answers, and permitted variable responses;
   - source-specific diagrams, tables, scales, number lines, tapes, or pictures;
   - what Blank mode may reveal and what Solved mode must reveal;
   - the reasonableness, explanation, or debrief evidence required.
6. Compare the contract with the existing runtime and rendered lesson. Mark each requirement as present, partial, wrong, generic, or absent.
7. Implement every gap across the relevant surfaces:
   - lesson runtime concept animation and teacher prompts;
   - problem-centered lesson data;
   - source-specific visual types/templates/styles when generic components cannot express the source faithfully;
   - real Teacher Edition assets when the source picture matters;
   - Blank/Solved answer isolation;
   - replay or meaningful step-through motion, with reduced-motion support;
   - visible Teacher Edition provenance.
8. Prefer authored HTML/CSS/SVG/data-driven visuals over screenshots for mathematical models. Use a tightly cropped Teacher Edition image when the original illustration itself carries meaning.
9. Preserve the source problem order and visual relationships. Do not replace an official problem with a parallel example, generic chart, decorative animation, or invented numbers.
10. Add durable lesson-specific assertions to an existing manual source-contract validator. Do not create `.spec.ts` files or wire validators into normal start/build.
11. Build the app. Then use `.codex/skills/browser-profile-validation/SKILL.md` and an isolated authorized Chrome tab to inspect Concept, Blank Problem Set, Solved Problem Set, and Summary at a desktop viewport.
12. Visually confirm exact content, readable hierarchy, meaningful motion, zero unintended horizontal overflow, and no browser warnings/errors. Code presence alone is not acceptance.
13. Record durable acceptance facts in the repository. Keep screenshots, rendered PDF pages, and other transient evidence only under ignored `tmp/`.

## Quality gates

- Every source problem is individually represented; "representative" coverage fails.
- Every numeric value and answer matches the Teacher Edition or is explicitly identified as variable.
- Solved mode teaches the reasoning sequence, not only the final number.
- Blank mode preserves the student task without leaking solved answers.
- Visuals encode the actual mathematical relationship and are not generic decoration.
- Animation reveals or compares instructional states; continuous decorative motion does not count.
- A lesson is complete only after source comparison, implementation, build, and isolated visual verification all pass.

## Completion report

State what was fixed, which Teacher Edition pages governed the work, which four lesson states were visually checked, and what remains. Never claim a whole module is certified when only one lesson was completed.
