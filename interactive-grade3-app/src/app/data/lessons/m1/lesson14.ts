import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M1_LESSON14_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "array"
  ],
  lessonAnimation: {
    kind: "equal-groups",
    title: "Lesson 14 animation: skip-count by fours",
    context: "Show 6 groups of 4 and count 4, 8, 12, 16, 20, 24 while tracking the group count.",
    equation: "6 x 4 = 24",
    teacherPrompt: "How many groups of 4 have been counted?",
    groupCount: 6,
    groupSize: 4,
    rowCount: 6,
    columnCount: 4,
    tapePartCount: 6,
    tapePartLabel: "4",
    tapeWholeLabel: "24 total",
    focus: [
      "Units of 4",
      "Skip-counting",
      "Fact fluency"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 14: source objective",
      shortTitle: "Goal",
      studentPrompt: "Skip-count objects in models to build fluency with multiplication facts.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 188-199. Lesson 14 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "to the array out of order, for example, 4 x 4, 9 x 4, etc.) 28 32 S: (Write expressions and equal signs next to each answer.) 36 40 T: I will say the answer; you say the equation. 20. S: 20 = 5 x 4",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 188-199. Lesson 14 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Discuss differences between the tape diagrams and unknowns in Problems 2 and 3. (In MP.4 Problem 2, the value of the unit is four, and in Problem 3, the number 4 represents the number of units.)",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 14 Problem Set using the lesson models from the Teacher Edition.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: Skip-count by fours. Match each answer to the appropriate expression. 4 6x4 8 10 x 4 5x4 1x4 4x4 9x4 2x4 8x4 7x4 3x4. Problem 2: Mr. Schmidt replaces each of the 4 wheels on 7 cars. How many wheels does he replace? Draw and label a tape diagram to solve. Mr. Schmidt replaces ____ wheels. Problem 3: Trina makes 4 bracelets. Each bracelet has 6 beads. Draw and label a tape diagram to show the total number of beads Trina uses.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 14 Problem Set.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 14 Problem Set workspace and source-backed visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 188-199.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 188-199. Lesson 14 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models and answers to the Lesson 14 objective: Skip-count objects in models to build fluency with multiplication facts.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 188-199.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 188-199. Lesson 14 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Skip-count objects in models to build fluency with multiplication facts."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 14 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 188-199. Lesson 14 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "to the array out of order, for example, 4 x 4, 9 x 4, etc.) 28 32 S: (Write expressions and equal signs next to each answer.) 36 40 T: I will say the answer; you say the equation. 20. S: 20 = 5 x 4"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 14 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 14 Problem Set using the lesson models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Discuss differences between the tape diagrams and unknowns in Problems 2 and 3. (In MP.4 Problem 2, the value of the unit is four, and in Problem 3, the number 4 represents the number of units.)"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 14 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 14 Problem Set."
      },
      {
        label: "Source text",
        value: "Problem 1: Skip-count by fours. Match each answer to the appropriate expression. 4 6x4 8 10 x 4 5x4 1x4 4x4 9x4 2x4 8x4 7x4 3x4. Problem 2: Mr. Schmidt replaces each of the 4 wheels on 7 cars. How many wheels does he replace? Draw and label a tape diagram to solve. Mr. Schmidt replaces ____ wheels. Problem 3: Trina makes 4 bracelets. Each bracelet has 6 beads. Draw and label a tape diagram to show the total number of beads Trina uses."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 14 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 188-199."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 14 Problem Set workspace and source-backed visuals to model and solve the student-facing problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 14 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 188-199. Lesson 14 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 14 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 188-199."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models and answers to the Lesson 14 objective: Skip-count objects in models to build fluency with multiplication facts."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 14 Problem Set."
      }
    ]
  }
};
