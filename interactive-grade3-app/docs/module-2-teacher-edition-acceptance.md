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
| 20 | 243-253 | Preserve the exact A/B eight-expression workbook; circle only `300, 300, 500, 500`; explain same-direction and opposite-direction effects with distance models; Problem 2 uses `200 L` estimate and `188 L` actual with tape; Problem 3 uses the real fruit-scale source asset, `130 g` estimate, and `128 g` actual with tape. |
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

The source-contract validator enforces the lesson-specific semantic requirements above, the exact Lesson 11 tapes, Lesson 20 source workbook and story sequence, prompt completeness, replay/reduced-motion support, and guarded Anime.js targets.

## Visual acceptance record

Fresh browser captures belong in the temporary audit directory and are not committed. The durable result of the visual pass is recorded here after the final 21-lesson acceptance run.

- Correction: the 2026-07-18 84-state record verified routes, layout, and runtime, but it did **not** prove source fidelity for every lesson. It must not be cited as a complete Module 2 content pass.
- Current comprehensive Module 2 source-fidelity status: **passed on 2026-08-13**.
- Current source review: all seven three-lesson batches were inspected directly against the fingerprinted Problem Set and answer-key page images; 21 schema-v2 visual contracts and all 93 implemented problems passed the fail-closed source/layout validators.
- Current browser review: 21 lessons × 4 states = 84 fresh desktop captures at 1,920 × 940 CSS pixels in a dedicated agent-owned Chrome session. All states held the viewport width with no document-level horizontal overflow; the compact workbook hierarchy leaves only the lesson title above 32 px.
- Current interaction review: all 21 Replay animation controls responded; 372 typed response fields across 20 lessons accepted input; 57 drawing canvases across 13 lessons were present; a representative Lesson 10 canvas accepted and cleared a stroke; Blank→Solved and Summary navigation passed; the browser console reported 0 warnings/errors.
- Current layout correction: full-width drawing canvases now have explicit workbook-scale heights and pair with written responses on wide desktops. The two narrow Lesson 10 source crops retain their printed proportions without stretching into multi-thousand-pixel panels.
- Lesson 20 corrective pass: **passed on 2026-07-19** against the selected Teacher Edition worked pages.
- Lesson 20 evidence: exact A/B workbook and four closest estimates; source-specific same/opposite direction distance reasoning; Camden estimate/tape/actual sequence; real Teacher Edition fruit-scale crop; peach `130 g` estimate and `128 g` actual; Blank mode answer isolation; Pause/Play control; 0 horizontal overflow; 0 browser warnings/errors.
- Lesson 20 viewport: 1,860 × 940 CSS pixels in a dedicated agent-owned Chrome tab.
- Lesson 21 corrective pass: **passed on 2026-07-19** against Teacher Edition lesson pages 257-266 and answer-key page 304.
- Lesson 21 evidence: official beans-and-rice scale relationship with `91 g` and `58 g`; `150 g`/`149 g` total and `30 g`/`33 g` difference; Yarn A/B/C measurements and rounding with `102 cm` total and `14 cm` difference tape; three distinct container number lines with `645 mL` total and `26 mL` D-to-E difference tape; exact five-trailer chart, `21`-minute total, `100`-minute estimate, `94`-minute actual movie, and reasonableness gap; Blank-mode answer isolation; Concept Replay control; student-facing Summary; 0 horizontal overflow; 0 browser warnings/errors.
- Lesson 21 viewport: 1,920 × 996 CSS pixels in a dedicated agent-owned Chrome tab in the authorized `Gemini` profile. Concept, Blank, Solved, and Summary were visually inspected after the final corrections.
- Repeatable repair workflow: `.codex/skills/fix-eureka-lesson/SKILL.md`; Lesson 20 baseline and non-drift criteria: `.codex/skills/fix-eureka-lesson/references/lesson-20-baseline.md`.
- Startup correction: normal start now dispatches immediately without polling, benchmarking, or running a test; normal builds use the fast internal-app configuration. Only drastic conditions are flagged: a non-blocking warning at 1 GB of build output or one log warning when a cold launch is still not listening after two minutes.

The earlier route/layout record is retained below only as historical evidence, not as a source-fidelity certification.

- Browser: dedicated agent-owned Chrome tab; no existing user tabs were navigated or inspected.
- Viewport: 1,920 × 996 CSS pixels.
- Coverage: 21 lessons × 4 states = 84 fresh screenshots (Concept, Blank Problem Set, Solved Problem Set, and Summary).
- Teacher Edition comparison: one rendered Concept Development reference page per lesson was paired with the corresponding fresh Chrome concept capture in temporary contact sheets.
- Layout result: 0 of 84 states had document-level or element-level horizontal overflow.
- Runtime result: 0 browser warnings/errors; specifically, no Anime.js `No target found` messages.
- Interaction result: all 21 Concept states exposed the Replay animation control.
- Content result: all 21 Summary states showed `Remember`, `Explain`, and `Check`; none showed the removed internal authoring guidance.
- Targeted recaptures: Lessons 1, 3, and 4 passed after shortening crowded time-line labels; Lesson 4 solved Problem 1 also passed without label collisions or clipping.
