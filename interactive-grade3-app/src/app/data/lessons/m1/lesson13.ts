import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON13_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "quotient",
    "division"
  ],
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 13 animation: quotient with units of 3",
    context: "Show units of 3 and name whether the quotient counts groups or the size of a group.",
    equation: "12 divided by 3 = 4",
    teacherPrompt: "Is the quotient the number of groups or the size of each group?",
    groupCount: 4,
    groupSize: 3,
    rowCount: 3,
    columnCount: 4,
    tapePartCount: 4,
    tapePartLabel: "3 each",
    tapeWholeLabel: "12 total",
    focus: [
      "Units of 3",
      "Quotient meaning",
      "Context label"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 13: source objective",
      shortTitle: "Goal",
      studentPrompt: "Interpret the quotient as the number of groups or the number of objects in each group using units of 3.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 174-185. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "modify guidance so that students work below: Three students equally share a pack of 12 pencils. through pictorial examples quickly, in pairs or independently. Meet with groups or individuals who need support. Alternatively, maximize support by skipping the abstract example in favor of slowly working the class through the pictorial.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 174-185. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Describe how the model in Problem 2(a) helped for drawing a tape diagram in Problem 2(b)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 13 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Fill in the blanks to make true number sentences. 5 x 3 = ____ 1x3=3 3x3=9 2x3=6 4 x 3 = ____ ____ divided by 3 = 5 3 divided by 3 = ____ ____ divided by 3 = 3 6 divided by 3 = ____ ____ divided by 3 = 4 10 x 3 = ____ 6 x 3 = ____ 8 x 3 = ____ 7 x 3 = ____ 9 x 3 = ____ ____ divided by 3 = 10 ____ divided by 3 = 6 ____ divided by 3 = 8 ____ divided by 3 = 7 ____ divided by 3 = 9 Problem 2: Mr. Lawton picks tomatoes from his garden. He divides the tomatoes into bags of Problem 3: a. Circle to show how many bags he packs. Then, skip-count to show the total number of tomatoes. b. Draw and label a tape diagram to represent the problem. ____ divided by 3 = ____ Mr. Lawton packs ____ bags of tomatoes. objects in each group using units of 3. 3. Camille buys a sheet of stamps that measures 15 centimeters long. Each stamp is 3 centimeters long. How many stamps does Camille buy? Draw and label a tape diagram to solve. Camille buys ____ stamps.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 13 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 13 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 174-185.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 174-185. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 13 objective: Interpret the quotient as the number of groups or the number of objects in each group using units of 3.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 174-185.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 174-185. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Interpret the quotient as the number of groups or the number of objects in each group using units of 3."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 13 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 174-185. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "modify guidance so that students work below: Three students equally share a pack of 12 pencils. through pictorial examples quickly, in pairs or independently. Meet with groups or individuals who need support. Alternatively, maximize support by skipping the abstract example in favor of slowly working the class through the pictorial."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 13 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 13 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Describe how the model in Problem 2(a) helped for drawing a tape diagram in Problem 2(b)"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 13 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 13 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: Fill in the blanks to make true number sentences. 5 x 3 = ____ 1x3=3 3x3=9 2x3=6 4 x 3 = ____ ____ divided by 3 = 5 3 divided by 3 = ____ ____ divided by 3 = 3 6 divided by 3 = ____ ____ divided by 3 = 4 10 x 3 = ____ 6 x 3 = ____ 8 x 3 = ____ 7 x 3 = ____ 9 x 3 = ____ ____ divided by 3 = 10 ____ divided by 3 = 6 ____ divided by 3 = 8 ____ divided by 3 = 7 ____ divided by 3 = 9 Problem 2: Mr. Lawton picks tomatoes from his garden. He divides the tomatoes into bags of Problem 3: a. Circle to show how many bags he packs. Then, skip-count to show the total number of tomatoes. b. Draw and label a tape diagram to represent the problem. ____ divided by 3 = ____ Mr. Lawton packs ____ bags of tomatoes. objects in each group using units of 3. 3. Camille buys a sheet of stamps that measures 15 centimeters long. Each stamp is 3 centimeters long. How many stamps does Camille buy? Draw and label a tape diagram to solve. Camille buys ____ stamps."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 13 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 174-185."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 13 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 13 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 174-185. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 13 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 174-185."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 13 objective: Interpret the quotient as the number of groups or the number of objects in each group using units of 3."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 13 Problem Set."
      }
    ]
  }
};
