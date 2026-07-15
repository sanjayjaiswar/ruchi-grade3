import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON7_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "factor",
    "product",
    "multiplication",
    "unknown"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Locate the unknown before choosing multiplication or division",
    context: "Thad sees 7 beetles. Each beetle has 6 legs. The same tape structure also models an unknown group count or an unknown unit size.",
    equation: "7 x 6 = b, so b = 42 legs",
    teacherPrompt: "Draw and label a tape diagram to model the beetle problem. Use b to represent the unknown number of beetle legs, then write and solve 7 x 6 = b.",
    focus: [
      "factor",
      "product",
      "tape diagram",
      "source labels"
    ],
    groupCount: 7,
    groupSize: 6,
    rowCount: 7,
    columnCount: 6,
    tapePartCount: 7,
    tapePartLabel: "6 legs",
    tapeWholeLabel: "b legs total",
    unknownCases: [
      { label: "Unknown total", whole: "b legs", known: "7 groups of 6", unknown: "product b", equation: "7 x 6 = b", solution: "b = 42" },
      { label: "Unknown groups", whole: "21 pencils", known: "3 each", unknown: "students s", equation: "21 divided by 3 = s", solution: "s = 7" },
      { label: "Unknown unit size", whole: "24 minutes", known: "6 drills", unknown: "minutes t", equation: "24 divided by 6 = t", solution: "t = 4" }
    ],
    conceptSteps: [
      { label: "Read", action: "Name the whole, number of groups, and size of each group.", result: "The story reveals which quantity is unknown." },
      { label: "Model", action: "Place the letter on the matching part of the tape.", result: "The equation follows the model instead of a keyword." },
      { label: "Solve", action: "Use a known six or seven fact.", result: "State the answer with its story unit." }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 7: source objective",
      shortTitle: "Goal",
      studentPrompt: "Interpret the unknown in multiplication and division to model and solve problems using units of 6 and 7.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 85-96. Lesson 7 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Thad sees 7 beetles while weeding his garden. Each beetle has 6 legs. Students may draw 7 beetles, an array with 7 rows and 6 dots in each row, or a tape diagram with 7 parts and 6 in each part. The source then selects the tape diagram and labels the unknown b for the total number of beetle legs.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 85-96. Lesson 7 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Draw and label a tape diagram to model the beetle problem. Use b to represent the unknown number of beetle legs, then write and solve 7 x 6 = b.",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 7 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 7 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 7 Problem Set.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 7 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 85-96.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 85-96. Lesson 7 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 7 objective: Interpret the unknown in multiplication and division to model and solve problems using units of 6 and 7.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 85-96.",
      visualModel: "tape-diagram"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 85-96. Lesson 7 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Interpret the unknown in multiplication and division to model and solve problems using units of 6 and 7."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 85-96. Lesson 7 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Thad sees 7 beetles while weeding his garden. Each beetle has 6 legs. Students may draw 7 beetles, an array with 7 rows and 6 dots in each row, or a tape diagram with 7 parts and 6 in each part. The source then selects the tape diagram and labels the unknown b for the total number of beetle legs."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 7 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Draw and label a tape diagram to model the beetle problem. Use b to represent the unknown number of beetle legs, then write and solve 7 x 6 = b."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 7 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 7 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 85-96."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 7 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 85-96. Lesson 7 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 7 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 85-96."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 7 objective: Interpret the unknown in multiplication and division to model and solve problems using units of 6 and 7."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 7 Problem Set."
      }
    ]
  }
};
