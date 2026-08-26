import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const interactiveRoot = resolve(appRoot, 'src/app/pages/iready-interactive');
const teacherPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume2-540-pages-searchable.pdf');
const outputPath = resolve(interactiveRoot, 'iready-volume2-teacher-provenance.json');

const lessons = [
  { lesson: 20, start: 473, end: 484, teacherPdfStart: 25 },
  { lesson: 21, start: 485, end: 496, teacherPdfStart: 33 },
  { lesson: 22, start: 497, end: 508, teacherPdfStart: 41 },
  { lesson: 23, start: 509, end: 536, teacherPdfStart: 49 },
  { lesson: 24, start: 537, end: 548, teacherPdfStart: 67 },
  { lesson: 25, start: 549, end: 564, teacherPdfStart: 75 },
  { lesson: 26, start: 565, end: 586, teacherPdfStart: 85 },
  { lesson: 27, start: 607, end: 634, teacherPdfStart: 120 },
  { lesson: 28, start: 635, end: 656, teacherPdfStart: 136 },
  { lesson: 29, start: 657, end: 678, teacherPdfStart: 149 },
  { lesson: 30, start: 699, end: 710, teacherPdfStart: 184 },
  { lesson: 31, start: 711, end: 732, teacherPdfStart: 192 },
  { lesson: 32, start: 733, end: 760, teacherPdfStart: 205 },
  { lesson: 33, start: 761, end: 776, teacherPdfStart: 221 }
];

const normalize = (value) => String(value).normalize('NFKD').replace(/[−–—]/g, '-').replace(/\s+/g, ' ').trim();
const hash = (value) => createHash('sha256').update(value).digest('hex');
const spreads = [];

for (const lesson of lessons) {
  for (let studentStart = lesson.start; studentStart <= lesson.end; studentStart += 2) {
    const teacherPdfPage = lesson.teacherPdfStart + Math.floor((studentStart - lesson.start) / 2);
    const teacherViewerStart = teacherPdfPage * 2 - 2;
    const text = execFileSync('pdftotext', ['-layout', '-f', String(teacherPdfPage), '-l', String(teacherPdfPage), teacherPdf, '-'], {
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024
    });
    spreads.push({
      lesson: lesson.lesson,
      studentPages: `${studentStart}–${Math.min(studentStart + 1, lesson.end)}`,
      teacherGuideViewerPages: `${teacherViewerStart}–${teacherViewerStart + 1}`,
      teacherPdfPage,
      sourceTextSha256: hash(normalize(text))
    });
  }
}

const registry = {
  schemaVersion: 1,
  program: 'i-ready-classroom-mathematics-california',
  publisher: 'Curriculum Associates',
  grade: 3,
  volume: 2,
  studentSourceId: 'grade3-student-worktext-v2',
  teacherSourceId: 'grade3-teacher-guide-v2',
  coverageStatus: 'complete-lesson-page-to-teacher-spread-map',
  spreads
};
writeFileSync(outputPath, `${JSON.stringify(registry, null, 2)}\n`);
process.stdout.write(`Mapped ${spreads.length} official Student Worktext spreads to Teacher Guide Volume 2.\n`);
