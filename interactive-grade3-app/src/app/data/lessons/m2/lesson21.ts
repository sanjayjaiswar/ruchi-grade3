import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON21_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "addend",
    "round",
    "number line"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Lesson 21 animation: estimate and solve mixed measurements",
    context: "Measure beans and rice, round to the nearest ten grams, estimate the sum and difference, then check with exact arithmetic.",
    equation: "91 g + 58 g = 149 g; estimate 90 g + 60 g = 150 g",
    teacherPrompt: "How can you use measurement as a tool for checking whether or not your answers are reasonable?",
    focus: [
      "addend",
      "round",
      "number line",
      "source labels"
    ],
    numberLineLabels: [
      "58 g",
      "60 g",
      "91 g",
      "90 g",
      "149 g"
    ],
    numberLineJumps: [
      "measure",
      "round",
      "estimate and check"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 21: source objective",
      shortTitle: "Goal",
      studentPrompt: "Estimate sums and differences of measurements by rounding, and then solve mixed word problems.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Students measure beans and rice, yarn, and liquid volume, then round to estimate sums and differences before using exact arithmetic to solve.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How can you use measurement as a tool for checking whether or not your answers are reasonable?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 21 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "number-line"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 21 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 21 Problem Set.",
      visualModel: "number-line"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 21 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 257-266.",
      visualModel: "number-line"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 21 objective: Estimate sums and differences of measurements by rounding, and then solve mixed word problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 257-266.",
      visualModel: "number-line"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Estimate sums and differences of measurements by rounding, and then solve mixed word problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Students measure beans and rice, yarn, and liquid volume, then round to estimate sums and differences before using exact arithmetic to solve."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 21 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "How can you use measurement as a tool for checking whether or not your answers are reasonable?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 21 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 257-266."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 21 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 257-266."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 21 objective: Estimate sums and differences of measurements by rounding, and then solve mixed word problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ]
  }
};
