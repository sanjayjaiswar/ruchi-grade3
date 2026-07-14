import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON19_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "decompose"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Decompose twice to subtract 223 g - 194 g",
    context: "The Teacher Edition begins with Jolene's apple and orange. First unbundle 1 ten for the ones place; then unbundle 1 hundred for the tens place before subtracting.",
    equation: "223 g - 194 g = 29 g",
    teacherPrompt: "Why is it important to unbundle units before subtracting across zeros?",
    focus: [
      "decompose",
      "measurement",
      "source labels"
    ],
    measurementTicks: [
      "223 g",
      "-194 g",
      "3 ones and 2 tens too small",
      "decompose twice",
      "29 g",
      "unit stays g"
    ],
    placeValueSubtraction: {
      unit: "g",
      columns: ["hundreds", "tens", "ones"],
      minuendLabel: "223 g",
      subtrahendLabel: "194 g",
      beforeDigits: [2, 2, 3],
      afterDigits: [1, 11, 13],
      subtrahendDigits: [1, 9, 4],
      resultDigits: ["", "2", "9"],
      decompositions: [
        { fromColumn: 1, toColumn: 2, label: "1 ten -> 10 ones" },
        { fromColumn: 0, toColumn: 1, label: "1 hundred -> 10 tens" }
      ],
      result: "29 g"
    },
    conceptSteps: [
      {
        label: "Prepare the ones",
        action: "3 ones cannot subtract 4 ones, so unbundle 1 ten.",
        result: "223 becomes 2 hundreds, 1 ten, 13 ones."
      },
      {
        label: "Prepare the tens",
        action: "1 ten cannot subtract 9 tens, so unbundle 1 hundred.",
        result: "The minuend becomes 1 hundred, 11 tens, 13 ones."
      },
      {
        label: "Subtract after preparing",
        action: "Subtract 194 from the decomposed 223 by place value.",
        result: "223 g - 194 g = 29 g."
      }
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
