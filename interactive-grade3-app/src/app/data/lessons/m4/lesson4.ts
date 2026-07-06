import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M4_LESSON4_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [],
  lessonAnimation: {
    kind: "area-model",
    title: "Lesson 4 animation: Relate side lengths with the number of tiles on a side.",
    context: "Use the Teacher Edition Lesson 4 area model to connect the official figure, side lengths, unit squares, and area equation.",
    equation: "5 rows x 4 columns = 20 square units",
    teacherPrompt: "How does the official area model show relate side lengths with the number of tiles on a side.?",
    focus: [
      "area model",
      "source labels"
    ],
    areaRows: 5,
    areaColumns: 4,
    rowCount: 5,
    columnCount: 4
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 4: source objective",
      shortTitle: "Goal",
      studentPrompt: "Relate side lengths with the number of tiles on a side.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 44-56. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Use the Teacher Edition Lesson 4 area model to connect the official figure, side lengths, unit squares, and area equation.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 44-56. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Tell a partner how you could use square centimeter tiles to check your work in Problem 1",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 4 Problem Set using the official Module 4 area, unit-square, rectangle, decomposition, and floor-plan models from the Teacher Edition.",
      visualModel: "area-model"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 4 Lesson 4 Problem Set prompts in order. Blank mode preserves the student-facing area figure/workspace; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 4 student workbook, Lesson 4 Problem Set.",
      visualModel: "area-model"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 4 Problem Set workspace and source-backed area visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 4 Teacher Edition, lesson pages 44-56.",
      visualModel: "area-model"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 44-56. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "area-model"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set area models, units, equations, and answers to the Lesson 4 objective: Relate side lengths with the number of tiles on a side.",
      teacherEditionBasis: "Module 4 Teacher Edition, lesson pages 44-56.",
      visualModel: "area-model"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 44-56. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Relate side lengths with the number of tiles on a side."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 44-56. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the Teacher Edition Lesson 4 area model to connect the official figure, side lengths, unit squares, and area equation."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 4 Problem Set using the official Module 4 area, unit-square, rectangle, decomposition, and floor-plan models from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Tell a partner how you could use square centimeter tiles to check your work in Problem 1"
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 4 student workbook, Lesson 4 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 4 Lesson 4 Problem Set prompts in order. Blank mode preserves the student-facing area figure/workspace; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 4 Teacher Edition, lesson pages 44-56."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 4 Problem Set workspace and source-backed area visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf, pages 44-56. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 4 Teacher Edition, lesson pages 44-56."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set area models, units, equations, and answers to the Lesson 4 objective: Relate side lengths with the number of tiles on a side."
      },
      {
        label: "Workbook",
        value: "Module 4 student workbook, Lesson 4 Problem Set."
      }
    ]
  }
};
