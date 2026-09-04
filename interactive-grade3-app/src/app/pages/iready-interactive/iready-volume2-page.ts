import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProblemVisualWorkspaceComponent } from '../../shared/problem-visual-workspace/problem-visual-workspace';
import { Grade3CmcLesson, Grade3CmcUnit, GRADE3_CMC_UNITS } from '../syllabus-books/syllabus-books.data';
import {
  IREADY_VOLUME_TWO_LIBRARY,
  IReadyV2Activity,
  IReadyV2LibraryGroup,
  IReadyV2Session,
  IReadyV2TeacherSpread,
  IReadyV2UnitIdea,
  v2LibraryForUnit,
  v2ActivitiesForSession,
  v2HasExactActivityVisual,
  v2OfficialUrlForPrintedPage,
  v2OfficialUrlForViewerPage,
  v2PagesForSession,
  v2SessionsForLesson,
  v2StudentImage,
  v2StudentImageByViewerPage,
  v2TeacherImage,
  v2TeacherSpreadForPrintedPage,
  v2UnitIdeas,
  v2ViewerPageForPrintedPage,
  v2ViewerPagesForLibrary,
  v2VisualForActivity
} from './iready-volume2';

@Component({
  selector: 'app-iready-volume2-page',
  imports: [NgFor, NgIf, RouterLink, ProblemVisualWorkspaceComponent],
  templateUrl: './iready-volume2-page.html',
  styleUrl: './iready-volume2-page.css'
})
export class IReadyVolume2Page implements OnDestroy {
  @ViewChild(ProblemVisualWorkspaceComponent) private visualWorkspace?: ProblemVisualWorkspaceComponent;
  readonly units = GRADE3_CMC_UNITS.filter((unit) => unit.volume === 2);
  readonly lessons = this.units.flatMap((unit) => unit.lessons);
  readonly libraryGroups = IREADY_VOLUME_TWO_LIBRARY;
  readonly studentImage = v2StudentImage;
  readonly studentImageByViewerPage = v2StudentImageByViewerPage;
  readonly teacherImage = v2TeacherImage;
  readonly officialUrlForPrintedPage = v2OfficialUrlForPrintedPage;
  readonly officialUrlForViewerPage = v2OfficialUrlForViewerPage;

  unitFocus = false;
  lessonFocus = false;
  libraryFocus = false;
  selectedUnitNumber = 4;
  selectedLessonNumber = 20;
  selectedSessionNumber = 1;
  selectedActivityIndex = 0;
  selectedPrintedPage = 475;
  selectedLibraryKey = IREADY_VOLUME_TWO_LIBRARY[0].key;
  selectedViewerPage = 1;
  lessonView: 'teaching' | 'try' | 'student' | 'teacher' = 'teaching';
  lessonFeedback = 'Page-specific visual teaching is open for this activity.';
  showLessonValidation = false;
  solutionRevealCount = 1;
  private readonly visualCache = new Map<string, ReturnType<typeof v2VisualForActivity>>();
  private readonly subscriptions = new Subscription();

  constructor(private readonly route: ActivatedRoute, private readonly title: Title) {
    this.subscriptions.add(this.route.paramMap.subscribe((params) => {
      const requestedUnit = Number(params.get('unitNumber'));
      const requestedLesson = Number(params.get('lessonNumber'));
      const requestedLibrary = params.get('groupKey');
      this.lessonFocus = params.has('lessonNumber');
      this.libraryFocus = !this.lessonFocus && params.has('groupKey');
      this.unitFocus = !this.lessonFocus && !this.libraryFocus && params.has('unitNumber');
      if (this.lessonFocus) {
        const lesson = this.findLesson(requestedLesson) ?? this.lessons[0];
        this.selectedLessonNumber = lesson.number;
        this.selectedUnitNumber = this.unitForLesson(lesson.number)?.number ?? 4;
        this.selectedSessionNumber = 1;
        this.selectedActivityIndex = 0;
        this.selectedPrintedPage = v2PagesForSession(this.selectedSession)[0];
        this.resetTeachingStage();
      } else if (this.libraryFocus) {
        const group = IREADY_VOLUME_TWO_LIBRARY.find((candidate) => candidate.key === requestedLibrary) ?? IREADY_VOLUME_TWO_LIBRARY[0];
        this.selectedLibraryKey = group.key;
        this.selectedViewerPage = group.viewerStart;
        this.selectedUnitNumber = group.unit ?? 4;
      } else if (this.unitFocus) {
        this.selectedUnitNumber = this.findUnit(requestedUnit)?.number ?? 4;
        this.selectedLessonNumber = this.selectedUnit.lessons[0].number;
      }
      this.lessonView = 'teaching';
      this.updateTitle();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get selectedUnit(): Grade3CmcUnit {
    return this.findUnit(this.selectedUnitNumber) ?? this.units[0];
  }

  get selectedLesson(): Grade3CmcLesson {
    return this.findLesson(this.selectedLessonNumber) ?? this.lessons[0];
  }

  get activeSessions(): readonly IReadyV2Session[] {
    return v2SessionsForLesson(this.selectedLessonNumber);
  }

  get selectedSession(): IReadyV2Session {
    const session = this.activeSessions.find((candidate) => candidate.session === this.selectedSessionNumber) ?? this.activeSessions[0];
    if (!session) throw new Error(`No official Volume 2 session for Lesson ${this.selectedLessonNumber}.`);
    return session;
  }

  get selectedSessionPages(): readonly number[] {
    return v2PagesForSession(this.selectedSession);
  }

  get activeActivities(): readonly IReadyV2Activity[] {
    return v2ActivitiesForSession(this.selectedSession);
  }

  get selectedActivity(): IReadyV2Activity {
    const activity = this.activeActivities[this.selectedActivityIndex] ?? this.activeActivities[0];
    if (!activity) throw new Error(`No exact official activity for Lesson ${this.selectedLessonNumber}, Session ${this.selectedSessionNumber}.`);
    return activity;
  }

  get selectedTeacherSpread(): IReadyV2TeacherSpread | undefined {
    return v2TeacherSpreadForPrintedPage(this.selectedPrintedPage);
  }

  get selectedTeacherViewerPages(): readonly number[] {
    return [this.selectedActivity.teacherViewerPage];
  }

  get hasExactActivityVisual(): boolean {
    return v2HasExactActivityVisual(this.selectedActivity);
  }

  get selectedActivityVisual() {
    const solved = this.lessonView === 'teaching';
    const key = `${this.selectedActivity.key}-${solved ? 'solved' : 'blank'}`;
    const cached = this.visualCache.get(key);
    if (cached) return cached;
    const visual = v2VisualForActivity(this.selectedSession, this.selectedActivity, solved);
    this.visualCache.set(key, visual);
    return visual;
  }

  get teachingStepCount(): number {
    return Math.max(1, this.selectedActivityVisual.sections.length);
  }

  get selectedLibrary(): IReadyV2LibraryGroup {
    return IREADY_VOLUME_TWO_LIBRARY.find((group) => group.key === this.selectedLibraryKey) ?? IREADY_VOLUME_TWO_LIBRARY[0];
  }

  get selectedLibraryPages(): readonly number[] {
    return v2ViewerPagesForLibrary(this.selectedLibrary);
  }

  get previousLesson(): Grade3CmcLesson | undefined {
    const index = this.lessons.findIndex((lesson) => lesson.number === this.selectedLessonNumber);
    return index > 0 ? this.lessons[index - 1] : undefined;
  }

  get nextLesson(): Grade3CmcLesson | undefined {
    const index = this.lessons.findIndex((lesson) => lesson.number === this.selectedLessonNumber);
    return index >= 0 && index < this.lessons.length - 1 ? this.lessons[index + 1] : undefined;
  }

  unitIdeas(unit: number): readonly IReadyV2UnitIdea[] {
    return v2UnitIdeas(unit);
  }

  unitLibrary(unit: number): readonly IReadyV2LibraryGroup[] {
    return v2LibraryForUnit(unit);
  }

  totalSessions(unit: Grade3CmcUnit): number {
    return unit.lessons.reduce((sum, lesson) => sum + lesson.sessions, 0);
  }

  selectSession(sessionNumber: number): void {
    this.selectedSessionNumber = sessionNumber;
    this.selectedActivityIndex = 0;
    this.selectedPrintedPage = v2PagesForSession(this.selectedSession)[0];
    this.lessonView = 'teaching';
    this.showLessonValidation = false;
    this.lessonFeedback = v2HasExactActivityVisual(this.selectedActivity)
      ? 'Page-specific visual teaching is open for this activity.'
      : 'No page-specific visual has passed source review; no substitute is shown.';
    this.resetTeachingStage();
  }

  selectActivity(activityIndex: number): void {
    const activity = this.activeActivities[activityIndex];
    if (!activity) return;
    this.selectedActivityIndex = activityIndex;
    this.selectedPrintedPage = activity.printedPage;
    this.showLessonValidation = false;
    this.lessonFeedback = v2HasExactActivityVisual(activity)
      ? `${this.lessonView === 'teaching' ? 'Solved' : 'Blank'} page-specific visual is open for Student Worktext p. ${activity.printedPage}.`
      : 'No page-specific visual has passed source review; no substitute is shown.';
    this.resetTeachingStage();
  }

  selectPrintedPage(page: number): void {
    this.selectedPrintedPage = page;
    const activityIndex = this.activeActivities.findIndex((activity) => activity.printedPage === page);
    if (activityIndex >= 0) this.selectedActivityIndex = activityIndex;
  }

  selectLessonView(view: 'teaching' | 'try' | 'student' | 'teacher'): void {
    this.lessonView = view;
    this.showLessonValidation = false;
    if (view === 'student') {
      this.lessonFeedback = `Official Student Worktext p. ${this.selectedActivity.printedPage} is open.`;
      return;
    }
    if (view === 'teacher') {
      this.lessonFeedback = `Official Teacher Guide viewer p. ${this.selectedActivity.teacherViewerPage} is open.`;
      return;
    }
    this.lessonFeedback = this.hasExactActivityVisual
      ? `${view === 'teaching' ? 'Solved' : 'Blank'} page-specific visual is open for Student Worktext p. ${this.selectedActivity.printedPage}.`
      : 'No page-specific visual has passed source review; no substitute is shown.';
    if (view === 'teaching') {
      this.solutionRevealCount = this.teachingStepCount;
      requestAnimationFrame(() => this.visualWorkspace?.replayAnimation());
    }
  }

  previousTeachingStep(): void {
    this.solutionRevealCount = Math.max(1, this.solutionRevealCount - 1);
  }

  nextTeachingStep(): void {
    this.solutionRevealCount = Math.min(this.teachingStepCount, this.solutionRevealCount + 1);
  }

  checkLessonWork(): void {
    this.showLessonValidation = true;
    queueMicrotask(() => {
      const status = this.visualWorkspace?.responseStatus();
      if (!status || status.total === 0) {
        this.lessonFeedback = 'This visual has no discrete response to score. Use the model, then compare with Show solution.';
      } else if (status.answered === 0) {
        this.lessonFeedback = 'Start by entering or selecting a response in the visual.';
      } else if (status.incorrect === 0 && status.answered === status.total) {
        this.lessonFeedback = `All ${status.total} responses match the official model.`;
      } else {
        this.lessonFeedback = `${status.correct} of ${status.total} responses match. Revisit the highlighted response before opening the solution.`;
      }
    });
  }

  replayLessonVisual(): void {
    this.solutionRevealCount = this.teachingStepCount;
    this.visualWorkspace?.replayAnimation();
    this.lessonFeedback = 'The complete visual teaching model has been replayed.';
  }

  selectViewerPage(viewerPage: number): void {
    this.selectedViewerPage = viewerPage;
  }

  printedPageForViewer(viewerPage: number): number | undefined {
    return viewerPage >= 13 && viewerPage <= 335 ? viewerPage + 454 : undefined;
  }

  pageLabel(viewerPage: number): string {
    const printed = this.printedPageForViewer(viewerPage);
    return printed ? `Printed p. ${printed}` : `Book p. ${viewerPage}`;
  }

  familyPages(lesson: Grade3CmcLesson): string {
    return `${lesson.printPage}–${lesson.printPage + 1}`;
  }

  lessonUrl(lesson: Grade3CmcLesson): string {
    return v2OfficialUrlForPrintedPage(lesson.printPage);
  }

  ideaUrl(idea: IReadyV2UnitIdea): string {
    return v2OfficialUrlForViewerPage(idea.viewerPage);
  }

  viewerPageForPrinted(printedPage: number): number {
    return v2ViewerPageForPrintedPage(printedPage);
  }

  private findUnit(number: number): Grade3CmcUnit | undefined {
    return this.units.find((unit) => unit.number === number);
  }

  private findLesson(number: number): Grade3CmcLesson | undefined {
    return this.lessons.find((lesson) => lesson.number === number);
  }

  private unitForLesson(lessonNumber: number): Grade3CmcUnit | undefined {
    return this.units.find((unit) => unit.lessons.some((lesson) => lesson.number === lessonNumber));
  }

  private updateTitle(): void {
    if (this.lessonFocus) this.title.setTitle(`Lesson ${this.selectedLessonNumber} · i-Ready Volume 2 | Ruchika Grade 3`);
    else if (this.unitFocus) this.title.setTitle(`Unit ${this.selectedUnitNumber} · i-Ready Volume 2 | Ruchika Grade 3`);
    else if (this.libraryFocus) this.title.setTitle(`${this.selectedLibrary.title} · i-Ready Volume 2 | Ruchika Grade 3`);
    else this.title.setTitle('Volume 2 · i-Ready Interactive | Ruchika Grade 3');
  }

  private resetTeachingStage(): void {
    queueMicrotask(() => {
      this.solutionRevealCount = this.teachingStepCount;
    });
  }
}
