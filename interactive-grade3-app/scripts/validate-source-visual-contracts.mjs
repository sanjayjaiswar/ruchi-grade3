import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
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

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const visualContractsRoot = join(baselineRoot, 'visual-layout-contracts');
const { findLessonRuntime } = require(join(appRoot, 'src/app/data/lessons/lesson-registry.ts'));
const lessonIds = parseLessonIds(process.argv.slice(2));
const failures = [];
const prohibitedAcceptanceFields = new Set([
  'rootKind',
  'runtimePath',
  'renderer',
  'implementationCheck',
  'authoredComponent'
]);
const allowedContractFields = new Set([
  'schemaVersion',
  'lessonId',
  'teacherEditionPdfSha256',
  'sourceEvidence',
  'problems'
]);
const allowedEvidenceFields = new Set(['image', 'sha256', 'pdfPage', 'documentSection', 'role']);
const allowedProblemFields = new Set(['number', 'sourcePageImage', 'teacherEditionRequirements']);
const allowedRequirementFields = new Set([
  'sourceTextEvidence',
  'answerKeyEvidence',
  'layout',
  'blankMustNotContain',
  'solvedMustContain',
  'sourceLayoutNotes'
]);
const allowedLayoutFields = new Set([
  'family',
  'subpartCount',
  'thoughtBubbleCount',
  'speechAnswerCount',
  'columnCount',
  'rowCount',
  'printedEquationLineCount',
  'openWorkspaceCount',
  'dividerCount',
  'challengeBadgeCount',
  'decoderSlotCount',
  'decoderValues',
  'modelPrimitive',
  'modelCounts',
  'knownModelCounts',
  'modelOrientation',
  'instructionalModelFamily',
  'responseStructure',
  'sourceFirst',
  'sourceCropCount',
  'sourceCrops'
]);

if (!lessonIds.length) {
  console.error('Teacher Edition visual validation requires --lessons mN-lX,...');
  process.exit(2);
}

for (const lessonId of lessonIds) validateLesson(lessonId);

if (failures.length) {
  console.error(`Teacher Edition visual validation failed for ${lessonIds.join(', ')}.`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`OK: ${lessonIds.length} Teacher Edition visual contract${lessonIds.length === 1 ? '' : 's'} passed.`);
console.log('- Expected text, answers, and visual-layout signatures came only from fingerprinted Teacher Edition evidence.');

function parseLessonIds(args) {
  const flagIndex = args.indexOf('--lessons');
  if (flagIndex < 0 || !args[flagIndex + 1]) return [];
  return [...new Set(args[flagIndex + 1].split(',').map((value) => value.trim()).filter(Boolean))];
}

function validateLesson(lessonId) {
  const match = lessonId.match(/^(m[1-7])-l(\d+)$/);
  if (!match) {
    failures.push(`${lessonId}: expected lesson id in mN-lX form`);
    return;
  }

  const [, moduleId, lessonText] = match;
  const lessonNumber = Number(lessonText);
  const baselinePath = join(baselineRoot, 'contracts', moduleId, `lesson-${String(lessonNumber).padStart(2, '0')}.json`);
  const visualContractPath = join(visualContractsRoot, moduleId, `lesson-${String(lessonNumber).padStart(2, '0')}.json`);
  if (!existsSync(baselinePath)) {
    failures.push(`${lessonId}: missing Teacher Edition text contract`);
    return;
  }
  if (!existsSync(visualContractPath)) {
    failures.push(`${lessonId}: missing Teacher Edition page-layout contract`);
    return;
  }

  const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
  const visualContract = JSON.parse(readFileSync(visualContractPath, 'utf8'));
  if (visualContract.schemaVersion !== 2) failures.push(`${lessonId}: unsupported visual contract schema`);
  if (visualContract.lessonId !== lessonId) failures.push(`${lessonId}: visual contract id mismatch`);
  rejectUnknownFields(lessonId, visualContract, allowedContractFields);
  rejectImplementationAuthoredExpectations(lessonId, visualContract);
  if (visualContract.teacherEditionPdfSha256 !== baseline.source?.teacherEditionSha256) {
    failures.push(`${lessonId}: visual contract is not bound to the controlling Teacher Edition PDF fingerprint`);
  }

  const evidencePaths = validateSourceEvidence(
    lessonId,
    visualContract.sourceEvidence,
    baseline.source?.problemSetPdfPages ?? [],
    baseline.source?.answerKeyPdfPages ?? [],
    baseline.source?.lessonPdfPages,
    baseline.problemSet?.deliveryMode
  );
  const runtime = findLessonRuntime(moduleId, lessonNumber);
  const lesson = runtime?.problemSetCenteredLesson;
  if (!runtime || !lesson) {
    failures.push(`${lessonId}: runtime or centered Problem Set is missing`);
    return;
  }
  if (!Array.isArray(visualContract.problems) || !visualContract.problems.length) {
    failures.push(`${lessonId}: page-layout contract does not cover any Teacher Edition Problem Set items`);
    return;
  }
  if (lesson.problems.length !== visualContract.problems.length) {
    failures.push(`${lessonId}: implementation problem count differs from the Teacher Edition`);
    return;
  }

  visualContract.problems.forEach((sourceProblem, index) => {
    const label = `${lessonId} Problem ${sourceProblem.number ?? index + 1}`;
    const implementation = lesson.problems[index];
    rejectUnknownFields(label, sourceProblem, allowedProblemFields);
    if (sourceProblem.number !== index + 1 || implementation?.number !== index + 1) {
      failures.push(`${label}: problem order differs from the Teacher Edition`);
      return;
    }
    const controllingSection =
      evidencePaths.get(sourceProblem.sourcePageImage)?.documentSection;
    if (
      controllingSection !== 'problem-set' &&
      !(
        controllingSection === 'lesson-resource' &&
        baseline.problemSet?.deliveryMode === 'resource-creation' &&
        !(baseline.source?.problemSetPdfPages ?? []).length
      )
    ) {
      failures.push(`${label}: controlling page image is not fingerprinted Problem Set evidence`);
    }
    validateTeacherEditionRequirements(
      label,
      sourceProblem,
      baseline,
      implementation,
      evidencePaths
    );
  });
}

function validateSourceEvidence(
  lessonId,
  sourceEvidence,
  problemSetPdfPages,
  answerKeyPdfPages,
  lessonPdfPages,
  deliveryMode
) {
  const evidencePaths = new Map();
  if (!Array.isArray(sourceEvidence) || !sourceEvidence.length) {
    failures.push(`${lessonId}: no fingerprinted Teacher Edition page evidence`);
    return evidencePaths;
  }
  for (const evidence of sourceEvidence) {
    rejectUnknownFields(`${lessonId} page evidence`, evidence, allowedEvidenceFields);
    const imagePath = join(appRoot, 'public', String(evidence.image ?? '').replace(/^\//, ''));
    const lessonResourcePages =
      deliveryMode === 'resource-creation' &&
      !problemSetPdfPages.length &&
      lessonPdfPages?.start &&
      lessonPdfPages?.end
        ? Array.from(
            { length: lessonPdfPages.end - lessonPdfPages.start + 1 },
            (_, index) => lessonPdfPages.start + index
          )
        : [];
    const controllingPages =
      evidence.documentSection === 'problem-set'
        ? problemSetPdfPages
        : evidence.documentSection === 'answer-key'
          ? answerKeyPdfPages
          : evidence.documentSection === 'lesson-resource'
            ? lessonResourcePages
            : [];
    if (!evidence.image || !evidence.sha256 || !evidence.pdfPage || !evidence.documentSection || !evidence.role) {
      failures.push(`${lessonId}: every page evidence entry requires image, sha256, pdfPage, documentSection, and role`);
    } else if (!controllingPages.includes(evidence.pdfPage)) {
      failures.push(`${lessonId}: ${evidence.documentSection} evidence page ${evidence.pdfPage} is not listed in the controlling Teacher Edition contract`);
    } else if (!existsSync(imagePath)) {
      failures.push(`${lessonId}: missing controlling page image ${evidence.image}`);
    } else if (sha256(imagePath) !== evidence.sha256) {
      failures.push(`${lessonId}: controlling page image changed ${evidence.image}`);
    } else {
      const dimensions = pngDimensions(imagePath);
      if (!dimensions) {
        failures.push(`${lessonId}: controlling page image is not a readable PNG ${evidence.image}`);
      } else {
        evidencePaths.set(evidence.image, {
          documentSection: evidence.documentSection,
          imagePath,
          ...dimensions
        });
      }
    }
  }
  return evidencePaths;
}

function validateTeacherEditionRequirements(
  label,
  sourceProblem,
  baseline,
  implementation,
  evidencePaths
) {
  const requirements = sourceProblem.teacherEditionRequirements;
  if (!requirements?.layout || !requirements?.sourceTextEvidence?.length || !requirements?.answerKeyEvidence) {
    failures.push(`${label}: Teacher Edition requirements are incomplete`);
    return;
  }
  rejectUnknownFields(`${label} Teacher Edition requirements`, requirements, allowedRequirementFields);
  rejectUnknownFields(`${label} canonical layout`, requirements.layout, allowedLayoutFields);

  const sourceText = normalizeText(baseline.problemSet?.problemSetText);
  const answerKeyText = normalizeText(baseline.problemSet?.answerKeyProblemSetText || baseline.problemSet?.answerKeyText);
  const blankText = normalizeText(implementationEvidenceText(implementation, 'blank'));
  const solvedText = normalizeText(implementationEvidenceText(implementation, 'solved'));
  const answerEvidence = normalizeText(requirements.answerKeyEvidence);
  const declaredSourceEvidence = normalizeText(requirements.sourceTextEvidence.join(' '));
  const implementationAnswer = normalizeText(
    String(implementation.solvedAnswer ?? '').replace(/^Teacher Edition Answer Key:\s*/i, '')
  );
  for (const evidence of requirements.sourceTextEvidence) {
    if (!sourceText.includes(normalizeText(evidence))) {
      failures.push(`${label}: declared source text is absent from the Teacher Edition: ${evidence}`);
    }
    if (!blankText.includes(normalizeText(evidence))) {
      failures.push(`${label}: Blank implementation omits Teacher Edition text: ${evidence}`);
    }
  }
  if (!teacherEditionContainsEvidence(answerKeyText, answerEvidence)) {
    failures.push(`${label}: declared answer evidence is absent from the Teacher Edition answer key`);
  }
  if (!answerSemanticallySupported(implementationAnswer, answerEvidence, declaredSourceEvidence)) {
    failures.push(`${label}: solved answer is not supported by the reviewed per-problem Teacher Edition answer evidence`);
  }
  const sourceAndAnswerEvidence = `${declaredSourceEvidence} ${answerEvidence}`;
  for (const answer of requirements.solvedMustContain ?? []) {
    const normalizedAnswer = normalizeText(answer);
    if (!teacherEditionContainsEvidence(sourceAndAnswerEvidence, normalizedAnswer)) {
      failures.push(`${label}: solved requirement is not backed by the declared Teacher Edition answer evidence: ${answer}`);
    } else if (!containsEvidence(solvedText, normalizedAnswer)) {
      failures.push(`${label}: Solved implementation omits Teacher Edition answer evidence: ${answer}`);
    }
  }
  for (const answer of requirements.blankMustNotContain ?? []) {
    const normalizedAnswer = normalizeText(answer);
    if (!teacherEditionContainsEvidence(sourceAndAnswerEvidence, normalizedAnswer)) {
      failures.push(`${label}: Blank prohibition is not backed by Teacher Edition answer evidence: ${answer}`);
    } else if (containsEvidence(blankText, normalizedAnswer)) {
      failures.push(`${label}: Blank implementation leaks Teacher Edition answer evidence: ${answer}`);
    }
  }

  const expectedLayout = requirements.layout;
  if (expectedLayout.family === 'source-first-teacher-edition-crop') {
    failures.push(`${label}: screenshot-crop layouts are invalid acceptance evidence; record the source-observed problem structure`);
    return;
  }
  const blankLayout = canonicalLayout(implementation.blankVisual, implementation, 'blank');
  const solvedLayout = canonicalLayout(implementation.solvedVisual, implementation, 'solved');
  if (!layoutContainsExpected(blankLayout, expectedLayout)) {
    failures.push(`${label}: Blank canonical layout differs from Teacher Edition page evidence; expected ${format(expectedLayout)}, found ${format(blankLayout)}`);
  }
  if (!layoutContainsExpected(solvedLayout, expectedLayout)) {
    failures.push(`${label}: Solved canonical layout no longer preserves the Teacher Edition page structure; expected ${format(expectedLayout)}, found ${format(solvedLayout)}`);
  }
}

function answerSemanticallySupported(implementationAnswer, answerEvidence, sourceText) {
  if (implementationAnswer === answerEvidence) return true;
  const implementationTokens = significantAnswerClaims(implementationAnswer);
  const evidenceTokens = tokenCounts(`${sourceText} ${answerEvidence}`);
  return implementationTokens.every((token) => (evidenceTokens.get(token) ?? 0) > 0);
}

function containsEvidence(haystack, needle) {
  const haystackTokens = normalizeText(haystack).split(' ').filter(Boolean);
  const needleTokens = normalizeText(needle).split(' ').filter(Boolean);
  if (!needleTokens.length) return true;
  return haystackTokens.some((_, start) =>
    needleTokens.every((token, offset) => haystackTokens[start + offset] === token)
  );
}

function significantAnswerClaims(value) {
  return [...new Set(normalizeText(value).split(' ').filter((token) =>
    /^(?:yes|no)$/.test(token) ||
    /\d/.test(token) ||
    /^[×÷+\-=$<>]+$/.test(token)
  ))];
}

function layoutContainsExpected(actual, expected) {
  return Object.entries(expected).every(([key, value]) =>
    JSON.stringify(actual?.[key]) === JSON.stringify(value)
  );
}

function teacherEditionContainsEvidence(teacherEditionText, evidence) {
  if (teacherEditionText.includes(evidence)) return true;
  const sourceCounts = tokenCounts(teacherEditionText);
  const evidenceCounts = tokenCounts(evidence);
  return [...evidenceCounts.entries()].every(
    ([token, count]) => (sourceCounts.get(token) ?? 0) >= count
  );
}

function tokenCounts(value) {
  const counts = new Map();
  for (const token of normalizeText(value).split(' ').filter(Boolean)) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }
  return counts;
}

function validateTeacherEditionCrops(label, controllingImage, layout, evidencePaths) {
  if (!layout.sourceFirst || !Array.isArray(layout.sourceCrops) || !layout.sourceCrops.length) {
    failures.push(`${label}: source-first Teacher Edition crop requirements are incomplete`);
    return;
  }
  if (layout.sourceCropCount !== layout.sourceCrops.length) {
    failures.push(`${label}: declared source-crop count differs from the reviewed crop list`);
  }
  if (layout.sourceCrops[0]?.src !== controllingImage) {
    failures.push(`${label}: first crop does not use the problem's controlling Teacher Edition image`);
  }
  for (const [cropIndex, sourceCrop] of layout.sourceCrops.entries()) {
    const evidence = evidencePaths.get(sourceCrop?.src);
    if (
      evidence?.documentSection !== 'problem-set' &&
      evidence?.documentSection !== 'lesson-resource'
    ) {
      failures.push(`${label}: crop ${cropIndex + 1} does not use fingerprinted Problem Set evidence`);
      continue;
    }
    const crop = sourceCrop?.crop;
    const values = crop && [crop.x, crop.y, crop.width, crop.height];
    if (!values || values.some((value) => !Number.isInteger(value))) {
      failures.push(`${label}: crop ${cropIndex + 1} requires integer x, y, width, and height`);
      continue;
    }
    if (
      crop.x < 0 ||
      crop.y < 0 ||
      crop.width <= 0 ||
      crop.height <= 0 ||
      crop.x + crop.width > evidence.width ||
      crop.y + crop.height > evidence.height
    ) {
      failures.push(
        `${label}: crop ${cropIndex + 1} exceeds the ${evidence.width}×${evidence.height} Teacher Edition image`
      );
    }
  }
}

function implementationEvidenceText(problem, mode) {
  const visual = mode === 'solved' ? problem.solvedVisual : problem.blankVisual;
  const renderedSemantics = [];
  for (const section of visual?.sections ?? []) {
    if (section.kind === 'unknown-riddle-workspace') {
      renderedSemantics.push(section.prompt, section.decoder?.question);
      for (const entry of section.entries ?? []) {
        renderedSemantics.push(entry.equation);
        if (entry.answer) renderedSemantics.push(`${entry.letter} = ${entry.answer}`);
      }
      renderedSemantics.push(...(section.decoder?.values ?? []));
      renderedSemantics.push(...(section.decoder?.letters ?? []));
      if (section.decoder?.answerPhrase) renderedSemantics.push(section.decoder.answerPhrase);
    }
    if (section.kind === 'source-response-workspace') {
      for (const part of section.parts ?? []) {
        renderedSemantics.push(part.lead, part.prompt, ...(part.lines ?? []));
        if (part.challenge) renderedSemantics.push('CHALLENGE!');
      }
    }
  }
  // Problem-card titles contain the ordinal ("Problem 4") and are navigation
  // chrome, not mathematical evidence. Only source text and rendered sections
  // participate in answer-leak and answer-presence checks.
  return `${problem.sourcePrompt} ${JSON.stringify(visual?.sections ?? [])} ${renderedSemantics.filter(Boolean).join(' ')}`;
}

function rejectImplementationAuthoredExpectations(label, value, path = '$') {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    const childPath = `${path}.${key}`;
    if (prohibitedAcceptanceFields.has(key)) {
      failures.push(`${label}: implementation-authored acceptance field is prohibited at ${childPath}`);
    }
    rejectImplementationAuthoredExpectations(label, child, childPath);
  }
}

function rejectUnknownFields(label, value, allowedFields) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    failures.push(`${label}: expected an object`);
    return;
  }
  for (const key of Object.keys(value)) {
    if (!allowedFields.has(key)) {
      failures.push(`${label}: unsupported acceptance field "${key}"`);
    }
  }
}

function canonicalLayout(visual, problem, mode) {
  const sections = visual?.sections ?? [];
  const sourcePrompt = normalizeText(problem?.sourcePrompt);
  const reviewedM5FirstBatchLayout = canonicalM5LessonsOneThroughFiveLayout(sections, sourcePrompt, mode);
  if (reviewedM5FirstBatchLayout) return reviewedM5FirstBatchLayout;
  const reviewedM5SecondBatchLayout = canonicalM5LessonsSixThroughTenLayout(sections, sourcePrompt, mode);
  if (reviewedM5SecondBatchLayout) return reviewedM5SecondBatchLayout;
  const reviewedM5ThirdBatchLayout = canonicalM5LessonsElevenThroughFifteenLayout(sections, sourcePrompt, mode);
  if (reviewedM5ThirdBatchLayout) return reviewedM5ThirdBatchLayout;
  const reviewedM5FourthBatchLayout = canonicalM5LessonsSixteenThroughTwentyLayout(sections, sourcePrompt, mode);
  if (reviewedM5FourthBatchLayout) return reviewedM5FourthBatchLayout;
  const reviewedM5FifthBatchLayout = canonicalM5LessonsTwentyOneThroughTwentyFiveLayout(sections, sourcePrompt, mode);
  if (reviewedM5FifthBatchLayout) return reviewedM5FifthBatchLayout;
  const reviewedM5SixthBatchLayout = canonicalM5LessonsTwentySixThroughThirtyLayout(sections, sourcePrompt, mode);
  if (reviewedM5SixthBatchLayout) return reviewedM5SixthBatchLayout;
  const reviewedM6FirstBatchLayout = canonicalM6LessonsOneThroughFiveLayout(sections, sourcePrompt, mode);
  if (reviewedM6FirstBatchLayout) return reviewedM6FirstBatchLayout;
  const reviewedM6SecondBatchLayout = canonicalM6LessonsSixThroughNineLayout(sections, sourcePrompt, mode);
  if (reviewedM6SecondBatchLayout) return reviewedM6SecondBatchLayout;
  const reviewedM7FirstBatchLayout = canonicalM7LessonsOneThroughFiveLayout(sections, sourcePrompt, mode);
  if (reviewedM7FirstBatchLayout) return reviewedM7FirstBatchLayout;
  const reviewedM7SecondBatchLayout = canonicalM7LessonsSixThroughTenLayout(sections, sourcePrompt, mode);
  if (reviewedM7SecondBatchLayout) return reviewedM7SecondBatchLayout;
  const reviewedM7ThirdBatchLayout = canonicalM7LessonsElevenThroughFifteenLayout(sections, sourcePrompt, mode);
  if (reviewedM7ThirdBatchLayout) return reviewedM7ThirdBatchLayout;
  const reviewedM7FourthBatchLayout = canonicalM7LessonsSixteenThroughTwentyLayout(sections, sourcePrompt, mode);
  if (reviewedM7FourthBatchLayout) return reviewedM7FourthBatchLayout;
  const reviewedM7FifthBatchLayout = canonicalM7LessonsTwentyOneThroughTwentyFiveLayout(sections, sourcePrompt, mode);
  if (reviewedM7FifthBatchLayout) return reviewedM7FifthBatchLayout;
  const reviewedM7SixthBatchLayout = canonicalM7LessonsTwentySixThroughThirtyLayout(sections, sourcePrompt, mode);
  if (reviewedM7SixthBatchLayout) return reviewedM7SixthBatchLayout;
  const reviewedM7SeventhBatchLayout = canonicalM7LessonsThirtyOneThroughThirtyFourLayout(sections, sourcePrompt, mode);
  if (reviewedM7SeventhBatchLayout) return reviewedM7SeventhBatchLayout;
  const reviewedM4ThirdBatchLayout = canonicalM4LessonsElevenThroughFifteenLayout(sections, sourcePrompt, mode);
  if (reviewedM4ThirdBatchLayout) return reviewedM4ThirdBatchLayout;
  const reviewedM4SecondBatchLayout = canonicalM4LessonsSixThroughTenLayout(sections, sourcePrompt, mode);
  if (reviewedM4SecondBatchLayout) return reviewedM4SecondBatchLayout;
  const reviewedM4Layout = canonicalM4LessonsOneThroughFiveLayout(sections, sourcePrompt, mode);
  if (reviewedM4Layout) return reviewedM4Layout;
  const reviewedBatchLayout = canonicalM3LessonsSixThroughTenLayout(sections, sourcePrompt, mode);
  if (reviewedBatchLayout) return reviewedBatchLayout;
  const reviewedSecondBatchLayout = canonicalM3LessonsElevenThroughFifteenLayout(sections, sourcePrompt, mode);
  if (reviewedSecondBatchLayout) return reviewedSecondBatchLayout;
  const reviewedThirdBatchLayout = canonicalM3LessonsSixteenThroughTwentyLayout(sections, sourcePrompt, mode);
  if (reviewedThirdBatchLayout) return reviewedThirdBatchLayout;
  const semanticLayout = canonicalM3LessonTwoLayout(sections, sourcePrompt, mode);
  if (semanticLayout) return semanticLayout;

  if (sections[0]?.kind === 'source-first-workspace') {
    return {
      family: 'source-first-teacher-edition-crop',
      sourceFirst: true,
      sourceCropCount: sections[0].pages?.length ?? 0,
      sourceCrops: (sections[0].pages ?? []).map((page) => ({
        src: page.src,
        crop: page.crop
      }))
    };
  }
  const section = sections.length === 1 ? sections[0] : undefined;
  if (section?.kind === 'unknown-riddle-workspace') {
    return {
      family: 'paired-equation-answer-bubbles',
      subpartCount: 1,
      thoughtBubbleCount: section.entries?.length ?? 0,
      speechAnswerCount: section.entries?.length ?? 0,
      columnCount: new Set((section.entries ?? []).map((entry) => entry.side)).size,
      rowCount: Math.max(0, ...(section.entries ?? []).map((entry) => entry.row ?? 0)),
      printedEquationLineCount: section.entries?.length ?? 0,
      openWorkspaceCount: 0,
      dividerCount: 0,
      challengeBadgeCount: 0,
      decoderSlotCount: section.decoder?.values?.length ?? 0,
      decoderValues: section.decoder?.values ?? []
    };
  }
  if (section?.kind === 'source-response-workspace') {
    return {
      family: 'open-written-response',
      subpartCount: section.parts?.length ?? 0,
      thoughtBubbleCount: 0,
      speechAnswerCount: 0,
      columnCount: 1,
      rowCount: section.parts?.length ?? 0,
      printedEquationLineCount: (section.parts ?? []).reduce((sum, part) => sum + (part.printedLineCount ?? 0), 0),
      openWorkspaceCount: (section.parts ?? []).filter((part) => part.openWorkspace).length,
      dividerCount: (section.parts ?? []).filter((part) => part.dividerBefore).length,
      challengeBadgeCount: (section.parts ?? []).filter((part) => part.challenge).length,
      decoderSlotCount: 0,
      decoderValues: []
    };
  }
  if (section?.kind === 'solution-parts') {
    return {
      family: 'equation-solution-grid',
      subpartCount: section.parts?.length ?? 0,
      printedEquationLineCount: (section.parts ?? []).filter((part) => part.equation).length,
      openWorkspaceCount: 0,
      responseStructure: 'equation-and-answer-parts'
    };
  }
  const genericLayout = canonicalGenericLayout(
    mode === 'solved' ? problem?.blankVisual?.sections ?? sections : sections
  );
  if (genericLayout) return genericLayout;
  if (sections.length !== 1) {
    return {
      family: 'unsupported-or-composite',
      surfaceCount: sections.length,
      sectionKinds: sections.map((section) => section.kind)
    };
  }
  return {
    family: 'unsupported-or-composite',
    surfaceCount: 1,
    sectionKinds: [section.kind]
  };
}

function canonicalM5LessonsOneThroughFiveLayout(sections, sourcePrompt, mode) {
  const isBlank = mode === 'blank';
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const crops = all.filter((section) => section?.kind === 'source-crop');
  const strips = all.filter((section) => section?.kind === 'fraction-strip');
  const stripCounts = strips.map((strip) => strip.denominator);
  const response = all.find((section) => section?.kind === 'source-response-workspace');
  const equations = all.filter((section) => section?.kind === 'equations');
  const equationLineCount = equations.reduce((sum, section) => sum + (section.lines ?? []).length, 0);
  const tables = all.filter((section) => section?.kind === 'data-table');
  const tapes = all.filter((section) => section?.kind === 'tape');
  const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  const hasResponse = (printedLineCount) =>
    response &&
    (response.parts ?? []).length === 1 &&
    (response.parts[0]?.printedLineCount ?? 0) === printedLineCount &&
    (!isBlank || response.parts[0]?.openWorkspace);
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });

  if (sourcePrompt.startsWith('a beaker is considered full')) {
    if (crops.length !== 3 || !hasResponse(1)) return undefined;
    return reviewed(
      'three-fill-line-beaker-estimates',
      3,
      'three-tight-official-beaker-illustrations',
      [2, 4, 3],
      'three-horizontal-beakers-over-written-response',
      'retain-completed-half-and-estimate-fourth-and-third',
      { sourceFirst: true, sourceCropCount: 3, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('juanita cut her string cheese')) {
    if (crops.length !== 1 || equationLineCount !== 3) return undefined;
    return reviewed(
      'three-shaded-string-cheese-units',
      3,
      'tight-official-three-strip-illustration',
      [3, 6, 4],
      'three-vertical-shaded-strips-next-to-three-fraction-responses',
      'name-one-shaded-unit-in-each-whole',
      { sourceFirst: true, sourceCropCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('a in the space below draw a small rectangle')) {
    if (!same(stripCounts, [2, 3, 4]) || !hasResponse(3)) return undefined;
    return reviewed(
      'three-open-equal-part-rectangle-constructions',
      3,
      'authored-equal-part-rectangle-workspaces',
      [2, 3, 4],
      'three-horizontal-rectangles-over-three-part-response',
      'draw-partition-lines-and-name-halves-thirds-fourths',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('each rectangle represents 1 sheet of paper')) {
    if (!same(stripCounts, [7, 9]) || !hasResponse(2)) return undefined;
    return reviewed(
      'two-open-paper-partition-constructions',
      2,
      'authored-equal-part-paper-rectangles',
      [7, 9, 20, 19],
      'two-horizontal-paper-wholes-over-two-part-response',
      'construct-sevenths-and-ninths-then-generalize-cut-lines',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('rochelle has a strip of wood 12 inches long')) {
    if (tables.length !== 1 || tables[0]?.columns?.length !== 3 || tables[0]?.rows?.length !== 1 || tapes.length !== 1) return undefined;
    return reviewed(
      'twelve-inch-strip-cut-into-two-six-inch-pieces',
      1,
      'authored-measured-tape-and-three-column-source-table',
      [12, 6, 6, 2],
      'source-table-over-horizontal-measured-strip',
      'identify-one-six-inch-piece-as-one-half'
    );
  }

  if (sourcePrompt.startsWith('circle the strips that are folded to make equal parts')) {
    if (crops.length !== 1 || !hasResponse(1)) return undefined;
    return reviewed(
      'four-folded-strip-equality-choices',
      4,
      'tight-official-four-zigzag-strip-choices',
      [4],
      'four-horizontal-source-choices-over-response',
      'circle-first-and-fourth-equal-part-strips',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('a there are equal parts in all')) {
    if (!same(stripCounts, [4, 6, 7, 7]) || equationLineCount !== 4) return undefined;
    return reviewed(
      'four-count-equal-parts-and-shaded-parts-strips',
      4,
      'authored-fraction-strips',
      [4, 2, 6, 5, 7, 3, 7, 0],
      'four-horizontal-strip-cards-over-four-count-statements',
      'count-total-equal-parts-and-shaded-parts'
    );
  }
  if (sourcePrompt.startsWith('noah pedro and sharon share a whole candy bar')) {
    if (!same(stripCounts, [3]) || !hasResponse(1)) return undefined;
    return reviewed(
      'one-candy-bar-shared-by-three-children',
      1,
      'authored-thirds-fraction-strip',
      [3, 1],
      'horizontal-strip-over-written-response',
      'draw-thirds-and-label-sharons-one-third',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('to make a garage for his toy truck')) {
    if (!same(stripCounts, [4, 6]) || !hasResponse(2)) return undefined;
    return reviewed(
      'repeated-folding-fourths-and-sixths',
      2,
      'two-authored-fold-matching-fraction-strips',
      [4, 6],
      'two-horizontal-strip-cards-over-two-part-response',
      'match-half-then-half-to-fourths-and-thirds-then-half-to-sixths',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('each shape is a whole divided into equal parts')) {
    if (crops.length !== 1 || !hasResponse(4)) return undefined;
    return reviewed(
      'four-varied-shaded-wholes-name-and-count-units',
      4,
      'tight-official-four-shaded-shape-illustration',
      [4, 2, 8, 5, 3, 3, 2, 1],
      'four-horizontal-varied-wholes-over-four-responses',
      'name-unit-and-count-shaded-units',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('circle the shapes that are divided into equal parts')) {
    if (crops.length !== 1 || !hasResponse(1)) return undefined;
    return reviewed(
      'five-equal-and-unequal-part-shape-choices',
      5,
      'tight-official-five-shape-choice-illustration',
      [5],
      'five-horizontal-source-shapes-over-written-response',
      'circle-first-third-fifth-and-define-equal-parts',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('each shape is 1 whole estimate to divide each into 4 equal parts')) {
    if (crops.length !== 1 || !hasResponse(1)) return undefined;
    return reviewed(
      'rectangle-line-segment-circle-partitioned-into-fourths',
      3,
      'tight-official-three-open-whole-illustration',
      [4, 4, 4],
      'rectangle-line-circle-horizontal-over-unit-response',
      'partition-each-whole-into-four-equal-parts-and-name-fourths',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('each shape is 1 whole divide and shade')) {
    if (crops.length !== 1 || !hasResponse(1)) return undefined;
    return reviewed(
      'three-varied-wholes-show-one-half-one-sixth-one-third',
      3,
      'tight-official-trapezoid-line-circle-illustration',
      [2, 6, 3],
      'three-horizontal-source-wholes-over-response',
      'partition-and-shade-requested-unit-fractions',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('each shape is 1 whole estimate to divide each into equal parts')) {
    if (crops.length !== 1 || !hasResponse(1)) return undefined;
    return reviewed(
      'three-open-wholes-use-different-non-fourths-units',
      3,
      'tight-official-rectangle-line-circle-illustration',
      [3],
      'three-horizontal-open-source-wholes-over-response',
      'choose-distinct-equal-part-units-excluding-fourths',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('charlotte wants to equally share a candy bar with 4 friends')) {
    if (!same(stripCounts, [5]) || !hasResponse(1)) return undefined;
    return reviewed(
      'one-candy-bar-shared-by-five-people',
      1,
      'authored-fifths-fraction-strip',
      [5, 1],
      'horizontal-strip-over-written-response',
      'draw-five-equal-parts-and-name-one-fifth',
      { openWorkspaceCount: 1 }
    );
  }

  if (
    sourcePrompt.startsWith('draw a picture of the') ||
    sourcePrompt.startsWith('extension draw a picture of the yarn')
  ) {
    if (!hasResponse(1) || crops.length || strips.length) return undefined;
    return reviewed(
      'open-station-fraction-drawings',
      4,
      'unseeded-open-drawing-workspace',
      [],
      'single-large-open-response',
      'answers-vary-draw-three-or-four-equal-part-models-without-invented-solution',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('fill in the chart each image is one whole')) {
    if (crops.length !== 1 || (isBlank ? equationLineCount !== 8 : equationLineCount !== 0)) return undefined;
    return reviewed(
      'six-row-varied-whole-unit-fraction-chart',
      6,
      'tight-official-six-row-chart-and-shape-illustration',
      [2, 3, 4, 5, 6, 8],
      'vertical-six-row-source-chart-next-to-fraction-responses',
      'count-equal-parts-count-one-shaded-part-and-name-unit-form-and-fraction-form',
      { sourceFirst: true, sourceCropCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('andre s mom baked his 2 favorite cakes')) {
    if (crops.length !== 1 || !hasResponse(1)) return undefined;
    return reviewed(
      'unequal-eight-piece-cake-judgment',
      1,
      'tight-official-unequal-eight-piece-cake-illustration',
      [8],
      'source-cake-over-written-explanation',
      'reject-eighths-because-eight-pieces-are-not-equal',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('two of andre s friends came late')) {
    if (!same(stripCounts, [10]) || !hasResponse(1)) return undefined;
    return reviewed(
      'second-cake-shared-equally-by-ten-people',
      1,
      'authored-tenths-same-whole-strip',
      [10, 1],
      'horizontal-whole-over-written-response',
      'draw-ten-equal-parts-and-name-one-tenth',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('andre thinks it s strange')) {
    if (!same(stripCounts, [10, 8]) || !hasResponse(1)) return undefined;
    return reviewed(
      'same-whole-one-tenth-and-one-eighth-comparison',
      2,
      'two-authored-same-width-fraction-strips',
      [10, 8],
      'two-horizontal-same-whole-cards-over-explanation',
      'show-one-eighth-greater-than-one-tenth-because-eighths-are-larger-units',
      { openWorkspaceCount: 1 }
    );
  }

  return undefined;
}

function canonicalM5LessonsSixThroughTenLayout(sections, sourcePrompt, mode) {
  const isBlank = mode === 'blank';
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const crops = all.filter((section) => section?.kind === 'source-crop');
  const cropSignatures = crops.map((crop) => ({ src: crop.src, crop: crop.crop }));
  const strips = all.filter((section) => section?.kind === 'fraction-strip');
  const stripCounts = strips.map((strip) => strip.denominator);
  const tapes = all.filter((section) => section?.kind === 'tape');
  const bonds = all.filter((section) => section?.kind === 'number-bond');
  const tables = all.filter((section) => section?.kind === 'data-table');
  const equations = all.filter((section) => section?.kind === 'equations');
  const equationLineCount = equations.reduce(
    (sum, section) => sum + (section.lines ?? []).length,
    0
  );
  const responses = all.filter((section) => section?.kind === 'source-response-workspace');
  const responseLineCount = responses.reduce(
    (sum, response) => sum + (response.parts ?? []).reduce(
      (partSum, part) => partSum + (part.printedLineCount ?? 0),
      0
    ),
    0
  );
  const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  const hasModeModels = (denominators, blankTapeCount = denominators.length) =>
    isBlank
      ? tapes.length === blankTapeCount && strips.length === 0
      : tapes.length === 0 && same(stripCounts, denominators);
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });

  if (sourcePrompt.startsWith('complete the number sentence estimate to partition each strip equally')) {
    if (!hasModeModels([4, 7, 5, 6]) || equationLineCount !== 4) return undefined;
    return reviewed(
      'four-open-to-completed-non-unit-fraction-strips',
      4,
      'four-authored-equal-length-open-or-partitioned-strips',
      [4, 7, 5, 6],
      'four-horizontal-strips-over-four-number-sentences',
      'partition-label-unit-fractions-shade-and-write-each-fraction'
    );
  }
  if (sourcePrompt.startsWith('mr stevens bought 8 liters of soda')) {
    if (!hasModeModels([8, 8], 2) || responses.length !== 1 || responseLineCount !== 2) return undefined;
    return reviewed(
      'one-eighth-drank-and-seven-eighths-left',
      2,
      'two-authored-views-of-the-same-eight-liter-whole',
      [8, 1, 7],
      'two-horizontal-same-whole-models-over-two-part-response',
      'name-one-eighth-drank-and-seven-eighths-left',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt === 'fill in the chart') {
    if (crops.length !== 1 || tables.length !== 1 || (tables[0].rows ?? []).length !== 5) return undefined;
    return reviewed(
      'five-varied-shaded-figure-fraction-chart',
      5,
      'tight-official-five-figure-column-and-authored-chart',
      [9, 7, 5, 6, 8],
      'vertical-source-figure-column-beside-five-row-chart',
      'count-equal-parts-count-shaded-parts-name-unit-and-fraction',
      { sourceFirst: true, sourceCropCount: 1, sourceCrops: cropSignatures }
    );
  }
  if (sourcePrompt.startsWith('whisper the fraction of the shape that is shaded')) {
    if (crops.length !== 1 || equationLineCount !== 2) return undefined;
    return reviewed(
      'one-shaded-unit-matched-to-unshaded-fraction',
      2,
      'one-tight-official-shaded-source-shape',
      [1],
      'source-shape-over-two-fraction-responses',
      'name-shaded-unit-fraction-and-match-unshaded-part',
      { sourceFirst: true, sourceCropCount: 1, sourceCrops: cropSignatures }
    );
  }
  if (sourcePrompt.includes('how many eighths are in 1 whole')) {
    if (equationLineCount !== 3 || crops.length || strips.length || tapes.length) return undefined;
    return reviewed(
      'three-unit-counts-that-make-one-whole',
      3,
      'three-authored-number-sentence-responses',
      [8, 9, 12],
      'three-stacked-written-responses',
      'state-how-many-eighths-ninths-and-twelfths-make-one'
    );
  }
  if (sourcePrompt.startsWith('each strip represents 1 whole')) {
    if (crops.length !== 1 || equationLineCount !== 3) return undefined;
    return reviewed(
      'three-shaded-and-unshaded-strip-pairs',
      3,
      'tight-official-fifths-sevenths-elevenths-strip-illustration',
      [5, 7, 11],
      'three-vertical-source-strips-beside-three-paired-responses',
      'label-both-shaded-and-unshaded-fractions',
      { sourceFirst: true, sourceCropCount: 1, sourceCrops: cropSignatures }
    );
  }
  if (sourcePrompt.startsWith('avanti read 1 sixth of her book')) {
    if (!hasModeModels([6, 6], 2) || responses.length !== 1 || responseLineCount !== 1) return undefined;
    return reviewed(
      'one-sixth-read-and-five-sixths-unread',
      2,
      'two-authored-views-of-the-same-book-whole',
      [6, 1, 5],
      'two-horizontal-book-whole-models-over-written-response',
      'name-five-sixths-not-read',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('show a number bond representing what is shaded and unshaded')) {
    if (crops.length !== 1 || bonds.length !== 1 || responses.length !== 1 || responseLineCount !== 1) return undefined;
    return reviewed(
      'source-shape-shaded-unshaded-number-bond',
      2,
      'tight-official-source-shape-and-authored-two-part-number-bond',
      [2],
      'source-shape-over-number-bond-over-open-model-response',
      'bond-shaded-and-unshaded-parts-then-draw-a-different-model',
      {
        sourceFirst: true,
        sourceCropCount: 1,
        sourceCrops: cropSignatures,
        openWorkspaceCount: 1
      }
    );
  }
  if (sourcePrompt.startsWith('draw a number bond with 2 parts showing the shaded and unshaded fractions')) {
    if (crops.length !== 4 || bonds.length !== 4 || equationLineCount !== 4) return undefined;
    return reviewed(
      'four-source-shapes-with-shaded-unshaded-number-bonds',
      4,
      'four-tight-official-source-shapes-and-four-authored-number-bonds',
      [4, 3, 4, 5],
      'four-source-shape-cards-over-four-number-bonds-and-decompositions',
      'bond-and-decompose-both-parts-into-unit-fractions',
      { sourceFirst: true, sourceCropCount: 4, sourceCrops: cropSignatures }
    );
  }
  if (sourcePrompt.startsWith('the chef put 1 4 of the ground beef on the grill')) {
    if (!hasModeModels([4], 1) || bonds.length !== 1 || responses.length !== 1 || responseLineCount !== 3) return undefined;
    return reviewed(
      'ground-beef-whole-number-bond-and-three-part-response',
      3,
      'authored-two-part-number-bond-and-open-to-completed-fourths-model',
      [4, 1, 3],
      'number-bond-over-horizontal-whole-model-over-three-responses',
      'show-one-fourth-on-grill-three-fourths-refrigerated-and-decompose',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('each figure represents 1 whole fill in the chart')) {
    if (crops.length !== 1 || tables.length !== 1 || (tables[0].rows ?? []).length !== 6) return undefined;
    return reviewed(
      'six-row-greater-than-one-source-figure-chart',
      6,
      'tight-official-six-figure-column-and-authored-chart',
      [2, 8, 6, 5, 4, 3],
      'vertical-source-figure-column-beside-six-row-chart',
      'name-unit-fraction-count-shaded-units-and-write-fraction',
      { sourceFirst: true, sourceCropCount: 1, sourceCrops: cropSignatures }
    );
  }
  if (sourcePrompt.startsWith('estimate to draw and shade units on the fraction strips')) {
    if (!hasModeModels([6, 4, 5, 2], 4) || equationLineCount !== 4) return undefined;
    return reviewed(
      'four-open-to-completed-fractions-greater-than-one',
      4,
      'four-authored-multi-whole-open-or-partitioned-strips',
      [6, 4, 5, 2],
      'four-horizontal-multi-whole-strips-over-four-number-sentences',
      'partition-multiple-wholes-shade-units-and-write-each-fraction'
    );
  }
  if (sourcePrompt.startsWith('mrs jawlik baked 2 pans of brownies')) {
    if (!hasModeModels([8, 8], 2) || bonds.length !== 1 || responses.length !== 1 || responseLineCount !== 2) return undefined;
    return reviewed(
      'two-brownie-pans-ten-eighths-and-number-bond',
      2,
      'two-authored-open-or-partitioned-pans-and-two-part-number-bond',
      [8, 8, 10],
      'two-horizontal-pans-over-number-bond-over-two-part-response',
      'partition-two-pans-shade-ten-pieces-and-write-ten-eighths',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('each fraction strip is 1 whole')) {
    if (!same(stripCounts, [2, 4, 8, 3, 6]) || tapes.length) return undefined;
    return reviewed(
      'five-equal-length-prepartitioned-unit-fraction-strips',
      5,
      'five-authored-equal-length-prepartitioned-strips',
      [2, 4, 8, 3, 6],
      'five-horizontal-equal-length-strips',
      'color-one-unit-in-each-strip'
    );
  }
  if (sourcePrompt.startsWith('circle less than or greater than')) {
    if (equationLineCount !== 8 || crops.length || strips.length || tapes.length) return undefined;
    return reviewed(
      'eight-less-than-or-greater-than-sentences',
      8,
      'eight-authored-comparison-sentences',
      [8],
      'eight-written-comparisons-in-reading-order',
      'circle-less-than-or-greater-than-and-read-each-sentence'
    );
  }
  if (sourcePrompt.includes('will lily use more oil or more water')) {
    if (!hasModeModels([3, 4], 2) || responses.length !== 1 || responseLineCount !== 1) return undefined;
    return reviewed(
      'same-cup-one-third-oil-one-fourth-water-comparison',
      2,
      'two-authored-same-size-open-or-partitioned-cup-models',
      [3, 4],
      'two-horizontal-same-whole-models-over-written-explanation',
      'compare-one-third-and-one-fourth-and-explain',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('use or to compare')) {
    if (equationLineCount !== 7 || crops.length || strips.length || tapes.length) return undefined;
    return reviewed(
      'six-symbol-comparisons-and-one-order-chain',
      7,
      'seven-authored-comparison-responses',
      [6, 1],
      'six-comparisons-followed-by-one-extension-chain',
      'write-comparison-symbols-and-complete-the-order-chain'
    );
  }
  if (sourcePrompt.startsWith('your friend eric says that 1 6 is greater than 1 5')) {
    if (!hasModeModels([6, 5], 2) || responses.length !== 1 || responseLineCount !== 1) return undefined;
    return reviewed(
      'same-whole-one-sixth-and-one-fifth-counterexample',
      2,
      'two-authored-same-size-open-or-partitioned-whole-models',
      [6, 5],
      'two-horizontal-same-whole-models-over-written-explanation',
      'reject-claim-and-explain-denominator-size-effect',
      { openWorkspaceCount: 1 }
    );
  }

  return undefined;
}

function canonicalM5LessonsElevenThroughFifteenLayout(sections, sourcePrompt, mode) {
  const isBlank = mode === 'blank';
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const crops = all.filter((section) => section?.kind === 'source-crop');
  const cropSignatures = crops.map((crop) => ({ src: crop.src, crop: crop.crop }));
  const equations = all.filter((section) => section?.kind === 'equations');
  const equationLineCount = equations.reduce((sum, section) => sum + (section.lines ?? []).length, 0);
  const responses = all.filter((section) => section?.kind === 'source-response-workspace');
  const responseLineCount = responses.reduce(
    (sum, response) => sum + (response.parts ?? []).reduce(
      (partSum, part) => partSum + (part.printedLineCount ?? 0),
      0
    ),
    0
  );
  const bonds = all.filter((section) => section?.kind === 'number-bond');
  const tapes = all.filter((section) => section?.kind === 'tape');
  const numberLines = all.filter((section) => section?.kind === 'number-line');
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const cropEvidence = {
    sourceFirst: true,
    sourceCropCount: crops.length,
    sourceCrops: cropSignatures
  };

  if (sourcePrompt.startsWith('label the unit fraction in each blank draw and label the same whole')) {
    if (crops.length !== 1 || equationLineCount !== 2 || responses.length !== 1 || responseLineCount !== 10) return undefined;
    return reviewed(
      'same-whole-unit-fraction-comparison-with-varying-valid-answer',
      2,
      'one-tight-official-given-model-plus-authored-comparison-and-drawing-workspace',
      [1, 1],
      'given-source-model-over-comparison-over-same-whole-drawing-space',
      'label-given-unit-choose-valid-unit-fraction-and-copy-the-same-whole',
      { ...cropEvidence, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('fill in the blank with a fraction to make the statement true')) {
    if (crops.length !== 2 || equationLineCount !== 2 || responses.length !== 1 || responseLineCount !== 10) return undefined;
    return reviewed(
      'two-unit-fraction-comparisons-with-matching-drawings',
      2,
      'two-tight-official-given-models-plus-authored-comparisons-and-drawing-space',
      [2, 2],
      'two-source-models-over-two-comparisons-over-drawing-space',
      'choose-valid-comparison-fractions-and-draw-matching-models',
      { ...cropEvidence, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('robert ate 1 2 of a small pizza')) {
    if (crops.length !== 1 || responses.length !== 1 || responseLineCount !== 10) return undefined;
    return reviewed(
      'different-sized-pizza-wholes-fraction-claim',
      1,
      'tight-official-small-and-large-pizza-models',
      [2, 4],
      'two-different-sized-circular-wholes-over-written-explanation',
      'reject-symbol-comparison-because-the-wholes-differ',
      { ...cropEvidence, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('manny and daniel each ate 1 2 of his candy')) {
    if (crops.length !== 1 || responses.length !== 1 || responseLineCount !== 10) return undefined;
    return reviewed(
      'one-half-of-two-different-sized-candy-wholes',
      1,
      'tight-official-different-length-candy-bar-models',
      [2, 2],
      'two-different-length-candy-wholes-over-written-explanation',
      'explain-why-one-half-lengths-differ-when-wholes-differ',
      { ...cropEvidence, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('for each of the following draw a picture of the designated unit fraction')) {
    if (responses.length !== 1 || responseLineCount !== 18 || crops.length || equations.length || bonds.length || tapes.length || numberLines.length) return undefined;
    return reviewed(
      'open-station-unit-copies-forming-multiple-wholes',
      1,
      'authored-open-station-drawing-workspace-with-source-validity-criteria',
      [2, 1],
      'large-open-drawing-space-for-at-least-two-wholes',
      'copy-designated-unit-label-units-and-wholes-and-draw-a-matching-number-bond',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('the shape represents 1 whole write a unit fraction to describe the shaded part')) {
    if (crops.length !== 1 || equationLineCount !== 2 || responses.length !== 1 || responseLineCount !== 5) return undefined;
    return reviewed(
      'same-unit-fraction-after-redesignating-the-shaded-part-as-whole',
      2,
      'tight-official-paired-designated-whole-figures-plus-authored-response',
      [2, 1],
      'paired-source-figures-over-two-part-fraction-response',
      'name-unit-fraction-then-partition-the-shaded-part-as-new-whole',
      { ...cropEvidence, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt === 'use the diagram below to complete the following statements') {
    if (crops.length !== 1 || equationLineCount !== 5) return undefined;
    return reviewed(
      'three-rope-lengths-with-changing-designated-whole',
      5,
      'tight-official-three-rope-diagram-plus-five-authored-statements',
      [3, 5],
      'three-horizontal-rope-models-over-five-written-statements',
      'identify-half-and-quarter-relations-under-two-meter-designations',
      cropEvidence
    );
  }
  if (sourcePrompt.startsWith('ms fan drew the figure below on the board')) {
    if (crops.length !== 1 || responses.length !== 1 || responseLineCount !== 10) return undefined;
    return reviewed(
      'one-shaded-amount-named-three-fourths-or-three-halves',
      1,
      'tight-official-shaded-rectangle-plus-authored-explanation-space',
      [4, 2],
      'source-shaded-rectangle-over-written-explanation',
      'explain-both-fractions-by-naming-each-designated-whole',
      { ...cropEvidence, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('draw a number bond for each fractional unit')) {
    const validModeStructure = isBlank
      ? crops.length === 4 && !bonds.length && !tapes.length && !numberLines.length
      : !crops.length && bonds.length === 4 && tapes.length === 4 && numberLines.length === 4;
    if (!validModeStructure) return undefined;
    return reviewed(
      'four-number-bond-strip-number-line-constructions',
      4,
      'four-open-official-subparts-to-four-authored-completed-constructions',
      [2, 3, 4, 5],
      'four-reading-order-cards-each-with-bond-strip-and-number-line',
      'partition-and-label-halves-thirds-fourths-and-fifths-from-zero-to-one'
    );
  }
  if (sourcePrompt.startsWith('trevor needs to let his puppy outside every quarter')) {
    const validModeStructure = isBlank
      ? responses.length === 1 && responseLineCount === 14 && !numberLines.length
      : responses.length === 1 && responseLineCount === 2 && numberLines.length === 1;
    if (!validModeStructure) return undefined;
    return reviewed(
      'quarter-hour-number-line-from-zero-to-one-hour',
      1,
      'authored-open-to-completed-fourths-number-line',
      [4],
      'one-horizontal-time-number-line-over-response',
      'label-zero-fourths-through-four-fourths-and-zero-through-one-hour',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('a ribbon is 1 meter long mrs lee wants to sew a bead every 1 5 meter')) {
    const validModeStructure = isBlank
      ? responses.length === 1 && responseLineCount === 14 && !numberLines.length
      : responses.length === 1 && responseLineCount === 2 && numberLines.length === 1;
    if (!validModeStructure) return undefined;
    return reviewed(
      'fifths-of-a-meter-bead-number-line',
      1,
      'authored-open-to-completed-fifths-measurement-number-line',
      [5],
      'one-horizontal-meter-number-line-over-response',
      'label-zero-fifths-through-five-fifths-and-all-bead-locations',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('estimate to label the given fractions on the number line')) {
    const validModeStructure = isBlank
      ? crops.length === 5 && !numberLines.length && !bonds.length
      : !crops.length && numberLines.length === 5 && bonds.length === 5;
    if (!validModeStructure) return undefined;
    return reviewed(
      'five-estimated-fraction-locations-with-matching-number-bonds',
      5,
      'five-open-official-subparts-to-five-authored-completed-number-lines-and-bonds',
      [3, 4, 5, 6, 10],
      'five-reading-order-number-line-and-bond-cards',
      'partition-label-target-fraction-and-complement-to-one'
    );
  }
  if (sourcePrompt.startsWith('draw a number line use a fraction strip to locate 0 and 1')) {
    const validModeStructure = isBlank
      ? responses.length === 1 && responseLineCount === 16 && !numberLines.length && !tapes.length
      : responses.length === 1 && responseLineCount === 2 && numberLines.length === 1 && tapes.length === 1;
    if (!validModeStructure) return undefined;
    return reviewed(
      'fraction-strip-measured-eighths-number-line',
      1,
      'authored-open-to-completed-eighths-strip-and-number-line',
      [8],
      'fraction-strip-over-horizontal-eighths-number-line',
      'fold-strip-transfer-eighths-and-count-zero-eighths-through-eight-eighths',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('for his boat james stretched out a rope with 5 equally spaced knots')) {
    if (crops.length !== 1 || equationLineCount !== 3 || responses.length !== 1 || responseLineCount !== 5) return undefined;
    return reviewed(
      'five-knots-form-four-intervals-and-six-knots-form-five',
      3,
      'tight-official-five-knot-rope-plus-three-authored-responses',
      [5, 4, 6, 5],
      'one-horizontal-source-rope-over-three-part-response',
      'label-zero-fourths-through-four-fourths-identify-two-fourths-and-one-fifth',
      { ...cropEvidence, openWorkspaceCount: 1 }
    );
  }

  return undefined;
}

function canonicalM5LessonsSixteenThroughTwentyLayout(sections, sourcePrompt, mode) {
  const isBlank = mode === 'blank';
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const lines = all.filter((section) => section?.kind === 'number-line');
  const crops = all.filter((section) => section?.kind === 'source-crop');
  const cropSignatures = crops.map((crop) => ({ src: crop.src, crop: crop.crop }));
  const equations = all.filter((section) => section?.kind === 'equations');
  const equationLineCount = equations.reduce((sum, section) => sum + (section.lines ?? []).length, 0);
  const responses = all.filter((section) => section?.kind === 'source-response-workspace');
  const responseLineCount = responses.reduce(
    (sum, response) => sum + (response.parts ?? []).reduce(
      (partSum, part) => partSum + (part.printedLineCount ?? 0),
      0
    ),
    0
  );
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const cropEvidence = {
    sourceFirst: true,
    sourceCropCount: crops.length,
    sourceCrops: cropSignatures
  };

  if (sourcePrompt.startsWith('estimate to equally partition and label the fractions')) {
    if (lines.length !== 5 || equationLineCount !== 5) return undefined;
    return reviewed(
      'five-ranged-whole-number-fraction-number-lines',
      5,
      'five-authored-source-topology-number-lines',
      [2, 3, 2, 4, 3],
      'five-horizontal-ranged-lines-in-reading-order',
      'partition-label-and-box-each-whole-as-an-equivalent-fraction'
    );
  }
  if (sourcePrompt.startsWith('partition each whole into fifths')) {
    if (lines.length !== 1 || equationLineCount !== 1) return undefined;
    return reviewed('extended-fifths-number-line', 1, 'authored-ranged-number-line', [10], 'horizontal-zero-to-two', 'partition-label-and-box-zero-five-five-five-and-ten-five');
  }
  if (sourcePrompt.startsWith('partition each whole into thirds')) {
    if (lines.length !== 1 || equationLineCount !== 1) return undefined;
    return reviewed('extended-thirds-number-line', 1, 'authored-ranged-number-line', [9], 'horizontal-one-to-four', 'partition-label-and-box-three-three-through-twelve-three');
  }
  if (sourcePrompt.startsWith('draw a number line with endpoints 0 and 3')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 18 && !lines.length
      : lines.length === 1 && equationLineCount === 1;
    if (!valid) return undefined;
    return reviewed('construct-fourths-from-zero-to-three', 1, 'open-workspace-to-authored-ranged-number-line', [12], 'horizontal-zero-to-three', 'draw-partition-label-and-box-whole-equivalent-fractions', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('locate and label')) {
    if (lines.length !== 1 || equationLineCount !== 1) return undefined;
    const labelMatch = sourcePrompt.match(/from (\d+) to (\d+)/);
    return reviewed(
      'locate-five-fractions-on-an-extended-number-line',
      5,
      'authored-ranged-number-line',
      [5],
      labelMatch ? `horizontal-${labelMatch[1]}-to-${labelMatch[2]}` : 'horizontal-ranged-line',
      'locate-and-label-five-given-fractions'
    );
  }
  if (sourcePrompt.startsWith('for a measurement project')) {
    if (lines.length !== 1 || equationLineCount !== 1 || responses.length !== 1) return undefined;
    return reviewed('two-inches-versus-seven-fourths', 2, 'authored-fourths-measurement-line', [8, 7], 'horizontal-zero-to-two-inches', 'locate-both-lengths-and-name-alex-as-longer', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('marcy ran 4 kilometers')) {
    if (lines.length !== 1 || equationLineCount !== 1 || responses.length !== 1) return undefined;
    return reviewed('four-point-run-in-fifths', 4, 'authored-fifths-measurement-line', [0, 7, 12, 20], 'horizontal-zero-to-four-kilometers', 'mark-start-two-stops-and-finish', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('place ') && sourcePrompt.includes('circle the fraction closest to 0')) {
    const providedExample = sourcePrompt.startsWith('place 1 4 and 3 4');
    if (lines.length !== 1 || equationLineCount !== (providedExample && isBlank ? 1 : 2)) return undefined;
    return reviewed('two-fractions-on-one-comparison-line', 2, 'authored-source-topology-number-line', [2], 'one-horizontal-number-line', 'place-circle-closest-to-zero-and-compare');
  }
  if (sourcePrompt.startsWith('joann and lupe live straight down the street')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 16 && !lines.length
      : responses.length === 1 && responseLineCount === 5 && lines.length === 2;
    if (!valid) return undefined;
    return reviewed('compare-five-sixths-and-seven-eighths-walks', 2, 'open-workspace-to-two-authored-number-lines', [6, 8], 'two-horizontal-same-length-wholes', 'model-both-distances-name-joann-and-explain', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('cheryl cuts 2 pieces of thread')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 16 && !lines.length
      : responses.length === 1 && responseLineCount === 5 && lines.length === 2;
    if (!valid) return undefined;
    return reviewed('compare-five-fourths-and-four-fifths-threads', 2, 'open-workspace-to-two-authored-number-lines', [4, 5], 'two-horizontal-zero-to-two-lines', 'model-both-lengths-name-red-thread-and-explain', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('brandon makes homemade spaghetti')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 18 && !lines.length
      : responses.length === 1 && responseLineCount === 5 && lines.length === 1 && equationLineCount === 1;
    if (!valid) return undefined;
    return reviewed('order-three-spaghetti-lengths', 3, 'open-workspace-to-authored-eighths-number-line', [7, 14, 16], 'horizontal-zero-to-two', 'model-order-seven-eighths-seven-fourths-four-halves-and-explain', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('divide each number line into the given fractional unit')) {
    if (lines.length !== 3 || equationLineCount !== 3) return undefined;
    return reviewed('halves-fourths-eighths-reference-lines', 9, 'three-authored-source-topology-number-lines', [2, 4, 8], 'three-horizontal-zero-to-three-lines', 'place-nine-given-fractions-and-write-each-whole-as-a-fraction');
  }
  if (sourcePrompt.startsWith('use the number lines above to compare')) {
    if (lines.length !== 3 || equationLineCount !== 9) return undefined;
    return reviewed('nine-comparisons-from-three-reference-lines', 9, 'three-reference-lines-plus-nine-comparison-blanks', [2, 4, 8], 'three-lines-over-nine-reading-order-comparisons', 'write-nine-greater-less-or-equal-symbols');
  }
  if (sourcePrompt.startsWith('choose a greater than comparison') || sourcePrompt.startsWith('choose a less than comparison') || sourcePrompt.startsWith('choose an equal to comparison')) {
    if (responses.length !== 1 || responseLineCount !== 18) return undefined;
    return reviewed('open-valid-comparison-explanation', 1, 'authored-open-written-and-drawing-workspace', [1], 'large-vertical-response-space', 'choose-a-valid-comparison-and-justify-it-under-the-printed-criteria', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('label what fraction of each shape is shaded')) {
    if (crops.length !== 3 || equationLineCount !== (isBlank ? 3 : 6)) return undefined;
    return reviewed('three-rows-of-shaded-figure-equivalence', 12, 'three-tight-official-figure-row-crops-plus-live-fraction-work', [4, 4, 4], 'three-source-figure-rows-in-reading-order', 'label-twelve-shaded-fractions-and-circle-equal-groups', cropEvidence);
  }
  if (sourcePrompt.startsWith('label the shaded fraction draw 2 different representations')) {
    if (crops.length !== 2 || equationLineCount !== 2 || responses.length !== 1 || responseLineCount !== 16) return undefined;
    return reviewed('name-and-represent-one-fourth-and-one-seventh', 2, 'two-tight-official-figure-crops-plus-open-drawing-space', [4, 7], 'two-source-figures-over-large-drawing-workspace', 'name-each-unit-fraction-and-draw-two-valid-representations', { ...cropEvidence, openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('ann has 6 small square pieces')) {
    if (crops.length !== 1 || responses.length !== 1 || responseLineCount !== 18) return undefined;
    return reviewed('six-square-pieces-cut-and-rearranged', 3, 'one-tight-official-piece-crop-plus-open-arrangement-space', [6, 2, 4, 4], 'source-pieces-over-large-arrangement-workspace', 'identify-triangles-and-squares-count-each-draw-two-arrangements-and-name-two-sixths', { ...cropEvidence, openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('laura has 2 different beakers')) {
    if (crops.length !== 1 || responses.length !== 1 || responseLineCount !== 12) return undefined;
    return reviewed('equal-half-liters-in-different-shaped-beakers', 2, 'tight-official-beaker-crop-plus-written-explanation', [1, 1, 2, 2], 'two-different-shaped-one-liter-beakers-over-response', 'name-cristina-and-explain-equal-capacity-and-equal-half-liter-amounts', { ...cropEvidence, openWorkspaceCount: 1 });
  }

  return undefined;
}

function canonicalM5LessonsTwentyOneThroughTwentyFiveLayout(sections, sourcePrompt, mode) {
  const isBlank = mode === 'blank';
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const lines = all.filter((section) => section?.kind === 'number-line');
  const crops = all.filter((section) => section?.kind === 'source-crop');
  const strips = all.filter((section) => section?.kind === 'fraction-strip');
  const bonds = all.filter((section) => section?.kind === 'number-bond');
  const equations = all.filter((section) => section?.kind === 'equations');
  const equationLineCount = equations.reduce((sum, section) => sum + (section.lines ?? []).length, 0);
  const responses = all.filter((section) => section?.kind === 'source-response-workspace');
  const responseLineCount = responses.reduce(
    (sum, response) => sum + (response.parts ?? []).reduce(
      (partSum, part) => partSum + (part.printedLineCount ?? 0),
      0
    ),
    0
  );
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const cropEvidence = {
    sourceFirst: true,
    sourceCropCount: crops.length,
    sourceCrops: crops.map((crop) => ({ src: crop.src, crop: crop.crop }))
  };

  if (sourcePrompt.startsWith('use the fractional units on the left')) {
    if (lines.length !== 2 || equationLineCount !== 2) return undefined;
    return reviewed('aligned-halves-fourths-and-sixths', 2, 'two-authored-shared-number-lines', [8, 12], 'two-horizontal-zero-to-two-lines', 'retain-givens-and-complete-only-missing-fraction-labels');
  }
  if (sourcePrompt.startsWith('use the number lines above to color fractions')) {
    if (lines.length !== 2 || equationLineCount !== 4) return undefined;
    return reviewed('four-color-groups-of-equivalent-points', 4, 'two-authored-shared-number-lines', [2, 4, 6], 'two-horizontal-zero-to-two-lines', 'identify-half-one-three-halves-and-two-equivalence-groups');
  }
  if (sourcePrompt.startsWith('use the number lines above to make the number sentences true')) {
    if (equationLineCount !== 3 || lines.length) return undefined;
    return reviewed('three-equivalent-fraction-sentences', 3, 'live-equation-blanks', [3, 4, 9, 6], 'three-equations-in-reading-order', 'complete-only-the-printed-numerators-and-denominators');
  }
  if (sourcePrompt.startsWith('jack and jill use rain gauges')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 16 && !lines.length
      : responses.length === 1 && responseLineCount === 5 && lines.length === 1 && equationLineCount === 1;
    if (!valid) return undefined;
    return reviewed('equivalent-two-fourths-and-four-eighths-rainfall', 2, 'open-number-line-workspace-to-authored-eighths-line', [2, 4], 'horizontal-zero-to-one', 'find-jill-four-eighths-and-explain', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('jack and jill s baby brother rosco')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 16 && !lines.length
      : responses.length === 1 && responseLineCount === 6 && lines.length === 1 && equationLineCount === 1;
    if (!valid) return undefined;
    return reviewed('verify-one-half-two-fourths-four-eighths-rainfall', 3, 'open-number-line-workspace-to-authored-eighths-line', [1, 2, 4], 'horizontal-zero-to-one', 'affirm-rosco-and-justify-three-equivalent-readings', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('write the shaded fraction of each figure')) {
    if (crops.length !== 1 || equationLineCount !== (isBlank ? 8 : 9)) return undefined;
    return reviewed('eight-shaded-figures-matched-by-equivalence', 8, 'tight-official-figure-matrix-crop-plus-live-labels', [8, 4], 'four-source-rows-of-two-figures', 'label-a-through-h-and-match-four-equivalent-pairs', cropEvidence);
  }
  if (sourcePrompt.startsWith('write the missing parts of the fractions')) {
    if (crops.length !== 1 || equationLineCount !== 3) return undefined;
    return reviewed('three-paired-equivalent-fraction-models', 3, 'tight-official-model-pairs-crop-plus-live-equations', [2, 2, 2], 'three-horizontal-source-model-pairs', 'complete-three-missing-equivalent-fraction-values', cropEvidence);
  }
  if (sourcePrompt.startsWith('why does it take 2 copies of 1 8')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 16 && !strips.length
      : responses.length === 1 && responseLineCount === 6 && strips.length === 2;
    if (!valid) return undefined;
    return reviewed('explain-two-eighths-equal-one-fourth', 2, 'open-words-pictures-workspace-to-two-same-size-strips', [2, 1], 'two-horizontal-same-size-wholes', 'explain-equivalent-coverage', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('how many sixths does it take')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 16 && !strips.length
      : responses.length === 1 && responseLineCount === 6 && strips.length === 2;
    if (!valid) return undefined;
    return reviewed('explain-two-sixths-equal-one-third', 2, 'open-words-pictures-workspace-to-two-same-size-strips', [2, 1], 'two-horizontal-same-size-wholes', 'name-two-sixths-and-explain-equivalent-coverage', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('why does it take 10 copies of 1 sixth')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 16 && !strips.length
      : responses.length === 1 && responseLineCount === 7 && strips.length === 4;
    if (!valid) return undefined;
    return reviewed('explain-ten-sixths-equal-five-thirds', 2, 'open-words-pictures-workspace-to-four-multi-whole-strips', [10, 5], 'two-multi-whole-horizontal-models', 'explain-two-sixths-per-third-and-ten-sixths-equal-five-thirds', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('on the number line above use a red colored pencil')) {
    if (lines.length !== (isBlank ? 1 : 1) || equationLineCount !== 1) return undefined;
    return reviewed('partition-shared-line-into-fourths', 12, 'source-whole-mark-line-to-authored-fourths-line', [12], 'horizontal-zero-to-three', 'partition-and-label-zero-fourths-through-twelve-fourths');
  }
  if (sourcePrompt.startsWith('on the number line above use a blue colored pencil')) {
    if (lines.length !== (isBlank ? 1 : 3) || equationLineCount !== 1) return undefined;
    return reviewed('partition-shared-line-into-eighths', 24, 'source-whole-mark-line-to-three-contiguous-eighths-segments', [24], 'horizontal-zero-to-three', 'partition-and-label-zero-eighths-through-twenty-four-eighths');
  }
  if (sourcePrompt.startsWith('list the fractions that name the same place')) {
    if (lines.length !== (isBlank ? 1 : 3) || equationLineCount !== 13) return undefined;
    return reviewed('thirteen-aligned-fourths-eighths-equivalences', 13, 'shared-reference-line-plus-live-equivalent-pairs', [13, 25], 'horizontal-zero-to-three', 'list-zero-fourths-through-twelve-fourths-with-doubled-eighths');
  }
  if (sourcePrompt.startsWith('using your number line to help')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 18 && !lines.length
      : responses.length === 1 && responseLineCount === 4 && lines.length === 1 && equationLineCount === 1;
    if (!valid) return undefined;
    return reviewed('show-fractions-equivalent-to-seven-halves', 3, 'open-number-line-workspace-to-authored-three-to-four-line', [7, 14, 28], 'horizontal-three-to-four', 'draw-label-seven-halves-fourteenths-fourths-and-twenty-eighths-eighths', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('write two different fractions for the dot')) {
    if (lines.length !== 4 || equationLineCount !== 4) return undefined;
    return reviewed('name-four-source-given-dots-two-ways', 4, 'four-authored-plotted-point-lines', [3, 2, 5, 10], 'four-horizontal-source-topology-lines', 'retain-each-given-dot-and-write-two-valid-fraction-names');
  }
  if (sourcePrompt.startsWith('cameron and terrance plan to run')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 16 && !lines.length
      : responses.length === 1 && responseLineCount === 7 && lines.length === 2;
    if (!valid) return undefined;
    return reviewed('compare-two-thirds-and-two-sixths-race-stops', 2, 'open-number-line-workspace-to-two-authored-lines', [2, 2], 'two-horizontal-zero-to-one-lines', 'show-different-rest-points-and-explain', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('complete the number bond as indicated by the fractional unit')) {
    if (bonds.length !== 4 || lines.length !== 4) return undefined;
    return reviewed('halves-thirds-fourths-fifths-bonds-and-lines', 4, 'four-number-bonds-paired-with-four-number-lines', [2, 3, 4, 5], 'four-vertical-cards-in-unit-order', 'complete-equal-unit-bonds-and-label-zero-to-one-lines');
  }
  if (sourcePrompt.startsWith('circle all the fractions in problem 1')) {
    if (equationLineCount !== 1) return undefined;
    return reviewed('write-four-fractions-equivalent-to-one', 4, 'live-equivalent-fraction-sentence', [2, 3, 4, 5], 'one-horizontal-equation', 'circle-and-write-two-halves-three-thirds-four-fourths-five-fifths');
  }
  if (sourcePrompt.startsWith('what pattern do you notice')) {
    if (responses.length !== 1 || responseLineCount !== 10) return undefined;
    return reviewed('describe-numerator-denominator-pattern-for-one', 1, 'open-written-response-space', [1], 'large-vertical-response-space', 'state-that-numerator-equals-denominator', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('taylor and his little brother')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 18 && !strips.length
      : responses.length === 1 && responseLineCount === 9 && strips.length === 2;
    if (!valid) return undefined;
    return reviewed('compare-four-fourths-and-three-thirds-pizzas', 2, 'open-explanation-workspace-to-two-same-size-pizza-strips', [4, 3], 'two-horizontal-same-size-wholes', 'explain-that-both-boys-ate-one-whole', { openWorkspaceCount: 1 });
  }
  if (sourcePrompt.startsWith('label the following models as a fraction')) {
    if (crops.length !== 3 || equationLineCount !== 9) return undefined;
    return reviewed('label-nine-grouped-whole-number-fraction-models', 9, 'three-tight-official-model-row-crops-plus-live-labels', [3, 4, 6], 'three-source-model-rows-in-reading-order', 'label-provided-three-thirds-and-eight-remaining-models', cropEvidence);
  }
  if (sourcePrompt.startsWith('fill in the missing whole numbers in the boxes below')) {
    if (lines.length !== 2 || equationLineCount !== 2) return undefined;
    return reviewed('rename-whole-number-points-with-denominator-one', 14, 'two-authored-whole-number-lines-plus-live-boxes', [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16], 'two-horizontal-lines-zero-to-six-and-ten-to-sixteen', 'fill-missing-wholes-and-rename-every-point-over-one');
  }
  if (sourcePrompt.startsWith('explain the difference between these two fractions')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 16 && !strips.length
      : responses.length === 1 && responseLineCount === 8 && strips.length === 2;
    if (!valid) return undefined;
    return reviewed('explain-two-over-one-versus-two-over-two', 2, 'open-words-pictures-workspace-to-two-authored-strips', [2, 1], 'two-horizontal-whole-models', 'explain-two-wholes-versus-two-halves-one-whole', { openWorkspaceCount: 1 });
  }

  return undefined;
}

function canonicalM5LessonsTwentySixThroughThirtyLayout(sections, sourcePrompt, mode) {
  const isBlank = mode === 'blank';
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const count = (kind) => all.filter((section) => section?.kind === kind).length;
  const lines = count('number-line');
  const strips = count('fraction-strip');
  const crops = all.filter((section) => section?.kind === 'source-crop');
  const bonds = count('number-bond');
  const tables = count('data-table');
  const equations = all.filter((section) => section?.kind === 'equations');
  const equationLineCount = equations.reduce((sum, section) => sum + (section.lines ?? []).length, 0);
  const responses = all.filter((section) => section?.kind === 'source-response-workspace');
  const responseLineCount = responses.reduce(
    (sum, response) => sum + (response.parts ?? []).reduce(
      (partSum, part) => partSum + (part.printedLineCount ?? 0),
      0
    ),
    0
  );
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const open = { openWorkspaceCount: 1 };
  const cropEvidence = {
    sourceFirst: true,
    sourceCropCount: crops.length,
    sourceCrops: crops.map((crop) => ({ src: crop.src, crop: crop.crop }))
  };

  if (sourcePrompt.startsWith('partition the number line to show the fractional units')) {
    const valid = lines === 2 && equationLineCount === 12 &&
      (isBlank ? responses.length === 1 && responseLineCount === 14 && bonds === 0 : bonds === 4);
    if (!valid) return undefined;
    return reviewed('decompose-wholes-in-halves-and-thirds', 12, 'two-number-lines-plus-four-whole-number-bonds', [4, 12, 4], 'horizontal-zero-to-two-and-two-to-four', 'complete-fraction-names-and-draw-bonds');
  }
  if (sourcePrompt.startsWith('write the fractions that name the whole numbers')) {
    if (lines !== 1 || tables !== 1) return undefined;
    return reviewed('name-two-three-four-in-four-fractional-units', 12, 'whole-mark-reference-line-plus-four-row-table', [2, 3, 4, 6], 'horizontal-line-over-unit-by-whole-table', 'retain-provided-halves-row-and-complete-thirds-fourths-sixths');
  }
  if (sourcePrompt.startsWith('sammy uses 1 4 meter')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 18 && lines === 0
      : responses.length === 1 && responseLineCount === 5 && lines === 1;
    if (!valid) return undefined;
    return reviewed('one-fourth-meter-wire-duration', 2, 'open-number-line-workspace-to-authored-fourths-line', [4, 12], 'horizontal-zero-to-one', 'find-four-days-for-one-meter-and-twelve-for-three', open);
  }
  if (sourcePrompt.startsWith('cindy feeds her dog 1 3 pound')) {
    const valid = isBlank
      ? responses.length === 1 && responseLineCount === 20 && lines === 0
      : responses.length === 1 && responseLineCount === 7 && lines === 2;
    if (!valid) return undefined;
    return reviewed('one-third-pound-daily-dog-food', 3, 'open-two-line-workspace-to-authored-thirds-lines', [3, 12], 'horizontal-zero-to-one-and-zero-to-four', 'partition-and-find-one-pound-after-three-days-two-after-six', open);
  }
  if (sourcePrompt.startsWith('use the pictures to model equivalent fractions')) {
    if (strips !== 4 || equationLineCount !== 8) return undefined;
    return reviewed('two-equivalent-fraction-pairs-and-unit-size-reasoning', 8, 'four-same-size-fraction-strips-plus-live-responses', [6, 3, 2, 8], 'four-source-strip-cards', 'complete-four-sixths-two-thirds-and-one-half-four-eighths-then-reason-about-size');
  }
  if (sourcePrompt.startsWith('6 friends want to share 3 chocolate bars')) {
    const valid = strips === (isBlank ? 3 : 4) && responses.length === 1 && responseLineCount === (isBlank ? 14 : 7);
    if (!valid) return undefined;
    return reviewed('share-three-differently-partitioned-bars-among-six', 3, 'three-unpartitioned-bars-to-halves-fourths-sixths-models', [2, 4, 6], 'three-horizontal-same-size-bars', 'give-equivalent-one-half-shares-without-breaking-pieces', open);
  }
  if (sourcePrompt.startsWith('when the whole is the same why does it take 6 copies')) {
    const valid = responses.length === 1 && responseLineCount === (isBlank ? 18 : 7) && strips === (isBlank ? 0 : 2);
    if (!valid) return undefined;
    return reviewed('explain-six-eighths-equal-three-fourths', 2, 'open-model-workspace-to-two-same-size-strips', [6, 3], 'two-horizontal-same-size-wholes', 'draw-and-explain-six-eighths-three-fourths-equivalence', open);
  }
  if (sourcePrompt.startsWith('when the whole is the same how many sixths')) {
    const valid = responses.length === 1 && responseLineCount === (isBlank ? 18 : 6) && strips === (isBlank ? 0 : 2);
    if (!valid) return undefined;
    return reviewed('find-two-sixths-equal-one-third', 2, 'open-model-workspace-to-two-same-size-strips', [2, 1], 'two-horizontal-same-size-wholes', 'draw-and-state-two-sixths-equal-one-third', open);
  }
  if (sourcePrompt.startsWith('you have a magic wand that doubles')) {
    const valid = responses.length === 1 && responseLineCount === (isBlank ? 20 : 8) && strips === (isBlank ? 0 : 4);
    if (!valid) return undefined;
    return reviewed('double-fourths-into-eighths', 4, 'open-rectangle-workspace-to-four-same-size-strips', [4, 8, 1, 2], 'paired-original-and-doubled-horizontal-models', 'show-and-explain-fourths-to-eighths-equivalence', open);
  }
  if (sourcePrompt.startsWith('shade the models to compare the fractions')) {
    if (strips !== 2 || equationLineCount !== (isBlank ? 0 : 1)) return undefined;
    const values = sourcePrompt.match(/\d+\s+(fifths|thirds|tenths|eighths|fourths|sixths)/g) ?? [];
    return reviewed('shade-circle-and-compare-same-numerator-fractions', 2, 'two-source-unshaded-strips-to-completed-comparison', values, 'two-horizontal-same-size-wholes', 'shade-both-models-circle-larger-and-record-comparison');
  }
  if (sourcePrompt.startsWith('after softball leslie and kelly')) {
    const valid = responses.length === 1 && responseLineCount === (isBlank ? 18 : 6) && strips === (isBlank ? 0 : 2);
    if (!valid) return undefined;
    return reviewed('compare-three-fourths-and-three-fifths-water', 2, 'open-picture-workspace-to-two-same-bottle-strips', [3, 3], 'two-horizontal-same-size-bottles', 'identify-kelly-as-drinking-less', open);
  }
  if (sourcePrompt.startsWith('becky and malory get matching piggy banks')) {
    const valid = responses.length === 1 && responseLineCount === (isBlank ? 18 : 6) && strips === (isBlank ? 0 : 2);
    if (!valid) return undefined;
    return reviewed('compare-two-thirds-and-two-fourths-piggy-banks', 2, 'open-picture-workspace-to-two-matching-bank-strips', [2, 2], 'two-horizontal-same-size-banks', 'identify-becky-as-having-more', open);
  }
  if (sourcePrompt.startsWith('heidi lines up her dolls')) {
    const valid = responses.length === 1 && responseLineCount === (isBlank ? 20 : 7) && strips === (isBlank ? 0 : 3);
    if (!valid) return undefined;
    return reviewed('order-two-sixths-two-fourths-two-thirds-doll-heights', 3, 'open-three-doll-picture-workspace-to-three-foot-strips', [2, 2, 2], 'three-horizontal-same-foot-models', 'order-doll-b-doll-a-doll-c', open);
  }
  if (sourcePrompt.startsWith('label each shaded fraction')) {
    if (sourcePrompt.includes('first one has been done')) {
      if (strips !== 2 || equationLineCount !== 1) return undefined;
      return reviewed('source-provided-two-sixths-less-than-two-thirds-example', 2, 'two-completed-source-fraction-strips', [2, 2], 'two-horizontal-same-size-wholes', 'retain-provided-labels-and-comparison');
    }
    if (crops.length !== 1 || equationLineCount !== 1) return undefined;
    return reviewed('compare-tight-official-shaded-figures', 2, 'tight-official-figure-crop-plus-live-comparison', [2], 'one-source-figure-pair', 'label-both-fractions-and-insert-comparison-symbol', cropEvidence);
  }
  if (sourcePrompt.startsWith('partition each number line into the units labeled')) {
    if (lines !== 3 || equationLineCount !== 3) return undefined;
    return reviewed('compare-three-fraction-pairs-on-halves-fourths-eighths-lines', 3, 'three-aligned-number-lines-plus-live-comparisons', [2, 4, 8], 'three-horizontal-zero-to-one-lines', 'partition-lines-and-compare-three-eighths-three-fourths-four-fourths-four-eighths-two-fourths-two-eighths');
  }
  if (sourcePrompt.startsWith('draw your own model to compare')) {
    const valid = responses.length === (isBlank ? 1 : 0) && strips === (isBlank ? 0 : 2) && equationLineCount === (isBlank ? 0 : 1);
    if (!valid) return undefined;
    return reviewed('student-drawn-fraction-comparison', 2, 'open-own-model-workspace-to-two-same-size-strips', [2], 'two-horizontal-same-size-wholes', 'draw-models-and-record-comparison', open);
  }
  if (sourcePrompt.startsWith('john ran 2 thirds')) {
    if (strips !== 2 || responses.length !== 1 || responseLineCount !== (isBlank ? 12 : 6)) return undefined;
    return reviewed('compare-two-thirds-and-two-fifths-kilometer-runs', 2, 'two-source-kilometer-tape-models', [2, 2], 'two-horizontal-one-kilometer-wholes', 'identify-nicholas-as-running-shorter');
  }
  if (sourcePrompt.startsWith('erica ate 2 ninths')) {
    if (strips !== 2 || responses.length !== 1 || responseLineCount !== (isBlank ? 12 : 6)) return undefined;
    return reviewed('compare-two-ninths-and-two-fifths-licorice', 2, 'two-source-identical-stick-tape-models', [2, 2], 'two-horizontal-identical-wholes', 'identify-robbie-as-eating-more');
  }
  if (sourcePrompt.startsWith('there is no problem set sheet for this lesson')) {
    if (tables !== 1 || lines !== 1) return undefined;
    return reviewed('notebook-paper-number-line-transfer-method', 5, 'five-step-live-table-plus-red-strip-guide', [5, 3], 'vertical-process-table-over-horizontal-strip', 'describe-and-illustrate-third-partition-transfer', open);
  }

  return undefined;
}

function canonicalM6LessonsOneThroughFiveLayout(sections, sourcePrompt, mode) {
  const isBlank = mode === 'blank';
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const count = (kind) => all.filter((section) => section?.kind === kind).length;
  const tables = count('data-table');
  const charts = count('data-chart');
  const crops = all.filter((section) => section?.kind === 'source-crop');
  const tapes = count('tape');
  const lines = count('number-line');
  const responses = count('source-response-workspace');
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const open = { openWorkspaceCount: 1 };
  const cropEvidence = {
    sourceFirst: true,
    sourceCropCount: crops.length,
    sourceCrops: crops.map((crop) => ({ src: crop.src, crop: crop.crop }))
  };

  if (sourcePrompt.startsWith('what is your favorite color')) {
    if (tables !== 1 || responses !== (isBlank ? 0 : 1)) return undefined;
    return reviewed('variable-class-favorite-color-tally-chart', 5, 'live-five-row-tally-table', [5], 'five-vertical-color-rows', 'record-one-tally-per-surveyed-student');
  }
  if (sourcePrompt.startsWith('use the tally chart to answer')) {
    if (tables !== 1 || responses !== 1) return undefined;
    return reviewed('six-questions-from-variable-class-tallies', 6, 'dependent-live-tally-table-plus-open-response', [5, 6], 'table-over-six-part-response', 'read-orange-yellow-most-least-difference-and-total', open);
  }
  if (sourcePrompt.startsWith('use the tally chart in problem 1')) {
    if (crops.length !== 2 || (!isBlank && tables !== 2)) return undefined;
    return reviewed('two-favorite-color-picture-graphs-with-different-keys', 2, 'two-tight-official-empty-graph-crops-to-live-variable-data-criteria', [5, 1, 2], 'two-vertical-five-column-graphs', 'transfer-same-class-data-with-one-student-and-two-student-keys', cropEvidence);
  }
  if (sourcePrompt.startsWith('use the picture graph in problem 3')) {
    if (responses !== 1 || crops.length !== 1 || (!isBlank && tables !== 1)) return undefined;
    return reviewed('four-questions-from-variable-class-picture-graph', 4, 'dependent-tight-official-graph-topology-plus-open-response', [5, 2, 7], 'graph-over-four-part-response', 'interpret-key-show-three-find-fourteen-and-compare-most-least', { ...open, ...cropEvidence });
  }
  if (sourcePrompt.startsWith('find the total number of stamps each student has')) {
    if (tables !== 1 || tapes !== 4 || responses !== 1) return undefined;
    return reviewed('four-stamp-arrays-to-unit-size-four-tapes', 4, 'given-total-table-plus-four-live-equal-unit-tapes', [16, 8, 24, 32], 'four-student-card-grid', 'retain-dana-example-and-complete-four-totals');
  }
  if (sourcePrompt.startsWith('explain how you can create vertical tape diagrams')) {
    if (tapes !== 4 || responses !== 1) return undefined;
    return reviewed('explain-rotation-of-four-horizontal-tapes', 1, 'four-dependent-equal-unit-tapes-plus-open-explanation', [4, 2, 6, 8], 'four-student-card-grid-over-response', 'turn-tapes-upright-while-preserving-labels-and-unit-counts', open);
  }
  if (sourcePrompt.startsWith('complete the vertical tape diagrams below')) {
    if (tapes !== 8 || responses !== 1) return undefined;
    return reviewed('paired-unit-four-and-unit-eight-vertical-tape-displays', 7, 'eight-live-equal-unit-tapes', [20, 10, 7, 56], 'two-four-student-card-grids', 'complete-both-displays-and-answer-c-through-g', open);
  }
  if (sourcePrompt.startsWith('this table shows the number of students in each class')) {
    if (tables !== 1 || charts !== 1 || responses !== 1) return undefined;
    return reviewed('table-to-scaled-class-enrollment-bar-graph', 3, 'given-four-row-table-plus-live-scaled-bar-chart', [9, 16, 13, 18], 'table-over-four-category-chart-and-response', 'retain-baking-example-complete-bars-and-answer-a-through-c');
  }
  if (sourcePrompt.startsWith('this bar graph shows kyle')) {
    if (charts !== 1 || responses !== 1) return undefined;
    return reviewed('read-five-source-provided-kyle-savings-bars', 4, 'live-source-provided-five-bar-chart', [30, 46, 23, 34, 40], 'five-horizontal-category-bars-over-response', 'read-may-less-than-thirty-five-june-minus-april-and-half');
  }
  if (sourcePrompt.startsWith('complete the table below to show the same data')) {
    if (charts !== 1 || tables !== 1) return undefined;
    return reviewed('transfer-kyle-savings-graph-to-five-row-table', 5, 'source-provided-five-bar-chart-plus-live-table', [30, 46, 23, 34, 40], 'chart-over-table', 'complete-five-month-value-cells');
  }
  if (sourcePrompt.startsWith('use the graph s lines as a ruler')) {
    if (charts !== 1 || lines !== 1) return undefined;
    return reviewed('transfer-charlotte-bars-to-number-line', 5, 'source-provided-five-bar-chart-plus-live-number-line', [50, 50, 70, 50, 40], 'chart-over-horizontal-number-line', 'draw-ten-minute-intervals-and-plot-five-days');
  }
  if (sourcePrompt.startsWith('use the graph or number line to answer')) {
    if (charts !== 1 || responses !== 1) return undefined;
    return reviewed('two-questions-from-charlotte-reading-graph', 2, 'source-provided-five-bar-chart-plus-open-response', [50, 50, 70, 50, 40], 'chart-over-two-part-response', 'identify-equal-days-and-wednesday-friday-difference', open);
  }
  if (sourcePrompt.startsWith('the chart below shows the number of magazines sold')) {
    if (tables !== 1 || charts !== 1 || responses !== 1) return undefined;
    return reviewed('magazine-table-to-chosen-scale-bar-graph-and-comparisons', 4, 'given-five-row-table-plus-live-scaled-chart', [300, 250, 100, 450, 600], 'table-over-chart-and-response', 'choose-scale-draw-bars-explain-and-solve-two-comparisons', open);
  }
  if (sourcePrompt.startsWith('the bar graph shows the number of visitors to a carnival')) {
    if (charts !== 1 || responses !== 1) return undefined;
    return reviewed('two-comparisons-from-source-provided-carnival-graph', 2, 'live-source-provided-five-bar-chart', [340, 300, 430, 190, 370], 'five-horizontal-category-bars-over-response', 'find-busiest-least-difference-and-paired-days-difference', open);
  }
  if (sourcePrompt.startsWith('use the ruler you made to measure')) {
    if (tables !== 1 || responses !== 1) return undefined;
    return reviewed('variable-class-straw-measurement-table', 3, 'live-five-row-three-precision-table', [1, 2, 4], 'five-straw-rows-over-response', 'record-measurements-star-exact-values-and-answer-a-through-c', open);
  }
  if (sourcePrompt.startsWith('jenna marks a 5 inch paper strip')) {
    if (lines !== 1 || responses !== 1) return undefined;
    return reviewed('label-and-quarter-five-inch-paper-strip', 3, 'live-source-topology-number-line', [5, 10, 20], 'one-horizontal-zero-to-five-strip-over-response', 'label-wholes-halves-draw-quarters-complete-equivalences-and-explain-use', open);
  }
  if (sourcePrompt.startsWith('sari says her pencil measures 8 half inches')) {
    if (responses !== 1 || tables || charts || lines || tapes) return undefined;
    return reviewed('explain-eight-half-inches-equal-four-inches', 1, 'large-open-words-pictures-numbers-workspace', [8, 4, 2], 'one-vertical-response-space', 'explain-two-halves-per-inch', open);
  }

  return undefined;
}

function canonicalM6LessonsSixThroughNineLayout(sections, sourcePrompt, mode) {
  const count = (kind) => sections.filter((section) => section?.kind === kind).length;
  const tables = count('data-table');
  const charts = count('data-chart');
  const plots = count('line-plot');
  const responses = count('source-response-workspace');
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const open = { openWorkspaceCount: 1 };

  if (sourcePrompt.startsWith('coach harris measures the heights')) {
    if (plots !== 1 || responses !== 1 || tables || charts) return undefined;
    return reviewed('read-source-provided-basketball-height-line-plot', 4, 'live-source-provided-nine-position-line-plot', [15, 6, 4], 'horizontal-half-inch-line-plot-over-four-part-response', 'count-total-less-than-mode-and-at-least', open);
  }
  if (sourcePrompt.startsWith('miss vernier s class is studying worms')) {
    if (plots !== 1 || responses !== 1 || tables || charts) return undefined;
    return reviewed('read-source-provided-worm-length-line-plot-and-add-point', 3, 'live-source-provided-nine-position-line-plot', [30, 6, 8, 1], 'horizontal-quarter-inch-line-plot-over-three-part-response', 'count-compare-combined-columns-and-add-four-and-three-quarters', open);
  }
  if (sourcePrompt.startsWith('mrs weisse s class grows beans')) {
    if (tables !== 1 || plots !== 1 || responses !== 1 || charts) return undefined;
    return reviewed('twenty-bean-measurements-to-quarter-inch-line-plot', 6, 'live-twenty-value-table-plus-seven-position-line-plot', [20, 14, 6, 4], 'five-column-table-over-horizontal-line-plot-and-six-part-response', 'plot-title-label-key-and-answer-b-through-f', open);
  }
  if (sourcePrompt.startsWith('delilah stops under a silver maple tree')) {
    if (tables !== 1 || plots !== 1 || responses !== 1 || charts) return undefined;
    return reviewed('twenty-five-leaf-measurements-to-quarter-inch-line-plot', 4, 'live-twenty-five-value-table-plus-six-position-line-plot', [25, 8, 6, 5, 4], 'five-column-table-over-horizontal-line-plot-and-four-part-response', 'plot-explain-construction-compare-six-and-six-halves-and-find-three-modes', open);
  }
  if (sourcePrompt.startsWith('four children went apple picking')) {
    if (tables !== 1 || charts !== 1 || responses !== 1 || plots) return undefined;
    return reviewed('complete-apple-table-and-create-picture-graph', 2, 'live-five-row-table-plus-four-category-picture-graph', [72, 16, 24, 12, 20], 'table-over-horizontal-picture-graph-and-two-part-response', 'find-roxanne-choose-scale-and-draw-four-symbol-rows', open);
  }
  if (sourcePrompt.startsWith('use the chart or graph to answer')) {
    if (tables !== 1 || responses !== 1 || charts || plots) return undefined;
    return reviewed('two-apple-comparisons-from-dependent-chart-or-graph', 2, 'dependent-live-five-row-table-plus-two-part-response', [16, 24, 12, 20, 8, 4], 'table-over-two-part-response', 'compare-paired-totals-and-divide-twenty-eight-apples-by-seven', open);
  }
  if (sourcePrompt.startsWith('ms pacho s science class measured')) {
    if (tables !== 1 || plots !== 1 || responses !== 1 || charts) return undefined;
    return reviewed('twenty-four-grass-measurements-to-quarter-inch-line-plot', 4, 'live-twenty-four-value-table-plus-eight-position-line-plot', [24, 6, 2], 'six-column-table-over-horizontal-line-plot-and-four-part-response', 'choose-scale-plot-count-find-mode-and-compare-combined-lengths', open);
  }

  return undefined;
}

function canonicalM7LessonsOneThroughFiveLayout(sections, sourcePrompt, mode) {
  const count = (kind) => sections.filter((section) => section?.kind === kind).length;
  const tables = count('data-table');
  const crops = sections.filter((section) => section?.kind === 'source-crop');
  const responses = count('source-response-workspace');
  const equations = count('equations');
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const open = { openWorkspaceCount: 1 };
  const cropEvidence = {
    sourceFirst: true,
    sourceCropCount: crops.length,
    sourceCrops: crops.map((crop) => ({ src: crop.src, crop: crop.crop }))
  };
  const rdwStarts = [
    'lena picked 17 apples',
    'lena s dad gives the cashier',
    'the apple orchard has 152 apple trees',
    'leanne needs 120 tiles',
    'gwen pours 236 milliliters',
    'maude hung 3 pictures',
    'kami scored a total of 21 points',
    'an orange weighs 198 grams',
    'the total amount of rain that fell',
    'monica measures 91 milliliters',
    'matthew and his dad put up',
    'the total weight of laura s new pencils',
    'mrs ford s math class starts',
    'on saturday the baker bought',
    'fred cut an 84 centimeter rope'
  ];

  if (sourcePrompt.startsWith('the sign below shows information about hayrides')) {
    if (tables !== 2 || responses !== 1) return undefined;
    return reviewed('hayride-sign-plus-three-part-rdw-work', 3, 'live-source-sign-table+open-rdw-mat', [7, 4, 15, 3], 'sign-over-rdw-table-and-three-part-response', 'solve-cost-five-dollar-bill-count-and-fourth-departure-wait', open);
  }
  if (rdwStarts.some((start) => sourcePrompt.startsWith(start))) {
    if (tables !== 1 || equations !== 1) return undefined;
    return reviewed('rdw-open-word-problem', 1, 'open-read-draw-write-mat', [], 'four-step-vertical-rdw-table', 'student-authored-labeled-model-equation-and-answer', open);
  }
  if (sourcePrompt.startsWith('cut out all the polygons a l')) {
    if (crops.length !== 1 || tables !== 1 || responses !== 1) return undefined;
    return reviewed('sort-exact-polygons-a-through-l-by-six-attribute-rows', 6, 'tight-official-twelve-polygon-template-crop+live-sort-table', [12, 6], 'template-over-six-row-chart-and-response', 'group-letters-and-sketch-one-per-row', { ...open, ...cropEvidence });
  }
  if (sourcePrompt.startsWith('write the letters of the polygons that are quadrilaterals')) {
    if (crops.length !== 1 || tables !== 1 || responses !== 1) return undefined;
    return reviewed('identify-quadrilaterals-from-exact-a-through-l-template', 2, 'tight-official-twelve-polygon-template-crop+live-response', [12], 'template-over-letter-and-explanation-response', 'name-all-quadrilaterals-and-explain-four-sides', { ...open, ...cropEvidence });
  }
  if (sourcePrompt.startsWith('sketch a polygon below from the group that has 2 sets')) {
    if (crops.length !== 1 || tables !== 1 || responses !== 1) return undefined;
    return reviewed('sketch-and-trace-two-parallel-pairs-from-exact-template', 2, 'tight-official-twelve-polygon-template-crop+open-sketch-table', [12, 2], 'template-over-sketch-and-explanation-response', 'sketch-trace-red-blue-and-explain-parallel', { ...open, ...cropEvidence });
  }
  if (sourcePrompt.startsWith('draw a diagonal line from one corner')) {
    if (crops.length !== 1 || tables !== 1 || responses !== 1) return undefined;
    return reviewed('draw-diagonals-in-dependent-chart-polygons', 2, 'tight-official-twelve-polygon-template-crop+dependent-diagonal-workspace', [12], 'template-over-diagonal-construction-and-response', 'draw-corner-to-opposite-corner-and-name-new-polygons', { ...open, ...cropEvidence });
  }
  if (sourcePrompt.startsWith('cut out all the polygons m x')) {
    if (crops.length !== 2 || tables !== 1) return undefined;
    return reviewed('sort-exact-polygons-m-through-x-by-four-attribute-rows', 4, 'two-tight-official-six-polygon-template-crops+live-sort-table', [12, 4], 'two-template-halves-over-four-row-chart', 'group-letters-and-sketch-one-per-row', cropEvidence);
  }
  if (sourcePrompt.startsWith('compare polygon m and polygon x')) {
    if (crops.length !== 2 || responses !== 1) return undefined;
    return reviewed('compare-exact-polygons-m-and-x', 2, 'two-tight-official-single-polygon-crops+open-comparison', [2], 'two-source-polygons-over-same-different-response', 'state-similarities-and-differences', { ...open, ...cropEvidence });
  }
  if (sourcePrompt.startsWith('jenny says polygon n polygon r and polygon s')) {
    if (crops.length !== 3 || responses !== 1) return undefined;
    return reviewed('evaluate-regular-quadrilateral-claim-for-n-r-s', 2, 'three-tight-official-single-polygon-crops+open-claim-response', [3], 'three-source-polygons-over-claim-response', 'judge-no-and-explain-failed-regular-quadrilateral-attributes', { ...open, ...cropEvidence });
  }
  if (sourcePrompt.startsWith('i have six equal sides and six equal angles')) {
    if (crops.length !== 1 || tables !== 1 || responses !== 1) return undefined;
    return reviewed('identify-regular-hexagon-u-and-draw-irregular-hexagon', 2, 'tight-official-single-polygon-u-crop+live-two-part-response', [6, 1], 'source-hexagon-over-identification-and-drawing', 'name-u-regular-hexagon-and-draw-no-equal-sides', { ...open, ...cropEvidence });
  }

  return undefined;
}

function canonicalM7LessonsSixThroughTenLayout(sections, sourcePrompt, mode) {
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const count = (kind) => all.filter((section) => section?.kind === kind).length;
  const geometry = count('geometry-diagram');
  const tables = count('data-table');
  const responses = count('source-response-workspace');
  const arrays = count('array');
  const notes = count('note');
  const crops = all.filter((section) => section?.kind === 'source-crop');
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const open = { openWorkspaceCount: 1 };
  const cropEvidence = {
    sourceFirst: true,
    sourceCropCount: crops.length,
    sourceCrops: crops.map((crop) => ({ src: crop.src, crop: crop.crop }))
  };
  const exact = (expected, result) => expected ? result : undefined;

  if (sourcePrompt.startsWith('draw a triangle with 1 right angle')) {
    return exact(geometry === 1 && tables === 1 && responses === 1,
      reviewed('open-right-triangle-construction', 1, 'empty-geometry-grid+criterion-table', [3, 1], 'drawing-grid-over-check-and-response', 'draw-triangle-and-mark-one-right-angle', open));
  }
  if (sourcePrompt.startsWith('draw a quadrilateral with 4 right angles')) {
    return exact(geometry === 1 && tables === 1 && responses === 1,
      reviewed('open-two-inch-square-construction', 1, 'empty-geometry-grid+criterion-table', [4, 4, 2], 'drawing-grid-over-check-and-response', 'draw-four-right-angles-and-label-four-two-inch-sides', open));
  }
  if (sourcePrompt.startsWith('draw a quadrilateral with at least 1 set of parallel sides')) {
    return exact(geometry === 1 && tables === 1 && responses === 1,
      reviewed('open-parallel-side-quadrilateral-construction', 1, 'empty-geometry-grid+criterion-table', [4, 1], 'drawing-grid-over-check-and-response', 'draw-quadrilateral-and-trace-one-parallel-pair-green', open));
  }
  if (sourcePrompt.startsWith('draw a pentagon with at least 2 equal sides')) {
    return exact(geometry === 1 && tables === 1 && responses === 1,
      reviewed('open-equal-side-pentagon-construction', 1, 'empty-geometry-grid+criterion-table', [5, 2], 'drawing-grid-over-check-and-response', 'draw-pentagon-and-label-at-least-two-equal-sides', open));
  }
  if (sourcePrompt.startsWith('draw a hexagon with at least 2 equal sides')) {
    return exact(geometry === 1 && tables === 1 && responses === 1,
      reviewed('open-equal-side-hexagon-construction', 1, 'empty-geometry-grid+criterion-table', [6, 2], 'drawing-grid-over-check-and-response', 'draw-hexagon-and-label-at-least-two-equal-sides', open));
  }
  if (sourcePrompt.startsWith('sam says that he drew a polygon with 2 sides')) {
    return exact(geometry === 1 && tables === 1 && responses === 1,
      reviewed('two-side-polygon-impossibility-explanation', 2, 'empty-picture-explanation-grid+criterion-table', [2, 2], 'open-grid-over-no-and-explanation-response', 'answer-no-with-picture-and-explanation', open));
  }

  if (sourcePrompt.startsWith('use tetrominoes to create at least two different rectangles then')) {
    return exact(arrays === 2 && responses === 1,
      reviewed('compose-two-different-tetromino-rectangles', 2, 'two-empty-square-grids', [2, 4, 1, 8], 'paired-grids-over-answer-criterion', 'compose-color-and-keep-piece-joins-visible', open));
  }
  if (sourcePrompt.startsWith('use tetrominoes to create at least two squares')) {
    return exact(arrays === 2 && tables === 1 && responses === 1,
      reviewed('compose-two-area-thirty-six-tetromino-squares', 4, 'two-empty-six-by-six-grids+equation-table', [6, 6, 36, 9, 4], 'paired-grids-over-two-number-sentences', 'color-two-arrangements-and-write-variable-equations', open));
  }
  if (sourcePrompt.startsWith('a use tetrominoes to create at least two different rectangles')) {
    return exact(arrays === 2 && responses === 1,
      reviewed('compose-two-different-area-twelve-tetromino-rectangles', 3, 'empty-three-by-four-and-two-by-six-grids', [3, 4, 2, 6, 12], 'paired-grids-over-explanation-response', 'color-two-rectangles-and-explain-area-twelve', open));
  }
  if (sourcePrompt.startsWith('marco created a rectangle with tetrominoes')) {
    return exact(geometry === 1 && responses === 1,
      reviewed('recreate-marco-traced-rectangle-with-tetrominoes', 2, 'source-given-outer-rectangle+open-internal-workspace', [4], 'printed-outline-over-open-piece-line-response', 'recreate-outline-and-estimate-internal-piece-lines', open));
  }

  const l8 = [
    ['fold and cut the square on the diagonal', 'fold-cut-square-on-diagonal', 'draw-and-label-two-right-triangles'],
    ['fold and cut one of the triangles in half', 'fold-cut-one-triangle-in-half', 'draw-and-label-two-smaller-triangles'],
    ['fold twice and cut your large triangle', 'fold-twice-and-cut-large-triangle', 'draw-and-label-trapezoid-and-triangle'],
    ['fold and cut your trapezoid in half', 'fold-cut-trapezoid-in-half', 'draw-and-label-two-smaller-trapezoids'],
    ['fold and cut one of your trapezoids', 'fold-cut-one-trapezoid', 'draw-and-label-square-and-triangle'],
    ['fold and cut your second trapezoid', 'fold-cut-second-trapezoid', 'draw-and-label-parallelogram-and-triangle']
  ];
  const l8Match = l8.find(([start]) => sourcePrompt.startsWith(start));
  if (l8Match) {
    return exact(geometry === 1 && tables === 1 && responses === 1,
      reviewed(l8Match[1], 2, 'source-shape-to-open-two-shape-workspace', [1, 2], 'before-shape-over-two-result-response', l8Match[2], open));
  }
  if (sourcePrompt.startsWith('reconstruct the original square using the seven shapes')) {
    return exact(crops.length === 1 && tables === 1 && responses === 1,
      reviewed('reconstruct-seven-piece-original-square', 2, 'tight-official-given-diagonal-crop+open-reconstruction-response', [7, 1], 'source-square-over-reconstruction-check-and-reflection', 'complete-internal-lines-and-describe-process', { ...open, ...cropEvidence }));
  }

  if (sourcePrompt.startsWith('use at least two tangram pieces')) {
    return exact(tables === 1 && responses === 1 && notes === 1,
      reviewed('draw-two-each-of-four-tangram-polygon-types', 8, 'four-row-live-requirement-table+open-drawing-workspace', [4, 2, 2], 'requirement-table-over-large-open-drawing-space', 'draw-two-rectangles-triangles-parallelograms-trapezoids-with-joins', open));
  }
  if (sourcePrompt.startsWith('use your two smallest triangles')) {
    return exact(tables === 1 && responses === 1 && notes === 1,
      reviewed('compose-three-figures-from-two-smallest-triangles', 3, 'three-row-live-requirement-table+open-drawing-workspace', [2, 3], 'requirement-table-over-large-open-drawing-space', 'draw-square-parallelogram-triangle-and-show-joins', open));
  }
  if (sourcePrompt.startsWith('create your own shape on a separate sheet')) {
    return exact(tables === 1 && responses === 1 && notes === 1,
      reviewed('create-and-describe-own-seven-piece-tangram-shape', 2, 'single-live-requirement-row+open-drawing-description-workspace', [7], 'requirement-over-open-outline-and-attribute-response', 'use-all-seven-and-describe-source-aligned-attributes', open));
  }
  if (sourcePrompt.startsWith('trade your outline with a partner')) {
    return exact(tables === 1 && responses === 1 && notes === 1,
      reviewed('partner-outline-recreation-and-reflection', 3, 'single-live-requirement-row+open-recreation-reflection-workspace', [], 'requirement-over-open-outline-and-reflection-response', 'recreate-partner-outline-and-reflect-easy-challenging', open));
  }

  if (sourcePrompt.startsWith('use a 2 inch square to answer')) {
    return exact(tables === 1 && responses === 1 && notes === 1,
      reviewed('trace-color-and-compare-square-and-new-shape', 7, 'live-seven-row-task-table+two-open-tracing-spaces', [2, 7], 'task-table-over-large-tracing-and-comparison-workspace', 'trace-red-color-blue-identify-perimeter-area-and-compare', open));
  }
  if (sourcePrompt.startsWith('a outline the perimeter of the shapes below')) {
    return exact(geometry === 1 && tables === 1 && responses === 1,
      reviewed('outline-three-printed-shape-perimeters', 2, 'live-rhombus-triangle-parallelogram-set+explanation-space', [3], 'three-shape-row-over-boundary-explanation', 'outline-red-and-explain-perimeter-as-outside-boundary', open));
  }
  if (sourcePrompt.startsWith('outline the perimeter of this piece of paper')) {
    return exact(geometry === 1 && responses === 1,
      reviewed('outline-this-paper-boundary', 1, 'live-paper-rectangle-boundary', [4], 'paper-boundary-over-answer-criterion', 'highlight-only-outside-edge-once', open));
  }

  return undefined;
}

function canonicalM7LessonsElevenThroughFifteenLayout(sections, sourcePrompt, mode) {
  const all = sections;
  const count = (kind) => all.filter((section) => section?.kind === kind).length;
  const geometry = count('geometry-diagram');
  const tables = count('data-table');
  const responses = count('source-response-workspace');
  const crops = all.filter((section) => section?.kind === 'source-crop');
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const open = { openWorkspaceCount: 1 };
  const cropEvidence = {
    sourceFirst: true,
    sourceCropCount: crops.length,
    sourceCrops: crops.map((crop) => ({ src: crop.src, crop: crop.crop }))
  };
  const live = geometry === 1 && tables === 1 && responses === 1;
  const cropped = crops.length === 1 && tables === 1 && responses === 1;

  const liveCases = [
    ['follow the directions below using the shape you created yesterday', 'open-student-shape-tessellation', 4, 'unseeded-tessellation-grid+four-part-table', [4], 'open-grid-over-live-directions-and-response', 'tessellate-color-highlight-and-string-measure-without-invented-sample'],
    ['compare the perimeter of your tessellation to a partner', 'compare-student-tessellation-perimeters', 3, 'unseeded-boundary-grid+criterion-table', [2], 'open-grid-over-comparison-response', 'record-both-perimeters-name-greater-and-explain'],
    ['how could you increase the perimeter of your tessellation', 'increase-tessellation-perimeter-explanation', 1, 'unseeded-boundary-grid+criterion-table', [1], 'open-grid-over-explanation-response', 'explain-source-grounded-perimeter-increase-without-sample'],
    ['how would overlapping your shape when you tessellated change', 'overlap-effect-on-tessellation-perimeter', 1, 'unseeded-boundary-grid+criterion-table', [1], 'open-grid-over-explanation-response', 'reason-about-overlap-and-outside-boundary-without-sample'],
    ['measure and label the side lengths of the shapes below in centimeters', 'measure-five-source-shapes-in-centimeters', 10, 'live-rhombus-hexagon-parallelogram-triangle-l-shape+recording-table', [5, 4, 6, 4, 3, 6], 'five-shape-row-over-live-measurement-table', 'measure-label-write-equation-and-perimeter-for-a-through-e'],
    ['hugh and daisy draw the shapes shown below', 'compare-hugh-pentagon-and-daisy-trapezoid', 3, 'live-pentagon-trapezoid+comparison-table', [2], 'two-shape-row-over-measure-compare-explain-fields', 'measure-label-identify-daisy-and-explain'],
    ['andrea measures one side length of the square below', 'explain-one-side-square-perimeter', 2, 'live-square+explanation-table', [4, 16], 'square-over-explanation-and-perimeter-fields', 'measure-one-side-explain-equal-sides-and-find-sixteen'],
    ['find the perimeter of the following shapes', 'find-perimeter-of-five-labeled-source-shapes', 10, 'live-rectangle-square-right-triangle-trapezoid-arrow-pentagon+equation-table', [5, 4, 4, 3, 4, 5], 'five-shape-row-over-boundary-sums', 'retain-givens-and-complete-five-equations-and-totals'],
    ['alan s rectangular swimming pool is 10 meters long and 16 meters wide', 'rectangular-pool-perimeter', 1, 'live-sixteen-by-ten-rectangle+equation-table', [16, 10, 52], 'labeled-pool-over-perimeter-equation', 'use-both-opposite-side-pairs-and-answer-fifty-two-meters'],
    ['label the unknown side lengths of the regular shapes below', 'label-and-find-perimeter-of-four-regular-shapes', 8, 'live-octagon-triangle-square-pentagon+recording-table', [4, 8, 3, 4, 5], 'four-shape-row-over-equal-side-and-perimeter-fields', 'retain-one-given-label-all-equal-sides-and-find-four-perimeters'],
    ['label the unknown side lengths of the rectangle below', 'label-opposite-rectangle-sides-and-find-perimeter', 3, 'live-two-by-seven-rectangle+equation-table', [2, 7, 18], 'rectangle-over-label-and-perimeter-fields', 'label-opposites-and-find-eighteen-centimeters'],
    ['david draws a regular octagon', 'regular-octagon-perimeter-from-one-side', 1, 'live-regular-octagon+equation-table', [8, 6, 48], 'octagon-over-multiplication-equation', 'multiply-eight-equal-sides-by-six-centimeters'],
    ['paige paints an 8 inch by 9 inch picture', 'picture-frame-perimeter', 1, 'live-eight-by-nine-rectangle+equation-table', [8, 9, 34], 'labeled-picture-over-trim-equation', 'find-thirty-four-inches-of-trim'],
    ['mr spooner draws a regular hexagon', 'compare-two-regular-hexagon-perimeter-methods', 3, 'live-six-side-hexagon+two-method-table', [6, 4, 24], 'hexagon-over-repeated-addition-and-multiplication', 'show-both-methods-correct-and-preserve-variable-explanation'],
    ['mrs kozlow put a border around a 5 foot by 6 foot rectangular bulletin board', 'bulletin-board-border-perimeter', 1, 'live-five-by-six-rectangle+rdw-table', [5, 6, 22], 'labeled-board-over-equation-and-answer', 'find-twenty-two-feet'],
    ['jason built a model of the pentagon', 'regular-pentagon-model-perimeter', 1, 'live-five-side-pentagon+rdw-table', [5, 33, 165], 'labeled-pentagon-over-equation-and-answer', 'find-one-hundred-sixty-five-centimeters'],
    ['the holmes family plants a rectangular 8 yard by 9 yard vegetable garden', 'vegetable-garden-fence-perimeter', 1, 'live-eight-by-nine-rectangle+rdw-table', [8, 9, 34], 'labeled-garden-over-equation-and-answer', 'find-thirty-four-yards'],
    ['marion paints a 5 pointed star', 'five-point-star-boundary-perimeter', 1, 'live-five-point-ten-segment-star+rdw-table', [5, 10, 18, 180], 'labeled-star-over-equation-and-answer', 'count-ten-boundary-segments-and-find-one-hundred-eighty-inches'],
    ['the soccer team jogs around the outside of the soccer field twice', 'two-laps-around-soccer-field', 2, 'live-sixty-by-one-hundred-rectangle+rdw-table', [60, 100, 2, 640], 'labeled-field-over-one-lap-and-two-lap-equation', 'find-one-perimeter-then-two-laps-six-hundred-forty-yards'],
    ['troop 516 makes 3 triangular flags', 'ribbon-around-three-equilateral-flags', 2, 'three-live-twenty-four-inch-triangles+rdw-table', [3, 3, 24, 216], 'three-flag-row-over-per-flag-and-total-equation', 'find-ribbon-for-three-flags-two-hundred-sixteen-inches']
  ];
  const liveMatch = liveCases.find(([start]) => sourcePrompt.startsWith(start));
  if (liveMatch && live) {
    return reviewed(...liveMatch.slice(1), open);
  }

  if (sourcePrompt.startsWith('carson draws two triangles to create the new shape') && cropped) {
    return reviewed('measure-two-triangle-diamond-perimeter', 2, 'tight-official-diamond-interior-join-crop+live-equation', [2, 4, 3], 'source-diagram-over-live-perimeter-fields', 'measure-four-outside-sides-and-exclude-interior-join', { ...open, ...cropEvidence });
  }
  if (sourcePrompt.startsWith('lila measures each side of the shape below') && cropped) {
    return reviewed('concave-five-side-perimeter-and-classification', 2, 'tight-official-concave-figure-crop+live-two-part-table', [5, 4, 2, 3, 6, 9, 24], 'source-diagram-over-perimeter-and-pentagon-fields', 'sum-five-sides-and-confirm-pentagon', { ...open, ...cropEvidence });
  }

  return undefined;
}

function canonicalM7LessonsSixteenThroughTwentyLayout(sections, sourcePrompt, mode) {
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const count = (kind) => all.filter((section) => section?.kind === kind).length;
  const geometry = count('geometry-diagram');
  const tables = count('data-table');
  const responses = count('source-response-workspace');
  const arrays = count('array');
  const cardGrids = count('card-grid');
  const linePlots = count('line-plot');
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const open = { openWorkspaceCount: 1 };
  const live = geometry === 1 && tables === 1 && responses === 1;

  const liveCases = [
    ['find the perimeter of 10 circular objects', 'measure-ten-circular-objects-with-string', 12, 'live-ten-row-chart+pacman-boundary+response', [10, 2], 'chart-over-curved-shape-over-two-part-response', 'record-ten-variable-measurements-and-answer-parts-a-b'],
    ['can you find the perimeter of the shape below using just your ruler', 'ruler-only-curved-d-shape-judgment', 2, 'live-curved-d-shape+judgment-table', [1], 'curved-shape-over-yes-no-explanation', 'answer-no-and-preserve-variable-explanation'],
    ['molly says the perimeter of the shape below is 6 1 4 inches', 'check-six-and-one-quarter-inch-circle-claim', 2, 'live-circle+judgment-table', [1, 6.25], 'circle-over-yes-no-explanation', 'answer-no-and-preserve-variable-explanation'],
    ['is the process you used to find the perimeter of a circular object an efficient method', 'string-efficiency-for-rectangle', 2, 'live-rectangle+judgment-table', [1], 'rectangle-over-yes-no-explanation', 'answer-no-and-preserve-variable-explanation'],
    ['the shapes below are made up of rectangles', 'four-composite-rectangle-perimeters', 12, 'live-step-notch-cross-l-pedestal+labels-table', [4, 14, 16, 24, 26], 'four-source-topologies-over-label-equation-table', 'derive-unknown-sides-and-find-four-keyed-perimeters'],
    ['nathan draws and labels the square and rectangle below', 'joined-square-rectangle-perimeter', 1, 'live-joined-six-square-and-twelve-rectangle+equation', [2, 6, 12, 48], 'joined-shapes-over-outside-boundary-equation', 'exclude-interior-join-and-find-forty-eight-centimeters'],
    ['label the unknown side lengths then find the perimeter of the shaded rectangle', 'derive-shaded-rectangle-dimensions-and-perimeter', 3, 'live-composite-outline+shaded-target+unknowns-table', [2, 8, 5, 26], 'source-composite-over-a-b-perimeter-table', 'derive-a-eight-b-five-and-perimeter-twenty-six-inches'],
    ['doug uses square unit tiles to build rectangles with an area of 15 square units', 'compare-two-area-fifteen-rectangle-perimeters', 3, 'live-one-by-fifteen-and-three-by-five+comparison', [2, 15, 32, 16], 'two-source-proportion-rectangles-over-comparison', 'answer-yes-and-preserve-variable-explanation'],
    ['use unit square tiles to make rectangles for each given number of unit squares from 12 through 18', 'factor-pair-charts-for-twelve-through-eighteen', 14, 'live-seven-row-factor-pair-table+count-map', [7, 3, 1, 2, 2, 3, 1, 3], 'seven-charts-over-count-map-and-response', 'retain-twelve-example-and-complete-thirteen-through-eighteen'],
    ['which numbers of unit squares produce three rectangles', 'identify-unit-square-counts-with-three-rectangles', 3, 'live-count-table+three-target-cards', [3, 12, 16, 18], 'count-table-over-three-targets-and-response', 'identify-twelve-sixteen-eighteen'],
    ['use your square unit tiles to build as many rectangles as you can with a perimeter of 12 units', 'construct-three-perimeter-twelve-rectangles-and-compare-areas', 7, 'three-live-construction-slots+keyed-area-table', [3, 12, 6, 8, 9], 'three-slots-over-area-record-and-four-part-response', 'draw-label-explain-record-keyed-areas-and-note-difference'],
    ['use your square unit tiles to build as many rectangles as you can with a perimeter of 14 units', 'construct-three-perimeter-fourteen-rectangles-and-find-areas', 6, 'three-live-rectangles+dimensions-and-area-table', [3, 14, 6, 10, 12], 'three-rectangles-over-area-record-and-three-part-response', 'draw-label-record-keyed-areas-and-preserve-variable-information-response']
  ];
  const liveMatch = liveCases.find(([start]) => sourcePrompt.startsWith(start));
  if (liveMatch && live) {
    return reviewed(...liveMatch.slice(1), open);
  }

  if (sourcePrompt.startsWith('use unit squares to build as many rectangles as you can with an area of 24 square units')) {
    const validStructure = tables === 1 && responses === 1 && cardGrids === 1 && (mode === 'blank' ? arrays === 1 : arrays === 4);
    if (!validStructure) return undefined;
    return reviewed('construct-area-twenty-four-rectangles-and-compare-perimeters', 6, 'official-one-by-twenty-four-example+four-live-factor-pair-arrays+record', [4, 24, 50, 28, 22, 20], 'example-or-four-arrays-over-record-and-response', 'draw-four-label-calculate-and-preserve-variable-comparison', open);
  }
  if (sourcePrompt.startsWith('use unit square tiles to build as many rectangles as you can with an area of 16 square units')) {
    const validBlank = mode === 'blank' && tables === 1 && responses === 2 && cardGrids === 0 && arrays === 0;
    const validSolved = mode === 'solved' && tables === 1 && responses === 1 && cardGrids === 1 && arrays === 3;
    if (!validBlank && !validSolved) return undefined;
    return reviewed('construct-area-sixteen-rectangles-and-find-square-perimeter', 5, 'open-grid-or-three-live-factor-pair-arrays+record', [3, 16, 34, 20, 16], 'open-or-three-arrays-over-record-and-response', 'draw-three-label-calculate-and-explain-square-perimeter-sixteen', open);
  }
  if (sourcePrompt.startsWith('create a line plot with the data you collected in problem 1')) {
    if (linePlots !== 1 || tables !== 1 || responses !== 1) return undefined;
    return reviewed('line-plot-of-rectangle-counts', 7, 'live-twelve-through-eighteen-line-plot+dependent-table', [7, 3, 1, 2, 2, 3, 1, 3], 'line-plot-over-dependent-data-and-response', 'plot-one-x-per-rectangle', open);
  }
  if (sourcePrompt.startsWith('why do some numbers of unit squares such as 13 only produce one rectangle')) {
    if (arrays !== 1 || tables !== 1 || responses !== 1) return undefined;
    return reviewed('explain-prime-thirteen-one-rectangle-result', 1, 'live-one-by-thirteen-array+dependent-table', [13, 1], 'array-over-chart-evidence-and-open-response', 'preserve-variable-explanation-without-invented-sample', open);
  }

  return undefined;
}

function canonicalM7LessonsTwentyOneThroughTwentyFiveLayout(sections, sourcePrompt, mode) {
  const count = (kind) => sections.filter((section) => section?.kind === kind).length;
  const geometry = count('geometry-diagram');
  const tables = count('data-table');
  const responses = count('source-response-workspace');
  const arrays = count('array');
  const linePlots = count('line-plot');
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const open = { openWorkspaceCount: 1 };

  const geometryTableResponse = geometry === 1 && tables === 1 && responses === 1;
  const cases = [
    ['on your centimeter grid paper shade and label as many rectangles as you can with a perimeter of 16 centimeters', 'construct-four-perimeter-sixteen-centimeter-rectangles', 6, 'four-live-sketch-slots+width-length-area-table', [4, 16, 7, 12, 15, 16], 'four-sketches-over-record-and-two-part-response', 'sketch-label-and-find-four-keyed-areas'],
    ['on your centimeter grid paper shade and label as many rectangles as you can with a perimeter of 18 centimeters', 'construct-four-perimeter-eighteen-centimeter-rectangles', 6, 'four-live-sketch-slots+width-length-area-table', [4, 18, 8, 14, 18, 20], 'four-sketches-over-record-and-two-part-response', 'sketch-label-and-find-four-keyed-areas'],
    ['macy and gavin both draw rectangles with perimeters of 16 centimeters', 'explain-same-perimeter-different-area', 3, 'two-open-rectangle-frames+evidence-table', [2, 16], 'two-drawing-frames-over-required-evidence-and-response', 'preserve-variable-words-and-pictures-without-sample'],
    ['why are all of the perimeter measurements even', 'reason-about-even-rectangle-perimeters', 2, 'whole-number-versus-fractional-boundary-evidence', [2], 'reasoning-table-over-two-boundary-models-and-response', 'preserve-variable-two-part-explanation'],
    ['sumi uses unit square tiles to build 3 rectangles that have an area of 32 square units', 'distinguish-area-thirty-two-from-perimeter-thirty-two', 2, 'two-live-constraint-models+given-question-table', [2, 32, 3], 'given-question-table-over-constraint-models-and-response', 'answer-no-and-preserve-variable-explanation'],
    ['george draws 3 rectangles that have a perimeter of 14 centimeters', 'explain-more-than-three-perimeter-fourteen-rectangles', 2, 'whole-number-versus-fractional-construction-evidence', [3, 14], 'evidence-table-over-construction-models-and-response', 'preserve-variable-explanation-grounded-in-non-whole-number-sides'],
    ['gale makes a miniature stop sign a regular octagon with a perimeter of 48 centimeters', 'regular-octagon-missing-side', 2, 'live-octagon+rdw-table', [8, 48, 6], 'octagon-over-equation-answer-and-response', 'divide-perimeter-by-eight-and-answer-six-centimeters'],
    ['travis bends wire to make rectangles', 'wire-for-two-thirty-four-by-twelve-rectangles', 3, 'two-live-labeled-rectangles+rdw-table', [2, 34, 12, 184], 'two-rectangles-over-equation-answer-and-response', 'find-one-perimeter-double-and-answer-one-hundred-eighty-four-inches'],
    ['the perimeter of a rectangular bathroom is 32 feet', 'bathroom-missing-length-from-perimeter', 3, 'live-labeled-rectangle+rdw-table', [32, 8, 8], 'rectangle-over-equation-answer-and-response', 'halve-perimeter-subtract-width-and-answer-eight-feet'],
    ['mischa makes a 4 foot by 6 foot rectangular banner', 'banner-ribbon-cost', 3, 'live-four-by-six-banner+rdw-table', [4, 6, 2, 40], 'banner-over-equation-answer-and-response', 'find-perimeter-multiply-by-two-dollars-and-answer-forty-dollars'],
    ['colton buys a roll of wire fencing that is 120 yards long', 'wire-left-for-garden-and-play-space', 5, 'two-live-labeled-rectangles+rdw-table', [120, 18, 24, 6, 8, 84, 28], 'garden-and-play-space-over-equation-answer-and-response', 'find-both-perimeters-compare-with-roll-and-answer-yes'],
    ['draw a picture of your robot in its environment in the space below', 'draw-and-label-variable-robot-environment', 3, 'required-label-table+open-drawing-field', [1], 'requirements-over-open-drawing-field-and-response', 'preserve-variable-pictures-and-labels-without-fabricated-sample']
  ];
  const caseMatch = cases.find(([start]) => sourcePrompt.startsWith(start));
  if (caseMatch && geometryTableResponse) {
    return reviewed(...caseMatch.slice(1), open);
  }

  if (sourcePrompt.startsWith('use centimeter grid paper to shade in as many rectangles as you can with the given perimeters')) {
    if (tables !== 2 || responses !== 1 || geometry !== 0) return undefined;
    return reviewed('complete-perimeter-ten-and-twenty-rectangle-charts', 9, 'two-live-width-length-area-tables', [2, 5, 10, 20, 25], 'perimeter-ten-table-over-perimeter-twenty-table-over-response', 'retain-first-rows-complete-charts-and-identify-square', open);
  }
  if (sourcePrompt.startsWith('use the data you gathered from your problem sets to create a line plot')) {
    if (linePlots !== 1 || tables !== 1 || responses !== 1) return undefined;
    return reviewed('line-plot-rectangle-counts-by-perimeter', 6, 'live-six-value-line-plot+dependent-table', [6, 2, 3, 3, 4, 4, 5], 'line-plot-over-dependent-data-and-response', 'plot-one-x-per-rectangle-for-perimeters-ten-through-twenty', open);
  }
  if (sourcePrompt.startsWith('compare the two line plots we created')) {
    if (linePlots !== 2 || responses !== 1 || tables !== 0) return undefined;
    return reviewed('compare-area-and-perimeter-line-plots', 2, 'two-live-dependent-line-plots', [2, 7, 6], 'area-line-plot-over-perimeter-line-plot-over-response', 'answer-no-from-comparison', open);
  }
  if (sourcePrompt.startsWith('raj uses 6 inch square tiles to make a rectangle')) {
    if (arrays !== 1 || tables !== 1 || responses !== 1) return undefined;
    return reviewed('perimeter-of-three-by-five-six-inch-tile-array', 4, 'live-three-by-five-square-array+rdw-table', [3, 5, 6, 96], 'array-over-equation-answer-and-response', 'convert-tile-counts-to-side-lengths-and-answer-ninety-six-inches', open);
  }
  if (sourcePrompt.startsWith('use the given perimeters in the chart below to choose the widths and lengths of your robot s rectangular body parts')) {
    if (tables !== 3 || responses !== 1 || geometry !== 0) return undefined;
    return reviewed('plan-robot-body-and-environment-from-perimeter-charts', 17, 'two-live-source-project-charts+count-requirements', [9, 8, 28, 8, 7, 6], 'body-chart-over-environment-chart-over-counts-and-response', 'retain-variable-dimensions-and-key-only-dependent-perimeters', open);
  }

  return undefined;
}

function canonicalM7LessonsTwentySixThroughThirtyLayout(sections, sourcePrompt, mode) {
  const count = (kind) => sections.filter((section) => section?.kind === kind).length;
  const geometry = count('geometry-diagram');
  const tables = count('data-table');
  const responses = count('source-response-workspace');
  const linePlots = count('line-plot');
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const open = { openWorkspaceCount: 1 };

  if (sourcePrompt.startsWith('collect the area measurements of your classmates robot bodies')) {
    if (linePlots !== 1 || tables !== 1 || responses !== 1) return undefined;
    return reviewed('class-line-plot-of-variable-robot-body-areas', 3, 'unseeded-live-line-plot+class-data-record', [8, 2], 'blank-class-line-plot-over-data-record-and-two-part-response', 'collect-class-data-plot-and-preserve-variable-responses', open);
  }

  const geometryCases = [
    ['measure and calculate the perimeter of your construction paper in inches', 'measure-variable-construction-paper-perimeter', 2, 'open-live-paper-model+measurement-table', [1], 'paper-model-over-measurement-calculation-and-response', 'measure-in-inches-and-preserve-variable-answer'],
    ['sketch and label two shapes with the same perimeter from the robot s environment', 'sketch-two-environment-shapes-with-same-perimeter', 3, 'two-open-drawing-frames+comparison-table', [2], 'two-frames-over-comparison-and-response', 'preserve-variable-sketches-and-explanation'],
    ['gia measures her rectangular garden and finds the width is 9 yards and the length is 7 yards', 'garden-area-and-perimeter-word-problem', 3, 'live-nine-by-seven-rectangle+parts-table', [9, 7, 63, 32], 'rectangle-over-three-part-work-and-response', 'draw-label-find-area-and-find-perimeter'],
    ['elijah draws a square that has side lengths of 8 centimeters', 'square-area-perimeter-and-three-square-composite', 4, 'live-eight-square+three-square-long-rectangle+parts-table', [8, 64, 32, 24, 64], 'square-and-composite-over-four-part-work-and-response', 'draw-label-find-area-two-perimeters'],
    ['the area of mason s rectangular painting is 72 square inches', 'painting-missing-length-perimeter-and-total-area', 4, 'live-area-seventy-two-width-eight-rectangle+parts-table', [72, 8, 9, 34, 64, 81, 217], 'rectangle-over-four-part-work-and-response', 'draw-label-derive-length-perimeter-and-total-area'],
    ['the perimeter of jillian s rectangular bedroom is 34 feet', 'bedroom-missing-width-area-and-uncovered-floor', 4, 'live-bedroom-and-four-by-six-rug+parts-table', [34, 9, 8, 72, 4, 6, 48], 'bedroom-and-rug-over-four-part-work-and-response', 'draw-label-derive-width-area-and-uncovered-area'],
    ['kyle puts two rectangles together to make the l shaped figure below', 'l-shape-perimeter-area-and-two-copy-rectangle', 3, 'live-exact-l-shape+two-copy-rectangle+parts-table', [12, 16, 8, 6, 56, 144, 72], 'source-l-shape-and-composite-over-three-part-work', 'find-perimeter-area-and-composite-perimeter'],
    ['jeremiah and hayley use a piece of rope to mark a square space for their booth at the science fair', 'square-booth-rope-with-three-foot-opening', 3, 'live-area-forty-nine-square+opening+rdw-table', [49, 7, 3, 25], 'square-over-side-perimeter-opening-work', 'derive-side-subtract-opening-and-answer-twenty-five-feet'],
    ['vivienne draws four identical rectangles as shown below to make a new larger rectangle', 'four-identical-rectangles-larger-perimeter', 3, 'live-two-by-two-four-rectangle-arrangement+rdw-table', [4, 18, 6, 3, 12, 36], 'four-rectangle-composite-over-derived-dimensions-and-perimeter', 'derive-small-length-and-answer-thirty-six-centimeters'],
    ['a jogging path around the outside edges of a rectangular playground measures 48 yards by 52 yards', 'three-and-one-half-playground-laps', 4, 'live-forty-eight-by-fifty-two-path+lap-table', [48, 52, 3.5, 200, 700], 'playground-over-one-three-half-total-lap-work', 'find-one-lap-and-answer-seven-hundred-yards']
  ];
  const geometryMatch = geometryCases.find(([start]) => sourcePrompt.startsWith(start));
  if (geometryMatch && geometry === 1 && tables === 1 && responses === 1) {
    return reviewed(...geometryMatch.slice(1), open);
  }

  const tableResponseCases = [
    ['write two or three sentences describing your robot and the environment in which it lives', 'describe-variable-robot-and-environment', 1, 'two-or-three-sentence-requirement+open-writing-space', [2, 3], 'requirement-over-open-response', 'preserve-variable-description'],
    ['use the chart below to evaluate your friend s robot measure the width and length of each rectangle', 'evaluate-friend-robot-rectangles-a-through-i', 9, 'live-nine-row-source-evaluation-chart', [9, 14, 14, 18, 18, 28, 16, 8], 'source-chart-over-open-evaluation-response', 'measure-calculate-and-star-discrepancies-with-variable-results'],
    ['is the perimeter of the robot s body double that of the arm', 'compare-variable-robot-body-and-arm-perimeters', 3, 'dependent-measurement-calculation-table', [2], 'dependent-values-over-double-comparison-and-conclusion', 'preserve-variable-answer-and-calculation'],
    ['is the perimeter of the robot s neck half the perimeter of the head', 'compare-variable-robot-neck-and-head-perimeters', 3, 'dependent-measurement-calculation-table', [2], 'dependent-values-over-half-comparison-and-conclusion', 'preserve-variable-answer-and-calculation'],
    ['use the chart below to evaluate your friend s robot environment', 'evaluate-friend-environment-items-j-through-q', 8, 'live-eight-row-source-environment-evaluation-chart', [8, 25, 82, 30, 30, 20, 20], 'source-chart-over-open-evaluation-response', 'measure-with-ruler-or-string-calculate-and-star-discrepancies'],
    ['use this form to critique your classmate s problem solving work', 'peer-problem-solving-critique-form', 6, 'live-six-field-source-critique-form', [6], 'source-form-over-open-writing-space', 'preserve-variable-peer-specific-critique']
  ];
  const tableResponseMatch = tableResponseCases.find(([start]) => sourcePrompt.startsWith(start));
  if (tableResponseMatch && geometry === 0 && tables === 1 && responses === 1 && linePlots === 0) {
    return reviewed(...tableResponseMatch.slice(1), open);
  }

  return undefined;
}

function canonicalM7LessonsThirtyOneThroughThirtyFourLayout(sections, sourcePrompt, mode) {
  const count = (kind) => sections.filter((section) => section?.kind === kind).length;
  const geometry = count('geometry-diagram');
  const tables = count('data-table');
  const responses = count('source-response-workspace');
  const crops = count('source-crop');
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });
  const open = { openWorkspaceCount: 1 };

  if (sourcePrompt.startsWith('use this form to analyze your classmate s representations of one half shaded')) {
    if (tables !== 1 || responses !== 1 || geometry !== 0 || crops !== 0) return undefined;
    return reviewed(
      'four-row-one-half-representation-analysis-form',
      4,
      'live-four-row-source-analysis-table+open-response',
      [4],
      'source-table-over-open-response',
      'preserve-four-variable-classmate-analyses',
      open
    );
  }
  if (sourcePrompt.startsWith('look at the circles you shaded today')) {
    if (geometry !== 1 || tables !== 1 || responses !== 1 || crops !== 0) return undefined;
    return reviewed(
      'glue-about-one-half-circle-and-explain',
      3,
      'open-live-glue-field+three-part-response',
      [1, 3],
      'circle-field-over-parts-a-b-response',
      'preserve-variable-circle-strategy-and-keyed-no',
      open
    );
  }
  if (sourcePrompt.startsWith('julian shades 4 circles as shown below')) {
    if (crops !== 1 || tables !== 1 || responses !== 1 || geometry !== 0) return undefined;
    return reviewed(
      'julian-four-unconventional-one-half-circles',
      3,
      'tight-source-diagram-crop+three-part-response',
      [4, 3],
      'four-source-circles-over-parts-a-c-response',
      'identify-a-c-d-and-preserve-variable-explanations',
      { ...open, sourceCropCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('read the clues to help you shade the circle below')) {
    if (geometry !== 1 || tables !== 1 || responses !== 1 || crops !== 0) return undefined;
    return reviewed(
      'four-step-unconventional-circle-shading-construction',
      4,
      'open-live-circle+printed-center-point+exact-four-step-source-table',
      [1, 1, 4],
      'circle-over-four-construction-clues-and-response',
      'preserve-student-construction-with-keyed-correct-circle',
      open
    );
  }
  if (sourcePrompt.startsWith('did you shade in one half of the circle in problem 3')) {
    if (tables !== 1 || responses !== 1 || geometry !== 0 || crops !== 0) return undefined;
    return reviewed(
      'justify-problem-three-shades-one-half',
      1,
      'dependent-problem-three-reasoning-table+open-response',
      [3],
      'dependent-evidence-over-response',
      'answer-yes-with-variable-explanation',
      open
    );
  }
  if (sourcePrompt.startsWith('list some games we played today in the chart below')) {
    if (tables !== 1 || responses !== 1 || geometry !== 0 || crops !== 0) return undefined;
    return reviewed(
      'eight-row-fluency-game-reflection-form',
      8,
      'live-eight-row-source-reflection-table+open-response',
      [8],
      'source-table-over-variable-response',
      'preserve-eight-variable-activity-reflections',
      open
    );
  }
  if (sourcePrompt.startsWith('complete a math activity each day')) {
    if (tables !== 2 || responses !== 1 || geometry !== 0 || crops !== 0) return undefined;
    return reviewed(
      'ten-week-fifty-activity-summer-math-review-calendar',
      50,
      'two-live-five-week-source-calendar-tables+completion-response',
      [5, 5, 50],
      'weeks-one-five-over-weeks-six-ten-over-response',
      'retain-all-fifty-source-activities-with-uncolored-completion-boxes',
      open
    );
  }

  return undefined;
}

function canonicalM4LessonsElevenThroughFifteenLayout(sections, sourcePrompt, mode) {
  const isBlank = mode === 'blank';
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const arrays = all.filter((section) => section?.kind === 'array');
  const arrayCounts = arrays.map((array) => array.rows * array.columns);
  const cropCount = all.filter((section) => section?.kind === 'source-crop').length;
  const response = all.find((section) => section?.kind === 'source-response-workspace');
  const geometry = all.find((section) => section?.kind === 'geometry-diagram');
  const equations = all.filter((section) => section?.kind === 'equations');
  const tables = all.filter((section) => section?.kind === 'data-table');
  const noteCount = all.filter((section) => section?.kind === 'note').length;
  const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  const equationLineCount = equations.reduce((sum, section) => sum + (section.lines ?? []).length, 0);
  const hasResponse = (minimumParts = 1) =>
    response &&
    (response.parts ?? []).length >= minimumParts &&
    (!isBlank || (response.parts ?? []).some((part) => part.openWorkspace));
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });

  if (sourcePrompt.startsWith('the rectangles below have the same area')) {
    if (geometry?.diagram !== 'composite' || (geometry.shapes ?? []).length !== 5 || equationLineCount !== 5) return undefined;
    return reviewed(
      'five-equal-area-factor-pair-rectangles',
      5,
      'authored-side-labeled-rectangles',
      [48, 48, 48, 48, 48],
      'five-source-positioned-rectangles-over-five-equations',
      'regroup-factors-label-side-lengths-and-find-equal-areas'
    );
  }
  if (sourcePrompt.startsWith('does problem 1 show all the possible whole number side lengths')) {
    if (!hasResponse()) return undefined;
    return reviewed(
      'factor-pair-completeness-explanation',
      1,
      'open-written-response',
      [48],
      'vertical-open-response',
      'explain-that-all-whole-number-factor-pairs-are-shown',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('in problem 1 what happens to the shape of the rectangle')) {
    if (!hasResponse()) return undefined;
    return reviewed(
      'rectangle-shape-factor-pair-generalization',
      1,
      'open-written-response',
      [48],
      'vertical-open-response',
      'describe-approach-toward-square-as-side-difference-decreases',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.includes('julius says a 4 cm by 18 cm rectangle')) {
    const expected = isBlank ? [72, 72] : [72, 72, 72];
    if (!same(arrayCounts, expected) || !hasResponse()) return undefined;
    return reviewed(
      'three-part-equal-area-associative-property-check',
      3,
      'authored-square-unit-arrays-and-open-explanation',
      [72, 72, 72],
      'three-related-factor-pair-models-over-three-part-response',
      'find-area-check-julius-and-create-another-factor-pair',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('each side on a sticky note measures 9 centimeters')) {
    if (!(isBlank ? hasResponse() : same(arrayCounts, [81]))) return undefined;
    return reviewed(
      'nine-centimeter-square-sticky-note',
      1,
      'open-rdw-to-nine-by-nine-square-array',
      [81],
      'vertical-open-response',
      'multiply-equal-side-lengths-to-find-area',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('stacy tiles the rectangle below')) {
    if (!same(arrayCounts, isBlank ? [12] : [12, 12]) || !hasResponse()) return undefined;
    return reviewed(
      'twelve-square-unit-given-and-alternate-rectangles',
      3,
      'authored-square-unit-arrays-and-open-construction',
      [12, 12],
      'given-model-next-to-alternate-model-over-open-response',
      'count-draw-label-and-explain-factor-pair-options',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('an artist paints a 4 foot x 16 foot mural')) {
    if (!same(arrayCounts, [64]) || arrays[0]?.splitAfterColumns !== 10 || equationLineCount !== 3) return undefined;
    return reviewed(
      'four-by-sixteen-mural-distributive-split',
      1,
      'authored-two-tone-four-by-sixteen-square-array',
      [64, 40, 24],
      'horizontal-ten-plus-six-split-over-equations',
      'find-two-partial-areas-and-add'
    );
  }
  if (sourcePrompt.startsWith('alana tiles the 3 figures below')) {
    if (!same(arrayCounts, isBlank ? [4, 9, 16] : [4, 9, 16, 25, 36]) || !hasResponse()) return undefined;
    return reviewed(
      'three-given-and-two-extended-growing-square-arrays',
      2,
      'authored-growing-square-unit-arrays',
      [4, 9, 16, 25, 36],
      'three-given-figures-over-open-extension-space',
      'find-three-areas-explain-pattern-and-draw-two-next-figures',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('jermaine glues 3 identical pieces of paper')) {
    if (cropCount !== 1 || !hasResponse()) return undefined;
    return reviewed(
      'three-identical-strips-form-nine-centimeter-square',
      2,
      'tight-official-three-strip-square-illustration',
      [9, 3, 54],
      'figure-over-two-part-open-response',
      'find-one-strip-side-length-and-area-of-two-strips',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('each of the following figures is made up of 2 rectangles')) {
    if (cropCount !== 1 || equationLineCount !== 4) return undefined;
    return reviewed(
      'four-two-rectangle-composite-grid-figures',
      4,
      'tight-official-four-composite-figure-grid',
      [27, 33, 30, 55],
      'single-four-figure-grid-over-four-area-sums',
      'add-two-rectangle-parts-for-each-composite-area',
      { sourceFirst: true, sourceCropCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('the figure shows a small rectangle cut out of a bigger rectangle')) {
    if (cropCount !== 1 || !hasResponse()) return undefined;
    return reviewed(
      'nine-by-ten-rectangle-minus-three-by-four-cutout',
      1,
      'tight-official-labeled-cutout-figure',
      [90, 12, 78],
      'figure-over-open-response',
      'subtract-cutout-area-from-big-rectangle',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('the figure shows a small rectangle cut out of a big rectangle')) {
    if (cropCount !== 1 || !hasResponse()) return undefined;
    return reviewed(
      'l-shaped-seven-by-nine-minus-four-by-five-cutout',
      4,
      'tight-official-labeled-l-shaped-figure',
      [63, 20, 43],
      'figure-over-four-part-open-response',
      'label-unknowns-find-big-and-small-areas-then-subtract',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('find the area of each of the following figures')) {
    if (cropCount !== 2 || equationLineCount !== 2) return undefined;
    return reviewed(
      'two-dimensioned-composite-rectangle-figures',
      2,
      'two-tight-official-composite-figure-illustrations',
      [19, 10],
      'two-vertical-source-figures-over-two-area-lines',
      'decompose-or-complete-each-figure-and-find-area',
      { sourceFirst: true, sourceCropCount: 2 }
    );
  }
  if (sourcePrompt.startsWith('the figure below shows a small rectangle in a big rectangle')) {
    if (cropCount !== 1 || !hasResponse()) return undefined;
    return reviewed(
      'six-by-five-frame-minus-three-by-two-interior',
      1,
      'tight-official-labeled-frame-figure',
      [30, 6, 24],
      'figure-over-open-response',
      'subtract-interior-rectangle-from-outer-rectangle',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('a paper rectangle has a length of 6 inches')) {
    if (!(isBlank ? hasResponse() : same(arrayCounts, [48, 9]) && equationLineCount === 3)) return undefined;
    return reviewed(
      'six-by-eight-paper-minus-three-by-three-square',
      1,
      'open-rdw-to-two-square-unit-arrays',
      [48, 9, 39],
      'vertical-open-response',
      'find-original-and-cutout-areas-then-subtract',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('tila and evan both have paper rectangles')) {
    if (!(isBlank ? hasResponse() : same(arrayCounts, [54, 12, 12]) && noteCount === 1)) return undefined;
    return reviewed(
      'equal-area-three-by-four-and-two-by-six-cutouts',
      1,
      'open-rdw-to-three-square-unit-arrays',
      [54, 12, 12, 42, 42],
      'vertical-open-response',
      'compare-two-cutout-areas-and-remaining-paper-areas',
      { openWorkspaceCount: 1 }
    );
  }

  const floorPlan = cropCount === 1 && all.find((section) =>
    section?.kind === 'source-crop' &&
    section.src === '/source-pages/m4-teacher/page-193.png'
  );
  if (sourcePrompt.startsWith('make a prediction which room looks like it has the biggest area')) {
    if (!floorPlan || !hasResponse()) return undefined;
    return reviewed(
      'shared-seven-room-floor-plan-prediction',
      1,
      'tight-official-shared-floor-plan-illustration',
      [60, 56, 42, 24, 25, 28, 88],
      'floor-plan-over-open-prediction',
      'predict-largest-room-from-visual-area',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('record the areas and show the strategy you used')) {
    const table = tables[0];
    if (!floorPlan || (table?.columns ?? []).length !== 3 || (table?.rows ?? []).length !== 7) return undefined;
    return reviewed(
      'shared-seven-room-floor-plan-area-strategy-table',
      7,
      'tight-official-shared-floor-plan-illustration+authored-area-table',
      [60, 56, 42, 24, 25, 28, 88],
      'floor-plan-over-seven-row-table',
      'record-seven-room-areas-and-show-decomposition-strategies',
      { rowCount: 7, columnCount: 3, sourceFirst: true, sourceCropCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('which room has the biggest area')) {
    if (!floorPlan || !hasResponse()) return undefined;
    return reviewed(
      'shared-seven-room-floor-plan-largest-room-check',
      1,
      'tight-official-shared-floor-plan-illustration',
      [88],
      'floor-plan-over-open-response',
      'identify-living-room-and-check-prediction',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('find the side lengths of the house without using your ruler')) {
    if (!floorPlan || !hasResponse()) return undefined;
    return reviewed(
      'shared-seven-room-floor-plan-house-side-lengths',
      1,
      'tight-official-shared-floor-plan-illustration',
      [19, 17],
      'floor-plan-over-open-response',
      'infer-whole-house-side-lengths-from-aligned-room-lengths',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('what is the area of the whole floor plan')) {
    if (!floorPlan || !hasResponse()) return undefined;
    return reviewed(
      'shared-seven-room-floor-plan-whole-area',
      1,
      'tight-official-shared-floor-plan-illustration',
      [323],
      'floor-plan-over-open-response',
      'multiply-whole-house-side-lengths-or-add-room-areas',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('record the new side lengths you have chosen for each of the rooms')) {
    const table = tables[0];
    if (
      (table?.columns ?? []).length !== 2 ||
      (table?.rows ?? []).length !== 7 ||
      !(table?.rows ?? []).every((row) =>
        row.length === 2 &&
        /\d+\s*sq\s*cm/i.test(row[0]) &&
        /^_+$/.test(String(row[1]).trim())
      ) ||
      noteCount !== 1
    ) return undefined;
    return reviewed(
      'seven-room-redesign-side-length-table',
      7,
      'authored-two-column-open-redesign-table',
      [60, 56, 42, 24, 25, 28, 88],
      'seven-vertical-room-rows-across-two-source-pages',
      'choose-new-side-lengths-and-verify-each-required-area',
      { rowCount: 7, columnCount: 2, openWorkspaceCount: 7 }
    );
  }

  return undefined;
}

function canonicalM4LessonsSixThroughTenLayout(sections, sourcePrompt, mode) {
  const isBlank = mode === 'blank';
  const flatten = (items) => items.flatMap((section) => [
    section,
    ...(section?.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flatten(card.sections ?? []))
      : [])
  ]);
  const all = flatten(sections);
  const arrays = all.filter((section) => section?.kind === 'array');
  const arrayCounts = arrays.map((array) => array.rows * array.columns);
  const cropCount = all.filter((section) => section?.kind === 'source-crop').length;
  const response = all.find((section) => section?.kind === 'source-response-workspace');
  const geometry = all.find((section) => section?.kind === 'geometry-diagram');
  const equations = all.filter((section) => section?.kind === 'equations');
  const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  const hasOpenResponse = () =>
    response &&
    (isBlank ? (response.parts ?? []).some((part) => part.openWorkspace) : true);
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });

  if (sourcePrompt.startsWith('draw to find the number of rows and columns in each array')) {
    const validBlank =
      cropCount === 6 &&
      same(arrayCounts, [15, 20, 12, 12, 30, 21]) &&
      equations.reduce((sum, section) => sum + (section.lines ?? []).length, 0) === 12;
    const validSolved = cropCount === 0 && same(arrayCounts, [30, 21, 15, 20, 12, 12]);
    if (!(isBlank ? validBlank : validSolved)) return undefined;
    return reviewed(
      'six-incomplete-to-six-completed-array-match',
      6,
      'tight-official-incomplete-arrays+authored-completed-square-arrays',
      [30, 21, 15, 20, 12, 12],
      'six-source-items-and-six-independent-match-targets',
      'draw-lines-complete-match-and-write-six-area-equations',
      { sourceFirst: true, sourceCropCount: 6 }
    );
  }

  const cropResponse = (family, subpartCount, primitive, modelCounts, orientation, structure, crops = 1) => {
    if (cropCount !== crops || !hasOpenResponse()) return undefined;
    return reviewed(
      family,
      subpartCount,
      primitive,
      modelCounts,
      orientation,
      structure,
      { sourceFirst: true, sourceCropCount: crops, openWorkspaceCount: 1 }
    );
  };

  if (sourcePrompt.startsWith('sheena skip counts by sixes')) {
    return cropResponse(
      'complete-six-by-eight-array-and-check-claim',
      1,
      'tight-official-incomplete-square-array',
      [48],
      'figure-over-open-response',
      'complete-array-and-explain-not-forty-two'
    );
  }
  if (sourcePrompt.startsWith('the tile floor in brandon')) {
    return cropResponse(
      'nine-by-ten-tile-floor-with-rug',
      1,
      'tight-official-rug-over-square-grid',
      [9, 10, 90],
      'figure-over-open-response',
      'count-covered-and-visible-floor-tiles'
    );
  }
  if (sourcePrompt.startsWith('abdul is creating a stained glass window')) {
    return cropResponse(
      'incomplete-stained-glass-border-array',
      1,
      'tight-official-incomplete-window-array',
      [42, 12, 30],
      'figure-over-open-response',
      'complete-array-and-find-missing-tiles'
    );
  }

  if (sourcePrompt.startsWith('use a straight edge to draw a grid of equal size squares')) {
    if (
      cropCount !== 1 ||
      equations.reduce((sum, section) => sum + (section.lines ?? []).length, 0) !== 6
    ) return undefined;
    return reviewed(
      'six-labeled-rectangles-on-common-perimeter-grid',
      6,
      'tight-official-a-through-f-floor-plan',
      [12, 20, 14, 28, 3, 8],
      'single-common-grid-over-six-equations',
      'grid-label-factor-pairs-and-find-six-areas',
      { sourceFirst: true, sourceCropCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('the area of benjamin')) {
    return cropResponse(
      'bedroom-perimeter-grid-to-nine-by-eleven-array',
      3,
      'tight-official-bedroom-perimeter-grid',
      [9, 11, 99],
      'figure-over-three-part-response',
      'label-draw-grid-and-find-total'
    );
  }
  if (sourcePrompt.startsWith('mrs young s art class')) {
    return cropResponse(
      'mural-perimeter-grid-area-check',
      1,
      'tight-official-mural-perimeter-grid',
      [35],
      'figure-over-open-response',
      'check-marked-area-and-explain'
    );
  }
  if (sourcePrompt.startsWith('mila skip counts by fours')) {
    if (!hasOpenResponse()) return undefined;
    return reviewed(
      'four-and-six-skip-count-common-array',
      2,
      'open-picture-number-and-word-response',
      [4, 6, 24],
      'vertical-two-part-response',
      'construct-common-array-and-give-possible-total',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt === 'write a multiplication equation to find the area of each rectangle') {
    if (
      geometry?.shapes?.length !== 3 ||
      equations.reduce((sum, section) => sum + (section.lines ?? []).length, 0) !== 3
    ) return undefined;
    return reviewed(
      'three-labeled-rectangle-area-equations',
      3,
      'authored-side-labeled-rectangles',
      [28, 56, 36],
      'three-horizontal-models',
      'multiply-side-lengths-for-three-areas'
    );
  }
  if (sourcePrompt.startsWith('write a multiplication equation and a division equation')) {
    if (
      geometry?.shapes?.length !== 3 ||
      equations.reduce((sum, section) => sum + (section.lines ?? []).length, 0) !== 6
    ) return undefined;
    return reviewed(
      'three-known-area-unknown-side-rectangles',
      3,
      'authored-side-labeled-rectangles',
      [72, 15, 28],
      'three-horizontal-models',
      'write-multiplication-and-division-equations'
    );
  }
  if (sourcePrompt.startsWith('on the grid below draw a rectangle that has an area of 42')) {
    const valid = isBlank ? cropCount === 1 : same(arrayCounts, [42]);
    if (!valid) return undefined;
    return reviewed(
      'forty-two-area-rectangle-on-official-grid',
      1,
      'tight-official-blank-square-grid',
      [42],
      'single-construction-grid',
      'draw-and-label-valid-factor-pair',
      { sourceFirst: true, sourceCropCount: 1, openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('ursa draws a rectangle')) {
    const valid = isBlank ? hasOpenResponse() : same(arrayCounts, [54]);
    if (!valid) return undefined;
    return reviewed(
      'nine-by-six-area-story-response',
      1,
      'open-response-to-square-unit-array',
      [54],
      'vertical-open-response',
      'multiply-side-lengths-and-explain',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('eliza s bedroom measures')) {
    const valid = isBlank ? hasOpenResponse() : same(arrayCounts, [42, 40]);
    if (!valid) return undefined;
    return reviewed(
      'compare-six-by-seven-and-five-by-eight-bedrooms',
      2,
      'open-response-to-two-square-unit-arrays',
      [42, 40],
      'two-horizontal-models',
      'calculate-compare-and-reject-equal-area-claim',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('cliff draws a rectangle')) {
    const valid = isBlank ? hasOpenResponse() : same(arrayCounts, [24]);
    if (!valid) return undefined;
    return reviewed(
      'known-area-and-side-find-other-side',
      1,
      'open-response-to-four-by-six-array',
      [24, 4],
      'vertical-open-response',
      'divide-area-by-known-side-and-explain',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('cut the grid into 2 equal rectangles')) {
    if (response?.kind !== 'source-response-workspace' || (response.parts ?? []).length !== 3) return undefined;
    return reviewed(
      'three-part-split-grid-into-equal-rectangles',
      3,
      'open-construction-equations-and-total',
      [50, 50, 100],
      'three-vertical-source-parts',
      'draw-label-find-one-area-and-total',
      { openWorkspaceCount: 3 }
    );
  }
  if (sourcePrompt.startsWith('place your 2 equal rectangles side by side')) {
    if (response?.kind !== 'source-response-workspace' || (response.parts ?? []).length !== 2) return undefined;
    return reviewed(
      'two-part-combine-equal-rectangles',
      2,
      'open-longer-rectangle-construction',
      [100],
      'two-vertical-source-parts',
      'draw-label-and-find-combined-area',
      { openWorkspaceCount: 2 }
    );
  }
  if (sourcePrompt.startsWith('furaha and rahema use square tiles')) {
    if (!same(arrayCounts, [24, 28]) || !hasOpenResponse()) return undefined;
    return reviewed(
      'combine-four-by-six-and-four-by-seven-arrays',
      3,
      'two-given-square-unit-arrays',
      [24, 28, 52],
      'two-horizontal-models-over-three-part-response',
      'label-find-combine-and-check-fifty-two',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('kiera says she can find the area')) {
    return cropResponse(
      'overlapping-a-b-area-addition-critique',
      1,
      'tight-official-overlapping-rectangle-diagram',
      [],
      'figure-over-open-response',
      'identify-double-counted-overlap'
    );
  }

  if (sourcePrompt.startsWith('label the side lengths of the shaded and unshaded rectangles')) {
    if (
      !same(arrayCounts, [56, 48, 78, 96]) ||
      arrays.some((array) => !array.shadeBeforeRows && !array.shadeBeforeColumns)
    ) return undefined;
    return reviewed(
      'four-shaded-distributive-area-arrays',
      4,
      'authored-two-tone-split-square-arrays',
      [56, 48, 78, 96],
      'two-by-two-source-panels',
      'label-parts-compute-partial-products-and-add'
    );
  }
  if (sourcePrompt.startsWith('vince imagines 1 more row of eight')) {
    if (
      !same(arrayCounts, [80]) ||
      arrays[0]?.splitAfterRows !== 9 ||
      arrays[0]?.shadeBeforeRows !== 9 ||
      !hasOpenResponse()
    ) return undefined;
    return reviewed(
      'nine-by-eight-plus-one-row-strategy',
      1,
      'authored-ten-by-eight-two-tone-split-array',
      [72, 8, 80],
      'array-over-open-explanation',
      'find-ten-rows-then-subtract-one-row',
      { openWorkspaceCount: 1 }
    );
  }
  if (sourcePrompt.startsWith('break the 15 x 5 rectangle')) {
    if (!same(arrayCounts, [75]) || !hasOpenResponse()) return undefined;
    return reviewed(
      'fifteen-by-five-student-chosen-split',
      1,
      'authored-splittable-square-array',
      [75],
      'array-over-open-explanation',
      'shade-split-add-partial-areas-and-relate-to-total',
      { openWorkspaceCount: 1 }
    );
  }

  return undefined;
}

function canonicalM4LessonsOneThroughFiveLayout(sections, sourcePrompt, mode) {
  const primary = sections[0];
  const isBlank = mode === 'blank';
  const sourceResponse = (section, minimumParts = 1) =>
    section?.kind === 'source-response-workspace' &&
    (section.parts ?? []).length >= minimumParts &&
    (isBlank ? (section.parts ?? []).some((part) => part.openWorkspace) : true);
  const cardArrays = (section) =>
    section?.kind === 'card-grid'
      ? (section.cards ?? []).map((card) =>
          (card.sections ?? []).find((candidate) => candidate.kind === 'array'))
      : [];
  const counts = (arrays) => arrays.map((array) => array?.rows * array?.columns);
  const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  const reviewed = (
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    extra = {}
  ) => ({
    family,
    subpartCount,
    modelPrimitive,
    modelCounts,
    modelOrientation,
    responseStructure,
    ...extra
  });

  const patternBlockMatch = sourcePrompt.match(/^use (triangle|rhombus|trapezoid) pattern blocks to cover each shape below/);
  if (patternBlockMatch) {
    const expectedCount = patternBlockMatch[1] === 'triangle' ? 6 : patternBlockMatch[1] === 'rhombus' ? 3 : 2;
    if (
      sections.length !== 2 ||
      primary?.kind !== 'source-crop' ||
      sections[1]?.kind !== 'data-table' ||
      (sections[1].rows ?? []).length !== 2
    ) return undefined;
    return reviewed(
      `two-target-${patternBlockMatch[1]}-pattern-block-cover`,
      2,
      `official-parallelogram-and-hexagon-outlines+${patternBlockMatch[1]}-cover`,
      [expectedCount, expectedCount],
      'two-target-outlines',
      'draw-covering-lines-and-count'
    );
  }

  if (sourcePrompt.startsWith('how is the number of pattern blocks needed')) {
    if (!sourceResponse(primary)) return undefined;
    return reviewed(
      'pattern-block-size-relation-open-response',
      1,
      'open-written-explanation',
      [],
      'vertical-open-response',
      'explain-size-to-count-relation',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('use square pattern blocks to cover the rectangle')) {
    if (
      sections.length !== 2 ||
      primary?.kind !== 'geometry-diagram' ||
      sections[1]?.kind !== 'data-table' ||
      (sections[1].rows ?? []).length !== 1
    ) return undefined;
    return reviewed(
      'six-square-pattern-block-rectangle-cover',
      1,
      'official-rectangle-outline+square-cover',
      [6],
      'single-target-outline',
      'draw-covering-lines-and-count'
    );
  }

  if (sourcePrompt.startsWith('use trapezoid pattern blocks to cover the rectangle in problem 5')) {
    if (sections.length !== 2 || primary?.kind !== 'geometry-diagram' || !sourceResponse(sections[1])) return undefined;
    return reviewed(
      'trapezoid-non-cover-rectangle-explanation',
      1,
      'problem-5-rectangle-reference+open-response',
      [1],
      'figure-over-open-response',
      'attempt-cover-and-explain-gaps-or-overlaps',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('use all of paper strip')) {
    const validBlank =
      primary?.kind === 'data-table' &&
      (primary.columns ?? []).length === 3 &&
      (primary.rows ?? []).length === 3;
    const arrays = cardArrays(primary);
    const validSolved = arrays.length === 3 && same(counts(arrays), [12, 12, 12]);
    if (!(isBlank ? validBlank : validSolved)) return undefined;
    return reviewed(
      'three-paper-rectangle-drawing-and-area-chart',
      3,
      'three-row-open-drawing-area-chart',
      [3, 12],
      'three-vertical-source-rows',
      'draw-three-rectangles-and-record-area',
      { rowCount: 3, columnCount: 3 }
    );
  }

  if (sourcePrompt.startsWith('compare the areas of the rectangles you made')) {
    if (!sourceResponse(primary)) return undefined;
    return reviewed(
      'paper-strip-area-invariance-open-response',
      1,
      'open-comparison-explanation',
      [12, 12],
      'vertical-open-response',
      'compare-unit-size-and-area',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('maggie uses square units')) {
    const arrays = cardArrays(primary);
    if (!same(counts(arrays), [6, 6]) || !sourceResponse(sections[1])) return undefined;
    return reviewed(
      'two-six-square-unit-rectangle-comparison',
      2,
      'square-unit-arrays',
      [6, 6],
      'two-horizontal-models-over-response',
      'compare-and-explain-equal-area',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('count to find the area of the rectangle below')) {
    const arrays = cardArrays(primary);
    const validCounts = isBlank ? [8] : [8, 8];
    if (!same(counts(arrays), validCounts) || !sourceResponse(sections[1])) return undefined;
    return reviewed(
      'given-eight-unit-strip-and-equal-area-redraw',
      2,
      'square-unit-arrays',
      [8, 8],
      'given-model-over-open-redraw',
      'count-area-and-draw-different-equal-area-rectangle',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('each square is 1 square unit')) {
    const arrays = cardArrays(primary);
    const foundCounts = counts(arrays);
    const expectedCounts = same(foundCounts, [6, 12, 12, 20])
      ? [6, 12, 12, 20]
      : same(foundCounts, [6, 9, 16, 12])
        ? [6, 9, 16, 12]
        : undefined;
    if (!expectedCounts) return undefined;
    return reviewed(
      'four-labeled-square-unit-rectangles',
      4,
      'square-unit-arrays',
      expectedCounts,
      'four-source-models',
      'record-area-for-a-b-c-d'
    );
  }

  if (sourcePrompt.startsWith('how would the rectangles in problem 1 be different')) {
    if (!sourceResponse(primary)) return undefined;
    return reviewed(
      'two-part-unit-size-recreation-response',
      2,
      'open-grid-paper-recreation-and-explanation',
      [],
      'two-vertical-source-parts',
      'explain-and-recreate-on-two-unit-grids',
      { openWorkspaceCount: 2 }
    );
  }

  if (sourcePrompt.startsWith('use a separate piece of square centimeter grid paper')) {
    const arrays = cardArrays(primary);
    const valid = isBlank ? sourceResponse(primary) : same(counts(arrays), [8, 8, 8, 8]);
    if (!valid) return undefined;
    return reviewed(
      'four-eight-square-centimeter-rectangle-constructions',
      4,
      'square-unit-arrays',
      [8, 8, 8, 8],
      'four-source-models',
      'draw-four-different-equal-area-rectangles',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('use a ruler to measure the side lengths of the rectangle in centimeters')) {
    const valid = isBlank ? primary?.kind === 'geometry-diagram' : primary?.kind === 'array' && primary.rows * primary.columns === 14;
    if (!valid) return undefined;
    return reviewed(
      'measure-tile-and-count-centimeter-rectangle',
      1,
      'plain-rectangle-to-two-by-seven-array',
      [14],
      'single-measurement-figure',
      'measure-mark-connect-and-count'
    );
  }

  if (sourcePrompt.startsWith('use a ruler to measure the side lengths of the rectangle in inches')) {
    const valid = isBlank ? primary?.kind === 'geometry-diagram' : primary?.kind === 'array' && primary.rows * primary.columns === 6;
    if (!valid) return undefined;
    return reviewed(
      'measure-tile-and-count-inch-rectangle',
      1,
      'plain-rectangle-to-three-by-two-array',
      [6],
      'single-measurement-figure',
      'measure-mark-connect-and-count'
    );
  }

  if (sourcePrompt.startsWith('mariana uses square centimeter tiles')) {
    if (primary?.kind !== 'array' || primary.rows * primary.columns !== 12) return undefined;
    return reviewed(
      'label-three-by-four-tiled-rectangle',
      1,
      'square-unit-array',
      [12],
      'single-tiled-rectangle',
      'label-four-sides-and-count-area'
    );
  }

  const sourceCropOpenResponse = (family, primitive, modelCounts, responseStructure) => {
    if (
      sections.length !== 2 ||
      primary?.kind !== 'source-crop' ||
      !sourceResponse(sections[1])
    ) return undefined;
    return reviewed(
      family,
      1,
      primitive,
      modelCounts,
      'figure-over-open-response',
      responseStructure,
      { sourceFirst: true, sourceCropCount: 1 }
    );
  };

  if (sourcePrompt.startsWith('saffron says that the side length')) {
    return sourceCropOpenResponse(
      'four-by-five-grid-side-length-explanation',
      'tight-official-four-by-five-grid',
      [20],
      'identify-both-adjacent-side-lengths-and-explain'
    );
  }
  if (sourcePrompt.startsWith('use both square centimeter and square inch tiles')) {
    return sourceCropOpenResponse(
      'compare-centimeter-and-inch-tiles-on-rectangle',
      'tight-official-plain-rectangle',
      [],
      'tile-with-both-units-choose-and-explain'
    );
  }
  if (sourcePrompt.startsWith('how does knowing side lengths a and b')) {
    return sourceCropOpenResponse(
      'opposite-side-label-relation',
      'tight-official-a-b-c-d-rectangle',
      [4],
      'use-opposite-side-equality'
    );
  }

  if (sourcePrompt.startsWith('use the centimeter side of a ruler to draw in the tiles')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const validBlank =
      cards.length === 6 &&
      cards.every((card) =>
        (card.sections ?? []).length === 1 &&
        card.sections[0]?.kind === 'source-crop');
    const arrays = cardArrays(primary);
    const validSolved = same(counts(arrays), [18, 20, 18, 24, 20, 9]);
    if (!(isBlank ? validBlank : validSolved)) return undefined;
    return reviewed(
      'six-partially-tiled-rectangle-completions',
      6,
      'tight-official-partially-tiled-rectangle-figures',
      [18, 20, 18, 24, 20, 9],
      'two-by-three-source-panels',
      'draw-missing-tiles-skip-count-and-write-equations',
      { sourceFirst: true, sourceCropCount: 6 }
    );
  }

  if (sourcePrompt.startsWith('lindsey makes a rectangle with 35 square inch tiles')) {
    const valid = isBlank
      ? sourceResponse(primary)
      : primary?.kind === 'array' && primary.rows * primary.columns === 35;
    if (!valid) return undefined;
    return reviewed(
      'thirty-five-tile-five-row-story-response',
      1,
      'open-rdw-to-five-by-seven-array',
      [35],
      'vertical-open-response',
      'model-side-lengths-with-words-pictures-and-numbers',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('mark has a total of 24 square inch tiles')) {
    const arrays = cardArrays(primary);
    const valid = isBlank ? sourceResponse(primary) : same(counts(arrays), [18, 6]);
    if (!valid) return undefined;
    return reviewed(
      'split-twenty-four-tiles-into-two-arrays',
      2,
      'open-rdw-to-two-square-unit-arrays',
      [18, 6],
      'two-horizontal-models',
      'draw-two-arrays-and-write-equations',
      { openWorkspaceCount: 1 }
    );
  }

  if (sourcePrompt.startsWith('leon makes a rectangle with 32 square centimeter tiles')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const solvedArray = cards.flatMap((card) => card.sections ?? []).find((section) => section.kind === 'array');
    const valid = isBlank
      ? sourceResponse(primary)
      : cards.length === 2 && solvedArray?.rows * solvedArray?.columns === 32;
    if (!valid) return undefined;
    return reviewed(
      'thirty-two-tile-four-row-and-six-row-reasoning',
      2,
      'open-rdw-to-four-by-eight-array-and-divisibility-explanation',
      [32],
      'two-horizontal-source-parts',
      'solve-four-rows-and-explain-six-row-impossibility',
      { openWorkspaceCount: 1 }
    );
  }

  return undefined;
}

function canonicalM3LessonsSixteenThroughTwentyLayout(sections, sourcePrompt, mode) {
  const primary = sections[0];
  const isBlank = mode === 'blank';

  if (sourcePrompt.includes('complete the multiplication and division statements')) {
    if (
      primary?.kind !== 'data-table' ||
      (primary.columns ?? []).length !== 4 ||
      (primary.rows ?? []).length !== 2 ||
      !(primary.rows ?? []).every((row) => row.length === 4)
    ) return undefined;
    return {
      family: 'eight-zero-and-one-equation-statements',
      subpartCount: 8,
      rowCount: 2,
      columnCount: 4,
      printedEquationLineCount: 8,
      modelPrimitive: 'printed-equation-statements',
      modelCounts: [8],
      modelOrientation: 'two-by-four',
      responseStructure: 'complete-missing-factor-divisor-or-quotient'
    };
  }

  if (sourcePrompt.includes('match each equation with its solution')) {
    if (
      primary?.kind !== 'expression-match' ||
      primary.topShape !== 'mouse' ||
      primary.bottomShape !== 'cheese' ||
      (primary.topItems ?? []).length !== 6 ||
      (primary.bottomItems ?? []).length !== 6
    ) return undefined;
    return {
      family: 'six-mice-to-six-cheese-equation-match',
      subpartCount: 6,
      modelPrimitive: 'mouse-equation+cheese-solution',
      modelCounts: [6, 6],
      modelOrientation: 'two-horizontal-rows',
      responseStructure: 'draw-matching-lines'
    };
  }

  if (sourcePrompt.includes('complete the blanks with the products for 1 x 1 through n x 1')) {
    if (
      primary?.kind !== 'data-table' ||
      (primary.columns ?? []).length !== 10 ||
      (primary.rows ?? []).length !== 1 ||
      primary.rows[0].length !== 10
    ) return undefined;
    return {
      family: 'ten-term-multiply-by-one-pattern',
      subpartCount: 10,
      rowCount: 1,
      columnCount: 10,
      modelPrimitive: 'number-box-times-one-arrow',
      modelCounts: [10],
      modelOrientation: 'single-horizontal-line',
      instructionalModelFamily: 'identity-property-of-multiplication',
      responseStructure: 'complete-products-and-describe-pattern'
    };
  }

  if (sourcePrompt.includes('josie says that any number divided by 1')) {
    if (primary?.kind !== 'source-response-workspace' || (primary.parts ?? []).length !== 3) return undefined;
    return {
      family: 'three-part-divide-by-one-open-response',
      subpartCount: 3,
      openWorkspaceCount: 3,
      modelPrimitive: 'open-equation-picture-and-check',
      modelCounts: [],
      modelOrientation: 'vertical-source-parts',
      instructionalModelFamily: 'division-by-one',
      responseStructure: 'generalize-substitute-draw-and-check'
    };
  }

  if (sourcePrompt.includes('matt explains what he learned about dividing with zero')) {
    if (primary?.kind !== 'source-response-workspace' || (primary.parts ?? []).length !== 3) return undefined;
    return {
      family: 'three-part-dividing-with-zero-open-response',
      subpartCount: 3,
      openWorkspaceCount: 3,
      modelPrimitive: 'open-written-explanation',
      modelCounts: [],
      modelOrientation: 'vertical-source-parts',
      instructionalModelFamily: 'division-with-zero',
      responseStructure: 'explain-zero-dividend-zero-divisor-and-both'
    };
  }

  if (sourcePrompt.includes('write the products into the 1 by 1 through 8 by 8 multiplication table')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const table = cards[0]?.sections?.find((section) => section.kind === 'data-table');
    if (
      cards.length !== 2 ||
      (table?.columns ?? []).length !== 8 ||
      (table?.rows ?? []).length !== 8 ||
      !(table?.rows ?? []).every((row) => row.length === 8)
    ) return undefined;
    return {
      family: 'eight-by-eight-fact-table-and-four-analyses',
      subpartCount: 4,
      rowCount: 8,
      columnCount: 8,
      modelPrimitive: 'multiplication-fact-grid',
      modelCounts: [8, 8],
      modelOrientation: 'square-grid-over-open-responses',
      instructionalModelFamily: 'even-odd-and-distributive-fact-patterns',
      responseStructure: 'fill-color-explain-and-extend'
    };
  }

  if (sourcePrompt.includes('only the products on the diagonal are shown')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const table = cards[0]?.sections?.find((section) => section.kind === 'data-table');
    const modelCards = cards.slice(1, 7);
    const validModels = modelCards.length === 6 && modelCards.every((card, index) =>
      (card.sections ?? []).some((section) =>
        mode === 'solved' || index < 2
          ? section.kind === 'array' && section.rows === index + 1 && section.columns === index + 1
          : section.kind === 'source-response-workspace'
      )
    );
    if (
      cards.length !== 8 ||
      (table?.columns ?? []).length !== 6 ||
      (table?.rows ?? []).length !== 6 ||
      !validModels
    ) return undefined;
    return {
      family: 'diagonal-products-and-six-growing-square-arrays',
      subpartCount: 4,
      rowCount: 6,
      columnCount: 6,
      modelPrimitive: 'diagonal-fact-grid+growing-square-arrays',
      modelCounts: [6, 6],
      modelOrientation: 'diagonal-grid-over-six-horizontal-frames',
      instructionalModelFamily: 'square-numbers-as-consecutive-odd-sums',
      responseStructure: 'label-draw-describe-and-prove'
    };
  }

  const lessonEighteenLeads = [
    'rose has 6 pieces of yarn',
    'julio spends 29 minutes',
    'pearl buys 125 stickers',
    'tanner s beaker had 45 milliliters',
    'cora weighs 4 new identical pencils'
  ];
  if (lessonEighteenLeads.some((lead) => sourcePrompt.includes(lead))) {
    const blankStructure = primary?.kind === 'source-response-workspace' &&
      (primary.parts ?? []).length === 1 &&
      primary.parts[0].openWorkspace;
    const solvedStructure = ['tape', 'array', 'card-grid', 'data-table'].includes(primary?.kind);
    if (!(isBlank ? blankStructure : solvedStructure)) return undefined;
    return {
      family: 'open-rdw-two-step-story-response',
      subpartCount: 1,
      openWorkspaceCount: 1,
      modelPrimitive: 'open-student-workspace',
      modelCounts: [],
      modelOrientation: 'vertical-open-response',
      instructionalModelFamily: 'read-draw-write',
      responseStructure: 'model-equations-answer-and-reasonableness'
    };
  }

  if (sourcePrompt.includes('use the disks to fill in the blanks')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const arrays = cards.flatMap((card) => card.sections ?? []).filter((section) => section.kind === 'array');
    const equationCount = cards.flatMap((card) => card.sections ?? [])
      .filter((section) => section.kind === 'equations')
      .reduce((sum, section) => sum + (section.lines ?? []).length, 0);
    if (cards.length !== 2 || arrays.length !== 2 || !arrays.every((array) => array.rows * array.columns === 12) || equationCount !== 4) return undefined;
    return {
      family: 'one-disk-and-ten-disk-arrays',
      subpartCount: 2,
      printedEquationLineCount: 4,
      modelPrimitive: 'place-value-disk-array',
      modelCounts: [12, 12],
      modelOrientation: 'two-horizontal-panels',
      instructionalModelFamily: 'ones-to-tens-place-value-scaling',
      responseStructure: 'complete-unit-and-standard-equations'
    };
  }

  if (sourcePrompt.includes('use the chart to complete the blanks in the equations for 2 x 4 ones')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const counts = cards.map((card) => {
      const table = (card.sections ?? []).find((section) => section.kind === 'data-table');
      return JSON.stringify(table?.rows ?? []).match(/●/g)?.length ?? 0;
    });
    if (cards.length !== 6 || JSON.stringify(counts) !== JSON.stringify([8, 8, 15, 15, 20, 20])) return undefined;
    return {
      family: 'six-place-value-dot-charts',
      subpartCount: 6,
      printedEquationLineCount: 12,
      modelPrimitive: 'tens-ones-chart+grouped-dots',
      modelCounts: [8, 8, 15, 15, 20, 20],
      modelOrientation: 'two-by-three-source-panels',
      instructionalModelFamily: 'ones-to-tens-place-value-scaling',
      responseStructure: 'complete-unit-and-standard-equations'
    };
  }

  if (sourcePrompt.includes('fill in the blank to make each equation true')) {
    if (
      primary?.kind !== 'data-table' ||
      (primary.columns ?? []).length !== 2 ||
      (primary.rows ?? []).length !== 4 ||
      !(primary.rows ?? []).every((row) => row.length === 2)
    ) return undefined;
    return {
      family: 'eight-place-value-equation-blanks',
      subpartCount: 8,
      rowCount: 4,
      columnCount: 2,
      printedEquationLineCount: 8,
      modelPrimitive: 'printed-equation-table',
      modelCounts: [4, 2],
      modelOrientation: 'four-by-two',
      responseStructure: 'complete-equivalent-equations'
    };
  }

  if (sourcePrompt.includes('a bus can carry 40 passengers')) {
    const valid = isBlank
      ? primary?.kind === 'source-response-workspace' && primary.parts?.[0]?.openWorkspace
      : primary?.kind === 'tape' && (primary.parts ?? []).length === 6;
    if (!valid) return undefined;
    return {
      family: 'open-six-bus-tape-response',
      subpartCount: 1,
      openWorkspaceCount: 1,
      modelPrimitive: 'open-tape-diagram-workspace',
      modelCounts: [6],
      modelOrientation: 'horizontal-tape',
      instructionalModelFamily: 'six-groups-of-forty',
      responseStructure: 'model-and-answer'
    };
  }

  if (sourcePrompt.includes('use the chart to complete the equations') && sourcePrompt.includes('2 x 4 x 10')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const counts = cards.flatMap((card) => {
      const table = (card.sections ?? []).find((section) => section.kind === 'data-table');
      return (table?.rows ?? []).map((row) => JSON.stringify(row).match(/●/g)?.length ?? 0);
    });
    if (cards.length !== 4 || JSON.stringify(counts) !== JSON.stringify([8, 8, 4, 8, 15, 15, 5, 15])) return undefined;
    return {
      family: 'four-times-ten-place-value-charts',
      subpartCount: 4,
      printedEquationLineCount: 12,
      modelPrimitive: 'tens-ones-chart+times-ten-arrow',
      modelCounts: [8, 8, 4, 8, 15, 15, 5, 15],
      modelOrientation: 'two-by-two-source-panels',
      instructionalModelFamily: 'associative-property-and-times-ten',
      responseStructure: 'complete-associated-equations-and-solve'
    };
  }

  if (sourcePrompt.includes('place parentheses in the equations to find the related fact')) {
    if (
      primary?.kind !== 'expression-match' ||
      primary.orientation !== 'pairs' ||
      primary.topShape !== 'book' ||
      (primary.topItems ?? []).length !== 4
    ) return undefined;
    return {
      family: 'four-open-book-associated-equations',
      subpartCount: 4,
      printedEquationLineCount: 16,
      modelPrimitive: 'open-book-equation-frame',
      modelCounts: [4],
      modelOrientation: 'two-by-two',
      instructionalModelFamily: 'associative-property-and-times-ten',
      responseStructure: 'place-parentheses-use-related-fact-and-solve'
    };
  }

  if (sourcePrompt.includes('gabriella solves 20 x 4')) {
    if (primary?.kind !== 'source-response-workspace' || (primary.parts ?? []).length !== 1) return undefined;
    return {
      family: 'open-twenty-times-four-explanation',
      subpartCount: 1,
      openWorkspaceCount: 1,
      modelPrimitive: 'open-written-explanation',
      modelCounts: [],
      modelOrientation: 'vertical-open-response',
      instructionalModelFamily: 'regroup-twenty-times-four-as-ten-times-eight',
      responseStructure: 'explain-strategy'
    };
  }

  if (sourcePrompt.includes('there are 60 seconds in 1 minute')) {
    if (
      primary?.kind !== 'tape' ||
      (primary.parts ?? []).length !== 6 ||
      (primary.topParts ?? []).length !== 2 ||
      primary.topParts[0].partCount !== 5 ||
      primary.topParts[1].partCount !== 1
    ) return undefined;
    return {
      family: 'open-rdw-time-tape-response',
      subpartCount: 1,
      openWorkspaceCount: 1,
      modelPrimitive: 'six-part-time-tape',
      modelCounts: [5, 1],
      modelOrientation: 'horizontal-tape',
      instructionalModelFamily: 'five-minutes-plus-forty-five-seconds',
      responseStructure: 'tape-letter-equations-and-answer'
    };
  }

  if (sourcePrompt.includes('lupe saves $30 each month')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const crop = cards.flatMap((card) => card.sections ?? []).find((section) => section.kind === 'source-crop');
    const modeModel = cards.flatMap((card) => card.sections ?? []).some((section) =>
      isBlank
        ? section.kind === 'source-response-workspace'
        : section.kind === 'tape' && (section.parts ?? []).length === 4
    );
    if (
      cards.length !== 2 ||
      crop?.src !== '/source-pages/m3/lesson-21-page-91.png' ||
      crop?.crop?.width !== 390 ||
      crop?.crop?.height !== 215 ||
      !modeModel
    ) return undefined;
    return {
      family: 'art-supplies-illustration-and-open-rdw-response',
      subpartCount: 1,
      sourceCropCount: 1,
      openWorkspaceCount: 1,
      modelPrimitive: 'tight-art-supplies-price-illustration+open-workspace',
      modelCounts: [4, 30, 142],
      modelOrientation: 'illustration-left-response-right',
      instructionalModelFamily: 'four-groups-of-thirty-compared-with-price',
      responseStructure: 'model-letter-equation-compare-and-explain'
    };
  }

  const lessonTwentyOneStoryLeads = [
    'brad receives 5 cents',
    'a box of 10 markers weighs 105 grams',
    'mr perez buys 3 sets of cards',
    'ezra earns $9 an hour'
  ];
  if (lessonTwentyOneStoryLeads.some((lead) => sourcePrompt.includes(lead))) {
    const valid = isBlank
      ? primary?.kind === 'source-response-workspace' &&
        (primary.parts ?? []).length === 1 &&
        primary.parts[0].openWorkspace
      : primary?.kind === 'data-table' || primary?.kind === 'tape';
    if (!valid) return undefined;
    return {
      family: 'open-rdw-letter-story-response',
      subpartCount: 1,
      openWorkspaceCount: 1,
      modelPrimitive: 'open-student-workspace',
      modelCounts: [],
      modelOrientation: 'vertical-open-response',
      instructionalModelFamily: 'read-draw-write',
      responseStructure: 'model-letter-equations-and-answer'
    };
  }

  return undefined;
}

function canonicalM3LessonsElevenThroughFifteenLayout(sections, sourcePrompt, mode) {
  const primary = sections[0];
  const isBlank = mode === 'blank';
  const openResponse = primary?.kind === 'source-response-workspace' &&
    (primary.parts ?? []).length === 1 &&
    (!isBlank || (primary.parts ?? []).filter((part) => part.openWorkspace).length === 1);

  const lessonElevenStories = [
    ['ms santor divides 32 students', 'tape-diagram-and-letter-equation'],
    ['tara buys 6 packs of printer paper', 'tape-diagram-and-letter-equation'],
    ['mr reed spends $24 on coffee beans', 'tape-diagram-and-letter-equation'],
    ['eight boys equally share 4 packs of baseball cards', 'two-step-word-problem'],
    ['there are 8 bags of yellow and green balloons', 'two-step-word-problem'],
    ['the fruit seller packs 72 oranges', 'two-step-word-problem']
  ];
  for (const [promptLead, responseStructure] of lessonElevenStories) {
    if (!sourcePrompt.includes(promptLead)) continue;
    const isCoffee = promptLead.includes('coffee beans');
    const blankStructure = isCoffee
      ? primary?.kind === 'card-grid' &&
        (primary.cards ?? []).some((card) => (card.sections ?? []).some((section) =>
          section.kind === 'source-crop' &&
          section.src === '/source-pages/m3/lesson-11-page-46.png'
        ))
      : openResponse;
    const solvedStructure = responseStructure.startsWith('tape')
      ? primary?.kind === 'tape'
      : primary?.kind === 'card-grid' && (primary.cards ?? []).length === 3;
    if (!(isBlank ? blankStructure : solvedStructure)) return undefined;
    return {
      family: 'open-rdw-story-response',
      subpartCount: 1,
      modelPrimitive: isCoffee ? 'open-workspace+coffee-bag-illustration' : 'open-student-workspace',
      modelCounts: [],
      modelOrientation: 'vertical-open-response',
      openWorkspaceCount: 1,
      instructionalModelFamily: 'read-draw-write',
      responseStructure
    };
  }

  if (sourcePrompt.includes('has a value of 9 find the value of each row')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const blockCounts = cards.flatMap((card) =>
      (card.sections ?? [])
        .filter((section) => section.kind === 'array' && section.item === 'block')
        .map((section) => section.rows * section.columns)
    );
    const equationLineCount = cards.reduce((sum, card) =>
      sum + (card.sections ?? [])
        .filter((section) => section.kind === 'equations')
        .reduce((lineSum, section) => lineSum + (section.lines ?? []).length, 0), 0
    );
    if (
      cards.length !== 4 ||
      JSON.stringify(blockCounts) !== JSON.stringify([5, 1, 5, 2, 5, 3, 5, 4]) ||
      equationLineCount !== 16
    ) return undefined;
    return {
      family: 'four-source-3d-block-row-decompositions',
      subpartCount: 4,
      printedEquationLineCount: 16,
      modelPrimitive: '3d-block-row',
      modelCounts: [5, 1, 5, 2, 5, 3, 5, 4],
      knownModelCounts: [5, 5, 5, 5],
      modelOrientation: 'two-by-two',
      instructionalModelFamily: 'five-units-plus-extra-units',
      responseStructure: 'block-rows-and-distributive-equations'
    };
  }

  if (sourcePrompt.includes('find the total value of the shaded blocks')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const tapes = cards.flatMap((card) => (card.sections ?? []).filter((section) => section.kind === 'tape'));
    const correctStrips = tapes.length === 4 && tapes.every((tape) =>
      (tape.parts ?? []).length === 10 &&
      (tape.parts ?? []).filter((part) => part.emphasize).length === 9 &&
      (tape.parts ?? []).filter((part) => part.muted).length === 1
    );
    if (!correctStrips) return undefined;
    return {
      family: 'four-ten-unit-minus-one-strips',
      subpartCount: 4,
      modelPrimitive: 'shaded-block-strip',
      modelCounts: [10, 10, 10, 10],
      knownModelCounts: [9, 9, 9, 9],
      modelOrientation: 'two-by-two-horizontal-strips',
      instructionalModelFamily: 'nine-equals-ten-minus-one',
      responseStructure: 'strip-decomposition-and-subtraction'
    };
  }

  if (sourcePrompt.includes('matt buys a pack of postage stamps')) {
    if (!openResponse) return undefined;
    return {
      family: 'open-nine-equals-ten-minus-one-strategy',
      subpartCount: 1,
      modelPrimitive: 'open-written-strategy',
      modelCounts: [],
      modelOrientation: 'vertical-open-response',
      openWorkspaceCount: 1,
      instructionalModelFamily: 'nine-equals-ten-minus-one',
      responseStructure: 'show-strategy'
    };
  }

  if (sourcePrompt.includes('match') && sourcePrompt.includes('products and quotients') && sourcePrompt.includes('nines facts')) {
    if (
      primary?.kind !== 'expression-match' ||
      primary.topShape !== 'helicopter' ||
      primary.bottomShape !== 'cloud' ||
      (primary.topItems ?? []).length !== 10 ||
      (primary.bottomItems ?? []).length !== 10
    ) return undefined;
    return {
      family: 'helicopter-to-cloud-nine-fact-match',
      subpartCount: 10,
      modelPrimitive: 'helicopter-expression+cloud-number',
      modelCounts: [10, 10],
      modelOrientation: 'left-and-right-columns',
      responseStructure: 'draw-matching-lines'
    };
  }

  if (sourcePrompt.includes('skip count by nine') && sourcePrompt.includes('tens place')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const table = cards[0]?.sections?.find((section) => section.kind === 'data-table');
    if (cards.length !== 2 || (table?.rows?.[0] ?? []).length !== 10) return undefined;
    return {
      family: 'count-by-nine-line-and-place-patterns',
      subpartCount: 3,
      modelPrimitive: 'ten-term-count-by-line',
      modelCounts: [10],
      modelOrientation: 'horizontal-line-over-two-responses',
      responseStructure: 'complete-sequence-and-describe-patterns'
    };
  }

  if (sourcePrompt.includes('complete to make true statements') && sourcePrompt.includes('add 10')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    if (
      cards.length !== 10 ||
      !cards.every((card) => (card.sections ?? []).some((section) =>
        section.kind === 'equations' && (section.lines ?? []).length === 3
      ))
    ) return undefined;
    return {
      family: 'ten-add-ten-subtract-one-statement-groups',
      subpartCount: 10,
      printedEquationLineCount: 30,
      modelPrimitive: 'equation-statements',
      modelCounts: [10, 3],
      modelOrientation: 'two-source-columns',
      instructionalModelFamily: 'add-ten-then-subtract-one',
      responseStructure: 'complete-three-statements-per-fact'
    };
  }

  if (sourcePrompt.includes('analyze the equations in problem 2')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const strategyTable = cards.flatMap((card) => card.sections ?? [])
      .find((section) => section.kind === 'data-table');
    if (cards.length !== 4 || (strategyTable?.rows ?? []).length !== 4) return undefined;
    return {
      family: 'four-part-nine-pattern-analysis',
      subpartCount: 4,
      modelPrimitive: 'written-response+printed-digit-table',
      modelCounts: [4],
      modelOrientation: 'vertical-source-parts',
      openWorkspaceCount: 3,
      instructionalModelFamily: 'digit-pattern-for-nines',
      responseStructure: 'analyze-extend-apply-counterexample'
    };
  }

  if (sourcePrompt.includes('each equation contains a letter representing the unknown')) {
    if (
      primary?.kind !== 'expression-match' ||
      primary.orientation !== 'pairs' ||
      primary.topShape !== 'car' ||
      (primary.topItems ?? []).length !== 9
    ) return undefined;
    return {
      family: 'nine-equation-cars-and-decoder-riddle',
      subpartCount: 9,
      decoderSlotCount: 15,
      decoderValues: [6, 8, 8, 6, 9, 6, 3, 8, 45, 2, 4, 9, 90, 3, 7],
      modelPrimitive: 'equation-car',
      modelCounts: [9],
      modelOrientation: 'three-by-three-cars-over-decoder',
      responseStructure: 'solve-unknowns-and-decode-riddle'
    };
  }

  if (sourcePrompt.includes('multiply then add the tens digit and ones digit')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const table = cards.flatMap((card) => card.sections ?? []).find((section) => section.kind === 'data-table');
    if (cards.length !== 2 || (table?.rows ?? []).length !== 10 || (table?.columns ?? []).length !== 4) return undefined;
    return {
      family: 'ten-nine-facts-and-digit-sums',
      subpartCount: 3,
      rowCount: 10,
      columnCount: 4,
      modelPrimitive: 'fact-and-digit-sum-table',
      modelCounts: [10, 4],
      modelOrientation: 'vertical-paper-table',
      instructionalModelFamily: 'digit-sum-nine-check',
      responseStructure: 'compute-sum-describe-and-test'
    };
  }

  if (sourcePrompt.includes('araceli uses the number of groups in 8 x 9')) {
    if (!openResponse) return undefined;
    return {
      family: 'open-four-fact-digit-strategy-response',
      subpartCount: 1,
      modelPrimitive: 'open-written-strategy',
      modelCounts: [4],
      modelOrientation: 'vertical-open-response',
      openWorkspaceCount: 1,
      responseStructure: 'show-four-examples'
    };
  }

  if (sourcePrompt.includes('dennis calculates 9 x 8')) {
    if (!openResponse) return undefined;
    return {
      family: 'open-ten-minus-one-explanation',
      subpartCount: 1,
      modelPrimitive: 'open-written-explanation',
      modelCounts: [],
      modelOrientation: 'vertical-open-response',
      openWorkspaceCount: 1,
      instructionalModelFamily: 'nine-equals-ten-minus-one',
      responseStructure: 'explain-strategy'
    };
  }

  if (sourcePrompt.includes('sonya figures out the answer to 7 x 9')) {
    const cards = primary?.kind === 'card-grid' ? primary.cards ?? [] : [];
    const crop = cards.flatMap((card) => card.sections ?? []).find((section) => section.kind === 'source-crop');
    if (
      cards.length !== 2 ||
      crop?.src !== '/source-pages/m3/lesson-14-page-62.png' ||
      crop?.crop?.width !== 275 ||
      crop?.crop?.height !== 130
    ) return undefined;
    return {
      family: 'finger-photo-and-open-strategy-response',
      subpartCount: 1,
      sourceCropCount: 1,
      modelPrimitive: 'tight-finger-strategy-photo',
      modelCounts: [10, 1],
      modelOrientation: 'photo-left-response-right',
      instructionalModelFamily: 'nines-finger-strategy',
      responseStructure: 'answer-and-explain'
    };
  }

  const lessonFifteenLeads = [
    'mrs parson gave each of her grandchildren',
    'shiva pours 27 liters',
    'derek cuts 7 pieces of wire',
    'aunt deena and uncle chris share',
    'cara bought 9 packs of beads',
    'there are 8 erasers in a set'
  ];
  if (lessonFifteenLeads.some((lead) => sourcePrompt.includes(lead))) {
    const solvedStructure = primary?.kind === 'tape' || primary?.kind === 'array' || primary?.kind === 'data-table';
    if (!(isBlank ? openResponse : solvedStructure)) return undefined;
    return {
      family: 'open-equation-letter-and-answer-response',
      subpartCount: 1,
      modelPrimitive: 'open-student-workspace',
      modelCounts: [],
      modelOrientation: 'vertical-open-response',
      openWorkspaceCount: 1,
      instructionalModelFamily: 'unknown-in-multiplication-or-division',
      responseStructure: 'write-equation-use-letter-solve-answer'
    };
  }

  return undefined;
}

function canonicalM3LessonsSixThroughTenLayout(sections, sourcePrompt, mode) {
  const flattened = flattenVisualSections(sections);
  const first = sections[0];

  if (sourcePrompt.includes('label the tape diagrams') && sourcePrompt.includes('6 x 6')) {
    const tapes = flattened.filter((section) => section.kind === 'tape');
    const expectedCounts = [6, 7, 8, 9];
    const valid = tapes.length === 4 && tapes.every((tape, index) => {
      if (tape.parts?.length !== expectedCounts[index]) return false;
      if (mode === 'solved') return tape.parts.every((part) => normalizeText(part.label) === '6');
      return normalizeText(tape.parts[0]?.label) === '6' &&
        tape.parts.slice(1).every((part) => !normalizeText(part.label));
    });
    if (!valid) return unsupportedLayout(sections);
    return {
      family: 'four-quadrant-distributive-tapes',
      subpartCount: 4,
      modelPrimitive: 'tape-diagram',
      modelCounts: expectedCounts,
      knownModelCounts: [5, 5, 5, 5],
      modelOrientation: 'two-by-two',
      instructionalModelFamily: 'five-groups-plus-remaining-groups',
      responseStructure: 'labeled-tape-and-distributive-equations'
    };
  }

  const divisionBondMatch = sourcePrompt.match(/\b(54|49|56|72) divided by\b/);
  if (sourcePrompt.includes('break apart') && sourcePrompt.includes('solve') && divisionBondMatch) {
    const whole = divisionBondMatch[1];
    const bond = flattened.find((section) => section.kind === 'number-bond');
    if (!bond || normalizeText(bond.whole) !== normalizeText(`${whole} divided by ${whole === '54' ? 6 : whole === '49' ? 7 : 8}`) || bond.parts?.length !== 2) {
      return unsupportedLayout(sections);
    }
    return {
      family: 'division-number-bond',
      subpartCount: 1,
      modelPrimitive: 'number-bond',
      modelCounts: [2],
      modelOrientation: 'whole-over-two-parts',
      instructionalModelFamily: 'distribute-division-over-divisible-parts',
      responseStructure: 'number-bond-and-quotient-equations'
    };
  }

  if (sourcePrompt.includes('robert says that he can solve 6 x 8')) {
    const blankValid = first?.kind === 'source-response-workspace' && first.parts?.length === 1 && first.parts[0]?.openWorkspace;
    const solvedArrays = flattened.filter((section) => section.kind === 'array');
    const solvedValid = solvedArrays.length === 2 &&
      solvedArrays[0].rows === 5 && solvedArrays[0].columns === 8 &&
      solvedArrays[1].rows === 1 && solvedArrays[1].columns === 8;
    if (mode === 'blank' ? !blankValid : !solvedValid) return unsupportedLayout(sections);
    return {
      family: 'open-picture-and-explanation',
      subpartCount: 1,
      modelPrimitive: 'student-drawing-or-solved-array',
      modelCounts: [6, 8],
      modelOrientation: 'open-workspace',
      openWorkspaceCount: 1,
      instructionalModelFamily: 'five-groups-plus-one-group',
      responseStructure: 'draw-decide-explain'
    };
  }

  if (sourcePrompt.includes('kelly solves 42 divided by 7')) {
    const bond = flattened.find((section) => section.kind === 'number-bond');
    if (!bond || normalizeText(bond.whole) !== '42 divided by 7' || bond.parts?.length !== 2) {
      return unsupportedLayout(sections);
    }
    return {
      family: 'student-authored-division-number-bond',
      subpartCount: 1,
      modelPrimitive: 'number-bond',
      modelCounts: [2],
      modelOrientation: 'whole-over-two-parts',
      openWorkspaceCount: 1,
      responseStructure: 'show-possible-number-bond-work'
    };
  }

  if (sourcePrompt === 'match the words to the correct equation') {
    const match = flattened.find((section) => section.kind === 'expression-match');
    if (
      !match ||
      match.topItems?.length !== 6 ||
      match.bottomItems?.length !== 6 ||
      match.orientation !== 'columns' ||
      match.topShape !== 'caterpillar' ||
      match.bottomShape !== 'leaf'
    ) return unsupportedLayout(sections);
    return {
      family: 'caterpillar-leaf-equation-match',
      subpartCount: 6,
      modelPrimitive: 'word-caterpillar+equation-leaf',
      modelCounts: [6, 6],
      modelOrientation: 'left-and-right-columns',
      responseStructure: 'draw-matching-lines'
    };
  }

  if (sourcePrompt.includes('tape diagram shows six equal parts labeled 8')) {
    const tape = flattened.find((section) => section.kind === 'tape');
    if (
      !tape ||
      tape.parts?.length !== 6 ||
      !tape.parts.every((part) => normalizeText(part.label) === '8') ||
      normalizeText(tape.braces?.[0]?.label).split(' ')[0] !== 'k'
    ) return unsupportedLayout(sections);
    return {
      family: 'unknown-whole-tape-diagram',
      subpartCount: 1,
      modelPrimitive: 'tape-diagram',
      modelCounts: [6],
      knownModelCounts: [8],
      modelOrientation: 'horizontal',
      responseStructure: 'equation-and-unknown-value'
    };
  }

  if (sourcePrompt.includes('model each problem with a drawing')) {
    const blankValid = first?.kind === 'source-response-workspace' &&
      first.parts?.length === 4 &&
      first.parts.every((part) => part.openWorkspace);
    const solvedTapes = flattened.filter((section) => section.kind === 'tape');
    if (mode === 'blank' ? !blankValid : solvedTapes.length !== 4) return unsupportedLayout(sections);
    return {
      family: 'four-part-drawing-equation-response',
      subpartCount: 4,
      modelPrimitive: 'student-drawing-or-solved-tape',
      modelCounts: [4],
      modelOrientation: 'vertical-story-parts',
      openWorkspaceCount: 4,
      responseStructure: 'drawing-letter-equation-and-solution'
    };
  }

  if (sourcePrompt.includes('expressions with parentheses already shown')) {
    const tables = flattened.filter((section) => section.kind === 'data-table');
    if (
      tables.length !== 2 ||
      tables[0].rows?.length !== 8 ||
      tables[1].rows?.length !== 8 ||
      tables[0].rows?.[0]?.[0] !== 'a' ||
      tables[1].rows?.[0]?.[0] !== 'i'
    ) return unsupportedLayout(sections);
    return {
      family: 'two-column-parentheses-expression-bank',
      subpartCount: 16,
      modelPrimitive: 'equation-lines',
      modelCounts: [8, 8],
      modelOrientation: 'a-h-left+i-p-right',
      responseStructure: 'solve-each-expression'
    };
  }

  if (sourcePrompt === 'use parentheses to make the equations true') {
    const table = flattened.find((section) => section.kind === 'data-table');
    if (!table || table.rows?.length !== 5 || table.columns?.length !== 2) return unsupportedLayout(sections);
    return {
      family: 'two-column-parentheses-equation-grid',
      subpartCount: 10,
      modelPrimitive: 'equation-lines',
      modelCounts: [5, 2],
      modelOrientation: 'five-rows-by-two-columns',
      responseStructure: 'place-parentheses'
    };
  }

  if (
    sourcePrompt.includes('chad says it equals 8') ||
    sourcePrompt.includes('natasha solves 12') ||
    sourcePrompt.includes('find two possible answers to the expression 7')
  ) {
    const blankValid = first?.kind === 'source-response-workspace' && first.parts?.length === 1 && first.parts[0]?.openWorkspace;
    const solvedValid = first?.kind === 'card-grid';
    if (mode === 'blank' ? !blankValid : !solvedValid) return unsupportedLayout(sections);
    return {
      family: 'open-parentheses-written-response',
      subpartCount: 1,
      modelPrimitive: 'equation-and-open-workspace',
      modelCounts: [],
      modelOrientation: 'vertical-written-response',
      openWorkspaceCount: 1,
      responseStructure: 'place-parentheses-solve-and-explain'
    };
  }

  if (sourcePrompt.includes('use the array to complete the equation')) {
    const arrays = flattened.filter((section) => section.kind === 'array');
    if (
      arrays.length !== 4 ||
      arrays[0].item !== 'triangle' || arrays[0].rows !== 3 || arrays[0].columns !== 12 ||
      arrays[1].item !== 'triangle' || arrays[1].groupEveryColumns !== 3 ||
      arrays[2].item !== 'circle' || arrays[2].rows !== 3 || arrays[2].columns !== 14 ||
      arrays[3].item !== 'circle' || arrays[3].groupEveryColumns !== 2
    ) return unsupportedLayout(sections);
    return {
      family: 'paired-source-and-regrouped-arrays',
      subpartCount: 4,
      modelPrimitive: 'triangle-array+circle-array',
      modelCounts: [3, 12, 4, 3, 14, 7],
      modelOrientation: 'three-rows-with-column-groups',
      instructionalModelFamily: 'associative-regrouping',
      responseStructure: 'array-and-equation-pairs'
    };
  }

  if (sourcePrompt.includes('place parentheses in the equations to simplify')) {
    const match = flattened.find((section) => section.kind === 'expression-match');
    if (
      !match ||
      match.orientation !== 'pairs' ||
      match.topShape !== 'scroll' ||
      match.bottomShape !== 'tag' ||
      match.topItems?.length !== 6 ||
      match.bottomItems?.length !== 6
    ) return unsupportedLayout(sections);
    return {
      family: 'scroll-and-answer-tag-grid',
      subpartCount: 6,
      modelPrimitive: 'equation-scroll+answer-tag',
      modelCounts: [6, 6],
      modelOrientation: 'two-rows-by-three-columns',
      responseStructure: 'regroup-equation-and-solve'
    };
  }

  if (sourcePrompt.includes('charlotte finds the answer to 16 x 2')) {
    const blankValid = first?.kind === 'source-response-workspace' && first.parts?.[0]?.openWorkspace;
    const solvedArrays = flattened.filter((section) => section.kind === 'array');
    if (mode === 'blank' ? !blankValid : solvedArrays.length !== 2) return unsupportedLayout(sections);
    return {
      family: 'open-associative-strategy-explanation',
      subpartCount: 1,
      modelPrimitive: 'open-explanation-or-solved-arrays',
      modelCounts: [16, 2, 8, 4],
      modelOrientation: 'open-written-response',
      openWorkspaceCount: 1,
      responseStructure: 'explain-equivalent-regrouping'
    };
  }

  if (sourcePrompt.includes('label the arrays') && sourcePrompt.includes('8 x 8')) {
    const arrays = flattened.filter((section) => section.kind === 'array');
    if (
      arrays.length !== 2 ||
      arrays[0].rows !== 8 || arrays[0].columns !== 8 ||
      arrays[1].rows !== 9 || arrays[1].columns !== 8 ||
      arrays.some((array) => array.splitAfterColumns !== 5 || array.outlineAfterColumns !== 5)
    ) return unsupportedLayout(sections);
    return {
      family: 'two-distributive-arrays-split-after-five-columns',
      subpartCount: 2,
      modelPrimitive: 'circle-array',
      modelCounts: [8, 8, 9, 8],
      knownModelCounts: [5, 5],
      modelOrientation: 'vertical-rows-by-eight-columns',
      instructionalModelFamily: 'eight-times-five-plus-remaining-columns',
      responseStructure: 'labeled-array-and-distributive-equations'
    };
  }

  if (sourcePrompt.includes('octagon has 8 sides')) {
    const diagram = flattened.find((section) => section.kind === 'geometry-diagram');
    if (
      !diagram ||
      diagram.shapes?.length !== 9 ||
      !diagram.shapes.every((shape) => shape.shape === 'octagon')
    ) return unsupportedLayout(sections);
    return {
      family: 'nine-octagon-skip-count-chain',
      subpartCount: 9,
      modelPrimitive: 'octagon',
      modelCounts: [9],
      knownModelCounts: [8, 16],
      modelOrientation: 'alternating-horizontal-chain',
      responseStructure: 'skip-count-and-total-sentence'
    };
  }

  if (sourcePrompt.startsWith('multiply 8 x 6')) {
    const match = flattened.find((section) => section.kind === 'expression-match');
    if (
      !match ||
      match.orientation !== 'pairs' ||
      match.topShape !== 'boat' ||
      match.bottomShape !== 'catch-card' ||
      match.topItems?.length !== 6 ||
      match.bottomItems?.length !== 6
    ) return unsupportedLayout(sections);
    return {
      family: 'fishing-boat-fact-and-catch-card-grid',
      subpartCount: 6,
      modelPrimitive: 'boat-fact+catch-card',
      modelCounts: [6, 6],
      modelOrientation: 'two-rows-by-three-columns',
      responseStructure: 'multiply-and-record-product'
    };
  }

  if (sourcePrompt.startsWith('match each division expression')) {
    const match = flattened.find((section) => section.kind === 'expression-match');
    if (
      !match ||
      match.orientation !== 'columns' ||
      match.topShape !== 'umbrella' ||
      match.bottomShape !== 'raindrop' ||
      match.topItems?.length !== 6 ||
      match.bottomItems?.length !== 9
    ) return unsupportedLayout(sections);
    return {
      family: 'umbrella-to-raindrop-quotient-match',
      subpartCount: 6,
      modelPrimitive: 'umbrella-expression+raindrop-number',
      modelCounts: [6, 9],
      modelOrientation: 'left-and-right-columns',
      responseStructure: 'draw-matching-lines'
    };
  }

  return undefined;
}

function canonicalGenericLayout(sections) {
  const flattened = flattenVisualSections(sections);
  const equations = flattened.filter((section) => section.kind === 'equations');
  const core = flattened.filter((section) =>
    !['card-grid', 'equations', 'note', 'source-directions', 'solution-parts'].includes(section.kind)
  );
  if (!core.length) {
    return {
      family: 'open-written-response',
      subpartCount: 1,
      modelPrimitive: 'student-authored-or-absent',
      modelCounts: [],
      modelOrientation: 'open-workspace',
      printedEquationLineCount: equations.reduce((sum, section) => sum + (section.lines?.length ?? 0), 0),
      openWorkspaceCount: 1,
      responseStructure: 'open-response'
    };
  }
  if (core.every((section) => section.kind === 'source-response-workspace')) {
    const parts = core.flatMap((section) => section.parts ?? []);
    return {
      family: 'open-written-response',
      subpartCount: parts.length,
      modelPrimitive: 'open-written-response',
      modelCounts: [parts.length],
      modelOrientation: 'vertical-written-parts',
      printedEquationLineCount: equations.reduce((sum, section) => sum + (section.lines?.length ?? 0), 0),
      openWorkspaceCount: parts.filter((part) => part.openWorkspace).length,
      responseStructure: 'mode-preserving-written-response'
    };
  }

  const primitives = core.map((section) => neutralPrimitive(section));
  const counts = core.flatMap((section) => neutralCounts(section));
  const orientations = [...new Set(core.map((section) => neutralOrientation(section)))];
  return {
    family: primitives.length === 1 ? `${primitives[0]}-model` : 'composite-mathematical-model',
    subpartCount: Math.max(1, core.length),
    modelPrimitive: primitives.join('+'),
    modelCounts: counts,
    modelOrientation: orientations.join('+'),
    printedEquationLineCount: equations.reduce((sum, section) => sum + (section.lines?.length ?? 0), 0),
    openWorkspaceCount: 0,
    responseStructure: equations.length ? 'model-with-equation-response' : 'model-with-open-response'
  };
}

function flattenVisualSections(sections) {
  return (sections ?? []).flatMap((section) => [
    section,
    ...(section.kind === 'card-grid'
      ? (section.cards ?? []).flatMap((card) => flattenVisualSections(card.sections))
      : [])
  ]);
}

function neutralPrimitive(section) {
  const names = {
    'addition-studio': 'place-value-addition',
    'array': section.glyph ? 'grouped-object' : 'array',
    'clock': 'clock',
    'data-chart': 'graph',
    'data-table': 'table',
    'estimate-difference-workbook': 'estimate-and-difference',
    'expression-match': 'expression-match',
    'floor-plan': 'floor-plan',
    'fraction-strip': 'fraction-strip',
    'geometry-diagram': 'geometry-diagram',
    'line-plot': 'line-plot',
    'measurement-lab': 'measurement-model',
    'measurement-model': 'measurement-model',
    'number-bond': 'number-bond',
    'number-line': 'number-line',
    'related-facts': 'fact-family',
    'source-crop': 'source-illustration',
    'source-response-workspace': 'open-written-response',
    'stopwatch-workspace': 'stopwatch-table',
    'tape': 'tape-diagram',
    'time-number-line': 'time-number-line',
    'unknown-riddle-workspace': 'equation-riddle'
  };
  return names[section.kind] ?? section.kind;
}

function neutralCounts(section) {
  if (section.kind === 'array') return [section.rows ?? 0, section.columns ?? 0];
  if (section.kind === 'tape') return [section.parts?.length ?? 0];
  if (section.kind === 'fraction-strip') return [section.denominator ?? section.parts?.length ?? 0];
  if (section.kind === 'number-line' || section.kind === 'time-number-line') {
    return [section.points?.length ?? section.ticks?.length ?? 0];
  }
  if (section.kind === 'data-table') return [section.rows?.length ?? 0, section.columns?.length ?? 0];
  if (section.kind === 'data-chart') return [section.rows?.length ?? section.categories?.length ?? 0];
  if (section.kind === 'geometry-diagram') return [section.shapes?.length ?? 0];
  if (section.kind === 'number-bond') return [section.parts?.length ?? 0];
  if (section.kind === 'expression-match') {
    return [section.topItems?.length ?? 0, section.bottomItems?.length ?? 0];
  }
  if (section.kind === 'source-response-workspace') return [section.parts?.length ?? 0];
  return [];
}

function neutralOrientation(section) {
  if (section.kind === 'array') return `${section.rows ?? 0}-rows-by-${section.columns ?? 0}-columns`;
  if (['number-line', 'time-number-line', 'tape', 'fraction-strip'].includes(section.kind)) return 'horizontal';
  if (section.kind === 'data-table') return 'rows-and-columns';
  if (section.kind === 'data-chart') return section.orientation ?? 'chart';
  if (section.kind === 'source-response-workspace') return 'vertical-written-parts';
  return 'source-order';
}

function canonicalM3LessonTwoLayout(sections, sourcePrompt, mode) {
  if (sourcePrompt.includes('each block has a value of 7')) {
    const workspace = sections.find((section) => section.kind === 'unit-form-workspace');
    const parts = workspace?.parts ?? [];
    const hasSourceBlockModels =
      parts[0]?.promptSourceModel?.kind === 'source-crop' &&
      parts[0]?.sourceModel?.kind === 'source-crop' &&
      parts[1]?.sourceModel?.kind === 'source-crop';
    if (!hasSourceBlockModels) return unsupportedLayout(sections);
    return {
      family: 'two-stage-unit-form-model',
      subpartCount: parts.length,
      modelPrimitive: 'block',
      modelCounts: [5, 6],
      knownModelCounts: [5, 5],
      modelOrientation: 'vertical-stack',
      printedEquationLineCount: parts.reduce((sum, part) => sum + (part.lines?.length ?? 0), 0),
      openWorkspaceCount: 0,
      dividerCount: parts.filter((part) => part.dividerBefore).length,
      instructionalModelFamily: 'five-groups-plus-one-group',
      responseStructure: 'unit-form-facts-total'
    };
  }

  if (sourcePrompt.includes('each dot has a value of 8')) {
    const workspace = sections.find((section) => section.kind === 'unit-form-workspace');
    const parts = workspace?.parts ?? [];
    if (
      parts.length !== 2 ||
      parts[0]?.unitKind !== 'dot' ||
      parts[0]?.unitCount !== 5 ||
      (mode === 'blank' && !parts[1]?.openWorkspace) ||
      (mode === 'solved' && (parts[1]?.unitKind !== 'dot' || parts[1]?.unitCount !== 6))
    ) {
      return unsupportedLayout(sections);
    }
    return {
      family: 'unit-form-plus-open-model-workspace',
      subpartCount: 2,
      modelPrimitive: 'dot',
      modelCounts: [5, 6],
      knownModelCounts: [5, 5],
      modelOrientation: 'vertical-list',
      printedEquationLineCount: 3,
      openWorkspaceCount: 1,
      dividerCount: 0,
      instructionalModelFamily: 'five-groups-plus-one-group',
      responseStructure: 'unit-form-facts-total-then-open-explanation'
    };
  }

  if (sourcePrompt.includes('an author writes 9 pages')) {
    const workspace = sections.find((section) => section.kind === 'unit-form-workspace');
    const part = workspace?.parts?.[0];
    if (
      !part ||
      part.unitKind !== 'dot' ||
      part.unitCount !== 7 ||
      part.knownUnitCount !== 5
    ) {
      return unsupportedLayout(sections);
    }
    return {
      family: 'fives-fact-open-response',
      subpartCount: 1,
      modelPrimitive: 'group-marker',
      modelCounts: [7],
      knownModelCounts: [5],
      modelOrientation: 'vertical-list',
      printedEquationLineCount: 0,
      openWorkspaceCount: 1,
      dividerCount: 0,
      instructionalModelFamily: 'five-groups-plus-two-groups',
      responseStructure: 'open-read-draw-write'
    };
  }

  if (sourcePrompt.includes('32 crayons')) {
    const hasEquation = sections.some(
      (section) => section.kind === 'equations' && section.lines?.length === 1
    );
    const hasModeModel = mode === 'blank'
      ? sections.some((section) => section.kind === 'note')
      : sections.some(
          (section) =>
            section.kind === 'tape' &&
            section.parts?.length === 4 &&
            section.parts.every((part) => normalizeText(part.label) === '8')
        );
    if (!hasEquation || !hasModeModel) return unsupportedLayout(sections);
    return {
      family: 'equal-group-open-response',
      subpartCount: 1,
      modelPrimitive: 'equal-group',
      modelCounts: [4],
      knownModelCounts: [8],
      modelOrientation: 'horizontal',
      printedEquationLineCount: 0,
      openWorkspaceCount: 1,
      dividerCount: 0,
      instructionalModelFamily: 'four-groups-of-eight',
      responseStructure: 'open-read-draw-write'
    };
  }

  if (sourcePrompt.includes('hannah has $500')) {
    const grid = sections.find((section) => section.kind === 'card-grid');
    const hasMoneyTable = grid?.cards?.some((card) =>
      card.sections?.some((section) => section.kind === 'data-table')
    );
    const hasFourCalculations = grid?.cards?.some((card) =>
      card.sections?.some(
        (section) => section.kind === 'equations' && section.lines?.length === 4
      )
    );
    if (!hasMoneyTable || !hasFourCalculations) return unsupportedLayout(sections);
    return {
      family: 'two-step-money-open-response',
      subpartCount: 1,
      modelPrimitive: 'money-table',
      modelCounts: [4],
      knownModelCounts: [],
      modelOrientation: 'left-to-right',
      printedEquationLineCount: 0,
      openWorkspaceCount: 1,
      dividerCount: 0,
      instructionalModelFamily: 'multiply-subtract-compare',
      responseStructure: 'open-multistep-explanation'
    };
  }

  return undefined;
}

function unsupportedLayout(sections) {
  return {
    family: 'unsupported-or-composite',
    surfaceCount: sections.length,
    sectionKinds: sections.map((section) => section.kind)
  };
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[×]/g, ' x ')
    .replace(/[÷]/g, ' divided by ')
    .replace(/[−]/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9$]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function pngDimensions(path) {
  const image = readFileSync(path);
  if (
    image.length < 24 ||
    image.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a'
  ) {
    return undefined;
  }
  return {
    width: image.readUInt32BE(16),
    height: image.readUInt32BE(20)
  };
}

function format(value) {
  const serialized = JSON.stringify(value);
  return serialized && serialized.length > 240 ? `${serialized.slice(0, 237)}...` : serialized;
}
