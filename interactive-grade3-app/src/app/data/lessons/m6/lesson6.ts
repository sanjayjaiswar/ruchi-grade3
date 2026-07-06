import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M6_LESSON6_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "line plot",
    "scale"
  ],
  lessonAnimation: {
    kind: "graph",
    title: "Lesson 6 animation: Interpret measurement data from various line plots.",
    context: "Use the Teacher Edition Lesson 6 line plot with half-inch and quarter-inch intervals model to connect the official data context, labels, scale or interval, and answer evidence.",
    equation: "Read the scale, then compare or calculate from the graph data",
    teacherPrompt: "Use the official Lesson 6 line plot with half-inch and quarter-inch intervals: read the source quantities, preserve the scale or interval, and justify each answer from the display.",
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
        value: 2
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
      title: "Lesson 6: source objective",
      shortTitle: "Goal",
      studentPrompt: "Interpret measurement data from various line plots.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 78-92. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 6 line plot with half-inch and quarter-inch intervals model to connect the official data context, labels, scale or interval, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 78-92. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "(Project the line plot, but only reveal the number line, as shown below. Point to the tick mark between 1 and 2.) What should I label this tick mark on the number line? 1 2 3 4 1",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 6 Problem Set using the official Module 6 line plot with half-inch and quarter-inch intervals quantities, labels, units, scale, and comparison structures from the Teacher Edition.",
      visualModel: "graph"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 6 Lesson 6 Problem Set prompts in order. Blank mode preserves the student-facing line plot with half-inch and quarter-inch intervals workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 6 student workbook, Lesson 6 Problem Set.",
      visualModel: "graph"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 6 Problem Set workspace and source-backed line plot with half-inch and quarter-inch intervals visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 78-92.",
      visualModel: "graph"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 78-92. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set line plot with half-inch and quarter-inch intervals displays, scales, labels, comparisons, and answers to the Lesson 6 objective: Interpret measurement data from various line plots.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 78-92.",
      visualModel: "graph"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 78-92. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Interpret measurement data from various line plots."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 78-92. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 6 line plot with half-inch and quarter-inch intervals model to connect the official data context, labels, scale or interval, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 6 Problem Set using the official Module 6 line plot with half-inch and quarter-inch intervals quantities, labels, units, scale, and comparison structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "(Project the line plot, but only reveal the number line, as shown below. Point to the tick mark between 1 and 2.) What should I label this tick mark on the number line? 1 2 3 4 1"
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 6 student workbook, Lesson 6 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 6 Lesson 6 Problem Set prompts in order. Blank mode preserves the student-facing line plot with half-inch and quarter-inch intervals workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 78-92."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 6 Problem Set workspace and source-backed line plot with half-inch and quarter-inch intervals visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 78-92. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 78-92."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set line plot with half-inch and quarter-inch intervals displays, scales, labels, comparisons, and answers to the Lesson 6 objective: Interpret measurement data from various line plots."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 6 Problem Set."
      }
    ]
  }
};
