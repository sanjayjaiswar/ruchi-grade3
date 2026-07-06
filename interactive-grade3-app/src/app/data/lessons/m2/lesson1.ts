import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON1_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "elapsed time",
    "number line"
  ],
  lessonAnimation: {
    kind: "clock",
    title: "Lesson 1 animation: Explore time as a continuous measurement using a stopwa",
    context: "Part 1: Explore seconds as a unit of time.",
    equation: "5 sec start -> 5 sec elapsed -> 10 sec end",
    teacherPrompt: "Explain to your partner why the activities in Problem 5 did not take that long to complete",
    focus: [
      "elapsed time",
      "number line",
      "clock",
      "source labels"
    ],
    clockLabels: [
      "5 sec start",
      "5 sec elapsed",
      "10 sec end"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 1: source objective",
      shortTitle: "Goal",
      studentPrompt: "Explore time as a continuous measurement using a stopwatch.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 13-23. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Explore seconds as a unit of time. T: It takes Ms. Bower 5 seconds to tie one shoe. Does it take a very long time to tie a shoe?",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 13-23. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Explain to your partner why the activities in Problem 5 did not take that long to complete",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 1 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "clock"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 1 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 1 Problem Set.",
      visualModel: "clock"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 1 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 13-23.",
      visualModel: "clock"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 13-23. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 1 objective: Explore time as a continuous measurement using a stopwatch.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 13-23.",
      visualModel: "clock"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 13-23. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Explore time as a continuous measurement using a stopwatch."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 13-23. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Explore seconds as a unit of time. T: It takes Ms. Bower 5 seconds to tie one shoe. Does it take a very long time to tie a shoe?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 1 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Explain to your partner why the activities in Problem 5 did not take that long to complete"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 1 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 13-23."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 1 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 13-23. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 13-23."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 1 objective: Explore time as a continuous measurement using a stopwatch."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      }
    ]
  }
};
