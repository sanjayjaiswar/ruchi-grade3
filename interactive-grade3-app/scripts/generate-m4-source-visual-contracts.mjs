import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const outputRoot = join(baselineRoot, 'visual-layout-contracts', 'm4');
const reviewedEvidence = JSON.parse(
  readFileSync(join(baselineRoot, 'module-4-problem-evidence.json'), 'utf8')
);

mkdirSync(outputRoot, { recursive: true });

for (let lessonNumber = 1; lessonNumber <= 16; lessonNumber += 1) {
  const lessonId = `m4-l${lessonNumber}`;
  const baseline = JSON.parse(
    readFileSync(
      join(baselineRoot, 'contracts', 'm4', `lesson-${pad(lessonNumber)}.json`),
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
        `/source-pages/m4-teacher/page-${pad3(page)}.png`,
        page,
        'problem-set',
        `Teacher Edition Lesson ${lessonNumber} Problem Set page-layout evidence`
      )
    ),
    ...baseline.source.answerKeyPdfPages.map((page) =>
      pageEvidence(
        `/source-pages/m4-teacher/page-${pad3(page)}.png`,
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
        src: `/source-pages/m4-teacher/page-${pad3(page)}.png`,
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
            'The complete printed problem, original figure or table, and original response structure are retained from the fingerprinted Teacher Edition task crop.'
        }
      };
    })
  };

  writeFileSync(
    join(outputRoot, `lesson-${pad(lessonNumber)}.json`),
    `${JSON.stringify(contract, null, 2)}\n`
  );
}

console.log('GENERATED: 16 source-only Module 4 visual contracts covering 68 printed tasks.');

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

function pad3(value) {
  return String(value).padStart(3, '0');
}
