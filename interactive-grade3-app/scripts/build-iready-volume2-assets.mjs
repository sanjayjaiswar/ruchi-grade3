import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const scratchRoot = resolve(appRoot, 'tmp/pdfs/iready-volume2-assets');
const assetRoot = resolve(appRoot, 'public/assets/iready-volume2');

const sources = [
  {
    name: 'student',
    pdf: resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume2-396-pages-searchable.pdf'),
    logicalPages: 396
  },
  {
    name: 'teacher',
    pdf: resolve(workspaceRoot, 'iReady-Maths/iready-grade3-teacher-guide-volume2-540-pages-searchable.pdf'),
    logicalPages: 540
  }
];

for (const source of sources) {
  if (!existsSync(source.pdf)) throw new Error(`Missing official source: ${source.pdf}`);
  const sourceScratch = resolve(scratchRoot, source.name);
  const sourceOutput = resolve(assetRoot, source.name);
  mkdirSync(sourceScratch, { recursive: true });
  mkdirSync(sourceOutput, { recursive: true });

  const physicalPages = Math.ceil((source.logicalPages + 1) / 2);
  const spreadWidth = 1920;
  const spreadHeight = 1012;
  const writeLogicalPage = (viewerPage, cropX, spreadPath) => {
    const webp = resolve(sourceOutput, `viewer-${String(viewerPage).padStart(3, '0')}.webp`);
    execFileSync('cwebp', [
      '-quiet',
      '-q', '60',
      '-m', '6',
      '-crop', String(cropX), '0', String(spreadWidth / 2), String(spreadHeight),
      spreadPath,
      '-o', webp
    ]);
  };
  for (let physicalPage = 1; physicalPage <= physicalPages; physicalPage += 1) {
    const prefix = resolve(sourceScratch, `spread-${String(physicalPage).padStart(3, '0')}`);
    const spreadPath = `${prefix}.jpg`;
    execFileSync('pdftoppm', [
      '-f', String(physicalPage),
      '-l', String(physicalPage),
      '-singlefile',
      '-jpeg',
      '-jpegopt', 'quality=68,optimize=y',
      '-r', '40',
      source.pdf,
      prefix
    ], { stdio: 'ignore' });

    if (physicalPage === 1) {
      // The publisher centers the single cover page on the first physical
      // canvas. A centered half-width crop preserves the complete cover.
      writeLogicalPage(1, spreadWidth / 4, spreadPath);
    } else {
      const leftViewerPage = physicalPage * 2 - 2;
      const rightViewerPage = physicalPage * 2 - 1;
      if (leftViewerPage <= source.logicalPages) {
        writeLogicalPage(leftViewerPage, 0, spreadPath);
      }
      if (rightViewerPage <= source.logicalPages) {
        writeLogicalPage(rightViewerPage, spreadWidth / 2, spreadPath);
      }
    }
    rmSync(spreadPath, { force: true });
    if (physicalPage % 25 === 0 || physicalPage === physicalPages) {
      process.stdout.write(`${source.name}: rendered ${physicalPage}/${physicalPages} official spreads\n`);
    }
  }
}

process.stdout.write(`Volume 2 official page assets written to ${assetRoot}\n`);
