import practiceRegistry from './reading-practice.data.json';
import { ReadingSelection, ReadingUnit, ReadingWeek, weekForLesson } from './reading-curriculum.data';

export type PracticeFocusKey = 'reading-0' | 'reading-1' | 'reading-2' | 'writing' | 'word-study';

export type ReadingPracticeDay = {
  day: number;
  title: string;
  roles: ReadingSelection['role'][];
  focus: PracticeFocusKey;
  product: string;
  task: string;
  check: string;
};

type PracticeRegistry = Record<string, ReadingPracticeDay[]>;

export const READING_PRACTICE = practiceRegistry as PracticeRegistry;

export const practiceKey = (unit: ReadingUnit, week: ReadingWeek): string => `${unit.id}-w${week.number}`;

export const practiceDaysForWeek = (unit: ReadingUnit, week: ReadingWeek): ReadingPracticeDay[] =>
  READING_PRACTICE[practiceKey(unit, week)] ?? [];

export const practiceDayForLesson = (unit: ReadingUnit, lessonNumber: number): ReadingPracticeDay => {
  const week = weekForLesson(unit, lessonNumber);
  const practiceDay = practiceDaysForWeek(unit, week)[(lessonNumber - 1) % 5];
  if (!practiceDay) throw new Error(`Missing reading practice for ${practiceKey(unit, week)} day ${((lessonNumber - 1) % 5) + 1}.`);
  return practiceDay;
};

export const selectionsForPractice = (week: ReadingWeek, practiceDay: ReadingPracticeDay): ReadingSelection[] =>
  practiceDay.roles.map((role) => {
    const selection = week.selections.find((candidate) => candidate.role === role);
    if (!selection) throw new Error(`Missing ${role} in Week ${week.number}.`);
    return selection;
  });

export const officialFocusForPractice = (week: ReadingWeek, practiceDay: ReadingPracticeDay): string => {
  if (practiceDay.focus === 'writing') return week.writingFocus;
  if (practiceDay.focus === 'word-study') return week.wordStudy;
  return week.readingFocus[Number(practiceDay.focus.slice(-1))];
};

export const lessonLabel = (unit: ReadingUnit, lessonNumber: number): string => {
  const week = weekForLesson(unit, lessonNumber);
  const practiceDay = practiceDayForLesson(unit, lessonNumber);
  return `P${lessonNumber}: W${week.number} · ${practiceDay.title}`;
};
