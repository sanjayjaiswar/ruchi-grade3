import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { animate, stagger } from 'animejs';
import { Subscription } from 'rxjs';
import { Grade3CmcLesson, Grade3CmcUnit, GRADE3_CMC_UNITS } from '../syllabus-books/syllabus-books.data';

interface ArithmeticSpec {
  prompt: string;
  left: number;
  right: number;
  operation: '+' | '−';
  answer: number;
  hint: string;
  strategy: string;
  jumps?: string[];
}

interface LessonSession {
  number: number;
  phase: 'Explore' | 'Develop' | 'Refine';
  title: string;
  printPages: string;
  viewerPage: number;
  arithmetic?: ArithmeticSpec;
}

interface VerifiedVisualEvidence {
  readonly lessonNumber: number;
  readonly sessionNumber: number;
  readonly printPages: string;
  readonly viewerPage: number;
  readonly model: 'place-value-chart' | 'nearest-ten-line' | 'base-ten-blocks' | 'nearest-hundred-line';
}

interface VerifiedUnitIdea {
  readonly title: string;
  readonly understanding: string;
  readonly viewerPage: number;
}

const VERIFIED_VISUAL_EVIDENCE: Readonly<Record<string, VerifiedVisualEvidence>> = Object.freeze({
  '1:1': { lessonNumber: 1, sessionNumber: 1, printPages: '9–12', viewerPage: 21, model: 'place-value-chart' },
  '1:2': { lessonNumber: 1, sessionNumber: 2, printPages: '13–18', viewerPage: 25, model: 'nearest-ten-line' },
  '1:3': { lessonNumber: 1, sessionNumber: 3, printPages: '19–24', viewerPage: 31, model: 'base-ten-blocks' },
  '1:4': { lessonNumber: 1, sessionNumber: 4, printPages: '25–28', viewerPage: 37, model: 'nearest-hundred-line' }
});

const VERIFIED_UNIT_IDEAS: Readonly<Record<number, readonly VerifiedUnitIdea[]>> = Object.freeze({
  1: [
    {
      title: 'Number Flexibility to 100 for All Four Operations',
      understanding: 'Rounding is a way to think flexibly about numbers and make estimates. Thinking flexibly means you can think about numbers in many ways.',
      viewerPage: 14
    },
    {
      title: 'Patterns in Four Operations',
      understanding: 'Addition and subtraction patterns can support strategies for adding and subtracting multi-digit numbers.',
      viewerPage: 15
    }
  ],
  2: [
    {
      title: 'Square Tiles',
      understanding: 'Arrays of square tiles or other objects can model multiplication.',
      viewerPage: 106
    },
    {
      title: 'Number Flexibility to 100 for All Four Operations',
      understanding: 'Flexibility with numbers and operations supports strategies for multiplying and dividing.',
      viewerPage: 107
    }
  ],
  3: [
    {
      title: 'Square Tiles',
      understanding: 'You can use square tiles to show the areas of rectangles.',
      viewerPage: 320
    },
    {
      title: 'Number Flexibility to 100 for All Four Operations',
      understanding: 'You can think flexibly about multiplying, dividing, adding, and subtracting to solve problems.',
      viewerPage: 320
    },
    {
      title: 'Patterns in Four Operations',
      understanding: 'Many problems involve using more than one operation. You can use a variety of strategies and models to solve these problems.',
      viewerPage: 321
    },
    {
      title: 'Represent Multivariable Data',
      understanding: 'You can use bar graphs and picture graphs to display data. You can use the graphs to solve problems.',
      viewerPage: 321
    }
  ]
});

@Component({
  selector: 'app-iready-interactive-page',
  imports: [FormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './iready-interactive.html',
  styleUrl: './iready-interactive.css'
})
export class IReadyInteractivePage implements AfterViewInit, OnDestroy {
  readonly volumeOneUnits = GRADE3_CMC_UNITS.filter((unit) => unit.volume === 1);
  readonly volumeOneLessons = this.volumeOneUnits.flatMap((unit) => unit.lessons);
  readonly placeLabels = ['Hundreds', 'Tens', 'Ones'];
  readonly lessonOneSessions: LessonSession[] = [
    {
      number: 1,
      phase: 'Explore',
      title: 'Using Place Value to Round Numbers',
      printPages: '9–12',
      viewerPage: 21
    },
    {
      number: 2,
      phase: 'Develop',
      title: 'Rounding to the Nearest Ten',
      printPages: '13–18',
      viewerPage: 25
    },
    {
      number: 3,
      phase: 'Develop',
      title: 'Rounding to the Nearest Hundred',
      printPages: '19–24',
      viewerPage: 31
    },
    {
      number: 4,
      phase: 'Refine',
      title: 'Using Place Value to Round Numbers',
      printPages: '25–28',
      viewerPage: 37
    }
  ];
  readonly lessonTwoSessions: LessonSession[] = [
    {
      number: 1,
      phase: 'Explore',
      title: 'Adding Three-Digit Numbers',
      printPages: '31–34',
      viewerPage: 43,
      arithmetic: {
        prompt: 'Find the total number of songs represented by 147 and 212.',
        left: 147,
        right: 212,
        operation: '+',
        answer: 359,
        hint: 'Break apart both numbers into hundreds, tens, and ones. Add matching places.',
        strategy: '147 + 212 = (100 + 200) + (40 + 10) + (7 + 2) = 300 + 50 + 9 = 359.'
      }
    },
    {
      number: 2,
      phase: 'Develop',
      title: 'Using Place-Value Strategies to Add',
      printPages: '35–40',
      viewerPage: 47,
      arithmetic: {
        prompt: 'Combine 130 photos and 280 photos.',
        left: 130,
        right: 280,
        operation: '+',
        answer: 410,
        hint: 'The tens total 11 tens. Regroup 10 of those tens as 1 hundred.',
        strategy: '130 + 280 has 0 ones, 11 tens, and 3 hundreds. Regroup 11 tens as 1 hundred and 1 ten: 410.'
      }
    },
    {
      number: 3,
      phase: 'Develop',
      title: 'Connecting Place-Value Strategies to an Algorithm',
      printPages: '41–46',
      viewerPage: 53,
      arithmetic: {
        prompt: 'Use place value to find the sum 225 + 229.',
        left: 225,
        right: 229,
        operation: '+',
        answer: 454,
        hint: 'Start with 5 ones + 9 ones. Record 4 ones and regroup 1 ten.',
        strategy: '5 + 9 = 14, so record 4 ones and regroup 1 ten. Then 2 + 2 + 1 = 5 tens, and 2 + 2 = 4 hundreds: 454.'
      }
    },
    {
      number: 4,
      phase: 'Refine',
      title: 'Adding Three-Digit Numbers',
      printPages: '47–50',
      viewerPage: 59,
      arithmetic: {
        prompt: 'Find the sum of 345 and 626.',
        left: 345,
        right: 626,
        operation: '+',
        answer: 971,
        hint: 'The ones make 11. Regroup 1 ten before adding the tens column.',
        strategy: '5 + 6 = 11 ones. Regroup 1 ten; 4 + 2 + 1 = 7 tens; 3 + 6 = 9 hundreds. The sum is 971.'
      }
    }
  ];
  readonly lessonThreeSessions: LessonSession[] = [
    {
      number: 1,
      phase: 'Explore',
      title: 'Subtracting Three-Digit Numbers',
      printPages: '53–56',
      viewerPage: 65,
      arithmetic: {
        prompt: 'Start with 475 beads and subtract the 134 beads used.',
        left: 475,
        right: 134,
        operation: '−',
        answer: 341,
        hint: 'Subtract ones from ones, tens from tens, and hundreds from hundreds.',
        strategy: '475 − 134 = (400 − 100) + (70 − 30) + (5 − 4) = 300 + 40 + 1 = 341.'
      }
    },
    {
      number: 2,
      phase: 'Develop',
      title: 'Using Place-Value Strategies to Subtract',
      printPages: '57–62',
      viewerPage: 69,
      arithmetic: {
        prompt: 'Find how many of 365 flowers are not among the 186 lilies.',
        left: 365,
        right: 186,
        operation: '−',
        answer: 179,
        hint: 'Regroup once from the hundreds place and once from the tens place.',
        strategy: 'Regroup 365 as 2 hundreds, 15 tens, and 15 ones. Then subtract 186 by place value to get 1 hundred, 7 tens, and 9 ones: 179.'
      }
    },
    {
      number: 3,
      phase: 'Develop',
      title: 'Adding On to Subtract',
      printPages: '63–68',
      viewerPage: 75,
      arithmetic: {
        prompt: 'Start at 137 and add on until you reach 205.',
        left: 205,
        right: 137,
        operation: '−',
        answer: 68,
        hint: 'Add 3 to reach 140, then 60 to reach 200, then 5 to reach 205.',
        strategy: '137 + 3 = 140, 140 + 60 = 200, and 200 + 5 = 205. Add the jumps: 3 + 60 + 5 = 68.',
        jumps: ['+3 → 140', '+60 → 200', '+5 → 205']
      }
    },
    {
      number: 4,
      phase: 'Develop',
      title: 'Connecting Place-Value Strategies to an Algorithm',
      printPages: '69–74',
      viewerPage: 81,
      arithmetic: {
        prompt: 'Use place value to find the difference 385 − 158.',
        left: 385,
        right: 158,
        operation: '−',
        answer: 227,
        hint: 'Regroup 1 ten so that 5 ones becomes 15 ones.',
        strategy: 'Regroup 385 as 3 hundreds, 7 tens, and 15 ones. Then 15 − 8 = 7, 7 − 5 = 2, and 3 − 1 = 2: 227.'
      }
    },
    {
      number: 5,
      phase: 'Refine',
      title: 'Subtracting Three-Digit Numbers',
      printPages: '75–78',
      viewerPage: 87,
      arithmetic: {
        prompt: 'Find 450 − 131 using a strategy you can explain.',
        left: 450,
        right: 131,
        operation: '−',
        answer: 319,
        hint: 'Regroup 1 ten as 10 ones before subtracting the ones column.',
        strategy: 'Regroup 450 as 4 hundreds, 4 tens, and 10 ones. Then subtract 131 by place value: 3 hundreds, 1 ten, and 9 ones = 319.'
      }
    }
  ];

  selectedLessonNumber = 1;
  selectedSessionNumber = 1;
  selectedUnitNumber = 1;
  unitFocus = false;
  lessonFocus = false;
  tensLow = '';
  tensHigh = '';
  hundredsLow = '';
  hundredsHigh = '';
  sessionOneFeedback = '';
  sessionOneMode: 'try' | 'solution' = 'try';
  sessionOneAnimationRun = false;
  sessionTwoChoice?: number;
  sessionThreeChoice?: number;
  sessionFourChoice?: number;
  arithmeticAnswer = '';
  arithmeticFeedback = '';
  arithmeticCorrect = false;
  showArithmeticModel = false;
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        const requestedLesson = Number(params.get('lessonNumber'));
        const requestedUnit = Number(params.get('unitNumber'));
        this.lessonFocus = params.has('lessonNumber');
        this.unitFocus = !this.lessonFocus && params.has('unitNumber');
        if (this.lessonFocus) {
          this.selectedLessonNumber = this.findLesson(requestedLesson) ? requestedLesson : 1;
          this.selectedUnitNumber = this.unitForLesson(this.selectedLessonNumber)?.number ?? 1;
        } else if (this.unitFocus) {
          this.selectedUnitNumber = this.findUnit(requestedUnit)?.number ?? 1;
          this.selectedLessonNumber = this.selectedUnit.lessons[0].number;
        } else {
          this.selectedUnitNumber = 1;
          this.selectedLessonNumber = 1;
        }
        this.selectedSessionNumber = 1;
        this.resetSessionOne();
        this.resetArithmetic();
        this.updateTitle();
        this.scheduleVerifiedVisual();
      })
    );
  }

  ngAfterViewInit(): void {
    this.scheduleVerifiedVisual();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get selectedUnit(): Grade3CmcUnit {
    return this.findUnit(this.selectedUnitNumber) ?? this.volumeOneUnits[0];
  }

  get selectedLesson(): Grade3CmcLesson {
    return this.findLesson(this.selectedLessonNumber) ?? this.volumeOneUnits[0].lessons[0];
  }

  get activeSessions(): LessonSession[] {
    if (this.selectedLessonNumber === 2) return this.lessonTwoSessions;
    if (this.selectedLessonNumber === 3) return this.lessonThreeSessions;
    return this.lessonOneSessions;
  }

  get selectedSession(): LessonSession {
    return this.activeSessions.find((session) => session.number === this.selectedSessionNumber) ?? this.activeSessions[0];
  }

  get lessonIsInteractive(): boolean {
    return this.selectedLessonNumber >= 1 && this.selectedLessonNumber <= 3;
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
    return `https://online.flippingbook.com/view/336581625/${this.selectedSession.viewerPage}/`;
  }

  private get verifiedVisualEvidence(): VerifiedVisualEvidence | undefined {
    const session = this.selectedSession;
    const evidence = VERIFIED_VISUAL_EVIDENCE[`${this.selectedLessonNumber}:${session.number}`];
    if (
      !evidence
      || evidence.lessonNumber !== this.selectedLessonNumber
      || evidence.sessionNumber !== session.number
      || evidence.printPages !== session.printPages
      || evidence.viewerPage !== session.viewerPage
    ) {
      return undefined;
    }
    return evidence;
  }

  get visualAnimationIsVerified(): boolean {
    return Boolean(this.verifiedVisualEvidence);
  }

  unitIdeas(unit: Grade3CmcUnit): readonly VerifiedUnitIdea[] {
    return VERIFIED_UNIT_IDEAS[unit.number] ?? [];
  }

  totalSessions(unit: Grade3CmcUnit): number {
    return unit.lessons.reduce((total, lesson) => total + lesson.sessions, 0);
  }

  unitIdeaSourceUrl(idea: VerifiedUnitIdea): string {
    return `https://online.flippingbook.com/view/336581625/${idea.viewerPage}/`;
  }

  lessonSourceUrl(lesson: Grade3CmcLesson): string {
    return `https://online.flippingbook.com/view/336581625/${lesson.printPage + 12}/`;
  }

  lessonIsReady(lesson: Grade3CmcLesson): boolean {
    return lesson.number <= 3;
  }

  digits(value: number): number[] {
    return [Math.floor(value / 100), Math.floor(value / 10) % 10, value % 10];
  }

  selectSession(sessionNumber: number): void {
    this.selectedSessionNumber = sessionNumber;
    this.resetSessionOne();
    this.resetArithmetic();
    this.scheduleVerifiedVisual();
  }

  replayVerifiedVisual(): void {
    if (this.sessionOneMode === 'solution' && this.selectedLessonNumber === 1 && this.selectedSessionNumber === 1) {
      this.playSessionOneSolution();
      return;
    }
    this.playVerifiedVisual();
  }

  showSessionOneSolution(): void {
    if (!this.visualAnimationIsVerified || this.selectedLessonNumber !== 1 || this.selectedSessionNumber !== 1) {
      return;
    }
    this.sessionOneMode = 'solution';
    this.sessionOneAnimationRun = true;
    this.tensLow = '380';
    this.tensHigh = '390';
    this.hundredsLow = '300';
    this.hundredsHigh = '400';
    this.sessionOneFeedback = '';
    requestAnimationFrame(() => requestAnimationFrame(() => this.playSessionOneSolution()));
  }

  returnToSessionOneTry(): void {
    this.resetSessionOne();
    this.scheduleVerifiedVisual();
  }

  checkSessionOne(): void {
    const answers = [this.tensLow, this.tensHigh, this.hundredsLow, this.hundredsHigh].map(Number);
    this.sessionOneFeedback = answers.every((answer, index) => answer === [380, 390, 300, 400][index])
      ? 'Correct. 384 lies between 380 and 390, and between 300 and 400.'
      : 'Look at the tens around 384 first, then the hundreds around it. Keep 384 inside both intervals.';
  }

  chooseSessionTwo(value: number): void {
    this.sessionTwoChoice = value;
  }

  chooseSessionThree(value: number): void {
    this.sessionThreeChoice = value;
  }

  chooseSessionFour(value: number): void {
    this.sessionFourChoice = value;
  }

  checkArithmetic(activity: ArithmeticSpec): void {
    this.arithmeticCorrect = Number(this.arithmeticAnswer) === activity.answer;
    this.arithmeticFeedback = this.arithmeticCorrect
      ? `Correct. ${activity.left} ${activity.operation} ${activity.right} = ${activity.answer}.`
      : activity.hint;
  }

  toggleArithmeticModel(): void {
    this.showArithmeticModel = !this.showArithmeticModel;
  }

  private resetArithmetic(): void {
    this.arithmeticAnswer = '';
    this.arithmeticFeedback = '';
    this.arithmeticCorrect = false;
    this.showArithmeticModel = false;
  }

  private resetSessionOne(): void {
    this.sessionOneMode = 'try';
    this.sessionOneAnimationRun = false;
    this.tensLow = '';
    this.tensHigh = '';
    this.hundredsLow = '';
    this.hundredsHigh = '';
    this.sessionOneFeedback = '';
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
    const model = this.verifiedVisualEvidence?.model;
    if (!activity || !model) {
      return;
    }

    const selectorByModel: Record<VerifiedVisualEvidence['model'], string> = {
      'place-value-chart': '.place-value-chart div',
      'nearest-ten-line': '.number-line .line, .number-line .tick, .number-line .label',
      'base-ten-blocks': '.base-ten-model > span, .base-ten-model .ones i',
      'nearest-hundred-line': '.number-line .line, .number-line .tick, .number-line .label'
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

  private playSessionOneSolution(): void {
    if (
      !this.visualAnimationIsVerified
      || this.selectedLessonNumber !== 1
      || this.selectedSessionNumber !== 1
      || this.sessionOneMode !== 'solution'
    ) {
      return;
    }

    this.sessionOneAnimationRun = true;
    const activity = this.elementRef.nativeElement.querySelector<HTMLElement>('.place-value-activity');
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
    if (this.unitFocus) {
      this.title.setTitle(`Unit ${this.selectedUnitNumber} · i-Ready Interactive | Ruchika Grade 3`);
      return;
    }
    this.title.setTitle('Volume 1 · i-Ready Interactive | Ruchika Grade 3');
  }
}
