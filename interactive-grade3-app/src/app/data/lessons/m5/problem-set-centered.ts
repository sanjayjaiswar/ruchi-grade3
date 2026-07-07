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
  ProblemVisualSpec
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
    1: 'Answer key shows 3/2 for the named fraction.',
    2: 'Number bond showing 2/5 and 3/5 equals 1 whole; draw the second visual model.',
    3: 'Number bond showing 4/9 and 5/9 equals 1 whole; draw the second visual model.',
    4: 'Number bond showing 2/7 and 5/7 equals 1 whole; draw the second visual model.',
    5: 'a. 3/4 and 1/4 make 1 whole; decompose 3/4 into three units of 1/4. b. 2/3 and 1/3 make 1 whole; decompose 2/3 into two units of 1/3. c. 2/4 and 2/4 make 1 whole; decompose both parts into units of 1/4. d. 2/5 and 3/5 make 1 whole; decompose into units of 1/5.',
    6: 'a. 3/4. b. 3 more hamburgers. c. Draw a number bond showing 3/4 and 1/4 equals 1 whole, decompose 3/4 into three units of 1/4, and draw the second visual model.'
  },
  9: {
    1: 'a. Answer provided. b. 1/8, 15, 15/8. c. 1/6, 14, 14/6. d. 1/5, 8, 8/5. e. 1/4, 9, 9/4. f. 1/3, 7, 7/3.',
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
    3: '1/12; answers will vary.',
    4: 'Answers will vary; 8.',
    5: 'Answers will vary; 9.',
    6: '1/10; answers will vary.',
    7: 'Answers will vary.',
    8: 'Answers will vary; 12.',
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
    1: 'Partition and label each number line; complete the number bonds to show how much is shaded and how much more makes 1 whole.',
    2: 'Draw a number line from 0 to 1, partition it into eighths, and label from 0/8 to 8/8.',
    3: 'a. 4 equal parts; label the rope from 0/4 to 4/4. b. 2/4. c. 1/5.'
  },
  16: {
    1: 'a. Answer provided. b. Partition into thirds; box 3/3 and 6/3. c. Partition into halves; box 4/2, 6/2, and 8/2. d. Partition into fourths; box 12/4, 16/4, and 20/4. e. Partition into thirds; box 18/3, 21/3, 24/3, and 27/3.',
    2: 'Partition into fifths and label the number line; box 0/5, 5/5, and 10/5.',
    3: 'Partition into thirds and label the number line; box 3/3, 6/3, 9/3, and 12/3.',
    4: 'Draw a number line with endpoints 0 and 3, label the wholes, then partition and label the fractional units.'
  },
  17: {
    1: 'Partition the number line into sixths; locate and label the given fractions.',
    2: 'Partition the number line into fourths; locate and label the given fractions.',
    3: 'Partition the number line into thirds; locate and label the given fractions.',
    4: 'Alex; a number line shows 7/4 inches is longer than 2/4 inches.',
    5: 'Draw a number line from 0 km to 4 km, partitioned into fifths; locate and label 0/5, 20/5, 7/5, and 12/5.'
  },
  18: {
    1: 'Answer provided.',
    2: 'Use the number line to compare the given fractions.',
    3: 'Partition into sixths; place 2/6 and 3/6; circle 3/6; write <.',
    4: 'Partition into halves and fourths; place 1/2 and 2/4; circle 2/4; write >.',
    5: 'Partition into eighths and fourths; place 7/8 and 7/4; circle 7/8; write <.',
    6: 'JoAnn; explanations will vary.',
    7: 'Red thread; explanations will vary.',
    8: 'Place 7/8, 7/4, and 7/2 on the number line; 7/8 < 7/4 < 7/2; explanations will vary.'
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
    1: 'Halves and sixths number lines are labeled with equivalent fractions, including 1/2 = 3/6 and 2/2 = 6/6.',
    2: 'Thirds and sixths number lines are labeled with equivalent fractions.',
    3: 'Shaded blue: 1/2 and 2/4, 1/2 and 3/6. Shaded yellow: 2/2 and 4/4, 2/2 and 6/6. Shaded red: 3/2 and 6/4, 3/2 and 9/6. Shaded green: 4/2 and 8/4, 4/2 and 12/6.',
    4: 'Complete the equivalent fractions and number line work; 1/2 = 4/8 is one of the shown relationships.',
    5: 'Yes; 1/2 = 2/4 = 4/8. Explanations will vary.'
  },
  22: {
    1: '2; 8; 16.',
    2: 'Match 1/2 to 2/4, 2/6 to 1/3, 6/4 to 12/8, and 3/9 to 1/3.',
    3: 'Explanations will vary.',
    4: '2 sixths; explanations will vary.',
    5: 'Explanations will vary.'
  },
  23: {
    1: 'Divide and label the number line into fourths in red pencil.',
    2: 'Divide and label the number line into eighths in blue pencil.',
    3: 'Equivalent labels include 0/4 = 0/8, 1/4 = 2/8, 2/4 = 4/8, 3/4 = 6/8, 4/4 = 8/8, continuing through 12/4 = 24/8.',
    4: '1/3 and 2/6; 2/4 and 1/2 or 4/8; 2/5 and 4/10; answers will vary.',
    5: '7/2 = 14/4 = 28/8; draw, divide, and label the number line to show these fractions.',
    6: 'No; explanations will vary.'
  },
  24: {
    1: 'Complete the number bonds and number lines for halves, thirds, fourths, and fifths; rename 0 and 1 as fractions in each unit.',
    2: 'Circle the fractions equal to 1: 3/3, 4/4, and 5/5.',
    3: 'Answers will vary.',
    4: 'No; explanations will vary.'
  },
  25: {
    1: 'Label the number line 0/1, 1/1, 2/1, 3/1, 4/1, 5/1, and 6/1.',
    2: 'Complete the equivalent whole-number fractions: 3/3, 4/4, 4/2, 4/1, 6/6, 6/3, and 6/1.',
    3: 'Explanations will vary.'
  },
  26: {
    1: 'Halves: complete 0, 0; 2, 2; 4 and the number bonds. Thirds: complete 6, 6; 9, 9; 12, 12 and the number bonds.',
    2: 'Halves: answer provided. Thirds: 6/3, 9/3, 12/3. Fourths: 8/4, 12/4, 16/4. Sixths: 12/6, 18/6, 24/6.',
    3: 'a. Partition a 1-meter wire into fourths; 4 pieces. b. 12 days.',
    4: 'a. Partition 1 pound of food into thirds. b. Partition 4 pounds into thirds; 1. c. 2.'
  },
  27: {
    1: '2, 2, bigger, less. 4, 4, smaller, more.',
    2: 'Explanations will vary.',
    3: '1/2 of a candy bar; 1/2 = 2/4 = 3/6.',
    4: '2 sixths; draw a model.',
    5: 'Answers will vary.'
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
    1: 'Answer provided.',
    2: '3/4 > 3/8.',
    3: '4/4 > 4/6.',
    4: '1/4 < 1/2.',
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
    { number: 1, prompt: 'Use the model to name the fraction shown.' },
    { number: 2, prompt: 'Draw a number bond with 2 parts showing the shaded and unshaded fractions. Draw the second visual model.' },
    { number: 3, prompt: 'Draw a number bond with 2 parts showing the shaded and unshaded fractions. Draw the second visual model.' },
    { number: 4, prompt: 'Draw a number bond with 2 parts showing the shaded and unshaded fractions. Draw the second visual model.' },
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
    { number: 1, prompt: 'Complete the number bond as indicated by the fractional unit. Partition the number line, label the fractions, and rename 0 and 1 as fractions of the given unit.' },
    { number: 2, prompt: 'Circle the fractions equal to 1 whole.' },
    { number: 3, prompt: 'Write equivalent fractions that name whole numbers.' },
    { number: 4, prompt: 'Explain whether the given fraction names 1 whole.' }
  ],
  28: [
    { number: 1, prompt: 'Compare 2 fifths and 2 thirds using the models. Circle the larger fraction.' },
    { number: 2, prompt: 'Compare 2 tenths and 2 eighths using the models. Circle the larger fraction.' },
    { number: 3, prompt: 'Compare 3 fourths and 3 eighths using the models. Circle the larger fraction.' },
    { number: 4, prompt: 'Compare 4 eighths and 4 sixths using the models. Circle the larger fraction.' },
    { number: 5, prompt: 'Compare 3 thirds and 3 sixths using the models. Circle the larger fraction.' },
    { number: 6, prompt: 'Leslie drinks 3 fourths of her water. Kelly drinks 3 fifths of her water. Who drinks the least amount? Draw a picture.' },
    { number: 7, prompt: 'Becky fills 2 thirds of her piggy bank. Malory fills 2 fourths. Whose piggy bank has more pennies? Draw a picture.' },
    { number: 8, prompt: 'Heidi lines up dolls in order from shortest to tallest. Use the fractional heights to order Doll A, Doll B, and Doll C.' }
  ],
  29: [
    { number: 1, prompt: 'Use the provided model to compare fractions with the same numerator.' },
    { number: 2, prompt: 'Compare 3/4 and 3/8.' },
    { number: 3, prompt: 'Compare 4/4 and 4/6.' },
    { number: 4, prompt: 'Compare 1/4 and 1/2.' },
    { number: 5, prompt: 'Partition each number line into the units labeled on the left. Then use the number lines to compare the fractions.' },
    { number: 6, prompt: 'Draw your own model to compare the fractions and write <, >, or =.' },
    { number: 7, prompt: 'Draw your own model to compare the fractions and write <, >, or =.' },
    { number: 8, prompt: 'John ran 2 thirds of a kilometer after school. Nicholas ran 2 fifths. Who ran the shorter distance? Use the model.' },
    { number: 9, prompt: 'Erica ate 2 ninths of a licorice stick. Robbie ate 2 fifths of an identical licorice stick. Who ate more? Use the model.' }
  ]
};

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
  17: {
    1: {
      numberLineModels: [{
        label: 'Sixths from 0 to 3',
        denominator: 6,
        startLabel: '0',
        endLabel: '3',
        tickLabels: ['0', '3/6', '6/6 = 1', '9/6', '12/6 = 2', '18/6 = 3'],
        targetNumerators: [0, 1, 2, 3, 4, 5]
      }]
    },
    2: {
      numberLineModels: [{
        label: 'Fourths from 1 to 4',
        denominator: 4,
        startLabel: '1',
        endLabel: '4',
        tickLabels: ['4/4 = 1', '8/4 = 2', '12/4 = 3', '16/4 = 4'],
        targetNumerators: [0, 1, 2, 3]
      }]
    },
    3: {
      numberLineModels: [{
        label: 'Thirds from 2 to 6',
        denominator: 3,
        startLabel: '2',
        endLabel: '6',
        tickLabels: ['6/3 = 2', '9/3 = 3', '11/3', '14/3', '18/3 = 6'],
        targetNumerators: [0, 1, 2, 3, 4]
      }]
    },
    4: {
      numberLineModels: [{
        label: 'Pinky-finger fourths',
        denominator: 4,
        startLabel: '0 in',
        endLabel: '2 in',
        tickLabels: ['0', '2/4 in', '4/4 = 1 in', '7/4 in', '8/4 = 2 in'],
        targetNumerators: [1, 3]
      }]
    },
    5: {
      numberLineModels: [{
        label: 'Marcy run fifths',
        denominator: 5,
        startLabel: '0 km',
        endLabel: '4 km',
        tickLabels: ['0/5 = 0 km', '5/5 = 1 km', '7/5 km', '10/5 = 2 km', '12/5 km', '15/5 = 3 km', '20/5 = 4 km'],
        targetNumerators: [0, 2, 4, 6]
      }]
    }
  },
  18: {
    3: {
      numberLineModels: [{
        label: 'Sixths comparison',
        denominator: 6,
        tickLabels: ['0', '2/6', '3/6', '6/6 = 1'],
        targetNumerators: [1, 2]
      }]
    },
    4: {
      numberLineModels: [{
        label: 'Halves and fourths comparison',
        denominator: 4,
        tickLabels: ['0', '1/2', '2/4', '1'],
        targetNumerators: [1, 2]
      }]
    },
    5: {
      numberLineModels: [{
        label: 'Eighths and fourths comparison',
        denominator: 8,
        tickLabels: ['0', '7/8', '1', '7/4', '2'],
        targetNumerators: [1, 3]
      }]
    }
  },
  19: {
    2: {
      numberLineModels: [
        { label: 'Halves comparison line', denominator: 2, targetNumerators: [0, 1, 2] },
        { label: 'Fourths comparison line', denominator: 4, targetNumerators: [0, 1, 2, 3, 4] },
        { label: 'Eighths comparison line', denominator: 8, targetNumerators: [0, 1, 2, 3, 4, 5, 6, 7, 8] }
      ]
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
      solvedAnswer: 'Answer provided for 1 half; shade 1 fourth and 1 third of the full beaker amount.',
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
    title: 'Lesson 1 concept: partition concrete wholes into equal parts',
    concept: 'The Teacher Edition builds fractional units from concrete wholes: a 12-inch strip is partitioned into halves, fourths, thirds, and sixths, and identical cups are used to partition a whole amount of liquid.',
    teacherEditionBasis: 'Module 5 Teacher Edition Lesson 1, printed pages 12-18.',
    contrast: 'The whole must be fixed before a fraction is named: the whole strip, the full beaker amount at the fill line, the whole string cheese, the whole sheet of paper, or the 12-inch wood strip.',
    summary: 'A unit fraction is one equal part of a named whole. Lesson 1 uses measurement, shading, and estimated partitions to connect concrete models to fraction names.',
    sourceNote: 'Teacher Edition Lesson 1 Concept Development and Problem Set, printed pages 12-18. Problem Set pages 16-17 supply the five official problem prompts and diagrams.',
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: [...sourcePageImages, ...answerKeyImages],
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
    problems: problems.map((problem) => {
      const centeredProblem = {
        ...problem,
        sourcePageImages: problem.sourcePageImages ?? sourcePageImages,
        blankSourcePageImages: problem.blankSourcePageImages ?? sourcePageImages,
        solvedSourcePageImages: problem.solvedSourcePageImages ?? [...sourcePageImages, ...answerKeyImages]
      };

      return {
        ...centeredProblem,
        blankVisual: createM5ProblemVisual(centeredProblem, false),
        solvedVisual: createM5ProblemVisual(centeredProblem, true)
      };
    })
  };
}

function makeLesson30(): ProblemSetCenteredLesson {
  const sourcePageImages = pageImages(pageRange(351, 355));
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
    title: 'Lesson 30 concept: partition a strip precisely with a lined-paper number line',
    concept: 'The Teacher Edition teaches a ruler-free transfer method: make equal fractional units on lined paper, extend those marks, then angle a strip from 0 to 1 so the guide lines mark equal parts on the strip.',
    teacherEditionBasis: 'Module 5 Teacher Edition Lesson 30, printed pages 351-355.',
    contrast: 'The equal parts come from the lined-paper number line first; the red strip is marked only after it is angled from 0 to 1.',
    summary: 'A precise number line can be used as a transfer tool. If the guide marks on the paper are equal, the marks transferred to the angled strip partition that strip into equal fractional parts.',
    sourceNote: 'Teacher Edition pages 353-354 show Steps 1-5 with lined paper, vertical extensions, the red strip, and the no-sheet Problem Set challenge. Student Workbook page 120 is a written homework reflection, not a Problem Set sheet.',
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: [...sourcePageImages, ...answerKeyImages],
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
    problems: [{
      ...problem,
      sourcePageImages: problem.sourcePageImages ?? sourcePageImages,
      blankSourcePageImages: problem.blankSourcePageImages ?? sourcePageImages,
      solvedSourcePageImages: problem.solvedSourcePageImages ?? [...sourcePageImages, ...answerKeyImages],
      blankVisual: createM5ProblemVisual(problem, false),
      solvedVisual: createM5ProblemVisual(problem, true)
    }]
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
  const teacherAnswer = M5_TEACHER_ANSWER_OVERRIDES[lessonNumber]?.[sourceProblem.number];
  const modelSourceText = `${sourceProblem.prompt} ${teacherAnswer ?? override?.solvedAnswer ?? ''}`;
  const denominator = inferDenominator(sourceProblem.prompt, lessonNumber);
  const numerator = inferNumerator(sourceProblem.prompt, denominator);
  const animationType: ProblemSetAnimationType = usesNumberLine(lessonNumber, sourceProblem.prompt)
    ? 'number-line-model'
    : 'fraction-strip-model';
  const blankVisualType: ProblemSetBlankVisualType = animationType === 'number-line-model'
    ? 'number-line-template'
    : 'fraction-strip-template';
  const model = modelName(animationType);
  const parsedFractionModels = fractionsFromPrompt(modelSourceText);
  const fractionModels = override?.fractionModels
    ?? (parsedFractionModels.length ? parsedFractionModels : m5FallbackFractionModels(lessonNumber, sourceProblem.number, sourceProblem.prompt));
  const numberLineModels = override?.numberLineModels ?? numberLineModelsFromPrompt(modelSourceText, lessonNumber, fractionModels);
  const equations = sourceProblem.equations?.length
    ? sourceProblem.equations
    : fractionModels.map((fractionModel) => `${fractionModel.label} = ${fractionModel.numerator}/${fractionModel.denominator}`);
  const solvedAnswer = teacherAnswer ?? override?.solvedAnswer ?? solvedAnswerFromModels(sourceProblem.prompt, fractionModels, numberLineModels);

  return {
    number: sourceProblem.number,
    sourcePrompt: sourceProblem.prompt,
    fractionModels,
    numberLineModels,
    blankPrompts: [
      sourceSpecificBlankWorkspaceLabel(sourceProblem.number, sourceProblem.prompt, model),
      'Name the whole before naming or comparing the fraction.'
    ],
    blankEquations: blankEquationTemplates(equations),
    blankAnswerSentence: 'Answer in a complete sentence with the fraction unit and whole named.',
    blankWorkspaceLabel: sourceSpecificBlankWorkspaceLabel(sourceProblem.number, sourceProblem.prompt, model),
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

function createM5ProblemVisual(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec {
  const sections: ProblemVisualSpec['sections'] = [];
  const sourceNote = solved
    ? 'Solved view uses the Module 5 Teacher Edition answer key with authored fraction visuals and whole/unit checks.'
    : 'Blank view keeps the authored fraction workspace open with the whole, equal-part structure, labels, and response blanks.';

  if (problem.concreteFractionModel) {
    sections.push(...m5ConcreteFractionSections(problem.concreteFractionModel, solved));
  } else if (problem.paperPartitionModel) {
    sections.push(...m5PaperPartitionSections(problem.paperPartitionModel, solved));
  } else if (problem.numberLineModels?.length) {
    sections.push(...problem.numberLineModels.map((model) => m5NumberLineSection(model, solved)));
  } else if (problem.fractionModels?.length) {
    sections.push(...problem.fractionModels.map((model) => m5FractionTapeSection(model, solved)));
  } else {
    sections.push(m5OpenFractionWorkspace(problem, solved));
  }

  sections.push({
    kind: 'equations',
    label: solved ? 'Solved fraction work' : 'Student fraction blanks',
    lines: solved ? problem.equations : problem.blankEquations?.length ? problem.blankEquations : blankEquationTemplates(problem.equations) ?? ['____ = ____']
  });

  sections.push({
    kind: 'note',
    label: solved ? 'Teacher Edition answer' : 'Source workspace direction',
    text: solved ? problem.solvedAnswer : problem.blankWorkspaceLabel ?? sourceSpecificBlankWorkspaceLabel(problem.number, problem.sourcePrompt, 'fraction')
  });

  return {
    title: `Problem ${problem.number}: ${m5VisualTitle(problem)}`,
    sourceNote,
    sections
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
  const numerator = boundedM5Count(model.numerator, 0, denominator);
  return {
    kind: 'fraction-strip',
    label: solved ? `Solved ${model.label}` : `Blank ${model.label} fraction model`,
    wholeLabel: '1 whole',
    numerator,
    denominator,
    unitLabel: `1/${denominator}`,
    caption: solved
      ? `${numerator}/${denominator} is ${numerator} of ${denominator} equal parts.`
      : `Partition the same whole into ${denominator} equal parts before naming or shading the fraction.`
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
  const objective = M5_OBJECTIVES[lessonNumber];
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
    return {
      ...centeredProblem,
      sourcePageImages: centeredProblem.sourcePageImages ?? sourcePageImages,
      blankSourcePageImages: centeredProblem.blankSourcePageImages ?? sourcePageImages,
      solvedSourcePageImages: centeredProblem.solvedSourcePageImages ?? [...sourcePageImages, ...answerKeyImages],
      blankVisual: createM5ProblemVisual(centeredProblem, false),
      solvedVisual: createM5ProblemVisual(centeredProblem, true)
    };
  });
  return {
    title: `Lesson ${lessonNumber} concept: ${objective}`,
    concept: conceptCopy.concept,
    teacherEditionBasis: source?.teacherEditionSource ?? `Module 5 Teacher Edition, Lesson ${lessonNumber}.`,
    contrast: conceptCopy.contrast,
    summary: conceptCopy.summary,
    sourceNote: source?.studentWorkbookSource ?? `Module 5 student workbook, Lesson ${lessonNumber}.`,
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: [...sourcePageImages, ...answerKeyImages],
    conceptSections: [
      {
        title: '1. Teacher Edition concept',
        body: `Teacher Edition concept focus: ${objective}`,
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
        body: `Use the Lesson ${lessonNumber} Teacher Edition debrief to check the model, fraction language, and answer meaning without changing the official Problem Set structure.`,
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
