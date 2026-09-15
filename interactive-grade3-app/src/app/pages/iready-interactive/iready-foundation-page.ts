import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FoundationPlayerComponent } from '../../shared/foundation-player/foundation-player';
import { IREADY_FOUNDATIONS, IREADY_FOUNDATION_CONCEPTS } from './iready-foundations';
import { interactionSourceUrl, verifiedInteractionsForLesson } from './iready-interactive.evidence';
import { GRADE3_CMC_UNITS } from '../syllabus-books/syllabus-books.data';

@Component({
  selector: 'app-iready-foundation-page',
  imports: [NgIf, NgFor, RouterLink, FoundationPlayerComponent],
  templateUrl: './iready-foundation-page.html',
  styleUrls: ['./iready-interactive.css', './iready-consistent-presentation.css', './iready-foundation-page.css']
})
export class IReadyFoundationPage implements OnDestroy {
  readonly concepts = IREADY_FOUNDATION_CONCEPTS;
  readonly sourceUrl = interactionSourceUrl;
  selectedId = '';
  exampleIndex = 0;
  private readonly subscription: Subscription;
  constructor(route: ActivatedRoute, title: Title) {
    this.subscription = route.paramMap.subscribe(params => {
      this.selectedId = params.get('conceptId') ?? '';
      this.exampleIndex = 0;
      title.setTitle(`${this.concept?.title ?? 'Foundations'} · i-Ready Interactive`);
    });
  }
  ngOnDestroy(): void { this.subscription.unsubscribe(); }
  get concept() { return this.concepts.find(c => c.id === this.selectedId); }
  get example() { return this.concept?.examples[this.exampleIndex]; }
  get sequence() { return IREADY_FOUNDATIONS.find(s => s.id === this.example?.sequenceId); }
  get connections() {
    if (!this.concept) return [];
    return Object.entries(this.concept.sessions).map(([lesson, sessions]) => ({
      lesson: Number(lesson),
      title: GRADE3_CMC_UNITS.flatMap(u => u.lessons).find(l => l.number === Number(lesson))?.title ?? '',
      sessions: verifiedInteractionsForLesson(Number(lesson)).filter(s => sessions.includes(s.session))
    }));
  }
  countLessons(concept: typeof IREADY_FOUNDATION_CONCEPTS[number]): number { return Object.keys(concept.sessions).length; }
  chooseExample(index: number): void { this.exampleIndex = index; }
}
