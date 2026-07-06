import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M5_LESSON19_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "fraction",
    "whole",
    "number line"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Lesson 19 animation: Understand distance and position on the number line as strategies for comparing fractions.",
    context: "Use the Teacher Edition Lesson 19 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
    equation: "2 to 14 on equal intervals of 3",
    teacherPrompt: "How does the official fraction model show understand distance and position on the number line as strategies for comparing fractions.?",
    focus: [
      "fraction",
      "whole",
      "number line",
      "source labels"
    ],
    numberLineLabels: [
      "2",
      "5",
      "8",
      "11",
      "14"
    ],
    numberLineJumps: [
      "+3",
      "+3",
      "+3"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 19: source objective",
      shortTitle: "Goal",
      studentPrompt: "Understand distance and position on the number line as strategies for comparing fractions.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 221-233. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 19 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 221-233. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Invite students to share their work on Problems 3-5. Students should have slightly different explanations for Problems 4 and 5. Invite a variety of responses so that both explanations are heard",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 19 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition.",
      visualModel: "number-line"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 5 Lesson 19 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 5 student workbook, Lesson 19 Problem Set.",
      visualModel: "number-line"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 19 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 221-233.",
      visualModel: "number-line"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 221-233. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 19 objective: Understand distance and position on the number line as strategies for comparing fractions.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 221-233.",
      visualModel: "number-line"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 221-233. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Understand distance and position on the number line as strategies for comparing fractions."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 221-233. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 19 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 19 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Invite students to share their work on Problems 3-5. Students should have slightly different explanations for Problems 4 and 5. Invite a variety of responses so that both explanations are heard"
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 5 student workbook, Lesson 19 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 5 Lesson 19 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 221-233."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 19 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 221-233. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 221-233."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 19 objective: Understand distance and position on the number line as strategies for comparing fractions."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 19 Problem Set."
      }
    ]
  }
};
