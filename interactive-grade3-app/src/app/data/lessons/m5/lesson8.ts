import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M5_LESSON8_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "fraction",
    "whole"
  ],
  lessonAnimation: {
    kind: "fraction-strip",
    title: "Lesson 8 animation: Represent parts of one whole as fractions with number bonds.",
    context: "Use the Teacher Edition Lesson 8 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
    equation: "2/4; name the whole before naming the fraction",
    teacherPrompt: "How does the official fraction model show represent parts of one whole as fractions with number bonds.?",
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
      title: "Lesson 8: source objective",
      shortTitle: "Goal",
      studentPrompt: "Represent parts of one whole as fractions with number bonds.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 86-97. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 8 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 86-97. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Share different representations for Problem 6 about the hamburger. Guide students to see that the chef's refrigerated meat can be made into 3 1 more burgers and that each of those burgers is 4 of the meat",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 8 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 5 Lesson 8 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 5 student workbook, Lesson 8 Problem Set.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 8 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 86-97.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 86-97. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 8 objective: Represent parts of one whole as fractions with number bonds.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 86-97.",
      visualModel: "fraction-strip"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 86-97. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Represent parts of one whole as fractions with number bonds."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 86-97. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 8 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 8 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Share different representations for Problem 6 about the hamburger. Guide students to see that the chef's refrigerated meat can be made into 3 1 more burgers and that each of those burgers is 4 of the meat"
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 5 student workbook, Lesson 8 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 5 Lesson 8 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 86-97."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 8 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 86-97. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 86-97."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 8 objective: Represent parts of one whole as fractions with number bonds."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 8 Problem Set."
      }
    ]
  }
};
