import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON19_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "distributive property",
    "decompose",
    "array"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 19 animation: decompose a division fact",
    context: "Show 24 as 12 rows of 2, split the array into two equal 12-dot parts, then divide each part by 2.",
    equation: "24 divided by 2 = (12 divided by 2) + (12 divided by 2) = 6 + 6 = 12",
    teacherPrompt: "How does splitting the dividend into two friendly parts help find the quotient?",
    groupCount: 12,
    groupSize: 2,
    rowCount: 12,
    columnCount: 2,
    tapePartCount: 12,
    tapePartLabel: "2",
    tapeWholeLabel: "24 total",
    firstPart: 6,
    secondPart: 6,
    focus: [
      "Split dividend",
      "Same divisor",
      "Add partial quotients"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 19: source objective",
      shortTitle: "Goal",
      studentPrompt: "Apply the distributive property to decompose units.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 245-254. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the array to solve 24 divided by 2 by breaking the dividend into two smaller facts, dividing each part by 2, and adding the partial quotients.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 245-254. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Compare Nell's strategy in Problem 3 to the strategy for solving 24 divided by 2 in the Concept Development",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 19 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1 uses four arrays to decompose division facts: 36 divided by 3, 25 divided by 5, 28 divided by 4, and 32 divided by 4. Problem 2 matches each division fact to an equal decomposed expression. Problem 3 explains Nell's 24 divided by 2 array split.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 19 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 19 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 245-254.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 245-254. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 19 objective: Apply the distributive property to decompose units.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 245-254.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 245-254. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Apply the distributive property to decompose units."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 19 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 245-254. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the array to solve 24 divided by 2 by breaking the dividend into two smaller facts, dividing each part by 2, and adding the partial quotients."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 19 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set focus: students solve decomposed division problems, matching each divided part to the total quotient and using RDW when a method is not specified."
      },
      {
        label: "Source text",
        value: "Compare Nell's strategy in Problem 3 to the strategy for solving 24 divided by 2 in the Concept Development"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 19 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 19 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1 uses four arrays to decompose division facts: 36 divided by 3, 25 divided by 5, 28 divided by 4, and 32 divided by 4. Problem 2 matches each division fact to an equal decomposed expression. Problem 3 explains Nell's 24 divided by 2 array split."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 19 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 245-254."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 19 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 19 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 245-254. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 19 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 245-254."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 19 objective: Apply the distributive property to decompose units."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 19 Problem Set."
      }
    ]
  }
};
