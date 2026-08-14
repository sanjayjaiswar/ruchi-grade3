# Module 1 Lesson 21: Teacher Edition acceptance

Status: passed on 2026-08-13.

## Source evidence

- Controlling Problem Set pages: Teacher Edition pages 272–273.
- Controlling answer-key page: Teacher Edition page 328.
- Problem 1 preserves the printed five-part Jason tape: four $6 weeks, one $4 week, the whole brace, the two equations, and the $28 answer.
- Problem 2 preserves the printed four-pack tape and the 3-to-1 lower tape: 28 markers, 6 left, and 22 students.
- Problem 3 keeps the source-required drawing workspace open in Blank mode and supplies only the source-supported three-flavor and remaining-snacks tapes in Solved mode.
- Problem 4 keeps two separate source-required drawing workspaces open in Blank mode and supplies the 7-piece and 5-piece solved models only in Solved mode.
- The Concept animation uses official Problem 1 instead of a parallel app-authored example. It follows the Teacher Edition culmination: model, solve, check, and explain.

All four problems are fingerprinted by the schema-v2 contract in `teacher-edition-baseline/visual-layout-contracts/m1/lesson-21.json`.

## Validation evidence

- The pre-correction source-layout run failed all four problems because their generic visual structures did not match the controlling Teacher Edition layouts.
- The corrected Lesson 21 source-layout run passed all four problems in Blank and Solved modes.
- `validate:teacher-baseline`, `validate:source-visual-contracts -- --lessons m1-l21`, `validate:no-pdf-problem-tabs`, `validate:problem-centered-delivery`, and `validate:solved-fidelity` passed.
- The production build passed.
- Blank and Solved remain isolated: Blank has six answer fields, three drawing canvases, and four written-response areas; Solved has no answer inputs or canvases and adds only source-supported work.

## Browser acceptance

An isolated agent-owned Chrome tab group in the authorized `Gemini` profile was used. No existing user tab was claimed or navigated.

Concept, Blank Problem Set, Solved Problem Set, and Summary were captured and visually inspected at the desktop review viewport. Results: 0 route failures, 0 console warnings or errors, 0 document-level horizontal overflows, 0 overflowing problem cards, and 0 broken images.

Interaction evidence:

- All six Blank answer fields accepted the controlling answers and entered the correct state.
- The unequal Problem 2 tape retained its source-relative 3-to-1 width relationship.
- A pointer drag produced a visible stroke in Problem 3's drawing canvas.
- `Clear drawing` removed that stroke.
- All three source-required canvases and all four written-response areas were present.
- The Concept replay control worked, the official equation chain was present, and the unrelated `(24 - 6) ÷ 3 = 6` example was absent.

Functional blockers remaining: none for Lesson 21.
