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

export type LessonRuntimeConfig = {
  conceptTerms?: string[];
  showMultiplicationDivisionVocabularyNote?: boolean;
  teacherEditionSteps?: LessonStep[];
  studentWorkSupport?: Record<number, StudentWorkSupport>;
  studentWorkEquations?: Record<number, string[]>;
  sourceWorkspaceModels?: Record<number, SourceWorkspaceModel>;
  sourceVisualFacts?: Record<string, SourceVisualFacts>;
  sourceRows?: Record<string, InfoRow[]>;
  arrayDecompositionModel?: ArrayDecompositionLessonModel;
  arrayDecompositionExamples?: ArrayDecompositionLessonModel[];
};
