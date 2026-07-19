import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON12_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "round",
    "number line"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Lesson 12 animation: round measurements to the nearest ten",
    context: "Place the measurement between two tens, mark halfway, then choose the closer ten.",
    equation: "73 mL is between 70 and 80; 73 is below halfway, so 70 mL",
    teacherPrompt: "Discuss round and about. Connect each measured value to its two surrounding tens and the halfway mark on a vertical number line.",
    conceptVisual: {
      title: "Measure first, then round the measurement to the nearest ten",
      sourceNote: "Teacher Edition Lesson 12, measurement stations and debrief (pages 150-152).",
      sections: [
        {
          kind: "measurement-model",
          label: "Use the correct measurement tool",
          model: "conversion",
          values: [
            { label: "ruler or meter stick", valueLabel: "length in cm", tone: "given" },
            { label: "digital scale", valueLabel: "mass in g", tone: "target" },
            { label: "beaker", valueLabel: "liquid volume in mL", tone: "benchmark" }
          ],
          steps: ["Measure the object.", "Name the two tens around the measurement.", "Use halfway to round."],
          note: "The tool supplies the actual measurement; rounding describes it as about a nearby ten."
        },
        {
          kind: "number-line",
          label: "The Teacher Edition rounding line is vertical",
          orientation: "vertical",
          ticks: [
            { label: "70 mL", rounded: true },
            { label: "75 mL (halfway)" },
            { label: "80 mL" }
          ],
          targetMarker: { label: "73 mL", position: 30 },
          caption: "73 mL is below 75 mL, so it rounds to about 70 mL."
        },
        {
          kind: "data-table",
          label: "Official station recording structure",
          columns: ["Station", "Measure", "Between", "Nearest ten"],
          rows: [
            ["shoe, desk, pencil, paper", "____ cm", "____ and ____ cm", "about ____ cm"],
            ["rice bags A-E", "____ g", "____ and ____ g", "about ____ g"],
            ["containers A-E", "____ mL", "____ and ____ mL", "about ____ mL"]
          ]
        }
      ]
    },
    focus: [
      "round",
      "number line",
      "source labels"
    ],
    numberLineLabels: [
      "70",
      "73",
      "75",
      "80"
    ],
    numberLineJumps: [
      "+3",
      "+2 to halfway",
      "+5 to upper ten"
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 12: source objective",
      shortTitle: "Goal",
      studentPrompt: "Round two-digit measurements to the nearest ten on the vertical number line.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 150-159. Lesson 12 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "S: 73 milliliters is less than halfway between 70 and 80 milliliters. I know because 3 is less than 5, and 5 marks not the exact amount. students represent the tens. A third student represents the number that is Continue with the following possible sequence: 61 centimeters, halfway. A fourth student represents 38 minutes, and 25 grams. For each example, show how the the number being rounded.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 150-159. Lesson 12 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Discuss new vocabulary from today's lesson: round and about. Connect the discussion to rounding two-digit measurements to the nearest ten on the vertical number line.",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 12 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "number-line"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 12 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 12 Problem Set.",
      visualModel: "number-line"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 12 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 150-159.",
      visualModel: "number-line"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 150-159. Lesson 12 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "number-line"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 12 objective: Round two-digit measurements to the nearest ten on the vertical number line.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 150-159.",
      visualModel: "number-line"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 150-159. Lesson 12 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Round two-digit measurements to the nearest ten on the vertical number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 150-159. Lesson 12 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "S: 73 milliliters is less than halfway between 70 and 80 milliliters. I know because 3 is less than 5, and 5 marks not the exact amount. students represent the tens. A third student represents the number that is Continue with the following possible sequence: 61 centimeters, halfway. A fourth student represents 38 minutes, and 25 grams. For each example, show how the the number being rounded."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 12 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "Discuss new vocabulary from today's lesson: round and about. Connect the discussion to rounding two-digit measurements to the nearest ten on the vertical number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 12 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 12 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 150-159."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 12 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 150-159. Lesson 12 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 12 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 150-159."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 12 objective: Round two-digit measurements to the nearest ten on the vertical number line."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 12 Problem Set."
      }
    ]
  }
};
