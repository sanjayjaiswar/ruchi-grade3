import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON19_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "factor",
    "product"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 19 animation: Multiply by multiples of 10 using the place value chart.",
    context: "Mia has 152 beads. She uses some to make bracelets. Now there are 80 beads. If she uses 8 beads for each bracelet,",
    equation: "10 x 10 = 100",
    teacherPrompt: "How do the disks in Problem 1 show the strategy we learned today?",
    focus: [
      "factor",
      "product",
      "array",
      "source labels"
    ],
    groupCount: 10,
    groupSize: 10,
    rowCount: 10,
    columnCount: 10,
    tapePartCount: 10,
    tapePartLabel: "10",
    tapeWholeLabel: "100 total"
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 19: source objective",
      shortTitle: "Goal",
      studentPrompt: "Multiply by multiples of 10 using the place value chart.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 238-247. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Mia has 152 beads. She uses some to make bracelets. Now there are 80 beads. If she uses 8 beads for each bracelet,",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 238-247. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How do the disks in Problem 1 show the strategy we learned today?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 19 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 19 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 19 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 19 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 238-247.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 238-247. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 19 objective: Multiply by multiples of 10 using the place value chart.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 238-247.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 238-247. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Multiply by multiples of 10 using the place value chart."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 238-247. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Mia has 152 beads. She uses some to make bracelets. Now there are 80 beads. If she uses 8 beads for each bracelet,"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 19 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "How do the disks in Problem 1 show the strategy we learned today?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 19 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 19 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 238-247."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 19 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 238-247. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 238-247."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 19 objective: Multiply by multiples of 10 using the place value chart."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 19 Problem Set."
      }
    ]
  }
};
