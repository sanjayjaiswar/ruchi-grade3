import { readFile } from 'node:fs/promises';

const manifestUrl = new URL('../../docs/reading/grade3-reading-source-manifest.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));
const failures = [];

const requiredSourceIds = [
  'moreland-curriculum',
  'cde-adopted-programs',
  'cde-program-findings',
  'benchmark-grade3-scope',
  'benchmark-grade3-u1w1-program-sample',
  'benchmark-grade3-text-evidence-questions'
];
const sourceIds = new Set(manifest.verifiedSources?.map((source) => source.id));
for (const id of requiredSourceIds) {
  if (!sourceIds.has(id)) failures.push(`Missing verified source record: ${id}`);
}

const scope = manifest.verifiedSources?.find((source) => source.id === 'benchmark-grade3-scope');
if (scope?.pageCount !== 10) failures.push(`Expected the audited scope to contain 10 pages; found ${scope?.pageCount ?? 'none'}.`);
if (scope?.sha256 !== '11b8c623819067ea07b226d616ddea718bad4d72949841bf048b44b151e7fb6c') {
  failures.push('The audited Benchmark scope fingerprint changed. Re-audit the PDF before accepting the new hash.');
}
for (const boundary of ['daily-lessons', 'teacher-directions', 'student-text', 'answers', 'assessments', 'current-classroom-pacing']) {
  if (!scope?.doesNotControl?.includes(boundary)) failures.push(`Scope boundary no longer blocks ${boundary}.`);
}

const lessonSample = manifest.verifiedSources?.find((source) => source.id === 'benchmark-grade3-u1w1-program-sample');
if (lessonSample?.pageCount !== 8) failures.push(`Expected the official Benchmark program sample to contain 8 pages; found ${lessonSample?.pageCount ?? 'none'}.`);
if (lessonSample?.sha256 !== '191111faa89f9e32fc429d4a5ea5ab630c5b509764d45a6498f788f491ca2a84') {
  failures.push('The official Benchmark program-sample fingerprint changed. Re-audit the PDF before accepting the new hash.');
}
for (const control of ['u1-w1-l1-title', 'u1-w1-l1-student-source-and-pages', 'u1-w1-l1-reading-objective', 'u1-w1-l1-vocabulary', 'u1-w1-l1-teacher-sequence', 'u1-w1-l1-after-reading-question']) {
  if (!lessonSample?.controls?.includes(control)) failures.push(`Bounded Lesson 1 source no longer controls ${control}.`);
}
for (const boundary of ['full-student-passage', 'u1-w1-lessons-after-l1', 'units-2-through-10-daily-lessons']) {
  if (!lessonSample?.doesNotControl?.includes(boundary)) failures.push(`Bounded Lesson 1 source no longer blocks ${boundary}.`);
}
if (manifest.readiness?.boundedOfficialLessonIds?.join(',') !== 'u1-w1-l1') failures.push('Only u1-w1-l1 may be source-admitted at this stage.');

const evidenceQuestions = manifest.verifiedSources?.find((source) => source.id === 'benchmark-grade3-text-evidence-questions');
if (evidenceQuestions?.pageCount !== 10) failures.push(`Expected the official text-evidence source to contain 10 pages; found ${evidenceQuestions?.pageCount ?? 'none'}.`);
if (evidenceQuestions?.sha256 !== 'd33c76c4f751cc647c032b85278f6ac160f76ed06687cb097971ffe7c405b4d6') {
  failures.push('The official text-evidence source fingerprint changed. Re-audit all 100 questions before accepting the new hash.');
}
for (const control of ['unit-question-order', 'selection-to-question-alignment', 'official-question-text']) {
  if (!evidenceQuestions?.controls?.includes(control)) failures.push(`Text-evidence source no longer controls ${control}.`);
}
for (const boundary of ['student-passages', 'answer-keys', 'scores', 'daily-lesson-sequence', 'current-classroom-pacing']) {
  if (!evidenceQuestions?.doesNotControl?.includes(boundary)) failures.push(`Text-evidence source no longer blocks ${boundary}.`);
}
if (manifest.readiness?.officialTextEvidencePracticeReady !== true) failures.push('Verified official text-evidence practice must remain available.');

const missingComponents = manifest.requiredLocalComponents?.filter((component) => !component.present) ?? [];
const missingLessonComponents = missingComponents.filter((component) =>
  ['daily-lessons', 'student-text-and-page-evidence', 'referenced-lesson-components'].includes(component.requiredFor)
);
const missingAssessmentComponents = missingComponents.filter((component) =>
  ['official-assessment-practice', 'official-informal-assessment-and-level-explanation'].includes(component.requiredFor)
);

if (manifest.readiness?.yearMapReady !== true) failures.push('The verified year map must remain available.');
if (manifest.readiness?.dailyLessonAuthoringReady === true && missingLessonComponents.length) {
  failures.push('Daily lesson authoring was marked ready while required Teacher Resource System/student resources remain missing.');
}
if (manifest.readiness?.officialAssessmentAuthoringReady === true && missingAssessmentComponents.length) {
  failures.push('Official assessment authoring was marked ready while required assessment resources remain missing.');
}
if (manifest.readiness?.currentBakerPacingVerified === true && missingComponents.some((component) => component.id === 'baker-moreland-pacing')) {
  failures.push('Current Baker pacing was marked verified without an admitted pacing artifact.');
}
if (!manifest.releaseRule?.includes('fingerprinted') || !manifest.releaseRule?.includes('visually reviewed')) {
  failures.push('The release rule no longer requires fingerprinting and visual source review.');
}

const result = {
  yearMap: manifest.readiness.yearMapReady ? 'READY' : 'BLOCKED',
  officialTextEvidencePractice: manifest.readiness.officialTextEvidencePracticeReady ? 'READY' : 'BLOCKED',
  dailyLessonAuthoring: manifest.readiness.dailyLessonAuthoringReady ? 'READY' : 'BLOCKED',
  boundedOfficialLessons: manifest.readiness.boundedOfficialLessonIds ?? [],
  officialAssessmentAuthoring: manifest.readiness.officialAssessmentAuthoringReady ? 'READY' : 'BLOCKED',
  currentBakerPacing: manifest.readiness.currentBakerPacingVerified ? 'VERIFIED' : 'NOT VERIFIED',
  admittedGoverningSources: manifest.verifiedSources.length,
  missingRequiredLocalComponents: missingComponents.map((component) => component.id),
  failures
};

console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
