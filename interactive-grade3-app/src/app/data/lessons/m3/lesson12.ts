import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M3_LESSON12_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "distributive property",
    "factor",
    "product",
    "multiplication"
  ],
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
      teacherEditionBasis: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Each has a value of 9. Find the value of each row. Then, add the rows to find the total. a. 6 x 9 = ____ b. 7 x 9 = ____ 5 x 9 = 45 5 x 9 = 45 1 x 9 = ____ ____ x 9 = ____ 6 x 9 = (5 + 1) x 9 7 x 9 = (5 + ____) x 9 = (5 x 9) + (1 x 9) = (5 x 9) + (____ x 9) = 45 + ____ = 45 + ____ = ____ = ____ c. 8 x 9 = ____ d. 9 x 9 = ____ 5 x 9 = ____ 5 x 9 = ____ ____ x 9 = ____ ____ x 9 = ____ 8 x 9 = (5 + ____) x 9 9 x 9 = (5 + ____) x 9 = (5 x 9) + (____ x ____) = (5 x 9) + (____ x ____) = 45 + ____ = 45 + ____ = ____ = ____ to multiply. Problem 2: Find the total value of the shaded blocks. a. 9 x 6 = b. 9 x 7 = 6 7 9 sixes = 10 sixes - 1 six 9 sevens = 10 sevens - 1 seven =____ - 6 = ____ - 7 = ____ = ____ c. 9 x 8 = d. 9 x 9 = 8 9 9 eights = 10 eights - 1 eight 9 nines = 10 nines - 1 nine = ____ - 8 = ____ - ____ = ____ = ____ Problem 3: Matt buys a pack of postage stamps. He counts 9 rows of 4 stamps. He thinks of 10 fours to find the total number of stamps. Show the strategy t...",
      teacherEditionBasis: "Module 3 student workbook, Lesson 12 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
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
      studentPrompt: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (11 minutes) Multiply By 8 3.OA.7 (7 minutes) Take from the Ten 3.OA.5 (4 minutes) Multiply by 8 (7 minutes) Materials: (S) Multiply By 8 (6-10) (Pattern Sheet) Note: This activity builds fluency with respect to multiplication facts using units of 8. It supports students knowing from memory all products of two one-digit numbers. See Lesson 5 for the directions regarding administration of a Multiply By Pattern Sheet. T: (Write 6 x 8 = ____.) Let's skip-count up by eights to solve. (Count with fingers to 6 as students count.) S: 8, 16, 24, 3...",
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
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
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
        value: "Problem 1: Each has a value of 9. Find the value of each row. Then, add the rows to find the total. a. 6 x 9 = ____ b. 7 x 9 = ____ 5 x 9 = 45 5 x 9 = 45 1 x 9 = ____ ____ x 9 = ____ 6 x 9 = (5 + 1) x 9 7 x 9 = (5 + ____) x 9 = (5 x 9) + (1 x 9) = (5 x 9) + (____ x 9) = 45 + ____ = 45 + ____ = ____ = ____ c. 8 x 9 = ____ d. 9 x 9 = ____ 5 x 9 = ____ 5 x 9 = ____ ____ x 9 = ____ ____ x 9 = ____ 8 x 9 = (5 + ____) x 9 9 x 9 = (5 + ____) x 9 = (5 x 9) + (____ x ____) = (5 x 9) + (____ x ____) = 45 + ____ = 45 + ____ = ____ = ____ to multiply. Problem 2: Find the total value of the shaded blocks. a. 9 x 6 = b. 9 x 7 = 6 7 9 sixes = 10 sixes - 1 six 9 sevens = 10 sevens - 1 seven =____ - 6 = ____ - 7 = ____ = ____ c. 9 x 8 = d. 9 x 9 = 8 9 9 eights = 10 eights - 1 eight 9 nines = 10 nines - 1 nine = ____ - 8 = ____ - ____ = ____ = ____ Problem 3: Matt buys a pack of postage stamps. He counts 9 rows of 4 stamps. He thinks of 10 fours to find the total number of stamps. Show the strategy t..."
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
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
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
        value: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (11 minutes) Multiply By 8 3.OA.7 (7 minutes) Take from the Ten 3.OA.5 (4 minutes) Multiply by 8 (7 minutes) Materials: (S) Multiply By 8 (6-10) (Pattern Sheet) Note: This activity builds fluency with respect to multiplication facts using units of 8. It supports students knowing from memory all products of two one-digit numbers. See Lesson 5 for the directions regarding administration of a Multiply By Pattern Sheet. T: (Write 6 x 8 = ____.) Let's skip-count up by eights to solve. (Count with fingers to 6 as students count.) S: 8, 16, 24, 3..."
      },
      {
        label: "Workbook",
        value: "Module 3 student workbook, Lesson 12 Problem Set."
      }
    ]
  }
};
