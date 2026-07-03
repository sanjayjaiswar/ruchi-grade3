import type { LessonRuntimeConfig } from '../lesson-runtime.types';

const TE_SOURCE = 'EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, Lesson 1, printed pages 12-18.';
const WORKBOOK_SOURCE = 'Module 5 Teacher Edition Lesson 1 Problem Set, printed pages 16-17.';

export const M5_LESSON1_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    'whole',
    'fraction',
    'unit fraction',
    'equal parts',
    'halves',
    'fourths',
    'thirds',
    'sixths'
  ],
  lessonAnimation: {
    kind: 'fraction-strip',
    title: 'Lesson 1 animation: partition concrete wholes into equal parts',
    context: 'Use a 12-inch strip to make halves, fourths, thirds, and sixths; use identical cups to show equal parts of a liquid amount.',
    equation: '1 equal part of a named whole = a unit fraction',
    teacherPrompt: 'Name the whole first, check that the parts are equal, then count the unit fractions.',
    focus: [
      '12-inch strip as the whole',
      'fill line as the whole beaker amount',
      'equal parts before fraction names',
      'unit fractions from concrete models'
    ],
    fractionPartCount: 6,
    fractionShadedCount: 1
  },
  teacherEditionSteps: [
    {
      id: 'source-goal',
      title: 'Lesson 1 objective',
      shortTitle: 'Goal',
      studentPrompt: 'Specify and partition a whole into equal parts, identifying and counting unit fractions using concrete models.',
      teacherEditionBasis: TE_SOURCE,
      visualModel: 'fraction-strip'
    },
    {
      id: 'source-model',
      title: 'Concept: fraction strips',
      shortTitle: 'Strips',
      studentPrompt: 'Measure a 12-inch strip. Mark 6 inches to make halves, mark 3 and 9 inches to make fourths, then use a second strip marked at 4 and 8 inches for thirds and at 2, 6, and 10 inches for sixths.',
      teacherEditionBasis: 'Teacher Edition Lesson 1 Concept Development, Part 1, printed pages 12-13.',
      visualModel: 'fraction-strip'
    },
    {
      id: 'source-liquid',
      title: 'Concept: liquid amount',
      shortTitle: 'Cups',
      studentPrompt: 'Use two identical cups. Fill the right cup to a low mark, pour that amount into the left cup and mark it, repeat the pour, and use the left cup marks to show half and whole amounts.',
      teacherEditionBasis: 'Teacher Edition Lesson 1 Concept Development, Part 2, printed page 13.',
      visualModel: 'measurement'
    },
    {
      id: 'source-picture',
      title: 'Problem Set visuals',
      shortTitle: 'Problems',
      studentPrompt: 'Problem 1 uses beakers labeled 1 half, 1 fourth, and 1 third. Problem 2 uses string-cheese rectangles partitioned into 3, 6, and 4 equal parts. Problems 3-5 use rectangle partitions, paper sheets labeled sevenths and ninths, and a 12-inch wood strip cut into 6-inch pieces.',
      teacherEditionBasis: WORKBOOK_SOURCE,
      visualModel: 'fraction-strip'
    },
    {
      id: 'source-meaning',
      title: 'Student Debrief focus',
      shortTitle: 'Debrief',
      studentPrompt: 'Use the words fractional units, equal parts, fraction, whole, halves, fourths, thirds, and sixths. Notice that the whole in Problem 2 never changes and that more equal parts make smaller unit fractions.',
      teacherEditionBasis: 'Teacher Edition Lesson 1 Student Debrief, printed pages 14-15.',
      visualModel: 'fraction-strip'
    }
  ],
  sourceRows: {
    'source-goal': [
      { label: 'Source', value: TE_SOURCE },
      { label: 'Source text', value: 'Objective: Specify and partition a whole into equal parts, identifying and counting unit fractions using concrete models.' },
      { label: 'Workbook', value: WORKBOOK_SOURCE }
    ],
    'source-model': [
      { label: 'Source', value: 'Teacher Edition Lesson 1 Concept Development, Part 1, printed pages 12-13.' },
      { label: 'Source text', value: 'Students measure 12-inch strips and partition them into halves, fourths, thirds, and sixths by marking measured points.' },
      { label: 'Workbook', value: WORKBOOK_SOURCE }
    ],
    'source-liquid': [
      { label: 'Source', value: 'Teacher Edition Lesson 1 Concept Development, Part 2, printed page 13.' },
      { label: 'Source text', value: 'Two identical cups and repeated equal pours are used to mark half and whole amounts of liquid.' },
      { label: 'Workbook', value: WORKBOOK_SOURCE }
    ],
    'source-picture': [
      { label: 'Source', value: WORKBOOK_SOURCE },
      { label: 'Source text', value: 'The Problem Set contains beakers, string-cheese rectangles, rectangle partition prompts, paper sheets labeled sevenths and ninths, and Rochelle\'s 12-inch wood strip problem.' },
      { label: 'Workbook', value: WORKBOOK_SOURCE }
    ],
    'source-meaning': [
      { label: 'Source', value: 'Teacher Edition Lesson 1 Student Debrief, printed pages 14-15.' },
      { label: 'Source text', value: 'Encourage fraction vocabulary and discuss how the same whole changes unit-fraction size as it is divided into more equal parts.' },
      { label: 'Workbook', value: WORKBOOK_SOURCE }
    ]
  }
};
