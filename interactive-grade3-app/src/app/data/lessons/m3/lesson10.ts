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
    title: "Break apart the size of each group: 8 = 5 + 3",
    context: "The source 6-by-8 array is split after 5 columns, then the same known 5-eights structure supports division by 8.",
    equation: "6 x 8 = 6 x (5 + 3) = 30 + 18 = 48",
    teacherPrompt: "Explain why the line splits the columns and how 40 divided by 8 becomes the known part of 56 divided by 8.",
    focus: [
      "distributive property",
      "division",
      "array",
      "source labels"
    ],
    groupCount: 8,
    groupSize: 6,
    rowCount: 6,
    columnCount: 8,
    tapePartCount: 6,
    tapePartLabel: "8",
    tapeWholeLabel: "48 total",
    firstPart: 5,
    secondPart: 3,
    distributiveBuild: {
      unitValue: 6,
      knownGroups: 5,
      extraGroups: 3,
      knownFact: "5 x 6 = 30",
      additionFact: "3 x 6 = 18",
      targetFact: "8 x 6 = 48",
      commutedFact: "6 x 8 = 48",
      divisionBond: { whole: 56, divisor: 8, firstPart: 40, secondPart: 16, firstQuotient: 5, secondQuotient: 2, totalQuotient: 7 }
    },
    conceptSteps: [
      { label: "Split", action: "Decompose 8 into 5 and 3.", result: "The array becomes two easier rectangles." },
      { label: "Distribute", action: "Multiply 6 by both parts.", result: "30 + 18 represents all 48 dots." },
      { label: "Divide", action: "Break 56 into 40 and 16, both divisible by 8.", result: "5 + 2 = 7." }
    ]
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
