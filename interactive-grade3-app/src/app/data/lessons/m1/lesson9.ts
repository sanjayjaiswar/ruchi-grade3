import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON9_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "array",
    "equal groups"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 9 animation: add one equal group",
    context: "Start with 5 rows of 3, add one more row, and show how the related product changes.",
    equation: "5 x 3 = 15; 6 x 3 = 15 + 3 = 18",
    teacherPrompt: "Which group was added, and how did that change the product?",
    groupCount: 6,
    groupSize: 3,
    rowCount: 6,
    columnCount: 3,
    tapePartCount: 6,
    tapePartLabel: "3",
    tapeWholeLabel: "18 total",
    firstPart: 5,
    secondPart: 1,
    focus: [
      "Known fact",
      "Added group",
      "New fact"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 9: source objective",
      shortTitle: "Goal",
      studentPrompt: "Find related multiplication facts by adding and subtracting equal groups in array models.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 119-130. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Problem 1: Add two known smaller facts to solve an unknown larger fact. T: Slip the template into your board. Cover part of the array with blank paper to show 5 rows of 3. Draw a box around the uncovered array. Write and solve a multiplication sentence to describe it. S: (Cover, then box array, and write 5 x 3 = 15.) T: Move the paper so the array shows 7 x 3. Shade the rows you added.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 119-130. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Review the strategy of adding and subtracting the totals of known \"easy\" facts for solving unknown facts",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 9 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: The team organizes soccer balls into 2 rows of 5. The coach adds 3 rows of 5 soccer balls. Complete the equations to describe the total array. a. (5 + 5) + (5 + 5 + 5) = ____ b. 2 fives + ____ fives = ____ fives c. ____ x 5 = ____ Problem 2: 7 x 2 = ____ Problem 3: 9 x 2 = ____ 5 x 2 = ____ 10 x 2 = ____ 2 x 2 = ____ 10 + 4 = ____ ____ x 2 = 14 1 x 2 = ____ 20 - ____ = 18 9 x 2 = ____",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 9 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 9 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 119-130.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 119-130. Lesson 9 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 9 objective: Find related multiplication facts by adding and subtracting equal groups in array models.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 119-130.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 119-130. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Find related multiplication facts by adding and subtracting equal groups in array models."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 9 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 119-130. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Problem 1: Add two known smaller facts to solve an unknown larger fact. T: Slip the template into your board. Cover part of the array with blank paper to show 5 rows of 3. Draw a box around the uncovered array. Write and solve a multiplication sentence to describe it. S: (Cover, then box array, and write 5 x 3 = 15.) T: Move the paper so the array shows 7 x 3. Shade the rows you added."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 9 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 9 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Review the strategy of adding and subtracting the totals of known \"easy\" facts for solving unknown facts"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 9 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 9 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: The team organizes soccer balls into 2 rows of 5. The coach adds 3 rows of 5 soccer balls. Complete the equations to describe the total array. a. (5 + 5) + (5 + 5 + 5) = ____ b. 2 fives + ____ fives = ____ fives c. ____ x 5 = ____ Problem 2: 7 x 2 = ____ Problem 3: 9 x 2 = ____ 5 x 2 = ____ 10 x 2 = ____ 2 x 2 = ____ 10 + 4 = ____ ____ x 2 = 14 1 x 2 = ____ 20 - ____ = 18 9 x 2 = ____"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 9 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 119-130."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 9 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 9 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 119-130. Lesson 9 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 9 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 119-130."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 9 objective: Find related multiplication facts by adding and subtracting equal groups in array models."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 9 Problem Set."
      }
    ]
  }
};
