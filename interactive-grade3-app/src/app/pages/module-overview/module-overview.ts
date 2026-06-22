import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { findModule, lessonTitle } from '../../data/curriculum.data';
import { ModuleMeta } from '../../data/curriculum.types';

type ModuleConcept = {
  term: string;
  meaning: string;
  teacherLookFor: string;
};

type VocabularyComparisonRow = {
  operation: string;
  howToSayIt: string;
  example: string;
  answerName: string;
};

@Component({
  selector: 'app-module-overview-page',
  imports: [NgFor, NgIf, NgStyle, RouterLink],
  templateUrl: './module-overview.html',
  styleUrl: './module-overview.css'
})
export class ModuleOverviewPage implements OnInit {
  module?: ModuleMeta;
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
    m1: [
      {
        term: 'equal groups',
        meaning: 'Groups must have the same number in each group before multiplication or division makes sense.',
        teacherLookFor: 'Have the student name the number of groups and the size of each group.'
      },
      {
        term: 'factor and product',
        meaning: 'Factors are the numbers being multiplied. The product is the total.',
        teacherLookFor: 'Ask what each factor represents in the story, not only the answer.'
      },
      {
        term: 'division as unknown factor',
        meaning: 'Division finds a missing factor: either the group size or the number of groups.',
        teacherLookFor: 'Ask what the quotient means in context before accepting the number.'
      },
      {
        term: 'array',
        meaning: 'An array shows equal rows and columns, so factors and totals are visible.',
        teacherLookFor: 'Ask the student to connect rows, columns, and total to the equation.'
      }
    ],
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
    m1: { accent: '#c76a22', strong: '#8f470f', soft: '#fff1d8', muted: '#f5d49c' },
    m2: { accent: '#197c72', strong: '#0f5d55', soft: '#e1f6f1', muted: '#a9ddd3' },
    m3: { accent: '#6d5bd0', strong: '#4f3aa8', soft: '#eeebff', muted: '#c9c0ff' },
    m4: { accent: '#4f8a2f', strong: '#35681d', soft: '#ecf7df', muted: '#c3dfa8' },
    m5: { accent: '#c44f73', strong: '#943555', soft: '#ffedf2', muted: '#f4bfd0' },
    m6: { accent: '#2474a6', strong: '#18577d', soft: '#e5f4ff', muted: '#afd8f2' },
    m7: { accent: '#8a5a28', strong: '#684017', soft: '#fff0dc', muted: '#e8c494' }
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly title: Title
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
    });
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

  showMultiplicationDivisionVocabulary(): boolean {
    return this.module?.id === 'm1' || this.module?.id === 'm3';
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
}
