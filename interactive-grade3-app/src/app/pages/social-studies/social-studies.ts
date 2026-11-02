import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SOCIAL_STUDIES_CHAPTERS } from './social-studies.data';
import { SOCIAL_STUDIES_LESSONS } from './social-studies.lessons';
import { SOCIAL_STUDIES_EXPLORATIONS, SAN_JOSE_MAP, BAKER_IMAGE } from './social-studies.explorations';
import { SocialStudiesImage } from './social-studies-image';
import { SOCIAL_STUDIES_ACTIVITIES, SOCIAL_STUDIES_HISTORY_TIMELINES } from './social-studies.activities';

@Component({
  selector: 'app-social-studies-page',
  imports: [RouterLink, SocialStudiesImage],
  templateUrl: './social-studies.html',
  styleUrls: ['../portal-home/portal-home.css', './social-studies.css']
})
export class SocialStudiesPage {
  readonly chapters = SOCIAL_STUDIES_CHAPTERS;
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
  private readonly selectedAnswer = signal<{ code: string; index: number } | null>(null);
  private readonly checkedCode = signal<string | null>(null);
  private readonly writtenAnswer = signal<{ code: string; text: string } | null>(null);
  private readonly sampleCode = signal<string | null>(null);
  readonly choice = computed(() => this.selectedAnswer()?.code === this.expectation()?.code ? this.selectedAnswer()!.index : null);
  readonly isChecked = computed(() => this.checkedCode() === this.expectation()?.code);
  readonly responseText = computed(() => this.writtenAnswer()?.code === this.expectation()?.code ? this.writtenAnswer()!.text : '');
  readonly isSampleVisible = computed(() => this.sampleCode() === this.expectation()?.code);
  chooseOption(index: number): void {
    this.selectedAnswer.set({ code: this.expectation()?.code ?? '', index });
    this.checkedCode.set(null);
  }
  checkChoice(): void {
    if (this.choice() !== null) this.checkedCode.set(this.expectation()?.code ?? '');
  }
  updateResponse(event: Event): void {
    this.writtenAnswer.set({ code: this.expectation()?.code ?? '', text: (event.target as HTMLTextAreaElement).value });
  }
  toggleSample(): void {
    this.sampleCode.set(this.isSampleVisible() ? null : (this.expectation()?.code ?? ''));
  }
  readonly chapterImages = { geography: SOCIAL_STUDIES_LESSONS['3.1.1'].image!, 'native-peoples': SOCIAL_STUDIES_LESSONS['3.2.2'].image!, 'community-history': SAN_JOSE_MAP, 'government-citizenship': SOCIAL_STUDIES_LESSONS['3.4.4'].image!, economics: BAKER_IMAGE };
  chapterImage(id: string) { return this.chapterImages[id as keyof typeof this.chapterImages]; }
  selectTopic(code: string): void {
    if (!this.chapter()?.expectations.some(item => item.code === code)) return;
    void this.router.navigate([], { relativeTo: this.route, queryParams: { standard: code }, queryParamsHandling: 'merge' });
    this.selectedAnswer.set(null);
    this.checkedCode.set(null);
    this.writtenAnswer.set(null);
    this.sampleCode.set(null);
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
