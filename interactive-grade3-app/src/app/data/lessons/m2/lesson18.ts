import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON18_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "decompose"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Decompose one hundred to subtract 825 mL - 132 mL",
    context: "The Teacher Edition models Tara's 825 milliliters minus 132 milliliters with place-value disks. Since 2 tens cannot subtract 3 tens, one hundred is unbundled into 10 tens before subtracting.",
    equation: "825 mL - 132 mL = 693 mL",
    teacherPrompt: "What is the relationship between Problems 1(a), 1(b), and 1(c)?",
    focus: [
      "decompose",
      "measurement",
      "source labels"
    ],
    measurementTicks: [
      "825 mL",
      "-132 mL",
      "decompose 1 hundred",
      "12 tens - 3 tens",
      "693 mL",
      "unit stays mL"
    ],
    placeValueSubtraction: {
      unit: "mL",
      columns: ["hundreds", "tens", "ones"],
      minuendLabel: "825 mL",
      subtrahendLabel: "132 mL",
      beforeDigits: [8, 2, 5],
      afterDigits: [7, 12, 5],
      subtrahendDigits: [1, 3, 2],
      resultDigits: ["6", "9", "3"],
      decompositions: [
        { fromColumn: 0, toColumn: 1, label: "1 hundred -> 10 tens" }
      ],
      result: "693 mL"
    },
    conceptSteps: [
      {
        label: "Inspect every place",
        action: "Ones can subtract, but 2 tens cannot subtract 3 tens.",
        result: "The tens place needs one larger unit."
      },
      {
        label: "Decompose once",
        action: "Unbundle 1 hundred into 10 tens: 825 becomes 7 hundreds, 12 tens, 5 ones.",
        result: "Every place is now ready to subtract."
      },
      {
        label: "Subtract and label",
        action: "Subtract ones, tens, then hundreds and keep milliliters.",
        result: "825 mL - 132 mL = 693 mL."
      }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 18: source objective",
      shortTitle: "Goal",
      studentPrompt: "Decompose once to subtract measurements including three-digit minuends with zeros in the tens or ones place.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 222-232. Lesson 18 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Use the place value chart to model decomposing once to subtract with three-digit minuends. Students start with the unlabeled place value chart template in their personal white boards",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 222-232. Lesson 18 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "What is the relationship between Problems 1(a), 1(b), and 1(c)?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 18 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "measurement"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 18 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 18 Problem Set.",
      visualModel: "measurement"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 18 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 222-232.",
      visualModel: "measurement"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 222-232. Lesson 18 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 18 objective: Decompose once to subtract measurements including three-digit minuends with zeros in the tens or ones place.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 222-232.",
      visualModel: "measurement"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 222-232. Lesson 18 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Decompose once to subtract measurements including three-digit minuends with zeros in the tens or ones place."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 222-232. Lesson 18 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Use the place value chart to model decomposing once to subtract with three-digit minuends. Students start with the unlabeled place value chart template in their personal white boards"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 18 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "What is the relationship between Problems 1(a), 1(b), and 1(c)?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 18 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 18 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 222-232."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 18 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 222-232. Lesson 18 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 18 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 222-232."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 18 objective: Decompose once to subtract measurements including three-digit minuends with zeros in the tens or ones place."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 18 Problem Set."
      }
    ]
  }
};
