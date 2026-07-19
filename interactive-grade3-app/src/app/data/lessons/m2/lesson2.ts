import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON2_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    'continuous time',
    '5-minute intervals',
    'number line',
    'clock',
    'a.m. / p.m.'
  ],
  lessonAnimation: {
    kind: 'number-line',
    title: 'Lesson 2 animation: clocks as 0-60 minute number lines',
    context: 'A one-hour clock can be unwrapped into a 0-60 number line. Each of the 12 equal intervals is 5 minutes.',
    equation: '12 intervals x 5 minutes = 60 minutes',
    teacherPrompt: 'Start with the one-hour strip, mark 12 equal intervals, count by fives from 0 to 60, then wrap the same scale around the clock.',
    conceptVisual: {
      title: 'Unwrap one clock hour into twelve 5-minute intervals',
      sourceNote: 'Teacher Edition Lesson 2, Concept Development Parts 1-3 (pages 24-26).',
      sections: [
        {
          kind: 'time-number-line',
          label: 'One continuous hour: count spaces, not boundary marks',
          startLabel: '1:00 p.m. / 0 min',
          endLabel: '2:00 p.m. / 60 min',
          displayStartMinute: 0,
          displayEndMinute: 60,
          tickLabels: Array.from({ length: 13 }, (_, index) => String(index * 5)),
          labelEvery: 1,
          jumps: Array.from({ length: 12 }, (_, index) => ({ label: '+5 min', fromMinute: index * 5, toMinute: (index + 1) * 5 })),
          points: [
            { label: '3 on clock', minute: 15, detail: '15 minutes' },
            { label: '6 on clock', minute: 30, detail: '30 minutes' },
            { label: '9 on clock', minute: 45, detail: '45 minutes' },
            { label: '12 again', minute: 60, detail: '60 minutes' }
          ],
          note: 'The 12 equal spaces each represent 5 minutes: 12 × 5 = 60.'
        },
        { kind: 'clock', label: 'Start of the wrapped line', timeLabel: '1:00 p.m.', timeValue: '1:00', caption: '12 matches 0 elapsed minutes.' },
        { kind: 'clock', label: 'Three quarters of the way around', timeLabel: '1:45 p.m.', timeValue: '1:45', caption: '9 matches 45 elapsed minutes.' },
        { kind: 'clock', label: 'End of the hour', timeLabel: '2:00 p.m.', timeValue: '2:00', caption: 'Returning to 12 completes 60 minutes.' }
      ]
    },
    focus: [
      'continuous time',
      'intervals, not tick marks',
      '5-minute counting',
      'clock-to-line matching'
    ],
    timeLineModel: {
      ariaLabel: 'Twelve equal five-minute intervals forming one continuous hour',
      startLabel: '1:00 p.m. / 0 min',
      endLabel: '2:00 p.m. / 60 min',
      segments: Array.from({ length: 12 }, (_, index) => ({
        from: `${index * 5}`,
        to: `${(index + 1) * 5}`,
        minutes: 5,
        label: '+5',
        unit: 'minutes' as const,
        emphasis: (index + 1) % 3 === 0 ? 'benchmark' as const : undefined
      }))
    },
    conceptSteps: [
      { label: 'Build the strip', action: 'Twelve homework parts each represent 5 minutes.', result: '12 × 5 minutes makes one 60-minute whole.' },
      { label: 'Unwrap the hour', action: 'Copy the 12 spaces to a line and extend arrows at both ends.', result: 'The spaces are intervals; the marks are boundaries.' },
      { label: 'Wrap the line', action: 'Match 0/60 to 12, 15 to 3, 30 to 6, and 45 to 9.', result: 'A clock is the same continuous line wrapped into a circle.' }
    ]
  },
  teacherEditionSteps: [
    {
      id: 'source-goal',
      title: 'Lesson 2: source objective',
      shortTitle: 'Goal',
      studentPrompt: 'Relate skip-counting by fives on the clock and telling time to a continuous measurement model, the number line.',
      teacherEditionBasis: 'EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 24-36. Lesson 2 objective, Concept Development, Problem Set, and Student Debrief.',
      visualModel: 'number-line'
    },
    {
      id: 'source-model',
      title: 'Teacher source concept',
      shortTitle: 'Model',
      studentPrompt: 'Use Christine\'s 60-minute work time to build the model: 12 math problems, 5 minutes each, 12 equal intervals, and a 0-60 minute number line.',
      teacherEditionBasis: 'Teacher Edition Lesson 2 Concept Development, Part 1.',
      visualModel: 'number-line'
    },
    {
      id: 'source-meaning',
      title: 'Key teaching move',
      shortTitle: 'Meaning',
      studentPrompt: 'The Teacher Edition stresses intervals. Students count the spaces of 5 minutes, not the tick marks, to locate 10, 35, 40, 45, 50, and 55 minutes after the hour.',
      teacherEditionBasis: 'Teacher Edition Lesson 2 Concept Development, Parts 1-2.',
      visualModel: 'number-line'
    },
    {
      id: 'source-picture',
      title: 'Problem Set reference',
      shortTitle: 'Set',
      studentPrompt: 'The Problem Set asks students to label one-hour number lines, connect clocks only when they match the hour interval, and explain a.m./p.m. meaning in context.',
      teacherEditionBasis: 'Module 2 Lesson 2 Problem Set, pages 31-32.',
      visualModel: 'number-line'
    },
    {
      id: 'source-draw',
      title: 'Clock connection',
      shortTitle: 'Clock',
      studentPrompt: 'The clock is the same number line wrapped in a circle. The 12 is the starting point, 3 is 15 minutes, 6 is 30 minutes, 9 is 45 minutes, and the return to 12 is 60 minutes.',
      teacherEditionBasis: 'Teacher Edition Lesson 2 Concept Development, Part 3.',
      visualModel: 'clock'
    },
    {
      id: 'source-exit',
      title: 'Answer-key evidence',
      shortTitle: 'Check',
      studentPrompt: 'Solved work must match the official plotted points: Ingrid\'s D/E/T/L/W times, the four matching 5:00-6:00 clocks, Noah\'s 5:45 point, and a context-based a.m./p.m. explanation.',
      teacherEditionBasis: 'Teacher Edition Lesson 2 Answer Key, Problem Set.',
      visualModel: 'number-line'
    },
    {
      id: 'source-summary',
      title: 'Debrief focus from source',
      shortTitle: 'Sum',
      studentPrompt: 'Compare clock labels 1-12 with number-line labels 0-60, and explain how skip-counting by fives helps measure time continuously.',
      teacherEditionBasis: 'Teacher Edition Lesson 2 Student Debrief.',
      visualModel: 'number-line'
    }
  ],
  sourceRows: {
    'source-goal': [
      { label: 'Source', value: 'EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 24-36.' },
      { label: 'Source text', value: 'Relate skip-counting by fives on the clock and telling time to a continuous measurement model, the number line.' },
      { label: 'Workbook', value: 'Module 2 student workbook, Lesson 2 Problem Set.' }
    ],
    'source-model': [
      { label: 'Source', value: 'Lesson 2 Concept Development, Part 1.' },
      { label: 'Source text', value: 'Christine has 12 math problems, each taking 5 minutes. The teacher uses that context to make a 12-part tape and a matching 0-60 minute number line.' },
      { label: 'Presentation rule', value: 'Show the one-hour strip and equal 5-minute intervals before asking for answers.' }
    ],
    'source-meaning': [
      { label: 'Source', value: 'Lesson 2 Concept Development, Parts 1-2.' },
      { label: 'Source text', value: 'The teacher has students label 0, 5, 10, ... 60 and notice that the intervals represent elapsed minutes.' },
      { label: 'Misconception guard', value: 'Students may count tick marks instead of spaces; the visual must make the spaces visible.' }
    ],
    'source-picture': [
      { label: 'Source', value: 'Module 2 Lesson 2 Problem Set, pages 31-32.' },
      { label: 'Source text', value: 'Label number lines from 7:00 to 8:00 and 5:00 to 6:00, plot points, match clocks, and explain a.m./p.m. in context.' },
      { label: 'Solved view requirement', value: 'Plot the official points rather than summarizing them in one sentence.' }
    ],
    'source-draw': [
      { label: 'Source', value: 'Lesson 2 Concept Development, Part 3.' },
      { label: 'Source text', value: 'The clock is like a number line wrapped in a circle; 12 is the starting point and the intervals count by fives.' },
      { label: 'Visual', value: 'Use both the straight 0-60 line and the clock language so students see the connection.' }
    ],
    'source-exit': [
      { label: 'Source', value: 'Lesson 2 Teacher Edition Answer Key.' },
      { label: 'Source text', value: 'Problem 2 has four matching clocks and two nonmatching clocks; Problem 4 explanations vary when a.m./p.m. reasoning is clear.' },
      { label: 'Check', value: 'Do not force a fixed answer when the answer key allows valid varied explanations.' }
    ],
    'source-summary': [
      { label: 'Source', value: 'Lesson 2 Student Debrief.' },
      { label: 'Source text', value: 'Students compare clock and number-line labels and discuss how counting by fives supports time measurement.' },
      { label: 'Summary', value: 'Time is continuous; the number line makes the intervals explicit, and the clock wraps those intervals around a circle.' }
    ]
  }
};
