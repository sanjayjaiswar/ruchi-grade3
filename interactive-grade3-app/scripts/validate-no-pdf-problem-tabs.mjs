import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const srcRoot = join(root, 'src');
const lessonTemplatePath = join(srcRoot, 'app/pages/lesson/lesson.html');
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

const { findLessonRuntime } = require(
  join(root, 'src/app/data/lessons/lesson-registry.ts')
);
const lessonCounts = {
  m1: 21,
  m2: 21,
  m3: 21,
  m4: 16,
  m5: 30,
  m6: 9,
  m7: 34
};

const failures = [];

function readText(path) {
  return readFileSync(path, 'utf8');
}

function report(path, message) {
  failures.push(`${relative(root, path)}: ${message}`);
}

function walk(dir, visitor) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      walk(path, visitor);
    } else {
      visitor(path);
    }
  }
}

const lessonTemplate = readText(lessonTemplatePath);
const guardrail = 'Guardrail: Blank/Solved problem tabs must not render full PDF or full Teacher Edition source-page screenshots; a tightly cropped source asset is allowed when the pictured object is required by the problem.';
const problemSetPanelStart = lessonTemplate.indexOf(`*ngSwitchCase="'problem-set'"`);
const summaryPanelStart = lessonTemplate.indexOf(`*ngSwitchCase="'summary'"`, problemSetPanelStart);
const problemSetPanel = problemSetPanelStart >= 0 && summaryPanelStart > problemSetPanelStart
  ? lessonTemplate.slice(problemSetPanelStart, summaryPanelStart)
  : '';

if (!lessonTemplate.includes(guardrail)) {
  report(lessonTemplatePath, 'missing the Blank/Solved PDF screenshot guardrail comment');
}

if (!problemSetPanel) {
  report(lessonTemplatePath, 'could not locate the Problem Set tab template for guardrail validation');
}

if (!lessonTemplate.includes(`class="source-card" *ngIf="activeProblemSection !== 'problem-set'"`)) {
  report(lessonTemplatePath, 'the header Teacher source card must be hidden while Blank/Solved Problem Set is active');
}

if (lessonTemplate.includes('problemSetSourcePageImages(')) {
  report(lessonTemplatePath, 'must not render problem-set source-page images in Blank/Solved problem tabs');
}

if (lessonTemplate.includes('hasProblemSetSourcePages(')) {
  report(lessonTemplatePath, 'must not branch Blank/Solved problem-tab UI on source-page screenshots');
}

if (lessonTemplate.includes('source-reference-pages')) {
  report(lessonTemplatePath, 'must not include the problem-tab source-reference page container');
}

for (const forbidden of [
  '<img',
  'source-page-strip',
  'problem-source-pages',
  'sourcePageImages',
  'blankSourcePageImages',
  'solvedSourcePageImages',
  'conceptSourcePageImages(',
  'conceptStudentWorkbookPageImages('
]) {
  if (problemSetPanel.includes(forbidden)) {
    report(lessonTemplatePath, `Problem Set Blank/Solved template must not contain ${forbidden}`);
  }
}

walk(srcRoot, (path) => {
  if (!/\.(ts|html)$/.test(path)) {
    return;
  }

  const text = readText(path);
  if (text.includes("kind: 'source-page'") || text.includes('kind: "source-page"')) {
    report(path, 'must not define or render a source-page visual section');
  }
  if (text.includes('ProblemVisualSourcePageSection')) {
    report(path, 'must not support PDF/source screenshot visual sections');
  }
  if (text.includes('sourcePageSection(')) {
    report(path, 'must not expose a source-page visual renderer');
  }
  if (path.includes('shared/problem-visual-workspace') && text.includes('source-page')) {
    report(path, 'shared visual workspace must not contain source-page rendering or filtering');
  }
});

for (const [moduleId, lessonCount] of Object.entries(lessonCounts)) {
  for (let lessonNumber = 1; lessonNumber <= lessonCount; lessonNumber += 1) {
    const lesson = findLessonRuntime(moduleId, lessonNumber)
      ?.problemSetCenteredLesson;
    if (!lesson) {
      failures.push(`${moduleId}-l${lessonNumber}: missing Problem Set runtime`);
      continue;
    }
    for (const problem of lesson.problems) {
      const label = `${moduleId}-l${lessonNumber}-p${problem.number}`;
      for (const [mode, visual] of [
        ['Blank', problem.blankVisual],
        ['Solved', problem.solvedVisual]
      ]) {
        if (!visual?.sections?.length) {
          failures.push(`${label}: ${mode} authored visual is missing`);
          continue;
        }
        for (const section of flattenSections(visual.sections)) {
          if (section?.kind === 'source-first-workspace') {
            failures.push(
              `${label}: ${mode} must use authored interactive visuals, not a Teacher Edition page-screenshot workspace`
            );
          }
          if (
            section?.kind === 'source-crop' &&
            section.crop?.x === 0 &&
            section.crop?.y === 0 &&
            section.crop?.width === section.imageWidth &&
            section.crop?.height === section.imageHeight
          ) {
            failures.push(
              `${label}: ${mode} contains a full Teacher Edition page instead of a tightly cropped meaningful source asset`
            );
          }
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error('Full PDF/source pages are barred from Blank/Solved problem tabs.');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('OK: Blank/Solved problem tabs use authored visuals instead of Teacher Edition page screenshots.');
console.log('- Only tightly cropped source assets that carry mathematical meaning remain allowed.');

function flattenSections(sections) {
  const flattened = [];
  for (const section of sections ?? []) {
    flattened.push(section);
    if (section?.kind === 'card-grid') {
      for (const card of section.cards ?? []) {
        flattened.push(...flattenSections(card.sections));
      }
    }
  }
  return flattened;
}
