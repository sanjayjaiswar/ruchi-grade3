import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON20_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "round",
    "number line"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Lesson 20 animation: Estimate differences by rounding and apply to solve mea",
    context: "Estimate 362 – 189 by rounding.",
    equation: "0 to 20 on equal intervals of 5",
    teacherPrompt: "Share your observations from Problem 1(b). What did you find out? How is this different than rounding when you add?",
    focus: [
      "round",
      "number line",
      "source labels"
    ],
    numberLineLabels: [
      "0",
      "5",
      "10",
      "15",
      "20"
    ],
    numberLineJumps: [
      "+5",
      "+5",
      "+5"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 20: source objective",
      shortTitle: "Goal",
      studentPrompt: "Estimate differences by rounding and apply to solve measurement word problems.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 243-256. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Estimate 362 - 189 by rounding. T: What is 362 rounded to the nearest hundred? S: 400. T: Let's write it directly below 362. (Allow students time to write 400 below 362.) What is 189 rounded to the nearest hundred? S: 200. T: Let's write it directly below 189. (Allow students time to write 200 below 189.) What is 400 - 200? S: 200.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 243-256. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Share your observations from Problem 1(b). What did you find out? How is this different than rounding when you add?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 20 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "number-line"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 20 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 20 Problem Set.",
      visualModel: "number-line"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 20 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 243-256.",
      visualModel: "number-line"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 243-256. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 20 objective: Estimate differences by rounding and apply to solve measurement word problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 243-256.",
      visualModel: "number-line"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 243-256. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Estimate differences by rounding and apply to solve measurement word problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 243-256. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Estimate 362 - 189 by rounding. T: What is 362 rounded to the nearest hundred? S: 400. T: Let's write it directly below 362. (Allow students time to write 400 below 362.) What is 189 rounded to the nearest hundred? S: 200. T: Let's write it directly below 189. (Allow students time to write 200 below 189.) What is 400 - 200? S: 200."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 20 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Share your observations from Problem 1(b). What did you find out? How is this different than rounding when you add?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 20 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 20 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 243-256."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 20 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 243-256. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 243-256."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 20 objective: Estimate differences by rounding and apply to solve measurement word problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 20 Problem Set."
      }
    ]
  }
};
