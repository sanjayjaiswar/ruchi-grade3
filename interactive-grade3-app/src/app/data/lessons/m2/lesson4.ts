import type { LessonRuntimeConfig } from '../lesson-runtime.types';

export const M2_LESSON4_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "elapsed time",
    "number line"
  ],
  lessonAnimation: {
    kind: "number-line",
    title: "Lesson 4 animation: Solve word problems involving time intervals within 1 h",
    context: "T: Look back at your work on today's Application Problem.",
    equation: "5:31 p.m. + 12 minutes = 5:43 p.m.",
    teacherPrompt: "How are Problems 1 and 2 different? How did it affect the way you solved each problem?",
    conceptVisual: {
      title: "Match the time-story unknown to a clock and number-line model",
      sourceNote: "Teacher Edition Lesson 4, Concept Development and Debrief (pages 50-52).",
      sections: [
        { kind: "clock", label: "Start time", timeLabel: "5:31 p.m.", timeValue: "5:31", caption: "Begin at the known start." },
        {
          kind: "time-number-line",
          label: "Count 12 minutes forward efficiently",
          startLabel: "5:31 p.m.",
          endLabel: "5:43 p.m.",
          displayStartMinute: 0,
          displayEndMinute: 12,
          tickLabels: ["5:31", "5:35", "5:40", "5:43"],
          labelEvery: 1,
          points: [
            { label: "5:35", minute: 4 },
            { label: "5:40", minute: 9 },
            { label: "5:43", minute: 12 }
          ],
          jumps: [
            { label: "+4 min", fromMinute: 0, toMinute: 4 },
            { label: "+5 min", fromMinute: 4, toMinute: 9 },
            { label: "+3 min", fromMinute: 9, toMinute: 12 }
          ],
          showPointDetails: false,
          note: "4 + 5 + 3 = 12 minutes."
        },
        { kind: "clock", label: "End time", timeLabel: "5:43 p.m.", timeValue: "5:43", caption: "The later clock confirms the forward count." },
        {
          kind: "card-grid",
          label: "Three time-story structures",
          cards: [
            { label: "End unknown", sections: [{ kind: "equations", lines: ["10:15 + 23 min = 10:38"] }, { kind: "note", text: "Count forward from the start." }] },
            { label: "Elapsed unknown", sections: [{ kind: "equations", lines: ["11:57 − 11:24 = 33 min"] }, { kind: "note", text: "Find the distance between two times." }] },
            { label: "Start unknown", sections: [{ kind: "equations", lines: ["5:48 − 32 min = 5:16"] }, { kind: "note", text: "Count backward from the end." }] }
          ]
        }
      ]
    },
    focus: [
      "elapsed time",
      "number line",
      "clock",
      "source labels"
    ],
    timeLineModel: {
      ariaLabel: "Efficient elapsed-time jumps from 5:31 p.m. to 5:43 p.m.",
      startLabel: "5:31 p.m.",
      endLabel: "5:43 p.m.",
      segments: [
        { from: "5:31", to: "5:35", minutes: 4, label: "+4", unit: "minutes", emphasis: "ones" },
        { from: "5:35", to: "5:40", minutes: 5, label: "+5", unit: "minutes", emphasis: "benchmark" },
        { from: "5:40", to: "5:43", minutes: 3, label: "+3", unit: "minutes", emphasis: "ones" }
      ],
      unknownCases: [
        { label: "End unknown", known: "10:15 + 23 min", unknown: "end time", equation: "10:15 + 23 min = 10:38" },
        { label: "Elapsed unknown", known: "11:24 to 11:57", unknown: "minutes", equation: "11:57 − 11:24 = 33 min" },
        { label: "Start unknown", known: "end 5:48; elapsed 32 min", unknown: "start time", equation: "5:48 − 32 min = 5:16" }
      ]
    },
    conceptSteps: [
      { label: "Name the unknown", action: "Identify whether the story asks for the start, end, or elapsed minutes.", result: "The unknown determines the direction of the count." },
      { label: "Use efficient jumps", action: "Count to friendly 5-minute marks, then use remaining ones.", result: "4 + 5 + 3 = 12 minutes from 5:31 to 5:43." },
      { label: "Check direction", action: "Count forward for a later end or backward for an earlier start.", result: "The answer is placed correctly on the clock and number line." }
    ]
  },


  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 4: source objective",
      shortTitle: "Goal",
      studentPrompt: "Solve word problems involving time intervals within 1 hour by counting backward and forward using the number line and clock.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 50-60. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "T: Look back at your work on today's Application Problem. We know that Lilly Lesson 3 Template finished after Patrick. Let's use a number line to figure out how many more minutes than Patrick Lilly took to finish. Slip the number line Template into your personal white board. T: Label the first tick mark 0 and the last tick mark 60. Label the hours and 5-minute intervals. T: Plot the times 5:31 p.m. and 5:43 p.m.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 50-60. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "How are Problems 1 and 2 different? How did it affect the way you solved each problem?",
      teacherEditionBasis: "Problem Set (10 minutes): Students complete the Lesson 4 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition.",
      visualModel: "clock"
    },
    {
      id: "source-picture",
      title: "Student workbook Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Use the official Module 2 Lesson 4 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence.",
      teacherEditionBasis: "Module 2 student workbook, Lesson 4 Problem Set.",
      visualModel: "clock"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Use the official Lesson 4 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 50-60.",
      visualModel: "clock"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 50-60. Lesson 4 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "clock"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 4 objective: Solve word problems involving time intervals within 1 hour by counting backward and forward using the number line and clock.",
      teacherEditionBasis: "Module 2 Teacher Edition, lesson pages 50-60.",
      visualModel: "clock"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 50-60. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Solve word problems involving time intervals within 1 hour by counting backward and forward using the number line and clock."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 50-60. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "T: Look back at your work on today's Application Problem. We know that Lilly Lesson 3 Template finished after Patrick. Let's use a number line to figure out how many more minutes than Patrick Lilly took to finish. Slip the number line Template into your personal white board. T: Label the first tick mark 0 and the last tick mark 60. Label the hours and 5-minute intervals. T: Plot the times 5:31 p.m. and 5:43 p.m."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes): Students complete the Lesson 4 Problem Set using the official Module 2 measurement models, prompts, and units from the Teacher Edition."
      },
      {
        label: "Source text",
        value: "How are Problems 1 and 2 different? How did it affect the way you solved each problem?"
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 2 student workbook, Lesson 4 Problem Set."
      },
      {
        label: "Source text",
        value: "Use the official Module 2 Lesson 4 Problem Set prompts in order. Blank mode preserves the student-facing work structure; Solved mode applies the Teacher Edition answer/check evidence."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 50-60."
      },
      {
        label: "Source text",
        value: "Use the official Lesson 4 Problem Set workspace and source-backed measurement visuals to model and solve the student-facing problems."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf, pages 50-60. Lesson 4 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 4 Problem Set."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 2 Teacher Edition, lesson pages 50-60."
      },
      {
        label: "Source text",
        value: "Debrief focus: connect the Problem Set models, units, and answers to the Lesson 4 objective: Solve word problems involving time intervals within 1 hour by counting backward and forward using the number line and clock."
      },
      {
        label: "Workbook",
        value: "Module 2 student workbook, Lesson 4 Problem Set."
      }
    ]
  }
};
