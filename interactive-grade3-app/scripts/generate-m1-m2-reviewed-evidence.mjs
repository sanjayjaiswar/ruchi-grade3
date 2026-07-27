import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const canonicalImageSize = { width: 1224, height: 1584 };
const moduleImageSizes = {
  m1: { width: 816, height: 1056 },
  m2: { width: 1143, height: 1443 }
};
const moduleAnswerKeyImageSizes = {
  m1: { width: 935, height: 1210 },
  m2: { width: 1143, height: 1443 }
};

const crop = (pdfPage, y = 150, end = 1425, x = 50, width = 1124, moduleId = 'm1') => ({
  pdfPage,
  src: `/source-pages/${moduleId}-teacher/page-${String(pdfPage).padStart(3, '0')}.png`,
  crop: scaleCrop({ x, y, width, height: end - y }, moduleImageSizes[moduleId])
});
const m1 = (page, y = 150, end = 1425, x = 50, width = 1124) =>
  crop(page, y, end, x, width, 'm1');
const m2 = (page, y = 150, end = 1425, x = 50, width = 1124) =>
  crop(page, y, end, x, width, 'm2');
const vertical = (source, page, ranges) =>
  ranges.map(([y, end, x = 50, width = 1124], index) => [
    source(
      page,
      index === 0 ? y : Math.max(100, y - 60),
      index === ranges.length - 1 ? end : Math.min(1425, end + 60),
      x,
      width
    )
  ]);

// Every boundary below was reviewed on the rendered, fingerprinted Teacher
// Edition pages. OCR was used only as a locator. Overlap is intentionally kept
// where a printed divider or continuation makes a hard split unsafe.
const taskPages = {
  m1: {
    1: [[m1(29)], ...vertical(m1, 30, [[150, 500], [470, 790], [760, 1425]])],
    2: [
      ...vertical(m1, 43, [[150, 450], [420, 730], [700, 1010], [980, 1425]]),
      ...vertical(m1, 44, [[150, 700], [670, 1080], [1050, 1425]])
    ],
    3: [
      ...vertical(m1, 56, [[150, 550], [520, 900], [870, 1425]]),
      ...vertical(m1, 57, [[150, 520], [490, 950], [920, 1425]])
    ],
    4: [
      [m1(70, 160, 600, 50, 562)], [m1(70, 160, 600, 612, 562)],
      [m1(70, 570, 1010, 50, 562)], [m1(70, 570, 1010, 612, 562)],
      [m1(70, 980, 1425, 50, 562)], [m1(70, 980, 1425, 612, 562)],
      ...vertical(m1, 71, [[150, 560], [530, 1010], [980, 1425]])
    ],
    5: [
      [m1(80, 150, 800, 50, 562)], [m1(80, 150, 800, 612, 562)],
      [m1(80, 770, 1425, 50, 562)], [m1(80, 770, 1425, 612, 562)],
      ...vertical(m1, 81, [[150, 790], [760, 1425]])
    ],
    6: [
      ...vertical(m1, 90, [[150, 520], [490, 900], [870, 1425]]),
      ...vertical(m1, 91, [[150, 560], [530, 1000], [970, 1425]])
    ],
    7: [
      [m1(103, 150, 750, 50, 562)], [m1(103, 150, 750, 612, 562)],
      [m1(103, 720, 1050)], [m1(103, 1020, 1425)],
      ...vertical(m1, 104, [[150, 470], [440, 760], [730, 1090], [1060, 1425]])
    ],
    8: [
      [m1(114, 150, 680, 50, 562)], [m1(114, 150, 680, 612, 562)],
      [m1(114, 480, 920)], [m1(114, 700, 1190)], [m1(114, 1010, 1425)],
      ...vertical(m1, 115, [[150, 970], [940, 1425]])
    ],
    9: [
      [m1(125, 150, 560)],
      [m1(125, 530, 1425, 50, 562)], [m1(125, 530, 1425, 612, 562)],
      ...vertical(m1, 126, [[150, 720], [690, 1425]])
    ],
    10: [[m1(137, 150, 1425, 50, 562)], [m1(137, 150, 1425, 612, 562)], [m1(138)]],
    11: [
      ...vertical(m1, 157, [[150, 940], [910, 1425]]),
      ...vertical(m1, 158, [[150, 630], [600, 1040], [1010, 1425]])
    ],
    12: [
      ...vertical(m1, 169, [[150, 540], [510, 900], [870, 1425]]),
      ...vertical(m1, 170, [[150, 750], [720, 1090], [1060, 1425]])
    ],
    13: [
      ...vertical(m1, 181, [[150, 760], [730, 1425]]),
      ...vertical(m1, 182, [[150, 690], [660, 1050], [1020, 1425]])
    ],
    14: [[m1(194)], ...vertical(m1, 195, [[150, 620], [590, 1060], [1030, 1425]])],
    15: [[m1(205)], ...vertical(m1, 206, [[150, 560], [530, 990], [960, 1425]])],
    16: [[m1(216)], ...vertical(m1, 217, [[150, 790], [760, 1425]])],
    17: [[m1(227)], ...vertical(m1, 228, [[150, 590], [560, 1030], [1000, 1425]])],
    18: [
      [m1(240, 150, 800, 50, 562)], [m1(240, 150, 800, 612, 562)],
      [m1(240, 770, 1425, 50, 562)], [m1(240, 770, 1425, 612, 562)],
      ...vertical(m1, 241, [[150, 640], [610, 1020], [990, 1425]])
    ],
    19: [[m1(250)], ...vertical(m1, 251, [[150, 690], [660, 1425]])],
    20: [
      ...vertical(m1, 262, [[150, 860], [830, 1425]]),
      ...vertical(m1, 263, [[150, 630], [600, 1050], [1020, 1425]])
    ],
    21: [
      ...vertical(m1, 272, [[150, 800], [770, 1425]]),
      ...vertical(m1, 273, [[150, 840], [810, 1425]])
    ]
  },
  m2: {
    1: [
      [m2(19, 150, 760, 50, 562)], [m2(19, 150, 760, 612, 562)],
      [m2(19, 680, 1425, 50, 562)], [m2(19, 680, 1425, 612, 562)],
      ...vertical(m2, 20, [[150, 940], [910, 1425]])
    ],
    2: [[m2(31)], ...vertical(m2, 32, [[150, 600], [570, 980], [950, 1425]])],
    3: [
      [m2(44, 150, 890)],
      [m2(44, 860, 1425, 50, 562)], [m2(44, 860, 1425, 612, 562)],
      ...vertical(m2, 45, [[150, 800], [770, 1425]])
    ],
    4: [
      ...vertical(m2, 55, [[150, 430], [400, 680], [650, 930], [900, 1180], [1150, 1425]]),
      ...vertical(m2, 56, [[150, 690], [660, 1060], [1030, 1425]])
    ],
    5: [
      ...vertical(m2, 67, [[150, 590], [560, 990], [960, 1425]]),
      ...vertical(m2, 68, [[150, 840], [810, 1425]])
    ],
    6: [
      ...vertical(m2, 80, [[150, 560], [530, 950], [920, 1425]]),
      [m2(81, 150, 850)], [m2(81, 580, 1425)]
    ],
    7: [
      [m2(91, 215, 1320, 125, 900)],
      [m2(92, 215, 650, 125, 900)],
      [m2(92, 650, 975, 125, 900)],
      [m2(92, 975, 1190, 125, 900)]
    ],
    8: [
      ...vertical(m2, 101, [[150, 800], [770, 1425]]),
      ...vertical(m2, 102, [[150, 690], [660, 1425]])
    ],
    9: [
      [
        m2(111, 150, 940),
        m2(111, 910, 1425),
        m2(112, 150, 750),
        m2(112, 650, 1050),
        m2(112, 900, 1425)
      ]
    ],
    10: [
      ...vertical(m2, 122, [[150, 820], [790, 1425]]),
      ...vertical(m2, 123, [[150, 610], [580, 1425]])
    ],
    11: [
      ...vertical(m2, 132, [[150, 640], [610, 1000], [970, 1425]]),
      ...vertical(m2, 133, [[150, 640], [610, 1040], [1010, 1425]])
    ],
    12: [
      ...vertical(m2, 155, [[150, 840], [810, 1425]]),
      ...vertical(m2, 156, [[150, 820], [790, 1425]])
    ],
    13: [[m2(166)], ...vertical(m2, 167, [[150, 940], [910, 1425]])],
    14: [[m2(177)], [m2(178, 150, 760)], [m2(178, 650, 970)], [m2(178, 850, 1425)]],
    15: [[m2(191)], ...vertical(m2, 192, [[150, 560], [530, 970], [940, 1425]])],
    16: [[m2(202)], ...vertical(m2, 203, [[150, 560], [530, 970], [940, 1425]])],
    17: [[m2(215)], ...vertical(m2, 216, [[150, 940], [910, 1425]])],
    18: [[m2(228)], ...vertical(m2, 229, [[150, 600], [570, 1040], [1010, 1425]])],
    19: [[m2(238)], ...vertical(m2, 239, [[150, 600], [570, 1000], [970, 1425]])],
    20: [[m2(252)], [m2(253, 150, 900)], [m2(253, 620, 1425)]],
    21: [
      [m2(261)],
      [m2(262, 150, 690)],
      [m2(262, 660, 1425), m2(263, 150, 690)],
      [m2(263, 660, 1425)]
    ]
  }
};

const expectedProblemCounts = {
  m1: [0, 4, 7, 6, 9, 6, 6, 8, 7, 5, 3, 5, 6, 5, 4, 4, 3, 4, 7, 3, 5, 4],
  m2: [0, 6, 4, 5, 8, 5, 5, 4, 4, 1, 4, 6, 4, 3, 4, 4, 4, 3, 4, 4, 3, 4]
};

for (const moduleId of ['m1', 'm2']) {
  const imageSize = moduleImageSizes[moduleId];
  const lessons = {};
  let teacherEditionPdfSha256;
  let totalProblems = 0;
  const lessonCount = 21;

  for (let lessonNumber = 1; lessonNumber <= lessonCount; lessonNumber += 1) {
    const baseline = JSON.parse(
      readFileSync(
        join(baselineRoot, 'contracts', moduleId, `lesson-${pad(lessonNumber)}.json`),
        'utf8'
      )
    );
    teacherEditionPdfSha256 ??= baseline.source.teacherEditionSha256;
    if (teacherEditionPdfSha256 !== baseline.source.teacherEditionSha256) {
      throw new Error(`${moduleId}-l${lessonNumber}: Teacher Edition fingerprints disagree`);
    }

    const sourceCrops = taskPages[moduleId][lessonNumber];
    const expectedCount = expectedProblemCounts[moduleId][lessonNumber];
    if (!sourceCrops || sourceCrops.length !== expectedCount) {
      throw new Error(
        `${moduleId}-l${lessonNumber}: reviewed crop count ${sourceCrops?.length ?? 0} differs from ${expectedCount}`
      );
    }

    const controllingPages = baseline.source.problemSetPdfPages;
    for (const [problemIndex, problemCrops] of sourceCrops.entries()) {
      if (!problemCrops.length) {
        throw new Error(`${moduleId}-l${lessonNumber} Problem ${problemIndex + 1}: no source crop`);
      }
      for (const reviewedSource of problemCrops) {
        if (!controllingPages.includes(reviewedSource.pdfPage)) {
          throw new Error(
            `${moduleId}-l${lessonNumber} Problem ${problemIndex + 1}: page ${reviewedSource.pdfPage} is not controlling evidence`
          );
        }
        const { x, y, width, height } = reviewedSource.crop;
        if (
          ![x, y, width, height].every(Number.isInteger) ||
          x < 0 ||
          y < 0 ||
          width <= 0 ||
          height <= 0 ||
          x + width > imageSize.width ||
          y + height > imageSize.height
        ) {
          throw new Error(
            `${moduleId}-l${lessonNumber} Problem ${problemIndex + 1}: crop exceeds source image`
          );
        }
      }
    }

    const sourceTextEvidence = firstSourceSentence(
      baseline.problemSet.extractedProblems[0]?.prompt || baseline.problemSet.problemSetText
    );
    const answerKeyEvidence = exactProblemSetAnswerSection(
      baseline.problemSet.answerKeyProblemSetText || baseline.problemSet.answerKeyText,
      moduleId
    );
    if (!sourceTextEvidence || !answerKeyEvidence) {
      throw new Error(`${moduleId}-l${lessonNumber}: exact text evidence is missing`);
    }

    const answerKeyFolder = moduleId === 'm2' ? 'm2-answer-key' : 'm1-teacher';
    const answerKeyImages = baseline.source.answerKeyPdfPages.map(
      (page) => `/source-pages/${answerKeyFolder}/page-${String(page).padStart(3, '0')}.png`
    );
    lessons[String(lessonNumber)] = {
      answerKeyImages,
      problems: sourceCrops.map((problemCrops, index) => ({
        number: index + 1,
        sourceTextEvidence,
        answerKeyEvidence,
        sourceCrops: problemCrops
      }))
    };
    totalProblems += sourceCrops.length;
  }

  writeFileSync(
    join(baselineRoot, `module-${moduleId.slice(1)}-problem-evidence.json`),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        moduleId,
        teacherEditionPdfSha256,
        imageSize,
        answerKeyImageSize: moduleAnswerKeyImageSizes[moduleId],
        lessons
      },
      null,
      2
    )}\n`
  );
  console.log(
    `GENERATED: reviewed source-only ${moduleId.toUpperCase()} evidence for ${totalProblems} printed task cards.`
  );
}

function exactProblemSetAnswerSection(value, moduleId) {
  const moduleNumber = moduleId.slice(1);
  return String(value ?? '')
    .split(new RegExp(`\\n\\s*Module ${moduleNumber}:`))[0]
    .replace(/\s+/g, ' ')
    .trim();
}

function firstSourceSentence(value) {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  return (text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text).trim();
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function scaleCrop(value, imageSize) {
  const scaleX = imageSize.width / canonicalImageSize.width;
  const scaleY = imageSize.height / canonicalImageSize.height;
  return {
    x: Math.round(value.x * scaleX),
    y: Math.round(value.y * scaleY),
    width: Math.round(value.width * scaleX),
    height: Math.round(value.height * scaleY)
  };
}
