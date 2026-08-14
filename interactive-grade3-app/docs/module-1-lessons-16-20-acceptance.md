# Module 1 Lessons 16–20: Teacher Edition acceptance

Status: passed on 2026-08-13.

## Source evidence

| Lesson | Problem Set pages | Answer-key pages | Source-distinct implementation |
| --- | --- | --- | --- |
| 16 | 216–217 | 319–320 | Four 5-plus-more split arrays with complete equation chains, cloud-and-balloon fact matching, and Nolan's split 10-by-4 array explanation |
| 17 | 227–228 | 321–322 | The printed ten-row butterfly model with ten multiplication/division fact pairs, a 36-muffin tape, an equal-row glasses problem, and a money tape problem |
| 18 | 240–241 | 323–324 | Four printed number bonds with their five-line distributive chains, one open number-bond workspace, and two source-required open read-draw-write problems |
| 19 | 250–251 | 325 | Four decomposed division arrays with exact equation chains, bucket-and-ball expression matching, and Nell's split 24-divided-by-2 array explanation |
| 20 | 262–263 | 326–327 | Magazine-and-books two-stage tapes, a seven-part silly-band tape with one-child and three-child braces, and three open read-draw-write problems |

All 22 problems are fingerprinted by the corresponding schema-v2 contracts in `teacher-edition-baseline/visual-layout-contracts/m1/`.

## Validation evidence

- The pre-correction source-layout run failed all 22 problems because the previous implementation used generic visual structures instead of each printed problem's controlling layout.
- The corrected five-lesson source-layout run passed all 22 problems in Blank and Solved modes.
- `validate:teacher-baseline`, `validate:source-visual-contracts`, `validate:no-pdf-problem-tabs`, `validate:problem-centered-delivery`, and `validate:solved-fidelity` passed.
- The production build passed.
- Blank mode preserves the exact printed mathematical structure while exposing equation inputs, number-bond inputs, matching activities, drawing canvases, and written responses. Solved mode keeps that structure and adds only source-supported answers and models.

## Browser acceptance

An isolated agent-owned Chrome tab group in the authorized `Gemini` profile was used. No existing user tab was claimed or navigated.

All 20 states were captured and visually inspected:

- Lessons 16, 17, 18, 19, and 20
- Concept, Blank Problem Set, Solved Problem Set, and Summary for each lesson

Results: 0 route failures, 0 console warnings or errors, 0 document-level horizontal overflows, 0 overflowing problem cards, and 0 broken images. The Blank and Solved states were reviewed after their in-view animations completed. The visual pass caught and corrected narrow matching labels in Lessons 16 and 19 and an overly tall Lesson 17 solved fact table; the final states use compact, readable source-shaped layouts.

Representative interaction tests passed in every lesson: Lesson 16 equation validation and click matching, Lesson 17 fact-input validation and persistence after navigation within the page, Lesson 18 number-bond equation validation, Lesson 19 click matching, and Lesson 20 tape-response validation. Source-required drawing canvases and clear controls are present in Lessons 17, 18, and 20.

Functional blockers remaining: none for this five-lesson batch.
