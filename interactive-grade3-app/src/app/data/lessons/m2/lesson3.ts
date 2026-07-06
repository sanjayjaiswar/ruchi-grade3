import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON3_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "elapsed time",
    "number line",
    "round"
  ],
  lessonAnimation: {
    kind: "clock",
    title: "Lesson 3 animation: Count by fives and ones on the number line as a strateg",
    context: "T: Use your ruler to draw a 12-centimeter line on your personal white board.",
    equation: "12 sec start -> 12 sec elapsed -> 60 sec end",
    teacherPrompt: "Look at Problem 1. Talk to a partner: How is the number line similar to the analog clock? How is it different?",
    focus: [
      "elapsed time",
      "number line",
      "clock",
      "source labels"
    ],
    clockLabels: [
      "12 sec start",
      "12 sec elapsed",
      "60 sec end"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 3: source objective",
      shortTitle: "Goal",
      studentPrompt: "Count by fives and ones on the number line as a strategy to tell time to the nearest minute on the clock.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 37-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "T: Use your ruler to draw a 12-centimeter line on your personal white board. Start at the 0 mark, and make a tick mark at each centimeter up to the number 12. Label the first tick mark 0 and the last tick mark 60. Then, count by fives from 0 to 60 to label each interval, like we did in the last lesson. S: (Draw and label a number line as shown.) 0 5 10 15 20 25 30 35 40 45 50 55 60 T: Put your finger on 0.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 37-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Look at Problem 1. Talk to a partner: How is the number line similar to the analog clock? How is it different?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 3 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "clock"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 3 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 3 Problem Set.",
      visualModel: "clock"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 3 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 37-49.",
      visualModel: "clock"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 37-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 3 objective: Count by fives and ones on the number line as a strategy to tell time to the nearest minute on the clock.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 37-49.",
      visualModel: "clock"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 37-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Count by fives and ones on the number line as a strategy to tell time to the nearest minute on the clock."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 37-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "T: Use your ruler to draw a 12-centimeter line on your personal white board. Start at the 0 mark, and make a tick mark at each centimeter up to the number 12. Label the first tick mark 0 and the last tick mark 60. Then, count by fives from 0 to 60 to label each interval, like we did in the last lesson. S: (Draw and label a number line as shown.) 0 5 10 15 20 25 30 35 40 45 50 55 60 T: Put your finger on 0."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 3 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Look at Problem 1. Talk to a partner: How is the number line similar to the analog clock? How is it different?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 3 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 3 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 37-49."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 3 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 37-49. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 3 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 37-49."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 3 objective: Count by fives and ones on the number line as a strategy to tell time to the nearest minute on the clock."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 3 Problem Set."
      }
    ]
  }
};
