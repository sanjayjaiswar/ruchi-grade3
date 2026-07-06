import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON9_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "decompose",
    "distributive property"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 9 animation: Model the associative property as a strategy to multiply.",
    context: "T: (Write 16 x 3.) This is a difficult problem for a third grader to solve.",
    equation: "10 x 3 = 30",
    teacherPrompt: "How does the official Problem Set model show model the associative property as a strategy to multiply.?",
    focus: [
      "decompose",
      "distributive property",
      "array",
      "source labels"
    ],
    groupCount: 10,
    groupSize: 3,
    rowCount: 10,
    columnCount: 3,
    tapePartCount: 10,
    tapePartLabel: "3",
    tapeWholeLabel: "30 total"
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 9: source objective",
      shortTitle: "Goal",
      studentPrompt: "Model the associative property as a strategy to multiply.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 108-118. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "T: (Write 16 x 3.) This is a difficult problem for a third grader to solve. Let's simplify it. Work with your partner to list factors that have a product of 16. Write them on your personal white board. S: 4 times 4 makes 16. -> 8 and 2 also works. T: 4, 8, and 2 are much friendlier factors than 16. Let's rewrite 16 as 8 x 2.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 108-118. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "(Write 16 x 3.) This is a difficult problem for a third grader to solve. Let's simplify it. Work with your partner to list factors that have a product of 16. Write them on your personal white board.",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 9 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 9 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 9 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 9 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 108-118.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 108-118. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 9 objective: Model the associative property as a strategy to multiply.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 108-118.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 108-118. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Model the associative property as a strategy to multiply."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 108-118. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "T: (Write 16 x 3.) This is a difficult problem for a third grader to solve. Let's simplify it. Work with your partner to list factors that have a product of 16. Write them on your personal white board. S: 4 times 4 makes 16. -> 8 and 2 also works. T: 4, 8, and 2 are much friendlier factors than 16. Let's rewrite 16 as 8 x 2."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 9 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "(Write 16 x 3.) This is a difficult problem for a third grader to solve. Let's simplify it. Work with your partner to list factors that have a product of 16. Write them on your personal white board."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 9 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 9 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 108-118."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 9 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 108-118. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 9 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 108-118."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 9 objective: Model the associative property as a strategy to multiply."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 9 Problem Set."
      }
    ]
  }
};
