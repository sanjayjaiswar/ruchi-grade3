import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const inventoryPath = resolve(appRoot, 'src/app/pages/iready-interactive/iready-volume1-page-inventory.json');
const inventory = JSON.parse(readFileSync(inventoryPath, 'utf8'));
const errors = [];
const fail = (message) => errors.push(message);

if (inventory.program !== 'i-ready-classroom-mathematics-california' || inventory.publisher !== 'Curriculum Associates' || inventory.grade !== 3 || inventory.volume !== 1) {
  fail('inventory crosses the approved i-Ready Grade 3 Volume 1 identity');
}
if (inventory.coverageStatus !== 'complete-official-page-inventory') {
  fail('inventory must remain an exact, complete official-page inventory');
}
if (inventory.lessons?.length !== 19) fail(`expected 19 lessons; found ${inventory.lessons?.length ?? 0}`);
if (inventory.sessions?.length !== 77) fail(`expected 77 sessions; found ${inventory.sessions?.length ?? 0}`);
if (inventory.pages?.length !== 465) fail(`expected all 465 official printed pages; found ${inventory.pages?.length ?? 0}`);

const printedPages = new Set();
for (const page of inventory.pages ?? []) {
  if (printedPages.has(page.printedPage)) fail(`duplicate printed page ${page.printedPage}`);
  printedPages.add(page.printedPage);
  if (page.viewerPage !== page.printedPage + 12) fail(`printed page ${page.printedPage} has incorrect viewer-page provenance`);
  if (!/^[a-f0-9]{64}$/.test(page.sourceTextSha256 ?? '')) fail(`printed page ${page.printedPage} lacks a source text hash`);
  if (page.extraction === 'pdftotext+tesseract' && !/^[a-f0-9]{64}$/.test(page.ocrTextSha256 ?? '')) fail(`printed page ${page.printedPage} lacks an OCR hash`);
}
for (let page = 1; page <= 465; page += 1) {
  if (!printedPages.has(page)) fail(`official printed page ${page} is absent from inventory`);
}

if (errors.length) {
  console.error('i-Ready Volume 1 inventory validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const numberedPages = inventory.pages.filter((page) => page.problemNumbers.length).length;
const visualPages = inventory.pages.filter((page) => page.visualReviewRequired).length;
console.log(`i-Ready Volume 1 inventory passed: 465/465 printed pages, 19 lessons, 77 sessions, ${numberedPages} pages with detected numbered problems, ${visualPages} pages requiring visual review.`);
