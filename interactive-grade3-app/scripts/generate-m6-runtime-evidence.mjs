import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const evidence = JSON.parse(
  readFileSync(join(appRoot, 'teacher-edition-baseline', 'module-6-problem-evidence.json'), 'utf8')
);
const outputPath = join(
  appRoot,
  'src',
  'app',
  'data',
  'lessons',
  'm6',
  'source-problem-evidence.generated.ts'
);

const source = `// Generated only from teacher-edition-baseline/module-6-problem-evidence.json.
// Do not add inferred prompts, displays, scales, quantities, or answers here.

export type M6SourceCropEvidence = {
  pdfPage: number;
  src: string;
  crop: { x: number; y: number; width: number; height: number };
};

export type M6SourceProblemEvidence = {
  number: number;
  sourceTextEvidence: string;
  answerKeyEvidence: string;
  sourceCrops: readonly M6SourceCropEvidence[];
};

export type M6SourceLessonEvidence = {
  answerKeyImages: readonly string[];
  problems: readonly M6SourceProblemEvidence[];
};

export const M6_SOURCE_LESSON_EVIDENCE: Record<number, M6SourceLessonEvidence> =
  ${JSON.stringify(evidence.lessons, null, 2)} as Record<number, M6SourceLessonEvidence>;
`;

writeFileSync(outputPath, source);
console.log('GENERATED: source-only Module 6 runtime evidence for 24 official data tasks.');
