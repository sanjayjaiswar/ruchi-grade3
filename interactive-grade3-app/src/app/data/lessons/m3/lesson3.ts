import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON3_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "division",
    "quotient",
    "factor",
    "product"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 3 animation: the letter names the unknown quantity",
    context: "Use the source canoe, field-trip, and shopping relationships to see the unknown as a number of groups, a group size, or a total.",
    equation: "Choose the letter from the story, write the relationship, then solve the familiar fact.",
    teacherPrompt: "Explain to your partner how you solved Problem 3. (Review division as both an unknown factor and an equal groups problem.)",
    focus: [
      "division",
      "quotient",
      "tape diagram",
      "source labels"
    ],
    groupCount: 8,
    groupSize: 3,
    rowCount: 8,
    columnCount: 3,
    tapePartCount: 8,
    tapePartLabel: "3 people",
    tapeWholeLabel: "24 people total",
    unknownCases: [
      {
        label: "number of groups",
        whole: "24 people",
        known: "3 people per canoe",
        unknown: "c canoes",
        equation: "3 × c = 24",
        solution: "c = 8 canoes"
      },
      {
        label: "number of groups",
        whole: "21 students",
        known: "3 students per group",
        unknown: "g groups",
        equation: "21 ÷ 3 = g",
        solution: "g = 7 groups"
      },
      {
        label: "unknown total",
        whole: "m dollars",
        known: "3 shirts at $8 each",
        unknown: "total cost m",
        equation: "3 × 8 = m",
        solution: "m = $24"
      }
    ],
    conceptSteps: [
      { label: "Name the letter", action: "Choose a letter that matches the story quantity, such as c for canoes.", result: "The letter stands for one specific unknown quantity." },
      { label: "Write the relationship", action: "Place the letter where the unknown belongs in multiplication or division.", result: "Examples include 3 × c = 24 and 21 ÷ 3 = g." },
      { label: "Solve and label", action: "Use a familiar fact, then attach the story unit.", result: "c = 8 canoes, g = 7 groups, and m = $24." }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 3: source objective",
      shortTitle: "Goal",
      studentPrompt: "Multiply and divide with familiar facts using a letter to represent the unknown.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Twenty-four people use canoes with 3 people assigned to each canoe. Use c in place of the question mark: c stands for the number of canoes. Write 3 × c = 24, solve c = 8, and answer that the people use 8 canoes.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Explain to your partner how you solved Problem 3. (Review division as both an unknown factor and an equal groups problem.)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 3 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 3 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 3 Problem Set.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 3 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 38-50.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Explain how you solved Problem 3 as both an unknown-factor and equal-groups problem. Tell the steps used to model and solve Problem 4. Why is a letter more helpful than a question mark for representing the unknown?",
      teacherEditionBasis: "Module 3 Teacher Edition, Lesson 3 Student Debrief, PDF page 42.",
      visualModel: "tape-diagram"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Multiply and divide with familiar facts using a letter to represent the unknown."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Twenty-four people use canoes with 3 people assigned to each canoe. Use c in place of the question mark: c stands for the number of canoes. Write 3 × c = 24, solve c = 8, and answer that the people use 8 canoes."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 3 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Explain to your partner how you solved Problem 3. (Review division as both an unknown factor and an equal groups problem.)"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 3 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 38-50."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 3 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 38-50. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, Lesson 3 Student Debrief, PDF page 42."
      },
      {
        label: "Source text",
        value: "Explain how you solved Problem 3 as both an unknown-factor and equal-groups problem. Tell the steps used to model and solve Problem 4. Why is a letter more helpful than a question mark for representing the unknown?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 3 Problem Set."
      }
    ]
  }
};
