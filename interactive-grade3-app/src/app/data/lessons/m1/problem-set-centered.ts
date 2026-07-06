import type {
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetFactMatch,
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
    ? 'Solved view uses the authored Module 1 Teacher Edition answer quantities and equations.'
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

function lesson20Visual(problemNumber: 1 | 2 | 3 | 4 | 5, solved: boolean): ProblemVisualSpec {
  const sourceNote = solved
    ? 'Solved view follows the Lesson 20 Teacher Edition sample work: find the first unknown, then use it to answer the second question.'
    : 'Blank view keeps the Teacher Edition RDW structure and marks the first unknown before the final answer.';

  if (problemNumber === 1) {
    return {
      title: 'Problem 1: books plus magazine',
      sourceNote,
      sections: [
        {
          kind: 'tape',
          label: 'Tape model',
          totalLabel: solved ? '$28 total spent' : '? total spent',
          parts: [
            { label: '$8', sublabel: 'book' },
            { label: '$8', sublabel: 'book' },
            { label: '$8', sublabel: 'book' },
            { label: '$4', sublabel: 'magazine' }
          ],
          braces: [
            { label: solved ? 'Find first: $24 book cost' : 'Find first: ? book cost', startPart: 0, partCount: 3 }
          ],
          caption: '3 books at $8 each, then add the $4 magazine.'
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
            { label: solved ? 'Find first: 4 for 1 child' : 'Find first: ? for 1 child', startPart: 0, partCount: 1 },
            { label: solved ? 'Then 3 children: 12' : 'Then 3 children: ?', startPart: 0, partCount: 3 }
          ],
          caption: 'Seven children share 28 silly bands equally.'
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
            { label: solved ? '4 unbroken boxes: 12 cups' : '4 unbroken boxes: ? cups', startPart: 2, partCount: 4 }
          ],
          caption: 'Two boxes break, so the unbroken cups are in the 4 remaining boxes.'
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
            { label: solved ? '1 child gets 5 blue' : '1 child gets ? blue', startPart: 0, partCount: 1 }
          ],
          caption: 'Five children share the blue balloons equally.'
        },
        {
          kind: 'tape',
          label: 'Red balloons',
          totalLabel: '15 red balloons',
          parts: Array.from({ length: 5 }, () => ({ label: solved ? '3' : '?' })),
          braces: [
            { label: solved ? '1 child gets 3 red' : '1 child gets ? red', startPart: 0, partCount: 1 }
          ],
          caption: 'The same five children share the red balloons equally.'
        },
        {
          kind: 'equations',
          label: solved ? 'Teacher Edition solved equations' : 'Equation blanks',
          lines: solved ? ['25 ÷ 5 = 5', '15 ÷ 5 = 3', '5 + 3 = 8'] : ['25 ÷ 5 = ____', '15 ÷ 5 = ____', '____ + ____ = ____']
        },
        {
          kind: 'note',
          label: solved ? 'Answer sentence' : 'Workspace direction',
          text: solved
            ? 'Each child gets 5 blue balloons and 3 red balloons, 8 balloons total.'
            : 'Find one child’s blue share and red share separately. Then combine those two shares.'
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
          { label: solved ? '4 bags left' : '? bags left', startPart: 5, partCount: 4 }
        ],
        caption: 'Each bag has 3 pears. Five bags are sold.'
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

  return {
    kind: 'array',
    label: solved
      ? `${rows} ${seed.groupLabel ?? 'groups'} of ${columns} ${seed.unitLabel ?? 'objects'}`
      : `${rows} ${seed.groupLabel ?? 'groups'} workspace`,
    rows,
    columns,
    item,
    placeholder: solved ? undefined : seed.blankVisualType === 'open-workspace' ? '?' : undefined
  };
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

function makeLesson(seed: LessonSeed): ProblemSetCenteredLesson {
  const teacherEditionImages = teacherEditionPageImagesFromBasis(seed.teacherEditionBasis);
  const problemSetImages = M1_PROBLEM_SET_SOURCE_PAGES[seed.lessonNumber] ?? teacherEditionImages;
  const answerKeyImages = M1_ANSWER_KEY_SOURCE_PAGES[seed.lessonNumber] ?? [];

  return {
    title: seed.title,
    concept: seed.concept,
    teacherEditionBasis: seed.teacherEditionBasis,
    contrast: seed.contrast,
    summary: seed.summary,
    sourceNote: teacherEditionSourceNote(seed),
    sourcePageImages: teacherEditionImages,
    blankSourcePageImages: teacherEditionImages,
    solvedSourcePageImages: [...teacherEditionImages, ...answerKeyImages],
    conceptSections: [
      {
        title: `1. Teacher Edition Lesson ${seed.lessonNumber} concept development`,
        body: seed.concept,
        teacherSource: seed.teacherEditionBasis,
        checkpoints: [
          'Use the exact lesson page range shown in the Teacher Edition source images.',
          'Name the equal groups, array rows, tape units, or story parts before solving.',
          'Keep the equation tied to the Teacher Edition visual model.'
        ]
      },
      {
        title: '2. Teacher Edition Problem Set and debrief focus',
        body: 'The official Teacher Edition Problem Set is the main student work. Blank mode preserves prompts, blanks, and visual workspace; Solved mode completes the same Teacher Edition items with source-backed reasoning.',
        teacherSource: teacherEditionSourceNote(seed),
        checkpoints: [
          'Use the Teacher Edition Problem Set item as the prompt.',
          'Complete the same blanks or diagram in the solved view.',
          'Do not replace the Teacher Edition item with a parallel invented problem.'
        ]
      },
      {
        title: '3. Teacher Edition validation focus',
        body: seed.contrast,
        teacherSource: 'Teacher Edition Student Debrief guidance: review Problem Set solutions, compare models, and explain the lesson target.',
        checkpoints: [
          'Check the operation against the story.',
          'Check that equal groups are actually equal.',
          'Check the final sentence includes the correct unit.'
        ]
      }
    ],
    problems: seed.problems.map((problem) =>
      makeProblem({
        sourcePageImages: problemSetImages,
        blankSourcePageImages: problemSetImages,
        solvedSourcePageImages: [...problemSetImages, ...answerKeyImages],
        ...sourcePromptFromWorkbook(seed.lessonNumber, problem)
      })
    )
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
        solvedAnswer: 'There are 4 rows with 3 cars in each row, for 12 cars total.',
        equations: ['4 x 3 = 12'],
        knownTotal: 12,
        knownGroupCount: 4,
        knownGroupSize: 3,
        quotient: 12,
        unitLabel: 'cars',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'Count horizontal rows, then count the cars in one row. The rows are equal, so multiplication applies.'
      },
      {
        number: 2,
        sourcePrompt: 'Use the object array to answer: What is the number of rows? What is the number of objects in each row?',
        solvedAnswer: 'There are 3 rows with 6 objects in each row, for 18 objects total.',
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
        solvedAnswer: 'There are 3 triangles in each row, so there are 15 triangles total.',
        equations: ['5 x 3 = 15'],
        knownTotal: 15,
        knownGroupCount: 5,
        knownGroupSize: 3,
        quotient: 15,
        unitLabel: 'triangles',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The row count is 5. Count the triangles in one row, then multiply to find the total.'
      },
      {
        number: 5,
        sourcePrompt: 'Redraw 2 groups of 5 dots as an array with 2 rows of 5. Compare the drawing to the array.',
        solvedAnswer: 'Both show 10 dots in 2 groups of 5. The array is organized in straight rows; the original groups are scattered.',
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
        solvedAnswer: 'There are 4 candies in each box, so there are 24 candies altogether.',
        equations: ['6 x 4 = 24'],
        knownGroupCount: 6,
        knownGroupSize: 4,
        knownTotal: 24,
        quotient: 24,
        unitLabel: 'candies',
        groupLabel: 'boxes',
        blankVisualType: 'array-template',
        animationType: 'array-model',
        explanation: 'The first factor is 6 boxes. The official Teacher Edition picture shows 4 candies in each box.'
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
        solvedAnswer: 'A correct array shows 4 rows of 3 or 3 rows of 4, totaling 12.',
        equations: ['4 x 3 = 12', '12 divided by 4 = 3'],
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
        solvedAnswer: 'They both show 12 objects. The rows and objects in each row switch, so the factors switch order.',
        equations: ['6 x 2 = 2 x 6'],
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
        quotient: 12,
        unitLabel: 'objects',
        groupLabel: 'facts',
        blankVisualType: 'fact-match',
        animationType: 'fact-match'
      },
      {
        number: 5,
        sourcePrompt: 'Write and solve multiplication sentences where the second factor represents the size of the row.',
        solvedAnswer: 'Each sentence should use row count as the first factor and row size as the second factor.',
        equations: ['rows x row size = total'],
        knownGroupCount: 2,
        knownGroupSize: 6,
        quotient: 12,
        unitLabel: 'objects',
        groupLabel: 'rows',
        blankVisualType: 'array-template',
        animationType: 'array-model'
      },
      {
        number: 6,
        sourcePrompt: 'Ms. Nenadal writes 2 x 7 = 7 x 2. Agree or disagree? Draw arrays to explain.',
        solvedAnswer: 'Agree. Both expressions equal 14 and can be shown by the same 2-by-7 array read two ways.',
        equations: ['2 x 7 = 14', '7 x 2 = 14'],
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
        solvedAnswer: 'The array shows 15 objects.',
        equations: ['5 x 3 = 15'],
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
        solvedAnswer: 'The array shows 15 objects.',
        equations: ['3 x 5 = 15'],
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
        solvedAnswer: '3 bottles cost $6. 6 bottles cost $12.',
        equations: ['3 x 2 = 6', '6 x 2 = 12'],
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
        solvedAnswer: '7 x 2 = 14 because 5 x 2 = 10 and 2 x 2 = 4, and 10 + 4 = 14.',
        equations: ['5 x 2 = 10', '2 x 2 = 4', '10 + 4 = 14', '7 x 2 = 14'],
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
        solvedAnswer: '9 x 2 = 18 because 10 x 2 = 20 and 1 x 2 = 2, and 20 - 2 = 18.',
        equations: ['10 x 2 = 20', '1 x 2 = 2', '20 - 2 = 18', '9 x 2 = 18'],
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
        equations: ['12 divided by 2 = 6', '6 x 2 = 12'],
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
        solvedAnswer: 'The multiplication products are 3, 6, 9, 12, 15, 18, 21, 24, 27, and 30; the matching division quotients are 1 through 10.',
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
        solvedAnswer: 'Mr. Lawton packs 5 bags of tomatoes.',
        equations: ['15 divided by 3 = 5', '5 x 3 = 15'],
        knownTotal: 15,
        knownGroupSize: 3,
        quotient: 5,
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
        solvedAnswer: '1 x 4 = 4, 2 x 4 = 8, 3 x 4 = 12, 4 x 4 = 16, 5 x 4 = 20, 6 x 4 = 24, 7 x 4 = 28, 8 x 4 = 32, 9 x 4 = 36, 10 x 4 = 40.',
        equations: ['1 x 4 = 4', '5 x 4 = 20', '10 x 4 = 40'],
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
        solvedAnswer: 'a. 2 x 4 = 8 and 4 x 2 = 8. b and c use the tape labels to complete related commutative equations; c has product 28.',
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
        solvedAnswer: 'Both tape diagrams show a total of 24.',
        equations: ['4 x 6 = 24', '6 x 4 = 24'],
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
        solvedAnswer: '6 x 4 = 24, 7 x 4 = 28, 8 x 4 = 32, and 9 x 4 = 36.',
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
        solvedAnswer: '(5 x 4) + (1 x 4) = 6 x 4 = 24; (5 x 4) + (2 x 4) = 7 x 4 = 28; (5 x 4) + (3 x 4) = 8 x 4 = 32; (5 x 4) + (4 x 4) = 9 x 4 = 36.',
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
        solvedAnswer: 'Nolan splits 10 groups of 4 into 5 groups of 4 and 5 groups of 4. Since 5 x 4 = 20, double it is 40.',
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
        solvedAnswer: 'Rows 1 through 10 give related facts from 1 x 4 = 4 through 10 x 4 = 40, with matching division facts.',
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
        sourcePrompt: 'The baker packs 36 bran muffins in boxes of 4. Draw a tape diagram to find the number of boxes.',
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
        solvedAnswer: 'Each notebook costs $7, so 2 notebooks cost $14.',
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
        sourcePrompt: '7 x 4 = ______. Complete the number bond and equations for 7 fours.',
        solvedAnswer: '7 x 4 = 28.',
        equations: ['5 fours + 2 fours = 7 fours', '(5 x 4) + (2 x 4) = 28', '20 + 8 = 28'],
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
        sourcePrompt: '10 x 10 = ______. Complete the number bond and equations for 10 x 10.',
        solvedAnswer: '10 x 10 = 100.',
        equations: ['5 x 10 = 50', '5 x 10 = 50', '50 + 50 = 100'],
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
        sourcePrompt: 'Label arrays and complete decomposed division sentences for 36 ÷ 3, 25 ÷ 5, 28 ÷ 4, and 32 ÷ 4.',
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
        sourcePrompt: 'Match equal division expressions.',
        solvedAnswer: '24 ÷ 2 matches (20 ÷ 2) + (4 ÷ 2); 36 ÷ 3 matches (30 ÷ 3) + (6 ÷ 3); 39 ÷ 3 matches (30 ÷ 3) + (9 ÷ 3); 26 ÷ 2 matches (20 ÷ 2) + (6 ÷ 2).',
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
        sourcePrompt: 'Nell draws an array to find 24 ÷ 2. Explain Nell\'s strategy.',
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
        sourcePrompt: 'Ted buys 3 books at $8 each and a $4 magazine. Find the book cost and total cost.',
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
        sourcePrompt: 'Seven children share 28 silly bands equally. Find each child\'s share and the amount for 3 children.',
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
        solvedAnswer: 'Each box has 3 cups. Four boxes are unbroken, so 12 cups are unbroken.',
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
        sourcePrompt: 'There are 25 blue balloons and 15 red balloons. Five children get equal numbers of each color. How many blue and red balloons does each child get?',
        solvedAnswer: 'Each child gets 5 blue balloons and 3 red balloons, 8 balloons total.',
        equations: ['25 ÷ 5 = 5', '15 ÷ 5 = 3', '5 + 3 = 8'],
        knownTotal: 40,
        knownGroupCount: 5,
        quotient: 8,
        unitLabel: 'balloons',
        groupLabel: 'children',
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankVisual: lesson20Visual(4, false),
        solvedVisual: lesson20Visual(4, true),
        blankWorkspaceLabel: 'Divide each color separately, then combine one child’s shares.',
        blankPrompts: [
          'Find blue balloons per child.',
          'Find red balloons per child.',
          'Add one child’s blue and red shares.'
        ],
        explanation: 'Each child gets 5 blue and 3 red balloons, so each child gets 8 balloons total.',
        validationChecks: [
          'Blue and red balloon totals are divided separately.',
          'Both divisions use 5 children.',
          'The final answer combines one child’s two shares.'
        ]
      },
      {
        number: 5,
        sourcePrompt: 'Twenty-seven pears are packed in bags of 3. Five bags are sold. How many bags are left?',
        solvedAnswer: 'There are 9 bags at first. After 5 bags are sold, 4 bags are left.',
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
        sourcePrompt: 'Jason earns $6 per week for chores. On the fifth week he earns $4. Write and solve an equation for 5 weeks.',
        solvedAnswer: 'Jason earns $28.',
        equations: ['4 x 6 = 24', '24 + 4 = 28'],
        knownTotal: 28,
        quotient: 28,
        unitLabel: 'dollars',
        groupLabel: 'weeks',
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankVisual: twoStepVisual('Problem 1: Jason earns for 5 weeks', [
          { step: '1', model: '4 full weeks at $6', blank: '4 x 6 = ____', solved: '4 x 6 = 24' },
          { step: '2', model: 'Add the $4 fifth week', blank: '____ + 4 = ____', solved: '24 + 4 = 28' }
        ], ['4 x 6 = 24', '24 + 4 = 28'], 'Jason earns $28.', false),
        solvedVisual: twoStepVisual('Problem 1: Jason earns for 5 weeks', [
          { step: '1', model: '4 full weeks at $6', blank: '4 x 6 = ____', solved: '4 x 6 = 24' },
          { step: '2', model: 'Add the $4 fifth week', blank: '____ + 4 = ____', solved: '24 + 4 = 28' }
        ], ['4 x 6 = 24', '24 + 4 = 28'], 'Jason earns $28.', true),
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
        sourcePrompt: 'Miss Lianto orders 4 packs of 7 markers. After giving out 1 marker to each student, she has 6 left. How many students are in her class?',
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
        blankVisual: twoStepVisual('Problem 2: markers and students', [
          { step: '1', model: '4 packs of 7 markers', blank: '4 x 7 = ____', solved: '4 x 7 = 28' },
          { step: '2', model: '6 markers left after passing out one each', blank: '____ - 6 = ____', solved: '28 - 6 = 22' }
        ], ['4 x 7 = 28', '28 - 6 = 22'], 'There are 22 students in Miss Lianto’s class.', false),
        solvedVisual: twoStepVisual('Problem 2: markers and students', [
          { step: '1', model: '4 packs of 7 markers', blank: '4 x 7 = ____', solved: '4 x 7 = 28' },
          { step: '2', model: '6 markers left after passing out one each', blank: '____ - 6 = ____', solved: '28 - 6 = 22' }
        ], ['4 x 7 = 28', '28 - 6 = 22'], 'There are 22 students in Miss Lianto’s class.', true),
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
        sourcePrompt: 'Orlando buys 18 fruit snacks equally split among strawberry, cherry, and grape. He eats all grape snacks. How many are left?',
        solvedAnswer: 'Each flavor has 6 snacks. After eating the 6 grape snacks, Orlando has 12 snacks left.',
        equations: ['18 ÷ 3 = 6', '18 - 6 = 12'],
        knownTotal: 18,
        knownGroupCount: 3,
        quotient: 12,
        unitLabel: 'fruit snacks',
        groupLabel: 'flavors',
        blankVisualType: 'tape-diagram',
        animationType: 'two-step-model',
        blankVisual: twoStepVisual('Problem 3: fruit snacks left', [
          { step: '1', model: '18 snacks split equally among 3 flavors', blank: '18 ÷ 3 = ____', solved: '18 ÷ 3 = 6' },
          { step: '2', model: 'Remove the grape-flavored part', blank: '18 - ____ = ____', solved: '18 - 6 = 12' }
        ], ['18 ÷ 3 = 6', '18 - 6 = 12'], 'Each flavor has 6 snacks. After eating the 6 grape snacks, Orlando has 12 snacks left.', false),
        solvedVisual: twoStepVisual('Problem 3: fruit snacks left', [
          { step: '1', model: '18 snacks split equally among 3 flavors', blank: '18 ÷ 3 = ____', solved: '18 ÷ 3 = 6' },
          { step: '2', model: 'Remove the grape-flavored part', blank: '18 - ____ = ____', solved: '18 - 6 = 12' }
        ], ['18 ÷ 3 = 6', '18 - 6 = 12'], 'Each flavor has 6 snacks. After eating the 6 grape snacks, Orlando has 12 snacks left.', true),
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
        sourcePrompt: 'Eudora buys 21 meters of ribbon and cuts pieces 3 meters long. How many pieces does she have, and how many more to reach 12 pieces?',
        solvedAnswer: 'She has 7 pieces and needs 5 more pieces.',
        equations: ['21 ÷ 3 = 7', '12 - 7 = 5'],
        knownTotal: 21,
        knownGroupSize: 3,
        quotient: 5,
        unitLabel: 'pieces',
        groupLabel: 'steps',
        blankVisualType: 'bar-units',
        animationType: 'two-step-model',
        blankVisual: twoStepVisual('Problem 4: ribbon pieces needed', [
          { step: '1', model: '21 meters cut into 3-meter pieces', blank: '21 ÷ 3 = ____', solved: '21 ÷ 3 = 7' },
          { step: '2', model: 'Compare 7 pieces to 12 pieces', blank: '12 - ____ = ____', solved: '12 - 7 = 5' }
        ], ['21 ÷ 3 = 7', '12 - 7 = 5'], 'She has 7 pieces and needs 5 more pieces.', false),
        solvedVisual: twoStepVisual('Problem 4: ribbon pieces needed', [
          { step: '1', model: '21 meters cut into 3-meter pieces', blank: '21 ÷ 3 = ____', solved: '21 ÷ 3 = 7' },
          { step: '2', model: 'Compare 7 pieces to 12 pieces', blank: '12 - ____ = ____', solved: '12 - 7 = 5' }
        ], ['21 ÷ 3 = 7', '12 - 7 = 5'], 'She has 7 pieces and needs 5 more pieces.', true),
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
