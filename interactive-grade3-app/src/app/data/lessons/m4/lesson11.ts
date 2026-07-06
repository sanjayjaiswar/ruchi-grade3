import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M4_LESSON11_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "area",
    "square unit",
    "angle"
  ],
  lessonAnimation: {
    kind: "area-model",
    title: "Lesson 11 animation: Demonstrate the possible whole number side lengths of rectangles with areas of 24, 36, 48, or 72 square units using the associative property.",
    context: "Use the Teacher Edition Lesson 11 area model to connect the official figure, side lengths, unit squares, and area equation.",
    equation: "10 rows x 10 columns = 100 square units",
    teacherPrompt: "How does the official area model show demonstrate the possible whole number side lengths of rectangles with areas of 24, 36, 48, or 72 square units using the associative property.?",
    focus: [
      "area",
      "square unit",
      "area model",
      "source labels"
    ],
    areaRows: 10,
    areaColumns: 10,
    rowCount: 10,
    columnCount: 10
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 11: source objective",
      shortTitle: "Goal",
      studentPrompt: "Demonstrate the possible whole number side lengths of rectangles with areas of 24, 36, 48, or 72 square units using the associative property.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 138-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 11 area model to connect the official figure, side lengths, unit squares, and area equation.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 138-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Turn your paper horizontally and look at Problem 1. What property does this show?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 11 Problem Set using the official Module 4 area, unit-square, rectangle, decomposition, and floor-plan models from the Teacher Edition.",
      visualModel: "area-model"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 4 Lesson 11 Problem Set prompts in order. Blank mode preserves the student-facing area figure/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 4 student workbook, Lesson 11 Problem Set.",
      visualModel: "area-model"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 11 Problem Set workspace and source-backed area visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 4 Teacher Edition, lesson pages 138-149.",
      visualModel: "area-model"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 138-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set area models, units, equations, and answers to the Lesson 11 objective: Demonstrate the possible whole number side lengths of rectangles with areas of 24, 36, 48, or 72 square units using the associative property.",
      teacherEditionBasis: "Module 4 Teacher Edition, lesson pages 138-149.",
      visualModel: "area-model"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 138-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Demonstrate the possible whole number side lengths of rectangles with areas of 24, 36, 48, or 72 square units using the associative property."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 138-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 11 area model to connect the official figure, side lengths, unit squares, and area equation."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 11 Problem Set using the official Module 4 area, unit-square, rectangle, decomposition, and floor-plan models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Turn your paper horizontally and look at Problem 1. What property does this show?"
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 4 student workbook, Lesson 11 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 4 Lesson 11 Problem Set prompts in order. Blank mode preserves the student-facing area figure/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 4 Teacher Edition, lesson pages 138-149."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 11 Problem Set workspace and source-backed area visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 138-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 4 Teacher Edition, lesson pages 138-149."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set area models, units, equations, and answers to the Lesson 11 objective: Demonstrate the possible whole number side lengths of rectangles with areas of 24, 36, 48, or 72 square units using the associative property."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 11 Problem Set."
      }
    ]
  }
};
