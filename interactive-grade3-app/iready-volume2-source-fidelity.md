# i-Ready Interactive Volume 2 source-fidelity contract

## Approved official sources

Volume 2 learner-facing curriculum, sequence, examples, values, page references, and mathematical focus may come only from these Curriculum Associates documents:

- `iReady-Maths/iready-grade3-volume2-396-pages.pdf`
- `iReady-Maths/iready-grade3-volume2-396-pages-searchable.pdf`

Solved teaching, worked guidance, and answer evidence may come only from these Curriculum Associates documents:

- `iReady-Maths/iready-grade3-teacher-guide-volume2-540-pages.pdf`
- `iReady-Maths/iready-grade3-teacher-guide-volume2-540-pages-searchable.pdf`

The original and searchable copies are alternate representations of the same official source. The Student Worktext controls what is taught and in what sequence. The Teacher Guide may explain or solve that same Volume 2 material; it cannot introduce a different curriculum.

## Prohibited content reuse

Eureka Math is not an educational source for i-Ready Interactive. Its modules, lessons, terminology, examples, numbers, answers, strategies, standards, diagrams, assessments, or explanations must never enter Volume 2. A reference to another learning experience may influence only content-neutral presentation mechanics such as focus, typography, navigation, animation behavior, code libraries, and Blank/Solved interaction behavior.

## Complete Volume 2 boundary

- Student Worktext viewer pages: 396 of 396
- Instructional printed pages: 467-789
- Units: 4-6
- Lessons: 20-33
- Sessions: 52
- Session instructional pages: 240
- Teacher Guide solved-evidence mappings: 134 spreads
- Non-session official material: retained in source-library routes rather than converted into invented activities

## Traceability chain

Every displayed Volume 2 source page is recorded in `iready-volume2-page-inventory.json` with its viewer page, printed page, physical PDF page, left/right crop, unit, lesson, session, phase, kind, and normalized source-text SHA-256 hash.

Every official session is recorded in `iready-interactive.volume2-sessions.json` with its unit, lesson, session, phase, title, printed-page range, and approved visual-model family.

Every solved source spread is recorded in `iready-volume2-teacher-provenance.json` with its lesson, Student Worktext page pair, Teacher Guide viewer pages, physical Teacher Guide PDF page, and normalized source-text SHA-256 hash.

The runtime rejects a registry whose program, publisher, grade, volume, coverage status, source paths, counts, hashes, or terminology crosses the approved Volume 2 boundary.

## Interactive-rendering boundary

The portal may redraw a source-backed mathematical model so it can animate, accept input, switch between Blank and Solved, or provide focus. It may not manufacture a problem value, answer, classification, or instructional claim.

- A quantitative result is shown only when the cited Student Worktext problem or mapped Teacher Guide evidence supports it.
- An open measurement task remains open. For example, the bucket-capacity task on printed p. 637 and the eyeglasses-mass task on printed p. 659 do not receive invented numeric bar lengths or answers.
- Generated geometry preserves the official observable attributes. The two comparison shapes on printed p. 709 remain a five-sided shape and a concave six-sided shape; the concave quadrilateral on printed p. 725 remains a four-sided concave figure.
- If exact evidence is absent or ambiguous, the activity withholds the answer and links to the official pages.
- Portal-authored controls and animations are rendering mechanics, not publisher-authored curriculum.

## Validation gate

Run `npm run validate:iready-volume2` from `interactive-grade3-app`.

The command fails if any of the following occurs:

- a registry has a non-i-Ready program identity or a source outside the approved Volume 2 files;
- Eureka or module terminology enters the Volume 2 learner implementation;
- any official Student Worktext page or asset is missing, duplicated, remapped, or hash-drifted;
- any Teacher Guide mapping or source hash drifts;
- the official 14-lesson, 52-session, 240-session-page, or 134-spread coverage becomes incomplete;
- a displayed Unit Big Ideas Organizer title or statement is absent from its cited official page;
- the two open measurement tasks regain invented solved quantities;
- the exact concave source shapes regress to generic polygons;
- the complete-book or focused-lesson routes disappear;
- the learner-facing hard source boundary disappears.

TypeScript validation (`npx tsc --noEmit`) and route-level visual/browser checks are separate required gates. A successful compilation alone is not source-fidelity proof.
