import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const evidence = JSON.parse(
  readFileSync(join(appRoot, 'teacher-edition-baseline', 'module-7-problem-evidence.json'), 'utf8')
);
const outputPath = join(
  appRoot,
  'src',
  'app',
  'data',
  'lessons',
  'm7',
  'source-problem-evidence.generated.ts'
);

const source = `// Generated only from teacher-edition-baseline/module-7-problem-evidence.json.
// Do not add inferred prompts, shapes, dimensions, classifications, scales, or answers here.

export type M7SourceCropEvidence = {
  pdfPage: number;
  src: string;
  crop: { x: number; y: number; width: number; height: number };
};

export type M7SourceProblemEvidence = {
  number: number;
  sourceTextEvidence: string;
  answerKeyEvidence: string;
  sourceCrops: readonly M7SourceCropEvidence[];
};

export type M7SourceLessonEvidence = {
  answerKeyImages: readonly string[];
  problems: readonly M7SourceProblemEvidence[];
};

export const M7_SOURCE_LESSON_EVIDENCE: Record<number, M7SourceLessonEvidence> =
  ${JSON.stringify(evidence.lessons, null, 2)} as Record<number, M7SourceLessonEvidence>;
`;

writeFileSync(outputPath, source);
console.log('GENERATED: source-only Module 7 runtime evidence for 127 official tasks.');
