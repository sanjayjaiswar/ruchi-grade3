import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const outputPath = join(baselineRoot, 'module-6-problem-evidence.json');
const imageSize = { width: 1020, height: 1320 };
const taskCrop = (y, height) => ({ x: 45, y, width: 930, height });

// Reviewed breadth-first against all 21 printed Module 6 Problem Set pages.
// Each entry is [student-workbook image page, controlling Teacher Edition PDF
// page, exact task crop]. Shared graphs are separate crops when a numbered task
// refers to a display printed above another numbered task.
const taskPages = {
  1: {
    1: [[2, 16, taskCrop(150, 515)]],
    2: [[2, 16, taskCrop(660, 500)]],
    3: [[3, 17, taskCrop(140, 1020)]],
    4: [[4, 18, taskCrop(140, 1020)]]
  },
  2: {
    1: [[7, 28, taskCrop(145, 795)]],
    2: [[7, 28, taskCrop(930, 230)]],
    3: [[8, 29, taskCrop(140, 1020)]]
  },
  3: {
    1: [[11, 41, taskCrop(145, 1015)]],
    2: [[12, 42, taskCrop(140, 835)]],
    3: [[12, 42, taskCrop(970, 190)]],
    4: [
      [13, 43, taskCrop(130, 675)],
      [13, 43, taskCrop(805, 95)]
    ],
    5: [
      [13, 43, taskCrop(130, 675)],
      [13, 43, taskCrop(895, 265)]
    ]
  },
  4: {
    1: [[19, 56, taskCrop(145, 1015)]],
    2: [[20, 57, taskCrop(140, 1020)]]
  },
  5: {
    1: [[24, 72, taskCrop(145, 1015)]],
    2: [[25, 73, taskCrop(140, 760)]],
    3: [[25, 73, taskCrop(900, 260)]]
  },
  6: {
    1: [[29, 86, taskCrop(145, 1015)]],
    2: [[30, 87, taskCrop(140, 1020)]]
  },
  7: {
    1: [
      [34, 100, taskCrop(130, 1030)],
      [35, 101, taskCrop(130, 1030)]
    ]
  },
  8: {
    1: [
      [39, 114, taskCrop(130, 1030)],
      [40, 115, taskCrop(130, 1030)]
    ]
  },
  9: {
    1: [[44, 128, taskCrop(145, 1015)]],
    2: [[45, 129, taskCrop(140, 550)]],
    3: [
      [45, 129, taskCrop(690, 470)],
      [46, 130, taskCrop(130, 1030)]
    ]
  }
};

// Direct observations from the numbered Problem Set wording.
const sourceTextEvidence = {
  1: [
    '"What is your favorite color?"',
    'Use the tally chart to answer the following questions.',
    'Use the tally chart in Problem 1 to complete the picture graphs below.',
    'Use the picture graph in Problem 3(b) to answer the following questions.'
  ],
  2: [
    'Find the total number of stamps each student has.',
    'Explain how you can create vertical tape diagrams to show this data.',
    'Complete the vertical tape diagrams below using the data from Problem 1.'
  ],
  3: [
    'This table shows the number of students in each class.',
    "This bar graph shows Kyle's savings from February to June.",
    'Complete the table below to show the same data given in the bar graph in Problem 2.',
    "Use the graph's lines as a ruler to draw in the intervals on the number line shown above.",
    'Use the graph or number line to answer the following questions.'
  ],
  4: [
    'The chart below shows the number of magazines sold by each student.',
    'The bar graph shows the number of visitors to a carnival from Monday through Friday.'
  ],
  5: [
    'Use the ruler you made to measure different classmates’ straws',
    'Jenna marks a 5-inch paper strip into equal parts as shown below.',
    'Sari says her pencil measures 8 half inches.'
  ],
  6: [
    'Coach Harris measures the heights of the children on his third-grade basketball team',
    "Miss Vernier's class is studying worms."
  ],
  7: [
    "Mrs. Weisse's class grows beans for a science experiment."
  ],
  8: [
    'Delilah stops under a silver maple tree and collects leaves.'
  ],
  9: [
    'Four children went apple picking.',
    'Use the chart or graph to answer the following questions.',
    "Ms. Pacho's science class measured the lengths of blades of grass"
  ]
};

// Exact top-level Problem Set answer-key transcriptions. Variable responses stay variable.
const answers = {
  1: [
    'Tally chart will vary.',
    'Answers will vary.',
    'Picture graphs will vary.',
    'a. 2 students. b. 1 and a half hearts drawn correctly; 2 + 1 = 3. c. 14 students; 7 × 2 = 14. d. Answers will vary.'
  ],
  2: [
    'Answer provided; 2 units of 4 drawn; 6 units of 4 drawn; 8 units of 4 drawn.',
    'Answers will vary.',
    'a. Answer provided; 2 units of 4 drawn; 6 units of 4 drawn; 8 units of 4 drawn. b. Answer provided; 1 unit of 8 drawn; 3 units of 8 drawn; 4 units of 8 drawn. c. Answers will vary. d. 20. e. 10. f. Answers will vary. g. Answers will vary.'
  ],
  3: [
    'Answer provided; 8 units colored; 6 and a half units colored; 9 units colored. a. 2 students. b. 9 + 16 + 13 + 18 = 56. c. 6; 22 − 16 = 6.',
    'a. $34. b. February, April, and May. c. $17; $40 − $23 = $17. d. April; March.',
    'February: $30; March: $46; April: $23; May: $34; June: $40.',
    'Intervals drawn correctly on the number line; each day plotted and labeled correctly on number line.',
    'a. Monday, Tuesday, and Thursday; 50 min. b. 30 min.'
  ],
  4: [
    'a. Bar graph drawn correctly with appropriate scale. b. Answers will vary. c. 150. d. 150.',
    'a. 240. b. 80.'
  ],
  5: [
    'a. Answers will vary. b. Answers will vary. c. Answers will vary.',
    'a. Whole and half inches labeled on paper strip. b. 1/4 inch marks are drawn; 2; 4; 2. c. Answers will vary.',
    'Explanations will vary.'
  ],
  6: [
    'a. 15; explanations will vary. b. 6. c. No; explanations will vary. d. 4.',
    'a. 30; explanations will vary. b. No; explanations will vary. c. Length plotted correctly on line plot.'
  ],
  7: [
    'a. Line plot completed; Heights of Bean Plants; inches; values for X may vary. b. 14. c. 6. d. 1 3/4 inches; 4. e. No; explanations will vary. f. Yes; explanations will vary.'
  ],
  8: [
    'a. Line plot completed; Widths of Leaves; inches; values for X may vary. b. Answers will vary. c. 4. d. Explanations will vary.'
  ],
  9: [
    'a. 24. b. Picture graph completed; scale drawn.',
    'a. 8. b. 4.',
    'a. Line plot completed; explanations will vary. b. 24; explanations will vary. c. 2 3/4 inches; 6. d. 2.'
  ]
};

// Only pages containing numbered Problem Set answers are included.
const answerKeyPages = {
  1: [147],
  2: [148],
  3: [150],
  4: [151],
  5: [152],
  6: [153],
  7: [155],
  8: [157],
  9: [159]
};

const lessons = {};
let teacherEditionPdfSha256;
let totalProblems = 0;

for (let lessonNumber = 1; lessonNumber <= 9; lessonNumber += 1) {
  const baseline = JSON.parse(
    readFileSync(
      join(baselineRoot, 'contracts', 'm6', `lesson-${pad(lessonNumber)}.json`),
      'utf8'
    )
  );
  teacherEditionPdfSha256 ??= baseline.source.teacherEditionSha256;
  if (teacherEditionPdfSha256 !== baseline.source.teacherEditionSha256) {
    throw new Error(`m6-l${lessonNumber}: Teacher Edition fingerprints disagree`);
  }

  const lessonAnswers = answers[lessonNumber];
  const lessonSourceEvidence = sourceTextEvidence[lessonNumber];
  const lessonTaskPages = taskPages[lessonNumber];
  const expectedCount = baseline.problemSet.extractedProblems.length;
  if (
    lessonAnswers.length !== expectedCount ||
    lessonSourceEvidence.length !== expectedCount ||
    Object.keys(lessonTaskPages).length !== expectedCount
  ) {
    throw new Error(`m6-l${lessonNumber}: reviewed task, wording, or answer count mismatch`);
  }

  const sourceText = normalizeText(baseline.problemSet.problemSetText);
  const answerKeyText = normalizeText(
    baseline.problemSet.answerKeyProblemSetText || baseline.problemSet.answerKeyText
  );

  const problems = lessonAnswers.map((answerKeyEvidence, index) => {
    const number = index + 1;
    const wording = lessonSourceEvidence[index];
    if (!sourceText.includes(normalizeText(wording))) {
      throw new Error(`m6-l${lessonNumber} Problem ${number}: reviewed source wording is absent`);
    }
    if (!teacherEditionContainsEvidence(answerKeyText, answerKeyEvidence)) {
      throw new Error(`m6-l${lessonNumber} Problem ${number}: reviewed answer evidence is absent`);
    }

    const sourceCrops = lessonTaskPages[number].map(
      ([workbookPage, pdfPage, reviewedCrop]) => {
      if (!baseline.source.problemSetPdfPages.includes(pdfPage)) {
        throw new Error(`m6-l${lessonNumber} Problem ${number}: PDF page ${pdfPage} is not controlling evidence`);
      }
      if (
        reviewedCrop.x < 0 ||
        reviewedCrop.y < 0 ||
        reviewedCrop.x + reviewedCrop.width > imageSize.width ||
        reviewedCrop.y + reviewedCrop.height > imageSize.height
      ) {
        throw new Error(`m6-l${lessonNumber} Problem ${number}: reviewed crop is outside the source image`);
      }
      return {
        pdfPage,
        src: `/source-pages/m6/workbook-page-${pad(workbookPage)}.png`,
        crop: reviewedCrop
      };
    });
    totalProblems += 1;
    return {
      number,
      sourceTextEvidence: wording,
      answerKeyEvidence,
      sourceCrops
    };
  });

  lessons[String(lessonNumber)] = {
    answerKeyImages: answerKeyPages[lessonNumber].map(
      (page) => `/source-pages/m6/teacher-answer-page-${page}.png`
    ),
    problems
  };
}

writeFileSync(
  outputPath,
  `${JSON.stringify({
    schemaVersion: 1,
    moduleId: 'm6',
    teacherEditionPdfSha256,
    imageSize,
    lessons
  }, null, 2)}\n`
);

console.log(`GENERATED: reviewed source-only Module 6 evidence for ${totalProblems} official data tasks.`);

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[–—−]/g, '-')
    .replace(/[×·]/g, 'x')
    .replace(/\//g, ' ')
    .replace(/[^a-z0-9$+\-'=]+/g, ' ')
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
