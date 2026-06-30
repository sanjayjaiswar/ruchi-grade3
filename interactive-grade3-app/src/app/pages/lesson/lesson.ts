import { NgClass, NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { findLesson, findModule } from '../../data/curriculum.data';
import { LESSON_SOURCE_NOTES } from '../../data/lesson-source-notes.generated';
import { STUDENT_WORK_SOURCE, StudentWorkLessonSource, StudentWorkSourceProblem } from '../../data/student-work-source.generated';
import { LessonContent, LessonStep, ModuleMeta } from '../../data/curriculum.types';
import { ArrayDecomposerComponent } from '../../shared/array-decomposer/array-decomposer';
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
  private readonly lessonConceptTerms: Record<string, string[]> = {
    'm1-l4': ['division', 'unknown', 'quotient'],
    'm1-l5': ['division', 'unknown', 'quotient'],
    'm1-l6': ['array', 'quotient', 'unknown factor'],
    'm1-l10': ['array', 'decompose', 'product'],
    'm2-l1': ['elapsed time', 'number line'],
    'm2-l6': ['gram', 'kilogram'],
    'm2-l8': ['liter', 'milliliter', 'capacity'],
    'm2-l12': ['round', 'number line'],
    'm3-l1': ['commutative property', 'factor', 'product'],
    'm3-l9': ['decompose', 'distributive property'],
    'm3-l19': ['factor', 'product'],
    'm4-l1': ['area', 'square unit'],
    'm4-l5': ['area', 'square unit'],
    'm4-l9': ['distributive property', 'area'],
    'm5-l1': ['whole', 'fraction'],
    'm5-l5': ['unit fraction', 'whole'],
    'm5-l14': ['fraction', 'number line'],
    'm5-l20': ['equivalent fractions', 'whole'],
    'm6-l1': ['data', 'scale'],
    'm6-l5': ['line plot', 'scale'],
    'm7-l4': ['attribute', 'angle', 'right angle'],
    'm7-l10': ['perimeter'],
    'm7-l18': ['line plot', 'perimeter', 'area'],
    'm7-l23': ['area', 'perimeter']
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
  readonly lesson10TeacherModel: ArrayDecompositionExample = this.makeArrayDecompositionExample({
    title: 'Teacher Edition model: 3 guitars with 6 strings each',
    totalGroups: 3,
    groupSize: 6,
    firstPart: 1,
    secondPart: 2,
    context: 'Split the 3 guitar rows into 1 row and 2 rows.',
    equation: '3 × 6 = (1 × 6) + (2 × 6) = 6 + 12 = 18',
    teacherPrompt: 'What does each row mean in the guitar story?'
  });
  readonly lesson10ArrayDecompositions: ArrayDecompositionExample[] = [
    this.makeArrayDecompositionExample({
      title: 'Problem 1: break 7 rows into 5 rows and 2 rows',
      totalGroups: 7,
      groupSize: 3,
      firstPart: 5,
      secondPart: 2,
      context: 'Keep the group size 3. Decompose the 7 rows into 5 rows and 2 rows.',
      equation: '7 × 3 = (5 × 3) + (2 × 3) = 15 + 6 = 21',
      teacherPrompt: 'What stayed the same? What did we break apart?'
    }),
    this.makeArrayDecompositionExample({
      title: 'Problem 2: break 8 rows into 4 rows and 4 rows',
      totalGroups: 8,
      groupSize: 3,
      firstPart: 4,
      secondPart: 4,
      context: 'Both parts are 4 rows of 3, so the two partial products match.',
      equation: '8 × 3 = (4 × 3) + (4 × 3) = 12 + 12 = 24',
      teacherPrompt: 'How do the two smaller arrays make the same whole array?'
    }),
    this.makeArrayDecompositionExample({
      title: "Problem 3: Ruby's album page",
      totalGroups: 5,
      groupSize: 3,
      firstPart: 2,
      secondPart: 3,
      context: 'Ruby has 5 rows of 3 photos. The top part has 2 rows and the bottom part has 3 rows.',
      equation: '5 × 3 = (2 × 3) + (3 × 3) = 6 + 9 = 15',
      teacherPrompt: 'Where do the 6 and 9 come from in the array?'
    })
  ];
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
    return this.displaySteps[this.activeStepIndex];
  }

  get displaySteps(): LessonStep[] {
    if (!this.lesson) {
      return [];
    }

    const baseSteps = this.isLesson10 ? this.lesson10TeacherEditionSteps : this.lesson.steps;
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

  get isLesson10(): boolean {
    return this.module?.id === 'm1' && this.lesson?.lessonNumber === 10;
  }

  get lesson10TeacherEditionSteps(): LessonStep[] {
    return [
      {
        id: 'source-goal',
        title: 'Use the guitar string story',
        shortTitle: 'Goal',
        studentPrompt: 'A guitar has 6 strings. Use 3 guitars to build 3 rows of 6 and find the total.',
        teacherEditionBasis:
          'Lesson 10 Application Problem: A guitar has 6 strings. How many strings are there on 3 guitars? Write a multiplication equation to solve.',
        visualModel: 'array'
      },
      {
        id: 'source-model',
        title: 'Draw the whole array first',
        shortTitle: 'Model',
        studentPrompt: 'Draw a 3 × 6 array. Let one row show the strings on one guitar.',
        teacherEditionBasis:
          'Teacher Edition Concept Development: Draw an array to represent the total number of guitar strings. Let the number of strings on one guitar be 1 row.',
        visualModel: 'array'
      },
      {
        id: 'source-meaning',
        title: 'Name what each part means',
        shortTitle: 'Meaning',
        studentPrompt: 'The 3 means 3 guitars. The 6 means 6 strings on each guitar. The total is 18 strings.',
        teacherEditionBasis:
          'Teacher asks students to connect the rows and group size to the story before using equations.',
        visualModel: 'array'
      },
      {
        id: 'source-picture',
        title: 'Put a dotted line through the array',
        shortTitle: 'Picture',
        studentPrompt: 'Split the 3 rows into 1 row and 2 rows. The dotted line changes the strategy, not the total.',
        teacherEditionBasis:
          'Teacher Edition: Make a dotted line below the first row to show just one guitar.',
        visualModel: 'array'
      },
      {
        id: 'source-draw',
        title: 'Write the two smaller products',
        shortTitle: 'Draw',
        studentPrompt: 'Write 1 × 6 = 6 and 2 × 6 = 12. Then add 6 + 12 to get 18.',
        teacherEditionBasis:
          'Teacher Edition: Write and solve a multiplication sentence to describe each part of the array.',
        visualModel: 'array'
      },
      {
        id: 'source-exit',
        title: 'Try the same move with 7 × 3',
        shortTitle: 'Exit',
        studentPrompt: 'For 7 × 3, split 7 rows into 5 rows and 2 rows: (5 × 3) + (2 × 3).',
        teacherEditionBasis:
          'Lesson 10 Problem Set begins with 7 × 3 = (5 × 3) + (2 × 3).',
        visualModel: 'array'
      },
      {
        id: 'source-summary',
        title: 'Say the takeaway',
        shortTitle: 'Sum',
        studentPrompt: 'Decompose the rows, multiply each part, and add the partial products to find the same total.',
        teacherEditionBasis:
          'Lesson objective: Model the distributive property with arrays to decompose units as a strategy to multiply.',
        visualModel: 'array'
      }
    ];
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
    if (!this.displaySteps.length) {
      return '';
    }
    return `${this.displaySteps.length} small screens`;
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
    return !this.isLesson10 && this.activeStepIndex === 0 && this.conceptExplanations.length > 0;
  }

  get showMultiplicationDivisionVocabularyNote(): boolean {
    return false;
  }

  get arrayDecompositionExamples(): ArrayDecompositionExample[] {
    if (!this.module || !this.lesson || this.activeStep?.id !== 'student-work') {
      return [];
    }

    return this.module.id === 'm1' && this.lesson.lessonNumber === 10 ? this.lesson10ArrayDecompositions : [];
  }

  get lesson10SourceExample(): ArrayDecompositionExample {
    return this.lesson10TeacherModel;
  }

  get lesson10SourceRows(): InfoRow[] {
    const stepId = this.activeStep?.id ?? '';
    const common = [
      { label: 'Whole', value: '3 guitars with 6 strings each: 3 × 6 = 18' },
      { label: 'Split', value: '1 row of 6 and 2 rows of 6' },
      { label: 'Recombine', value: '6 + 12 = 18, the same total strings' }
    ];
    const byStep: Record<string, InfoRow[]> = {
      'source-goal': [
        { label: 'Story', value: 'A guitar has 6 strings. How many strings are on 3 guitars?' },
        { label: 'Equation', value: '3 × 6 = 18' },
        { label: 'Why it matters', value: 'The story becomes the array used for the lesson.' }
      ],
      'source-model': [
        { label: 'Rows', value: '3 rows because there are 3 guitars' },
        { label: 'Row size', value: '6 dots in each row because each guitar has 6 strings' },
        { label: 'Total', value: '18 strings' }
      ],
      'source-meaning': [
        { label: '3', value: 'number of guitars, shown as rows' },
        { label: '6', value: 'strings on one guitar, shown in each row' },
        { label: '18', value: 'total strings across all guitars' }
      ],
      'source-picture': [
        { label: 'Dotted line', value: 'shows 1 guitar above and 2 guitars below' },
        { label: 'Same whole', value: 'the array still has 3 rows of 6' },
        { label: 'Purpose', value: 'break a harder fact into easier parts' }
      ],
      'source-draw': [
        { label: 'Top part', value: '1 × 6 = 6' },
        { label: 'Bottom part', value: '2 × 6 = 12' },
        { label: 'Add', value: '6 + 12 = 18' }
      ],
      'source-exit': [
        { label: 'Problem Set', value: '7 × 3 = (5 × 3) + (2 × 3)' },
        { label: 'Rows split', value: '7 rows become 5 rows and 2 rows' },
        { label: 'Add', value: '15 + 6 = 21' }
      ],
      'source-summary': common
    };

    return byStep[stepId] ?? common;
  }

  private lessonConceptFocusTerms(): string[] {
    if (!this.module || !this.lesson || this.activeStepIndex !== 0) {
      return [];
    }

    return this.lessonConceptTerms[`${this.module.id}-l${this.lesson.lessonNumber}`] ?? [];
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
        equations: this.studentWorkEquationSet('source'),
        answer: 'Solve the source problem and write the answer with the correct unit or context.',
        representation,
        teacherLookFor: 'The student identifies the known quantities, the unknown, and the question before solving.',
        sourceLabel: 'Teacher Edition source note',
        visual: this.studentWorkVisualFacts(sourcePrompt, this.studentWorkEquationSet('source'))
      },
      {
        number: 2,
        prompt: `Draw or label the ${modelName} for the lesson objective: ${this.lesson.objective}`,
        equations: this.studentWorkEquationSet('model'),
        answer: `A labeled ${modelName} that matches the story, quantities, units, and unknown.`,
        representation,
        teacherLookFor: this.studentWorkModelCheck(),
        sourceLabel: 'Teacher Edition source note',
        visual: this.studentWorkVisualFacts(this.lesson.objective, this.studentWorkEquationSet('model'))
      },
      {
        number: 3,
        prompt: teacherMove,
        equations: this.studentWorkEquationSet('connect'),
        answer: 'The equation and model should represent the same relationship.',
        representation,
        teacherLookFor: 'The student connects each number, label, interval, mark, side length, part, or data value to the model.',
        sourceLabel: 'Teacher Edition source note',
        visual: this.studentWorkVisualFacts(teacherMove, this.studentWorkEquationSet('connect'))
      },
      {
        number: 4,
        prompt: exitEvidence,
        equations: this.studentWorkEquationSet('exit'),
        answer: 'Independent answer with a model, equation or written reasoning, and a context sentence.',
        representation,
        teacherLookFor: 'Do not count a bare numerical answer as enough; require a model and explanation.',
        sourceLabel: 'Teacher Edition source note',
        visual: this.studentWorkVisualFacts(exitEvidence, this.studentWorkEquationSet('exit'))
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
      answer: support?.answer ?? 'Student solves in the workbook, shows the required drawing or model, and writes the answer in context.',
      representation: this.studentWorkRepresentation(),
      teacherLookFor: support?.teacherLookFor ?? this.studentWorkModelCheck(),
      sourceLabel,
      visual: this.studentWorkVisualFacts(problem.prompt, equations)
    };
  }

  private studentWorkProblemSupport(problemNumber: number): Pick<StudentWorkProblem, 'answer' | 'teacherLookFor'> | undefined {
    if (this.module?.id !== 'm1' || this.lesson?.lessonNumber !== 10) {
      return undefined;
    }

    const byProblem: Record<number, Pick<StudentWorkProblem, 'answer' | 'teacherLookFor'>> = {
      1: {
        answer: 'Show 7 rows of 3 split into 5 rows of 3 and 2 rows of 3. Then add 15 + 6 to get 21.',
        teacherLookFor: 'The dotted split breaks apart the rows, not the group size. The whole array still shows 7 groups of 3.'
      },
      2: {
        answer: 'Show 8 rows of 3 split into 4 rows of 3 and 4 rows of 3. Then add 12 + 12 to get 24.',
        teacherLookFor: 'Each partial product matches one side of the split array, and the two parts recombine to the original 8 rows.'
      },
      3: {
        answer: "Show Ruby's page as 5 rows of 3 split into 2 rows and 3 rows. Explain that 6 + 9 is the same total as 5 × 3.",
        teacherLookFor: 'The explanation names the top and bottom parts of the album page and connects them to 2 × 3 and 3 × 3.'
      }
    };

    return byProblem[problemNumber];
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

    return this.studentWorkEquationSet('source');
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
    return `This lesson uses the ${this.activeStep.visualModel} model to make the objective teachable, then asks the student to explain the model before giving a final answer.`;
  }

  get sourceVisualFacts(): SourceVisualFacts {
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
