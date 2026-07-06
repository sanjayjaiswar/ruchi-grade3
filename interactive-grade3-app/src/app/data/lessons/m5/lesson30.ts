import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M5_LESSON30_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "number line"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Lesson 30 animation: Partition various wholes precisely into equal parts using a number line method.",
    context: "Use the Teacher Edition Lesson 30 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
    equation: "0 to 20 on equal intervals of 5",
    teacherPrompt: "How does the official fraction model show partition various wholes precisely into equal parts using a number line method.?",
    focus: [
      "number line",
      "source labels"
    ],
    numberLineLabels: [
      "0",
      "5",
      "10",
      "15",
      "20"
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
      title: "Lesson 30: source objective",
      shortTitle: "Goal",
      studentPrompt: "Partition various wholes precisely into equal parts using a number line method.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 352-359. Lesson 30 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 30 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 352-359. Lesson 30 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "(Possibly present a meter strip.) Could we use this method to partition strips of any length? Talk to your partner about how we could partition this longer strip. Model partitioning the meter strip by using the same method.",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 30 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition.",
      visualModel: "number-line"
    },
    {
      id: "source-picture",
      title: "Student workbook Homework",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 5 Lesson 30 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 5 student workbook, Lesson 30 Homework.",
      visualModel: "number-line"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 30 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 352-359.",
      visualModel: "number-line"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 352-359. Lesson 30 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 30 objective: Partition various wholes precisely into equal parts using a number line method.",
      teacherEditionBasis: "Module 5 Teacher Edition, lesson pages 352-359.",
      visualModel: "number-line"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 352-359. Lesson 30 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Partition various wholes precisely into equal parts using a number line method."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 30 Homework."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 352-359. Lesson 30 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 30 fraction model to connect the official whole, partitions, unit fractions, number line, and answer evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 30 Homework."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 30 Problem Set using the official Module 5 fraction, whole, strip, area model, and number-line structures from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "(Possibly present a meter strip.) Could we use this method to partition strips of any length? Talk to your partner about how we could partition this longer strip. Model partitioning the meter strip by using the same method."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 30 Homework."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 5 student workbook, Lesson 30 Homework."
      },
      {
        label: "Source text",
        value: "Use the official Module 5 Lesson 30 Problem Set prompts in order. Blank mode preserves the student-facing fraction model/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 30 Homework."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 352-359."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 30 Problem Set workspace and source-backed fraction visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 30 Homework."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf, pages 352-359. Lesson 30 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 30 Homework."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 5 Teacher Edition, lesson pages 352-359."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set fraction models, unit intervals, partitions, comparisons, and answers to the Lesson 30 objective: Partition various wholes precisely into equal parts using a number line method."
      },
      {
        label: "Workbook",
        value: "Module 5 student workbook, Lesson 30 Homework."
      }
    ]
  }
};
