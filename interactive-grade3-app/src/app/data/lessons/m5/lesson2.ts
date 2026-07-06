import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M5_LESSON2_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "fraction",
    "whole",
    "unit fraction"
  ],
  lessonAnimation: {
    kind: "fraction-strip",
    title: "Lesson 2 animation: Specify and partition a whole into equal parts, identifying and counting unit fractions by folding fraction strips.",
    context: "Use the Teacher Edition Lesson 2 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
    equation: "1/2; name the whole before naming the fraction",
    teacherPrompt: "How does the official fraction model show specify and partition a whole into equal parts, identifying and counting unit fractions by folding fraction strips.?",
    focus: [
      "fraction",
      "whole",
      "fraction strip",
      "source labels"
    ],
    fractionPartCount: 2,
    fractionShadedCount: 1
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 2: source objective",
      shortTitle: "Goal",
      studentPrompt: "Specify and partition a whole into equal parts, identifying and counting unit fractions by folding fraction strips.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 22-30. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 2 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 22-30. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "If the size of the whole stays the same, what happens as you partition it into more and more parts?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 2 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 5 Lesson 2 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 5 student workbook, Lesson 2 Problem Set.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 2 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 22-30.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 22-30. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 2 objective: Specify and partition a whole into equal parts, identifying and counting unit fractions by folding fraction strips.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 22-30.",
      visualModel: "fraction-strip"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 22-30. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Specify and partition a whole into equal parts, identifying and counting unit fractions by folding fraction strips."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 22-30. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 2 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 2 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "If the size of the whole stays the same, what happens as you partition it into more and more parts?"
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 5 student workbook, Lesson 2 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 5 Lesson 2 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 22-30."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 2 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 22-30. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 22-30."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 2 objective: Specify and partition a whole into equal parts, identifying and counting unit fractions by folding fraction strips."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 2 Problem Set."
      }
    ]
  }
};
