import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON18_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "tape diagram"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 18 animation: Solve two-step word problems involving all four operations and assess the reasonableness of solutions.",
    context: "Use the Lesson 18 source model to connect the official Problem Set structure to solve two-step word problems involving all four operations and assess the reasonableness of solutions.",
    equation: "7 units of 6; unknown labeled from the story",
    teacherPrompt: "Draw a model to show the total amount of money Joe has in the bank at the end of the 7 weeks. At my signal, show me your personal white board. (Signal.)",
    focus: [
      "tape diagram",
      "source labels"
    ],
    groupCount: 7,
    groupSize: 6,
    rowCount: 7,
    columnCount: 6,
    tapePartCount: 7,
    tapePartLabel: "6 each",
    tapeWholeLabel: "42 total"
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 18: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solve two-step word problems involving all four operations and assess the reasonableness of solutions.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 225-237. Lesson 18 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Joe earn each week? T: Draw a model to show the total amount of money Joe has in the bank at the end of the 7 weeks. At my signal, show me your personal white board. (Signal.) T: Do we know the amount of money Joe puts in the bank? S: No. T: Label this unknown on your model using the letter m for money. Then, write what m represents. (Students write.) Write an equation to show how to solve for m.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 225-237. Lesson 18 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Draw a model to show the total amount of money Joe has in the bank at the end of the 7 weeks. At my signal, show me your personal white board. (Signal.)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 18 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 18 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 18 Problem Set.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 18 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 225-237.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 225-237. Lesson 18 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 18 objective: Solve two-step word problems involving all four operations and assess the reasonableness of solutions.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 225-237.",
      visualModel: "tape-diagram"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 225-237. Lesson 18 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve two-step word problems involving all four operations and assess the reasonableness of solutions."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 225-237. Lesson 18 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Joe earn each week? T: Draw a model to show the total amount of money Joe has in the bank at the end of the 7 weeks. At my signal, show me your personal white board. (Signal.) T: Do we know the amount of money Joe puts in the bank? S: No. T: Label this unknown on your model using the letter m for money. Then, write what m represents. (Students write.) Write an equation to show how to solve for m."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 18 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Draw a model to show the total amount of money Joe has in the bank at the end of the 7 weeks. At my signal, show me your personal white board. (Signal.)"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 18 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 18 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 225-237."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 18 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 225-237. Lesson 18 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 225-237."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 18 objective: Solve two-step word problems involving all four operations and assess the reasonableness of solutions."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 18 Problem Set."
      }
    ]
  }
};
