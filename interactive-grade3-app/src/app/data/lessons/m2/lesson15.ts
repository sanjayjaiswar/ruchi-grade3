import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON15_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "addend"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Compose once: from place-value disks to the standard algorithm",
    context: "The Teacher Edition combines 56 milliliters and 27 milliliters. Watch the ones make 13, trade 10 ones for 1 ten, and carry that new ten into the tens column.",
    equation: "56 mL + 27 mL = 83 mL",
    teacherPrompt: "Pause after 6 ones + 7 ones. Have students predict the trade before revealing 1 ten and 3 ones, then connect the move to Problem 1(g), 29 g + 63 g.",
    focus: [
      "align equal place values",
      "10 ones → 1 ten",
      "keep measurement units attached"
    ],
    measurementTicks: [
      "56 mL",
      "+27 mL",
      "13 ones",
      "compose 1 ten",
      "83 mL",
      "unit stays mL"
    ],
    placeValueAddition: {
      unit: "mL",
      columns: ["tens", "ones"],
      addends: [
        { label: "Beaker A", digits: [5, 6] },
        { label: "Beaker B", digits: [2, 7] }
      ],
      resultDigits: ["8", "3"],
      regroupings: [
        { fromColumn: 1, toColumn: 0, label: "10 ones → 1 ten" }
      ],
      result: "83 mL"
    },
    conceptSteps: [
      {
        label: "Model addends",
        action: "Place 56 and 27 into tens and ones columns.",
        result: "Like units and place values are aligned."
      },
      {
        label: "Compose once",
        action: "13 ones become 1 ten and 3 ones.",
        result: "The new ten joins the other tens."
      },
      {
        label: "Name the sum",
        action: "Read 8 tens and 3 ones with the measurement unit.",
        result: "56 mL + 27 mL = 83 mL."
      },
      {
        label: "Transfer",
        action: "Use the same trade in the official Problem Set.",
        result: "29 g + 63 g makes 12 ones, so compose once and write 92 g."
      }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 15: source objective",
      shortTitle: "Goal",
      studentPrompt: "Add measurements using the standard algorithm to compose larger units once.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 185-195. Lesson 15 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Beaker A has 56 milliliters of water, and Beaker B has 27 milliliters of water. Represent both amounts with place value disks, compose 10 ones as 1 ten, and connect the model to 56 mL + 27 mL = 83 mL in the standard algorithm.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 185-195. Lesson 15 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Notice the units in Problems 1(j) and 1(k). Both problems use both kilograms and grams. Did having two units in the problem change anything about the way you solved?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 15 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "measurement"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 15 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 15 Problem Set.",
      visualModel: "measurement"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 15 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 185-195.",
      visualModel: "measurement"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 185-195. Lesson 15 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 15 objective: Add measurements using the standard algorithm to compose larger units once.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 185-195.",
      visualModel: "measurement"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 185-195. Lesson 15 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Add measurements using the standard algorithm to compose larger units once."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 185-195. Lesson 15 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Beaker A has 56 milliliters of water, and Beaker B has 27 milliliters of water. Represent both amounts with place value disks, compose 10 ones as 1 ten, and connect the model to 56 mL + 27 mL = 83 mL in the standard algorithm."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 15 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Notice the units in Problems 1(j) and 1(k). Both problems use both kilograms and grams. Did having two units in the problem change anything about the way you solved?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 15 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 15 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 185-195."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 15 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 185-195. Lesson 15 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 15 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 185-195."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 15 objective: Add measurements using the standard algorithm to compose larger units once."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 15 Problem Set."
      }
    ]
  }
};
