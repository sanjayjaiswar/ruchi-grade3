import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON10_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "capacity",
    "liter",
    "milliliter",
    "number line"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Lesson 10 animation: Estimate and measure liquid volume in liters and millil",
    context: "T: (Make groups of three students.) Each group will measure liquid volume to make a measuring bottle that contains 1 liter of water, similar to the one we used yesterday.",
    equation: "1 to 17 on equal intervals of 4",
    teacherPrompt: "In Problem 4, describe how the position of the points plotted in Part (a) helped you solve Parts (b) and (c)",
    focus: [
      "capacity",
      "liter",
      "number line",
      "source labels"
    ],
    numberLineLabels: [
      "1",
      "5",
      "9",
      "13",
      "17"
    ],
    numberLineJumps: [
      "+4",
      "+4",
      "+4"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 10: source objective",
      shortTitle: "Goal",
      studentPrompt: "Estimate and measure liquid volume in liters and milliliters using the vertical number line.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 116-126. Lesson 10 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "T: (Make groups of three students.) Each group will measure liquid volume to make a measuring bottle that contains 1 liter of water, similar to the one we used yesterday. Each group member has a job. One person will be the measurer, one will be the pourer, and the other will be the marker. Take 30 seconds to decide on jobs.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 116-126. Lesson 10 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "In Problem 4, describe how the position of the points plotted in Part (a) helped you solve Parts (b) and (c)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 10 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "number-line"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 10 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 10 Problem Set.",
      visualModel: "number-line"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 10 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 116-126.",
      visualModel: "number-line"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 116-126. Lesson 10 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 10 objective: Estimate and measure liquid volume in liters and milliliters using the vertical number line.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 116-126.",
      visualModel: "number-line"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 116-126. Lesson 10 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Estimate and measure liquid volume in liters and milliliters using the vertical number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 116-126. Lesson 10 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "T: (Make groups of three students.) Each group will measure liquid volume to make a measuring bottle that contains 1 liter of water, similar to the one we used yesterday. Each group member has a job. One person will be the measurer, one will be the pourer, and the other will be the marker. Take 30 seconds to decide on jobs."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 10 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "In Problem 4, describe how the position of the points plotted in Part (a) helped you solve Parts (b) and (c)"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 10 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 10 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 116-126."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 10 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 116-126. Lesson 10 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 10 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 116-126."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 10 objective: Estimate and measure liquid volume in liters and milliliters using the vertical number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 10 Problem Set."
      }
    ]
  }
};
