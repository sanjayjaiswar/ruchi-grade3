import type {
  ProblemSetAreaModel,
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetPatternBlockCover,
  ProblemSetRoomArea,
  ProblemVisualSpec
} from '../lesson-runtime.types';

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
    const match = equation.match(/\b(\d+)\s*x\s*(\d+)\s*=\s*(\d+)\b/);
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
    const match = equation.match(/\b(\d+)\s*x\s*(\d+)\s*=\s*(\d+)\b/);
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
      return `${trimmed} = ____`;
    }
    return undefined;
  }

  const [leftRaw, ...rightParts] = trimmed.split('=');
  const left = leftRaw.trim();
  const right = rightParts.join('=').trim();
  const leftHasAdditiveWork = /[+-]/.test(left);
  const leftIsAnswerLabel = /area|shape|figure|side lengths|factor pair product|bedroom|kitchen|hallway|bathroom|dining room|living room|missing tiles|shaded/i.test(left);
  const leftTemplate = leftHasAdditiveWork || leftIsAnswerLabel ? maskNumbers(left) : left;
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
  const areaModels = seed.areaModels ?? sourceAreaModels(seed.equations, seed.unitLabel ?? 'square units');
  const hasMultipleAreaModels = areaModels.length > 1;
  const blankVisualType = seed.blankVisualType
    ?? (seed.patternBlockCover
      ? 'pattern-block-cover-template'
      : seed.roomAreas
      ? 'floor-plan-template'
      : hasMultipleAreaModels
      ? 'area-models-template'
      : factorPair
      ? 'array-template'
      : 'open-workspace');
  const animationType = seed.animationType
    ?? (seed.patternBlockCover
      ? 'pattern-block-cover'
      : seed.roomAreas
      ? 'floor-plan-model'
      : hasMultipleAreaModels
      ? 'area-models'
      : factorPair
      ? 'array-model'
      : 'two-step-model');
  const knownGroupCount = seed.knownGroupCount ?? factorPair?.rows;
  const knownGroupSize = seed.knownGroupSize ?? factorPair?.columns;

  return {
    number: seed.number,
    sourcePrompt: seed.sourcePrompt,
    sourcePageImages: seed.sourcePageImages,
    blankSourcePageImages: seed.blankSourcePageImages,
    solvedSourcePageImages: seed.solvedSourcePageImages,
    blankPrompts: [
      seed.patternBlockCover
        ? `Cover each Teacher Edition target with ${seed.patternBlockCover.unit} pattern blocks, then write the count for each target.`
        : seed.roomAreas
        ? 'Use the Teacher Edition floor plan to compute each room area, compare the rooms, and add the room areas for the whole floor plan.'
        : hasMultipleAreaModels
        ? 'Complete each Teacher Edition rectangle model, label the side lengths, and write the matching area equation.'
        : factorPair
        ? `Build the source rectangle as ${factorPair.rows} rows of ${factorPair.columns} unit squares, then complete the workbook labels and area blanks.`
        : 'Use the official workbook prompt to complete the drawing, labels, equations, and response blanks.'
    ],
    blankEquations: blankEquationTemplates(seed),
    blankWorkspaceLabel: seed.patternBlockCover
      ? 'Target outlines and block counts come from the Teacher Edition Problem Set and answer key.'
      : seed.roomAreas
      ? 'Use the Teacher Edition room areas and side lengths; the floor plan is solved by decomposing rooms into rectangles.'
      : hasMultipleAreaModels
      ? 'Each rectangle below represents one Teacher Edition area model from the problem.'
      : factorPair
      ? `Show ${factorPair.rows} rows and ${factorPair.columns} columns from the official area model.`
      : 'Use the official workbook scaffold or figure; preserve its labels, blanks, and units.',
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

function createM4ProblemVisual(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec {
  const sections: ProblemVisualSpec['sections'] = [];
  const sourceNote = solved
    ? 'Solved view uses the Module 4 Teacher Edition answer key with authored area visuals and unit checks.'
    : 'Blank view keeps the official Problem Set workspace open with authored visuals and no source-page images.';

  if (problem.patternBlockCover) {
    sections.push(...m4PatternBlockSections(problem, solved));
  } else if (problem.roomAreas?.length) {
    sections.push(m4RoomAreaSection(problem, solved));
  } else if (problem.areaModels?.length) {
    sections.push(...m4AreaModelSections(problem, solved));
  } else if (problem.blankVisualType === 'array-template' || problem.animationType === 'array-model') {
    sections.push(...m4ArraySections(problem, solved));
  } else {
    sections.push(m4OpenWorkspaceSection(problem, solved));
  }

  sections.push({
    kind: 'equations',
    label: solved ? 'Solved area work' : 'Student work blanks',
    lines: solved ? problem.equations : problem.blankEquations?.length ? problem.blankEquations : blankEquationTemplatesFromLines(problem.equations)
  });

  sections.push({
    kind: 'note',
    label: solved ? 'Teacher Edition answer' : 'Source workspace direction',
    text: solved ? problem.solvedAnswer : problem.blankWorkspaceLabel ?? 'Complete the official Problem Set figure, labels, equations, and answer sentence.'
  });

  return {
    title: `Problem ${problem.number}: ${m4VisualTitle(problem)}`,
    sourceNote,
    sections
  };
}

function m4PatternBlockSections(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'] {
  const cover = problem.patternBlockCover;
  if (!cover) {
    return [m4OpenWorkspaceSection(problem, solved)];
  }

  const rows = cover.targets.map((target) => [
    target.label,
    target.shape,
    solved ? `${target.count} ${m4PatternBlockUnitLabel(cover.unit, target.count)}` : `____ ${m4PatternBlockUnitLabel(cover.unit, target.count)}`
  ]);

  return [
    {
      kind: 'data-table',
      label: solved ? `${cover.unit} cover counts` : `${cover.unit} cover workspace`,
      columns: ['Target', 'Official outline', 'Unit count'],
      rows
    },
    {
      kind: 'array',
      label: solved ? 'Visible unit count model' : 'Unit-count workspace',
      rows: cover.targets.length,
      columns: boundedM4Count(Math.max(...cover.targets.map((target) => target.count)), 1, 12),
      item: 'dot',
      placeholder: solved ? undefined : ''
    }
  ];
}

function m4PatternBlockUnitLabel(unit: ProblemSetPatternBlockCover['unit'], count: number): string {
  if (count === 1) {
    return unit;
  }
  return unit === 'rhombus' ? 'rhombuses' : `${unit}s`;
}

function m4RoomAreaSection(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'][number] {
  const rooms = problem.roomAreas ?? [];
  const total = rooms.reduce((sum, room) => sum + room.area, 0);
  return {
    kind: 'data-table',
    label: solved ? 'Solved floor-plan room areas' : 'Blank floor-plan room area table',
    columns: ['Room', 'Area', 'Check'],
    rows: rooms.map((room) => [
      room.label,
      solved ? `${room.area} sq cm` : '____ sq cm',
      solved ? `${room.label} contributes to ${total} sq cm total` : 'length x width = ____'
    ])
  };
}

function m4AreaModelSections(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'] {
  return (problem.areaModels ?? []).flatMap((model) => [
    {
      kind: 'array' as const,
      label: solved
        ? `${model.label}: ${model.rows} x ${model.columns} = ${model.total ?? model.rows * model.columns}`
        : `${model.label}: ${model.rows} by ${model.columns} area model`,
      rows: boundedM4Count(model.rows, 1, 12),
      columns: boundedM4Count(model.columns, 1, 12),
      item: 'dot' as const,
      placeholder: solved ? undefined : ''
    }
  ]);
}

function m4ArraySections(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'] {
  const factorPair = sourceFactorPair(problem.equations);
  const rows = boundedM4Count(problem.knownGroupCount ?? factorPair?.rows, 1, 12);
  const columns = boundedM4Count(problem.knownGroupSize ?? factorPair?.columns, 1, 12);

  return [
    {
      kind: 'array',
      label: solved
        ? `${rows} by ${columns} rectangle area`
        : `${rows} by ${columns} rectangle workspace`,
      rows,
      columns,
      item: 'dot',
      placeholder: solved ? undefined : ''
    }
  ];
}

function m4OpenWorkspaceSection(problem: ProblemSetCenteredProblem, solved: boolean): ProblemVisualSpec['sections'][number] {
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

function blankEquationTemplatesFromLines(equations?: string[]): string[] {
  const templates = (equations ?? []).map(blankEquationTemplate).filter((template): template is string => Boolean(template));
  return templates.length ? templates : ['____ = ____'];
}

function boundedM4Count(value: number | undefined, min: number, max: number): number {
  if (!value || !Number.isFinite(value)) {
    return min;
  }

  return Math.max(min, Math.min(max, Math.round(value)));
}

function m4VisualTitle(problem: ProblemSetCenteredProblem): string {
  if (problem.patternBlockCover) {
    return `${problem.patternBlockCover.unit} pattern-block area`;
  }
  if (problem.roomAreas?.length) {
    return 'floor-plan area';
  }
  if (problem.areaModels?.length) {
    return `${problem.areaModels.length} area model${problem.areaModels.length === 1 ? '' : 's'}`;
  }
  if (problem.quotient && problem.unitLabel) {
    return `${problem.quotient} ${problem.unitLabel}`;
  }
  return problem.sourcePrompt;
}

function makeLesson(seed: LessonSeed): ProblemSetCenteredLesson {
  const sourcePageImages = teacherEditionLessonPages(seed.teacherEditionBasis);
  const answerKeyImages = teacherEditionAnswerKeyPages(seed.sourceNote);

  return {
    title: seed.title,
    concept: seed.concept,
    teacherEditionBasis: seed.teacherEditionBasis,
    contrast: seed.contrast,
    summary: seed.summary,
    sourceNote: seed.sourceNote,
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: [...sourcePageImages, ...answerKeyImages],
    conceptSections: [
      {
        title: '1. Teacher Edition concept',
        body: seed.concept,
        teacherSource: seed.teacherEditionBasis,
        checkpoints: ['Name the unit square or side lengths.', 'Use the workbook figure as the source model.', 'State area answers in square units.']
      },
      {
        title: '2. Problem Set focus',
        body: 'Blank mode keeps the official Student Workbook prompts and visual scaffolds. Solved mode completes the same items with Teacher Edition answer-key values.',
        teacherSource: seed.sourceNote,
        checkpoints: ['Do not replace workbook items with invented problems.', 'Use the answer key for solved values.', 'Check explanations against the source figure.']
      },
      {
        title: '3. Validation focus',
        body: seed.contrast,
        teacherSource: 'Teacher Edition Student Debrief guidance for the lesson.',
        checkpoints: ['Check side lengths before multiplying.', 'Check decomposed parts against the whole.', 'Check written units and answer meaning.']
      }
    ],
    problems: seed.problems.map((problemSeed) => {
      const centeredProblem = makeProblem({
        ...problemSeed,
        sourcePageImages: problemSeed.sourcePageImages ?? sourcePageImages,
        blankSourcePageImages: problemSeed.blankSourcePageImages ?? sourcePageImages,
        solvedSourcePageImages: problemSeed.solvedSourcePageImages ?? [...sourcePageImages, ...answerKeyImages]
      });

      return {
        ...centeredProblem,
        blankVisual: createM4ProblemVisual(centeredProblem, false),
        solvedVisual: createM4ProblemVisual(centeredProblem, true)
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
      { number: 6, sourcePrompt: 'Use trapezoid pattern blocks to cover the rectangle in Problem 5. Can you use trapezoid pattern blocks to measure the area of this rectangle? Explain your answer.', solvedAnswer: 'No, because you cannot have gaps or overlaps when measuring area.', quotient: 0 }
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
      { number: 3, sourcePrompt: 'How would the rectangles in Problem 1 be different if they were composed of square inches? Select one rectangle from Problem 1 and recreate it on square inch and square centimeter grid paper.', solvedAnswer: 'Answers will vary.', quotient: 1 },
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
      { number: 1, sourcePrompt: 'Draw to find the number of rows and columns in each array. Match it to its completed array. Then, fill in the blanks to make a true equation to find each array\'s area.', solvedAnswer: 'a. 5 cm by 6 cm, 30. b. 3 cm by 7 cm, 21. c. 5 cm by 3 cm, 15. d. 4 cm by 5 cm, 20. e. 2 cm by 6 cm, 12. f. 4 cm by 3 cm, 12.', equations: ['5 x 6 = 30', '3 x 7 = 21', '5 x 3 = 15', '4 x 5 = 20', '2 x 6 = 12', '4 x 3 = 12'], quotient: 30 },
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
      { number: 1, sourcePrompt: 'Use a straight edge to draw a grid of equal size squares within the rectangle. Find and label the side lengths. Then, multiply the side lengths to find the area.', solvedAnswer: 'A: 3 x 4 = 12. B: 5 x 4 = 20. C: 2 x 7 = 14. D: 7 x 4 = 28. E: 1 x 3 = 3. F: 4 x 2 = 8.', equations: ['3 x 4 = 12', '5 x 4 = 20', '2 x 7 = 14', '7 x 4 = 28', '1 x 3 = 3', '4 x 2 = 8'], quotient: 28 },
      { number: 2, sourcePrompt: 'The area of Benjamin\'s bedroom floor is shown on the grid to the right. Label the side lengths, draw a grid, and find the total number of squares.', solvedAnswer: 'Side lengths labeled as 9 feet and 11 feet; grid lines drawn; 99.', equations: ['9 x 11 = 99'], quotient: 99 },
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
      { number: 1, sourcePrompt: 'Cut the grid into 2 equal rectangles. Draw and label the side lengths, write an equation for 1 rectangle, and write an equation to show the total area of the 2 rectangles.', solvedAnswer: '2 rectangles drawn; 5 cm, 10 cm labeled. 5 cm x 10 cm = 50 sq cm. 50 sq cm + 50 sq cm = 100 sq cm.', equations: ['5 x 10 = 50', '50 + 50 = 100'], quotient: 100 },
      { number: 2, sourcePrompt: 'Place your 2 equal rectangles side by side to create a new, longer rectangle. Draw an area model, label the side lengths, and find the total area.', solvedAnswer: 'Rectangle drawn; 5 cm, 20 cm labeled; 100 sq cm.', equations: ['5 x 20 = 100'], quotient: 100 },
      { number: 3, sourcePrompt: 'Furaha and Rahema use square tiles to make rectangles. Label side lengths, find each area, combine the rectangles, and decide whether the new area is 52 square units.', solvedAnswer: '4, 6; 4, 7; 24 sq units; 28 sq units. Combined rectangle: 4, 13. Rahema is right; explanations will vary.', equations: ['4 x 6 = 24', '4 x 7 = 28', '24 + 28 = 52'], quotient: 52 },
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
      { number: 4, sourcePrompt: 'Find the area of the rectangle. Check Julius\'s 4 cm by 18 cm rectangle. Use the expression 8 x 9 to find different side lengths for a rectangle with the same area.', solvedAnswer: 'a. 72 sq cm. b. 8, 9; 72; 72; yes; answers will vary. c. Answers will vary.', equations: ['8 x 9 = 72', '4 x 18 = 72'], quotient: 72 }
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
      { number: 1, sourcePrompt: 'Make a prediction: Which room looks like it has the biggest area?', solvedAnswer: 'Answers will vary.', quotient: 1 },
      { number: 2, sourcePrompt: 'Record the areas and show the strategy you used to find each area.', solvedAnswer: '60; 56; 42; 24; 25; 28; 88; strategies will vary.', equations: ['60 + 56 + 42 + 24 + 25 + 28 + 88 = 323'], quotient: 323, roomAreas: [{ label: 'Bedroom 1', area: 60 }, { label: 'Bedroom 2', area: 56 }, { label: 'Kitchen', area: 42 }, { label: 'Hallway', area: 24 }, { label: 'Bathroom', area: 25 }, { label: 'Dining Room', area: 28 }, { label: 'Living Room', area: 88 }] },
      { number: 3, sourcePrompt: 'Which room has the biggest area? Was your prediction right? Why or why not?', solvedAnswer: 'Living room; yes or no; answers will vary.', quotient: 88 },
      { number: 4, sourcePrompt: 'Find the side lengths of the house without using your ruler to measure them, and explain the process you used.', solvedAnswer: '19, 17; answers will vary.', equations: ['side lengths = 19 cm and 17 cm'], quotient: 19 },
      { number: 5, sourcePrompt: 'What is the area of the whole floor plan? How do you know?', solvedAnswer: '323; answers will vary.', equations: ['60 + 56 + 42 + 24 + 25 + 28 + 88 = 323'], quotient: 323 }
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
      { number: 1, sourcePrompt: 'Record the new side lengths you have chosen for Bedroom 1 and show that these side lengths equal the required area of 60 sq cm.', solvedAnswer: 'Answers will vary.', equations: ['factor pair product = 60 sq cm'], quotient: 60 },
      { number: 2, sourcePrompt: 'Record the new side lengths you have chosen for Bedroom 2 and show that these side lengths equal the required area of 56 sq cm.', solvedAnswer: 'Answers will vary.', equations: ['factor pair product = 56 sq cm'], quotient: 56 },
      { number: 3, sourcePrompt: 'Record the new side lengths you have chosen for Kitchen and show that these side lengths equal the required area of 42 sq cm.', solvedAnswer: 'Answers will vary.', equations: ['factor pair product = 42 sq cm'], quotient: 42 },
      { number: 4, sourcePrompt: 'Record the new side lengths for Hallway, Bathroom, Dining Room, and Living Room, and show each room equals its required area.', solvedAnswer: 'Answers will vary.', equations: ['Hallway = 24 sq cm', 'Bathroom = 25 sq cm', 'Dining Room = 28 sq cm', 'Living Room = 88 sq cm'], quotient: 88 }
    ]
  })
};
