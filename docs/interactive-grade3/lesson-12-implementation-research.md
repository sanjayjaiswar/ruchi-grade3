# Lesson 12 Implementation Research And Requirements

Date: 2026-07-03
Status: Requirements and research baseline before implementation

## 1. Purpose

This document turns the Lesson 12 discussion into implementation clarity without writing implementation code.

The goal is to avoid drifting into generic tabs, generic animations, unnecessary plugins, or LMS decisions before the lesson experience is correct.

Controlling design doc:

```text
docs/interactive-grade3/problem-set-centered-lesson-design.md
```

Pilot lesson:

```text
Module 1 Lesson 12: Interpret the quotient as the number of groups or the number of objects in each group using units of 2.
```

Official source files:

```text
EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
EurekaMath-Sources/Module_1/g3_m1_student_wkbook_v1_3_1.pdf
```

## 2. Current App Stack

Current Angular app:

```text
interactive-grade3-app/
```

Current relevant dependencies:

```text
@angular/* 21.2.x
animejs 4.5.x
echarts 6.1.x
rxjs 7.8.x
typescript 5.9.x
```

Existing animation reality:

- The app already has CSS/keyframe animation patterns.
- The app already includes `animejs`.
- The shared `array-decomposer` already imports Anime.js.
- The current lesson page already has generic animation panels, but they are not problem-set-centered and are not specific enough for Lesson 12.

Styling baseline:

- Keep common lesson shell CSS common.
- Add or use a reusable problem-set-centered stylesheet for the Concept / Problem Set / Summary experience.
- Use module or lesson-specific class hooks for customization only when a lesson needs a real override.
- Do not move all Lesson 12 styling into a Lesson 12-only stylesheet.

## 3. Research Summary

### 3.1 Animation Libraries

Recommended baseline:

- Use native CSS transitions/keyframes for simple reveals, fades, highlighting, and layout-stable state changes.
- Use Anime.js for sequenced educational animations where multiple tokens move, stagger, group, or distribute.
- Use SVG/HTML/CSS for the visual models. Do not use canvas unless a later lesson requires freehand drawing or many dynamic marks.

Why:

- Angular's current docs emphasize native CSS-style enter/leave animation APIs. Older provider-based Angular animation setup is deprecated in Angular's current API docs.
- Anime.js is already installed and is a good fit for timelines, staggered object movement, SVG motion paths, line drawing, and sequential reveals.
- Lesson 12 animations are simple manipulatives: grouping, distributing, splitting a tape, and revealing matches. They do not need Lottie, Three.js, PixiJS, D3, or a game engine.

Do not add for Lesson 12:

- Lottie: useful for prebuilt illustration playback, but weak for source-driven math manipulatives with changing quantities and labels.
- Three.js: unnecessary because Lesson 12 is not 3D.
- PixiJS: unnecessary because there are few objects and DOM/SVG is enough.
- D3: unnecessary because this is not data visualization.
- GSAP: capable, but redundant because Anime.js is already installed.
- Full drawing canvas: unnecessary for the solved explanation pilot.

### 3.2 Accessibility And Motion

Animation must be instructional, not decorative.

Requirements:

- Respect `prefers-reduced-motion`.
- Provide a reduced-motion fallback that still shows the final grouped/distributed/split state.
- Avoid auto-looping motion.
- If an animation runs automatically, it should be brief and directly tied to the problem.
- Prefer animating `transform` and `opacity`; avoid layout-changing animation such as width, height, top, left, or margin where possible.
- Every animation must have visible labels or captions so meaning is clear without relying on motion alone.

### 3.3 LMS / School Integration Research

No LMS, school connector, or external plugin is needed for the Lesson 12 pilot.

Future institutional integration should be treated as a separate product phase, not mixed into lesson authoring.

If a future school/LMS integration is needed:

- Prefer LTI 1.3 / LTI Advantage for launching the app from an LMS and exchanging user/course/assignment context through a standard integration.
- Consider Assignment and Grade Services only when grades or progress need to sync back to an LMS gradebook.
- Consider Deep Linking only when instructors need to choose individual lessons or modules from inside the LMS.
- Consider Names and Role Provisioning Services only when the app needs roster/role context.
- Consider SCORM only as a legacy packaging/export requirement for LMSs that require SCORM packages.
- Consider xAPI only if detailed learning-event analytics are needed across systems, which also implies a Learning Record Store decision.

Do not introduce LMS work for Lesson 12:

- no LTI,
- no SCORM package,
- no xAPI statements,
- no accounts,
- no gradebook sync,
- no school roster integration.

## 4. Lesson 12 Animation Requirements

The source problem context can use different objects: birds, fish, ribbon, cereal bars, dollars. The app does not need to draw realistic birds, fish, cereal bars, or money. It may use neutral tokens, blocks, dots, counters, bars, or labeled cards as long as the model preserves the exact math and context.

The animation must make the mathematical action visible:

- grouping by 2,
- distributing equally,
- splitting a whole into equal parts,
- matching a division fact to a quotient,
- labeling what the quotient means.

The object artwork is secondary. The grouping structure is primary.

## 5. Problem Animation Matrix

### Problem 1: Birds In Cages

Official task:

```text
There are 8 birds at the pet store. Two birds are in each cage. Circle to show how many cages there are.
```

Solved result:

```text
8 divided by 2 = 4
There are 4 cages of birds.
```

Animation requirement:

- Show 8 simple tokens.
- Move or reveal them into groups of 2.
- Count the groups: 1, 2, 3, 4.
- Final label: `4 cages`.
- Quotient meaning: number of groups.

Implementation model:

- `grouping-by-size`
- total = 8
- groupSize = 2
- quotient = 4
- unit label = birds
- group label = cages

### Problem 2: Fish In Bowls

Official task:

```text
The pet store sells 10 fish. They equally divide the fish into 5 bowls.
```

Solved result:

```text
5 times 2 = 10
10 divided by 5 = 2
There are 2 fish in each bowl.
```

Animation requirement:

- Show 5 containers.
- Distribute 10 simple tokens one at a time across the 5 containers.
- End with 2 tokens in each container.
- Final label: `2 fish in each bowl`.
- Quotient meaning: number in each group.

Implementation model:

- `equal-sharing`
- total = 10
- groupCount = 5
- quotient = 2
- unit label = fish
- group label = bowls

### Problem 3: Match Division Facts

Official task:

```text
Match: 10 divided by 2, 18 divided by 2, 12 divided by 2, 16 divided by 2, 14 divided by 2.
```

Solved result:

```text
10 divided by 2 = 5
18 divided by 2 = 9
12 divided by 2 = 6
16 divided by 2 = 8
14 divided by 2 = 7
```

Animation requirement:

- Reveal each division fact.
- Show a short count-by-2 or grouping cue.
- Connect the fact to its quotient.
- This can be a line/match reveal, not a full object animation.

Implementation model:

- `fact-match`
- divisor = 2
- facts = 10->5, 18->9, 12->6, 16->8, 14->7

### Problem 4: Ribbon Split Into Two Pieces

Official task:

```text
Laina buys 14 meters of ribbon. She cuts her ribbon into 2 equal pieces.
```

Solved result:

```text
14 divided by 2 = 7
Each piece is 7 meters long.
```

Animation requirement:

- Show one tape labeled `14 meters`.
- Split it into 2 equal parts.
- Label each part `7 meters`.
- Final label: `Each piece is 7 meters`.
- Quotient meaning: size of each group.

Implementation model:

- `tape-split`
- whole = 14
- partCount = 2
- quotient = 7
- unit = meters

### Problem 5: Cereal Bars Over Days

Official task:

```text
Roy eats 2 cereal bars every morning. Each box has a total of 12 bars.
```

Solved result:

```text
12 divided by 2 = 6
It will take 6 days to finish 1 box.
```

Animation requirement:

- Show 12 simple bar tokens.
- Group or mark 2 bars per day.
- Count days as groups: Day 1 through Day 6.
- Final label: `6 days`.
- Quotient meaning: number of groups.

Implementation model:

- `grouping-by-size`
- total = 12
- groupSize = 2
- quotient = 6
- unit label = bars
- group label = days

### Problem 6: Shared Present Cost

Official task:

```text
Sarah and Esther equally share the cost of a present. The present costs 18 dollars.
```

Solved result:

```text
18 divided by 2 = 9
Sarah pays 9 dollars.
```

Animation requirement:

- Show a tape or money bar labeled `18 dollars`.
- Split it into 2 equal shares.
- Label shares `Sarah` and `Esther`.
- Reveal Sarah's share as `9 dollars`.
- Quotient meaning: size of each share.

Implementation model:

- `tape-split`
- whole = 18
- partCount = 2
- quotient = 9
- unit = dollars
- labels = Sarah, Esther

## 6. Required Reusable Animation Types

Lesson 12 needs only four reusable animation types:

### 6.1 Grouping By Size

Use when the total and group size are known, and the quotient is the number of groups.

Examples:

- Problem 1: 8 birds, 2 per cage, find cages.
- Problem 5: 12 bars, 2 per day, find days.

Visual behavior:

- tokens appear,
- tokens are grouped into equal sets of the known size,
- group count is revealed,
- quotient label names the number of groups.

### 6.2 Equal Sharing

Use when the total and number of groups are known, and the quotient is the size of each group.

Example:

- Problem 2: 10 fish shared into 5 bowls.

Visual behavior:

- group containers appear,
- tokens distribute one per group in rounds,
- final group size is revealed,
- quotient label names the objects in each group.

### 6.3 Tape Split

Use when a whole amount is partitioned into equal parts.

Examples:

- Problem 4: 14 meters split into 2 pieces.
- Problem 6: 18 dollars split into 2 shares.

Visual behavior:

- whole tape appears,
- partition line appears,
- labels reveal on each part,
- quotient label names the size of each part/share.

### 6.4 Fact Match

Use when the task is matching division facts to quotient values.

Example:

- Problem 3.

Visual behavior:

- fact appears,
- quotient appears,
- a connection line or highlight confirms the match,
- optional count-by-2 strip supports the fact.

## 7. Data Requirements

Each problem needs structured content, not just extracted text.

Recommended conceptual fields:

```text
problemNumber
sourcePrompt
sourcePageReference
solvedAnswer
equations
knownTotal
knownGroupSize
knownGroupCount
quotient
quotientMeaning
visualModelType
animationType
animationFacts
explanation
validationChecks
teacherEditionVisualReference
studentWorkbookReference
```

Lesson-level fields:

```text
lessonConcept
teacherEditionConceptReference
studentWorkbookProblemSetReference
problemSetItems
summaryTakeaway
sourceInspectionNotes
```

## 8. Implementation Baseline

The Lesson 12 implementation should:

- be authored specifically for Lesson 12,
- avoid changing all 152 lessons,
- use the existing Angular app,
- use existing `animejs` only where sequencing is needed,
- use CSS for simple state/reveal animation,
- use reusable problem-set-centered layout styles where the layout is common,
- reserve module/lesson-specific CSS for true overrides only,
- use HTML/SVG/CSS models instead of realistic art,
- keep source references available but visually secondary,
- render the Problem Set as the main page content,
- remove or bypass the current 8-tab rail for Lesson 12.

No new npm dependency is required for the Lesson 12 pilot unless implementation proves a specific gap.

## 9. Validation Baseline

Before implementation is accepted:

- Teacher Edition pages for Lesson 12 must be visually inspected.
- Student Workbook Lesson 12 Problem Set pages must be visually inspected.
- Teacher Edition solved/annotated Problem Set thumbnails must be used as solved-work reference.
- Every Problem Set item must match the official problem order.
- Every solved answer must match the source and arithmetic.
- Every animation must match the exact problem quantities.
- Every quotient meaning must be stated where relevant.
- Reduced-motion behavior must show final states without relying on movement.
- No raw broken PDF extraction text may appear.
- The app build must pass.
- The Lesson 12 route must render without the old 8-tab flow as the primary experience.

## 10. Future Integration Decision Tree

Only after the lesson experience is correct:

1. If this remains a local/home learning app:
   - no LMS integration.
   - optional local progress storage later.

2. If this needs school LMS launch:
   - evaluate LTI 1.3 / LTI Advantage.

3. If this needs LMS gradebook sync:
   - evaluate LTI Advantage Assignment and Grade Services.

4. If this needs LMS content selection by teachers:
   - evaluate LTI Deep Linking.

5. If this needs legacy LMS package upload:
   - evaluate SCORM packaging.

6. If this needs detailed cross-system learning analytics:
   - evaluate xAPI and Learning Record Store options.

None of these are part of the Lesson 12 pilot.

## 11. External Research References

- Angular animations guide: https://angular.dev/guide/animations
- Angular `provideAnimations` deprecation note: https://angular.dev/api/platform-browser/animations/provideAnimations
- Angular router View Transitions: https://angular.dev/api/router/withViewTransitions
- Anime.js documentation: https://animejs.com/documentation/
- Anime.js SVG/timeline capabilities: https://animejs.com/
- MDN Web Animations API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
- MDN `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion
- W3C WCAG technique for reduced motion in JavaScript: https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR40
- 1EdTech LTI overview: https://www.1edtech.org/standards/lti
- 1EdTech LTI 1.3 specification: https://www.imsglobal.org/spec/lti/v1p3
- 1EdTech LTI Advantage overview: https://www.imsglobal.org/lti-advantage-overview
- SCORM overview: https://scorm.com/
- ADL xAPI specification repository: https://github.com/adlnet/xAPI-Spec
