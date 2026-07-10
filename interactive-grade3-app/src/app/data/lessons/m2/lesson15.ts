import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON15_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "addend"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Lesson 15 animation: add measurements and compose once",
    context: "Beaker A has 56 milliliters and Beaker B has 27 milliliters. Add by place value, compose 10 ones as 1 ten, and keep milliliters attached.",
    equation: "56 mL + 27 mL = 83 mL",
    teacherPrompt: "Notice the units in Problems 1(j) and 1(k). Both problems use both kilograms and grams. Did having two units in the problem change anything about the wa.",
    focus: [
      "addend",
      "measurement",
      "source labels"
    ],
    measurementTicks: [
      "56 mL",
      "+27 mL",
      "13 ones",
      "compose 1 ten",
      "83 mL",
      "unit stays mL"
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
      studentPrompt: "T: (Show Beaker A with 56 milliliters of water and Beaker B with 27 milliliters of water.) Beaker A has 56 milliliters of water, and Beaker B has 27 milliliters of water. Let's use place value charts and place value disks to find the total milliliters of water in both beakers. T: Use place value disks to represent the amount of water from Beaker A on your chart. (Allow time for students them below your model of 56.",
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
        value: "T: (Show Beaker A with 56 milliliters of water and Beaker B with 27 milliliters of water.) Beaker A has 56 milliliters of water, and Beaker B has 27 milliliters of water. Let's use place value charts and place value disks to find the total milliliters of water in both beakers. T: Use place value disks to represent the amount of water from Beaker A on your chart. (Allow time for students them below your model of 56."
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
