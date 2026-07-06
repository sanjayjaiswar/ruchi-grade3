import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON14_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "factor",
    "product",
    "multiplication",
    "array"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 14 animation: Identify and use arithmetic patterns to multiply.",
    context: "T: How is the 9 = 10 – 1 strategy, or add ten, subtract 1, from the last lesson used to solve 2 x 9?",
    equation: "9 x 10 = (5 x 10) + (4 x 10)",
    teacherPrompt: "Invite students to explain the strategy used in each problem",
    focus: [
      "factor",
      "product",
      "array",
      "source labels"
    ],
    groupCount: 9,
    groupSize: 10,
    rowCount: 9,
    columnCount: 10,
    tapePartCount: 9,
    tapePartLabel: "10",
    tapeWholeLabel: "90 total",
    firstPart: 5,
    secondPart: 4
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 14: source objective",
      shortTitle: "Goal",
      studentPrompt: "Identify and use arithmetic patterns to multiply.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 176-186. Lesson 14 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "T: How is the 9 = 10 - 1 strategy, or add ten, subtract 1, from the last lesson used to solve 2 x 9? S: You can do 1 x 9 = 9, then add ten and subtract one like this: (9 + 10) - 1 = 18. T: Let's use this strategy to find 2 x 9 another way. (Draw a 2 x 10 array.) When we start with 2 x 10, how many tens do we have? S: 2 tens. T: In unit form, what is the fact we are finding? S: 2 nines.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 176-186. Lesson 14 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Invite students to explain the strategy used in each problem",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 14 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 14 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 14 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 14 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 176-186.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 176-186. Lesson 14 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 14 objective: Identify and use arithmetic patterns to multiply.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 176-186.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 176-186. Lesson 14 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Identify and use arithmetic patterns to multiply."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 176-186. Lesson 14 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "T: How is the 9 = 10 - 1 strategy, or add ten, subtract 1, from the last lesson used to solve 2 x 9? S: You can do 1 x 9 = 9, then add ten and subtract one like this: (9 + 10) - 1 = 18. T: Let's use this strategy to find 2 x 9 another way. (Draw a 2 x 10 array.) When we start with 2 x 10, how many tens do we have? S: 2 tens. T: In unit form, what is the fact we are finding? S: 2 nines."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 14 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Invite students to explain the strategy used in each problem"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 14 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 14 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 176-186."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 14 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 176-186. Lesson 14 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 176-186."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 14 objective: Identify and use arithmetic patterns to multiply."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 14 Problem Set."
      }
    ]
  }
};
