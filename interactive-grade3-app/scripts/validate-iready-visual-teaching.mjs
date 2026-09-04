import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const appRoot = resolve(import.meta.dirname, '..');
const interactiveRoot = resolve(appRoot, 'src/app/pages/iready-interactive');
const sharedRoot = resolve(appRoot, 'src/app/shared/problem-visual-workspace');

const read = (path) => readFileSync(path, 'utf8');
const volumeOneComponent = read(resolve(interactiveRoot, 'iready-interactive.ts'));
const volumeOneTemplate = read(resolve(interactiveRoot, 'iready-interactive.html'));
const volumeOneProblems = read(resolve(interactiveRoot, 'iready-volume1-problems.ts'));
const volumeTwoComponent = read(resolve(interactiveRoot, 'iready-volume2-page.ts'));
const volumeTwoTemplate = read(resolve(interactiveRoot, 'iready-volume2-page.html'));
const volumeTwoVisuals = read(resolve(interactiveRoot, 'iready-volume2.ts'));
const volumeTwoTeaching = read(resolve(interactiveRoot, 'iready-volume2-teaching.ts'));
const volumeTwoSessions = JSON.parse(read(resolve(interactiveRoot, 'iready-interactive.volume2-sessions.json'))).sessions;
const workspaceTemplate = read(resolve(sharedRoot, 'problem-visual-workspace.html'));

const failures = [];
const requireText = (source, text, message) => {
  if (!source.includes(text)) failures.push(message);
};
const forbidText = (source, text, message) => {
  if (source.includes(text)) failures.push(message);
};

requireText(
  volumeOneComponent,
  "activityMode: 'try' | 'solution' = 'solution'",
  'Volume 1 must open in visual teaching, not response-entry mode.'
);
requireText(
  volumeOneComponent,
  "guidedStage: 'try' | 'check' | 'model' | 'solution' = 'solution'",
  'Volume 1 must initialize its teaching stage as a worked visual.'
);
requireText(volumeOneTemplate, '<strong>Visual Teaching</strong>', 'Volume 1 needs a primary Visual Teaching tab.');
requireText(volumeOneTemplate, '<strong>Try It</strong>', 'Volume 1 needs a separate blank-workspace tab.');
requireText(volumeOneTemplate, '<strong>Student Worktext</strong>', 'Volume 1 needs a top-level Student Worktext tab.');
requireText(volumeOneTemplate, '<strong>Teacher Guide</strong>', 'Volume 1 needs a top-level Teacher Guide tab.');
requireText(
  volumeOneTemplate,
  `[spec]="activityMode === 'solution' ? problem.solvedVisual : problem.blankVisual"`,
  'Volume 1 must render the selected source problem visual directly, without a generic lesson fallback.'
);
requireText(
  volumeOneTemplate,
  '[showValidation]="activityMode === \'try\' && guidedStage === \'check\'"',
  'Volume 1 Check must validate the compact Try one response instead of showing generic advice.'
);
forbidText(volumeOneComponent, 'conceptTrySteps(', 'Volume 1 may not synthesize generic Try/Check/Review teaching steps.');
forbidText(volumeOneComponent, 'guidedHint(', 'Volume 1 may not substitute generic lesson hints for source-specific teaching.');
requireText(
  volumeOneProblems,
  "kind: 'measurement-lab'",
  'Volume 1 arithmetic teaching must render place-value transformations.'
);
forbidText(
  volumeOneProblems,
  "kind: 'solution-parts'",
  'Volume 1 may not use generic answer-card grids as visual teaching.'
);
requireText(
  volumeOneProblems,
  'placeValueAddition:',
  'Volume 1 addition must show a source-backed place-value model.'
);
requireText(
  volumeOneProblems,
  'placeValueSubtraction:',
  'Volume 1 subtraction must show regrouping as a mathematical transformation.'
);

requireText(
  volumeTwoComponent,
  "lessonView: 'teaching' | 'try' | 'student' | 'teacher' = 'teaching'",
  'Volume 2 must open in Teacher Guide-backed visual teaching.'
);
requireText(volumeTwoTemplate, '<strong>Visual Teaching</strong>', 'Volume 2 needs a primary Visual Teaching tab.');
requireText(volumeTwoTemplate, '<strong>Try It</strong>', 'Volume 2 needs a separate blank-workspace tab.');
requireText(volumeTwoTemplate, '<strong>Student Worktext</strong>', 'Volume 2 needs a top-level Student Worktext tab.');
requireText(volumeTwoTemplate, '<strong>Teacher Guide</strong>', 'Volume 2 needs a top-level Teacher Guide tab.');
forbidText(volumeTwoComponent, 'teachingStage = 1', 'Volume 2 may not mechanically hide verified model parts behind a generic stepper.');
forbidText(volumeTwoTemplate, '[focusRevealStage]="true"', 'Volume 2 must keep the complete verified mathematical model visible.');
requireText(volumeTwoTemplate, '>Replay</button>', 'Volume 2 needs a replay control inside Visual Teaching.');
requireText(volumeTwoTemplate, 'class="v2-edition-panel"', 'Volume 2 official Student Worktext must open in a top-level edition view.');
requireText(volumeTwoTemplate, 'class="v2-edition-panel teacher-edition"', 'Volume 2 Teacher Guide must open in a top-level edition view.');
forbidText(
  volumeTwoTemplate,
  '</header>\n\n        <nav class="page-tabs"',
  'Volume 2 may not present official page buttons as if every page were a separate teaching visual.'
);
const reviewedTraceEntries = new Map(
  [...volumeTwoTeaching.matchAll(/^\s*'(\d+-\d+)': trace\((\d+),/gm)].map((match) => [match[1], Number(match[2])])
);
for (const session of volumeTwoSessions.filter((item) => item.lesson !== 28)) {
  const key = `${session.lesson}-${session.session}`;
  const expectedSourcePage = Number(session.printedPages.match(/\d+/)?.[0]);
  if (reviewedTraceEntries.get(key) !== expectedSourcePage) {
    failures.push(`Volume 2 ${key} must have a manually reviewed trace anchored to Student Worktext p. ${expectedSourcePage}.`);
  }
}
if (reviewedTraceEntries.size !== 48) {
  failures.push(`Volume 2 must have exactly 48 non-Lesson-28 reviewed session traces; found ${reviewedTraceEntries.size}.`);
}
requireText(
  volumeTwoVisuals,
  'has no manually reviewed teaching trace',
  'Volume 2 must fail closed when a session lacks a reviewed teaching trace.'
);
const reviewedVisualBody = volumeTwoVisuals.slice(
  volumeTwoVisuals.indexOf('function v2ReviewedVisual'),
  volumeTwoVisuals.indexOf('export function v2VisualForSession')
);
forbidText(
  reviewedVisualBody,
  "kind: 'source-crop'",
  'Volume 2 may not treat a publisher page crop as a primary visual-teaching stage.'
);
forbidText(
  reviewedVisualBody,
  "kind: 'source-directions'",
  'Volume 2 may not treat plain instruction cards as a primary visual-teaching stage.'
);
forbidText(
  reviewedVisualBody,
  'exactFigureOnly',
  'Volume 2 may not suppress the mathematical model and replace it with a screenshot.'
);
requireText(
  reviewedVisualBody,
  '[base.sections[0], ...sourceTeaching, ...base.sections.slice(1)]',
  'Volume 2 Lessons 20–27 must open with their semantic mathematical model, not a page crop or instruction card.'
);
requireText(
  volumeTwoVisuals,
  "const V2_SOURCE_FIGURE_REQUIRED = new Set(['20-3', '24-3', '26-1', '26-2'])",
  'Volume 2 must restrict inline source figures to the four reviewed sessions where the pictured object is mathematically necessary.'
);
requireText(
  volumeTwoVisuals,
  'if (!V2_SOURCE_FIGURE_REQUIRED.has(key)) return [reasoning];',
  'Volume 2 may not mechanically prepend publisher screenshots to every session.'
);
forbidText(volumeTwoVisuals, 'Lengths of Branches', 'Volume 2 may not restore the unrelated generic branch-length plot.');
forbidText(volumeTwoVisuals, "time: '6:32'", 'Volume 2 may not restore the unrelated generic 6:32 clock model.');
requireText(
  volumeTwoVisuals,
  'Different-size wholes stop a direct comparison',
  'Volume 2 Lesson 24 Session 3 must preserve the official different-whole comparison boundary.'
);
const volumeTwoEntryBody = volumeTwoVisuals.slice(volumeTwoVisuals.indexOf('export function v2VisualForSession'));
forbidText(
  volumeTwoEntryBody,
  'v2Lesson28Visual(session, solved)',
  'Volume 2 Lesson 28 may not replace its semantic liquid-volume models with screenshot-led page reproductions.'
);
for (const modelKind of [
  "kind: 'source-model'",
  "kind: 'fraction-strip'",
  "kind: 'number-line'",
  "kind: 'line-plot'",
  "kind: 'clock'",
  "kind: 'tape'"
]) {
  requireText(volumeTwoVisuals, modelKind, `Volume 2 is missing mathematical model family ${modelKind}.`);
}
const massVisualBody = volumeTwoVisuals.slice(
  volumeTwoVisuals.indexOf("case 'mass':"),
  volumeTwoVisuals.indexOf("case 'shape-attributes':")
);
requireText(massVisualBody, 'v2SourceModel(', 'Volume 2 mass teaching must retain exact Student Worktext figures where the object itself supplies evidence.');
requireText(
  reviewedVisualBody,
  'const firstSemanticIndex = base.sections.findIndex',
  'Volume 2 must promote a mathematical model ahead of supporting source figures whenever a semantic model is available.'
);
const partitionVisualBody = volumeTwoVisuals.slice(
  volumeTwoVisuals.indexOf("case 'partition-shapes':"),
  volumeTwoVisuals.indexOf('\n  }\n}\n\nfunction v2ReviewedVisual')
);
forbidText(partitionVisualBody, "kind: 'geometry-diagram'", 'Volume 2 equal-area teaching may not substitute a generic geometry diagram for the official partition model.');
requireText(partitionVisualBody, 'v2TeacherSourceModel(', 'Volume 2 equal-area teaching must include its Teacher Guide-verified solved model.');
requireText(workspaceTemplate, 'class="visual-source-model"', 'The shared visual workspace must render exact source-model crops.');
forbidText(
  volumeTwoTemplate,
  '<aside>\n            <a [href]="officialUrlForPrintedPage(selectedPrintedPage)"',
  'Volume 2 may not reserve permanent lesson width for an official-page screenshot; evidence belongs in the source drawer.'
);

requireText(
  workspaceTemplate,
  'class="optional-response-tools"',
  'Drawing and written-response tools must live in a collapsed optional disclosure.'
);
requireText(
  workspaceTemplate,
  'height="220"',
  'Optional drawing surfaces must remain compact.'
);
forbidText(
  workspaceTemplate,
  'height="420"\n            aria-label="Drawing workspace"',
  'A full-page drawing canvas has returned to the shared i-Ready practice renderer.'
);
forbidText(
  workspaceTemplate,
  'rows="7"\n          aria-label="Written response"',
  'A full-page written-response area has returned to the shared i-Ready practice renderer.'
);

if (failures.length) {
  console.error('i-Ready visual-teaching contract failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('i-Ready visual-teaching contract passed.');
