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
  { session: 1, phase: 'Explore', printedPages: '101–104', approvedModel: 'equal-groups' },
  { session: 2, phase: 'Develop', printedPages: '105–108', approvedModel: 'array' },
  { session: 3, phase: 'Refine', printedPages: '109–110', approvedModel: 'equal-groups' }
];
const lessonSessions = sessions.filter((entry) => entry.lesson === 4);
if (lessonSessions.length !== 3) fail(`expected 3 Lesson 4 sessions; found ${lessonSessions.length}`);
for (const expected of expectedSessions) {
  const actual = lessonSessions.find((entry) => entry.session === expected.session);
  if (!actual || Object.entries(expected).some(([key, value]) => actual[key] !== value)) {
    fail(`Session ${expected.session} does not preserve its official phase, pages, and model`);
  }
  if (!actual?.promptMarkers?.length || !actual?.modelMarkers?.length) fail(`Session ${expected.session} is missing prompt/model evidence`);
  if (range(actual?.printedPages ?? '').some((page) => page < 101 || page > 110)) fail(`Session ${expected.session} leaves the Lesson 4 page boundary`);
}

const lessonProblems = problemEvidence.problems.filter((problem) => problem.lesson === 4);
const expectedCounts = new Map([[1, 4], [2, 4], [3, 2]]);
if (lessonProblems.length !== 10) fail(`expected 10 official Lesson 4 activity groups; found ${lessonProblems.length}`);
for (const [session, expectedCount] of expectedCounts) {
  const actual = lessonProblems.filter((problem) => problem.session === session).sort((left, right) => left.order - right.order);
  if (actual.length !== expectedCount || actual.some((problem, index) => problem.order !== index + 1)) fail(`Session ${session} activity order is incomplete or nonsequential`);
}
const coveredPages = new Set(lessonProblems.flatMap((problem) => range(problem.printedPages)));
const expectedPages = Array.from({ length: 10 }, (_, index) => index + 101);
if (expectedPages.some((page) => !coveredPages.has(page)) || [...coveredPages].some((page) => page < 101 || page > 110)) {
  fail('Lesson 4 activity coverage must be exactly Student Worktext pages 101–110');
}
for (const problem of lessonProblems) {
  const pages = range(problem.printedPages);
  if (problem.viewerPage !== pages[0] + 12 || !problem.sourceMarkers?.length) fail(`${problem.key} has invalid Student Worktext provenance`);
}

const lessonTeacherSpreads = teacherEvidence.spreads.filter((spread) => spread.lesson === 4);
if (lessonTeacherSpreads.length !== 5) fail(`expected 5 Lesson 4 Teacher Guide spreads; found ${lessonTeacherSpreads.length}`);
lessonTeacherSpreads.forEach((spread, index) => {
  const expectedStudentStart = 101 + index * 2;
  const expectedTeacherStart = 236 + index * 2;
  if (
    spread.studentPages !== `${expectedStudentStart}–${expectedStudentStart + 1}`
    || spread.teacherGuidePages !== `${expectedTeacherStart}–${expectedTeacherStart + 1}`
    || spread.teacherPdfPage !== 119 + index
    || !spread.sourceMarkers?.length
  ) fail(`Teacher Guide spread ${index + 1} does not align to its exact Lesson 4 Student Worktext pages`);
});

for (const page of expectedPages) {
  if (!existsSync(resolve(studentAssetRoot, `p-${String(page).padStart(3, '0')}.jpg`))) fail(`missing Student Worktext asset p. ${page}`);
}
for (let page = 119; page <= 123; page += 1) {
  if (!existsSync(resolve(teacherAssetRoot, `t-${String(page).padStart(3, '0')}.jpg`))) fail(`missing Teacher Guide local spread ${page}`);
}

const lessonFourStart = problemsCode.indexOf("key: 'v1-u2-l4-s1-model-1-3'");
const lessonFiveStart = problemsCode.indexOf("key: 'v1-u2-l5-s1-try'");
const lessonFourCode = problemsCode.slice(lessonFourStart, lessonFiveStart);
if (lessonFourStart < 0 || lessonFiveStart < 0) fail('could not isolate the Lesson 4 implementation');
if ((lessonFourCode.match(/blankVisual:/g) ?? []).length !== 10 || (lessonFourCode.match(/solvedVisual:/g) ?? []).length !== 10) {
  fail('every Lesson 4 activity group must have separate Blank and Solved visual specifications');
}
if (/eureka|\bmodule\b/i.test(lessonFourCode)) fail('Lesson 4 implementation contains cross-program educational content');
for (const required of [
  '3 + 3 + 3 + 3 + 3 = 15',
  'The six outlined groups do not all contain the same number of dots.',
  'Robert did not get the number of eggs in each group right. He used 7 and should have used 6.',
  '5 × 8 = 40',
  'Ravi has 5 cousins, and each cousin gave him 8 coins. He has 40 coins in all.'
]) if (!lessonFourCode.includes(required)) fail(`Lesson 4 is missing reviewed teaching contract: ${required}`);

for (const forbiddenBlank of [
  "label: '1. Draw 3 equal groups of 2 kites', rows: 3, columns: 2",
  "label: '3. Four equal groups of three wheels', rows: 4, columns: 3",
  "label: '4 Part A. Choose a correct code-native model for 5 × 8'",
  "caption: 'Robert made 4 groups of 7 eggs, not 4 groups of 6.'"
]) if (lessonFourCode.includes(forbiddenBlank)) fail(`Lesson 4 Blank view leaks a solved representation: ${forbiddenBlank}`);

if (
  !componentCode.includes("lessonWorkspaceView: 'teaching' | 'try' | 'student' | 'teacher'")
  || !componentCode.includes('this.selectedLessonNumber <= 19')
  || !template.includes('lesson-view-tabs')
  || !template.includes("selectSourceEdition('student')")
  || !template.includes("selectSourceEdition('teacher')")
  || !template.includes("activityMode === 'solution' ? problem.solvedVisual : problem.blankVisual")
  || template.includes('Open official lesson')
  || template.includes('Verify official page')
  || template.includes('Open Student Worktext externally')
  || template.includes('Open exact Teacher Guide spread externally')
) fail('Lesson 4 UI is missing the shared top-level views, Blank/Solved isolation, or streamlined source navigation');

const studentPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume1-548-pages-searchable.pdf');
const teacherPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf');
if (!existsSync(studentPdf) || !existsSync(teacherPdf)) {
  fail('approved Lesson 4 Student Worktext or Teacher Guide source is missing');
} else {
  const studentText = normalize(execFileSync('pdftotext', ['-layout', '-f', '113', '-l', '122', studentPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const teacherStart = normalize(execFileSync('pdftotext', ['-layout', '-f', '119', '-l', '119', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const teacherEnd = normalize(execFileSync('pdftotext', ['-layout', '-f', '123', '-l', '123', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  for (const marker of ['three pairs of players', 'basketball cart has 3 shelves', 'robert painted and arranged the eggs', 'ravi cousins send him coins']) {
    if (!studentText.includes(marker)) fail(`Student Worktext pages 101–110 are missing reviewed marker: ${marker}`);
  }
  for (const marker of ['3 equal groups of 2 kites', '2 2 2 6', 'there 3 groups of 2 so']) {
    if (!teacherStart.includes(marker)) fail(`Teacher Guide reader pages 236–237 are missing reviewed marker: ${marker}`);
  }
  for (const marker of ['5 x 8', '40 coins', '3 x 4', '12']) {
    if (!teacherEnd.includes(marker)) fail(`Teacher Guide reader pages 244–245 are missing reviewed marker: ${marker}`);
  }
}

if (errors.length) {
  console.error('i-Ready Lesson 4 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('i-Ready Lesson 4 passed: 3 official sessions, 10 activity groups, Student Worktext pp. 101–110, Teacher Guide reader pp. 236–245, top-level edition tabs, separate Blank/Solved views, reviewed multiplication teaching, and zero Eureka-derived content.');
