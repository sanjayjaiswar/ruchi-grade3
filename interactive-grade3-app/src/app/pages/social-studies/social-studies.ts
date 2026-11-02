import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SOCIAL_STUDIES_CHAPTERS } from './social-studies.data';
import { SOCIAL_STUDIES_LESSONS } from './social-studies.lessons';
import { SOCIAL_STUDIES_EXPLORATIONS, SAN_JOSE_MAP, BAKER_IMAGE } from './social-studies.explorations';
import { SocialStudiesImage } from './social-studies-image';
import { SOCIAL_STUDIES_ACTIVITIES, SOCIAL_STUDIES_HISTORY_TIMELINES } from './social-studies.activities';
import { SocialStudiesTeaching } from './social-studies-teaching';
import { SOCIAL_STUDIES_DAILY_PLAN, SOCIAL_STUDIES_READINESS } from './social-studies.readiness';

@Component({
  selector: 'app-social-studies-page',
  imports: [RouterLink, SocialStudiesImage, SocialStudiesTeaching],
  templateUrl: './social-studies.html',
  styleUrls: ['../portal-home/portal-home.css', './social-studies.css']
})
export class SocialStudiesPage {
  readonly chapters = SOCIAL_STUDIES_CHAPTERS;
  readonly readiness = SOCIAL_STUDIES_READINESS;
  readonly dailyPlan = SOCIAL_STUDIES_DAILY_PLAN;
  readonly scopeMatrix = this.chapters.flatMap(chapter => chapter.expectations.map(item => ({ ...item, chapterId: chapter.id, source: chapter.source })));
  readonly base = '/ruchika/grade3/social-studies';
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  private readonly queryParams = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });
  readonly chapterId = computed(() => this.params().get('chapterId'));
  readonly chapter = computed(() => this.chapters.find(item => item.id === this.chapterId()));
  readonly expectation = computed(() => {
    const expectations = this.chapter()?.expectations ?? [];
    return expectations.find(item => item.code === this.queryParams().get('standard')) ?? expectations[0];
  });
  readonly lesson = computed(() => {
    const code = this.expectation()?.code ?? '';
    const lesson = SOCIAL_STUDIES_LESSONS[code];
    return lesson ? { ...lesson, image: lesson.image ?? SOCIAL_STUDIES_EXPLORATIONS[code]?.images?.[0] } : undefined;
  });
  readonly exploration = computed(() => SOCIAL_STUDIES_EXPLORATIONS[this.expectation()?.code ?? '']);
  readonly extraImages = computed(() => this.exploration()?.images?.filter(image => image.url !== this.lesson()?.image?.url) ?? []);
  readonly activity = computed(() => SOCIAL_STUDIES_ACTIVITIES[this.expectation()?.code ?? '']);
  readonly historyTimeline = computed(() => SOCIAL_STUDIES_HISTORY_TIMELINES[this.expectation()?.code ?? ''] ?? []);
  private readonly activityVisits = signal<Record<string, { choice: number | null; checked: boolean; text: string; sample: boolean }>>({});
  private readonly activityVisit = computed(() => this.activityVisits()[this.expectation()?.code ?? ''] ?? { choice: null, checked: false, text: '', sample: false });
  readonly choice = computed(() => this.activityVisit().choice);
  readonly isChecked = computed(() => this.activityVisit().checked);
  readonly responseText = computed(() => this.activityVisit().text);
  readonly isSampleVisible = computed(() => this.activityVisit().sample);
  private updateActivity(change: Partial<{ choice: number | null; checked: boolean; text: string; sample: boolean }>): void {
    const code = this.expectation()?.code ?? '';
    this.activityVisits.update(all => ({ ...all, [code]: { ...this.activityVisit(), ...change } }));
  }
  chooseOption(index: number): void {
    this.updateActivity({ choice: index, checked: false });
  }
  checkChoice(): void {
    if (this.choice() !== null) this.updateActivity({ checked: true });
  }
  updateResponse(event: Event): void {
    this.updateActivity({ text: (event.target as HTMLTextAreaElement).value });
  }
  toggleSample(): void {
    this.updateActivity({ sample: !this.isSampleVisible() });
  }
  readonly chapterImages = { geography: SOCIAL_STUDIES_LESSONS['3.1.1'].image!, 'native-peoples': SOCIAL_STUDIES_LESSONS['3.2.2'].image!, 'community-history': SAN_JOSE_MAP, 'government-citizenship': SOCIAL_STUDIES_LESSONS['3.4.4'].image!, economics: BAKER_IMAGE };
  chapterImage(id: string) { return this.chapterImages[id as keyof typeof this.chapterImages]; }
  selectTopic(code: string): void {
    if (!this.chapter()?.expectations.some(item => item.code === code)) return;
    void this.router.navigate([], { relativeTo: this.route, queryParams: { standard: code }, queryParamsHandling: 'merge' });
    requestAnimationFrame(() => {
      const panel = document.getElementById('expectation-detail');
      if (panel && panel.getBoundingClientRect().top < 0) panel.scrollIntoView({ block: 'start' });
    });
  }
  readonly nextTopic = computed(() => {
    const items = this.chapter()?.expectations ?? [];
    return items[items.findIndex(item => item.code === this.expectation()?.code) + 1];
  });
}
