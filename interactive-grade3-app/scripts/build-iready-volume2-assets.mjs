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

    const spreadWidth = 1920;
    const spreadHeight = 1012;
    if (physicalPage === 1) {
      const destination = resolve(sourceScratch, 'viewer-001.jpg');
      const webp = resolve(sourceOutput, 'viewer-001.webp');
      execFileSync('sips', ['--cropToHeightWidth', String(spreadHeight), String(spreadWidth / 2), '--cropOffset', '0', '0', spreadPath, '--out', destination], { stdio: 'ignore' });
      execFileSync('cwebp', ['-quiet', '-q', '60', '-m', '6', destination, '-o', webp]);
      rmSync(destination, { force: true });
    } else {
      const leftViewerPage = physicalPage * 2 - 2;
      const rightViewerPage = physicalPage * 2 - 1;
      if (leftViewerPage <= source.logicalPages) {
        const destination = resolve(sourceScratch, `viewer-${String(leftViewerPage).padStart(3, '0')}.jpg`);
        const webp = resolve(sourceOutput, `viewer-${String(leftViewerPage).padStart(3, '0')}.webp`);
        execFileSync('sips', ['--cropToHeightWidth', String(spreadHeight), String(spreadWidth / 2), '--cropOffset', '0', '0', spreadPath, '--out', destination], { stdio: 'ignore' });
        execFileSync('cwebp', ['-quiet', '-q', '60', '-m', '6', destination, '-o', webp]);
        rmSync(destination, { force: true });
      }
      if (rightViewerPage <= source.logicalPages) {
        const destination = resolve(sourceScratch, `viewer-${String(rightViewerPage).padStart(3, '0')}.jpg`);
        const webp = resolve(sourceOutput, `viewer-${String(rightViewerPage).padStart(3, '0')}.webp`);
        execFileSync('sips', ['--cropToHeightWidth', String(spreadHeight), String(spreadWidth / 2), '--cropOffset', '0', String(spreadWidth / 2), spreadPath, '--out', destination], { stdio: 'ignore' });
        execFileSync('cwebp', ['-quiet', '-q', '60', '-m', '6', destination, '-o', webp]);
        rmSync(destination, { force: true });
      }
    }
    rmSync(spreadPath, { force: true });
    if (physicalPage % 25 === 0 || physicalPage === physicalPages) {
      process.stdout.write(`${source.name}: rendered ${physicalPage}/${physicalPages} official spreads\n`);
    }
  }
}

process.stdout.write(`Volume 2 official page assets written to ${assetRoot}\n`);
