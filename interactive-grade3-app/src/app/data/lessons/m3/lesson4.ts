import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON4_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "decompose",
    "division",
    "quotient",
    "factor"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 4 animation: make the next ten while counting by six",
    context: "The Teacher Edition breaks each added 6 into the part that reaches the next ten and the part left over. The count continues from 6 through 60.",
    equation: "18 + 6 = 18 + 2 + 4 = 24",
    teacherPrompt: "With a partner, list the related division facts for each number in the skip-counting sequence in Problem 1",
    focus: [
      "decompose",
      "division",
      "array",
      "source labels"
    ],
    groupCount: 6,
    groupSize: 10,
    rowCount: 6,
    columnCount: 10,
    tapePartCount: 6,
    tapePartLabel: "10",
    tapeWholeLabel: "60 total",
    firstPart: 3,
    secondPart: 3,
    countByMakeTen: {
      unit: 6,
      values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
      examples: [
        { start: 18, bridgePart: 2, leftoverPart: 4, result: 24 },
        { start: 36, bridgePart: 4, leftoverPart: 2, result: 42 },
        { start: 48, bridgePart: 2, leftoverPart: 4, result: 54 }
      ]
    },
    conceptSteps: [
      { label: "Add one six", action: "Move to the next multiple of 6 in the count-by sequence.", result: "The sequence is 6, 12, 18, 24, ... , 60." },
      { label: "Make the next ten", action: "Break 6 into the part that reaches a ten and the leftover part.", result: "For 18 + 6, use 2 + 4: 18 + 2 + 4 = 24." },
      { label: "Name related facts", action: "Connect the count position and total to multiplication and division.", result: "Seven sixes is 42, so 7 x 6 = 42 and 42 divided by 6 = 7." }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 4: source objective",
      shortTitle: "Goal",
      studentPrompt: "Count by units of 6 to multiply and divide using number bonds to decompose.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 51-61. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Use number bonds to decompose and skip-count using units of 6. T: Some of you may have skip-counted by six to get the answer to Marshall's problem. When we're skip-counting by six, how do we get the next number in our sequence? S: Add 6. T: Like this? (Write 6 + 6 = 12.) T: Think back to our Fluency Practice today. What number should I add to 6 to make 10? S: 4. T: Write my equation on your board.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 51-61. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "With a partner, list the related division facts for each number in the skip-counting sequence in Problem 1",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 4 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 3 Lesson 4 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 3 student workbook, Lesson 4 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 4 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 51-61.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 51-61. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 4 objective: Count by units of 6 to multiply and divide using number bonds to decompose.",
      teacherEditionBasis: "Module 3 Teacher Edition, lesson pages 51-61.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 51-61. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Count by units of 6 to multiply and divide using number bonds to decompose."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 51-61. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Use number bonds to decompose and skip-count using units of 6. T: Some of you may have skip-counted by six to get the answer to Marshall's problem. When we're skip-counting by six, how do we get the next number in our sequence? S: Add 6. T: Like this? (Write 6 + 6 = 12.) T: Think back to our Fluency Practice today. What number should I add to 6 to make 10? S: 4. T: Write my equation on your board."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 4 Problem Set using the official Module 3 multiplication, division, pattern, and word-problem models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "With a partner, list the related division facts for each number in the skip-counting sequence in Problem 1"
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 3 student workbook, Lesson 4 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 3 Lesson 4 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 51-61."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 4 Problem Set workspace and source-backed arithmetic visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf, pages 51-61. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 3 Teacher Edition, lesson pages 51-61."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, equations, patterns, and answers to the Lesson 4 objective: Count by units of 6 to multiply and divide using number bonds to decompose."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 4 Problem Set."
      }
    ]
  }
};
