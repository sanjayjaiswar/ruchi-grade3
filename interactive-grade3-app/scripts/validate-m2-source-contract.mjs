import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

require.extensions['.ts'] = function loadTypeScript(module, filename) {
  const source = readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      importHelpers: false,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  module._compile(output.outputText, filename);
};

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const { findLessonRuntime } = require(join(root, 'src/app/data/lessons/lesson-registry.ts'));
const lessonTemplate = readFileSync(join(root, 'src/app/pages/lesson/lesson.html'), 'utf8');
const lessonComponent = readFileSync(join(root, 'src/app/pages/lesson/lesson.ts'), 'utf8');
const failures = [];

function fail(lesson, message) {
  failures.push(`M2 L${lesson}: ${message}`);
}

function hasSourceVisualGate(lesson) {
  const path = join(
    root,
    'teacher-edition-baseline',
    'visual-layout-contracts',
    'm2',
    `lesson-${String(lesson).padStart(2, '0')}.json`
  );
  return existsSync(path) && JSON.parse(readFileSync(path, 'utf8')).schemaVersion === 2;
}

function animation(lesson) {
  const value = findLessonRuntime('m2', lesson)?.lessonAnimation;
  if (!value) {
    fail(lesson, 'missing lesson animation');
  }
  return value;
}

function assertIncludes(lesson, value, expected, label) {
  if (!String(value ?? '').includes(expected)) {
    fail(lesson, `${label} must include ${expected}`);
  }
}

function segmentTotal(model) {
  return (model?.segments ?? []).reduce(
    (total, segment) => total + Number(segment.minutes || 0),
    0,
  );
}

function conceptSections(lesson) {
  return animation(lesson)?.conceptVisual?.sections ?? [];
}

function hasConceptKind(lesson, kind) {
  return conceptSections(lesson).some((section) => section.kind === kind);
}

const l1 = animation(1);
if (l1?.kind !== 'number-line' || segmentTotal(l1.timeLineModel) !== 40) {
  fail(1, 'continuous stopwatch model must run from 0 to 40 seconds on a timeline');
}
if (l1?.timeLineModel?.segments?.some((segment) => segment.unit !== 'seconds')) {
  fail(1, 'every stopwatch segment must use seconds');
}
if (!hasConceptKind(1, 'stopwatch-workspace') || !hasConceptKind(1, 'time-number-line')) {
  fail(1, 'concept visual must pair a literal stopwatch with a continuous time line');
}

const l2 = animation(2);
if (l2?.timeLineModel?.segments?.length !== 12 || segmentTotal(l2.timeLineModel) !== 60) {
  fail(2, 'one hour must contain exactly 12 equal five-minute intervals');
}
if (l2?.timeLineModel?.segments?.some((segment) => segment.minutes !== 5)) {
  fail(2, 'every Lesson 2 interval must equal 5 minutes');
}
if (conceptSections(2).filter((section) => section.kind === 'clock').length < 2) {
  fail(2, 'the unwrapped 0-60 line must be visibly connected to analog clocks');
}

const l3 = animation(3);
if (segmentTotal(l3?.timeLineModel) !== 37) {
  fail(3, 'fives-and-ones timeline must land at 37 minutes');
}
const l3Segments = l3?.timeLineModel?.segments ?? [];
if (l3Segments.slice(-2).some((segment) => segment.minutes !== 1 || segment.emphasis !== 'ones')) {
  fail(3, 'the final two intervals must be one-minute intervals');
}
if (!conceptSections(3).some((section) => section.kind === 'clock' && section.timeValue === '7:37')) {
  fail(3, 'the exact 37-minute position must transfer to a 7:37 analog clock');
}

const l4 = animation(4);
if (segmentTotal(l4?.timeLineModel) !== 12) {
  fail(4, '5:31 to 5:43 must show 12 elapsed minutes');
}
assertIncludes(4, l4?.equation, '5:31 p.m. + 12 minutes = 5:43 p.m.', 'equation');
for (const unknown of ['End unknown', 'Elapsed unknown', 'Start unknown']) {
  if (!l4?.timeLineModel?.unknownCases?.some((item) => item.label === unknown)) {
    fail(4, `missing ${unknown.toLowerCase()} case`);
  }
}
if (conceptSections(4).filter((section) => section.kind === 'clock').length < 2) {
  fail(4, 'elapsed-time model must include the start and end clocks');
}

const l5 = animation(5);
if (segmentTotal(l5?.timeLineModel) !== 22) {
  fail(5, 'Carlos timeline must show 22 minutes from 9:08 to 9:30');
}
assertIncludes(5, l5?.equation, '9:08 + 4 min = 9:12', 'equation');
assertIncludes(5, l5?.equation, '30 min − 12 min = 18 min', 'equation');

const l7 = animation(7);
const l7Intervals = (l7?.springScaleModels ?? []).map((scale) => scale.intervalLabel);
for (const interval of ['500 g', '200 g', '100 g', '20 g']) {
  if (!l7Intervals.some((label) => label.includes(interval))) {
    fail(7, `missing spring scale with ${interval} intervals`);
  }
}

const l6LabModels = conceptSections(6)
  .filter((section) => section.kind === 'measurement-lab')
  .map((section) => section.model);
for (const model of ['kilogram-balance', 'kilogram-decompose', 'kilogram-place-value']) {
  if (!l6LabModels.includes(model)) {
    fail(6, `missing ${model} concept stage`);
  }
}

const l8Sections = conceptSections(8);
if (!l8Sections.some((section) => section.kind === 'measurement-model' && section.model === 'mass')) {
  fail(8, 'must visibly read the 464 g and 355 g scale values');
}
if (l8Sections.filter((section) => section.kind === 'tape').length < 2) {
  fail(8, 'must show distinct join and comparison tape diagrams');
}

const l9Text = JSON.stringify(conceptSections(9));
if (!hasConceptKind(9, 'measurement-model') || !l9Text.includes('liquid-decompose')) {
  fail(9, 'must show both capacity measurement and liter decomposition');
}
if (!l9Text.includes('1 mL water = 1 g')) {
  fail(9, 'must preserve the Teacher Edition water mass-capacity link');
}

const l11ConceptTapes = conceptSections(11).filter((section) => section.kind === 'tape');
if (l11ConceptTapes.length < 2 || !JSON.stringify(l11ConceptTapes).includes('445 g')) {
  fail(11, 'must separate the missing-part tape from the 445 g comparison tape');
}
const l11ProblemOne = findLessonRuntime('m2', 11)?.problemSetCenteredLesson?.problems?.[0];
const l11SolvedVisualText = JSON.stringify(l11ProblemOne?.solvedVisual ?? {});
if (!hasSourceVisualGate(11) && (!l11SolvedVisualText.includes('113 g') || !l11SolvedVisualText.includes('558 g') || !l11SolvedVisualText.includes('445 g'))) {
  fail(11, 'Problem 1 solved visual must contain the exact 113 g, 558 g, and 445 g tape parts');
}
const l11TapePartLabels = (l11ProblemOne?.solvedVisual?.sections ?? [])
  .filter((section) => section.kind === 'tape')
  .flatMap((section) => section.parts.map((part) => part.label));
if (!hasSourceVisualGate(11) && l11TapePartLabels.filter((label) => label === '558 g').length !== 1) {
  fail(11, 'Problem 1 must not render 558 g as repeated equal tape parts');
}

const l12 = animation(12);
const l12Text = JSON.stringify(l12?.conceptVisual ?? {});
if (l12?.kind !== 'measurement' || !l12Text.includes('orientation":"vertical')) {
  fail(12, 'must connect physical measurement stations to a vertical nearest-ten number line');
}
for (const tool of ['ruler or meter stick', 'digital scale', 'beaker']) {
  if (!l12Text.includes(tool)) {
    fail(12, `missing ${tool} measurement tool`);
  }
}

const l21Text = JSON.stringify(conceptSections(21));
for (const required of ['91 g', '58 g', '64 cm', '88 cm', '38 cm', '212 mL', '238 mL', '195 mL', '645 mL', '650 mL', '115 − 21 = 94']) {
  if (!l21Text.includes(required)) {
    fail(21, `measurement reasonableness visual must include ${required}`);
  }
}

const l21Problems = findLessonRuntime('m2', 21)?.problemSetCenteredLesson?.problems ?? [];
if (l21Problems.length !== 4) {
  fail(21, 'must preserve all four official Problem Set problems in order');
}
if (!hasSourceVisualGate(21)) {
  const l21Solved = new Map(l21Problems.map((problem) => [problem.number, JSON.stringify(problem.solvedVisual ?? {})]));
  const l21RequiredByProblem = new Map([
    [1, ['/source-pages/m2-teacher/page-261.png', '91 g + 58 g', '90 g + 60 g = 150 g', '91 g − 58 g = 33 g', '|150 − 149| = 1 g']],
    [2, ['64 cm', '88 cm', '38 cm', '60 cm + 40 cm = 100 cm', '64 cm + 38 cm = 102 cm', '102 cm − 88 cm = 14 cm']],
    [3, ['212 mL', '238 mL', '195 mL', '210 + 240 + 200 = 650 mL', '212 + 238 + 195 = 645 mL', '238 mL − 212 mL = 26 mL']],
    [4, ['5 + 4 + 3 + 5 + 4 = 21 minutes', '115 − 21 = 94 min', '21 min + 94 min = 115 min', '|100 − 94| = 6 minutes']],
  ]);
  for (const [problem, requiredValues] of l21RequiredByProblem) {
    const visualText = l21Solved.get(problem) ?? '';
    for (const required of requiredValues) {
      if (!visualText.includes(required)) {
        fail(21, `Problem ${problem} solved visual is missing ${required}`);
      }
    }
  }
  const l21Problem3 = l21Problems.find((problem) => problem.number === 3);
  const l21ContainerCards = l21Problem3?.solvedVisual?.sections
    ?.find((section) => section.kind === 'card-grid')?.cards ?? [];
  if (l21ContainerCards.length !== 3 || l21ContainerCards.some((card) => !card.sections.some((section) => section.kind === 'number-line'))) {
    fail(21, 'Problem 3 must render three distinct source container number lines');
  }
  const l21BlankForbidden = new Map([
    [1, ['149 g', '33 g', '150 g is 1 g']],
    [2, ['102 cm', '14 cm']],
    [3, ['645 mL', '26 mL']],
    [4, ['21 minutes altogether', '94 minutes']],
  ]);
  for (const problem of l21Problems) {
    const blankText = JSON.stringify(problem.blankVisual ?? {});
    for (const forbidden of l21BlankForbidden.get(problem.number) ?? []) {
      if (blankText.includes(forbidden)) {
        fail(21, `Problem ${problem.number} Blank visual leaks solved evidence ${forbidden}`);
      }
    }
  }
}

const l10 = animation(10);
const l10Ticks = l10?.containerScaleModel?.ticks?.map((tick) => tick.value) ?? [];
if (
  l10Ticks.length !== 11 ||
  !l10Ticks.includes('100 mL') ||
  !l10Ticks.includes('1,000 mL / 1 L')
) {
  fail(10, 'container scale must show 0 through 1,000 mL in ten 100 mL intervals');
}
const l10Construction = JSON.stringify({
  labels: l10?.numberLineLabels,
  jumps: l10?.numberLineJumps,
  scale: l10?.containerScaleModel,
});
if (l10Construction.includes('250 mL') || l10Construction.includes('+250')) {
  fail(10, '250 mL construction drift is forbidden');
}

for (const lesson of [12, 13]) {
  const centered = findLessonRuntime('m2', lesson)?.problemSetCenteredLesson;
  const conceptText = `${centered?.concept ?? ''} ${(centered?.conceptSections ?? []).map((section) => section.body).join(' ')}`;
  if (/nearest hundred|19 hundreds|1,865/i.test(conceptText)) {
    fail(
      lesson,
      'nearest-hundred Lesson 14 content must not appear in the lesson concept contract',
    );
  }
}

const l17 = animation(17);
if (
  !l17?.estimateComparison?.strategies?.some((strategy) => /balance/i.test(strategy.movement ?? ''))
) {
  fail(17, 'addition estimate comparison must explain balancing rounding errors');
}

const l20 = animation(20);
const l20Text = JSON.stringify(l20);
if (!/both round down|both round up/i.test(l20Text) || !/distance stays/i.test(l20Text)) {
  fail(20, 'subtraction estimate comparison must explain same-direction rounding');
}
const l20Strategies = l20?.estimateComparison?.strategies ?? [];
if (l20Strategies.length !== 8 || l20Text.includes('349 - 154') || l20Text.includes('351 - 149')) {
  fail(20, 'concept animation must use all eight Lesson 20 Problem Set expressions and no generic substitute set');
}
for (const expression of ['448 - 153 = 295', '451 - 153 = 298', '448 - 149 = 299', '451 - 149 = 302', '747 - 261 = 486', '756 - 261 = 495', '747 - 249 = 498', '756 - 248 = 508']) {
  if (!l20Strategies.some((strategy) => strategy.expression === expression)) {
    fail(20, `concept animation is missing source expression ${expression}`);
  }
}
if (l20Strategies.filter((strategy) => strategy.best).length !== 4) {
  fail(20, 'exactly four source estimates must be identified as closest');
}

if (!hasSourceVisualGate(20)) {
  const l20Problems = findLessonRuntime('m2', 20)?.problemSetCenteredLesson?.problems ?? [];
  const l20Problem1 = l20Problems.find((problem) => problem.number === 1);
  const l20Workbook = l20Problem1?.solvedVisual?.sections?.find((section) => section.kind === 'estimate-difference-workbook');
  if (!l20Workbook || l20Workbook.groups.length !== 2 || l20Workbook.groups.flatMap((group) => group.rows).length !== 8) {
    fail(20, 'Problem 1 must render the exact two-column, eight-row A/B source workbook');
  } else {
    const workbookRows = l20Workbook.groups.flatMap((group) => group.rows);
    if (workbookRows.filter((row) => row.best).length !== 4) {
      fail(20, 'Problem 1 workbook must circle exactly the four Teacher Edition closest estimates');
    }
    if (l20Workbook.distancePairs.length < 4 || !/same direction/i.test(l20Workbook.conclusion)) {
      fail(20, 'Problem 1 must include visible same-direction and opposite-direction distance reasoning');
    }
  }

  const l20Problem2Text = JSON.stringify(l20Problems.find((problem) => problem.number === 2)?.solvedVisual ?? {});
  for (const required of ['372 L ≈ 400 L', '184 L ≈ 200 L', '400 L − 200 L = 200 L', '372 L − 184 L = 188 L', '184 L + 188 L = 372 L']) {
    if (!l20Problem2Text.includes(required)) {
      fail(20, `Problem 2 solved visual is missing ${required}`);
    }
  }

  const l20Problem3Text = JSON.stringify(l20Problems.find((problem) => problem.number === 3)?.solvedVisual ?? {});
  for (const required of ['/source-pages/m2-teacher/page-253.png', '372 g ≈ 370 g', '500 g − 370 g = 130 g', '500 g − 372 g = 128 g', '372 g + 128 g = 500 g']) {
    if (!l20Problem3Text.includes(required)) {
      fail(20, `Problem 3 solved visual is missing ${required}`);
    }
  }
  if (!l20Problem3Text.includes('"kind":"source-crop"')) {
    fail(20, 'Problem 3 must use the real Teacher Edition fruit-scale asset, not a generic scale drawing');
  }
}

for (let lesson = 1; lesson <= 21; lesson += 1) {
  const runtime = findLessonRuntime('m2', lesson);
  const checkpoints = runtime?.problemSetCenteredLesson?.conceptSections?.[0]?.checkpoints ?? [];
  if (checkpoints.length < 3) {
    fail(lesson, 'requires at least three lesson-specific concept checkpoints');
  }
  const runtimeText = JSON.stringify(runtime?.lessonAnimation ?? {});
  if (/\d+ sec start|sec elapsed|sec end/i.test(runtimeText)) {
    fail(lesson, 'clock-time lessons must not use generated seconds start/elapsed/end labels');
  }
}

if (!lessonTemplate.includes('<span>{{ problemLesson.sourceNote }}</span>')) {
  failures.push(
    'M2 provenance: Concept-tab Problem Set images must display the Problem Set source note, not the broader lesson metadata claim',
  );
}

for (const expectedBand of [
  "{ label: 'Seconds', lessons: 'L1'",
  "{ label: 'Unwrap', lessons: 'L2'",
  "{ label: 'Exact', lessons: 'L3'",
  "{ label: 'Elapsed', lessons: 'L4'",
  "{ label: 'Parts', lessons: 'L5'",
]) {
  if (!lessonComponent.includes(expectedBand)) {
    failures.push(`M2 module frame: missing source-specific band ${expectedBand}`);
  }
}
if (lessonComponent.includes("focus: 'analog clock hands and minutes'")) {
  failures.push('M2 module frame: Lessons 1-2 must not be collapsed into generic analog-clock work');
}

if (!lessonTemplate.includes('replayLessonConceptAnimation()')) {
  failures.push('M2 animation controls: missing visible replay control');
}
if (!lessonComponent.includes("prefers-reduced-motion: reduce")) {
  failures.push('M2 animation controls: reduced-motion behavior is not implemented');
}
if (!lessonComponent.includes('if (lessonModels.length)')) {
  failures.push('M2 animation runtime: Anime.js targets must be guarded before animation');
}
if (lessonTemplate.includes('Avoid unsupported models') || lessonTemplate.includes('Match the lesson strategy')) {
  failures.push('M2 summary: internal authoring guidance must not appear as the student takeaway');
}
for (const truncated of ['articu.', 'vertica.']) {
  for (let lesson = 1; lesson <= 21; lesson += 1) {
    if (JSON.stringify(findLessonRuntime('m2', lesson)?.lessonAnimation ?? {}).includes(truncated)) {
      fail(lesson, `truncated teacher prompt ${truncated} is forbidden`);
    }
  }
}

if (failures.length) {
  console.error('Module 2 Teacher Edition source-contract validation failed.');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('OK: Module 2 Teacher Edition source contract is semantically enforced.');
console.log('- Lessons 1-5: source-specific time models');
console.log('- Lessons 1-4: stopwatch/clock connections rendered in concept visuals');
console.log('- Lessons 6, 8, 9, 11, 12, and 21: source-specific measurement labs');
console.log('- Lesson 11 Problem 1: exact whole-part and comparison tapes');
console.log('- Lessons 1-5: source-specific module-frame bands');
console.log('- Lesson 7: variable spring-scale intervals');
console.log('- Lesson 10: ten 100 mL intervals');
console.log('- Lessons 12-14: rounding scope separation');
console.log('- Lessons 17 and 20: rounding-error reasoning');
console.log('- Lessons 1-21 Problem Set visuals: schema-v2 reviewed Teacher Edition screenshots are controlling');
console.log('- Lessons 1-21: lesson-specific concept checkpoints');
console.log('- Animation runtime: replay, reduced motion, and guarded Anime.js targets');
