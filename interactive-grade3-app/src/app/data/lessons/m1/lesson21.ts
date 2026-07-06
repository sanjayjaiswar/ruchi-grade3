import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON21_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 21 animation: choose operations for a two-step story",
    context: "Show a whole, remove a known part, then divide the remaining amount into equal groups.",
    equation: "(24 - 6) ÷ 3 = 6",
    teacherPrompt: "Why do these operations match the order of the story?",
    groupCount: 3,
    groupSize: 6,
    rowCount: 3,
    columnCount: 6,
    tapePartCount: 3,
    tapePartLabel: "6",
    tapeWholeLabel: "18 after step 1",
    focus: [
      "Operation choice",
      "Two equations",
      "Reasonableness"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 21: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solve two-step word problems involving all four operations, and assess the reasonableness of answers.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 267-276. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Today's lesson is a culminating exploration that follows the following process: Divide the class into groups no larger than four students. Assign each group one word problem from the Problem Set. (Cut the Problem Set so that initially each group only receives the problem they are assigned. More than one group may work on the same problem.) Each group collaborates to model and solve their assigned problem.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 267-276. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Ask the student to explain what the model shows before accepting the final answer.",
      teacherEditionBasis: "Problem Set focus: groups present the model and solution process, then students solve the complete Problem Set independently using precise equation, product, and quotient language.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Jason earns $6 per week for doing all his chores. On the fifth week, he forgets to take out the trash, so he only earns $4. Write and solve an equation to show how much Jason earns in 5 weeks. $6 $4 Jason Jason earns ____. Problem 2: Miss Lianto orders 4 packs of 7 markers. After passing out 1 marker to each student in her class, she has 6 left. Label the tape diagram to find how many students are in Miss Lianto's class. ____ 7 ____ 6 markers There are ____ students in Miss Lianto's class. the reasonableness of answers. Problem 3: Orlando buys a box of 18 fruit snacks. Each box comes with an equal number of strawberry-, cherry-, and grape-flavored snacks. He eats all of the grape-flavored snacks. Draw and label a tape diagram to find how many fruit snacks he has left.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 21 Problem Set.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 21 Problem Set models to choose the operation for each step, write the matching equations, and check that the final answer is reasonable.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 267-276.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 267-276. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "tape-diagram"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 21 objective: Solve two-step word problems involving all four operations, and assess the reasonableness of answers.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 267-276.",
      visualModel: "tape-diagram"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 267-276. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve two-step word problems involving all four operations, and assess the reasonableness of answers."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 21 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 267-276. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Today's lesson is a culminating exploration that follows the following process: Divide the class into groups no larger than four students. Assign each group one word problem from the Problem Set. (Cut the Problem Set so that initially each group only receives the problem they are assigned. More than one group may work on the same problem.) Each group collaborates to model and solve their assigned problem."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 21 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set focus: groups present the model and solution process, then students solve the complete Problem Set independently using precise equation, product, and quotient language."
      },
      {
        label: "Source text",
        value: "Ask the student to explain what the model shows before accepting the final answer."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 21 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 21 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1 combines four full $6 weeks with a $4 fifth week. Problem 2 uses 4 packs of 7 markers, subtracts the 6 left over, and names the number of students. Problem 3 partitions 18 snacks into 3 flavors, removes the grape part, and names the snacks left."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 21 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 267-276."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 21 Problem Set models to choose the operation for each step, write the matching equations, and check that the final answer is reasonable."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 21 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 267-276. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 21 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 267-276."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 21 objective: Solve two-step word problems involving all four operations, and assess the reasonableness of answers."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 21 Problem Set."
      }
    ]
  }
};
