import { STUDENT_WORK_SOURCE } from '../../student-work-source.generated';
import type {
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem
} from '../lesson-runtime.types';

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
  20: 'Use place value strategies and the associative property n x (m x 10) = (n x m) x 10 to multiply by multiples of 10.',
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
    'Teacher Edition Answer Key: 14, 28, 35, 56, 63, 70.',
    'Teacher Edition Answer Key: 21, 35, 49, 56, 70.',
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
    'Teacher Edition Answer Key: a. Picture models equation; 7. b. 4. c. 48 cm. d. 9.'
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
    'Teacher Edition Answer Key: a. 54; 9; 9; 54. b. 63; 18; 2; 9; 63. c. 72; 27; 3; 9; 72. d. 81; 36; 4; 9; 81.',
    'Teacher Edition Answer Key: a. 54; 60; 54. b. 63; 70; 63. c. 72; 80; 72. d. 81; 90; 81.',
    'Teacher Edition Answer Key: 36; answers will vary.',
    'Teacher Edition Answer Key: Products and quotients matched.'
  ],
  13: [
    'Teacher Edition Answer Key: a. 18, 27, 45, 54, 63, 81, 90. b. +1. c. -1.',
    'Teacher Edition Answer Key: a. Answer provided. b. 18. c. 28; 27; 27. d. 37; 36; 36. e. 46; 45; 45. f. 55; 54; 54. g. 64; 63; 63. h. 73; 72; 72. i. 82; 81; 81. j. 91; 90; 90.',
    'Teacher Edition Answer Key: a. +10, -1. b. 99; 108; 117; 126. c. 54; 63; strategy accurately used to solve. d. Answers will vary.',
    'Teacher Edition Answer Key: a = 6; g = 9; d = 8; o = 90; e = 7; n = 3; s = 4; t = 2; i = 45. Add a “g” and it’s gone!'
  ],
  14: [
    'Teacher Edition Answer Key: a. Answer provided; 9; 27, 2, 7, 9; 36, 3, 6, 9; 45, 4, 5, 9; 54, 5, 4, 9; 63, 6, 3, 9; 72, 7, 2, 9; 81, 8, 1, 9; 90, 9, 0, 9. b. 9; answers will vary. c. Incorrect; answers will vary.',
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
    'Teacher Edition Answer Key: Products accurately recorded; answers to parts a-d vary by explanation.',
    'Teacher Edition Answer Key: Products accurately labeled; arrays drawn and labeled.'
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

  return templates.length > 0 ? Array.from(new Set(templates)) : ['Use the workbook blanks for this problem.'];
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

const PROBLEM_METADATA: Record<string, Partial<ProblemSetCenteredProblem>> = {
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
    equations: ['4 x 7 = 28', '28 divided by 4 = 7'],
    knownTotal: 28,
    knownGroupSize: 4,
    quotient: 7,
    quotientMeaning: 'The answer 7 means the number of loaves of bread.',
    animationType: 'grouping-by-size',
    unitLabel: 'cups',
    groupLabel: 'loaves',
    explanation: 'The prompt gives 28 cups total and 4 cups per loaf. Seven loaves use 28 cups.',
    validationChecks: ['The total is 28 cups.', 'Each loaf uses 4 cups.', 'The answer names 7 loaves.']
  },
  '7-2': {
    blankWorkspaceLabel: 'Use the six 8-unit parts in the tape diagram.',
    blankVisualType: 'array-template',
    equations: ['6 x 8 = 48', '8 x 6 = 48'],
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
    equations: ['9 x 8 = 72'],
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
    equations: ['32 divided by 8 = 4', '8 x 4 = 32'],
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
    equations: ['6 x 8 = 48'],
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
    equations: ['24 divided by 8 = 3'],
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

function cleanSourcePrompt(prompt: string, lessonNumber: number, problemNumber: number): string {
  const normalizedPrompt = prompt.replace(/\s+/g, ' ').trim();
  const extractedTail = EXTRACTED_PROMPT_TAILS[`${lessonNumber}-${problemNumber}`];
  if (extractedTail && normalizedPrompt.endsWith(extractedTail)) {
    return maskExtractedPromptEquations(normalizedPrompt.slice(0, -extractedTail.length).trim());
  }
  return maskExtractedPromptEquations(normalizedPrompt);
}

function equationsFromAnswer(answer: string, sourceEquations: string[]): string[] {
  const answerEquations = answer.match(/\d+\s*(?:x|\+|-|divided by)\s*\d+\s*=\s*\d+/g) ?? [];
  const equations = [...sourceEquations.map(normalizeEquation), ...answerEquations.map(normalizeEquation)]
    .filter((equation) => equation.length > 0 && !equation.includes('____'));
  const unique = Array.from(new Set(equations));
  return unique.length > 0 ? unique.slice(0, 8) : [answer];
}

function quotientFromAnswer(answer: string): number {
  const firstNumber = answer.match(/\b\d+\b/);
  return firstNumber ? Number(firstNumber[0]) : 1;
}

function makeProblem(lessonNumber: number, problemIndex: number): ProblemSetCenteredProblem {
  const source = STUDENT_WORK_SOURCE[`m3-l${lessonNumber}`];
  const sourceProblem = source.problems[problemIndex];
  const solvedAnswer = SOLVED_ANSWERS[lessonNumber][problemIndex];
  const metadata = PROBLEM_METADATA[`${lessonNumber}-${sourceProblem.number}`] ?? {};

  const problem: ProblemSetCenteredProblem = {
    number: sourceProblem.number,
    sourcePrompt: cleanSourcePrompt(sourceProblem.prompt, lessonNumber, sourceProblem.number),
    blankPrompts: ['Complete the official Problem Set prompt, labels, equation blanks, table entries, or answer sentence.'],
    blankEquations: blankEquationTemplates(sourceProblem.equations),
    blankWorkspaceLabel: 'Use the official source reference for any printed table, array, picture, or workspace not redrawn here.',
    blankVisualType: visualType(sourceProblem.prompt),
    solvedAnswer,
    equations: equationsFromAnswer(solvedAnswer, sourceProblem.equations),
    quotient: quotientFromAnswer(solvedAnswer),
    quotientMeaning: 'The answer completes the official Problem Set item and names the requested quantity, pattern, or statement.',
    animationType: animationType(sourceProblem.prompt),
    unitLabel: 'units',
    groupLabel: 'groups',
    explanation: 'Solved mode completes the same official Module 3 Problem Set item using the lesson strategy, then checks that the equation and answer match the prompt.',
    validationChecks: [
      'The prompt text matches the official Module 3 Problem Set source; the Teacher Edition is the controlling source.',
      'The solved answer is checked against the Module 3 Teacher Edition Answer Key.',
      'The visual model is used only when the source problem provides the quantities and structure.'
    ]
  };

  return { ...problem, ...metadata };
}

function makeLesson(lessonNumber: number): ProblemSetCenteredLesson {
  const source = STUDENT_WORK_SOURCE[`m3-l${lessonNumber}`];
  const objective = LESSON_OBJECTIVES[lessonNumber];
  const summary = LESSON_SUMMARIES[lessonNumber];
  return {
    title: `Lesson ${lessonNumber}: ${objective}`,
    concept: summary,
    teacherEditionBasis: source.teacherEditionSource,
    contrast: 'Use the Teacher Edition objective and the official Problem Set pages as the source of truth before accepting a solved answer.',
    summary,
    sourceNote: `${source.teacherEditionSource} Module 3 Teacher Edition Problem Set and Answer Key, printed pages 279-316. Matching official workbook pages are collapsed as visual source references only.`,
    sourcePageImages: WORKBOOK_PAGE_IMAGES[lessonNumber].map((imageName) => `/source-pages/m3/${imageName}`),
    conceptSections: [
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
    problems: source.problems.map((_, problemIndex) => makeProblem(lessonNumber, problemIndex))
  };
}

export const M3_PROBLEM_SET_CENTERED_LESSONS: Record<number, ProblemSetCenteredLesson> = Object.fromEntries(
  Array.from({ length: 21 }, (_, index) => {
    const lessonNumber = index + 1;
    return [lessonNumber, makeLesson(lessonNumber)];
  })
);
