import type {
  ProblemSetAreaModel,
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetPatternBlockCover,
  ProblemSetRoomArea,
  ProblemVisualFloorPlanSection,
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

const M4_LESSON15_ROOM_AREAS: ProblemSetRoomArea[] = [
  { label: 'Bedroom 1', area: 60 },
  { label: 'Bedroom 2', area: 56 },
  { label: 'Kitchen', area: 42 },
  { label: 'Hallway', area: 24 },
  { label: 'Bathroom', area: 25 },
  { label: 'Dining Room', area: 28 },
  { label: 'Living Room', area: 88 }
];

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
    sourcePageImages: seed.sourcePageImages,
    blankSourcePageImages: seed.blankSourcePageImages,
    solvedSourcePageImages: seed.solvedSourcePageImages,
    blankPrompts: [
      seed.patternBlockCover
        ? `Cover each official Problem Set target with ${seed.patternBlockCover.unit} pattern blocks, then write the count for each target.`
        : seed.roomAreas
        ? 'Use the official floor-plan labels to compute each room area, compare the rooms, and add the room areas for the whole floor plan.'
        : hasMultipleAreaModels
        ? 'Complete each official rectangle model, label the side lengths, and write the matching area equation.'
        : seed.knownGroupCount && seed.knownGroupSize
        ? 'Use the source rectangle workspace, measure or label the side lengths, then complete the workbook labels and area blanks.'
        : sourceSpecificBlankWorkspaceLabel({ number: seed.number, sourcePrompt: seed.sourcePrompt } as ProblemSetCenteredProblem)
    ],
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
      lines: solved ? problem.equations : problem.blankEquations?.length ? problem.blankEquations : blankEquationTemplatesFromLines(problem.equations)
    });
  }

  sections.push({
    kind: 'note',
    label: solved ? 'Teacher Edition answer' : 'Source workspace direction',
    text: solved ? problem.solvedAnswer : problem.blankWorkspaceLabel ?? sourceSpecificBlankWorkspaceLabel(problem)
  });

  return {
    title: `Problem ${problem.number}: ${m4VisualTitle(problem, solved)}`,
    sourceNote,
    sections
  };
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
  const sourcePageImages = teacherEditionLessonPages(teacherEditionBasis);
  const answerKeyImages = teacherEditionAnswerKeyPages(seed.sourceNote);

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
      const centeredProblem = makeProblem({
        ...problemSeed,
        sourcePageImages: problemSeed.sourcePageImages ?? sourcePageImages,
        blankSourcePageImages: problemSeed.blankSourcePageImages ?? sourcePageImages,
        solvedSourcePageImages: problemSeed.solvedSourcePageImages ?? [...sourcePageImages, ...answerKeyImages]
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
