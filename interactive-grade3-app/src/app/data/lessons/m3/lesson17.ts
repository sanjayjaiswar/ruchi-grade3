import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON17_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "factor",
    "product",
    "multiplication",
    "array"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 17 animation: Identify patterns in multiplication and division facts using the multiplication table.",
    context: "Problems 1(a) and 1(b) Completed Table from Problem 1: T: Write the products to complete the table in Problem 1.",
    equation: "4 x 2 = (2 x 2) + (2 x 2)",
    teacherPrompt: "Talk to a partner: How do the patterns you discovered in Problem 1 for odd and even products help you when multiplying?",
    focus: [
      "factor",
      "product",
      "array",
      "source labels"
    ],
    groupCount: 4,
    groupSize: 2,
    rowCount: 4,
    columnCount: 2,
    tapePartCount: 4,
    tapePartLabel: "2",
    tapeWholeLabel: "8 total",
    firstPart: 2,
    secondPart: 2
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 17: source objective",
      shortTitle: "Goal",
      studentPrompt: "Identify patterns in multiplication and division facts using the multiplication table.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 212-224. Lesson 17 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Problems 1(a) and 1(b) Completed Table from Problem 1: T: Write the products to complete the table in Problem 1. Then, color all the squares that have even products orange. T: Let's look at the first orange square in the table. Write the multiplication equation on your board for the product in this square. (Students write.) Are the factors 2 and 1 odd or even? S: 2 is even and 1 is odd.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 212-224. Lesson 17 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Talk to a partner: How do the patterns you discovered in Problem 1 for odd and even products help you when multiplying?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 17 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 17 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 17 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 17 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 212-224.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 212-224. Lesson 17 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 17 objective: Identify patterns in multiplication and division facts using the multiplication table.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 212-224.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 212-224. Lesson 17 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Identify patterns in multiplication and division facts using the multiplication table."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 212-224. Lesson 17 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Problems 1(a) and 1(b) Completed Table from Problem 1: T: Write the products to complete the table in Problem 1. Then, color all the squares that have even products orange. T: Let's look at the first orange square in the table. Write the multiplication equation on your board for the product in this square. (Students write.) Are the factors 2 and 1 odd or even? S: 2 is even and 1 is odd."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 17 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Talk to a partner: How do the patterns you discovered in Problem 1 for odd and even products help you when multiplying?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 17 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 17 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 212-224."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 17 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 212-224. Lesson 17 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 17 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 212-224."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 17 objective: Identify patterns in multiplication and division facts using the multiplication table."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 17 Problem Set."
      }
    ]
  }
};
