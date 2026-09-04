import { execFile, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
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
const scratchRoot = resolve(appRoot, 'tmp/pdfs/iready-volume2-assets');
const assetRoot = resolve(appRoot, 'public/assets/iready-volume2');

// The approved PDFs are native-resolution captures of the official online
// reader. At 72 dpi each capture is exactly 3456 x 1822 pixels. The rectangles
// below are the clean logical-page canvases inside that reader capture; they
// deliberately exclude the title bar, arrows, notes, zoom controls, and logo.
const CAPTURE_WIDTH = 3456;
const PAGE_TOP = 101;
const PAGE_HEIGHT = 1628;
const PAGE_SEAM = CAPTURE_WIDTH / 2;

const sources = [
  {
    name: 'student',
    pdf: resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume2-396-pages-searchable.pdf'),
    logicalPages: 396,
    left: 460,
    pageWidth: 1268
  },
  {
    name: 'teacher',
    pdf: resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume2-540-pages-searchable.pdf'),
    logicalPages: 540,
    left: 342,
    pageWidth: 1386
  }
];

for (const source of sources) {
  if (!existsSync(source.pdf)) throw new Error(`Missing official source: ${source.pdf}`);
  const sourceScratch = resolve(scratchRoot, source.name);
  const sourceOutput = resolve(assetRoot, source.name);
  mkdirSync(sourceScratch, { recursive: true });
  mkdirSync(sourceOutput, { recursive: true });

  const physicalPages = Math.ceil((source.logicalPages + 1) / 2);
  const writeLogicalPage = (viewerPage, cropX, spreadPath) => {
    const webp = resolve(sourceOutput, `viewer-${String(viewerPage).padStart(3, '0')}.webp`);
    return () => execFileAsync('cwebp', [
      '-quiet',
      '-q', '90',
      '-m', '4',
      '-sharp_yuv',
      '-crop', String(cropX), String(PAGE_TOP), String(source.pageWidth), String(PAGE_HEIGHT),
      spreadPath,
      '-o', webp
    ]);
  };

  const batchSize = 25;
  for (let batchStart = 1; batchStart <= physicalPages; batchStart += batchSize) {
    const batchEnd = Math.min(physicalPages, batchStart + batchSize - 1);
    const prefix = resolve(sourceScratch, `batch-${String(batchStart).padStart(3, '0')}`);
    execFileSync('pdftoppm', [
      '-f', String(batchStart),
      '-l', String(batchEnd),
      '-jpeg',
      '-jpegopt', 'quality=95,optimize=y',
      '-r', '72',
      source.pdf,
      prefix
    ], { stdio: 'ignore' });

    const jobs = [];
    const spreadPaths = [];
    for (let physicalPage = batchStart; physicalPage <= batchEnd; physicalPage += 1) {
      const spreadPath = `${prefix}-${String(physicalPage).padStart(3, '0')}.jpg`;
      spreadPaths.push(spreadPath);
      if (physicalPage === 1) {
        // The cover is centered on the official single-page opening canvas.
        jobs.push(writeLogicalPage(1, PAGE_SEAM - source.pageWidth / 2, spreadPath));
      } else {
        const leftViewerPage = physicalPage * 2 - 2;
        const rightViewerPage = physicalPage * 2 - 1;
        if (leftViewerPage <= source.logicalPages) jobs.push(writeLogicalPage(leftViewerPage, source.left, spreadPath));
        if (rightViewerPage <= source.logicalPages) jobs.push(writeLogicalPage(rightViewerPage, PAGE_SEAM, spreadPath));
      }
    }
    await runConcurrent(jobs);
    for (const spreadPath of spreadPaths) rmSync(spreadPath, { force: true });
    process.stdout.write(`${source.name}: rendered ${batchEnd}/${physicalPages} clean official spreads\n`);
  }
}

process.stdout.write(`Volume 2 clean single-page assets written to ${assetRoot}\n`);
