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

export type ProblemSetAnimationType = 'grouping-by-size' | 'equal-sharing' | 'tape-split' | 'fact-match';

export type ProblemSetFactMatch = {
  dividend: number;
  divisor: number;
  quotient: number;
};

export type ProblemSetCenteredProblem = {
  number: number;
  sourcePrompt: string;
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
