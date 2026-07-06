import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON7_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "gram",
    "kilogram"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Lesson 7 animation: Develop estimation strategies by reasoning about the we",
    context: "T: (Pass out spring scales that measure in grams.) This scale is labeled in intervals of 200.",
    equation: "Measure and label in kg; keep the unit with the number",
    teacherPrompt: "How did you use the 1-kilogram, 100-gram, 10-gram, and 1-gram weights to help you estimate the weights of objects in the classroom?",
    focus: [
      "gram",
      "kilogram",
      "measurement",
      "source labels"
    ],
    measurementTicks: [
      "1 kg",
      "0 kg",
      "1 kg",
      "1 kg",
      "1 kg",
      "1 kg"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 7: source objective",
      shortTitle: "Goal",
      studentPrompt: "Develop estimation strategies by reasoning about the weight in kilograms of a series of familiar objects to establish mental benchmark measures.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 85-95. Lesson 7 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "T: (Pass out spring scales that measure in grams.) This scale is labeled in intervals of 200. Skip-count by two-hundreds to find how many grams the scale can measure. S: (Point and skip-count.) 200, 400, 600, 800, 1,000, 1,200, 1,400, 1,600, 1,800, 2,000",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 85-95. Lesson 7 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How did you use the 1-kilogram, 100-gram, 10-gram, and 1-gram weights to help you estimate the weights of objects in the classroom?",
      teacherEditionBasis: "Problem Set (20 minutes): Students use benchmark weights, spring scales, and metric units to estimate and check classroom object weights.",
      visualModel: "measurement"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 7 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 7 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "measurement"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 7 benchmark-weight table and source-backed scale contexts to estimate and check weights in grams and kilograms.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 85-95.",
      visualModel: "measurement"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the official Lesson 7 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 85-95. Lesson 7 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 7 objective: Develop estimation strategies by reasoning about the weight in kilograms of a series of familiar objects to establish mental benchmark measures.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 85-95.",
      visualModel: "measurement"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 85-95. Lesson 7 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Develop estimation strategies by reasoning about the weight in kilograms of a series of familiar objects to establish mental benchmark measures."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 85-95. Lesson 7 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "T: (Pass out spring scales that measure in grams.) This scale is labeled in intervals of 200. Skip-count by two-hundreds to find how many grams the scale can measure. S: (Point and skip-count.) 200, 400, 600, 800, 1,000, 1,200, 1,400, 1,600, 1,800, 2,000"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (20 minutes): Students use benchmark weights, spring scales, and metric units to estimate and check classroom object weights."
      },
      {
        label: "Source text",
        value: "How did you use the 1-kilogram, 100-gram, 10-gram, and 1-gram weights to help you estimate the weights of objects in the classroom?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 7 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 7 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 85-95."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 7 benchmark-weight table and source-backed scale contexts to estimate and check weights in grams and kilograms."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 85-95. Lesson 7 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 85-95."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 7 objective: Develop estimation strategies by reasoning about the weight in kilograms of a series of familiar objects to establish mental benchmark measures."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 7 Problem Set."
      }
    ]
  }
};
