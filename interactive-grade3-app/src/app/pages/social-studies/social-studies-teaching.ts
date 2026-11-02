import { Component, computed, input, signal } from '@angular/core';
import { SOCIAL_STUDIES_READINESS } from './social-studies.readiness';

interface TeachingVisit {
  workspace: 'student' | 'teacher';
  step: number;
  revealed: string[];
  responses: Record<string, string>;
  answers: Record<string, number>;
  checked: string[];
  visualChoice: string | null;
  timeline: string[];
  timelineChecked: boolean;
  reviewed: boolean;
}
const newVisit = (): TeachingVisit => ({ workspace: 'student', step: 0, revealed: [], responses: {}, answers: {}, checked: [], visualChoice: null, timeline: [], timelineChecked: false, reviewed: false });

@Component({
  selector: 'app-social-studies-teaching',
  templateUrl: './social-studies-teaching.html',
  styleUrl: './social-studies-teaching.css'
})
export class SocialStudiesTeaching {
  readonly standard = input.required<string>();
  readonly plan = computed(() => SOCIAL_STUDIES_READINESS[this.standard()]);
  readonly standardSource = computed(() => 'https://www.cde.ca.gov/be/st/SS/documents/histsocscistnd.pdf#page=' + (this.standard().startsWith('3.5') ? '18' : this.standard().startsWith('3.3') || this.standard().startsWith('3.4') ? '17' : '16'));
  private readonly visits = signal<Record<string, TeachingVisit>>({});
  readonly visit = computed(() => this.visits()[this.standard()] ?? newVisit());
  readonly steps = [
    { title: 'Warm-up', minutes: 5 }, { title: 'Explore', minutes: 5 },
    { title: 'Model', minutes: 4 }, { title: 'Guided', minutes: 4 },
    { title: 'Practice', minutes: 5 }, { title: 'Check', minutes: 4 },
    { title: 'Explain', minutes: 3 }
  ];
  readonly levels = ['support', 'core', 'challenge'] as const;
  readonly selectedVisual = computed(() => this.plan()?.visual.nodes.find(node => node.id === this.visit().visualChoice));
  readonly timelineCorrect = computed(() => {
    const order = this.plan()?.visual.correctOrder;
    return !!order && order.length === this.visit().timeline.length && order.every((id, index) => this.visit().timeline[index] === id);
  });
  readonly correctCount = computed(() => this.plan()?.checks.filter(check => this.visit().checked.includes(check.id) && this.visit().answers[check.id] === check.correctIndex).length ?? 0);
  private patch(change: Partial<TeachingVisit>): void {
    this.visits.update(all => ({ ...all, [this.standard()]: { ...(all[this.standard()] ?? newVisit()), ...change } }));
  }
  setWorkspace(workspace: 'student' | 'teacher'): void { this.patch({ workspace }); }
  setStep(step: number): void { if (step >= 0 && step < this.steps.length) this.patch({ step }); }
  isRevealed(key: string): boolean { return this.visit().revealed.includes(key); }
  toggle(key: string): void {
    const revealed = this.visit().revealed;
    this.patch({ revealed: revealed.includes(key) ? revealed.filter(item => item !== key) : [...revealed, key] });
  }
  respond(key: string, event: Event): void {
    this.patch({ responses: { ...this.visit().responses, [key]: (event.target as HTMLTextAreaElement).value } });
  }
  choose(checkId: string, index: number): void {
    this.patch({ answers: { ...this.visit().answers, [checkId]: index }, checked: this.visit().checked.filter(id => id !== checkId) });
  }
  check(checkId: string): void {
    if (this.visit().answers[checkId] !== undefined && !this.visit().checked.includes(checkId)) this.patch({ checked: [...this.visit().checked, checkId] });
  }
  inspectNode(id: string): void {
    const visual = this.plan()?.visual;
    if (!visual?.nodes.some(node => node.id === id)) return;
    const additions: Partial<TeachingVisit> = { visualChoice: id };
    if (visual.correctOrder && !this.visit().timeline.includes(id)) {
      additions.timeline = [...this.visit().timeline, id];
      additions.timelineChecked = false;
    }
    this.patch(additions);
  }
  nodeLabel(id: string): string { return this.plan()?.visual.nodes.find(node => node.id === id)?.label ?? ''; }
  resetTimeline(): void { this.patch({ timeline: [], timelineChecked: false, visualChoice: null }); }
  checkTimeline(): void { if (this.visit().timeline.length === this.plan()?.visual.nodes.length) this.patch({ timelineChecked: true }); }
  review(): void { this.patch({ reviewed: !this.visit().reviewed }); }
}
