import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M6_LESSON3_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "scale"
  ],
  lessonAnimation: {
    kind: "graph",
    title: "Lesson 3 animation: Create scaled bar graphs.",
    context: "Use the Teacher Edition Lesson 3 scaled bar graph model to connect the official data context, labels, scale or interval, and answer evidence.",
    equation: "Read the scale, then compare or calculate from the graph data",
    teacherPrompt: "Use the official Lesson 3 scaled bar graph: read the source quantities, preserve the scale or interval, and justify each answer from the display.",
    focus: [
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
        value: 5
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
      title: "Lesson 3: source objective",
      shortTitle: "Goal",
      studentPrompt: "Create scaled bar graphs.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 33-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 3 scaled bar graph model to connect the official data context, labels, scale or interval, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 33-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "(Pass out Template 1 pictured to the right.) Draw the vertical tape diagrams from the Application Problem on the grid. (Allow students time to work.) Outline the bars with your colored pencil.",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 3 Problem Set using the official Module 6 scaled bar graph quantities, labels, units, scale, and comparison structures from the Teacher Edition.",
      visualModel: "graph"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 6 Lesson 3 Problem Set prompts in order. Blank mode preserves the student-facing scaled bar graph workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 6 student workbook, Lesson 3 Problem Set.",
      visualModel: "graph"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 3 Problem Set workspace and source-backed scaled bar graph visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 33-49.",
      visualModel: "graph"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 33-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set scaled bar graph displays, scales, labels, comparisons, and answers to the Lesson 3 objective: Create scaled bar graphs.",
      teacherEditionBasis: "Module 6 Teacher Edition, lesson pages 33-49.",
      visualModel: "graph"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 33-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Create scaled bar graphs."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 33-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 3 scaled bar graph model to connect the official data context, labels, scale or interval, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 3 Problem Set using the official Module 6 scaled bar graph quantities, labels, units, scale, and comparison structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "(Pass out Template 1 pictured to the right.) Draw the vertical tape diagrams from the Application Problem on the grid. (Allow students time to work.) Outline the bars with your colored pencil."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 6 student workbook, Lesson 3 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 6 Lesson 3 Problem Set prompts in order. Blank mode preserves the student-facing scaled bar graph workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 33-49."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 3 Problem Set workspace and source-backed scaled bar graph visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf, pages 33-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 6 Teacher Edition, lesson pages 33-49."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set scaled bar graph displays, scales, labels, comparisons, and answers to the Lesson 3 objective: Create scaled bar graphs."
      },
      {
        label: "Workbook",
        value: "Module 6 student workbook, Lesson 3 Problem Set."
      }
    ]
  }
};
