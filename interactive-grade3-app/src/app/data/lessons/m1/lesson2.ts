import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON2_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "array",
    "equal groups",
    "multiplication"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 2 animation: rows and columns in an array",
    context: "Build a 3-row by 4-column array so rows, columns, factors, and total are all visible.",
    equation: "3 x 4 = 12",
    teacherPrompt: "Which factor names the rows, and which factor names the number in each row?",
    groupCount: 3,
    groupSize: 4,
    rowCount: 3,
    columnCount: 4,
    tapePartCount: 3,
    tapePartLabel: "4",
    tapeWholeLabel: "12 total",
    focus: [
      "Rows",
      "Columns",
      "Array as equal groups"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 2: source objective",
      shortTitle: "Goal",
      studentPrompt: "Relate multiplication to the array model.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 34-48. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "than horizontal, as shown below. When reviewing the concept, have students trace a row on the array with T: Look back at Jordan's lemons. Compare the way his a finger while saying the word row. lemons are organized with the groups of 3 circles on Provide a real-world example by having your template.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 34-48. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "In Problems 5 and 6, how do the arrays represent equal groups?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 2 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: a. How many rows of cars are there? ____ b. How many cars are there in each row? ____ Problem 2: a. What is the number of rows? ____ b. What is the number of objects in each row? ____ Problem 3: a. There are 4 spoons in each row. How many spoons are in 2 rows? ____ b. Write a multiplication expression to describe the array. ____",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 2 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 2 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 34-48.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 34-48. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 2 objective: Relate multiplication to the array model.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 34-48.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 34-48. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Relate multiplication to the array model."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 2 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 34-48. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "than horizontal, as shown below. When reviewing the concept, have students trace a row on the array with T: Look back at Jordan's lemons. Compare the way his a finger while saying the word row. lemons are organized with the groups of 3 circles on Provide a real-world example by having your template."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 2 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 2 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "In Problems 5 and 6, how do the arrays represent equal groups?"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 2 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 2 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: a. How many rows of cars are there? ____ b. How many cars are there in each row? ____ Problem 2: a. What is the number of rows? ____ b. What is the number of objects in each row? ____ Problem 3: a. There are 4 spoons in each row. How many spoons are in 2 rows? ____ b. Write a multiplication expression to describe the array. ____"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 2 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 34-48."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 2 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 2 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 34-48. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 2 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 34-48."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 2 objective: Relate multiplication to the array model."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 2 Problem Set."
      }
    ]
  }
};
