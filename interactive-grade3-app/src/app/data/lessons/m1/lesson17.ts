import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON17_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "multiplication",
    "division",
    "quotient",
    "factor"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 17 animation: multiplication and division describe one model",
    context: "Show 24 as 6 units of 4, then read the model with both multiplication and division equations.",
    equation: "6 x 4 = 24; 24 divided by 4 = 6",
    teacherPrompt: "How do multiplication and division describe the same tape diagram?",
    groupCount: 6,
    groupSize: 4,
    rowCount: 6,
    columnCount: 4,
    tapePartCount: 6,
    tapePartLabel: "4",
    tapeWholeLabel: "24 total",
    focus: [
      "Factor",
      "Product",
      "Quotient"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 17: source objective",
      shortTitle: "Goal",
      studentPrompt: "Model the relationship between multiplication and division.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 221-231. Lesson 17 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the number bond to relate multiplication and division. T: (Draw or project the number bond shown to the right.) The number bond represents the division equation you wrote to solve the Application Problem. Turn and tell your partner how it shows 24 divided by 4. S: (Discuss.) T: Look back at the Application Problem. Is the unknown in the number bond the same as the unknown in the division problem?",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 221-231. Lesson 17 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "In the first problem on the Problem Set, what patterns did you notice in the array?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 17 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Use the array to complete related multiplication and division equations from 1 x 4 through 10 x 4. Problem 2: The baker packs 36 bran muffins in boxes of 4; draw and label a tape diagram to find the number of boxes. Problem 3: The waitress arranges 32 glasses into 4 equal rows; find the number of glasses in each row. Problem 4: Janet paid $28 for 4 notebooks; find the cost of 2 notebooks.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 17 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 17 Problem Set array, tape diagrams, and number bond contexts to connect multiplication and division.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 221-231.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 221-231. Lesson 17 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: discuss the patterns in the array, how multiplication and division equations describe the same model, and how division can be understood as an unknown factor problem.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 221-231.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 221-231. Lesson 17 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Model the relationship between multiplication and division."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 17 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 221-231. Lesson 17 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the number bond to relate multiplication and division. T: (Draw or project the number bond shown to the right.) The number bond represents the division equation you wrote to solve the Application Problem. Turn and tell your partner how it shows 24 divided by 4. S: (Discuss.) T: Look back at the Application Problem. Is the unknown in the number bond the same as the unknown in the division problem?"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 17 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students use arrays, tape diagrams, and number bonds to model the relationship between multiplication and division."
      },
      {
        label: "Source text",
        value: "In the first problem on the Problem Set, what patterns did you notice in the array?"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 17 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 17 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: Use the array to complete related multiplication and division equations from 1 x 4 through 10 x 4. Problem 2: The baker packs 36 bran muffins in boxes of 4; draw and label a tape diagram to find the number of boxes. Problem 3: The waitress arranges 32 glasses into 4 equal rows; find the number of glasses in each row. Problem 4: Janet paid $28 for 4 notebooks; find the cost of 2 notebooks."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 17 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 221-231."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 17 Problem Set array, tape diagrams, and number bond contexts to connect multiplication and division."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 17 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 221-231. Lesson 17 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 17 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 221-231."
      },
      {
        label: "Source text",
        value: "Debrief focus: discuss the patterns in the array, how multiplication and division equations describe the same model, and how division can be understood as an unknown factor problem."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 17 Problem Set."
      }
    ]
  }
};
