import { NgClass, NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { findLesson, findModule } from '../../data/curriculum.data';
import { LessonContent, ModuleMeta } from '../../data/curriculum.types';
import { EqualGroupsModelComponent } from '../../shared/equal-groups-model/equal-groups-model';

type Feedback = {
  status: 'correct' | 'needs-work';
  title: string;
  body: string;
};

type InfoRow = {
  label: string;
  value: string;
};

type SourceVisualFacts = {
  groupCount: number;
  groupSize: number;
  rowCount: number;
  columnCount: number;
  tapePartCount: number;
  tapePartLabel: string;
  tapeWholeLabel: string;
  tapeCaption: string;
};

@Component({
  selector: 'app-lesson-page',
  imports: [
    EqualGroupsModelComponent,
    FormsModule,
    NgClass,
    NgFor,
    NgIf,
    NgStyle,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgTemplateOutlet,
    RouterLink
  ],
  templateUrl: './lesson.html',
  styleUrl: './lesson.css'
})
export class LessonPage implements OnInit {
  module?: ModuleMeta;
  lesson?: LessonContent;
  activeStepIndex = 0;
  private readonly moduleThemes: Record<string, { accent: string; strong: string; soft: string; muted: string }> = {
    m1: { accent: '#c76a22', strong: '#8f470f', soft: '#fff1d8', muted: '#f5d49c' },
    m2: { accent: '#197c72', strong: '#0f5d55', soft: '#e1f6f1', muted: '#a9ddd3' },
    m3: { accent: '#6d5bd0', strong: '#4f3aa8', soft: '#eeebff', muted: '#c9c0ff' },
    m4: { accent: '#4f8a2f', strong: '#35681d', soft: '#ecf7df', muted: '#c3dfa8' },
    m5: { accent: '#c44f73', strong: '#943555', soft: '#ffedf2', muted: '#f4bfd0' },
    m6: { accent: '#2474a6', strong: '#18577d', soft: '#e5f4ff', muted: '#afd8f2' },
    m7: { accent: '#8a5a28', strong: '#684017', soft: '#fff0dc', muted: '#e8c494' }
  };

  groupCount = 6;
  groupSize = 2;
  groupCountAnswer: number | null = null;
  repeatedBlank = '';
  multiplicationChoice = '';
  equalCheckChoice = '';
  exitAdditionA = '';
  exitAdditionB = '';
  exitAdditionC = '';
  exitProduct = '';
  exitFactor = '';
  l4FairShareAnswer: number | null = null;
  l4UnknownMeaning = '';
  l4DianaSentence = '';
  l4EightDivFour: number | null = null;
  l4ExitDivisor = '';
  l4ExitQuotient = '';
  l4ExitFifteen = '';
  l5TablesAnswer: number | null = null;
  l5UnknownMeaning = '';
  l5BurgerPacks: number | null = null;
  l5ExitTriangles = '';
  l5ExitSmoothies = '';
  l6TeamsAnswer: number | null = null;
  l6QuotientLocation = '';
  l6RelatedFactor: number | null = null;
  l6ExitQuotient = '';
  l6ExitFactor = '';
  l6ExitMeaning = '';
  feedback?: Feedback;
  readonly figureDots = Array.from({ length: 12 });
  readonly areaCells = Array.from({ length: 20 });
  readonly fractionParts = Array.from({ length: 6 });
  readonly graphBars = [
    { label: 'A', height: 72 },
    { label: 'B', height: 44 },
    { label: 'C', height: 96 }
  ];
  readonly numberLineTicks = Array.from({ length: 7 });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly title: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const moduleId = params.get('moduleId') ?? 'm1';
      const lessonNumber = Number(params.get('lessonNumber') ?? '1');
      this.module = findModule(moduleId);
      this.lesson = findLesson(moduleId, lessonNumber);
      this.activeStepIndex = 0;
      this.resetLessonState();

      if (this.module && this.lesson) {
        this.title.setTitle(`M${this.module.number} L${this.lesson.lessonNumber}: ${this.lesson.title} | Ruchika Grade 3 Math`);
      } else {
        this.title.setTitle('Lesson Not Found | Ruchika Grade 3 Math');
      }
    });
  }

  get activeStep() {
    return this.lesson?.steps[this.activeStepIndex];
  }

  get topicTitle(): string {
    if (!this.module || !this.lesson) {
      return '';
    }
    const topic = this.module.topics.find((item) => item.id === this.lesson?.topicId);
    return topic ? `${topic.label}: ${topic.title}` : '';
  }

  get progressText(): string {
    if (!this.lesson) {
      return '';
    }
    return `${this.activeStepIndex + 1} of ${this.lesson.steps.length}`;
  }

  get estimatedFlow(): string {
    if (!this.lesson) {
      return '';
    }
    return `${this.lesson.steps.length} small screens`;
  }

  get sourceLessonQuestionRows(): InfoRow[] {
    if (!this.lesson || !this.activeStep) {
      return [];
    }

    const objective = this.lesson.objective;
    const model = this.activeStep.visualModel;
    const rowsByModel: Record<string, InfoRow[]> = {
      'equal-groups': [
        { label: 'Total', value: 'The full amount in the lesson situation' },
        { label: 'Equal groups', value: 'Groups must be the same size before using multiplication or division' },
        { label: 'Unknown', value: 'The group count, group size, product, or quotient named by the objective' }
      ],
      array: [
        { label: 'Total', value: 'All objects in the array' },
        { label: 'Rows / columns', value: 'Equal groups shown in a compact picture' },
        { label: 'Unknown', value: 'The factor, quotient, row count, column count, or product in the objective' }
      ],
      'tape-diagram': [
        { label: 'Whole', value: 'The full quantity or final amount in the word problem' },
        { label: 'Parts / units', value: 'Known equal or related quantities labeled on the bar' },
        { label: 'Unknown', value: 'The missing quantity and the operation path needed to solve' }
      ],
      'number-line': [
        { label: 'Start / endpoint', value: 'The benchmark values or interval endpoints' },
        { label: 'Unit interval', value: 'The equal jump size or partition size' },
        { label: 'Unknown', value: 'The position, rounded value, elapsed amount, or comparison named by the objective' }
      ],
      clock: [
        { label: 'Start time', value: 'Where the clock begins' },
        { label: 'Jumps', value: 'Elapsed time counted in useful chunks' },
        { label: 'Unknown', value: 'The end time, start time, or elapsed minutes' }
      ],
      measurement: [
        { label: 'Quantity', value: 'The measured amount in the lesson situation' },
        { label: 'Unit', value: 'The gram, kilogram, liter, milliliter, centimeter, or other unit' },
        { label: 'Unknown', value: 'The estimate, measurement, sum, difference, or rounded value' }
      ],
      'area-model': [
        { label: 'Plane figure', value: 'The shape being measured or tiled' },
        { label: 'Square unit', value: 'The unit used to cover the figure without gaps or overlaps' },
        { label: 'Unknown', value: 'The area, side length, or decomposed area named by the objective' }
      ],
      'fraction-strip': [
        { label: 'Whole', value: 'The unit whole must be named first' },
        { label: 'Equal parts', value: 'The partitions define the fractional unit' },
        { label: 'Unknown', value: 'The fraction, comparison, equivalent name, or point on the number line' }
      ],
      graph: [
        { label: 'Data', value: 'The counts or measurements collected in the lesson' },
        { label: 'Scale', value: 'What each mark, bar, picture, or interval represents' },
        { label: 'Unknown', value: 'The comparison, total, difference, or graph-based answer' }
      ],
      geometry: [
        { label: 'Figure', value: 'The shape, rectangle, polygon, or object in the lesson' },
        { label: 'Attributes', value: 'Sides, angles, area, perimeter, or classifications marked on the figure' },
        { label: 'Unknown', value: 'The measure, category, perimeter, area, or explanation required' }
      ]
    };

    const rows = [
      ...(rowsByModel[model] ?? rowsByModel['equal-groups']),
      { label: 'Lesson target', value: objective }
    ];

    if (this.activeStep.id === 'source-goal' && this.activeStep.studentPrompt && !this.activeStep.studentPrompt.startsWith('Student-facing target:')) {
      return [{ label: 'Source context', value: this.activeStep.studentPrompt }, ...rows];
    }

    return rows;
  }

  get sourceLessonExplanation(): string {
    if (!this.lesson || !this.activeStep) {
      return '';
    }
    return `This lesson uses the ${this.activeStep.visualModel} model to make the objective teachable, then asks the student to explain the model before giving a final answer.`;
  }

  get sourceVisualFacts(): SourceVisualFacts {
    const text = this.sourceContextText;
    const lower = text.toLowerCase();
    const fallback = {
      groupCount: 3,
      groupSize: 4,
      rowCount: 3,
      columnCount: 4,
      tapePartCount: 3,
      tapePartLabel: 'unit',
      tapeWholeLabel: 'whole',
      tapeCaption: 'knowns label the bar; unknown is marked'
    };

    const equalGroupsMatch =
      text.match(/(\d+)\s+equal\s+groups?\s+of\s+(\d+)/i) ??
      text.match(/(\d+)\s+groups?\s+of\s+(\d+)/i);
    const arrayMatch = text.match(/array\s+with\s+(\d+)\s+rows?\s+and\s+(\d+)/i);
    const tapeMatch = text.match(/tape diagram\s+with\s+(\d+)\s+parts?\s+and\s+(\d+)/i);
    const equationMatch = text.match(/(\d+)\s*x\s*(\d+)\s*=\s*([a-z])/i);
    const unknownLetterMatch = text.match(/letter\s+([a-z])\b/i);
    const groupCount = this.toReasonableCount(equalGroupsMatch?.[1] ?? tapeMatch?.[1] ?? equationMatch?.[1], fallback.groupCount);
    const groupSize = this.toReasonableCount(equalGroupsMatch?.[2] ?? tapeMatch?.[2] ?? equationMatch?.[2], fallback.groupSize);
    const rowCount = this.toReasonableCount(arrayMatch?.[1], groupCount);
    const columnCount = this.toReasonableCount(arrayMatch?.[2], groupSize);
    const tapePartCount = this.toReasonableCount(tapeMatch?.[1] ?? equationMatch?.[1], groupCount);
    const tapePartSize = this.toReasonableCount(tapeMatch?.[2] ?? equationMatch?.[2], groupSize);
    const unit = lower.includes('leg') ? 'legs' : lower.includes('dollar') || lower.includes('money') ? 'dollars' : lower.includes('beetle') ? 'beetle legs' : '';
    const unknown = equationMatch?.[3] ?? unknownLetterMatch?.[1];
    const tapePartLabel = unit ? `${tapePartSize} ${unit}` : String(tapePartSize);

    return {
      groupCount,
      groupSize,
      rowCount,
      columnCount,
      tapePartCount,
      tapePartLabel,
      tapeWholeLabel: unknown ? `${unknown} total${unit ? ` ${unit}` : ''}` : fallback.tapeWholeLabel,
      tapeCaption: unknown
        ? `${tapePartCount} parts x ${tapePartLabel} = ${unknown}`
        : `${tapePartCount} equal parts; unknown total or part is marked`
    };
  }

  get sourceGroupSlots(): number[] {
    return Array.from({ length: Math.min(this.sourceVisualFacts.groupCount, 6) }, (_, index) => index + 1);
  }

  get sourceGroupItemSlots(): number[] {
    return Array.from({ length: Math.min(this.sourceVisualFacts.groupSize, 8) }, (_, index) => index + 1);
  }

  get sourceArrayDots(): number[] {
    const facts = this.sourceVisualFacts;
    return Array.from({ length: Math.min(facts.rowCount * facts.columnCount, 64) }, (_, index) => index + 1);
  }

  get sourceTapeParts(): number[] {
    return Array.from({ length: Math.min(this.sourceVisualFacts.tapePartCount, 10) }, (_, index) => index + 1);
  }

  get sourceContextText(): string {
    if (!this.lesson) {
      return '';
    }
    return [
      this.lesson.objective,
      ...this.lesson.steps.flatMap((step) => [step.studentPrompt, step.teacherEditionBasis])
    ].join(' ');
  }

  get total(): number {
    return this.groupCount * this.groupSize;
  }

  moduleThemeVars() {
    const theme = this.module ? this.moduleThemes[this.module.id] ?? this.moduleThemes['m1'] : this.moduleThemes['m1'];
    return {
      '--module-accent': theme.accent,
      '--module-accent-strong': theme.strong,
      '--module-accent-soft': theme.soft,
      '--module-accent-muted': theme.muted
    };
  }

  nextStep(): void {
    if (!this.lesson) {
      return;
    }
    this.activeStepIndex = Math.min(this.activeStepIndex + 1, this.lesson.steps.length - 1);
    this.feedback = undefined;
  }

  previousStep(): void {
    this.activeStepIndex = Math.max(this.activeStepIndex - 1, 0);
    this.feedback = undefined;
  }

  chooseStep(index: number): void {
    this.activeStepIndex = index;
    this.feedback = undefined;
  }

  resetLesson(): void {
    this.activeStepIndex = 0;
    this.resetLessonState();
  }

  private resetLessonState(): void {
    this.groupCountAnswer = null;
    this.repeatedBlank = '';
    this.multiplicationChoice = '';
    this.equalCheckChoice = '';
    this.exitAdditionA = '';
    this.exitAdditionB = '';
    this.exitAdditionC = '';
    this.exitProduct = '';
    this.exitFactor = '';
    this.l4FairShareAnswer = null;
    this.l4UnknownMeaning = '';
    this.l4DianaSentence = '';
    this.l4EightDivFour = null;
    this.l4ExitDivisor = '';
    this.l4ExitQuotient = '';
    this.l4ExitFifteen = '';
    this.l5TablesAnswer = null;
    this.l5UnknownMeaning = '';
    this.l5BurgerPacks = null;
    this.l5ExitTriangles = '';
    this.l5ExitSmoothies = '';
    this.l6TeamsAnswer = null;
    this.l6QuotientLocation = '';
    this.l6RelatedFactor = null;
    this.l6ExitQuotient = '';
    this.l6ExitFactor = '';
    this.l6ExitMeaning = '';
    this.feedback = undefined;
  }

  private toReasonableCount(value: string | undefined, fallback: number): number {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < 1) {
      return fallback;
    }
    return Math.min(parsed, 12);
  }

  private setCheckedFeedback(feedback: Feedback): void {
    this.feedback = feedback;
    this.playCheckSound(feedback.status === 'correct');
  }

  private playCheckSound(isCorrect: boolean): void {
    if (isCorrect) {
      this.playRightChime();
    } else {
      this.playWrongBuzz();
    }

    if (
      typeof window === 'undefined' ||
      !('speechSynthesis' in window) ||
      typeof SpeechSynthesisUtterance === 'undefined'
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(isCorrect ? "Yes! That's right!" : 'Oops, wrong. Try again.');
    utterance.rate = isCorrect ? 1.12 : 0.9;
    utterance.pitch = isCorrect ? 1.35 : 0.75;
    window.speechSynthesis.speak(utterance);
  }

  private playRightChime(): void {
    this.playToneSequence([
      { frequency: 523.25, start: 0, duration: 0.11, volume: 0.13 },
      { frequency: 659.25, start: 0.09, duration: 0.12, volume: 0.13 },
      { frequency: 783.99, start: 0.19, duration: 0.16, volume: 0.14 }
    ]);
  }

  private playWrongBuzz(): void {
    this.playToneSequence([
      { frequency: 155, start: 0, duration: 0.16, volume: 0.16, type: 'sawtooth' },
      { frequency: 105, start: 0.15, duration: 0.2, volume: 0.14, type: 'sawtooth' }
    ]);
  }

  private playToneSequence(
    tones: Array<{ frequency: number; start: number; duration: number; volume: number; type?: OscillatorType }>
  ): void {
    if (typeof window === 'undefined') {
      return;
    }

    const browserWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    const AudioContextConstructor = browserWindow.AudioContext ?? browserWindow.webkitAudioContext;

    if (!AudioContextConstructor) {
      return;
    }

    const audioContext = new AudioContextConstructor();
    const now = audioContext.currentTime;
    let endTime = now;

    tones.forEach((tone) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const startTime = now + tone.start;
      const stopTime = startTime + tone.duration;

      oscillator.type = tone.type ?? 'sine';
      oscillator.frequency.setValueAtTime(tone.frequency, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(tone.volume, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(startTime);
      oscillator.stop(stopTime);
      endTime = Math.max(endTime, stopTime);
    });

    window.setTimeout(() => {
      void audioContext.close();
    }, Math.max(0, (endTime - now) * 1000 + 50));
  }

  checkGroupCount(): void {
    if (this.groupCountAnswer === this.groupCount) {
      this.setCheckedFeedback({
        status: 'correct',
        title: 'Correct',
        body: `There are ${this.groupCount} equal groups. Each group has ${this.groupSize}, so the total is ${this.total}.`
      });
      return;
    }
    this.setCheckedFeedback({
      status: 'needs-work',
      title: 'Count the groups again',
      body: 'The number of groups is the number of containers, not the number inside one container.'
    });
  }

  checkRepeatedAddition(): void {
    const normalized = this.repeatedBlank.replace(/\s/g, '');
    const accepted = ['2+2+2+2+2+2=12', '2+2+2+2+2+2'].includes(normalized);
    this.setCheckedFeedback(accepted
      ? {
          status: 'correct',
          title: 'The addition matches the picture',
          body: 'Each 2 in the repeated addition sentence matches one equal group of 2 counters.'
        }
      : {
          status: 'needs-work',
          title: 'Match one addend to one group',
          body: 'There are 6 groups of 2, so the repeated addition should show six 2s.'
        });
  }

  checkMultiplication(): void {
    this.setCheckedFeedback(
      this.multiplicationChoice === '6x2'
        ? {
            status: 'correct',
            title: 'Yes: 6 x 2 = 12',
            body: 'The first factor tells how many groups. The second factor tells how many are in each group.'
          }
        : {
            status: 'needs-work',
            title: 'Use groups first, size second',
            body: 'This lesson reads 6 x 2 as 6 groups of 2, matching the counters.'
          });
  }

  checkEqualGroups(): void {
    this.setCheckedFeedback(
      this.equalCheckChoice === 'not-equal'
        ? {
            status: 'correct',
            title: 'Correct: do not multiply yet',
            body: 'The last group has only 3 counters. To use multiplication, all groups must be equal.'
          }
        : {
            status: 'needs-work',
            title: 'Check every group',
            body: 'Multiplication represents equal groups. One group is smaller, so this picture does not match 3 x 4.'
          });
  }

  checkExit(): void {
    const additionOk =
      this.exitAdditionA.trim() === '2' &&
      this.exitAdditionB.trim() === '2' &&
      this.exitAdditionC.trim() === '2' &&
      this.exitProduct.trim() === '8' &&
      this.exitFactor.trim() === '2';

    this.setCheckedFeedback(additionOk
      ? {
          status: 'correct',
          title: 'Lesson 1 takeaway is in place',
          body: 'Four groups of 2 can be written as 2 + 2 + 2 + 2 = 8 and 4 x 2 = 8.'
        }
      : {
          status: 'needs-work',
          title: 'Use the picture to fill every blank',
          body: 'The picture shows 4 equal groups. Each group has 2 slices, for a total of 8.'
        });
  }

  checkL4FairShare(): void {
    this.setCheckedFeedback(
      this.l4FairShareAnswer === 9
        ? {
            status: 'correct',
            title: 'Correct: 9 in each group',
            body: 'The 18 markers are shared into 2 equal groups. The answer tells the size of each group, so each group has 9 markers.'
          }
        : {
            status: 'needs-work',
            title: 'Share into exactly 2 groups',
            body: 'The 2 tells how many equal groups there are. Share all 18 markers into those 2 groups, then count one group.'
          });
  }

  checkL4UnknownMeaning(): void {
    this.setCheckedFeedback(
      this.l4UnknownMeaning === 'size'
        ? {
            status: 'correct',
            title: 'Yes: the answer is group size',
            body: 'In 18 divided by 2 equals 9, 18 is the total and 2 is the number of equal groups. The 9 tells how many markers are in each group.'
          }
        : {
            status: 'needs-work',
            title: 'Use the known numbers first',
            body: 'The number after the division sign is 2, so there are already 2 groups. The unknown is not the number of groups here; it is the size of each group.'
          });
  }

  checkL4DianaSentence(): void {
    this.setCheckedFeedback(
      this.l4DianaSentence === '12div3'
        ? {
            status: 'correct',
            title: 'Correct: 12 divided by 3 equals 4',
            body: 'There are 12 stickers total and 3 equal groups. The answer 4 tells the size of each group.'
          }
        : {
            status: 'needs-work',
            title: 'Choose the sentence that finds group size',
            body: 'Use the total first, then divide by the number of equal groups. Diana has 3 groups, so divide 12 by 3.'
          });
  }

  checkL4EightDivFour(): void {
    this.setCheckedFeedback(
      this.l4EightDivFour === 2
        ? {
            status: 'correct',
            title: 'Correct: 8 divided by 4 equals 2',
            body: 'The 4 tells the number of equal groups. Each group has 2, so the answer is the size of each group.'
          }
        : {
            status: 'needs-work',
            title: 'Count one equal group',
            body: 'The picture shows 8 counters split into 4 equal groups. The answer is not the 4 groups; it is how many counters are inside each group.'
          });
  }

  checkL4Exit(): void {
    const exitOk =
      this.l4ExitDivisor.trim() === '4' &&
      this.l4ExitQuotient.trim() === '4' &&
      this.l4ExitFifteen.trim() === '5';

    this.setCheckedFeedback(exitOk
      ? {
          status: 'correct',
          title: 'Lesson 4 takeaway is in place',
          body: 'Both answers tell the size of each group: 16 glue sticks in 4 groups makes 4 in each group, and 15 divided into 3 groups makes 5 in each group.'
        }
      : {
          status: 'needs-work',
          title: 'Each answer should mean group size',
          body: 'For 16 divided by 4, the 4 after the division sign is the number of groups. The quotient is how many glue sticks go in each group. For 15 divided by 3, share 15 into 3 equal groups.'
        });
  }

  checkL5Tables(): void {
    this.setCheckedFeedback(
      this.l5TablesAnswer === 3
        ? {
            status: 'correct',
            title: 'Correct: 3 tables',
            body: 'The 18 people are put into groups of 6. The answer tells the number of groups, so Cynthia needs 3 tables.'
          }
        : {
            status: 'needs-work',
            title: 'Make groups of 6',
            body: 'The 6 is the size of each group. Keep making groups of 6 from the 18 people, then count how many groups you made.'
          });
  }

  checkL5UnknownMeaning(): void {
    this.setCheckedFeedback(
      this.l5UnknownMeaning === 'groups'
        ? {
            status: 'correct',
            title: 'Yes: the answer is number of groups',
            body: 'In 18 divided by 6 equals 3, 18 is the total and 6 is the size of each group. The 3 tells how many groups there are.'
          }
        : {
            status: 'needs-work',
            title: 'The group size is already known',
            body: 'The 6 tells how many are in each group. The unknown is how many groups of 6 fit into 18.'
          });
  }

  checkL5Burgers(): void {
    this.setCheckedFeedback(
      this.l5BurgerPacks === 5
        ? {
            status: 'correct',
            title: 'Correct: 5 packs',
            body: 'Counting by 3s lands on 15 after 5 groups: 3, 6, 9, 12, 15.'
          }
        : {
            status: 'needs-work',
            title: 'Track how many 3s you count',
            body: 'Each count is one pack. Count 3, 6, 9, 12, 15 and track the number of counts.'
          });
  }

  checkL5Exit(): void {
    const exitOk = this.l5ExitTriangles.trim() === '2' && this.l5ExitSmoothies.trim() === '4';

    this.setCheckedFeedback(exitOk
      ? {
          status: 'correct',
          title: 'Lesson 5 takeaway is in place',
          body: 'Both answers tell the number of groups: 12 triangles in groups of 6 makes 2 groups, and 20 strawberries with 5 per smoothie makes 4 smoothies.'
        }
      : {
          status: 'needs-work',
          title: 'Each answer should mean number of groups',
          body: 'The group size is given in each problem. Count how many groups of that size fit into the total.'
        });
  }

  checkL6Teams(): void {
    this.setCheckedFeedback(
      this.l6TeamsAnswer === 4
        ? {
            status: 'correct',
            title: 'Correct: 4 teams',
            body: 'The array shows 20 children arranged with 5 children in each row. There are 4 rows, so there are 4 teams.'
          }
        : {
            status: 'needs-work',
            title: 'Count the rows',
            body: 'The 5 tells how many children are on each team. The unknown is how many rows or teams of 5 make 20.'
          });
  }

  checkL6QuotientLocation(): void {
    this.setCheckedFeedback(
      this.l6QuotientLocation === 'factor'
        ? {
            status: 'correct',
            title: 'Correct: the quotient is a factor',
            body: 'In 15 divided by 3 equals 5, the quotient 5 appears as the unknown factor in 3 times 5 equals 15.'
          }
        : {
            status: 'needs-work',
            title: 'Look for the same number',
            body: 'The same array has 3 groups of 5. The 5 is the quotient in division and a factor in multiplication.'
          });
  }

  checkL6RelatedFactor(): void {
    this.setCheckedFeedback(
      this.l6RelatedFactor === 8
        ? {
            status: 'correct',
            title: 'Correct: 8 threes make 24',
            body: 'The related division equation is 24 divided by 3 equals 8, so the unknown factor in blank times 3 equals 24 is 8.'
          }
        : {
            status: 'needs-work',
            title: 'Use the related division equation',
            body: 'Ask how many groups of 3 make 24. Count by 3s to 24 or solve 24 divided by 3.'
          });
  }

  checkL6Exit(): void {
    const meaning = this.l6ExitMeaning.trim().toLowerCase();
    const meaningOk = meaning.includes('row') || meaning.includes('group');
    const exitOk = this.l6ExitQuotient.trim() === '2' && this.l6ExitFactor.trim() === '2' && meaningOk;

    this.setCheckedFeedback(exitOk
      ? {
          status: 'correct',
          title: 'Lesson 6 takeaway is in place',
          body: 'The quotient and unknown factor both represent the number of rows, or groups, of 6 notecards.'
        }
      : {
          status: 'needs-work',
          title: 'Connect both blanks to the array',
          body: 'There are 12 notecards arranged in rows of 6. Both blanks are 2, and that 2 means the number of rows or groups.'
        });
  }

  completeGenericStep(): void {
    this.feedback = {
      status: 'correct',
      title: 'Checked against the lesson objective',
      body: 'Use the teacher-edition objective, the module model, and the lesson words together. Your explanation should stay tied to those three parts.'
    };
  }
}
