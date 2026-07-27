import { parseTemplate } from '@angular/compiler';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.resolve(SCRIPT_DIR, '..');
const DATA_DIR = path.join(APP_DIR, 'src', 'app', 'data');
const COMPILED_DIR = path.join(APP_DIR, 'tmp', 'local-search', 'compiled');
const OUTPUT_FILE = path.join(APP_DIR, 'public', 'tmp', 'local-search-index.json');
const MODULE_OVERVIEW_TS = path.join(APP_DIR, 'src', 'app', 'pages', 'module-overview', 'module-overview.ts');
const HOME_HTML = path.join(APP_DIR, 'src', 'app', 'pages', 'home', 'home.html');

const FORBIDDEN_OUTPUT = [
  'solvedAnswer',
  'solvedVisual',
  'teacherEditionBasis',
  'teacherEditionReference',
  'teacherDebrief',
  'teacherMove',
  'teacherLookFor',
  'validationChecks',
  'sourceRefs',
  '/source-pages/',
  '.pdf',
  'answers will vary',
  'module not found',
  'Kyle saved $34 in May',
  '2 right triangles drawn and labeled'
];
const EXCLUDED_LITERAL_KEYS = new Set([
  'teacherPrompt',
  'teacherLookFor',
  'answer',
  'answerName',
  'assessmentCheckpoint'
]);
const MODULE_LITERAL_PROPERTIES = {
  m1: ['moduleOneConceptQuestions', 'moduleOneConceptProgression', 'moduleOneConceptClusters'],
  m2: ['moduleTwoConceptQuestions', 'moduleTwoConceptFlow', 'moduleTwoUnitCategories', 'moduleTwoConceptClusters'],
  m3: ['multiplicationDivisionVocabularyRows'],
  m4: [],
  m5: [],
  m6: [],
  m7: []
};
const VISUAL_TEXT_KEYS = new Set([
  'title',
  'label',
  'prompt',
  'blank',
  'caption',
  'alt',
  'text',
  'lead',
  'action',
  'result',
  'detail',
  'answerLine',
  'startLabel',
  'elapsedLabel',
  'stopLabel',
  'endLabel',
  'timeLabel',
  'wholeLabel',
  'wholeDetail',
  'partLabel',
  'leftLabel',
  'rightLabel',
  'totalLabel',
  'totalBlank',
  'referenceLabel',
  'unitLabel',
  'axisLabel',
  'keyLabel',
  'scaleLabel',
  'intervalLabel',
  'stripLabel',
  'challengeUnits',
  'steps',
  'columns',
  'rows',
  'items',
  'cards',
  'sections',
  'values',
  'categories',
  'ticks',
  'sourceData',
  'sourceDataRows',
  'shapes',
  'parts',
  'topParts',
  'braces',
  'lines',
  'topItems',
  'bottomItems',
  'points',
  'jumps',
  'groups'
]);

function normalizeText(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function uniqueText(values) {
  return Array.from(
    new Set(
      values
        .flat(Infinity)
        .map(normalizeText)
        .filter(Boolean)
        .filter(
          (value) =>
            !/\bteacher edition\b|\bteacher-edition\b|\banswer[- ]key\b|\bteacher source\b|\bteacher look\b|\bvalidation\b|\bsolved mode\b/i.test(
              value
            )
        )
    )
  );
}

function textOf(...values) {
  return uniqueText(values).join(' ');
}

function shortName(value, maxLength = 110) {
  const clean = normalizeText(value);
  if (clean.length <= maxLength) {
    return clean;
  }
  const boundary = clean.lastIndexOf(' ', maxLength);
  return `${clean.slice(0, boundary > maxLength * 0.6 ? boundary : maxLength).trim()}…`;
}

function compileDataModules() {
  fs.mkdirSync(COMPILED_DIR, { recursive: true });
  const entryPoints = [
    path.join(DATA_DIR, 'curriculum.data.ts'),
    path.join(DATA_DIR, 'module-concept-frames.ts'),
    path.join(DATA_DIR, 'lessons', 'lesson-registry.ts')
  ];
  const program = ts.createProgram(entryPoints, {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    rootDir: DATA_DIR,
    outDir: COMPILED_DIR,
    esModuleInterop: true,
    skipLibCheck: true,
    noCheck: true,
    noEmitOnError: false
  });
  const emitResult = program.emit();
  const diagnostics = emitResult.diagnostics
    .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  if (diagnostics.length) {
    const host = {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => APP_DIR,
      getNewLine: () => '\n'
    };
    throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, host));
  }
}

function literalValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }
  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }
  if (ts.isParenthesizedExpression(node)) {
    return literalValue(node.expression);
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map(literalValue).filter((value) => value !== undefined);
  }
  if (ts.isObjectLiteralExpression(node)) {
    const result = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) {
        continue;
      }
      const name = property.name.getText().replace(/^['"]|['"]$/g, '');
      const value = literalValue(property.initializer);
      if (value !== undefined) {
        result[name] = value;
      }
    }
    return result;
  }
  return undefined;
}

function flattenLiteral(value, parentKey = '') {
  if (typeof value === 'string') {
    return EXCLUDED_LITERAL_KEYS.has(parentKey) ? [] : [value];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => flattenLiteral(item, parentKey));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      EXCLUDED_LITERAL_KEYS.has(key) ? [] : flattenLiteral(item, key)
    );
  }
  return [];
}

function moduleOverviewLiterals() {
  const sourceText = fs.readFileSync(MODULE_OVERVIEW_TS, 'utf8');
  const source = ts.createSourceFile(MODULE_OVERVIEW_TS, sourceText, ts.ScriptTarget.Latest, true);
  const properties = new Map();
  let moduleConcepts = {};

  function visit(node) {
    if (ts.isPropertyDeclaration(node) && node.initializer && ts.isIdentifier(node.name)) {
      const value = literalValue(node.initializer);
      if (value !== undefined) {
        properties.set(node.name.text, value);
        if (node.name.text === 'moduleConcepts') {
          moduleConcepts = value;
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);

  return Object.fromEntries(
    Object.entries(MODULE_LITERAL_PROPERTIES).map(([moduleId, names]) => {
      const selected = names.flatMap((name) => flattenLiteral(properties.get(name)));
      const concepts = flattenLiteral(moduleConcepts[moduleId]);
      return [moduleId, uniqueText([selected, concepts])];
    })
  );
}

function staticTemplateText(fileName, excludedClassTokens = []) {
  const source = fs.readFileSync(fileName, 'utf8');
  const parsed = parseTemplate(source, fileName, { preserveWhitespaces: false });
  if (parsed.errors?.length) {
    throw new Error(parsed.errors.map((error) => error.toString()).join('\n'));
  }
  const values = [];

  function visit(node, inheritedSkip = false) {
    const attributes = [...(node.attributes ?? []), ...(node.templateAttrs ?? [])];
    const classValue = attributes.find((attribute) => attribute.name === 'class')?.value ?? '';
    const skip =
      inheritedSkip ||
      excludedClassTokens.some((token) => classValue.split(/\s+/).includes(token)) ||
      node.name === 'ng-template';
    if (!skip && typeof node.value === 'string') {
      const value = normalizeText(node.value);
      if (value) {
        values.push(value);
      }
    }
    for (const child of node.children ?? []) {
      visit(child, skip);
    }
  }
  parsed.nodes.forEach((node) => visit(node));
  return uniqueText(values);
}

function collectVisualText(value, parentKey = '') {
  if (typeof value === 'string') {
    return VISUAL_TEXT_KEYS.has(parentKey) ? [value] : [];
  }
  if (Array.isArray(value)) {
    return VISUAL_TEXT_KEYS.has(parentKey)
      ? value.flatMap((item) =>
          typeof item === 'string' ? [item] : collectVisualText(item, parentKey)
        )
      : [];
  }
  if (!value || typeof value !== 'object') {
    return [];
  }
  return Object.entries(value).flatMap(([key, item]) =>
    VISUAL_TEXT_KEYS.has(key) ? collectVisualText(item, key) : []
  );
}

function safeFrameText(frame) {
  if (!frame) {
    return [];
  }
  return [
    frame.title,
    frame.bigIdea,
    frame.modelLabel,
    frame.studentQuestion,
    frame.transform?.from,
    frame.transform?.action,
    frame.transform?.to,
    ...(frame.lessonBands ?? []).flatMap((band) => [band.label, band.lessons, band.focus])
  ];
}

function safeLessonText(lesson, runtime) {
  const animation = runtime?.lessonAnimation;
  const problemLesson = runtime?.problemSetCenteredLesson;
  return [
    lesson.title,
    lesson.objective,
    lesson.studentGoal,
    lesson.vocabulary,
    lesson.visualModels,
    runtime?.conceptTerms,
    animation?.title,
    animation?.context,
    animation?.equation,
    animation?.focus,
    ...(animation?.conceptSteps ?? []).flatMap((step) => [step.label, step.action, step.result]),
    collectVisualText(animation?.conceptVisual),
    problemLesson?.title,
    problemLesson?.concept,
    problemLesson?.contrast,
    ...(problemLesson?.conceptSections ?? []).flatMap((section) => [
      section.title,
      section.body,
      section.checkpoints
    ])
  ];
}

function safeActivityText(problem) {
  return [
    problem.sourcePrompt,
    problem.blankPrompts,
    problem.blankEquations,
    problem.blankAnswerSentence,
    problem.blankWorkspaceLabel,
    collectVisualText(problem.blankVisual)
  ];
}

const teacherContractCache = new Map();

function publicTeacherText(value) {
  return String(value ?? '')
    .replace(/\bTeacher Edition\b/gi, '')
    .replace(/\bAnswer Key\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function teacherProblemEvidence(moduleId, lessonNumber, problemCount, problemIndex) {
  const contractPath = path.join(
    APP_DIR,
    'teacher-edition-baseline',
    'contracts',
    moduleId,
    `lesson-${String(lessonNumber).padStart(2, '0')}.json`
  );
  if (!fs.existsSync(contractPath)) {
    throw new Error(`Missing Teacher Edition search evidence: ${contractPath}`);
  }
  let contract = teacherContractCache.get(contractPath);
  if (!contract) {
    contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
    teacherContractCache.set(contractPath, contract);
  }
  const extracted = contract.problemSet?.extractedProblems ?? [];
  if (extracted.length === problemCount && extracted[problemIndex]?.prompt) {
    return {
      problemSpecific: true,
      text: publicTeacherText(extracted[problemIndex].prompt)
    };
  }
  return {
    problemSpecific: false,
    text: publicTeacherText(contract.problemSet?.problemSetText)
  };
}

function assertSafe(records, counts) {
  const expectedRecords = 1 + counts.modules * 2 + counts.topics + counts.lessons + counts.activities;
  if (!counts.modules || !counts.topics || !counts.lessons || !counts.activities || counts.records !== expectedRecords) {
    throw new Error(`Incomplete derived search families: ${JSON.stringify(counts)}`);
  }
  const identities = new Set();
  for (const record of records) {
    if (!record.title || !record.text || !record.anchor) {
      throw new Error(`Incomplete search record: ${JSON.stringify(record)}`);
    }
    if (!record.url.startsWith('/ruchika-grade3') || record.url.includes(':')) {
      throw new Error(`Unsafe or unresolved search URL: ${record.url}`);
    }
    const identity = `${record.url}|${record.kind}`;
    if (identities.has(identity)) {
      throw new Error(`Duplicate search destination: ${identity}`);
    }
    identities.add(identity);
  }
  const output = JSON.stringify(records);
  for (const forbidden of FORBIDDEN_OUTPUT) {
    if (output.toLowerCase().includes(forbidden.toLowerCase())) {
      throw new Error(`Forbidden search-index content found: ${forbidden}`);
    }
  }
}

export async function generateLocalSearchIndex() {
  compileDataModules();
  const require = createRequire(import.meta.url);
  const curriculum = require(path.join(COMPILED_DIR, 'curriculum.data.js'));
  const registry = require(path.join(COMPILED_DIR, 'lessons', 'lesson-registry.js'));
  const frames = require(path.join(COMPILED_DIR, 'module-concept-frames.js'));
  const overviewLiterals = moduleOverviewLiterals();
  const homeTemplateText = staticTemplateText(HOME_HTML);

  const records = [];
  let topicCount = 0;
  let lessonCount = 0;
  let activityCount = 0;

  records.push({
    kind: 'home',
    title: 'Grade 3 Eureka Math',
    url: '/ruchika-grade3#curriculum-flow',
    text: textOf(homeTemplateText),
    anchor: 'curriculum-flow'
  });

  for (const module of curriculum.MODULES) {
    const moduleId = module.id;
    const frame = frames.MODULE_CONCEPT_FRAMES[moduleId];
    records.push({
      kind: 'module-concepts',
      title: `Module ${module.number}: ${module.title}`,
      url: `/ruchika-grade3/modules/${moduleId}#${moduleId}-concepts`,
      text: textOf(
        `Module ${module.number} M${module.number}`,
        module.title,
        module.summary,
        module.visualModels,
        safeFrameText(frame),
        overviewLiterals[moduleId]
      ),
      moduleId,
      moduleNumber: module.number,
      moduleTitle: module.title,
      anchor: `${moduleId}-concepts`
    });
    records.push({
      kind: 'module-topics',
      title: `Module ${module.number} topics and lessons`,
      url: `/ruchika-grade3/modules/${moduleId}#${moduleId}-topics`,
      text: textOf(
        `M${module.number}`,
        module.title,
        'Topics and lessons',
        module.topics.flatMap((topic) => [topic.label, topic.title, `${topic.days} days`])
      ),
      moduleId,
      moduleNumber: module.number,
      moduleTitle: module.title,
      anchor: `${moduleId}-topics`
    });

    for (const topic of module.topics) {
      topicCount += 1;
      const topicLessons = topic.lessonIds.map((lessonId) => {
        const lessonNumber = Number(lessonId.replace(/^m\d+-l/, ''));
        const lesson = curriculum.findLesson(moduleId, lessonNumber);
        return lesson ? [lesson.title, lesson.objective, lesson.studentGoal] : [];
      });
      records.push({
        kind: 'topic',
        title: `${topic.label}: ${topic.title}`,
        url: `/ruchika-grade3/modules/${moduleId}#${topic.id}`,
        text: textOf(`M${module.number}`, topic.label, topic.title, `${topic.days} days`, topicLessons),
        moduleId,
        moduleNumber: module.number,
        moduleTitle: module.title,
        topicId: topic.id,
        topicLabel: topic.label,
        topicTitle: topic.title,
        anchor: topic.id
      });

      for (const lessonId of topic.lessonIds) {
        const lessonNumber = Number(lessonId.replace(/^m\d+-l/, ''));
        const lesson = curriculum.findLesson(moduleId, lessonNumber);
        const runtime = registry.findLessonRuntime(moduleId, lessonNumber);
        if (!lesson || !runtime?.problemSetCenteredLesson) {
          throw new Error(`Missing problem-centered learner content for ${lessonId}`);
        }
        lessonCount += 1;
        records.push({
          kind: 'lesson',
          title: `Lesson ${lessonNumber}: ${lesson.title}`,
          url: `/ruchika-grade3/modules/${moduleId}/lessons/${lessonNumber}/concept#${lessonId}-concept`,
          text: textOf(
            `M${module.number} L${lessonNumber}`,
            topic.label,
            topic.title,
            safeLessonText(lesson, runtime)
          ),
          moduleId,
          moduleNumber: module.number,
          moduleTitle: module.title,
          topicId: topic.id,
          topicLabel: topic.label,
          topicTitle: topic.title,
          lessonId,
          lessonNumber,
          lessonTitle: lesson.title,
          anchor: `${lessonId}-concept`
        });

        for (const [problemIndex, problem] of runtime.problemSetCenteredLesson.problems.entries()) {
          activityCount += 1;
          const activityId = `${lessonId}-problem-${problem.number}`;
          const sourceFirst = problem.sourcePromptInVisual === true;
          const teacherEvidence = sourceFirst
            ? teacherProblemEvidence(
                moduleId,
                lessonNumber,
                runtime.problemSetCenteredLesson.problems.length,
                problemIndex
              )
            : undefined;
          records.push({
            kind: 'activity',
            title: sourceFirst && teacherEvidence?.problemSpecific
              ? `Problem ${problem.number}: ${shortName(teacherEvidence.text)}`
              : sourceFirst
              ? `Problem ${problem.number}: Official printed task`
              : `Problem ${problem.number}: ${shortName(problem.sourcePrompt)}`,
            url: `/ruchika-grade3/modules/${moduleId}/lessons/${lessonNumber}/problem-set/blank#${activityId}`,
            text: textOf(
              `M${module.number} L${lessonNumber} Problem ${problem.number}`,
              safeActivityText(problem),
              teacherEvidence?.text
            ),
            moduleId,
            moduleNumber: module.number,
            moduleTitle: module.title,
            topicId: topic.id,
            topicLabel: topic.label,
            topicTitle: topic.title,
            lessonId,
            lessonNumber,
            lessonTitle: lesson.title,
            activityId,
            problemNumber: problem.number,
            anchor: activityId
          });
        }
      }
    }
  }

  const counts = {
    modules: curriculum.MODULES.length,
    topics: topicCount,
    lessons: lessonCount,
    activities: activityCount,
    records: records.length
  };
  assertSafe(records, counts);
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  const payload = `${JSON.stringify({ version: 1, counts, records }, null, 2)}\n`;
  const temporaryOutput = `${OUTPUT_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryOutput, payload, 'utf8');
  fs.renameSync(temporaryOutput, OUTPUT_FILE);
  return { outputFile: OUTPUT_FILE, counts, bytes: Buffer.byteLength(payload) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await generateLocalSearchIndex();
  console.log(`Generated ${result.counts.records} local-search records (${result.bytes} bytes) at ${path.relative(APP_DIR, result.outputFile)}.`);
}
