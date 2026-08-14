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

for (const marker of [
  'data-interaction="click-to-match"',
  '(click)="selectExpressionBottom',
  'expressionPairIsCorrect',
  'part.interactiveLines',
  'inlineTokens',
  'setInlineValue',
  'inlineState',
  'part.responsePlaceholder',
  'part.openWorkspace',
  'startSketch($event)',
  'clearSketchFromControl($event)',
  'dataCellSelectionState',
  'aria-live="polite"',
  '<textarea'
]) {
  if (!readText(join(srcRoot, 'app/shared/problem-visual-workspace/problem-visual-workspace.html')).includes(marker)) {
    report(lessonTemplatePath, `missing authored Blank-mode interaction marker ${marker}`);
  }
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
      validateAuthoredInteraction(problem, label);
      if (moduleId === 'm3') {
        for (const section of flattenSections(problem.blankVisual?.sections ?? [])) {
          validateInlineAnswers(section, label);
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

function validateAuthoredInteraction(problem, label) {
  const blank = problem.blankVisual?.sections ?? [];
  const solved = problem.solvedVisual?.sections ?? [];
  const blankSection = blank.find((section) =>
    (section?.kind === 'expression-match' && section.interactive) ||
    (section?.kind === 'source-response-workspace' && (
      (section.parts ?? []).some((part) => part.interactiveLines || part.responsePlaceholder) ||
      (label.startsWith('m3-') && (section.parts ?? []).some((part) => part.openWorkspace))
    ))
  );
  const solvedSection = blankSection
    ? solved.find((section) => section?.kind === blankSection.kind)
    : undefined;
  const isInteractiveMatch = blankSection?.kind === 'expression-match' && blankSection.interactive;
  const isInteractiveResponse = blankSection?.kind === 'source-response-workspace' && (
    (blankSection.parts ?? []).some((part) => part.interactiveLines || part.responsePlaceholder) ||
    (label.startsWith('m3-') && (blankSection.parts ?? []).some((part) => part.openWorkspace))
  );
  if (!isInteractiveMatch && !isInteractiveResponse) {
    return;
  }
  if (!solvedSection || solvedSection.kind !== blankSection.kind) {
    const isOpenConstruction = isInteractiveResponse && (blankSection.parts ?? []).every((part) =>
      part.openWorkspace
    );
    if (isOpenConstruction && solved.length > 0) {
      return;
    }
    failures.push(`${label}: Solved must preserve the same reusable ${blankSection.kind} family as Blank`);
    return;
  }

  if (isInteractiveMatch) {
    if (blankSection.topItems?.includes('____') && blankSection.topItems?.length !== blankSection.topAnswers?.length) {
      failures.push(`${label}: reusable expression-match data must provide Blank inputs and a complete answer sequence`);
    }
    if (
      blankSection.matches?.length !== blankSection.topItems?.length ||
      new Set((blankSection.matches ?? []).map((pair) => pair.topIndex)).size !== blankSection.topItems?.length ||
      new Set((blankSection.matches ?? []).map((pair) => pair.bottomIndex)).size !== blankSection.matches?.length
    ) {
      failures.push(`${label}: interactive expression-match data must form a complete one-to-one answer key`);
    }
    if (!solvedSection.showMatches) {
      failures.push(`${label}: Solved interactive expression-match must reveal the completed matching state`);
    }
    return;
  }

  if ((blankSection.parts ?? []).length !== (solvedSection.parts ?? []).length) {
    failures.push(`${label}: Blank and Solved source-response workspaces must keep the same source part count`);
    return;
  }
  for (let index = 0; index < blankSection.parts.length; index += 1) {
    const blankPart = blankSection.parts[index];
    const solvedPart = solvedSection.parts[index];
    if (blankPart.interactiveLines) {
      if (!(blankPart.lines ?? []).some((line) => line.includes('____'))) {
        failures.push(`${label}: interactive source-response part ${index + 1} has no Blank input token`);
      }
      if ((solvedPart.lines ?? []).some((line) => line.includes('____'))) {
        failures.push(`${label}: Solved source-response part ${index + 1} still contains a Blank input token`);
      }
    }
    if (blankPart.responsePlaceholder && !solvedPart.response) {
      failures.push(`${label}: open Blank response part ${index + 1} needs a source-supported Solved response`);
    }
  }
}

function validateInlineAnswers(section, label) {
  const blankCount = (text) => String(text ?? '').match(/_{2,}/g)?.length ?? 0;
  const requireAnswers = (text, answers, location) => {
    const count = blankCount(text);
    if (count > 0 && answers?.length !== count) {
      failures.push(`${label}: ${location} exposes ${count} input blank${count === 1 ? '' : 's'} but has ${answers?.length ?? 0} feedback answer${answers?.length === 1 ? '' : 's'}`);
    }
  };

  if (section?.kind === 'equations') {
    (section.lines ?? []).forEach((line, index) => requireAnswers(line, section.lineAnswers?.[index], `equation line ${index + 1}`));
  }
  if (section?.kind === 'data-table') {
    (section.rows ?? []).forEach((row, rowIndex) => row.forEach((cell, cellIndex) =>
      requireAnswers(cell, section.cellAnswers?.[rowIndex]?.[cellIndex], `table row ${rowIndex + 1} cell ${cellIndex + 1}`)
    ));
  }
  if (section?.kind === 'unit-form-workspace') {
    (section.parts ?? []).forEach((part, partIndex) => (part.lines ?? []).forEach((line, lineIndex) =>
      requireAnswers(line, part.lineAnswers?.[lineIndex], `unit-form part ${partIndex + 1} line ${lineIndex + 1}`)
    ));
  }
  if (section?.kind === 'source-response-workspace') {
    (section.parts ?? []).forEach((part, partIndex) => (part.lines ?? []).forEach((line, lineIndex) => {
      requireAnswers(line, part.lineAnswers?.[lineIndex], `source-response part ${partIndex + 1} line ${lineIndex + 1}`);
      if (blankCount(line) > 0 && !part.interactiveLines) {
        failures.push(`${label}: source-response part ${partIndex + 1} line ${lineIndex + 1} has a visual blank but is not interactive`);
      }
    }));
  }
  if (section?.kind === 'solution-parts') {
    (section.parts ?? []).forEach((part, index) => {
      requireAnswers(part.prompt, part.promptAnswers, `solution part ${index + 1} prompt`);
      requireAnswers(part.equation, part.equationAnswers, `solution part ${index + 1} equation`);
    });
  }
  if (section?.kind === 'expression-match' && !section.interactive) {
    (section.topItems ?? []).forEach((item, index) => requireAnswers(item, section.topItemAnswers?.[index], `expression item ${index + 1}`));
    (section.bottomItems ?? []).forEach((item, index) => requireAnswers(item, section.bottomItemAnswers?.[index], `expression response ${index + 1}`));
  }
  if (section?.kind === 'number-bond') {
    (section.parts ?? []).forEach((part, index) =>
      requireAnswers(part.label, section.partAnswers?.[index], `number-bond part ${index + 1}`)
    );
    (section.equations ?? []).forEach((line, index) => requireAnswers(line, section.equationAnswers?.[index], `number-bond equation ${index + 1}`));
  }
  if (section?.kind === 'array') {
    requireAnswers(section.label, section.labelAnswers, 'array label');
    requireAnswers(section.caption, section.captionAnswers, 'array caption');
  }
  if (section?.kind === 'geometry-diagram') {
    (section.shapes ?? []).forEach((shape, index) =>
      requireAnswers(shape.label, section.shapeAnswers?.[index], `geometry shape ${index + 1}`)
    );
    requireAnswers(section.caption, section.captionAnswers, 'geometry caption');
  }
  if (section?.kind === 'tape') {
    (section.parts ?? []).forEach((part, index) =>
      requireAnswers(part.label, section.partAnswers?.[index], `tape part ${index + 1}`)
    );
    (section.braces ?? []).forEach((brace, index) =>
      requireAnswers(brace.boxLabel || brace.label, section.braceAnswers?.[index], `tape brace ${index + 1}`)
    );
    (section.equations ?? []).forEach((line, index) =>
      requireAnswers(line, section.equationAnswers?.[index], `tape equation ${index + 1}`)
    );
    requireAnswers(section.caption, section.captionAnswers, 'tape caption');
  }
  if (section?.kind === 'note') {
    requireAnswers(section.text, section.textAnswers, 'note text');
  }
  if (section?.kind === 'card-grid') {
    (section.cards ?? []).forEach((card, index) =>
      requireAnswers(card.label, card.labelAnswers, `card ${index + 1} label`)
    );
  }
  if (section?.kind === 'data-table' && section.correctCellKeys?.length) {
    if (!section.selectableCells && !section.showCorrectSelections) {
      failures.push(`${label}: table has a correct cell-selection key but no selectable or solved selection state`);
    }
    const validKeys = new Set((section.rows ?? []).flatMap((row, rowIndex) =>
      row.map((_, cellIndex) => `${rowIndex}:${cellIndex}`)
    ));
    for (const key of section.correctCellKeys) {
      if (!validKeys.has(key)) {
        failures.push(`${label}: table cell-selection key ${key} is outside the rendered table`);
      }
    }
  }
}
