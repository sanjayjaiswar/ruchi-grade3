import readingSourceCatalog from '../../data/reading-source-pages.data.json';
import publisherCatalog from '../../data/reading-publisher-pages.data.json';
import { ReadingSourceViewer, ReadingSourcePage } from './reading-source-viewer';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import {
  BAKER_CURRICULUM_SOURCE,
  CALIFORNIA_ADOPTION_SOURCE,
  MORELAND_ASSESSMENT_SOURCE,
  MORELAND_CURRICULUM_SOURCE,
  READING_SCOPE_SOURCE,
  READING_UNITS,
  SCCOE_STANDARDS_SOURCE,
  ReadingUnit,
  ReadingWeek,
  readingUnitById,
  scopePrintedPage
} from '../../data/reading-curriculum.data';
import {
  READING_EVIDENCE_QUESTIONS,
  READING_TEXT_EVIDENCE_SOURCE,
  ReadingEvidenceQuestion,
  ReadingStrategyGuide,
  readingQuestionByNumber,
  readingQuestionsForUnit,
  readingQuestionsForWeek,
  readingStrategyGuide
} from '../../data/reading-evidence-questions.data';
import {
  READING_STRATEGY_EXAMPLES,
  ReadingStrategyExample,
  readingStrategyExampleFor
} from '../../data/reading-strategy-examples.data';
import {
  ReadingStudioWeek,
  UNIT1_READING_STUDIOS
} from '../../data/reading-enrichment.data';
import {
  ReadingOfficialLesson,
  WORKING_TOGETHER_LESSON,
  admittedReadingLesson
} from '../../data/reading-official-lessons.data';
import {
  BAKER_2025_SPSA_SOURCE,
  BAKER_ASSESSMENT_EVIDENCE,
  CALIFORNIA_GRADE3_ELA_STANDARDS_SOURCE,
  CALIFORNIA_TEXT_COMPLEXITY_SOURCE,
  CAASPP_ELA_SCORE_SOURCE,
  GRADE3_ASSESSMENT_SYSTEM,
  GRADE3_ELA_DOMAINS,
  GRADE3_ELA_STANDARD_COUNT,
  LEXILE_FRAMEWORK_SOURCE,
  READING_LEVEL_FACTS
} from '../../data/reading-learning-system.data';

type ReadingPageKind = 'overview' | 'sources' | 'standards' | 'assessments' | 'levels' | 'unit' | 'lesson' | 'practice';
type PracticeStage = 'learn' | 'watch' | 'practice' | 'respond';
type LessonStage = 'before' | 'first-read' | 'reread' | 'respond' | 'source';
type StandardsDomainId = 'rl' | 'ri' | 'rf' | 'w' | 'sl' | 'l';

@Component({
  selector: 'app-reading-home-page',
  imports: [NgFor, NgIf, RouterLink, ReadingSourceViewer],
  templateUrl: './reading-home.html',
  styleUrl: './reading-home.css'
})
export class ReadingHomePage implements OnDestroy {
  readonly units = READING_UNITS;
  readonly scopeSourcePages = readingSourceCatalog.pages.filter(page => page.document === 'scope' && page.kind !== 'spread');
  readonly scopeSpreadPages = readingSourceCatalog.pages.filter(page => page.document === 'scope' && page.kind === 'spread');
  readonly questionSourcePages = readingSourceCatalog.pages.filter(page => page.document === 'questions');
  readonly programSourcePages = readingSourceCatalog.pages.filter(page => page.document === 'program-sample' && page.kind === 'document-page');
  readonly publisherCollections = publisherCatalog.documents.map(document => ({
    ...document, pages: publisherCatalog.pages.filter(page => page.document === document.key)
  }));
  readonly unitPublisherCollections = READING_UNITS.map(unit => this.publisherCollections
    .filter(collection => collection.unit === unit.number || collection.key === 'language-pacing')
    .map(collection => ({ ...collection, pages: collection.key === 'language-pacing'
      ? collection.pages.filter(page => page.unit === unit.number) : collection.pages })));
  readonly lessonSourcePages = publisherCatalog.pages.filter(page =>
    (page.document === 'apply-u1w1' && page.viewerPage <= 2) ||
    (page.document === 'language-pacing' && page.unit === 1 && page.week === 1))
    .sort((a, b) => Number(a.document === 'language-pacing') - Number(b.document === 'language-pacing'));
  readonly studentQuestionPages: Record<string, readonly ReadingSourcePage[]> = Object.fromEntries(
    READING_EVIDENCE_QUESTIONS.filter(question => question.unitNumber === 4).map(question => {
      // Printed-page ranges verified against the reader contents and each question.
      // Comparison questions include both complete selections.
      const ranges: Record<number, number[][]> = {
        1: [[4, 5]], 2: [[4, 5]], 3: [[4, 9]], 4: [[6, 9]],
        5: [[12, 19]], 6: [[12, 19]], 7: [[12, 19]], 8: [[22, 29]],
        9: [[12, 19], [22, 29]], 10: [[12, 19], [22, 29]]
      };
      return [question.id, publisherCatalog.pages.filter(page => page.document === 'student-u4' &&
        page.printedPage !== null && ranges[question.questionNumber].some(([start, end]) =>
          page.printedPage! >= start && page.printedPage! <= end))];
    })
  );
  readonly unitScopePages = READING_UNITS.map(unit => this.scopeSourcePages.filter(page => page.unit === unit.number));
  readonly unitQuestionPages = this.questionSourcePages.map(page => [page]);
  readonly practiceSourcePages: Record<string, readonly ReadingSourcePage[]> = Object.fromEntries(
    READING_EVIDENCE_QUESTIONS.map(question => [question.id, [
      this.questionSourcePages[question.unitNumber - 1],
      ...(this.studentQuestionPages[question.id] ?? []),
      ...this.unitScopePages[question.unitNumber - 1],
      ...(question.unitId === WORKING_TOGETHER_LESSON.unitId && question.selectionTitle === WORKING_TOGETHER_LESSON.title
        ? this.lessonSourcePages : []),
      ...(question.unitNumber === 1 && question.selectionTitle === 'Election Day'
        ? publisherCatalog.pages.filter(page => page.document === 'apply-u1w1' && page.viewerPage === 3) : [])
    ]])
  );
  readonly pilotLesson = WORKING_TOGETHER_LESSON;
  readonly standardsDomains = GRADE3_ELA_DOMAINS;
  readonly standardsCount = GRADE3_ELA_STANDARD_COUNT;
  readonly assessmentSystem = GRADE3_ASSESSMENT_SYSTEM;
  readonly bakerAssessmentEvidence = BAKER_ASSESSMENT_EVIDENCE;
  readonly readingLevelFacts = READING_LEVEL_FACTS;
  readonly evidenceQuestionSource = READING_TEXT_EVIDENCE_SOURCE;
  readonly sources = {
    morelandCurriculum: MORELAND_CURRICULUM_SOURCE,
    morelandAssessments: MORELAND_ASSESSMENT_SOURCE,
    bakerCurriculum: BAKER_CURRICULUM_SOURCE,
    californiaAdoption: CALIFORNIA_ADOPTION_SOURCE,
    sccoeStandards: SCCOE_STANDARDS_SOURCE,
    scope: READING_SCOPE_SOURCE
  };
  readonly learningSources = {
    californiaStandards: CALIFORNIA_GRADE3_ELA_STANDARDS_SOURCE,
    textComplexity: CALIFORNIA_TEXT_COMPLEXITY_SOURCE,
    caaspp: CAASPP_ELA_SCORE_SOURCE,
    bakerSpsa: BAKER_2025_SPSA_SOURCE,
    lexile: LEXILE_FRAMEWORK_SOURCE
  };
  readonly teachingSources = {
    iesComprehension: 'https://ies.ed.gov/ncee/rel/reading-comprehension-k-3/teacher-pd-module1',
    benchmarkProgram: 'https://info.benchmarkeducation.com/benchmark-advance-2022-national-view-virtual-samples',
    californiaLiteracy: 'https://www.cde.ca.gov/ci/cl/grades2and3lcb.asp'
  };

  pageKind: ReadingPageKind = 'overview';
  unit: ReadingUnit = READING_UNITS[0];
  readingWeek: ReadingWeek = READING_UNITS[0].weeks[0];
  officialLesson: ReadingOfficialLesson = WORKING_TOGETHER_LESSON;
  evidenceQuestion: ReadingEvidenceQuestion = READING_EVIDENCE_QUESTIONS[0];
  strategyGuide: ReadingStrategyGuide = readingStrategyGuide(READING_EVIDENCE_QUESTIONS[0].strategy);
  strategyExample: ReadingStrategyExample = READING_STRATEGY_EXAMPLES[READING_EVIDENCE_QUESTIONS[0].strategy];
  selectedWeekNumber = 1;
  unitReference: 'scope' | 'questions' | null = null;
  publisherReference: string | null = null;
  practiceView: 'teaching' | 'source' = 'teaching';
  selectedPracticeStage: PracticeStage = 'learn';
  selectedLessonStage: LessonStage = 'before';
  selectedStandardDomainId: StandardsDomainId = 'rl';
  modelStep = 1;
  readingActionChecks = [false, false, false];
  practiceSelfChecks = [false, false, false];
  practiceBookOpen = false;
  answeredAloud = false;
  lessonNumber = 1;
  notice = '';
  lessonBookOpen = false;
  lessonBeforeMoves = [false, false, false];
  vocabularyFound = WORKING_TOGETHER_LESSON.keyVocabulary.map(() => false);
  readParagraph = false;
  lessonRereadMoves = [false, false, false, false];
  lessonAnswerChecks = [false, false, false];
  lessonAnsweredAloud = false;
  wordStudyChecks = [false, false, false];
  writingStudioChecks = [false, false, false];
  private activeEvidenceQuestionId = '';
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly title: Title
  ) {
    this.subscriptions.add(
      this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => this.syncRoute())
    );
    this.subscriptions.add(this.route.paramMap.subscribe(() => this.syncRoute()));
    this.syncRoute();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  unitRoute(unit: ReadingUnit): string[] {
    return ['/ruchika', 'grade3', 'reading', 'units', unit.id];
  }

  lessonRoute(unit: ReadingUnit, lessonNumber: number): string[] {
    return ['/ruchika', 'grade3', 'reading', 'units', unit.id, 'lessons', String(lessonNumber)];
  }

  practiceRoute(unit: ReadingUnit, questionNumber: number): string[] {
    return ['/ruchika', 'grade3', 'reading', 'units', unit.id, 'practice', String(questionNumber)];
  }

  weekQuestions(week: ReadingWeek): ReadingEvidenceQuestion[] {
    return readingQuestionsForWeek(this.unit.id, week.number);
  }

  unitQuestions(unit: ReadingUnit = this.unit): ReadingEvidenceQuestion[] {
    return readingQuestionsForUnit(unit.id);
  }

  questionSourcePage(unit: ReadingUnit = this.unit): string {
    return this.questionSourcePages[unit.number - 1].image;
  }

  scopePage(unit: ReadingUnit): string {
    return this.scopeImage(unit);
  }

  scopePrintedPage(unit: ReadingUnit): number {
    return scopePrintedPage(unit);
  }

  scopeImage(unit: ReadingUnit): string {
    return this.scopeSpreadPages[unit.number - 1].image;
  }

  selectStandardDomain(domainId: StandardsDomainId): void {
    this.selectedStandardDomainId = domainId;
  }

  scrollToCurriculum(): void {
    document.getElementById('grade3-year-map')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  selectUnit(unitId: string): void {
    const selected = readingUnitById(unitId);
    if (selected) void this.router.navigate(this.unitRoute(selected));
  }

  selectWeek(weekNumber: number): void {
    this.selectedWeekNumber = weekNumber;
    this.readingWeek = this.unit.weeks[weekNumber - 1] ?? this.unit.weeks[0];
    this.wordStudyChecks = [false, false, false];
    this.writingStudioChecks = [false, false, false];
  }

  selectLessonStage(stage: LessonStage): void {
    this.selectedLessonStage = stage;
  }

  selectPracticeStage(stage: PracticeStage): void {
    this.selectedPracticeStage = stage;
  }

  toggleWordStudyCheck(index: number): void {
    this.wordStudyChecks[index] = !this.wordStudyChecks[index];
  }

  toggleWritingStudioCheck(index: number): void {
    this.writingStudioChecks[index] = !this.writingStudioChecks[index];
  }

  showModelStep(step: number): void {
    this.modelStep = Math.max(1, Math.min(4, step));
  }

  toggleReadingAction(index: number): void {
    this.readingActionChecks[index] = !this.readingActionChecks[index];
  }

  togglePracticeCheck(index: number): void {
    this.practiceSelfChecks[index] = !this.practiceSelfChecks[index];
  }

  toggleLessonBeforeMove(index: number): void {
    this.lessonBeforeMoves[index] = !this.lessonBeforeMoves[index];
  }

  toggleVocabulary(index: number): void {
    this.vocabularyFound[index] = !this.vocabularyFound[index];
  }

  toggleLessonRereadMove(index: number): void {
    this.lessonRereadMoves[index] = !this.lessonRereadMoves[index];
  }

  toggleLessonAnswerCheck(index: number): void {
    this.lessonAnswerChecks[index] = !this.lessonAnswerChecks[index];
  }

  get previousUnitRoute(): string[] | null {
    return this.unit.number > 1 ? this.unitRoute(READING_UNITS[this.unit.number - 2]) : null;
  }

  get nextUnitRoute(): string[] | null {
    return this.unit.number < READING_UNITS.length ? this.unitRoute(READING_UNITS[this.unit.number]) : null;
  }

  get lessonProgress(): number {
    return [
      this.lessonBookOpen,
      this.lessonBeforeMoves.every(Boolean),
      this.readParagraph && this.vocabularyFound.some(Boolean),
      this.lessonRereadMoves.every(Boolean),
      this.lessonAnsweredAloud
    ].filter(Boolean).length;
  }

  get previousQuestionRoute(): string[] | null {
    return this.evidenceQuestion.questionNumber > 1
      ? this.practiceRoute(this.unit, this.evidenceQuestion.questionNumber - 1)
      : null;
  }

  get nextQuestionRoute(): string[] | null {
    return this.evidenceQuestion.questionNumber < 10
      ? this.practiceRoute(this.unit, this.evidenceQuestion.questionNumber + 1)
      : null;
  }

  get selectedStandardDomain() {
    return this.standardsDomains.find((domain) => domain.id === this.selectedStandardDomainId) ?? this.standardsDomains[0];
  }

  get selectedStandardDomainCode(): string {
    return this.selectedStandardDomain.id.toUpperCase();
  }

  get selectedWeek(): ReadingWeek {
    return this.unit.weeks[this.selectedWeekNumber - 1] ?? this.unit.weeks[0];
  }

  get selectedStudio(): ReadingStudioWeek | null {
    return this.unit.id === 'u1' ? UNIT1_READING_STUDIOS[this.selectedWeekNumber] ?? null : null;
  }

  private syncRoute(): void {
    const url = this.router.url.split(/[?#]/)[0];
    const unitId = this.route.snapshot.paramMap.get('unitId');
    const lessonValue = Number(this.route.snapshot.paramMap.get('lessonNumber'));
    const questionValue = Number(this.route.snapshot.paramMap.get('questionNumber'));
    const routedUnit = readingUnitById(unitId);
    const routedQuestion = readingQuestionByNumber(unitId, questionValue);

    const admittedLesson = admittedReadingLesson(unitId, lessonValue);

    if (routedUnit && routedQuestion) {
      if (this.activeEvidenceQuestionId !== routedQuestion.id) {
        this.modelStep = 1;
        this.readingActionChecks = [false, false, false];
        this.practiceSelfChecks = [false, false, false];
        this.practiceBookOpen = false;
        this.answeredAloud = false;
        this.activeEvidenceQuestionId = routedQuestion.id;
      }
      this.pageKind = 'practice';
      this.unit = routedUnit;
      this.evidenceQuestion = routedQuestion;
      this.strategyGuide = readingStrategyGuide(routedQuestion.strategy);
      this.strategyExample = readingStrategyExampleFor(routedQuestion.id, routedQuestion.strategy);
      this.readingWeek = routedUnit.weeks[routedQuestion.weekNumber - 1];
      this.selectedPracticeStage = 'learn';
      this.practiceView = 'teaching';
      this.title.setTitle(`Question ${routedQuestion.questionNumber}: ${routedQuestion.selectionTitle} | Grade 3 Reading`);
    } else if (routedUnit && Number.isInteger(questionValue) && questionValue > 0) {
      void this.router.navigate(this.unitRoute(routedUnit));
      return;
    } else if (routedUnit && admittedLesson) {
      this.pageKind = 'lesson';
      this.unit = routedUnit;
      this.officialLesson = admittedLesson;
      this.lessonNumber = admittedLesson.lessonNumber;
      this.readingWeek = routedUnit.weeks[admittedLesson.weekNumber - 1];
      this.selectedLessonStage = 'before';
      this.title.setTitle(`${admittedLesson.title} | Grade 3 Reading & Language Arts`);
    } else if (routedUnit && Number.isInteger(lessonValue) && lessonValue > 0) {
      this.notice = 'That daily lesson is not published because an edition-matched official lesson source has not been admitted yet.';
      void this.router.navigate(this.unitRoute(routedUnit), { state: { sourceGateNotice: this.notice } });
      return;
    } else if (routedUnit) {
      this.pageKind = 'unit';
      this.unitReference = null;
      this.publisherReference = null;
      this.unit = routedUnit;
      this.lessonNumber = 1;
      this.readingWeek = routedUnit.weeks[0];
      this.selectedWeekNumber = 1;
      this.wordStudyChecks = [false, false, false];
      this.writingStudioChecks = [false, false, false];
      this.notice = history.state?.sourceGateNotice ?? '';
      this.title.setTitle(`Unit ${routedUnit.number}: ${routedUnit.title} | Grade 3 Reading & Language Arts`);
    } else if (url.endsWith('/standards')) {
      this.pageKind = 'standards';
      this.selectedStandardDomainId = 'rl';
      this.title.setTitle('California Grade 3 ELA standards | Ruchika Learning Portal');
    } else if (url.endsWith('/assessments')) {
      this.pageKind = 'assessments';
      this.title.setTitle('Grade 3 ELA assessments | Ruchika Learning Portal');
    } else if (url.endsWith('/levels')) {
      this.pageKind = 'levels';
      this.title.setTitle('Grade 3 reading levels and text complexity | Ruchika Learning Portal');
    } else if (url.endsWith('/sources')) {
      this.pageKind = 'sources';
      this.title.setTitle('Curriculum sources | Grade 3 Reading & Language Arts');
    } else {
      this.pageKind = 'overview';
      this.title.setTitle('Grade 3 Reading & Language Arts | Ruchika Learning Portal');
    }

    if (this.pageKind !== 'lesson') {
      this.lessonBookOpen = false;
      this.lessonBeforeMoves = [false, false, false];
      this.vocabularyFound = WORKING_TOGETHER_LESSON.keyVocabulary.map(() => false);
      this.readParagraph = false;
      this.lessonRereadMoves = [false, false, false, false];
      this.lessonAnswerChecks = [false, false, false];
      this.lessonAnsweredAloud = false;
    }
    if (this.pageKind !== 'practice') {
      this.activeEvidenceQuestionId = '';
      this.modelStep = 1;
      this.readingActionChecks = [false, false, false];
      this.practiceSelfChecks = [false, false, false];
      this.practiceBookOpen = false;
      this.answeredAloud = false;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
