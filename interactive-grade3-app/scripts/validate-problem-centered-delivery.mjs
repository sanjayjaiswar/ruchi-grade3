import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

require.extensions['.ts'] = function loadTypeScript(module, filename) {
  const source = readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      importHelpers: false,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022
    }
  });
  module._compile(output.outputText, filename);
};

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const { findLessonRuntime } = require(join(root, 'src/app/data/lessons/lesson-registry.ts'));

const lessonCounts = {
  m2: 21,
  m3: 21,
  m4: 16,
  m5: 30,
  m6: 9,
  m7: 34
};

const failures = [];
const summaries = [];

function report(label, message) {
  failures.push(`${label}: ${message}`);
}

function imageExists(path) {
  return existsSync(join(root, 'public', path.replace(/^\//, '')));
}

function validateImages(label, paths) {
  for (const path of paths ?? []) {
    if (!imageExists(path)) {
      report(label, `missing source image ${path}`);
    }
  }
}

function stringifyVisual(problem) {
  return JSON.stringify({
    blank: problem.blankVisual,
    solved: problem.solvedVisual,
    models: problem.numberLineModels,
    fractionModels: problem.fractionModels,
    dataDisplay: problem.dataDisplay,
    solvedDataDisplay: problem.solvedDataDisplay,
    areaModels: problem.areaModels
  }).toLowerCase();
}

function expectedFractionWords(problem) {
  const text = `${problem.sourcePrompt ?? ''} ${problem.solvedAnswer ?? ''}`.toLowerCase();
  const expectations = [];
  for (const [word, patterns] of [
    ['halves', [/\bhalves\b|\bhalf\b|\/2\b/]],
    ['thirds', [/\bthirds?\b|\/3\b/]],
    ['fourths', [/\bfourths?\b|\bquarter|\bquarters\b|\/4\b/]],
    ['fifths', [/\bfifths?\b|\/5\b/]],
    ['sixths', [/\bsixths?\b|\/6\b/]],
    ['eighths', [/\beighths?\b|\/8\b/]],
    ['tenths', [/\btenths?\b|\/10\b/]]
  ]) {
    if (patterns.some((pattern) => pattern.test(text))) {
      expectations.push(word);
    }
  }
  return expectations;
}

function validateProblem(moduleId, lessonNumber, problem) {
  const label = `${moduleId.toUpperCase()} L${lessonNumber} P${problem.number}`;
  if (!String(problem.sourcePrompt ?? '').trim()) {
    report(label, 'missing source prompt');
  }
  if (!String(problem.solvedAnswer ?? '').trim()) {
    report(label, 'missing solved answer');
  }
  if (!problem.blankVisual?.sections?.length) {
    report(label, 'missing blank visual sections');
  }
  if (!problem.solvedVisual?.sections?.length) {
    report(label, 'missing solved visual sections');
  }
  if (!problem.blankVisualType) {
    report(label, 'missing blank visual type');
  }
  validateImages(label, problem.sourcePageImages);
  validateImages(label, problem.blankSourcePageImages);
  validateImages(label, problem.solvedSourcePageImages);

  const solvedText = String(problem.solvedAnswer ?? '');
  for (const forbidden of [
    'Completed work must match the required model, labels, units, and written explanation.',
    'Variable responses must include the Teacher Edition criteria',
    'Use the display evidence for fixed values'
  ]) {
    if (solvedText.includes(forbidden)) {
      report(label, `generic solved answer fallback: ${forbidden}`);
    }
  }

  if (moduleId === 'm5' && problem.blankVisualType === 'number-line-template') {
    const visualText = stringifyVisual(problem);
    for (const word of expectedFractionWords(problem)) {
      if (!visualText.includes(word) && !visualText.includes(word.replace(/s$/, ''))) {
        report(label, `number-line visual does not reflect expected ${word}`);
      }
    }
  }

  if (moduleId === 'm7' && lessonNumber === 3 && stringifyVisual(problem).includes('critique')) {
    report(label, 'Lesson 3 must use RDW word-problem visuals, not critique/reflection visuals');
  }
}

for (const [moduleId, count] of Object.entries(lessonCounts)) {
  let problemCount = 0;
  for (let lessonNumber = 1; lessonNumber <= count; lessonNumber += 1) {
    const label = `${moduleId.toUpperCase()} L${lessonNumber}`;
    const runtime = findLessonRuntime(moduleId, lessonNumber);
    const centeredLesson = runtime?.problemSetCenteredLesson;
    if (!centeredLesson) {
      report(label, 'missing problemSetCenteredLesson');
      continue;
    }

    if (!String(centeredLesson.teacherEditionBasis ?? '').trim()) {
      report(label, 'missing teacherEditionBasis');
    }
    if (!centeredLesson.sourcePageImages?.length) {
      report(label, 'missing sourcePageImages');
    }
    if (!centeredLesson.solvedSourcePageImages?.length) {
      report(label, 'missing solvedSourcePageImages');
    }
    validateImages(label, centeredLesson.sourcePageImages);
    validateImages(label, centeredLesson.blankSourcePageImages);
    validateImages(label, centeredLesson.solvedSourcePageImages);

    if (!centeredLesson.problems?.length) {
      report(label, 'missing problem list');
      continue;
    }
    for (const problem of centeredLesson.problems) {
      problemCount += 1;
      validateProblem(moduleId, lessonNumber, problem);
    }
  }
  summaries.push(`${moduleId.toUpperCase()}: ${count} lessons, ${problemCount} problems`);
}

if (failures.length > 0) {
  console.error('Problem-centered delivery validation failed.');
  for (const summary of summaries) {
    console.error(`- ${summary}`);
  }
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('OK: problem-centered delivery is source-backed and visually complete.');
for (const summary of summaries) {
  console.log(`- ${summary}`);
}
