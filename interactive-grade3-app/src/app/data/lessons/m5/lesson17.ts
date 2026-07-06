import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M5_LESSON17_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "fraction",
    "whole",
    "number line"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Lesson 17 animation: Practice placing various fractions on the number line.",
    context: "Use the Teacher Edition Lesson 17 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
    equation: "0 to 24 on equal intervals of 6",
    teacherPrompt: "How does the official fraction model show practice placing various fractions on the number line.?",
    focus: [
      "fraction",
      "whole",
      "number line",
      "source labels"
    ],
    numberLineLabels: [
      "0",
      "6",
      "12",
      "18",
      "24"
    ],
    numberLineJumps: [
      "+6",
      "+6",
      "+6"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 17: source objective",
      shortTitle: "Goal",
      studentPrompt: "Practice placing various fractions on the number line.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 200-210. Lesson 17 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 17 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 200-210. Lesson 17 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "What did you think about first to help you place the fractions?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 17 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition.",
      visualModel: "number-line"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 5 Lesson 17 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 5 student workbook, Lesson 17 Problem Set.",
      visualModel: "number-line"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 17 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 200-210.",
      visualModel: "number-line"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 200-210. Lesson 17 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 17 objective: Practice placing various fractions on the number line.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 200-210.",
      visualModel: "number-line"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 200-210. Lesson 17 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Practice placing various fractions on the number line."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 200-210. Lesson 17 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 17 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 17 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "What did you think about first to help you place the fractions?"
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 5 student workbook, Lesson 17 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 5 Lesson 17 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 200-210."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 17 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 200-210. Lesson 17 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 200-210."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 17 objective: Practice placing various fractions on the number line."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 17 Problem Set."
      }
    ]
  }
};
