import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON1_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "seconds",
    "minutes",
    "elapsed time",
    "continuous",
    "stopwatch"
  ],
  lessonAnimation: {
    kind: "clock",
    title: "Lesson 1 animation: stopwatch seconds measure continuous time",
    context: "The Teacher Edition uses a stopwatch to feel 1 second, 5 seconds, and 40 seconds before students measure their own short activities.",
    equation: "8 shoes x 5 seconds = 40 seconds",
    teacherPrompt: "Does time stop when we stop the stopwatch, or do we only stop measuring?",
    focus: [
      "Seconds measure short amounts of time.",
      "Minutes are longer than seconds.",
      "A stopwatch starts and stops measurement, not time.",
      "Every recorded answer needs a number and the unit seconds."
    ],
    clockLabels: [
      "1 sec",
      "5 sec",
      "40 sec"
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
      studentPrompt: "Part 1 explores seconds as a unit of time: students watch 1 second, 5 seconds, and 40 seconds on a stopwatch, then time short partner activities.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 13-23. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Students learn that time is continuous: the stopwatch can start and stop measuring, but time keeps moving forward.",
      teacherEditionBasis: "Concept Development Part 3 and Student Debrief: use the word continuous to explain why time does not stop when the stopwatch stops.",
      visualModel: "clock"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problems 1-4 each have one sentence blank for a measured number of seconds. Problem 3 also needs ten animal names. Problem 5 is a six-row activity chart. Problem 6 is a relay table with runner times and total time.",
      teacherEditionBasis: "Module 2 Teacher Edition, Lesson 1 Problem Set pages 19-20.",
      visualModel: "clock"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Blank mode keeps the official stopwatch blanks open. Solved mode does not invent fixed times; it checks that each required timing entry is measured, labeled in seconds, and totaled when the relay asks for a total.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 13-23.",
      visualModel: "clock"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "The Answer Key marks all six Problem Set answers as variable. The evidence is complete stopwatch data, seconds labels, and a correct total for the relay.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 13-23. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: compare short activity times, explain why Problem 5 activities did not take long, distinguish seconds from minutes, and use continuous to explain that time keeps going.",
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
        value: "Part 1 explores seconds as a unit of time: students watch 1 second, 5 seconds, and 40 seconds on a stopwatch, then time short partner activities."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Concept Development Part 3 and Student Debrief: use the word continuous to explain why time does not stop when the stopwatch stops."
      },
      {
        label: "Source text",
        value: "Students learn that time is continuous: the stopwatch can start and stop measuring, but time keeps moving forward."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, Lesson 1 Problem Set pages 19-20."
      },
      {
        label: "Source text",
        value: "Problems 1-4 each have one sentence blank for a measured number of seconds. Problem 3 also needs ten animal names. Problem 5 is a six-row activity chart. Problem 6 is a relay table with runner times and total time."
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
        value: "Blank mode keeps the official stopwatch blanks open. Solved mode does not invent fixed times; it checks that each required timing entry is measured, labeled in seconds, and totaled when the relay asks for a total."
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
        value: "The Answer Key marks all six Problem Set answers as variable. The evidence is complete stopwatch data, seconds labels, and a correct total for the relay."
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
        value: "Debrief focus: compare short activity times, explain why Problem 5 activities did not take long, distinguish seconds from minutes, and use continuous to explain that time keeps going."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 1 Problem Set."
      }
    ]
  }
};
