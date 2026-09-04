import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const interactiveRoot = resolve(appRoot, 'src/app/pages/iready-interactive');
const studentAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/student');
const teacherAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/teacher-pages');

const sessions = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-interactive.volume1-sessions.json'), 'utf8')).sessions;
const problems = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-volume1-problems.evidence.json'), 'utf8')).problems;
const teacherSpreads = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-volume1-teacher-provenance.json'), 'utf8')).spreads;
const problemsCode = readFileSync(resolve(interactiveRoot, 'iready-volume1-problems.ts'), 'utf8');
const componentCode = readFileSync(resolve(interactiveRoot, 'iready-interactive.ts'), 'utf8');
const template = readFileSync(resolve(interactiveRoot, 'iready-interactive.html'), 'utf8');

const errors = [];
const fail = (message) => errors.push(message);
const pageRange = (value) => {
  const pages = [...String(value).matchAll(/\d+/g)].map((match) => Number(match[0]));
  return Array.from({ length: (pages[1] ?? pages[0]) - pages[0] + 1 }, (_, index) => pages[0] + index);
};

const expected = {
  14: { unit: 3, sessions: 3, activities: [2, 3, 2], pages: [315, 324], teacherReader: [516, 525] },
  15: { unit: 3, sessions: 4, activities: [2, 3, 3, 2], pages: [327, 346], teacherReader: [532, 551] },
  16: { unit: 3, sessions: 4, activities: [2, 3, 3, 2], pages: [349, 368], teacherReader: [558, 577] },
  17: { unit: 3, sessions: 5, activities: [2, 3, 3, 3, 2], pages: [371, 396], teacherReader: [588, 613] },
  18: { unit: 3, sessions: 5, activities: [2, 3, 3, 3, 2], pages: [399, 424], teacherReader: [620, 645] },
  19: { unit: 3, sessions: 5, activities: [2, 3, 3, 3, 2], pages: [427, 452], teacherReader: [652, 677] }
};

let totalSessions = 0;
let totalActivities = 0;
for (const [lessonText, contract] of Object.entries(expected)) {
  const lesson = Number(lessonText);
  const lessonSessions = sessions.filter((entry) => entry.lesson === lesson);
  const lessonProblems = problems.filter((entry) => entry.lesson === lesson);
  const lessonTeacherSpreads = teacherSpreads.filter((entry) => entry.lesson === lesson);
  totalSessions += lessonSessions.length;
  totalActivities += lessonProblems.length;

  if (lessonSessions.length !== contract.sessions) fail(`Lesson ${lesson}: expected ${contract.sessions} sessions; found ${lessonSessions.length}`);
  if (lessonSessions.some((entry) => entry.unit !== contract.unit || !entry.promptMarkers?.length || !entry.modelMarkers?.length)) fail(`Lesson ${lesson}: session source evidence is incomplete`);
  if (lessonProblems.length !== contract.activities.reduce((sum, value) => sum + value, 0)) fail(`Lesson ${lesson}: activity-group count is incomplete`);

  contract.activities.forEach((count, index) => {
    const activityGroups = lessonProblems.filter((entry) => entry.session === index + 1).sort((left, right) => left.order - right.order);
    if (activityGroups.length !== count || activityGroups.some((entry, order) => entry.order !== order + 1)) fail(`Lesson ${lesson}, Session ${index + 1}: activity order is incomplete`);
  });

  const expectedPages = Array.from({ length: contract.pages[1] - contract.pages[0] + 1 }, (_, index) => contract.pages[0] + index);
  const coveredPages = new Set(lessonProblems.flatMap((entry) => pageRange(entry.printedPages)));
  if (expectedPages.some((page) => !coveredPages.has(page)) || [...coveredPages].some((page) => page < contract.pages[0] || page > contract.pages[1])) fail(`Lesson ${lesson}: Student Worktext page coverage is not exact`);

  for (const problem of lessonProblems) {
    const printedPages = pageRange(problem.printedPages);
    if (problem.viewerPage !== printedPages[0] + 12 || !problem.sourceMarkers?.length) fail(`${problem.key}: Student Worktext provenance is invalid`);
    const teacher = lessonTeacherSpreads.find((spread) => {
      const mappedPages = new Set(pageRange(spread.studentPages));
      return printedPages.every((page) => mappedPages.has(page));
    });
    if (!teacher || !teacher.sourceMarkers?.length) fail(`${problem.key}: exact Teacher Guide provenance is missing`);
  }

  for (const page of expectedPages) {
    if (!existsSync(resolve(studentAssetRoot, `p-${String(page).padStart(3, '0')}.jpg`))) fail(`Lesson ${lesson}: missing clean Student Worktext asset p. ${page}`);
  }
  for (let readerPage = contract.teacherReader[0]; readerPage <= contract.teacherReader[1]; readerPage += 1) {
    if (!existsSync(resolve(teacherAssetRoot, `reader-${String(readerPage).padStart(3, '0')}.webp`))) fail(`Lesson ${lesson}: missing clean Teacher Guide reader page ${readerPage}`);
  }
}

if (totalSessions !== 26) fail(`expected 26 sessions across Lessons 14–19; found ${totalSessions}`);
if (totalActivities !== 66) fail(`expected 66 activity groups across Lessons 14–19; found ${totalActivities}`);
if (!problemsCode.includes('problem.lesson >= 1 && problem.lesson <= 19')) fail('runtime traceability gate does not include Lessons 14–19');
if (!problemsCode.includes('problem.lesson >= 14 && teacherEvidence ? completedLessonTraceability')) fail('Lessons 14–19 are not receiving complete activity-level Student/Teacher trace records');
if (!componentCode.includes('this.selectedLesson.number <= 19') || !componentCode.includes('lesson.number <= 19')) fail('interactive and overview readiness gates do not include Lessons 14–19');
if (!componentCode.includes('this.selectedLessonNumber <= 19') || !componentCode.includes('teacherPages.every((page) => page >= 102 && page <= 677)')) fail('inline edition-page gate does not include all Lessons 14–19 Teacher pages');
if (!template.includes('Visual Teaching') || !template.includes('Try It') || !template.includes('Student Worktext') || !template.includes('Teacher Guide')) fail('top lesson tabs are incomplete');
if (!template.includes('Volume 1 complete') || !template.includes('All 19 lessons and 77 sessions have passed') || template.includes('Lessons 12–19 remain mapped')) fail('Volume 1 overview completion status is stale or incomplete');
if (!template.includes('selectedProblemStudentPages') || !template.includes('selectedProblemTeacherPages') || !template.includes('selectEditionPage(pageIndex)')) fail('multi-page Student/Teacher edition navigation is incomplete');
if (!template.includes("activityMode === 'solution' ? problem.solvedVisual : problem.blankVisual")) fail('Blank/Solved isolation is missing');

const batchStart = problemsCode.indexOf("key: 'v1-u3-l14-s1-model-area'");
const batchEnd = problemsCode.indexOf('\n];\n\nconst problemEvidence', batchStart);
const batchCode = problemsCode.slice(batchStart, batchEnd);
if (batchStart < 0 || batchEnd < 0 || batchEnd <= batchStart || /eureka|\bmodule\b/i.test(batchCode)) fail('Lessons 14–19 contain cross-program educational content or could not be isolated');
if ((batchCode.match(/blankVisual:/g) ?? []).length !== 66 || (batchCode.match(/solvedVisual:/g) ?? []).length !== 66) fail('all 66 activity groups must have separate Blank and Solved specifications');

if (errors.length) {
  console.error('i-Ready Lessons 14–19 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('i-Ready Lessons 14–19 passed: 26 official sessions, 66 activity groups, exact Student Worktext and Teacher Guide page alignment, complete activity traceability, clean top-level edition tabs, separate Blank/Solved views, and zero Eureka-derived content.');
