import type { ProblemVisualSection, ProblemVisualSpec } from '../../data/lessons/lesson-runtime.types';
import evidenceJson from './iready-interactive.volume2-evidence.json';
import sessionsJson from './iready-interactive.volume2-sessions.json';
import inventoryJson from './iready-volume2-page-inventory.json';
import { IREADY_V2_TEACHING_TRACE } from './iready-volume2-teaching';
import teacherProvenanceJson from './iready-volume2-teacher-provenance.json';

export type IReadyV2Phase = 'Explore' | 'Develop' | 'Refine';
export type IReadyV2Model =
  | 'fraction-parts' | 'fraction-number-line' | 'equivalent-fractions' | 'whole-as-fraction'
  | 'compare-fractions' | 'compare-symbols' | 'line-plot' | 'clock' | 'elapsed-time'
  | 'liquid-volume' | 'mass' | 'shape-attributes' | 'quadrilaterals' | 'area-perimeter' | 'partition-shapes';

export interface IReadyV2Session {
  readonly unit: number;
  readonly lesson: number;
  readonly session: number;
  readonly phase: IReadyV2Phase;
  readonly title: string;
  readonly printedPages: string;
  readonly model: IReadyV2Model;
}

export interface IReadyV2Page {
  readonly viewerPage: number;
  readonly printedPage: number | null;
  readonly physicalPdfPage: number;
  readonly side: 'left' | 'right';
  readonly unit: number | null;
  readonly lesson: number | null;
  readonly session: number | null;
  readonly phase: IReadyV2Phase | null;
  readonly kind: string;
  readonly sourceTextSha256: string;
}

export interface IReadyV2TeacherSpread {
  readonly lesson: number;
  readonly studentPages: string;
  readonly teacherGuideViewerPages: string;
  readonly teacherPdfPage: number;
  readonly sourceTextSha256: string;
}

export interface IReadyV2UnitIdea {
  readonly sourceId: string;
  readonly unit: number;
  readonly title: string;
  readonly understanding: string;
  readonly printedPage: number;
  readonly viewerPage: number;
}

export interface IReadyV2LibraryGroup {
  readonly key: string;
  readonly title: string;
  readonly detail: string;
  readonly viewerStart: number;
  readonly viewerEnd: number;
  readonly unit?: number;
}

type V2Evidence = typeof evidenceJson;
type V2Inventory = Omit<typeof inventoryJson, 'pages'> & { pages: IReadyV2Page[] };
type V2Sessions = Omit<typeof sessionsJson, 'sessions'> & { sessions: IReadyV2Session[] };
type V2TeacherProvenance = Omit<typeof teacherProvenanceJson, 'spreads'> & { spreads: IReadyV2TeacherSpread[] };

const evidence = evidenceJson as V2Evidence;
const inventory = inventoryJson as unknown as V2Inventory;
const sessionRegistry = sessionsJson as unknown as V2Sessions;
const teacherRegistry = teacherProvenanceJson as unknown as V2TeacherProvenance;

function reject(message: string): never {
  throw new Error(`i-Ready Volume 2 registry rejected: ${message}`);
}

function validateBoundary(): void {
  const registries = [evidence, inventory, sessionRegistry, teacherRegistry];
  if (registries.some((item) => item.program !== 'i-ready-classroom-mathematics-california' || item.publisher !== 'Curriculum Associates' || item.grade !== 3 || item.volume !== 2)) {
    reject('program identity is not the approved i-Ready Grade 3 Volume 2 boundary');
  }
  if (/eureka|\bmodule\b/i.test(JSON.stringify({ evidence, inventory, sessionRegistry, teacherRegistry }))) {
    reject('cross-program content or terminology was detected');
  }
  if (evidence.coverageStatus !== 'complete-official-volume' || inventory.coverageStatus !== 'complete-official-volume-inventory' || sessionRegistry.coverageStatus !== 'complete-official-session-sequence' || teacherRegistry.coverageStatus !== 'complete-lesson-page-to-teacher-spread-map') {
    reject('a Volume 2 registry is not marked complete');
  }
  if (inventory.pages.length !== 396 || sessionRegistry.sessions.length !== 52 || teacherRegistry.spreads.length !== 134) {
    reject('expected 396 viewer pages, 52 sessions, and 134 mapped Teacher Guide spreads');
  }
  const sources = evidence.approvedSources;
  if (sources.length !== 2 || sources.some((source) => source.volume !== 2 || source.localPaths.some((path) => !path.startsWith('iReady-Maths/') || /eureka/i.test(path)))) {
    reject('approved source paths cross the iReady-Maths Volume 2 boundary');
  }
  for (let viewerPage = 1; viewerPage <= 396; viewerPage += 1) {
    const page = inventory.pages[viewerPage - 1];
    if (page?.viewerPage !== viewerPage || !/^[a-f0-9]{64}$/.test(page.sourceTextSha256)) reject(`viewer page ${viewerPage} is absent or unhashed`);
  }
}
validateBoundary();

export const IREADY_VOLUME_TWO_SESSIONS = sessionRegistry.sessions;
export const IREADY_VOLUME_TWO_PAGES = inventory.pages;
export const IREADY_VOLUME_TWO_UNIT_IDEAS = evidence.unitIdeas as readonly IReadyV2UnitIdea[];
export const IREADY_VOLUME_TWO_TEACHER_SPREADS = teacherRegistry.spreads;

export const IREADY_VOLUME_TWO_LIBRARY: readonly IReadyV2LibraryGroup[] = [
  { key: 'front-matter', title: 'Volume 2 front matter and contents', detail: 'Cover, digital resources, and official contents', viewerStart: 1, viewerEnd: 12 },
  { key: 'unit4-opening', title: 'Unit 4 opening', detail: 'Self Check, Big Ideas Organizer, STEM story, and vocabulary', viewerStart: 13, viewerEnd: 18, unit: 4 },
  { key: 'unit4-application', title: 'Unit 4 application and review', detail: 'Self Reflection, Math in Action, unit review, and vocabulary', viewerStart: 133, viewerEnd: 146, unit: 4 },
  { key: 'unit5-opening', title: 'Unit 5 opening', detail: 'Self Check, Big Ideas Organizer, STEM story, and vocabulary', viewerStart: 147, viewerEnd: 152, unit: 5 },
  { key: 'unit5-application', title: 'Unit 5 application and review', detail: 'Math in Action, unit review, and vocabulary', viewerStart: 227, viewerEnd: 238, unit: 5 },
  { key: 'unit6-opening', title: 'Unit 6 opening', detail: 'Self Check, Big Ideas Organizer, STEM story, and vocabulary', viewerStart: 239, viewerEnd: 244, unit: 6 },
  { key: 'unit6-application', title: 'Unit 6 application and review', detail: 'Math in Action, unit review, and vocabulary', viewerStart: 325, viewerEnd: 336, unit: 6 },
  { key: 'data-talks', title: 'Data Talks', detail: 'Official Volume 2 Data Talks', viewerStart: 337, viewerEnd: 340 },
  { key: 'review-practice', title: 'Review & Practice', detail: 'Unit 4, Unit 5, and Unit 6 review sets', viewerStart: 341, viewerEnd: 352 },
  { key: 'glossary', title: 'Glossary / Glosario', detail: 'Official bilingual mathematics glossary', viewerStart: 353, viewerEnd: 372 },
  { key: 'correlations', title: 'California Correlations', detail: 'Official standards correlations', viewerStart: 373, viewerEnd: 380 },
  { key: 'index', title: 'Index and publishing matter', detail: 'Index, acknowledgments, and end matter', viewerStart: 381, viewerEnd: 396 }
];

const pagesInRange = (rangeValue: string): number[] => {
  const values = [...rangeValue.matchAll(/\d+/g)].map((match) => Number(match[0]));
  return Array.from({ length: (values[1] ?? values[0]) - values[0] + 1 }, (_, index) => values[0] + index);
};

export function v2SessionsForLesson(lesson: number): readonly IReadyV2Session[] {
  return IREADY_VOLUME_TWO_SESSIONS.filter((session) => session.lesson === lesson);
}

export function v2PagesForSession(session: IReadyV2Session): readonly number[] {
  return pagesInRange(session.printedPages);
}

export function v2ViewerPageForPrintedPage(printedPage: number): number {
  if (printedPage < 467 || printedPage > 789) reject(`printed page ${printedPage} is outside the official Volume 2 instructional range`);
  return printedPage - 454;
}

export function v2StudentImageByViewerPage(viewerPage: number): string {
  return `/assets/iready-volume2/student/viewer-${String(viewerPage).padStart(3, '0')}.webp`;
}

export function v2StudentImage(printedPage: number): string {
  return v2StudentImageByViewerPage(v2ViewerPageForPrintedPage(printedPage));
}

export function v2TeacherImage(viewerPage: number): string {
  return `/assets/iready-volume2/teacher/viewer-${String(viewerPage).padStart(3, '0')}.webp`;
}

export function v2OfficialUrlForViewerPage(viewerPage: number): string {
  return `https://online.flippingbook.com/view/336471940/${viewerPage}/`;
}

export function v2OfficialUrlForPrintedPage(printedPage: number): string {
  return v2OfficialUrlForViewerPage(v2ViewerPageForPrintedPage(printedPage));
}

export function v2UnitIdeas(unit: number): readonly IReadyV2UnitIdea[] {
  return IREADY_VOLUME_TWO_UNIT_IDEAS.filter((idea) => idea.unit === unit);
}

export function v2LibraryForUnit(unit: number): readonly IReadyV2LibraryGroup[] {
  return IREADY_VOLUME_TWO_LIBRARY.filter((group) => group.unit === unit);
}

export function v2ViewerPagesForLibrary(group: IReadyV2LibraryGroup): readonly number[] {
  return Array.from({ length: group.viewerEnd - group.viewerStart + 1 }, (_, index) => group.viewerStart + index);
}

export function v2TeacherSpreadForPrintedPage(printedPage: number): IReadyV2TeacherSpread | undefined {
  return IREADY_VOLUME_TWO_TEACHER_SPREADS.find((spread) => {
    const values = pagesInRange(spread.studentPages);
    return values.includes(printedPage);
  });
}

export function v2TeacherViewerPages(spread: IReadyV2TeacherSpread): readonly number[] {
  return pagesInRange(spread.teacherGuideViewerPages);
}

const exactSourceNote = 'The values and mathematical focus in this visual come from this session’s cited Student Worktext Volume 2 pages. The portal supplies only the interactive rendering; the mapped Teacher Guide Volume 2 spread supplies the solved-teaching evidence.';

const v2AssetModel = (
  src: string,
  label: string,
  alt: string,
  crop: { x: number; y: number; width: number; height: number },
  annotations: Extract<ProblemVisualSection, { kind: 'source-model' }>['annotations'],
  reasoning: Extract<ProblemVisualSection, { kind: 'source-model' }>['reasoning'],
  caption: string,
  displayWidth = 820
): ProblemVisualSection => ({
  kind: 'source-model',
  label,
  src,
  alt,
  imageWidth: 960,
  imageHeight: 1012,
  crop,
  displayWidth,
  annotations,
  reasoning,
  caption
});

const v2SourceModel = (
  printedPage: number,
  label: string,
  alt: string,
  crop: { x: number; y: number; width: number; height: number },
  annotations: Extract<ProblemVisualSection, { kind: 'source-model' }>['annotations'],
  reasoning: Extract<ProblemVisualSection, { kind: 'source-model' }>['reasoning'],
  caption: string,
  displayWidth = 820
): ProblemVisualSection => v2AssetModel(
  v2StudentImage(printedPage),
  label,
  alt,
  crop,
  annotations,
  reasoning,
  caption,
  displayWidth
);

const v2TeacherSourceModel = (
  viewerPage: number,
  label: string,
  alt: string,
  crop: { x: number; y: number; width: number; height: number },
  annotations: Extract<ProblemVisualSection, { kind: 'source-model' }>['annotations'],
  reasoning: Extract<ProblemVisualSection, { kind: 'source-model' }>['reasoning'],
  caption: string,
  displayWidth = 820
): ProblemVisualSection => v2AssetModel(
  v2TeacherImage(viewerPage),
  label,
  alt,
  crop,
  annotations,
  reasoning,
  caption,
  displayWidth
);

interface V2SessionSourceCrop {
  readonly crop: { readonly x: number; readonly y: number; readonly width: number; readonly height: number };
  readonly label: string;
  readonly alt: string;
  readonly displayWidth?: number;
}

/**
 * Manually selected, session-specific model crops from the official Student
 * Worktext. These are deliberately keyed per session: a model-family crop or
 * a neighboring-session fallback would silently change the mathematics.
 */
const V2_SESSION_SOURCE_CROPS: Readonly<Record<string, V2SessionSourceCrop>> = {
  '20-1': { crop: { x: 82, y: 316, width: 475, height: 168 }, label: 'Compare the four official equal-part models', alt: 'Four official i-Ready shapes partitioned into thirds or fourths, with one part shaded' },
  '20-2': { crop: { x: 72, y: 250, width: 620, height: 520 }, label: 'Read fractions from the official square, circle, triangle, and rectangle models', alt: 'Official i-Ready fraction models partitioned into fourths, eighths, and other equal parts', displayWidth: 620 },
  '20-3': { crop: { x: 336, y: 350, width: 350, height: 372 }, label: 'Test equal area in the official square and paper-airplane models', alt: 'Three official square models and two paper-airplane models used to compare equal-area parts', displayWidth: 560 },
  '21-1': { crop: { x: 86, y: 319, width: 455, height: 344 }, label: 'Connect the official area models to their number lines', alt: 'Official whole-number and fractional area models aligned with number lines' },
  '21-2': { crop: { x: 78, y: 254, width: 445, height: 458 }, label: 'Count sixths and eighths on the official number lines', alt: 'Official i-Ready area models and number lines partitioned into sixths and eighths', displayWidth: 580 },
  '21-3': { crop: { x: 78, y: 252, width: 548, height: 650 }, label: 'Verify three official fraction-number-line claims', alt: 'Official number lines for seven eighths, five sixths, and eight eighths', displayWidth: 520 },
  '22-1': { crop: { x: 76, y: 282, width: 470, height: 490 }, label: 'Align one half and two fourths on official area models and number lines', alt: 'Official circles, number lines, and rectangular models showing one half and two fourths', displayWidth: 580 },
  '22-2': { crop: { x: 76, y: 250, width: 450, height: 530 }, label: 'Read equivalent endpoints on the official paired number lines', alt: 'Official paired number lines partitioned into thirds and sixths, then fourths and eighths', displayWidth: 520 },
  '22-3': { crop: { x: 72, y: 258, width: 610, height: 620 }, label: 'Test equivalence with the official bars, flag, and number line', alt: 'Official fraction bars, flag models, and number line showing equivalent and non-equivalent fractions', displayWidth: 600 },
  '23-1': { crop: { x: 52, y: 190, width: 655, height: 265 }, label: 'Keep the same official moussaka whole while repartitioning it', alt: 'Official i-Ready moussaka context asking for another name for one half after cutting the same whole into fourths' },
  '23-2': { crop: { x: 52, y: 188, width: 650, height: 242 }, label: 'Compare two eighths and one fourth of same-size oranges', alt: 'Official i-Ready orange context comparing two eighths with one fourth of the same-size whole' },
  '23-3': { crop: { x: 52, y: 188, width: 650, height: 250 }, label: 'Partition two same-size boards into fourths', alt: 'Official i-Ready board context asking how many fourths are contained in two wholes' },
  '23-4': { crop: { x: 52, y: 188, width: 650, height: 240 }, label: 'Treat each official melon as one whole-size part', alt: 'Official i-Ready melon context asking for four wholes as a fraction with denominator one' },
  '23-5': { crop: { x: 52, y: 220, width: 455, height: 315 }, label: 'Follow the official cucumber model from fourths to eighths', alt: 'Official worked cucumber model showing four eighths and one half of the same-size whole' },
  '24-1': { crop: { x: 438, y: 320, width: 220, height: 300 }, label: 'Compare one fourth and two fourths on the same-size official models', alt: 'Official fourths area models and number line comparing one fourth with two fourths', displayWidth: 400 },
  '24-2': { crop: { x: 72, y: 258, width: 585, height: 555 }, label: 'Choose the comparison relationship supported by each official area-model pair', alt: 'Official circle, hexagon, rectangle, and square fraction comparison models', displayWidth: 620 },
  '24-3': { crop: { x: 455, y: 430, width: 230, height: 245 }, label: 'Notice that the two official flatbread wholes are different sizes', alt: 'Two official flatbread models of different sizes partitioned into halves and thirds', displayWidth: 470 },
  '25-1': { crop: { x: 52, y: 188, width: 650, height: 235 }, label: 'Compare four sixths and five sixths in same-size cups', alt: 'Official i-Ready acai-juice context comparing four sixths and five sixths' },
  '25-2': { crop: { x: 52, y: 188, width: 650, height: 235 }, label: 'Compare four eighths and four sixths on same-size totem poles', alt: 'Official i-Ready totem-pole context comparing four eighths and four sixths' },
  '25-3': { crop: { x: 52, y: 228, width: 455, height: 330 }, label: 'Read one fourth and three fourths on the official subway number line', alt: 'Official worked subway number line comparing one fourth with three fourths' },
  '26-1': { crop: { x: 54, y: 216, width: 620, height: 345 }, label: 'Measure the five official green beans from their aligned zero endpoints', alt: 'Five official green beans labeled A through E for whole-inch measurement' },
  '26-2': { crop: { x: 410, y: 190, width: 270, height: 190 }, label: 'Measure the six official earthworms to the nearest quarter inch', alt: 'Six official earthworms labeled A through F for quarter-inch measurement' },
  '26-3': { crop: { x: 52, y: 220, width: 575, height: 180 }, label: 'Transfer the exact official earthworm table to a line plot', alt: 'Official table of eight earthworm lengths measured to the nearest quarter inch' },
  '26-4': { crop: { x: 52, y: 220, width: 455, height: 505 }, label: 'Measure the official beetle and update its line plot', alt: 'Official worked beetle measurement and line plot example', displayWidth: 540 },
  '27-1': { crop: { x: 485, y: 188, width: 155, height: 165 }, label: 'Read Rico’s official analog clock', alt: 'Official analog clock showing 8:32', displayWidth: 420 },
  '27-2': { crop: { x: 52, y: 190, width: 650, height: 165 }, label: 'Translate “43 minutes past noon” into an exact time', alt: 'Official lunch context asking for the time 43 minutes past noon' },
  '27-3': { crop: { x: 52, y: 205, width: 620, height: 180 }, label: 'Combine the three official elapsed-time intervals', alt: 'Official Jess word problem with 10, 15, and 22 minute activities beginning at 3:30 p.m.' },
  '27-4': { crop: { x: 52, y: 205, width: 620, height: 190 }, label: 'Work backward from the official 5:20 p.m. end time', alt: 'Official Alec word problem with 15 minutes of travel and 25 minutes of chores' },
  '27-5': { crop: { x: 52, y: 225, width: 455, height: 305 }, label: 'Split the official 9:40–10:32 interval at 10:00', alt: 'Official worked soccer-game example finding the elapsed time from 9:40 a.m. to 10:32 a.m.' }
};

const V2_SOURCE_FIGURE_REQUIRED = new Set(['20-3', '24-3', '26-1', '26-2']);

function v2SessionSourceTeaching(session: IReadyV2Session, solved: boolean): ProblemVisualSection[] {
  const key = `${session.lesson}-${session.session}`;
  const crop = V2_SESSION_SOURCE_CROPS[key];
  const trace = IREADY_V2_TEACHING_TRACE[key];
  if (!crop || !trace) reject(`lesson ${session.lesson}, session ${session.session} has no reviewed source crop and teaching trace`);
  const reasoning: ProblemVisualSection = {
    kind: 'source-directions',
    label: 'Reason through this exact i-Ready model',
    items: [
      { lead: 'Notice', text: trace.moves[0] },
      { lead: 'Represent', text: trace.moves[1] },
      { lead: 'Explain', text: solved ? trace.moves[2] : 'Use the model to complete the final explanation.' }
    ]
  };
  if (!V2_SOURCE_FIGURE_REQUIRED.has(key)) return [reasoning];

  return [
    v2SourceModel(
      trace.sourcePage,
      `${crop.label} · Student Worktext p. ${trace.sourcePage}`,
      crop.alt,
      crop.crop,
      [],
      [
        { label: 'Notice', explanation: trace.moves[0] },
        { label: 'Represent', explanation: trace.moves[1] },
        { label: 'Explain', explanation: solved ? trace.moves[2] : 'Use the source model to complete the final explanation.' }
      ],
      trace.takeaway,
      crop.displayWidth ?? 820
    ),
    reasoning
  ];
}

function v2ShapeAttributeSections(session: IReadyV2Session): ProblemVisualSection[] {
  if (session.session === 1) {
    return [
      v2SourceModel(
        701,
        '1. Compare the exact official shape set · Student Worktext p. 701',
        'Official i-Ready set of six shapes used to compare side lengths',
        { x: 76, y: 448, width: 438, height: 92 },
        [],
        [
          { label: 'Measure before grouping', explanation: 'Use the side lengths shown in the official set; rotation and appearance are not attributes.' },
          { label: 'Record the evidence', explanation: 'Mark no equal sides, some equal sides, or all equal sides only after comparing every side.' }
        ],
        'This exact shape set controls the side-length comparison.'
      ),
      v2SourceModel(
        701,
        '2. Test opposite sides on the official quadrilaterals',
        'Official i-Ready quadrilaterals used to identify equal opposite sides',
        { x: 72, y: 665, width: 402, height: 155 },
        [],
        [
          { label: 'Opposite means non-touching', explanation: 'Compare each pair of sides that do not share a vertex.' },
          { label: 'Verified result', expression: 'parallelogram · rhombus · rectangle', explanation: 'These are the three official figures with equal opposite sides.' }
        ],
        'The official Teacher Guide p. 701 confirms the highlighted three figures.'
      )
    ];
  }

  if (session.session === 2) {
    return [
      v2SourceModel(
        705,
        '1. Sort the exact official shapes A–F · Student Worktext p. 705',
        'Official i-Ready shapes A through F used for attribute sorting',
        { x: 67, y: 250, width: 598, height: 112 },
        [],
        [
          { label: 'Some right angles', expression: 'A, C, D, E' },
          { label: 'Some sides the same length', expression: 'B, C, D, F' },
          { label: 'Both attributes', expression: 'C, D' }
        ],
        'These groups are verified by the mapped Teacher Guide p. 705.'
      ),
      {
        kind: 'note',
        label: '2. Read the overlap as a classification',
        text: 'A shape can belong to more than one group. C and D remain in both groups because each has at least one right angle and at least one pair of equal-length sides.'
      }
    ];
  }

  return [
    v2SourceModel(
      709,
      '1. Compare the two official figures · Student Worktext p. 709',
      'Official i-Ready five-sided and six-sided figures used to compare attributes',
      { x: 428, y: 270, width: 238, height: 150 },
      [],
      [
        { label: 'Alike', explanation: 'Both figures have 2 right angles and 2 sides of the same length.' },
        { label: 'Different', expression: '5 sides / 5 angles · 6 sides / 6 angles' }
      ],
      'The comparison comes from the official Teacher Guide p. 709.'
    ),
    {
      kind: 'note',
      label: '2. Test the rectangle claim',
      text: 'Both statements are correct: every rectangle has some right angles and every rectangle has all right angles. The second statement is more precise.'
    },
    {
      kind: 'note',
      label: '3. Use the official possible model',
      text: 'An equilateral triangle belongs to both requested groups: all sides are the same length and it has no right angles.'
    }
  ];
}

function v2QuadrilateralSections(session: IReadyV2Session): ProblemVisualSection[] {
  if (session.session === 1) {
    return [
      v2SourceModel(
        713,
        '1. Compare the official rhombus and rectangle · Student Worktext p. 713',
        'Official i-Ready rhombus and rectangle used to begin quadrilateral classification',
        { x: 72, y: 338, width: 205, height: 100 },
        [],
        [
          { label: 'Same', expression: '4 sides · 4 angles · equal opposite sides' },
          { label: 'Different', explanation: 'Only the rhombus has all 4 sides the same length; only the rectangle has 4 right angles.' }
        ],
        'The mapped Teacher Guide p. 713 verifies these attributes.'
      ),
      {
        kind: 'note',
        label: '2. Build the category rule',
        text: 'Both figures are quadrilaterals because each has 4 sides. Their additional attributes place them in more specific categories.'
      }
    ];
  }

  if (session.session === 2) {
    return [
      v2SourceModel(
        717,
        '1. Compare the exact official square and rectangle · Student Worktext p. 717',
        'Official i-Ready square and rectangle used to compare category membership',
        { x: 252, y: 223, width: 256, height: 87 },
        [],
        [
          { label: 'Shared attributes', expression: '4 sides · 4 right angles · 2 parallel pairs · equal opposite sides' },
          { label: 'Square adds', expression: 'all 4 sides equal' }
        ],
        'A square has every rectangle attribute, so every square is a rectangle; a rectangle need not have all four sides equal.'
      ),
      {
        kind: 'related-facts',
        label: '2. Read the category relationship in both directions',
        rows: [
          { left: 'square → rectangle', right: 'always true' },
          { left: 'rectangle → square', right: 'not always true' }
        ]
      }
    ];
  }

  if (session.session === 3) {
    return [
      v2TeacherSourceModel(
        394,
        '1. Use the Teacher Guide’s official possible model · Student p. 723',
        'Official Teacher Guide possible student model for a quadrilateral with four equal sides and no right angles',
        { x: 45, y: 430, width: 190, height: 145 },
        [{ label: '4 equal sides · no right angles', x: 5, y: 5, width: 86, height: 82, tone: 'focus' }],
        [
          { label: 'Required attributes', expression: '4 equal sides · 0 right angles' },
          { label: 'Verified category', expression: 'rhombus' },
          { label: 'Also true', explanation: 'The shown model is a parallelogram and a quadrilateral.' }
        ],
        'The source model and classification come directly from the mapped Teacher Guide pp. 723–724.',
        520
      ),
      {
        kind: 'related-facts',
        label: '2. Use the verified attributes to include and exclude categories',
        rows: [
          { left: '4 equal sides', right: 'rhombus · parallelogram · quadrilateral' },
          { left: '0 right angles', right: 'not a square · not a rectangle' }
        ]
      }
    ];
  }

  return [
    v2TeacherSourceModel(
      400,
      '1. Read the official worked flag model · Student p. 729',
      'Official Teacher Guide model showing a four-right-angle flag as a rectangle',
      { x: 50, y: 235, width: 300, height: 190 },
      [],
      [
        { label: 'Given', expression: '4 sides · 4 right angles' },
        { label: 'Classify', expression: 'rectangle' },
        { label: 'Reason', explanation: 'The attributes—not the flag’s orientation or picture—control the name.' }
      ],
      'The mapped Teacher Guide p. 729 identifies the official flag model as a rectangle.'
    ),
    v2TeacherSourceModel(
      400,
      '2. Check the two official possible drawings',
      'Official Teacher Guide possible drawings of quadrilaterals with no equal sides and no right angles',
      { x: 48, y: 430, width: 320, height: 175 },
      [],
      [
        { label: 'Check every side', explanation: 'No pair has the same length.' },
        { label: 'Check every angle', explanation: 'None is a right angle.' }
      ],
      'Both drawings satisfy the official attribute conditions even though they look different.'
    )
  ];
}

function v2AreaPerimeterSections(session: IReadyV2Session, solved: boolean): ProblemVisualSection[] {
  const answer = (blank: string, complete: string) => solved ? complete : blank;

  if (session.session === 1) {
    return [
      {
        kind: 'perimeter-path',
        label: 'Trace Kala’s complete route around the soccer field · official Student Worktext p. 735',
        contextLabel: 'soccer field',
        top: '60 yd',
        right: '40 yd',
        bottom: '60 yd',
        left: '40 yd',
        equationPrompt: 'Perimeter is the distance around the entire field.',
        equationAnswer: '60 + 40 + 60 + 40 = 200 yards',
        caption: solved
          ? 'All four official side lengths are used once. The answer is 200 yards, a linear measure.'
          : 'Select each side of the field once to build the distance around.'
      }
    ];
  }

  if (session.session === 2) {
    return [
      {
        kind: 'tape',
        label: '1. Build the six-sided pen from the official facts · Student Worktext p. 739',
        totalLabel: 'perimeter = 23 ft',
        parts: [
          { label: '7 ft', emphasize: true },
          { label: '2 ft' },
          { label: '5 ft', emphasize: true },
          { label: '2 ft' },
          { label: '2 ft' },
          { label: answer('? ft', '5 ft'), emphasize: true }
        ],
        equations: [answer('7 + 2 + 5 + 2 + 2 + ? = 23', '7 + 2 + 5 + 2 + 2 + 5 = 23')],
        equationAnswers: solved ? undefined : [['5']],
        caption: 'The tape uses the six exact side facts printed in the official problem; it does not invent a pen shape.'
      },
      {
        kind: 'equations',
        label: '2. Isolate the unknown side',
        lines: [
          '7 + 2 + 5 + 2 + 2 = 18',
          answer('23 − 18 = ___', '23 − 18 = 5'),
          answer('unknown side = ___ ft', 'unknown side = 5 ft')
        ],
        lineAnswers: solved ? undefined : [[], ['5'], ['5']]
      },
      {
        kind: 'equations',
        label: '3. Check the entire perimeter',
        lines: [answer('7 + 2 + 5 + 2 + 2 + ___ = 23', '7 + 2 + 5 + 2 + 2 + 5 = 23')],
        lineAnswers: solved ? undefined : [['5']]
      }
    ];
  }

  if (session.session === 3) {
    return [
      v2SourceModel(
        745,
        '1. Start with the official 4-by-4 tent-floor model · Student Worktext p. 745',
        'Official i-Ready four-by-four square-unit rectangle representing one tent floor mat',
        { x: 485, y: 226, width: 104, height: 112 },
        [{ label: '16 square feet', x: 7, y: 7, width: 81, height: 79, tone: 'focus' }],
        [
          { label: 'Count rows and columns', expression: '4 × 4 = 16 square feet' },
          { label: 'Trace its boundary', expression: '4 + 4 + 4 + 4 = 16 feet' }
        ],
        'The official model fixes the area at 16 square feet and gives one perimeter to compare.',
        420
      ),
      {
        kind: 'array',
        label: '2. Recompose the same 16 square units as 2 rows of 8',
        rows: 2,
        columns: 8,
        item: 'dot',
        mode: 'solved',
        caption: answer('Area = 16 square feet; perimeter = ___ feet', 'Area = 16 square feet; perimeter = 20 feet')
      },
      {
        kind: 'equations',
        label: '3. Compare the two boundaries',
        lines: [
          '4 × 4 = 16; perimeter = 16 ft',
          answer('2 × 8 = 16; perimeter = ___ ft', '2 × 8 = 16; perimeter = 20 ft'),
          'Same area, different perimeters'
        ],
        lineAnswers: solved ? undefined : [[], ['20'], []]
      }
    ];
  }

  if (session.session === 4) {
    return [
      v2SourceModel(
        751,
        '1. Start with the official 2-by-4 cracker model · Student Worktext p. 751',
        'Official i-Ready two-by-four square-unit rectangle representing the cracker arrangement',
        { x: 548, y: 224, width: 106, height: 70 },
        [{ label: '2 rows × 4 columns', x: 8, y: 12, width: 83, height: 68, tone: 'focus' }],
        [
          { label: 'Area', expression: '2 × 4 = 8 square units' },
          { label: 'Perimeter', expression: '4 + 2 + 4 + 2 = 12 units' }
        ],
        'The official cracker model establishes a perimeter of 12 units and an area of 8 square units.'
      ),
      {
        kind: 'array',
        label: '2. Keep perimeter 12 but change the area',
        rows: 1,
        columns: 5,
        item: 'dot',
        mode: 'solved',
        caption: answer('1 × 5 has perimeter ___ units and area ___ square units.', '1 × 5 has perimeter 12 units and area 5 square units.')
      },
      {
        kind: 'equations',
        label: '3. Compare the measures',
        lines: [
          '2 × 4: perimeter 12; area 8',
          answer('1 × 5: perimeter ___; area ___', '1 × 5: perimeter 12; area 5'),
          'Same perimeter, different areas'
        ],
        lineAnswers: solved ? undefined : [[], ['12', '5'], []]
      }
    ];
  }

  return [
    {
      kind: 'array',
      label: '1. First rectangle · same official perimeter',
      rows: 4,
      columns: 6,
      item: 'square',
      caption: 'Area = 6 × 4 = 24 square units; perimeter = 2(6 + 4) = 20 units.'
    },
    {
      kind: 'array',
      label: '2. Second rectangle · same official perimeter',
      rows: 3,
      columns: 7,
      item: 'square',
      caption: 'Area = 7 × 3 = 21 square units; perimeter = 2(7 + 3) = 20 units.'
    },
    v2SourceModel(
      757,
      '3. Verify both rectangles in the official worked example · Student Worktext p. 757',
      'Official i-Ready worked example comparing a six-by-four rectangle with a seven-by-three rectangle',
      { x: 186, y: 326, width: 244, height: 302 },
      [{ label: 'same perimeter: 20 units', x: 7, y: 3, width: 86, height: 91, tone: 'focus' }],
      [
        { label: 'First rectangle', expression: '6 × 4 = 24 square units' },
        { label: 'Second rectangle', expression: '7 × 3 = 21 square units' },
        { label: 'Boundary check', expression: '2(6 + 4) = 2(7 + 3) = 20 units' }
      ],
      'The official example shows that equal perimeter does not force equal area.',
      580
    ),
    {
      kind: 'equations',
      label: '4. Decide which measure the new problem asks for',
      lines: [
        'Around a field → perimeter → linear units',
        'Covering a field → area → square units'
      ]
    }
  ];
}

function v2Lesson28Visual(session: IReadyV2Session, solved: boolean): ProblemVisualSpec {
  const answer = (blank: string, complete: string) => solved ? complete : blank;
  const sourceCrop = (
    printedPage: number,
    label: string,
    alt: string,
    crop: { x: number; y: number; width: number; height: number },
    caption: string,
    displayWidth = 820
  ) => v2SourceModel(
    printedPage,
    label,
    alt,
    crop,
    [],
    [{ label: 'Read the exact official model', explanation: caption }],
    caption,
    displayWidth
  );

  if (session.session === 1) {
    return {
      title: session.title,
      sourceNote: 'Student Worktext Volume 2 pp. 637–640 and Teacher Guide Volume 2 pp. 637–640: select a one-liter measuring tool, use repeated units, and compare containers with a one-liter benchmark.',
      sections: [
        sourceCrop(
          637,
          '1. Choose a tool that measures liquid volume · official p. 637',
          'Official i-Ready model showing a ruler, a one-liter measuring cup, and a bucket',
          { x: 46, y: 188, width: 590, height: 260 },
          'The ruler measures length. The one-liter cup supplies the repeatable liquid-volume unit.'
        ),
        {
          kind: 'source-directions',
          label: '2. Measure the bucket with repeated one-liter units',
          items: solved ? [
            { lead: 'Strategy A', text: 'Fill the one-liter cup, pour it into the empty bucket, and count each full cup until the bucket is full.' },
            { lead: 'Strategy B', text: 'Fill the bucket first, remove water with the one-liter cup, and count the full cups removed.' },
            { lead: 'Why both work', text: 'Each count represents one equal liter, so either direction measures the same capacity.' }
          ] : [
            { lead: 'Choose', text: 'Select the tool that measures liquid volume rather than length.' },
            { lead: 'Repeat', text: 'Use the same one-liter unit again and again.' },
            { lead: 'Count', text: 'Record how many full one-liter units the bucket holds.' }
          ]
        },
        {
          kind: 'card-grid',
          label: '3. Use one liter as a benchmark · official p. 638',
          cards: [
            { label: 'Less than 1 liter', sections: [{ kind: 'note', text: answer('Which official example belongs here?', 'A soup can holds less than 1 liter.') }] },
            { label: 'About 1 liter', sections: [{ kind: 'note', text: answer('Which official example belongs here?', 'A milk carton holds about 1 liter.') }] },
            { label: 'More than 1 liter', sections: [{ kind: 'note', text: answer('Which official example belongs here?', 'A swimming pool holds more than 1 liter.') }] }
          ]
        },
        {
          kind: 'note',
          label: 'Teaching conclusion',
          text: answer(
            'A liter is a unit for measuring ___.',
            'A liter is a standard unit for liquid volume. Capacity is found by repeating and counting equal one-liter units—not by measuring container height.'
          ),
          textAnswers: solved ? undefined : ['liquid volume']
        }
      ]
    };
  }

  if (session.session === 2) {
    return {
      title: session.title,
      sourceNote: 'Student Worktext Volume 2 pp. 641–646 and Teacher Guide Volume 2 pp. 641–646: estimate a container’s capacity by comparing it with a known one-liter amount and reasoning about how many equal portions fit.',
      sections: [
        sourceCrop(
          641,
          '1. Compare the fish tank with a one-liter carton · official p. 641',
          'Official i-Ready model showing a one-liter carton next to a small fish tank',
          { x: 48, y: 178, width: 590, height: 185 },
          'The one-liter carton is the known benchmark; the fish tank is the unknown capacity.'
        ),
        {
          kind: 'fraction-strip',
          label: '2. Model one liter as one of eight equal tank portions · official p. 642',
          wholeLabel: 'full fish tank',
          numerator: 1,
          denominator: 8,
          showGivenShading: true,
          caption: answer('1 liter is about ___ of the tank.', '1 liter is about 1/8 of the tank, so about eight one-liter portions fill it.')
        },
        {
          kind: 'equations',
          label: '3. Scale the benchmark to the whole tank',
          lines: [
            answer('1 liter × ___ equal portions ≈ ___ liters', '1 liter × 8 equal portions ≈ 8 liters'),
            answer('Estimated tank capacity: ___ liters', 'Estimated tank capacity: about 8 liters')
          ],
          lineAnswers: solved ? undefined : [['8', '8'], ['8']]
        },
        {
          kind: 'card-grid',
          label: '4. Check whether an estimate is reasonable · official pp. 645–646',
          cards: [
            { label: 'Picnic cooler', sections: [{ kind: 'note', text: answer('Compare with 1-liter bottles.', 'Six one-liter bottles fit, so the cooler is estimated at about 6 liters.') }] },
            { label: 'Container choice', sections: [{ kind: 'note', text: answer('Use familiar one-liter benchmarks.', 'A coffee pot or flower vase can reasonably hold about 1 liter; a bathtub or trash can holds much more, and a teaspoon or paper cup holds much less.') }] },
            { label: '40-liter sink', sections: [{ kind: 'note', text: answer('Choose a similar-capacity object.', 'A bathtub is the reasonable comparison for more than 40 liters.') }] }
          ]
        }
      ]
    };
  }

  if (session.session === 3) {
    return {
      title: session.title,
      sourceNote: 'Student Worktext Volume 2 pp. 647–652 and Teacher Guide Volume 2 pp. 647–652: solve liquid-volume word problems with equal groups, related multiplication and division equations, and labeled answers.',
      sections: [
        sourceCrop(
          648,
          '1. Read the two official models · official p. 648',
          'Official i-Ready bucket scale and four equal two-liter paint cans',
          { x: 0, y: 196, width: 486, height: 610 },
          'The bucket scale and the equal cans show the same 8 liters in two different ways.',
          500
        ),
        {
          kind: 'tape',
          label: '2. Decompose 8 liters into equal 2-liter cans',
          totalLabel: '8 liters of blue paint',
          parts: [
            { label: '2 L', emphasize: true },
            { label: '2 L', emphasize: true },
            { label: '2 L', emphasize: true },
            { label: '2 L', emphasize: true }
          ],
          equations: [answer('8 ÷ 2 = ___ cans', '8 ÷ 2 = 4 cans')],
          equationAnswers: solved ? undefined : [['4']],
          caption: answer('Count equal 2-liter groups until the total reaches 8 liters.', 'Four equal groups of 2 liters compose the 8-liter bucket.')
        },
        {
          kind: 'related-facts',
          label: '3. Connect division to multiplication · official p. 649',
          rows: [
            { left: answer('8 ÷ 2 = ___', '8 ÷ 2 = 4'), right: answer('2 × ___ = 8', '2 × 4 = 8') },
            { left: answer('p = ___ cans', 'p = 4 cans'), right: 'The label tells what the 4 counts.' }
          ]
        },
        {
          kind: 'source-directions',
          label: '4. Decide what operation the story describes',
          items: [
            { lead: 'Equal-size groups', text: 'Use division when a total number of liters is split into containers with the same capacity.' },
            { lead: 'Equal groups combined', text: 'Use multiplication when the number of containers and liters per container are known.' },
            { lead: 'Complete answer', text: 'Keep the unit label—liters, cans, coolers, or days—attached to the result.' }
          ]
        }
      ]
    };
  }

  return {
    title: session.title,
    sourceNote: 'Student Worktext Volume 2 pp. 653–656 and Teacher Guide Volume 2 pp. 653–656: apply liter benchmarks and choose addition, subtraction, multiplication, or division from the quantities and relationships in each problem.',
    sections: [
      sourceCrop(
        653,
        '1. Read a marked container and scale to seven containers · official p. 653',
        'Official i-Ready example showing 10 liters in one container and seven equal containers',
        { x: 48, y: 184, width: 630, height: 342 },
        'The marked container shows 10 liters in each of seven equal containers.'
      ),
      {
        kind: 'tape',
        label: '2. Represent the seven equal containers',
        totalLabel: answer('total water', '70 liters'),
        parts: Array.from({ length: 7 }, () => ({ label: '10 L' })),
        equations: [answer('7 × 10 = ___ liters', '7 × 10 = 70 liters')],
        equationAnswers: solved ? undefined : [['70']],
        caption: answer('Seven equal groups of 10 liters.', 'Seven 10-liter groups compose 70 liters.')
      },
      {
        kind: 'equations',
        label: '3. Match each official relationship to its operation · pp. 653–655',
        lines: [
          answer('186 L + 203 L + 190 L = ___ L', '186 L + 203 L + 190 L = 579 L'),
          answer('8 L ÷ 4 beds = ___ L per bed', '8 L ÷ 4 beds = 2 L per bed')
        ],
        lineAnswers: solved ? undefined : [['579'], ['2']]
      },
      {
        kind: 'note',
        label: 'Teaching conclusion',
        text: 'The unit is liters in every problem, but the operation changes with the relationship: combine totals, compare amounts, make equal groups, or share equally.'
      }
    ]
  };
}

function v2BaseVisualForSession(session: IReadyV2Session, solved: boolean): ProblemVisualSpec {
  const answer = (blank: string, complete: string) => solved ? complete : blank;
  switch (session.model) {
    case 'fraction-parts':
      {
        if (session.session === 3) return { title: session.title, sourceNote: exactSourceNote, sections: [
          { kind: 'note', label: 'Equal-area test', text: answer('Decide whether every proposed part has equal area before naming a fraction.', 'Each official square is split into four equal-area parts, so one shaded part is one fourth. The differently sized paper-airplane wholes cannot be compared as the same quantity.') }
        ] };
        const models = session.session === 1
          ? [{ numerator: 1, denominator: 3, label: 'One shaded third in an equal-part model' }]
          : [
              { numerator: 1, denominator: 4, label: 'One shaded fourth of a square' },
              { numerator: 6, denominator: 8, label: 'Six shaded eighths of a circle' }
            ];
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        ...models.map((model) => ({ kind: 'fraction-strip' as const, label: model.label, wholeLabel: 'same-size whole', numerator: model.numerator, denominator: model.denominator, selectableParts: !solved, correctSelectedParts: model.numerator, caption: answer(`Select ${model.numerator} of ${model.denominator} equal parts.`, `${model.numerator} of ${model.denominator} equal parts is ${model.numerator}/${model.denominator}.`) })),
        { kind: 'equations', label: 'Numerator counts; denominator names the equal-part size', lines: models.map((model) => answer(`___ of ${model.denominator} equal parts = ___`, `${model.numerator} of ${model.denominator} equal parts = ${model.numerator}/${model.denominator}`)), lineAnswers: solved ? undefined : models.map((model) => [String(model.numerator), `${model.numerator}/${model.denominator}`]) }
      ] };
      }
    case 'fraction-number-line':
      {
        const lines = session.session === 1
          ? [{ denominator: 4, target: 1, label: 'Four equal intervals from 0 to 1' }]
          : session.session === 2
            ? [{ denominator: 6, target: 5, label: 'Sixths on the first official number line' }, { denominator: 8, target: 8, label: 'Eighths on the papaya number line' }]
            : [{ denominator: 8, target: 7, label: 'Test Amata’s seven-eighths claim' }, { denominator: 6, target: 5, label: 'Locate five sixths' }];
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        ...lines.map((line) => ({ kind: 'number-line' as const, label: line.label, ticks: Array.from({ length: line.denominator + 1 }, (_, index) => ({ label: index === 0 ? '0' : index === line.denominator ? '1' : answer('___', `${index}/${line.denominator}`), target: index === line.target })), caption: answer('Count equal intervals from 0 to the marked endpoint.', `${line.target} intervals of size 1/${line.denominator} locate ${line.target}/${line.denominator}.`) })),
        { kind: 'equations', label: 'Interval count names the point', lines: lines.map((line) => answer(`The marked point is ___/${line.denominator}.`, `The marked point is ${line.target}/${line.denominator}.`)), lineAnswers: solved ? undefined : lines.map((line) => [String(line.target)]) }
      ] };
      }
    case 'equivalent-fractions':
      {
        const pair = session.lesson === 22
          ? session.session === 1 ? [1, 2, 2, 4] : session.session === 2 ? [1, 3, 2, 6] : [1, 4, 2, 8]
          : session.session === 2 ? [1, 4, 2, 8] : session.session === 5 ? [1, 2, 4, 8] : [1, 2, 2, 4];
        const [leftNumerator, leftDenominator, rightNumerator, rightDenominator] = pair;
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'fraction-strip', label: `${leftDenominator} equal parts`, wholeLabel: 'same-size whole', numerator: leftNumerator, denominator: leftDenominator, showGivenShading: true, caption: `${leftNumerator}/${leftDenominator}` },
        { kind: 'fraction-strip', label: `${rightDenominator} equal parts`, wholeLabel: 'same-size whole', numerator: rightNumerator, denominator: rightDenominator, selectableParts: !solved, correctSelectedParts: rightNumerator, caption: answer(`Select the equivalent amount in ${rightDenominator}ths.`, `${rightNumerator}/${rightDenominator} covers the same amount.`) },
        { kind: 'equations', label: 'Equivalent amounts', lines: [answer(`${leftNumerator}/${leftDenominator} = ___/${rightDenominator}`, `${leftNumerator}/${leftDenominator} = ${rightNumerator}/${rightDenominator}`)], lineAnswers: solved ? undefined : [[String(rightNumerator)]] }
      ] };
      }
    case 'whole-as-fraction':
      {
        const denominator = session.session === 4 ? 1 : 4;
        const wholeNumber = session.session === 4 ? 4 : 2;
        const numerator = wholeNumber * denominator;
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'fraction-strip', label: denominator === 1 ? 'Each melon is one whole part' : 'One whole', wholeLabel: '1 whole', numerator: denominator, denominator, showGivenShading: true, caption: `${denominator}/${denominator}` },
        { kind: 'fraction-strip', label: denominator === 1 ? 'Four wholes' : `${wholeNumber} wholes`, wholeLabel: `${wholeNumber} wholes`, numerator, denominator, selectableParts: !solved, correctSelectedParts: numerator, caption: answer('Select every fractional part in the official whole-number model.', `${wholeNumber} wholes contain ${numerator} parts of size 1/${denominator}.`) },
        { kind: 'equations', label: 'Whole number as a fraction', lines: [answer(`${wholeNumber} = ___/${denominator}`, `${wholeNumber} = ${numerator}/${denominator}`)], lineAnswers: solved ? undefined : [[String(numerator)]] }
      ] };
      }
    case 'compare-fractions':
    case 'compare-symbols': {
      if (session.model === 'compare-fractions' && session.session === 3) return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'note', label: 'Different-size wholes stop a direct comparison', text: answer('The official flatbreads are different sizes. Decide what information is missing before comparing one half and one third.', 'Nina is correct: one half of the smaller loaf and one third of the larger loaf cannot be compared from the fractions alone because the reference wholes differ.') },
        { kind: 'equations', label: 'Comparison conclusion', lines: [answer('1/2 ___ 1/3 when the wholes differ', '1/2 and 1/3: not enough information when the wholes differ')] }
      ] };
      const values = session.model === 'compare-symbols'
        ? session.session === 1 ? [4, 6, 5, 6] : session.session === 2 ? [4, 8, 4, 6] : [1, 4, 3, 4]
        : session.session === 1 ? [1, 4, 2, 4] : [1, 6, 1, 2];
      const [leftNumerator, leftDenominator, rightNumerator, rightDenominator] = values;
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'fraction-strip', label: 'First fraction', wholeLabel: 'same-size whole', numerator: leftNumerator, denominator: leftDenominator, showGivenShading: true, caption: `${leftNumerator}/${leftDenominator}` },
        { kind: 'fraction-strip', label: 'Second fraction', wholeLabel: 'same-size whole', numerator: rightNumerator, denominator: rightDenominator, showGivenShading: true, caption: `${rightNumerator}/${rightDenominator}` },
        { kind: 'equations', label: 'Compare', lines: [answer(`${leftNumerator}/${leftDenominator} ___ ${rightNumerator}/${rightDenominator}`, `${leftNumerator}/${leftDenominator} < ${rightNumerator}/${rightDenominator}`)], lineAnswers: solved ? undefined : [['<']] }
      ] };
    }
    case 'line-plot': {
      if (session.session === 2) return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'note', label: 'Quarter-inch measurement before plotting', text: answer('Align each official earthworm with 0 and record the nearest quarter-inch mark. The source does not prescribe one fixed set of measured values on this opening page.', 'The Teacher Guide requires the left endpoint at 0, then reading the nearest 1/4-inch mark at the right endpoint. Values are withheld here because the official opening task asks students to perform the measurement.') }
      ] };
      const linePlot = session.session === 1
        ? { label: 'Green Bean Lengths · official p. 567', axis: 'Length (in inches)', points: [['3', 1], ['4', 2], ['5', 2]] as const, caption: 'Green beans B, A and D, and C and E measure 3, 4, and 5 inches.' }
        : session.session === 3
            ? { label: 'Tam’s Earthworm Lengths · official pp. 577–579', axis: 'Length (in inches)', points: [['1 1/4', 1], ['1 1/2', 2], ['1 3/4', 1], ['2', 1], ['2 1/4', 0], ['2 1/2', 2], ['2 3/4', 1]] as const, caption: 'Each X represents one earthworm; 2 1/4 remains labeled even though no worm has that length.' }
            : { label: 'Winona’s Beetle Lengths · official p. 583', axis: 'Length (in inches)', points: [['1/2', 1], ['3/4', 2], ['1', 2], ['1 1/4', 3], ['1 1/2', 1]] as const, caption: 'The added beetle measures 1 1/4 inches, making 1 1/4 the most frequent length.' };
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'line-plot', label: linePlot.label, axisLabel: linePlot.axis, keyLabel: answer('Use + and − to plot each official measurement. X = 1 measured object.', 'X = 1 measured object'), values: linePlot.points.map(([label, value]) => ({ label, value: solved ? value : undefined, correctValue: value })), selectableValues: !solved, showBlankValues: false, caption: answer('Plot the official measurements on the labeled scale.', linePlot.caption) }
      ] };
    }
    case 'clock': {
      if (session.session === 5) return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'number-line', label: 'Amari’s official soccer-game interval', ticks: [{ label: '9:40 a.m.', target: true }, { label: '+20 min' }, { label: '10:00 a.m.' }, { label: '+32 min' }, { label: '10:32 a.m.' }], caption: answer('Split the elapsed time at 10:00.', '20 minutes before 10:00 plus 32 minutes after 10:00 is 52 minutes.') },
        { kind: 'equations', label: 'Find the total elapsed time', lines: [answer('20 + 32 = ___ minutes', '20 + 32 = 52 minutes')], lineAnswers: solved ? undefined : [['52']] }
      ] };
      const clock = session.session === 1
        ? { label: 'Rico’s breakfast clock · official p. 609', time: '8:32', display: '8:32 a.m.', caption: 'The short hand is just past 8; the long hand shows 32 minutes.' }
        : { label: 'Kiara’s lunch time · official p. 613', time: '12:43', display: '12:43 p.m.', caption: 'Forty-three minutes past noon is 12:43 p.m.' };
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'clock', label: clock.label, timeLabel: answer('Read the hour and minute hands.', clock.display), timeValue: solved ? clock.time : undefined, blankFace: !solved, caption: answer('Use the official clock model to write the time.', clock.caption) },
        { kind: 'equations', label: 'Write the time', lines: [answer('The time is ___', `The time is ${clock.display}`)], lineAnswers: solved ? undefined : [[clock.display]] }
      ] };
    }
    case 'elapsed-time': {
      const endTime = session.session === 3;
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'number-line', label: endTime ? 'Jess’s official time interval' : 'Alec’s official time interval', ticks: endTime
          ? [{ label: '3:30 p.m.', target: true }, { label: '+30 min' }, { label: '+17 min' }, { label: answer('end', '4:17 p.m.') }]
          : [{ label: answer('start', '4:40 p.m.'), target: true }, { label: '+20 min' }, { label: '+20 min' }, { label: '5:20 p.m.' }], caption: answer('Work forward or backward across the elapsed time.', endTime ? '3:30 p.m. plus 47 minutes is 4:17 p.m.' : '5:20 p.m. minus 40 minutes is 4:40 p.m.') },
        { kind: 'equations', label: endTime ? 'Find the end time' : 'Find the start time', lines: [answer(endTime ? '3:30 + 47 minutes = ___' : '5:20 − 40 minutes = ___', endTime ? '3:30 + 47 minutes = 4:17' : '5:20 − 40 minutes = 4:40')], lineAnswers: solved ? undefined : [[endTime ? '4:17' : '4:40']] }
      ] };
    }
    case 'liquid-volume': {
      if (session.session === 1) return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'measurement-model', label: 'Choose the liquid-volume tool · official p. 637', model: 'liquid', unitLabel: 'liters', referenceLabel: '1-liter measuring cup', equation: answer('bucket capacity = ___ one-liter fills', 'Use the 1-liter cup repeatedly; count the fills.'), maxValue: 4, values: [{ label: 'measuring cup', value: 1, valueLabel: '1 L', tone: 'benchmark' }, { label: 'bucket', value: undefined, valueLabel: answer('measure with the cup', 'count repeated 1-L fills'), tone: 'target' }], steps: solved ? ['Choose the 1-liter measuring cup, not the ruler.', 'Fill or empty the bucket one liter at a time.', 'Count the number of one-liter fills.'] : ['Choose the correct tool.', 'Use the 1-liter benchmark repeatedly.', 'Record the count in liters.'] }
      ] };
      if (session.session === 2) return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'measurement-model', label: 'Estimate a fish tank’s volume · official p. 643', model: 'liquid', unitLabel: 'liters', referenceLabel: '1 liter is about 1/8 of the tank', equation: answer('1 L × ___ equal sections ≈ full tank', '1 L × 8 ≈ 8 L for the full tank'), maxValue: 8, values: [{ label: 'shown water', value: 1, valueLabel: '1 L', tone: 'benchmark' }, { label: 'full tank', value: solved ? 8 : undefined, valueLabel: answer('about ___ L', 'about 8 L'), tone: solved ? 'answer' : 'estimate' }], steps: solved ? ['Compare the 1-liter level with the full tank.', 'About eight equal sections fit in the tank.', 'Estimate the full tank at about 8 liters.'] : ['Use the 1-liter portion as a benchmark.', 'Estimate how many equal portions fill the tank.', 'Label the estimate in liters.'] }
      ] };
      if (session.session === 3) return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'measurement-model', label: 'Artist’s paint-can problem · official pp. 647–649', model: 'liquid', unitLabel: 'liters', referenceLabel: 'each can holds 2 liters', equation: answer('8 liters ÷ 2 liters per can = ___ cans', '8 liters ÷ 2 liters per can = 4 cans'), maxValue: 8, values: [{ label: 'paint bucket', value: 8, valueLabel: '8 L', tone: 'given' }, { label: 'number of cans', value: solved ? 4 : undefined, valueLabel: answer('___ cans', '4 cans'), tone: solved ? 'answer' : 'target' }], steps: solved ? ['Divide the 8 liters by 2 liters per can.', 'Use the related fact 2 × 4 = 8.', 'Label the answer: 4 cans.'] : ['Identify the total liters.', 'Identify liters per can.', 'Divide and label the number of cans.'] }
      ] };
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        { kind: 'measurement-model', label: 'Liter benchmark and equal sharing', model: 'liquid', unitLabel: 'liters', referenceLabel: '1-liter measuring cup', equation: answer('8 liters ÷ 4 beds = ___ liters per bed', '8 liters ÷ 4 beds = 2 liters per bed'), maxValue: 8, values: [{ label: 'water', value: 8, valueLabel: '8 L', tone: 'given' }, { label: 'each flower bed', value: solved ? 2 : undefined, valueLabel: answer('___ L', '2 L'), tone: solved ? 'answer' : 'target' }], steps: solved ? ['Use liters for liquid volume.', 'Split 8 liters into 4 equal groups.', 'Each group is 2 liters.'] : ['Choose the liquid-volume unit.', 'Make 4 equal groups.', 'Label one group.'] }
      ] };
    }
    case 'mass': {
      if (session.session === 1) return { title: session.title, sourceNote: exactSourceNote, sections: [
        {
          kind: 'measurement-model',
          label: '1. Use one paper clip as the official gram benchmark',
          model: 'mass',
          unitLabel: 'grams',
          referenceLabel: '1 paper clip ≈ 1 gram',
          equation: answer('balanced paper-clip count ≈ ___ grams', 'balanced paper-clip count ≈ eyeglasses mass in grams'),
          maxValue: 8,
          values: [
            { label: 'paper clip', value: 1, valueLabel: 'about 1 g', tone: 'benchmark' },
            { label: 'eyeglasses', value: undefined, valueLabel: 'estimate by balancing', tone: 'target' }
          ],
          steps: ['Heft the known 1-gram benchmark.', 'Add equal paper-clip units until the balance is level.', 'Use the count as the mass estimate in grams.']
        },
        v2SourceModel(
          659,
          '2. Verify the benchmark objects in the official mass model · Student Worktext p. 659',
          'Official i-Ready paper clip, pan balance, and eyeglasses used to estimate mass in grams',
          { x: 64, y: 242, width: 574, height: 218 },
          [
            { label: 'about 1 gram', x: 1, y: 56, width: 15, height: 25, tone: 'known' },
            { label: 'compare here', x: 19, y: 37, width: 46, height: 49, tone: 'focus' },
            { label: 'mass to estimate', x: 66, y: 44, width: 31, height: 44, tone: 'result' }
          ],
          [
            { label: 'Known benchmark', expression: '1 paper clip ≈ 1 gram' },
            { label: 'Use the balance', explanation: 'Add paper clips until the two sides balance.' },
            { label: 'Interpret the count', expression: answer('___ paper clips ≈ ___ grams', 'paper-clip count ≈ eyeglasses mass in grams') }
          ],
          'The Student Worktext fixes the comparison objects; the mapped Teacher Guide pp. 659–660 supplies the approved estimation strategies.'
        ),
        {
          kind: 'source-directions',
          label: '3. Follow one Teacher Guide strategy',
          items: [
            { lead: 'Heft first', text: 'Hold one paper clip and the eyeglasses to form an initial estimate.' },
            { lead: 'Then balance', text: 'Place the eyeglasses on one pan and add paper clips to the other pan until the scale balances.' },
            { lead: 'Name the unit', text: 'Because each paper clip is about 1 gram, the balanced count estimates the mass in grams.' }
          ]
        }
      ] };
      if (session.session === 2) return { title: session.title, sourceNote: exactSourceNote, sections: [
        v2SourceModel(
          663,
          '1. Anchor the estimate to the official object · Student Worktext p. 663',
          'Official i-Ready medium-sized watermelon used for a mass estimate',
          { x: 53, y: 176, width: 593, height: 149 },
          [{ label: 'estimate its mass', x: 0, y: 31, width: 56, height: 55, tone: 'focus' }],
          [
            { label: 'Useful unit', expression: 'kilograms' },
            { label: 'Teacher Guide benchmark', expression: 'large hardcover book ≈ 1 kilogram' }
          ],
          'The official task asks for an estimate, so the model compares against a known kilogram reference rather than inventing an exact scale reading.'
        ),
        {
          kind: 'related-facts',
          label: '2. Build the Teacher Guide estimate from equal references',
          rows: [
            { left: '1 hardcover book', right: 'about 1 kg' },
            { left: '6 hardcover books', right: 'about 6 kg' },
            { left: 'medium watermelon', right: answer('about ___ kg', 'about 6 kg') }
          ]
        },
        {
          kind: 'equations',
          label: '3. State an estimate—not a false exact measurement',
          lines: [answer('6 × 1 kg ≈ ___ kg', '6 × 1 kg ≈ 6 kg')],
          lineAnswers: solved ? undefined : [['6']]
        }
      ] };
      if (session.session === 3) return { title: session.title, sourceNote: exactSourceNote, sections: [
        v2SourceModel(
          669,
          '1. Read the exact official quantities · Student Worktext p. 669',
          'Official i-Ready maraca and carved owl with masses of 70 grams and 40 grams',
          { x: 59, y: 178, width: 588, height: 163 },
          [
            { label: '70 g', x: 11, y: 31, width: 32, height: 39, tone: 'known' },
            { label: '40 g', x: 30, y: 43, width: 31, height: 38, tone: 'known' },
            { label: 'together', x: 63, y: 12, width: 34, height: 78, tone: 'focus' }
          ],
          [
            { label: 'Maraca', expression: '70 g' },
            { label: 'Carved owl', expression: '40 g' },
            { label: 'Question language', explanation: '“Together” asks for the combined mass.' }
          ],
          'The exact objects and values are taken from the Student Worktext; the Teacher Guide directs students to combine the two masses.'
        ),
        {
          kind: 'related-facts',
          label: '2. Combine like place values',
          rows: [
            { left: '70 g', right: '7 tens' },
            { left: '40 g', right: '4 tens' },
            { left: answer('___ g', '110 g'), right: answer('___ tens', '11 tens = 1 hundred + 1 ten') }
          ]
        },
        {
          kind: 'equations',
          label: '3. Add and keep the mass unit',
          lines: [answer('70 g + 40 g = ___ g', '70 g + 40 g = 110 g')],
          lineAnswers: solved ? undefined : [['110']]
        }
      ] };
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        v2SourceModel(
          675,
          '1. Follow the official worked difference · Student Worktext p. 675',
          'Official i-Ready worked example comparing a 445-gram soccer ball and a 142-gram baseball',
          { x: 52, y: 229, width: 430, height: 249 },
          [{ label: answer('difference = ___ g', 'difference = 303 g'), x: 7, y: 6, width: 84, height: 86, tone: 'result' }],
          [
            { label: 'Soccer ball', expression: '445 g' },
            { label: 'Baseball', expression: '142 g' },
            { label: 'Difference', expression: answer('445 − 142 = ___', '445 − 142 = 303') }
          ],
          'The official example models subtraction because “difference” asks how much greater one mass is than the other.',
          600
        ),
        {
          kind: 'tape',
          label: '2. Apply the official equal-groups structure · four bags at 2 kilograms each',
          totalLabel: answer('total = ___ kg', 'total = 8 kg'),
          parts: [
            { label: '2 kg', emphasize: true },
            { label: '2 kg', emphasize: true },
            { label: '2 kg', emphasize: true },
            { label: '2 kg', emphasize: true }
          ],
          equations: [answer('4 × 2 = ___ kg', '4 × 2 = 8 kg')],
          equationAnswers: solved ? undefined : [['8']],
          caption: 'The mapped Teacher Guide p. 675 identifies four equal groups of 2 kilograms.'
        }
      ] };
    }
    case 'shape-attributes': {
      return { title: session.title, sourceNote: exactSourceNote, sections: v2ShapeAttributeSections(session) };
    }
    case 'quadrilaterals': {
      return { title: session.title, sourceNote: exactSourceNote, sections: v2QuadrilateralSections(session) };
    }
    case 'area-perimeter': {
      return { title: session.title, sourceNote: exactSourceNote, sections: v2AreaPerimeterSections(session, solved) };
    }
    case 'partition-shapes':
      if (session.session === 1) return { title: session.title, sourceNote: exactSourceNote, sections: [
        v2SourceModel(
          763,
          '1. Begin with the three exact official squares · Student Worktext p. 763',
          'Three official i-Ready squares to partition into equal-area halves in different ways',
          { x: 377, y: 268, width: 304, height: 92 },
          [],
          [
            { label: 'Same whole each time', explanation: 'Each square has the same total area.' },
            { label: 'Different partitions allowed', explanation: 'The dividing line can change, but each pair of parts must have equal area.' }
          ],
          'The source asks for different partitions of the same-size square, not a generic replacement shape.'
        ),
        v2TeacherSourceModel(
          442,
          '2. Compare the Teacher Guide’s verified possible models',
          'Official Teacher Guide possible models showing vertical, diagonal, and horizontal halves of squares',
          { x: 43, y: 293, width: 350, height: 246 },
          [],
          [
            { label: 'Count the parts', expression: '2 equal parts in each square' },
            { label: 'Name one shaded part', expression: '1/2' },
            { label: 'What stays invariant', explanation: 'Equal area—not matching orientation—makes each shaded part one half.' }
          ],
          'These are the official possible student models and explanation from the mapped Teacher Guide p. 763.',
          620
        )
      ] };
      if (session.session === 2) return { title: session.title, sourceNote: exactSourceNote, sections: [
        v2SourceModel(
          767,
          '1. Follow the official three-fold sequence · Student Worktext p. 767',
          'Official i-Ready diagram showing three folds of a rectangular sheet of paper',
          { x: 458, y: 176, width: 203, height: 250 },
          [
            { label: 'fold 1', x: 0, y: 2, width: 100, height: 27, tone: 'known' },
            { label: 'fold 2', x: 0, y: 32, width: 100, height: 28, tone: 'known' },
            { label: 'fold 3', x: 0, y: 65, width: 100, height: 31, tone: 'known' }
          ],
          [
            { label: 'Each fold doubles the parts', expression: '1 → 2 → 4 → 8' },
            { label: 'Unfolded paper', expression: '8 equal parts' }
          ],
          'The exact fold order controls how the single sheet becomes eight equal regions.',
          500
        ),
        {
          kind: 'fraction-strip',
          label: '2. Cover 2 of the 8 equal paper sections',
          wholeLabel: 'the same unfolded sheet',
          numerator: 2,
          denominator: 8,
          showGivenShading: true,
          caption: 'The mapped Teacher Guide verifies that any 2 of the 8 equal sections cover one fourth of the sheet.'
        },
        {
          kind: 'equations',
          label: '3. Name the covered area with equivalent fractions',
          lines: [answer('2/8 = ___', '2/8 = 1/4')],
          lineAnswers: solved ? undefined : [['1/4']]
        }
      ] };
      return { title: session.title, sourceNote: exactSourceNote, sections: [
        v2SourceModel(
          773,
          '1. Read the official solar-array model · Student Worktext p. 773',
          'Official i-Ready rectangular solar array divided into four equal rows of two panels',
          { x: 64, y: 227, width: 421, height: 357 },
          [{ label: '1 row of 4', x: 6, y: 44, width: 76, height: 28, tone: 'focus' }],
          [
            { label: 'Equal-size parts', expression: '4 rows' },
            { label: 'Part named by one row', expression: '1/4 of the array' }
          ],
          'The official example connects equal rows to the fraction of total area.'
        ),
        v2TeacherSourceModel(
          452,
          '2. Compare the official half-triangle solution',
          'Official Teacher Guide solution shading two of four equal small triangles',
          { x: 43, y: 423, width: 365, height: 205 },
          [],
          [
            { label: 'Whole triangle', expression: '4 equal small triangles' },
            { label: 'Shaded area', expression: answer('___ of 4 equal parts', '2 of 4 equal parts') },
            { label: 'Fraction of the whole', expression: answer('2/4 = ___', '2/4 = 1/2') }
          ],
          'The mapped Teacher Guide verifies that any two of the four equal triangles may be shaded to show one half.',
          620
        )
      ] };
  }
}

function v2ReviewedVisual(session: IReadyV2Session, solved: boolean, base: ProblemVisualSpec): ProblemVisualSpec {
  const trace = IREADY_V2_TEACHING_TRACE[`${session.lesson}-${session.session}`];
  if (!trace) reject(`lesson ${session.lesson}, session ${session.session} has no manually reviewed teaching trace`);
  const teacherSpread = v2TeacherSpreadForPrintedPage(trace.sourcePage);
  if (!teacherSpread) reject(`lesson ${session.lesson}, session ${session.session} has no mapped Teacher Guide spread for printed page ${trace.sourcePage}`);
  const teacherViewerPage = v2TeacherViewerPages(teacherSpread)[0];
  if (!teacherViewerPage) reject(`lesson ${session.lesson}, session ${session.session} has no Teacher Guide viewer page`);
  if (!base.sections.length) reject(`lesson ${session.lesson}, session ${session.session} has no source-backed mathematical model`);

  const sourceImageKinds = new Set(['source-model', 'source-crop']);
  const sourceOnlyKinds = new Set(['source-model', 'source-crop', 'source-directions', 'note', 'equations']);
  const interactiveSections = base.sections.filter((section) => !sourceImageKinds.has(section.kind));
  const firstSemanticIndex = interactiveSections.findIndex((section) => !sourceOnlyKinds.has(section.kind));
  let reviewedSections = firstSemanticIndex > 0
    ? [interactiveSections[firstSemanticIndex], ...interactiveSections.slice(0, firstSemanticIndex), ...interactiveSections.slice(firstSemanticIndex + 1)]
    : interactiveSections;
  if (!reviewedSections.length) {
    reject(`lesson ${session.lesson}, session ${session.session} has no interactive rendering after source images are moved to evidence`);
  }
  if (session.lesson >= 20 && session.lesson <= 27) {
    const sourceTeaching = v2SessionSourceTeaching(session, solved)
      .filter((section) => !sourceImageKinds.has(section.kind));
    reviewedSections = [reviewedSections[0], ...sourceTeaching, ...reviewedSections.slice(1)];
  }

  return {
    ...base,
    sourceNote: `Student Worktext Volume 2 pp. ${session.printedPages} and the mapped Teacher Guide Volume 2 spreads control this teaching sequence. Full publisher pages remain in the evidence drawer; the lesson itself is an interactive rendering of the verified model.`,
    sections: reviewedSections
  };
}

export function v2VisualForSession(session: IReadyV2Session, solved: boolean): ProblemVisualSpec {
  if (session.lesson === 28) {
    const sourcePage = [637, 641, 648, 653][session.session - 1];
    const teacherSpread = v2TeacherSpreadForPrintedPage(sourcePage);
    if (!teacherSpread) reject(`lesson 28, session ${session.session} has no mapped Teacher Guide spread for printed page ${sourcePage}`);
    const teacherViewerPage = v2TeacherViewerPages(teacherSpread)[0];
    if (!teacherViewerPage) reject(`lesson 28, session ${session.session} has no Teacher Guide viewer page`);
    const visual = v2Lesson28Visual(session, solved);
    if (!visual.sections.length) reject(`lesson 28, session ${session.session} has no source-backed liquid-volume model`);
    return {
      ...visual,
      sourceNote: `Student Worktext Volume 2 pp. ${session.printedPages} and mapped Teacher Guide Volume 2 viewer p. ${teacherViewerPage} control this liquid-volume model. Full publisher pages remain in the evidence drawer.`
    };
  }
  return v2ReviewedVisual(session, solved, v2BaseVisualForSession(session, solved));
}
