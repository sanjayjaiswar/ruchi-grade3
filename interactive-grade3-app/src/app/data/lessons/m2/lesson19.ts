import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON19_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "decompose"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Lesson 19 animation: subtract measurements and decompose twice",
    context: "Subtract 700 milliliters minus 452 milliliters. Decompose 1 hundred as 10 tens, then 1 ten as 10 ones before subtracting.",
    equation: "700 mL - 452 mL = 248 mL",
    teacherPrompt: "Why is it important to unbundle units before subtracting across zeros?",
    focus: [
      "decompose",
      "measurement",
      "source labels"
    ],
    measurementTicks: [
      "700 mL",
      "-452 mL",
      "0 ones too small",
      "decompose twice",
      "248 mL",
      "unit stays mL"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 19: source objective",
      shortTitle: "Goal",
      studentPrompt: "Decompose twice to subtract measurements including three-digit minuends with zeros in the tens and ones places.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 233-242. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Part 1: Decompose twice using the standard algorithm for subtraction. T: In the Application Problem, Jolene's apple weighs 223 grams and her orange weighs 194 grams. (Draw or project the tape diagrams shown at right.) What does the question mark in these tape diagrams represent? S: How much heavier the apple is than the orange. -> How much more the apple weighs, in grams.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 233-242. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Why is it important to unbundle units before subtracting across zeros?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 19 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "measurement"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 19 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 19 Problem Set.",
      visualModel: "measurement"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 19 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 233-242.",
      visualModel: "measurement"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 233-242. Lesson 19 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 19 objective: Decompose twice to subtract measurements including three-digit minuends with zeros in the tens and ones places.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 233-242.",
      visualModel: "measurement"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 233-242. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Decompose twice to subtract measurements including three-digit minuends with zeros in the tens and ones places."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 233-242. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Part 1: Decompose twice using the standard algorithm for subtraction. T: In the Application Problem, Jolene's apple weighs 223 grams and her orange weighs 194 grams. (Draw or project the tape diagrams shown at right.) What does the question mark in these tape diagrams represent? S: How much heavier the apple is than the orange. -> How much more the apple weighs, in grams."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 19 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Why is it important to unbundle units before subtracting across zeros?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 19 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 19 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 233-242."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 19 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 233-242. Lesson 19 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 19 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 233-242."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 19 objective: Decompose twice to subtract measurements including three-digit minuends with zeros in the tens and ones places."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 19 Problem Set."
      }
    ]
  }
};
