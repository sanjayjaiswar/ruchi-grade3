import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON3_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "factor",
    "array"
  ],
  lessonAnimation: {
    kind: "equal-groups",
    title: "Lesson 3 animation: interpret both factors",
    context: "Show 4 groups of 3 and pause on each factor before naming the total.",
    equation: "4 groups of 3 = 12",
    teacherPrompt: "Does this factor tell the number of groups or the size of each group?",
    groupCount: 4,
    groupSize: 3,
    rowCount: 4,
    columnCount: 3,
    tapePartCount: 4,
    tapePartLabel: "3",
    tapeWholeLabel: "12 total",
    focus: [
      "Number of groups",
      "Size of each group",
      "Meaning before product"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 3: source objective",
      shortTitle: "Goal",
      studentPrompt: "Interpret the meaning of factors: the size of the group or the number of groups.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 49-60. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "T: At the signal, tell how many equal groups we've made. (Signal.) S: 4 equal groups. T: (Write 4 x ___ = ___.) At the signal, tell the size of each group. (Signal.) Students transition back to their seats. numbers (the parts) make up larger T: Use the multiplication equation on the board to draw numbers (the whole). (Excerpted from an array. Make sure that your board is vertical.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 49-60. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Why do you think I started the lesson by asking you to divide yourselves into equal groups in the corners of the room?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 3 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: There are 5 flowers in each bunch. How many flowers are in 4 bunches? a. Number of groups: ____ Size of each group: ____ b. 4 x 5 = ____ c. There are ____ flowers altogether. Problem 2: There are ____ candies in each box. How many candies are in 6 boxes? a. Number of groups: ____ Size of each group: ____ b. 6 x ____ = ____ c. There are ____ candies altogether. Problem 3: There are 4 oranges in each row. How many oranges are there in ____ rows? a. Number of rows: ____ Size of each row: ____ b. ____ x 4 = ____ c. There are ____ oranges altogether. of groups.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 3 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 3 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 49-60.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 49-60. Lesson 3 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 3 objective: Interpret the meaning of factors: the size of the group or the number of groups.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 49-60.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 49-60. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Interpret the meaning of factors: the size of the group or the number of groups."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 3 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 49-60. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "T: At the signal, tell how many equal groups we've made. (Signal.) S: 4 equal groups. T: (Write 4 x ___ = ___.) At the signal, tell the size of each group. (Signal.) Students transition back to their seats. numbers (the parts) make up larger T: Use the multiplication equation on the board to draw numbers (the whole). (Excerpted from an array. Make sure that your board is vertical."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 3 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 3 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Why do you think I started the lesson by asking you to divide yourselves into equal groups in the corners of the room?"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 3 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 3 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: There are 5 flowers in each bunch. How many flowers are in 4 bunches? a. Number of groups: ____ Size of each group: ____ b. 4 x 5 = ____ c. There are ____ flowers altogether. Problem 2: There are ____ candies in each box. How many candies are in 6 boxes? a. Number of groups: ____ Size of each group: ____ b. 6 x ____ = ____ c. There are ____ candies altogether. Problem 3: There are 4 oranges in each row. How many oranges are there in ____ rows? a. Number of rows: ____ Size of each row: ____ b. ____ x 4 = ____ c. There are ____ oranges altogether. of groups."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 3 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 49-60."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 3 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 3 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 49-60. Lesson 3 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 3 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 49-60."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 3 objective: Interpret the meaning of factors: the size of the group or the number of groups."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 3 Problem Set."
      }
    ]
  }
};
