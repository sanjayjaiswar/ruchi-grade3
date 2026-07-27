import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const evidence = JSON.parse(
  readFileSync(join(appRoot, 'teacher-edition-baseline', 'module-5-problem-evidence.json'), 'utf8')
);
const outputPath = join(
  appRoot,
  'src',
  'app',
  'data',
  'lessons',
  'm5',
  'source-problem-evidence.generated.ts'
);

const source = `// Generated only from teacher-edition-baseline/module-5-problem-evidence.json.
// Do not add inferred prompts, models, quantities, or answers here.

export type M5SourceProblemEvidence = {
  number: number;
  sourceTextEvidence: string;
  answerKeyEvidence: string;
  sourceCrops: ReadonlyArray<readonly [
    pdfPage: number,
    x: number,
    y: number,
    width: number,
    height: number
  ]>;
};

export const M5_SOURCE_PROBLEM_EVIDENCE: Record<number, readonly M5SourceProblemEvidence[]> =
  ${JSON.stringify(evidence.lessons, null, 2)} as Record<number, readonly M5SourceProblemEvidence[]>;
`;

writeFileSync(outputPath, source);
console.log('GENERATED: source-only Module 5 runtime evidence for 158 official fraction tasks.');
