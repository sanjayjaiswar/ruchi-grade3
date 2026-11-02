/** Original supplemental instruction. Source links distinguish evidence from teaching examples. */
export interface StudySource {
  label: string;
  url: string;
  kind: 'primary evidence' | 'tribal account' | 'institutional history' | 'official guidance';
}
export interface StudyTask { prompt: string; answer: string; }
export interface StudyEvidence { title: string; text: string; source?: StudySource; }
export interface StudyCheck {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  retry: string;
}
export interface StudyVisualNode {
  id: string;
  label: string;
  detail: string;
  source?: StudySource;
}
export interface SocialStudiesPlan {
  objective: string;
  requirement: string;
  prerequisite: string;
  warmup: StudyTask;
  evidence: StudyEvidence[];
  model: StudyTask & { reasoning: string[] };
  guided: StudyTask & { hint: string };
  practice: { support: StudyTask; core: StudyTask; challenge: StudyTask };
  checks: StudyCheck[];
  independent: StudyTask & { criteria: string[] };
  misconceptions: string[];
  nextPreparation: string;
  visual: {
    kind: 'map' | 'timeline' | 'comparison' | 'process';
    title: string;
    caption: string;
    nodes: StudyVisualNode[];
    correctOrder?: string[];
  };
  sources: StudySource[];
}
