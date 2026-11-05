import { Component, DestroyRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SPELLING_LESSONS } from './spelling-data';
import { PUBLISHER_DICTIONARY } from './spelling-publisher-dictionary';
import { PUBLISHER_LESSONS } from './spelling-publisher-lessons';
import { SPELLING_SOLUTIONS } from './spelling-solutions';

type View = 'study' | 'workbook' | 'answers';

@Component({
  selector: 'app-spelling-page',
  imports: [RouterLink],
  templateUrl: './spelling.html',
  styleUrl: './spelling.css'
})
export class SpellingPage {
  readonly lessons = SPELLING_LESSONS;
  lesson: (typeof SPELLING_LESSONS)[number] | undefined;
  invalidLesson = false;
  query = '';
  view: View = 'study';
  sourceIndex = 0;
  solutionSectionIndex = 0;
  pageZoomed = false;
  maximized = false;

  constructor(route: ActivatedRoute, title: Title, destroyRef: DestroyRef) {
    route.paramMap.pipe(takeUntilDestroyed(destroyRef)).subscribe(params => {
      const raw = params.get('lessonNumber');
      this.lesson = raw && /^\d+$/.test(raw) ? this.lessons.find(item => item.number === Number(raw)) : undefined;
      this.invalidLesson = raw !== null && !this.lesson;
      this.view = 'study';
      this.sourceIndex = 0;
      this.solutionSectionIndex = 0;
      this.pageZoomed = false;
      this.maximized = false;
      title.setTitle(this.lesson ? `Spelling Lesson ${this.lesson.number} | Grade 3` : 'Spelling | Grade 3');
    });
  }

  get filteredLessons() {
    const query = this.query.trim().toLowerCase().replace(/^lesson\s+/, '');
    return this.lessons.filter(lesson => !query || (/^\d+$/.test(query)
      ? lesson.number === Number(query) : lesson.title.toLowerCase().includes(query)));
  }
  get publisherLesson() { return this.lesson ? PUBLISHER_LESSONS[this.lesson.number] : undefined; }
  get sourcePages(): readonly number[] {
    return this.lesson ? [0, 1, 2, 3].map(offset => this.lesson!.page + offset) : [];
  }
  get sourcePage() { return this.sourcePages[this.sourceIndex] ?? this.sourcePages[0]; }
  get solvedPage() { return this.lesson ? SPELLING_SOLUTIONS[this.lesson.number]?.[this.sourceIndex] : undefined; }
  definition(word: string) { return PUBLISHER_DICTIONARY[word.toLowerCase().replace(/’/g, "'")]; }
  pdfPage(page: number) { return `/assets/spelling/page-pdfs/page-${page}.pdf`; }
  answerPdf(page: number) { return `/assets/spelling/answers/page-${page}.pdf`; }
  answerImage(page: number) { return `/assets/spelling/answers/page-${page}.webp`; }
  sourceImage(page: number) { return `/assets/spelling/pages/page-${page}.webp`; }

  selectPage(index: number) {
    if (index < 0 || index >= this.sourcePages.length) return;
    this.sourceIndex = index;
    this.solutionSectionIndex = 0;
    this.pageZoomed = false;
  }
  selectView(view: View) {
    this.view = view;
    this.pageZoomed = false;
  }
  startWorkbook() {
    this.selectPage(1);
    this.selectView('workbook');
  }
}
