import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON10_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "distributive property",
    "division",
    "quotient",
    "factor"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 10 animation: Use the distributive property as a strategy to multiply and divide.",
    context: "which factor do we break apart?",
    equation: "8 x 9 = (4 x 9) + (4 x 9)",
    teacherPrompt: "Describe the steps you took to solve for the unknown numbers in Problem 1(a)",
    focus: [
      "distributive property",
      "division",
      "array",
      "source labels"
    ],
    groupCount: 8,
    groupSize: 9,
    rowCount: 8,
    columnCount: 9,
    tapePartCount: 8,
    tapePartLabel: "9",
    tapeWholeLabel: "72 total",
    firstPart: 4,
    secondPart: 4
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 10: source objective",
      shortTitle: "Goal",
      studentPrompt: "Use the distributive property as a strategy to multiply and divide.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 119-129. Lesson 10 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "which factor do we break apart? Offer extra time for them to formulate S: We break apart the number of groups. their thoughts and discuss with their T: Do you think our strategy would work if we broke apart partners. If appropriate, preview the size of the groups and distributed the factor words such as factor. Conduct subtle and frequent checks for understanding. representing the number of groups instead?",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 119-129. Lesson 10 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Describe the steps you took to solve for the unknown numbers in Problem 1(a)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 10 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 10 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 10 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 10 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 119-129.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 119-129. Lesson 10 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 10 objective: Use the distributive property as a strategy to multiply and divide.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 119-129.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 119-129. Lesson 10 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the distributive property as a strategy to multiply and divide."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 119-129. Lesson 10 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "which factor do we break apart? Offer extra time for them to formulate S: We break apart the number of groups. their thoughts and discuss with their T: Do you think our strategy would work if we broke apart partners. If appropriate, preview the size of the groups and distributed the factor words such as factor. Conduct subtle and frequent checks for understanding. representing the number of groups instead?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 10 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Describe the steps you took to solve for the unknown numbers in Problem 1(a)"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 10 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 10 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 119-129."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 10 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 119-129. Lesson 10 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 119-129."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 10 objective: Use the distributive property as a strategy to multiply and divide."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 10 Problem Set."
      }
    ]
  }
};
