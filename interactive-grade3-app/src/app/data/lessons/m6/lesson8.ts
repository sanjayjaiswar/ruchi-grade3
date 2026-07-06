import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M6_LESSON8_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "line plot",
    "scale"
  ],
  lessonAnimation: {
    kind: "graph",
    title: "Lesson 8 animation: Represent measurement data with line plots.",
    context: "Use the Teacher Edition Lesson 8 quarter-inch line plot model to connect the official data context, labels, scale or interval, and answer evidence.",
    equation: "Read the scale, then compare or calculate from the graph data",
    teacherPrompt: "Use the official Lesson 8 quarter-inch line plot: read the source quantities, preserve the scale or interval, and justify each answer from the display.",
    focus: [
      "line plot",
      "scale",
      "graph",
      "source labels"
    ],
    graphBars: [
      {
        label: "Data A",
        value: 4
      },
      {
        label: "Data B",
        value: 3
      },
      {
        label: "Data C",
        value: 1
      }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 8: source objective",
      shortTitle: "Goal",
      studentPrompt: "Represent measurement data with line plots.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 106-119. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 8 quarter-inch line plot model to connect the official data context, labels, scale or interval, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 106-119. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Look at Problem (b). With a partner, compare the steps you took to create the line plot",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 8 Problem Set using the official Module 6 quarter-inch line plot quantities, labels, units, scale, and comparison structures from the Teacher Edition.",
      visualModel: "graph"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 6 Lesson 8 Problem Set prompts in order. Blank mode preserves the student-facing quarter-inch line plot workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 6 student workbook, Lesson 8 Problem Set.",
      visualModel: "graph"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 8 Problem Set workspace and source-backed quarter-inch line plot visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 106-119.",
      visualModel: "graph"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 106-119. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set quarter-inch line plot displays, scales, labels, comparisons, and answers to the Lesson 8 objective: Represent measurement data with line plots.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 106-119.",
      visualModel: "graph"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 106-119. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Represent measurement data with line plots."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 106-119. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 8 quarter-inch line plot model to connect the official data context, labels, scale or interval, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 8 Problem Set using the official Module 6 quarter-inch line plot quantities, labels, units, scale, and comparison structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Look at Problem (b). With a partner, compare the steps you took to create the line plot"
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 6 student workbook, Lesson 8 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 6 Lesson 8 Problem Set prompts in order. Blank mode preserves the student-facing quarter-inch line plot workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 106-119."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 8 Problem Set workspace and source-backed quarter-inch line plot visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 106-119. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 106-119."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set quarter-inch line plot displays, scales, labels, comparisons, and answers to the Lesson 8 objective: Represent measurement data with line plots."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 8 Problem Set."
      }
    ]
  }
};
