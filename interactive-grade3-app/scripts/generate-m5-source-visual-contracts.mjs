import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

throw new Error(
  'Disabled: crop-only evidence cannot generate learner-facing visual contracts. Author source-observed layout signatures and reusable interactive workspace data instead.'
);

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const outputRoot = join(baselineRoot, 'visual-layout-contracts', 'm5');
const reviewedEvidence = JSON.parse(
  readFileSync(join(baselineRoot, 'module-5-problem-evidence.json'), 'utf8')
);

mkdirSync(outputRoot, { recursive: true });

for (let lessonNumber = 1; lessonNumber <= 30; lessonNumber += 1) {
  const lessonId = `m5-l${lessonNumber}`;
  const baseline = JSON.parse(
    readFileSync(
      join(baselineRoot, 'contracts', 'm5', `lesson-${pad(lessonNumber)}.json`),
      'utf8'
    )
  );
  const reviewedProblems = reviewedEvidence.lessons[String(lessonNumber)];
  if (!reviewedProblems?.length) {
    throw new Error(`${lessonId}: reviewed Teacher Edition problem evidence is missing`);
  }
  if (reviewedEvidence.teacherEditionPdfSha256 !== baseline.source.teacherEditionSha256) {
    throw new Error(`${lessonId}: reviewed evidence is stale for the controlling Teacher Edition PDF`);
  }

  const problemSetPages = [
    ...new Set(reviewedProblems.flatMap((problem) => problem.sourceCrops.map(([page]) => page)))
  ];
  const sourceEvidence = [
    ...problemSetPages.map((page) =>
      pageEvidence(
        `/source-pages/m5-teacher/page-${page}.png`,
        page,
        'problem-set',
        `Teacher Edition Lesson ${lessonNumber} Problem Set page-layout evidence`
      )
    ),
    ...baseline.source.answerKeyPdfPages.map((page) =>
      pageEvidence(
        `/source-pages/m5-teacher/page-${page}.png`,
        page,
        'answer-key',
        `Teacher Edition Lesson ${lessonNumber} Problem Set answer-key evidence`
      )
    )
  ];

  const contract = {
    schemaVersion: 2,
    lessonId,
    teacherEditionPdfSha256: baseline.source.teacherEditionSha256,
    sourceEvidence,
    problems: reviewedProblems.map((problem) => {
      const sourceCrops = problem.sourceCrops.map(([page, x, y, width, height]) => ({
        src: `/source-pages/m5-teacher/page-${page}.png`,
        crop: { x, y, width, height }
      }));
      return {
        number: problem.number,
        sourcePageImage: sourceCrops[0].src,
        teacherEditionRequirements: {
          sourceTextEvidence: [problem.sourceTextEvidence],
          answerKeyEvidence: problem.answerKeyEvidence,
          layout: {
            family: 'source-first-teacher-edition-crop',
            sourceFirst: true,
            sourceCropCount: sourceCrops.length,
            sourceCrops
          },
          blankMustNotContain: [],
          solvedMustContain: [],
          sourceLayoutNotes:
            'The complete task-bearing Teacher Edition page body is retained so shared fraction directions, exact models, labels, and original response space cannot be clipped or replaced.'
        }
      };
    })
  };

  writeFileSync(
    join(outputRoot, `lesson-${pad(lessonNumber)}.json`),
    `${JSON.stringify(contract, null, 2)}\n`
  );
}

console.log('GENERATED: 30 source-only Module 5 visual contracts covering 158 official fraction tasks.');

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
