import evidenceJson from './iready-interactive.evidence.json';
import volumeOneSessionsJson from './iready-interactive.volume1-sessions.json';

export type IReadyPhase = 'Explore' | 'Develop' | 'Refine';
export type IReadyApprovedModel =
  | 'place-value-chart'
  | 'nearest-ten-line'
  | 'base-ten-blocks'
  | 'nearest-hundred-line'
  | 'place-value-decomposition'
  | 'partial-sums'
  | 'addition-algorithm'
  | 'place-value-regrouping'
  | 'open-number-line'
  | 'subtraction-algorithm'
  | 'equal-groups'
  | 'array'
  | 'factor-break-apart'
  | 'fact-family'
  | 'equation-flow'
  | 'place-value-groups'
  | 'division-groups'
  | 'pattern-strip'
  | 'area-grid'
  | 'composite-area'
  | 'scaled-graph';

export interface IReadyApprovedSource {
  readonly id: string;
  readonly kind: 'student-worktext' | 'teacher-guide';
  readonly volume: number;
  readonly title: string;
  readonly localPaths: readonly string[];
  readonly sourceUrl: string;
}

export interface IReadyUnitIdea {
  readonly sourceId: string;
  readonly unit: number;
  readonly title: string;
  readonly understanding: string;
  readonly printedPage: number;
  readonly viewerPage: number;
}

export interface NeighborIntervalsActivity {
  readonly kind: 'neighbor-intervals';
  readonly target: number;
  readonly digits: readonly [number, number, number];
  readonly tens: readonly [number, number];
  readonly hundreds: readonly [number, number];
  readonly prompt: string;
  readonly instruction: string;
  readonly correctFeedback: string;
  readonly tryAgainFeedback: string;
  readonly solutionSteps: readonly [string, string, string];
}

export interface RoundChoiceActivity {
  readonly kind: 'round-choice';
  readonly target: number;
  readonly choices: readonly [number, number];
  readonly answer: number;
  readonly prompt: string;
  readonly instruction: string;
  readonly choiceLabel: string;
  readonly correctFeedback: string;
  readonly tryAgainFeedback: string;
  readonly strategy: string;
  readonly numberLine?: Readonly<{ start: number; middle: number; marker: number; end: number }>;
}

export interface ArithmeticActivity {
  readonly kind: 'arithmetic';
  readonly prompt: string;
  readonly instruction: string;
  readonly left: number;
  readonly right: number;
  readonly operation: '+' | '−';
  readonly answer: number;
  readonly hint: string;
  readonly strategy: string;
  readonly jumps?: readonly string[];
}

export interface ConceptVisualBar {
  readonly label: string;
  readonly value: number;
}

export interface ConceptModelVisual {
  readonly kind: 'equal-groups' | 'array' | 'factor-break-apart' | 'fact-family' | 'equation-flow' | 'pattern-strip' | 'area-grid' | 'composite-area' | 'scaled-graph';
  readonly groups?: number;
  readonly perGroup?: number;
  readonly rows?: number;
  readonly columns?: number;
  readonly sequence?: readonly number[];
  readonly scale?: number;
  readonly bars?: readonly ConceptVisualBar[];
  readonly steps?: readonly string[];
}

export interface ConceptModelActivity {
  readonly kind: 'concept-model';
  readonly prompt: string;
  readonly instruction: string;
  readonly answer: number;
  readonly hint: string;
  readonly strategy: string;
  readonly visual: ConceptModelVisual;
}

export type IReadyActivity = NeighborIntervalsActivity | RoundChoiceActivity | ArithmeticActivity | ConceptModelActivity;

export interface IReadyInteractionEvidence {
  readonly key: string;
  readonly sourceId: string;
  readonly status: 'verified';
  readonly volume: number;
  readonly unit: number;
  readonly lesson: number;
  readonly session: number;
  readonly phase: IReadyPhase;
  readonly title: string;
  readonly printedPages: string;
  readonly viewerPage: number;
  readonly approvedModel: IReadyApprovedModel;
  readonly supportsSolvedTeaching: true;
  readonly sourceChecks: readonly Readonly<{
    purpose: 'prompt' | 'model';
    printedPages: string;
    markers: readonly string[];
  }>[];
  readonly activity: IReadyActivity;
}

interface IReadyEvidenceRegistry {
  readonly schemaVersion: 1;
  readonly program: 'i-ready-classroom-mathematics-california';
  readonly publisher: 'Curriculum Associates';
  readonly grade: 3;
  readonly verifiedCoverage: Readonly<{
    volume: number;
    unit: number;
    lessons: readonly Readonly<{ lesson: number; sessions: number }>[];
  }>;
  readonly approvedSources: readonly IReadyApprovedSource[];
  readonly unitIdeas: readonly IReadyUnitIdea[];
  readonly interactions: readonly IReadyInteractionEvidence[];
}

interface CompactInteractionEvidence {
  readonly key: string;
  readonly unit: number;
  readonly lesson: number;
  readonly session: number;
  readonly phase: IReadyPhase;
  readonly title: string;
  readonly printedPages: string;
  readonly approvedModel: IReadyApprovedModel;
  readonly promptMarkers: readonly string[];
  readonly modelMarkers: readonly string[];
  readonly activity: Omit<ConceptModelActivity, 'kind'>;
}

interface VolumeOneSessionRegistry {
  readonly schemaVersion: 1;
  readonly program: 'i-ready-classroom-mathematics-california';
  readonly publisher: 'Curriculum Associates';
  readonly grade: 3;
  readonly sourceId: string;
  readonly verifiedCoverage: readonly Readonly<{
    unit: number;
    lessons: readonly Readonly<{ lesson: number; sessions: number }>[];
  }>[];
  readonly sessions: readonly CompactInteractionEvidence[];
}

const registry = evidenceJson as unknown as IReadyEvidenceRegistry;
const volumeOneSessionRegistry = volumeOneSessionsJson as unknown as VolumeOneSessionRegistry;

function fail(message: string): never {
  throw new Error(`i-Ready evidence registry rejected: ${message}`);
}

function validateIdentity(candidate: Pick<IReadyEvidenceRegistry, 'schemaVersion' | 'program' | 'publisher' | 'grade'>): void {
  if (
    candidate.schemaVersion !== 1
    || candidate.program !== 'i-ready-classroom-mathematics-california'
    || candidate.publisher !== 'Curriculum Associates'
    || candidate.grade !== 3
  ) {
    fail('program identity does not match the approved i-Ready Grade 3 boundary');
  }
}

function validateRegistry(candidate: IReadyEvidenceRegistry): void {
  validateIdentity(candidate);

  const sources = new Map(candidate.approvedSources.map((source) => [source.id, source]));
  const compatibleModels: Readonly<Record<IReadyActivity['kind'], ReadonlySet<IReadyApprovedModel>>> = {
    'neighbor-intervals': new Set(['place-value-chart']),
    'round-choice': new Set(['nearest-ten-line', 'base-ten-blocks', 'nearest-hundred-line']),
    arithmetic: new Set(['place-value-decomposition', 'partial-sums', 'addition-algorithm', 'place-value-regrouping', 'open-number-line', 'subtraction-algorithm']),
    'concept-model': new Set(['equal-groups', 'array', 'factor-break-apart', 'fact-family', 'equation-flow', 'place-value-groups', 'division-groups', 'pattern-strip', 'area-grid', 'composite-area', 'scaled-graph'])
  };
  for (const source of candidate.approvedSources) {
    if (!source.localPaths.length || source.localPaths.some((path) => !path.startsWith('iReady-Maths/') || /eureka/i.test(path))) {
      fail(`source ${source.id} is outside the approved iReady-Maths source boundary`);
    }
    if (!source.sourceUrl.startsWith('https://online.flippingbook.com/view/')) {
      fail(`source ${source.id} does not use an approved publisher reader URL`);
    }
  }

  for (const idea of candidate.unitIdeas) {
    if (
      !sources.has(idea.sourceId)
      || idea.unit < 1
      || idea.unit > 3
      || idea.viewerPage !== idea.printedPage + 12
      || !idea.title.trim()
      || !idea.understanding.trim()
    ) {
      fail(`Unit ${idea.unit} Big Idea has incomplete or mismatched provenance`);
    }
  }

  const keys = new Set<string>();
  for (const interaction of candidate.interactions) {
    const expectedKey = `v${interaction.volume}-u${interaction.unit}-l${interaction.lesson}-s${interaction.session}`;
    const firstPrintedPage = Number(interaction.printedPages.match(/^\d+/)?.[0]);
    if (
      interaction.key !== expectedKey
      || interaction.status !== 'verified'
      || interaction.supportsSolvedTeaching !== true
      || !sources.has(interaction.sourceId)
      || !Number.isFinite(firstPrintedPage)
      || interaction.viewerPage !== firstPrintedPage + 12
    ) {
      fail(`interaction ${interaction.key} has incomplete or mismatched provenance`);
    }
    if (
      !interaction.sourceChecks.length
      || !interaction.sourceChecks.some((check) => check.purpose === 'prompt')
      || !interaction.sourceChecks.some((check) => check.purpose === 'model')
      || interaction.sourceChecks.some((check) => !check.markers.length || check.markers.some((marker) => !marker.trim()))
    ) {
      fail(`interaction ${interaction.key} is missing page-scoped prompt or model evidence`);
    }
    if (keys.has(interaction.key)) {
      fail(`interaction key ${interaction.key} is duplicated`);
    }
    keys.add(interaction.key);

    const serializedActivity = JSON.stringify(interaction.activity);
    if (/eureka|\bmodule\b/i.test(serializedActivity)) {
      fail(`interaction ${interaction.key} contains cross-program educational content`);
    }
    if (!interaction.activity.prompt.trim() || !interaction.activity.instruction.trim()) {
      fail(`interaction ${interaction.key} is missing source-backed learner copy`);
    }
    if (!compatibleModels[interaction.activity.kind].has(interaction.approvedModel)) {
      fail(`interaction ${interaction.key} uses an incompatible mathematical model`);
    }
    if (interaction.activity.kind === 'arithmetic') {
      const expectedAnswer = interaction.activity.operation === '+'
        ? interaction.activity.left + interaction.activity.right
        : interaction.activity.left - interaction.activity.right;
      if (interaction.activity.answer !== expectedAnswer) {
        fail(`interaction ${interaction.key} has an arithmetic answer mismatch`);
      }
    }
    if (interaction.activity.kind === 'round-choice' && !interaction.activity.choices.includes(interaction.activity.answer)) {
      fail(`interaction ${interaction.key} has a solved answer outside its verified choices`);
    }
    if (interaction.activity.kind === 'concept-model') {
      const { answer, visual } = interaction.activity;
      const steps = visual.steps ?? [];
      const answerPattern = new RegExp(`(^|\\D)${answer}(\\D|$)`);
      if (!Number.isFinite(answer) || !Number.isInteger(answer) || answer < 0) {
        fail(`interaction ${interaction.key} has an invalid concept-model answer`);
      }
      if (steps.length < 3 || (visual.kind !== 'pattern-strip' && !answerPattern.test(steps.join(' ')))) {
        fail(`interaction ${interaction.key} does not trace its answer through the verified visual steps`);
      }
      if (visual.kind === 'equal-groups') {
        const groups = visual.groups ?? Number.NaN;
        const perGroup = visual.perGroup ?? Number.NaN;
        const product = groups * perGroup;
        if (answer !== product && (answer !== groups && answer !== perGroup || !new RegExp(`(^|\\D)${product}(\\D|$)`).test(steps.join(' ')))) {
          fail(`interaction ${interaction.key} equal-groups model does not produce its answer`);
        }
      }
      if (visual.kind === 'array' || visual.kind === 'area-grid') {
        const rows = visual.rows ?? Number.NaN;
        const columns = visual.columns ?? Number.NaN;
        const product = rows * columns;
        if (answer !== product && (answer !== rows && answer !== columns || !new RegExp(`(^|\\D)${product}(\\D|$)`).test(steps.join(' ')))) {
          fail(`interaction ${interaction.key} row-by-column model does not produce its answer`);
        }
      }
      if (visual.kind === 'pattern-strip') {
        const sequence = visual.sequence ?? [];
        if (!sequence.includes(answer) && !answerPattern.test(interaction.activity.strategy)) {
          fail(`interaction ${interaction.key} pattern model does not support its answer`);
        }
      }
      if (visual.kind === 'fact-family') {
        const equations = steps.map((step) => step.match(/^\s*(\d+)\s*([×÷])\s*(\d+)\s*=\s*(\d+)\s*$/)).filter((match): match is RegExpMatchArray => Boolean(match));
        const equationsAreValid = equations.every((match) => {
          const [, leftText, operator, rightText, resultText] = match;
          const left = Number(leftText);
          const right = Number(rightText);
          const result = Number(resultText);
          return operator === '×' ? left * right === result : left / right === result;
        });
        if (!equations.length || !equationsAreValid || !equations.some((match) => match.slice(1).some((part) => Number(part) === answer))) {
          fail(`interaction ${interaction.key} fact-family equations do not support its answer`);
        }
      }
      if (visual.kind === 'composite-area') {
        const partValues = steps.slice(0, -1).map((step) => Number(step.match(/(\d+)\D*$/)?.[1]));
        if (!partValues.length || partValues.some((value) => !Number.isFinite(value)) || partValues.reduce((sum, value) => sum + value, 0) !== answer) {
          fail(`interaction ${interaction.key} composite-area parts do not produce its answer`);
        }
      }
      if (visual.kind === 'scaled-graph') {
        const values = visual.bars?.map((bar) => bar.value) ?? [];
        const pairMakesAnswer = values.some((left, leftIndex) => values.some((right, rightIndex) => leftIndex !== rightIndex && left + right === answer));
        if (!values.includes(answer) && !pairMakesAnswer) {
          fail(`interaction ${interaction.key} scaled-graph values do not support its answer`);
        }
      }
    }
  }

  for (const coverage of candidate.verifiedCoverage.lessons) {
    const sessions = candidate.interactions.filter(
      (interaction) => interaction.volume === candidate.verifiedCoverage.volume
        && interaction.unit === candidate.verifiedCoverage.unit
        && interaction.lesson === coverage.lesson
    );
    if (sessions.length !== coverage.sessions) {
      fail(`Lesson ${coverage.lesson} has ${sessions.length} verified sessions; ${coverage.sessions} are required`);
    }
  }
}

validateRegistry(registry);

validateIdentity(volumeOneSessionRegistry as unknown as IReadyEvidenceRegistry);
if (volumeOneSessionRegistry.sourceId !== registry.approvedSources[0]?.id) {
  fail('expanded Volume 1 sessions reference an unapproved source');
}

const expandedInteractions: readonly IReadyInteractionEvidence[] = volumeOneSessionRegistry.sessions.map((session) => {
  const firstPrintedPage = Number(session.printedPages.match(/^\d+/)?.[0]);
  if (!Number.isFinite(firstPrintedPage)) {
    fail(`interaction ${session.key} has invalid printed-page provenance`);
  }
  return {
    ...session,
    sourceId: volumeOneSessionRegistry.sourceId,
    status: 'verified' as const,
    volume: 1,
    viewerPage: firstPrintedPage + 12,
    supportsSolvedTeaching: true as const,
    sourceChecks: [
      { purpose: 'prompt' as const, printedPages: session.printedPages, markers: session.promptMarkers },
      { purpose: 'model' as const, printedPages: session.printedPages, markers: session.modelMarkers }
    ],
    activity: { ...session.activity, kind: 'concept-model' as const }
  };
});

const originalKeys = new Set(registry.interactions.map((interaction) => interaction.key));
for (const interaction of expandedInteractions) {
  if (originalKeys.has(interaction.key)) {
    fail(`interaction key ${interaction.key} is duplicated across registries`);
  }
}
for (const coverage of volumeOneSessionRegistry.verifiedCoverage) {
  validateRegistry({
    ...registry,
    verifiedCoverage: { volume: 1, ...coverage },
    interactions: expandedInteractions.filter((interaction) => interaction.unit === coverage.unit)
  });
}

export const IREADY_EVIDENCE_REGISTRY = Object.freeze(registry);
export const IREADY_APPROVED_SOURCES = Object.freeze([...registry.approvedSources]);
export const IREADY_UNIT_IDEAS = Object.freeze([...registry.unitIdeas]);
export const IREADY_INTERACTIONS = Object.freeze([...registry.interactions, ...expandedInteractions]);

export function verifiedInteractionsForLesson(lessonNumber: number): readonly IReadyInteractionEvidence[] {
  return IREADY_INTERACTIONS
    .filter((interaction) => interaction.lesson === lessonNumber && interaction.status === 'verified')
    .sort((left, right) => left.session - right.session);
}

export function verifiedInteraction(lessonNumber: number, sessionNumber: number): IReadyInteractionEvidence | undefined {
  return IREADY_INTERACTIONS.find(
    (interaction) => interaction.lesson === lessonNumber
      && interaction.session === sessionNumber
      && interaction.status === 'verified'
  );
}

export function interactionSourceUrl(interaction: IReadyInteractionEvidence): string {
  const source = IREADY_APPROVED_SOURCES.find((candidate) => candidate.id === interaction.sourceId);
  if (!source) {
    fail(`interaction ${interaction.key} references a missing source`);
  }
  return `${source.sourceUrl}${interaction.viewerPage}/`;
}

export function unitIdeaSourceUrl(idea: IReadyUnitIdea): string {
  const source = IREADY_APPROVED_SOURCES.find((candidate) => candidate.id === idea.sourceId);
  if (!source) {
    fail(`Unit ${idea.unit} Big Idea references a missing source`);
  }
  return `${source.sourceUrl}${idea.viewerPage}/`;
}
