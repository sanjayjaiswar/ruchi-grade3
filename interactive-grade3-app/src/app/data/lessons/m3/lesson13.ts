import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON13_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "factor",
    "product",
    "multiplication",
    "array"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 13 animation: Identify and use arithmetic patterns to multiply.",
    context: "Part 1: Identify patterns in multiples of 9.",
    equation: "9 x 10 = (5 x 10) + (4 x 10)",
    teacherPrompt: "During the fluency activity, we group counted nines to say the multiples of 9. When we skip-count by nines, what are we adding each time?",
    focus: [
      "factor",
      "product",
      "array",
      "source labels"
    ],
    groupCount: 9,
    groupSize: 10,
    rowCount: 9,
    columnCount: 10,
    tapePartCount: 9,
    tapePartLabel: "10",
    tapeWholeLabel: "90 total",
    firstPart: 5,
    secondPart: 4
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 13: source objective",
      shortTitle: "Goal",
      studentPrompt: "Identify and use arithmetic patterns to multiply.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 164-175. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Identify patterns in multiples of 9. T: During the fluency activity, we group counted nines to say the multiples of 9. When we skip-count by nines, what are we adding each time? S: 9. T: Adding nines can be tricky. What's a simplifying strategy for adding 9? S: I can break apart 9 to make the next ten and then add what's left of the 9 to it. -> I can add 10 and then subtract 1.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 164-175. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "During the fluency activity, we group counted nines to say the multiples of 9. When we skip-count by nines, what are we adding each time?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 13 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 13 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 13 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 13 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 164-175.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 164-175. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 13 objective: Identify and use arithmetic patterns to multiply.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 164-175.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 164-175. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Identify and use arithmetic patterns to multiply."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 164-175. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Identify patterns in multiples of 9. T: During the fluency activity, we group counted nines to say the multiples of 9. When we skip-count by nines, what are we adding each time? S: 9. T: Adding nines can be tricky. What's a simplifying strategy for adding 9? S: I can break apart 9 to make the next ten and then add what's left of the 9 to it. -> I can add 10 and then subtract 1."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 13 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "During the fluency activity, we group counted nines to say the multiples of 9. When we skip-count by nines, what are we adding each time?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 13 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 13 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 164-175."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 13 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 164-175. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 164-175."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 13 objective: Identify and use arithmetic patterns to multiply."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 13 Problem Set."
      }
    ]
  }
};
