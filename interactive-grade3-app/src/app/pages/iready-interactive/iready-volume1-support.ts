import supportEvidenceJson from './iready-volume1-support.evidence.json';
import supportTeacherProvenanceJson from './iready-volume1-support-teacher-provenance.json';
import type { ProblemVisualSpec } from '../../data/lessons/lesson-runtime.types';

export interface IReadyVolumeOneSupportResource {
  readonly key: string;
  readonly unit: number;
  readonly lesson?: number;
  readonly kind: 'unit-resource' | 'lesson-family';
  readonly category: 'Start' | 'Family' | 'Finish';
  readonly title: string;
  readonly printedPages: string;
  readonly viewerPage: number;
  readonly sourceMarkers: readonly string[];
}

interface IReadyVolumeOneSupportRegistry {
  readonly schemaVersion: 1;
  readonly program: 'i-ready-classroom-mathematics-california';
  readonly publisher: 'Curriculum Associates';
  readonly grade: 3;
  readonly volume: 1;
  readonly sourceId: 'grade3-student-worktext-v1';
  readonly coverageStatus: 'complete-official-page-disposition';
  readonly resources: readonly IReadyVolumeOneSupportResource[];
}

export interface IReadySupportTeacherProvenance {
  readonly key: string;
  readonly teacherPdfPages: readonly number[];
  readonly teacherRole: 'guidance' | 'teaching' | 'solved';
}

interface IReadySupportTeacherRegistry {
  readonly schemaVersion: 1;
  readonly program: 'i-ready-classroom-mathematics-california';
  readonly publisher: 'Curriculum Associates';
  readonly grade: 3;
  readonly volume: 1;
  readonly studentSourceId: 'grade3-student-worktext-v1';
  readonly teacherSourceId: 'grade3-teacher-guide-v1';
  readonly coverageStatus: 'complete-companion-teacher-map';
  readonly resources: readonly IReadySupportTeacherProvenance[];
}

const supportRegistry = supportEvidenceJson as IReadyVolumeOneSupportRegistry;
const supportTeacherRegistry = supportTeacherProvenanceJson as IReadySupportTeacherRegistry;

if (
  supportRegistry.schemaVersion !== 1
  || supportRegistry.program !== 'i-ready-classroom-mathematics-california'
  || supportRegistry.publisher !== 'Curriculum Associates'
  || supportRegistry.grade !== 3
  || supportRegistry.volume !== 1
  || supportRegistry.sourceId !== 'grade3-student-worktext-v1'
  || supportRegistry.coverageStatus !== 'complete-official-page-disposition'
  || supportRegistry.resources.length !== 46
  || /eureka|\bmodule\b/i.test(JSON.stringify(supportRegistry))
) {
  throw new Error('i-Ready Volume 1 support-page registry rejected: source identity or page disposition is invalid.');
}
if (
  supportTeacherRegistry.schemaVersion !== 1
  || supportTeacherRegistry.program !== supportRegistry.program
  || supportTeacherRegistry.publisher !== supportRegistry.publisher
  || supportTeacherRegistry.grade !== supportRegistry.grade
  || supportTeacherRegistry.volume !== supportRegistry.volume
  || supportTeacherRegistry.studentSourceId !== supportRegistry.sourceId
  || supportTeacherRegistry.teacherSourceId !== 'grade3-teacher-guide-v1'
  || supportTeacherRegistry.coverageStatus !== 'complete-companion-teacher-map'
  || supportTeacherRegistry.resources.length !== supportRegistry.resources.length
  || supportRegistry.resources.some((resource) => !supportTeacherRegistry.resources.some((entry) => entry.key === resource.key))
  || /eureka|\bmodule\b/i.test(JSON.stringify(supportTeacherRegistry))
) {
  throw new Error('i-Ready Volume 1 companion Teacher Guide map rejected.');
}

export const IREADY_VOLUME_ONE_SUPPORT = supportRegistry.resources;

export const supportResourcesForUnit = (unit: number): readonly IReadyVolumeOneSupportResource[] =>
  IREADY_VOLUME_ONE_SUPPORT.filter((resource) => resource.unit === unit && resource.kind === 'unit-resource');

export const familyResourceForLesson = (lesson: number): IReadyVolumeOneSupportResource | undefined =>
  IREADY_VOLUME_ONE_SUPPORT.find((resource) => resource.lesson === lesson && resource.kind === 'lesson-family');

export const supportResourceUrl = (resource: IReadyVolumeOneSupportResource): string =>
  `https://online.flippingbook.com/view/336581625/${resource.viewerPage}/`;

export const supportTeacherProvenance = (resource: IReadyVolumeOneSupportResource): IReadySupportTeacherProvenance => {
  const provenance = supportTeacherRegistry.resources.find((entry) => entry.key === resource.key);
  if (!provenance) throw new Error(`No official Teacher Guide provenance for ${resource.key}.`);
  return provenance;
};

export const supportTeacherSourceUrl = (): string =>
  'https://online.flippingbook.com/view/336223898/';

export const supportTeacherPrintedPages = (teacherPdfPage: number): string => {
  const start = teacherPdfPage * 2 - 2;
  return `${start}\u2013${start + 1}`;
};

export const supportStudentPages = (resource: IReadyVolumeOneSupportResource): readonly number[] => {
  const pages = [...resource.printedPages.matchAll(/\d+/g)].map((match) => Number(match[0]));
  const start = pages[0];
  const end = pages[1] ?? start;
  return Array.from({ length: end - start + 1 }, (_, offset) => start + offset);
};

export const supportStudentImage = (printedPage: number): string =>
  `/assets/iready-volume1/student/p-${String(printedPage).padStart(3, '0')}.jpg`;

export const supportTeacherImage = (teacherPdfPage: number): string =>
  `/assets/iready-volume1/teacher/t-${String(teacherPdfPage).padStart(3, '0')}.jpg`;

export const supportWorkspaceSpec = (resource: IReadyVolumeOneSupportResource): ProblemVisualSpec => ({
  title: `${resource.title} - response workspace`,
  sourceNote: 'The official Student Worktext page above supplies every prompt. This portal section supplies only writing and drawing space.',
  sections: [{
    kind: 'source-response-workspace',
    label: 'Work from the official page',
    wide: true,
    columns: 1,
    parts: [{
      lead: `Official pp. ${resource.printedPages}`,
      prompt: 'Complete the questions, models, reflection, or activity exactly as shown on the official page above.',
      lines: [],
      printedLineCount: 8,
      openWorkspace: true,
      sketchWorkspace: true,
      responsePlaceholder: 'Record your work for the official page here.'
    }]
  }]
});
