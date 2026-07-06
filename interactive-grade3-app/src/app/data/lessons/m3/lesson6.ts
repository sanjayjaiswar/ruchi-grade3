import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON6_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "distributive property",
    "division",
    "quotient",
    "factor"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 6 animation: Use the distributive property as a strategy to multiply and divide using units of 6 and 7.",
    context: "Part 1: Apply the distributive property to multiply using units of 6 and 7.",
    equation: "6 x 7 = (3 x 7) + (3 x 7)",
    teacherPrompt: "How does the official Problem Set model show use the distributive property as a strategy to multiply and divide using units of 6 and 7.?",
    focus: [
      "distributive property",
      "division",
      "array",
      "source labels"
    ],
    groupCount: 6,
    groupSize: 7,
    rowCount: 6,
    columnCount: 7,
    tapePartCount: 6,
    tapePartLabel: "7",
    tapeWholeLabel: "42 total",
    firstPart: 3,
    secondPart: 3
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 6: source objective",
      shortTitle: "Goal",
      studentPrompt: "Use the distributive property as a strategy to multiply and divide using units of 6 and 7.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 73-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Apply the distributive property to multiply using units of 6 and 7. T: We used 9 x 7 to solve the Application Problem. Say 9 x 7 in unit form. S: 9 sevens. T: Model 9 x 7 using a tape diagram. Then, write the fact under the diagram. (Allow students time to work.) T: Recently, we used the break apart and distribute strategy to help solve larger multiplication facts. Discuss with your partner.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 73-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "What pattern did you notice in Problems 1(a) through 1(d)? What multiplication fact is used in all of these problems? How does this fact help you solve these problems?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 6 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 6 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 6 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 6 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 73-84.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 73-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 6 objective: Use the distributive property as a strategy to multiply and divide using units of 6 and 7.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 73-84.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 73-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the distributive property as a strategy to multiply and divide using units of 6 and 7."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 73-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Apply the distributive property to multiply using units of 6 and 7. T: We used 9 x 7 to solve the Application Problem. Say 9 x 7 in unit form. S: 9 sevens. T: Model 9 x 7 using a tape diagram. Then, write the fact under the diagram. (Allow students time to work.) T: Recently, we used the break apart and distribute strategy to help solve larger multiplication facts. Discuss with your partner."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 6 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "What pattern did you notice in Problems 1(a) through 1(d)? What multiplication fact is used in all of these problems? How does this fact help you solve these problems?"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 6 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 6 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 73-84."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 6 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 73-84. Lesson 6 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 73-84."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 6 objective: Use the distributive property as a strategy to multiply and divide using units of 6 and 7."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 6 Problem Set."
      }
    ]
  }
};
