---
name: fix-eureka-lesson
description: Build, validate, and correct a batch of five Eureka Math Grade 3 lessons against the local Teacher Edition text and page images. Use for requests such as "fix Module 2 Lesson 21," "fix the next five lessons," "build these lessons in batches," or "make these lessons match the Teacher Edition" when exact problem coverage, source-layout fidelity, mathematical models, Blank/Solved isolation, meaningful animation, and fail-closed batch validation are required.
---

# Fix Eureka Lesson

Implement, validate, and correct five consecutive lessons, starting with the named lesson and stopping at the module boundary. If the user explicitly names a different range or requests only one lesson, honor that range. Work breadth-first. Do not stop at an audit, generic scaffold, metadata rewrite, validator-only change, or code-only assumption.

## Priority

Prioritize, in order:

1. Teacher Edition factual accuracy, exact problem coverage, and source-layout fidelity.
2. Correct visual primitive, count, orientation, grouping, labels, response structure, and instructional sequence.
3. Blank/Solved answer isolation and readable interaction.
4. Stable rendering with no blocking runtime errors or unusable overflow.
5. Cosmetic consistency.

Source-layout fidelity is functional, not cosmetic. A cube may not become a dot; a vertical stack may not become an array; an open response area may not become a segmented tape; a thought/speech-bubble riddle may not become unrelated cards. Preserve the source's model family, primitive, count, orientation, grouping, relative order, printed labels, blanks, dividers, and open workspace. Scan texture, exact fonts, and ornamental page chrome remain optional unless they carry mathematical meaning.

Teacher Edition drift is never optional polish. Treat any wrong objective, omitted or reordered problem, invented quantity, wrong equation or answer, generic replacement for a source-specific model, answer leak, or explanation that changes the source reasoning as a blocking failure. Fix every such failure in the current five-lesson batch before calling it complete.

## Fail-closed rules

- The Teacher Edition PDF, its rendered Problem Set pages, and its answer key are the only acceptance authority. Baselines and page-level contracts are fingerprinted transcriptions of that source, not independent specifications. Implementation code, renderer names, prior acceptance documents, and hand-authored regression checks can diagnose a problem but can never establish correctness.
- OCR and flattened structured prompts control wording and arithmetic only. They are never proof of page layout, visual primitive, orientation, grouping, or response structure.
- `visualContract.modelsDetected` is a lesson-level candidate list, not a problem-to-renderer assignment. Never select a renderer from it without page-level evidence.
- Validators and prior acceptance records are implementation evidence, not source evidence. When they conflict with a Teacher Edition page image, the source wins and the validator/record must be corrected.
- Generic fallback renderers are prohibited for every source-distinct problem in the active batch. If no existing renderer can express the source layout, extend a shared renderer or add the smallest source-specific renderer.
- Do not infer repeated units, tape segments, answer choices, scaffolds, or equations that are absent from Blank mode in the source. Preserve open workspace as open workspace.
- Missing, incomplete, black, clipped, or ambiguous source-page evidence blocks visual acceptance for that problem. Render only the required page into ignored repository `tmp/` and inspect it; do not guess.
- Never mark a lesson or batch complete from build and semantic assertions alone. Source comparison and rendered-state verification are mandatory.

## Batch visual contract

Before changing implementation code, inspect all Problem Set page images for all lessons in the batch and author one page-level visual-layout contract per lesson under:

`interactive-grade3-app/teacher-edition-baseline/visual-layout-contracts/mN/lesson-XX.json`

For every official problem and subpart, record:

- the controlling Teacher Edition PDF fingerprint, rendered source image, image SHA-256, and PDF page number;
- exact source wording and exact answer-key evidence;
- source-observed primitive/model family and whether it is printed, student-authored, or absent;
- source-observed count, orientation, grouping, order, relative placement, labels, blanks, dividers, and open-workspace requirements;
- answer-key-backed Blank-mode prohibitions and Solved-mode requirements.

Never record a renderer, component, runtime path, internal type, selector, or other implementation-authored structure as an expected value. The validator may adapt implementation state into a neutral canonical signature, but every expected value in that signature must be a direct observation from the fingerprinted Teacher Edition page. If a fact cannot be supported by the page, answer key, or instructional text, it is not an acceptance requirement.

Run the source-visual validator immediately after authoring the contracts. Existing generic implementations should fail before correction. Keep that red result as evidence that the contract can detect drift; a contract written only after implementation passes is not an independent gate.

## Throughput rules

- Work breadth-first across the five lessons: inspect all source pages and author all visual contracts; correct source/data for all five; correct models for all five; correct motion for all five; correct Blank/Solved for all five; then perform one validation sweep.
- Use the precomputed contracts immediately. Baseline preparation, OCR, whole-PDF review, and repeated page rendering are not normal lesson work.
- Prefer the smallest existing semantic visual that expresses the recorded page-level contract. Reuse a renderer only when its primitive, structure, and response layout conform; arithmetic equivalence alone is insufficient.
- Give each source-distinct core concept a meaningful instructional sequence. Do not animate every decoration or every repeated problem row.
- Build once after the batch implementation, then perform one isolated browser sweep. Recheck only failed or changed states.
- Keep the acceptance record compact and factual. Do not create a long design critique or pixel-polish backlog during this pass.
- If one lesson has a genuine source ambiguity, continue implementing the unambiguous lessons while resolving it. Do not let optional polish on one lesson consume the batch.

## Required workflow

1. Parse the module and starting lesson from the request. By default, create a batch of that lesson plus the next four lessons in the same module. Work only in this Grade 3 repository.
2. Read `references/lesson-20-baseline.md` and `references/teacher-edition-baseline.md` before changing lesson code.
3. From `interactive-grade3-app`, run `npm run validate:teacher-baseline`. When it passes, use `teacher-edition-baseline/index.json` to load exactly the requested contracts.
4. Treat contract text as the wording/arithmetic contract. Inspect every listed Problem Set page image in one batch before choosing any renderer, even when `structuredPromptStatus` is `ready`. If an image is unavailable or unusable, render only the listed Problem Set PDF page into ignored repository `tmp/`.
5. Regenerate the baseline only when validation reports a missing/invalid contract or changed Teacher Edition PDF fingerprint. Run `npm run generate:teacher-baseline` once, then validate again. The generator reuses the ignored repository cache under `tmp/teacher-edition-cache/`; render an individual page only if the regenerated contract still flags a genuinely ambiguous visual relationship.
6. Author or update all page-level visual-layout contracts before implementation. Run `npm run validate:source-visual-contracts -- --lessons mN-lX,...` and confirm that known generic/drifting states fail.
7. Compare the fingerprinted Teacher Edition evidence directly with the existing runtime and rendered lesson. Use the page-level contract only as a traceable transcription and index into that evidence. Reuse only source-conforming visuals. Mark every requirement present, partial, wrong, generic, absent, or blocked.
8. Implement the batch in shared passes: source-accurate runtime/concept data, source-conforming problem models, meaningful instructional motion, Blank/Solved isolation, then required readability styling. Implement every gap across:
   - lesson runtime concept animation and teacher prompts;
   - problem-centered lesson data;
   - source-specific visual types/templates/styles when existing components cannot express the source faithfully;
   - real Teacher Edition assets when the source picture matters;
   - Blank/Solved answer isolation;
   - replay or meaningful step-through motion that follows the Teacher Edition learning sequence, with reduced-motion support;
   - visible Teacher Edition provenance.
9. Prefer authored HTML/CSS/SVG/data-driven visuals. Use a tightly cropped source image when the original symbol or illustration carries meaning. Preserve source layout without imitating irrelevant scan texture.
10. Preserve source problem order and visual relationships. Do not replace an official problem with a parallel example, generic chart, decorative animation, invented scaffold, or merely equivalent arithmetic.
11. Run the Teacher Edition baseline and source-visual validators again until every batch contract passes. Run existing semantic and regression validators afterward as diagnostics only. They cannot certify source fidelity, override a Teacher Edition failure, or add an implementation-authored acceptance expectation. Fix stale validators whenever source evidence disproves them.
12. Build once. Then use `.codex/skills/browser-profile-validation/SKILL.md` and one isolated authorized Chrome tab to inspect Concept, Blank Problem Set, Solved Problem Set, and Summary for every lesson in one sweep.
13. Capture compact DOM/text/overflow/error checks for all lesson states. Compare every source-distinct Blank visual against its controlling page image side by side. Compare Solved mode against the answer key and visual contract. Revisit only failures. Code presence alone is not acceptance.
14. Update one compact durable batch acceptance record with contract-validation, build, and rendered-state evidence. Record blocked browser authorization as blocked—not passed. Keep screenshots, rendered PDF pages, and transient evidence only under ignored repository `tmp/`.

## Quality gates

- Every source problem is individually represented; "representative" coverage fails.
- Every numeric value and answer matches the Teacher Edition or is explicitly identified as variable.
- A generic lesson scaffold does not pass merely because its arithmetic is valid; it must teach and model the actual Teacher Edition lesson and Problem Set.
- Solved mode uses the Teacher Edition answer and a reasoning sequence directly supported by the Teacher Edition lesson, worked example, or answer-key evidence. Do not present an inferred scaffold as official source content.
- Blank mode preserves the student task without leaking solved answers.
- Visuals preserve the page-level primitive, count, orientation, grouping, labels, response structure, and open workspace. Equivalent arithmetic with a different visual model fails.
- Animation follows the core Teacher Edition instructional sequence by revealing, comparing, grouping, decomposing, measuring, plotting, or transforming meaningful states. Continuous decorative motion does not count, and repeated problems do not each require unique animation.
- The source-visual contract validator must demonstrate a failing pre-correction state and a passing corrected state.
- A lesson is complete only after direct Teacher Edition comparison, fingerprinted page-level source validation, build, and isolated rendered-state comparison with the Teacher Edition all pass. Semantic and regression checks may catch additional defects but cannot substitute for or redefine those source gates. A batch is not complete merely because four of five lessons pass.

## Completion report

State which five lessons received the functional fidelity pass, which Teacher Edition pages governed each lesson, which 20 lesson states were checked, and what functional blockers remain. Mention cosmetic polish only as deferred and do not enumerate minor pixel issues unless they impede learning. Never claim a whole module is certified when only a five-lesson batch was completed.
