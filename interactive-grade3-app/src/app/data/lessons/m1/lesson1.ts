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
      studentPrompt: "Understand equal groups of as multiplication.",
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
      teacherEditionBasis: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. Some problems do not specify a method for solving. This is an intentional reduction of scaffolding that invokes MP.5, Use Appropriate Tools Strategically. Students should solve these problems using the RDW approach used for Application Problems. For some classes, it may be appropriate to modify the assignment by specifying which problems students should work on first. With this option, let the purposeful sequencing of the Problem S...",
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
      studentPrompt: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. Some problems do not specify a method for solving. This is an intentional reduction of scaffolding that invokes MP.5, Use Appropriate Tools Strategically. Students should solve these problems using the RDW approach used for Application Problems. For some classes, it may be appropriate to modify the assignment by specifying which problems students should work on first. With this option, let the purposeful sequencing of the Problem S...",
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
      studentPrompt: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (5 minutes) Group Counting 3.OA.1 (5 minutes) NOTES ON FLUENCY PRACTICE: Group Counting (5 minutes) Think of fluency as having three goals: 1. Maintenance (staying sharp on Note: Basic skip-counting skills from Grade 2 shift focus in this previously learned skills). Grade 3 activity. Group counting lays a foundation for 2. Preparation (targeted practice for interpreting multiplication as repeated addition. When the current lesson). students count groups in this activity, they add and subtract 3. Anticipation (skills that ensure that groups o...",
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
        value: "Understand equal groups of as multiplication."
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
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. Some problems do not specify a method for solving. This is an intentional reduction of scaffolding that invokes MP.5, Use Appropriate Tools Strategically. Students should solve these problems using the RDW approach used for Application Problems. For some classes, it may be appropriate to modify the assignment by specifying which problems students should work on first. With this option, let the purposeful sequencing of the Problem S..."
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
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. Some problems do not specify a method for solving. This is an intentional reduction of scaffolding that invokes MP.5, Use Appropriate Tools Strategically. Students should solve these problems using the RDW approach used for Application Problems. For some classes, it may be appropriate to modify the assignment by specifying which problems students should work on first. With this option, let the purposeful sequencing of the Problem S..."
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
        value: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (5 minutes) Group Counting 3.OA.1 (5 minutes) NOTES ON FLUENCY PRACTICE: Group Counting (5 minutes) Think of fluency as having three goals: 1. Maintenance (staying sharp on Note: Basic skip-counting skills from Grade 2 shift focus in this previously learned skills). Grade 3 activity. Group counting lays a foundation for 2. Preparation (targeted practice for interpreting multiplication as repeated addition. When the current lesson). students count groups in this activity, they add and subtract 3. Anticipation (skills that ensure that groups o..."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 1 Problem Set."
      }
    ]
  }
};
