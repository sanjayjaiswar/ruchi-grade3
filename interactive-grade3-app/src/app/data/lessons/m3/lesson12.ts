import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON12_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "distributive property",
    "factor",
    "product",
    "multiplication"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 12 animation: Apply the distributive property and the fact 9 = 10 - 1 as a strategy to multiply.",
    context: "Template Use the 9 = 10 – 1 strategy to solve 9 x n facts.",
    equation: "9 x 10 = (5 x 10) + (4 x 10)",
    teacherPrompt: "How does the official Problem Set model show apply the distributive property and the fact 9 = 10 - 1 as a strategy to multiply.?",
    focus: [
      "distributive property",
      "factor",
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
      title: "Lesson 12: source objective",
      shortTitle: "Goal",
      studentPrompt: "Apply the distributive property and the fact 9 = 10 - 1 as a strategy to multiply.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 150-163. Lesson 12 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Template Use the 9 = 10 - 1 strategy to solve 9 x n facts. Have students insert templates into their personal white boards. T: We solved 8 x 9 in the Application Problem. Does 8 x 9 show 8 units of 9 or 9 units of 8? S: 8 units of 9. T: What multiplication fact represents 9 units of 8? S: 9 x 8. T: How can our work solving 8 x 9 help us solve 9 x 8?",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 150-163. Lesson 12 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "What does the nine represent in Problem 1? (It represents the value of each unit.) What does the nine represent in Problem 2? (It represents the number of units.)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 12 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 12 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 12 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 12 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 150-163.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 150-163. Lesson 12 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 12 objective: Apply the distributive property and the fact 9 = 10 - 1 as a strategy to multiply.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 150-163.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 150-163. Lesson 12 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Apply the distributive property and the fact 9 = 10 - 1 as a strategy to multiply."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 150-163. Lesson 12 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Template Use the 9 = 10 - 1 strategy to solve 9 x n facts. Have students insert templates into their personal white boards. T: We solved 8 x 9 in the Application Problem. Does 8 x 9 show 8 units of 9 or 9 units of 8? S: 8 units of 9. T: What multiplication fact represents 9 units of 8? S: 9 x 8. T: How can our work solving 8 x 9 help us solve 9 x 8?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 12 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "What does the nine represent in Problem 1? (It represents the value of each unit.) What does the nine represent in Problem 2? (It represents the number of units.)"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 12 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 12 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 150-163."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 12 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 150-163. Lesson 12 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 150-163."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 12 objective: Apply the distributive property and the fact 9 = 10 - 1 as a strategy to multiply."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 12 Problem Set."
      }
    ]
  }
};
