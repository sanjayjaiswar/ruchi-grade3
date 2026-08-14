import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

type ReadingPageKind = 'overview' | 'sources' | 'standards' | 'assessments' | 'levels' | 'unit' | 'lesson';

@Component({
  selector: 'app-reading-home-page',
  imports: [FormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './reading-home.html',
  styleUrl: './reading-home.css'
})
export class ReadingHomePage implements OnDestroy {
  readonly units = READING_UNITS;
  readonly pilotLesson = WORKING_TOGETHER_LESSON;
  readonly standardsDomains = GRADE3_ELA_DOMAINS;
  readonly standardsCount = GRADE3_ELA_STANDARD_COUNT;
  readonly assessmentSystem = GRADE3_ASSESSMENT_SYSTEM;
  readonly bakerAssessmentEvidence = BAKER_ASSESSMENT_EVIDENCE;
  readonly readingLevelFacts = READING_LEVEL_FACTS;
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

  pageKind: ReadingPageKind = 'overview';
  unit: ReadingUnit = READING_UNITS[0];
  readingWeek: ReadingWeek = READING_UNITS[0].weeks[0];
  officialLesson: ReadingOfficialLesson = WORKING_TOGETHER_LESSON;
  lessonNumber = 1;
  notice = '';
  prediction = '';
  problem = '';
  teamwork = '';
  evidence = '';
  response = '';
  openedBook = false;
  checkedPicture = false;
  readParagraph = false;
  rereadSentences = false;
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

  scopePage(unit: ReadingUnit): string {
    return `${READING_SCOPE_SOURCE}#page=${unit.number}`;
  }

  scopePrintedPage(unit: ReadingUnit): number {
    return scopePrintedPage(unit);
  }

  scopeImage(unit: ReadingUnit): string {
    return `/source-pages/reading/unit-${unit.number}-scope.png`;
  }

  scrollToStandard(domainId: string): void {
    document.getElementById(`standard-${domainId}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  scrollToCurriculum(): void {
    document.getElementById('grade3-year-map')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  selectUnit(unitId: string): void {
    const selected = readingUnitById(unitId);
    if (selected) void this.router.navigate(this.unitRoute(selected));
  }

  scrollToWeek(weekNumber: number): void {
    document.getElementById(`reading-week-${weekNumber}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  scrollToLessonStage(stageId: string): void {
    document.getElementById(stageId)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  get previousUnitRoute(): string[] | null {
    return this.unit.number > 1 ? this.unitRoute(READING_UNITS[this.unit.number - 2]) : null;
  }

  get nextUnitRoute(): string[] | null {
    return this.unit.number < READING_UNITS.length ? this.unitRoute(READING_UNITS[this.unit.number]) : null;
  }

  get lessonProgress(): number {
    return [this.openedBook, this.checkedPicture, this.readParagraph, this.rereadSentences].filter(Boolean).length;
  }

  private syncRoute(): void {
    const url = this.router.url.split(/[?#]/)[0];
    const unitId = this.route.snapshot.paramMap.get('unitId');
    const lessonValue = Number(this.route.snapshot.paramMap.get('lessonNumber'));
    const routedUnit = readingUnitById(unitId);

    const admittedLesson = admittedReadingLesson(unitId, lessonValue);

    if (routedUnit && admittedLesson) {
      this.pageKind = 'lesson';
      this.unit = routedUnit;
      this.officialLesson = admittedLesson;
      this.lessonNumber = admittedLesson.lessonNumber;
      this.readingWeek = routedUnit.weeks[admittedLesson.weekNumber - 1];
      this.title.setTitle(`${admittedLesson.title} | Grade 3 Reading & Language Arts`);
    } else if (routedUnit && Number.isInteger(lessonValue) && lessonValue > 0) {
      this.notice = 'That daily lesson is not published because an edition-matched official lesson source has not been admitted yet.';
      void this.router.navigate(this.unitRoute(routedUnit), { state: { sourceGateNotice: this.notice } });
      return;
    } else if (routedUnit) {
      this.pageKind = 'unit';
      this.unit = routedUnit;
      this.lessonNumber = 1;
      this.readingWeek = routedUnit.weeks[0];
      this.notice = history.state?.sourceGateNotice ?? '';
      this.title.setTitle(`Unit ${routedUnit.number}: ${routedUnit.title} | Grade 3 Reading & Language Arts`);
    } else if (url.endsWith('/standards')) {
      this.pageKind = 'standards';
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
      this.prediction = '';
      this.problem = '';
      this.teamwork = '';
      this.evidence = '';
      this.response = '';
      this.openedBook = false;
      this.checkedPicture = false;
      this.readParagraph = false;
      this.rereadSentences = false;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
