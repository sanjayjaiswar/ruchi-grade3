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
  m1: 21,
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

function collectSectionKinds(sections, kinds = new Set()) {
  for (const section of sections ?? []) {
    if (section?.kind) kinds.add(section.kind);
    for (const card of section?.cards ?? []) {
      collectSectionKinds(card.sections, kinds);
    }
  }
  return kinds;
}

function collectSections(sections, collected = []) {
  for (const section of sections ?? []) {
    collected.push(section);
    for (const card of section?.cards ?? []) {
      collectSections(card.sections, collected);
    }
  }
  return collected;
}

function numericValues(text) {
  return [...new Set(String(text ?? '').match(/\d+(?:\.\d+)?/g) ?? [])];
}

function validateNumericSourceProvenance(moduleId, lessonNumber, centeredLesson) {
  const contractPath = join(root, 'teacher-edition-baseline', 'contracts', moduleId, `lesson-${String(lessonNumber).padStart(2, '0')}.json`);
  const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
  const sourceText = [
    contract.problemSet.problemSetText,
    contract.problemSet.answerKeyProblemSetText,
    contract.problemSet.answerKeyText,
    contract.sourceText?.problemSetPages,
    contract.sourceText?.answerKeyPages
  ].map((value) => typeof value === 'string' ? value : JSON.stringify(value ?? '')).join(' ');
  const sourceNumbers = new Set(numericValues(sourceText));
  for (const problem of centeredLesson.problems) {
    const label = `${moduleId.toUpperCase()} L${lessonNumber} P${problem.number}`;
    for (const number of numericValues(problem.sourcePrompt)) {
      if (!sourceNumbers.has(number)) report(label, `prompt value ${number} is absent from the Teacher Edition evidence`);
    }
    for (const number of numericValues(problem.solvedAnswer)) {
      if (!sourceNumbers.has(number) && !contract.problemSet.permitsVariableResponses) {
        report(label, `solved value ${number} is absent from the Teacher Edition evidence`);
      }
    }
  }
}

function validateM1ModuleLesson(lessonNumber, runtime, centeredLesson) {
  const label = `M1 L${lessonNumber} functional contract`;
  const contractPath = join(root, 'teacher-edition-baseline', 'contracts', 'm1', `lesson-${String(lessonNumber).padStart(2, '0')}.json`);
  const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
  const expectedProblemCounts = [0, 4, 7, 6, 9, 6, 6, 8, 7, 5, 3, 5, 6, 5, 4, 4, 3, 4, 7, 3, 5, 4];
  if (centeredLesson.problems.length !== expectedProblemCounts[lessonNumber]) {
    report(label, `expected ${expectedProblemCounts[lessonNumber]} official problems, found ${centeredLesson.problems.length}`);
  }
  centeredLesson.problems.forEach((problem, index) => {
    if (problem.number !== index + 1) report(label, `Problem ${index + 1} is missing or out of source order`);
  });
  const expectedBasis = `Module 1 Teacher Edition, lesson pages ${contract.source.lessonPdfPages.start}-${contract.source.lessonPdfPages.end}.`;
  if (centeredLesson.teacherEditionBasis !== expectedBasis) {
    report(label, `expected source basis "${expectedBasis}", found "${centeredLesson.teacherEditionBasis}"`);
  }
  if (!equivalentSourceCopy(centeredLesson.title, contract.objective)) {
    report(label, 'title does not contain the exact Teacher Edition objective');
  }
  const sourceGoal = runtime.teacherEditionSteps?.find((step) => step.id === 'source-goal');
  if (!sourceGoal || !equivalentSourceCopy(sourceGoal.studentPrompt, contract.objective)) {
    report(label, 'runtime source goal differs from the Teacher Edition objective');
  }
  if (centeredLesson.conceptSections?.length !== 3) report(label, 'expected exactly three lesson-specific concept stages');
  if (!runtime.lessonAnimation?.conceptSteps || runtime.lessonAnimation.conceptSteps.length < 3) {
    report(label, 'missing meaningful three-stage concept motion');
  }
  if (!String(runtime.lessonAnimation?.equation ?? '').trim() || !String(runtime.lessonAnimation?.teacherPrompt ?? '').trim()) {
    report(label, 'concept motion lacks a source-specific equation or teacher prompt');
  }
  const sourceProblemText = String(contract.problemSet.problemSetText ?? '');
  const sourceAnswerText = `${sourceProblemText} ${contract.problemSet.answerKeyProblemSetText ?? ''} ${contract.problemSet.answerKeyText ?? ''}`;
  for (const problem of centeredLesson.problems) {
    for (const number of numericValues(problem.sourcePrompt)) {
      if (!numericValues(sourceProblemText).includes(number)) {
        report(`${label} P${problem.number}`, `prompt value ${number} is absent from the Teacher Edition Problem Set`);
      }
    }
    for (const number of numericValues(problem.solvedAnswer)) {
      if (!numericValues(sourceAnswerText).includes(number)) {
        report(`${label} P${problem.number}`, `answer value ${number} is absent from the Teacher Edition source or answer key`);
      }
    }
  }
  const studentText = JSON.stringify([centeredLesson.conceptSections, ...centeredLesson.problems.map((problem) => [problem.blankVisual, problem.solvedVisual])]);
  for (const forbidden of ['Teacher Edition source check', 'Official Problem Set focus', 'Debrief and validation', 'What the model must prove']) {
    if (studentText.includes(forbidden)) report(label, `student lesson contains internal audit scaffold: ${forbidden}`);
  }
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

function validateM3ModuleLesson(lessonNumber, runtime, centeredLesson) {
  const label = `M3 L${lessonNumber} functional contract`;
  const contractPath = join(root, 'teacher-edition-baseline', 'contracts', 'm3', `lesson-${String(lessonNumber).padStart(2, '0')}.json`);
  if (!existsSync(contractPath)) {
    report(label, `missing Teacher Edition contract ${relative(root, contractPath)}`);
    return;
  }
  const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
  const expectedProblemCount = contract.problemSet.extractedProblems.length;
  if (centeredLesson.problems.length !== expectedProblemCount) {
    report(label, `expected ${expectedProblemCount} problems, found ${centeredLesson.problems.length}`);
  }

  const expectedBasis = `Module 3 Teacher Edition, lesson pages ${contract.source.lessonPdfPages.start}-${contract.source.lessonPdfPages.end}.`;
  if (centeredLesson.teacherEditionBasis !== expectedBasis) {
    report(label, `expected source basis "${expectedBasis}", found "${centeredLesson.teacherEditionBasis}"`);
  }
  if (!equivalentSourceCopy(centeredLesson.title, contract.objective)) {
    report(label, 'title does not contain the exact Teacher Edition objective');
  }
  const sourceGoal = runtime.teacherEditionSteps?.find((step) => step.id === 'source-goal');
  if (!sourceGoal || !equivalentSourceCopy(sourceGoal.studentPrompt, contract.objective)) {
    report(label, 'runtime source goal differs from the Teacher Edition objective');
  }
  if (!centeredLesson.conceptSections || centeredLesson.conceptSections.length < 3) {
    report(label, 'missing three-stage functional concept sequence');
  }
  if (!runtime.lessonAnimation?.conceptSteps || runtime.lessonAnimation.conceptSteps.length < 3) {
    report(label, 'missing meaningful three-stage concept motion');
  }
  const expectedAnimationKinds = {
    1: 'array', 2: 'array', 3: 'tape-diagram', 4: 'array', 5: 'array', 6: 'array', 7: 'tape-diagram',
    8: 'array', 9: 'array', 10: 'array', 11: 'tape-diagram', 12: 'array', 13: 'number-line', 14: 'array',
    15: 'tape-diagram', 16: 'array', 17: 'array', 18: 'tape-diagram', 19: 'array', 20: 'array', 21: 'tape-diagram'
  };
  if (runtime.lessonAnimation?.kind !== expectedAnimationKinds[lessonNumber]) {
    report(label, `expected ${expectedAnimationKinds[lessonNumber]} concept model, found ${runtime.lessonAnimation?.kind ?? 'none'}`);
  }
  if (!String(runtime.lessonAnimation?.equation ?? '').trim() || !String(runtime.lessonAnimation?.teacherPrompt ?? '').trim()) {
    report(label, 'concept motion lacks a source-specific equation or teacher prompt');
  }

  const blankText = JSON.stringify(centeredLesson.problems.map((problem) => problem.blankVisual));
  const solvedText = JSON.stringify(centeredLesson.problems.map((problem) => problem.solvedVisual));
  const combinedText = `${blankText} ${solvedText}`;

  for (const forbidden of [
    'Teacher Edition source check',
    'What the model must prove',
    'How the solved answer is found',
    'Equation value check',
    'Math expression workspace',
    'Blank problem workspace',
    'Solved problem workspace'
  ]) {
    if (combinedText.includes(forbidden)) {
      report(label, `student visual contains internal audit scaffold: ${forbidden}`);
    }
  }

  if (blankText.includes('Teacher Edition Answer Key:')) {
    report(label, 'blank visuals expose Teacher Edition answer-key language');
  }

  const requiredVisualKinds = {
    1: ['data-table', 'array'], 2: ['card-grid'], 3: ['tape'], 4: ['card-grid'], 5: ['number-bond'],
    6: ['card-grid', 'number-bond'], 7: ['expression-match', 'tape'], 8: ['data-table', 'card-grid'],
    9: ['card-grid'], 10: ['card-grid', 'number-bond'], 11: ['tape'], 12: ['card-grid', 'expression-match'],
    13: ['data-table', 'expression-match'], 14: ['data-table'], 15: ['tape', 'array'],
    16: ['data-table', 'expression-match', 'tape'], 17: ['data-table', 'expression-match'],
    18: ['tape', 'array'], 19: ['data-table'], 20: ['data-table'], 21: ['tape', 'data-table']
  };
  const visualKinds = new Set(centeredLesson.problems.flatMap((problem) => [
    ...problem.blankVisual.sections.map((section) => section.kind),
    ...problem.solvedVisual.sections.map((section) => section.kind)
  ]));
  for (const kind of requiredVisualKinds[lessonNumber]) {
    if (!visualKinds.has(kind)) report(label, `missing source-conforming ${kind} problem model`);
  }

  for (const [problemIndex, problem] of centeredLesson.problems.entries()) {
    const expectedProblem = contract.problemSet.extractedProblems[problemIndex];
    if (problem.number !== expectedProblem.number) {
      report(label, `Problem ${problemIndex + 1} source order differs from the baseline`);
    }
    if (!/^Teacher Edition Answer Key:/i.test(problem.solvedAnswer)) {
      report(`${label} P${problem.number}`, 'solved answer is not explicitly tied to the Teacher Edition Answer Key');
    }
    for (const number of answerNumbers(problem.solvedAnswer)) {
      if (!new RegExp(`(^|\\D)${number}(?:\\D|$)`).test(contract.problemSet.answerKeyText)) {
        report(`${label} P${problem.number}`, `answer value ${number} is absent from the lesson answer-key source`);
      }
    }
    if (problem.blankVisual.sections.length > 3 || problem.solvedVisual.sections.length > 3) {
      report(`${label} P${problem.number}`, 'functional visual exceeds three sections and has likely regressed to audit scaffolding');
    }
  }

  if (lessonNumber < 1 || lessonNumber > 5) return;
  const requiredSolvedEvidence = {
    1: ['24 = 4 × 6', '5 twos + 5 twos = 10 twos', 'Known facts and their commutative partners fill 84'],
    2: ['6 x 7 = 42', '7 x 9 = 63', '32 divided by 8 = 4', '29 < 50'],
    3: ['kitchen tables', 'm = $24', '28 divided by 4 = 7', 'shorter game = 10 min'],
    4: ['Solved sunburst number cards', '6 x 7 = 42', '48 divided by 6 = 8', 'Julie stopped one six too soon'],
    5: ['Solved fish bowls and fish facts', '14 + 7 = 14 + 6 + 1', '7 x 6 = 42', 'Both are correct.']
  };

  for (const evidence of requiredSolvedEvidence[lessonNumber]) {
    if (!solvedText.includes(evidence)) {
      report(label, `missing solved source evidence: ${evidence}`);
    }
  }

  if (lessonNumber === 1) {
    const [chartProblem, arrayProblem, equationProblem] = centeredLesson.problems;
    const blankChart = chartProblem.blankVisual.sections[0];
    const solvedChart = chartProblem.solvedVisual.sections[0];
    if (blankChart.kind !== 'data-table' || blankChart.rows.length !== 10 || blankChart.columns.length !== 11) {
      report(label, 'Problem 1 must preserve the 10-by-10 multiplication chart');
    }
    if (solvedChart.kind !== 'data-table' || solvedChart.rows[9]?.[10] !== '100') {
      report(label, 'Problem 1 solved chart must complete all 100 multiplication facts');
    }
    const array = arrayProblem.solvedVisual.sections[0];
    if (array.kind !== 'array' || array.rows !== 4 || array.columns !== 6 || array.item !== 'square') {
      report(label, 'Problem 2 must show the source 4-by-6 diamond array');
    }
    const parts = equationProblem.solvedVisual.sections[0];
    if (parts.kind !== 'solution-parts' || parts.parts.length !== 12) {
      report(label, 'Problem 3 must preserve all 12 source equation parts');
    }
  }

}

function validateM4ModuleLesson(lessonNumber, runtime, centeredLesson) {
  const label = `M4 L${lessonNumber} functional contract`;
  const contractPath = join(root, 'teacher-edition-baseline', 'contracts', 'm4', `lesson-${String(lessonNumber).padStart(2, '0')}.json`);
  if (!existsSync(contractPath)) {
    report(label, `missing Teacher Edition contract ${relative(root, contractPath)}`);
    return;
  }

  const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
  const expectedProblemCounts = [0, 6, 5, 4, 6, 4, 4, 4, 6, 4, 3, 4, 5, 3, 4, 5, 1];
  if (centeredLesson.problems.length !== expectedProblemCounts[lessonNumber]) {
    report(label, `expected ${expectedProblemCounts[lessonNumber]} official problems, found ${centeredLesson.problems.length}`);
  }
  centeredLesson.problems.forEach((problem, index) => {
    if (problem.number !== index + 1) {
      report(label, `Problem ${index + 1} is missing or out of source order`);
    }
  });

  const expectedBasis = `Module 4 Teacher Edition, lesson pages ${contract.source.lessonPdfPages.start}-${contract.source.lessonPdfPages.end}.`;
  if (centeredLesson.teacherEditionBasis !== expectedBasis) {
    report(label, `expected source basis "${expectedBasis}", found "${centeredLesson.teacherEditionBasis}"`);
  }
  if (!equivalentSourceCopy(centeredLesson.title, contract.objective)) {
    report(label, 'title does not contain the exact Teacher Edition objective');
  }
  const sourceGoal = runtime.teacherEditionSteps?.find((step) => step.id === 'source-goal');
  if (!sourceGoal || !equivalentSourceCopy(sourceGoal.studentPrompt, contract.objective)) {
    report(label, 'runtime source goal differs from the Teacher Edition objective');
  }

  if (centeredLesson.conceptSections?.length !== 3) {
    report(label, 'expected exactly three lesson-specific concept stages');
  }
  if (!runtime.lessonAnimation?.conceptSteps || runtime.lessonAnimation.conceptSteps.length < 3) {
    report(label, 'missing meaningful three-stage concept motion');
  }
  if (runtime.lessonAnimation?.kind !== 'area-model') {
    report(label, `expected an area-model concept animation, found ${runtime.lessonAnimation?.kind ?? 'none'}`);
  }
  if (!runtime.lessonAnimation?.conceptVisual?.sections?.length) {
    report(label, 'missing source-specific concept visual');
  }

  const expectedConceptVisualKinds = {
    1: ['data-table'], 2: ['card-grid'], 3: ['array'], 4: ['array'], 5: ['array'], 6: ['array'],
    7: ['data-table'], 8: ['array'], 9: ['card-grid'], 10: ['card-grid'], 11: ['data-table'],
    12: ['geometry-diagram'], 13: ['geometry-diagram', 'equations'], 14: ['geometry-diagram', 'equations'],
    15: ['floor-plan'], 16: ['data-table']
  };
  const conceptKinds = collectSectionKinds(runtime.lessonAnimation?.conceptVisual?.sections);
  for (const kind of expectedConceptVisualKinds[lessonNumber]) {
    if (!conceptKinds.has(kind)) report(label, `missing source-specific ${kind} concept model`);
  }

  const animationSourceText = `${contract.instructionalContract.conceptDevelopmentText} ${contract.problemSet.problemSetText} ${contract.problemSet.answerKeyText}`.replace(/,/g, '');
  for (const number of answerNumbers(runtime.lessonAnimation?.equation)) {
    if (!new RegExp(`(^|\\D)${number}(?:\\D|$)`).test(animationSourceText)) {
      report(label, `concept animation value ${number} is absent from the Teacher Edition lesson source`);
    }
  }
  if (!String(runtime.lessonAnimation?.teacherPrompt ?? '').trim()) {
    report(label, 'concept animation is missing its Teacher Edition-aligned teacher prompt');
  }

  const blankText = JSON.stringify(centeredLesson.problems.map((problem) => problem.blankVisual));
  const solvedText = JSON.stringify(centeredLesson.problems.map((problem) => problem.solvedVisual));
  const combinedText = `${blankText} ${solvedText}`;
  for (const forbidden of [
    'Teacher Edition source check',
    'What the model must prove',
    'How the solved answer is found',
    'Equation value check',
    'Math expression workspace',
    'Teacher Edition concept',
    'Problem Set focus',
    'Validation focus'
  ]) {
    if (combinedText.includes(forbidden) || centeredLesson.conceptSections.some((section) => section.title.includes(forbidden))) {
      report(label, `student lesson contains generic audit scaffold: ${forbidden}`);
    }
  }
  if (blankText.includes('Teacher Edition answer')) {
    report(label, 'blank visuals expose Teacher Edition answer language');
  }

  const requiredProblemVisualKinds = {
    1: ['source-crop', 'data-table'], 2: ['card-grid'], 3: ['card-grid'], 4: ['array'],
    5: ['card-grid', 'array'], 6: ['card-grid'], 7: ['card-grid', 'array'], 8: ['card-grid', 'array'],
    9: ['card-grid', 'array'], 10: ['card-grid', 'array'], 11: ['card-grid'], 12: ['card-grid', 'array'],
    13: ['source-crop'], 14: ['source-crop', 'card-grid'], 15: ['floor-plan'], 16: ['floor-plan']
  };
  const problemKinds = new Set(centeredLesson.problems.flatMap((problem) => [
    ...problem.blankVisual.sections.map((section) => section.kind),
    ...problem.solvedVisual.sections.map((section) => section.kind)
  ]));
  for (const kind of requiredProblemVisualKinds[lessonNumber]) {
    if (!problemKinds.has(kind)) report(label, `missing source-conforming ${kind} problem model`);
  }

  const answerKeyText = String(contract.problemSet.answerKeyText ?? '').replace(/,/g, '');
  for (const problem of centeredLesson.problems) {
    if (problem.blankVisual.sections.length > 3 || problem.solvedVisual.sections.length > 3) {
      report(`${label} P${problem.number}`, 'functional visual exceeds three purposeful sections');
    }
    for (const number of answerNumbers(problem.solvedAnswer)) {
      if (!new RegExp(`(^|\\D)${number}(?:\\D|$)`).test(answerKeyText)) {
        report(`${label} P${problem.number}`, `solved value ${number} is absent from the Teacher Edition answer key`);
      }
    }
  }
}

function validateM5ModuleLesson(lessonNumber, runtime, centeredLesson) {
  const label = `M5 L${lessonNumber} functional contract`;
  const contractPath = join(root, 'teacher-edition-baseline', 'contracts', 'm5', `lesson-${String(lessonNumber).padStart(2, '0')}.json`);
  if (!existsSync(contractPath)) {
    report(label, `missing Teacher Edition contract ${relative(root, contractPath)}`);
    return;
  }

  const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
  const expectedProblemCounts = [0, 5, 4, 6, 6, 4, 3, 11, 6, 3, 5, 10, 6, 7, 3, 3, 4, 5, 8, 5, 4, 5, 5, 6, 4, 3, 4, 5, 8, 9, 1];
  if (centeredLesson.problems.length !== expectedProblemCounts[lessonNumber]) {
    report(label, `expected ${expectedProblemCounts[lessonNumber]} official problems, found ${centeredLesson.problems.length}`);
  }
  centeredLesson.problems.forEach((problem, index) => {
    if (problem.number !== index + 1) report(label, `Problem ${index + 1} is missing or out of source order`);
  });

  const expectedBasis = `Module 5 Teacher Edition, lesson pages ${contract.source.lessonPdfPages.start}-${contract.source.lessonPdfPages.end}.`;
  if (centeredLesson.teacherEditionBasis !== expectedBasis) {
    report(label, `expected source basis "${expectedBasis}", found "${centeredLesson.teacherEditionBasis}"`);
  }
  const exactObjective = String(contract.objective).replace(/\s+NOTES ON.*$/s, '').trim();
  if (!equivalentSourceCopy(centeredLesson.title, exactObjective)) {
    report(label, 'title does not contain the exact Teacher Edition objective');
  }
  const sourceGoal = runtime.teacherEditionSteps?.find((step) => step.id === 'source-goal');
  if (!sourceGoal || !equivalentSourceCopy(sourceGoal.studentPrompt, exactObjective)) {
    report(label, 'runtime source goal differs from the Teacher Edition objective');
  }

  if (centeredLesson.conceptSections?.length !== 3) report(label, 'expected exactly three lesson-specific concept stages');
  if (!runtime.lessonAnimation?.conceptSteps || runtime.lessonAnimation.conceptSteps.length < 3) {
    report(label, 'missing meaningful three-stage concept motion');
  }
  if (!runtime.lessonAnimation?.conceptVisual?.sections?.length) report(label, 'missing source-specific concept visual');
  if (!String(runtime.lessonAnimation?.teacherPrompt ?? '').trim()) report(label, 'missing Teacher Edition-aligned concept question');

  const numberLineLessons = new Set([14, 15, 16, 17, 18, 19, 21, 23, 25, 30]);
  const expectedAnimationKind = numberLineLessons.has(lessonNumber) ? 'number-line' : 'fraction-strip';
  if (runtime.lessonAnimation?.kind !== expectedAnimationKind) {
    report(label, `expected ${expectedAnimationKind} concept animation, found ${runtime.lessonAnimation?.kind ?? 'none'}`);
  }

  const conceptKinds = collectSectionKinds(runtime.lessonAnimation?.conceptVisual?.sections);
  const sourceCropLessons = new Set([5, 11, 13, 30]);
  const tableLessons = new Set([4, 12, 24]);
  if (sourceCropLessons.has(lessonNumber) && !conceptKinds.has('source-crop')) {
    report(label, 'missing official source illustration in the concept model');
  } else if (tableLessons.has(lessonNumber) && !conceptKinds.has('data-table')) {
    report(label, 'missing source-specific fraction table concept model');
  } else if (numberLineLessons.has(lessonNumber) && lessonNumber !== 30 && !conceptKinds.has('number-line')) {
    report(label, 'missing source-specific number-line concept model');
  } else if (!sourceCropLessons.has(lessonNumber) && !tableLessons.has(lessonNumber) && !numberLineLessons.has(lessonNumber) && !conceptKinds.has('fraction-strip')) {
    report(label, 'missing source-specific fraction model');
  }

  const animationSourceText = `${contract.instructionalContract.conceptDevelopmentText} ${contract.problemSet.problemSetText} ${contract.problemSet.answerKeyText}`.replace(/,/g, '');
  for (const number of answerNumbers(runtime.lessonAnimation?.equation)) {
    if (!new RegExp(`(^|\\D)${number}(?:\\D|$)`).test(animationSourceText)) {
      report(label, `concept animation value ${number} is absent from the Teacher Edition lesson source`);
    }
  }

  const blankText = JSON.stringify(centeredLesson.problems.map((problem) => problem.blankVisual));
  const solvedText = JSON.stringify(centeredLesson.problems.map((problem) => problem.solvedVisual));
  const combinedText = `${blankText} ${solvedText}`;
  for (const forbidden of [
    'Teacher Edition source check', 'What the model must prove', 'How the solved answer is found',
    'Equation value check', 'Math expression workspace', 'Teacher Edition concept',
    'Official Problem Set focus', 'Debrief and validation'
  ]) {
    if (combinedText.includes(forbidden) || centeredLesson.conceptSections.some((section) => section.title.includes(forbidden))) {
      report(label, `student lesson contains generic audit scaffold: ${forbidden}`);
    }
  }
  if (blankText.includes('Teacher Edition answer')) report(label, 'blank visuals expose Teacher Edition answer language');
  if (/answer provided/i.test(solvedText)) report(label, 'solved visuals retain a generic answer-provided fallback instead of stating the source example');

  if (lessonNumber === 18 && !centeredLesson.problems[0]?.solvedAnswer?.includes('1/4 < 3/4')) {
    report(label, 'Lesson 18 Problem 1 must state the provided fourths comparison 1/4 < 3/4');
  }
  if (lessonNumber === 8) {
    const expectedPairs = ['3/5 and 2/5', '3/4 and 1/4', '3/6 and 3/6', '2/9 and 7/9'];
    for (const [index, expectedPair] of expectedPairs.entries()) {
      if (!centeredLesson.problems[index]?.solvedAnswer?.includes(expectedPair)) {
        report(label, `Problem ${index + 1} must preserve the source ${expectedPair} shaded/unshaded pair`);
      }
    }
    if (!JSON.stringify(centeredLesson.problems.slice(0, 4).map((problem) => problem.solvedVisual)).includes('/source-pages/m5-teacher/page-93.png')) {
      report(label, 'Problems 1-4 must show the official shaded source figures');
    }
  }
  if (lessonNumber === 24) {
    const required = ['2/2 = 3/3 = 4/4 = 5/5 = 1', 'numerator equals the denominator', 'Taylor', '4/4', '3/3'];
    const lessonText = JSON.stringify(centeredLesson.problems);
    for (const evidence of required) {
      if (!lessonText.includes(evidence)) report(label, `missing whole-number fraction evidence: ${evidence}`);
    }
  }
  if (lessonNumber === 29) {
    const firstProblem = centeredLesson.problems[0];
    if (!firstProblem?.solvedAnswer?.includes('2/6 < 2/3')) {
      report(label, 'Lesson 29 Problem 1 must preserve the provided comparison 2/6 < 2/3');
    }
    const modelOrder = firstProblem?.fractionModels?.map((model) => `${model.numerator}/${model.denominator}`).join(',');
    if (modelOrder !== '2/6,2/3') {
      report(label, `Lesson 29 Problem 1 model order drifted from 2/6,2/3 to ${modelOrder ?? 'none'}`);
    }
  }

  const problemKinds = new Set(centeredLesson.problems.flatMap((problem) => [
    ...collectSectionKinds(problem.blankVisual.sections),
    ...collectSectionKinds(problem.solvedVisual.sections)
  ]));
  if ([5, 11, 13].includes(lessonNumber) && !problemKinds.has('source-crop')) {
    report(label, 'missing official source illustration required by the Teacher Edition contract');
  }
  const deliveredNumberLineLessons = lessonNumber >= 14 && lessonNumber <= 19 || lessonNumber >= 21 && lessonNumber <= 26 && lessonNumber !== 22 || lessonNumber === 30;
  if (deliveredNumberLineLessons && !problemKinds.has('number-line')) {
    report(label, 'missing source-conforming problem number line');
  }
  if (!deliveredNumberLineLessons && !problemKinds.has('fraction-strip') && !problemKinds.has('source-crop')) {
    report(label, 'missing source-conforming fraction problem model');
  }
  if (lessonNumber === 22) {
    if (!problemKinds.has('source-crop') || !problemKinds.has('fraction-strip')) {
      report(label, 'Lesson 22 must show the official shaded figures and equivalent fraction strips');
    }
    const lesson22VisualText = JSON.stringify(centeredLesson.problems.map((problem) => [problem.blankVisual, problem.solvedVisual]));
    for (const relationship of ['2 copies of 1/8', '1 copy of 1/4', '2 copies of 1/6', '1 copy of 1/3', '10 sixths', '5 thirds']) {
      if (!lesson22VisualText.includes(relationship)) report(label, `Lesson 22 visual is missing ${relationship}`);
    }
    if (lesson22VisualText.includes('Source number-line workspaces')) {
      report(label, 'Lesson 22 still substitutes generic number lines for the source fraction figures');
    }
  }

  const answerKeyText = `${contract.problemSet.problemSetText ?? ''} ${contract.problemSet.answerKeyText ?? ''}`.replace(/,/g, '');
  for (const problem of centeredLesson.problems) {
    if (problem.blankVisual.sections.length > 3 || problem.solvedVisual.sections.length > 3) {
      report(`${label} P${problem.number}`, 'functional visual exceeds three purposeful sections');
    }
    for (const number of answerNumbers(problem.solvedAnswer)) {
      if (!new RegExp(`(^|\\D)${number}(?:\\D|$)`).test(answerKeyText)) {
        report(`${label} P${problem.number}`, `solved value ${number} is absent from the Teacher Edition answer key`);
      }
    }
    for (const section of collectSections(problem.solvedVisual.sections)) {
      if (section.kind === 'fraction-strip') {
        const labelFraction = String(section.label ?? '').match(/^(?:Solved\s+|Blank\s+)?(\d+)\/(\d+)(?:\b|\s)/);
        if (labelFraction && (Number(labelFraction[1]) !== section.numerator || Number(labelFraction[2]) !== section.denominator)) {
          report(`${label} P${problem.number}`, `fraction-strip label ${labelFraction[0]} does not match model ${section.numerator}/${section.denominator}`);
        }
      }
      if (section.kind === 'equations') {
        for (const line of section.lines ?? []) {
          const fractions = [...String(line).matchAll(/(\d+)\/(\d+)/g)].map((match) => Number(match[1]) / Number(match[2]));
          if (line.includes('=') && fractions.length >= 2 && fractions.some((value) => Math.abs(value - fractions[0]) > 1e-9)) {
            report(`${label} P${problem.number}`, `false fraction equality: ${line}`);
          }
        }
      }
    }
  }
}

function validateM6ModuleLesson(lessonNumber, runtime, centeredLesson) {
  const label = `M6 L${lessonNumber} functional contract`;
  const contractPath = join(root, 'teacher-edition-baseline', 'contracts', 'm6', `lesson-${String(lessonNumber).padStart(2, '0')}.json`);
  if (!existsSync(contractPath)) {
    report(label, `missing Teacher Edition contract ${relative(root, contractPath)}`);
    return;
  }

  const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
  const expectedProblemCounts = [0, 4, 3, 5, 2, 3, 2, 1, 1, 3];
  const exactObjectives = {
    1: 'Generate and organize data.',
    2: 'Rotate tape diagrams vertically.',
    3: 'Create scaled bar graphs.',
    4: 'Solve one- and two-step problems involving graphs.',
    5: 'Create ruler with 1-inch, 1/2-inch, and 1/4-inch intervals, and generate measurement data.',
    6: 'Interpret measurement data from various line plots.',
    7: 'Represent measurement data with line plots.',
    8: 'Represent measurement data with line plots.',
    9: 'Analyze data to problem solve.'
  };

  if (centeredLesson.problems.length !== expectedProblemCounts[lessonNumber]) {
    report(label, `expected ${expectedProblemCounts[lessonNumber]} official problems, found ${centeredLesson.problems.length}`);
  }
  centeredLesson.problems.forEach((problem, index) => {
    if (problem.number !== index + 1) report(label, `Problem ${index + 1} is missing or out of source order`);
  });

  const expectedBasis = `Module 6 Teacher Edition, lesson pages ${contract.source.lessonPdfPages.start}-${contract.source.lessonPdfPages.end}.`;
  if (centeredLesson.teacherEditionBasis !== expectedBasis) {
    report(label, `expected source basis "${expectedBasis}", found "${centeredLesson.teacherEditionBasis}"`);
  }
  if (!equivalentSourceCopy(centeredLesson.title, exactObjectives[lessonNumber])) {
    report(label, 'title differs from the exact Teacher Edition objective');
  }
  const sourceGoal = runtime.teacherEditionSteps?.find((step) => step.id === 'source-goal');
  if (!sourceGoal || !equivalentSourceCopy(sourceGoal.studentPrompt, exactObjectives[lessonNumber])) {
    report(label, 'runtime source goal differs from the Teacher Edition objective');
  }

  if (centeredLesson.conceptSections?.length !== 3) report(label, 'expected exactly three lesson-specific concept stages');
  if (!runtime.lessonAnimation?.conceptSteps || runtime.lessonAnimation.conceptSteps.length < 3) {
    report(label, 'missing meaningful three-stage concept motion');
  }
  if (!runtime.lessonAnimation?.conceptVisual?.sections?.length) report(label, 'missing source-specific concept visual');
  if (!String(runtime.lessonAnimation?.teacherPrompt ?? '').trim()) report(label, 'missing Teacher Edition-aligned concept question');

  const expectedKinds = { 1: 'graph', 2: 'tape-diagram', 3: 'graph', 4: 'graph', 5: 'measurement', 6: 'graph', 7: 'graph', 8: 'graph', 9: 'graph' };
  if (runtime.lessonAnimation?.kind !== expectedKinds[lessonNumber]) {
    report(label, `expected ${expectedKinds[lessonNumber]} concept animation, found ${runtime.lessonAnimation?.kind ?? 'none'}`);
  }

  const conceptKinds = collectSectionKinds(runtime.lessonAnimation?.conceptVisual?.sections);
  const requiredConceptKinds = {
    1: ['data-table', 'data-chart'],
    2: ['card-grid', 'tape'],
    3: ['data-chart'],
    4: ['data-chart'],
    5: ['number-line', 'data-table'],
    6: ['line-plot'],
    7: ['line-plot'],
    8: ['line-plot'],
    9: ['data-chart', 'line-plot']
  };
  for (const kind of requiredConceptKinds[lessonNumber]) {
    if (!conceptKinds.has(kind)) report(label, `concept model is missing ${kind}`);
  }

  const blankText = JSON.stringify(centeredLesson.problems.map((problem) => problem.blankVisual));
  const solvedText = JSON.stringify(centeredLesson.problems.map((problem) => problem.solvedVisual));
  if (/Teacher Edition answer/i.test(blankText)) report(label, 'blank visuals expose Teacher Edition answer language');
  if (/Completed work must match|Variable responses must include the Teacher Edition criteria|Use the display evidence for fixed values/i.test(solvedText)) {
    report(label, 'solved visuals retain a generic delivery fallback');
  }

  const lessonProblemKinds = new Set(centeredLesson.problems.flatMap((problem) => [
    ...collectSectionKinds(problem.blankVisual.sections),
    ...collectSectionKinds(problem.solvedVisual.sections)
  ]));
  const requiredProblemKinds = {
    1: ['data-chart'], 2: ['tape'], 3: ['data-chart', 'number-line'], 4: ['data-chart'],
    5: ['data-table', 'number-line'], 6: ['line-plot'], 7: ['line-plot'], 8: ['line-plot'], 9: ['data-chart', 'line-plot']
  };
  for (const kind of requiredProblemKinds[lessonNumber]) {
    if (!lessonProblemKinds.has(kind)) report(label, `Problem Set delivery is missing ${kind}`);
  }

  if (lessonNumber === 2) {
    const totals = centeredLesson.problems[0]?.solvedDataDisplay?.values?.map((item) => item.value).join(',');
    if (totals !== '16,8,24,32') report(label, `Lesson 2 Problem 1 solved tape totals drifted to ${totals ?? 'none'}`);
  }

  for (const problem of centeredLesson.problems) {
    for (const visual of [problem.blankVisual, problem.solvedVisual]) {
      for (const section of visual.sections) {
        if (section.kind === 'data-table' && section.rows.some((row) => row.length !== section.columns.length)) {
          report(`${label} P${problem.number}`, `data table "${section.label ?? 'unnamed'}" has row/column length drift`);
        }
      }
    }
  }

  const answerKeyText = `${contract.problemSet.problemSetText ?? ''} ${contract.problemSet.answerKeyText ?? ''}`.replace(/,/g, '');
  for (const problem of centeredLesson.problems) {
    if (problem.blankVisual.sections.length > 3 || problem.solvedVisual.sections.length > 3) {
      report(`${label} P${problem.number}`, 'functional visual exceeds three purposeful sections');
    }
    for (const number of answerNumbers(problem.solvedAnswer)) {
      if (!new RegExp(`(^|\\D)${number}(?:\\D|$)`).test(answerKeyText)) {
        report(`${label} P${problem.number}`, `solved value ${number} is absent from the Teacher Edition source or answer key`);
      }
    }
  }
}

function validateM7ModuleLesson(lessonNumber, runtime, centeredLesson) {
  const label = `M7 L${lessonNumber} functional contract`;
  const contractPath = join(root, 'teacher-edition-baseline', 'contracts', 'm7', `lesson-${String(lessonNumber).padStart(2, '0')}.json`);
  if (!existsSync(contractPath)) {
    report(label, `missing Teacher Edition contract ${relative(root, contractPath)}`);
    return;
  }

  const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
  const expectedProblemCounts = [0, 4, 6, 6, 4, 4, 6, 4, 7, 4, 3, 4, 4, 3, 5, 6, 4, 3, 3, 4, 2, 4, 5, 6, 1, 1, 4, 4, 4, 4, 1, 1, 4, 1, 1];
  const expectedKinds = {
    1: 'tape-diagram', 2: 'tape-diagram', 3: 'tape-diagram',
    4: 'geometry', 5: 'geometry', 6: 'geometry', 7: 'geometry', 8: 'geometry', 9: 'geometry',
    10: 'measurement', 11: 'measurement', 12: 'measurement', 13: 'measurement', 14: 'measurement',
    15: 'measurement', 16: 'measurement', 17: 'measurement', 18: 'area-model', 19: 'graph',
    20: 'area-model', 21: 'area-model', 22: 'graph', 23: 'measurement', 24: 'area-model',
    25: 'area-model', 26: 'graph', 27: 'area-model', 28: 'area-model', 29: 'area-model',
    30: 'graph', 31: 'fraction-strip', 32: 'fraction-strip', 33: 'graph', 34: 'graph'
  };

  if (centeredLesson.problems.length !== expectedProblemCounts[lessonNumber]) {
    report(label, `expected ${expectedProblemCounts[lessonNumber]} official problems, found ${centeredLesson.problems.length}`);
  }
  centeredLesson.problems.forEach((problem, index) => {
    if (problem.number !== index + 1) report(label, `Problem ${index + 1} is missing or out of source order`);
  });

  const expectedBasis = `Module 7 Teacher Edition, lesson pages ${contract.source.lessonPdfPages.start}-${contract.source.lessonPdfPages.end}.`;
  if (centeredLesson.teacherEditionBasis !== expectedBasis) {
    report(label, `expected source basis "${expectedBasis}", found "${centeredLesson.teacherEditionBasis}"`);
  }
  if (!equivalentSourceCopy(centeredLesson.title, contract.objective)) {
    report(label, 'title differs from the exact Teacher Edition objective');
  }
  const sourceGoal = runtime.teacherEditionSteps?.find((step) => step.id === 'source-goal');
  if (!sourceGoal || !equivalentSourceCopy(sourceGoal.studentPrompt, contract.objective)) {
    report(label, 'runtime source goal differs from the Teacher Edition objective');
  }

  if (centeredLesson.conceptSections?.length !== 3) report(label, 'expected exactly three lesson-specific concept stages');
  if (!runtime.lessonAnimation?.conceptSteps || runtime.lessonAnimation.conceptSteps.length < 3) {
    report(label, 'missing meaningful three-stage concept motion');
  }
  if (!runtime.lessonAnimation?.conceptVisual?.sections?.length) report(label, 'missing source-specific concept visual');
  if (!String(runtime.lessonAnimation?.teacherPrompt ?? '').trim()) report(label, 'missing Teacher Edition-aligned concept question');
  if (runtime.lessonAnimation?.kind !== expectedKinds[lessonNumber]) {
    report(label, `expected ${expectedKinds[lessonNumber]} concept animation, found ${runtime.lessonAnimation?.kind ?? 'none'}`);
  }

  const conceptKinds = collectSectionKinds(runtime.lessonAnimation?.conceptVisual?.sections);
  const requiredConceptKind = lessonNumber <= 3 || lessonNumber === 30 || lessonNumber >= 33
    ? 'data-table'
    : lessonNumber >= 4 && lessonNumber <= 17 || lessonNumber === 23 || lessonNumber >= 24 && lessonNumber <= 27 || lessonNumber === 29 || lessonNumber === 31 || lessonNumber === 32
      ? 'geometry-diagram'
      : lessonNumber === 19 || lessonNumber === 22
        ? 'line-plot'
        : 'card-grid';
  if (!conceptKinds.has(requiredConceptKind)) report(label, `concept model is missing ${requiredConceptKind}`);

  const blankText = JSON.stringify(centeredLesson.problems.map((problem) => problem.blankVisual));
  const solvedText = JSON.stringify(centeredLesson.problems.map((problem) => problem.solvedVisual));
  if (/Teacher Edition answer/i.test(blankText)) report(label, 'blank visuals expose Teacher Edition answer language');
  if (/Completed work must match the required model|Teacher Edition visual evidence|authored Module 7 workspace/i.test(solvedText)) {
    report(label, 'solved visuals retain a generic delivery or audit fallback');
  }

  const lessonProblemKinds = new Set(centeredLesson.problems.flatMap((problem) => [
    ...collectSectionKinds(problem.blankVisual.sections),
    ...collectSectionKinds(problem.solvedVisual.sections)
  ]));
  const requiredProblemKind = lessonNumber <= 3 || lessonNumber === 15 || lessonNumber === 23 || lessonNumber === 30 || lessonNumber >= 33
    ? 'data-table'
    : lessonNumber >= 4 && lessonNumber <= 17 || lessonNumber >= 24 && lessonNumber <= 27 || lessonNumber === 29 || lessonNumber === 31 || lessonNumber === 32
      ? 'geometry-diagram'
      : lessonNumber === 19 || lessonNumber === 22
        ? 'line-plot'
        : 'array';
  if (!lessonProblemKinds.has(requiredProblemKind)) report(label, `Problem Set delivery is missing ${requiredProblemKind}`);

  if (lessonNumber === 19) {
    const countAtTwelve = centeredLesson.problems[1]?.dataDisplay?.values?.find((item) => item.label === '12')?.value;
    if (countAtTwelve !== 3) report(label, `Lesson 19 line plot must show 3 rectangles for 12 unit squares, found ${countAtTwelve ?? 'none'}`);
  }
  if (lessonNumber === 24) {
    const projectText = `${centeredLesson.problems[0]?.sourcePrompt} ${centeredLesson.problems[0]?.solvedVisual?.title} ${JSON.stringify(centeredLesson.problems[0]?.solvedVisual)}`;
    for (const value of ['14 cm', '18 cm', '28 cm', '16 cm', '8 cm']) {
      if (!projectText.includes(value)) report(label, `robot project is missing required perimeter ${value}`);
    }
  }
  if (lessonNumber >= 4 && lessonNumber <= 9) {
    const geometryText = JSON.stringify(centeredLesson.problems.map((problem) => [problem.blankVisual, problem.solvedVisual]));
    for (const placeholder of ['"label":"requested polygon"', '"valueLabel":"mark evidence"', '"valueLabel":"classification justified"', '"label":"source pieces"', '"valueLabel":"show internal lines"', '"label":"outside polygon"']) {
      if (geometryText.includes(placeholder)) report(label, `geometry still uses generic placeholder "${placeholder}"`);
    }
    if (lessonNumber === 4) {
      for (const shapeLabel of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']) {
        if (!geometryText.includes(`"label":"${shapeLabel}"`)) report(label, `quadrilateral set is missing shape ${shapeLabel}`);
      }
    }
    if (lessonNumber === 5) {
      for (const shapeLabel of ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X']) {
        if (!geometryText.includes(`"label":"${shapeLabel}"`)) report(label, `polygon set is missing shape ${shapeLabel}`);
      }
    }
    if (lessonNumber === 6) {
      for (const requiredShape of ['right triangle', '2-inch square', 'quadrilateral', 'pentagon', 'hexagon']) {
        if (!geometryText.includes(requiredShape)) report(label, `polygon construction set is missing ${requiredShape}`);
      }
    }
    if (lessonNumber === 7 && !geometryText.includes('Tetromino pieces and visible joins')) {
      report(label, 'tetromino lessons must show concrete four-square pieces');
    }
    if ((lessonNumber === 8 || lessonNumber === 9) && !geometryText.includes('Seven tangram pieces')) {
      report(label, 'tangram lessons must show the seven source pieces');
    }
  }

  const answerKeyText = `${contract.problemSet.problemSetText ?? ''} ${contract.problemSet.answerKeyText ?? ''}`.replace(/,/g, '');
  for (const problem of centeredLesson.problems) {
    if (problem.blankVisual.sections.length > 3 || problem.solvedVisual.sections.length > 3) {
      report(`${label} P${problem.number}`, 'functional visual exceeds three purposeful sections');
    }
    for (const number of answerNumbers(problem.solvedAnswer)) {
      if (!new RegExp(`(^|\\D)${number}(?:\\D|$)`).test(answerKeyText)) {
        report(`${label} P${problem.number}`, `solved value ${number} is absent from the Teacher Edition source or answer key`);
      }
    }
  }
}

function equivalentSourceCopy(value, objective) {
  const normalize = (text) => String(text ?? '')
    .toLowerCase()
    .replace(/[×]/g, 'x')
    .replace(/[–—−]/g, '-')
    .replace(/[^a-z0-9$+\-()=]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return normalize(value).includes(normalize(objective));
}

function answerNumbers(answer) {
  return [...new Set((String(answer).match(/\b\d+\b/g) ?? []).filter((number) => Number(number) <= 1000))];
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
    if (moduleId === 'm3') {
      validateM3ModuleLesson(lessonNumber, runtime, centeredLesson);
    }
    if (moduleId === 'm1') {
      validateM1ModuleLesson(lessonNumber, runtime, centeredLesson);
    }
    if (moduleId === 'm4') {
      validateM4ModuleLesson(lessonNumber, runtime, centeredLesson);
    }
    if (moduleId === 'm5') {
      validateM5ModuleLesson(lessonNumber, runtime, centeredLesson);
    }
    if (moduleId === 'm6') {
      validateM6ModuleLesson(lessonNumber, runtime, centeredLesson);
    }
    if (moduleId === 'm7') {
      validateM7ModuleLesson(lessonNumber, runtime, centeredLesson);
    }
    for (const problem of centeredLesson.problems) {
      problemCount += 1;
      validateProblem(moduleId, lessonNumber, problem);
    }
    validateNumericSourceProvenance(moduleId, lessonNumber, centeredLesson);
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
