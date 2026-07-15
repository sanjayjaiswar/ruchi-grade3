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
  commutativeTurn?: {
    rows: number;
    columns: number;
    total: number;
    rowEquation: string;
    columnEquation: string;
    factsFilled: number;
    factsLeft: number;
  };
  distributiveBuild?: {
    unitValue: number;
    knownGroups: number;
    extraGroups: number;
    knownFact: string;
    additionFact: string;
    targetFact: string;
    commutedFact: string;
    divisionBond?: {
      whole: number;
      divisor: number;
      firstPart: number;
      secondPart: number;
      firstQuotient: number;
      secondQuotient: number;
      totalQuotient: number;
    };
  };
  countByMakeTen?: {
    unit: number;
    values: number[];
    examples: Array<{
      start: number;
      bridgePart: number;
      leftoverPart: number;
      result: number;
    }>;
  };
  parenthesesCompare?: {
    baseExpression: string;
    cases: Array<{
      label: string;
      grouped: string;
      firstStep: string;
      result: string;
      note: string;
    }>;
  };
  associativeBuild?: {
    sourceExpression: string;
    factorization: string;
    regroupedExpression: string;
    innerFact: string;
    finalFact: string;
    groups: number;
    groupLabel: string;
    alternateFact: string;
  };
  unknownCases?: Array<{
    label: string;
    whole: string;
    known: string;
    unknown: string;
    equation: string;
    solution: string;
  }>;
  numberLineLabels?: string[];
  numberLineJumps?: string[];
  numberLineExamples?: Array<{
    label: string;
    lower: string;
    halfway: string;
    upper: string;
    target: string;
    rounded: string;
    targetPosition: number;
    direction: 'up' | 'down';
    distance: string;
  }>;
  estimateComparison?: {
    expression: string;
    actual: number | string;
    strategies: Array<{
      label: string;
      expression?: string;
      actual?: number | string;
      roundedExpression: string;
      estimate: number;
      error: number;
      movement?: string;
      best?: boolean;
    }>;
  };
  measurementChecks?: {
    steps: string[];
    rows: Array<{
      label: string;
      measured: string;
      rounded: string;
      estimate: string;
      exact: string;
      gap: string;
    }>;
  };
  placeValueAddition?: PlaceValueAdditionModel;
  placeValueSubtraction?: PlaceValueSubtractionModel;
  clockLabels?: string[];
  measurementTicks?: string[];
  areaRows?: number;
  areaColumns?: number;
  fractionPartCount?: number;
  fractionShadedCount?: number;
  graphBars?: { label: string; value: number }[];
  geometryLabels?: string[];
  conceptSteps?: Array<{
    label: string;
    action: string;
    result: string;
  }>;
  focus: string[];
};

export type PlaceValueAdditionModel = {
  unit: string;
  columns: string[];
  addends: Array<{
    label: string;
    digits: number[];
  }>;
  resultDigits: string[];
  regroupings: Array<{
    fromColumn: number;
    toColumn: number;
    label: string;
  }>;
  result: string;
};

export type PlaceValueSubtractionModel = {
  unit: string;
  columns: string[];
  minuendLabel: string;
  subtrahendLabel: string;
  beforeDigits: number[];
  afterDigits: number[];
  subtrahendDigits: number[];
  resultDigits: string[];
  decompositions: Array<{
    fromColumn: number;
    toColumn: number;
    label: string;
  }>;
  result: string;
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

export type ProblemSetRelatedFact = {
  label: string;
  targetFact: string;
  totalGroups: number;
  groupSize: number;
  firstPart: number;
  secondPart: number;
  knownFact: string;
  extraFact: string;
  blankEquation: string;
  solvedEquation: string;
  product: number;
};

export type ProblemSetRelatedFactMatch = {
  expression: string;
  fact: string;
  product: number;
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
  roundedNumerators?: number[];
  orientation?: 'horizontal' | 'vertical';
  targetMarker?: {
    label: string;
    position: number;
  };
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

export type ProblemVisualFloorPlanSection = {
  kind: 'floor-plan';
  label?: string;
  widthUnits: number;
  heightUnits: number;
  rooms: Array<{
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
    area?: number;
    lengthLabel?: string;
    widthLabel?: string;
    tone?: 'given' | 'target' | 'answer' | 'unknown';
  }>;
  caption?: string;
};

export type ProblemVisualLinePlotSection = {
  kind: 'line-plot';
  label?: string;
  values: Array<{
    label: string;
    value?: number;
    valueLabel?: string;
    target?: boolean;
  }>;
  axisLabel?: string;
  keyLabel?: string;
  showBlankValues?: boolean;
  caption?: string;
};

export type ProblemVisualDataChartSection = {
  kind: 'data-chart';
  chart: 'bar' | 'picture' | 'tally';
  label?: string;
  values: Array<{
    label: string;
    value?: number;
    valueLabel?: string;
    target?: boolean;
  }>;
  maxValue?: number;
  unitSize?: number;
  scaleLabel?: string;
  keyLabel?: string;
  showBlankValues?: boolean;
  caption?: string;
};

export type ProblemVisualGeometryDiagramSection = {
  kind: 'geometry-diagram';
  label?: string;
  diagram: 'rectangle' | 'polygon' | 'perimeter' | 'circle-string' | 'robot' | 'one-half' | 'composite';
  shapes: Array<{
    label: string;
    shape: 'rectangle' | 'square' | 'circle' | 'polygon' | 'l-shape' | 'triangle';
    x: number;
    y: number;
    width: number;
    height: number;
    sideLabels?: string[];
    valueLabel?: string;
    tone?: 'given' | 'target' | 'answer' | 'unknown';
  }>;
  caption?: string;
};

export type ProblemVisualArraySection = {
  kind: 'array';
  label?: string;
  rows: number;
  columns: number;
  item: 'dot' | 'butterfly' | 'circle' | 'glass' | 'square' | 'pattern';
  mode?: 'blank' | 'solved';
  placeholder?: string;
  rowLabels?: string[];
  splitAfterRows?: number;
  caption?: string;
};

export type ProblemVisualRelatedFactsSection = {
  kind: 'related-facts';
  label?: string;
  rows: Array<{
    left: string;
    right: string;
  }>;
};

export type ProblemVisualTapeSection = {
  kind: 'tape';
  label?: string;
  totalLabel: string;
  hideTotalLabel?: boolean;
  topParts?: Array<{
    label: string;
    sublabel?: string;
    startPart: number;
    partCount?: number;
  }>;
  parts: Array<{
    label: string;
    sublabel?: string;
    emphasize?: boolean;
    muted?: boolean;
  }>;
  braces?: Array<{
    label: string;
    boxLabel?: string;
    startPart: number;
    partCount: number;
  }>;
  caption?: string;
};

export type ProblemVisualNumberBondSection = {
  kind: 'number-bond';
  label?: string;
  whole: string;
  parts: Array<{
    label: string;
    sublabel?: string;
  }>;
  equations?: string[];
  caption?: string;
};

export type ProblemVisualFractionStripSection = {
  kind: 'fraction-strip';
  label?: string;
  wholeLabel: string;
  numerator: number;
  denominator: number;
  unitLabel?: string;
  caption?: string;
};

export type ProblemVisualEquationsSection = {
  kind: 'equations';
  label?: string;
  lines: string[];
};

export type ProblemVisualSolutionPartsSection = {
  kind: 'solution-parts';
  label?: string;
  parts: Array<{
    label: string;
    prompt: string;
    equation: string;
    answer: string;
  }>;
};

export type ProblemVisualDataTableSection = {
  kind: 'data-table';
  label?: string;
  columns: string[];
  rows: string[][];
};

export type ProblemVisualExpressionMatchSection = {
  kind: 'expression-match';
  label?: string;
  topLabel?: string;
  bottomLabel?: string;
  topItems: string[];
  bottomItems: string[];
  matches?: Array<{
    topIndex: number;
    bottomIndex: number;
    label?: string;
  }>;
  showMatches?: boolean;
  note?: string;
};

export type ProblemVisualNumberLineSection = {
  kind: 'number-line';
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  ticks: Array<{
    label: string;
    target?: boolean;
    rounded?: boolean;
  }>;
  targetMarker?: {
    label: string;
    position: number;
  };
  caption?: string;
};

export type ProblemVisualClockSection = {
  kind: 'clock';
  label?: string;
  timeLabel: string;
  timeValue?: string;
  caption?: string;
};

export type ProblemVisualNoteSection = {
  kind: 'note';
  label?: string;
  text: string;
};

export type ProblemVisualStopwatchSection = {
  kind: 'stopwatch-workspace';
  label?: string;
  prompt: string;
  answerLine?: string;
  sampleAnswer?: string;
  startLabel?: string;
  elapsedLabel?: string;
  stopLabel?: string;
  sampleWork?: string[];
  sourceWorkLabel?: string;
  sourceWorkLines?: string[];
  sourceWorkColumns?: number;
  icon?: 'snap' | 'numbers' | 'animals' | 'equation' | 'activity' | 'relay';
  columns?: string[];
  rows?: Array<{
    label: string;
    blank: string;
    sample?: string;
  }>;
  totalLabel?: string;
  totalBlank?: string;
  totalSample?: string;
  note?: string;
};

export type ProblemVisualTimeLinePoint = {
  label: string;
  minute: number;
  detail?: string;
  open?: boolean;
};

export type ProblemVisualTimeLineJump = {
  label: string;
  fromMinute: number;
  toMinute: number;
};

export type ProblemVisualTimeLineSourceItem = {
  label: string;
  minute?: number;
  sourceX?: number;
  detail?: string;
  kind?: 'digital' | 'analog' | 'note';
  status?: 'matched' | 'unmatched' | 'provided';
};

export type ProblemVisualTimeLineSection = {
  kind: 'time-number-line';
  label?: string;
  startLabel: string;
  endLabel: string;
  displayStartMinute?: number;
  displayEndMinute?: number;
  tickLabels: string[];
  labelEvery?: number;
  sourceItems?: ProblemVisualTimeLineSourceItem[];
  points?: ProblemVisualTimeLinePoint[];
  jumps?: ProblemVisualTimeLineJump[];
  showPointDetails?: boolean;
  note?: string;
};

export type ProblemVisualMeasurementModelSection = {
  kind: 'measurement-model';
  label?: string;
  model: 'mass' | 'liquid' | 'conversion' | 'rounding' | 'operation';
  unitLabel?: string;
  referenceLabel?: string;
  equation?: string;
  maxValue?: number;
  values?: Array<{
    label: string;
    value?: number;
    valueLabel?: string;
    tone?: 'given' | 'target' | 'answer' | 'estimate' | 'benchmark';
  }>;
  steps?: string[];
  note?: string;
};

export type ProblemVisualMeasurementLabSection = {
  kind: 'measurement-lab';
  label?: string;
  model:
    | 'kilogram-balance'
    | 'kilogram-decompose'
    | 'kilogram-place-value'
    | 'benchmark-estimate'
    | 'unit-sort'
    | 'scale-read'
    | 'weight-reason'
    | 'liquid-decompose'
    | 'capacity-estimate'
    | 'water-mass-link'
    | 'vertical-liquid-scale'
    | 'mixed-operation'
    | 'rounding-ten'
    | 'rounding-hundred'
    | 'compose-once'
    | 'compose-twice'
    | 'estimate-sum'
    | 'decompose-once'
    | 'decompose-twice'
    | 'estimate-difference'
    | 'mixed-measure';
  wholeLabel?: string;
  wholeDetail?: string;
  partLabel?: string;
  equation?: string;
  caption?: string;
  leftLabel?: string;
  rightLabel?: string;
  rows?: Array<{
    left: string;
    right: string;
  }>;
  placeValueAddition?: PlaceValueAdditionModel;
  placeValueSubtraction?: PlaceValueSubtractionModel;
  estimateRows?: Array<{
    group: string;
    expression: string;
    actual: string;
    roundedExpression: string;
    estimate: string;
    error: string;
    best?: boolean;
  }>;
};

export type ProblemVisualAdditionStudioSection = {
  kind: 'addition-studio';
  label?: string;
  groups: Array<{
    label: string;
    caption: string;
    tone: 'liquid' | 'length' | 'mass' | 'compound';
    items: Array<{
      item: string;
      expression: string;
      answer: string;
      method: 'bridge' | 'algorithm' | 'compound';
      steps?: string[];
      bridge?: {
        start: string;
        firstJump: string;
        landing: string;
        secondJump?: string;
        finish?: string;
      };
      algorithm?: PlaceValueAdditionModel;
      compoundColumns?: Array<{
        unit: string;
        top: string;
        bottom: string;
        total: string;
      }>;
    }>;
  }>;
};

export type ProblemVisualCardGridSection = {
  kind: 'card-grid';
  label?: string;
  cards: Array<{
    label: string;
    sections: ProblemVisualSection[];
  }>;
};

export type ProblemVisualSourceDirectionsSection = {
  kind: 'source-directions';
  label?: string;
  items: Array<{
    lead?: string;
    text: string;
  }>;
};

export type ProblemVisualSection =
  | ProblemVisualArraySection
  | ProblemVisualFloorPlanSection
  | ProblemVisualLinePlotSection
  | ProblemVisualDataChartSection
  | ProblemVisualGeometryDiagramSection
  | ProblemVisualRelatedFactsSection
  | ProblemVisualTapeSection
  | ProblemVisualNumberBondSection
  | ProblemVisualFractionStripSection
  | ProblemVisualDataTableSection
  | ProblemVisualExpressionMatchSection
  | ProblemVisualNumberLineSection
  | ProblemVisualClockSection
  | ProblemVisualEquationsSection
  | ProblemVisualSolutionPartsSection
  | ProblemVisualNoteSection
  | ProblemVisualStopwatchSection
  | ProblemVisualTimeLineSection
  | ProblemVisualMeasurementModelSection
  | ProblemVisualMeasurementLabSection
  | ProblemVisualAdditionStudioSection
  | ProblemVisualCardGridSection
  | ProblemVisualSourceDirectionsSection;

export type ProblemVisualSpec = {
  title: string;
  sourceNote?: string;
  sections: ProblemVisualSection[];
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
  blankVisual?: ProblemVisualSpec;
  solvedVisual?: ProblemVisualSpec;
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
  relatedFacts?: ProblemSetRelatedFact[];
  relatedFactMatches?: ProblemSetRelatedFactMatch[];
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
