import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON20_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "factor",
    "product",
    "multiplication",
    "array"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 20 animation: Use place value strategies and the associative property n x (m x 10) = (n x m) x 10 to multiply by multiples of 10.",
    context: "Use the Lesson 20 source model to connect the official Problem Set structure to use place value strategies and the associative property n x (m x 10) = (n x m) x 10 to multiply by multiples of 10.",
    equation: "10 x 4 = (5 x 4) + (5 x 4)",
    teacherPrompt: "In Problem 1, which grouping is easier for you to solve? Why?",
    focus: [
      "factor",
      "product",
      "array",
      "source labels"
    ],
    groupCount: 10,
    groupSize: 4,
    rowCount: 10,
    columnCount: 4,
    tapePartCount: 10,
    tapePartLabel: "4",
    tapeWholeLabel: "40 total",
    firstPart: 5,
    secondPart: 5
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 20: source objective",
      shortTitle: "Goal",
      studentPrompt: "Use place value strategies and the associative property n x (m x 10) = (n x m) x 10 to multiply by multiples of 10.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 248-257. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "S: 4. to solve, as well as with the numbers T: Let's rewrite our equation. (Write (10 x 4) x 2.) they choose. Example prompts are Why do you think I put 10 x 4 in parentheses? given below: S: The parentheses show that, when you group those Write a multiplication fact that you numbers together and multiply, you get 40. think is best solved using the associative property.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 248-257. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "In Problem 1, which grouping is easier for you to solve? Why?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 20 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 20 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 20 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 20 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 248-257.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 248-257. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 20 objective: Use place value strategies and the associative property n x (m x 10) = (n x m) x 10 to multiply by multiples of 10.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 248-257.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 248-257. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use place value strategies and the associative property n x (m x 10) = (n x m) x 10 to multiply by multiples of 10."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 248-257. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "S: 4. to solve, as well as with the numbers T: Let's rewrite our equation. (Write (10 x 4) x 2.) they choose. Example prompts are Why do you think I put 10 x 4 in parentheses? given below: S: The parentheses show that, when you group those Write a multiplication fact that you numbers together and multiply, you get 40. think is best solved using the associative property."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 20 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "In Problem 1, which grouping is easier for you to solve? Why?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 20 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 20 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 248-257."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 20 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 248-257. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 248-257."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 20 objective: Use place value strategies and the associative property n x (m x 10) = (n x m) x 10 to multiply by multiples of 10."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 20 Problem Set."
      }
    ]
  }
};
