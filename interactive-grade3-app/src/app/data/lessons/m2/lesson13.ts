import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON13_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "number line",
    "round"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Round two- and three-digit numbers on a vertical number line",
    context: "Find the two bounding tens, mark the halfway number, then move to the closer ten. The same model works when the number has two digits or three digits.",
    equation: "28 is 2 away from 30; 162 is 2 away from 160",
    teacherPrompt: "What is the same and different about Problems 1(c) and 1(d)? Did you solve the problems differently? Why or why not?",
    focus: [
      "number line",
      "round",
      "source labels"
    ],
    numberLineExamples: [
      {
        label: "Teacher model: 28 minutes",
        lower: "20",
        halfway: "25",
        upper: "30",
        target: "28",
        rounded: "30",
        targetPosition: 80,
        direction: "up",
        distance: "2 away"
      },
      {
        label: "Problem Set: 162",
        lower: "160",
        halfway: "165",
        upper: "170",
        target: "162",
        rounded: "160",
        targetPosition: 20,
        direction: "down",
        distance: "2 away"
      }
    ],
    conceptSteps: [
      {
        label: "Bound it",
        action: "Write the lower and upper tens.",
        result: "28 is between 20 and 30; 162 is between 160 and 170."
      },
      {
        label: "Mark halfway",
        action: "Add 5 to the lower ten.",
        result: "25 and 165 split each interval into two equal distances."
      },
      {
        label: "Choose the closer ten",
        action: "Follow the shorter distance from the target dot.",
        result: "28 rounds to 30; 162 rounds to 160."
      }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 13: source objective",
      shortTitle: "Goal",
      studentPrompt: "Round two- and three-digit numbers to the nearest ten on the vertical number line.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 160-170. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Round two-digit measurements to the nearest ten. T: Let's round 28 minutes to the nearest 10 minutes. T: How many tens are in 28? (Show place value cards for 28.) S: 2 tens! (Pull apart the cards to show the 2 tens as 20. Perhaps cover the zero in the ones to clarify the interpretation of 20 as 2 tens.) T: Draw a tick mark near the bottom of the number line. To the right, label it 20 = 2 tens.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 160-170. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "What is the same and different about Problems 1(c) and 1(d)? Did you solve the problems differently? Why or why not?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 13 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "number-line"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 13 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 13 Problem Set.",
      visualModel: "number-line"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 13 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 160-170.",
      visualModel: "number-line"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 160-170. Lesson 13 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 13 objective: Round two- and three-digit numbers to the nearest ten on the vertical number line.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 160-170.",
      visualModel: "number-line"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 160-170. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Round two- and three-digit numbers to the nearest ten on the vertical number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 160-170. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Round two-digit measurements to the nearest ten. T: Let's round 28 minutes to the nearest 10 minutes. T: How many tens are in 28? (Show place value cards for 28.) S: 2 tens! (Pull apart the cards to show the 2 tens as 20. Perhaps cover the zero in the ones to clarify the interpretation of 20 as 2 tens.) T: Draw a tick mark near the bottom of the number line. To the right, label it 20 = 2 tens."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 13 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "What is the same and different about Problems 1(c) and 1(d)? Did you solve the problems differently? Why or why not?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 13 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 13 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 160-170."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 13 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 160-170. Lesson 13 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 13 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 160-170."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 13 objective: Round two- and three-digit numbers to the nearest ten on the vertical number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 13 Problem Set."
      }
    ]
  }
};
