import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M7_LESSON23_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "area",
    "perimeter"
  ],
  lessonAnimation: {
    kind: "geometry",
    title: "Lesson 23 animation: Solve a variety of word problems with perimeter.",
    context: "Use the Teacher Edition Lesson 23 RDW word-problem model with quantities, labels, units, and written answer evidence to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence.",
    equation: "Use the outside boundary and given side lengths for each source problem",
    teacherPrompt: "Use the source Lesson 23 RDW word-problem model with quantities, labels, units, and written answer evidence; preserve the official quantities, labels, units, diagrams, and check evidence.",
    focus: [
      "area",
      "perimeter",
      "regular polygon",
      "source labels"
    ],
    geometryLabels: ["octagon", "rectangle", "square tiles", "perimeter"]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 23: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solve a variety of word problems with perimeter.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 311-321. Lesson 23 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "geometry"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 23 RDW word-problem model with quantities, labels, units, and written answer evidence to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 311-321. Lesson 23 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "geometry"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Problem Set source focus: students complete the Lesson 23 work using the official Module 7 RDW word-problem model with quantities, labels, units, and written answer evidence from the Teacher Edition and Student Workbook.",
      teacherEditionBasis: "Problem Set source focus: students complete the Lesson 23 work using the official Module 7 RDW word-problem model with quantities, labels, units, and written answer evidence from the Teacher Edition and Student Workbook.",
      visualModel: "geometry"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 7 Lesson 23 Problem Set prompts in order. Blank mode preserves the student-facing RDW word-problem model with quantities, labels, units, and written answer evidence; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 7 student workbook, Lesson 23 Problem Set.",
      visualModel: "geometry"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the Lesson 23 RDW word-problem model with quantities, labels, units, and written answer evidence to model and solve the student-facing problems with authored diagrams, labels, measurements, and response blanks.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 23; Module 7 Teacher Edition and student workbook Problem Set pages.",
      visualModel: "geometry"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 311-321. Lesson 23 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "geometry"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set RDW word-problem model with quantities, labels, units, and written answer evidence to the Lesson 23 objective: Solve a variety of word problems with perimeter.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 23; Module 7 Teacher Edition and student workbook Problem Set pages.",
      visualModel: "geometry"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 311-321. Lesson 23 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve a variety of word problems with perimeter."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 23 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 311-321. Lesson 23 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 23 RDW word-problem model with quantities, labels, units, and written answer evidence to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 23 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set source focus: students complete the Lesson 23 work using the official Module 7 RDW word-problem model with quantities, labels, units, and written answer evidence from the Teacher Edition and Student Workbook."
      },
      {
        label: "Source text",
        value: "Teacher Edition check: preserve the Lesson 23 RDW word-problem model with quantities, labels, units, and written answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 23 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 7 student workbook, Lesson 23 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 7 Lesson 23 Problem Set prompts in order. Blank mode preserves the student-facing RDW word-problem model with quantities, labels, units, and written answer evidence; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 23 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 23; Module 7 Teacher Edition and student workbook Problem Set pages."
      },
      {
        label: "Source text",
        value: "Use the Lesson 23 RDW word-problem model with quantities, labels, units, and written answer evidence to model and solve the student-facing problems with authored diagrams, labels, measurements, and response blanks."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 23 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 311-321. Lesson 23 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 23 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 23; Module 7 Teacher Edition and student workbook Problem Set pages."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set RDW word-problem model with quantities, labels, units, and written answer evidence to the Lesson 23 objective: Solve a variety of word problems with perimeter."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 23 Problem Set."
      }
    ]
  }
};
