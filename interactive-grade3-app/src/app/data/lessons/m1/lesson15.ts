import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON15_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "array",
    "tape diagram",
    "commutative property",
    "factor"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 15 animation: array to tape diagram",
    context: "Represent 4 units of 3 as a tape diagram and connect it to the matching array and related fact.",
    equation: "4 x 3 = 12; 3 x 4 = 12",
    teacherPrompt: "How can the tape diagram and array show the same total?",
    groupCount: 4,
    groupSize: 3,
    rowCount: 4,
    columnCount: 3,
    tapePartCount: 4,
    tapePartLabel: "3",
    tapeWholeLabel: "12 total",
    focus: [
      "Tape units",
      "Array connection",
      "Commutative facts"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 15: source objective",
      shortTitle: "Goal",
      studentPrompt: "Relate arrays to tape diagrams to model the commutative property of.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 200-209. Lesson 15 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "T: Draw an array with 2 rows and 4 columns above the fold on your paper. Use the array to remind your partner about what the commutative property is. Turn your paper if you need to. S: (May rotate array 90 degrees.) The factors can switch places or trade meanings, but the total stays the same. T: Use the commutative property to write two multiplication equations for the array.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 200-209. Lesson 15 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Students may have drawn different arrays for Problems 1(a), 1(b), and 1(c). Compare differences and discuss why both arrays reflect both diagrams",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 15 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Label the tape diagrams and complete the equations. Then, draw an array to represent the problems. a. 2 x 4 = ____ 4 x 2 = ____ b. ____ x 4 = ____ 4 x ____ = ____ c. ____ x ____ = 28 ____ x ____ = 28 multiplication. Problem 2: Draw and label 2 tape diagrams to model why the statement in the box is true. 4x6=6x4 Problem 3: Grace picks 4 flowers from her garden. Each flower has 8 petals. Draw and label a tape diagram to show how many petals there are in total.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 15 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 15 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 200-209.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 200-209. Lesson 15 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 15 objective: Relate arrays to tape diagrams to model the commutative property of.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 200-209.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 200-209. Lesson 15 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Relate arrays to tape diagrams to model the commutative property of."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 15 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 200-209. Lesson 15 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "T: Draw an array with 2 rows and 4 columns above the fold on your paper. Use the array to remind your partner about what the commutative property is. Turn your paper if you need to. S: (May rotate array 90 degrees.) The factors can switch places or trade meanings, but the total stays the same. T: Use the commutative property to write two multiplication equations for the array."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 15 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 15 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Students may have drawn different arrays for Problems 1(a), 1(b), and 1(c). Compare differences and discuss why both arrays reflect both diagrams"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 15 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 15 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: Label the tape diagrams and complete the equations. Then, draw an array to represent the problems. a. 2 x 4 = ____ 4 x 2 = ____ b. ____ x 4 = ____ 4 x ____ = ____ c. ____ x ____ = 28 ____ x ____ = 28 multiplication. Problem 2: Draw and label 2 tape diagrams to model why the statement in the box is true. 4x6=6x4 Problem 3: Grace picks 4 flowers from her garden. Each flower has 8 petals. Draw and label a tape diagram to show how many petals there are in total."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 15 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 200-209."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 15 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 15 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 200-209. Lesson 15 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 15 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 200-209."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 15 objective: Relate arrays to tape diagrams to model the commutative property of."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 15 Problem Set."
      }
    ]
  }
};
