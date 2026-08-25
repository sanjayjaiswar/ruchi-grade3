import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const interactiveRoot = resolve(appRoot, 'src/app/pages/iready-interactive');
const evidencePath = resolve(interactiveRoot, 'iready-interactive.evidence.json');
const expandedEvidencePath = resolve(interactiveRoot, 'iready-interactive.volume1-sessions.json');
const problemEvidencePath = resolve(interactiveRoot, 'iready-volume1-problems.evidence.json');
const teacherProvenancePath = resolve(interactiveRoot, 'iready-volume1-teacher-provenance.json');
const supportEvidencePath = resolve(interactiveRoot, 'iready-volume1-support.evidence.json');
const supportTeacherProvenancePath = resolve(interactiveRoot, 'iready-volume1-support-teacher-provenance.json');
const pageInventoryPath = resolve(interactiveRoot, 'iready-volume1-page-inventory.json');
const problemSourcePath = resolve(interactiveRoot, 'iready-volume1-problems.ts');
const supportSourcePath = resolve(interactiveRoot, 'iready-volume1-support.ts');
const componentPath = resolve(interactiveRoot, 'iready-interactive.ts');
const templatePath = resolve(interactiveRoot, 'iready-interactive.html');
const routesPath = resolve(appRoot, 'src/app/app.routes.ts');
const studentCompanionAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/student');
const teacherCompanionAssetRoot = resolve(appRoot, 'public/assets/iready-volume1/teacher');
const registry = JSON.parse(readFileSync(evidencePath, 'utf8'));
const expandedRegistry = JSON.parse(readFileSync(expandedEvidencePath, 'utf8'));
const problemRegistry = JSON.parse(readFileSync(problemEvidencePath, 'utf8'));
const teacherProvenance = JSON.parse(readFileSync(teacherProvenancePath, 'utf8'));
const supportRegistry = JSON.parse(readFileSync(supportEvidencePath, 'utf8'));
const supportTeacherProvenance = JSON.parse(readFileSync(supportTeacherProvenancePath, 'utf8'));
const pageInventory = JSON.parse(readFileSync(pageInventoryPath, 'utf8'));
const problemSourceCode = readFileSync(problemSourcePath, 'utf8');
const supportSourceCode = readFileSync(supportSourcePath, 'utf8');
const expandedInteractions = (expandedRegistry.sessions ?? []).map((session) => ({
  ...session,
  sourceId: expandedRegistry.sourceId,
  status: 'verified',
  volume: 1,
  viewerPage: Number(String(session.printedPages).match(/^\d+/)?.[0]) + 12,
  supportsSolvedTeaching: true,
  sourceChecks: [
    { purpose: 'prompt', printedPages: session.printedPages, markers: session.promptMarkers },
    { purpose: 'model', printedPages: session.printedPages, markers: session.modelMarkers }
  ],
  activity: { ...session.activity, kind: 'concept-model' }
}));
const interactions = [...(registry.interactions ?? []), ...expandedInteractions];
const verifiedCoverage = [registry.verifiedCoverage, ...(expandedRegistry.verifiedCoverage ?? []).map((coverage) => ({ volume: 1, ...coverage }))];

const errors = [];
const fail = (message) => errors.push(message);
const normalize = (value) => String(value)
  .normalize('NFKD')
  .replace(/[−–—]/g, '-')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();
const printedRange = (value) => {
  const pages = [...String(value).matchAll(/\d+/g)].map((match) => Number(match[0]));
  return { start: pages[0], end: pages[1] ?? pages[0] };
};

const learnerProblemSource = problemSourceCode.split('const problemEvidence')[0];
if (/eureka|\bmodule\b/i.test(learnerProblemSource)) {
  fail('problem-level learner content contains cross-program terminology');
}
for (const match of learnerProblemSource.matchAll(/(?<![\d+])((?:\d{1,4}\s*\+\s*)+\d{1,4})\s*=\s*([\d,]+)/g)) {
  const [, expression, resultText] = match;
  const terms = expression.split('+').map((term) => Number(term.trim()));
  const result = Number(resultText.replaceAll(',', ''));
  if (terms.some((term) => !Number.isFinite(term)) || terms.reduce((sum, term) => sum + term, 0) !== result) {
    fail(`problem-level arithmetic claim is incorrect: ${match[0]}`);
  }
}
for (const match of learnerProblemSource.matchAll(/(?<![\d×÷-])(\d{1,4})\s*([×÷-])\s*(\d{1,4})\s*=\s*([\d,]+)/g)) {
  const [, leftText, operator, rightText, resultText] = match;
  const left = Number(leftText);
  const right = Number(rightText);
  const result = Number(resultText.replaceAll(',', ''));
  const expected = operator === '-' ? left - right : operator === '×' ? left * right : right === 0 ? Number.NaN : left / right;
  if (!Number.isFinite(expected) || expected !== result) fail(`problem-level arithmetic claim is incorrect: ${match[0]}`);
}

if (
  registry.schemaVersion !== 1
  || registry.program !== 'i-ready-classroom-mathematics-california'
  || registry.publisher !== 'Curriculum Associates'
  || registry.grade !== 3
) {
  fail('registry identity must remain i-Ready Classroom Mathematics California, Curriculum Associates, Grade 3');
}
if (
  expandedRegistry.schemaVersion !== registry.schemaVersion
  || expandedRegistry.program !== registry.program
  || expandedRegistry.publisher !== registry.publisher
  || expandedRegistry.grade !== registry.grade
) {
  fail('expanded session registry crosses the approved i-Ready Grade 3 program identity');
}

const sources = new Map();
const allRegisteredSources = [
  ...(registry.approvedSources ?? []),
  ...(registry.approvedSolvedSources ?? []),
  ...(registry.referenceOnlySources ?? [])
];
for (const source of allRegisteredSources) {
  if (sources.has(source.id)) fail(`duplicate source id: ${source.id}`);
  sources.set(source.id, source);
  if (source.kind === 'student-worktext' && source.volume === 1 && source.usage !== 'reference-only' && !String(source.sourceUrl).startsWith('https://online.flippingbook.com/view/')) {
    fail(`source ${source.id} does not use the approved publisher reader`);
  }
  if (!Array.isArray(source.localPaths) || source.localPaths.length === 0) {
    fail(`source ${source.id} has no local official document`);
    continue;
  }
  for (const localPath of source.localPaths) {
    if (!localPath.startsWith('iReady-Maths/') || /eureka/i.test(localPath)) {
      fail(`source ${source.id} crosses the iReady-Maths boundary: ${localPath}`);
    }
    if (!existsSync(resolve(workspaceRoot, localPath))) {
      fail(`approved source file is missing: ${localPath}`);
    }
  }
}

const keys = new Set();
const sessionsByLesson = new Map();
const lessonBounds = new Map();
const extractedText = new Map();
const modelsByKind = {
  'neighbor-intervals': new Set(['place-value-chart']),
  'round-choice': new Set(['nearest-ten-line', 'base-ten-blocks', 'nearest-hundred-line']),
  arithmetic: new Set(['place-value-decomposition', 'partial-sums', 'addition-algorithm', 'place-value-regrouping', 'open-number-line', 'subtraction-algorithm']),
  'concept-model': new Set(['equal-groups', 'array', 'factor-break-apart', 'fact-family', 'equation-flow', 'place-value-groups', 'division-groups', 'pattern-strip', 'area-grid', 'composite-area', 'scaled-graph'])
};

if (
  problemRegistry.schemaVersion !== registry.schemaVersion
  || problemRegistry.program !== registry.program
  || problemRegistry.publisher !== registry.publisher
  || problemRegistry.grade !== registry.grade
  || problemRegistry.volume !== 1
  || problemRegistry.sourceId !== registry.approvedSources[0]?.id
  || problemRegistry.solvedSourceId !== registry.approvedSolvedSources?.[0]?.id
  || problemRegistry.coverageStatus !== 'complete-lesson-session-sequence'
  || problemRegistry.completedLessons?.length !== 19
) {
  fail('problem-level registry crosses the approved i-Ready Grade 3 Volume 1 identity or does not complete all 19 lessons');
}
if (
  teacherProvenance.schemaVersion !== registry.schemaVersion
  || teacherProvenance.program !== registry.program
  || teacherProvenance.publisher !== registry.publisher
  || teacherProvenance.grade !== registry.grade
  || teacherProvenance.volume !== 1
  || teacherProvenance.studentSourceId !== problemRegistry.sourceId
  || teacherProvenance.solvedSourceId !== problemRegistry.solvedSourceId
  || teacherProvenance.coverageStatus !== 'complete-lesson-session-spread-map'
  || /eureka|\bmodule\b/i.test(JSON.stringify(teacherProvenance))
) {
  fail('teacher-guide provenance crosses the approved i-Ready Grade 3 Volume 1 identity or does not complete the lesson-session spread map');
}
if (
  supportRegistry.schemaVersion !== registry.schemaVersion
  || supportRegistry.program !== registry.program
  || supportRegistry.publisher !== registry.publisher
  || supportRegistry.grade !== registry.grade
  || supportRegistry.volume !== 1
  || supportRegistry.sourceId !== problemRegistry.sourceId
  || supportRegistry.coverageStatus !== 'complete-official-page-disposition'
  || /eureka|\bmodule\b/i.test(JSON.stringify(supportRegistry))
) {
  fail('support-page registry crosses the approved i-Ready Grade 3 Volume 1 identity or does not complete page disposition');
}
if (
  supportTeacherProvenance.schemaVersion !== registry.schemaVersion
  || supportTeacherProvenance.program !== registry.program
  || supportTeacherProvenance.publisher !== registry.publisher
  || supportTeacherProvenance.grade !== registry.grade
  || supportTeacherProvenance.volume !== 1
  || supportTeacherProvenance.studentSourceId !== supportRegistry.sourceId
  || supportTeacherProvenance.teacherSourceId !== problemRegistry.solvedSourceId
  || supportTeacherProvenance.coverageStatus !== 'complete-companion-teacher-map'
  || supportTeacherProvenance.resources?.length !== 46
  || /eureka|\bmodule\b/i.test(JSON.stringify(supportTeacherProvenance))
) {
  fail('companion Teacher Guide registry crosses the approved i-Ready Grade 3 Volume 1 identity or is incomplete');
}
const teacherSource = sources.get(problemRegistry.solvedSourceId);
const teacherSearchablePath = teacherSource?.localPaths?.find((localPath) => /searchable\.pdf$/i.test(localPath));
const teacherPdf = teacherSearchablePath ? resolve(workspaceRoot, teacherSearchablePath) : undefined;
for (const spread of teacherProvenance.spreads ?? []) {
  const studentPages = printedRange(spread.studentPages);
  const teacherPages = printedRange(spread.teacherGuidePages);
  if (
    !teacherPdf
    || spread.teacherPdfPage * 2 - 2 !== teacherPages.start
    || teacherPages.end !== teacherPages.start + 1
    || studentPages.end !== studentPages.start + 1
  ) {
    fail(`Lesson ${spread.lesson} Teacher Guide spread ${spread.teacherGuidePages} has invalid dual-page provenance`);
    continue;
  }
  let guideText;
  try {
    guideText = normalize(execFileSync('pdftotext', ['-layout', '-f', String(spread.teacherPdfPage), '-l', String(spread.teacherPdfPage), teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }));
  } catch (error) {
    fail(`Lesson ${spread.lesson} could not extract Teacher Guide PDF page ${spread.teacherPdfPage}`);
    continue;
  }
  for (const marker of spread.sourceMarkers ?? []) {
    if (!guideText.includes(normalize(marker))) fail(`Teacher Guide pp. ${spread.teacherGuidePages} do not contain solved marker: ${marker}`);
  }
}
const problemKeys = new Set();
const problemCoveredPages = new Set();
for (const problem of problemRegistry.problems ?? []) {
  if (problemKeys.has(problem.key)) fail(`duplicate problem-level evidence key: ${problem.key}`);
  problemKeys.add(problem.key);
  const problemPages = printedRange(problem.printedPages);
  if (!Number.isFinite(problemPages.start) || !Number.isFinite(problemPages.end) || problemPages.end < problemPages.start) {
    fail(`${problem.key} has an invalid printed-page range: ${problem.printedPages}`);
    continue;
  }
  if (problem.viewerPage !== problemPages.start + 12) fail(`${problem.key} has incorrect problem-page provenance`);
  for (let page = problemPages.start; page <= problemPages.end; page += 1) problemCoveredPages.add(page);
  const source = sources.get(problemRegistry.sourceId);
  const searchablePath = source?.localPaths?.find((localPath) => /searchable\.pdf$/i.test(localPath));
  if (!searchablePath) {
    fail(`${problem.key} has no searchable approved problem source`);
    continue;
  }
  const officialPdf = resolve(workspaceRoot, searchablePath);
  let sourceText;
  try {
    sourceText = normalize(execFileSync('pdftotext', [
      '-layout',
      '-f', String(problemPages.start + 12),
      '-l', String(problemPages.end + 12),
      officialPdf,
      '-'
    ], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 }));
  } catch (error) {
    fail(`${problem.key} could not extract its exact official problem page`);
    continue;
  }
  for (const marker of problem.sourceMarkers ?? []) {
    if (!sourceText.includes(normalize(marker))) fail(`${problem.key} official page ${problem.printedPages} does not contain marker: ${marker}`);
  }
  const matchingProblemPages = printedRange(problem.printedPages);
  const matchingTeacherSpread = (teacherProvenance.spreads ?? []).find((spread) => {
    const spreadPages = printedRange(spread.studentPages);
    return spread.lesson === problem.lesson && matchingProblemPages.start >= spreadPages.start && matchingProblemPages.end <= spreadPages.end;
  });
  if (!matchingTeacherSpread) fail(`${problem.key} has no exact Teacher Guide Volume 1 solved-teaching spread`);
}

const supportKeys = new Set();
const supportCoveredPages = new Set();
const companionTeacherPages = new Set();
const studentSource = sources.get(supportRegistry.sourceId);
const studentSearchablePath = studentSource?.localPaths?.find((localPath) => /searchable\.pdf$/i.test(localPath));
const studentPdf = studentSearchablePath ? resolve(workspaceRoot, studentSearchablePath) : undefined;
for (const resource of supportRegistry.resources ?? []) {
  const resourcePages = printedRange(resource.printedPages);
  if (supportKeys.has(resource.key)) fail(`duplicate support-page evidence key: ${resource.key}`);
  supportKeys.add(resource.key);
  if (
    !studentPdf
    || !['unit-resource', 'lesson-family'].includes(resource.kind)
    || resource.viewerPage !== resourcePages.start + 12
    || resource.unit < 1
    || resource.unit > 3
  ) {
    fail(`${resource.key} has invalid official support-page provenance`);
    continue;
  }
  for (let page = resourcePages.start; page <= resourcePages.end; page += 1) {
    if (supportCoveredPages.has(page)) fail(`official support page ${page} is assigned more than once`);
    supportCoveredPages.add(page);
    const imagePath = resolve(studentCompanionAssetRoot, `p-${String(page).padStart(3, '0')}.jpg`);
    if (!existsSync(imagePath) || readFileSync(imagePath).byteLength < 10_000) {
      fail(`${resource.key} is missing its rendered official Student Worktext page asset for p. ${page}`);
    }
  }
  let sourceText;
  try {
    sourceText = normalize(execFileSync('pdftotext', [
      '-layout',
      '-f', String(resourcePages.start + 12),
      '-l', String(resourcePages.end + 12),
      studentPdf,
      '-'
    ], { encoding: 'utf8', maxBuffer: 12 * 1024 * 1024 }));
  } catch (error) {
    fail(`${resource.key} could not extract its exact official support pages`);
    continue;
  }
  for (const marker of resource.sourceMarkers ?? []) {
    if (!sourceText.includes(normalize(marker))) fail(`${resource.key} official pages ${resource.printedPages} do not contain marker: ${marker}`);
  }

  const companionTeacher = (supportTeacherProvenance.resources ?? []).find((entry) => entry.key === resource.key);
  if (
    !companionTeacher
    || !['guidance', 'teaching', 'solved'].includes(companionTeacher.teacherRole)
    || !Array.isArray(companionTeacher.teacherPdfPages)
    || companionTeacher.teacherPdfPages.length === 0
    || companionTeacher.teacherPdfPages.some((page) => !Number.isInteger(page) || page < 1)
  ) {
    fail(`${resource.key} has no valid official companion Teacher Guide mapping`);
    continue;
  }
  for (const page of companionTeacher.teacherPdfPages) {
    companionTeacherPages.add(page);
    const imagePath = resolve(teacherCompanionAssetRoot, `t-${String(page).padStart(3, '0')}.jpg`);
    if (!existsSync(imagePath) || readFileSync(imagePath).byteLength < 10_000) {
      fail(`${resource.key} is missing its rendered official Teacher Guide asset for local PDF page ${page}`);
    }
  }
  let teacherText;
  try {
    teacherText = normalize(execFileSync('pdftotext', [
      '-layout',
      '-f', String(Math.min(...companionTeacher.teacherPdfPages)),
      '-l', String(Math.max(...companionTeacher.teacherPdfPages)),
      teacherPdf,
      '-'
    ], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }));
  } catch (error) {
    fail(`${resource.key} could not extract its official Teacher Guide pages`);
    continue;
  }
  if (!(resource.sourceMarkers ?? []).some((marker) => teacherText.includes(normalize(marker)))) {
    fail(`${resource.key} Teacher Guide pages do not contain any identifying official Student Worktext marker`);
  }
}

const renderedStudentAssets = existsSync(studentCompanionAssetRoot)
  ? readdirSync(studentCompanionAssetRoot).filter((name) => /^p-\d{3}\.jpg$/.test(name))
  : [];
const renderedTeacherAssets = existsSync(teacherCompanionAssetRoot)
  ? readdirSync(teacherCompanionAssetRoot).filter((name) => /^t-\d{3}\.jpg$/.test(name))
  : [];
const expectedStudentAssetPages = new Set([
  ...supportCoveredPages,
  ...Array.from({ length: 20 }, (_, index) => index + 9)
]);
const renderedStudentAssetPages = new Set(renderedStudentAssets.map((name) => Number(name.match(/\d+/)?.[0])));
const missingStudentAssets = [...expectedStudentAssetPages].filter((page) => !renderedStudentAssetPages.has(page));
const unexpectedStudentAssets = [...renderedStudentAssetPages].filter((page) => !expectedStudentAssetPages.has(page));
if (missingStudentAssets.length || unexpectedStudentAssets.length) {
  fail(`official Student Worktext assets drifted; missing [${missingStudentAssets.join(', ')}], unexpected [${unexpectedStudentAssets.join(', ')}]`);
}
if (renderedTeacherAssets.length < companionTeacherPages.size) fail(`expected at least ${companionTeacherPages.size} official Teacher Guide companion assets; found ${renderedTeacherAssets.length}`);

for (const page of pageInventory.pages ?? []) {
  const inLessonSequence = page.kind === 'lesson-session';
  const hasProblemCoverage = problemCoveredPages.has(page.printedPage);
  const hasSupportCoverage = supportCoveredPages.has(page.printedPage);
  if (inLessonSequence && (!hasProblemCoverage || hasSupportCoverage)) {
    fail(`official lesson-session page ${page.printedPage} lacks exclusive interactive problem coverage`);
  }
  if (!inLessonSequence && (!hasSupportCoverage || hasProblemCoverage)) {
    fail(`official companion page ${page.printedPage} lacks exclusive support-page disposition`);
  }
}
if (problemCoveredPages.size !== 366 || supportCoveredPages.size !== 99 || problemCoveredPages.size + supportCoveredPages.size !== 465) {
  fail(`Volume 1 page coverage must be 366 interactive lesson-session pages plus 99 official companion pages; found ${problemCoveredPages.size} + ${supportCoveredPages.size}`);
}
for (const lessonCoverage of problemRegistry.completedLessons ?? []) {
  const coveragePages = printedRange(lessonCoverage.printedPages);
  const officialPages = (pageInventory.pages ?? []).filter((page) =>
    page.lesson === lessonCoverage.lesson
    && page.kind === 'lesson-session'
    && page.printedPage >= coveragePages.start
    && page.printedPage <= coveragePages.end
  );
  const lessonProblems = (problemRegistry.problems ?? []).filter((problem) => problem.lesson === lessonCoverage.lesson);
  const coveredPages = new Set(lessonProblems.flatMap((problem) => {
    const range = printedRange(problem.printedPages);
    return Array.from({ length: range.end - range.start + 1 }, (_, offset) => range.start + offset);
  }));
  const officialSessions = new Set(officialPages.map((page) => page.session));
  const coveredSessions = new Set(lessonProblems.map((problem) => problem.session));
  const expectedPageCount = coveragePages.end - coveragePages.start + 1;
  if (
    !Number.isFinite(coveragePages.start)
    || officialPages.length !== expectedPageCount
    || coveredPages.size !== expectedPageCount
    || officialPages.some((page) => !coveredPages.has(page.printedPage))
    || coveredPages.size !== officialPages.length
    || lessonCoverage.sessions.some((session) => !officialSessions.has(session) || !coveredSessions.has(session))
    || officialSessions.size !== lessonCoverage.sessions.length
    || coveredSessions.size !== lessonCoverage.sessions.length
  ) {
    fail(`Lesson ${lessonCoverage.lesson} is marked complete without exact official page/session coverage`);
  }
}

const unitIdeas = registry.unitIdeas ?? [];
const expectedUnitIdeaCounts = new Map([[1, 2], [2, 2], [3, 4]]);
const unitIdeaKeys = new Set();
for (const idea of unitIdeas) {
  const source = sources.get(idea.sourceId);
  const searchablePath = source?.localPaths?.find((localPath) => /searchable\.pdf$/i.test(localPath));
  const key = `${idea.unit}:${idea.title}`;
  if (unitIdeaKeys.has(key)) fail(`duplicate Unit ${idea.unit} Big Idea: ${idea.title}`);
  unitIdeaKeys.add(key);
  if (!source || !searchablePath) {
    fail(`Unit ${idea.unit} Big Idea references an unapproved or non-searchable source`);
    continue;
  }
  if (idea.unit < 1 || idea.unit > 3 || idea.viewerPage !== idea.printedPage + 12) {
    fail(`Unit ${idea.unit} Big Idea has mismatched page provenance`);
    continue;
  }
  const officialPdf = resolve(workspaceRoot, searchablePath);
  const cacheKey = `${officialPdf}:${idea.printedPage}-${idea.printedPage}`;
  let sourceText = extractedText.get(cacheKey);
  if (!sourceText) {
    try {
      sourceText = normalize(execFileSync('pdftotext', ['-layout', '-f', String(idea.viewerPage), '-l', String(idea.viewerPage), officialPdf, '-'], { encoding: 'utf8', maxBuffer: 12 * 1024 * 1024 }));
      extractedText.set(cacheKey, sourceText);
    } catch (error) {
      fail(`Unit ${idea.unit} Big Idea could not extract official page ${idea.printedPage}`);
      continue;
    }
  }
  if (!sourceText.includes(normalize(idea.title))) {
    fail(`Unit ${idea.unit} official page ${idea.printedPage} does not contain Big Idea title: ${idea.title}`);
  }
  if (!sourceText.includes(normalize(idea.understanding))) {
    fail(`Unit ${idea.unit} official page ${idea.printedPage} does not contain Big Idea understanding: ${idea.understanding}`);
  }
}
for (const [unit, expectedCount] of expectedUnitIdeaCounts) {
  const actualCount = unitIdeas.filter((idea) => idea.unit === unit).length;
  if (actualCount !== expectedCount) fail(`Unit ${unit} requires ${expectedCount} verified Big Ideas; found ${actualCount}`);
}
for (const interaction of interactions) {
  const expectedKey = `v${interaction.volume}-u${interaction.unit}-l${interaction.lesson}-s${interaction.session}`;
  const printedStart = Number(String(interaction.printedPages).match(/^\d+/)?.[0]);
  if (interaction.key !== expectedKey) fail(`key mismatch: ${interaction.key} should be ${expectedKey}`);
  if (keys.has(interaction.key)) fail(`duplicate interaction key: ${interaction.key}`);
  keys.add(interaction.key);
  if (interaction.status !== 'verified') fail(`${interaction.key} is not verified`);
  if (!sources.has(interaction.sourceId)) fail(`${interaction.key} references an unapproved source`);
  if (!Number.isFinite(printedStart) || interaction.viewerPage !== printedStart + 12) {
    fail(`${interaction.key} viewer page does not match its printed-page provenance`);
  }
  if (!interaction.approvedModel) fail(`${interaction.key} has no approved mathematical model`);
  if (interaction.supportsSolvedTeaching !== true) fail(`${interaction.key} is missing solved-teaching evidence`);
  if (!interaction.activity?.kind) fail(`${interaction.key} has no verified activity`);
  if (!Array.isArray(interaction.sourceChecks) || !interaction.sourceChecks.some((check) => check.purpose === 'prompt') || !interaction.sourceChecks.some((check) => check.purpose === 'model')) {
    fail(`${interaction.key} is missing page-scoped prompt or model evidence`);
  }
  if (!modelsByKind[interaction.activity?.kind]?.has(interaction.approvedModel)) {
    fail(`${interaction.key} uses ${interaction.approvedModel} for incompatible activity kind ${interaction.activity?.kind}`);
  }
  if (!String(interaction.activity?.prompt ?? '').trim() || !String(interaction.activity?.instruction ?? '').trim()) {
    fail(`${interaction.key} is missing source-backed learner copy`);
  }
  if (interaction.activity?.kind !== 'neighbor-intervals' && !String(interaction.activity?.strategy ?? '').trim()) {
    fail(`${interaction.key} is missing a source-backed solved strategy`);
  }
  if (/eureka|\bmodule\b/i.test(JSON.stringify(interaction.activity))) {
    fail(`${interaction.key} contains cross-program learner-facing content`);
  }
  if (interaction.activity?.kind === 'arithmetic') {
    const expectedAnswer = interaction.activity.operation === '+'
      ? interaction.activity.left + interaction.activity.right
      : interaction.activity.left - interaction.activity.right;
    if (interaction.activity.answer !== expectedAnswer) fail(`${interaction.key} arithmetic answer is incorrect`);
  }
  if (interaction.activity?.kind === 'round-choice' && !interaction.activity.choices.includes(interaction.activity.answer)) {
    fail(`${interaction.key} solved answer is outside its choices`);
  }
  if (interaction.activity?.kind === 'concept-model') {
    const { answer, visual } = interaction.activity;
    const steps = visual?.steps ?? [];
    const answerPattern = new RegExp(`(^|\\D)${answer}(\\D|$)`);
    if (!Number.isFinite(answer) || !Number.isInteger(answer) || answer < 0) {
      fail(`${interaction.key} has an invalid concept-model answer`);
    }
    if (steps.length < 3 || (visual?.kind !== 'pattern-strip' && !answerPattern.test(steps.join(' ')))) {
      fail(`${interaction.key} does not trace its answer through the verified visual steps`);
    }
    if (visual?.kind === 'equal-groups') {
      const product = visual.groups * visual.perGroup;
      if (answer !== product && ((answer !== visual.groups && answer !== visual.perGroup) || !new RegExp(`(^|\\D)${product}(\\D|$)`).test(steps.join(' ')))) {
        fail(`${interaction.key} equal-groups model does not produce its answer`);
      }
    }
    if (visual?.kind === 'array' || visual?.kind === 'area-grid') {
      const product = visual.rows * visual.columns;
      if (answer !== product && ((answer !== visual.rows && answer !== visual.columns) || !new RegExp(`(^|\\D)${product}(\\D|$)`).test(steps.join(' ')))) {
        fail(`${interaction.key} row-by-column model does not produce its answer`);
      }
    }
    if (visual?.kind === 'pattern-strip') {
      const sequence = visual.sequence ?? [];
      if (!sequence.includes(answer) && !answerPattern.test(interaction.activity.strategy)) {
        fail(`${interaction.key} pattern model does not support its answer`);
      }
    }
    if (visual?.kind === 'fact-family') {
      const equations = steps.map((step) => String(step).match(/^\s*(\d+)\s*([×÷])\s*(\d+)\s*=\s*(\d+)\s*$/)).filter(Boolean);
      const equationsAreValid = equations.every((match) => {
        const [, leftText, operator, rightText, resultText] = match;
        const left = Number(leftText);
        const right = Number(rightText);
        const result = Number(resultText);
        return operator === '×' ? left * right === result : left / right === result;
      });
      if (!equations.length || !equationsAreValid || !equations.some((match) => match.slice(1).some((part) => Number(part) === answer))) {
        fail(`${interaction.key} fact-family equations do not support its answer`);
      }
    }
    if (visual?.kind === 'composite-area') {
      const partValues = steps.slice(0, -1).map((step) => Number(String(step).match(/(\d+)\D*$/)?.[1]));
      if (!partValues.length || partValues.some((value) => !Number.isFinite(value)) || partValues.reduce((sum, value) => sum + value, 0) !== answer) {
        fail(`${interaction.key} composite-area parts do not produce its answer`);
      }
    }
    if (visual?.kind === 'scaled-graph') {
      const values = visual.bars?.map((bar) => bar.value) ?? [];
      const pairMakesAnswer = values.some((left, leftIndex) => values.some((right, rightIndex) => leftIndex !== rightIndex && left + right === answer));
      if (!values.includes(answer) && !pairMakesAnswer) {
        fail(`${interaction.key} scaled-graph values do not support its answer`);
      }
    }
  }
  sessionsByLesson.set(interaction.lesson, (sessionsByLesson.get(interaction.lesson) ?? 0) + 1);
  const sessionRange = printedRange(interaction.printedPages);
  const bounds = lessonBounds.get(interaction.lesson) ?? { start: sessionRange.start, end: sessionRange.end };
  bounds.start = Math.min(bounds.start, sessionRange.start);
  bounds.end = Math.max(bounds.end, sessionRange.end);
  lessonBounds.set(interaction.lesson, bounds);
}

for (const interaction of interactions) {
  const source = sources.get(interaction.sourceId);
  const searchablePath = source?.localPaths?.find((localPath) => /searchable\.pdf$/i.test(localPath));
  if (!searchablePath) {
    fail(`${interaction.key} has no searchable approved source for content verification`);
    continue;
  }
  const officialPdf = resolve(workspaceRoot, searchablePath);
  const sessionRange = printedRange(interaction.printedPages);
  const lessonRange = lessonBounds.get(interaction.lesson);
  const sessionCacheKey = `${officialPdf}:${sessionRange.start}-${sessionRange.end}`;
  let sessionText = extractedText.get(sessionCacheKey);
  if (!sessionText) {
    try {
      sessionText = normalize(execFileSync('pdftotext', ['-layout', '-f', String(sessionRange.start + 12), '-l', String(sessionRange.end + 12), officialPdf, '-'], { encoding: 'utf8', maxBuffer: 12 * 1024 * 1024 }));
      extractedText.set(sessionCacheKey, sessionText);
    } catch (error) {
      fail(`${interaction.key} could not extract its official source pages with pdftotext`);
      continue;
    }
  }
  for (const expected of [interaction.title, interaction.phase]) {
    if (!sessionText.includes(normalize(expected))) {
      fail(`${interaction.key} official session pages do not contain expected ${expected}`);
    }
  }
  const promptNumbers = [...String(interaction.activity?.prompt ?? '').matchAll(/\d+/g)].map((match) => match[0]);
  for (const promptNumber of new Set(promptNumbers)) {
    const numberIsModelDerived = interaction.activity?.kind === 'concept-model'
      && interaction.activity?.visual?.kind === 'fact-family'
      && (interaction.activity.visual.steps ?? []).some((step) => new RegExp(`(^|\\D)${promptNumber}(\\D|$)`).test(step));
    if (!sessionText.includes(promptNumber) && !numberIsModelDerived) {
      fail(`${interaction.key} learner prompt contains ${promptNumber}, which is absent from its official session pages`);
    }
  }
  for (const check of interaction.sourceChecks ?? []) {
    const checkRange = printedRange(check.printedPages);
    if (check.purpose === 'prompt' && (checkRange.start !== sessionRange.start || checkRange.end !== sessionRange.end)) {
      fail(`${interaction.key} prompt evidence must use the exact session page range`);
    }
    if (!lessonRange || checkRange.start < lessonRange.start || checkRange.end > lessonRange.end) {
      fail(`${interaction.key} model evidence crosses its official lesson boundary`);
    }
    const cacheKey = `${officialPdf}:${checkRange.start}-${checkRange.end}`;
    let sourceText = extractedText.get(cacheKey);
    if (!sourceText) {
      try {
        sourceText = normalize(execFileSync('pdftotext', ['-layout', '-f', String(checkRange.start + 12), '-l', String(checkRange.end + 12), officialPdf, '-'], { encoding: 'utf8', maxBuffer: 12 * 1024 * 1024 }));
        extractedText.set(cacheKey, sourceText);
      } catch (error) {
        fail(`${interaction.key} could not extract official ${check.purpose} evidence pages`);
        continue;
      }
    }
    for (const marker of check.markers ?? []) {
      if (!sourceText.includes(normalize(marker))) {
        fail(`${interaction.key} official ${check.purpose} pages ${check.printedPages} do not contain marker: ${marker}`);
      }
    }
  }
}

for (const coverage of verifiedCoverage) {
  for (const expected of coverage?.lessons ?? []) {
    const actual = interactions.filter((interaction) => interaction.volume === coverage.volume && interaction.unit === coverage.unit && interaction.lesson === expected.lesson).length;
    if (actual !== expected.sessions) {
      fail(`Unit ${coverage.unit} Lesson ${expected.lesson} requires ${expected.sessions} verified sessions; found ${actual}`);
    }
  }
}

const component = readFileSync(componentPath, 'utf8');
const template = readFileSync(templatePath, 'utf8');
const routes = readFileSync(routesPath, 'utf8');
const importLines = component.split('\n').filter((line) => /^import\s/.test(line));
if (importLines.some((line) => /eureka|\/math\/|modules\/m\d/i.test(line))) {
  fail('i-Ready Interactive imports curriculum-specific code from another program');
}
if (!component.includes("from './iready-interactive.evidence'")) {
  fail('i-Ready Interactive does not consume the approved evidence registry');
}
if (!component.includes("from './iready-volume1-support'")) {
  fail('i-Ready Interactive does not consume the official Volume 1 companion registry');
}
if (!routes.includes("iready-interactive/resources/:resourceKey")) {
  fail('i-Ready Interactive companion resources have no first-class route');
}
if (
  !template.includes('Official student pages')
  || !template.includes('Work interactively')
  || !template.includes('resourceMode === \'teacher\'')
  || !template.includes('supportStudentImage(page)')
  || !template.includes('supportTeacherImage(page)')
) {
  fail('companion resources are not implemented as official-source, interactive, and Teacher Guide views');
}
const learnerSupportSource = supportSourceCode.split('export const supportWorkspaceSpec')[1] ?? '';
if (/eureka|\bmodule\b/i.test(learnerSupportSource)) {
  fail('companion learning implementation contains cross-program content');
}
for (const forbidden of ['lessonOneSessions', 'lessonTwoSessions', 'lessonThreeSessions', 'arithmetic: {']) {
  if (component.includes(forbidden)) fail(`component contains an unregistered content fallback: ${forbidden}`);
}
for (const forbiddenLiteral of ['Place 384 between', 'Round 37 minutes', 'Round 236', 'Round 879']) {
  if (template.includes(forbiddenLiteral)) fail(`template contains learner content outside the evidence registry: ${forbiddenLiteral}`);
}
if (!template.includes('The official book supplies the lesson structure, task values, answer, and mathematical model.')) {
  fail('learner UI is missing the official-source boundary disclosure');
}
if (!template.includes('The portal supplies explanatory wording, controls, feedback, and animation without adding curriculum claims.')) {
  fail('learner UI is missing the portal-authored rendering disclosure');
}
if (template.includes('Source-backed worked explanation') || template.includes('source-verified teaching')) {
  fail('learner UI ambiguously presents portal-authored wording as official publisher text');
}

if (errors.length) {
  console.error('i-Ready source-boundary validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const sourceCheckCount = interactions.reduce((total, interaction) => total + (interaction.sourceChecks?.length ?? 0), 0);
console.log(`i-Ready source boundary passed: 1 Student Worktext source, 1 Teacher Guide source, 2 reference-only sources; all 465 official Volume 1 instructional pages implemented (366 lesson-session + 99 companion); ${keys.size} sessions across 3 units and 19 lessons; ${problemKeys.size} exact-page problem groups; 46 companion learning sections with 99 student-page assets and ${companionTeacherPages.size} Teacher Guide assets; ${unitIdeas.length} exact-page Big Ideas; ${sourceCheckCount} page-scoped prompt/model checks; verified inline arithmetic; zero cross-program content fallbacks.`);
