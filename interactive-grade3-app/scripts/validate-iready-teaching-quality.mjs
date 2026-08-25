import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { build } from 'esbuild';

const appRoot = resolve(import.meta.dirname, '..');
const auditRoot = resolve(appRoot, 'tmp/teaching-quality-audit');
mkdirSync(auditRoot, { recursive: true });

const bundle = async (entry, name) => {
  const outfile = resolve(auditRoot, `${name}.mjs`);
  await build({ entryPoints: [resolve(appRoot, entry)], outfile, bundle: true, platform: 'node', format: 'esm', logLevel: 'silent' });
  return import(`${pathToFileURL(outfile).href}?audit=${Date.now()}-${name}`);
};

const failures = [];
const v1 = await bundle('src/app/pages/iready-interactive/iready-volume1-problems.ts', 'v1-problems');
const v2 = await bundle('src/app/pages/iready-interactive/iready-volume2.ts', 'v2-visuals');
const sessions = (await import('../src/app/pages/iready-interactive/iready-interactive.volume2-sessions.json', { with: { type: 'json' } })).default.sessions;

if (v1.IREADY_VOLUME1_SOURCE_PROBLEMS.length !== 240) {
  failures.push(`Volume 1 must expose all 240 official page activities; found ${v1.IREADY_VOLUME1_SOURCE_PROBLEMS.length}.`);
}

for (const problem of v1.IREADY_VOLUME1_SOURCE_PROBLEMS) {
  const kinds = problem.solvedVisual.sections.map((section) => section.kind);
  if (!kinds.length) failures.push(`Volume 1 ${problem.key} has no solved teaching state.`);
  if (kinds.includes('source-response-workspace')) failures.push(`Volume 1 ${problem.key} uses response entry as solved teaching.`);
  if (kinds.length === 1 && ['equations', 'note', 'source-crop', 'source-model'].includes(kinds[0])) {
    failures.push(`Volume 1 ${problem.key} is still a thin ${kinds[0]}-only solved state.`);
  }
}

const exactFigureSessions = new Set([
  '20-3', '24-3', '26-1', '26-2',
  '30-1', '30-2', '30-3',
  '31-1', '31-4',
  '33-1', '33-3'
]);
const nonSemanticKinds = new Set(['source-model', 'source-crop', 'source-directions', 'equations', 'note']);

if (sessions.length !== 52) failures.push(`Volume 2 must expose all 52 official sessions; found ${sessions.length}.`);
for (const session of sessions) {
  const key = `${session.lesson}-${session.session}`;
  const visual = v2.v2VisualForSession(session, true);
  const kinds = visual.sections.map((section) => section.kind);
  const hasSemanticModel = kinds.some((kind) => !nonSemanticKinds.has(kind));
  if (!kinds.length) failures.push(`Volume 2 ${key} has no solved teaching state.`);
  if (!hasSemanticModel && !exactFigureSessions.has(key)) {
    failures.push(`Volume 2 ${key} has no semantic model and is not an approved exact-figure session.`);
  }
  if (nonSemanticKinds.has(kinds[0]) && !exactFigureSessions.has(key)) {
    failures.push(`Volume 2 ${key} opens with ${kinds[0]} instead of its mathematical model.`);
  }
  if (session.lesson === 28 && kinds[0] !== 'measurement-model') {
    failures.push(`Volume 2 ${key} must open with a liquid-volume model, not a publisher-page reproduction.`);
  }
  if (session.lesson === 32 && !['tape', 'array'].includes(kinds[0])) {
    failures.push(`Volume 2 ${key} must open with a perimeter/area model; found ${kinds[0]}.`);
  }
}

if (failures.length) {
  console.error('i-Ready teaching-quality audit failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('i-Ready teaching-quality audit passed: 240 Volume 1 activities and 52 Volume 2 sessions are source-bounded and model-first.');
