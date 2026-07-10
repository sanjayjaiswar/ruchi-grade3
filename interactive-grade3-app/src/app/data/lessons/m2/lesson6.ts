import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON6_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "gram",
    "kilogram"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Lesson 6 animation: build 1 kg, then decompose it",
    context: "Use the Teacher Edition sequence: balance a rice bag to 1 kilogram, split the kilogram into ten 100-gram parts, split 100 grams into ten 10-gram parts, and split 10 grams into ten 1-gram parts.",
    equation: "1 kg = 1,000 g; each step makes 10 equal smaller units",
    teacherPrompt: "How many equal parts are made at each decomposition step, and how does that match place value?",
    focus: [
      "1 kilogram",
      "100 grams",
      "10 grams",
      "1 gram"
    ],
    measurementTicks: [
      "1 kg",
      "100 g",
      "10 g",
      "1 g"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 6: source objective",
      shortTitle: "Goal",
      studentPrompt: "Build and decompose a kilogram to reason about the size and weight of 1 kilogram, 100 grams, 10 grams, and 1 gram.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 75-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Build and decompose a kilogram to reason about the size and weight of 1 kilogram, 100 grams, 10 grams, and 1 gram.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 75-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How are the units kilogram and gram similar? How are they different?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 6 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "measurement"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 6 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 6 Problem Set.",
      visualModel: "measurement"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 6 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 75-84.",
      visualModel: "measurement"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 75-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 6 objective: Build and decompose a kilogram to reason about the size and weight of 1 kilogram, 100 grams, 10 grams, and 1 gram.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 75-84.",
      visualModel: "measurement"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 75-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Build and decompose a kilogram to reason about the size and weight of 1 kilogram, 100 grams, 10 grams, and 1 gram."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 75-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Build and decompose a kilogram to reason about the size and weight of 1 kilogram, 100 grams, 10 grams, and 1 gram."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 6 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "How are the units kilogram and gram similar? How are they different?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 6 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 6 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 75-84."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 6 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 75-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 75-84."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 6 objective: Build and decompose a kilogram to reason about the size and weight of 1 kilogram, 100 grams, 10 grams, and 1 gram."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 6 Problem Set."
      }
    ]
  }
};
