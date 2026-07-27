import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { generateLocalSearchIndex } from './generate-local-search-index.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.resolve(SCRIPT_DIR, '..');
const INDEX_FILE = path.join(APP_DIR, 'public', 'tmp', 'local-search-index.json');
const MATCHER_SOURCE = path.join(APP_DIR, 'src', 'app', 'search', 'local-search.ts');
const SERVICE_SOURCE = path.join(APP_DIR, 'src', 'app', 'search', 'local-search.service.ts');
const SEARCH_PAGE_SOURCE = path.join(APP_DIR, 'src', 'app', 'pages', 'search', 'search.ts');
const SEARCH_PAGE_TEMPLATE = path.join(APP_DIR, 'src', 'app', 'pages', 'search', 'search.html');
const APP_SOURCE = path.join(APP_DIR, 'src', 'app', 'app.ts');
const APP_TEMPLATE = path.join(APP_DIR, 'src', 'app', 'app.html');
const PACKAGE_FILE = path.join(APP_DIR, 'package.json');
const GENERATOR_SOURCE = path.join(APP_DIR, 'scripts', 'generate-local-search-index.mjs');
const MATCHER_OUTPUT = path.join(APP_DIR, 'tmp', 'local-search', 'client', 'local-search.cjs');
const FORBIDDEN = [
  'solvedAnswer',
  'solvedVisual',
  'teacherEditionBasis',
  'teacherEditionReference',
  'teacherDebrief',
  'teacherMove',
  'teacherLookFor',
  'validationChecks',
  'sourceRefs',
  '/source-pages/',
  '.pdf',
  'answers will vary',
  'module not found',
  'Kyle saved $34 in May',
  '2 right triangles drawn and labeled',
  'Mid-Module Assessment after Topic C'
];
const EXTERNAL_SEARCH_DEPENDENCY = /algolia|elastic(?:search|lunr)?|lunr|meilisearch|typesense|searchkit/i;
const NETWORK_OR_SERVER = /https?:\/\/|WebSocket|EventSource|createServer|\.listen\s*\(|node:(?:http|https|net|dgram)|setInterval|new Worker/i;

function assertLocalOnlyArchitecture() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_FILE, 'utf8'));
  const dependencies = Object.keys({
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {})
  });
  assert.ok(
    dependencies.every((name) => !EXTERNAL_SEARCH_DEPENDENCY.test(name)),
    'An external search dependency was added.'
  );
  assert.equal(packageJson.scripts['prestart'], 'npm run generate:local-search');
  assert.equal(packageJson.scripts['prebuild'], 'npm run generate:local-search');
  assert.equal(packageJson.scripts['prewatch'], 'npm run generate:local-search');
  assert.equal(packageJson.scripts['generate:local-search'], 'node scripts/generate-local-search-index.mjs');
  assert.ok(
    !/serve|--port|listen/i.test(packageJson.scripts['generate:local-search']),
    'Search generation must not start another server or port.'
  );
  assert.doesNotMatch(
    fs.readFileSync(GENERATOR_SOURCE, 'utf8'),
    NETWORK_OR_SERVER,
    'Search generation must not use an external network or start a server.'
  );

  const serviceSource = fs.readFileSync(SERVICE_SOURCE, 'utf8');
  const runtimeSource = [
    serviceSource,
    fs.readFileSync(MATCHER_SOURCE, 'utf8'),
    fs.readFileSync(SEARCH_PAGE_SOURCE, 'utf8')
  ].join('\n');
  assert.doesNotMatch(runtimeSource, NETWORK_OR_SERVER, 'Search runtime must not use an external service, polling, worker, or server.');
  assert.equal((runtimeSource.match(/\bfetch\s*\(/g) ?? []).length, 1, 'Search runtime must have one static-index fetch call.');
  assert.match(serviceSource, /indexRequest\s*\?\?=\s*fetch\('\/tmp\/local-search-index\.json'/);

  const appSource = fs.readFileSync(APP_SOURCE, 'utf8');
  const appTemplate = fs.readFileSync(APP_TEMPLATE, 'utf8');
  assert.doesNotMatch(appSource, NETWORK_OR_SERVER, 'The shell must not add an external service, polling, worker, or server.');
  assert.match(appTemplate, /\(ngSubmit\)="submitSearch\(\)"/);
  assert.doesNotMatch(appTemplate, /\(input\)="submitSearch\(\)"/, 'Search must run on submit, not every keystroke.');

  const searchPageSource = fs.readFileSync(SEARCH_PAGE_SOURCE, 'utf8');
  const searchPageTemplate = fs.readFileSync(SEARCH_PAGE_TEMPLATE, 'utf8');
  assert.match(searchPageSource, /pageSizeOptions\s*=\s*\[10,\s*20,\s*50\]/);
  assert.match(searchPageTemplate, /aria-label="Search result pages"/);
  assert.match(searchPageTemplate, /\*ngFor="let result of pagedResults"/);
  assert.doesNotMatch(searchPageTemplate, /showing the first/i, 'Search results must paginate rather than truncate.');
}

function loadMatcher() {
  const source = fs.readFileSync(MATCHER_SOURCE, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS
    },
    fileName: MATCHER_SOURCE
  }).outputText;
  fs.mkdirSync(path.dirname(MATCHER_OUTPUT), { recursive: true });
  fs.writeFileSync(MATCHER_OUTPUT, output, 'utf8');
  return createRequire(import.meta.url)(MATCHER_OUTPUT);
}

function assertQuery(matcher, records, query, predicate, message) {
  const match = matcher.searchLocalRecords(records, query);
  assert.ok(match.total > 0, `${message}: expected at least one result for “${query}”.`);
  assert.ok(match.results.some(({ record }) => predicate(record)), `${message}: expected destination was not returned.`);
}

function assertTopQuery(matcher, records, query, predicate, message) {
  const match = matcher.searchLocalRecords(records, query);
  assert.ok(match.results.length > 0, `${message}: expected at least one result for “${query}”.`);
  assert.ok(predicate(match.results[0].record), `${message}: the most relevant destination was not ranked first.`);
}

assertLocalOnlyArchitecture();
await generateLocalSearchIndex();
const firstBytes = fs.readFileSync(INDEX_FILE);
await generateLocalSearchIndex();
const secondBytes = fs.readFileSync(INDEX_FILE);
assert.deepEqual(secondBytes, firstBytes, 'Two generations must be byte-for-byte deterministic.');

const raw = secondBytes.toString('utf8');
const payload = JSON.parse(raw);
assert.equal(payload.version, 1);
assert.equal(payload.records.length, payload.counts.records);
assert.equal(
  payload.counts.records,
  1 + payload.counts.modules * 2 + payload.counts.topics + payload.counts.lessons + payload.counts.activities,
  'A derived page family is missing from the index.'
);
assert.ok(
  payload.counts.modules > 0 &&
    payload.counts.topics > 0 &&
    payload.counts.lessons > 0 &&
    payload.counts.activities > 0,
  'A searchable page family is empty.'
);
assert.ok(secondBytes.byteLength < 2_000_000, 'Search index unexpectedly exceeds 2 MB.');

for (const forbidden of FORBIDDEN) {
  assert.ok(!raw.toLowerCase().includes(forbidden.toLowerCase()), `Forbidden output content found: ${forbidden}`);
}

const destinations = new Set();
for (const record of payload.records) {
  assert.ok(record.title && record.text && record.anchor, `Record is incomplete: ${JSON.stringify(record)}`);
  assert.ok(record.url.startsWith('/ruchika-grade3'), `Non-portal URL emitted: ${record.url}`);
  assert.ok(!record.url.includes(':'), `Unresolved route parameter emitted: ${record.url}`);
  assert.ok(record.url.endsWith(`#${record.anchor}`), `URL/anchor mismatch: ${record.url}`);
  assert.ok(!destinations.has(record.url), `Duplicate destination emitted: ${record.url}`);
  destinations.add(record.url);

  if (record.kind === 'activity') {
    assert.match(record.url, /^\/ruchika-grade3\/modules\/m[1-7]\/lessons\/\d+\/problem-set\/blank#m[1-7]-l\d+-problem-\d+$/);
    assert.match(record.title, /^Problem \d+: .+$/);
    assert.ok(record.problemNumber && record.lessonTitle, `Activity metadata is incomplete: ${record.url}`);
  } else if (record.kind === 'lesson') {
    assert.match(record.url, /^\/ruchika-grade3\/modules\/m[1-7]\/lessons\/\d+\/concept#m[1-7]-l\d+-concept$/);
    assert.match(record.title, /^Lesson \d+: .+$/);
    assert.ok(record.lessonTitle, `Lesson metadata is incomplete: ${record.url}`);
  } else if (record.kind === 'topic') {
    assert.equal(record.anchor, record.topicId);
    assert.match(record.url, /^\/ruchika-grade3\/modules\/m[1-7]#m[1-7]-t[a-z]$/);
    assert.ok(record.topicLabel && record.topicTitle, `Topic metadata is incomplete: ${record.url}`);
  } else if (record.kind === 'module-concepts') {
    assert.match(record.url, /^\/ruchika-grade3\/modules\/m[1-7]#m[1-7]-concepts$/);
  } else if (record.kind === 'module-topics') {
    assert.match(record.url, /^\/ruchika-grade3\/modules\/m[1-7]#m[1-7]-topics$/);
  } else {
    assert.equal(record.url, '/ruchika-grade3#curriculum-flow');
  }
  if (record.kind !== 'home') {
    assert.ok(Number.isInteger(record.moduleNumber), `Module number metadata is missing: ${record.url}`);
    assert.ok(record.moduleTitle, `Module title metadata is missing: ${record.url}`);
  }
  if (['topic', 'lesson', 'activity'].includes(record.kind)) {
    assert.ok(record.topicLabel && record.topicTitle, `Topic context metadata is missing: ${record.url}`);
  }
}

const matcher = loadMatcher();
assert.equal(matcher.normalizeSearchText('Crème 3 × 5'), 'creme 3 x 5');
assert.equal(matcher.normalizeSearchText('3 ÷ 5'), matcher.normalizeSearchText('3 / 5'));
const syntheticRecord = {
  kind: 'home',
  title: 'Synthetic',
  url: '/ruchika-grade3#synthetic',
  text: 'describes prescribe screen',
  anchor: 'synthetic'
};
assert.equal(
  matcher.searchLocalRecords([syntheticRecord], 'SCR').total,
  0,
  'A query token matched inside describes, prescribe, or screen.'
);

assertQuery(matcher, payload.records, 'Curriculum Flow', (record) => record.kind === 'home', 'Home heading');
assertQuery(
  matcher,
  payload.records,
  'Fractions as Numbers on the Number Line',
  (record) => record.kind === 'module-concepts' && record.moduleId === 'm5',
  'Module title'
);
assertQuery(
  matcher,
  payload.records,
  'Measuring Weight Liquid Volume Metric Units',
  (record) => record.kind === 'topic' && record.topicId === 'm2-tb',
  'Topic'
);
assertQuery(
  matcher,
  payload.records,
  'round nearest hundred',
  (record) => record.kind === 'lesson' && record.moduleId === 'm2',
  'Lesson title or goal'
);
assertQuery(
  matcher,
  payload.records,
  'quotient unknown factor',
  (record) => record.kind === 'lesson' && ['m1', 'm3'].includes(record.moduleId),
  'Vocabulary'
);
assertQuery(
  matcher,
  payload.records,
  'name the whole equal parts',
  (record) => ['lesson', 'activity'].includes(record.kind) && record.moduleId === 'm5',
  'Learner instruction'
);
assertQuery(
  matcher,
  payload.records,
  'Caroline Brian Marta chocolates',
  (record) => record.kind === 'activity' && record.activityId === 'm1-l1-problem-4',
  'Module 1 learner problem'
);
assertQuery(
  matcher,
  payload.records,
  'stopwatch continuous measurement',
  (record) => record.moduleId === 'm2',
  'Module 2 concept'
);
assertQuery(
  matcher,
  payload.records,
  'Hannah $500',
  (record) => record.activityId === 'm3-l2-problem-5',
  'Module 3 learner problem'
);
assertQuery(
  matcher,
  payload.records,
  'floor plan room area',
  (record) => record.moduleId === 'm4',
  'Module 4 content'
);
assertQuery(
  matcher,
  payload.records,
  'string cheese rectangles',
  (record) => record.activityId === 'm5-l1-problem-2',
  'Module 5 learner problem'
);
assertQuery(
  matcher,
  payload.records,
  'Kyle savings February June',
  (record) => record.activityId === 'm6-l3-problem-2',
  'Module 6 learner problem'
);
assertQuery(
  matcher,
  payload.records,
  'stop sign perimeter 48 centimeters',
  (record) => record.activityId === 'm7-l23-problem-1',
  'Module 7 learner problem'
);
assertQuery(
  matcher,
  payload.records,
  'Summer Math Review Summer Practice booklet',
  (record) => record.activityId === 'm7-l34-problem-1',
  'Learner resource'
);
assertTopQuery(
  matcher,
  payload.records,
  'Fractions as Numbers on the Number Line',
  (record) => record.kind === 'module-concepts' && record.moduleId === 'm5',
  'Exact module-title priority'
);
assertTopQuery(
  matcher,
  payload.records,
  'Module 5 topics and lessons',
  (record) => record.kind === 'module-topics' && record.moduleId === 'm5',
  'Exact module-topic-map priority'
);
assertTopQuery(
  matcher,
  payload.records,
  'Measuring Weight Liquid Volume Metric Units',
  (record) => record.kind === 'topic' && record.topicId === 'm2-tb',
  'Topic-title priority'
);
assertTopQuery(
  matcher,
  payload.records,
  'round nearest hundred',
  (record) => record.kind === 'lesson' && record.lessonId === 'm2-l14',
  'Lesson-title priority'
);
assertTopQuery(
  matcher,
  payload.records,
  'M1 L1 chocolates',
  (record) => record.kind === 'activity' && record.activityId === 'm1-l1-problem-4',
  'Module/lesson shorthand alias'
);
assertTopQuery(
  matcher,
  payload.records,
  'Complete a math activity each day Summer Practice booklet',
  (record) => record.kind === 'activity' && record.activityId === 'm7-l34-problem-1',
  'Learner-resource priority'
);
assertTopQuery(
  matcher,
  payload.records,
  'problem',
  (record) => record.kind !== 'activity',
  'Broad overview priority'
);
const completeBroadQuery = matcher.searchLocalRecords(payload.records, 'problem');
assert.ok(completeBroadQuery.total > 100, 'Broad-query pagination fixture unexpectedly has fewer than 101 records.');
assert.equal(
  completeBroadQuery.results.length,
  completeBroadQuery.total,
  'The matcher truncated results before the UI could paginate them.'
);

const multiplicationAscii = matcher.searchLocalRecords(payload.records, '3 x 5');
const multiplicationSymbol = matcher.searchLocalRecords(payload.records, '3 × 5');
assert.deepEqual(
  multiplicationSymbol.results.map(({ record }) => record.url),
  multiplicationAscii.results.map(({ record }) => record.url),
  'x and × must return the same ordered destinations.'
);

for (const excludedQuery of [
  'Kyle saved $34 in May',
  '2 right triangles drawn and labeled',
  'Teacher Edition answer',
  'validation checks',
  'teacher look for',
  'Mid-Module Assessment after Topic C'
]) {
  assert.equal(matcher.searchLocalRecords(payload.records, excludedQuery).total, 0, `Excluded query leaked: ${excludedQuery}`);
}

assert.equal(matcher.searchLocalRecords(payload.records, '   ').total, 0);
assert.equal(matcher.searchLocalRecords(payload.records, 'nonexistentcurriculumterm').total, 0);
const snippets = matcher.searchLocalRecords(payload.records, 'fraction');
assert.ok(snippets.results.every((result) => result.snippet.length <= 224), 'Snippet exceeded its bounded length.');
assert.ok(
  matcher
    .searchLocalRecords(payload.records, 'fraction line plot')
    .results.every(({ record }) => {
      const tokens = matcher.normalizeSearchText(`${record.title} ${record.text}`).split(' ');
      return ['fraction', 'line', 'plot'].every((word) => tokens.includes(word));
    }),
  'All-word matching degraded to OR or substring matching.'
);
const shortWordResults = matcher.searchLocalRecords(payload.records, 'on');
assert.ok(
  shortWordResults.results.every(({ record }) =>
    matcher.normalizeSearchText(`${record.title} ${record.text}`).split(' ').includes('on')
  ),
  'A short query word matched inside a longer word.'
);
for (const result of shortWordResults.results) {
  let offset = 0;
  for (const part of result.snippetParts) {
    if (part.matched) {
      const before = result.snippet[offset - 1] ?? '';
      const after = result.snippet[offset + part.text.length] ?? '';
      assert.ok(!/[\p{L}\p{N}]/u.test(before) && !/[\p{L}\p{N}]/u.test(after), 'Highlight split a longer word.');
    }
    offset += part.text.length;
  }
}

console.log(`Validated ${payload.counts.records} records: ${payload.counts.modules} modules, ${payload.counts.topics} topics, ${payload.counts.lessons} lessons, ${payload.counts.activities} Blank activities.`);
console.log('Representative learner queries, exclusions, URL/anchor rules, symbol normalization, snippets, and deterministic generation passed.');
console.log('Local-only architecture passed: no search dependency, external service, polling, worker, extra server, extra port, or keystroke-triggered query.');
