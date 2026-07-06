import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON3_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "division",
    "quotient",
    "factor",
    "product"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 3 animation: Multiply and divide with familiar facts using a letter to represent the unknown.",
    context: "Use a letter to represent the unknown in multiplication.",
    equation: "2 units of 4; unknown labeled from the story",
    teacherPrompt: "Explain to your partner how you solved Problem 3. (Review division as both an unknown factor and an equal groups problem.)",
    focus: [
      "division",
      "quotient",
      "tape diagram",
      "source labels"
    ],
    groupCount: 2,
    groupSize: 4,
    rowCount: 2,
    columnCount: 4,
    tapePartCount: 2,
    tapePartLabel: "4 each",
    tapeWholeLabel: "8 total"
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 3: source objective",
      shortTitle: "Goal",
      studentPrompt: "Multiply and divide with familiar facts using a letter to represent the unknown.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use a letter to represent the unknown in multiplication. T: (Show a student's tape diagram and equation for the Application Problem, or use the example work above.) instead of a question mark. For this problem, we might using a few simple equations with choose letter c to help us express that the unknown letters, such as 2 + 2 = h; h = 4. Or, use MP.4 stands for how many canoes are used in the problem.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Explain to your partner how you solved Problem 3. (Review division as both an unknown factor and an equal groups problem.)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 3 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 3 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 3 Problem Set.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 3 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 38-50.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 3 objective: Multiply and divide with familiar facts using a letter to represent the unknown.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 38-50.",
      visualModel: "tape-diagram"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Multiply and divide with familiar facts using a letter to represent the unknown."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use a letter to represent the unknown in multiplication. T: (Show a student's tape diagram and equation for the Application Problem, or use the example work above.) instead of a question mark. For this problem, we might using a few simple equations with choose letter c to help us express that the unknown letters, such as 2 + 2 = h; h = 4. Or, use MP.4 stands for how many canoes are used in the problem."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 3 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Explain to your partner how you solved Problem 3. (Review division as both an unknown factor and an equal groups problem.)"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 3 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 38-50."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 3 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 38-50."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 3 objective: Multiply and divide with familiar facts using a letter to represent the unknown."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ]
  }
};
