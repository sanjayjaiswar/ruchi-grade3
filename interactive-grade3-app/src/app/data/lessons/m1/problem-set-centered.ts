import type {
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetFactMatch,
  LessonRuntimeConfig,
  ProblemVisualSection,
  ProblemVisualSpec,
  ProblemSetRelatedFact
} from '../lesson-runtime.types';
import { STUDENT_WORK_SOURCE } from '../../student-work-source.generated';

export type M1ProblemVisualSeed = {
  number: number;
  sourcePrompt: string;
  solvedAnswer: string;
  equations: string[];
  relatedFacts?: ProblemSetRelatedFact[];
  blankEquations?: string[];
  blankWorkspaceLabel?: string;
  blankVisualType?: ProblemSetBlankVisualType;
  animationType?: ProblemSetAnimationType;
  knownTotal?: number;
  knownGroupSize?: number;
  knownGroupCount?: number;
  quotient?: number;
  quotientMeaning?: string;
  unitLabel?: string;
  groupLabel?: string;
  facts?: ProblemSetFactMatch[];
};

type ProblemSeed = M1ProblemVisualSeed & {
  sourcePageImages?: string[];
  blankSourcePageImages?: string[];
  solvedSourcePageImages?: string[];
  explanation?: string;
  validationChecks?: string[];
  blankPrompts?: string[];
  blankAnswerSentence?: string;
  blankVisual?: ProblemVisualSpec;
  solvedVisual?: ProblemVisualSpec;
  shareLabels?: string[];
};

type LessonSeed = {
  lessonNumber: number;
  title: string;
  concept: string;
  teacherEditionBasis: string;
  contrast: string;
  summary: string;
  sourceNote: string;
  problems: ProblemSeed[];
};

const GENERATED_SOURCE_PROMPT_LESSONS = new Set([1, 2, 3, 6, 7, 8, 9, 11, 14, 15, 18]);

export const M1_TEACHER_OBJECTIVES: Record<number, string> = {
  1: 'Understand equal groups of as multiplication.',
  2: 'Relate multiplication to the array model.',
  3: 'Interpret the meaning of factors—the size of the group or the number of groups.',
  4: 'Understand the meaning of the unknown as the size of the group in division.',
  5: 'Understand the meaning of the unknown as the number of groups in division.',
  6: 'Interpret the unknown in division using the array model.',
  7: 'Demonstrate the commutativity of multiplication, and practice related facts by skip-counting objects in array models.',
  8: 'Demonstrate the commutativity of multiplication, and practice related facts by skip-counting objects in array models.',
  9: 'Find related multiplication facts by adding and subtracting equal groups in array models.',
  10: 'Model the distributive property with arrays to decompose units as a strategy to multiply.',
  11: 'Model division as the unknown factor in multiplication using arrays and tape diagrams.',
  12: 'Interpret the quotient as the number of groups or the number of objects in each group using units of 2.',
  13: 'Interpret the quotient as the number of groups or the number of objects in each group using units of 3.',
  14: 'Skip-count objects in models to build fluency with multiplication facts using units of 4.',
  15: 'Relate arrays to tape diagrams to model the commutative property of multiplication.',
  16: 'Use the distributive property as a strategy to find related multiplication facts.',
  17: 'Model the relationship between multiplication and division.',
  18: 'Apply the distributive property to decompose units.',
  19: 'Apply the distributive property to decompose units.',
  20: 'Solve two-step word problems involving multiplication and division, and assess the reasonableness of answers.',
  21: 'Solve two-step word problems involving all four operations, and assess the reasonableness of answers.'
};

const M1_TEACHER_PAGE_RANGES: Record<number, [number, number]> = {
  1: [23, 33], 2: [34, 48], 3: [49, 62], 4: [63, 74], 5: [75, 84],
  6: [85, 96], 7: [97, 108], 8: [109, 118], 9: [119, 130], 10: [131, 150],
  11: [151, 161], 12: [162, 173], 13: [174, 187], 14: [188, 199], 15: [200, 209],
  16: [210, 220], 17: [221, 233], 18: [234, 244], 19: [245, 254], 20: [255, 266],
  21: [267, 276]
};

export function m1TeacherSource(lessonNumber: number): string {
  const [start, end] = M1_TEACHER_PAGE_RANGES[lessonNumber];
  return `Module 1 Teacher Edition, lesson pages ${start}-${end}.`;
}

export function alignM1RuntimeSources(runtime: LessonRuntimeConfig, lessonNumber: number): LessonRuntimeConfig {
  const objective = M1_TEACHER_OBJECTIVES[lessonNumber];
  const teacherSource = m1TeacherSource(lessonNumber);
  const centeredBaseline = M1_PROBLEM_SET_CENTERED_LESSONS[lessonNumber];
  const existingCentered = runtime.problemSetCenteredLesson;
  const alignedConceptSections = centeredBaseline?.conceptSections ?? (existingCentered ? [
    {
      title: `1. ${objective}`,
      body: existingCentered.concept,
      teacherSource,
      checkpoints: [
        'Name what the quotient represents in this situation.',
        'Keep the total, equal groups, and group size tied to the model.',
        'Use the related multiplication fact to check the division.'
      ]
    },
    {
      title: '2. Compare the two quotient meanings',
      body: 'Use equal-group drawings or tapes to distinguish finding the number of groups from finding the number in each group.',
      teacherSource,
      checkpoints: [
        'Locate the unknown on the model.',
        'State whether the unknown is groups or objects per group.',
        'Write the division equation that matches the picture.'
      ]
    },
    {
      title: '3. Explain and check',
      body: existingCentered.contrast,
      teacherSource,
      checkpoints: [
        'Answer with the requested unit.',
        'Multiply the quotient by the divisor.',
        'Confirm that the product recovers the whole.'
      ]
    }
  ] : undefined);
  return {
    ...runtime,
    problemSetCenteredLesson: existingCentered
      ? {
          ...existingCentered,
          title: `Lesson ${lessonNumber}: ${objective}`,
          teacherEditionBasis: teacherSource,
          conceptSections: alignedConceptSections
        }
      : existingCentered,
    teacherEditionSteps: runtime.teacherEditionSteps?.map((step) => ({
      ...step,
      studentPrompt: step.id === 'source-goal' ? objective : step.studentPrompt,
      teacherEditionBasis: /Teacher Edition|teacher_edition|lesson pages/i.test(step.teacherEditionBasis)
        ? teacherSource
        : step.teacherEditionBasis
    })),
    sourceRows: runtime.sourceRows
      ? Object.fromEntries(Object.entries(runtime.sourceRows).map(([key, rows]) => [
          key,
          rows.map((row) => ({
            ...row,
            value: key === 'source-goal' && row.label === 'Source text'
              ? objective
              : row.label === 'Source' && /Teacher Edition|teacher_edition|lesson pages/i.test(row.value)
                ? teacherSource
                : row.value
          }))
        ]))
      : runtime.sourceRows
  };
}

const M1_PROBLEM_SET_SOURCE_PAGES: Record<number, string[]> = {
  1: teacherEditionPageImages(29, 30),
  2: teacherEditionPageImages(43, 44),
  3: teacherEditionPageImages(56, 57),
  4: teacherEditionPageImages(70, 71),
  5: teacherEditionPageImages(80, 81),
  6: teacherEditionPageImages(90, 91),
  7: teacherEditionPageImages(103, 104),
  8: teacherEditionPageImages(114, 115),
  9: teacherEditionPageImages(125, 126),
  10: teacherEditionPageImages(137, 138),
  11: teacherEditionPageImages(157, 158),
  12: teacherEditionPageImages(169, 170),
  13: teacherEditionPageImages(181, 182),
  14: teacherEditionPageImages(194, 195),
  15: teacherEditionPageImages(205, 206),
  16: teacherEditionPageImages(216, 217),
  17: teacherEditionPageImages(227, 228),
  18: teacherEditionPageImages(240, 241),
  19: teacherEditionPageImages(250, 251),
  20: teacherEditionPageImages(262, 263),
  21: teacherEditionPageImages(272, 273)
};

const M1_ANSWER_KEY_SOURCE_PAGES: Record<number, string[]> = {
  1: teacherEditionPageImages(292, 292),
  2: teacherEditionPageImages(293, 294),
  3: teacherEditionPageImages(295, 296),
  4: teacherEditionPageImages(297, 298),
  5: teacherEditionPageImages(299, 299),
  6: teacherEditionPageImages(300, 300),
  7: teacherEditionPageImages(301, 302),
  8: teacherEditionPageImages(303, 304),
  9: teacherEditionPageImages(305, 306),
  10: teacherEditionPageImages(307, 308),
  11: teacherEditionPageImages(309, 310),
  12: teacherEditionPageImages(311, 312),
  13: teacherEditionPageImages(313, 314),
  14: teacherEditionPageImages(315, 316),
  15: teacherEditionPageImages(317, 318),
  16: teacherEditionPageImages(319, 320),
  17: teacherEditionPageImages(321, 322),
  18: teacherEditionPageImages(323, 324),
  19: teacherEditionPageImages(325, 325),
  20: teacherEditionPageImages(326, 327),
  21: teacherEditionPageImages(328, 329)
};

function teacherEditionPageImages(start: number, end: number): string[] {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    const page = String(start + index).padStart(3, '0');
    return `/source-pages/m1-teacher/page-${page}.png`;
  });
}

function sourcePromptFromWorkbook(lessonNumber: number, problem: ProblemSeed): ProblemSeed {
  if (!GENERATED_SOURCE_PROMPT_LESSONS.has(lessonNumber)) {
    return problem;
  }
  // These side-by-side Problem Set regions are merged by OCR. The reviewed
  // authored seed is the exact per-problem wording and must win.
  if (
    (lessonNumber === 7 && problem.number === 2) ||
    (lessonNumber === 9 && problem.number === 3) ||
    (lessonNumber === 18 && [2, 4].includes(problem.number))
  ) {
    return problem;
  }

  const generatedPrompt = STUDENT_WORK_SOURCE[`m1-l${lessonNumber}`]?.problems.find(
    (sourceProblem) => sourceProblem.number === problem.number
  )?.prompt;

  if (!generatedPrompt) {
    return problem;
  }

  return {
    ...problem,
    sourcePrompt: cleanGeneratedSourcePrompt(generatedPrompt)
  };
}

function cleanGeneratedSourcePrompt(prompt: string): string {
  return prompt
    .replace(/\s*Quality Control Guide\b/gi, '')
    .replace(/\s+facts by skip-counting objects in array models\.?$/i, '')
    .replace(/\s+groups in array models\.?$/i, '')
    .replace(/\s+using units of 4\.?$/i, '')
    .replace(/\s+and assess the reasonableness of answers\.?$/i, '')
    .replace(/\s+strategy to multiply\.?$/i, '')
    .replace(/\s+of groups\.?$/i, '')
    .replace(/\s+(and tape diagrams|multiplication|division|facts)\.$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function teacherEditionPageImagesFromBasis(basis: string): string[] {
  const rangeMatch = basis.match(/pages\s+(\d+)-(\d+)/i);
  if (!rangeMatch) {
    return [];
  }

  const start = Number(rangeMatch[1]);
  const end = Number(rangeMatch[2]);
  return teacherEditionPageImages(start, end);
}

function teacherEditionSourceNote(seed: LessonSeed): string {
  return `Teacher Edition Lesson ${seed.lessonNumber} pages include the lesson structure, concept development, Problem Set guidance, Student Debrief, Exit Ticket, and official student-facing Problem Set pages.`;
}

function lesson17Visual(problemNumber: 1 | 2 | 3 | 4, solved: boolean): ProblemVisualSpec {
  const sourceNote = solved
    ? 'Solved view matches the Teacher Edition answer key quantities for Lesson 17.'
    : 'Blank view preserves the student-facing work structure without filling the final answer.';

  if (problemNumber === 1) {
    return {
      title: 'Problem 1: array and related facts',
      sourceNote,
      sections: [
        {
          kind: 'array',
          label: '10 rows of 4 butterflies',
          rows: 10,
          columns: 4,
          item: 'butterfly'
        },
        {
          kind: 'related-facts',
          label: 'Complete the multiplication fact and matching division fact for each row.',
          rows: Array.from({ length: 10 }, (_, index) => {
            const row = index + 1;
            const product = row * 4;
            if (solved) {
              return {
                left: `${row} x 4 = ${product}`,
                right: `${product} divided by 4 = ${row}`
              };
            }
            if (row <= 2) {
              return {
                left: `${row} x 4 = ____`,
                right: `____ divided by 4 = ${row}`
              };
            }
            if (row <= 4) {
              return {
                left: `____ x 4 = ${product}`,
                right: `${product} divided by 4 = ____`
              };
            }
            if (row <= 6) {
              return {
                left: `____ x ____ = ${product}`,
                right: `${product} divided by ____ = ____`
              };
            }
            if (row <= 8) {
              return {
                left: `____ x 4 = ____`,
                right: `____ divided by 4 = ____`
              };
            }
            return {
              left: `____ x ____ = ____`,
              right: `____ divided by ____ = ____`
            };
          })
        }
      ]
    };
  }

  if (problemNumber === 2) {
    return {
      title: 'Problem 2: tape diagram for boxes of muffins',
      sourceNote,
      sections: [
        {
          kind: 'tape',
          label: '36 bran muffins, 4 muffins in each box',
          totalLabel: '36 muffins total',
          parts: solved
            ? Array.from({ length: 9 }, () => ({ label: '4' }))
            : [
                { label: '4' },
                { label: '4' },
                { label: '4' },
                { label: '4' },
                { label: '?' }
              ],
          caption: solved ? '36 divided by 4 = 9 boxes.' : 'Each part is 4 muffins. Find the number of equal boxes.'
        },
        {
          kind: 'equations',
          lines: solved ? ['36 divided by 4 = 9', '9 x 4 = 36'] : ['36 divided by 4 = ____', '____ x 4 = 36']
        }
      ]
    };
  }

  if (problemNumber === 3) {
    return {
      title: 'Problem 3: equal rows of glasses',
      sourceNote,
      sections: [
        solved
          ? {
              kind: 'array',
              label: '32 glasses arranged in 4 equal rows',
              rows: 4,
              columns: 8,
              item: 'glass'
            }
          : {
              kind: 'array',
              label: '4 equal rows, unknown number in each row',
              rows: 4,
              columns: 1,
              item: 'circle',
              placeholder: '?'
            },
        {
          kind: 'equations',
          lines: solved ? ['32 divided by 4 = 8', '4 x 8 = 32'] : ['32 divided by 4 = ____', '4 x ____ = 32']
        }
      ]
    };
  }

  return {
    title: 'Problem 4: money tape for notebooks',
    sourceNote,
    sections: [
      {
        kind: 'tape',
        label: '$28 split into 4 equal notebook units',
        totalLabel: '$28 total',
        parts: solved
          ? [
              { label: '$7', emphasize: true },
              { label: '$7', emphasize: true },
              { label: '$7' },
              { label: '$7' }
            ]
          : [
              { label: '?', emphasize: true },
              { label: '?', emphasize: true },
              { label: '?' },
              { label: '?' }
            ],
        caption: solved ? 'Two highlighted notebooks cost $14.' : 'Find 1 notebook first, then use 2 equal units.'
      },
      {
        kind: 'equations',
        lines: solved ? ['28 divided by 4 = 7', '2 x 7 = 14'] : ['28 divided by 4 = ____', '2 x ____ = ____']
      }
    ]
  };
}

export function createM1ProblemVisual(seed: M1ProblemVisualSeed, solved: boolean): ProblemVisualSpec {
  const sections: ProblemVisualSpec['sections'] = [];
  const title = `Problem ${seed.number}: ${visualTitle(seed)}`;
  const sourceNote = solved
    ? `Teacher Edition answer modeled here: ${seed.solvedAnswer} ${seed.equations.join('; ')}`
    : 'Blank view keeps the student Problem Set workspace visual and leaves the answer work open.';

  if (seed.relatedFacts?.length) {
    sections.push({
      kind: 'related-facts',
      label: 'Related multiplication and division facts',
      rows: seed.relatedFacts.map((fact) => ({
        left: solved ? fact.targetFact : fact.blankEquation,
        right: solved ? fact.solvedEquation : fact.knownFact
      }))
    });
  } else if (seed.facts?.length) {
    sections.push({
      kind: 'related-facts',
      label: 'Complete the division fact table',
      rows: seed.facts.map((fact) => ({
        left: solved
          ? `${fact.dividend} divided by ${fact.divisor} = ${fact.quotient}`
          : `${fact.dividend} divided by ${fact.divisor} = ____`,
        right: solved ? `${fact.quotient} groups` : '____ groups'
      }))
    });
  } else if (usesTapeVisual(seed)) {
    sections.push(makeTapeSection(seed, solved));
  } else {
    sections.push(makeArraySection(seed, solved));
  }

  if (!usesTapeVisual(seed) && seed.animationType && ['equal-sharing', 'tape-split', 'two-step-model'].includes(seed.animationType)) {
    sections.push(makeTapeSection(seed, solved));
  }

  sections.push({
    kind: 'equations',
    label: solved ? 'Teacher Edition solved equations' : 'Student work equation blanks',
    lines: solved ? seed.equations : seed.blankEquations ?? seed.equations.map(blankEquation)
  });

  sections.push({
    kind: 'note',
    label: solved ? 'Answer sentence' : 'Workspace direction',
    text: solved ? seed.solvedAnswer : seed.blankWorkspaceLabel ?? 'Use the visual model to complete the source problem blanks.'
  });

  return { title, sourceNote, sections };
}

function twoStepVisual(
  title: string,
  rows: Array<{ step: string; model: string; blank: string; solved: string }>,
  equations: string[],
  answer: string,
  solved: boolean
): ProblemVisualSpec {
  return {
    title,
    sourceNote: solved
      ? 'Solved view follows the Teacher Edition two-step answer and keeps each step visible.'
      : 'Blank view preserves the two-step structure without filling the final answer.',
    sections: [
      {
        kind: 'card-grid',
        label: 'Two-step RDW model',
        cards: rows.map((row) => ({
          label: `Step ${row.step}`,
          sections: [
            {
              kind: 'note',
              label: 'Model',
              text: row.model
            },
            twoStepTapeSection(row, solved),
            {
              kind: 'equations',
              label: solved ? 'Solved work' : 'Work blank',
              lines: [solved ? row.solved : row.blank]
            }
          ].filter(Boolean) as ProblemVisualSection[]
        }))
      },
      {
        kind: 'equations',
        label: solved ? 'Teacher Edition solved equations' : 'Equation blanks',
        lines: solved ? equations : equations.map(blankEquation)
      },
      {
        kind: 'note',
        label: solved ? 'Answer sentence' : 'Reasonableness check',
        text: solved ? answer : 'Use the first result in the second step, then check that the final sentence answers the question.'
      }
    ]
  };
}

function twoStepTapeSection(
  row: { model: string; blank: string; solved: string },
  solved: boolean
): ProblemVisualSection | undefined {
  const multiplication = row.solved.match(/(\d+)\s*x\s*(\d+)\s*=\s*(\d+)/i);
  if (multiplication) {
    const groupCount = boundedCount(Number(multiplication[1]), 1, 12);
    const groupSize = multiplication[2];
    const total = multiplication[3];

    return {
      kind: 'tape',
      label: 'Tape model',
      totalLabel: solved ? `${total} total` : '? total',
      parts: Array.from({ length: groupCount }, (_, index) => ({
        label: solved ? groupSize : row.blank.includes('____') ? '?' : groupSize,
        emphasize: index < Math.min(2, groupCount)
      })),
      caption: row.model
    };
  }

  const division = row.solved.match(/(\d+)\s*÷\s*(\d+)\s*=\s*(\d+)/);
  if (division) {
    const total = division[1];
    const groupCount = boundedCount(Number(division[2]), 1, 12);
    const quotient = division[3];

    return {
      kind: 'tape',
      label: 'Tape model',
      totalLabel: `${total} total`,
      parts: Array.from({ length: groupCount }, (_, index) => ({
        label: solved ? quotient : '?',
        emphasize: index < Math.min(2, groupCount)
      })),
      caption: row.model
    };
  }

  const addition = row.solved.match(/(\d+)\s*\+\s*(\d+)\s*=\s*(\d+)/);
  if (addition) {
    const first = addition[1];
    const second = addition[2];
    const total = addition[3];
    const blankStartsWithUnknown = row.blank.trim().startsWith('____');

    return {
      kind: 'tape',
      label: 'Tape model',
      totalLabel: solved ? `${total} total` : '? total',
      parts: [
        { label: solved || !blankStartsWithUnknown ? first : '?', emphasize: true },
        { label: second, emphasize: true }
      ],
      caption: row.model
    };
  }

  const subtraction = row.solved.match(/(\d+)\s*-\s*(\d+)\s*=\s*(\d+)/);
  if (subtraction) {
    const total = subtraction[1];
    const removed = subtraction[2];
    const remaining = subtraction[3];

    return {
      kind: 'tape',
      label: 'Tape model',
      totalLabel: solved ? `${total} total` : '? total',
      parts: [
        { label: removed, muted: true },
        { label: solved ? remaining : '?', emphasize: true }
      ],
      caption: row.model
    };
  }

  return undefined;
}

function lesson21Visual(problemNumber: 1 | 2 | 3 | 4, solved: boolean): ProblemVisualSpec {
  if (problemNumber === 1) {
    const tape: ProblemVisualSection = {
      kind: 'tape',
      label: 'Jason',
      totalLabel: '',
      hideTotalLabel: true,
      topParts: [
        { label: '$6', startPart: 0, partCount: 1 },
        { label: '$4', startPart: 4, partCount: 1 }
      ],
      parts: Array.from({ length: 5 }, (_, index) => ({
        label: solved ? (index === 4 ? '4' : '6') : '\u00a0'
      })),
      braces: [
        {
          label: 'Jason earns',
          boxLabel: solved ? '$28' : '$ ____',
          startPart: 0,
          partCount: 5
        }
      ],
      braceAnswers: solved ? undefined : [['28']]
    };
    return {
      title: '',
      sourceNote: '',
      sections: [
        tape,
        {
          kind: 'source-response-workspace',
          label: '',
          wide: true,
          parts: solved
            ? [
                {
                  prompt: 'Write and solve an equation.',
                  lines: ['4 × 6 = 24', '24 + 4 = 28'],
                  printedLineCount: 0,
                  response: 'Four full weeks earn $24; adding the fifth week gives $28.'
                },
                {
                  prompt: 'Answer.',
                  lines: ['Jason earns $28.'],
                  printedLineCount: 0
                }
              ]
            : [
                {
                  prompt: 'Write and solve an equation.',
                  lines: [],
                  printedLineCount: 0,
                  responsePlaceholder: 'Write the equation or equations that match the tape.'
                },
                {
                  prompt: 'Complete the answer.',
                  lines: ['Jason earns $ ____.'],
                  lineAnswers: [['28']],
                  printedLineCount: 0,
                  interactiveLines: true
                }
              ]
        }
      ]
    };
  }

  if (problemNumber === 2) {
    return {
      title: '',
      sourceNote: '',
      sections: [
        {
          kind: 'tape',
          label: solved ? '4 packs' : '____',
          totalLabel: '',
          hideTotalLabel: true,
          parts: Array.from({ length: 4 }, (_, index) => ({
            label: solved || index === 0 ? '7' : '\u00a0'
          })),
          braces: [
            { label: 'markers', boxLabel: solved ? '28' : '____', startPart: 0, partCount: 4 }
          ],
          braceAnswers: solved ? undefined : [['28']]
        },
        {
          kind: 'tape',
          label: solved ? 'markers handed out and left' : '____',
          totalLabel: '',
          hideTotalLabel: true,
          parts: [
            { label: solved ? '22' : '____', sublabel: 'students', emphasize: true, weight: 3 },
            { label: '6', sublabel: 'markers left', muted: true, weight: 1 }
          ],
          partAnswers: solved ? undefined : [['22'], []],
          braces: [
            { label: 'students', boxLabel: solved ? '22' : '____', startPart: 0, partCount: 1 },
            { label: '6 markers', startPart: 1, partCount: 1 }
          ],
          braceAnswers: solved ? undefined : [['22'], []]
        },
        {
          kind: 'source-response-workspace',
          label: '',
          wide: true,
          parts: [
            solved
              ? {
                  prompt: 'Solved work.',
                  lines: ['4 × 7 = 28', '28 − 6 = 22', 'There are 22 students in Miss Lianto’s class.'],
                  printedLineCount: 0
                }
              : {
                  prompt: 'Complete the answer.',
                  lines: ['There are ____ students in Miss Lianto’s class.'],
                  lineAnswers: [['22']],
                  printedLineCount: 0,
                  interactiveLines: true
                }
          ]
        }
      ]
    };
  }

  if (problemNumber === 3) {
    if (!solved) {
      return {
        title: '',
        sourceNote: '',
        sections: [
          {
            kind: 'source-response-workspace',
            label: '',
            wide: true,
            parts: [
              {
                prompt: 'Draw and label a tape diagram to find how many fruit snacks Orlando has left.',
                lines: [],
                printedLineCount: 0,
                openWorkspace: true,
                sketchWorkspace: true,
                responsePlaceholder: 'Write your equations and answer.'
              }
            ]
          }
        ]
      };
    }
    return {
      title: '',
      sourceNote: '',
      sections: [
        {
          kind: 'tape',
          label: 'Flavors',
          totalLabel: '18 snacks',
          parts: [
            { label: solved ? '6' : '?', sublabel: 'strawberry', emphasize: true },
            { label: solved ? '6' : '?', sublabel: 'cherry', emphasize: true },
            { label: solved ? '6' : '?', sublabel: 'grape' }
          ],
          braces: [
            { label: 'grape snacks', boxLabel: solved ? '? 6' : '?', startPart: 2, partCount: 1 }
          ],
          caption: 'Split 18 fruit snacks equally among 3 flavors.'
        },
        {
          kind: 'tape',
          label: 'After Orlando eats grape',
          totalLabel: '18 snacks',
          parts: [
            { label: solved ? '12' : '?', sublabel: 'snacks left', emphasize: true },
            { label: solved ? '6' : '?', sublabel: 'grape eaten', muted: true }
          ],
          braces: [
            { label: 'snacks left', boxLabel: solved ? '? 12' : '?', startPart: 0, partCount: 1 },
            { label: 'grape', boxLabel: solved ? '? 6' : '?', startPart: 1, partCount: 1 }
          ],
          caption: 'Remove the grape-flavored part from the 18 snacks.'
        },
        {
          kind: 'source-response-workspace',
          label: '',
          wide: true,
          parts: [
            {
              prompt: 'Solved work.',
              lines: ['18 ÷ 3 = 6', '18 − 6 = 12', 'Orlando has 12 fruit snacks left.'],
              printedLineCount: 0,
              response: 'The tape has three equal groups of 6. Removing the grape group leaves 12 snacks.'
            }
          ]
        }
      ]
    };
  }

  if (!solved) {
    return {
      title: '',
      sourceNote: '',
      sections: [
        {
          kind: 'source-response-workspace',
          label: '',
          wide: true,
          parts: [
            {
              lead: 'a.',
              prompt: 'How many 3-meter pieces of ribbon does Eudora have?',
              lines: [],
              printedLineCount: 0,
              openWorkspace: true,
              sketchWorkspace: true,
              responsePlaceholder: 'Draw, label, and solve part a.'
            },
            {
              lead: 'b.',
              prompt: 'How many more pieces does she need to have 12 pieces?',
              lines: [],
              printedLineCount: 0,
              openWorkspace: true,
              sketchWorkspace: true,
              responsePlaceholder: 'Use your answer from part a to solve part b.'
            }
          ]
        }
      ]
    };
  }

  return {
    title: '',
    sourceNote: '',
    sections: [
      {
        kind: 'tape',
        label: 'a. Pieces from 21 meters',
        totalLabel: '21 meters',
        parts: Array.from({ length: 7 }, () => ({ label: '3', sublabel: 'm' })),
        braces: [
          { label: 'pieces', boxLabel: solved ? '? 7' : '?', startPart: 0, partCount: 7 }
        ],
        caption: 'Each piece is 3 meters long.'
      },
      {
        kind: 'tape',
        label: 'b. More pieces to reach 12',
        totalLabel: '12 pieces',
        parts: [
          { label: solved ? '7' : '?', sublabel: 'pieces she has', muted: true },
          { label: solved ? '5' : '?', sublabel: 'more pieces', emphasize: true }
        ],
        braces: [
          { label: 'pieces she has', boxLabel: solved ? '? 7' : '?', startPart: 0, partCount: 1 },
          { label: 'more pieces', boxLabel: solved ? '? 5' : '?', startPart: 1, partCount: 1 }
        ],
        caption: 'Compare the 7 pieces she has to the 12 pieces she needs.'
      },
      {
        kind: 'source-response-workspace',
        label: '',
        wide: true,
        parts: [
          {
            lead: 'a.',
            prompt: 'How many pieces of ribbon does Eudora have?',
            lines: ['21 ÷ 3 = 7', 'Eudora has 7 pieces of ribbon.'],
            printedLineCount: 0,
            response: 'Twenty-one meters divided into 3-meter lengths makes 7 pieces.'
          },
          {
            lead: 'b.',
            prompt: 'How many more pieces does she need to reach 12?',
            lines: ['12 − 7 = 5', 'She needs 5 more pieces of the shorter ribbon.'],
            printedLineCount: 0,
            response: 'Twelve pieces minus the 7 she has means she needs 5 more pieces.'
          }
        ]
      }
    ]
  };
}

function lesson20Visual(problemNumber: 1 | 2 | 3 | 4 | 5, solved: boolean): ProblemVisualSpec {
  const sourceNote = solved
    ? 'Solved view follows the Lesson 20 Teacher Edition sample work: find the first unknown, then use it to answer the second question.'
    : 'Blank view keeps the Teacher Edition RDW structure and marks the first unknown before the final answer.';

  if (!solved && problemNumber >= 3) {
    return {
      title: `Problem ${problemNumber}: open Teacher Edition RDW workspace`,
      sourceNote: 'The official Problem Set prints the story and an open response line only; no model or equation is prefilled.',
      sections: [
        {
          kind: 'note',
          label: 'Student workspace',
          text: 'Read, draw, and write your own model and equations in the open workspace.'
        }
      ]
    };
  }

  if (problemNumber === 1) {
    return {
      title: 'Problem 1: books plus magazine',
      sourceNote,
      sections: [
        {
          kind: 'tape',
          label: 'Tape model',
          totalLabel: solved ? '$28 total spent' : '? total spent',
          topParts: [
            { label: '$4', sublabel: 'magazine', startPart: 0, partCount: 1 }
          ],
          parts: [
            { label: '$8', sublabel: 'book' },
            { label: '$8', sublabel: 'book' },
            { label: '$8', sublabel: 'book' }
          ],
          braces: [
            {
              label: 'book cost',
              boxLabel: solved ? '? $24' : '?',
              startPart: 0,
              partCount: 3
            }
          ],
          caption: '3 books at $8 each, then add the $4 magazine.'
        },
        {
          kind: 'solution-parts',
          label: 'Worksheet a/b work',
          parts: [
            {
              label: 'a',
              prompt: 'What is the total cost of the books?',
              equation: solved ? '3 x $8 = $24' : '3 x $8 = ____',
              answer: solved ? 'The books cost $24.' : 'The books cost ____.'
            },
            {
              label: 'b',
              prompt: 'How much does Ted spend all together?',
              equation: solved ? '$24 + $4 = $28' : '____ + $4 = ____',
              answer: solved ? 'Ted spends $28.' : 'Ted spends ____.'
            }
          ]
        },
        {
          kind: 'equations',
          label: solved ? 'Teacher Edition solved equations' : 'Equation blanks',
          lines: solved ? ['3 x 8 = 24', '24 + 4 = 28'] : ['3 x 8 = ____', '____ + 4 = ____']
        },
        {
          kind: 'note',
          label: solved ? 'Answer sentence' : 'Workspace direction',
          text: solved
            ? 'The books cost $24. Ted spends $28 altogether.'
            : 'Find the book cost first. Then add the magazine cost to find how much Ted spends altogether.'
        }
      ]
    };
  }

  if (problemNumber === 2) {
    return {
      title: 'Problem 2: silly bands for 3 children',
      sourceNote,
      sections: [
        {
          kind: 'tape',
          label: 'Tape model',
          totalLabel: '28 silly bands',
          parts: Array.from({ length: 7 }, () => ({ label: solved ? '4' : '?' })),
          braces: [
            {
              label: '1 child',
              boxLabel: solved ? '? 4' : '?',
              startPart: 0,
              partCount: 1
            },
            {
              label: '3 children',
              boxLabel: solved ? '? 12' : '?',
              startPart: 4,
              partCount: 3
            }
          ],
          caption: 'Seven children share 28 silly bands equally.'
        },
        {
          kind: 'solution-parts',
          label: 'Worksheet a/b work',
          parts: [
            {
              label: 'a',
              prompt: 'How many silly bands does each child get?',
              equation: solved ? '28 ÷ 7 = 4' : '28 ÷ 7 = ____',
              answer: solved ? 'Each child gets 4 silly bands.' : 'Each child gets ____ silly bands.'
            },
            {
              label: 'b',
              prompt: 'How many silly bands do 3 children get?',
              equation: solved ? '3 x 4 = 12' : '3 x ____ = ____',
              answer: solved ? 'Three children get 12 silly bands.' : 'Three children get ____ silly bands.'
            }
          ]
        },
        {
          kind: 'equations',
          label: solved ? 'Teacher Edition solved equations' : 'Equation blanks',
          lines: solved ? ['28 ÷ 7 = 4', '3 x 4 = 12'] : ['28 ÷ 7 = ____', '3 x ____ = ____']
        },
        {
          kind: 'note',
          label: solved ? 'Answer sentence' : 'Workspace direction',
          text: solved
            ? 'Each child gets 4 silly bands. Three children get 12 silly bands.'
            : 'Find one child’s share first. Then use 3 equal shares to answer the second question.'
        }
      ]
    };
  }

  if (problemNumber === 3) {
    return {
      title: 'Problem 3: unbroken cups',
      sourceNote,
      sections: [
        {
          kind: 'tape',
          label: 'Tape model',
          totalLabel: '18 cups',
          parts: Array.from({ length: 6 }, (_, index) => ({
            label: solved ? '3' : '?',
            sublabel: `box ${index + 1}`,
            emphasize: index >= 2,
            muted: index < 2
          })),
          braces: [
            { label: '2 broken boxes', startPart: 0, partCount: 2 },
            {
              label: '4 unbroken boxes',
              boxLabel: solved ? '? 12 cups' : '?',
              startPart: 2,
              partCount: 4
            }
          ],
          caption: 'Two boxes break, so the unbroken cups are in the 4 remaining boxes.'
        },
        {
          kind: 'solution-parts',
          label: 'Worksheet a/b work',
          parts: [
            {
              label: 'a',
              prompt: 'How many cups are in each box?',
              equation: solved ? '18 ÷ 6 = 3' : '18 ÷ 6 = ____',
              answer: solved ? 'Each box has 3 cups.' : 'Each box has ____ cups.'
            },
            {
              label: 'b',
              prompt: 'How many cups are unbroken?',
              equation: solved ? '6 - 2 = 4, then 4 x 3 = 12' : '6 - 2 = ____, then ____ x ____ = ____',
              answer: solved ? '12 cups are unbroken.' : '____ cups are unbroken.'
            }
          ]
        },
        {
          kind: 'equations',
          label: solved ? 'Teacher Edition solved equations' : 'Equation blanks',
          lines: solved ? ['18 ÷ 6 = 3', '6 - 2 = 4', '4 x 3 = 12'] : ['18 ÷ 6 = ____', '6 - 2 = ____', '____ x ____ = ____']
        },
        {
          kind: 'note',
          label: solved ? 'Answer sentence' : 'Workspace direction',
          text: solved
            ? 'Each box has 3 cups. Four boxes are unbroken, so 12 cups are unbroken.'
            : 'Find cups per box first. Then count only the 4 boxes that did not break.'
        }
      ]
    };
  }

  if (problemNumber === 4) {
    return {
      title: 'Problem 4: blue and red balloons per child',
      sourceNote,
      sections: [
        {
          kind: 'tape',
          label: 'Blue balloons',
          totalLabel: '25 blue balloons',
          parts: Array.from({ length: 5 }, () => ({ label: solved ? '5' : '?' })),
          braces: [
            {
              label: '1 child gets blue',
              boxLabel: solved ? '? 5' : '?',
              startPart: 0,
              partCount: 1
            }
          ],
          caption: 'Five children share the blue balloons equally.'
        },
        {
          kind: 'tape',
          label: 'Red balloons',
          totalLabel: '15 red balloons',
          parts: Array.from({ length: 5 }, () => ({ label: solved ? '3' : '?' })),
          braces: [
            {
              label: '1 child gets red',
              boxLabel: solved ? '? 3' : '?',
              startPart: 0,
              partCount: 1
            }
          ],
          caption: 'The same five children share the red balloons equally.'
        },
        {
          kind: 'solution-parts',
          label: 'Worksheet a/b work',
          parts: [
            {
              label: 'a',
              prompt: 'How many blue balloons does each child get?',
              equation: solved ? '25 ÷ 5 = 5' : '25 ÷ 5 = ____',
              answer: solved ? 'Each child gets 5 blue balloons.' : 'Each child gets ____ blue balloons.'
            },
            {
              label: 'b',
              prompt: 'How many red balloons does each child get?',
              equation: solved ? '15 ÷ 5 = 3' : '15 ÷ 5 = ____',
              answer: solved ? 'Each child gets 3 red balloons.' : 'Each child gets ____ red balloons.'
            }
          ]
        },
        {
          kind: 'equations',
          label: solved ? 'Teacher Edition solved equations' : 'Equation blanks',
          lines: solved ? ['25 ÷ 5 = 5', '15 ÷ 5 = 3'] : ['25 ÷ 5 = ____', '15 ÷ 5 = ____']
        },
        {
          kind: 'note',
          label: solved ? 'Answer sentence' : 'Workspace direction',
          text: solved
            ? 'Each child gets 5 blue balloons and 3 red balloons.'
            : 'Find one child’s blue share and red share separately.'
        }
      ]
    };
  }

  return {
    title: 'Problem 5: pear bags left',
    sourceNote,
    sections: [
      {
        kind: 'tape',
        label: 'Tape model',
        totalLabel: '27 pears',
        parts: Array.from({ length: 9 }, (_, index) => ({
          label: '3',
          sublabel: `bag ${index + 1}`,
          muted: index < 5,
          emphasize: index >= 5
        })),
        braces: [
          { label: '5 bags sold', startPart: 0, partCount: 5 },
          {
            label: 'bags left',
            boxLabel: solved ? '? 4' : '?',
            startPart: 5,
            partCount: 4
          }
        ],
        caption: 'Each bag has 3 pears. Five bags are sold.'
      },
      {
        kind: 'solution-parts',
        label: 'Worksheet a/b work',
        parts: [
          {
            label: 'a',
            prompt: 'How many bags of pears are there at first?',
            equation: solved ? '27 ÷ 3 = 9' : '27 ÷ 3 = ____',
            answer: solved ? 'There are 9 bags of pears.' : 'There are ____ bags of pears.'
          },
          {
            label: 'b',
            prompt: 'How many bags are left?',
            equation: solved ? '9 - 5 = 4' : '____ - 5 = ____',
            answer: solved ? 'There are 4 bags left.' : 'There are ____ bags left.'
          }
        ]
      },
      {
        kind: 'equations',
        label: solved ? 'Teacher Edition solved equations' : 'Equation blanks',
        lines: solved ? ['27 ÷ 3 = 9', '9 - 5 = 4'] : ['27 ÷ 3 = ____', '____ - 5 = ____']
      },
      {
        kind: 'note',
        label: solved ? 'Answer sentence' : 'Workspace direction',
        text: solved
          ? 'There are 9 bags at first. After 5 bags are sold, 4 bags are left.'
          : 'Find the starting number of bags first. Then subtract the 5 sold bags.'
      }
    ]
  };
}

function lesson19Problem1Visual(solved: boolean): ProblemVisualSpec {
  const rows = [
    {
      label: 'a. 36 ÷ 3',
      sourceCrop: { page: 250, crop: { x: 103, y: 225, width: 305, height: 300 }, alt: 'Official 36-dot array split into 30 and 6, with the decomposed division scaffold' },
      total: 36,
      divisor: 3,
      quotient: 12,
      columns: 3,
      firstRows: 10,
      secondRows: 2,
      firstExpression: '(30 ÷ 3)',
      secondExpression: '(6 ÷ 3)',
      firstQuotient: 10,
      secondQuotient: 2
    },
    {
      label: 'b. 25 ÷ 5',
      sourceCrop: { page: 250, crop: { x: 468, y: 235, width: 325, height: 295 }, alt: 'Official 25-dot array split into 20 and 5, with the decomposed division scaffold' },
      total: 25,
      divisor: 5,
      quotient: 5,
      columns: 5,
      firstRows: 4,
      secondRows: 1,
      firstExpression: '(20 ÷ 5)',
      secondExpression: '(5 ÷ 5)',
      firstQuotient: 4,
      secondQuotient: 1
    },
    {
      label: 'c. 28 ÷ 4',
      sourceCrop: { page: 250, crop: { x: 102, y: 600, width: 310, height: 305 }, alt: 'Official 28-dot array split into 20 and 8, with the decomposed division scaffold' },
      total: 28,
      divisor: 4,
      quotient: 7,
      columns: 4,
      firstRows: 5,
      secondRows: 2,
      firstExpression: '(20 ÷ 4)',
      secondExpression: '(8 ÷ 4)',
      firstQuotient: 5,
      secondQuotient: 2
    },
    {
      label: 'd. 32 ÷ 4',
      sourceCrop: { page: 250, crop: { x: 466, y: 593, width: 330, height: 320 }, alt: 'Official 32-dot array split into 20 and 12, with the decomposed division scaffold' },
      total: 32,
      divisor: 4,
      quotient: 8,
      columns: 4,
      firstRows: 5,
      secondRows: 3,
      firstExpression: '(20 ÷ 4)',
      secondExpression: '(12 ÷ 4)',
      firstQuotient: 5,
      secondQuotient: 3
    }
  ];

  return {
    title: 'Problem 1: decomposed division arrays',
    sourceNote: solved
      ? 'Solved view follows the Lesson 19 Teacher Edition answer key: each array is split into friendly dividends and partial quotients.'
      : 'Blank view preserves the Teacher Edition four-part array split without filling the partial quotients.',
    sections: [
      {
        kind: 'card-grid' as const,
        label: solved ? 'Teacher Edition answer-key parts' : 'Teacher Edition blank parts',
        cards: rows.map((row) => ({
          label: row.label,
          sections: [
            observedSourceCrop(row.sourceCrop),
            {
              kind: 'array' as const,
              rows: row.firstRows + row.secondRows,
              columns: row.columns,
              item: 'dot' as const,
              splitAfterRows: row.firstRows,
              caption: solved
                ? `${row.firstExpression} = ${row.firstQuotient}; ${row.secondExpression} = ${row.secondQuotient}`
                : `${row.firstExpression} = ____; ${row.secondExpression} = ____`
            },
            {
              kind: 'equations' as const,
              label: solved ? 'Answer-key sentence' : 'Equation blanks',
              lines: solved
                ? [
                    `${row.total} ÷ ${row.divisor} = ${row.quotient}`,
                    `(${row.total} ÷ ${row.divisor}) = ${row.firstExpression} + ${row.secondExpression}`,
                    `${row.firstQuotient} + ${row.secondQuotient} = ${row.quotient}`
                  ]
                : [
                    `${row.total} ÷ ${row.divisor} = ____`,
                    `(${row.total} ÷ ${row.divisor}) = ${row.firstExpression} + ${row.secondExpression}`,
                    `____ + ____ = ____`
                  ]
            }
          ]
        }))
      }
    ]
  };
}

function lesson19Problem2Visual(solved: boolean): ProblemVisualSpec {
  const buckets = ['24 ÷ 2', '36 ÷ 3', '39 ÷ 3', '26 ÷ 2'];
  const balls = ['(30 ÷ 3) + (6 ÷ 3)', '(30 ÷ 3) + (9 ÷ 3)', '(20 ÷ 2) + (6 ÷ 2)', '(20 ÷ 2) + (4 ÷ 2)'];
  const matches = [
    { topIndex: 0, bottomIndex: 3, label: 'quotient 12' },
    { topIndex: 1, bottomIndex: 0, label: 'quotient 12' },
    { topIndex: 2, bottomIndex: 1, label: 'quotient 13' },
    { topIndex: 3, bottomIndex: 2, label: 'quotient 13' }
  ];

  return {
    title: 'Problem 2: bucket-to-ball expression matches',
    sourceNote: solved
      ? 'Solved view follows the Lesson 19 Teacher Edition answer key match order.'
      : 'Blank view keeps the bucket expressions and ball expressions separate for matching.',
    sections: [
      observedSourceCrop({
        page: 251,
        crop: { x: 86, y: 174, width: 686, height: 392 },
        alt: 'Official bucket and beach-ball expression matching models'
      }),
      {
        kind: 'expression-match',
        label: solved ? 'Teacher Edition answer-key matches' : 'Match the equal expressions',
        topLabel: 'Buckets',
        bottomLabel: 'Balls',
        topItems: buckets,
        bottomItems: balls,
        matches,
        showMatches: solved,
        note: solved
          ? 'Answer key order: first bucket to fourth ball; second to first; third to second; fourth to third.'
          : 'Match each bucket to the ball expression with the same quotient.'
      },
      {
        kind: 'note',
        label: solved ? 'Match check' : 'Workspace direction',
        text: solved
          ? 'The match is correct when the decomposed expression has the same divisor and the same quotient as the bucket expression.'
          : 'Compute each bucket and each ball expression, then match equal quotients.'
      }
    ]
  };
}

function lesson1ProblemVisual(problemNumber: number, solved: boolean): ProblemVisualSpec {
  const sourceCrop = (
    label: string,
    src: string,
    crop: { x: number; y: number; width: number; height: number },
    alt: string
  ): ProblemVisualSection => ({
    kind: 'source-crop',
    label,
    src,
    alt,
    imageWidth: 816,
    imageHeight: 1056,
    crop,
    displayWidth: Math.min(680, Math.max(300, Math.round(crop.width * 1.35)))
  });
  const answerNote = (text: string): ProblemVisualSection => ({
    kind: 'note',
    label: solved ? 'Check' : '',
    text
  });

  if (problemNumber === 1) {
    const cards = [
      {
        label: 'a.',
        sections: [
          sourceCrop('', '/source-pages/m1-teacher/page-029.png',
            { x: 70, y: 215, width: 260, height: 125 },
            'Three official hand drawings, each representing five fingers'),
          {
            kind: 'equations' as const,
            lines: solved
              ? ['3 groups of five = 15', '3 fives = 15', '3 × 5 = 15']
              : ['3 groups of five = ____', '3 fives = ____', '3 × 5 = ____']
          }
        ]
      },
      {
        label: 'b.',
        sections: [
          sourceCrop('', '/source-pages/m1-teacher/page-029.png',
            { x: 425, y: 255, width: 290, height: 75 },
            'Five official banana-bunch drawings, each representing three bananas'),
          {
            kind: 'equations' as const,
            lines: solved
              ? ['3 + 3 + 3 + 3 + 3 = 15', '5 groups of three = 15', '5 × 3 = 15']
              : ['3 + 3 + 3 + 3 + 3 = ____', '5 groups of three = ____', '5 × 3 = ____']
          }
        ]
      },
      {
        label: 'c.',
        sections: [
          sourceCrop('', '/source-pages/m1-teacher/page-029.png',
            { x: 220, y: 480, width: 400, height: 125 },
            'Four official egg-carton photographs, each containing six eggs'),
          {
            kind: 'equations' as const,
            lines: solved
              ? ['6 + 6 + 6 + 6 = 24', '4 groups of six = 24', '4 × 6 = 24']
              : ['6 + 6 + 6 + 6 = ____', '____ groups of six = ____', '4 × ____ = ____']
          }
        ]
      },
      {
        label: 'd.',
        sections: [
          sourceCrop('', '/source-pages/m1-teacher/page-029.png',
            { x: 75, y: 720, width: 655, height: 90 },
            'Six official groups, each containing four lemons'),
          {
            kind: 'equations' as const,
            lines: solved
              ? ['4 + 4 + 4 + 4 + 4 + 4 = 24', '6 groups of 4 = 24', '6 × 4 = 24']
              : ['4 + ____ + ____ + ____ + ____ + ____ = ____', '6 groups of ____ = ____', '6 × ____ = ____']
          }
        ]
      }
    ];
    return {
      title: 'Fill in the blanks',
      sourceNote: '',
      sections: [
        { kind: 'card-grid', label: '', cards },
        ...(solved
          ? [answerNote('The repeated addition, unit form, and multiplication sentence name the same total.')]
          : [])
      ]
    };
  }

  if (problemNumber === 2) {
    return {
      title: 'Problem 2: compare the two printed apple groups',
      sourceNote: 'The source shows one oval containing 3 apples and a second oval containing 2 apples.',
      sections: [
        sourceCrop('', '/source-pages/m1-teacher/page-030.png',
          { x: 110, y: 165, width: 435, height: 105 },
          'The official model: one oval with three apples and one oval with two apples'),
        {
          kind: 'source-response-workspace',
          label: solved ? 'Completed explanation' : 'Explain from the picture',
          parts: [{
            prompt: 'Does the picture show 2 × 3? Explain why or why not.',
            lines: [],
            printedLineCount: 0,
            responsePlaceholder: solved ? undefined : 'Use the number of groups and the number of apples in each group.',
            response: solved
              ? 'No. There are 2 groups, but they are not equal: one group has 3 apples and the other has 2.'
              : undefined
          }]
        }
      ]
    };
  }

  if (problemNumber === 3) {
    return {
      title: 'Problem 3: open drawing workspace',
      sourceNote: 'The Problem Set prints no model here; students author the drawing.',
      sections: solved
        ? [
            {
              kind: 'card-grid',
              label: 'One valid drawing',
              cards: [
                { label: 'Group 1', sections: [{ kind: 'array', rows: 1, columns: 3, item: 'dot' }] },
                { label: 'Group 2', sections: [{ kind: 'array', rows: 1, columns: 3, item: 'dot' }] }
              ]
            },
            { kind: 'equations', lines: ['2 × 3 = 6'] },
            answerNote('The drawing has 2 equal groups with 3 objects in each group.')
          ]
        : [
            {
              kind: 'source-response-workspace',
              label: 'Draw the model yourself',
              parts: [{
                prompt: 'Draw a picture with 2 equal groups and 3 objects in each group.',
                lines: [],
                printedLineCount: 0,
                sketchWorkspace: true
              }]
            }
          ]
    };
  }

  return {
    title: 'Problem 4: group the printed chocolate bank',
    sourceNote: 'Blank mode retains 12 ungrouped chocolates; Solved mode reveals 3 equal groups of 4.',
    sections: [
      {
        ...sourceCrop('', '/source-pages/m1-teacher/page-030.png',
          { x: 105, y: 640, width: 260, height: 145 },
          'The official bank of twelve ungrouped chocolates'),
        sketchOverlay: !solved,
        caption: solved
          ? 'The source bank contains 12 chocolates.'
          : 'Circle directly on the source bank to make 3 equal groups of 4.'
      } as ProblemVisualSection,
      ...(solved
        ? [{
            kind: 'card-grid' as const,
            label: '3 circled groups of 4',
            cards: Array.from({ length: 3 }, (_, index) => ({
              label: `Group ${index + 1}`,
              sections: [{ kind: 'array' as const, rows: 1, columns: 4, item: 'dot' as const, glyph: '●' }]
            }))
          }]
        : []),
      {
        kind: 'source-response-workspace',
        label: solved ? 'Completed sentences' : 'Write both requested sentences',
        parts: [{
          prompt: 'Represent the 3 equal groups of 4.',
          lines: solved
            ? ['Repeated addition: 4 + 4 + 4 = 12', 'Multiplication: 3 × 4 = 12']
            : ['Repeated addition: ____', 'Multiplication: ____'],
          lineAnswers: [['4 + 4 + 4 = 12'], ['3 × 4 = 12']],
          printedLineCount: 2,
          interactiveLines: !solved
        }]
      },
      ...(solved ? [answerNote('Caroline, Brian, and Marta each receive 4 chocolates.')] : [])
    ]
  };
}

type M1ObservedCrop = {
  page: number;
  crop: { x: number; y: number; width: number; height: number };
  alt: string;
};

function observedSourceCrop(observed: M1ObservedCrop, sketchOverlay = false): ProblemVisualSection {
  return {
    kind: 'source-crop',
    label: 'Official problem-level mathematical model',
    src: `/source-pages/m1-teacher/page-${String(observed.page).padStart(3, '0')}.png`,
    alt: observed.alt,
    imageWidth: 816,
    imageHeight: 1056,
    crop: observed.crop,
    displayWidth: Math.min(680, Math.max(300, Math.round(observed.crop.width * 1.35))),
    sketchOverlay
  };
}

function observedAnswerNote(text: string, solved: boolean): ProblemVisualSection {
  return {
    kind: 'note',
    label: solved ? 'Teacher Edition reasoning' : 'Student workspace',
    text
  };
}

const M1_OBSERVED_MODEL_CROPS: Record<number, Record<number, M1ObservedCrop>> = {
  2: {
    1: { page: 43, crop: { x: 110, y: 220, width: 115, height: 145 }, alt: 'Official array of 4 rows of 2 cars' },
    2: { page: 43, crop: { x: 105, y: 395, width: 190, height: 105 }, alt: 'Official array of 3 rows of 6 objects' },
    3: { page: 43, crop: { x: 105, y: 550, width: 105, height: 135 }, alt: 'Official array of 2 rows of 4 spoons' },
    4: { page: 43, crop: { x: 105, y: 720, width: 110, height: 125 }, alt: 'Official array of 5 rows of 4 triangles' },
    5: { page: 44, crop: { x: 80, y: 175, width: 95, height: 165 }, alt: 'Official two scattered groups of five dots' }
  },
  3: {
    1: { page: 56, crop: { x: 150, y: 220, width: 500, height: 70 }, alt: 'Official four bunches of five flowers' },
    2: { page: 56, crop: { x: 160, y: 495, width: 480, height: 65 }, alt: 'Official six boxes with three candies in each box' },
    3: { page: 56, crop: { x: 105, y: 775, width: 135, height: 105 }, alt: 'Official array of 3 rows of 4 oranges' },
    4: { page: 57, crop: { x: 105, y: 180, width: 130, height: 120 }, alt: 'Official array of 5 rows of 2 loaves' },
    5: { page: 57, crop: { x: 145, y: 425, width: 85, height: 120 }, alt: 'Official X array of 4 rows of 3' }
  },
  4: {
    1: { page: 70, crop: { x: 115, y: 180, width: 260, height: 150 }, alt: 'Official 14 flowers split into 2 equal groups' },
    2: { page: 70, crop: { x: 445, y: 180, width: 300, height: 150 }, alt: 'Official 28 books split into 4 equal groups' },
    3: { page: 70, crop: { x: 105, y: 415, width: 285, height: 155 }, alt: 'Official 30 apples on 3 trees' },
    4: { page: 70, crop: { x: 445, y: 425, width: 285, height: 155 }, alt: 'Official 12 cups split into 2 rows' },
    5: { page: 70, crop: { x: 120, y: 695, width: 280, height: 145 }, alt: 'Official 15 toys split into 3 rows' },
    6: { page: 70, crop: { x: 455, y: 700, width: 260, height: 140 }, alt: 'Official 9 cars split into 3 rows' },
    7: { page: 71, crop: { x: 165, y: 185, width: 455, height: 105 }, alt: 'Official 4 equal groups of colored pencils' },
    8: { page: 71, crop: { x: 125, y: 435, width: 525, height: 110 }, alt: 'Official five empty apple baskets' },
    9: { page: 71, crop: { x: 610, y: 680, width: 155, height: 215 }, alt: 'Official array of 5 rows of 3 butterflies' }
  },
  5: {
    1: { page: 80, crop: { x: 105, y: 170, width: 285, height: 190 }, alt: 'Official 6 tomatoes shown as 2 groups of 3' },
    2: { page: 80, crop: { x: 425, y: 185, width: 315, height: 145 }, alt: 'Official bank of 8 lollipops' },
    3: { page: 80, crop: { x: 100, y: 545, width: 270, height: 115 }, alt: 'Official bank of 10 stars' },
    4: { page: 80, crop: { x: 440, y: 560, width: 240, height: 95 }, alt: 'Official bank of 12 shells' },
    5: { page: 81, crop: { x: 190, y: 150, width: 280, height: 130 }, alt: 'Official bank of 9 crackers' }
  },
  6: {
    1: { page: 90, crop: { x: 105, y: 195, width: 560, height: 105 }, alt: 'Official bank of fifteen ungrouped tennis balls' }
  },
  7: {
    5: { page: 104, crop: { x: 130, y: 145, width: 565, height: 170 }, alt: 'Official fish arrays of four rows of two and two rows of four' },
    7: { page: 104, crop: { x: 72, y: 490, width: 700, height: 155 }, alt: 'Official four cloud-shaped missing-factor equations' }
  },
  9: {
    1: { page: 125, crop: { x: 105, y: 220, width: 135, height: 150 }, alt: 'Official soccer-ball arrays showing two rows of five plus three rows of five' },
    2: { page: 125, crop: { x: 102, y: 450, width: 235, height: 395 }, alt: 'Official seven-by-two circle array decomposed into five-by-two and two-by-two' },
    3: { page: 125, crop: { x: 445, y: 435, width: 305, height: 475 }, alt: 'Official ten-by-two triangle array with one row removed to show nine-by-two' }
  },
  10: {
    1: { page: 137, crop: { x: 80, y: 195, width: 350, height: 445 }, alt: 'Official seven-by-three square array split into five-by-three and two-by-three' },
    2: { page: 137, crop: { x: 455, y: 195, width: 305, height: 515 }, alt: 'Official eight-by-three trapezoid array split into two four-by-three arrays' },
    3: { page: 138, crop: { x: 175, y: 235, width: 480, height: 335 }, alt: 'Official open photo-album frame split into a two-row top and three-row bottom' }
  },
  11: {
    1: { page: 157, crop: { x: 225, y: 410, width: 360, height: 155 }, alt: 'Official six-unit tape skeleton with the first pair of oranges supplied' }
  },
  12: {
    1: { page: 169, crop: { x: 180, y: 190, width: 500, height: 190 }, alt: 'Official bank of eight ungrouped birds' },
    2: { page: 169, crop: { x: 215, y: 405, width: 465, height: 175 }, alt: 'Official five empty fish-bowl containers with total label' },
    3: { page: 169, crop: { x: 105, y: 650, width: 640, height: 245 }, alt: 'Official rabbit division facts and carrot quotient matching model' },
    4: { page: 170, crop: { x: 270, y: 215, width: 465, height: 250 }, alt: 'Official two-part ribbon tape diagram with open labels' }
  },
  13: {
    1: { page: 181, crop: { x: 105, y: 175, width: 655, height: 320 }, alt: 'Official ten multiplication-and-division key cards' },
    2: { page: 181, crop: { x: 120, y: 565, width: 545, height: 125 }, alt: 'Official bank of twelve ungrouped tomatoes' }
  },
  14: {
    1: { page: 194, crop: { x: 95, y: 185, width: 655, height: 665 }, alt: 'Official rows of fruit, count boxes, and multiplication-fact baskets' }
  },
  15: {
    1: { page: 205, crop: { x: 135, y: 180, width: 625, height: 675 }, alt: 'Official three pairs of commutative tape diagrams with open labels' }
  },
  16: {
    1: { page: 216, crop: { x: 110, y: 205, width: 650, height: 650 }, alt: 'Official four arrays decomposed from five rows of four' },
    2: { page: 217, crop: { x: 100, y: 125, width: 655, height: 455 }, alt: 'Official cloud expressions and hot-air-balloon fact matches' },
    3: { page: 217, crop: { x: 145, y: 670, width: 135, height: 265 }, alt: 'Official ten-by-four circle array split into two five-by-four arrays' }
  },
  17: {
    1: { page: 227, crop: { x: 80, y: 185, width: 335, height: 755 }, alt: 'Official ten rows of four source butterflies' }
  }
};

function observedM1Lesson16Or17Visual(
  lessonNumber: number,
  problem: ProblemSeed,
  solved: boolean
): ProblemVisualSpec | undefined {
  if (![16, 17].includes(lessonNumber)) return undefined;
  const observed = M1_OBSERVED_MODEL_CROPS[lessonNumber]?.[problem.number];
  if (lessonNumber === 16) {
    const authored = createM1ProblemVisual(problem, solved);
    return {
      title: `Problem ${problem.number}: exact source model with authored strategy`,
      sourceNote: `The exact printed Module 1 Lesson 16 model controls the representation; strategy rows remain authored HTML.`,
      sections: [
        ...(observed ? [observedSourceCrop(observed)] : []),
        ...authored.sections
      ]
    };
  }
  const sections: ProblemVisualSpec['sections'] = [];
  if (observed) sections.push(observedSourceCrop(observed));
  if (problem.number === 1) {
    const authored = createM1ProblemVisual(problem, solved);
    sections.push(...authored.sections.filter((section) => section.kind !== 'array'));
  } else if (!solved) {
    sections.push(observedAnswerNote(
      'The official Problem Set provides open work space and does not print a completed model or inferred equation scaffold.',
      false
    ));
  } else if (problem.number === 2) {
    sections.push({ kind: 'tape', label: 'Nine muffin boxes', totalLabel: '36 muffins', parts: Array.from({ length: 9 }, () => ({ label: '4' })) });
    sections.push({ kind: 'equations', lines: ['36 divided by 4 = 9'] });
  } else if (problem.number === 3) {
    sections.push({ kind: 'array', label: 'Four equal rows', rows: 4, columns: 8, item: 'glass' });
    sections.push({ kind: 'equations', lines: ['32 divided by 4 = 8'] });
  } else {
    sections.push({ kind: 'tape', label: 'Four equal notebook costs', totalLabel: '$28', parts: [{ label: '$7', emphasize: true }, { label: '$7', emphasize: true }, { label: '$7' }, { label: '$7' }] });
    sections.push({ kind: 'equations', lines: ['2 notebooks = $14'] });
  }
  sections.push(observedAnswerNote(
    solved ? problem.solvedAnswer : 'Author only the response requested by the official problem.',
    solved
  ));
  return {
    title: `Problem ${problem.number}: Teacher Edition observed workspace`,
    sourceNote: 'Problem-level structure observed directly on the official Module 1 Lesson 17 Problem Set.',
    sections
  };
}

function reviewedM1Lesson16To20Visual(
  lessonNumber: number,
  problem: ProblemSeed,
  solved: boolean
): ProblemVisualSpec | undefined {
  if (lessonNumber < 16 || lessonNumber > 20) return undefined;
  const sections: ProblemVisualSpec['sections'] = [];
  const key = `${lessonNumber}-${problem.number}`;
  type WorkPart = {
    lead?: string;
    prompt: string;
    blankLines?: string[];
    solvedLines?: string[];
    answers?: string[][];
    printedLineCount?: number;
    sketch?: boolean;
    placeholder?: string;
    response?: string;
    dividerBefore?: boolean;
  };
  const addWork = (parts: WorkPart[], columns: 1 | 2 | 3 | 4 = 1): void => {
    sections.push({
      kind: 'source-response-workspace',
      label: '',
      wide: true,
      columns,
      parts: parts.map((part) => ({
        lead: part.lead,
        prompt: part.prompt,
        lines: solved ? part.solvedLines ?? [] : part.blankLines ?? [],
        lineAnswers: part.answers,
        printedLineCount: part.printedLineCount ?? 0,
        interactiveLines: !solved && Boolean(part.answers?.some((answers) => answers.length)),
        sketchWorkspace: !solved && part.sketch,
        responsePlaceholder: !solved ? part.placeholder : undefined,
        response: solved ? part.response : undefined,
        dividerBefore: part.dividerBefore
      }))
    });
  };
  const addOpenAnswer = (placeholder: string, response: string, model?: ProblemVisualSection): void => {
    if (solved && model) sections.push(model);
    addWork([{ prompt: 'Show your work.', sketch: true, placeholder, response }]);
  };

  switch (key) {
    case '16-1': {
      const facts = [
        { lead: 'a.', total: 6, extra: 1, product: 24, extraProduct: 4,
          blank: ['6 × 4 = ____', '(5 × 4) = 20', '(1 × 4) = ____', '(6 × 4) = (5 × 4) + (1 × 4)', '= 20 + ____', '= ____'],
          answers: [['24'], [], ['4'], [], ['4'], ['24']] },
        { lead: 'b.', total: 7, extra: 2, product: 28, extraProduct: 8,
          blank: ['7 × 4 = ____', '(5 × 4) = ____', '(2 × 4) = ____', '(7 × 4) = (5 × 4) + (2 × 4)', '= ____ + ____', '= 28'],
          answers: [['28'], ['20'], ['8'], [], ['20', '8'], []] },
        { lead: 'c.', total: 8, extra: 3, product: 32, extraProduct: 12,
          blank: ['8 × 4 = ____', '(5 × 4) = ____', '(____ × 4) = ____', '(8 × 4) = (5 × 4) + (____ × 4)', '= ____ + ____', '= ____'],
          answers: [['32'], ['20'], ['3', '12'], ['3'], ['20', '12'], ['32']] },
        { lead: 'd.', total: 9, extra: 4, product: 36, extraProduct: 16,
          blank: ['9 × 4 = ____', '(5 × 4) = ____', '(____ × 4) = ____', '(9 × 4) = (5 × 4) + (____ × 4)', '= ____ + ____', '= ____'],
          answers: [['36'], ['20'], ['4', '16'], ['4'], ['20', '16'], ['36']] }
      ];
      sections.push({
        kind: 'card-grid',
        label: '',
        cards: facts.map((fact) => ({
          label: `${fact.lead} ${fact.total} × 4`,
          sections: [
            { kind: 'array', label: '', rows: fact.total, columns: 4, item: 'dot', glyph: '●', splitAfterRows: 5 },
            {
              kind: 'source-response-workspace', label: '', columns: 1,
              parts: [{
                prompt: 'Use 5 fours and the extra rows.',
                lines: solved
                  ? [`${fact.total} × 4 = ${fact.product}`, '(5 × 4) = 20', `(${fact.extra} × 4) = ${fact.extraProduct}`, `(${fact.total} × 4) = (5 × 4) + (${fact.extra} × 4)`, `= 20 + ${fact.extraProduct}`, `= ${fact.product}`]
                  : fact.blank,
                lineAnswers: fact.answers,
                printedLineCount: 6,
                interactiveLines: !solved
              }]
            }
          ]
        }))
      });
      break;
    }
    case '16-2': {
      const clouds = ['(5 × 4) + (3 × 4)', '(5 × 4) + (1 × 4)', '(5 × 4) + (4 × 4)', '(5 × 4) + (2 × 4)'];
      const balloons = ['9 × 4 · 36', '8 × 4 · 32', '6 × 4 · 24', '7 × 4 · 28'];
      sections.push({
        kind: 'expression-match', label: '', prompt: 'Match the equal expressions.',
        topItems: clouds, bottomItems: balloons, topShape: 'cloud', bottomShape: 'balloon',
        interactive: !solved, showMatches: solved,
        matches: [{ topIndex: 0, bottomIndex: 1 }, { topIndex: 1, bottomIndex: 2 }, { topIndex: 2, bottomIndex: 0 }, { topIndex: 3, bottomIndex: 3 }]
      });
      break;
    }
    case '16-3':
      sections.push({ kind: 'array', label: '', rows: 10, columns: 4, item: 'dot', glyph: '●', splitAfterRows: 5, caption: solved ? 'Two 5 × 4 arrays make one 10 × 4 array.' : 'The dashed split separates 5 fours and 5 fours.' });
      addWork([{ prompt: 'Explain Nolan’s strategy.', placeholder: 'Explain how doubling 5 × 4 finds 10 × 4.', response: 'Nolan breaks 10 fours into 5 fours and 5 fours. Since 5 × 4 = 20, doubling 20 gives 40.' }]);
      break;

    case '17-1': {
      const crop = observedSourceCrop(M1_OBSERVED_MODEL_CROPS[17][1]) as Extract<ProblemVisualSection, { kind: 'source-crop' }>;
      sections.push({ ...crop, label: '', displayWidth: 300 });
      const multiplicationBlank = ['1 × 4 = 4','2 × 4 = ____','____ × 4 = 12','____ × 4 = 16','____ × ____ = 20','____ × ____ = 24','____ × 4 = ____','____ × 4 = ____','____ × ____ = ____','____ × ____ = ____'];
      const divisionBlank = ['4 ÷ 4 = 1','____ ÷ 4 = 2','12 ÷ 4 = ____','16 ÷ 4 = ____','20 ÷ ____ = ____','24 ÷ ____ = ____','____ ÷ 4 = ____','____ ÷ 4 = ____','____ ÷ ____ = ____','____ ÷ ____ = ____'];
      const multiplicationAnswers = [[],['8'],['3'],['4'],['5','4'],['6','4'],['7','28'],['8','32'],['9','4','36'],['10','4','40']];
      const divisionAnswers = [[],['8'],['3'],['4'],['4','5'],['4','6'],['28','7'],['32','8'],['36','4','9'],['40','4','10']];
      sections.push({
        kind: 'expression-match', label: '', orientation: 'pairs', topLabel: 'Multiplication', bottomLabel: 'Related division',
        topItems: solved ? Array.from({ length: 10 }, (_, i) => `${i + 1} × 4 = ${(i + 1) * 4}`) : multiplicationBlank,
        bottomItems: solved ? Array.from({ length: 10 }, (_, i) => `${(i + 1) * 4} ÷ 4 = ${i + 1}`) : divisionBlank,
        topItemAnswers: solved ? undefined : multiplicationAnswers,
        bottomItemAnswers: solved ? undefined : divisionAnswers
      });
      break;
    }
    case '17-2':
      if (solved) sections.push({ kind: 'tape', label: '', totalLabel: '36 muffins', parts: Array.from({ length: 9 }, () => ({ label: '4' })), caption: '9 equal boxes' });
      addWork([{ prompt: 'Draw and label a tape diagram to find the number of boxes.', sketch: true, placeholder: 'Write the number of boxes.', response: 'The baker packs 9 boxes.' }]);
      break;
    case '17-3':
      addOpenAnswer('Write the number of glasses in each row.', 'There are 8 glasses in each row.');
      break;
    case '17-4':
      addOpenAnswer('Write the cost of 2 notebooks.', 'Two notebooks cost $14.');
      break;

    case '18-1':
    case '18-2':
    case '18-3':
    case '18-4': {
      const bonds = {
        1:{ whole:'8 tens', blankParts:['5 tens','____'], solvedParts:['5 tens','3 tens'], partAnswers:[[],['3 tens']], blank:['8 × 10 = ____','5 tens + ____ = 8 tens','(5 × 10) + (____ × 10) = 8 × 10','50 + ____ = ____','8 × 10 = ____'], solved:['8 × 10 = 80','5 tens + 3 tens = 8 tens','(5 × 10) + (3 × 10) = 8 × 10','50 + 30 = 80','8 × 10 = 80'], answers:[['80'],['3 tens'],['3'],['30','80'],['80']] },
        2:{ whole:'7 fours', blankParts:['5 fours','____'], solvedParts:['5 fours','2 fours'], partAnswers:[[],['2 fours']], blank:['7 × 4 = ____','5 fours + ____ = 7 fours','(5 × 4) + (____ × 4) = 7 × 4','20 + ____ = ____','7 × 4 = ____'], solved:['7 × 4 = 28','5 fours + 2 fours = 7 fours','(5 × 4) + (2 × 4) = 7 × 4','20 + 8 = 28','7 × 4 = 28'], answers:[['28'],['2 fours'],['2'],['8','28'],['28']] },
        3:{ whole:'9 × 10', blankParts:['5 × 10','____'], solvedParts:['5 × 10','4 × 10'], partAnswers:[[],['4 × 10']], blank:['9 × 10 = ____','5 tens + ____ = 9 tens','(5 × 10) + (____ × 10) = 9 × 10','____ + ____ = ____','9 × 10 = ____'], solved:['9 × 10 = 90','5 tens + 4 tens = 9 tens','(5 × 10) + (4 × 10) = 9 × 10','50 + 40 = 90','9 × 10 = 90'], answers:[['90'],['4 tens'],['4'],['50','40','90'],['90']] },
        4:{ whole:'10 × 10', blankParts:['____','____'], solvedParts:['5 × 10','5 × 10'], partAnswers:[['5 × 10'],['5 × 10']], blank:['10 × 10 = ____','____ + ____ = 10 tens','(____ × 10) + (____ × 10) = 10 × 10','____ + ____ = ____','10 × 10 = ____'], solved:['10 × 10 = 100','5 tens + 5 tens = 10 tens','(5 × 10) + (5 × 10) = 10 × 10','50 + 50 = 100','10 × 10 = 100'], answers:[['100'],['5 tens','5 tens'],['5','5'],['50','50','100'],['100']] }
      } as const;
      const bond = bonds[problem.number as 1 | 2 | 3 | 4];
      sections.push({
        kind: 'number-bond', label: '', whole: bond.whole,
        parts: (solved ? bond.solvedParts : bond.blankParts).map((label) => ({ label })),
        partAnswers: solved ? undefined : bond.partAnswers.map((answers) => [...answers]),
        equations: solved ? [...bond.solved] : [...bond.blank],
        equationAnswers: solved ? undefined : bond.answers.map((answers) => [...answers])
      });
      break;
    }
    case '18-5':
      if (solved) sections.push({ kind: 'number-bond', label: '', whole: '7 × 10', parts: [{ label: '5 × 10' }, { label: '2 × 10' }], equations: ['50 + 20 = 70'] });
      addWork([{ prompt: 'Use break apart and distribute. Draw a number bond to solve.', blankLines: ['There are ____ children playing in the tournament.'], solvedLines: ['There are 70 children playing in the tournament.'], answers: [['70']], printedLineCount: 1, sketch: true }]);
      break;
    case '18-6':
      addOpenAnswer('Write the total number of sides.', 'There are 24 sides in total.');
      break;
    case '18-7':
      addOpenAnswer('Write the total number of bottles.', 'There are 120 bottles in the vending machine.');
      break;

    case '19-1': {
      const divisions = [
        { lead:'a.', dividend:36, divisor:3, rows:12, columns:3, split:10, parts:[30,6], partials:[10,2], total:12 },
        { lead:'b.', dividend:25, divisor:5, rows:5, columns:5, split:4, parts:[20,5], partials:[4,1], total:5 },
        { lead:'c.', dividend:28, divisor:4, rows:7, columns:4, split:5, parts:[20,8], partials:[5,2], total:7 },
        { lead:'d.', dividend:32, divisor:4, rows:8, columns:4, split:5, parts:[20,12], partials:[5,3], total:8 }
      ];
      sections.push({
        kind:'card-grid', label:'',
        cards:divisions.map((fact)=>({ label:`${fact.lead} ${fact.dividend} ÷ ${fact.divisor}`, sections:[
          { kind:'array', label:'', rows:fact.rows, columns:fact.columns, item:'dot', glyph:'●', splitAfterRows:fact.split },
          { kind:'source-response-workspace', label:'', columns:1, parts:[{
            prompt:'Divide each friendly part, then add the partial quotients.',
            lines: solved ? [
              `${fact.dividend} ÷ ${fact.divisor} = ${fact.total}`,
              `(${fact.parts[0]} ÷ ${fact.divisor}) = ${fact.partials[0]}`,
              `(${fact.parts[1]} ÷ ${fact.divisor}) = ${fact.partials[1]}`,
              `(${fact.dividend} ÷ ${fact.divisor}) = (${fact.parts[0]} ÷ ${fact.divisor}) + (${fact.parts[1]} ÷ ${fact.divisor})`,
              `= ${fact.partials[0]} + ${fact.partials[1]}`,
              `= ${fact.total}`
            ] : [
              `${fact.dividend} ÷ ${fact.divisor} = ____`,
              `(${fact.parts[0]} ÷ ${fact.divisor}) = ____`,
              `(${fact.parts[1]} ÷ ${fact.divisor}) = ____`,
              `(${fact.dividend} ÷ ${fact.divisor}) = (${fact.parts[0]} ÷ ${fact.divisor}) + (${fact.parts[1]} ÷ ${fact.divisor})`,
              `= ____ + ____`,
              '= ____'
            ],
            lineAnswers:[[String(fact.total)],[String(fact.partials[0])],[String(fact.partials[1])],[],[String(fact.partials[0]),String(fact.partials[1])],[String(fact.total)]],
            printedLineCount:6, interactiveLines:!solved
          }]}
        ]}))
      });
      break;
    }
    case '19-2':
      sections.push({
        kind:'expression-match', label:'', prompt:'Match the equal expressions.',
        topItems:['24 ÷ 2','36 ÷ 3','39 ÷ 3','26 ÷ 2'],
        bottomItems:['(30 ÷ 3) + (6 ÷ 3)','(30 ÷ 3) + (9 ÷ 3)','(20 ÷ 2) + (6 ÷ 2)','(20 ÷ 2) + (4 ÷ 2)'],
        topShape:'bucket', bottomShape:'ball', interactive:!solved, showMatches:solved,
        matches:[{topIndex:0,bottomIndex:3},{topIndex:1,bottomIndex:0},{topIndex:2,bottomIndex:1},{topIndex:3,bottomIndex:2}]
      });
      break;
    case '19-3':
      sections.push({ kind:'array', label:'', rows:12, columns:2, item:'dot', glyph:'●', splitAfterRows:6, caption:solved ? 'Two groups of 12 are divided by 2.' : 'The split shows 12 objects and 12 objects.' });
      addWork([{ prompt:'Explain Nell’s strategy.', placeholder:'Explain how the two smaller division facts solve 24 ÷ 2.', response:'Nell breaks 24 ÷ 2 into 12 ÷ 2 and 12 ÷ 2. Each quotient is 6, and 6 + 6 = 12.' }]);
      break;

    case '20-1':
      sections.push({ kind:'tape', label:'Magazine', totalLabel:'$4', parts:[{label:'$4'}] });
      sections.push({
        kind:'tape', label:'Books', totalLabel:solved ? '$24' : 'Book total',
        parts:Array.from({length:3},()=>({label:solved ? '$8' : '____'})),
        partAnswers:solved ? undefined : [['$8'],['$8'],['$8']],
        caption:solved ? '$24 + $4 = $28 altogether' : 'Three equal book units; then combine with the magazine.'
      });
      addWork([
        { lead:'a.', prompt:'What is the total cost of the books?', blankLines:['The books cost $____.'], solvedLines:['The books cost $24.'], answers:[['24']] },
        { lead:'b.', prompt:'How much does Ted spend altogether?', blankLines:['Ted spends $____ altogether.'], solvedLines:['Ted spends $28 altogether.'], answers:[['28']] }
      ]);
      break;
    case '20-2':
      sections.push({
        kind:'tape', label:'Seven children share equally', totalLabel:'28',
        parts:Array.from({length:7},()=>({label:solved ? '4' : ''})),
        braces:[
          {label:'1 child',boxLabel:solved ? '4' : '____',startPart:0,partCount:1},
          {label:'3 children',boxLabel:solved ? '12' : '____',startPart:3,partCount:3}
        ],
        braceAnswers:solved ? undefined : [['4'],['12']]
      });
      addWork([
        { lead:'a.', prompt:'How many silly bands does each child get?', blankLines:['Each child gets ____ silly bands.'], solvedLines:['Each child gets 4 silly bands.'], answers:[['4']] },
        { lead:'b.', prompt:'How many silly bands do 3 children get?', blankLines:['Three children get ____ silly bands.'], solvedLines:['Three children get 12 silly bands.'], answers:[['12']] }
      ]);
      break;
    case '20-3':
      addOpenAnswer('Write how many cups are unbroken.', '12 cups are unbroken.');
      break;
    case '20-4':
      addOpenAnswer('Write how many blue and red balloons each child gets.', 'Each child gets 5 blue balloons and 3 red balloons.');
      break;
    case '20-5':
      addOpenAnswer('Write how many bags of pears are left.', '4 bags of pears are left.');
      break;
  }

  return { title:'', sourceNote:'', sections };
}

function reviewedM1Lesson11To15Visual(
  lessonNumber: number,
  problem: ProblemSeed,
  solved: boolean
): ProblemVisualSpec | undefined {
  if (lessonNumber < 11 || lessonNumber > 15) return undefined;
  const observed = M1_OBSERVED_MODEL_CROPS[lessonNumber]?.[problem.number];
  const sections: ProblemVisualSpec['sections'] = [];
  const key = `${lessonNumber}-${problem.number}`;
  type Part = {
    lead?: string;
    prompt: string;
    blankLines?: string[];
    solvedLines?: string[];
    answers?: string[][];
    printedLineCount?: number;
    sketch?: boolean;
    placeholder?: string;
    response?: string;
  };
  const addCrop = (sketchOverlay = false): void => {
    if (!observed) return;
    const crop = observedSourceCrop(observed, sketchOverlay && !solved) as Extract<
      ProblemVisualSection,
      { kind: 'source-crop' }
    >;
    sections.push({
      ...crop,
      label: '',
      displayWidth: key === '14-1' ? 420 : key === '15-1' ? 500 : Math.min(crop.displayWidth ?? 620, 620)
    });
  };
  const addResponse = (parts: Part[], columns: 1 | 2 | 3 | 4 = 1): void => {
    sections.push({
      kind: 'source-response-workspace',
      label: '',
      wide: true,
      columns,
      parts: parts.map((part) => ({
        lead: part.lead,
        prompt: part.prompt,
        lines: solved ? part.solvedLines ?? [] : part.blankLines ?? [],
        lineAnswers: part.answers,
        printedLineCount: part.printedLineCount ?? 0,
        interactiveLines: !solved && Boolean(part.answers?.length),
        sketchWorkspace: !solved && part.sketch,
        responsePlaceholder: !solved ? part.placeholder : undefined,
        response: solved ? part.response : undefined
      }))
    });
  };
  const addArrayTape = (groups: number, size: number, glyph: string, total: number): void => {
    if (!solved) return;
    sections.push({
      kind: 'card-grid',
      label: '',
      cards: [
        { label: `${groups} columns of ${size}`, sections: [{ kind: 'array', rows: size, columns: groups, item: 'dot', glyph }] },
        { label: `${groups} equal units`, sections: [{ kind: 'tape', totalLabel: `${total}`, parts: Array.from({ length: groups }, () => ({ label: `${size}` })) }] }
      ]
    });
  };

  switch (key) {
    case '11-1':
      addResponse([{ lead: 'a.', prompt: 'Draw an array where each column is one bag.', blankLines: ['12 ÷ 2 = ____'], solvedLines: ['12 ÷ 2 = 6'], answers: [['6']], printedLineCount: 1, sketch: true }]);
      addCrop(true);
      if (solved) addArrayTape(6, 2, '●', 12);
      addResponse([{ lead: 'b.', prompt: 'Label the printed tape with the known and unknown information.', blankLines: ['1 unit = ____ oranges', 'Whole = ____ oranges', 'Number of bags = ____'], solvedLines: ['1 unit = 2 oranges', 'Whole = 12 oranges', 'Number of bags = 6'], answers: [['2'], ['12'], ['6']], printedLineCount: 0 }]);
      break;
    case '11-2':
      addArrayTape(6, 3, '●', 18);
      addResponse([{ prompt: 'Model the problem with both an array and a labeled tape diagram.', blankLines: ['There are ____ plums in each bag.'], solvedLines: ['There are 3 plums in each bag.'], answers: [['3']], printedLineCount: 1, sketch: true, response: 'Six columns of 3 show 18 plums.' }]);
      break;
    case '11-3':
      addArrayTape(7, 2, '▥', 14);
      addResponse([{ prompt: 'Model the problem with both an array and a labeled tape diagram.', sketch: true, placeholder: 'Write the number of baskets in each pile.', response: 'There are 2 baskets in each pile.' }]);
      break;
    case '11-4':
      addArrayTape(8, 3, '◆', 24);
      addResponse([{ prompt: 'Model the problem with both an array and a labeled tape diagram.', sketch: true, placeholder: 'Write the number of bell peppers in each bag.', response: 'There are 3 bell peppers in each bag.' }]);
      break;
    case '11-5':
      if (solved) sections.push({ kind: 'tape', label: '', totalLabel: '$16', parts: Array.from({ length: 8 }, () => ({ label: '$2' })) });
      addResponse([{ prompt: 'Show your work.', sketch: true, placeholder: 'Write how many weeks Olga needs.', response: 'It will take Olga 8 weeks.' }]);
      break;

    case '13-1': {
      addCrop();
      const multipliers = Array.from({ length: 10 }, (_, index) => index + 1);
      const blankTop = multipliers.map((n) => n <= 3 ? `${n} × 3 = ${n * 3}` : `${n} × 3 = ____`);
      const blankBottom = multipliers.map((n) => n <= 2 ? `${n * 3} ÷ 3 = ____` : `____ ÷ 3 = ${n}`);
      sections.push({
        kind: 'expression-match', label: '', orientation: 'pairs',
        topItems: solved ? multipliers.map((n) => `${n} × 3 = ${n * 3}`) : blankTop,
        bottomItems: solved ? multipliers.map((n) => `${n * 3} ÷ 3 = ${n}`) : blankBottom,
        topItemAnswers: solved ? undefined : multipliers.map((n) => n <= 3 ? [] : [`${n * 3}`]),
        bottomItemAnswers: solved ? undefined : multipliers.map((n) => n <= 2 ? [`${n}`] : [`${n * 3}`])
      });
      break;
    }
    case '13-2':
      addCrop(true);
      addArrayTape(4, 3, '●', 12);
      addResponse([
        { lead: 'a.', prompt: 'Circle groups of 3 and skip-count the total.', blankLines: ['3, ____, ____, ____'], solvedLines: ['3, 6, 9, 12'], answers: [['6', '9', '12']], printedLineCount: 1 },
        { lead: 'b.', prompt: 'Draw and label a tape diagram.', blankLines: ['____ ÷ 3 = ____', 'Mr. Lawton packs ____ bags.'], solvedLines: ['12 ÷ 3 = 4', 'Mr. Lawton packs 4 bags.'], answers: [['12', '4'], ['4']], printedLineCount: 2, sketch: true }
      ]);
      break;
    case '13-3':
      addArrayTape(5, 3, '▭', 15);
      addResponse([{ prompt: 'Draw and label a tape diagram to solve.', blankLines: ['Camille buys ____ stamps.'], solvedLines: ['Camille buys 5 stamps.'], answers: [['5']], printedLineCount: 1, sketch: true }]);
      break;
    case '13-4':
      if (solved) addArrayTape(3, 10, '●', 30);
      addResponse([{ prompt: 'Show your work.', sketch: true, placeholder: 'Write how many students are in each van.', response: 'There are 10 students in each van.' }]);
      break;
    case '13-5':
      if (solved) sections.push({ kind: 'tape', label: '', totalLabel: '$24', parts: Array.from({ length: 8 }, () => ({ label: '$3' })) });
      addResponse([{ prompt: 'Show your work.', sketch: true, placeholder: 'Write how many people buy frozen yogurt.', response: '8 people buy frozen yogurt.' }]);
      break;

    case '14-1': {
      addCrop();
      const values = [8, 12, 16, 20, 24, 28, 32, 36, 40];
      const facts = ['6 × 4', '10 × 4', '5 × 4', '2 × 4', '4 × 4', '9 × 4', '8 × 4', '7 × 4', '3 × 4'];
      const products = [24, 40, 20, 8, 16, 36, 32, 28, 12];
      addResponse([{ prompt: 'Skip-count by fours.', blankLines: ['4, 8, ____, ____, ____, ____, ____, ____, ____, ____'], solvedLines: ['4, 8, 12, 16, 20, 24, 28, 32, 36, 40'], answers: [['12','16','20','24','28','32','36','40']], printedLineCount: 10 }]);
      sections.push({ kind: 'expression-match', label: '', prompt: 'Match each answer to its expression.', topItems: values.map(String), bottomItems: facts, interactive: !solved, showMatches: solved, matches: products.map((product, bottomIndex) => ({ topIndex: values.indexOf(product), bottomIndex })) });
      break;
    }
    case '14-2':
      if (solved) sections.push({ kind: 'tape', label: '', totalLabel: '28 wheels', parts: Array.from({ length: 7 }, () => ({ label: '4' })) });
      addResponse([{ prompt: 'Draw and label a tape diagram to solve.', blankLines: ['Mr. Schmidt replaces ____ wheels.'], solvedLines: ['Mr. Schmidt replaces 28 wheels.'], answers: [['28']], printedLineCount: 1, sketch: true }]);
      break;
    case '14-3':
      if (solved) sections.push({ kind: 'tape', label: '', totalLabel: '24 beads', parts: Array.from({ length: 4 }, () => ({ label: '6' })) });
      addResponse([{ prompt: 'Draw and label a tape diagram to show the total number of beads.', sketch: true, placeholder: 'Write the total shown by your diagram.', response: 'Trina uses 24 beads.' }]);
      break;
    case '14-4':
      if (solved) sections.push({ kind: 'array', label: '', rows: 5, columns: 4, item: 'square', glyph: '▭' });
      addResponse([{ prompt: 'Show your work.', sketch: true, placeholder: 'Write the total number of sides.', response: '5 rectangles have 20 sides.' }]);
      break;

    case '15-1':
      addCrop();
      if (solved) sections.push({ kind: 'card-grid', label: '', cards: [
        { label: 'a. 2 rows of 4', sections: [{ kind: 'array', rows: 2, columns: 4, item: 'dot', glyph: '●' }] },
        { label: 'b. 3 rows of 4', sections: [{ kind: 'array', rows: 3, columns: 4, item: 'dot', glyph: '●' }] },
        { label: 'c. 7 rows of 4', sections: [{ kind: 'array', rows: 7, columns: 4, item: 'dot', glyph: '●' }] }
      ] });
      addResponse([
        { lead: 'a.', prompt: 'Label both tapes, complete the equations, and draw an array.', blankLines: ['2 × 4 = ____', '4 × 2 = ____'], solvedLines: ['2 × 4 = 8', '4 × 2 = 8'], answers: [['8'], ['8']], printedLineCount: 2, sketch: true },
        { lead: 'b.', prompt: 'Label both tapes, complete the equations, and draw an array.', blankLines: ['____ × 4 = ____', '4 × ____ = ____'], solvedLines: ['3 × 4 = 12', '4 × 3 = 12'], answers: [['3','12'], ['3','12']], printedLineCount: 2, sketch: true },
        { lead: 'c.', prompt: 'Label both tapes, complete the equations, and draw an array.', blankLines: ['____ × ____ = 28', '____ × ____ = 28'], solvedLines: ['7 × 4 = 28', '4 × 7 = 28'], answers: [['7','4'], ['4','7']], printedLineCount: 2, sketch: true }
      ]);
      break;
    case '15-2':
      if (solved) sections.push({ kind: 'card-grid', label: '', cards: [
        { label: '4 groups of 6', sections: [{ kind: 'tape', totalLabel: '24', parts: Array.from({ length: 4 }, () => ({ label: '6' })) }] },
        { label: '6 groups of 4', sections: [{ kind: 'tape', totalLabel: '24', parts: Array.from({ length: 6 }, () => ({ label: '4' })) }] }
      ] });
      addResponse([
        { lead: '4 × 6', prompt: 'Draw and label the first tape diagram.', sketch: true, response: '4 equal parts of 6 make 24.' },
        { lead: '6 × 4', prompt: 'Draw and label the second tape diagram.', sketch: true, response: '6 equal parts of 4 also make 24.' }
      ], 2);
      break;
    case '15-3':
      if (solved) sections.push({ kind: 'tape', label: '', totalLabel: '32 petals', parts: Array.from({ length: 4 }, () => ({ label: '8' })) });
      addResponse([{ prompt: 'Draw and label a tape diagram.', sketch: true, placeholder: 'Write the total number of petals.', response: 'The flowers have 32 petals in total.' }]);
      break;
    case '15-4':
      if (solved) sections.push({ kind: 'array', label: '', rows: 8, columns: 4, item: 'dot', glyph: '│' });
      addResponse([{ prompt: 'Show your work.', sketch: true, placeholder: 'Write how many chair legs there are altogether.', response: 'There are 32 chair legs altogether.' }]);
      break;
  }

  return { title: '', sourceNote: '', sections };
}

function observedM1Lesson11To15Visual(
  lessonNumber: number,
  problem: ProblemSeed,
  solved: boolean
): ProblemVisualSpec | undefined {
  if (lessonNumber < 11 || lessonNumber > 15) return undefined;
  const observed = M1_OBSERVED_MODEL_CROPS[lessonNumber]?.[problem.number];
  const sections: ProblemVisualSpec['sections'] = observed ? [observedSourceCrop(observed)] : [];
  const blankEquations = problem.blankEquations ?? problem.equations.map(blankEquation);
  if (!solved) {
    if (!(lessonNumber === 12 && problem.number === 3) && !(lessonNumber === 13 && problem.number === 1) &&
        !(lessonNumber === 14 && problem.number === 1)) {
      sections.push(observedAnswerNote(
        observed
          ? 'Complete the labels and author only the drawings requested around the official printed scaffold.'
          : 'The official Problem Set leaves the model and written response open; no completed representation is prefilled.',
        false
      ));
    }
  } else {
    const arrayTape = (rows: number, columns: number, glyph: string, total: number): ProblemVisualSection => ({
      kind: 'card-grid',
      label: 'Array and labeled tape diagram',
      cards: [
        { label: `${rows} groups of ${columns}`, sections: [{ kind: 'array', rows, columns, item: 'dot', glyph }] },
        {
          label: `${total} total`,
          sections: [{ kind: 'tape', totalLabel: `${total} total`, parts: Array.from({ length: rows }, () => ({ label: String(columns) })) }]
        }
      ]
    });
    if (lessonNumber === 11 && problem.number === 1) sections.push(arrayTape(6, 2, '🍊', 12));
    if (lessonNumber === 11 && problem.number === 2) sections.push(arrayTape(6, 3, '●', 18));
    if (lessonNumber === 11 && problem.number === 3) sections.push(arrayTape(7, 2, '▥', 14));
    if (lessonNumber === 11 && problem.number === 4) sections.push(arrayTape(8, 3, '◆', 24));
    if (lessonNumber === 11 && problem.number === 5) {
      sections.push({ kind: 'tape', label: 'Eight weeks of two dollars', totalLabel: '16 dollars', parts: Array.from({ length: 8 }, () => ({ label: '2' })) });
    }
    if (lessonNumber === 12 && problem.number === 1) {
      sections.push({
        kind: 'card-grid', label: 'Reveal four circled cages of two',
        cards: Array.from({ length: 4 }, (_, i) => ({ label: `Cage ${i + 1}`, sections: [{ kind: 'array', rows: 1, columns: 2, item: 'dot', glyph: '🐦' }] }))
      });
    }
    if (lessonNumber === 12 && problem.number === 2) {
      sections.push({
        kind: 'card-grid', label: 'Reveal two fish in each bowl',
        cards: Array.from({ length: 5 }, (_, i) => ({ label: `Bowl ${i + 1}`, sections: [{ kind: 'array', rows: 1, columns: 2, item: 'dot', glyph: '🐟' }] }))
      });
    }
    if (lessonNumber === 12 && problem.number === 4) {
      sections.push({ kind: 'tape', label: 'Two equal ribbon pieces', totalLabel: '14 meters', parts: [{ label: '7' }, { label: '7' }] });
    }
    if (lessonNumber === 12 && problem.number === 5) {
      sections.push({ kind: 'tape', label: 'Six mornings', totalLabel: '12 bars', parts: Array.from({ length: 6 }, () => ({ label: '2' })) });
    }
    if (lessonNumber === 12 && problem.number === 6) {
      sections.push({ kind: 'tape', label: 'Two equal shares', totalLabel: '18 dollars', parts: [{ label: '9' }, { label: '9' }] });
    }
    if (lessonNumber === 13 && problem.number === 2) {
      sections.push(arrayTape(4, 3, '🍅', 12));
    }
    if (lessonNumber === 13 && problem.number === 3) sections.push(arrayTape(5, 3, '▭', 15));
    if (lessonNumber === 13 && problem.number === 4) sections.push(arrayTape(3, 10, '●', 30));
    if (lessonNumber === 13 && problem.number === 5) sections.push({ kind: 'tape', label: 'Eight equal payments', totalLabel: '24 dollars', parts: Array.from({ length: 8 }, () => ({ label: '3' })) });
    if (lessonNumber === 14 && problem.number === 2) sections.push({ kind: 'tape', label: 'Seven cars', totalLabel: '28 wheels', parts: Array.from({ length: 7 }, () => ({ label: '4' })) });
    if (lessonNumber === 14 && problem.number === 3) sections.push({ kind: 'tape', label: 'Four bracelets', totalLabel: '24 beads', parts: Array.from({ length: 4 }, () => ({ label: '6' })) });
    if (lessonNumber === 14 && problem.number === 4) {
      sections.push({
        kind: 'card-grid', label: 'Five rectangles, four sides each',
        cards: Array.from({ length: 5 }, (_, i) => ({ label: `Rectangle ${i + 1}`, sections: [{ kind: 'array', rows: 1, columns: 4, item: 'dot', glyph: '—' }] }))
      });
    }
    if (lessonNumber === 15 && problem.number === 2) {
      sections.push({
        kind: 'card-grid', label: 'Two commutative tape diagrams',
        cards: [
          { label: '4 groups of 6', sections: [{ kind: 'tape', totalLabel: '24', parts: Array.from({ length: 4 }, () => ({ label: '6' })) }] },
          { label: '6 groups of 4', sections: [{ kind: 'tape', totalLabel: '24', parts: Array.from({ length: 6 }, () => ({ label: '4' })) }] }
        ]
      });
    }
    if (lessonNumber === 15 && problem.number === 3) sections.push({ kind: 'tape', label: 'Four flowers', totalLabel: '32 petals', parts: Array.from({ length: 4 }, () => ({ label: '8' })) });
    if (lessonNumber === 15 && problem.number === 4) {
      sections.push({
        kind: 'card-grid', label: 'Eight chairs with four legs each',
        cards: Array.from({ length: 8 }, (_, i) => ({ label: `Chair ${i + 1}`, sections: [{ kind: 'array', rows: 1, columns: 4, item: 'dot', glyph: '│' }] }))
      });
    }
  }
  sections.push({
    kind: 'equations',
    label: solved ? 'Teacher Edition completed response' : 'Official response structure',
    lines: solved ? problem.equations : blankEquations
  });
  sections.push(observedAnswerNote(
    solved ? problem.solvedAnswer : 'Complete only the official labels, model, equation fields, and answer sentence.',
    solved
  ));
  return {
    title: `Problem ${problem.number}: Teacher Edition observed workspace`,
    sourceNote: `Problem-level structure observed directly on the official Module 1 Lesson ${lessonNumber} Problem Set.`,
    sections
  };
}

function observedM1Lesson18Visual(problem: ProblemSeed, solved: boolean): ProblemVisualSpec {
  const sections: ProblemVisualSpec['sections'] = [];
  const bondData: Record<number, { whole: string; blankParts: string[]; solvedParts: string[] }> = {
    1: { whole: '8 tens', blankParts: ['5 tens', '____'], solvedParts: ['5 tens', '3 tens'] },
    2: { whole: '7 fours', blankParts: ['5 fours', '____'], solvedParts: ['5 fours', '2 fours'] },
    3: { whole: '9 × 10', blankParts: ['5 × 10', '____'], solvedParts: ['5 × 10', '4 × 10'] },
    4: { whole: '10 × 10', blankParts: ['____', '____'], solvedParts: ['5 × 10', '5 × 10'] },
    5: { whole: '7 teams of 10', blankParts: ['5 teams of 10', '____'], solvedParts: ['5 teams of 10', '2 teams of 10'] }
  };
  const bond = bondData[problem.number];
  if (bond) {
    const parts = solved ? bond.solvedParts : bond.blankParts;
    sections.push({
      kind: 'number-bond',
      label: solved ? 'Teacher Edition completed number bond' : 'Official number-bond structure',
      whole: bond.whole,
      parts: parts.map((label, index) => ({ label, sublabel: `part ${index + 1}` })),
      equations: solved ? problem.equations : undefined
    });
  } else if (!solved) {
    sections.push(observedAnswerNote('The official task provides written response space only; no model is prefilled.', false));
  }
  sections.push({
    kind: 'equations',
    label: solved ? 'Teacher Edition completed response' : 'Official response structure',
    lines: solved ? problem.equations : problem.blankEquations ?? []
  });
  sections.push(observedAnswerNote(
    solved ? problem.solvedAnswer : 'Complete only the official number bond, equations, and answer sentence.',
    solved
  ));
  return {
    title: `Problem ${problem.number}: Teacher Edition observed workspace`,
    sourceNote: 'Problem-level structure observed directly on the official Module 1 Lesson 18 Problem Set.',
    sections
  };
}

function observedM1Lesson6To10Visual(
  lessonNumber: number,
  problem: ProblemSeed,
  solved: boolean
): ProblemVisualSpec | undefined {
  if (lessonNumber < 6 || lessonNumber > 10) return undefined;
  const observed = M1_OBSERVED_MODEL_CROPS[lessonNumber]?.[problem.number];
  const sections: ProblemVisualSpec['sections'] = [];
  const key = `${lessonNumber}-${problem.number}`;
  type WorkbookPart = {
    lead?: string;
    prompt: string;
    blankLines?: string[];
    solvedLines?: string[];
    answers?: string[][];
    printedLineCount?: number;
    sketch?: boolean;
    writtenPrompt?: string;
    writtenAnswer?: string;
    dividerBefore?: boolean;
    columnSpan?: 'all' | 1 | 2 | 3 | 4;
  };
  const addCrop = (sketchOverlay = false): void => {
    if (!observed) return;
    sections.push({
      ...observedSourceCrop(observed, sketchOverlay && !solved),
      label: ''
    });
  };
  const addResponse = (parts: WorkbookPart[], columns: 1 | 2 | 3 | 4 = 1): void => {
    sections.push({
      kind: 'source-response-workspace',
      label: '',
      wide: true,
      columns,
      parts: parts.map((part) => ({
        lead: part.lead,
        prompt: part.prompt,
        lines: solved ? part.solvedLines ?? [] : part.blankLines ?? [],
        lineAnswers: part.answers,
        printedLineCount: part.printedLineCount ?? 0,
        interactiveLines: !solved && Boolean(part.answers?.length),
        sketchWorkspace: !solved && part.sketch,
        responsePlaceholder: !solved ? part.writtenPrompt : undefined,
        response: solved ? part.writtenAnswer : undefined,
        dividerBefore: part.dividerBefore,
        columnSpan: part.columnSpan
      }))
    });
  };
  const addSolvedArray = (rows: number, columns: number, label: string, glyph = '●'): void => {
    if (!solved) return;
    sections.push({ kind: 'array', label, rows, columns, item: 'dot', glyph });
  };
  const addSolvedArrayPair = (
    cards: Array<{ label: string; rows: number; columns: number; glyph?: string }>,
    label = ''
  ): void => {
    if (!solved) return;
    sections.push({
      kind: 'card-grid',
      label,
      cards: cards.map((card) => ({
        label: card.label,
        sections: [{ kind: 'array', rows: card.rows, columns: card.columns, item: 'dot', glyph: card.glyph ?? '●' }]
      }))
    });
  };

  switch (key) {
    case '6-1':
      addCrop(true);
      if (solved) addSolvedArrayPair(Array.from({ length: 5 }, (_, index) => ({ label: `Can ${index + 1}`, rows: 1, columns: 3, glyph: '🎾' })));
      addResponse([{ prompt: 'Circle groups of 3. Then complete the sentence and related facts.', blankLines: ['Rick needs ____ cans.', '____ × 3 = 15', '15 ÷ 3 = ____'], solvedLines: ['Rick needs 5 cans.', '5 × 3 = 15', '15 ÷ 3 = 5'], answers: [['5'], ['5'], ['5']], printedLineCount: 2 }]);
      break;
    case '6-2':
      if (solved) addSolvedArrayPair(Array.from({ length: 5 }, (_, index) => ({ label: `Group ${index + 1}`, rows: 1, columns: 3, glyph: '🎾' })));
      addResponse([{ prompt: 'Draw 5 equal groups using all 15 tennis balls. Then complete the sentence and facts.', blankLines: ['There are ____ tennis balls in each group.', '5 × ____ = 15', '15 ÷ 5 = ____'], solvedLines: ['There are 3 tennis balls in each group.', '5 × 3 = 15', '15 ÷ 5 = 3'], answers: [['3'], ['3'], ['3']], printedLineCount: 2, sketch: true }]);
      break;
    case '6-3':
      if (solved) addSolvedArray(5, 3, 'One array models both related division meanings.');
      addResponse([
        { prompt: 'Use one array to model Problem 1.', sketch: true, columnSpan: 'all' },
        { lead: 'a.', prompt: 'The unknown is the number of groups.', blankLines: ['____ × 3 = 15', '15 ÷ 3 = ____'], solvedLines: ['5 × 3 = 15', '15 ÷ 3 = 5'], answers: [['5'], ['5']], printedLineCount: 2, writtenPrompt: 'What does the number in the blanks represent?', writtenAnswer: 'The number of groups.' },
        { lead: 'b.', prompt: 'The unknown is the size of each group.', blankLines: ['5 × ____ = 15', '15 ÷ 5 = ____'], solvedLines: ['5 × 3 = 15', '15 ÷ 5 = 3'], answers: [['3'], ['3']], printedLineCount: 2, writtenPrompt: 'What does the number in the blanks represent?', writtenAnswer: 'The size of each group.' }
      ], 2);
      break;
    case '6-4':
      addResponse([{ prompt: 'Deena puts 21 jars into boxes of 7. Find the number of boxes and explain the unknown.', blankLines: ['21 ÷ 7 = ____', '____ × 7 = 21'], solvedLines: ['21 ÷ 7 = 3', '3 × 7 = 21'], answers: [['3'], ['3']], printedLineCount: 2, writtenPrompt: 'What do the unknown factor and quotient mean?', writtenAnswer: 'They both mean the number of boxes. Deena needs 3 boxes.' }]);
      break;
    case '6-5':
      addResponse([{ prompt: 'Complete both equations. Then explain why Charlie can use division to find the unknown factor.', blankLines: ['4 × ____ = 12', '12 ÷ 4 = ____'], solvedLines: ['4 × 3 = 12', '12 ÷ 4 = 3'], answers: [['3'], ['3']], printedLineCount: 2, writtenPrompt: 'Why does Charlie’s method work?', writtenAnswer: 'Division finds the missing factor. Four equal groups of 3 make 12.' }]);
      break;
    case '6-6':
      addSolvedArray(4, 3, '4 rows of 3 represent both equations.');
      addResponse([{ prompt: 'Draw an array that represents the equations from Problem 5.', sketch: true }]);
      break;

    case '7-1':
      addSolvedArray(6, 2, '6 rows of 2');
      addResponse([{ prompt: 'Draw an array that shows 6 rows of 2.', blankLines: ['____ × ____ = ____'], solvedLines: ['6 × 2 = 12'], answers: [['6', '2', '12']], printedLineCount: 1, sketch: true }]);
      break;
    case '7-2':
      addSolvedArray(2, 6, '2 rows of 6');
      addResponse([{ prompt: 'Draw an array that shows 2 rows of 6.', blankLines: ['____ × ____ = ____'], solvedLines: ['2 × 6 = 12'], answers: [['2', '6', '12']], printedLineCount: 1, sketch: true }]);
      break;
    case '7-3':
      addResponse([
        { lead: 'a.', prompt: 'What is the same about the arrays in Problems 1 and 2? What is different?', writtenPrompt: 'Compare the two arrays.', writtenAnswer: 'Turning the first array on its side makes the second array. Both have 12 objects.' },
        { lead: 'b.', prompt: 'Why are the factors in a different order?', writtenPrompt: 'Explain what each factor names.', writtenAnswer: 'The number of rows and the size of each row switch places.' }
      ]);
      break;
    case '7-4': {
      const blank = ['6 × 2 = 12', '2 × 6 = ____', '7 × 2 = ____', '2 × 7 = ____', '9 × 2 = ____', '2 × 9 = ____', '11 × 2 = ____', '2 × 12 = ____'];
      const done = ['6 × 2 = 12', '2 × 6 = 12', '7 × 2 = 14', '2 × 7 = 14', '9 × 2 = 18', '2 × 9 = 18', '11 × 2 = 22', '2 × 12 = 24'];
      const answers = [[], ['12'], ['14'], ['14'], ['18'], ['18'], ['22'], ['24']];
      addResponse(blank.map((line, index) => ({ lead: `${String.fromCharCode(97 + index)}.`, prompt: '', blankLines: [line], solvedLines: [done[index]], answers: answers[index].length ? [answers[index]] : undefined, printedLineCount: 1 })), 3);
      break;
    }
    case '7-5':
      addCrop();
      addResponse([
        { lead: 'a.', prompt: 'Read the left array by rows.', blankLines: ['____ × ____ = ____'], solvedLines: ['4 × 2 = 8'], answers: [['4', '2', '8']], printedLineCount: 1 },
        { lead: 'b.', prompt: 'Read the right array by rows.', blankLines: ['____ × ____ = ____'], solvedLines: ['2 × 4 = 8'], answers: [['2', '4', '8']], printedLineCount: 1 }
      ], 2);
      break;
    case '7-6':
      if (solved) addSolvedArrayPair([{ label: '2 rows of 7', rows: 2, columns: 7 }, { label: '7 rows of 2', rows: 7, columns: 2 }]);
      addResponse([
        { lead: 'a.', prompt: 'Draw an array for 2 × 7.', sketch: true },
        { lead: 'b.', prompt: 'Draw an array for 7 × 2.', sketch: true },
        { prompt: 'Do you agree that 2 × 7 = 7 × 2?', writtenPrompt: 'Explain how the arrays prove your answer.', writtenAnswer: 'Agree. Both arrays contain the same 14 objects; one is a rotation of the other.', columnSpan: 'all' }
      ], 2);
      break;
    case '7-7':
      addCrop();
      addResponse([
        ['5 × 2 = 2 × ____', '5 × 2 = 2 × 5', '5'],
        ['____ × 8 = 8 × 2', '2 × 8 = 8 × 2', '2'],
        ['2 × 10 = ____ × 2', '2 × 10 = 10 × 2', '10'],
        ['2 × ____ = 9 × 2', '2 × 9 = 9 × 2', '9']
      ].map(([blankLine, solvedLine, answer], index) => ({ lead: `${String.fromCharCode(97 + index)}.`, prompt: '', blankLines: [blankLine], solvedLines: [solvedLine], answers: [[answer]], printedLineCount: 1 })), 4);
      break;
    case '7-8':
      addSolvedArray(2, 6, '2 packs with 6 erasers in each pack');
      addResponse([
        { lead: 'a.', prompt: 'Draw an array for 2 packs of 6 erasers.', sketch: true },
        { lead: 'b.', prompt: 'Write a multiplication sentence.', blankLines: ['____ × ____ = ____'], solvedLines: ['2 × 6 = 12'], answers: [['2', '6', '12']], printedLineCount: 1 },
        { lead: 'c.', prompt: 'Use commutativity to write the related fact.', blankLines: ['____ × ____ = ____'], solvedLines: ['6 × 2 = 12'], answers: [['6', '2', '12']], printedLineCount: 1 }
      ]);
      break;

    case '8-1':
      addSolvedArray(5, 3, '5 rows of 3');
      addResponse([{ prompt: 'Draw an array that shows 5 rows of 3.', sketch: true }]);
      break;
    case '8-2':
      addSolvedArray(3, 5, '3 rows of 5');
      addResponse([{ prompt: 'Draw an array that shows 3 rows of 5.', sketch: true }]);
      break;
    case '8-3':
      addResponse([
        { prompt: 'Use the arrays in Problems 1 and 2 to complete the commutative equation.', blankLines: ['____ × ____ = ____ × ____'], solvedLines: ['5 × 3 = 3 × 5'], answers: [['5', '3', '3', '5']], printedLineCount: 1, columnSpan: 'all' },
        { lead: 'Problem 1', prompt: '5 rows of 3' },
        { lead: 'Problem 2', prompt: '3 rows of 5' }
      ], 2);
      break;
    case '8-4': {
      const blank = ['2 × 3 = 6', '3 × 2 = ____', '3 × 4 = ____', '4 × 3 = ____', '3 × 7 = ____', '7 × 3 = ____', '3 × 9 = ____', '9 × 3 = ____', '10 × 3 = ____'];
      const done = ['2 × 3 = 6', '3 × 2 = 6', '3 × 4 = 12', '4 × 3 = 12', '3 × 7 = 21', '7 × 3 = 21', '3 × 9 = 27', '9 × 3 = 27', '10 × 3 = 30'];
      const values = ['', '6', '12', '12', '21', '21', '27', '27', '30'];
      addResponse(blank.map((line, index) => ({ lead: `${String.fromCharCode(97 + index)}.`, prompt: '', blankLines: [line], solvedLines: [done[index]], answers: values[index] ? [[values[index]]] : undefined, printedLineCount: 1 })), 3);
      break;
    }
    case '8-5': {
      const topBlank = ['a. 3 + 3 + 3 + 3 + 3 = ____', 'b. 3 × 9 = ____', 'c. 7 threes + 1 three = ____'];
      const topDone = ['a. 3 + 3 + 3 + 3 + 3 = 15', 'b. 3 × 9 = 27', 'c. 7 threes + 1 three = 24'];
      const bottomBlank = ['d. 3 × 8 = ____', 'e. ____ = 5 × 3', 'f. 27 = 9 × ____'];
      const bottomDone = ['d. 3 × 8 = 24', 'e. 15 = 5 × 3', 'f. 27 = 9 × 3'];
      addResponse(
        [...topBlank, ...bottomBlank].map((line, index) => ({
          prompt: '',
          blankLines: [line],
          solvedLines: [[...topDone, ...bottomDone][index]],
          answers: [[['15'], ['27'], ['24'], ['24'], ['15'], ['3']][index]],
          printedLineCount: 1
        })),
        2
      );
      sections.push({
        kind: 'expression-match',
        label: '',
        prompt: 'Now select a letter on the left and its related fact on the right.',
        topLabel: 'a–c',
        bottomLabel: 'd–f',
        topItems: ['a', 'b', 'c'],
        bottomItems: ['d', 'e', 'f'],
        orientation: 'pairs',
        matches: [{ topIndex: 0, bottomIndex: 1 }, { topIndex: 1, bottomIndex: 2 }, { topIndex: 2, bottomIndex: 0 }],
        interactive: !solved,
        showMatches: solved
      });
      break;
    }
    case '8-6':
      if (solved) addSolvedArrayPair([{ label: 'First 7 days', rows: 7, columns: 3, glyph: '○' }, { label: '3 more days', rows: 3, columns: 3, glyph: '×' }]);
      addResponse([
        { lead: 'a.', prompt: 'Draw 7 rows of 3 circles.', sketch: true },
        { lead: 'b.', prompt: 'Write the fact for the first 7 days.', blankLines: ['____ × ____ = ____'], solvedLines: ['7 × 3 = 21'], answers: [['7', '3', '21']], printedLineCount: 1 },
        { lead: 'c.', prompt: 'Add 3 rows of 3 using X marks.' },
        { lead: 'd.', prompt: 'Write the fact for all 10 days.', blankLines: ['____ × ____ = ____'], solvedLines: ['10 × 3 = 30'], answers: [['10', '3', '30']], printedLineCount: 1 }
      ]);
      break;
    case '8-7':
      addResponse([
        { lead: 'a.', prompt: 'Find the cost of 3 bottles.', blankLines: ['____ × $____ = $____'], solvedLines: ['3 × $2 = $6'], answers: [['3', '2', '6']], printedLineCount: 1 },
        { lead: 'b.', prompt: 'Find the cost of 6 bottles.', blankLines: ['____ × $____ = $____'], solvedLines: ['6 × $2 = $12'], answers: [['6', '2', '12']], printedLineCount: 1 }
      ]);
      break;

    case '9-1':
      addCrop();
      addResponse([{ prompt: 'Use the two rows of 5 and the three added rows of 5 to complete all three facts.', blankLines: ['(5 + 5) + (5 + 5 + 5) = ____', '2 fives + ____ fives = ____ fives', '____ × 5 = ____'], solvedLines: ['(5 + 5) + (5 + 5 + 5) = 25', '2 fives + 3 fives = 5 fives', '5 × 5 = 25'], answers: [['25'], ['3', '5'], ['5', '25']], printedLineCount: 3 }]);
      break;
    case '9-2':
      addCrop();
      addResponse([{ prompt: 'Use the split 7-by-2 array: 5 rows of 2 and 2 rows of 2.', blankLines: ['7 × 2 = ____', '5 × 2 = ____', '2 × 2 = ____', '10 + 4 = ____', '____ × 2 = 14'], solvedLines: ['7 × 2 = 14', '5 × 2 = 10', '2 × 2 = 4', '10 + 4 = 14', '7 × 2 = 14'], answers: [['14'], ['10'], ['4'], ['14'], ['7']], printedLineCount: 5 }]);
      break;
    case '9-3':
      addCrop();
      addResponse([{ prompt: 'Use the 10-by-2 array with one row removed to find 9 × 2.', blankLines: ['9 × 2 = ____', '10 × 2 = ____', '1 × 2 = ____', '20 − ____ = 18', '9 × 2 = ____'], solvedLines: ['9 × 2 = 18', '10 × 2 = 20', '1 × 2 = 2', '20 − 2 = 18', '9 × 2 = 18'], answers: [['18'], ['20'], ['2'], ['2'], ['18']], printedLineCount: 5 }]);
      break;
    case '9-4':
      addSolvedArray(4, 3, '4 rows of 3 baseball cards', '×');
      addResponse([{ prompt: 'Draw an array of 4 rows of 3 using X marks.', blankLines: ['4 × 3 = ____'], solvedLines: ['4 × 3 = 12'], answers: [['12']], printedLineCount: 1, sketch: true }]);
      break;
    case '9-5':
      sections.push({ kind: 'array', label: 'Start with the 4 rows of 3 from Problem 4.', rows: 4, columns: 3, item: 'dot', glyph: '×', mode: 'blank' });
      if (solved) addSolvedArrayPair([{ label: 'Original 4 rows', rows: 4, columns: 3, glyph: '×' }, { label: 'Added 2 rows', rows: 2, columns: 3, glyph: '○' }]);
      addResponse([{ prompt: 'Add 2 rows of 3 using circles. Then complete the related facts.', blankLines: ['____ × 3 = ____', '____ + ____ = 18', '____ × ____ = 18'], solvedLines: ['2 × 3 = 6', '12 + 6 = 18', '6 × 3 = 18'], answers: [['2', '6'], ['12', '6'], ['6', '3']], printedLineCount: 3, sketch: true }]);
      break;

    case '10-1':
      addCrop();
      addResponse([{ prompt: 'Read the split 7-by-3 array as 5 rows of 3 plus 2 rows of 3.', blankLines: ['7 × 3 = (5 × 3) + (2 × 3) = ____', '5 × 3 = 15', '2 × 3 = ____', '(5 × 3) + (2 × 3) = 15 + ____', '15 + ____ = ____'], solvedLines: ['7 × 3 = (5 × 3) + (2 × 3) = 21', '5 × 3 = 15', '2 × 3 = 6', '(5 × 3) + (2 × 3) = 15 + 6', '15 + 6 = 21'], answers: [['21'], [], ['6'], ['6'], ['6', '21']], printedLineCount: 5 }]);
      break;
    case '10-2':
      addCrop();
      addResponse([{ prompt: 'Read the split 8-by-3 array as two equal 4-by-3 parts.', blankLines: ['8 × 3 = (4 × 3) + (4 × 3) = ____', '____ × 3 = ____', '____ × 3 = ____', '(4 × 3) + (4 × 3) = ____ + ____', '____ × 3 = ____'], solvedLines: ['8 × 3 = (4 × 3) + (4 × 3) = 24', '4 × 3 = 12', '4 × 3 = 12', '(4 × 3) + (4 × 3) = 12 + 12', '8 × 3 = 24'], answers: [['24'], ['4', '12'], ['4', '12'], ['12', '12'], ['8', '24']], printedLineCount: 5 }]);
      break;
    case '10-3':
      addCrop(true);
      if (solved) addSolvedArrayPair([{ label: 'Top album part', rows: 2, columns: 3, glyph: '■' }, { label: 'Bottom album part', rows: 3, columns: 3, glyph: '■' }]);
      addResponse([
        { lead: 'a.', prompt: 'Draw 3 photos in each row in the top and bottom parts of the album. Complete both facts.', blankLines: ['____ × 3 = 6', '____ × 3 = 9'], solvedLines: ['2 × 3 = 6', '3 × 3 = 9'], answers: [['2'], ['3']], printedLineCount: 2 },
        { lead: 'b.', prompt: 'Use your arrays to explain Ruby’s calculation.', blankLines: ['5 × 3 = 6 + 9 = 15'], solvedLines: ['5 × 3 = 6 + 9 = 15'], printedLineCount: 1, writtenPrompt: 'How do the two smaller arrays make the whole array?', writtenAnswer: 'The top has 2 rows of 3 and the bottom has 3 rows of 3. Together they make 5 rows of 3, so 6 + 9 = 15.' }
      ]);
      break;
  }

  return {
    title: '',
    sourceNote: '',
    sections
  };
}

function observedM1ProblemVisual(
  lessonNumber: number,
  problem: ProblemSeed,
  solved: boolean
): ProblemVisualSpec | undefined {
  if (lessonNumber >= 6 && lessonNumber <= 10) {
    return observedM1Lesson6To10Visual(lessonNumber, problem, solved);
  }
  if (lessonNumber >= 11 && lessonNumber <= 15) {
    return reviewedM1Lesson11To15Visual(lessonNumber, problem, solved);
  }
  if (lessonNumber >= 16 && lessonNumber <= 20) {
    return reviewedM1Lesson16To20Visual(lessonNumber, problem, solved);
  }
  if (lessonNumber < 2 || lessonNumber > 5) return undefined;
  const observed = M1_OBSERVED_MODEL_CROPS[lessonNumber]?.[problem.number];
  const sections: ProblemVisualSpec['sections'] = [];
  const addCrop = (sketchOverlay = false): void => {
    if (observed) {
      sections.push({
        ...observedSourceCrop(observed, sketchOverlay && !solved),
        label: ''
      });
    }
  };
  const addResponse = (config: {
    prompt: string;
    blankLines?: string[];
    solvedLines?: string[];
    answers?: string[][];
    printedLineCount: number;
    sketch?: boolean;
    responsePlaceholder?: string;
    response?: string;
  }): void => {
    sections.push({
      kind: 'source-response-workspace',
      label: '',
      wide: true,
      parts: [{
        prompt: config.prompt,
        lines: solved ? config.solvedLines ?? [] : config.blankLines ?? [],
        lineAnswers: config.answers,
        printedLineCount: config.printedLineCount,
        interactiveLines: !solved && Boolean(config.answers?.length),
        sketchWorkspace: !solved && config.sketch,
        responsePlaceholder: !solved ? config.responsePlaceholder : undefined,
        response: solved ? config.response : undefined
      }]
    });
  };
  const addSolvedArray = (rows: number, columns: number, label: string): void => {
    if (!solved) return;
    sections.push({
      kind: 'array',
      label,
      rows,
      columns,
      item: 'dot',
      glyph: semanticArrayGlyph(problem)
    });
  };

  if (lessonNumber === 2) {
    if (problem.number === 1) {
      addCrop();
      addResponse({
        prompt: 'Read the car array by rows.',
        blankLines: ['a. Number of rows: ____', 'b. Cars in each row: ____'],
        solvedLines: ['a. Number of rows: 4', 'b. Cars in each row: 2'],
        answers: [['4'], ['2']], printedLineCount: 0
      });
    } else if (problem.number === 2) {
      addCrop();
      addResponse({
        prompt: 'Read the object array by rows.',
        blankLines: ['a. Number of rows: ____', 'b. Objects in each row: ____'],
        solvedLines: ['a. Number of rows: 3', 'b. Objects in each row: 6'],
        answers: [['3'], ['6']], printedLineCount: 0
      });
    } else if (problem.number === 3) {
      addCrop();
      addResponse({
        prompt: 'Use the spoon array.',
        blankLines: ['a. Spoons in 2 rows: ____', 'b. Multiplication expression: ____'],
        solvedLines: ['a. Spoons in 2 rows: 8', 'b. Multiplication expression: 2 × 4'],
        answers: [['8'], ['2 × 4']], printedLineCount: 1
      });
    } else if (problem.number === 4) {
      addCrop();
      addResponse({
        prompt: 'Use the triangle array.',
        blankLines: ['a. Triangles in each row: ____', 'b. Multiplication expression: ____'],
        solvedLines: ['a. Triangles in each row: 4', 'b. Multiplication expression: 5 × 4'],
        answers: [['4'], ['5 × 4']], printedLineCount: 1
      });
    } else if (problem.number === 5) {
      addCrop();
      addResponse({
        prompt: 'Redraw the 2 groups of 5 as a 2-by-5 array, then compare the two arrangements.',
        printedLineCount: 0,
        sketch: true,
        responsePlaceholder: 'Write at least one way the models are the same and one way they are different.',
        response: 'Both models show 2 groups of 5 and a total of 10. The first model is separated into groups; the array aligns the dots into equal rows and columns.'
      });
      addSolvedArray(2, 5, 'One valid redraw: 2 rows of 5');
    } else if (problem.number === 6) {
      addResponse({
        prompt: 'Draw Emma’s 4 rows of 3 rocks, then write the multiplication equation.',
        blankLines: ['Multiplication equation: ____'],
        solvedLines: ['Multiplication equation: 4 × 3 = 12'],
        answers: [['4 × 3 = 12']], printedLineCount: 1, sketch: true
      });
      addSolvedArray(4, 3, 'Emma’s completed 4-by-3 rock array');
    } else {
      addResponse({
        prompt: 'Draw Joshua’s 5-by-3 can array and find the total.',
        blankLines: ['Joshua organizes ____ cans.'],
        solvedLines: ['Joshua organizes 15 cans.'],
        answers: [['15']], printedLineCount: 1, sketch: true
      });
      addSolvedArray(5, 3, 'Joshua’s completed 5-by-3 can array');
    }
  }

  if (lessonNumber === 3) {
    const pictureProblems = {
      1: {
        prompt: 'Use the flower bunches to name both factors and the total.',
        blankLines: ['a. Number of groups: ____   Size of each group: ____', 'b. 4 × 5 = ____', 'c. There are ____ flowers altogether.'],
        solvedLines: ['a. Number of groups: 4   Size of each group: 5', 'b. 4 × 5 = 20', 'c. There are 20 flowers altogether.'],
        answers: [['4', '5'], ['20'], ['20']]
      },
      2: {
        prompt: 'Use the candy boxes to name both factors and the total.',
        blankLines: ['Candies in each box: ____', 'a. Number of groups: ____   Size of each group: ____', 'b. 6 × ____ = ____', 'c. There are ____ candies altogether.'],
        solvedLines: ['Candies in each box: 3', 'a. Number of groups: 6   Size of each group: 3', 'b. 6 × 3 = 18', 'c. There are 18 candies altogether.'],
        answers: [['3'], ['6', '3'], ['3', '18'], ['18']]
      },
      3: {
        prompt: 'Use the orange rows to name both factors and the total.',
        blankLines: ['Number of rows in the question: ____', 'a. Number of rows: ____   Size of each row: ____', 'b. ____ × 4 = ____', 'c. There are ____ oranges altogether.'],
        solvedLines: ['Number of rows in the question: 3', 'a. Number of rows: 3   Size of each row: 4', 'b. 3 × 4 = 12', 'c. There are 12 oranges altogether.'],
        answers: [['3'], ['3', '4'], ['3', '12'], ['12']]
      },
      4: {
        prompt: 'Use the bread rows to name both factors and the total.',
        blankLines: ['Loaves in each row: ____', 'a. Number of rows: ____   Size of each row: ____', 'b. ____ × ____ = ____', 'c. There are ____ loaves altogether.'],
        solvedLines: ['Loaves in each row: 2', 'a. Number of rows: 5   Size of each row: 2', 'b. 5 × 2 = 10', 'c. There are 10 loaves altogether.'],
        answers: [['2'], ['5', '2'], ['5', '2', '10'], ['10']]
      }
    } as const;
    if (problem.number <= 4) {
      const config = pictureProblems[problem.number as keyof typeof pictureProblems];
      addCrop();
      addResponse({
        prompt: config.prompt,
        blankLines: [...config.blankLines],
        solvedLines: [...config.solvedLines],
        answers: config.answers.map((answers) => [...answers]),
        printedLineCount: 1
      });
    } else if (problem.number === 5) {
      addCrop();
      addResponse({
        prompt: 'Write the multiplication equation, then draw a number bond with one part for each row.',
        blankLines: ['a. Multiplication equation: ____'],
        solvedLines: ['a. Multiplication equation: 4 × 3 = 12'],
        answers: [['4 × 3 = 12']], printedLineCount: 1, sketch: true
      });
      if (solved) sections.push({
        kind: 'number-bond', label: 'b. Four equal row-parts make 12', whole: '12',
        parts: Array.from({ length: 4 }, (_, index) => ({ label: '3', sublabel: `row ${index + 1}` })),
        equations: ['3 + 3 + 3 + 3 = 12']
      });
    } else {
      addResponse({
        prompt: 'Draw an array using factors 2 and 3. Then draw a number bond whose parts are the rows.',
        printedLineCount: 0, sketch: true
      });
      addSolvedArray(2, 3, 'One valid array: 2 rows of 3');
      if (solved) sections.push({
        kind: 'number-bond', label: 'One matching number bond', whole: '6',
        parts: [{ label: '3', sublabel: 'row 1' }, { label: '3', sublabel: 'row 2' }],
        equations: ['3 + 3 = 6']
      });
    }
  }

  if (lessonNumber === 4) {
    const configs = {
      1: { blank: ['There are ____ flowers in each group.'], solved: ['There are 7 flowers in each group.'], answers: [['7']], printed: 0 },
      2: { blank: ['There are ____ books in each group.'], solved: ['There are 7 books in each group.'], answers: [['7']], printed: 0 },
      3: { blank: ['30 apples are divided into ____ equal groups.', 'There are ____ apples in each group.'], solved: ['30 apples are divided into 3 equal groups.', 'There are 10 apples in each group.'], answers: [['3'], ['10']], printed: 0 },
      4: { blank: ['____ cups are divided into ____ equal groups.', 'There are ____ cups in each group.', '12 ÷ 2 = ____'], solved: ['12 cups are divided into 2 equal groups.', 'There are 6 cups in each group.', '12 ÷ 2 = 6'], answers: [['12', '2'], ['6'], ['6']], printed: 1 },
      5: { blank: ['There are ____ toys in each group.', '15 ÷ 3 = ____'], solved: ['There are 5 toys in each group.', '15 ÷ 3 = 5'], answers: [['5'], ['5']], printed: 1 },
      6: { blank: ['9 ÷ 3 = ____'], solved: ['9 ÷ 3 = 3'], answers: [['3']], printed: 1 },
      7: { blank: ['There are ____ colored pencils in each group.', '24 ÷ 4 = ____'], solved: ['There are 6 colored pencils in each group.', '24 ÷ 4 = 6'], answers: [['6'], ['6']], printed: 1 },
      8: { blank: ['There are ____ apples in each basket.', '20 ÷ ____ = ____'], solved: ['There are 4 apples in each basket.', '20 ÷ 5 = 4'], answers: [['4'], ['5', '4']], printed: 1 },
      9: { blank: ['There are ____ butterflies in each row.', '____ ÷ ____ = ____'], solved: ['There are 3 butterflies in each row.', '15 ÷ 5 = 3'], answers: [['3'], ['15', '5', '3']], printed: 1 }
    } as const;
    const config = configs[problem.number as keyof typeof configs];
    addCrop(problem.number === 8);
    addResponse({
      prompt: problem.number === 8
        ? 'Draw 4 apples in each of the 5 printed baskets, then complete the statements.'
        : 'Use the printed equal groups to complete every blank.',
      blankLines: [...config.blank], solvedLines: [...config.solved], answers: config.answers.map((answers) => [...answers]),
      printedLineCount: config.printed
    });
    if (problem.number === 8 && solved) sections.push({
      kind: 'card-grid',
      label: 'Five baskets with 4 apples in each basket',
      cards: Array.from({ length: 5 }, (_, index) => ({
        label: `Basket ${index + 1}`,
        sections: [{ kind: 'array', rows: 1, columns: 4, item: 'dot', glyph: '🍎' }]
      }))
    });
  }

  if (lessonNumber === 5) {
    const configs = {
      1: { blank: ['There are ____ groups of 3 tomatoes.', '6 ÷ 3 = 2'], solved: ['There are 2 groups of 3 tomatoes.', '6 ÷ 3 = 2'], answers: [['2'], []], printed: 1, overlay: false },
      2: { blank: ['There are ____ groups.', '8 ÷ 2 = ____'], solved: ['There are 4 groups.', '8 ÷ 2 = 4'], answers: [['4'], ['4']], printed: 1, overlay: true },
      3: { blank: ['10 ÷ 5 = ____'], solved: ['10 ÷ 5 = 2'], answers: [['2']], printed: 1, overlay: true },
      4: { blank: ['12 ÷ 3 = ____', 'How many groups are there? ____'], solved: ['12 ÷ 3 = 4', 'There are 4 groups.'], answers: [['4'], ['4']], printed: 1, overlay: true }
    } as const;
    if (problem.number <= 4) {
      const config = configs[problem.number as keyof typeof configs];
      addCrop(config.overlay);
      addResponse({
        prompt: config.overlay ? 'Circle equal groups directly on the printed object bank, then complete the statements.' : 'Read the printed tomato groups and complete the statement.',
        blankLines: [...config.blank], solvedLines: [...config.solved], answers: config.answers.map((answers) => [...answers]),
        printedLineCount: config.printed
      });
      if (problem.number >= 2) addSolvedArray(problem.quotient ?? 1, problem.knownGroupSize ?? 1, `${problem.quotient} equal groups of ${problem.knownGroupSize}`);
    } else if (problem.number === 5) {
      addCrop(true);
      addResponse({
        prompt: 'Circle groups of 3 crackers, write the division sentence, and draw the matching number bond.',
        blankLines: ['a. Division sentence: ____'], solvedLines: ['a. Division sentence: 9 ÷ 3 = 3'],
        answers: [['9 ÷ 3 = 3']], printedLineCount: 1, sketch: true
      });
      if (solved) sections.push({
        kind: 'number-bond', label: 'b. Three cracker bags', whole: '9',
        parts: [{ label: '3', sublabel: 'bag 1' }, { label: '3', sublabel: 'bag 2' }, { label: '3', sublabel: 'bag 3' }],
        equations: ['3 + 3 + 3 = 9']
      });
    } else {
      addResponse({
        prompt: 'Count by fours to 16, draw one group of wheels for each car, then write the division sentence.',
        blankLines: ['a. Count-by: ____', 'b. Division sentence: ____'],
        solvedLines: ['a. Count-by: 4, 8, 12, 16', 'b. Division sentence: 16 ÷ 4 = 4'],
        answers: [['4, 8, 12, 16'], ['16 ÷ 4 = 4']], printedLineCount: 2, sketch: true
      });
      addSolvedArray(4, 4, 'Four cars use 4 wheels each');
    }
  }

  return {
    title: `Problem ${problem.number}`,
    sourceNote: '',
    sections
  };
}

function visualTitle(seed: ProblemSeed): string {
  if (seed.knownTotal && seed.knownGroupCount && seed.knownGroupSize) {
    return `${seed.knownGroupCount} ${seed.groupLabel ?? 'groups'} of ${seed.knownGroupSize} ${seed.unitLabel ?? 'objects'}`;
  }
  if (seed.knownTotal && seed.knownGroupCount) {
    return `${seed.knownTotal} ${seed.unitLabel ?? 'objects'} shared into ${seed.knownGroupCount} ${seed.groupLabel ?? 'groups'}`;
  }
  if (seed.knownTotal && seed.knownGroupSize) {
    return `${seed.knownTotal} ${seed.unitLabel ?? 'objects'} in groups of ${seed.knownGroupSize}`;
  }
  return seed.sourcePrompt;
}

function usesTapeVisual(seed: ProblemSeed): boolean {
  return (
    seed.blankVisualType === 'tape-diagram' ||
    seed.blankVisualType === 'bar-units' ||
    seed.blankVisualType === 'share-tape' ||
    seed.animationType === 'tape-split' ||
    seed.animationType === 'two-step-model' ||
    seed.animationType === 'equal-sharing'
  );
}

function makeArraySection(seed: ProblemSeed, solved: boolean): ProblemVisualSpec['sections'][number] {
  const groupCount = boundedCount(seed.knownGroupCount ?? inferGroupCount(seed), 1, 12);
  const groupSize = boundedCount(seed.knownGroupSize ?? seed.quotient ?? inferGroupSize(seed), 1, 12);
  const item = seed.unitLabel?.toLowerCase().includes('glass') ? 'glass' : 'dot';
  const rows = Math.max(1, groupCount);
  const columns = Math.max(1, groupSize);

  if (!solved && ['open-workspace', 'array-template'].includes(seed.blankVisualType ?? '')) {
    return {
      kind: 'note',
      label: seed.blankWorkspaceLabel ?? 'Open drawing workspace',
      text: 'The Teacher Edition leaves this model for the student to draw; no groups or objects are prefilled.'
    };
  }

  return {
    kind: 'array',
    label: solved
      ? `${rows} ${seed.groupLabel ?? 'groups'} of ${columns} ${seed.unitLabel ?? 'objects'}`
      : `${rows} ${seed.groupLabel ?? 'groups'} workspace`,
    rows,
    columns,
    item,
    glyph: semanticArrayGlyph(seed),
    placeholder: solved ? undefined : seed.blankVisualType === 'open-workspace' ? '?' : undefined
  };
}

function semanticArrayGlyph(seed: ProblemSeed): string | undefined {
  const evidence = `${seed.unitLabel ?? ''} ${seed.sourcePrompt}`.toLowerCase();
  const glyphs: Array<[RegExp, string]> = [
    [/\b(tennis ball|tennis balls)\b/, '🎾'],
    [/\b(car|cars|taxi|taxis)\b/, '🚗'],
    [/\b(orange|oranges|tangerine|tangerines)\b/, '🍊'],
    [/\b(apple|apples)\b/, '🍎'],
    [/\b(banana|bananas)\b/, '🍌'],
    [/\b(lemon|lemons)\b/, '🍋'],
    [/\b(flower|flowers)\b/, '✿'],
    [/\b(cand(y|ies)|chocolate|chocolates)\b/, '●'],
    [/\b(lollipop|lollipops)\b/, '🍭'],
    [/\b(ball|balls|soccer)\b/, '⚽'],
    [/\b(book|books|notebook|notebooks)\b/, '▣'],
    [/\b(bird|birds)\b/, '🐦'],
    [/\b(fish)\b/, '🐟'],
    [/\b(butterfl(y|ies))\b/, '🦋'],
    [/\b(glass|glasses|cup|cups)\b/, '▯'],
    [/\b(star|stars)\b/, '★'],
    [/\b(shell|shells)\b/, '◒'],
    [/\b(spoon|spoons)\b/, '♧'],
    [/\b(triangle|triangles)\b/, '▲'],
    [/\b(square|squares|photo|photos)\b/, '■'],
    [/\b(dot|dots|circle|circles)\b/, '●'],
    [/\b(pencil|pencils|marker|markers)\b/, '✎'],
    [/\b(eraser|erasers)\b/, '▰'],
    [/\b(rock|rocks|jar|jars)\b/, '◆'],
    [/\b(wheel|wheels)\b/, '◉'],
    [/\b(chair|chairs)\b/, '▥'],
    [/\b(rectangle|rectangles)\b/, '▭']
  ];
  return glyphs.find(([pattern]) => pattern.test(evidence))?.[1];
}

function makeTapeSection(seed: ProblemSeed, solved: boolean): ProblemVisualSpec['sections'][number] {
  const partCount = boundedCount(seed.knownGroupCount ?? inferGroupCount(seed), 1, 12);
  const partValue = seed.knownGroupSize ?? seed.quotient;
  const totalLabel = seed.knownTotal
    ? `${seed.knownTotal} ${seed.unitLabel ?? 'objects'} total`
    : `${seed.unitLabel ?? 'objects'} total`;
  const blankLabel = seed.knownGroupSize && !seed.knownGroupCount ? String(seed.knownGroupSize) : '?';
  const solvedLabel = partValue ? String(partValue) : '?';

  return {
    kind: 'tape',
    label: solved ? 'Solved equal-part model' : 'Blank equal-part model',
    totalLabel,
    parts: Array.from({ length: partCount }, (_, index) => ({
      label: solved ? solvedLabel : blankLabel,
      emphasize: index < Math.min(2, partCount)
    })),
    caption: solved ? seed.solvedAnswer : seed.blankWorkspaceLabel ?? 'Use the equal parts to complete the source problem.'
  };
}

function inferGroupCount(seed: ProblemSeed): number {
  const equation = seed.equations[0] ?? '';
  const multiplicationMatch = equation.match(/(\d+)\s*x\s*(\d+)\s*=/i);
  if (multiplicationMatch) {
    return Number(multiplicationMatch[1]);
  }

  const divisionMatch = equation.match(/(\d+)\s*divided by\s*(\d+)\s*=/i);
  if (divisionMatch) {
    return Number(divisionMatch[2]);
  }

  return seed.knownGroupCount ?? 3;
}

function inferGroupSize(seed: ProblemSeed): number {
  const equation = seed.equations[0] ?? '';
  const multiplicationMatch = equation.match(/(\d+)\s*x\s*(\d+)\s*=/i);
  if (multiplicationMatch) {
    return Number(multiplicationMatch[2]);
  }

  if (seed.knownTotal && seed.knownGroupCount) {
    return Math.max(1, Math.round(seed.knownTotal / seed.knownGroupCount));
  }

  return seed.knownGroupSize ?? seed.quotient ?? 4;
}

function boundedCount(value: number | undefined, min: number, max: number): number {
  if (!value || !Number.isFinite(value)) {
    return min;
  }

  return Math.max(min, Math.min(max, Math.round(value)));
}

function makeProblem(seed: ProblemSeed): ProblemSetCenteredProblem {
  return {
    number: seed.number,
    sourcePrompt: seed.sourcePrompt,
    sourcePageImages: seed.sourcePageImages,
    blankSourcePageImages: seed.blankSourcePageImages,
    solvedSourcePageImages: seed.solvedSourcePageImages,
    blankPrompts: seed.blankPrompts ?? ['Complete the official Teacher Edition Problem Set drawing, labels, and blanks for this problem.'],
    blankEquations: seed.blankEquations ?? seed.equations.map(blankEquation),
    blankAnswerSentence: seed.blankAnswerSentence,
    blankWorkspaceLabel: seed.blankWorkspaceLabel ?? 'Use the Teacher Edition scaffold and label what each number means.',
    blankVisualType: seed.blankVisualType ?? 'equation-workspace',
    blankVisual: seed.blankVisual ?? createM1ProblemVisual(seed, false),
    solvedVisual: seed.solvedVisual ?? createM1ProblemVisual(seed, true),
    solvedAnswer: seed.solvedAnswer,
    equations: seed.equations,
    knownTotal: seed.knownTotal,
    knownGroupSize: seed.knownGroupSize,
    knownGroupCount: seed.knownGroupCount,
    quotient: seed.quotient ?? seed.knownTotal ?? 1,
    quotientMeaning: seed.quotientMeaning ?? seed.solvedAnswer,
    animationType: seed.animationType ?? 'array-model',
    unitLabel: seed.unitLabel ?? 'objects',
    groupLabel: seed.groupLabel ?? 'groups',
    explanation: seed.explanation ?? 'Use the official Teacher Edition model, complete the matching equation, and state the answer with its unit.',
    validationChecks: seed.validationChecks ?? [
      'The model matches the official problem quantities.',
      'The equation uses the same quantities as the drawing.',
      'The answer sentence names the unit in context.'
    ],
    relatedFacts: seed.relatedFacts,
    facts: seed.facts,
    shareLabels: seed.shareLabels
  };
}

function blankEquation(equation: string): string {
  const equalsIndex = equation.indexOf('=');
  if (equalsIndex < 0) {
    return equation;
  }

  return `${equation.slice(0, equalsIndex + 1).trimEnd()} ____`;
}

function conceptSectionsFor(seed: LessonSeed, teacherSource: string): ProblemSetCenteredLesson['conceptSections'] {
  const lessonSpecific: Partial<Record<number, ProblemSetCenteredLesson['conceptSections']>> = {
    1: [
      {
        title: '1. Multiplication requires equal groups',
        body: 'Count how many groups there are and how many objects are in one group. A multiplication sentence applies only when every group has the same size.',
        teacherSource,
        checkpoints: ['Identify the number of groups.', 'Identify the size of one group.', 'Reject a multiplication description when the groups are unequal.']
      },
      {
        title: '2. Keep four representations connected',
        body: 'The picture, repeated addition, unit form such as “4 threes,” and the multiplication sentence must all describe the same equal groups and total.',
        teacherSource,
        checkpoints: ['Add one addend for each group.', 'Keep every addend equal to the group size.', 'Read the first factor as the number of groups.']
      },
      {
        title: '3. Check the total against the picture',
        body: 'Count the pictured objects and verify that repeated addition and multiplication produce that same total.',
        teacherSource,
        checkpoints: ['Count the visible objects.', 'Compare the two totals.', 'Explain the mismatch if the groups are not equal.']
      }
    ],
    2: [
      {
        title: '1. Read an array by horizontal rows',
        body: 'An array organizes equal groups into aligned rows and columns. In this lesson, read the number of rows first and the number in each row second.',
        teacherSource,
        checkpoints: ['Trace one horizontal row.', 'Count all rows.', 'Count the objects in one row.']
      },
      {
        title: '2. Connect rows to the factors',
        body: 'For a 3-by-4 array, 3 names the rows, 4 names the objects in each row, and 12 names the total.',
        teacherSource,
        checkpoints: ['Say “3 rows of 4.”', 'Write 3 × 4.', 'Verify the array contains 12 objects.']
      },
      {
        title: '3. Rearranging does not change the quantity',
        body: 'Two separated groups of 5 and an array with 2 rows of 5 have the same group count, group size, and total, even though the arrangement looks different.',
        teacherSource,
        checkpoints: ['Compare the group count.', 'Compare the group size.', 'Name one visual difference.']
      }
    ],
    3: [
      {
        title: '1. Each factor has a meaning',
        body: 'The first factor tells the number of groups or rows. The second factor tells the size of each group or row.',
        teacherSource,
        checkpoints: ['Name the first factor with its unit.', 'Name the second factor with its unit.', 'Name the product as the total.']
      },
      {
        title: '2. Pictures can supply missing factors',
        body: 'When the printed sentence leaves a factor blank, count the boxes, rows, or objects in one group directly from the source picture before multiplying.',
        teacherSource,
        checkpoints: ['Use the picture, not a guess.', 'Distinguish rows from row size.', 'Use the same factors in the equation.']
      },
      {
        title: '3. Rows become number-bond parts',
        body: 'A number bond can show the array total as equal parts, with one part for each row and each part equal to the row size.',
        teacherSource,
        checkpoints: ['Use one bond part per row.', 'Label every part with the row size.', 'Check that the parts compose the product.']
      }
    ],
    4: [
      {
        title: '1. Division can find the size of each group',
        body: 'When the total and the number of equal groups are known, share the total fairly. The quotient tells how many objects belong in each group.',
        teacherSource,
        checkpoints: ['Identify the whole.', 'Identify the known number of groups.', 'Place the unknown inside each group.']
      },
      {
        title: '2. Fair-share until every group is equal',
        body: 'Distribute objects one at a time or read the already divided picture, then count one completed group to find the quotient.',
        teacherSource,
        checkpoints: ['Keep the groups equal.', 'Use every object in the whole.', 'Count the size of one group.']
      },
      {
        title: '3. State what the quotient means',
        body: 'In 18 ÷ 2 = 9, the quotient 9 means 9 objects in each of 2 groups. Multiplying 2 × 9 checks the whole of 18.',
        teacherSource,
        checkpoints: ['Attach the correct unit to 9.', 'Multiply quotient by group count.', 'Recover the original whole.']
      }
    ],
    5: [
      {
        title: '1. Division can find the number of groups',
        body: 'When the total and the size of each group are known, make equal groups of that size. The quotient tells how many groups can be made.',
        teacherSource,
        checkpoints: ['Identify the whole.', 'Identify the known group size.', 'Place the unknown on the number of groups.']
      },
      {
        title: '2. Group and count by the known size',
        body: 'Circle equal groups on the object bank or count by the group size until reaching the whole. Each count names one completed group.',
        teacherSource,
        checkpoints: ['Circle exactly the known group size.', 'Use every object once.', 'Count the completed groups.']
      },
      {
        title: '3. Contrast the two division meanings',
        body: 'Lesson 4 found how many were in each group. Lesson 5 finds how many groups there are. The equation alone is not enough; the model and unit determine the quotient’s meaning.',
        teacherSource,
        checkpoints: ['Name what is already known.', 'Name what the quotient represents.', 'Check with the related multiplication fact.']
      }
    ]
  };
  return lessonSpecific[seed.lessonNumber] ?? [
    {
      title: `1. ${M1_TEACHER_OBJECTIVES[seed.lessonNumber]}`,
      body: seed.concept,
      teacherSource,
      checkpoints: ['Name the quantities in the model.', 'Keep each quantity tied to its unit.', 'Write the equation after interpreting the model.']
    },
    {
      title: '2. Represent the relationship',
      body: `Represent the same source relationship in words, a model, and an equation. ${seed.concept}`,
      teacherSource,
      checkpoints: ['Preserve every given quantity.', 'Place the unknown where the source places it.', 'Use an operation that matches the model.']
    },
    {
      title: '3. Explain and check',
      body: seed.contrast,
      teacherSource,
      checkpoints: ['Check the operation against the story.', 'Check the model quantities.', 'State the answer with its unit.']
    }
  ];
}

function makeLesson(seed: LessonSeed): ProblemSetCenteredLesson {
  const teacherEditionBasis = m1TeacherSource(seed.lessonNumber);
  const teacherEditionImages = teacherEditionPageImagesFromBasis(teacherEditionBasis);
  const problemSetImages = M1_PROBLEM_SET_SOURCE_PAGES[seed.lessonNumber] ?? teacherEditionImages;
  const answerKeyImages = M1_ANSWER_KEY_SOURCE_PAGES[seed.lessonNumber] ?? [];

  return {
    title: `Lesson ${seed.lessonNumber}: ${M1_TEACHER_OBJECTIVES[seed.lessonNumber]}`,
    concept: seed.concept,
    teacherEditionBasis,
    contrast: seed.contrast,
    summary: seed.summary,
    sourceNote: teacherEditionSourceNote(seed),
    sourcePageImages: teacherEditionImages,
    blankSourcePageImages: teacherEditionImages,
    solvedSourcePageImages: [...teacherEditionImages, ...answerKeyImages],
    conceptSections: conceptSectionsFor(seed, teacherEditionBasis),
    problems: seed.problems.map((problem) => {
      const alignedProblem = sourcePromptFromWorkbook(seed.lessonNumber, problem);
      const builtProblem = makeProblem({
        sourcePageImages: problemSetImages,
        blankSourcePageImages: problemSetImages,
        solvedSourcePageImages: [...problemSetImages, ...answerKeyImages],
        ...alignedProblem,
        blankVisual: observedM1ProblemVisual(seed.lessonNumber, alignedProblem, false) ?? alignedProblem.blankVisual,
        solvedVisual: observedM1ProblemVisual(seed.lessonNumber, alignedProblem, true) ?? alignedProblem.solvedVisual
      });
      if (seed.lessonNumber > 21) return builtProblem;
      return {
        ...builtProblem,
        sourcePromptInVisual: true,
        blankPrompts: [],
        blankVisual: builtProblem.blankVisual
          ? { ...builtProblem.blankVisual, sourceNote: '' }
          : builtProblem.blankVisual,
        solvedVisual: builtProblem.solvedVisual
          ? { ...builtProblem.solvedVisual, sourceNote: '' }
          : builtProblem.solvedVisual
      };
    })
  };
}

export const M1_PROBLEM_SET_CENTERED_LESSONS: Record<number, ProblemSetCenteredLesson> = {
  1: makeLesson({
    lessonNumber: 1,
    title: 'Lesson 1 concept: equal groups become multiplication',
    concept: 'Multiplication describes equal groups. Students first count groups, then write repeated addition, unit form, and a multiplication sentence for the same total.',
    teacherEditionBasis: 'Teacher Edition Lesson 1, pages 23-33.',
    contrast: 'Before multiplying, verify the groups are equal and identify how many groups and how many in each group.',
    summary: 'Multiplication is a concise way to add equal groups. The factors describe the number of groups and the size of each group.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Fill in the blanks to make true statements for equal groups of hands, bananas, egg cartons, and groups of 4.',
        solvedAnswer: 'a. 15, 15, 15; b. 15, 15, 15; c. 24, 4 groups of six = 24, 4 x 6 = 24; d. 4 + 4 + 4 + 4 + 4 + 4 = 24, 6 groups of 4 = 24, 6 x 4 = 24.',
        equations: ['3 x 5 = 15', '5 x 3 = 15', '4 x 6 = 24', '6 x 4 = 24'],
        knownTotal: 15,
        knownGroupCount: 3,
        knownGroupSize: 5,
        quotient: 15,
        unitLabel: 'items',
        groupLabel: 'groups',
        blankVisualType: 'equation-workspace',
        animationType: 'array-model',
        quotientMeaning: 'Each product names the total number of objects in equal groups.',
        explanation: 'Each picture has equal-size groups. Count the groups and the size of one group, then write repeated addition, unit form, and multiplication for the same total.'
        ,
        blankVisual: lesson1ProblemVisual(1, false),
        solvedVisual: lesson1ProblemVisual(1, true)
      },
      {
        number: 2,
        sourcePrompt: 'The picture shows 2 groups of apples. Does the picture show 2 x 3? Explain why or why not.',
        solvedAnswer: 'No. The picture has 2 groups, but one group has 3 apples and the other has 2 apples, so the groups are not equal groups of 3.',
        equations: ['3 + 2 = 5', '2 x 3 does not match the picture'],
        knownTotal: 5,
        knownGroupCount: 2,
        knownGroupSize: 3,
        quotient: 5,
        unitLabel: 'apples',
        groupLabel: 'groups',
        blankVisualType: 'open-workspace',
        animationType: 'grouping-by-size',
        quotientMeaning: 'The answer explains why multiplication cannot be used unless the groups are equal.',
        explanation: 'The factor 2 would mean 2 groups, and the factor 3 would mean 3 apples in each group. The second group only has 2 apples.'
        ,
        blankVisual: lesson1ProblemVisual(2, false),
        solvedVisual: lesson1ProblemVisual(2, true)
      },
      {
        number: 3,
        sourcePrompt: 'Draw a picture to show 2 x 3 = 6.',
        solvedAnswer: 'A correct drawing shows 2 equal groups with 3 objects in each group, for 6 objects total.',
        equations: ['2 x 3 = 6'],
        knownTotal: 6,
        knownGroupCount: 2,
        knownGroupSize: 3,
        quotient: 6,
        unitLabel: 'objects',
        groupLabel: 'groups',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        quotientMeaning: 'The product 6 is the total number of objects.'
        ,
        blankVisual: lesson1ProblemVisual(3, false),
        solvedVisual: lesson1ProblemVisual(3, true)
      },
      {
        number: 4,
        sourcePrompt: 'Caroline, Brian, and Marta share a box of chocolates. Circle the chocolates to show 3 groups of 4, then write repeated addition and multiplication.',
        solvedAnswer: '3 groups of 4 chocolates make 12 chocolates.',
        equations: ['4 + 4 + 4 = 12', '3 x 4 = 12'],
        knownTotal: 12,
        knownGroupCount: 3,
        knownGroupSize: 4,
        quotient: 12,
        unitLabel: 'chocolates',
        groupLabel: 'groups',
        blankVisualType: 'object-bank',
        animationType: 'grouping-by-size',
        quotientMeaning: 'The product 12 is the total number of chocolates shared.'
        ,
        blankVisual: lesson1ProblemVisual(4, false),
        solvedVisual: lesson1ProblemVisual(4, true)
      }
    ]
  }),
  2: makeLesson({
    lessonNumber: 2,
    title: 'Lesson 2 concept: rows and columns show multiplication',
    concept: 'An array arranges equal groups in rows and columns. One factor can name the number of rows, and the other factor can name the number in each row.',
    teacherEditionBasis: 'Teacher Edition Lesson 2, pages 34-48.',
    contrast: 'Read the array by rows first so each factor has a clear meaning before writing the expression.',
    summary: 'Arrays make equal groups visible and connect rows, row size, and total to multiplication.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Use the car array to answer: How many rows of cars are there? How many cars are there in each row?',
        solvedAnswer: 'There are 4 rows with 2 cars in each row.',
        equations: ['4 x 2 = 8'],
        knownTotal: 8,
        knownGroupCount: 4,
        knownGroupSize: 2,
        quotient: 8,
        unitLabel: 'cars',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'Count horizontal rows, then count the cars in one row. The rows are equal, so multiplication applies.'
      },
      {
        number: 2,
        sourcePrompt: 'Use the object array to answer: What is the number of rows? What is the number of objects in each row?',
        solvedAnswer: 'There are 3 rows with 6 objects in each row.',
        equations: ['3 x 6 = 18'],
        knownGroupCount: 3,
        knownGroupSize: 6,
        knownTotal: 18,
        quotient: 18,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The problem asks for factor meanings, so count rows and row size directly from the array.'
      },
      {
        number: 3,
        sourcePrompt: 'There are 4 spoons in each row. How many spoons are in 2 rows? Write a multiplication expression.',
        solvedAnswer: 'There are 8 spoons in 2 rows.',
        equations: ['2 x 4 = 8'],
        knownTotal: 8,
        knownGroupCount: 2,
        knownGroupSize: 4,
        quotient: 8,
        unitLabel: 'spoons',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The array has 2 equal rows with 4 spoons in each row. Multiply rows by row size.'
      },
      {
        number: 4,
        sourcePrompt: 'There are 5 rows of triangles. How many triangles are in each row? Write a multiplication expression for the total.',
        solvedAnswer: 'There are 4 triangles in each row, and the multiplication expression is 5 × 4.',
        equations: ['5 x 4 = 20'],
        knownTotal: 20,
        knownGroupCount: 5,
        knownGroupSize: 4,
        quotient: 20,
        unitLabel: 'triangles',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The row count is 5. Count the triangles in one row, then multiply to find the total.'
      },
      {
        number: 5,
        sourcePrompt: 'Redraw 2 groups of 5 dots as an array with 2 rows of 5. Compare the drawing to the array.',
        solvedAnswer: 'An array with 2 rows of 5 is drawn. The comparison answer will vary.',
        equations: ['2 x 5 = 10'],
        knownTotal: 10,
        knownGroupCount: 2,
        knownGroupSize: 5,
        quotient: 10,
        unitLabel: 'dots',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The total and equal group size stay the same; only the arrangement changes.'
      },
      {
        number: 6,
        sourcePrompt: 'Emma arranges rocks in 4 rows of 3. Draw the array and write a multiplication equation.',
        solvedAnswer: 'Emma has 12 rocks altogether.',
        equations: ['4 x 3 = 12'],
        knownTotal: 12,
        knownGroupCount: 4,
        knownGroupSize: 3,
        quotient: 12,
        unitLabel: 'rocks',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'Draw 4 equal rows and put 3 rocks in each row. The array shows 12 rocks.'
      },
      {
        number: 7,
        sourcePrompt: 'Joshua thinks his cans show 5 x 3. Draw the array and find the total number of cans.',
        solvedAnswer: 'Joshua organizes 15 cans.',
        equations: ['5 x 3 = 15'],
        knownTotal: 15,
        knownGroupCount: 5,
        knownGroupSize: 3,
        quotient: 15,
        unitLabel: 'cans',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'Draw 5 rows of 3 cans and count by threes to 15.'
      }
    ]
  }),
  3: makeLesson({
    lessonNumber: 3,
    title: 'Lesson 3 concept: factors have meanings',
    concept: 'Each factor in multiplication has a role. One factor can name how many groups or rows; the other names the size of each group or row.',
    teacherEditionBasis: 'Teacher Edition Lesson 3, pages 49-60.',
    contrast: 'Do not treat factors as just numbers; say what each factor represents in the picture.',
    summary: 'A multiplication answer is complete when the factors and product are interpreted in context.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'There are 5 flowers in each bunch. How many flowers are in 4 bunches?',
        solvedAnswer: 'There are 20 flowers altogether.',
        equations: ['4 x 5 = 20'],
        knownTotal: 20,
        knownGroupCount: 4,
        knownGroupSize: 5,
        quotient: 20,
        unitLabel: 'flowers',
        groupLabel: 'bunches',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        quotientMeaning: 'The product 20 means total flowers.',
        explanation: 'The number of groups is 4 bunches, and the size of each group is 5 flowers.'
      },
      {
        number: 2,
        sourcePrompt: 'There are _______ candies in each box. How many candies are in 6 boxes?',
        solvedAnswer: 'There are 3 candies in each box, so there are 18 candies altogether.',
        equations: ['6 x 3 = 18'],
        knownGroupCount: 6,
        knownGroupSize: 3,
        knownTotal: 18,
        quotient: 18,
        unitLabel: 'candies',
        groupLabel: 'boxes',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The first factor is 6 boxes. The official Teacher Edition picture shows 3 candies in each box.'
      },
      {
        number: 3,
        sourcePrompt: 'There are 4 oranges in each row. How many oranges are there in ______ rows?',
        solvedAnswer: 'There are 3 rows of 4 oranges, so there are 12 oranges altogether.',
        equations: ['3 x 4 = 12'],
        knownGroupSize: 4,
        knownGroupCount: 3,
        knownTotal: 12,
        quotient: 12,
        unitLabel: 'oranges',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The row size is given as 4. The official Teacher Edition picture shows 3 rows.'
      },
      {
        number: 4,
        sourcePrompt: 'There are ________ loaves of bread in each row. How many loaves of bread are there in 5 rows?',
        solvedAnswer: 'There are 2 loaves in each row, so there are 10 loaves of bread altogether.',
        equations: ['5 x 2 = 10'],
        knownGroupCount: 5,
        knownGroupSize: 2,
        knownTotal: 10,
        quotient: 10,
        unitLabel: 'loaves',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The problem gives 5 rows. The official Teacher Edition picture shows 2 loaves in each row.'
      },
      {
        number: 5,
        sourcePrompt: 'Write a multiplication equation for the 4-by-3 array and draw a number bond with each part as one row.',
        solvedAnswer: 'The array shows 4 rows of 3, so the total is 12. The number bond has four parts of 3.',
        equations: ['4 x 3 = 12', '3 + 3 + 3 + 3 = 12'],
        knownTotal: 12,
        knownGroupCount: 4,
        knownGroupSize: 3,
        quotient: 12,
        unitLabel: 'Xs',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'Each row is one equal part in the number bond.'
      },
      {
        number: 6,
        sourcePrompt: 'Draw an array using factors 2 and 3. Then show a number bond where each part represents the amount in one row.',
        solvedAnswer: 'A valid array is 2 rows of 3 for a total of 6, with number-bond parts 3 and 3.',
        equations: ['2 x 3 = 6', '3 + 3 = 6'],
        knownTotal: 6,
        knownGroupCount: 2,
        knownGroupSize: 3,
        quotient: 6,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The factors tell the row count and row size. Each row becomes one part in the number bond.'
      }
    ]
  }),
  4: makeLesson({
    lessonNumber: 4,
    title: 'Lesson 4 concept: division can find group size',
    concept: 'When the total and number of equal groups are known, division finds how many objects are in each group.',
    teacherEditionBasis: 'Teacher Edition Lesson 4, pages 63-74.',
    contrast: 'The quotient must be interpreted as the size of each group, not just a number.',
    summary: 'Division can find the size of each group when the total and number of groups are known.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: '14 flowers are divided into 2 equal groups. There are _________ flowers in each group.',
        solvedAnswer: 'There are 7 flowers in each group.',
        equations: ['14 divided by 2 = 7'],
        knownTotal: 14,
        knownGroupCount: 2,
        quotient: 7,
        unitLabel: 'flowers',
        groupLabel: 'groups',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing',
        quotientMeaning: 'The quotient 7 means flowers in each group.',
        explanation: 'Share 14 flowers equally into 2 groups. Each group receives 7 flowers.'
      },
      {
        number: 2,
        sourcePrompt: '28 books are divided into 4 equal groups. There are _________ books in each group.',
        solvedAnswer: 'There are 7 books in each group.',
        equations: ['28 divided by 4 = 7'],
        knownTotal: 28,
        knownGroupCount: 4,
        quotient: 7,
        unitLabel: 'books',
        groupLabel: 'groups',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing',
        quotientMeaning: 'The quotient 7 means books in each group.'
      },
      {
        number: 3,
        sourcePrompt: '30 apples are divided into ______ equal groups. There are _________ apples in each group.',
        solvedAnswer: 'The official Teacher Edition picture has 3 equal groups, so there are 10 apples in each group.',
        equations: ['30 divided by 3 = 10'],
        knownTotal: 30,
        knownGroupCount: 3,
        quotient: 10,
        unitLabel: 'apples',
        groupLabel: 'groups',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing',
        explanation: 'The picture supplies the number of groups. Divide the total apples equally across those groups.'
      },
      {
        number: 4,
        sourcePrompt: '_______ cups are divided into _______ equal groups. There are _________ cups in each group. 12 divided by 2 = _________.',
        solvedAnswer: '12 cups divided into 2 equal groups gives 6 cups in each group.',
        equations: ['12 divided by 2 = 6'],
        knownTotal: 12,
        knownGroupCount: 2,
        quotient: 6,
        unitLabel: 'cups',
        groupLabel: 'groups',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing'
      },
      {
        number: 5,
        sourcePrompt: 'There are _________ toys in each group. 15 divided by 3 = _________.',
        solvedAnswer: 'There are 5 toys in each group.',
        equations: ['15 divided by 3 = 5'],
        knownTotal: 15,
        knownGroupCount: 3,
        quotient: 5,
        unitLabel: 'toys',
        groupLabel: 'groups',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing'
      },
      {
        number: 6,
        sourcePrompt: '9 divided by 3 = __________.',
        solvedAnswer: '9 divided into 3 equal groups gives 3 in each group.',
        equations: ['9 divided by 3 = 3'],
        knownTotal: 9,
        knownGroupCount: 3,
        quotient: 3,
        unitLabel: 'objects',
        groupLabel: 'groups',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing'
      },
      {
        number: 7,
        sourcePrompt: 'Audrina has 24 colored pencils. She puts them in 4 equal groups. How many colored pencils are in each group? There are _______ colored pencils in each group. 24 divided by 4 = _______.',
        solvedAnswer: 'There are 6 colored pencils in each group.',
        equations: ['24 divided by 4 = 6'],
        knownTotal: 24,
        knownGroupCount: 4,
        quotient: 6,
        unitLabel: 'colored pencils',
        groupLabel: 'groups',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing'
      },
      {
        number: 8,
        sourcePrompt: 'Charlie picks 20 apples. He divides them equally between 5 baskets. Draw the apples in each basket. There are ___________ apples in each basket. 20 divided by ________ = __________.',
        solvedAnswer: 'There are 4 apples in each basket.',
        equations: ['20 divided by 5 = 4'],
        knownTotal: 20,
        knownGroupCount: 5,
        quotient: 4,
        unitLabel: 'apples',
        groupLabel: 'baskets',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing'
      },
      {
        number: 9,
        sourcePrompt: 'Chelsea collects butterfly stickers. The picture shows how she placed them in her book. Write a division sentence to show how she equally grouped her stickers. There are ____________ butterflies in each row. __________ divided by __________ = __________.',
        solvedAnswer: 'There are 3 butterflies in each row.',
        equations: ['15 divided by 5 = 3'],
        knownTotal: 15,
        knownGroupCount: 5,
        knownGroupSize: 3,
        quotient: 3,
        unitLabel: 'butterflies',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The official Teacher Edition picture shows 15 butterflies arranged in 5 equal rows. Divide 15 by 5 to find 3 butterflies in each row.'
      }
    ]
  }),
  5: makeLesson({
    lessonNumber: 5,
    title: 'Lesson 5 concept: division can find number of groups',
    concept: 'When the total and group size are known, division finds how many groups can be made.',
    teacherEditionBasis: 'Teacher Edition Lesson 5, pages 75-84.',
    contrast: 'The quotient names the number of groups, because the size of each group is already known.',
    summary: 'Division can find how many equal groups are in a total.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Divide 6 tomatoes into groups of 3. There are _________ groups of 3 tomatoes. 6 divided by 3 = 2.',
        solvedAnswer: 'There are 2 groups of 3 tomatoes.',
        equations: ['6 divided by 3 = 2'],
        blankEquations: ['6 divided by 3 = 2'],
        knownTotal: 6,
        knownGroupSize: 3,
        quotient: 2,
        unitLabel: 'tomatoes',
        groupLabel: 'groups',
        blankVisualType: 'object-bank',
        animationType: 'grouping-by-size',
        quotientMeaning: 'The quotient 2 means the number of groups.'
      },
      {
        number: 2,
        sourcePrompt: 'Divide 8 lollipops into groups of 2. There are _______ groups. 8 divided by 2 = _______.',
        solvedAnswer: 'There are 4 groups.',
        equations: ['8 divided by 2 = 4'],
        knownTotal: 8,
        knownGroupSize: 2,
        quotient: 4,
        unitLabel: 'lollipops',
        groupLabel: 'groups',
        blankVisualType: 'object-bank',
        animationType: 'grouping-by-size'
      },
      {
        number: 3,
        sourcePrompt: 'Divide 10 stars into groups of 5. 10 divided by 5 = _______.',
        solvedAnswer: 'There are 2 groups of 5 stars.',
        equations: ['10 divided by 5 = 2'],
        knownTotal: 10,
        knownGroupSize: 5,
        quotient: 2,
        unitLabel: 'stars',
        groupLabel: 'groups',
        blankVisualType: 'object-bank',
        animationType: 'grouping-by-size'
      },
      {
        number: 4,
        sourcePrompt: 'Divide the shells to show 12 divided by 3 = ________, where the unknown represents the number of groups. How many groups are there? ________.',
        solvedAnswer: 'There are 4 groups.',
        equations: ['12 divided by 3 = 4'],
        knownTotal: 12,
        knownGroupSize: 3,
        quotient: 4,
        unitLabel: 'shells',
        groupLabel: 'groups',
        blankVisualType: 'object-bank',
        animationType: 'grouping-by-size'
      },
      {
        number: 5,
        sourcePrompt: 'Rachel has 9 crackers. She puts 3 crackers in each bag. Circle the crackers to show Rachel\'s bags. a. Write a division sentence where the answer represents the number of Rachel\'s bags. b. Draw a number bond to represent the problem.',
        solvedAnswer: 'Rachel makes 3 bags.',
        equations: ['9 divided by 3 = 3', '3 + 3 + 3 = 9'],
        knownTotal: 9,
        knownGroupSize: 3,
        quotient: 3,
        unitLabel: 'crackers',
        groupLabel: 'bags',
        blankVisualType: 'object-bank',
        animationType: 'grouping-by-size',
        explanation: 'Circle groups of 3 crackers. The number of circles is the number of bags.'
      },
      {
        number: 6,
        sourcePrompt: 'Jameisha has 16 wheels to make toy cars. She uses 4 wheels for each car. a. Use a count-by to find the number of cars Jameisha can build. Make a drawing to match your counting. b. Write a division sentence to represent the problem.',
        solvedAnswer: 'Jameisha can build 4 cars.',
        equations: ['4, 8, 12, 16', '16 divided by 4 = 4'],
        knownTotal: 16,
        knownGroupSize: 4,
        quotient: 4,
        unitLabel: 'wheels',
        groupLabel: 'cars',
        blankVisualType: 'bar-units',
        animationType: 'grouping-by-size',
        explanation: 'Each group of 4 wheels makes 1 car. Four groups of 4 use all 16 wheels.'
      }
    ]
  }),
  6: makeLesson({
    lessonNumber: 6,
    title: 'Lesson 6 concept: division is an unknown factor',
    concept: 'An array can show the quotient in a division equation as the missing factor in a related multiplication equation.',
    teacherEditionBasis: 'Teacher Edition Lesson 6, pages 85-94.',
    contrast: 'Use the same array to explain both the division equation and the related multiplication equation.',
    summary: 'The quotient in division can be checked as an unknown factor in multiplication.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Rick puts 15 tennis balls into cans. Each can holds 3 balls. Circle groups of 3.',
        solvedAnswer: 'Rick needs 5 cans.',
        equations: ['5 x 3 = 15', '15 divided by 3 = 5'],
        blankEquations: ['____ x 3 = 15', '15 divided by 3 = ____'],
        knownTotal: 15,
        knownGroupSize: 3,
        quotient: 5,
        unitLabel: 'tennis balls',
        groupLabel: 'cans',
        blankVisualType: 'object-bank',
        animationType: 'grouping-by-size',
        quotientMeaning: 'The quotient 5 means cans.'
      },
      {
        number: 2,
        sourcePrompt: 'Rick uses 15 tennis balls to make 5 equal groups. Draw to show how many are in each group.',
        solvedAnswer: 'There are 3 tennis balls in each group.',
        equations: ['5 x 3 = 15', '15 divided by 5 = 3'],
        blankEquations: ['5 x ____ = 15', '15 divided by 5 = ____'],
        knownTotal: 15,
        knownGroupCount: 5,
        quotient: 3,
        unitLabel: 'tennis balls',
        groupLabel: 'groups',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing',
        quotientMeaning: 'The quotient 3 means tennis balls in each group.'
      },
      {
        number: 3,
        sourcePrompt: 'Use an array to model Problem 1 and complete related multiplication and division equations.',
        solvedAnswer: 'The blanks are 5 and 3. In 15 divided by 3, 5 means the number of groups; in 15 divided by 5, 3 means the size of each group.',
        equations: ['5 x 3 = 15', '15 divided by 3 = 5', '5 x 3 = 15', '15 divided by 5 = 3'],
        blankEquations: ['____ x 3 = 15', '15 divided by 3 = ____', '5 x ____ = 15', '15 divided by 5 = ____'],
        knownTotal: 15,
        knownGroupCount: 5,
        knownGroupSize: 3,
        quotient: 5,
        unitLabel: 'balls',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 4,
        sourcePrompt: 'Deena makes 21 jars of tomato sauce. She puts 7 jars in each box. How many boxes does she need?',
        solvedAnswer: 'Deena needs 3 boxes.',
        equations: ['21 divided by 7 = 3', '3 x 7 = 21'],
        blankEquations: ['21 divided by 7 = ____', '____ x 7 = 21'],
        knownTotal: 21,
        knownGroupSize: 7,
        quotient: 3,
        unitLabel: 'jars',
        groupLabel: 'boxes',
        blankVisualType: 'object-bank',
        animationType: 'grouping-by-size',
        quotientMeaning: 'The unknown factor and quotient both mean the number of boxes.'
      },
      {
        number: 5,
        sourcePrompt: 'Charlie solves 4 x blank = 12 by writing 12 divided by 4. Explain why the method works.',
        solvedAnswer: 'It works because division finds the missing factor. If 4 groups make 12, each group has 3.',
        equations: ['4 x 3 = 12', '12 divided by 4 = 3'],
        blankEquations: ['4 x ____ = 12', '12 divided by 4 = ____'],
        knownTotal: 12,
        knownGroupCount: 4,
        quotient: 3,
        unitLabel: 'objects',
        groupLabel: 'groups',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        quotientMeaning: 'The quotient 3 is the unknown factor.'
      },
      {
        number: 6,
        sourcePrompt: 'Draw an array to represent the equations from Problem 5.',
        solvedAnswer: 'Array of 4 rows of 3 drawn.',
        equations: ['4 x 3 = 12', '12 divided by 4 = 3'],
        blankEquations: [],
        knownTotal: 12,
        knownGroupCount: 4,
        knownGroupSize: 3,
        quotient: 12,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      }
    ]
  }),
  7: makeLesson({
    lessonNumber: 7,
    title: 'Lesson 7 concept: one array can be read two ways',
    concept: 'Commutativity means the order of factors can change while the total stays the same. Rotating or rereading an array makes this visible.',
    teacherEditionBasis: 'Teacher Edition Lesson 7, pages 97-108.',
    contrast: 'Keep the total fixed while switching which factor names rows and which names row size.',
    summary: 'Related facts such as 6 x 2 and 2 x 6 describe the same total when read from the same array.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Draw an array that shows 6 rows of 2 and write the multiplication sentence.',
        solvedAnswer: 'The array has 12 objects.',
        equations: ['6 x 2 = 12'],
        blankEquations: ['____ x ____ = ____'],
        knownTotal: 12,
        knownGroupCount: 6,
        knownGroupSize: 2,
        quotient: 12,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 2,
        sourcePrompt: 'Draw an array that shows 2 rows of 6 and write the multiplication sentence.',
        solvedAnswer: 'The array has 12 objects.',
        equations: ['2 x 6 = 12'],
        blankEquations: ['____ x ____ = ____'],
        knownTotal: 12,
        knownGroupCount: 2,
        knownGroupSize: 6,
        quotient: 12,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 3,
        sourcePrompt: 'Compare the arrays in Problems 1 and 2 and explain why the factors are in a different order.',
        solvedAnswer: 'The array in Problem 1 turned on its side is the array in Problem 2. The meanings of the factors switch.',
        equations: ['6 x 2 = 2 x 6'],
        blankEquations: [],
        knownTotal: 12,
        knownGroupCount: 6,
        knownGroupSize: 2,
        quotient: 12,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        quotientMeaning: 'The product stays 12 even when the factor order changes.'
      },
      {
        number: 4,
        sourcePrompt: 'Write multiplication sentences for expressions such as 6 twos, 2 sixes, 7 twos, and related twos facts.',
        solvedAnswer: '6 x 2 = 12, 2 x 6 = 12, 7 x 2 = 14, 2 x 7 = 14, 9 x 2 = 18, 2 x 9 = 18, 11 x 2 = 22, 2 x 12 = 24.',
        equations: ['6 x 2 = 12', '2 x 6 = 12', '7 x 2 = 14', '2 x 7 = 14', '9 x 2 = 18', '2 x 9 = 18', '11 x 2 = 22', '2 x 12 = 24'],
        blankEquations: ['6 x 2 = 12', '2 x 6 = ____', '7 x 2 = ____', '2 x 7 = ____', '9 x 2 = ____', '2 x 9 = ____', '11 x 2 = ____', '2 x 12 = ____'],
        quotient: 12,
        unitLabel: 'objects',
        groupLabel: 'facts',
        blankVisualType: 'fact-match',
        animationType: 'fact-match'
      },
      {
        number: 5,
        sourcePrompt: 'Write and solve multiplication sentences where the second factor represents the size of the row.',
        solvedAnswer: 'The two source arrays give 4 x 2 = 8 and 2 x 4 = 8. In each equation, the second factor names the size of a row.',
        equations: ['4 x 2 = 8', '2 x 4 = 8'],
        blankEquations: ['____ x ____ = ____', '____ x ____ = ____'],
        knownTotal: 8,
        knownGroupCount: 4,
        knownGroupSize: 2,
        quotient: 8,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 6,
        sourcePrompt: 'Ms. Nenadal writes 2 x 7 = 7 x 2. Agree or disagree? Draw arrays to explain.',
        solvedAnswer: 'Agree. Draw an array of 7 rows of 2 and an array of 2 rows of 7.',
        equations: ['2 x 7 = 14', '7 x 2 = 14'],
        blankEquations: [],
        knownTotal: 14,
        knownGroupCount: 2,
        knownGroupSize: 7,
        quotient: 14,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 7,
        sourcePrompt: 'Find the missing factor to make each commutative equation true.',
        solvedAnswer: 'The missing factors are 5, 2, 10, and 9.',
        equations: ['5 x 2 = 2 x 5', '2 x 8 = 8 x 2', '2 x 10 = 10 x 2', '2 x 9 = 9 x 2'],
        blankEquations: ['5 x 2 = 2 x ____', '____ x 8 = 8 x 2', '2 x 10 = ____ x 2', '2 x ____ = 9 x 2'],
        quotient: 5,
        unitLabel: 'factors',
        groupLabel: 'matches',
        blankVisualType: 'fact-match',
        animationType: 'fact-match'
      },
      {
        number: 8,
        sourcePrompt: 'Jada gets 2 packs of erasers with 6 erasers in each. Draw an array, write a multiplication sentence, then use commutativity.',
        solvedAnswer: 'Jada has 12 erasers. The related facts are 2 x 6 = 12 and 6 x 2 = 12.',
        equations: ['2 x 6 = 12', '6 x 2 = 12'],
        blankEquations: ['____ x ____ = ____', '____ x ____ = ____'],
        knownTotal: 12,
        knownGroupCount: 2,
        knownGroupSize: 6,
        quotient: 12,
        unitLabel: 'erasers',
        groupLabel: 'packs',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      }
    ]
  }),
  8: makeLesson({
    lessonNumber: 8,
    title: 'Lesson 8 concept: related facts with units of 3',
    concept: 'Arrays and skip-counting by threes support related multiplication facts and commutativity.',
    teacherEditionBasis: 'Teacher Edition Lesson 8, pages 109-118.',
    contrast: 'Track both the number of threes and the total while using related facts.',
    summary: 'Facts with units of 3 can be solved and checked with arrays, skip-counting, and commutative pairs.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Draw an array that shows 5 rows of 3.',
        solvedAnswer: 'Array of 5 rows of 3 drawn.',
        equations: ['5 x 3 = 15'],
        blankEquations: [],
        knownTotal: 15,
        knownGroupCount: 5,
        knownGroupSize: 3,
        quotient: 15,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 2,
        sourcePrompt: 'Draw an array that shows 3 rows of 5.',
        solvedAnswer: 'Array of 3 rows of 5 drawn.',
        equations: ['3 x 5 = 15'],
        blankEquations: [],
        knownTotal: 15,
        knownGroupCount: 3,
        knownGroupSize: 5,
        quotient: 15,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 3,
        sourcePrompt: 'Write multiplication expressions for the arrays in Problems 1 and 2 and use the commutative property.',
        solvedAnswer: '5 x 3 = 3 x 5.',
        equations: ['5 x 3 = 3 x 5', '15 = 15'],
        blankEquations: ['____ x ____ = ____ x ____'],
        knownTotal: 15,
        knownGroupCount: 5,
        knownGroupSize: 3,
        quotient: 15,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 4,
        sourcePrompt: 'Write multiplication sentences for twos/threes expressions and skip-count to find totals.',
        solvedAnswer: '2 x 3 = 6, 3 x 2 = 6, 3 x 4 = 12, 4 x 3 = 12, 3 x 7 = 21, 7 x 3 = 21, 3 x 9 = 27, 9 x 3 = 27, 10 x 3 = 30.',
        equations: ['2 x 3 = 6', '3 x 2 = 6', '3 x 4 = 12', '4 x 3 = 12', '3 x 7 = 21', '7 x 3 = 21', '3 x 9 = 27', '9 x 3 = 27', '10 x 3 = 30'],
        blankEquations: ['2 x 3 = 6', '3 x 2 = ____', '3 x 4 = ____', '4 x 3 = ____', '3 x 7 = ____', '7 x 3 = ____', '3 x 9 = ____', '9 x 3 = ____', '10 x 3 = ____'],
        quotient: 6,
        unitLabel: 'facts',
        groupLabel: 'matches',
        blankVisualType: 'fact-match',
        animationType: 'fact-match'
      },
      {
        number: 5,
        sourcePrompt: 'Find unknowns to make equations true, then match related facts.',
        solvedAnswer: 'The unknowns are 15, 27, 24, 24, 15, and 3.',
        equations: ['3 + 3 + 3 + 3 + 3 = 15', '3 x 9 = 27', '7 threes + 1 three = 24', '3 x 8 = 24', '15 = 5 x 3', '27 = 9 x 3'],
        blankEquations: ['3 + 3 + 3 + 3 + 3 = ____', '3 x 9 = ____', '7 threes + 1 three = ____', '3 x 8 = ____', '____ = 5 x 3', '27 = 9 x ____'],
        quotient: 15,
        unitLabel: 'facts',
        groupLabel: 'matches',
        blankVisualType: 'fact-match',
        animationType: 'fact-match'
      },
      {
        number: 6,
        sourcePrompt: 'Isaac picks 3 tangerines each day for 7 days, then 3 more days. Draw arrays and solve both totals.',
        solvedAnswer: 'Isaac picks 21 tangerines in 7 days and 30 tangerines in 10 days.',
        equations: ['7 x 3 = 21', '10 x 3 = 30'],
        blankEquations: ['____ x ____ = ____', '____ x ____ = ____'],
        knownTotal: 30,
        knownGroupCount: 10,
        knownGroupSize: 3,
        quotient: 30,
        unitLabel: 'tangerines',
        groupLabel: 'days',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 7,
        sourcePrompt: 'Sarah buys bottles of soap. Each bottle costs $2. Find the cost for 3 bottles and 6 bottles.',
        solvedAnswer: '3 bottles cost 6 dollars. 6 bottles cost 12 dollars.',
        equations: ['3 x 2 = 6', '6 x 2 = 12'],
        blankEquations: ['____ x ____ = $____', '____ x ____ = $____'],
        knownGroupSize: 2,
        quotient: 12,
        unitLabel: 'dollars',
        groupLabel: 'bottles',
        blankVisualType: 'equation-workspace',
        animationType: 'two-step-model'
      }
    ]
  }),
  9: makeLesson({
    lessonNumber: 9,
    title: 'Lesson 9 concept: add or subtract equal groups',
    concept: 'A known multiplication fact can help find a related fact by adding or subtracting equal groups in an array.',
    teacherEditionBasis: 'Teacher Edition Lesson 9, pages 119-130.',
    contrast: 'Use the added or removed equal groups instead of recounting every object by ones.',
    summary: 'Related facts can be found by composing or decomposing arrays into known equal-group parts.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'A team has 2 rows of 5 soccer balls and adds 3 rows of 5. Complete equations for the total array.',
        solvedAnswer: 'The total is 25 soccer balls, or 5 fives.',
        equations: ['(5 + 5) + (5 + 5 + 5) = 25', '2 fives + 3 fives = 5 fives', '5 x 5 = 25'],
        blankEquations: ['(5 + 5) + (5 + 5 + 5) = ____', '2 fives + ____ fives = ____ fives', '____ x 5 = ____'],
        knownTotal: 25,
        knownGroupCount: 5,
        knownGroupSize: 5,
        quotient: 25,
        unitLabel: 'soccer balls',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'decompose-array'
      },
      {
        number: 2,
        sourcePrompt: '7 x 2 = ____.',
        solvedAnswer: '7 x 2 = 14.',
        equations: ['5 x 2 = 10', '2 x 2 = 4', '10 + 4 = 14', '7 x 2 = 14'],
        blankEquations: ['7 x 2 = ____', '5 x 2 = ____', '2 x 2 = ____', '10 + 4 = ____', '____ x 2 = 14'],
        knownTotal: 14,
        knownGroupCount: 7,
        knownGroupSize: 2,
        quotient: 14,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'equation-workspace',
        animationType: 'decompose-array'
      },
      {
        number: 3,
        sourcePrompt: '9 x 2 = ____.',
        solvedAnswer: '9 x 2 = 18.',
        equations: ['10 x 2 = 20', '1 x 2 = 2', '20 - 2 = 18', '9 x 2 = 18'],
        blankEquations: ['9 x 2 = ____', '10 x 2 = ____', '1 x 2 = ____', '20 - ____ = 18', '9 x 2 = ____'],
        knownTotal: 18,
        knownGroupCount: 9,
        knownGroupSize: 2,
        quotient: 18,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'equation-workspace',
        animationType: 'decompose-array'
      },
      {
        number: 4,
        sourcePrompt: 'Matthew organizes baseball cards in 4 rows of 3. Draw an array and solve.',
        solvedAnswer: 'Matthew has 12 baseball cards.',
        equations: ['4 x 3 = 12'],
        blankEquations: ['4 x 3 = ____'],
        knownTotal: 12,
        knownGroupCount: 4,
        knownGroupSize: 3,
        quotient: 12,
        unitLabel: 'cards',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 5,
        sourcePrompt: 'Matthew adds 2 more rows of 3 cards. Write equations and find the new total.',
        solvedAnswer: 'The added rows have 6 cards. The total is 18 cards, or 6 rows of 3.',
        equations: ['2 x 3 = 6', '12 + 6 = 18', '6 x 3 = 18'],
        blankEquations: ['____ x 3 = ____', '____ + ____ = 18', '____ x ____ = 18'],
        knownTotal: 18,
        knownGroupCount: 6,
        knownGroupSize: 3,
        quotient: 18,
        unitLabel: 'cards',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'decompose-array'
      }
    ]
  }),
  10: makeLesson({
    lessonNumber: 10,
    title: 'Lesson 10 concept: decompose arrays to multiply',
    concept: 'The distributive property lets students split one array into two smaller arrays, multiply the parts, and add the partial products.',
    teacherEditionBasis: 'Teacher Edition Lesson 10, pages 131-141.',
    contrast: 'The split changes the strategy, not the total product.',
    summary: 'A larger multiplication fact can be solved as the sum of two smaller multiplication facts.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: '7 x 3 = (5 x 3) + (2 x 3) = _________. Use the split array to complete the partial-product equations: (5 x 3) = 15, (2 x 3) = __________, (5 x 3) + (2 x 3) = 15 + __________, and 15 + ______ = _____________.',
        solvedAnswer: '7 x 3 = 21.',
        equations: ['5 x 3 = 15', '2 x 3 = 6', '15 + 6 = 21', '7 x 3 = 21'],
        blankEquations: ['7 x 3 = (5 x 3) + (2 x 3) = ____', '(5 x 3) = 15', '(2 x 3) = ____', '(5 x 3) + (2 x 3) = 15 + ____', '15 + ____ = ____'],
        knownTotal: 21,
        knownGroupCount: 7,
        knownGroupSize: 3,
        quotient: 21,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'decompose-array'
      },
      {
        number: 2,
        sourcePrompt: '8 x 3 = (4 x 3) + (4 x 3) = ______. Use the two equal split arrays to complete: (______ x 3) = _______, (______ x 3) = ________, (4 x 3) + (4 x 3) = _________ + _________, and _________ x 3 = __________.',
        solvedAnswer: '8 x 3 = 24.',
        equations: ['4 x 3 = 12', '4 x 3 = 12', '12 + 12 = 24', '8 x 3 = 24'],
        blankEquations: ['8 x 3 = (4 x 3) + (4 x 3) = ____', '(____ x 3) = ____', '(____ x 3) = ____', '(4 x 3) + (4 x 3) = ____ + ____', '____ x 3 = ____'],
        knownTotal: 24,
        knownGroupCount: 8,
        knownGroupSize: 3,
        quotient: 24,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'decompose-array'
      },
      {
        number: 3,
        sourcePrompt: "Ruby makes a photo album. One page is shown below. Ruby puts 3 photos in each row. a. Fill in the equations on the right. Use them to help you draw arrays that show the photos on the top and bottom parts of the page: ______ x 3 = 6 and ______ x 3 = 9. b. Ruby calculates the total number of photos as shown below. Use the array you drew to help explain Ruby's calculation: 5 x 3 = 6 + 9 = 15.",
        solvedAnswer: 'a. The upper album shows an array of 2 rows of 3, so 2 x 3 = 6. The lower album shows an array of 3 rows of 3, so 3 x 3 = 9. b. Ruby breaks 5 x 3 into two smaller facts, 2 x 3 = 6 and 3 x 3 = 9, then adds 6 + 9 to show 5 x 3 = 15.',
        equations: ['2 x 3 = 6', '3 x 3 = 9', '6 + 9 = 15', '5 x 3 = 15'],
        blankPrompts: ["Draw the top and bottom photo arrays from Ruby's album page, complete the two source equation blanks, then explain Ruby's calculation."],
        blankEquations: ['____ x 3 = 6', '____ x 3 = 9', '5 x 3 = 6 + 9 = 15'],
        knownTotal: 15,
        knownGroupCount: 5,
        knownGroupSize: 3,
        quotient: 15,
        unitLabel: 'photos',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'decompose-array'
      }
    ]
  }),
  11: makeLesson({
    lessonNumber: 11,
    title: 'Lesson 11 concept: arrays and tapes model division',
    concept: 'Division can be modeled with an array and a tape diagram. The array columns or tape units show the missing factor.',
    teacherEditionBasis: 'Teacher Edition Lesson 11, pages 151-161.',
    contrast: 'The same quantities should appear in the array, tape diagram, division equation, and answer sentence.',
    summary: 'Use arrays and tape diagrams to connect division to an unknown multiplication factor.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Mrs. Prescott has 12 oranges and puts 2 oranges in each bag. Draw an array and tape diagram. How many bags?',
        solvedAnswer: 'She has 6 bags.',
        equations: ['12 divided by 2 = 6'],
        blankEquations: ['12 divided by 2 = ____'],
        knownTotal: 12,
        knownGroupSize: 2,
        quotient: 6,
        unitLabel: 'oranges',
        groupLabel: 'bags',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        quotientMeaning: 'The quotient 6 means bags.'
      },
      {
        number: 2,
        sourcePrompt: 'Mrs. Prescott arranges 18 plums into 6 bags. How many plums are in each bag?',
        solvedAnswer: 'There are 3 plums in each bag.',
        equations: ['18 divided by 6 = 3', '6 x 3 = 18'],
        blankEquations: [],
        knownTotal: 18,
        knownGroupCount: 6,
        quotient: 3,
        unitLabel: 'plums',
        groupLabel: 'bags',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing'
      },
      {
        number: 3,
        sourcePrompt: 'Fourteen shopping baskets are stacked equally in 7 piles. How many baskets are in each pile?',
        solvedAnswer: 'There are 2 baskets in each pile.',
        equations: ['14 divided by 7 = 2', '7 x 2 = 14'],
        blankEquations: [],
        knownTotal: 14,
        knownGroupCount: 7,
        quotient: 2,
        unitLabel: 'baskets',
        groupLabel: 'piles',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split'
      },
      {
        number: 4,
        sourcePrompt: 'Mr. Prescott packs 24 bell peppers equally into 8 bags. How many bell peppers are in each bag?',
        solvedAnswer: 'There are 3 bell peppers in each bag.',
        equations: ['24 divided by 8 = 3', '8 x 3 = 24'],
        blankEquations: [],
        knownTotal: 24,
        knownGroupCount: 8,
        quotient: 3,
        unitLabel: 'bell peppers',
        groupLabel: 'bags',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split'
      },
      {
        number: 5,
        sourcePrompt: 'Olga saves $2 a week for a $16 toy car. How many weeks will it take?',
        solvedAnswer: 'It will take 8 weeks.',
        equations: ['16 divided by 2 = 8', '8 x 2 = 16'],
        blankEquations: [],
        knownTotal: 16,
        knownGroupSize: 2,
        quotient: 8,
        unitLabel: 'dollars',
        groupLabel: 'weeks',
        blankVisualType: 'bar-units',
        animationType: 'grouping-by-size'
      }
    ]
  }),
  13: makeLesson({
    lessonNumber: 13,
    title: 'Lesson 13 concept: quotient meanings with units of 3',
    concept: 'Students interpret quotients with units of 3, deciding whether the answer names the number of groups or the number in each group.',
    teacherEditionBasis: 'Teacher Edition Lesson 13, pages 174-185.',
    contrast: 'After solving, say whether the quotient means groups of 3 or items in each group.',
    summary: 'The story determines the meaning of the quotient when dividing by or into units of 3.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Fill in the blanks to make true number sentences. 1 x 3 = 3; 2 x 3 = 6; 3 x 3 = 9; 4 x 3 = ______; 5 x 3 = ______; 6 x 3 = ______; 7 x 3 = ______; 8 x 3 = ______; 9 x 3 = ______; 10 x 3 = ______. 3 divided by 3 = ______; 6 divided by 3 = ______; ______ divided by 3 = 3; ______ divided by 3 = 4; ______ divided by 3 = 5; ______ divided by 3 = 6; ______ divided by 3 = 7; ______ divided by 3 = 8; ______ divided by 3 = 9; ______ divided by 3 = 10.',
        solvedAnswer: 'Complete the cards with 1; 2; 9; 12, 12; 15, 15; 18, 18; 21, 21; 24, 24; 27, 27; and 30, 30.',
        equations: ['5 x 3 = 15', '15 divided by 3 = 5', '10 x 3 = 30', '30 divided by 3 = 10'],
        quotient: 10,
        unitLabel: 'facts',
        groupLabel: 'matches',
        blankVisualType: 'fact-match',
        animationType: 'fact-match'
      },
      {
        number: 2,
        sourcePrompt: 'Mr. Lawton picks tomatoes from his garden. He divides the tomatoes into bags of 3. a. Circle to show how many bags he packs. Then, skip-count to show the total number of tomatoes. b. Draw and label a tape diagram to represent the problem. ______ divided by 3 = ______. Mr. Lawton packs ______ bags of tomatoes.',
        solvedAnswer: 'The source picture has 12 tomatoes. Skip-count 3, 6, 9, 12 to make 4 bags of 3 tomatoes.',
        equations: ['12 divided by 3 = 4', '4 x 3 = 12'],
        knownTotal: 12,
        knownGroupSize: 3,
        knownGroupCount: 4,
        quotient: 4,
        unitLabel: 'tomatoes',
        groupLabel: 'bags',
        blankVisualType: 'object-bank',
        animationType: 'grouping-by-size'
      },
      {
        number: 3,
        sourcePrompt: 'Camille buys a sheet of stamps that measures 15 centimeters long. Each stamp is 3 centimeters long. How many stamps does Camille buy? Draw and label a tape diagram to solve. Camille buys ______ stamps.',
        solvedAnswer: 'Camille buys 5 stamps.',
        equations: ['15 divided by 3 = 5'],
        blankEquations: [],
        knownTotal: 15,
        knownGroupSize: 3,
        quotient: 5,
        unitLabel: 'centimeters',
        groupLabel: 'stamps',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split'
      },
      {
        number: 4,
        sourcePrompt: 'Thirty third-graders go on a field trip. They are equally divided into 3 vans. How many students are in each van?',
        solvedAnswer: 'There are 10 students in each van.',
        equations: ['30 divided by 3 = 10'],
        blankEquations: [],
        knownTotal: 30,
        knownGroupCount: 3,
        quotient: 10,
        unitLabel: 'students',
        groupLabel: 'vans',
        blankVisualType: 'equal-containers',
        animationType: 'equal-sharing'
      },
      {
        number: 5,
        sourcePrompt: 'Some friends spend $24 altogether on frozen yogurt. Each person pays $3. How many people buy frozen yogurt?',
        solvedAnswer: '8 people buy frozen yogurt.',
        equations: ['24 divided by 3 = 8'],
        blankEquations: [],
        knownTotal: 24,
        knownGroupSize: 3,
        quotient: 8,
        unitLabel: 'dollars',
        groupLabel: 'people',
        blankVisualType: 'bar-units',
        animationType: 'grouping-by-size'
      }
    ]
  }),
  14: makeLesson({
    lessonNumber: 14,
    title: 'Lesson 14 concept: fluency with units of 4',
    concept: 'Skip-counting by fours and modeling groups of 4 build fluency with multiplication facts.',
    teacherEditionBasis: 'Teacher Edition Lesson 14, pages 188-199.',
    contrast: 'Track the number of groups and the running total while skip-counting by 4.',
    summary: 'Facts with units of 4 can be solved by skip-counting, arrays, and tape diagrams.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Skip-count by fours and match each answer to the appropriate expression.',
        solvedAnswer: 'The missing skip-count values are 12, 16, 20, 24, 28, 32, 36, and 40.',
        equations: ['1 x 4 = 4', '2 x 4 = 8', '3 x 4 = 12', '4 x 4 = 16', '5 x 4 = 20', '6 x 4 = 24', '7 x 4 = 28', '8 x 4 = 32', '9 x 4 = 36', '10 x 4 = 40'],
        blankEquations: [],
        quotient: 40,
        unitLabel: 'facts',
        groupLabel: 'matches',
        blankVisualType: 'fact-match',
        animationType: 'fact-match'
      },
      {
        number: 2,
        sourcePrompt: 'Mr. Schmidt replaces each of the 4 wheels on 7 cars. How many wheels does he replace?',
        solvedAnswer: 'Mr. Schmidt replaces 28 wheels.',
        equations: ['7 x 4 = 28'],
        blankEquations: [],
        knownTotal: 28,
        knownGroupCount: 7,
        knownGroupSize: 4,
        quotient: 28,
        unitLabel: 'wheels',
        groupLabel: 'cars',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split'
      },
      {
        number: 3,
        sourcePrompt: 'Trina makes 4 bracelets. Each bracelet has 6 beads. Draw and label a tape diagram for the total.',
        solvedAnswer: 'Trina uses 24 beads.',
        equations: ['4 x 6 = 24'],
        blankEquations: [],
        knownTotal: 24,
        knownGroupCount: 4,
        knownGroupSize: 6,
        quotient: 24,
        unitLabel: 'beads',
        groupLabel: 'bracelets',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split'
      },
      {
        number: 4,
        sourcePrompt: 'Find the total number of sides on 5 rectangles.',
        solvedAnswer: '5 rectangles have 20 sides.',
        equations: ['5 x 4 = 20'],
        blankEquations: [],
        knownTotal: 20,
        knownGroupCount: 5,
        knownGroupSize: 4,
        quotient: 20,
        unitLabel: 'sides',
        groupLabel: 'rectangles',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      }
    ]
  }),
  15: makeLesson({
    lessonNumber: 15,
    title: 'Lesson 15 concept: arrays and tape diagrams show commutativity',
    concept: 'The same multiplication situation can be shown with arrays and tape diagrams. The commutative property keeps the total the same when factors switch order.',
    teacherEditionBasis: 'Teacher Edition Lesson 15, pages 200-209.',
    contrast: 'Use labels to show how the same total can be read as different factor orders.',
    summary: 'Arrays and tape diagrams can both represent related multiplication facts with the same product.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Label tape diagrams, complete related multiplication equations, and draw arrays.',
        solvedAnswer: 'The answer-key tape labels are 8, 8, 8, 8; then 4, 12, 3, 12, 3, 12, 3, 12; then 4, 28, 7, 4, 7, 28, 4, 7.',
        equations: ['2 x 4 = 8', '4 x 2 = 8', '7 x 4 = 28', '4 x 7 = 28'],
        knownTotal: 8,
        knownGroupCount: 2,
        knownGroupSize: 4,
        quotient: 8,
        unitLabel: 'units',
        groupLabel: 'parts',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split'
      },
      {
        number: 2,
        sourcePrompt: 'Draw and label 2 tape diagrams to model why 4 x 6 = 6 x 4.',
        solvedAnswer: 'Two tape diagrams model 4 x 6 = 6 x 4.',
        equations: ['4 x 6 = 24', '6 x 4 = 24'],
        blankEquations: [],
        knownTotal: 24,
        knownGroupCount: 4,
        knownGroupSize: 6,
        quotient: 24,
        unitLabel: 'units',
        groupLabel: 'parts',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split'
      },
      {
        number: 3,
        sourcePrompt: 'Grace picks 4 flowers. Each flower has 8 petals. Draw and label a tape diagram for the total petals.',
        solvedAnswer: 'Grace picks flowers with 32 petals total.',
        equations: ['4 x 8 = 32'],
        blankEquations: [],
        knownTotal: 32,
        knownGroupCount: 4,
        knownGroupSize: 8,
        quotient: 32,
        unitLabel: 'petals',
        groupLabel: 'flowers',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split'
      },
      {
        number: 4,
        sourcePrompt: 'Michael counts 8 chairs. Each chair has 4 legs. How many chair legs are there altogether?',
        solvedAnswer: 'There are 32 chair legs altogether.',
        equations: ['8 x 4 = 32'],
        blankEquations: [],
        knownTotal: 32,
        knownGroupCount: 8,
        knownGroupSize: 4,
        quotient: 32,
        unitLabel: 'legs',
        groupLabel: 'chairs',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      }
    ]
  }),
  16: makeLesson({
    lessonNumber: 16,
    title: 'Lesson 16 concept: use 5 facts to find related 4 facts',
    concept: 'Students use the distributive property to decompose facts with units of 4 into known 5 x 4 facts plus extra groups.',
    teacherEditionBasis: 'Teacher Edition Lesson 16, pages 210-220.',
    contrast: 'Keep each partial product visible before adding to the final product.',
    summary: 'Use 5 x 4 = 20 as the anchor fact, add the extra rows of 4, and keep the array split visible while solving 6 x 4 through 10 x 4.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Label the array. Then, fill in the blanks below to make true number sentences.',
        solvedAnswer: 'Answer-key values: 24; 4; 4, 24; 28; 20; 8; 20, 8; 32; 20; 3, 12; 3, 20, 12, 32; 36; 20; 4, 16; 4, 20, 16, 36.',
        equations: ['6 x 4 = 20 + 4 = 24', '7 x 4 = 20 + 8 = 28', '8 x 4 = 20 + 12 = 32', '9 x 4 = 20 + 16 = 36'],
        relatedFacts: [
          {
            label: 'a',
            targetFact: '6 x 4',
            totalGroups: 6,
            groupSize: 4,
            firstPart: 5,
            secondPart: 1,
            knownFact: '5 x 4 = 20',
            extraFact: '1 x 4 = 4',
            blankEquation: '(6 x 4) = (5 x 4) + (1 x 4) = 20 + ____ = ____',
            solvedEquation: '(6 x 4) = (5 x 4) + (1 x 4) = 20 + 4 = 24',
            product: 24
          },
          {
            label: 'b',
            targetFact: '7 x 4',
            totalGroups: 7,
            groupSize: 4,
            firstPart: 5,
            secondPart: 2,
            knownFact: '5 x 4 = 20',
            extraFact: '2 x 4 = 8',
            blankEquation: '(7 x 4) = (5 x 4) + (2 x 4) = ____ + ____ = 28',
            solvedEquation: '(7 x 4) = (5 x 4) + (2 x 4) = 20 + 8 = 28',
            product: 28
          },
          {
            label: 'c',
            targetFact: '8 x 4',
            totalGroups: 8,
            groupSize: 4,
            firstPart: 5,
            secondPart: 3,
            knownFact: '5 x 4 = 20',
            extraFact: '3 x 4 = 12',
            blankEquation: '(8 x 4) = (5 x 4) + (____ x 4) = ____ + ____ = ____',
            solvedEquation: '(8 x 4) = (5 x 4) + (3 x 4) = 20 + 12 = 32',
            product: 32
          },
          {
            label: 'd',
            targetFact: '9 x 4',
            totalGroups: 9,
            groupSize: 4,
            firstPart: 5,
            secondPart: 4,
            knownFact: '5 x 4 = 20',
            extraFact: '4 x 4 = 16',
            blankEquation: '(9 x 4) = (5 x 4) + (____ x 4) = ____ + ____ = ____',
            solvedEquation: '(9 x 4) = (5 x 4) + (4 x 4) = 20 + 16 = 36',
            product: 36
          }
        ],
        knownGroupSize: 4,
        quotient: 36,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'decompose-array',
        blankWorkspaceLabel: 'Complete each array split using the known 5 x 4 fact and the extra rows.',
        blankPrompts: [
          'Shade or mark the 5 rows of 4 first.',
          'Add 1, 2, 3, or 4 more rows of 4.',
          'Complete the same number sentences from the Teacher Edition Problem Set.'
        ],
        explanation: 'Each fact keeps 5 x 4 = 20 visible, then adds the extra rows of 4: 4, 8, 12, or 16.',
        validationChecks: [
          'The 5-row part represents 5 x 4 = 20.',
          'The extra row part matches 1 x 4, 2 x 4, 3 x 4, or 4 x 4.',
          'The final products are 24, 28, 32, and 36.'
        ]
      },
      {
        number: 2,
        sourcePrompt: 'Match the equal expressions.',
        solvedAnswer: 'First cloud matches 8 x 4; second matches 6 x 4; third matches 9 x 4; fourth matches 7 x 4.',
        equations: ['6 x 4 = 24', '7 x 4 = 28', '8 x 4 = 32', '9 x 4 = 36'],
        relatedFacts: [
          {
            label: 'match 1',
            targetFact: '6 x 4',
            totalGroups: 6,
            groupSize: 4,
            firstPart: 5,
            secondPart: 1,
            knownFact: '(5 x 4) + (1 x 4)',
            extraFact: '6 x 4',
            blankEquation: '(5 x 4) + (1 x 4) -> ____ -> ____',
            solvedEquation: '(5 x 4) + (1 x 4) = 6 x 4 = 24',
            product: 24
          },
          {
            label: 'match 2',
            targetFact: '7 x 4',
            totalGroups: 7,
            groupSize: 4,
            firstPart: 5,
            secondPart: 2,
            knownFact: '(5 x 4) + (2 x 4)',
            extraFact: '7 x 4',
            blankEquation: '(5 x 4) + (2 x 4) -> ____ -> ____',
            solvedEquation: '(5 x 4) + (2 x 4) = 7 x 4 = 28',
            product: 28
          },
          {
            label: 'match 3',
            targetFact: '8 x 4',
            totalGroups: 8,
            groupSize: 4,
            firstPart: 5,
            secondPart: 3,
            knownFact: '(5 x 4) + (3 x 4)',
            extraFact: '8 x 4',
            blankEquation: '(5 x 4) + (3 x 4) -> ____ -> ____',
            solvedEquation: '(5 x 4) + (3 x 4) = 8 x 4 = 32',
            product: 32
          },
          {
            label: 'match 4',
            targetFact: '9 x 4',
            totalGroups: 9,
            groupSize: 4,
            firstPart: 5,
            secondPart: 4,
            knownFact: '(5 x 4) + (4 x 4)',
            extraFact: '9 x 4',
            blankEquation: '(5 x 4) + (4 x 4) -> ____ -> ____',
            solvedEquation: '(5 x 4) + (4 x 4) = 9 x 4 = 36',
            product: 36
          }
        ],
        quotient: 32,
        unitLabel: 'facts',
        groupLabel: 'matches',
        blankVisualType: 'fact-match',
        animationType: 'fact-match',
        blankWorkspaceLabel: 'Match each decomposed expression to its multiplication fact and product.',
        blankPrompts: [
          'Match each (5 x 4) + extra expression.',
          'Then match it to 6 x 4, 7 x 4, 8 x 4, or 9 x 4.',
          'Then match the product 24, 28, 32, or 36.'
        ],
        explanation: 'Each decomposed expression names the same total as one related multiplication fact.',
        validationChecks: [
          'Each expression keeps the 5 x 4 part.',
          'The extra part determines whether the match is 6 x 4, 7 x 4, 8 x 4, or 9 x 4.',
          'Products match the completed answer key values.'
        ]
      },
      {
        number: 3,
        sourcePrompt: 'Nolan draws the array below to find the answer to the multiplication expression 10 x 4. He says, "10 x 4 is just double 5 x 4." Explain Nolan\'s strategy.',
        solvedAnswer: 'Nolan breaks 10 fours into two smaller facts: 5 fours and 5 fours, or doubles 5 fours.',
        equations: ['5 x 4 = 20', '5 x 4 = 20', '20 + 20 = 40', '10 x 4 = 40'],
        relatedFacts: [
          {
            label: 'Nolan',
            targetFact: '10 x 4',
            totalGroups: 10,
            groupSize: 4,
            firstPart: 5,
            secondPart: 5,
            knownFact: '5 x 4 = 20',
            extraFact: '5 x 4 = 20',
            blankEquation: '10 x 4 = (5 x 4) + (____ x 4) = ____ + ____ = ____',
            solvedEquation: '10 x 4 = (5 x 4) + (5 x 4) = 20 + 20 = 40',
            product: 40
          }
        ],
        knownTotal: 40,
        knownGroupCount: 10,
        knownGroupSize: 4,
        quotient: 40,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'decompose-array',
        blankWorkspaceLabel: 'Break Nolan\'s 10-row array into two 5 x 4 parts.',
        blankPrompts: [
          'Show the first 5 rows of 4.',
          'Show the second 5 rows of 4.',
          'Explain how the two 20s make 40.'
        ],
        explanation: 'Nolan can split the 10 x 4 array into two equal 5 x 4 arrays. Each part is 20, so the total is 40.',
        validationChecks: [
          'The array has 10 rows of 4.',
          'The split shows 5 rows and 5 rows.',
          'The solved equation is 20 + 20 = 40.'
        ]
      }
    ]
  }),
  17: makeLesson({
    lessonNumber: 17,
    title: 'Lesson 17 concept: multiplication and division are related',
    concept: 'The same array can generate related multiplication and division equations, showing products, factors, and quotients together.',
    teacherEditionBasis: 'Teacher Edition Lesson 17, pages 221-231.',
    contrast: 'Use multiplication to check division and division to find missing factors.',
    summary: 'One array, tape diagram, or equal-row model can be read with multiplication and division; use the known product, factor, and quotient to complete the related facts.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Use the array to complete the related equations.',
        solvedAnswer: 'Complete the rows with 8, 8; 3, 3; 4, 4; 5, 4, 4, 5; 6, 4, 4, 6; 7, 28, 28, 7; 8, 32, 32, 8; 9, 4, 36, 36, 4, 9; 10, 4, 40, 40, 4, 10.',
        equations: ['1 x 4 = 4', '2 x 4 = 8', '3 x 4 = 12', '4 x 4 = 16', '5 x 4 = 20', '6 x 4 = 24', '7 x 4 = 28', '8 x 4 = 32', '9 x 4 = 36', '10 x 4 = 40'],
        quotient: 10,
        unitLabel: 'facts',
        groupLabel: 'matches',
        blankVisual: lesson17Visual(1, false),
        solvedVisual: lesson17Visual(1, true),
        blankVisualType: 'fact-match',
        animationType: 'fact-match',
        blankWorkspaceLabel: 'Use each row of 4 butterflies to complete the multiplication fact and matching division fact.',
        blankPrompts: [
          'Count rows of 4 from the butterfly array.',
          'Use the product from multiplication as the dividend in division.',
          'Leave only the Teacher Edition blanks empty in Blank mode.'
        ],
        explanation: 'Each row adds one group of 4. The product in n x 4 becomes the dividend in the related division equation.',
        validationChecks: [
          'The array has 10 rows of 4 butterflies.',
          'Each multiplication product matches the row count times 4.',
          'Each division fact divides the product by 4 to recover the row count.'
        ]
      },
      {
        number: 2,
        sourcePrompt: 'The baker packs 36 bran muffins in boxes of 4. Draw and label a tape diagram to find the number of boxes he packs.',
        solvedAnswer: 'The baker packs 9 boxes.',
        equations: ['36 divided by 4 = 9', '9 x 4 = 36'],
        knownTotal: 36,
        knownGroupSize: 4,
        quotient: 9,
        unitLabel: 'muffins',
        groupLabel: 'boxes',
        blankVisual: lesson17Visual(2, false),
        solvedVisual: lesson17Visual(2, true),
        blankVisualType: 'bar-units',
        animationType: 'grouping-by-size',
        blankWorkspaceLabel: 'Draw a tape diagram with 36 muffins total, 4 muffins in each box, and an unknown number of boxes.',
        blankPrompts: [
          'Label the total as 36 muffins.',
          'Show each equal box as 4 muffins.',
          'Find how many boxes are needed.'
        ],
        explanation: '36 muffins divided into groups of 4 makes 9 boxes. The solved tape has 9 equal units labeled 4.',
        validationChecks: [
          'The tape represents 36 muffins total.',
          'Each unit is labeled 4 muffins.',
          'There are 9 equal units, so the baker packs 9 boxes.'
        ]
      },
      {
        number: 3,
        sourcePrompt: 'The waitress arranges 32 glasses into 4 equal rows. How many glasses are in each row?',
        solvedAnswer: 'There are 8 glasses in each row.',
        equations: ['32 divided by 4 = 8', '4 x 8 = 32'],
        knownTotal: 32,
        knownGroupCount: 4,
        quotient: 8,
        unitLabel: 'glasses',
        groupLabel: 'rows',
        blankVisual: lesson17Visual(3, false),
        solvedVisual: lesson17Visual(3, true),
        blankVisualType: 'array-template',
        animationType: 'array-model',
        blankWorkspaceLabel: 'Use 4 equal rows to represent 32 glasses, then find the number in each row.',
        blankPrompts: [
          'Show 4 equal rows.',
          'Use 32 glasses total.',
          'Find the unknown number in each row.'
        ],
        explanation: '32 glasses shared across 4 equal rows gives 8 glasses in each row.',
        validationChecks: [
          'The model has 4 rows.',
          'The total is 32 glasses.',
          'Each row has 8 glasses.'
        ]
      },
      {
        number: 4,
        sourcePrompt: 'Janet paid $28 for 4 notebooks. Each notebook costs the same amount. What is the cost of 2 notebooks?',
        solvedAnswer: 'Two notebooks cost $14.',
        equations: ['28 divided by 4 = 7', '2 x 7 = 14'],
        knownTotal: 28,
        knownGroupCount: 4,
        quotient: 14,
        unitLabel: 'dollars',
        groupLabel: 'notebooks',
        blankVisual: lesson17Visual(4, false),
        solvedVisual: lesson17Visual(4, true),
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankWorkspaceLabel: 'Draw a 4-unit tape for $28 total, find 1 notebook, then find 2 notebooks.',
        blankPrompts: [
          'Split $28 into 4 equal notebook units.',
          'Find the cost of 1 notebook.',
          'Use 2 units to answer the question.'
        ],
        explanation: '$28 divided by 4 notebooks is $7 per notebook. Two notebooks cost 2 x $7 = $14.',
        validationChecks: [
          'The tape has 4 equal notebook units.',
          'Each notebook is $7.',
          'Two notebooks total $14.'
        ]
      }
    ]
  }),
  18: makeLesson({
    lessonNumber: 18,
    title: 'Lesson 18 concept: decompose units of 10 and 4',
    concept: 'The distributive property can decompose larger facts into friendlier facts such as 5 tens plus more tens.',
    teacherEditionBasis: 'Teacher Edition Lesson 18, pages 234-244.',
    contrast: 'Break apart one factor, multiply each part by the unit, and add the partial products.',
    summary: 'Decomposing units helps solve multiplication facts such as 8 x 10, 7 x 4, 9 x 10, and 10 x 10.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: '8 x 10 = ______. Complete the number bond and equations for 8 tens.',
        solvedAnswer: '8 x 10 = 80.',
        equations: ['5 tens + 3 tens = 8 tens', '(5 x 10) + (3 x 10) = 80', '50 + 30 = 80'],
        blankEquations: ['8 x 10 = ____', '5 tens + ____ = 8 tens', '(5 x 10) + (____ x 10) = 8 x 10', '50 + ____ = ____', '8 x 10 = ____'],
        knownTotal: 80,
        knownGroupCount: 8,
        knownGroupSize: 10,
        quotient: 80,
        unitLabel: 'ones',
        groupLabel: 'tens',
        blankVisualType: 'equation-workspace',
        animationType: 'decompose-array'
      },
      {
        number: 2,
        sourcePrompt: '7 x 4 = ____.',
        solvedAnswer: '7 x 4 = 28.',
        equations: ['5 fours + 2 fours = 7 fours', '(5 x 4) + (2 x 4) = 28', '20 + 8 = 28'],
        blankEquations: ['7 x 4 = ____', '5 fours + ____ = 7 fours', '(5 x 4) + (____ x 4) = 7 x 4', '20 + ____ = ____', '7 x 4 = ____'],
        knownTotal: 28,
        knownGroupCount: 7,
        knownGroupSize: 4,
        quotient: 28,
        unitLabel: 'objects',
        groupLabel: 'fours',
        blankVisualType: 'array-template',
        animationType: 'decompose-array'
      },
      {
        number: 3,
        sourcePrompt: '9 x 10 = ______. Complete the number bond and equations for 9 x 10.',
        solvedAnswer: '9 x 10 = 90.',
        equations: ['5 x 10 = 50', '4 x 10 = 40', '50 + 40 = 90'],
        blankEquations: ['9 x 10 = ____', '5 tens + ____ = 9 tens', '(5 x 10) + (____ x 10) = 9 x 10', '____ + ____ = ____', '9 x 10 = ____'],
        knownTotal: 90,
        knownGroupCount: 9,
        knownGroupSize: 10,
        quotient: 90,
        unitLabel: 'ones',
        groupLabel: 'tens',
        blankVisualType: 'equation-workspace',
        animationType: 'decompose-array'
      },
      {
        number: 4,
        sourcePrompt: '10 x 10 = ____.',
        solvedAnswer: '10 x 10 = 100.',
        equations: ['5 x 10 = 50', '5 x 10 = 50', '50 + 50 = 100'],
        blankEquations: ['10 x 10 = ____', '____ + ____ = 10 tens', '(____ x 10) + (____ x 10) = 10 x 10', '____ + ____ = ____', '10 x 10 = ____'],
        knownTotal: 100,
        knownGroupCount: 10,
        knownGroupSize: 10,
        quotient: 100,
        unitLabel: 'ones',
        groupLabel: 'tens',
        blankVisualType: 'equation-workspace',
        animationType: 'decompose-array'
      },
      {
        number: 5,
        sourcePrompt: 'There are 7 soccer teams with 10 children on each team. Use break apart and distribute.',
        solvedAnswer: 'There are 70 children playing.',
        equations: ['7 x 10 = 70'],
        blankEquations: [],
        knownTotal: 70,
        knownGroupCount: 7,
        knownGroupSize: 10,
        quotient: 70,
        unitLabel: 'children',
        groupLabel: 'teams',
        blankVisualType: 'tape-diagram',
        animationType: 'decompose-array'
      },
      {
        number: 6,
        sourcePrompt: 'What is the total number of sides on 8 triangles?',
        solvedAnswer: 'There are 24 sides total.',
        equations: ['8 x 3 = 24'],
        blankEquations: [],
        knownTotal: 24,
        knownGroupCount: 8,
        knownGroupSize: 3,
        quotient: 24,
        unitLabel: 'sides',
        groupLabel: 'triangles',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 7,
        sourcePrompt: 'There are 12 rows of bottled drinks with 10 bottles in each row. How many bottles are in the vending machine?',
        solvedAnswer: 'There are 120 bottles.',
        equations: ['12 x 10 = 120'],
        blankEquations: [],
        knownTotal: 120,
        knownGroupCount: 12,
        knownGroupSize: 10,
        quotient: 120,
        unitLabel: 'bottles',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'decompose-array'
      }
    ]
  }),
  19: makeLesson({
    lessonNumber: 19,
    title: 'Lesson 19 concept: decompose to divide',
    concept: 'The distributive property also supports division: split the total into friendly parts, divide each part, and add the quotients.',
    teacherEditionBasis: 'Teacher Edition Lesson 19, pages 245-254.',
    contrast: 'Each decomposed part must be divisible by the divisor before adding the partial quotients.',
    summary: 'Division facts can be solved by decomposing the dividend into friendlier parts.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Label the array. Then, fill in the blanks to make true number sentences.',
        solvedAnswer: 'Answer key: a. 12; 10; 2; 2. b. 5; 1; 1; 5. c. 7; 5; 8; 2; 8; 5, 2, 7. d. 8; 20, 5; 12, 3; 20, 12, 5, 3, 8.',
        equations: [
          '36 ÷ 3 = 12; 10 + 2 = 12',
          '25 ÷ 5 = 5; 4 + 1 = 5',
          '28 ÷ 4 = 7; 5 + 2 = 7',
          '32 ÷ 4 = 8; 5 + 3 = 8'
        ],
        quotient: 12,
        unitLabel: 'objects',
        groupLabel: 'groups',
        blankVisual: lesson19Problem1Visual(false),
        solvedVisual: lesson19Problem1Visual(true),
        blankVisualType: 'array-template',
        animationType: 'decompose-array',
        blankWorkspaceLabel: 'Complete each decomposed division sentence from the Teacher Edition array split.',
        blankPrompts: [
          'Label the array with the total and divisor.',
          'Divide each friendly part first.',
          'Add the partial quotients to complete the original division fact.'
        ],
        explanation: 'The solved blanks match the Teacher Edition Answer Key sequence. Each division fact is split into friendly dividends, and the partial quotients are added.',
        validationChecks: [
          'Each decomposed dividend adds back to the original dividend.',
          'Each part is divisible by the same divisor.',
          'The partial quotients add to the Teacher Edition answer.'
        ]
      },
      {
        number: 2,
        sourcePrompt: 'Match the equal expressions.',
        solvedAnswer: 'First bucket matches the fourth ball; second matches the first; third matches the second; fourth matches the third.',
        equations: ['24 ÷ 2 = 12', '36 ÷ 3 = 12', '39 ÷ 3 = 13', '26 ÷ 2 = 13'],
        quotient: 12,
        unitLabel: 'facts',
        groupLabel: 'matches',
        blankVisual: lesson19Problem2Visual(false),
        solvedVisual: lesson19Problem2Visual(true),
        blankVisualType: 'fact-match',
        animationType: 'fact-match',
        blankWorkspaceLabel: 'Match each original division expression to the decomposed expression with the same quotient.',
        blankPrompts: [
          'Compute each decomposed expression by parts.',
          'Match expressions only when the total quotient is the same.',
          'Keep the divisor consistent across each decomposed expression.'
        ],
        explanation: 'Teacher Edition Answer Key match order: first bucket to fourth ball; second bucket to first ball; third bucket to second ball; fourth bucket to third ball.',
        validationChecks: [
          'Each original expression has exactly one equal decomposed expression.',
          'The decomposed parts add to the original dividend.',
          'The solved match preserves the same divisor and quotient.'
        ]
      },
      {
        number: 3,
        sourcePrompt: 'Nell draws the array below to find the answer to 24 ÷ 2. Explain Nell\'s strategy.',
        solvedAnswer: '24 ÷ 2 is broken into two smaller facts: 12 ÷ 2 and 12 ÷ 2; the sum of the two smaller facts is found to answer the larger fact.',
        equations: ['12 ÷ 2 = 6', '12 ÷ 2 = 6', '6 + 6 = 12', '24 ÷ 2 = 12'],
        knownTotal: 24,
        knownGroupCount: 12,
        knownGroupSize: 2,
        quotient: 12,
        unitLabel: 'objects',
        groupLabel: 'twos',
        blankVisualType: 'array-template',
        animationType: 'decompose-array',
        blankVisual: {
          title: 'Problem 3: Nell decomposes 24 ÷ 2',
          sourceNote: 'Blank view shows Nell’s 24-dot array split into 12 and 12 without filling the explanation.',
          sections: [
            observedSourceCrop({
              page: 251,
              crop: { x: 172, y: 632, width: 103, height: 310 },
              alt: 'Nell’s official 24-dot array split into 12 and 12'
            }),
            {
              kind: 'array',
              label: '24 objects arranged as 12 twos',
              rows: 12,
              columns: 2,
              item: 'dot',
              splitAfterRows: 6,
              caption: '(12 ÷ 2) + (12 ÷ 2)'
            },
            {
              kind: 'equations',
              label: 'Explanation blanks',
              lines: ['12 ÷ 2 = ____', '12 ÷ 2 = ____', '____ + ____ = ____']
            }
          ]
        },
        solvedVisual: {
          title: 'Problem 3: Nell decomposes 24 ÷ 2',
          sourceNote: 'Solved view follows the Lesson 19 Teacher Edition answer key: split 24 into 12 and 12, then add the partial quotients.',
          sections: [
            observedSourceCrop({
              page: 251,
              crop: { x: 172, y: 632, width: 103, height: 310 },
              alt: 'Nell’s official 24-dot array split into 12 and 12'
            }),
            {
              kind: 'array',
              label: '24 objects arranged as 12 twos',
              rows: 12,
              columns: 2,
              item: 'dot',
              splitAfterRows: 6,
              caption: '12 ÷ 2 = 6; 12 ÷ 2 = 6'
            },
            {
              kind: 'equations',
              label: 'Answer-key explanation',
              lines: ['12 ÷ 2 = 6', '12 ÷ 2 = 6', '6 + 6 = 12', '24 ÷ 2 = 12']
            }
          ]
        },
        blankWorkspaceLabel: 'Use Nell\'s array split: 12 objects above the line and 12 objects below the line.',
        blankPrompts: [
          'Show 24 as 12 groups of 2.',
          'Split the array into 12 and 12.',
          'Explain why 6 twos plus 6 twos makes 12 twos.'
        ],
        explanation: 'Nell decomposes the dividend 24 into 12 and 12. Since 12 ÷ 2 is 6 and 12 ÷ 2 is 6, the two smaller quotients add to 12.',
        validationChecks: [
          'The array still represents 24 total objects.',
          'The split shows 12 objects and 12 objects.',
          'The explanation names 6 twos plus 6 twos as 12 twos.'
        ]
      }
    ]
  }),
  20: makeLesson({
    lessonNumber: 20,
    title: 'Lesson 20 concept: two-step multiplication and division problems',
    concept: 'Two-step word problems require students to solve one part first, then use that result to answer the second question and check reasonableness.',
    teacherEditionBasis: 'Teacher Edition Lesson 20, pages 255-266.',
    contrast: 'Keep step 1 and step 2 separate, and make sure the final answer answers the question asked.',
    summary: 'Read, draw, write, solve, and check whether a two-step multiplication or division answer makes sense.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Ted buys 3 books and a magazine at the book store. Each book costs $8. A magazine costs $4.',
        solvedAnswer: 'The books cost $24. Ted spends $28 altogether.',
        equations: ['3 x 8 = 24', '24 + 4 = 28'],
        knownTotal: 28,
        quotient: 28,
        unitLabel: 'dollars',
        groupLabel: 'steps',
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankVisual: lesson20Visual(1, false),
        solvedVisual: lesson20Visual(1, true),
        blankWorkspaceLabel: 'Find the book cost first, then add the magazine.',
        blankPrompts: [
          'Use 3 equal $8 book units.',
          'Carry the book total into part b.',
          'Add the $4 magazine only after finding the book total.'
        ],
        explanation: 'The Teacher Edition scaffold separates the two questions: first 3 books cost $24, then $24 plus the $4 magazine makes $28.',
        validationChecks: [
          'Part a answers only the total cost of the books.',
          'Part b uses the part a result and adds $4.',
          'The final sentence answers how much Ted spends altogether.'
        ]
      },
      {
        number: 2,
        sourcePrompt: 'Seven children share 28 silly bands equally.',
        solvedAnswer: 'Each child gets 4 silly bands. Three children get 12 silly bands.',
        equations: ['28 ÷ 7 = 4', '3 x 4 = 12'],
        knownTotal: 28,
        knownGroupCount: 7,
        quotient: 12,
        unitLabel: 'silly bands',
        groupLabel: 'children',
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankVisual: lesson20Visual(2, false),
        solvedVisual: lesson20Visual(2, true),
        blankWorkspaceLabel: 'Find one child’s share first, then use 3 children.',
        blankPrompts: [
          'Partition 28 into 7 equal child units.',
          'Name one child’s share.',
          'Multiply that share by 3 for the second question.'
        ],
        explanation: 'The first answer is 4 silly bands per child. The second answer uses 3 groups of 4, so 3 children get 12 silly bands.',
        validationChecks: [
          'The first quotient is 4, not the final answer to part b.',
          'The second step uses 3 children.',
          'The answer sentence distinguishes one child from 3 children.'
        ]
      },
      {
        number: 3,
        sourcePrompt: 'Eighteen cups are equally packed into 6 boxes. Two boxes break. How many cups are unbroken?',
        solvedAnswer: '12 cups are unbroken.',
        equations: ['18 ÷ 6 = 3', '6 - 2 = 4', '4 x 3 = 12'],
        knownTotal: 18,
        knownGroupCount: 6,
        quotient: 12,
        unitLabel: 'cups',
        groupLabel: 'boxes',
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankVisual: lesson20Visual(3, false),
        solvedVisual: lesson20Visual(3, true),
        blankWorkspaceLabel: 'Find cups per box, then remove the broken boxes.',
        blankPrompts: [
          'Divide 18 cups by 6 boxes.',
          'Subtract the 2 broken boxes from 6 boxes.',
          'Multiply the 4 unbroken boxes by the cups per box.'
        ],
        explanation: 'The Teacher Edition answer uses 3 cups per box and 4 unbroken boxes, so 4 x 3 = 12 cups are unbroken.',
        validationChecks: [
          'The model starts with 6 equal boxes.',
          'Only 4 boxes remain after 2 break.',
          'The final answer counts cups, not boxes.'
        ]
      },
      {
        number: 4,
        sourcePrompt: 'There are 25 blue balloons and 15 red balloons at a party. Five children are given an equal number of each color balloon. How many blue and red balloons does each child get?',
        solvedAnswer: 'Each child gets 5 blue balloons and 3 red balloons.',
        equations: ['25 ÷ 5 = 5', '15 ÷ 5 = 3'],
        knownTotal: 40,
        knownGroupCount: 5,
        quotient: 8,
        unitLabel: 'balloons',
        groupLabel: 'children',
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankVisual: lesson20Visual(4, false),
        solvedVisual: lesson20Visual(4, true),
        blankWorkspaceLabel: 'Divide each color separately.',
        blankPrompts: [
          'Find blue balloons per child.',
          'Find red balloons per child.',
          'Answer with both color shares.'
        ],
        explanation: 'Each child gets 5 blue balloons and 3 red balloons because each color is shared equally by the same 5 children.',
        validationChecks: [
          'Blue and red balloon totals are divided separately.',
          'Both divisions use 5 children.',
          'The final answer names one child’s blue share and red share.'
        ]
      },
      {
        number: 5,
        sourcePrompt: 'Twenty-seven pears are packed in bags of 3. Five bags are sold. How many bags are left?',
        solvedAnswer: '4 bags are left.',
        equations: ['27 ÷ 3 = 9', '9 - 5 = 4'],
        knownTotal: 27,
        knownGroupSize: 3,
        quotient: 4,
        unitLabel: 'bags',
        groupLabel: 'steps',
        blankVisualType: 'bar-units',
        animationType: 'two-step-model',
        blankVisual: lesson20Visual(5, false),
        solvedVisual: lesson20Visual(5, true),
        blankWorkspaceLabel: 'Find the starting number of bags, then subtract the sold bags.',
        blankPrompts: [
          'Use groups of 3 pears to find the number of bags.',
          'Subtract 5 bags sold.',
          'Answer in bags left.'
        ],
        explanation: 'The first step finds 9 bags. The second step subtracts 5 sold bags, leaving 4 bags.',
        validationChecks: [
          'The first result is bags, not pears.',
          'The subtraction uses bags sold.',
          'The final answer is 4 bags left.'
        ]
      }
    ]
  }),
  21: makeLesson({
    lessonNumber: 21,
    title: 'Lesson 21 concept: two-step problems with all four operations',
    concept: 'Students choose operations from the story, solve in two steps, and assess whether the answer is reasonable.',
    teacherEditionBasis: 'Teacher Edition Lesson 21, pages 267-276.',
    contrast: 'The operation can change from one step to the next, so each equation must match its part of the story.',
    summary: 'Two-step problems require operation choice, labeled models, equations, and a reasonableness check.',
    sourceNote: 'Teacher Edition Problem Set and Student Debrief, see Teacher Edition page range.',
    problems: [
      {
        number: 1,
        sourcePrompt: 'Jason earns $6 per week for doing all his chores. On the fifth week, he forgets to take out the trash so he only earns $4. Write and solve an equation to show how much Jason earns in 5 weeks.',
        solvedAnswer: 'Jason earns $28.',
        equations: ['4 x 6 = 24', '24 + 4 = 28'],
        knownTotal: 28,
        quotient: 28,
        unitLabel: 'dollars',
        groupLabel: 'weeks',
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankVisual: lesson21Visual(1, false),
        solvedVisual: lesson21Visual(1, true),
        blankWorkspaceLabel: 'Represent four $6 weeks and one $4 week before writing the total.',
        blankPrompts: [
          'Show 4 equal $6 weeks.',
          'Show the fifth week as $4, not $6.',
          'Add the two parts for Jason’s total earnings.'
        ],
        explanation: 'Jason earns $6 for 4 weeks and $4 in the fifth week. The total is 24 + 4 = 28.',
        validationChecks: [
          'Only 4 weeks use the $6 rate.',
          'The fifth week is represented as $4.',
          'The final answer is total dollars earned in 5 weeks.'
        ]
      },
      {
        number: 2,
        sourcePrompt: 'Miss Lianto orders 4 packs of 7 markers. After passing out 1 marker to each student in her class, she has 6 left. Label the tape diagram to find how many students are in Miss Lianto’s class.',
        solvedAnswer: 'There are 22 students in Miss Lianto\'s class.',
        equations: ['4 x 7 = 28', '28 - 6 = 22'],
        knownTotal: 28,
        knownGroupCount: 4,
        knownGroupSize: 7,
        quotient: 22,
        unitLabel: 'markers',
        groupLabel: 'packs',
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankVisual: lesson21Visual(2, false),
        solvedVisual: lesson21Visual(2, true),
        blankWorkspaceLabel: 'Find the total markers, then subtract the 6 left over to get the number handed out.',
        blankPrompts: [
          'Use 4 packs of 7 markers.',
          'Subtract the 6 markers left.',
          'Because each student got 1 marker, the markers handed out equal the number of students.'
        ],
        explanation: 'Four packs contain 28 markers. If 6 are left, 22 were handed out, so there are 22 students.',
        validationChecks: [
          'The total marker count is 28.',
          'The leftover 6 is subtracted, not added.',
          'The answer is students because each student received 1 marker.'
        ]
      },
      {
        number: 3,
        sourcePrompt: 'Orlando buys a box of 18 fruit snacks. Each box comes with an equal amount of strawberry, cherry, and grape flavored snacks. He eats all of the grape flavored snacks. Draw and label a tape diagram to find how many fruit snacks he has left.',
        solvedAnswer: 'Orlando has 12 fruit snacks left.',
        equations: ['18 ÷ 3 = 6', '18 - 6 = 12'],
        knownTotal: 18,
        knownGroupCount: 3,
        quotient: 12,
        unitLabel: 'fruit snacks',
        groupLabel: 'flavors',
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankVisual: lesson21Visual(3, false),
        solvedVisual: lesson21Visual(3, true),
        blankWorkspaceLabel: 'Split the snacks into 3 equal flavor parts, then remove the grape part.',
        blankPrompts: [
          'Partition 18 into 3 equal flavor units.',
          'Identify the grape unit.',
          'Subtract the grape unit from the whole.'
        ],
        explanation: 'Each flavor has 6 snacks. Orlando eats the grape unit of 6, leaving 12 snacks.',
        validationChecks: [
          'The tape has 3 equal flavor parts.',
          'The removed part is exactly 6 grape snacks.',
          'The final answer is snacks left.'
        ]
      },
      {
        number: 4,
        sourcePrompt: 'Eudora buys 21 meters of ribbon. She cuts the ribbon so that each piece measures 3 meters in length. a. How many pieces of ribbon does she have? b. If Eudora needs a total of 12 pieces of the shorter ribbon, how many more pieces of the shorter ribbon does she need?',
        solvedAnswer: 'She has 7 pieces and needs 5 more pieces.',
        equations: ['21 ÷ 3 = 7', '12 - 7 = 5'],
        knownTotal: 21,
        knownGroupSize: 3,
        quotient: 5,
        unitLabel: 'pieces',
        groupLabel: 'steps',
        blankVisualType: 'bar-units',
        animationType: 'two-step-model',
        blankVisual: lesson21Visual(4, false),
        solvedVisual: lesson21Visual(4, true),
        blankWorkspaceLabel: 'Find how many 3-meter pieces she has, then compare to 12 pieces.',
        blankPrompts: [
          'Divide 21 meters by 3 meters per piece.',
          'Use 12 pieces as the target.',
          'Subtract to find how many more pieces are needed.'
        ],
        explanation: 'Twenty-one meters makes 7 pieces. To reach 12 pieces, Eudora needs 12 - 7 = 5 more pieces.',
        validationChecks: [
          'The first answer is pieces, not meters.',
          'The comparison target is 12 pieces.',
          'The final answer is 5 more pieces.'
        ]
      }
    ]
  })
};
