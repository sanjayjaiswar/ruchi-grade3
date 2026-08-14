import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const dataUrl = new URL('../src/app/data/reading-curriculum.data.ts', import.meta.url);
const templateUrl = new URL('../src/app/pages/reading-home/reading-home.html', import.meta.url);
const routesUrl = new URL('../src/app/app.routes.ts', import.meta.url);
const practiceUrl = new URL('../src/app/data/reading-practice.data.json', import.meta.url);
const learningSystemUrl = new URL('../src/app/data/reading-learning-system.data.ts', import.meta.url);
const officialLessonsUrl = new URL('../src/app/data/reading-official-lessons.data.ts', import.meta.url);
const officialLessonImageUrl = new URL('../public/source-pages/reading/official-samples/grade3-u1-w1-lesson1-guide.png', import.meta.url);
const sourceAuditUrl = new URL('../../docs/reading/grade3-curriculum-source-audit.md', import.meta.url);
const sourcePageUrls = Array.from({ length: 10 }, (_, index) => new URL(`../public/source-pages/reading/unit-${index + 1}-scope.png`, import.meta.url));

const [data, template, routes, practiceText, learningSystem, officialLessons, sourceAudit, officialLessonImageStat] = await Promise.all([
  readFile(dataUrl, 'utf8'),
  readFile(templateUrl, 'utf8'),
  readFile(routesUrl, 'utf8'),
  readFile(practiceUrl, 'utf8'),
  readFile(learningSystemUrl, 'utf8'),
  readFile(officialLessonsUrl, 'utf8'),
  readFile(sourceAuditUrl, 'utf8'),
  stat(officialLessonImageUrl).catch(() => null)
]);
const practice = JSON.parse(practiceText);
const sourcePageStats = await Promise.all(sourcePageUrls.map((url) => stat(url).catch(() => null)));

const expectedTitles = [
  'Government for the People',
  'Ways Characters Shape Stories',
  'Animal Adaptations',
  'Comparing Points of View',
  'Advancements in Technology',
  'Making Decisions',
  'Communities Then and Now',
  'Weather and Climate',
  'Spending Time and Money',
  'Forces and Interactions'
];

const requiredSelections = [
  'Working Together', 'Election Day', 'It Is My Right!', 'Winning the Right to Vote',
  'The Tale of King Midas: A Greek Myth', 'Snow White: A Russian Folktale',
  'Animal Disguises', 'One Body, Many Adaptations', 'Cinderella’s Very Bad Day',
  'The True Jack?', 'Alexander Graham Bell: “It Talks!”', 'From Phonograph to Playlist',
  'The Fox and the Geese', 'The Wolf and the Fox', 'Exploring My Community',
  'Sarah and the Chickens', 'Fairweather Clouds', 'The Tropical Rain Belt',
  'Making Choices: Ben Franklin’s “Two Cents” and The Ant and the Grasshopper',
  'From Fruit to Jam: A Tasty List of Choices', 'Poems of Movement: “The Swing” and “The Wind”',
  'Investigate: Magnetism'
];

const rejectedInventedTitles = [
  'The Playground Proposal', 'One Vote, One Record', 'A Rule with a Reason',
  'The Missing Measure', 'The Shortcut', 'Two Plans for the Parade',
  'The Lantern Garden', 'When Fog Feeds a Forest', 'A Map Made by Wind'
];

const failures = [];
const unitIds = [...data.matchAll(/id: 'u(\d+)'/g)].map((match) => Number(match[1]));
const weekRecords = [...data.matchAll(/\bweek\([123], \[/g)];
const selectionRecords = [...data.matchAll(/\bselection\('(Short Read 1|Short Read 2|Extended Read 1|Extended Read 2|Word Study Read 1|Word Study Read 2|Word Study Read 3)'/g)];
const selectionTitles = [...data.matchAll(/selection\('[^']+',\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g)]
  .map((match) => Function(`return ${match[1]}`)());
const selectionRoleTitleRecords = [...data.matchAll(/selection\('([^']+)',\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g)]
  .map((match) => ({ role: match[1], title: Function(`return ${match[2]}`)() }));
const normalizedSelectionTitles = selectionTitles
  .map((title) => title.normalize('NFKD').replace(/[‘’“”]/g, '').replace(/[^a-z0-9]+/gi, '').toLowerCase())
  .join('\n');
// This digest freezes the ordered 70-title register that was checked 70/70
// against the page-by-page raw extraction of the publisher Grade 3 scope.
const expectedSelectionDigest = '6e1b1ec1dfca7b34d4e3bc9dc0022885a8c29728e87f1d6ee88a769faad2e81e';
const actualSelectionDigest = createHash('sha256').update(normalizedSelectionTitles).digest('hex');
const unitBlocks = data.split(/\n  \{\n    id: 'u\d+'/).slice(1, 11);
const selectionsPerUnit = unitBlocks.map((block) => (block.match(/\bselection\(/g) ?? []).length);
const expectedPracticeKeys = Array.from({ length: 10 }, (_, unitIndex) =>
  Array.from({ length: 3 }, (_, weekIndex) => `u${unitIndex + 1}-w${weekIndex + 1}`)
).flat();
const practiceDays = Object.values(practice).flat();
const expectedRolesByWeek = {};
let selectionCursor = 0;
for (let unit = 1; unit <= 10; unit += 1) {
  for (let week = 1; week <= 3; week += 1) {
    const count = week === 1 ? 3 : 2;
    expectedRolesByWeek[`u${unit}-w${week}`] = selectionRoleTitleRecords.slice(selectionCursor, selectionCursor + count);
    selectionCursor += count;
  }
}

if (unitIds.join(',') !== '1,2,3,4,5,6,7,8,9,10') failures.push(`Expected ordered unit IDs u1-u10; found ${unitIds.join(',') || 'none'}.`);
if (weekRecords.length !== 30) failures.push(`Expected 30 official week records; found ${weekRecords.length}.`);
if (selectionRecords.length !== 70) failures.push(`Expected 70 publisher-named selection records; found ${selectionRecords.length}.`);
if (selectionsPerUnit.some((count) => count !== 7)) failures.push(`Expected 7 publisher-named selections per unit; found ${selectionsPerUnit.join(',')}.`);
if (actualSelectionDigest !== expectedSelectionDigest) failures.push('The ordered 70-title publisher selection register changed; re-verify every title against the source PDF before updating the digest.');

if (Object.keys(practice).join(',') !== expectedPracticeKeys.join(',')) failures.push('Practice registry must contain the ordered keys u1-w1 through u10-w3.');
if (practiceDays.length !== 150) failures.push(`Expected 150 explicit practice records; found ${practiceDays.length}.`);
for (const key of expectedPracticeKeys) {
  const days = practice[key];
  if (!Array.isArray(days) || days.length !== 5) {
    failures.push(`${key} must contain exactly five explicit practice records.`);
    continue;
  }
  if (days.map((day) => day.day).join(',') !== '1,2,3,4,5') failures.push(`${key} practice days must be ordered 1-5.`);
  const officialRoles = new Map(expectedRolesByWeek[key].map((record) => [record.role, record.title]));
  const referencedRoles = new Set();
  for (const day of days) {
    if (!Array.isArray(day.roles) || !day.roles.length) failures.push(`${key} day ${day.day} has no named selection role.`);
    for (const role of day.roles ?? []) {
      referencedRoles.add(role);
      if (!officialRoles.has(role)) failures.push(`${key} day ${day.day} references ${role}, which is not an official selection in that week.`);
    }
    if (!['reading-0', 'reading-1', 'reading-2', 'writing', 'word-study'].includes(day.focus)) failures.push(`${key} day ${day.day} has invalid focus ${day.focus}.`);
    for (const field of ['title', 'product', 'task', 'check']) if (typeof day[field] !== 'string' || day[field].trim().length < 8) failures.push(`${key} day ${day.day} has an incomplete ${field}.`);
  }
  for (const [role, title] of officialRoles) if (!referencedRoles.has(role)) failures.push(`${key} never uses official selection ${role}: ${title}.`);
}

for (const field of ['title', 'product', 'task', 'check']) {
  const values = practiceDays.map((day) => day[field]);
  if (new Set(values).size !== 150) failures.push(`Expected 150 distinct ${field} values; found ${new Set(values).size}.`);
}

for (const rejected of ['Preview and first read', 'Reread for key details', 'Analyze and connect', 'Write from sources', 'Word study and weekly review']) {
  if (practiceText.includes(rejected) || template.includes(rejected)) failures.push(`Rejected generic practice phase remains: ${rejected}`);
}

for (const title of expectedTitles) if (!data.includes(`title: '${title}'`)) failures.push(`Missing official unit title: ${title}`);
for (const title of requiredSelections) if (!data.includes(title)) failures.push(`Missing verified selection title: ${title}`);
for (const title of rejectedInventedTitles) if (data.includes(title) || template.includes(title)) failures.push(`Rejected invented content remains: ${title}`);

for (const route of [
  "path: 'ruchika/grade3/reading/sources'",
  "path: 'ruchika/grade3/reading/standards'",
  "path: 'ruchika/grade3/reading/assessments'",
  "path: 'ruchika/grade3/reading/levels'",
  "path: 'ruchika/grade3/reading/units/:unitId'",
  "path: 'ruchika/grade3/reading/units/:unitId/lessons/:lessonNumber', component: ReadingHomePage"
]) if (!routes.includes(route)) failures.push(`Missing route: ${route}`);

for (const phrase of ['Official Benchmark Education sample', 'Open the school text', 'Source of truth']) {
  if (!template.includes(phrase)) failures.push(`Missing visible source boundary: ${phrase}`);
}

for (const sourcePhrase of ['Moreland School District: adopted curriculum', 'California state adoption', 'Baker Elementary context', 'Santa Clara County standards context']) {
  if (!template.includes(sourcePhrase)) failures.push(`Missing source-ledger context: ${sourcePhrase}`);
}

for (const phrase of ['A balanced 25-minute routine', 'Starter library', 'Read for different purposes']) {
  if (template.includes(phrase)) failures.push(`Rejected generic section remains: ${phrase}`);
}

for (const phrase of ['Standards', 'Curriculum', 'Assessments', 'Reading levels', 'Sources']) {
  if (!template.includes(`>${phrase}</a>`)) failures.push(`Missing persistent Reading navigation link: ${phrase}`);
}
if (template.includes('href="#grade3-year-map"') || template.includes('/assessments#reading-levels')) {
  failures.push('Fragile Reading fragment navigation remains; use real routes or component scroll actions.');
}
for (const phrase of ['Official California reference:', 'RL, RI, RF, W, SL, and L are official CDE reference prefixes']) {
  if (!template.includes(phrase)) failures.push(`Missing plain-language standards-code explanation: ${phrase}`);
}

for (let unit = 1; unit <= 10; unit += 1) {
  const printedPage = 66 + unit * 2;
  const auditRow = `| ${unit} | ${expectedTitles[unit - 1]} | ${printedPage}–${printedPage + 1} |`;
  if (!sourceAudit.includes(auditRow)) failures.push(`Missing page-specific source-audit row for Unit ${unit}: ${expectedTitles[unit - 1]}.`);
}
for (const phrase of ['Original supplemental practice—not a Benchmark, Baker, or Moreland lesson.', 'The public source does not establish Baker’s current pacing.']) {
  if (!sourceAudit.includes(phrase)) failures.push(`Missing source-audit limitation: ${phrase}`);
}
for (const forbiddenOfficialLabel of ['official weeks', 'Official Week', 'Official Unit']) {
  if (template.includes(forbiddenOfficialLabel)) failures.push(`Overstated curriculum label remains in UI: ${forbiddenOfficialLabel}.`);
}
for (const phrase of ['What is needed for Math-level daily practice', 'Day-by-day reading practice will be released only after', 'official source page stays visible', 'Baker’s current classroom dates and pacing are not public']) {
  if (!template.includes(phrase)) failures.push(`Missing public-evidence boundary: ${phrase}`);
}
if (template.includes('class="lesson-links"')) failures.push('Supplemental practice links remain published on the active Unit path.');
for (const phrase of [
  "title: 'Working Together'",
  "objective: 'I can explain how people work together to solve a problem.'",
  "studentPages: 'pages 4–5'",
  "'elected', 'flooding', 'government', 'officials', 'prepare', 'sandbag', 'team'",
  "sourceFingerprint: 'SHA-256 191111faa89f9e32fc429d4a5ea5ab630c5b509764d45a6498f788f491ca2a84'"
]) if (!officialLessons.includes(phrase)) failures.push(`Official Lesson 1 contract drifted: ${phrase}`);
for (const phrase of ['How did the people in Fargo work together to solve a problem?', 'The portal guides the same lesson; it does not replace or invent the passage.', 'grade3-u1-w1-lesson1-guide.png']) {
  if (!template.includes(phrase)) failures.push(`Source-faithful Lesson 1 UI is missing: ${phrase}`);
}
if (!officialLessonImageStat || officialLessonImageStat.size < 100_000) failures.push('Missing or incomplete official Lesson 1 source thumbnail.');
for (let index = 0; index < sourcePageStats.length; index += 1) {
  const sourcePage = sourcePageStats[index];
  if (!sourcePage || sourcePage.size < 100_000) failures.push(`Missing or incomplete official rendered source page for Unit ${index + 1}.`);
  if (!template.includes(`scopeImage(unit)`)) failures.push('The active unit page does not visibly render its official publisher source page.');
}

const expectedStandardsByDomain = {
  RL: ['RL.3.1', 'RL.3.2', 'RL.3.3', 'RL.3.4', 'RL.3.5', 'RL.3.6', 'RL.3.7', 'RL.3.8', 'RL.3.9', 'RL.3.10'],
  RI: ['RI.3.1', 'RI.3.2', 'RI.3.3', 'RI.3.4', 'RI.3.5', 'RI.3.6', 'RI.3.7', 'RI.3.8', 'RI.3.9', 'RI.3.10'],
  RF: ['RF.3.3', 'RF.3.4'],
  W: ['W.3.1', 'W.3.2', 'W.3.3', 'W.3.4', 'W.3.5', 'W.3.6', 'W.3.7', 'W.3.8', 'W.3.9', 'W.3.10'],
  SL: ['SL.3.1', 'SL.3.2', 'SL.3.3', 'SL.3.4', 'SL.3.5', 'SL.3.6'],
  L: ['L.3.1', 'L.3.2', 'L.3.3', 'L.3.4', 'L.3.5', 'L.3.6']
};
const standardCodes = [...learningSystem.matchAll(/code: '([A-Z]+\.3\.\d+)'/g)].map((match) => match[1]);
const expectedStandardCodes = Object.values(expectedStandardsByDomain).flat();
if (standardCodes.join(',') !== expectedStandardCodes.join(',')) failures.push(`Grade 3 standard register drifted. Expected ${expectedStandardCodes.length} ordered records; found ${standardCodes.length}.`);
if (new Set(standardCodes).size !== 44) failures.push(`Expected 44 unique Grade 3 standard records; found ${new Set(standardCodes).size}.`);
for (const phrase of ['Twice yearly', 'Three times yearly', 'Yearly', 'No learner placement is inferred.', 'Standards are not units.']) {
  if (!learningSystem.includes(phrase) && !template.includes(phrase)) failures.push(`Missing factual learning-system guardrail: ${phrase}`);
}
for (const source of ['MORELAND_ASSESSMENT_SOURCE', 'BAKER_2025_SPSA_SOURCE', 'CAASPP_ELA_SCORE_SOURCE']) {
  if (source === 'MORELAND_ASSESSMENT_SOURCE') {
    if (!data.includes(source)) failures.push(`Missing source constant: ${source}`);
  } else if (!learningSystem.includes(source)) failures.push(`Missing source constant: ${source}`);
}
for (const forbiddenClaim of ['Grade 3 F&P target', 'Ruchika’s Lexile score is', 'Ruchika’s SRI score is', '25-minute routine']) {
  if (`${learningSystem}\n${template}`.includes(forbiddenClaim)) failures.push(`Unsupported assessment claim remains: ${forbiddenClaim}`);
}

const summary = {
  publisherDocumentedUnits: unitIds.length,
  publisherDocumentedWeeks: weekRecords.length,
  publisherNamedSelections: selectionRecords.length,
  selectionsPerUnit,
  publisherSelectionRegisterVerified: actualSelectionDigest === expectedSelectionDigest,
  officialRenderedSourcePages: sourcePageStats.filter((entry) => entry && entry.size >= 100_000).length,
  boundedOfficialLessons: officialLessons.includes("id: 'u1-w1-l1'") ? 1 : 0,
  quarantinedSupplementalPracticeDrafts: practiceDays.length,
  distinctPracticeTitles: new Set(practiceDays.map((day) => day.title)).size,
  distinctPracticeProducts: new Set(practiceDays.map((day) => day.product)).size,
  distinctPracticeTasks: new Set(practiceDays.map((day) => day.task)).size,
  allPublisherSelectionsReferencedByQuarantinedDrafts: failures.every((failure) => !failure.includes('never uses official selection')),
  californiaGrade3ElaStandardRecords: standardCodes.length,
  uniqueCaliforniaGrade3ElaStandardRecords: new Set(standardCodes).size,
  failures
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exitCode = 1;
