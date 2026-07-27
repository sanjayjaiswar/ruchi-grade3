import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const outputRoot = join(baselineRoot, 'visual-layout-contracts', 'm3');
const answerEvidence = JSON.parse(
  readFileSync(join(baselineRoot, 'module-3-problem-answer-evidence.json'), 'utf8')
);

mkdirSync(outputRoot, { recursive: true });

for (let lessonNumber = 1; lessonNumber <= 21; lessonNumber += 1) {
  const lessonId = `m3-l${lessonNumber}`;
  const baselinePath = join(
    baselineRoot,
    'contracts',
    'm3',
    `lesson-${String(lessonNumber).padStart(2, '0')}.json`
  );
  const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
  const outputPath = join(outputRoot, `lesson-${String(lessonNumber).padStart(2, '0')}.json`);
  if (!existsSync(outputPath)) {
    throw new Error(`${lessonId}: missing reviewed Teacher Edition visual contract; author it from the page evidence before refreshing fingerprints`);
  }
  const reviewedContract = JSON.parse(readFileSync(outputPath, 'utf8'));
  if (reviewedContract.schemaVersion !== 2 || reviewedContract.lessonId !== lessonId) {
    throw new Error(`${lessonId}: reviewed contract is not schema v2`);
  }
  if (reviewedContract.problems.length !== baseline.problemSet.extractedProblems.length) {
    throw new Error(`${lessonId}: reviewed contract/source problem-count mismatch`);
  }
  if (answerEvidence.teacherEditionPdfSha256 !== baseline.source.teacherEditionSha256) {
    throw new Error(`${lessonId}: per-problem answer evidence is stale for the controlling Teacher Edition PDF`);
  }
  const lessonAnswers = answerEvidence.lessons[String(lessonNumber)];
  if (lessonAnswers?.length !== reviewedContract.problems.length) {
    throw new Error(`${lessonId}: per-problem Teacher Edition answer coverage is incomplete`);
  }

  const sourceEvidence = reviewedContract.sourceEvidence.map((evidence) =>
    pageEvidence(
      evidence.image,
      evidence.pdfPage,
      evidence.documentSection,
      evidence.role
    )
  );

  const contract = {
    schemaVersion: 2,
    lessonId,
    teacherEditionPdfSha256: baseline.source.teacherEditionSha256,
    sourceEvidence,
    // Reviewed expectations are intentionally preserved. This command refreshes
    // TE fingerprints; it never infers acceptance values from app/runtime code.
    problems: reviewedContract.problems.map((problem, index) => ({
      ...problem,
      teacherEditionRequirements: {
        ...problem.teacherEditionRequirements,
        answerKeyEvidence: lessonAnswers[index]
      }
    }))
  };
  writeFileSync(outputPath, `${JSON.stringify(contract, null, 2)}\n`);
}

console.log('REFRESHED: 21 Module 3 Teacher Edition visual-contract fingerprints; reviewed expectations preserved.');

function pageEvidence(image, pdfPage, documentSection, role) {
  const imagePath = join(appRoot, 'public', image.replace(/^\//, ''));
  if (!existsSync(imagePath) || !pdfPage) throw new Error(`Missing ${documentSection} evidence: ${image}`);
  return {
    image,
    sha256: createHash('sha256').update(readFileSync(imagePath)).digest('hex'),
    pdfPage,
    documentSection,
    role
  };
}
