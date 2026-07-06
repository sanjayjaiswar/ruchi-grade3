import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON5_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "decompose",
    "division",
    "quotient",
    "factor"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 5 animation: Count by units of 7 to multiply and divide using number bonds to decompose.",
    context: "Problem by skip-counting by four 7 times.",
    equation: "7 x 4 = (4 x 4) + (3 x 4)",
    teacherPrompt: "Take turns with a partner reading the multiplication facts in Problem 1 and the related division facts",
    focus: [
      "decompose",
      "division",
      "array",
      "source labels"
    ],
    groupCount: 7,
    groupSize: 4,
    rowCount: 7,
    columnCount: 4,
    tapePartCount: 7,
    tapePartLabel: "4",
    tapeWholeLabel: "28 total",
    firstPart: 4,
    secondPart: 3
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 5: source objective",
      shortTitle: "Goal",
      studentPrompt: "Count by units of 7 to multiply and divide using number bonds to decompose.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 62-72. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Problem by skip-counting by four 7 times. Is there skip-count. another count-by strategy that could be used to solve Depending on each learner's needs, this problem? give explicit prompts for every step of S: Skip-count by seven 4 times. the make ten strategy to count by seven 4 times. Alternatively, scaffold T: Let's show that work on our boards. Write 7 on your with a checklist or template. board.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 62-72. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Take turns with a partner reading the multiplication facts in Problem 1 and the related division facts",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 5 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 5 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 5 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 5 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 62-72.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 62-72. Lesson 5 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 5 objective: Count by units of 7 to multiply and divide using number bonds to decompose.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 62-72.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 62-72. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Count by units of 7 to multiply and divide using number bonds to decompose."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 62-72. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Problem by skip-counting by four 7 times. Is there skip-count. another count-by strategy that could be used to solve Depending on each learner's needs, this problem? give explicit prompts for every step of S: Skip-count by seven 4 times. the make ten strategy to count by seven 4 times. Alternatively, scaffold T: Let's show that work on our boards. Write 7 on your with a checklist or template. board."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 5 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Take turns with a partner reading the multiplication facts in Problem 1 and the related division facts"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 5 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 5 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 62-72."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 5 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 62-72. Lesson 5 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 5 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 62-72."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 5 objective: Count by units of 7 to multiply and divide using number bonds to decompose."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 5 Problem Set."
      }
    ]
  }
};
