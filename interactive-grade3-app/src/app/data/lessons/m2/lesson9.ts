import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON9_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "decompose",
    "liter",
    "milliliter"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Lesson 9 animation: Decompose a liter to reason about the size of 1 liter,",
    context: "Use the teacher-edition lesson pages to teach: Decompose a liter to reason about the size of 1 liter, 100 milliliters, 10 milliliters, and 1 milliliter.",
    equation: "Measure and label in kg; keep the unit with the number",
    teacherPrompt: "Revisit predictions from Part 1. Lead a discussion about why students may have thought taller containers had larger capacities. Guide students to articu.",
    focus: [
      "decompose",
      "liter",
      "measurement",
      "source labels"
    ],
    measurementTicks: [
      "1 kg",
      "100 kg",
      "10 kg",
      "1 kg",
      "1 kg",
      "100 kg"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 9: source objective",
      shortTitle: "Goal",
      studentPrompt: "Decompose a liter to reason about the size of 1 liter, 100 milliliters, 10 milliliters, and 1 milliliter.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 106-115. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the teacher-edition lesson pages to teach: Decompose a liter to reason about the size of 1 liter, 100 milliliters, 10 milliliters, and 1 milliliter.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 106-115. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Revisit predictions from Part 1. Lead a discussion about why students may have thought taller containers had larger capacities. Guide students to articulate understanding about conservation and capacity",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 9 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "measurement"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 9 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 9 Problem Set.",
      visualModel: "measurement"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 9 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 106-115.",
      visualModel: "measurement"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 106-115. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 9 objective: Decompose a liter to reason about the size of 1 liter, 100 milliliters, 10 milliliters, and 1 milliliter.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 106-115.",
      visualModel: "measurement"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 106-115. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Decompose a liter to reason about the size of 1 liter, 100 milliliters, 10 milliliters, and 1 milliliter."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 106-115. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the teacher-edition lesson pages to teach: Decompose a liter to reason about the size of 1 liter, 100 milliliters, 10 milliliters, and 1 milliliter."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 9 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Revisit predictions from Part 1. Lead a discussion about why students may have thought taller containers had larger capacities. Guide students to articulate understanding about conservation and capacity"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 9 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 9 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 106-115."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 9 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 106-115. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 106-115."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 9 objective: Decompose a liter to reason about the size of 1 liter, 100 milliliters, 10 milliliters, and 1 milliliter."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 9 Problem Set."
      }
    ]
  }
};
