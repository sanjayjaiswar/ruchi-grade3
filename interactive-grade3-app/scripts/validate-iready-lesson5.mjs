import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const interactiveRoot = resolve(appRoot, 'src/app/pages/iready-interactive');
const studentAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/student');
const teacherAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/teacher-pages');

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
  { session: 1, phase: 'Explore', printedPages: '113–116', approvedModel: 'equal-groups' },
  { session: 2, phase: 'Develop', printedPages: '117–122', approvedModel: 'array' },
  { session: 3, phase: 'Develop', printedPages: '123–128', approvedModel: 'equation-flow' },
  { session: 4, phase: 'Refine', printedPages: '129–132', approvedModel: 'array' }
];
const lessonSessions = sessions.filter((entry) => entry.lesson === 5);
if (lessonSessions.length !== 4) fail(`expected 4 Lesson 5 sessions; found ${lessonSessions.length}`);
for (const expected of expectedSessions) {
  const actual = lessonSessions.find((entry) => entry.session === expected.session);
  if (!actual || Object.entries(expected).some(([key, value]) => actual[key] !== value)) {
    fail(`Session ${expected.session} does not preserve its official phase, pages, and model`);
  }
  if (!actual?.promptMarkers?.length || !actual?.modelMarkers?.length) fail(`Session ${expected.session} is missing prompt/model evidence`);
}

const lessonProblems = problemEvidence.problems.filter((problem) => problem.lesson === 5);
const expectedCounts = new Map([[1, 4], [2, 5], [3, 4], [4, 4]]);
if (lessonProblems.length !== 17) fail(`expected 17 official Lesson 5 activity groups; found ${lessonProblems.length}`);
for (const [session, expectedCount] of expectedCounts) {
  const actual = lessonProblems.filter((problem) => problem.session === session).sort((left, right) => left.order - right.order);
  if (actual.length !== expectedCount || actual.some((problem, index) => problem.order !== index + 1)) fail(`Session ${session} activity order is incomplete or nonsequential`);
}
const coveredPages = new Set(lessonProblems.flatMap((problem) => range(problem.printedPages)));
const expectedPages = Array.from({ length: 20 }, (_, index) => index + 113);
if (expectedPages.some((page) => !coveredPages.has(page)) || [...coveredPages].some((page) => page < 113 || page > 132)) {
  fail('Lesson 5 activity coverage must be exactly Student Worktext pages 113–132');
}
for (const problem of lessonProblems) {
  const pages = range(problem.printedPages);
  if (problem.viewerPage !== pages[0] + 12 || !problem.sourceMarkers?.length) fail(`${problem.key} has invalid Student Worktext provenance`);
}

const lessonTeacherSpreads = teacherEvidence.spreads.filter((spread) => spread.lesson === 5);
if (lessonTeacherSpreads.length !== 10) fail(`expected 10 Lesson 5 Teacher Guide spreads; found ${lessonTeacherSpreads.length}`);
lessonTeacherSpreads.forEach((spread, index) => {
  const studentStart = 113 + index * 2;
  const teacherStart = 252 + index * 2;
  if (
    spread.studentPages !== `${studentStart}–${studentStart + 1}`
    || spread.teacherGuidePages !== `${teacherStart}–${teacherStart + 1}`
    || spread.teacherPdfPage !== 127 + index
    || !spread.sourceMarkers?.length
  ) fail(`Teacher Guide spread ${index + 1} does not align to its exact Lesson 5 Student Worktext pages`);
});

for (const page of expectedPages) {
  if (!existsSync(resolve(studentAssetRoot, `p-${String(page).padStart(3, '0')}.jpg`))) fail(`missing Student Worktext asset p. ${page}`);
}
for (let page = 127; page <= 136; page += 1) {
  for (const readerPage of [page * 2 - 2, page * 2 - 1]) {
    if (!existsSync(resolve(teacherAssetRoot, `reader-${String(readerPage).padStart(3, '0')}.webp`))) fail(`missing Teacher Guide reader page ${readerPage}`);
  }
}

const lessonFiveStart = problemsCode.indexOf("key: 'v1-u2-l5-s1-try'");
const lessonSixStart = problemsCode.indexOf("key: 'v1-u2-l6-s1-try-connect'");
const lessonFiveCode = problemsCode.slice(lessonFiveStart, lessonSixStart);
if (lessonFiveStart < 0 || lessonSixStart < 0) fail('could not isolate the Lesson 5 implementation');
if ((lessonFiveCode.match(/blankVisual:/g) ?? []).length !== 17 || (lessonFiveCode.match(/solvedVisual:/g) ?? []).length !== 17) {
  fail('every Lesson 5 activity group must have separate Blank and Solved visual specifications');
}
if (/eureka|\bmodule\b/i.test(lessonFiveCode)) fail('Lesson 5 implementation contains cross-program educational content');
for (const required of [
  "title: 'Six equal groups of ten'",
  "label: 'One group for each crab'",
  '10 + 10 + 10 + 10 + 10 + 10 = 60',
  "title: 'Five equal groups of seven days'",
  "label: 'Compare the same six groups'",
  '6 × 0 = 0',
  "label: 'Apply It 4–6'",
  "title: 'Organize multiplication with 0, 1, 2, 5, and 10'"
]) if (!lessonFiveCode.includes(required)) fail(`Lesson 5 is missing reviewed teaching contract: ${required}`);

if (
  !componentCode.includes("lessonWorkspaceView: 'teaching' | 'try' | 'student' | 'teacher'")
  || !componentCode.includes('this.selectedLessonNumber <= 19')
  || !template.includes('lesson-view-tabs')
  || !template.includes("selectSourceEdition('student')")
  || !template.includes("selectSourceEdition('teacher')")
  || !template.includes("activityMode === 'solution' ? problem.solvedVisual : problem.blankVisual")
  || template.includes('Open official lesson')
  || template.includes('Verify official page')
) fail('Lesson 5 UI is missing the shared top-level views, Blank/Solved isolation, or streamlined source navigation');

const studentPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume1-548-pages-searchable.pdf');
const teacherPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf');
if (!existsSync(studentPdf) || !existsSync(teacherPdf)) {
  fail('approved Lesson 5 Student Worktext or Teacher Guide source is missing');
} else {
  const studentText = normalize(execFileSync('pdftotext', ['-layout', '-f', '125', '-l', '144', studentPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const teacherStart = normalize(execFileSync('pdftotext', ['-layout', '-f', '127', '-l', '127', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const teacherSessionFour = normalize(execFileSync('pdftotext', ['-layout', '-f', '135', '-l', '135', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  for (const marker of ['jade sees 6 black crabs', 'company makes a toy robot', 'meena says 6 x 1 6', 'jamal says 2 x 5', '8 pairs of slippers']) {
    if (!studentText.includes(marker)) fail(`Student Worktext pages 113–132 are missing reviewed marker: ${marker}`);
  }
  for (const marker of ['6 equal groups of 10', '8 black crabs with 10 legs each']) {
    if (!teacherStart.includes(marker)) fail(`Teacher Guide reader pages 252–253 are missing reviewed marker: ${marker}`);
  }
  for (const marker of ['jamal says 2 x 5', 'haruko buys fruits', 'nasha may have confused adding with multiplying']) {
    if (!teacherSessionFour.includes(marker)) fail(`Teacher Guide reader pages 268–269 are missing reviewed marker: ${marker}`);
  }
}

if (errors.length) {
  console.error('i-Ready Lesson 5 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('i-Ready Lesson 5 passed: 4 official sessions, 17 activity groups, Student Worktext pp. 113–132, Teacher Guide reader pp. 252–271, top-level edition tabs, separate Blank/Solved views, reviewed multiplication teaching, and zero Eureka-derived content.');
