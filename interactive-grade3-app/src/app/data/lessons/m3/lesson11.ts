import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON11_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "factor",
    "product",
    "multiplication",
    "unknown"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Use letters to track unknowns through two-step stories",
    context: "Asmir first finds the total candles, then subtracts the 28 candles left. Maria first finds the meters purchased, then subtracts 3 meters used.",
    equation: "8 x 9 = c; 72 - 28 = a; a = 44",
    teacherPrompt: "For each equation, name what the letter represents and whether it is a total, number of groups, group size, or remaining amount.",
    focus: [
      "factor",
      "product",
      "tape diagram",
      "source labels"
    ],
    groupCount: 8,
    groupSize: 9,
    rowCount: 8,
    columnCount: 9,
    tapePartCount: 8,
    tapePartLabel: "9 each",
    tapeWholeLabel: "72 total",
    unknownCases: [
      { label: "Asmir: total candles", whole: "c candles", known: "8 boxes of 9", unknown: "total c", equation: "8 x 9 = c", solution: "c = 72" },
      { label: "Asmir: candles used", whole: "72 candles", known: "28 left", unknown: "used a", equation: "72 - 28 = a", solution: "a = 44" },
      { label: "Maria: cloth left", whole: "$56 at $8/m", known: "3 m used", unknown: "meters left m", equation: "56 divided by 8 = 7; 7 - 3 = m", solution: "m = 4" }
    ],
    conceptSteps: [
      { label: "Plan", action: "Identify the intermediate total needed before the final question.", result: "Use a different letter for each unknown quantity." },
      { label: "Step 1", action: "Multiply or divide to find the total or number of equal groups.", result: "Label the model with that value." },
      { label: "Step 2", action: "Use the remaining story relationship.", result: "Answer the exact question with units." }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 11: source objective",
      shortTitle: "Goal",
      studentPrompt: "Interpret the unknown in multiplication and division to model and solve problems.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 130-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Interpret the unknown in multiplication. Write the following problem: Asmir buys 8 boxes of 9 candles for his dad's birthday. After putting some candles on the cake, there are 28 candles left. How many candles does Asmir use? T: Model the problem. Then, tell your partner the steps you'll need to take to solve. S: (Model.) First, you have to find out how many candles Asmir has.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 130-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "In Problem 1, did you solve to find the number of groups or the number of items in each group?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 11 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 11 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 11 Problem Set.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 11 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 130-149.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 130-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 11 objective: Interpret the unknown in multiplication and division to model and solve problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 130-149.",
      visualModel: "tape-diagram"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 130-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Interpret the unknown in multiplication and division to model and solve problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 130-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Interpret the unknown in multiplication. Write the following problem: Asmir buys 8 boxes of 9 candles for his dad's birthday. After putting some candles on the cake, there are 28 candles left. How many candles does Asmir use? T: Model the problem. Then, tell your partner the steps you'll need to take to solve. S: (Model.) First, you have to find out how many candles Asmir has."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 11 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "In Problem 1, did you solve to find the number of groups or the number of items in each group?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 11 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 11 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 130-149."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 11 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 130-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 130-149."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 11 objective: Interpret the unknown in multiplication and division to model and solve problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 11 Problem Set."
      }
    ]
  }
};
