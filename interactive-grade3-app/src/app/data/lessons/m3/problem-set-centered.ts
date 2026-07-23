import { STUDENT_WORK_SOURCE } from '../../student-work-source.generated';
import { evaluate } from 'mathjs/number';
import type {
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemVisualSection,
  ProblemVisualSpec
} from '../lesson-runtime.types';
import { m3FunctionalConceptSections, m3TeacherSource } from './functional-fidelity';

const MODULE_3_TITLE = 'Multiplication and Division with Units of 0, 1, 6-9, and Multiples of 10';

const LESSON_OBJECTIVES: Record<number, string> = {
  1: 'Study commutativity to find known facts of 6, 7, 8, and 9.',
  2: 'Apply the distributive and commutative properties to relate multiplication facts 5 x n + n to 6 x n and n x 6 where n is the size of the unit.',
  3: 'Multiply and divide with familiar facts using a letter to represent the unknown.',
  4: 'Count by units of 6 to multiply and divide using number bonds to decompose.',
  5: 'Count by units of 7 to multiply and divide using number bonds to decompose.',
  6: 'Use the distributive property as a strategy to multiply and divide using units of 6 and 7.',
  7: 'Interpret the unknown in multiplication and division to model and solve problems using units of 6 and 7.',
  8: 'Understand the function of parentheses and apply to solving problems.',
  9: 'Model the associative property as a strategy to multiply.',
  10: 'Use the distributive property as a strategy to multiply and divide.',
  11: 'Interpret the unknown in multiplication and division to model and solve problems.',
  12: 'Apply the distributive property and the fact 9 = 10 - 1 as a strategy to multiply.',
  13: 'Identify and use arithmetic patterns to multiply.',
  14: 'Identify and use arithmetic patterns to multiply.',
  15: 'Interpret the unknown in multiplication and division to model and solve problems.',
  16: 'Reason about and explain arithmetic patterns using units of 0 and 1 as they relate to multiplication and division.',
  17: 'Identify patterns in multiplication and division facts using the multiplication table.',
  18: 'Solve two-step word problems involving all four operations and assess the reasonableness of solutions.',
  19: 'Multiply by multiples of 10 using the place value chart.',
  20: 'Use place value strategies and the associative property n × (m × 10) = (n × m) × 10 (where n and m are less than 10) to multiply by multiples of 10.',
  21: 'Solve two-step word problems involving multiplying single-digit factors and multiples of 10.'
};

const LESSON_SUMMARIES: Record<number, string> = {
  1: 'Use commutativity to turn unknown 6, 7, 8, and 9 facts into facts that are already known.',
  2: 'Build 6 facts from 5 facts by adding one more unit, then use commutativity to write the related fact.',
  3: 'Use a letter for the unknown in multiplication and division equations, then solve from known facts.',
  4: 'Count by sixes and decompose facts with number bonds to connect multiplication and division.',
  5: 'Count by sevens and use number bonds to connect multiplication and division facts.',
  6: 'Break 6 and 7 facts into known parts with the distributive property, especially 5 plus more groups.',
  7: 'Represent the unknown in multiplication and division word problems with units of 6 and 7.',
  8: 'Use parentheses to show which operation is completed first and how that changes the value.',
  9: 'Use the associative property to regroup factors and make friendlier multiplication facts.',
  10: 'Use the distributive property to multiply and divide with units of 8.',
  11: 'Use multiplication and division equations with an unknown to model and solve story problems.',
  12: 'Use the distributive property and 9 = 10 - 1 to solve nines facts.',
  13: 'Use arithmetic patterns in multiples of 9 to multiply and check products.',
  14: 'Use additional patterns, including digit patterns and finger patterns, to reason about nines facts.',
  15: 'Model and solve unknown-factor multiplication and division problems.',
  16: 'Explain the special patterns for multiplication and division with 0 and 1.',
  17: 'Use the multiplication table to analyze product patterns, including even, odd, and square products.',
  18: 'Solve two-step word problems and check whether the answer is reasonable.',
  19: 'Use the place value chart to connect ones facts and tens facts.',
  20: 'Use place value and the associative property to multiply by multiples of 10.',
  21: 'Solve two-step word problems that combine single-digit facts and multiples of 10.'
};

const WORKBOOK_PAGE_IMAGES: Record<number, string[]> = {
  1: ['lesson-1-page-02.png', 'lesson-1-page-03.png'],
  2: ['lesson-2-page-06.png', 'lesson-2-page-07.png', 'lesson-2-page-08.png'],
  3: ['lesson-3-page-11.png', 'lesson-3-page-12.png', 'lesson-3-page-13.png'],
  4: ['lesson-4-page-16.png', 'lesson-4-page-17.png'],
  5: ['lesson-5-page-20.png', 'lesson-5-page-21.png'],
  6: ['lesson-6-page-24.png', 'lesson-6-page-25.png'],
  7: ['lesson-7-page-28.png', 'lesson-7-page-29.png'],
  8: ['lesson-8-page-32.png', 'lesson-8-page-33.png'],
  9: ['lesson-9-page-37.png', 'lesson-9-page-38.png'],
  10: ['lesson-10-page-41.png', 'lesson-10-page-42.png', 'lesson-10-page-43.png'],
  11: ['lesson-11-page-46.png', 'lesson-11-page-47.png'],
  12: ['lesson-12-page-50.png', 'lesson-12-page-51.png', 'lesson-12-page-52.png'],
  13: ['lesson-13-page-56.png', 'lesson-13-page-57.png', 'lesson-13-page-58.png'],
  14: ['lesson-14-page-61.png', 'lesson-14-page-62.png'],
  15: ['lesson-15-page-65.png', 'lesson-15-page-66.png'],
  16: ['lesson-16-page-69.png', 'lesson-16-page-70.png'],
  17: ['lesson-17-page-73.png', 'lesson-17-page-74.png', 'lesson-17-page-75.png'],
  18: ['lesson-18-page-79.png', 'lesson-18-page-80.png'],
  19: ['lesson-19-page-83.png', 'lesson-19-page-84.png'],
  20: ['lesson-20-page-87.png', 'lesson-20-page-88.png'],
  21: ['lesson-21-page-91.png', 'lesson-21-page-92.png']
};

const ANSWER_KEY_PAGE_IMAGES: Record<number, string[]> = {
  1: answerKeyPageImages(281, 282),
  2: answerKeyPageImages(283, 284),
  3: answerKeyPageImages(285, 285),
  4: answerKeyPageImages(286, 286),
  5: answerKeyPageImages(287, 288),
  6: answerKeyPageImages(289, 290),
  7: answerKeyPageImages(291, 292),
  8: answerKeyPageImages(293, 295),
  9: answerKeyPageImages(296, 297),
  10: answerKeyPageImages(298, 298),
  11: answerKeyPageImages(299, 300),
  12: answerKeyPageImages(301, 302),
  13: answerKeyPageImages(303, 304),
  14: answerKeyPageImages(305, 306),
  15: answerKeyPageImages(307, 308),
  16: answerKeyPageImages(309, 310),
  17: answerKeyPageImages(311, 311),
  18: answerKeyPageImages(312, 313),
  19: answerKeyPageImages(314, 314),
  20: answerKeyPageImages(315, 315),
  21: answerKeyPageImages(316, 317)
};

function answerKeyPageImages(start: number, end: number): string[] {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    const page = String(start + index).padStart(3, '0');
    return `/source-pages/m3-answer-key/page-${page}.png`;
  });
}

const SOLVED_ANSWERS: Record<number, string[]> = {
  1: [
    'Teacher Edition Answer Key: a. Answers will vary. b. 14; 3; 28; 35; 6.',
    'Teacher Edition Answer Key: 24, 4, 6; 24, 6, 4.',
    'Teacher Edition Answer Key: a. 7; b. sixes; 18; c. tens; 80; d. 6; 24; e. 5; 40; f. 4; 4; g. 1; 27; h. 9; 36; i. 3; 32; j. 5; 30; k. 7; 3; 21; l. 5; 5; 20.'
  ],
  2: [
    'Teacher Edition Answer Key: Sevens; 7, 7; 35; 5, 1; 7; 42; 6, 7, 42; 7, 6, 42.',
    'Teacher Edition Answer Key: a. Eights; 8, 8; 40. b. 48; answers will vary.',
    'Teacher Edition Answer Key: 63.',
    'Teacher Edition Answer Key: 4.',
    'Teacher Edition Answer Key: No; explanations will vary.'
  ],
  3: [
    'Teacher Edition Answer Key: e = 20; l = 7; i = 6; c = 3; s = 4; n = 10; t = 70; k = 9; b = 2; a = 24; h = 5; kitchen tables.',
    'Teacher Edition Answer Key: a. m = $24. b. c = $6.',
    'Teacher Edition Answer Key: 4, n, 28; 28, 4, n; n = 7; 7 loaves of bread.',
    'Teacher Edition Answer Key: Shorter game: 10 minutes; longer game: 22 minutes.'
  ],
  4: [
    'Teacher Edition Answer Key: 12, 24, 42, 54; each number matched to its corresponding multiplication fact.',
    'Teacher Edition Answer Key: 12, 18, 24; 4, 24; 24, 4.',
    'Teacher Edition Answer Key: 12, 18, 24, 30, 36, 42; 7, 42; 42, 7.',
    'Teacher Edition Answer Key: a. 12, 24, 18, 18, 36, 18, 30, 42. b. 8; 8.',
    'Teacher Edition Answer Key: No; explanations will vary.'
  ],
  5: [
    'Teacher Edition Answer Key: 14, 28, 35, 56, 63, 70. 42, 6; 21, 3; 56, 8; 49, 7; 7, 1; 70, 10; 63, 9; 28, 4; 14, 2; 35, 5.',
    'Teacher Edition Answer Key: 21, 35, 49, 56, 70. a. 3, 21; 21, 3. b. 5, 35; 35, 5. c. 7, 49; 49, 7. d. 8, 56; 56, 8. e. 10, 70; 70, 10.',
    'Teacher Edition Answer Key: Explanations will vary.',
    'Teacher Edition Answer Key: Both are correct; explanations will vary.'
  ],
  6: [
    'Teacher Edition Answer Key: a. 36; 30; 1, 6; 6; 36. b. 42; 30; 2, 12; 12; 42. c. 48; 30; 3, 18; 3; 3; 18; 48. d. 54; 30; 4, 24; 4; 4; 24; 54.',
    'Teacher Edition Answer Key: 24; 4; 9.',
    'Teacher Edition Answer Key: 14 divided by 7; 14; 2; 7.',
    'Teacher Edition Answer Key: Yes; explanations will vary.',
    'Teacher Edition Answer Key: Answers will vary.'
  ],
  7: [
    'Teacher Edition Answer Key: Words matched to corresponding equations.',
    'Teacher Edition Answer Key: 6 x 8 = k or 8 x 6 = k; k = 48.',
    'Teacher Edition Answer Key: a. Picture models equation; 7. b. Picture models equation; 4 minutes. c. Picture models equation; 48 cm. d. Picture models equation; 9.'
  ],
  8: [
    'Teacher Edition Answer Key: a. 14; b. 2; c. 5; d. 11; e. 30; f. 15; g. 20; h. 26; i. 10; j. 2; k. 14; l. 8; m. 10; n. 2; o. 37; p. 9.',
    'Teacher Edition Answer Key: a. (16 - 4) + 7 = 19; b. 16 - (4 + 7) = 5; c. 2 = 22 - (15 + 5); d. 12 = (22 - 15) + 5; e. (3 + 7) x 6 = 60; f. 3 + (7 x 6) = 45; g. 5 = (10 divided by 10) x 5; h. 50 = (100 divided by 10) x 5; i. (26 - 5) divided by 7 = 3; j. 36 = 4 x (25 - 16).',
    'Teacher Edition Answer Key: Chad used (24 divided by 4) + 2 = 8; Samir used 24 divided by (4 + 2) = 4.',
    'Teacher Edition Answer Key: 12 + (15 divided by 3) = 17.',
    'Teacher Edition Answer Key: 13; 20.'
  ],
  9: [
    'Teacher Edition Answer Key: a. 36; b. 9; 36; c. 42; d. 3, 2; 6, 7; 42.',
    'Teacher Edition Answer Key: a. Answer provided. b. 4; 28. c. 9, 4; 36. d. 6, 7; 42. e. 5, 9; 45. f. 5, 6; 30.',
    'Teacher Edition Answer Key: Explanations will vary.',
    'Teacher Edition Answer Key: Explanations will vary.'
  ],
  10: [
    'Teacher Edition Answer Key: a. Array accurately labeled; 64; 40; 3, 24; 3; 3; 24; 64. b. Array accurately labeled; 72; 40; 4, 32; 4; 4; 32; 72.',
    'Teacher Edition Answer Key: 16; 2; 7.',
    'Teacher Edition Answer Key: 32 divided by 8; 32; 4; 9.',
    'Teacher Edition Answer Key: 24, 32, 40, 48, 56, 64, 72; 72.',
    'Teacher Edition Answer Key: Answer provided; 48; 24; 80; 64; 56.',
    'Teacher Edition Answer Key: Answer provided; 4; 2; 8; 6; 9.'
  ],
  11: [
    'Teacher Edition Answer Key: Tape diagram drawn and labeled; n = 4.',
    'Teacher Edition Answer Key: Tape diagram drawn and labeled; m = $48.',
    'Teacher Edition Answer Key: Tape diagram drawn and labeled; c = 3.',
    'Teacher Edition Answer Key: 5.',
    'Teacher Edition Answer Key: 21.',
    'Teacher Edition Answer Key: $36.'
  ],
  12: [
    'Teacher Edition Answer Key: a. 54; 9; 9; 54. b. 63; 2, 18; 2; 2; 18; 63. c. 72; 45; 3, 27; 3; 3, 9; 27; 72. d. 81; 45; 4, 36; 4; 4, 9; 36; 81.',
    'Teacher Edition Answer Key: a. 54; 60; 54. b. 63; 70; 63. c. 72; 80; 72. d. 81; 90, 9; 81.',
    'Teacher Edition Answer Key: 36; answers will vary.',
    'Teacher Edition Answer Key: Products and quotients matched.'
  ],
  13: [
    'Teacher Edition Answer Key: a. 18, 27, 45, 54, 63, 81, 90. b. +1. c. -1.',
    'Teacher Edition Answer Key: a. Answer provided. b. 18. c. 28; 27; 27. d. 37; 36; 36. e. 46; 45; 45. f. 55; 54; 54. g. 64; 63; 63. h. 73; 72; 72. i. 82; 81; 81. j. 91; 90; 90.',
    'Teacher Edition Answer Key: a. +10, -1. b. 99; 108; 117; 126. c. 54; 63; strategy accurately used to solve. d. Explanation must describe the nines pattern used.',
    'Teacher Edition Answer Key: a = 6; g = 9; d = 8; o = 90; e = 7; n = 3; s = 4; t = 2; i = 45. Add a “g” and it’s gone!'
  ],
  14: [
    'Teacher Edition Answer Key: a. Answer provided; 9; 27, 2, 7, 9; 36, 3, 6, 9; 45, 4, 5, 9; 54, 5, 4, 9; 63, 6, 3, 9; 72, 7, 2, 9; 81, 8, 1, 9; 90, 9, 0, 9. b. 9. c. Incorrect; answers will vary.',
    'Teacher Edition Answer Key: Answers will vary.',
    'Teacher Edition Answer Key: Explanations will vary.',
    'Teacher Edition Answer Key: 63; explanations will vary.'
  ],
  15: [
    'Teacher Edition Answer Key: 4; solution includes equation and an unknown.',
    'Teacher Edition Answer Key: 3 L; solution includes equation and an unknown.',
    'Teacher Edition Answer Key: 63 m; solution includes equation and an unknown.',
    'Teacher Edition Answer Key: $7; solution includes equation and an unknown.',
    'Teacher Edition Answer Key: 3; solution includes equation and an unknown.',
    'Teacher Edition Answer Key: 37; solution includes equation and an unknown.'
  ],
  16: [
    'Teacher Edition Answer Key: a. 6; b. 0; c. 1; d. 1; e. 0; f. Any number; g. 4; h. 3.',
    'Teacher Edition Answer Key: Equations matched to solutions.',
    'Teacher Edition Answer Key: 1, 2, 3, 4, 5, 6, 7, 8, 9, n. Answers will vary.',
    'Teacher Edition Answer Key: a. n divided by 1 = n. b. 6 divided by 1 = 6; picture drawn. c. 6 x 1 = 6.',
    'Teacher Edition Answer Key: a. Explanations may vary. b. Explanations may vary. c. Explanations may vary.'
  ],
  17: [
    'Teacher Edition Answer Key: Products accurately recorded. a. Even-product squares colored; Yes. b. No. c. Explanations may vary. d. 112.',
    'Teacher Edition Answer Key: a. Products accurately labeled. b. Arrays accurately drawn; 5, 7, 9, 11. c. Answers may vary. d. Explanations may vary.'
  ],
  18: [
    'Teacher Edition Answer Key: 27 cm; solution includes model, equation, and explanation.',
    'Teacher Edition Answer Key: 57 min; solution includes model, equation, and explanation.',
    'Teacher Edition Answer Key: 8; solution includes model, equation, and explanation.',
    'Teacher Edition Answer Key: 6; solution includes model, equation, and explanation.',
    'Teacher Edition Answer Key: 9 g; solution includes model, equation, and explanation.'
  ],
  19: [
    'Teacher Edition Answer Key: a. 12; 12. b. 12; 120.',
    'Teacher Edition Answer Key: a. 8; 8. b. 8; 80. c. 15; 15. d. 15; 150. e. 20; 20. f. 20; 200.',
    'Teacher Edition Answer Key: a. 14. b. 14. c. 24. d. 24. e. 300. f. 320. g. 280. h. 400.',
    'Teacher Edition Answer Key: 240; tape diagram models equation.'
  ],
  20: [
    'Teacher Edition Answer Key: a. Answer provided. b. 80. c. 15; 150. d. 5; 150.',
    'Teacher Edition Answer Key: Answer provided; 9; 90; 6; 60; 10; 100.',
    'Teacher Edition Answer Key: Explanations will vary.'
  ],
  21: [
    'Teacher Edition Answer Key: 345 seconds; tape diagram models equation.',
    'Teacher Edition Answer Key: No; explanations will vary; solution includes model and equation with unknown.',
    'Teacher Edition Answer Key: 400 cents; solution includes model and equation with unknown.',
    'Teacher Edition Answer Key: 9 g; solution includes model and equation with unknown.',
    'Teacher Edition Answer Key: 41; solution includes model and equation with unknown.',
    'Teacher Edition Answer Key: $126; solution includes model and equation with unknown.'
  ]
};

function normalizeEquation(equation: string): string {
  return equation.replace(/×/g, 'x').replace(/\s+/g, ' ').trim();
}

function maskBlankEquation(equation: string): string {
  return normalizeEquation(equation)
    .replace(/\$\s*\d[\d,]*(?:\.\d+)?/g, '$____')
    .replace(/\b\d[\d,]*(?:\.\d+)?\b/g, '____');
}

function blankEquationTemplates(equations: string[]): string[] {
  const templates = equations
    .map((equation) => {
      const normalized = normalizeEquation(equation);
      return normalized.includes('____') ? normalized : maskBlankEquation(normalized);
    })
    .filter((equation) => equation.length > 0)
    .map((equation) => equation.includes('____') ? equation : `${equation}: ____`);

  return templates.length > 0 ? Array.from(new Set(templates)) : [];
}

function maskPromptMathFragment(fragment: string): string {
  return fragment.replace(/\b\d[\d,]*(?:\.\d+)?\b/g, '____');
}

function maskExtractedPromptEquations(prompt: string): string {
  return prompt
    .replace(/\b(?:\d+|n|[a-z])\s*(?:×|x|÷|divided by|\+|[-–])\s*(?:\d+|n|[a-z])(?:\s*=\s*(?:\d+|n|[a-z]))?/gi, maskPromptMathFragment)
    .replace(/\b(?:n|[a-z])\s*=\s*\d+\b/gi, maskPromptMathFragment)
    .replace(/\b\d+\s*=\s*(?:n|[a-z]|\d+)\b/gi, maskPromptMathFragment);
}

function mathExpressionFromSource(expression: string): string | undefined {
  const sourceSide = expression.split('=')[0] ?? expression;
  const normalized = sourceSide
    .replace(/\$/g, '')
    .replace(/×/g, '*')
    .replace(/\bx\b/gi, '*')
    .replace(/÷/g, '/')
    .replace(/\bdivided by\b/gi, '/')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

  if (!/^\s*[\d\s().+\-*/]+\s*$/.test(normalized) || !/\d/.test(normalized)) {
    return undefined;
  }

  return normalized;
}

function evaluateM3Expression(expression: string): string | undefined {
  const mathExpression = mathExpressionFromSource(expression);
  if (!mathExpression) {
    return undefined;
  }

  try {
    const value = evaluate(mathExpression);
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return undefined;
    }
    return Number.isInteger(value) ? String(value) : String(Math.round(value * 100) / 100);
  } catch {
    return undefined;
  }
}

function equationLibraryCheck(equation: string): string | undefined {
  if (!equation.includes('=')) {
    return evaluateM3Expression(equation);
  }

  const [left, right] = equation.split('=').map((part) => part.trim());
  const leftValue = evaluateM3Expression(left);
  const rightValue = evaluateM3Expression(right);

  if (leftValue && rightValue) {
    return leftValue === rightValue ? `${leftValue} = ${rightValue}` : `${leftValue} != ${rightValue}`;
  }

  return leftValue ?? rightValue;
}

const PROBLEM_METADATA: Record<string, Partial<ProblemSetCenteredProblem>> = {
  '4-1': { blankEquations: ['____ x 6 = ____'] },
  '4-2': { blankEquations: ['6 x ____ = ____', '____ divided by 6 = ____'] },
  '4-3': { blankEquations: ['6 x ____ = ____', '____ divided by 6 = ____'] },
  '4-4': { blankEquations: ['6 x ____ = 48', '48 divided by 6 = ____'] },
  '4-5': { blankEquations: ['6 x 7 = ____'] },
  '5-1': { blankEquations: ['____ x 7 = ____', '____ divided by 7 = ____'] },
  '5-2': { blankEquations: ['____ x 7 = ____', '____ divided by 7 = ____'] },
  '5-3': { blankEquations: ['14 + ____ + ____ = 21', '3 x 7 = ____'] },
  '5-4': { blankEquations: ['7 x 6 = ____', '6 x 7 = ____'] },
  '6-1': { blankEquations: ['6 x 6 = ____', '7 x 6 = ____', '8 x 6 = ____', '9 x 6 = ____'] },
  '6-2': { blankEquations: ['54 divided by 6 = (30 divided by 6) + (____ divided by 6)', '5 + ____ = ____'] },
  '6-3': { blankEquations: ['49 divided by 7 = (35 divided by 7) + (____ divided by 7)', '5 + ____ = ____'] },
  '6-4': { blankEquations: ['6 x 8 = (5 x 8) + 8', '____ + ____ = ____'] },
  '6-5': { blankEquations: ['42 divided by 7 = (____ divided by 7) + (____ divided by 7)', '____ + ____ = ____'] },
  '7-1': {
    equations: ['n x 6 = 30', '7 x n = 42', '6 x 7 = n', '63 divided by n = 9', '36 divided by n = 6', 'n x 7 = 21'],
    blankEquations: ['n x 6 = 30', '7 x n = 42', '6 x 7 = n', '63 divided by n = 9', '36 divided by n = 6', 'n x 7 = 21']
  },
  '7-3': {
    equations: ['21 divided by 3 = s; s = 7', '24 divided by 6 = t; t = 4', '8 x 6 = y; y = 48', '54 divided by 6 = b; b = 9'],
    blankEquations: ['21 divided by 3 = s; s = ____', '24 divided by 6 = t; t = ____', '8 x 6 = y; y = ____', '54 divided by 6 = b; b = ____']
  },
  '8-1': {
    equations: ['(12 - 4) + 6 = 14', '12 - (4 + 6) = 2', '15 - (7 + 3) = 5', '(15 - 7) + 3 = 11', '(3 + 2) x 6 = 30', '3 + (2 x 6) = 15', '4 x (7 - 2) = 20', '(4 x 7) - 2 = 26', '(12 divided by 2) + 4 = 10', '12 divided by (2 + 4) = 2', '9 + (15 divided by 3) = 14', '(9 + 15) divided by 3 = 8', '60 divided by (10 - 4) = 10', '(60 divided by 10) - 4 = 2', '35 + (10 divided by 5) = 37', '(35 + 10) divided by 5 = 9'],
    blankEquations: ['(12 - 4) + 6 = ____', '12 - (4 + 6) = ____', '____ = 15 - (7 + 3)', '____ = (15 - 7) + 3', '____ = (3 + 2) x 6', '____ = 3 + (2 x 6)', '4 x (7 - 2) = ____', '(4 x 7) - 2 = ____', '____ = (12 divided by 2) + 4', '____ = 12 divided by (2 + 4)', '9 + (15 divided by 3) = ____', '(9 + 15) divided by 3 = ____', '60 divided by (10 - 4) = ____', '(60 divided by 10) - 4 = ____', '____ = 35 + (10 divided by 5)', '____ = (35 + 10) divided by 5']
  },
  '8-2': {
    equations: ['(16 - 4) + 7 = 19', '16 - (4 + 7) = 5', '2 = 22 - (15 + 5)', '12 = (22 - 15) + 5', '(3 + 7) x 6 = 60', '3 + (7 x 6) = 45', '5 = (10 divided by 10) x 5', '50 = (100 divided by 10) x 5', '(26 - 5) divided by 7 = 3', '36 = 4 x (25 - 16)'],
    blankEquations: ['16 - 4 + 7 = 19; add parentheses', '16 - 4 + 7 = 5; add parentheses', '2 = 22 - 15 + 5; add parentheses', '12 = 22 - 15 + 5; add parentheses', '3 + 7 x 6 = 60; add parentheses', '3 + 7 x 6 = 45; add parentheses', '5 = 10 divided by 10 x 5; add parentheses', '50 = 100 divided by 10 x 5; add parentheses', '26 - 5 divided by 7 = 3; add parentheses', '36 = 4 x 25 - 16; add parentheses']
  },
  '8-3': { equations: ['(24 divided by 4) + 2 = 8', '24 divided by (4 + 2) = 4'], blankEquations: ['24 divided by 4 + 2 = ____; place parentheses for Chad', '24 divided by 4 + 2 = ____; place parentheses for Samir'] },
  '8-4': { equations: ['12 + (15 divided by 3) = 17'], blankEquations: ['12 + 15 divided by 3 = ____; add parentheses'] },
  '8-5': { equations: ['7 + (3 x 2) = 13', '(7 + 3) x 2 = 20'], blankEquations: ['7 + 3 x 2 = ____; first placement', '7 + 3 x 2 = ____; second placement'] },
  '9-1': { equations: ['3 x 12 = 36', '(3 x 3) x 4 = 9 x 4 = 36', '3 x 14 = 42', '(3 x 2) x 7 = 6 x 7 = 42'], blankEquations: ['3 x 12 = ____', '(3 x 3) x 4 = ____ x 4 = ____', '3 x 14 = ____', '(____ x ____) x 7 = ____ x 7 = ____'] },
  '9-2': { equations: ['3 x 16 = 3 x (2 x 8) = (3 x 2) x 8 = 6 x 8 = 48', '2 x 14 = 2 x (2 x 7) = (2 x 2) x 7 = 4 x 7 = 28', '3 x 12 = 3 x (3 x 4) = 9 x 4 = 36', '3 x 14 = 3 x 2 x 7 = 6 x 7 = 42', '15 x 3 = 5 x 3 x 3 = 5 x 9 = 45', '15 x 2 = 5 x 3 x 2 = 5 x 6 = 30'], blankEquations: ['3 x 16 = 3 x (2 x 8) = ____ x 8 = ____', '2 x 14 = 2 x (2 x 7) = ____ x 7 = ____', '3 x 12 = 3 x (3 x 4) = ____ x ____ = ____', '3 x 14 = 3 x 2 x 7 = ____ x ____ = ____', '15 x 3 = 5 x 3 x 3 = ____ x ____ = ____', '15 x 2 = 5 x 3 x 2 = ____ x ____ = ____'] },
  '9-3': { equations: ['16 x 2 = (8 x 2) x 2 = 8 x (2 x 2) = 8 x 4 = 32'], blankEquations: ['16 x 2 = (8 x 2) x 2 = 8 x (2 x 2) = ____ x ____ = ____'] },
  '9-4': { equations: ['16 x 2 = (8 x 2) x 2 = 8 x (2 x 2) = 8 x 4 = 32'], blankEquations: ['Explain why regrouping 16 x 2 as 8 x 4 keeps the product equal.'] },
  '10-1': { equations: ['8 x 8 = 8 x (5 + 3) = (8 x 5) + (8 x 3) = 40 + 24 = 64', '9 x 8 = 8 x (5 + 4) = (8 x 5) + (8 x 4) = 40 + 32 = 72'], blankEquations: ['8 x 8 = 8 x (5 + ____) = 40 + ____ = ____', '9 x 8 = 8 x (5 + ____) = 40 + ____ = ____'] },
  '10-2': { equations: ['56 divided by 8 = (40 divided by 8) + (16 divided by 8) = 5 + 2 = 7'], blankEquations: ['56 divided by 8 = (40 divided by 8) + (____ divided by 8)', '5 + ____ = ____'] },
  '10-3': { equations: ['72 divided by 8 = (40 divided by 8) + (32 divided by 8) = 5 + 4 = 9'], blankEquations: ['72 divided by 8 = (40 divided by 8) + (____ divided by 8)', '5 + ____ = ____'] },
  '10-5': { equations: ['4 x 8 = 32', '8 x 6 = 48', '3 x 8 = 24', '8 x 10 = 80', '8 x 8 = 64', '7 x 8 = 56'], blankEquations: ['4 x 8 = ____', '8 x 6 = ____', '3 x 8 = ____', '8 x 10 = ____', '8 x 8 = ____', '7 x 8 = ____'] },
  '10-6': { equations: ['24 divided by 8 = 3', '32 divided by 8 = 4', '16 divided by 8 = 2', '64 divided by 8 = 8', '48 divided by 8 = 6', '72 divided by 8 = 9'], blankEquations: ['24 divided by 8 = ____', '32 divided by 8 = ____', '16 divided by 8 = ____', '64 divided by 8 = ____', '48 divided by 8 = ____', '72 divided by 8 = ____'] },
  '11-4': { equations: ['4 x 10 = 40', '40 divided by 8 = 5'], blankEquations: ['4 x 10 = ____', '____ divided by 8 = ____'] },
  '11-5': { equations: ['8 x 7 = 56', '56 - 35 = 21'], blankEquations: ['8 x 7 = ____', '____ - 35 = ____'] },
  '11-6': { equations: ['72 divided by 8 = 9', '9 x 4 = 36'], blankEquations: ['72 divided by 8 = ____', '____ x 4 = ____'] },
  '1-2': {
    blankWorkspaceLabel: 'Use the 4-by-6 array from the workbook to write both commutative facts.',
    blankVisualType: 'array-template',
    solvedAnswer: 'Teacher Edition Answer Key: 24, 4, 6; 24, 6, 4.',
    equations: ['24 = 4 x 6', '24 = 6 x 4'],
    knownTotal: 24,
    knownGroupCount: 4,
    knownGroupSize: 6,
    quotient: 24,
    quotientMeaning: 'The total is 24 objects; the same array can be read as 4 groups of 6 or 6 groups of 4.',
    animationType: 'array-model',
    unitLabel: 'objects',
    groupLabel: 'rows',
    explanation: 'Count the array by rows to get 4 x 6 = 24. Turn the factors around to use the commutative property: 6 x 4 = 24.',
    validationChecks: [
      'The model has 24 objects total.',
      'Both multiplication sentences use the same two factors, 4 and 6.',
      'The equations show commutativity by reversing the factors.'
    ]
  },
  '2-3': {
    blankWorkspaceLabel: 'Show 7 weeks with 9 pages in each week.',
    blankVisualType: 'array-template',
    equations: ['7 x 9 = 63'],
    knownGroupCount: 7,
    knownGroupSize: 9,
    quotient: 63,
    quotientMeaning: 'The answer 63 means the number of pages written in 7 weeks.',
    animationType: 'array-model',
    unitLabel: 'pages',
    groupLabel: 'weeks',
    explanation: 'The prompt gives 7 weeks and 9 pages each week. Multiply 7 x 9 to complete the Problem Set item.',
    validationChecks: ['The model shows 7 weeks.', 'Each week has 9 pages.', 'The total is 63 pages.']
  },
  '2-4': {
    blankWorkspaceLabel: 'Group 32 crayons into packs of 8.',
    blankVisualType: 'bar-units',
    equations: ['32 divided by 8 = 4'],
    knownTotal: 32,
    knownGroupSize: 8,
    quotient: 4,
    quotientMeaning: 'The answer 4 means the number of packs of crayons.',
    animationType: 'grouping-by-size',
    unitLabel: 'crayons',
    groupLabel: 'packs',
    explanation: 'The prompt gives 32 crayons total and 8 crayons in each pack. Four groups of 8 use all 32 crayons.',
    validationChecks: ['The model starts with 32 crayons.', 'Each pack has 8 crayons.', 'There are 4 packs.']
  },
  '3-2': {
    blankWorkspaceLabel: 'Show 3 shirts at 8 dollars each, then compare with 30 dollars paid.',
    blankVisualType: 'array-template',
    equations: ['3 x 8 = 24', '30 - 24 = 6'],
    knownGroupCount: 3,
    knownGroupSize: 8,
    quotient: 24,
    quotientMeaning: 'Lonna spends 24 dollars and receives 6 dollars in change.',
    animationType: 'array-model',
    unitLabel: 'dollars',
    groupLabel: 'shirts',
    explanation: 'The source problem gives 3 shirts at 8 dollars each. The Teacher Edition Answer Key gives m = $24 and c = $6.',
    validationChecks: ['Three shirt groups are shown.', 'Each shirt costs 8 dollars.', 'The change is checked from 30 - 24.']
  },
  '3-3': {
    blankWorkspaceLabel: 'Group 28 cups of flour into loaves using 4 cups for each loaf.',
    blankVisualType: 'bar-units',
    blankEquations: ['4 x n = 28', '28 divided by 4 = n'],
    equations: ['4 x 7 = 28', '28 divided by 4 = 7', 'n = 7'],
    knownTotal: 28,
    knownGroupCount: 7,
    knownGroupSize: 4,
    quotient: 7,
    quotientMeaning: 'The answer 7 means the number of loaves of bread.',
    animationType: 'grouping-by-size',
    unitLabel: 'cups',
    groupLabel: 'loaves',
    explanation: 'The prompt gives 28 cups total and 4 cups per loaf. Seven loaves use 28 cups.',
    validationChecks: ['The total is 28 cups.', 'Each loaf uses 4 cups.', 'The answer names 7 loaves.']
  },
  '3-4': {
    blankWorkspaceLabel: 'Show two game times totaling 32 minutes, with the longer game 12 minutes more than the shorter game.',
    blankVisualType: 'tape-diagram',
    blankEquations: ['s + l = 32', 'l = s + 12'],
    equations: ['32 - 12 = 20', '20 divided by 2 = 10', '10 + 12 = 22'],
    knownTotal: 32,
    quotient: 10,
    quotientMeaning: 'The shorter game is 10 minutes and the longer game is 22 minutes.',
    animationType: 'two-step-model',
    unitLabel: 'minutes',
    groupLabel: 'games',
    explanation: 'Remove the 12-minute difference from the 32-minute total, split the remaining 20 minutes equally, and add 12 minutes to the longer game.',
    validationChecks: ['The two game times total 32 minutes.', 'The longer game is 12 minutes longer.', 'The answers are 10 minutes and 22 minutes.']
  },
  '7-2': {
    blankWorkspaceLabel: 'Use the six 8-unit parts in the tape diagram.',
    blankVisualType: 'array-template',
    blankEquations: ['6 x 8 = k', 'k = ____'],
    equations: ['6 x 8 = k', 'k = 48'],
    knownGroupCount: 6,
    knownGroupSize: 8,
    quotient: 48,
    quotientMeaning: 'The unknown k is 48.',
    animationType: 'array-model',
    unitLabel: 'units',
    groupLabel: 'parts',
    explanation: 'The source tape diagram shows six equal parts labeled 8. Multiply 6 x 8 to find k.',
    validationChecks: ['The model has 6 equal parts.', 'Each part is labeled 8.', 'The total is 48.']
  },
  '10-4': {
    blankWorkspaceLabel: 'Show 9 octagons with 8 sides each.',
    blankVisualType: 'array-template',
    blankEquations: ['8, 16, ____, ____, ____, ____, ____, ____, ____'],
    equations: ['8, 16, 24, 32, 40, 48, 56, 64, 72', '9 x 8 = 72'],
    knownGroupCount: 9,
    knownGroupSize: 8,
    quotient: 72,
    quotientMeaning: 'Nine octagons have 72 sides in all.',
    animationType: 'array-model',
    unitLabel: 'sides',
    groupLabel: 'octagons',
    explanation: 'The prompt gives 9 octagons and 8 sides on each octagon. Skip-count by eights or multiply 9 x 8.',
    validationChecks: ['The model shows 9 octagons.', 'Each octagon contributes 8 sides.', 'The total is 72 sides.']
  },
  '11-1': {
    blankWorkspaceLabel: 'Split 32 students into 8 equal field-trip groups.',
    blankVisualType: 'share-tape',
    blankEquations: ['32 divided by 8 = n', 'n = ____'],
    equations: ['32 divided by 8 = n', 'n = 4'],
    knownTotal: 32,
    knownGroupCount: 8,
    quotient: 4,
    quotientMeaning: 'The unknown n is 4 students in each group.',
    animationType: 'equal-sharing',
    unitLabel: 'students',
    groupLabel: 'groups',
    explanation: 'The Teacher Edition Answer Key confirms n = 4. The model splits 32 students into 8 equal groups.',
    validationChecks: ['The total is 32 students.', 'There are 8 equal groups.', 'Each group has 4 students.']
  },
  '11-2': {
    blankWorkspaceLabel: 'Show 6 packs of printer paper at 8 dollars each.',
    blankVisualType: 'array-template',
    blankEquations: ['6 x 8 = m', 'm = ____'],
    equations: ['6 x 8 = m', 'm = 48'],
    knownGroupCount: 6,
    knownGroupSize: 8,
    quotient: 48,
    quotientMeaning: 'The unknown m is 48 dollars.',
    animationType: 'array-model',
    unitLabel: 'dollars',
    groupLabel: 'packs',
    explanation: 'The prompt gives 6 packs and 8 dollars per pack. Multiply to find the total amount Tara spends.',
    validationChecks: ['The model shows 6 packs.', 'Each pack costs 8 dollars.', 'The total is 48 dollars.']
  },
  '11-3': {
    blankWorkspaceLabel: 'Group 24 dollars into 8-dollar kilograms of coffee beans.',
    blankVisualType: 'bar-units',
    blankEquations: ['24 divided by 8 = c', 'c = ____'],
    equations: ['24 divided by 8 = c', 'c = 3'],
    knownTotal: 24,
    knownGroupSize: 8,
    quotient: 3,
    quotientMeaning: 'The unknown c is 3 kilograms of coffee beans.',
    animationType: 'grouping-by-size',
    unitLabel: 'dollars',
    groupLabel: 'kilograms',
    explanation: 'The source shows $8 for 1 kilogram. The Teacher Edition Answer Key gives c = 3.',
    validationChecks: ['The model starts with 24 dollars.', 'Each kilogram costs 8 dollars.', 'The result is 3 kilograms.']
  },
  '15-1': {
    blankWorkspaceLabel: 'Group 36 dollars into gifts of 9 dollars each.',
    blankVisualType: 'bar-units',
    equations: ['36 divided by 9 = 4'],
    knownTotal: 36,
    knownGroupSize: 9,
    quotient: 4,
    quotientMeaning: 'Mrs. Parson has 4 grandchildren.',
    animationType: 'grouping-by-size',
    unitLabel: 'dollars',
    groupLabel: 'grandchildren',
    explanation: 'The prompt gives 36 dollars total and 9 dollars for each grandchild. Four groups of 9 make 36.',
    validationChecks: ['The total is 36 dollars.', 'Each grandchild receives 9 dollars.', 'The answer is 4 grandchildren.']
  },
  '15-2': {
    blankWorkspaceLabel: 'Share 27 liters equally into 9 containers.',
    blankVisualType: 'share-tape',
    equations: ['27 divided by 9 = 3'],
    knownTotal: 27,
    knownGroupCount: 9,
    quotient: 3,
    quotientMeaning: 'Each container has 3 liters of water.',
    animationType: 'equal-sharing',
    unitLabel: 'liters',
    groupLabel: 'containers',
    explanation: 'The source problem gives 27 liters and 9 equal containers. The Teacher Edition Answer Key gives 3 L.',
    validationChecks: ['The model uses 9 containers.', 'All 27 liters are shared.', 'Each container receives 3 liters.']
  },
  '15-3': {
    blankWorkspaceLabel: 'Show 7 wire pieces with 9 meters in each piece.',
    blankVisualType: 'array-template',
    equations: ['7 x 9 = 63'],
    knownGroupCount: 7,
    knownGroupSize: 9,
    quotient: 63,
    quotientMeaning: 'The total wire length is 63 meters.',
    animationType: 'array-model',
    unitLabel: 'meters',
    groupLabel: 'pieces',
    explanation: 'The prompt gives 7 pieces and 9 meters per piece. Multiply 7 x 9 to find the total length.',
    validationChecks: ['The model shows 7 pieces.', 'Each piece is 9 meters.', 'The total is 63 meters.']
  },
  '15-4': {
    blankWorkspaceLabel: 'Share the 63-dollar limousine cost among 9 people.',
    blankVisualType: 'share-tape',
    equations: ['63 divided by 9 = 7'],
    knownTotal: 63,
    knownGroupCount: 9,
    quotient: 7,
    quotientMeaning: 'Each person pays 7 dollars.',
    animationType: 'equal-sharing',
    unitLabel: 'dollars',
    groupLabel: 'people',
    explanation: 'Aunt Deena, Uncle Chris, and 7 friends make 9 people. The Teacher Edition Answer Key gives $7 each.',
    validationChecks: ['The model uses 9 equal shares.', 'The whole cost is 63 dollars.', 'Each share is 7 dollars.']
  },
  '16-2': {
    blankWorkspaceLabel: 'Match each zero-and-one equation to its solution for n.',
    blankVisualType: 'fact-match',
    blankEquations: [
      '1 x n = 3 -> n = ____',
      'n divided by 4 = 0 -> n = ____',
      '1 x 6 = n -> n = ____',
      '7 divided by 7 = n -> n = ____',
      'n x 1 = 9 -> n = ____',
      'n divided by 1 = 8 -> n = ____'
    ],
    equations: [
      '1 x 3 = 3',
      '0 divided by 4 = 0',
      '1 x 6 = 6',
      '7 divided by 7 = 1',
      '9 x 1 = 9',
      '8 divided by 1 = 8'
    ],
    quotient: 1,
    quotientMeaning: 'Each solution is the value of n that makes the matched equation true.',
    animationType: 'fact-match',
    explanation: 'Use the identity property of multiplication and the division rules for 0 and 1 to match each equation to its solution.',
    validationChecks: [
      'Multiplying by 1 leaves the number unchanged.',
      'Zero divided into equal groups gives 0 in each group.',
      'A number divided by itself equals 1.',
      'A number divided by 1 equals the same number.'
    ]
  },
  '16-3': {
    blankWorkspaceLabel: 'Complete the n x 1 pattern table.',
    blankVisualType: 'equation-workspace',
    blankEquations: [
      '1 x 1 = ____',
      '2 x 1 = ____',
      '3 x 1 = ____',
      '4 x 1 = ____',
      '5 x 1 = ____',
      '6 x 1 = ____',
      '7 x 1 = ____',
      '8 x 1 = ____',
      '9 x 1 = ____',
      'n x 1 = ____'
    ],
    equations: [
      '1 x 1 = 1',
      '2 x 1 = 2',
      '3 x 1 = 3',
      '4 x 1 = 4',
      '5 x 1 = 5',
      '6 x 1 = 6',
      '7 x 1 = 7',
      '8 x 1 = 8',
      '9 x 1 = 9',
      'n x 1 = n'
    ],
    quotient: 1,
    quotientMeaning: 'The product is the same as the factor multiplied by 1.',
    animationType: 'two-step-model',
    explanation: 'The official table shows that every number multiplied by 1 keeps its value, so n x 1 = n.',
    validationChecks: [
      'Every row keeps the same factor as the product.',
      'The final row uses n to state the general pattern.',
      'The pattern is multiplication by 1, not skip-counting by a new unit.'
    ]
  },
  '18-1': {
    blankWorkspaceLabel: 'Find the known yarn length first, then subtract from the total.',
    blankVisualType: 'tape-diagram',
    equations: ['6 x 9 = 54', '81 - 54 = 27'],
    knownGroupCount: 6,
    knownGroupSize: 9,
    quotient: 27,
    quotientMeaning: 'Sasha gives Rose a 27-centimeter piece of yarn.',
    animationType: 'two-step-model',
    unitLabel: 'centimeters',
    groupLabel: 'yarn pieces',
    explanation: 'Rose starts with 6 pieces of 9 centimeters, or 54 centimeters. The total after Sasha gives her yarn is 81 centimeters, so the new piece is 27 centimeters.',
    validationChecks: ['The 6 equal pieces are each 9 cm.', 'The starting yarn total is subtracted from 81 cm.', 'The answer is in centimeters.']
  },
  '18-2': {
    blankWorkspaceLabel: 'Add spelling-homework time and math-homework time.',
    blankVisualType: 'array-template',
    equations: ['7 x 4 = 28', '29 + 28 = 57'],
    knownGroupCount: 7,
    knownGroupSize: 4,
    quotient: 57,
    quotientMeaning: 'Julio spends 57 minutes on homework in all.',
    animationType: 'two-step-model',
    unitLabel: 'minutes',
    groupLabel: 'math problems',
    explanation: 'Seven math problems at 4 minutes each take 28 minutes. Add the 29 spelling minutes for 57 minutes total.',
    validationChecks: ['The model uses 7 math problems.', 'Each problem takes 4 minutes.', 'The spelling time is added after the math time is found.']
  },
  '18-3': {
    blankWorkspaceLabel: 'Subtract given-away stickers, then divide remaining stickers by page size.',
    blankVisualType: 'bar-units',
    equations: ['125 - 53 = 72', '72 divided by 9 = 8'],
    knownTotal: 72,
    knownGroupSize: 9,
    quotient: 8,
    quotientMeaning: 'Pearl puts stickers on 8 pages.',
    animationType: 'grouping-by-size',
    unitLabel: 'stickers',
    groupLabel: 'pages',
    explanation: 'Pearl has 72 stickers left after giving away 53. Nine stickers fit on each page, so 72 divided by 9 gives 8 pages.',
    validationChecks: ['The 53 stickers are removed first.', 'Each page gets 9 stickers.', 'All remaining stickers are used.']
  },
  '18-4': {
    blankWorkspaceLabel: 'Find the added water, then divide by 8 milliliters per friend.',
    blankVisualType: 'bar-units',
    equations: ['93 - 45 = 48', '48 divided by 8 = 6'],
    knownTotal: 48,
    knownGroupSize: 8,
    quotient: 6,
    quotientMeaning: 'Six friends poured water into the beaker.',
    animationType: 'grouping-by-size',
    unitLabel: 'milliliters',
    groupLabel: 'friends',
    explanation: 'The water increased by 48 milliliters. Each friend added 8 milliliters, so 6 friends added water.',
    validationChecks: ['The starting 45 mL is subtracted from 93 mL.', 'Each group is 8 mL.', 'The answer names friends, not milliliters.']
  },
  '18-5': {
    blankWorkspaceLabel: 'Subtract the ruler weight, then share the pencil weight equally.',
    blankVisualType: 'share-tape',
    equations: ['55 - 19 = 36', '36 divided by 4 = 9'],
    knownTotal: 36,
    knownGroupCount: 4,
    quotient: 9,
    quotientMeaning: 'Each pencil weighs 9 grams.',
    animationType: 'equal-sharing',
    unitLabel: 'grams',
    groupLabel: 'pencils',
    explanation: 'The pencils together weigh 36 grams after subtracting the 19-gram ruler. Four identical pencils share 36 grams equally, so each weighs 9 grams.',
    validationChecks: ['The ruler weight is removed first.', 'The remaining weight is split across 4 identical pencils.', 'The answer is in grams.']
  },
  '19-4': {
    blankWorkspaceLabel: 'Show 6 buses with 40 students on each bus.',
    blankVisualType: 'equation-workspace',
    equations: ['6 x 40 = 240'],
    knownGroupCount: 6,
    knownGroupSize: 40,
    quotient: 240,
    quotientMeaning: 'The total is 240 students.',
    animationType: 'two-step-model',
    unitLabel: 'students',
    groupLabel: 'buses',
    explanation: 'The Teacher Edition Answer Key gives 240. The tape diagram models 6 groups of 40.',
    validationChecks: ['The model shows 6 buses.', 'Each bus has 40 students.', 'The total is 240 students.']
  },
  '21-1': {
    blankWorkspaceLabel: 'Show 5 full minutes of 60 seconds and one extra 45-second part.',
    blankVisualType: 'tape-diagram',
    equations: ['5 x 60 = 300', '300 + 45 = 345'],
    knownTotal: 345,
    knownGroupCount: 6,
    quotient: 345,
    quotientMeaning: 'The total time is 345 seconds.',
    animationType: 'two-step-model',
    unitLabel: 'seconds',
    groupLabel: 'time parts',
    explanation: 'The source states 60 seconds in 1 minute. Five minutes is 300 seconds, and 300 + 45 = 345 seconds.',
    validationChecks: ['The work converts 5 minutes to 300 seconds.', 'The extra 45 seconds is added.', 'The total matches the Teacher Edition Answer Key.']
  },
  '21-3': {
    blankWorkspaceLabel: 'Add 48 cans and 32 bottles, then count 5 cents for each item.',
    blankVisualType: 'equation-workspace',
    equations: ['48 + 32 = 80', '80 x 5 = 400'],
    knownGroupCount: 80,
    knownGroupSize: 5,
    quotient: 400,
    quotientMeaning: 'Brad earns 400 cents.',
    animationType: 'two-step-model',
    unitLabel: 'cents',
    groupLabel: 'recycled items',
    explanation: 'The prompt gives 48 cans, 32 bottles, and 5 cents for each item. The Teacher Edition Answer Key gives 400 cents.',
    validationChecks: ['The count of items is 80.', 'Each item earns 5 cents.', 'The total is 400 cents.']
  },
  '21-4': {
    blankWorkspaceLabel: 'Subtract the empty box weight, then share the marker weight across 10 markers.',
    blankVisualType: 'share-tape',
    equations: ['105 - 15 = 90', '90 divided by 10 = 9'],
    knownTotal: 90,
    knownGroupCount: 10,
    quotient: 9,
    quotientMeaning: 'Each marker weighs 9 grams.',
    animationType: 'equal-sharing',
    unitLabel: 'grams',
    groupLabel: 'markers',
    explanation: 'The box and markers weigh 105 grams, and the empty box weighs 15 grams. The markers weigh 90 grams total, so each marker weighs 9 grams.',
    validationChecks: ['The empty box weight is subtracted first.', 'The remaining 90 grams is shared across 10 markers.', 'The answer is 9 grams per marker.']
  },
  '21-6': {
    blankWorkspaceLabel: 'Show 7 hours on Monday and 7 hours on Wednesday at 9 dollars per hour.',
    blankVisualType: 'equation-workspace',
    equations: ['7 x 9 = 63', '63 x 2 = 126'],
    knownGroupCount: 14,
    knownGroupSize: 9,
    quotient: 126,
    quotientMeaning: 'Ezra earns 126 dollars each week.',
    animationType: 'two-step-model',
    unitLabel: 'dollars',
    groupLabel: 'hours',
    explanation: 'The source problem gives 9 dollars per hour and 7 hours on each of two days. The Teacher Edition Answer Key gives $126.',
    validationChecks: ['The model uses 14 hours total.', 'Each hour earns 9 dollars.', 'The weekly total is 126 dollars.']
  }
};

function visualType(prompt: string): ProblemSetBlankVisualType {
  const text = prompt.toLowerCase();
  if (text.includes('match') || text.includes('riddle')) return 'fact-match';
  if (text.includes('chart') || text.includes('table') || text.includes('pattern') || text.includes('complete')) return 'equation-workspace';
  if (text.includes('array')) return 'array-template';
  if (text.includes('draw') || text.includes('model') || text.includes('diagram')) return 'tape-diagram';
  return 'equation-workspace';
}

function animationType(prompt: string): ProblemSetAnimationType {
  const text = prompt.toLowerCase();
  if (text.includes('number bond') || text.includes('break') || text.includes('decompos')) return 'decompose-array';
  if (text.includes('match') || text.includes('riddle')) return 'fact-match';
  return 'two-step-model';
}

const EXTRACTED_PROMPT_TAILS: Record<string, string> = {
  '2-1': 'multiplication facts 5 × n + n to 6 × n and n × 6 where n is the size of the unit.',
  '2-2': 'multiplication facts 5 × n + n to 6 × n and n × 6 where n is the size of the unit.',
  '2-5': 'multiplication facts 5 × n + n to 6 × n and n × 6 where n is the size of the unit.',
  '3-1': 'the unknown.',
  '3-2': 'the unknown.',
  '3-4': 'the unknown.',
  '4-1': 'to decompose.',
  '4-5': 'to decompose.',
  '5-1': 'to decompose.',
  '5-4': 'to decompose.',
  '6-1': 'using units of 6 and 7.',
  '6-5': 'using units of 6 and 7.',
  '7-2': 'using units of 6 and 7.',
  '7-3': 'using units of 6 and 7.',
  '11-3': 'problems.',
  '11-6': 'problems.',
  '15-3': 'problems.',
  '15-6': 'problems.',
  '16-3': 'of 0 and 1 as they relate to multiplication and division.',
  '16-5': 'of 0 and 1 as they relate to multiplication and division.',
  '17-1': 'multiplication table.',
  '17-2': 'multiplication table.',
  '18-2': 'the reasonableness of solutions.',
  '18-5': 'the reasonableness of solutions.',
  '20-1': 'n × (m × 10) = (n × m) × 10 (where n and m are less than 10) to multiply by multiples of 10.',
  '20-3': 'n × (m × 10) = (n × m) × 10 (where n and m are less than 10) to multiply by multiples of 10.',
  '21-3': 'factors and multiples of 10.',
  '21-6': 'factors and multiples of 10.'
};

const SOURCE_PROMPT_OVERRIDES: Record<string, string> = {
  '1-1': 'a. Solve. Shade in the multiplication facts that you already know. Then, shade in the facts for sixes, sevens, eights, and nines that you can solve using the commutative property. b. Complete the chart. Each bag contains 7 apples.',
  '1-2': 'Use the array to write two different multiplication sentences.',
  '1-3': 'Complete the equations. a. 2 sevens = ____ twos. b. 3 ____ = 6 threes. c. 10 eights = 8 ____. d. 4 x ____ = 6 x 4. e. 8 x 5 = ____ x 8. f. ____ x 7 = 7 x ____. g. 3 x 9 = 10 threes - ____ three. h. 10 fours - 1 four = ____ x 4. i. 8 x 4 = 5 fours + ____ fours. j. ____ fives + 1 five = 6 x 5. k. 5 threes + 2 threes = ____ x ____. l. ____ twos + ____ twos = 10 twos.',
  '2-1': 'Each unit has a value of 7. Complete the unit form, facts, and totals for 5 sevens and 6 sevens using 5 sevens plus 1 more seven.',
  '2-2': 'a. Each dot has a value of 8. Complete the unit form, facts, and total for 5 eights. b. Use the fact above to find 8 x 6. Show your work using pictures, numbers, or words.',
  '2-3': 'An author writes 9 pages of her book each week. How many pages does she write in 7 weeks? Use a fives fact to solve.',
  '2-4': 'Mrs. Gonzalez buys a total of 32 crayons for her classroom. Each pack contains 8 crayons. How many packs of crayons does Mrs. Gonzalez buy?',
  '2-5': 'Hannah has $500. She buys a camera for $435 and 4 other items for $9 each. Now Hannah wants to buy speakers for $50. Does she have enough money to buy the speakers? Explain.',
  '3-1': 'Each equation contains a letter representing the unknown. Find the value of the unknowns, and then write the letters that match the answers to solve the riddle.',
  '3-2': 'Lonna buys 3 t-shirts for $8 each. a. What is the total amount Lonna spends on 3 t-shirts? Use the letter m to represent the total amount of money Lonna spends, and then solve the problem. b. If Lonna hands the cashier 3 ten dollar bills, how much change will she receive? Use the letter c in an equation to represent the change, and then find the value of c.',
  '3-3': 'Miss Potts used a total of 28 cups of flour to bake some bread. She used 4 cups of flour for each loaf of bread. How many loaves of bread did she bake? Represent the problem using multiplication and division sentences and a letter for the unknown. Then, solve the problem.',
  '3-4': 'At a table tennis tournament, two games went on for a total of 32 minutes. One game took 12 minutes longer than the other. How long did it take to complete each game? Use letters to represent the unknowns. Solve the challenge problem.',
  '4-1': 'Skip-count by six to fill in the blanks. Match each number in the count-by with its multiplication fact.',
  '4-2': 'Count by six to fill in the blanks below.',
  '4-3': 'Count by six to fill in the blanks below. Complete the multiplication equation that represents the final number in your count-by. Complete the division equation that represents your count-by.',
  '4-4': 'Mrs. Byrne\'s class skip-counts by six for a group counting activity. When she points up, they count up by six, and when she points down, they count down by six. The arrows show when she changes direction. a. Fill in the blanks to show the group counting answers. b. Write a multiplication sentence and a division sentence to show the last number is the product of 6 and another number.',
  '4-5': 'Julie counts by six to solve 6 x 7. She says the answer is 36. Is she right? Explain your answer.',
  '5-1': 'Skip-count by seven to fill in the blanks in the fish bowls. Match each count-by to its multiplication expression. Then, use the multiplication expression to write the related division fact directly to the right.',
  '5-2': 'Complete the count-by seven sequence. Then, write a multiplication equation and a division equation to represent each blank you filled in.',
  '5-3': 'Abe says 3 x 7 = 21 because 1 seven is 7, 2 sevens are 14, and 3 sevens are 14 + 6 + 1, which equals 21. Why did Abe add 6 and 1 to 14 when he is counting by seven?',
  '5-4': 'Molly says she can count by seven 6 times to solve 7 x 6. James says he can count by six 7 times to solve this problem. Who is right? Explain your answer.',
  '6-1': 'Label the tape diagrams. Then, fill in the blanks to make the statements true for 6 x 6, 7 x 6, 8 x 6, and 9 x 6 using 5 x 6 plus the remaining groups.',
  '6-2': 'Break apart 54 to solve 54 divided by 6.',
  '6-3': 'Break apart 49 to solve 49 divided by 7.',
  '6-4': 'Robert says that he can solve 6 x 8 by thinking of it as (5 x 8) + 8. Is he right? Draw a picture to help explain your answer.',
  '6-5': 'Kelly solves 42 divided by 7 by using a number bond to break apart 42 into two parts. Show what her work might look like below.',
  '7-1': 'Match the words to the correct equation.',
  '7-2': 'Write an equation to represent the tape diagram, and solve for the unknown. The tape diagram shows six equal parts labeled 8 and a total labeled k.',
  '7-3': 'Model each problem with a drawing. Then, write an equation using a letter to represent the unknown, and solve for the unknown. a. Each student gets 3 pencils. There are a total of 21 pencils. How many students are there? b. Henry spends 24 minutes practicing 6 different basketball drills. He spends the same amount of time on each drill. How much time does Henry spend on each drill? c. Jessica has 8 pieces of yarn for a project. Each piece of yarn is 6 centimeters long. What is the total length of the yarn? d. Ginny measures 6 milliliters of water into each beaker. She pours a total of 54 milliliters. How many beakers does Ginny use?',
  '8-1': 'Solve. Complete the expressions with parentheses already shown, including parts a through p.',
  '8-2': 'Use parentheses to make the equations true.',
  '8-3': 'The teacher writes 24 divided by 4 plus 2 equals blank on the board. Chad says it equals 8. Samir says it equals 4. Explain how placing the parentheses in the equation can make both answers true.',
  '8-4': 'Natasha solves 12 + 15 divided by 3 by finding the sum of 5 and 12. Place the parentheses in the equation to show her thinking. Then, solve.',
  '8-5': 'Find two possible answers to the expression 7 + 3 x 2 by placing the parentheses in different places.',
  '9-1': 'Use the array to complete the equation. a. 3 x 12 = ____. b. (3 x 3) x 4 = ____ x 4 = ____. c. 3 x 14 = ____. d. (____ x ____) x 7 = ____ x ____ = ____.',
  '9-2': 'Place parentheses in the equations to simplify. Then, solve. The first one has been done for you.',
  '9-3': 'Charlotte finds the answer to 16 x 2 by thinking about 8 x 4. Explain her strategy.',
  '9-4': 'Explain Charlotte\'s associative-property strategy: 16 x 2 can be regrouped as 8 x 4 because 16 is 8 x 2 and (8 x 2) x 2 = 8 x 4.',
  '10-1': 'Label the arrays. Then, fill in the blanks below to make the statements true for 8 x 8 and 8 x 9 using 8 x 5 plus the remaining columns.',
  '10-2': 'Break apart and distribute to solve 56 divided by 8.',
  '10-3': 'Break apart and distribute to solve 72 divided by 8.',
  '10-4': 'An octagon has 8 sides. Skip-count to find the total number of sides on 9 octagons.',
  '10-5': 'Multiply: 8 x 6, 3 x 8, 4 x 8, 8 x 10, 8 x 8, and 7 x 8.',
  '10-6': 'Match each division expression to its quotient: 24 divided by 8, 32 divided by 8, 16 divided by 8, 64 divided by 8, 48 divided by 8, and 72 divided by 8.',
  '11-1': 'Ms. Santor divides 32 students into 8 equal groups for a field trip. Draw a tape diagram, and label the number of students in each group as n. Write an equation, and solve for n.',
  '11-2': 'Tara buys 6 packs of printer paper. Each pack of paper costs $8. Draw a tape diagram, and label the total amount she spends as m. Write an equation, and solve for m.',
  '11-3': 'Mr. Reed spends $24 on coffee beans. How many kilograms of coffee beans does he buy? Draw a tape diagram, and label the total amount of coffee beans he buys as c. Write an equation, and solve for c. The source label is $8 for 1 kg.',
  '11-4': 'Eight boys equally share 4 packs of baseball cards. Each pack contains 10 cards. How many cards does each boy get?',
  '11-5': 'There are 8 bags of yellow and green balloons. Each bag contains 7 balloons. If there are 35 yellow balloons, how many green balloons are there?',
  '11-6': 'The fruit seller packs 72 oranges into bags of 8 each. He sells all the oranges at $4 a bag. How much money did he receive?',
  '12-1': 'Each unit has a value of 9. Find the value of each row. Then, add the rows to find the total for 6 x 9, 7 x 9, 8 x 9, and 9 x 9.',
  '12-2': 'Find the total value of the shaded blocks using 9 = 10 - 1 for 9 x 6, 9 x 7, 9 x 8, and 9 x 9.',
  '12-3': 'Matt buys a pack of postage stamps. He counts 9 rows of 4 stamps. He thinks of 10 fours to find the total number of stamps. Show the strategy that Matt might have used to find the total number of stamps.',
  '12-4': 'Match the products and quotients for nines facts.',
  '13-1': 'a. Skip-count by nine. b. Look at the tens place in the count-by. What is the pattern? c. Look at the ones place in the count-by. What is the pattern?',
  '13-2': 'Complete to make true statements using the add 10, subtract 1 pattern for 1 x 9 through 10 x 9.',
  '13-3': 'a. Analyze the equations in Problem 2. What is the pattern? b. Use the pattern to find the next 4 facts. c. Use Kent\'s tens-and-ones digit strategy to solve 6 x 9 and 7 x 9. d. Show an example of when Kent\'s pattern does not work.',
  '13-4': 'Each equation contains a letter representing the unknown. Find the value of each unknown. Then, write the letters that match the answers to solve the riddle.',
  '14-1': 'a. Multiply. Then, add the tens digit and ones digit of each product. b. What is the sum of the digits in each product? How can this strategy help you check your work with the nines facts? c. Araceli continues to count by nines and says the sum of the digits is still 9. Is she correct? Why or why not?',
  '14-2': 'Araceli uses the number of groups in 8 x 9 to help her find the product. She uses 8 - 1 = 7 for the tens digit and 10 - 8 = 2 for the ones digit. Use her strategy to find 4 more facts.',
  '14-3': 'Dennis calculates 9 x 8 by thinking about it as 80 - 8 = 72. Explain Dennis\' strategy.',
  '14-4': 'Sonya figures out the answer to 7 x 9 by putting down her right index finger. What is the answer? Explain how to use Sonya\'s finger strategy.',
  '15-1': 'Write an equation, and use a letter to represent the unknown. Mrs. Parson gave each of her grandchildren $9. She gave a total of $36. How many grandchildren does Mrs. Parson have?',
  '15-2': 'Write an equation, and use a letter to represent the unknown. Shiva pours 27 liters of water equally into 9 containers. How many liters of water are in each container?',
  '15-3': 'Write an equation, and use a letter to represent the unknown. Derek cuts 7 pieces of wire. Each piece is 9 meters long. What is the total length of the 7 pieces?',
  '15-4': 'Write an equation, and use a letter to represent the unknown. Aunt Deena and Uncle Chris share the cost of a limousine ride with their 7 friends. The ride cost a total of $63. If everyone shares the cost equally, how much does each person pay?',
  '15-5': 'Write an equation, and use a letter to represent the unknown. Cara bought 9 packs of beads. There are 10 beads in each pack. She always uses 30 beads to make each necklace. How many necklaces can she make if she uses all the beads?',
  '15-6': 'Write an equation, and use a letter to represent the unknown. There are 8 erasers in a set. Damon buys 9 sets. After giving some erasers away, Damon has 35 erasers left. How many erasers did he give away?',
  '16-1': 'Complete the multiplication and division statements using the rules for multiplying and dividing with 0 and 1.',
  '16-2': 'Match each equation with its solution.',
  '16-3': 'Let n be a number. Complete the blanks with the products for 1 x 1 through n x 1. What pattern do you notice?',
  '16-4': 'Josie says that any number divided by 1 equals that number. a. Write a division equation using n to represent Josie\'s statement. b. Let n = 6. Write a new equation, and draw a picture to show that your equation is true. c. Write the related multiplication equation that you can use to check your division equation.',
  '16-5': 'Matt explains what he learned about dividing with zero to his little sister. a. What might Matt tell his sister about solving 0 divided by 9? b. What might Matt tell his sister about solving 8 divided by 0? c. What might Matt tell his sister about solving 0 divided by 0?',
  '17-1': 'Write the products into the 1-by-1 through 8-by-8 multiplication table as fast as you can. a. Color all the squares with even products orange. Can an even product ever have an odd factor? b. Can an odd product ever have an even factor? c. Everyone knows that 7 x 4 = (5 x 4) + (2 x 4). Explain how this is shown in the table. d. Use what you know to find the product of 7 x 16, or 8 sevens + 8 sevens.',
  '17-2': 'In the table, only the products on the diagonal are shown. a. Label each product on the diagonal. b. Draw an array to match each expression in the table, and label the number of squares added to make each new array. c. What pattern do you notice in the number of squares that are added to each new array? d. Use the pattern to prove that 9 x 9 is the sum of the first 9 odd numbers.',
  '18-1': 'Use the RDW process. Explain why your answer is reasonable. Rose has 6 pieces of yarn that are each 9 centimeters long. Sasha gives Rose a piece of yarn. Now, Rose has a total of 81 centimeters of yarn. What is the length of the yarn that Sasha gives Rose?',
  '18-2': 'Use the RDW process. Explain why your answer is reasonable. Julio spends 29 minutes doing his spelling homework. He then completes each math problem in 4 minutes. There are 7 math problems. How many minutes does Julio spend on his homework in all?',
  '18-3': 'Use the RDW process. Explain why your answer is reasonable. Pearl buys 125 stickers. She gives 53 stickers to her little sister. Pearl then puts 9 stickers on each page of her album. If she uses all of her remaining stickers, on how many pages does Pearl put stickers?',
  '18-4': 'Use the RDW process. Explain why your answer is reasonable. Tanner\'s beaker had 45 milliliters of water in it at first. After each of his friends poured in 8 milliliters, the beaker contained 93 milliliters. How many friends poured water into Tanner\'s beaker?',
  '18-5': 'Use the RDW process. Explain why your answer is reasonable. Cora weighs 4 new, identical pencils and a ruler. The total weight of these items is 55 grams. She weighs the ruler by itself and it weighs 19 grams. How much does each pencil weigh?',
  '19-1': 'Use the disks to fill in the blanks in the equations for 4 x 3 ones and 4 x 3 tens.',
  '19-2': 'Use the chart to complete the blanks in the equations for 2 x 4 ones, 2 x 4 tens, 3 x 5 ones, 3 x 5 tens, 4 x 5 ones, and 4 x 5 tens.',
  '19-3': 'Fill in the blank to make each equation true: 7 x 2, 7 tens x 2, 8 x 3, 8 tens x 3, 60 x 5, 4 x 80, 7 x 40, and 50 x 8.',
  '19-4': 'A bus can carry 40 passengers. How many passengers can 6 buses carry? Model with a tape diagram.',
  '20-1': 'Use the chart to complete the equations. Then, solve. The first one has been done for you: (2 x 4) x 10, 2 x (4 x 10), (3 x 5) x 10, and 3 x (5 x 10).',
  '20-2': 'Place parentheses in the equations to find the related fact. Then, solve. The first one has been done for you.',
  '20-3': 'Gabriella solves 20 x 4 by thinking about 10 x 8. Explain her strategy.',
  '21-1': 'There are 60 seconds in 1 minute. Use a tape diagram to find the total number of seconds in 5 minutes and 45 seconds.',
  '21-2': 'Lupe saves $30 each month for 4 months. Does she have enough money to buy the art supplies for $142? Explain why or why not.',
  '21-3': 'Brad receives 5 cents for each can or bottle he recycles. How many cents does Brad earn if he recycles 48 cans and 32 bottles?',
  '21-4': 'A box of 10 markers weighs 105 grams. If the empty box weighs 15 grams, how much does each marker weigh?',
  '21-5': 'Mr. Perez buys 3 sets of cards. Each set comes with 18 striped cards and 12 polka dot cards. He uses 49 cards. How many cards does he have left?',
  '21-6': 'Ezra earns $9 an hour working at a book store. She works for 7 hours each day on Mondays and Wednesdays. How much does Ezra earn each week?'
};

const EQUATION_OVERRIDES: Record<string, string[]> = {
  '1-3': [
    '2 sevens = 7 twos',
    '3 sixes = 6 threes = 18',
    '10 eights = 8 tens = 80',
    '4 x 6 = 6 x 4 = 24',
    '8 x 5 = 5 x 8 = 40',
    '4 x 7 = 7 x 4 = 28',
    '3 x 9 = 27',
    '10 fours - 1 four = 9 x 4 = 36',
    '8 x 4 = 5 fours + 3 fours = 32',
    '5 fives + 1 five = 6 x 5 = 30',
    '5 threes + 2 threes = 7 x 3 = 21',
    '5 twos + 5 twos = 10 twos = 20'
  ],
  '1-2': ['24 = 4 x 6', '24 = 6 x 4'],
  '2-1': ['5 x 7 = 35', '35 + 7 = 42', '6 x 7 = 42', '7 x 6 = 42'],
  '2-2': ['5 x 8 = 40', '40 + 8 = 48', '6 x 8 = 48', '8 x 6 = 48'],
  '2-3': ['7 x 9 = 63'],
  '2-4': ['32 divided by 8 = 4'],
  '2-5': ['4 x 9 = 36', '500 - 435 = 65', '65 - 36 = 29', '29 < 50'],
  '3-1': ['5 x 4 = 20', '21 divided by 3 = 7', '24 divided by 6 = 4', '21 divided by 7 = 3', '32 divided by 8 = 4', '70 divided by 10 = 7', '80 divided by 8 = 10', '36 divided by 4 = 9'],
  '3-2': ['3 x 8 = 24', '30 - 24 = 6'],
  '3-3': ['4 x 7 = 28', '28 divided by 4 = 7'],
  '3-4': ['32 - 12 = 20', '20 divided by 2 = 10', '10 + 12 = 22'],
  '4-1': ['2 x 6 = 12', '4 x 6 = 24', '7 x 6 = 42', '9 x 6 = 54'],
  '4-2': ['2 x 6 = 12', '3 x 6 = 18', '4 x 6 = 24', '24 divided by 6 = 4'],
  '4-3': ['7 x 6 = 42', '42 divided by 6 = 7'],
  '4-4': ['6 x 8 = 48', '48 divided by 6 = 8'],
  '4-5': ['6 x 7 = 42'],
  '5-1': ['7 x 6 = 42', '42 divided by 7 = 6', '7 x 3 = 21', '21 divided by 7 = 3', '7 x 8 = 56', '56 divided by 7 = 8', '7 x 10 = 70', '70 divided by 7 = 10'],
  '5-2': ['3 x 7 = 21', '21 divided by 7 = 3', '5 x 7 = 35', '35 divided by 7 = 5', '7 x 7 = 49', '49 divided by 7 = 7', '8 x 7 = 56', '56 divided by 7 = 8'],
  '5-3': ['14 + 6 + 1 = 21', '3 x 7 = 21'],
  '5-4': ['7 x 6 = 42', '6 x 7 = 42'],
  '6-1': ['6 x 6 = 36', '7 x 6 = 42', '8 x 6 = 48', '9 x 6 = 54'],
  '6-2': ['54 divided by 6 = 9', '30 divided by 6 = 5', '24 divided by 6 = 4', '5 + 4 = 9'],
  '6-3': ['49 divided by 7 = 7', '35 divided by 7 = 5', '14 divided by 7 = 2', '5 + 2 = 7'],
  '6-4': ['5 x 8 = 40', '40 + 8 = 48', '6 x 8 = 48'],
  '6-5': ['42 divided by 7 = 6'],
  '7-1': ['n x 6 = 30', '7 x n = 42', '6 x 7 = n', '63 divided by n = 9', '36 divided by n = 6', 'n x 7 = 21'],
  '7-2': ['6 x 8 = 48', '8 x 6 = 48'],
  '7-3': ['21 divided by 3 = 7', '24 divided by 6 = 4', '8 x 6 = 48', '54 divided by 6 = 9'],
  '8-1': ['(12 - 4) + 6 = 14', '12 - (4 + 6) = 2', '15 - (7 + 3) = 5', '(15 - 7) + 3 = 11', '(3 + 2) x 6 = 30', '3 + (2 x 6) = 15', '4 x (7 - 2) = 20', '(4 x 7) - 2 = 26'],
  '8-2': ['(16 - 4) + 7 = 19', '16 - (4 + 7) = 5', '2 = 22 - (15 + 5)', '12 = (22 - 15) + 5', '(3 + 7) x 6 = 60', '3 + (7 x 6) = 45', '5 = (10 divided by 10) x 5', '50 = (100 divided by 10) x 5'],
  '8-3': ['(24 divided by 4) + 2 = 8', '24 divided by (4 + 2) = 4'],
  '8-4': ['12 + (15 divided by 3) = 17'],
  '8-5': ['(7 + 3) x 2 = 20', '7 + (3 x 2) = 13'],
  '9-1': ['3 x 12 = 36', '(3 x 3) x 4 = 9 x 4 = 36', '3 x 14 = 42', '(3 x 2) x 7 = 6 x 7 = 42'],
  '9-2': ['2 x 14 = 4 x 7 = 28', '3 x 12 = 9 x 4 = 36', '3 x 14 = 6 x 7 = 42', '15 x 3 = 5 x 9 = 45', '15 x 2 = 5 x 6 = 30'],
  '9-3': ['16 x 2 = 32', '8 x 4 = 32'],
  '9-4': ['16 x 2 = (8 x 2) x 2', '(8 x 2) x 2 = 8 x 4'],
  '10-1': ['8 x 8 = 64', '8 x 5 = 40', '8 x 3 = 24', '40 + 24 = 64', '8 x 9 = 72', '8 x 4 = 32', '40 + 32 = 72'],
  '10-2': ['56 divided by 8 = 7', '40 divided by 8 = 5', '16 divided by 8 = 2', '5 + 2 = 7'],
  '10-3': ['72 divided by 8 = 9', '40 divided by 8 = 5', '32 divided by 8 = 4', '5 + 4 = 9'],
  '10-4': ['9 x 8 = 72'],
  '10-5': ['8 x 6 = 48', '3 x 8 = 24', '4 x 8 = 32', '8 x 10 = 80', '8 x 8 = 64', '7 x 8 = 56'],
  '10-6': ['24 divided by 8 = 3', '32 divided by 8 = 4', '16 divided by 8 = 2', '64 divided by 8 = 8', '48 divided by 8 = 6', '72 divided by 8 = 9'],
  '11-1': ['32 divided by 8 = 4'],
  '11-2': ['6 x 8 = 48'],
  '11-3': ['24 divided by 8 = 3'],
  '11-4': ['4 x 10 = 40', '40 divided by 8 = 5'],
  '11-5': ['8 x 7 = 56', '56 - 35 = 21'],
  '11-6': ['72 divided by 8 = 9', '9 x 4 = 36'],
  '12-1': ['6 x 9 = 54', '7 x 9 = 63', '8 x 9 = 72', '9 x 9 = 81'],
  '12-2': ['10 x 6 = 60', '60 - 6 = 54', '10 x 7 = 70', '70 - 7 = 63', '10 x 8 = 80', '80 - 8 = 72', '10 x 9 = 90', '90 - 9 = 81'],
  '12-3': ['10 x 4 = 40', '40 - 4 = 36', '9 x 4 = 36'],
  '12-4': ['45 divided by 9 = 5', '3 x 9 = 27', '9 divided by 9 = 1', '9 x 9 = 81', '90 divided by 9 = 10', '8 x 9 = 72', '9 x 4 = 36', '72 divided by 9 = 8'],
  '13-1': ['2 x 9 = 18', '3 x 9 = 27', '5 x 9 = 45', '6 x 9 = 54', '7 x 9 = 63', '9 x 9 = 81', '10 x 9 = 90'],
  '13-2': ['1 x 9 = 9', '2 x 9 = 18', '3 x 9 = 27', '4 x 9 = 36', '5 x 9 = 45', '6 x 9 = 54', '7 x 9 = 63', '8 x 9 = 72'],
  '13-3': ['11 x 9 = 99', '12 x 9 = 108', '13 x 9 = 117', '14 x 9 = 126', '6 x 9 = 54', '7 x 9 = 63'],
  '13-4': ['54 divided by 9 = 6', '81 divided by 9 = 9', '9 x 8 = 72', '90 divided by 9 = 10', '9 x 7 = 63', '9 x 3 = 27', '9 x 4 = 36', '9 x 2 = 18'],
  '14-1': ['2 x 9 = 18', '3 x 9 = 27', '4 x 9 = 36', '5 x 9 = 45', '6 x 9 = 54', '7 x 9 = 63', '8 x 9 = 72', '9 x 9 = 81'],
  '14-2': ['8 x 9 = 72', '4 x 9 = 36', '6 x 9 = 54', '7 x 9 = 63', '9 x 9 = 81'],
  '14-3': ['9 x 8 = 80 - 8', '80 - 8 = 72'],
  '14-4': ['7 x 9 = 63'],
  '15-1': ['36 divided by 9 = 4'],
  '15-2': ['27 divided by 9 = 3'],
  '15-3': ['7 x 9 = 63'],
  '15-4': ['63 divided by 9 = 7'],
  '15-5': ['9 x 10 = 90', '90 divided by 30 = 3'],
  '15-6': ['8 x 9 = 72', '72 - 35 = 37'],
  '16-1': ['6 x 1 = 6', '0 divided by 7 = 0', '8 x 1 = 8', '9 divided by 1 = 9', '0 divided by 5 = 0', '4 divided by 4 = 1', '3 x 1 = 3'],
  '16-2': ['1 x 3 = 3', '0 divided by 4 = 0', '1 x 6 = 6', '7 divided by 7 = 1', '9 x 1 = 9', '8 divided by 1 = 8'],
  '16-3': ['1 x 1 = 1', '2 x 1 = 2', '3 x 1 = 3', '4 x 1 = 4', '5 x 1 = 5', '6 x 1 = 6', '7 x 1 = 7', '8 x 1 = 8'],
  '16-4': ['n divided by 1 = n', '6 divided by 1 = 6', '6 x 1 = 6'],
  '16-5': ['0 divided by 9 = 0'],
  '17-1': ['7 x 16 = 112', '8 x 7 = 56', '56 + 56 = 112'],
  '17-2': ['1 x 1 = 1', '2 x 2 = 4', '3 x 3 = 9', '4 x 4 = 16', '5 x 5 = 25', '6 x 6 = 36', '1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 = 81'],
  '18-1': ['6 x 9 = 54', '81 - 54 = 27'],
  '18-2': ['7 x 4 = 28', '29 + 28 = 57'],
  '18-3': ['125 - 53 = 72', '72 divided by 9 = 8'],
  '18-4': ['93 - 45 = 48', '48 divided by 8 = 6'],
  '18-5': ['55 - 19 = 36', '36 divided by 4 = 9'],
  '19-1': ['4 x 3 = 12', '4 x 30 = 120'],
  '19-2': ['2 x 4 = 8', '2 x 40 = 80', '3 x 5 = 15', '3 x 50 = 150', '4 x 5 = 20', '4 x 50 = 200'],
  '19-3': ['7 x 2 = 14', '7 tens x 2 = 14 tens', '8 x 3 = 24', '8 tens x 3 = 24 tens', '60 x 5 = 300', '4 x 80 = 320', '7 x 40 = 280', '50 x 8 = 400'],
  '19-4': ['6 x 40 = 240'],
  '20-1': ['(2 x 4) x 10 = 80', '2 x (4 x 10) = 80', '(3 x 5) x 10 = 150', '3 x (5 x 10) = 150'],
  '20-2': ['2 x 20 = 40', '2 x 30 = 60', '3 x 30 = 90', '2 x 50 = 100'],
  '20-3': ['20 x 4 = 80', '10 x 8 = 80'],
  '21-1': ['5 x 60 = 300', '300 + 45 = 345'],
  '21-2': ['4 x 30 = 120', '120 < 142'],
  '21-3': ['48 + 32 = 80', '80 x 5 = 400'],
  '21-4': ['105 - 15 = 90', '90 divided by 10 = 9'],
  '21-5': ['18 + 12 = 30', '3 x 30 = 90', '90 - 49 = 41'],
  '21-6': ['7 x 9 = 63', '63 x 2 = 126']
};

function cleanSourcePrompt(prompt: string, lessonNumber: number, problemNumber: number): string {
  const normalizedPrompt = prompt.replace(/\s+/g, ' ').trim();
  const extractedTail = EXTRACTED_PROMPT_TAILS[`${lessonNumber}-${problemNumber}`];
  if (extractedTail && normalizedPrompt.endsWith(extractedTail)) {
    return maskExtractedPromptEquations(normalizedPrompt.slice(0, -extractedTail.length).trim());
  }
  return maskExtractedPromptEquations(normalizedPrompt);
}

function equationsFromAnswer(answer: string, _sourceEquations: string[]): string[] {
  const answerEquations = answer.match(/\d+\s*(?:x|×|\+|-|divided by|÷)\s*\d+\s*=\s*\d+/g) ?? [];
  const equations = answerEquations
    .map(normalizeEquation)
    .filter((equation) => equation.length > 0 && !equation.includes('____') && !/^Teacher Edition Answer Key:/i.test(equation));
  const unique = Array.from(new Set(equations));
  return unique.length > 0 ? unique.slice(0, 8) : [];
}

function quotientFromAnswer(answer: string): number {
  const firstNumber = answer.match(/\b\d+\b/);
  return firstNumber ? Number(firstNumber[0]) : 1;
}

function createM3ProblemVisual(problem: ProblemSetCenteredProblem, solved: boolean, lessonNumber: number): ProblemVisualSpec {
  const lessonOneVisual = createM3Lesson1ProblemVisual(problem, solved, lessonNumber);
  if (lessonOneVisual) {
    return lessonOneVisual;
  }

  const acceleratedBatchVisual = createM3Lessons2Through5ProblemVisual(problem, solved, lessonNumber);
  if (acceleratedBatchVisual) {
    return acceleratedBatchVisual;
  }

  const sections: ProblemVisualSpec['sections'] = [];
  const sourceNote = solved
    ? 'Solved view uses the Module 3 Teacher Edition Answer Key and shows the reasoning needed to make that answer understandable.'
    : 'Blank view preserves the official student Problem Set structure without answer leakage.';

  const equations = problem.equations?.length ? problem.equations : [];

  const primaryModel = makeM3PrimaryModel(problem, solved, lessonNumber);
  const strategyFrame = makeM3StrategyFrame(problem, solved, lessonNumber, equations);
  const strategyIsPrimary = Boolean(strategyFrame) && (
    [19, 20].includes(lessonNumber)
    || (lessonNumber === 12 && problem.blankVisualType !== 'fact-match')
  );
  sections.push(strategyIsPrimary ? strategyFrame! : primaryModel);
  if (strategyFrame && !strategyIsPrimary) {
    sections.push(strategyFrame);
  }

  const equationLines = solved
    ? equations
    : problem.blankEquations?.length
      ? problem.blankEquations
      : equations.length
        ? blankEquationTemplates(equations)
        : [];

  if (equationLines.length && sections.length < 2) {
    sections.push({
      kind: 'equations',
      label: solved ? 'Complete source equations' : 'Source equation blanks',
      lines: equationLines
    });
  }

  sections.push({
    kind: 'note',
    label: solved ? 'Answer and meaning' : 'Student direction',
    text: solved
      ? `${teacherAnswerEvidence(problem.solvedAnswer)} ${problem.explanation}`
      : problem.blankWorkspaceLabel ?? sourceSpecificBlankWorkspaceLabel(problem)
  });

  return {
    title: `Problem ${problem.number}: ${m3VisualTitle(problem, solved)}`,
    sourceNote,
    sections
  };
}

function createM3Lessons2Through5ProblemVisual(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec | undefined {
  if (lessonNumber < 2 || lessonNumber > 5) {
    return undefined;
  }

  const sections: ProblemVisualSpec['sections'] = [makeM3PrimaryModel(problem, solved, lessonNumber)];
  const equationLines = solved
    ? problem.equations ?? []
    : problem.blankEquations?.length
      ? problem.blankEquations
      : blankEquationTemplates(problem.equations ?? []);

  if (equationLines.length) {
    sections.push({
      kind: 'equations',
      label: solved ? 'Completed source equations' : 'Source equation blanks',
      lines: equationLines
    });
  }

  if (solved) {
    sections.push({
      kind: 'note',
      label: 'Answer',
      text: teacherAnswerEvidence(problem.solvedAnswer)
    });
  }

  return {
    title: `Problem ${problem.number}`,
    sourceNote: solved
      ? `Completed from the Module 3 Lesson ${lessonNumber} Teacher Edition answer work.`
      : `Blank workspace preserves the Module 3 Lesson ${lessonNumber} Problem Set task and givens.`,
    sections
  };
}

function createM3Lesson1ProblemVisual(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec | undefined {
  if (lessonNumber !== 1) {
    return undefined;
  }

  const sourceNote = solved
    ? 'Completed from the Module 3 Lesson 1 Teacher Edition answer work.'
    : 'Blank workspace preserves the Module 3 Lesson 1 Problem Set givens.';

  if (problem.number === 1) {
    const factors = Array.from({ length: 10 }, (_, index) => index + 1);
    const sourceGivens = new Map([
      ['1-2', '2'],
      ['1-3', '3'],
      ['2-2', '4'],
      ['2-4', '8'],
      ['2-8', '16'],
      ['3-6', '18'],
      ['4-5', '20'],
      ['5-10', '50'],
      ['6-2', '12']
    ]);

    return {
      title: 'Problem 1: Use known facts and commutative partners',
      sourceNote,
      sections: [
        {
          kind: 'data-table',
          label: solved
            ? '100 multiplication facts: known facts and commutative partners are shaded'
            : 'Solve and shade the multiplication chart',
          columns: ['×', ...factors.map(String)],
          rows: factors.map((rowFactor) => [
            String(rowFactor),
            ...factors.map((columnFactor) => solved
              ? String(rowFactor * columnFactor)
              : sourceGivens.get(`${rowFactor}-${columnFactor}`) ?? '')
          ])
        },
        {
          kind: 'data-table',
          label: 'Each bag contains 7 apples',
          columns: ['Number of bags', '2', solved ? '3' : '', '4', '5', solved ? '6' : ''],
          rows: [[
            'Total apples',
            solved ? '14' : '',
            '21',
            solved ? '28' : '',
            solved ? '35' : '',
            '42'
          ]]
        },
        {
          kind: 'note',
          label: solved ? 'What the chart shows' : 'Use commutativity',
          text: solved
            ? 'Known facts and their commutative partners fill 84 of the 100 cells. The 16 unshaded cells are the 6-through-9 facts; 12 have partners, so there are 10 distinct facts to learn.'
            : 'Shade facts you know. Then reflect each known fact across the diagonal to shade its commutative partner for 6, 7, 8, and 9.'
        }
      ]
    };
  }

  if (problem.number === 2) {
    return {
      title: 'Problem 2: Read one array in two directions',
      sourceNote,
      sections: [
        {
          kind: 'array',
          label: '4 rows of 6 diamonds',
          rows: 4,
          columns: 6,
          item: 'square',
          caption: solved ? '24 diamonds can be read as 4 rows of 6 or 6 columns of 4.' : 'Count the diamonds, then read the rows and columns.'
        },
        {
          kind: 'equations',
          label: solved ? 'Two multiplication sentences for the same array' : 'Write two multiplication sentences',
          lines: solved
            ? ['24 = 4 × 6', '24 = 6 × 4']
            : ['____ = 4 × 6', '____ = 6 × 4']
        },
        {
          kind: 'note',
          text: 'Turning the array reverses the factors, but the number of diamonds stays the same.'
        }
      ]
    };
  }

  const sourceItems = [
    ['a', '2 sevens = ____ twos', '2 sevens = 7 twos', '14'],
    ['b', '3 ____ = 6 threes', '3 sixes = 6 threes', '18'],
    ['c', '10 eights = 8 ____', '10 eights = 8 tens', '80'],
    ['d', '4 × ____ = 6 × 4', '4 × 6 = 6 × 4', '24'],
    ['e', '8 × 5 = ____ × 8', '8 × 5 = 5 × 8', '40'],
    ['f', '____ × 7 = 7 × ____', '4 × 7 = 7 × 4', '28'],
    ['g', '3 × 9 = 10 threes − ____ three', '3 × 9 = 10 threes − 1 three', '27'],
    ['h', '10 fours − 1 four = ____ × 4', '10 fours − 1 four = 9 × 4', '36'],
    ['i', '8 × 4 = 5 fours + ____ fours', '8 × 4 = 5 fours + 3 fours', '32'],
    ['j', '____ fives + 1 five = 6 × 5', '5 fives + 1 five = 6 × 5', '30'],
    ['k', '5 threes + 2 threes = ____ × ____', '5 threes + 2 threes = 7 × 3', '21'],
    ['l', '____ twos + ____ twos = 10 twos', '5 twos + 5 twos = 10 twos', '20']
  ];

  return {
    title: 'Problem 3: Complete the equivalent equations',
    sourceNote,
    sections: [{
      kind: 'solution-parts',
      label: solved ? 'Completed equations and products' : 'Complete each equation, then find the product',
      parts: sourceItems.map(([label, blankEquation, solvedEquation, product]) => ({
        label,
        prompt: solved ? solvedEquation : blankEquation,
        equation: solved ? `Both sides = ${product}` : 'Product = ____',
        answer: solved ? `Product: ${product}` : ''
      }))
    }]
  };
}

function makeM3PrimaryModel(problem: ProblemSetCenteredProblem, solved: boolean, lessonNumber: number): ProblemVisualSection {
  if (lessonNumber === 4) {
    return makeM3Lesson4Primary(problem, solved);
  }

  if (lessonNumber === 5) {
    return makeM3Lesson5Primary(problem, solved);
  }

  if (lessonNumber === 6) {
    return makeM3Lesson6Primary(problem, solved);
  }

  if (lessonNumber === 7) {
    return makeM3Lesson7Primary(problem, solved);
  }

  if (lessonNumber === 8) {
    return makeM3Lesson8Primary(problem, solved);
  }

  if (lessonNumber === 9) {
    return makeM3Lesson9Primary(problem, solved);
  }

  if (lessonNumber === 10) {
    return makeM3Lesson10Primary(problem, solved);
  }

  if (lessonNumber === 11) {
    return makeM3Lesson11Primary(problem, solved);
  }

  if (lessonNumber === 1 && /shade in the multiplication facts/.test(problem.sourcePrompt.toLowerCase())) {
    return makeM3Lesson1FactChart(solved);
  }

  if (lessonNumber === 1 && /complete the equations/.test(problem.sourcePrompt.toLowerCase())) {
    return makeM3Lesson1EquationFamilies(solved);
  }

  if (lessonNumber === 2 && /each unit has a value of 7|each dot has a value of 8/i.test(problem.sourcePrompt)) {
    return makeM3FivePlusOneModel(problem, solved);
  }

  if (lessonNumber === 3 && /solve the riddle/i.test(problem.sourcePrompt)) {
    return makeM3UnknownRiddle(solved);
  }

  if (lessonNumber === 3 && /lonna buys 3 t-shirts/i.test(problem.sourcePrompt)) {
    return makeM3LonnaUnknownModel(solved);
  }

  if (lessonNumber === 3 && /table tennis tournament/i.test(problem.sourcePrompt)) {
    return makeM3TableTennisModel(solved);
  }

  if (lessonNumber === 2 && /Hannah has \$500/i.test(problem.sourcePrompt)) {
    return makeM3HannahBudgetModel(solved);
  }

  if (problem.blankVisualType === 'fact-match' || problem.animationType === 'fact-match') {
    return makeM3FactMatch(problem, solved);
  }

  if (usesM3Tape(problem)) {
    return makeM3Tape(problem, solved);
  }

  if (problem.blankVisualType === 'array-template' || problem.animationType === 'array-model' || problem.animationType === 'decompose-array') {
    return makeM3ArrayOrWorkspace(problem, solved);
  }

  if (looksLikeMultiplicationTable(problem)) {
    return makeM3PatternTable(problem, solved);
  }

  return makeM3WorkspaceTable(problem, solved);
}

function makeM3HannahBudgetModel(solved: boolean): ProblemVisualSection {
  return {
    kind: 'card-grid',
    label: solved ? 'Hannah’s completed budget check' : 'Track Hannah’s money before deciding',
    cards: [
      {
        label: 'Money and purchases',
        sections: [{
          kind: 'data-table',
          columns: ['Starting money', 'Camera', '4 other items', 'Speakers'],
          rows: [['$500', '$435', '4 × $9', '$50']]
        }]
      },
      {
        label: solved ? 'Money left' : 'Calculate and compare',
        sections: [{
          kind: 'equations',
          lines: solved
            ? ['4 × 9 = 36', '500 − 435 = 65', '65 − 36 = 29', '29 < 50']
            : ['4 × 9 = ____', '500 − 435 = ____', '____ − ____ = ____', '____ < 50']
        }, {
          kind: 'note',
          text: solved
            ? 'No. Hannah has $29 left, which is $21 less than the $50 needed for the speakers.'
            : 'Find the cost of the 4 items, subtract both purchases, and compare the money left with $50.'
        }]
      }
    ]
  };
}

function makeM3Lesson1FactChart(solved: boolean): ProblemVisualSection {
  const factors = Array.from({ length: 10 }, (_, index) => index + 1);
  return {
    kind: 'card-grid',
    label: solved ? 'Solved commutative fact chart and apple pattern' : 'Official commutative fact chart and apple pattern',
    cards: [
      {
        label: '100 multiplication facts',
        sections: [{
          kind: 'data-table',
          columns: ['x', ...factors.map(String)],
          rows: factors.map((rowFactor) => [
            String(rowFactor),
            ...factors.map((columnFactor) => solved ? String(rowFactor * columnFactor) : '____')
          ])
        }]
      },
      {
        label: '7 apples in each bag',
        sections: [{
          kind: 'data-table',
          columns: ['Number of bags', '2', '3', '4', '5', '6'],
          rows: [[
            'Total apples',
            solved ? '14' : '____',
            '21',
            solved ? '28' : '____',
            solved ? '35' : '____',
            '42'
          ]]
        }, {
          kind: 'note',
          text: solved
            ? 'The chart has 100 facts. After known facts and commutative partners are used, 16 facts remain to learn.'
            : 'Shade facts already known, then use the reflected fact across the diagonal to solve its commutative partner.'
        }]
      }
    ]
  };
}

function makeM3Lesson1EquationFamilies(solved: boolean): ProblemVisualSection {
  const rows = [
    ['2 sevens', '7 twos', '14'],
    ['3 sixes', '6 threes', '18'],
    ['10 eights', '8 tens', '80'],
    ['4 x 6', '6 x 4', '24'],
    ['8 x 5', '5 x 8', '40'],
    ['4 x 7', '7 x 4', '28'],
    ['3 x 9', '10 threes - 1 three', '27'],
    ['9 x 4', '10 fours - 1 four', '36'],
    ['8 x 4', '5 fours + 3 fours', '32'],
    ['6 x 5', '5 fives + 1 five', '30'],
    ['7 x 3', '5 threes + 2 threes', '21'],
    ['10 x 2', '5 twos + 5 twos', '20']
  ];
  return {
    kind: 'data-table',
    label: solved ? 'Completed commutative and make-ten equations' : 'Official equation families',
    columns: ['One form', 'Related form', 'Product'],
    rows: rows.map(([left, right, product]) => solved ? [left, right, product] : [left, '____', '____'])
  };
}

function makeM3FivePlusOneModel(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const unit = /value of 8/i.test(problem.sourcePrompt) ? 8 : 7;
  const knownTotal = 5 * unit;
  const total = 6 * unit;
  return {
    kind: 'card-grid',
    label: solved ? `Solved 5 ${unit}s + 1 ${unit}` : `Build 6 ${unit}s from a known five-fact`,
    cards: [
      {
        label: `5 ${unit}s`,
        sections: [{ kind: 'array', rows: 5, columns: unit, item: 'circle', caption: solved ? `5 x ${unit} = ${knownTotal}` : `Known fact: 5 x ${unit} = ____` }]
      },
      {
        label: `1 more ${unit}`,
        sections: [{ kind: 'array', rows: 1, columns: unit, item: 'dot', caption: solved ? `${knownTotal} + ${unit} = ${total}` : `Add one unit of ${unit}.` }]
      },
      {
        label: 'Target and commutative fact',
        sections: [{
          kind: 'equations',
          lines: solved ? [`6 x ${unit} = ${total}`, `${unit} x 6 = ${total}`] : [`6 x ${unit} = ____`, `${unit} x 6 = ____`]
        }]
      }
    ]
  };
}

function makeM3UnknownRiddle(solved: boolean): ProblemVisualSection {
  const rows = [
    ['e', '5 x 4 = e', '20'], ['l', '21 divided by 3 = l', '7'], ['i', '24 divided by i = 4', '6'],
    ['c', '21 = c x 7', '3'], ['s', '32 = s x 8', '4'], ['n', '8 = 80 divided by n', '10'],
    ['t', 't divided by 10 = 7', '70'], ['k', '4 = 36 divided by k', '9'], ['b', '24 divided by b = 12', '2'],
    ['a', '8 = a divided by 3', '24'], ['h', '35 = 7 x h', '5']
  ];
  return {
    kind: 'card-grid',
    label: solved ? 'Solved unknown-letter riddle' : 'Unknown-letter equation cards',
    cards: [
      ...rows.map(([letter, equation, value]) => ({
        label: solved ? `${letter} = ${value}` : `Find ${letter}`,
        sections: [
          {
            kind: 'equations' as const,
            lines: [equation]
          },
          {
            kind: 'note' as const,
            text: solved ? `The unknown value is ${value}.` : `Solve the familiar fact, then write ${letter} = ____.`
          }
        ]
      })),
      {
        label: 'Use the letter values to decode the riddle',
        sections: [{
          kind: 'data-table',
          columns: ['9', '6', '70', '3', '5', '20', '10', '70', '24', '2', '7', '20', '4'],
          rows: [[...(solved ? 'kitchen tables'.replace(' ', '').split('') : Array.from({ length: 13 }, () => '____'))]]
        }, { kind: 'note', text: solved ? 'The riddle answer is “kitchen tables.”' : 'Match each number to the letter whose equation has that value.' }]
      }
    ]
  };
}

function makeM3LonnaUnknownModel(solved: boolean): ProblemVisualSection {
  return {
    kind: 'card-grid',
    label: solved ? 'Solved unknown totals: purchase and change' : 'Name each unknown before solving',
    cards: [
      {
        label: 'Total cost m',
        sections: [{
          kind: 'tape',
          totalLabel: solved ? 'm = $24' : 'm dollars total',
          parts: Array.from({ length: 3 }, () => ({ label: '$8' })),
          caption: solved ? '3 x $8 = m, so m = $24.' : 'Three equal shirt costs make the unknown total m.'
        }]
      },
      {
        label: 'Change c',
        sections: [{
          kind: 'data-table',
          columns: ['Money paid', 'Amount spent', 'Change'],
          rows: [[ '$30', solved ? '$24' : 'm = ____', solved ? 'c = $6' : 'c = ____' ]]
        }, { kind: 'equations', lines: solved ? ['30 - 24 = c', 'c = 6'] : ['30 - m = c', 'c = ____'] }]
      }
    ]
  };
}

function makeM3TableTennisModel(solved: boolean): ProblemVisualSection {
  return {
    kind: 'tape',
    label: solved ? 'Solved two-game comparison tape' : 'Two-game comparison tape',
    totalLabel: solved ? '32 minutes total' : '32 minutes total',
    topParts: [
      { label: solved ? 'shorter game = 10 min' : 'shorter game = s', startPart: 0, partCount: 1 },
      { label: solved ? 'longer game = 22 min' : 'longer game = s + 12', startPart: 1, partCount: 2 }
    ],
    parts: solved
      ? [{ label: '10', sublabel: 'shorter' }, { label: '10', sublabel: 'same length' }, { label: '12', sublabel: 'extra' }]
      : [{ label: 's', sublabel: 'shorter' }, { label: 's', sublabel: 'same length' }, { label: '12', sublabel: 'extra' }],
    braces: [{ label: solved ? '10 + 22 = 32' : 's + (s + 12) = 32', startPart: 0, partCount: 3 }],
    caption: solved ? 'Subtract the 12-minute difference, split the remaining 20 minutes equally, then add 12 to the longer game.' : 'Remove the 12-minute difference. The remaining time is two equal shorter-game parts.'
  };
}

function makeM3Lesson4Primary(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const number = Number(problem.number);
  if (number === 1) {
    return makeM3CountByMatch(6, solved, false, 'sunburst number cards', [9, 6, 4, 7, 2, 1, 3, 10, 5, 8], [2, 4, 7, 9]);
  }
  if (number === 2) {
    return makeM3CountBySequence(6, 4, solved, [1]);
  }
  if (number === 3) {
    return makeM3CountBySequence(6, 7, solved, [1]);
  }
  if (number === 4) {
    const solvedSegments = [
      ['1', 'up', '0, 6, 12, 18, 24'],
      ['2', 'down', '18, 12'],
      ['3', 'up', '18, 24, 30, 36'],
      ['4', 'down', '30, 24, 18'],
      ['5', 'up', '24, 30, 36, 42, 48']
    ];
    const blankSegments = [
      ['1', 'up', '0, 6, ____, 18, ____'],
      ['2', 'down', '____, 12'],
      ['3', 'up', '____, 24, 30, ____'],
      ['4', 'down', '30, 24, ____'],
      ['5', 'up', '24, ____, 36, ____, 48']
    ];
    return {
      kind: 'card-grid',
      label: solved ? 'Solved direction-changing count by six' : 'Follow each arrow and keep counting by six',
      cards: (solved ? solvedSegments : blankSegments).map(([segment, direction, count]) => ({
        label: `Segment ${segment}: count ${direction}`,
        sections: [
          { kind: 'equations', lines: [count] },
          { kind: 'note', text: direction === 'up' ? 'Add 6 at each step.' : 'Subtract 6 at each step.' }
        ]
      }))
    };
  }
  return {
    kind: 'card-grid',
    label: solved ? 'Julie stopped one six too soon' : 'Check Julie’s count-by-six claim',
    cards: [
      {
        label: 'Julie’s stopping point',
        sections: [{ kind: 'equations', lines: ['6 x 6 = 36'] }, { kind: 'note', text: 'Julie counted only 6 groups of 6.' }]
      },
      {
        label: 'The requested fact',
        sections: [{ kind: 'equations', lines: [solved ? '6 x 7 = 42' : '6 x 7 = ____'] }, { kind: 'note', text: 'The problem asks for 7 groups of 6.' }]
      },
      {
        label: solved ? 'Verdict: Julie is not right' : 'Compare and decide',
        sections: [{ kind: 'note', text: solved ? 'Add one more group of 6: 36 + 6 = 42.' : 'Is 36 the seventh number in the count-by-six sequence? Explain.' }]
      }
    ]
  };
}

function makeM3Lesson5Primary(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const number = Number(problem.number);
  if (number === 1) {
    return makeM3CountByMatch(7, solved, true, 'fish bowls and fish facts', [6, 3, 8, 7, 1, 10, 9, 4, 2, 5], [2, 4, 5, 8, 9, 10]);
  }
  if (number === 2) {
    return makeM3CountBySequence(7, 10, solved, [1, 2, 4, 6, 9]);
  }
  if (number === 3) {
    return {
      kind: 'number-bond',
      label: solved ? 'Solved make-ten number bond' : 'Break the next seven to make 20',
      whole: '7',
      parts: [
        { label: solved ? '6' : '____', sublabel: 'part needed to reach 20' },
        { label: solved ? '1' : '____', sublabel: 'part left over' }
      ],
      equations: solved ? ['14 + 7 = 14 + 6 + 1', '14 + 6 = 20', '20 + 1 = 21'] : ['14 + 7 = 14 + ____ + ____', '14 + ____ = 20', '20 + ____ = ____'],
      caption: solved ? 'Abe adds 6 to reach 20, then adds the remaining 1.' : 'Choose the two parts of 7 that reach the next ten, then finish the count.'
    };
  }
  return {
    kind: 'card-grid',
    label: solved ? 'Both count-by strategies reach 42' : 'Compare Molly’s and James’s arrays',
    cards: [
      {
        label: 'Molly: count by 7 six times',
        sections: [{ kind: 'array', rows: 6, columns: 7, item: 'dot', caption: solved ? '6 x 7 = 42' : '6 groups of 7 = ____' }]
      },
      {
        label: 'James: count by 6 seven times',
        sections: [{ kind: 'array', rows: 7, columns: 6, item: 'circle', caption: solved ? '7 x 6 = 42' : '7 groups of 6 = ____' }]
      },
      {
        label: 'Commutative check',
        sections: [{ kind: 'equations', lines: solved ? ['7 x 6 = 6 x 7', '42 = 42', 'Both are correct.'] : ['7 x 6 = ____', '6 x 7 = ____', 'Who is correct? ____'] }]
      }
    ]
  };
}

function makeM3Lesson6Primary(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const number = Number(problem.number);
  if (number === 1) {
    return {
      kind: 'card-grid',
      label: solved ? 'Solved 5-plus-more tape diagrams' : 'Label each tape as 5 groups plus more groups',
      cards: [6, 7, 8, 9].map((groups) => {
        const extra = groups - 5;
        return {
          label: `${groups} x 6`,
          sections: [
            {
              kind: 'tape',
              totalLabel: solved ? `${groups * 6}` : '____ total',
              parts: Array.from({ length: groups }, (_, index) => ({ label: '6', emphasize: index < 5 })),
              caption: `5 x 6 plus ${extra} x 6`
            },
            {
              kind: 'equations',
              lines: solved
                ? [`${groups} x 6 = (5 x 6) + (${extra} x 6)`, `30 + ${extra * 6} = ${groups * 6}`]
                : [`${groups} x 6 = (5 x 6) + (${extra} x 6)`, '30 + ____ = ____']
            }
          ]
        };
      })
    };
  }
  if (number === 2) {
    return makeM3DivisionBond(54, 6, 30, 24, solved, 'Break apart 54 into two parts divisible by 6', [true, true]);
  }
  if (number === 3) {
    return makeM3DivisionBond(49, 7, 35, 14, solved, 'Break apart 49 into two parts divisible by 7', [true, false]);
  }
  if (number === 4) {
    return {
      kind: 'card-grid',
      label: solved ? 'Robert’s 5-eights-plus-1-eight strategy' : 'Draw 5 eights and 1 more eight',
      cards: [
        { label: 'Known part', sections: [{ kind: 'array', rows: 5, columns: 8, item: 'dot', caption: solved ? '5 x 8 = 40' : '5 x 8 = ____' }] },
        { label: 'One more group', sections: [{ kind: 'array', rows: 1, columns: 8, item: 'circle', caption: solved ? '1 x 8 = 8' : '1 x 8 = ____' }] },
        { label: 'Combine', sections: [{ kind: 'equations', lines: solved ? ['6 x 8 = (5 x 8) + 8', '40 + 8 = 48', 'Yes, Robert is right.'] : ['6 x 8 = (5 x 8) + 8', '____ + ____ = ____', 'Is Robert right? ____'] }] }
      ]
    };
  }
  return makeM3DivisionBond(42, 7, 35, 7, solved, 'One valid number bond; other divisible-by-7 bonds also work');
}

function makeM3Lesson7Primary(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const number = Number(problem.number);
  if (number === 1) {
    const words = [
      'a number times 6 equals 30',
      '7 times a number equals 42',
      '6 times 7 equals a number',
      '63 divided by a number equals 9',
      '36 divided by a number equals 6',
      'a number times 7 equals 21'
    ];
    const equations = ['n x 7 = 21', 'n x 6 = 30', '6 x 7 = n', '7 x n = 42', '36 divided by n = 6', '63 divided by n = 9'];
    return {
      kind: 'expression-match',
      label: solved ? 'Solved caterpillar-to-leaf matches' : 'Match each word caterpillar to its equation leaf',
      topLabel: 'Words',
      bottomLabel: 'Equation leaves',
      topItems: words,
      bottomItems: equations,
      showMatches: solved,
      matches: solved ? [1, 3, 2, 5, 4, 0].map((bottomIndex, topIndex) => ({ topIndex, bottomIndex, label: 'same unknown location' })) : undefined,
      note: solved ? 'Each match keeps the known quantities and the unknown in the same position.' : 'Read “a number” as n. Match without solving the value of n.'
    };
  }
  if (number === 2) {
    return {
      kind: 'tape',
      label: solved ? 'Solved 6-part tape' : 'Write an equation for the official 6-part tape',
      totalLabel: solved ? 'k = 48' : 'k',
      parts: Array.from({ length: 6 }, () => ({ label: '8' })),
      braces: [{ label: solved ? '6 x 8 = k; k = 48' : '6 x 8 = k; k = ____', startPart: 0, partCount: 6 }],
      caption: 'Six equal units of 8 make the unknown whole k.'
    };
  }
  const stories = [
    { label: 'a. Pencils', total: '21 pencils', parts: 7, unit: '3 each', equation: '21 divided by 3 = s', answer: 's = 7 students' },
    { label: 'b. Basketball drills', total: '24 minutes', parts: 6, unit: 'same time', equation: '24 divided by 6 = t', answer: 't = 4 minutes' },
    { label: 'c. Yarn', total: 'y centimeters', parts: 8, unit: '6 cm', equation: '8 x 6 = y', answer: 'y = 48 cm' },
    { label: 'd. Beakers', total: '54 mL', parts: 9, unit: '6 mL', equation: '54 divided by 6 = b', answer: 'b = 9 beakers' }
  ];
  return {
    kind: 'card-grid',
    label: solved ? 'Solved drawing-and-equation story models' : 'Draw, label, and solve each official story',
    cards: stories.map((story) => ({
      label: story.label,
      sections: solved || story.label.startsWith('c.')
        ? [
            { kind: 'tape', totalLabel: story.total, parts: Array.from({ length: story.parts }, () => ({ label: story.unit })), caption: solved ? story.answer : 'Eight known pieces each measure 6 centimeters.' },
            { kind: 'equations', lines: solved ? [story.equation, story.answer] : [story.equation, story.equation.split('=')[1].trim() + ' = ____'] }
          ]
        : [
            { kind: 'note', text: `Draw equal groups for ${story.total}. The number of groups or size of each group is unknown.` },
            { kind: 'equations', lines: [story.equation, story.equation.split('=')[1].trim() + ' = ____'] }
          ]
    }))
  };
}

function makeM3Lesson8Primary(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const number = Number(problem.number);
  if (number === 1) {
    const items = [
      ['a', '(12 - 4) + 6', '14'], ['i', '(12 divided by 2) + 4', '10'],
      ['b', '12 - (4 + 6)', '2'], ['j', '12 divided by (2 + 4)', '2'],
      ['c', '15 - (7 + 3)', '5'], ['k', '9 + (15 divided by 3)', '14'],
      ['d', '(15 - 7) + 3', '11'], ['l', '(9 + 15) divided by 3', '8'],
      ['e', '(3 + 2) x 6', '30'], ['m', '60 divided by (10 - 4)', '10'],
      ['f', '3 + (2 x 6)', '15'], ['n', '(60 divided by 10) - 4', '2'],
      ['g', '4 x (7 - 2)', '20'], ['o', '35 + (10 divided by 5)', '37'],
      ['h', '(4 x 7) - 2', '26'], ['p', '(35 + 10) divided by 5', '9']
    ];
    return {
      kind: 'data-table',
      label: solved ? 'Solved parentheses expression bank' : 'Solve inside parentheses first',
      columns: ['Item', 'Expression', 'Value'],
      rows: items.map(([item, expression, value]) => [item, expression, solved ? value : '____'])
    };
  }
  if (number === 2) {
    const rows = [
      ['a', '19', '(16 - 4) + 7 = 19'], ['b', '5', '16 - (4 + 7) = 5'],
      ['c', '2', '2 = 22 - (15 + 5)'], ['d', '12', '12 = (22 - 15) + 5'],
      ['e', '60', '(3 + 7) x 6 = 60'], ['f', '45', '3 + (7 x 6) = 45'],
      ['g', '5', '5 = (10 divided by 10) x 5'], ['h', '50', '50 = (100 divided by 10) x 5'],
      ['i', '3', '(26 - 5) divided by 7 = 3'], ['j', '36', '36 = 4 x (25 - 16)']
    ];
    return {
      kind: 'data-table',
      label: solved ? 'Solved parentheses placements' : 'Place parentheses to reach each given target',
      columns: ['Item', 'Target', 'Equation with parentheses'],
      rows: rows.map(([item, target, equation]) => [item, target, solved ? equation : 'Add one pair of parentheses: ____________________'])
    };
  }
  if (number === 3) {
    return makeM3ParenthesesChoice(solved, '24 divided by 4 + 2', [
      ['Chad', '(24 divided by 4) + 2', '8'],
      ['Samir', '24 divided by (4 + 2)', '4']
    ]);
  }
  if (number === 4) {
    return makeM3ParenthesesChoice(solved, '12 + 15 divided by 3', [
      ['Natasha groups 15 divided by 3', '12 + (15 divided by 3)', '17']
    ]);
  }
  return makeM3ParenthesesChoice(solved, '7 + 3 x 2', [
    ['Multiply first', '7 + (3 x 2)', '13'],
    ['Add first', '(7 + 3) x 2', '20']
  ]);
}

function makeM3ParenthesesChoice(solved: boolean, source: string, choices: string[][]): ProblemVisualSection {
  return {
    kind: 'card-grid',
    label: solved ? `Solved groupings for ${source}` : `Show each grouping for ${source}`,
    cards: choices.map(([label, grouped, value]) => ({
      label,
      sections: [{ kind: 'equations', lines: solved ? [`${grouped} = ${value}`] : [`${source} = ____`, 'Parentheses: ____________________'] }, { kind: 'note', text: solved ? `The parentheses make ${grouped} the intended expression.` : 'Place parentheses, solve inside them first, then finish.' }]
    }))
  };
}

function makeM3Lesson9Primary(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const number = Number(problem.number);
  if (number === 1) {
    const cases = [
      { label: 'a-b. 3 x 12', columns: 12, chunks: '4 groups of 3 columns', regrouped: '(3 x 3) x 4', inner: '9 x 4', total: 36 },
      { label: 'c-d. 3 x 14', columns: 14, chunks: '7 groups of 2 columns', regrouped: '(3 x 2) x 7', inner: '6 x 7', total: 42 }
    ];
    return {
      kind: 'card-grid',
      label: solved ? 'Solved regrouped source arrays' : 'Circle equal chunks in each source array',
      cards: cases.map((item) => ({
        label: item.label,
        sections: [
          { kind: 'array', rows: 3, columns: item.columns, item: 'dot', caption: item.chunks },
          { kind: 'equations', lines: solved ? [`${item.regrouped} = ${item.inner} = ${item.total}`] : [`${item.regrouped} = ____ x ____ = ____`] }
        ]
      }))
    };
  }
  if (number === 2) {
    const chains = [
      ['a', '3 x 16', '3 x (2 x 8)', '(3 x 2) x 8', '6 x 8 = 48'],
      ['b', '2 x 14', '2 x (2 x 7)', '(2 x 2) x 7', '4 x 7 = 28'],
      ['c', '3 x 12', '3 x (3 x 4)', '(3 x 3) x 4', '9 x 4 = 36'],
      ['d', '3 x 14', '3 x (2 x 7)', '(3 x 2) x 7', '6 x 7 = 42'],
      ['e', '15 x 3', '(5 x 3) x 3', '5 x (3 x 3)', '5 x 9 = 45'],
      ['f', '15 x 2', '(5 x 3) x 2', '5 x (3 x 2)', '5 x 6 = 30']
    ];
    return {
      kind: 'card-grid',
      label: solved ? 'Solved associative-property scrolls' : 'Move parentheses to create a friendlier fact',
      cards: chains.map(([item, source, factored, regrouped, result]) => ({
        label: `Item ${item}: ${source}`,
        sections: [{ kind: 'equations', lines: solved ? [factored, regrouped, result] : [factored, 'Regroup: ____________________', 'Friendly fact: ____ x ____ = ____'] }]
      }))
    };
  }
  return {
    kind: 'card-grid',
    label: solved ? 'Charlotte’s 16 x 2 to 8 x 4 strategy' : 'Explain Charlotte’s regrouping',
    cards: [
      { label: 'Original array', sections: [{ kind: 'array', rows: 2, columns: 16, item: 'circle', caption: '16 x 2' }] },
      { label: 'Regrouped array', sections: [{ kind: 'array', rows: 4, columns: 8, item: 'dot', caption: solved ? '8 x 4 = 32' : '8 x 4 = ____' }] },
      { label: 'Associative chain', sections: [{ kind: 'equations', lines: solved ? ['16 x 2 = (8 x 2) x 2', '= 8 x (2 x 2)', '= 8 x 4 = 32'] : ['16 x 2 = (8 x 2) x 2', '= 8 x (____ x ____)', '= ____ x ____ = ____'] }, { kind: 'note', text: solved ? 'She rewrites 16 as 8 x 2, then groups 2 x 2 to make 4.' : 'Explain what changes and what stays equal.' }]
      }
    ]
  };
}

function makeM3Lesson10Primary(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const number = Number(problem.number);
  if (number === 1) {
    const cases = [
      { label: 'a. 8 x 8', extra: 3, total: 64 },
      { label: 'b. 8 x 9 = 9 x 8', extra: 4, total: 72 }
    ];
    return {
      kind: 'card-grid',
      label: solved ? 'Solved source arrays split after five columns' : 'Label each array as 5 columns plus more columns',
      cards: cases.map((item) => ({
        label: item.label,
        sections: [
          { kind: 'array', rows: 8, columns: 5, item: 'dot', caption: solved ? '8 x 5 = 40' : 'Known part: 8 x 5 = ____' },
          { kind: 'array', rows: 8, columns: item.extra, item: 'circle', caption: solved ? `8 x ${item.extra} = ${8 * item.extra}` : `Extra part: 8 x ${item.extra} = ____` },
          { kind: 'equations', lines: solved ? [`40 + ${8 * item.extra} = ${item.total}`] : ['40 + ____ = ____'] }
        ]
      }))
    };
  }
  if (number === 2) {
    return makeM3DivisionBond(56, 8, 40, 16, solved, 'The source gives both divisible parts; solve each smaller quotient.', [true, true]);
  }
  if (number === 3) {
    return makeM3DivisionBond(72, 8, 40, 32, solved, 'The source gives 40 divided by 8 and leaves the second divisible part blank.', [true, false]);
  }
  if (number === 4) {
    const groups = Array.from({ length: 9 }, (_, index) => index + 1);
    return {
      kind: 'data-table',
      label: solved ? 'Nine octagons: completed skip-count' : 'Skip-count the sides on nine octagons',
      columns: groups.map((group) => `Octagon ${group}`),
      rows: [[...groups.map((group) => solved || group <= 2 ? String(group * 8) : '____')], [...groups.map(() => '8 sides')]]
    };
  }
  if (number === 5) {
    const facts = [['4 x 8', '32'], ['8 x 6', '48'], ['3 x 8', '24'], ['8 x 10', '80'], ['8 x 8', '64'], ['7 x 8', '56']];
    return { kind: 'data-table', label: solved ? 'Solved fishing-boat facts' : 'Complete each fact on the source boats', columns: ['Boat fact', 'Catch card'], rows: facts.map(([fact, value], index) => [fact, solved || index === 0 ? value : '____']) };
  }
  const expressions = ['24 divided by 8', '32 divided by 8', '16 divided by 8', '64 divided by 8', '48 divided by 8', '72 divided by 8'];
  const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const matches = [2, 3, 1, 7, 5, 8];
  return { kind: 'expression-match', label: solved ? 'Solved umbrella-to-raindrop matches' : 'Match each quotient umbrella to a raindrop', topLabel: 'Division expressions', bottomLabel: 'Quotients', topItems: expressions, bottomItems: values, showMatches: solved, matches: solved ? matches.map((bottomIndex, topIndex) => ({ topIndex, bottomIndex, label: 'quotient' })) : undefined };
}

function makeM3Lesson11Primary(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const number = Number(problem.number);
  if (number === 1) {
    return makeM3StoryTape(solved, '32 students', 8, 'n students', '32 divided by 8 = n', 'n = 4 students per group');
  }
  if (number === 2) {
    return makeM3StoryTape(solved, 'm dollars', 6, '$8 per pack', '6 x 8 = m', 'm = $48');
  }
  if (number === 3) {
    return makeM3StoryTape(solved, '$24 total', 3, '$8 per kg', '24 divided by 8 = c', 'c = 3 kg', false);
  }
  if (number === 4) {
    return makeM3TwoStepStory(solved, 'Baseball cards', '4 packs x 10 cards', '40 cards divided among 8 boys', ['4 x 10 = 40', '40 divided by 8 = 5'], ['4 x 10 = ____', '____ divided by 8 = ____'], 'Each boy gets 5 cards.');
  }
  if (number === 5) {
    return makeM3TwoStepStory(solved, 'Yellow and green balloons', '8 bags x 7 balloons', '56 total - 35 yellow', ['8 x 7 = 56', '56 - 35 = 21'], ['8 x 7 = ____', '____ - 35 = ____'], 'There are 21 green balloons.');
  }
  return makeM3TwoStepStory(solved, 'Orange sales', '72 oranges divided by 8 per bag', '9 bags x $4', ['72 divided by 8 = 9', '9 x 4 = 36'], ['72 divided by 8 = ____', '____ x 4 = ____'], 'The fruit seller receives $36.');
}

function makeM3StoryTape(solved: boolean, total: string, partCount: number, partLabel: string, equation: string, answer: string, showPartCountInBlank = true): ProblemVisualSection {
  const visiblePartCount = solved || showPartCountInBlank ? partCount : 1;
  return {
    kind: 'tape',
    label: solved ? 'Solved source tape diagram' : 'Draw and label the source tape diagram',
    totalLabel: total,
    parts: Array.from({ length: visiblePartCount }, () => ({ label: solved || showPartCountInBlank ? partLabel : `unknown number of ${partLabel} parts` })),
    braces: [{ label: solved ? `${equation}; ${answer}` : `${equation}; answer = ____`, startPart: 0, partCount: visiblePartCount }],
    caption: solved ? answer : 'The letter labels the quantity named in the question.'
  };
}

function makeM3TwoStepStory(solved: boolean, label: string, firstModel: string, secondModel: string, equations: string[], blankEquations: string[], answer: string): ProblemVisualSection {
  return {
    kind: 'card-grid',
    label: solved ? `Solved two-step model: ${label}` : `Plan both steps: ${label}`,
    cards: [
      { label: 'Step 1', sections: [{ kind: 'note', text: firstModel }, { kind: 'equations', lines: [solved ? equations[0] : blankEquations[0]] }] },
      { label: 'Step 2', sections: [{ kind: 'note', text: solved ? secondModel : 'Use the Step 1 result in the second relationship.' }, { kind: 'equations', lines: [solved ? equations[1] : blankEquations[1]] }] },
      { label: 'Answer in context', sections: [{ kind: 'note', text: solved ? answer : 'Write a complete sentence with the correct unit: ____________________' }] }
    ]
  };
}

function makeM3CountByMatch(
  unit: number,
  solved: boolean,
  includeDivision: boolean,
  sourceObjects: string,
  factOrder: number[],
  missingGroups: number[]
): ProblemVisualSection {
  const groups = Array.from({ length: 10 }, (_, index) => index + 1);
  return {
    kind: 'card-grid',
    label: solved ? `Solved ${sourceObjects}` : `Official ${sourceObjects}`,
    cards: [
      {
        label: `Count-by-${unit} sequence`,
        sections: [{
          kind: 'data-table',
          columns: groups.map((group) => `Count ${group}`),
          rows: [[...groups.map((group) => solved || !missingGroups.includes(group) ? String(group * unit) : '____')]]
        }]
      },
      ...factOrder.map((factor, index) => {
        const total = factor * unit;
        return {
          label: `Source card ${index + 1}: ${factor} groups of ${unit}`,
          sections: [
            {
              kind: 'equations' as const,
              lines: includeDivision
                ? solved
                  ? [`${factor} x ${unit} = ${total}`, `${total} divided by ${unit} = ${factor}`]
                  : [`${factor} x ${unit} = ____`, '____ divided by ____ = ____']
                : [solved ? `${factor} x ${unit} = ${total}` : `${factor} x ${unit} = ____`]
            },
            {
              kind: 'note' as const,
              text: solved ? `Match this card to ${total} in the count-by sequence.` : 'Find the matching total in the count-by sequence.'
            }
          ]
        };
      })
    ]
  };
}

function makeM3CountBySequence(unit: number, finalGroup: number, solved: boolean, givenGroups: number[]): ProblemVisualSection {
  const groups = Array.from({ length: finalGroup }, (_, index) => index + 1);
  const targetGroups = groups.filter((group) => !givenGroups.includes(group));
  return {
    kind: 'card-grid',
    label: solved ? `Solved count-by-${unit} sequence and fact pairs` : `Complete the count-by-${unit} sequence`,
    cards: [
      {
        label: 'Count-by sequence',
        sections: [{
          kind: 'data-table',
          columns: groups.map((group) => `Count ${group}`),
          rows: [[...groups.map((group) => solved || givenGroups.includes(group) ? String(group * unit) : '____')]]
        }]
      },
      ...targetGroups.map((group) => ({
        label: `Count ${group}: multiplication and division partners`,
        sections: [
          {
            kind: 'equations' as const,
            lines: solved
              ? [`${group} x ${unit} = ${group * unit}`, `${group * unit} divided by ${unit} = ${group}`]
              : [`____ x ${unit} = ____`, `____ divided by ${unit} = ____`]
          },
          {
            kind: 'note' as const,
            text: solved ? `${group} groups of ${unit} make ${group * unit}.` : `Use the value at count position ${group}.`
          }
        ]
      }))
    ]
  };
}

function makeM3DivisionBond(
  whole: number,
  divisor: number,
  firstPart: number,
  secondPart: number,
  solved: boolean,
  caption: string,
  blankVisibleParts: [boolean, boolean] = [false, false]
): ProblemVisualSection {
  const firstQuotient = firstPart / divisor;
  const secondQuotient = secondPart / divisor;
  return {
    kind: 'number-bond',
    label: solved ? `Solved ${whole} divided by ${divisor} number bond` : `${whole} divided by ${divisor} number-bond workspace`,
    whole: `${whole} divided by ${divisor}`,
    parts: [
      { label: solved || blankVisibleParts[0] ? `${firstPart} divided by ${divisor}` : `____ divided by ${divisor}`, sublabel: solved ? `quotient ${firstQuotient}` : blankVisibleParts[0] ? 'given source part' : 'choose a divisible part' },
      { label: solved || blankVisibleParts[1] ? `${secondPart} divided by ${divisor}` : `____ divided by ${divisor}`, sublabel: solved ? `quotient ${secondQuotient}` : blankVisibleParts[1] ? 'given source part' : 'choose a divisible part' }
    ],
    equations: solved
      ? [`${whole} divided by ${divisor} = (${firstPart} divided by ${divisor}) + (${secondPart} divided by ${divisor})`, `${firstQuotient} + ${secondQuotient} = ${firstQuotient + secondQuotient}`]
      : [`${whole} divided by ${divisor} = (${blankVisibleParts[0] ? firstPart : '____'} divided by ${divisor}) + (____ divided by ${divisor})`, '____ + ____ = ____'],
    caption
  };
}

function makeM3StrategyFrame(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number,
  equations: string[]
): ProblemVisualSection | undefined {
  if ([4, 5, 6, 7, 8, 9, 10, 11].includes(lessonNumber)) {
    return undefined;
  }

  if (lessonNumber === 1 && /shade in the multiplication facts/.test(problem.sourcePrompt.toLowerCase())) {
    return {
      kind: 'related-facts',
      label: solved ? 'Solved chart reflections' : 'Reflect known facts across the diagonal',
      rows: [
        { left: '3 x 6', right: solved ? '6 x 3 = 18' : '6 x 3 = ____' },
        { left: '2 x 7', right: solved ? '7 x 2 = 14' : '7 x 2 = ____' },
        { left: '5 x 8', right: solved ? '8 x 5 = 40' : '8 x 5 = ____' },
        { left: '4 x 9', right: solved ? '9 x 4 = 36' : '9 x 4 = ____' }
      ]
    };
  }

  if (lessonNumber === 1 && /complete the equations/.test(problem.sourcePrompt.toLowerCase())) {
    return {
      kind: 'data-table',
      label: solved ? 'How each family is solved' : 'Choose the matching strategy',
      columns: ['Strategy', 'What stays equal', 'Use it when'],
      rows: solved
        ? [
            ['commutative property', 'the product', 'the factors reverse order'],
            ['make ten, subtract one', 'the unit size', '9 groups are shown as 10 groups - 1 group'],
            ['five plus more', 'the unit size', 'a known five-fact is extended']
          ]
        : [
            ['reverse factors', '____', 'commutative items'],
            ['10 groups - 1 group', '____', 'nines items'],
            ['5 groups + more groups', '____', 'decomposition items']
          ]
    };
  }

  if (lessonNumber === 2 && /each unit has a value of 7|each dot has a value of 8/i.test(problem.sourcePrompt)) {
    const unit = /value of 8/i.test(problem.sourcePrompt) ? 8 : 7;
    return {
      kind: 'related-facts',
      label: solved ? 'Five-fact to six-fact chain' : 'Use the known five-fact',
      rows: [
        { left: `5 x ${unit}`, right: solved ? `${5 * unit}` : '____' },
        { left: `5 ${unit}s + 1 ${unit}`, right: solved ? `${6 * unit}` : '____' },
        { left: `6 x ${unit}`, right: solved ? `${6 * unit}` : '____' },
        { left: `${unit} x 6`, right: solved ? `${6 * unit}` : '____' }
      ]
    };
  }

  if (lessonNumber === 2 && /32 crayons/.test(problem.sourcePrompt)) {
    return {
      kind: 'related-facts',
      label: solved ? 'Multiplication checks the quotient' : 'Use a known eights fact',
      rows: [
        { left: '32 divided by 8', right: solved ? '4 packs' : '____ packs' },
        { left: '4 packs x 8 crayons', right: solved ? '32 crayons' : '____ crayons' }
      ]
    };
  }

  if (lessonNumber === 2 && /hannah has \$500/i.test(problem.sourcePrompt)) {
    return {
      kind: 'data-table',
      label: solved ? 'Solved spending and reasonableness check' : 'Track the money in order',
      columns: ['Step', 'Calculation', 'Money left'],
      rows: solved
        ? [
            ['camera', '$500 - $435', '$65'],
            ['4 other items', '4 x $9 = $36', '$65 - $36 = $29'],
            ['speakers', '$29 < $50', 'No, $21 short']
          ]
        : [
            ['camera', '$500 - $435', '____'],
            ['4 other items', '4 x $9', '____'],
            ['compare with speakers', '____ compared with $50', 'yes / no']
          ]
    };
  }

  if ([2, 6, 10, 12].includes(lessonNumber)) {
    const groupSize = problem.knownGroupSize ?? inferM3Factor(equations, 1) ?? m3LikelyUnitSize(problem);
    const totalGroups = problem.knownGroupCount ?? inferM3Factor(equations, 0) ?? 6;
    const firstPart = Math.min(5, Math.max(1, totalGroups - 1));
    const secondPart = Math.max(1, totalGroups - firstPart);
    return {
      kind: 'card-grid',
      label: solved ? 'Solved distributive property model' : 'Distributive property workspace',
      cards: [
        {
          label: `${firstPart} groups`,
          sections: [
            {
              kind: 'array',
              rows: firstPart,
              columns: boundedM3Count(groupSize, 1, 10),
              item: 'dot',
              caption: solved ? `${firstPart} x ${groupSize} = ${firstPart * groupSize}` : `Known fact: ${firstPart} groups of ${groupSize}`
            }
          ]
        },
        {
          label: `${secondPart} more`,
          sections: [
            {
              kind: 'array',
              rows: secondPart,
              columns: boundedM3Count(groupSize, 1, 10),
              item: 'circle',
              caption: solved ? `${secondPart} x ${groupSize} = ${secondPart * groupSize}` : `Add the extra ${secondPart} group${secondPart === 1 ? '' : 's'}`
            }
          ]
        },
        {
          label: 'Add parts',
          sections: [
            {
              kind: 'equations',
              lines: solved
                ? [`${totalGroups} x ${groupSize} = (${firstPart} x ${groupSize}) + (${secondPart} x ${groupSize})`, `${firstPart * groupSize} + ${secondPart * groupSize} = ${totalGroups * groupSize}`]
                : [`${totalGroups} x ${groupSize} = (${firstPart} x ${groupSize}) + (${secondPart} x ${groupSize})`, '____ + ____ = ____']
            }
          ]
        }
      ]
    };
  }

  if (lessonNumber === 1) {
    const rows = problem.knownGroupCount ?? inferM3Factor(equations, 0) ?? 4;
    const columns = problem.knownGroupSize ?? inferM3Factor(equations, 1) ?? 6;
    return {
      kind: 'card-grid',
      label: solved ? 'Commutative property check' : 'Commutative property model',
      cards: [
        {
          label: 'Read rows',
          sections: [{ kind: 'equations', lines: solved ? [`${rows} x ${columns} = ${rows * columns}`] : [`${rows} x ${columns} = ____`] }]
        },
        {
          label: 'Read columns',
          sections: [{ kind: 'equations', lines: solved ? [`${columns} x ${rows} = ${rows * columns}`] : [`${columns} x ${rows} = ____`] }]
        },
        {
          label: 'Same total',
          sections: [{ kind: 'note', text: 'Turning the array does not change the number of objects; it changes the order of the factors.' }]
        }
      ]
    };
  }

  if ([4, 5].includes(lessonNumber)) {
    const unit = lessonNumber === 4 ? 6 : 7;
    return {
      kind: 'number-line',
      label: solved ? `Solved count-by-${unit}s line` : `Count by ${unit}s`,
      ticks: Array.from({ length: 11 }, (_, index) => ({
        label: String(index * unit),
        target: solved && index > 0 && index % 2 === 0
      })),
      caption: `The Teacher Edition strategy counts equal units of ${unit}, then connects the count to multiplication and division facts.`
    };
  }

  if (lessonNumber === 17) {
    return makeM3PatternTable(problem, solved);
  }

  if ([19, 20].includes(lessonNumber)) {
    const visibleEquations = solved
      ? equations.slice(0, 8)
      : problem.blankEquations?.length
        ? problem.blankEquations.slice(0, 8)
        : blankEquationTemplates(equations).slice(0, 8);
    return {
      kind: 'data-table',
      label: solved ? 'Solved source place-value relationships' : 'Source place-value relationships',
      columns: ['Official equation', 'Place-value meaning'],
      rows: visibleEquations.length
        ? visibleEquations.map((equation) => [
            equation,
            solved
              ? lessonNumber === 19
                ? 'Use the related basic fact, then reinterpret the product in tens.'
                : 'Regroup the single-digit factors, then keep the factor of 10.'
              : lessonNumber === 19
                ? 'Connect the ones fact to the tens fact.'
                : 'Use n × (m × 10) = (n × m) × 10.'
          ])
        : [[problem.sourcePrompt, solved ? teacherAnswerEvidence(problem.solvedAnswer) : 'Show the basic fact and its tens relationship.']]
    };
  }

  return undefined;
}

function makeM3SourceWorkspace(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const blankStructure = problem.blankEquations?.length
    ? problem.blankEquations.slice(0, 6).join('; ')
    : problem.equations.length
      ? blankEquationTemplates(problem.equations).slice(0, 6).join('; ')
      : 'Official table, model, or written-response blanks';

  return {
    kind: 'data-table',
    label: solved ? 'Teacher Edition source check' : 'Official Problem Set workspace',
    columns: solved
      ? ['Source request', 'Teacher Edition answer evidence', 'What the model must prove']
      : ['Source request', 'Student response structure', 'What to work out'],
    rows: [
      solved
        ? [
            cleanLongText(problem.sourcePrompt),
            teacherAnswerEvidence(problem.solvedAnswer),
            problem.quotientMeaning
          ]
        : [
            cleanLongText(problem.sourcePrompt),
            blankStructure,
            problem.blankWorkspaceLabel ?? sourceSpecificBlankWorkspaceLabel(problem)
          ]
    ]
  };
}

function sourceSpecificBlankWorkspaceLabel(problem: ProblemSetCenteredProblem): string {
  const prompt = problem.sourcePrompt.replace(/\s+/g, ' ').trim();
  const firstSentence = firstPromptSentence(prompt);
  const equations = problem.blankEquations?.length
    ? ` Equation blanks: ${problem.blankEquations.slice(0, 4).join('; ')}.`
    : '';
  return `Use this official Problem ${problem.number} workspace: ${usefulPromptLead(firstSentence, prompt)}${equations}`;
}

function firstPromptSentence(prompt: string): string {
  const endIndexes = ['.', '?', '!']
    .map((mark) => prompt.indexOf(mark))
    .filter((index) => index >= 0);
  const end = endIndexes.length ? Math.min(...endIndexes) + 1 : prompt.length;
  return prompt.slice(0, end).trim();
}

function usefulPromptLead(firstSentence: string, fullPrompt: string): string {
  if (firstSentence.replace(/[^\w]/g, '').length >= 5) {
    return firstSentence;
  }
  return `${fullPrompt.split(/\s+/).slice(0, 14).join(' ')}...`;
}

function makeM3FactMatch(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const blankItems = problem.blankEquations?.length ? problem.blankEquations : blankEquationTemplates(problem.equations);
  const solvedItems = problem.equations?.length ? problem.equations : [problem.solvedAnswer];
  const topItems = solved ? solvedItems.slice(0, 10) : blankItems.slice(0, 10);
  const bottomItems = solved
    ? topItems.map((item, index) => equationLibraryCheck(item) ?? `answer ${index + 1}`)
    : topItems.map(() => '____');

  return {
    kind: 'expression-match',
    label: solved ? 'Solved fact matches' : 'Fact-match workspace',
    topLabel: 'Official equations',
    bottomLabel: solved ? 'Values' : 'Solution choices',
    topItems,
    bottomItems,
    showMatches: solved,
    matches: solved ? topItems.map((item, index) => ({
      topIndex: index,
      bottomIndex: index,
      label: m3FactMatchReason(item)
    })) : undefined,
    note: solved
      ? 'Each match names the value that makes the official equation true.'
      : 'Use the official equation structure. Keep the solution cards blank until Solved mode.'
  };
}

function makeM3MathLibraryCheck(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  equations: string[]
): ProblemVisualSection | undefined {
  const sourceEquations = solved ? equations : problem.blankEquations?.length ? problem.blankEquations : blankEquationTemplates(equations);
  const rows = sourceEquations
    .slice(0, 8)
    .map((equation) => {
      const value = solved ? equationLibraryCheck(equation) : undefined;
      const isUsefulBlank = !solved && /____|×|x|÷|divided by|\+|-|=/.test(equation);
      const isUsefulSolved = solved && Boolean(value);
      if (!isUsefulBlank && !isUsefulSolved) {
        return undefined;
      }
      return [
        equation,
        solved ? value ?? 'Teacher check needed' : '____',
        solved ? m3EquationReason(equation, value) : 'Fill the official blank before checking the answer.'
      ];
    })
    .filter((row): row is string[] => Boolean(row));

  if (!rows.length) {
    return undefined;
  }

  return {
    kind: 'data-table',
    label: solved ? 'Equation value check' : 'Math expression workspace',
    columns: solved ? ['Expression', 'Value', 'Why it is true'] : ['Expression', 'Value', 'Student action'],
    rows
  };
}

function makeM3ReasoningPath(problem: ProblemSetCenteredProblem, equations: string[]): ProblemVisualSection {
  const steps = m3SolvedSteps(problem, equations);
  return {
    kind: 'data-table',
    label: 'How the solved answer is found',
    columns: ['Step', 'Work', 'Meaning'],
    rows: steps
  };
}

function m3SolvedSteps(problem: ProblemSetCenteredProblem, equations: string[]): string[][] {
  const rows: string[][] = [
    ['1. Read', m3GivenText(problem), 'Name the quantities and the unknown before calculating.'],
    ['2. Model', m3ModelText(problem), 'Use the same structure as the official Problem Set item.']
  ];

  const computedEquations = equations
    .map((equation) => {
      const value = equationLibraryCheck(equation);
      return value ? `${equation} -> ${value}` : equation;
    })
    .filter((equation) => !equation.startsWith('Teacher Edition Answer Key'))
    .slice(0, 4);

  if (computedEquations.length) {
    rows.push(['3. Calculate', computedEquations.join('; '), 'Each equation completes part of the official problem.']);
  }

  rows.push(['4. Answer', teacherAnswerEvidence(problem.solvedAnswer), problem.quotientMeaning]);
  rows.push(['5. Check', problem.validationChecks.join(' '), 'Use these checks to verify that the equation and answer fit the problem.']);
  return rows;
}

function m3GivenText(problem: ProblemSetCenteredProblem): string {
  const facts: string[] = [];
  if (problem.knownTotal !== undefined) {
    facts.push(`total ${problem.knownTotal} ${problem.unitLabel || 'units'}`);
  }
  if (problem.knownGroupCount !== undefined) {
    facts.push(`${problem.knownGroupCount} ${problem.groupLabel || 'groups'}`);
  }
  if (problem.knownGroupSize !== undefined) {
    facts.push(`${problem.knownGroupSize} ${problem.unitLabel || 'units'} in each ${singularLabel(problem.groupLabel || 'group')}`);
  }

  return facts.length ? facts.join('; ') : firstPromptSentence(problem.sourcePrompt);
}

function m3ModelText(problem: ProblemSetCenteredProblem): string {
  if (problem.blankVisualType === 'fact-match' || problem.animationType === 'fact-match') {
    return 'Match each official equation to the value of n that makes the equation true.';
  }
  if (usesM3Tape(problem)) {
    return problem.knownTotal !== undefined
      ? `Use an equal-unit tape: whole ${problem.knownTotal}, equal parts determined by ${problem.knownGroupSize ?? problem.knownGroupCount ?? 'the source'}.`
      : `Use an equal-unit tape with ${problem.knownGroupCount ?? 'the source number of'} equal parts.`;
  }
  if (problem.blankVisualType === 'array-template' || problem.animationType === 'array-model' || problem.animationType === 'decompose-array') {
    return `Use an array with ${problem.knownGroupCount ?? 'source'} rows/groups and ${problem.knownGroupSize ?? 'source'} in each group.`;
  }
  return 'Use the official table, equation blanks, or written response space from the Problem Set.';
}

function teacherAnswerEvidence(answer: string): string {
  return answer.replace(/^Teacher Edition Answer Key:\s*/i, '').trim();
}

function cleanLongText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function singularLabel(label: string): string {
  return label.endsWith('s') ? label.slice(0, -1) : label;
}

function m3EquationReason(equation: string, value?: string): string {
  if (/divided by\s*1\b|÷\s*1\b/.test(equation)) {
    return 'Dividing by 1 keeps the number unchanged.';
  }
  if (/\b0\s*(?:divided by|÷)/.test(equation)) {
    return 'Zero shared into equal groups gives 0 in each group.';
  }
  if (/\b1\s*(?:x|×)|(?:x|×)\s*1\b/i.test(equation)) {
    return 'Multiplying by 1 keeps the other factor unchanged.';
  }
  if (value?.includes('!=')) {
    return 'The two sides do not have the same value, so the equation is not true.';
  }
  return 'The expression value matches the Teacher Edition answer evidence.';
}

function m3FactMatchReason(equation: string): string {
  if (/divided by\s*1\b|÷\s*1\b/.test(equation)) {
    return 'divide by 1: same number';
  }
  if (/\b0\s*(?:divided by|÷)|(?:divided by|÷)\s*\d+\s*=\s*0\b/.test(equation)) {
    return 'zero divided: 0';
  }
  if (/\b1\s*(?:x|×)|(?:x|×)\s*1\b/i.test(equation)) {
    return 'multiply by 1: same number';
  }
  if (/(\d+)\s*(?:divided by|÷)\s*\1/.test(equation)) {
    return 'number divided by itself: 1';
  }
  return 'value makes the equation true';
}

function looksLikeMultiplicationTable(problem: ProblemSetCenteredProblem): boolean {
  const text = `${problem.sourcePrompt} ${problem.solvedAnswer}`.toLowerCase();
  return text.includes('multiplication table') ||
    text.includes('diagonal') ||
    text.includes('pattern') ||
    text.includes('shade in the multiplication facts') ||
    text.includes('complete the chart');
}

function m3LikelyUnitSize(problem: ProblemSetCenteredProblem): number {
  const text = `${problem.sourcePrompt} ${problem.solvedAnswer} ${problem.equations.join(' ')}`;
  const facts = Array.from(text.matchAll(/(\d+)\s*(?:x|×)\s*(\d+)/gi))
    .map((match) => [Number(match[1]), Number(match[2])])
    .filter(([a, b]) => Number.isFinite(a) && Number.isFinite(b));
  const preferred = facts.find(([, b]) => b >= 6 && b <= 10) ?? facts.find(([a]) => a >= 6 && a <= 10);
  if (!preferred) {
    return 6;
  }
  return preferred[1] >= 6 && preferred[1] <= 10 ? preferred[1] : preferred[0];
}

function makeM3PatternTable(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSection {
  const lessonTable = /multiplication table|diagonal/i.test(problem.sourcePrompt);
  const columns = lessonTable ? ['Factor', 'x 6', 'x 7', 'x 8', 'x 9'] : ['Step', 'Pattern', 'Result'];
  const rows = lessonTable
    ? Array.from({ length: 9 }, (_, index) => {
        const factor = index + 1;
        return solved
          ? [String(factor), String(factor * 6), String(factor * 7), String(factor * 8), String(factor * 9)]
          : [String(factor), '____', '____', '____', '____'];
      })
    : [
        solved
          ? ['Known fact', 'Use a familiar product.', firstUsefulSolvedNumber(problem.solvedAnswer) ?? 'check source']
          : ['Known fact', 'Start from the official table, chart, or pattern.', '____'],
        solved
          ? ['Pattern', 'Compare factors, digits, or place value units.', teacherAnswerEvidence(problem.solvedAnswer)]
          : ['Pattern', 'Write what changes and what stays the same.', '____'],
        solved
          ? ['Answer', 'State the completed fact or explanation.', problem.quotientMeaning]
          : ['Answer', 'Complete the official blank or written explanation.', '____']
      ];

  return {
    kind: 'data-table',
    label: solved ? 'Solved pattern table' : 'Pattern workspace',
    columns,
    rows
  };
}

function firstUsefulSolvedNumber(answer: string): string | undefined {
  const match = answer.match(/\b\d+\b/);
  return match?.[0];
}

function makeM3ArrayOrWorkspace(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'][number] {
  const rows = boundedM3Count(problem.knownGroupCount ?? inferM3Factor(problem.equations, 0), 1, 12);
  const columns = boundedM3Count(problem.knownGroupSize ?? inferM3Factor(problem.equations, 1), 1, 12);

  if ((problem.knownGroupSize ?? columns) > 12) {
    return makeM3WorkspaceTable(problem, solved);
  }

  return {
    kind: 'array',
    label: solved
      ? `${rows} ${problem.groupLabel || 'groups'} of ${columns} ${problem.unitLabel || 'units'}`
      : `${rows} ${problem.groupLabel || 'groups'} workspace`,
    rows,
    columns,
    item: 'dot',
    splitAfterRows: problem.animationType === 'decompose-array' ? Math.min(5, Math.max(1, rows - 1)) : undefined,
    caption: solved
      ? `${rows} x ${columns} = ${rows * columns}; checked against the lesson fact.`
      : problem.animationType === 'decompose-array'
        ? `Break the array into a known part and an extra part, then add the partial products.`
        : `Use the array rows and columns to write the matching fact.`
  };
}

function makeM3Tape(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'][number] {
  if (problem.sourcePrompt.includes('60 seconds in 1 minute') && problem.sourcePrompt.includes('5 minutes and 45 seconds')) {
    return {
      kind: 'tape',
      label: solved ? 'Solved time tape' : 'Blank time tape',
      totalLabel: solved ? '345 seconds total' : 'total seconds',
      topParts: [
        {
          label: solved ? '5 minutes' : '5 min',
          sublabel: solved ? '5 x 60 seconds' : 'five 60-second parts',
          startPart: 0,
          partCount: 5
        },
        {
          label: '45 seconds',
          sublabel: 'extra seconds',
          startPart: 5,
          partCount: 1
        }
      ],
      parts: [
        { label: solved ? '60' : '60', sublabel: 'sec', emphasize: true },
        { label: solved ? '60' : '60', sublabel: 'sec', emphasize: true },
        { label: solved ? '60' : '60', sublabel: 'sec' },
        { label: solved ? '60' : '60', sublabel: 'sec' },
        { label: solved ? '60' : '60', sublabel: 'sec' },
        { label: solved ? '45' : '45', sublabel: 'sec', emphasize: true }
      ],
      braces: solved
        ? [
            { label: '5 minutes converted to seconds', boxLabel: '300 sec', startPart: 0, partCount: 5 },
            { label: '300 sec + 45 sec', boxLabel: '345 sec', startPart: 0, partCount: 6 }
          ]
        : [
            { label: 'first find 5 x 60', startPart: 0, partCount: 5 },
            { label: 'then add 45', startPart: 5, partCount: 1 }
          ],
      caption: solved
        ? 'Five full minutes are 5 x 60 = 300 seconds. Add the extra 45 seconds to get 345 seconds.'
        : 'Show five 60-second minute parts, then one extra 45-second part.'
    };
  }

  const partCount = boundedM3Count(problem.knownGroupCount ?? inferM3Factor(problem.equations, 0) ?? problem.quotient, 1, 12);
  const partLabel = solved
    ? String(problem.knownGroupSize ?? problem.quotient ?? '?')
    : problem.knownGroupSize
      ? String(problem.knownGroupSize)
      : '?';
  const total = problem.knownTotal ?? problem.quotient;
  return {
    kind: 'tape',
    label: solved ? 'Solved equal-unit model' : 'Blank equal-unit model',
    totalLabel: solved && total ? `${total} ${problem.unitLabel || 'units'}` : `${problem.unitLabel || 'units'} total`,
    parts: Array.from({ length: partCount }, (_, index) => ({
      label: partLabel,
      emphasize: index < Math.min(2, partCount)
    })),
    caption: solved ? teacherAnswerEvidence(problem.solvedAnswer) : problem.blankWorkspaceLabel ?? 'Use the source quantities to label the equal parts.'
  };
}

function makeM3WorkspaceTable(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'][number] {
  const equations = problem.equations?.length ? problem.equations : [];
  const blankWork = problem.blankEquations?.length
    ? problem.blankEquations.join('; ')
    : equations.length
      ? blankEquationTemplates(equations).join('; ')
      : 'Official table, model, or written-response blanks';
  return {
    kind: 'data-table',
    label: solved ? `Problem ${problem.number} completed source response` : `Problem ${problem.number} source response`,
    columns: ['Official task', 'Work', 'Answer'],
    rows: [
      [
        problem.sourcePrompt,
        solved ? equations.length ? equations.join('; ') : problem.solvedAnswer : blankWork,
        solved ? problem.solvedAnswer : '____'
      ]
    ]
  };
}

function usesM3Tape(problem: ProblemSetCenteredProblem): boolean {
  return (
    problem.blankVisualType === 'tape-diagram' ||
    problem.blankVisualType === 'bar-units' ||
    problem.blankVisualType === 'share-tape' ||
    problem.animationType === 'equal-sharing' ||
    problem.animationType === 'grouping-by-size'
  );
}

function inferM3Factor(equations: string[] | undefined, index: 0 | 1): number | undefined {
  const equation = equations?.find((line) => /\d+\s*x\s*\d+/i.test(line));
  const match = equation?.match(/(\d+)\s*x\s*(\d+)/i);
  return match ? Number(match[index + 1]) : undefined;
}

function boundedM3Count(value: number | undefined, min: number, max: number): number {
  if (!value || !Number.isFinite(value)) {
    return min;
  }

  return Math.max(min, Math.min(max, Math.round(value)));
}

function m3VisualTitle(problem: ProblemSetCenteredProblem, solved: boolean): string {
  if (!solved) {
    if (looksLikeMultiplicationTable(problem)) {
      return 'official fact-pattern workspace';
    }
    if (problem.blankVisualType === 'equation-workspace') {
      return 'official equation workspace';
    }
    return usefulPromptLead(firstPromptSentence(problem.sourcePrompt), problem.sourcePrompt);
  }

  if (problem.knownGroupCount && problem.knownGroupSize) {
    return `${problem.knownGroupCount} ${problem.groupLabel || 'groups'} of ${problem.knownGroupSize}`;
  }
  if (solved && problem.knownTotal && problem.knownGroupSize) {
    return `${problem.knownTotal} ${problem.unitLabel || 'units'} in groups of ${problem.knownGroupSize}`;
  }
  if (solved && problem.quotient && problem.unitLabel && problem.unitLabel !== 'units') {
    return `${problem.quotient} ${problem.unitLabel}`;
  }
  if (looksLikeMultiplicationTable(problem)) {
    return 'official fact-pattern workspace';
  }
  if (problem.blankVisualType === 'equation-workspace') {
    return 'official equation workspace';
  }
  return usefulPromptLead(firstPromptSentence(problem.sourcePrompt), problem.sourcePrompt);
}

function makeProblem(lessonNumber: number, problemIndex: number): ProblemSetCenteredProblem {
  const source = STUDENT_WORK_SOURCE[`m3-l${lessonNumber}`];
  const sourceProblem = source.problems[problemIndex];
  const problemKey = `${lessonNumber}-${sourceProblem.number}`;
  const sourcePrompt = SOURCE_PROMPT_OVERRIDES[problemKey] ?? cleanSourcePrompt(sourceProblem.prompt, lessonNumber, sourceProblem.number);
  const solvedAnswer = SOLVED_ANSWERS[lessonNumber][problemIndex];
  const sourceEquations = EQUATION_OVERRIDES[problemKey] ?? sourceProblem.equations;
  const metadata = PROBLEM_METADATA[problemKey] ?? {};

  const problem: ProblemSetCenteredProblem = {
    number: sourceProblem.number,
    sourcePrompt,
    blankPrompts: ['Complete the official Problem Set prompt, labels, equation blanks, table entries, or answer sentence.'],
    blankEquations: sourceEquations.length ? blankEquationTemplates(sourceEquations) : [],
    blankWorkspaceLabel: `Use this official Problem ${sourceProblem.number} workspace: ${usefulPromptLead(firstPromptSentence(sourcePrompt), sourcePrompt)}.`,
    blankVisualType: visualType(sourcePrompt),
    solvedAnswer,
    equations: EQUATION_OVERRIDES[problemKey] ?? equationsFromAnswer(solvedAnswer, sourceProblem.equations),
    quotient: quotientFromAnswer(solvedAnswer),
    quotientMeaning: 'The answer completes the official Problem Set item and names the requested quantity, pattern, or statement.',
    animationType: animationType(sourcePrompt),
    unitLabel: 'units',
    groupLabel: 'groups',
    explanation: 'Solved mode completes the same official Module 3 Problem Set item using the lesson strategy, then checks that the equation and answer match the prompt.',
    validationChecks: [
      'Reread the problem and confirm that every given quantity appears in the model or equation.',
      'Use multiplication or division to check the computed value.',
      'State the answer with the unit or label requested by the problem.'
    ]
  };

  return { ...problem, ...metadata };
}

function makeLesson(lessonNumber: number): ProblemSetCenteredLesson {
  const source = STUDENT_WORK_SOURCE[`m3-l${lessonNumber}`];
  const objective = LESSON_OBJECTIVES[lessonNumber];
  const summary = LESSON_SUMMARIES[lessonNumber];
  const sourcePageImages = WORKBOOK_PAGE_IMAGES[lessonNumber].map((imageName) => `/source-pages/m3/${imageName}`);
  const answerKeyImages = ANSWER_KEY_PAGE_IMAGES[lessonNumber] ?? [];
  const teacherSource = m3TeacherSource(lessonNumber);
  return {
    title: `Lesson ${lessonNumber}: ${objective}`,
    concept: summary,
    teacherEditionBasis: teacherSource,
    contrast: `What model or strategy helps you ${objective.replace(/[.]$/, '').replace(/^./, (letter) => letter.toLowerCase())}?`,
    summary,
    sourceNote: `${teacherSource} The official Module 3 Problem Set, answer key, and matching workbook page images control all facts and visual relationships.`,
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: [...sourcePageImages, ...answerKeyImages],
    conceptSections: lessonNumber <= 5 ? makeM3LessonsOneThroughFiveConceptSections(lessonNumber, teacherSource) : m3FunctionalConceptSections(lessonNumber) ?? [
      {
        title: '1. Teacher Edition objective',
        body: objective,
        teacherSource: source.teacherEditionSource,
        checkpoints: [
          'Use the official lesson objective to frame the concept.',
          'Keep the strategy tied to the Teacher Edition lesson focus.',
          'Reject answers or diagrams that do not match the official Problem Set item.'
        ]
      },
      {
        title: '2. Problem Set source reference',
        body: 'The official Student Workbook Problem Set pages are the source reference for prompt text, tables, arrays, labels, and response blanks. The interactive workspace below completes those items without replacing unsupported source graphics with invented diagrams.',
        teacherSource: source.studentWorkbookSource,
        checkpoints: [
          'Read the typed prompt against the source page when an item has tables or pictures.',
          'Use authored local visuals only when the quantities and structure are clear from the source.',
          'Use local problem links to move through the interactive Blank and Solved cards.'
        ]
      },
      {
        title: '3. Solved review check',
        body: 'Solved mode gives the Teacher Edition Answer Key result, reasoning, and validation checks. A generated visual is used only when it has been authored from the source item; otherwise the card uses equations and answer checks instead of fake models.',
        teacherSource: 'Module 3 Teacher Edition Answer Key, printed pages 279-316.',
        checkpoints: [
          'Check inverse multiplication and division facts when both apply.',
          'Check skip-counting, distributive, associative, or place-value reasoning against the final answer.',
          'Check that the answer sentence uses the requested unit or completes the requested pattern.'
        ]
      }
    ],
    problems: source.problems.map((_, problemIndex) => {
      const centeredProblem = makeProblem(lessonNumber, problemIndex);
      return {
        ...centeredProblem,
        sourcePageImages: centeredProblem.sourcePageImages ?? sourcePageImages,
        blankSourcePageImages: centeredProblem.blankSourcePageImages ?? sourcePageImages,
        solvedSourcePageImages: centeredProblem.solvedSourcePageImages ?? [...sourcePageImages, ...answerKeyImages],
        blankVisual: createM3ProblemVisual(centeredProblem, false, lessonNumber),
        solvedVisual: createM3ProblemVisual(centeredProblem, true, lessonNumber)
      };
    })
  };
}

function makeM3LessonsOneThroughFiveConceptSections(lessonNumber: number, teacherSource: string) {
  const lessonSections: Record<number, Array<{ title: string; body: string; checkpoints: string[] }>> = {
    1: [
      {
        title: '1. Read the same 18 liters two ways',
        body: 'Geri brings 3 water jugs with 6 liters in each jug. One tape shows 3 groups of 6; the turned tape shows 6 groups of 3. Both represent the same 18 liters.',
        checkpoints: ['Write 3 × 6 = 18.', 'Turn the model and write 6 × 3 = 18.', 'State that reversing the factors does not change the product.']
      },
      {
        title: '2. Use the commutative property',
        body: 'A known fact gives its partner: 2 × 7 = 7 × 2, 5 eights = 8 fives, and 4 nines = 9 fours.',
        checkpoints: ['Keep the same two factors.', 'Reverse only the factor order.', 'Check that both expressions have the same product.']
      },
      {
        title: '3. Reflect facts across the chart diagonal',
        body: 'The chart contains 100 facts. Known facts and their reflected partners fill 84 cells, leaving 16 cells in the 6-through-9 block. Twelve of those have partners, so there are 10 distinct facts to learn.',
        checkpoints: ['Locate a known fact.', 'Find its reflected cell across the diagonal.', 'Explain how commutativity reduced the number of new facts.']
      }
    ],
    2: [
      {
        title: '1. Start with five known units',
        body: 'Let one circle represent a unit n. Use the familiar fact 5 × n to find the value of five units.',
        checkpoints: ['Name the unit value.', 'Write 5 × n.', 'Find the known five-fact product.']
      },
      {
        title: '2. Add one more unit',
        body: 'Decompose 6 × n as 5 × n plus 1 × n. For sevens, 35 + 7 = 42; for eights, 40 + 8 = 48.',
        checkpoints: ['Keep the unit size unchanged.', 'Add exactly one more unit.', 'Connect the sum to 6 × n.']
      },
      {
        title: '3. Turn the six-fact',
        body: 'Use commutativity to relate 6 × n and n × 6. The factors reverse, but the product remains the same.',
        checkpoints: ['Write both related facts.', 'Use the same product in both equations.', 'Explain the Problem 1 and Problem 2 pattern.']
      }
    ],
    3: [
      {
        title: '1. Name what the letter represents',
        body: 'A letter replaces the question mark and stands for one story quantity, such as c for canoes, m for money, or n for loaves.',
        checkpoints: ['Choose a letter tied to the story.', 'Say the quantity and unit it represents.', 'Place it in the unknown position.']
      },
      {
        title: '2. Write the multiplication or division relationship',
        body: 'Use a familiar fact with the letter in the correct position: 3 × c = 24, 3 × 8 = m, or 28 ÷ 4 = n.',
        checkpoints: ['Match groups, group size, and total.', 'Write an equation that matches the model.', 'Use multiplication and division as related facts.']
      },
      {
        title: '3. Solve and label the unknown',
        body: 'Solve the familiar fact, then answer with its unit: c = 8 canoes, m = $24, or n = 7 loaves.',
        checkpoints: ['Check the value in the original equation.', 'Attach the requested unit.', 'For the challenge, remove the 12-minute difference before splitting the remaining time.']
      }
    ],
    4: [
      {
        title: '1. Build the count-by-six sequence',
        body: 'Count 6, 12, 18, 24, 30, 36, 42, 48, 54, 60. Each position tells how many groups of 6 make the total.',
        checkpoints: ['Add 6 for each next count.', 'Count backward by subtracting 6.', 'Match each count with its multiplication fact.']
      },
      {
        title: '2. Use a number bond to make a ten',
        body: 'When an added 6 crosses a ten, break the 6 into two parts. For 18 + 6, use 18 + 2 + 4 = 24.',
        checkpoints: ['Find the part needed to reach the next ten.', 'Use the leftover part of 6.', 'Confirm that both parts total 6.']
      },
      {
        title: '3. Connect multiplication and division',
        body: 'Seven sixes is 42, so 7 × 6 = 42 and 42 ÷ 6 = 7. Use this relationship for every count in the sequence.',
        checkpoints: ['Use the count position as one factor.', 'Use 6 as the unit factor and divisor.', 'Check multiplication with the related division fact.']
      }
    ],
    5: [
      {
        title: '1. Build the count-by-seven sequence',
        body: 'Count 7, 14, 21, 28, 35, 42, 49, 56, 63, 70. Each position names a multiplication fact with a unit of 7.',
        checkpoints: ['Add 7 for each next count.', 'Match each fish-bowl total to its multiplication fact.', 'Name the related division fact.']
      },
      {
        title: '2. Bridge a ten with a number bond',
        body: 'For 14 + 7, break 7 into 6 and 1: reach 20 with 6, then add the remaining 1 to make 21.',
        checkpoints: ['Find the part needed to reach the next ten.', 'Use the leftover part of 7.', 'Explain why 6 + 1 still equals 7.']
      },
      {
        title: '3. Read the related fact pair',
        body: 'Six sevens is 42, so 6 × 7 = 42 and 42 ÷ 7 = 6. Commutativity also shows 7 × 6 = 42.',
        checkpoints: ['Use the count position as the number of groups.', 'Keep 7 as the unit size.', 'Explain why counting by six seven times reaches the same product.']
      }
    ]
  };

  return lessonSections[lessonNumber].map((section) => ({ ...section, teacherSource }));
}

export const M3_PROBLEM_SET_CENTERED_LESSONS: Record<number, ProblemSetCenteredLesson> = Object.fromEntries(
  Array.from({ length: 21 }, (_, index) => {
    const lessonNumber = index + 1;
    return [lessonNumber, makeLesson(lessonNumber)];
  })
);
