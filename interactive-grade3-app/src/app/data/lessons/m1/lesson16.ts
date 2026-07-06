import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON16_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "distributive property",
    "decompose",
    "array"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 16 animation: build related facts from 5 x 4",
    context: "Show 9 rows of 4, keep the known 5 x 4 part visible, then add 4 more rows of 4.",
    equation: "9 x 4 = (5 x 4) + (4 x 4) = 20 + 16 = 36",
    teacherPrompt: "Which rows are the known 5 x 4 fact, and which rows are the extra groups?",
    groupCount: 9,
    groupSize: 4,
    rowCount: 9,
    columnCount: 4,
    tapePartCount: 9,
    tapePartLabel: "4",
    tapeWholeLabel: "36 total",
    firstPart: 5,
    secondPart: 4,
    focus: [
      "Known 5 x 4 = 20",
      "Extra 4 x 4 = 16",
      "20 + 16 = 36"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 16: source objective",
      shortTitle: "Goal",
      studentPrompt: "Use the distributive property as a strategy to find related multiplication facts.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 210-220. Lesson 16 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Model the 5 + n pattern as a strategy for multiplying. T: Shade the part of the array that shows 5 x 4. Fours Array Template S: (Shade 5 rows of 4.) T: Talk to your partner about how to box an array that shows (5 x 4) + (1 x 4), and then box it. S: The box should have one more row than what's shaded. (Box 6 x 4.) T: What expression does the boxed array represent? S: 6 x 4.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 210-220. Lesson 16 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Explain how breaking apart or finding the products of two smaller arrays helps find the product of a larger array in Problem 1(d)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 16 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Label arrays for 6 x 4, 7 x 4, 8 x 4, and 9 x 4, then use (5 x 4) plus the extra rows of 4 to complete the equations. Problem 2: Match each decomposed expression to the related fact and product: 6 x 4 = 24, 7 x 4 = 28, 8 x 4 = 32, and 9 x 4 = 36. Problem 3: Explain Nolan's strategy that 10 x 4 is double 5 x 4.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 16 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 16 Problem Set arrays and matching task to show how known 5 x 4 facts help solve 6 x 4 through 10 x 4.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 210-220.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 210-220. Lesson 16 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: use the array splits to explain how 5 x 4 helps solve 6 x 4, 7 x 4, 8 x 4, 9 x 4, and 10 x 4.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 210-220.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 210-220. Lesson 16 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the distributive property as a strategy to find related multiplication facts."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 16 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 210-220. Lesson 16 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Model the 5 + n pattern as a strategy for multiplying. T: Shade the part of the array that shows 5 x 4. Fours Array Template S: (Shade 5 rows of 4.) T: Talk to your partner about how to box an array that shows (5 x 4) + (1 x 4), and then box it. S: The box should have one more row than what's shaded. (Box 6 x 4.) T: What expression does the boxed array represent? S: 6 x 4."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 16 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete Lesson 16 using the 5 + n array strategy for related multiplication facts."
      },
      {
        label: "Source text",
        value: "Explain how breaking apart or finding the products of two smaller arrays helps find the product of a larger array in Problem 1(d)"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 16 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 16 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: Label arrays for 6 x 4, 7 x 4, 8 x 4, and 9 x 4, then use (5 x 4) plus the extra rows of 4 to complete the equations. Problem 2: Match each decomposed expression to the related fact and product: 6 x 4 = 24, 7 x 4 = 28, 8 x 4 = 32, and 9 x 4 = 36. Problem 3: Explain Nolan's strategy that 10 x 4 is double 5 x 4."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 16 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 210-220."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 16 Problem Set arrays and matching task to show how known 5 x 4 facts help solve 6 x 4 through 10 x 4."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 16 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 210-220. Lesson 16 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 16 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 210-220."
      },
      {
        label: "Source text",
        value: "Debrief focus: use the array splits to explain how 5 x 4 helps solve 6 x 4, 7 x 4, 8 x 4, 9 x 4, and 10 x 4."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 16 Problem Set."
      }
    ]
  }
};
