import type { LessonRuntimeConfig } from '../lesson-runtime.types';

const lesson12TeacherEditionPages = Array.from(
  { length: 12 },
  (_, index) => `/source-pages/m1-teacher/page-${String(index + 162).padStart(3, '0')}.png`
);

export const M1_LESSON12_RUNTIME: LessonRuntimeConfig = {
  conceptTerms: [
    "quotient",
    "division"
  ],
  problemSetCenteredLesson: {
    title: "Lesson 12 concept: what the quotient means",
    concept: "When we divide, the total is known. The quotient can tell how many groups there are, or it can tell how many are in each group. The story tells which meaning is correct.",
    teacherEditionBasis: "The Teacher Edition compares two situations for the same division sentence, 8 divided by 2 = 4. In one situation, 4 means objects in each group. In the other situation, 4 means the number of groups.",
    contrast: "Before accepting an answer, name what the quotient means: groups, or objects in each group.",
    summary: "In division, the total is known. Use the story to decide whether the quotient tells how many groups or how many are in each group.",
    sourceNote: "Teacher Edition Lesson 12 pages 162-173 are the source of truth for the concept development, Problem Set, and Student Debrief.",
    sourcePageImages: lesson12TeacherEditionPages,
    blankSourcePageImages: lesson12TeacherEditionPages,
    solvedSourcePageImages: lesson12TeacherEditionPages,
    conceptSections: [
      {
        title: "1. Quotient as objects in each group",
        body: "The Teacher Edition starts with 8 crackers shared equally by 2 students. The total and number of groups are known, so the unknown is the number of crackers in each student part. The matching sentence is 8 divided by 2 = 4.",
        teacherSource: "Teacher Edition Lesson 12 Concept Development, Problem 1, printed page 160.",
        checkpoints: [
          "The whole is 8 crackers.",
          "The diagram has 2 equal parts for 2 students.",
          "The quotient 4 names crackers in each part."
        ]
      },
      {
        title: "2. Quotient as number of groups",
        body: "The Teacher Edition then changes the situation: there are 8 crackers and each student gets 2. The total and size of each group are known, so the unknown is the number of groups. The matching sentence is still 8 divided by 2 = 4.",
        teacherSource: "Teacher Edition Lesson 12 Concept Development, Problem 2, printed page 161.",
        checkpoints: [
          "The whole is still 8 crackers.",
          "Each unit is a group of 2 crackers.",
          "The quotient 4 names how many groups are needed."
        ]
      },
      {
        title: "3. Same sentence, different meaning",
        body: "The Teacher Edition reflective dialogue says the same division sentence can have different tape diagrams because the 2 and the 4 represent different things. In division, the total is known; the question is whether division finds group size or number of groups.",
        teacherSource: "Teacher Edition Lesson 12 reflective dialogue, printed page 162.",
        checkpoints: [
          "Say what the 2 means before solving.",
          "Say what the 4 means after solving.",
          "Use the story to decide how the tape diagram should be drawn."
        ]
      },
      {
        title: "4. Problem Set validation focus",
        body: "The Teacher Edition tells students to solve the Problem Set and use RDW when no method is specified. The Debrief asks students to compare Problems 1 and 2 and explain how quotient meaning affects the tape diagram.",
        teacherSource: "Teacher Edition Problem Set and Student Debrief, printed pages 162-163.",
        checkpoints: [
          "Read the exact Teacher Edition problem first.",
          "Draw or label the model from the known quantities.",
          "Validate that the answer sentence names what the quotient represents."
        ]
      }
    ],
    problems: [
      {
        number: 1,
        sourcePrompt: "There are 8 birds at the pet store. Two birds are in each cage. Circle to show how many cages there are.",
        blankPrompts: ["Circle to show how many cages there are."],
        blankEquations: ["8 divided by 2 = ____"],
        blankAnswerSentence: "There are ____ cages of birds.",
        blankWorkspaceLabel: "Draw or circle 8 birds into groups of 2.",
        blankVisualType: "object-bank",
        solvedAnswer: "There are 4 cages of birds.",
        equations: ["8 divided by 2 = 4"],
        knownTotal: 8,
        knownGroupSize: 2,
        quotient: 4,
        quotientMeaning: "The quotient 4 means the number of cages, or groups.",
        animationType: "grouping-by-size",
        unitLabel: "birds",
        groupLabel: "cages",
        explanation: "Start with 8 birds. Each cage must hold 2 birds. Make groups of 2 until all 8 birds are used. There are 4 groups, so the quotient means 4 cages.",
        validationChecks: [
          "The work shows 8 total birds.",
          "Each group has exactly 2 birds.",
          "The answer sentence says 4 cages, not just 4."
        ]
      },
      {
        number: 2,
        sourcePrompt: "The pet store sells 10 fish. They equally divide the fish into 5 bowls. Draw fish to find the number in each bowl.",
        blankPrompts: ["Draw fish to find the number in each bowl."],
        blankEquations: ["5 times ____ = 10", "10 divided by 5 = ____"],
        blankAnswerSentence: "There are ____ fish in each bowl.",
        blankWorkspaceLabel: "Show 5 bowls and share 10 fish equally.",
        blankVisualType: "equal-containers",
        solvedAnswer: "There are 2 fish in each bowl.",
        equations: ["5 times 2 = 10", "10 divided by 5 = 2"],
        knownTotal: 10,
        knownGroupCount: 5,
        quotient: 2,
        quotientMeaning: "The quotient 2 means the number of fish in each bowl.",
        animationType: "equal-sharing",
        unitLabel: "fish",
        groupLabel: "bowls",
        explanation: "Start with 5 bowls because the number of groups is known. Share 10 fish equally across the bowls. Each bowl gets 2 fish, so the quotient means the size of each group.",
        validationChecks: [
          "The work shows 5 bowls.",
          "All 10 fish are used.",
          "Each bowl has 2 fish."
        ]
      },
      {
        number: 3,
        sourcePrompt: "Match the division facts: 10 divided by 2, 18 divided by 2, 12 divided by 2, 16 divided by 2, and 14 divided by 2.",
        blankPrompts: ["Match each division fact to its quotient."],
        blankEquations: ["10 divided by 2", "18 divided by 2", "12 divided by 2", "16 divided by 2", "14 divided by 2"],
        blankWorkspaceLabel: "Use skip-counting by twos or known facts to match.",
        blankVisualType: "fact-match",
        solvedAnswer: "10 divided by 2 = 5, 18 divided by 2 = 9, 12 divided by 2 = 6, 16 divided by 2 = 8, and 14 divided by 2 = 7.",
        equations: ["10 divided by 2 = 5", "18 divided by 2 = 9", "12 divided by 2 = 6", "16 divided by 2 = 8", "14 divided by 2 = 7"],
        quotient: 5,
        quotientMeaning: "Each quotient is the matching division fact value for units of 2.",
        animationType: "fact-match",
        unitLabel: "objects",
        groupLabel: "matches",
        explanation: "Each fact asks how many twos are in the total. Count by twos or use known division facts to match each total with its quotient.",
        validationChecks: [
          "Every division fact is matched once.",
          "Each match can be checked by multiplying the quotient by 2.",
          "The matched quotients are 5, 9, 6, 8, and 7."
        ],
        facts: [
          { dividend: 10, divisor: 2, quotient: 5 },
          { dividend: 18, divisor: 2, quotient: 9 },
          { dividend: 12, divisor: 2, quotient: 6 },
          { dividend: 16, divisor: 2, quotient: 8 },
          { dividend: 14, divisor: 2, quotient: 7 }
        ]
      },
      {
        number: 4,
        sourcePrompt: "Laina buys 14 meters of ribbon. She cuts her ribbon into 2 equal pieces. How many meters long is each piece?",
        blankPrompts: ["Label the tape diagram to represent the problem, including the unknown."],
        blankEquations: ["14 divided by 2 = ____"],
        blankAnswerSentence: "Each piece is ____ meters long.",
        blankWorkspaceLabel: "Draw one 14-meter tape split into 2 equal pieces.",
        blankVisualType: "tape-diagram",
        solvedAnswer: "Each piece is 7 meters long.",
        equations: ["14 divided by 2 = 7"],
        knownTotal: 14,
        knownGroupCount: 2,
        quotient: 7,
        quotientMeaning: "The quotient 7 means the length of each equal piece.",
        animationType: "tape-split",
        unitLabel: "meters",
        groupLabel: "pieces",
        explanation: "The whole tape is 14 meters. It is split into 2 equal pieces. Each piece is 7 meters because 7 plus 7 equals 14.",
        validationChecks: [
          "The tape diagram labels the whole as 14 meters.",
          "The tape is split into 2 equal parts.",
          "Each part is labeled 7 meters."
        ]
      },
      {
        number: 5,
        sourcePrompt: "Roy eats 2 cereal bars every morning. Each box has a total of 12 bars. How many days will it take Roy to finish 1 box?",
        blankPrompts: ["Show or explain how many groups of 2 bars are in 12 bars."],
        blankEquations: ["12 divided by 2 = ____"],
        blankAnswerSentence: "It will take Roy ____ days to finish 1 box.",
        blankWorkspaceLabel: "Group 12 bars into days of 2 bars each.",
        blankVisualType: "bar-units",
        solvedAnswer: "It will take Roy 6 days to finish 1 box.",
        equations: ["12 divided by 2 = 6"],
        knownTotal: 12,
        knownGroupSize: 2,
        quotient: 6,
        quotientMeaning: "The quotient 6 means the number of days, or groups of 2 bars.",
        animationType: "grouping-by-size",
        unitLabel: "bars",
        groupLabel: "days",
        explanation: "Start with 12 bars. Roy eats 2 bars each day. Make groups of 2 bars; each group is one day. There are 6 groups, so it takes 6 days.",
        validationChecks: [
          "The work shows 12 total bars.",
          "Each day uses 2 bars.",
          "The answer says 6 days."
        ]
      },
      {
        number: 6,
        sourcePrompt: "Sarah and Esther equally share the cost of a present. The present costs 18 dollars. How much does Sarah pay?",
        blankPrompts: ["Draw or label two equal shares of the 18-dollar cost."],
        blankEquations: ["18 divided by 2 = ____"],
        blankAnswerSentence: "Sarah pays ____ dollars.",
        blankWorkspaceLabel: "Split 18 dollars equally between Sarah and Esther.",
        blankVisualType: "share-tape",
        solvedAnswer: "Sarah pays 9 dollars.",
        equations: ["18 divided by 2 = 9"],
        knownTotal: 18,
        knownGroupCount: 2,
        quotient: 9,
        quotientMeaning: "The quotient 9 means the size of each person's share.",
        animationType: "tape-split",
        unitLabel: "dollars",
        groupLabel: "shares",
        explanation: "The total cost is 18 dollars. Sarah and Esther make 2 equal shares. Each share is 9 dollars, so Sarah pays 9 dollars.",
        validationChecks: [
          "The model shows 18 dollars total.",
          "The cost is split into 2 equal shares.",
          "Sarah's share is labeled 9 dollars."
        ],
        shareLabels: ["Sarah", "Esther"]
      }
    ]
  },
  lessonAnimation: {
    kind: "tape-diagram",
    title: "Lesson 12 animation: quotient with units of 2",
    context: "Show units of 2 and require the answer to be interpreted as groups or objects per group.",
    equation: "10 divided by 2 = 5",
    teacherPrompt: "What does the quotient 5 mean in this context?",
    groupCount: 5,
    groupSize: 2,
    rowCount: 2,
    columnCount: 5,
    tapePartCount: 5,
    tapePartLabel: "2 each",
    tapeWholeLabel: "10 total",
    focus: [
      "Units of 2",
      "Quotient",
      "Meaning in words"
    ]
  },
  teacherEditionSteps: [
    {
      id: "source-goal",
      title: "Lesson 12: source objective",
      shortTitle: "Goal",
      studentPrompt: "Interpret the quotient as the number of groups or the number of objects in each group using units of 2.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 162-173. Lesson 12 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-model",
      title: "Teacher source excerpt",
      shortTitle: "Model",
      studentPrompt: "The model provides a place aside from crackers does each student get? Draw to model and the words to think about the problem. solve the problem. Then, explain your thinking to your It should guide their understanding of partner. the problem and how to find the S: (Draw and solve.) I gave 1 cracker to each student unknown. They might ask themselves until I drew 8.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 162-173. Lesson 12 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-meaning",
      title: "Teacher move from source",
      shortTitle: "Meaning",
      studentPrompt: "Describe how you labeled the tape diagram in Problem 4. The number 2 appears in the problem; where do you see it in the diagram?",
      teacherEditionBasis: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      visualModel: "array"
    },
    {
      id: "source-picture",
      title: "Teacher Edition Problem Set",
      shortTitle: "Picture",
      studentPrompt: "Problem 1: There are 8 birds at the pet store. Two birds are in each cage. Circle to show how many cages there are. 8 divided by 2 = ____ There are ____ cages of birds. Problem 2: The pet store sells 10 fish. They equally divide the fish into 5 bowls. Draw fish to find the number in each bowl.? 10 fish, 5 bowls 5 x ____ = 10 10 divided by 5 = ____ There are ____ fish in each bowl. Problem 3: Match. 10 divided by 2 18 divided by 2 12 divided by 2 16 divided by 2 14 divided by 2 objects in each group using units of 2.",
      teacherEditionBasis: "Module 1 Teacher Edition, Lesson 12 Problem Set, pages 162-173.",
      visualModel: "array"
    },
    {
      id: "source-draw",
      title: "Teacher edition reference",
      shortTitle: "Draw",
      studentPrompt: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems.",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 162-173.",
      visualModel: "array"
    },
    {
      id: "source-exit",
      title: "Exit evidence from source",
      shortTitle: "Exit",
      studentPrompt: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context.",
      teacherEditionBasis: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 162-173. Lesson 12 objective, concept development, problem set, exit ticket, and homework.",
      visualModel: "array"
    },
    {
      id: "source-summary",
      title: "Debrief focus from source",
      shortTitle: "Sum",
      studentPrompt: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (13 minutes) Multiply by 3 Pattern Sheet 3.OA.7 (8 minutes) Group Counting 3.OA.1 (3 minutes) Divide 3.OA.7 (2 minutes) Multiply by 3 Pattern Sheet (8 minutes) Materials: (S) Multiply by 3 (6-10) (Pattern Sheet) Note: This activity builds fluency with multiplication facts using units of 3. It works toward students knowing from memory all products of two one-digit numbers. See Lesson 9 for the directions for administering a Multiply-By Pattern Sheet. T: (Write 6 x 3 = ____.) Let's skip-count up by threes to solve. (Count with fingers to 6...",
      teacherEditionBasis: "Module 1 Teacher Edition, lesson pages 162-173.",
      visualModel: "array"
    }
  ],
  sourceRows: {
    "source-goal": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 162-173. Lesson 12 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Interpret the quotient as the number of groups or the number of objects in each group using units of 2."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 12 Problem Set, pages 162-173."
      }
    ],
    "source-model": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 162-173. Lesson 12 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "The model provides a place aside from crackers does each student get? Draw to model and the words to think about the problem. solve the problem. Then, explain your thinking to your It should guide their understanding of partner. the problem and how to find the S: (Draw and solve.) I gave 1 cracker to each student unknown. They might ask themselves until I drew 8."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 12 Problem Set, pages 162-173."
      }
    ],
    "source-meaning": [
      {
        label: "Source",
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
      },
      {
        label: "Source text",
        value: "Describe how you labeled the tape diagram in Problem 4. The number 2 appears in the problem; where do you see it in the diagram?"
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 12 Problem Set, pages 162-173."
      }
    ],
    "source-picture": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, Lesson 12 Problem Set, pages 162-173."
      },
      {
        label: "Source text",
        value: "Problem 1: There are 8 birds at the pet store. Two birds are in each cage. Circle to show how many cages there are. 8 divided by 2 = ____ There are ____ cages of birds. Problem 2: The pet store sells 10 fish. They equally divide the fish into 5 bowls. Draw fish to find the number in each bowl.? 10 fish, 5 bowls 5 x ____ = 10 10 divided by 5 = ____ There are ____ fish in each bowl. Problem 3: Match. 10 divided by 2 18 divided by 2 12 divided by 2 16 divided by 2 14 divided by 2 objects in each group using units of 2."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 12 Problem Set, pages 162-173."
      }
    ],
    "source-draw": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 162-173."
      },
      {
        label: "Source text",
        value: "Problem Set (10 minutes) Students should do their personal best to complete the Problem Set within the allotted 10 minutes. For some classes, it may be appropriate to modify the assignment by specifying which problems they work on first. Some problems do not specify a method for solving. Students should solve these problems using the RDW approach used for Application Problems."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 12 Problem Set, pages 162-173."
      }
    ],
    "source-exit": [
      {
        label: "Source",
        value: "EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf, pages 162-173. Lesson 12 objective, concept development, problem set, exit ticket, and homework."
      },
      {
        label: "Source text",
        value: "Use the lesson Exit Ticket or final problem-set pattern as evidence that the student can model, solve, and explain the answer in context."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 12 Problem Set, pages 162-173."
      }
    ],
    "source-summary": [
      {
        label: "Source",
        value: "Module 1 Teacher Edition, lesson pages 162-173."
      },
      {
        label: "Source text",
        value: "Student Debrief (10 minutes) Total Time (60 minutes) Fluency Practice (13 minutes) Multiply by 3 Pattern Sheet 3.OA.7 (8 minutes) Group Counting 3.OA.1 (3 minutes) Divide 3.OA.7 (2 minutes) Multiply by 3 Pattern Sheet (8 minutes) Materials: (S) Multiply by 3 (6-10) (Pattern Sheet) Note: This activity builds fluency with multiplication facts using units of 3. It works toward students knowing from memory all products of two one-digit numbers. See Lesson 9 for the directions for administering a Multiply-By Pattern Sheet. T: (Write 6 x 3 = ____.) Let's skip-count up by threes to solve. (Count with fingers to 6..."
      },
      {
        label: "Teacher Edition",
        value: "Module 1 Teacher Edition, Lesson 12 Problem Set, pages 162-173."
      }
    ]
  }
};
