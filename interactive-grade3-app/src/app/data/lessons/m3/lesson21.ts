import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON21_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "factor",
    "product",
    "multiplication",
    "tape diagram"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 21 animation: Solve two-step word problems involving multiplying single-digit factors and multiples of 10.",
    context: "T: It took you 4 minutes and 13 seconds to find the products and order them from least to greatest.",
    equation: "10 units of 4; unknown labeled from the story",
    teacherPrompt: "In Problem 2, how many more months will Lupe need to save so she has enough to buy the art supplies? How do you know?",
    focus: [
      "factor",
      "product",
      "tape diagram",
      "source labels"
    ],
    groupCount: 10,
    groupSize: 4,
    rowCount: 10,
    columnCount: 4,
    tapePartCount: 10,
    tapePartLabel: "4 each",
    tapeWholeLabel: "40 total"
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 21: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solve two-step word problems involving multiplying single-digit factors and multiples of 10.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 258-269. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "T: It took you 4 minutes and 13 seconds to find the products and order them from least to greatest. How do we find the total number of seconds it took to complete this activity? S: Add the total seconds in 4 minutes to 13 seconds. -> We need to know how many seconds are in 1 minute first. T: There are 60 seconds in 1 minute. Draw and label a tape diagram to show the total number of seconds in T: Write an equation.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 258-269. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "In Problem 2, how many more months will Lupe need to save so she has enough to buy the art supplies? How do you know?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 21 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 21 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 21 Problem Set.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 21 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 258-269.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 258-269. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 21 objective: Solve two-step word problems involving multiplying single-digit factors and multiples of 10.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 258-269.",
      visualModel: "tape-diagram"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 258-269. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve two-step word problems involving multiplying single-digit factors and multiples of 10."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 258-269. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "T: It took you 4 minutes and 13 seconds to find the products and order them from least to greatest. How do we find the total number of seconds it took to complete this activity? S: Add the total seconds in 4 minutes to 13 seconds. -> We need to know how many seconds are in 1 minute first. T: There are 60 seconds in 1 minute. Draw and label a tape diagram to show the total number of seconds in T: Write an equation."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 21 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "In Problem 2, how many more months will Lupe need to save so she has enough to buy the art supplies? How do you know?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 21 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 21 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 258-269."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 21 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 258-269. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 258-269."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 21 objective: Solve two-step word problems involving multiplying single-digit factors and multiples of 10."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 21 Problem Set."
      }
    ]
  }
};
