import '@browser.style/analog-clock';
import { NgClass, NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { AfterViewChecked, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { animate, stagger } from 'animejs';
import { scaleLinear } from 'd3-scale';
import { findLesson, findModule } from '../../data/curriculum.data';
import { LESSON_SOURCE_NOTES } from '../../data/lesson-source-notes.generated';
import { MODULE_CONCEPT_FRAMES, ModuleConceptFrame } from '../../data/module-concept-frames';
import { STUDENT_WORK_SOURCE, StudentWorkLessonSource, StudentWorkSourceProblem } from '../../data/student-work-source.generated';
import { STUDENT_WORKBOOK_SOURCE_PAGES } from '../../data/student-workbook-source-pages.generated';
import { LessonContent, LessonStep, ModuleMeta } from '../../data/curriculum.types';
import { findLessonRuntime } from '../../data/lessons/lesson-registry';
import {
  ArrayDecompositionLessonModel,
  LessonAnimationModel,
  LessonRuntimeConfig,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetConcreteFractionModel,
  ProblemSetConcreteFractionItem,
  ProblemSetRelatedFact,
  ProblemSetFractionModel,
  ProblemSetNumberLineModel,
  ProblemSetPaperPartitionModel,
  ProblemVisualSpec,
  ProblemSetDataDisplay,
  DataDisplayPoint,
  SourceWorkspaceModel
} from '../../data/lessons/lesson-runtime.types';
import { ArrayDecomposerComponent } from '../../shared/array-decomposer/array-decomposer';
import { EqualGroupsModelComponent } from '../../shared/equal-groups-model/equal-groups-model';
import { ProblemVisualWorkspaceComponent } from '../../shared/problem-visual-workspace/problem-visual-workspace';

type Feedback = {
  status: 'correct' | 'needs-work';
  title: string;
  body: string;
};

type ProblemSection = 'concept' | 'problem-set' | 'summary';
type ProblemSetMode = 'blank' | 'solved';

type InfoRow = {
  label: string;
  value: string;
};

type ConceptExplanation = {
  term: string;
  meaning: string;
  teacherCheck: string;
};

type VocabularyComparisonRow = {
  operation: string;
  howToSayIt: string;
  example: string;
  answerName: string;
};

type ArrayDecompositionExample = {
  title: string;
  totalGroups: number;
  groupSize: number;
  firstPart: number;
  secondPart: number;
  context: string;
  equation: string;
  teacherPrompt: string;
  rows: number[];
  columns: number[];
};

type StudentWorkProblem = {
  number: number;
  prompt: string;
  equations: string[];
  answer: string;
  showAnswer: boolean;
  showModelPreview: boolean;
  representation:
    | 'groups'
    | 'array'
    | 'tape'
    | 'number-line'
    | 'clock'
    | 'measurement'
    | 'area'
    | 'fraction'
    | 'graph'
    | 'geometry'
    | 'written';
  teacherLookFor: string;
  sourceLabel: string;
  visual: StudentWorkVisualFacts;
};

type StudentWorkVisualFacts = {
  groupCount: number;
  groupSize: number;
  rowCount: number;
  columnCount: number;
  dotCount: number;
  tapePartCount: number;
  tapePartLabel: string;
  tapeWholeLabel: string;
  tapeCaption: string;
  fractionPartCount: number;
  fractionShadedCount: number;
  graphHeights: number[];
};

type SourceVisualFacts = Pick<
  StudentWorkVisualFacts,
  'groupCount' | 'groupSize' | 'rowCount' | 'columnCount' | 'tapePartCount' | 'tapePartLabel' | 'tapeWholeLabel' | 'tapeCaption'
>;

@Component({
  selector: 'app-lesson-page',
  imports: [
    ArrayDecomposerComponent,
    EqualGroupsModelComponent,
    FormsModule,
    ProblemVisualWorkspaceComponent,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lesson.html',
  styleUrls: ['./lesson.css', './lesson-problem-set.css']
})
export class LessonPage implements OnInit, AfterViewChecked {
  module?: ModuleMeta;
  lesson?: LessonContent;
  activeStepIndex = 0;
  activeProblemSection: ProblemSection = 'concept';
  problemSetMode: ProblemSetMode = 'blank';
  private activeLessonRouteKey = '';
  private lessonConceptAnimationSignature = '';
  private readonly moduleThemes: Record<string, { accent: string; strong: string; soft: string; muted: string }> = {
    m1: { accent: '#4285f4', strong: '#1a73e8', soft: '#e8f0fe', muted: '#d2e3fc' },
    m2: { accent: '#ea4335', strong: '#c5221f', soft: '#fce8e6', muted: '#fad2cf' },
    m3: { accent: '#fbbc04', strong: '#b06000', soft: '#fef7e0', muted: '#feefc3' },
    m4: { accent: '#34a853', strong: '#188038', soft: '#e6f4ea', muted: '#ceead6' },
    m5: { accent: '#4285f4', strong: '#174ea6', soft: '#e8f0fe', muted: '#d2e3fc' },
    m6: { accent: '#ea4335', strong: '#a50e0e', soft: '#fce8e6', muted: '#fad2cf' },
    m7: { accent: '#34a853', strong: '#0d652d', soft: '#e6f4ea', muted: '#ceead6' }
  };
  private readonly conceptGlossary: Record<string, ConceptExplanation> = {
    'addend': {
      term: 'addend',
      meaning: 'A number being added. In a word problem, each addend must match a real part of the situation.',
      teacherCheck: 'Ask which part of the story each addend represents.'
    },
    'angle': {
      term: 'angle',
      meaning: 'The corner formed where two sides or rays meet.',
      teacherCheck: 'Ask the student to point to the corner, not the whole shape.'
    },
    'area': {
      term: 'area',
      meaning: 'The amount of flat space inside a shape, measured in square units.',
      teacherCheck: 'Ask whether the student is counting inside squares, not the outside boundary.'
    },
    'array': {
      term: 'array',
      meaning: 'Objects arranged in equal rows and columns. Arrays make factors visible.',
      teacherCheck: 'Ask what the rows mean, what the columns mean, and what the total means.'
    },
    'attribute': {
      term: 'attribute',
      meaning: 'A property you can use to describe or classify a shape, such as sides, angles, or area.',
      teacherCheck: 'Ask the student to name the property they used, not just the shape name.'
    },
    'capacity': {
      term: 'capacity',
      meaning: 'How much a container can hold, often measured in liters or milliliters.',
      teacherCheck: 'Ask for the unit and whether the amount is a capacity, not a weight.'
    },
    'commutative property': {
      term: 'commutative property',
      meaning: 'Factors can switch order and the product stays the same.',
      teacherCheck: 'Ask what stayed the same and what changed in the picture or equation.'
    },
    'data': {
      term: 'data',
      meaning: 'Collected information, such as counts or measurements, that can be organized and compared.',
      teacherCheck: 'Ask what each number or mark represents before reading the graph.'
    },
    'decompose': {
      term: 'decompose',
      meaning: 'Break a number or shape into useful parts without changing the total.',
      teacherCheck: 'Ask how the smaller parts recombine to make the original whole.'
    },
    'distributive property': {
      term: 'distributive property',
      meaning: 'Break one factor apart, multiply the parts, then add the partial products.',
      teacherCheck: 'Ask the student to show the split in the model and in the equation.'
    },
    'division': {
      term: 'division',
      meaning: 'An operation that finds a missing factor: either how many groups or how many are in each group.',
      teacherCheck: 'Ask what total is being separated and what the quotient means in the story before solving.'
    },
    'elapsed time': {
      term: 'elapsed time',
      meaning: 'The amount of time that passes from a start time to an end time.',
      teacherCheck: 'Ask the student to show the jumps from start to end.'
    },
    'equal groups': {
      term: 'equal groups',
      meaning: 'Groups with the same number in each group.',
      teacherCheck: 'Ask the student to verify every group is the same size before multiplying or dividing.'
    },
    'equivalent fractions': {
      term: 'equivalent fractions',
      meaning: 'Fractions that name the same amount of the same whole.',
      teacherCheck: 'Ask the student to use the same whole and show why the amounts match.'
    },
    'factor': {
      term: 'factor',
      meaning: 'A number that is multiplied. In a model, a factor can mean number of groups or size of each group.',
      teacherCheck: 'Ask what each factor represents before accepting the product.'
    },
    'fraction': {
      term: 'fraction',
      meaning: 'A number that names equal parts of a whole.',
      teacherCheck: 'Ask what the whole is and whether the parts are equal.'
    },
    'gram': {
      term: 'gram',
      meaning: 'A metric unit for measuring mass; it is useful for lighter objects.',
      teacherCheck: 'Ask whether grams or kilograms make sense for the object.'
    },
    'kilogram': {
      term: 'kilogram',
      meaning: 'A metric unit for measuring mass; it is useful for heavier objects.',
      teacherCheck: 'Ask whether kilograms or grams make sense for the object.'
    },
    'line plot': {
      term: 'line plot',
      meaning: 'A graph that shows data values on a number line using marks such as Xs.',
      teacherCheck: 'Ask what one mark means and what the scale shows.'
    },
    'liter': {
      term: 'liter',
      meaning: 'A metric unit for measuring liquid capacity.',
      teacherCheck: 'Ask the student to keep the unit attached to the number.'
    },
    'milliliter': {
      term: 'milliliter',
      meaning: 'A smaller metric unit for liquid capacity; 1,000 milliliters make 1 liter.',
      teacherCheck: 'Ask whether the answer should be in liters or milliliters.'
    },
    'multiplication': {
      term: 'multiplication',
      meaning: 'An operation for equal groups. It can find the total when the number of groups and group size are known.',
      teacherCheck: 'Ask which factor is the number of groups and which factor is the size of each group.'
    },
    'number line': {
      term: 'number line',
      meaning: 'A line where position and distance show numbers or measurements.',
      teacherCheck: 'Ask the student to count intervals, not tick marks.'
    },
    'perimeter': {
      term: 'perimeter',
      meaning: 'The distance around a shape.',
      teacherCheck: 'Ask whether the student is adding outside side lengths, not inside squares.'
    },
    'product': {
      term: 'product',
      meaning: 'The answer to a multiplication problem.',
      teacherCheck: 'Ask what total the product counts in the model.'
    },
    'quotient': {
      term: 'quotient',
      meaning: 'The answer to a division problem. It can mean how many groups or how many are in each group.',
      teacherCheck: 'Ask what the quotient means in this problem, not just what number it is.'
    },
    'right angle': {
      term: 'right angle',
      meaning: 'A square corner angle.',
      teacherCheck: 'Ask the student to compare the corner to a square corner.'
    },
    'round': {
      term: 'round',
      meaning: 'Replace a number with a nearby benchmark number that is easier to use.',
      teacherCheck: 'Ask which benchmark the number is closer to and why.'
    },
    'scale': {
      term: 'scale',
      meaning: 'What each mark, interval, picture, or bar represents.',
      teacherCheck: 'Ask what one mark or interval counts before reading the graph.'
    },
    'square unit': {
      term: 'square unit',
      meaning: 'A square used to measure area without gaps or overlaps.',
      teacherCheck: 'Ask why the unit is square and where the square units cover the shape.'
    },
    'tape diagram': {
      term: 'tape diagram',
      meaning: 'A bar model that shows the whole, parts, and unknown in a problem.',
      teacherCheck: 'Ask what the whole bar means and what each part means.'
    },
    'unit fraction': {
      term: 'unit fraction',
      meaning: 'One equal part of a whole, such as 1/3 or 1/4.',
      teacherCheck: 'Ask what one part is called after the whole is partitioned equally.'
    },
    'unknown': {
      term: 'unknown',
      meaning: 'The quantity we do not know yet. A letter or blank can stand for it.',
      teacherCheck: 'Ask what the unknown represents in words before solving.'
    },
    'unknown factor': {
      term: 'unknown factor',
      meaning: 'A missing factor in a multiplication equation. Division can be used to find it.',
      teacherCheck: 'Ask which factor is missing and what that factor means in the model.'
    },
    'whole': {
      term: 'whole',
      meaning: 'The complete object, amount, or interval being partitioned or measured.',
      teacherCheck: 'Ask the student to identify the whole before naming parts or fractions.'
    }
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
  readonly multiplicationDivisionVocabularyRows: VocabularyComparisonRow[] = [
    {
      operation: 'Multiplication',
      howToSayIt: 'times',
      example: '3 × 4 = 12',
      answerName: 'product'
    },
    {
      operation: 'Division',
      howToSayIt: 'divided by',
      example: '12 ÷ 3 = 4',
      answerName: 'quotient'
    }
  ];
  readonly moduleConceptFrames: Record<string, ModuleConceptFrame> = MODULE_CONCEPT_FRAMES;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly title: Title,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const moduleId = params.get('moduleId') ?? 'm1';
      const lessonNumber = Number(params.get('lessonNumber') ?? '1');
      const lessonRouteKey = `${moduleId}-l${lessonNumber}`;
      const section = this.problemSectionFromRoute(params.get('problemSection'), params.get('problemSetMode'));
      const mode = this.problemSetModeFromRoute(params.get('problemSetMode'));
      this.module = findModule(moduleId);
      this.lesson = findLesson(moduleId, lessonNumber);
      this.activeProblemSection = section;
      this.problemSetMode = mode;

      if (lessonRouteKey !== this.activeLessonRouteKey) {
        this.activeLessonRouteKey = lessonRouteKey;
        this.activeStepIndex = 0;
        this.resetLessonState();
      }

      if (this.module && this.lesson) {
        this.title.setTitle(`M${this.module.number} L${this.lesson.lessonNumber}: ${this.lesson.title} | Ruchika Grade 3 Maths`);
      } else {
        this.title.setTitle('Lesson Not Found | Ruchika Grade 3 Maths');
      }
    });
  }

  ngAfterViewChecked(): void {
    this.updateLessonLibraryClocks();

    const signature = [
      this.module?.id ?? 'module',
      this.lesson?.lessonNumber ?? 'lesson',
      this.activeProblemSection,
      this.problemSetMode,
      this.activeStepIndex,
      this.lessonAnimation?.kind ?? 'no-animation'
    ].join('|');

    if (signature === this.lessonConceptAnimationSignature) {
      return;
    }

    this.lessonConceptAnimationSignature = signature;
    queueMicrotask(() => this.playLessonConceptAnimation());
  }

  private playLessonConceptAnimation(): void {
    const host = this.elementRef.nativeElement;
    const conceptPanels = host.querySelectorAll<HTMLElement>(
      '.lesson-header-main, .problem-centered-concept, .problem-centered-source-concepts article, .concept-first-panel, .activity-card'
    );
    const keepTextOpaque = host.classList.contains('lesson-m2-l6')
      || host.classList.contains('lesson-m2-l7')
      || host.classList.contains('lesson-m2-l8')
      || host.classList.contains('lesson-m2-l9')
      || host.classList.contains('lesson-m2-l10')
      || host.classList.contains('lesson-m2-l11')
      || host.classList.contains('lesson-m2-l12')
      || host.classList.contains('lesson-m2-l13')
      || host.classList.contains('lesson-m2-l14')
      || host.classList.contains('lesson-m2-l15')
      || host.classList.contains('lesson-m2-l16')
      || host.classList.contains('lesson-m2-l17')
      || host.classList.contains('lesson-m2-l18')
      || host.classList.contains('lesson-m2-l19')
      || host.classList.contains('lesson-m2-l20')
      || host.classList.contains('lesson-m2-l21')
      || host.classList.contains('lesson-m3')
      || host.classList.contains('lesson-m4')
      || host.classList.contains('lesson-m5')
      || host.classList.contains('lesson-m6')
      || host.classList.contains('lesson-m7');
    const tabs = host.querySelectorAll<HTMLElement>('.problem-centered-tabs button, .step-button');
    const lessonModels = host.querySelectorAll<HTMLElement>(
      [
        '.lesson-animation-group',
        '.lesson-animation-array span',
        '.lesson-animation-tape-parts span',
        '.lesson-animation-line-track span',
        '.lesson-animation-line-track i',
        '.lesson-animation-clock-face analog-clock',
        '.lesson-animation-measure-track span',
        '.lesson-animation-pv-row i',
        '.lesson-animation-pv-moves span',
        '.lesson-animation-pv-result span',
        '.lesson-animation-area-grid span',
        '.lesson-animation-fraction-strip span',
        '.lesson-animation-graph-bars i',
        '.lesson-animation-polygon span',
        '.problem-visual-workspace .visual-section',
        '.problem-visual-workspace .visual-stopwatch-face',
        '.problem-visual-workspace .visual-tape span',
        '.problem-visual-workspace .visual-number-line span',
        '.problem-visual-workspace .visual-measurement-lab .kg-pan',
        '.problem-visual-workspace .visual-measurement-lab .kg-ten-frame span',
        '.problem-visual-workspace .workspace-library-clock'
      ].join(', ')
    );
    const equations = host.querySelectorAll<HTMLElement>(
      '.lesson-animation-equation, .lesson-animation-notes li, .lesson-animation-steps li, .concept-contrast, .concept-source-checks li'
    );

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      [...conceptPanels, ...tabs, ...lessonModels, ...equations].forEach((element) => {
        element.style.opacity = '1';
        element.style.removeProperty('transform');
      });
      return;
    }

    if (conceptPanels.length) {
      animate(conceptPanels, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        translateY: [12, 0],
        duration: keepTextOpaque ? 300 : 520,
        delay: stagger(45),
        ease: 'out(3)'
      });
    }

    if (tabs.length) {
      animate(tabs, {
        opacity: keepTextOpaque ? 1 : [0.55, 1],
        scale: [0.96, 1],
        duration: 360,
        delay: stagger(24),
        ease: 'out(3)'
      });
    }

    if (lessonModels.length) {
      animate(lessonModels, {
        opacity: keepTextOpaque ? 1 : [0.25, 1],
        scale: [0.82, 1],
        translateY: [8, 0],
        duration: 650,
        delay: stagger(28, { from: 'first' }),
        ease: 'out(4)'
      });
    }

    if (equations.length) {
      animate(equations, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        translateX: [-8, 0],
        duration: 460,
        delay: stagger(35),
        ease: 'out(3)'
      });
    }
  }

  replayLessonConceptAnimation(): void {
    this.lessonConceptAnimationSignature = '';
    requestAnimationFrame(() => this.playLessonConceptAnimation());
  }

  private updateLessonLibraryClocks(): void {
    this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.lesson-library-clock').forEach((host) => {
      if (!host.querySelector('analog-clock')) {
        host.innerHTML = '<analog-clock aria-hidden="true" indices marker="." marker-hour="●" numerals="12"></analog-clock>';
      }
      const clock = host.querySelector<HTMLElement>('analog-clock');
      if (!clock) {
        return;
      }
      const hour = Number(host.dataset['hour'] ?? 7);
      const minute = Number(host.dataset['minute'] ?? 35);
      clock.style.setProperty('--_dh', `${-3600 * (hour % 12) - 60 * minute}s`);
      clock.style.setProperty('--_dm', `${-60 * minute}s`);
      clock.style.setProperty('--_ds', '0s');
    });
  }

  get activeStep() {
    return this.displaySteps[this.activeStepIndex];
  }

  get activeLessonRuntime(): LessonRuntimeConfig | undefined {
    if (!this.module || !this.lesson) {
      return undefined;
    }
    return findLessonRuntime(this.module.id, this.lesson.lessonNumber);
  }

  get problemSetCenteredLesson() {
    return this.activeLessonRuntime?.problemSetCenteredLesson;
  }

  get moduleConceptFrame(): ModuleConceptFrame | undefined {
    if (!this.module || !this.lesson) {
      return undefined;
    }

    const frame = this.moduleConceptFrames[this.module.id];
    if (!frame) {
      return undefined;
    }

    const lessonNumber = this.lesson.lessonNumber;
    if (this.module.id === 'm1' && lessonNumber >= 1 && lessonNumber <= 3) {
      return {
        ...frame,
        title: 'Equal groups and arrays define multiplication',
        bigIdea: 'These lessons build multiplication from concrete equal groups, skip-counting, and arrays so the product means the total number of objects.',
        modelLabel: 'equal groups -> array -> product',
        studentQuestion: 'How many groups are there, and how many are in each group?',
        visual: lessonNumber === 2 ? 'array-rows-columns' : 'equal-groups',
        transform: {
          from: '4 equal groups of 3',
          action: 'arrange the groups as rows and columns',
          to: '4 x 3 = 12 total objects'
        },
        lessonBands: [
          { label: 'Group', lessons: 'L1', start: 1, end: 1, focus: 'equal groups and repeated addition' },
          { label: 'Array', lessons: 'L2', start: 2, end: 2, focus: 'rows, columns, and products' },
          { label: 'Interpret', lessons: 'L3', start: 3, end: 3, focus: 'use the model to write facts' }
        ],
        teacherLookFor: [
          'Every group has the same number of objects.',
          'Rows and columns match the multiplication factors.',
          'The product names the total in the picture.'
        ]
      };
    }

    if (this.module.id === 'm1' && lessonNumber >= 4 && lessonNumber <= 13) {
      return {
        ...frame,
        title: 'Division asks for the missing group or missing group size',
        bigIdea: 'These lessons use tape diagrams, arrays, and related multiplication facts to decide whether division is finding the number of groups or the size of each group.',
        modelLabel: 'total -> equal parts -> unknown factor',
        studentQuestion: 'Is the unknown the number of groups or the amount in each group?',
        visual: lessonNumber === 7
          ? 'commutative-array'
          : lessonNumber === 10
            ? 'distributive-array'
            : lessonNumber >= 6 && lessonNumber <= 9
              ? 'array-rows-columns'
              : 'division-tape',
        transform: {
          from: '24 total objects',
          action: 'separate into equal groups',
          to: '24 divided by 4 = 6 or 6 x 4 = 24'
        },
        lessonBands: [
          { label: 'Share', lessons: 'L4-L5', start: 4, end: 5, focus: 'unknown group size' },
          { label: 'Group', lessons: 'L6-L10', start: 6, end: 10, focus: 'unknown number of groups' },
          { label: 'Relate', lessons: 'L11-L13', start: 11, end: 13, focus: 'division as related multiplication' }
        ],
        teacherLookFor: [
          'The total is labeled before it is divided.',
          'All parts are equal.',
          'The quotient meaning matches the question.'
        ]
      };
    }

    if (this.module.id === 'm1' && lessonNumber >= 14 && lessonNumber <= 21) {
      return {
        ...frame,
        title: 'Decomposition makes multiplication and division easier',
        bigIdea: 'These lessons split arrays, tape diagrams, and word-problem quantities into friendlier parts, then combine partial products or partial answers without changing the total.',
        modelLabel: 'whole fact -> split -> partial facts -> recombine',
        studentQuestion: 'How was the whole split, and how do the parts recombine?',
        visual: lessonNumber === 15 || lessonNumber === 17 || lessonNumber >= 20 ? 'division-tape' : 'distributive-array',
        transform: {
          from: '7 x 6',
          action: 'split 7 as 5 + 2',
          to: '(5 x 6) + (2 x 6) = 42'
        },
        lessonBands: [
          { label: 'Split', lessons: 'L14-L17', start: 14, end: 17, focus: 'distributive property with arrays' },
          { label: 'Apply', lessons: 'L18-L19', start: 18, end: 19, focus: 'related facts and problem solving' },
          { label: 'Two-Step', lessons: 'L20-L21', start: 20, end: 21, focus: 'RDW and multi-step tape diagrams' }
        ],
        teacherLookFor: [
          'The split is visible in the model.',
          'Partial products add back to the original total.',
          'Word-problem answers name the unit and context.'
        ]
      };
    }

    if (this.module.id === 'm2' && lessonNumber >= 1 && lessonNumber <= 5) {
      return {
        ...frame,
        title: 'Time is continuous and intervals can be represented',
        bigIdea: 'These lessons connect a running stopwatch, an unwrapped clock, and time number lines so students can measure seconds, compose minutes, and solve for a missing start, end, or elapsed time.',
        modelLabel: 'stopwatch -> unwrapped clock -> time line -> unknown time',
        studentQuestion: 'What is known, what time quantity is unknown, and which intervals connect them?',
        visual: lessonNumber <= 3 ? 'clock-time' : 'elapsed-time-line',
        transform: {
          from: 'start time',
          action: 'move by equal minute intervals',
          to: 'end time and elapsed minutes'
        },
        lessonBands: [
          { label: 'Seconds', lessons: 'L1', start: 1, end: 1, focus: 'continuous stopwatch intervals' },
          { label: 'Unwrap', lessons: 'L2', start: 2, end: 2, focus: 'twelve 5-minute intervals' },
          { label: 'Exact', lessons: 'L3', start: 3, end: 3, focus: 'compose minutes with fives and ones' },
          { label: 'Elapsed', lessons: 'L4', start: 4, end: 4, focus: 'start, end, and elapsed unknowns' },
          { label: 'Parts', lessons: 'L5', start: 5, end: 5, focus: 'add and subtract time intervals' }
        ],
        teacherLookFor: [
          'Each interval is measured from one endpoint to the next.',
          'Number-line jumps preserve the actual size of the time intervals.',
          'The equation and unit match the unknown: start, end, or elapsed time.'
        ]
      };
    }

    if (this.module.id === 'm2' && lessonNumber >= 6 && lessonNumber <= 11) {
      return {
        ...frame,
        title: 'Metric measurement depends on units and benchmarks',
        bigIdea: 'These lessons compare kilograms, grams, liters, and milliliters with scales and containers so the number is always tied to a unit.',
        modelLabel: 'object/container -> unit -> measure -> compare',
        studentQuestion: 'Which unit fits the object or container, and what benchmark checks it?',
        visual: 'metric-measure',
        transform: {
          from: 'measured mass or capacity',
          action: 'read the scale or fill line',
          to: 'answer in kg, g, L, or mL'
        },
        lessonBands: [
          { label: 'Mass', lessons: 'L6-L8', start: 6, end: 8, focus: 'kilograms and grams' },
          { label: 'Capacity', lessons: 'L9-L10', start: 9, end: 10, focus: 'liters and milliliters' },
          { label: 'Estimate', lessons: 'L11', start: 11, end: 11, focus: 'benchmarks and reasonableness' }
        ],
        teacherLookFor: [
          'The unit is attached to every measurement.',
          'The benchmark makes the estimate reasonable.',
          'Mass and capacity are not confused.'
        ]
      };
    }

    if (this.module.id === 'm2' && lessonNumber >= 12 && lessonNumber <= 14) {
      return {
        ...frame,
        title: 'Rounding uses distance to the nearest benchmark',
        bigIdea: 'These lessons place measurements on a number line, compare distance to neighboring tens or hundreds, and round to the closer benchmark.',
        modelLabel: 'number -> benchmarks -> nearest ten/hundred',
        studentQuestion: 'Which benchmark is closer on the number line?',
        visual: 'vertical-rounding-line',
        transform: {
          from: '347 grams',
          action: 'place between 340 and 350',
          to: '350 grams to the nearest ten'
        },
        lessonBands: [
          { label: 'Tens', lessons: 'L12-L13', start: 12, end: 13, focus: 'nearest ten' },
          { label: 'Hundreds', lessons: 'L14', start: 14, end: 14, focus: 'nearest hundred' },
          { label: 'Justify', lessons: 'L12-L14', start: 12, end: 14, focus: 'distance from benchmarks' }
        ],
        teacherLookFor: [
          'The number is placed between two benchmarks.',
          'Distance determines the rounded value.',
          'Rounded estimates keep the measurement unit.'
        ]
      };
    }

    if (this.module.id === 'm2' && lessonNumber >= 15 && lessonNumber <= 21) {
      return {
        ...frame,
        title: 'Measurement word problems keep units through operations',
        bigIdea: 'These lessons add, subtract, compose, and decompose measurements while keeping kilograms, grams, liters, milliliters, seconds, and minutes attached.',
        modelLabel: 'measurements -> operation -> unit answer',
        studentQuestion: 'What operation matches the situation, and what unit stays attached?',
        visual: lessonNumber <= 16
          ? 'measurement-compose'
          : lessonNumber >= 18 && lessonNumber <= 19
            ? 'measurement-decompose'
            : 'measurement-operation',
        transform: {
          from: 'known measurements',
          action: 'add, subtract, compose, or decompose',
          to: 'answer with the correct unit'
        },
        lessonBands: [
          { label: 'Add/Subtract', lessons: 'L15-L17', start: 15, end: 17, focus: 'one-step measurement problems' },
          { label: 'Compose', lessons: 'L18-L19', start: 18, end: 19, focus: 'mixed units and regrouping' },
          { label: 'RDW', lessons: 'L20-L21', start: 20, end: 21, focus: 'multi-step measurement stories' }
        ],
        teacherLookFor: [
          'The operation comes from the story action.',
          'Units are converted or composed when needed.',
          'The final sentence includes the measurement unit.'
        ]
      };
    }

    if (this.module.id === 'm3' && lessonNumber >= 1 && lessonNumber <= 7) {
      return {
        ...frame,
        title: 'Commutativity and known facts generate 6s and 7s',
        bigIdea: 'These lessons use arrays, tape diagrams, and related facts so 6s and 7s are built from known facts rather than memorized in isolation.',
        modelLabel: 'known fact -> switch or split -> target fact',
        studentQuestion: 'Which known fact proves this new multiplication or division fact?',
        visual: lessonNumber === 1
          ? 'commutative-array'
          : lessonNumber === 3 || lessonNumber === 7
            ? 'unknown-factor'
            : 'distributive-facts',
        transform: {
          from: '6 x 7',
          action: 'use 5 x 7 plus 1 x 7',
          to: '42 and related division facts'
        },
        lessonBands: [
          { label: 'Switch', lessons: 'L1-L3', start: 1, end: 3, focus: 'commutative property' },
          { label: 'Split', lessons: 'L4-L5', start: 4, end: 5, focus: '5s facts plus one more group' },
          { label: 'Relate', lessons: 'L6-L7', start: 6, end: 7, focus: 'division as unknown factor' }
        ],
        teacherLookFor: [
          'The known fact is named.',
          'The model proves the switched or split fact.',
          'Related division facts use the same total.'
        ]
      };
    }

    if (this.module.id === 'm3' && lessonNumber >= 8 && lessonNumber <= 14) {
      return {
        ...frame,
        title: 'Patterns and decomposition make 8s and 9s facts efficient',
        bigIdea: 'These lessons use 10s, 5s, doubling, and split arrays to derive 8s and 9s facts with visible reasoning.',
        modelLabel: 'pattern -> decompose -> recombine',
        studentQuestion: 'What friendlier fact or pattern is being used?',
        visual: lessonNumber === 11
          ? 'unknown-factor'
          : lessonNumber >= 12
            ? 'pattern-facts'
            : 'distributive-facts',
        transform: {
          from: '9 x 6',
          action: 'think 10 x 6 minus 1 x 6',
          to: '60 - 6 = 54'
        },
        lessonBands: [
          { label: '8s', lessons: 'L8-L10', start: 8, end: 10, focus: 'doubling and split arrays' },
          { label: '9s', lessons: 'L11-L13', start: 11, end: 13, focus: '10s minus one group' },
          { label: 'Apply', lessons: 'L14', start: 14, end: 14, focus: 'mixed derived facts' }
        ],
        teacherLookFor: [
          'The pattern is visible in the model.',
          'The decomposition keeps the total equivalent.',
          'The equation matches the visual strategy.'
        ]
      };
    }

    if (this.module.id === 'm3' && lessonNumber >= 15 && lessonNumber <= 21) {
      return {
        ...frame,
        title: 'Fluency comes from properties, patterns, and problem solving',
        bigIdea: 'These lessons connect 0, 1, 10, multiples of 10, mixed facts, and two-step word problems to models that explain why the facts work.',
        modelLabel: 'special fact -> pattern -> solve in context',
        studentQuestion: 'Which property or pattern makes the fact immediate, and what does it mean in the story?',
        visual: lessonNumber >= 19 && lessonNumber <= 20
          ? 'place-value-facts'
          : lessonNumber === 18 || lessonNumber === 21
            ? 'rdw'
            : 'fluency-facts',
        transform: {
          from: '10 x 8 or 0 x 8',
          action: 'use the property and related facts',
          to: 'fluent answer with a model check'
        },
        lessonBands: [
          { label: 'Special', lessons: 'L15-L17', start: 15, end: 17, focus: '0, 1, and 10 facts' },
          { label: 'Mixed', lessons: 'L18-L19', start: 18, end: 19, focus: 'all facts and multiples of 10' },
          { label: 'Solve', lessons: 'L20-L21', start: 20, end: 21, focus: 'multi-step word problems' }
        ],
        teacherLookFor: [
          'The property is named or shown.',
          'Fluency is checked against a model or related fact.',
          'Two-step answers account for every part of the story.'
        ]
      };
    }

    if (this.module.id === 'm4' && lessonNumber >= 1 && lessonNumber <= 4) {
      return {
        ...frame,
        title: 'Area is tiled with same-size square units',
        bigIdea: 'These lessons are about covering the inside of a flat figure with equal square units, with no gaps and no overlaps.',
        modelLabel: 'flat figure -> square units -> count area',
        studentQuestion: 'What unit covers the inside, and are there gaps or overlaps?',
        visual: lessonNumber === 2 ? 'area-decompose' : lessonNumber === 4 ? 'area-array' : 'tile-area',
        transform: {
          from: 'one flat figure',
          action: 'cover the inside with equal square units',
          to: 'area = number of square units'
        },
        lessonBands: [
          { label: 'Cover', lessons: 'L1-L4', start: 1, end: 4, focus: 'tile the inside with same-size squares' },
          { label: 'Check', lessons: 'L1-L4', start: 1, end: 4, focus: 'no gaps and no overlaps' },
          { label: 'Count', lessons: 'L1-L4', start: 1, end: 4, focus: 'area equals the number of square units' }
        ],
        teacherLookFor: [
          'Student counts only the inside space.',
          'Every tile is the same square unit.',
          'The unit is named: square units, square inches, or square centimeters.'
        ]
      };
    }

    if (this.module.id === 'm4' && lessonNumber >= 5 && lessonNumber <= 8) {
      return {
        ...frame,
        title: 'Rows and columns complete the rectangle array',
        bigIdea: 'These lessons use incomplete arrays, tiled rectangles, rows, columns, and side lengths to find the full area in square units.',
        modelLabel: 'incomplete array -> complete rows and columns -> multiply',
        studentQuestion: 'How many rows and columns does the full rectangle have?',
        visual: 'area-array',
        transform: {
          from: 'partial tiled rectangle',
          action: 'extend the missing rows and columns',
          to: 'rows x columns = total square units'
        },
        lessonBands: [
          { label: 'Tile', lessons: 'L5', start: 5, end: 5, focus: 'make arrays with unit squares' },
          { label: 'Complete', lessons: 'L6-L7', start: 6, end: 7, focus: 'draw missing rows and columns' },
          { label: 'Multiply', lessons: 'L8', start: 8, end: 8, focus: 'use side lengths as factors' }
        ],
        teacherLookFor: [
          'Rows and columns extend across the whole rectangle.',
          'The side lengths match the array dimensions.',
          'The answer is square units, not just units.'
        ]
      };
    }

    if (this.module.id === 'm4' && lessonNumber >= 9 && lessonNumber <= 14) {
      return {
        ...frame,
        title: 'Area can be decomposed and recomposed',
        bigIdea: 'These lessons split rectangles and composite figures into known rectangles, then add the partial areas to keep the same total area.',
        modelLabel: 'whole rectangle -> smaller rectangles -> add areas',
        studentQuestion: 'Where can the figure be split so every part is a rectangle with known side lengths?',
        visual: lessonNumber === 9 ? 'area-array' : 'area-decompose',
        transform: {
          from: 'one large or composite figure',
          action: 'split or complete it into rectangles',
          to: 'area A + area B = total area'
        },
        lessonBands: [
          { label: 'Compare', lessons: 'L9', start: 9, end: 9, focus: 'same area through different rectangles' },
          { label: 'Distribute', lessons: 'L10-L11', start: 10, end: 11, focus: 'partial products from split rectangles' },
          { label: 'Solve', lessons: 'L12-L14', start: 12, end: 14, focus: 'area word problems and composite figures' }
        ],
        teacherLookFor: [
          'Each decomposed part has labeled side lengths.',
          'The sum of parts equals the original whole.',
          'Missing areas are found from rectangle structure.'
        ]
      };
    }

    if (this.module.id === 'm4' && lessonNumber >= 15 && lessonNumber <= 16) {
      return {
        ...frame,
        title: 'Floor plans are area models',
        bigIdea: 'These lessons use a floor plan as a set of rectangles: each room has length, width, and area, and the total space is found by combining rooms.',
        modelLabel: 'floor plan -> room rectangles -> total area',
        studentQuestion: 'Which room dimensions are known, and which room area is being found?',
        visual: 'area-floor-plan',
        transform: {
          from: 'labeled floor plan',
          action: 'find each room area',
          to: 'combined area of the rooms'
        },
        lessonBands: [
          { label: 'Rooms', lessons: 'L15', start: 15, end: 15, focus: 'find individual room areas' },
          { label: 'Plan', lessons: 'L16', start: 16, end: 16, focus: 'use all room areas in the floor plan' },
          { label: 'Check', lessons: 'L15-L16', start: 15, end: 16, focus: 'square units and totals stay attached' }
        ],
        teacherLookFor: [
          'Each room is treated as a rectangle.',
          'The dimensions used belong to that room.',
          'Totals combine room areas, not perimeters.'
        ]
      };
    }

    if (this.module.id === 'm5' && lessonNumber >= 1 && lessonNumber <= 2) {
      return {
        ...frame,
        title: 'Fraction strips name equal parts of a fixed whole',
        bigIdea: 'Lessons 1 and 2 use concrete wholes and folded strips: the whole is fixed first, then students fold or partition it into halves, thirds, fourths, sixths, and other equal parts.',
        modelLabel: 'whole strip -> folds -> unit fractions',
        studentQuestion: 'What is the whole strip, and did the folds make equal parts?',
        visual: 'fraction-folds',
        transform: {
          from: 'one whole strip',
          action: 'fold into equal parts',
          to: 'halves, thirds, fourths, or sixths'
        },
        lessonBands: [
          { label: 'Whole', lessons: 'L1-L2', start: 1, end: 2, focus: 'fix the strip, beaker, cheese, or candy bar whole' },
          { label: 'Fold', lessons: 'L2', start: 2, end: 2, focus: 'use fraction strips to make equal parts' },
          { label: 'Name', lessons: 'L1-L2', start: 1, end: 2, focus: 'count and name unit fractions' }
        ],
        teacherLookFor: [
          'The whole is named before the fraction.',
          'Parts are equal before the denominator is named.',
          'One part is named as one unit fraction of that whole.'
        ]
      };
    }

    if (this.module.id === 'm5' && lessonNumber >= 3 && lessonNumber <= 13) {
      return {
        ...frame,
        title: 'Area models show fractional parts of a whole',
        bigIdea: 'These lessons draw wholes, partition them into equal parts, shade or leave parts unshaded, and explain how the selected whole changes the fraction name.',
        modelLabel: 'draw whole -> partition equally -> shade/count parts',
        studentQuestion: 'Which whole is being partitioned, and how many equal parts are shaded or unshaded?',
        visual: lessonNumber === 8
          ? 'fraction-number-bond'
          : lessonNumber === 9
            ? 'fraction-greater-one'
            : lessonNumber >= 10
              ? 'fraction-whole-unit'
              : 'fraction-area',
        transform: {
          from: 'one pictorial whole',
          action: 'partition into equal area parts',
          to: 'fraction named by shaded or selected parts'
        },
        lessonBands: [
          { label: 'Draw', lessons: 'L3-L5', start: 3, end: 5, focus: 'pictorial area models and unit fractions' },
          { label: 'Build', lessons: 'L6-L9', start: 6, end: 9, focus: 'non-unit and greater-than-one fractions' },
          { label: 'Whole', lessons: 'L10-L13', start: 10, end: 13, focus: 'compare units and specify the whole' }
        ],
        teacherLookFor: [
          'The whole is visible and labeled.',
          'Equal parts are equal in area, not just similar-looking.',
          'Shaded and unshaded parts together account for the whole.'
        ]
      };
    }

    if (this.module.id === 'm5' && lessonNumber >= 14 && lessonNumber <= 15) {
      return {
        ...frame,
        title: 'Fractions on a number line are distances from 0 to 1',
        bigIdea: 'Lessons 14 and 15 partition one unit interval into equal lengths, then place fractions between 0 and 1 by counting intervals from 0.',
        modelLabel: '0 to 1 interval -> equal jumps -> fraction position',
        studentQuestion: 'What is one whole interval, and how many equal jumps reach the fraction?',
        visual: 'fraction-number-line',
        transform: {
          from: 'unit interval',
          action: 'partition into equal lengths',
          to: 'fraction located by distance from 0'
        },
        lessonBands: [
          { label: 'Place', lessons: 'L14-L15', start: 14, end: 15, focus: 'fractions between 0 and 1' },
          { label: 'Partition', lessons: 'L14-L15', start: 14, end: 15, focus: 'equal intervals, not tick marks' },
          { label: 'Locate', lessons: 'L14-L15', start: 14, end: 15, focus: 'count jumps from 0' }
        ],
        teacherLookFor: [
          'Intervals, not tick marks, are counted.',
          'Every interval in the unit is the same length.',
          'The point is labeled with the correct fractional unit.'
        ]
      };
    }

    if (this.module.id === 'm5' && lessonNumber >= 16 && lessonNumber <= 17) {
      return {
        ...frame,
        title: 'Whole-number fractions extend the number line beyond 1',
        bigIdea: 'Lessons 16 and 17 place fractions such as 4 fourths, 5 fourths, and 8 fourths by repeating equal unit intervals across multiple wholes.',
        modelLabel: 'one whole interval -> repeat units -> fractions beyond 1',
        studentQuestion: 'How many whole intervals are crossed before the fractional point is reached?',
        visual: 'fraction-beyond-one',
        transform: {
          from: '0 to 2 number line',
          action: 'partition each whole into fourths',
          to: '4/4 = 1 and 7/4 = 1 3/4'
        },
        lessonBands: [
          { label: 'Whole Fractions', lessons: 'L16', start: 16, end: 16, focus: '4/4, 5/5, and other fractions equal whole numbers' },
          { label: 'Between Wholes', lessons: 'L16-L17', start: 16, end: 17, focus: 'fractions between 1 and 2' },
          { label: 'Practice', lessons: 'L17', start: 17, end: 17, focus: 'place varied fractions on the extended line' }
        ],
        teacherLookFor: [
          'Each whole interval is the same length.',
          'Every whole is partitioned into the same fractional unit.',
          'Fractions greater than 1 are placed after crossing the first whole.'
        ]
      };
    }

    if (this.module.id === 'm5' && lessonNumber >= 18 && lessonNumber <= 19) {
      return {
        ...frame,
        title: 'Number-line comparisons use distance from 0',
        bigIdea: 'Lessons 18 and 19 compare fractions and whole numbers by placing them on the same number line and reasoning about which point is farther from 0.',
        modelLabel: 'same number line -> place points -> compare distance',
        studentQuestion: 'Which point is farther from 0 on the same number line?',
        visual: 'fraction-number-line-compare',
        transform: {
          from: '2/4 and 3/4 on one line',
          action: 'compare their positions from 0',
          to: '3/4 > 2/4'
        },
        lessonBands: [
          { label: 'Distance', lessons: 'L18', start: 18, end: 18, focus: 'compare by distance from 0' },
          { label: 'Position', lessons: 'L19', start: 19, end: 19, focus: 'use location on the same line' },
          { label: 'Justify', lessons: 'L18-L19', start: 18, end: 19, focus: 'explain with symbols and words' }
        ],
        teacherLookFor: [
          'Both values are on the same number line.',
          'Comparison is based on position, not denominator size alone.',
          'The inequality matches the visual order from left to right.'
        ]
      };
    }

    if (this.module.id === 'm5' && lessonNumber >= 20 && lessonNumber <= 27) {
      return {
        ...frame,
        title: lessonNumber >= 21 && lessonNumber <= 23 ? 'Equivalent fractions land on the same number-line point' : 'Equivalent fractions name the same amount',
        bigIdea: lessonNumber >= 21 && lessonNumber <= 23
          ? 'These lessons use the same 0-to-1 interval and partition it different ways so equivalent fractions line up at one shared point.'
          : 'These lessons use strips, area models, and number lines to show that different fraction names can describe the same amount or the same point.',
        modelLabel: lessonNumber >= 21 && lessonNumber <= 23 ? 'same interval -> different partitions -> same point' : 'same whole -> different units -> same amount',
        studentQuestion: lessonNumber >= 21 && lessonNumber <= 23
          ? 'Are both fractions located on the same whole interval, and do their marks line up?'
          : 'Do the two fraction names refer to the same whole and the same amount?',
        visual: lessonNumber >= 21 && lessonNumber <= 23
          ? 'fraction-number-line-equivalence'
          : lessonNumber >= 24
            ? 'fraction-whole-equivalence'
            : 'fraction-equivalence',
        transform: {
          from: lessonNumber >= 21 && lessonNumber <= 23 ? 'one 0 to 1 number line' : 'one same-size whole',
          action: lessonNumber >= 21 && lessonNumber <= 23 ? 'mark halves and fourths on the same interval' : 'partition with different unit fractions',
          to: lessonNumber >= 21 && lessonNumber <= 23 ? '1/2 and 2/4 at the same point' : 'equivalent fractions at the same amount'
        },
        lessonBands: [
          { label: 'Show', lessons: 'L20', start: 20, end: 20, focus: 'same size with different shapes' },
          { label: 'Line', lessons: 'L21-L23', start: 21, end: 23, focus: 'same point on the number line' },
          { label: 'Whole', lessons: 'L24-L27', start: 24, end: 27, focus: 'whole numbers as fractions and unit changes' }
        ],
        teacherLookFor: [
          'The same whole is used before comparing names.',
          'Equivalent marks line up at the same point or amount.',
          'Whole-number fractions are checked against the unit interval.'
        ]
      };
    }

    if (this.module.id === 'm5' && lessonNumber >= 28 && lessonNumber <= 30) {
      return {
        ...frame,
        title: 'Fraction comparisons depend on the unit',
        bigIdea: 'These lessons compare fractions with the same numerator and use precise partitioning methods to prove which units are larger, smaller, or equal.',
        modelLabel: 'same numerator -> unit size -> compare',
        studentQuestion: 'Are the wholes the same, and which unit fraction is larger?',
        visual: lessonNumber === 30 ? 'fraction-precise-partition' : 'fraction-compare',
        transform: {
          from: 'same number of parts shaded',
          action: 'compare the size of each unit',
          to: '>, <, or = with visual evidence'
        },
        lessonBands: [
          { label: 'Same Numerator', lessons: 'L28-L29', start: 28, end: 29, focus: 'compare by unit size' },
          { label: 'Precise', lessons: 'L30', start: 30, end: 30, focus: 'partition with the lined-paper number-line method' },
          { label: 'Prove', lessons: 'L28-L30', start: 28, end: 30, focus: 'justify with pictures, numbers, and words' }
        ],
        teacherLookFor: [
          'The comparison uses equal wholes.',
          'A larger denominator means smaller unit parts for the same whole.',
          'The written symbol matches the visual model.'
        ]
      };
    }

    if (this.module.id === 'm6' && lessonNumber >= 1 && lessonNumber <= 2) {
      return {
        ...frame,
        title: 'Categorical data becomes a display with a unit',
        bigIdea: 'Lessons 1 and 2 organize categorical data by first deciding what one tally, one picture symbol, or one vertical tape unit represents.',
        modelLabel: 'survey or tape data -> unit -> display',
        studentQuestion: 'What does one mark, picture, or tape unit represent?',
        visual: lessonNumber === 2 ? 'vertical-tape-data' : 'tally-data',
        transform: {
          from: 'favorite color or stamp data',
          action: 'choose the display unit',
          to: 'tally, picture graph, or vertical tape diagram'
        },
        lessonBands: [
          { label: 'Survey', lessons: 'L1', start: 1, end: 1, focus: 'record one response from each student' },
          { label: 'Picture', lessons: 'L1', start: 1, end: 1, focus: 'match symbols to the key' },
          { label: 'Tape', lessons: 'L2', start: 2, end: 2, focus: 'rotate tape units vertically without changing value' }
        ],
        teacherLookFor: [
          'Each data value is counted once.',
          'The display states what one mark or unit represents.',
          'The same data are preserved when the display changes.'
        ]
      };
    }

    if (this.module.id === 'm6' && lessonNumber >= 3 && lessonNumber <= 4) {
      return {
        ...frame,
        title: 'Scaled bar graphs answer comparison questions',
        bigIdea: 'Lessons 3 and 4 use data tables and scaled axes: students choose or read the scale, draw bars to the correct height, and solve comparison problems from the graph.',
        modelLabel: 'table -> scale -> bar graph -> comparison',
        studentQuestion: 'What is the scale, and how high should each bar be?',
        visual: 'scaled-bar-graph',
        transform: {
          from: 'data table',
          action: 'choose a graph scale and draw bars',
          to: 'comparison answers from the graph'
        },
        lessonBands: [
          { label: 'Table', lessons: 'L3-L4', start: 3, end: 4, focus: 'read source categories and values' },
          { label: 'Scale', lessons: 'L3-L4', start: 3, end: 4, focus: 'mark equal intervals on the axis' },
          { label: 'Compare', lessons: 'L3-L4', start: 3, end: 4, focus: 'answer one- and two-step questions from bars' }
        ],
        teacherLookFor: [
          'Bar heights match the stated scale.',
          'Category labels stay attached to the bars.',
          'Comparison answers cite graph values.'
        ]
      };
    }

    if (this.module.id === 'm6' && lessonNumber >= 5 && lessonNumber <= 9) {
      return {
        ...frame,
        title: 'Measurement data uses rulers and line plots',
        bigIdea: 'Lessons 5 through 9 create rulers with inch, half-inch, and quarter-inch intervals, collect measurements, and plot each measurement as an X on a line plot.',
        modelLabel: 'ruler interval -> measurement data -> line plot',
        studentQuestion: 'What interval does each tick mark show, and what does each X represent?',
        visual: lessonNumber === 5 ? 'ruler-intervals' : 'line-plot-interpret',
        transform: {
          from: 'measured objects',
          action: 'round to the ruler interval and plot each value',
          to: 'line plot used to describe the data'
        },
        lessonBands: [
          { label: 'Ruler', lessons: 'L5', start: 5, end: 5, focus: 'inch, half-inch, and quarter-inch intervals' },
          { label: 'Plot', lessons: 'L6-L8', start: 6, end: 8, focus: 'place one X for each measurement' },
          { label: 'Analyze', lessons: 'L9', start: 9, end: 9, focus: 'choose and interpret the correct data display' }
        ],
        teacherLookFor: [
          'Each tick interval is read correctly.',
          'Each X represents exactly one measurement.',
          'Typical values and comparisons come from the plotted data.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber <= 3) {
      return {
        ...frame,
        title: 'RDW word problems use a letter for the unknown',
        bigIdea: 'These lessons are not shape-classification lessons. Students read the story, draw a model, write equations with a letter for the unknown, critique strategies, and answer in context.',
        modelLabel: 'read -> draw -> write -> critique',
        studentQuestion: 'What is unknown, and what does the letter represent in the story?',
        visual: 'rdw',
        transform: {
          from: 'story quantities',
          action: 'draw a labeled model and write an equation',
          to: 'answer the unknown in context'
        },
        lessonBands: [
          { label: 'Read', lessons: 'L1-L3', start: 1, end: 3, focus: 'identify the knowns, unknown, and question' },
          { label: 'Draw', lessons: 'L1-L3', start: 1, end: 3, focus: 'model the story quantities with labels' },
          { label: 'Critique', lessons: 'L3', start: 3, end: 3, focus: 'compare peer solution strategies' }
        ],
        teacherLookFor: [
          'The letter is defined before solving.',
          'The drawing matches the story quantities.',
          'The answer sentence names the unit and context.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber >= 4 && lessonNumber <= 6) {
      return {
        ...frame,
        title: 'Polygon attributes classify the shape',
        bigIdea: 'These lessons count sides and angles and use attributes such as parallel sides, right angles, and equal sides to classify or draw polygons.',
        modelLabel: 'attributes -> classify -> draw/check',
        studentQuestion: 'Which attributes are required, and where are they visible on the polygon?',
        visual: 'geometry-attributes',
        transform: {
          from: 'source polygon or requested attributes',
          action: 'count sides, angles, parallel sides, and equal sides',
          to: 'classification or constructed polygon'
        },
        lessonBands: [
          { label: 'Quadrilaterals', lessons: 'L4', start: 4, end: 4, focus: 'compare and classify four-sided shapes' },
          { label: 'Polygons', lessons: 'L5', start: 5, end: 5, focus: 'sort other polygons by attributes' },
          { label: 'Construct', lessons: 'L6', start: 6, end: 6, focus: 'draw polygons from specified attributes' }
        ],
        teacherLookFor: [
          'Side and angle counts are explicit.',
          'Parallel, equal, and right-angle evidence is visible.',
          'The classification matches the required attributes.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber >= 7 && lessonNumber <= 9) {
      return {
        ...frame,
        title: 'Polygons compose and decompose into known pieces',
        bigIdea: 'These lessons use tetrominoes and tangrams as manipulatives: students compose shapes, decompose them, and reason about how pieces account for the whole.',
        modelLabel: 'pieces -> compose/decompose -> whole shape',
        studentQuestion: 'Which pieces make the whole, and how can you prove none are missing or overlapping?',
        visual: 'geometry-compose',
        transform: {
          from: 'tetrominoes or tangram pieces',
          action: 'compose and decompose the target shape',
          to: 'whole shape with trackable parts'
        },
        lessonBands: [
          { label: 'Tetrominoes', lessons: 'L7', start: 7, end: 7, focus: 'compose rectangles and squares from pieces' },
          { label: 'Tangram', lessons: 'L8', start: 8, end: 8, focus: 'create and cut the puzzle' },
          { label: 'Reason', lessons: 'L9', start: 9, end: 9, focus: 'explain part-whole relationships' }
        ],
        teacherLookFor: [
          'Each piece used in the composition is visible.',
          'The whole shape is accounted for without gaps or overlaps.',
          'The explanation connects parts to the target whole.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber >= 10 && lessonNumber <= 11) {
      return {
        ...frame,
        title: 'Perimeter traces the outside boundary only',
        bigIdea: 'Lessons 10 and 11 separate perimeter from area: students trace the boundary of a figure and do not count the inside space.',
        modelLabel: 'outside boundary -> trace once -> perimeter',
        studentQuestion: 'Which path is the outside boundary, and where does the trace start and stop?',
        visual: lessonNumber === 11 ? 'perimeter-tessellate' : 'perimeter',
        transform: {
          from: 'plane figure',
          action: 'trace the outside once',
          to: 'perimeter boundary'
        },
        lessonBands: [
          { label: 'Boundary', lessons: 'L10-L11', start: 10, end: 11, focus: 'trace perimeter, not area' },
          { label: 'Area Check', lessons: 'L10-L11', start: 10, end: 11, focus: 'inside space is not perimeter' },
          { label: 'Explain', lessons: 'L10-L11', start: 10, end: 11, focus: 'name why only outside sides count' }
        ],
        teacherLookFor: [
          'Only outside sides are included.',
          'The trace does not cross the inside of the figure.',
          'Area and perimeter are named as different attributes.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber >= 12 && lessonNumber <= 14) {
      return {
        ...frame,
        title: lessonNumber === 14 ? 'Unknown side lengths are inferred before finding perimeter' : 'Side lengths are measured before perimeter is added',
        bigIdea: lessonNumber === 14
          ? 'Lesson 14 uses regular polygons and rectangles: students use equal sides or opposite sides to find unknown lengths before adding perimeter.'
          : 'Lessons 12 and 13 measure each side length in whole-number units, label the sides, and add every outside side once.',
        modelLabel: lessonNumber === 14 ? 'known sides -> infer missing sides -> add perimeter' : 'measure sides -> label lengths -> add perimeter',
        studentQuestion: lessonNumber === 14 ? 'Which sides are equal or opposite, and what length is missing?' : 'What is each side length, and what unit is being used?',
        visual: lessonNumber === 14 ? 'perimeter-unknown' : lessonNumber === 12 ? 'perimeter-side-measure' : 'perimeter-measure',
        transform: {
          from: lessonNumber === 14 ? 'rectangle or regular polygon with blanks' : 'polygon on a ruler/grid',
          action: lessonNumber === 14 ? 'use side relationships to fill missing lengths' : 'measure and label each side',
          to: 'perimeter equation with units'
        },
        lessonBands: [
          { label: 'Measure', lessons: 'L12-L13', start: 12, end: 13, focus: 'whole-number side lengths' },
          { label: 'Infer', lessons: 'L14', start: 14, end: 14, focus: 'missing side lengths from structure' },
          { label: 'Add', lessons: 'L12-L14', start: 12, end: 14, focus: 'sum every outside side once' }
        ],
        teacherLookFor: [
          'Each measured side is labeled with a unit.',
          'Unknown sides are found before the perimeter equation.',
          'The perimeter sum includes each outside side exactly once.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber === 15) {
      return {
        ...frame,
        title: 'Perimeter word problems use a labeled RDW model',
        bigIdea: 'Lesson 15 solves word problems with given side lengths: students read the situation, draw and label the shape, add the relevant sides, and answer with linear units.',
        modelLabel: 'read problem -> draw side labels -> perimeter equation',
        studentQuestion: 'Which sides are given in the story, and how does the drawing show them?',
        visual: 'perimeter-rdw',
        transform: {
          from: 'word problem side lengths',
          action: 'draw and label the perimeter model',
          to: 'sum of outside sides'
        },
        lessonBands: [
          { label: 'Read', lessons: 'L15', start: 15, end: 15, focus: 'identify the given lengths' },
          { label: 'Draw', lessons: 'L15', start: 15, end: 15, focus: 'label the perimeter model' },
          { label: 'Write', lessons: 'L15', start: 15, end: 15, focus: 'equation and answer sentence' }
        ],
        teacherLookFor: [
          'The model is drawn from the story quantities.',
          'Every side in the equation is visible on the drawing.',
          'The answer uses a linear unit.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber === 16) {
      return {
        ...frame,
        title: 'String measures the perimeter of circular objects',
        bigIdea: 'Lesson 16 wraps string around circular objects, straightens the string on a ruler, and rounds the measurement to the nearest quarter inch.',
        modelLabel: 'circle boundary -> string length -> nearest quarter inch',
        studentQuestion: 'Where does the string start and stop, and which ruler interval gives the nearest quarter inch?',
        visual: 'circle-perimeter',
        transform: {
          from: 'circular object boundary',
          action: 'wrap string, straighten it, and read quarter-inch ticks',
          to: 'circle perimeter measurement'
        },
        lessonBands: [
          { label: 'Wrap', lessons: 'L16', start: 16, end: 16, focus: 'string follows the circular boundary once' },
          { label: 'Measure', lessons: 'L16', start: 16, end: 16, focus: 'straight string on quarter-inch ruler' },
          { label: 'Round', lessons: 'L16', start: 16, end: 16, focus: 'nearest quarter inch' }
        ],
        teacherLookFor: [
          'The string follows the whole boundary once.',
          'The straightened string starts at 0 on the ruler.',
          'The answer is rounded to the nearest quarter inch.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber === 17) {
      return {
        ...frame,
        title: 'Unknown measurements are solved before perimeter is found',
        bigIdea: 'Lesson 17 uses all four operations to find missing side lengths in perimeter situations, then checks the final perimeter with the completed drawing.',
        modelLabel: 'known perimeter/parts -> missing side -> complete boundary',
        studentQuestion: 'Which operation finds the missing measurement before the perimeter is checked?',
        visual: 'perimeter-unknown',
        transform: {
          from: 'partly labeled perimeter figure',
          action: 'solve for the missing side length',
          to: 'complete perimeter equation'
        },
        lessonBands: [
          { label: 'Knowns', lessons: 'L17', start: 17, end: 17, focus: 'mark given lengths and total perimeter' },
          { label: 'Unknown', lessons: 'L17', start: 17, end: 17, focus: 'use operations to find missing measurements' },
          { label: 'Check', lessons: 'L17', start: 17, end: 17, focus: 'add completed boundary lengths' }
        ],
        teacherLookFor: [
          'The unknown side is labeled before solving.',
          'The operation matches the relationship in the drawing.',
          'The completed perimeter check uses all outside sides.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber >= 18 && lessonNumber <= 22) {
      return {
        ...frame,
        title: 'Rectangles connect area, perimeter, and line plots',
        bigIdea: 'These lessons build rectangles from unit squares, compare area and perimeter, then record the number of possible rectangles on a line plot.',
        modelLabel: 'unit squares -> rectangles -> perimeter/data',
        studentQuestion: 'How many rectangles can be made, and what perimeter or data value does each produce?',
        visual: lessonNumber === 19 || lessonNumber === 22
          ? 'line-plot'
          : lessonNumber === 18
            ? 'rectangle-unit-squares'
            : 'rectangle-given-perimeter',
        transform: {
          from: 'given unit squares or perimeter',
          action: 'construct all possible rectangles',
          to: 'perimeters, areas, or a line plot'
        },
        lessonBands: [
          { label: 'Construct', lessons: 'L18', start: 18, end: 18, focus: 'same area, different perimeters' },
          { label: 'Plot', lessons: 'L19/L22', start: 19, end: 22, focus: 'record rectangle counts on line plots' },
          { label: 'Constrain', lessons: 'L20-L21', start: 20, end: 21, focus: 'same perimeter, different areas' }
        ],
        teacherLookFor: [
          'Rectangles use the exact number of unit squares or perimeter units.',
          'Dimensions are labeled before area or perimeter is found.',
          'Line-plot Xs represent rectangle counts.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber === 23) {
      return {
        ...frame,
        title: 'Perimeter word problems use RDW plus shape attributes',
        bigIdea: 'Lesson 23 uses word problems such as a regular octagon stop sign with perimeter 48 cm: students must identify the shape attribute, draw or label the model, and solve the unknown side length.',
        modelLabel: 'read problem -> draw shape -> divide perimeter',
        studentQuestion: 'What shape fact is needed before the equation can be written?',
        visual: 'perimeter-rdw',
        transform: {
          from: 'regular octagon perimeter 48 cm',
          action: 'use 8 equal sides and divide',
          to: '48 cm ÷ 8 = 6 cm per side'
        },
        lessonBands: [
          { label: 'Read', lessons: 'L23', start: 23, end: 23, focus: 'identify the perimeter context' },
          { label: 'Draw', lessons: 'L23', start: 23, end: 23, focus: 'model the shape and side relationships' },
          { label: 'Solve', lessons: 'L23', start: 23, end: 23, focus: 'write the equation with units' }
        ],
        teacherLookFor: [
          'The needed shape attribute is named before solving.',
          'The drawing matches the perimeter situation.',
          'The answer names the linear unit in context.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber >= 24 && lessonNumber <= 27) {
      return {
        ...frame,
        title: 'Robot rectangles must satisfy perimeter requirements',
        bigIdea: 'These project lessons use rectangles for robot body parts and environment objects; students choose dimensions, calculate perimeters, compare areas, and evaluate another design.',
        modelLabel: 'perimeter requirement -> rectangle dimensions -> area comparison',
        studentQuestion: 'Which dimensions make the required perimeter, and what area do they produce?',
        visual: 'robot-project',
        transform: {
          from: 'required robot part perimeter',
          action: 'choose width and length, then calculate',
          to: 'rectangle part with perimeter and area evidence'
        },
        lessonBands: [
          { label: 'Plan', lessons: 'L24', start: 24, end: 24, focus: 'choose dimensions from perimeter requirements' },
          { label: 'Draw', lessons: 'L25-L26', start: 25, end: 26, focus: 'build and describe the robot/environment' },
          { label: 'Review', lessons: 'L27', start: 27, end: 27, focus: 'measure and evaluate a peer project' }
        ],
        teacherLookFor: [
          'Each rectangle has width, length, perimeter, and area evidence.',
          'Different areas can share the same perimeter.',
          'Peer review calculations match the measured project.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber >= 28 && lessonNumber <= 30) {
      return {
        ...frame,
        title: 'Area and perimeter word problems use all four operations',
        bigIdea: 'These lessons combine RDW, rectangles, composite figures, area, and perimeter. Students keep area and perimeter distinct while solving multi-step problems.',
        modelLabel: 'read -> draw rectangles -> area/perimeter equations',
        studentQuestion: 'Is the problem asking for area, perimeter, or both?',
        visual: lessonNumber === 30 ? 'strategy-critique' : 'area-decompose',
        transform: {
          from: 'multi-step rectangle situation',
          action: 'draw and label area/perimeter relationships',
          to: 'answer with the correct units'
        },
        lessonBands: [
          { label: 'Area', lessons: 'L28-L29', start: 28, end: 29, focus: 'square units from rows and columns' },
          { label: 'Perimeter', lessons: 'L28-L29', start: 28, end: 29, focus: 'linear units around the boundary' },
          { label: 'Critique', lessons: 'L30', start: 30, end: 30, focus: 'share and revise problem-solving strategies' }
        ],
        teacherLookFor: [
          'Area and perimeter units are not mixed.',
          'Each step in the RDW model is labeled.',
          'Composite figures are decomposed into rectangles when needed.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber >= 31 && lessonNumber <= 32) {
      return {
        ...frame,
        title: 'One-half can look different but must be equal area',
        bigIdea: 'These review lessons explore unconventional one-half representations: students prove that the two parts have equal area even when the shapes look different.',
        modelLabel: 'whole -> two equal areas -> one half',
        studentQuestion: 'How can you prove the two parts have equal area?',
        visual: 'one-half-area',
        transform: {
          from: 'one whole shape',
          action: 'split into two equal-area parts',
          to: 'each part is one half'
        },
        lessonBands: [
          { label: 'Create', lessons: 'L31', start: 31, end: 31, focus: 'unconventional halves' },
          { label: 'Prove', lessons: 'L32', start: 32, end: 32, focus: 'equal-area justification' },
          { label: 'Explain', lessons: 'L31-L32', start: 31, end: 32, focus: 'same whole, two equal parts' }
        ],
        teacherLookFor: [
          'The whole is clear.',
          'Both parts have equal area.',
          'The proof does not rely only on appearance.'
        ]
      };
    }

    if (this.module.id === 'm7' && lessonNumber >= 33 && lessonNumber <= 34) {
      return {
        ...frame,
        title: 'Review work names the model before solving',
        bigIdea: 'These closing lessons solidify Grade 3 fluency by choosing the right model, naming the unit, and explaining the strategy in a resource booklet.',
        modelLabel: 'skill -> model -> explanation',
        studentQuestion: 'Which Grade 3 model proves this answer?',
        visual: 'fluency-book',
        transform: {
          from: 'review task',
          action: 'choose the model and solve',
          to: 'resource-booklet explanation'
        },
        lessonBands: [
          { label: 'Fluency', lessons: 'L33', start: 33, end: 33, focus: 'solidify core Grade 3 skills' },
          { label: 'Resource', lessons: 'L34', start: 34, end: 34, focus: 'create model-based explanations' },
          { label: 'Explain', lessons: 'L33-L34', start: 33, end: 34, focus: 'show strategy, not only answer' }
        ],
        teacherLookFor: [
          'The chosen model matches the problem type.',
          'The unit is named.',
          'The explanation can teach another student.'
        ]
      };
    }

    return frame;
  }

  get moduleConceptFrameIsLessonSpecific(): boolean {
    if (!this.module || !this.lesson) {
      return false;
    }

    const lessonNumber = this.lesson.lessonNumber;
    return (this.module.id === 'm4' && lessonNumber >= 1 && lessonNumber <= 16)
      || (this.module.id === 'm5' && lessonNumber >= 1 && lessonNumber <= 30)
      || (this.module.id === 'm6' && lessonNumber >= 1 && lessonNumber <= 9)
      || (this.module.id === 'm7' && lessonNumber >= 1 && lessonNumber <= 34);
  }

  get moduleConceptFrameEyebrow(): string {
    return this.moduleConceptFrameIsLessonSpecific ? 'Lesson source model' : 'Module big idea';
  }

  moduleConceptBandIsActive(band: ModuleConceptFrame['lessonBands'][number]): boolean {
    const lessonNumber = this.lesson?.lessonNumber ?? 0;
    return lessonNumber >= band.start && lessonNumber <= band.end;
  }

  moduleFrameSlots(count: number, max = 30): number[] {
    return this.countSlots(count, max);
  }

  conceptSourcePageImages(problemLesson: ProblemSetCenteredLesson): string[] {
    return problemLesson.blankSourcePageImages
      ?? problemLesson.sourcePageImages
      ?? problemLesson.solvedSourcePageImages
      ?? [];
  }

  hasConceptSourcePages(problemLesson: ProblemSetCenteredLesson): boolean {
    return this.conceptSourcePageImages(problemLesson).length > 0;
  }

  conceptStudentWorkbookPageImages(): string[] {
    if (!this.module || !this.lesson) {
      return [];
    }
    return STUDENT_WORKBOOK_SOURCE_PAGES[`${this.module.id}-l${this.lesson.lessonNumber}`] ?? [];
  }

  problemSourcePageImages(problem: ProblemSetCenteredProblem): string[] {
    void problem;
    return [];
  }

  hasProblemSourcePages(problem: ProblemSetCenteredProblem): boolean {
    void problem;
    return false;
  }

  problemVisualSpec(problem: ProblemSetCenteredProblem): ProblemVisualSpec | undefined {
    return this.problemSetMode === 'solved' ? problem.solvedVisual : problem.blankVisual;
  }

  isLongProblemPrompt(prompt: string): boolean {
    const mathMarkers = prompt.match(/_{2,}|[=×÷]/g)?.length ?? 0;
    return prompt.length > 150 || mathMarkers > 8;
  }

  problemSetSourcePageHeading(): string {
    return this.problemSetMode === 'solved'
      ? 'Official Teacher Edition solved source'
      : 'Official Teacher Edition Problem Set pages';
  }

  problemSetSourcePageSourceNote(problemLesson: ProblemSetCenteredLesson): string {
    return this.problemSetMode === 'solved'
      ? problemLesson.teacherEditionBasis
      : problemLesson.sourceNote;
  }

  problemSetSourcePageAriaLabel(): string {
    return this.problemSetMode === 'solved'
      ? 'Official Teacher Edition solved Problem Set source pages'
      : 'Official Teacher Edition Problem Set pages';
  }

  lessonPageClasses(): Record<string, boolean> {
    return {
      'lesson-m1-l12': this.module?.id === 'm1' && this.lesson?.lessonNumber === 12,
      'lesson-m2-l1': this.module?.id === 'm2' && this.lesson?.lessonNumber === 1,
      'lesson-m2-l2': this.module?.id === 'm2' && this.lesson?.lessonNumber === 2,
      'lesson-m2-l3': this.module?.id === 'm2' && this.lesson?.lessonNumber === 3,
      'lesson-m2-l6': this.module?.id === 'm2' && this.lesson?.lessonNumber === 6,
      'lesson-m2-l7': this.module?.id === 'm2' && this.lesson?.lessonNumber === 7,
      'lesson-m2-l8': this.module?.id === 'm2' && this.lesson?.lessonNumber === 8,
      'lesson-m2-l9': this.module?.id === 'm2' && this.lesson?.lessonNumber === 9,
      'lesson-m2-l10': this.module?.id === 'm2' && this.lesson?.lessonNumber === 10,
      'lesson-m2-l11': this.module?.id === 'm2' && this.lesson?.lessonNumber === 11,
      'lesson-m2-l12': this.module?.id === 'm2' && this.lesson?.lessonNumber === 12,
      'lesson-m2-l13': this.module?.id === 'm2' && this.lesson?.lessonNumber === 13,
      'lesson-m2-l14': this.module?.id === 'm2' && this.lesson?.lessonNumber === 14,
      'lesson-m2-l15': this.module?.id === 'm2' && this.lesson?.lessonNumber === 15,
      'lesson-m2-l16': this.module?.id === 'm2' && this.lesson?.lessonNumber === 16,
      'lesson-m2-l17': this.module?.id === 'm2' && this.lesson?.lessonNumber === 17,
      'lesson-m2-l18': this.module?.id === 'm2' && this.lesson?.lessonNumber === 18,
      'lesson-m2-l19': this.module?.id === 'm2' && this.lesson?.lessonNumber === 19,
      'lesson-m2-l20': this.module?.id === 'm2' && this.lesson?.lessonNumber === 20,
      'lesson-m2-l21': this.module?.id === 'm2' && this.lesson?.lessonNumber === 21,
      'lesson-m3': this.module?.id === 'm3',
      'lesson-m4': this.module?.id === 'm4',
      'lesson-m5': this.module?.id === 'm5',
      'lesson-m6': this.module?.id === 'm6',
      'lesson-m6-problem-centered': this.module?.id === 'm6',
      'lesson-m7': this.module?.id === 'm7'
    };
  }

  get displaySteps(): LessonStep[] {
    if (!this.lesson) {
      return [];
    }

    const baseSteps = this.activeLessonRuntime?.teacherEditionSteps ?? this.lesson.steps;
    const solveStep: LessonStep = {
      id: 'student-work',
      title: 'Student work: solve the lesson problems',
      shortTitle: 'Solve',
      studentPrompt:
        'This is where the student practices the lesson objective with the student workbook problems, drawings, equations, and explanations.',
      teacherEditionBasis:
        'Use the lesson Problem Set as the main student work. The teacher supports by checking the drawing, equation, answer, and meaning in context.',
      visualModel: this.lesson.visualModels[0] ?? 'equal-groups'
    };
    const existingSolve = baseSteps.some((step) => step.id === solveStep.id || step.shortTitle === solveStep.shortTitle);
    if (existingSolve) {
      return baseSteps;
    }

    const insertIndex = baseSteps.findIndex((step) => step.shortTitle === 'Exit' || step.id.includes('exit'));
    if (insertIndex < 0) {
      return [...baseSteps, solveStep];
    }

    return [
      ...baseSteps.slice(0, insertIndex),
      solveStep,
      ...baseSteps.slice(insertIndex)
    ];
  }

  get hasArrayDecompositionRuntime(): boolean {
    return Boolean(this.activeLessonRuntime?.arrayDecompositionModel);
  }

  get hasSourceWorkspaceRuntime(): boolean {
    return Boolean(this.activeLessonRuntime?.sourceWorkspaceModels);
  }

  get hasSourceVisualRuntime(): boolean {
    return Boolean(this.activeLessonRuntime?.sourceVisualFacts);
  }

  get hasAuthoredSourceFigure(): boolean {
    return this.hasArrayDecompositionRuntime || this.hasSourceVisualRuntime;
  }

  get topicTitle(): string {
    if (!this.module || !this.lesson) {
      return '';
    }
    const topic = this.module.topics.find((item) => item.id === this.lesson?.topicId);
    return topic ? `${topic.label}: ${topic.title}` : '';
  }

  get progressText(): string {
    if (!this.displaySteps.length) {
      return '';
    }
    return `${this.activeStepIndex + 1} of ${this.displaySteps.length}`;
  }

  get estimatedFlow(): string {
    const problemSetLesson = this.problemSetCenteredLesson;
    if (problemSetLesson) {
      return `Concept + ${problemSetLesson.problems.length} solved problems`;
    }
    if (!this.displaySteps.length) {
      return '';
    }
    return `${this.displaySteps.length} small screens`;
  }

  problemTokenSlots(problem: ProblemSetCenteredProblem): number[] {
    return this.countSlots(problem.knownTotal ?? problem.quotient, 24);
  }

  problemGroupSlots(problem: ProblemSetCenteredProblem): number[] {
    const count = problem.animationType === 'grouping-by-size'
      ? problem.quotient
      : problem.knownGroupCount ?? problem.quotient;
    return this.countSlots(count, 12);
  }

  problemGroupItemSlots(problem: ProblemSetCenteredProblem): number[] {
    const count = problem.animationType === 'grouping-by-size'
      ? problem.knownGroupSize ?? 1
      : problem.quotient;
    return this.countSlots(count, 12);
  }

  problemBlankContainerSlots(problem: ProblemSetCenteredProblem): number[] {
    return this.countSlots(problem.knownGroupCount ?? problem.quotient, 12);
  }

  problemBlankUnitSlots(problem: ProblemSetCenteredProblem): number[] {
    return this.countSlots(problem.knownTotal ?? problem.quotient, 24);
  }

  problemTapeParts(problem: ProblemSetCenteredProblem): number[] {
    return this.countSlots(problem.knownGroupCount ?? 2, 8);
  }

  problemTapePartLabel(problem: ProblemSetCenteredProblem): string {
    const partSize = problem.knownGroupSize ?? problem.quotient;
    return `${partSize} ${problem.unitLabel}`;
  }

  problemArrayRows(problem: ProblemSetCenteredProblem): number {
    return Math.max(1, Math.min(problem.knownGroupCount ?? problem.quotient ?? 1, 12));
  }

  problemArrayColumns(problem: ProblemSetCenteredProblem): number {
    return Math.max(1, Math.min(problem.knownGroupSize ?? problem.quotient ?? 1, 12));
  }

  problemArraySlots(problem: ProblemSetCenteredProblem): number[] {
    return this.countSlots(this.problemArrayRows(problem) * this.problemArrayColumns(problem), 80);
  }

  problemDecomposeParts(problem: ProblemSetCenteredProblem): Array<{ rows: number; columns: number; product: number; label: string }> {
    const text = [problem.sourcePrompt, problem.solvedAnswer, ...(problem.equations ?? [])].join(' ');
    const lower = text.toLowerCase();
    const columns = this.problemArrayColumns(problem);

    const unitPartsMatch = text.match(/(\d+)\s+tens?\s*\+\s*(\d+)\s+tens?/i);
    if (unitPartsMatch) {
      return [unitPartsMatch[1], unitPartsMatch[2]].map((value) => {
        const rows = this.toReasonableCount(value, 1);
        const product = rows * 10;
        return { rows, columns: 10, product, label: `${rows} x 10 = ${product}` };
      });
    }

    const sumFactMatch = text.match(/(\d+)\s*[×x]\s*(\d+)\s*=\s*(\d+)\s*([+-])\s*(\d+)/i);
    if (sumFactMatch && sumFactMatch[4] === '+') {
      const factColumns = this.toReasonableCount(sumFactMatch[2], columns);
      const products = [Number.parseInt(sumFactMatch[3] ?? '', 10), Number.parseInt(sumFactMatch[5] ?? '', 10)];
      const parts = products
        .filter((product) => Number.isFinite(product) && product > 0 && product % factColumns === 0)
        .map((product) => {
          const rows = Math.max(1, Math.min(product / factColumns, 12));
          return { rows, columns: factColumns, product, label: `${rows} x ${factColumns} = ${product}` };
        });
      if (parts.length === 2) {
        return parts;
      }
    }

    const explicitParts = (problem.equations ?? [])
      .map((equation) => equation.match(/(\d+)\s*[×x]\s*(\d+)\s*=\s*(\d+)/i))
      .filter((match): match is RegExpMatchArray => Boolean(match))
      .map((match) => {
        const rows = this.toReasonableCount(match[1], this.problemArrayRows(problem));
        const columns = this.toReasonableCount(match[2], this.problemArrayColumns(problem));
        const parsedProduct = Number.parseInt(match[3] ?? '', 10);
        const product = Number.isFinite(parsedProduct) ? parsedProduct : rows * columns;
        return {
          rows,
          columns,
          product,
          label: `${rows} x ${columns} = ${product}`
        };
      })
      .filter((part) => part.rows * part.columns === part.product)
      .slice(0, 2);

    if (explicitParts.length >= 2) {
      return explicitParts;
    }

    if (lower.includes('divided by') || lower.includes('division')) {
      return [];
    }

    const totalRows = this.problemArrayRows(problem);
    const firstRows = Math.max(1, Math.min(totalRows - 1, Math.ceil(totalRows / 2)));
    const secondRows = Math.max(1, totalRows - firstRows);
    return [
      { rows: firstRows, columns, product: firstRows * columns, label: `${firstRows} x ${columns} = ${firstRows * columns}` },
      { rows: secondRows, columns, product: secondRows * columns, label: `${secondRows} x ${columns} = ${secondRows * columns}` }
    ];
  }

  problemDecomposeSlots(part: { rows: number; columns: number }): number[] {
    return this.countSlots(part.rows * part.columns, 80);
  }

  relatedFactKnownSlots(fact: ProblemSetRelatedFact): number[] {
    return this.countSlots(fact.firstPart * fact.groupSize, 80);
  }

  relatedFactExtraSlots(fact: ProblemSetRelatedFact): number[] {
    return this.countSlots(fact.secondPart * fact.groupSize, 80);
  }

  relatedFactRows(fact: ProblemSetRelatedFact): Array<{ row: number; isKnown: boolean; columns: number[] }> {
    return Array.from({ length: fact.totalGroups }, (_, index) => ({
      row: index + 1,
      isKnown: index < fact.firstPart,
      columns: this.countSlots(fact.groupSize, 12)
    }));
  }

  lesson16KnownLine(fact: ProblemSetRelatedFact): string {
    return this.problemSetMode === 'solved'
      ? fact.knownFact
      : fact.label === 'a'
        ? '5 x 4 = 20'
        : '5 x 4 = ____';
  }

  lesson16ExtraLine(fact: ProblemSetRelatedFact): string {
    if (this.problemSetMode === 'solved') {
      return fact.extraFact;
    }
    return fact.label === 'a' || fact.label === 'b'
      ? `${fact.secondPart} x 4 = ____`
      : '____ x 4 = ____';
  }

  lesson16TargetAnswer(fact: ProblemSetRelatedFact): string {
    return this.problemSetMode === 'solved' ? `${fact.targetFact} = ${fact.product}` : `${fact.targetFact} = ____`;
  }

  lesson16EquationBox(fact: ProblemSetRelatedFact): string {
    return this.problemSetMode === 'solved' ? fact.solvedEquation : fact.blankEquation;
  }

  lesson16EquationLines(fact: ProblemSetRelatedFact): string[] {
    if (this.problemSetMode === 'solved') {
      return [
        `${fact.targetFact} = (5 x 4) + (${fact.secondPart} x 4)`,
        `= 20 + ${fact.secondPart * fact.groupSize}`,
        `= ${fact.product}`
      ];
    }

    if (fact.label === 'a') {
      return [
        `${fact.targetFact} = (5 x 4) + (1 x 4)`,
        '= 20 + ______',
        '= ______'
      ];
    }

    if (fact.label === 'b') {
      return [
        `${fact.targetFact} = (5 x 4) + (2 x 4)`,
        '= ______ + ______',
        '= 28'
      ];
    }

    return [
      `${fact.targetFact} = (5 x 4) + (____ x 4)`,
      '= ______ + ______',
      '= ______'
    ];
  }

  lesson16CloudFacts(problem: ProblemSetCenteredProblem): ProblemSetRelatedFact[] {
    const facts = problem.relatedFacts ?? [];
    return [facts[2], facts[0], facts[3], facts[1]].filter((fact): fact is ProblemSetRelatedFact => Boolean(fact));
  }

  lesson16BalloonFacts(problem: ProblemSetCenteredProblem): ProblemSetRelatedFact[] {
    const facts = problem.relatedFacts ?? [];
    return [facts[3], facts[2], facts[0], facts[1]].filter((fact): fact is ProblemSetRelatedFact => Boolean(fact));
  }

  lesson17FactRows(): number[] {
    return this.countSlots(10, 10);
  }

  lesson17FactColumns(): number[] {
    return this.countSlots(4, 4);
  }

  lesson17Butterflies(): number[] {
    return this.countSlots(40, 40);
  }

  lesson17MultiplicationLine(row: number): string {
    if (this.problemSetMode === 'solved') {
      return `${row} x 4 = ${row * 4}`;
    }

    if (row === 1) {
      return '1 x 4 = 4';
    }
    if (row === 2) {
      return '2 x 4 = ______';
    }
    if (row === 3 || row === 4) {
      return `______ x 4 = ${row * 4}`;
    }
    if (row === 5 || row === 6) {
      return `______ x ______ = ${row * 4}`;
    }
    if (row === 7 || row === 8) {
      return `______ x 4 = ______`;
    }
    return `______ x ______ = ______`;
  }

  lesson17DivisionLine(row: number): string {
    if (this.problemSetMode === 'solved') {
      return `${row * 4} divided by 4 = ${row}`;
    }

    if (row === 1) {
      return '4 divided by 4 = 1';
    }
    if (row === 2) {
      return '______ divided by 4 = 2';
    }
    if (row === 3 || row === 4) {
      return `${row * 4} divided by 4 = ______`;
    }
    if (row === 5 || row === 6) {
      return `${row * 4} divided by ______ = ______`;
    }
    if (row === 7 || row === 8) {
      return `______ divided by 4 = ______`;
    }
    return `______ divided by ______ = ______`;
  }

  lesson17TapeBoxes(): number[] {
    return this.countSlots(9, 9);
  }

  lesson17RowsOfGlasses(): number[] {
    return this.countSlots(4, 4);
  }

  lesson17GlassesPerRow(): number[] {
    return this.countSlots(8, 8);
  }

  lesson17NotebookUnits(): number[] {
    return this.countSlots(4, 4);
  }

  lesson19Problem1Parts(): Array<{
    label: string;
    total: number;
    divisor: number;
    columns: number;
    topRows: number;
    bottomRows: number;
    topDividend: number;
    bottomDividend: number;
    topQuotient: number;
    bottomQuotient: number;
    quotient: number;
  }> {
    return [
      { label: 'a', total: 36, divisor: 3, columns: 3, topRows: 10, bottomRows: 2, topDividend: 30, bottomDividend: 6, topQuotient: 10, bottomQuotient: 2, quotient: 12 },
      { label: 'b', total: 25, divisor: 5, columns: 5, topRows: 4, bottomRows: 1, topDividend: 20, bottomDividend: 5, topQuotient: 4, bottomQuotient: 1, quotient: 5 },
      { label: 'c', total: 28, divisor: 4, columns: 4, topRows: 5, bottomRows: 2, topDividend: 20, bottomDividend: 8, topQuotient: 5, bottomQuotient: 2, quotient: 7 },
      { label: 'd', total: 32, divisor: 4, columns: 4, topRows: 5, bottomRows: 3, topDividend: 20, bottomDividend: 12, topQuotient: 5, bottomQuotient: 3, quotient: 8 }
    ];
  }

  lesson19ArrayCells(part: { topRows: number; bottomRows: number; columns: number }): number[] {
    return this.countSlots((part.topRows + part.bottomRows) * part.columns, 80);
  }

  lesson19IsSplitCell(part: { topRows: number; columns: number }, cellIndex: number): boolean {
    return Math.floor(cellIndex / part.columns) === part.topRows;
  }

  lesson19Problem2Matches(): Array<{ bucket: string; ball: string; answer: string; order: string }> {
    return [
      { bucket: '24 ÷ 2', ball: '(20 ÷ 2) + (4 ÷ 2)', answer: '12', order: '1st bucket -> 4th ball' },
      { bucket: '36 ÷ 3', ball: '(30 ÷ 3) + (6 ÷ 3)', answer: '12', order: '2nd bucket -> 1st ball' },
      { bucket: '39 ÷ 3', ball: '(30 ÷ 3) + (9 ÷ 3)', answer: '13', order: '3rd bucket -> 2nd ball' },
      { bucket: '26 ÷ 2', ball: '(20 ÷ 2) + (6 ÷ 2)', answer: '13', order: '4th bucket -> 3rd ball' }
    ];
  }

  lesson19NellCells(): number[] {
    return this.countSlots(24, 24);
  }

  lesson19NellIsSplitCell(cellIndex: number): boolean {
    return Math.floor(cellIndex / 2) === 6;
  }

  areaModelSlots(areaModel: { rows: number; columns: number }): number[] {
    return this.countSlots(areaModel.rows * areaModel.columns, 120);
  }

  patternBlockSlots(count: number): number[] {
    return this.countSlots(count, 24);
  }

  problemFractionPartSlots(problem: ProblemSetCenteredProblem): number[] {
    return this.countSlots(problem.knownGroupCount ?? problem.knownGroupSize ?? 4, 12);
  }

  fractionModelPartSlots(model: ProblemSetFractionModel): number[] {
    return this.countSlots(model.denominator, 12);
  }

  fractionModelLabel(model: ProblemSetFractionModel): string {
    return `${model.numerator}/${model.denominator}`;
  }

  problemFractionShadedCount(problem: ProblemSetCenteredProblem): number {
    return Math.max(0, Math.min(problem.quotient ?? 1, this.problemFractionPartSlots(problem).length));
  }

  concreteFractionModel(problem: ProblemSetCenteredProblem): ProblemSetConcreteFractionModel | undefined {
    return problem.concreteFractionModel;
  }

  concreteFractionItems(problem: ProblemSetCenteredProblem): ProblemSetConcreteFractionItem[] {
    return this.concreteFractionModel(problem)?.items ?? [];
  }

  concreteFractionSegments(item: ProblemSetConcreteFractionItem): number[] {
    return this.countSlots(item.denominator ?? item.blankDenominator ?? 1, 24);
  }

  concreteFractionLineGuides(item: ProblemSetConcreteFractionItem): Array<{ index: number; left: number }> {
    const visibleLineCount = this.problemSetMode === 'blank'
      ? item.blankLineCount ?? item.lineCount
      : item.lineCount;
    const lineCount = Math.max(0, Math.min(visibleLineCount ?? Math.max((item.denominator ?? 1) - 1, 0), 24));
    const denominator = Math.max(1, item.denominator ?? lineCount + 1);
    return Array.from({ length: lineCount }, (_, index) => ({
      index,
      left: ((index + 1) / denominator) * 100
    }));
  }

  concreteFractionVisibleNumerator(item: ProblemSetConcreteFractionItem): number {
    const fallback = item.numerator ?? 0;
    return this.problemSetMode === 'blank'
      ? Math.max(0, item.blankNumerator ?? fallback)
      : Math.max(0, fallback);
  }

  concreteFractionVisibleDenominator(item: ProblemSetConcreteFractionItem): number {
    const fallback = item.denominator ?? 1;
    return Math.max(1, this.problemSetMode === 'blank'
      ? item.blankDenominator ?? fallback
      : fallback);
  }

  concreteFractionFillPercent(item: ProblemSetConcreteFractionItem): number {
    const numerator = this.concreteFractionVisibleNumerator(item);
    const denominator = this.concreteFractionVisibleDenominator(item);
    return Math.max(0, Math.min((numerator / denominator) * 100, 100));
  }

  concreteFractionAnswer(item: ProblemSetConcreteFractionItem): string {
    const numerator = item.numerator ?? 0;
    const denominator = Math.max(1, item.denominator ?? 1);
    return `${numerator}/${denominator}`;
  }

  measuredStripParts(problem: ProblemSetCenteredProblem): number[] {
    const model = this.concreteFractionModel(problem);
    const totalLength = Math.max(1, model?.totalLength ?? 1);
    const pieceLength = Math.max(1, model?.pieceLength ?? totalLength);
    const parts = Math.max(1, Math.min(Math.round(totalLength / pieceLength), 24));
    return Array.from({ length: parts }, (_, index) => index);
  }

  measuredStripTicks(problem: ProblemSetCenteredProblem): number[] {
    const totalLength = Math.max(1, Math.min(this.concreteFractionModel(problem)?.totalLength ?? 12, 24));
    return Array.from({ length: totalLength + 1 }, (_, index) => index);
  }

  measuredStripGuides(problem: ProblemSetCenteredProblem): Array<{ index: number; left: number; label: string }> {
    const model = this.concreteFractionModel(problem);
    const totalLength = Math.max(1, model?.totalLength ?? 1);
    const pieceLength = Math.max(1, model?.pieceLength ?? totalLength);
    const parts = Math.max(1, Math.min(Math.round(totalLength / pieceLength), 24));
    if (this.problemSetMode === 'blank') {
      return [
        { index: 0, left: 0, label: '0' },
        { index: parts, left: 100, label: `${totalLength}` }
      ];
    }
    return Array.from({ length: parts + 1 }, (_, index) => ({
      index,
      left: (index / parts) * 100,
      label: index === parts ? `${totalLength}` : `${index * pieceLength}`
    }));
  }

  problemNumberLineTicks(problem: ProblemSetCenteredProblem): number[] {
    const intervalCount = Math.max(1, Math.min(problem.knownGroupCount ?? problem.knownGroupSize ?? 4, 12));
    return Array.from({ length: intervalCount + 1 }, (_, index) => index);
  }

  numberLineModelTicks(model: ProblemSetNumberLineModel): number[] {
    if (model.tickLabels?.length) {
      return Array.from({ length: Math.min(model.tickLabels.length, 13) }, (_, index) => index);
    }
    const intervalCount = Math.max(1, Math.min(model.denominator, 12));
    return Array.from({ length: intervalCount + 1 }, (_, index) => index);
  }

  numberLineModelTarget(model: ProblemSetNumberLineModel, tickIndex: number): boolean {
    return model.targetNumerators?.includes(tickIndex) ?? tickIndex === model.denominator;
  }

  numberLineModelLabel(model: ProblemSetNumberLineModel, tickIndex: number): string {
    const tickLabel = model.tickLabels?.[tickIndex];
    if (tickLabel) {
      return tickLabel;
    }
    if (tickIndex === 0) {
      return model.startLabel ?? `0/${model.denominator}`;
    }
    if (tickIndex === model.denominator) {
      return model.endLabel ?? `${model.denominator}/${model.denominator}`;
    }
    return `${tickIndex}/${model.denominator}`;
  }

  paperPartitionModel(problem: ProblemSetCenteredProblem): ProblemSetPaperPartitionModel | undefined {
    return problem.paperPartitionModel;
  }

  paperPartitionSpaceTicks(problem: ProblemSetCenteredProblem): number[] {
    const model = this.paperPartitionModel(problem);
    const totalSpaces = Math.max(1, Math.min((model?.paperSpacesPerUnit ?? 5) * (model?.denominator ?? 3), 60));
    return Array.from({ length: totalSpaces + 1 }, (_, index) => index);
  }

  paperPartitionGuides(problem: ProblemSetCenteredProblem): Array<{ index: number; label: string; left: number }> {
    const denominator = Math.max(1, Math.min(this.paperPartitionModel(problem)?.denominator ?? 3, 12));
    return Array.from({ length: denominator + 1 }, (_, index) => ({
      index,
      label: this.paperPartitionLabel(index, denominator),
      left: denominator === 0 ? 0 : (index / denominator) * 100
    }));
  }

  paperPartitionInteriorGuides(problem: ProblemSetCenteredProblem): Array<{ index: number; label: string; left: number }> {
    return this.paperPartitionGuides(problem).filter((guide) => guide.index > 0 && guide.index < (this.paperPartitionModel(problem)?.denominator ?? 3));
  }

  paperPartitionChallengeUnits(problem: ProblemSetCenteredProblem): string[] {
    return this.paperPartitionModel(problem)?.challengeUnits ?? [];
  }

  problemLessonUsesTeacherActivity(problemLesson: ProblemSetCenteredLesson): boolean {
    return problemLesson.problems.some((problem) => !!problem.paperPartitionModel);
  }

  private paperPartitionLabel(index: number, denominator: number): string {
    if (index === 0) {
      return '0';
    }
    if (index === denominator) {
      return '1';
    }
    return `${index}/${denominator}`;
  }

  problemNumberLineLabel(problem: ProblemSetCenteredProblem, tickIndex: number): string {
    const denominator = Math.max(1, Math.min(problem.knownGroupCount ?? problem.knownGroupSize ?? 4, 12));
    if (tickIndex === 0) {
      return '0';
    }
    if (tickIndex === denominator) {
      return '1';
    }
    return `${tickIndex}/${denominator}`;
  }

  activeProblemDisplay(problem: ProblemSetCenteredProblem): ProblemSetDataDisplay | undefined {
    return this.problemSetMode === 'solved'
      ? problem.solvedDataDisplay ?? problem.dataDisplay
      : problem.dataDisplay;
  }

  displayCategories(display?: ProblemSetDataDisplay): string[] {
    if (!display) {
      return [];
    }
    return display.categories ?? display.values?.map((item) => item.label) ?? display.ticks ?? [];
  }

  displayValues(display?: ProblemSetDataDisplay): DataDisplayPoint[] {
    return display?.values ?? [];
  }

  displayRows(display?: ProblemSetDataDisplay): string[][] {
    return display?.rows ?? [];
  }

  displayColumns(display?: ProblemSetDataDisplay): string[] {
    return display?.columns ?? [];
  }

  displayTicks(display?: ProblemSetDataDisplay): string[] {
    return display?.ticks ?? [];
  }

  displaySourceData(display?: ProblemSetDataDisplay): string[] {
    return display?.sourceData ?? [];
  }

  displaySourceDataRows(display?: ProblemSetDataDisplay): string[][] {
    return display?.sourceDataRows ?? [];
  }

  displayMaxValue(display?: ProblemSetDataDisplay): number {
    if (display?.maxValue) {
      return display.maxValue;
    }
    const values = display?.values?.map((item) => item.value ?? 0) ?? [1];
    return Math.max(1, ...values);
  }

  displayBarPercent(display: ProblemSetDataDisplay | undefined, value?: number): number {
    if (value === undefined || !display) {
      return 0;
    }
    return Math.max(0, Math.min(100, (value / this.displayMaxValue(display)) * 100));
  }

  displayCountSlots(count?: number): number[] {
    if (!count || count <= 0) {
      return [];
    }
    return this.countSlots(count, 24);
  }

  displayBlankLinePlotSlots(item: DataDisplayPoint, display?: ProblemSetDataDisplay): number[] {
    if (!display?.showBlankValues) {
      return [];
    }
    return this.displayCountSlots(item.value);
  }

  displayPictureSymbols(item: DataDisplayPoint, display?: ProblemSetDataDisplay): number[] {
    const unitSize = display?.unitSize ?? 1;
    const value = item.value ?? 0;
    const symbolCount = Math.round(value / unitSize);
    if (symbolCount <= 0) {
      return [];
    }
    return this.countSlots(symbolCount, 24);
  }

  displayVerticalUnits(item: DataDisplayPoint, display?: ProblemSetDataDisplay): number[] {
    const unitSize = display?.unitSize ?? 1;
    const value = item.value ?? 0;
    const unitCount = Math.round(value / unitSize);
    if (unitCount <= 0) {
      return [];
    }
    return this.countSlots(unitCount, 16);
  }

  problemShareLabel(problem: ProblemSetCenteredProblem, index: number): string {
    return problem.shareLabels?.[index] ?? `${problem.groupLabel.slice(0, -1) || 'part'} ${index + 1}`;
  }

  problemSectionId(section: ProblemSection): string {
    const moduleId = this.module?.id ?? 'module';
    const lessonNumber = this.lesson?.lessonNumber ?? 0;
    return `${moduleId}-l${lessonNumber}-${section}`;
  }

  problemDomId(problemNumber: number): string {
    const moduleId = this.module?.id ?? 'module';
    const lessonNumber = this.lesson?.lessonNumber ?? 0;
    return `${moduleId}-l${lessonNumber}-problem-${problemNumber}`;
  }

  problemHref(problemNumber: number): string {
    const moduleId = this.module?.id ?? 'module';
    const lessonNumber = this.lesson?.lessonNumber ?? 0;
    return `/ruchika-grade3/modules/${moduleId}/lessons/${lessonNumber}/problem-set/${this.problemSetMode}#${this.problemDomId(problemNumber)}`;
  }

  showProblemSection(section: ProblemSection): void {
    this.activeProblemSection = section;
    const mode = section === 'problem-set' ? this.problemSetMode : undefined;
    void this.navigateToProblemSection(section, mode);
  }

  setProblemSetMode(mode: ProblemSetMode): void {
    this.activeProblemSection = 'problem-set';
    this.problemSetMode = mode;
    void this.navigateToProblemSection('problem-set', mode);
  }

  private problemSectionFromRoute(section: string | null, mode: string | null): ProblemSection {
    if (mode) {
      return 'problem-set';
    }

    if (section === 'problem-set' || section === 'summary') {
      return section;
    }

    return 'concept';
  }

  private problemSetModeFromRoute(mode: string | null): ProblemSetMode {
    return mode === 'solved' ? 'solved' : 'blank';
  }

  private navigateToProblemSection(section: ProblemSection, mode?: ProblemSetMode): Promise<boolean> {
    if (!this.module || !this.lesson) {
      return Promise.resolve(false);
    }

    const commands: Array<string | number> = [
      '/ruchika-grade3',
      'modules',
      this.module.id,
      'lessons',
      this.lesson.lessonNumber,
      section
    ];

    if (section === 'problem-set') {
      commands.push(mode ?? this.problemSetMode);
    }

    return this.router.navigate(commands);
  }

  scrollToProblem(problemNumber: number, event?: Event): void {
    event?.preventDefault();
    const target = document.getElementById(this.problemDomId(problemNumber));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  get conceptExplanations(): ConceptExplanation[] {
    const terms = this.lessonConceptFocusTerms();
    if (!terms.length) {
      return [];
    }

    return terms
      .map((term) => this.conceptGlossary[term])
      .filter((concept): concept is ConceptExplanation => Boolean(concept))
      .slice(0, 4);
  }

  get showConceptFirstPanel(): boolean {
    return this.activeStepIndex === 0 && this.conceptExplanations.length > 0;
  }

  get showMultiplicationDivisionVocabularyNote(): boolean {
    return Boolean(this.activeLessonRuntime?.showMultiplicationDivisionVocabularyNote);
  }

  get lessonAnimation(): LessonAnimationModel | undefined {
    return this.activeLessonRuntime?.lessonAnimation;
  }

  get lessonAnimationGroups(): number[] {
    return Array.from({ length: Math.min(this.lessonAnimation?.groupCount ?? 0, 10) }, (_, index) => index + 1);
  }

  get lessonAnimationGroupItems(): number[] {
    return Array.from({ length: Math.min(this.lessonAnimation?.groupSize ?? 0, 10) }, (_, index) => index + 1);
  }

  get lessonAnimationArrayDots(): number[] {
    const animation = this.lessonAnimation;
    const dotCount = Math.min((animation?.rowCount ?? 0) * (animation?.columnCount ?? 0), 80);
    return Array.from({ length: dotCount }, (_, index) => index + 1);
  }

  get lessonAnimationTapeParts(): number[] {
    return Array.from({ length: Math.min(this.lessonAnimation?.tapePartCount ?? 0, 10) }, (_, index) => index + 1);
  }

  get lessonAnimationNumberLineLabels(): string[] {
    return this.lessonAnimation?.numberLineLabels ?? ['0', 'halfway', 'target'];
  }

  get lessonAnimationNumberLineJumps(): string[] {
    return this.lessonAnimation?.numberLineJumps ?? [];
  }

  get lessonAnimationClockLabels(): string[] {
    return this.lessonAnimation?.clockLabels ?? ['start', 'elapsed', 'end'];
  }

  get lessonAnimationMeasurementTicks(): string[] {
    return this.lessonAnimation?.measurementTicks ?? ['0', '1', '2', '3', '4', '5'];
  }

  lessonAnimationPlaceValueDisks(count: number, max = 9): number[] {
    return Array.from({ length: Math.max(0, Math.min(Math.round(count), max)) }, (_, index) => index + 1);
  }

  get lessonAnimationAreaTiles(): number[] {
    const animation = this.lessonAnimation;
    const rows = animation?.areaRows ?? animation?.rowCount ?? 0;
    const columns = animation?.areaColumns ?? animation?.columnCount ?? 0;
    return Array.from({ length: Math.min(rows * columns, 80) }, (_, index) => index + 1);
  }

  get lessonAnimationFractionParts(): number[] {
    return Array.from({ length: Math.min(this.lessonAnimation?.fractionPartCount ?? 0, 12) }, (_, index) => index + 1);
  }

  get lessonAnimationGraphBars(): { label: string; value: number }[] {
    return this.lessonAnimation?.graphBars ?? [];
  }

  get lessonAnimationGeometryLabels(): string[] {
    return this.lessonAnimation?.geometryLabels ?? [];
  }

  lessonAnimationGraphBarHeight(value: number): number {
    const max = Math.max(...this.lessonAnimationGraphBars.map((bar) => bar.value), 1);
    return Math.round(scaleLinear().domain([0, max]).range([18, 96]).clamp(true)(value));
  }

  lessonAnimationDotClass(dotIndex: number): Record<string, boolean> {
    const animation = this.lessonAnimation;
    if (!animation?.firstPart || !animation.columnCount) {
      return {};
    }

    const rowNumber = Math.floor(dotIndex / animation.columnCount) + 1;
    return {
      'is-first-part': rowNumber <= animation.firstPart,
      'is-second-part': rowNumber > animation.firstPart
    };
  }

  get arrayDecompositionExamples(): ArrayDecompositionExample[] {
    if (!this.module || !this.lesson || this.activeStep?.id !== 'student-work') {
      return [];
    }

    return (this.activeLessonRuntime?.arrayDecompositionExamples ?? []).map((example) =>
      this.makeArrayDecompositionExample(example)
    );
  }

  get arrayDecompositionSourceExample(): ArrayDecompositionExample {
    return this.makeArrayDecompositionExample(
      this.activeLessonRuntime?.arrayDecompositionModel ?? {
        title: '',
        totalGroups: 1,
        groupSize: 1,
        firstPart: 1,
        secondPart: 0,
        context: '',
        equation: '',
        teacherPrompt: ''
      }
    );
  }

  get runtimeSourceRows(): InfoRow[] {
    const stepId = this.activeStep?.id ?? '';
    const byStep = this.activeLessonRuntime?.sourceRows ?? {};
    return byStep[stepId] ?? byStep['source-summary'] ?? [];
  }

  private lessonConceptFocusTerms(): string[] {
    if (!this.module || !this.lesson || this.activeStepIndex !== 0) {
      return [];
    }

    return this.activeLessonRuntime?.conceptTerms ?? [];
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

  get studentWorkProblems(): StudentWorkProblem[] {
    if (!this.lesson || !this.module) {
      return [];
    }

    const lessonKey = `${this.module.id}-l${this.lesson.lessonNumber}`;
    const source = STUDENT_WORK_SOURCE[lessonKey];
    const representation = this.studentWorkRepresentation();

    if (source) {
      return source.problems.map((problem) => this.buildStudentWorkProblem(problem, source.problems, source.studentWorkbookSource));
    }

    const note = LESSON_SOURCE_NOTES[lessonKey];
    const modelName = this.studentWorkModelName();
    const sourcePrompt = this.trimStudentPrompt(
      note?.sourceProblem,
      `Use the Lesson ${this.lesson.lessonNumber} Problem Set to solve a problem tied to this objective: ${this.lesson.objective}`
    );
    const teacherMove = this.trimStudentPrompt(
      note?.teacherMove,
      'Explain how the model, equation, and answer match the problem situation.'
    );
    const exitEvidence = this.trimStudentPrompt(
      note?.exitEvidence,
      'Use the exit-ticket pattern to check whether the student can solve and explain independently.'
    );

    return [
      {
        number: 1,
        prompt: sourcePrompt,
        equations: [],
        answer: '',
        showAnswer: false,
        showModelPreview: false,
        representation,
        teacherLookFor: 'The student identifies the known quantities, the unknown, and the question before solving.',
        sourceLabel: 'Teacher Edition source note',
        visual: this.studentWorkVisualFacts(sourcePrompt, [])
      },
      {
        number: 2,
        prompt: `Draw or label the ${modelName} for the lesson objective: ${this.lesson.objective}`,
        equations: [],
        answer: '',
        showAnswer: false,
        showModelPreview: false,
        representation,
        teacherLookFor: this.studentWorkModelCheck(),
        sourceLabel: 'Teacher Edition source note',
        visual: this.studentWorkVisualFacts(this.lesson.objective, [])
      },
      {
        number: 3,
        prompt: teacherMove,
        equations: [],
        answer: '',
        showAnswer: false,
        showModelPreview: false,
        representation,
        teacherLookFor: 'The student connects each number, label, interval, mark, side length, part, or data value to the model.',
        sourceLabel: 'Teacher Edition source note',
        visual: this.studentWorkVisualFacts(teacherMove, [])
      },
      {
        number: 4,
        prompt: exitEvidence,
        equations: [],
        answer: '',
        showAnswer: false,
        showModelPreview: false,
        representation,
        teacherLookFor: 'Do not count a bare numerical answer as enough; require a model and explanation.',
        sourceLabel: 'Teacher Edition source note',
        visual: this.studentWorkVisualFacts(exitEvidence, [])
      }
    ];
  }

  private buildStudentWorkProblem(
    problem: StudentWorkSourceProblem,
    allProblems: StudentWorkSourceProblem[],
    sourceLabel: string
  ): StudentWorkProblem {
    const equations = this.studentWorkProblemEquations(problem, allProblems);
    const support = this.studentWorkProblemSupport(problem.number);
    return {
      number: problem.number,
      prompt: problem.prompt,
      equations,
      answer: support?.answer ?? '',
      showAnswer: Boolean(support) && !this.hasSourceWorkspaceRuntime,
      showModelPreview: Boolean(support) && !this.hasSourceWorkspaceRuntime,
      representation: this.studentWorkRepresentation(),
      teacherLookFor: support?.teacherLookFor ?? 'Use the workbook prompt as the source of truth. Check the student drawing, labels, equation if provided, and explanation against the source page.',
      sourceLabel,
      visual: this.studentWorkVisualFacts(problem.prompt, equations)
    };
  }

  private studentWorkProblemSupport(problemNumber: number): Pick<StudentWorkProblem, 'answer' | 'teacherLookFor'> | undefined {
    return this.activeLessonRuntime?.studentWorkSupport?.[problemNumber];
  }

  private makeArrayDecompositionExample(
    example: Omit<ArrayDecompositionExample, 'rows' | 'columns'>
  ): ArrayDecompositionExample {
    return {
      ...example,
      rows: this.countSlots(example.totalGroups, 12),
      columns: this.countSlots(example.groupSize, 12)
    };
  }

  private studentWorkProblemEquations(problem: StudentWorkSourceProblem, allProblems: StudentWorkSourceProblem[]): string[] {
    const runtimeEquations = this.activeLessonRuntime?.studentWorkEquations?.[problem.number];
    if (runtimeEquations !== undefined) {
      return runtimeEquations;
    }

    if (problem.equations.length) {
      return problem.equations;
    }

    const referenceMatch = problem.prompt.match(/\bProblem\s+(\d+)\b/i);
    const referencedProblem = referenceMatch
      ? allProblems.find((item) => item.number === Number(referenceMatch[1]))
      : undefined;
    if (referencedProblem?.equations.length) {
      return referencedProblem.equations;
    }

    return [];
  }

  sourceWorkspaceModel(problem: StudentWorkProblem): SourceWorkspaceModel | undefined {
    return this.activeLessonRuntime?.sourceWorkspaceModels?.[problem.number];
  }

  sourceWorkspaceTapeParts(model: SourceWorkspaceModel): number[] {
    return this.countSlots(model.tapePartCount ?? 1, 12);
  }

  sourceWorkspaceFirstUnitItems(model: SourceWorkspaceModel): number[] {
    return this.countSlots(model.firstUnitItemCount ?? 1, 8);
  }

  studentGroupSlots(problem: StudentWorkProblem): number[] {
    return this.countSlots(problem.visual.groupCount, 12);
  }

  studentGroupItemSlots(problem: StudentWorkProblem): number[] {
    return this.countSlots(problem.visual.groupSize, 12);
  }

  studentArrayDots(problem: StudentWorkProblem): number[] {
    return this.countSlots(problem.visual.dotCount, 64);
  }

  studentTapeParts(problem: StudentWorkProblem): number[] {
    return this.countSlots(problem.visual.tapePartCount, 12);
  }

  studentFractionParts(problem: StudentWorkProblem): number[] {
    return this.countSlots(problem.visual.fractionPartCount, 12);
  }

  private studentWorkVisualFacts(prompt: string, equations: string[]): StudentWorkVisualFacts {
    const text = `${prompt} ${equations.join(' ')}`.replace(/\s+/g, ' ').trim();
    const rowsOfMatch = text.match(/(\d+)\s+rows?\s+of\s+(\d+)/i);
    const rowsColumnsMatch = text.match(/(\d+)\s+rows?\s+(?:and|by)\s+(\d+)\s+columns?/i);
    const groupsOfMatch = text.match(/(\d+)\s+(?:equal\s+)?groups?\s+of\s+(\d+)/i);
    const equalGroupsMatch = text.match(/(\d+)\s+equal\s+groups?/i);
    const divisionMatch = text.match(/(\d+)\s*÷\s*(\d+)\s*=\s*(?:_{2,}|\?|\d+)/);
    const multiplicationFacts = this.multiplicationFactsFromText(text);

    const explicitRows = rowsOfMatch?.[1] ?? rowsColumnsMatch?.[1];
    const explicitColumns = rowsOfMatch?.[2] ?? rowsColumnsMatch?.[2];
    const equationFact = multiplicationFacts[0];
    const total = equationFact?.total ?? (divisionMatch ? Number(divisionMatch[1]) : undefined);
    const divisor = divisionMatch ? Number(divisionMatch[2]) : undefined;

    let rowCount = this.toReasonableCount(explicitRows, 0);
    let columnCount = this.toReasonableCount(explicitColumns, 0);

    if ((!rowCount || !columnCount) && equationFact) {
      rowCount = equationFact.rows;
      columnCount = equationFact.columns;
    }

    if ((!rowCount || !columnCount) && total && divisor && total % divisor === 0) {
      rowCount = total / divisor;
      columnCount = divisor;
    }

    if (!rowCount || !columnCount) {
      rowCount = 3;
      columnCount = 4;
    }

    const explicitGroupCount = groupsOfMatch?.[1] ?? equalGroupsMatch?.[1];
    const explicitGroupSize = groupsOfMatch?.[2];
    const groupCount = this.toReasonableCount(explicitGroupCount, rowCount);
    const groupSize = this.toReasonableCount(explicitGroupSize, columnCount);
    const dotCount = Math.min(rowCount * columnCount, 64);
    const tapePartCount = Math.max(1, Math.min(groupCount, 12));
    const tapePartLabel = String(groupSize);
    const tapeWholeLabel = total ? String(total) : 'whole';

    return {
      groupCount,
      groupSize,
      rowCount,
      columnCount,
      dotCount,
      tapePartCount,
      tapePartLabel,
      tapeWholeLabel,
      tapeCaption: `${rowCount} rows of ${columnCount}`,
      fractionPartCount: Math.max(2, Math.min(columnCount, 12)),
      fractionShadedCount: Math.max(1, Math.min(rowCount, Math.max(2, Math.min(columnCount, 12)))),
      graphHeights: [groupSize, rowCount, columnCount].map((value) => Math.max(24, Math.min(value * 10, 76)))
    };
  }

  private multiplicationFactsFromText(text: string): Array<{ rows: number; columns: number; total?: number }> {
    const facts: Array<{ rows: number; columns: number; total?: number }> = [];
    const token = '(\\d+|_{2,}|\\?)';
    const pattern = new RegExp(`${token}\\s*[×x]\\s*${token}\\s*=\\s*(\\d+)`, 'gi');
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      const first = this.parseKnownNumber(match[1]);
      const second = this.parseKnownNumber(match[2]);
      const total = Number(match[3]);
      if (first && second) {
        if (first * second === total) {
          facts.push({ rows: first, columns: second, total });
        }
        continue;
      }
      if (first && total % first === 0) {
        facts.push({ rows: first, columns: total / first, total });
        continue;
      }
      if (second && total % second === 0) {
        facts.push({ rows: total / second, columns: second, total });
      }
    }
    const expressionPattern = /(\d+)\s*[×x]\s*(\d+)/gi;
    while ((match = expressionPattern.exec(text)) !== null) {
      const rows = Number(match[1]);
      const columns = Number(match[2]);
      if (!facts.some((fact) => fact.rows === rows && fact.columns === columns)) {
        facts.push({ rows, columns, total: rows * columns });
      }
    }
    return facts.map((fact) => ({
      rows: this.toReasonableCount(String(fact.rows), 3),
      columns: this.toReasonableCount(String(fact.columns), 4),
      total: fact.total
    }));
  }

  private parseKnownNumber(value: string): number | undefined {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
  }

  private countSlots(count: number, max: number): number[] {
    return Array.from({ length: Math.max(1, Math.min(count, max)) }, (_, index) => index + 1);
  }

  get studentWorkSource(): StudentWorkLessonSource | undefined {
    if (!this.lesson || !this.module) {
      return undefined;
    }
    return STUDENT_WORK_SOURCE[`${this.module.id}-l${this.lesson.lessonNumber}`];
  }

  private trimStudentPrompt(value: string | undefined, fallback: string): string {
    const cleaned = (value ?? '')
      .replace(/\s+/g, ' ')
      .replace(/\bT:\s*/g, '')
      .replace(/\bS:\s*/g, '')
      .trim();
    if (!cleaned) {
      return fallback;
    }
    return cleaned.length > 260 ? `${cleaned.slice(0, 257).trim()}...` : cleaned;
  }

  private studentWorkRepresentation(): StudentWorkProblem['representation'] {
    const model = this.lesson?.visualModels[0] ?? 'equal-groups';
    const map: Record<string, StudentWorkProblem['representation']> = {
      'equal-groups': 'groups',
      array: 'array',
      'tape-diagram': 'tape',
      'number-line': 'number-line',
      clock: 'clock',
      measurement: 'measurement',
      'area-model': 'area',
      'fraction-strip': 'fraction',
      graph: 'graph',
      geometry: 'geometry'
    };
    return map[model] ?? 'written';
  }

  private studentWorkModelName(): string {
    const names: Record<StudentWorkProblem['representation'], string> = {
      groups: 'equal-groups drawing',
      array: 'array',
      tape: 'tape diagram',
      'number-line': 'number line',
      clock: 'clock or time number line',
      measurement: 'measurement model',
      area: 'area model',
      fraction: 'fraction model',
      graph: 'graph',
      geometry: 'geometry diagram',
      written: 'written model'
    };
    return names[this.studentWorkRepresentation()];
  }

  private studentWorkEquationSet(kind: 'source' | 'model' | 'connect' | 'exit'): string[] {
    const representation = this.studentWorkRepresentation();
    const objective = this.lesson?.objective ?? 'lesson objective';
    const byRepresentation: Record<StudentWorkProblem['representation'], Record<typeof kind, string[]>> = {
      groups: {
        source: ['groups x size = total', 'total ÷ one factor = unknown'],
        model: ['___ groups of ___ = ___'],
        connect: ['factor x factor = product', 'product ÷ factor = quotient'],
        exit: ['answer + unit/context sentence']
      },
      array: {
        source: ['rows x columns = total', 'total ÷ known factor = unknown'],
        model: ['___ x ___ = ___'],
        connect: ['related multiplication and division equations'],
        exit: ['explain what the unknown factor or quotient means']
      },
      tape: {
        source: ['whole = parts combined', 'unknown = missing part or whole'],
        model: ['label whole, parts, and unknown'],
        connect: ['equation matches the tape diagram'],
        exit: ['answer in a sentence with labels']
      },
      'number-line': {
        source: ['start, endpoint, and equal intervals'],
        model: ['count intervals, not tick marks'],
        connect: ['position or distance explains the answer'],
        exit: ['label the unit and answer']
      },
      clock: {
        source: ['start time → elapsed time → end time'],
        model: ['jumps around the clock'],
        connect: ['minutes in each jump add to elapsed time'],
        exit: ['time answer with a.m. or p.m. if needed']
      },
      measurement: {
        source: ['quantity + unit'],
        model: ['measure, estimate, round, add, or subtract'],
        connect: ['keep the same unit through the work'],
        exit: ['answer with correct measurement unit']
      },
      area: {
        source: ['rows x columns = square units'],
        model: ['tile the rectangle without gaps or overlaps'],
        connect: ['side lengths connect to multiplication'],
        exit: ['answer in square units']
      },
      fraction: {
        source: ['whole partitioned into equal parts'],
        model: ['unit fraction and number of parts'],
        connect: ['fraction names part of the same whole'],
        exit: ['name the whole and the fraction']
      },
      graph: {
        source: ['data value and scale'],
        model: ['read each mark, bar, or interval'],
        connect: ['compare using graph evidence'],
        exit: ['answer with data evidence']
      },
      geometry: {
        source: ['figure, attributes, and measurements'],
        model: ['mark sides, angles, area, or perimeter'],
        connect: ['classification or measurement follows from attributes'],
        exit: ['explain using shape properties']
      },
      written: {
        source: [objective],
        model: ['draw, write, or explain the model'],
        connect: ['model and answer match'],
        exit: ['answer in context']
      }
    };

    return byRepresentation[representation][kind];
  }

  private studentWorkModelCheck(): string {
    const checks: Record<StudentWorkProblem['representation'], string> = {
      groups: 'Check that groups are equal, labels name group count and group size, and the answer matches the unknown.',
      array: 'Check that rows, columns, and total are labeled and that the related equations match the array.',
      tape: 'Check that the whole, parts, units, and unknown are placed correctly on the tape diagram.',
      'number-line': 'Check that endpoints, intervals, and units are labeled; the student should count intervals, not tick marks.',
      clock: 'Check that start time, end time, and elapsed-minute jumps are shown clearly.',
      measurement: 'Check that the student keeps units attached and uses the correct measuring, rounding, addition, or subtraction action.',
      area: 'Check that the student uses square units and connects rows, columns, side lengths, and total area.',
      fraction: 'Check that the whole is named first and that all parts are equal before naming the fraction.',
      graph: 'Check that the student reads the scale before comparing or calculating from the graph.',
      geometry: 'Check that the student uses attributes or measurements, not just visual guessing.',
      written: 'Check that the student explains the relationship, not just the final answer.'
    };
    return checks[this.studentWorkRepresentation()];
  }

  get sourceLessonExplanation(): string {
    if (!this.lesson || !this.activeStep) {
      return '';
    }
    return this.activeStep.teacherEditionBasis;
  }

  get sourceVisualFacts(): SourceVisualFacts {
    const runtimeFacts = this.activeLessonRuntime?.sourceVisualFacts?.[this.activeStep?.id ?? ''];
    if (runtimeFacts) {
      return runtimeFacts;
    }

    const text = this.sourceContextText;
    const lower = text.toLowerCase();
    const multiplicationFacts = this.multiplicationFactsFromText(text);
    const firstFact = multiplicationFacts[0];
    const divisionMatch = text.match(/(\d+)\s*÷\s*(\d+)\s*=\s*(?:_{2,}|\?|\d+)/);
    const divisionTotal = divisionMatch ? Number(divisionMatch[1]) : undefined;
    const divisionGroupSize = divisionMatch ? Number(divisionMatch[2]) : undefined;
    const divisionGroupCount =
      divisionTotal && divisionGroupSize && divisionTotal % divisionGroupSize === 0
        ? divisionTotal / divisionGroupSize
        : undefined;
    const fallback = {
      groupCount: firstFact?.rows ?? divisionGroupCount ?? 3,
      groupSize: firstFact?.columns ?? divisionGroupSize ?? 4,
      rowCount: firstFact?.rows ?? 3,
      columnCount: firstFact?.columns ?? 4,
      tapePartCount: 3,
      tapePartLabel: 'unit',
      tapeWholeLabel: 'whole',
      tapeCaption: 'knowns label the bar; unknown is marked'
    };

    const equalGroupsMatch =
      text.match(/(\d+)\s+equal\s+groups?\s+of\s+(\d+)/i) ??
      text.match(/(\d+)\s+groups?\s+of\s+(\d+)/i) ??
      text.match(/(\d+)\s+rows?\s+of\s+(\d+)/i);
    const arrayMatch =
      text.match(/array\s+(?:with|shows?)\s+(\d+)\s+rows?\s+(?:and|by|of)\s+(\d+)/i) ??
      text.match(/(\d+)\s+rows?\s+(?:and|by|of)\s+(\d+)\s+(?:columns?|objects?|dots?|items?)/i) ??
      text.match(/(\d+)\s*[×x]\s*(\d+)\s+array/i);
    const tapeMatch = text.match(/tape diagram\s+with\s+(\d+)\s+parts?\s+and\s+(\d+)/i);
    const equationMatch = text.match(/(\d+)\s*[×x]\s*(\d+)\s*=\s*([a-z?_{]+)/i);
    const unknownLetterMatch = text.match(/letter\s+([a-z])\b/i);
    const groupCount = this.toReasonableCount(
      equalGroupsMatch?.[1] ?? tapeMatch?.[1] ?? equationMatch?.[1] ?? String(firstFact?.rows ?? divisionGroupCount ?? ''),
      fallback.groupCount
    );
    const groupSize = this.toReasonableCount(
      equalGroupsMatch?.[2] ?? tapeMatch?.[2] ?? equationMatch?.[2] ?? String(firstFact?.columns ?? divisionGroupSize ?? ''),
      fallback.groupSize
    );
    const rowCount = this.toReasonableCount(arrayMatch?.[1] ?? String(firstFact?.rows ?? ''), groupCount);
    const columnCount = this.toReasonableCount(arrayMatch?.[2] ?? String(firstFact?.columns ?? ''), groupSize);
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

  get sourceGroupCaption(): string {
    const facts = this.sourceVisualFacts;
    return `${facts.groupCount} equal groups of ${facts.groupSize}`;
  }

  get sourceArrayCaption(): string {
    const facts = this.sourceVisualFacts;
    return `${facts.rowCount} rows of ${facts.columnCount}; ${facts.rowCount * facts.columnCount} total`;
  }

  get sourceModelCaption(): string {
    const objective = (this.lesson?.objective ?? '').toLowerCase();
    const lessonLabel = this.lesson ? `Lesson ${this.lesson.lessonNumber}` : 'This lesson';
    switch (this.activeStep?.visualModel) {
      case 'number-line':
        return objective.includes('round') || objective.includes('nearest')
          ? `${lessonLabel}: locate benchmarks and the nearest value`
          : `${lessonLabel}: equal intervals show position or distance`;
      case 'clock':
        return objective.includes('stopwatch')
          ? `${lessonLabel}: time is measured as a continuous amount`
          : `${lessonLabel}: start time, elapsed jumps, and end time`;
      case 'measurement':
        return `${lessonLabel}: quantity, unit, and measuring tool stay together`;
      case 'area-model':
        return objective.includes('decompose')
          ? `${lessonLabel}: split the figure, then add the areas`
          : `${lessonLabel}: square units cover the plane figure`;
      case 'fraction-strip':
        return objective.includes('equivalent')
          ? `${lessonLabel}: different partitions can name the same amount`
          : `${lessonLabel}: name the whole, then count equal parts`;
      case 'graph':
        return objective.includes('line plot')
          ? `${lessonLabel}: line plot data uses a scale`
          : `${lessonLabel}: organize data before comparing`;
      case 'geometry':
        return objective.includes('perimeter')
          ? `${lessonLabel}: trace the boundary and label side lengths`
          : `${lessonLabel}: use attributes and measurements`;
      default:
        return `${lessonLabel}: model, labels, and explanation match the objective`;
    }
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
    const sourceKey = `${this.lesson.moduleId}-l${this.lesson.lessonNumber}`;
    const note = LESSON_SOURCE_NOTES[sourceKey];
    const studentSource = this.studentWorkSource;
    const problemText = studentSource?.problems
      .flatMap((problem) => [problem.prompt, ...problem.equations])
      .join(' ');
    return [
      this.lesson.objective,
      ...this.lesson.steps.flatMap((step) => [step.studentPrompt, step.teacherEditionBasis]),
      note?.sourceProblem,
      note?.teacherMove,
      studentSource?.studentWorkbookSource,
      studentSource?.teacherEditionReference,
      problemText
    ].filter(Boolean).join(' ');
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
    if (!this.displaySteps.length) {
      return;
    }
    this.activeStepIndex = Math.min(this.activeStepIndex + 1, this.displaySteps.length - 1);
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

  clearFeedback(): void {
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
    const quotientOk = this.l6ExitQuotient.trim() === '2';
    const factorOk = this.l6ExitFactor.trim() === '2';
    const meaningOk = meaning.includes('row') || meaning.includes('group');
    const exitOk = quotientOk && factorOk && meaningOk;

    if (!exitOk) {
      const guidance: string[] = [];
      if (!quotientOk) {
        guidance.push('The division blank is 2 because 12 divided by 6 means two rows of 6.');
      }
      if (!factorOk) {
        guidance.push('The multiplication blank is also 2 because 2 times 6 equals 12.');
      }
      if (!meaningOk) {
        guidance.push('The meaning should say that 2 is the number of rows or groups.');
      }

      this.setCheckedFeedback({
        status: 'needs-work',
        title: quotientOk && factorOk ? 'The 2s are correct; name what they mean' : 'Connect each blank to the array',
        body: guidance.join(' ')
      });
      return;
    }

    this.setCheckedFeedback({
      status: 'correct',
      title: 'Correct: both 2s mean rows',
      body: 'The quotient and unknown factor both represent the number of rows, or groups, of 6 notecards.'
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
