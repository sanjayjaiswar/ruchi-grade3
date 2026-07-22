import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';
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
const repoRoot = dirname(appRoot);
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const contractsRoot = join(baselineRoot, 'contracts');
const generatedAt = new Date().toISOString();

const { STUDENT_WORK_SOURCE } = require(join(appRoot, 'src/app/data/student-work-source.generated.ts'));
const { STUDENT_WORKBOOK_SOURCE_PAGES } = require(join(appRoot, 'src/app/data/student-workbook-source-pages.generated.ts'));
const { LESSON_SOURCE_NOTES } = require(join(appRoot, 'src/app/data/lesson-source-notes.generated.ts'));

const expectedLessonCounts = { m1: 21, m2: 21, m3: 21, m4: 16, m5: 30, m6: 9, m7: 34 };
const modelPatterns = [
  ['array', /\barray|rows? of|columns? of/i],
  ['equal-groups', /equal groups?|groups? of|each group/i],
  ['tape-diagram', /tape diagram|strip diagram|bar model/i],
  ['number-bond', /number bond|decompose|break apart/i],
  ['number-line', /number line|tick mark|interval/i],
  ['clock', /analog clock|clock face|minute hand|hour hand|elapsed time/i],
  ['measurement-scale', /spring scale|weigh|weight|grams?|kilograms?|scale reads?/i],
  ['liquid-measure', /beaker|liter|milliliter|liquid volume|measuring bottle/i],
  ['ruler-or-length', /ruler|centimeter|meter strip|length/i],
  ['place-value', /place value|bundl|regroup|standard algorithm|vertical form/i],
  ['table-or-chart', /\btable\b|\bchart\b|multiplication table/i],
  ['graph-or-plot', /bar graph|picture graph|line plot|scaled graph|plot the data/i],
  ['fraction-model', /fraction strip|fraction number line|unit fraction|equal parts|halves|thirds|fourths|sixths|eighths/i],
  ['area-model', /area model|square units?|length × width|length x width/i],
  ['geometry-diagram', /polygon|quadrilateral|rectangle|rhombus|trapezoid|perimeter|angle/i],
  ['money-model', /\bdollar|\$|cents?|money|cost|change/i],
  ['picture-or-drawing', /draw|picture|diagram|illustration|shade|circle the/i]
];

mkdirSync(contractsRoot, { recursive: true });

const moduleIndex = {};
const lessonIndex = [];

for (const [moduleId, lessonCount] of Object.entries(expectedLessonCounts)) {
  ensureSourceCache(moduleId);
  const moduleNumber = Number(moduleId.slice(1));
  const pdfPath = teacherPdfPath(moduleNumber);
  const pdfFingerprint = sha256(pdfPath);
  const cacheTextPath = join(repoRoot, 'tmp', 'teacher-edition-cache', moduleId, 'teacher-edition-layout.txt');
  const pages = splitPdfPages(readFileSync(cacheTextPath, 'utf8'));
  const answerKeyStartPage = findAnswerKeyStartPage(pages);
  const sourceSearchEnd = answerKeyStartPage ? answerKeyStartPage - 1 : pages.length;
  const moduleContractsRoot = join(contractsRoot, moduleId);
  mkdirSync(moduleContractsRoot, { recursive: true });

  const moduleLessons = [];
  for (let lessonNumber = 1; lessonNumber <= lessonCount; lessonNumber += 1) {
    const lessonId = `${moduleId}-l${lessonNumber}`;
    const extractedSource = STUDENT_WORK_SOURCE[lessonId];
    if (!extractedSource) {
      throw new Error(`Missing generated student-work source for ${lessonId}.`);
    }

    const [fallbackLessonStart, fallbackLessonEnd] = parseLessonRange(extractedSource.teacherEditionSource, lessonId);
    const detectedLessonStart = findObjectivePage(pages, lessonNumber, sourceSearchEnd);
    const nextDetectedLessonStart = lessonNumber < lessonCount
      ? findObjectivePage(pages, lessonNumber + 1, sourceSearchEnd)
      : undefined;
    const lessonStart = detectedLessonStart ?? fallbackLessonStart;
    const lessonEnd = nextDetectedLessonStart ? nextDetectedLessonStart - 1 : fallbackLessonEnd;
    const lessonPages = pageRange(lessonStart, lessonEnd).map((pdfPage) => ({
      pdfPage,
      type: classifyLessonPage(pages[pdfPage - 1] ?? '', lessonNumber),
      text: cleanPageText(pages[pdfPage - 1] ?? '')
    }));
    const instructionalPages = lessonPages.filter((page) => !['problem-set', 'exit-ticket', 'homework', 'template', 'sprint'].includes(page.type));
    const instructionalText = instructionalPages.map((page) => page.text).join('\n\n');
    const lessonText = lessonPages.map((page) => `--- PDF PAGE ${page.pdfPage} (${page.type}) ---\n${page.text}`).join('\n\n');
    const problemSetPages = lessonPages.filter((page) => page.type === 'problem-set');
    const exitTicketPages = lessonPages.filter((page) => page.type === 'exit-ticket');
    const homeworkPages = lessonPages.filter((page) => page.type === 'homework');
    const answerKeyPages = pages
      .map((text, index) => ({ pdfPage: index + 1, text }))
      .filter((page) => page.pdfPage >= Math.max(answerKeyStartPage ?? 1, lessonEnd + 1) && new RegExp(`Lesson\\s+${lessonNumber}\\s+Answer Key`, 'i').test(page.text))
      .map((page) => ({ ...page, text: cleanPageText(page.text) }));

    const answerKeyText = answerKeyPages.map((page) => page.text).join('\n\n');
    let problemSetText = problemSetPages.map((page) => page.text).join('\n\n');
    const conceptText = extractLastBlock(instructionalText, /Concept Development(?:\s*\([^)]*\))?/ig, [/Problem Set\s*\(/i, /Student Debrief/i]);
    const applicationText = extractLastBlock(instructionalText, /Application Problem(?:\s*\([^)]*\))?/ig, [/Concept Development/i, /Fluency Practice/i, /Student Debrief/i]);
    const debriefText = extractLastBlock(instructionalText, /Student Debrief(?:\s*\([^)]*\))?/ig, [/Exit Ticket/i]);
    const problemSetGuidanceText = extractLastBlock(instructionalText, /Problem Set\s*\([^)]*\)/ig, [/Student Debrief/i]);
    const fluencyPracticeText = extractLastBlock(instructionalText, /Fluency Practice(?:\s*\([^)]*\))?/ig, [/Application Problem/i, /Concept Development/i, /Student Debrief/i]);
    const problemSetAnswerText = extractAnswerKeyProblemSet(answerKeyText);
    const objective = extractObjective(lessonPages[0]?.text ?? instructionalText, lessonNumber);
    const instructionalMode = detectInstructionalMode(objective, instructionalText, problemSetPages.length, conceptText);
    if (!problemSetText) {
      problemSetText = problemSetGuidanceText || extractedSource.problems.map((problem) => `${problem.number}. ${problem.prompt}`).join('\n\n');
    }
    const conceptSequence = extractDialogue(conceptText || fluencyPracticeText || instructionalText);
    const combinedLearningText = `${objective}\n${applicationText}\n${conceptText}\n${fluencyPracticeText}\n${problemSetText}`;
    const visualModels = detectModels(combinedLearningText);
    const problemNumbers = extractedSource.problems.map((problem) => problem.number);
    const promptExtractionWarnings = [];
    if (problemNumbers.some((number, index) => number !== index + 1)) {
      promptExtractionWarnings.push('Structured prompt numbering is nonconsecutive because the source page uses a multi-column or paired-item layout. Use problemSetText and source page images as controlling evidence.');
    }
    if (!problemSetAnswerText) {
      promptExtractionWarnings.push('No isolated Problem Set block was found in the answer-key text. Use answerKeyText as controlling evidence.');
    }

    const sourceImagePaths = STUDENT_WORKBOOK_SOURCE_PAGES[lessonId] ?? [];
    const teacherImagePaths = existingTeacherImages(moduleId, [
      ...problemSetPages.map((page) => page.pdfPage),
      ...answerKeyPages.map((page) => page.pdfPage)
    ]);
    const sourceNotes = LESSON_SOURCE_NOTES[lessonId] ?? {};

    const contract = {
      schemaVersion: 1,
      lessonId,
      moduleId,
      lessonNumber,
      generatedAt,
      source: {
        teacherEditionPdf: relative(repoRoot, pdfPath),
        teacherEditionSha256: pdfFingerprint,
        teacherEditionBytes: statSync(pdfPath).size,
        lessonPdfPages: { start: lessonStart, end: lessonEnd },
        problemSetPdfPages: problemSetPages.map((page) => page.pdfPage),
        exitTicketPdfPages: exitTicketPages.map((page) => page.pdfPage),
        homeworkPdfPages: homeworkPages.map((page) => page.pdfPage),
        answerKeyPdfPages: answerKeyPages.map((page) => page.pdfPage),
        studentWorkbookImages: sourceImagePaths,
        existingTeacherEditionImages: teacherImagePaths
      },
      objective,
      instructionalContract: {
        instructionalMode,
        applicationProblemText: applicationText,
        conceptDevelopmentText: conceptText,
        fluencyPracticeText,
        problemSetGuidanceText,
        studentDebriefText: debriefText || extractedSource.teacherDebrief,
        teacherStudentSequence: conceptSequence,
        teacherPrompts: conceptSequence.filter((turn) => turn.speaker === 'teacher').map((turn) => turn.text),
        debriefPrompt: sourceNotes.teacherMove ?? '',
        exitEvidence: sourceNotes.exitEvidence ?? ''
      },
      problemSet: {
        deliveryMode: problemSetPages.length ? 'problem-set-pages' : instructionalMode,
        structuredPromptStatus: promptExtractionWarnings.length ? 'review-source-layout' : 'ready',
        extractionWarnings: promptExtractionWarnings,
        extractedProblems: extractedSource.problems,
        problemSetText,
        answerKeyProblemSetText: problemSetAnswerText,
        answerKeyText,
        permitsVariableResponses: /answers? will vary|explanations? will vary|responses? will vary/i.test(problemSetAnswerText || answerKeyText)
      },
      visualContract: {
        modelsDetected: visualModels,
        sourceEvidence: Object.fromEntries(visualModels.map((model) => [model, evidenceLines(combinedLearningText, modelPatterns.find(([name]) => name === model)?.[1])])),
        sourceIllustrationRequired: /picture below|shown below|diagram below|illustration|use the array|use the graph|use the chart/i.test(problemSetText),
        animationSourceSequence: selectAnimationTurns(conceptSequence),
        rule: 'Animate or step through the Teacher Edition instructional sequence. Do not substitute a parallel example or decorative motion.'
      },
      deliveryContract: {
        blankMustShow: [
          'Every official Problem Set item in source order.',
          'All printed givens, labels, tables, diagrams, and response spaces needed to solve the item.',
          'The source-specific mathematical relationship, not a generic replacement.'
        ],
        blankMustHide: [
          'Answer-key completions and final answers.',
          'Solved reasoning, validation labels, or teacher-only evidence that leaks the response.'
        ],
        solvedMustShow: [
          'Every Problem Set answer supported by the Teacher Edition answer-key block.',
          'The mathematical model or reasoning sequence needed to understand the result.',
          'Units, labels, explanations, and variable-response criteria required by the source.'
        ],
        acceptanceRule: 'Teacher Edition drift is blocking. Pixel-perfect scan reproduction is not required when the live model preserves the same mathematics and learning sequence.'
      },
      sourceText: {
        lessonText,
        problemSetPages,
        answerKeyPages
      }
    };

    const contractRelativePath = `contracts/${moduleId}/lesson-${String(lessonNumber).padStart(2, '0')}.json`;
    writeJson(join(baselineRoot, contractRelativePath), contract);

    const indexEntry = {
      lessonId,
      moduleId,
      lessonNumber,
      objective,
      contract: contractRelativePath,
      lessonPdfPages: contract.source.lessonPdfPages,
      problemSetPdfPages: contract.source.problemSetPdfPages,
      answerKeyPdfPages: contract.source.answerKeyPdfPages,
      structuredProblemCount: extractedSource.problems.length,
      structuredPromptStatus: contract.problemSet.structuredPromptStatus,
      modelsDetected: visualModels
    };
    lessonIndex.push(indexEntry);
    moduleLessons.push(indexEntry);
  }

  moduleIndex[moduleId] = {
    moduleId,
    lessonCount,
    teacherEditionPdf: relative(repoRoot, pdfPath),
    teacherEditionSha256: pdfFingerprint,
    extractedPdfPageCount: pages.length,
    lessons: moduleLessons
  };
}

writeJson(join(baselineRoot, 'index.json'), {
  schemaVersion: 1,
  generatedAt,
  lessonCount: lessonIndex.length,
  moduleCount: Object.keys(moduleIndex).length,
  modules: moduleIndex,
  lessons: lessonIndex
});

writeJson(join(baselineRoot, 'schema.json'), {
  schemaVersion: 1,
  purpose: 'Precomputed Teacher Edition evidence for lesson repair and comparison.',
  controllingEvidenceOrder: [
    'problemSet.problemSetText and sourceText.problemSetPages',
    'problemSet.answerKeyProblemSetText and sourceText.answerKeyPages',
    'instructionalContract concept/application/debrief text',
    'problemSet.extractedProblems only when structuredPromptStatus is ready'
  ],
  contractSections: {
    source: 'PDF fingerprint, page ranges, and existing local images.',
    instructionalContract: 'Objective support, concept sequence, teacher prompts, and debrief evidence.',
    problemSet: 'Raw source text, structured prompts, answer-key evidence, and extraction warnings.',
    visualContract: 'Detected source models and animation sequence evidence.',
    deliveryContract: 'Blank, Solved, accuracy, and acceptance requirements.',
    sourceText: 'Durable raw Teacher Edition text fallback for the full lesson, Problem Set, and answer-key pages.'
  }
});

console.log(`CREATED: ${relative(repoRoot, baselineRoot)} with ${lessonIndex.length} lesson contracts.`);

function ensureSourceCache(moduleId) {
  execFileSync(process.execPath, [join(appRoot, 'scripts/prepare-teacher-edition-source.mjs'), moduleId], {
    cwd: appRoot,
    stdio: 'inherit'
  });
}

function teacherPdfPath(moduleNumber) {
  const sourceRoot = join(repoRoot, 'EurekaMath-Sources', `Module_${moduleNumber}`);
  const pdfName = readdirSync(sourceRoot).find((name) => name.toLowerCase().endsWith('.pdf') && name.toLowerCase().includes('teacher'));
  if (!pdfName) throw new Error(`No Teacher Edition PDF found for Module ${moduleNumber}.`);
  return join(sourceRoot, pdfName);
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function splitPdfPages(text) {
  const pages = text.split('\f');
  if (!pages.at(-1)?.trim()) pages.pop();
  return pages;
}

function findAnswerKeyStartPage(pages) {
  const index = pages.findIndex((page) => /\bLesson\s+1\s+Answer Key\b/i.test(page.replace(/\s+/g, ' ')));
  return index >= 0 ? index + 1 : undefined;
}

function findObjectivePage(pages, lessonNumber, searchEnd) {
  const objectivePattern = new RegExp(`\\bLesson\\s+${lessonNumber}\\b\\s+Objective:`, 'i');
  const index = pages.slice(0, searchEnd).findIndex((page) => objectivePattern.test(page.replace(/\s+/g, ' ')));
  return index >= 0 ? index + 1 : undefined;
}

function parseLessonRange(source, lessonId) {
  const match = source.match(/lesson pages\s+(\d+)-(\d+)/i);
  if (!match) throw new Error(`Missing Teacher Edition page range for ${lessonId}: ${source}`);
  return [Number(match[1]), Number(match[2])];
}

function pageRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function classifyLessonPage(text, lessonNumber) {
  if (new RegExp(`Lesson\\s+${lessonNumber}\\s+Problem Set`, 'i').test(text)) return 'problem-set';
  if (new RegExp(`Lesson\\s+${lessonNumber}\\s+Exit Ticket`, 'i').test(text)) return 'exit-ticket';
  if (new RegExp(`Lesson\\s+${lessonNumber}\\s+Homework`, 'i').test(text)) return 'homework';
  if (new RegExp(`Lesson\\s+${lessonNumber}\\s+(?:Template|Pattern Sheet)`, 'i').test(text)) return 'template';
  if (new RegExp(`Lesson\\s+${lessonNumber}\\s+Sprint`, 'i').test(text)) return 'sprint';
  if (/Student Debrief/i.test(text)) return 'debrief';
  if (/Concept Development/i.test(text)) return 'concept-development';
  if (/Application Problem/i.test(text)) return 'application-problem';
  return 'lesson-instruction';
}

function cleanPageText(text) {
  return text
    .replace(/\r/g, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

function extractObjective(text, lessonNumber) {
  const match = text.match(/Objective:\s*([\s\S]*?)(?:Suggested Lesson Structure|Standards|Lesson\s+\d+:)/i);
  if (!match) return `Objective text not isolated; read the first source page for Lesson ${lessonNumber}.`;
  return normalizeInline(match[1]);
}

function extractBlock(text, startPattern, endPatterns) {
  const start = text.search(startPattern);
  if (start < 0) return '';
  const tail = text.slice(start);
  const startMatch = tail.match(startPattern);
  const contentStart = start + (startMatch?.index ?? 0) + (startMatch?.[0]?.length ?? 0);
  const content = text.slice(contentStart);
  const endIndexes = endPatterns.map((pattern) => content.search(pattern)).filter((index) => index >= 0);
  const end = endIndexes.length ? Math.min(...endIndexes) : content.length;
  return cleanPageText(content.slice(0, end));
}

function extractLastBlock(text, globalStartPattern, endPatterns) {
  const matches = [...text.matchAll(globalStartPattern)];
  const match = matches.at(-1);
  if (!match || match.index === undefined) return '';
  const contentStart = match.index + match[0].length;
  const content = text.slice(contentStart);
  const endIndexes = endPatterns.map((pattern) => content.search(pattern)).filter((index) => index >= 0);
  const end = endIndexes.length ? Math.min(...endIndexes) : content.length;
  return cleanPageText(content.slice(0, end));
}

function detectInstructionalMode(objective, instructionalText, problemSetPageCount, conceptText) {
  if (/There is no Problem Set sheet/i.test(instructionalText)) return 'embedded-cooperative-problem-set';
  if (/resource booklets|Summer Practice packet|Summer Calendar/i.test(`${objective} ${instructionalText}`)) return 'resource-creation';
  if (!conceptText && /Solidify fluency|Fluency Practice\s*\(50 minutes\)/i.test(`${objective} ${instructionalText}`)) return 'fluency-review';
  if (!problemSetPageCount) return 'embedded-lesson-task';
  return 'concept-development';
}

function extractAnswerKeyProblemSet(text) {
  const lines = text.split('\n');
  const start = lines.findIndex((line) => /^\s*Problem Set\s*$/i.test(line));
  if (start < 0) return '';
  let end = lines.findIndex((line, index) => index > start && /^\s*(?:Exit Ticket|Homework|Assessment)\s*$/i.test(line));
  if (end < 0) end = lines.length;
  return cleanPageText(lines.slice(start + 1, end).join('\n'));
}

function extractDialogue(text) {
  const turns = [];
  let current;
  for (const rawLine of text.split('\n')) {
    const line = normalizeInline(rawLine);
    if (!line) continue;
    const match = line.match(/^(T|S):\s*(.*)$/);
    if (match) {
      current = { speaker: match[1] === 'T' ? 'teacher' : 'students', text: match[2] };
      turns.push(current);
    } else if (current && !/^(NOTES?|Materials|Part \d|Problem \d|Lesson \d|Module \d)/i.test(line)) {
      current.text = normalizeInline(`${current.text} ${line}`);
    }
  }
  return turns.filter((turn) => turn.text).slice(0, 160);
}

function detectModels(text) {
  return modelPatterns.filter(([, pattern]) => pattern.test(text)).map(([name]) => name);
}

function evidenceLines(text, pattern) {
  if (!pattern) return [];
  return text
    .split('\n')
    .map(normalizeInline)
    .filter((line) => line && pattern.test(line))
    .slice(0, 8);
}

function selectAnimationTurns(turns) {
  const instructional = turns.filter((turn) => /draw|show|write|count|move|turn|shade|label|plot|decompose|compare|notice|explain|model|solve/i.test(turn.text));
  return (instructional.length ? instructional : turns).slice(0, 24);
}

function normalizeInline(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function existingTeacherImages(moduleId, pdfPages) {
  const candidates = [];
  const directories = [`${moduleId}-teacher`, `${moduleId}-answer-key`, moduleId];
  for (const pdfPage of [...new Set(pdfPages)]) {
    const page = String(pdfPage).padStart(3, '0');
    for (const directory of directories) {
      for (const filename of [`page-${page}.png`, `teacher-page-${page}.png`]) {
        const absolute = join(appRoot, 'public/source-pages', directory, filename);
        if (existsSync(absolute)) candidates.push(`/source-pages/${directory}/${filename}`);
      }
    }
  }
  return [...new Set(candidates)];
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}
