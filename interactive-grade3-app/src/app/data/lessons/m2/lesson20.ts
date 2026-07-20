import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON20_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "round",
    "number line"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Lesson 20 animation: rounding direction changes the difference",
    context: "Work through the eight exact source expressions from Problem 1. The closest estimates are selected only after each actual and nearest-hundred difference is visible.",
    equation: "Same-direction rounding keeps the distance nearly unchanged; opposite-direction rounding stretches or shrinks it.",
    teacherPrompt: "When do both numbers move together? Why does that keep the estimated difference close?",
    focus: [
      "round",
      "number line",
      "source labels"
    ],
    estimateComparison: {
      expression: "Eight Lesson 20 Problem Set differences",
      actual: "295–508",
      strategies: [
        {
          label: "opposite directions",
          expression: "448 - 153 = 295",
          actual: 295,
          roundedExpression: "400 - 200",
          estimate: 200,
          error: 95,
          movement: "448 down; 153 up"
        },
        {
          label: "both round up",
          expression: "451 - 153 = 298",
          actual: 298,
          roundedExpression: "500 - 200",
          estimate: 300,
          error: 2,
          movement: "distance stays nearly the same",
          best: true
        },
        {
          label: "both round down",
          expression: "448 - 149 = 299",
          actual: 299,
          roundedExpression: "400 - 100",
          estimate: 300,
          error: 1,
          movement: "distance stays nearly the same",
          best: true
        },
        {
          label: "opposite directions",
          expression: "451 - 149 = 302",
          actual: 302,
          roundedExpression: "500 - 100",
          estimate: 400,
          error: 98,
          movement: "451 up; 149 down"
        },
        {
          label: "opposite directions",
          expression: "747 - 261 = 486",
          actual: 486,
          roundedExpression: "700 - 300",
          estimate: 400,
          error: 86,
          movement: "747 down; 261 up"
        },
        {
          label: "both round up",
          expression: "756 - 261 = 495",
          actual: 495,
          roundedExpression: "800 - 300",
          estimate: 500,
          error: 5,
          movement: "distance stays nearly the same",
          best: true
        },
        {
          label: "both round down",
          expression: "747 - 249 = 498",
          actual: 498,
          roundedExpression: "700 - 200",
          estimate: 500,
          error: 2,
          movement: "distance stays nearly the same",
          best: true
        },
        {
          label: "opposite directions",
          expression: "756 - 248 = 508",
          actual: 508,
          roundedExpression: "800 - 200",
          estimate: 600,
          error: 92,
          movement: "756 up; 248 down"
        }
      ]
    }
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
