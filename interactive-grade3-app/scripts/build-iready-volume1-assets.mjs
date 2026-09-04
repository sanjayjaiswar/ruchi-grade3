import { execFile, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const runConcurrent = async (jobs, concurrency = 8) => {
  for (let index = 0; index < jobs.length; index += concurrency) {
    await Promise.all(jobs.slice(index, index + concurrency).map((job) => job()));
  }
};

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const scratchRoot = resolve(appRoot, 'tmp/pdfs/iready-volume1-assets');
const studentOutput = resolve(appRoot, 'public/assets/iready-volume1/student');
const teacherOutput = resolve(appRoot, 'public/assets/iready-volume1/teacher-pages');
const studentPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume1-548-pages-searchable.pdf');
const teacherPdf = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf');

for (const source of [studentPdf, teacherPdf]) {
  if (!existsSync(source)) throw new Error(`Missing official source: ${source}`);
}
mkdirSync(scratchRoot, { recursive: true });
mkdirSync(studentOutput, { recursive: true });
mkdirSync(teacherOutput, { recursive: true });

// Printed p. 1 is PDF viewer p. 13. Render the complete locally exposed
// printed-page range at one consistent width and high JPEG quality.
for (let printedPage = 1; printedPage <= (process.env.IREADY_SKIP_STUDENT === '1' ? 0 : 465); printedPage += 1) {
  const pdfPage = printedPage + 12;
  const prefix = resolve(scratchRoot, `student-${String(printedPage).padStart(3, '0')}`);
  const renderedPath = `${prefix}.jpg`;
  const outputPath = resolve(studentOutput, `p-${String(printedPage).padStart(3, '0')}.jpg`);
  execFileSync('pdftoppm', [
    '-f', String(pdfPage),
    '-l', String(pdfPage),
    '-singlefile',
    '-jpeg',
    '-jpegopt', 'quality=94,optimize=y',
    '-scale-to-x', '1268',
    '-scale-to-y', '-1',
    studentPdf,
    prefix
  ], { stdio: 'ignore' });
  rmSync(outputPath, { force: true });
  renameSync(renderedPath, outputPath);
  if (printedPage % 50 === 0 || printedPage === 465) {
    process.stdout.write(`student: rendered ${printedPage}/465 clean official pages\n`);
  }
}

// Teacher Guide PDFs contain two logical reader pages per physical capture.
// Render at the capture's native resolution, then crop each logical page out
// of the viewer frame so every output is exactly one readable page.
const CAPTURE_WIDTH = 3456;
const PAGE_SEAM = CAPTURE_WIDTH / 2;
const PAGE_LEFT = 342;
const PAGE_TOP = 101;
const PAGE_WIDTH = 1386;
const PAGE_HEIGHT = 1628;
const logicalPages = 764;
const physicalPages = Math.ceil((logicalPages + 1) / 2);

const writeTeacherPage = (readerPage, cropX, spreadPath) => {
  const outputPath = resolve(teacherOutput, `reader-${String(readerPage).padStart(3, '0')}.webp`);
  return () => execFileAsync('cwebp', [
    '-quiet',
    '-q', '90',
    '-m', '4',
    '-sharp_yuv',
    '-crop', String(cropX), String(PAGE_TOP), String(PAGE_WIDTH), String(PAGE_HEIGHT),
    spreadPath,
    '-o', outputPath
  ]);
};

const batchSize = 25;
for (let batchStart = 1; batchStart <= physicalPages; batchStart += batchSize) {
  const batchEnd = Math.min(physicalPages, batchStart + batchSize - 1);
  const prefix = resolve(scratchRoot, `teacher-batch-${String(batchStart).padStart(3, '0')}`);
  execFileSync('pdftoppm', [
    '-f', String(batchStart),
    '-l', String(batchEnd),
    '-jpeg',
    '-jpegopt', 'quality=95,optimize=y',
    '-r', '72',
    teacherPdf,
    prefix
  ], { stdio: 'ignore' });

  const jobs = [];
  const spreadPaths = [];
  for (let physicalPage = batchStart; physicalPage <= batchEnd; physicalPage += 1) {
    const spreadPath = `${prefix}-${String(physicalPage).padStart(3, '0')}.jpg`;
    spreadPaths.push(spreadPath);
    if (physicalPage === 1) {
      jobs.push(writeTeacherPage(1, PAGE_SEAM - PAGE_WIDTH / 2, spreadPath));
    } else {
      const leftReaderPage = physicalPage * 2 - 2;
      const rightReaderPage = physicalPage * 2 - 1;
      if (leftReaderPage <= logicalPages) jobs.push(writeTeacherPage(leftReaderPage, PAGE_LEFT, spreadPath));
      if (rightReaderPage <= logicalPages) jobs.push(writeTeacherPage(rightReaderPage, PAGE_SEAM, spreadPath));
    }
  }
  await runConcurrent(jobs);
  for (const spreadPath of spreadPaths) rmSync(spreadPath, { force: true });
  process.stdout.write(`teacher: rendered ${batchEnd}/${physicalPages} clean official spreads\n`);
}

process.stdout.write('Volume 1 clean single-page Student and Teacher assets written.\n');
