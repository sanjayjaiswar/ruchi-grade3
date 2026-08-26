import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const root = resolve(appRoot, 'src/app/pages/iready-interactive');
const load = (name) => JSON.parse(readFileSync(resolve(root, name), 'utf8'));
const evidence = load('iready-interactive.volume2-evidence.json');
const sessions = load('iready-interactive.volume2-sessions.json');
const inventory = load('iready-volume2-page-inventory.json');
const teacher = load('iready-volume2-teacher-provenance.json');
const runtime = readFileSync(resolve(root, 'iready-volume2.ts'), 'utf8');
const pageComponent = readFileSync(resolve(root, 'iready-volume2-page.ts'), 'utf8');
const template = readFileSync(resolve(root, 'iready-volume2-page.html'), 'utf8');
const visualWorkspace = readFileSync(resolve(appRoot, 'src/app/shared/problem-visual-workspace/problem-visual-workspace.ts'), 'utf8');
const visualTemplate = readFileSync(resolve(appRoot, 'src/app/shared/problem-visual-workspace/problem-visual-workspace.html'), 'utf8');
const assetBuilder = readFileSync(resolve(appRoot, 'scripts/build-iready-volume2-assets.mjs'), 'utf8');
const routes = readFileSync(resolve(appRoot, 'src/app/app.routes.ts'), 'utf8');
const studentPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume2-396-pages-searchable.pdf');
const teacherPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume2-540-pages-searchable.pdf');
const studentAssets = resolve(appRoot, 'public/assets/iready-volume2/student');
const teacherAssets = resolve(appRoot, 'public/assets/iready-volume2/teacher');
const errors = [];
const fail = (message) => errors.push(message);
const normalize = (value) => String(value).normalize('NFKD').replace(/[−–—]/g, '-').toLowerCase().replace(/\s+/g, ' ').trim();
const normalizeClaim = (value) => normalize(value).replace(/[^a-z0-9]+/g, ' ').trim();
const normalizeForHash = (value) => String(value).normalize('NFKD').replace(/[−–—]/g, '-').replace(/\s+/g, ' ').trim();
const hash = (value) => createHash('sha256').update(value).digest('hex');
const range = (value) => {
  const values = [...String(value).matchAll(/\d+/g)].map((match) => Number(match[0]));
  return { start: values[0], end: values[1] ?? values[0] };
};

for (const registry of [evidence, sessions, inventory, teacher]) {
  if (registry.schemaVersion !== 1 || registry.program !== 'i-ready-classroom-mathematics-california' || registry.publisher !== 'Curriculum Associates' || registry.grade !== 3 || registry.volume !== 2) {
    fail('a registry crosses the approved i-Ready Grade 3 Volume 2 identity');
  }
}
const runtimeWithoutBoundaryRegex = runtime.replace(/^.*\/eureka.*$/gim, '');
if (/eureka|\bmodule\b/i.test(JSON.stringify({ evidence, sessions, inventory, teacher })) || /eureka|\bmodule\b/i.test(`${runtimeWithoutBoundaryRegex}\n${pageComponent}\n${template}`)) {
  fail('Volume 2 learner implementation contains cross-program content or terminology');
}
if (evidence.coverageStatus !== 'complete-official-volume' || sessions.coverageStatus !== 'complete-official-session-sequence' || inventory.coverageStatus !== 'complete-official-volume-inventory' || teacher.coverageStatus !== 'complete-lesson-page-to-teacher-spread-map') {
  fail('one or more Volume 2 registries are not fail-closed complete');
}
for (const source of evidence.approvedSources ?? []) {
  if (source.volume !== 2 || source.localPaths.some((path) => !path.startsWith('iReady-Maths/') || /eureka/i.test(path))) fail(`invalid approved source ${source.id}`);
  for (const localPath of source.localPaths) if (!existsSync(resolve(workspaceRoot, localPath))) fail(`missing official source ${localPath}`);
}
if (evidence.approvedSources?.[0]?.usage !== 'exclusive-learner-content-and-sequence' || evidence.approvedSources?.[1]?.usage !== 'exclusive-guidance-and-solved-teaching') {
  fail('exclusive Student Worktext/Teacher Guide roles are not enforced');
}
if (sessions.sessions?.length !== 52) fail(`expected 52 sessions; found ${sessions.sessions?.length ?? 0}`);
const exactSessionRanges = [
  '20-1:475–478', '20-2:479–482', '20-3:483–484',
  '21-1:487–490', '21-2:491–494', '21-3:495–496',
  '22-1:499–502', '22-2:503–506', '22-3:507–508',
  '23-1:511–514', '23-2:515–520', '23-3:521–526', '23-4:527–532', '23-5:533–536',
  '24-1:539–542', '24-2:543–546', '24-3:547–548',
  '25-1:551–554', '25-2:555–560', '25-3:561–564',
  '26-1:567–570', '26-2:571–576', '26-3:577–582', '26-4:583–586',
  '27-1:609–612', '27-2:613–618', '27-3:619–624', '27-4:625–630', '27-5:631–634',
  '28-1:637–640', '28-2:641–646', '28-3:647–652', '28-4:653–656',
  '29-1:659–662', '29-2:663–668', '29-3:669–674', '29-4:675–678',
  '30-1:701–704', '30-2:705–708', '30-3:709–710',
  '31-1:713–716', '31-2:717–722', '31-3:723–728', '31-4:729–732',
  '32-1:735–738', '32-2:739–744', '32-3:745–750', '32-4:751–756', '32-5:757–760',
  '33-1:763–766', '33-2:767–772', '33-3:773–776'
];
const actualSessionRanges = (sessions.sessions ?? []).map((session) => `${session.lesson}-${session.session}:${session.printedPages}`);
if (JSON.stringify(actualSessionRanges) !== JSON.stringify(exactSessionRanges)) fail('official Volume 2 session boundaries drifted from the audited Student Worktext headers');
if (inventory.pages?.length !== 396) fail(`expected 396 official book pages; found ${inventory.pages?.length ?? 0}`);
if (inventory.lessons?.length !== 14) fail(`expected 14 lessons; found ${inventory.lessons?.length ?? 0}`);
if (teacher.spreads?.length !== 132) fail(`expected 132 Teacher Guide mappings; found ${teacher.spreads?.length ?? 0}`);

const sessionPages = new Set();
const sessionKeys = new Set();
const modelMarkers = {
  'fraction-parts': ['fraction'],
  'fraction-number-line': ['number line'],
  'equivalent-fractions': ['equivalent'],
  'whole-as-fraction': ['whole number'],
  'compare-fractions': ['compare'],
  'compare-symbols': ['symbol'],
  'line-plot': ['line plot'],
  clock: ['time'],
  'elapsed-time': ['time'],
  'liquid-volume': ['liquid volume'],
  mass: ['mass'],
  'shape-attributes': ['shapes'],
  quadrilaterals: ['quadrilateral'],
  'area-perimeter': ['perimeter'],
  'partition-shapes': ['equal']
};
for (const session of sessions.sessions ?? []) {
  const key = `${session.lesson}-${session.session}`;
  if (sessionKeys.has(key)) fail(`duplicate session ${key}`);
  sessionKeys.add(key);
  const pages = range(session.printedPages);
  let sourceText = '';
  for (let printedPage = pages.start; printedPage <= pages.end; printedPage += 1) {
    if (sessionPages.has(printedPage)) fail(`session page ${printedPage} is assigned twice`);
    sessionPages.add(printedPage);
    const viewerPage = printedPage - 454;
    const physicalPage = Math.floor(viewerPage / 2) + 1;
    const x = viewerPage % 2 === 0 ? 0 : 1728;
    sourceText += execFileSync('pdftotext', ['-layout', '-f', String(physicalPage), '-l', String(physicalPage), '-x', String(x), '-y', '0', '-W', '1728', '-H', '1822', studentPdf, '-'], { encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  }
  for (const marker of modelMarkers[session.model] ?? []) if (!normalize(sourceText).includes(normalize(marker))) fail(`${key} does not contain its model marker: ${marker}`);
}
if (sessionPages.size !== 236) fail(`expected 236 lesson-session printed pages; found ${sessionPages.size}`);

const viewerPages = new Set();
for (const page of inventory.pages ?? []) {
  if (viewerPages.has(page.viewerPage)) fail(`duplicate viewer page ${page.viewerPage}`);
  viewerPages.add(page.viewerPage);
  const expectedPrinted = page.viewerPage >= 13 && page.viewerPage <= 335 ? page.viewerPage + 454 : null;
  if (page.printedPage !== expectedPrinted) fail(`viewer page ${page.viewerPage} has incorrect printed-page mapping`);
  const physicalPage = page.viewerPage === 1 ? 1 : Math.floor(page.viewerPage / 2) + 1;
  const side = page.viewerPage === 1 || page.viewerPage % 2 === 0 ? 'left' : 'right';
  if (page.physicalPdfPage !== physicalPage || page.side !== side) fail(`viewer page ${page.viewerPage} has incorrect dual-page crop provenance`);
  const x = side === 'left' ? 0 : 1728;
  const sourceText = execFileSync('pdftotext', ['-layout', '-f', String(physicalPage), '-l', String(physicalPage), '-x', String(x), '-y', '0', '-W', '1728', '-H', '1822', studentPdf, '-'], { encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  if (hash(normalizeForHash(sourceText)) !== page.sourceTextSha256) fail(`viewer page ${page.viewerPage} source hash drifted`);
}
for (let page = 1; page <= 396; page += 1) if (!viewerPages.has(page)) fail(`official book page ${page} is absent`);
for (const printedPage of [679, 680, 777, 778]) {
  const page = inventory.pages?.find((candidate) => candidate.printedPage === printedPage);
  if (!page || page.lesson !== null || page.session !== null || page.kind === 'lesson-session') {
    fail(`official unit companion p. ${printedPage} is incorrectly assigned to a lesson session`);
  }
}
if (!runtime.includes("viewerStart: 225, viewerEnd: 238") || !runtime.includes("viewerStart: 323, viewerEnd: 336")) {
  fail('Unit 5 and Unit 6 reflection pages are missing from their official companion libraries');
}

for (const idea of evidence.unitIdeas ?? []) {
  const page = inventory.pages?.[idea.viewerPage - 1];
  if (!page || page.viewerPage !== idea.viewerPage || page.printedPage !== idea.printedPage || page.unit !== idea.unit) {
    fail(`Unit ${idea.unit} idea ${idea.title} has invalid page provenance`);
    continue;
  }
  const x = page.side === 'left' ? 0 : 1728;
  const sourceText = execFileSync('pdftotext', ['-layout', '-f', String(page.physicalPdfPage), '-l', String(page.physicalPdfPage), '-x', String(x), '-y', '0', '-W', '1728', '-H', '1822', studentPdf, '-'], { encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  if (!normalizeClaim(sourceText).includes(normalizeClaim(idea.title))) fail(`Unit ${idea.unit} idea title is not present on official p. ${idea.printedPage}`);
  if (!normalizeClaim(sourceText).includes(normalizeClaim(idea.understanding))) fail(`Unit ${idea.unit} idea statement is not present on official p. ${idea.printedPage}`);
}

for (const spread of teacher.spreads ?? []) {
  const student = range(spread.studentPages);
  const guide = range(spread.teacherGuideViewerPages);
  if (student.end !== student.start + 1 || guide.end !== guide.start + 1 || guide.start !== spread.teacherPdfPage * 2 - 2) fail(`invalid Teacher Guide map for Student Worktext pp. ${spread.studentPages}`);
  const sourceText = execFileSync('pdftotext', ['-layout', '-f', String(spread.teacherPdfPage), '-l', String(spread.teacherPdfPage), teacherPdf, '-'], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (hash(normalizeForHash(sourceText)) !== spread.sourceTextSha256) fail(`Teacher Guide spread ${spread.teacherPdfPage} source hash drifted`);
}

const studentFiles = existsSync(studentAssets) ? readdirSync(studentAssets).filter((file) => /viewer-\d{3}\.webp$/.test(file)) : [];
const teacherFiles = existsSync(teacherAssets) ? readdirSync(teacherAssets).filter((file) => /viewer-\d{3}\.webp$/.test(file)) : [];
if (studentFiles.length !== 396) fail(`expected 396 rendered student pages; found ${studentFiles.length}`);
if (teacherFiles.length !== 540) fail(`expected 540 rendered Teacher Guide pages; found ${teacherFiles.length}`);
if (!assetBuilder.includes("'-crop', String(cropX), '0', String(spreadWidth / 2), String(spreadHeight)") || assetBuilder.includes('--cropOffset')) {
  fail('Volume 2 page assets must crop explicit left/right logical pages, not centered half-spreads');
}
if (!assetBuilder.includes('writeLogicalPage(1, spreadWidth / 4, spreadPath)')) {
  fail('Volume 2 cover assets must preserve the publisher-centered first logical page');
}
if (!routes.includes("iready-interactive/volumes/2/lessons/:lessonNumber") || !routes.includes("iready-interactive/volumes/2/library/:groupKey")) fail('Volume 2 lesson or complete-book route is missing');
if (
  !template.includes('How this lesson is sourced')
  || !template.includes('<strong>Official book</strong>')
  || !template.includes('<strong>Interactive portal</strong>')
  || !template.includes('No other curriculum supplies content')
) fail('learner-facing hard source boundary is missing');
if (!template.includes('Exact official source') || !template.includes('Exact official activity') || !template.includes('(click)="replayLessonVisual()"')) fail('exact official activity teaching or embedded source evidence controls are missing');
if (!pageComponent.includes('v2ActivitiesForSession(this.selectedSession)') || !pageComponent.includes('v2VisualForActivity') || !template.includes('[spec]="selectedActivityVisual"')) {
  fail('Volume 2 sidebar entries must select exact source-traceable page activities');
}
if (pageComponent.includes("label: 'Official activity page'") || pageComponent.includes('this.selectedSessionPages.map((printedPage)')) {
  fail('Volume 2 has regressed to fake one-button-per-page activity coverage');
}
if (
  !runtime.includes('IREADY_VOLUME_TWO_ACTIVITIES.length !== 236')
  || !runtime.includes("verificationStatus: 'verified-student-and-teacher'")
  || !runtime.includes('sourceTextSha256: inventoryPage.sourceTextSha256')
  || !runtime.includes('teacherViewerPage: v2TeacherViewerPageForPrintedPage(printedPage)')
) {
  fail('Volume 2 must expose 236 unique activities with exact Student Worktext hashes and Teacher Guide mappings');
}
if (
  !runtime.includes('export function v2VisualForActivity')
  || !runtime.includes('export function v2HasExactActivityVisual')
  || !runtime.includes('v2WithheldActivityVisual(activity)')
) {
  fail('Volume 2 activities must use an explicit exact-page gate and fail closed when a visual is unreviewed');
}
const activityVisualBody = runtime.slice(runtime.indexOf('export function v2VisualForActivity'));
if (/source-crop|source-model|v2StudentImage\(|v2TeacherImage\(|v2VisualForSession\(/.test(activityVisualBody)) {
  fail('activity teaching may not render publisher pages or inherit a session-wide visual');
}
if (
  !template.includes('Page-specific visual workspace')
  || !template.includes('Build and explain only the selected activity')
  || !template.includes('No neighboring activity, session-wide model, or publisher-page screenshot is substituted.')
) {
  fail('Volume 2 must explain the page-specific visual boundary in both Blank and Solved states');
}
if (runtime.includes('Math.floor(((activity.order - 1) * candidates.length)')) {
  fail('Volume 2 activity teaching may not mechanically assign session models by page order');
}
if (template.includes('(click)="checkLessonWork()"')) fail('Volume 2 may not show a fake scoring control for a free-drawing official page activity');
const lesson28Body = runtime.slice(runtime.indexOf('function v2Lesson28ExactPageVisual'), runtime.indexOf('function v2BaseVisualForSession'));
for (let printedPage = 637; printedPage <= 656; printedPage += 1) {
  if (!lesson28Body.includes(`case ${printedPage}:`)) fail(`Lesson 28 is missing a page-specific code-native visual for printed p. ${printedPage}`);
}
if (/source-crop|source-model|v2SourceModel|v2TeacherSourceModel|\.webp/.test(lesson28Body)) {
  fail('Lesson 28 page-specific teaching may not contain publisher-page screenshots');
}
if (!visualWorkspace.includes('toggleFractionStripPart') || !visualTemplate.includes('aria-pressed') || !runtime.includes('correctSelectedParts')) fail('fraction tasks have regressed to non-interactive page transcription');
if (template.includes("selectLessonMode('source')") || template.includes('lessonMode === \'source\'')) fail('official pages must remain embedded evidence, not replace the lesson');
if (runtime.includes('.jpg')) fail('Volume 2 runtime must use compressed official page assets');
if (/bucket', value: solved \?|eyeglasses', value: solved \?/.test(runtime)) fail('an open measurement task contains an invented solved quantity');
const shapeVisualBody = runtime.slice(runtime.indexOf('function v2ShapeAttributeSections'), runtime.indexOf('function v2AreaPerimeterSections'));
if (!shapeVisualBody.includes('v2SourceModel(') || !shapeVisualBody.includes('v2TeacherSourceModel(')) fail('shape classification teaching must use exact Student Worktext and Teacher Guide figures');
if (/shape: 'concave-(hexagon|quadrilateral)'/.test(shapeVisualBody)) fail('shape classification has regressed to generic polygons instead of the official figures');

if (errors.length) {
  console.error('i-Ready Volume 2 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('i-Ready Volume 2 passed: 396/396 official book pages, 14 lessons, 52 sessions, 236 lesson-session pages, 4 unit-reflection pages kept out of lessons, 132 mapped Teacher Guide spreads, and exclusive-source guardrails.');
