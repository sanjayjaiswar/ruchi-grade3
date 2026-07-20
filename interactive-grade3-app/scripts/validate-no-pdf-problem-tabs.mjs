import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const srcRoot = join(root, 'src');
const lessonTemplatePath = join(srcRoot, 'app/pages/lesson/lesson.html');

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

if (failures.length > 0) {
  console.error('Full PDF/source pages are barred from Blank/Solved problem tabs.');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('OK: Blank/Solved problem tabs do not render full PDF/source pages.');
console.log('- Tightly cropped source assets remain allowed when the pictured object is part of the official problem.');
