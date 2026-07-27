import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M6_LESSON5_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "line plot",
    "scale"
  ],
  lessonAnimation: {
    kind: "graph",
    title: "Lesson 5 animation: Create rulers with 1-inch, 1/2-inch, and 1/4-inch intervals.",
    context: "Use the Teacher Edition Lesson 5 ruler, inch intervals, and measurement table model to connect the official data context, labels, scale or interval, and answer evidence.",
    equation: "Read the scale, then compare or calculate from the graph data",
    teacherPrompt: "Use the official Lesson 5 ruler, inch intervals, and measurement table: read the source quantities, preserve the scale or interval, and justify each answer from the display.",
    focus: [
      "line plot",
      "scale",
      "graph",
      "source labels"
    ],
    graphBars: [
      {
        label: "Data A",
        value: 1
      },
      {
        label: "Data B",
        value: 1
      },
      {
        label: "Data C",
        value: 2
      }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 5: source objective",
      shortTitle: "Goal",
      studentPrompt: "Create ruler with 1-inch, ½-inch, and ¼-inch intervals, and generate measurement data.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 66-77. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 5 ruler, inch intervals, and measurement table model to connect the official data context, labels, scale or interval, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 66-77. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Ask the student to explain what the model shows before accepting the final answer.",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 5 Problem Set using the official Module 6 ruler, inch intervals, and measurement table quantities, labels, units, scale, and comparison structures from the Teacher Edition.",
      visualModel: "graph"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 6 Lesson 5 Problem Set prompts in order. Blank mode preserves the student-facing ruler, inch intervals, and measurement table workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 6 student workbook, Lesson 5 Problem Set.",
      visualModel: "graph"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 5 Problem Set workspace and source-backed ruler, inch intervals, and measurement table visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 66-77.",
      visualModel: "graph"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 66-77. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set ruler, inch intervals, and measurement table displays, scales, labels, comparisons, and answers to the Lesson 5 objective: Create ruler with 1-inch, ½-inch, and ¼-inch intervals, and generate measurement data.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 66-77.",
      visualModel: "graph"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 66-77. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Create ruler with 1-inch, ½-inch, and ¼-inch intervals, and generate measurement data."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 66-77. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 5 ruler, inch intervals, and measurement table model to connect the official data context, labels, scale or interval, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 5 Problem Set using the official Module 6 ruler, inch intervals, and measurement table quantities, labels, units, scale, and comparison structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Ask the student to explain what the model shows before accepting the final answer."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 6 student workbook, Lesson 5 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 6 Lesson 5 Problem Set prompts in order. Blank mode preserves the student-facing ruler, inch intervals, and measurement table workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 66-77."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 5 Problem Set workspace and source-backed ruler, inch intervals, and measurement table visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 66-77. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 66-77."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set ruler, inch intervals, and measurement table displays, scales, labels, comparisons, and answers to the Lesson 5 objective: Create ruler with 1-inch, ½-inch, and ¼-inch intervals, and generate measurement data."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 5 Problem Set."
      }
    ]
  }
};
