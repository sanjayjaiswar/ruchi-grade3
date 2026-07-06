import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M5_LESSON27_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [],
  lessonAnimation: {
    kind: "fraction-strip",
    title: "Lesson 27 animation: Explain equivalence by manipulating units and reasoning about their size.",
    context: "Use the Teacher Edition Lesson 27 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
    equation: "2/8; name the whole before naming the fraction",
    teacherPrompt: "How does the official fraction model show explain equivalence by manipulating units and reasoning about their size.?",
    focus: [
      "fraction strip",
      "source labels"
    ],
    fractionPartCount: 8,
    fractionShadedCount: 2
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 27: source objective",
      shortTitle: "Goal",
      studentPrompt: "Explain equivalence by manipulating units and reasoning about their size.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 316-328. Lesson 27 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 27 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 316-328. Lesson 27 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How did using the fraction strips help you with Problem 2? Talk about the relationship between them",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 27 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 5 Lesson 27 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 5 student workbook, Lesson 27 Problem Set.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 27 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 316-328.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 316-328. Lesson 27 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 27 objective: Explain equivalence by manipulating units and reasoning about their size.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 316-328.",
      visualModel: "fraction-strip"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 316-328. Lesson 27 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Explain equivalence by manipulating units and reasoning about their size."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 27 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 316-328. Lesson 27 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 27 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 27 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 27 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "How did using the fraction strips help you with Problem 2? Talk about the relationship between them"
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 27 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 5 student workbook, Lesson 27 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 5 Lesson 27 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 27 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 316-328."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 27 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 27 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 316-328. Lesson 27 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 27 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 316-328."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 27 objective: Explain equivalence by manipulating units and reasoning about their size."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 27 Problem Set."
      }
    ]
  }
};
