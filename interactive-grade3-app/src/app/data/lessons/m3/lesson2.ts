import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON2_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "commutative property",
    "distributive property",
    "factor",
    "product"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 2 animation: Apply the distributive and commutative properties to relate multiplication facts 5 x n + n to 6 x n and n x 6 where n is the size of the unit.",
    context: "T: (Draw 1 circle with a 7 inside.) This circle represents 1 unit of 7.",
    equation: "5 x 6 = (3 x 6) + (2 x 6)",
    teacherPrompt: "What pattern did you notice between Problems 1 and 2?",
    focus: [
      "commutative property",
      "distributive property",
      "array",
      "source labels"
    ],
    groupCount: 5,
    groupSize: 6,
    rowCount: 5,
    columnCount: 6,
    tapePartCount: 5,
    tapePartLabel: "6",
    tapeWholeLabel: "30 total",
    firstPart: 3,
    secondPart: 2
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 2: source objective",
      shortTitle: "Goal",
      studentPrompt: "Apply the distributive and commutative properties to relate multiplication facts 5 x n + n to 6 x n and n x 6 where n is the size of the unit.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 26-37. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "T: (Draw 1 circle with a 7 inside.) This circle represents 1 unit of 7. As I draw circles, count the sevens with me. (Draw circles one on top of the other until you continued guided practice. Depending 7 7 7 7 on the needs of the class, start out MP.7 7 concretely. Have students manipulate 7 7 7 7 cubes rather than draw or look at dots. S: 1 seven, 2 sevens, 3 sevens, 4 sevens, 5 sevens.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 26-37. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "What pattern did you notice between Problems 1 and 2?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 2 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 2 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 2 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 2 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 26-37.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 26-37. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 2 objective: Apply the distributive and commutative properties to relate multiplication facts 5 x n + n to 6 x n and n x 6 where n is the size of the unit.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 26-37.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 26-37. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Apply the distributive and commutative properties to relate multiplication facts 5 x n + n to 6 x n and n x 6 where n is the size of the unit."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 26-37. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "T: (Draw 1 circle with a 7 inside.) This circle represents 1 unit of 7. As I draw circles, count the sevens with me. (Draw circles one on top of the other until you continued guided practice. Depending 7 7 7 7 on the needs of the class, start out MP.7 7 concretely. Have students manipulate 7 7 7 7 cubes rather than draw or look at dots. S: 1 seven, 2 sevens, 3 sevens, 4 sevens, 5 sevens."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 2 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "What pattern did you notice between Problems 1 and 2?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 2 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 2 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 26-37."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 2 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 26-37. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 26-37."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 2 objective: Apply the distributive and commutative properties to relate multiplication facts 5 x n + n to 6 x n and n x 6 where n is the size of the unit."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 2 Problem Set."
      }
    ]
  }
};
