import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M4_LESSON5_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "area",
    "square unit"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 5 animation: Form rectangles by tiling with unit squares to make arrays.",
    context: "Use the Teacher Edition Lesson 5 area model to connect the official figure, side lengths, unit squares, and area equation.",
    equation: "2 x 3 = 6",
    teacherPrompt: "How does the official area model show form rectangles by tiling with unit squares to make arrays.?",
    focus: [
      "area",
      "square unit",
      "array",
      "source labels"
    ],
    groupCount: 2,
    groupSize: 3,
    rowCount: 2,
    columnCount: 3,
    tapePartCount: 2,
    tapePartLabel: "3",
    tapeWholeLabel: "6 total"
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 5: source objective",
      shortTitle: "Goal",
      studentPrompt: "Form rectangles by tiling with unit squares to make arrays.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 57-67. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 5 area model to connect the official figure, side lengths, unit squares, and area equation.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 57-67. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Use square inch tiles to show this rectangle as an array. What information do we know?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 5 Problem Set using the official Module 4 area, unit-square, rectangle, decomposition, and floor-plan models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 4 Lesson 5 Problem Set prompts in order. Blank mode preserves the student-facing area figure/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 4 student workbook, Lesson 5 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 5 Problem Set workspace and source-backed area visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 4 Teacher Edition, lesson pages 57-67.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 57-67. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set area models, units, equations, and answers to the Lesson 5 objective: Form rectangles by tiling with unit squares to make arrays.",
      teacherEditionBasis: "Module 4 Teacher Edition, lesson pages 57-67.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 57-67. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Form rectangles by tiling with unit squares to make arrays."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 57-67. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 5 area model to connect the official figure, side lengths, unit squares, and area equation."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 5 Problem Set using the official Module 4 area, unit-square, rectangle, decomposition, and floor-plan models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Use square inch tiles to show this rectangle as an array. What information do we know?"
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 4 student workbook, Lesson 5 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 4 Lesson 5 Problem Set prompts in order. Blank mode preserves the student-facing area figure/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 4 Teacher Edition, lesson pages 57-67."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 5 Problem Set workspace and source-backed area visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 57-67. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 4 Teacher Edition, lesson pages 57-67."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set area models, units, equations, and answers to the Lesson 5 objective: Form rectangles by tiling with unit squares to make arrays."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 5 Problem Set."
      }
    ]
  }
};
