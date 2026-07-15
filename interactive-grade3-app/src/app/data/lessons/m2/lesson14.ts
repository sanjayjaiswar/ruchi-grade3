import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON14_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "number line",
    "round"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Animate each Lesson 14 rounding decision",
    context: "Watch the target land between its two surrounding hundreds. The arrow then moves to the closer endpoint; a target exactly halfway moves to the upper hundred.",
    equation: "480 ≈ 500 • 525 ≈ 500 • 750 ≈ 800 • 603 ≈ 600 • 1,865 ≈ 1,900 = 19 hundreds",
    teacherPrompt: "Pause after the target lands. Ask whether it is below, at, or above halfway before revealing the rounded endpoint.",
    focus: [
      "lower hundred → halfway → upper hundred",
      "halfway and above round up",
      "1,900 and 19 hundreds name the same value"
    ],
    numberLineExamples: [
      {
        label: "Problem 2a: stickers",
        lower: "400",
        halfway: "450",
        upper: "500",
        target: "480",
        rounded: "500",
        targetPosition: 80,
        direction: "up",
        distance: "20 from 500"
      },
      {
        label: "Problem 2b: pages",
        lower: "500",
        halfway: "550",
        upper: "600",
        target: "525",
        rounded: "500",
        targetPosition: 25,
        direction: "down",
        distance: "25 from 500"
      },
      {
        label: "Problem 2c: halfway",
        lower: "700",
        halfway: "750",
        upper: "800",
        target: "750",
        rounded: "800",
        targetPosition: 50,
        direction: "up",
        distance: "halfway rounds up"
      },
      {
        label: "Problem 3: circle 603",
        lower: "600",
        halfway: "650",
        upper: "700",
        target: "603",
        rounded: "600",
        targetPosition: 3,
        direction: "down",
        distance: "3 from 600"
      },
      {
        label: "Problem 4: unit form",
        lower: "1,800",
        halfway: "1,850",
        upper: "1,900",
        target: "1,865",
        rounded: "1,900",
        targetPosition: 65,
        direction: "up",
        distance: "1,900 = 19 hundreds"
      }
    ],
    conceptSteps: [
      {
        label: "Bound it",
        action: "Write the hundred below and above the number.",
        result: "For example, 480 is between 400 and 500."
      },
      {
        label: "Mark halfway",
        action: "Add 50 to the lower hundred.",
        result: "450 is halfway between 400 and 500."
      },
      {
        label: "Choose",
        action: "Below halfway rounds down; halfway or above rounds up.",
        result: "480 rounds to 500, 525 rounds to 500, and 750 rounds to 800."
      },
      {
        label: "Explain",
        action: "State the rounded answer in context and check equivalent unit form.",
        result: "1,865 ≈ 1,900, and 1,900 = 19 × 100 = 19 hundreds."
      }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 14: source objective",
      shortTitle: "Goal",
      studentPrompt: "Round to the nearest hundred on the vertical number line.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 171-184. Lesson 14 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Round three-digit numbers to the nearest hundred. T: We've practiced rounding numbers to the nearest ten. Today, let's find 132 grams rounded to the nearest hundred. T: How many hundreds are in 132 grams? (Show place value cards for 132.) S: 1 hundred! (Pull apart the cards to show the hundred as 100.) T: Draw a vertical number line on your personal white board.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 171-184. Lesson 14 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Have students share their explanations for Problem 4, particularly if there is disagreement",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 14 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "number-line"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 14 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 14 Problem Set.",
      visualModel: "number-line"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 14 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 171-184.",
      visualModel: "number-line"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 171-184. Lesson 14 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 14 objective: Round to the nearest hundred on the vertical number line.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 171-184.",
      visualModel: "number-line"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 171-184. Lesson 14 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Round to the nearest hundred on the vertical number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 171-184. Lesson 14 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Round three-digit numbers to the nearest hundred. T: We've practiced rounding numbers to the nearest ten. Today, let's find 132 grams rounded to the nearest hundred. T: How many hundreds are in 132 grams? (Show place value cards for 132.) S: 1 hundred! (Pull apart the cards to show the hundred as 100.) T: Draw a vertical number line on your personal white board."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 14 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Have students share their explanations for Problem 4, particularly if there is disagreement"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 14 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 14 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 171-184."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 14 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 171-184. Lesson 14 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 14 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 171-184."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 14 objective: Round to the nearest hundred on the vertical number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 14 Problem Set."
      }
    ]
  }
};
