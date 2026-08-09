import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

throw new Error(
  'Disabled: crop-only evidence cannot generate learner-facing visual contracts. Author source-observed layout signatures and reusable interactive workspace data instead.'
);

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const outputRoot = join(baselineRoot, 'visual-layout-contracts', 'm6');
const reviewedEvidence = JSON.parse(
  readFileSync(join(baselineRoot, 'module-6-problem-evidence.json'), 'utf8')
);

mkdirSync(outputRoot, { recursive: true });

for (let lessonNumber = 1; lessonNumber <= 9; lessonNumber += 1) {
  const lessonId = `m6-l${lessonNumber}`;
  const baseline = JSON.parse(
    readFileSync(
      join(baselineRoot, 'contracts', 'm6', `lesson-${pad(lessonNumber)}.json`),
      'utf8'
    )
  );
  const reviewedLesson = reviewedEvidence.lessons[String(lessonNumber)];
  if (!reviewedLesson?.problems?.length) {
    throw new Error(`${lessonId}: reviewed Teacher Edition problem evidence is missing`);
  }
  if (reviewedEvidence.teacherEditionPdfSha256 !== baseline.source.teacherEditionSha256) {
    throw new Error(`${lessonId}: reviewed evidence is stale for the controlling Teacher Edition PDF`);
  }

  const problemSetPages = uniqueCrops(reviewedLesson.problems);
  const sourceEvidence = [
    ...problemSetPages.map(({ src, pdfPage }) =>
      pageEvidence(
        src,
        pdfPage,
        'problem-set',
        `Teacher Edition Lesson ${lessonNumber} Problem Set page-layout evidence`
      )
    ),
    ...reviewedLesson.answerKeyImages.map((image) => {
      const pdfPage = Number(image.match(/(\d+)\.png$/)?.[1]);
      return pageEvidence(
        image,
        pdfPage,
        'answer-key',
        `Teacher Edition Lesson ${lessonNumber} Problem Set answer-key evidence`
      );
    })
  ];

  const contract = {
    schemaVersion: 2,
    lessonId,
    teacherEditionPdfSha256: baseline.source.teacherEditionSha256,
    sourceEvidence,
    problems: reviewedLesson.problems.map((problem) => ({
      number: problem.number,
      sourcePageImage: problem.sourceCrops[0].src,
      teacherEditionRequirements: {
        sourceTextEvidence: [problem.sourceTextEvidence],
        answerKeyEvidence: problem.answerKeyEvidence,
        layout: {
          family: 'source-first-teacher-edition-crop',
          sourceFirst: true,
          sourceCropCount: problem.sourceCrops.length,
          sourceCrops: problem.sourceCrops.map(({ src, crop }) => ({ src, crop }))
        },
        blankMustNotContain: [],
        solvedMustContain: [],
        sourceLayoutNotes:
          'The complete task-bearing printed page body is retained so tables, graph scales, keys, fractional ruler or line-plot labels, continuations, and original response space cannot be flattened, clipped, or replaced.'
      }
    }))
  };

  writeFileSync(
    join(outputRoot, `lesson-${pad(lessonNumber)}.json`),
    `${JSON.stringify(contract, null, 2)}\n`
  );
}

console.log('GENERATED: 9 source-only Module 6 visual contracts covering 24 official data tasks.');

function uniqueCrops(problems) {
  const byImage = new Map();
  for (const problem of problems) {
    for (const sourceCrop of problem.sourceCrops) {
      byImage.set(sourceCrop.src, sourceCrop);
    }
  }
  return [...byImage.values()];
}

function pageEvidence(image, pdfPage, documentSection, role) {
  const imagePath = join(appRoot, 'public', image.replace(/^\//, ''));
  if (!existsSync(imagePath)) throw new Error(`Missing ${documentSection} evidence: ${image}`);
  return {
    image,
    sha256: createHash('sha256').update(readFileSync(imagePath)).digest('hex'),
    pdfPage,
    documentSection,
    role
  };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
