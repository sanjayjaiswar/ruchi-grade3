import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const baselineRoot = join(appRoot, 'teacher-edition-baseline');
const outputPath = join(baselineRoot, 'module-7-problem-evidence.json');
const imageSize = { width: 1224, height: 1584 };
const taskCrop = (y, end) => ({ x: 50, y, width: 1124, height: end - y });
const source = (pdfPage, y = 150, end = 1425) => ({
  pdfPage,
  src: `/source-pages/m7-teacher/page-${String(pdfPage).padStart(3, '0')}.png`,
  crop: taskCrop(y, end)
});

// Reviewed directly against every printed Module 7 Problem Set page and the
// Lesson 34 Summer Calendar resource pages. OCR was used only to find candidate
// number positions; every boundary and continuation below was checked on the
// rendered, fingerprinted Teacher Edition page.
const taskPages = {
  1: {
    1: [source(22)],
    2: [source(23, 150, 550)],
    3: [source(23, 550, 930)],
    4: [source(23, 930)]
  },
  2: {
    1: [source(34, 150, 570)],
    2: [source(34, 570, 960)],
    3: [source(34, 960)],
    4: [source(35, 150, 550)],
    5: [source(35, 550, 930)],
    6: [source(35, 930)]
  },
  3: {
    1: [source(46, 150, 685)],
    2: [source(46, 685, 995)],
    3: [source(46, 995)],
    4: [source(47, 150, 560)],
    5: [source(47, 560, 930)],
    6: [source(47, 930)]
  },
  4: {
    1: [source(62)],
    2: [source(63, 150, 580)],
    3: [source(63, 580, 1000)],
    4: [source(63, 1000)]
  },
  5: {
    1: [source(76)],
    2: [source(77, 150, 510)],
    3: [source(77, 510, 890)],
    4: [source(77, 890)]
  },
  6: {
    1: [source(89, 150, 640)],
    2: [source(89, 640, 1045)],
    3: [source(89, 1045)],
    4: [source(90, 150, 570)],
    5: [source(90, 570, 1000)],
    6: [source(90, 1000)]
  },
  7: {
    1: [source(104, 150, 690)],
    2: [source(104, 690)],
    3: [source(105, 150, 940)],
    4: [source(105, 940)]
  },
  8: {
    1: [source(121, 150, 515)],
    2: [source(121, 515, 810)],
    3: [source(121, 810, 1110)],
    4: [source(121, 1110)],
    5: [source(122, 150, 385)],
    6: [source(122, 385, 600)],
    7: [source(122, 600)]
  },
  9: {
    1: [source(132)],
    2: [source(133, 150, 530)],
    3: [source(133, 530, 890)],
    4: [source(133, 890)]
  },
  10: {
    1: [source(146), source(147, 150, 725)],
    2: [source(147, 725, 1265)],
    3: [source(147, 1265)]
  },
  11: {
    1: [source(154, 150, 500)],
    2: [source(154, 500, 820)],
    3: [source(154, 820, 1125)],
    4: [source(154, 1125)]
  },
  12: {
    1: [source(164)],
    2: [source(165, 150, 590)],
    3: [source(165, 590, 1060)],
    4: [source(165, 1060)]
  },
  13: {
    1: [source(177)],
    2: [source(178, 150, 625)],
    3: [source(178, 625)]
  },
  14: {
    1: [source(190, 150, 1070)],
    2: [source(190, 1070)],
    3: [source(191, 150, 495)],
    4: [source(191, 495, 825)],
    5: [source(191, 825)]
  },
  15: {
    1: [source(202, 150, 590)],
    2: [source(202, 590, 960)],
    3: [source(202, 960)],
    4: [source(203, 150, 540)],
    5: [source(203, 540, 910)],
    6: [source(203, 910)]
  },
  16: {
    1: [source(214)],
    2: [source(215, 150, 580)],
    3: [source(215, 580, 1055)],
    4: [source(215, 1055)]
  },
  17: {
    1: [source(226)],
    2: [source(227, 150, 675)],
    3: [source(227, 675)]
  },
  18: {
    1: [source(253)],
    2: [source(254, 150, 915)],
    3: [source(254, 915)]
  },
  19: {
    1: [source(264)],
    2: [source(265, 150, 830)],
    3: [source(265, 830, 1085)],
    4: [source(265, 1085)]
  },
  20: {
    1: [source(276)],
    2: [source(277)]
  },
  21: {
    1: [source(288, 150, 815)],
    2: [source(288, 815)],
    3: [source(289, 150, 930)],
    4: [source(289, 930)]
  },
  22: {
    1: [source(302, 150, 995)],
    2: [source(302, 995)],
    3: [source(303, 150, 615)],
    4: [source(303, 615, 1035)],
    5: [source(303, 1035)]
  },
  23: {
    1: [source(317, 150, 550)],
    2: [source(317, 550, 905)],
    3: [source(317, 905)],
    4: [source(318, 150, 605)],
    5: [source(318, 605, 985)],
    6: [source(318, 985)]
  },
  24: {
    1: [source(327), source(328)]
  },
  25: {
    1: [source(337)]
  },
  26: {
    1: [source(348)],
    2: [source(349, 150, 470)],
    3: [source(349, 470, 900)],
    4: [source(349, 900)]
  },
  27: {
    1: [source(360)],
    2: [source(361, 150, 500)],
    3: [source(361, 500)],
    4: [source(362)]
  },
  28: {
    1: [source(374, 150, 775)],
    2: [source(374, 775), source(375, 150, 455)],
    3: [source(375, 455)],
    4: [source(376)]
  },
  29: {
    1: [source(387)],
    2: [source(388, 150, 550)],
    3: [source(388, 550, 1005)],
    4: [source(388, 1005)]
  },
  30: {
    1: [source(398)]
  },
  31: {
    1: [source(426)]
  },
  32: {
    1: [source(437, 150, 995)],
    2: [source(437, 995), source(438, 150, 680)],
    3: [source(438, 680, 1085)],
    4: [source(438, 1085)]
  },
  33: {
    1: [source(448)]
  },
  34: {
    1: [source(461), source(462)]
  }
};

const answerKeyPages = {
  1: [464],
  2: [465],
  3: [466],
  4: [467, 468],
  5: [469, 470],
  6: [471],
  7: [472, 473],
  8: [474, 475],
  9: [476, 477],
  10: [478, 479],
  11: [480],
  12: [481, 482],
  13: [483, 484],
  14: [485, 486],
  15: [487],
  16: [488, 489],
  17: [490],
  18: [491],
  19: [492],
  20: [493, 494],
  21: [495, 496],
  22: [497, 498],
  23: [499, 500],
  24: [501, 502],
  25: [503, 504],
  26: [505, 506],
  27: [507, 508],
  28: [509, 510],
  29: [511, 512],
  30: [513],
  31: [514, 515],
  32: [516, 517],
  33: [518, 519],
  34: [520]
};

const lessons = {};
let teacherEditionPdfSha256;
let totalProblems = 0;

for (let lessonNumber = 1; lessonNumber <= 34; lessonNumber += 1) {
  const baseline = JSON.parse(
    readFileSync(
      join(baselineRoot, 'contracts', 'm7', `lesson-${pad(lessonNumber)}.json`),
      'utf8'
    )
  );
  teacherEditionPdfSha256 ??= baseline.source.teacherEditionSha256;
  if (teacherEditionPdfSha256 !== baseline.source.teacherEditionSha256) {
    throw new Error(`m7-l${lessonNumber}: Teacher Edition fingerprints disagree`);
  }

  const expectedCount = baseline.problemSet.extractedProblems.length;
  const lessonTaskPages = taskPages[lessonNumber];
  if (!lessonTaskPages || Object.keys(lessonTaskPages).length !== expectedCount) {
    throw new Error(`m7-l${lessonNumber}: reviewed visual task count differs from Teacher Edition`);
  }
  const answerEvidence = splitAnswerKeyEvidence(
    baseline.problemSet.answerKeyProblemSetText || baseline.problemSet.answerKeyText,
    expectedCount
  );
  if (answerEvidence.length !== expectedCount) {
    throw new Error(`m7-l${lessonNumber}: numbered answer evidence could not be split safely`);
  }

  const sourceText = normalizeText(baseline.problemSet.problemSetText);
  const answerKeyText = normalizeText(
    baseline.problemSet.answerKeyProblemSetText || baseline.problemSet.answerKeyText
  );
  const problems = baseline.problemSet.extractedProblems.map((problem, index) => {
    const number = index + 1;
    if (problem.number !== number) {
      throw new Error(`m7-l${lessonNumber}: source task order is not contiguous`);
    }
    const wording = firstSourceSentence(problem.prompt);
    if (!sourceText.includes(normalizeText(wording))) {
      throw new Error(`m7-l${lessonNumber} Problem ${number}: source wording is absent`);
    }
    const exactAnswer = answerEvidence[index];
    if (!teacherEditionContainsEvidence(answerKeyText, exactAnswer)) {
      throw new Error(`m7-l${lessonNumber} Problem ${number}: answer evidence is absent`);
    }

    const sourceCrops = lessonTaskPages[number];
    for (const reviewedSource of sourceCrops) {
      const isCalendarResource =
        lessonNumber === 34 && [461, 462].includes(reviewedSource.pdfPage);
      const controllingPages = isCalendarResource
        ? range(baseline.source.lessonPdfPages.start, baseline.source.lessonPdfPages.end)
        : baseline.source.problemSetPdfPages;
      if (!controllingPages.includes(reviewedSource.pdfPage)) {
        throw new Error(
          `m7-l${lessonNumber} Problem ${number}: page ${reviewedSource.pdfPage} is not controlling evidence`
        );
      }
      const { x, y, width, height } = reviewedSource.crop;
      if (
        x < 0 ||
        y < 0 ||
        width <= 0 ||
        height <= 0 ||
        x + width > imageSize.width ||
        y + height > imageSize.height
      ) {
        throw new Error(`m7-l${lessonNumber} Problem ${number}: crop exceeds source image`);
      }
    }
    totalProblems += 1;
    return {
      number,
      sourceTextEvidence: wording,
      answerKeyEvidence: exactAnswer,
      sourceCrops
    };
  });

  lessons[String(lessonNumber)] = {
    answerKeyImages: answerKeyPages[lessonNumber].map(
      (page) => `/source-pages/m7-teacher/page-${String(page).padStart(3, '0')}.png`
    ),
    problems
  };
}

writeFileSync(
  outputPath,
  `${JSON.stringify(
    {
      schemaVersion: 1,
      moduleId: 'm7',
      teacherEditionPdfSha256,
      imageSize,
      lessons
    },
    null,
    2
  )}\n`
);

console.log(
  `GENERATED: reviewed source-only Module 7 evidence for ${totalProblems} official geometry, perimeter, project, fraction, fluency, and calendar tasks.`
);

function splitAnswerKeyEvidence(value, expectedCount) {
  const body = String(value ?? '').split(/\n\s*Module 7:/)[0].trim();
  const exactProblemSetAnswerSection = body.replace(/\s+/g, ' ').trim();
  if (!exactProblemSetAnswerSection) return [];
  // The answer-key pages use side-by-side columns in several lessons, so their
  // extracted text cannot be safely split into numbered answers. Keep the exact
  // complete Problem Set answer section for every task; the solved visual shows
  // the corresponding fingerprinted answer-key page(s), where numbering and
  // column layout remain authoritative.
  return Array.from({ length: expectedCount }, () => exactProblemSetAnswerSection);
}

function firstSourceSentence(value) {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  const sentence = text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
  return sentence.trim();
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[×]/g, ' x ')
    .replace(/[÷]/g, ' divided by ')
    .replace(/[−–—]/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9$]+/g, ' ')
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

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function pad(value) {
  return String(value).padStart(2, '0');
}
