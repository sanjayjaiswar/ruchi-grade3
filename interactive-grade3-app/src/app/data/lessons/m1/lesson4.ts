import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON4_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "division",
    "unknown",
    "quotient"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 4 animation: unknown is the group size",
    context: "Show 18 as the whole split into 2 equal groups; the unknown is how many are in each group.",
    equation: "18 divided by 2 = 9",
    teacherPrompt: "What does the quotient tell us here: number of groups or size of each group?",
    groupCount: 2,
    groupSize: 9,
    rowCount: 2,
    columnCount: 9,
    tapePartCount: 2,
    tapePartLabel: "? in each group",
    tapeWholeLabel: "18 total",
    focus: [
      "Whole",
      "2 groups",
      "Unknown group size"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 4: source objective",
      shortTitle: "Goal",
      studentPrompt: "Understand the meaning of the unknown as the size of the group in division.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 63-74. Lesson 4 objective, fair-share concept development, pictorial division comparison, problem set, exit ticket, and homework.",
      visualModel: "equal-groups"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "MP.2 taught them the fair-share strategy of T: What are we trying to find, the number of groups or going back and forth to give 1 and 1, 2 the size of the group? and 2, 3 and 3, etc., until there are no S: The size of the group. more to distribute. Encourage those T: Your 18 counters represent the markers. Divide your 18 who are unsure what to do, or who are counters into 2 equal groups by giving one to Mr.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 63-74. Lesson 4 objective, fair-share concept development, pictorial division comparison, problem set, exit ticket, and homework.",
      visualModel: "equal-groups"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Ask students to share their division sentences for Problem 9. Because of the way the question is worded, answers will likely include 15 divided by 5 = 3 (answer is the size of the group) and 15 divided by 3 = 5 (answer is the number of groups).",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 4 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "equal-groups"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: 2. 14 flowers are divided into 2 equal groups. 28 books are divided into 4 equal groups. There are ____ flowers in each group. There are ____ books in each group. Problem 3: 4. 30 apples are divided into ____ equal ____ cups are divided into ____ equal groups. groups. There are ____ cups in each group. There are ____ apples in each group. 12 divided by 2 = ____ Problem 5: 6. There are ____ toys in each group. 9 divided by 3 = ____ 15 divided by 3 = ____ division.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 4 Problem Set.",
      visualModel: "equal-groups"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 4 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 63-74.",
      visualModel: "equal-groups"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 63-74. Lesson 4 objective, fair-share concept development, pictorial division comparison, problem set, exit ticket, and homework.",
      visualModel: "equal-groups"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 4 objective: Understand the meaning of the unknown as the size of the group in division.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 63-74.",
      visualModel: "equal-groups"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 63-74. Lesson 4 objective, fair-share concept development, pictorial division comparison, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Understand the meaning of the unknown as the size of the group in division."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 4 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 63-74. Lesson 4 objective, fair-share concept development, pictorial division comparison, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "MP.2 taught them the fair-share strategy of T: What are we trying to find, the number of groups or going back and forth to give 1 and 1, 2 the size of the group? and 2, 3 and 3, etc., until there are no S: The size of the group. more to distribute. Encourage those T: Your 18 counters represent the markers. Divide your 18 who are unsure what to do, or who are counters into 2 equal groups by giving one to Mr."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 4 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 4 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Ask students to share their division sentences for Problem 9. Because of the way the question is worded, answers will likely include 15 divided by 5 = 3 (answer is the size of the group) and 15 divided by 3 = 5 (answer is the number of groups)."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 4 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 4 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: 2. 14 flowers are divided into 2 equal groups. 28 books are divided into 4 equal groups. There are ____ flowers in each group. There are ____ books in each group. Problem 3: 4. 30 apples are divided into ____ equal ____ cups are divided into ____ equal groups. groups. There are ____ cups in each group. There are ____ apples in each group. 12 divided by 2 = ____ Problem 5: 6. There are ____ toys in each group. 9 divided by 3 = ____ 15 divided by 3 = ____ division."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 4 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 63-74."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 4 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 4 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 63-74. Lesson 4 objective, fair-share concept development, pictorial division comparison, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 4 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 63-74."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 4 objective: Understand the meaning of the unknown as the size of the group in division."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 4 Problem Set."
      }
    ]
  }
};
