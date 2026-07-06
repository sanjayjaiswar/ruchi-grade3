import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON3_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    'fives',
    'ones',
    'nearest minute',
    'number line',
    'clock'
  ],
  lessonAnimation: {
    kind: 'clock',
    title: 'Lesson 3 animation: count fives, then ones',
    context: 'Use the 0-60 minute line from Lesson 2, then count the small one-minute ticks between the fives to tell exact clock times.',
    equation: '(7 x 5) + 2 = 37 minutes',
    teacherPrompt: 'Count by fives to the benchmark minute, then count ones to the exact minute. Transfer that exact minute position to the clock.',
    focus: [
      '5-minute benchmarks',
      'one-minute ticks',
      'exact clock time',
      'continuous number line'
    ],
    clockLabels: [
      '35 min',
      '+1',
      '+2',
      '37 min'
    ]
  },
  teacherEditionSteps: [
    {
      id: 'source-goal',
      title: 'Lesson 3: source objective',
      shortTitle: 'Goal',
      studentPrompt: 'Count by fives and ones on the number line as a strategy to tell time to the nearest minute on the clock.',
      teacherEditionBasis: 'EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 37-49. Lesson 3 objective, Concept Development, Problem Set, and Student Debrief.',
      visualModel: 'number-line'
    },
    {
      id: 'source-model',
      title: 'Teacher source concept',
      shortTitle: 'Model',
      studentPrompt: 'Draw a 0-60 minute number line, label the fives, then imagine or mark the one-minute ticks inside each five-minute interval.',
      teacherEditionBasis: 'Teacher Edition Lesson 3 Concept Development, Problem 1.',
      visualModel: 'number-line'
    },
    {
      id: 'source-meaning',
      title: 'Key teaching move',
      shortTitle: 'Meaning',
      studentPrompt: 'For 7:37, count seven fives to 35 and two ones to 37. The equation (7 x 5) + 2 = 37 explains the minute position.',
      teacherEditionBasis: 'Teacher Edition Lesson 3 Concept Development, Problem 2.',
      visualModel: 'number-line'
    },
    {
      id: 'source-picture',
      title: 'Problem Set reference',
      shortTitle: 'Set',
      studentPrompt: 'The Problem Set asks students to match clocks to exact-minute points, draw hands for 6:48 and 8:23, read Rebecca\'s 5:27 clock, and count back 11 minutes for Mason.',
      teacherEditionBasis: 'Module 2 Lesson 3 Problem Set, pages 44-45.',
      visualModel: 'clock'
    },
    {
      id: 'source-draw',
      title: 'Clock connection',
      shortTitle: 'Clock',
      studentPrompt: 'The clock is a circular number line. The large numbers mark fives, and the small marks between them are ones.',
      teacherEditionBasis: 'Teacher Edition Lesson 3 Concept Development, Problem 3.',
      visualModel: 'clock'
    },
    {
      id: 'source-exit',
      title: 'Answer-key evidence',
      shortTitle: 'Check',
      studentPrompt: 'Solved work must preserve exact minutes: 7:17, 7:03, 7:55, 7:41, 6:48, 8:23, 5:27, 3:56, and 3:45.',
      teacherEditionBasis: 'Teacher Edition Lesson 3 Answer Key, Problem Set.',
      visualModel: 'number-line'
    },
    {
      id: 'source-summary',
      title: 'Debrief focus from source',
      shortTitle: 'Sum',
      studentPrompt: 'Compare the number line and analog clock, then explain which strategy helps draw hands or read a clock to the nearest minute.',
      teacherEditionBasis: 'Teacher Edition Lesson 3 Student Debrief.',
      visualModel: 'number-line'
    }
  ],
  sourceRows: {
    'source-goal': [
      { label: 'Source', value: 'EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 37-49.' },
      { label: 'Source text', value: 'Count by fives and ones on the number line as a strategy to tell time to the nearest minute on the clock.' },
      { label: 'Workbook', value: 'Module 2 student workbook, Lesson 3 Problem Set.' }
    ],
    'source-model': [
      { label: 'Source', value: 'Lesson 3 Concept Development, Problem 1.' },
      { label: 'Source text', value: 'Students draw a 12-centimeter line, label 0 and 60, count by fives, and then use one-minute ticks to locate 58, 22, and 4.' },
      { label: 'Presentation rule', value: 'Show both levels of structure: the fives as anchors and the ones inside each interval.' }
    ],
    'source-meaning': [
      { label: 'Source', value: 'Lesson 3 Concept Development, Problem 2.' },
      { label: 'Source text', value: 'The teacher models 7:37 as seven fives plus two ones, then repeats with 7:13, 7:49, and 7:02.' },
      { label: 'Equation', value: '(7 x 5) + 2 = 37 minutes.' }
    ],
    'source-picture': [
      { label: 'Source', value: 'Module 2 Lesson 3 Problem Set, pages 44-45.' },
      { label: 'Source text', value: 'Students match clock faces to exact points, draw clock hands, read a clock, and count back 11 minutes from Mason\'s drop-off time.' },
      { label: 'Solved view requirement', value: 'Do not round exact minutes to the nearest five; show the leftover one-minute count.' }
    ],
    'source-draw': [
      { label: 'Source', value: 'Lesson 3 Concept Development, Problem 3.' },
      { label: 'Source text', value: 'The analog clock is treated as a circular number line with small tick marks for one-minute counts.' },
      { label: 'Visual', value: 'Use a straight line to make the minute count visible before students interpret the circular clock.' }
    ],
    'source-exit': [
      { label: 'Source', value: 'Lesson 3 Teacher Edition Answer Key.' },
      { label: 'Source text', value: 'Problem Set answers include exact times such as 6:48, 8:23, 5:27, 3:56, and 3:45.' },
      { label: 'Check', value: 'Every solved response should include the exact minute and the correct hour context.' }
    ],
    'source-summary': [
      { label: 'Source', value: 'Lesson 3 Student Debrief.' },
      { label: 'Source text', value: 'Students compare the number line and analog clock and discuss strategies for drawing clock hands.' },
      { label: 'Summary', value: 'Fives give fast benchmarks; ones finish the exact minute.' }
    ]
  }
};
