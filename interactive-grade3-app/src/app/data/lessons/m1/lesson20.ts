import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON20_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "multiplication",
    "division"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 20 animation: track two-step multiplication and division reasoning",
    context: "Use a tape diagram to separate step 1 from step 2 so the answer can be checked for reasonableness.",
    equation: "(3 x 4) + 6 = 18",
    teacherPrompt: "What is step 1, and how does that result feed step 2?",
    groupCount: 3,
    groupSize: 4,
    rowCount: 3,
    columnCount: 4,
    tapePartCount: 4,
    tapePartLabel: "step",
    tapeWholeLabel: "two-step total",
    focus: [
      "Read-Draw-Write",
      "Step 1 result",
      "Reasonableness"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 20: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solve two-step word problems involving multiplication and division, and assess the reasonableness of answers.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 255-266. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use a related two-step story to keep the first result visible, then combine it with the second part of the question before writing the final answer.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 255-266. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Compare the structure of Problems 1 and 2 to the rest of the Problem Set. Problems 1 and 2 explicitly ask two questions to scaffold the two- step word problems. Problems 3-5 still require two steps but only ask one question",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 20 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Ted buys 3 books and a magazine at the book store. Each book costs $8. A magazine costs $4. $4 Magazine Books a. What is the total cost of the books? b. How much does Ted spend altogether? Problem 2: Seven children share 28 silly bands equally. 28 a. How many silly bands does each child get? b. How many silly bands do 3 children get? and assess the reasonableness of answers. Problem 3: Eighteen cups are equally packed into 6 boxes. Two boxes of cups break. How many cups are unbroken?",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 20 Problem Set.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 20 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 255-266.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 255-266. Lesson 20 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 20 objective: Solve two-step word problems involving multiplication and division, and assess the reasonableness of answers.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 255-266.",
      visualModel: "tape-diagram"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 255-266. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve two-step word problems involving multiplication and division, and assess the reasonableness of answers."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 20 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 255-266. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use a related two-step story to keep the first result visible, then combine it with the second part of the question before writing the final answer."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 20 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 20 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Compare the structure of Problems 1 and 2 to the rest of the Problem Set. Problems 1 and 2 explicitly ask two questions to scaffold the two- step word problems. Problems 3-5 still require two steps but only ask one question"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 20 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 20 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1 asks for the book cost first and then the total with the magazine. Problem 2 asks for one child's share first and then the amount for 3 children. Problem 3 asks students to find cups per box, remove the broken boxes, and answer how many cups remain unbroken."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 20 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 255-266."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 20 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 20 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 255-266. Lesson 20 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 20 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 255-266."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 20 objective: Solve two-step word problems involving multiplication and division, and assess the reasonableness of answers."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 20 Problem Set."
      }
    ]
  }
};
