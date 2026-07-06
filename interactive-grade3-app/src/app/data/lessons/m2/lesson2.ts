import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON2_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "elapsed time",
    "number line"
  ],
  lessonAnimation: {
    kind: "clock",
    title: "Lesson 2 animation: Relate skip-counting by fives on the clock and telling",
    context: "Part 1: Draw a number line and relate skip-counting by fives to skip-counting intervals of 5 minutes.",
    equation: "5 sec start -> 5 sec elapsed -> 7 sec end",
    teacherPrompt: "Model the Application Problem using the tape diagram on the template",
    focus: [
      "elapsed time",
      "number line",
      "clock",
      "source labels"
    ],
    clockLabels: [
      "5 sec start",
      "5 sec elapsed",
      "7 sec end"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 2: source objective",
      shortTitle: "Goal",
      studentPrompt: "Relate skip-counting by fives on the clock and telling time to a continuous measurement model, the number line.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 24-36. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Draw a number line and relate skip-counting by fives to skip-counting intervals of 5 minutes. Students place the tape diagram template in personal white boards. T: Model the Application Problem using the tape diagram on the template.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 24-36. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Model the Application Problem using the tape diagram on the template",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 2 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "clock"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 2 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 2 Problem Set.",
      visualModel: "clock"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 2 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 24-36.",
      visualModel: "clock"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 24-36. Lesson 2 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 2 objective: Relate skip-counting by fives on the clock and telling time to a continuous measurement model, the number line.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 24-36.",
      visualModel: "clock"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 24-36. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Relate skip-counting by fives on the clock and telling time to a continuous measurement model, the number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 24-36. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Draw a number line and relate skip-counting by fives to skip-counting intervals of 5 minutes. Students place the tape diagram template in personal white boards. T: Model the Application Problem using the tape diagram on the template."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 2 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Model the Application Problem using the tape diagram on the template"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 2 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 2 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 24-36."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 2 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 24-36. Lesson 2 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 2 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 24-36."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 2 objective: Relate skip-counting by fives on the clock and telling time to a continuous measurement model, the number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 2 Problem Set."
      }
    ]
  }
};
