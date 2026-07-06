import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON1_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "commutative property",
    "factor",
    "product"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 1 animation: Study commutativity to find known facts of 6, 7, 8, and 9.",
    context: "Part 1: Explore commutativity as it relates to multiplication.",
    equation: "6 x 7 = 42",
    teacherPrompt: "How did commutativity help you solve more facts than you thought you knew in Problem 1(a)?",
    focus: [
      "commutative property",
      "factor",
      "array",
      "source labels"
    ],
    groupCount: 6,
    groupSize: 7,
    rowCount: 6,
    columnCount: 7,
    tapePartCount: 6,
    tapePartLabel: "7",
    tapeWholeLabel: "42 total"
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 1: source objective",
      shortTitle: "Goal",
      studentPrompt: "Study commutativity to find known facts of 6, 7, 8, and 9.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 14-25. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Explore commutativity as it relates to multiplication. Draw or project the tape diagrams shown to the right. T: Talk to your partner. Which tape diagram represents the Application Problem? How do you know? (Allow time for discussion.) T: Draw both tape diagrams on your personal white board. Write a multiplication sentence for each.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 14-25. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How did commutativity help you solve more facts than you thought you knew in Problem 1(a)?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 1 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 1 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 1 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 1 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 14-25.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 14-25. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 1 objective: Study commutativity to find known facts of 6, 7, 8, and 9.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 14-25.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 14-25. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Study commutativity to find known facts of 6, 7, 8, and 9."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 14-25. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Explore commutativity as it relates to multiplication. Draw or project the tape diagrams shown to the right. T: Talk to your partner. Which tape diagram represents the Application Problem? How do you know? (Allow time for discussion.) T: Draw both tape diagrams on your personal white board. Write a multiplication sentence for each."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 1 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "How did commutativity help you solve more facts than you thought you knew in Problem 1(a)?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 1 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 1 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 14-25."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 1 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 14-25. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 14-25."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 1 objective: Study commutativity to find known facts of 6, 7, 8, and 9."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 1 Problem Set."
      }
    ]
  }
};
