import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M7_LESSON22_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "line plot",
    "scale",
    "angle"
  ],
  lessonAnimation: {
    kind: "graph",
    title: "Lesson 22 animation: Use a line plot to record the number of rectangles constructed in Lessons 20 and 21.",
    context: "Use the Teacher Edition Lesson 22 rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence.",
    equation: "Read the scale, then compare or calculate from the graph data",
    teacherPrompt: "Use the source Lesson 22 rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence; preserve the official quantities, labels, units, diagrams, and check evidence.",
    focus: [
      "line plot",
      "scale",
      "graph",
      "source labels"
    ],
    graphBars: [
      {
        label: "Data A",
        value: 20
      },
      {
        label: "Data B",
        value: 21
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
      title: "Lesson 22: source objective",
      shortTitle: "Goal",
      studentPrompt: "Use a line plot to record the number of rectangles constructed in Lessons 20 and 21.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 295-310. Lesson 22 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 22 rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 295-310. Lesson 22 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Problem Set source focus: students complete the Lesson 22 work using the official Module 7 rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence from the Teacher Edition and Student Workbook.",
      teacherEditionBasis: "Problem Set source focus: students complete the Lesson 22 work using the official Module 7 rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence from the Teacher Edition and Student Workbook.",
      visualModel: "graph"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 7 Lesson 22 Problem Set prompts in order. Blank mode preserves the student-facing rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 7 student workbook, Lesson 22 Problem Set.",
      visualModel: "graph"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the source-backed Lesson 22 workspace and rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence to model and solve the student-facing problems without inserting raw PDF/source-page images into Blank or Solved cards.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 22; Module 7 Teacher Edition and student workbook Problem Set pages.",
      visualModel: "graph"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 295-310. Lesson 22 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "graph"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence to the Lesson 22 objective: Use a line plot to record the number of rectangles constructed in Lessons 20 and 21.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 22; Module 7 Teacher Edition and student workbook Problem Set pages.",
      visualModel: "graph"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 295-310. Lesson 22 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use a line plot to record the number of rectangles constructed in Lessons 20 and 21."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 22 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 295-310. Lesson 22 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 22 rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 22 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set source focus: students complete the Lesson 22 work using the official Module 7 rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence from the Teacher Edition and Student Workbook."
      },
      {
        label: "Source text",
        value: "Teacher Edition check: preserve the Lesson 22 rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 22 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 7 student workbook, Lesson 22 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 7 Lesson 22 Problem Set prompts in order. Blank mode preserves the student-facing rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 22 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 22; Module 7 Teacher Edition and student workbook Problem Set pages."
      },
      {
        label: "Source text",
        value: "Use the source-backed Lesson 22 workspace and rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence to model and solve the student-facing problems without inserting raw PDF/source-page images into Blank or Solved cards."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 22 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 295-310. Lesson 22 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 22 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 22; Module 7 Teacher Edition and student workbook Problem Set pages."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set rectangle, area, perimeter, and line-plot workspace with source dimensions and plotted evidence to the Lesson 22 objective: Use a line plot to record the number of rectangles constructed in Lessons 20 and 21."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 22 Problem Set."
      }
    ]
  }
};
