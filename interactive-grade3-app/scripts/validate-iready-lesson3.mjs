import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const interactiveRoot = resolve(appRoot, 'src/app/pages/iready-interactive');
const studentAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/student');
const teacherAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/teacher');

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
  { session: 1, phase: 'Explore', printedPages: '53–56', viewerPage: 65, approvedModel: 'place-value-decomposition' },
  { session: 2, phase: 'Develop', printedPages: '57–62', viewerPage: 69, approvedModel: 'place-value-regrouping' },
  { session: 3, phase: 'Develop', printedPages: '63–68', viewerPage: 75, approvedModel: 'open-number-line' },
  { session: 4, phase: 'Develop', printedPages: '69–74', viewerPage: 81, approvedModel: 'subtraction-algorithm' },
  { session: 5, phase: 'Refine', printedPages: '75–78', viewerPage: 87, approvedModel: 'subtraction-algorithm' }
];
const lessonSessions = sessions.filter((entry) => entry.volume === 1 && entry.lesson === 3);
if (lessonSessions.length !== expectedSessions.length) fail(`expected 5 Lesson 3 sessions; found ${lessonSessions.length}`);
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
    if (checkPages.some((page) => page < 53 || page > 78)) fail(`Session ${expected.session} source check leaves Lesson 3: ${check.printedPages}`);
  }
}

const lessonProblems = problemEvidence.problems.filter((problem) => problem.lesson === 3);
const expectedCounts = new Map([[1, 3], [2, 4], [3, 4], [4, 4], [5, 4]]);
if (lessonProblems.length !== 19) fail(`expected 19 official Lesson 3 activity groups; found ${lessonProblems.length}`);
for (const [session, expectedCount] of expectedCounts) {
  const actual = lessonProblems.filter((problem) => problem.session === session).sort((left, right) => left.order - right.order);
  if (actual.length !== expectedCount || actual.some((problem, index) => problem.order !== index + 1)) {
    fail(`Session ${session} activity order is incomplete or nonsequential`);
  }
}
const coveredPages = new Set(lessonProblems.flatMap((problem) => range(problem.printedPages)));
const expectedPages = Array.from({ length: 26 }, (_, index) => index + 53);
if (expectedPages.some((page) => !coveredPages.has(page)) || [...coveredPages].some((page) => page < 53 || page > 78)) {
  fail('Lesson 3 activity coverage must be exactly Student Worktext pages 53–78');
}
for (const problem of lessonProblems) {
  const pages = range(problem.printedPages);
  if (problem.viewerPage !== pages[0] + 12 || !problem.sourceMarkers?.length) fail(`${problem.key} has invalid Student Worktext provenance`);
}

const lessonTeacherSpreads = teacherEvidence.spreads.filter((spread) => spread.lesson === 3);
if (lessonTeacherSpreads.length !== 13) fail(`expected 13 Lesson 3 Teacher Guide spreads; found ${lessonTeacherSpreads.length}`);
lessonTeacherSpreads.forEach((spread, index) => {
  const expectedStudentStart = 53 + index * 2;
  const expectedTeacherStart = 154 + index * 2;
  if (
    spread.studentPages !== `${expectedStudentStart}–${expectedStudentStart + 1}`
    || spread.teacherGuidePages !== `${expectedTeacherStart}–${expectedTeacherStart + 1}`
    || spread.teacherPdfPage !== 78 + index
    || !spread.sourceMarkers?.length
  ) {
    fail(`Teacher Guide spread ${index + 1} does not align to its exact Lesson 3 Student Worktext pages`);
  }
});

for (const page of expectedPages) {
  if (!existsSync(resolve(studentAssetRoot, `p-${String(page).padStart(3, '0')}.jpg`))) fail(`missing Student Worktext asset p. ${page}`);
}
for (let page = 78; page <= 90; page += 1) {
  if (!existsSync(resolve(teacherAssetRoot, `t-${String(page).padStart(3, '0')}.jpg`))) fail(`missing Teacher Guide local spread ${page}`);
}

const lessonThreeStart = problemsCode.indexOf("key: 'v1-u1-l3-s1-try-connect'");
const lessonFourStart = problemsCode.indexOf("key: 'v1-u2-l4-s1-model-1-3'");
const lessonThreeCode = problemsCode.slice(lessonThreeStart, lessonFourStart);
if (lessonThreeStart < 0 || lessonFourStart < 0) fail('could not isolate the Lesson 3 implementation');
if ((lessonThreeCode.match(/blankVisual:/g) ?? []).length !== 19 || (lessonThreeCode.match(/solvedVisual:/g) ?? []).length !== 19) {
  fail('every Lesson 3 activity group must have separate Blank and Solved visual specifications');
}
if (/eureka|\bmodule\b/i.test(lessonThreeCode)) fail('Lesson 3 implementation contains cross-program educational content');
for (const required of [
  '960 − 849 = 111',
  '10 − 9 = 1, 5 − 4 = 1, and 9 − 8 = 1',
  '805 − 279 = 526',
  '354 − 298 = 56',
  'A, C, and E',
  '308 + 625 = 933',
  '933 − 245 = 688'
]) {
  if (!lessonThreeCode.includes(required)) fail(`Lesson 3 is missing reviewed teaching contract: ${required}`);
}

if (
  !componentCode.includes("lessonWorkspaceView: 'teaching' | 'try' | 'student' | 'teacher'")
  || !componentCode.includes('this.selectedLessonNumber <= 19')
  || !componentCode.includes('page >= 9 && page <= 452')
  || !componentCode.includes('page >= 52 && page <= 339')
  || !template.includes('lesson-view-tabs')
  || !template.includes("selectSourceEdition('student')")
  || !template.includes("selectSourceEdition('teacher')")
  || !template.includes("activityMode === 'solution' ? problem.solvedVisual : problem.blankVisual")
  || template.includes('Open Student Worktext externally')
  || template.includes('Open exact Teacher Guide spread externally')
) {
  fail('Lesson 3 UI is missing the shared top-level views, Blank/Solved isolation, or complete inline edition coverage');
}

const studentPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume1-548-pages-searchable.pdf');
const teacherPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf');
if (!existsSync(studentPdf) || !existsSync(teacherPdf)) {
  fail('approved Lesson 3 Student Worktext or Teacher Guide source is missing');
} else {
  const studentText = normalize(execFileSync('pdftotext', ['-layout', '-f', '65', '-l', '90', studentPdf, '-'], { encoding: 'utf8', maxBuffer: 40 * 1024 * 1024 }));
  const teacherStart = normalize(execFileSync('pdftotext', ['-layout', '-f', '78', '-l', '78', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const teacherEnd = normalize(execFileSync('pdftotext', ['-layout', '-f', '90', '-l', '90', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  for (const marker of ['475 glass beads', '365 flowers', '205 seeds', '385', '805 and 279', '907 199']) {
    if (!studentText.includes(marker)) fail(`Student Worktext pages 53–78 are missing reviewed marker: ${marker}`);
  }
  for (const marker of ['475', '134', '341', '525', '213', '312']) {
    if (!teacherStart.includes(marker)) fail(`Teacher Guide reader pages 154–155 are missing reviewed marker: ${marker}`);
  }
  for (const marker of ['907', '199', '708', '308', '625', '933', '245', '688']) {
    if (!teacherEnd.includes(marker)) fail(`Teacher Guide reader pages 178–179 are missing reviewed marker: ${marker}`);
  }
}

if (errors.length) {
  console.error('i-Ready Lesson 3 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('i-Ready Lesson 3 passed: 5 official sessions, 19 activity groups, Student Worktext pp. 53–78, Teacher Guide reader pp. 154–179, separate Blank/Solved views, exact edition assets and links, reviewed subtraction teaching, and zero Eureka-derived content.');
