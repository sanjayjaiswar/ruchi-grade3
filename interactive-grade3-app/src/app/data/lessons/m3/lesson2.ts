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
    title: "Lesson 2 animation: build a six-fact from five known units and one more",
    context: "Each source circle is one unit of 7. Start with 5 sevens, add 1 more seven, then turn the factors to name the related fact.",
    equation: "5 × 7 + 1 × 7 = 6 × 7 = 7 × 6 = 42",
    teacherPrompt: "What pattern did you notice between Problems 1 and 2?",
    focus: [
      "commutative property",
      "distributive property",
      "equal groups",
      "one unit has a value of 7"
    ],
    groupCount: 6,
    groupSize: 7,
    rowCount: 6,
    columnCount: 7,
    tapePartCount: 6,
    tapePartLabel: "7",
    tapeWholeLabel: "42 total",
    firstPart: 5,
    secondPart: 1,
    distributiveBuild: {
      unitValue: 7,
      knownGroups: 5,
      extraGroups: 1,
      knownFact: "5 × 7 = 35",
      additionFact: "35 + 7 = 42",
      targetFact: "6 × 7 = 42",
      commutedFact: "7 × 6 = 42"
    },
    conceptSteps: [
      { label: "Start with five units", action: "Use the known fact 5 × 7 = 35.", result: "Five sevens make 35." },
      { label: "Add one more unit", action: "Add 1 × 7 to the known product: 35 + 7.", result: "Six sevens make 42." },
      { label: "Turn the factors", action: "Use commutativity to read 6 × 7 as 7 × 6.", result: "Both facts have the product 42." }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 2: source objective",
      shortTitle: "Goal",
      studentPrompt: "Apply the distributive and commutative properties to relate multiplication facts 5 × n + n to 6 × n and n × 6 where n is the size of the unit.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 26-37. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Draw one circle with a 7 inside. Each circle represents 1 unit of 7. Build one vertical column while counting: 1 seven, 2 sevens, 3 sevens, 4 sevens, 5 sevens. Write 5 × 7 = 35 and its commutative fact, 7 × 5 = 35.",
      teacherEditionBasis: "Module 3 Teacher Edition, PDF pages 27-28, Concept Development.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Add 1 more unit of 7 to the 5 known units. Five sevens plus 1 seven is 6 sevens, so 35 + 7 = 42. Write 6 × 7 = 42 and use commutativity to write 7 × 6 = 42.",
      teacherEditionBasis: "Module 3 Teacher Edition, PDF page 28, Concept Development.",
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
      studentPrompt: "Debrief focus: What pattern did you notice between Problems 1 and 2? Explain how one fives fact plus 1 more unit solves both 6 × n and n × 6.",
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
        value: "Apply the distributive and commutative properties to relate multiplication facts 5 × n + n to 6 × n and n × 6 where n is the size of the unit."
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
        value: "Draw one circle with a 7 inside. Each circle represents 1 unit of 7. Count 1 seven through 5 sevens, then write 5 × 7 = 35 and 7 × 5 = 35."
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
        value: "Add 1 more seven: 35 + 7 = 42. Then write 6 × 7 = 42 and 7 × 6 = 42."
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
        value: "What pattern did you notice between Problems 1 and 2? Explain how one fives fact plus 1 more unit solves both 6 × n and n × 6."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 2 Problem Set."
      }
    ]
  }
};
