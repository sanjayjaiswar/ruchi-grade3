import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON21_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "addend",
    "round",
    "number line"
  ],
  lessonAnimation: {
    kind: "measurement",
    title: "Lesson 21 animation: measurement reasonableness cycle",
    context: "Follow the Teacher Edition sequence across weight and liquid volume: measure, round, estimate, solve exactly, and compare the two answers.",
    equation: "A small estimate-to-exact gap is evidence that the exact measurement answer is reasonable.",
    teacherPrompt: "How can you use measurement as a tool for checking whether or not your answers are reasonable?",
    conceptVisual: {
      title: "Measure, round, estimate, solve exactly, and compare",
      sourceNote: "Teacher Edition Lesson 21, Concept Development measurement stations (pages 257-259).",
      sections: [
        {
          kind: "measurement-model",
          label: "Weight station: scale readings",
          model: "mass",
          unitLabel: "g",
          maxValue: 100,
          values: [
            { label: "beans", value: 91, valueLabel: "91 g", tone: "target" },
            { label: "rice", value: 58, valueLabel: "58 g", tone: "given" }
          ],
          equation: "91 g + 58 g = 149 g; 91 g − 58 g = 33 g",
          steps: ["Read the digital scale.", "Round 91 g to 90 g and 58 g to 60 g.", "Compare exact answers with 150 g and 30 g estimates."],
          note: "The 1 g and 3 g gaps support reasonableness."
        },
        {
          kind: "measurement-model",
          label: "Liquid-volume station: marked containers",
          model: "liquid",
          unitLabel: "mL",
          maxValue: 250,
          values: [
            { label: "container D", value: 212, valueLabel: "212 mL", tone: "given" },
            { label: "container E", value: 238, valueLabel: "238 mL", tone: "target" },
            { label: "container F", value: 195, valueLabel: "195 mL", tone: "benchmark" }
          ],
          equation: "212 + 238 + 195 = 645 mL; estimate 210 + 240 + 200 = 650 mL",
          steps: ["Read each marked container.", "Round each value to a nearby ten.", "Use the 5 mL gap to check the exact sum."],
          note: "Reasonableness comes from a nearby estimate built from the actual measurements."
        },
        {
          kind: "data-table",
          label: "Reasonableness cycle",
          columns: ["Measured", "Rounded", "Estimate", "Exact", "Gap"],
          rows: [
            ["91 g + 58 g", "90 g + 60 g", "150 g", "149 g", "1 g"],
            ["91 g − 58 g", "90 g − 60 g", "30 g", "33 g", "3 g"],
            ["212 + 238 + 195 mL", "210 + 240 + 200 mL", "650 mL", "645 mL", "5 mL"]
          ]
        }
      ]
    },
    focus: [
      "addend",
      "round",
      "number line",
      "source labels"
    ],
    measurementChecks: {
      steps: ["measure", "round", "estimate", "solve exactly", "check the gap"],
      rows: [
        {
          label: "beans + rice",
          measured: "91 g + 58 g",
          rounded: "90 g + 60 g",
          estimate: "150 g",
          exact: "149 g",
          gap: "1 g"
        },
        {
          label: "beans - rice",
          measured: "91 g - 58 g",
          rounded: "90 g - 60 g",
          estimate: "30 g",
          exact: "33 g",
          gap: "3 g"
        },
        {
          label: "containers D + E + F",
          measured: "212 + 238 + 195 mL",
          rounded: "210 + 240 + 200 mL",
          estimate: "650 mL",
          exact: "645 mL",
          gap: "5 mL"
        }
      ]
    }
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 21: source objective",
      shortTitle: "Goal",
      studentPrompt: "Estimate sums and differences of measurements by rounding, and then solve mixed word problems.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "Students measure beans and rice, yarn, and liquid volume, then round to estimate sums and differences before using exact arithmetic to solve.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How can you use measurement as a tool for checking whether or not your answers are reasonable?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 21 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "measurement"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 21 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 21 Problem Set.",
      visualModel: "measurement"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 21 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 257-266.",
      visualModel: "measurement"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "measurement"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 21 objective: Estimate sums and differences of measurements by rounding, and then solve mixed word problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 257-266.",
      visualModel: "measurement"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Estimate sums and differences of measurements by rounding, and then solve mixed word problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Students measure beans and rice, yarn, and liquid volume, then round to estimate sums and differences before using exact arithmetic to solve."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 21 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "How can you use measurement as a tool for checking whether or not your answers are reasonable?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 21 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 257-266."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 21 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 257-266. Lesson 21 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 257-266."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 21 objective: Estimate sums and differences of measurements by rounding, and then solve mixed word problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 21 Problem Set."
      }
    ]
  }
};
