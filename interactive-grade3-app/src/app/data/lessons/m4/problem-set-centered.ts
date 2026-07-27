import type {
  ProblemSetAreaModel,
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetPatternBlockCover,
  ProblemSetRoomArea,
  ProblemVisualFloorPlanSection,
  ProblemVisualSection,
  ProblemVisualSpec
} from '../lesson-runtime.types';
import { evaluate } from 'mathjs/number';
import {
  M4_TEACHER_OBJECTIVES,
  m4FunctionalConceptSections,
  m4TeacherSource
} from './functional-fidelity';

type ProblemSeed = {
  number: number;
  sourcePrompt: string;
  sourcePageImages?: string[];
  blankSourcePageImages?: string[];
  solvedSourcePageImages?: string[];
  solvedAnswer: string;
  equations?: string[];
  blankEquations?: string[];
  knownTotal?: number;
  knownGroupSize?: number;
  knownGroupCount?: number;
  quotient?: number;
  blankVisualType?: ProblemSetBlankVisualType;
  animationType?: ProblemSetAnimationType;
  areaModels?: ProblemSetAreaModel[];
  patternBlockCover?: ProblemSetPatternBlockCover;
  roomAreas?: ProblemSetRoomArea[];
  unitLabel?: string;
  groupLabel?: string;
  quotientMeaning?: string;
  explanation?: string;
};

type LessonSeed = {
  title: string;
  concept: string;
  teacherEditionBasis: string;
  contrast: string;
  summary: string;
  sourceNote: string;
  problems: ProblemSeed[];
};

const te = 'EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf';
const sw = 'EurekaMath-Sources/Module_4/g3_m4_student_wkbook_v1_3_0.pdf';
const m4TeacherPageBase = '/source-pages/m4-teacher';

function sourceFactorPair(equations?: string[]): { rows: number; columns: number } | undefined {
  for (const equation of equations ?? []) {
    const match = equation.match(/\b(\d+)\s*(?:x|×)\s*(\d+)\s*=\s*(\d+)\b/i);
    if (!match) {
      continue;
    }
    const rows = Number(match[1]);
    const columns = Number(match[2]);
    if (rows > 0 && columns > 0 && rows * columns === Number(match[3])) {
      return { rows, columns };
    }
  }
  return undefined;
}

function sourceAreaModels(equations?: string[], unitLabel = 'square units'): ProblemSetAreaModel[] {
  return (equations ?? []).flatMap((equation, index) => {
    const match = equation.match(/\b(\d+)\s*(?:x|×)\s*(\d+)\s*=\s*(\d+)\b/i);
    if (!match) {
      return [];
    }
    const rows = Number(match[1]);
    const columns = Number(match[2]);
    const total = Number(match[3]);
    if (rows <= 0 || columns <= 0 || rows * columns !== total) {
      return [];
    }
    return [{ label: `Rectangle ${index + 1}`, rows, columns, total, unitLabel }];
  });
}

function maskNumbers(text: string): string {
  return text.replace(/\d+(?:,\d{3})*(?:\.\d+)?/g, '____');
}

function blankEquationTemplate(equation: string): string | undefined {
  const trimmed = equation.trim();
  if (!trimmed) {
    return undefined;
  }

  if (!trimmed.includes('=')) {
    if (/divided by|[x×]/i.test(trimmed)) {
      return `${maskNumbers(trimmed)} = ____`;
    }
    return undefined;
  }

  const [leftRaw, ...rightParts] = trimmed.split('=');
  const left = leftRaw.trim();
  const right = rightParts.join('=').trim();
  const leftTemplate = maskNumbers(left);
  const rightTemplate = maskNumbers(right);

  return `${leftTemplate} = ${rightTemplate === right ? '____' : rightTemplate}`;
}

function blankEquationTemplates(seed: ProblemSeed): string[] | undefined {
  const templates = (seed.blankEquations ?? seed.equations ?? [])
    .map(blankEquationTemplate)
    .filter((template): template is string => Boolean(template));

  return templates.length ? templates : undefined;
}

function pageRange(start: number, end = start): number[] {
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
}

function pageImages(pages: number[]): string[] {
  return pages.map((page) => `${m4TeacherPageBase}/page-${String(page).padStart(3, '0')}.png`);
}

type M4ProblemSourceCrop = readonly [
  pdfPage: number,
  x: number,
  y: number,
  width: number,
  height: number
];

// Reviewed breadth-first against all 34 Module 4 Teacher Edition Problem Set
// pages rendered at 1,275 × 1,650. The bounds preserve each complete printed
// task, its source figure/table, and its original response space.
const M4_PROBLEM_SOURCE_CROPS: Record<number, Record<number, readonly M4ProblemSourceCrop[]>> = {
  1: {
    1: [[16, 65, 236, 1145, 427]], 2: [[16, 65, 663, 1145, 395]], 3: [[16, 65, 1058, 1145, 412]],
    4: [[17, 65, 181, 1145, 342]], 5: [[17, 65, 523, 1145, 448]], 6: [[17, 65, 971, 1145, 499]]
  },
  2: {
    1: [[27, 65, 236, 1145, 614]], 2: [[27, 65, 850, 1145, 620]], 3: [[28, 65, 181, 1145, 342]],
    4: [[28, 65, 523, 1145, 607]], 5: [[28, 65, 1130, 1145, 340]]
  },
  3: {
    1: [[37, 65, 236, 1145, 619]], 2: [[37, 65, 855, 1145, 615]],
    3: [[38, 65, 181, 1145, 722]], 4: [[38, 65, 903, 1145, 567]]
  },
  4: {
    1: [[50, 65, 236, 1145, 311]], 2: [[50, 65, 547, 1145, 590]], 3: [[50, 65, 1137, 1145, 333]],
    4: [[51, 65, 181, 1145, 476]], 5: [[51, 65, 657, 1145, 395]], 6: [[51, 65, 1052, 1145, 418]]
  },
  5: {
    1: [[63, 65, 236, 1145, 1234]], 2: [[64, 65, 181, 1145, 395]],
    3: [[64, 65, 576, 1145, 370]], 4: [[64, 65, 946, 1145, 524]]
  },
  6: {
    1: [[73, 65, 236, 1145, 1234]], 2: [[74, 65, 181, 1145, 359]],
    3: [[74, 65, 540, 1145, 501]], 4: [[74, 65, 1041, 1145, 429]]
  },
  7: {
    1: [[86, 65, 236, 1145, 1234]], 2: [[87, 65, 181, 1145, 406]],
    3: [[87, 65, 587, 1145, 309]], 4: [[87, 65, 896, 1145, 574]]
  },
  8: {
    1: [[99, 65, 236, 1145, 408]], 2: [[99, 65, 644, 1145, 481]], 3: [[99, 65, 1125, 1145, 345]],
    4: [[100, 65, 181, 1145, 374]], 5: [[100, 65, 555, 1145, 395]], 6: [[100, 65, 950, 1145, 520]]
  },
  9: {
    1: [[121, 65, 236, 1145, 624]], 2: [[121, 65, 860, 1145, 610]],
    3: [[122, 65, 181, 1145, 984]], 4: [[122, 65, 1165, 1145, 305]]
  },
  10: {
    1: [[132, 65, 236, 1145, 1234]], 2: [[133, 65, 181, 1145, 473]], 3: [[133, 65, 654, 1145, 816]]
  },
  11: {
    1: [[143, 65, 223, 1145, 905]], 2: [[143, 65, 1128, 1145, 342]],
    3: [[144, 65, 181, 1145, 270]], 4: [[144, 65, 451, 1145, 1019]]
  },
  12: {
    1: [[156, 65, 236, 1145, 328]], 2: [[156, 65, 564, 1145, 906]],
    3: [[157, 65, 181, 1145, 342]], 4: [[157, 65, 523, 1145, 540]], 5: [[157, 65, 1063, 1145, 407]]
  },
  13: {
    1: [[167, 65, 236, 1145, 1234]], 2: [[168, 65, 181, 1145, 632]], 3: [[168, 65, 813, 1145, 657]]
  },
  14: {
    1: [[180, 65, 236, 1145, 802]], 2: [[180, 65, 1038, 1145, 432]],
    3: [[181, 65, 181, 1145, 490]], 4: [[181, 65, 671, 1145, 799]]
  },
  15: {
    1: [[191, 65, 236, 1145, 102], [193, 65, 181, 1145, 1289]],
    2: [[191, 65, 338, 1145, 1132], [193, 65, 181, 1145, 1289]],
    3: [[192, 65, 181, 1145, 397], [193, 65, 181, 1145, 1289]],
    4: [[192, 65, 578, 1145, 404], [193, 65, 181, 1145, 1289]],
    5: [[192, 65, 982, 1145, 488], [193, 65, 181, 1145, 1289]]
  },
  16: {
    1: [[201, 65, 181, 1145, 1289], [202, 65, 181, 1145, 1289]]
  }
};

const M4_ANSWER_KEY_PDF_PAGES: Record<number, readonly number[]> = {
  1: [215], 2: [216, 217], 3: [218], 4: [219],
  5: [220], 6: [221], 7: [222], 8: [223, 224],
  9: [225], 10: [226], 11: [227], 12: [228, 229],
  13: [230], 14: [231], 15: [232, 233], 16: [234]
};

const M4_LESSON15_ROOM_AREAS: ProblemSetRoomArea[] = [
  { label: 'Bedroom 1', area: 60 },
  { label: 'Bedroom 2', area: 56 },
  { label: 'Kitchen', area: 42 },
  { label: 'Hallway', area: 24 },
  { label: 'Bathroom', area: 25 },
  { label: 'Dining Room', area: 28 },
  { label: 'Living Room', area: 88 }
];

const M4_LESSON15_ROOM_STRATEGIES: Record<string, string> = {
  'Bedroom 1': '12 cm × 5 cm = 60',
  'Bedroom 2': '7 cm × 8 cm = 56',
  'Kitchen': '7 cm × 6 cm = 42',
  'Hallway': '3 cm × 8 cm = 24',
  'Bathroom': '5 cm × 5 cm = 25',
  'Dining Room': '7 cm × 4 cm = 28',
  'Living Room': '(10 cm × 6 cm) + (7 cm × 4 cm) = 88'
};

const M4_LESSON15_FLOOR_PLAN: ProblemVisualFloorPlanSection = {
  kind: 'floor-plan',
  label: 'Teacher Edition floor-plan area model',
  widthUnits: 19,
  heightUnits: 17,
  rooms: [
    { label: 'Living Room', x: 0, y: 0, width: 8, height: 11, area: 88, lengthLabel: '11 cm', widthLabel: '8 cm', tone: 'answer' },
    { label: 'Bedroom 2', x: 8, y: 0, width: 4, height: 14, area: 56, lengthLabel: '14 cm', widthLabel: '4 cm' },
    { label: 'Dining Room', x: 12, y: 0, width: 2, height: 14, area: 28, lengthLabel: '14 cm', widthLabel: '2 cm' },
    { label: 'Bedroom 1', x: 14, y: 0, width: 5, height: 12, area: 60, lengthLabel: '12 cm', widthLabel: '5 cm' },
    { label: 'Hallway', x: 0, y: 11, width: 8, height: 3, area: 24, lengthLabel: '8 cm', widthLabel: '3 cm' },
    { label: 'Bathroom', x: 14, y: 12, width: 5, height: 5, area: 25, lengthLabel: '5 cm', widthLabel: '5 cm' },
    { label: 'Kitchen', x: 0, y: 14, width: 14, height: 3, area: 42, lengthLabel: '14 cm', widthLabel: '3 cm' }
  ],
  caption: 'The whole house is 19 cm by 17 cm. Room areas are found by multiplying each rectangular room side length, then adding all room areas.'
};

function teacherEditionLessonPages(source: string): string[] {
  const match = source.match(/pages?\s+(\d+)(?:-(\d+))?/i);
  if (!match) {
    return [];
  }
  const start = Number(match[1]);
  const end = Number(match[2] ?? match[1]);
  return pageImages(pageRange(start, end));
}

function teacherEditionAnswerKeyPages(source: string): string[] {
  const match = source.match(/Answer Key,\s*printed pages?\s+(\d+)(?:-(\d+))?/i);
  if (!match) {
    return [];
  }
  const start = Number(match[1]);
  const end = Number(match[2] ?? match[1]);
  return pageImages(pageRange(start, end));
}

function makeProblem(seed: ProblemSeed): ProblemSetCenteredProblem {
  const factorPair = sourceFactorPair(seed.equations);
  const areaModels = seed.areaModels ?? [];
  const hasMultipleAreaModels = areaModels.length > 1;
  const blankVisualType = seed.blankVisualType
    ?? (seed.patternBlockCover
      ? 'pattern-block-cover-template'
      : seed.roomAreas
      ? 'floor-plan-template'
      : hasMultipleAreaModels
      ? 'area-models-template'
      : seed.knownGroupCount && seed.knownGroupSize
      ? 'array-template'
      : 'open-workspace');
  const animationType = seed.animationType
    ?? (seed.patternBlockCover
      ? 'pattern-block-cover'
      : seed.roomAreas
      ? 'floor-plan-model'
      : hasMultipleAreaModels
      ? 'area-models'
      : seed.knownGroupCount && seed.knownGroupSize
      ? 'array-model'
      : 'two-step-model');
  const knownGroupCount = seed.knownGroupCount;
  const knownGroupSize = seed.knownGroupSize;

  return {
    number: seed.number,
    sourcePrompt: seed.sourcePrompt,
    sourcePromptInVisual: true,
    sourcePageImages: seed.sourcePageImages,
    blankSourcePageImages: seed.blankSourcePageImages,
    solvedSourcePageImages: seed.solvedSourcePageImages,
    blankPrompts: [],
    blankEquations: blankEquationTemplates(seed),
    blankWorkspaceLabel: seed.patternBlockCover
      ? 'Use the official Problem Set target outlines and leave the block counts blank for student work.'
      : seed.roomAreas
      ? 'Use the official floor-plan side lengths; leave room areas blank until each rectangle is computed.'
      : hasMultipleAreaModels
      ? 'Each rectangle below represents one official area model from the problem.'
      : seed.knownGroupCount && seed.knownGroupSize
      ? 'Use the source rectangle workspace; students measure or label the side lengths before multiplying.'
      : sourceSpecificBlankWorkspaceLabel({ number: seed.number, sourcePrompt: seed.sourcePrompt } as ProblemSetCenteredProblem),
    blankVisualType,
    areaModels,
    patternBlockCover: seed.patternBlockCover,
    roomAreas: seed.roomAreas,
    solvedAnswer: seed.solvedAnswer,
    equations: seed.equations ?? [seed.solvedAnswer],
    knownTotal: seed.knownTotal,
    knownGroupSize,
    knownGroupCount,
    quotient: seed.quotient ?? seed.knownTotal ?? 1,
    quotientMeaning: seed.quotientMeaning ?? 'The answer names the area, side length, or comparison requested by the official Problem Set item.',
    animationType,
    unitLabel: seed.unitLabel ?? 'square units',
    groupLabel: seed.groupLabel ?? 'rows',
    explanation: seed.explanation ?? (factorPair
      ? `The source equation ${factorPair.rows} x ${factorPair.columns} = ${factorPair.rows * factorPair.columns} matches the rectangle's rows and columns.`
      : 'The solved value follows the official Teacher Edition answer key and answers the exact workbook prompt.'),
    validationChecks: [
      'The problem prompt matches the official Student Workbook Problem Set item.',
      'The solved value matches the Teacher Edition answer key.',
      'The unit is square units for area or linear units for side length.'
    ]
  };
}

function createM4ProblemVisual(problem: ProblemSetCenteredProblem, solved: boolean, lessonNumber: number): ProblemVisualSpec {
  const reviewedPrimary =
    m4ReviewedLessonsOneThroughFive(problem, solved, lessonNumber) ??
    m4ReviewedLessonsSixThroughTen(problem, solved, lessonNumber) ??
    m4ReviewedLessonsElevenThroughFifteen(problem, solved, lessonNumber);
  if (reviewedPrimary) {
    return {
      title: `Problem ${problem.number}: ${m4VisualTitle(problem, solved)}`,
      sourceNote: solved
        ? 'Solved view preserves the Teacher Edition problem structure and answer evidence with authored mathematical models.'
        : 'Blank view preserves the official figure, givens, grouping, labels, and open response space without answer leakage.',
      sections: reviewedPrimary
    };
  }

  const sections: ProblemVisualSpec['sections'] = [];
  const sourceNote = solved
    ? 'Solved view uses the Module 4 Teacher Edition answer key with authored area visuals and unit checks.'
    : 'Blank view keeps the authored area workspace open with the required figures, dimensions, and response blanks.';

  const officialCompositeFigure = m4OfficialCompositeSourceSection(lessonNumber, problem, solved);
  if (officialCompositeFigure) {
    sections.push(officialCompositeFigure);
  } else if (problem.patternBlockCover) {
    sections.push(...m4PatternBlockSections(problem, solved));
  } else if (problem.roomAreas?.length) {
    sections.push(...m4RoomAreaSections(problem, solved));
  } else if (problem.areaModels?.length) {
    sections.push(...m4AreaModelSections(problem, solved));
  } else if (solved && sourceAreaModels(problem.equations, problem.unitLabel).length) {
    sections.push(...m4SolvedEquationAreaSections(problem));
  } else if (solved && (problem.blankVisualType === 'array-template' || problem.animationType === 'array-model')) {
    sections.push(...m4ArraySections(problem, solved));
  } else {
    sections.push(m4OpenWorkspaceSection(problem, solved));
  }

  if (sections.length <= 1) {
    sections.push({
      kind: 'equations',
      label: solved ? 'Solved area work' : 'Student work blanks',
      lines: solved
        ? problem.equations
        : problem.blankEquations?.length
          ? problem.blankEquations
          : blankEquationTemplatesFromLines(problem.equations)
    });
  }

  sections.push({
    kind: 'note',
    label: solved ? 'Teacher Edition answer' : 'Source workspace direction',
    text: solved
      ? problem.solvedAnswer
      : problem.blankWorkspaceLabel ?? sourceSpecificBlankWorkspaceLabel(problem)
  });

  return {
    title: `Problem ${problem.number}: ${m4VisualTitle(problem, solved)}`,
    sourceNote,
    sections
  };
}

function m4OpenResponse(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lines: string[] = [],
  printedLineCount = 8
): ProblemVisualSection {
  return {
    kind: 'source-response-workspace',
    label: solved ? 'Teacher Edition answer work' : 'Official open response',
    parts: [{
      prompt: problem.sourcePrompt,
      lines: solved ? lines : [],
      printedLineCount,
      openWorkspace: !solved
    }]
  };
}

function m4Array(rows: number, columns: number, caption: string, solved = false): ProblemVisualSection {
  return {
    kind: 'array',
    rows,
    columns,
    item: 'square',
    caption
  };
}

function m4RectangleOutline(label: string, width: number, height: number, valueLabel: string): ProblemVisualSection {
  return {
    kind: 'geometry-diagram',
    label,
    diagram: 'rectangle',
    shapes: [{
      label,
      shape: 'rectangle',
      x: 12,
      y: 15,
      width,
      height,
      valueLabel,
      tone: 'unknown'
    }]
  };
}

function m4ModelCards(
  models: Array<{ label: string; rows: number; columns: number; answer: string }>,
  solved: boolean
): ProblemVisualSection {
  return {
    kind: 'card-grid',
    label: solved ? 'Completed Teacher Edition models' : 'Official source models',
    cards: models.map((model) => ({
      label: model.label,
      sections: [
        m4Array(model.rows, model.columns, solved ? model.answer : 'Count the square units.'),
        {
          kind: 'equations',
          lines: [solved ? model.answer : `${model.label}: ____ square units`]
        }
      ]
    }))
  };
}

function m4ReviewedLessonsOneThroughFive(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec['sections'] | undefined {
  const number = Number(problem.number);

  if (lessonNumber === 1) {
    if (number <= 3) return m4PatternBlockSections(problem, solved);
    if (number === 4) {
      return [m4OpenResponse(
        problem,
        solved,
        ['As pattern blocks get larger, fewer blocks are needed to cover the same shape.'],
        6
      )];
    }
    if (number === 5) return m4PatternBlockSections(problem, solved);
    return [
      m4RectangleOutline('Problem 5 rectangle reference', 70, 42, solved ? 'Trapezoids cannot cover it without gaps or overlaps.' : 'Try trapezoid pattern blocks.'),
      m4OpenResponse(
        problem,
        solved,
        ['No. Trapezoid blocks cannot cover this rectangle without gaps or overlaps, so they do not measure its area.'],
        6
      )
    ];
  }

  if (lessonNumber === 2) {
    if (number === 1 || number === 2) {
      if (!solved) {
        return [{
          kind: 'data-table',
          label: `Paper Strip ${number}: official drawing-and-area chart`,
          columns: ['', 'Drawing', 'Area'],
          rows: ['A', 'B', 'C'].map((letter) => [`Rectangle ${letter}`, '', ''])
        }];
      }
      return [m4ModelCards([
        { label: 'Rectangle A', rows: 2, columns: 6, answer: `2 × 6 = 12 square ${number === 1 ? 'inches' : 'centimeters'}` },
        { label: 'Rectangle B', rows: 3, columns: 4, answer: `3 × 4 = 12 square ${number === 1 ? 'inches' : 'centimeters'}` },
        { label: 'Rectangle C', rows: 4, columns: 3, answer: `4 × 3 = 12 square ${number === 1 ? 'inches' : 'centimeters'}` }
      ], true)];
    }
    if (number === 3) {
      return [m4OpenResponse(
        problem,
        solved,
        ['The shapes can change, but every rectangle uses all 12 units, so the area remains 12 square units.'],
        7
      )];
    }
    if (number === 4) {
      return [
        m4ModelCards([
          { label: 'Shape A', rows: 3, columns: 2, answer: '3 × 2 = 6 square units' },
          { label: 'Shape B', rows: 2, columns: 3, answer: '2 × 3 = 6 square units' }
        ], solved),
        m4OpenResponse(problem, solved, ['Yes. Both rectangles contain 6 equal square units.'], 5)
      ];
    }
    return [
      m4ModelCards([
        { label: 'Given rectangle', rows: 1, columns: 8, answer: '1 × 8 = 8 square units' },
        ...(solved ? [{ label: 'Different equal-area rectangle', rows: 2, columns: 4, answer: '2 × 4 = 8 square units' }] : [])
      ], solved),
      m4OpenResponse(problem, solved, ['The area is 8 square units; a different 2-by-4 rectangle has the same area.'], 6)
    ];
  }

  if (lessonNumber === 3) {
    if (number === 1) {
      return [m4ModelCards([
        { label: 'A', rows: 2, columns: 3, answer: 'A = 6 square units' },
        { label: 'B', rows: 2, columns: 6, answer: 'B = 2 square units (Teacher Edition answer key)' },
        { label: 'C', rows: 4, columns: 3, answer: 'C = 12 square units' },
        { label: 'D', rows: 4, columns: 5, answer: 'D = 20 square units' }
      ], solved)];
    }
    if (number === 2) {
      return [m4ModelCards([
        { label: 'a', rows: 3, columns: 2, answer: 'a = 6 square units' },
        { label: 'b', rows: 3, columns: 3, answer: 'b = 9 square units' },
        { label: 'c', rows: 4, columns: 4, answer: 'c = 16 square units' },
        { label: 'd', rows: 2, columns: 6, answer: 'd = 12 square units' }
      ], solved)];
    }
    if (number === 3) {
      return [m4OpenResponse(
        problem,
        solved,
        [
          'a. The same number of larger inch squares would make each rectangle physically larger.',
          'b. Recreate one selected rectangle on both inch and centimeter grid paper.'
        ],
        12
      )];
    }
    return [
      solved
        ? m4ModelCards([
            { label: 'Example 1', rows: 1, columns: 8, answer: '1 × 8 = 8 square centimeters' },
            { label: 'Example 2', rows: 2, columns: 4, answer: '2 × 4 = 8 square centimeters' },
            { label: 'Example 3', rows: 4, columns: 2, answer: '4 × 2 = 8 square centimeters' },
            { label: 'Example 4', rows: 8, columns: 1, answer: '8 × 1 = 8 square centimeters' }
          ], true)
        : m4OpenResponse(problem, false, [], 14)
    ];
  }

  if (lessonNumber === 4) {
    if (number === 1) {
      return [solved
        ? m4Array(2, 7, '2 cm by 7 cm; total area 14 square centimeters.', true)
        : m4RectangleOutline('Centimeter rectangle to measure and tile', 72, 25, 'Measure both sides; total area = ____')];
    }
    if (number === 2) {
      return [solved
        ? m4Array(3, 2, '3 in by 2 in; total area 6 square inches.', true)
        : m4RectangleOutline('Inch rectangle to measure and tile', 38, 62, 'Measure both sides; total area = ____')];
    }
    if (number === 3) {
      return [
        m4Array(3, 4, solved ? 'Side lengths: 3 cm and 4 cm; area 12 square centimeters.' : 'Label all four side lengths; total area = ____', solved)
      ];
    }
    const figureCrops: Record<number, { y: number; height: number; caption: string }> = {
      4: { y: 330, height: 300, caption: 'Exact official 4-by-5 square-centimeter grid.' },
      5: { y: 735, height: 220, caption: 'Exact official rectangle for comparing square-centimeter and square-inch tiles.' },
      6: { y: 1110, height: 270, caption: 'Exact official rectangle with side labels A, B, C, and D.' }
    };
    const crop = figureCrops[number];
    return [{
      kind: 'source-crop',
      label: `Official Problem ${number} figure`,
      src: '/source-pages/m4-teacher/page-051.png',
      alt: `Module 4 Lesson 4 Problem ${number} official rectangle figure`,
      imageWidth: 1275,
      imageHeight: 1650,
      crop: { x: 100, y: crop.y, width: number === 5 ? 510 : 390, height: crop.height },
      caption: crop.caption
    }, m4OpenResponse(
      problem,
      solved,
      number === 4
        ? ['Both are correct: one side is 4 centimeters and the adjacent side is 5 centimeters.']
        : number === 5
          ? ['Square-inch tiles work best because they cover the rectangle with fewer whole tiles.']
          : ['Opposite sides are equal, so A = C and B = D.'],
      6
    )];
  }

  if (lessonNumber === 5) {
    if (number === 1) {
      const models = [
        { label: 'a. Area 18; side 3 cm', rows: 3, columns: 6, answer: '3 × 6 = 18' },
        { label: 'b. side 4 cm and 5 cm', rows: 4, columns: 5, answer: '4 × 5 = 20' },
        { label: 'c. Area 18; side 6 cm', rows: 6, columns: 3, answer: '6 × 3 = 18' },
        { label: 'd. Area 24; side 3 cm', rows: 3, columns: 8, answer: '3 × 8 = 24' },
        { label: 'e. Area 20; side 5 cm', rows: 5, columns: 4, answer: '5 × 4 = 20' },
        { label: 'f. side 3 cm and 3 cm', rows: 3, columns: 3, answer: '3 × 3 = 9' }
      ];
      if (solved) return [m4ModelCards(models, true)];
      const crops = [
        { x: 100, y: 320, width: 450, height: 280 },
        { x: 105, y: 670, width: 400, height: 350 },
        { x: 100, y: 1040, width: 300, height: 440 },
        { x: 580, y: 320, width: 550, height: 280 },
        { x: 670, y: 670, width: 350, height: 390 },
        { x: 720, y: 1130, width: 310, height: 310 }
      ];
      return [{
        kind: 'card-grid',
        label: 'Six official partially tiled rectangle frames',
        cards: models.map((model, index) => ({
          label: model.label,
          sections: [{
            kind: 'source-crop',
            src: '/source-pages/m4-teacher/page-063.png',
            alt: `${model.label} official partially tiled rectangle`,
            imageWidth: 1275,
            imageHeight: 1650,
            crop: crops[index],
            caption: 'Draw only the missing square tiles, then complete the multiplication sentence.'
          }]
        }))
      }];
    }
    if (number === 2) {
      return [solved
        ? m4Array(5, 7, '5 equal rows of 7 tiles; side lengths are 5 inches and 7 inches.', true)
        : m4OpenResponse(problem, false, [], 9)];
    }
    if (number === 3) {
      return [solved
        ? m4ModelCards([
            { label: '18-tile array', rows: 3, columns: 6, answer: '3 × 6 = 18' },
            { label: 'Remaining 6-tile array', rows: 2, columns: 3, answer: '2 × 3 = 6' }
          ], true)
        : m4OpenResponse(problem, false, [], 10)];
    }
    return [solved
      ? {
          kind: 'card-grid',
          label: 'Leon’s completed source response',
          cards: [
            {
              label: 'a. Four equal rows',
              sections: [m4Array(4, 8, '4 × 8 = 32 square centimeters.', true)]
            },
            {
              label: 'b. Six equal rows?',
              sections: [{ kind: 'note', text: 'No. 32 is not divisible by 6, so 32 tiles cannot form 6 equal whole-number rows.' }]
            }
          ]
        }
      : m4OpenResponse(problem, false, [], 12)];
  }

  return undefined;
}

function m4SourceCrop(
  src: string,
  label: string,
  alt: string,
  crop: { x: number; y: number; width: number; height: number },
  caption: string
): ProblemVisualSection {
  return {
    kind: 'source-crop',
    label,
    src,
    alt,
    imageWidth: 1275,
    imageHeight: 1650,
    crop,
    caption
  };
}

function m4LabeledRectangle(
  label: string,
  width: number,
  height: number,
  sideLabels: string[],
  valueLabel: string,
  solved: boolean
): ProblemVisualSection {
  return {
    kind: 'geometry-diagram',
    label,
    diagram: 'rectangle',
    shapes: [{
      label,
      shape: 'rectangle',
      x: 12,
      y: 12,
      width,
      height,
      sideLabels,
      valueLabel,
      tone: solved ? 'answer' : 'unknown'
    }]
  };
}

function m4ReviewedLessonsSixThroughTen(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec['sections'] | undefined {
  const number = Number(problem.number);

  if (lessonNumber === 6) {
    if (number === 1) {
      const incompleteCrops = [
        { label: 'a', crop: { x: 120, y: 325, width: 255, height: 190 } },
        { label: 'b', crop: { x: 120, y: 555, width: 275, height: 150 } },
        { label: 'c', crop: { x: 170, y: 750, width: 175, height: 190 } },
        { label: 'd', crop: { x: 125, y: 970, width: 255, height: 165 } },
        { label: 'e', crop: { x: 115, y: 1150, width: 275, height: 125 } },
        { label: 'f', crop: { x: 155, y: 1310, width: 210, height: 175 } }
      ];
      if (!solved) {
        return [{
          kind: 'card-grid',
          label: 'Six official incomplete arrays',
          cards: incompleteCrops.map((entry) => ({
            label: entry.label,
            sections: [m4SourceCrop(
              '/source-pages/m4-teacher/page-073.png',
              `Incomplete array ${entry.label}`,
              `Lesson 6 Problem 1 incomplete array ${entry.label}`,
              entry.crop,
              'Draw the missing rows and columns; do not infer the match from position.'
            )]
          }))
        }, m4ModelCards([
          { label: 'Completed array 1', rows: 5, columns: 3, answer: '5 × 3 = 15' },
          { label: 'Completed array 2', rows: 4, columns: 5, answer: '4 × 5 = 20' },
          { label: 'Completed array 3', rows: 2, columns: 6, answer: '2 × 6 = 12' },
          { label: 'Completed array 4', rows: 4, columns: 3, answer: '4 × 3 = 12' },
          { label: 'Completed array 5', rows: 5, columns: 6, answer: '5 × 6 = 30' },
          { label: 'Completed array 6', rows: 3, columns: 7, answer: '3 × 7 = 21' }
        ], false), {
          kind: 'equations',
          label: 'Area equation blanks for a–f',
          lines: ['a. ____ × ____ = ____', 'b. ____ × ____ = ____', 'c. ____ × ____ = ____', 'd. ____ × ____ = ____', 'e. ____ × ____ = ____', 'f. ____ × ____ = ____']
        }];
      }
      return [m4ModelCards([
        { label: 'a → completed array 5', rows: 5, columns: 6, answer: '5 × 6 = 30 square centimeters' },
        { label: 'b → completed array 6', rows: 3, columns: 7, answer: '3 × 7 = 21 square centimeters' },
        { label: 'c → completed array 1', rows: 5, columns: 3, answer: '5 × 3 = 15 square centimeters' },
        { label: 'd → completed array 2', rows: 4, columns: 5, answer: '4 × 5 = 20 square centimeters' },
        { label: 'e → completed array 3', rows: 2, columns: 6, answer: '2 × 6 = 12 square centimeters' },
        { label: 'f → completed array 4', rows: 4, columns: 3, answer: '4 × 3 = 12 square centimeters' }
      ], true)];
    }
    const figure = number === 2
      ? {
          crop: { x: 110, y: 275, width: 325, height: 250 },
          label: 'Official incomplete 6-row rectangle',
          lines: ['No. Completing the rows and columns gives 6 × 8 = 48 square units, not 42.']
        }
      : number === 3
        ? {
            crop: { x: 105, y: 640, width: 350, height: 335 },
            label: 'Official tile floor and rug',
            lines: ['The full floor is 9 rows by 10 columns, including the covered tiles: 9 × 10 = 90 tiles.']
          }
        : {
            crop: { x: 105, y: 1140, width: 285, height: 330 },
            label: 'Official incomplete stained-glass window',
            lines: ['The finished array needs 30 more square-inch glass tiles.']
          };
    return [
      m4SourceCrop(
        '/source-pages/m4-teacher/page-074.png',
        figure.label,
        `Lesson 6 Problem ${number} official mathematical figure`,
        figure.crop,
        'Only the exact mathematical figure is retained; response work remains authored.'
      ),
      m4OpenResponse(problem, solved, figure.lines, 7)
    ];
  }

  if (lessonNumber === 7) {
    if (number === 1) {
      const equations = ['A: 3 × 4 = 12', 'B: 5 × 4 = 20', 'C: 2 × 7 = 14', 'D: 7 × 4 = 28', 'E: 1 × 3 = 3', 'F: 4 × 2 = 8'];
      return [
        m4SourceCrop(
          '/source-pages/m4-teacher/page-086.png',
          'Official A–F rectangle floor plan',
          'Lesson 7 Problem 1 official grid with rectangles A through F',
          { x: 105, y: 315, width: 925, height: 745 },
          solved ? 'Draw the equal-size grid lines inside each labeled rectangle and verify each factor pair.' : 'Draw equal-size square grids inside A–F; label both side lengths.'
        ),
        {
          kind: 'equations',
          label: solved ? 'Completed A–F area equations' : 'A–F area equation blanks',
          lines: solved ? equations : equations.map((line) => `${line[0]}: ____ × ____ = ____ square units`)
        }
      ];
    }
    if (number === 2 || number === 3) {
      const crop = number === 2
        ? { x: 680, y: 190, width: 455, height: 405 }
        : { x: 850, y: 600, width: 285, height: 320 };
      const lines = number === 2
        ? ['a. Side lengths: 9 feet and 11 feet.', 'b. Draw equal-size grid lines inside the bedroom rectangle.', 'c. 9 × 11 = 99 square feet.']
        : ['No. The marked mural does not cover exactly 35 square feet; explanations will vary.'];
      return [
        m4SourceCrop(
          '/source-pages/m4-teacher/page-087.png',
          number === 2 ? 'Official Benjamin bedroom perimeter grid' : 'Official mural perimeter grid',
          `Lesson 7 Problem ${number} official perimeter grid`,
          crop,
          'The framed perimeter grid is the Teacher Edition mathematical figure.'
        ),
        m4OpenResponse(problem, solved, lines, number === 2 ? 9 : 7)
      ];
    }
    return [m4OpenResponse(
      problem,
      solved,
      ['a. A 4-by-6 or 6-by-4 array lets both skip-counts produce the same total.', 'b. One possible total is 24 square units.'],
      12
    )];
  }

  if (lessonNumber === 8) {
    if (number === 1) {
      const dimensions = [
        { label: 'a', x: 6, y: 24, width: 25, height: 34, sides: ['7 ft', '4 ft'], answer: '4 × 7 = 28 square feet' },
        { label: 'b', x: 38, y: 15, width: 23, height: 52, sides: ['7 ft', '8 ft'], answer: '8 × 7 = 56 square feet' },
        { label: 'c', x: 70, y: 20, width: 22, height: 44, sides: ['6 ft', '6 ft'], answer: '6 × 6 = 36 square feet' }
      ];
      return [{
        kind: 'geometry-diagram',
        label: 'Three official labeled rectangles',
        diagram: 'composite',
        shapes: dimensions.map((entry) => ({
          label: entry.label,
          shape: 'rectangle',
          x: entry.x,
          y: entry.y,
          width: entry.width,
          height: entry.height,
          sideLabels: entry.sides,
          valueLabel: solved ? entry.answer : 'Area: ____ sq ft',
          tone: solved ? 'answer' : 'unknown'
        }))
      }, {
        kind: 'equations',
        label: solved ? 'Completed area equations' : 'Area equation blanks',
        lines: dimensions.map((entry) => solved ? entry.answer : `${entry.label}. ____ × ____ = ____`)
      }];
    }
    if (number === 2) {
      const models = [
        { label: 'a', x: 6, y: 12, width: 27, height: 58, known: ['____ ft', '9 ft'], answer: ['8 ft', '9 ft'], area: 'Area = 72 sq ft', equations: ['9 × 8 = 72', '72 ÷ 9 = 8'] },
        { label: 'b', x: 39, y: 26, width: 24, height: 30, known: ['____ ft', '3 ft'], answer: ['5 ft', '3 ft'], area: 'Area = 15 sq ft', equations: ['3 × 5 = 15', '15 ÷ 3 = 5'] },
        { label: 'c', x: 72, y: 16, width: 18, height: 50, known: ['4 ft', '____ ft'], answer: ['4 ft', '7 ft'], area: 'Area = 28 sq ft', equations: ['7 × 4 = 28', '28 ÷ 4 = 7'] }
      ];
      return [{
        kind: 'geometry-diagram',
        label: 'Three unknown-side rectangles',
        diagram: 'composite',
        shapes: models.map((entry) => ({
          label: entry.label,
          shape: 'rectangle',
          x: entry.x,
          y: entry.y,
          width: entry.width,
          height: entry.height,
          sideLabels: solved ? entry.answer : entry.known,
          valueLabel: entry.area,
          tone: solved ? 'answer' : 'unknown'
        }))
      }, {
        kind: 'equations',
        label: solved ? 'Completed multiplication and division equations' : 'Multiplication and division blanks',
        lines: models.flatMap((entry) => solved
          ? entry.equations
          : [`${entry.label}. ____ × ____ = ____`, '____ ÷ ____ = ____'])
      }];
    }
    if (number === 3) {
      return [
        solved
          ? m4Array(6, 7, 'One valid response: 6 × 7 = 42 square units; side lengths 6 and 7.', true)
          : m4SourceCrop(
              '/source-pages/m4-teacher/page-099.png',
              'Official blank construction grid',
              'Lesson 8 Problem 3 official blank square grid',
              { x: 395, y: 1170, width: 430, height: 275 },
              'Draw a 42-square-unit rectangle on this grid and label both side lengths.'
            )
      ];
    }
    if (number === 4) {
      return [solved
        ? m4Array(9, 6, '9 × 6 = 54 square centimeters.', true)
        : m4OpenResponse(problem, false, [], 9)];
    }
    if (number === 5) {
      return [solved
        ? m4ModelCards([
            { label: 'Eliza', rows: 6, columns: 7, answer: '6 × 7 = 42 square feet' },
            { label: 'Brother', rows: 5, columns: 8, answer: '5 × 8 = 40 square feet' }
          ], true)
        : m4OpenResponse(problem, false, [], 9)];
    }
    return [solved
      ? m4Array(4, 6, '24 ÷ 6 = 4 inches for the other side length.', true)
      : m4OpenResponse(problem, false, [], 9)];
  }

  if (lessonNumber === 9) {
    if (number === 1) {
      return [{
        kind: 'source-response-workspace',
        label: solved ? 'One Teacher Edition-supported construction' : 'Official three-part open construction',
        parts: [
          { lead: 'a.', prompt: 'Draw and label 2 equal rectangles.', lines: solved ? ['Two 5 cm by 10 cm rectangles.'] : [], printedLineCount: 8, openWorkspace: !solved },
          { lead: 'b.', prompt: 'Write an equation for 1 rectangle.', lines: solved ? ['5 cm × 10 cm = 50 square centimeters.'] : [], printedLineCount: 4, openWorkspace: !solved },
          { lead: 'c.', prompt: 'Show the total area of both rectangles.', lines: solved ? ['50 + 50 = 100 square centimeters.'] : [], printedLineCount: 4, openWorkspace: !solved }
        ]
      }];
    }
    if (number === 2) {
      return [{
        kind: 'source-response-workspace',
        label: solved ? 'Completed longer-rectangle construction' : 'Official two-part open construction',
        parts: [
          { lead: 'a.', prompt: 'Place both equal rectangles side by side; draw and label the longer rectangle.', lines: solved ? ['A 5 cm by 20 cm rectangle.'] : [], printedLineCount: 9, openWorkspace: !solved },
          { lead: 'b.', prompt: 'Find its total area.', lines: solved ? ['5 × 20 = 100 square centimeters.'] : [], printedLineCount: 4, openWorkspace: !solved }
        ]
      }];
    }
    if (number === 3) {
      return [
        m4ModelCards([
          { label: 'Furaha', rows: 4, columns: 6, answer: '4 × 6 = 24 square units' },
          { label: 'Rahema', rows: 4, columns: 7, answer: '4 × 7 = 28 square units' }
        ], solved),
        m4OpenResponse(
          problem,
          solved,
          ['a. Areas: 24 and 28 square units.', 'b. Combined rectangle: 4 rows by 13 columns.', 'c. Yes. 24 + 28 = 52 square units.'],
          12
        )
      ];
    }
    return [
      m4SourceCrop(
        '/source-pages/m4-teacher/page-122.png',
        'Official overlapping Rectangle A/B diagram',
        'Lesson 9 Problem 4 overlapping rectangles A and B',
        { x: 95, y: 1260, width: 590, height: 190 },
        'The overlap is retained because it determines whether adding both areas is valid.'
      ),
      m4OpenResponse(problem, solved, ['No. Adding both full areas counts the overlap twice.'], 7)
    ];
  }

  if (lessonNumber === 10) {
    if (number === 1) {
      const models = [
        { label: 'a. 8 × 7 = (5 + 3) × 7', rows: 8, columns: 7, splitRows: 5, answer: ['5 × 7 = 35', '3 × 7 = 21', '35 + 21 = 56'] },
        { label: 'b. 12 × 4 = (10 + 2) × 4', rows: 12, columns: 4, splitRows: 10, answer: ['10 × 4 = 40', '2 × 4 = 8', '40 + 8 = 48'] },
        { label: 'c. 6 × 13 = 6 × (10 + 3)', rows: 6, columns: 13, splitColumns: 10, answer: ['6 × 10 = 60', '6 × 3 = 18', '60 + 18 = 78'] },
        { label: 'd. 8 × 12 = 8 × (10 + 2)', rows: 8, columns: 12, splitColumns: 10, answer: ['8 × 10 = 80', '8 × 2 = 16', '80 + 16 = 96'] }
      ];
      return [{
        kind: 'card-grid',
        label: 'Four exact shaded distributive arrays',
        cards: models.map((entry) => ({
          label: entry.label,
          sections: [{
            kind: 'array',
            rows: entry.rows,
            columns: entry.columns,
            item: 'square',
            splitAfterRows: entry.splitRows,
            splitAfterColumns: entry.splitColumns,
            shadeBeforeRows: entry.splitRows,
            shadeBeforeColumns: entry.splitColumns,
            caption: solved ? entry.answer.join('; ') : 'Label both parts, complete the partial products, and add.'
          }, {
            kind: 'equations',
            lines: solved ? entry.answer : ['____ × ____ = ____', '____ × ____ = ____', '____ + ____ = ____']
          }]
        }))
      }];
    }
    if (number === 2) {
      return [{
        kind: 'array',
        rows: 10,
        columns: 8,
        item: 'square',
        splitAfterRows: 9,
        shadeBeforeRows: 9,
        caption: solved
          ? 'Imagine 1 extra row: 10 × 8 = 80, then 80 − 8 = 72, so 9 × 8 = 72.'
          : 'The top 9 rows form 9 × 8; the final row is the imagined extra row.'
      }, m4OpenResponse(
        problem,
        solved,
        ['10 × 8 = 80; 80 − 8 = 72; therefore 9 × 8 = 72.'],
        7
      )];
    }
    return [{
      kind: 'array',
      rows: 15,
      columns: 5,
      item: 'square',
      splitAfterRows: solved ? 10 : undefined,
      shadeBeforeRows: solved ? 10 : undefined,
      caption: solved
        ? 'One valid split: (10 × 5) + (5 × 5) = 50 + 25 = 75 square units.'
        : 'Shade one smaller rectangle, then add both partial areas.'
    }, m4OpenResponse(
      problem,
      solved,
      ['One valid response: 10 × 5 = 50 and 5 × 5 = 25; 50 + 25 = 75 square units.'],
      8
    )];
  }

  return undefined;
}

function m4ReviewedLessonsElevenThroughFifteen(
  problem: ProblemSetCenteredProblem,
  solved: boolean,
  lessonNumber: number
): ProblemVisualSpec['sections'] | undefined {
  const number = Number(problem.number);

  if (lessonNumber === 11) {
    if (number === 1) {
      const models = [
        { label: 'a', x: 5, y: 8, width: 15, height: 34, sides: ['6 cm', '8 cm'], equation: '8 × 6 = 48' },
        { label: 'b', x: 29, y: 8, width: 62, height: 7, sides: ['48 cm', '1 cm'], equation: '1 × 48 = 48' },
        { label: 'c', x: 29, y: 27, width: 42, height: 8, sides: ['24 cm', '2 cm'], equation: '2 × 24 = 48' },
        { label: 'd', x: 5, y: 56, width: 25, height: 15, sides: ['12 cm', '4 cm'], equation: '4 × 12 = 48' },
        { label: 'e', x: 48, y: 48, width: 8, height: 43, sides: ['3 cm', '16 cm'], equation: '16 × 3 = 48' }
      ];
      return [{
        kind: 'geometry-diagram',
        label: 'Five equal-area official-dimension rectangles',
        diagram: 'composite',
        shapes: models.map((entry) => ({
          label: entry.label,
          shape: 'rectangle',
          x: entry.x,
          y: entry.y,
          width: entry.width,
          height: entry.height,
          sideLabels: entry.label === 'a' ? entry.sides : undefined,
          tone: solved ? 'answer' : 'unknown'
        }))
      }, {
        kind: 'equations',
        label: solved ? 'Completed equal-area equations' : 'Move parentheses and solve',
        lines: solved ? models.map((entry) => `${entry.label}. ${entry.equation}`) : [
          'a. 8 × ____ = ____',
          'b. 1 × 48 = ____',
          'c. 8 × 6 = (2 × 4) × 6 = 2 × 24 = ____',
          'd. 8 × 6 = (4 × 2) × 6 = 4 × 12 = ____',
          'e. 8 × 6 = 8 × (2 × 3) = 16 × 3 = ____'
        ]
      }];
    }
    if (number === 2) {
      return [m4OpenResponse(problem, solved, ['Yes. The five whole-number factor pairs shown exhaust the possible side lengths for area 48.'], 7)];
    }
    if (number === 3) {
      return [m4OpenResponse(problem, solved, ['As the side-length difference gets smaller, the rectangle becomes closer to a square.'], 7)];
    }
    const models = [
      { label: 'a. Given rectangle', rows: 8, columns: 9, answer: '8 × 9 = 72 square centimeters' },
      { label: 'b. Julius rectangle', rows: 4, columns: 18, answer: '4 × 18 = 72 square centimeters' },
      { label: 'c. Different factor pair', rows: 2, columns: 36, answer: '2 × 36 = 72 sq cm' }
    ];
    return [
      m4ModelCards(solved ? models : models.slice(0, 2), solved),
      m4OpenResponse(
        problem,
        solved,
        ['a. 8 × 9 = 72 square centimeters.', 'b. Yes. 4 × 18 = 4 × 2 × 9 = 8 × 9 = 72.', 'c. Answers will vary; 2 cm by 36 cm is one valid response.'],
        13
      )
    ];
  }

  if (lessonNumber === 12) {
    if (number === 1) {
      return [solved
        ? m4Array(9, 9, '9 × 9 = 81 square centimeters.', true)
        : m4OpenResponse(problem, false, [], 8)];
    }
    if (number === 2) {
      return [
        m4ModelCards([
          { label: 'Stacy’s given rectangle', rows: 3, columns: 4, answer: '3 × 4 = 12 square units' },
          ...(solved ? [{ label: 'One different equal-area rectangle', rows: 2, columns: 6, answer: '2 × 6 = 12 square units' }] : [])
        ], solved),
        m4OpenResponse(
          problem,
          solved,
          ['a. Stacy’s rectangle has area 12 square units; a different 2-by-6 rectangle also has area 12.', 'b. Other different whole-number side lengths are possible.', 'c. Yes; valid drawings and explanations will vary.'],
          12
        )
      ];
    }
    if (number === 3) {
      return [{
        kind: 'array',
        rows: 4,
        columns: 16,
        item: 'square',
        splitAfterColumns: 10,
        shadeAfterColumns: 6,
        caption: solved
          ? '4 × (10 + 6) = (4 × 10) + (4 × 6) = 40 + 24 = 64 square feet.'
          : 'Official split: 4-foot height, then 10-foot and 6-foot widths.'
      }, {
        kind: 'equations',
        lines: solved
          ? ['4 × 10 = 40', '4 × 6 = 24', '40 + 24 = 64']
          : ['4 × 10 = ____', '4 × 6 = ____', '____ + ____ = ____']
      }];
    }
    if (number === 4) {
      const models = [
        { label: 'Figure 1', rows: 2, columns: 2, answer: '2 × 2 = 4' },
        { label: 'Figure 2', rows: 3, columns: 3, answer: '3 × 3 = 9' },
        { label: 'Figure 3', rows: 4, columns: 4, answer: '4 × 4 = 16' },
        ...(solved
          ? [
              { label: 'Figure 4', rows: 5, columns: 5, answer: '5 × 5 = 25' },
              { label: 'Figure 5', rows: 6, columns: 6, answer: '6 × 6 = 36' }
            ]
          : [])
      ];
      return [
        m4ModelCards(models, solved),
        m4OpenResponse(
          problem,
          solved,
          ['a. Areas are 4, 9, and 16 square units; each figure adds one row and one column.', 'b. The next figures are 5×5 and 6×6, with areas 25 and 36.'],
          11
        )
      ];
    }
    return [
      m4SourceCrop(
        '/source-pages/m4-teacher/page-157.png',
        'Official three-strip 9 cm square',
        'Lesson 12 Problem 5 three identical paper strips forming a square',
        { x: 125, y: 1165, width: 405, height: 315 },
        'Three identical horizontal rectangles form the 9 cm by 9 cm square.'
      ),
      m4OpenResponse(
        problem,
        solved,
        ['Each strip is 9 cm by 3 cm because 9 ÷ 3 = 3. Two strips have area 2 × 27 = 54 square centimeters.'],
        8
      )
    ];
  }

  if (lessonNumber === 13) {
    if (number === 1) {
      return [
        m4SourceCrop(
          '/source-pages/m4-teacher/page-167.png',
          'Official four composite figures on square grid',
          'Lesson 13 Problem 1 figures 1 through 4 with labeled rectangular parts',
          { x: 120, y: 305, width: 885, height: 725 },
          'Only the four-part mathematical grid is retained; equations are authored below.'
        ),
        {
          kind: 'equations',
          label: solved ? 'Completed part-area sums' : 'Four part-area sum blanks',
          lines: solved
            ? ['Figure 1: 18 + 9 = 27 square units', 'Figure 2: 18 + 15 = 33 square units', 'Figure 3: 9 + 21 = 30 square units', 'Figure 4: answers will vary; total 55 square units']
            : ['Figure 1: 18 + ____ = ____', 'Figure 2: ____ + ____ = ____', 'Figure 3: ____ + ____ = ____', 'Figure 4: ____ + ____ = ____']
        }
      ];
    }
    const crop = number === 2
      ? { x: 70, y: 250, width: 480, height: 480 }
      : { x: 65, y: 885, width: 535, height: 430 };
    const lines = number === 2
      ? ['Big rectangle: 9 × 10 = 90. Cutout: 3 × 4 = 12. Shaded area: 90 − 12 = 78 square centimeters.']
      : ['a. Unknown measurements: 5 cm and 4 cm.', 'b. Big rectangle: 7 × 9 = 63 square centimeters.', 'c. Small rectangle: 4 × 5 = 20 square centimeters.', 'd. Shaded area: 63 − 20 = 43 square centimeters.'];
    return [
      m4SourceCrop(
        '/source-pages/m4-teacher/page-168.png',
        number === 2 ? 'Official 9-by-10 rectangle with 3-by-4 cutout' : 'Official L-shaped rectangle with unknown measurements',
        `Lesson 13 Problem ${number} official composite-area figure`,
        crop,
        'Only the exact labeled mathematical figure is retained.'
      ),
      m4OpenResponse(problem, solved, lines, number === 2 ? 7 : 11)
    ];
  }

  if (lessonNumber === 14) {
    if (number === 1) {
      const figures = [
        m4SourceCrop(
          '/source-pages/m4-teacher/page-180.png',
          'Official composite figure a',
          'Lesson 14 Problem 1a official composite rectangle',
          { x: 175, y: 295, width: 410, height: 365 },
          'Exact centimeter dimensions and orientation.'
        ),
        m4SourceCrop(
          '/source-pages/m4-teacher/page-180.png',
          'Official composite figure b',
          'Lesson 14 Problem 1b official composite rectangle',
          { x: 275, y: 695, width: 350, height: 335 },
          'Exact meter dimensions, orientation, and rectangular notch.'
        )
      ];
      return [...figures, {
        kind: 'equations',
        lines: solved ? ['a. 19 square centimeters', 'b. 10 square meters'] : ['a. Area = ____ sq cm', 'b. Area = ____ sq m']
      }];
    }
    if (number === 2) {
      return [
        m4SourceCrop(
          '/source-pages/m4-teacher/page-180.png',
          'Official 6-by-5 frame with interior rectangle',
          'Lesson 14 Problem 2 official shaded frame figure',
          { x: 105, y: 1115, width: 475, height: 365 },
          'Exact outer and inner measurements determine the shaded area.'
        ),
        m4OpenResponse(problem, solved, ['Outer area 6 × 5 = 30; inner area 3 × 2 = 6; shaded area 30 − 6 = 24 square meters.'], 8)
      ];
    }
    if (number === 3) {
      return [solved
        ? m4ModelCards([
            { label: 'Original paper', rows: 6, columns: 8, answer: '6 × 8 = 48 square inches' },
            { label: 'Square cutout', rows: 3, columns: 3, answer: '3 × 3 = 9 square inches' }
          ], true)
        : m4OpenResponse(problem, false, [], 10),
      ...(solved ? [{ kind: 'equations' as const, lines: ['48 − 9 = 39 square inches'] }] : [])];
    }
    return [solved
      ? m4ModelCards([
          { label: 'Each original paper', rows: 6, columns: 9, answer: '6 × 9 = 54 square centimeters' },
          { label: 'Tila’s cutout', rows: 3, columns: 4, answer: '3 × 4 = 12 square centimeters' },
          { label: 'Evan’s cutout', rows: 2, columns: 6, answer: '2 × 6 = 12 square centimeters' }
        ], true)
      : m4OpenResponse(problem, false, [], 12),
    ...(solved ? [{ kind: 'note' as const, text: 'Evan is correct. Both cutouts have area 12 square centimeters, so both have 42 square centimeters left.' }] : [])];
  }

  if (lessonNumber === 15) {
    const floorPlan = m4SourceCrop(
      '/source-pages/m4-teacher/page-193.png',
      'Official Teacher Edition floor plan',
      'Lesson 15 shared seven-room floor plan with the exact room topology',
      { x: 78, y: 245, width: 1020, height: 1150 },
      'The mathematical floor-plan illustration is retained without the surrounding worksheet page.'
    );
    if (number === 2) {
      return [floorPlan, {
        kind: 'data-table',
        label: solved ? 'Completed room area/strategy table' : 'Official room area/strategy table',
        columns: ['Room', 'Area', 'Strategy'],
        rows: M4_LESSON15_ROOM_AREAS.map((room) => solved
          ? [room.label, `${room.area} sq cm`, M4_LESSON15_ROOM_STRATEGIES[room.label]]
          : [room.label, '____ sq cm', 'show a rectangle decomposition'])
      }];
    }
    const lines = number === 1
      ? ['The living room looks as if it has the biggest area; predictions may vary.']
      : number === 3
        ? ['The living room has the biggest area, 88 square centimeters; prediction checks will vary.']
        : number === 4
          ? ['Whole-house side lengths are 19 centimeters and 17 centimeters; use aligned room lengths to determine them.']
          : ['The whole floor plan is 19 × 17 = 323 square centimeters.'];
    return [floorPlan, m4OpenResponse(problem, solved, lines, number === 1 ? 6 : 8)];
  }

  if (lessonNumber === 16) {
    return [{
      kind: 'data-table',
      label: 'Official room redesign table',
      columns: ['Room', 'New Side Lengths'],
      rows: M4_LESSON15_ROOM_AREAS.map((room) => [
        `${room.label}: ${room.area} sq cm`,
        '________________________________________________'
      ])
    }, {
      kind: 'note',
      text: solved
        ? 'Teacher Edition answer: Answers will vary. Multiply the chosen side lengths for each rectangle and show that the part areas of every non-rectangular room add to its required area.'
        : 'Record chosen side lengths and verify each required area. For non-rectangular rooms, record the side lengths and areas of the smaller rectangles, then show that their areas add to the required area.'
    }];
  }

  return undefined;
}

function m4OfficialCompositeSourceSection(
  lessonNumber: number,
  problem: ProblemSetCenteredProblem,
  solved: boolean
): ProblemVisualSpec['sections'][number] | undefined {
  const source = lessonNumber === 13
    ? {
        src: problem.number === 1
          ? '/source-pages/m4-teacher/page-167.png'
          : '/source-pages/m4-teacher/page-168.png',
        imageWidth: 1275,
        imageHeight: 1650,
        crop: problem.number === 1
          ? { x: 75, y: 210, width: 1050, height: 1190 }
          : problem.number === 2
          ? { x: 55, y: 0, width: 1120, height: 760 }
          : { x: 55, y: 745, width: 1120, height: 800 }
      }
    : lessonNumber === 14 && problem.number <= 2
    ? {
        src: '/source-pages/m4-student/workbook-page-062.png',
        imageWidth: 850,
        imageHeight: 1100,
        crop: problem.number === 1
          ? { x: 70, y: 155, width: 710, height: 530 }
          : { x: 70, y: 680, width: 710, height: 300 }
      }
    : undefined;

  if (!source) return undefined;

  return {
    kind: 'source-crop',
    label: `Official composite-area figure${problem.number === 1 && lessonNumber === 13 ? 's' : ''}`,
    src: source.src,
    alt: `Official Module 4 Lesson ${lessonNumber} Problem ${problem.number} composite-area figure`,
    imageWidth: source.imageWidth,
    imageHeight: source.imageHeight,
    crop: source.crop,
    caption: solved
      ? 'Use the official figure dimensions with the Teacher Edition answer and area equations below.'
      : 'Decompose the official figure into rectangles or complete a larger rectangle; record each area step.'
  };
}

function sourceSpecificBlankWorkspaceLabel(problem: ProblemSetCenteredProblem): string {
  const prompt = problem.sourcePrompt.replace(/\s+/g, ' ').trim();
  return `Use this official Problem ${problem.number} area workspace: ${firstPromptSentence(prompt)}`;
}

function firstPromptSentence(prompt: string): string {
  const endIndexes = ['.', '?', '!']
    .map((mark) => prompt.indexOf(mark))
    .filter((index) => index >= 0);
  const end = endIndexes.length ? Math.min(...endIndexes) + 1 : prompt.length;
  return prompt.slice(0, end).trim();
}

function m4PatternBlockSections(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'] {
  const cover = problem.patternBlockCover;
  if (!cover) {
    return [m4OpenWorkspaceSection(problem, solved)];
  }

  const rows = cover.targets.map((target) => [
    target.label,
    target.shape,
    solved ? `${target.count} ${m4PatternBlockUnitLabel(cover.unit, target.count)}` : `____ ${m4PatternBlockUnitLabel(cover.unit, target.count)}`,
    solved ? 'No gaps or overlaps' : 'Trace where blocks meet'
  ]);

  const cropByProblem: Partial<Record<number, { y: number; height: number }>> = {
    1: { y: 145, height: 300 },
    2: { y: 430, height: 295 },
    3: { y: 705, height: 300 }
  };
  const crop = cropByProblem[problem.number];

  const officialTargetSection: ProblemVisualSpec['sections'][number] = crop
    ? {
        kind: 'source-crop',
        label: `Official Problem ${problem.number} target outlines`,
        src: '/source-pages/m4-student/workbook-page-002.png',
        alt: `Official Module 4 Lesson 1 Problem ${problem.number} pattern-block target outlines`,
        imageWidth: 850,
        imageHeight: 1100,
        crop: { x: 65, y: crop.y, width: 720, height: crop.height },
        caption: solved
          ? `Use the official outlines while reviewing the ${cover.unit} count and no-gap/no-overlap rule.`
          : `Cover these official outlines with ${cover.unit} pattern blocks and draw where the blocks meet.`
      }
    : {
        kind: 'geometry-diagram',
        label: 'Official rectangle target',
        diagram: 'rectangle',
        shapes: [{
          label: 'Rectangle',
          shape: 'rectangle',
          x: 15,
          y: 20,
          width: 70,
          height: 45,
          valueLabel: solved ? '6 square pattern blocks' : 'Cover without gaps or overlaps',
          tone: solved ? 'answer' : 'unknown'
        }],
        caption: solved
          ? 'Six same-size square blocks cover the rectangle with no gaps or overlaps.'
          : 'Cover the rectangle with same-size square blocks, then draw every meeting line.'
      };

  return [
    officialTargetSection,
    {
      kind: 'data-table',
      label: solved ? `${cover.unit} cover counts` : `${cover.unit} cover workspace`,
      columns: ['Target', 'Official outline', 'Unit count', 'Area rule'],
      rows
    }
  ];
}

function m4PatternBlockUnitLabel(unit: ProblemSetPatternBlockCover['unit'], count: number): string {
  if (count === 1) {
    return unit;
  }
  return unit === 'rhombus' ? 'rhombuses' : `${unit}s`;
}

function m4RoomAreaSections(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'] {
  const rooms = problem.roomAreas ?? [];
  const total = rooms.reduce((sum, room) => sum + room.area, 0);
  const floorPlan = {
    ...M4_LESSON15_FLOOR_PLAN,
    rooms: M4_LESSON15_FLOOR_PLAN.rooms.map((room) => ({
      ...room,
      tone: solved ? room.tone ?? 'given' : 'unknown'
    })),
    caption: solved
      ? `Add the source-known room areas: ${rooms.map((room) => room.area).join(' + ')} = ${total} sq cm.`
      : 'Use the room rectangles to write length x width for each room before filling the table.'
  };
  const table: ProblemVisualSpec['sections'][number] = {
    kind: 'data-table',
    label: solved ? 'Solved floor-plan room areas' : 'Blank floor-plan room area table',
    columns: ['Room', 'Area', 'Strategy'],
    rows: rooms.map((room) => {
      const sourceRoom = M4_LESSON15_FLOOR_PLAN.rooms.find((candidate) => candidate.label === room.label);
      const strategy = sourceRoom
        ? `${sourceRoom.lengthLabel} x ${sourceRoom.widthLabel} = ${evaluate(`${sourceRoom.width} * ${sourceRoom.height}`)}`
        : 'length x width';
      return [
        room.label,
        solved ? `${room.area} sq cm` : '____ sq cm',
        solved ? strategy : 'length x width = ____'
      ];
    })
  };
  return [floorPlan, table];
}

function m4AreaModelSections(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'] {
  const models = problem.areaModels ?? [];
  if (models.length > 1) {
    return [{
      kind: 'card-grid',
      label: solved ? 'Solved source area models' : 'Source rectangle workspaces',
      cards: models.map((model) => ({
        label: model.label,
        sections: [m4AreaArraySection(model, solved)]
      }))
    }];
  }

  return models.map((model) => m4AreaArraySection(model, solved));
}

function m4SolvedEquationAreaSections(problem: ProblemSetCenteredProblem): ProblemVisualSpec['sections'] {
  const models = sourceAreaModels(problem.equations, problem.unitLabel);
  if (models.length > 1) {
    return [{
      kind: 'card-grid',
      label: 'Teacher Edition equation models',
      cards: models.map((model) => ({
        label: model.label,
        sections: [m4AreaArraySection(model, true)]
      }))
    }];
  }

  return models.map((model) => m4AreaArraySection(model, true));
}

function m4ArraySections(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'] {
  const factorPair = sourceFactorPair(problem.equations);
  const rows = problem.knownGroupCount ?? factorPair?.rows ?? 1;
  const columns = problem.knownGroupSize ?? factorPair?.columns ?? 1;

  return [
    m4AreaArraySection({
      label: 'Rectangle',
      rows,
      columns,
      unitLabel: problem.unitLabel,
      total: rows * columns
    }, solved)
  ];
}

function m4AreaArraySection(model: ProblemSetAreaModel, solved: boolean): ProblemVisualSpec['sections'][number] {
  const total = model.total ?? model.rows * model.columns;
  const display = m4DisplayDimensions(model.rows, model.columns);
  const caption = display.compact
    ? `Compact view of a ${model.rows} by ${model.columns} rectangle; use the side lengths and equation for the exact area.`
    : solved
    ? `${model.rows} rows x ${model.columns} columns = ${total} ${model.unitLabel ?? 'square units'}.`
    : 'Each square tile is one area unit. Count rows and columns, then write the matching equation.';

  return {
    kind: 'array',
    label: solved
      ? `${model.label}: ${model.rows} x ${model.columns} = ${total}`
      : `${model.label}: square-unit rectangle`,
    rows: display.rows,
    columns: display.columns,
    item: 'square',
    placeholder: solved ? undefined : '',
    caption
  };
}

function m4OpenWorkspaceSection(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'][number] {
  const factorProduct = m4FactorProduct(problem.equations);
  if (factorProduct) {
    const dimensions = m4SampleFactorPair(factorProduct);
    return {
      kind: 'geometry-diagram',
      label: solved ? `One valid rectangle for ${factorProduct} square units` : `Choose side lengths for ${factorProduct} square units`,
      diagram: 'rectangle',
      shapes: [{
        label: solved ? `${dimensions.width} cm by ${dimensions.height} cm` : 'new room rectangle',
        shape: 'rectangle',
        x: 12,
        y: 18,
        width: 72,
        height: 54,
        sideLabels: solved ? [`${dimensions.width} cm`, `${dimensions.height} cm`] : ['____ cm', '____ cm'],
        valueLabel: solved ? `${dimensions.width} x ${dimensions.height} = ${factorProduct} sq cm` : '____ x ____ = area',
        tone: solved ? 'answer' : 'unknown'
      }],
      caption: solved
        ? 'Teacher Edition accepts varied whole-number side lengths when their product matches the required room area.'
        : 'Pick whole-number side lengths whose product equals the required area, then label the rectangle.'
    };
  }
  return {
    kind: 'data-table',
    label: solved ? 'Solved area workspace' : 'Blank area workspace',
    columns: ['Official prompt', 'Work', 'Answer'],
    rows: [
      [
        problem.sourcePrompt,
        solved ? problem.equations.join('; ') : problem.blankEquations?.join('; ') || blankEquationTemplatesFromLines(problem.equations).join('; ') || '____',
        solved ? problem.solvedAnswer : '____'
      ]
    ]
  };
}

function m4FactorProduct(equations?: string[]): number | undefined {
  for (const equation of equations ?? []) {
    const match = equation.match(/product\s*=\s*(\d+)/i) ?? equation.match(/=\s*(\d+)\s*sq\s*cm/i);
    if (match) {
      return Number(match[1]);
    }
  }
  return undefined;
}

function m4SampleFactorPair(product: number): { width: number; height: number } {
  for (let factor = Math.floor(Math.sqrt(product)); factor >= 1; factor -= 1) {
    if (product % factor === 0) {
      return { width: product / factor, height: factor };
    }
  }
  return { width: product, height: 1 };
}

function blankEquationTemplatesFromLines(equations?: string[]): string[] {
  const templates = (equations ?? []).map(blankEquationTemplate).filter((template): template is string => Boolean(template));
  return templates.length ? templates : ['____ = ____'];
}

function m4DisplayDimensions(rows: number, columns: number): { rows: number; columns: number; compact: boolean } {
  if (rows > 0 && columns > 0 && rows * columns <= 160) {
    return { rows, columns, compact: false };
  }

  const scale = Math.sqrt(160 / Math.max(1, rows * columns));
  return {
    rows: Math.max(1, Math.round(rows * scale)),
    columns: Math.max(1, Math.round(columns * scale)),
    compact: true
  };
}

function m4VisualTitle(problem: ProblemSetCenteredProblem, solved: boolean): string {
  if (problem.patternBlockCover) {
    return `${problem.patternBlockCover.unit} pattern-block area`;
  }
  if (problem.roomAreas?.length) {
    return 'floor-plan area';
  }
  if (problem.areaModels?.length) {
    return `${problem.areaModels.length} area model${problem.areaModels.length === 1 ? '' : 's'}`;
  }
  if (solved && problem.quotient && problem.unitLabel) {
    return `${problem.quotient} ${problem.unitLabel}`;
  }
  return 'source area workspace';
}

function makeLesson(seed: LessonSeed): ProblemSetCenteredLesson {
  const lessonNumber = Number(seed.title.match(/^Lesson\s+(\d+)/i)?.[1]);
  const teacherEditionBasis = m4TeacherSource(lessonNumber);
  const sourcePageImages = pageImages([
    ...new Set(
      Object.values(M4_PROBLEM_SOURCE_CROPS[lessonNumber] ?? {})
        .flatMap((crops) => crops.map(([pdfPage]) => pdfPage))
    )
  ]);
  const answerKeyImages = pageImages([
    ...(M4_ANSWER_KEY_PDF_PAGES[lessonNumber] ?? [])
  ]);

  return {
    title: `Lesson ${lessonNumber}: ${M4_TEACHER_OBJECTIVES[lessonNumber]}`,
    concept: seed.concept,
    teacherEditionBasis,
    contrast: seed.contrast,
    summary: seed.summary,
    sourceNote: seed.sourceNote,
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: [...sourcePageImages, ...answerKeyImages],
    conceptSections: m4FunctionalConceptSections(lessonNumber),
    problems: seed.problems.map((problemSeed) => {
      const problemSourcePageImages = pageImages([
        ...new Set(
          (M4_PROBLEM_SOURCE_CROPS[lessonNumber]?.[problemSeed.number] ?? [])
            .map(([pdfPage]) => pdfPage)
        )
      ]);
      const centeredProblem = makeProblem({
        ...problemSeed,
        sourcePageImages: problemSeed.sourcePageImages ?? problemSourcePageImages,
        blankSourcePageImages: problemSeed.blankSourcePageImages ?? problemSourcePageImages,
        solvedSourcePageImages:
          problemSeed.solvedSourcePageImages
            ?? [...problemSourcePageImages, ...answerKeyImages]
      });

      return {
        ...centeredProblem,
        blankVisual: createM4ProblemVisual(centeredProblem, false, lessonNumber),
        solvedVisual: createM4ProblemVisual(centeredProblem, true, lessonNumber)
      };
    })
  };
}

export const M4_PROBLEM_SET_CENTERED_LESSONS: Record<number, ProblemSetCenteredLesson> = {
  1: makeLesson({
    title: 'Lesson 1 concept: area covers a flat figure',
    concept: 'Area is the amount of flat space a plane figure covers. A valid measurement uses same-size units without gaps or overlaps.',
    teacherEditionBasis: `${te}, pages 11-20.`,
    contrast: 'Larger pattern blocks cover the same shape with fewer units, so the area unit must be named.',
    summary: 'Area measures how much flat space a figure covers.',
    sourceNote: `${sw}, Lesson 1 Problem Set, printed pages 1-2; ${te}, Lesson 1 Answer Key, printed page 214.`,
    problems: [
      { number: 1, sourcePrompt: 'Use triangle pattern blocks to cover each shape below. Draw lines to show where the triangles meet. Then, write how many triangle pattern blocks it takes to cover each shape.', solvedAnswer: 'Lines drawn to show 6 triangles each inside Shapes A and B.', equations: ['Shape A = 6 triangles', 'Shape B = 6 triangles'], quotient: 6, unitLabel: 'triangles', patternBlockCover: { unit: 'triangle', targets: [{ label: 'Shape A', shape: 'parallelogram', count: 6 }, { label: 'Shape B', shape: 'hexagon', count: 6 }] } },
      { number: 2, sourcePrompt: 'Use rhombus pattern blocks to cover each shape below. Draw lines to show where the rhombuses meet. Then, write how many rhombus pattern blocks it takes to cover each shape.', solvedAnswer: 'Lines drawn to show 3 rhombuses each inside Shapes A and B.', equations: ['Shape A = 3 rhombuses', 'Shape B = 3 rhombuses'], quotient: 3, unitLabel: 'rhombuses', patternBlockCover: { unit: 'rhombus', targets: [{ label: 'Shape A', shape: 'parallelogram', count: 3 }, { label: 'Shape B', shape: 'hexagon', count: 3 }] } },
      { number: 3, sourcePrompt: 'Use trapezoid pattern blocks to cover each shape below. Draw lines to show where the trapezoids meet. Then, write how many trapezoid pattern blocks it requires to cover each shape.', solvedAnswer: 'Lines drawn to show 2 trapezoids each inside Shapes A and B.', equations: ['Shape A = 2 trapezoids', 'Shape B = 2 trapezoids'], quotient: 2, unitLabel: 'trapezoids', patternBlockCover: { unit: 'trapezoid', targets: [{ label: 'Shape A', shape: 'parallelogram', count: 2 }, { label: 'Shape B', shape: 'hexagon', count: 2 }] } },
      { number: 4, sourcePrompt: 'How is the number of pattern blocks needed to cover the same shape related to the size of the pattern blocks?', solvedAnswer: 'As pattern blocks get bigger, the number of blocks it takes to cover the same shape gets smaller.', quotient: 1 },
      { number: 5, sourcePrompt: 'Use square pattern blocks to cover the rectangle below. Draw lines to show where the squares meet. Then, write how many square pattern blocks it requires to cover the rectangle.', solvedAnswer: 'Lines drawn to show 6 squares inside rectangle.', equations: ['area = 6 squares'], quotient: 6, unitLabel: 'squares', patternBlockCover: { unit: 'square', targets: [{ label: 'Rectangle', shape: 'rectangle', count: 6 }] } },
      { number: 6, sourcePrompt: 'Use trapezoid pattern blocks to cover the rectangle in Problem 5. Can you use trapezoid pattern blocks to measure the area of this rectangle? Explain your answer.', solvedAnswer: "No, because you can't have gaps or overlaps when measuring area.", quotient: 0 }
    ]
  }),
  2: makeLesson({
    title: 'Lesson 2 concept: recompose shapes to compare areas',
    concept: 'Shapes can be decomposed and recomposed into different rectangles while keeping the same area when all unit squares are used.',
    teacherEditionBasis: `${te}, pages 21-31.`,
    contrast: 'Changing the arrangement does not change area if the same units are all used.',
    summary: 'Area stays the same when the same square units are rearranged.',
    sourceNote: `${sw}, Lesson 2 Problem Set, printed pages 5-6; ${te}, Lesson 2 Answer Key, printed pages 215-216.`,
    problems: [
      { number: 1, sourcePrompt: 'Use all of Paper Strip 1, which you cut into 12 square inches, to complete the chart below.', solvedAnswer: 'Rectangle A: 2 rows of 6 square inches, 12 sq in. Rectangle B: 3 rows of 4 square inches, 12 sq in. Rectangle C: 4 rows of 3 square inches, 12 sq in.', equations: ['2 x 6 = 12', '3 x 4 = 12', '4 x 3 = 12'], quotient: 12, unitLabel: 'square inches', areaModels: [{ label: 'Rectangle A', rows: 2, columns: 6, total: 12, unitLabel: 'square inches' }, { label: 'Rectangle B', rows: 3, columns: 4, total: 12, unitLabel: 'square inches' }, { label: 'Rectangle C', rows: 4, columns: 3, total: 12, unitLabel: 'square inches' }] },
      { number: 2, sourcePrompt: 'Use all of Paper Strip 2, which you cut into 12 square centimeters, to complete the chart below.', solvedAnswer: 'Rectangle A: 2 rows of 6 square centimeters, 12 sq cm. Rectangle B: 3 rows of 4 square centimeters, 12 sq cm. Rectangle C: 4 rows of 3 square centimeters, 12 sq cm.', equations: ['2 x 6 = 12', '3 x 4 = 12', '4 x 3 = 12'], quotient: 12, unitLabel: 'square centimeters', areaModels: [{ label: 'Rectangle A', rows: 2, columns: 6, total: 12, unitLabel: 'square centimeters' }, { label: 'Rectangle B', rows: 3, columns: 4, total: 12, unitLabel: 'square centimeters' }, { label: 'Rectangle C', rows: 4, columns: 3, total: 12, unitLabel: 'square centimeters' }] },
      { number: 3, sourcePrompt: 'Compare the areas of the rectangles you made with Paper Strip 1 and Paper Strip 2. What changed? Why did it change?', solvedAnswer: 'Answers will vary.', quotient: 1 },
      { number: 4, sourcePrompt: 'Maggie uses square units to create these two rectangles. Do the two rectangles have the same area? How do you know?', solvedAnswer: 'Yes, 6 square units inside of each rectangle.', equations: ['6 square units = 6 square units'], quotient: 6 },
      { number: 5, sourcePrompt: 'Count to find the area of the rectangle below. Then, draw a different rectangle that has the same area.', solvedAnswer: '8 square units; rectangle with an area of 8 square units drawn.', equations: ['area = 8 square units'], quotient: 8 }
    ]
  }),
  3: makeLesson({
    title: 'Lesson 3 concept: tile with square units',
    concept: 'Square units such as square centimeters and square inches measure area by tiling with no gaps or overlaps.',
    teacherEditionBasis: `${te}, pages 32-43.`,
    contrast: 'Count every square unit and name the unit.',
    summary: 'Tiling makes area visible.',
    sourceNote: `${sw}, Lesson 3 Problem Set, printed pages 9-10; ${te}, Lesson 3 Answer Key, printed page 217.`,
    problems: [
      { number: 1, sourcePrompt: 'Each square is 1 square unit. What is the area of each of the following rectangles?', solvedAnswer: 'A: 6. B: 2 square units. C: 12 square units. D: 20 square units.', equations: ['A = 6', 'B = 2', 'C = 12', 'D = 20'], quotient: 20 },
      { number: 2, sourcePrompt: 'Each square is 1 square unit. What is the area of each of the following rectangles?', solvedAnswer: 'a. 6 square units. b. 9 square units. c. 16 square units. d. 12 square units.', equations: ['a = 6', 'b = 9', 'c = 16', 'd = 12'], quotient: 16 },
      { number: 3, sourcePrompt: 'How would the rectangles in Problem 1 be different if they were composed of square inches? Select one rectangle from Problem 1 and recreate it on square inch and square centimeter grid paper.', solvedAnswer: 'a. Answers will vary. b. Answers will vary.', quotient: 1 },
      { number: 4, sourcePrompt: 'Use a separate piece of square centimeter grid paper. Draw four different rectangles that each has an area of 8 square centimeters.', solvedAnswer: 'Answers will vary.', equations: ['1 x 8 = 8', '2 x 4 = 8'], quotient: 8 }
    ]
  }),
  4: makeLesson({
    title: 'Lesson 4 concept: side lengths count tiles',
    concept: 'The side lengths of a tiled rectangle match the number of unit squares along each side.',
    teacherEditionBasis: `${te}, pages 44-56.`,
    contrast: 'Centimeters pair with square centimeters, and inches pair with square inches.',
    summary: 'Side lengths tell how many unit squares fit along each side.',
    sourceNote: `${sw}, Lesson 4 Problem Set, printed pages 15-16; ${te}, Lesson 4 Answer Key, printed page 218.`,
    problems: [
      { number: 1, sourcePrompt: 'Use a ruler to measure the side lengths of the rectangle in centimeters. Mark each centimeter with a point and connect the points to show the square units. Then, count the squares you drew to find the total area.', solvedAnswer: '2 cm by 7 cm marked and connected; 14 sq cm.', equations: ['2 x 7 = 14'], knownGroupCount: 2, knownGroupSize: 7, quotient: 14, blankVisualType: 'array-template', animationType: 'array-model' },
      { number: 2, sourcePrompt: 'Use a ruler to measure the side lengths of the rectangle in inches. Mark each inch with a point and connect the points to show the square units. Then, count the squares you drew to find the total area.', solvedAnswer: '3 in by 2 in marked and connected; 6 sq in.', equations: ['3 x 2 = 6'], knownGroupCount: 3, knownGroupSize: 2, quotient: 6, blankVisualType: 'array-template', animationType: 'array-model' },
      { number: 3, sourcePrompt: 'Mariana uses square centimeter tiles to find the side lengths of the rectangle below. Label each side length. Then, count the tiles to find the total area.', solvedAnswer: '3 cm by 4 cm labeled; 12 sq cm.', equations: ['3 x 4 = 12'], quotient: 12, blankVisualType: 'array-template', animationType: 'array-model' },
      { number: 4, sourcePrompt: 'Saffron says that the side length of the rectangle below is 4 centimeters. Kevin says the side length is 5 centimeters. Who is correct? Explain how you know.', solvedAnswer: 'Both are correct; explanations will vary.', quotient: 2 },
      { number: 5, sourcePrompt: 'Use both square centimeter and square inch tiles to find the area of the rectangle below. Which works best? Explain why.', solvedAnswer: 'Square-inch tiles; explanations will vary.', quotient: 1 },
      { number: 6, sourcePrompt: 'How does knowing side lengths A and B help you find side lengths C and D on the rectangle below?', solvedAnswer: 'Explanations will vary.', quotient: 1 }
    ]
  }),
  5: makeLesson({
    title: 'Lesson 5 concept: tiled rectangles make arrays',
    concept: 'A rectangle tiled with unit squares forms rows and columns, so multiplication can find area.',
    teacherEditionBasis: `${te}, pages 57-67.`,
    contrast: 'Use known side length and area to find a missing side or row size.',
    summary: 'Rows and columns of unit squares make an array.',
    sourceNote: `${sw}, Lesson 5 Problem Set, printed pages 19-20; ${te}, Lesson 5 Answer Key, printed page 219.`,
    problems: [
      { number: 1, sourcePrompt: 'Use the centimeter side of a ruler to draw in the tiles, and then skip-count to find the unknown area. Write a multiplication sentence for each tiled rectangle.', solvedAnswer: 'a. 6 cm; 6. b. 20; tiles drawn; 4, 5, 20. c. 3 cm; tiles drawn; 6, 3, 18. d. 8 cm; tiles drawn; 3, 8, 24. e. 4 cm; tiles drawn; 5, 4, 20. f. 9; tiles drawn; 3, 3, 9.', equations: ['3 x 6 = 18', '4 x 5 = 20', '6 x 3 = 18', '3 x 8 = 24', '5 x 4 = 20', '3 x 3 = 9'], quotient: 24 },
      { number: 2, sourcePrompt: 'Lindsey makes a rectangle with 35 square inch tiles. She arranges the tiles in 5 equal rows. What are the side lengths of the rectangle? Use words, pictures, and numbers to support your answer.', solvedAnswer: '5 in, 7 in; answers will vary.', equations: ['5 x 7 = 35'], quotient: 7 },
      { number: 3, sourcePrompt: 'Mark has a total of 24 square inch tiles. He uses 18 square inch tiles to build one rectangular array. He uses the remaining square inch tiles to build a second rectangular array. Draw two arrays that Mark might have made. Then, write multiplication sentences for each.', solvedAnswer: 'Two rectangular arrays drawn, multiplication sentences written for each.', equations: ['18 + 6 = 24'], quotient: 24 },
      { number: 4, sourcePrompt: 'Leon makes a rectangle with 32 square centimeter tiles. There are 4 equal rows of tiles. How many tiles are in each row? Can Leon arrange all of his 32 square centimeter tiles into 6 equal rows? Explain your answer.', solvedAnswer: 'a. 8; answers will vary. b. No; answers will vary.', equations: ['4 x 8 = 32'], quotient: 8 }
    ]
  }),
  6: makeLesson({
    title: 'Lesson 6 concept: complete incomplete arrays',
    concept: 'An incomplete array can show enough row and column structure to find the full rectangular area.',
    teacherEditionBasis: `${te}, pages 68-79.`,
    contrast: 'Extend rows and columns before multiplying.',
    summary: 'Complete the missing rows and columns, then multiply side lengths.',
    sourceNote: `${sw}, Lesson 6 Problem Set, printed pages 23-24; ${te}, Lesson 6 Answer Key, printed page 220.`,
    problems: [
      { number: 1, sourcePrompt: 'Draw to find the number of rows and columns in each array. Match it to its completed array. Then, fill in the blanks to make a true equation to find each array\'s area.', solvedAnswer: 'a. Lines drawn to find 5 cm by 6 cm; matched to fifth completed array; 5, 6, 30. b. Lines drawn to find 3 cm by 7 cm; matched to sixth completed array; 3, 7, 21. c. Lines drawn to find 5 cm by 3 cm; matched to first completed array; 5, 3, 15. d. Lines drawn to find 4 cm by 5 cm; matched to second completed array; 4, 5, 20. e. Lines drawn to find 2 cm by 6 cm; matched to third completed array; 2, 6, 12. f. Lines drawn to find 4 cm by 3 cm; matched to fourth completed array; 4, 3, 12.', equations: ['5 x 6 = 30', '3 x 7 = 21', '5 x 3 = 15', '4 x 5 = 20', '2 x 6 = 12', '4 x 3 = 12'], quotient: 30 },
      { number: 2, sourcePrompt: 'Sheena skip-counts by sixes to find the total square units in the rectangle below. She says there are 42 square units. Is she right? Explain your answer.', solvedAnswer: 'No; explanations may vary.', quotient: 42 },
      { number: 3, sourcePrompt: 'The tile floor in Brandon\'s living room has a rug on it as shown below. How many square tiles are on the floor, including the tiles under the rug?', solvedAnswer: '90.', equations: ['area = 90 square tiles'], quotient: 90 },
      { number: 4, sourcePrompt: 'Abdul is creating a stained glass window with square inch glass tiles as shown below. How many more square inch glass tiles does Abdul need to finish his glass window? Explain your answer.', solvedAnswer: '30; explanations may vary.', equations: ['missing tiles = 30'], quotient: 30 }
    ]
  }),
  7: makeLesson({
    title: 'Lesson 7 concept: area models as arrays',
    concept: 'A rectangle area model can be read as equal rows and columns; multiplying side lengths finds total square units.',
    teacherEditionBasis: `${te}, pages 80-91.`,
    contrast: 'Draw the internal grid so side lengths and equation match the same array.',
    summary: 'Area models become arrays when grid lines show equal square units.',
    sourceNote: `${sw}, Lesson 7 Problem Set, printed pages 29-30; ${te}, Lesson 7 Answer Key, printed page 221.`,
    problems: [
      { number: 1, sourcePrompt: 'Use a straight edge to draw a grid of equal size squares within the rectangle. Find and label the side lengths. Then, multiply the side lengths to find the area.', solvedAnswer: 'a. Grid lines drawn inside rectangle; side lengths labeled; 3, 4, 12. b. Grid lines drawn inside rectangle; side lengths labeled; 5, 4, 20. c. Grid lines drawn inside rectangle; side lengths labeled; 2, 7, 14. d. Grid lines drawn inside rectangle; side lengths labeled; 7, 4, 28. e. Grid lines drawn inside rectangle; side lengths labeled; 1, 3, 3. f. Grid lines drawn inside rectangle; side lengths labeled; 4, 2, 8.', equations: ['3 x 4 = 12', '5 x 4 = 20', '2 x 7 = 14', '7 x 4 = 28', '1 x 3 = 3', '4 x 2 = 8'], quotient: 28 },
      { number: 2, sourcePrompt: 'The area of Benjamin\'s bedroom floor is shown on the grid to the right. Label the side lengths, draw a grid, and find the total number of squares.', solvedAnswer: 'a. Side lengths labeled as 9 feet and 11 feet. b. Grid lines drawn inside rectangle. c. 99.', equations: ['9 x 11 = 99'], quotient: 99 },
      { number: 3, sourcePrompt: 'Mrs. Young\'s art class needs to create a mural that covers exactly 35 square feet. Did she mark the area correctly? Explain your answer.', solvedAnswer: 'No; explanations will vary.', quotient: 35 },
      { number: 4, sourcePrompt: 'Mila skip-counts by fours and Jorge skip-counts by sixes to find the total number of square units in the same rectangular array. Explain how both can be right and give a possible total area.', solvedAnswer: 'a. Answers will vary. b. 24.', equations: ['4 x 6 = 24', '6 x 4 = 24'], quotient: 24 }
    ]
  }),
  8: makeLesson({
    title: 'Lesson 8 concept: multiply side lengths',
    concept: 'For rectangles, multiply side lengths to find area; use division to find an unknown side length.',
    teacherEditionBasis: `${te}, pages 92-115.`,
    contrast: 'Area is square units; side length is linear units.',
    summary: 'Use length times width for rectangle area.',
    sourceNote: `${sw}, Lesson 8 Problem Set, printed pages 34-35; ${te}, Lesson 8 Answer Key, printed pages 222-223.`,
    problems: [
      { number: 1, sourcePrompt: 'Write a multiplication equation to find the area of each rectangle.', solvedAnswer: 'a. 28; 4, 7, 28. b. 56; 8, 7, 56. c. 36; 6, 6, 36.', equations: ['4 x 7 = 28', '8 x 7 = 56', '6 x 6 = 36'], quotient: 56 },
      { number: 2, sourcePrompt: 'Write a multiplication equation and a division equation to find the unknown side length for each rectangle.', solvedAnswer: 'a. 8; 9, 8, 72; 72, 9, 8. b. 5; 3, 5, 15; 15, 3, 5. c. 7; 7, 4, 28; 28, 4, 7.', equations: ['9 x 8 = 72', '72 divided by 9 = 8', '3 x 5 = 15', '15 divided by 3 = 5', '7 x 4 = 28', '28 divided by 4 = 7'], quotient: 8 },
      { number: 3, sourcePrompt: 'On the grid below, draw a rectangle that has an area of 42 square units. Label the side lengths.', solvedAnswer: 'Answers will vary.', equations: ['6 x 7 = 42'], quotient: 42 },
      { number: 4, sourcePrompt: 'Ursa draws a rectangle that has side lengths of 9 centimeters and 6 centimeters. What is the area of the rectangle? Explain how you found your answer.', solvedAnswer: '54 sq cm; explanations will vary.', equations: ['9 x 6 = 54'], quotient: 54 },
      { number: 5, sourcePrompt: 'Eliza\'s bedroom measures 6 feet by 7 feet. Her brother\'s bedroom measures 5 feet by 8 feet. Eliza says their rooms have the same exact floor area. Is she right? Why or why not?', solvedAnswer: 'No; explanations will vary.', equations: ['6 x 7 = 42', '5 x 8 = 40'], quotient: 42 },
      { number: 6, sourcePrompt: 'Cliff draws a rectangle with a side length of 6 inches and an area of 24 square inches. What is the other side length? How do you know?', solvedAnswer: '4 in; explanations will vary.', equations: ['24 divided by 6 = 4'], quotient: 4 }
    ]
  }),
  9: makeLesson({
    title: 'Lesson 9 concept: combine rectangle areas',
    concept: 'Rectangles can be cut apart or placed together. Total area is the sum of the areas of the parts.',
    teacherEditionBasis: `${te}, pages 116-126.`,
    contrast: 'Add areas only when parts exactly form the whole without gaps or overlaps.',
    summary: 'Analyze how rectangles are cut and joined, then add part areas.',
    sourceNote: `${sw}, Lesson 9 Problem Set, printed pages 39-40; ${te}, Lesson 9 Answer Key, printed page 224.`,
    problems: [
      { number: 1, sourcePrompt: 'Cut the grid into 2 equal rectangles. Draw and label the side lengths, write an equation for 1 rectangle, and write an equation to show the total area of the 2 rectangles.', solvedAnswer: 'a. 2 rectangles drawn; 5 cm, 10 cm labeled. b. 5 cm x 10 cm = 50 sq cm. c. 50 sq cm + 50 sq cm = 100 sq cm.', equations: ['5 x 10 = 50', '50 + 50 = 100'], quotient: 100 },
      { number: 2, sourcePrompt: 'Place your 2 equal rectangles side by side to create a new, longer rectangle. Draw an area model, label the side lengths, and find the total area.', solvedAnswer: 'a. Rectangle drawn; 5 cm, 20 cm labeled. b. 100 sq cm.', equations: ['5 x 20 = 100'], quotient: 100 },
      { number: 3, sourcePrompt: 'Furaha and Rahema use square tiles to make rectangles. Label side lengths, find each area, combine the rectangles, and decide whether the new area is 52 square units.', solvedAnswer: 'a. 4, 6; 4, 7; 24 sq units; 28 sq units. b. Rectangle drawn; 4, 13. c. Rahema is right; explanations will vary.', equations: ['4 x 6 = 24', '4 x 7 = 28', '24 + 28 = 52'], quotient: 52 },
      { number: 4, sourcePrompt: 'Kiera says she can find the area of the long rectangle below by adding the areas of Rectangles A and B. Is she right? Why or why not?', solvedAnswer: 'No; explanations will vary.', quotient: 0 }
    ]
  }),
  10: makeLesson({
    title: 'Lesson 10 concept: distribute area',
    concept: 'A large rectangle can be decomposed into two smaller rectangles; add the two products to find total area.',
    teacherEditionBasis: `${te}, pages 127-137.`,
    contrast: 'Break one side length into addends and multiply each part.',
    summary: 'The distributive property finds area by adding partial areas.',
    sourceNote: `${sw}, Lesson 10 Problem Set, printed pages 43-44; ${te}, Lesson 10 Answer Key, printed page 225.`,
    problems: [
      { number: 1, sourcePrompt: 'Label the side lengths of the shaded and unshaded rectangles when needed. Then, find the total area of the large rectangle by adding the areas of the two smaller rectangles.', solvedAnswer: 'a. 35, 21; 56; 56. b. 10; 10; 10; 40; 48; 48. c. 10, 3; 10; 10; 60, 18; 78; 78. d. 8, 10, 2; 10, 2; 10, 2; 80, 16; 96; 96.', equations: ['8 x 7 = 56', '12 x 4 = 48', '6 x 13 = 78', '8 x 12 = 96'], quotient: 96 },
      { number: 2, sourcePrompt: 'Vince imagines 1 more row of eight to find the total area of a 9 x 8 rectangle. Explain how this could help him solve 9 x 8.', solvedAnswer: 'Answers will vary.', equations: ['10 x 8 = 80', '80 - 8 = 72'], quotient: 72 },
      { number: 3, sourcePrompt: 'Break the 15 x 5 rectangle into 2 rectangles by shading one smaller rectangle within it. Then, find the sum of the areas of the 2 smaller rectangles and show how it relates to the total area. Explain your thinking.', solvedAnswer: '75 sq units; answers will vary.', equations: ['15 x 5 = 75'], quotient: 75 }
    ]
  }),
  11: makeLesson({
    title: 'Lesson 11 concept: choose side lengths',
    concept: 'The same area can have different whole-number side lengths; regroup factors to find related rectangles.',
    teacherEditionBasis: `${te}, pages 138-149.`,
    contrast: 'Move parentheses to regroup factors while keeping the product the same.',
    summary: 'Regroup factors to find different rectangles with the same area.',
    sourceNote: `${sw}, Lesson 11 Problem Set, printed pages 48-49; ${te}, Lesson 11 Answer Key, printed page 226.`,
    problems: [
      { number: 1, sourcePrompt: 'The rectangles below have the same area. Move the parentheses to find the unknown side lengths. Then, solve.', solvedAnswer: 'a. 6, 48; 48. b. 48, 48; 48. c. 24; 2, 24; 48; 48. d. 12; 4, 12; 48; 48. e. 16, 3; 16, 3; 48; 48.', equations: ['8 x 6 = 48', '1 x 48 = 48', '2 x 24 = 48', '4 x 12 = 48', '16 x 3 = 48'], quotient: 48 },
      { number: 2, sourcePrompt: 'Does Problem 1 show all the possible whole number side lengths for a rectangle with an area of 48 square centimeters? How do you know?', solvedAnswer: 'Yes; answers will vary.', quotient: 48 },
      { number: 3, sourcePrompt: 'In Problem 1, what happens to the shape of the rectangle as the difference between the side lengths gets smaller?', solvedAnswer: 'Answers will vary.', quotient: 1 },
      { number: 4, sourcePrompt: 'a. Find the area of the rectangle below. b. Julius says a 4 cm by 18 cm rectangle has the same area as the rectangle in Part (a). Place parentheses in the equation to find the related fact and solve. Is Julius correct? Why or why not? c. Use the expression 8 x 9 to find different side lengths for a rectangle that has the same area as the rectangle in Part (a). Show your equations using parentheses. Then, estimate to draw the rectangle and label the side lengths.', solvedAnswer: 'a. 72 sq cm. b. 8, 9; 72; 72; yes; answers will vary. c. Answers will vary.', equations: ['8 x 9 = 72', '4 x 18 = 72'], quotient: 72 }
    ]
  }),
  12: makeLesson({
    title: 'Lesson 12 concept: solve area word problems',
    concept: 'Area word problems may ask for area, a missing side length, or a pattern of growing square figures.',
    teacherEditionBasis: `${te}, pages 150-160.`,
    contrast: 'Decide whether the problem asks for area or side length before choosing multiplication or division.',
    summary: 'Use area models and side lengths to solve word problems.',
    sourceNote: `${sw}, Lesson 12 Problem Set, printed pages 52-53; ${te}, Lesson 12 Answer Key, printed pages 227-228.`,
    problems: [
      { number: 1, sourcePrompt: 'Each side on a sticky note measures 9 centimeters. What is the area of the sticky note?', solvedAnswer: '81 sq cm.', equations: ['9 x 9 = 81'], quotient: 81 },
      { number: 2, sourcePrompt: 'Stacy tiles the rectangle below using her square pattern blocks. Find the area of Stacy\'s rectangle in square units. Then, draw and label a different rectangle with whole number side lengths that has the same area. Can you draw another rectangle with different whole number side lengths and have the same area? Explain how you know.', solvedAnswer: 'a. 12 sq units; answers will vary. b. Yes; answers will vary.', equations: ['area = 12 square units'], quotient: 12 },
      { number: 3, sourcePrompt: 'An artist paints a 4 foot x 16 foot mural on a wall. What is the total area of the mural? Use the break apart and distribute strategy.', solvedAnswer: '64 sq ft.', equations: ['4 x 16 = 64', '40 + 24 = 64'], quotient: 64 },
      { number: 4, sourcePrompt: 'Alana tiles the 3 figures below. She says, "I\'m making a pattern!" Find the area of Alana\'s 3 figures and explain her pattern. Draw the next 2 figures in Alana\'s pattern and find their areas.', solvedAnswer: 'a. 4 sq units, 9 sq units, 16 sq units; explanations will vary. b. 5 by 5 and 6 by 6 rectangles drawn; 25 sq units, 36 sq units.', equations: ['2 x 2 = 4', '3 x 3 = 9', '4 x 4 = 16', '5 x 5 = 25', '6 x 6 = 36'], quotient: 36 },
      { number: 5, sourcePrompt: 'Jermaine glues 3 identical pieces of paper as shown below and makes a square. Find the unknown side length of 1 piece of paper. Then, find the total area of 2 pieces of paper.', solvedAnswer: '3 cm; 54 sq cm.', equations: ['9 divided by 3 = 3', '2 x 27 = 54'], quotient: 54 }
    ]
  }),
  13: makeLesson({
    title: 'Lesson 13 concept: decompose composite figures',
    concept: 'Composite figures can be decomposed into rectangles or completed into a larger rectangle with a part removed.',
    teacherEditionBasis: `${te}, pages 161-172.`,
    contrast: 'Add rectangle parts or subtract a missing rectangle from a larger rectangle.',
    summary: 'Find composite area by adding or subtracting rectangle areas.',
    sourceNote: `${sw}, Lesson 13 Problem Set, printed pages 56-57; ${te}, Lesson 13 Answer Key, printed page 229.`,
    problems: [
      { number: 1, sourcePrompt: 'Each of the following figures is made up of 2 rectangles. Find the total area of each figure.', solvedAnswer: '9, 27; 18, 15, 33; 9, 21, 30; answers will vary, 55.', equations: ['area part + area part = total area'], quotient: 55 },
      { number: 2, sourcePrompt: 'The figure shows a small rectangle cut out of a bigger rectangle. Find the area of the shaded figure.', solvedAnswer: '90, 12, 78; 78.', equations: ['90 - 12 = 78'], quotient: 78 },
      { number: 3, sourcePrompt: 'The figure shows a small rectangle cut out of a big rectangle. Label the unknown measurements, find the big and small rectangle areas, and find the area of the shaded figure.', solvedAnswer: 'a. 5, 4. b. 7, 9, 63. c. 4, 5, 20. d. 43 sq cm.', equations: ['63 - 20 = 43'], quotient: 43 }
    ]
  }),
  14: makeLesson({
    title: 'Lesson 14 concept: choose a composite-area strategy',
    concept: 'Composite figures can be solved by decomposing into rectangles or subtracting a missing rectangle from a larger one.',
    teacherEditionBasis: `${te}, pages 173-184.`,
    contrast: 'Choose the strategy that fits the figure and keep units consistent.',
    summary: 'Use decomposition or subtraction to solve composite-area problems.',
    sourceNote: `${sw}, Lesson 14 Problem Set, printed pages 61-62; ${te}, Lesson 14 Answer Key, printed page 230.`,
    problems: [
      { number: 1, sourcePrompt: 'Find the area of each of the following figures. All figures are made up of rectangles.', solvedAnswer: 'a. 19 sq cm. b. 10 sq m.', equations: ['figure a = 19 sq cm', 'figure b = 10 sq m'], quotient: 19 },
      { number: 2, sourcePrompt: 'The figure below shows a small rectangle in a big rectangle. Find the area of the shaded part of the figure.', solvedAnswer: '24 sq m.', equations: ['shaded area = 24 sq m'], quotient: 24 },
      { number: 3, sourcePrompt: 'A paper rectangle has a length of 6 inches and a width of 8 inches. A square with a side length of 3 inches was cut out of it. What is the area of the remaining paper?', solvedAnswer: '39 sq in.', equations: ['6 x 8 = 48', '3 x 3 = 9', '48 - 9 = 39'], quotient: 39 },
      { number: 4, sourcePrompt: 'Tila and Evan both have paper rectangles measuring 6 cm by 9 cm. Tila cuts a 3 cm by 4 cm rectangle out of hers, and Evan cuts a 2 cm by 6 cm rectangle out of his. Tila says she has more paper left over. Evan says they have the same amount. Who is correct? Show your work below.', solvedAnswer: 'Evan; explanations will vary.', equations: ['6 x 9 = 54', '3 x 4 = 12', '2 x 6 = 12'], quotient: 42 }
    ]
  }),
  15: makeLesson({
    title: 'Lesson 15 concept: find areas in a floor plan',
    concept: 'A floor plan can be measured by decomposing rooms into rectangles and using side lengths to find area.',
    teacherEditionBasis: `${te}, pages 185-195.`,
    contrast: 'Infer side lengths from shared boundaries and add room areas for the whole plan.',
    summary: 'Use rectangle area strategies to find each room and the whole floor plan.',
    sourceNote: `${sw}, Lesson 15 Problem Set, printed pages 65-67; ${te}, Lesson 15 Answer Key, printed pages 231-232.`,
    problems: [
      { number: 1, sourcePrompt: 'Make a prediction: Which room looks like it has the biggest area?', solvedAnswer: 'Answers will vary.', quotient: 1, roomAreas: M4_LESSON15_ROOM_AREAS },
      { number: 2, sourcePrompt: 'Record the areas and show the strategy you used to find each area.', solvedAnswer: '60; 56; 42; 24; 25; 28; 88; strategies will vary.', equations: ['60 + 56 + 42 + 24 + 25 + 28 + 88 = 323'], quotient: 323, roomAreas: M4_LESSON15_ROOM_AREAS },
      { number: 3, sourcePrompt: 'Which room has the biggest area? Was your prediction right? Why or why not?', solvedAnswer: 'Living room; yes or no; answers will vary.', quotient: 88, roomAreas: M4_LESSON15_ROOM_AREAS },
      { number: 4, sourcePrompt: 'Find the side lengths of the house without using your ruler to measure them, and explain the process you used.', solvedAnswer: '19, 17; answers will vary.', equations: ['side lengths = 19 cm and 17 cm'], quotient: 19, roomAreas: M4_LESSON15_ROOM_AREAS },
      { number: 5, sourcePrompt: 'What is the area of the whole floor plan? How do you know?', solvedAnswer: '323; answers will vary.', equations: ['60 + 56 + 42 + 24 + 25 + 28 + 88 = 323'], quotient: 323, roomAreas: M4_LESSON15_ROOM_AREAS }
    ]
  }),
  16: makeLesson({
    title: 'Lesson 16 concept: design rooms with required areas',
    concept: 'Given a required area, choose whole-number side lengths or decompositions that produce that area.',
    teacherEditionBasis: `${te}, pages 196-204.`,
    contrast: 'Many answers are valid, but each design must show side lengths whose areas equal the required area.',
    summary: 'Design a floor plan by choosing side lengths and checking each required area.',
    sourceNote: `${sw}, Lesson 16 Problem Set, printed pages 69-70; ${te}, Lesson 16 Answer Key, printed page 233.`,
    problems: [
      { number: 1, sourcePrompt: 'Record the new side lengths you have chosen for each of the rooms and show that these side lengths equal the required area. For non-rectangular rooms, record the side lengths and areas of the small rectangles. Then, show how the areas of the small rectangles equal the required area. Room new side lengths: Bedroom 1: 60 sq cm; Bedroom 2: 56 sq cm; Kitchen: 42 sq cm; Hallway: 24 sq cm; Bathroom: 25 sq cm; Dining Room: 28 sq cm; Living Room: 88 sq cm.', solvedAnswer: 'Answers will vary.', equations: ['Bedroom 1 = 60 sq cm', 'Bedroom 2 = 56 sq cm', 'Kitchen = 42 sq cm', 'Hallway = 24 sq cm', 'Bathroom = 25 sq cm', 'Dining Room = 28 sq cm', 'Living Room = 88 sq cm'], quotient: 88, roomAreas: M4_LESSON15_ROOM_AREAS }
    ]
  })
};
