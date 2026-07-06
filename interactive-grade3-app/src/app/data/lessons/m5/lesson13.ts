import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M5_LESSON13_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "fraction",
    "whole"
  ],
  lessonAnimation: {
    kind: "fraction-strip",
    title: "Lesson 13 animation: Identify a shaded fractional part in different ways depending on the designation of the whole.",
    context: "Use the Teacher Edition Lesson 13 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
    equation: "2/4; name the whole before naming the fraction",
    teacherPrompt: "How does the official fraction model show identify a shaded fractional part in different ways depending on the designation of the whole.?",
    focus: [
      "fraction",
      "whole",
      "fraction strip",
      "source labels"
    ],
    fractionPartCount: 4,
    fractionShadedCount: 2
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 13: source objective",
      shortTitle: "Goal",
      studentPrompt: "Identify a shaded fractional part in different ways depending on the designation of the whole.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 148-158. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 13 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 148-158. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Compare Rope C in Problems 6(a) and 6(d). the whole with your finger.\"",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 13 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 5 Lesson 13 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 5 student workbook, Lesson 13 Problem Set.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 13 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 148-158.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 148-158. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 13 objective: Identify a shaded fractional part in different ways depending on the designation of the whole.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 148-158.",
      visualModel: "fraction-strip"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 148-158. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Identify a shaded fractional part in different ways depending on the designation of the whole."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 148-158. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 13 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 13 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Compare Rope C in Problems 6(a) and 6(d). the whole with your finger.\""
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 5 student workbook, Lesson 13 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 5 Lesson 13 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 148-158."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 13 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 148-158. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 148-158."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 13 objective: Identify a shaded fractional part in different ways depending on the designation of the whole."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 13 Problem Set."
      }
    ]
  }
};
