# Module 2 Teacher Edition acceptance contract

## Source of truth

- Primary source: `EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf`.
- The portal is an implementation target, not a content authority. If portal content and the Teacher Edition disagree, the Teacher Edition wins.
- Concept visuals must expose the mathematical relationship used in the lesson. A generic number line, list of values, or decorative motion does not satisfy this contract.
- Variable classroom measurements must remain variable. A solved view validates the required fields, units, and reasoning without inventing fixed measurements.

## Lesson-by-lesson durable requirements

| Lesson | Teacher Edition pages inspected | Required visible concept evidence |
| --- | --- | --- |
| 1 | 13-15 | Literal stopwatch; 1-, 5-, and 40-second experiences; continuous-time explanation; seconds labels. |
| 2 | 24-26 | Twelve equal 5-minute intervals; 0-60 line; analog-clock wrap; intervals distinguished from boundary marks. |
| 3 | 37-42 | Count fives, then one-minute marks; equation `(7 × 5) + 2 = 37`; exact 7:37 clock connection. |
| 4 | 50-52 | Start, end, and elapsed unknown structures; forward/backward jumps; start and end clocks. |
| 5 | 61-63 | Elapsed-time part-whole model; 9:08 to 9:30 split into 4 and 18 minutes; source equations. |
| 6 | 75-78 | Pan balance establishing 1 kg; rice benchmark; nested decompositions `1 kg → 100 g → 10 g → 1 g`; ten equal parts at each step. |
| 7 | 85-87 | Spring scales whose interval sizes are read from adjacent labels, including 500 g, 200 g, 100 g, and 20 g intervals. |
| 8 | 96-97 | Exact scale readings 464 g and 355 g; distinct join and comparison tapes; equal-group and sharing models; operation follows relationship. |
| 9 | 106-107 | Predict then measure capacity; container shape misconception; 1 L decomposed into ten 100 mL units and onward to 1 mL; water mass link. |
| 10 | 116-117 | Marked container as a vertical number line; ten equal 100 mL pours; 500 mL halfway; 0-1,000 mL scale. |
| 11 | 127-128 | All four operations in metric contexts; Problem 1 whole-part tape `113 g + 558 g = 671 g`; comparison tape `113 g + 445 g = 558 g`. |
| 12 | 150-152 | Ruler/meter stick, digital scale, and beaker stations; actual measure, surrounding tens, nearest-ten estimate; vertical number line. |
| 13 | 160-162 | Nearest-ten vertical number lines for two- and three-digit values; lower ten, halfway, upper ten, target, and distance justification. |
| 14 | 171-172 | Nearest-hundred vertical number lines; lower/upper hundred and halfway; standard form connected to hundreds unit form. |
| 15 | 185-187 | Measurement addition using mental bridges or the algorithm; all eleven Problem 1 items preserved with their units. |
| 16 | 196-198 | Compose twice: ones to tens and tens to hundreds; place-value disks and algorithm remain synchronized; all eleven source items. |
| 17 | 207-211 | Estimate sums by rounding; compare exact and estimated sums; explicitly reason about reinforcing versus balancing rounding errors. |
| 18 | 222-224 | Measurement subtraction with one decomposition; disks/algorithm alignment and correct measurement units. |
| 19 | 233-234 | Decompose twice before subtraction; before/ready/subtrahend states; apple-orange comparison context; exact 29 g result. |
| 20 | 243-248 | Estimate differences by rounding; explain same-direction and opposite-direction rounding effects on the difference. |
| 21 | 257-259 | Physical measurement evidence for mass and liquid volume; measure-round-estimate-exact-gap cycle; 91 g/58 g and 212/238/195 mL examples. |

## Interaction and layout requirements

- Every concept animation exposes a keyboard-focusable Replay animation control.
- Anime.js is called only when a target collection is nonempty; the console must not contain `No target found` warnings during the 21-lesson pass.
- `prefers-reduced-motion: reduce` leaves all instructional content fully visible and skips motion.
- Concept, blank Problem Set, solved Problem Set, and Summary states must have no unintended horizontal clipping at the acceptance viewport.
- Summary cards are student-facing (`Remember`, `Explain`, `Check`), not internal authoring instructions.
- Teacher Edition provenance remains visible near the concept and problem-set evidence.

## Automated acceptance

Run from `interactive-grade3-app`:

```bash
npm run validate:m2-source-contract
npm run validate:problem-centered-delivery
npm run validate:no-pdf-problem-tabs
npm run build -- --progress=false
```

The source-contract validator enforces the lesson-specific semantic requirements above, the exact Lesson 11 tapes, prompt completeness, replay/reduced-motion support, and guarded Anime.js targets.

## Visual acceptance record

Fresh browser captures belong in the temporary audit directory and are not committed. The durable result of the visual pass is recorded here after the final 21-lesson acceptance run.

- Status: **passed on 2026-07-18**.
- Browser: dedicated agent-owned Chrome tab; no existing user tabs were navigated or inspected.
- Viewport: 1,920 × 996 CSS pixels.
- Coverage: 21 lessons × 4 states = 84 fresh screenshots (Concept, Blank Problem Set, Solved Problem Set, and Summary).
- Teacher Edition comparison: one rendered Concept Development reference page per lesson was paired with the corresponding fresh Chrome concept capture in temporary contact sheets.
- Layout result: 0 of 84 states had document-level or element-level horizontal overflow.
- Runtime result: 0 browser warnings/errors; specifically, no Anime.js `No target found` messages.
- Interaction result: all 21 Concept states exposed the Replay animation control.
- Content result: all 21 Summary states showed `Remember`, `Explain`, and `Check`; none showed the removed internal authoring guidance.
- Targeted recaptures: Lessons 1, 3, and 4 passed after shortening crowded time-line labels; Lesson 4 solved Problem 1 also passed without label collisions or clipping.
