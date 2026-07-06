import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M7_LESSON26_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "area",
    "square unit",
    "perimeter",
    "angle"
  ],
  lessonAnimation: {
    kind: "geometry",
    title: "Lesson 26 animation: Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.",
    context: "Use the Teacher Edition Lesson 26 robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence.",
    equation: "Use attributes, side lengths, and labels from the figure",
    teacherPrompt: "Use the source Lesson 26 robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships; preserve the official quantities, labels, units, diagrams, and check evidence.",
    focus: [
      "area",
      "square unit",
      "geometry",
      "source labels"
    ],
    geometryLabels: [
      "side length",
      "side length",
      "perimeter"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 26: source objective",
      shortTitle: "Goal",
      studentPrompt: "Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 342-353. Lesson 26 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "geometry"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 26 robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 342-353. Lesson 26 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "geometry"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Problem Set source focus: students complete the Lesson 26 work using the official Module 7 robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships from the Teacher Edition and Student Workbook.",
      teacherEditionBasis: "Problem Set source focus: students complete the Lesson 26 work using the official Module 7 robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships from the Teacher Edition and Student Workbook.",
      visualModel: "geometry"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 7 Lesson 26 Problem Set prompts in order. Blank mode preserves the student-facing robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 7 student workbook, Lesson 26 Problem Set.",
      visualModel: "geometry"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the source-backed Lesson 26 workspace and robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships to model and solve the student-facing problems without inserting raw PDF/source-page images into Blank or Solved cards.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 26; Module 7 Teacher Edition and student workbook Problem Set pages.",
      visualModel: "geometry"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 342-353. Lesson 26 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "geometry"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships to the Lesson 26 objective: Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 26; Module 7 Teacher Edition and student workbook Problem Set pages.",
      visualModel: "geometry"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 342-353. Lesson 26 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 26 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 342-353. Lesson 26 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 26 robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 26 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set source focus: students complete the Lesson 26 work using the official Module 7 robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships from the Teacher Edition and Student Workbook."
      },
      {
        label: "Source text",
        value: "Teacher Edition check: preserve the Lesson 26 robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 26 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 7 student workbook, Lesson 26 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 7 Lesson 26 Problem Set prompts in order. Blank mode preserves the student-facing robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 26 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 26; Module 7 Teacher Edition and student workbook Problem Set pages."
      },
      {
        label: "Source text",
        value: "Use the source-backed Lesson 26 workspace and robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships to model and solve the student-facing problems without inserting raw PDF/source-page images into Blank or Solved cards."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 26 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 342-353. Lesson 26 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 26 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 26; Module 7 Teacher Edition and student workbook Problem Set pages."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set robot planning, drawing, measurement, and evaluation workspace with the official chart rows and perimeter relationships to the Lesson 26 objective: Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 26 Problem Set."
      }
    ]
  }
};
