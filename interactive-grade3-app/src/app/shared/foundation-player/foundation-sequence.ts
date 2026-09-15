/** Curriculum-neutral visual states. Content and source approval belong to the caller. */
export interface FoundationFrame {
  title: string;
  note: string;
  equation: string;
  places?: { counts: number[]; removed?: number[]; total: number; trade?: { from: number; to: number; fromCount: number; toCount: number } };
  line?: { points: number[]; reached: number; proportional?: boolean; target?: number };
  groups?: { counts: number[]; unit: 'one' | 'ten'; label: string; pool?: number };
  array?: { rows: number; columns: number; split?: number; area?: boolean; filled?: number };
  graph?: { values: { label: string; value: number }[]; unit: number; maxValue: number; unitLabel: string; bars: boolean; count: boolean };
  flow?: { parts: { label: string; value: string }[]; result: string };
}
export interface FoundationMethod {
  id: string;
  label: string;
  modelType: string;
  sourcePages: number[];
  frames: FoundationFrame[];
}
export interface FoundationSequence {
  id: string;
  title: string;
  prompt: string;
  methods: FoundationMethod[];
  source: {
    document: string; lesson: number; session: number; activityKey: string;
    printedPages: number[]; viewerPages: number[]; teacherDocument: string;
    teacherPrintedPages: string; teacherViewerPage: number;
    studentLinks: { page: number; url: string }[]; teacherUrl: string; implementationLocation: string;
  };
}
