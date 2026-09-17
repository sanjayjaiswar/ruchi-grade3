---
name: homework-from-photos
description: Turn user-provided homework photos or worksheet image paths into a complete assignment in this project's existing Homework area, with accurate solutions, child-friendly explanations, relevant teaching visuals, and full-width desktop layouts. Use for photo-only homework submissions and requests to review, solve, explain, or add photographed homework; the user need not repeat the workflow or name this skill. Applies across subjects. Honor an explicit request for a chat-only answer.
---

# Homework from Photos

## Expected outcome

The user supplies homework photos. Complete the work in the existing Homework area without asking them to explain the assignment, choose a layout, request visuals, or repeat their preferences. Deliver a working assignment link with every visible exercise covered, correct solutions, understandable explanations, and visuals that teach that specific homework. A chat-only answer is insufficient unless explicitly requested.

This workflow applies to future homework of any subject. Choose content and presentation from the new photos; do not carry over a previous assignment's topics, characters, vocabulary, illustrations, or teaching approach merely because that code already exists.

## Read the assignment before designing

- Inspect each supplied image and all its exercise areas, including directions, subparts, diagrams, word banks, captions, and answer spaces. Use only the files supplied for this task; do not sweep the homework folder for other photos.
- Preserve page order and printed question numbering. Record the source image, printed page if visible, and exercise identifier alongside its implementation so every prompt, answer, and source-specific diagram remains traceable.
- Identify every required action: copy, match, circle, label, calculate, explain, draw, or write. Cover secondary tasks as well as the main question. If the photo contains completed work, check it and explain corrections.
- Transcribe the actual values, wording, spelling choices, and diagram relationships faithfully. Solve independently and check the result against the directions. Do not manufacture missing questions or assume an answer key exists.
- Resolve legibility by inspecting the provided image more closely using authorized local tools. Ask only when an unreadable or missing detail genuinely prevents a correct answer. Name the specific question and missing detail; continue the readable parts.
- Use visible dates when reliable. A photo timestamp can organize an undated upload, but must not be presented as a verified due date. Keep separate day labels from the worksheets. Do not ask the user to supply routine titles, subject labels, or styling choices that can be inferred safely.

## Integrate with this application

Repository entry points, relative to the project root:

- App: `interactive-grade3-app/`
- Homework list: `src/app/pages/homework-home/homework-home.ts` and its template/styles.
- Assignment components: `src/app/pages/homework/`.
- Routes: `src/app/app.routes.ts`.
- Existing Homework route: `/ruchika/grade3/homework` (local development origin currently `http://127.0.0.1:4220`).

Inspect these entry points before editing; locations and structure may evolve. Add the assignment to the existing list and route system, preserving previous assignments and unrelated changes. Reuse an existing entry when the same homework is being revised. Multiple photos may be one assignment or several related pages; follow the supplied worksheet structure without creating duplicates.

Reuse content-neutral presentation components when useful, but inspect their assumptions. Do not clone September's spelling page as a universal template. Do not create a separate website, external document, or parallel homework hub by default.

Maintain the existing Concept, Blank, and Solved views:

- **Concept:** Visually introduce the knowledge needed for these exact questions, with short child-friendly guidance. Avoid unrelated background lessons.
- **Blank:** Preserve the worksheet's prompts, provided examples, diagrams, word banks, and answer spaces. Hide app-added answers, completed models, correction markings, and explanations that reveal solutions, including accessibility text. Neutral organizers may help without completing the task.
- **Solved:** Complete every action and subpart. Put the answer, a useful visual model, and a concise explanation together so the child can see how the answer follows.

Switching views must not leak solved content into Blank. Preserve child-entered work when there are existing inputs. Do not add remote storage or other persistence merely for this workflow.

## Teach the actual question visually

For each exercise, decide what the child needs to see to understand the answer. Choose the simplest accurate visual that makes that relationship visible. Visuals are part of the initial delivery, not a follow-up enhancement requiring another request.

Examples of appropriate choices—not a mandatory set of widgets:

| Homework need | Relevant visual teaching |
| --- | --- |
| Counting, operations, fractions, measurement | Objects, arrays, number lines, place-value drawings, partitioned shapes, or labeled measures using the exact quantities and model requested. |
| Spelling or phonics | Letter tiles, highlighted sound patterns, numbered letter positions, and meaningful before/after corrections using the actual words. |
| Vocabulary or science | Clear images or labeled diagrams showing the meaning or relationship being asked about. |
| Reading comprehension | The supplied passage with evidence highlighted, a sequence, or a character/action relationship tied to the question. |
| Writing | A relevant organizer linked to the actual prompt, followed by a clearly labeled possible response where appropriate. |

- Keep the exercise visible near its visual and explanation. Do not make children hunt through a gallery or generic mini-lesson to understand their homework.
- Each visual must serve a specific learning purpose. Avoid decorative illustrations, unrelated movie scenes, generic topic cards, unnecessary mascots, and gratuitous animation. A neat picture is not enough if it does not explain the question.
- For abstract ideas, show the relationship with labels, arrows, grouping, sequence, or a simple diagram. Use color consistently with text or shape cues; do not rely on color alone.
- Use HTML/CSS/SVG for exact diagrams, letter arrangements, quantities, and annotations. Use relevant photographs or generated illustrations when those genuinely clarify the task and the required tools and source permissions are available. Do not force image generation for every question or send private homework photos to external tools.
- Useful interaction may reveal a reasoning step, demonstrate a change, compare two concepts, or build an answer. Use user-controlled progression, visible current state, and reset/back controls where appropriate. Respect reduced-motion preferences. Static visuals are sufficient when they explain the task better.
- Answer open-ended tasks with clearly labeled examples, not a purported unique correct answer. Do not claim that a suggested movie, opinion, personal experience, or preference belongs to the child.
- Label app-authored explanations, models, and example responses as original supplemental guidance. Keep source references near the related content, distinguishing the supplied worksheet from app-authored teaching material. Do not invent official curriculum claims or transfer content between programs.

## Use the full desktop width

- Use the available content width with modest page gutters; remove inherited narrow maximum-width caps from the new assignment when they leave substantial unused desktop space. Do not preserve the previous `1320px` cap by habit.
- Full width means useful allocation of space: question and model side by side, a broad worksheet, or balanced exercise panels as appropriate. Keep paragraphs readable within that layout; do not stretch every sentence across the screen.
- Make the homework, answer, and visual the focal content. Keep navigation, headings, source notes, and mode controls compact. Avoid oversized introductory areas and repeated explanatory panels.
- Prioritize common 13-inch and 15-inch Mac desktop viewports. Avoid clipping, tiny diagrams, cramped letter tiles, excessive empty margins, and unnecessary scrolling. Add only minimal small-screen safeguards unless further responsive work is requested.

## Verify and deliver

- Reconcile the finished assignment against each source image: all questions, subparts, directions, provided choices, values, diagram details, and secondary tasks must be accounted for. Check arithmetic, spelling, letter extraction, and example constraints such as required word counts.
- Check that each visual represents the right question and values, carries useful labels, and agrees with the written solution. Remove visuals that do not add understanding.
- Run appropriate existing compilation and validation checks. The Angular template check is currently `./node_modules/.bin/ngc -p tsconfig.app.json --noEmit` from the app directory. Follow the project's prohibition on creating unrequested test files.
- Visually check full-width desktop layout, route loading, and mode/interaction behavior when browser validation is authorized and available. Read `../browser-profile-validation/SKILL.md` first and obey its profile/privacy gate. This skill does not grant browser, screenshot, external-tool, upload, or other permissions. If visual validation is unavailable, finish authorized implementation and code checks, and state the verification limit without claiming a browser check passed.
- Keep original photos and personal details private. Do not copy unredacted worksheet photos, names, or student identifiers into public assets, generated illustrations, logs, or reports. Source provenance may identify a supplied worksheet without exposing student information.
- Use only an existing ignored repository `tmp/` or `temp/` directory for temporary artifacts. Preserve user files. Do not change agent controls, stage, commit, publish, or deploy as a side effect of this workflow.
- Finish with the assignment link and a short description of what is ready. Do not ask whether the user wants the explanations, visuals, or app integration that are already part of this workflow.
