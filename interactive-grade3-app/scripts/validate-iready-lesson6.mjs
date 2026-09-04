import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const interactiveRoot = resolve(appRoot, 'src/app/pages/iready-interactive');
const studentAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/student');
const teacherAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/teacher');

const sessions = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-interactive.volume1-sessions.json'), 'utf8')).sessions;
const problemEvidence = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-volume1-problems.evidence.json'), 'utf8'));
const teacherEvidence = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-volume1-teacher-provenance.json'), 'utf8'));
const problemsCode = readFileSync(resolve(interactiveRoot, 'iready-volume1-problems.ts'), 'utf8');
const componentCode = readFileSync(resolve(interactiveRoot, 'iready-interactive.ts'), 'utf8');
const template = readFileSync(resolve(interactiveRoot, 'iready-interactive.html'), 'utf8');

const errors = [];
const fail = (message) => errors.push(message);
const range = (value) => {
  const pages = [...String(value).matchAll(/\d+/g)].map((match) => Number(match[0]));
  return Array.from({ length: (pages[1] ?? pages[0]) - pages[0] + 1 }, (_, index) => pages[0] + index);
};
const normalize = (value) => String(value)
  .normalize('NFKD')
  .replace(/[−–—]/g, '-')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const expectedSessions = [
  { session: 1, phase: 'Explore', printedPages: '135–138', approvedModel: 'array' },
  { session: 2, phase: 'Develop', printedPages: '139–144', approvedModel: 'factor-break-apart' },
  { session: 3, phase: 'Develop', printedPages: '145–150', approvedModel: 'factor-break-apart' },
  { session: 4, phase: 'Develop', printedPages: '151–156', approvedModel: 'array' },
  { session: 5, phase: 'Refine', printedPages: '157–160', approvedModel: 'factor-break-apart' }
];
const lessonSessions = sessions.filter((entry) => entry.lesson === 6);
if (lessonSessions.length !== 5) fail(`expected 5 Lesson 6 sessions; found ${lessonSessions.length}`);
for (const expected of expectedSessions) {
  const actual = lessonSessions.find((entry) => entry.session === expected.session);
  if (!actual || Object.entries(expected).some(([key, value]) => actual[key] !== value)) {
    fail(`Session ${expected.session} does not preserve its official phase, pages, and model`);
  }
  if (!actual?.promptMarkers?.length || !actual?.modelMarkers?.length) fail(`Session ${expected.session} is missing prompt/model evidence`);
}

const lessonProblems = problemEvidence.problems.filter((problem) => problem.lesson === 6);
const expectedCounts = new Map([[1, 3], [2, 4], [3, 4], [4, 4], [5, 4]]);
if (lessonProblems.length !== 19) fail(`expected 19 official Lesson 6 activity groups; found ${lessonProblems.length}`);
for (const [session, expectedCount] of expectedCounts) {
  const actual = lessonProblems.filter((problem) => problem.session === session).sort((left, right) => left.order - right.order);
  if (actual.length !== expectedCount || actual.some((problem, index) => problem.order !== index + 1)) fail(`Session ${session} activity order is incomplete or nonsequential`);
}
const coveredPages = new Set(lessonProblems.flatMap((problem) => range(problem.printedPages)));
const expectedPages = Array.from({ length: 26 }, (_, index) => index + 135);
if (expectedPages.some((page) => !coveredPages.has(page)) || [...coveredPages].some((page) => page < 135 || page > 160)) {
  fail('Lesson 6 activity coverage must be exactly Student Worktext pages 135–160');
}
for (const problem of lessonProblems) {
  const pages = range(problem.printedPages);
  if (problem.viewerPage !== pages[0] + 12 || !problem.sourceMarkers?.length) fail(`${problem.key} has invalid Student Worktext provenance`);
}
const refineFirst = lessonProblems.find((problem) => problem.key === 'v1-u2-l6-s5-example');
if (!refineFirst?.sourceMarkers?.some((marker) => normalize(marker).includes('6 bowls of apples'))) fail('Session 5 p. 157 must include official Problem 1, not only the worked Example');

const lessonTeacherSpreads = teacherEvidence.spreads.filter((spread) => spread.lesson === 6);
if (lessonTeacherSpreads.length !== 13) fail(`expected 13 Lesson 6 Teacher Guide spreads; found ${lessonTeacherSpreads.length}`);
lessonTeacherSpreads.forEach((spread, index) => {
  const studentStart = 135 + index * 2;
  const teacherStart = 278 + index * 2;
  if (
    spread.studentPages !== `${studentStart}–${studentStart + 1}`
    || spread.teacherGuidePages !== `${teacherStart}–${teacherStart + 1}`
    || spread.teacherPdfPage !== 140 + index
    || !spread.sourceMarkers?.length
  ) fail(`Teacher Guide spread ${index + 1} does not align to its exact Lesson 6 Student Worktext pages`);
});

for (const page of expectedPages) {
  if (!existsSync(resolve(studentAssetRoot, `p-${String(page).padStart(3, '0')}.jpg`))) fail(`missing Student Worktext asset p. ${page}`);
}
for (let page = 140; page <= 152; page += 1) {
  if (!existsSync(resolve(teacherAssetRoot, `t-${String(page).padStart(3, '0')}.jpg`))) fail(`missing Teacher Guide local spread ${page}`);
}

const lessonSixStart = problemsCode.indexOf("key: 'v1-u2-l6-s1-try-connect'");
const lessonSevenStart = problemsCode.indexOf("key: 'v1-u2-l7-s1-try-connect'");
const lessonSixCode = problemsCode.slice(lessonSixStart, lessonSevenStart);
if (lessonSixStart < 0 || lessonSevenStart < 0) fail('could not isolate the Lesson 6 implementation');
if ((lessonSixCode.match(/blankVisual:/g) ?? []).length !== 19 || (lessonSixCode.match(/solvedVisual:/g) ?? []).length !== 19) {
  fail('every Lesson 6 activity group must have separate Blank and Solved visual specifications');
}
if (/eureka|\bmodule\b/i.test(lessonSixCode)) fail('Lesson 6 implementation contains cross-program educational content');
for (const required of [
  "label: 'Practice 3–4'",
  "label: 'Try It + Picture It + Model It'",
  "label: 'Try It + Model It + Picture It'",
  "label: 'Example + Problem 1'",
  "label: 'Problems 2–3'",
  "title: 'Break apart shell and apple arrays'",
  '(4 × 1) + (4 × 5) = 4 + 20 = 24',
  '(9×3)+(9×1)=27+9=36',
  '(5×4)+(5×2)=20+10=30',
  '(5×6)+(1×6)=30+6=36 apples'
]) if (!lessonSixCode.includes(required)) fail(`Lesson 6 is missing reviewed teaching contract: ${required}`);

if (
  !componentCode.includes("lessonWorkspaceView: 'teaching' | 'try' | 'student' | 'teacher'")
  || !componentCode.includes('this.selectedLessonNumber <= 19')
  || !template.includes('lesson-view-tabs')
  || !template.includes("selectSourceEdition('student')")
  || !template.includes("selectSourceEdition('teacher')")
  || !template.includes("activityMode === 'solution' ? problem.solvedVisual : problem.blankVisual")
  || template.includes('Open official lesson')
  || template.includes('Verify official page')
) fail('Lesson 6 UI is missing the shared top-level views, Blank/Solved isolation, or streamlined source navigation');

const studentPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume1-548-pages-searchable.pdf');
const teacherPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf');
if (!existsSync(studentPdf) || !existsSync(teacherPdf)) {
  fail('approved Lesson 6 Student Worktext or Teacher Guide source is missing');
} else {
  const studentText = normalize(execFileSync('pdftotext', ['-layout', '-f', '147', '-l', '172', studentPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const teacherStart = normalize(execFileSync('pdftotext', ['-layout', '-f', '140', '-l', '141', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const teacherRefine = normalize(execFileSync('pdftotext', ['-layout', '-f', '151', '-l', '152', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  for (const marker of ['3 pupusas with a meal', '4 butter bean pods', 'konane game board', 'felipe has 4 vases', '6 bowls of apples', 'big bear lake']) {
    if (!studentText.includes(marker)) fail(`Student Worktext pages 135–160 are missing reviewed marker: ${marker}`);
  }
  for (const marker of ['6 equal groups', '4 butter bean pods', '4 x 1', '4 x 5']) {
    if (!teacherStart.includes(marker)) fail(`Teacher Guide reader pages 278–281 are missing reviewed marker: ${marker}`);
  }
  for (const marker of ['6 bowls of apples', '30 hours wade fishing', '9 x 6 54']) {
    if (!teacherRefine.includes(marker)) fail(`Teacher Guide reader pages 300–303 are missing reviewed marker: ${marker}`);
  }
}

if (errors.length) {
  console.error('i-Ready Lesson 6 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('i-Ready Lesson 6 passed: 5 official sessions, 19 activity groups, Student Worktext pp. 135–160, Teacher Guide reader pp. 278–303, top-level edition tabs, separate Blank/Solved views, exact break-apart models, and zero Eureka-derived content.');
