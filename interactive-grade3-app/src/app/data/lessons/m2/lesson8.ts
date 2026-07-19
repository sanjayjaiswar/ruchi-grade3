import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON8_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "gram",
    "kilogram",
    "tape diagram"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Lesson 8 animation: solve metric weight word problems",
    context: "Read or estimate the weight, draw the tape diagram, then choose the operation.",
    equation: "read -> draw -> operate -> label kg or g",
    teacherPrompt: "How did your tape diagrams change in Problems 2(a) and 2(b)?",
    conceptVisual: {
      title: "Read the scale, model the relationship, then choose the operation",
      sourceNote: "Teacher Edition Lesson 8, Concept Development and Problem Set (pages 96-97).",
      sections: [
        {
          kind: "measurement-model",
          label: "Problem 1: exact scale readings",
          model: "mass",
          unitLabel: "g",
          referenceLabel: "Read the pointer against the gram intervals",
          maxValue: 500,
          values: [
            { label: "string beans", value: 464, valueLabel: "464 g", tone: "target" },
            { label: "grapes", value: 355, valueLabel: "355 g", tone: "given" }
          ],
          steps: ["Estimate before reading.", "Use the scale intervals for the exact value.", "Write grams with each reading."],
          note: "The scale—not the drawing size—is the evidence."
        },
        {
          kind: "tape",
          label: "Problem 2a: join two weights",
          totalLabel: "78 kg altogether",
          parts: [{ label: "35 kg", sublabel: "Keiko" }, { label: "43 kg", sublabel: "Jiro", emphasize: true }],
          caption: "35 kg + 43 kg = 78 kg"
        },
        {
          kind: "tape",
          label: "Problem 2b: compare the same weights",
          totalLabel: "Jiro: 43 kg",
          parts: [{ label: "35 kg", sublabel: "same as Keiko" }, { label: "8 kg", sublabel: "how much heavier", emphasize: true }],
          caption: "43 kg − 35 kg = 8 kg"
        },
        {
          kind: "card-grid",
          label: "Problems 3-4: estimate equal groups and shares",
          cards: [
            { label: "3 houseplants", sections: [{ kind: "tape", totalLabel: "about 15 kg", parts: [{ label: "5 kg" }, { label: "5 kg" }, { label: "5 kg" }], caption: "3 × 5 kg = 15 kg" }] },
            { label: "Jane's share", sections: [{ kind: "equations", lines: ["27 kg ÷ 9 = 3 kg", "7 × 3 kg = 21 kg"] }, { kind: "note", text: "Share first; then use Jane's share as one pumpkin estimate." }] }
          ]
        }
      ]
    },
    focus: [
      "gram",
      "kilogram",
      "measurement",
      "source labels"
    ],
    measurementTicks: [
      "464 g",
      "355 g",
      "35 kg",
      "43 kg",
      "5 kg",
      "27 kg"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 8: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solve one-step word problems involving metric weights within 100 and estimate to reason about solutions.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 96-105. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Solve one-step word problems using addition. Pairs of students have spring scales and baggies of beans and popcorn kernels. T: Let's use spring scales to weigh our beans and kernels. Should we use grams or kilograms? S: Grams! T: Compare the feel of the beans and the popcorn kernels. Which do you think weighs more? S: (Pick up bags and estimate.) T: Work with your partner to weigh the beans and kernels.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 96-105. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How did your tape diagrams change in Problems 2(a) and 2(b)?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 8 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "measurement"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 8 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 8 Problem Set.",
      visualModel: "measurement"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 8 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 96-105.",
      visualModel: "measurement"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 96-105. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 8 objective: Solve one-step word problems involving metric weights within 100 and estimate to reason about solutions.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 96-105.",
      visualModel: "measurement"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 96-105. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve one-step word problems involving metric weights within 100 and estimate to reason about solutions."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 96-105. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve one-step word problems using addition. Pairs of students have spring scales and baggies of beans and popcorn kernels. T: Let's use spring scales to weigh our beans and kernels. Should we use grams or kilograms? S: Grams! T: Compare the feel of the beans and the popcorn kernels. Which do you think weighs more? S: (Pick up bags and estimate.) T: Work with your partner to weigh the beans and kernels."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 8 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "How did your tape diagrams change in Problems 2(a) and 2(b)?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 8 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 8 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 96-105."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 8 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 96-105. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 96-105."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 8 objective: Solve one-step word problems involving metric weights within 100 and estimate to reason about solutions."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 8 Problem Set."
      }
    ]
  }
};
