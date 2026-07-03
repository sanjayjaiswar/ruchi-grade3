import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON18_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "distributive property",
    "decompose",
    "array"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 18 animation: decompose units with the distributive property",
    context: "Show 8 rows of 5, split into 5 rows and 3 rows, and add the products.",
    equation: "8 x 5 = (5 x 5) + (3 x 5) = 40",
    teacherPrompt: "Why is this decomposition useful?",
    groupCount: 8,
    groupSize: 5,
    rowCount: 8,
    columnCount: 5,
    tapePartCount: 8,
    tapePartLabel: "5",
    tapeWholeLabel: "40 total",
    firstPart: 5,
    secondPart: 3,
    focus: [
      "Decompose units",
      "Friendly facts",
      "Combine products"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 18: source objective",
      shortTitle: "Goal",
      studentPrompt: "Apply the distributive property to decompose units.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 234-244. Lesson 18 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use number bonds to decompose numbers and apply the distributive property. Project an array for 7 x 3 with a line drawn as shown. Write 7 x 3 next to the array. T: How many threes? S: 7 threes. T: The dotted line shows a way to break apart the array. Sample Teacher Board The 7 threes are broken into...? S: 5 threes and 2 threes. T: Let's draw our number bonds.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 234-244. Lesson 18 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Compare the number bond and array models for showing the break apart and distribute strategy",
      teacherEditionBasis: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: 8 x 10 = ____ Problem 2: 7 x 4 = ____ 8 7 tens fours 5 5 tens fours 5 tens + ____ = 8 tens 5 fours + ____ = 7 fours (5 x 10) + (____ x 10) = 8 x 10 (5 x 4) + (____ x 4) = 7 x 4 50 + ____ = ____ 20 + ____ = ____ 8 x 10 = ____ 7 x 4 = ____ Problem 3: 9 x 10 = ____",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 18 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 234-244.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 234-244. Lesson 18 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (9 minutes) Sprint: Add or Subtract Using 5 2.NBT.5 (9 minutes) Sprint: Add or Subtract Using 5 (9 minutes) Materials: (S) Add or Subtract using 5 Sprint Note: This activity builds a foundation for multiplication using units of 5 through reviewing skip-counting from Grade 2. See Lesson 2 for the directions for administering a Sprint. Between Sprints, include the following group counts in place of movement exercises. Count by threes to 30, think/talk forward and backward. Count by sixes to 30, forward and backward. Count by fours to 40,...",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 234-244.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 234-244. Lesson 18 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Apply the distributive property to decompose units."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 18 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 234-244. Lesson 18 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use number bonds to decompose numbers and apply the distributive property. Project an array for 7 x 3 with a line drawn as shown. Write 7 x 3 next to the array. T: How many threes? S: 7 threes. T: The dotted line shows a way to break apart the array. Sample Teacher Board The 7 threes are broken into...? S: 5 threes and 2 threes. T: Let's draw our number bonds."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 18 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
      },
      {
        label: "Source text",
        value: "Compare the number bond and array models for showing the break apart and distribute strategy"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 18 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 18 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: 8 x 10 = ____ Problem 2: 7 x 4 = ____ 8 7 tens fours 5 5 tens fours 5 tens + ____ = 8 tens 5 fours + ____ = 7 fours (5 x 10) + (____ x 10) = 8 x 10 (5 x 4) + (____ x 4) = 7 x 4 50 + ____ = ____ 20 + ____ = ____ 8 x 10 = ____ 7 x 4 = ____ Problem 3: 9 x 10 = ____"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 18 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 234-244."
      },
      {
        label: "Source text",
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 18 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 234-244. Lesson 18 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 18 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 234-244."
      },
      {
        label: "Source text",
        value: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (9 minutes) Sprint: Add or Subtract Using 5 2.NBT.5 (9 minutes) Sprint: Add or Subtract Using 5 (9 minutes) Materials: (S) Add or Subtract using 5 Sprint Note: This activity builds a foundation for multiplication using units of 5 through reviewing skip-counting from Grade 2. See Lesson 2 for the directions for administering a Sprint. Between Sprints, include the following group counts in place of movement exercises. Count by threes to 30, think/talk forward and backward. Count by sixes to 30, forward and backward. Count by fours to 40,..."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 18 Problem Set."
      }
    ]
  }
};
