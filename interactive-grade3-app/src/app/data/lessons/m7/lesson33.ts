import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M7_LESSON33_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [],
  lessonAnimation: {
    kind: "geometry",
    title: "Lesson 33 animation: Solidify fluency with Grade 3 skills.",
    context: "Use the Teacher Edition Lesson 33 critique, reflection, or fluency workspace with the official response structure to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence.",
    equation: "Use attributes, side lengths, and labels from the figure",
    teacherPrompt: "Use the source Lesson 33 critique, reflection, or fluency workspace with the official response structure; preserve the official quantities, labels, units, diagrams, and check evidence.",
    focus: [
      "geometry",
      "source labels"
    ],
    geometryLabels: [
      "side",
      "vertex",
      "attribute"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 33: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solidify fluency with Grade 3 skills.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 443-453. Lesson 33 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "geometry"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 33 critique, reflection, or fluency workspace with the official response structure to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 443-453. Lesson 33 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "geometry"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Problem Set source focus: students complete the Lesson 33 work using the official Module 7 critique, reflection, or fluency workspace with the official response structure from the Teacher Edition and Student Workbook.",
      teacherEditionBasis: "Problem Set source focus: students complete the Lesson 33 work using the official Module 7 critique, reflection, or fluency workspace with the official response structure from the Teacher Edition and Student Workbook.",
      visualModel: "geometry"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 7 Lesson 33 Problem Set prompts in order. Blank mode preserves the student-facing critique, reflection, or fluency workspace with the official response structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 7 student workbook, Lesson 33 Problem Set.",
      visualModel: "geometry"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the Lesson 33 critique, reflection, or fluency workspace with the official response structure to model and solve the student-facing problems with authored diagrams, labels, measurements, and response blanks.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 33; Module 7 Teacher Edition and student workbook Problem Set pages.",
      visualModel: "geometry"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 443-453. Lesson 33 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "geometry"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set critique, reflection, or fluency workspace with the official response structure to the Lesson 33 objective: Solidify fluency with Grade 3 skills.",
      teacherEditionBasis: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 33; Module 7 Teacher Edition and student workbook Problem Set pages.",
      visualModel: "geometry"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 443-453. Lesson 33 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solidify fluency with Grade 3 skills."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 33 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 443-453. Lesson 33 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 33 critique, reflection, or fluency workspace with the official response structure to connect the official problem context, visual structure, quantities, labels, units, and answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 33 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set source focus: students complete the Lesson 33 work using the official Module 7 critique, reflection, or fluency workspace with the official response structure from the Teacher Edition and Student Workbook."
      },
      {
        label: "Source text",
        value: "Teacher Edition check: preserve the Lesson 33 critique, reflection, or fluency workspace with the official response structure."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 33 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 7 student workbook, Lesson 33 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 7 Lesson 33 Problem Set prompts in order. Blank mode preserves the student-facing critique, reflection, or fluency workspace with the official response structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 33 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 33; Module 7 Teacher Edition and student workbook Problem Set pages."
      },
      {
        label: "Source text",
        value: "Use the Lesson 33 critique, reflection, or fluency workspace with the official response structure to model and solve the student-facing problems with authored diagrams, labels, measurements, and response blanks."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 33 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, pages 443-453. Lesson 33 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 33 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf, Lesson 33; Module 7 Teacher Edition and student workbook Problem Set pages."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set critique, reflection, or fluency workspace with the official response structure to the Lesson 33 objective: Solidify fluency with Grade 3 skills."
      },
      {
        label: "Workbook",
        value: "Module 7 Teacher Edition, Lesson 33 Problem Set."
      }
    ]
  }
};
