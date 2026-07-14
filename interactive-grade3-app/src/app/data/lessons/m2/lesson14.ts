import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON14_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "number line",
    "round"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Round to the nearest hundred on a vertical number line",
    context: "Find the bounding hundreds and the halfway hundred. Then compare the target with halfway and move to the closer hundred.",
    equation: "132 g → 100 g; 1,250 → 1,300 because halfway rounds up",
    teacherPrompt: "Have students share their explanations for Problem 4, particularly if there is disagreement",
    focus: [
      "number line",
      "round",
      "source labels"
    ],
    numberLineExamples: [
      {
        label: "Teacher model: 132 grams",
        lower: "100",
        halfway: "150",
        upper: "200",
        target: "132",
        rounded: "100",
        targetPosition: 32,
        direction: "down",
        distance: "32 away"
      },
      {
        label: "Halfway case: 1,250",
        lower: "1,200",
        halfway: "1,250",
        upper: "1,300",
        target: "1,250",
        rounded: "1,300",
        targetPosition: 50,
        direction: "up",
        distance: "halfway rounds up"
      }
    ],
    conceptSteps: [
      {
        label: "Bound it",
        action: "Write the hundred below and above the number.",
        result: "132 is between 100 and 200; 1,250 is between 1,200 and 1,300."
      },
      {
        label: "Mark halfway",
        action: "Add 50 to the lower hundred.",
        result: "150 and 1,250 split their intervals equally."
      },
      {
        label: "Round",
        action: "Choose the closer hundred; at halfway choose the upper hundred.",
        result: "132 rounds to 100; 1,250 rounds to 1,300."
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
