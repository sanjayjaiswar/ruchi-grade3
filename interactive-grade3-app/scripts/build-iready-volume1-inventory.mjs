import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(appRoot, '..');
const interactiveRoot = resolve(appRoot, 'src/app/pages/iready-interactive');
const pdfPath = resolve(workspaceRoot, 'iReady-Maths/iready-grade3-volume1-548-pages-searchable.pdf');
const evidence = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-interactive.evidence.json'), 'utf8'));
const expanded = JSON.parse(readFileSync(resolve(interactiveRoot, 'iready-interactive.volume1-sessions.json'), 'utf8'));
const outputPath = resolve(interactiveRoot, 'iready-volume1-page-inventory.json');
const scratchRoot = resolve(appRoot, 'tmp/pdfs/iready-volume1-inventory');
const useOcr = process.argv.includes('--ocr');

if (!existsSync(pdfPath)) throw new Error(`Official searchable PDF is missing: ${pdfPath}`);
mkdirSync(scratchRoot, { recursive: true });

const lessonSource = readFileSync(resolve(appRoot, 'src/app/pages/syllabus-books/syllabus-books.data.ts'), 'utf8');
const volumeOneStart = lessonSource.indexOf('export const GRADE3_CMC_UNITS');
const volumeOneBlock = lessonSource.slice(volumeOneStart, lessonSource.indexOf('    number: 4,', volumeOneStart));
const lessons = [...volumeOneBlock.matchAll(/\{ number: (\d+), title: '([^']+)', standards: '([^']+)', printPage: (\d+), sessions: (\d+) \}/g)]
  .map((match) => ({
    number: Number(match[1]),
    title: match[2],
    standards: match[3],
    startPrintedPage: Number(match[4]),
    sessionCount: Number(match[5])
  }));
if (lessons.length !== 19) throw new Error(`Expected 19 Volume 1 lessons; found ${lessons.length}`);

const sessionRecords = [...evidence.interactions, ...(expanded.sessions ?? [])].map((session) => {
  const numbers = [...String(session.printedPages).matchAll(/\d+/g)].map((match) => Number(match[0]));
  return {
    unit: session.unit,
    lesson: session.lesson,
    session: session.session,
    phase: session.phase,
    title: session.title,
    start: numbers[0],
    end: numbers[1] ?? numbers[0]
  };
});

const unitForPage = (page) => page <= 91 ? 1 : page <= 303 ? 2 : 3;
const sessionForPage = (page) => sessionRecords.find((session) => page >= session.start && page <= session.end);
const lessonForPage = (page) => {
  const candidates = lessons.filter((lesson) => lesson.startPrintedPage <= page);
  return candidates[candidates.length - 1];
};
const normalize = (value) => String(value)
  .normalize('NFKD')
  .replace(/[−–—]/g, '-')
  .replace(/\s+/g, ' ')
  .trim();
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const problemSignals = (text) => {
  const labels = new Set();
  for (const match of text.matchAll(/^\s*(\d{1,2})\s*[).:]\s+(?=[A-Z])/gm)) {
    const number = Number(match[1]);
    if (number > 0 && number <= 40) labels.add(number);
  }
  for (const match of text.matchAll(/\bproblems?\s+(\d{1,2})(?:\s*[-–]\s*(\d{1,2}))?/gi)) {
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    if (start > 0 && end >= start && end <= 40) {
      for (let number = start; number <= end; number += 1) labels.add(number);
    }
  }
  return [...labels].sort((left, right) => left - right);
};
const pageKind = (text, session) => {
  if (session) return 'lesson-session';
  if (/performance task/i.test(text)) return 'performance-task';
  if (/unit assessment|assessment/i.test(text)) return 'assessment';
  if (/big ideas/i.test(text)) return 'unit-overview';
  if (/dear family/i.test(text)) return 'lesson-introduction';
  return 'publisher-support';
};
const visualKeywords = /array|bar graph|picture graph|number line|base-ten|diagram|model|tile|area|table|chart|draw|shade|fraction|symbol|grid/i;

const pages = [];
for (let printedPage = 1; printedPage <= 465; printedPage += 1) {
  const viewerPage = printedPage + 12;
  const sourceText = execFileSync('pdftotext', ['-layout', '-f', String(viewerPage), '-l', String(viewerPage), pdfPath, '-'], {
    encoding: 'utf8',
    maxBuffer: 4 * 1024 * 1024
  });
  let ocrText = '';
  if (useOcr) {
    const imagePrefix = resolve(scratchRoot, `page-${viewerPage}`);
    const imagePath = `${imagePrefix}.jpg`;
    execFileSync('pdftoppm', ['-f', String(viewerPage), '-l', String(viewerPage), '-singlefile', '-jpeg', '-jpegopt', 'quality=70', '-r', '110', pdfPath, imagePrefix], { stdio: 'ignore' });
    ocrText = execFileSync('tesseract', [imagePath, 'stdout', '--psm', '6'], { encoding: 'utf8', maxBuffer: 4 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
    rmSync(imagePath, { force: true });
  }
  const normalizedText = normalize(sourceText);
  const normalizedOcr = normalize(ocrText);
  const combinedText = `${sourceText}\n${ocrText}`;
  const session = sessionForPage(printedPage);
  const lesson = session ? lessons.find((candidate) => candidate.number === session.lesson) : lessonForPage(printedPage);
  pages.push({
    printedPage,
    viewerPage,
    unit: unitForPage(printedPage),
    lesson: session?.lesson ?? lesson?.number ?? null,
    session: session?.session ?? null,
    phase: session?.phase ?? null,
    kind: pageKind(combinedText, session),
    problemNumbers: problemSignals(combinedText),
    hasMathJournal: /math journal/i.test(combinedText),
    hasApplyIt: /apply it/i.test(combinedText),
    hasConnectIt: /connect it/i.test(combinedText),
    visualReviewRequired: visualKeywords.test(combinedText) || normalizedText.length < 80,
    sourceTextSha256: sha256(normalizedText),
    ocrTextSha256: useOcr ? sha256(normalizedOcr) : null,
    extraction: useOcr ? 'pdftotext+tesseract' : 'pdftotext'
  });
  if (printedPage % 25 === 0 || printedPage === 465) {
    process.stdout.write(`Inventoried ${printedPage}/465 official printed pages\n`);
  }
}

const inventory = {
  schemaVersion: 1,
  program: evidence.program,
  publisher: evidence.publisher,
  grade: evidence.grade,
  volume: 1,
  sourceId: evidence.approvedSources[0].id,
  officialPrintedPages: '1-465',
  generatedFrom: 'iReady-Maths/iready-grade3-volume1-548-pages-searchable.pdf',
  extraction: useOcr ? 'pdftotext+tesseract' : 'pdftotext',
  coverageStatus: 'inventory-only-not-implementation-complete',
  lessons,
  sessions: sessionRecords,
  pages
};
writeFileSync(outputPath, `${JSON.stringify(inventory, null, 2)}\n`);
process.stdout.write(`Wrote ${outputPath}\n`);
