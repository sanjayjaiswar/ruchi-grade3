import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON16_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "addend"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Compose twice: ones to tens, then tens to hundreds",
    context: "The Teacher Edition combines 266 grams and 158 grams. First trade 10 of the 14 ones for 1 ten; then trade 10 of the 12 tens for 1 hundred.",
    equation: "266 g + 158 g = 424 g",
    teacherPrompt: "Pause after each column. Students should name the composed unit before it moves left, then connect both trades to Problem 1(c), 352 mL + 468 mL.",
    focus: [
      "10 ones → 1 ten",
      "10 tens → 1 hundred",
      "compose each place before moving left"
    ],
    measurementTicks: [
      "266 g",
      "+158 g",
      "14 ones",
      "12 tens",
      "424 g",
      "compose twice"
    ],
    placeValueAddition: {
      unit: "g",
      columns: ["hundreds", "tens", "ones"],
      addends: [
        { label: "Bag A", digits: [2, 6, 6] },
        { label: "Bag B", digits: [1, 5, 8] }
      ],
      resultDigits: ["4", "2", "4"],
      regroupings: [
        { fromColumn: 2, toColumn: 1, label: "10 ones → 1 ten" },
        { fromColumn: 1, toColumn: 0, label: "10 tens → 1 hundred" }
      ],
      result: "424 g"
    },
    conceptSteps: [
      {
        label: "Add ones",
        action: "6 ones + 8 ones = 14 ones.",
        result: "Compose 10 ones as 1 ten; keep 4 ones."
      },
      {
        label: "Add tens",
        action: "6 tens + 5 tens + 1 composed ten = 12 tens.",
        result: "Compose 10 tens as 1 hundred; keep 2 tens."
      },
      {
        label: "Add hundreds",
        action: "2 hundreds + 1 hundred + 1 composed hundred = 4 hundreds.",
        result: "266 g + 158 g = 424 g."
      },
      {
        label: "Transfer",
        action: "Use both trades in the official Problem Set.",
        result: "352 mL + 468 mL composes in the ones and tens columns to make 820 mL."
      }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 16: source objective",
      shortTitle: "Goal",
      studentPrompt: "Add measurements using the standard algorithm to compose larger units twice.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 196-206. Lesson 16 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Bag A has 266 grams of beans, and Bag B has 158 grams of beans. Represent both amounts with place value disks, compose ones into a ten and tens into a hundred, and connect the model to 266 g + 158 g = 424 g.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 196-206. Lesson 16 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "What pattern did you notice between Problems 1(a), 1(b), and 1(c)? How did the pattern help you solve these problems?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 16 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "measurement"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 16 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 16 Problem Set.",
      visualModel: "measurement"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 16 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 196-206.",
      visualModel: "measurement"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 196-206. Lesson 16 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 16 objective: Add measurements using the standard algorithm to compose larger units twice.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 196-206.",
      visualModel: "measurement"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 196-206. Lesson 16 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Add measurements using the standard algorithm to compose larger units twice."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 16 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 196-206. Lesson 16 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Bag A has 266 grams of beans, and Bag B has 158 grams of beans. Represent both amounts with place value disks, compose ones into a ten and tens into a hundred, and connect the model to 266 g + 158 g = 424 g."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 16 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 16 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "What pattern did you notice between Problems 1(a), 1(b), and 1(c)? How did the pattern help you solve these problems?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 16 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 16 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 16 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 16 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 196-206."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 16 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 16 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 196-206. Lesson 16 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 16 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 196-206."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 16 objective: Add measurements using the standard algorithm to compose larger units twice."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 16 Problem Set."
      }
    ]
  }
};
