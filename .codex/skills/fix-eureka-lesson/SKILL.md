---
name: fix-eureka-lesson
description: Deliver a functional, source-faithful first pass for five Eureka Math Grade 3 lessons using the precomputed local Teacher Edition baseline. Use for requests such as "fix Module 2 Lesson 21," "fix the next five lessons," or "make these lessons match the Teacher Edition" when content accuracy, exact problem coverage, mathematical models, meaningful animation, Blank/Solved behavior, and efficient batch delivery matter more than pixel polish.
---

# Fix Eureka Lesson

Implement a complete functional-fidelity pass for five consecutive lessons, starting with the named lesson and stopping at the module boundary. If the user explicitly names a different range or requests only one lesson, honor that range. Do not stop at an audit, generic scaffold, metadata rewrite, or code-only assumption. Do not turn this skill into a pixel-perfection pass.

## Priority

The goal is an accurate, effective internal learning application—not pixel-perfect reproduction. Prioritize, in order:

1. Teacher Edition factual accuracy and exact problem coverage.
2. Clear mathematical models, instructional sequence, and reasoning.
3. Blank/Solved answer isolation and readable interaction.
4. Stable rendering with no blocking runtime errors or unusable overflow.
5. Cosmetic consistency.

Do one complete functional/source-faithful pass across the batch before spending time on visual polish. Do not delay delivery for minor spacing, typography, decorative styling, scan-like appearance, non-blocking development warnings, or repeated screenshots of shared components. Record those items as optional follow-up polish unless they obscure the mathematics or make the lesson hard to use.

Teacher Edition drift is never optional polish. Treat any wrong objective, omitted or reordered problem, invented quantity, wrong equation or answer, generic replacement for a source-specific model, answer leak, or explanation that changes the source reasoning as a blocking failure. Fix every such failure in the current five-lesson batch before calling it complete.

## Functional first-pass boundary

A lesson passes this skill when all of the following are true:

- its objective, facts, problem order, quantities, equations, units, answers, and reasoning conform to its Teacher Edition contract;
- every official task is present, including multi-part and variable-response requirements;
- the core mathematical relationship is shown with the correct source-specific model, labels, and values;
- the lesson's instructional sequence has meaningful reveal, comparison, manipulation, or step-through motion when the source teaches through a sequence;
- Blank mode preserves the authentic student task without answer leakage, and Solved mode shows understandable reasoning rather than only a final answer;
- the lesson renders and remains usable at the standard desktop acceptance viewport.

The first pass does not include scan imitation, pixel matching, ornamental animation, exhaustive breakpoint tuning, micro-spacing, font matching, decorative illustration, or cleanup of non-blocking internal development warnings. Do not spend batch time on those after the functional gates pass. A separate polish pass may be requested later.

## Throughput rules

- Work breadth-first across the five lessons: source/data for all five, models for all five, motion for all five, Blank/Solved for all five, then one validation sweep. Do not perfect one lesson while the others remain generic.
- Use the precomputed contracts immediately. Baseline preparation, OCR, whole-PDF review, and repeated page rendering are not normal lesson work.
- Prefer the smallest existing semantic visual that accurately expresses the Teacher Edition relationship. Extend a shared renderer once when needed; do not create five ornamental one-off implementations.
- Give each source-distinct core concept a meaningful instructional sequence. Do not animate every decoration or every repeated problem row.
- Build once after the batch implementation, then perform one isolated browser sweep. Recheck only failed or changed states.
- Keep the acceptance record compact and factual. Do not create a long design critique or pixel-polish backlog during this pass.
- If one lesson has a genuine source ambiguity, continue implementing the unambiguous lessons while resolving it. Do not let optional polish on one lesson consume the batch.

## Required workflow

1. Parse the module and starting lesson from the request. By default, create a batch of that lesson plus the next four lessons in the same module. Work only in this Grade 3 repository.
2. Read `references/lesson-20-baseline.md` and `references/teacher-edition-baseline.md` before changing lesson code.
3. From `interactive-grade3-app`, run `npm run validate:teacher-baseline`. When it passes, use `teacher-edition-baseline/index.json` to load exactly the five requested contracts. These committed contracts are the normal source-preparation layer; do not repeat PDF extraction, OCR, page searching, or full-PDF rendering.
4. Treat each contract as the batch source contract. Use its exact objective, instructional sequence, official Problem Set and answer-key text, quantities, units, models, animation evidence, source images, and Blank/Solved rules. If `structuredPromptStatus` is `review-source-layout`, use the raw Problem Set/answer-key text and listed source image as controlling evidence rather than trusting flattened structured prompt order.
5. Regenerate the baseline only when validation reports a missing/invalid contract or changed Teacher Edition PDF fingerprint. Run `npm run generate:teacher-baseline` once, then validate again. The generator reuses the ignored repository cache under `tmp/teacher-edition-cache/`; render an individual page only if the regenerated contract still flags a genuinely ambiguous visual relationship.
6. Compare the five contracts with the existing runtime and rendered lessons. Reuse exact source-specific data and visuals that already pass; mark every other requirement as present, partial, wrong, generic, or absent. A precomputed contract is preparation evidence, not proof that a lesson is implemented.
7. Implement the batch in shared passes: first source-accurate runtime/concept data for all five lessons, then source-conforming problem models for all five, then meaningful instructional motion for all five, then Blank/Solved isolation, and finally only the styling required for readability. Extract shared helpers only when the lessons genuinely share a mathematical structure. Implement every gap across the relevant surfaces:
   - lesson runtime concept animation and teacher prompts;
   - problem-centered lesson data;
   - source-specific visual types/templates/styles when existing components cannot express the source faithfully;
   - real Teacher Edition assets when the source picture matters;
   - Blank/Solved answer isolation;
   - replay or meaningful step-through motion that follows the Teacher Edition learning sequence, with reduced-motion support;
   - visible Teacher Edition provenance.
8. Prefer authored HTML/CSS/SVG/data-driven visuals over screenshots for mathematical models. Use a tightly cropped Teacher Edition image when the original illustration itself carries meaning. Match the mathematical relationship and labels; do not spend the first pass imitating scan texture, handwriting, or irrelevant page ornament.
9. Preserve the source problem order and visual relationships. Do not replace an official problem with a parallel example, generic chart, decorative animation, or invented numbers.
10. Add focused, durable lesson-specific assertions for the whole batch to the existing manual source-contract validator. Assert source facts, problem coverage, model choice, answers, and Blank/Solved isolation. Do not create `.spec.ts` files, large snapshot suites, or validators wired into normal start/build.
11. Build once after the five-lesson implementation pass. Then use `.codex/skills/browser-profile-validation/SKILL.md` and one isolated authorized Chrome tab to inspect Concept, Blank Problem Set, Solved Problem Set, and Summary for every lesson in a single navigation sweep. Do not repeat browser setup or restart the server between lessons.
12. Capture compact DOM/text/overflow/error checks for all 20 lesson states. Visually inspect each source-distinct concept or problem model once; DOM/content checks are sufficient for repeated shared layouts. Confirm exact content, readable hierarchy, meaningful motion, no blocking runtime errors, and no unusable horizontal overflow. Revisit only failures. Code presence alone is not acceptance.
13. Update one compact durable batch acceptance record in the repository, with a row for each lesson and explicit functional failures if any remain. Do not turn it into a visual-design report. Keep screenshots, rendered PDF pages, cached extraction, and other transient evidence only under ignored `tmp/`.

## Quality gates

- Every source problem is individually represented; "representative" coverage fails.
- Every numeric value and answer matches the Teacher Edition or is explicitly identified as variable.
- A generic lesson scaffold does not pass merely because its arithmetic is valid; it must teach and model the actual Teacher Edition lesson and Problem Set.
- Solved mode teaches the reasoning sequence, not only the final number.
- Blank mode preserves the student task without leaking solved answers.
- Visuals encode the actual mathematical relationship and are not generic decoration; exact pixel matching is not required when the live model teaches the same source relationship clearly.
- Animation follows the core Teacher Edition instructional sequence by revealing, comparing, grouping, decomposing, measuring, plotting, or transforming meaningful states. Continuous decorative motion does not count, and repeated problems do not each require unique animation.
- A lesson is complete only after source comparison, implementation, build, and isolated visual verification all pass. A batch is not complete merely because four of five lessons pass.

## Completion report

State which five lessons received the functional fidelity pass, which Teacher Edition pages governed each lesson, which 20 lesson states were checked, and what functional blockers remain. Mention cosmetic polish only as deferred and do not enumerate minor pixel issues unless they impede learning. Never claim a whole module is certified when only a five-lesson batch was completed.
