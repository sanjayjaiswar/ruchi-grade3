import { STUDENT_WORK_SOURCE } from '../../student-work-source.generated';
import type {
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetConcreteFractionModel,
  ProblemSetFractionModel,
  ProblemSetNumberLineModel,
  ProblemSetPaperPartitionModel,
  ProblemVisualSection,
  ProblemVisualSpec
} from '../lesson-runtime.types';
import { M5_WORKBOOK_PROBLEMS, type M5WorkbookProblem } from './workbook-problems';
import {
  M5_SOURCE_PROBLEM_EVIDENCE,
  type M5SourceProblemEvidence
} from './source-problem-evidence.generated';
import {
  M5_TEACHER_OBJECTIVES,
  m5FunctionalConceptSections,
  m5TeacherSource
} from './functional-fidelity';
import { hydrateVisualAnswerMetadata } from '../visual-answer-hydration';

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

function sourceProblemEvidence(
  lessonNumber: number,
  problemNumber: number
): M5SourceProblemEvidence {
  const evidence = M5_SOURCE_PROBLEM_EVIDENCE[lessonNumber]?.find(
    (problem) => problem.number === problemNumber
  );
  if (!evidence) {
    throw new Error(
      `Missing Teacher Edition source evidence for Module 5 Lesson ${lessonNumber} Problem ${problemNumber}.`
    );
  }
  return evidence;
}

function sourceTaskPageImages(
  lessonNumber: number,
  problemNumber: number
): string[] {
  return [
    ...new Set(
      sourceProblemEvidence(lessonNumber, problemNumber).sourceCrops.map(
        ([pdfPage]) => `${m5TeacherPageBase}/page-${pdfPage}.png`
      )
    )
  ];
}

const M5_ANSWER_KEY_SOURCE_PAGES: Record<number, string[]> = {
  1: pageImages(pageRange(368, 368)),
  2: pageImages(pageRange(369, 369)),
  3: pageImages(pageRange(370, 371)),
  4: pageImages(pageRange(372, 373)),
  5: pageImages(pageRange(374, 374)),
  6: pageImages(pageRange(375, 376)),
  7: pageImages(pageRange(377, 378)),
  8: pageImages(pageRange(379, 381)),
  9: pageImages(pageRange(382, 383)),
  10: pageImages(pageRange(384, 385)),
  11: pageImages(pageRange(386, 386)),
  12: pageImages(pageRange(387, 388)),
  13: pageImages(pageRange(389, 389)),
  14: pageImages(pageRange(390, 391)),
  15: pageImages(pageRange(392, 393)),
  16: pageImages(pageRange(394, 395)),
  17: pageImages(pageRange(396, 397)),
  18: pageImages(pageRange(398, 399)),
  19: pageImages(pageRange(400, 401)),
  20: pageImages(pageRange(402, 403)),
  21: pageImages(pageRange(404, 404)),
  22: pageImages(pageRange(405, 405)),
  23: pageImages(pageRange(406, 407)),
  24: pageImages(pageRange(408, 409)),
  25: pageImages(pageRange(410, 411)),
  26: pageImages(pageRange(412, 413)),
  27: pageImages(pageRange(414, 415)),
  28: pageImages(pageRange(416, 417)),
  29: pageImages(pageRange(418, 419)),
  30: pageImages(pageRange(420, 420))
};

const M5_TEACHER_ANSWER_OVERRIDES: Record<number, Record<number, string>> = {
  2: {
    1: 'Circle the first and last strips; those are folded to make equal parts.',
    2: 'a. 4 equal parts, 2 shaded. b. 6 equal parts, 5 shaded. c. 7 equal parts, 3 shaded. d. 7 equal parts, 0 shaded.',
    3: 'Use thirds. Sharon gets 1/3 of the candy bar.',
    4: 'a. Each part is 1/4 of the original cardboard. b. The matching strip shows sixths, so each part is 1/6 of the original cardboard.'
  },
  3: {
    1: 'Eighths: 5 eighths are shaded. Thirds: 3 thirds are shaded. Halves: 1 half is shaded.',
    2: 'Circle the first, third, and fifth shapes. Student sentences should explain that equal parts are the same size.',
    3: 'Each shape is divided into 4 equal parts; the fractional unit is fourths.',
    4: 'Divide and shade the wholes to show 1 half, 1 sixth, and 1 third.',
    5: 'Answers will vary, but each whole should be divided into equal parts using a fractional unit other than fourths.',
    6: 'Divide the candy bar into 5 equal parts. Each person receives 1/5 of the candy bar.'
  },
  4: {
    1: 'Answers will vary.',
    2: 'Answers will vary.',
    3: 'Answers will vary.',
    4: 'Answers will vary.',
    5: 'Answers will vary.',
    6: 'Answers will vary.'
  },
  5: {
    1: 'a. 2, 1, 1 half, 1/2. b. 3, 1, 1 third, 1/3. c. 4, 1, 1 fourth, 1/4. d. 5, 1, 1 fifth, 1/5. e. 6, 1, 1 sixth, 1/6. f. 8, 1, 1 eighth, 1/8.',
    2: 'No; explanations will vary.',
    3: 'Draw lines to show tenths. There are 10 people, so each person receives 1/10 of the cake.',
    4: 'Draw and label 1/10 and 1/8. One eighth is bigger than one tenth when the cakes are the same size.'
  },
  6: {
    1: 'Partition, label, and shade correctly: a. 3/4. b. 3/7. c. 4/5. d. 2/6.',
    2: 'a. 1/8. b. 7/8.',
    3: 'a. 9, 5, 1/9, 5/9. b. 7, 3, 1/7, 3/7. c. 5, 4, 1/5, 4/5. d. 6, 2, 1/6, 2/6. e. 8, 8, 1/8, 8/8.'
  },
  7: {
    1: '1 half.',
    2: '3 fourths.',
    3: '8 ninths.',
    4: '5 sixths.',
    5: '4 fifths.',
    6: '2 thirds.',
    7: '6 sevenths.',
    8: '7 eighths.',
    9: 'a. 8. b. 9. c. 12.',
    10: 'The shaded and unshaded fractions are 1/5 and 4/5; 1/7 and 6/7; 1/11 and 10/11.',
    11: 'Avanti has not read 5/6 of her book.'
  },
  8: {
    1: 'Number bond showing 3/5 and 2/5 equals 1 whole; draw a different visual model represented by the same number bond.',
    2: 'Number bond showing 3/4 and 1/4 equals 1 whole; draw a different visual model represented by the same number bond.',
    3: 'Number bond showing 3/6 and 3/6 equals 1 whole; draw a different visual model represented by the same number bond.',
    4: 'Number bond showing 2/9 and 7/9 equals 1 whole; draw a different visual model represented by the same number bond.',
    5: 'a. 3/4 and 1/4 make 1 whole; decompose 3/4 into three units of 1/4. b. 2/3 and 1/3 make 1 whole; decompose 2/3 into two units of 1/3. c. 2/4 and 2/4 make 1 whole; decompose both parts into units of 1/4. d. 2/5 and 3/5 make 1 whole; decompose into units of 1/5.',
    6: 'a. 3/4. b. 3 more hamburgers. c. Draw a number bond showing 3/4 and 1/4 equals 1 whole, decompose 3/4 into three units of 1/4, and draw the second visual model.'
  },
  9: {
    1: 'a. Sample: 1/2, 5 units shaded, 5/2. b. 1/8, 15, 15/8. c. 1/6, 14, 14/6. d. 1/5, 8, 8/5. e. 1/4, 9, 9/4. f. 1/3, 7, 7/3.',
    2: 'a. Partition each whole into sixths; shade 8 sixths, 8/6. b. Partition each whole into fourths; shade 7 fourths, 7/4. c. Partition each whole into fifths; shade 6 fifths. d. Partition each whole into halves; shade 5 halves.',
    3: 'Draw 2 equivalent wholes, partition each into 8 equal pieces, and shade 10 pieces. The fraction is 10/8.'
  },
  10: {
    1: 'Shade the specified fractional unit in each strip.',
    2: 'a. Greater than. b. Less than. c. Less than. d. Greater than. e. Less than. f. Less than. g. Greater than. h. Greater than.',
    3: 'Lily uses more oil; explanations will vary.',
    4: 'a. >. b. <. c. =. d. >. e. <. f. =. g. =, <, <, <, =.',
    5: 'No; explanations will vary.'
  },
  11: {
    1: '1/3; answers will vary.',
    2: '1/5; answers will vary.',
    3: '1/10; answers will vary.',
    4: '1/12; answers will vary.',
    5: 'Answers will vary; the source unit fraction is 1/8.',
    6: 'Answers will vary; the source unit fraction is 1/9.',
    7: 'Answers will vary; the source unit fraction is 1/12.',
    8: 'Answers will vary.',
    9: 'No; explanations will vary.',
    10: 'No; explanations will vary.'
  },
  12: {
    1: 'Answers will vary.',
    2: 'Answers will vary.',
    3: 'Answers will vary.',
    4: 'Answers will vary.',
    5: 'Answers will vary.',
    6: 'Answers will vary.'
  },
  13: {
    1: 'a. 1/2. b. Divide the shaded part to show 2 equal parts.',
    2: 'a. 1/4. b. Divide the shaded part to show 4 equal parts.',
    3: 'a. 1/3. b. Divide the shaded part to show 3 equal parts.',
    4: 'a. 1/5. b. Divide the shaded part to show 5 equal parts.',
    5: 'a. 1/6. b. Divide the shaded part to show 6 equal parts.',
    6: 'a. C. b. B. c. A. d. 2; 1/2. e. 1/2; 1/4.',
    7: 'Answers will vary.'
  },
  14: {
    1: 'Partition and label the number lines for halves, thirds, fourths, and fifths from 0 to 1.',
    2: 'The hour number line is labeled from 0/4 to 4/4, with 4/4 equal to 1 hour.',
    3: 'The meter number line is labeled from 0/5 to 5/5, with 5/5 equal to 1 meter.'
  },
  15: {
    1: 'a. Partition into thirds and label 0/3, 2/3, and 3/3; the provided bond is 2/3 + 1/3 = 1. b. Partition into fourths and label 0/4, 3/4, and 4/4; show 3/4 + 1/4 = 1. c. Partition into fifths and label 0/5, 3/5, and 5/5; show 3/5 + 2/5 = 1. d. Partition into sixths and label 0/6, 5/6, and 6/6; show 5/6 + 1/6 = 1. e. Partition into tenths and label 0/10, 3/10, and 10/10; show 3/10 + 7/10 = 1.',
    2: 'Draw a number line from 0 to 1, partition it into eighths, and label from 0/8 to 8/8.',
    3: 'a. 4 equal parts; label the rope from 0/4 to 4/4. b. 2/4. c. 1/5.'
  },
  16: {
    1: 'a. Sample halves line: label 0/2, 1/2, 2/2, 3/2, and 4/2; box 0/2, 2/2, and 4/2. b. Partition into thirds; box 3/3 and 6/3. c. Partition into halves; box 4/2, 6/2, and 8/2. d. Partition into fourths; box 12/4, 16/4, and 20/4. e. Partition into thirds; box 18/3, 21/3, 24/3, and 27/3.',
    2: 'Partition into fifths and label the number line; box 0/5, 5/5, and 10/5.',
    3: 'Partition into thirds and label the number line; box 3/3, 6/3, 9/3, and 12/3.',
    4: 'Draw a number line with endpoints 0 and 3, label the wholes, then partition and label the fractional units.'
  },
  17: {
    1: 'Partition the number line into sixths; locate and label the given fractions.',
    2: 'Partition the number line into fourths; locate and label the given fractions.',
    3: 'Partition the number line into thirds; locate and label the given fractions.',
    4: 'Alex; 2 inches is 8/4 inches, and 8/4 is greater than 7/4. A fourths number line shows Alex’s 2-inch finger is longer.',
    5: 'Draw a number line from 0 km to 4 km, partitioned into fifths; locate and label 0/5, 20/5, 7/5, and 12/5.'
  },
  18: {
    1: 'Sample: partition the number line into fourths; place 1/4 and 3/4, circle 1/4 as closest to 0, and write 1/4 < 3/4.',
    2: 'Partition into sixths; place 2/6 and 3/6, circle 2/6 as closest to 0, and write 2/6 < 3/6.',
    3: 'Partition into halves and fourths; place 1/2 and 1/4, circle 1/4 as closest to 0, and write 1/2 > 1/4.',
    4: 'Partition into thirds and sixths; place 2/3 and 2/6, circle 2/6 as closest to 0, and write 2/3 > 2/6.',
    5: 'Partition into eighths and fourths; place 11/8 and 7/4, circle 11/8 as closest to 0, and write 11/8 < 7/4.',
    6: 'JoAnn walks less. On same-length number lines, 5/6 is closer to 0 than 7/8, so 5/6 < 7/8.',
    7: 'The red thread is shorter: 4/5 is less than 1 whole, while 5/4 is greater than 1 whole.',
    8: 'Place 7/8, 7/4, and 4/2 on the number line; 7/8 < 7/4 < 4/2; explanations will vary.'
  },
  19: {
    1: 'a. Divide into halves and place the given fractions. b. Divide into fourths and place the given fractions. c. Divide into eighths and place the given fractions. Write each whole as a fraction.',
    2: 'Row 1: <, <, >. Row 2: >, <, =. Row 3: <, >, >.',
    3: 'Answers will vary.',
    4: 'Answers will vary.',
    5: 'Answers will vary.'
  },
  20: {
    1: 'a. 4/8, 4/8, 3/8, 4/8; circle the first, second, and last shapes. b. 2/5, 1/5, 2/5, 2/5; circle the first, third, and last shapes. c. 2/6, 2/6, 4/6, 3/6; circle the first and second shapes.',
    2: 'a. 1/4; draw two different representations of 1/4. b. 1/7; draw two different representations of 1/7.',
    3: 'a. Triangles and squares. b. 4 triangles and 4 squares. c. Draw at least two different representations of Ann\'s set with no overlaps; 2/6.',
    4: 'Cristina; explanations will vary.'
  },
  21: {
    1: 'First pair: label the halves line with 0/2 and 3/2 and the fourths line with 1/4, 2/4, 4/4, 6/4, and 8/4. Second pair: label the halves line with 0/2, 2/2, and 3/2 and the sixths line with 1/6, 3/6, 6/6, 9/6, and 12/6.',
    2: 'Shade blue: 1/2 with 2/4, and 1/2 with 3/6. Shade yellow: 2/2 with 4/4, and 2/2 with 6/6. Shade green: 3/2 with 6/4, and 3/2 with 9/6. Shade red: 4/2 with 8/4, and 4/2 with 12/6.',
    3: 'Complete the number sentences: 2/4 = 3/6; 6/6 = 2/2 = 4/4; and 3/2 = 9/6 = 6/4.',
    4: 'Jill’s gauge reads 4/8 inch because Jack’s 2/4 inch and Jill’s 4/8 inch name the same point on the number line.',
    5: 'Yes; 1/2 = 2/4 = 4/8. Explanations will vary.'
  },
  22: {
    1: 'Match 1/2 to 2/4, 4/6 to 2/3, 3/4 to 6/8, and 3/9 to 1/3.',
    2: '2; 8; 16.',
    3: 'Explanations will vary.',
    4: '2 sixths; explanations will vary.',
    5: 'Explanations will vary.'
  },
  23: {
    1: 'Divide and label the number line into fourths in red pencil.',
    2: 'Divide and label the number line into eighths in blue pencil.',
    3: 'Equivalent labels include 0/4 = 0/8, 1/4 = 2/8, 2/4 = 4/8, 3/4 = 6/8, 4/4 = 8/8, continuing through 12/4 = 24/8.',
    4: '7/2 = 14/4 = 28/8; draw, divide, and label the number line to show these fractions at the same point.',
    5: 'Possible pairs are 1/3 = 2/6; 2/4 = 1/2 or 4/8; 5/4 = 10/8; and 10/5 = 2/1. Other equivalent pairs that match the plotted dots are acceptable.',
    6: 'No. Cameron rests after 2/3 of the race, while Terrance rests after 2/6 = 1/3. Since 2/3 > 2/6, Cameron rests farther along the course.'
  },
  24: {
    1: 'Complete the number bonds and number lines for halves, thirds, fourths, and fifths; rename 0 and 1 as fractions in each unit.',
    2: '2/2 = 3/3 = 4/4 = 5/5 = 1.',
    3: 'In every fraction equivalent to 1, the numerator equals the denominator.',
    4: 'No. Taylor ate 4/4 of one pizza and his brother ate 3/3 of one pizza. Both fractions equal 1 whole pizza.'
  },
  25: {
    1: 'Label the source models 3/3, 3/2, 3/1, 4/4, 4/2, 4/1, 6/6, 6/3, and 6/1.',
    2: 'Fill the missing whole numbers 2, 3, 5, and 6 below the line. Rename the points above it as 0/1, 1/1, 2/1, 3/1, 4/1, 5/1, and 6/1.',
    3: 'Sample: 2/1 means 2 wholes, while 2/2 means 1 whole. The numerators match, but the fractional units are different sizes.'
  },
  26: {
    1: 'Halves: complete 0, 0; 2, 2; 4 and the number bonds. Thirds: complete 6, 6; 9, 9; 12, 12 and the number bonds.',
    2: 'Halves sample: 4/2, 6/2, 8/2. Thirds: 6/3, 9/3, 12/3. Fourths: 8/4, 12/4, 16/4. Sixths: 12/6, 18/6, 24/6.',
    3: 'a. Partition a 1-meter wire into fourths; 4 pieces. b. 12 days.',
    4: 'a. Partition 1 pound of food into thirds. b. Partition 4 pounds into thirds; 1. c. 2.'
  },
  27: {
    1: '2, 2, bigger, less. 4, 4, smaller, more.',
    2: 'Each friend receives 1/2 of a candy bar: give the 2 halves to 2 friends, combine the 4 fourths into two shares of 2/4, and combine the 6 sixths into two shares of 3/6. Thus 1/2 = 2/4 = 3/6.',
    3: 'Six copies of 1/8 and three copies of 1/4 cover the same amount because each fourth is equal to two eighths: 6/8 = 3/4.',
    4: '2 sixths; draw a model.',
    5: 'Sample: doubling the 4 equal parts makes 8 equal parts. Each fourth becomes 2 eighths, so 1/4 = 2/8 and 4/4 = 8/8.'
  },
  28: {
    1: 'Shade the models correctly; circle 2 thirds.',
    2: 'Shade the models correctly; circle 2 eighths.',
    3: 'Shade the models correctly; circle 3 fourths.',
    4: 'Shade the models correctly; circle 4 sixths.',
    5: 'Shade the models correctly; circle 3 thirds.',
    6: 'Kelly; draw tape diagrams correctly.',
    7: 'Becky; draw tape diagrams correctly.',
    8: 'Doll B, Doll A, Doll C; draw a picture.'
  },
  29: {
    1: 'Sample: 2/6 < 2/3. The same whole is used, and sixths are smaller units than thirds.',
    2: '3/4 > 3/8.',
    3: '1/4 < 1/2.',
    4: '4/4 > 4/6.',
    5: 'a. <. b. >. c. >.',
    6: 'Draw models correctly; <.',
    7: 'Draw models correctly; >.',
    8: 'Nicholas; draw models correctly.',
    9: 'Robbie; draw models correctly.'
  },
  30: {
    1: 'Answers will vary.'
  }
};

const M5_PROBLEM_LIST_OVERRIDES: Record<number, M5WorkbookProblem[]> = {
  7: [
    { number: 1, prompt: 'Write a fraction to name the shaded part shown in the model.' },
    { number: 2, prompt: 'Write a fraction to name the shaded part shown in the model.' },
    { number: 3, prompt: 'Write a fraction to name the shaded part shown in the model.' },
    { number: 4, prompt: 'Write a fraction to name the shaded part shown in the model.' },
    { number: 5, prompt: 'Write a fraction to name the shaded part shown in the model.' },
    { number: 6, prompt: 'Write a fraction to name the shaded part shown in the model.' },
    { number: 7, prompt: 'Write a fraction to name the shaded part shown in the model.' },
    { number: 8, prompt: 'Write a fraction to name the shaded part shown in the model.' },
    { number: 9, prompt: 'a. How many eighths are in 1 whole? b. How many ninths are in 1 whole? c. How many twelfths are in 1 whole?' },
    { number: 10, prompt: 'Each strip represents 1 whole. Write a fraction to label the shaded and unshaded parts.' },
    { number: 11, prompt: 'Avanti read 1 sixth of her book. What fraction of the book has she not read yet?' }
  ],
  8: [
    { number: 1, prompt: 'Show a number bond representing the 3/5 shaded and 2/5 unshaded parts of the figure. Draw a different visual model represented by the same number bond.' },
    { number: 2, prompt: 'Show a number bond representing the 3/4 shaded and 1/4 unshaded parts of the figure. Draw a different visual model represented by the same number bond.' },
    { number: 3, prompt: 'Show a number bond representing the 3/6 shaded and 3/6 unshaded parts of the figure. Draw a different visual model represented by the same number bond.' },
    { number: 4, prompt: 'Show a number bond representing the 2/9 shaded and 7/9 unshaded parts of the figure. Draw a different visual model represented by the same number bond.' },
    { number: 5, prompt: 'Draw a number bond with 2 parts showing the shaded and unshaded fractions of each figure. Decompose both parts of the number bond into unit fractions.' },
    { number: 6, prompt: 'The chef put 1/4 of the ground beef on the grill to make one hamburger and put the rest in the refrigerator. Draw a number bond and visual model. What fraction was refrigerated, and how many more same-size hamburgers can he make?' }
  ],
  12: [
    { number: 1, prompt: 'Yellow strip: draw at least one number bond that matches the drawing.' },
    { number: 2, prompt: 'Brown strip: draw at least one number bond that matches the drawing.' },
    { number: 3, prompt: 'Orange square: draw at least one number bond that matches the drawing.' },
    { number: 4, prompt: 'Yarn: draw at least one number bond that matches the drawing.' },
    { number: 5, prompt: 'Water: draw at least one number bond that matches the drawing.' },
    { number: 6, prompt: 'Clay: draw at least one number bond that matches the drawing.' }
  ],
  13: [
    { number: 1, prompt: 'Name the shaded fractional part. Then divide the shaded part to show the designated whole.' },
    { number: 2, prompt: 'Name the shaded fractional part. Then divide the shaded part to show the designated whole.' },
    { number: 3, prompt: 'Name the shaded fractional part. Then divide the shaded part to show the designated whole.' },
    { number: 4, prompt: 'Name the shaded fractional part. Then divide the shaded part to show the designated whole.' },
    { number: 5, prompt: 'Name the shaded fractional part. Then divide the shaded part to show the designated whole.' },
    { number: 6, prompt: 'Use the diagram of Rope A, Rope B, and Rope C to complete the statements about different wholes.' },
    { number: 7, prompt: 'Ms. Fan drew a figure and asked the class to name the shaded fraction. Explain the answer based on the designated whole.' }
  ],
  24: [
    { number: 1, prompt: 'Complete the number bond as indicated by the fractional unit. Partition the number line into the given fractional unit, and label the fractions. Rename 0 and 1 as fractions of the given unit. The first one is done for you.' },
    { number: 2, prompt: 'Circle all the fractions in Problem 1 that are equal to 1. Write them in a number sentence beginning with 2/2.' },
    { number: 3, prompt: 'What pattern do you notice in the fractions that are equivalent to 1?' },
    { number: 4, prompt: 'Taylor and his little brother each ate a whole small pizza. Taylor\'s pizza was cut in fourths, and his brother\'s was cut in thirds. His brother says Taylor got more because Taylor got 4 pieces and he got only 3. Should he be mad? Explain using words, pictures, or a number line.' }
  ],
  26: [
    { number: 1, prompt: 'Partition the number line to show the fractional units. Then, draw number bonds using copies of 1 whole for the circled whole numbers.' },
    { number: 2, prompt: 'Write the fractions that name the whole numbers for each fractional unit. The first one has been done.' },
    { number: 3, prompt: 'Sammy uses 1/4 meter of wire each day to make things. a. Draw a number line to represent 1 meter of wire. Partition the number line to represent how much Sammy uses each day. How many days does the wire last? b. How many days will 3 meters of wire last?' },
    { number: 4, prompt: 'Cindy feeds her dog 1/3 pound of food each day. a. Draw a number line to represent 1 pound of food. Partition the number line to represent how much food she uses each day. b. Draw another number line to represent 4 pounds of food. After 3 days, how many pounds of food has she given her dog? c. After 6 days, how many pounds of food has she given her dog?' }
  ],
  27: [
    { number: 1, prompt: 'Use the pictures to model equivalent fractions. Fill in the blanks, and answer the questions.' },
    { number: 2, prompt: '6 friends want to share 3 chocolate bars that are all the same size, which are represented by the 3 rectangles below. When the bars are unwrapped, the friends notice that the first chocolate bar is cut into 2 equal parts, the second is cut into 4 equal parts, and the third is cut into 6 equal parts. How can the 6 friends share the chocolate bars equally without breaking any of the pieces?' },
    { number: 3, prompt: 'When the whole is the same, why does it take 6 copies of 1 eighth to equal 3 copies of 1 fourth? Draw a model to support your answer.' },
    { number: 4, prompt: 'When the whole is the same, how many sixths does it take to equal 1 third? Draw a model to support your answer.' },
    { number: 5, prompt: 'You have a magic wand that doubles the number of equal parts but keeps the whole the same size. Use your magic wand. In the space below, draw to show what happens to a rectangle that is partitioned in fourths after you tap it with your wand. Use words and numbers to explain what happened.' }
  ],
  28: [
    { number: 1, prompt: 'Shade the models to compare the fractions. Circle the larger fraction. 2 fifths and 2 thirds.' },
    { number: 2, prompt: 'Shade the models to compare the fractions. Circle the larger fraction. 2 tenths and 2 eighths.' },
    { number: 3, prompt: 'Shade the models to compare the fractions. Circle the larger fraction. 3 fourths and 3 eighths.' },
    { number: 4, prompt: 'Shade the models to compare the fractions. Circle the larger fraction. 4 eighths and 4 sixths.' },
    { number: 5, prompt: 'Shade the models to compare the fractions. Circle the larger fraction. 3 thirds and 3 sixths.' },
    { number: 6, prompt: 'After softball, Leslie and Kelly each buy a half-liter bottle of water. Leslie drinks 3 fourths of her water. Kelly drinks 3 fifths of her water. Who drinks the least amount of water? Draw a picture to support your answer.' },
    { number: 7, prompt: 'Becky and Malory get matching piggy banks. Becky fills 2 thirds of her piggy bank with pennies. Malory fills 2 fourths of her piggy bank with pennies. Whose piggy bank has more pennies? Draw a picture to support your answer.' },
    { number: 8, prompt: 'Heidi lines up her dolls in order from shortest to tallest. Doll A is 2 fourths foot tall, Doll B is 2 sixths foot tall, and Doll C is 2 thirds foot tall. Compare the heights of the dolls to show how Heidi puts them in order. Draw a picture to support your answer.' }
  ],
  29: [
    { number: 1, prompt: 'Label each shaded fraction. Use >, <, or = to compare. The first one has been done for you: 2/6 < 2/3.' },
    { number: 2, prompt: 'Label each shaded fraction. Use >, <, or = to compare: 3/4 and 3/8.' },
    { number: 3, prompt: 'Label each shaded fraction. Use >, <, or = to compare: 1/4 and 1/2.' },
    { number: 4, prompt: 'Label each shaded fraction. Use >, <, or = to compare: 4/4 and 4/6.' },
    { number: 5, prompt: 'Partition each number line into the units labeled on the left. Then use the number lines to compare the fractions.' },
    { number: 6, prompt: 'Draw your own model to compare the following fractions: 3/10 and 3/5.' },
    { number: 7, prompt: 'Draw your own model to compare the following fractions: 2/6 and 2/8.' },
    { number: 8, prompt: 'John ran 2 thirds of a kilometer after school. Nicholas ran 2 fifths of a kilometer after school. Who ran the shorter distance? Use the model below to support your answer. Be sure to label 1 whole as 1 kilometer.' },
    { number: 9, prompt: 'Erica ate 2 ninths of a licorice stick. Robbie ate 2 fifths of an identical licorice stick. Who ate more? Use the model below to support your answer.' }
  ]
};

const M5_L11_SHARED_PROMPT = 'Label the unit fraction. In each blank, draw and label the same whole with a shaded unit fraction that makes the sentence true. There is more than 1 correct way to make the sentence true.';
const M5_L12_SHARED_PROMPT = 'For each of the following: Draw a picture of the designated unit fraction copied to make at least two different wholes. Label the unit fractions. Label the whole as 1. Draw at least one number bond that matches a drawing.';
const M5_L13_SHARED_PROMPT = 'The shape represents 1 whole. Write a unit fraction to describe the shaded part. The shaded part represents 1 whole. Divide 1 whole to show the same unit fraction you wrote in Part (a).';

const M5_OVERRIDES: Record<number, Record<number, {
  sourcePrompt?: string;
  fractionModels?: ProblemSetFractionModel[];
  numberLineModels?: ProblemSetNumberLineModel[];
  solvedAnswer?: string;
  quotientMeaning?: string;
}>> = {
  8: {
    1: {
      sourcePrompt: 'Show a number bond representing what is shaded and unshaded in each of the figures. Draw a different visual model that would be represented by the same number bond.',
      fractionModels: [{ label: '3/5 shaded', numerator: 3, denominator: 5 }, { label: '2/5 unshaded', numerator: 2, denominator: 5 }]
    },
    2: {
      sourcePrompt: 'Show a number bond representing what is shaded and unshaded in each of the figures. Draw a different visual model that would be represented by the same number bond.',
      fractionModels: [{ label: '3/4 shaded', numerator: 3, denominator: 4 }, { label: '1/4 unshaded', numerator: 1, denominator: 4 }]
    },
    3: {
      sourcePrompt: 'Show a number bond representing what is shaded and unshaded in each of the figures. Draw a different visual model that would be represented by the same number bond.',
      fractionModels: [{ label: '3/6 shaded', numerator: 3, denominator: 6 }, { label: '3/6 unshaded', numerator: 3, denominator: 6 }]
    },
    4: {
      sourcePrompt: 'Show a number bond representing what is shaded and unshaded in each of the figures. Draw a different visual model that would be represented by the same number bond.',
      fractionModels: [{ label: '2/9 shaded', numerator: 2, denominator: 9 }, { label: '7/9 unshaded', numerator: 7, denominator: 9 }]
    },
    5: {
      sourcePrompt: 'Draw a number bond with 2 parts showing the shaded and unshaded fractions of each figure. Decompose both parts of the number bond into unit fractions.'
    },
    6: {
      sourcePrompt: 'The chef put 1/4 of the ground beef on the grill to make one hamburger and put the rest in the refrigerator. Draw a 2-part number bond showing the fraction of the ground beef on the grill and the fraction in the refrigerator. Draw a visual model of all the ground beef. Shade what is in the refrigerator. a. What fraction of the ground beef was in the refrigerator? b. How many more hamburgers can the chef make if he makes them all the same size as the first one? c. Show the refrigerated ground beef broken into unit fractions on your number bond above.'
    }
  },
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
  9: {
    1: {
      sourcePrompt: 'Each figure represents 1 whole. Fill in the chart.'
    },
    2: {
      sourcePrompt: 'Estimate to draw and shade units on the fraction strips. Solve.'
    }
  },
  6: {
    1: {
      sourcePrompt: 'Complete the number sentence. Estimate to partition each strip equally, write the unit fraction inside each unit, and shade the answer.'
    },
    2: {
      fractionModels: [
        { label: 'Soda guests drank', numerator: 1, denominator: 8 },
        { label: 'Soda left', numerator: 7, denominator: 8 }
      ],
      solvedAnswer: 'The guests drank 1/8 of the soda, and 7/8 of the soda was left.',
      quotientMeaning: 'Each liter is 1 eighth of the 8-liter whole.'
    },
    3: {
      sourcePrompt: 'Fill in the chart.'
    }
  },
  7: Object.fromEntries(
    Array.from({ length: 8 }, (_, index) => [
      index + 1,
      {
        sourcePrompt: 'Whisper the fraction of the shape that is shaded. Then, match the shape to the amount that is not shaded.'
      }
    ])
  ),
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
    2: {
      sourcePrompt: 'Circle less than or greater than. Whisper the complete sentence.'
    },
    3: {
      sourcePrompt: 'Lily needs 1/3 cup of oil and 1/4 cup of water to make muffins. Will Lily use more oil or more water? Explain your answer using pictures, numbers, and words.',
      fractionModels: [
        { label: '1 third cup oil', numerator: 1, denominator: 3 },
        { label: '1 fourth cup water', numerator: 1, denominator: 4 }
      ],
      solvedAnswer: 'Lily uses more oil because 1 third of the same cup is greater than 1 fourth.',
      quotientMeaning: 'Both amounts use the same whole cup; thirds are larger units than fourths.'
    },
    4: {
      sourcePrompt: 'Use >, <, or = to compare.'
    },
    5: {
      sourcePrompt: 'Your friend Eric says that 1/6 is greater than 1/5 because 6 is greater than 5. Is Eric correct? Use words and pictures to explain what happens to the size of a unit fraction when the number of parts gets larger.',
      fractionModels: [
        { label: '1 sixth', numerator: 1, denominator: 6 },
        { label: '1 fifth', numerator: 1, denominator: 5 }
      ],
      solvedAnswer: 'Eric is not correct. 1 fifth is greater than 1 sixth because fifths are larger unit fractions than sixths.',
      quotientMeaning: 'A larger denominator means the same whole has more equal parts, so each unit part is smaller.'
    }
  },
  11: {
    1: { sourcePrompt: `${M5_L11_SHARED_PROMPT} 1/3 is greater than ____.` },
    2: { sourcePrompt: `${M5_L11_SHARED_PROMPT} 1/5 is less than ____.` },
    3: { sourcePrompt: `${M5_L11_SHARED_PROMPT} 1/10 is greater than ____.` },
    4: { sourcePrompt: `${M5_L11_SHARED_PROMPT} 1/12 is less than ____.` },
    5: { sourcePrompt: `${M5_L11_SHARED_PROMPT} ____ is greater than 1/8.` },
    6: { sourcePrompt: `${M5_L11_SHARED_PROMPT} ____ is less than 1/9.` },
    7: { sourcePrompt: `${M5_L11_SHARED_PROMPT} ____ is greater than 1/12.` },
    8: { sourcePrompt: 'Fill in the blank with a fraction to make the statement true, and draw a matching model.' },
    9: { sourcePrompt: 'Robert ate 1/2 of a small pizza. Elizabeth ate 1/4 of a large pizza. Elizabeth says, “My piece was larger than yours, so that means 1/4 > 1/2.” Is Elizabeth correct? Explain your answer.' },
    10: { sourcePrompt: 'Manny and Daniel each ate 1/2 of his candy, as shown below. Manny said he ate more candy than Daniel because his half is longer. Is he right? Explain your answer.' }
  },
  12: Object.fromEntries(
    ['Yellow strip', 'Brown strip', 'Orange square', 'Yarn', 'Water', 'Clay'].map((station, index) => [
      index + 1,
      { sourcePrompt: `${M5_L12_SHARED_PROMPT} ${station}.` }
    ])
  ),
  13: {
    1: { sourcePrompt: M5_L13_SHARED_PROMPT },
    2: { sourcePrompt: M5_L13_SHARED_PROMPT },
    3: { sourcePrompt: M5_L13_SHARED_PROMPT },
    4: { sourcePrompt: M5_L13_SHARED_PROMPT },
    5: { sourcePrompt: M5_L13_SHARED_PROMPT },
    6: { sourcePrompt: 'Use the diagram below to complete the following statements.' },
    7: { sourcePrompt: 'Ms. Fan drew the figure below on the board. She asked the class to name the shaded fraction. Charlie answered 3/4. Janice answered 3/2. Jenna thinks they’re both right. With whom do you agree? Explain your thinking.' }
  },
  22: {
    2: {
      sourcePrompt: 'Write the missing parts of the fractions: 1/3 = ____/6, ____/8 = 1/4, and 4/8 = 8/____.',
      fractionModels: [
        { label: '1 third', numerator: 1, denominator: 3 },
        { label: '2 sixths', numerator: 2, denominator: 6 },
        { label: '2 eighths', numerator: 2, denominator: 8 },
        { label: '1 fourth', numerator: 1, denominator: 4 },
        { label: '4 eighths', numerator: 4, denominator: 8 },
        { label: '8 sixteenths', numerator: 8, denominator: 16 }
      ]
    },
    3: {
      sourcePrompt: 'Why does it take 2 copies of 1/8 to show the same amount as 1 copy of 1/4? Explain your answer in words and pictures.',
      fractionModels: [
        { label: '2 eighths', numerator: 2, denominator: 8 },
        { label: '1 fourth', numerator: 1, denominator: 4 }
      ]
    },
    4: {
      sourcePrompt: 'How many sixths does it take to make the same amount as 1/3? Explain your answer in words and pictures.',
      fractionModels: [
        { label: '2 sixths', numerator: 2, denominator: 6 },
        { label: '1 third', numerator: 1, denominator: 3 }
      ]
    },
    5: {
      fractionModels: [
        { label: '10 sixths', numerator: 10, denominator: 6 },
        { label: '5 thirds', numerator: 5, denominator: 3 }
      ]
    }
  },
  24: {
    2: {
      fractionModels: [
        { label: '2/2', numerator: 2, denominator: 2 },
        { label: '3/3', numerator: 3, denominator: 3 },
        { label: '4/4', numerator: 4, denominator: 4 },
        { label: '5/5', numerator: 5, denominator: 5 }
      ]
    },
    3: {
      fractionModels: [
        { label: '2/2', numerator: 2, denominator: 2 },
        { label: '3/3', numerator: 3, denominator: 3 },
        { label: '4/4', numerator: 4, denominator: 4 },
        { label: '5/5', numerator: 5, denominator: 5 }
      ]
    },
    4: {
      fractionModels: [
        { label: 'Taylor: 4/4 pizza', numerator: 4, denominator: 4 },
        { label: 'Brother: 3/3 pizza', numerator: 3, denominator: 3 }
      ],
      quotientMeaning: 'Both boys ate one whole same-size pizza even though the wholes were partitioned into different numbers of pieces.'
    }
  },
  14: {
    1: {
      sourcePrompt: 'Draw a number bond for each fractional unit. Partition the fraction strip to show the unit fractions of the number bond. Use the fraction strip to help you label the fractions on the number line. Be sure to label the fractions at 0 and 1.',
      numberLineModels: [2, 3, 4, 5].map((denominator) => ({
        label: DENOMINATOR_LABELS[denominator],
        denominator,
        targetNumerators: Array.from({ length: denominator + 1 }, (_, index) => index)
      })),
      solvedAnswer: 'Partition 0 to 1 into halves, thirds, fourths, and fifths; label every fraction from 0 units to 1 whole.',
      quotientMeaning: 'Each tick mark names a distance from 0 in equal fractional units.'
    },
    2: {
      sourcePrompt: 'Trevor needs to let his puppy outside every quarter (1 fourth) hour to potty train him. Draw and label a number line from 0 hours to 1 hour to show every 1 fourth hour. Include 0 fourths and 4 fourths hour. Label 0 hours and 1 hour, too.',
      numberLineModels: [{ label: 'Quarter hours', denominator: 4, startLabel: '0 hours', endLabel: '1 hour', targetNumerators: [0, 1, 2, 3, 4] }],
      solvedAnswer: 'The number line is labeled 0 fourths, 1 fourth, 2 fourths, 3 fourths, and 4 fourths, with 4 fourths equal to 1 hour.',
      quotientMeaning: 'Every interval is 1 fourth hour.'
    },
    3: {
      sourcePrompt: 'A ribbon is 1 meter long. Mrs. Lee wants to sew a bead every 1/5 meter. The first bead is at 1/5 meter. The last bead is at 1 meter. Draw and label a number line from 0 meters to 1 meter to show where Mrs. Lee will sew beads. Label all the fractions, including 0 fifths and 5 fifths. Label 0 meters and 1 meter, too.',
      numberLineModels: [{ label: 'Fifths of a meter', denominator: 5, startLabel: '0 meters', endLabel: '1 meter', targetNumerators: [0, 1, 2, 3, 4, 5] }],
      solvedAnswer: 'The bead marks are at 1 fifth, 2 fifths, 3 fifths, 4 fifths, and 5 fifths, with 5 fifths equal to 1 meter.',
      quotientMeaning: 'Each bead location is counted by fifths from 0 meters.'
    }
  },
  15: {
    1: {
      sourcePrompt: 'Estimate to label the given fractions on the number line. Be sure to label the fractions at 0 and 1. Write the fractions above the number line. Draw a number bond to match your number line.'
    },
    2: {
      sourcePrompt: 'Draw a number line. Use a fraction strip to locate 0 and 1. Fold the strip to make 8 equal parts. Use the strip to measure and label your number line with eighths. Count up from 0 eighths to 8 eighths on your number line. Touch each number with your finger as you count.'
    },
    3: {
      sourcePrompt: 'For his boat, James stretched out a rope with 5 equally spaced knots as shown. a. Starting at the first knot and ending at the last knot, how many equal parts are formed by the 5 knots? Label each fraction at the knot. b. What fraction of the rope is labeled at the third knot? c. What if the rope had 6 equally spaced knots along the same length? What fraction of the rope would be measured by the first 2 knots?'
    }
  },
  16: {
    1: {
      sourcePrompt: 'Estimate to equally partition and label the fractions on the number line. Label the wholes as fractions, and box them. The first one is done for you.'
    },
    2: {
      sourcePrompt: 'Partition each whole into fifths. Label each fraction. Count up as you go. Box the fractions that are located at the same points as whole numbers.'
    },
    3: {
      sourcePrompt: 'Partition each whole into thirds. Label each fraction. Count up as you go. Box the fractions that are located at the same points as whole numbers.'
    },
    4: {
      sourcePrompt: 'Draw a number line with endpoints 0 and 3. Label the wholes. Partition each whole into fourths. Label all the fractions from 0 to 3. Box the fractions that are located at the same points as whole numbers. Use a separate paper if you need more space.'
    }
  },
  17: {
    1: {
      sourcePrompt: 'Locate and label the following fractions on the number line: 0/6, 6/6, 12/6, 3/6, and 9/6. The line runs from 0 to 3.',
      numberLineModels: [{
        label: 'Sixths from 0 to 3',
        denominator: 6,
        startLabel: '0',
        endLabel: '3',
        tickLabels: m5FractionTickLabels(0, 3, 6),
        targetNumerators: [0, 3, 6, 9, 12]
      }]
    },
    2: {
      sourcePrompt: 'Locate and label the following fractions on the number line: 8/4, 6/4, 12/4, 16/4, and 4/4. The line runs from 1 to 4.',
      numberLineModels: [{
        label: 'Fourths from 1 to 4',
        denominator: 4,
        startLabel: '1',
        endLabel: '4',
        tickLabels: m5FractionTickLabels(1, 4, 4),
        targetNumerators: [0, 2, 4, 8, 12]
      }]
    },
    3: {
      sourcePrompt: 'Locate and label the following fractions on the number line: 18/3, 14/3, 9/3, 11/3, and 6/3. The line runs from 2 to 6.',
      numberLineModels: [{
        label: 'Thirds from 2 to 6',
        denominator: 3,
        startLabel: '2',
        endLabel: '6',
        tickLabels: m5FractionTickLabels(2, 6, 3),
        targetNumerators: [0, 3, 5, 8, 12]
      }]
    },
    4: {
      sourcePrompt: 'For a measurement project in math class, students measured the lengths of their pinky fingers. Alex’s measured 2 inches long. Jerimiah’s pinky finger measured 7/4 inches long. Whose finger is longer? Draw a number line to help prove your answer.',
      numberLineModels: [{
        label: 'Pinky-finger fourths',
        denominator: 4,
        startLabel: '0 in',
        endLabel: '2 in',
        tickLabels: m5FractionTickLabels(0, 2, 4, ' in'),
        targetNumerators: [7, 8]
      }]
    },
    5: {
      sourcePrompt: 'Marcy ran 4 kilometers after school. She stopped to tie her shoelace at 7/5 kilometer. Then, she stopped to switch songs on her iPod at 12/5 kilometers. Draw a number line showing Marcy’s run. Include her starting and finishing points and the 2 places where she stopped.',
      numberLineModels: [{
        label: 'Marcy run fifths',
        denominator: 5,
        startLabel: '0 km',
        endLabel: '4 km',
        tickLabels: m5FractionTickLabels(0, 4, 5, ' km'),
        targetNumerators: [0, 7, 12, 20]
      }]
    }
  },
  18: {
    1: {
      sourcePrompt: 'Place 1/4 and 3/4 on a number line from 0 to 1. Circle the fraction closest to 0, then compare using >, <, or =.',
      numberLineModels: [{
        label: 'Provided fourths comparison',
        denominator: 4,
        tickLabels: ['0', '1/4', '2/4', '3/4', '4/4 = 1'],
        targetNumerators: [1, 3]
      }],
      quotientMeaning: 'On the same fourths number line, 1/4 is closer to 0 than 3/4.'
    },
    2: {
      sourcePrompt: 'Place 2/6 and 3/6 on a number line from 0 to 1. Circle the fraction closest to 0, then compare using >, <, or =.',
      numberLineModels: [{
        label: 'Sixths comparison',
        denominator: 6,
        tickLabels: m5FractionTickLabels(0, 1, 6),
        targetNumerators: [2, 3]
      }]
    },
    3: {
      sourcePrompt: 'Place 1/2 and 1/4 on a number line from 0 to 1. Circle the fraction closest to 0, then compare using >, <, or =.',
      numberLineModels: [{
        label: 'Halves and fourths comparison',
        denominator: 4,
        tickLabels: m5FractionTickLabels(0, 1, 4),
        targetNumerators: [1, 2]
      }]
    },
    4: {
      sourcePrompt: 'Place 2/3 and 2/6 on a number line from 0 to 1. Circle the fraction closest to 0, then compare using >, <, or =.',
      numberLineModels: [{
        label: 'Thirds and sixths comparison',
        denominator: 6,
        tickLabels: m5FractionTickLabels(0, 1, 6),
        targetNumerators: [2, 4]
      }]
    },
    5: {
      sourcePrompt: 'Place 11/8 and 7/4 on a number line from 1 to 2. Circle the fraction closest to 0, then compare using >, <, or =.',
      numberLineModels: [{
        label: 'Eighths and fourths comparison',
        denominator: 8,
        tickLabels: m5FractionTickLabels(1, 2, 8),
        targetNumerators: [3, 6]
      }]
    },
    6: {
      sourcePrompt: 'JoAnn and Lupe live straight down the street from their school. JoAnn walks 5/6 miles and Lupe walks 7/8 miles home from school every day. Draw a number line to model how far each girl walks. Who walks the least? Explain how you know using pictures, numbers, and words.',
      numberLineModels: [
        { label: 'JoAnn: sixths from 0 to 1', denominator: 6, tickLabels: m5FractionTickLabels(0, 1, 6), targetNumerators: [5] },
        { label: 'Lupe: eighths from 0 to 1', denominator: 8, tickLabels: m5FractionTickLabels(0, 1, 8), targetNumerators: [7] }
      ]
    },
    7: {
      sourcePrompt: 'Cheryl cuts 2 pieces of thread. The blue thread is 5/4 meters long. The red thread is 4/5 meters long. Draw a number line to model the length of each piece of thread. Which piece of thread is shorter? Explain how you know using pictures, numbers, and words.',
      numberLineModels: [
        { label: 'Blue thread: fourths from 0 to 2', denominator: 4, tickLabels: m5FractionTickLabels(0, 2, 4), targetNumerators: [5] },
        { label: 'Red thread: fifths from 0 to 2', denominator: 5, tickLabels: m5FractionTickLabels(0, 2, 5), targetNumerators: [4] }
      ]
    },
    8: {
      sourcePrompt: 'Brandon makes homemade spaghetti. He measures 3 noodles. One measures 7/8 foot, the second is 7/4 feet, and the third is 4/2 feet long. Draw a number line to model the length of each piece of spaghetti. Write a number sentence using <, >, or = to compare the pieces. Explain using pictures, numbers, and words.',
      fractionModels: [
        { label: 'first noodle: 7/8 foot', numerator: 7, denominator: 8 },
        { label: 'second noodle: 7/4 feet', numerator: 7, denominator: 4 },
        { label: 'third noodle: 4/2 feet', numerator: 4, denominator: 2 }
      ],
      numberLineModels: [{
        label: 'Spaghetti lengths in eighths',
        denominator: 8,
        tickLabels: m5FractionTickLabels(0, 2, 8),
        targetNumerators: [7, 14, 16]
      }]
    }
  },
  19: {
    1: {
      sourcePrompt: 'Divide each number line into the given fractional unit. Then, place the fractions. Write each whole as a fraction.'
    },
    2: {
      sourcePrompt: 'Use the number lines above to compare the following fractions using >, <, or =.',
      numberLineModels: [
        { label: 'Halves comparison line', denominator: 2, targetNumerators: [0, 1, 2] },
        { label: 'Fourths comparison line', denominator: 4, targetNumerators: [0, 1, 2, 3, 4] },
        { label: 'Eighths comparison line', denominator: 8, targetNumerators: [0, 1, 2, 3, 4, 5, 6, 7, 8] }
      ]
    },
    3: {
      sourcePrompt: 'Choose a greater than comparison you made in Problem 2. Use pictures, numbers, and words to explain how you made that comparison.'
    },
    4: {
      sourcePrompt: 'Choose a less than comparison you made in Problem 2. Use pictures, numbers, and words to explain a different way of thinking about the comparison than what you wrote in Problem 3.'
    },
    5: {
      sourcePrompt: 'Choose an equal to comparison you made in Problem 2. Use pictures, numbers, and words to explain two ways that you can prove your comparison is true.'
    }
  },
  20: {
    1: {
      sourcePrompt: 'Label what fraction of each shape is shaded. Then, circle the fractions that are equal.'
    },
    2: {
      sourcePrompt: 'Label the shaded fraction. Draw 2 different representations of the same fractional amount.'
    },
    3: {
      sourcePrompt: 'Ann has 6 small square pieces of paper. 2 squares are grey. Ann cuts the 2 grey squares in half with a diagonal line from one corner to the other. a. What shapes does she have now? b. How many of each shape does she have? c. Use all the shapes with no overlaps. Draw at least 2 different ways Ann’s set of shapes might look. What fraction of the figure is grey?'
    },
    4: {
      sourcePrompt: 'Laura has 2 different beakers that hold exactly 1 liter. She pours 1/2 liter of blue liquid into Beaker A. She pours 1/2 liter of orange liquid into Beaker B. Susan says the amounts are not equal. Cristina says they are. Explain who you think is correct and why.',
      fractionModels: [
        { label: 'Beaker A: 1 half liter', numerator: 1, denominator: 2 },
        { label: 'Beaker B: 1 half liter', numerator: 1, denominator: 2 }
      ],
      solvedAnswer: 'Cristina is correct. Each beaker holds exactly 1 liter, so 1 half liter in Beaker A equals 1 half liter in Beaker B.',
      quotientMeaning: 'Equivalent fractions can have different-looking shapes when the same-size whole and same amount are preserved.'
    }
  },
  21: {
    1: {
      sourcePrompt: 'Use the fractional units on the left to count up on the number line. Label the missing fractions on the blanks.',
      fractionModels: [
        { label: '0/2', numerator: 0, denominator: 2 },
        { label: '3/2', numerator: 3, denominator: 2 },
        { label: '1/4', numerator: 1, denominator: 4 },
        { label: '2/4', numerator: 2, denominator: 4 },
        { label: '4/4', numerator: 4, denominator: 4 },
        { label: '6/4', numerator: 6, denominator: 4 },
        { label: '8/4', numerator: 8, denominator: 4 },
        { label: '1/6', numerator: 1, denominator: 6 },
        { label: '3/6', numerator: 3, denominator: 6 },
        { label: '6/6', numerator: 6, denominator: 6 },
        { label: '9/6', numerator: 9, denominator: 6 },
        { label: '12/6', numerator: 12, denominator: 6 }
      ],
      numberLineModels: [
        { label: 'Halves and fourths from 0 to 2', denominator: 4, tickLabels: m5FractionTickLabels(0, 2, 4), targetNumerators: [1, 2, 3, 4, 5, 6, 7, 8] },
        { label: 'Halves and sixths from 0 to 2', denominator: 6, tickLabels: m5FractionTickLabels(0, 2, 6), targetNumerators: [1, 3, 6, 9, 12] }
      ]
    },
    2: {
      sourcePrompt: 'Use the number lines above to: Color fractions equal to 1 half blue. Color fractions equal to 1 yellow. Color fractions equal to 3 halves green. Color fractions equal to 2 red.',
      fractionModels: [
        { label: '1/2', numerator: 1, denominator: 2 },
        { label: '2/4', numerator: 2, denominator: 4 },
        { label: '3/6', numerator: 3, denominator: 6 },
        { label: '2/2', numerator: 2, denominator: 2 },
        { label: '4/4', numerator: 4, denominator: 4 },
        { label: '6/6', numerator: 6, denominator: 6 },
        { label: '3/2', numerator: 3, denominator: 2 },
        { label: '6/4', numerator: 6, denominator: 4 },
        { label: '9/6', numerator: 9, denominator: 6 },
        { label: '4/2', numerator: 4, denominator: 2 },
        { label: '8/4', numerator: 8, denominator: 4 },
        { label: '12/6', numerator: 12, denominator: 6 }
      ],
      numberLineModels: [
        { label: 'Equivalent halves and fourths', denominator: 4, tickLabels: m5FractionTickLabels(0, 2, 4), targetNumerators: [2, 4, 6, 8] },
        { label: 'Equivalent halves and sixths', denominator: 6, tickLabels: m5FractionTickLabels(0, 2, 6), targetNumerators: [3, 6, 9, 12] }
      ]
    },
    3: {
      sourcePrompt: 'Use the number lines above to make the number sentences true.',
      fractionModels: [
        { label: '2/4', numerator: 2, denominator: 4 },
        { label: '3/6', numerator: 3, denominator: 6 },
        { label: '6/6', numerator: 6, denominator: 6 },
        { label: '2/2', numerator: 2, denominator: 2 },
        { label: '4/4', numerator: 4, denominator: 4 },
        { label: '3/2', numerator: 3, denominator: 2 },
        { label: '9/6', numerator: 9, denominator: 6 },
        { label: '6/4', numerator: 6, denominator: 4 }
      ],
      numberLineModels: [
        { label: 'Fourth-equivalent points', denominator: 4, tickLabels: m5FractionTickLabels(0, 2, 4), targetNumerators: [2, 4, 6] },
        { label: 'Sixth-equivalent points', denominator: 6, tickLabels: m5FractionTickLabels(0, 2, 6), targetNumerators: [3, 6, 9] }
      ]
    },
    4: {
      sourcePrompt: 'Jack and Jill use rain gauges the same size and shape to measure rain on the top of a hill. Jack uses a rain gauge marked in fourths of an inch. Jill’s gauge measures rain in eighths of an inch. On Thursday, Jack’s gauge measured 2/4 inches of rain. They both had the same amount of water, so what was the reading on Jill’s gauge Thursday? Draw a number line to help explain your thinking.',
      fractionModels: [
        { label: 'Jack: 2/4 inch', numerator: 2, denominator: 4 },
        { label: 'Jill: 4/8 inch', numerator: 4, denominator: 8 }
      ],
      numberLineModels: [{ label: 'Rain gauge eighths', denominator: 8, tickLabels: m5FractionTickLabels(0, 1, 8, ' in'), targetNumerators: [4] }]
    },
    5: {
      sourcePrompt: 'Jack and Jill’s baby brother Rosco also had a gauge the same size and shape on the same hill. He told Jack and Jill that there had been 1/2 inch of rain on Thursday. Is he right? Why or why not? Use words and a number line to explain your answer.',
      fractionModels: [
        { label: 'Rosco: 1/2 inch', numerator: 1, denominator: 2 },
        { label: 'Jack: 2/4 inch', numerator: 2, denominator: 4 },
        { label: 'Jill: 4/8 inch', numerator: 4, denominator: 8 }
      ],
      numberLineModels: [{ label: 'Equivalent half-inch readings', denominator: 8, tickLabels: m5FractionTickLabels(0, 1, 8, ' in'), targetNumerators: [4] }]
    }
  },
  23: {
    1: {
      numberLineModels: [{ label: 'Red fourths from 0 to 3', denominator: 4, tickLabels: m5FractionTickLabels(0, 3, 4), targetNumerators: Array.from({ length: 13 }, (_, index) => index) }]
    },
    2: {
      numberLineModels: [{ label: 'Blue eighths from 0 to 3', denominator: 8, tickLabels: m5FractionTickLabels(0, 3, 8), targetNumerators: Array.from({ length: 25 }, (_, index) => index) }]
    },
    3: {
      numberLineModels: [
        { label: 'Fourth labels', denominator: 4, tickLabels: m5FractionTickLabels(0, 3, 4), targetNumerators: Array.from({ length: 13 }, (_, index) => index) },
        { label: 'Equivalent eighth labels', denominator: 8, tickLabels: m5FractionTickLabels(0, 3, 8), targetNumerators: Array.from({ length: 25 }, (_, index) => index) }
      ]
    },
    4: {
      sourcePrompt: 'Using your number line to help, what red fraction and what blue fraction would be equal to 7/2? Draw the part of the number line below that would include these fractions, and label it.',
      fractionModels: [
        { label: '7/2', numerator: 7, denominator: 2 },
        { label: '14/4', numerator: 14, denominator: 4 },
        { label: '28/8', numerator: 28, denominator: 8 }
      ],
      numberLineModels: [{
        label: 'Equivalent point at three and one half',
        denominator: 8,
        tickLabels: ['24/8 = 3', '25/8', '26/8', '27/8', '7/2 = 14/4 = 28/8', '29/8', '30/8', '31/8', '32/8 = 4'],
        targetNumerators: [4]
      }]
    },
    5: {
      sourcePrompt: 'Write two different fractions for the dot on the number line. You may use halves, thirds, fourths, fifths, sixths, or eighths. Use fraction strips to help you, if necessary.',
      fractionModels: [
        { label: '1/3', numerator: 1, denominator: 3 },
        { label: '2/6', numerator: 2, denominator: 6 },
        { label: '2/4', numerator: 2, denominator: 4 },
        { label: '1/2', numerator: 1, denominator: 2 },
        { label: '4/8', numerator: 4, denominator: 8 },
        { label: '5/4', numerator: 5, denominator: 4 },
        { label: '10/8', numerator: 10, denominator: 8 },
        { label: '10/5', numerator: 10, denominator: 5 },
        { label: '2/1', numerator: 2, denominator: 1 }
      ],
      numberLineModels: [
        { label: '1/3 = 2/6', denominator: 6, tickLabels: m5FractionTickLabels(0, 1, 6), targetNumerators: [2] },
        { label: '2/4 = 1/2 = 4/8', denominator: 8, tickLabels: m5FractionTickLabels(0, 1, 8), targetNumerators: [4] },
        { label: '5/4 = 10/8', denominator: 8, tickLabels: m5FractionTickLabels(1, 2, 8), targetNumerators: [2] },
        { label: '10/5 = 2/1', denominator: 5, tickLabels: m5FractionTickLabels(0, 2, 5), targetNumerators: [10] }
      ]
    },
    6: {
      sourcePrompt: 'Cameron and Terrance plan to run in the city race on Saturday. Cameron has decided that he will divide his race into 3 equal parts and will stop to rest after running 2 of them. Terrance divides his race into 6 equal parts and will stop and rest after running 2 of them. Will the boys rest at the same spot in the race? Why or why not? Draw a number line to explain your answer.',
      fractionModels: [
        { label: 'Cameron: 2/3 of the race', numerator: 2, denominator: 3 },
        { label: 'Terrance: 2/6 of the race', numerator: 2, denominator: 6 }
      ],
      numberLineModels: [
        { label: 'Cameron: thirds', denominator: 3, tickLabels: m5FractionTickLabels(0, 1, 3), targetNumerators: [2] },
        { label: 'Terrance: sixths', denominator: 6, tickLabels: m5FractionTickLabels(0, 1, 6), targetNumerators: [2] }
      ]
    }
  },
  25: {
    1: {
      numberLineModels: [],
      fractionModels: [
        { label: '3/3', numerator: 3, denominator: 3 },
        { label: '3/2', numerator: 3, denominator: 2 },
        { label: '3/1', numerator: 3, denominator: 1 },
        { label: '4/4', numerator: 4, denominator: 4 },
        { label: '4/2', numerator: 4, denominator: 2 },
        { label: '4/1', numerator: 4, denominator: 1 },
        { label: '6/6', numerator: 6, denominator: 6 },
        { label: '6/3', numerator: 6, denominator: 3 },
        { label: '6/1', numerator: 6, denominator: 1 }
      ]
    },
    2: {
      sourcePrompt: 'Fill in the missing whole numbers in the boxes below the number line. Rename the whole numbers as fractions in the boxes above the number line.',
      fractionModels: [
        { label: '0/1', numerator: 0, denominator: 1 },
        { label: '1/1', numerator: 1, denominator: 1 },
        { label: '2/1', numerator: 2, denominator: 1 },
        { label: '3/1', numerator: 3, denominator: 1 },
        { label: '4/1', numerator: 4, denominator: 1 },
        { label: '5/1', numerator: 5, denominator: 1 },
        { label: '6/1', numerator: 6, denominator: 1 }
      ],
      numberLineModels: [{
        label: 'Whole numbers renamed in ones',
        denominator: 1,
        tickLabels: ['0/1 = 0', '1/1 = 1', '2/1 = 2', '3/1 = 3', '4/1 = 4', '5/1 = 5', '6/1 = 6'],
        targetNumerators: [0, 1, 2, 3, 4, 5, 6]
      }]
    },
    3: {
      sourcePrompt: 'Explain the difference between these two fractions with words and pictures.',
      fractionModels: [
        { label: '2/1: two wholes', numerator: 2, denominator: 1 },
        { label: '2/2: one whole', numerator: 2, denominator: 2 }
      ],
      numberLineModels: []
    }
  },
  26: {
    3: {
      sourcePrompt: 'Sammy uses 1/4 meter of wire each day to make things. a. Draw a number line to represent 1 meter of wire. Partition the number line to represent how much Sammy uses each day. How many days does the wire last? b. How many days will 3 meters of wire last?'
    },
    4: {
      sourcePrompt: 'Cindy feeds her dog 1/3 pound of food each day. a. Draw a number line to represent 1 pound of food. Partition the number line to represent how much food she uses each day. b. Draw another number line to represent 4 pounds of food. After 3 days, how many pounds of food has she given her dog? c. After 6 days, how many pounds of food has she given her dog?'
    }
  },
  27: {
    1: {
      fractionModels: [
        { label: '4/6', numerator: 4, denominator: 6 },
        { label: '2/3', numerator: 2, denominator: 3 },
        { label: '1/2', numerator: 1, denominator: 2 },
        { label: '4/8', numerator: 4, denominator: 8 }
      ]
    },
    2: {
      fractionModels: [
        { label: 'first bar: 2/2', numerator: 2, denominator: 2 },
        { label: 'second bar: 4/4', numerator: 4, denominator: 4 },
        { label: 'third bar: 6/6', numerator: 6, denominator: 6 },
        { label: 'one equal share: 1/2', numerator: 1, denominator: 2 },
        { label: 'one equal share: 2/4', numerator: 2, denominator: 4 },
        { label: 'one equal share: 3/6', numerator: 3, denominator: 6 }
      ]
    },
    3: {
      fractionModels: [
        { label: 'six copies of 1/8: 6/8', numerator: 6, denominator: 8 },
        { label: 'three copies of 1/4: 3/4', numerator: 3, denominator: 4 }
      ]
    },
    4: {
      fractionModels: [
        { label: '2 sixths', numerator: 2, denominator: 6 },
        { label: '1 third', numerator: 1, denominator: 3 }
      ]
    },
    5: {
      fractionModels: [
        { label: 'original whole: 4/4', numerator: 4, denominator: 4 },
        { label: 'after doubling parts: 8/8', numerator: 8, denominator: 8 },
        { label: 'one original fourth: 1/4', numerator: 1, denominator: 4 },
        { label: 'same amount in eighths: 2/8', numerator: 2, denominator: 8 }
      ]
    }
  },
  29: {
    1: {
      fractionModels: [
        { label: 'provided model: 2 sixths', numerator: 2, denominator: 6 },
        { label: 'provided model: 2 thirds', numerator: 2, denominator: 3 }
      ],
      quotientMeaning: 'Both models use the same-size whole and shade 2 parts; sixths are smaller units than thirds, so 2/6 < 2/3.'
    }
  },
  30: {
    1: {
      solvedAnswer: 'Use the lined-paper number line to make thirds, extend those third marks up the paper, angle the red strip from 0 to 1, and mark the strip where the vertical extensions cross it.',
      quotientMeaning: 'The thirds are equal because each third on the base number line uses the same number of paper spaces before the marks are transferred to the strip.'
    }
  }
};

function m5FractionTickLabels(startWhole: number, endWhole: number, denominator: number, unit = ''): string[] {
  const startNumerator = startWhole * denominator;
  const endNumerator = endWhole * denominator;
  return Array.from({ length: endNumerator - startNumerator + 1 }, (_, offset) => {
    const numerator = startNumerator + offset;
    const wholeLabel = numerator % denominator === 0 ? ` = ${numerator / denominator}` : '';
    return `${numerator}/${denominator}${wholeLabel}${unit}`;
  });
}

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
  const answerKeyImages = M5_ANSWER_KEY_SOURCE_PAGES[1] ?? [];
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
      solvedAnswer: 'The first beaker shows the provided 1/2 sample; shade the second beaker to 1/4 and the third beaker to 1/3 of the full amount.',
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
      solvedAnswer: 'The shaded fractions are 1/3, 1/6, and 1/4.',
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
      solvedAnswer: 'a. Draw 1 line to make 2 equal parts, halves. b. Draw 2 lines to make 3 equal parts, thirds. c. Draw 3 lines to make 4 equal parts, fourths.',
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
      solvedAnswer: 'Show sevenths and ninths. Answers will vary for what students notice; 20 equal parts need 19 lines.',
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
    title: `Lesson 1: ${M5_TEACHER_OBJECTIVES[1]}`,
    concept: 'The Teacher Edition builds fractional units from concrete wholes: a 12-inch strip is partitioned into halves, fourths, thirds, and sixths, and identical cups are used to partition a whole amount of liquid.',
    teacherEditionBasis: m5TeacherSource(1),
    contrast: 'The whole must be fixed before a fraction is named: the whole strip, the full beaker amount at the fill line, the whole string cheese, the whole sheet of paper, or the 12-inch wood strip.',
    summary: 'A unit fraction is one equal part of a named whole. Lesson 1 uses measurement, shading, and estimated partitions to connect concrete models to fraction names.',
    sourceNote: 'Teacher Edition Lesson 1 Concept Development and Problem Set, printed pages 12-18. Problem Set pages 16-17 supply the five official problem prompts and diagrams.',
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: [...sourcePageImages, ...answerKeyImages],
    conceptSections: m5FunctionalConceptSections(1),
    problems: problems.map((problem) => {
      const reviewedEvidence = sourceProblemEvidence(1, problem.number);
      const exactTaskPageImages = sourceTaskPageImages(1, problem.number);
      const centeredProblem = {
        ...problem,
        sourcePromptInVisual: true,
        blankPrompts: [],
        solvedAnswer: reviewedEvidence.answerKeyEvidence,
        equations: [],
        explanation: reviewedEvidence.answerKeyEvidence,
        validationChecks: [],
        sourcePageImages: exactTaskPageImages,
        blankSourcePageImages: exactTaskPageImages,
        solvedSourcePageImages: [...exactTaskPageImages, ...answerKeyImages]
      };

      return {
        ...centeredProblem,
        ...createM5VisualPair(centeredProblem, 1)
      };
    })
  };
}

function makeLesson30(): ProblemSetCenteredLesson {
  const sourcePageImages = pageImages(pageRange(352, 355));
  const answerKeyImages = M5_ANSWER_KEY_SOURCE_PAGES[30] ?? [];
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
    solvedAnswer: 'Answers will vary.',
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
    title: `Lesson 30: ${M5_TEACHER_OBJECTIVES[30]}`,
    concept: 'The Teacher Edition teaches a ruler-free transfer method: make equal fractional units on lined paper, extend those marks, then angle a strip from 0 to 1 so the guide lines mark equal parts on the strip.',
    teacherEditionBasis: m5TeacherSource(30),
    contrast: 'The equal parts come from the lined-paper number line first; the red strip is marked only after it is angled from 0 to 1.',
    summary: 'A precise number line can be used as a transfer tool. If the guide marks on the paper are equal, the marks transferred to the angled strip partition that strip into equal fractional parts.',
    sourceNote: 'Teacher Edition pages 353-354 show Steps 1-5 with lined paper, vertical extensions, the red strip, and the no-sheet Problem Set challenge. Student Workbook page 120 is a written homework reflection, not a Problem Set sheet.',
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: [...sourcePageImages, ...answerKeyImages],
    conceptSections: m5FunctionalConceptSections(30),
    problems: [{
      ...problem,
      sourcePromptInVisual: true,
      blankPrompts: [],
      solvedAnswer: sourceProblemEvidence(30, 1).answerKeyEvidence,
      equations: [],
      explanation: sourceProblemEvidence(30, 1).answerKeyEvidence,
      validationChecks: [],
      sourcePageImages: sourceTaskPageImages(30, 1),
      blankSourcePageImages: sourceTaskPageImages(30, 1),
      solvedSourcePageImages: [
        ...sourceTaskPageImages(30, 1),
        ...answerKeyImages
      ],
      ...createM5VisualPair(
        { ...problem, solvedAnswer: sourceProblemEvidence(30, 1).answerKeyEvidence },
        30
      )
    }]
  };
}

function sourceForLesson(lessonNumber: number) {
  return STUDENT_WORK_SOURCE[`m5-l${lessonNumber}`];
}

function usesNumberLine(lessonNumber: number, prompt = ''): boolean {
  return lessonNumber >= 14 && lessonNumber <= 19
    || lessonNumber >= 21 && lessonNumber <= 26
    || lessonNumber === 30
    || /number line/i.test(prompt);
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
        numerator: Math.max(0, numerator),
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
  return Array.from(denominators).slice(0, 8).map((denominator) => ({
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
  return `Build the fraction model named in the prompt, identify the whole, partition it into equal parts, and answer this item: ${firstPromptSentence(prompt)}`;
}

function firstPromptSentence(prompt: string): string {
  const normalizedPrompt = prompt.replace(/\s+/g, ' ').trim();
  const endIndexes = ['.', '?', '!']
    .map((mark) => normalizedPrompt.indexOf(mark))
    .filter((index) => index >= 0);
  const end = endIndexes.length ? Math.min(...endIndexes) + 1 : normalizedPrompt.length;
  return normalizedPrompt.slice(0, end).trim();
}

function sourceSpecificBlankWorkspaceLabel(problemNumber: number, prompt: string, model: string): string {
  return `Use this official Problem ${problemNumber} ${model} workspace: ${firstPromptSentence(prompt)}`;
}

function m5ReviewedSolvedReasoning(lessonNumber: number, problemNumber: number): string | undefined {
  const reviewedReasoning: Record<string, string> = {
    '15-1': 'The number bonds complete each target fraction to one whole: 2/3 + 1/3 = 1; 3/4 + 1/4 = 1; 3/5 + 2/5 = 1; 5/6 + 1/6 = 1; and 3/10 + 7/10 = 1.',
    '17-4': '2 inches is 8/4 inches. Since 8/4 is greater than 7/4, Alex’s 2-inch pinky finger is longer.',
    '18-2': 'On the same sixths scale, 2/6 < 3/6, so circle 2/6.',
    '18-3': 'On the same-size whole, 1/2 > 1/4, so circle 1/4.',
    '18-4': 'Rename 2/3 as 4/6. Then 2/3 > 2/6, so circle 2/6.',
    '18-5': 'Rename 7/4 as 14/8. Then 11/8 < 7/4, so circle 11/8.',
    '18-6': 'Compare the distances on a common whole: 5/6 < 7/8, so JoAnn walks less.',
    '18-7': '4/5 is less than 1 whole, while 5/4 is greater than 1 whole.',
    '21-1': 'Use the fourths line to match halves at 4/4 and 8/4, and use the sixths line to match halves at 6/6 and 12/6.',
    '21-2': 'Shade blue at 1/2 = 2/4 and 1/2 = 3/6. Shade yellow at 2/2 = 4/4 and 2/2 = 6/6. Shade green at 3/2 = 6/4 and 3/2 = 9/6. Shade red at 4/2 = 8/4 and 4/2 = 12/6.',
    '21-3': 'The aligned points show 2/4 = 3/6; 6/6 = 2/2 = 4/4; and 3/2 = 9/6 = 6/4.',
    '23-6': 'Cameron rests after 2/3 of the race. Terrance rests after 2/6 = 1/3 of the race. Since 2/3 > 2/6, they do not rest at the same point.',
    '25-2': 'The missing whole numbers 2, 3, 5, and 6 are each renamed with denominator 1 from 0/1 through 6/1.',
    '25-3': 'The fraction 2/1 means 2 wholes because each unit is one whole. The fraction 2/2 means 1 whole because two halves compose one whole.',
    '27-2': 'The three equal-sharing models show 1/2 = 2/4 = 3/6, so each friend receives 1/2 of a candy bar.',
    '27-3': 'The same amount is covered because each fourth is equal to two eighths; therefore 6/8 = 3/4.',
    '27-5': 'Doubling every fourth into two eighths preserves the whole: 1/4 = 2/8 and 4/4 = 8/8.'
  };

  return reviewedReasoning[`${lessonNumber}-${problemNumber}`];
}

function m5FallbackFractionModels(lessonNumber: number, problemNumber: number, prompt: string): ProblemSetFractionModel[] {
  if (lessonNumber === 2 && problemNumber === 1) {
    return [
      { label: 'folded into equal halves', numerator: 1, denominator: 2 },
      { label: 'folded into equal thirds', numerator: 1, denominator: 3 },
      { label: 'folded into equal fourths', numerator: 1, denominator: 4 }
    ];
  }

  if (lessonNumber === 2 && problemNumber === 2) {
    return [
      { label: 'strip a: equal parts shaded', numerator: 1, denominator: 2 },
      { label: 'strip b: equal parts shaded', numerator: 1, denominator: 3 },
      { label: 'strip c: equal parts shaded', numerator: 1, denominator: 4 },
      { label: 'strip d: equal parts shaded', numerator: 1, denominator: 6 }
    ];
  }

  if (lessonNumber === 3) {
    if (problemNumber === 1) {
      return [
        { label: 'fourths: 2 shaded', numerator: 2, denominator: 4 },
        { label: 'thirds: count shaded units', numerator: 1, denominator: 3 },
        { label: 'sixths: count shaded units', numerator: 1, denominator: 6 }
      ];
    }
    if (problemNumber === 4) {
      return [
        { label: '1 half', numerator: 1, denominator: 2 },
        { label: '1 sixth', numerator: 1, denominator: 6 },
        { label: '1 third', numerator: 1, denominator: 3 }
      ];
    }
    if (problemNumber === 6) {
      return [{ label: 'Charlotte and 4 friends: each share', numerator: 1, denominator: 5 }];
    }
    return [
      { label: 'area model halves', numerator: 1, denominator: 2 },
      { label: 'area model thirds', numerator: 1, denominator: 3 },
      { label: 'area model fourths', numerator: 1, denominator: 4 }
    ];
  }

  if (lessonNumber >= 4 && lessonNumber <= 9) {
    const denominator = inferDenominator(prompt, lessonNumber);
    const numerator = inferNumerator(prompt, denominator);
    return [
      {
        label: `${numerator} ${DENOMINATOR_LABELS[denominator] ?? `${denominator} equal parts`}`,
        numerator,
        denominator
      }
    ];
  }

  if (lessonNumber >= 10 && lessonNumber <= 13) {
    return [
      { label: 'first unit fraction', numerator: 1, denominator: 3 },
      { label: 'second unit fraction', numerator: 1, denominator: 6 }
    ];
  }

  if (lessonNumber >= 20 && lessonNumber <= 27) {
    return [
      { label: '1 half', numerator: 1, denominator: 2 },
      { label: '2 fourths', numerator: 2, denominator: 4 }
    ];
  }

  if (lessonNumber >= 28 && lessonNumber <= 29) {
    return [
      { label: 'same numerator: 2 thirds', numerator: 2, denominator: 3 },
      { label: 'same numerator: 2 sixths', numerator: 2, denominator: 6 }
    ];
  }

  return [];
}

function makeProblem(lessonNumber: number, sourceProblem: M5WorkbookProblem & { equations?: string[] }): ProblemSetCenteredProblem {
  const override = M5_OVERRIDES[lessonNumber]?.[sourceProblem.number];
  const reviewedEvidence = sourceProblemEvidence(lessonNumber, sourceProblem.number);
  const teacherAnswer = reviewedEvidence.answerKeyEvidence;
  const sourcePrompt = override?.sourcePrompt ?? sourceProblem.prompt;
  const modelSourceText = `${sourcePrompt} ${teacherAnswer ?? override?.solvedAnswer ?? ''}`;
  const denominator = inferDenominator(sourcePrompt, lessonNumber);
  const numerator = inferNumerator(sourcePrompt, denominator);
  const animationType: ProblemSetAnimationType = usesNumberLine(lessonNumber, sourcePrompt)
    ? 'number-line-model'
    : 'fraction-strip-model';
  const blankVisualType: ProblemSetBlankVisualType = animationType === 'number-line-model'
    ? 'number-line-template'
    : 'fraction-strip-template';
  const model = modelName(animationType);
  const parsedFractionModels = fractionsFromPrompt(modelSourceText);
  const fractionModels = override?.fractionModels
    ?? (parsedFractionModels.length ? parsedFractionModels : m5FallbackFractionModels(lessonNumber, sourceProblem.number, sourcePrompt));
  const numberLineModels = override?.numberLineModels ?? numberLineModelsFromPrompt(modelSourceText, lessonNumber, fractionModels);
  const equations = sourceProblem.equations?.length
    ? sourceProblem.equations
    : fractionModels.map((fractionModel) => `${fractionModel.label} = ${fractionModel.numerator}/${fractionModel.denominator}`);
  const solvedAnswer = teacherAnswer ?? override?.solvedAnswer ?? solvedAnswerFromModels(sourcePrompt, fractionModels, numberLineModels);
  const reviewedSolvedReasoning = m5ReviewedSolvedReasoning(lessonNumber, sourceProblem.number);

  return {
    number: sourceProblem.number,
    sourcePrompt,
    sourcePromptInVisual: true,
    fractionModels,
    numberLineModels,
    blankPrompts: [],
    blankEquations: blankEquationTemplates(equations),
    blankAnswerSentence: 'Answer in a complete sentence with the fraction unit and whole named.',
    blankWorkspaceLabel: sourceSpecificBlankWorkspaceLabel(sourceProblem.number, sourcePrompt, model),
    blankVisualType,
    solvedAnswer,
    equations: [],
    knownTotal: denominator,
    knownGroupSize: denominator,
    knownGroupCount: denominator,
    quotient: numerator,
    quotientMeaning: override?.quotientMeaning ?? `The model names ${numerator} copy${numerator === 1 ? '' : 'ies'} of a unit fraction from a whole partitioned into ${denominator} equal part${denominator === 1 ? '' : 's'}.`,
    animationType,
    unitLabel: 'equal parts',
    groupLabel: animationType === 'number-line-model' ? 'intervals' : 'fractional units',
    explanation: [teacherAnswer, reviewedSolvedReasoning].filter(Boolean).join(' '),
    validationChecks: []
  };
}

function createM5ProblemVisual(problem: ProblemSetCenteredProblem, solved: boolean, lessonNumber: number): ProblemVisualSpec {
  const sections: ProblemVisualSpec['sections'] = [];
  const reviewedSections =
    m5ReviewedLessonsOneThroughFive(problem, solved, lessonNumber)
    ?? m5ReviewedLessonsSixThroughTen(problem, solved, lessonNumber)
    ?? m5ReviewedLessonsElevenThroughFifteen(problem, solved, lessonNumber)
    ?? m5ReviewedLessonsSixteenThroughTwenty(problem, solved, lessonNumber)
    ?? m5ReviewedLessonsTwentyOneThroughTwentyFive(problem, solved, lessonNumber)
    ?? m5ReviewedLessonsTwentySixThroughThirty(problem, solved, lessonNumber);
  const sourceNote = solved
    ? `Teacher Edition answer modeled here: ${problem.solvedAnswer}`
    : 'Blank view keeps the authored fraction workspace open with the whole, equal-part structure, labels, and response blanks.';

  const officialIllustration = reviewedSections
    ? undefined
    : m5OfficialIllustrationSection(lessonNumber, problem, solved);
  const lesson22Section = reviewedSections
    ? undefined
    : lessonNumber === 22
      ? m5Lesson22FractionSection(problem.number, solved)
      : undefined;
  if (reviewedSections) {
    sections.push(...reviewedSections);
  } else if (officialIllustration || lesson22Section) {
    if (officialIllustration) sections.push(officialIllustration);
    if (lesson22Section) sections.push(lesson22Section);
    if (lessonNumber === 8 && problem.fractionModels?.length) {
      sections.push({
        kind: 'card-grid',
        label: solved
          ? 'Solved shaded and unshaded parts'
          : 'Number-bond parts to complete',
        cards: problem.fractionModels.map((model) => ({
          label: model.label,
          sections: [m5FractionTapeSection(model, solved)]
        }))
      });
    }
  } else if (problem.concreteFractionModel) {
    sections.push(...m5ConcreteFractionSections(problem.concreteFractionModel, solved));
  } else if (problem.paperPartitionModel) {
    sections.push(...m5PaperPartitionSections(problem.paperPartitionModel, solved));
  } else if (problem.numberLineModels?.length) {
    sections.push(problem.numberLineModels.length === 1
      ? m5NumberLineSection(problem.numberLineModels[0], solved)
      : {
          kind: 'card-grid',
          label: solved
            ? 'Solved source number lines'
            : 'Source number-line workspaces',
          cards: problem.numberLineModels.map((model) => ({
            label: model.label,
            sections: [m5NumberLineSection(model, solved)]
          }))
        });
  } else if (problem.fractionModels?.length) {
    sections.push(problem.fractionModels.length === 1
      ? m5FractionTapeSection(problem.fractionModels[0], solved)
      : {
          kind: 'card-grid',
          label: solved
            ? 'Solved source fraction models'
            : 'Source fraction workspaces',
          cards: problem.fractionModels.map((model) => ({
            label: model.label,
            sections: [m5FractionTapeSection(model, solved)]
          }))
        });
  } else {
    sections.push(m5OpenFractionWorkspace(problem, solved));
  }

  const equationLines = solved
    ? problem.equations
    : problem.blankEquations?.length
      ? problem.blankEquations
      : blankEquationTemplates(problem.equations) ?? ['____ = ____'];
  if (!reviewedSections && sections.length <= 1 && equationLines.length) {
    sections.push({
      kind: 'equations',
      label: solved ? 'Solved fraction work' : 'Student fraction blanks',
      lines: equationLines
    });
  }

  sections.push({
    kind: 'note',
    label: solved ? 'Teacher Edition answer' : 'Source workspace direction',
    text: solved
      ? problem.explanation
      : reviewedSections
        ? problem.sourcePrompt
        : problem.blankWorkspaceLabel
        ?? sourceSpecificBlankWorkspaceLabel(
          problem.number,
          problem.sourcePrompt,
          'fraction'
        )
  });

  return {
    title: lessonNumber === 22
      ? `Problem ${problem.number}: equivalent fraction figures and bars`
      : `Problem ${problem.number}: ${m5ReviewedVisualTitle(problem, lessonNumber) ?? m5VisualTitle(problem)}`,
    sourceNote,
    sections
  };
}

function createM5VisualPair(
  problem: ProblemSetCenteredProblem,
  lessonNumber: number
): Pick<ProblemSetCenteredProblem, 'blankVisual' | 'solvedVisual'> {
  const solvedVisual = createM5ProblemVisual(problem, true, lessonNumber);
  const blankVisual = hydrateVisualAnswerMetadata(
    createM5ProblemVisual(problem, false, lessonNumber),
    solvedVisual
  );
  return { blankVisual, solvedVisual };
}

function m5ReviewedLessonsOneThroughFive(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec['sections'] | undefined {
  const number = Number(problem.number);
  const sourceCrop = (
    src: string,
    label: string,
    alt: string,
    crop: { x: number; y: number; width: number; height: number },
    caption: string
  ): ProblemVisualSection => ({
    kind: 'source-crop',
    label,
    src,
    alt,
    imageWidth: 1275,
    imageHeight: 1650,
    crop,
    caption
  });
  const response = (
    answers: string[],
    minHeight = 8
  ): ProblemVisualSection => ({
    kind: 'source-response-workspace',
    label: solved ? 'Teacher Edition answer work' : 'Official response space',
    parts: [{
      prompt: problem.sourcePrompt,
      openWorkspace: !solved,
      lines: solved ? answers : [],
      printedLineCount: answers.length
    }]
  });
  const fractionCards = (
    models: Array<{ label: string; numerator: number; denominator: number }>,
    label: string
  ): ProblemVisualSection => ({
    kind: 'card-grid',
    label,
    cards: models.map((model) => ({
      label: model.label,
      sections: [{
        kind: 'fraction-strip',
        wholeLabel: '1 whole',
        numerator: model.numerator,
        denominator: model.denominator,
        unitLabel: `1/${model.denominator}`,
        caption: solved
          ? `${model.numerator}/${model.denominator}`
          : `Keep all ${model.denominator} equal parts available for student work.`
      }]
    }))
  });

  if (lessonNumber === 1) {
    if (number === 1) {
      return [
        {
          kind: 'card-grid',
          label: 'Official half, fourth, and third beakers',
          cards: [
            {
              label: '1 half',
              sections: [sourceCrop(
                '/source-pages/m5-teacher/page-17.png',
                'Teacher Edition 1-half beaker',
                'Teacher Edition beaker filled to one half',
                { x: 205, y: 330, width: 250, height: 370 },
                'The completed example establishes the whole and the fill-line reference.'
              )]
            },
            {
              label: '1 fourth',
              sections: [sourceCrop(
                '/source-pages/m5-teacher/page-17.png',
                'Teacher Edition 1-fourth beaker',
                'Open Teacher Edition beaker labeled one fourth',
                { x: 550, y: 330, width: 250, height: 370 },
                'The original open beaker remains available for the required estimate.'
              )]
            },
            {
              label: '1 third',
              sections: [sourceCrop(
                '/source-pages/m5-teacher/page-17.png',
                'Teacher Edition 1-third beaker',
                'Open Teacher Edition beaker labeled one third',
                { x: 875, y: 330, width: 250, height: 370 },
                'The original open beaker remains available for the required estimate.'
              )]
            }
          ]
        },
        response(
          ['The first beaker shows 1 half. Shade 1 fourth of the second beaker and 1 third of the third beaker.'],
          6
        )
      ];
    }
    if (number === 2) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-17.png',
          'Official shaded string-cheese strips',
          'Three Teacher Edition string-cheese strips partitioned into thirds, sixths, and fourths',
          { x: 140, y: 890, width: 520, height: 500 },
          'The original part counts, relative sizes, and shaded unit are retained.'
        ),
        {
          kind: 'equations',
          lines: solved
            ? ['1 third = 1/3', '1 sixth = 1/6', '1 fourth = 1/4']
            : ['____ third = ____/3', '____ sixth = ____/6', '____ fourth = ____/4']
        }
      ];
    }
    if (number === 3) {
      return [
        fractionCards([
          { label: 'a. 2 equal parts', numerator: 1, denominator: 2 },
          { label: 'b. 3 equal parts', numerator: 1, denominator: 3 },
          { label: 'c. 4 equal parts', numerator: 1, denominator: 4 }
        ], solved ? 'Completed equal-part rectangles' : 'Three open equal-part rectangle constructions'),
        response([
          'a. Draw 1 line; each unit is 1 half.',
          'b. Draw 2 lines; each unit is 1 third.',
          'c. Draw 3 lines; each unit is 1 fourth.'
        ], 10)
      ];
    }
    if (number === 4) {
      return [
        fractionCards([
          { label: 'a. sevenths', numerator: 1, denominator: 7 },
          { label: 'a. ninths', numerator: 1, denominator: 9 }
        ], solved ? 'Completed paper partitions' : 'Official paper partition workspaces'),
        response([
          'a. Show sevenths with 6 cut lines and ninths with 8 cut lines.',
          'b. A whole split into n equal parts requires n − 1 interior cut lines; 20 equal parts require 19 lines.'
        ], 8)
      ];
    }
    return undefined;
  }

  if (lessonNumber === 2) {
    if (number === 1) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-26.png',
          'Official folded-strip choices',
          'Four Teacher Edition folded paper strips, two with equal parts and two with unequal parts',
          { x: 135, y: 285, width: 1000, height: 395 },
          'The exact fold positions and unequal-part distractors are retained.'
        ),
        response(['Circle the first and fourth strips; only those folds make equal-size parts.'], 5)
      ];
    }
    if (number === 2) {
      return [
        fractionCards([
          { label: 'a. 4 parts; 2 shaded', numerator: 2, denominator: 4 },
          { label: 'b. 6 parts; 5 shaded', numerator: 5, denominator: 6 },
          { label: 'c. 7 parts; 3 shaded', numerator: 3, denominator: 7 },
          { label: 'd. 7 parts; 0 shaded', numerator: 0, denominator: 7 }
        ], solved ? 'Completed shaded-part strips' : 'Official shaded-part strip structure'),
        {
          kind: 'equations',
          lines: solved
            ? ['a. 4 equal parts; 2 shaded', 'b. 6 equal parts; 5 shaded', 'c. 7 equal parts; 3 shaded', 'd. 7 equal parts; 0 shaded']
            : ['a. ____ equal parts; ____ shaded', 'b. ____ equal parts; ____ shaded', 'c. ____ equal parts; ____ shaded', 'd. ____ equal parts; ____ shaded']
        }
      ];
    }
    if (number === 3) {
      return [
        fractionCards([{ label: 'Candy bar shared by 3 people', numerator: 1, denominator: 3 }], solved ? 'Completed candy-bar share' : 'Open candy-bar partition'),
        response(['Use thirds. Sharon receives 1/3 of the candy bar.'], 8)
      ];
    }
    return [
      fractionCards([
        { label: 'a. halves folded in half again', numerator: 1, denominator: 4 },
        { label: 'b. thirds folded in half', numerator: 1, denominator: 6 }
      ], solved ? 'Completed cardboard fraction strips' : 'Two cardboard partition workspaces'),
      response(['a. Each part is 1/4 of the original cardboard.', 'b. Each part is 1/6 of the original cardboard.'], 10)
    ];
  }

  if (lessonNumber === 3) {
    if (number === 1) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-37.png',
          'Official four shaded wholes',
          'Teacher Edition parallelogram, rectangle, strip, and circle models',
          { x: 105, y: 275, width: 1060, height: 405 },
          'The exact shapes, partitions, and shaded regions are retained.'
        ),
        response([
          'Fourths: 2 fourths are shaded.',
          'Eighths: 5 eighths are shaded.',
          'Thirds: 3 thirds are shaded.',
          'Halves: 1 half is shaded.'
        ], 5)
      ];
    }
    if (number === 2) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-37.png',
          'Official equal- and unequal-part shape choices',
          'Five Teacher Edition shapes with partition-line distractors',
          { x: 115, y: 700, width: 1035, height: 315 },
          'The original equal-part examples and unequal-part distractors are retained.'
        ),
        response(['Circle the first, third, and fifth shapes. Equal parts are the same size.'], 5)
      ];
    }
    if (number === 3) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-37.png',
          'Official rectangle, line segment, and circle wholes',
          'Three blank Teacher Edition wholes to divide into fourths',
          { x: 145, y: 1100, width: 980, height: 285 },
          'All three source whole shapes remain open for student partitioning.'
        ),
        response(['Divide each whole into 4 equal parts. The fractional unit is fourths.'], 5)
      ];
    }
    if (number === 4) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-38.png',
          'Official three wholes for 1 half, 1 sixth, and 1 third',
          'Teacher Edition trapezoid, strip, and circle wholes',
          { x: 120, y: 260, width: 1035, height: 390 },
          'The exact whole shapes and requested fractions are retained.'
        ),
        response(['Partition and shade the wholes to show 1 half, 1 sixth, and 1 third.'], 5)
      ];
    }
    if (number === 5) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-38.png',
          'Official three open wholes for student-selected units',
          'Teacher Edition rectangle, line segment, and circle wholes',
          { x: 115, y: 675, width: 1040, height: 420 },
          'Each source whole stays open; fourths are explicitly excluded by the prompt.'
        ),
        response(['Answers will vary; each whole must use equal parts and a fractional unit other than fourths.'], 5)
      ];
    }
    return [
      fractionCards([{ label: 'Candy bar shared by Charlotte and 4 friends', numerator: 1, denominator: 5 }], solved ? 'Completed equal share' : 'Open candy-bar drawing'),
      response(['Divide the candy bar into 5 equal parts. Each person receives 1/5.'], 10)
    ];
  }

  if (lessonNumber === 4) {
    return [response(['Answers will vary. Draw the named whole at 3 or 4 stations, show different equal partitions, and shade and label one fractional unit at each station.'], 18)];
  }

  if (lessonNumber === 5) {
    if (number === 1) {
      const rows = [
        ['a. provided example', '2', '1', '1 half', '1/2'],
        ['b.', '3', '1', '1 third', '1/3'],
        ['c.', '4', '1', '1 fourth', '1/4'],
        ['d.', '5', '1', '1 fifth', '1/5'],
        ['e.', '6', '1', '1 sixth', '1/6'],
        ['f.', '8', '1', '1 eighth', '1/8']
      ];
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-59.png',
          'Official six source shapes',
          'Six Teacher Edition shapes partitioned into 2, 3, 4, 5, 6, and 8 equal parts',
          { x: 115, y: 350, width: 270, height: 1000 },
          'Only the six mathematically meaningful source shapes are retained; the response chart is authored and interactive.'
        ),
        {
          kind: 'data-table',
          label: solved ? 'Completed six-row unit-fraction chart' : 'Interactive six-row unit-fraction chart',
          columns: ['Source row', 'Total equal parts', 'Shaded parts', 'Unit fraction', 'Fraction shaded'],
          rows: solved
            ? rows
            : rows.map((row, rowIndex) => rowIndex === 0
              ? row
              : [row[0], '____', '____', '____', '____'])
        }
      ];
    }
    if (number === 2) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-60.png',
          'Official unequally cut eight-piece cake',
          'Teacher Edition cake divided into eight unequal pieces',
          { x: 510, y: 310, width: 440, height: 300 },
          'The unequal-width columns are essential to the mathematical judgment.'
        ),
        response(['No. The cake has 8 pieces, but the pieces are not equal in size, so they are not eighths.'], 7)
      ];
    }
    if (number === 3) {
      return [
        fractionCards([{ label: 'Second cake shared by 10 people', numerator: 1, denominator: 10 }], solved ? 'Completed tenths model' : 'Open cake partition'),
        response(['Draw 10 equal parts. Andre and his 9 friends each receive 1/10 of the cake.'], 9)
      ];
    }
    return [
      fractionCards([
        { label: '1 tenth of the first cake', numerator: 1, denominator: 10 },
        { label: '1 eighth of the second same-size cake', numerator: 1, denominator: 8 }
      ], solved ? 'Completed same-whole comparison' : 'Two identical cake wholes'),
      response(['One eighth is greater than one tenth because the same-size whole is divided into fewer equal parts.'], 9)
    ];
  }

  return undefined;
}

function m5ReviewedLessonsSixThroughTen(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec['sections'] | undefined {
  const number = Number(problem.number);
  const sourceCrop = (
    src: string,
    label: string,
    alt: string,
    crop: { x: number; y: number; width: number; height: number },
    caption: string
  ): ProblemVisualSection => ({
    kind: 'source-crop',
    label,
    src,
    alt,
    imageWidth: 1275,
    imageHeight: 1650,
    crop,
    caption
  });
  const equations = (
    blankLines: string[],
    solvedLines: string[],
    label = solved ? 'Teacher Edition fraction work' : 'Official response blanks'
  ): ProblemVisualSection => ({
    kind: 'equations',
    label,
    lines: solved ? solvedLines : blankLines
  });
  const response = (
    answers: string[],
    printedLineCount = answers.length
  ): ProblemVisualSection => ({
    kind: 'source-response-workspace',
    label: solved ? 'Teacher Edition answer work' : 'Official response space',
    parts: [{
      prompt: problem.sourcePrompt,
      lines: solved ? answers : [],
      printedLineCount,
      openWorkspace: !solved
    }]
  });
  const stripGrid = (
    models: Array<{ label: string; numerator: number; denominator: number }>,
    label: string,
    showBlankPartitions = false
  ): ProblemVisualSection => ({
    kind: 'card-grid',
    label,
    cards: models.map((model) => ({
      label: model.label,
      sections: solved || showBlankPartitions
        ? [{
            kind: 'fraction-strip',
            wholeLabel: model.numerator > model.denominator
              ? `${Math.ceil(model.numerator / model.denominator)} equal wholes`
              : '1 whole',
            numerator: model.numerator,
            denominator: model.denominator,
            unitLabel: `1/${model.denominator}`,
            caption: solved
              ? `${model.numerator}/${model.denominator} is ${model.numerator} unit fractions of size 1/${model.denominator}.`
              : 'The Teacher Edition supplies the equal partitions; the unit remains available for student shading.'
          }]
        : [{
            kind: 'tape',
            label: model.label,
            totalLabel: model.numerator > model.denominator
              ? `${Math.ceil(model.numerator / model.denominator)} equal wholes`
              : '1 whole',
            parts: Array.from(
              { length: Math.max(1, Math.ceil(model.numerator / model.denominator)) },
              (_, index) => ({ label: model.numerator > model.denominator ? `whole ${index + 1}` : '' })
            ),
            caption: `Open source workspace: estimate ${model.denominator} equal units and shade ${model.numerator}.`
          }]
    }))
  });
  const numberBond = (
    whole: string,
    parts: string[],
    label: string
  ): ProblemVisualSection => ({
    kind: 'number-bond',
    label,
    whole,
    parts: parts.map((part) => ({ label: part }))
  });

  if (lessonNumber === 6) {
    if (number === 1) {
      return [
        stripGrid([
          { label: 'a. 3 fourths', numerator: 3, denominator: 4 },
          { label: 'b. 3 sevenths', numerator: 3, denominator: 7 },
          { label: 'c. 4 fifths', numerator: 4, denominator: 5 },
          { label: 'd. 2 sixths', numerator: 2, denominator: 6 }
        ], solved ? 'Completed four source strips' : 'Four equal-length source strip workspaces'),
        equations(
          ['a. 3 fourths = ____', 'b. 3 sevenths = ____', 'c. 4 fifths = ____', 'd. 2 sixths = ____'],
          ['a. 3 fourths = 3/4', 'b. 3 sevenths = 3/7', 'c. 4 fifths = 4/5', 'd. 2 sixths = 2/6']
        )
      ];
    }
    if (number === 2) {
      return [
        stripGrid([
          { label: '1 liter guests drank', numerator: 1, denominator: 8 },
          { label: '7 liters left', numerator: 7, denominator: 8 }
        ], solved ? 'Completed 8-liter whole' : 'Same 8-liter whole planning models'),
        response(['a. The guests drank 1/8 of the soda.', 'b. 7/8 of the soda was left.'], 2)
      ];
    }
    return [
      sourceCrop(
        '/source-pages/m5-teacher/page-71.png',
        'Official five varied shaded figures',
        'Five Teacher Edition figures partitioned into 9, 7, 5, 6, and 8 equal parts',
        { x: 155, y: 330, width: 270, height: 1090 },
        'Only the mathematically meaningful figure column is retained; the chart is authored beside it.'
      ),
      {
        kind: 'data-table',
        label: solved ? 'Completed five-row fraction chart' : 'Official five-row fraction chart',
        columns: ['Figure', 'Equal parts', 'Shaded parts', 'Unit fraction', 'Fraction shaded'],
        rows: solved
          ? [
              ['a', '9', '5', '1/9', '5/9'],
              ['b', '7', '3', '1/7', '3/7'],
              ['c', '5', '4', '1/5', '4/5'],
              ['d', '6', '2', '1/6', '2/6'],
              ['e', '8', '8', '1/8', '8/8']
            ]
          : [
              ['a', '____', '____', '____', '____'],
              ['b', '____', '____', '____', '____'],
              ['c', '____', '____', '____', '____'],
              ['d', '____', '____', '____', '____'],
              ['e', '____', '____', '____', '____']
            ]
      }
    ];
  }

  if (lessonNumber === 7) {
    const shapeCrops: Record<number, {
      crop: { x: number; y: number; width: number; height: number };
      denominator: number;
      unshaded: string;
    }> = {
      1: { crop: { x: 215, y: 285, width: 175, height: 150 }, denominator: 2, unshaded: '1/2' },
      2: { crop: { x: 215, y: 420, width: 175, height: 160 }, denominator: 4, unshaded: '3/4' },
      3: { crop: { x: 190, y: 565, width: 225, height: 180 }, denominator: 9, unshaded: '8/9' },
      4: { crop: { x: 195, y: 730, width: 225, height: 180 }, denominator: 6, unshaded: '5/6' },
      5: { crop: { x: 180, y: 900, width: 245, height: 145 }, denominator: 5, unshaded: '4/5' },
      6: { crop: { x: 170, y: 1005, width: 260, height: 190 }, denominator: 3, unshaded: '2/3' },
      7: { crop: { x: 185, y: 1160, width: 240, height: 185 }, denominator: 7, unshaded: '6/7' },
      8: { crop: { x: 195, y: 1330, width: 225, height: 180 }, denominator: 8, unshaded: '7/8' }
    };
    if (number >= 1 && number <= 8) {
      const observed = shapeCrops[number];
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-81.png',
          `Official shaded shape ${number}`,
          `Teacher Edition Lesson 7 shape ${number} with one shaded equal part`,
          observed.crop,
          'The source shape, equal-part count, orientation, and shaded unit are retained exactly.'
        ),
        equations(
          ['Shaded fraction: ____', 'Match the amount not shaded: ____'],
          [`Shaded fraction: 1/${observed.denominator}`, `Amount not shaded: ${observed.unshaded}`]
        )
      ];
    }
    if (number === 9) {
      return [equations(
        ['a. Eighths in 1 whole: ____', 'b. Ninths in 1 whole: ____', 'c. Twelfths in 1 whole: ____'],
        ['a. 8 eighths are in 1 whole.', 'b. 9 ninths are in 1 whole.', 'c. 12 twelfths are in 1 whole.']
      )];
    }
    if (number === 10) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-82.png',
          'Official fifths, sevenths, and elevenths strips',
          'Three Teacher Edition strips with one unit shaded and braces for shaded and unshaded parts',
          { x: 185, y: 560, width: 535, height: 565 },
          'The original partitions, one shaded unit, and two-part brace structure are retained.'
        ),
        equations(
          ['a. Shaded ____; unshaded ____', 'b. Shaded ____; unshaded ____', 'c. Shaded ____; unshaded ____'],
          ['a. Shaded 1/5; unshaded 4/5', 'b. Shaded 1/7; unshaded 6/7', 'c. Shaded 1/11; unshaded 10/11']
        )
      ];
    }
    return [
      stripGrid([
        { label: 'Avanti read 1 sixth', numerator: 1, denominator: 6 },
        { label: 'Part not read', numerator: 5, denominator: 6 }
      ], solved ? 'Completed whole-book decomposition' : 'Book-whole planning model'),
      response(['Avanti has not read 5/6 of the book.'], 1)
    ];
  }

  if (lessonNumber === 8) {
    const reviewedFigures: Record<number, {
      crop: { x: number; y: number; width: number; height: number };
      shaded: string;
      unshaded: string;
    }> = {
      1: { crop: { x: 150, y: 570, width: 280, height: 140 }, shaded: '3/5', unshaded: '2/5' },
      2: { crop: { x: 180, y: 750, width: 230, height: 210 }, shaded: '3/4', unshaded: '1/4' },
      3: { crop: { x: 165, y: 970, width: 325, height: 245 }, shaded: '3/6', unshaded: '3/6' },
      4: { crop: { x: 150, y: 1240, width: 275, height: 180 }, shaded: '2/9', unshaded: '7/9' }
    };
    if (number >= 1 && number <= 4) {
      const observed = reviewedFigures[number];
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-93.png',
          `Official Lesson 8 figure ${number}`,
          `Teacher Edition Lesson 8 shaded figure ${number}`,
          observed.crop,
          'The exact source figure and its shaded/unshaded topology are retained.'
        ),
        numberBond(
          solved ? '1 whole' : '____ whole',
          solved
            ? [`${observed.shaded} shaded`, `${observed.unshaded} unshaded`]
            : ['____ shaded', '____ unshaded'],
          solved ? 'Completed two-part number bond' : 'Open two-part number bond'
        ),
        response(['Draw a different visual model represented by the same number bond.'], 1)
      ];
    }
    if (number === 5) {
      return [
        {
          kind: 'card-grid',
          label: 'Official four shaded figures',
          cards: [
            {
              label: 'a. triangle',
              sections: [sourceCrop(
                '/source-pages/m5-teacher/page-94.png',
                'Official triangle figure',
                'Teacher Edition triangle divided into fourths',
                { x: 195, y: 265, width: 150, height: 145 },
                'The source shape and its shaded topology are retained.'
              )]
            },
            {
              label: 'b. trapezoid',
              sections: [sourceCrop(
                '/source-pages/m5-teacher/page-94.png',
                'Official trapezoid figure',
                'Teacher Edition trapezoid divided into thirds',
                { x: 390, y: 265, width: 150, height: 145 },
                'The source shape and its shaded topology are retained.'
              )]
            },
            {
              label: 'c. interlocking strips',
              sections: [sourceCrop(
                '/source-pages/m5-teacher/page-94.png',
                'Official interlocking-strip figure',
                'Teacher Edition interlocking strips divided into fourths',
                { x: 620, y: 255, width: 190, height: 150 },
                'The source shape and its shaded topology are retained.'
              )]
            },
            {
              label: 'd. stepped rectangle',
              sections: [sourceCrop(
                '/source-pages/m5-teacher/page-94.png',
                'Official stepped-rectangle figure',
                'Teacher Edition stepped rectangle divided into fifths',
                { x: 860, y: 265, width: 285, height: 120 },
                'The source shape and its shaded topology are retained.'
              )]
            }
          ]
        },
        {
          kind: 'card-grid',
          label: solved ? 'Completed shaded/unshaded number bonds' : 'Four open two-part number bonds',
          cards: [
            { label: 'a', sections: [numberBond(solved ? '1 whole' : '____ whole', solved ? ['3/4', '1/4'] : ['____ shaded', '____ unshaded'], 'a')] },
            { label: 'b', sections: [numberBond(solved ? '1 whole' : '____ whole', solved ? ['2/3', '1/3'] : ['____ shaded', '____ unshaded'], 'b')] },
            { label: 'c', sections: [numberBond(solved ? '1 whole' : '____ whole', solved ? ['2/4', '2/4'] : ['____ shaded', '____ unshaded'], 'c')] },
            { label: 'd', sections: [numberBond(solved ? '1 whole' : '____ whole', solved ? ['2/5', '3/5'] : ['____ shaded', '____ unshaded'], 'd')] }
          ]
        },
        equations(
          ['a. Decompose: ____', 'b. Decompose: ____', 'c. Decompose: ____', 'd. Decompose: ____'],
          [
            'a. 3/4 = 1/4 + 1/4 + 1/4; 1/4 = 1/4',
            'b. 2/3 = 1/3 + 1/3; 1/3 = 1/3',
            'c. 2/4 = 1/4 + 1/4; 2/4 = 1/4 + 1/4',
            'd. 2/5 = 1/5 + 1/5; 3/5 = 1/5 + 1/5 + 1/5'
          ]
        )
      ];
    }
    return [
      numberBond(
        solved ? '1 whole' : '____ whole',
        solved ? ['1/4 on grill', '3/4 in refrigerator'] : ['____ on grill', '____ in refrigerator'],
        solved ? 'Completed ground-beef number bond' : 'Open ground-beef number bond'
      ),
      stripGrid([
        { label: 'Ground beef in refrigerator', numerator: 3, denominator: 4 }
      ], solved ? 'Completed visual model' : 'Open visual-model workspace'),
      response([
        'a. 3/4 of the ground beef was in the refrigerator.',
        'b. The chef can make 3 more hamburgers.',
        'c. 3/4 = 1/4 + 1/4 + 1/4.'
      ], 3)
    ];
  }

  if (lessonNumber === 9) {
    if (number === 1) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-105.png',
          'Official six-row greater-than-one figure column',
          'Teacher Edition diamonds, square eighths, sixths rectangles, fifths strips, fourths diamonds, and thirds cards',
          { x: 155, y: 300, width: 365, height: 1110 },
          'Only the varied source figures are retained; chart responses are authored beside them.'
        ),
        {
          kind: 'data-table',
          label: solved ? 'Completed unit-fraction chart' : 'Official unit-fraction chart',
          columns: ['Row', 'Unit fraction', 'Units shaded', 'Fraction shaded'],
          rows: solved
            ? [
                ['a. sample', '1/2', '5', '5/2'],
                ['b', '1/8', '15', '15/8'],
                ['c', '1/6', '14', '14/6'],
                ['d', '1/5', '8', '8/5'],
                ['e', '1/4', '9', '9/4'],
                ['f', '1/3', '7', '7/3']
              ]
            : [
                ['a. sample', '1/2', '5', '5/2'],
                ['b', '____', '____', '____'],
                ['c', '____', '____', '____'],
                ['d', '____', '____', '____'],
                ['e', '____', '____', '____'],
                ['f', '____', '____', '____']
              ]
        }
      ];
    }
    if (number === 2) {
      return [
        stripGrid([
          { label: 'a. 8 sixths across 2 wholes', numerator: 8, denominator: 6 },
          { label: 'b. 7 fourths across 2 wholes', numerator: 7, denominator: 4 },
          { label: 'c. 6 fifths across 2 wholes', numerator: 6, denominator: 5 },
          { label: 'd. 5 halves across 3 wholes', numerator: 5, denominator: 2 }
        ], solved ? 'Completed greater-than-one strips' : 'Four multi-whole strip workspaces'),
        equations(
          ['a. 8 sixths = ____', 'b. 7 fourths = ____', 'c. ____ = 6/5', 'd. ____ = 5/2'],
          ['a. 8 sixths = 8/6', 'b. 7 fourths = 7/4', 'c. 6 fifths = 6/5', 'd. 5 halves = 5/2']
        )
      ];
    }
    return [
      stripGrid([
        { label: 'First pan: 8 eighths', numerator: 8, denominator: 8 },
        { label: 'Second pan: 2 eighths', numerator: 2, denominator: 8 }
      ], solved ? 'Two completed brownie pans' : 'Two open equal-size brownie pans'),
      numberBond(
        solved ? '10/8 eaten' : '____ eaten',
        solved ? ['8/8 first pan', '2/8 second pan'] : ['____ first pan', '____ second pan'],
        solved ? 'Completed two-pan fraction bond' : 'Open two-pan fraction bond'
      ),
      response(['a. Shade 8 pieces in the first pan and 2 in the second.', 'b. The children ate 10/8 of a pan.'], 2)
    ];
  }

  if (lessonNumber === 10) {
    if (number === 1) {
      return [stripGrid([
        { label: '1/2', numerator: 1, denominator: 2 },
        { label: '1/4', numerator: 1, denominator: 4 },
        { label: '1/8', numerator: 1, denominator: 8 },
        { label: '1/3', numerator: 1, denominator: 3 },
        { label: '1/6', numerator: 1, denominator: 6 }
      ], solved ? 'One unit shaded in each equal-length strip' : 'Five equal-length source strips', true)];
    }
    if (number === 2) {
      return [equations(
        [
          'a. 1/2 is [less than / greater than] 1/4',
          'b. 1/6 is [less than / greater than] 1/2',
          'c. 1/3 is [less than / greater than] 1/2',
          'd. 1/3 is [less than / greater than] 1/6',
          'e. 1/8 is [less than / greater than] 1/6',
          'f. 1/8 is [less than / greater than] 1/4',
          'g. 1/2 is [less than / greater than] 1/8',
          'h. 9/8 is [less than / greater than] 2 halves'
        ],
        [
          'a. 1/2 is greater than 1/4.',
          'b. 1/6 is less than 1/2.',
          'c. 1/3 is less than 1/2.',
          'd. 1/3 is greater than 1/6.',
          'e. 1/8 is less than 1/6.',
          'f. 1/8 is less than 1/4.',
          'g. 1/2 is greater than 1/8.',
          'h. 9/8 is greater than 2 halves.'
        ]
      )];
    }
    if (number === 3) {
      return [
        stripGrid([
          { label: 'Oil: 1/3 cup', numerator: 1, denominator: 3 },
          { label: 'Water: 1/4 cup', numerator: 1, denominator: 4 }
        ], solved ? 'Completed same-whole comparison' : 'Two same-size cup models'),
        response(['Lily uses more oil because 1/3 is greater than 1/4; explanations will vary.'], 1)
      ];
    }
    if (number === 4) {
      return [equations(
        [
          'a. 1/3 ____ 1/5',
          'b. 1/7 ____ 1/4',
          'c. 1/6 ____ 1/6',
          'd. 1/10 ____ 1/12',
          'e. 1/16 ____ 1/11',
          'f. 1 whole ____ 2 halves',
          'g. 1/8 ____ 1 eighth ____ 1/6 ____ 1/3 ____ 2 halves ____ 1 whole'
        ],
        [
          'a. 1/3 > 1/5',
          'b. 1/7 < 1/4',
          'c. 1/6 = 1/6',
          'd. 1/10 > 1/12',
          'e. 1/16 < 1/11',
          'f. 1 whole = 2 halves',
          'g. 1/8 = 1 eighth < 1/6 < 1/3 < 2 halves = 1 whole'
        ]
      )];
    }
    return [
      stripGrid([
        { label: 'Eric’s claim: 1/6', numerator: 1, denominator: 6 },
        { label: 'Comparison unit: 1/5', numerator: 1, denominator: 5 }
      ], solved ? 'Completed same-whole counterexample' : 'Two same-size whole models'),
      response(['No. When the whole is the same, 1/6 is less than 1/5 because sixths are smaller unit fractions; explanations will vary.'], 1)
    ];
  }

  return undefined;
}

function m5ReviewedLessonsElevenThroughFifteen(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec['sections'] | undefined {
  const number = Number(problem.number);
  const sourceCrop = (
    src: string,
    label: string,
    alt: string,
    crop: { x: number; y: number; width: number; height: number },
    caption: string
  ): ProblemVisualSection => ({
    kind: 'source-crop',
    label,
    src,
    alt,
    imageWidth: 1275,
    imageHeight: 1650,
    crop,
    caption
  });
  const equations = (
    blankLines: string[],
    solvedLines: string[],
    label = solved ? 'Teacher Edition answer work' : 'Official response blanks'
  ): ProblemVisualSection => ({
    kind: 'equations',
    label,
    lines: solved ? solvedLines : blankLines
  });
  const response = (
    answers: string[],
    printedLineCount = Math.max(answers.length, 4),
    label = solved ? 'Teacher Edition answer work' : 'Official response space'
  ): ProblemVisualSection => ({
    kind: 'source-response-workspace',
    label,
    parts: [{
      prompt: problem.sourcePrompt,
      lines: solved ? answers : [],
      printedLineCount,
      openWorkspace: !solved
    }]
  });
  const numberBond = (
    whole: string,
    parts: string[],
    label: string
  ): ProblemVisualSection => ({
    kind: 'number-bond',
    label,
    whole,
    parts: parts.map((part) => ({ label: part }))
  });
  const numberLine = (
    denominator: number,
    label: string,
    startLabel = '0',
    endLabel = '1',
    targets: number[] = []
  ): ProblemVisualSection => m5NumberLineSection({
    label,
    denominator,
    startLabel,
    endLabel,
    targetNumerators: targets,
    tickLabels: Array.from(
      { length: denominator + 1 },
      (_, numerator) => numerator === 0
        ? `0/${denominator} = ${startLabel}`
        : numerator === denominator
          ? `${denominator}/${denominator} = ${endLabel}`
          : `${numerator}/${denominator}`
    )
  }, solved);
  const fractionTape = (
    denominator: number,
    label: string
  ): ProblemVisualSection => ({
    kind: 'tape',
    label,
    totalLabel: '1 whole',
    parts: Array.from({ length: denominator }, () => ({ label: solved ? `1/${denominator}` : '' })),
    caption: solved
      ? `${denominator} equal unit fractions of size 1/${denominator} make 1 whole.`
      : 'Partition the source strip into equal units before labeling.'
  });

  if (lessonNumber === 11) {
    const givenModels: Record<number, {
      src: string;
      crop: { x: number; y: number; width: number; height: number };
      given: string;
      relation: string;
      validAnswer: string;
    }> = {
      1: { src: '/source-pages/m5-teacher/page-129.png', crop: { x: 255, y: 560, width: 120, height: 120 }, given: '1/3', relation: '>', validAnswer: '1/6' },
      2: { src: '/source-pages/m5-teacher/page-129.png', crop: { x: 165, y: 775, width: 320, height: 95 }, given: '1/5', relation: '<', validAnswer: '1/4' },
      3: { src: '/source-pages/m5-teacher/page-129.png', crop: { x: 170, y: 955, width: 320, height: 135 }, given: '1/10', relation: '>', validAnswer: '1/12' },
      4: { src: '/source-pages/m5-teacher/page-129.png', crop: { x: 185, y: 1160, width: 270, height: 135 }, given: '1/12', relation: '<', validAnswer: '1/8' },
      5: { src: '/source-pages/m5-teacher/page-130.png', crop: { x: 845, y: 235, width: 145, height: 130 }, given: '1/8', relation: '>', validAnswer: '1/4' },
      6: { src: '/source-pages/m5-teacher/page-130.png', crop: { x: 730, y: 465, width: 375, height: 95 }, given: '1/9', relation: '<', validAnswer: '1/12' },
      7: { src: '/source-pages/m5-teacher/page-130.png', crop: { x: 745, y: 650, width: 365, height: 125 }, given: '1/12', relation: '>', validAnswer: '1/6' }
    };
    if (number >= 1 && number <= 7) {
      const observed = givenModels[number];
      const answerFirst = number >= 5;
      return [
        sourceCrop(
          observed.src,
          'Official given unit-fraction model',
          `Teacher Edition Lesson 11 Problem ${number} given whole and shaded unit`,
          observed.crop,
          'Only the given mathematical model is retained; the worksheet directions and response area are authored as live content.'
        ),
        equations(
          ['Given unit fraction: ____', answerFirst ? `____ ${observed.relation} ${observed.given}` : `${observed.given} ${observed.relation} ____`],
          [
            `Given unit fraction: ${observed.given}`,
            answerFirst
              ? `${observed.validAnswer} ${observed.relation} ${observed.given}`
              : `${observed.given} ${observed.relation} ${observed.validAnswer}`
          ],
          solved ? 'One valid Teacher Edition-permitted answer' : 'Label and comparison blanks'
        ),
        response(
          solved
            ? ['Answers will vary. The completed comparison above is one valid answer. The student drawing must copy the same whole and shade one equal unit.']
            : [],
          10,
          solved ? 'Validity check for the drawing' : 'Draw and label the same whole here'
        )
      ];
    }
    if (number === 8) {
      return [
        {
          kind: 'card-grid',
          label: 'Official given models',
          cards: [
            {
              label: 'a. first given unit fraction',
              sections: [sourceCrop(
                '/source-pages/m5-teacher/page-130.png',
                'Official first model',
                'Teacher Edition first given unit-fraction model',
                { x: 195, y: 930, width: 160, height: 160 },
                'Only the first printed mathematical model is retained.'
              )]
            },
            {
              label: 'b. second given unit fraction',
              sections: [sourceCrop(
                '/source-pages/m5-teacher/page-130.png',
                'Official second model',
                'Teacher Edition second given unit-fraction model',
                { x: 695, y: 930, width: 180, height: 175 },
                'Only the second printed mathematical model is retained.'
              )]
            }
          ]
        },
        equations(
          ['a. ____ < ____', 'b. ____ > ____'],
          ['a. 1/4 < 1/3', 'b. 1/2 > 1/3'],
          solved ? 'One valid pair of comparisons' : 'Comparison blanks'
        ),
        response(
          solved ? ['Answers will vary. Each drawing must match the fraction written in its blank and preserve an equal-sized whole.'] : [],
          10,
          solved ? 'Validity check for both drawings' : 'Draw both matching models here'
        )
      ];
    }
    if (number === 9) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-131.png',
          'Official small- and large-pizza models',
          'Teacher Edition small and large pizza wholes used in the comparison',
          { x: 215, y: 305, width: 325, height: 175 },
          'The unequal whole sizes are essential to the question and are retained exactly.'
        ),
        response(
          solved
            ? ['No. Elizabeth cannot use the symbols 1/4 > 1/2 because the fractions refer to different-sized wholes. Her physical piece may be larger, but fraction comparisons require the same-sized whole. Explanations will vary.']
            : [],
          10
        )
      ];
    }
    return [
      sourceCrop(
        '/source-pages/m5-teacher/page-131.png',
        'Official Manny and Daniel candy-bar models',
        'Teacher Edition candy-bar wholes showing the two one-half pieces',
        { x: 190, y: 700, width: 430, height: 305 },
        'The source candy-bar lengths and half partitions are retained because the designated wholes differ.'
      ),
      response(
        solved
          ? ['No. Manny’s half is longer because Manny’s whole candy is longer. Both boys ate 1/2 of their own whole; one-half of different-sized wholes need not have the same length. Explanations will vary.']
          : [],
        10
      )
    ];
  }

  if (lessonNumber === 12) {
    const station = ['Yellow strip', 'Brown strip', 'Orange square', 'Yarn', 'Water', 'Clay'][number - 1];
    if (!station) return undefined;
    return [
      response(
        solved
          ? [
              'Answers will vary.',
              `A valid ${station.toLowerCase()} response shows at least two different wholes made by copying the same designated unit fraction.`,
              'Every copied unit is labeled, each whole is labeled 1, and at least one number bond matches a drawing.'
            ]
          : [],
        18,
        solved ? `${station}: Teacher Edition validity criteria` : `${station}: open station drawing workspace`
      )
    ];
  }

  if (lessonNumber === 13) {
    const pairedModels: Record<number, {
      crop: { x: number; y: number; width: number; height: number };
      answer: string;
    }> = {
      1: { crop: { x: 135, y: 285, width: 960, height: 235 }, answer: '1/2' },
      2: { crop: { x: 135, y: 510, width: 960, height: 250 }, answer: '1/4' },
      3: { crop: { x: 135, y: 755, width: 960, height: 235 }, answer: '1/3' },
      4: { crop: { x: 135, y: 985, width: 960, height: 205 }, answer: '1/5' },
      5: { crop: { x: 135, y: 1175, width: 960, height: 250 }, answer: '1/6' }
    };
    if (number >= 1 && number <= 5) {
      const observed = pairedModels[number];
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-153.png',
          'Official designated-whole shape pair',
          `Teacher Edition Lesson 13 Problem ${number} original whole and shaded-part-as-whole figures`,
          observed.crop,
          'Only the paired source figures are retained; their shape, shaded topology, and change in designated whole carry the mathematics.'
        ),
        equations(
          ['a. Unit fraction of the first whole: ____', 'b. Divide the shaded-part whole to show: ____'],
          [`a. Unit fraction of the first whole: ${observed.answer}`, `b. Divide the shaded-part whole to show ${observed.answer}.`]
        ),
        response(
          solved ? ['The unit fraction stays the same even though the shaded part is redesignated as the new whole.'] : [],
          5,
          solved ? 'Designated-whole explanation' : 'Partition the shaded-part whole'
        )
      ];
    }
    if (number === 6) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-154.png',
          'Official Rope A, Rope B, and Rope C diagram',
          'Teacher Edition three-rope designated-whole diagram',
          { x: 145, y: 255, width: 870, height: 325 },
          'The three source rope lengths and shaded portions are retained exactly.'
        ),
        equations(
          [
            'a. Rope ____ is 1/2 the length of Rope B.',
            'b. Rope ____ is 1/2 the length of Rope A.',
            'c. Rope C is 1/4 the length of Rope ____.',
            'd. If Rope B is 1 m, Rope A is ____ m and Rope C is ____ m.',
            'e. If Rope A is 1 m, Rope B is ____ m and Rope C is ____ m.'
          ],
          [
            'a. Rope C is 1/2 the length of Rope B.',
            'b. Rope B is 1/2 the length of Rope A.',
            'c. Rope C is 1/4 the length of Rope A.',
            'd. If Rope B is 1 m, Rope A is 2 m and Rope C is 1/2 m.',
            'e. If Rope A is 1 m, Rope B is 1/2 m and Rope C is 1/4 m.'
          ]
        )
      ];
    }
    return [
      sourceCrop(
        '/source-pages/m5-teacher/page-154.png',
        'Official shaded rectangle',
        'Teacher Edition rectangle used to name the shaded fraction with different designated wholes',
        { x: 420, y: 1110, width: 430, height: 180 },
        'The source figure is retained without the surrounding worksheet task.'
      ),
      response(
        solved
          ? ['Jenna is right. Charlie sees the entire rectangle as 1 whole, so 3 of its 4 equal units are shaded: 3/4. Janice sees one of the two large equal shaded bands as 1 whole, so the shaded amount is 3 copies of 1/2: 3/2. Explanations will vary.']
          : [],
        10
      )
    ];
  }

  if (lessonNumber === 14) {
    if (number === 1) {
      const parts = [
        { label: 'a. Halves', denominator: 2, crop: { x: 145, y: 340, width: 1010, height: 320 } },
        { label: 'b. Thirds', denominator: 3, crop: { x: 145, y: 635, width: 1010, height: 285 } },
        { label: 'c. Fourths', denominator: 4, crop: { x: 145, y: 900, width: 1010, height: 275 } },
        { label: 'd. Fifths', denominator: 5, crop: { x: 145, y: 1150, width: 1010, height: 285 } }
      ];
      if (!solved) {
        return [{
          kind: 'card-grid',
          label: 'Four official open constructions',
          cards: parts.map((part) => ({
            label: part.label,
            sections: [sourceCrop(
              '/source-pages/m5-teacher/page-173.png',
              `${part.label} source construction`,
              `Teacher Edition ${part.label.toLowerCase()} number bond, fraction strip, and endpoint-only number line`,
              part.crop,
              'This is one subpart only: the source keeps the number bond, strip, and interior number-line marks open.'
            )]
          }))
        }];
      }
      return [{
        kind: 'card-grid',
        label: 'Completed number bonds, fraction strips, and number lines',
        cards: parts.map((part) => ({
          label: part.label,
          sections: [
            numberBond('1', Array.from({ length: part.denominator }, () => `1/${part.denominator}`), `${part.label} number bond`),
            fractionTape(part.denominator, `${part.label} fraction strip`),
            numberLine(part.denominator, part.label, '0', '1', Array.from({ length: part.denominator + 1 }, (_, index) => index))
          ]
        }))
      }];
    }
    if (number === 2) {
      return solved
        ? [
            numberLine(4, 'Quarter hours', '0 hours', '1 hour', [0, 1, 2, 3, 4]),
            response(['Trevor takes the puppy outside at 1/4, 2/4, 3/4, and 4/4 hour.'], 2)
          ]
        : [response([], 14, 'Open number-line drawing workspace')];
    }
    return solved
      ? [
          numberLine(5, 'Fifths of a meter', '0 meters', '1 meter', [1, 2, 3, 4, 5]),
          response(['Mrs. Lee sews beads at 1/5, 2/5, 3/5, 4/5, and 5/5 meter.'], 2)
        ]
      : [response([], 14, 'Open number-line drawing workspace')];
  }

  if (lessonNumber === 15) {
    if (number === 1) {
      const targets = [
        { label: 'a. 2/3', denominator: 3, numerator: 2, remainder: 1, crop: { x: 115, y: 340, width: 1050, height: 255 } },
        { label: 'b. 3/4', denominator: 4, numerator: 3, remainder: 1, crop: { x: 115, y: 565, width: 1050, height: 235 } },
        { label: 'c. 3/5', denominator: 5, numerator: 3, remainder: 2, crop: { x: 115, y: 785, width: 1050, height: 235 } },
        { label: 'd. 5/6', denominator: 6, numerator: 5, remainder: 1, crop: { x: 115, y: 995, width: 1050, height: 235 } },
        { label: 'e. 3/10', denominator: 10, numerator: 3, remainder: 7, crop: { x: 115, y: 1210, width: 1050, height: 235 } }
      ];
      if (!solved) {
        return [{
          kind: 'card-grid',
          label: 'Five official endpoint-only number lines and open bonds',
          cards: targets.map((target) => ({
            label: target.label,
            sections: [sourceCrop(
              '/source-pages/m5-teacher/page-183.png',
              `${target.label} source construction`,
              `Teacher Edition ${target.label} endpoint-only number line and number-bond boxes`,
              target.crop,
              target.label.startsWith('a.')
                ? 'This is the completed source example subpart; it establishes the required endpoint, target, and number-bond structure.'
                : 'This is one open source subpart; the target estimate, endpoint fractions, and number-bond boxes remain unanswered.'
            )]
          }))
        }];
      }
      return [{
        kind: 'card-grid',
        label: 'Completed estimated locations and matching number bonds',
        cards: targets.map((target) => ({
          label: target.label,
          sections: [
            numberLine(target.denominator, target.label, '0', '1', [target.numerator]),
            numberBond(
              '1',
              [`${target.numerator}/${target.denominator}`, `${target.remainder}/${target.denominator}`],
              `${target.label} + ${target.remainder}/${target.denominator} = 1`
            )
          ]
        }))
      }];
    }
    if (number === 2) {
      return solved
        ? [
            fractionTape(8, 'Fraction strip folded into eighths'),
            numberLine(8, 'Eighths from 0 to 1', '0', '1', Array.from({ length: 9 }, (_, index) => index)),
            response(['Count 0/8, 1/8, 2/8, 3/8, 4/8, 5/8, 6/8, 7/8, 8/8.'], 2)
          ]
        : [response([], 16, 'Open fraction-strip and number-line construction workspace')];
    }
    return [
      sourceCrop(
        '/source-pages/m5-teacher/page-184.png',
        'Official five-knot rope model',
        'Teacher Edition rope with five equally spaced knots',
        { x: 230, y: 750, width: 490, height: 85 },
        'Only the mathematical rope illustration is retained; the task and response areas remain authored live content.'
      ),
      equations(
        [
          'a. 5 knots form ____ equal parts. Knot labels: ____',
          'b. The third knot is labeled ____.',
          'c. With 6 knots, the first 2 knots measure ____ of the rope.'
        ],
        [
          'a. 5 knots form 4 equal parts. Knot labels: 0/4, 1/4, 2/4, 3/4, 4/4.',
          'b. The third knot is labeled 2/4.',
          'c. With 6 knots, the first 2 knots measure 1/5 of the rope.'
        ]
      ),
      response(
        solved ? ['Knots mark points. Five knots create four intervals; six knots create five intervals.'] : [],
        5,
        solved ? 'Why the denominator is one less than the knot count' : 'Rope-labeling work'
      )
    ];
  }

  return undefined;
}

function m5ReviewedLessonsSixteenThroughTwenty(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec['sections'] | undefined {
  const number = Number(problem.number);
  const response = (
    answers: string[],
    printedLineCount = Math.max(answers.length, 4),
    label = solved ? 'Teacher Edition answer work' : 'Official response space'
  ): ProblemVisualSection => ({
    kind: 'source-response-workspace',
    label,
    parts: [{
      prompt: problem.sourcePrompt,
      lines: solved ? answers : [],
      printedLineCount,
      openWorkspace: !solved
    }]
  });
  const equations = (
    blankLines: string[],
    solvedLines: string[],
    label = solved ? 'Teacher Edition fraction work' : 'Official response blanks'
  ): ProblemVisualSection => ({
    kind: 'equations',
    label,
    lines: solved ? solvedLines : blankLines
  });
  const sourceCrop = (
    src: string,
    label: string,
    alt: string,
    crop: { x: number; y: number; width: number; height: number },
    caption: string
  ): ProblemVisualSection => ({
    kind: 'source-crop',
    label,
    src,
    alt,
    imageWidth: 1275,
    imageHeight: 1650,
    crop,
    caption
  });
  const rangeLine = (
    start: number,
    end: number,
    denominator: number,
    label: string,
    targets: number[] = [],
    forceComplete = false
  ): ProblemVisualSection => {
    const complete = solved || forceComplete;
    const ticks = complete
      ? Array.from(
          { length: (end - start) * denominator + 1 },
          (_, index) => {
            const numerator = start * denominator + index;
            const atWhole = numerator % denominator === 0;
            return {
              label: atWhole
                ? `${numerator}/${denominator} = ${numerator / denominator}`
                : `${numerator}/${denominator}`,
              target: targets.includes(numerator)
            };
          }
        )
      : Array.from(
          { length: end - start + 1 },
          (_, index) => ({ label: `${start + index}` })
        );
    return {
      kind: 'number-line',
      label,
      ticks,
      caption: complete
        ? `The interval from ${start} to ${end} is partitioned into ${DENOMINATOR_LABELS[denominator] ?? `${denominator}ths`}.`
        : 'The Teacher Edition prints whole-number marks only; estimate and add the fractional marks.'
    };
  };
  const cards = (
    label: string,
    entries: Array<{ label: string; sections: ProblemVisualSection[] }>
  ): ProblemVisualSection => ({
    kind: 'card-grid',
    label,
    cards: entries
  });

  if (lessonNumber === 16) {
    if (number === 1) {
      const subparts = [
        { label: 'a. halves from 0 to 2 — provided example', start: 0, end: 2, denominator: 2, force: true },
        { label: 'b. thirds from 1 to 2', start: 1, end: 2, denominator: 3 },
        { label: 'c. halves from 2 to 4', start: 2, end: 4, denominator: 2 },
        { label: 'd. fourths from 3 to 5', start: 3, end: 5, denominator: 4 },
        { label: 'e. thirds from 6 to 9', start: 6, end: 9, denominator: 3 }
      ];
      return [
        cards(
          solved ? 'Completed five Teacher Edition number lines' : 'Five source-exact number-line structures',
          subparts.map((part) => ({
            label: part.label,
            sections: [rangeLine(
              part.start,
              part.end,
              part.denominator,
              part.label,
              Array.from(
                { length: part.end - part.start + 1 },
                (_, index) => (part.start + index) * part.denominator
              ),
              part.force
            )]
          }))
        ),
        equations(
          [
            'a. Provided example: box 0/2, 2/2, and 4/2.',
            'b. Box: ____',
            'c. Box: ____',
            'd. Box: ____',
            'e. Box: ____'
          ],
          [
            'a. Box 0/2, 2/2, and 4/2.',
            'b. Box 3/3 and 6/3.',
            'c. Box 4/2, 6/2, and 8/2.',
            'd. Box 12/4, 16/4, and 20/4.',
            'e. Box 18/3, 21/3, 24/3, and 27/3.'
          ],
          solved ? 'Whole-number points written and boxed as fractions' : 'Whole-equivalent fraction boxes'
        )
      ];
    }
    if (number === 2) {
      return [
        rangeLine(0, 2, 5, 'Fifths from 0 to 2', [0, 5, 10]),
        equations(['Box the whole-number fractions: ____'], ['Box 0/5, 5/5, and 10/5.'])
      ];
    }
    if (number === 3) {
      return [
        rangeLine(1, 4, 3, 'Thirds from 1 to 4', [3, 6, 9, 12]),
        equations(['Box the whole-number fractions: ____'], ['Box 3/3, 6/3, 9/3, and 12/3.'])
      ];
    }
    return solved
      ? [
          rangeLine(0, 3, 4, 'Fourth-unit number line from 0 to 3', [0, 4, 8, 12]),
          equations([], ['Box 0/4, 4/4, 8/4, and 12/4.'])
        ]
      : [response([], 18, 'Open number-line construction workspace')];
  }

  if (lessonNumber === 17) {
    const specs: Record<number, {
      start: number;
      end: number;
      denominator: number;
      targets: number[];
      label: string;
      answer?: string;
    }> = {
      1: { start: 0, end: 3, denominator: 6, targets: [0, 6, 12, 3, 9], label: 'Sixths from 0 to 3' },
      2: { start: 1, end: 4, denominator: 4, targets: [8, 6, 12, 16, 4], label: 'Fourths from 1 to 4' },
      3: { start: 2, end: 6, denominator: 3, targets: [18, 14, 9, 11, 6], label: 'Thirds from 2 to 6' },
      4: { start: 0, end: 2, denominator: 4, targets: [7, 8], label: 'Alex and Jerimiah in fourths', answer: 'Alex’s finger is longer because 2 inches = 8/4 inches and 8/4 > 7/4.' },
      5: { start: 0, end: 4, denominator: 5, targets: [0, 20, 7, 12], label: 'Marcy’s run in fifths', answer: 'Start 0/5; shoelace stop 7/5; song stop 12/5; finish 20/5 = 4 km.' }
    };
    const spec = specs[number];
    if (!spec) return undefined;
    return [
      rangeLine(spec.start, spec.end, spec.denominator, spec.label, spec.targets),
      equations(
        [`Locate and label: ${spec.targets.map(() => '____').join(', ')}`],
        [`Located fractions: ${spec.targets.map((target) => `${target}/${spec.denominator}`).join(', ')}`]
      ),
      ...(spec.answer ? [response([spec.answer], 3)] : [])
    ];
  }

  if (lessonNumber === 18) {
    const comparisons: Record<number, {
      start: number;
      end: number;
      denominator: number;
      targets: number[];
      closest: number;
      comparison: string;
      label: string;
      provided?: boolean;
    }> = {
      1: { start: 0, end: 1, denominator: 4, targets: [1, 3], closest: 1, comparison: '1/4 < 3/4', label: 'Provided fourths example', provided: true },
      2: { start: 0, end: 1, denominator: 6, targets: [2, 3], closest: 2, comparison: '2/6 < 3/6', label: 'Sixths comparison' },
      3: { start: 0, end: 1, denominator: 4, targets: [2, 1], closest: 1, comparison: '1/2 > 1/4', label: 'Halves and fourths comparison' },
      4: { start: 0, end: 1, denominator: 6, targets: [4, 2], closest: 2, comparison: '2/3 > 2/6', label: 'Thirds and sixths comparison' },
      5: { start: 1, end: 2, denominator: 8, targets: [11, 14], closest: 11, comparison: '11/8 < 7/4', label: 'Eighths and fourths from 1 to 2' }
    };
    if (number <= 5) {
      const spec = comparisons[number];
      return [
        rangeLine(spec.start, spec.end, spec.denominator, spec.label, spec.targets, spec.provided),
        equations(
          spec.provided
            ? ['Provided example: circle 1/4; 1/4 < 3/4.']
            : ['Circle the fraction closest to 0: ____', 'Comparison: ____'],
          [
            `Circle ${spec.closest}/${spec.denominator}.`,
            `Comparison: ${spec.comparison}.`
          ]
        )
      ];
    }
    if (number === 6) {
      return solved
        ? [
            cards('Both distances on same-length wholes', [
              { label: 'JoAnn', sections: [rangeLine(0, 1, 6, 'JoAnn: sixths', [5])] },
              { label: 'Lupe', sections: [rangeLine(0, 1, 8, 'Lupe: eighths', [7])] }
            ]),
            response(['JoAnn walks less because 5/6 < 7/8. Explanations will vary.'], 5)
          ]
        : [response([], 16, 'Open two-number-line and explanation workspace')];
    }
    if (number === 7) {
      return solved
        ? [
            cards('Both thread lengths', [
              { label: 'Blue thread', sections: [rangeLine(0, 2, 4, 'Blue thread in fourths', [5])] },
              { label: 'Red thread', sections: [rangeLine(0, 2, 5, 'Red thread in fifths', [4])] }
            ]),
            response(['The red thread is shorter because 4/5 < 1 whole while 5/4 > 1 whole. Explanations will vary.'], 5)
          ]
        : [response([], 16, 'Open thread number-line and explanation workspace')];
    }
    return solved
      ? [
          rangeLine(0, 2, 8, 'Three noodle lengths in eighths', [7, 14, 16]),
          equations([], ['7/8 < 7/4 < 4/2']),
          response(['The ordered lengths are 7/8 foot, 7/4 feet, and 4/2 feet. Explanations will vary.'], 5)
        ]
      : [response([], 18, 'Open spaghetti number-line, comparison, and explanation workspace')];
  }

  if (lessonNumber === 19) {
    const denominatorSpecs = [
      { label: 'a. halves', denominator: 2, targets: [3, 5, 4] },
      { label: 'b. fourths', denominator: 4, targets: [9, 11, 6] },
      { label: 'c. eighths', denominator: 8, targets: [24, 19, 16] }
    ];
    if (number === 1) {
      return [
        cards(
          solved ? 'Completed fraction placement lines' : 'Three whole-mark-only source lines',
          denominatorSpecs.map((spec) => ({
            label: spec.label,
            sections: [
              rangeLine(0, 3, spec.denominator, spec.label, spec.targets),
              equations(
                [`Place: ${spec.targets.map(() => '____').join(', ')}`],
                [`Placed: ${spec.targets.map((target) => `${target}/${spec.denominator}`).join(', ')}`]
              )
            ]
          }))
        )
      ];
    }
    if (number === 2) {
      return [
        cards(
          solved ? 'Completed reference number lines from Problem 1' : 'Reference whole-mark-only lines from Problem 1',
          denominatorSpecs.map((spec) => ({
            label: spec.label,
            sections: [rangeLine(0, 3, spec.denominator, spec.label, spec.targets)]
          }))
        ),
        equations(
          [
            '6/4 ____ 9/4', '3/2 ____ 5/2', '19/8 ____ 16/8',
            '16/8 ____ 3/2', '9/4 ____ 19/8', '4/2 ____ 16/8',
            '6/4 ____ 16/8', '5/2 ____ 9/4', '24/8 ____ 11/4'
          ],
          [
            '6/4 < 9/4', '3/2 < 5/2', '19/8 > 16/8',
            '16/8 > 3/2', '9/4 < 19/8', '4/2 = 16/8',
            '6/4 < 16/8', '5/2 > 9/4', '24/8 > 11/4'
          ],
          solved ? 'Nine Teacher Edition comparisons' : 'Nine official comparison blanks'
        )
      ];
    }
    const criteria = {
      3: 'Answers will vary. Choose a true greater-than comparison from Problem 2 and explain it with pictures, numbers, and words.',
      4: 'Answers will vary. Choose a true less-than comparison from Problem 2 and explain it a different way.',
      5: 'Answers will vary. Choose the equal comparison 4/2 = 16/8 and prove it in two ways.'
    }[number];
    return criteria
      ? [response(solved ? [criteria] : [], 18, solved ? 'Teacher Edition validity criteria' : 'Open explanation workspace')]
      : undefined;
  }

  if (lessonNumber === 20) {
    if (number === 1) {
      const rows = [
        { label: 'a. eight-square figures', crop: { x: 215, y: 295, width: 900, height: 180 }, answers: ['4/8', '4/8', '3/8', '4/8'], circles: 'Circle the first, second, and last figures.' },
        { label: 'b. five-part figures', crop: { x: 225, y: 515, width: 890, height: 190 }, answers: ['2/5', '1/5', '2/5', '2/5'], circles: 'Circle the first, third, and last figures.' },
        { label: 'c. six-part figures', crop: { x: 225, y: 755, width: 890, height: 235 }, answers: ['2/6', '2/6', '4/6', '3/6'], circles: 'Circle the first and second figures.' }
      ];
      return [
        cards('Three official figure rows', rows.map((row) => ({
          label: row.label,
          sections: [
            sourceCrop(
              '/source-pages/m5-teacher/page-240.png',
              row.label,
              `Teacher Edition Lesson 20 Problem 1 ${row.label}`,
              row.crop,
              'Only the source mathematical figures are retained; fraction labels and circling are authored live.'
            ),
            equations(
              [row.answers.map(() => '____').join('  |  ')],
              [`Fractions: ${row.answers.join(', ')}`, row.circles]
            )
          ]
        })))
      ];
    }
    if (number === 2) {
      return [
        cards('Two official shaded source figures', [
          {
            label: 'a',
            sections: [sourceCrop(
              '/source-pages/m5-teacher/page-240.png',
              'Official four-part strip',
              'Teacher Edition tilted strip with one of four parts shaded',
              { x: 225, y: 1110, width: 330, height: 120 },
              'The exact source partition and shaded part are retained.'
            )]
          },
          {
            label: 'b',
            sections: [sourceCrop(
              '/source-pages/m5-teacher/page-240.png',
              'Official seven-square stack',
              'Teacher Edition seven-square figure with one square shaded',
              { x: 235, y: 1245, width: 185, height: 190 },
              'The exact source arrangement and shaded square are retained.'
            )]
          }
        ]),
        equations(['a. ____', 'b. ____'], ['a. 1/4', 'b. 1/7']),
        response(
          solved ? ['a. Draw 2 different representations of 1/4.', 'b. Draw 2 different representations of 1/7.'] : [],
          16,
          solved ? 'Teacher Edition answer criteria' : 'Draw four different representations here'
        )
      ];
    }
    if (number === 3) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-241.png',
          'Official six square pieces',
          'Teacher Edition six equal squares, two grey and four white',
          { x: 585, y: 240, width: 450, height: 85 },
          'Only the six source pieces are retained; their equal size and two grey wholes are mathematically essential.'
        ),
        response(
          solved
            ? ['a. Ann has triangles and squares.', 'b. She has 4 triangles and 4 squares.', 'c. Draw at least 2 different no-overlap arrangements using every piece. The grey fraction is 2/6.']
            : [],
          18
        )
      ];
    }
    return [
      sourceCrop(
        '/source-pages/m5-teacher/page-241.png',
        'Official Beaker A and Beaker B models',
        'Teacher Edition differently shaped one-liter beakers, each containing one-half liter',
        { x: 815, y: 990, width: 320, height: 490 },
        'The source beaker shapes and fill heights are retained because equal capacity, not visual height, determines the amount.'
      ),
      response(
        solved
          ? ['Cristina is correct. Both beakers hold exactly 1 liter, and each contains 1/2 liter. The liquid has a different shape and height, but the amounts are equal. Explanations will vary.']
          : [],
        12
      )
    ];
  }

  return undefined;
}

function m5ReviewedLessonsTwentyOneThroughTwentyFive(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec['sections'] | undefined {
  const number = Number(problem.number);
  const equations = (
    blankLines: string[],
    solvedLines: string[],
    label = solved ? 'Teacher Edition fraction work' : 'Official response blanks'
  ): ProblemVisualSection => ({
    kind: 'equations',
    label,
    lines: solved ? solvedLines : blankLines
  });
  const response = (
    answers: string[],
    printedLineCount = Math.max(answers.length, 6),
    label = solved ? 'Teacher Edition answer work' : 'Official response space'
  ): ProblemVisualSection => ({
    kind: 'source-response-workspace',
    label,
    parts: [{
      prompt: problem.sourcePrompt,
      lines: solved ? answers : [],
      printedLineCount,
      openWorkspace: !solved
    }]
  });
  const sourceCrop = (
    src: string,
    label: string,
    alt: string,
    crop: { x: number; y: number; width: number; height: number },
    caption: string
  ): ProblemVisualSection => ({
    kind: 'source-crop',
    label,
    src,
    alt,
    imageWidth: 1275,
    imageHeight: 1650,
    crop,
    caption
  });
  const line = (
    label: string,
    tickLabels: string[],
    targets: number[] = [],
    caption = 'Equal intervals preserve the Teacher Edition number-line topology.'
  ): ProblemVisualSection => ({
    kind: 'number-line',
    label,
    ticks: tickLabels.map((tickLabel, index) => ({
      label: tickLabel,
      target: targets.includes(index)
    })),
    caption
  });
  const completeLine = (
    start: number,
    end: number,
    denominator: number,
    label: string,
    targets: number[] = []
  ): ProblemVisualSection => line(
    label,
    Array.from(
      { length: (end - start) * denominator + 1 },
      (_, index) => {
        const numerator = start * denominator + index;
        return numerator % denominator === 0
          ? `${numerator}/${denominator} = ${numerator / denominator}`
          : `${numerator}/${denominator}`;
      }
    ),
    targets.map((numerator) => numerator - start * denominator),
    `The interval from ${start} to ${end} is partitioned into ${DENOMINATOR_LABELS[denominator]}.`
  );
  const segmentedCompleteLines = (
    start: number,
    end: number,
    denominator: number,
    label: string
  ): ProblemVisualSection => cards(
    label,
    Array.from({ length: end - start }, (_, index) => {
      const wholeStart = start + index;
      return {
        label: `${wholeStart} to ${wholeStart + 1}`,
        sections: [
          completeLine(
            wholeStart,
            wholeStart + 1,
            denominator,
            `${DENOMINATOR_LABELS[denominator]} from ${wholeStart} to ${wholeStart + 1}`
          )
        ]
      };
    })
  );
  const endpointLine = (
    start: number,
    end: number,
    label: string
  ): ProblemVisualSection => line(
    label,
    Array.from({ length: end - start + 1 }, (_, index) => `${start + index}`),
    [],
    'Only the source whole-number marks are printed; construct the fractional intervals.'
  );
  const cards = (
    label: string,
    entries: Array<{ label: string; sections: ProblemVisualSection[] }>
  ): ProblemVisualSection => ({
    kind: 'card-grid',
    label,
    cards: entries
  });
  const strip = (
    label: string,
    numerator: number,
    denominator: number,
    wholeLabel = 'same-size whole'
  ): ProblemVisualSection => ({
    kind: 'fraction-strip',
    label,
    wholeLabel,
    numerator,
    denominator,
    unitLabel: `1/${denominator}`,
    caption: `${numerator}/${denominator}`
  });
  const bond = (
    label: string,
    denominator: number,
    complete: boolean
  ): ProblemVisualSection => ({
    kind: 'number-bond',
    label,
    whole: '1 whole',
    parts: Array.from(
      { length: denominator },
      () => ({ label: complete ? `1/${denominator}` : '____' })
    ),
    caption: complete
      ? `${denominator} copies of 1/${denominator} make 1 whole.`
      : `Complete ${denominator} equal fractional parts.`
  });

  if (lessonNumber === 21) {
    const p1Lines = (complete: boolean): ProblemVisualSection[] => [
      line(
        'Halves aligned with fourths from 0 to 2',
        complete
          ? ['0/2 = 0', '1/4', '1/2 = 2/4', '3/4', '2/2 = 4/4 = 1', '5/4', '3/2 = 6/4', '7/4', '4/2 = 8/4 = 2']
          : ['____; 0/4', '____', '1/2; ____', '3/4', '2/2 = 1; ____', '5/4', '____; ____', '7/4', '4/2 = 2; ____'],
        [],
        'Halves and fourths share the same 0-to-2 line and aligned points.'
      ),
      line(
        'Halves aligned with sixths from 0 to 2',
        complete
          ? ['0/2 = 0/6 = 0', '1/6', '2/6', '1/2 = 3/6', '4/6', '5/6', '2/2 = 6/6 = 1', '7/6', '8/6', '3/2 = 9/6', '10/6', '11/6', '4/2 = 12/6 = 2']
          : ['____; 0/6', '____', '', '1/2; ____', '', '', '____; ____', '', '', '____; ____', '', '', '4/2 = 2; ____'],
        [],
        'Halves and sixths share the same 0-to-2 line and aligned points.'
      )
    ];
    if (number === 1) {
      const missingLabels = equations(
        [
          'Halves/fourths missing labels: ____  ____  ____  ____  ____  ____  ____',
          'Halves/sixths missing labels: ____  ____  ____  ____  ____  ____  ____  ____'
        ],
        [
          'Halves: 0/2, 1/2, 2/2, 3/2, 4/2. Fourths: 0/4, 1/4, 2/4, 3/4, 4/4, 5/4, 6/4, 7/4, 8/4.',
          'Halves: 0/2, 1/2, 2/2, 3/2, 4/2. Sixths: 0/6, 1/6, 2/6, 3/6, 4/6, 5/6, 6/6, 7/6, 8/6, 9/6, 10/6, 11/6, 12/6.'
        ]
      );
      if (!solved && missingLabels.kind === 'equations') {
        missingLabels.lineAnswers = [
          ['0/2', '1/4', '2/4', '4/4', '3/2', '6/4', '8/4'],
          ['0/2', '1/6', '3/6', '2/2', '6/6', '3/2', '9/6', '12/6']
        ];
      }
      return [
        ...p1Lines(solved),
        missingLabels
      ];
    }
    if (number === 2) {
      const colorGroups = equations(
        [
          'Blue, equal to 1/2: ____',
          'Yellow, equal to 1: ____',
          'Green, equal to 3/2: ____',
          'Red, equal to 2: ____'
        ],
        [
          'Blue: 1/2 = 2/4 and 1/2 = 3/6.',
          'Yellow: 2/2 = 4/4 and 2/2 = 6/6.',
          'Green: 3/2 = 6/4 and 3/2 = 9/6.',
          'Red: 4/2 = 8/4 and 4/2 = 12/6.'
        ],
        solved ? 'Teacher Edition color groups' : 'Official color directions'
      );
      if (!solved && colorGroups.kind === 'equations') {
        colorGroups.lineAnswers = [
          ['2/4 and 3/6'],
          ['2/2 and 4/4 and 6/6'],
          ['6/4 and 9/6'],
          ['4/2 and 8/4 and 12/6']
        ];
      }
      return [
        ...p1Lines(true),
        colorGroups
      ];
    }
    if (number === 3) {
      return [equations(
        [
          '2/4 = ____/6',
          '6/6 = ____/2 = ____/4',
          '3/2 = ____/6 = ____/4'
        ],
        [
          '2/4 = 3/6',
          '6/6 = 2/2 = 4/4',
          '3/2 = 9/6 = 6/4'
        ]
      )];
    }
    if (number === 4) {
      return solved
        ? [
            completeLine(0, 1, 8, 'Jack and Jill rain-gauge readings', [4]),
            equations([], ['Jack: 2/4 inch = Jill: 4/8 inch.']),
            response(['Jill’s gauge reads 4/8 inch because 2/4 and 4/8 name the same point.'], 5)
          ]
        : [response([], 16, 'Open rain-gauge number-line and explanation workspace')];
    }
    return solved
      ? [
          completeLine(0, 1, 8, 'Three equivalent half-inch readings', [4]),
          equations([], ['Rosco: 1/2 inch = Jack: 2/4 inch = Jill: 4/8 inch.']),
          response(['Yes. Rosco is right because 1/2 = 2/4 = 4/8. Explanations will vary.'], 6)
        ]
      : [response([], 16, 'Open equivalent-rainfall number-line and explanation workspace')];
  }

  if (lessonNumber === 22) {
    if (number === 1) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-260.png',
          'Official eight shaded mathematical figures',
          'Teacher Edition Lesson 22 eight shaded figures arranged in four source rows',
          { x: 320, y: 365, width: 630, height: 1050 },
          'Only the eight mathematical figures are retained; fraction labels and matching are live.'
        ),
        equations(
          Array.from({ length: 8 }, (_, index) => `${String.fromCharCode(97 + index)}. ____`),
          [
            'a. 1/2', 'b. 2/3', 'c. 4/6', 'd. 1/3',
            'e. 3/4', 'f. 2/4', 'g. 3/9', 'h. 6/8',
            'Matches: a–f, b–c, d–g, and e–h.'
          ],
          solved ? 'Teacher Edition labels and equivalent matches' : 'Eight fraction labels and matching work'
        )
      ];
    }
    if (number === 2) {
      return [
        sourceCrop(
          '/source-pages/m5-teacher/page-261.png',
          'Official three equivalent-fraction model pairs',
          'Teacher Edition thirds-sixths, fourths-eighths, and eighths-sixteenths model pairs',
          { x: 190, y: 270, width: 835, height: 210 },
          'Only the three paired mathematical models are retained; missing numbers are live.'
        ),
        equations(
          ['1/3 = ____/6', '____/8 = 1/4', '4/8 = 8/____'],
          ['1/3 = 2/6', '2/8 = 1/4', '4/8 = 8/16']
        )
      ];
    }
    if (number === 3) {
      return solved
        ? [
            cards('One valid visual explanation', [
              { label: '2 copies of 1/8', sections: [strip('2/8', 2, 8)] },
              { label: '1 copy of 1/4', sections: [strip('1/4', 1, 4)] }
            ]),
            response(['Two eighths cover the same amount as one fourth because each fourth is the size of two eighths. Explanations will vary.'], 6)
          ]
        : [response([], 16, 'Open words-and-pictures explanation workspace')];
    }
    if (number === 4) {
      return solved
        ? [
            cards('One valid visual explanation', [
              { label: '2 copies of 1/6', sections: [strip('2/6', 2, 6)] },
              { label: '1 copy of 1/3', sections: [strip('1/3', 1, 3)] }
            ]),
            response(['It takes 2 sixths. Two sixths cover the same amount as one third; explanations will vary.'], 6)
          ]
        : [response([], 16, 'Open words-and-pictures explanation workspace')];
    }
    return solved
      ? [
          cards('One valid multi-whole visual explanation', [
            { label: '10 sixths', sections: [strip('First 6/6', 6, 6), strip('Remaining 4/6', 4, 6)] },
            { label: '5 thirds', sections: [strip('First 3/3', 3, 3), strip('Remaining 2/3', 2, 3)] }
          ]),
          response(['Ten copies of 1/6 and five copies of 1/3 cover the same amount because 2 sixths equal 1 third, so 10/6 = 5/3. Explanations will vary.'], 7)
        ]
      : [response([], 16, 'Open words-and-pictures explanation workspace')];
  }

  if (lessonNumber === 23) {
    if (number === 1) {
      const fourthsEntry = equations(
        ['Divide and label the line in fourths above it: ____'],
        ['0/4 through 12/4, labeled in red pencil.']
      );
      if (!solved && fourthsEntry.kind === 'equations') {
        fourthsEntry.lineAnswers = [['0/4 through 12/4']];
      }
      return [
        solved
          ? completeLine(0, 3, 4, 'Fourths from 0 to 3')
          : endpointLine(0, 3, 'Source whole-mark line from 0 to 3'),
        fourthsEntry
      ];
    }
    if (number === 2) {
      const eighthsEntry = equations(
        ['Divide and label the line in eighths below it: ____'],
        ['0/8 through 24/8, labeled in blue pencil.']
      );
      if (!solved && eighthsEntry.kind === 'equations') {
        eighthsEntry.lineAnswers = [['0/8 through 24/8']];
      }
      return [
        solved
          ? segmentedCompleteLines(0, 3, 8, 'Eighths from 0 to 3, shown as three contiguous whole intervals')
          : endpointLine(0, 3, 'Source whole-mark line from 0 to 3'),
        eighthsEntry
      ];
    }
    if (number === 3) {
      const solvedPairs = Array.from({ length: 13 }, (_, index) => `${index}/4 = ${index * 2}/8`);
      return [
        solved
          ? segmentedCompleteLines(0, 3, 8, 'Aligned fourths and eighths reference, shown as three contiguous whole intervals')
          : endpointLine(0, 3, 'Reference whole-mark line from 0 to 3'),
        equations(
          Array.from({ length: 13 }, (_, index) => `${String.fromCharCode(97 + index)}. ____ = ____`),
          solvedPairs
        )
      ];
    }
    if (number === 4) {
      return solved
        ? [
            completeLine(3, 4, 8, 'Part of the line containing 7/2', [28]),
            equations([], ['7/2 = 14/4 = 28/8']),
            response(['The three fractions name the same point at 3 1/2.'], 4)
          ]
        : [response([], 18, 'Open number-line construction workspace')];
    }
    if (number === 5) {
      const dotSpecs = [
        { label: 'a. dot between 0 and 1', ticks: ['0', '', '', '', '', '', '1'], target: 2 },
        { label: 'b. dot between 0 and 1', ticks: ['0', '', '', '', '1'], target: 2 },
        { label: 'c. dot between 1 and 2', ticks: ['1', '', '', '', '2'], target: 1 },
        { label: 'd. dot at 2', ticks: ['1', '', '', '', '', '2'], target: 5 }
      ];
      return [
        cards('Four official plotted-point topologies', dotSpecs.map((spec) => ({
          label: spec.label,
          sections: [line(spec.label, spec.ticks, [spec.target], 'The plotted dot is source-given; write two valid fraction names.')]
        }))),
        equations(
          ['a. ____ = ____', 'b. ____ = ____', 'c. ____ = ____', 'd. ____ = ____'],
          ['a. 1/3 = 2/6', 'b. 2/4 = 1/2 (or 4/8)', 'c. 5/4 = 10/8', 'd. 10/5 = 2/1'],
          solved ? 'Teacher Edition valid answer examples' : 'Two fraction names for each source-given dot'
        )
      ];
    }
    return solved
      ? [
          cards('One valid number-line explanation', [
            { label: 'Cameron', sections: [completeLine(0, 1, 3, 'Cameron rests at 2/3', [2])] },
            { label: 'Terrance', sections: [completeLine(0, 1, 6, 'Terrance rests at 2/6', [2])] }
          ]),
          response(['No. Cameron rests after 2/3 of the race, while Terrance rests after 2/6 = 1/3. Since 2/3 > 2/6, they do not rest at the same point.'], 7)
        ]
      : [response([], 16, 'Open number-line and written explanation workspace')];
  }

  if (lessonNumber === 24) {
    if (number === 1) {
      const denominators = [2, 3, 4, 5];
      return [
        cards(
          solved ? 'Completed number bonds and number lines' : 'Source-exact bond and endpoint-line structures',
          denominators.map((denominator) => {
            const provided = denominator === 2;
            return {
              label: DENOMINATOR_LABELS[denominator],
              sections: [
                bond(`${DENOMINATOR_LABELS[denominator]} number bond`, denominator, solved || provided),
                solved || provided
                  ? completeLine(0, 1, denominator, `${DENOMINATOR_LABELS[denominator]} from 0 to 1`)
                  : line(
                      `${DENOMINATOR_LABELS[denominator]} endpoint line`,
                      ['0', '1'],
                      [],
                      `Partition into ${DENOMINATOR_LABELS[denominator]} and label 0/${denominator} through ${denominator}/${denominator}.`
                    )
              ]
            };
          })
        )
      ];
    }
    if (number === 2) {
      const equivalentOnes = equations(
        ['2/2 = ____ = ____ = ____'],
        ['2/2 = 3/3 = 4/4 = 5/5 = 1']
      );
      if (!solved && equivalentOnes.kind === 'equations') {
        equivalentOnes.lineAnswers = [['3/3', '4/4', '5/5']];
      }
      return [equivalentOnes];
    }
    if (number === 3) {
      return [response(
        ['In every fraction equivalent to 1, the numerator equals the denominator. Answers will vary.'],
        10
      )];
    }
    return solved
      ? [
          cards('Same-size whole pizzas', [
            { label: 'Taylor', sections: [strip('Taylor ate 4/4', 4, 4, 'one small pizza')] },
            { label: 'Brother', sections: [strip('Brother ate 3/3', 3, 3, 'one same-size small pizza')] }
          ]),
          response(['No. Taylor’s little brother should not be mad. Taylor ate 4/4 and his brother ate 3/3; both fractions equal 1 whole same-size pizza. Explanations will vary.'], 9)
        ]
      : [response([], 18, 'Open words-pictures-or-number-line explanation workspace')];
  }

  if (lessonNumber === 25) {
    if (number === 1) {
      const rows = [
        {
          label: 'Three-unit models',
          crop: { x: 120, y: 310, width: 1025, height: 225 },
          blank: ['Provided: 3/3', 'Two grouped wholes: ____', 'Three grouped wholes: ____'],
          answer: ['Provided: 3/3', 'Two grouped wholes: 3/2', 'Three grouped wholes: 3/1']
        },
        {
          label: 'Four-unit models',
          crop: { x: 185, y: 730, width: 955, height: 205 },
          blank: ['One whole partitioned into fourths: ____', 'Two grouped wholes: ____', 'Four grouped wholes: ____'],
          answer: ['One whole partitioned into fourths: 4/4', 'Two grouped wholes: 4/2', 'Four grouped wholes: 4/1']
        },
        {
          label: 'Six-unit models',
          crop: { x: 120, y: 1105, width: 1020, height: 205 },
          blank: ['One whole partitioned into sixths: ____', 'Two grouped wholes: ____', 'Six grouped wholes: ____'],
          answer: ['One whole partitioned into sixths: 6/6', 'Two grouped wholes: 6/3', 'Six grouped wholes: 6/1']
        }
      ];
      return [
        cards('Three official model rows', rows.map((row) => ({
          label: row.label,
          sections: [
            sourceCrop(
              '/source-pages/m5-teacher/page-297.png',
              row.label,
              `Teacher Edition Lesson 25 ${row.label}`,
              row.crop,
              'Only the source mathematical models and grouping braces are retained; fraction labels are live.'
            ),
            equations(row.blank, row.answer)
          ]
        })))
      ];
    }
    if (number === 2) {
      return solved
        ? [
            line('0 through 6 renamed with denominator 1', ['0/1 = 0', '1/1 = 1', '2/1 = 2', '3/1 = 3', '4/1 = 4', '5/1 = 5', '6/1 = 6']),
            line('10 through 16 renamed with denominator 1', ['10/1 = 10', '11/1 = 11', '12/1 = 12', '13/1 = 13', '14/1 = 14', '15/1 = 15', '16/1 = 16']),
            equations([], ['Missing whole-number boxes: 10, 11, and 14.', 'Missing fraction boxes: 12/1, 13/1, 15/1, and 16/1.'])
          ]
        : [
            line('Rename 0 through 6 as fractions', ['0', '1', '2', '3', '4', '5', '6']),
            {
              kind: 'equations',
              label: 'Official response blanks',
              lines: ['Above the seven points: ____  ____  ____  ____  ____  ____  ____'],
              lineAnswers: [['0/1', '1/1', '2/1', '3/1', '4/1', '5/1', '6/1']]
            },
            line('Mixed given boxes from 10 through 16', ['____', '____', '12', '13', '____', '15', '16']),
            {
              kind: 'equations',
              label: 'Official response blanks',
              lines: ['Above: 10/1, 11/1, ____, ____, 14/1, ____, ____'],
              lineAnswers: [['12/1', '13/1', '15/1', '16/1']]
            }
          ];
    }
    return solved
      ? [
          cards('One valid words-and-pictures explanation', [
            { label: '2/1', sections: [strip('2/1 means two wholes', 2, 1, 'two wholes')] },
            { label: '2/2', sections: [strip('2/2 means one whole', 2, 2, 'one whole')] }
          ]),
          response(['The fraction 2/1 means 2 wholes because each unit is one whole. The fraction 2/2 means 1 whole because two halves compose one whole. The numerators match, but the fractional units differ. Explanations will vary.'], 8)
        ]
      : [response([], 16, 'Open words-and-pictures explanation workspace')];
  }

  return undefined;
}

function m5ReviewedLessonsTwentySixThroughThirty(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec['sections'] | undefined {
  const number = Number(problem.number);
  const equations = (
    blankLines: string[],
    solvedLines: string[],
    label = solved ? 'Teacher Edition answer work' : 'Official response blanks'
  ): ProblemVisualSection => ({
    kind: 'equations',
    label,
    lines: solved ? solvedLines : blankLines
  });
  const response = (
    answers: string[],
    printedLineCount = Math.max(answers.length, 6),
    label = solved ? 'Teacher Edition answer work' : 'Official response space'
  ): ProblemVisualSection => ({
    kind: 'source-response-workspace',
    label,
    parts: [{
      prompt: problem.sourcePrompt,
      lines: solved ? answers : [],
      printedLineCount,
      openWorkspace: !solved
    }]
  });
  const line = (
    label: string,
    tickLabels: string[],
    targets: number[] = [],
    caption = 'Equal intervals preserve the Teacher Edition number-line topology.'
  ): ProblemVisualSection => ({
    kind: 'number-line',
    label,
    ticks: tickLabels.map((tickLabel, index) => ({
      label: tickLabel,
      target: targets.includes(index)
    })),
    caption
  });
  const completeLine = (
    start: number,
    end: number,
    denominator: number,
    label: string,
    targets: number[] = []
  ): ProblemVisualSection => line(
    label,
    Array.from({ length: (end - start) * denominator + 1 }, (_, index) => {
      const numerator = start * denominator + index;
      return numerator % denominator === 0
        ? `${numerator}/${denominator} = ${numerator / denominator}`
        : `${numerator}/${denominator}`;
    }),
    targets.map((numerator) => numerator - start * denominator),
    `The interval from ${start} to ${end} is partitioned into ${DENOMINATOR_LABELS[denominator]}.`
  );
  const endpointLine = (
    start: number,
    end: number,
    label: string
  ): ProblemVisualSection => line(
    label,
    Array.from({ length: end - start + 1 }, (_, index) => `${start + index}`),
    [],
    'Only source whole-number marks are printed; the fractional construction remains open.'
  );
  const cards = (
    label: string,
    entries: Array<{ label: string; sections: ProblemVisualSection[] }>
  ): ProblemVisualSection => ({
    kind: 'card-grid',
    label,
    cards: entries
  });
  const strip = (
    label: string,
    numerator: number,
    denominator: number,
    wholeLabel = 'same-size whole'
  ): ProblemVisualSection => ({
    kind: 'fraction-strip',
    label,
    wholeLabel,
    numerator,
    denominator,
    unitLabel: `1/${denominator}`,
    caption: numerator
      ? `${numerator}/${denominator}`
      : `Source strip partitioned into ${DENOMINATOR_LABELS[denominator]}; shading remains open.`
  });
  const sourceCrop = (
    label: string,
    crop: { x: number; y: number; width: number; height: number },
    alt: string
  ): ProblemVisualSection => ({
    kind: 'source-crop',
    label,
    src: '/source-pages/m5-teacher/page-347.png',
    alt,
    imageWidth: 1275,
    imageHeight: 1650,
    crop,
    caption: 'Only the mathematically meaningful source figures are retained; labels and comparison work remain live.'
  });
  const bond = (
    label: string,
    whole: string,
    parts: string[]
  ): ProblemVisualSection => ({
    kind: 'number-bond',
    label,
    whole,
    parts: parts.map((part) => ({ label: part })),
    caption: `${parts.join(' + ')} = ${whole}`
  });

  if (lessonNumber === 26) {
    if (number === 1) {
      const blankEquations = [
        '0 = ____ halves', '0 = ____/2',
        '1 = ____ halves', '1 = ____/2',
        '2 = ____ halves', '2 = 4/2',
        '2 = ____ thirds', '2 = ____/3',
        '3 = ____ thirds', '3 = ____/3',
        '4 = ____ thirds', '4 = ____/3'
      ];
      const solvedEquations = [
        '0 = 0 halves', '0 = 0/2',
        '1 = 2 halves', '1 = 2/2',
        '2 = 4 halves', '2 = 4/2',
        '2 = 6 thirds', '2 = 6/3',
        '3 = 9 thirds', '3 = 9/3',
        '4 = 12 thirds', '4 = 12/3'
      ];
      return [
        solved
          ? completeLine(0, 2, 2, 'Halves from 0 to 2')
          : endpointLine(0, 2, 'Source halves line from 0 to 2'),
        solved
          ? completeLine(2, 4, 3, 'Thirds from 2 to 4')
          : endpointLine(2, 4, 'Source thirds line from 2 to 4'),
        equations(blankEquations, solvedEquations),
        solved
          ? cards('Completed bonds using copies of 1 whole', [
              { label: '2 in halves', sections: [bond('2 = 2/2 + 2/2', '2', ['2/2', '2/2'])] },
              { label: '2 in thirds', sections: [bond('2 = 3/3 + 3/3', '2', ['3/3', '3/3'])] },
              { label: '3 in thirds', sections: [bond('3 = three copies of 3/3', '3', ['3/3', '3/3', '3/3'])] },
              { label: '4 in thirds', sections: [bond('4 = four copies of 3/3', '4', ['3/3', '3/3', '3/3', '3/3'])] }
            ])
          : response([], 14, 'Open number-bond drawing spaces for the source-circled whole numbers')
      ];
    }
    if (number === 2) {
      return [
        endpointLine(2, 4, 'Source whole-number reference line from 2 to 4'),
        {
          kind: 'data-table',
          label: solved ? 'Completed whole-number fractions' : 'Official whole-number fraction table',
          columns: ['Fractional unit', '2', '3', '4'],
          rows: solved
            ? [
                ['Halves', '4/2', '6/2', '8/2'],
                ['Thirds', '6/3', '9/3', '12/3'],
                ['Fourths', '8/4', '12/4', '16/4'],
                ['Sixths', '12/6', '18/6', '24/6']
              ]
            : [
                ['Halves', '4/2', '6/2', '8/2'],
                ['Thirds', '____', '____', '____'],
                ['Fourths', '____', '____', '____'],
                ['Sixths', '____', '____', '____']
              ]
        }
      ];
    }
    if (number === 3) {
      return solved
        ? [
            completeLine(0, 1, 4, 'One meter partitioned into fourths'),
            response(['a. The 1-meter wire lasts 4 days.', 'b. Three meters last 12 days.'], 5)
          ]
        : [response([], 18, 'Open two-part number-line and answer workspace')];
    }
    return solved
      ? [
          completeLine(0, 1, 3, 'One pound partitioned into thirds'),
          completeLine(0, 4, 3, 'Four pounds partitioned into thirds'),
          response(['a. Partition 1 pound into thirds.', 'b. After 3 days, Cindy has given her dog 1 pound.', 'c. After 6 days, she has given her dog 2 pounds.'], 7)
        ]
      : [response([], 20, 'Open three-part number-line and answer workspace')];
  }

  if (lessonNumber === 27) {
    if (number === 1) {
      return [
        cards(solved ? 'Completed paired equivalent-fraction models' : 'Four official unshaded source strips', [
          { label: 'Sixths', sections: [strip('4 sixths', solved ? 4 : 0, 6)] },
          { label: 'Thirds', sections: [strip('Equivalent thirds', solved ? 2 : 0, 3)] },
          { label: 'Halves', sections: [strip('1 half', solved ? 1 : 0, 2)] },
          { label: 'Eighths', sections: [strip('Equivalent eighths', solved ? 4 : 0, 8)] }
        ]),
        equations(
          [
            '4 sixths = ____ thirds', '4/6 = ____/3',
            'Fewer equal parts make each part ____', 'Larger parts mean ____ equal parts',
            '1 half = ____ eighths', '1/2 = ____/8',
            'More equal parts make each part ____', 'Smaller parts mean ____ equal parts'
          ],
          [
            '4 sixths = 2 thirds', '4/6 = 2/3',
            'Fewer equal parts make each part bigger', 'Larger parts mean fewer equal parts',
            '1 half = 4 eighths', '1/2 = 4/8',
            'More equal parts make each part smaller', 'Smaller parts mean more equal parts'
          ]
        )
      ];
    }
    if (number === 2) {
      return solved
        ? [
            cards('Three bars shared equally among six friends', [
              { label: 'Bar cut in halves', sections: [strip('2/2 whole', 2, 2)] },
              { label: 'Bar cut in fourths', sections: [strip('4/4 whole', 4, 4)] },
              { label: 'Bar cut in sixths', sections: [strip('6/6 whole', 6, 6)] },
              { label: 'One equal share', sections: [strip('1/2 = 2/4 = 3/6', 1, 2)] }
            ]),
            response(['Give one half-bar piece, two fourth-bar pieces, or three sixth-bar pieces to each friend. Each friend receives 1/2 of a bar because 1/2 = 2/4 = 3/6.'], 7)
          ]
        : [
            cards('Three source-given unpartitioned chocolate bars', [
              { label: 'First bar', sections: [strip('Undivided rectangle', 0, 1)] },
              { label: 'Second bar', sections: [strip('Undivided rectangle', 0, 1)] },
              { label: 'Third bar', sections: [strip('Undivided rectangle', 0, 1)] }
            ]),
            response([], 14, 'Open bar-partition and equal-sharing workspace')
          ];
    }
    if (number === 3) {
      return solved
        ? [
            cards('One valid same-whole model', [
              { label: 'Six copies of 1/8', sections: [strip('6/8', 6, 8)] },
              { label: 'Three copies of 1/4', sections: [strip('3/4', 3, 4)] }
            ]),
            response(['Six copies of 1/8 and three copies of 1/4 cover the same amount because each fourth equals two eighths, so 6/8 = 3/4. Explanations will vary.'], 7)
          ]
        : [response([], 18, 'Open model-and-explanation workspace')];
    }
    if (number === 4) {
      return solved
        ? [
            cards('One valid same-whole model', [
              { label: 'Two sixths', sections: [strip('2/6', 2, 6)] },
              { label: 'One third', sections: [strip('1/3', 1, 3)] }
            ]),
            response(['It takes 2 sixths to equal 1 third. Drawn models may vary.'], 6)
          ]
        : [response([], 18, 'Open model-and-explanation workspace')];
    }
    return solved
      ? [
          cards('One valid doubled-parts model', [
            { label: 'Original fourths', sections: [strip('4/4', 4, 4), strip('One original fourth', 1, 4)] },
            { label: 'After doubling every part', sections: [strip('8/8', 8, 8), strip('Same amount as 2/8', 2, 8)] }
          ]),
          response(['Doubling each of the 4 equal parts makes 8 equal parts while preserving the whole. Each fourth becomes 2 eighths, so 1/4 = 2/8 and 4/4 = 8/8. Explanations and drawings will vary.'], 8)
        ]
      : [response([], 20, 'Open magic-wand rectangle, words, and numbers workspace')];
  }

  if (lessonNumber === 28) {
    const comparisonModels: Record<number, Array<[string, number, number]>> = {
      1: [['2 fifths', 2, 5], ['2 thirds', 2, 3]],
      2: [['2 tenths', 2, 10], ['2 eighths', 2, 8]],
      3: [['3 fourths', 3, 4], ['3 eighths', 3, 8]],
      4: [['4 eighths', 4, 8], ['4 sixths', 4, 6]],
      5: [['3 thirds', 3, 3], ['3 sixths', 3, 6]]
    };
    if (number <= 5) {
      const models = comparisonModels[number];
      const solvedComparisons = ['2/5 < 2/3; circle 2 thirds.', '2/10 < 2/8; circle 2 eighths.', '3/4 > 3/8; circle 3 fourths.', '4/8 < 4/6; circle 4 sixths.', '3/3 > 3/6; circle 3 thirds.'];
      return [
        cards(solved ? 'Completed source comparison strips' : 'Official unshaded source comparison strips', models.map(([label, numerator, denominator]) => ({
          label,
          sections: [strip(label, solved ? numerator : 0, denominator)]
        }))),
        ...(solved ? [equations([], [solvedComparisons[number - 1]], 'Teacher Edition comparison and circled fraction')] : [])
      ];
    }
    if (number === 6) {
      return solved
        ? [
            cards('One valid same-bottle picture', [
              { label: 'Leslie drank 3/4', sections: [strip('Leslie', 3, 4, 'one half-liter bottle')] },
              { label: 'Kelly drank 3/5', sections: [strip('Kelly', 3, 5, 'one same-size half-liter bottle')] }
            ]),
            response(['Kelly drinks the least because 3/5 < 3/4. Drawings may vary.'], 6)
          ]
        : [response([], 18, 'Open picture-and-answer workspace')];
    }
    if (number === 7) {
      return solved
        ? [
            cards('One valid matching-bank picture', [
              { label: 'Becky filled 2/3', sections: [strip('Becky', 2, 3, 'one piggy bank')] },
              { label: 'Malory filled 2/4', sections: [strip('Malory', 2, 4, 'one matching piggy bank')] }
            ]),
            response(['Becky’s piggy bank has more pennies because 2/3 > 2/4. Drawings may vary.'], 6)
          ]
        : [response([], 18, 'Open picture-and-answer workspace')];
    }
    return solved
      ? [
          cards('One valid same-foot height picture', [
            { label: 'Doll A', sections: [strip('Doll A is 2/4 foot', 2, 4, 'one foot')] },
            { label: 'Doll B', sections: [strip('Doll B is 2/6 foot', 2, 6, 'one foot')] },
            { label: 'Doll C', sections: [strip('Doll C is 2/3 foot', 2, 3, 'one foot')] }
          ]),
          response(['Shortest to tallest: Doll B, Doll A, Doll C because 2/6 < 2/4 < 2/3. Drawings may vary.'], 7)
        ]
      : [response([], 20, 'Open three-doll comparison picture-and-answer workspace')];
  }

  if (lessonNumber === 29) {
    if (number === 1) {
      return [
        cards(solved ? 'Teacher Edition completed first example' : 'Source-provided completed first example', [
          { label: '2 sixths', sections: [strip('2/6', 2, 6)] },
          { label: '2 thirds', sections: [strip('2/3', 2, 3)] }
        ]),
        equations(['2/6 < 2/3'], ['2/6 < 2/3'], 'Source-provided label and comparison')
      ];
    }
    const officialFigures: Record<number, {
      crop: { x: number; y: number; width: number; height: number };
      alt: string;
      blank: string;
      answer: string;
    }> = {
      2: {
        crop: { x: 770, y: 330, width: 355, height: 160 },
        alt: 'Official shaded fourths and eighths circles',
        blank: '3/4 ____ 3/8',
        answer: '3/4 > 3/8'
      },
      3: {
        crop: { x: 185, y: 655, width: 345, height: 165 },
        alt: 'Official shaded fourths and halves diamond figures',
        blank: '1/4 ____ 1/2',
        answer: '1/4 < 1/2'
      },
      4: {
        crop: { x: 690, y: 690, width: 490, height: 90 },
        alt: 'Official shaded fourths and sixths rectangular arrays',
        blank: '4/4 ____ 4/6',
        answer: '4/4 > 4/6'
      }
    };
    if (number >= 2 && number <= 4) {
      const spec = officialFigures[number];
      return [
        sourceCrop('Official shaded source figures', spec.crop, spec.alt),
        equations([spec.blank], [spec.answer])
      ];
    }
    if (number === 5) {
      return [
        solved ? completeLine(0, 1, 2, 'Halves reference line') : endpointLine(0, 1, 'Source halves line'),
        solved ? completeLine(0, 1, 4, 'Fourths reference line') : endpointLine(0, 1, 'Source fourths line'),
        solved ? completeLine(0, 1, 8, 'Eighths reference line') : endpointLine(0, 1, 'Source eighths line'),
        equations(
          ['a. 3/8 ____ 3/4', 'b. 4/4 ____ 4/8', 'c. 2/4 ____ 2/8'],
          ['a. 3/8 < 3/4', 'b. 4/4 > 4/8', 'c. 2/4 > 2/8']
        )
      ];
    }
    if (number === 6 || number === 7) {
      const values = number === 6
        ? { left: ['3/10', 3, 10] as [string, number, number], right: ['3/5', 3, 5] as [string, number, number], answer: '3/10 < 3/5' }
        : { left: ['2/6', 2, 6] as [string, number, number], right: ['2/8', 2, 8] as [string, number, number], answer: '2/6 > 2/8' };
      return solved
        ? [
            cards('One valid student-drawn same-whole model', [
              { label: values.left[0], sections: [strip(values.left[0], values.left[1], values.left[2])] },
              { label: values.right[0], sections: [strip(values.right[0], values.right[1], values.right[2])] }
            ]),
            equations([], [values.answer])
          ]
        : [response([], 18, 'Open own-model and comparison workspace')];
    }
    if (number === 8) {
      return [
        cards(solved ? 'Completed kilometer tape models' : 'Two official unshaded kilometer tape models', [
          { label: 'John: thirds', sections: [strip('John ran 2/3 km', solved ? 2 : 0, 3, '1 kilometer')] },
          { label: 'Nicholas: fifths', sections: [strip('Nicholas ran 2/5 km', solved ? 2 : 0, 5, '1 kilometer')] }
        ]),
        response(solved ? ['Nicholas ran the shorter distance because 2/5 < 2/3. Drawings may vary.'] : [], solved ? 6 : 12, solved ? 'Teacher Edition conclusion' : 'Open answer and model-labeling space')
      ];
    }
    return [
      cards(solved ? 'Completed identical-stick tape models' : 'Two official unshaded identical-stick tape models', [
        { label: 'Erica: ninths', sections: [strip('Erica ate 2/9', solved ? 2 : 0, 9, 'one licorice stick')] },
        { label: 'Robbie: fifths', sections: [strip('Robbie ate 2/5', solved ? 2 : 0, 5, 'one identical licorice stick')] }
      ]),
      response(solved ? ['Robbie ate more because 2/5 > 2/9. Drawings may vary.'] : [], solved ? 6 : 12, solved ? 'Teacher Edition conclusion' : 'Open answer and model-labeling space')
    ];
  }

  return undefined;
}

function m5Lesson22FractionSection(
  problemNumber: number,
  solved: boolean
): ProblemVisualSpec['sections'][number] | undefined {
  const strip = (label: string, numerator: number, denominator: number): ProblemVisualSpec['sections'][number] => ({
    kind: 'fraction-strip',
    label,
    wholeLabel: 'same-size whole',
    numerator,
    denominator,
    unitLabel: `1/${denominator}`,
    caption: solved ? `${numerator}/${denominator}` : `Partition into ${denominator} equal parts, then shade the requested amount.`
  });
  const cardGrid = (
    label: string,
    models: Array<{ label: string; numerator: number; denominator: number }>
  ): ProblemVisualSpec['sections'][number] => ({
    kind: 'card-grid',
    label,
    cards: models.map((model) => ({
      label: model.label,
      sections: [strip(model.label, model.numerator, model.denominator)]
    }))
  });

  if (problemNumber === 1) {
    return cardGrid(solved ? 'Equivalent amounts matched' : 'Match figures with the same shaded amount', [
      { label: '1/2', numerator: 1, denominator: 2 },
      { label: '2/4', numerator: 2, denominator: 4 },
      { label: '4/6', numerator: 4, denominator: 6 },
      { label: '2/3', numerator: 2, denominator: 3 },
      { label: '3/4', numerator: 3, denominator: 4 },
      { label: '6/8', numerator: 6, denominator: 8 },
      { label: '3/9', numerator: 3, denominator: 9 },
      { label: '1/3', numerator: 1, denominator: 3 }
    ]);
  }
  if (problemNumber === 2) {
    return cardGrid(solved ? 'Completed equivalent fraction pairs' : 'Use the paired bars to fill the missing numbers', [
      { label: '1/3', numerator: 1, denominator: 3 },
      { label: '2/6', numerator: 2, denominator: 6 },
      { label: '2/8', numerator: 2, denominator: 8 },
      { label: '1/4', numerator: 1, denominator: 4 },
      { label: '4/8', numerator: 4, denominator: 8 },
      { label: '8/16', numerator: 8, denominator: 16 }
    ]);
  }
  if (problemNumber === 3) {
    return cardGrid('Two eighths cover the same amount as one fourth', [
      { label: '2 copies of 1/8', numerator: 2, denominator: 8 },
      { label: '1 copy of 1/4', numerator: 1, denominator: 4 }
    ]);
  }
  if (problemNumber === 4) {
    return cardGrid('Two sixths cover the same amount as one third', [
      { label: '2 copies of 1/6', numerator: 2, denominator: 6 },
      { label: '1 copy of 1/3', numerator: 1, denominator: 3 }
    ]);
  }
  if (problemNumber === 5) {
    return cardGrid('Ten sixths and five thirds each cover one whole plus two thirds', [
      { label: 'first 6 sixths', numerator: 6, denominator: 6 },
      { label: 'remaining 4 sixths', numerator: 4, denominator: 6 },
      { label: 'first 3 thirds', numerator: 3, denominator: 3 },
      { label: 'remaining 2 thirds', numerator: 2, denominator: 3 }
    ]);
  }
  return undefined;
}

function m5OfficialIllustrationSection(
  lessonNumber: number,
  problem: ProblemSetCenteredProblem,
  solved: boolean
): ProblemVisualSpec['sections'][number] | undefined {
  type CropSource = { src: string; imageWidth: number; imageHeight: number; crop: { x: number; y: number; width: number; height: number } };
  let source: CropSource | undefined;

  if (lessonNumber === 5 && problem.number === 1) {
    source = { src: '/source-pages/m5-student/workbook-page-017.png', imageWidth: 850, imageHeight: 1100, crop: { x: 60, y: 155, width: 700, height: 800 } };
  }

  if (lessonNumber === 8 && problem.number >= 1 && problem.number <= 4) {
    const crops: Record<number, CropSource['crop']> = {
      1: { x: 100, y: 470, width: 1050, height: 270 },
      2: { x: 100, y: 700, width: 1050, height: 300 },
      3: { x: 100, y: 950, width: 1050, height: 300 },
      4: { x: 100, y: 1180, width: 1050, height: 280 }
    };
    source = {
      src: '/source-pages/m5-teacher/page-93.png',
      imageWidth: 1275,
      imageHeight: 1650,
      crop: crops[problem.number]
    };
  }

  if (lessonNumber === 11) {
    const firstPageCrops: Record<number, CropSource['crop']> = {
      1: { x: 60, y: 290, width: 700, height: 170 },
      2: { x: 60, y: 445, width: 700, height: 180 },
      3: { x: 60, y: 610, width: 700, height: 170 },
      4: { x: 60, y: 755, width: 700, height: 190 }
    };
    const secondPageCrops: Record<number, CropSource['crop']> = {
      5: { x: 110, y: 175, width: 1040, height: 235 },
      6: { x: 110, y: 395, width: 1040, height: 225 },
      7: { x: 110, y: 600, width: 1040, height: 235 },
      8: { x: 110, y: 830, width: 1040, height: 430 }
    };
    if (firstPageCrops[problem.number]) {
      source = { src: '/source-pages/m5-student/workbook-page-041.png', imageWidth: 850, imageHeight: 1100, crop: firstPageCrops[problem.number] };
    } else if (secondPageCrops[problem.number]) {
      source = { src: '/source-pages/m5-teacher/page-130.png', imageWidth: 1275, imageHeight: 1650, crop: secondPageCrops[problem.number] };
    } else if (problem.number === 9) {
      source = { src: '/source-pages/m5-teacher/page-131.png', imageWidth: 1275, imageHeight: 1650, crop: { x: 75, y: 0, width: 1100, height: 560 } };
    } else if (problem.number === 10) {
      source = { src: '/source-pages/m5-teacher/page-131.png', imageWidth: 1275, imageHeight: 1650, crop: { x: 75, y: 545, width: 1100, height: 620 } };
    }
  }

  if (lessonNumber === 13) {
    const firstPageCrops: Record<number, CropSource['crop']> = {
      1: { x: 60, y: 205, width: 700, height: 170 },
      2: { x: 60, y: 355, width: 700, height: 180 },
      3: { x: 60, y: 520, width: 700, height: 165 },
      4: { x: 60, y: 670, width: 700, height: 140 },
      5: { x: 60, y: 795, width: 700, height: 165 }
    };
    if (firstPageCrops[problem.number]) {
      source = { src: '/source-pages/m5-student/workbook-page-052.png', imageWidth: 850, imageHeight: 1100, crop: firstPageCrops[problem.number] };
    } else if (problem.number === 6) {
      source = { src: '/source-pages/m5-teacher/page-154.png', imageWidth: 1275, imageHeight: 1650, crop: { x: 100, y: 175, width: 980, height: 820 } };
    } else if (problem.number === 7) {
      source = { src: '/source-pages/m5-teacher/page-154.png', imageWidth: 1275, imageHeight: 1650, crop: { x: 100, y: 970, width: 980, height: 430 } };
    }
  }

  if (lessonNumber === 22 && problem.number === 1) {
    source = {
      src: '/source-pages/m5-teacher/page-260.png',
      imageWidth: 1275,
      imageHeight: 1650,
      crop: { x: 110, y: 250, width: 1040, height: 1180 }
    };
  } else if (lessonNumber === 22 && problem.number === 2) {
    source = {
      src: '/source-pages/m5-teacher/page-261.png',
      imageWidth: 1275,
      imageHeight: 1650,
      crop: { x: 150, y: 170, width: 980, height: 440 }
    };
  }

  if (!source) return undefined;
  return {
    kind: 'source-crop',
    label: `Official Lesson ${lessonNumber} Problem ${problem.number} model`,
    src: source.src,
    alt: `Official Module 5 Lesson ${lessonNumber} Problem ${problem.number} fraction model`,
    imageWidth: source.imageWidth,
    imageHeight: source.imageHeight,
    crop: source.crop,
    caption: solved
      ? 'Use this official model with the Teacher Edition answer and fraction work below.'
      : 'Complete the official model without changing the designated whole, equal parts, or printed relationship.'
  };
}

function m5ConcreteFractionSections(model: ProblemSetConcreteFractionModel, solved: boolean): ProblemVisualSpec['sections'] {
  const sections: ProblemVisualSpec['sections'] = [
    {
      kind: 'data-table',
      label: model.title,
      columns: ['Official model', 'Whole', 'Fraction work'],
      rows: m5ConcreteRows(model, solved)
    }
  ];

  if (model.kind === 'measured-strip' && model.totalLength && model.pieceLength) {
    const partCount = boundedM5Count(Math.round(model.totalLength / model.pieceLength), 1, 12);
    sections.push({
      kind: 'tape',
      label: solved ? 'Solved strip model' : 'Blank strip model',
      totalLabel: `${model.totalLength} ${model.unit ?? 'units'} whole`,
      parts: Array.from({ length: partCount }, (_, index) => ({
        label: solved ? `${model.pieceLength} ${model.unit ?? 'units'}` : '?',
        emphasize: index === 0
      })),
      caption: solved ? model.notice : model.prompt
    });
  }

  if (model.items?.length) {
    const firstDrawable = model.items.find((item) => item.denominator || item.blankDenominator);
    if (firstDrawable?.denominator || firstDrawable?.blankDenominator) {
      sections.push(m5FractionTapeSection({
        label: firstDrawable.label,
        numerator: firstDrawable.numerator ?? firstDrawable.blankNumerator ?? 1,
        denominator: firstDrawable.denominator ?? firstDrawable.blankDenominator ?? 2
      }, solved));
    }
  }

  return sections;
}

function m5ConcreteRows(model: ProblemSetConcreteFractionModel, solved: boolean): string[][] {
  if (model.kind === 'measured-strip') {
    return [[
      model.prompt,
      `${model.totalLength ?? '____'} ${model.unit ?? 'units'} whole`,
      solved ? model.notice ?? 'One equal piece is named as a fraction of the whole.' : `one piece = ____ of the ${model.totalLength ?? '____'} ${model.unit ?? 'unit'} whole`
    ]];
  }

  return (model.items ?? []).map((item) => {
    const denominator = item.denominator ?? item.blankDenominator;
    const numerator = item.numerator ?? item.blankNumerator;
    const lineWork = item.lineCount !== undefined || item.blankLineCount !== undefined
      ? solved ? `${item.lineCount ?? 0} lines make ${item.denominator} equal parts` : `____ lines make ${item.denominator ?? item.blankDenominator ?? '____'} equal parts`
      : solved ? `${numerator}/${denominator}` : `____/${denominator ?? '____'}`;
    return [
      item.label,
      model.kind.replace(/-/g, ' '),
      lineWork
    ];
  });
}

function m5PaperPartitionSections(model: ProblemSetPaperPartitionModel, solved: boolean): ProblemVisualSpec['sections'] {
  return [
    {
      kind: 'data-table',
      label: model.title,
      columns: ['Step', 'Source action', 'Check'],
      rows: model.steps.map((step, index) => [
        `Step ${index + 1}`,
        step,
        solved ? 'completed with equal guide spacing' : 'verify: ____'
      ])
    },
    {
      kind: 'number-line',
      label: solved ? `${model.denominator} equal ${model.stripLabel} parts` : `${model.stripLabel} partition guide`,
      ticks: m5NumberLineTicks({
        label: model.stripLabel,
        denominator: model.denominator,
        startLabel: '0',
        endLabel: '1',
        targetNumerators: Array.from({ length: model.denominator + 1 }, (_, index) => index)
      }, solved),
      caption: solved
        ? `${model.paperSpacesPerUnit} paper spaces per unit fraction transfer to the strip.`
        : `Use ${model.paperSpacesPerUnit} paper spaces per unit fraction before marking the strip.`
    }
  ];
}

function m5NumberLineSection(model: ProblemSetNumberLineModel, solved: boolean): ProblemVisualSpec['sections'][number] {
  return {
    kind: 'number-line',
    label: solved ? `Solved ${model.label}` : `Blank ${model.label} number line`,
    ticks: m5NumberLineTicks(model, solved),
    caption: solved
      ? 'Equal intervals are labeled from 0 to the endpoint, with requested fractions marked.'
      : 'Partition the interval into equal parts and label the fraction marks.'
  };
}

function m5NumberLineTicks(model: ProblemSetNumberLineModel, solved: boolean): Array<{ label: string; target?: boolean }> {
  if (model.tickLabels?.length) {
    const lastIndex = model.tickLabels.length - 1;
    return model.tickLabels.map((label, index) => ({
      label: solved || index === 0 || index === lastIndex ? label : '____',
      target: solved && (model.targetNumerators ?? []).includes(index)
    }));
  }

  const denominator = boundedM5Count(model.denominator, 1, 12);
  return Array.from({ length: denominator + 1 }, (_, numerator) => {
    const endpoint = numerator === 0 ? model.startLabel ?? '0' : numerator === denominator ? model.endLabel ?? '1' : undefined;
    return {
      label: solved ? endpoint ?? `${numerator}/${denominator}` : endpoint ?? '____',
      target: solved && (model.targetNumerators ?? []).includes(numerator)
    };
  });
}

function m5FractionTapeSection(model: ProblemSetFractionModel, solved: boolean): ProblemVisualSpec['sections'][number] {
  const denominator = boundedM5Count(model.denominator, 1, 12);
  const numerator = boundedM5Count(model.numerator, 0, denominator * 12);
  const wholeCount = Math.max(1, Math.ceil(numerator / denominator));
  return {
    kind: 'fraction-strip',
    label: solved ? `Solved ${model.label}` : `Blank ${model.label} fraction model`,
    wholeLabel: wholeCount === 1 ? '1 whole' : `${wholeCount} equal wholes`,
    numerator,
    denominator,
    unitLabel: `1/${denominator}`,
    caption: solved
      ? `${numerator}/${denominator} is ${numerator} ${numerator === 1 ? 'unit fraction' : 'unit fractions'} of size 1/${denominator}.`
      : `Partition each same-size whole into ${denominator} equal parts before naming or shading the fraction.`
  };
}

function m5OpenFractionWorkspace(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'][number] {
  return {
    kind: 'data-table',
    label: solved ? 'Solved fraction workspace' : 'Blank fraction workspace',
    columns: ['Official prompt', 'Model work', 'Answer'],
    rows: [
      [
        problem.sourcePrompt,
        solved ? problem.equations.join('; ') || problem.solvedAnswer : problem.blankEquations?.join('; ') || '____',
        solved ? problem.solvedAnswer : '____'
      ]
    ]
  };
}

function boundedM5Count(value: number | undefined, min: number, max: number): number {
  if (value === undefined || !Number.isFinite(value)) {
    return min;
  }
  return Math.max(min, Math.min(max, Math.round(value)));
}

function m5VisualTitle(problem: ProblemSetCenteredProblem): string {
  if (problem.concreteFractionModel?.title) {
    return problem.concreteFractionModel.title;
  }
  if (problem.paperPartitionModel?.title) {
    return problem.paperPartitionModel.title;
  }
  if (problem.numberLineModels?.[0]?.label) {
    return `${problem.numberLineModels[0].label} number line`;
  }
  if (problem.fractionModels?.[0]?.label) {
    return problem.fractionModels[0].label;
  }
  return 'fraction workspace';
}

function m5ReviewedVisualTitle(
  problem: ProblemSetCenteredProblem,
  lessonNumber: number
): string | undefined {
  const number = Number(problem.number);
  const reviewedTitles: Record<number, Record<number, string>> = {
    5: {
      1: 'six-row unit-fraction chart',
      2: 'unequal eight-piece cake judgment',
      3: 'second cake shared equally by ten people',
      4: 'compare one tenth and one eighth of same-size cakes'
    },
    6: {
      1: 'partition and shade four fraction strips',
      2: 'soda as eighths of one whole',
      3: 'five-figure fraction chart'
    },
    7: {
      9: 'unit fractions that make one whole',
      10: 'shaded and unshaded parts of three strips',
      11: 'fraction of a book not read'
    },
    8: {
      5: 'four shaded figures and number bonds',
      6: 'ground-beef number bond and visual model'
    },
    9: {
      1: 'greater-than-one figure chart',
      2: 'fractions greater than one on strips',
      3: 'two brownie pans and a number bond'
    },
    10: {
      1: 'five equal-length unit-fraction strips',
      2: 'eight unit-fraction comparisons',
      3: 'one third cup of oil and one fourth cup of water',
      4: 'six fraction comparisons and an order chain',
      5: 'one sixth and one fifth counterexample'
    },
    11: {
      8: 'two open fraction comparisons and matching models',
      9: 'one half of a small pizza and one fourth of a large pizza',
      10: 'one half of two different-sized candy wholes'
    },
    12: {
      1: 'yellow-strip station constructions',
      2: 'brown-strip station constructions',
      3: 'orange-square station constructions',
      4: 'yarn station constructions',
      5: 'water station constructions',
      6: 'clay station constructions'
    },
    13: {
      6: 'Rope A, Rope B, and Rope C designated wholes',
      7: 'one shaded amount named with two designated wholes'
    },
    14: {
      1: 'number bonds, fraction strips, and number lines',
      2: 'quarter-hour puppy schedule number line',
      3: 'fifths-of-a-meter bead number line'
    },
    15: {
      1: 'five estimated fraction locations and matching number bonds',
      2: 'eighths measured with a fraction strip',
      3: 'five equally spaced knots forming four rope intervals'
    },
    16: {
      1: 'five extended fraction number lines',
      2: 'fifths from 0 to 2',
      3: 'thirds from 1 to 4',
      4: 'construct fourths from 0 to 3'
    },
    17: {
      1: 'locate fractions in sixths from 0 to 3',
      2: 'locate fractions in fourths from 1 to 4',
      3: 'locate fractions in thirds from 2 to 6',
      4: 'compare 2 inches and 7/4 inches',
      5: 'mark four points on Marcy’s run'
    },
    18: {
      1: 'provided fourths comparison',
      2: 'compare 2/6 and 3/6',
      3: 'compare 1/2 and 1/4',
      4: 'compare 2/3 and 2/6',
      5: 'compare 11/8 and 7/4',
      6: 'compare JoAnn’s and Lupe’s walks',
      7: 'compare the blue and red threads',
      8: 'order three spaghetti lengths'
    },
    19: {
      1: 'place fractions on halves, fourths, and eighths lines',
      2: 'nine comparisons from the reference lines',
      3: 'explain a greater-than comparison',
      4: 'explain a less-than comparison',
      5: 'prove an equal comparison in two ways'
    },
    20: {
      1: 'label and match three rows of shaded figures',
      2: 'name and represent 1/4 and 1/7',
      3: 'rearrange squares and triangles',
      4: 'compare liquid in two one-liter beakers'
    },
    21: {
      1: 'label aligned halves, fourths, and sixths',
      2: 'color four groups of equivalent points',
      3: 'complete three equivalent-fraction sentences',
      4: 'find Jill’s equivalent rain-gauge reading',
      5: 'evaluate Rosco’s half-inch claim'
    },
    22: {
      1: 'label and match eight shaded figures',
      2: 'complete three model-supported equivalent fractions',
      3: 'explain why 2/8 equals 1/4',
      4: 'find how many sixths equal 1/3',
      5: 'explain why 10/6 equals 5/3'
    },
    23: {
      1: 'partition the shared line into fourths',
      2: 'partition the shared line into eighths',
      3: 'list aligned fourths and eighths',
      4: 'show fractions equivalent to 7/2',
      5: 'name four plotted points two ways',
      6: 'compare Cameron’s and Terrance’s race stops'
    },
    24: {
      1: 'four number bonds and whole-interval lines',
      2: 'write four fractions equivalent to 1',
      3: 'describe the numerator-denominator pattern for 1',
      4: 'compare 4/4 and 3/3 pizzas'
    },
    25: {
      1: 'label nine grouped whole-number fraction models',
      2: 'rename whole numbers with denominator 1',
      3: 'explain the difference between 2/1 and 2/2'
    },
    26: {
      1: 'partition halves and thirds and draw whole-number bonds',
      2: 'name 2, 3, and 4 in four fractional units',
      3: 'one-fourth-meter wire use',
      4: 'one-third-pound daily dog food'
    },
    27: {
      1: 'model two equivalent-fraction pairs',
      2: 'share three differently partitioned bars among six friends',
      3: 'explain why 6/8 equals 3/4',
      4: 'find how many sixths equal 1/3',
      5: 'double fourths into eighths'
    },
    28: {
      1: 'shade and compare 2 fifths and 2 thirds',
      2: 'shade and compare 2 tenths and 2 eighths',
      3: 'shade and compare 3 fourths and 3 eighths',
      4: 'shade and compare 4 eighths and 4 sixths',
      5: 'shade and compare 3 thirds and 3 sixths',
      6: 'compare Leslie’s and Kelly’s water',
      7: 'compare Becky’s and Malory’s piggy banks',
      8: 'order three fractional doll heights'
    },
    29: {
      1: 'source-provided 2/6 and 2/3 example',
      2: 'compare the official 3/4 and 3/8 circles',
      3: 'compare the official 1/4 and 1/2 diamonds',
      4: 'compare the official 4/4 and 4/6 arrays',
      5: 'compare three pairs using halves, fourths, and eighths lines',
      6: 'draw a model to compare 3/10 and 3/5',
      7: 'draw a model to compare 2/6 and 2/8',
      8: 'compare John’s and Nicholas’s runs',
      9: 'compare Erica’s and Robbie’s licorice amounts'
    }
  };
  if (lessonNumber === 7 && number >= 1 && number <= 8) {
    return 'shaded and unshaded fractions in the source shape';
  }
  if (lessonNumber === 8 && number >= 1 && number <= 4) {
    return 'source figure, shaded parts, and unshaded parts';
  }
  if (lessonNumber === 11 && number >= 1 && number <= 7) {
    return 'same-whole unit-fraction comparison';
  }
  if (lessonNumber === 13 && number >= 1 && number <= 5) {
    return 'one unit fraction with a redesigned whole';
  }
  return reviewedTitles[lessonNumber]?.[number];
}

function m5LessonConceptCopy(lessonNumber: number, objective: string): Pick<ProblemSetCenteredLesson, 'concept' | 'contrast' | 'summary'> {
  if (lessonNumber <= 2) {
    return {
      concept: `Use the Lesson ${lessonNumber} fraction-strip and concrete-whole work to make equal parts before naming any fraction.`,
      contrast: 'First name the whole strip, beaker amount, paper, or object; then check that the parts are equal.',
      summary: 'Fractions in this lesson come from a fixed whole that is partitioned into equal parts.'
    };
  }
  if (lessonNumber <= 9) {
    return {
      concept: `Use the Lesson ${lessonNumber} area models to partition whole shapes, shade or count unit fractions, and name the fractional amount.`,
      contrast: 'The whole shape must be visible, and equal areas must be shown before the fraction is named.',
      summary: 'Pictorial area models prove how many equal parts make the whole and how many are selected.'
    };
  }
  if (lessonNumber <= 13) {
    return {
      concept: `Use the Lesson ${lessonNumber} models to specify the whole and compare unit fractions within that same whole.`,
      contrast: 'Keep the whole fixed; changing the whole changes the meaning of the unit fraction.',
      summary: 'Unit fractions are only comparable when the whole and the equal-part structure are clear.'
    };
  }
  if (lessonNumber <= 15) {
    return {
      concept: `Use the Lesson ${lessonNumber} number-line work to partition the 0-to-1 interval and place fractions by counting equal intervals from 0.`,
      contrast: 'Count intervals, not tick marks, and label 0 and 1 before placing the fraction.',
      summary: 'Fractions on the number line are distances from 0 across one unit interval.'
    };
  }
  if (lessonNumber <= 17) {
    return {
      concept: `Use the Lesson ${lessonNumber} extended number-line work to place whole-number fractions and fractions between whole numbers.`,
      contrast: 'Repeat the same fractional unit across each whole interval before placing fractions greater than 1.',
      summary: 'Fractions beyond 1 are located by counting equal units across multiple whole intervals.'
    };
  }
  if (lessonNumber <= 19) {
    return {
      concept: `Use the Lesson ${lessonNumber} number-line comparison work to compare positions by distance from 0.`,
      contrast: 'Place both values on the same number line before writing <, >, or =.',
      summary: 'The fraction farther to the right on the same number line is greater.'
    };
  }
  if (lessonNumber <= 27) {
    return {
      concept: `Use the Lesson ${lessonNumber} equivalence models to show the same amount with different fractional units.`,
      contrast: 'Equivalent fractions must use the same whole and line up at the same amount or point.',
      summary: 'Different fraction names can describe the same amount when the unit is changed consistently.'
    };
  }
  return {
    concept: `Use the Lesson ${lessonNumber} comparison model to prove the relationship in the Problem Set.`,
    contrast: 'Use the same whole or same number line before comparing fraction sizes.',
    summary: objective
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
  const objective = M5_TEACHER_OBJECTIVES[lessonNumber];
  const sourceProblems = M5_PROBLEM_LIST_OVERRIDES[lessonNumber] ?? (M5_WORKBOOK_PROBLEMS[lessonNumber]?.length
    ? M5_WORKBOOK_PROBLEMS[lessonNumber]
    : (source?.problems ?? []));
  const sourcePageImages = teacherEditionLessonPages(source?.teacherEditionSource ?? '');
  const answerKeyImages = M5_ANSWER_KEY_SOURCE_PAGES[lessonNumber] ?? [];
  const conceptCopy = m5LessonConceptCopy(lessonNumber, objective);
  const problems = (sourceProblems.length ? sourceProblems : [
    {
      number: 1,
      prompt: source?.teacherEditionReference ?? objective,
      equations: []
    }
  ]).map((problem) => {
    const centeredProblem = makeProblem(lessonNumber, problem);
    const exactTaskPageImages = sourceTaskPageImages(lessonNumber, centeredProblem.number);
    return {
      ...centeredProblem,
      sourcePageImages: exactTaskPageImages,
      blankSourcePageImages: exactTaskPageImages,
      solvedSourcePageImages: [...exactTaskPageImages, ...answerKeyImages],
      ...createM5VisualPair(centeredProblem, lessonNumber)
    };
  });
  return {
    title: `Lesson ${lessonNumber}: ${objective}`,
    concept: conceptCopy.concept,
    teacherEditionBasis: m5TeacherSource(lessonNumber),
    contrast: conceptCopy.contrast,
    summary: conceptCopy.summary,
    sourceNote: source?.studentWorkbookSource ?? `Module 5 student workbook, Lesson ${lessonNumber}.`,
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: [...sourcePageImages, ...answerKeyImages],
    conceptSections: m5FunctionalConceptSections(lessonNumber),
    problems
  };
}

export const M5_PROBLEM_SET_CENTERED_LESSONS: Record<number, ProblemSetCenteredLesson> = Object.fromEntries(
  Array.from({ length: 30 }, (_, index) => {
    const lessonNumber = index + 1;
    return [lessonNumber, makeLesson(lessonNumber)];
  })
) as Record<number, ProblemSetCenteredLesson>;
