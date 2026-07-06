import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON8_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "array"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 8 animation: Understand the function of parentheses and apply to solving problems.",
    context: "Part 1: Solve equations containing parentheses.",
    equation: "2 x 6 = 12",
    teacherPrompt: "How does the official Problem Set model show understand the function of parentheses and apply to solving problems.?",
    focus: [
      "array",
      "source labels"
    ],
    groupCount: 2,
    groupSize: 6,
    rowCount: 2,
    columnCount: 6,
    tapePartCount: 2,
    tapePartLabel: "6",
    tapeWholeLabel: "12 total"
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 8: source objective",
      shortTitle: "Goal",
      studentPrompt: "Understand the function of parentheses and apply to solving problems.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 97-107. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Solve equations containing parentheses. T: The two equations used to solve the Application Problem are 2 x 6 = 12 and 12 - 2 = 10. (Show picture to the right.) This picture shows both. Talk to your partner: How could we include all of this information in one equation? S: We can rewrite them as one equation. Maybe 2 x 6 - 2 = 10? T: Let's check to make sure the new equation equals 10.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 97-107. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Look at Problem 1(j). Would the answer be the same if I solved (12 divided by 2) + (12 divided by 4)? Why not? (Lead students to understand that they cannot distribute in this problem.)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 8 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 8 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 8 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 8 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 97-107.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 97-107. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 8 objective: Understand the function of parentheses and apply to solving problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 97-107.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 97-107. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Understand the function of parentheses and apply to solving problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 97-107. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Solve equations containing parentheses. T: The two equations used to solve the Application Problem are 2 x 6 = 12 and 12 - 2 = 10. (Show picture to the right.) This picture shows both. Talk to your partner: How could we include all of this information in one equation? S: We can rewrite them as one equation. Maybe 2 x 6 - 2 = 10? T: Let's check to make sure the new equation equals 10."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 8 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Look at Problem 1(j). Would the answer be the same if I solved (12 divided by 2) + (12 divided by 4)? Why not? (Lead students to understand that they cannot distribute in this problem.)"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 8 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 8 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 97-107."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 8 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 97-107. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 97-107."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 8 objective: Understand the function of parentheses and apply to solving problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 8 Problem Set."
      }
    ]
  }
};
