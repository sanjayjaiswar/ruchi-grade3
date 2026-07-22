import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = dirname(appRoot);
const moduleId = String(process.argv[2] ?? '').toLowerCase();

if (!/^m[1-7]$/.test(moduleId)) {
  console.error('Usage: npm run prepare:teacher-source -- m3');
  process.exit(1);
}

const moduleNumber = Number(moduleId.slice(1));
const sourceRoot = join(repoRoot, 'EurekaMath-Sources', `Module_${moduleNumber}`);
const pdfName = readdirSync(sourceRoot).find((name) => name.toLowerCase().endsWith('.pdf') && name.toLowerCase().includes('teacher'));

if (!pdfName) {
  console.error(`No Teacher Edition PDF found in ${relative(repoRoot, sourceRoot)}.`);
  process.exit(1);
}

const pdfPath = join(sourceRoot, pdfName);
const cacheRoot = join(repoRoot, 'tmp', 'teacher-edition-cache', moduleId);
const textPath = join(cacheRoot, 'teacher-edition-layout.txt');
const manifestPath = join(cacheRoot, 'manifest.json');
const sourceStat = statSync(pdfPath);
const sourceIdentity = {
  source: relative(repoRoot, pdfPath),
  bytes: sourceStat.size,
  modifiedMs: Math.trunc(sourceStat.mtimeMs)
};

let cachedIdentity;
if (existsSync(manifestPath) && existsSync(textPath)) {
  try {
    cachedIdentity = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch {
    cachedIdentity = undefined;
  }
}

if (
  cachedIdentity?.source === sourceIdentity.source
  && cachedIdentity?.bytes === sourceIdentity.bytes
  && cachedIdentity?.modifiedMs === sourceIdentity.modifiedMs
) {
  console.log(`REUSED: ${relative(repoRoot, textPath)} (${cachedIdentity.pages} PDF pages)`);
  process.exit(0);
}

mkdirSync(cacheRoot, { recursive: true });
execFileSync('pdftotext', ['-layout', pdfPath, textPath], { stdio: 'inherit' });
const extractedText = readFileSync(textPath, 'utf8');
const pageOffsets = [];
let offset = 0;
for (const page of extractedText.split('\f')) {
  pageOffsets.push(offset);
  offset += page.length + 1;
}

writeFileSync(manifestPath, `${JSON.stringify({
  ...sourceIdentity,
  pages: pageOffsets.length,
  pageOffsets,
  generatedAt: new Date().toISOString()
}, null, 2)}\n`);

console.log(`CREATED: ${relative(repoRoot, textPath)} (${pageOffsets.length} PDF pages)`);
