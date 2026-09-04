import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const interactiveRoot = resolve(appRoot, 'src/app/pages/iready-interactive');
const studentAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/student');
const teacherAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/teacher-pages');

const sessions = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-interactive.evidence.json'), 'utf8')).interactions;
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
  { session: 1, phase: 'Explore', printedPages: '31–34', viewerPage: 43, approvedModel: 'place-value-decomposition' },
  { session: 2, phase: 'Develop', printedPages: '35–40', viewerPage: 47, approvedModel: 'partial-sums' },
  { session: 3, phase: 'Develop', printedPages: '41–46', viewerPage: 53, approvedModel: 'addition-algorithm' },
  { session: 4, phase: 'Refine', printedPages: '47–50', viewerPage: 59, approvedModel: 'addition-algorithm' }
];
const lessonSessions = sessions.filter((entry) => entry.volume === 1 && entry.lesson === 2);
if (lessonSessions.length !== expectedSessions.length) fail(`expected 4 Lesson 2 sessions; found ${lessonSessions.length}`);
for (const expected of expectedSessions) {
  const actual = lessonSessions.find((entry) => entry.session === expected.session);
  if (!actual || Object.entries(expected).some(([key, value]) => actual[key] !== value)) {
    fail(`Session ${expected.session} does not preserve its official phase, pages, viewer page, and model`);
  }
  if (!actual?.supportsSolvedTeaching || !actual?.sourceChecks?.some((check) => check.purpose === 'prompt') || !actual?.sourceChecks?.some((check) => check.purpose === 'model')) {
    fail(`Session ${expected.session} is missing prompt/model evidence or solved-teaching approval`);
  }
  for (const check of actual?.sourceChecks ?? []) {
    const checkPages = range(check.printedPages);
    if (checkPages.some((page) => page < 31 || page > 50)) fail(`Session ${expected.session} source check leaves Lesson 2: ${check.printedPages}`);
  }
}

const lessonProblems = problemEvidence.problems.filter((problem) => problem.lesson === 2);
const expectedCounts = new Map([[1, 4], [2, 5], [3, 5], [4, 4]]);
if (lessonProblems.length !== 18) fail(`expected 18 official Lesson 2 activity groups; found ${lessonProblems.length}`);
for (const [session, expectedCount] of expectedCounts) {
  const actual = lessonProblems.filter((problem) => problem.session === session).sort((left, right) => left.order - right.order);
  if (actual.length !== expectedCount || actual.some((problem, index) => problem.order !== index + 1)) {
    fail(`Session ${session} activity order is incomplete or nonsequential`);
  }
}
const coveredPages = new Set(lessonProblems.flatMap((problem) => range(problem.printedPages)));
const expectedPages = Array.from({ length: 20 }, (_, index) => index + 31);
if (expectedPages.some((page) => !coveredPages.has(page)) || [...coveredPages].some((page) => page < 31 || page > 50)) {
  fail('Lesson 2 activity coverage must be exactly Student Worktext pages 31–50');
}
for (const problem of lessonProblems) {
  const pages = range(problem.printedPages);
  if (problem.viewerPage !== pages[0] + 12 || !problem.sourceMarkers?.length) {
    fail(`${problem.key} has invalid Student Worktext provenance`);
  }
}

const lessonTeacherSpreads = teacherEvidence.spreads.filter((spread) => spread.lesson === 2);
if (lessonTeacherSpreads.length !== 10) fail(`expected 10 Lesson 2 Teacher Guide spreads; found ${lessonTeacherSpreads.length}`);
lessonTeacherSpreads.forEach((spread, index) => {
  const expectedStudentStart = 31 + index * 2;
  const expectedTeacherStart = 128 + index * 2;
  if (
    spread.studentPages !== `${expectedStudentStart}–${expectedStudentStart + 1}`
    || spread.teacherGuidePages !== `${expectedTeacherStart}–${expectedTeacherStart + 1}`
    || spread.teacherPdfPage !== 65 + index
    || !spread.sourceMarkers?.length
  ) {
    fail(`Teacher Guide spread ${index + 1} does not align to its exact Lesson 2 Student Worktext pages`);
  }
});

for (const page of expectedPages) {
  const asset = resolve(studentAssetRoot, `p-${String(page).padStart(3, '0')}.jpg`);
  if (!existsSync(asset)) fail(`missing Student Worktext asset p. ${page}`);
}
for (let page = 65; page <= 74; page += 1) {
  for (const readerPage of [page * 2 - 2, page * 2 - 1]) {
    const asset = resolve(teacherAssetRoot, `reader-${String(readerPage).padStart(3, '0')}.webp`);
    if (!existsSync(asset)) fail(`missing Teacher Guide reader page ${readerPage}`);
  }
}

const lessonTwoStart = problemsCode.indexOf("key: 'v1-u1-l2-s1-try-it'");
const lessonThreeStart = problemsCode.indexOf("key: 'v1-u1-l3-s1-try-connect'");
const lessonTwoCode = problemsCode.slice(lessonTwoStart, lessonThreeStart);
if (lessonTwoStart < 0 || lessonThreeStart < 0) fail('could not isolate the Lesson 2 implementation');
if ((lessonTwoCode.match(/blankVisual:/g) ?? []).length !== 18 || (lessonTwoCode.match(/solvedVisual:/g) ?? []).length !== 18) {
  fail('every Lesson 2 activity group must have separate Blank and Solved visual specifications');
}
if (/eureka|\bmodule\b/i.test(lessonTwoCode)) fail('Lesson 2 implementation contains cross-program educational content');
for (const required of [
  'estimate 610 + 320 = 930',
  'estimate 300 + 400 = 700',
  '7 tens and 14 ones||8 tens and 4 ones',
  'The Teacher Guide accepts 7 tens and 14 ones or 8 tens and 4 ones.',
  'tasks.flatMap(additionModelSections)'
]) {
  if (!problemsCode.includes(required)) fail(`Lesson 2 is missing reviewed teaching contract: ${required}`);
}

if (
  !componentCode.includes("lessonWorkspaceView: 'teaching' | 'try' | 'student' | 'teacher'")
  || !componentCode.includes('this.selectedLessonNumber <= 19')
  || !componentCode.includes('page >= 9 && page <= 452')
  || !componentCode.includes('page >= 102 && page <= 677')
  || !componentCode.includes('printedPagesLabel(')
  || !template.includes('lesson-view-tabs')
  || !template.includes("selectSourceEdition('student')")
  || !template.includes("selectSourceEdition('teacher')")
  || !template.includes("activityMode === 'solution' ? problem.solvedVisual : problem.blankVisual")
  || template.includes('Open Student Worktext externally')
  || template.includes('Open exact Teacher Guide spread externally')
) {
  fail('Lesson 2 UI is missing the shared top-level views, Blank/Solved isolation, or complete inline edition coverage');
}

const studentPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume1-548-pages-searchable.pdf');
const teacherPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf');
if (!existsSync(studentPdf) || !existsSync(teacherPdf)) {
  fail('approved Lesson 2 Student Worktext or Teacher Guide source is missing');
} else {
  const studentText = normalize(execFileSync('pdftotext', ['-layout', '-f', '43', '-l', '62', studentPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const teacherSessionThree = normalize(execFileSync('pdftotext', ['-layout', '-f', '71', '-l', '71', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }));
  const teacherSessionFour = normalize(execFileSync('pdftotext', ['-layout', '-f', '74', '-l', '74', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }));
  for (const marker of ['daren has 147 hip hop songs', 'greg takes 130 photos', '225 229', '317 mangoes and 179 avocados']) {
    if (!studentText.includes(marker)) fail(`Student Worktext pages 31–50 are missing reviewed marker: ${marker}`);
  }
  for (const marker of ['610', '320', '930']) {
    if (!teacherSessionThree.includes(marker)) fail(`Teacher Guide reader pages 140–141 are missing nearest-ten marker: ${marker}`);
  }
  for (const marker of ['7 and 14', '8 and 4']) {
    if (!teacherSessionFour.includes(marker)) fail(`Teacher Guide reader pages 146–147 are missing equivalent-form marker: ${marker}`);
  }
}

if (errors.length) {
  console.error('i-Ready Lesson 2 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('i-Ready Lesson 2 passed: 4 official sessions, 18 activity groups, Student Worktext pp. 31–50, Teacher Guide reader pp. 128–147, separate Blank/Solved views, exact edition assets and links, reviewed multi-step teaching, and zero Eureka-derived content.');
