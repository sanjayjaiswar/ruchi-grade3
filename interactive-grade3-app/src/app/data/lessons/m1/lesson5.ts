import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON5_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "division",
    "unknown",
    "quotient"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 5 animation: unknown is the number of groups",
    context: "Show 18 as the whole, mark groups of 6, and count how many groups fit.",
    equation: "18 divided by 6 = 3",
    teacherPrompt: "How is this unknown different from the unknown in Lesson 4?",
    groupCount: 3,
    groupSize: 6,
    rowCount: 3,
    columnCount: 6,
    tapePartCount: 3,
    tapePartLabel: "6 each",
    tapeWholeLabel: "18 total",
    focus: [
      "Whole",
      "Groups of 6",
      "Unknown number of groups"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 5: source objective",
      shortTitle: "Goal",
      studentPrompt: "Understand the meaning of the unknown as the number of groups in division.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 75-84. Lesson 5 objective, group-making concept development, count-by strategy, problem set, exit ticket, and homework.",
      visualModel: "equal-groups"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Division as fair share with the unknown as the number of groups. T: Next weekend, my friend Cynthia is having a party. Eighteen people are coming. I told her I'd help her set up tables. We know that 6 people can sit at each table, but we're not sure how many tables we'll need. Turn and talk with your partner. What information do Cynthia and I already have? S: You know the total number of people. It's 18.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 75-84. Lesson 5 objective, group-making concept development, count-by strategy, problem set, exit ticket, and homework.",
      visualModel: "equal-groups"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Review the relationship between multiplication and division. Guide students to observe that division is used to find either factor-the unknown can be the size of groups (learned yesterday) or the number of groups (learned today)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 5 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "equal-groups"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: 2. Divide 6 tomatoes into groups of 3. Divide 8 lollipops into groups of 2. There are ____ groups of 3 tomatoes. There are ____ groups. 6divided by3=2 8 divided by 2 = ____ Problem 3: 4. Divide 10 stars into groups of 5. Divide the shells to show 12 divided by 3 = ____, where the unknown represents the number of groups. 10 divided by 5 = ____ How many groups are there? ____ division. Problem 5: Rachel has 9 crackers. She puts 3 crackers in each bag. Circle the crackers to show Rachel's bags. a. Write a division sentence where the answer represents the number of Rachel's bags. b. Draw a number bond to represent the problem.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 5 Problem Set.",
      visualModel: "equal-groups"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 5 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 75-84.",
      visualModel: "equal-groups"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 75-84. Lesson 5 objective, group-making concept development, count-by strategy, problem set, exit ticket, and homework.",
      visualModel: "equal-groups"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 5 objective: Understand the meaning of the unknown as the number of groups in division.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 75-84.",
      visualModel: "equal-groups"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 75-84. Lesson 5 objective, group-making concept development, count-by strategy, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Understand the meaning of the unknown as the number of groups in division."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 5 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 75-84. Lesson 5 objective, group-making concept development, count-by strategy, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Division as fair share with the unknown as the number of groups. T: Next weekend, my friend Cynthia is having a party. Eighteen people are coming. I told her I'd help her set up tables. We know that 6 people can sit at each table, but we're not sure how many tables we'll need. Turn and talk with your partner. What information do Cynthia and I already have? S: You know the total number of people. It's 18."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 5 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 5 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Review the relationship between multiplication and division. Guide students to observe that division is used to find either factor-the unknown can be the size of groups (learned yesterday) or the number of groups (learned today)"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 5 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 5 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: 2. Divide 6 tomatoes into groups of 3. Divide 8 lollipops into groups of 2. There are ____ groups of 3 tomatoes. There are ____ groups. 6divided by3=2 8 divided by 2 = ____ Problem 3: 4. Divide 10 stars into groups of 5. Divide the shells to show 12 divided by 3 = ____, where the unknown represents the number of groups. 10 divided by 5 = ____ How many groups are there? ____ division. Problem 5: Rachel has 9 crackers. She puts 3 crackers in each bag. Circle the crackers to show Rachel's bags. a. Write a division sentence where the answer represents the number of Rachel's bags. b. Draw a number bond to represent the problem."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 5 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 75-84."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 5 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 5 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 75-84. Lesson 5 objective, group-making concept development, count-by strategy, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 5 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 75-84."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 5 objective: Understand the meaning of the unknown as the number of groups in division."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 5 Problem Set."
      }
    ]
  }
};
