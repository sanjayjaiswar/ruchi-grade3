import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON1_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "equal groups",
    "multiplication"
  ],
  lessonAnimation: {
    kind: "equal-groups",
    title: "Lesson 1 animation: equal groups become multiplication",
    context: "Show 4 equal groups with 2 in each group, then connect the picture to repeated addition and a multiplication sentence.",
    equation: "2 + 2 + 2 + 2 = 8; 4 x 2 = 8",
    teacherPrompt: "What must be true about the groups before the multiplication sentence is valid?",
    groupCount: 4,
    groupSize: 2,
    rowCount: 4,
    columnCount: 2,
    tapePartCount: 4,
    tapePartLabel: "2",
    tapeWholeLabel: "8 total",
    focus: [
      "Equal groups",
      "Repeated addition",
      "4 groups of 2"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 1: source objective",
      shortTitle: "Goal",
      studentPrompt: "Understand equal groups of as.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 23-33. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "equal-groups"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Skip-count to find the total number of objects. T: (Select 10 students to come to the front.) At the signal, say how many arms you each have. (Signal.) S: 2 arms! T: Since we each represent a group of 2 arms, let's skip-count our volunteers by twos to find how many arms they have altogether. To keep track of our count, students will raise up their arms when we count them.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 23-33. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "equal-groups"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "On the first page, what did you notice about the answers to your problems?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 1 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "equal-groups"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Fill in the blanks to make true statements. a. 3 groups of five = ____ b. 3 + 3 + 3 + 3 + 3 = ____ 3 fives = ____ 5 groups of three = ____ 3 x 5 = ____ 5 x 3 = ____ c. 6 + 6 + 6 + 6 = ____ ____ groups of six = ____ 4 x ____ = ____ d. 4 +____ + ____ + ____ + ____ + ____ = ____ 6 groups of ____ = ____ 6 x ____ = ____ Problem 2: The picture below shows 2 groups of apples. Does the picture show 2 x 3? Explain why or why not. Problem 3: Draw a picture to show 2 x 3 = 6.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 1 Problem Set.",
      visualModel: "equal-groups"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 1 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 23-33.",
      visualModel: "equal-groups"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 23-33. Lesson 1 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "equal-groups"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 1 objective: Understand equal groups of as.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 23-33.",
      visualModel: "equal-groups"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 23-33. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Understand equal groups of as."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 1 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 23-33. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Skip-count to find the total number of objects. T: (Select 10 students to come to the front.) At the signal, say how many arms you each have. (Signal.) S: 2 arms! T: Since we each represent a group of 2 arms, let's skip-count our volunteers by twos to find how many arms they have altogether. To keep track of our count, students will raise up their arms when we count them."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 1 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 1 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "On the first page, what did you notice about the answers to your problems?"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 1 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 1 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: Fill in the blanks to make true statements. a. 3 groups of five = ____ b. 3 + 3 + 3 + 3 + 3 = ____ 3 fives = ____ 5 groups of three = ____ 3 x 5 = ____ 5 x 3 = ____ c. 6 + 6 + 6 + 6 = ____ ____ groups of six = ____ 4 x ____ = ____ d. 4 +____ + ____ + ____ + ____ + ____ = ____ 6 groups of ____ = ____ 6 x ____ = ____ Problem 2: The picture below shows 2 groups of apples. Does the picture show 2 x 3? Explain why or why not. Problem 3: Draw a picture to show 2 x 3 = 6."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 1 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 23-33."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 1 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 1 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 23-33. Lesson 1 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 1 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 23-33."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 1 objective: Understand equal groups of as."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 1 Problem Set."
      }
    ]
  }
};
