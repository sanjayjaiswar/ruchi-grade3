import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON15_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "factor",
    "product",
    "multiplication",
    "unknown"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 15 animation: Interpret the unknown in multiplication and division to model and solve problems.",
    context: "Interpret the unknown in multiplication.",
    equation: "9 units of 4; unknown labeled from the story",
    teacherPrompt: "In your model for Problem 1, is the unknown the number of units or the size of each unit?",
    focus: [
      "factor",
      "product",
      "tape diagram",
      "source labels"
    ],
    groupCount: 9,
    groupSize: 4,
    rowCount: 9,
    columnCount: 4,
    tapePartCount: 9,
    tapePartLabel: "4 each",
    tapeWholeLabel: "36 total"
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 15: source objective",
      shortTitle: "Goal",
      studentPrompt: "Interpret the unknown in multiplication and division to model and solve problems.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 187-199. Lesson 15 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Interpret the unknown in multiplication. Write or project the following problem: Ada buys 9 packs of highlighters with 4 in each pack. After giving 1 highlighter to S: (Model.) First, you have to find out how many for solving 9 x 4 = 36, instead saying, highlighters Ada has. -> After that, subtract 17 from \"It's easy! I just knew it.\" Challenge the total to see how many she gives away.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 187-199. Lesson 15 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "In your model for Problem 1, is the unknown the number of units or the size of each unit?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 15 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 15 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 15 Problem Set.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 15 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 187-199.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 187-199. Lesson 15 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 15 objective: Interpret the unknown in multiplication and division to model and solve problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 187-199.",
      visualModel: "tape-diagram"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 187-199. Lesson 15 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Interpret the unknown in multiplication and division to model and solve problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 187-199. Lesson 15 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Interpret the unknown in multiplication. Write or project the following problem: Ada buys 9 packs of highlighters with 4 in each pack. After giving 1 highlighter to S: (Model.) First, you have to find out how many for solving 9 x 4 = 36, instead saying, highlighters Ada has. -> After that, subtract 17 from \"It's easy! I just knew it.\" Challenge the total to see how many she gives away."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 15 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "In your model for Problem 1, is the unknown the number of units or the size of each unit?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 15 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 15 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 187-199."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 15 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 187-199. Lesson 15 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 187-199."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 15 objective: Interpret the unknown in multiplication and division to model and solve problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 15 Problem Set."
      }
    ]
  }
};
