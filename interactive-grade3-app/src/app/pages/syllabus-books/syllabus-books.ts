import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import {
  GRADE3_CMC_BOOKS,
  GRADE3_CMC_UNITS,
  SYLLABUS_BOOKS_SOURCES
} from './syllabus-books.data';

type ReferencePageKind = 'overview' | 'books' | 'curriculum' | 'classroom' | 'access' | 'sources';

interface ClassroomReferenceGroup {
  title: string;
  boundary: string;
  evidence: string;
  items: string[];
}

@Component({
  selector: 'app-syllabus-books-page',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './syllabus-books.html',
  styleUrl: './syllabus-books.css'
})
export class SyllabusBooksPage implements OnDestroy {
  readonly books = GRADE3_CMC_BOOKS;
  readonly units = GRADE3_CMC_UNITS;
  readonly sources = SYLLABUS_BOOKS_SOURCES;
  readonly unitPacingDays = GRADE3_CMC_UNITS.reduce((total, unit) => total + unit.pacingDays, 0);
  readonly classroomReferenceGroups: ClassroomReferenceGroup[] = [
    {
      title: 'Recurring series and collections',
      boundary: 'Visible shelf presence only; multiple volumes or copies may appear.',
      evidence: 'Classroom shelf photos 181615–181627',
      items: [
        'Little House series',
        'Little Apple chapter-book collection',
        'Animal Ark series',
        'My Weird School and My Weird School Daze books',
        'Wayside School books',
        'Amber Brown books',
        'Horrible Harry books',
        'Dog Man books',
        'The Puppy Place books',
        'Barbie chapter books'
      ]
    },
    {
      title: 'Clearly readable individual titles',
      boundary: 'Title-level transcription only; exact edition, ISBN, and assignment status are not inferred.',
      evidence: 'Classroom shelf photos 181615–181627',
      items: [
        'Pippi Longstocking',
        'Mr. Popper’s Penguins',
        'The BFG',
        'Stuart Little',
        'The Hero Two Doors Down',
        'Miracles on Maple Hill',
        'The Hundred Dresses',
        'The Best School Year Ever',
        'Sarah, Plain and Tall',
        'The Mostly True Adventures of Homer P. Figg',
        'I Survived the Destruction of Pompeii, AD 79',
        'Wayside School Is Falling Down'
      ]
    },
    {
      title: 'Other photographed classroom material',
      boundary: 'Observed classroom material, not an official syllabus or proof of current pacing.',
      evidence: 'Classroom photos 181748, 182025, and 182030',
      items: [
        'A “Math About Me” student activity; student-written details are intentionally not reproduced',
        'A classroom schedule board naming Literacy, Math, Read Aloud, Writing, and Social Studies / Science / Art',
        'A projected Social Studies topic-and-skills table covering geography, communities, economics, government, citizenship, history, and related source skills'
      ]
    }
  ];
  pageKind: ReferencePageKind = 'overview';
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly title: Title
  ) {
    this.subscriptions.add(
      this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => this.syncRoute())
    );
    this.syncRoute();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private syncRoute(): void {
    const path = this.router.url.split(/[?#]/, 1)[0];
    if (path.endsWith('/books')) this.pageKind = 'books';
    else if (path.endsWith('/curriculum')) this.pageKind = 'curriculum';
    else if (path.endsWith('/classroom-library')) this.pageKind = 'classroom';
    else if (path.endsWith('/access')) this.pageKind = 'access';
    else if (path.endsWith('/sources')) this.pageKind = 'sources';
    else this.pageKind = 'overview';

    const titles: Record<ReferencePageKind, string> = {
      overview: 'Classroom Grade 3 Syllabus & Books Reference',
      books: 'Grade 3 Math Book Matches',
      curriculum: 'Grade 3 Math Book Sequence',
      classroom: 'Grade 3 Classroom Library Reference',
      access: 'Grade 3 Math Book Access',
      sources: 'Grade 3 Math Reference Sources'
    };
    this.title.setTitle(`${titles[this.pageKind]} | Ruchika Learning Portal`);
  }
}
