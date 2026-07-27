import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));

for (const moduleNumber of [1, 2]) {
  const moduleId = `m${moduleNumber}`;
  const evidence = JSON.parse(
    readFileSync(
      join(
        appRoot,
        'teacher-edition-baseline',
        `module-${moduleNumber}-problem-evidence.json`
      ),
      'utf8'
    )
  );
  const outputPath = join(
    appRoot,
    'src',
    'app',
    'data',
    'lessons',
    moduleId,
    'source-problem-evidence.generated.ts'
  );
  const prefix = moduleId.toUpperCase();
  const totalProblems = Object.values(evidence.lessons).reduce(
    (sum, lesson) => sum + lesson.problems.length,
    0
  );

  const source = `// Generated only from teacher-edition-baseline/module-${moduleNumber}-problem-evidence.json.
// Do not add inferred prompts, models, labels, dimensions, scales, tables, clocks, or answers here.

export type ${prefix}SourceCropEvidence = {
  pdfPage: number;
  src: string;
  crop: { x: number; y: number; width: number; height: number };
};

export type ${prefix}SourceProblemEvidence = {
  number: number;
  sourceTextEvidence: string;
  answerKeyEvidence: string;
  sourceCrops: readonly ${prefix}SourceCropEvidence[];
};

export type ${prefix}SourceLessonEvidence = {
  answerKeyImages: readonly string[];
  problems: readonly ${prefix}SourceProblemEvidence[];
};

export const ${prefix}_SOURCE_IMAGE_SIZE = ${JSON.stringify(evidence.imageSize)} as const;
export const ${prefix}_ANSWER_KEY_IMAGE_SIZE = ${JSON.stringify(evidence.answerKeyImageSize)} as const;

export const ${prefix}_SOURCE_LESSON_EVIDENCE: Record<number, ${prefix}SourceLessonEvidence> =
  ${JSON.stringify(evidence.lessons, null, 2)} as Record<number, ${prefix}SourceLessonEvidence>;
`;

  writeFileSync(outputPath, source);
  console.log(
    `GENERATED: source-only ${prefix} runtime evidence for ${totalProblems} printed tasks.`
  );
}
