import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M5_LESSON21_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "equivalent fractions",
    "fraction",
    "whole",
    "number line"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Lesson 21 animation: Recognize and show that equivalent fractions refer to the same point on the number line.",
    context: "Use the Teacher Edition Lesson 21 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
    equation: "4 to 24 on equal intervals of 5",
    teacherPrompt: "How does the official fraction model show recognize and show that equivalent fractions refer to the same point on the number line.?",
    focus: [
      "equivalent fractions",
      "fraction",
      "number line",
      "source labels"
    ],
    numberLineLabels: [
      "4",
      "9",
      "14",
      "19",
      "24"
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
      title: "Lesson 21: source objective",
      shortTitle: "Goal",
      studentPrompt: "Recognize and show that equivalent fractions refer to the same point on the number line.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 245-254. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 21 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 245-254. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "After students have checked their work for Problems 4 and 5, ask them to use the fraction strips in their math journals to see if they can 3 name another equivalent fraction.",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 21 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition.",
      visualModel: "number-line"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 5 Lesson 21 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 5 student workbook, Lesson 21 Problem Set.",
      visualModel: "number-line"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 21 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 245-254.",
      visualModel: "number-line"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 245-254. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 21 objective: Recognize and show that equivalent fractions refer to the same point on the number line.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 245-254.",
      visualModel: "number-line"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 245-254. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Recognize and show that equivalent fractions refer to the same point on the number line."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 245-254. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 21 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 21 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "After students have checked their work for Problems 4 and 5, ask them to use the fraction strips in their math journals to see if they can 3 name another equivalent fraction."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 5 student workbook, Lesson 21 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 5 Lesson 21 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 245-254."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 21 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 245-254. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 245-254."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 21 objective: Recognize and show that equivalent fractions refer to the same point on the number line."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 21 Problem Set."
      }
    ]
  }
};
