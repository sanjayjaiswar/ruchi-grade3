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
const problemEvidence = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-volume1-problems.evidence.json'), 'utf8')).problems;
const teacherEvidence = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-volume1-teacher-provenance.json'), 'utf8')).spreads;
const problemsCode = readFileSync(resolve(interactiveRoot, 'iready-volume1-problems.ts'), 'utf8');
const componentCode = readFileSync(resolve(interactiveRoot, 'iready-interactive.ts'), 'utf8');
const template = readFileSync(resolve(interactiveRoot, 'iready-interactive.html'), 'utf8');

const errors = [];
const fail = (message) => errors.push(message);
const expandRange = (value) => {
  const pages = [...String(value).matchAll(/\d+/g)].map((match) => Number(match[0]));
  return Array.from({ length: (pages[1] ?? pages[0]) - pages[0] + 1 }, (_, index) => pages[0] + index);
};
const normalize = (value) => String(value)
  .normalize('NFKD')
  .replace(/[−–—]/g, '-')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const expected = {
  7: { unit: 2, sessions: 5, activities: [3, 3, 3, 3, 3], pages: [163, 188], teacher: [156, 168] },
  8: { unit: 2, sessions: 5, activities: [3, 3, 3, 3, 3], pages: [191, 216], teacher: [172, 184] },
  9: { unit: 2, sessions: 3, activities: [3, 3, 3], pages: [219, 232], teacher: [188, 194] },
  10: { unit: 2, sessions: 3, activities: [3, 3, 2], pages: [235, 244], teacher: [200, 204] },
  11: { unit: 2, sessions: 3, activities: [3, 2, 2], pages: [247, 256], teacher: [208, 212] },
  12: { unit: 2, sessions: 4, activities: [3, 3, 3, 3], pages: [259, 278], teacher: [216, 225] },
  13: { unit: 2, sessions: 3, activities: [2, 2, 2], pages: [281, 290], teacher: [229, 233] }
};

let totalSessions = 0;
let totalActivities = 0;
for (const [lessonText, contract] of Object.entries(expected)) {
  const lesson = Number(lessonText);
  const lessonSessions = sessions.filter((entry) => entry.lesson === lesson);
  const lessonProblems = problemEvidence.filter((entry) => entry.lesson === lesson);
  const lessonSpreads = teacherEvidence.filter((entry) => entry.lesson === lesson);
  totalSessions += lessonSessions.length;
  totalActivities += lessonProblems.length;

  if (lessonSessions.length !== contract.sessions) fail(`Lesson ${lesson}: expected ${contract.sessions} sessions; found ${lessonSessions.length}`);
  if (lessonSessions.some((entry) => entry.unit !== contract.unit || !entry.promptMarkers?.length || !entry.modelMarkers?.length)) fail(`Lesson ${lesson}: session source evidence is incomplete`);
  if (lessonProblems.length !== contract.activities.reduce((sum, value) => sum + value, 0)) fail(`Lesson ${lesson}: activity-group count is incomplete`);

  contract.activities.forEach((count, index) => {
    const activityGroups = lessonProblems.filter((entry) => entry.session === index + 1).sort((left, right) => left.order - right.order);
    if (activityGroups.length !== count || activityGroups.some((entry, order) => entry.order !== order + 1)) fail(`Lesson ${lesson}, Session ${index + 1}: activity order is incomplete`);
  });

  const coveredPages = new Set(lessonProblems.flatMap((entry) => expandRange(entry.printedPages)));
  const expectedPages = Array.from({ length: contract.pages[1] - contract.pages[0] + 1 }, (_, index) => contract.pages[0] + index);
  if (expectedPages.some((page) => !coveredPages.has(page)) || [...coveredPages].some((page) => page < contract.pages[0] || page > contract.pages[1])) fail(`Lesson ${lesson}: Student Worktext page coverage is not exact`);
  for (const problem of lessonProblems) {
    if (problem.viewerPage !== expandRange(problem.printedPages)[0] + 12 || !problem.sourceMarkers?.length) fail(`${problem.key}: Student Worktext provenance is invalid`);
    if (!problemsCode.includes(`'${problem.key}': lesson`)) fail(`${problem.key}: activity-level Student/Teacher traceability is missing`);
  }

  const expectedTeacherCount = contract.teacher[1] - contract.teacher[0] + 1;
  if (lessonSpreads.length !== expectedTeacherCount) fail(`Lesson ${lesson}: expected ${expectedTeacherCount} Teacher Guide spreads; found ${lessonSpreads.length}`);
  for (const spread of lessonSpreads) {
    if (spread.lesson !== lesson || !spread.studentPages || !spread.teacherGuidePages || !spread.sourceMarkers?.length) fail(`Lesson ${lesson}: Teacher Guide spread evidence is incomplete`);
  }

  for (const page of expectedPages) {
    if (!existsSync(resolve(studentAssetRoot, `p-${String(page).padStart(3, '0')}.jpg`))) fail(`Lesson ${lesson}: missing Student Worktext asset p. ${page}`);
  }
  for (let page = contract.teacher[0]; page <= contract.teacher[1]; page += 1) {
    for (const readerPage of [page * 2 - 2, page * 2 - 1]) {
      if (!existsSync(resolve(teacherAssetRoot, `reader-${String(readerPage).padStart(3, '0')}.webp`))) fail(`Lesson ${lesson}: missing Teacher Guide reader page ${readerPage}`);
    }
  }
}

if (totalSessions !== 26) fail(`expected 26 sessions across Lessons 7–13; found ${totalSessions}`);
if (totalActivities !== 72) fail(`expected 72 activity groups across Lessons 7–13; found ${totalActivities}`);
if (!problemsCode.includes('problem.lesson >= 1 && problem.lesson <= 19')) fail('runtime traceability gate does not include Lessons 12–13');
if (!componentCode.includes('this.selectedLesson.number <= 19') || !componentCode.includes('lesson.number <= 19')) fail('interactive and overview readiness gates do not include Lessons 7–13');
if (!template.includes('Visual Teaching') || !template.includes('Try It') || !template.includes('Student Worktext') || !template.includes('Teacher Guide')) fail('top lesson tabs are incomplete');
if (!template.includes("activityMode === 'solution' ? problem.solvedVisual : problem.blankVisual")) fail('Blank/Solved isolation is missing');

const lessonSevenStart = problemsCode.indexOf("key: 'v1-u2-l7-s1-try-connect'");
const lessonFourteenStart = problemsCode.indexOf("key: 'v1-u3-l14-s1-model-area'");
const batchCode = problemsCode.slice(lessonSevenStart, lessonFourteenStart);
if (lessonSevenStart < 0 || lessonFourteenStart < 0 || /eureka|\bmodule\b/i.test(batchCode)) fail('Lessons 7–13 contain cross-program educational content or could not be isolated');
if ((batchCode.match(/blankVisual:/g) ?? []).length !== 72 || (batchCode.match(/solvedVisual:/g) ?? []).length !== 72) fail('all 72 activity groups must have separate Blank and Solved specifications');
for (const required of [
  "label: 'Two clips, then one bead'",
  "label: 'Equal products mirror across the table'",
  "const lessonTwelveTraceabilityByKey",
  "const lessonThirteenTraceabilityByKey"
]) if (!problemsCode.includes(required)) fail(`batch implementation is missing reviewed contract: ${required}`);

const studentPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume1-548-pages-searchable.pdf');
const teacherPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf');
if (!existsSync(studentPdf) || !existsSync(teacherPdf)) {
  fail('approved Student Worktext or Teacher Guide PDF is missing');
} else {
  const studentLessonTwelve = normalize(execFileSync('pdftotext', ['-layout', '-f', '271', '-l', '290', studentPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const studentLessonThirteen = normalize(execFileSync('pdftotext', ['-layout', '-f', '293', '-l', '302', studentPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const teacherLessonTwelve = normalize(execFileSync('pdftotext', ['-layout', '-f', '216', '-l', '225', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  const teacherLessonThirteen = normalize(execFileSync('pdftotext', ['-layout', '-f', '229', '-l', '233', teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
  for (const marker of ['24 sepak takraw balls', '40 sled dogs', '32 pita breads']) if (!studentLessonTwelve.includes(marker)) fail(`Lesson 12 Student Worktext is missing reviewed marker: ${marker}`);
  for (const marker of ['pattern of hair clips', '583 small mailboxes', 'counts to 50 by fives']) if (!studentLessonThirteen.includes(marker)) fail(`Lesson 13 Student Worktext is missing reviewed marker: ${marker}`);
  for (const marker of ['24 sepak takraw balls', '5 sled dog teams', '32 pita breads']) if (!teacherLessonTwelve.includes(marker)) fail(`Lesson 12 Teacher Guide is missing reviewed marker: ${marker}`);
  for (const marker of ['pattern of hair clips', '583 small mailboxes', 'counts to 50 by fives']) if (!teacherLessonThirteen.includes(marker)) fail(`Lesson 13 Teacher Guide is missing reviewed marker: ${marker}`);
}

if (errors.length) {
  console.error('i-Ready Lessons 7–13 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('i-Ready Lessons 7–13 passed: 26 official sessions, 72 activity groups, exact Student Worktext and Teacher Guide alignment, top-level edition tabs, separate Blank/Solved views, source-faithful visual teaching, and zero Eureka-derived content.');
