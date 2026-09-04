import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { animate, stagger } from 'animejs';
import { Subscription } from 'rxjs';
import { ProblemVisualWorkspaceComponent } from '../../shared/problem-visual-workspace/problem-visual-workspace';
import { Grade3CmcLesson, Grade3CmcUnit, GRADE3_CMC_UNITS } from '../syllabus-books/syllabus-books.data';
import { IReadyFamilyRoundingComponent } from './iready-family-rounding';
import {
  ArithmeticActivity,
  ConceptModelActivity,
  IReadyApprovedModel,
  IReadyInteractionEvidence,
  IReadyUnitIdea,
  IREADY_UNIT_IDEAS,
  NeighborIntervalsActivity,
  RoundChoiceActivity,
  interactionSourceUrl,
  unitIdeaSourceUrl as sourceUrlForUnitIdea,
  verifiedInteraction,
  verifiedInteractionsForLesson
} from './iready-interactive.evidence';
import { IReadySourceProblem, IReadyTeacherGuideProvenance, lessonHasCompleteSourceProblemCoverage, sourceProblemsForSession, teacherGuideProvenanceForProblem } from './iready-volume1-problems';
import {
  IREADY_VOLUME_ONE_SUPPORT,
  IReadySupportTeacherProvenance,
  IReadyVolumeOneSupportResource,
  familyResourceForLesson,
  supportResourceUrl,
  supportResourcesForUnit,
  supportStudentImage,
  supportStudentPages,
  supportTeacherImage,
  supportTeacherPrintedPages,
  supportTeacherProvenance,
  supportTeacherSourceUrl,
  supportWorkspaceSpec
} from './iready-volume1-support';

@Component({
  selector: 'app-iready-interactive-page',
  imports: [FormsModule, NgFor, NgIf, RouterLink, ProblemVisualWorkspaceComponent, IReadyFamilyRoundingComponent],
  templateUrl: './iready-interactive.html',
  styleUrl: './iready-interactive.css'
})
export class IReadyInteractivePage implements AfterViewInit, OnDestroy {
  readonly volumeOneUnits = GRADE3_CMC_UNITS.filter((unit) => unit.volume === 1);
  readonly volumeOneLessons = this.volumeOneUnits.flatMap((unit) => unit.lessons);
  readonly placeLabels = ['Hundreds', 'Tens', 'Ones'];
  readonly unitIdeaSourceUrl = sourceUrlForUnitIdea;
  readonly supportResourceUrl = supportResourceUrl;
  readonly supportStudentImage = supportStudentImage;
  readonly supportTeacherImage = supportTeacherImage;
  readonly supportTeacherPrintedPages = supportTeacherPrintedPages;
  readonly supportTeacherSourceUrl = supportTeacherSourceUrl;

  selectedLessonNumber = 1;
  selectedSessionNumber = 1;
  selectedSourceProblemIndex = 0;
  selectedUnitNumber = 1;
  unitFocus = false;
  lessonFocus = false;
  resourceFocus = false;
  selectedResourceKey = IREADY_VOLUME_ONE_SUPPORT[0].key;
  resourceMode: 'student' | 'work' | 'teacher' = 'student';
  readonly selfCheckSkills = [
    {
      statement: 'Use place value to round numbers to the nearest ten and to the nearest hundred, for example:',
      examples: ['315 rounded to the nearest ten is 320.', '826 rounded to the nearest hundred is 800.']
    },
    { statement: 'Use place value to add and subtract.', examples: [] },
    { statement: 'Solve word problems by adding and subtracting using place value.', examples: [] },
    { statement: 'Explain strategies by telling what you noticed about the numbers and what you decided to do.', examples: [] }
  ] as const;
  selfCheckBefore = this.selfCheckSkills.map(() => false);
  selfCheckAfter = this.selfCheckSkills.map(() => false);
  tensLow = '';
  tensHigh = '';
  hundredsLow = '';
  hundredsHigh = '';
  sessionOneFeedback = '';
  activityMode: 'try' | 'solution' = 'solution';
  lessonWorkspaceView: 'teaching' | 'try' | 'student' | 'teacher' = 'teaching';
  guidedStage: 'try' | 'check' | 'model' | 'solution' = 'solution';
  solutionRevealCount = 0;
  lessonStageAnnouncement = 'Source-backed visual teaching is open.';
  solutionAnimationRun = false;
  roundChoice?: number;
  arithmeticAnswer = '';
  arithmeticFeedback = '';
  arithmeticCorrect = false;
  showArithmeticModel = false;
  conceptAnswer = '';
  conceptFeedback = '';
  conceptCorrect = false;
  private readonly subscriptions = new Subscription();
  private sourceRevealTimers: Array<ReturnType<typeof setTimeout>> = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        const requestedLesson = Number(params.get('lessonNumber'));
        const requestedUnit = Number(params.get('unitNumber'));
        const requestedResource = params.get('resourceKey');
        this.lessonFocus = params.has('lessonNumber');
        this.resourceFocus = !this.lessonFocus && params.has('resourceKey');
        this.unitFocus = !this.lessonFocus && !this.resourceFocus && params.has('unitNumber');
        if (this.lessonFocus) {
          this.selectedLessonNumber = this.findLesson(requestedLesson) ? requestedLesson : 1;
          this.selectedUnitNumber = this.unitForLesson(this.selectedLessonNumber)?.number ?? 1;
        } else if (this.resourceFocus) {
          const resource = IREADY_VOLUME_ONE_SUPPORT.find((candidate) => candidate.key === requestedResource) ?? IREADY_VOLUME_ONE_SUPPORT[0];
          this.selectedResourceKey = resource.key;
          this.selectedUnitNumber = resource.unit;
          this.selectedLessonNumber = resource.lesson ?? this.selectedUnit.lessons[0].number;
        } else if (this.unitFocus) {
          this.selectedUnitNumber = this.findUnit(requestedUnit)?.number ?? 1;
          this.selectedLessonNumber = this.selectedUnit.lessons[0].number;
        } else {
          this.selectedUnitNumber = 1;
          this.selectedLessonNumber = 1;
        }
        this.selectedSessionNumber = 1;
        this.selectedSourceProblemIndex = 0;
        this.resourceMode = this.resourceFocus && this.selectedResourceKey === 'v1-u1-self-check' ? 'work' : 'student';
        this.resetActivity();
        this.openVisualTeaching();
        this.updateTitle();
      })
    );
  }

  ngAfterViewInit(): void {
    this.scheduleVerifiedVisual();
  }

  ngOnDestroy(): void {
    this.clearSourceRevealTimers();
    this.subscriptions.unsubscribe();
  }

  get selectedUnit(): Grade3CmcUnit {
    return this.findUnit(this.selectedUnitNumber) ?? this.volumeOneUnits[0];
  }

  get selectedLesson(): Grade3CmcLesson {
    return this.findLesson(this.selectedLessonNumber) ?? this.volumeOneUnits[0].lessons[0];
  }

  get selectedResource(): IReadyVolumeOneSupportResource {
    return IREADY_VOLUME_ONE_SUPPORT.find((resource) => resource.key === this.selectedResourceKey) ?? IREADY_VOLUME_ONE_SUPPORT[0];
  }

  get selectedResourceTeacher(): IReadySupportTeacherProvenance {
    return supportTeacherProvenance(this.selectedResource);
  }

  get selectedResourceStudentPages(): readonly number[] {
    return supportStudentPages(this.selectedResource);
  }

  get selectedResourceWorkspace() {
    return supportWorkspaceSpec(this.selectedResource);
  }

  get previousResource(): IReadyVolumeOneSupportResource | undefined {
    const index = IREADY_VOLUME_ONE_SUPPORT.findIndex((resource) => resource.key === this.selectedResourceKey);
    return index > 0 ? IREADY_VOLUME_ONE_SUPPORT[index - 1] : undefined;
  }

  get nextResource(): IReadyVolumeOneSupportResource | undefined {
    const index = IREADY_VOLUME_ONE_SUPPORT.findIndex((resource) => resource.key === this.selectedResourceKey);
    return index >= 0 && index < IREADY_VOLUME_ONE_SUPPORT.length - 1 ? IREADY_VOLUME_ONE_SUPPORT[index + 1] : undefined;
  }

  get resourceTeacherLabel(): string {
    if (this.selectedResourceTeacher.teacherRole === 'solved') return 'Official solutions';
    if (this.selectedResourceTeacher.teacherRole === 'teaching') return 'Official teaching';
    return 'Teacher guidance';
  }

  get isSelfCheckResource(): boolean {
    return this.selectedResource.key === 'v1-u1-self-check';
  }

  get isLessonOneFamilyResource(): boolean {
    return this.selectedResource.key === 'v1-u1-l1-family';
  }

  get activeSessions(): readonly IReadyInteractionEvidence[] {
    return verifiedInteractionsForLesson(this.selectedLessonNumber);
  }

  get selectedSession(): IReadyInteractionEvidence {
    const session = this.activeSessions.find((candidate) => candidate.session === this.selectedSessionNumber) ?? this.activeSessions[0];
    if (!session) {
      throw new Error(`No verified i-Ready session is available for Lesson ${this.selectedLessonNumber}.`);
    }
    return session;
  }

  get sourceProblems(): readonly IReadySourceProblem[] {
    return sourceProblemsForSession(this.selectedLessonNumber, this.selectedSessionNumber);
  }

  get selectedSourceProblem(): IReadySourceProblem | undefined {
    return this.sourceProblems[this.selectedSourceProblemIndex];
  }

  get selectedProblemTraceability() {
    return this.selectedSourceProblem?.traceability;
  }

  get selectedSourceProblemUrl(): string {
    const problem = this.selectedSourceProblem;
    return problem
      ? `https://online.flippingbook.com/view/336581625/${problem.viewerPage}/`
      : this.sessionSourceUrl;
  }

  get selectedTeacherGuideProvenance(): IReadyTeacherGuideProvenance | undefined {
    return this.selectedSourceProblem ? teacherGuideProvenanceForProblem(this.selectedSourceProblem) : undefined;
  }

  get selectedProblemStudentPages(): readonly number[] {
    const printedPages = this.selectedSourceProblem?.printedPages;
    if (!printedPages) return [];
    const pages = [...printedPages.matchAll(/\d+/g)].map((match) => Number(match[0]));
    const start = pages[0];
    const end = pages[1] ?? start;
    return Array.from({ length: end - start + 1 }, (_, offset) => start + offset);
  }

  get selectedProblemTeacherPages(): readonly number[] {
    const page = this.selectedTeacherGuideProvenance?.teacherPdfPage;
    return page ? [page] : [];
  }

  get selectedTeacherGuideReaderPages(): string {
    return this.selectedTeacherGuideProvenance?.teacherGuidePages ?? '';
  }

  get selectedTeacherGuideSourceUrl(): string {
    const firstReaderPage = Number(this.selectedTeacherGuideReaderPages.match(/\d+/)?.[0]);
    return supportTeacherSourceUrl(Number.isFinite(firstReaderPage) ? firstReaderPage : undefined);
  }

  studentPdfViewerPage(printedPage: number): number {
    return printedPage + 12;
  }

  printedPagesLabel(printedPages: string): string {
    return `${printedPages.includes('–') || printedPages.includes('-') ? 'pp.' : 'p.'} ${printedPages}`;
  }

  selectSourceEdition(view: 'student' | 'teacher'): void {
    this.clearSourceRevealTimers();
    this.lessonWorkspaceView = view;
    this.lessonStageAnnouncement = view === 'student'
      ? `Official Student Worktext ${this.printedPagesLabel(this.selectedSourceProblem?.printedPages ?? '')} is open.`
      : `Official Teacher Guide reader pages ${this.selectedTeacherGuideReaderPages} are open.`;
  }

  get selectedProblemHasInlineSourceImages(): boolean {
    const studentPages = this.selectedProblemStudentPages;
    const teacherPages = this.selectedProblemTeacherPages;
    return this.selectedLessonNumber >= 1
      && this.selectedLessonNumber <= 19
      && studentPages.length > 0
      && studentPages.every((page) => page >= 9 && page <= 452)
      && teacherPages.length > 0
      && teacherPages.every((page) => page >= 52 && page <= 339);
  }

  get neighborActivity(): NeighborIntervalsActivity | undefined {
    const activity = this.lessonIsInteractive ? this.selectedSession.activity : undefined;
    return activity?.kind === 'neighbor-intervals' ? activity : undefined;
  }

  get roundActivity(): RoundChoiceActivity | undefined {
    const activity = this.lessonIsInteractive ? this.selectedSession.activity : undefined;
    return activity?.kind === 'round-choice' ? activity : undefined;
  }

  get arithmeticActivity(): ArithmeticActivity | undefined {
    const activity = this.lessonIsInteractive ? this.selectedSession.activity : undefined;
    return activity?.kind === 'arithmetic' ? activity : undefined;
  }

  get conceptActivity(): ConceptModelActivity | undefined {
    const activity = this.lessonIsInteractive ? this.selectedSession.activity : undefined;
    return activity?.kind === 'concept-model' ? activity : undefined;
  }

  get lessonIsInteractive(): boolean {
    const sessions = this.activeSessions;
    return this.selectedLesson.number <= 13
      && lessonHasCompleteSourceProblemCoverage(this.selectedLesson.number)
      && sessions.length === this.selectedLesson.sessions
      && sessions.every((session) => session.unit === this.selectedUnit.number && session.lesson === this.selectedLesson.number);
  }

  get previousLesson(): Grade3CmcLesson | undefined {
    const index = this.volumeOneLessons.findIndex((lesson) => lesson.number === this.selectedLessonNumber);
    return index > 0 ? this.volumeOneLessons[index - 1] : undefined;
  }

  get nextLesson(): Grade3CmcLesson | undefined {
    const index = this.volumeOneLessons.findIndex((lesson) => lesson.number === this.selectedLessonNumber);
    return index >= 0 && index < this.volumeOneLessons.length - 1 ? this.volumeOneLessons[index + 1] : undefined;
  }

  get sessionSourceUrl(): string {
    return interactionSourceUrl(this.selectedSession);
  }

  private get verifiedEvidence(): IReadyInteractionEvidence | undefined {
    if (!this.lessonIsInteractive) {
      return undefined;
    }
    const session = this.selectedSession;
    const evidence = verifiedInteraction(this.selectedLessonNumber, this.selectedSessionNumber);
    if (
      !evidence
      || evidence.key !== session.key
      || evidence.unit !== this.selectedUnit.number
      || evidence.lesson !== this.selectedLessonNumber
      || evidence.session !== this.selectedSessionNumber
      || evidence.printedPages !== session.printedPages
      || evidence.viewerPage !== session.viewerPage
      || evidence.sourceId !== session.sourceId
      || evidence.approvedModel !== session.approvedModel
    ) {
      return undefined;
    }
    return evidence;
  }

  get visualAnimationIsVerified(): boolean {
    return Boolean(this.verifiedEvidence);
  }

  unitIdeas(unit: Grade3CmcUnit): readonly IReadyUnitIdea[] {
    return IREADY_UNIT_IDEAS.filter((idea) => idea.unit === unit.number);
  }

  unitSupportResources(unit: Grade3CmcUnit): readonly IReadyVolumeOneSupportResource[] {
    return supportResourcesForUnit(unit.number);
  }

  lessonFamilyResource(lesson: Grade3CmcLesson): IReadyVolumeOneSupportResource | undefined {
    return familyResourceForLesson(lesson.number);
  }

  selectResourceMode(mode: 'student' | 'work' | 'teacher'): void {
    this.resourceMode = mode;
  }

  totalSessions(unit: Grade3CmcUnit): number {
    return unit.lessons.reduce((total, lesson) => total + lesson.sessions, 0);
  }

  lessonSourceUrl(lesson: Grade3CmcLesson): string {
    return `https://online.flippingbook.com/view/336581625/${lesson.printPage + 12}/`;
  }

  lessonIsReady(lesson: Grade3CmcLesson): boolean {
    return lesson.number <= 13
      && lessonHasCompleteSourceProblemCoverage(lesson.number)
      && verifiedInteractionsForLesson(lesson.number).length === lesson.sessions;
  }

  digits(value: number): number[] {
    return [Math.floor(value / 100), Math.floor(value / 10) % 10, value % 10];
  }

  range(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  conceptBarWidth(activity: ConceptModelActivity, value: number): number {
    const maximum = Math.max(...(activity.visual.bars ?? []).map((bar) => bar.value), 1);
    return Math.max(12, (value / maximum) * 100);
  }

  conceptPartLabel(index: number): string {
    return `Part ${String.fromCharCode(65 + index)}`;
  }

  conceptSequenceValue(activity: ConceptModelActivity, value: number): number | '?' {
    return this.activityMode === 'try' && value === activity.answer ? '?' : value;
  }

  selectSession(sessionNumber: number): void {
    this.selectedSessionNumber = sessionNumber;
    this.selectedSourceProblemIndex = 0;
    this.resetActivity();
    this.openVisualTeaching();
  }

  selectSourceProblem(index: number): void {
    if (index < 0 || index >= this.sourceProblems.length) return;
    this.selectedSourceProblemIndex = index;
    this.resetActivity();
    this.openVisualTeaching();
  }

  checkGuidedProblem(): void {
    if (!this.selectedSourceProblem || this.activityMode === 'solution') return;
    this.guidedStage = 'check';
    this.lessonStageAnnouncement = 'Check your entries. Correct entries are highlighted; revise any entry that needs another try.';
  }

  replayVerifiedVisual(): void {
    if (this.selectedSourceProblem) {
      this.beginSourceProblemSolution();
      return;
    }
    if (this.activityMode === 'solution') {
      this.playVerifiedSolution();
      return;
    }
    this.playVerifiedVisual();
  }

  get sourceTeachingStepCount(): number {
    return this.selectedSourceProblem?.solvedVisual.sections.length ?? 0;
  }

  previousSourceTeachingStep(): void {
    if (!this.selectedSourceProblem || this.activityMode !== 'solution') return;
    this.clearSourceRevealTimers();
    this.solutionRevealCount = Math.max(1, this.solutionRevealCount - 1);
    this.guidedStage = this.solutionRevealCount === this.sourceTeachingStepCount ? 'solution' : 'model';
    this.lessonStageAnnouncement = `Worked model step ${this.solutionRevealCount} of ${this.sourceTeachingStepCount}.`;
  }

  nextSourceTeachingStep(): void {
    if (!this.selectedSourceProblem || this.activityMode !== 'solution') return;
    this.clearSourceRevealTimers();
    this.solutionRevealCount = Math.min(this.sourceTeachingStepCount, this.solutionRevealCount + 1);
    this.guidedStage = this.solutionRevealCount === this.sourceTeachingStepCount ? 'solution' : 'model';
    this.lessonStageAnnouncement = this.guidedStage === 'solution'
      ? 'Worked solution complete.'
      : `Worked model step ${this.solutionRevealCount} of ${this.sourceTeachingStepCount}.`;
  }

  showVerifiedSolution(): void {
    const evidence = this.verifiedEvidence;
    if (!evidence?.supportsSolvedTeaching) {
      return;
    }
    if (this.selectedSourceProblem) {
      this.beginSourceProblemSolution();
      return;
    }
    this.activityMode = 'solution';
    this.solutionAnimationRun = true;
    const activity = evidence.activity;
    if (activity.kind === 'neighbor-intervals') {
      this.tensLow = String(activity.tens[0]);
      this.tensHigh = String(activity.tens[1]);
      this.hundredsLow = String(activity.hundreds[0]);
      this.hundredsHigh = String(activity.hundreds[1]);
      this.sessionOneFeedback = '';
    } else if (activity.kind === 'round-choice') {
      this.roundChoice = activity.answer;
    } else if (activity.kind === 'arithmetic') {
      this.arithmeticAnswer = String(activity.answer);
      this.arithmeticCorrect = true;
      this.arithmeticFeedback = `Correct. ${activity.left} ${activity.operation} ${activity.right} = ${activity.answer}.`;
      this.showArithmeticModel = true;
    } else {
      this.conceptAnswer = String(activity.answer);
      this.conceptCorrect = true;
      this.conceptFeedback = `Correct. The source-backed result is ${activity.answer}.`;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => this.playVerifiedSolution()));
  }

  openVisualTeaching(): void {
    this.lessonWorkspaceView = 'teaching';
    this.showVerifiedSolution();
  }

  returnToTry(): void {
    this.clearSourceRevealTimers();
    this.lessonWorkspaceView = 'try';
    this.resetActivity();
    this.scheduleVerifiedVisual();
  }

  checkSessionOne(): void {
    const activity = this.verifiedEvidence?.activity;
    if (activity?.kind !== 'neighbor-intervals') {
      return;
    }
    const answers = [this.tensLow, this.tensHigh, this.hundredsLow, this.hundredsHigh].map(Number);
    const expected = [...activity.tens, ...activity.hundreds];
    this.sessionOneFeedback = answers.every((answer, index) => answer === expected[index])
      ? activity.correctFeedback
      : activity.tryAgainFeedback;
  }

  chooseRound(value: number): void {
    if (this.activityMode === 'try') {
      this.roundChoice = value;
    }
  }

  checkArithmetic(activity: ArithmeticActivity): void {
    this.arithmeticCorrect = Number(this.arithmeticAnswer) === activity.answer;
    this.arithmeticFeedback = this.arithmeticCorrect
      ? `Correct. ${activity.left} ${activity.operation} ${activity.right} = ${activity.answer}.`
      : activity.hint;
  }

  checkConcept(activity: ConceptModelActivity): void {
    this.conceptCorrect = Number(this.conceptAnswer) === activity.answer;
    this.conceptFeedback = this.conceptCorrect
      ? `Correct. The result is ${activity.answer}.`
      : activity.hint;
  }

  toggleArithmeticModel(): void {
    this.showArithmeticModel = !this.showArithmeticModel;
  }

  private resetActivity(): void {
    this.clearSourceRevealTimers();
    this.activityMode = 'try';
    this.guidedStage = 'try';
    this.solutionRevealCount = 0;
    this.lessonStageAnnouncement = 'Try the official activity.';
    this.solutionAnimationRun = false;
    this.roundChoice = undefined;
    this.arithmeticAnswer = '';
    this.arithmeticFeedback = '';
    this.arithmeticCorrect = false;
    this.showArithmeticModel = false;
    this.conceptAnswer = '';
    this.conceptFeedback = '';
    this.conceptCorrect = false;
    this.tensLow = '';
    this.tensHigh = '';
    this.hundredsLow = '';
    this.hundredsHigh = '';
    this.sessionOneFeedback = '';
  }

  private beginSourceProblemSolution(): void {
    const problem = this.selectedSourceProblem;
    const evidence = this.verifiedEvidence;
    if (!problem || !evidence?.supportsSolvedTeaching || !this.selectedTeacherGuideProvenance) return;

    this.clearSourceRevealTimers();
    this.activityMode = 'solution';
    this.guidedStage = 'model';
    this.solutionRevealCount = Math.min(1, problem.solvedVisual.sections.length);
    this.lessonStageAnnouncement = `Worked model step 1 of ${problem.solvedVisual.sections.length}.`;
    const sectionCount = problem.solvedVisual.sections.length;
    if (sectionCount <= 1) {
      this.guidedStage = 'solution';
      this.lessonStageAnnouncement = 'Worked solution displayed.';
      return;
    }

    this.sourceRevealTimers = Array.from({ length: sectionCount - 1 }, (_, index) => setTimeout(() => {
      this.solutionRevealCount = index + 2;
      this.guidedStage = this.solutionRevealCount === sectionCount ? 'solution' : 'model';
      this.lessonStageAnnouncement = this.guidedStage === 'solution'
        ? 'Worked solution complete.'
        : `Worked model step ${this.solutionRevealCount} of ${sectionCount}.`;
      this.changeDetector.detectChanges();
    }, (index + 1) * 850));
  }

  private clearSourceRevealTimers(): void {
    this.sourceRevealTimers.forEach((timer) => clearTimeout(timer));
    this.sourceRevealTimers = [];
  }

  private scheduleVerifiedVisual(): void {
    if (typeof requestAnimationFrame === 'undefined') {
      return;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => this.playVerifiedVisual()));
  }

  private playVerifiedVisual(): void {
    if (!this.visualAnimationIsVerified) {
      return;
    }
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const activity = this.elementRef.nativeElement.querySelector<HTMLElement>('.activity-card');
    const model = this.verifiedEvidence?.approvedModel;
    if (!activity || !model) {
      return;
    }

    const selectorByModel: Record<IReadyApprovedModel, string> = {
      'place-value-chart': '.place-value-chart div',
      'nearest-ten-line': '.number-line .line, .number-line .tick, .number-line .label',
      'base-ten-blocks': '.base-ten-model > span, .base-ten-model .ones i',
      'nearest-hundred-line': '.number-line .line, .number-line .tick, .number-line .label',
      'place-value-decomposition': '.vertical-operation, .digit-model > *',
      'partial-sums': '.vertical-operation, .digit-model > *',
      'addition-algorithm': '.vertical-operation, .digit-model > *',
      'place-value-regrouping': '.vertical-operation, .digit-model > *',
      'open-number-line': '.vertical-operation, .jump-model > *',
      'subtraction-algorithm': '.vertical-operation, .digit-model > *',
      'equal-groups': '.concept-group',
      array: '.concept-tile',
      'factor-break-apart': '.concept-step',
      'fact-family': '.concept-step',
      'equation-flow': '.concept-step',
      'place-value-groups': '.concept-step',
      'division-groups': '.concept-step',
      'pattern-strip': '.concept-sequence span',
      'area-grid': '.concept-tile',
      'composite-area': '.concept-step',
      'scaled-graph': '.concept-bar'
    };
    const prompt = Array.from(activity.querySelectorAll<HTMLElement>('.activity-label, .activity-copy h4, .activity-copy > p'));
    const visual = Array.from(activity.querySelectorAll<HTMLElement>(selectorByModel[model]));
    if (!visual.length) {
      return;
    }

    animate(prompt, {
      opacity: [0.35, 1],
      translateY: [7, 0],
      duration: 300,
      delay: stagger(55),
      ease: 'out(2)'
    });
    animate(visual, {
      opacity: [0, 1],
      translateY: [10, 0],
      scale: [0.88, 1],
      duration: 460,
      delay: stagger(70, { start: 220 }),
      ease: 'out(3)'
    });
  }

  private playVerifiedSolution(): void {
    if (
      !this.visualAnimationIsVerified
      || this.activityMode !== 'solution'
    ) {
      return;
    }

    this.solutionAnimationRun = true;
    const activity = this.elementRef.nativeElement.querySelector<HTMLElement>('.activity-card');
    if (!activity) {
      return;
    }
    activity.classList.remove('animate-solution');
    void activity.offsetWidth;
    activity.classList.add('animate-solution');
  }

  private findLesson(number: number): Grade3CmcLesson | undefined {
    return this.volumeOneUnits.flatMap((unit) => unit.lessons).find((lesson) => lesson.number === number);
  }

  private findUnit(number: number): Grade3CmcUnit | undefined {
    return this.volumeOneUnits.find((unit) => unit.number === number);
  }

  private unitForLesson(lessonNumber: number): Grade3CmcUnit | undefined {
    return this.volumeOneUnits.find((unit) => unit.lessons.some((lesson) => lesson.number === lessonNumber));
  }

  private updateTitle(): void {
    if (this.lessonFocus) {
      this.title.setTitle(`Lesson ${this.selectedLessonNumber} · i-Ready Interactive | Ruchika Grade 3`);
      return;
    }
    if (this.resourceFocus) {
      this.title.setTitle(`${this.selectedResource.title} · i-Ready Interactive | Ruchika Grade 3`);
      return;
    }
    if (this.unitFocus) {
      this.title.setTitle(`Unit ${this.selectedUnitNumber} · i-Ready Interactive | Ruchika Grade 3`);
      return;
    }
    this.title.setTitle('Volume 1 · i-Ready Interactive | Ruchika Grade 3');
  }
}
