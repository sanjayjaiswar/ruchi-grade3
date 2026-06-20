export type VisualModelType =
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

export type SourceReference = {
  sourceType: 'teacher-edition' | 'student-workbook' | 'additional-materials';
  path: string;
  pageStart?: number;
  pageEnd?: number;
  note: string;
};

export type LessonStep = {
  id: string;
  title: string;
  shortTitle: string;
  studentPrompt: string;
  teacherEditionBasis: string;
  visualModel: VisualModelType;
};

export type LessonSourceNote = {
  sourceProblem: string;
  teacherMove: string;
  exitEvidence: string;
};

export type LessonContent = {
  id: string;
  moduleId: string;
  topicId: string;
  lessonNumber: number;
  title: string;
  objective: string;
  studentGoal: string;
  sourceRefs: SourceReference[];
  vocabulary: string[];
  visualModels: VisualModelType[];
  steps: LessonStep[];
  summary: {
    takeaway: string;
    check: string;
  };
};

export type TopicMeta = {
  id: string;
  label: string;
  title: string;
  days: number;
  lessonIds: string[];
};

export type ModuleMeta = {
  id: string;
  number: number;
  title: string;
  sourcePdf: string;
  summary: string;
  visualModels: VisualModelType[];
  topics: TopicMeta[];
};
