# Module 1 Lessons 11–15: Teacher Edition acceptance

Status: passed on 2026-08-13.

## Source evidence

| Lesson | Problem Set pages | Answer-key pages | Source-distinct implementation |
| --- | --- | --- | --- |
| 11 | 157–158 | 309–310 | Printed array-and-tape model, unknown-factor labeling, division arrays, equal-unit tapes, and the money tape problem |
| 12 | 169–170 | 311–312 | Bird grouping, printed fish bowls, rabbit-fact matching, printed ribbon tape, and two open model-and-work problems |
| 13 | 181–182 | 313–314 | Complete units-of-3 fact family, tomato grouping with array and tape, stamps array, van grouping, and frozen-yogurt money tape |
| 14 | 194–195 | 315–316 | Count-by-four fruit matching, wheel tape, bead tape, and rectangle-side array |
| 15 | 205–206 | 317–318 | Three printed tape-to-array transformations, paired 4-by-6 and 6-by-4 tapes, flower-petal tape, and chair-leg array |

All 24 problems are fingerprinted by the corresponding schema-v2 contracts in `teacher-edition-baseline/visual-layout-contracts/m1/`.

## Validation evidence

- The pre-correction source-layout run failed all 24 problems because the previous implementation used generic visual structures instead of each printed problem's controlling layout.
- The corrected five-lesson source-layout run passed all 24 problems in Blank and Solved modes.
- `validate:teacher-baseline`, `validate:source-visual-contracts`, `validate:no-pdf-problem-tabs`, `validate:problem-centered-delivery`, and `validate:solved-fidelity` passed.
- The production build passed.
- Blank mode exposes equation inputs, drawing canvases, written responses, and click matching without answer-key completions. Solved mode keeps the printed structure and adds only source-supported models and responses.

## Browser acceptance

An isolated agent-owned Chrome tab group in the authorized `Gemini` profile was used. No existing user tab was claimed or navigated.

All 20 states were captured and visually inspected:

- Lessons 11, 12, 13, 14, and 15
- Concept, Blank Problem Set, Solved Problem Set, and Summary for each lesson

Results: 0 route failures, 0 console warnings or errors, 0 document-level horizontal overflows, and 0 broken images. The settled Blank and Solved states were recaptured after animations completed. The visual pass also caught and removed unrelated neighboring text from source crops in Lessons 11–13.

Representative interaction tests passed: Lesson 12 equation validation and click matching, Lesson 13 fact-input persistence across Angular rerender, Lesson 14 click matching, and Lesson 15 equation validation. Drawing canvases and clear controls are present in the source-required open-work problems.

Functional blockers remaining: none for this five-lesson batch.
