import { NgClass, NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
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
  feedback?: Feedback;

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
    this.feedback = undefined;
  }

  checkGroupCount(): void {
    if (this.groupCountAnswer === this.groupCount) {
      this.feedback = {
        status: 'correct',
        title: 'Correct',
        body: `There are ${this.groupCount} equal groups. Each group has ${this.groupSize}, so the total is ${this.total}.`
      };
      return;
    }
    this.feedback = {
      status: 'needs-work',
      title: 'Count the groups again',
      body: 'The number of groups is the number of containers, not the number inside one container.'
    };
  }

  checkRepeatedAddition(): void {
    const normalized = this.repeatedBlank.replace(/\s/g, '');
    const accepted = ['2+2+2+2+2+2=12', '2+2+2+2+2+2'].includes(normalized);
    this.feedback = accepted
      ? {
          status: 'correct',
          title: 'The addition matches the picture',
          body: 'Each 2 in the repeated addition sentence matches one equal group of 2 counters.'
        }
      : {
          status: 'needs-work',
          title: 'Match one addend to one group',
          body: 'There are 6 groups of 2, so the repeated addition should show six 2s.'
        };
  }

  checkMultiplication(): void {
    this.feedback =
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
          };
  }

  checkEqualGroups(): void {
    this.feedback =
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
          };
  }

  checkExit(): void {
    const additionOk =
      this.exitAdditionA.trim() === '2' &&
      this.exitAdditionB.trim() === '2' &&
      this.exitAdditionC.trim() === '2' &&
      this.exitProduct.trim() === '8' &&
      this.exitFactor.trim() === '2';

    this.feedback = additionOk
      ? {
          status: 'correct',
          title: 'Lesson 1 takeaway is in place',
          body: 'Four groups of 2 can be written as 2 + 2 + 2 + 2 = 8 and 4 x 2 = 8.'
        }
      : {
          status: 'needs-work',
          title: 'Use the picture to fill every blank',
          body: 'The picture shows 4 equal groups. Each group has 2 slices, for a total of 8.'
        };
  }

  completeGenericStep(): void {
    this.feedback = {
      status: 'correct',
      title: 'Checked against the lesson objective',
      body: 'Use the teacher-edition objective, the module model, and the lesson words together. Your explanation should stay tied to those three parts.'
    };
  }
}
