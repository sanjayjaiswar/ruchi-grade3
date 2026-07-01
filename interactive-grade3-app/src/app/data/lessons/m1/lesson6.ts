import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON6_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "array",
    "quotient",
    "unknown factor"
  ],
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 6: source objective",
      shortTitle: "Goal",
      studentPrompt: "Interpret the unknown in division using the array model.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 85-94. Lesson 6 objective, array concept development, related multiplication/division equations, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "each row to the size of the group. The same concept applies for division arrays, but now the problems begin with the total number",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 85-94. Lesson 6 objective, array concept development, related multiplication/division equations, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Analyze the four equations in Problem 3. Compare the multiplication and division equations, noticing differences in how the problem is represented by each one",
      teacherEditionBasis: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Rick puts 15 tennis balls into cans. Each can holds 3 balls. Circle groups of 3 to show the balls in each can. Rick needs ____ cans. ____ x 3 = 15 15 divided by 3 = ____ Problem 2: Rick uses 15 tennis balls to make 5 equal groups. Draw to show how many tennis balls are in each group. There are ____ tennis balls in each group. 5 x ____ = 15 15 divided by 5 = ____ Problem 3: Use an array to model Problem 1. a. ____ x 3 = 15 b. 5 x ____ = 15 15 divided by 3 = ____ 15 divided by 5 = ____ The number in the blanks represents The number in the blanks represents ____. ____.",
      teacherEditionBasis: "Module 1 student workbook, Lesson 6 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 85-94.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 85-94. Lesson 6 objective, array concept development, related multiplication/division equations, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (8 minutes) Group Counting 3.OA.1 (3 minutes) Divide Equal Groups 3.OA.2 (5 minutes) Group Counting (3 minutes) Note: Group counting reviews interpreting multiplication as repeated addition. Counting by twos and threes in this activity supports work with those factors in Topic B. T: Let's count by twos. (Direct students to count forward and backward to 20, emphasizing the 8 to 10, 10 to 12, and 18 to 20 transitions.) T: Let's count by threes. (Direct students to count forward and backward to 30, periodically changing directions. Emphasize...",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 85-94.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 85-94. Lesson 6 objective, array concept development, related multiplication/division equations, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Interpret the unknown in division using the array model."
      },
      {
        label: "Workbook",
        value: "Module 1 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 85-94. Lesson 6 objective, array concept development, related multiplication/division equations, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "each row to the size of the group. The same concept applies for division arrays, but now the problems begin with the total number"
      },
      {
        label: "Workbook",
        value: "Module 1 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
      },
      {
        label: "Source text",
        value: "Analyze the four equations in Problem 3. Compare the multiplication and division equations, noticing differences in how the problem is represented by each one"
      },
      {
        label: "Workbook",
        value: "Module 1 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 student workbook, Lesson 6 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: Rick puts 15 tennis balls into cans. Each can holds 3 balls. Circle groups of 3 to show the balls in each can. Rick needs ____ cans. ____ x 3 = 15 15 divided by 3 = ____ Problem 2: Rick uses 15 tennis balls to make 5 equal groups. Draw to show how many tennis balls are in each group. There are ____ tennis balls in each group. 5 x ____ = 15 15 divided by 5 = ____ Problem 3: Use an array to model Problem 1. a. ____ x 3 = 15 b. 5 x ____ = 15 15 divided by 3 = ____ 15 divided by 5 = ____ The number in the blanks represents The number in the blanks represents ____. ____."
      },
      {
        label: "Workbook",
        value: "Module 1 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 85-94."
      },
      {
        label: "Source text",
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
      },
      {
        label: "Workbook",
        value: "Module 1 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 85-94. Lesson 6 objective, array concept development, related multiplication/division equations, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 1 student workbook, Lesson 6 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 85-94."
      },
      {
        label: "Source text",
        value: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (8 minutes) Group Counting 3.OA.1 (3 minutes) Divide Equal Groups 3.OA.2 (5 minutes) Group Counting (3 minutes) Note: Group counting reviews interpreting multiplication as repeated addition. Counting by twos and threes in this activity supports work with those factors in Topic B. T: Let's count by twos. (Direct students to count forward and backward to 20, emphasizing the 8 to 10, 10 to 12, and 18 to 20 transitions.) T: Let's count by threes. (Direct students to count forward and backward to 30, periodically changing directions. Emphasize..."
      },
      {
        label: "Workbook",
        value: "Module 1 student workbook, Lesson 6 Problem Set."
      }
    ]
  }
};
