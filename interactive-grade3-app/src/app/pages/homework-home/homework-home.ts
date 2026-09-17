import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

type HomeworkAssignment = {
  dateKey: string;
  month: string;
  date: string;
  year: string;
  subject: string;
  title: string;
  summary: string;
  pages: number;
  route: string;
};

@Component({
  selector: 'app-homework-home-page',
  imports: [NgFor, RouterLink],
  templateUrl: './homework-home.html',
  styleUrl: './homework-home.css'
})
export class HomeworkHomePage {
  readonly copyState = signal<'idle' | 'copying' | 'copied' | 'manual'>('idle');

  readonly homeworkPrompt = `Use $homework-from-photos for the attached homework photos or image paths.
Read .agents/skills/homework-from-photos/SKILL.md and follow it.

Add this homework to the existing Homework area in this project:
- Read every supplied page and cover all questions, subparts, and directions.
- Give correct solutions and clear, child-friendly explanations.
- Include relevant visuals, diagrams, or images that explain these exact questions.
- Use the full desktop width with readable text and large, useful visuals.
- Provide Concept, Blank, and Solved views; keep answers hidden in Blank.
- Preserve existing assignments and avoid duplicating this homework.
- Verify the answers and application changes, then give me the assignment link.

Choose the appropriate layout and teaching approach from the photos. Do not ask me to repeat these preferences. Ask only if an unreadable or missing detail prevents a correct answer.`;

  readonly assignments: HomeworkAssignment[] = [
    {
      dateKey: '2026-09-16',
      month: 'September 2026',
      date: 'September 16',
      year: '2026',
      subject: 'Spelling',
      title: 'Words with the /ü/ sound',
      summary: 'Wednesday and Thursday: solve a word riddle, learn science words, write a movie summary, and correct spellings.',
      pages: 2,
      route: '/ruchika/grade3/homework/2026-09-16'
    },
    {
      dateKey: '2026-08-17',
      month: 'August 2026',
      date: 'August 17',
      year: '2026',
      subject: 'Spelling',
      title: 'Short a and short o sounds',
      summary: 'Copy the spelling words, complete the passage, and name groups of animals.',
      pages: 2,
      route: '/ruchika/grade3/homework/2026-08-17'
    }
  ];

  private readonly assignmentsByNewest = [...this.assignments].sort((left, right) =>
    right.dateKey.localeCompare(left.dateKey)
  );

  readonly currentMonth = this.assignmentsByNewest[0]?.month ?? '';
  readonly currentMonthAssignments = this.assignmentsByNewest.filter(
    (assignment) => assignment.month === this.currentMonth
  );

  constructor(private readonly title: Title) {
    this.title.setTitle('Homework | Ruchika Grade 3 Learning Portal');
  }

  async copyHomeworkPrompt(): Promise<void> {
    this.copyState.set('copying');
    const fallbackTimer = window.setTimeout(() => {
      if (this.copyState() === 'copying') this.copyState.set('manual');
    }, 3000);
    try {
      await navigator.clipboard.writeText(this.homeworkPrompt);
      this.copyState.set('copied');
    } catch {
      this.copyState.set('manual');
    } finally {
      window.clearTimeout(fallbackTimer);
    }
  }
}
