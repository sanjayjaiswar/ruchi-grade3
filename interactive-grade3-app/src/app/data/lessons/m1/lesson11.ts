import type {
  LessonRuntimeConfig,
  SourceVisualFacts,
  SourceWorkspaceModel,
  StudentWorkSupport
} from '../lesson-runtime.types';

export const LESSON11_CONCEPT_TERMS = ['division', 'quotient', 'unknown factor', 'tape diagram'];

export const LESSON11_TEACHER_EDITION_STEPS = [
  {
    id: 'source-goal',
    title: "Use Rosie's iced tea story",
    shortTitle: 'Goal',
    studentPrompt: 'Rosie puts 2 lemon slices in each cup and uses 8 slices. Find the number of cups.',
    teacherEditionBasis:
      'Lesson 11 Application Problem: Rosie puts 2 lemon slices in each cup of iced tea. She uses a total of 8 slices.',
    visualModel: 'array'
  },
  {
    id: 'source-model',
    title: 'Connect the array to division',
    shortTitle: 'Model',
    studentPrompt: 'Use a 2 x 4 array: each column is 1 cup, 2 slices are in each cup, and 8 slices are total.',
    teacherEditionBasis:
      'Teacher Edition Problem 1: Draw or project a 2 x 4 array and ask how it helps solve 8 divided by 2 = ___.',
    visualModel: 'array'
  },
  {
    id: 'source-meaning',
    title: 'Turn the array into a tape diagram',
    shortTitle: 'Meaning',
    studentPrompt:
      'Box the columns as tape-diagram units. The whole is 8 slices, each unit is 2 slices, and the unknown is ? cups.',
    teacherEditionBasis: 'Problem 1 labels the whole 8 lemon slices, the unit value 2 slices, and the unknown ? cups.',
    visualModel: 'tape-diagram'
  },
  {
    id: 'source-picture',
    title: 'Compare the two unknowns',
    shortTitle: 'Picture',
    studentPrompt:
      'Rosie asks for the number of groups. Ms. Alves has 21 papers in 7 piles and asks for the number in each group.',
    teacherEditionBasis:
      'Problem 2: Ms. Alves puts 21 papers in 7 piles. Students write 7 × ___ = 21 and 21 divided by 7 = ___.',
    visualModel: 'tape-diagram'
  },
  {
    id: 'source-draw',
    title: 'Write the related equations',
    shortTitle: 'Draw',
    studentPrompt:
      'Use the labels to write both equations: 8 divided by 2 = 4 and 4 times 2 = 8; 21 divided by 7 = 3 and 7 times 3 = 21.',
    teacherEditionBasis:
      'Teacher asks students to use the tape diagram to see the unknown in both the division and multiplication equations.',
    visualModel: 'array'
  },
  {
    id: 'source-exit',
    title: 'Exit ticket: stickers on homework papers',
    shortTitle: 'Exit',
    studentPrompt:
      'Ms. McCarty has 18 stickers and puts 2 stickers on each homework paper. Model with an array and tape diagram.',
    teacherEditionBasis:
      'Lesson 11 Exit Ticket: model 18 stickers, 2 on each homework paper, with both an array and a labeled tape diagram.',
    visualModel: 'tape-diagram'
  },
  {
    id: 'source-summary',
    title: 'Say the takeaway',
    shortTitle: 'Sum',
    studentPrompt:
      'Division can find the missing factor in a related multiplication equation. The quotient must be named in context.',
    teacherEditionBasis:
      'Lesson objective: Model division as the unknown factor in multiplication using arrays and tape diagrams.',
    visualModel: 'tape-diagram'
  }
] satisfies LessonRuntimeConfig['teacherEditionSteps'];

export const LESSON11_STUDENT_WORK_SUPPORT = {
  1: {
    answer: 'Student completes the workbook drawing and blank equation; the app does not prefill the solution.',
    teacherLookFor:
      'The student shows 6 columns or tape units, labels 12 oranges as the whole, 2 oranges in each bag, and ? bags as the unknown.'
  },
  2: {
    answer: 'Student draws both an array and a labeled tape diagram before writing the answer in the workbook blank.',
    teacherLookFor:
      'The student shows 6 bags or units and names the quotient as the number of plums in each bag, not the number of bags.'
  },
  3: {
    answer: 'Student models the stacks with an array and a labeled tape diagram; no solution is shown first.',
    teacherLookFor:
      'The student labels 7 piles as the known number of groups and 2 baskets as the unknown size of each group.'
  },
  4: {
    answer: 'Student models the bags with an array and a labeled tape diagram; no solution is shown first.',
    teacherLookFor: 'The student uses 8 bags as the known groups and labels the group size as the unknown.'
  },
  5: {
    answer: 'Student uses the open workspace to draw or reason from the story; no solution is shown first.',
    teacherLookFor: 'The student names the quotient as the number of $2 weeks needed to reach the $16 whole.'
  }
} satisfies Record<number, StudentWorkSupport>;

export const LESSON11_STUDENT_WORK_EQUATIONS = {
  1: ['_____ ÷ 2 = _____'],
  2: [],
  3: [],
  4: [],
  5: []
} satisfies Record<number, string[]>;

export const LESSON11_STUDENT_WORK_MODELS = {
  1: {
    problemNumber: 1,
    kind: 'problem1-guided',
    arrayPrompt: 'Draw an array here. Each column shows one bag of oranges.',
    equationTemplate: '_____ ÷ 2 = _____',
    tapePartCount: 6,
    firstUnitItemCount: 2,
    tapePrompt: 'First tape unit is done for you.',
    lowerLabelPrompt: 'Label known and unknown information.'
  },
  2: {
    problemNumber: 2,
    kind: 'blank-array-tape',
    arrayPrompt: 'Draw the array and the labeled tape diagram in the workbook space.'
  },
  3: {
    problemNumber: 3,
    kind: 'blank-array-tape',
    arrayPrompt: 'Draw the array and the labeled tape diagram in the workbook space.'
  },
  4: {
    problemNumber: 4,
    kind: 'blank-array-tape',
    arrayPrompt: 'Draw the array and the labeled tape diagram in the workbook space.'
  },
  5: {
    problemNumber: 5,
    kind: 'blank-workspace',
    arrayPrompt: 'Use this space for the workbook drawing or RDW reasoning.'
  }
} satisfies Record<number, SourceWorkspaceModel>;

export const LESSON11_SOURCE_VISUAL_FACTS = {
  'source-goal': {
    groupCount: 4,
    groupSize: 2,
    rowCount: 2,
    columnCount: 4,
    tapePartCount: 4,
    tapePartLabel: '2 slices',
    tapeWholeLabel: '8 slices',
    tapeCaption: '4 cups × 2 slices = 8 slices'
  },
  'source-model': {
    groupCount: 4,
    groupSize: 2,
    rowCount: 2,
    columnCount: 4,
    tapePartCount: 4,
    tapePartLabel: '2 slices',
    tapeWholeLabel: '8 slices',
    tapeCaption: '8 divided by 2 finds ? cups'
  },
  'source-meaning': {
    groupCount: 4,
    groupSize: 2,
    rowCount: 2,
    columnCount: 4,
    tapePartCount: 4,
    tapePartLabel: '2 slices',
    tapeWholeLabel: '8 slices',
    tapeCaption: 'unknown = ? cups; quotient means number of groups'
  },
  'source-picture': {
    groupCount: 7,
    groupSize: 3,
    rowCount: 3,
    columnCount: 7,
    tapePartCount: 7,
    tapePartLabel: '? papers',
    tapeWholeLabel: '21 papers',
    tapeCaption: '7 × ? = 21; quotient means size of each group'
  },
  'source-draw': {
    groupCount: 7,
    groupSize: 3,
    rowCount: 3,
    columnCount: 7,
    tapePartCount: 7,
    tapePartLabel: '3 papers',
    tapeWholeLabel: '21 papers',
    tapeCaption: '21 divided by 7 = 3 and 7 × 3 = 21'
  },
  'source-exit': {
    groupCount: 9,
    groupSize: 2,
    rowCount: 2,
    columnCount: 9,
    tapePartCount: 9,
    tapePartLabel: '2 stickers',
    tapeWholeLabel: '18 stickers',
    tapeCaption: '18 divided by 2 = 9 homework papers'
  },
  'source-summary': {
    groupCount: 9,
    groupSize: 2,
    rowCount: 2,
    columnCount: 9,
    tapePartCount: 9,
    tapePartLabel: '2 each',
    tapeWholeLabel: 'whole',
    tapeCaption: 'division quotient = missing multiplication factor'
  }
} satisfies Record<string, SourceVisualFacts>;

export const LESSON11_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: LESSON11_CONCEPT_TERMS,
  showMultiplicationDivisionVocabularyNote: true,
  teacherEditionSteps: LESSON11_TEACHER_EDITION_STEPS,
  studentWorkSupport: LESSON11_STUDENT_WORK_SUPPORT,
  studentWorkEquations: LESSON11_STUDENT_WORK_EQUATIONS,
  sourceWorkspaceModels: LESSON11_STUDENT_WORK_MODELS,
  sourceVisualFacts: LESSON11_SOURCE_VISUAL_FACTS
};
