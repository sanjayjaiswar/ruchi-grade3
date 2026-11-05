import { SPELLING_LESSONS } from './spelling-data';
import { PUBLISHER_LESSONS } from './spelling-publisher-lessons';
import { SOLUTIONS_01_10 } from './spelling-solutions-01-10';
import { SOLUTIONS_11_20 } from './spelling-solutions-11-20';
import { SOLUTIONS_21_30 } from './spelling-solutions-21-30';
import { SolutionSection, ordered } from './spelling-solutions.types';

export interface SolvedSpellingPage {
  lesson: number;
  page: number;
  viewerPage: number;
  keyPage: number;
  keyViewerPage: number;
  sourceDocument: string;
  sections: readonly SolutionSection[];
}

const DETAILS = { ...SOLUTIONS_01_10, ...SOLUTIONS_11_20, ...SOLUTIONS_21_30 };

// Source: supplied Spectrum Spelling Grade 3 (Carson-Dellosa, 2015).
// Verified key sheets 153–186 reproduce consecutive printed workbook pages
// 6–141, four per sheet, INCLUDING review pages between numbered lessons.
// This mapping uses printed page numbers, never lesson number / key-sheet index.
export const SPELLING_SOLUTIONS: Readonly<Record<number, readonly SolvedSpellingPage[]>> =
  Object.fromEntries(SPELLING_LESSONS.map(lesson => {
    const wordPage = ordered('Spelling Words', PUBLISHER_LESSONS[lesson.number].direction, lesson.words.join(' / '), PUBLISHER_LESSONS[lesson.number].tip);
    const sections = [[wordPage], ...DETAILS[lesson.number]];
    return [lesson.number, sections.map((pageSections, offset) => {
      const page = lesson.page + offset;
      const keyPage = 153 + Math.floor((page - 6) / 4);
      return {
        lesson: lesson.number, page, viewerPage: page + 2,
        keyPage, keyViewerPage: keyPage + 2,
        sourceDocument: '/assets/spelling/spelling-grade-3.pdf',
        sections: pageSections
      };
    })];
  }));
