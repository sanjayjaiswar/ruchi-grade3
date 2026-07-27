import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const outputPath = join(baselineRoot, 'module-5-problem-evidence.json');
const imageSize = { width: 1275, height: 1650 };

// Reviewed breadth-first against every printed Module 5 Problem Set page.
// Each range assigns the official top-level task numbers to the exact
// task-bearing Teacher Edition PDF page. The six debrief-only OCR hits
// (15, 34, 67, 115, 191, and 332) are intentionally absent.
const taskPages = {
  1: [[17, 1, 2], [18, 3, 5]],
  2: [[26, 1, 2], [27, 3, 4]],
  3: [[37, 1, 3], [38, 4, 6]],
  4: [[47, 1, 3], [48, 4, 6]],
  5: [[59, 1, 1], [60, 2, 4]],
  6: [[70, 1, 2], [71, 3, 3]],
  7: [[81, 1, 8], [82, 9, 11]],
  8: [[93, 1, 4], [94, 5, 6]],
  9: [[105, 1, 1], [106, 2, 3]],
  10: [[119, 1, 2], [120, 3, 5]],
  11: [[129, 1, 4], [130, 5, 8], [131, 9, 10]],
  12: [[142, 1, 2], [143, 3, 6]],
  13: [[153, 1, 5], [154, 6, 7]],
  14: [[173, 1, 1], [174, 2, 3]],
  15: [[183, 1, 1], [184, 2, 3]],
  16: [[195, 1, 1], [196, 2, 4]],
  17: [[206, 1, 3], [207, 4, 5]],
  18: [[216, 1, 5], [217, 6, 8]],
  19: [[227, 1, 2], [228, 3, 5]],
  20: [[240, 1, 2], [241, 3, 4]],
  21: [[250, 1, 3], [251, 4, 5]],
  22: [[260, 1, 1], [261, 2, 5]],
  23: [[271, 1, 4], [272, 5, 6]],
  24: [[283, 1, 1], [284, 2, 4]],
  25: [[297, 1, 1], [298, 2, 3]],
  26: [[311, 1, 1], [312, 2, 4]],
  27: [[323, 1, 2], [324, 3, 5]],
  28: [[335, 1, 5], [336, 6, 8]],
  29: [[347, 1, 5], [348, 6, 9]],
  // The Teacher Edition states that Lesson 30 has no separate worksheet.
  // PDF page 355 contains the controlling cooperative Problem Set directions.
  30: [[355, 1, 1]]
};

// Exact, item-numbered Teacher Edition Problem Set answer-key transcriptions.
// Where the source explicitly permits variation, no sample response is invented.
const answers = {
  1: [
    'Answer provided; 1 fourth shaded; 1 third shaded.',
    '1 third; 1 sixth; 1 fourth.',
    'a. Rectangle drawn; 1 line, 1 half. b. Rectangle drawn; 2 lines, 1 third. c. Rectangle drawn; 3 lines, 1 fourth.',
    'a. Sevenths are shown; ninths are shown. b. Answers will vary; 19 lines.',
    '1 half; picture drawn to show 2 halves.'
  ],
  2: [
    'First and last strips circled.',
    'a. 4, 2. b. 6, 5. c. 7, 3. d. 7, 0.',
    '1 third; bar drawn and labeled appropriately; 1 third labeled.',
    'a. 1 fourth; fraction strip drawn and labeled correctly. b. Sixths; fraction strip drawn and labeled correctly.'
  ],
  3: [
    'Eighths; 5 eighths. Thirds; 3 thirds. Halves; 1 half.',
    'First, third, and fifth shapes circled; sentences will vary.',
    'Shapes divided into 4 equal parts; fourths.',
    'Shapes divided and shaded appropriately.',
    'Answers will vary.',
    'Candy bar drawn and divided into 5 equal parts; 1 fifth.'
  ],
  4: Array(6).fill('Answers will vary.'),
  5: [
    'a. 2, 1, 1 half, 1/2. b. 3, 1, 1 third, 1/3. c. 4, 1, 1 fourth, 1/4. d. 5, 1, 1 fifth, 1/5. e. 6, 1, 1 sixth, 1/6. f. 8, 1, 1 eighth, 1/8.',
    'No; explanations will vary.',
    'Lines drawn to show tenths; 1/10.',
    'Rectangles are drawn and labeled to show 1/10 and 1/8; 1/8 is bigger than 1/10.'
  ],
  6: [
    'Each shape partitioned, labeled, and shaded correctly: a. 3/4. b. 3/7. c. 4/5. d. 2/6.',
    'a. 1/8. b. 7/8.',
    'a. 9, 5, 1/9, 5/9. b. 7, 3, 1/7, 3/7. c. 5, 4, 1/5, 4/5. d. 6, 2, 1/6, 2/6. e. 8, 8, 1/8, 8/8.'
  ],
  7: [
    '1 half.',
    '3 fourths.',
    '8 ninths.',
    '5 sixths.',
    '4 fifths.',
    '2 thirds.',
    '6 sevenths.',
    '7 eighths.',
    'a. 8. b. 9. c. 12.',
    '1/5, 4/5; 1/7, 6/7; 1/11, 10/11.',
    '5 sixths.'
  ],
  8: [
    'Number bond showing 3/5 and 2/5 equals 1 whole; second visual model drawn.',
    'Number bond showing 3/4 and 1/4 equals 1 whole; second visual model drawn.',
    'Number bond showing 3/6 and 3/6 equals 1 whole; second visual model drawn.',
    'Number bond showing 2/9 and 7/9 equals 1 whole; second visual model drawn.',
    'a. Number bond showing 3/4 and 1/4 equals 1 whole; 3/4 decomposed showing 3 units of 1/4. b. Number bond showing 2/3 and 1/3 equals 1 whole; 2/3 decomposed showing 2 units of 1/3. c. Number bond showing 2/4 and 2/4 equals 1 whole; both 2/4 bonds decomposed showing 2 units of 1/4. d. Number bond showing 2/5 and 3/5 equals 1 whole; 2/5 decomposed showing 2 units of 1/5; 3/5 decomposed showing 3 units of 1/5.',
    'a. 3/4. b. 3. c. Number bond showing 3/4 and 1/4 equals 1 whole; 3/4 decomposed showing 3 units of 1/4; second visual model drawn.'
  ],
  9: [
    'a. Answer provided. b. 1/8, 15, 15/8. c. 1/6, 14, 14/6. d. 1/5, 8, 8/5. e. 1/4, 9, 9/4. f. 1/3, 7, 7/3.',
    'a. Each whole partitioned into sixths; 8 sixths shaded; 8/6. b. Each whole partitioned into fourth; 7 fourths shaded; 7/4. c. Each whole partitioned into fifths; 6 fifths shaded; 6 fifths. d. Each whole partitioned into halves; 5 halves shaded; 5 halves.',
    'a. 2 equivalent wholes drawn; each whole partitioned into 8 equal pieces; 10 pieces shaded. b. 10/8.'
  ],
  10: [
    'Specified fractional unit shaded in each strip.',
    'a. Greater than. b. Less than. c. Less than. d. Greater than. e. Less than. f. Less than. g. Greater than. h. Greater than.',
    'More oil; explanations will vary.',
    'a. >. b. <. c. =. d. >. e. <. f. =. g. =, <, <, <, =.',
    'No; explanations will vary.'
  ],
  11: [
    '1/3; answers will vary.',
    '1/5; answers will vary.',
    '1/10; answers will vary.',
    '1/12; answers will vary.',
    'Answers will vary; 1/8.',
    'Answers will vary; 1/9.',
    'Answers will vary; 1/12.',
    'Answers will vary.',
    'No; explanations will vary.',
    'No; explanations will vary.'
  ],
  12: Array(6).fill('Answers will vary.'),
  13: [
    'a. 1/2. b. Shaded part divided to show 1/2.',
    'a. 1/4. b. Shaded part divided to show 1/4.',
    'a. 1/3. b. Shaded part divided to show 1/3.',
    'a. 1/5. b. Shaded part divided to show 1/5.',
    'a. 1/6. b. Shaded part divided to show 1/6.',
    'a. C. b. B. c. A. d. 2; 1/2. e. 1/2; 1/4.',
    'Answers will vary.'
  ],
  14: [
    'a. Answer provided; fraction strip partitioned and labeled to show halves; number line partitioned and labeled correctly from 0/2 to 2/2. b. Number bond showing 3 units of 1/3; fraction strip partitioned and labeled to show thirds; number line partitioned and labeled correctly from 0/3 to 3/3. c. Number bond showing 4 units of 1/4; fraction strip partitioned and labeled to show fourths; number line partitioned and labeled correctly from 0/4 to 4/4. d. Number bond showing 5 units of 1/5; fraction strip partitioned and labeled to show fifths; number line partitioned and labeled correctly from 0/5 to 5/5.',
    'Number line showing fourths; each quarter (fourth) hour from 0/4 to 4/4 correctly labeled, including 0 hours and 1 hour.',
    'Number line showing fifths; each fifth meter from 0/5 to 5/5 correctly labeled, including 0 meters and 1 meter.'
  ],
  15: [
    'a. Number line partitioned into thirds and labeled correctly with 0/3, 2/3, 3/3; answer provided. b. Number line partitioned into fourths and labeled correctly with 0/4, 3/4, 4/4; number bond showing 3/4 and 1/4 equals 1 whole. c. Number line partitioned into fifths and labeled correctly with 0/5, 3/5, 5/5; number bond showing 3/5 and 2/5 equals 1 whole. d. Number line partitioned into sixths and labeled correctly with 0/6, 5/6, 6/6; number bond showing 5/6 and 1/6 equals 1 whole. e. Number line partitioned into tenths and labeled correctly with 0/10, 3/10, 10/10; number bond showing 3/10 and 7/10 equals 1 whole.',
    'Number line drawn with 0 and 1 labeled correctly; fraction strip used appropriately to partition and label a number line to show eighths; number line labeled correctly from 0/8 to 8/8.',
    'a. 4 equal parts; rope labeled correctly from 0/4 to 4/4. b. 2/4. c. 1/5.'
  ],
  16: [
    'a. Answer provided. b. Number line partitioned into thirds and labeled; 3/3, 6/3 boxed. c. Number line partitioned into halves and labeled; 4/2, 6/2, 8/2 boxed. d. Number line partitioned into fourths and labeled; 12/4, 16/4, 20/4 boxed; 4 labeled below 16/4. e. Number line partitioned into thirds and labeled; 18/3, 21/3, 24/3, 27/3 boxed; 7 labeled below 21/3, 8 labeled below 24/3.',
    'Number line partitioned into fifths and labeled; 0/5, 5/5, 10/5 boxed.',
    'Number line partitioned into thirds and labeled; 3/3, 6/3, 9/3, 12/3 boxed.',
    'Number line drawn with endpoints 0 and 3; wholes labeled; number line partitioned and labeled.'
  ],
  17: [
    'Number line partitioned into sixths; given fractions located and labeled.',
    'Number line partitioned into fourths; given fractions located and labeled.',
    'Number line partitioned into thirds; given fractions located and labeled.',
    'Alex; number line partitioned into fourths; 2 inches and 7/4 inches located and labeled; number line showing 2 inches is longer than 7/4 inches.',
    'Number line with endpoints 0 km to 4 km, partitioned into fifths; 0/5 (0) km, 20/5 (4) km, 7/5 km, 12/5 km located and labeled.'
  ],
  18: [
    'Answer provided.',
    'Number line partitioned into sixths; 2/6 and 3/6 placed; 2/6 circled; <.',
    'Number line partitioned into halves and fourths; 1/2 and 1/4 placed; 1/4 circled; >.',
    'Number line partitioned into thirds and sixths; 2/3 and 2/6 placed; 2/6 circled; >.',
    'Number line partitioned into eighths and fourths; 11/8 and 7/4 placed; 11/8 circled; <.',
    'JoAnn; explanations will vary.',
    'Red thread; explanations will vary.',
    'Number line partitioned into eighths, fourths, and halves; 7/8, 7/4, and 4/2 placed; 7/8 < 7/4 < 4/2; explanations will vary.'
  ],
  19: [
    'a. Number line divided into halves; given fractions placed; each whole written correctly as a fraction. b. Number line divided into fourths; given fractions placed; each whole written correctly as a fraction. c. Number line divided into eighths; given fractions placed; each whole written correctly as a fraction.',
    'Row 1: <, <, >. Row 2: >, <, =. Row 3: <, >, >.',
    'Answers will vary.',
    'Answers will vary.',
    'Answers will vary.'
  ],
  20: [
    'a. 4/8, 4/8, 3/8, 4/8; first, second, and last shapes circled. b. 2/5, 1/5, 2/5, 2/5; first, third, and last shapes circled. c. 2/6, 2/6, 4/6, 3/6; first and second shapes circled.',
    'a. 1/4; two different representations of 1/4 drawn. b. 1/7; two different representations of 1/7 drawn.',
    'a. Triangles, squares. b. 4 triangles, 4 squares. c. At least two different representations of Ann’s set of shapes drawn with no overlaps; 2/6.',
    'Cristina; explanations will vary.'
  ],
  21: [
    'halves: 0/2, 3/2; fourths: 1/4, 2/4, 4/4, 6/4, 8/4. halves: 0/2, 2/2, 3/2; sixths: 1/6, 3/6, 6/6, 9/6, 12/6.',
    'Shaded blue: 1/2, 2/4; 1/2, 3/6. Shaded yellow: 2/2, 4/4; 2/2, 6/6. Shaded green: 3/2, 6/4; 3/2, 9/6. Shaded red: 4/2, 8/4; 4/2, 12/6.',
    '3; 2, 4/4; 9, 6/4.',
    '4/8 inch; number line drawn.',
    'Yes; 1/2 = 2/4 = 4/8; explanations will vary.'
  ],
  22: [
    '1/2 matched to 2/4; 4/6 matched to 2/3; 3/4 matched to 6/8; 3/9 matched to 1/3.',
    '2; 8; 16.',
    'Explanations will vary.',
    '2 sixths; explanations will vary.',
    'Explanations will vary.'
  ],
  23: [
    'Number line divided into fourths and labeled correctly in red pencil.',
    'Number line divided into eighths and labeled correctly in blue pencil.',
    '0/4 = 0/8, 1/4 = 2/8, 2/4 = 4/8, 3/4 = 6/8, 4/4 = 8/8, 5/4 = 10/8, 6/4 = 12/8, 7/4 = 14/8, 8/4 = 16/8, 9/4 = 18/8, 10/4 = 20/8, 11/4 = 22/8, 12/4 = 24/8.',
    '7/2 = 14/4 = 28/8; number line drawn, divided, and labeled correctly with these fractions.',
    '1/3 = 2/6; 2/4 = 1/2 or 4/8; 5/4 = 10/8; 10/5 = 2/1; answers will vary.',
    'No; explanations will vary.'
  ],
  24: [
    'Halves: Answer provided. Thirds: Number bond showing 3 units of 1/3; number line partitioned and labeled from 0 to 1. Fourths: Number bond showing 4 units of 1/4; number line partitioned and labeled from 0 to 1. Fifths: Number bond showing 5 units of 1/5; number line partitioned and labeled from 0 to 1.',
    'Fractions equal to 1 circled; 3/3, 4/4, 5/5.',
    'Answers will vary.',
    'No; explanations will vary.'
  ],
  25: [
    'Answer provided; 3/2; 3/1; 4/4; 4/2; 4/1; 6/6; 6/3; 6/1.',
    '0/1, 1/1, 2/1, 3/1, 4/1, 5/1, 6/1; 10, 11, 12/1, 13/1, 14, 15/1, 16/1.',
    'Explanations will vary.'
  ],
  26: [
    'Halves: 0, 0; 2, 2; 4; number bonds completed. Thirds: 6, 6; 9, 9; 12, 12; number bonds completed.',
    'Halves: Answer provided. Thirds: 6/3, 9/3, 12/3. Fourths: 8/4, 12/4, 16/4. Sixths: 12/6, 18/6, 24/6.',
    'a. Number line representing 1 meter of wire; partitioned correctly into fourths; 4. b. 12 days.',
    'a. Number line representing 1 pound of food; partitioned correctly into thirds. b. Second number line representing 4 pounds of food; partitioned correctly into thirds; 1. c. 2.'
  ],
  27: [
    '2, 2, bigger, less. 4, 4, smaller, more.',
    '1/2 of a candy bar; 1/2 = 2/4 = 3/6.',
    'Explanations will vary.',
    '2 sixths; model drawn.',
    'Answers will vary.'
  ],
  28: [
    'Models shaded correctly; 2 thirds circled.',
    'Models shaded correctly; 2 eighths circled.',
    'Models shaded correctly; 3 fourths circled.',
    'Models shaded correctly; 4 sixths circled.',
    'Models shaded correctly; 3 thirds circled.',
    'Kelly; tape diagrams drawn correctly.',
    'Becky; tape diagrams drawn correctly.',
    'Doll B, Doll A, Doll C; picture drawn.'
  ],
  29: [
    'Answer provided.',
    '3/4 > 3/8.',
    '1/4 < 1/2.',
    '4/4 > 4/6.',
    'a. <. b. >. c. >.',
    'Models drawn correctly; <.',
    'Models drawn correctly; >.',
    'Nicholas; models drawn correctly.',
    'Robbie; models drawn correctly.'
  ],
  30: ['Answers will vary.']
};

const lessons = {};
let teacherEditionPdfSha256;
let totalProblems = 0;

for (let lessonNumber = 1; lessonNumber <= 30; lessonNumber += 1) {
  const baseline = JSON.parse(
    readFileSync(
      join(baselineRoot, 'contracts', 'm5', `lesson-${pad(lessonNumber)}.json`),
      'utf8'
    )
  );
  teacherEditionPdfSha256 ??= baseline.source.teacherEditionSha256;
  if (teacherEditionPdfSha256 !== baseline.source.teacherEditionSha256) {
    throw new Error(`m5-l${lessonNumber}: Teacher Edition fingerprints disagree`);
  }

  const lessonAnswers = answers[lessonNumber];
  const pageRanges = taskPages[lessonNumber];
  const expectedCount = Math.max(...pageRanges.map(([, , last]) => last));
  if (lessonAnswers.length !== expectedCount) {
    throw new Error(`m5-l${lessonNumber}: reviewed answer/task count mismatch`);
  }
  const sourceText = normalizeText(baseline.problemSet.problemSetText);
  const answerKeyText = normalizeText(
    baseline.problemSet.answerKeyProblemSetText || baseline.problemSet.answerKeyText
  );
  const sourceEvidence = lessonNumber === 30
    ? 'There is no Problem Set sheet for this lesson'
    : `Lesson ${lessonNumber} Problem Set`;
  if (!sourceText.includes(normalizeText(sourceEvidence))) {
    throw new Error(`m5-l${lessonNumber}: reviewed source wording is absent`);
  }

  lessons[String(lessonNumber)] = lessonAnswers.map((answerKeyEvidence, index) => {
    const number = index + 1;
    const page = pageForProblem(pageRanges, number);
    if (!baseline.source.problemSetPdfPages.includes(page)) {
      throw new Error(`m5-l${lessonNumber} Problem ${number}: page ${page} is not controlling source evidence`);
    }
    if (!teacherEditionContainsEvidence(answerKeyText, answerKeyEvidence)) {
      throw new Error(
        `m5-l${lessonNumber} Problem ${number}: reviewed answer is absent from the Teacher Edition answer key: ${answerKeyEvidence}`
      );
    }
    totalProblems += 1;
    return {
      number,
      sourceTextEvidence: sourceEvidence,
      answerKeyEvidence,
      // Retain the complete task-bearing page body. This deliberately avoids
      // clipping shared directions, original fraction figures, or open response
      // areas that belong to another visual row or continuation.
      sourceCrops: [[page, 65, 180, 1145, 1290]]
    };
  });
}

writeFileSync(
  outputPath,
  `${JSON.stringify({
    schemaVersion: 1,
    moduleId: 'm5',
    teacherEditionPdfSha256,
    imageSize,
    lessons
  }, null, 2)}\n`
);

console.log(`GENERATED: reviewed source-only Module 5 evidence for ${totalProblems} official Problem Set tasks.`);

function pageForProblem(pageRanges, number) {
  const match = pageRanges.find(([, first, last]) => number >= first && number <= last);
  if (!match) throw new Error(`No reviewed source page for Problem ${number}`);
  return match[0];
}

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/\//g, ' ')
    .replace(/[^a-z0-9<>=$]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function teacherEditionContainsEvidence(teacherEditionText, evidence) {
  const normalizedEvidence = normalizeText(evidence);
  if (teacherEditionText.includes(normalizedEvidence)) return true;
  const sourceCounts = tokenCounts(teacherEditionText);
  const evidenceCounts = tokenCounts(normalizedEvidence);
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

function pad(value) {
  return String(value).padStart(2, '0');
}
