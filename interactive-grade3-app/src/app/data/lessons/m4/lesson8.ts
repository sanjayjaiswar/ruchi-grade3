import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M4_LESSON8_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "area",
    "square unit",
    "factor",
    "product"
  ],
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 8: source objective",
      shortTitle: "Goal",
      studentPrompt: "Find the area of a rectangle through multiplication of the side lengths.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 92-115. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Relate side lengths to area. T: (Project image shown below.) How many rows are in the incomplete array?",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 92-115. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "In what way is the area of Problem 1(b) related to the area of Problem 1(a)? (It is double.) How could you use the side lengths to help you figure out that 8 x 7 is double 4 x 7?",
      teacherEditionBasis: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      visualModel: "area-model"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Write a multiplication equation to find the area of each rectangle. 6 ft a. b. 7 ft c. 7 ft 4 ft Area: ____ sq ft 6 ft Area: ____ sq ft 8 ft Area: ____ sq ft ____ x ____ = ____ ____ x ____ = ____ ____ x ____ = ____ Problem 2: Write a multiplication equation and a division equation to find the unknown side length for each rectangle. ____ ft ____ ft 4 ft a. b. c. 3 ft Area = 15 sq ft 9 ft Area = 72 sq ft ____ ft Area = 28 sq ft ____ x ____ = ____ ____ divided by ____ = ____ ____ x ____ = ____ ____ x ____ = ____ ____ divided by ____ = ____ ____ divided by ____ = ____ Problem 3: On the grid below, draw a rectangle that has an area of 42 square units. Label the side lengths. Ursa draws a rectangle that has side lengths of 9 centimeters and 6 centimeters. What is the area of the rectangle? Explain how you found your answer. 5. Eliza's bedroom measures 6 feet by 7 feet. Her brother's bedroom measures 5 feet by 8 feet. Eliza says their rooms have the same exact floor area. Is she...",
      teacherEditionBasis: "Module 4 student workbook, Lesson 8 Problem Set.",
      visualModel: "area-model"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      teacherEditionBasis: "Module 4 Teacher Edition, lesson pages 92-115.",
      visualModel: "area-model"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 92-115. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (11 minutes) Multiply by 6 3.OA.7 (8 minutes) Group Counting 3.OA.1 (3 minutes) Multiply by 6 (8 minutes) Materials: (S) Multiply by 6 (6-10) Pattern Sheet Note: This activity builds fluency with respect to multiplication facts using units of 6. It works toward students knowing from memory all products of two one-digit numbers. See Lesson 2 for the directions for administration of a Multiply-By Pattern Sheet. T: (Write 7 x 6 = ____.) Let us skip-count up by sixes. (Count with fingers to 7 as students count.) S: 6, 12, 18, 24, 30, 36, 42. T...",
      teacherEditionBasis: "Module 4 Teacher Edition, lesson pages 92-115.",
      visualModel: "area-model"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 92-115. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Find the area of a rectangle through multiplication of the side lengths."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 92-115. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Relate side lengths to area. T: (Project image shown below.) How many rows are in the incomplete array?"
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
      },
      {
        label: "Source text",
        value: "In what way is the area of Problem 1(b) related to the area of Problem 1(a)? (It is double.) How could you use the side lengths to help you figure out that 8 x 7 is double 4 x 7?"
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 4 student workbook, Lesson 8 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: Write a multiplication equation to find the area of each rectangle. 6 ft a. b. 7 ft c. 7 ft 4 ft Area: ____ sq ft 6 ft Area: ____ sq ft 8 ft Area: ____ sq ft ____ x ____ = ____ ____ x ____ = ____ ____ x ____ = ____ Problem 2: Write a multiplication equation and a division equation to find the unknown side length for each rectangle. ____ ft ____ ft 4 ft a. b. c. 3 ft Area = 15 sq ft 9 ft Area = 72 sq ft ____ ft Area = 28 sq ft ____ x ____ = ____ ____ divided by ____ = ____ ____ x ____ = ____ ____ x ____ = ____ ____ divided by ____ = ____ ____ divided by ____ = ____ Problem 3: On the grid below, draw a rectangle that has an area of 42 square units. Label the side lengths. Ursa draws a rectangle that has side lengths of 9 centimeters and 6 centimeters. What is the area of the rectangle? Explain how you found your answer. 5. Eliza's bedroom measures 6 feet by 7 feet. Her brother's bedroom measures 5 feet by 8 feet. Eliza says their rooms have the same exact floor area. Is she..."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 4 Teacher Edition, lesson pages 92-115."
      },
      {
        label: "Source text",
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 92-115. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 8 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 4 Teacher Edition, lesson pages 92-115."
      },
      {
        label: "Source text",
        value: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (11 minutes) Multiply by 6 3.OA.7 (8 minutes) Group Counting 3.OA.1 (3 minutes) Multiply by 6 (8 minutes) Materials: (S) Multiply by 6 (6-10) Pattern Sheet Note: This activity builds fluency with respect to multiplication facts using units of 6. It works toward students knowing from memory all products of two one-digit numbers. See Lesson 2 for the directions for administration of a Multiply-By Pattern Sheet. T: (Write 7 x 6 = ____.) Let us skip-count up by sixes. (Count with fingers to 7 as students count.) S: 6, 12, 18, 24, 30, 36, 42. T..."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 8 Problem Set."
      }
    ]
  }
};
