import type { LessonStep } from '../curriculum.types';

export type StudentWorkSupport = {
  answer: string;
  teacherLookFor: string;
};

export type InfoRow = {
  label: string;
  value: string;
};

export type ArrayDecompositionLessonModel = {
  title: string;
  totalGroups: number;
  groupSize: number;
  firstPart: number;
  secondPart: number;
  context: string;
  equation: string;
  teacherPrompt: string;
};

export type SourceVisualFacts = {
  groupCount: number;
  groupSize: number;
  rowCount: number;
  columnCount: number;
  tapePartCount: number;
  tapePartLabel: string;
  tapeWholeLabel: string;
  tapeCaption: string;
};

export type SourceWorkspaceModel = {
  problemNumber: number;
  kind: 'problem1-guided' | 'blank-array-tape' | 'blank-workspace';
  arrayPrompt: string;
  equationTemplate?: string;
  tapePartCount?: number;
  firstUnitItemCount?: number;
  tapePrompt?: string;
  lowerLabelPrompt?: string;
};

export type LessonAnimationModel = {
  kind:
    | 'equal-groups'
    | 'array'
    | 'tape-diagram'
    | 'number-line'
    | 'clock'
    | 'measurement'
    | 'area-model'
    | 'fraction-strip'
    | 'graph'
    | 'geometry';
  title: string;
  context: string;
  equation: string;
  teacherPrompt: string;
  groupCount?: number;
  groupSize?: number;
  rowCount?: number;
  columnCount?: number;
  tapePartCount?: number;
  tapePartLabel?: string;
  tapeWholeLabel?: string;
  firstPart?: number;
  secondPart?: number;
  numberLineLabels?: string[];
  numberLineJumps?: string[];
  clockLabels?: string[];
  measurementTicks?: string[];
  areaRows?: number;
  areaColumns?: number;
  fractionPartCount?: number;
  fractionShadedCount?: number;
  graphBars?: { label: string; value: number }[];
  geometryLabels?: string[];
  focus: string[];
};

export type ProblemSetAnimationType =
  | 'grouping-by-size'
  | 'equal-sharing'
  | 'tape-split'
  | 'fact-match'
  | 'array-model'
  | 'area-models'
  | 'pattern-block-cover'
  | 'floor-plan-model'
  | 'decompose-array'
  | 'two-step-model'
  | 'fraction-strip-model'
  | 'number-line-model'
  | 'fraction-concrete-model'
  | 'paper-partition-model'
  | 'clock-model'
  | 'data-display-model';

export type ProblemSetBlankVisualType =
  | 'object-bank'
  | 'equal-containers'
  | 'fact-match'
  | 'tape-diagram'
  | 'bar-units'
  | 'share-tape'
  | 'array-template'
  | 'area-models-template'
  | 'pattern-block-cover-template'
  | 'floor-plan-template'
  | 'equation-workspace'
  | 'fraction-strip-template'
  | 'number-line-template'
  | 'fraction-concrete-template'
  | 'paper-partition-template'
  | 'clock-workspace'
  | 'data-table-template'
  | 'tally-picture-graph-template'
  | 'vertical-tape-display-template'
  | 'bar-graph-template'
  | 'ruler-template'
  | 'line-plot-template'
  | 'open-workspace';

export type DataDisplayPoint = {
  label: string;
  value?: number;
  valueLabel?: string;
};

export type ProblemSetDataDisplay = {
  kind: 'tally-picture' | 'vertical-tape' | 'bar-graph' | 'ruler' | 'line-plot' | 'picture-graph' | 'data-table';
  title: string;
  axisLabel?: string;
  keyLabel?: string;
  scaleLabel?: string;
  categories?: string[];
  values?: DataDisplayPoint[];
  ticks?: string[];
  maxValue?: number;
  interval?: number;
  unitSize?: number;
  showBlankValues?: boolean;
  sourceData?: string[];
  sourceDataRows?: string[][];
  rows?: string[][];
  columns?: string[];
  note?: string;
};

export type ProblemSetFactMatch = {
  dividend: number;
  divisor: number;
  quotient: number;
};

export type ProblemSetFractionModel = {
  label: string;
  numerator: number;
  denominator: number;
};

export type ProblemSetNumberLineModel = {
  label: string;
  denominator: number;
  startLabel?: string;
  endLabel?: string;
  tickLabels?: string[];
  targetNumerators?: number[];
};

export type ProblemSetPaperPartitionModel = {
  title: string;
  denominator: number;
  paperSpacesPerUnit: number;
  stripLabel: string;
  challengeUnits: string[];
  steps: string[];
};

export type ProblemSetConcreteFractionItem = {
  label: string;
  numerator?: number;
  denominator?: number;
  blankNumerator?: number;
  blankDenominator?: number;
  lineCount?: number;
  blankLineCount?: number;
  unitName?: string;
};

export type ProblemSetConcreteFractionModel = {
  kind: 'beaker-set' | 'string-cheese-bars' | 'partition-rectangles' | 'paper-sheets' | 'measured-strip';
  title: string;
  prompt: string;
  items?: ProblemSetConcreteFractionItem[];
  totalLength?: number;
  pieceLength?: number;
  unit?: string;
  notice?: string;
};

export type ProblemSetAreaModel = {
  label: string;
  rows: number;
  columns: number;
  unitLabel?: string;
  total?: number;
};

export type ProblemSetPatternBlockCover = {
  unit: 'triangle' | 'rhombus' | 'trapezoid' | 'square';
  targets: Array<{
    label: string;
    shape: 'parallelogram' | 'hexagon' | 'rectangle';
    count: number;
  }>;
};

export type ProblemSetRoomArea = {
  label: string;
  area: number;
};

export type ProblemSetCenteredProblem = {
  number: number;
  sourcePrompt: string;
  sourcePageImages?: string[];
  blankSourcePageImages?: string[];
  solvedSourcePageImages?: string[];
  fractionModels?: ProblemSetFractionModel[];
  numberLineModels?: ProblemSetNumberLineModel[];
  paperPartitionModel?: ProblemSetPaperPartitionModel;
  concreteFractionModel?: ProblemSetConcreteFractionModel;
  areaModels?: ProblemSetAreaModel[];
  patternBlockCover?: ProblemSetPatternBlockCover;
  roomAreas?: ProblemSetRoomArea[];
  blankPrompts?: string[];
  blankEquations?: string[];
  blankAnswerSentence?: string;
  blankWorkspaceLabel?: string;
  blankVisualType?: ProblemSetBlankVisualType;
  dataDisplay?: ProblemSetDataDisplay;
  solvedDataDisplay?: ProblemSetDataDisplay;
  solvedAnswer: string;
  equations: string[];
  knownTotal?: number;
  knownGroupSize?: number;
  knownGroupCount?: number;
  quotient: number;
  quotientMeaning: string;
  animationType: ProblemSetAnimationType;
  unitLabel: string;
  groupLabel: string;
  explanation: string;
  validationChecks: string[];
  facts?: ProblemSetFactMatch[];
  shareLabels?: string[];
};

export type ProblemSetCenteredConceptSection = {
  title: string;
  body: string;
  teacherSource: string;
  checkpoints: string[];
};

export type ProblemSetCenteredLesson = {
  title: string;
  concept: string;
  teacherEditionBasis: string;
  contrast: string;
  summary: string;
  sourceNote: string;
  sourcePageImages?: string[];
  blankSourcePageImages?: string[];
  solvedSourcePageImages?: string[];
  conceptSections?: ProblemSetCenteredConceptSection[];
  problems: ProblemSetCenteredProblem[];
};

export type LessonRuntimeConfig = {
  conceptTerms?: string[];
  showMultiplicationDivisionVocabularyNote?: boolean;
  lessonAnimation?: LessonAnimationModel;
  problemSetCenteredLesson?: ProblemSetCenteredLesson;
  teacherEditionSteps?: LessonStep[];
  studentWorkSupport?: Record<number, StudentWorkSupport>;
  studentWorkEquations?: Record<number, string[]>;
  sourceWorkspaceModels?: Record<number, SourceWorkspaceModel>;
  sourceVisualFacts?: Record<string, SourceVisualFacts>;
  sourceRows?: Record<string, InfoRow[]>;
  arrayDecompositionModel?: ArrayDecompositionLessonModel;
  arrayDecompositionExamples?: ArrayDecompositionLessonModel[];
};
