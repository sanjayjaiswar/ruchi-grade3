import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON5_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "addend",
    "elapsed time",
    "number line"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Lesson 5 animation: Solve word problems involving time intervals within 1 h",
    context: "Part 1: Count forward and backward to add and subtract on the number line.",
    equation: "9:08 + 4 min = 9:12; 30 min − 12 min = 18 min",
    teacherPrompt: "Describe the process of drawing the number line for Problem 2. Explain how you labeled it. (Call on students who used different ways of thinking about a.",
    focus: [
      "addend",
      "elapsed time",
      "clock",
      "source labels"
    ],
    timeLineModel: {
      ariaLabel: "Carlos's arrival, homework, and morning-work intervals from 9:08 to 9:30",
      startLabel: "9:08 a.m.",
      endLabel: "9:30 a.m.",
      segments: [
        { from: "9:08", to: "9:12", minutes: 4, label: "homework +4", unit: "minutes", emphasis: "benchmark" },
        { from: "9:12", to: "9:30", minutes: 18, label: "morning work +18", unit: "minutes", emphasis: "unknown" }
      ],
      unknownCases: [
        { label: "Parts make a whole", known: "4 min + 18 min", unknown: "total available", equation: "4 + 18 = 22 min" },
        { label: "Whole minus part", known: "30 min − 12 min", unknown: "morning work", equation: "30 − 12 = 18 min" },
        { label: "Two known parts", known: "7 min + 18 min", unknown: "elapsed time", equation: "7 + 18 = 25 min" }
      ]
    },
    conceptSteps: [
      { label: "Plot known times", action: "Mark 9:08, 9:12, and 9:30 on one hour line.", result: "The intervals show Carlos's task parts." },
      { label: "Relate parts and whole", action: "Add known parts or subtract a known part from the whole.", result: "12 + 18 = 30 and 30 − 12 = 18 describe the same line." },
      { label: "Choose direction", action: "Count forward to find an end or backward to find a start or missing part.", result: "The number-line action matches the story unknown." }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 5: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solve word problems involving time intervals within 1 hour by adding and subtracting on the number line.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 61-74. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Count forward and backward to add and subtract on the number line. T: Use your number line template to label the points when Carlos arrives and when math starts. S: (Label.) T: Writing down homework assignments is the first thing Carlos does when he gets to class. It takes 4 minutes. Work with your partner to plot the point that shows when Carlos finishes this first task.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 61-74. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Describe the process of drawing the number line for Problem 2. Explain how you labeled it. (Call on students who used different ways of thinking about and labeling parts and wholes to share.)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 5 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "clock"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 5 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 5 Problem Set.",
      visualModel: "clock"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 5 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 61-74.",
      visualModel: "clock"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 61-74. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 5 objective: Solve word problems involving time intervals within 1 hour by adding and subtracting on the number line.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 61-74.",
      visualModel: "clock"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 61-74. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve word problems involving time intervals within 1 hour by adding and subtracting on the number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 61-74. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Count forward and backward to add and subtract on the number line. T: Use your number line template to label the points when Carlos arrives and when math starts. S: (Label.) T: Writing down homework assignments is the first thing Carlos does when he gets to class. It takes 4 minutes. Work with your partner to plot the point that shows when Carlos finishes this first task."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 5 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Describe the process of drawing the number line for Problem 2. Explain how you labeled it. (Call on students who used different ways of thinking about and labeling parts and wholes to share.)"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 5 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 5 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 61-74."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 5 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 61-74. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 61-74."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 5 objective: Solve word problems involving time intervals within 1 hour by adding and subtracting on the number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 5 Problem Set."
      }
    ]
  }
};
