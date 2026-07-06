import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M5_LESSON9_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "fraction",
    "whole",
    "unit fraction"
  ],
  lessonAnimation: {
    kind: "fraction-strip",
    title: "Lesson 9 animation: Build and write fractions greater than one whole using unit fractions.",
    context: "Use the Teacher Edition Lesson 9 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
    equation: "1/6; name the whole before naming the fraction",
    teacherPrompt: "How does the official fraction model show build and write fractions greater than one whole using unit fractions.?",
    focus: [
      "fraction",
      "whole",
      "fraction strip",
      "source labels"
    ],
    fractionPartCount: 6,
    fractionShadedCount: 1
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 9: source objective",
      shortTitle: "Goal",
      studentPrompt: "Build and write fractions greater than one whole using unit fractions.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 98-111. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 9 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 98-111. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Problem 3 is likely to be challenging and may result in confusion about whether the children 10 10 10 ate or . represents the number of pans of 8 16 8 10 brownies they ate, and represents the number 16 of brownies they ate.",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 9 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 5 Lesson 9 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 5 student workbook, Lesson 9 Problem Set.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 9 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 98-111.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 98-111. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 9 objective: Build and write fractions greater than one whole using unit fractions.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 98-111.",
      visualModel: "fraction-strip"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 98-111. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Build and write fractions greater than one whole using unit fractions."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 98-111. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 9 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 9 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Problem 3 is likely to be challenging and may result in confusion about whether the children 10 10 10 ate or . represents the number of pans of 8 16 8 10 brownies they ate, and represents the number 16 of brownies they ate."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 5 student workbook, Lesson 9 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 5 Lesson 9 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 98-111."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 9 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 98-111. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 98-111."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 9 objective: Build and write fractions greater than one whole using unit fractions."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 9 Problem Set."
      }
    ]
  }
};
