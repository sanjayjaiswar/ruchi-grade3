import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M6_LESSON1_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "data",
    "scale"
  ],
  lessonAnimation: {
    kind: "graph",
    title: "Lesson 1 animation: Generate and organize data.",
    context: "Use the Teacher Edition Lesson 1 tally chart and picture graph model to connect the official data context, labels, scale or interval, and answer evidence.",
    equation: "Read the scale, then compare or calculate from the graph data",
    teacherPrompt: "Use the official Lesson 1 tally chart and picture graph: read the source quantities, preserve the scale or interval, and justify each answer from the display.",
    focus: [
      "data",
      "scale",
      "graph",
      "source labels"
    ],
    graphBars: [
      {
        label: "Green",
        value: 3
      },
      {
        label: "Yellow",
        value: 3
      },
      {
        label: "Red",
        value: 1
      },
      {
        label: "Blue",
        value: 2
      },
      {
        label: "Orange",
        value: 4
      }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 1: source objective",
      shortTitle: "Goal",
      studentPrompt: "Generate and organize data.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 10-21. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 1 tally chart and picture graph model to connect the official data context, labels, scale or interval, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 10-21. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Compare the data in the picture graphs in Problems 3(a) and 3(b)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 1 Problem Set using the official Module 6 tally chart and picture graph quantities, labels, units, scale, and comparison structures from the Teacher Edition.",
      visualModel: "graph"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 6 Lesson 1 Problem Set prompts in order. Blank mode preserves the student-facing tally chart and picture graph workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 6 student workbook, Lesson 1 Problem Set.",
      visualModel: "graph"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 1 Problem Set workspace and source-backed tally chart and picture graph visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 10-21.",
      visualModel: "graph"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 10-21. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set tally chart and picture graph displays, scales, labels, comparisons, and answers to the Lesson 1 objective: Generate and organize data.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 10-21.",
      visualModel: "graph"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 10-21. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Generate and organize data."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 10-21. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 1 tally chart and picture graph model to connect the official data context, labels, scale or interval, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 1 Problem Set using the official Module 6 tally chart and picture graph quantities, labels, units, scale, and comparison structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Compare the data in the picture graphs in Problems 3(a) and 3(b)"
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 6 student workbook, Lesson 1 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 6 Lesson 1 Problem Set prompts in order. Blank mode preserves the student-facing tally chart and picture graph workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 10-21."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 1 Problem Set workspace and source-backed tally chart and picture graph visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 10-21. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 10-21."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set tally chart and picture graph displays, scales, labels, comparisons, and answers to the Lesson 1 objective: Generate and organize data."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 1 Problem Set."
      }
    ]
  }
};
