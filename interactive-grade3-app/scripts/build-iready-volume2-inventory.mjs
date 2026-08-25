import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const interactiveRoot = resolve(appRoot, 'src/app/pages/iready-interactive');
const pdfPath = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume2-396-pages-searchable.pdf');
const evidence = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-interactive.volume2-evidence.json'), 'utf8'));
const sessionRegistry = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-interactive.volume2-sessions.json'), 'utf8'));
const outputPath = resolve(interactiveRoot, 'iready-volume2-page-inventory.json');

if (!existsSync(pdfPath)) throw new Error(`Official searchable PDF is missing: ${pdfPath}`);

const lessons = [
  { unit: 4, number: 20, startPrintedPage: 473, endPrintedPage: 484 },
  { unit: 4, number: 21, startPrintedPage: 485, endPrintedPage: 496 },
  { unit: 4, number: 22, startPrintedPage: 497, endPrintedPage: 508 },
  { unit: 4, number: 23, startPrintedPage: 509, endPrintedPage: 536 },
  { unit: 4, number: 24, startPrintedPage: 537, endPrintedPage: 548 },
  { unit: 4, number: 25, startPrintedPage: 549, endPrintedPage: 564 },
  { unit: 4, number: 26, startPrintedPage: 565, endPrintedPage: 586 },
  { unit: 5, number: 27, startPrintedPage: 607, endPrintedPage: 634 },
  { unit: 5, number: 28, startPrintedPage: 635, endPrintedPage: 656 },
  { unit: 5, number: 29, startPrintedPage: 657, endPrintedPage: 680 },
  { unit: 6, number: 30, startPrintedPage: 699, endPrintedPage: 710 },
  { unit: 6, number: 31, startPrintedPage: 711, endPrintedPage: 732 },
  { unit: 6, number: 32, startPrintedPage: 733, endPrintedPage: 760 },
  { unit: 6, number: 33, startPrintedPage: 761, endPrintedPage: 778 }
];

const normalize = (value) => String(value)
  .normalize('NFKD')
  .replace(/[−–—]/g, '-')
  .replace(/\s+/g, ' ')
  .trim();
const hash = (value) => createHash('sha256').update(value).digest('hex');
const range = (value) => {
  const values = [...String(value).matchAll(/\d+/g)].map((match) => Number(match[0]));
  return { start: values[0], end: values[1] ?? values[0] };
};
const sessionRecords = sessionRegistry.sessions.map((session) => ({ ...session, ...range(session.printedPages) }));

const classification = (viewerPage, printedPage, text) => {
  if (viewerPage <= 12) return 'front-matter';
  if (viewerPage >= 337 && viewerPage <= 340) return 'data-talks';
  if (viewerPage >= 341 && viewerPage <= 352) return 'review-and-practice';
  if (viewerPage >= 353 && viewerPage <= 372) return 'glossary';
  if (viewerPage >= 373 && viewerPage <= 380) return 'california-correlations';
  if (viewerPage >= 381 && viewerPage <= 392) return 'index';
  if (viewerPage >= 393) return 'publishing-matter';
  if (printedPage === 467 || printedPage === 601 || printedPage === 693) return 'unit-self-check';
  if ([468, 469, 602, 603, 694, 695].includes(printedPage)) return 'big-ideas-organizer';
  if ((printedPage >= 470 && printedPage <= 472) || (printedPage >= 604 && printedPage <= 606) || (printedPage >= 696 && printedPage <= 698)) return 'unit-opening';
  const lesson = lessons.find((candidate) => printedPage >= candidate.startPrintedPage && printedPage <= candidate.endPrintedPage);
  if (lesson && printedPage <= lesson.startPrintedPage + 1) return 'family-letter-and-activity';
  const session = sessionRecords.find((candidate) => printedPage >= candidate.start && printedPage <= candidate.end);
  if (session) return 'lesson-session';
  if (/vocabulary/i.test(text)) return 'unit-vocabulary';
  if (/self reflection/i.test(text)) return 'unit-self-reflection';
  if (/performance task|math in action/i.test(text) || (printedPage >= 587 && printedPage <= 598) || (printedPage >= 681 && printedPage <= 690) || (printedPage >= 779 && printedPage <= 788)) return 'math-in-action-and-unit-review';
  return 'official-support';
};

const pages = [];
for (let viewerPage = 1; viewerPage <= 396; viewerPage += 1) {
  const physicalPdfPage = viewerPage === 1 ? 1 : Math.floor(viewerPage / 2) + 1;
  const side = viewerPage === 1 || viewerPage % 2 === 0 ? 'left' : 'right';
  const x = side === 'left' ? 0 : 1728;
  const sourceText = execFileSync('pdftotext', [
    '-layout',
    '-f', String(physicalPdfPage),
    '-l', String(physicalPdfPage),
    '-x', String(x),
    '-y', '0',
    '-W', '1728',
    '-H', '1822',
    pdfPath,
    '-'
  ], { encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
  const normalizedText = normalize(sourceText);
  const printedPage = viewerPage >= 13 && viewerPage <= 335 ? viewerPage + 454 : null;
  const unit = printedPage === null ? null : printedPage <= 600 ? 4 : printedPage <= 692 ? 5 : 6;
  const lesson = printedPage === null ? undefined : lessons.find((candidate) => printedPage >= candidate.startPrintedPage && printedPage <= candidate.endPrintedPage);
  const session = printedPage === null ? undefined : sessionRecords.find((candidate) => printedPage >= candidate.start && printedPage <= candidate.end);
  pages.push({
    viewerPage,
    printedPage,
    physicalPdfPage,
    side,
    unit,
    lesson: lesson?.number ?? null,
    session: session?.session ?? null,
    phase: session?.phase ?? null,
    kind: classification(viewerPage, printedPage, normalizedText),
    sourceTextSha256: hash(normalizedText),
    extraction: 'pdftotext-cropped-dual-page'
  });
  if (viewerPage % 40 === 0 || viewerPage === 396) process.stdout.write(`Inventoried ${viewerPage}/396 official viewer pages\n`);
}

const inventory = {
  schemaVersion: 1,
  program: evidence.program,
  publisher: evidence.publisher,
  grade: evidence.grade,
  volume: 2,
  sourceId: 'grade3-student-worktext-v2',
  officialViewerPages: '1–396',
  officialInstructionalPrintedPages: '467–789',
  generatedFrom: 'iReady-Maths/iready-grade3-volume2-396-pages-searchable.pdf',
  coverageStatus: 'complete-official-volume-inventory',
  lessons,
  sessions: sessionRegistry.sessions,
  pages
};

writeFileSync(outputPath, `${JSON.stringify(inventory, null, 2)}\n`);
process.stdout.write(`Wrote ${outputPath}\n`);
