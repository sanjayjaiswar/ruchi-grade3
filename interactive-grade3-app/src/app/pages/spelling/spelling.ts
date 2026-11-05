import { Component, DestroyRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SPELLING_LESSONS } from './spelling-data';
import { TEACHING_NOTES, wordParts } from './spelling-teaching';

type View = 'study' | 'practice' | 'workbook' | 'answers';
type Feedback = 'correct' | 'again' | 'revealed' | '';
interface Attempt { value: string; feedback: Feedback; }

@Component({
  selector: 'app-spelling-page',
  imports: [RouterLink],
  templateUrl: './spelling.html',
  styleUrl: './spelling.css'
})
export class SpellingPage {
  readonly source = '/assets/spelling/spelling-grade-3.pdf';
  readonly lessons = SPELLING_LESSONS;
  lesson: (typeof SPELLING_LESSONS)[number] | undefined;
  invalidLesson = false;
  query = '';
  view: View = 'study';
  activity: 'build' | 'recall' = 'build';
  wordIndex = 0;
  step = 0;
  sourceIndex = 0;
  maximized = false;
  covered = false;
  attempts: Attempt[] = [];
  tiles: { letter: string; id: number }[] = [];
  selectedTiles: number[] = [];
  buildFeedback: Feedback = '';
  retryOnly = false;
  retryIndices: number[] = [];

  constructor(route: ActivatedRoute, title: Title, destroyRef: DestroyRef) {
    route.paramMap.pipe(takeUntilDestroyed(destroyRef)).subscribe(params => {
      const raw = params.get('lessonNumber');
      this.lesson = raw && /^\d+$/.test(raw) ? this.lessons.find(item => item.number === Number(raw)) : undefined;
      this.invalidLesson = raw !== null && !this.lesson;
      this.view = 'study';
      this.wordIndex = 0;
      this.sourceIndex = 0;
      this.maximized = false;
      this.retryOnly = false;
      this.retryIndices = [];
      this.attempts = this.lesson?.words.map(() => ({ value: '', feedback: '' })) ?? [];
      this.resetWord();
      title.setTitle(this.lesson ? `Spelling Lesson ${this.lesson.number} | Grade 3` : 'Spelling | Grade 3');
    });
  }

  get filteredLessons() {
    const query = this.query.trim().toLowerCase().replace(/^lesson\s+/, '');
    return this.lessons.filter(lesson => !query || (/^\d+$/.test(query)
      ? lesson.number === Number(query) : lesson.title.toLowerCase().includes(query)));
  }
  get word(): string { return this.lesson?.words[this.wordIndex] ?? ''; }
  get parts() { return this.lesson ? wordParts(this.word, this.lesson.number) : []; }
  get teachingNote() { return TEACHING_NOTES[(this.lesson?.number ?? 1) - 1]; }
  get attempt(): Attempt { return this.attempts[this.wordIndex] ?? { value: '', feedback: '' }; }
  get correctCount() { return this.attempts.filter(item => item.feedback === 'correct').length; }
  get wordIndices(): number[] { return this.retryOnly ? this.retryIndices : this.attempts.map((_, i) => i); }
  get wordPosition() { return this.wordIndices.indexOf(this.wordIndex); }
  get builtWord() { return this.selectedTiles.map(id => this.tiles.find(tile => tile.id === id)!.letter).join(''); }
  get sourcePages(): readonly number[] {
    if (!this.lesson) return [];
    return this.view === 'answers' ? this.lesson.answerPages : [0, 1, 2, 3].map(offset => this.lesson!.page + offset);
  }
  get sourcePage() { return this.sourcePages[this.sourceIndex] ?? this.sourcePages[0]; }
  pdfPage(page: number) { return `${this.source}#page=${page + 2}`; }
  sourceImage(page: number) { return `/assets/spelling/pages/page-${page}.webp`; }

  selectView(view: View) {
    this.view = view;
    this.sourceIndex = 0;
    this.covered = false;
    this.step = 0;
  }
  selectActivity(activity: 'build' | 'recall') {
    this.activity = activity;
    this.resetWord();
  }
  selectWord(index: number) {
    this.wordIndex = index;
    this.resetWord();
  }
  moveWord(delta: number) {
    const index = this.wordIndices[this.wordPosition + delta];
    if (index !== undefined) this.selectWord(index);
  }
  resetWord() {
    this.step = 0;
    this.covered = false;
    this.selectedTiles = [];
    this.buildFeedback = '';
    this.tiles = [...this.word].map((letter, id) => ({ letter, id }));
    // Shuffle tile identities so repeated letters remain separate usable buttons.
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
    if (this.tiles.map(tile => tile.letter).join('') === this.word && this.tiles.length > 1) {
      this.tiles.push(this.tiles.shift()!);
    }
  }
  useTile(id: number) {
    if (!this.selectedTiles.includes(id)) this.selectedTiles = [...this.selectedTiles, id];
    this.buildFeedback = '';
  }
  removeTile(position: number) {
    this.selectedTiles = this.selectedTiles.filter((_, index) => index !== position);
    this.buildFeedback = '';
  }
  checkBuild() { this.buildFeedback = this.builtWord === this.word ? 'correct' : 'again'; }
  revealBuild() {
    this.selectedTiles = [...this.tiles].sort((a, b) => a.id - b.id).map(tile => tile.id);
    this.buildFeedback = 'revealed';
  }
  coverWord() {
    this.covered = true;
    if (this.attempt.feedback !== 'correct') { this.attempt.value = ''; this.attempt.feedback = ''; }
  }
  updateAnswer(value: string) { this.attempt.value = value; this.attempt.feedback = ''; }
  checkRecall() {
    const normalize = (value: string) => value.trim().replace(/['‘’]/g, "'").replace(/\s+/g, ' ');
    this.attempt.feedback = normalize(this.attempt.value) === normalize(this.word) ? 'correct' : 'again';
  }
  revealRecall() { this.attempt.feedback = 'revealed'; }
  retryMissed() {
    this.retryIndices = this.attempts.flatMap((attempt, index) => attempt.feedback !== 'correct' ? [index] : []);
    if (!this.retryIndices.length) return;
    this.retryOnly = true;
    this.view = 'practice';
    this.activity = 'recall';
    this.selectWord(this.retryIndices[0]);
  }
  allWords() { this.retryOnly = false; this.retryIndices = []; this.selectWord(0); }
  restartRecall() {
    this.attempts = this.attempts.map(() => ({ value: '', feedback: '' }));
    this.allWords();
  }
}
