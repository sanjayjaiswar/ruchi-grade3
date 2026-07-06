import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M4_LESSON6_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "array",
    "area",
    "square unit",
    "angle"
  ],
  lessonAnimation: {
    kind: "area-model",
    title: "Lesson 6 animation: Draw rows and columns to determine the area of a rectangle given an incomplete array.",
    context: "Use the Teacher Edition Lesson 6 area model to connect the official figure, side lengths, unit squares, and area equation.",
    equation: "3 rows x 2 columns = 6 square units",
    teacherPrompt: "How does the official area model show draw rows and columns to determine the area of a rectangle given an incomplete array.?",
    focus: [
      "array",
      "area",
      "area model",
      "source labels"
    ],
    areaRows: 3,
    areaColumns: 2,
    rowCount: 3,
    columnCount: 2
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 6: source objective",
      shortTitle: "Goal",
      studentPrompt: "Draw rows and columns to determine the area of a rectangle given an incomplete array.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 68-79. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 6 area model to connect the official figure, side lengths, unit squares, and area equation.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 68-79. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How did you know where to draw the columns and rows in Problem 1?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 6 Problem Set using the official Module 4 area, unit-square, rectangle, decomposition, and floor-plan models from the Teacher Edition.",
      visualModel: "area-model"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 4 Lesson 6 Problem Set prompts in order. Blank mode preserves the student-facing area figure/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 4 student workbook, Lesson 6 Problem Set.",
      visualModel: "area-model"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 6 Problem Set workspace and source-backed area visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 4 Teacher Edition, lesson pages 68-79.",
      visualModel: "area-model"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 68-79. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set area models, units, equations, and answers to the Lesson 6 objective: Draw rows and columns to determine the area of a rectangle given an incomplete array.",
      teacherEditionBasis: "Module 4 Teacher Edition, lesson pages 68-79.",
      visualModel: "area-model"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 68-79. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Draw rows and columns to determine the area of a rectangle given an incomplete array."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 68-79. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 6 area model to connect the official figure, side lengths, unit squares, and area equation."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 6 Problem Set using the official Module 4 area, unit-square, rectangle, decomposition, and floor-plan models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "How did you know where to draw the columns and rows in Problem 1?"
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 4 student workbook, Lesson 6 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 4 Lesson 6 Problem Set prompts in order. Blank mode preserves the student-facing area figure/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 4 Teacher Edition, lesson pages 68-79."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 6 Problem Set workspace and source-backed area visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 68-79. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 4 Teacher Edition, lesson pages 68-79."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set area models, units, equations, and answers to the Lesson 6 objective: Draw rows and columns to determine the area of a rectangle given an incomplete array."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 6 Problem Set."
      }
    ]
  }
};
