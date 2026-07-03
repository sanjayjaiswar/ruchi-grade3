import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON8_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "array",
    "commutative property"
  ],
  lessonAnimation: {
    kind: "array",
    title: "Lesson 8 animation: related facts with units of 3",
    context: "Show 5 rows of 3, skip-count by threes, and connect the related multiplication facts.",
    equation: "5 x 3 = 15; 3 x 5 = 15",
    teacherPrompt: "How does skip-counting support the related fact?",
    groupCount: 5,
    groupSize: 3,
    rowCount: 5,
    columnCount: 3,
    tapePartCount: 5,
    tapePartLabel: "3",
    tapeWholeLabel: "15 total",
    focus: [
      "Skip-count by 3",
      "Commutative property",
      "Same total"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 8: source objective",
      shortTitle: "Goal",
      studentPrompt: "Demonstrate the commutativity of multiplication, and practice related facts by skip-counting objects in array models.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 109-118. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Rotate arrays 90 degrees. of rows represents the number of groups. horizontal rather than actually doing it. T: Discuss how many rows and columns you see. S: (Students discuss that there are 4 rows and 3 columns.) T: Turn your board so that the long side is horizontal. How many rows and columns does it show now?",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 109-118. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Share your answers to Problem 7 with a partner. Do your multiplication sentences look the same, or are they different? Why?",
      teacherEditionBasis: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Draw an array that shows 5 rows of 3. Problem 2: Draw an array that shows 3 rows of 5. Problem 3: Write multiplication expressions for the arrays in Problems 1 and 2. Let the first factor in each expression represent the number of rows. Use the commutative property to make sure the equation below is true. ____ x ____ = ____ x ____ Problem 1 Problem 2",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 8 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 109-118.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 109-118. Lesson 8 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (6 minutes) Group Counting 3.OA.1 (3 minutes) Commutative Multiplying 3.OA.5 (3 minutes) Group Counting (3 minutes) Note: Group counting reviews interpreting multiplication as repeated addition. Counting by twos, threes, and fours in this activity supports work with units of 2 and 3 in this topic and anticipates work using units of 4 in Topic E. T: Let's count by twos to 20. Whisper the numbers, and then speak them. T: Let's count by twos to 20 again. This time, hum the first number, and then speak it. As you hum, think of the number. T: L...",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 109-118.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 109-118. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Demonstrate the commutativity of multiplication, and practice related facts by skip-counting objects in array models."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 8 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 109-118. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Rotate arrays 90 degrees. of rows represents the number of groups. horizontal rather than actually doing it. T: Discuss how many rows and columns you see. S: (Students discuss that there are 4 rows and 3 columns.) T: Turn your board so that the long side is horizontal. How many rows and columns does it show now?"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 8 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
      },
      {
        label: "Source text",
        value: "Share your answers to Problem 7 with a partner. Do your multiplication sentences look the same, or are they different? Why?"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 8 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 8 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: Draw an array that shows 5 rows of 3. Problem 2: Draw an array that shows 3 rows of 5. Problem 3: Write multiplication expressions for the arrays in Problems 1 and 2. Let the first factor in each expression represent the number of rows. Use the commutative property to make sure the equation below is true. ____ x ____ = ____ x ____ Problem 1 Problem 2"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 8 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 109-118."
      },
      {
        label: "Source text",
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 8 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 109-118. Lesson 8 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 8 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 109-118."
      },
      {
        label: "Source text",
        value: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (6 minutes) Group Counting 3.OA.1 (3 minutes) Commutative Multiplying 3.OA.5 (3 minutes) Group Counting (3 minutes) Note: Group counting reviews interpreting multiplication as repeated addition. Counting by twos, threes, and fours in this activity supports work with units of 2 and 3 in this topic and anticipates work using units of 4 in Topic E. T: Let's count by twos to 20. Whisper the numbers, and then speak them. T: Let's count by twos to 20 again. This time, hum the first number, and then speak it. As you hum, think of the number. T: L..."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 8 Problem Set."
      }
    ]
  }
};
