# Lesson 20 source-fidelity design QA

## Comparison target

- Source visual truth: `public/source-pages/m2-teacher/page-252.png` and `public/source-pages/m2-teacher/page-253.png`, plus the selected Teacher Edition worked-reference screenshots supplied with the task.
- Implementation: `http://localhost:4220/ruchika-grade3/modules/m2/lessons/20/problem-set/solved`.
- Implementation screenshot: `../tmp/lesson20-source-faithful/solved-full-final.png`.
- Viewport: 1,860 × 940 CSS pixels, device pixel ratio 1.
- State: Module 2, Lesson 20, Problem Set, Solved. Blank mode was checked separately.

## Full-view comparison evidence

- Problem 1 side-by-side: `../tmp/lesson20-source-faithful/comparison-problem1.png`.
- Problems 2–3 side-by-side: `../tmp/lesson20-source-faithful/comparison-problems2-3.png`.
- The comparison confirms the same source order, quantities, operations, selected closest estimates, tape relationships, estimate choices, and exact answers.

## Focused-region evidence

- Fruit-scale source asset: `../tmp/lesson20-source-faithful/problem3-source-scale.png`.
- Focused evidence was required because the exact source illustration and `500 g` readout were too small to judge reliably in the full-page comparison.

## Findings and comparison history

1. Initial P1 — Problem 1 was a generic six-column data table and did not preserve the Teacher Edition A/B worksheet or explanation structure.
   - Fix: added the exact two-column, eight-row source workbook, the four correct circled estimates, and source-specific distance reasoning.
   - Post-fix evidence: `comparison-problem1.png` shows all eight exact and rounded calculations in source order.

2. Initial P1 — Problem 3 substituted a generic code-drawn scale for the source fruit-scale picture.
   - Fix: replaced it with a tightly measured crop of the real Teacher Edition page asset at `public/source-pages/m2-teacher/page-253.png`.
   - Post-fix evidence: `problem3-source-scale.png` shows the original fruit illustration and `500 g` readout.

3. Initial P1 — Blank Problem 1 exposed solved distance labels and explanations.
   - Fix: Blank mode now renders an open explanation/number-line workspace; solved reasoning and the motion control are absent.
   - Post-fix evidence: DOM validation confirmed the blank workspace is present, solved distance reasoning is absent, and the solved motion control is absent.

4. Initial P2 — The development launcher appeared frozen for more than a minute.
   - Fix: strict template compilation and production optimization were removed from the internal-app path; the launcher reuses an active watcher and dispatches a cold start without HTTP polling.
   - Durable behavior: serving and normal builds use the fast internal configuration. There is no test suite or blocking benchmark; only a 1 GB build-output warning and a two-minute cold-launch log warning remain as drastic-failure guardrails.

## Required fidelity surfaces

- Fonts and typography: existing application type tokens are preserved; equation values use tabular numerals, strong weights, and readable line heights. No clipping or truncation was observed.
- Spacing and layout rhythm: the A/B source hierarchy is preserved with equal columns, consistent row height, and a distinct explanation region. Problems 2 and 3 follow estimate → tape → exact answer without unrelated cards.
- Colors and visual tokens: existing Module 2 tokens remain intact. Green identifies only the four closest estimates and correct reasoning; blue distinguishes rounded work without changing source meaning.
- Image quality and asset fidelity: the fruit-scale illustration is the real Teacher Edition raster asset, sharply rendered at its native crop. It is not a placeholder, approximation, or generated substitute.
- Copy and content: all eight Problem 1 calculations match the worked source. Problem 2 shows about 200 L and exactly 188 L. Problem 3 shows about 130 g using nearest-ten rounding and exactly 128 g.

## Interaction and runtime checks

- Blank/Solved toggle: passed.
- Continuous solved step-through: passed.
- Pause and Play step-through controls: passed.
- Source image load: passed (`naturalWidth > 0`).
- Horizontal overflow: none (`scrollWidth = clientWidth = 1,860`).
- Browser warnings/errors: none.

## Follow-up polish

- No P0/P1/P2 findings remain for the selected Lesson 20 states. Minor stylistic differences from the scanned handwriting are intentional: the app uses readable live text while preserving the mathematical structure and source illustration.

final result: passed

---

# Lesson 21 source-fidelity design QA

## Comparison target

- Source visual truth: `EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf`, lesson pages 257-266 and answer-key page 304.
- Implementation: `http://localhost:4220/ruchika-grade3/modules/m2/lessons/21/problem-set/solved`.
- Viewport: 1,920 × 996 CSS pixels in a dedicated agent-owned Chrome tab in the authorized `Gemini` profile.
- States inspected after the final implementation: Concept, Blank Problem Set, Solved Problem Set, and Summary.

## Source-fidelity result

1. Problem 1 preserves the official beans-and-rice scale relationship rather than substituting a generic table. The solved sequence shows `91 g ≈ 90 g`, `58 g ≈ 60 g`, the `150 g` estimate, `149 g` exact total, `30 g` estimate, `33 g` exact difference, and both reasonableness gaps.
2. Problem 2 preserves the three yarn measurements and rounded values, estimate-before-exact order, and the `88 cm + 14 cm = 102 cm` tape relationship.
3. Problem 3 preserves three distinct vertical number lines for Containers D, E, and F, their exact-to-rounded mappings, the `650 mL`/`645 mL` totals, the `30 mL`/`26 mL` differences, and the D-to-E tape relationship.
4. Problem 4 preserves the five source trailer lengths, `21`-minute total, `100`-minute estimate, `94`-minute exact movie length, six-minute reasonableness gap, and the full theater-time tape relationship.

## Visual corrections found during the browser pass

- The first scale implementation nested unsupported measurement cards and rendered empty readings. It was replaced with one populated measurement model containing both source masses.
- Problem 3 initially repeated number-line headings and the `195 mL` label at the plotted marker. The number-line labels were consolidated so each container and measured-to-rounded mapping appears once.
- The official Problem 1 source crop was constrained to the lesson workspace width without clipping or document-level overflow.

## Acceptance checks

- Concept: exact source measurements are present; measure → round → estimate → exact → reasonableness is explicit; Replay animation is available.
- Blank: all four official problems and their source scaffolds are present; solved totals, differences, and explanations are absent.
- Solved: every requested subpart, unit, estimate, exact answer, tape/number-line relationship, and reasonableness statement matches the Teacher Edition answer key.
- Summary: `Remember`, `Explain`, and `Check` are student-facing; no internal authoring guidance is exposed.
- Layout: `scrollWidth = clientWidth = 1,920`; no unintended horizontal clipping.
- Runtime: 0 browser warnings/errors after the final reload.

final result: passed
