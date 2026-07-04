import { STUDENT_WORK_SOURCE } from '../../student-work-source.generated';
import type {
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetConcreteFractionModel,
  ProblemSetFractionModel,
  ProblemSetNumberLineModel,
  ProblemSetPaperPartitionModel
} from '../lesson-runtime.types';
import { M5_WORKBOOK_PROBLEMS, type M5WorkbookProblem } from './workbook-problems';

const M5_OBJECTIVES: Record<number, string> = {
  1: 'Specify and partition a whole into equal parts, identifying and counting unit fractions using concrete models.',
  2: 'Specify and partition a whole into equal parts, identifying and counting unit fractions by folding fraction strips.',
  3: 'Specify and partition a whole into equal parts, identifying and counting unit fractions by drawing pictorial area models.',
  4: 'Represent and identify fractional parts of different wholes.',
  5: 'Partition a whole into equal parts and define the equal parts to identify the unit fraction numerically.',
  6: 'Build non-unit fractions less than one whole from unit fractions.',
  7: 'Identify and represent shaded and non-shaded parts of one whole as fractions.',
  8: 'Represent parts of one whole as fractions with number bonds.',
  9: 'Build and write fractions greater than one whole using unit fractions.',
  10: 'Compare unit fractions by reasoning about their size using fraction strips.',
  11: 'Compare unit fractions with different-sized models representing the whole.',
  12: 'Specify the corresponding whole when presented with one equal part.',
  13: 'Identify a shaded fractional part in different ways depending on the designation of the whole.',
  14: 'Place fractions on a number line with endpoints 0 and 1.',
  15: 'Place any fraction on a number line with endpoints 0 and 1.',
  16: 'Place whole number fractions and fractions between whole numbers on the number line.',
  17: 'Practice placing various fractions on the number line.',
  18: 'Compare fractions and whole numbers on the number line by reasoning about their distance from 0.',
  19: 'Understand distance and position on the number line as strategies for comparing fractions.',
  20: 'Recognize and show that equivalent fractions have the same size, though not necessarily the same shape.',
  21: 'Recognize and show that equivalent fractions refer to the same point on the number line.',
  22: 'Generate simple equivalent fractions by using visual fraction models and the number line.',
  23: 'Generate simple equivalent fractions by using visual fraction models and the number line.',
  24: 'Express whole numbers as fractions and recognize equivalence with different units.',
  25: 'Express whole number fractions on the number line when the unit interval is 1.',
  26: 'Decompose whole number fractions greater than 1 using whole number equivalence with various models.',
  27: 'Explain equivalence by manipulating units and reasoning about their size.',
  28: 'Compare fractions with the same numerator pictorially.',
  29: 'Compare fractions with the same numerator using <, >, or =, and use a model to reason about their size.',
  30: 'Partition various wholes precisely into equal parts using a number line method.'
};

const DENOMINATOR_WORDS: Array<{ pattern: RegExp; beforePattern: string; value: number }> = [
  { pattern: /\btwelfths?\b/i, beforePattern: 'twelfths?', value: 12 },
  { pattern: /\btenths?\b/i, beforePattern: 'tenths?', value: 10 },
  { pattern: /\bninths?\b/i, beforePattern: 'ninths?', value: 9 },
  { pattern: /\beighths?\b/i, beforePattern: 'eighths?', value: 8 },
  { pattern: /\bsevenths?\b/i, beforePattern: 'sevenths?', value: 7 },
  { pattern: /\bsixths?\b/i, beforePattern: 'sixths?', value: 6 },
  { pattern: /\bfifths?\b/i, beforePattern: 'fifths?', value: 5 },
  { pattern: /\bfourths?\b|\bquarters?\b/i, beforePattern: 'fourths?|quarters?', value: 4 },
  { pattern: /\bthirds?\b/i, beforePattern: 'thirds?', value: 3 },
  { pattern: /\bhalves\b|\bhalf\b/i, beforePattern: 'halves|half', value: 2 }
];

const NUMBER_WORDS: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10
};

const DENOMINATOR_LABELS: Record<number, string> = {
  2: 'halves',
  3: 'thirds',
  4: 'fourths',
  5: 'fifths',
  6: 'sixths',
  7: 'sevenths',
  8: 'eighths',
  9: 'ninths',
  10: 'tenths',
  11: 'elevenths',
  12: 'twelfths'
};

const m5TeacherPageBase = '/source-pages/m5-teacher';

const M5_OVERRIDES: Record<number, Record<number, {
  fractionModels?: ProblemSetFractionModel[];
  numberLineModels?: ProblemSetNumberLineModel[];
  solvedAnswer?: string;
  quotientMeaning?: string;
}>> = {
  2: {
    3: {
      fractionModels: [
        { label: 'Sharon gets 1 third', numerator: 1, denominator: 3 }
      ],
      solvedAnswer: 'Use the thirds fraction strip. Sharon gets 1/3 of the whole candy bar.',
      quotientMeaning: 'Three children share one whole candy bar fairly, so each equal share is 1 third.'
    },
    4: {
      fractionModels: [
        { label: 'Cardboard folded into fourths', numerator: 1, denominator: 4 },
        { label: 'Cardboard folded into sixths', numerator: 1, denominator: 6 }
      ],
      solvedAnswer: 'Half and half again makes fourths, so each part is 1/4. Thirds and then each third in half makes sixths, so each part is 1/6.',
      quotientMeaning: 'Repeated folding creates equal parts of the same original cardboard whole.'
    }
  },
  5: {
    3: {
      fractionModels: [
        { label: 'Andre and 9 friends', numerator: 1, denominator: 10 }
      ],
      solvedAnswer: 'Andre and his 9 friends make 10 people, so each person receives 1/10 of the second cake.',
      quotientMeaning: 'The whole cake is shared by 10 people, so one equal share is 1 tenth.'
    },
    4: {
      fractionModels: [
        { label: '1 tenth cake slice', numerator: 1, denominator: 10 },
        { label: '1 eighth cake slice', numerator: 1, denominator: 8 }
      ],
      solvedAnswer: 'One eighth is larger than one tenth when the cakes are the same size because eighths are larger equal parts.',
      quotientMeaning: 'Both cakes are the same-size whole, so the unit with fewer equal parts is larger.'
    }
  },
  6: {
    2: {
      fractionModels: [
        { label: 'Soda guests drank', numerator: 1, denominator: 8 },
        { label: 'Soda left', numerator: 7, denominator: 8 }
      ],
      solvedAnswer: 'The guests drank 1/8 of the soda, and 7/8 of the soda was left.',
      quotientMeaning: 'Each liter is 1 eighth of the 8-liter whole.'
    }
  },
  10: {
    1: {
      fractionModels: [2, 4, 8, 3, 6].map((denominator) => ({
        label: `1 ${DENOMINATOR_LABELS[denominator]}`,
        numerator: 1,
        denominator
      })),
      solvedAnswer: 'Color one unit in each strip: 1 half, 1 fourth, 1 eighth, 1 third, and 1 sixth.',
      quotientMeaning: 'For the same whole, one unit is larger when the whole is partitioned into fewer equal parts.'
    },
    3: {
      fractionModels: [
        { label: '1 third cup oil', numerator: 1, denominator: 3 },
        { label: '1 fourth cup water', numerator: 1, denominator: 4 }
      ],
      solvedAnswer: 'Lily uses more oil because 1 third of the same cup is greater than 1 fourth.',
      quotientMeaning: 'Both amounts use the same whole cup; thirds are larger units than fourths.'
    },
    5: {
      fractionModels: [
        { label: '1 sixth', numerator: 1, denominator: 6 },
        { label: '1 fifth', numerator: 1, denominator: 5 }
      ],
      solvedAnswer: 'Eric is not correct. 1 fifth is greater than 1 sixth because fifths are larger unit fractions than sixths.',
      quotientMeaning: 'A larger denominator means the same whole has more equal parts, so each unit part is smaller.'
    }
  },
  14: {
    1: {
      numberLineModels: [2, 3, 4, 5].map((denominator) => ({
        label: DENOMINATOR_LABELS[denominator],
        denominator,
        targetNumerators: Array.from({ length: denominator + 1 }, (_, index) => index)
      })),
      solvedAnswer: 'Partition 0 to 1 into halves, thirds, fourths, and fifths; label every fraction from 0 units to 1 whole.',
      quotientMeaning: 'Each tick mark names a distance from 0 in equal fractional units.'
    },
    2: {
      numberLineModels: [{ label: 'Quarter hours', denominator: 4, startLabel: '0 hours', endLabel: '1 hour', targetNumerators: [0, 1, 2, 3, 4] }],
      solvedAnswer: 'The number line is labeled 0 fourths, 1 fourth, 2 fourths, 3 fourths, and 4 fourths, with 4 fourths equal to 1 hour.',
      quotientMeaning: 'Every interval is 1 fourth hour.'
    },
    3: {
      numberLineModels: [{ label: 'Fifths of a meter', denominator: 5, startLabel: '0 meters', endLabel: '1 meter', targetNumerators: [0, 1, 2, 3, 4, 5] }],
      solvedAnswer: 'The bead marks are at 1 fifth, 2 fifths, 3 fifths, 4 fifths, and 5 fifths, with 5 fifths equal to 1 meter.',
      quotientMeaning: 'Each bead location is counted by fifths from 0 meters.'
    }
  },
  20: {
    4: {
      fractionModels: [
        { label: 'Beaker A: 1 half liter', numerator: 1, denominator: 2 },
        { label: 'Beaker B: 1 half liter', numerator: 1, denominator: 2 }
      ],
      solvedAnswer: 'Cristina is correct. Each beaker holds exactly 1 liter, so 1 half liter in Beaker A equals 1 half liter in Beaker B.',
      quotientMeaning: 'Equivalent fractions can have different-looking shapes when the same-size whole and same amount are preserved.'
    }
  },
  30: {
    1: {
      solvedAnswer: 'Use the lined-paper number line to make thirds, extend those third marks up the paper, angle the red strip from 0 to 1, and mark the strip where the vertical extensions cross it.',
      quotientMeaning: 'The thirds are equal because each third on the base number line uses the same number of paper spaces before the marks are transferred to the strip.'
    }
  }
};

function pageRange(start: number, end: number): number[] {
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
}

function pageImages(pages: number[]): string[] {
  return pages.map((page) => `${m5TeacherPageBase}/page-${page}.png`);
}

function teacherEditionLessonPages(source: string): string[] {
  const match = source.match(/lesson pages?\s+(\d+)(?:-(\d+))?/i);
  if (!match) {
    return [];
  }
  const start = Number(match[1]);
  const end = Number(match[2] ?? match[1]);
  return pageImages(pageRange(start, end));
}

function maskFractionText(text: string): string {
  return text
    .replace(/\b\d+\s*\/\s*\d+\b/g, '____')
    .replace(/\b\d+\s+(halves|half|thirds|fourths|quarters|fifths|sixths|sevenths|eighths|ninths|tenths|elevenths|twelfths)\b/gi, '____ $1')
    .replace(/\b\d+\s+out of\s+\d+\b/gi, '____ out of ____')
    .replace(/\b\d+\s+equal parts?\b/gi, '____ equal parts')
    .replace(/\b\d+\s+shaded parts?\b/gi, '____ shaded parts')
    .replace(/\b\d+\s+spaces?\b/gi, '____ spaces');
}

function blankEquationTemplates(equations: string[]): string[] | undefined {
  const templates = equations
    .map((equation) => maskFractionText(equation).trim())
    .filter(Boolean)
    .map((equation) => equation.includes('____') ? equation : `${equation}: ____`);

  return templates.length ? templates : undefined;
}

const LESSON1_BEAKER_MODEL: ProblemSetConcreteFractionModel = {
  kind: 'beaker-set',
  title: 'Problem 1: beakers filled to the named unit fractions',
  prompt: 'A beaker is considered full when the liquid reaches the fill line shown near the top. Estimate the amount of water in the beaker by shading the drawing as indicated. The first one is done for you.',
  items: [
    { label: '1 half', numerator: 1, denominator: 2, blankNumerator: 1, blankDenominator: 2 },
    { label: '1 fourth', numerator: 1, denominator: 4, blankNumerator: 0, blankDenominator: 4 },
    { label: '1 third', numerator: 1, denominator: 3, blankNumerator: 0, blankDenominator: 3 }
  ]
};

const LESSON1_STRING_CHEESE_MODEL: ProblemSetConcreteFractionModel = {
  kind: 'string-cheese-bars',
  title: 'Problem 2: shaded part of Juanita\'s string cheese',
  prompt: 'Juanita cut her string cheese into equal pieces as shown in the rectangles below. In the blanks below, name the fraction of the string cheese represented by the shaded part.',
  items: [
    { label: '3 equal pieces', numerator: 1, denominator: 3, blankNumerator: 1, blankDenominator: 3 },
    { label: '6 equal pieces', numerator: 1, denominator: 6, blankNumerator: 1, blankDenominator: 6 },
    { label: '4 equal pieces', numerator: 1, denominator: 4, blankNumerator: 1, blankDenominator: 4 }
  ]
};

const LESSON1_PARTITION_RECTANGLES_MODEL: ProblemSetConcreteFractionModel = {
  kind: 'partition-rectangles',
  title: 'Problem 3: estimate rectangles split into equal parts',
  prompt: 'Draw small rectangles and estimate partitions into 2 equal parts, 3 equal parts, and 4 equal parts. Name the lines drawn and the fractional unit.',
  items: [
    { label: '3a. Split into 2 equal parts', denominator: 2, lineCount: 1, blankLineCount: 0, unitName: 'halves' },
    { label: '3b. Split into 3 equal parts', denominator: 3, lineCount: 2, blankLineCount: 0, unitName: 'thirds' },
    { label: '3c. Split into 4 equal parts', denominator: 4, lineCount: 3, blankLineCount: 0, unitName: 'fourths' }
  ]
};

const LESSON1_PAPER_SHEETS_MODEL: ProblemSetConcreteFractionModel = {
  kind: 'paper-sheets',
  title: 'Problem 4: paper rectangles cut into named fractional units',
  prompt: 'Each rectangle represents 1 sheet of paper. Estimate how to cut the paper into the fractional units indicated.',
  notice: 'To make 20 equal parts, draw 19 lines. The number of cut lines is one fewer than the number of equal parts.',
  items: [
    { label: 'sevenths', denominator: 7, lineCount: 6, blankLineCount: 0, unitName: 'sevenths' },
    { label: 'ninths', denominator: 9, lineCount: 8, blankLineCount: 0, unitName: 'ninths' }
  ]
};

const LESSON1_WOOD_STRIP_MODEL: ProblemSetConcreteFractionModel = {
  kind: 'measured-strip',
  title: 'Problem 5: Rochelle\'s 12-inch strip of wood',
  prompt: 'Rochelle has a strip of wood 12 inches long. She cuts it into pieces that are each 6 inches in length. What fraction of the wood is one piece?',
  totalLength: 12,
  pieceLength: 6,
  unit: 'inches',
  notice: 'The 12-inch whole is cut into two 6-inch equal parts, so one 6-inch piece is 1/2 of the wood.'
};

const LESSON30_PAPER_PARTITION_MODEL: ProblemSetPaperPartitionModel = {
  title: 'Notebook-paper number line method for thirds',
  denominator: 3,
  paperSpacesPerUnit: 5,
  stripLabel: 'red strip',
  challengeUnits: ['halves', 'fourths', 'fifths', 'sevenths', 'ninths', 'tenths'],
  steps: [
    'Draw a number line on the notebook-paper margin and mark the 0 endpoint.',
    'Use the paper lines to make each third 5 spaces long, labeling from 0 to 1.',
    'Extend the third marks upward to the top of the paper.',
    'Angle the red strip so its left end touches 0 and its right end touches the line at 1.',
    'Mark the red strip where the vertical extensions cross it, then verify the equal parts.'
  ]
};

function makeLesson1(): ProblemSetCenteredLesson {
  const sourcePageImages = pageImages(pageRange(12, 21));
  const problems: ProblemSetCenteredProblem[] = [
    {
      number: 1,
      sourcePrompt: 'A beaker is considered full when the liquid reaches the fill line shown near the top. Estimate the amount of water in the beaker by shading the drawing as indicated. The first one is done for you.',
      concreteFractionModel: LESSON1_BEAKER_MODEL,
      blankPrompts: [
        'The first beaker is already shaded to 1 half, as shown in the Teacher Edition Problem Set.',
        'Estimate and shade the second beaker to 1 fourth and the third beaker to 1 third.'
      ],
      blankEquations: ['____', '____', '____'],
      blankAnswerSentence: 'Shade each beaker to show the named fraction of the full amount.',
      blankWorkspaceLabel: 'Use the fill line near the top as the whole amount.',
      blankVisualType: 'fraction-concrete-template',
      solvedAnswer: 'The beakers show 1/2, 1/4, and 1/3 of the full amount up to the fill line.',
      equations: ['1 half = 1/2', '1 fourth = 1/4', '1 third = 1/3'],
      knownTotal: 3,
      knownGroupSize: 1,
      knownGroupCount: 3,
      quotient: 1,
      quotientMeaning: 'Each shaded beaker shows one unit fraction of the same full beaker amount.',
      animationType: 'fraction-concrete-model',
      unitLabel: 'unit fractions',
      groupLabel: 'beakers',
      explanation: 'The whole is the amount that reaches the fill line, not the top rim. The shaded water should be estimated as one half, one fourth, and one third of that same whole amount.',
      validationChecks: [
        'The fill line is treated as the full beaker amount.',
        'The first beaker remains shaded to 1 half.',
        'The second beaker is lower than the third because 1 fourth is less than 1 third.',
        'Every answer names one unit fraction of the beaker whole.'
      ]
    },
    {
      number: 2,
      sourcePrompt: 'Juanita cut her string cheese into equal pieces as shown in the rectangles below. In the blanks below, name the fraction of the string cheese represented by the shaded part.',
      concreteFractionModel: LESSON1_STRING_CHEESE_MODEL,
      blankPrompts: [
        'Keep the whole string cheese the same in each row.',
        'Use the number of equal pieces in the row as the denominator.'
      ],
      blankEquations: [
        '____ shaded part out of ____ equal parts',
        '____ shaded part out of ____ equal parts',
        '____ shaded part out of ____ equal parts'
      ],
      blankAnswerSentence: 'The shaded parts are ____, ____, and ____ of the whole string cheese.',
      blankWorkspaceLabel: 'Name the fraction represented by the shaded part in each official rectangle.',
      blankVisualType: 'fraction-concrete-template',
      solvedAnswer: 'The shaded fractions are 1/3, 1/6, and 1/4 of the string cheese.',
      equations: ['1 out of 3 equal parts = 1/3', '1 out of 6 equal parts = 1/6', '1 out of 4 equal parts = 1/4'],
      knownTotal: 3,
      knownGroupSize: 1,
      knownGroupCount: 3,
      quotient: 1,
      quotientMeaning: 'The shaded piece is one equal part of the whole string cheese in each row.',
      animationType: 'fraction-concrete-model',
      unitLabel: 'shaded parts',
      groupLabel: 'string-cheese rows',
      explanation: 'The whole string cheese never changes. When the same whole is partitioned into more equal parts, each equal part is smaller, so the denominator changes with the number of pieces in that row.',
      validationChecks: [
        'Each row is treated as one whole string cheese.',
        'Only one piece is shaded in each row.',
        'The denominators match the row partitions: 3, 6, and 4.',
        'The answer names the fraction of the whole string cheese, not the number of shaded rectangles.'
      ]
    },
    {
      number: 3,
      sourcePrompt: 'a. In the space below, draw a small rectangle. Estimate to split it into 2 equal parts. How many lines did you draw to make 2 equal parts? What is the name of each fractional unit? b. Draw another small rectangle. Estimate to split it into 3 equal parts. How many lines did you draw to make 3 equal parts? What is the name of each fractional unit? c. Draw another small rectangle. Estimate to split it into 4 equal parts. How many lines did you draw to make 4 equal parts? What is the name of each fractional unit?',
      concreteFractionModel: LESSON1_PARTITION_RECTANGLES_MODEL,
      blankPrompts: [
        'Draw one rectangle for each part of the problem.',
        'Estimate equal parts and then count the partition lines you drew.'
      ],
      blankEquations: ['2 equal parts: ____ line, unit ____', '3 equal parts: ____ lines, unit ____', '4 equal parts: ____ lines, unit ____'],
      blankAnswerSentence: 'The number of interior lines is one fewer than the number of equal parts.',
      blankWorkspaceLabel: 'Use open drawing space to estimate the partitions.',
      blankVisualType: 'fraction-concrete-template',
      solvedAnswer: 'Two equal parts need 1 line and are halves; 3 equal parts need 2 lines and are thirds; 4 equal parts need 3 lines and are fourths.',
      equations: ['2 equal parts -> 1 line -> halves', '3 equal parts -> 2 lines -> thirds', '4 equal parts -> 3 lines -> fourths'],
      knownTotal: 4,
      knownGroupSize: 1,
      knownGroupCount: 3,
      quotient: 1,
      quotientMeaning: 'Each rectangle is one whole, and each interior line increases the number of equal parts by one.',
      animationType: 'fraction-concrete-model',
      unitLabel: 'partition lines',
      groupLabel: 'rectangles',
      explanation: 'The Teacher Edition Debrief asks whether students start fourths by making a half, then a half of a half. The solved model keeps that structure visible: 1 line makes 2 parts, 2 lines make 3 parts, and 3 lines make 4 parts.',
      validationChecks: [
        'Each drawing begins with one whole rectangle.',
        'The parts are estimated to be equal.',
        'The number of lines is one fewer than the number of equal parts.',
        'The fractional units are halves, thirds, and fourths.'
      ]
    },
    {
      number: 4,
      sourcePrompt: 'Each rectangle represents 1 sheet of paper. a. Estimate to show how you would cut the paper into fractional units as indicated below: sevenths and ninths. b. What do you notice? How many lines do you think you would draw to make a rectangle with 20 equal parts?',
      concreteFractionModel: LESSON1_PAPER_SHEETS_MODEL,
      blankPrompts: [
        'Each rectangle is 1 sheet of paper.',
        'Estimate cut lines for sevenths and ninths, then generalize to 20 equal parts.'
      ],
      blankEquations: ['sevenths: ____ lines', 'ninths: ____ lines', '20 equal parts: ____ lines'],
      blankAnswerSentence: 'I notice that the number of lines is ____ than the number of equal parts.',
      blankWorkspaceLabel: 'Estimate cut lines inside the two official paper rectangles.',
      blankVisualType: 'fraction-concrete-template',
      solvedAnswer: 'Sevenths need 6 lines, ninths need 8 lines, and 20 equal parts need 19 lines.',
      equations: ['7 equal parts -> 6 lines', '9 equal parts -> 8 lines', '20 equal parts -> 19 lines'],
      knownTotal: 20,
      knownGroupSize: 1,
      knownGroupCount: 2,
      quotient: 19,
      quotientMeaning: 'The 19 is the number of interior cut lines needed to make 20 equal parts.',
      animationType: 'fraction-concrete-model',
      unitLabel: 'cut lines',
      groupLabel: 'paper rectangles',
      explanation: 'Because the rectangle already has left and right sides, each interior cut adds one new part. That is why 7 parts need 6 lines, 9 parts need 8 lines, and 20 parts need 19 lines.',
      validationChecks: [
        'Each rectangle is treated as one sheet of paper.',
        'The labels are sevenths and ninths, exactly as in the Teacher Edition Problem Set.',
        'The cut lines are interior lines.',
        'The written notice explains the one-fewer-than-parts pattern.'
      ]
    },
    {
      number: 5,
      sourcePrompt: 'Rochelle has a strip of wood 12 inches long. She cuts it into pieces that are each 6 inches in length. What fraction of the wood is one piece? Use your strip from the lesson to help you. Draw a picture to show the piece of wood and how Rochelle cut it.',
      concreteFractionModel: LESSON1_WOOD_STRIP_MODEL,
      blankPrompts: [
        'Draw the whole 12-inch strip of wood.',
        'Mark where one 6-inch piece ends, and name that piece as a fraction of the whole.'
      ],
      blankEquations: ['12 inches total', '6 inches per piece', 'one piece = ____ of the wood'],
      blankAnswerSentence: 'One 6-inch piece is ____ of the 12-inch strip of wood.',
      blankWorkspaceLabel: 'Use the strip from the lesson: a 12-inch whole cut into 6-inch pieces.',
      blankVisualType: 'fraction-concrete-template',
      solvedAnswer: 'One piece is 1/2 of the wood.',
      equations: ['12 inches divided into 6-inch pieces gives 2 equal pieces', '1 of 2 equal pieces = 1/2'],
      knownTotal: 12,
      knownGroupSize: 6,
      knownGroupCount: 2,
      quotient: 1,
      quotientMeaning: 'One 6-inch piece is one of the two equal parts of the 12-inch whole.',
      animationType: 'fraction-concrete-model',
      unitLabel: 'inches',
      groupLabel: 'wood pieces',
      explanation: 'The lesson uses 12-inch strips to make equal parts. Here the whole is 12 inches, and a 6-inch cut makes two equal parts, so one piece is one half of the whole wood strip.',
      validationChecks: [
        'The whole strip is 12 inches long.',
        'Each piece is 6 inches long.',
        'The drawing shows two equal pieces.',
        'The answer names one piece as 1/2 of the wood.'
      ]
    }
  ];

  return {
    title: 'Lesson 1 concept: partition concrete wholes into equal parts',
    concept: 'The Teacher Edition builds fractional units from concrete wholes: a 12-inch strip is partitioned into halves, fourths, thirds, and sixths, and identical cups are used to partition a whole amount of liquid.',
    teacherEditionBasis: 'Module 5 Teacher Edition Lesson 1, printed pages 12-18.',
    contrast: 'The whole must be fixed before a fraction is named: the whole strip, the full beaker amount at the fill line, the whole string cheese, the whole sheet of paper, or the 12-inch wood strip.',
    summary: 'A unit fraction is one equal part of a named whole. Lesson 1 uses measurement, shading, and estimated partitions to connect concrete models to fraction names.',
    sourceNote: 'Teacher Edition Lesson 1 Concept Development and Problem Set, printed pages 12-18. Problem Set pages 16-17 supply the five official problem prompts and diagrams.',
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: sourcePageImages,
    conceptSections: [
      {
        title: '1. Partition 12-inch strips',
        body: 'Students measure a 12-inch strip, mark 6 inches to make halves, mark 3 and 9 inches to make fourths, then use a second strip marked at 4 and 8 inches for thirds and at 2, 6, and 10 inches for sixths.',
        teacherSource: 'Teacher Edition Lesson 1 Concept Development, Part 1, printed pages 12-13.',
        checkpoints: [
          'The strip is 12 inches long.',
          'Halves, fourths, thirds, and sixths are made by measurement marks.',
          'Students count unit fractions such as 1 half, 2 halves and 1 third, 2 thirds, 3 thirds.'
        ]
      },
      {
        title: '2. Partition liquid with cups',
        body: 'The Teacher Edition demonstration uses two identical cups: fill the right cup to a mark about one fourth up, pour into the left cup, mark the top, repeat, and use the left cup marks to show half and whole amounts.',
        teacherSource: 'Teacher Edition Lesson 1 Concept Development, Part 2, printed page 13.',
        checkpoints: [
          'The cups are identical.',
          'The repeated pour creates equal amounts.',
          'The middle mark is checked as half of the whole liquid amount.'
        ]
      },
      {
        title: '3. Problem Set sequence',
        body: 'The Problem Set asks students to shade beakers, name shaded string-cheese fractions, draw estimated partitions, generalize cut lines for paper rectangles, and solve a 12-inch strip of wood problem.',
        teacherSource: 'Teacher Edition Lesson 1 Problem Set, printed pages 16-17.',
        checkpoints: [
          'Problem 1 uses beakers labeled 1 half, 1 fourth, and 1 third.',
          'Problem 2 uses string-cheese rectangles partitioned into 3, 6, and 4 equal pieces.',
          'Problems 3-5 focus on partition lines and a 12-inch whole cut into 6-inch pieces.'
        ]
      },
      {
        title: '4. Debrief checks',
        body: 'The Debrief asks students to use fraction vocabulary, notice that smaller equal parts result when the same whole is divided into more parts, explain thirds and sixths, and compare solution strategies for the wood-strip problem.',
        teacherSource: 'Teacher Edition Lesson 1 Student Debrief, printed pages 14-15.',
        checkpoints: [
          'Use the words fractional units, equal parts, fraction, whole, halves, fourths, thirds, and sixths.',
          'The whole in Problem 2 never changes.',
          'Problem 5 should be checked with more than one solution strategy when possible.'
        ]
      }
    ],
    problems
  };
}

function makeLesson30(): ProblemSetCenteredLesson {
  const sourcePageImages = pageImages(pageRange(351, 355));
  const problem: ProblemSetCenteredProblem = {
    number: 1,
    sourcePrompt: 'There is no Problem Set sheet for this lesson. Use the same process to precisely mark off red strips into halves, fourths, fifths, sevenths, ninths, and tenths.',
    paperPartitionModel: LESSON30_PAPER_PARTITION_MODEL,
    blankPrompts: [
      'Set up the lined paper method shown in the Teacher Edition before marking the strip.',
      'Start with thirds: 0, 1/3, 2/3, and 1, using 5 paper spaces for each third.',
      'Then use the same process for the cooperative-group challenge units.'
    ],
    blankEquations: [
      '0, ____, ____, 1',
      '1 third = ____ equal paper spaces in the Teacher Edition demonstration'
    ],
    blankAnswerSentence: 'The strip is partitioned into ____ equal parts because the guide marks are equally spaced.',
    blankWorkspaceLabel: 'Teacher Edition setup: lined paper, base number line, extended guide lines, and a red strip.',
    blankVisualType: 'paper-partition-template',
    solvedAnswer: 'The red strip is partitioned into 3 equal thirds by transferring the equally spaced guide marks from the lined-paper number line.',
    equations: [
      '3 thirds = 1 whole',
      '5 spaces + 5 spaces + 5 spaces = 15 equal paper spaces',
      'The strip marks are 1/3 and 2/3 of the strip.'
    ],
    knownTotal: 1,
    knownGroupSize: 5,
    knownGroupCount: 3,
    quotient: 3,
    quotientMeaning: 'The 3 names the equal thirds made on the red strip in the Teacher Edition demonstration.',
    animationType: 'paper-partition-model',
    unitLabel: 'thirds',
    groupLabel: 'red-strip parts',
    explanation: 'The base number line is precise because each third uses 5 equal spaces on the lined paper. Extending those marks upward makes parallel guide lines. Angling the strip from 0 to 1 transfers the same fractional positions to the strip without measuring the strip first.',
    validationChecks: [
      'The base number line starts at 0 on the margin.',
      'Each third uses exactly 5 paper spaces.',
      'The guide lines extend from 0, 1/3, 2/3, and 1.',
      'The red strip touches 0 on the left and the line at 1 on the right.',
      'The marks on the strip can be verified as equal parts with a ruler.'
    ]
  };

  return {
    title: 'Lesson 30 concept: partition a strip precisely with a lined-paper number line',
    concept: 'The Teacher Edition teaches a ruler-free transfer method: make equal fractional units on lined paper, extend those marks, then angle a strip from 0 to 1 so the guide lines mark equal parts on the strip.',
    teacherEditionBasis: 'Module 5 Teacher Edition Lesson 30, printed pages 351-355.',
    contrast: 'The equal parts come from the lined-paper number line first; the red strip is marked only after it is angled from 0 to 1.',
    summary: 'A precise number line can be used as a transfer tool. If the guide marks on the paper are equal, the marks transferred to the angled strip partition that strip into equal fractional parts.',
    sourceNote: 'Teacher Edition pages 353-354 show Steps 1-5 with lined paper, vertical extensions, the red strip, and the no-sheet Problem Set challenge. Student Workbook page 120 is a written homework reflection, not a Problem Set sheet.',
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: sourcePageImages,
    conceptSections: [
      {
        title: '1. Build the base number line',
        body: 'The Teacher Edition turns the paper so the margin is horizontal, draws a number line on top of the margin, and marks the 0 endpoint.',
        teacherSource: 'Teacher Edition Lesson 30 Concept Development, Step 1, printed page 353.',
        checkpoints: [
          'The margin is horizontal.',
          'The number line begins at 0.',
          'Students discuss how lined paper can make equal parts.'
        ]
      },
      {
        title: '2. Use paper spaces as equal units',
        body: 'The Teacher Edition uses vertical paper lines as the measuring tool and makes each third 5 spaces long before labeling the number line from 0 to 1.',
        teacherSource: 'Teacher Edition Lesson 30 Concept Development, Step 2, printed page 353.',
        checkpoints: [
          'Each third is 5 paper spaces long.',
          'The labels are 0, 1/3, 2/3, and 1.',
          'Precision comes from equal paper spaces.'
        ]
      },
      {
        title: '3. Transfer marks to the red strip',
        body: 'The Teacher Edition extends the equal-part marks up the paper, angles the red strip from the 0 endpoint to the line at 1, and marks the strip where the vertical guide lines cross it.',
        teacherSource: 'Teacher Edition Lesson 30 Concept Development, Steps 3-5, printed pages 353-354.',
        checkpoints: [
          'Guide lines rise from each third mark.',
          'The strip left end touches 0.',
          'The strip right end touches the line at 1.'
        ]
      },
      {
        title: '4. Problem Set challenge',
        body: 'The Teacher Edition states that there is no Problem Set sheet. Cooperative groups use the same process to mark red strips into halves, fourths, fifths, sevenths, ninths, and tenths.',
        teacherSource: 'Teacher Edition Lesson 30 Problem Set, printed page 354.',
        checkpoints: [
          'Use the same process, not a new strategy.',
          'Try challenging units such as fifths, sevenths, ninths, and tenths.',
          'Verify that the new strip parts are equal.'
        ]
      }
    ],
    problems: [problem]
  };
}

function sourceForLesson(lessonNumber: number) {
  return STUDENT_WORK_SOURCE[`m5-l${lessonNumber}`];
}

function usesNumberLine(lessonNumber: number, prompt = ''): boolean {
  return lessonNumber >= 14 && lessonNumber <= 26 || lessonNumber === 30 || /number line/i.test(prompt);
}

function inferDenominator(prompt: string, lessonNumber: number): number {
  for (const { pattern, value } of DENOMINATOR_WORDS) {
    if (pattern.test(prompt)) {
      return value;
    }
  }
  const numericFraction = prompt.match(/\b\d+\s*\/\s*(\d{1,2})\b/);
  if (numericFraction) {
    return Math.max(2, Math.min(Number(numericFraction[1]), 12));
  }
  if (lessonNumber >= 24 && lessonNumber <= 26) {
    return 3;
  }
  if (lessonNumber >= 14) {
    return 4;
  }
  return 4;
}

function inferNumerator(prompt: string, denominator: number): number {
  const denominatorWord = DENOMINATOR_WORDS.find(({ value }) => value === denominator);
  if (denominatorWord) {
    const match = prompt.match(new RegExp(`\\b(\\d+|${Object.keys(NUMBER_WORDS).join('|')})\\s+(${denominatorWord.beforePattern})\\b`, 'i'));
    if (match) {
      const value = NUMBER_WORDS[match[1].toLowerCase()] ?? Number(match[1]);
      if (Number.isFinite(value)) {
        return Math.max(0, Math.min(value, denominator));
      }
    }
  }
  const numericFraction = prompt.match(/\b(\d+)\s*\/\s*\d{1,2}\b/);
  if (numericFraction) {
    return Math.max(0, Math.min(Number(numericFraction[1]), denominator));
  }
  return 1;
}

function modelName(animationType: ProblemSetAnimationType): string {
  return animationType === 'number-line-model' ? 'number line' : 'fraction strip or area model';
}

function uniqueFractionModels(models: ProblemSetFractionModel[]): ProblemSetFractionModel[] {
  const seen = new Set<string>();
  return models.filter((model) => {
    const key = `${model.numerator}/${model.denominator}/${model.label}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  }).slice(0, 8);
}

function fractionsFromPrompt(prompt: string): ProblemSetFractionModel[] {
  const models: ProblemSetFractionModel[] = [];
  const numberPattern = `\\d+|${Object.keys(NUMBER_WORDS).join('|')}`;
  for (const { pattern, beforePattern, value } of DENOMINATOR_WORDS) {
    const fractionPattern = new RegExp(`\\b(${numberPattern})\\s+(${beforePattern})\\b`, 'gi');
    let match: RegExpExecArray | null;
    while ((match = fractionPattern.exec(prompt))) {
      const numerator = NUMBER_WORDS[match[1].toLowerCase()] ?? Number(match[1]);
      if (Number.isFinite(numerator)) {
        models.push({
          label: `${numerator} ${DENOMINATOR_LABELS[value]}`,
          numerator: Math.max(0, Math.min(numerator, value)),
          denominator: value
        });
      }
    }
    if (pattern.test(prompt) && !models.some((model) => model.denominator === value)) {
      models.push({
        label: `1 ${DENOMINATOR_LABELS[value]}`,
        numerator: 1,
        denominator: value
      });
    }
  }
  const numericFractionPattern = /\b(\d+)\s*\/\s*(\d{1,2})\b/g;
  let numericMatch: RegExpExecArray | null;
  while ((numericMatch = numericFractionPattern.exec(prompt))) {
    const numerator = Number(numericMatch[1]);
    const denominator = Number(numericMatch[2]);
    if (denominator >= 2 && denominator <= 12) {
      models.push({
        label: `${numerator}/${denominator}`,
        numerator: Math.max(0, Math.min(numerator, denominator)),
        denominator
      });
    }
  }
  return uniqueFractionModels(models);
}

function numberLineModelsFromPrompt(prompt: string, lessonNumber: number, fractionModels: ProblemSetFractionModel[]): ProblemSetNumberLineModel[] {
  const lowerPrompt = prompt.toLowerCase();
  const wantsNumberLine = usesNumberLine(lessonNumber, prompt) || lowerPrompt.includes('number line');
  if (!wantsNumberLine) {
    return [];
  }
  const denominators = new Set<number>();
  for (const model of fractionModels) {
    denominators.add(model.denominator);
  }
  if (/halves/i.test(prompt)) denominators.add(2);
  if (/thirds/i.test(prompt)) denominators.add(3);
  if (/fourths|quarter/i.test(prompt)) denominators.add(4);
  if (/fifths/i.test(prompt)) denominators.add(5);
  if (!denominators.size) {
    denominators.add(lessonNumber >= 24 ? 3 : 4);
  }
  return Array.from(denominators).slice(0, 5).map((denominator) => ({
    label: DENOMINATOR_LABELS[denominator] ?? `${denominator} equal parts`,
    denominator,
    startLabel: lowerPrompt.includes('meter') ? '0 meters' : lowerPrompt.includes('hour') ? '0 hours' : '0',
    endLabel: lowerPrompt.includes('meter') ? '1 meter' : lowerPrompt.includes('hour') ? '1 hour' : '1',
    targetNumerators: Array.from({ length: denominator + 1 }, (_, index) => index)
  }));
}

function solvedAnswerFromModels(prompt: string, fractionModels: ProblemSetFractionModel[], numberLineModels: ProblemSetNumberLineModel[]): string {
  if (numberLineModels.length) {
    const model = numberLineModels[0];
    return `Partition the interval from ${model.startLabel ?? '0'} to ${model.endLabel ?? '1'} into ${model.denominator} equal parts and label each tick in ${DENOMINATOR_LABELS[model.denominator] ?? 'fractional units'}.`;
  }
  if (fractionModels.length >= 2 && /greater|less|compare|least|more|larger|smaller/i.test(prompt)) {
    const [first, second] = fractionModels;
    const firstValue = first.numerator / first.denominator;
    const secondValue = second.numerator / second.denominator;
    if (firstValue === secondValue) {
      return `${first.label} is equal to ${second.label} when the wholes are the same size.`;
    }
    const larger = firstValue > secondValue ? first : second;
    const smaller = firstValue > secondValue ? second : first;
    return `${larger.label} is greater than ${smaller.label} for the same-size whole.`;
  }
  if (fractionModels.length) {
    const model = fractionModels[0];
    return `Partition the whole into ${model.denominator} equal parts and shade ${model.numerator} ${DENOMINATOR_LABELS[model.denominator] ?? 'fractional units'}.`;
  }
  return 'Complete the official workbook model by partitioning the whole into equal parts, labeling the fractional unit, and answering in words.';
}

function makeProblem(lessonNumber: number, sourceProblem: M5WorkbookProblem & { equations?: string[] }): ProblemSetCenteredProblem {
  const override = M5_OVERRIDES[lessonNumber]?.[sourceProblem.number];
  const denominator = inferDenominator(sourceProblem.prompt, lessonNumber);
  const numerator = inferNumerator(sourceProblem.prompt, denominator);
  const animationType: ProblemSetAnimationType = usesNumberLine(lessonNumber, sourceProblem.prompt)
    ? 'number-line-model'
    : 'fraction-strip-model';
  const blankVisualType: ProblemSetBlankVisualType = animationType === 'number-line-model'
    ? 'number-line-template'
    : 'fraction-strip-template';
  const model = modelName(animationType);
  const fractionModels = override?.fractionModels ?? fractionsFromPrompt(sourceProblem.prompt);
  const numberLineModels = override?.numberLineModels ?? numberLineModelsFromPrompt(sourceProblem.prompt, lessonNumber, fractionModels);
  const equations = sourceProblem.equations?.length
    ? sourceProblem.equations
    : fractionModels.map((fractionModel) => `${fractionModel.label} = ${fractionModel.numerator}/${fractionModel.denominator}`);
  const solvedAnswer = override?.solvedAnswer ?? solvedAnswerFromModels(sourceProblem.prompt, fractionModels, numberLineModels);

  return {
    number: sourceProblem.number,
    sourcePrompt: sourceProblem.prompt,
    fractionModels,
    numberLineModels,
    blankPrompts: [
      'Complete the official workbook prompt, drawing, labels, and blanks for this item using the model below.',
      'Name the whole before naming or comparing the fraction.'
    ],
    blankEquations: blankEquationTemplates(equations),
    blankAnswerSentence: 'Answer in a complete sentence with the fraction unit and whole named.',
    blankWorkspaceLabel: `Use the workbook scaffold to build the ${model}.`,
    blankVisualType,
    solvedAnswer,
    equations,
    knownTotal: denominator,
    knownGroupSize: denominator,
    knownGroupCount: denominator,
    quotient: numerator,
    quotientMeaning: override?.quotientMeaning ?? `The model names ${numerator} copy${numerator === 1 ? '' : 'ies'} of a unit fraction from a whole partitioned into ${denominator} equal part${denominator === 1 ? '' : 's'}.`,
    animationType,
    unitLabel: 'equal parts',
    groupLabel: animationType === 'number-line-model' ? 'intervals' : 'fractional units',
    explanation: numberLineModels.length
      ? 'Use equal intervals on the number line. Count intervals from 0, not tick marks, and label 0 and 1 with the same fractional unit used in the workbook problem.'
      : 'Use the same-size whole from the workbook problem. Partition it into equal parts first, then shade, compare, or label the fractional units requested by the prompt.',
    validationChecks: [
      'The model uses the same whole throughout the problem.',
      'All parts or intervals are equal before the fraction is named.',
      'The final answer names both the fraction and what the whole represents.'
    ]
  };
}

function makeLesson(lessonNumber: number): ProblemSetCenteredLesson {
  if (lessonNumber === 1) {
    return makeLesson1();
  }
  if (lessonNumber === 30) {
    return makeLesson30();
  }

  const source = sourceForLesson(lessonNumber);
  const objective = M5_OBJECTIVES[lessonNumber];
  const sourceProblems = M5_WORKBOOK_PROBLEMS[lessonNumber]?.length
    ? M5_WORKBOOK_PROBLEMS[lessonNumber]
    : (source?.problems ?? []);
  const problems = (sourceProblems.length ? sourceProblems : [
    {
      number: 1,
      prompt: source?.teacherEditionReference ?? objective,
      equations: []
    }
  ]).map((problem) => makeProblem(lessonNumber, problem));
  const sourcePageImages = teacherEditionLessonPages(source?.teacherEditionSource ?? '');
  return {
    title: `Lesson ${lessonNumber} concept: ${objective}`,
    concept: `Build the official Problem Set with interactive fraction models. The workbook prompt supplies the task; the model below preserves the lesson focus on equal parts, named wholes, fraction strips, and number lines.`,
    teacherEditionBasis: source?.teacherEditionSource ?? `Module 5 Teacher Edition, Lesson ${lessonNumber}.`,
    contrast: 'Before solving, identify the whole and the equal parts. When comparing or finding equivalence, keep the whole and unit interval consistent.',
    summary: 'A fraction only makes sense after the whole is named and partitioned into equal parts. Use the official Problem Set model to justify the fraction, comparison, equivalence, or number-line location.',
    sourceNote: source?.studentWorkbookSource ?? `Module 5 student workbook, Lesson ${lessonNumber}.`,
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: sourcePageImages,
    conceptSections: [
      {
        title: '1. Teacher Edition concept',
        body: source?.teacherEditionReference ?? objective,
        teacherSource: source?.teacherEditionSource ?? `Module 5 Teacher Edition, Lesson ${lessonNumber}.`,
        checkpoints: [
          'State the whole before naming the fraction.',
          'Check that all parts or intervals are equal.',
          'Use lesson vocabulary such as whole, unit fraction, equivalent fraction, and number line where it applies.'
        ]
      },
      {
        title: '2. Official Problem Set focus',
        body: 'Blank mode keeps the exact workbook prompt and an empty fraction scaffold. Solved mode completes that same scaffold with shaded units, labels, comparison reasoning, and validation checks.',
        teacherSource: source?.studentWorkbookSource ?? `Module 5 student workbook, Lesson ${lessonNumber}.`,
        checkpoints: [
          'Use the workbook problem order.',
          'Keep labels, blanks, and diagrams tied to the official prompt.',
          'Do not substitute a parallel invented fraction task.'
        ]
      },
      {
        title: '3. Debrief and validation',
        body: source?.teacherDebrief ?? 'Use the Teacher Edition debrief to check the model, fraction language, and answer meaning.',
        teacherSource: source?.teacherEditionSource ?? `Module 5 Teacher Edition, Lesson ${lessonNumber}.`,
        checkpoints: [
          'Explain how the model proves the fraction.',
          'When comparing, confirm the wholes are the same size or explain why they are different.',
          'When using a number line, confirm each interval has the same length.'
        ]
      }
    ],
    problems
  };
}

export const M5_PROBLEM_SET_CENTERED_LESSONS: Record<number, ProblemSetCenteredLesson> = Object.fromEntries(
  Array.from({ length: 30 }, (_, index) => {
    const lessonNumber = index + 1;
    return [lessonNumber, makeLesson(lessonNumber)];
  })
) as Record<number, ProblemSetCenteredLesson>;
