import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M6_LESSON4_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "scale"
  ],
  lessonAnimation: {
    kind: "graph",
    title: "Lesson 4 animation: Solve one- and two-step problems involving graphs.",
    context: "Use the Teacher Edition Lesson 4 scaled bar graph model to connect the official data context, labels, scale or interval, and answer evidence.",
    equation: "Read the scale, then compare or calculate from the graph data",
    teacherPrompt: "Use the official Lesson 4 scaled bar graph: read the source quantities, preserve the scale or interval, and justify each answer from the display.",
    focus: [
      "scale",
      "graph",
      "source labels"
    ],
    graphBars: [
      {
        label: "Monday",
        value: 7
      },
      {
        label: "Tuesday",
        value: 5
      },
      {
        label: "Wednesday",
        value: 8
      },
      {
        label: "Thursday",
        value: 7
      },
      {
        label: "Friday",
        value: 7
      }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 4: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solve one- and two-step problems involving graphs.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 50-65. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 4 scaled bar graph model to connect the official data context, labels, scale or interval, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 50-65. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Invite students who used different scales for Problem 1 to share their work",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 4 Problem Set using the official Module 6 scaled bar graph quantities, labels, units, scale, and comparison structures from the Teacher Edition.",
      visualModel: "graph"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 6 Lesson 4 Problem Set prompts in order. Blank mode preserves the student-facing scaled bar graph workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 6 student workbook, Lesson 4 Problem Set.",
      visualModel: "graph"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 4 Problem Set workspace and source-backed scaled bar graph visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 50-65.",
      visualModel: "graph"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 50-65. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set scaled bar graph displays, scales, labels, comparisons, and answers to the Lesson 4 objective: Solve one- and two-step problems involving graphs.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 50-65.",
      visualModel: "graph"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 50-65. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve one- and two-step problems involving graphs."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 50-65. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 4 scaled bar graph model to connect the official data context, labels, scale or interval, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 4 Problem Set using the official Module 6 scaled bar graph quantities, labels, units, scale, and comparison structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Invite students who used different scales for Problem 1 to share their work"
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 6 student workbook, Lesson 4 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 6 Lesson 4 Problem Set prompts in order. Blank mode preserves the student-facing scaled bar graph workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 50-65."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 4 Problem Set workspace and source-backed scaled bar graph visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 50-65. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 50-65."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set scaled bar graph displays, scales, labels, comparisons, and answers to the Lesson 4 objective: Solve one- and two-step problems involving graphs."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 4 Problem Set."
      }
    ]
  }
};
