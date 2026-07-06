import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M5_LESSON20_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "equivalent fractions",
    "whole"
  ],
  lessonAnimation: {
    kind: "fraction-strip",
    title: "Lesson 20 animation: Recognize and show that equivalent fractions have the same size, though not necessarily the same shape.",
    context: "Use the Teacher Edition Lesson 20 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
    equation: "2/4; name the whole before naming the fraction",
    teacherPrompt: "How does the official fraction model show recognize and show that equivalent fractions have the same size, though not necessarily the same shape.?",
    focus: [
      "equivalent fractions",
      "whole",
      "fraction strip",
      "source labels"
    ],
    fractionPartCount: 4,
    fractionShadedCount: 2
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 20: source objective",
      shortTitle: "Goal",
      studentPrompt: "Recognize and show that equivalent fractions have the same size, though not necessarily the same shape.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 234-244. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 20 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 234-244. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Invite students to share their models for Problems 2(a) expectations for explaining their and 2(b). Although answers will vary, students should reasoning clearly with evidence. MP.6 consistently represent equivalent fractions for each question.",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 20 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 5 Lesson 20 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 5 student workbook, Lesson 20 Problem Set.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 20 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 234-244.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 234-244. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "fraction-strip"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 20 objective: Recognize and show that equivalent fractions have the same size, though not necessarily the same shape.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 234-244.",
      visualModel: "fraction-strip"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 234-244. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Recognize and show that equivalent fractions have the same size, though not necessarily the same shape."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 234-244. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 20 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 20 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Invite students to share their models for Problems 2(a) expectations for explaining their and 2(b). Although answers will vary, students should reasoning clearly with evidence. MP.6 consistently represent equivalent fractions for each question."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 5 student workbook, Lesson 20 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 5 Lesson 20 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 234-244."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 20 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 234-244. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 20 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 234-244."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 20 objective: Recognize and show that equivalent fractions have the same size, though not necessarily the same shape."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 20 Problem Set."
      }
    ]
  }
};
