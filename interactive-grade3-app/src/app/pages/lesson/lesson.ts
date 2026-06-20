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
  l4FairShareAnswer: number | null = null;
  l4UnknownMeaning = '';
  l4DianaSentence = '';
  l4EightDivFour: number | null = null;
  l4ExitDivisor = '';
  l4ExitQuotient = '';
  l4ExitFifteen = '';
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
    this.l4FairShareAnswer = null;
    this.l4UnknownMeaning = '';
    this.l4DianaSentence = '';
    this.l4EightDivFour = null;
    this.l4ExitDivisor = '';
    this.l4ExitQuotient = '';
    this.l4ExitFifteen = '';
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

  checkL4FairShare(): void {
    this.feedback =
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
          };
  }

  checkL4UnknownMeaning(): void {
    this.feedback =
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
          };
  }

  checkL4DianaSentence(): void {
    this.feedback =
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
          };
  }

  checkL4EightDivFour(): void {
    this.feedback =
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
          };
  }

  checkL4Exit(): void {
    const exitOk =
      this.l4ExitDivisor.trim() === '4' &&
      this.l4ExitQuotient.trim() === '4' &&
      this.l4ExitFifteen.trim() === '5';

    this.feedback = exitOk
      ? {
          status: 'correct',
          title: 'Lesson 4 takeaway is in place',
          body: 'Both answers tell the size of each group: 16 glue sticks in 4 groups makes 4 in each group, and 15 divided into 3 groups makes 5 in each group.'
        }
      : {
          status: 'needs-work',
          title: 'Each answer should mean group size',
          body: 'For 16 divided by 4, the 4 after the division sign is the number of groups. The quotient is how many glue sticks go in each group. For 15 divided by 3, share 15 into 3 equal groups.'
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
