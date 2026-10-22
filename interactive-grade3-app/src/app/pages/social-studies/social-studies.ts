import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SOCIAL_STUDIES_CHAPTERS } from './social-studies.data';
import { SOCIAL_STUDIES_LESSONS } from './social-studies.lessons';
import { SOCIAL_STUDIES_EXPLORATIONS, SAN_JOSE_MAP, BAKER_IMAGE } from './social-studies.explorations';
import { SocialStudiesImage } from './social-studies-image';

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
  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  readonly chapterId = computed(() => this.params().get('chapterId'));
  readonly chapter = computed(() => this.chapters.find(item => item.id === this.chapterId()));
  readonly selectedCode = signal<string | null>(null);
  readonly expectation = computed(() => {
    const expectations = this.chapter()?.expectations ?? [];
    return expectations.find(item => item.code === this.selectedCode()) ?? expectations[0];
  });
  readonly lesson = computed(() => {
    const code = this.expectation()?.code ?? '';
    const lesson = SOCIAL_STUDIES_LESSONS[code];
    return lesson ? { ...lesson, image: lesson.image ?? SOCIAL_STUDIES_EXPLORATIONS[code]?.images?.[0] } : undefined;
  });
  readonly exploration = computed(() => SOCIAL_STUDIES_EXPLORATIONS[this.expectation()?.code ?? '']);
  readonly extraImages = computed(() => this.exploration()?.images?.filter(image => image.url !== this.lesson()?.image?.url) ?? []);
  readonly chapterImages = { geography: SOCIAL_STUDIES_LESSONS['3.1.1'].image!, 'native-peoples': SOCIAL_STUDIES_LESSONS['3.2.2'].image!, 'community-history': SAN_JOSE_MAP, 'government-citizenship': SOCIAL_STUDIES_LESSONS['3.4.4'].image!, economics: BAKER_IMAGE };
  chapterImage(id: string) { return this.chapterImages[id as keyof typeof this.chapterImages]; }
  selectTopic(code: string): void {
    this.selectedCode.set(code);
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
