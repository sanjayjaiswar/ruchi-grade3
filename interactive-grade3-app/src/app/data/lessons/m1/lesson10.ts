import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const LESSON10_CONCEPT_TERMS = ['array', 'decompose', 'product'];

export const LESSON10_TEACHER_EDITION_STEPS = [
  {
    id: 'source-goal',
    title: 'Use the guitar string story',
    shortTitle: 'Goal',
    studentPrompt: 'A guitar has 6 strings. Use 3 guitars to build 3 rows of 6 and find the total.',
    teacherEditionBasis:
      'Lesson 10 Application Problem: A guitar has 6 strings. How many strings are there on 3 guitars? Write a multiplication equation to solve.',
    visualModel: 'array'
  },
  {
    id: 'source-model',
    title: 'Draw the whole array first',
    shortTitle: 'Model',
    studentPrompt: 'Draw a 3 × 6 array. Let one row show the strings on one guitar.',
    teacherEditionBasis:
      'Teacher Edition Concept Development: Draw an array to represent the total number of guitar strings. Let the number of strings on one guitar be 1 row.',
    visualModel: 'array'
  },
  {
    id: 'source-meaning',
    title: 'Name what each part means',
    shortTitle: 'Meaning',
    studentPrompt: 'The 3 means 3 guitars. The 6 means 6 strings on each guitar. The total is 18 strings.',
    teacherEditionBasis: 'Teacher asks students to connect the rows and group size to the story before using equations.',
    visualModel: 'array'
  },
  {
    id: 'source-picture',
    title: 'Put a dotted line through the array',
    shortTitle: 'Picture',
    studentPrompt: 'Split the 3 rows into 1 row and 2 rows. The dotted line changes the strategy, not the total.',
    teacherEditionBasis: 'Teacher Edition: Make a dotted line below the first row to show just one guitar.',
    visualModel: 'array'
  },
  {
    id: 'source-draw',
    title: 'Write the two smaller products',
    shortTitle: 'Draw',
    studentPrompt: 'Write 1 × 6 = 6 and 2 × 6 = 12. Then add 6 + 12 to get 18.',
    teacherEditionBasis: 'Teacher Edition: Write and solve a multiplication sentence to describe each part of the array.',
    visualModel: 'array'
  },
  {
    id: 'source-exit',
    title: 'Try the same move with 7 × 3',
    shortTitle: 'Exit',
    studentPrompt: 'For 7 × 3, split 7 rows into 5 rows and 2 rows: (5 × 3) + (2 × 3).',
    teacherEditionBasis: 'Lesson 10 Problem Set begins with 7 × 3 = (5 × 3) + (2 × 3).',
    visualModel: 'array'
  },
  {
    id: 'source-summary',
    title: 'Say the takeaway',
    shortTitle: 'Sum',
    studentPrompt: 'Decompose the rows, multiply each part, and add the partial products to find the same total.',
    teacherEditionBasis:
      'Lesson objective: Model the distributive property with arrays to decompose units as a strategy to multiply.',
    visualModel: 'array'
  }
] satisfies LessonRuntimeConfig['teacherEditionSteps'];

export const LESSON10_ARRAY_DECOMPOSITION_MODEL = {
  title: 'Teacher Edition model: 3 guitars with 6 strings each',
  totalGroups: 3,
  groupSize: 6,
  firstPart: 1,
  secondPart: 2,
  context: 'Split the 3 guitar rows into 1 row and 2 rows.',
  equation: '3 × 6 = (1 × 6) + (2 × 6) = 6 + 12 = 18',
  teacherPrompt: 'What does each row mean in the guitar story?'
};

export const LESSON10_ARRAY_DECOMPOSITION_EXAMPLES = [
  {
    title: 'Problem 1: break 7 rows into 5 rows and 2 rows',
    totalGroups: 7,
    groupSize: 3,
    firstPart: 5,
    secondPart: 2,
    context: 'Keep the group size 3. Decompose the 7 rows into 5 rows and 2 rows.',
    equation: '7 × 3 = (5 × 3) + (2 × 3) = 15 + 6 = 21',
    teacherPrompt: 'What stayed the same? What did we break apart?'
  },
  {
    title: 'Problem 2: break 8 rows into 4 rows and 4 rows',
    totalGroups: 8,
    groupSize: 3,
    firstPart: 4,
    secondPart: 4,
    context: 'Both parts are 4 rows of 3, so the two partial products match.',
    equation: '8 × 3 = (4 × 3) + (4 × 3) = 12 + 12 = 24',
    teacherPrompt: 'How do the two smaller arrays make the same whole array?'
  },
  {
    title: "Problem 3: Ruby's album page",
    totalGroups: 5,
    groupSize: 3,
    firstPart: 2,
    secondPart: 3,
    context: 'Ruby has 5 rows of 3 photos. The top part has 2 rows and the bottom part has 3 rows.',
    equation: '5 × 3 = (2 × 3) + (3 × 3) = 6 + 9 = 15',
    teacherPrompt: 'Where do the 6 and 9 come from in the array?'
  }
];

export const LESSON10_STUDENT_WORK_SUPPORT = {
  1: {
    answer: 'Show 7 rows of 3 split into 5 rows of 3 and 2 rows of 3. Then add 15 + 6 to get 21.',
    teacherLookFor:
      'The dotted split breaks apart the rows, not the group size. The whole array still shows 7 groups of 3.'
  },
  2: {
    answer: 'Show 8 rows of 3 split into 4 rows of 3 and 4 rows of 3. Then add 12 + 12 to get 24.',
    teacherLookFor:
      'Each partial product matches one side of the split array, and the two parts recombine to the original 8 rows.'
  },
  3: {
    answer: "Show Ruby's page as 5 rows of 3 split into 2 rows and 3 rows. Explain that 6 + 9 is the same total as 5 × 3.",
    teacherLookFor:
      'The explanation names the top and bottom parts of the album page and connects them to 2 × 3 and 3 × 3.'
  }
};

const LESSON10_COMMON_SOURCE_ROWS = [
  { label: 'Whole', value: '3 guitars with 6 strings each: 3 × 6 = 18' },
  { label: 'Split', value: '1 row of 6 and 2 rows of 6' },
  { label: 'Recombine', value: '6 + 12 = 18, the same total strings' }
];

export const LESSON10_SOURCE_ROWS = {
  'source-goal': [
    { label: 'Story', value: 'A guitar has 6 strings. How many strings are on 3 guitars?' },
    { label: 'Equation', value: '3 × 6 = 18' },
    { label: 'Why it matters', value: 'The story becomes the array used for the lesson.' }
  ],
  'source-model': [
    { label: 'Rows', value: '3 rows because there are 3 guitars' },
    { label: 'Row size', value: '6 dots in each row because each guitar has 6 strings' },
    { label: 'Total', value: '18 strings' }
  ],
  'source-meaning': [
    { label: '3', value: 'number of guitars, shown as rows' },
    { label: '6', value: 'strings on one guitar, shown in each row' },
    { label: '18', value: 'total strings across all guitars' }
  ],
  'source-picture': [
    { label: 'Dotted line', value: 'shows 1 guitar above and 2 guitars below' },
    { label: 'Same whole', value: 'the array still has 3 rows of 6' },
    { label: 'Purpose', value: 'break a harder fact into easier parts' }
  ],
  'source-draw': [
    { label: 'Top part', value: '1 × 6 = 6' },
    { label: 'Bottom part', value: '2 × 6 = 12' },
    { label: 'Add', value: '6 + 12 = 18' }
  ],
  'source-exit': [
    { label: 'Problem Set', value: '7 × 3 = (5 × 3) + (2 × 3)' },
    { label: 'Rows split', value: '7 rows become 5 rows and 2 rows' },
    { label: 'Add', value: '15 + 6 = 21' }
  ],
  'source-summary': LESSON10_COMMON_SOURCE_ROWS
};

export const LESSON10_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: LESSON10_CONCEPT_TERMS,
  teacherEditionSteps: LESSON10_TEACHER_EDITION_STEPS,
  studentWorkSupport: LESSON10_STUDENT_WORK_SUPPORT,
  sourceRows: LESSON10_SOURCE_ROWS,
  arrayDecompositionModel: LESSON10_ARRAY_DECOMPOSITION_MODEL,
  arrayDecompositionExamples: LESSON10_ARRAY_DECOMPOSITION_EXAMPLES
};
