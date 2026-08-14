export type ReadingOfficialLesson = {
  id: string;
  unitId: string;
  unitNumber: number;
  weekNumber: number;
  lessonNumber: number;
  title: string;
  studentBook: string;
  studentPages: string;
  objective: string;
  keyVocabulary: string[];
  cognates: string[];
  sourceUrl: string;
  sourceLabel: string;
  sourceFingerprint: string;
  sourceBoundary: string;
};

export const BENCHMARK_GRADE3_PROGRAM_SAMPLE =
  'https://onlinepublications.s3.us-east-2.amazonaws.com/BEC-eCom/B8107_ALL_Flyer_lores.pdf';

// This is the only daily lesson currently admitted by the Reading source gate.
// The official public Benchmark sample identifies the lesson, student text/page,
// objective, vocabulary, teacher sequence, and final comprehension question.
// It does not reproduce the student passage, so the portal requires the school book.
export const WORKING_TOGETHER_LESSON: ReadingOfficialLesson = {
  id: 'u1-w1-l1',
  unitId: 'u1',
  unitNumber: 1,
  weekNumber: 1,
  lessonNumber: 1,
  title: 'Working Together',
  studentBook: 'Texts for Close Reading',
  studentPages: 'pages 4–5',
  objective: 'I can explain how people work together to solve a problem.',
  keyVocabulary: ['elected', 'flooding', 'government', 'officials', 'prepare', 'sandbag', 'team'],
  cognates: ['government (gobierno)', 'national (nacional)', 'service (servicio)'],
  sourceUrl: `${BENCHMARK_GRADE3_PROGRAM_SAMPLE}#page=7`,
  sourceLabel: 'Benchmark Education Advancing Language Learning official program sample, Grade 3 Unit 1 Week 1, Guide to Build, Transfer, and Apply, page 1',
  sourceFingerprint: 'SHA-256 191111faa89f9e32fc429d4a5ea5ab630c5b509764d45a6498f788f491ca2a84',
  sourceBoundary: 'The public sample supplies the teacher guidance but not the full student passage. Use the school Texts for Close Reading book for every passage detail and answer.'
};

export function admittedReadingLesson(unitId: string | null, lessonNumber: number): ReadingOfficialLesson | null {
  return unitId === WORKING_TOGETHER_LESSON.unitId && lessonNumber === WORKING_TOGETHER_LESSON.lessonNumber
    ? WORKING_TOGETHER_LESSON
    : null;
}
