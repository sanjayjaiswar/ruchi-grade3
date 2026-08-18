import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
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
  readonly assignments: HomeworkAssignment[] = [
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
}
