import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON11_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "gram",
    "kilogram",
    "liter",
    "milliliter"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Lesson 11 animation: Solve mixed word problems involving all four operations",
    context: "Use the story relationship to choose add, subtract, multiply, or divide while keeping the same unit.",
    equation: "model -> operate -> label grams, kilograms, liters, or milliliters",
    teacherPrompt: "What models did you use to solve the word problems?",
    conceptVisual: {
      title: "Use the relationship—not a keyword—to select the operation",
      sourceNote: "Teacher Edition Lesson 11, Concept Development and Problem Set (pages 127-128).",
      sections: [
        {
          kind: "tape",
          label: "Problem 1a: find the missing part",
          totalLabel: "671 g total",
          parts: [{ label: "113 g", sublabel: "baby-food jar" }, { label: "558 g", sublabel: "can of tomatoes", emphasize: true }],
          caption: "671 g − 113 g = 558 g"
        },
        {
          kind: "tape",
          label: "Problem 1b: compare the two parts",
          totalLabel: "can: 558 g",
          parts: [{ label: "113 g", sublabel: "same as jar" }, { label: "445 g", sublabel: "how much more", emphasize: true }],
          caption: "558 g − 113 g = 445 g"
        },
        {
          kind: "measurement-lab",
          label: "All four operations appear in the lesson",
          model: "mixed-operation",
          rows: [
            { left: "10 pens", right: "10 × 6 g = 60 g; then 60 g + 82 g = 142 g" },
            { left: "frozen turkeys", right: "45 kg ÷ 5 kg = 9 turkeys" },
            { left: "triple recipe", right: "3 × 300 mL = 900 mL" },
            { left: "water container", right: "3 × 4 L + 2 L = 14 L" }
          ],
          equation: "whole/part → add or subtract; equal groups → multiply or divide",
          caption: "Keep the measurement unit attached until the context changes the answer unit."
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
      "671 g",
      "113 g",
      "10 pens",
      "300 mL",
      "45 kg",
      "14 L"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 11: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solve mixed word problems involving all four operations with grams, kilograms, liters, and milliliters given in the same units.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 127-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "hamster weighs 126 grams more than the mouse. made about pacing, select problems How much does the pet hamster weigh? Model the involving operations with which the class most needs practice, and problem on your board. intentionally vary the problem types. S: (Model.)",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 127-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "What models did you use to solve the word problems?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 11 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "measurement"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 11 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 11 Problem Set.",
      visualModel: "measurement"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 11 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 127-149.",
      visualModel: "measurement"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 127-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 11 objective: Solve mixed word problems involving all four operations with grams, kilograms, liters, and milliliters given in the same units.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 127-149.",
      visualModel: "measurement"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 127-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve mixed word problems involving all four operations with grams, kilograms, liters, and milliliters given in the same units."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 127-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "hamster weighs 126 grams more than the mouse. made about pacing, select problems How much does the pet hamster weigh? Model the involving operations with which the class most needs practice, and problem on your board. intentionally vary the problem types. S: (Model.)"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 11 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "What models did you use to solve the word problems?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 11 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 11 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 127-149."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 11 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 127-149. Lesson 11 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 11 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 127-149."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 11 objective: Solve mixed word problems involving all four operations with grams, kilograms, liters, and milliliters given in the same units."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 11 Problem Set."
      }
    ]
  }
};
