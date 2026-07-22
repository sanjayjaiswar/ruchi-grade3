import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = dirname(appRoot);
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const indexPath = join(baselineRoot, 'index.json');
const expectedLessonCounts = { m1: 21, m2: 21, m3: 21, m4: 16, m5: 30, m6: 9, m7: 34 };
const failures = [];

if (!existsSync(indexPath)) {
  console.error('Teacher Edition baseline is missing. Run npm run generate:teacher-baseline.');
  process.exit(1);
}

const index = JSON.parse(readFileSync(indexPath, 'utf8'));
if (index.lessonCount !== 152 || index.lessons?.length !== 152) {
  failures.push(`index must contain 152 lessons; found ${index.lessons?.length ?? 0}`);
}

for (const [moduleId, expectedCount] of Object.entries(expectedLessonCounts)) {
  const moduleEntry = index.modules?.[moduleId];
  if (!moduleEntry) {
    failures.push(`${moduleId}: missing module index`);
    continue;
  }
  if (moduleEntry.lessonCount !== expectedCount || moduleEntry.lessons?.length !== expectedCount) {
    failures.push(`${moduleId}: expected ${expectedCount} lessons, found ${moduleEntry.lessons?.length ?? 0}`);
  }

  const pdfPath = join(repoRoot, moduleEntry.teacherEditionPdf);
  if (!existsSync(pdfPath)) {
    failures.push(`${moduleId}: missing Teacher Edition PDF ${moduleEntry.teacherEditionPdf}`);
  } else if (sha256(pdfPath) !== moduleEntry.teacherEditionSha256) {
    failures.push(`${moduleId}: Teacher Edition PDF fingerprint changed; regenerate the baseline`);
  }
}

const seen = new Set();
const previousLessonEndByModule = new Map();
for (const entry of index.lessons ?? []) {
  if (seen.has(entry.lessonId)) failures.push(`${entry.lessonId}: duplicate lesson id`);
  seen.add(entry.lessonId);
  const contractPath = join(baselineRoot, entry.contract);
  if (!existsSync(contractPath)) {
    failures.push(`${entry.lessonId}: missing contract ${entry.contract}`);
    continue;
  }
  const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
  if (contract.lessonId !== entry.lessonId) failures.push(`${entry.lessonId}: contract id mismatch`);
  if (contract.moduleId !== entry.moduleId || contract.lessonNumber !== entry.lessonNumber) failures.push(`${entry.lessonId}: module or lesson number mismatch`);
  if (contract.objective !== entry.objective) failures.push(`${entry.lessonId}: objective differs between index and contract`);
  if (!contract.objective || /not isolated/i.test(contract.objective)) failures.push(`${entry.lessonId}: objective was not isolated from the Teacher Edition`);
  const moduleEntry = index.modules?.[entry.moduleId];
  if (contract.source?.teacherEditionPdf !== moduleEntry?.teacherEditionPdf) failures.push(`${entry.lessonId}: Teacher Edition path differs from module index`);
  if (contract.source?.teacherEditionSha256 !== moduleEntry?.teacherEditionSha256) failures.push(`${entry.lessonId}: Teacher Edition fingerprint differs from module index`);
  const pdfPath = moduleEntry ? join(repoRoot, moduleEntry.teacherEditionPdf) : undefined;
  if (pdfPath && existsSync(pdfPath) && contract.source?.teacherEditionBytes !== statSync(pdfPath).size) failures.push(`${entry.lessonId}: Teacher Edition byte count is stale`);
  const lessonStart = contract.source?.lessonPdfPages?.start;
  const lessonEnd = contract.source?.lessonPdfPages?.end;
  if (!Number.isInteger(lessonStart) || !Number.isInteger(lessonEnd) || lessonStart > lessonEnd) {
    failures.push(`${entry.lessonId}: invalid lesson page range`);
  } else {
    const previousEnd = previousLessonEndByModule.get(entry.moduleId);
    if (previousEnd && lessonStart <= previousEnd) failures.push(`${entry.lessonId}: lesson page range overlaps or precedes the prior lesson`);
    if (moduleEntry?.extractedPdfPageCount && lessonEnd > moduleEntry.extractedPdfPageCount) failures.push(`${entry.lessonId}: lesson page range exceeds the PDF page count`);
    previousLessonEndByModule.set(entry.moduleId, lessonEnd);
  }
  if (entry.lessonPdfPages?.start !== lessonStart || entry.lessonPdfPages?.end !== lessonEnd) failures.push(`${entry.lessonId}: page range differs between index and contract`);
  if (!contract.source?.problemSetPdfPages?.length && contract.problemSet?.deliveryMode === 'problem-set-pages') failures.push(`${entry.lessonId}: missing Problem Set page map`);
  if (!contract.source?.answerKeyPdfPages?.length) failures.push(`${entry.lessonId}: missing answer-key page map`);
  if (!contract.problemSet?.problemSetText?.trim()) failures.push(`${entry.lessonId}: missing raw Problem Set text`);
  if (!contract.problemSet?.answerKeyText?.trim()) failures.push(`${entry.lessonId}: missing raw answer-key text`);
  if (!contract.problemSet?.extractedProblems?.length) failures.push(`${entry.lessonId}: missing structured problem prompts`);
  if (!contract.instructionalContract?.conceptDevelopmentText?.trim() && !contract.instructionalContract?.fluencyPracticeText?.trim()) failures.push(`${entry.lessonId}: missing Concept Development or source fluency sequence`);
  if (!contract.instructionalContract?.studentDebriefText?.trim()) failures.push(`${entry.lessonId}: missing Student Debrief text`);
  if (!contract.deliveryContract?.blankMustShow?.length || !contract.deliveryContract?.solvedMustShow?.length) failures.push(`${entry.lessonId}: missing delivery rules`);
  if (!contract.sourceText?.lessonText?.trim()) failures.push(`${entry.lessonId}: missing durable lesson source text`);
  if ((contract.sourceText?.problemSetPages?.length ?? 0) !== (contract.source?.problemSetPdfPages?.length ?? 0)) failures.push(`${entry.lessonId}: Problem Set page text does not match its page map`);
  if ((contract.sourceText?.answerKeyPages?.length ?? 0) !== (contract.source?.answerKeyPdfPages?.length ?? 0)) failures.push(`${entry.lessonId}: answer-key page text does not match its page map`);
  if (contract.problemSet?.structuredPromptStatus === 'review-source-layout' && !contract.problemSet?.extractionWarnings?.length) failures.push(`${entry.lessonId}: source-layout review flag lacks an explanation`);
  for (const imagePath of contract.source?.studentWorkbookImages ?? []) {
    if (!existsSync(join(appRoot, 'public', imagePath.replace(/^\//, '')))) failures.push(`${entry.lessonId}: missing workbook image ${imagePath}`);
  }
}

const contractFiles = readdirSync(join(baselineRoot, 'contracts'), { recursive: true }).filter((path) => String(path).endsWith('.json'));
if (contractFiles.length !== 152) failures.push(`expected 152 contract files, found ${contractFiles.length}`);

if (failures.length) {
  console.error('Teacher Edition baseline validation failed.');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const reviewCount = index.lessons.filter((lesson) => lesson.structuredPromptStatus !== 'ready').length;
console.log(`OK: Teacher Edition baseline contains ${index.lessonCount} lessons across ${index.moduleCount} modules.`);
console.log(`- ${index.lessons.reduce((sum, lesson) => sum + lesson.structuredProblemCount, 0)} structured Problem Set entries`);
console.log(`- ${reviewCount} lessons flag multi-column prompt extraction; their raw source text and images remain controlling evidence`);
console.log('- All PDF fingerprints, page maps, objectives, concept blocks, Problem Sets, answer keys, delivery rules, and source images passed.');

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}
