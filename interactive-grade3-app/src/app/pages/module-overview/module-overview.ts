import { NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import { findModule, lessonTitle } from '../../data/curriculum.data';
import { ModuleMeta } from '../../data/curriculum.types';
import { preferredReadAloudVoice, READ_ALOUD_VOICE_STORAGE_KEY } from '../../shared/read-aloud-preferences';

type ModuleConcept = {
  term: string;
  meaning: string;
  teacherLookFor: string;
};

type ModuleConceptCluster = {
  badge: string;
  title: string;
  definition: string;
  parentMeaning: string;
  example: string;
  prompt: string;
  visual: 'groups' | 'array' | 'division' | 'connection' | 'decompose' | 'rdw';
  vocabulary: { term: string; meaning: string }[];
  lessons: string;
};

type ConceptProgressionStep = {
  label: string;
  detail: string;
};

type ModuleOverviewTab = {
  id: string;
  label: string;
};

type VocabularyComparisonRow = {
  operation: string;
  howToSayIt: string;
  example: string;
  answerName: string;
};

@Component({
  selector: 'app-module-overview-page',
  imports: [NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, RouterLink],
  templateUrl: './module-overview.html',
  styleUrl: './module-overview.css'
})
export class ModuleOverviewPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('moduleOneConceptChart') private moduleOneConceptChart?: ElementRef<HTMLDivElement>;
  module?: ModuleMeta;
  activeModuleTab = 'concepts';
  speakingConceptTitle?: string;
  readonly moduleOneConceptQuestions = [
    'How many groups?',
    'How many in each group?',
    'What is the total?',
    'What number is missing?'
  ];
  readonly moduleOneConceptProgression: ConceptProgressionStep[] = [
    { label: 'Topic A', detail: 'equal groups to multiplication' },
    { label: 'Topic B', detail: 'division finds an unknown' },
    { label: 'Topics C-D', detail: 'arrays, skip-counting, group sizes of 2 and 3' },
    { label: 'Topic E', detail: 'connect multiplication and division' },
    { label: 'Topic F', detail: 'decompose and solve word problems' }
  ];
  readonly moduleOneConceptClusters: ModuleConceptCluster[] = [
    {
      badge: 'Start here',
      title: 'Equal groups and group size',
      definition: 'Equal groups are the foundation for multiplication, arrays, and division. Equal groups have the same number in each group.',
      parentMeaning: 'The group size is how many are in each group. In Eureka Math, this group size is also called the unit.',
      example: '3 groups of 4 makes 12. Count by the group size: 4, 8, 12.',
      prompt: 'How many groups? What is the group size? How many total?',
      visual: 'groups',
      vocabulary: [
        { term: 'group size', meaning: 'how many are in each group' },
        { term: 'unit', meaning: 'Eureka word for the group size' },
        { term: 'skip-counting', meaning: 'counting by the same group size' }
      ],
      lessons: 'Lessons 1, 3, 7-9, 14'
    },
    {
      badge: 'Operation meaning',
      title: 'Multiplication: groups to total',
      definition: 'Multiplication is the process of finding the total by combining equal groups.',
      parentMeaning: 'Now that we understand equal groups, multiplication helps us find the total. Times means groups of.',
      example: '3 × 4 = 12 means 3 times 4, or 3 groups of 4. The factors are 3 and 4. The product is 12.',
      prompt: 'How many groups? What is the group size? What is the total?',
      visual: 'groups',
      vocabulary: [
        { term: 'times', meaning: 'the way we read a multiplication sign' },
        { term: 'factors', meaning: 'the numbers being multiplied' },
        { term: 'product', meaning: 'the total in a multiplication problem' }
      ],
      lessons: 'Lessons 1-3'
    },
    {
      badge: 'Model',
      title: 'Arrays: rows and columns',
      definition: 'An array is a way to organize objects into equal rows and columns.',
      parentMeaning: 'Arrays make factors visible and show the same total in two directions.',
      example: '3 rows of 4 dots shows 3 × 4 = 12. It can also show 4 columns of 3 dots.',
      prompt: 'How many rows? How many in each row? How many columns?',
      visual: 'array',
      vocabulary: [
        { term: 'rows', meaning: 'side-to-side equal groups' },
        { term: 'columns', meaning: 'up-and-down equal groups' }
      ],
      lessons: 'Lessons 2, 6-10, 15-16'
    },
    {
      badge: 'Operation meaning',
      title: 'Division: total to equal groups',
      definition: 'Division is the process of separating a total into equal groups.',
      parentMeaning: 'The answer tells how many groups or how many are in each group.',
      example: '12 ÷ 3 = 4 means 12 divided by 3. The quotient is 4.',
      prompt: 'Does the quotient tell the number of groups or the number in each group?',
      visual: 'division',
      vocabulary: [
        { term: 'divided by', meaning: 'the way we read a division sign' },
        { term: 'quotient', meaning: 'the answer to a division problem' }
      ],
      lessons: 'Lessons 4-6, 11-13'
    },
    {
      badge: 'Relationship',
      title: 'Unknown factors connect the operations',
      definition: 'The unknown is the missing number we need to find. An unknown factor is the missing factor in a multiplication equation.',
      parentMeaning: 'Division can be read as a related multiplication question.',
      example: '12 ÷ 3 = ? connects to 3 × ? = 12. The unknown factor is 4.',
      prompt: 'What multiplication equation matches this division problem?',
      visual: 'connection',
      vocabulary: [
        { term: 'unknown', meaning: 'the missing number' },
        { term: 'unknown factor', meaning: 'the missing factor in multiplication' }
      ],
      lessons: 'Lessons 4-6, 11, 17'
    },
    {
      badge: 'Strategies',
      title: 'Decompose, draw, and solve',
      definition: 'Decompose means to break a number or array into smaller parts.',
      parentMeaning: 'Number bonds, array splits, tape diagrams, and RDW organize the thinking.',
      example: 'Break 5 × 4 into (2 × 4) + (3 × 4). Read, Draw, Write turns a story into a model and answer sentence.',
      prompt: 'What can we break apart? What does the tape diagram show?',
      visual: 'decompose',
      vocabulary: [
        { term: 'number bond', meaning: 'a whole broken into parts' },
        { term: 'distributive property', meaning: 'break a fact apart, multiply the parts, then add' },
        { term: 'tape diagram', meaning: 'a bar model that shows equal parts and totals' },
        { term: 'RDW', meaning: 'Read, Draw, Write' }
      ],
      lessons: 'Lessons 10, 15-21'
    }
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
  private readonly moduleConcepts: Record<string, ModuleConcept[]> = {
    m1: [],
    m2: [
      {
        term: 'measurement unit',
        meaning: 'A number must be attached to a unit such as grams, kilograms, liters, milliliters, or minutes.',
        teacherLookFor: 'Have the student say the unit with every answer.'
      },
      {
        term: 'elapsed time',
        meaning: 'Elapsed time is the amount of time that passes from a start time to an end time.',
        teacherLookFor: 'Ask the student to show time jumps on a clock or number line.'
      },
      {
        term: 'rounding',
        meaning: 'Rounding replaces a number with a nearby ten or hundred that is easier to use.',
        teacherLookFor: 'Ask which benchmark the number is closer to and why.'
      },
      {
        term: 'place value algorithm',
        meaning: 'Addition and subtraction use units of ones, tens, and hundreds, including composing and decomposing.',
        teacherLookFor: 'Ask what unit is being bundled or unbundled.'
      }
    ],
    m3: [
      {
        term: 'fluency with factors',
        meaning: 'Known facts help solve new multiplication and division facts for 0, 1, 6, 7, 8, 9, and 10.',
        teacherLookFor: 'Ask which known fact or pattern the student used.'
      },
      {
        term: 'properties',
        meaning: 'Commutative, associative, and distributive properties help rewrite problems without changing the total.',
        teacherLookFor: 'Ask what changed in the equation and what stayed equal.'
      },
      {
        term: 'break apart',
        meaning: 'A harder factor can be decomposed into friendlier parts, then the partial products are added.',
        teacherLookFor: 'Have the student show the break apart in an array or tape diagram.'
      },
      {
        term: 'multiples of 10',
        meaning: 'Single-digit facts extend to tens by tracking place value.',
        teacherLookFor: 'Ask how the basic fact connects to the multiple-of-ten fact.'
      }
    ],
    m4: [
      {
        term: 'area',
        meaning: 'Area is the amount of flat space inside a figure.',
        teacherLookFor: 'Ask whether the student is counting inside space, not the outside boundary.'
      },
      {
        term: 'square unit',
        meaning: 'Area is measured by square units that tile a figure without gaps or overlaps.',
        teacherLookFor: 'Ask why the unit must be square and equal-sized.'
      },
      {
        term: 'rows and columns',
        meaning: 'A tiled rectangle works like an array: rows times columns gives area.',
        teacherLookFor: 'Have the student label side lengths and connect them to multiplication.'
      },
      {
        term: 'decompose area',
        meaning: 'A larger rectangle can be split into smaller rectangles and the areas added.',
        teacherLookFor: 'Ask how the smaller areas recombine to make the whole area.'
      }
    ],
    m5: [
      {
        term: 'whole',
        meaning: 'The whole is the complete object, amount, or number-line interval being partitioned.',
        teacherLookFor: 'Ask the student to identify the whole before naming the fraction.'
      },
      {
        term: 'equal parts',
        meaning: 'Fractions name equal parts of a whole. Unequal parts do not make correct fractions.',
        teacherLookFor: 'Ask whether every part is the same size.'
      },
      {
        term: 'unit fraction',
        meaning: 'A unit fraction names one equal part, such as one third or one fourth.',
        teacherLookFor: 'Ask what one part is called after partitioning.'
      },
      {
        term: 'equivalent fractions',
        meaning: 'Equivalent fractions name the same amount of the same whole.',
        teacherLookFor: 'Use the same whole and ask the student to prove the amounts match.'
      }
    ],
    m6: [
      {
        term: 'data',
        meaning: 'Data are collected answers or measurements that can be organized and compared.',
        teacherLookFor: 'Ask what each value represents before reading the graph.'
      },
      {
        term: 'scale',
        meaning: 'The scale tells what each mark, picture, interval, or bar counts by.',
        teacherLookFor: 'Ask what one mark or one interval means.'
      },
      {
        term: 'picture and bar graphs',
        meaning: 'Graphs show counts so totals, comparisons, and differences can be read efficiently.',
        teacherLookFor: 'Ask the student to use the scale before answering.'
      },
      {
        term: 'line plot',
        meaning: 'A line plot shows measurement data on a number line using marks.',
        teacherLookFor: 'Ask how many measurements are at a value and what unit is being measured.'
      }
    ],
    m7: [
      {
        term: 'model the problem',
        meaning: 'Word problems become teachable when the knowns and unknown are shown in a drawing, equation, or table.',
        teacherLookFor: 'Ask what each part of the model represents.'
      },
      {
        term: 'shape attributes',
        meaning: 'Shapes can be classified by sides, angles, lines, area, and perimeter.',
        teacherLookFor: 'Ask for the attribute used to classify the shape.'
      },
      {
        term: 'perimeter',
        meaning: 'Perimeter is the distance around a shape.',
        teacherLookFor: 'Ask whether the student is adding outside side lengths.'
      },
      {
        term: 'area and perimeter together',
        meaning: 'Figures can have the same perimeter with different areas, or the same area with different perimeters.',
        teacherLookFor: 'Ask the student to compare both measures, not just one.'
      }
    ]
  };
  private readonly moduleThemes: Record<string, { accent: string; strong: string; soft: string; muted: string }> = {
    m1: { accent: '#2563eb', strong: '#1d4ed8', soft: '#dbeafe', muted: '#bfdbfe' },
    m2: { accent: '#197c72', strong: '#0f5d55', soft: '#e1f6f1', muted: '#a9ddd3' },
    m3: { accent: '#6d5bd0', strong: '#4f3aa8', soft: '#eeebff', muted: '#c9c0ff' },
    m4: { accent: '#4f8a2f', strong: '#35681d', soft: '#ecf7df', muted: '#c3dfa8' },
    m5: { accent: '#c44f73', strong: '#943555', soft: '#ffedf2', muted: '#f4bfd0' },
    m6: { accent: '#2474a6', strong: '#18577d', soft: '#e5f4ff', muted: '#afd8f2' },
    m7: { accent: '#8a5a28', strong: '#684017', soft: '#fff0dc', muted: '#e8c494' }
  };
  private conceptChart?: ECharts;
  private readonly conceptChartResizeHandler = () => this.conceptChart?.resize();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const moduleId = params.get('moduleId') ?? 'm1';
      this.module = findModule(moduleId);
      if (this.module) {
        this.title.setTitle(`Module ${this.module.number}: ${this.module.title} | Ruchika Grade 3 Math`);
      } else {
        this.title.setTitle('Module Not Found | Ruchika Grade 3 Math');
      }
      this.activeModuleTab = 'concepts';
      this.scheduleConceptChartRender();
    });
  }

  ngAfterViewInit(): void {
    this.scheduleConceptChartRender();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.conceptChartResizeHandler);
    }
  }

  ngOnDestroy(): void {
    this.stopReadingConcept();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.conceptChartResizeHandler);
    }
    this.conceptChart?.dispose();
  }

  lessonLabel(lessonId: string): string {
    return `Lesson ${this.lessonNumber(lessonId)}`;
  }

  lessonObjective(lessonId: string): string {
    return this.module ? lessonTitle(this.module.id, lessonId).replace(/^Lesson\s+\d+:\s*/, '') : lessonId;
  }

  lessonNumber(lessonId: string): string {
    return lessonId.replace(/^m\d+-l/, '');
  }

  lessonCount(): number {
    return this.module?.topics.reduce((count, topic) => count + topic.lessonIds.length, 0) ?? 0;
  }

  concepts(): ModuleConcept[] {
    return this.module ? this.moduleConcepts[this.module.id] ?? [] : [];
  }

  showModuleOneConceptMap(): boolean {
    return this.module?.id === 'm1';
  }

  showMultiplicationDivisionVocabulary(): boolean {
    return this.module?.id === 'm3';
  }

  moduleOverviewTabs(): ModuleOverviewTab[] {
    if (!this.module) {
      return [];
    }
    const tabs: ModuleOverviewTab[] = [
      { id: 'concepts', label: '1. Concepts' },
      { id: 'topics', label: '2. Topics and lessons' }
    ];
    return [
      ...tabs,
      ...this.module.topics.map((topic) => ({
        id: this.teachTopicTabId(topic.id),
        label: `Teach ${topic.label}`
      }))
    ];
  }

  selectModuleTab(tabId: string): void {
    this.activeModuleTab = tabId;
    this.stopReadingConcept();
    this.scheduleConceptChartRender();
  }

  teachTopicTabId(topicId: string): string {
    return `teach-${topicId}`;
  }

  readConcept(cluster: ModuleConceptCluster): void {
    if (!this.canReadConcepts()) {
      return;
    }

    if (this.speakingConceptTitle === cluster.title) {
      this.stopReadingConcept();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.conceptReadAloudText(cluster));
    const voice = this.selectedReadAloudVoice();
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    utterance.onend = () => this.clearSpeakingConcept(cluster.title);
    utterance.onerror = () => this.clearSpeakingConcept(cluster.title);
    this.speakingConceptTitle = cluster.title;
    window.speechSynthesis.speak(utterance);
  }

  stopReadingConcept(): void {
    if (this.canReadConcepts()) {
      window.speechSynthesis.cancel();
    }
    this.speakingConceptTitle = undefined;
  }

  moduleThemeVars(moduleId: string) {
    const theme = this.moduleThemes[moduleId] ?? this.moduleThemes['m1'];
    return {
      '--module-accent': theme.accent,
      '--module-accent-strong': theme.strong,
      '--module-accent-soft': theme.soft,
      '--module-accent-muted': theme.muted
    };
  }

  assessmentCheckpoint(): string {
    switch (this.module?.id) {
      case 'm1':
        return 'Mid-Module Assessment after Topic C; End-of-Module Assessment after Topic F.';
      case 'm2':
        return 'Mid-Module Assessment after Topic B; End-of-Module Assessment after Topic E.';
      case 'm3':
        return 'Mid-Module Assessment after Topic C; End-of-Module Assessment after Topic F.';
      case 'm4':
        return 'Mid-Module Assessment after Topic B; End-of-Module Assessment after Topic D.';
      case 'm5':
        return 'Mid-Module Assessment after Topic C; End-of-Module Assessment after Topic F.';
      case 'm6':
        return 'End-of-Module Assessment after Topic B.';
      case 'm7':
        return 'Mid-Module Assessment after Topic C; End-of-Module Assessment after Topic E; Topic F is year review.';
      default:
        return 'Assessment checkpoint unavailable for this route.';
    }
  }

  private scheduleConceptChartRender(): void {
    setTimeout(() => this.renderModuleOneConceptChart());
  }

  private canReadConcepts(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined'
    );
  }

  private clearSpeakingConcept(title: string): void {
    if (this.speakingConceptTitle === title) {
      this.speakingConceptTitle = undefined;
      this.changeDetector.detectChanges();
    }
  }

  private conceptReadAloudText(cluster: ModuleConceptCluster): string {
    return this.cleanSpeechText(`${cluster.definition} ${cluster.parentMeaning}`);
  }

  private selectedReadAloudVoice(): SpeechSynthesisVoice | undefined {
    const voices = window.speechSynthesis.getVoices();
    return preferredReadAloudVoice(voices, this.storedReadAloudVoiceName());
  }

  private storedReadAloudVoiceName(): string {
    return typeof window !== 'undefined' ? window.localStorage.getItem(READ_ALOUD_VOICE_STORAGE_KEY) ?? '' : '';
  }

  private cleanSpeechText(text: string): string {
    return text
      .replace(/×/g, ' times ')
      .replace(/÷/g, ' divided by ')
      .replace(/\?/g, ' blank ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private renderModuleOneConceptChart(): void {
    const chartElement = this.moduleOneConceptChart?.nativeElement;
    if (!chartElement || !this.showModuleOneConceptMap()) {
      this.conceptChart?.dispose();
      this.conceptChart = undefined;
      return;
    }

    this.conceptChart ??= echarts.init(chartElement);
    this.conceptChart.setOption(this.moduleOneConceptChartOption(), true);
    this.conceptChart.resize();
  }

  private moduleOneConceptChartOption(): EChartsOption {
    const root = {
      name: 'Equal groups',
      description: 'Equal groups are the foundation for multiplication, arrays, and division.',
      symbolSize: 96,
      itemStyle: { color: '#ffd166', borderColor: '#92400e', borderWidth: 4 },
      label: { fontSize: 16, fontWeight: 900, width: 88 },
      children: [
        {
          name: 'Multiplication\n3 × 4 = 12',
          description: 'Find the total by combining equal groups. Times means groups of.',
          itemStyle: { color: '#86efac', borderColor: '#15803d', borderWidth: 3 },
          children: [
            {
              name: 'Factors\nand product',
              description: 'Factors are the numbers being multiplied. The product is the total.',
              itemStyle: { color: '#bbf7d0', borderColor: '#16a34a', borderWidth: 2 }
            },
            {
              name: 'Skip-count\nby group size',
              description: 'Count by 2s, 3s, 4s, 5s, or 10s to build facts from equal groups.',
              itemStyle: { color: '#fde68a', borderColor: '#ca8a04', borderWidth: 2 }
            }
          ]
        },
        {
          name: 'Arrays',
          description: 'Objects organized into equal rows and columns so factors and products are visible.',
          itemStyle: { color: '#93c5fd', borderColor: '#2563eb', borderWidth: 3 },
          children: [
            {
              name: 'Rows',
              description: 'Side-to-side equal groups.',
              itemStyle: { color: '#bfdbfe', borderColor: '#1d4ed8', borderWidth: 2 }
            },
            {
              name: 'Columns',
              description: 'Up-and-down equal groups.',
              itemStyle: { color: '#bae6fd', borderColor: '#0284c7', borderWidth: 2 }
            }
          ]
        },
        {
          name: 'Division\n12 ÷ 3 = 4',
          description: 'Separate a total into equal groups. The quotient is the answer.',
          itemStyle: { color: '#c4b5fd', borderColor: '#7c3aed', borderWidth: 3 },
          children: [
            {
              name: 'Quotient',
              description: 'The answer to a division problem.',
              itemStyle: { color: '#ddd6fe', borderColor: '#8b5cf6', borderWidth: 2 }
            },
            {
              name: 'Unknown\nfactor',
              description: 'The missing factor in a multiplication equation, such as 3 × ? = 12.',
              itemStyle: { color: '#fbcfe8', borderColor: '#db2777', borderWidth: 2 }
            }
          ]
        },
        {
          name: 'Decompose',
          description: 'Break a number or array into smaller parts.',
          itemStyle: { color: '#f9a8d4', borderColor: '#be185d', borderWidth: 3 },
          children: [
            {
              name: 'Number\nbond',
              description: 'Show a whole broken into parts.',
              itemStyle: { color: '#fbcfe8', borderColor: '#db2777', borderWidth: 2 }
            },
            {
              name: 'Distributive\nproperty',
              description: 'Break a fact apart, multiply the parts, then add.',
              itemStyle: { color: '#fecdd3', borderColor: '#e11d48', borderWidth: 2 }
            }
          ]
        },
        {
          name: 'Tape diagram\nand RDW',
          description: 'Read, Draw, Write uses a model to organize word problems before solving.',
          itemStyle: { color: '#fdba74', borderColor: '#ea580c', borderWidth: 3 },
          children: [
            {
              name: 'Read',
              description: 'Understand the story and what is known.',
              itemStyle: { color: '#fed7aa', borderColor: '#f97316', borderWidth: 2 }
            },
            {
              name: 'Draw',
              description: 'Show equal parts, total, and unknown.',
              itemStyle: { color: '#ffedd5', borderColor: '#fb923c', borderWidth: 2 }
            },
            {
              name: 'Write',
              description: 'Write equations and an answer sentence.',
              itemStyle: { color: '#fef3c7', borderColor: '#f59e0b', borderWidth: 2 }
            }
          ]
        }
      ]
    };

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        confine: true,
        borderColor: '#bfdbfe',
        formatter: (params: any) => {
          const name = String(params.data?.name ?? '').replace(/\n/g, ' ');
          return `<strong>${name}</strong><br>${params.data?.description ?? ''}`;
        }
      },
      series: [
        {
          type: 'tree',
          data: [root],
          layout: 'radial',
          top: '8%',
          bottom: '10%',
          left: '4%',
          right: '4%',
          symbol: 'circle',
          symbolSize: 70,
          lineStyle: {
            color: '#94a3b8',
            width: 2.4
          },
          label: {
            show: true,
            position: 'inside',
            rotate: 0,
            color: '#172033',
            fontSize: 12,
            fontWeight: 900,
            lineHeight: 15,
            overflow: 'break',
            width: 82
          },
          leaves: {
            label: {
              position: 'inside',
              rotate: 0,
              color: '#172033',
              fontSize: 11,
              fontWeight: 850,
              lineHeight: 14,
              overflow: 'break',
              width: 76
            }
          },
          expandAndCollapse: false,
          animationDuration: 450,
          animationDurationUpdate: 450,
          emphasis: {
            focus: 'descendant',
            lineStyle: {
              width: 4
            }
          }
        }
      ]
    };
    return option as unknown as EChartsOption;
  }
}
