import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON7_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "array",
    "commutative property"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 7 animation: one array, two facts",
    context: "Show a 2 by 8 array, then read it by rows and by columns to show commutativity.",
    equation: "2 x 8 = 16; 8 x 2 = 16",
    teacherPrompt: "What changed in the two equations, and what stayed the same?",
    groupCount: 2,
    groupSize: 8,
    rowCount: 2,
    columnCount: 8,
    tapePartCount: 2,
    tapePartLabel: "8",
    tapeWholeLabel: "16 total",
    focus: [
      "Same array",
      "Related facts",
      "Same product"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 7: source objective",
      shortTitle: "Goal",
      studentPrompt: "Demonstrate the commutativity of multiplication, and practice related",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 97-108. Lesson 7 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Rotate arrays 90 degrees. 6 T: Position your board so that the long side is horizontal. Draw an array that shows 4 rows of 2. 8 S: (Draw the array, as shown to the right.) T: Write a skip-count by twos to find the total. Then write a multiplication sentence where the first factor represents the number of rows.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 97-108. Lesson 7 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How did rotating our boards help us see rows as columns and columns as rows?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 7 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: a. Draw an array that shows 6 rows of 2. Problem 2: a. Draw an array that shows 2 rows of 6. b. Write a multiplication sentence where the first b. Write a multiplication sentence where the first factor represents the number of rows. factor represents the number of rows. ____ x ____ = ____ ____ x ____ = ____ Problem 3: a. Turn your paper to look at the arrays in Problems 1 and 2 in different ways. What is the same and what is different about them? b. Why are the factors in your multiplication sentences in a different order?",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 7 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 7 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 97-108.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 97-108. Lesson 7 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 7 objective: Demonstrate the commutativity of multiplication, and practice related",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 97-108.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 97-108. Lesson 7 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Demonstrate the commutativity of multiplication, and practice related"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 7 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 97-108. Lesson 7 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Rotate arrays 90 degrees. 6 T: Position your board so that the long side is horizontal. Draw an array that shows 4 rows of 2. 8 S: (Draw the array, as shown to the right.) T: Write a skip-count by twos to find the total. Then write a multiplication sentence where the first factor represents the number of rows."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 7 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 7 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "How did rotating our boards help us see rows as columns and columns as rows?"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 7 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 7 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: a. Draw an array that shows 6 rows of 2. Problem 2: a. Draw an array that shows 2 rows of 6. b. Write a multiplication sentence where the first b. Write a multiplication sentence where the first factor represents the number of rows. factor represents the number of rows. ____ x ____ = ____ ____ x ____ = ____ Problem 3: a. Turn your paper to look at the arrays in Problems 1 and 2 in different ways. What is the same and what is different about them? b. Why are the factors in your multiplication sentences in a different order?"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 7 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 97-108."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 7 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 7 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 97-108. Lesson 7 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 7 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 97-108."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 7 objective: Demonstrate the commutativity of multiplication, and practice related"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 7 Problem Set."
      }
    ]
  }
};
