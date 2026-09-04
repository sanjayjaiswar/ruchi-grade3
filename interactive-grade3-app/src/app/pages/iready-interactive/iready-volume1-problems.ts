import type { ProblemVisualSection, ProblemVisualSpec } from '../../data/lessons/lesson-runtime.types';
import problemEvidenceJson from './iready-volume1-problems.evidence.json';
import teacherProvenanceJson from './iready-volume1-teacher-provenance.json';

export interface IReadySourceProblem {
  readonly key: string;
  readonly unit: number;
  readonly lesson: number;
  readonly session: number;
  readonly order: number;
  readonly label: string;
  readonly title: string;
  readonly printedPages: string;
  readonly viewerPage: number;
  readonly sourceMarkers: readonly string[];
  readonly traceability?: IReadyActivityTraceability;
  readonly blankVisual: ProblemVisualSpec;
  readonly solvedVisual: ProblemVisualSpec;
}

export interface IReadyActivityTraceability {
  readonly volume: 1;
  readonly unit: number;
  readonly lesson: number;
  readonly session: number;
  readonly officialActivityName: string;
  readonly studentDocument: 'iready-grade3-volume1-548-pages.pdf';
  readonly studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf';
  readonly studentPrintedPages: string;
  readonly studentPdfViewerPages: string;
  readonly teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf';
  readonly teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf';
  readonly teacherPrintedPages: string;
  readonly teacherPdfViewerPage: number;
  readonly modelType: string;
  readonly verifiedValues: readonly string[];
  readonly verifiedAnswers: readonly string[];
  readonly verificationStatus: 'verified-student-and-teacher';
  readonly implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts';
}

export interface IReadyTeacherGuideProvenance {
  readonly lesson: number;
  readonly studentPages: string;
  readonly teacherGuidePages: string;
  readonly teacherPdfPage: number;
  readonly sourceMarkers: readonly string[];
}

const lessonOneTraceability = (
  unit: number,
  session: number,
  officialActivityName: string,
  studentPrintedPages: string,
  studentPdfViewerPages: string,
  teacherPrintedPages: string,
  teacherPdfViewerPage: number,
  modelType: string,
  verifiedValues: readonly string[],
  verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1,
  unit,
  lesson: 1,
  session,
  officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf',
  studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
  studentPrintedPages,
  studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf',
  teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
  teacherPrintedPages,
  teacherPdfViewerPage,
  modelType,
  verifiedValues,
  verifiedAnswers,
  verificationStatus: 'verified-student-and-teacher',
  implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonOneTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u1-l1-s1-try-it': lessonOneTraceability(1, 1, 'Try It', '9', '21', '102–103', 52, 'place-value chart + neighboring-interval number lines', ['384', '3 hundreds', '8 tens', '4 ones'], ['380 and 390', '300 and 400']),
  'v1-u1-l1-s1-connect-look-back': lessonOneTraceability(1, 1, 'Connect It: Look Back', '10', '22', '102–103', 52, 'neighboring-interval number lines', ['384'], ['380 and 390', '300 and 400']),
  'v1-u1-l1-s1-connect-look-ahead': lessonOneTraceability(1, 1, 'Connect It: Look Ahead', '10', '22', '102–103', 52, 'nearest-ten and nearest-hundred number lines', ['8', '14', '5', '25', '175', '50'], ['10', '10', '10', '0', '200', '100']),
  'v1-u1-l1-s1-prepare': lessonOneTraceability(1, 1, 'Prepare', '11', '23', '104–105', 53, 'six-part concept web + nearest-hundred number line', ['146', '23', '673', '241', '451'], ['150', '20', '700', '200', '500']),
  'v1-u1-l1-s1-practice': lessonOneTraceability(1, 1, 'Practice', '12', '24', '104–105', 53, 'place-value chart + base-ten blocks + neighboring-interval number lines', ['253', '2 hundreds', '5 tens', '3 ones'], ['250 and 260', '200 and 300']),
  'v1-u1-l1-s2-try-model': lessonOneTraceability(1, 2, 'Try It + Picture It + Model It', '13–14', '25–26', '106–107', 54, 'hundred chart + halfway number line', ['37 minutes', '30', '35', '40'], ['40 minutes']),
  'v1-u1-l1-s2-connect': lessonOneTraceability(1, 2, 'Connect It', '15', '27', '108–109', 55, 'nearest-ten boundary number lines', ['35–39', '237', '943'], ['35, 36, 38, 39', '240', '940']),
  'v1-u1-l1-s2-apply': lessonOneTraceability(1, 2, 'Apply It', '16', '28', '108–109', 55, 'nearest-ten number lines and boundary intervals', ['106', '180', '640'], ['110', '175–179', '181–184', '644 and 635']),
  'v1-u1-l1-s2-practice-1-3': lessonOneTraceability(1, 2, 'Practice 1–3', '17', '29', '110–111', 56, 'hundred-chart strip + nearest-ten number line', ['88', '157'], ['90', '150 and 160', '160']),
  'v1-u1-l1-s2-practice-4-8': lessonOneTraceability(1, 2, 'Practice 4–8', '18', '30', '110–111', 56, 'rounding table + nearest-ten number lines', ['12', '18', '22', '767', '342', '930'], ['10', '20', '20', '770', '340', '925–929', '931–934']),
  'v1-u1-l1-s3-try-model': lessonOneTraceability(1, 3, 'Try It + Picture It + Solve It', '19–20', '31–32', '112–113', 57, 'base-ten blocks + halfway number line', ['236', '2 hundreds', '3 tens', '6 ones', '250'], ['200']),
  'v1-u1-l1-s3-connect': lessonOneTraceability(1, 3, 'Connect It', '21', '33', '114–115', 58, 'base-ten blocks + inclusive boundary number line', ['236', '200', '250'], ['200', '150', '249']),
  'v1-u1-l1-s3-apply': lessonOneTraceability(1, 3, 'Apply It', '22', '34', '114–115', 58, 'nearest-hundred number lines', ['476', '50–99', '248', '348', '250', '350', '308'], ['500', '50–99', '348, 250, 308']),
  'v1-u1-l1-s3-practice-1-6': lessonOneTraceability(1, 3, 'Practice 1–6', '23', '35', '116–117', 59, 'nearest-hundred number line', ['684', '694', '674', '624', '650'], ['700', '700', '700', '600']),
  'v1-u1-l1-s3-practice-7-10': lessonOneTraceability(1, 3, 'Practice 7–10', '24', '36', '116–117', 59, 'nearest-hundred number lines + distance table', ['377', '999', '575', '268', '386'], ['400', '1,000', '575', '300', '400']),
  'v1-u1-l1-s4-example-1': lessonOneTraceability(1, 4, 'Example + Problem 1', '25', '37', '118–119', 60, 'base-ten blocks + nearest-ten and nearest-hundred number lines', ['362', '879'], ['360', '900']),
  'v1-u1-l1-s4-problems-2-3': lessonOneTraceability(1, 4, 'Problems 2–3', '26', '38', '118–119', 60, 'nearest-ten and nearest-hundred number lines', ['$279', '$129', '416'], ['$280', '$130', '400']),
  'v1-u1-l1-s4-problems-4-6': lessonOneTraceability(1, 4, 'Problems 4–6', '27', '39', '120–121', 61, 'nearest-ten/hundred boundary number lines + true/false table', ['194', '596', '594', '588', '585', '584', '496', '205', '745'], ['200', '594, 588, 585', 'True, True, False, False']),
  'v1-u1-l1-s4-problems-7-9': lessonOneTraceability(1, 4, 'Problems 7–9', '28', '40', '120–121', 61, 'code-native mixed-representation choice cards + nearest-ten/hundred number lines', ['240', '250', '153', '259', '245', '778', '465'], ['B and E', '780', '800', '500'])
};

const lessonTwoTraceability = (
  session: number,
  officialActivityName: string,
  studentPrintedPages: string,
  studentPdfViewerPages: string,
  teacherPrintedPages: string,
  teacherPdfViewerPage: number,
  modelType: string,
  verifiedValues: readonly string[],
  verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1,
  unit: 1,
  lesson: 2,
  session,
  officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf',
  studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
  studentPrintedPages,
  studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf',
  teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
  teacherPrintedPages,
  teacherPdfViewerPage,
  modelType,
  verifiedValues,
  verifiedAnswers,
  verificationStatus: 'verified-student-and-teacher',
  implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonTwoTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u1-l2-s1-try-it': lessonTwoTraceability(1, 'Try It', '31', '43', '128–129', 65, 'paired base-ten models + expanded-form addition', ['147', '212'], ['359']),
  'v1-u1-l2-s1-connect': lessonTwoTraceability(1, 'Connect It', '32', '44', '128–129', 65, 'expanded form + nearest-ten estimate', ['374', '122'], ['300 + 70 + 4', '100 + 20 + 2', '496', '490']),
  'v1-u1-l2-s1-prepare': lessonTwoTraceability(1, 'Prepare', '33', '45', '130–131', 66, 'six-part concept web + expanded-form decomposition', ['123', '423', '204', '326', '356', '247'], ['200 + 40 + 7', '200 + 47']),
  'v1-u1-l2-s1-practice': lessonTwoTraceability(1, 'Practice', '34', '46', '130–131', 66, 'place-value addition + base-ten check', ['215', '173'], ['388']),
  'v1-u1-l2-s2-try-model': lessonTwoTraceability(2, 'Try It + Picture It + Model It', '35–36', '47–48', '132–133', 67, 'base-ten regrouping + partial sums', ['130', '280', '11 tens'], ['410']),
  'v1-u1-l2-s2-connect': lessonTwoTraceability(2, 'Connect It', '37', '49', '134–135', 68, 'base-ten regrouping + place-value explanation', ['11 tens'], ['1 hundred and 1 ten']),
  'v1-u1-l2-s2-apply': lessonTwoTraceability(2, 'Apply It', '38', '50', '134–135', 68, 'partial sums + place-value addition', ['275 + 216', '275 + 185', '649 + 184'], ['491', '460', '833']),
  'v1-u1-l2-s2-practice-1-2': lessonTwoTraceability(2, 'Practice 1–2', '39', '51', '136–137', 69, 'expanded form + partial sums', ['631 + 368', '167 + 208'], ['999', '375']),
  'v1-u1-l2-s2-practice-3-6': lessonTwoTraceability(2, 'Practice 3–6', '40', '52', '136–137', 69, 'place-value addition + estimation + extrema', ['157 + 291', '142 + 382', '348', '256', '289', '361'], ['448', '524', '500', '709', '545']),
  'v1-u1-l2-s3-try-model': lessonTwoTraceability(3, 'Try It + Model It', '41–42', '53–54', '138–139', 70, 'partial sums + vertical algorithm with regrouping', ['225', '229', '14 ones'], ['454']),
  'v1-u1-l2-s3-connect': lessonTwoTraceability(3, 'Connect It', '43', '55', '140–141', 71, 'regrouping explanation + vertical algorithm', ['158', '363'], ['521']),
  'v1-u1-l2-s3-apply': lessonTwoTraceability(3, 'Apply It', '44', '56', '140–141', 71, 'vertical algorithms + nearest-ten estimate', ['245 + 114 + 328', '614 + 319', '284 + 258'], ['687', '933', '610 + 320 = 930', '542']),
  'v1-u1-l2-s3-practice-1-2': lessonTwoTraceability(3, 'Practice 1–2', '45', '57', '142–143', 72, 'partial sums + vertical algorithm', ['124 + 253', '459 + 260'], ['377', '719']),
  'v1-u1-l2-s3-practice-3-7': lessonTwoTraceability(3, 'Practice 3–7', '46', '58', '142–143', 72, 'vertical algorithms + partial sums', ['228 + 136', '251 + 254', '151 + 154', '368 + 245', '418 + 254 + 328'], ['364', '505', '305', '613', '1,000']),
  'v1-u1-l2-s4-example-1': lessonTwoTraceability(4, 'Example + Problem 1', '47', '59', '144–145', 73, 'expanded form + two-step relationship', ['317 + 179', '109 + 56'], ['496', '165', '274']),
  'v1-u1-l2-s4-problems-2-3': lessonTwoTraceability(4, 'Problems 2–3', '48', '60', '144–145', 73, 'vertical algorithm + error analysis', ['345 + 626', '149 + 293', '342'], ['971', '442']),
  'v1-u1-l2-s4-problems-4-6': lessonTwoTraceability(4, 'Problems 4–6', '49', '61', '146–147', 74, 'two-step addition + estimate + place-value renaming', ['129', '78', '258 + 436', '68 + 16'], ['336', '694', '700', '7 tens and 14 ones', '8 tens and 4 ones']),
  'v1-u1-l2-s4-problems-7-9': lessonTwoTraceability(4, 'Problems 7–9', '50', '62', '146–147', 74, 'vertical addition + place-value table + strategy explanation', ['147 + 123', '746', '379 + 284'], ['270', '7 hundreds, 4 tens, 6 ones', '4, 5, 6, 7, 8, or 9', '663'])
};

const lessonThreeTraceability = (
  session: number,
  officialActivityName: string,
  studentPrintedPages: string,
  studentPdfViewerPages: string,
  teacherPrintedPages: string,
  teacherPdfViewerPage: number,
  modelType: string,
  verifiedValues: readonly string[],
  verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1,
  unit: 1,
  lesson: 3,
  session,
  officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf',
  studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
  studentPrintedPages,
  studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf',
  teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
  teacherPrintedPages,
  teacherPdfViewerPage,
  modelType,
  verifiedValues,
  verifiedAnswers,
  verificationStatus: 'verified-student-and-teacher',
  implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonThreeTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u1-l3-s1-try-connect': lessonThreeTraceability(1, 'Try It + Connect It', '53–54', '65–66', '154–155', 78, 'place-value subtraction + expanded form + estimate', ['475 − 134', '525 − 213'], ['341', '500 + 20 + 5', '200 + 10 + 3', '312', '300']),
  'v1-u1-l3-s1-prepare': lessonThreeTraceability(1, 'Prepare', '55', '67', '156–157', 79, 'four-quadrant regrouping organizer + place-value decomposition', ['783 − 459', '235 + 112', '624 − 401', '194 − 187'], ['324', '347', '223', '7']),
  'v1-u1-l3-s1-practice': lessonThreeTraceability(1, 'Practice', '56', '68', '156–157', 79, 'place-value subtraction + adding-on check', ['355 − 223'], ['132']),
  'v1-u1-l3-s2-try-model': lessonThreeTraceability(2, 'Try It + Picture It + Model It', '57–58', '69–70', '158–159', 80, 'base-ten regrouping + expanded place value', ['365 − 186', '2 hundreds, 15 tens, 15 ones'], ['179']),
  'v1-u1-l3-s2-connect-apply': lessonThreeTraceability(2, 'Connect It + Apply It', '59–60', '71–72', '160–161', 81, 'regrouping explanation + place-value subtraction', ['365', '362 − 125', '853 − 146', '425 − 289'], ['237', '707', '136']),
  'v1-u1-l3-s2-practice-1-2': lessonThreeTraceability(2, 'Practice 1–2', '61', '73', '162–163', 82, 'expanded place-value subtraction', ['352 − 147', '459 − 260'], ['205', '199']),
  'v1-u1-l3-s2-practice-3-5': lessonThreeTraceability(2, 'Practice 3–5', '62', '74', '162–163', 82, 'expanded place-value subtraction + regrouping', ['905 − 425', '252 − 136', '636 − 158'], ['480', '116', '478']),
  'v1-u1-l3-s3-try-model': lessonThreeTraceability(3, 'Try It + Model It', '63–64', '75–76', '164–165', 83, 'open number line + adding on', ['205 − 137', '137 + 3 + 60 + 5'], ['68']),
  'v1-u1-l3-s3-connect-apply': lessonThreeTraceability(3, 'Connect It + Apply It', '65–66', '77–78', '166–167', 84, 'adding-on explanation + open number lines', ['202 − 195', '200 − 34', '430 − 182', '800 − 379'], ['7', '166', '248', '421']),
  'v1-u1-l3-s3-practice-1-4': lessonThreeTraceability(3, 'Practice 1–4', '67', '79', '168–169', 85, 'adding-on equations + open number lines', ['100 − 75', '132 − 114', '201 − 162', '501 − 470'], ['25', '18', '39', '31']),
  'v1-u1-l3-s3-practice-5-8': lessonThreeTraceability(3, 'Practice 5–8', '68', '80', '168–169', 85, 'adding-on equations + open number lines', ['100 − 78', '200 − 96', '305 − 212', '303 − 196'], ['22', '104', '93', '107']),
  'v1-u1-l3-s4-try-model': lessonThreeTraceability(4, 'Try It + Model It', '69–70', '81–82', '170–171', 86, 'place-value chart + vertical subtraction algorithm', ['385 − 158', '3 hundreds, 7 tens, 15 ones'], ['227']),
  'v1-u1-l3-s4-connect-apply': lessonThreeTraceability(4, 'Connect It + Apply It', '71–72', '83–84', '172–173', 87, 'vertical algorithms + regrouping explanation + estimate', ['500 − 219', '872 − 741', '409 − 243', '365 − 180', '345 − 187'], ['281', '131', '166', '185', '158']),
  'v1-u1-l3-s4-practice-1-2': lessonThreeTraceability(4, 'Practice 1–2', '73', '85', '174–175', 88, 'expanded form + vertical subtraction algorithm', ['960 − 849', '649 − 366'], ['111', '283']),
  'v1-u1-l3-s4-practice-3-9': lessonThreeTraceability(4, 'Practice 3–9', '74', '86', '174–175', 88, 'vertical subtraction algorithms + compensation', ['286 − 199', '800 − 512', '998 − 657', '865 − 328', '382 − 195', '280 − 153', '1,000 − 595'], ['87', '288', '341', '537', '187', '127', '405']),
  'v1-u1-l3-s5-example-1': lessonThreeTraceability(5, 'Example + Problem 1', '75', '87', '176–177', 89, 'vertical subtraction algorithms with regrouping', ['805 − 279', '450 − 131'], ['526', '319']),
  'v1-u1-l3-s5-problems-2-3': lessonThreeTraceability(5, 'Problems 2–3', '76', '88', '176–177', 89, 'adding on + vertical subtraction + error analysis', ['144 − 72', '205 − 110', '315'], ['72', '95']),
  'v1-u1-l3-s5-problems-4-5': lessonThreeTraceability(5, 'Problems 4–5', '77', '89', '178–179', 90, 'mixed representation cards + open number line + vertical algorithm', ['354 − 298', '400 − 155'], ['A, C, and E', '56', '245']),
  'v1-u1-l3-s5-problems-6-8': lessonThreeTraceability(5, 'Problems 6–8', '78', '90', '178–179', 90, 'vertical subtraction + two-step addition/subtraction + strategy explanation', ['907 − 199', '308 + 625 − 245', '379 − 284'], ['708', '688', '95'])
};

const lessonFourTraceability = (
  session: number,
  officialActivityName: string,
  studentPrintedPages: string,
  studentPdfViewerPages: string,
  teacherPrintedPages: string,
  teacherPdfViewerPage: number,
  modelType: string,
  verifiedValues: readonly string[],
  verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1,
  unit: 2,
  lesson: 4,
  session,
  officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf',
  studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
  studentPrintedPages,
  studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf',
  teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
  teacherPrintedPages,
  teacherPdfViewerPage,
  modelType,
  verifiedValues,
  verifiedAnswers,
  verificationStatus: 'verified-student-and-teacher',
  implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonFourTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u2-l4-s1-model-1-3': lessonFourTraceability(1, 'Model It 1–3', '101', '113', '236–237', 119, 'equal-groups model + repeated addition + multiplication equation', ['3 groups', '2 kites'], ['2 + 2 + 2 = 6', '3 × 2 = 6']),
  'v1-u2-l4-s1-model-4-6': lessonFourTraceability(1, 'Model It 4–6 + Reflect', '102', '114', '236–237', 119, 'equal-groups flower model + row-and-column array', ['3 groups', '4 flowers'], ['equal groups', 'multiply', 'in each group', 'in all', '3 rows', '4 columns', '12 flowers', '3 × 4 = 12']),
  'v1-u2-l4-s1-prepare': lessonFourTraceability(1, 'Prepare', '103', '115', '238–239', 120, 'four-quadrant multiplication organizer + 2-by-6 array', ['2 rows', '6 circles'], ['2 × 6 = 12']),
  'v1-u2-l4-s1-practice': lessonFourTraceability(1, 'Practice 3–5', '104', '116', '238–239', 120, 'equal-groups tractor-wheel model + repeated addition', ['4 tractors', '3 wheels each'], ['3 + 3 + 3 + 3 = 12', '4 × 3 = 12']),
  'v1-u2-l4-s2-model-1-2': lessonFourTraceability(2, 'Model It 1–2', '105', '117', '240–241', 121, 'equal groups + array for the same expression', ['4 × 5'], ['4 groups of 5', '4 rows of 5', '20']),
  'v1-u2-l4-s2-model-connect': lessonFourTraceability(2, 'Model It 3–4 + Connect It 5–6', '106', '118', '240–241', 121, 'square-tile rectangles + explanation of factors and product', ['3 × 7', '5 × 3', '4 × 7'], ['21', '15', '28']),
  'v1-u2-l4-s2-practice-1-4': lessonFourTraceability(2, 'Practice 1–4', '107', '119', '242–243', 122, 'equal-group ladybug model + multiplication equation', ['3 groups', '4 ladybugs each'], ['12', '3 × 4 = 12']),
  'v1-u2-l4-s2-practice-5-9': lessonFourTraceability(2, 'Practice 5–9', '108', '120', '242–243', 122, 'basketball array + five representation cards + error analysis', ['3 × 5', '3 × 6', '4 × 6'], ['3 rows', '5 in each row', '15', 'B and C', 'No']),
  'v1-u2-l4-s3-apply-1-3': lessonFourTraceability(3, 'Apply It 1–3', '109', '121', '244–245', 123, 'unequal-group diagnosis + 9-by-4 story + transformed arrays', ['4 × 6', '9 × 4', '3 × 2', '4 × 2'], ['Robert used 7 instead of 6', '36', 'add one row of 2', '3 × 3 = 9']),
  'v1-u2-l4-s3-problem-4-journal': lessonFourTraceability(3, 'Problem 4 + Math Journal', '110', '122', '244–245', 123, 'equal-groups and array models + source-backed possible stories', ['5 × 8', '3 × 4'], ['40', '12'])
};

const lessonFiveTraceability = (
  session: number,
  officialActivityName: string,
  studentPrintedPages: string,
  studentPdfViewerPages: string,
  teacherPrintedPages: string,
  teacherPdfViewerPage: number,
  modelType: string,
  verifiedValues: readonly string[],
  verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1, unit: 2, lesson: 5, session, officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf',
  studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
  studentPrintedPages, studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf',
  teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
  teacherPrintedPages, teacherPdfViewerPage, modelType, verifiedValues, verifiedAnswers,
  verificationStatus: 'verified-student-and-teacher',
  implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonFiveTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u2-l5-s1-try': lessonFiveTraceability(1, 'Try It', '113', '125', '252–253', 127, 'equal groups + skip-counting by ten', ['6 crabs', '10 legs each'], ['60']),
  'v1-u2-l5-s1-connect': lessonFiveTraceability(1, 'Connect It + Reflect', '114', '126', '252–253', 127, 'skip-count sequence + multiplication equation + array alternative', ['8 × 10', '7 × 10'], ['80', '70']),
  'v1-u2-l5-s1-prepare': lessonFiveTraceability(1, 'Prepare', '115', '127', '254–255', 128, 'four-quadrant multiplication-fact organizer + equal-groups model', ['2 groups', '3 in each group'], ['2 × 3 = 6']),
  'v1-u2-l5-s1-practice': lessonFiveTraceability(1, 'Practice 3–4', '116', '128', '254–255', 128, 'five equal groups + skip-count check', ['5 weeks', '7 days'], ['35']),
  'v1-u2-l5-s2-try-model': lessonFiveTraceability(2, 'Try It + Model It', '117–118', '129–130', '256–257', 129, 'equal groups + arrays + skip-counting by two and five', ['6 robots', '2 antennas', '5 buttons'], ['12', '30']),
  'v1-u2-l5-s2-connect': lessonFiveTraceability(2, 'Connect It', '119', '131', '258–259', 130, 'turned arrays + commutative factor order + doubles explanation', ['6 × 2', '2 × 6', '6 × 5'], ['12', '12', '30']),
  'v1-u2-l5-s2-apply': lessonFiveTraceability(2, 'Apply It 4–6', '120', '132', '258–259', 130, 'equal-group arrays for fives and tens', ['5 × 10', '10 × 5', '8 × 5'], ['50', '50', '40']),
  'v1-u2-l5-s2-practice-1-2': lessonFiveTraceability(2, 'Practice 1–2', '121', '133', '260–261', 131, 'six groups of two + ×10 facts', ['6 × 2', '8 × 10', '9 × 10', '10 × 10'], ['12', '80', '90', '100']),
  'v1-u2-l5-s2-practice-3-5': lessonFiveTraceability(2, 'Practice 3–5', '122', '134', '260–261', 131, 'starfruit arrays + complete ×2 and ×5 fact sequences', ['2 × 10', '4 × 5'], ['20', '20', '0–20 by twos', '0–50 by fives']),
  'v1-u2-l5-s3-try-model': lessonFiveTraceability(3, 'Try It + Model It', '123–124', '135–136', '262–263', 132, 'equal groups with one item versus empty groups', ['6 × 1', '6 × 0'], ['6', '0', 'Meena']),
  'v1-u2-l5-s3-connect-apply': lessonFiveTraceability(3, 'Connect It + Apply It', '125–126', '137–138', '264–265', 133, '×1 and ×0 rules + choice analysis + empty-group model', ['7 × 1', '7 × 0', '4 × 0'], ['7', '0', 'A, B, and E']),
  'v1-u2-l5-s3-practice-1': lessonFiveTraceability(3, 'Practice 1', '127', '139', '266–267', 134, 'turned equal-group models', ['7 × 1', '1 × 7'], ['7', '7']),
  'v1-u2-l5-s3-practice-2-4': lessonFiveTraceability(3, 'Practice 2–4', '128', '140', '266–267', 134, 'school-supply fact table + true/false table + error correction', ['0 × 8', '1 × 10', '1 × 5', '0 × 6'], ['0', '10', '5', '0', 'No, No, Yes, No']),
  'v1-u2-l5-s4-example-1': lessonFiveTraceability(4, 'Example + Problem 1', '129', '141', '268–269', 135, 'turned arrays + consecutive ×2 pattern', ['2 × 5', '5 × 2', '7 × 2', '8 × 2', '9 × 2'], ['10', '10', '14', '16', '18']),
  'v1-u2-l5-s4-problems-2-3': lessonFiveTraceability(4, 'Problems 2–3', '130', '142', '268–269', 135, '×1, ×0, and ×10 arrays + choice error analysis', ['1 × 7', '8 × 0', '3 × 10', '2 × 5'], ['7', '0', '30', 'A']),
  'v1-u2-l5-s4-problems-4-6': lessonFiveTraceability(4, 'Problems 4–6', '131', '143', '270–271', 136, 'missing ×1 factor + complete ×10 sequence + true/false table', ['0 × 10', '10 × 10'], ['1', '0–100 by tens', 'True, False, True, False, True, True']),
  'v1-u2-l5-s4-problems-7-9': lessonFiveTraceability(4, 'Problems 7–9', '132', '144', '270–271', 136, 'commutative ×5/×10 context + paired product comparison + ×2 journal', ['10 × 5', '5 × 10', '4 × 2', '2 × 3', '8 × 2'], ['50', '50', '8', '6', '16'])
};

const lessonSixTraceability = (
  session: number, officialActivityName: string, studentPrintedPages: string, studentPdfViewerPages: string,
  teacherPrintedPages: string, teacherPdfViewerPage: number, modelType: string,
  verifiedValues: readonly string[], verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1, unit: 2, lesson: 6, session, officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf', studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
  studentPrintedPages, studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf', teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
  teacherPrintedPages, teacherPdfViewerPage, modelType, verifiedValues, verifiedAnswers,
  verificationStatus: 'verified-student-and-teacher', implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonSixTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u2-l6-s1-try-connect': lessonSixTraceability(1, 'Try It + Connect It', '135–136', '147–148', '278–279', 140, '6-by-3 array split into ×1 and ×2 facts', ['6 × 3', '6 × 1', '6 × 2'], ['18', '6', '12']),
  'v1-u2-l6-s1-prepare': lessonSixTraceability(1, 'Prepare', '137', '149', '280–281', 141, 'four-quadrant array organizer + split 3-by-4 array', ['3 × 4', '3 × 2'], ['12', '6']),
  'v1-u2-l6-s1-practice': lessonSixTraceability(1, 'Practice 3–4', '138', '150', '280–281', 141, 'equal groups + array check', ['4 × 6'], ['24']),
  'v1-u2-l6-s2-try-model': lessonSixTraceability(2, 'Try It + Picture It + Model It', '139–140', '151–152', '282–283', 142, '4-by-3 konane picture + split array', ['4 × 3'], ['12']),
  'v1-u2-l6-s2-connect-apply': lessonSixTraceability(2, 'Connect It + Apply It', '141–142', '153–154', '284–285', 143, '×3 decompositions + repeated-addition choice analysis', ['8 × 3', '5 × 3', '9 × 3'], ['24', '15', '27', 'B, C, and E']),
  'v1-u2-l6-s2-practice-1-4': lessonSixTraceability(2, 'Practice 1–4', '143', '155', '286–287', 144, '5-by-3 array split into ×1 and ×2', ['5 × 3'], ['15']),
  'v1-u2-l6-s2-practice-5-6': lessonSixTraceability(2, 'Practice 5–6', '144', '156', '286–287', 144, 'matched ×3 decompositions + bird-feeder context', ['5 × 3', '6 × 3', '7 × 3', '8 × 3', '9 × 3', '4 × 3'], ['15', '18', '21', '24', '27', '12']),
  'v1-u2-l6-s3-try-model': lessonSixTraceability(3, 'Try It + Model It', '145–146', '157–158', '288–289', 145, '5-by-4 quilt array split and turned', ['5 × 4', '4 × 5'], ['20', '20']),
  'v1-u2-l6-s3-connect-apply': lessonSixTraceability(3, 'Connect It + Apply It', '147–148', '159–160', '290–291', 146, '×4 splits + turned array + representation choices', ['7 × 4', '3 × 4', '9 × 4', '8 × 4'], ['28', '12', '36', 'A, B, and D']),
  'v1-u2-l6-s3-practice-1-2': lessonSixTraceability(3, 'Practice 1–2', '149', '161', '292–293', 147, '3-by-4 array strategy', ['3 × 4'], ['12']),
  'v1-u2-l6-s3-practice-3-6': lessonSixTraceability(3, 'Practice 3–6', '150', '162', '292–293', 147, '×4 facts + 9-by-4 split array', ['1 × 4', '7 × 4', '6 × 4', '10 × 4', '8 × 4', '5 × 4', '9 × 4'], ['4', '28', '24', '40', '32', '20', '36']),
  'v1-u2-l6-s4-try-model': lessonSixTraceability(4, 'Try It + Model It + Picture It', '151–152', '163–164', '294–295', 148, '4-by-6 array split by columns and rows', ['4 × 6'], ['24']),
  'v1-u2-l6-s4-connect-apply': lessonSixTraceability(4, 'Connect It + Apply It', '153–154', '165–166', '296–297', 149, 'split either factor + ×6 choice analysis', ['3 × 6', '5 × 6', '8 × 6'], ['18', '30', 'A, C, and E']),
  'v1-u2-l6-s4-practice-1-3': lessonSixTraceability(4, 'Practice 1–3', '155', '167', '298–299', 150, '4-by-6 split array', ['4 × 6'], ['24']),
  'v1-u2-l6-s4-practice-4-5': lessonSixTraceability(4, 'Practice 4–5', '156', '168', '298–299', 150, 'matched ×6 decompositions + apartment context', ['5 × 6', '9 × 6', '7 × 6', '6 × 6', '8 × 6', '3 × 6'], ['30', '54', '42', '36', '48', '18']),
  'v1-u2-l6-s5-example': lessonSixTraceability(5, 'Example + Problem 1', '157', '169', '300–301', 151, '7-by-4 split into two ×2 facts + 6-by-6 split into ×5 and ×1 facts', ['7 × 4', '6 × 6', '5 × 6', '1 × 6'], ['28', '36', '30', '6']),
  'v1-u2-l6-s5-problems-1-2': lessonSixTraceability(5, 'Problems 2–3', '158', '170', '300–301', 151, '3-by-6 goat model + 8-by-6 error analysis', ['3 × 6', '8 × 6'], ['18', 'D', '48']),
  'v1-u2-l6-s5-problems-3-5': lessonSixTraceability(5, 'Problems 4–6', '159', '171', '302–303', 152, 'missing factor + true/false table + ×4 choice analysis', ['8 × 4', '8 × 3', '7 × 4'], ['2', 'No, Yes, Yes, No, Yes', 'A, D, and E']),
  'v1-u2-l6-s5-problems-6-journal': lessonSixTraceability(5, 'Problem 7 + Math Journal 8', '160', '172', '302–303', 152, 'two 5-by-6 strategies + 9-by-6 journal decomposition', ['5 × 6', '9 × 6'], ['30', '54'])
};

const lessonSevenTraceability = (
  session: number, officialActivityName: string, studentPrintedPages: string, studentPdfViewerPages: string,
  teacherPrintedPages: string, teacherPdfViewerPage: number, modelType: string,
  verifiedValues: readonly string[], verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1, unit: 2, lesson: 7, session, officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf', studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
  studentPrintedPages, studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf', teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
  teacherPrintedPages, teacherPdfViewerPage, modelType, verifiedValues, verifiedAnswers,
  verificationStatus: 'verified-student-and-teacher', implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonSevenTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u2-l7-s1-try-connect': lessonSevenTraceability(1, 'Try It + Connect It', '163–164', '175–176', '310–311', 156, '6-by-7 arrays split by columns and rows + 7-by-7 extension', ['6 × 7', '7 × 7'], ['42', '49']),
  'v1-u2-l7-s1-prepare': lessonSevenTraceability(1, 'Prepare', '165', '177', '312–313', 157, 'six-part product concept web + 8-by-7 split array', ['6 × 7', '3 × 5', '4 × 3', '8 × 3', '8 × 7'], ['42', '15', '12', '24', '56']),
  'v1-u2-l7-s1-practice': lessonSevenTraceability(1, 'Practice 3–4', '166', '178', '312–313', 157, '6-by-9 arrays split in two different ways', ['6 × 9'], ['54']),
  'v1-u2-l7-s2-try-model': lessonSevenTraceability(2, 'Try It + Model It', '167–168', '179–180', '314–315', 158, '8-by-7 piñata array + distributive expressions', ['8 × 7', '8 × 5', '8 × 2'], ['56', '40', '16']),
  'v1-u2-l7-s2-connect-apply': lessonSevenTraceability(2, 'Connect It + Apply It 4–6', '169–170', '181–182', '316–317', 159, 'factor-7 arrays + multiple-select expression analysis', ['4 × 7', '3 × 7', '5 × 7'], ['28', '21', 'A, B, and D']),
  'v1-u2-l7-s2-practice': lessonSevenTraceability(2, 'Practice 1–6', '171–172', '183–184', '318–319', 160, '6-by-7 split array + matched ×7 facts + starfish groups', ['4 × 7', '5 × 7', '6 × 7', '7 × 7', '8 × 7', '7 × 5'], ['28', '35', '42', '49', '56', '35']),
  'v1-u2-l7-s3-try-model': lessonSevenTraceability(3, 'Try It + Model It', '173–174', '185–186', '320–321', 161, '6-by-8 pumpkin array split into fours and twos', ['6 × 8', '6 × 4', '6 × 2'], ['48', '24', '12']),
  'v1-u2-l7-s3-connect-apply': lessonSevenTraceability(3, 'Connect It + Apply It 4–6', '175–176', '187–188', '322–323', 162, 'factor-8 arrays + checkerboard model', ['7 × 8', '5 × 8', '8 × 8'], ['56', '40', '64']),
  'v1-u2-l7-s3-practice': lessonSevenTraceability(3, 'Practice 1–7', '177–178', '189–190', '324–325', 163, '6-by-8 and 9-by-8 split arrays + choice analysis', ['6 × 8', '9 × 8', '3 × 8'], ['48', '72', 'D']),
  'v1-u2-l7-s4-try-model': lessonSevenTraceability(4, 'Try It + Model It', '179–180', '191–192', '326–327', 164, '8-by-9 orange array split by columns and rows', ['8 × 9'], ['72']),
  'v1-u2-l7-s4-connect-apply': lessonSevenTraceability(4, 'Connect It + Apply It 4–6', '181–182', '193–194', '328–329', 165, 'factor-9 split arrays + battery-pack choice analysis', ['7 × 9', '9 × 9', '9 × 4'], ['63', '81', 'A']),
  'v1-u2-l7-s4-practice': lessonSevenTraceability(4, 'Practice 1–5', '183–184', '195–196', '330–331', 166, '6-by-9 and 9-by-9 split arrays + matched ×9 facts', ['2 × 9', '4 × 9', '6 × 9', '7 × 9', '8 × 9', '9 × 9'], ['18', '36', '54', '63', '72', '81']),
  'v1-u2-l7-s5-example-problems': lessonSevenTraceability(5, 'Example + Problems 1–3', '185–186', '197–198', '332–333', 167, 'factor-8 and factor-9 arrays + expression choice analysis', ['7 × 8', '8 × 9', '5 × 8', '9 × 7'], ['56', '72', '40', 'C']),
  'v1-u2-l7-s5-problems-4-5': lessonSevenTraceability(5, 'Problems 4–5', '187', '199', '334–335', 168, 'missing factor + grouped-pencil model choice analysis', ['5 × 7', '5 × 8'], ['2', 'A']),
  'v1-u2-l7-s5-problems-6-journal': lessonSevenTraceability(5, 'Problems 6–8', '188', '200', '334–335', 168, '8-by-8 split array + yes/no table + 9-by-9 journal model', ['8 × 8', '6 × 9', '9 × 9'], ['64', 'No, Yes, Yes, Yes, Yes', '81'])
};

const lessonEightTraceability = (
  session: number, officialActivityName: string, studentPrintedPages: string, studentPdfViewerPages: string,
  teacherPrintedPages: string, teacherPdfViewerPage: number, modelType: string,
  verifiedValues: readonly string[], verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1, unit: 2, lesson: 8, session, officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf', studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
  studentPrintedPages, studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf', teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
  teacherPrintedPages, teacherPdfViewerPage, modelType, verifiedValues, verifiedAnswers,
  verificationStatus: 'verified-student-and-teacher', implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonEightTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u2-l8-s1-try-connect': lessonEightTraceability(1, 'Try It + Connect It', '191–192', '203–204', '342–343', 172, 'turned equal groups + two groupings of three factors', ['2 × 3', '3 × 2', '4 × 2 × 5'], ['6', '6', '40']),
  'v1-u2-l8-s1-prepare': lessonEightTraceability(1, 'Prepare', '193', '205', '344–345', 173, 'four-quadrant factor organizer + regrouped three-factor expressions', ['3 × 5', '4 × 5', '3 × 2 × 4'], ['15', '20', '24']),
  'v1-u2-l8-s1-practice': lessonEightTraceability(1, 'Practice 3–4', '194', '206', '344–345', 173, 'turned tamale equal-group models', ['4 × 2', '2 × 4'], ['8', '8']),
  'v1-u2-l8-s2-try-model': lessonEightTraceability(2, 'Try It + Picture It + Model It', '195–196', '207–208', '346–347', 174, 'turned equal groups and arrays', ['6 × 3', '3 × 6'], ['18', '18', 'neither']),
  'v1-u2-l8-s2-connect-apply': lessonEightTraceability(2, 'Connect It + Apply It 4–6', '197–198', '209–210', '348–349', 175, 'commutative arrays + related-fact choice analysis', ['8 × 9', '5 × 4', '6 × 8', '5 × 8'], ['72', '20', '48', '6', 'C']),
  'v1-u2-l8-s2-practice': lessonEightTraceability(2, 'Practice 1–6', '199–200', '211–212', '350–351', 176, 'turned arrays + matching commutative facts', ['2 × 5', '3 × 9', '4 × 6', '4 × 3', '3 × 9'], ['10', '27', '24', '12', '3']),
  'v1-u2-l8-s3-try-model': lessonEightTraceability(3, 'Try It + Picture It + Model It', '201–202', '213–214', '352–353', 177, 'official glove picture + grouped tape and expressions', ['2 gloves', '5 fingers', '3 jewels'], ['30']),
  'v1-u2-l8-s3-connect-apply': lessonEightTraceability(3, 'Connect It + Apply It 4–6', '203–204', '215–216', '354–355', 178, 'regrouped three-factor expressions + multiple-select analysis', ['7 × 2 × 4', '2 × 4 × 3', '3 × 2 × 9'], ['56', '24', 'A and E']),
  'v1-u2-l8-s3-practice': lessonEightTraceability(3, 'Practice 1–9', '205–206', '217–218', '356–357', 179, 'snack-stick groups + regrouped three-factor expressions', ['5 × 3 × 2', '7 × 2 × 4', '4 × 5 × 3', '8 × 2 × 3'], ['30', '56', '60', '48']),
  'v1-u2-l8-s4-try-model': lessonEightTraceability(4, 'Try It + Model It', '207–208', '219–220', '358–359', 180, 'three regrouping diagrams for sandwich-roll factors', ['2 × 8 × 5'], ['80']),
  'v1-u2-l8-s4-connect-apply': lessonEightTraceability(4, 'Connect It + Apply It 4–6', '209–210', '221–222', '360–361', 181, 'efficient regrouping + multiple-select expression analysis', ['3 × 7 × 3', '4 × 9 × 2', '8 × 2 × 4'], ['63', '72', 'A, B, and D']),
  'v1-u2-l8-s4-practice': lessonEightTraceability(4, 'Practice 1–10', '211–212', '223–224', '362–363', 182, 'reordered and regrouped three-factor expressions', ['2, 3, and 4', '3, 5, and 2', '9, 2, and 2', '4, 2, and 5'], ['24', '30', '36', '40']),
  'v1-u2-l8-s5-problems-1-3': lessonEightTraceability(5, 'Example + Problems 1–3', '213–214', '225–226', '364–365', 183, 'turned arrays + three-factor regrouping + related-fact choice', ['5 × 8', '2 × 3 × 7', '3 × 8 × 2', '4 × 6'], ['40', '42', '48', 'D']),
  'v1-u2-l8-s5-problems-4-6': lessonEightTraceability(5, 'Problems 4–6', '215', '227', '366–367', 184, 'missing factor + true-equation selection + three-factor context', ['9 × 7', '3 × 6 × 3', '2 × 8 × 4'], ['7', 'A, C, and D', '64']),
  'v1-u2-l8-s5-problems-7-journal': lessonEightTraceability(5, 'Problems 7–8', '216', '228', '366–367', 184, 'equation-and-array multiple selection + regrouping explanation', ['3 × 7', '7 × 3', '3 × 2 × 9'], ['A, B, D, and E', '54'])
};

const lessonNineTraceability = (
  session: number, officialActivityName: string, studentPrintedPages: string, studentPdfViewerPages: string,
  teacherPrintedPages: string, teacherPdfViewerPage: number, modelType: string,
  verifiedValues: readonly string[], verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1, unit: 2, lesson: 9, session, officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf', studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
  studentPrintedPages, studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf', teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
  teacherPrintedPages, teacherPdfViewerPage, modelType, verifiedValues, verifiedAnswers,
  verificationStatus: 'verified-student-and-teacher', implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonNineTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u2-l9-s1-try-connect': lessonNineTraceability(1, 'Try It + Connect It', '219–220', '231–232', '374–375', 188, 'base-ten blocks + skip-counting and tens paths', ['4 × 20', '8 tens'], ['80', '80']),
  'v1-u2-l9-s1-prepare': lessonNineTraceability(1, 'Prepare', '221', '233', '376–377', 189, 'five-field skip-count organizer + count-by-50 sequence', ['5, 10, 15, 20, 25', '30, 60, 90, 120', '6 × 50'], ['300']),
  'v1-u2-l9-s1-practice': lessonNineTraceability(1, 'Practice 3–4', '222', '234', '376–377', 189, 'equal groups + skip-counting by thirty', ['6 × 30'], ['180']),
  'v1-u2-l9-s2-try-model': lessonNineTraceability(2, 'Try It + Picture It + Model It', '223–224', '235–236', '378–379', 190, 'base-ten blocks + grouped factors', ['4 × 40', '16 tens'], ['160']),
  'v1-u2-l9-s2-connect-apply': lessonNineTraceability(2, 'Connect It + Apply It 4–6', '225–226', '237–238', '380–381', 191, 'place-value regrouping with multiples of ten', ['60 × 8', '7 × 40', '7 × 30'], ['480', '280', '210']),
  'v1-u2-l9-s2-practice': lessonNineTraceability(2, 'Practice 1–8', '227–228', '239–240', '382–383', 192, 'base-ten models + factor regrouping + matched expressions', ['3 × 50', '6 × 30', '4 × 70', '6 × 20'], ['150', '180', '280', '120']),
  'v1-u2-l9-s3-problems-1-3': lessonNineTraceability(3, 'Example + Problems 1–3', '229–230', '241–242', '384–385', 193, 'place-value regrouping + multiple-choice context', ['9 × 30', '5 × 50', '6 × 90', '8 × 40'], ['270', '250', '540', '320', 'C']),
  'v1-u2-l9-s3-problems-4-6': lessonNineTraceability(3, 'Problems 4–6', '231', '243', '386–387', 194, 'multiples-of-ten contexts + multiple-select products', ['6 × 30', '2 × 3 × 60', '240'], ['180', '360', 'C', 'A, B, C, and D']),
  'v1-u2-l9-s3-problems-7-journal': lessonNineTraceability(3, 'Problems 7–9', '232', '244', '386–387', 194, 'notebook and nesting-doll contexts + place-value journal', ['7 × 80', '20 × 8', '8 × 80'], ['560', '160', '640'])
};

const lessonTenTraceability = (
  session: number, officialActivityName: string, studentPrintedPages: string, studentPdfViewerPages: string,
  teacherPrintedPages: string, teacherPdfViewerPage: number, modelType: string,
  verifiedValues: readonly string[], verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1, unit: 2, lesson: 10, session, officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf', studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
  studentPrintedPages, studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf', teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
  teacherPrintedPages, teacherPdfViewerPage, modelType, verifiedValues, verifiedAnswers,
  verificationStatus: 'verified-student-and-teacher', implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonTenTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u2-l10-s1-models': lessonTenTraceability(1, 'Model It 1–6 + Reflect', '235–236', '247–248', '398–399', 200, 'equal-group plate models for two division meanings', ['8 ÷ 2', '10 ÷ 2'], ['4', '5']),
  'v1-u2-l10-s1-prepare': lessonTenTraceability(1, 'Prepare', '237', '249', '400–401', 201, 'four-quadrant divide organizer + 4 groups of 3 diagram', ['15 ÷ 5', '15 ÷ 3', '10 ÷ 5', '10 ÷ 2', '12 ÷ 3'], ['3', '5', '2', '5', '4']),
  'v1-u2-l10-s1-practice': lessonTenTraceability(1, 'Practice 3–5', '238', '250', '400–401', 201, 'three plates with four leaves each + division equation', ['12 ÷ 4'], ['3']),
  'v1-u2-l10-s2-equal-groups': lessonTenTraceability(2, 'Model It · Equal Groups 1–2', '239', '251', '402–403', 202, '24 oranges modeled by group size and group count', ['24 ÷ 6'], ['4 bags', '4 oranges per bag']),
  'v1-u2-l10-s2-arrays-connect': lessonTenTraceability(2, 'Model It · Arrays 3–4 + Connect It 5–6', '240', '252', '402–403', 202, 'turned division arrays + open model', ['20 ÷ 5', '42 ÷ 7'], ['4', '6']),
  'v1-u2-l10-s2-practice': lessonTenTraceability(2, 'Practice 1–7', '241–242', '253–254', '404–405', 203, 'frog/log model + equal groups + array error analysis', ['8 ÷ 4', '20 ÷ 4', '18 ÷ 3', '30 ÷ 5'], ['2', '5', '6', '6']),
  'v1-u2-l10-s3-apply': lessonTenTraceability(3, 'Apply It 1–3', '243', '255', '406–407', 204, 'array error analysis + division story + paired prickly-pear groupings', ['8 ÷ 4', '16 ÷ 2', '21 pears'], ['2', '8', '3 groups of 7 and 7 groups of 3']),
  'v1-u2-l10-s3-problem-journal': lessonTenTraceability(3, 'Problem 4 + Math Journal 5', '244', '256', '406–407', 204, 'student-created division model + two equal-group meanings', ['20 almonds', '45 ÷ 9'], ['answers vary', '5'])
};

const lessonElevenTraceability = (
  session: number, officialActivityName: string, studentPrintedPages: string, studentPdfViewerPages: string,
  teacherPrintedPages: string, teacherPdfViewerPage: number, modelType: string,
  verifiedValues: readonly string[], verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1, unit: 2, lesson: 11, session, officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf', studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf', studentPrintedPages, studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf', teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf', teacherPrintedPages, teacherPdfViewerPage,
  modelType, verifiedValues, verifiedAnswers, verificationStatus: 'verified-student-and-teacher', implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonElevenTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u2-l11-s1-models': lessonElevenTraceability(1, 'Model It 1–4 + Reflect', '247–248', '259–260', '414–415', 208, 'related multiplication and division arrays', ['4 × 3', '12 ÷ 4', '20 ÷ 5'], ['12', '3', '4']),
  'v1-u2-l11-s1-prepare': lessonElevenTraceability(1, 'Prepare', '249', '261', '416–417', 209, 'five-field quotient organizer + 3-by-6 array', ['8 ÷ 2', '6 ÷ 3', '3 × 6', '18 ÷ 3'], ['4', '2', '18', '6']),
  'v1-u2-l11-s1-practice': lessonElevenTraceability(1, 'Practice 3–5', '250', '262', '416–417', 209, 'seven pages of three stickers + related equations', ['21 ÷ 7', '7 × 3'], ['3', '21']),
  'v1-u2-l11-s2-situation-facts': lessonElevenTraceability(2, 'Model It 1–5 + Connect It 6–7', '251–252', '263–264', '418–419', 210, 'equal groups + related fact families', ['18 ÷ 3', '24 ÷ 3', '9 × 6', '7, 8, 56'], ['6', '8', '54', 'complete fact family']),
  'v1-u2-l11-s2-practice': lessonElevenTraceability(2, 'Practice 1–12', '253–254', '265–266', '420–421', 211, 'guava array + fish situations + 6/7/42 fact family', ['15 ÷ 3', '18 ÷ 6', '18 ÷ 3', '6 × 7'], ['5', '3', '6', '42']),
  'v1-u2-l11-s3-apply': lessonElevenTraceability(3, 'Apply It 1–3', '255', '267', '422–423', 212, 'Hopi-flower array + unknown divisor + avocado fact family', ['4 × 3', '63 ÷ 9', '4 × 6'], ['12', '7', '24']),
  'v1-u2-l11-s3-problem-journal': lessonElevenTraceability(3, 'Problem 4 + Math Journal 5', '256', '268', '422–423', 212, 'related multiplication array + student-created division story', ['15 ÷ 5', '35 ÷ 7'], ['3', '5'])
};

const lessonTwelveTraceability = (
  session: number, officialActivityName: string, studentPrintedPages: string, studentPdfViewerPages: string,
  teacherPrintedPages: string, teacherPdfViewerPage: number, modelType: string,
  verifiedValues: readonly string[], verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1, unit: 2, lesson: 12, session, officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf', studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf', studentPrintedPages, studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf', teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf', teacherPrintedPages, teacherPdfViewerPage,
  modelType, verifiedValues, verifiedAnswers, verificationStatus: 'verified-student-and-teacher', implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonTwelveTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u2-l12-s1-try-connect': lessonTwelveTraceability(1, 'Try It + Connect It', '259–260', '271–272', '430–431', 216, '3-by-8 and 6-by-9 arrays + related fact families', ['24 ÷ 3', '3 × 8', '6 × 9', '54 ÷ 6', '54 ÷ 9'], ['8', '24', '54', '9', '6']),
  'v1-u2-l12-s1-prepare': lessonTwelveTraceability(1, 'Prepare', '261', '273', '432–433', 217, '8-by-4 array + multiplication and division fact family', ['8 × 4', '32 ÷ 8'], ['32', '4']),
  'v1-u2-l12-s1-practice': lessonTwelveTraceability(1, 'Practice 3–5', '262', '274', '432–433', 217, 'four equal groups of seven + related multiplication fact', ['28 ÷ 4', '4 × 7'], ['7', '28']),
  'v1-u2-l12-s2-try-model': lessonTwelveTraceability(2, 'Try It + Model It', '263–264', '275–276', '434–435', 218, 'skip-count-by-five number line + complete fact family', ['40 ÷ 5', '5 × 8'], ['8', '40']),
  'v1-u2-l12-s2-connect-apply': lessonTwelveTraceability(2, 'Connect It + Apply It', '265–266', '277–278', '436–437', 219, 'number-line quotient + complete fact families', ['8 × 5', '40 ÷ 5', '24 ÷ 4', '2 × 3', '6 ÷ 2', '3 × 7'], ['40', '8', '6', '6', '3', '21']),
  'v1-u2-l12-s2-practice': lessonTwelveTraceability(2, 'Practice 1–9', '267–268', '279–280', '438–439', 220, 'arrays and equal groups + related multiplication and division facts', ['3 × 5', '15 ÷ 3', '4 × 9', '36 ÷ 4', '18 ÷ 2', '24 ÷ 8'], ['15', '5', '36', '9', '9', '3']),
  'v1-u2-l12-s3-table-model': lessonTwelveTraceability(3, 'Try It + Model It', '269–270', '281–282', '440–441', 221, 'multiplication-table row, column, and product lookup', ['2 × 5', '24 ÷ 6', '8 × 6', '8 ÷ 1'], ['10', '4', '48', '8']),
  'v1-u2-l12-s3-connect-apply': lessonTwelveTraceability(3, 'Connect It + Apply It', '271–272', '283–284', '442–443', 222, 'multiplication-table fact-family lookup', ['6 × 7', '42 ÷ 6', '56 ÷ 7', '2 × 8', '16 ÷ 2'], ['42', '7', '8', '16', '8', 'B, C, and E']),
  'v1-u2-l12-s3-practice': lessonTwelveTraceability(3, 'Practice 1–6', '273–274', '285–286', '444–445', 223, 'multiplication-table complete fact families', ['6 × 4', '24 ÷ 6', '7 × 3', '21 ÷ 7', '28 ÷ 4', '6 × 7', '48 ÷ 6'], ['24', '4', '21', '3', '7', '42', '8']),
  'v1-u2-l12-s4-problems-1-3': lessonTwelveTraceability(4, 'Example + Problems 1–3', '275–276', '287–288', '446–447', 224, 'number-line and related-fact solutions', ['15 ÷ 3', '35 ÷ 7', '4 × 9', '30 ÷ 6'], ['5', '5', '36', '5', 'B']),
  'v1-u2-l12-s4-problems-4-6': lessonTwelveTraceability(4, 'Problems 4–6', '277', '289', '448–449', 225, 'fact-family choices + yes/no equation table', ['12 ÷ 3', '20 ÷ 5', '9 × 8', '6 × 8', '56 ÷ 8', '32 ÷ 8'], ['4', '4', 'No, Yes, No, Yes']),
  'v1-u2-l12-s4-problems-7-journal': lessonTwelveTraceability(4, 'Problems 7–9', '278', '290', '448–449', 225, 'repeated-factor array + pita-bread fact family', ['4 × 4', '16 ÷ 4', '32 ÷ 4', '4 × 8'], ['16', '4', '8', '32'])
};

const lessonThirteenTraceability = (
  session: number, officialActivityName: string, studentPrintedPages: string, studentPdfViewerPages: string,
  teacherPrintedPages: string, teacherPdfViewerPage: number, modelType: string,
  verifiedValues: readonly string[], verifiedAnswers: readonly string[]
): IReadyActivityTraceability => ({
  volume: 1, unit: 2, lesson: 13, session, officialActivityName,
  studentDocument: 'iready-grade3-volume1-548-pages.pdf', studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf', studentPrintedPages, studentPdfViewerPages,
  teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf', teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf', teacherPrintedPages, teacherPdfViewerPage,
  modelType, verifiedValues, verifiedAnswers, verificationStatus: 'verified-student-and-teacher', implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
});

const lessonThirteenTraceabilityByKey: Readonly<Record<string, IReadyActivityTraceability>> = {
  'v1-u2-l13-s1-models': lessonThirteenTraceability(1, 'Model It 1–4', '281–282', '293–294', '456–457', 229, 'repeating object positions + hundred-chart additive patterns', ['3, 6, 9', '9, 18, 27'], ['12', '36', 'add 3', 'add 9']),
  'v1-u2-l13-s1-prepare-practice': lessonThirteenTraceability(1, 'Prepare + Practice 3–6', '283–284', '295–296', '458–459', 230, 'concept organizer + repeating shapes + add-two and add-eight patterns', ['2, 4, 6, 8, 10', '8, 16, 24'], ['circle', '12', '32', 'yes']),
  'v1-u2-l13-s2-table-models': lessonThirteenTraceability(2, 'Model It + Connect It', '285–286', '297–298', '460–461', 231, 'addition and multiplication parity tables', ['odd + even', 'even + even', 'odd + odd', 'even factor', 'sum 11'], ['odd', 'even', 'even', 'even product', 'commutative pairs']),
  'v1-u2-l13-s2-practice': lessonThirteenTraceability(2, 'Practice 1–5', '287–288', '299–300', '462–463', 232, 'addition-table diagonals + parity and identity patterns', ['583 + 118', '8 × 6', 'multiply by 0', 'multiply by 1'], ['odd', 'even', '0', 'same factor']),
  'v1-u2-l13-s3-apply': lessonThirteenTraceability(3, 'Apply It 1–3', '289', '301', '464–465', 233, 'constant-sum table + shared multiples + odd-product counterexample', ['1 + 3', '2 + 2', '3 + 1', '5s and 10s', '3 × 5'], ['4', '4', '4', '10, 20, 30, 40, 50', 'incorrect']),
  'v1-u2-l13-s3-table-journal': lessonThirteenTraceability(3, 'Problem 4 + Math Journal', '290', '302', '464–465', 233, 'completed multiplication table + commutative factor-pair symmetry', ['factor pairs', 'multiplication table'], ['same product', 'different order', 'mirror symmetry', 'skip-counting rows'])
};

const placeValueChart = (value: number, label = `Place-value chart for ${value}`): ProblemVisualSection => ({
  kind: 'data-table',
  variant: 'place-value-chart',
  label,
  columns: ['Hundreds', 'Tens', 'Ones'],
  rows: [[String(Math.floor(value / 100)), String(Math.floor(value / 10) % 10), String(value % 10)]]
});

const hundredChart = (mode: 'blank' | 'solved'): ProblemVisualSection => ({
  kind: 'data-table',
  variant: 'hundred-chart',
  label: mode === 'solved' ? 'Picture It · locate 37 on the official hundred-chart structure' : 'Select 37 on the hundred chart',
  columns: Array.from({ length: 10 }, () => ''),
  rows: Array.from({ length: 10 }, (_, row) => Array.from({ length: 10 }, (_, column) => String(row * 10 + column + 1))),
  selectableCells: mode === 'blank',
  correctCellKeys: ['3:6'],
  showCorrectSelections: mode === 'solved',
  toneCellKeys: {
    red: ['2:9', '3:9'],
    green: Array.from({ length: 10 }, (_, row) => `${row}:4`),
    blue: ['3:6']
  }
});

const responseWorkspace = (
  title: string,
  parts: Array<{
    lead?: string;
    prompt: string;
    lines: string[];
    answers?: string[][];
    response?: string;
    openWorkspace?: boolean;
  }>
): ProblemVisualSpec => ({
  title,
  sections: [{
    kind: 'source-response-workspace',
    label: 'Interactive response workspace',
    wide: true,
    columns: 1,
    parts: parts.map((part) => ({
      lead: part.lead,
      prompt: part.prompt,
      lines: part.lines,
      lineAnswers: part.answers,
      printedLineCount: Math.max(2, part.lines.length),
      interactiveLines: Boolean(part.answers?.length),
      openWorkspace: part.openWorkspace,
      responsePlaceholder: part.openWorkspace ? 'Show or explain your reasoning.' : undefined,
      response: part.response
    }))
  }]
});

const supplementalVisualNote = 'The official Student Worktext supplies the task and values. The worked steps are a portal-built visual explanation of the verified mathematics.';

const placeValueColumns = (width: number): string[] => {
  const labels = ['thousands', 'hundreds', 'tens', 'ones'];
  return labels.slice(Math.max(0, labels.length - width));
};

const digitsFor = (value: number, width: number): number[] => String(value)
  .padStart(width, '0')
  .split('')
  .map(Number);

const arithmeticOperands = (equation: string, operator: '+' | '−'): number[] | undefined => {
  const normalized = equation.replaceAll('-', '−').replaceAll(',', '');
  const expression = normalized.split('=')[0];
  const parts = expression.split(operator).map((part) => Number(part.trim()));
  return parts.length >= 2 && parts.every(Number.isFinite) ? parts : undefined;
};

const additionModelSection = (task: { lead: string; prompt: string; equation: string; answer: string }): ProblemVisualSection | undefined => {
  const addends = arithmeticOperands(task.equation, '+');
  if (!addends) return undefined;
  const total = addends.reduce((sum, value) => sum + value, 0);
  const width = Math.max(3, String(total).length, ...addends.map((value) => String(value).length));
  const addendDigits = addends.map((value) => digitsFor(value, width));
  const trimmedAnswer = task.answer.trim();
  const numericAnswer = /^\d[\d,]*$/.test(trimmedAnswer) ? Number(trimmedAnswer.replaceAll(',', '')) : undefined;
  const resultText = numericAnswer === total
    ? `${addends.join(' + ')} = ${total}`
    : numericAnswer !== undefined
      ? `${addends.join(' + ')} = ${total}. Final answer: ${trimmedAnswer}.`
      : `${addends.join(' + ')} = ${total}. ${trimmedAnswer}`;
  const regroupings: Array<{ fromColumn: number; toColumn: number; label: string }> = [];
  let carry = 0;
  for (let column = width - 1; column > 0; column -= 1) {
    const columnTotal = addendDigits.reduce((sum, digits) => sum + digits[column], carry);
    carry = Math.floor(columnTotal / 10);
    if (carry) {
      const regroupedColumn = placeValueColumns(width)[column - 1];
      const regroupedUnit = carry === 1 ? regroupedColumn.replace(/s$/, '') : regroupedColumn;
      regroupings.push({
        fromColumn: column,
        toColumn: column - 1,
        label: `${columnTotal} ${placeValueColumns(width)[column]} regroup as ${carry} ${regroupedUnit} and ${columnTotal % 10} ${placeValueColumns(width)[column]}.`
      });
    }
  }
  return {
    kind: 'measurement-lab',
    label: `${task.lead} · build the sum by place value`,
    model: regroupings.length > 1 ? 'compose-twice' : 'compose-once',
    placeValueAddition: {
      unit: 'whole numbers',
      columns: placeValueColumns(width),
      addends: addendDigits.map((digits, index) => ({ label: index === 0 ? 'start' : `add ${addends[index]}`, digits })),
      resultDigits: digitsFor(total, width).map(String),
      regroupings,
      result: resultText
    }
  };
};

const additionModelSections = (task: { lead: string; prompt: string; equation: string; answer: string }): ProblemVisualSection[] => {
  const statements = task.equation.split(';').map((statement) => statement.trim()).filter(Boolean);
  const sections = statements.map((statement, index) => {
    const expression = statement.match(/((?:\d[\d,]*\s*\+\s*)+\d[\d,]*)(?:\s*=\s*([\d,]+))?/);
    if (!expression) return undefined;
    const terms = expression[1].split('+').map((term) => Number(term.replaceAll(',', '').trim()));
    if (terms.some((term) => !Number.isFinite(term))) return undefined;
    const total = terms.reduce((sum, term) => sum + term, 0);
    const statedTotal = expression[2] ? Number(expression[2].replaceAll(',', '')) : total;
    if (statedTotal !== total) return undefined;
    const isEstimate = /estimate|round/i.test(statement);
    return additionModelSection({
      lead: statements.length === 1 ? task.lead : `${task.lead} · ${isEstimate ? 'estimate check' : `step ${index + 1}`}`,
      prompt: isEstimate ? 'Use the verified rounded addends to check the exact sum.' : task.prompt,
      equation: `${terms.join(' + ')} = ${total}`,
      answer: index === statements.length - 1
        ? (isEstimate ? `Exact sum: ${task.answer}` : task.answer)
        : 'Continue to the next verified step.'
    });
  }).filter((section): section is ProblemVisualSection => Boolean(section));
  return sections.length ? sections : [{ kind: 'equations', label: task.lead, lines: [`${task.equation}. ${task.answer}`] }];
};

const verifiedAdditionModelSection = (
  label: string,
  equation: string,
  answer: string
): ProblemVisualSection => additionModelSection({ lead: label, prompt: label, equation, answer }) ?? {
  kind: 'equations',
  label,
  lines: [equation, answer]
};

const subtractionModelSection = (task: { lead: string; prompt: string; equation: string; answer: string }): ProblemVisualSection | undefined => {
  const operands = arithmeticOperands(task.equation, '−');
  if (!operands || operands.length !== 2 || operands[0] < operands[1]) return undefined;
  const [minuend, subtrahend] = operands;
  const difference = minuend - subtrahend;
  const width = Math.max(3, String(minuend).length, String(subtrahend).length);
  const beforeDigits = digitsFor(minuend, width);
  const afterDigits = [...beforeDigits];
  const subtrahendDigits = digitsFor(subtrahend, width);
  const columns = placeValueColumns(width);
  const decompositions: Array<{ fromColumn: number; toColumn: number; label: string }> = [];

  for (let column = width - 1; column > 0; column -= 1) {
    if (afterDigits[column] >= subtrahendDigits[column]) continue;
    let donor = column - 1;
    while (donor >= 0 && afterDigits[donor] === 0) donor -= 1;
    if (donor < 0) return undefined;
    afterDigits[donor] -= 1;
    for (let bridge = donor + 1; bridge < column; bridge += 1) afterDigits[bridge] += 9;
    afterDigits[column] += 10;
    decompositions.push({
      fromColumn: donor,
      toColumn: column,
      label: `Rename 1 ${columns[donor].replace(/s$/, '')} so the ${columns[column]} can be subtracted.`
    });
  }

  return {
    kind: 'measurement-lab',
    label: `${task.lead} · regroup, subtract, and check each place`,
    model: decompositions.length > 1 ? 'decompose-twice' : 'decompose-once',
    placeValueSubtraction: {
      unit: 'whole numbers',
      columns,
      minuendLabel: String(minuend),
      subtrahendLabel: String(subtrahend),
      beforeDigits,
      afterDigits,
      subtrahendDigits,
      resultDigits: digitsFor(difference, width).map(String),
      decompositions,
      result: `${minuend} − ${subtrahend} = ${difference}. ${task.answer}`
    }
  };
};

const addingOnNumberLineSection = (task: { lead: string; prompt: string; equation: string; answer: string }): ProblemVisualSection | undefined => {
  const statements = task.equation.replaceAll(',', '').split(';').map((statement) => statement.trim()).filter(Boolean);
  const first = statements[0]?.match(/^(\d+)((?:\s*\+\s*\d+)+)\s*=\s*(\d+)$/);
  if (!first) return undefined;
  const start = Number(first[1]);
  const jumps = [...first[2].matchAll(/\+\s*(\d+)/g)].map((item) => Number(item[1]));
  let end = Number(first[3]);
  if (!jumps.length || start + jumps.reduce((sum, jump) => sum + jump, 0) !== end) return undefined;
  for (const statement of statements.slice(1)) {
    const continuation = statement.match(/^(\d+)((?:\s*\+\s*\d+)+)\s*=\s*(\d+)$/);
    if (!continuation || Number(continuation[1]) !== end) break;
    const nextJumps = [...continuation[2].matchAll(/\+\s*(\d+)/g)].map((item) => Number(item[1]));
    const nextEnd = Number(continuation[3]);
    if (end + nextJumps.reduce((sum, jump) => sum + jump, 0) !== nextEnd) break;
    jumps.push(...nextJumps);
    end = nextEnd;
  }
  let position = start;
  const ticks: Array<{ label: string; target?: boolean }> = [{ label: String(start) }];
  for (const jump of jumps) {
    position += jump;
    ticks.push({ label: `+${jump} → ${position}`, target: position === end });
  }
  return {
    kind: 'number-line',
    label: `${task.lead} · add on across friendly numbers`,
    ticks,
    caption: `${jumps.join(' + ')} = ${end - start}, so ${end} − ${start} = ${end - start}. ${task.answer}`
  };
};

const regroupedPlaceValueSection = (task: { lead: string; equation: string; answer: string }): ProblemVisualSection | undefined => {
  const match = task.equation.match(/=\s*(\d+)\s*hundreds?\s*\+\s*(\d+)\s*tens?\s*\+\s*(\d+)\s*ones?/i);
  if (!match) return undefined;
  return {
    kind: 'place-value-blocks',
    label: `${task.lead} · the value is unchanged after regrouping`,
    hundreds: Number(match[1]),
    tens: Number(match[2]),
    ones: Number(match[3]),
    caption: `${task.equation}. ${task.answer}`
  };
};

type VerifiedWorkedPart = {
  label: string;
  prompt: string;
  equation: string;
  answer: string;
};

const modelSectionsForWorkedPart = (part: VerifiedWorkedPart): ProblemVisualSection[] => {
  const statements = part.equation.split(';').map((statement) => statement.trim()).filter(Boolean);
  const sections: ProblemVisualSection[] = [];

  for (const statement of statements) {
    const simple = statement.replaceAll(',', '').match(/(\d+)\s*([+−×÷-])\s*(\d+)\s*=\s*(\d+)/);
    if (!simple) continue;
    const left = Number(simple[1]);
    const operator = simple[2].replace('-', '−');
    const right = Number(simple[3]);
    const result = Number(simple[4]);

    if (operator === '+') {
      sections.push({
        kind: 'tape',
        label: `${part.label} · combine the two quantities`,
        totalLabel: String(result),
        parts: [{ label: String(left), emphasize: true }, { label: String(right) }],
        equations: [`${left} + ${right} = ${result}`],
        caption: part.prompt
      });
    } else if (operator === '−') {
      sections.push({
        kind: 'tape',
        label: `${part.label} · separate the known part from the whole`,
        totalLabel: String(left),
        parts: [{ label: String(right), sublabel: 'known part', muted: true }, { label: String(result), sublabel: 'remaining part', emphasize: true }],
        equations: [`${left} − ${right} = ${result}`],
        caption: part.prompt
      });
    } else if (operator === '×' && left <= 12 && right <= 12) {
      sections.push({
        kind: 'array',
        label: `${part.label} · build equal groups`,
        rows: left,
        columns: right,
        item: 'dot',
        caption: `${left} × ${right} = ${result}. ${part.prompt}`
      });
    } else if (operator === '÷' && right <= 12) {
      sections.push({
        kind: 'tape',
        label: `${part.label} · share the whole into equal groups`,
        totalLabel: String(left),
        parts: Array.from({ length: right }, () => ({ label: String(result), emphasize: true })),
        equations: [`${left} ÷ ${right} = ${result}`],
        caption: part.prompt
      });
    }
  }

  return sections.length ? sections : [{ kind: 'equations', label: `${part.label} · trace the verified equation`, lines: [`${part.equation}. ${part.answer}`] }];
};

const workedPartsSections = (parts: readonly VerifiedWorkedPart[]): ProblemVisualSection[] => parts.flatMap(modelSectionsForWorkedPart);

const workedModel = (
  title: string,
  parts: readonly VerifiedWorkedPart[],
  modelSections: readonly ProblemVisualSection[] = []
): ProblemVisualSpec => ({
  title,
  sourceNote: supplementalVisualNote,
  sections: [
    ...modelSections,
    ...(modelSections.length ? [{ kind: 'equations' as const, label: 'Read the model with equations', lines: parts.map((part) => `${part.equation}. ${part.answer}`) }] : parts.flatMap(modelSectionsForWorkedPart))
  ]
});

const multiplicationTableSection = (highlightedProducts: readonly number[] = []): ProblemVisualSection => ({
  kind: 'data-table',
  label: 'Official 1–10 multiplication table',
  columns: ['×', ...Array.from({ length: 10 }, (_, index) => String(index + 1))],
  rows: Array.from({ length: 10 }, (_, rowIndex) => [
    String(rowIndex + 1),
    ...Array.from({ length: 10 }, (_, columnIndex) => String((rowIndex + 1) * (columnIndex + 1)))
  ]),
  correctCellKeys: Array.from({ length: 10 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, columnIndex) => ({
      key: `${rowIndex}:${columnIndex + 1}`,
      value: (rowIndex + 1) * (columnIndex + 1)
    }))
  ).flat().filter((cell) => highlightedProducts.includes(cell.value)).map((cell) => cell.key),
  showCorrectSelections: highlightedProducts.length > 0
});

const additionVisual = (
  title: string,
  tasks: Array<{
    lead: string;
    prompt: string;
    blankLines: string[];
    answers: string[][];
    equation: string;
    answer: string;
  }>,
  mode: 'blank' | 'solved'
): ProblemVisualSpec => mode === 'blank'
  ? {
      ...responseWorkspace(title, tasks.map((task) => ({
        lead: task.lead,
        prompt: task.prompt,
        lines: task.blankLines,
        answers: task.answers,
        openWorkspace: true
      }))),
      sourceNote: supplementalVisualNote
    }
  : {
      title,
      sourceNote: supplementalVisualNote,
      sections: tasks.flatMap(additionModelSections)
    };

type SubtractionTask = {
  lead: string;
  prompt: string;
  equation: string;
  answer: string;
  blanks?: string[];
  answers?: string[][];
  model?: { hundreds: number; tens: number; ones: number; caption: string };
};

const subtractionVisual = (title: string, tasks: readonly SubtractionTask[], mode: 'blank' | 'solved'): ProblemVisualSpec => mode === 'blank'
  ? {
      ...responseWorkspace(title, tasks.map((task) => ({
        lead: task.lead,
        prompt: task.prompt,
        lines: task.blanks ?? [`${task.equation.split('=')[0].trim()} = ___`],
        answers: task.answers ?? [[task.answer.replace(/[^0-9]/g, '')]],
        openWorkspace: true
      }))),
      sourceNote: supplementalVisualNote
    }
  : {
      title,
      sourceNote: supplementalVisualNote,
      sections: [
        ...tasks.filter((task) => task.model).map((task) => ({
          kind: 'place-value-blocks' as const,
          label: `${task.lead} · regrouped place value`,
          hundreds: task.model!.hundreds,
          tens: task.model!.tens,
          ones: task.model!.ones,
          caption: task.model!.caption
        })),
        ...tasks.filter((task) => !task.model).map(regroupedPlaceValueSection).filter((section): section is ProblemVisualSection => Boolean(section)),
        ...tasks.map(subtractionModelSection).filter((section): section is ProblemVisualSection => Boolean(section)),
        ...tasks.map(addingOnNumberLineSection).filter((section): section is ProblemVisualSection => Boolean(section))
      ]
    };

type MultiplicationTask = {
  lead: string;
  prompt: string;
  rows: number;
  columns: number;
  equation: string;
  answer: string;
  blanks?: string[];
  answers?: string[][];
  item?: 'dot' | 'butterfly' | 'circle' | 'glass' | 'square' | 'pattern' | 'triangle' | 'block';
};

const multiplicationVisual = (title: string, tasks: readonly MultiplicationTask[], mode: 'blank' | 'solved'): ProblemVisualSpec => mode === 'blank'
  ? {
      ...responseWorkspace(title, tasks.map((task) => ({
        lead: task.lead,
        prompt: task.prompt,
        lines: task.blanks ?? ['___ groups of ___ = ___', '___ × ___ = ___'],
        answers: task.answers ?? [[String(task.rows), String(task.columns), String(task.rows * task.columns)], [String(task.rows), String(task.columns), String(task.rows * task.columns)]],
        openWorkspace: true
      }))),
      sourceNote: supplementalVisualNote
    }
  : {
      title,
      sourceNote: supplementalVisualNote,
      sections: [
        ...tasks.map((task) => ({ kind: 'array' as const, label: `${task.lead} · ${task.rows} groups of ${task.columns}`, rows: task.rows, columns: task.columns, item: task.item ?? 'dot' as const, caption: task.equation })),
        { kind: 'equations', label: 'Read each array as a multiplication equation', lines: tasks.map((task) => `${task.equation}. ${task.answer}`) }
      ]
    };

const sourceProblems: readonly IReadySourceProblem[] = [
  {
    key: 'v1-u1-l1-s1-try-it', unit: 1, lesson: 1, session: 1, order: 1,
    label: 'Try It', title: 'Locate 384 by place value', printedPages: '9', viewerPage: 21,
    sourceMarkers: ['Look at the number 384 in the place-value chart', 'Between which two tens', 'Between which two hundreds'],
    blankVisual: {
      title: 'Place 384 between neighboring tens and hundreds',
      sections: [
        placeValueChart(384),
        { kind: 'equations', label: 'Read the chart', lines: ['384 = ___ hundreds + ___ tens + ___ ones'], lineAnswers: [['3', '8', '4']] },
        { kind: 'source-response-workspace', label: 'Locate the number', wide: true, columns: 2, parts: [
          { prompt: 'Between which two tens is 384?', lines: ['___ < 384 < ___'], lineAnswers: [['380', '390']], printedLineCount: 2, interactiveLines: true },
          { prompt: 'Between which two hundreds is 384?', lines: ['___ < 384 < ___'], lineAnswers: [['300', '400']], printedLineCount: 2, interactiveLines: true }
        ] }
      ]
    },
    solvedVisual: {
      title: '384 located with two number lines',
      sections: [
        placeValueChart(384),
        { kind: 'equations', label: 'Read the place-value chart', lines: ['384 = 3 hundreds + 8 tens + 4 ones'] },
        { kind: 'number-line', label: 'Neighboring tens', ticks: [{ label: '380' }, { label: '384', target: true }, { label: '390' }], targetMarker: { label: '384', position: 40 }, caption: '380 < 384 < 390' },
        { kind: 'number-line', label: 'Neighboring hundreds', ticks: [{ label: '300' }, { label: '384', target: true }, { label: '400' }], targetMarker: { label: '384', position: 84 }, caption: '300 < 384 < 400' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s1-connect-look-back', unit: 1, lesson: 1, session: 1, order: 2,
    label: 'Connect It · Look Back', title: 'State both intervals for 384', printedPages: '10', viewerPage: 22,
    sourceMarkers: ['Between which two tens is 384', 'Between which two hundreds is 384'],
    blankVisual: responseWorkspace('Look back at the Try It problem', [
      { lead: 'a.', prompt: 'Between which two tens is 384?', lines: ['___ and ___'], answers: [['380', '390']] },
      { lead: 'b.', prompt: 'Between which two hundreds is 384?', lines: ['___ and ___'], answers: [['300', '400']] }
    ]),
    solvedVisual: {
      title: 'Look Back: keep 384 inside both intervals',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'number-line', label: 'a. Neighboring tens', ticks: [{ label: '380' }, { label: '384', target: true }, { label: '390' }], targetMarker: { label: '384', position: 40 }, caption: '380 < 384 < 390' },
        { kind: 'number-line', label: 'b. Neighboring hundreds', ticks: [{ label: '300' }, { label: '384', target: true }, { label: '400' }], targetMarker: { label: '384', position: 84 }, caption: '300 < 384 < 400' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s1-connect-look-ahead', unit: 1, lesson: 1, session: 1, order: 3,
    label: 'Connect It · Look Ahead', title: 'Use number lines to round', printedPages: '10', viewerPage: 22,
    sourceMarkers: ['Rounding to the Nearest Ten', '8 rounds', '14 rounds', '175 rounds'],
    blankVisual: {
      title: 'Round the six official numbers',
      sections: [
        { kind: 'number-line', label: 'Nearest ten · official 0–20 structure', ticks: [{ label: '0' }, { label: '2' }, { label: '4' }, { label: '5', target: true }, { label: '6' }, { label: '8', target: true }, { label: '10' }, { label: '12' }, { label: '14', target: true }, { label: '16' }, { label: '18' }, { label: '20' }], caption: 'Use the halfway value; halfway rounds to the greater ten.' },
        { kind: 'equations', label: 'Fill in the nearest values', lines: ['a. 8 rounds to ___', 'b. 14 rounds to ___', 'c. 5 rounds to ___', 'd. 25 rounds to ___', 'e. 175 rounds to ___', 'f. 50 rounds to ___'], lineAnswers: [['10'], ['10'], ['10'], ['0'], ['200'], ['100']] },
        { kind: 'source-response-workspace', label: 'Reflect', wide: true, columns: 1, parts: [{ lead: '3.', prompt: 'Explain your answer to problem 2f.', lines: [], printedLineCount: 4, openWorkspace: true, responsePlaceholder: 'Explain why 50 rounds to 100.' }] }
      ]
    },
    solvedVisual: {
      title: 'Rounded values and halfway rule',
      sections: [
        { kind: 'number-line', label: 'Nearest ten · official 0–20 structure', ticks: [{ label: '0', rounded: true }, { label: '2' }, { label: '4' }, { label: '5', target: true }, { label: '6' }, { label: '8', target: true }, { label: '10', rounded: true }, { label: '12' }, { label: '14', target: true }, { label: '16' }, { label: '18' }, { label: '20', rounded: true }], caption: '8 → 10; 14 → 10; halfway 5 → 10.' },
        { kind: 'number-line', label: 'Nearest hundred · official 0–200 structure', ticks: [{ label: '0', rounded: true }, { label: '25', target: true }, { label: '50', target: true }, { label: '75' }, { label: '100', rounded: true }, { label: '125' }, { label: '150' }, { label: '175', target: true }, { label: '200', rounded: true }], caption: '25 → 0; 175 → 200; halfway 50 → 100.' },
        { kind: 'equations', label: 'Answers', lines: ['8 → 10', '14 → 10', '5 → 10', '25 → 0', '175 → 200', '50 → 100'] },
        { kind: 'note', label: 'Reflect', text: '50 is halfway between 0 and 100. The official rounding rule sends a halfway number to the greater value, so 50 rounds to 100.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s1-prepare', unit: 1, lesson: 1, session: 1, order: 4,
    label: 'Prepare', title: 'Organize rounding ideas and round 451', printedPages: '11', viewerPage: 23,
    sourceMarkers: ['Prepare for Using Place Value to Round Numbers', 'Think about what you know about rounding', '451'],
    blankVisual: {
      title: 'Prepare for Using Place Value to Round Numbers',
      sections: [
        {
          kind: 'official-organizer',
          label: '1. Fill the six official example boxes · Student Worktext p. 11',
          displayWidth: 860,
          centerLabel: 'rounding',
          fields: [
            { ariaLabel: 'Top rounding example', answer: 'A number with 5 ones is halfway between two tens. Round to the greater ten.', x: 35, y: 2, width: 30, height: 32 },
            { ariaLabel: 'Upper-left rounding example', answer: 'A number with 5 tens is halfway between two hundreds. Round to the greater hundred.', x: 3, y: 16, width: 30, height: 32 },
            { ariaLabel: 'Upper-right rounding example', answer: '146 rounds to 150.', x: 67, y: 16, width: 30, height: 32 },
            { ariaLabel: 'Lower-left rounding example', answer: '23 rounds to 20.', x: 3, y: 52.5, width: 30, height: 32 },
            { ariaLabel: 'Lower-right rounding example', answer: '673 rounds to 700.', x: 67, y: 52.5, width: 30, height: 32 },
            { ariaLabel: 'Bottom rounding example', answer: '241 rounds to 200.', x: 35, y: 66.5, width: 30, height: 32 }
          ],
          caption: 'Use words, numbers, or pictures in the same official organizer.'
        },
        {
          kind: 'source-response-workspace',
          label: '2. Round 451 to the nearest hundred. Explain your answer.',
          wide: true,
          columns: 1,
          parts: [{ prompt: '451 rounds to ___', lines: ['451 rounds to ___'], lineAnswers: [['500']], printedLineCount: 2, interactiveLines: true, responsePlaceholder: 'Explain why 451 rounds to 500.' }]
        }
      ]
    },
    solvedVisual: {
      title: 'Prepare for Using Place Value to Round Numbers',
      sections: [
        {
          kind: 'official-organizer',
          label: '1. Show what you know about rounding · Student Worktext p. 11',
          displayWidth: 860,
          centerLabel: 'rounding',
          fields: [
            { ariaLabel: 'Top rounding example', answer: 'A number with 5 ones is halfway between two tens. Round to the greater ten.', x: 35, y: 2, width: 30, height: 32 },
            { ariaLabel: 'Upper-left rounding example', answer: 'A number with 5 tens is halfway between two hundreds. Round to the greater hundred.', x: 3, y: 16, width: 30, height: 32 },
            { ariaLabel: 'Upper-right rounding example', answer: '146 rounds to 150.', x: 67, y: 16, width: 30, height: 32 },
            { ariaLabel: 'Lower-left rounding example', answer: '23 rounds to 20.', x: 3, y: 52.5, width: 30, height: 32 },
            { ariaLabel: 'Lower-right rounding example', answer: '673 rounds to 700.', x: 67, y: 52.5, width: 30, height: 32 },
            { ariaLabel: 'Bottom rounding example', answer: '241 rounds to 200.', x: 35, y: 66.5, width: 30, height: 32 }
          ],
          caption: 'The organizer shape is the official Student Worktext model. The six possible answers are verified in Teacher Guide Volume 1 pp. 104–105.'
        },
        { kind: 'number-line', label: 'Nearest hundred', ticks: [{ label: '400' }, { label: '450' }, { label: '451', target: true }, { label: '500', rounded: true }], targetMarker: { label: '451', position: 51 }, caption: '451 is above the halfway value 450.' },
        { kind: 'note', label: 'Answer', text: '451 rounds to 500 because it is greater than the halfway number 450.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s1-practice', unit: 1, lesson: 1, session: 1, order: 5,
    label: 'Practice', title: 'Locate 253 and check another way', printedPages: '12', viewerPage: 24,
    sourceMarkers: ['Look at the number 253 in the place-value chart', 'Solve the problem another way'],
    blankVisual: {
      title: 'Place 253 between tens and hundreds',
      sections: [
        placeValueChart(253),
        { kind: 'equations', label: 'Place-value chart', lines: ['253 = ___ hundreds + ___ tens + ___ ones'], lineAnswers: [['2', '5', '3']] },
        { kind: 'source-response-workspace', label: 'Solve and check', wide: true, columns: 2, parts: [
          { lead: '3.', prompt: 'Between which two tens and which two hundreds is 253?', lines: ['___ < 253 < ___', '___ < 253 < ___'], lineAnswers: [['250', '260'], ['200', '300']], printedLineCount: 4, interactiveLines: true, openWorkspace: true },
          { lead: '4.', prompt: 'Solve the problem another way to check your answer.', lines: [], printedLineCount: 5, openWorkspace: true, sketchWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: '253 verified in both intervals',
      sections: [
        placeValueChart(253),
        { kind: 'place-value-blocks', label: 'Build 253 another way', hundreds: 2, tens: 5, ones: 3, caption: '2 hundreds + 5 tens + 3 ones' },
        { kind: 'equations', label: 'Place value', lines: ['253 = 2 hundreds + 5 tens + 3 ones'] },
        { kind: 'number-line', label: 'Tens check', ticks: [{ label: '250' }, { label: '253', target: true }, { label: '260' }], caption: '250 < 253 < 260' },
        { kind: 'number-line', label: 'Hundreds check', ticks: [{ label: '200' }, { label: '253', target: true }, { label: '300' }], caption: '200 < 253 < 300' },
        { kind: 'note', label: 'Another way', text: 'A place-value chart shows 2 hundreds, 5 tens, and 3 ones. That confirms both intervals.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s2-try-model', unit: 1, lesson: 1, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Round 37 minutes to the nearest ten', printedPages: '13–14', viewerPage: 25,
    sourceMarkers: ['Dario spends 37 minutes', 'nearest ten minutes', 'halfway number between 30 and 40 is 35'],
    blankVisual: {
      title: 'Locate 37 between 30 and 40',
      sections: [
        hundredChart('blank'),
        { kind: 'number-line', label: 'Nearest ten', ticks: [{ label: '30' }, { label: '35' }, { label: '37', target: true }, { label: '40' }], targetMarker: { label: '37', position: 70 }, caption: 'Which ten is closer to 37?' },
        { kind: 'equations', label: 'Record Dario’s rounded time', lines: ['37 minutes rounds to ___ minutes'], lineAnswers: [['40']] }
      ]
    },
    solvedVisual: {
      title: '37 rounds to 40 minutes',
      sections: [
        hundredChart('solved'),
        { kind: 'number-line', label: 'Compare with the halfway number', ticks: [{ label: '30' }, { label: '35' }, { label: '37', target: true }, { label: '40', rounded: true }], targetMarker: { label: '37', position: 70 }, caption: '37 is greater than 35, so it is closer to 40.' },
        { kind: 'equations', label: 'Answer', lines: ['37 minutes → 40 minutes'] }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s2-connect', unit: 1, lesson: 1, session: 2, order: 2,
    label: 'Connect It', title: 'Explain nearest-ten rounding', printedPages: '15', viewerPage: 27,
    sourceMarkers: ['Which other whole numbers between 30 and 40 round to 40', 'rounding 237', '943 rounded'],
    blankVisual: responseWorkspace('Connect the nearest-ten rule', [
      { lead: '4a.', prompt: 'Which other whole numbers between 30 and 40 round to 40?', lines: [], openWorkspace: true },
      { lead: '4b.', prompt: 'How is rounding 237 to the nearest ten like rounding 37?', lines: [], openWorkspace: true },
      { lead: '4c.', prompt: 'What is 943 rounded to the nearest ten?', lines: ['943 rounds to ___'], answers: [['940']] },
      { lead: '5.', prompt: 'Explain how to round a number to the nearest ten.', lines: [], openWorkspace: true },
      { lead: '6.', prompt: 'Describe a model or strategy that helped with the Try It problem.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Nearest-ten boundaries and connections',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'number-line', label: '4a. Whole numbers from 30 to 40', ticks: [{ label: '30' }, { label: '34' }, { label: '35', target: true }, { label: '36', target: true }, { label: '37', target: true }, { label: '38', target: true }, { label: '39', target: true }, { label: '40', rounded: true }], caption: '35 through 39 round to 40; the official question asks for the other values 35, 36, 38, and 39.' },
        { kind: 'number-line', label: '4b. The same ones digit controls both rounds', ticks: [{ label: '230' }, { label: '235' }, { label: '237', target: true }, { label: '240', rounded: true }], caption: '37 and 237 both have 7 ones, so both lie above their halfway value.' },
        { kind: 'number-line', label: '4c. Round 943', ticks: [{ label: '940', rounded: true }, { label: '943', target: true }, { label: '945' }, { label: '950' }], caption: '943 is below 945, so 943 rounds to 940.' },
        { kind: 'note', label: '5–6. Explain the model', text: 'Locate the neighboring tens and the halfway value. A number at or above halfway rounds to the greater ten; a number below halfway rounds to the lesser ten.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s2-apply', unit: 1, lesson: 1, session: 2, order: 3,
    label: 'Apply It', title: 'Solve the three nearest-ten tasks', printedPages: '16', viewerPage: 28,
    sourceMarkers: ['106 rounded to the nearest ten', 'number less than 180', 'numbers round to 640'],
    blankVisual: responseWorkspace('Apply nearest-ten rounding', [
      { lead: '1.', prompt: 'What is 106 rounded to the nearest ten?', lines: ['106 rounds to ___'], answers: [['110']], openWorkspace: true },
      { lead: '2a.', prompt: 'Give a number less than 180 that rounds to 180.', lines: ['One valid number is ___'], answers: [['175||176||177||178||179']], openWorkspace: true },
      { lead: '2b.', prompt: 'Give a number greater than 180 that rounds to 180.', lines: ['One valid number is ___'], answers: [['181||182||183||184']], openWorkspace: true },
      { lead: '3.', prompt: 'Which choices round to 640: 644, 645, 600, 634, 635, 649?', lines: ['The correct choices are ___ and ___'], answers: [['644', '635']] }
    ]),
    solvedVisual: {
      title: 'Apply It solutions',
      sections: [
        { kind: 'number-line', label: 'Problem 1', ticks: [{ label: '100' }, { label: '105' }, { label: '106', target: true }, { label: '110', rounded: true }], caption: '106 → 110' },
        { kind: 'note', label: 'Problem 2', text: 'Numbers from 175 through 179 are below 180 and round to 180. Numbers from 181 through 184 are above 180 and round to 180. Examples: 179 and 181.' },
        { kind: 'note', label: 'Problem 3', text: '635 and 644 round to 640. The other listed choices round to 650, 600, or 630.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s2-practice-1-3', unit: 1, lesson: 1, session: 2, order: 4,
    label: 'Practice 1–3', title: 'Round 88 and locate 157', printedPages: '17', viewerPage: 29,
    sourceMarkers: ['scores 88 points', 'number 157 is between which two tens', 'nearest ten'],
    blankVisual: responseWorkspace('Practice problems 1–3', [
      { lead: '1.', prompt: 'Robert scores 88 points. To the nearest ten, how many points does he score?', lines: ['88 rounds to ___'], answers: [['90']] },
      { lead: '2.', prompt: 'The number 157 is between which two tens?', lines: ['___ < 157 < ___'], answers: [['150', '160']] },
      { lead: '3.', prompt: 'What is 157 rounded to the nearest ten?', lines: ['157 rounds to ___'], answers: [['160']] }
    ]),
    solvedVisual: {
      title: 'Practice 1–3 solutions',
      sections: [
        { kind: 'number-line', label: '88 to the nearest ten', ticks: [{ label: '80' }, { label: '85' }, { label: '88', target: true }, { label: '90', rounded: true }], caption: '88 → 90' },
        { kind: 'number-line', label: 'Locate and round 157', ticks: [{ label: '150' }, { label: '155' }, { label: '157', target: true }, { label: '160', rounded: true }], caption: '150 < 157 < 160, so 157 → 160.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s2-practice-4-8', unit: 1, lesson: 1, session: 2, order: 5,
    label: 'Practice 4–8', title: 'Complete the table and solve four rounding tasks', printedPages: '18', viewerPage: 30,
    sourceMarkers: ['Kimi pulls weeds', 'number 767', 'number 342', 'number less than 930'],
    blankVisual: {
      title: 'Practice problems 4–8',
      sections: [
        { kind: 'data-table', label: '4. Round each time to the nearest ten', columns: ['Vegetable', 'Minutes', 'Nearest Ten'], rows: [['Cabbage', '12', '___'], ['Tomatoes', '18', '___'], ['Peppers', '22', '___']], cellAnswers: [[[], [], ['10']], [[], [], ['20']], [[], [], ['20']]] },
        { kind: 'source-response-workspace', label: 'Problems 5–8', wide: true, columns: 2, parts: [
          { lead: '5.', prompt: 'Locate 767, name the halfway number, compare, and round.', lines: ['___ < 767 < ___', 'halfway: ___', '767 is ___ the halfway number', '767 → ___'], lineAnswers: [['760', '770'], ['765'], ['greater than'], ['770']], printedLineCount: 5, interactiveLines: true },
          { lead: '6.', prompt: 'Locate and round 342.', lines: ['___ < 342 < ___', '342 → ___'], lineAnswers: [['340', '350'], ['340']], printedLineCount: 3, interactiveLines: true },
          { lead: '7.', prompt: 'Give a number less than 930 that rounds to 930.', lines: ['One valid answer: ___'], lineAnswers: [['925||926||927||928||929']], printedLineCount: 2, interactiveLines: true },
          { lead: '8.', prompt: 'Give a number greater than 930 that rounds to 930.', lines: ['One valid answer: ___'], lineAnswers: [['931||932||933||934']], printedLineCount: 2, interactiveLines: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Practice 4–8 solutions',
      sections: [
        { kind: 'data-table', label: '4. Rounded table', columns: ['Vegetable', 'Minutes', 'Nearest Ten'], rows: [['Cabbage', '12', '10'], ['Tomatoes', '18', '20'], ['Peppers', '22', '20']] },
        { kind: 'number-line', label: '5. Compare 767 with the halfway value', ticks: [{ label: '760' }, { label: '765' }, { label: '767', target: true }, { label: '770', rounded: true }], targetMarker: { label: '767', position: 70 }, caption: '767 is above 765, so it rounds to 770.' },
        { kind: 'number-line', label: '6. Compare 342 with the halfway value', ticks: [{ label: '340', rounded: true }, { label: '342', target: true }, { label: '345' }, { label: '350' }], targetMarker: { label: '342', position: 20 }, caption: '342 is below 345, so it rounds to 340.' },
        { kind: 'number-line', label: '7–8. Values that round to 930', ticks: [{ label: '925' }, { label: '929', target: true }, { label: '930', rounded: true }, { label: '934', target: true }, { label: '935' }], caption: '925 through 934 round to 930; 929 and 934 satisfy the two official prompts.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s3-try-model', unit: 1, lesson: 1, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Round 236 bowls to the nearest hundred', printedPages: '19–20', viewerPage: 31,
    sourceMarkers: ['restaurant sells 236 bowls of okra stew', 'Use base-ten blocks', '236 rounded to the nearest hundred is 200'],
    blankVisual: {
      title: 'Model 236, then choose the nearest hundred',
      sections: [
        { kind: 'place-value-blocks', label: 'Build 236', hundreds: 2, tens: 3, ones: 6, caption: '236 = 2 hundreds + 3 tens + 6 ones' },
        { kind: 'number-line', label: 'Nearest hundred', ticks: [{ label: '200' }, { label: '250' }, { label: '300' }], targetMarker: { label: '236', position: 36 }, caption: 'Is 236 below or above the halfway value 250?' },
        { kind: 'equations', label: 'Record the rounded amount', lines: ['236 bowls rounds to ___ bowls'], lineAnswers: [['200']] }
      ]
    },
    solvedVisual: {
      title: '236 rounds to 200',
      sections: [
        { kind: 'place-value-blocks', label: 'Read the place values', hundreds: 2, tens: 3, ones: 6, caption: 'The 3 tens are less than the halfway amount of 5 tens.' },
        { kind: 'number-line', label: 'Compare with 250', ticks: [{ label: '200', rounded: true }, { label: '236', target: true }, { label: '250' }, { label: '300' }], targetMarker: { label: '236', position: 36 }, caption: '236 is closer to 200 than to 300.' },
        { kind: 'equations', label: 'Answer', lines: ['236 bowls → 200 bowls'] }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s3-connect', unit: 1, lesson: 1, session: 3, order: 2,
    label: 'Connect It', title: 'Explain nearest-hundred rounding', printedPages: '21', viewerPage: 33,
    sourceMarkers: ['Why is it not 300', 'least three-digit number', 'rounding a number to the nearest hundred'],
    blankVisual: responseWorkspace('Connect nearest-hundred ideas', [
      { lead: '1a.', prompt: '236 rounds to 200. Why is it not 300?', lines: [], openWorkspace: true },
      { lead: '1b.', prompt: 'What are the least and greatest three-digit numbers that round to 200?', lines: ['least: ___', 'greatest: ___'], answers: [['150'], ['249']], openWorkspace: true },
      { lead: '2.', prompt: 'How is rounding to the nearest hundred like rounding to the nearest ten? How is it different?', lines: [], openWorkspace: true },
      { lead: '3.', prompt: 'Describe a model or strategy that helped with the Try It problem.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Nearest-hundred boundaries around 200',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'place-value-blocks', label: '1a. Read 236 by place value', hundreds: 2, tens: 3, ones: 6, caption: 'The 3 tens are below the 5-tens halfway amount.' },
        { kind: 'number-line', label: '1a. Compare 236 with 250', ticks: [{ label: '200', rounded: true }, { label: '236', target: true }, { label: '250' }, { label: '300' }], targetMarker: { label: '236', position: 36 }, caption: '236 is below 250, so it rounds to 200.' },
        { kind: 'number-line', label: '1b. Every three-digit value that rounds to 200', ticks: [{ label: '149' }, { label: '150', target: true }, { label: '200', rounded: true }, { label: '249', target: true }, { label: '250' }], caption: 'The inclusive boundary is 150 through 249.' },
        { kind: 'note', label: '2–3. Connect the rounding models', text: 'Nearest-ten and nearest-hundred rounding both use neighboring multiples and a halfway value. The place being rounded determines which halfway value and which place-value blocks matter.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s3-apply', unit: 1, lesson: 1, session: 3, order: 3,
    label: 'Apply It', title: 'Solve three nearest-hundred tasks', printedPages: '22', viewerPage: 34,
    sourceMarkers: ['476 rounded to the nearest hundred', 'numbers less than 100', 'round to 300'],
    blankVisual: responseWorkspace('Apply nearest-hundred rounding', [
      { lead: '1.', prompt: 'What is 476 rounded to the nearest hundred?', lines: ['476 → ___'], answers: [['500']], openWorkspace: true },
      { lead: '2.', prompt: 'What numbers less than 100 round to 100?', lines: ['from ___ through ___'], answers: [['50', '99']], openWorkspace: true },
      { lead: '3.', prompt: 'Which choices round to 300: 248, 348, 250, 350, 308?', lines: ['correct choices: ___, ___, and ___'], answers: [['348', '250', '308']] }
    ]),
    solvedVisual: {
      title: 'Apply It solutions',
      sections: [
        { kind: 'number-line', label: 'Problem 1', ticks: [{ label: '400' }, { label: '450' }, { label: '476', target: true }, { label: '500', rounded: true }], caption: '476 is above 450, so 476 → 500.' },
        { kind: 'note', label: 'Problem 2', text: 'Every whole number from 50 through 99 is less than 100 and rounds to 100.' },
        { kind: 'note', label: 'Problem 3', text: '250, 308, and 348 round to 300. 248 rounds to 200, and 350 rounds to 400.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s3-practice-1-6', unit: 1, lesson: 1, session: 3, order: 4,
    label: 'Practice 1–6', title: 'Locate and round 684, 694, 674, and 624', printedPages: '23', viewerPage: 35,
    sourceMarkers: ['number 684 is between which two hundreds', 'halfway number', '694 rounded'],
    blankVisual: responseWorkspace('Practice problems 1–6', [
      { lead: '1.', prompt: '684 is between which two hundreds?', lines: ['___ < 684 < ___'], answers: [['600', '700']] },
      { lead: '2.', prompt: 'What is the halfway number?', lines: ['halfway: ___'], answers: [['650']] },
      { lead: '3.', prompt: 'Round 684 to the nearest hundred.', lines: ['684 → ___'], answers: [['700']] },
      { lead: '4.', prompt: 'Round 694 to the nearest hundred.', lines: ['694 → ___'], answers: [['700']] },
      { lead: '5.', prompt: 'Round 674 to the nearest hundred.', lines: ['674 → ___'], answers: [['700']] },
      { lead: '6.', prompt: 'Round 624 to the nearest hundred.', lines: ['624 → ___'], answers: [['600']] }
    ]),
    solvedVisual: {
      title: 'Practice 1–6 solutions',
      sections: [
        { kind: 'number-line', label: 'Hundreds around the four numbers', ticks: [{ label: '600' }, { label: '624', target: true }, { label: '650' }, { label: '674', target: true }, { label: '684', target: true }, { label: '694', target: true }, { label: '700' }], caption: 'The halfway value is 650.' },
        { kind: 'equations', label: 'Answers', lines: ['600 < 684 < 700', 'halfway = 650', '684 → 700', '694 → 700', '674 → 700', '624 → 600'] }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s3-practice-7-10', unit: 1, lesson: 1, session: 3, order: 5,
    label: 'Practice 7–10', title: 'Round, use clues, and complete the distance table', printedPages: '24', viewerPage: 36,
    sourceMarkers: ['round 377 to the nearest hundred', '999 rounded', 'table below shows the miles'],
    blankVisual: {
      title: 'Practice problems 7–10',
      sections: [
        { kind: 'source-response-workspace', label: 'Problems 7–9', wide: true, columns: 2, parts: [
          { lead: '7.', prompt: 'Locate 377, name the halfway number, compare, and round.', lines: ['___ < 377 < ___', 'halfway: ___', '377 is ___ the halfway number', '377 → ___'], lineAnswers: [['300', '400'], ['350'], ['greater than'], ['400']], printedLineCount: 5, interactiveLines: true },
          { lead: '8.', prompt: 'Round 999 to the nearest hundred.', lines: ['999 → ___'], lineAnswers: [['1000']], printedLineCount: 2, interactiveLines: true },
          { lead: '9.', prompt: 'Choose the number that is between 500 and 600, above halfway, and rounds to 600: 525, 575, 501, 650.', lines: ['answer: ___'], lineAnswers: [['575']], printedLineCount: 3, interactiveLines: true }
        ] },
        { kind: 'data-table', label: '10. Round each distance', columns: ['Cities', 'Miles', 'Nearest Hundred'], rows: [['Phoenix and Palm Springs', '268', '___'], ['Los Angeles and San Francisco', '386', '___']], cellAnswers: [[[], [], ['300']], [[], [], ['400']]] }
      ]
    },
    solvedVisual: {
      title: 'Practice 7–10 solutions',
      sections: [
        { kind: 'number-line', label: '7. Round 377 to the nearest hundred', ticks: [{ label: '300' }, { label: '350' }, { label: '377', target: true }, { label: '400', rounded: true }], targetMarker: { label: '377', position: 77 }, caption: '377 is above the halfway value 350, so it rounds to 400.' },
        { kind: 'number-line', label: '8. Round 999 to the nearest hundred', ticks: [{ label: '900' }, { label: '950' }, { label: '999', target: true }, { label: '1000', rounded: true }], targetMarker: { label: '999', position: 99 }, caption: '999 is above 950, so it rounds to 1000.' },
        { kind: 'number-line', label: '9. Use all three clues', ticks: [{ label: '500' }, { label: '550' }, { label: '575', target: true }, { label: '600' }], targetMarker: { label: '575', position: 75 }, caption: '575 lies between 500 and 600, is above halfway, and rounds to 600.' },
        { kind: 'data-table', label: '10. Rounded distances', columns: ['Cities', 'Miles', 'Nearest Hundred'], rows: [['Phoenix and Palm Springs', '268', '300'], ['Los Angeles and San Francisco', '386', '400']] }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s4-example-1', unit: 1, lesson: 1, session: 4, order: 1,
    label: 'Example + Problem 1', title: 'Round 362 and 879 using place value', printedPages: '25', viewerPage: 37,
    sourceMarkers: ['Julio uses the Bay Area Rapid Transit system 362 times', '879 rounded to the nearest hundred'],
    blankVisual: {
      title: 'Use place value to round',
      sections: [
        { kind: 'place-value-blocks', label: 'Example: 362', hundreds: 3, tens: 6, ones: 2, caption: 'Use the ones to round 362 to the nearest ten.' },
        { kind: 'source-response-workspace', label: 'Problem 1', wide: true, columns: 1, parts: [{ lead: '1.', prompt: 'What is 879 rounded to the nearest hundred?', lines: ['879 → ___'], lineAnswers: [['900']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }] }
      ]
    },
    solvedVisual: {
      title: '362 → 360 and 879 → 900',
      sections: [
        { kind: 'place-value-blocks', label: 'Example: read 362 by place value', hundreds: 3, tens: 6, ones: 2, caption: 'The 2 ones are less than 5, so keep 6 tens.' },
        { kind: 'number-line', label: 'Example', ticks: [{ label: '360', rounded: true }, { label: '362', target: true }, { label: '365' }, { label: '370' }], caption: '2 ones are below 5, so 362 → 360.' },
        { kind: 'number-line', label: 'Problem 1', ticks: [{ label: '800' }, { label: '850' }, { label: '879', target: true }, { label: '900', rounded: true }], caption: '879 is above 850, so 879 → 900.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s4-problems-2-3', unit: 1, lesson: 1, session: 4, order: 2,
    label: 'Problems 2–3', title: 'Estimate prices and analyze a rounding error', printedPages: '26', viewerPage: 38,
    sourceMarkers: ['large rain barrel for $279', '416 third grade students', 'Shani chose'],
    blankVisual: responseWorkspace('Problems 2–3', [
      { lead: '2.', prompt: 'Round $279 and $129 to the nearest $10.', lines: ['$279 → $___', '$129 → $___'], answers: [['280'], ['130']], openWorkspace: true },
      { lead: '3.', prompt: 'Round 416 to the nearest hundred. Then explain how Shani might have chosen 420.', lines: ['416 → ___'], answers: [['400']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Round the prices, then diagnose the place-value error',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'number-line', label: '2. Round $279 to the nearest ten', ticks: [{ label: '$270' }, { label: '$275' }, { label: '$279', target: true }, { label: '$280', rounded: true }], targetMarker: { label: '$279', position: 90 }, caption: '$279 rounds to $280.' },
        { kind: 'number-line', label: '2. Round $129 to the nearest ten', ticks: [{ label: '$120' }, { label: '$125' }, { label: '$129', target: true }, { label: '$130', rounded: true }], targetMarker: { label: '$129', position: 90 }, caption: '$129 rounds to $130.' },
        { kind: 'number-line', label: '3. Round 416 to the nearest hundred', ticks: [{ label: '400', rounded: true }, { label: '416', target: true }, { label: '450' }, { label: '500' }], targetMarker: { label: '416', position: 16 }, caption: '416 is below 450, so it rounds to 400.' },
        { kind: 'note', label: '3. Explain Shani’s 420', text: '420 is the nearest ten, not the nearest hundred. The incorrect answer changes the requested rounding place.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s4-problems-4-6', unit: 1, lesson: 1, session: 4, order: 3,
    label: 'Problems 4–6', title: 'Choose rounded values and judge four statements', printedPages: '27', viewerPage: 39,
    sourceMarkers: ['Su-Fen scored 194 points', 'round to 590', 'True orFalse'],
    blankVisual: responseWorkspace('Problems 4–6', [
      { lead: '4.', prompt: 'Round 194 to the nearest hundred. Choose: 100, 180, 190, or 200.', lines: ['answer: ___'], answers: [['200']] },
      { lead: '5.', prompt: 'Which numbers round to 590: 596, 594, 588, 585, 584?', lines: ['correct choices: ___, ___, ___'], answers: [['594', '588', '585']] },
      { lead: '6a.', prompt: '496 rounded to the nearest hundred is 500.', lines: ['True or False: ___'], answers: [['True']] },
      { lead: '6b.', prompt: '496 rounded to the nearest ten is 500.', lines: ['True or False: ___'], answers: [['True']] },
      { lead: '6c.', prompt: '205 rounded to the nearest ten is 200.', lines: ['True or False: ___'], answers: [['False']] },
      { lead: '6d.', prompt: '745 rounded to the nearest hundred is 800.', lines: ['True or False: ___'], answers: [['False']] }
    ]),
    solvedVisual: {
      title: 'Problems 4–6 solutions',
      sections: [
        { kind: 'number-line', label: '4. Round 194 to the nearest hundred', ticks: [{ label: '100' }, { label: '150' }, { label: '194', target: true }, { label: '200', rounded: true }], targetMarker: { label: '194', position: 94 }, caption: '194 is above 150, so it rounds to 200.' },
        { kind: 'number-line', label: '5. Values that round to 590', ticks: [{ label: '584' }, { label: '585', target: true }, { label: '588', target: true }, { label: '590', rounded: true }, { label: '594', target: true }, { label: '595' }, { label: '596' }], caption: 'Of the choices, 585, 588, and 594 round to 590. The endpoints outside the interval do not.' },
        { kind: 'number-line', label: '6a–6b. The same value with two place choices', ticks: [{ label: '490' }, { label: '495' }, { label: '496', target: true }, { label: '500', rounded: true }], targetMarker: { label: '496', position: 60 }, caption: '496 rounds to 500 to either the nearest ten or nearest hundred.' },
        { kind: 'number-line', label: '6c. Check the halfway rule for 205', ticks: [{ label: '200' }, { label: '205', target: true }, { label: '210', rounded: true }], caption: '205 is halfway, so it rounds to the greater ten: 210.' },
        { kind: 'number-line', label: '6d. Round 745 to the nearest hundred', ticks: [{ label: '700', rounded: true }, { label: '745', target: true }, { label: '750' }, { label: '800' }], caption: '745 is below the halfway value 750, so it rounds to 700.' }
      ]
    }
  },
  {
    key: 'v1-u1-l1-s4-problems-7-9', unit: 1, lesson: 1, session: 4, order: 4,
    label: 'Problems 7–9', title: 'Round to tens and hundreds, then explain', printedPages: '28', viewerPage: 40,
    sourceMarkers: ['Which numbers will round to 250', 'total of 778 people', 'Round 465 to the nearest hundred'],
    blankVisual: {
      title: 'Problems 7–9',
      sections: [
        { kind: 'card-grid', label: '7. Read each official representation', cards: [
          { label: 'A · point at 240', sections: [{ kind: 'number-line', ticks: [{ label: '230' }, { label: '240', target: true }, { label: '250' }], caption: 'This point represents 240.' }] },
          { label: 'B · 250', sections: [placeValueChart(250, '250 by place value')] },
          { label: 'C · 153', sections: [{ kind: 'place-value-blocks', hundreds: 1, tens: 5, ones: 3, caption: '1 hundred + 5 tens + 3 ones' }] },
          { label: 'D · 259', sections: [{ kind: 'equations', lines: ['259'] }] },
          { label: 'E · 245', sections: [{ kind: 'equations', lines: ['245'] }] }
        ] },
        { kind: 'source-response-workspace', label: 'Finish the lesson', wide: true, columns: 2, parts: [
          { lead: '7.', prompt: 'Which choices round to 250: A (number-line point at 240), B (250), C (base-ten blocks showing 153), D (259), and E (245)?', lines: ['choose all: ___'], lineAnswers: [['B and E']], printedLineCount: 4, interactiveLines: true },
          { lead: '8.', prompt: 'Round 778 to the nearest ten and nearest hundred.', lines: ['nearest ten: ___', 'nearest hundred: ___'], lineAnswers: [['780'], ['800']], printedLineCount: 4, interactiveLines: true },
          { lead: '9.', prompt: 'Round 465 to the nearest hundred. Explain your thinking.', lines: ['465 → ___'], lineAnswers: [['500']], printedLineCount: 5, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Problems 7–9 solutions',
      sections: [
        { kind: 'card-grid', label: 'Problem 7 · compare all five representations', cards: [
          { label: 'A · 240 → 240', sections: [{ kind: 'number-line', ticks: [{ label: '230' }, { label: '240', target: true, rounded: true }, { label: '250' }], caption: 'Not selected' }] },
          { label: 'B · 250 → 250 ✓', sections: [placeValueChart(250, 'Selected')] },
          { label: 'C · 153 → 150', sections: [{ kind: 'place-value-blocks', hundreds: 1, tens: 5, ones: 3, caption: 'Not selected' }] },
          { label: 'D · 259 → 260', sections: [{ kind: 'equations', lines: ['Not selected'] }] },
          { label: 'E · 245 → 250 ✓', sections: [{ kind: 'equations', lines: ['Selected'] }] }
        ] },
        { kind: 'note', label: 'Problem 7 answer', text: 'Choose B and E only. The point in A is exactly 240, so rounding it to the nearest ten keeps 240.' },
        { kind: 'number-line', label: 'Problem 8 · nearest ten', ticks: [{ label: '770' }, { label: '775' }, { label: '778', target: true }, { label: '780', rounded: true }], caption: '778 → 780' },
        { kind: 'number-line', label: 'Problem 8 · nearest hundred', ticks: [{ label: '700' }, { label: '750' }, { label: '778', target: true }, { label: '800', rounded: true }], caption: '778 → 800' },
        { kind: 'number-line', label: 'Problem 9', ticks: [{ label: '400' }, { label: '450' }, { label: '465', target: true }, { label: '500', rounded: true }], caption: '465 is greater than halfway 450, so 465 → 500.' }
      ]
    }
  },
  {
    key: 'v1-u1-l2-s1-try-it', unit: 1, lesson: 2, session: 1, order: 1,
    label: 'Try It', title: 'Combine 147 and 212 songs', printedPages: '31', viewerPage: 43,
    sourceMarkers: ['Daren has 147 hip hop songs', 'Rosa has 212 different hip hop songs', 'in all'],
    blankVisual: additionVisual('Add the two playlists', [
      { lead: 'Try It', prompt: 'How many songs do Daren and Rosa have in all?', blankLines: ['147 + 212 = ___'], answers: [['359']], equation: '147 + 212 = 359', answer: '359 songs' }
    ], 'blank'),
    solvedVisual: {
      title: 'Add by matching place values',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'place-value-blocks', label: '147', hundreds: 1, tens: 4, ones: 7, caption: '147 = 100 + 40 + 7' },
        { kind: 'place-value-blocks', label: '212', hundreds: 2, tens: 1, ones: 2, caption: '212 = 200 + 10 + 2' },
        { kind: 'equations', label: 'Combine like places', lines: ['100 + 200 = 300', '40 + 10 = 50', '7 + 2 = 9', '300 + 50 + 9 = 359'] }
      ]
    }
  },
  {
    key: 'v1-u1-l2-s1-connect', unit: 1, lesson: 2, session: 1, order: 2,
    label: 'Connect It', title: 'Break apart 374 + 122 and estimate', printedPages: '32', viewerPage: 44,
    sourceMarkers: ['Explain how to find the number of songs', 'addition problem 374 + 122', 'Check your answer by estimating'],
    blankVisual: responseWorkspace('Connect three-digit addition strategies', [
      { lead: '1.', prompt: 'Explain how to find the number of songs in the Try It problem.', lines: [], openWorkspace: true },
      { lead: '2a.', prompt: 'Break apart 374.', lines: ['374 = ___ + ___ + ___'], answers: [['300', '70', '4']] },
      { lead: '2b.', prompt: 'Break apart 122.', lines: ['122 = ___ + ___ + ___'], answers: [['100', '20', '2']] },
      { lead: '2c.', prompt: 'Add matching places.', lines: ['374 + 122 = ___'], answers: [['496']] },
      { lead: '2d.', prompt: 'Round each addend to the nearest ten and estimate.', lines: ['___ + ___ = ___'], answers: [['370', '120', '490']], openWorkspace: true },
      { lead: '3.', prompt: 'Describe another way to find 374 + 122.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: {
      title: '374 + 122 connected three ways',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'equations', label: 'Break apart', lines: ['374 = 300 + 70 + 4', '122 = 100 + 20 + 2', '(300 + 100) + (70 + 20) + (4 + 2) = 496'] },
        { kind: 'equations', label: 'Estimate', lines: ['374 → 370', '122 → 120', '370 + 120 = 490'] },
        { kind: 'note', label: 'Reasonableness', text: 'The exact sum 496 is close to the estimate 490.' }
      ]
    }
  },
  {
    key: 'v1-u1-l2-s1-prepare', unit: 1, lesson: 2, session: 1, order: 3,
    label: 'Prepare', title: 'Represent ways to break apart 247', printedPages: '33', viewerPage: 45,
    sourceMarkers: ['Prepare', 'breaking apart numbers', 'break apart 247'],
    blankVisual: {
      title: 'Prepare for Adding Three-Digit Numbers',
      sections: [
        {
          kind: 'official-organizer',
          label: '1. Fill the six official example boxes · Student Worktext p. 33',
          displayWidth: 860,
          centerLabel: 'breaking apart numbers',
          fields: [
            { ariaLabel: 'Top breaking-apart example', answer: 'I can break apart numbers to make them easier to add.', x: 35, y: 2, width: 30, height: 32 },
            { ariaLabel: 'Upper-left breaking-apart example', answer: '123 has 1 hundred, 2 tens, and 3 ones.', x: 3, y: 16, width: 30, height: 32 },
            { ariaLabel: 'Upper-right breaking-apart example', answer: '423 = 400 + 20 + 3, or 400 + 23, or 420 + 3.', x: 67, y: 16, width: 30, height: 32 },
            { ariaLabel: 'Lower-left breaking-apart example', answer: '204 has 2 hundreds, 0 tens, and 4 ones, or 204 ones.', x: 3, y: 52.5, width: 30, height: 32 },
            { ariaLabel: 'Lower-right breaking-apart example', answer: '326 = 100 + 100 + 100 + 10 + 10 + 1 + 1 + 1 + 1 + 1 + 1.', x: 67, y: 52.5, width: 30, height: 32 },
            { ariaLabel: 'Bottom breaking-apart example', answer: '356 = 300 + 50 + 6.', x: 35, y: 66.5, width: 30, height: 32 }
          ],
          caption: 'Use words, numbers, or pictures in the same official organizer.'
        },
        {
          kind: 'source-response-workspace',
          label: '2. Show two ways to break apart 247.',
          wide: true,
          columns: 1,
          parts: [{ prompt: 'Complete both equations.', lines: ['247 = ___ + ___ + ___', '247 = ___ + ___'], lineAnswers: [['200', '40', '7'], ['200', '47']], printedLineCount: 3, interactiveLines: true }]
        }
      ]
    },
    solvedVisual: {
      title: 'Prepare for Adding Three-Digit Numbers',
      sourceNote: supplementalVisualNote,
      sections: [
        {
          kind: 'official-organizer',
          label: '1. Show what you know about breaking apart numbers · Student Worktext p. 33',
          displayWidth: 860,
          centerLabel: 'breaking apart numbers',
          fields: [
            { ariaLabel: 'Top breaking-apart example', answer: 'I can break apart numbers to make them easier to add.', x: 35, y: 2, width: 30, height: 32 },
            { ariaLabel: 'Upper-left breaking-apart example', answer: '123 has 1 hundred, 2 tens, and 3 ones.', x: 3, y: 16, width: 30, height: 32 },
            { ariaLabel: 'Upper-right breaking-apart example', answer: '423 = 400 + 20 + 3, or 400 + 23, or 420 + 3.', x: 67, y: 16, width: 30, height: 32 },
            { ariaLabel: 'Lower-left breaking-apart example', answer: '204 has 2 hundreds, 0 tens, and 4 ones, or 204 ones.', x: 3, y: 52.5, width: 30, height: 32 },
            { ariaLabel: 'Lower-right breaking-apart example', answer: '326 = 100 + 100 + 100 + 10 + 10 + 1 + 1 + 1 + 1 + 1 + 1.', x: 67, y: 52.5, width: 30, height: 32 },
            { ariaLabel: 'Bottom breaking-apart example', answer: '356 = 300 + 50 + 6.', x: 35, y: 66.5, width: 30, height: 32 }
          ],
          caption: 'The organizer and answers are verified in Teacher Guide Volume 1 pp. 130–131.'
        },
        { kind: 'place-value-blocks', label: 'First way', hundreds: 2, tens: 4, ones: 7, caption: '247 = 200 + 40 + 7' },
        { kind: 'equations', label: 'Second way', lines: ['247 = 200 + 47'] }
      ]
    }
  },
  {
    key: 'v1-u1-l2-s1-practice', unit: 1, lesson: 2, session: 1, order: 4,
    label: 'Practice', title: 'Add two years of coding time', printedPages: '34', viewerPage: 46,
    sourceMarkers: ['spend 215 hours', 'next year they spend 173 hours', 'another way'],
    blankVisual: additionVisual('Solve and check the coding-hours problem', [
      { lead: '3.', prompt: 'How many hours do Jacob and his mom spend learning in the two years?', blankLines: ['215 + 173 = ___'], answers: [['388']], equation: '215 + 173 = 388', answer: '388 hours' },
      { lead: '4.', prompt: 'Solve the problem another way to check.', blankLines: ['200 + 100 = ___', '10 + 70 = ___', '5 + 3 = ___', '___ + ___ + ___ = ___'], answers: [['300'], ['80'], ['8'], ['300', '80', '8', '388']], equation: '(200 + 100) + (10 + 70) + (5 + 3)', answer: '300 + 80 + 8 = 388' }
    ], 'blank'),
    solvedVisual: additionVisual('Coding-hours solutions', [
      { lead: '3.', prompt: 'Two-year total', blankLines: [], answers: [], equation: '215 + 173 = 388', answer: '388 hours' },
      { lead: '4.', prompt: 'Place-value check', blankLines: [], answers: [], equation: '300 + 80 + 8 = 388', answer: 'The check matches.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l2-s2-try-model', unit: 1, lesson: 2, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Combine 130 and 280 photos', printedPages: '35–36', viewerPage: 47,
    sourceMarkers: ['Greg takes 130 photos', 'Mora takes 280 photos', '11 tens'],
    blankVisual: additionVisual('Use partial sums for the photos', [
      { lead: 'Try It', prompt: 'How many photos do Greg and Mora take in all?', blankLines: ['130 + 280 = ___'], answers: [['410']], equation: '130 + 280 = 410', answer: '410 photos' }
    ], 'blank'),
    solvedVisual: {
      title: 'Regroup 11 tens as 1 hundred and 1 ten',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'place-value-blocks', label: 'Picture It · 130', hundreds: 1, tens: 3, ones: 0, caption: '130 = 1 hundred + 3 tens' },
        { kind: 'place-value-blocks', label: 'Picture It · 280', hundreds: 2, tens: 8, ones: 0, caption: '280 = 2 hundreds + 8 tens' },
        { kind: 'equations', label: 'Partial sums', lines: ['ones: 0 + 0 = 0', 'tens: 30 + 80 = 110', 'hundreds: 100 + 200 = 300', '0 + 110 + 300 = 410'] },
        verifiedAdditionModelSection('Model It · regroup the tens', '130 + 280 = 410', '11 tens regroup as 1 hundred and 1 ten.'),
        { kind: 'place-value-blocks', label: 'Regrouped total', hundreds: 4, tens: 1, ones: 0, caption: '11 tens = 1 hundred + 1 ten, so the total is 410.' }
      ]
    }
  },
  {
    key: 'v1-u1-l2-s2-connect', unit: 1, lesson: 2, session: 2, order: 2,
    label: 'Connect It', title: 'Connect blocks, partial sums, and regrouping', printedPages: '37', viewerPage: 49,
    sourceMarkers: ['partial sums in Model It', '11 tens', 'need to regroup'],
    blankVisual: responseWorkspace('Connect the place-value models', [
      { lead: '1a.', prompt: 'How do the partial sums match the blocks?', lines: [], openWorkspace: true },
      { lead: '1b.', prompt: '11 tens is the same as how many hundreds and tens?', lines: ['___ hundred and ___ ten'], answers: [['1', '1']] },
      { lead: '1c.', prompt: 'Why do you need to regroup the tens?', lines: [], openWorkspace: true },
      { lead: '1d.', prompt: 'How can you tell when regrouping is needed?', lines: [], openWorkspace: true },
      { lead: '2.', prompt: 'Explain how place value and regrouping help add three-digit numbers.', lines: [], openWorkspace: true },
      { lead: '3.', prompt: 'Describe a model or strategy that helped.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Place-value regrouping explained',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'place-value-blocks', label: '11 tens regrouped', hundreds: 1, tens: 1, ones: 0, caption: 'Ten tens trade for one hundred, leaving one ten.' },
        { kind: 'note', label: 'When to regroup', text: 'Regroup when a place-value sum contains 10 or more of the same unit.' },
        { kind: 'equations', label: 'For 130 + 280', lines: ['11 tens = 1 hundred + 1 ten', '3 hundreds + 1 regrouped hundred = 4 hundreds', 'total = 410'] }
      ]
    }
  },
  {
    key: 'v1-u1-l2-s2-apply', unit: 1, lesson: 2, session: 2, order: 3,
    label: 'Apply It', title: 'Solve three place-value additions', printedPages: '38', viewerPage: 50,
    sourceMarkers: ['275', '185 more dairy cows', '649 + 184'],
    blankVisual: additionVisual('Apply partial sums and regrouping', [
      { lead: '1.', prompt: 'Fill the partial sums for 275 + 216.', blankLines: ['ones: ___', 'tens: ___', 'hundreds: ___', 'sum: ___'], answers: [['11'], ['80'], ['400'], ['491']], equation: '11 + 80 + 400 = 491', answer: '491' },
      { lead: '2.', prompt: 'A farm had 275 cows and now has 185 more. How many this year?', blankLines: ['275 + 185 = ___'], answers: [['460']], equation: '275 + 185 = 460', answer: '460 cows' },
      { lead: '3.', prompt: 'Find 649 + 184.', blankLines: ['649 + 184 = ___'], answers: [['833']], equation: '649 + 184 = 833', answer: '833' }
    ], 'blank'),
    solvedVisual: additionVisual('Apply It solutions', [
      { lead: '1.', prompt: '275 + 216', blankLines: [], answers: [], equation: '11 + 80 + 400 = 491', answer: '491' },
      { lead: '2.', prompt: '275 + 185', blankLines: [], answers: [], equation: '275 + 185 = 460', answer: '460 cows' },
      { lead: '3.', prompt: '649 + 184', blankLines: [], answers: [], equation: '649 + 184 = 833', answer: '833' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l2-s2-practice-1-2', unit: 1, lesson: 2, session: 2, order: 4,
    label: 'Practice 1–2', title: 'Complete two place-value additions', printedPages: '39', viewerPage: 51,
    sourceMarkers: ['Practice Using Place-Value Strategies to Add', 'total number of train stations', 'Fill in the blanks to add'],
    blankVisual: additionVisual('Practice problems 1–2', [
      { lead: '1.', prompt: 'Break apart 631 + 368 and complete the sum.', blankLines: ['631 = 600 + ___ + 1', '368 = ___ + 60 + 8', '900 + 90 + ___ = ___'], answers: [['30'], ['300'], ['9', '999']], equation: '(600 + 300) + (30 + 60) + (1 + 8)', answer: '900 + 90 + 9 = 999' },
      { lead: '2.', prompt: 'Complete the partial sums for 167 + 208.', blankLines: ['ones: ___ or ___ ten + ___ ones', 'tens: ___', 'hundreds: ___', 'sum: ___'], answers: [['15', '1', '5'], ['60'], ['300'], ['375']], equation: '15 + 60 + 300 = 375', answer: '375' }
    ], 'blank'),
    solvedVisual: additionVisual('Practice 1–2 solutions', [
      { lead: '1.', prompt: '631 + 368', blankLines: [], answers: [], equation: '900 + 90 + 9', answer: '999' },
      { lead: '2.', prompt: '167 + 208', blankLines: [], answers: [], equation: '15 + 60 + 300', answer: '375' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l2-s2-practice-3-6', unit: 1, lesson: 2, session: 2, order: 5,
    label: 'Practice 3–6', title: 'Add, estimate, and choose greatest and least sums', printedPages: '40', viewerPage: 52,
    sourceMarkers: ['157 + 291', '142 pounds of trash', 'greatest possible sum'],
    blankVisual: additionVisual('Practice problems 3–6', [
      { lead: '3.', prompt: 'Find 157 + 291.', blankLines: ['157 + 291 = ___'], answers: [['448']], equation: '157 + 291 = 448', answer: '448' },
      { lead: '4.', prompt: 'Find the total of 142 pounds and 382 pounds.', blankLines: ['142 + 382 = ___'], answers: [['524']], equation: '142 + 382 = 524', answer: '524 pounds' },
      { lead: '5.', prompt: 'Estimate problem 4 to the nearest hundred.', blankLines: ['___ + ___ = ___'], answers: [['100', '400', '500']], equation: '100 + 400 = 500', answer: '524 is reasonable because it is close to 500.' },
      { lead: '6.', prompt: 'From 348, 256, 289, and 361, make the greatest and least sums.', blankLines: ['greatest: ___ + ___ = ___', 'least: ___ + ___ = ___'], answers: [['361', '348', '709'], ['256', '289', '545']], equation: '361 + 348 = 709; 256 + 289 = 545', answer: '709 is greatest; 545 is least.' }
    ], 'blank'),
    solvedVisual: additionVisual('Practice 3–6 solutions', [
      { lead: '3.', prompt: '157 + 291', blankLines: [], answers: [], equation: '157 + 291', answer: '448' },
      { lead: '4.', prompt: '142 + 382', blankLines: [], answers: [], equation: '142 + 382', answer: '524 pounds' },
      { lead: '5.', prompt: 'Estimate', blankLines: [], answers: [], equation: '100 + 400 = 500', answer: 'The exact total 524 is reasonable.' },
      { lead: '6.', prompt: 'Extrema', blankLines: [], answers: [], equation: '361 + 348 = 709; 256 + 289 = 545', answer: 'Use the two greatest or two least addends.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l2-s3-try-model', unit: 1, lesson: 2, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Connect partial sums to the addition algorithm', printedPages: '41–42', viewerPage: 53,
    sourceMarkers: ['What is the sum', '225', '229', 'using an algorithm'],
    blankVisual: additionVisual('Add 225 + 229 with place value', [
      { lead: 'Try It', prompt: 'Find the sum using place value.', blankLines: ['225 + 229 = ___'], answers: [['454']], equation: '225 + 229 = 454', answer: '454' }
    ], 'blank'),
    solvedVisual: {
      title: 'Regroup 14 ones, then use the short algorithm',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'equations', label: 'Partial sums', lines: ['ones: 5 + 9 = 14', 'tens: 20 + 20 = 40', 'hundreds: 200 + 200 = 400', '14 + 40 + 400 = 454'] },
        verifiedAdditionModelSection('Model It · vertical algorithm', '225 + 229 = 454', 'Record 4 ones, regroup 1 ten, then add tens and hundreds.'),
        { kind: 'equations', label: 'Algorithm steps', lines: ['14 ones = 1 ten + 4 ones', '2 tens + 2 tens + 1 regrouped ten = 5 tens', '2 hundreds + 2 hundreds = 4 hundreds', 'sum = 454'] }
      ]
    }
  },
  {
    key: 'v1-u1-l2-s3-connect', unit: 1, lesson: 2, session: 3, order: 2,
    label: 'Connect It', title: 'Explain regrouping and find 158 + 363', printedPages: '43', viewerPage: 55,
    sourceMarkers: ['sum of the ones is 14', 'regroup once', '158 + 363'],
    blankVisual: responseWorkspace('Connect partial sums and the algorithm', [
      { lead: '1a.', prompt: 'Where do 14 ones appear in the algorithm?', lines: [], openWorkspace: true },
      { lead: '1b.', prompt: 'Why is only one regrouping needed?', lines: [], openWorkspace: true },
      { lead: '1c.', prompt: 'How are partial sums and the algorithm alike and different?', lines: [], openWorkspace: true },
      { lead: '2.', prompt: 'Use the grid to find 158 + 363 and explain.', lines: ['158 + 363 = ___'], answers: [['521']], openWorkspace: true },
      { lead: '3.', prompt: 'Describe a model or strategy that helped with the Try It problem.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Regrouping connected to place value',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'note', label: '14 ones', text: 'The 4 stays in the ones place and the regrouped 1 is recorded above the tens place.' },
        { kind: 'note', label: 'Why once', text: 'The ones sum is at least 10, but the tens sum including the regrouped ten is less than 10.' },
        { kind: 'equations', label: 'Show What You Know', lines: ['8 + 3 = 11 → record 1 one, regroup 1 ten', '5 + 6 + 1 = 12 → record 2 tens, regroup 1 hundred', '1 + 3 + 1 = 5 hundreds', '158 + 363 = 521'] }
      ]
    }
  },
  {
    key: 'v1-u1-l2-s3-apply', unit: 1, lesson: 2, session: 3, order: 3,
    label: 'Apply It', title: 'Solve three algorithm problems and estimate', printedPages: '44', viewerPage: 56,
    sourceMarkers: ['245', 'Olympic athletes', 'Brazil', 'Japan', '284', '258'],
    blankVisual: additionVisual('Apply the addition algorithm', [
      { lead: '4.', prompt: 'Find 245 + 114 + 328.', blankLines: ['245 + 114 + 328 = ___'], answers: [['687']], equation: '245 + 114 + 328 = 687', answer: '687' },
      { lead: '5.', prompt: 'Find the total for Japan (614) and Brazil (319), then estimate to the nearest ten.', blankLines: ['614 + 319 = ___', 'estimate: ___ + ___ = ___'], answers: [['933'], ['610', '320', '930']], equation: '614 + 319 = 933; estimate 610 + 320 = 930', answer: '933 athletes; the nearest-ten estimate supports the answer.' },
      { lead: '6.', prompt: 'Find 284 + 258.', blankLines: ['284 + 258 = ___'], answers: [['542']], equation: '284 + 258 = 542', answer: '542' }
    ], 'blank'),
    solvedVisual: additionVisual('Apply It solutions', [
      { lead: '4.', prompt: '245 + 114 + 328', blankLines: [], answers: [], equation: '245 + 114 = 359; 359 + 328 = 687', answer: '687' },
      { lead: '5.', prompt: 'Japan and Brazil', blankLines: [], answers: [], equation: '614 + 319 = 933; estimate 610 + 320 = 930', answer: '933 athletes' },
      { lead: '6.', prompt: '284 + 258', blankLines: [], answers: [], equation: '284 + 258 = 542', answer: '542' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l2-s3-practice-1-2', unit: 1, lesson: 2, session: 3, order: 4,
    label: 'Practice 1–2', title: 'Complete two algorithm grids', printedPages: '45', viewerPage: 57,
    sourceMarkers: ['Practice Connecting Place-Value Strategies to an Algorithm', 'Fill in the blanks or boxes to add', '377'],
    blankVisual: additionVisual('Practice problems 1–2', [
      { lead: '1.', prompt: 'Complete 124 + 253 using partial sums.', blankLines: ['ones: ___', 'tens: ___', 'hundreds: ___', 'sum: ___'], answers: [['7'], ['70'], ['300'], ['377']], equation: '7 + 70 + 300 = 377', answer: '377' },
      { lead: '2.', prompt: 'Complete the algorithm for 459 + 260.', blankLines: ['459 + 260 = ___'], answers: [['719']], equation: '459 + 260 = 719', answer: '719' }
    ], 'blank'),
    solvedVisual: additionVisual('Practice 1–2 solutions', [
      { lead: '1.', prompt: '124 + 253', blankLines: [], answers: [], equation: '7 + 70 + 300 = 377', answer: '377' },
      { lead: '2.', prompt: '459 + 260', blankLines: [], answers: [], equation: '9 ones; 11 tens regroup to 1 hundred + 1 ten; 7 hundreds', answer: '719' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l2-s3-practice-3-7', unit: 1, lesson: 2, session: 3, order: 5,
    label: 'Practice 3–7', title: 'Complete five addition grids', printedPages: '46', viewerPage: 58,
    sourceMarkers: ['Fill in the blanks or boxes to add', '245'],
    blankVisual: additionVisual('Practice problems 3–7', [
      { lead: '3.', prompt: 'Find 228 + 136.', blankLines: ['228 + 136 = ___'], answers: [['364']], equation: '228 + 136 = 364', answer: '364' },
      { lead: '4.', prompt: 'Complete the partial sums for 251 + 254.', blankLines: ['ones: ___', 'tens: ___', 'hundreds: ___', 'sum: ___'], answers: [['5'], ['100'], ['400'], ['505']], equation: '5 + 100 + 400 = 505', answer: '505' },
      { lead: '5.', prompt: 'Find 151 + 154.', blankLines: ['151 + 154 = ___'], answers: [['305']], equation: '151 + 154 = 305', answer: '305' },
      { lead: '6.', prompt: 'Complete the partial sums for 368 + 245.', blankLines: ['ones: ___', 'tens: ___', 'hundreds: ___', 'sum: ___'], answers: [['13'], ['100'], ['500'], ['613']], equation: '13 + 100 + 500 = 613', answer: '613' },
      { lead: '7.', prompt: 'Find 418 + 254 + 328.', blankLines: ['418 + 254 + 328 = ___'], answers: [['1000']], equation: '418 + 254 + 328 = 1000', answer: '1,000' }
    ], 'blank'),
    solvedVisual: additionVisual('Practice 3–7 solutions', [
      { lead: '3.', prompt: '228 + 136', blankLines: [], answers: [], equation: '228 + 136', answer: '364' },
      { lead: '4.', prompt: '251 + 254', blankLines: [], answers: [], equation: '5 + 100 + 400', answer: '505' },
      { lead: '5.', prompt: '151 + 154', blankLines: [], answers: [], equation: '151 + 154', answer: '305' },
      { lead: '6.', prompt: '368 + 245', blankLines: [], answers: [], equation: '13 + 100 + 500', answer: '613' },
      { lead: '7.', prompt: '418 + 254 + 328', blankLines: [], answers: [], equation: '418 + 254 = 672; 672 + 328', answer: '1,000' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l2-s4-example-1', unit: 1, lesson: 2, session: 4, order: 1,
    label: 'Example + Problem 1', title: 'Use a two-step addition plan', printedPages: '47', viewerPage: 59,
    sourceMarkers: ['317 mangoes and 179 avocados', 'Maria has 109 aluminum cans', 'stepbrother has 56 more', 'aluminum cans than Maria'],
    blankVisual: additionVisual('Follow the two-step relationship', [
      { lead: 'Example', prompt: 'Find the total of 317 mangoes and 179 avocados.', blankLines: ['317 + 179 = ___'], answers: [['496']], equation: '317 + 179 = 496', answer: '496 pieces of fruit' },
      { lead: '1.', prompt: 'Maria has 109 cans. Her stepbrother has 56 more. How many do they have in all?', blankLines: ['stepbrother: 109 + 56 = ___', 'together: 109 + ___ = ___'], answers: [['165'], ['165', '274']], equation: '109 + 56 = 165; 109 + 165 = 274', answer: '274 cans' }
    ], 'blank'),
    solvedVisual: additionVisual('Example and Problem 1 solutions', [
      { lead: 'Example', prompt: '317 + 179', blankLines: [], answers: [], equation: '400 + 80 + 16', answer: '496' },
      { lead: '1.', prompt: 'Find the stepbrother’s amount, then combine both amounts.', blankLines: [], answers: [], equation: '109 + 56 = 165; 109 + 165 = 274', answer: '274 cans' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l2-s4-problems-2-3', unit: 1, lesson: 2, session: 4, order: 2,
    label: 'Problems 2–3', title: 'Add 345 + 626 and analyze an error', printedPages: '48', viewerPage: 60,
    sourceMarkers: ['sum of 345 and 626', '149 + 293', 'Sara chose'],
    blankVisual: responseWorkspace('Problems 2–3', [
      { lead: '2.', prompt: 'Find 345 + 626. Show your work.', lines: ['345 + 626 = ___'], answers: [['971']], openWorkspace: true },
      { lead: '3.', prompt: 'Find 149 + 293. Then explain how Sara could have chosen 342.', lines: ['149 + 293 = ___'], answers: [['442']], openWorkspace: true }
    ]),
    solvedVisual: additionVisual('Problems 2–3 solutions', [
      { lead: '2.', prompt: '345 + 626', blankLines: [], answers: [], equation: '345 + 626 = 971', answer: '971' },
      { lead: '3.', prompt: '149 + 293', blankLines: [], answers: [], equation: '149 + 293 = 442', answer: '442. The extra hundred comes from regrouping the tens column.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l2-s4-problems-4-6', unit: 1, lesson: 2, session: 4, order: 3,
    label: 'Problems 4–6', title: 'Solve a two-day trip, check a sum, and rename 84', printedPages: '49', viewerPage: 61,
    sourceMarkers: ['129 miles on Tuesday', '258 and 436', '68 + 16'],
    blankVisual: additionVisual('Problems 4–6', [
      { lead: '4.', prompt: 'Tuesday is 129 miles. Wednesday is 78 more than Tuesday. Find the two-day total.', blankLines: ['Wednesday: 129 + 78 = ___', 'total: 129 + ___ = ___'], answers: [['207'], ['207', '336']], equation: '129 + 78 = 207; 129 + 207 = 336', answer: '336 miles' },
      { lead: '5.', prompt: 'Find 258 + 436 and estimate to check.', blankLines: ['258 + 436 = ___', 'estimate: ___ + ___ = ___'], answers: [['694'], ['300', '400', '700']], equation: '258 + 436 = 694; estimate 300 + 400 = 700', answer: '694; the estimate supports it.' },
      { lead: '6.', prompt: 'Choose one official equivalent form for 68 + 16.', blankLines: ['68 + 16 = ___'], answers: [['7 tens and 14 ones||8 tens and 4 ones']], equation: '68 + 16 = 84', answer: '7 tens and 14 ones or 8 tens and 4 ones' }
    ], 'blank'),
    solvedVisual: additionVisual('Problems 4–6 solutions', [
      { lead: '4.', prompt: 'Two-day trip', blankLines: [], answers: [], equation: '129 + 78 = 207; 129 + 207 = 336', answer: '336 miles' },
      { lead: '5.', prompt: '258 + 436', blankLines: [], answers: [], equation: '258 + 436 = 694; estimate 300 + 400 = 700', answer: '694' },
      { lead: '6.', prompt: '68 + 16', blankLines: [], answers: [], equation: '68 + 16 = 84', answer: 'The Teacher Guide accepts 7 tens and 14 ones or 8 tens and 4 ones.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l2-s4-problems-7-9', unit: 1, lesson: 2, session: 4, order: 4,
    label: 'Problems 7–9', title: 'Add, reason about ones, and explain a strategy', printedPages: '50', viewerPage: 62,
    sourceMarkers: ['147 + 123', 'number 746', '379 + 284'],
    blankVisual: additionVisual('Problems 7–9', [
      { lead: '7.', prompt: 'Find 147 + 123.', blankLines: ['147 + 123 = ___'], answers: [['270']], equation: '147 + 123 = 270', answer: '270' },
      { lead: '8.', prompt: 'Name the place values in 746 and give one one-digit addend that makes the sum’s ones digit less than 6.', blankLines: ['746 = ___ hundreds + ___ tens + ___ ones', 'one valid addend: ___'], answers: [['7', '4', '6'], ['4||5||6||7||8||9']], equation: '746 + 4 = 750', answer: '7 hundreds, 4 tens, 6 ones; 4, 5, 6, 7, 8, or 9 is valid.' },
      { lead: '9.', prompt: 'Explain a strategy for 379 + 284, then find the sum.', blankLines: ['379 + 284 = ___'], answers: [['663']], equation: '379 + 284 = 663', answer: '663' }
    ], 'blank'),
    solvedVisual: additionVisual('Problems 7–9 solutions', [
      { lead: '7.', prompt: '147 + 123', blankLines: [], answers: [], equation: '147 + 123', answer: '270' },
      { lead: '8.', prompt: '746 and a valid one-digit addend', blankLines: [], answers: [], equation: '746 = 7 hundreds + 4 tens + 6 ones; 746 + 4 = 750', answer: '4 is one valid addend; 5–9 also make a final ones digit below 6.' },
      { lead: '9.', prompt: '379 + 284', blankLines: [], answers: [], equation: '9 + 4 = 13; 7 + 8 + 1 = 16; 3 + 2 + 1 = 6', answer: '663' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s1-try-connect', unit: 1, lesson: 3, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Subtract the glass beads by place value', printedPages: '53–54', viewerPage: 65,
    sourceMarkers: ['475 glass beads', '134 beads', 'how many beads Jasmine has left'],
    blankVisual: responseWorkspace('Explore subtracting three-digit numbers', [
      { lead: 'Try It', prompt: 'Jasmine has 475 glass beads and uses 134. How many are left?', lines: ['475 − 134 = ___'], answers: [['341']], openWorkspace: true },
      { lead: '1. Look Back', prompt: 'Explain how to find how many beads Jasmine has left.', lines: [], openWorkspace: true },
      { lead: '2a.', prompt: 'Break apart 525 into hundreds, tens, and ones.', lines: ['525 = ___ + ___ + ___'], answers: [['500', '20', '5']] },
      { lead: '2b.', prompt: 'Break apart 213 into hundreds, tens, and ones.', lines: ['213 = ___ + ___ + ___'], answers: [['200', '10', '3']] },
      { lead: '2c.', prompt: 'Subtract ones, tens, and hundreds.', lines: ['525 − 213 = ___'], answers: [['312']] },
      { lead: '2d.', prompt: 'Estimate to check. One official possible check rounds to the nearest hundred.', lines: ['___ − ___ = ___'], answers: [['500', '200', '300']], openWorkspace: true },
      { lead: '3. Reflect', prompt: 'Describe another way to find 525 − 213.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Subtract by place value and check the result',
      sourceNote: supplementalVisualNote,
      sections: [
        ...subtractionVisual('Glass bead solution', [
          { lead: 'Try It', prompt: 'Subtract by place value.', equation: '475 − 134 = 341', answer: '341 beads', model: { hundreds: 4, tens: 7, ones: 5, caption: 'No regrouping is needed: subtract each place.' } }
        ], 'solved').sections,
        { kind: 'equations', label: '2a–2c · break apart 525 and 213', lines: ['525 = 500 + 20 + 5', '213 = 200 + 10 + 3', '(500 − 200) + (20 − 10) + (5 − 3) = 300 + 10 + 2 = 312'] },
        { kind: 'equations', label: '2d · official possible estimate', lines: ['525 → 500', '213 → 200', '500 − 200 = 300', '300 is close to 312, so the answer is reasonable.'] },
        { kind: 'note', label: '3. Reflect · another valid strategy', text: 'Add on from 213: add 300 to reach 513, then 12 to reach 525. The total added is 312.' }
      ]
    }
  },
  {
    key: 'v1-u1-l3-s1-prepare', unit: 1, lesson: 3, session: 1, order: 2,
    label: 'Prepare', title: 'Organize regrouping and explain 194 − 187', printedPages: '55', viewerPage: 67,
    sourceMarkers: ['Prepare', 'Subtracting Three-Digit Number', '194', '187'],
    blankVisual: {
      title: 'Prepare for Subtracting Three-Digit Numbers',
      sections: [
        {
          kind: 'official-organizer',
          variant: 'four-quadrant',
          label: '1. Complete the official regrouping organizer · Student Worktext p. 55',
          displayWidth: 860,
          centerLabel: 'regrouping',
          fields: [
            { label: 'My Definition', ariaLabel: 'My definition of regrouping', answer: 'Subtraction: change a ten to 10 ones or a hundred to 10 tens. Addition: change 10 ones to a ten or 10 tens to a hundred.', x: 0, y: 0, width: 50, height: 50 },
            { label: 'My Illustrations', ariaLabel: 'My illustrations of regrouping', answer: '1 ten = 10 ones; 1 hundred = 10 tens.', x: 50, y: 0, width: 50, height: 50 },
            { label: 'Examples', ariaLabel: 'Examples of regrouping', answer: '783 − 459: 783 = 700 + 80 + 3 or 700 + 70 + 13; the difference is 324.', x: 0, y: 50, width: 50, height: 50 },
            { label: 'Non-Examples', ariaLabel: 'Non-examples of regrouping', answer: '235 + 112 = 347; 624 − 401 = 223. Neither needs regrouping.', x: 50, y: 50, width: 50, height: 50 }
          ],
          caption: 'Use words, numbers, or pictures in the same four-quadrant organizer.'
        },
        { kind: 'source-response-workspace', label: '2. Explain how you would regroup to find 194 − 187.', wide: true, columns: 1, parts: [{ prompt: 'Find the difference after regrouping.', lines: ['194 − 187 = ___'], lineAnswers: [['7']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }] }
      ]
    },
    solvedVisual: {
      title: 'Prepare for Subtracting Three-Digit Numbers',
      sourceNote: supplementalVisualNote,
      sections: [
        {
          kind: 'official-organizer',
          variant: 'four-quadrant',
          label: '1. Verified possible answers · Student Worktext p. 55',
          displayWidth: 860,
          centerLabel: 'regrouping',
          fields: [
            { label: 'My Definition', ariaLabel: 'My definition of regrouping', answer: 'Subtraction: change a ten to 10 ones or a hundred to 10 tens. Addition: change 10 ones to a ten or 10 tens to a hundred.', x: 0, y: 0, width: 50, height: 50 },
            { label: 'My Illustrations', ariaLabel: 'My illustrations of regrouping', answer: '1 ten = 10 ones; 1 hundred = 10 tens.', x: 50, y: 0, width: 50, height: 50 },
            { label: 'Examples', ariaLabel: 'Examples of regrouping', answer: '783 − 459: 783 = 700 + 80 + 3 or 700 + 70 + 13; the difference is 324.', x: 0, y: 50, width: 50, height: 50 },
            { label: 'Non-Examples', ariaLabel: 'Non-examples of regrouping', answer: '235 + 112 = 347; 624 − 401 = 223. Neither needs regrouping.', x: 50, y: 50, width: 50, height: 50 }
          ],
          caption: 'The organizer layout and possible answers are verified in Teacher Guide Volume 1 pp. 156–157.'
        },
        ...subtractionVisual('Regrouping preparation', [
          { lead: '2.', prompt: 'Regroup one ten before subtracting.', equation: '194 − 187 = 7', answer: '194 = 100 + 80 + 14, so 14 − 7 = 7.' }
        ], 'solved').sections
      ]
    }
  },
  {
    key: 'v1-u1-l3-s1-practice', unit: 1, lesson: 3, session: 1, order: 3,
    label: 'Practice', title: 'Subtract the unpainted bowls', printedPages: '56', viewerPage: 68,
    sourceMarkers: ['355 bowls', '223 bowls', 'still need to paint'],
    blankVisual: subtractionVisual('Practice 355 − 223', [
      { lead: '3.', prompt: 'Mr. Rivera has 355 bowls and painted 223. How many still need paint?', equation: '355 − 223 = 132', answer: '132 bowls', answers: [['132']] },
      { lead: '4.', prompt: 'Use another method to check the difference.', equation: '223 + 132 = 355', answer: 'The inverse addition confirms 132.', blanks: ['223 + ___ = 355'], answers: [['132']] }
    ], 'blank'),
    solvedVisual: subtractionVisual('Bowl practice solution', [
      { lead: '3.', prompt: 'Subtract by matching place values.', equation: '355 − 223 = 132', answer: '132 bowls: 300 − 200 = 100, 50 − 20 = 30, and 5 − 3 = 2.' },
      { lead: '4.', prompt: 'Check with addition.', equation: '223 + 132 = 355', answer: 'The answer is verified.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s2-try-model', unit: 1, lesson: 3, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Regroup twice to subtract flowers', printedPages: '57–58', viewerPage: 69,
    sourceMarkers: ['Mateo uses 365 flowers', '186 of the flowers are lilies', 'How many flowers are not lilies'],
    blankVisual: subtractionVisual('Use place value for 365 − 186', [
      { lead: 'Try It', prompt: 'Mateo uses 365 flowers and 186 are lilies. How many are not lilies?', equation: '365 − 186 = 179', answer: '179 flowers', answers: [['179']] },
      { lead: 'Model It', prompt: 'Rename 365 so both tens and ones can be subtracted.', equation: '365 = 2 hundreds + 15 tens + 15 ones', answer: '2 hundreds, 15 tens, 15 ones', blanks: ['365 = ___ hundreds + ___ tens + ___ ones'], answers: [['2', '15', '15']] }
    ], 'blank'),
    solvedVisual: subtractionVisual('Regroup 365 and subtract', [
      { lead: 'Model It', prompt: 'Regroup one hundred and one ten.', equation: '365 = 2 hundreds + 15 tens + 15 ones', answer: 'Equivalent regrouped form', model: { hundreds: 2, tens: 15, ones: 15, caption: 'The regrouped model still totals 365.' } },
      { lead: 'Subtract', prompt: 'Subtract 186 by place.', equation: '365 − 186 = 179', answer: '15 − 6 = 9 ones; 15 − 8 = 7 tens; 2 − 1 = 1 hundred, so 179 flowers remain.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s2-connect-apply', unit: 1, lesson: 3, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Explain regrouping and solve three differences', printedPages: '59–60', viewerPage: 71,
    sourceMarkers: ['Why is 365 broken apart', '362', '125', '853', '146', '425', '289'],
    blankVisual: responseWorkspace('Connect and apply place-value subtraction', [
      { lead: '1a.', prompt: 'Why is 365 broken apart as 2 hundreds + 15 tens + 15 ones?', lines: [], openWorkspace: true },
      { lead: '1b.', prompt: 'Why would the answer not change if a hundred were regrouped before a ten?', lines: [], openWorkspace: true },
      { lead: '1c.', prompt: 'How do you know when you are done regrouping?', lines: [], openWorkspace: true },
      { lead: '2.', prompt: 'Explain how to subtract when you need to regroup twice.', lines: [], openWorkspace: true },
      { lead: '3. Reflect', prompt: 'Describe a model that helped you understand regrouping.', lines: [], openWorkspace: true },
      { lead: '4.', prompt: 'Find 362 − 125.', lines: ['362 − 125 = ___'], answers: [['237']], openWorkspace: true },
      { lead: '5.', prompt: 'Darcy has 853 pages and reads 146. Choose: 670, 703, 707, or 713.', lines: ['pages remaining: ___'], answers: [['707']] },
      { lead: '6.', prompt: 'Find 425 − 289.', lines: ['425 − 289 = ___'], answers: [['136']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Connect It and Apply It solutions',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'note', label: '1a–1c · when regrouping is complete', text: 'Rename 365 to make enough ones and tens to subtract 186. The value stays the same whichever equal-value trade comes first. Regrouping is complete when every top place has enough units to subtract the corresponding bottom place.' },
        { kind: 'note', label: '2. Show What You Know', text: 'Regroup 1 ten as 10 ones and combine the ones. Then regroup 1 hundred as 10 tens and combine the tens. Subtract in each place.' },
        ...subtractionVisual('Apply It solutions', [
          { lead: '4.', prompt: '362 − 125', equation: '362 − 125 = 237', answer: '237' },
          { lead: '5.', prompt: '853 − 146', equation: '853 − 146 = 707', answer: '707 pages' },
          { lead: '6.', prompt: '425 − 289', equation: '425 − 289 = 136', answer: '136' }
        ], 'solved').sections
      ]
    }
  },
  {
    key: 'v1-u1-l3-s2-practice-1-2', unit: 1, lesson: 3, session: 2, order: 3,
    label: 'Practice 1–2', title: 'Subtract with place-value strategies', printedPages: '61', viewerPage: 73,
    sourceMarkers: ['352', '147', '459', '260'],
    blankVisual: responseWorkspace('Practice problems 1–2', [
      { lead: '1.', prompt: 'Break apart and subtract 352 − 147.', lines: ['352 = ___ hundreds + ___ tens + ___ ones', 'or ___ hundreds + ___ tens + ___ ones', '147 = ___ hundred + ___ tens + ___ ones', 'difference = ___'], answers: [['3', '5', '2'], ['3', '4', '12'], ['1', '4', '7'], ['205']] },
      { lead: '2.', prompt: 'Break apart and subtract 459 − 260.', lines: ['459 = ___ hundreds + ___ tens + ___ ones', 'or ___ hundreds + ___ tens + ___ ones', '260 = ___ hundreds + ___ tens + ___ ones', 'difference = ___'], answers: [['4', '5', '9'], ['3', '15', '9'], ['2', '6', '0'], ['199']] }
    ]),
    solvedVisual: subtractionVisual('Practice 1–2 solutions', [
      { lead: '1.', prompt: '352 − 147', equation: '352 − 147 = 205', answer: 'Regroup to 3 hundreds, 4 tens, and 12 ones; then subtract to get 205.' },
      { lead: '2.', prompt: '459 − 260', equation: '459 − 260 = 199', answer: 'Regroup 459 as 3 hundreds, 15 tens, and 9 ones; subtract 2 hundreds, 6 tens, and 0 ones.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s2-practice-3-5', unit: 1, lesson: 3, session: 2, order: 4,
    label: 'Practice 3–5', title: 'Complete three regrouping problems', printedPages: '62', viewerPage: 74,
    sourceMarkers: ['905', '425', '252', '136', '636', '158'],
    blankVisual: responseWorkspace('Practice problems 3–5', [
      { lead: '3.', prompt: 'Complete the expanded-form regrouping for 905 − 425.', lines: ['905 = ___ + 0 + 5', 'or ___ + 100 + 5', '425 = ___ + ___ + 5', 'subtract hundreds: ___', 'subtract tens: ___', 'subtract ones: ___', 'difference = ___'], answers: [['900'], ['800'], ['400', '20'], ['400'], ['80'], ['0'], ['480']] },
      { lead: '4.', prompt: 'Find 252 − 136.', lines: ['252 − 136 = ___'], answers: [['116']], openWorkspace: true },
      { lead: '5.', prompt: 'Find 636 − 158.', lines: ['636 − 158 = ___'], answers: [['478']], openWorkspace: true }
    ]),
    solvedVisual: subtractionVisual('Practice 3–5 solutions', [
      { lead: '3.', prompt: '905 − 425', equation: '905 − 425 = 480', answer: 'Rename 905 as 800, 100, and 5; subtract by place to leave 400, 80, and 0.' },
      { lead: '4.', prompt: '252 − 136', equation: '252 − 136 = 116', answer: 'Regroup 1 ten as 10 ones; 12 − 6 = 6, 4 − 3 = 1, and 2 − 1 = 1.' },
      { lead: '5.', prompt: '636 − 158', equation: '636 − 158 = 478', answer: 'Regroup twice; 16 − 8 = 8, 12 − 5 = 7, and 5 − 1 = 4.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s3-try-model', unit: 1, lesson: 3, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Add on from 137 to 205', printedPages: '63–64', viewerPage: 75,
    sourceMarkers: ['205 seeds', '137 seeds', 'How many seeds does Malik have left'],
    blankVisual: subtractionVisual('Use an open number line to find 205 − 137', [
      { lead: 'Try It', prompt: 'Malik has 205 seeds and plants 137. How many remain?', equation: '205 − 137 = 68', answer: '68 seeds', answers: [['68']] },
      { lead: 'Model It', prompt: 'Add on from 137 to 205.', equation: '137 + 3 + 60 + 5 = 205', answer: '3 + 60 + 5 = 68', blanks: ['137 + ___ + ___ + ___ = 205', 'difference = ___'], answers: [['3', '60', '5'], ['68']] }
    ], 'blank'),
    solvedVisual: {
      title: 'Add on to find the difference', sourceNote: supplementalVisualNote, sections: [
        { kind: 'number-line', label: 'Open number line', ticks: [{ label: '137' }, { label: '140' }, { label: '200' }, { label: '205', target: true }], caption: '+3, then +60, then +5; total added is 68.' },
        { kind: 'equations', label: 'Read the jumps as one difference', lines: ['3 + 60 + 5 = 68, so 205 − 137 = 68 seeds.'] }
      ]
    }
  },
  {
    key: 'v1-u1-l3-s3-connect-apply', unit: 1, lesson: 3, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'Connect adding on and solve three tasks', printedPages: '65–66', viewerPage: 77,
    sourceMarkers: ['202', '195', '$200', '$34', '430', '182', '800', '379'],
    blankVisual: responseWorkspace('Connect and apply adding on', [
      { lead: '1a.', prompt: 'How would the Model It number line change if you added on 8 and then 60?', lines: [], openWorkspace: true },
      { lead: '1b.', prompt: 'Why can adding on be used to solve subtraction?', lines: [], openWorkspace: true },
      { lead: '2.', prompt: 'Use adding on to find 202 − 195.', lines: ['195 + ___ + ___ = 202', 'difference = ___'], answers: [['5', '2'], ['7']], openWorkspace: true },
      { lead: '3. Reflect', prompt: 'Describe a model that helped you solve the Try It problem.', lines: [], openWorkspace: true },
      { lead: '4.', prompt: 'Neva has $200 and spends $34. How much remains?', lines: ['$200 − $34 = $___'], answers: [['166']], openWorkspace: true },
      { lead: '5.', prompt: 'Find 430 − 182. Choose: 148, 240, 248, or 310.', lines: ['difference: ___'], answers: [['248']] },
      { lead: '6.', prompt: 'There are 800 people and 379 are adults. How many are children?', lines: ['800 − 379 = ___'], answers: [['421']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Connect It and Apply It solutions',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'note', label: '1a–1b · connect adding on', text: 'Starting with +8 reaches 145, and the next +60 reaches 205. Adding on works because subtraction can be read as a missing-addend problem: start at the lesser number and find the distance to the greater number.' },
        { kind: 'number-line', label: '2. Add on from 195 to 202', ticks: [{ label: '195' }, { label: '200' }, { label: '202', target: true }], caption: '+5, then +2; 5 + 2 = 7.' },
        { kind: 'number-line', label: '4. Add on from 34 to 200', ticks: [{ label: '34' }, { label: '40' }, { label: '100' }, { label: '200', target: true }], caption: 'The jumps are 6, 60, and 100; their sum is 166.' },
        { kind: 'number-line', label: '5. Add on from 182 to 430', ticks: [{ label: '182' }, { label: '200' }, { label: '400' }, { label: '430', target: true }], caption: 'The jumps are 18, 200, and 30; their sum is 248.' },
        { kind: 'number-line', label: '6. Add on from 379 to 800', ticks: [{ label: '379' }, { label: '380' }, { label: '400' }, { label: '800', target: true }], caption: 'The jumps are 1, 20, and 400; their sum is 421.' }
      ]
    }
  },
  {
    key: 'v1-u1-l3-s3-practice-1-4', unit: 1, lesson: 3, session: 3, order: 3,
    label: 'Practice 1–4', title: 'Add on across friendly numbers', printedPages: '67', viewerPage: 79,
    sourceMarkers: ['Practice Adding On to Subtract', '310 students', 'solve problems 1-8'],
    blankVisual: responseWorkspace('Practice problems 1–4', [
      { lead: '1.', prompt: 'Fill in the adding-on equation for 100 − 75.', lines: ['75 + ___ = 100, so 100 − 75 = ___'], answers: [['25', '25']] },
      { lead: '2.', prompt: 'Fill in the adding-on equation for 132 − 114.', lines: ['114 + ___ + ___ = 132, so 132 − 114 = ___'], answers: [['6', '12', '18']] },
      { lead: '3.', prompt: 'Fill in the adding-on equation for 201 − 162.', lines: ['162 + ___ + ___ + ___ = 201, so 201 − 162 = ___'], answers: [['8', '30', '1', '39']] },
      { lead: '4.', prompt: 'Find 501 − 470 and explain how to add on from 470.', lines: ['501 − 470 = ___'], answers: [['31']], openWorkspace: true }
    ]),
    solvedVisual: subtractionVisual('Practice 1–4 solutions', [
      { lead: '1.', prompt: '100 − 75', equation: '75 + 25 = 100', answer: '25' },
      { lead: '2.', prompt: '132 − 114', equation: '114 + 6 + 12 = 132', answer: '18' },
      { lead: '3.', prompt: '201 − 162', equation: '162 + 8 + 30 + 1 = 201', answer: '39' },
      { lead: '4.', prompt: '501 − 470', equation: '470 + 30 + 1 = 501', answer: '31' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s3-practice-5-8', unit: 1, lesson: 3, session: 3, order: 4,
    label: 'Practice 5–8', title: 'Complete four adding-on differences', printedPages: '68', viewerPage: 80,
    sourceMarkers: ['100 − 78', '200 − 96', '305 − 212', '303 − 196'],
    blankVisual: subtractionVisual('Practice problems 5–8', [
      { lead: '5.', prompt: 'Find 100 − 78.', equation: '100 − 78 = 22', answer: '22', answers: [['22']] },
      { lead: '6.', prompt: 'Find 200 − 96.', equation: '200 − 96 = 104', answer: '104', answers: [['104']] },
      { lead: '7.', prompt: 'Find 305 − 212.', equation: '305 − 212 = 93', answer: '93', answers: [['93']] },
      { lead: '8.', prompt: 'Find 303 − 196.', equation: '303 − 196 = 107', answer: '107', answers: [['107']] }
    ], 'blank'),
    solvedVisual: subtractionVisual('Practice 5–8 solutions', [
      { lead: '5.', prompt: '100 − 78', equation: '78 + 2 + 20 = 100', answer: '22' },
      { lead: '6.', prompt: '200 − 96', equation: '96 + 4 + 100 = 200', answer: '104' },
      { lead: '7.', prompt: '305 − 212', equation: '212 + 88 + 5 = 305', answer: '93' },
      { lead: '8.', prompt: '303 − 196', equation: '196 + 4 + 100 + 3 = 303', answer: '107' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s4-try-model', unit: 1, lesson: 3, session: 4, order: 1,
    label: 'Try It + Model It', title: 'Connect place value to the subtraction algorithm', printedPages: '69–70', viewerPage: 81,
    sourceMarkers: ['Connecting Place-Value Strategies to an Algorithm', '385', '158'],
    blankVisual: subtractionVisual('Use place value and the algorithm for 385 − 158', [
      { lead: 'Try It', prompt: 'Find the difference 385 − 158.', equation: '385 − 158 = 227', answer: '227', answers: [['227']] },
      { lead: 'Model It', prompt: 'Rename one ten as 10 ones before subtracting.', equation: '385 = 3 hundreds + 7 tens + 15 ones', answer: '3 hundreds, 7 tens, 15 ones', blanks: ['385 = ___ hundreds + ___ tens + ___ ones'], answers: [['3', '7', '15']] }
    ], 'blank'),
    solvedVisual: subtractionVisual('Algorithm connected to place value', [
      { lead: 'Model It', prompt: 'Regroup one ten.', equation: '385 = 3 hundreds + 7 tens + 15 ones', answer: 'The total stays 385.', model: { hundreds: 3, tens: 7, ones: 15, caption: 'One ten becomes 10 ones before subtracting.' } },
      { lead: 'Subtract', prompt: 'Subtract each place.', equation: '385 − 158 = 227', answer: '15 − 8 = 7, 7 − 5 = 2, and 3 − 1 = 2.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s4-connect-apply', unit: 1, lesson: 3, session: 4, order: 2,
    label: 'Connect It + Apply It', title: 'Read regrouping notation and apply the algorithm', printedPages: '71–72', viewerPage: 83,
    sourceMarkers: ['500', '219', 'Use this page to deepen your understanding', 'days of school', '365 days'],
    blankVisual: responseWorkspace('Connect and apply the subtraction algorithm', [
      { lead: '1a.', prompt: 'Why are 8 tens and 5 ones crossed out and replaced by 7 tens and 15 ones?', lines: [], openWorkspace: true },
      { lead: '1b.', prompt: 'Why do you not need to regroup the hundreds in 385 − 158?', lines: [], openWorkspace: true },
      { lead: '2.', prompt: 'Regroup across the zero and find 500 − 219. Explain your work.', lines: ['500 − 219 = ___'], answers: [['281']], openWorkspace: true },
      { lead: '3. Reflect', prompt: 'Describe a model that helped you understand the algorithm.', lines: [], openWorkspace: true },
      { lead: '4a.', prompt: 'Find 872 − 741.', lines: ['872 − 741 = ___'], answers: [['131']], openWorkspace: true },
      { lead: '4b.', prompt: 'Find 409 − 243.', lines: ['409 − 243 = ___'], answers: [['166']], openWorkspace: true },
      { lead: '5.', prompt: 'There are 365 days and 180 school days. Find the days with no school and check by rounding.', lines: ['365 − 180 = ___', 'estimate: ___ − ___ = ___'], answers: [['185'], ['400', '200', '200']], openWorkspace: true },
      { lead: '6.', prompt: 'Find 345 − 187.', lines: ['345 − 187 = ___'], answers: [['158']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Connect It and Apply It solutions',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'note', label: '1a–1b · read the regrouping notation', text: 'Crossing out and rewriting is shorthand for breaking apart 8 tens as 7 tens and 10 ones. After that trade, there are enough tens to subtract, so the hundreds do not need to be regrouped.' },
        ...subtractionVisual('Algorithm solutions', [
          { lead: '2.', prompt: '500 − 219', equation: '500 − 219 = 281', answer: 'Regroup 1 hundred as 10 tens, then 1 ten as 10 ones.' },
          { lead: '4a.', prompt: '872 − 741', equation: '872 − 741 = 131', answer: '131' },
          { lead: '4b.', prompt: '409 − 243', equation: '409 − 243 = 166', answer: '166' },
          { lead: '5.', prompt: '365 − 180', equation: '365 − 180 = 185', answer: 'Estimate 400 − 200 = 200; 185 is close.' },
          { lead: '6.', prompt: '345 − 187', equation: '345 − 187 = 158', answer: '158' }
        ], 'solved').sections
      ]
    }
  },
  {
    key: 'v1-u1-l3-s4-practice-1-2', unit: 1, lesson: 3, session: 4, order: 3,
    label: 'Practice 1–2', title: 'Complete two subtraction algorithms', printedPages: '73', viewerPage: 85,
    sourceMarkers: ['Practice Connecting Place-Value Strategies to an Algorithm', 'seaweed sheets', 'subtract 849 from 960'],
    blankVisual: responseWorkspace('Practice problems 1–2', [
      { lead: '1.', prompt: 'Complete the expanded-form subtraction for 960 − 849.', lines: ['960 = ___ hundreds + ___ tens + ___ ones', 'regrouped: ___ hundreds + ___ tens + ___ ones', '849 = ___ hundreds + ___ tens + ___ ones', 'difference = ___ hundred + ___ ten + ___ one'], answers: [['9', '6', '0'], ['9', '5', '10'], ['8', '4', '9'], ['1', '1', '1']] },
      { lead: '2.', prompt: 'Complete the subtraction algorithm for 649 − 366.', lines: ['649 − 366 = ___'], answers: [['283']], openWorkspace: true }
    ]),
    solvedVisual: subtractionVisual('Practice 1–2 solutions', [
      { lead: '1.', prompt: '960 − 849', equation: '960 − 849 = 111', answer: 'Regroup 1 ten as 10 ones; 10 − 9 = 1, 5 − 4 = 1, and 9 − 8 = 1.' },
      { lead: '2.', prompt: '649 − 366', equation: '649 − 366 = 283', answer: '9 − 6 = 3 ones; regroup 1 hundred so 14 − 6 = 8 tens; then 5 − 3 = 2 hundreds.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s4-practice-3-9', unit: 1, lesson: 3, session: 4, order: 4,
    label: 'Practice 3–9', title: 'Solve seven official subtraction problems', printedPages: '74', viewerPage: 86,
    sourceMarkers: ['Subtract', '657', '328', '382', '195', '153', '1,000', '595'],
    blankVisual: subtractionVisual('Practice problems 3–9', [
      { lead: '3.', prompt: 'Find 286 − 199.', equation: '286 − 199 = 87', answer: '87', answers: [['87']] },
      { lead: '4.', prompt: 'Find 800 − 512.', equation: '800 − 512 = 288', answer: '288', answers: [['288']] },
      { lead: '5.', prompt: 'Find 998 − 657.', equation: '998 − 657 = 341', answer: '341', answers: [['341']] },
      { lead: '6.', prompt: 'Find 865 − 328.', equation: '865 − 328 = 537', answer: '537', answers: [['537']] },
      { lead: '7.', prompt: 'Find 382 − 195.', equation: '382 − 195 = 187', answer: '187', answers: [['187']] },
      { lead: '8.', prompt: 'Find 280 − 153.', equation: '280 − 153 = 127', answer: '127', answers: [['127']] },
      { lead: '9.', prompt: 'Find 1,000 − 595.', equation: '1,000 − 595 = 405', answer: '405', answers: [['405']] }
    ], 'blank'),
    solvedVisual: subtractionVisual('Practice 3–9 solutions', [
      { lead: '3.', prompt: '286 − 199', equation: '286 − 199 = 87', answer: 'Subtract 200 to get 86, then add 1 back to get 87.' },
      { lead: '4.', prompt: '800 − 512', equation: '800 − 500 − 12 = 300 − 12', answer: '288' },
      { lead: '5.', prompt: '998 − 657', equation: '998 − 657 = 341', answer: 'Subtract each place without regrouping: 8 − 7 = 1, 9 − 5 = 4, and 9 − 6 = 3.' },
      { lead: '6.', prompt: '865 − 328', equation: '865 − 328 = 537', answer: 'Regroup 1 ten; 15 − 8 = 7, 5 − 2 = 3, and 8 − 3 = 5.' },
      { lead: '7.', prompt: '382 − 195', equation: '382 − 195 = 187', answer: 'Regroup twice; 12 − 5 = 7, 17 − 9 = 8, and 2 − 1 = 1.' },
      { lead: '8.', prompt: '280 − 153', equation: '280 − 153 = 127', answer: 'Regroup 1 ten; 10 − 3 = 7, 7 − 5 = 2, and 2 − 1 = 1.' },
      { lead: '9.', prompt: '1,000 − 595', equation: '1,000 − 595 = 405', answer: 'Subtract 600 to get 400, then add 5 back to get 405.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s5-example-1', unit: 1, lesson: 3, session: 5, order: 1,
    label: 'Example + Problem 1', title: 'Refine three-digit subtraction', printedPages: '75', viewerPage: 87,
    sourceMarkers: ['805', '279', '450', '131'],
    blankVisual: subtractionVisual('Example and Problem 1', [
      { lead: 'Example', prompt: 'Find the difference between 805 and 279.', equation: '805 − 279 = 526', answer: '526', answers: [['526']] },
      { lead: '1.', prompt: 'Find 450 − 131.', equation: '450 − 131 = 319', answer: '319', answers: [['319']] }
    ], 'blank'),
    solvedVisual: subtractionVisual('Example and Problem 1 solutions', [
      { lead: 'Example', prompt: '805 − 279', equation: '805 − 279 = 526', answer: 'Regroup across the zero; 15 − 9 = 6, 9 − 7 = 2, and 7 − 2 = 5.' },
      { lead: '1.', prompt: '450 − 131', equation: '450 − 131 = 319', answer: 'Regroup 1 ten; 10 − 1 = 9, 4 − 3 = 1, and 4 − 1 = 3.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s5-problems-2-3', unit: 1, lesson: 3, session: 5, order: 2,
    label: 'Problems 2–3', title: 'Subtract and analyze an addition error', printedPages: '76', viewerPage: 88,
    sourceMarkers: ['144 teams', '72 teams', '205', '110', 'Reth chose'],
    blankVisual: subtractionVisual('Problems 2–3', [
      { lead: '2.', prompt: 'There are 144 teams and 72 have performed. How many remain?', equation: '144 − 72 = 72', answer: '72 teams', answers: [['72']] },
      { lead: '3.', prompt: 'Find 205 − 110, then explain how Reth could have chosen 315.', equation: '205 − 110 = 95', answer: '95', answers: [['95']] }
    ], 'blank'),
    solvedVisual: subtractionVisual('Problems 2–3 solutions', [
      { lead: '2.', prompt: '144 − 72', equation: '144 − 72 = 72', answer: 'Regroup to subtract 2 ones and 7 tens; 72 teams still need to perform.' },
      { lead: '3.', prompt: '205 − 110', equation: '205 − 110 = 95; 205 + 110 = 315', answer: '95. Reth added 110 instead of subtracting it.' }
    ], 'solved')
  },
  {
    key: 'v1-u1-l3-s5-problems-4-5', unit: 1, lesson: 3, session: 5, order: 3,
    label: 'Problems 4–5', title: 'Match representations and solve a context', printedPages: '77', viewerPage: 89,
    sourceMarkers: ['354 − 298', 'Choose all that apply', '400 cucumbers', '155 cucumbers'],
    blankVisual: {
      title: 'Problems 4–5',
      sourceNote: supplementalVisualNote,
      sections: [
        { kind: 'card-grid', label: '4. Compare all five official representations', cards: [
          { label: 'A · base-ten block representation', sections: [{ kind: 'place-value-blocks', hundreds: 0, tens: 5, ones: 6, caption: 'Read the regrouped and crossed-out blocks, then decide whether this representation matches the difference.' }] },
          { label: 'B · base-ten block representation', sections: [{ kind: 'equations', lines: ['Compare the regrouping in this candidate model with the value 354.'] }] },
          { label: 'C · add on from 298', sections: [{ kind: 'number-line', ticks: [{ label: '290' }, { label: '298' }, { label: '300' }, { label: '350' }, { label: '354', target: true }, { label: '360' }], caption: 'Read the jumps from 298 to 354, then decide whether they represent the difference.' }] },
          { label: 'D · place-value equations', sections: [{ kind: 'equations', lines: ['2 hundreds − 2 hundreds = 0 hundreds', '15 tens − 9 tens = 6 tens', '14 ones − 8 ones = 6 ones'] }] },
          { label: 'E · vertical algorithm', sections: [{ kind: 'data-table', variant: 'place-value-chart', columns: ['Hundreds', 'Tens', 'Ones'], rows: [['2', '14', '14'], ['−2', '−9', '−8'], ['0', '5', '6']], label: 'Regrouped subtraction' }] }
        ] },
        { kind: 'source-response-workspace', label: 'Choose and solve', wide: true, columns: 2, parts: [
          { lead: '4.', prompt: 'Which representations correctly show 354 − 298?', lines: ['choose all: ___, ___, ___'], lineAnswers: [['A', 'C', 'E']], printedLineCount: 3, interactiveLines: true },
          { lead: '5.', prompt: 'A restaurant has 400 cucumbers and uses 155. Choose: 245, 255, 345, or 355.', lines: ['cucumbers left: ___'], lineAnswers: [['245']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Representations and cucumber solution', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: '4. A, C, and E represent 354 − 298 = 56', cards: [
          { label: 'A · correct ✓', sections: [{ kind: 'place-value-blocks', hundreds: 0, tens: 5, ones: 6, caption: 'The correctly regrouped blocks leave 56.' }] },
          { label: 'B · not selected', sections: [{ kind: 'equations', lines: ['The displayed block model does not preserve the value 354 while regrouping, so it cannot represent 354 − 298.'] }] },
          { label: 'C · correct ✓', sections: [{ kind: 'number-line', ticks: [{ label: '298' }, { label: '300' }, { label: '350' }, { label: '354', target: true }], caption: 'Add 2, then 50, then 4; total 56.' }] },
          { label: 'D · not selected', sections: [{ kind: 'equations', lines: ['The displayed place-value differences total 66, not 56.'] }] },
          { label: 'E · correct ✓', sections: [{ kind: 'data-table', variant: 'place-value-chart', columns: ['Hundreds', 'Tens', 'Ones'], rows: [['2', '14', '14'], ['−2', '−9', '−8'], ['0', '5', '6']], label: 'Regrouped subtraction' }] }
        ] },
        ...subtractionVisual('Problem 5', [{ lead: '5.', prompt: '400 cucumbers with 155 used', equation: '400 − 155 = 245', answer: '245 cucumbers remain.' }], 'solved').sections
      ]
    }
  },
  {
    key: 'v1-u1-l3-s5-problems-6-8', unit: 1, lesson: 3, session: 5, order: 4,
    label: 'Problems 6–8', title: 'Complete the lesson checkpoint', printedPages: '78', viewerPage: 90,
    sourceMarkers: ['907 − 199', 'Tam has 308 craft sticks', 'package of 625 craft sticks', 'uses 245 craft sticks', '379 − 284'],
    blankVisual: subtractionVisual('Problems 6–8', [
      { lead: '6.', prompt: 'Find 907 − 199.', equation: '907 − 199 = 708', answer: '708', answers: [['708']] },
      { lead: '7.', prompt: 'Find 308 + 625 − 245.', equation: '308 + 625 − 245 = 688', answer: '688', answers: [['688']] },
      { lead: '8. Math Journal', prompt: 'Explain how to find 379 − 284.', equation: '379 − 284 = 95', answer: '95', answers: [['95']] }
    ], 'blank'),
    solvedVisual: {
      title: 'Problems 6–8 solutions',
      sourceNote: supplementalVisualNote,
      sections: [
        ...subtractionVisual('Problem 6', [
          { lead: '6.', prompt: '907 − 199', equation: '907 − 199 = 708', answer: 'Subtract 200 to get 707, then add 1 back to get 708.' }
        ], 'solved').sections,
        ...additionVisual('Problem 7 · first find the new total', [
          { lead: '7. Step 1', prompt: 'Combine the craft sticks Tam has and buys.', blankLines: [], answers: [], equation: '308 + 625 = 933', answer: '933 craft sticks before the project' }
        ], 'solved').sections,
        ...subtractionVisual('Problem 7 · then subtract the sticks used', [
          { lead: '7. Step 2', prompt: 'Subtract the 245 craft sticks used.', equation: '933 − 245 = 688', answer: '688 craft sticks remain.' }
        ], 'solved').sections,
        ...subtractionVisual('Problem 8 · Math Journal', [
          { lead: '8. Math Journal', prompt: '379 − 284', equation: '379 − 284 = 95', answer: 'Regroup 1 hundred; 9 − 4 = 5, 17 − 8 = 9, and 2 − 2 = 0.' }
        ], 'solved').sections
      ]
    }
  },
  {
    key: 'v1-u2-l4-s1-model-1-3', unit: 2, lesson: 4, session: 1, order: 1,
    label: 'Model It 1–3', title: 'Connect equal groups, addition, and multiplication', printedPages: '101', viewerPage: 113,
    sourceMarkers: ['Three pairs of players are flying kites', '3 equal groups of 2 kites', 'multiplication equation'],
    blankVisual: {
      title: 'Model three groups of two kites',
      sections: [
        { kind: 'source-response-workspace', label: '1–3. Draw, add, and multiply', wide: true, columns: 1, parts: [
          { lead: '1.', prompt: 'Draw 3 separate equal groups of 2 kites.', lines: [], printedLineCount: 7, openWorkspace: true },
          { lead: '2.', prompt: 'Write an addition equation for the total number of kites.', lines: ['___ + ___ + ___ = ___'], lineAnswers: [['2', '2', '2', '6']], printedLineCount: 3, interactiveLines: true, openWorkspace: true },
          { lead: '3.', prompt: 'Complete the equal-groups sentence and multiplication equation.', lines: ['___ equal groups of ___ is ___ kites in all.', '___ × ___ = ___'], lineAnswers: [['3', '2', '6'], ['3', '2', '6']], printedLineCount: 4, interactiveLines: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Three pairs of kites', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: '1. Three equal groups', cards: [
          { label: 'Pair 1', sections: [{ kind: 'array', rows: 1, columns: 2, item: 'triangle' }] },
          { label: 'Pair 2', sections: [{ kind: 'array', rows: 1, columns: 2, item: 'triangle' }] },
          { label: 'Pair 3', sections: [{ kind: 'array', rows: 1, columns: 2, item: 'triangle' }] }
        ] },
        { kind: 'equations', label: '2–3. Read the model two ways', lines: ['2 + 2 + 2 = 6', '3 equal groups of 2 is 6 kites in all.', '3 × 2 = 6'] }
      ]
    }
  },
  {
    key: 'v1-u2-l4-s1-model-4-6', unit: 2, lesson: 4, session: 1, order: 2,
    label: 'Model It 4–6 + Reflect', title: 'Read factors and products in groups and arrays', printedPages: '102', viewerPage: 114,
    sourceMarkers: ['3 equal groups of 4 flowers', '3 X 4 = 12', 'model multiplication with an array'],
    blankVisual: {
      title: 'Model 3 × 4 with flowers and an array', sections: [
        { kind: 'card-grid', label: '4 and 6. Build the two official models', cards: [
          { label: 'Equal groups', sections: [{ kind: 'array', rows: 3, columns: 4, item: 'circle', caption: 'Circle 3 equal groups of 4 flowers.' }] },
          { label: 'Array', sections: [{ kind: 'array', rows: 3, columns: 4, item: 'square', caption: 'Label the rows, columns, and total.' }] }
        ] },
        { kind: 'source-response-workspace', label: '5–6. Name each part of the models', wide: true, columns: 1, parts: [
          { lead: '5.', prompt: 'Explain what 3 × 4 = 12 means.', lines: ['3 tells how many ___', '× means ___', '4 tells how many are ___', '12 tells how many ___'], lineAnswers: [['equal groups'], ['multiply'], ['in each group'], ['in all']], printedLineCount: 5, interactiveLines: true },
          { lead: '6.', prompt: 'Complete the array labels and equation.', lines: ['___ rows of ___ columns is ___ flowers in all.', '___ × ___ = ___'], lineAnswers: [['3', '4', '12'], ['3', '4', '12']], printedLineCount: 4, interactiveLines: true },
          { lead: 'Reflect', prompt: 'Could the way the chairs in your classroom are set up show a multiplication problem? Explain.', lines: [], printedLineCount: 5, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Factors and product shown two ways', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: '4 and 6. Equal groups and an array', cards: [
          { label: '3 equal groups of 4', sections: [{ kind: 'card-grid', cards: [
            { label: 'Group 1', sections: [{ kind: 'array', rows: 1, columns: 4, item: 'circle' }] },
            { label: 'Group 2', sections: [{ kind: 'array', rows: 1, columns: 4, item: 'circle' }] },
            { label: 'Group 3', sections: [{ kind: 'array', rows: 1, columns: 4, item: 'circle' }] }
          ] }] },
          { label: '3 rows of 4', sections: [{ kind: 'array', rows: 3, columns: 4, item: 'square', caption: '3 rows, 4 columns, and 12 flowers in all' }] }
        ] },
        { kind: 'equations', label: '5. Meaning of the equation', lines: ['3 is a factor that tells how many equal groups.', 'The × means multiply.', '4 is a factor that tells how many are in each group.', '12 is the product; it tells how many are in all.', '3 × 4 = 12'] },
        { kind: 'note', label: 'Reflect · Teacher Guide possible answer', text: 'Yes, if the chairs are set up in equal groups or equal rows, the arrangement can show multiplication.' }
      ]
    }
  },
  {
    key: 'v1-u2-l4-s1-prepare', unit: 2, lesson: 4, session: 1, order: 3,
    label: 'Prepare', title: 'Organize what multiplication means', printedPages: '103', viewerPage: 115,
    sourceMarkers: ['Prepare for Multiplication', 'what you know about multiplication', 'write a multiplication equation'],
    blankVisual: {
      title: 'Prepare for Multiplication', sections: [
        {
          kind: 'official-organizer', variant: 'four-quadrant', label: '1. Complete the official multiplication organizer · Student Worktext p. 103', displayWidth: 860, centerLabel: 'multiply',
          fields: [
            { label: 'My Definition', ariaLabel: 'My definition of multiply', answer: 'I can multiply to find the total number of items in equal-size groups.', x: 0, y: 0, width: 50, height: 50 },
            { label: 'My Illustrations', ariaLabel: 'My illustrations of multiply', answer: 'Three groups of 2: 2 + 2 + 2 = 6 and 3 × 2 = 6.', x: 50, y: 0, width: 50, height: 50 },
            { label: 'Examples', ariaLabel: 'Examples of multiply', answer: '2 × 5 = 10; 4 × 2 = 8; 5 × 3 = 15.', x: 0, y: 50, width: 50, height: 50 },
            { label: 'Non-Examples', ariaLabel: 'Non-examples of multiply', answer: 'Groups of 2, 3, and 4 are not equal; 2 + 3 + 4 = 9.', x: 50, y: 50, width: 50, height: 50 }
          ],
          caption: 'Use words, numbers, or pictures in the same four-quadrant organizer.'
        },
        { kind: 'source-response-workspace', label: '2. Write an equation for the official array', wide: true, columns: 1, parts: [
          { lead: '2.', prompt: 'The picture shows 2 rows of 6 circles. Complete the multiplication equation.', lines: ['___ × ___ = ___'], lineAnswers: [['2', '6', '12']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Prepare for Multiplication', sourceNote: supplementalVisualNote, sections: [
        {
          kind: 'official-organizer', variant: 'four-quadrant', label: '1. Teacher Guide possible answers · Student Worktext p. 103', displayWidth: 860, centerLabel: 'multiply',
          fields: [
            { label: 'My Definition', ariaLabel: 'My definition of multiply', answer: 'I can multiply to find the total number of items in equal-size groups.', x: 0, y: 0, width: 50, height: 50 },
            { label: 'My Illustrations', ariaLabel: 'My illustrations of multiply', answer: 'Three groups of 2: 2 + 2 + 2 = 6 and 3 × 2 = 6.', x: 50, y: 0, width: 50, height: 50 },
            { label: 'Examples', ariaLabel: 'Examples of multiply', answer: '2 × 5 = 10; 4 × 2 = 8; 5 × 3 = 15.', x: 0, y: 50, width: 50, height: 50 },
            { label: 'Non-Examples', ariaLabel: 'Non-examples of multiply', answer: 'Groups of 2, 3, and 4 are not equal; 2 + 3 + 4 = 9.', x: 50, y: 50, width: 50, height: 50 }
          ],
          caption: 'The organizer layout and possible answers are verified in Teacher Guide Volume 1 pp. 238–239.'
        },
        { kind: 'array', label: '2. Two rows of six circles', rows: 2, columns: 6, item: 'circle', caption: '2 rows of 6 circles is 12 circles in all; 2 × 6 = 12.' }
      ]
    }
  },
  {
    key: 'v1-u2-l4-s1-practice', unit: 2, lesson: 4, session: 1, order: 4,
    label: 'Practice 3–5', title: 'Represent four tractors with three wheels each', printedPages: '104', viewerPage: 116,
    sourceMarkers: ['Dakota visits a farm museum', '4 tractors with 3 wheels each', 'addition equation'],
    blankVisual: {
      title: 'Model the tractor wheels', sections: [
        { kind: 'source-response-workspace', label: '3–5. Draw, add, and multiply', wide: true, columns: 1, parts: [
          { lead: '3.', prompt: 'Draw 4 separate equal groups of 3 tractor wheels.', lines: [], printedLineCount: 7, openWorkspace: true },
          { lead: '4.', prompt: 'Write an addition equation for all the wheels.', lines: ['___ + ___ + ___ + ___ = ___'], lineAnswers: [['3', '3', '3', '3', '12']], printedLineCount: 3, interactiveLines: true },
          { lead: '5.', prompt: 'Complete the equal-groups sentence and multiplication equation.', lines: ['___ equal groups of ___ is ___ wheels in all.', '___ × ___ = ___'], lineAnswers: [['4', '3', '12'], ['4', '3', '12']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Tractor wheel solution', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: '3. Four tractors with three wheels each', cards: [
          { label: 'Tractor 1', sections: [{ kind: 'array', rows: 1, columns: 3, item: 'circle' }] },
          { label: 'Tractor 2', sections: [{ kind: 'array', rows: 1, columns: 3, item: 'circle' }] },
          { label: 'Tractor 3', sections: [{ kind: 'array', rows: 1, columns: 3, item: 'circle' }] },
          { label: 'Tractor 4', sections: [{ kind: 'array', rows: 1, columns: 3, item: 'circle' }] }
        ] },
        { kind: 'equations', label: '4–5. Repeated addition and multiplication', lines: ['3 + 3 + 3 + 3 = 12', '4 equal groups of 3 is 12 wheels in all.', '4 × 3 = 12'] }
      ]
    }
  },
  {
    key: 'v1-u2-l4-s2-model-1-2', unit: 2, lesson: 4, session: 2, order: 1,
    label: 'Model It 1–2', title: 'Show 4 × 5 with equal groups and an array', printedPages: '105', viewerPage: 117,
    sourceMarkers: ['expression 4 x 5', 'using equal groups', 'using an array'],
    blankVisual: {
      title: 'Compare two models of 4 × 5', sections: [
        { kind: 'source-response-workspace', label: 'Describe each model and find the product', wide: true, columns: 2, parts: [
          { lead: '1a–c.', prompt: 'Draw equal groups to show 4 × 5. Describe the drawing and write the product.', lines: ['___ groups of ___', '4 × 5 = ___'], lineAnswers: [['4', '5'], ['20']], printedLineCount: 7, interactiveLines: true, openWorkspace: true },
          { lead: '2a–c.', prompt: 'Draw an array to show 4 × 5. Describe the array and write the product.', lines: ['___ rows of ___', '4 × 5 = ___'], lineAnswers: [['4', '5'], ['20']], printedLineCount: 7, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Equal groups and arrays show the same product', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: 'Two models for 4 × 5', cards: [
          { label: '1. Equal groups', sections: [{ kind: 'card-grid', cards: [
            { label: 'Group 1', sections: [{ kind: 'array', rows: 1, columns: 5, item: 'circle' }] },
            { label: 'Group 2', sections: [{ kind: 'array', rows: 1, columns: 5, item: 'circle' }] },
            { label: 'Group 3', sections: [{ kind: 'array', rows: 1, columns: 5, item: 'circle' }] },
            { label: 'Group 4', sections: [{ kind: 'array', rows: 1, columns: 5, item: 'circle' }] }
          ] }] },
          { label: '2. Array', sections: [{ kind: 'array', rows: 4, columns: 5, item: 'square', caption: '4 rows of 5 apples' }] }
        ] },
        { kind: 'equations', label: 'The product is the same', lines: ['5 + 5 + 5 + 5 = 20', '4 × 5 = 20'] }
      ]
    }
  },
  {
    key: 'v1-u2-l4-s2-model-connect', unit: 2, lesson: 4, session: 2, order: 2,
    label: 'Model + Connect 3–6', title: 'Use square tiles and explain the shared meaning', printedPages: '106', viewerPage: 118,
    sourceMarkers: ['square tiles to model multiplication', '5 X 3 = 15', 'show and find 4 x 7'],
    blankVisual: {
      title: 'Use rectangles of square tiles', sections: [
        { kind: 'card-grid', label: '3–4. Model It with square tiles', cards: [
          { label: '3. Name the shown rectangle', sections: [{ kind: 'array', rows: 3, columns: 7, item: 'square', caption: 'Write the multiplication equation for 3 rows of 7 tiles.' }] },
          { label: '4. Draw the requested rectangle', sections: [{ kind: 'array', rows: 5, columns: 3, item: 'square', caption: 'A rectangle that shows 5 × 3 = 15.' }] }
        ] },
        { kind: 'source-response-workspace', label: '3–6. Complete and explain', wide: true, columns: 1, parts: [
          { lead: '3.', prompt: 'Write the multiplication equation shown by the first tile rectangle.', lines: ['___ × ___ = ___'], lineAnswers: [['3', '7', '21']], printedLineCount: 3, interactiveLines: true },
          { lead: '4.', prompt: 'Complete the equation for the rectangle you drew.', lines: ['___ × ___ = ___'], lineAnswers: [['5', '3', '15']], printedLineCount: 3, interactiveLines: true },
          { lead: '5.', prompt: 'How can equal groups, arrays, and square tiles all describe a multiplication problem?', lines: [], printedLineCount: 5, openWorkspace: true },
          { lead: '6.', prompt: 'Use any model to show 4 × 7. Complete the equation and explain each number.', lines: ['___ × ___ = ___'], lineAnswers: [['4', '7', '28']], printedLineCount: 5, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Square-tile models and factor meanings', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: '3–4. Square-tile rectangles', cards: [
          { label: '3. Three rows of seven', sections: [{ kind: 'array', rows: 3, columns: 7, item: 'square', caption: '3 × 7 = 21' }] },
          { label: '4. Five rows of three', sections: [{ kind: 'array', rows: 5, columns: 3, item: 'square', caption: '5 × 3 = 15' }] }
        ] },
        { kind: 'note', label: '5. Teacher Guide possible answer', text: 'Words and drawings can describe the number of equal groups and the number in each group that match the multiplication problem.' },
        { kind: 'array', label: '6. Four rows of seven stars', rows: 4, columns: 7, item: 'pattern', caption: '4 is the number of rows, 7 is the number in each row, and 28 is the total; 4 × 7 = 28.' }
      ]
    }
  },
  {
    key: 'v1-u2-l4-s2-practice-1-4', unit: 2, lesson: 4, session: 2, order: 3,
    label: 'Practice 1–4', title: 'Read three groups of four ladybugs', printedPages: '107', viewerPage: 119,
    sourceMarkers: ['Practice Using Multiplication Models', 'How many equal groups are there', 'multiplication equation that matches'],
    blankVisual: {
      title: 'Practice problems 1–4', sections: [
        { kind: 'array', label: 'Official picture structure', rows: 3, columns: 4, item: 'circle', caption: 'Three separate leaves each hold four ladybugs.' },
        { kind: 'source-response-workspace', label: 'Read the equal groups', wide: true, columns: 1, parts: [
          { lead: '1.', prompt: 'How many equal groups are there?', lines: ['___ groups'], lineAnswers: [['3']], printedLineCount: 2, interactiveLines: true },
          { lead: '2.', prompt: 'How many ladybugs are in each group?', lines: ['___ in each group'], lineAnswers: [['4']], printedLineCount: 2, interactiveLines: true },
          { lead: '3.', prompt: 'How many ladybugs are there in all?', lines: ['___ ladybugs'], lineAnswers: [['12']], printedLineCount: 2, interactiveLines: true },
          { lead: '4.', prompt: 'Write a multiplication equation that matches the picture.', lines: ['___ × ___ = ___'], lineAnswers: [['3', '4', '12']], printedLineCount: 3, interactiveLines: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Ladybug model solution', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: 'Three equal groups of four ladybugs', cards: [
          { label: 'Leaf 1', sections: [{ kind: 'array', rows: 1, columns: 4, item: 'circle' }] },
          { label: 'Leaf 2', sections: [{ kind: 'array', rows: 1, columns: 4, item: 'circle' }] },
          { label: 'Leaf 3', sections: [{ kind: 'array', rows: 1, columns: 4, item: 'circle' }] }
        ] },
        { kind: 'equations', label: 'Problems 1–4', lines: ['3 groups', '4 ladybugs in each group', '12 ladybugs in all', '3 × 4 = 12'] }
      ]
    }
  },
  {
    key: 'v1-u2-l4-s2-practice-5-9', unit: 2, lesson: 4, session: 2, order: 4,
    label: 'Practice 5–9', title: 'Complete the basketball array and compare representations', printedPages: '108', viewerPage: 120,
    sourceMarkers: ['basketball cart has 3 shelves', 'expression 3 x 5', 'represents 3 x 6', 'Alex says'],
    blankVisual: {
      title: 'Practice problems 5–9', sections: [
        { kind: 'array', label: '5–7. Basketball cart before you complete it', rows: 3, columns: 1, item: 'circle', caption: 'The official picture starts with 1 basketball on each of 3 shelves. Draw the rest to show 3 × 5.' },
        { kind: 'card-grid', label: '8. Compare all five official choices for 3 × 6', cards: [
          { label: 'A', sections: [{ kind: 'equations', lines: ['3 + 3 + 3 + 3 + 3'] }] },
          { label: 'B', sections: [{ kind: 'note', text: '3 groups of 6' }] },
          { label: 'C', sections: [{ kind: 'array', rows: 3, columns: 6, item: 'square', caption: '3 rows of 6' }] },
          { label: 'D', sections: [{ kind: 'note', text: 'One group of 3 and one group of 6' }] },
          { label: 'E', sections: [{ kind: 'note', text: 'Six outlined groups with different numbers of dots' }] }
        ] },
        { kind: 'source-response-workspace', label: 'Finish problems 5–9', wide: true, columns: 1, parts: [
          { lead: '5–7.', prompt: 'Complete the basketball array labels and equation.', lines: ['rows: ___', 'basketballs in each row: ___', 'basketballs in all: ___', '___ × ___ = ___'], lineAnswers: [['3'], ['5'], ['15'], ['3', '5', '15']], printedLineCount: 5, interactiveLines: true, openWorkspace: true },
          { lead: '8.', prompt: 'Which choices represent 3 × 6? Choose all that apply.', lines: ['correct choices: ___ and ___'], lineAnswers: [['B', 'C']], printedLineCount: 3, interactiveLines: true },
          { lead: '9.', prompt: 'Alex drew one group of 4 objects and one group of 6 objects. Does the drawing show 4 × 6? Explain.', lines: ['Yes or No: ___'], lineAnswers: [['No']], printedLineCount: 5, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Basketball array and representation solutions', sourceNote: supplementalVisualNote, sections: [
        { kind: 'array', label: 'Problems 5–7', rows: 3, columns: 5, item: 'circle', caption: '3 rows, 5 basketballs in each row, and 15 in all; 3 × 5 = 15.' },
        { kind: 'card-grid', label: '8. B and C represent 3 × 6', cards: [
          { label: 'A · not selected', sections: [{ kind: 'equations', lines: ['3 + 3 + 3 + 3 + 3 = 15', 'This is 5 groups of 3.'] }] },
          { label: 'B · correct ✓', sections: [{ kind: 'note', text: '3 groups of 6' }] },
          { label: 'C · correct ✓', sections: [{ kind: 'array', rows: 3, columns: 6, item: 'square', caption: '3 rows of 6' }] },
          { label: 'D · not selected', sections: [{ kind: 'note', text: 'One group of 3 and one group of 6 are not equal groups.' }] },
          { label: 'E · not selected', sections: [{ kind: 'note', text: 'The six outlined groups do not all contain the same number of dots.' }] }
        ] },
        { kind: 'note', label: '9. Teacher Guide possible explanation', text: 'No. Alex’s drawing shows 4 + 6. To show 4 × 6, Alex should draw 4 equal groups or rows of 6 objects.' }
      ]
    }
  },
  {
    key: 'v1-u2-l4-s3-apply-1-3', unit: 2, lesson: 4, session: 3, order: 1,
    label: 'Apply It 1–3', title: 'Diagnose unequal groups and transform an array', printedPages: '109', viewerPage: 121,
    sourceMarkers: ['Robert painted and arranged the eggs', '9 x 4 = 36', 'Fola draws the array'],
    blankVisual: {
      title: 'Apply It problems 1–3', sections: [
        { kind: 'card-grid', label: 'Read the official visual structures', cards: [
          { label: '1. Robert’s four groups', sections: [
            { kind: 'array', rows: 1, columns: 7, item: 'circle', caption: 'Group 1' },
            { kind: 'array', rows: 1, columns: 7, item: 'circle', caption: 'Group 2' },
            { kind: 'array', rows: 1, columns: 7, item: 'circle', caption: 'Group 3' },
            { kind: 'array', rows: 1, columns: 6, item: 'circle', caption: 'Group 4' }
          ] },
          { label: '3. Fola’s original array', sections: [{ kind: 'array', rows: 3, columns: 2, item: 'triangle', caption: '3 × 2 = 6' }] }
        ] },
        { kind: 'source-response-workspace', label: 'Explain, write, and analyze', wide: true, columns: 1, parts: [
          { lead: '1.', prompt: 'Robert meant to show 4 × 6. What did he do wrong?', lines: [], printedLineCount: 4, openWorkspace: true },
          { lead: '2.', prompt: 'Write a story problem that can be solved using 9 × 4 = 36.', lines: ['total: ___'], lineAnswers: [['36']], printedLineCount: 6, interactiveLines: true, openWorkspace: true },
          { lead: '3a.', prompt: 'How will the 3 × 2 array change to show 4 × 2 = 8?', lines: [], printedLineCount: 4, openWorkspace: true },
          { lead: '3b.', prompt: 'If Fola adds one triangle to each original row, what equation does the new array show?', lines: ['___ × ___ = ___'], lineAnswers: [['3', '3', '9']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Apply It solutions', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: '1. Correct Robert’s model', cards: [
          { label: 'Robert drew', sections: [{ kind: 'array', rows: 4, columns: 7, item: 'circle', caption: '4 groups of 7 eggs' }] },
          { label: 'He should draw', sections: [{ kind: 'array', rows: 4, columns: 6, item: 'circle', caption: '4 groups of 6 eggs' }] }
        ] },
        { kind: 'note', label: '1. Teacher Guide answer', text: 'Robert did not get the number of eggs in each group right. He used 7 and should have used 6.' },
        { kind: 'note', label: '2. Source-backed response target', text: 'Answers vary. A correct story describes 9 groups of 4 with a total of 36. One supplemental example: 9 flowerpots each hold 4 flowers; there are 36 flowers in all.' },
        { kind: 'card-grid', label: '3. Transform the original array in two different ways', cards: [
          { label: '3a. Add one row of 2', sections: [{ kind: 'array', rows: 4, columns: 2, item: 'triangle', caption: '4 × 2 = 8' }] },
          { label: '3b. Add one item to each original row', sections: [{ kind: 'array', rows: 3, columns: 3, item: 'triangle', caption: '3 × 3 = 9' }] }
        ] }
      ]
    }
  },
  {
    key: 'v1-u2-l4-s3-problem-4-journal', unit: 2, lesson: 4, session: 3, order: 2,
    label: 'Problem 4 + Math Journal', title: 'Model 5 × 8 and author a 3 × 4 story', printedPages: '110', viewerPage: 122,
    sourceMarkers: ['Ravi', 'cousins send him coins', '5 x 8', 'story problem for 3 X 4'],
    blankVisual: {
      title: 'Refine the meaning of multiplication', sections: [
        { kind: 'source-response-workspace', label: 'Write the official responses', wide: true, columns: 1, parts: [
          { lead: '4 Part A.', prompt: 'Draw a model for 5 × 8. Explain what each number means and find the total.', lines: ['___ × ___ = ___ coins'], lineAnswers: [['5', '8', '40']], printedLineCount: 8, interactiveLines: true, openWorkspace: true },
          { lead: '4 Part B.', prompt: 'Write a story problem about Ravi’s coins that matches your model. Tell how many coins he has in all.', lines: ['coins in all: ___'], lineAnswers: [['40']], printedLineCount: 6, interactiveLines: true, openWorkspace: true },
          { lead: 'Math Journal', prompt: 'Write and solve a story problem for 3 × 4. Explain each number.', lines: ['___ × ___ = ___'], lineAnswers: [['3', '4', '12']], printedLineCount: 7, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Refine solutions', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: '4 Part A. Teacher Guide possible models', cards: [
          { label: 'Equal groups model', sections: [{ kind: 'array', rows: 5, columns: 8, item: 'circle', caption: '5 groups with 8 coins in each group' }] },
          { label: 'Array model', sections: [{ kind: 'array', rows: 5, columns: 8, item: 'square', caption: '5 rows with 8 coins in each row' }] }
        ] },
        { kind: 'equations', label: '4 Part A. Product', lines: ['8 + 8 + 8 + 8 + 8 = 40', '5 × 8 = 40'] },
        { kind: 'note', label: '4 Part B. Teacher Guide possible answer', text: 'Ravi has 5 cousins, and each cousin gave him 8 coins. He has 40 coins in all.' },
        { kind: 'array', label: 'Math Journal · Teacher Guide possible model', rows: 3, columns: 4, item: 'dot', caption: 'Latoya has 3 cats with 4 legs each; 3 × 4 = 12 legs in all.' },
        { kind: 'note', label: 'Math Journal · factor meanings', text: 'The 3 means the number of cats, the 4 means the number of legs each cat has, and 12 is the total number of legs.' }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s1-try', unit: 2, lesson: 5, session: 1, order: 1,
    label: 'Try It', title: 'Find the legs on six crabs', printedPages: '113', viewerPage: 125,
    sourceMarkers: ['Jade sees 6 black crabs', 'Each crab has 10 legs', 'How many legs'],
    blankVisual: multiplicationVisual('Model six groups of ten legs', [{ lead: 'Try It', prompt: 'Six crabs have 10 legs each. How many legs does Jade see?', rows: 6, columns: 10, equation: '6 × 10 = 60', answer: '60 legs', item: 'dot' }], 'blank'),
    solvedVisual: {
      title: 'Six equal groups of ten', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: 'One group for each crab', cards: [
          { label: 'Crab 1 · 10 legs', sections: [{ kind: 'array', rows: 2, columns: 5, item: 'dot' }] },
          { label: 'Crab 2 · 10 legs', sections: [{ kind: 'array', rows: 2, columns: 5, item: 'dot' }] },
          { label: 'Crab 3 · 10 legs', sections: [{ kind: 'array', rows: 2, columns: 5, item: 'dot' }] },
          { label: 'Crab 4 · 10 legs', sections: [{ kind: 'array', rows: 2, columns: 5, item: 'dot' }] },
          { label: 'Crab 5 · 10 legs', sections: [{ kind: 'array', rows: 2, columns: 5, item: 'dot' }] },
          { label: 'Crab 6 · 10 legs', sections: [{ kind: 'array', rows: 2, columns: 5, item: 'dot' }] }
        ] },
        { kind: 'equations', label: 'Skip-count the six equal groups', lines: ['10, 20, 30, 40, 50, 60', '10 + 10 + 10 + 10 + 10 + 10 = 60', '6 × 10 = 60 legs'] }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s1-connect', unit: 2, lesson: 5, session: 1, order: 2,
    label: 'Connect It + Reflect', title: 'Skip-count by ten for eight and seven crabs', printedPages: '114', viewerPage: 126,
    sourceMarkers: ['Marco sees 8 black crabs', '10 legs each', 'Elisa sees 7 crabs'],
    blankVisual: responseWorkspace('Connect skip-counting and multiplication', [
      { lead: 'Look Back', prompt: 'Explain how you found the number of legs on Jade’s 6 crabs.', lines: [], openWorkspace: true },
      { lead: '1a–b.', prompt: 'Marco sees 8 crabs with 10 legs each. Complete the skip-count sequence and multiplication fact.', lines: ['10, 20, ___, ___, ___, ___, ___, ___', '___ × ___ = ___'], answers: [['30', '40', '50', '60', '70', '80'], ['8', '10', '80']], openWorkspace: true },
      { lead: 'Reflect', prompt: 'Elisa sees 7 crabs with 10 legs each. Use a method other than skip-counting.', lines: ['___ × ___ = ___'], answers: [['7', '10', '70']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Crab-leg solutions', sourceNote: supplementalVisualNote, sections: [
        { kind: 'equations', label: '1a–b. Skip-count eight tens', lines: ['10, 20, 30, 40, 50, 60, 70, 80', '8 × 10 = 80'] },
        { kind: 'array', label: 'Reflect · another method', rows: 7, columns: 10, item: 'dot', caption: 'An array with 7 rows of 10 shows 7 × 10 = 70 legs.' }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s1-prepare', unit: 2, lesson: 5, session: 1, order: 3,
    label: 'Prepare', title: 'Organize multiplication with 0, 1, 2, 5, and 10', printedPages: '115', viewerPage: 127,
    sourceMarkers: ['Prepare for Multiplying with 0, 1', 'what you know about multiplication', 'multiplication fact is shown'],
    blankVisual: {
      title: 'Prepare for multiplying with 0, 1, 2, 5, and 10', sections: [
        {
          kind: 'official-organizer', variant: 'four-quadrant', label: '1. Complete the official multiplication-fact organizer · Student Worktext p. 115', displayWidth: 860, centerLabel: 'multiplication fact',
          fields: [
            { label: 'My Definition', ariaLabel: 'My definition of a multiplication fact', answer: 'A multiplication equation.', x: 0, y: 0, width: 50, height: 50 },
            { label: 'My Illustrations', ariaLabel: 'My illustrations of multiplication facts', answer: '6 groups of 5: 6 × 5 = 30.', x: 50, y: 0, width: 50, height: 50 },
            { label: 'Examples', ariaLabel: 'Examples of multiplication facts', answer: '5 × 2 = 10; 8 × 0 = 0; 9 × 1 = 9; 2 × 10 = 20.', x: 0, y: 50, width: 50, height: 50 },
            { label: 'Non-Examples', ariaLabel: 'Non-examples of multiplication facts', answer: '6 + 5 = 11 and groups that do not all have the same number of items.', x: 50, y: 50, width: 50, height: 50 }
          ], caption: 'Use words, numbers, or pictures in the same four-quadrant organizer.'
        },
        { kind: 'source-response-workspace', label: '2. Name the official equal-groups model', wide: true, columns: 1, parts: [
          { lead: '2.', prompt: 'The picture shows 2 groups with 3 dots in each group. Write the multiplication fact.', lines: ['___ × ___ = ___'], lineAnswers: [['2', '3', '6']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: {
      title: 'Prepare for multiplying with 0, 1, 2, 5, and 10', sourceNote: supplementalVisualNote, sections: [
        {
          kind: 'official-organizer', variant: 'four-quadrant', label: '1. Teacher Guide possible answers · Student Worktext p. 115', displayWidth: 860, centerLabel: 'multiplication fact',
          fields: [
            { label: 'My Definition', ariaLabel: 'My definition of a multiplication fact', answer: 'A multiplication equation.', x: 0, y: 0, width: 50, height: 50 },
            { label: 'My Illustrations', ariaLabel: 'My illustrations of multiplication facts', answer: '6 groups of 5: 6 × 5 = 30.', x: 50, y: 0, width: 50, height: 50 },
            { label: 'Examples', ariaLabel: 'Examples of multiplication facts', answer: '5 × 2 = 10; 8 × 0 = 0; 9 × 1 = 9; 2 × 10 = 20.', x: 0, y: 50, width: 50, height: 50 },
            { label: 'Non-Examples', ariaLabel: 'Non-examples of multiplication facts', answer: '6 + 5 = 11 and groups that do not all have the same number of items.', x: 50, y: 50, width: 50, height: 50 }
          ], caption: 'The organizer layout and possible answers are verified in Teacher Guide Volume 1 pp. 254–255.'
        },
        { kind: 'array', label: '2. Two equal groups of three', rows: 2, columns: 3, item: 'dot', caption: '2 × 3 = 6' }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s1-practice', unit: 2, lesson: 5, session: 1, order: 4,
    label: 'Practice 3–4', title: 'Find the days in five weeks', printedPages: '116', viewerPage: 128,
    sourceMarkers: ['5 weeks in the summer', 'Each week has 7 days', 'How many days'],
    blankVisual: multiplicationVisual('Five weeks of seven days', [{ lead: '3–4.', prompt: 'Hugo stays for 5 weeks, with 7 days in each week. Solve and check.', rows: 5, columns: 7, equation: '5 × 7 = 35', answer: '35 days', item: 'square' }], 'blank'),
    solvedVisual: {
      title: 'Five equal groups of seven days', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: 'One group for each week', cards: [
          { label: 'Week 1', sections: [{ kind: 'array', rows: 1, columns: 7, item: 'square' }] },
          { label: 'Week 2', sections: [{ kind: 'array', rows: 1, columns: 7, item: 'square' }] },
          { label: 'Week 3', sections: [{ kind: 'array', rows: 1, columns: 7, item: 'square' }] },
          { label: 'Week 4', sections: [{ kind: 'array', rows: 1, columns: 7, item: 'square' }] },
          { label: 'Week 5', sections: [{ kind: 'array', rows: 1, columns: 7, item: 'square' }] }
        ] },
        { kind: 'equations', label: 'Solve and check', lines: ['7 + 7 + 7 + 7 + 7 = 35', '5 × 7 = 35', '5, 10, 15, 20, 25, 30, 35'] },
        { kind: 'note', label: 'Answer', text: 'Hugo is at his mom’s house for 35 days.' }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s2-try-model', unit: 2, lesson: 5, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Count robot antennas and buttons', printedPages: '117–118', viewerPage: 129,
    sourceMarkers: ['toy robot that has 2 antennas', '5 buttons', 'needed for 6 robots'],
    blankVisual: multiplicationVisual('Model the six robots', [
      { lead: 'Antennas', prompt: 'Six robots have 2 antennas each.', rows: 6, columns: 2, equation: '6 × 2 = 12', answer: '12 antennas', item: 'dot' },
      { lead: 'Buttons', prompt: 'Six robots have 5 buttons each.', rows: 6, columns: 5, equation: '6 × 5 = 30', answer: '30 buttons', item: 'circle' }
    ], 'blank'),
    solvedVisual: multiplicationVisual('Robot parts by equal groups and arrays', [
      { lead: 'Antennas', prompt: 'Skip-count by twos.', rows: 6, columns: 2, equation: '2, 4, 6, 8, 10, 12; 6 × 2 = 12', answer: '12 antennas', item: 'dot' },
      { lead: 'Buttons', prompt: 'Skip-count by fives.', rows: 6, columns: 5, equation: '5, 10, 15, 20, 25, 30; 6 × 5 = 30', answer: '30 buttons', item: 'circle' }
    ], 'solved')
  },
  {
    key: 'v1-u2-l5-s2-connect', unit: 2, lesson: 5, session: 2, order: 2,
    label: 'Connect It', title: 'Relate arrays, factor order, and doubles', printedPages: '119', viewerPage: 131,
    sourceMarkers: ['multiplication equations', 'turn it', 'doubles fact'],
    blankVisual: responseWorkspace('Connect arrays and facts', [
      { lead: '1a.', prompt: 'Write the two facts for robot antennas and buttons.', lines: ['___ × ___ = ___', '___ × ___ = ___'], answers: [['6', '2', '12'], ['6', '5', '30']] },
      { lead: '1b–c.', prompt: 'Turn the 6-by-2 array. Write both equations and explain why the product stays the same.', lines: ['6 × 2 = ___', '2 × 6 = ___'], answers: [['12'], ['12']], openWorkspace: true },
      { lead: '2.', prompt: 'Explain why multiplying by 2 uses a doubles fact.', lines: [], openWorkspace: true },
      { lead: 'Reflect', prompt: 'Describe how one model or strategy helped you understand multiplying with 2 and 5.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: multiplicationVisual('Turn the antenna array', [
      { lead: 'Original', prompt: 'Six rows of two', rows: 6, columns: 2, equation: '6 × 2 = 12', answer: '12 antennas' },
      { lead: 'Turned', prompt: 'Two rows of six', rows: 2, columns: 6, equation: '2 × 6 = 12', answer: 'The product is unchanged because the same 12 objects are rearranged.' }
    ], 'solved')
  },
  {
    key: 'v1-u2-l5-s2-apply', unit: 2, lesson: 5, session: 2, order: 3,
    label: 'Apply It 4–6', title: 'Compare 5 × 10 and 10 × 5 and solve 8 × 5', printedPages: '120', viewerPage: 132,
    sourceMarkers: ['5 groups of 10', '10 groups of 5', 'airport bus', 'Each row has'],
    blankVisual: multiplicationVisual('Apply 5s and 10s facts', [
      { lead: '4.', prompt: 'How much is 5 groups of 10?', rows: 5, columns: 10, equation: '5 × 10 = 50', answer: '50' },
      { lead: '5.', prompt: 'How much is 10 groups of 5?', rows: 10, columns: 5, equation: '10 × 5 = 50', answer: '50' },
      { lead: '6.', prompt: 'An airport bus has 8 rows of 5 travelers.', rows: 8, columns: 5, equation: '8 × 5 = 40', answer: '40 travelers' }
    ], 'blank'),
    solvedVisual: multiplicationVisual('Apply It solutions', [
      { lead: '4.', prompt: 'Five rows of ten', rows: 5, columns: 10, equation: '5 × 10 = 50', answer: '50' },
      { lead: '5.', prompt: 'Ten rows of five', rows: 10, columns: 5, equation: '10 × 5 = 50', answer: '50' },
      { lead: '6.', prompt: 'Eight rows of five', rows: 8, columns: 5, equation: '8 × 5 = 40', answer: '40 travelers' }
    ], 'solved')
  },
  {
    key: 'v1-u2-l5-s2-practice-1-2', unit: 2, lesson: 5, session: 2, order: 4,
    label: 'Practice 1–2', title: 'Group stars by two and multiply plates by ten', printedPages: '121', viewerPage: 133,
    sourceMarkers: ['Study the Example showing how to multiply with 5', 'equal groups of 2', 'plates of tortillas'],
    blankVisual: responseWorkspace('Practice problems 1–2', [
      { lead: '1.', prompt: 'Twelve stars are grouped by 2. Complete the fact.', lines: ['___ groups of 2 is ___', '___ × 2 = ___'], answers: [['6', '12'], ['6', '12']] },
      { lead: '2.', prompt: 'Complete the facts for 8, 9, and 10 plates with 10 tortillas each.', lines: ['8 × 10 = ___', '9 × 10 = ___', '10 × 10 = ___'], answers: [['80'], ['90'], ['100']] }
    ]),
    solvedVisual: multiplicationVisual('Stars and tortilla facts', [
      { lead: '1.', prompt: 'Six groups of two stars', rows: 6, columns: 2, equation: '6 × 2 = 12', answer: '12 stars', item: 'pattern' },
      { lead: '2a.', prompt: 'Eight plates', rows: 8, columns: 10, equation: '8 × 10 = 80', answer: '80 tortillas' },
      { lead: '2b.', prompt: 'Nine plates', rows: 9, columns: 10, equation: '9 × 10 = 90', answer: '90 tortillas' },
      { lead: '2c.', prompt: 'Ten plates', rows: 10, columns: 10, equation: '10 × 10 = 100', answer: '100 tortillas' }
    ], 'solved')
  },
  {
    key: 'v1-u2-l5-s2-practice-3-5', unit: 2, lesson: 5, session: 2, order: 5,
    label: 'Practice 3–5', title: 'Read starfruit arrays and complete 2s and 5s tables', printedPages: '122', viewerPage: 134,
    sourceMarkers: ['starfruit', 'multiplication fact for each array', 'facts for 2', 'facts for 5'],
    blankVisual: responseWorkspace('Practice problems 3–5', [
      { lead: '3.', prompt: 'Write the facts for the two official starfruit arrays.', lines: ['a. ___ × ___ = ___', 'b. ___ × ___ = ___'], answers: [['2', '10', '20'], ['4', '5', '20']] },
      { lead: '4.', prompt: 'Complete 0×2 through 10×2.', lines: ['0, 2, 4, 6, 8, 10, ___, ___, ___, ___, ___'], answers: [['12', '14', '16', '18', '20']] },
      { lead: '5.', prompt: 'Complete 0×5 through 10×5.', lines: ['0, 5, 10, 15, 20, 25, ___, ___, ___, ___, ___'], answers: [['30', '35', '40', '45', '50']] }
    ]),
    solvedVisual: {
      title: 'Starfruit arrays and fact patterns', sourceNote: supplementalVisualNote, sections: [
        { kind: 'array', label: '3a.', rows: 2, columns: 10, item: 'pattern', caption: '2 × 10 = 20.' },
        { kind: 'array', label: '3b.', rows: 4, columns: 5, item: 'pattern', caption: '4 × 5 = 20.' },
        { kind: 'equations', label: '2s facts', lines: ['0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20'] },
        { kind: 'equations', label: '5s facts', lines: ['0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50'] }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s3-try-model', unit: 2, lesson: 5, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Compare multiplying six by one and zero', printedPages: '123–124', viewerPage: 135,
    sourceMarkers: ['Meena says 6 X 1 = 6', 'Rene says 6 X 0 = 6', '6 groups with 1', '6 groups with 0'],
    blankVisual: responseWorkspace('Who is right?', [
      { lead: 'Try It', prompt: 'Compare 6 × 1 and 6 × 0. Who is right?', lines: ['6 × 1 = ___', '6 × 0 = ___'], answers: [['6'], ['0']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'One item per group versus empty groups', sourceNote: supplementalVisualNote, sections: [
        { kind: 'card-grid', label: 'Compare the same six groups', cards: [
          { label: '6 × 1 · one in every group', sections: [{ kind: 'array', rows: 6, columns: 1, item: 'dot', caption: 'Six groups with one in each group total 6.' }] },
          { label: '6 × 0 · every group is empty', sections: [{ kind: 'equations', lines: ['Group 1: 0', 'Group 2: 0', 'Group 3: 0', 'Group 4: 0', 'Group 5: 0', 'Group 6: 0'] }] }
        ] },
        { kind: 'equations', label: 'Read the models', lines: ['6 × 1 = 6', '6 × 0 = 0'] },
        { kind: 'note', label: 'Who is right?', text: 'Meena is right. Rene’s stated product of 6 is not correct because six empty groups contain 0 objects.' }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s3-connect-apply', unit: 2, lesson: 5, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'State the ×1 and ×0 rules and apply them', printedPages: '125–126', viewerPage: 137,
    sourceMarkers: ['7 x 1', '7 X 0', 'product of any number multiplied by 1', 'product of 0', 'model to show 4 x 0'],
    blankVisual: responseWorkspace('Connect and apply the ×1 and ×0 patterns', [
      { lead: '1. Talk About It', prompt: 'Complete and explain the patterns.', lines: ['7 × 1 = ___', '7 × 0 = ___'], answers: [['7'], ['0']], openWorkspace: true },
      { lead: '2. Show What You Know', prompt: 'State what is true about multiplying any number by 1 and by 0.', lines: [], openWorkspace: true },
      { lead: '3. Reflect', prompt: 'Describe how one model or strategy helped you understand multiplying with 1 and 0.', lines: [], openWorkspace: true },
      { lead: '4.', prompt: 'Complete each fact.', lines: ['5 × 0 = ___', '___ × 1 = 5', '3 × ___ = 0', '3 × 1 = ___'], answers: [['0'], ['5'], ['0'], ['3']] },
      { lead: '5.', prompt: 'Which choices have product 0?', lines: ['Correct choices: ___, ___, ___'], answers: [['A', 'B', 'E']] },
      { lead: '6.', prompt: 'Draw a model for 4 × 0.', lines: ['4 × 0 = ___'], answers: [['0']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Multiply by one and zero', sourceNote: supplementalVisualNote, sections: [
        { kind: 'array', label: 'Multiply by 1', rows: 7, columns: 1, item: 'dot', caption: '7 × 1 = 7.' },
        { kind: 'note', label: 'Multiply by 0', text: 'Every choice containing a factor of 0 has product 0: A, B, and E. Four empty groups also give 4 × 0 = 0.' },
        { kind: 'equations', label: 'Completed facts', lines: ['5 × 0 = 0', '5 × 1 = 5', '3 × 0 = 0', '3 × 1 = 3'] }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s3-practice-1', unit: 2, lesson: 5, session: 3, order: 3,
    label: 'Practice 1', title: 'Compare 7 × 1 and 1 × 7', printedPages: '127', viewerPage: 139,
    sourceMarkers: ['Study the Example showing how to multiply with 1', '7 x 1 and 1 x 7', 'How are they different'],
    blankVisual: multiplicationVisual('Compare turned arrays', [
      { lead: '7 × 1', prompt: 'Seven groups of one', rows: 7, columns: 1, equation: '7 × 1 = 7', answer: '7' },
      { lead: '1 × 7', prompt: 'One group of seven', rows: 1, columns: 7, equation: '1 × 7 = 7', answer: '7' }
    ], 'blank'),
    solvedVisual: multiplicationVisual('Same product, different grouping', [
      { lead: '7 × 1', prompt: 'Seven groups of one', rows: 7, columns: 1, equation: '7 × 1 = 7', answer: '7 objects' },
      { lead: '1 × 7', prompt: 'One group of seven', rows: 1, columns: 7, equation: '1 × 7 = 7', answer: 'Both total 7, but the numbers of groups and objects per group are exchanged.' }
    ], 'solved')
  },
  {
    key: 'v1-u2-l5-s3-practice-2-4', unit: 2, lesson: 5, session: 3, order: 4,
    label: 'Practice 2–4', title: 'Apply the zero and one properties', printedPages: '128', viewerPage: 140,
    sourceMarkers: ['school supplies', 'multiplication fact correct', 'Kelvin starts'],
    blankVisual: responseWorkspace('Practice problems 2–4', [
      { lead: '2.', prompt: 'Write a fact for each number of boxes.', lines: ['0 × 8 = ___', '1 × 10 = ___', '1 × 5 = ___', '0 × 6 = ___'], answers: [['0'], ['10'], ['5'], ['0']] },
      { lead: '3.', prompt: 'Mark the four official claims true or false.', lines: ['Claim A: one times zero gives one — ___', 'Claim B: nine times one gives zero — ___', 'Claim C: zero times five gives zero — ___', 'Claim D: six times zero gives six — ___'], answers: [['false'], ['false'], ['true'], ['false']] },
      { lead: '4.', prompt: 'Correct Kelvin’s 1s facts.', lines: ['1×1=___', '2×1=___', '3×1=___'], answers: [['1'], ['2'], ['3']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Zero and one property solutions', sourceNote: supplementalVisualNote, sections: [
        { kind: 'equations', label: 'School supplies', lines: ['0 × 8 = 0', '1 × 10 = 10', '1 × 5 = 5', '0 × 6 = 0'] },
        { kind: 'equations', label: 'True or false', lines: ['Claim A: false', 'Claim B: false', 'Claim C: true', 'Claim D: false'] },
        { kind: 'note', label: 'Kelvin’s correction', text: 'Multiplying by 1 keeps the other factor unchanged: 1 × 1 = 1, 2 × 1 = 2, and 3 × 1 = 3.' }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s4-example-1', unit: 2, lesson: 5, session: 4, order: 1,
    label: 'Example + Problem 1', title: 'Turn 2 × 5 and extend the 2s pattern', printedPages: '129', viewerPage: 141,
    sourceMarkers: ['Jamal says 2 x 5', '5 x 2', 'Find 7 x 2', '8 x 2', '9 x 2'],
    blankVisual: responseWorkspace('Example and Problem 1', [
      { lead: 'Example', prompt: 'Compare 2 × 5 and 5 × 2.', lines: ['2 × 5 = ___', '5 × 2 = ___'], answers: [['10'], ['10']], openWorkspace: true },
      { lead: '1.', prompt: 'Find three consecutive 2s facts and explain the pattern.', lines: ['7 × 2 = ___', '8 × 2 = ___', '9 × 2 = ___'], answers: [['14'], ['16'], ['18']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Turned arrays and the 2s pattern', sourceNote: supplementalVisualNote, sections: [
        { kind: 'array', label: '2 × 5', rows: 2, columns: 5, item: 'dot', caption: '2 × 5 = 10.' },
        { kind: 'array', label: '5 × 2', rows: 5, columns: 2, item: 'dot', caption: '5 × 2 = 10.' },
        { kind: 'equations', label: 'Add 2 each time', lines: ['7 × 2 = 14', '8 × 2 = 16', '9 × 2 = 18'] }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s4-problems-2-3', unit: 2, lesson: 5, session: 4, order: 2,
    label: 'Problems 2–3', title: 'Use ×0, ×1, and ×10 in a fruit context', printedPages: '130', viewerPage: 142,
    sourceMarkers: ['1 bag with 7 apricots', '8 bags with 0 plums', '3 bags', 'Which of the following equals 10'],
    blankVisual: responseWorkspace('Problems 2–3', [
      { lead: '2.', prompt: 'Find the apricots, plums, and peaches.', lines: ['1 × 7 = ___', '8 × 0 = ___', '3 × 10 = ___'], answers: [['7'], ['0'], ['30']] },
      { lead: '3.', prompt: 'Which choice equals 10, and why is 10 × 0 not 10?', lines: ['Correct choice: ___', '10 × 0 = ___'], answers: [['A'], ['0']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Fruit and factor-property solutions', sourceNote: supplementalVisualNote, sections: [
        { kind: 'equations', label: 'Problem 2', lines: ['1 × 7 = 7 apricots', '8 × 0 = 0 plums', '3 × 10 = 30 peaches'] },
        { kind: 'note', label: 'Problem 3', text: 'Choice A is correct because 2 × 5 = 10. Nasha’s choice C treats multiplying by 0 incorrectly; 10 × 0 = 0.' }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s4-problems-4-6', unit: 2, lesson: 5, session: 4, order: 3,
    label: 'Problems 4–6', title: 'Complete the ×1 and ×10 facts and classify statements', printedPages: '131', viewerPage: 143,
    sourceMarkers: ['Which factor will correctly complete', 'facts for 10', 'True or False'],
    blankVisual: responseWorkspace('Problems 4–6', [
      { lead: '4.', prompt: 'Choose the factor that makes 1×?=1 through 4×?=4.', lines: ['factor = ___'], answers: [['1']] },
      { lead: '5.', prompt: 'Complete the products for 0×10 through 10×10.', lines: ['0, 10, 20, 30, 40, 50, ___, ___, ___, ___, ___'], answers: [['60', '70', '80', '90', '100']] },
      { lead: '6.', prompt: 'Classify the six official claims in order.', lines: ['7×2 gives 14 ___', '10×0 gives 10 ___', '1×10 gives 10 ___', '5×0 gives 5 ___', '2×1 gives 2 ___', '3×10 gives 30 ___'], answers: [['true'], ['false'], ['true'], ['false'], ['true'], ['true']] }
    ]),
    solvedVisual: {
      title: 'Fact pattern solutions', sourceNote: supplementalVisualNote, sections: [
        { kind: 'equations', label: 'Problem 4', lines: ['The missing factor is 1.'] },
        { kind: 'equations', label: 'Problem 5 · ×10 products', lines: ['0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100'] },
        { kind: 'equations', label: 'Problem 6', lines: ['true, false, true, false, true, true'] }
      ]
    }
  },
  {
    key: 'v1-u2-l5-s4-problems-7-9', unit: 2, lesson: 5, session: 4, order: 4,
    label: 'Problems 7–9', title: 'Solve final 5s, 2s, and paired-object contexts', printedPages: '132', viewerPage: 144,
    sourceMarkers: ['5 different friends', '10 school days', '4 packs of shirts', '8 pairs of slippers'],
    blankVisual: responseWorkspace('Problems 7–9', [
      { lead: '7.', prompt: 'Five friends sign each day for 10 days. Who is correct and how many signatures?', lines: ['10 × 5 = ___', '5 × 10 = ___'], answers: [['50'], ['50']], openWorkspace: true },
      { lead: '8.', prompt: 'Compare 4 packs of 2 shirts with 2 packs of 3 hats.', lines: ['shirts: ___ × ___ = ___', 'hats: ___ × ___ = ___'], answers: [['4', '2', '8'], ['2', '3', '6']], openWorkspace: true },
      { lead: '9. Math Journal', prompt: 'Eight pairs have 2 slippers each.', lines: ['8 × 2 = ___'], answers: [['16']], openWorkspace: true }
    ]),
    solvedVisual: {
      title: 'Final lesson solutions', sourceNote: supplementalVisualNote, sections: [
        { kind: 'array', label: 'Problem 7', rows: 10, columns: 5, item: 'dot', caption: 'Both Noa and Drina are correct. The facts 10 × 5 and 5 × 10 both have product 50.' },
        { kind: 'array', label: 'Problem 8 · shirts', rows: 4, columns: 2, item: 'square', caption: '4 × 2 = 8 shirts; 2 × 3 = 6 hats, so there are more shirts.' },
        { kind: 'array', label: 'Math Journal', rows: 8, columns: 2, item: 'dot', caption: '8 × 2 = 16 slippers.' }
      ]
    }
  },
  {
    key: 'v1-u2-l6-s1-try-connect', unit: 2, lesson: 6, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Break apart 6 × 3 pupusas', printedPages: '135–136', viewerPage: 147,
    sourceMarkers: ['3 pupusas with a meal', '6 meals', '6 X 3', 'break apart'],
    blankVisual: responseWorkspace('Find six groups of three', [
      { lead: 'Try It', prompt: 'Six meals have 3 pupusas each.', lines: ['6 × 3 = ___'], answers: [['18']], openWorkspace: true },
      { lead: 'Connect It', prompt: 'Break the array into known ×1 and ×2 facts.', lines: ['6 × 1 = ___', '6 × 2 = ___', '___ + ___ = ___'], answers: [['6'], ['12'], ['6', '12', '18']] }
    ]),
    solvedVisual: {
      title: 'Break apart the factor 3', sourceNote: supplementalVisualNote, sections: [
        { kind: 'array', label: '6 × 3', rows: 6, columns: 3, item: 'circle', splitAfterColumns: 1, caption: '(6 × 1) + (6 × 2) = 6 + 12 = 18.' },
        { kind: 'note', label: 'Answer', text: 'Melosa’s family has 18 pupusas.' }
      ]
    }
  },
  {
    key: 'v1-u2-l6-s1-prepare', unit: 2, lesson: 6, session: 1, order: 2,
    label: 'Prepare', title: 'Explain a broken-apart 3 × 4 array', printedPages: '137', viewerPage: 149,
    sourceMarkers: ['Prepare for Multiplying with 3, 4, and 6', 'Ramona makes an array', '3 x 4'],
    blankVisual: {
      title: 'Prepare for Multiplying with 3, 4, and 6', sections: [
        { kind: 'official-organizer', variant: 'four-quadrant', label: '1. Complete the official array organizer · Student Worktext p. 137', displayWidth: 860, centerLabel: 'array', fields: [
          { label: 'My Definition', ariaLabel: 'My definition of an array', answer: 'A group of objects arranged in equal rows and equal columns.', x: 0, y: 0, width: 50, height: 50 },
          { label: 'My Illustrations', ariaLabel: 'My illustrations of arrays', answer: '5 equal rows of 3 objects: 5 × 3 = 15.', x: 50, y: 0, width: 50, height: 50 },
          { label: 'Examples', ariaLabel: 'Examples of arrays', answer: 'Objects arranged in rectangular rows and columns with the same number in every row.', x: 0, y: 50, width: 50, height: 50 },
          { label: 'Non-Examples', ariaLabel: 'Non-examples of arrays', answer: 'Unequal groups or scattered objects that do not form equal rows and columns.', x: 50, y: 50, width: 50, height: 50 }
        ], caption: 'Use words, numbers, or pictures in the same four-quadrant organizer.' },
        { kind: 'source-response-workspace', label: '2. Explain Ramona’s break-apart array', wide: true, columns: 1, parts: [
          { lead: '2.', prompt: 'Ramona split 3 × 4 into two smaller arrays. Complete the partial facts and total.', lines: ['3 × 2 = ___', '3 × 2 = ___', '___ + ___ = ___'], lineAnswers: [['6'], ['6'], ['6', '6', '12']], printedLineCount: 5, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: { title: 'Prepare for Multiplying with 3, 4, and 6', sourceNote: supplementalVisualNote, sections: [
      { kind: 'official-organizer', variant: 'four-quadrant', label: '1. Teacher Guide possible answers · Student Worktext p. 137', displayWidth: 860, centerLabel: 'array', fields: [
        { label: 'My Definition', ariaLabel: 'My definition of an array', answer: 'A group of objects arranged in equal rows and equal columns.', x: 0, y: 0, width: 50, height: 50 },
        { label: 'My Illustrations', ariaLabel: 'My illustrations of arrays', answer: '5 equal rows of 3 objects: 5 × 3 = 15.', x: 50, y: 0, width: 50, height: 50 },
        { label: 'Examples', ariaLabel: 'Examples of arrays', answer: 'Objects arranged in rectangular rows and columns with the same number in every row.', x: 0, y: 50, width: 50, height: 50 },
        { label: 'Non-Examples', ariaLabel: 'Non-examples of arrays', answer: 'Unequal groups or scattered objects that do not form equal rows and columns.', x: 50, y: 50, width: 50, height: 50 }
      ], caption: 'The organizer layout and possible answers are verified in Teacher Guide Volume 1 pp. 280–281.' },
      { kind: 'array', label: '2. Ramona’s 3 × 4 array', rows: 3, columns: 4, item: 'square', splitAfterColumns: 2, caption: '(3 × 2) + (3 × 2) = 6 + 6 = 12.' }
    ] }
  },
  {
    key: 'v1-u2-l6-s1-practice', unit: 2, lesson: 6, session: 1, order: 3,
    label: 'Practice 3–4', title: 'Count four pods with six beans each', printedPages: '138', viewerPage: 150,
    sourceMarkers: ['4 butter bean pods', '6 beans', 'How many butter beans'],
    blankVisual: multiplicationVisual('Butter bean model', [{ lead: '3–4.', prompt: 'Four pods have 6 beans each. Solve and check.', rows: 4, columns: 6, equation: '4 × 6 = 24', answer: '24 beans', item: 'circle' }], 'blank'),
    solvedVisual: {
      title: 'Butter bean solution', sourceNote: supplementalVisualNote, sections: [
        { kind: 'array', label: '4 × 6', rows: 4, columns: 6, item: 'circle', splitAfterColumns: 1, caption: 'Break 6 into 1 and 5.' },
        { kind: 'equations', label: 'Multiply, add, and check', lines: ['(4 × 1) + (4 × 5) = 4 + 20 = 24', '4 × 6 = 24 beans'] }
      ]
    }
  },
  {
    key: 'v1-u2-l6-s2-try-model', unit: 2, lesson: 6, session: 2, order: 1,
    label: 'Try It + Picture It + Model It', title: 'Find holes on a 4-by-3 konane board', printedPages: '139–140', viewerPage: 151,
    sourceMarkers: ['konane game board', '4 rows', '3 holes', 'break the array'],
    blankVisual: multiplicationVisual('Model four rows of three', [{ lead: 'Try It', prompt: 'A konane board has 4 rows with 3 holes in each row.', rows: 4, columns: 3, equation: '4 × 3 = 12', answer: '12 holes', item: 'circle' }], 'blank'),
    solvedVisual: { title: 'Break 3 into 1 and 2', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Konane board', rows: 4, columns: 3, item: 'circle', splitAfterColumns: 1, caption: 'Split 3 columns into 1 column and 2 columns.' },
      { kind: 'equations', label: 'Add the smaller products', lines: ['(4 × 1) + (4 × 2) = 4 + 8 = 12', '4 × 3 = 12 holes'] }
    ] }
  },
  {
    key: 'v1-u2-l6-s2-connect-apply', unit: 2, lesson: 6, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Explain ×3 decomposition and apply it', printedPages: '141–142', viewerPage: 153,
    sourceMarkers: ['8 x 3', 'equal 24', 'Linda has a party', '9 tables with 3 chairs', 'expressions can be used'],
    blankVisual: responseWorkspace('Connect and apply multiplying by 3', [
      { lead: 'Connect It', prompt: 'Explain why (8×1)+(8×2) equals 8×3.', lines: ['8 × 1 = ___', '8 × 2 = ___', 'sum = ___'], answers: [['8'], ['16'], ['24']], openWorkspace: true },
      { lead: '4.', prompt: 'Find 5 × 3 by breaking apart 3.', lines: ['(5×1)+(5×2)=___+___=___'], answers: [['5', '10', '15']] },
      { lead: '5.', prompt: 'Nine tables have 3 chairs each.', lines: ['9 × 3 = ___'], answers: [['27']] },
      { lead: '6.', prompt: 'Choose the expressions that find 8 × 3.', lines: ['Correct choices: ___, ___, ___'], answers: [['B', 'C', 'E']] }
    ]),
    solvedVisual: { title: '×3 break-apart solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '8 × 3', rows: 8, columns: 3, item: 'dot', splitAfterColumns: 1, caption: '(8×1)+(8×2)=8+16=24.' },
      { kind: 'equations', label: 'Apply It', lines: ['5×3=15', '9×3=27', 'Problem 6: B, C, and E'] }
    ] }
  },
  {
    key: 'v1-u2-l6-s2-practice-1-4', unit: 2, lesson: 6, session: 2, order: 3,
    label: 'Practice 1–4', title: 'Break a 5-by-3 array into known facts', printedPages: '143', viewerPage: 155,
    sourceMarkers: ['Practice Multiplying with 3', '5 X 3', 'rows and', 'columns'],
    blankVisual: responseWorkspace('Practice problems 1–4', [{ lead: '1–4.', prompt: 'Name the 5-by-3 array, split the columns, and add the partial products.', lines: ['rows: ___; columns: ___', '5×1=___', '5×2=___', '5×3=___'], answers: [['5', '3'], ['5'], ['10'], ['15']], openWorkspace: true }]),
    solvedVisual: { title: 'Five rows and three columns', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '5 × 3', rows: 5, columns: 3, item: 'dot', splitAfterColumns: 1, caption: 'Split 3 columns into 1 column and 2 columns.' },
      { kind: 'equations', label: 'Add the partial products', lines: ['5 × 1 = 5', '5 × 2 = 10', '5 + 10 = 15', '5 × 3 = 15'] }
    ] }
  },
  {
    key: 'v1-u2-l6-s2-practice-5-6', unit: 2, lesson: 6, session: 2, order: 4,
    label: 'Practice 5–6', title: 'Match ×3 decompositions and solve a bird-feeder context', printedPages: '144', viewerPage: 156,
    sourceMarkers: ['pair of multiplication equations', '4 trees', '3 bird feeders'],
    blankVisual: responseWorkspace('Practice problems 5–6', [
      { lead: '5.', prompt: 'Match each ×3 fact to its ×2 and ×1 partial facts.', lines: ['5×3=___; 5×2=___; 5×1=___', '(6×1)+(6×2)=___; 6×1=___; 6×2=___', '7×3=___; 7×2=___; 7×1=___', '(8×2)+(8×1)=___; 8×2=___; 8×1=___', '9×3=___; 9×1=___; 9×2=___'], answers: [['15', '10', '5'], ['18', '6', '12'], ['21', '14', '7'], ['24', '16', '8'], ['27', '9', '18']] },
      { lead: '6.', prompt: 'Four trees have 3 feeders each.', lines: ['4 × 3 = ___'], answers: [['12']], openWorkspace: true }
    ]),
    solvedVisual: { title: '×3 fact matches and bird-feeder solution', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Problem 5 · match each ×3 fact', lines: ['5×3=15 ↔ 5×2=10 and 5×1=5', '(6×1)+(6×2)=18 ↔ 6×1=6 and 6×2=12', '7×3=21 ↔ 7×2=14 and 7×1=7', '(8×2)+(8×1)=24 ↔ 8×2=16 and 8×1=8', '9×3=27 ↔ 9×1=9 and 9×2=18'] },
      { kind: 'array', label: 'Problem 6 · 4 trees with 3 feeders each', rows: 4, columns: 3, item: 'dot', splitAfterColumns: 2, caption: '(4×2)+(4×1)=8+4=12 bird feeders.' }
    ] }
  },
  {
    key: 'v1-u2-l6-s3-try-model', unit: 2, lesson: 6, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Turn and break apart a 5-by-4 quilt array', printedPages: '145–146', viewerPage: 157,
    sourceMarkers: ['Jenna is making a quilt', '5 rows', '4 squares'],
    blankVisual: multiplicationVisual('Quilt squares', [{ lead: 'Try It', prompt: 'Five rows have 4 squares each.', rows: 5, columns: 4, equation: '5 × 4 = 20', answer: '20 squares', item: 'square' }], 'blank'),
    solvedVisual: { title: 'Turn and decompose the quilt array', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '5 × 4', rows: 5, columns: 4, item: 'square', splitAfterColumns: 2, caption: '(5×2)+(5×2)=10+10=20.' },
      { kind: 'array', label: 'Turned array', rows: 4, columns: 5, item: 'square', caption: '4×5=20.' }
    ] }
  },
  {
    key: 'v1-u2-l6-s3-connect-apply', unit: 2, lesson: 6, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'Compare ×4 decompositions and solve official applications', printedPages: '147–148', viewerPage: 159,
    sourceMarkers: ['5 X 4', '7 X 2', 'equal 28', '3 x 4', '9 x 4', '8 x 4'],
    blankVisual: responseWorkspace('Connect and apply multiplying by 4', [
      { lead: 'Connect It', prompt: 'Show two ways to find 7×4.', lines: ['(7×2)+(7×2)=___+___=___', '(7×3)+(7×1)=___+___=___'], answers: [['14', '14', '28'], ['21', '7', '28']] },
      { lead: '4.', prompt: 'Find 3×4 by breaking apart and by turning the array.', lines: ['3 × 4 = ___'], answers: [['12']], openWorkspace: true },
      { lead: '5.', prompt: 'Break 9×4 into two ×2 facts.', lines: ['(9×2)+(9×2)=___+___=___'], answers: [['18', '18', '36']] },
      { lead: '6.', prompt: 'Choose the expressions that find 8×4.', lines: ['Correct choices: ___, ___, ___'], answers: [['A', 'B', 'D']] }
    ]),
    solvedVisual: { title: '×4 decomposition solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '7 × 4', rows: 7, columns: 4, item: 'dot', splitAfterColumns: 2, caption: '14+14=28; another split is 21+7=28.' },
      { kind: 'equations', label: 'Apply It', lines: ['3×4=12', '9×4=36', 'Problem 6: A, B, and D'] }
    ] }
  },
  {
    key: 'v1-u2-l6-s3-practice-1-2', unit: 2, lesson: 6, session: 3, order: 3,
    label: 'Practice 1–2', title: 'Find three groups of four', printedPages: '149', viewerPage: 161,
    sourceMarkers: ['Practice Multiplying', 'solar panels', '3 x 4'],
    blankVisual: multiplicationVisual('Practice 3 × 4', [{ lead: '1–2.', prompt: 'Use the official array to find 3 groups of 4 and explain the strategy.', rows: 3, columns: 4, equation: '3 × 4 = 12', answer: '12', item: 'dot' }], 'blank'),
    solvedVisual: { title: 'Three groups of four', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '3 × 4', rows: 3, columns: 4, item: 'dot', splitAfterColumns: 2, caption: 'Break 4 into 2 and 2.' },
      { kind: 'equations', label: 'Double a known fact', lines: ['(3×2)+(3×2)=6+6=12', '3×4=12'] }
    ] }
  },
  {
    key: 'v1-u2-l6-s3-practice-3-6', unit: 2, lesson: 6, session: 3, order: 4,
    label: 'Practice 3–6', title: 'Complete 4s facts and decompose a 9-by-4 array', printedPages: '150', viewerPage: 162,
    sourceMarkers: ['Complete these 4s facts', 'Moses drew the array', 'break apart the same array'],
    blankVisual: responseWorkspace('Practice problems 3–6', [
      { lead: '3.', prompt: 'Complete the six official 4s facts.', lines: ['1×4=___', '7×4=___', '6×4=___', '10×4=___', '8×4=___', '5×4=___'], answers: [['4'], ['28'], ['24'], ['40'], ['32'], ['20']] },
      { lead: '4.', prompt: 'Name the array Moses drew.', lines: ['9 × 4 = ___'], answers: [['36']] },
      { lead: '5.', prompt: 'Break 4 into 3 and 1.', lines: ['(9×3)+(9×1)=___+___=___'], answers: [['27', '9', '36']] },
      { lead: '6.', prompt: 'Describe another way to break apart the same array.', lines: ['(9×2)+(9×2)=___+___=___'], answers: [['18', '18', '36']], openWorkspace: true }
    ]),
    solvedVisual: { title: '4s facts and Moses’s array', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: '4s facts', lines: ['4, 28, 24, 40, 32, 20'] },
      { kind: 'array', label: 'Problems 4–5 · break 4 into 3 and 1', rows: 9, columns: 4, item: 'square', splitAfterColumns: 3, caption: '(9×3)+(9×1)=27+9=36.' },
      { kind: 'equations', label: 'Problem 6 · another way', lines: ['(9×2)+(9×2)=18+18=36', '9×4=36'] }
    ] }
  },
  {
    key: 'v1-u2-l6-s4-try-model', unit: 2, lesson: 6, session: 4, order: 1,
    label: 'Try It + Model It + Picture It', title: 'Break four groups of six flowers into known facts', printedPages: '151–152', viewerPage: 163,
    sourceMarkers: ['Felipe has 4 vases', '6 flowers', 'Break apart'],
    blankVisual: multiplicationVisual('Flowers in four vases', [{ lead: 'Try It', prompt: 'Four vases hold 6 flowers each.', rows: 4, columns: 6, equation: '4 × 6 = 24', answer: '24 flowers', item: 'circle' }], 'blank'),
    solvedVisual: { title: 'Two ways to break 4 × 6', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Model It · break 6 into 5 and 1', rows: 4, columns: 6, item: 'circle', splitAfterColumns: 5, caption: '(4×5)+(4×1)=20+4=24.' },
      { kind: 'array', label: 'Break groups', rows: 4, columns: 6, item: 'circle', splitAfterRows: 2, caption: '(2×6)+(2×6)=12+12=24.' }
    ] }
  },
  {
    key: 'v1-u2-l6-s4-connect-apply', unit: 2, lesson: 6, session: 4, order: 2,
    label: 'Connect It + Apply It', title: 'Break either factor and apply ×6 strategies', printedPages: '153–154', viewerPage: 165,
    sourceMarkers: ['break apart the first or the second factor', '3 x 6', 'two different ways', '8 x 6'],
    blankVisual: responseWorkspace('Connect and apply multiplying by 6', [
      { lead: '4.', prompt: 'Show two ways to break apart 3×6.', lines: ['(3×3)+(3×3)=___+___=___', '(1×6)+(2×6)=___+___=___'], answers: [['9', '9', '18'], ['6', '12', '18']] },
      { lead: '5.', prompt: 'Find 5×6 by breaking 6 into 4 and 2.', lines: ['(5×4)+(5×2)=___+___=___'], answers: [['20', '10', '30']] },
      { lead: '6.', prompt: 'Choose the expressions that find 8×6.', lines: ['Correct choices: ___, ___, ___'], answers: [['A', 'C', 'E']] }
    ]),
    solvedVisual: { title: '×6 decomposition solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '3 × 6', rows: 3, columns: 6, item: 'dot', splitAfterColumns: 3, caption: '9+9=18; splitting the rows gives 6+12=18.' },
      { kind: 'array', label: '5 × 6', rows: 5, columns: 6, item: 'dot', splitAfterColumns: 4, caption: '(5×4)+(5×2)=20+10=30.' },
      { kind: 'equations', label: 'Problem 6', lines: ['A, C, and E each total 48.'] }
    ] }
  },
  {
    key: 'v1-u2-l6-s4-practice-1-3', unit: 2, lesson: 6, session: 4, order: 3,
    label: 'Practice 1–3', title: 'Break a 4-by-6 array', printedPages: '155', viewerPage: 167,
    sourceMarkers: ['Practice Multiplying', '4 x 6', 'smaller arrays', 'Add the two products'],
    blankVisual: responseWorkspace('Practice 4 × 6', [
      { lead: '1–3.', prompt: 'Draw a 4-by-6 array, split it into two smaller arrays, write each smaller fact, and add the products.', lines: ['4×___=___', '4×___=___', '4×6=___'], answers: [['2', '8'], ['4', '16'], ['24']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Four rows of six', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Break 6 into 2 and 4', rows: 4, columns: 6, item: 'dot', splitAfterColumns: 2, caption: 'The smaller arrays show 4×2 and 4×4.' },
      { kind: 'equations', label: 'Add the products', lines: ['4×2=8', '4×4=16', '8+16=24', '4×6=24'] }
    ] }
  },
  {
    key: 'v1-u2-l6-s4-practice-4-5', unit: 2, lesson: 6, session: 4, order: 4,
    label: 'Practice 4–5', title: 'Match ×6 decompositions and solve an apartment context', printedPages: '156', viewerPage: 168,
    sourceMarkers: ['pair of multiplication equations', '3 floors', '6 apartments'],
    blankVisual: responseWorkspace('Practice problems 4–5', [
      { lead: '4.', prompt: 'Match each ×6 fact to its two partial facts.', lines: ['5×6=___; 5×3=___; 5×3=___', '(9×5)+(9×1)=___; 9×5=___; 9×1=___', '7×6=___; 7×2=___; 7×4=___', '(6×4)+(6×2)=___; 6×4=___; 6×2=___', '8×6=___; 4×6=___; 4×6=___'], answers: [['30', '15', '15'], ['54', '45', '9'], ['42', '14', '28'], ['36', '24', '12'], ['48', '24', '24']] },
      { lead: '5.', prompt: 'Three floors have 6 apartments each.', lines: ['3 × 6 = ___'], answers: [['18']], openWorkspace: true }
    ]),
    solvedVisual: { title: '×6 fact matches and apartment solution', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Problem 4 · match each ×6 fact', lines: ['5×6=30 matches 5×3=15 and 5×3=15', '(9×5)+(9×1)=54 matches 9×5=45 and 9×1=9', '7×6=42 matches 7×2=14 and 7×4=28', '(6×4)+(6×2)=36 matches 6×4=24 and 6×2=12', '8×6=48 matches 4×6=24 and 4×6=24'] },
      { kind: 'array', label: 'Problem 5 · 3 floors with 6 apartments each', rows: 3, columns: 6, item: 'dot', splitAfterColumns: 3, caption: '(3×3)+(3×3)=9+9=18 apartments.' }
    ] }
  },
  {
    key: 'v1-u2-l6-s5-example', unit: 2, lesson: 6, session: 5, order: 1,
    label: 'Example + Problem 1', title: 'Break apart shell and apple arrays', printedPages: '157', viewerPage: 169,
    sourceMarkers: ['Toya is making 7 cowrie shell bracelets', 'uses 4 shells', 'break apart 4', '6 bowls of apples', '6 apples in each bowl'],
    blankVisual: responseWorkspace('Example and Problem 1', [
      { lead: 'Example', prompt: 'Seven bracelets use 4 shells each. Break 4 into 2 and 2.', lines: ['(7×2)+(7×2)=___+___=___'], answers: [['14', '14', '28']] },
      { lead: '1.', prompt: 'Six bowls have 6 apples each. Break the number 6 into 5 and 1.', lines: ['(5×6)+(1×6)=___+___=___'], answers: [['30', '6', '36']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Break apart the shell and apple arrays', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Example · 7 × 4', rows: 7, columns: 4, item: 'circle', splitAfterColumns: 2, caption: '(7×2)+(7×2)=14+14=28 cowrie shells.' },
      { kind: 'array', label: 'Problem 1 · 6 × 6', rows: 6, columns: 6, item: 'dot', splitAfterRows: 5, caption: '(5×6)+(1×6)=30+6=36 apples.' }
    ] }
  },
  {
    key: 'v1-u2-l6-s5-problems-1-2', unit: 2, lesson: 6, session: 5, order: 2,
    label: 'Problems 2–3', title: 'Solve 3 × 6 and diagnose an 8 × 6 decomposition', printedPages: '158', viewerPage: 170,
    sourceMarkers: ['3 pens', '6 goats', '8 x 6', 'Which expression correctly shows'],
    blankVisual: responseWorkspace('Problems 2–3', [
      { lead: '2.', prompt: 'Three pens have 6 goats each.', lines: ['3 × 6 = ___'], answers: [['18']], openWorkspace: true },
      { lead: '3.', prompt: 'Choose the correct next step after breaking 8×6 into 4+2.', lines: ['Correct choice: ___', '(8×4)+(8×2)=___+___=___'], answers: [['D'], ['32', '16', '48']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Problems 2–3 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Problem 2 · 3 × 6', rows: 3, columns: 6, item: 'dot', splitAfterRows: 2, caption: '(2×6)+(1×6)=12+6=18 goats.' },
      { kind: 'array', label: 'Problem 3 · 8 × 6', rows: 8, columns: 6, item: 'dot', splitAfterColumns: 4, caption: 'Choice D: (8×4)+(8×2)=32+16=48.' }
    ] }
  },
  {
    key: 'v1-u2-l6-s5-problems-3-5', unit: 2, lesson: 6, session: 5, order: 3,
    label: 'Problems 4–6', title: 'Complete a factor, classify equations, and choose ×4 strategies', printedPages: '159', viewerPage: 171,
    sourceMarkers: ['Winona finds 8 x 4', 'Decide if each equation is true', 'expressions can be used to find 7 x 4'],
    blankVisual: responseWorkspace('Problems 4–6', [
      { lead: '4.', prompt: 'Complete (8×2)+(8×?) for 8×4.', lines: ['missing factor = ___'], answers: [['2']] },
      { lead: '5.', prompt: 'Classify the five official equations in order.', lines: ['Claim A: 8 times 3 is stated as 22 — ___', '4×3=12 ___', '2×6=12 ___', 'Claim D: 6 times 2 is stated as 13 — ___', '4×4=16 ___'], answers: [['no'], ['yes'], ['yes'], ['no'], ['yes']] },
      { lead: '6.', prompt: 'Choose the expressions that find 7×4.', lines: ['Correct choices: ___, ___, ___'], answers: [['A', 'D', 'E']] }
    ]),
    solvedVisual: { title: 'Problems 4–6 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Problem 4', lines: ['(8×2)+(8×2)=16+16=32'] },
      { kind: 'equations', label: 'Problem 5', lines: ['No, Yes, Yes, No, Yes'] },
      { kind: 'array', label: 'Problem 6', rows: 7, columns: 4, item: 'dot', splitAfterColumns: 2, caption: 'A breaks 4 into 2+2, D breaks 7 into 5+2, and E repeats 4 seven times.' }
    ] }
  },
  {
    key: 'v1-u2-l6-s5-problems-6-journal', unit: 2, lesson: 6, session: 5, order: 4,
    label: 'Problem 7 + Math Journal 8', title: 'Find 5 × 6 and explain 9 × 6', printedPages: '160', viewerPage: 172,
    sourceMarkers: ['Big Bear Lake for 5 days', '6 hours each day', '9 x 6'],
    blankVisual: responseWorkspace('Final Lesson 6 problems', [
      { lead: '7.', prompt: 'Five days of 6 fishing hours each. Show two ways.', lines: ['5 × 6 = ___'], answers: [['30']], openWorkspace: true },
      { lead: '8. Math Journal', prompt: 'Break 9×6 into simpler facts.', lines: ['(9×3)+(9×3)=___+___=___'], answers: [['27', '27', '54']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Final Lesson 6 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '5 × 6', rows: 5, columns: 6, item: 'dot', splitAfterColumns: 3, caption: '15+15=30 hours; another way is (4×6)+(1×6)=24+6.' },
      { kind: 'array', label: '9 × 6', rows: 9, columns: 6, item: 'dot', splitAfterColumns: 3, caption: '(9×3)+(9×3)=27+27=54.' }
    ] }
  },
  {
    key: 'v1-u2-l7-s1-try-connect', unit: 2, lesson: 7, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Break apart 6 × 7 in different ways', printedPages: '163–164', viewerPage: 175,
    sourceMarkers: ['Tameka and Seth are both finding 6 x 7', 'two different ways', '7 X 7'],
    blankVisual: responseWorkspace('Build 6 × 7 from known facts', [
      { lead: 'Try It', prompt: 'Show two different ways to break apart 6 × 7.', lines: ['6 × 7 = ___', '(6×5)+(6×2)=___+___=___', '(3×7)+(3×7)=___+___=___'], answers: [['42'], ['30', '12', '42'], ['21', '21', '42']], openWorkspace: true },
      { lead: 'Look Ahead', prompt: 'Use 6 × 7 and another decomposition to find 7 × 7.', lines: ['6 × 7 = ___', '7 × 7 is ___ more', '7 × 7 = ___'], answers: [['42'], ['7'], ['49']] }
    ]),
    solvedVisual: { title: 'Two verified decompositions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Split the factor 7', rows: 6, columns: 7, item: 'dot', splitAfterColumns: 5, caption: '(6×5)+(6×2)=30+12=42.' },
      { kind: 'array', label: 'Split the factor 6', rows: 6, columns: 7, item: 'dot', splitAfterRows: 3, caption: '(3×7)+(3×7)=21+21=42.' },
      { kind: 'equations', label: 'Look Ahead', lines: ['Use the known product 6×7 (42), then add 7: 42+7=49.', 'Break the second factor: (7×5)+(7×2)=35+14=49.'] }
    ] }
  },
  {
    key: 'v1-u2-l7-s1-prepare', unit: 2, lesson: 7, session: 1, order: 2,
    label: 'Prepare', title: 'Use ×5 and ×2 facts to find 8 × 7', printedPages: '165', viewerPage: 177,
    sourceMarkers: ['Think about what you know about multiplication', '40', '16'],
    blankVisual: {
      title: 'Prepare for Multiplying with 7, 8, and 9', sections: [
        { kind: 'official-organizer', label: '1. Complete the official product organizer · Student Worktext p. 165', displayWidth: 860, centerLabel: 'product', fields: [
          { ariaLabel: 'Top product example', answer: '6 × 7 = 42.', x: 35, y: 2, width: 30, height: 32 },
          { ariaLabel: 'Upper-left product example', answer: 'A product is the result of a multiplication problem.', x: 3, y: 16, width: 30, height: 32 },
          { ariaLabel: 'Upper-right product example', answer: '3 rows of 5 make 15, so 3 × 5 = 15.', x: 67, y: 16, width: 30, height: 32 },
          { ariaLabel: 'Lower-left product example', answer: '4 groups of 3 make 12, so 4 × 3 = 12.', x: 3, y: 52.5, width: 30, height: 32 },
          { ariaLabel: 'Lower-right product example', answer: 'Multiply two numbers together to find their product.', x: 67, y: 52.5, width: 30, height: 32 },
          { ariaLabel: 'Bottom product example', answer: '8 × 3 = 24.', x: 35, y: 66.5, width: 30, height: 32 }
        ], caption: 'Use words, numbers, or pictures in the same official six-part organizer.' },
        { kind: 'source-response-workspace', label: '2. Use ×5 and ×2 facts', wide: true, columns: 1, parts: [
          { lead: '2.', prompt: 'Use 8×5=40 and 8×2=16 to find 8×7.', lines: ['8×7=(8×5)+(8×2)=___+___=___'], lineAnswers: [['40', '16', '56']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }
        ] }
      ]
    },
    solvedVisual: { title: 'Prepare for Multiplying with 7, 8, and 9', sourceNote: supplementalVisualNote, sections: [
      { kind: 'official-organizer', label: '1. Teacher Guide possible answers · Student Worktext p. 165', displayWidth: 860, centerLabel: 'product', fields: [
        { ariaLabel: 'Top product example', answer: '6 × 7 = 42.', x: 35, y: 2, width: 30, height: 32 },
        { ariaLabel: 'Upper-left product example', answer: 'A product is the result of a multiplication problem.', x: 3, y: 16, width: 30, height: 32 },
        { ariaLabel: 'Upper-right product example', answer: '3 rows of 5 make 15, so 3 × 5 = 15.', x: 67, y: 16, width: 30, height: 32 },
        { ariaLabel: 'Lower-left product example', answer: '4 groups of 3 make 12, so 4 × 3 = 12.', x: 3, y: 52.5, width: 30, height: 32 },
        { ariaLabel: 'Lower-right product example', answer: 'Multiply two numbers together to find their product.', x: 67, y: 52.5, width: 30, height: 32 },
        { ariaLabel: 'Bottom product example', answer: '8 × 3 = 24.', x: 35, y: 66.5, width: 30, height: 32 }
      ], caption: 'The organizer layout and possible answers are verified in Teacher Guide Volume 1 pp. 312–313.' },
      { kind: 'array', label: '2. Break 7 into 5 and 2', rows: 8, columns: 7, item: 'dot', splitAfterColumns: 5, caption: '(8×5)+(8×2)=40+16=56.' }
    ] }
  },
  {
    key: 'v1-u2-l7-s1-practice', unit: 2, lesson: 7, session: 1, order: 3,
    label: 'Practice', title: 'Show two ways to find 6 × 9', printedPages: '166', viewerPage: 178,
    sourceMarkers: ['Aponi and Galeno are both finding 6 x 9', 'two different ways', 'Check your answer'],
    blankVisual: multiplicationVisual('Practice 6 × 9', [{ lead: '3–4.', prompt: 'Show two decompositions and check the product.', rows: 6, columns: 9, equation: '6 × 9 = 54', answer: '54', item: 'dot' }], 'blank'),
    solvedVisual: { title: 'Two ways to make 54', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Split nine columns', rows: 6, columns: 9, item: 'dot', splitAfterColumns: 5, caption: '(6×5)+(6×4)=30+24=54.' },
      { kind: 'array', label: 'Split six rows', rows: 6, columns: 9, item: 'dot', splitAfterRows: 3, caption: '(3×9)+(3×9)=27+27=54.' }
    ] }
  },
  {
    key: 'v1-u2-l7-s2-try-model', unit: 2, lesson: 7, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Find cones on eight piñatas', printedPages: '167–168', viewerPage: 179,
    sourceMarkers: ['family sees', '7 cones', '8 groups'],
    blankVisual: multiplicationVisual('Eight groups of seven cones', [{ lead: 'Try It', prompt: 'Eight piñatas have 7 cones each.', rows: 8, columns: 7, equation: '8 × 7 = 56', answer: '56 cones', item: 'triangle' }], 'blank'),
    solvedVisual: { title: 'Break 7 into 5 and 2', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '8 × 7', rows: 8, columns: 7, item: 'triangle', splitAfterColumns: 5, caption: 'Eight groups of 7 become eight groups of 5 and eight groups of 2.' },
      { kind: 'equations', label: 'Add the two products', lines: ['8×7 = 8×(5+2)', '(8×5)+(8×2)=40+16=56 cones'] }
    ] }
  },
  {
    key: 'v1-u2-l7-s2-connect-apply', unit: 2, lesson: 7, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Explain and apply factor-7 decompositions', printedPages: '169–170', viewerPage: 181,
    sourceMarkers: ['parentheses around', 'knowing the answer to 2 x 7', 'find 3 X 7', 'Which expressions can be used'],
    blankVisual: responseWorkspace('Connect and apply multiplying with 7', [
      { lead: 'Connect It', prompt: 'Explain what the parentheses show in 8×(5+2).', lines: [], openWorkspace: true },
      { lead: '4.', prompt: 'Use 2×7 to find 4×7.', lines: ['2×7=___', '4×7=___'], answers: [['14'], ['28']], openWorkspace: true },
      { lead: '5.', prompt: 'Show two decompositions for 3×7.', lines: ['(3×5)+(3×2)=___+___=___', '(1×7)+(2×7)=___+___=___'], answers: [['15', '6', '21'], ['7', '14', '21']] },
      { lead: '6.', prompt: 'Choose every expression that can find 5×7.', lines: ['Correct choices: ___, ___, ___'], answers: [['A', 'B', 'D']] }
    ]),
    solvedVisual: { title: 'Factor-7 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '4 × 7', rows: 4, columns: 7, item: 'dot', splitAfterRows: 2, caption: 'Two groups of 2×7 give 14+14=28.' },
      { kind: 'array', label: '3 × 7', rows: 3, columns: 7, item: 'dot', splitAfterColumns: 5, caption: '15+6=21.' },
      { kind: 'equations', label: 'Problem 6', lines: ['A: 7×5', 'B: 5×(2+5)', 'D: (2×7)+(3×7)'] }
    ] }
  },
  {
    key: 'v1-u2-l7-s2-practice', unit: 2, lesson: 7, session: 2, order: 3,
    label: 'Practice 1–6', title: 'Break apart 6 × 7 and solve the starfish context', printedPages: '171–172', viewerPage: 183,
    sourceMarkers: ['Practice Multiplying with 7', 'rows and', '6 x 7', '4 starfish', '3 starfish'],
    blankVisual: responseWorkspace('Practice multiplying with 7', [
      { lead: '1–4.', prompt: 'Use the official 6-row, 7-column array.', lines: ['rows: ___; columns: ___', '(6×2)+(6×5)=___+___=___'], answers: [['6', '7'], ['12', '30', '42']], openWorkspace: true },
      { lead: '5.', prompt: 'Complete the five official products.', lines: ['4×7=___', '5×7=___', '6×7=___', '7×7=___', '8×7=___'], answers: [['28'], ['35'], ['42'], ['49'], ['56']] },
      { lead: '6.', prompt: 'Seven starfish have 5 arms each.', lines: ['(4+3)×5=___'], answers: [['35']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Practice solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '6 × 7', rows: 6, columns: 7, item: 'dot', splitAfterColumns: 2, caption: '12+30=42.' },
      { kind: 'equations', label: 'Completed products', lines: ['4×7=28', '5×7=35', '6×7=42', '7×7=49', '8×7=56', '7×5=35 starfish arms'] }
    ] }
  },
  {
    key: 'v1-u2-l7-s3-try-model', unit: 2, lesson: 7, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Find pumpkins in six rows of eight', printedPages: '173–174', viewerPage: 185,
    sourceMarkers: ['6 rows of pumpkins', '8 pumpkins', 'break the columns of the array', 'further break the columns'],
    blankVisual: multiplicationVisual('Six rows of eight pumpkins', [{ lead: 'Try It', prompt: 'Six rows have 8 pumpkins each.', rows: 6, columns: 8, equation: '6 × 8 = 48', answer: '48 pumpkins', item: 'circle' }], 'blank'),
    solvedVisual: { title: 'Break eight into equal parts', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Two groups of four columns', rows: 6, columns: 8, item: 'circle', splitAfterColumns: 4, caption: '(6×4)+(6×4)=24+24=48.' },
      { kind: 'equations', label: 'Four groups of two columns', lines: ['6×2+6×2+6×2+6×2 = 12+12+12+12 = 48'] }
    ] }
  },
  {
    key: 'v1-u2-l7-s3-connect-apply', unit: 2, lesson: 7, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'Choose useful decompositions for multiplying with 8', printedPages: '175–176', viewerPage: 187,
    sourceMarkers: ['factor 8 be broken apart', 'find 6 x 8', '7 x 8', '5 x 8', 'checker board'],
    blankVisual: responseWorkspace('Connect and apply multiplying with 8', [
      { lead: 'Connect It', prompt: 'Describe another way to break 8 apart.', lines: [], openWorkspace: true },
      { lead: '4.', prompt: 'Find 7×8 by breaking apart 8.', lines: ['(7×4)+(7×4)=___+___=___'], answers: [['28', '28', '56']] },
      { lead: '5.', prompt: 'Use 5×2 to find 5×8.', lines: ['5×8=___'], answers: [['40']], openWorkspace: true },
      { lead: '6.', prompt: 'An 8-row by 8-column checkerboard.', lines: ['8×8=___'], answers: [['64']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Factor-8 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '7 × 8', rows: 7, columns: 8, item: 'dot', splitAfterColumns: 4, caption: '28+28=56.' },
      { kind: 'array', label: '5 × 8', rows: 5, columns: 8, item: 'dot', splitAfterColumns: 2, caption: '10+10+10+10=40.' },
      { kind: 'array', label: '8 × 8', rows: 8, columns: 8, item: 'square', splitAfterColumns: 4, caption: '32+32=64.' }
    ] }
  },
  {
    key: 'v1-u2-l7-s3-practice', unit: 2, lesson: 7, session: 3, order: 3,
    label: 'Practice 1–7', title: 'Model and decompose products with 8', printedPages: '177–178', viewerPage: 189,
    sourceMarkers: ['6 boxes of toy cars', 'Use the array at the right', 'break apart 3 x 8'],
    blankVisual: responseWorkspace('Practice multiplying with 8', [
      { lead: '1–3.', prompt: 'Six boxes have 8 cars each.', lines: ['6×8=___', '(6×5)+(6×3)=___+___=___'], answers: [['48'], ['30', '18', '48']], openWorkspace: true },
      { lead: '4–6.', prompt: 'Name and decompose Danny’s 9-row, 8-column array.', lines: ['9×8=___', '(9×4)+(9×4)=___+___=___'], answers: [['72'], ['36', '36', '72']], openWorkspace: true },
      { lead: '7.', prompt: 'Choose the valid decomposition of 3×8.', lines: ['Correct choice: ___'], answers: [['D']] }
    ]),
    solvedVisual: { title: 'Practice solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '6 × 8', rows: 6, columns: 8, item: 'dot', splitAfterColumns: 5, caption: '30+18=48 toy cars.' },
      { kind: 'array', label: '9 × 8', rows: 9, columns: 8, item: 'dot', splitAfterColumns: 4, caption: '36+36=72.' },
      { kind: 'equations', label: 'Problem 7', lines: ['D: (3×6)+(3×2)=18+6=24'] }
    ] }
  },
  {
    key: 'v1-u2-l7-s4-try-model', unit: 2, lesson: 7, session: 4, order: 1,
    label: 'Try It + Model It', title: 'Find oranges in eight boxes of nine', printedPages: '179–180', viewerPage: 191,
    sourceMarkers: ['8 boxes of oranges', '9 oranges', 'break apart the columns', 'break apart the rows'],
    blankVisual: multiplicationVisual('Eight boxes of nine oranges', [{ lead: 'Try It', prompt: 'Eight boxes have 9 oranges each.', rows: 8, columns: 9, equation: '8 × 9 = 72', answer: '72 oranges', item: 'circle' }], 'blank'),
    solvedVisual: { title: 'Break either factor', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Split nine columns', rows: 8, columns: 9, item: 'circle', splitAfterColumns: 5, caption: '(8×5)+(8×4)=40+32=72.' },
      { kind: 'array', label: 'Split eight rows', rows: 8, columns: 9, item: 'circle', splitAfterRows: 4, caption: '(4×9)+(4×9)=36+36=72.' }
    ] }
  },
  {
    key: 'v1-u2-l7-s4-connect-apply', unit: 2, lesson: 7, session: 4, order: 2,
    label: 'Connect It + Apply It', title: 'Explain and apply factor-9 strategies', printedPages: '181–182', viewerPage: 193,
    sourceMarkers: ['multiplication facts are used', 'break apart one of the factors in 8 X 9', 'find 7 X 9', 'packs of batteries'],
    blankVisual: responseWorkspace('Connect and apply multiplying with 9', [
      { lead: 'Connect It', prompt: 'Describe two ways to break apart 8×9.', lines: [], openWorkspace: true },
      { lead: '4.', prompt: 'Break two arrays differently to find 7×9.', lines: ['7×9=___'], answers: [['63']], openWorkspace: true },
      { lead: '5.', prompt: 'Find 9×9.', lines: ['9×9=___'], answers: [['81']], openWorkspace: true },
      { lead: '6.', prompt: 'Choose the expression for 9 packs of 4 batteries.', lines: ['Correct choice: ___'], answers: [['A']] }
    ]),
    solvedVisual: { title: 'Factor-9 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '7 × 9', rows: 7, columns: 9, item: 'dot', splitAfterColumns: 5, caption: '35+28=63.' },
      { kind: 'array', label: '9 × 9', rows: 9, columns: 9, item: 'dot', splitAfterColumns: 5, caption: '45+36=81.' },
      { kind: 'equations', label: 'Problem 6', lines: ['A: (4×5)+(4×4)=20+16=36 batteries'] }
    ] }
  },
  {
    key: 'v1-u2-l7-s4-practice', unit: 2, lesson: 7, session: 4, order: 3,
    label: 'Practice 1–5', title: 'Decompose products with 9', printedPages: '183–184', viewerPage: 195,
    sourceMarkers: ['Practice Multiplying with 9', '6 groups of 9', 'pair of multiplication equations', 'find 9 X 9'],
    blankVisual: responseWorkspace('Practice multiplying with 9', [
      { lead: '1–3.', prompt: 'Use 5×9 to decompose 6×9.', lines: ['5×9=___', '1×9=___', '6×9=___'], answers: [['45'], ['9'], ['54']], openWorkspace: true },
      { lead: '4.', prompt: 'Complete the five official products.', lines: ['2×9=___', '4×9=___', '7×9=___', '8×9=___', '9×9=___'], answers: [['18'], ['36'], ['63'], ['72'], ['81']] },
      { lead: '5.', prompt: 'Break apart the 9×9 array.', lines: ['(9×5)+(9×4)=___+___=___'], answers: [['45', '36', '81']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Practice solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '6 × 9', rows: 6, columns: 9, item: 'dot', splitAfterRows: 5, caption: '45+9=54.' },
      { kind: 'equations', label: 'Completed products', lines: ['2×9=18', '4×9=36', '7×9=63', '8×9=72', '9×9=81'] },
      { kind: 'array', label: '9 × 9', rows: 9, columns: 9, item: 'dot', splitAfterColumns: 5, caption: '45+36=81.' }
    ] }
  },
  {
    key: 'v1-u2-l7-s5-example-problems', unit: 2, lesson: 7, session: 5, order: 1,
    label: 'Example + Problems 1–3', title: 'Apply multiplication facts for 7, 8, and 9', printedPages: '185–186', viewerPage: 197,
    sourceMarkers: ['7 teams', '8 players', '8 rows of 9 tires', '5 x 8', '9 x 7'],
    blankVisual: responseWorkspace('Refine multiplication facts', [
      { lead: 'Example', prompt: 'Seven teams have 8 players each.', lines: ['7×8=___'], answers: [['56']] },
      { lead: '1.', prompt: 'Eight rows have 9 tires each.', lines: ['8×9=___'], answers: [['72']], openWorkspace: true },
      { lead: '2.', prompt: 'Use 8×5 to find 5×8.', lines: ['5×8=___'], answers: [['40']], openWorkspace: true },
      { lead: '3.', prompt: 'Choose Latoya’s decomposition of 9×7.', lines: ['Correct choice: ___'], answers: [['C']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Example and problems 1–3', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '7 × 8', rows: 7, columns: 8, item: 'dot', splitAfterColumns: 4, caption: '28+28=56 players.' },
      { kind: 'array', label: '8 × 9', rows: 8, columns: 9, item: 'dot', splitAfterColumns: 5, caption: '40+32=72 tires.' },
      { kind: 'equations', label: 'Problems 2–3', lines: ['5×8 and 8×5 both have product 40.', 'C: (9×3)+(9×4)=27+36=63'] }
    ] }
  },
  {
    key: 'v1-u2-l7-s5-problems-4-5', unit: 2, lesson: 7, session: 5, order: 2,
    label: 'Problems 4–5', title: 'Complete and interpret decompositions', printedPages: '187', viewerPage: 199,
    sourceMarkers: ['finds 5 x 7', 'number belongs in the blank', '5 packs of pencils', '8 pencils'],
    blankVisual: responseWorkspace('Problems 4–5', [
      { lead: '4.', prompt: 'Complete (3×7)+(?×7) to find 5×7.', lines: ['missing factor = ___'], answers: [['2']] },
      { lead: '5.', prompt: 'Choose the expression represented by 2 groups of 8 and 3 groups of 8.', lines: ['Correct choice: ___'], answers: [['A']] }
    ]),
    solvedVisual: { title: 'Problems 4–5 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Problem 4', lines: ['(3×7)+(2×7)=21+14=35'] },
      { kind: 'array', label: 'Problem 5', rows: 5, columns: 8, item: 'dot', splitAfterRows: 2, caption: 'A: (2×8)+(3×8)=16+24=40 pencils.' }
    ] }
  },
  {
    key: 'v1-u2-l7-s5-problems-6-journal', unit: 2, lesson: 7, session: 5, order: 3,
    label: 'Problems 6–8', title: 'Solve 8 × 8, classify 6 × 9 strategies, and explain 9 × 9', printedPages: '188', viewerPage: 200,
    sourceMarkers: ['break the array into two groups', '6 X3', '6x4', 'rooftop garden', '9 plants'],
    blankVisual: responseWorkspace('Final Lesson 7 problems', [
      { lead: '6.', prompt: 'Break the 8×8 array into two groups.', lines: ['8×(4+4)=___+___=___'], answers: [['32', '32', '64']], openWorkspace: true },
      { lead: '7.', prompt: 'Classify the five expressions in order as ways to find 6×9.', lines: ['answers: ___, ___, ___, ___, ___'], answers: [['no', 'yes', 'yes', 'yes', 'yes']] },
      { lead: '8. Math Journal', prompt: 'Nine rows have 9 plants each.', lines: ['9×9=___'], answers: [['81']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Final Lesson 7 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '8 × 8', rows: 8, columns: 8, item: 'dot', splitAfterColumns: 4, caption: '(8×4)+(8×4)=32+32=64.' },
      { kind: 'equations', label: 'Problem 7', lines: ['No: (6×3)+(6×3)=36', 'Yes: (6×4)+(6×5)=54', 'Yes: 6×(6+3)=54', 'Yes: 9×(2+4)=54', 'Yes: (3×9)+(3×9)=54'] },
      { kind: 'array', label: 'Math Journal', rows: 9, columns: 9, item: 'dot', splitAfterColumns: 5, caption: '(9×5)+(9×4)=45+36=81 plants.' }
    ] }
  },
  {
    key: 'v1-u2-l8-s1-try-connect', unit: 2, lesson: 8, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Compare factor order and factor grouping', printedPages: '191–192', viewerPage: 203,
    sourceMarkers: ['Jess sells 2 bags of 3 ears of corn', '3 bags of 2 ears of corn', '4 sets of sidewalk chalk', 'first find how many boxes there are'],
    blankVisual: responseWorkspace('Order and group factors', [
      { lead: 'Try It', prompt: 'Compare 2 groups of 3 with 3 groups of 2.', lines: ['2×3=___', '3×2=___'], answers: [['6'], ['6']], openWorkspace: true },
      { lead: 'Look Ahead', prompt: 'Four sets hold 2 boxes with 5 pieces in each box.', lines: ['(4×2)×5=___×5=___', '4×(2×5)=4×___=___'], answers: [['8', '40'], ['10', '40']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Same products from different order or grouping', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '2 × 3', rows: 2, columns: 3, item: 'dot', caption: '2×3=6; turning the array gives 3×2=6.' },
      { kind: 'equations', label: 'Sidewalk chalk', lines: ['(4×2)×5 = 8×5 = 40', '4×(2×5) = 4×10 = 40'] }
    ] }
  },
  {
    key: 'v1-u2-l8-s1-prepare', unit: 2, lesson: 8, session: 1, order: 2,
    label: 'Prepare', title: 'Explain two groupings of 3 × 2 × 4', printedPages: '193', viewerPage: 205,
    sourceMarkers: ['Prepare for Using Order and Grouping to Multiply', 'Manny says', '3 x 2', '2 x 4'],
    blankVisual: { title: 'Prepare for Using Order and Grouping to Multiply', sections: [
      { kind: 'official-organizer', variant: 'four-quadrant', label: '1. Complete the official factor organizer · Student Worktext p. 193', displayWidth: 860, centerLabel: 'factor', fields: [
        { label: 'My Definition', ariaLabel: 'My definition of a factor', answer: 'A factor is a number I multiply with another number.', x: 0, y: 0, width: 50, height: 50 },
        { label: 'My Illustrations', ariaLabel: 'My illustration of factors', answer: 'A 3-by-5 array shows 3 × 5 = 15; 3 and 5 are factors.', x: 50, y: 0, width: 50, height: 50 },
        { label: 'Examples', ariaLabel: 'Examples of factors', answer: 'In 4 × 5 = 20, both 4 and 5 are factors.', x: 0, y: 50, width: 50, height: 50 },
        { label: 'Non-Examples', ariaLabel: 'Non-examples of factors', answer: 'In 3 + 8 = 11, 3 and 8 are not factors.', x: 50, y: 50, width: 50, height: 50 }
      ], caption: 'Use words, numbers, or pictures in the same official four-quadrant organizer.' },
      { kind: 'source-response-workspace', label: '2. Compare Manny’s groupings', wide: true, columns: 1, parts: [
        { lead: '2.', prompt: 'Decide whether (3×2)×4 and 3×(2×4) have the same product.', lines: ['(3×2)×4=___', '3×(2×4)=___'], lineAnswers: [['24'], ['24']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }
      ] }
    ] },
    solvedVisual: { title: 'Prepare for Using Order and Grouping to Multiply', sourceNote: supplementalVisualNote, sections: [
      { kind: 'official-organizer', variant: 'four-quadrant', label: '1. Teacher Guide possible answers · Student Worktext p. 193', displayWidth: 860, centerLabel: 'factor', fields: [
        { label: 'My Definition', ariaLabel: 'My definition of a factor', answer: 'A factor is a number I multiply with another number.', x: 0, y: 0, width: 50, height: 50 },
        { label: 'My Illustrations', ariaLabel: 'My illustration of factors', answer: 'A 3-by-5 array shows 3 × 5 = 15; 3 and 5 are factors.', x: 50, y: 0, width: 50, height: 50 },
        { label: 'Examples', ariaLabel: 'Examples of factors', answer: 'In 4 × 5 = 20, both 4 and 5 are factors.', x: 0, y: 50, width: 50, height: 50 },
        { label: 'Non-Examples', ariaLabel: 'Non-examples of factors', answer: 'In 3 + 8 = 11, 3 and 8 are not factors.', x: 50, y: 50, width: 50, height: 50 }
      ], caption: 'The organizer layout and possible answers are verified in Teacher Guide Volume 1 pp. 344–345.' },
      { kind: 'equations', label: '2. Manny is correct', lines: ['(3×2)×4 = 6×4 = 24', '3×(2×4) = 3×8 = 24', 'The factors can be multiplied in any order or grouping without changing the product.'] }
    ] }
  },
  {
    key: 'v1-u2-l8-s1-practice', unit: 2, lesson: 8, session: 1, order: 3,
    label: 'Practice', title: 'Compare 4 × 2 with 2 × 4 tamales', printedPages: '194', viewerPage: 206,
    sourceMarkers: ['tamale cart', '4 packages of 2 tamales', '2 packages of 4 tamales', 'Check your answer'],
    blankVisual: responseWorkspace('Tamale cart comparison', [{ lead: '3–4.', prompt: 'Find how many tamales Sofia and Alec each buy.', lines: ['4×2=___', '2×4=___'], answers: [['8'], ['8']], openWorkspace: true }]),
    solvedVisual: { title: 'Turn the same array', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Sofia · 4 packages of 2', rows: 4, columns: 2, item: 'dot', caption: '4×2=8 tamales.' },
      { kind: 'equations', label: 'Alec · turn the factor order', lines: ['2×4=8 tamales', 'Sofia and Alec each buy 8 tamales.'] }
    ] }
  },
  {
    key: 'v1-u2-l8-s2-try-model', unit: 2, lesson: 8, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Compare 6 × 3 with 3 × 6 hospital visits', printedPages: '195–196', viewerPage: 207,
    sourceMarkers: ['Ajay and his dog', '6 weeks', '3 days each week', 'Nina and her dog', 'arrays'],
    blankVisual: responseWorkspace('Hospital visit comparison', [{ lead: 'Try It', prompt: 'Compare Ajay’s 6 weeks of 3 days with Nina’s 3 weeks of 6 days.', lines: ['6×3=___', '3×6=___'], answers: [['18'], ['18']], openWorkspace: true }]),
    solvedVisual: { title: 'Order does not change the product', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Ajay · 6 × 3', rows: 6, columns: 3, item: 'dot', caption: '18 days.' },
      { kind: 'array', label: 'Nina · 3 × 6', rows: 3, columns: 6, item: 'dot', caption: '18 days. Neither visits more days.' }
    ] }
  },
  {
    key: 'v1-u2-l8-s2-connect-apply', unit: 2, lesson: 8, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Use factor order to solve official applications', printedPages: '197–198', viewerPage: 209,
    sourceMarkers: ['8 X 9 = 72', 'Rico\'s bus makes', 'rock collection', '5 x 8 = 40'],
    blankVisual: responseWorkspace('Connect and apply factor order', [
      { lead: 'Connect It', prompt: 'Use 8×9=72 to find 9×8.', lines: ['9×8=___'], answers: [['72']] },
      { lead: '4.', prompt: 'Compare 5 stops of 4 riders with 4 stops of 5 riders.', lines: ['5×4=___', '4×5=___'], answers: [['20'], ['20']], openWorkspace: true },
      { lead: '5.', prompt: 'Shen has 6 shelves of 8 rocks; Wilma has 8 shelves with the same total.', lines: ['6×8=___', '___ rocks per Wilma shelf'], answers: [['48'], ['6']], openWorkspace: true },
      { lead: '6.', prompt: 'Choose the related fact to 5×8=40.', lines: ['Correct choice: ___'], answers: [['C']] }
    ]),
    solvedVisual: { title: 'Factor-order solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Bus stops', rows: 5, columns: 4, item: 'dot', caption: '5×4 and 4×5 both have product 20.' },
      { kind: 'array', label: 'Rock shelves', rows: 6, columns: 8, item: 'dot', caption: '6×8=48 and 8×6=48, so Wilma puts 6 rocks on each shelf.' },
      { kind: 'equations', label: 'Related fact', lines: ['C: 8×5=40'] }
    ] }
  },
  {
    key: 'v1-u2-l8-s2-practice', unit: 2, lesson: 8, session: 2, order: 3,
    label: 'Practice 1–6', title: 'Turn arrays and relate multiplication facts', printedPages: '199–200', viewerPage: 211,
    sourceMarkers: ['Practice Using Order to Multiply', '3 x 9 = 27', '4 x 6 = 24', '3 piles with 9 skipping stones'],
    blankVisual: responseWorkspace('Practice using order to multiply', [
      { lead: '1–2.', prompt: 'Name the turned arrays and use 3×9 to find 9×3.', lines: ['2×5=___', '5×2=___', '9×3=___'], answers: [['10'], ['10'], ['27']], openWorkspace: true },
      { lead: '3–5.', prompt: 'Turn 4×6 and 4×3 arrays without changing the product.', lines: ['4×6=___; 6×4=___', '4×3=___; 3×4=___'], answers: [['24', '24'], ['12', '12']], openWorkspace: true },
      { lead: '6.', prompt: 'Three piles of 9 stones equal 9 piles of how many?', lines: ['3×9=___; 9×___=___'], answers: [['27', '3', '27']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Turned-array solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '2 × 5', rows: 2, columns: 5, item: 'dot', caption: 'Turning gives 5×2; both products are 10.' },
      { kind: 'array', label: '4 × 6', rows: 4, columns: 6, item: 'square', caption: 'Turning gives 6×4; both products are 24.' },
      { kind: 'equations', label: 'Other related facts', lines: ['4×3 and 3×4 both have product 12.', '3×9 and 9×3 both have product 27.'] }
    ] }
  },
  {
    key: 'v1-u2-l8-s3-try-model', unit: 2, lesson: 8, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Group glove, finger, and jewel factors', printedPages: '201–202', viewerPage: 213,
    sourceMarkers: ['pair of gloves', '3 jewels onto each finger', '5 fingers with 3 jewels', '15 jewels on each glove'],
    blankVisual: responseWorkspace('Jewels on two gloves', [{ lead: 'Try It', prompt: 'Two gloves have 5 fingers each with 3 jewels per finger.', lines: ['(2×5)×3=___', '2×(5×3)=___'], answers: [['30'], ['30']], openWorkspace: true }]),
    solvedVisual: {
      title: 'Group the exact glove model in two valid ways',
      sourceNote: supplementalVisualNote,
      sections: [
        {
          kind: 'source-model',
          label: '1. Notice the official glove model · Student Worktext p. 202',
          src: '/assets/iready-volume1/student-models/l8-p202-gloves.jpg',
          alt: 'Two official green glove illustrations with five fingers and three jewels on each finger',
          imageWidth: 640,
          imageHeight: 570,
          crop: { x: 0, y: 0, width: 640, height: 570 },
          displayWidth: 620,
          annotations: [
            { label: '5 fingers × 3 jewels', x: 5, y: 6, width: 43, height: 78, tone: 'known' },
            { label: '5 fingers × 3 jewels', x: 51, y: 6, width: 44, height: 78, tone: 'known' }
          ],
          reasoning: [
            { label: 'One glove', expression: '5 × 3 = 15 jewels' },
            { label: 'Two gloves', expression: '2 × 15 = 30 jewels' },
            { label: 'Regroup by fingers', expression: '(2 × 5) × 3 = 10 × 3 = 30' }
          ],
          caption: 'The official picture fixes the three factors: 2 gloves, 5 fingers on each glove, and 3 jewels on each finger.'
        },
        {
          kind: 'tape',
          label: '2. Compose the two glove totals',
          totalLabel: '30 jewels',
          parts: [
            { label: '15', sublabel: 'left glove', emphasize: true },
            { label: '15', sublabel: 'right glove', emphasize: true }
          ],
          equations: ['2 × (5 × 3) = 2 × 15 = 30', '(2 × 5) × 3 = 10 × 3 = 30'],
          caption: 'Parentheses change which factors are multiplied first; they do not change the 30 jewels shown by the source model.'
        }
      ]
    }
  },
  {
    key: 'v1-u2-l8-s3-connect-apply', unit: 2, lesson: 8, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'Group three factors in different ways', printedPages: '203–204', viewerPage: 215,
    sourceMarkers: ['parentheses mean', '7 x 2', 'finding the product', 'possible next step to finding 3 x 2 x 9'],
    blankVisual: responseWorkspace('Connect and apply factor grouping', [
      { lead: '4.', prompt: 'Group 7×2×4 in two ways.', lines: ['(7×2)×4=___', '7×(2×4)=___'], answers: [['56'], ['56']] },
      { lead: '5.', prompt: 'Group 2×4×3 in two ways.', lines: ['(2×4)×3=___', '2×(4×3)=___'], answers: [['24'], ['24']] },
      { lead: '6.', prompt: 'Choose possible next steps for 3×2×9.', lines: ['Correct choices: ___ and ___'], answers: [['A', 'E']] }
    ]),
    solvedVisual: { title: 'Grouping solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Products', lines: ['(7×2)×4 = 14×4 = 56', '7×(2×4) = 7×8 = 56', '(2×4)×3 = 8×3 = 24', '2×(4×3) = 2×12 = 24', 'A: 6×9; E: 3×18'] }] }
  },
  {
    key: 'v1-u2-l8-s3-practice', unit: 2, lesson: 8, session: 3, order: 3,
    label: 'Practice 1–9', title: 'Use grouping in snack-stick and numeric contexts', printedPages: '205–206', viewerPage: 217,
    sourceMarkers: ['Practice Using Grouping to Multiply', 'Deon makes the fruit snack sticks', '7 x 2 x 4', '4 x 5 X 3', '8 X 2 x 3'],
    blankVisual: responseWorkspace('Practice using grouping', [
      { lead: '1–5.', prompt: 'Deon uses 5 fruit pieces per stick, 3 sticks per plate, and 2 plates.', lines: ['5×3×2=___'], answers: [['30']], openWorkspace: true },
      { lead: '6.', prompt: 'Group 7×2×4.', lines: ['7×(2×4)=___'], answers: [['56']], openWorkspace: true },
      { lead: '7.', prompt: 'Show Flora’s grouping of 4×5×3.', lines: ['(4×5)×3=___'], answers: [['60']], openWorkspace: true },
      { lead: '8–9.', prompt: 'Show two groupings of 8×2×3.', lines: ['(8×2)×3=___', '8×(2×3)=___'], answers: [['48'], ['48']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Practice grouping solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Products', lines: ['(5×3)×2 = 15×2 = 30 fruit pieces', '7×(2×4)=7×8=56', '(4×5)×3=20×3=60', '(8×2)×3=16×3=48', '8×(2×3)=8×6=48'] }] }
  },
  {
    key: 'v1-u2-l8-s4-try-model', unit: 2, lesson: 8, session: 4, order: 1,
    label: 'Try It + Model It', title: 'Order and group 2 × 8 × 5 sandwich rolls', printedPages: '207–208', viewerPage: 219,
    sourceMarkers: ['2 boxes of sandwich rolls', '8 packages in each box', '5 sandwich rolls', '8 X 10 = 80'],
    blankVisual: responseWorkspace('Sandwich roll factors', [{ lead: 'Try It', prompt: 'Two boxes have 8 packages each with 5 rolls per package.', lines: ['2×8×5=___'], answers: [['80']], openWorkspace: true }]),
    solvedVisual: workedModel('Reorder, then group', [
      { label: '1', prompt: 'Group the first two factors.', equation: '(2×8)×5 = 16×5', answer: '80 sandwich rolls' },
      { label: '2', prompt: 'Group 8 and 5.', equation: '2×(8×5) = 2×40', answer: '80 sandwich rolls' },
      { label: '3', prompt: 'Switch 2 and 8, then make a factor of 10.', equation: '8×(2×5) = 8×10', answer: '80 sandwich rolls' }
    ], [{ kind: 'array', label: '2 boxes · 8 packages · 5 rolls', rows: 2, columns: 8, item: 'circle', groupEveryColumns: 4, caption: 'Each of the 16 packages holds 5 rolls; regrouping 2 and 5 makes 10.' }])
  },
  {
    key: 'v1-u2-l8-s4-connect-apply', unit: 2, lesson: 8, session: 4, order: 2,
    label: 'Connect It + Apply It', title: 'Choose efficient order and grouping', printedPages: '209–210', viewerPage: 221,
    sourceMarkers: ['change the order of the 2 and 8', 'find 3 x 7 x 3', 'find 4 x 9 X 2', 'same product as 8 x'],
    blankVisual: responseWorkspace('Connect and apply order and grouping', [
      { lead: '4.', prompt: 'Reorder and group 3×7×3.', lines: ['7×(3×3)=___'], answers: [['63']], openWorkspace: true },
      { lead: '5.', prompt: 'Reorder and group 4×9×2.', lines: ['9×(4×2)=___'], answers: [['72']], openWorkspace: true },
      { lead: '6.', prompt: 'Choose expressions equal to 8×(2×4).', lines: ['Correct choices: ___, ___, ___'], answers: [['A', 'B', 'D']] }
    ]),
    solvedVisual: workedModel('Efficient grouping solutions', [
      { label: '4', prompt: 'Make 3×3 first.', equation: '7×(3×3) = 7×9', answer: '63' },
      { label: '5', prompt: 'Make 4×2 first.', equation: '9×(4×2) = 9×8', answer: '72' },
      { label: '6', prompt: 'Compare each choice with 8×(2×4).', equation: '8×8', answer: '64; choices A, B, and D' }
    ], [
      { kind: 'array', label: '7 × (3 × 3)', rows: 7, columns: 9, item: 'dot', groupEveryColumns: 3, caption: 'Seven rows show three groups of 3 in each row: 7×9=63.' },
      { kind: 'array', label: '9 × (4 × 2)', rows: 9, columns: 8, item: 'dot', groupEveryColumns: 4, caption: 'Nine rows show two groups of 4 in each row: 9×8=72.' }
    ])
  },
  {
    key: 'v1-u2-l8-s4-practice', unit: 2, lesson: 8, session: 4, order: 3,
    label: 'Practice 1–10', title: 'Order and group three-factor products', printedPages: '211–212', viewerPage: 223,
    sourceMarkers: ['Practice Using Order and Grouping to Multiply', 'numbers 2, 3, and 4', 'numbers 3, 5, and 2', 'factors 9, 2, and 2', 'factors 4, 2, and 5'],
    blankVisual: responseWorkspace('Practice order and grouping', [
      { lead: '1–4.', prompt: 'Order and group 2, 3, and 4.', lines: ['(2×3)×4=___', '2×(3×4)=___'], answers: [['24'], ['24']], openWorkspace: true },
      { lead: '5–7.', prompt: 'Order and group 3, 5, and 2.', lines: ['3×(5×2)=___'], answers: [['30']], openWorkspace: true },
      { lead: '8–9.', prompt: 'Choose an efficient grouping for 9, 2, and 2.', lines: ['9×(2×2)=___'], answers: [['36']], openWorkspace: true },
      { lead: '10.', prompt: 'Choose an efficient grouping for 4, 2, and 5.', lines: ['4×(2×5)=___'], answers: [['40']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Practice products', [
      { label: '1', prompt: 'Order and group 2, 3, and 4.', equation: '2×(3×4) = 2×12', answer: '24' },
      { label: '2', prompt: 'Make a factor of 10.', equation: '3×(5×2) = 3×10', answer: '30' },
      { label: '3', prompt: 'Group the two 2s.', equation: '9×(2×2) = 9×4', answer: '36' },
      { label: '4', prompt: 'Make a factor of 10.', equation: '4×(2×5) = 4×10', answer: '40' }
    ], [
      { kind: 'array', label: '2 × (3 × 4)', rows: 2, columns: 12, item: 'dot', groupEveryColumns: 4, caption: 'Two rows show three groups of 4 in each row: 2×12=24.' },
      { kind: 'array', label: '3 × (5 × 2)', rows: 3, columns: 10, item: 'dot', groupEveryColumns: 2, caption: 'Three rows show five groups of 2 in each row: 3×10=30.' }
    ])
  },
  {
    key: 'v1-u2-l8-s5-problems-1-3', unit: 2, lesson: 8, session: 5, order: 1,
    label: 'Example + Problems 1–3', title: 'Apply factor order and grouping', printedPages: '213–214', viewerPage: 225,
    sourceMarkers: ['5 rows of cherry trees', '2 cities with wind turbines', '3 x 8 X 2', '4 x 6 = 24'],
    blankVisual: responseWorkspace('Refine order and grouping', [
      { lead: 'Example', prompt: 'Use 8×5 to find 5×8.', lines: ['5×8=___'], answers: [['40']] },
      { lead: '1.', prompt: 'Two cities each have 3 rows of 7 turbines.', lines: ['2×3×7=___'], answers: [['42']], openWorkspace: true },
      { lead: '2.', prompt: 'Find 3×8×2 efficiently.', lines: ['3×(8×2)=___'], answers: [['48']], openWorkspace: true },
      { lead: '3.', prompt: 'Choose the related fact to 4×6=24.', lines: ['Correct choice: ___'], answers: [['D']] }
    ]),
    solvedVisual: { title: 'Problems 1–3 solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Products', lines: ['5×8 and 8×5 both have product 40', '(2×3)×7=6×7=42 turbines', '3×(8×2)=3×16=48', 'D: 6×4=24'] }] }
  },
  {
    key: 'v1-u2-l8-s5-problems-4-6', unit: 2, lesson: 8, session: 5, order: 2,
    label: 'Problems 4–6', title: 'Complete a factor, classify equations, and solve the album context', printedPages: '215', viewerPage: 227,
    sourceMarkers: ['Lamont knows 9 x 7 = 63', 'equations are true', '2 photo albums', '8 pages', '4 pictures'],
    blankVisual: responseWorkspace('Problems 4–6', [
      { lead: '4.', prompt: 'Complete ?×9=63.', lines: ['missing factor = ___'], answers: [['7']] },
      { lead: '5.', prompt: 'Choose all true equations.', lines: ['Correct choices: ___, ___, ___'], answers: [['A', 'C', 'D']] },
      { lead: '6.', prompt: 'Two albums have 8 pages with 4 pictures per page.', lines: ['2×8×4=___'], answers: [['64']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Problems 4–6 solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Answers', lines: ['7×9=63', 'A, C, and D each have value 54', '2×8×4 = 16×4 = 64 pictures'] }] }
  },
  {
    key: 'v1-u2-l8-s5-problems-7-journal', unit: 2, lesson: 8, session: 5, order: 3,
    label: 'Problems 7–8', title: 'Select picture expressions and compare groupings', printedPages: '216', viewerPage: 228,
    sourceMarkers: ['3 rows of pictures', '7 pictures in each row', '3 x 2', 'Math Journal'],
    blankVisual: responseWorkspace('Final Lesson 8 problems', [
      { lead: '7.', prompt: 'Three rows have 7 pictures each. Choose every matching expression or array.', lines: ['product = ___', 'Correct choices: ___, ___, ___, ___'], answers: [['21'], ['A', 'B', 'D', 'E']], openWorkspace: true },
      { lead: '8. Math Journal', prompt: 'Use (3×2)×9=54 to find 3×(9×2).', lines: ['3×(9×2)=___'], answers: [['54']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Final Lesson 8 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Problem 7 · choices A, B, D, and E', rows: 3, columns: 7, item: 'dot', caption: '3×7 and 7×3 both have product 21; turning the matching array keeps all 21 pictures.' },
      { kind: 'equations', label: 'Math Journal', lines: ['(3×2)×9 = 6×9 = 54', '3×(9×2) = 3×18 = 54'] }
    ] }
  },
  {
    key: 'v1-u2-l9-s1-try-connect', unit: 2, lesson: 9, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Use tens to find 4 × 20', printedPages: '219–220', viewerPage: 231,
    sourceMarkers: ['4 stacks of books', '20 books', 'skip-count by ten 8 times', 'skip-count by twenty'],
    blankVisual: responseWorkspace('Four groups of twenty books', [
      { lead: 'Try It', prompt: 'Four stacks have 20 books each.', lines: ['4×20=___'], answers: [['80']], openWorkspace: true },
      { lead: 'Look Ahead', prompt: 'Complete the three place-value paths.', lines: ['count by 10: 10,20,30,40,___,___,___,___', 'count by 20: 20,40,60,___', '8 tens = ___'], answers: [['50', '60', '70', '80'], ['80'], ['80']] }
    ]),
    solvedVisual: { title: 'Four twenties make eight tens', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Skip-count', lines: ['10, 20, 30, 40, 50, 60, 70, 80', '20, 40, 60, 80', 'Four groups of 20 make 8 tens, or 80 books.'] },
      { kind: 'array', label: '4 × 2 tens', rows: 4, columns: 2, item: 'block', caption: 'Each item represents one ten; 8 tens is 80.' }
    ] }
  },
  {
    key: 'v1-u2-l9-s1-prepare', unit: 2, lesson: 9, session: 1, order: 2,
    label: 'Prepare', title: 'Skip-count to find 6 × 50', printedPages: '221', viewerPage: 233,
    sourceMarkers: ['Prepare for Using Place Value to Multiply', 'skip-counting to find 6 x 50'],
    blankVisual: { title: 'Prepare for Using Place Value to Multiply', sections: [
      { kind: 'official-organizer', label: '1. Complete the official skip-count organizer · Student Worktext p. 221', displayWidth: 860, centerLabel: 'skip-count', fields: [
        { label: 'What Is It?', ariaLabel: 'What skip-counting is', answer: 'Count by a number other than 1.', x: 0, y: 0, width: 50, height: 50 },
        { label: 'What I Know About It', ariaLabel: 'What I know about skip-counting', answer: 'I can use skip-counting to solve multiplication equations.', x: 50, y: 0, width: 50, height: 50 },
        { label: 'Examples', ariaLabel: 'Skip-count by five example', answer: '5, 10, 15, 20, 25, and so on.', x: 0, y: 50, width: 33.34, height: 50 },
        { label: 'Examples', ariaLabel: 'Skip-count with tens example', answer: '30, 60, 90, 120.', x: 33.33, y: 50, width: 33.34, height: 50 },
        { label: 'Examples', ariaLabel: 'Equal groups skip-count example', answer: '6, 12, 18; 3 × 6 = 18.', x: 66.66, y: 50, width: 33.34, height: 50 }
      ], caption: 'Use words, numbers, or pictures in the same official five-field organizer.' },
      { kind: 'source-response-workspace', label: '2. Skip-count by 50', wide: true, columns: 1, parts: [
        { lead: '2.', prompt: 'Use skip-counting to find 6×50.', lines: ['50,100,150,200,250,___'], lineAnswers: [['300']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }
      ] }
    ] },
    solvedVisual: { title: 'Prepare for Using Place Value to Multiply', sourceNote: supplementalVisualNote, sections: [
      { kind: 'official-organizer', label: '1. Teacher Guide possible answers · Student Worktext p. 221', displayWidth: 860, centerLabel: 'skip-count', fields: [
        { label: 'What Is It?', ariaLabel: 'What skip-counting is', answer: 'Count by a number other than 1.', x: 0, y: 0, width: 50, height: 50 },
        { label: 'What I Know About It', ariaLabel: 'What I know about skip-counting', answer: 'I can use skip-counting to solve multiplication equations.', x: 50, y: 0, width: 50, height: 50 },
        { label: 'Examples', ariaLabel: 'Skip-count by five example', answer: '5, 10, 15, 20, 25, and so on.', x: 0, y: 50, width: 33.34, height: 50 },
        { label: 'Examples', ariaLabel: 'Skip-count with tens example', answer: '30, 60, 90, 120.', x: 33.33, y: 50, width: 33.34, height: 50 },
        { label: 'Examples', ariaLabel: 'Equal groups skip-count example', answer: '6, 12, 18; 3 × 6 = 18.', x: 66.66, y: 50, width: 33.34, height: 50 }
      ], caption: 'The organizer layout and possible answers are verified in Teacher Guide Volume 1 pp. 376–377.' },
      { kind: 'equations', label: '2. Skip-count by 50', lines: ['50, 100, 150, 200, 250, 300', 'Six groups of 50 make 30 tens, or 300.'] }
    ] }
  },
  {
    key: 'v1-u2-l9-s1-practice', unit: 2, lesson: 9, session: 1, order: 3,
    label: 'Practice', title: 'Find prizes in six bags of thirty', printedPages: '222', viewerPage: 234,
    sourceMarkers: ['Ming fills 6 gift bags', '30 prizes', 'Check your answer'],
    blankVisual: responseWorkspace('Gift bag prizes', [{ lead: '3–4.', prompt: 'Six bags hold 30 prizes each.', lines: ['6×30=___'], answers: [['180']], openWorkspace: true }]),
    solvedVisual: { title: 'Six groups of three tens', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Place-value solution', lines: ['Rewrite 30 as 3×10: 6×(3×10).', '(6×3)×10 = 18×10 = 180 prizes'] }] }
  },
  {
    key: 'v1-u2-l9-s2-try-model', unit: 2, lesson: 9, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Find dashikis on four racks of forty', printedPages: '223–224', viewerPage: 235,
    sourceMarkers: ['4 racks of dashikis', '40 dashikis', '4 groups of 4 tens', '16 tens is 160'],
    blankVisual: responseWorkspace('Four racks of forty', [{ lead: 'Try It', prompt: 'Four racks hold 40 dashikis each.', lines: ['4×40=___'], answers: [['160']], openWorkspace: true }]),
    solvedVisual: { title: 'Multiply the nonzero digits, then tens', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '4 groups of 4 tens', rows: 4, columns: 4, item: 'block', caption: '16 tens is 160.' },
      { kind: 'equations', label: 'Grouping', lines: ['Rewrite 40 as 4×10: 4×(4×10).', '(4×4)×10 = 16×10 = 160'] }
    ] }
  },
  {
    key: 'v1-u2-l9-s2-connect-apply', unit: 2, lesson: 9, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Apply place-value multiplication with tens', printedPages: '225–226', viewerPage: 237,
    sourceMarkers: ['three multiplication expressions', '16 X 10', 'Find 60 x 8', '7 rolls of quarters', '7 x 30'],
    blankVisual: responseWorkspace('Connect and apply multiplying with tens', [
      { lead: '4.', prompt: 'Find 60×8.', lines: ['6×8=___', '60×8=___'], answers: [['48'], ['480']], openWorkspace: true },
      { lead: '5.', prompt: 'Seven rolls hold 40 quarters each.', lines: ['7×40=___'], answers: [['280']], openWorkspace: true },
      { lead: '6.', prompt: 'Find 7×30.', lines: ['7×3=___', '7×30=___'], answers: [['21'], ['210']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Tens products', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Solutions', lines: ['60×8 = (6×8)×10 = 48×10 = 480', '7×40 = (7×4)×10 = 28×10 = 280 quarters', '7×30 = (7×3)×10 = 21×10 = 210'] }] }
  },
  {
    key: 'v1-u2-l9-s2-practice', unit: 2, lesson: 9, session: 2, order: 3,
    label: 'Practice 1–8', title: 'Rewrite and multiply with tens', printedPages: '227–228', viewerPage: 239,
    sourceMarkers: ['Practice Multiplying with Tens', '3 jars of pickles', '50 pickles', 'match each problem', 'find 4 x 70'],
    blankVisual: responseWorkspace('Practice multiplying with tens', [
      { lead: '1–4.', prompt: 'Three jars hold 50 pickles each.', lines: ['50=5×___', '(3×5)×10=___×10=___'], answers: [['10'], ['15', '150']], openWorkspace: true },
      { lead: '5.', prompt: 'Match and evaluate the five official products.', lines: ['5×60=___', '6×40=___', '50×4=___', '6×30=___', '40×3=___'], answers: [['300'], ['240'], ['200'], ['180'], ['120']] },
      { lead: '6.', prompt: 'Write the equation shown by six groups of three tens.', lines: ['6×30=___'], answers: [['180']] },
      { lead: '7.', prompt: 'Use grouping to find 4×70.', lines: ['4×(7×10)=___×10=___'], answers: [['28', '280']], openWorkspace: true },
      { lead: '8.', prompt: 'Complete the official equation and show your work.', lines: ['6×20=___'], answers: [['120']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Practice tens solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Problem 6 · six groups of three tens', rows: 6, columns: 3, item: 'block', caption: 'Six groups of 30 make 18 tens, or 180.' },
      { kind: 'equations', label: 'Problems 1–8', lines: ['3×50=150 pickles', '5×60=300; 6×40=240; 50×4=200', '6×30=180; 40×3=120', '4×70=280', '6×20=6×(2×10)=(6×2)×10=120'] }
    ] }
  },
  {
    key: 'v1-u2-l9-s3-problems-1-3', unit: 2, lesson: 9, session: 3, order: 1,
    label: 'Example + Problems 1–3', title: 'Use place value in three official contexts', printedPages: '229–230', viewerPage: 241,
    sourceMarkers: ['9 firefighters in each row', '30 rows', '50 miles each day', 'rewrite', '8 plantains', '40 chips'],
    blankVisual: responseWorkspace('Refine place-value multiplication', [
      { lead: 'Example', prompt: 'Nine firefighters stand in each of 30 rows.', lines: ['9×30=___'], answers: [['270']] },
      { lead: '1.', prompt: 'Fifty miles each day for 5 days.', lines: ['5×50=___'], answers: [['250']], openWorkspace: true },
      { lead: '2.', prompt: 'Find 6×90.', lines: ['6×90=___'], answers: [['540']], openWorkspace: true },
      { lead: '3.', prompt: 'Eight plantains make 40 chips each.', lines: ['8×40=___', 'Correct choice: ___'], answers: [['320'], ['C']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Use place value to multiply by tens', [
      { label: 'E', prompt: 'Thirty is 3 tens. Multiply 9 groups of 3 tens.', equation: '9×30 = (9×3)×10 = 27×10', answer: '270 firefighters' },
      { label: '1', prompt: 'Fifty is 5 tens.', equation: '5×50 = (5×5)×10 = 25×10', answer: '250 miles' },
      { label: '2', prompt: 'Ninety is 9 tens.', equation: '6×90 = (6×9)×10 = 54×10', answer: '540' },
      { label: '3', prompt: 'Forty is 4 tens.', equation: '8×40 = (8×4)×10 = 32×10', answer: '320 chips; choice C' }
    ], [{ kind: 'number-line', label: 'Nine groups of 3 tens', ticks: [{ label: '0' }, { label: '30' }, { label: '60' }, { label: '90' }, { label: '120' }, { label: '150' }, { label: '180' }, { label: '210' }, { label: '240' }, { label: '270', target: true }], caption: 'Skip-count nine groups of 30 to reach 270.' }])
  },
  {
    key: 'v1-u2-l9-s3-problems-4-6', unit: 2, lesson: 9, session: 3, order: 2,
    label: 'Problems 4–6', title: 'Multiply by thirty and classify products equal to 240', printedPages: '231', viewerPage: 243,
    sourceMarkers: ['product 6 x 30', '60 bulbs', '2 boxes of string lights', 'equal to 240'],
    blankVisual: responseWorkspace('Problems 4–6', [
      { lead: '4.', prompt: 'Find 6×30.', lines: ['6×30=___'], answers: [['180']], openWorkspace: true },
      { lead: '5.', prompt: 'Two boxes each hold 3 sets of 60 bulbs.', lines: ['2×3×60=___', 'Correct choice: ___'], answers: [['360'], ['C']], openWorkspace: true },
      { lead: '6.', prompt: 'Choose every expression equal to 240.', lines: ['Correct choices: ___, ___, ___, ___'], answers: [['A', 'B', 'C', 'D']] }
    ]),
    solvedVisual: workedModel('Problems 4–6 solutions', [
      { label: '4', prompt: 'Thirty is 3 tens.', equation: '6×30 = (6×3)×10', answer: '180' },
      { label: '5', prompt: 'Find sets first, then multiply by 60.', equation: '(2×3)×60 = 6×60', answer: '360 bulbs; choice C' },
      { label: '6', prompt: 'Rewrite each multiple of ten with a basic fact.', equation: '40×6=240; 4×60=240; 30×8=240; 80×3=240', answer: 'Each product is 240' }
    ])
  },
  {
    key: 'v1-u2-l9-s3-problems-7-journal', unit: 2, lesson: 9, session: 3, order: 3,
    label: 'Problems 7–9', title: 'Solve notebook, nesting-doll, and journal products', printedPages: '232', viewerPage: 244,
    sourceMarkers: ['80 sheets of paper', '7 such notebooks', '8 dolls', '20 sets', 'multiplication facts and place value'],
    blankVisual: responseWorkspace('Final Lesson 9 problems', [
      { lead: '7.', prompt: 'Seven notebooks have 80 sheets each.', lines: ['7×80=___'], answers: [['560']], openWorkspace: true },
      { lead: '8.', prompt: 'Twenty sets have 8 nesting dolls each.', lines: ['20×8=___'], answers: [['160']], openWorkspace: true },
      { lead: '9. Math Journal', prompt: 'Use a basic fact and place value to find 8×80.', lines: ['8×8=___', '8×80=___'], answers: [['64'], ['640']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Final Lesson 9 solutions', [
      { label: '7', prompt: 'Eighty is 8 tens.', equation: '7×80 = (7×8)×10 = 56×10', answer: '560 sheets' },
      { label: '8', prompt: 'Twenty is 2 tens.', equation: '20×8 = (2×8)×10 = 16×10', answer: '160 dolls' },
      { label: '9', prompt: 'Use the basic fact 8×8.', equation: '8×80 = (8×8)×10 = 64×10', answer: '640' }
    ])
  },
  {
    key: 'v1-u2-l10-s1-models', unit: 2, lesson: 10, session: 1, order: 1,
    label: 'Model It', title: 'Interpret division as groups and items in each group', printedPages: '235–236', viewerPage: 247,
    sourceMarkers: ['8 slices of halloumi cheese', '2 equal groups', '10 slices of halloumi cheese', '2 slices on each plate'],
    blankVisual: responseWorkspace('Two meanings of division', [
      { lead: '1–3.', prompt: 'Share 8 slices equally across 2 plates.', lines: ['8÷2=___ slices per plate'], answers: [['4']], openWorkspace: true },
      { lead: '4–6.', prompt: 'Put 10 slices in groups of 2.', lines: ['10÷2=___ plates'], answers: [['5']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'The divisor can name groups or group size', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '8 shared into 2 groups', rows: 2, columns: 4, item: 'square', caption: '8÷2=4: two equal groups, four slices in each group.' },
      { kind: 'array', label: '10 separated into groups of 2', rows: 5, columns: 2, item: 'square', caption: '10÷2=5: two slices in each group, five equal groups.' }
    ] }
  },
  {
    key: 'v1-u2-l10-s1-prepare', unit: 2, lesson: 10, session: 1, order: 2,
    label: 'Prepare', title: 'Explain a model for 12 ÷ 3', printedPages: '237', viewerPage: 249,
    sourceMarkers: ['Prepare for Exploring', 'Troy draws a diagram', '12', '3'],
    blankVisual: { title: 'Prepare for Exploring the Meaning of Division', sections: [
      { kind: 'official-organizer', variant: 'four-quadrant', label: '1. Complete the official divide organizer · Student Worktext p. 237', displayWidth: 860, centerLabel: 'divide', fields: [
        { label: 'My Definition', ariaLabel: 'My definition of divide', answer: 'Separate objects into equal groups.', x: 0, y: 0, width: 50, height: 50 },
        { label: 'My Illustrations', ariaLabel: 'My illustration of division', answer: '15 objects can make 5 groups of 3 or 3 groups of 5: 15÷5=3 and 15÷3=5.', x: 50, y: 0, width: 50, height: 50 },
        { label: 'Examples', ariaLabel: 'Examples of division', answer: '10÷5=2 and 10÷2=5.', x: 0, y: 50, width: 50, height: 50 },
        { label: 'Non-Examples', ariaLabel: 'Non-examples of division', answer: '3×6=18 is multiplication; unequal groups are not a division model.', x: 50, y: 50, width: 50, height: 50 }
      ], caption: 'Use words, numbers, or pictures in the same official four-quadrant organizer.' },
      { kind: 'source-response-workspace', label: '2. Explain Troy’s diagram', wide: true, columns: 1, parts: [
        { lead: '2.', prompt: 'Troy shows 12 objects in groups of 3. Explain how his diagram solves 12÷3.', lines: ['12÷3=___ groups'], lineAnswers: [['4']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }
      ] }
    ] },
    solvedVisual: { title: 'Prepare for Exploring the Meaning of Division', sourceNote: supplementalVisualNote, sections: [
      { kind: 'official-organizer', variant: 'four-quadrant', label: '1. Teacher Guide possible answers · Student Worktext p. 237', displayWidth: 860, centerLabel: 'divide', fields: [
        { label: 'My Definition', ariaLabel: 'My definition of divide', answer: 'Separate objects into equal groups.', x: 0, y: 0, width: 50, height: 50 },
        { label: 'My Illustrations', ariaLabel: 'My illustration of division', answer: '15 objects can make 5 groups of 3 or 3 groups of 5: 15÷5=3 and 15÷3=5.', x: 50, y: 0, width: 50, height: 50 },
        { label: 'Examples', ariaLabel: 'Examples of division', answer: '10÷5=2 and 10÷2=5.', x: 0, y: 50, width: 50, height: 50 },
        { label: 'Non-Examples', ariaLabel: 'Non-examples of division', answer: '3×6=18 is multiplication; unequal groups are not a division model.', x: 50, y: 50, width: 50, height: 50 }
      ], caption: 'The organizer layout and possible answers are verified in Teacher Guide Volume 1 pp. 400–401.' },
      { kind: 'array', label: '2. Troy’s diagram · 4 groups of 3', rows: 4, columns: 3, item: 'dot', caption: 'Count the four equal groups to find 12÷3=4.' }
    ] }
  },
  {
    key: 'v1-u2-l10-s1-practice', unit: 2, lesson: 10, session: 1, order: 3,
    label: 'Practice', title: 'Group twelve grape leaves by four', printedPages: '238', viewerPage: 250,
    sourceMarkers: ['Savanna makes 12 stuffed grape leaves', '4 grape leaves on each plate', 'How many plates'],
    blankVisual: responseWorkspace('Stuffed grape leaves', [{ lead: '3–5.', prompt: 'Put 12 leaves in groups of 4.', lines: ['12÷4=___ plates'], answers: [['3']], openWorkspace: true }]),
    solvedVisual: { title: 'Three plates of four', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Draw groups of four leaves', rows: 3, columns: 4, item: 'dot', caption: 'The 12 leaves separate into three equal plates.' },
      { kind: 'equations', label: 'Complete the division equation', lines: ['12 leaves in all', '4 leaves in each group', '3 equal groups', '12÷4=3 plates'] }
    ] }
  },
  {
    key: 'v1-u2-l10-s2-equal-groups', unit: 2, lesson: 10, session: 2, order: 1,
    label: 'Model It · Equal Groups', title: 'Interpret 24 ÷ 6 in two ways', printedPages: '239', viewerPage: 251,
    sourceMarkers: ['24 oranges', '6 oranges in each bag', '24 oranges in 6 bags', 'division equation'],
    blankVisual: responseWorkspace('Two models for 24÷6', [
      { lead: '1.', prompt: 'Put 24 oranges in groups of 6.', lines: ['24÷6=___ bags'], answers: [['4']], openWorkspace: true },
      { lead: '2.', prompt: 'Share 24 oranges equally among 6 bags.', lines: ['24÷6=___ oranges per bag'], answers: [['4']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Same equation, different meaning for six', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Share among 6 bags', rows: 6, columns: 4, item: 'circle', caption: 'Six equal bags contain four oranges each.' },
      { kind: 'equations', label: 'Make groups of 6', lines: ['24÷6=4 bags when 6 means oranges in each bag.', '24÷6=4 oranges per bag when 6 means the number of bags.'] }
    ] }
  },
  {
    key: 'v1-u2-l10-s2-arrays-connect', unit: 2, lesson: 10, session: 2, order: 2,
    label: 'Model It · Arrays + Connect It', title: 'Use arrays to model division', printedPages: '240', viewerPage: 252,
    sourceMarkers: ['array to show 20', 'different array', '42', 'division equation'],
    blankVisual: responseWorkspace('Array models for division', [
      { lead: '3–4.', prompt: 'Draw two arrays for 20÷5=4.', lines: ['20÷5=___'], answers: [['4']], openWorkspace: true },
      { lead: '6.', prompt: 'Use any model to find 42÷7.', lines: ['42÷7=___'], answers: [['6']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Division arrays', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '20 ÷ 5', rows: 5, columns: 4, item: 'dot', caption: 'Five equal rows have four in each row.' },
      { kind: 'array', label: '42 ÷ 7', rows: 7, columns: 6, item: 'dot', caption: 'Seven equal rows have six in each row.' }
    ] }
  },
  {
    key: 'v1-u2-l10-s2-practice', unit: 2, lesson: 10, session: 2, order: 3,
    label: 'Practice 1–7', title: 'Read and create division models', printedPages: '241–242', viewerPage: 253,
    sourceMarkers: ['Practice Using Division Models', '8 frogs', '20 students', 'array of 18 rectangles', '30'],
    blankVisual: responseWorkspace('Practice division models', [
      { lead: '1–4.', prompt: 'Read the official model of 8 frogs on 4 logs.', lines: ['frogs total: ___', 'logs: ___', 'frogs per log: ___', '8÷4=___'], answers: [['8'], ['4'], ['2'], ['2']] },
      { lead: '5.', prompt: 'Twenty students form groups of 4.', lines: ['20÷4=___ groups'], answers: [['5']], openWorkspace: true },
      { lead: '6.', prompt: 'Correct the division equation for an array of 18 rectangles with 3 in each group.', lines: ['18÷3=___'], answers: [['6']], openWorkspace: true },
      { lead: '7.', prompt: 'Write a story problem for 30÷5=6.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Practice solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '8 frogs on 4 logs', rows: 4, columns: 2, item: 'circle', caption: '8÷4=2 frogs per log.' },
      { kind: 'array', label: '20 students', rows: 5, columns: 4, item: 'dot', caption: '20÷4=5 groups.' },
      { kind: 'note', label: 'Problem 6', text: 'The total is 18, not 6. A matching equation is 18÷3=6.' }
    ] }
  },
  {
    key: 'v1-u2-l10-s3-apply', unit: 2, lesson: 10, session: 3, order: 1,
    label: 'Apply It 1–3', title: 'Explain, write, and compare division situations', printedPages: '243', viewerPage: 255,
    sourceMarkers: ['Yuko draws this array of stars', 'story problem', '16', 'prickly pears', 'equal groups'],
    blankVisual: responseWorkspace('Apply ideas about division', [
      { lead: '1.', prompt: 'Explain the error in Yuko’s array model.', lines: [], openWorkspace: true },
      { lead: '2.', prompt: 'Write a story problem for 16÷2=8.', lines: [], openWorkspace: true },
      { lead: '3.', prompt: 'Compare the two official prickly-pear groupings.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Division explanations', sourceNote: supplementalVisualNote, sections: [
      { kind: 'note', label: 'Problem 1', text: 'Yuko drew 32 stars, or 8×4. To model 8÷4, the total number of stars must be 8.' },
      { kind: 'array', label: '16 ÷ 2', rows: 2, columns: 8, item: 'circle', caption: 'One valid story shares 16 objects equally between 2 groups, giving 8 per group.' },
      { kind: 'array', label: 'Problem 3 · 21 prickly pears', rows: 3, columns: 7, item: 'circle', splitAfterRows: 1, caption: 'Both boxes have 21 pears. One divides them into 3 groups of 7; the other divides them into 7 groups of 3.' }
    ] }
  },
  {
    key: 'v1-u2-l10-s3-problem-journal', unit: 2, lesson: 10, session: 3, order: 2,
    label: 'Problem 4 + Math Journal', title: 'Create a division situation and model 45 ÷ 9', printedPages: '244', viewerPage: 256,
    sourceMarkers: ['20 almonds', 'same number of almonds', '45', '9', 'equal groups'],
    blankVisual: responseWorkspace('Refine division meaning', [
      { lead: '4.', prompt: 'Write and solve a division problem using 20 almonds.', lines: [], openWorkspace: true },
      { lead: 'Math Journal', prompt: 'Model 45÷9 in two ways.', lines: ['45÷9=___'], answers: [['5']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Two meanings for 45÷9', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Nine equal groups', rows: 9, columns: 5, item: 'dot', caption: 'Sharing 45 across 9 groups gives 5 in each group.' },
      { kind: 'array', label: 'Groups of nine', rows: 5, columns: 9, item: 'dot', caption: 'Separating 45 into groups of 9 makes 5 groups.' }
    ] }
  },
  {
    key: 'v1-u2-l11-s1-models', unit: 2, lesson: 11, session: 1, order: 1,
    label: 'Model It', title: 'Write related equations for arrays', printedPages: '247–248', viewerPage: 259,
    sourceMarkers: ['pennies in the space', 'break your array into 4 equal groups', '20 stickers on 5 pages', 'division equation'],
    blankVisual: responseWorkspace('Connect multiplication and division', [
      { lead: '1–2.', prompt: 'Use an array with 4 rows of 3 pennies.', lines: ['4×3=___', '12÷4=___'], answers: [['12'], ['3']], openWorkspace: true },
      { lead: '3–4.', prompt: 'Share 20 stickers equally across 5 pages.', lines: ['20÷5=___', '5×___=20'], answers: [['4'], ['4']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'An array connects both operations', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '4 rows of 3', rows: 4, columns: 3, item: 'dot', caption: '4×3=12, 12÷4=3, and 12÷3=4.' },
      { kind: 'array', label: '5 pages of 4', rows: 5, columns: 4, item: 'square', caption: '5×4=20 and 20÷5=4.' }
    ] }
  },
  {
    key: 'v1-u2-l11-s1-prepare', unit: 2, lesson: 11, session: 1, order: 2,
    label: 'Prepare', title: 'Write related equations for an official array', printedPages: '249', viewerPage: 261,
    sourceMarkers: ['Think about what you know about division', 'multiplication equation and a division equation', 'array'],
    blankVisual: { title: 'Prepare for Exploring How Multiplication and Division Are Connected', sections: [
      { kind: 'official-organizer', label: '1. Complete the official quotient organizer · Student Worktext p. 249', displayWidth: 860, centerLabel: 'quotient', fields: [
        { label: 'What Is It?', ariaLabel: 'What a quotient is', answer: 'The result of a division problem.', x: 0, y: 0, width: 50, height: 50 },
        { label: 'What I Know About It', ariaLabel: 'What I know about quotients', answer: 'The quotient can be the number of groups or the number of objects in each group.', x: 50, y: 0, width: 50, height: 50 },
        { label: 'Examples', ariaLabel: 'Equation quotient example', answer: '8÷2=4; the quotient is 4.', x: 0, y: 50, width: 33.34, height: 50 },
        { label: 'Examples', ariaLabel: 'Equal groups quotient example', answer: '6÷3=2; the quotient is 2.', x: 33.33, y: 50, width: 33.34, height: 50 },
        { label: 'Examples', ariaLabel: 'Story quotient example', answer: 'Ten items in 2 groups means 5 items in each group.', x: 66.66, y: 50, width: 33.34, height: 50 }
      ], caption: 'Use words, numbers, or pictures in the same official five-field organizer.' },
      { kind: 'source-response-workspace', label: '2. Read the printed 3-by-6 array', wide: true, columns: 1, parts: [
        { lead: '2.', prompt: 'Write one multiplication and one division equation for the printed array.', lines: ['3×6=___', '18÷3=___'], lineAnswers: [['18'], ['6']], printedLineCount: 4, interactiveLines: true, openWorkspace: true }
      ] }
    ] },
    solvedVisual: { title: 'Prepare for Exploring How Multiplication and Division Are Connected', sourceNote: supplementalVisualNote, sections: [
      { kind: 'official-organizer', label: '1. Teacher Guide possible answers · Student Worktext p. 249', displayWidth: 860, centerLabel: 'quotient', fields: [
        { label: 'What Is It?', ariaLabel: 'What a quotient is', answer: 'The result of a division problem.', x: 0, y: 0, width: 50, height: 50 },
        { label: 'What I Know About It', ariaLabel: 'What I know about quotients', answer: 'The quotient can be the number of groups or the number of objects in each group.', x: 50, y: 0, width: 50, height: 50 },
        { label: 'Examples', ariaLabel: 'Equation quotient example', answer: '8÷2=4; the quotient is 4.', x: 0, y: 50, width: 33.34, height: 50 },
        { label: 'Examples', ariaLabel: 'Equal groups quotient example', answer: '6÷3=2; the quotient is 2.', x: 33.33, y: 50, width: 33.34, height: 50 },
        { label: 'Examples', ariaLabel: 'Story quotient example', answer: 'Ten items in 2 groups means 5 items in each group.', x: 66.66, y: 50, width: 33.34, height: 50 }
      ], caption: 'The organizer layout and possible answers are verified in Teacher Guide Volume 1 pp. 416–417.' },
      { kind: 'array', label: '2. Printed array', rows: 3, columns: 6, item: 'dot', caption: '3×6=18 and 18÷3=6.' }
    ] }
  },
  {
    key: 'v1-u2-l11-s1-practice', unit: 2, lesson: 11, session: 1, order: 3,
    label: 'Practice', title: 'Relate equations for twenty-one stickers', printedPages: '250', viewerPage: 262,
    sourceMarkers: ['Amber collects flower stickers', '21 stickers', '7 pages', 'multiplication doing the reverse'],
    blankVisual: responseWorkspace('Twenty-one stickers on seven pages', [{ lead: '3–5.', prompt: 'Share 21 stickers equally across 7 pages and write both equations.', lines: ['21÷7=___', '7×___=21'], answers: [['3'], ['3']], openWorkspace: true }]),
    solvedVisual: { title: 'Seven pages of three', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Share 21 stickers across 7 pages', rows: 7, columns: 3, item: 'dot', caption: 'Each page receives 3 stickers.' },
      { kind: 'equations', label: 'Division and its reverse', lines: ['21÷7=3', '7×3=21', 'Multiplication puts the seven equal groups together to recover the total.'] }
    ] }
  },
  {
    key: 'v1-u2-l11-s2-situation-facts', unit: 2, lesson: 11, session: 2, order: 1,
    label: 'Model It', title: 'Use multiplication to solve division', printedPages: '251–252', viewerPage: 263,
    sourceMarkers: ['18 strings of worry beads', '3 strings', 'division equation', '24', '54', 'numbers 7, 8, and 56'],
    blankVisual: responseWorkspace('Related multiplication and division facts', [
      { lead: '1–3.', prompt: 'Eighteen strings are displayed 3 per case.', lines: ['18÷3=___', '3×___=18'], answers: [['6'], ['6']], openWorkspace: true },
      { lead: '4–5.', prompt: 'Complete the related official facts.', lines: ['24÷3=___; 3×___=24', '___×6=54; 54÷___=9'], answers: [['8', '8'], ['9', '6']] },
      { lead: '7.', prompt: 'Use 7, 8, and 56 to write a fact family.', lines: ['7×8=___', '8×7=___', '56÷7=___', '56÷8=___'], answers: [['56'], ['56'], ['8'], ['7']] }
    ]),
    solvedVisual: { title: 'Fact families', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '18 ÷ 3', rows: 6, columns: 3, item: 'dot', caption: 'Six cases hold three strings each.' },
      { kind: 'equations', label: 'Related facts', lines: ['24÷3=8 and 3×8=24', '9×6=54 and 54÷6=9', '7×8=56, 8×7=56, 56÷7=8, 56÷8=7'] }
    ] }
  },
  {
    key: 'v1-u2-l11-s2-practice', unit: 2, lesson: 11, session: 2, order: 2,
    label: 'Practice 1–12', title: 'Complete related multiplication and division equations', printedPages: '253–254', viewerPage: 265,
    sourceMarkers: ['Practice How Multiplication', '15 guavas', '3 baskets', '18 fish', '6 x 7 = 42'],
    blankVisual: responseWorkspace('Practice related facts', [
      { lead: '1–5.', prompt: 'Share 15 guavas among 3 baskets.', lines: ['15÷3=___', '3×___=15'], answers: [['5'], ['5']], openWorkspace: true },
      { lead: '6–8.', prompt: 'Use 3, 6, and 18.', lines: ['18÷6=___', '18÷3=___', '3×6=___; 6×3=___'], answers: [['3'], ['6'], ['18', '18']] },
      { lead: '9–12.', prompt: 'Complete the fact family for 6×7=42.', lines: ['7×6=___', '42÷7=___', '42÷6=___'], answers: [['42'], ['6'], ['7']] }
    ]),
    solvedVisual: { title: 'Practice fact families', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '15 guavas', rows: 3, columns: 5, item: 'circle', caption: '15÷3=5 and 3×5=15.' },
      { kind: 'equations', label: 'Answers', lines: ['18÷6=3; 18÷3=6; 3×6=18; 6×3=18', '6×7=42; 7×6=42; 42÷6=7; 42÷7=6'] }
    ] }
  },
  {
    key: 'v1-u2-l11-s3-apply', unit: 2, lesson: 11, session: 3, order: 1,
    label: 'Apply It 1–3', title: 'Identify and analyze related equations', printedPages: '255', viewerPage: 267,
    sourceMarkers: ['Hopi plants', '63', '7', 'Hass avocados', '4 bags', '6 Hass avocados'],
    blankVisual: responseWorkspace('Apply multiplication and division connections', [
      { lead: '1.', prompt: 'Write two multiplication and two division equations for the flower-pot picture.', lines: [], openWorkspace: true },
      { lead: '2.', prompt: 'Use multiplication to solve 63÷?=7.', lines: ['7×___=63', '63÷___=7'], answers: [['9'], ['9']], openWorkspace: true },
      { lead: '3.', prompt: 'Analyze 4 bags with 6 avocados each.', lines: ['4×6=___', '24÷4=___', '24÷6=___'], answers: [['24'], ['6'], ['4']] }
    ]),
    solvedVisual: { title: 'Apply related facts', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Hopi flowers · 4 pots of 3', rows: 4, columns: 3, item: 'circle', caption: '4×3=12, 3×4=12, 12÷3=4, and 12÷4=3.' },
      { kind: 'array', label: 'Four bags of six', rows: 4, columns: 6, item: 'circle', caption: '4×6=24, 6×4=24, 24÷4=6, and 24÷6=4.' },
      { kind: 'equations', label: 'Unknown group count', lines: ['7×9=63, so 63÷9=7.'] }
    ] }
  },
  {
    key: 'v1-u2-l11-s3-problem-journal', unit: 2, lesson: 11, session: 3, order: 2,
    label: 'Problem 4 + Math Journal', title: 'Model and solve related division equations', printedPages: '256', viewerPage: 268,
    sourceMarkers: ['division equation 15', 'multiplication equation', '35', '7', 'story problem'],
    blankVisual: responseWorkspace('Refine operation connections', [
      { lead: '4.', prompt: 'Use multiplication to solve 15÷5.', lines: ['5×___=15', '15÷5=___'], answers: [['3'], ['3']], openWorkspace: true },
      { lead: 'Math Journal', prompt: 'Write and solve a story for 35÷7.', lines: ['7×___=35', '35÷7=___'], answers: [['5'], ['5']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Related-equation solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '15 ÷ 5', rows: 5, columns: 3, item: 'dot', caption: '5×3=15, so 15÷5=3.' },
      { kind: 'array', label: '35 ÷ 7', rows: 7, columns: 5, item: 'dot', caption: '7×5=35, so 35÷7=5.' }
    ] }
  },
  {
    key: 'v1-u2-l12-s1-try-connect', unit: 2, lesson: 12, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Build multiplication and division fact families', printedPages: '259–260', viewerPage: 271,
    sourceMarkers: ['24 sepak takraw balls', '3 bags', 'Fact families for multiplication and division', 'same three numbers'],
    blankVisual: responseWorkspace('Use one fact to find the whole family', [
      { lead: 'Try It', prompt: 'Share 24 balls equally among 3 bags.', lines: ['24÷3=___', '3×___=24'], answers: [['8'], ['8']], openWorkspace: true },
      { lead: 'Look Ahead', prompt: 'Complete the fact family for 6, 9, and 54.', lines: ['6×9=___', '9×6=___', '54÷6=___', '54÷9=___'], answers: [['54'], ['54'], ['9'], ['6']] }
    ]),
    solvedVisual: { title: 'Related facts use the same three numbers', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '24 balls', rows: 3, columns: 8, item: 'circle', caption: '3×8=24, 8×3=24, 24÷3=8, and 24÷8=3.' },
      { kind: 'array', label: '6 by 9', rows: 6, columns: 9, item: 'dot', caption: '6×9=54, 9×6=54, 54÷6=9, and 54÷9=6.' }
    ] }
  },
  {
    key: 'v1-u2-l12-s1-prepare', unit: 2, lesson: 12, session: 1, order: 2,
    label: 'Prepare', title: 'Use a fact family to find 32 ÷ 8', printedPages: '261', viewerPage: 273,
    sourceMarkers: ['Prepare for Multiplication and Division Facts', 'fact families to help find 32'],
    blankVisual: responseWorkspace('Prepare with a known multiplication fact', [{ lead: '2.', prompt: 'Use a fact family to find 32÷8.', lines: ['8×___=32', '32÷8=___'], answers: [['4'], ['4']], openWorkspace: true }]),
    solvedVisual: { title: 'The known factor is the quotient', sourceNote: supplementalVisualNote, sections: [{ kind: 'array', label: '32 ÷ 8', rows: 8, columns: 4, item: 'dot', caption: '8×4=32, so 32÷8=4.' }] }
  },
  {
    key: 'v1-u2-l12-s1-practice', unit: 2, lesson: 12, session: 1, order: 3,
    label: 'Practice', title: 'Share twenty-eight bikes among four racks', printedPages: '262', viewerPage: 274,
    sourceMarkers: ['28 bikes at the playground', '4 bike racks', 'How many bikes'],
    blankVisual: responseWorkspace('Bikes in equal racks', [{ lead: '3–4.', prompt: 'Share 28 bikes equally among 4 racks.', lines: ['28÷4=___'], answers: [['7']], openWorkspace: true }]),
    solvedVisual: { title: 'Four racks of seven', sourceNote: supplementalVisualNote, sections: [{ kind: 'array', label: '28 ÷ 4', rows: 4, columns: 7, item: 'circle', caption: '4×7=28, so 28÷4=7 bikes per rack.' }] }
  },
  {
    key: 'v1-u2-l12-s2-try-model', unit: 2, lesson: 12, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Find an unknown team size', printedPages: '263–264', viewerPage: 275,
    sourceMarkers: ['5 sled dog teams', '40 sled dogs', 'Skip-count by fives', 'multiplication facts for 5'],
    blankVisual: responseWorkspace('Forty dogs in five equal teams', [{ lead: 'Try It', prompt: 'Share 40 sled dogs among 5 teams.', lines: ['40÷5=___'], answers: [['8']], openWorkspace: true }]),
    solvedVisual: { title: 'Count five at a time or use a known fact', sourceNote: supplementalVisualNote, sections: [
      { kind: 'number-line', label: 'Eight jumps of five', ticks: [{ label: '0' }, { label: '5' }, { label: '10' }, { label: '15' }, { label: '20' }, { label: '25' }, { label: '30' }, { label: '35' }, { label: '40', target: true }], caption: 'Eight jumps reach 40.' },
      { kind: 'equations', label: 'Fact family', lines: ['5×8=40', '8×5=40', '40÷5=8', '40÷8=5'] }
    ] }
  },
  {
    key: 'v1-u2-l12-s2-connect-apply', unit: 2, lesson: 12, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Complete unknown division facts', printedPages: '265–266', viewerPage: 277,
    sourceMarkers: ['same fact family as 8 x 5 = 40', 'number line to solve 24', 'Write the unknown product', 'Enrico'],
    blankVisual: responseWorkspace('Connect and apply fact families', [
      { lead: 'Connect It', prompt: 'Write the full family for 8, 5, and 40.', lines: ['8×5=___', '5×8=___', '40÷5=___', '40÷8=___'], answers: [['40'], ['40'], ['8'], ['5']] },
      { lead: '4.', prompt: 'Use the number line to solve 24÷4.', lines: ['24÷4=___'], answers: [['6']], openWorkspace: true },
      { lead: '5.', prompt: 'Complete the family for 2, 3, and 6.', lines: ['2×3=___', '3×2=___', '6÷2=___', '6÷3=___'], answers: [['6'], ['6'], ['3'], ['2']] },
      { lead: '6.', prompt: 'Find the total in ?÷3=7 and write both multiplication facts.', lines: ['3×7=___', '7×3=___'], answers: [['21'], ['21']] }
    ]),
    solvedVisual: { title: 'Unknown facts completed', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Answers', lines: ['8×5=40; 5×8=40; 40÷5=8; 40÷8=5', '24÷4=6', '2×3=6; 3×2=6; 6÷2=3; 6÷3=2', '3×7=21 and 7×3=21, so 21÷3=7'] }] }
  },
  {
    key: 'v1-u2-l12-s2-practice', unit: 2, lesson: 12, session: 2, order: 3,
    label: 'Practice 1–9', title: 'Write and use complete fact families', printedPages: '267–268', viewerPage: 279,
    sourceMarkers: ['Practice Working with Division Facts', '15 fish', '4 x 9 = 36', '18 squares', '24 trading cards'],
    blankVisual: responseWorkspace('Practice division fact families', [
      { lead: '1–4.', prompt: 'Complete the families for 3, 5, 15 and 4, 9, 36.', lines: ['3×5=___; 15÷3=___; 15÷5=___', '4×9=___; 36÷4=___; 36÷9=___'], answers: [['15', '5', '3'], ['36', '9', '4']] },
      { lead: '5–6.', prompt: 'Read the official equal groups and 3-by-6 array.', lines: ['Problem 5 choice: ___', '18÷3=___; 18÷6=___'], answers: [['C'], ['6', '3']] },
      { lead: '7–9.', prompt: 'Twenty-four cards are given 8 to each friend.', lines: ['24÷8=___', '24÷3=___', '8×3=___; 3×8=___'], answers: [['3'], ['8'], ['24', '24']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Practice fact-family solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Families', lines: ['3×5=15; 5×3=15; 15÷3=5; 15÷5=3', '4×9=36; 9×4=36; 36÷4=9; 36÷9=4', '18÷2=9; choice C', '18÷3=6 and 18÷6=3', '24÷8=3; 24÷3=8; 8×3=24; 3×8=24'] }
    ] }
  },
  {
    key: 'v1-u2-l12-s3-table-model', unit: 2, lesson: 12, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Use a multiplication table to find unknowns', printedPages: '269–270', viewerPage: 281,
    sourceMarkers: ['Complete the facts', 'multiplication table', 'row for', 'fact family'],
    blankVisual: responseWorkspace('Read products and factors from the table', [{ lead: 'Try It', prompt: 'Complete the four official facts.', lines: ['2×___=10', '24÷6=___', '___×6=48', '___÷1=8'], answers: [['5'], ['4'], ['8'], ['8']] }]),
    solvedVisual: workedModel('Trace row and column to the product', [
      { label: '1', prompt: 'Find 10 in row 2, then read the column factor.', equation: '2×5', answer: '10' },
      { label: '2', prompt: 'Find 24 in row 6.', equation: '24÷6', answer: '4' },
      { label: '3', prompt: 'Find 48 in column 6.', equation: '8×6', answer: '48' },
      { label: '4', prompt: 'A number divided by 1 stays the same.', equation: '8÷1', answer: '8' }
    ], [multiplicationTableSection([10, 24, 48, 8])])
  },
  {
    key: 'v1-u2-l12-s3-connect-apply', unit: 2, lesson: 12, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'Use the table for fact families and sharing', printedPages: '271–272', viewerPage: 283,
    sourceMarkers: ['numbers in the shaded row', 'fact family that includes', '56', 'California poppies'],
    blankVisual: responseWorkspace('Connect and apply table lookup', [
      { lead: '4.', prompt: 'Write the family containing 42 and 6.', lines: ['6×7=___', '7×6=___', '42÷6=___', '42÷7=___'], answers: [['42'], ['42'], ['7'], ['6']] },
      { lead: '5.', prompt: 'Fill the blank in 56÷?=8.', lines: ['56÷___=8'], answers: [['7']] },
      { lead: '6.', prompt: 'Choose facts that find each person’s share of 16 poppies.', lines: ['Correct choices: ___, ___, ___'], answers: [['B', 'C', 'E']] }
    ]),
    solvedVisual: workedModel('Table-lookup solutions', [
      { label: '4', prompt: 'The row and column factors around 42 are 6 and 7.', equation: '6×7=42 · 7×6=42 · 42÷6=7 · 42÷7=6', answer: 'Complete fact family' },
      { label: '5', prompt: 'Find 56 in row 8 or column 8.', equation: '56÷7', answer: '8' },
      { label: '6', prompt: 'Use the product 16 and factors 2 and 8.', equation: '2×8=16 · 16÷2=8 · 16÷8=2', answer: 'Choices B, C, and E' }
    ], [multiplicationTableSection([42, 56, 16])])
  },
  {
    key: 'v1-u2-l12-s3-practice', unit: 2, lesson: 12, session: 3, order: 3,
    label: 'Practice 1–6', title: 'Find complete families in the multiplication table', printedPages: '273–274', viewerPage: 285,
    sourceMarkers: ['Practice Using a Multiplication Table', '6, 4, and 24', 'Find 21', '28', '42'],
    blankVisual: responseWorkspace('Practice multiplication-table families', [
      { lead: '1–3.', prompt: 'Complete families for 6,4,24 and 7,3,21.', lines: ['6×4=___; 24÷6=___; 24÷4=___', '7×3=___; 21÷7=___; 21÷3=___'], answers: [['24', '4', '6'], ['21', '3', '7']] },
      { lead: '4–6.', prompt: 'Write families for 28÷4, 6×?=42, and ?÷6=8.', lines: ['28÷4=___', '6×___=42', '___÷6=8'], answers: [['7'], ['7'], ['48']] }
    ]),
    solvedVisual: workedModel('Practice table solutions', [
      { label: '1', prompt: 'Locate 24 where 4 and 6 meet.', equation: '4×6=24 · 24÷4=6 · 24÷6=4', answer: '4, 6, and 24' },
      { label: '2', prompt: 'Locate 21 where 3 and 7 meet.', equation: '3×7=21 · 21÷3=7 · 21÷7=3', answer: '3, 7, and 21' },
      { label: '3', prompt: 'Use the same row-column-product pattern.', equation: '4×7=28 · 6×7=42 · 6×8=48', answer: 'Families 4-7-28, 6-7-42, and 6-8-48' }
    ], [multiplicationTableSection([24, 21, 28, 42, 48])])
  },
  {
    key: 'v1-u2-l12-s4-problems-1-3', unit: 2, lesson: 12, session: 4, order: 1,
    label: 'Example + Problems 1–3', title: 'Solve unknown products, factors, and quotients', printedPages: '275–276', viewerPage: 287,
    sourceMarkers: ['speeches done in 15 minutes', '35', '4 x 9', '30 players', '6 players'],
    blankVisual: responseWorkspace('Refine multiplication and division facts', [
      { lead: 'Example', prompt: 'Fifteen minutes with 3 minutes per speech.', lines: ['15÷3=___'], answers: [['5']] },
      { lead: '1.', prompt: 'Solve 35÷?=5.', lines: ['missing divisor = ___'], answers: [['7']], openWorkspace: true },
      { lead: '2.', prompt: 'Complete 4×9.', lines: ['4×9=___'], answers: [['36']], openWorkspace: true },
      { lead: '3.', prompt: 'Thirty players form teams of 6.', lines: ['30÷6=___', 'Correct choice: ___'], answers: [['5'], ['B']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Problems 1–3 solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Answers', lines: ['3×5=15, so 15÷3=5', '5×7=35, so 35÷7=5', '4×9=36', '30÷6=5 teams; choice B'] }] }
  },
  {
    key: 'v1-u2-l12-s4-problems-4-6', unit: 2, lesson: 12, session: 4, order: 2,
    label: 'Problems 4–6', title: 'Select related facts and test the number eight', printedPages: '277', viewerPage: 289,
    sourceMarkers: ['same fact family as 12', 'fact can you use', 'Does putting', 'make each equation true'],
    blankVisual: responseWorkspace('Problems 4–6', [
      { lead: '4.', prompt: 'Choose the equation in the family for 12÷?=4.', lines: ['Correct choice: ___'], answers: [['C']] },
      { lead: '5.', prompt: 'Choose a fact that solves ?÷5=4.', lines: ['Correct choice: ___', 'unknown total = ___'], answers: [['B'], ['20']] },
      { lead: '6.', prompt: 'Classify the four equations after inserting 8.', lines: ['answers: ___, ___, ___, ___'], answers: [['no', 'yes', 'no', 'yes']] }
    ]),
    solvedVisual: { title: 'Problems 4–6 solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Answers', lines: ['C: 3×4=12', 'B: 4×5=20', '9×8 is not 64', '6×8=48', '56÷8 is not 8', '32÷8=4'] }] }
  },
  {
    key: 'v1-u2-l12-s4-problems-7-journal', unit: 2, lesson: 12, session: 4, order: 3,
    label: 'Problems 7–9', title: 'Use repeated factors and solve the pita-bread context', printedPages: '278', viewerPage: 290,
    sourceMarkers: ['fact families have only one multiplication equation', '32 pita breads', '4 pita breads', 'MATH JOURNAL'],
    blankVisual: responseWorkspace('Final Lesson 12 problems', [
      { lead: '7.', prompt: 'Complete a fact family with one distinct multiplication and division equation.', lines: ['4×4=___', '16÷4=___'], answers: [['16'], ['4']] },
      { lead: '8.', prompt: 'Thirty-two pita breads are baked 4 per batch.', lines: ['32÷4=___ batches', '4×___=32', '___×4=32'], answers: [['8'], ['8'], ['8']], openWorkspace: true },
      { lead: '9. Math Journal', prompt: 'Draw and label any complete fact family.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Final Lesson 12 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Repeated factor', rows: 4, columns: 4, item: 'dot', caption: '4×4=16 and 16÷4=4.' },
      { kind: 'array', label: 'Pita breads', rows: 8, columns: 4, item: 'circle', caption: '4×8=32, 8×4=32, 32÷4=8, and 32÷8=4.' }
    ] }
  },
  {
    key: 'v1-u2-l13-s1-models', unit: 2, lesson: 13, session: 1, order: 1,
    label: 'Model It', title: 'Find repeating shape and number patterns', printedPages: '281–282', viewerPage: 293,
    sourceMarkers: ['pattern of hair clips', 'numbers under the shapes', 'number chart', 'numbers 9, 18, and 27'],
    blankVisual: responseWorkspace('Connect repeating shapes to number rules', [
      { lead: '1–2.', prompt: 'Continue two clips, one bead; list bead positions and the next position.', lines: ['bead positions: ___, ___, ___', 'next bead position: ___'], answers: [['3', '6', '9'], ['12']], openWorkspace: true },
      { lead: '3.', prompt: 'Shade the matching positions on a hundred chart.', lines: ['rule: add ___'], answers: [['3']], openWorkspace: true },
      { lead: '4.', prompt: 'Continue 9,18,27.', lines: ['next number = ___'], answers: [['36']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Two linked multiples patterns', sourceNote: supplementalVisualNote, sections: [
      { kind: 'data-table', label: 'Two clips, then one bead', columns: ['Position', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], rows: [['Object', 'clip', 'clip', 'bead', 'clip', 'clip', 'bead', 'clip', 'clip', 'bead', 'clip', 'clip', 'bead']] },
      { kind: 'equations', label: 'Hair beads', lines: ['3, 6, 9, 12, … · add 3'] },
      { kind: 'equations', label: 'Circled numbers', lines: ['9, 18, 27, 36, … · add 9', 'Every multiple of 9 is also a multiple of 3, so it belongs to both patterns.'] }
    ] }
  },
  {
    key: 'v1-u2-l13-s1-prepare-practice', unit: 2, lesson: 13, session: 1, order: 2,
    label: 'Prepare + Practice', title: 'Continue shape and even-number patterns', printedPages: '283–284', viewerPage: 295,
    sourceMarkers: ['Prepare for Exploring Patterns', 'pattern of shapes', 'pattern 2, 4', 'numbers 8, 16, and 24'],
    blankVisual: responseWorkspace('Prepare and practice pattern rules', [
      { lead: 'Prepare', prompt: 'Continue the official repeating shape pattern and explain the choice.', lines: [], openWorkspace: true },
      { lead: '3–4.', prompt: 'Shade 2,4,6,8,10,… and state the rule.', lines: ['rule: add ___', 'next after 10: ___'], answers: [['2'], ['12']], openWorkspace: true },
      { lead: '5–6.', prompt: 'Continue 8,16,24 and compare it with the even-number pattern.', lines: ['next number = ___', 'also even? ___'], answers: [['32'], ['yes']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Even-number patterns', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Rules', lines: ['2,4,6,8,10,12,… · add 2', '8,16,24,32,… · add 8', 'Every multiple of 8 is even, so it appears in the first pattern too.'] }] }
  },
  {
    key: 'v1-u2-l13-s2-table-models', unit: 2, lesson: 13, session: 2, order: 1,
    label: 'Model It + Connect It', title: 'Explain parity patterns in operation tables', printedPages: '285–286', viewerPage: 297,
    sourceMarkers: ['odd sums in the table', 'even sums in the table', 'even products', 'multiplication and addition patterns'],
    blankVisual: responseWorkspace('Addition and multiplication table patterns', [
      { lead: '1.', prompt: 'Describe the addends that make an odd sum.', lines: [], openWorkspace: true },
      { lead: '2.', prompt: 'Describe the addends that make an even sum.', lines: [], openWorkspace: true },
      { lead: '3.', prompt: 'Describe the factors that make an even product.', lines: [], openWorkspace: true },
      { lead: '4–5.', prompt: 'Compare the table patterns and trace sums of 11.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Parity rules visible in tables', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Verified patterns', lines: ['odd + even = odd', 'even + even = even', 'odd + odd = even', 'A product is even when at least one factor is even.', 'The addends for a fixed sum change by +1 and −1.'] }] }
  },
  {
    key: 'v1-u2-l13-s2-practice', unit: 2, lesson: 13, session: 2, order: 2,
    label: 'Practice 1–5', title: 'Analyze number-table patterns and parity', printedPages: '287–288', viewerPage: 299,
    sourceMarkers: ['Practice Finding Patterns', '583 small mailboxes', 'sum of the two end numbers', 'row and column for 0', '6 logs of wood'],
    blankVisual: responseWorkspace('Practice table patterns', [
      { lead: '1.', prompt: 'Describe two diagonal patterns in the addition table.', lines: [], openWorkspace: true },
      { lead: '2.', prompt: 'Predict the parity of 583+118 without adding.', lines: ['total is ___'], answers: [['odd']], openWorkspace: true },
      { lead: '3.', prompt: 'Compare the middle number with the two ends in each three-number group.', lines: [], openWorkspace: true },
      { lead: '4.', prompt: 'Describe the 0 and 1 rows and columns.', lines: [], openWorkspace: true },
      { lead: '5.', prompt: 'Predict whether 8×6 is odd or even.', lines: ['product is ___'], answers: [['even']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Practice pattern explanations', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Patterns', lines: ['583 is odd and 118 is even, so their sum is odd.', 'In equally spaced triples, the two end values add to twice the middle value.', 'Multiplying by 0 gives 0; multiplying by 1 gives the other factor.', '8×6 is even because both factors are even.'] }] }
  },
  {
    key: 'v1-u2-l13-s3-apply', unit: 2, lesson: 13, session: 3, order: 1,
    label: 'Apply It 1–3', title: 'Explain constant sums, shared multiples, and odd products', printedPages: '289', viewerPage: 301,
    sourceMarkers: ['diagonal has all 4s', 'counts to 50 by fives', 'counts to 50 by 10s', 'odd factor times an odd factor'],
    blankVisual: responseWorkspace('Apply ideas about patterns', [
      { lead: '1.', prompt: 'Show how addends change while the sum stays 4.', lines: ['1+3=___', '2+2=___', '3+1=___'], answers: [['4'], ['4'], ['4']] },
      { lead: '2.', prompt: 'List the numbers shared by counting by 5s and by 10s to 50.', lines: ['___, ___, ___, ___, ___'], answers: [['10', '20', '30', '40', '50']] },
      { lead: '3.', prompt: 'Decide whether odd×odd is always even.', lines: ['Parker is ___'], answers: [['incorrect']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Apply pattern rules', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Answers', lines: ['1+3=4; 2+2=4; 3+1=4', 'Common values: 10,20,30,40,50', 'Odd×odd is odd, so Parker is incorrect.'] }] }
  },
  {
    key: 'v1-u2-l13-s3-table-journal', unit: 2, lesson: 13, session: 3, order: 2,
    label: 'Problem 4 + Math Journal', title: 'Complete and explain multiplication-table patterns', printedPages: '290', viewerPage: 302,
    sourceMarkers: ['multiplication table below', 'missing numbers', 'shaded products', 'MATH JOURNAL'],
    blankVisual: responseWorkspace('Refine table-pattern reasoning', [
      { lead: '4.', prompt: 'Fill the missing products, describe the shaded factor pairs, and explain the pattern.', lines: [], openWorkspace: true },
      { lead: 'Math Journal', prompt: 'Find and describe two more multiplication-table patterns.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: { title: 'How to verify table patterns', sourceNote: supplementalVisualNote, sections: [
      { kind: 'data-table', label: 'Equal products mirror across the table', columns: ['Product', 'First factor pair', 'Turned factor pair'], rows: [['6', '2×3', '3×2'], ['12', '3×4', '4×3'], ['20', '4×5', '5×4']] },
      { kind: 'note', label: 'Problem 4', text: 'Each product is determined by its row factor and column factor. Equal shaded products identify different factor pairs for the same number.' },
      { kind: 'equations', label: 'Two valid table patterns', lines: ['Rows and columns mirror because a×b and b×a have the same product.', 'Each row is a skip-counting sequence using its row factor.'] }
    ] }
  },
  {
    key: 'v1-u3-l14-s1-model-area', unit: 3, lesson: 14, session: 1, order: 1,
    label: 'Model It 1–5', title: 'Measure area with same-size square units', printedPages: '315–316', viewerPage: 327,
    sourceMarkers: ['How can you measure the area of a shape', 'square units', 'measure its area', 'area of the rug'],
    blankVisual: responseWorkspace('Explore area', [
      { lead: '1–3.', prompt: 'Draw and label a rectangular rug. Compare measuring its length and width with measuring the space it covers.', lines: [], openWorkspace: true },
      { lead: '4.', prompt: 'Choose the rug tiled with same-size squares that cover it without gaps or overlaps.', lines: ['correct model: ___', 'area = ___ square units'], answers: [['left'], ['6']], openWorkspace: true },
      { lead: '5.', prompt: 'Explain how square units measure the area of a shape.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Area is the space covered', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Correct rug covering', rows: 2, columns: 3, item: 'square', caption: 'Six same-size square units cover the rug with no gaps, overlaps, or tiles past the edge.' },
      { kind: 'note', label: 'Teacher Guide explanation', text: 'Length and width measure distances. Area measures how much surface is covered. Count the same-size square units that completely cover the shape.' }
    ] }
  },
  {
    key: 'v1-u3-l14-s1-prepare-practice', unit: 3, lesson: 14, session: 1, order: 2,
    label: 'Prepare + Practice', title: 'Recognize a complete square-unit covering', printedPages: '317–318', viewerPage: 329,
    sourceMarkers: ['Prepare for Finding Area', 'measure the area of the rug in square units', 'Circle the rug', 'recycled'],
    blankVisual: responseWorkspace('Prepare and practice finding area', [
      { lead: 'Prepare', prompt: 'Use words, numbers, pictures, examples, and non-examples to describe a square unit.', lines: [], openWorkspace: true },
      { lead: '2.', prompt: 'Estimate the recycled-cloth rug area by counting covered floor tiles.', lines: ['estimated area = ___ square units'], answers: [['15']], openWorkspace: true },
      { lead: '3–5.', prompt: 'Choose the completely tiled rug, justify it, and find its area.', lines: ['correct rug: ___', 'area = ___ square units'], answers: [['left'], ['10']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Complete coverings', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Practice rug', rows: 2, columns: 5, item: 'square', caption: 'The left rug contains 10 equal square units in two rows of five.' },
      { kind: 'note', label: 'Why it works', text: 'The squares fully cover the rug without passing its edges and without gaps or overlaps.' }
    ] }
  },
  {
    key: 'v1-u3-l14-s2-models', unit: 3, lesson: 14, session: 2, order: 1,
    label: 'Model It 1–6', title: 'Count area in rectangular and non-rectangular shapes', printedPages: '319–320', viewerPage: 331,
    sourceMarkers: ['MODEL IT: RECTANGULAR SHAPES', 'square A', 'rectangle B', 'NON-RECTANGULAR SHAPES', 'find the area'],
    blankVisual: responseWorkspace('Develop understanding of area', [
      { lead: '1.', prompt: 'Find the area of square A using square inches.', lines: ['unit square = ___ square inch', 'square A = ___ square inches'], answers: [['1'], ['4']] },
      { lead: '2.', prompt: 'Find the area of rectangle B using square centimeters.', lines: ['unit square = ___ square centimeter', 'rectangle B = ___ square centimeters'], answers: [['1'], ['35']] },
      { lead: '3–4.', prompt: 'Count the units in the two non-rectangular shapes.', lines: ['shape 3 = ___ square units', 'shape 4 = ___ square units'], answers: [['10'], ['9']] },
      { lead: '6.', prompt: 'Count the same-size squares in the final rectangle.', lines: ['area = ___ square units'], answers: [['12']] }
    ]),
    solvedVisual: { title: 'Count every square once', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Rectangular shapes', lines: ['Square A: 4 square inches', 'Rectangle B: 35 square centimeters', 'Final rectangle: 2 rows × 6 squares = 12 square units'] },
      { kind: 'equations', label: 'Non-rectangular shapes', lines: ['Shape 3: 10 square units', 'Shape 4: 9 square units', 'The same counting rule works even when the shape is not a rectangle.'] }
    ] }
  },
  {
    key: 'v1-u3-l14-s2-practice-1-2', unit: 3, lesson: 14, session: 2, order: 2,
    label: 'Practice 1–2', title: 'Count square units and use named units', printedPages: '321', viewerPage: 333,
    sourceMarkers: ['Practice Finding Area', 'Count to find each area', 'deck', 'square inches'],
    blankVisual: responseWorkspace('Practice counting area', [
      { lead: '1.', prompt: 'Count the two tiled shapes.', lines: ['first area = ___ square units', 'second area = ___ square units'], answers: [['14'], ['10']] },
      { lead: '2.', prompt: 'Count the square-inch units.', lines: ['area = ___ square inches'], answers: [['6']] }
    ]),
    solvedVisual: { title: 'Practice 1–2 solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Areas', lines: ['14 square units', '10 square units', '6 square inches'] }] }
  },
  {
    key: 'v1-u3-l14-s2-practice-3-7', unit: 3, lesson: 14, session: 2, order: 3,
    label: 'Practice 3–7', title: 'Compare equal areas made with different square units', printedPages: '322', viewerPage: 334,
    sourceMarkers: ['Lila says', 'Rectangle B has', 'skip-count', 'rectangle C'],
    blankVisual: responseWorkspace('Practice rectangular area', [
      { lead: '3.', prompt: 'Count the square-centimeter units.', lines: ['area = ___ square centimeters'], answers: [['12']] },
      { lead: '4.', prompt: 'Decide whether rectangle A has an area of 9 square units.', lines: ['agree? ___'], answers: [['no']], openWorkspace: true },
      { lead: '5–6.', prompt: 'Describe rectangle B and skip-count its area.', lines: ['rows = ___', 'squares per row = ___', 'area = ___ square units'], answers: [['3'], ['5'], ['15']] },
      { lead: '7.', prompt: 'Compare rectangle C with rectangle B.', lines: ['rectangle C area = ___ square units', 'same area? ___', 'same size? ___'], answers: [['15'], ['yes'], ['no']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Same number of units, different unit sizes', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Areas', lines: ['Rectangle B: 3 rows × 5 = 15 square units', 'Rectangle C: 5 rows × 3 = 15 square units'] },
      { kind: 'note', label: 'Comparison', text: 'The rectangles both contain 15 square units, but rectangle B is larger because its square units are larger. Rectangle A is not 9 square units because its small rectangles are not same-size squares.' }
    ] }
  },
  {
    key: 'v1-u3-l14-s3-apply', unit: 3, lesson: 14, session: 3, order: 1,
    label: 'Apply It 1–3', title: 'Compare units and partition a shape into squares', printedPages: '323', viewerPage: 335,
    sourceMarkers: ['Find the area of each shape', 'Tyler says', 'dot grid', 'number the square units'],
    blankVisual: responseWorkspace('Apply ideas about finding area', [
      { lead: '1.', prompt: 'Find each area using its stated unit.', lines: ['first area = ___ square meters', 'second area = ___ square feet'], answers: [['6'], ['24']] },
      { lead: '2.', prompt: 'Explain why twelve 1-unit-long rectangles do not prove an area of 12 square units.', lines: [], openWorkspace: true },
      { lead: '3.', prompt: 'Partition and count the U-shaped region on the dot grid.', lines: ['area = ___ square units'], answers: [['7']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Apply It solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Areas', lines: ['6 square meters', '24 square feet', 'U-shaped region: 7 square units'] },
      { kind: 'note', label: 'Tyler’s error', text: 'The small rectangles are 1 unit long but not 1 unit wide, so each is not a square unit. Counting them does not measure area in square units.' }
    ] }
  },
  {
    key: 'v1-u3-l14-s3-grid-journal', unit: 3, lesson: 14, session: 3, order: 2,
    label: 'Problem 4 + Math Journal', title: 'Draw and explain rectangles on a dot grid', printedPages: '324', viewerPage: 336,
    sourceMarkers: ['rectangle with an area of 8 square units', 'greater than 8 square', 'MATH JOURNAL', 'rectangle drawn on a dot grid'],
    blankVisual: responseWorkspace('Refine dot-grid area', [
      { lead: '4A.', prompt: 'Draw a rectangle with area 8 square units and label it A.', lines: ['one valid size: ___ by ___'], answers: [['2'], ['4']], openWorkspace: true },
      { lead: '4B–C.', prompt: 'Draw a rectangle with area greater than 8 and explain how you know.', lines: ['one valid size: ___ by ___', 'area = ___ square units'], answers: [['3'], ['4'], ['12']], openWorkspace: true },
      { lead: '5. Math Journal', prompt: 'Explain how to find the area of a rectangle drawn on a dot grid.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Dot-grid solution examples', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Rectangle A', rows: 2, columns: 4, item: 'square', caption: '2×4=8 square units.' },
      { kind: 'array', label: 'Rectangle B', rows: 3, columns: 4, item: 'square', caption: '3×4=12 square units, which is greater than 8.' },
      { kind: 'note', label: 'Math Journal', text: 'Connect adjacent dots to cover the rectangle with same-size square units, then count every square exactly once.' }
    ] }
  },
  {
    key: 'v1-u3-l15-s1-try-connect', unit: 3, lesson: 15, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Recover a hidden array and multiply its sides', printedPages: '327–328', viewerPage: 339,
    sourceMarkers: ['Dakota', 'paint', 'cannot count', '5 squares long', '3 squares wide'],
    blankVisual: responseWorkspace('Dakota’s painted garden', [
      { lead: 'Try It', prompt: 'Recover the obscured rectangular array.', lines: ['rows = ___', 'squares per row = ___', 'area = ___ square units'], answers: [['3'], ['5'], ['15']], openWorkspace: true },
      { lead: 'Look Ahead', prompt: 'Write both multiplication equations and connect length × width to area.', lines: ['3×5=___', '5×3=___'], answers: [['15'], ['15']] }
    ]),
    solvedVisual: { title: 'Hidden squares recovered by structure', sourceNote: supplementalVisualNote, sections: [{ kind: 'array', label: 'Garden array', rows: 3, columns: 5, item: 'square', caption: 'The visible rows and columns determine the hidden squares: 3×5=15 square units.' }] }
  },
  {
    key: 'v1-u3-l15-s1-prepare-practice', unit: 3, lesson: 15, session: 1, order: 2,
    label: 'Prepare + Practice', title: 'Connect skip-counting, dimensions, and area', printedPages: '329–330', viewerPage: 341,
    sourceMarkers: ['Prepare for Multiplying to Find Area', 'skip-counts by fours', 'Lupita', 'area of her apartment'],
    blankVisual: responseWorkspace('Prepare and practice multiplication for area', [
      { lead: 'Prepare', prompt: 'Describe length, width, and area, then compare skip-counting 4 three times with 4×3.', lines: ['4+4+4=___', '4×3=___'], answers: [['12'], ['12']], openWorkspace: true },
      { lead: '3–4.', prompt: 'Recover Lupita’s hidden array and check it another way.', lines: ['columns = ___', 'squares per column = ___', 'area = ___ square units'], answers: [['4'], ['5'], ['20']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Two official hidden-array solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Prepare rectangle', rows: 3, columns: 4, item: 'square', caption: '4+4+4=12 and 4×3=12.' },
      { kind: 'array', label: 'Lupita’s apartment', rows: 5, columns: 4, item: 'square', caption: 'Four columns of five give 5+5+5+5=20 square units.' }
    ] }
  },
  {
    key: 'v1-u3-l15-s2-try-model', unit: 3, lesson: 15, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Use length and width to find area', printedPages: '331–332', viewerPage: 343,
    sourceMarkers: ['What is the area of the rectangle', 'centimeters', 'square tiles', 'multiplication equation'],
    blankVisual: responseWorkspace('Multiply dimensions', [
      { lead: 'Try It', prompt: 'Find the area of the 4-centimeter by 2-centimeter rectangle.', lines: ['4×2=___', 'area = ___ square centimeters'], answers: [['8'], ['8']], openWorkspace: true },
      { lead: 'Model It', prompt: 'Relate 4 squares in a row and 2 squares in a column to the factors.', lines: ['length factor = ___', 'width factor = ___'], answers: [['4'], ['2']] }
    ]),
    solvedVisual: { title: 'Dimensions become array factors', sourceNote: supplementalVisualNote, sections: [{ kind: 'array', label: '4 cm by 2 cm', rows: 2, columns: 4, item: 'square', caption: 'Two rows of four 1-centimeter squares give 4×2=8 square centimeters.' }] }
  },
  {
    key: 'v1-u3-l15-s2-connect-apply', unit: 3, lesson: 15, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Find area or an unknown side length', printedPages: '333–334', viewerPage: 345,
    sourceMarkers: ['length and width', 'square centimeters', 'area of the square', 'Mato', 'mola fabric'],
    blankVisual: responseWorkspace('Connect and apply area multiplication', [
      { lead: 'Connect It', prompt: 'Explain why length and width are the factors and why the area unit is square centimeters.', lines: [], openWorkspace: true },
      { lead: '4.', prompt: 'Find the area of a 3-unit square.', lines: ['3×3=___ square units'], answers: [['9']] },
      { lead: '5.', prompt: 'A 5-cm rectangle has area 10 cm². Find its width.', lines: ['5×___=10', 'width = ___ cm'], answers: [['2'], ['2']] },
      { lead: '6.', prompt: 'Find the area of an 8-inch by 6-inch mola.', lines: ['8×6=___ square inches'], answers: [['48']] }
    ]),
    solvedVisual: { title: 'Area and missing-side solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Answers', lines: ['3×3=9 square units', '5×2=10, so the width is 2 centimeters', '8×6=48 square inches'] }] }
  },
  {
    key: 'v1-u3-l15-s2-practice', unit: 3, lesson: 15, session: 2, order: 3,
    label: 'Practice 1–9', title: 'Multiply rectangle dimensions and reason about unknown sides', printedPages: '335–336', viewerPage: 347,
    sourceMarkers: ['Practice Multiplying to Find Area', '8 inches', 'Rectangle A', 'Rectangle B', 'unknown side length'],
    blankVisual: responseWorkspace('Practice multiplying to find area', [
      { lead: '1–3.', prompt: 'Find the three areas.', lines: ['7×6=___', '8×7=___', '4×4=___'], answers: [['42'], ['56'], ['16']] },
      { lead: '4–7.', prompt: 'Find the areas of A, 6×5, an 8-cm square, and B.', lines: ['9×3=___', '6×5=___', '8×8=___', '4×8=___'], answers: [['27'], ['30'], ['64'], ['32']] },
      { lead: '8–9.', prompt: 'Give valid side lengths for a square larger than 32 and a 6-unit-wide rectangle larger than 50.', lines: ['square side = ___ units', 'unknown rectangle side = ___ units'], answers: [['6'], ['9']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Practice solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['42, 56, 16, 27, 30, 64, 32 square units', 'A square side can be 6 or 7 units.', 'For 6×? > 50, one possible unknown side is 9 because 6×9=54.'] }] }
  },
  {
    key: 'v1-u3-l15-s3-compare-paintings', unit: 3, lesson: 15, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Compare the areas of two paintings', printedPages: '337–338', viewerPage: 349,
    sourceMarkers: ['Narsrin paints two paintings', '9 inches wide', '10 inches long', 'greater area'],
    blankVisual: responseWorkspace('Compare two painting areas', [
      { lead: 'First painting', prompt: 'Find the area of the 9-inch square painting.', lines: ['9×9=___ square inches'], answers: [['81']] },
      { lead: 'Second painting', prompt: 'Find the area of the 10-inch by 8-inch painting.', lines: ['10×8=___ square inches'], answers: [['80']] },
      { lead: 'Compare', prompt: 'Which painting has the greater area?', lines: ['greater painting: ___'], answers: [['first']] }
    ]),
    solvedVisual: { title: 'One-square-inch difference', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Comparison', lines: ['First: 9×9=81 square inches', 'Second: 10×8=80 square inches', '81>80, so the first painting has the greater area.'] }] }
  },
  {
    key: 'v1-u3-l15-s3-connect-apply', unit: 3, lesson: 15, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'Solve and compare area word problems', printedPages: '339–340', viewerPage: 351,
    sourceMarkers: ['square inches', 'ping pong table', 'same area as', 'rectangular photo'],
    blankVisual: responseWorkspace('Apply area in contexts', [
      { lead: 'Connect It', prompt: 'Explain why painting areas use square inches.', lines: [], openWorkspace: true },
      { lead: '4.', prompt: 'Find the area of a 9-foot by 5-foot table.', lines: ['9×5=___ square feet'], answers: [['45']] },
      { lead: '5.', prompt: 'Pilar’s rectangle is 9 by 2. Give different side lengths with the same area.', lines: ['possible sides: ___ and ___ units'], answers: [['6'], ['3']] },
      { lead: '6.', prompt: 'Find the area of a 7-inch by 5-inch photo.', lines: ['7×5=___ square inches'], answers: [['35']] }
    ]),
    solvedVisual: { title: 'Context solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Answers', lines: ['9×5=45 square feet', '9×2=18 and 6×3=18', '7×5=35 square inches'] }] }
  },
  {
    key: 'v1-u3-l15-s3-practice', unit: 3, lesson: 15, session: 3, order: 3,
    label: 'Practice 1–6', title: 'Compare areas and find uncovered wall space', printedPages: '341–342', viewerPage: 353,
    sourceMarkers: ['Roberto', 'area of this rug', 'Yasmin', 'Salim', 'flag', 'wall'],
    blankVisual: responseWorkspace('Practice area word problems', [
      { lead: '1–3.', prompt: 'Find Roberto’s desktop, the 5-by-3 rug, and compare it with a 4-by-4 square rug.', lines: ['desktop = ___ ft²', 'first rug = ___ ft²', 'square rug = ___ ft²', 'covers more: ___'], answers: [['8'], ['15'], ['16'], ['square rug']] },
      { lead: '4–5.', prompt: 'Compare a 4×6 rectangle with a 5×5 square and draw a rectangle with area less than 9.', lines: ['areas = ___ and ___', 'one lesser area = ___'], answers: [['24', '25'], ['6']], openWorkspace: true },
      { lead: '6.', prompt: 'A 10×10 wall holds an 8×5 flag. Find visible wall area.', lines: ['wall = ___', 'flag = ___', 'visible = ___ square feet'], answers: [['100'], ['40'], ['60']] }
    ]),
    solvedVisual: { title: 'Practice word-problem solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Answers', lines: ['4×2=8', '5×3=15; 4×4=16, so Yasmin’s square rug covers more', '4×6=24 and 5×5=25', 'One lesser rectangle: 3×2=6', 'Wall: 10×10=100. Flag: 8×5=40. Visible: 100−40=60 square feet.'] }] }
  },
  {
    key: 'v1-u3-l15-s4-problems-1-3', unit: 3, lesson: 15, session: 4, order: 1,
    label: 'Example + Problems 1–3', title: 'Refine area multiplication and analyze an error', printedPages: '343–344', viewerPage: 355,
    sourceMarkers: ['Mr. Tallbull', 'four square court', 'rooftop garden', 'Yoshi'],
    blankVisual: responseWorkspace('Refine multiplying to find area', [
      { lead: 'Example', prompt: 'Find carpet for a 9-foot by 8-foot room.', lines: ['9×8=___ square feet'], answers: [['72']] },
      { lead: '1.', prompt: 'Find the area of a square with side 5 feet.', lines: ['5×5=___ square feet'], answers: [['25']] },
      { lead: '2.', prompt: 'Compare 14 yd² of soil with a 4-by-3-yard garden.', lines: ['garden area = ___ yd²', 'enough soil? ___'], answers: [['12'], ['yes']] },
      { lead: '3.', prompt: 'Find the 7-by-5-meter area and explain Yoshi’s 12.', lines: ['area = ___ square meters', 'Yoshi used: ___'], answers: [['35'], ['addition']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Refine solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Answers', lines: ['9×8=72 square feet', '5×5=25 square feet', '4×3=12 square yards; 12<14, so there is enough soil', '7×5=35 square meters; Yoshi added 7+5 instead of multiplying.'] }] }
  },
  {
    key: 'v1-u3-l15-s4-problems-4-journal', unit: 3, lesson: 15, session: 4, order: 2,
    label: 'Problems 4–8', title: 'Select dimensions, solve an unknown side, and explain area', printedPages: '345–346', viewerPage: 357,
    sourceMarkers: ['bathroom wall', 'area of 12 square', 'rectangular deck', 'fabric squares', 'MATH JOURNAL'],
    blankVisual: responseWorkspace('Final Lesson 15 problems', [
      { lead: '4–5.', prompt: 'Find the 7-by-6 wall area and choose the 12-square-foot shape.', lines: ['wall = ___ ft²', 'wall choice = ___', '12-ft² shape = ___'], answers: [['42'], ['B'], ['C']] },
      { lead: '6.', prompt: 'Choose all dimension pairs with area 24 square yards.', lines: ['correct choices: ___, ___'], answers: [['D'], ['E']] },
      { lead: '7.', prompt: 'A 45-square quilt is 9 squares long. Find its width.', lines: ['___×___=___', 'width = ___ squares'], answers: [['5', '9', '45'], ['5']] },
      { lead: '8. Math Journal', prompt: 'Draw, label, and find the area of any rectangle using multiplication.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Final Lesson 15 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Selections', lines: ['7×6=42 square feet; choice B', '6×2=12 square feet; choice C', '6×4=24 and 8×3=24; choices D and E', '5×9=45, so the quilt is 5 squares wide'] },
      { kind: 'note', label: 'Math Journal check', text: 'A complete response labels length and width, multiplies those dimensions, and labels the result in square units.' }
    ] }
  },
  {
    key: 'v1-u3-l16-s1-try-connect', unit: 3, lesson: 16, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Combine the areas of adjoining posters', printedPages: '349–350', viewerPage: 361,
    sourceMarkers: ['Noma and Jordan make posters', 'wall covered by both posters', 'combined rectangle', 'Rectangle A'],
    blankVisual: responseWorkspace('Add adjoining rectangular areas', [
      { lead: 'Try It', prompt: 'Find the areas of Noma’s 3-by-2 poster and Jordan’s 3-by-1 poster, then add.', lines: ['Noma: 3×2=___ ft²', 'Jordan: 3×1=___ ft²', 'total = ___ ft²'], answers: [['6'], ['3'], ['9']], openWorkspace: true },
      { lead: 'Look Ahead', prompt: 'Find the area of the 2-by-2 rectangle and the 1-by-2 rectangle separately, then as one 3-by-2 rectangle.', lines: ['A: 2×2=___ in²', 'B: 1×2=___ in²', 'A+B=___ in²', 'whole: 3×2=___ in²'], answers: [['4'], ['2'], ['6'], ['6']] }
    ]),
    solvedVisual: { title: 'Two ways to add the same area', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Noma and Jordan’s adjoining posters', rows: 3, columns: 3, item: 'square', caption: 'Noma covers 6 square feet and Jordan covers 3 square feet, for 9 square feet total.' },
      { kind: 'equations', label: 'Combined rectangle', lines: ['2×2=4', '1×2=2', '4+2=6', '3×2=6 square inches'] }
    ] }
  },
  {
    key: 'v1-u3-l16-s1-prepare-practice', unit: 3, lesson: 16, session: 1, order: 2,
    label: 'Prepare + Practice', title: 'Recognize and add combined rectangles', printedPages: '351–352', viewerPage: 363,
    sourceMarkers: ['Prepare for Adding Areas', 'Nuru and José', 'Tara and Ashur', 'total area of the floor'],
    blankVisual: responseWorkspace('Prepare and practice adding areas', [
      { lead: 'Prepare', prompt: 'Decide whether each arrangement made by Nuru and José forms one combined rectangle. Explain using aligned side lengths.', lines: [], openWorkspace: true },
      { lead: '3.', prompt: 'Find the areas of Tara’s 4-by-3 rug and Ashur’s 3-by-2 rug, then the total floor area.', lines: ['Tara: 4×3=___ ft²', 'Ashur: 3×2=___ ft²', 'total = ___ ft²'], answers: [['12'], ['6'], ['18']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Rug areas combined', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Tara’s rug', rows: 3, columns: 4, item: 'square', caption: '4×3=12 square feet.' },
      { kind: 'array', label: 'Ashur’s rug', rows: 2, columns: 3, item: 'square', caption: '3×2=6 square feet.' },
      { kind: 'equations', label: 'Total covered floor', lines: ['12+6=18 square feet'] }
    ] }
  },
  {
    key: 'v1-u3-l16-s2-garden-model', unit: 3, lesson: 16, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Add the areas of a divided vegetable garden', printedPages: '353–354', viewerPage: 365,
    sourceMarkers: ["Mrs. Chang's vegetable garden", 'tomatoes', 'corn', '15 square units', 'width of the rectangle'],
    blankVisual: responseWorkspace('Model the whole garden two ways', [
      { lead: 'Parts', prompt: 'Find the 5-by-3 tomato area and 4-by-3 corn area, then add.', lines: ['tomatoes: 5×3=___ ft²', 'corn: 4×3=___ ft²', 'total = ___ ft²'], answers: [['15'], ['12'], ['27']] },
      { lead: 'Whole', prompt: 'Combine the lengths and multiply by the common width.', lines: ['5+4=___ ft', '9×3=___ ft²'], answers: [['9'], ['27']] }
    ]),
    solvedVisual: { title: 'Partitioned garden area', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Tomatoes', rows: 3, columns: 5, item: 'square', caption: '5×3=15 square feet.' },
      { kind: 'array', label: 'Corn', rows: 3, columns: 4, item: 'square', caption: '4×3=12 square feet.' },
      { kind: 'equations', label: 'Part-to-whole connection', lines: ['15+12=27', '(5+4)×3=9×3=27 square feet'] }
    ] }
  },
  {
    key: 'v1-u3-l16-s2-connect-apply', unit: 3, lesson: 16, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Connect and apply combined rectangle area', printedPages: '355–356', viewerPage: 367,
    sourceMarkers: ['SHOW WHAT YOU KNOW', 'two parts of the garden', 'How many 1-meter-square tiles', 'area of this figure'],
    blankVisual: responseWorkspace('Connect and apply combined areas', [
      { lead: 'Connect It', prompt: 'Explain why adding the two nonoverlapping parts gives the same area as multiplying the whole length and width.', lines: [], openWorkspace: true },
      { lead: 'Apply It 4–6', prompt: 'Find the three combined areas.', lines: ['4×4+2×4=___ ft²', '6×3+6×2=___ m²', '(6+2)×4=___ ft²'], answers: [['24'], ['30'], ['32']], openWorkspace: true },
    ]),
    solvedVisual: { title: 'Apply It solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Official answers', lines: ['16+8=24 square feet', '18+12=30 square meters', '8×4=32 square feet'] }
    ] }
  },
  {
    key: 'v1-u3-l16-s2-practice', unit: 3, lesson: 16, session: 2, order: 3,
    label: 'Practice 1–6', title: 'Find combined areas in context', printedPages: '357–358', viewerPage: 369,
    sourceMarkers: ['Practice Finding Areas of Combined Rectangles', 'Ajay and his dad', 'Clay', 'Evan'],
    blankVisual: responseWorkspace('Practice combined areas', [
      { lead: 'Practice 1–4', prompt: 'Find the bulletin-board parts, chicken area, and Figure A.', lines: ['2×4+6×4=___ ft²', '(3+6)×4=___ m²', '5×7+3×7=___ ft²'], answers: [['32'], ['36'], ['56']] },
      { lead: 'Practice 5–6', prompt: 'Find the playroom and picture-card totals, then decide whether Clay has enough tiles.', lines: ['5×8+4×8=___ ft²', 'Clay has enough? ___', '6×5+6×4=___ in²'], answers: [['72'], ['no'], ['54']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Practice combined-area solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Practice', lines: ['8+24=32', '9×4=36', '35+21=56', '40+32=72; Clay lacks 2 light tiles', '30+24=54 square inches'] }
    ] }
  },
  {
    key: 'v1-u3-l16-s3-lupe-model', unit: 3, lesson: 16, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Find a non-rectangular area by counting or decomposing', printedPages: '359–360', viewerPage: 371,
    sourceMarkers: ["Lupe uses 1-inch-square tiles", "area of Lupe's shape", 'There are 10 square units', 'break apart'],
    blankVisual: responseWorkspace('Decompose Lupe’s shape', [
      { lead: 'Try It', prompt: 'Count the unit squares in Lupe’s shape.', lines: ['area = ___ square inches'], answers: [['10']] },
      { lead: 'Model It', prompt: 'Show the two official decompositions.', lines: ['8+2=___', '6+4=___'], answers: [['10'], ['10']] }
    ]),
    solvedVisual: { title: 'The same shape, two decompositions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Counted square units', rows: 2, columns: 5, item: 'square', caption: 'Lupe’s shape covers 10 one-inch squares.' },
      { kind: 'equations', label: 'Two valid partitions', lines: ['8+2=10 square inches', '6+4=10 square inches'] }
    ] }
  },
  {
    key: 'v1-u3-l16-s3-connect-apply', unit: 3, lesson: 16, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'Explain decomposition and apply it to official shapes', printedPages: '361–362', viewerPage: 373,
    sourceMarkers: ['Amari breaks apart a shape', 'total area of this shape', 'Opal draws this model', 'picnic table'],
    blankVisual: responseWorkspace('Connect and apply non-rectangular area', [
      { lead: 'Connect It', prompt: 'Explain why different nonoverlapping rectangle partitions preserve the total area.', lines: [], openWorkspace: true },
      { lead: 'Apply It 4–6', prompt: 'Break each official shape into rectangles and add its areas.', lines: ['shape 4 = ___ m²', 'shape 5 = ___ cm²', 'picnic table = ___ ft²'], answers: [['110'], ['38'], ['45']], openWorkspace: true },
    ]),
    solvedVisual: { title: 'Apply It non-rectangular solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Official answers', lines: ['90+20=110 square meters', '35+3=38 square centimeters', '5 squares×9 square feet=45 square feet'] }
    ] }
  },
  {
    key: 'v1-u3-l16-s3-practice', unit: 3, lesson: 16, session: 3, order: 3,
    label: 'Practice 1–9', title: 'Practice decomposing irregular shapes', printedPages: '363–364', viewerPage: 375,
    sourceMarkers: ['Practice Finding Areas of Non-Rectangular Shapes', "Sam's Way", "Carla's Way", 'gray rectangle'],
    blankVisual: responseWorkspace('Practice non-rectangular area', [
      { lead: 'Practice 1–6', prompt: 'Complete the example decompositions and the gray-and-white shape.', lines: ['example total = ___ in²', 'gray = ___ in²', 'white = ___ in²', 'combined = ___ in²'], answers: [['13'], ['10'], ['2'], ['12']], openWorkspace: true },
      { lead: 'Practice 7–9', prompt: 'Find the areas of shapes A, B, and the final shape.', lines: ['A = ___ m²', 'B = ___ m²', 'final = ___ ft²'], answers: [['16'], ['16'], ['44']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Practice non-rectangular solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Practice', lines: ['10+3=13', '10+2=12', '10+6=16', '2+2+12=16', '12+32=44 square feet'] }
    ] }
  },
  {
    key: 'v1-u3-l16-s4-example-problems', unit: 3, lesson: 16, session: 4, order: 1,
    label: 'Example + Problems 1–3', title: 'Refine adding areas and analyze units', printedPages: '365–366', viewerPage: 377,
    sourceMarkers: ['Adding Areas', 'science night', "Seth uses 1-inch-square tiles", 'birdhouse', 'Jenna chose'],
    blankVisual: responseWorkspace('Refine adding areas', [
      { lead: 'Example', prompt: 'Add the three rectangular table-setup areas.', lines: ['5×10=___', '5×4=___', '5×10=___', 'total = ___ ft²'], answers: [['50'], ['20'], ['50'], ['120']] },
      { lead: '1–2.', prompt: 'Find the official shape area and Seth’s tiled-shape area.', lines: ['problem 1 = ___ m²', 'Seth = ___ in²'], answers: [['15'], ['14']], openWorkspace: true },
      { lead: '3.', prompt: 'Find the birdhouse-side area and explain Jenna’s answer.', lines: ['correct choice = ___', 'area = ___ square inches', 'Jenna used: ___'], answers: [['B'], ['30'], ['perimeter']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Refine solutions and error analysis', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Areas', lines: ['50+20+50=120 square feet', '3×(3+2)=15 square meters', '8+6=14 square inches', '27+10+3=40 square inches'] },
      { kind: 'note', label: 'Jenna’s error', text: 'The Teacher Guide identifies choice B, 30 square inches. Jenna found 40 by adding the outside lengths, which measures perimeter instead of area.' }
    ] }
  },
  {
    key: 'v1-u3-l16-s4-final-journal', unit: 3, lesson: 16, session: 4, order: 2,
    label: 'Problems 4–7', title: 'Add areas, compare joined rectangles, and explain', printedPages: '367–368', viewerPage: 379,
    sourceMarkers: ['porch and garden', 'area of 98 square feet', 'unknown measurements', 'MATH JOURNAL'],
    blankVisual: responseWorkspace('Complete Lesson 16', [
      { lead: '4.', prompt: 'Find the total area of the porch and garden.', lines: ['(4+2)×5=___ m²', 'correct choice = ___'], answers: [['30'], ['D']] },
      { lead: '5.', prompt: 'For each candidate rectangle, decide whether the joined total is 98 square feet.', lines: ['A: ___', 'B: ___', 'C: ___', 'D: ___'], answers: [['no'], ['yes'], ['yes'], ['no']], openWorkspace: true },
      { lead: '6.', prompt: 'Find the missing dimensions and courtyard area.', lines: ['top missing length = ___ m', 'inside missing length = ___ m', 'area = ___ m²'], answers: [['3'], ['2'], ['30']], openWorkspace: true },
      { lead: '7. Math Journal', prompt: 'Draw a shape made from at least two rectangles, label its dimensions, find the total area, and explain.', lines: [], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Final Lesson 16 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Official answers', lines: ['20+10=30 square meters', '98-square-foot test: A no, B yes, C yes, D no', 'Courtyard missing lengths: 3 m and 2 m; area: 30 square meters'] },
      { kind: 'note', label: 'Math Journal check', text: 'A complete response uses at least two nonoverlapping rectangles, labels every needed dimension, finds each rectangle’s area, and adds the areas with square units.' }
    ] }
  },
  {
    key: 'v1-u3-l17-s1-try-connect', unit: 3, lesson: 17, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Write multiplication and division stories for arrays', printedPages: '371–372', viewerPage: 383,
    sourceMarkers: ['Write a word problem about this array', 'array of baseballs', 'Two bunches', '12 bananas'],
    blankVisual: responseWorkspace('Represent arrays with word problems and equations', [
      { lead: 'Try It', prompt: 'Write a multiplication or division story for the 5-by-8 baseball array.', lines: ['5×8=___ baseballs'], answers: [['40']], openWorkspace: true },
      { lead: 'Look Ahead 2a', prompt: 'Twelve bananas are shared equally between 2 bunches.', lines: ['2×___=12', '12÷2=___'], answers: [['6'], ['6']] },
      { lead: 'Look Ahead 2b', prompt: 'There are 12 bananas with 6 in each bunch.', lines: ['___×6=12', '12÷6=___'], answers: [['2'], ['2']] }
    ]),
    solvedVisual: { title: 'Array and banana solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Baseball array', rows: 5, columns: 8, item: 'circle', caption: 'Five rows of 8 make 40 baseballs.' },
      { kind: 'equations', label: 'Related banana equations', lines: ['2×6=12 and 12÷2=6', '2×6=12 and 12÷6=2'] }
    ] }
  },
  {
    key: 'v1-u3-l17-s1-prepare-practice', unit: 3, lesson: 17, session: 1, order: 2,
    label: 'Prepare + Practice', title: 'Model unknown group size and author an array story', printedPages: '373–374', viewerPage: 385,
    sourceMarkers: ['Prepare for Solving One-Step Word Problems', '24 dragon fruits', '3 boxes', 'Solve the problem'],
    blankVisual: responseWorkspace('Prepare one-step word problems', [
      { lead: '2.', prompt: 'Twenty-four dragon fruits are shared equally among 3 boxes.', lines: ['3×___=24', '24÷3=___'], answers: [['8'], ['8']], openWorkspace: true },
      { lead: '3.', prompt: 'Write and solve a story for the displayed 4-by-6 array.', lines: ['4×6=___'], answers: [['24']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Prepare and practice solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Dragon fruits', lines: ['3×8=24', '24÷3=8 dragon fruits per box'] },
      { kind: 'array', label: 'One official array story', rows: 4, columns: 6, item: 'pattern', caption: 'Four rows of 6 flowers make 24 flowers.' }
    ] }
  },
  {
    key: 'v1-u3-l17-s2-try-model', unit: 3, lesson: 17, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Share corals equally among tanks', printedPages: '375–376', viewerPage: 387,
    sourceMarkers: ['scientist places 24 corals', '4 tanks', 'equal number of corals', 'Make 4 groups'],
    blankVisual: responseWorkspace('Solve an equal-groups division problem', [
      { lead: 'Try It', prompt: 'Share 24 corals equally among 4 tanks.', lines: ['4×c=24', '24÷4=c', 'c=___ corals'], answers: [['6'], ['6'], ['6']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Four equal coral groups', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: 'Coral tanks', rows: 4, columns: 6, item: 'circle', caption: 'Four tanks with 6 corals each contain 24 corals.' },
      { kind: 'equations', label: 'Related equations', lines: ['4×6=24', '24÷4=6'] }
    ] }
  },
  {
    key: 'v1-u3-l17-s2-connect-apply', unit: 3, lesson: 17, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Choose multiplication or division for equal groups', printedPages: '377–378', viewerPage: 389,
    sourceMarkers: ['number of corals in each group', 'Muna has 30 photos', '9 drawing kits', '21 apples'],
    blankVisual: responseWorkspace('Connect and apply equal groups', [
      { lead: 'Changed coral problem', prompt: 'Twenty-four corals are placed 6 per tank.', lines: ['6×t=24', '24÷6=t', 't=___ tanks'], answers: [['4'], ['4'], ['4']] },
      { lead: 'Apply It 4–6', prompt: 'Solve the photo, pencil, and apple problems.', lines: ['30÷6=___ pages', '9×4=___ pencils', '21÷3=___ apples per basket'], answers: [['5'], ['36'], ['7']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Equal-groups application solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['24÷6=4 tanks', '30÷6=5 pages', '9×4=36 pencils', '21÷3=7 apples per basket'] }] }
  },
  {
    key: 'v1-u3-l17-s2-practice', unit: 3, lesson: 17, session: 2, order: 3,
    label: 'Practice 1–8', title: 'Practice equal-group multiplication and division', printedPages: '379–380', viewerPage: 391,
    sourceMarkers: ['Practice Solving Problems About Equal Groups', 'hula dance classes', 'Mexican folk dance', 'modern dance'],
    blankVisual: responseWorkspace('Practice equal groups', [
      { lead: 'Hula', prompt: 'Eighteen students form classes of 6.', lines: ['18÷6=___ classes'], answers: [['3']] },
      { lead: 'Mexican folk dance', prompt: 'Two classes have 8 students each.', lines: ['2×8=___ students'], answers: [['16']] },
      { lead: 'Modern dance', prompt: 'Fifteen students form groups of 3; then 15 more join.', lines: ['15÷3=___ groups', '30÷3=___ groups'], answers: [['5'], ['10']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Equal-groups practice solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['18÷6=3', '2×8=16', '15÷3=5', '30÷3=10'] }] }
  },
  {
    key: 'v1-u3-l17-s3-try-model', unit: 3, lesson: 17, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Find the unknown number of array rows', printedPages: '381–382', viewerPage: 393,
    sourceMarkers: ['42 people in a marching band', '6 people in each row', 'How many rows', 'Use an array'],
    blankVisual: responseWorkspace('Build an array with an unknown row count', [
      { lead: 'Try It', prompt: 'Arrange 42 people with 6 in each row.', lines: ['r×6=42', '42÷6=r', 'r=___ rows'], answers: [['7'], ['7'], ['7']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Marching-band array', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '42 people', rows: 7, columns: 6, item: 'circle', caption: 'Seven rows of 6 make 42 people.' },
      { kind: 'equations', label: 'Related equations', lines: ['7×6=42', '42÷6=7'] }
    ] }
  },
  {
    key: 'v1-u3-l17-s3-connect-apply', unit: 3, lesson: 17, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'Use arrays to solve official contexts', printedPages: '383–384', viewerPage: 395,
    sourceMarkers: ['24 crayons in a box', '20 shirts', 'tomato plants', '54 flowers'],
    blankVisual: responseWorkspace('Connect and apply arrays', [
      { lead: 'Crayons', prompt: 'Twenty-four crayons are arranged 8 per row.', lines: ['24÷8=___ rows'], answers: [['3']] },
      { lead: 'Apply It 4–6', prompt: 'Solve the shirts, plants, and flowers problems.', lines: ['20÷4=___ shirts per row', '4×8=___ plants', '54÷9=___ rows'], answers: [['5'], ['32'], ['6']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Array application solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['24÷8=3 rows', '20÷4=5 shirts per row', '4×8=32 plants', '54÷9=6 rows'] }] }
  },
  {
    key: 'v1-u3-l17-s3-practice', unit: 3, lesson: 17, session: 3, order: 3,
    label: 'Practice 1–6', title: 'Practice array multiplication and division', printedPages: '385–386', viewerPage: 397,
    sourceMarkers: ['Practice Solving Problems About Arrays', '20 baskets', 'paint jars', '54 frames', '30 drawing pads'],
    blankVisual: responseWorkspace('Practice array problems', [
      { lead: 'Baskets', prompt: 'Twenty baskets are arranged in 4 equal rows.', lines: ['20÷4=___ baskets per row'], answers: [['5']] },
      { lead: 'Problems 4–6', prompt: 'Solve the paint-jar, frame, and drawing-pad problems.', lines: ['5×9=___ paint jars', '54÷6=___ frames per row', '30÷3=___ pads per shelf'], answers: [['45'], ['9'], ['10']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Array practice solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['20÷4=5', '5×9=45', '54÷6=9', '30÷3=10'] }] }
  },
  {
    key: 'v1-u3-l17-s4-try-model', unit: 3, lesson: 17, session: 4, order: 1,
    label: 'Try It + Model It', title: 'Find an unknown rectangle length from area', printedPages: '387–388', viewerPage: 399,
    sourceMarkers: ['Salam uses colored squares', 'area of 48 square inches', '6 rows', 'How long is the rectangle'],
    blankVisual: responseWorkspace('Use area to find an unknown side', [
      { lead: 'Try It', prompt: 'A 48-square-inch rectangle has 6 rows.', lines: ['6×n=48', '48÷6=n', 'n=___ inches'], answers: [['8'], ['8'], ['8']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Unknown-side area model', sourceNote: supplementalVisualNote, sections: [
      { kind: 'array', label: '48 square inches', rows: 6, columns: 8, item: 'square', caption: 'Six rows of 8 cover 48 square inches.' },
      { kind: 'equations', label: 'Unknown length', lines: ['6×8=48', '48÷6=8 inches'] }
    ] }
  },
  {
    key: 'v1-u3-l17-s4-connect-apply', unit: 3, lesson: 17, session: 4, order: 2,
    label: 'Connect It + Apply It', title: 'Connect area facts and solve side lengths', printedPages: '389–390', viewerPage: 401,
    sourceMarkers: ["Salam's rectangle", '56 square inches', 'sidewalk', 'Takoda', 'calendar'],
    blankVisual: responseWorkspace('Connect and apply area word problems', [
      { lead: 'Show What You Know', prompt: 'A 56-square-inch rectangle has 7 rows.', lines: ['56÷7=___ inches'], answers: [['8']] },
      { lead: 'Apply It 4–6', prompt: 'Solve the sidewalk, patio, and calendar problems.', lines: ['2×9=___ ft²', '35÷5=___ rows', '35÷7=___ rows', 'calendar choices: ___, ___, ___'], answers: [['18'], ['7'], ['5'], ['A', 'C', 'E']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Area application solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['56÷7=8', '2×9=18 square feet', '35÷5=7 rows', '35÷7=5 rows; choices A, C, and E'] }] }
  },
  {
    key: 'v1-u3-l17-s4-practice', unit: 3, lesson: 17, session: 4, order: 3,
    label: 'Practice 1–6', title: 'Practice area multiplication and division', printedPages: '391–392', viewerPage: 403,
    sourceMarkers: ['Practice Solving Problems About Area', 'Mr. Crow', 'rectangular quilt', 'game board'],
    blankVisual: responseWorkspace('Practice area problems', [
      { lead: 'Entrance', prompt: 'A 42-square-foot entrance has 7 tiles per row.', lines: ['42÷7=___ rows'], answers: [['6']] },
      { lead: 'Problems 4–6', prompt: 'Solve the quilt and game-board problems.', lines: ['36÷9=___ feet', '7×9=___ squares', '7-square side = ___ inches', '9-square side = ___ inches'], answers: [['4'], ['63'], ['14'], ['18']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Area practice solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['42÷7=6 rows', '36÷9=4 feet', '7×9=63 squares', '7×2=14 inches and 9×2=18 inches'] }] }
  },
  {
    key: 'v1-u3-l17-s5-example-3', unit: 3, lesson: 17, session: 5, order: 1,
    label: 'Example + Problems 1–3', title: 'Refine one-step multiplication and division', printedPages: '393–394', viewerPage: 405,
    sourceMarkers: ['Deyvi has 18 homework problems', 'Mr. Takata', '54 students', 'Aba eats 3 servings'],
    blankVisual: responseWorkspace('Refine one-step word problems', [
      { lead: 'Example', prompt: 'Deyvi shares 18 problems equally across 3 days.', lines: ['18÷3=___ per day'], answers: [['6']] },
      { lead: '1–3.', prompt: 'Solve the papers, teams, and fruit problems; analyze Pancho’s answer.', lines: ['28÷4=___ papers per row', '54÷9=___ teams', '3×7=___ servings', 'fruit choice = ___', 'Pancho used: ___'], answers: [['7'], ['6'], ['21'], ['C'], ['addition']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Refine solutions and error analysis', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Official answers', lines: ['18÷3=6', '28÷4=7', '54÷9=6', '3×7=21 servings; choice C'] },
      { kind: 'note', label: 'Pancho’s error', text: 'Pancho added 3 and 7 to get 10 instead of multiplying 3 servings for each of 7 days.' }
    ] }
  },
  {
    key: 'v1-u3-l17-s5-final-journal', unit: 3, lesson: 17, session: 5, order: 2,
    label: 'Problems 4–9', title: 'Complete Lesson 17 with fact families and explanations', printedPages: '395–396', viewerPage: 407,
    sourceMarkers: ['10 socks in a dryer', 'Bree cuts a tray', 'fiddlehead ferns', 'bocce balls', 'MATH JOURNAL'],
    blankVisual: responseWorkspace('Complete Lesson 17', [
      { lead: '4–6.', prompt: 'Solve the socks and cornbread problems, then select equations for 42 ferns shared by 6 friends.', lines: ['10÷2=___ pairs', '15÷5=___ rows', 'valid fern equations: ___, ___'], answers: [['5'], ['3'], ['6×7=42', '42÷6=7']], openWorkspace: true },
      { lead: '7–8.', prompt: 'Choose all 8÷4 stories and find the side of a 25-square-foot square.', lines: ['stories: ___, ___, ___', 'side = ___ feet'], answers: [['A', 'C', 'D'], ['5']], openWorkspace: true },
      { lead: '9. Math Journal', prompt: 'Explain two ways to arrange 12 pictures with 3 per row.', lines: ['12÷3=___ rows'], answers: [['4']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Final Lesson 17 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Official answers', lines: ['10÷2=5', '15÷5=3', '6×7=42 and 42÷6=7', '8÷4 stories: A, C, and D', '5×5=25, so each side is 5 feet', '12÷3=4 rows'] },
      { kind: 'array', label: 'Math Journal model', rows: 4, columns: 3, item: 'square', caption: 'Four rows of 3 make 12 pictures.' }
    ] }
  },
  {
    key: 'v1-u3-l18-s1-try-connect', unit: 3, lesson: 18, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Solve two-step inventory problems', printedPages: '399–400', viewerPage: 411,
    sourceMarkers: ['438 shirts', '4 different colors', '8 shirts of each color', '45 kufi caps', '5 shelves'],
    blankVisual: responseWorkspace('Use two equations or one grouped equation', [
      { lead: 'Try It', prompt: 'Add a delivery of 4 colors with 8 shirts each to 438 shirts.', lines: ['4×8=___ delivered', '438+___=___ shirts'], answers: [['32'], ['32', '470']], openWorkspace: true },
      { lead: 'Look Ahead', prompt: 'Sell 20 of 45 kufi caps, then divide the rest among 5 shelves.', lines: ['45−20=___', '25÷5=___ caps per shelf'], answers: [['25'], ['5']] }
    ]),
    solvedVisual: workedModel('Two-step inventory solutions', [
      { label: '1. Find the delivery', prompt: 'Four colors have 8 shirts each.', equation: '4×8=32', answer: '32 shirts delivered' },
      { label: '2. Update the inventory', prompt: 'Add the delivery to the 438 shirts already in stock.', equation: '438+32=470', answer: '470 shirts' },
      { label: 'Look Ahead', prompt: 'Sell 20 caps, then share the remainder across 5 shelves.', equation: '45−20=25; 25÷5=5', answer: '5 caps per shelf' }
    ], [{ kind: 'tape', label: 'Shirt inventory model', totalLabel: '470 shirts', parts: [{ label: '438', sublabel: 'in stock', weight: 4 }, { label: '32', sublabel: 'delivery', emphasize: true, weight: 1 }], equations: ['4×8=32', '438+32=470'], caption: 'Find the delivery first; then add it to the starting inventory.' }])
  },
  {
    key: 'v1-u3-l18-s1-prepare-practice', unit: 3, lesson: 18, session: 1, order: 2,
    label: 'Prepare + Practice', title: 'Identify and solve two-step problems', printedPages: '401–402', viewerPage: 413,
    sourceMarkers: ['40 suits', '16 suits', '4 racks', 'Ade has 356 beads', '6 different colors'],
    blankVisual: responseWorkspace('Prepare two-step word problems', [
      { lead: '2.', prompt: 'Sell 16 of 40 suits, then place the rest equally on 4 racks.', lines: ['40−16=___', '24÷4=___ suits per rack'], answers: [['24'], ['6']], openWorkspace: true },
      { lead: '3.', prompt: 'Add 6 colors with 9 beads each to Ade’s 356 beads.', lines: ['6×9=___', '356+54=___ beads'], answers: [['54'], ['410']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Prepare and practice solutions', [
      { label: 'Suits · step 1', prompt: 'Remove the 16 suits that were sold.', equation: '40−16=24', answer: '24 suits remain' },
      { label: 'Suits · step 2', prompt: 'Share the remaining suits equally across 4 racks.', equation: '24÷4=6', answer: '6 suits per rack' },
      { label: 'Beads', prompt: 'Find 6 groups of 9, then add that delivery to 356.', equation: '6×9=54; 356+54=410', answer: '410 beads' }
    ], [{ kind: 'tape', label: 'Suits sold and remaining', totalLabel: '40 suits', parts: [{ label: '16', sublabel: 'sold', muted: true, weight: 2 }, { label: '24', sublabel: 'remaining', emphasize: true, weight: 3 }], braces: [{ label: '4 equal racks', boxLabel: '6 each', startPart: 1, partCount: 1 }], equations: ['40−16=24', '24÷4=6'] }])
  },
  {
    key: 'v1-u3-l18-s2-try-model', unit: 3, lesson: 18, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Combine paint cans and divide into rows', printedPages: '403–404', viewerPage: 415,
    sourceMarkers: ['Pablo paints a mural', '12 small cans', '3 other cans', 'rows of 5'],
    blankVisual: responseWorkspace('Solve with two linked equations', [
      { lead: 'Try It', prompt: 'Combine 12 cans and 3 cans, then arrange them in rows of 5.', lines: ['12+3=c', 'c=___ cans', '15÷5=r', 'r=___ rows'], answers: [['15'], ['15'], ['3'], ['3']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Paint-can equation flow', [
      { label: '1. Combine', prompt: 'Put the 12 small cans and 3 other cans together.', equation: '12+3=15', answer: '15 cans' },
      { label: '2. Make equal rows', prompt: 'Arrange the 15 cans in rows of 5.', equation: '15÷5=3', answer: '3 rows' }
    ], [{ kind: 'number-bond', label: 'Combine before dividing', whole: '15 cans', parts: [{ label: '12', sublabel: 'small cans' }, { label: '3', sublabel: 'other cans' }], equations: ['12+3=15', '15÷5=3'], caption: 'The total from the first step becomes the starting number in the second step.' }])
  },
  {
    key: 'v1-u3-l18-s2-connect-apply', unit: 3, lesson: 18, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Apply two linked equations', printedPages: '405–406', viewerPage: 417,
    sourceMarkers: ['two equations', 'Yasmin has 4 five-dollar bills', '48 water bottles', 'Vegetable plants'],
    blankVisual: responseWorkspace('Connect and apply two equations', [
      { lead: '4.', prompt: 'Four five-dollar bills plus one ten-dollar bill.', lines: ['4×5=___', '20+10=$___'], answers: [['20'], ['30']] },
      { lead: '5.', prompt: 'Share 48 bottles among 8 teams, then among 2 players per team.', lines: ['48÷8=___ per team', '6÷2=___ per player'], answers: [['6'], ['3']] },
      { lead: '6.', prompt: 'Ten containers each hold 2 packs of 4 plants.', lines: ['4×2=___ per container', '8×10=___ plants'], answers: [['8'], ['80']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Apply It solutions', [
      { label: '4. Money', prompt: 'Find the value of four $5 bills, then add the $10 bill.', equation: '4×5=20; 20+10=30', answer: '$30' },
      { label: '5. Bottles', prompt: 'Share 48 bottles among 8 teams, then among 2 players.', equation: '48÷8=6; 6÷2=3', answer: '3 bottles per player' },
      { label: '6. Plants', prompt: 'Find plants per container, then multiply by 10 containers.', equation: '4×2=8; 8×10=80', answer: '80 plants' }
    ])
  },
  {
    key: 'v1-u3-l18-s2-practice', unit: 3, lesson: 18, session: 2, order: 3,
    label: 'Practice 1–10', title: 'Practice two-equation word problems', printedPages: '407–408', viewerPage: 419,
    sourceMarkers: ['Practice Solving Two-Step Word Problems Using Two Equations', 'red apples', 'office building', 'boxes of potatoes'],
    blankVisual: responseWorkspace('Practice two linked equations', [
      { lead: 'Apples', prompt: 'Combine 12 red and 12 green apples, then bag 6 each.', lines: ['12+12=___', '24÷6=___ bags'], answers: [['24'], ['4']] },
      { lead: 'Elevators', prompt: 'Four elevators hold 8 each; then 10 people leave.', lines: ['4×8=___', '32−10=___ people'], answers: [['32'], ['22']] },
      { lead: 'Potatoes', prompt: 'Bag 4 boxes of 6 at 8 per bag; then include 16 more.', lines: ['24÷8=___ bags', '(24+16)÷8=___ bags'], answers: [['3'], ['5']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Two-equation practice solutions', [
      { label: 'Apples', prompt: 'Combine the apples, then divide them into bags of 6.', equation: '12+12=24; 24÷6=4', answer: '4 bags' },
      { label: 'Elevators', prompt: 'Find the elevator capacity, then subtract the people who leave.', equation: '4×8=32; 32−10=22', answer: '22 people' },
      { label: 'Potatoes', prompt: 'Find 4 boxes of 6, then compare the two bag totals.', equation: '4×6=24; 24÷8=3; (24+16)÷8=5', answer: '3 bags, then 5 bags' }
    ])
  },
  {
    key: 'v1-u3-l18-s3-try-model', unit: 3, lesson: 18, session: 3, order: 1,
    label: 'Try It + Model It', title: 'Find an unknown amount in one equation', printedPages: '409–410', viewerPage: 421,
    sourceMarkers: ['Spring Elementary School', 'raise $250', '$9 each day', '8 days'],
    blankVisual: responseWorkspace('Write one equation for two steps', [
      { lead: 'Try It', prompt: 'Students raise $9 for 8 days toward a $250 goal.', lines: ['(8×9)+m=250', '72+m=250', 'm=___ dollars'], answers: [['178'], ['178'], ['178']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Fundraising equation flow', [
      { label: '1. Money raised', prompt: 'Multiply $9 by 8 days.', equation: '8×9=72', answer: '$72 raised' },
      { label: '2. Money still needed', prompt: 'Subtract the amount raised from the $250 goal.', equation: '250−72=178', answer: '$178 still needed' }
    ], [{ kind: 'tape', label: 'Fundraising goal', totalLabel: '$250 goal', parts: [{ label: '$72', sublabel: 'raised', emphasize: true, weight: 2 }, { label: '$178', sublabel: 'still needed', weight: 5 }], equations: ['(8×9)+m=250', '72+m=250', 'm=178'], caption: 'The two parts together make the $250 goal.' }])
  },
  {
    key: 'v1-u3-l18-s3-connect-apply', unit: 3, lesson: 18, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'Solve two-step problems with one equation', printedPages: '411–412', viewerPage: 423,
    sourceMarkers: ['value of m', 'Savanna has 24', '176 miles', 'surfboard that costs'],
    blankVisual: responseWorkspace('Connect and apply one equation', [
      { lead: '4.', prompt: 'Add 6 stars to 24, then arrange rows of 5.', lines: ['(24+6)÷5=___ rows'], answers: [['6']] },
      { lead: '5.', prompt: 'Add 7 days at 9 miles to 176 miles.', lines: ['176+(9×7)=___ miles'], answers: [['239']] },
      { lead: '6.', prompt: 'Subtract 6 weeks at $7 from a $289 surfboard cost.', lines: ['289−(6×7)=$___'], answers: [['247']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('One-equation application solutions', [
      { label: '4. Stars', prompt: 'Combine the stars, then divide by 5 per row.', equation: '(24+6)÷5=30÷5', answer: '6 rows' },
      { label: '5. Miles', prompt: 'Find 7 days of 9 miles, then add the earlier distance.', equation: '176+(9×7)=176+63', answer: '239 miles' },
      { label: '6. Surfboard', prompt: 'Find 6 weeks of $7, then subtract from the cost.', equation: '289−(6×7)=289−42', answer: '$247' }
    ])
  },
  {
    key: 'v1-u3-l18-s3-practice', unit: 3, lesson: 18, session: 3, order: 3,
    label: 'Practice 1–5', title: 'Practice one-equation two-step problems', printedPages: '413–414', viewerPage: 425,
    sourceMarkers: ['Practice Solving Two-Step Word Problems Using One Equation', '50 tickets', 'banner that costs', '100 bags', 'paintbrushes', 'number puzzles'],
    blankVisual: responseWorkspace('Practice one-equation problems', [
      { lead: '1–2.', prompt: 'Find the remaining tickets and banner money.', lines: ['50−(7×4)=___ tickets', '95−(5×6)=$___'], answers: [['22'], ['65']] },
      { lead: '3–5.', prompt: 'Solve the bags, brushes, and puzzles problems.', lines: ['100−(8×4)=___ bags', '(75−35)÷8=___ brushes', '60−((5+3)×7)=$___'], answers: [['68'], ['5'], ['4']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('One-equation practice solutions', [
      { label: '1. Tickets', prompt: 'Subtract four groups of 7 from 50.', equation: '50−(7×4)=50−28', answer: '22 tickets' },
      { label: '2. Banner', prompt: 'Subtract five groups of $6 from $95.', equation: '95−(5×6)=95−30', answer: '$65' },
      { label: '3. Bags', prompt: 'Subtract eight groups of 4 from 100.', equation: '100−(8×4)=100−32', answer: '68 bags' },
      { label: '4. Brushes', prompt: 'Find the remaining brushes, then share them among 8 students.', equation: '(75−35)÷8=40÷8', answer: '5 brushes per student' },
      { label: '5. Money', prompt: 'Find eight groups of $7, then subtract from $60.', equation: '60−((5+3)×7)=60−56', answer: '$4 left' }
    ])
  },
  {
    key: 'v1-u3-l18-s4-try-model', unit: 3, lesson: 18, session: 4, order: 1,
    label: 'Try It + Model It', title: 'Estimate and solve a two-step total', printedPages: '415–416', viewerPage: 427,
    sourceMarkers: ['Adela races', '152 steps', '12 more steps', 'Estimate to check', 'nearest hundred'],
    blankVisual: responseWorkspace('Estimate before checking the exact total', [
      { lead: 'Estimate', prompt: 'Round to tens and estimate 152+(152+12).', lines: ['150+(150+10)=___'], answers: [['310']] },
      { lead: 'Exact', prompt: 'Find the exact two-minute total.', lines: ['152+(152+12)=___ steps'], answers: [['316']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Estimate and exact solution', [
      { label: 'Estimate', prompt: 'Round 152 to 150 and 164 to 160.', equation: '150+160=310', answer: 'about 310 steps' },
      { label: 'Exact total', prompt: 'The second minute has 152+12=164 steps.', equation: '152+164=316', answer: '316 steps' },
      { label: 'Check', prompt: 'Compare the exact answer with the estimate.', equation: '316 is close to 310', answer: 'The exact total is reasonable' }
    ], [{ kind: 'number-bond', label: 'Second-minute steps', whole: '164', parts: [{ label: '152', sublabel: 'first-minute amount' }, { label: '12', sublabel: 'more steps' }], equations: ['152+12=164', '152+164=316'], caption: 'Find the second-minute amount before adding the two minutes.' }])
  },
  {
    key: 'v1-u3-l18-s4-connect-apply', unit: 3, lesson: 18, session: 4, order: 2,
    label: 'Connect It + Apply It', title: 'Use estimates to check exact solutions', printedPages: '417–418', viewerPage: 429,
    sourceMarkers: ['152 + (152 + 12)', 'tulip farm', 'Evan earned', '650 copies'],
    blankVisual: responseWorkspace('Apply estimation checks', [
      { lead: '4.', prompt: 'A farm has 222 visitors, then 65 more than that the next week.', lines: ['222+(222+65)=___ visitors'], answers: [['509']] },
      { lead: '5.', prompt: 'Evan earns 136 and 215, then has 273 left.', lines: ['(136+215)−273=$___ given'], answers: [['78']] },
      { lead: '6.', prompt: 'From 650 books, 281 sell first and 43 remain.', lines: ['(650−281)−43=___ books'], answers: [['326']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Estimate-checked application solutions', [
      { label: '4. Visitors', prompt: 'Find the second week, then add both weeks.', equation: '222+(222+65)=222+287', answer: '509 visitors' },
      { label: '5. Earnings', prompt: 'Add the earnings, then subtract the amount left.', equation: '(136+215)−273=351−273', answer: '$78 given' },
      { label: '6. Books', prompt: 'Subtract the first-day sales, then the remaining books.', equation: '(650−281)−43=369−43', answer: '326 books' }
    ])
  },
  {
    key: 'v1-u3-l18-s4-practice', unit: 3, lesson: 18, session: 4, order: 3,
    label: 'Practice 1–4', title: 'Practice estimating two-step solutions', printedPages: '419–420', viewerPage: 431,
    sourceMarkers: ['Practice Estimating Solutions to Word Problems', 'Castle Crags State Park', 'school parking lot', 'Kacy reads'],
    blankVisual: responseWorkspace('Practice estimates and exact totals', [
      { lead: 'Visitors', prompt: 'Sunday has 113 more visitors than Saturday’s 185.', lines: ['185+(185+113)=___'], answers: [['483']] },
      { lead: 'Parking lot', prompt: 'There are 185 cars and 113 fewer bikes.', lines: ['185+(185−113)=___ vehicles'], answers: [['257']] },
      { lead: 'Reading', prompt: 'Kacy reads 215 pages, then 62 more than that.', lines: ['215+(215+62)=___ pages'], answers: [['492']], openWorkspace: true }
    ]),
    solvedVisual: workedModel('Estimation-practice solutions', [
      { label: 'Visitors', prompt: 'Find Sunday, then combine both days.', equation: '185+(185+113)=185+298', answer: '483 visitors' },
      { label: 'Vehicles', prompt: 'Find the bicycles, then add them to the cars.', equation: '185+(185−113)=185+72', answer: '257 vehicles' },
      { label: 'Reading', prompt: 'Find the second amount, then combine both amounts.', equation: '215+(215+62)=215+277', answer: '492 pages' }
    ])
  },
  {
    key: 'v1-u3-l18-s5-example-3', unit: 3, lesson: 18, session: 5, order: 1,
    label: 'Example + Problems 1–3', title: 'Refine four-operation two-step problems', printedPages: '421–422', viewerPage: 433,
    sourceMarkers: ['Kashi is packing strawberries', '300 points', '243 stamps', '134 books'],
    blankVisual: responseWorkspace('Refine two-step word problems', [
      { lead: 'Example', prompt: 'Kashi has 140 strawberries, packed 105, and uses bags of 5.', lines: ['(140−105)÷5=___ bags'], answers: [['7']] },
      { lead: '1.', prompt: 'Uba needs 300 points and reads 8 pages for 7 days.', lines: ['300−(8×7)=___ points'], answers: [['244']] },
      { lead: '2–3.', prompt: 'Check Carmela’s 172 and find the daily library total.', lines: ['243+58−129=___ stamps', 'reasonable? ___', '134+254+118=___ books', 'book choice = ___'], answers: [['172'], ['yes'], ['506'], ['D']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Refine solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['7 bags', '244 points', '172 stamps is reasonable', '506 books; choice D'] }] }
  },
  {
    key: 'v1-u3-l18-s5-final-journal', unit: 3, lesson: 18, session: 5, order: 2,
    label: 'Problems 4–9', title: 'Complete Lesson 18 with equations, estimates, and explanation', printedPages: '423–424', viewerPage: 435,
    sourceMarkers: ['314 votes', '800 people', '108 jicamas', 'book order', 'three bills', 'MATH JOURNAL'],
    blankVisual: responseWorkspace('Complete Lesson 18', [
      { lead: '4–6.', prompt: 'Find election total and jicama singles; identify the estimate error and valid equation pairs.', lines: ['314+(314−18)=___ votes', 'election choices: ___, ___, ___', 'estimate-error choice = ___', '108−(4×9)=___ singles', 'jicama pairs: ___, ___, ___'], answers: [['610'], ['A', 'B', 'D'], ['C'], ['72'], ['A', 'C', 'E']], openWorkspace: true },
      { lead: '7–8.', prompt: 'Find the full book order and choose the safe estimating place.', lines: ['(3×5)+210=___ books', 'round bills to nearest: ___'], answers: [['225'], ['ten']] },
      { lead: '9. Math Journal', prompt: 'Place 30 jars and 18 jars in rows of 6.', lines: ['(30+18)÷6=___ rows'], answers: [['8']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Final Lesson 18 solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['610 votes; A, B, D', 'Estimate error: C', '72 single jicamas; A, C, E', '225 books', 'Nearest-ten estimate gives $390, above the $378 exact total', '(30+18)÷6=8 rows'] }] }
  },
  {
    key: 'v1-u3-l19-s1-try-connect', unit: 3, lesson: 19, session: 1, order: 1,
    label: 'Try It + Connect It', title: 'Read the key and scale of equivalent graphs', printedPages: '427–428', viewerPage: 439,
    sourceMarkers: ['Points Scored During the Game', 'represents 2 points', 'How many points', 'scale of this bar graph'],
    blankVisual: responseWorkspace('Read a scaled picture graph and bar graph', [
      { lead: 'Try It', prompt: 'Use the 2-point key to find each teammate’s score.', lines: ['Abu = ___', 'Ode = ___', 'Gil = ___', 'Max = ___ points'], answers: [['2'], ['6'], ['10'], ['8']] },
      { lead: 'Look Ahead', prompt: 'State the matching bar-graph scale.', lines: ['scale = ___ points'], answers: [['2']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Two graphs, one data set', sourceNote: supplementalVisualNote, sections: [{ kind: 'data-chart', chart: 'bar', label: 'Official scores', values: [{ label: 'Abu', value: 2 }, { label: 'Ode', value: 6 }, { label: 'Gil', value: 10 }, { label: 'Max', value: 8 }], unitSize: 2, scaleLabel: 'points', caption: 'One symbol and one scale interval represent 2 points.' }] }
  },
  {
    key: 'v1-u3-l19-s1-prepare-practice', unit: 3, lesson: 19, session: 1, order: 2,
    label: 'Prepare + Practice', title: 'Interpret graph keys and scales', printedPages: '429–430', viewerPage: 441,
    sourceMarkers: ['Prepare for Scaled Graphs', 'Do You Play Soccer', '3 votes', 'Jamila keeps track', 'Monday', 'Thursday'],
    blankVisual: responseWorkspace('Prepare scaled graphs', [
      { lead: '2.', prompt: 'Read the soccer graph key and bar scale.', lines: ['picture key = ___ votes', 'bar scale = ___ votes'], answers: [['3'], ['3']] },
      { lead: '3.', prompt: 'Use the 5-haircut key for Monday through Thursday.', lines: ['Monday ___', 'Tuesday ___', 'Wednesday ___', 'Thursday ___'], answers: [['10'], ['20'], ['30'], ['15']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Scaled-graph preparation solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'data-chart', chart: 'picture', label: 'Haircuts', values: [{ label: 'Monday', value: 10 }, { label: 'Tuesday', value: 20 }, { label: 'Wednesday', value: 30 }, { label: 'Thursday', value: 15 }], unitSize: 5, keyLabel: 'Each symbol represents 5 haircuts.' }] }
  },
  {
    key: 'v1-u3-l19-s2-try-model', unit: 3, lesson: 19, session: 2, order: 1,
    label: 'Try It + Model It', title: 'Compare categories in a picture graph', printedPages: '431–432', viewerPage: 443,
    sourceMarkers: ['Kashi asks students', 'favorite season', 'represents 5 students', 'summer', 'winter'],
    blankVisual: responseWorkspace('Compare summer and winter votes', [
      { lead: 'Try It', prompt: 'Winter has 4 symbols and summer has 6; each symbol represents 5 students.', lines: ['winter = ___', 'summer = ___', 'difference = ___ students'], answers: [['20'], ['30'], ['10']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Favorite-season comparison', sourceNote: supplementalVisualNote, sections: [{ kind: 'data-chart', chart: 'picture', label: 'Favorite season', values: [{ label: 'Winter', value: 20 }, { label: 'Summer', value: 30 }], unitSize: 5, keyLabel: 'Each symbol represents 5 students.', caption: 'Winter 20; summer 30; difference 10.' }] }
  },
  {
    key: 'v1-u3-l19-s2-connect-apply', unit: 3, lesson: 19, session: 2, order: 2,
    label: 'Connect It + Apply It', title: 'Combine and compare season data', printedPages: '433–434', viewerPage: 445,
    sourceMarkers: ['Did 4 or 20', 'winter or fall', 'number line', 'spring or fall', 'summer'],
    blankVisual: responseWorkspace('Apply the 5-student picture key', [
      { lead: '4.', prompt: 'Combine winter and fall.', lines: ['20+25=___ students'], answers: [['45']] },
      { lead: '5.', prompt: 'Find the spring total.', lines: ['3×5=___ students'], answers: [['15']] },
      { lead: '6.', prompt: 'Compare spring plus fall with summer.', lines: ['15+25=___', '40−30=___ more'], answers: [['40'], ['10']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Season graph solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['Winter or fall: 45 students', 'Spring: 15 students', 'Spring or fall: 40; that is 10 more than summer'] }] }
  },
  {
    key: 'v1-u3-l19-s2-practice', unit: 3, lesson: 19, session: 2, order: 3,
    label: 'Practice 1–9', title: 'Practice interpreting scaled picture graphs', printedPages: '435–436', viewerPage: 447,
    sourceMarkers: ['Practice Reading and Interpreting Picture Graphs', 'Anana visits family', 'favorite flower', 'represents 6 students'],
    blankVisual: responseWorkspace('Practice picture-graph comparisons', [
      { lead: 'Animals 1–4', prompt: 'Use the 4-animal key.', lines: ['snakes = ___', 'elephants = ___', 'hippos−snakes = ___'], answers: [['12'], ['28'], ['4']], openWorkspace: true },
      { lead: 'Flowers 5–8', prompt: 'Use the 6-student key.', lines: ['roses = ___', 'sunflowers−lilies = ___', 'lilies+poppies = ___', 'poppies−roses = ___'], answers: [['18'], ['18'], ['96'], ['42']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Picture-graph practice solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['Snakes 12; elephants 28; hippos exceed snakes by 4', 'Roses 18; lilies are 18 fewer than sunflowers; lilies+poppies=96; poppies exceed roses by 42'] }] }
  },
  {
    key: 'v1-u3-l19-s3-try-model', unit: 3, lesson: 19, session: 3, order: 1,
    label: 'Try It + Explain It', title: 'Read scaled bars and find an amount still needed', printedPages: '437–438', viewerPage: 449,
    sourceMarkers: ['Hart School', 'wind turbine', 'Grade 3', 'Grade 4', '$300'],
    blankVisual: responseWorkspace('Read two bars and compare with a goal', [
      { lead: 'Try It', prompt: 'Grade 3 raised $80 and Grade 4 raised $60 toward $300.', lines: ['80+60=___', '300−140=$___ still needed'], answers: [['140'], ['160']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Wind-turbine goal', sourceNote: supplementalVisualNote, sections: [{ kind: 'data-chart', chart: 'bar', label: 'Money raised', values: [{ label: 'Grade 3', value: 80 }, { label: 'Grade 4', value: 60 }], unitSize: 10, scaleLabel: 'dollars', caption: '80+60=140; 300−140=160.' }] }
  },
  {
    key: 'v1-u3-l19-s3-connect-apply', unit: 3, lesson: 19, session: 3, order: 2,
    label: 'Connect It + Apply It', title: 'Interpret the complete wind-turbine bar graph', printedPages: '439–440', viewerPage: 451,
    sourceMarkers: ['scale numbers', 'Money Raised for the Wind Turbine', 'How much money', 'Which statements are true'],
    blankVisual: responseWorkspace('Apply the $10 bar scale', [
      { lead: '4.', prompt: 'Add all five grade amounts: 50, 80, 60, 90, and 40.', lines: ['total = $___'], answers: [['320']] },
      { lead: '5.', prompt: 'Choose every true statement.', lines: ['true choices: ___, ___, ___'], answers: [['A', 'D', 'E']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Wind-turbine graph solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'data-chart', chart: 'bar', label: 'All grades', values: [{ label: 'Grade 2', value: 50 }, { label: 'Grade 3', value: 80 }, { label: 'Grade 4', value: 60 }, { label: 'Grade 5', value: 90 }, { label: 'Grade 6', value: 40 }], unitSize: 10, scaleLabel: 'dollars', caption: 'Total $320. True statements: A, D, E.' }] }
  },
  {
    key: 'v1-u3-l19-s3-practice', unit: 3, lesson: 19, session: 3, order: 3,
    label: 'Practice 1–5', title: 'Practice reading and interpreting bar graphs', printedPages: '441–442', viewerPage: 453,
    sourceMarkers: ['Practice Reading', 'Pints of Goat Milk', 'Monday = 60', 'National Park'],
    blankVisual: responseWorkspace('Practice scaled bar graphs', [
      { lead: 'Milk 1–2', prompt: 'Use the weekly goat-milk bars.', lines: ['two least days = ___ pints', 'week total = ___ pints'], answers: [['110'], ['370']], openWorkspace: true },
      { lead: 'Parks 3–5', prompt: 'Complete statements from the national-park graph.', lines: ['Yellowstone equals ___ plus ___', 'Death Valley is 2 less than ___'], answers: [['Death Valley', 'Joshua Tree'], ['Yosemite']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Bar-graph practice solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['Two least milk days: 110 pints; week total: 370 pints', 'Yellowstone 10 = Death Valley 6 + Joshua Tree 4', 'Death Valley 6 is 2 less than Yosemite 8'] }] }
  },
  {
    key: 'v1-u3-l19-s4-try-model', unit: 3, lesson: 19, session: 4, order: 1,
    label: 'Try It + Model It', title: 'Draw scaled graphs from a data table', printedPages: '443–444', viewerPage: 455,
    sourceMarkers: ['Alo is learning', 'bullroarer', 'Week 2', '30 minutes', 'picture graph', 'bar graph'],
    blankVisual: responseWorkspace('Graph Alo’s practice data', [
      { lead: 'Try It', prompt: 'Use the data 5, 30, 15, 25, 20 with a scale or key of 5.', lines: ['Week 1 ___', 'Week 2 ___', 'Week 3 ___', 'Week 4 ___', 'Week 5 ___ minutes'], answers: [['5'], ['30'], ['15'], ['25'], ['20']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Bullroarer practice graph', sourceNote: supplementalVisualNote, sections: [{ kind: 'data-chart', chart: 'bar', label: 'Minutes practiced', values: [{ label: 'Week 1', value: 5 }, { label: 'Week 2', value: 30 }, { label: 'Week 3', value: 15 }, { label: 'Week 4', value: 25 }, { label: 'Week 5', value: 20 }], unitSize: 5, scaleLabel: 'minutes' }] }
  },
  {
    key: 'v1-u3-l19-s4-connect-apply', unit: 3, lesson: 19, session: 4, order: 2,
    label: 'Connect It + Apply It', title: 'Choose a useful scale and draw insect graphs', printedPages: '445–446', viewerPage: 457,
    sourceMarkers: ['scale of 10', 'insects in an orchard', 'complete the picture graph', 'complete the bar graph'],
    blankVisual: responseWorkspace('Choose and apply a graph scale', [
      { lead: 'Connect It', prompt: 'Explain why 5 is a useful scale for the bullroarer data.', lines: [], openWorkspace: true },
      { lead: 'Apply It 4–5', prompt: 'Complete Ramón’s picture and bar graphs using the official table.', lines: ['appropriate scale = ___ insects'], answers: [['2']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Insect-graph scale', sourceNote: supplementalVisualNote, sections: [{ kind: 'note', label: 'Teacher Guide guidance', text: 'A scale of 2 is appropriate for Ramón’s data. The completed graphs must include the same category values, a title, labels, and the 2-insect key or scale.' }] }
  },
  {
    key: 'v1-u3-l19-s4-practice', unit: 3, lesson: 19, session: 4, order: 3,
    label: 'Practice 1–5', title: 'Practice constructing scaled graphs', printedPages: '447–448', viewerPage: 459,
    sourceMarkers: ['Practice Drawing a Scaled Graph', 'Adela asks some students', 'Pilot', 'sport they like best', 'Game'],
    blankVisual: responseWorkspace('Practice drawing scaled graphs', [
      { lead: 'Whales 1–2', prompt: 'Graph the whale table with a scale of 5.', lines: ['Beluga ___', 'Blue ___', 'Humpback ___', 'Pilot ___', 'Right ___'], answers: [['10'], ['5'], ['20'], ['30'], ['15']], openWorkspace: true },
      { lead: 'Sports 3', prompt: 'Choose the picture-graph key for 4, 10, 16, and 18.', lines: ['key = ___ students'], answers: [['2']] },
      { lead: 'Games 4–5', prompt: 'Draw the game bar graph and explain the chosen scale.', lines: ['one appropriate scale = ___ students'], answers: [['4']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Scaled-graph construction solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'data-chart', chart: 'bar', label: 'Favorite whales', values: [{ label: 'Beluga', value: 10 }, { label: 'Blue', value: 5 }, { label: 'Humpback', value: 20 }, { label: 'Pilot', value: 30 }, { label: 'Right', value: 15 }], unitSize: 5, scaleLabel: 'students', caption: 'Sports key = 2. An appropriate game scale is 4.' }] }
  },
  {
    key: 'v1-u3-l19-s5-example-3', unit: 3, lesson: 19, session: 5, order: 1,
    label: 'Example + Problems 1–3', title: 'Refine graph scales and comparisons', printedPages: '449–450', viewerPage: 461,
    sourceMarkers: ['Fernando records', 'favorite bike colors', 'Snowfall in New York City', 'February and March', 'Yasmin chose'],
    blankVisual: responseWorkspace('Refine scaled graphs', [
      { lead: 'Example + 1', prompt: 'Use the official bike-color table and the selected scale of 3 to complete the bar graph.', lines: ['scale = ___'], answers: [['3']], openWorkspace: true },
      { lead: '2–3.', prompt: 'Compare the snowfall bars.', lines: ['February+March exceed November+December by ___ inches', 'months equaling February: ___ and ___', 'Yasmin added: ___ and ___'], answers: [['10'], ['January', 'March'], ['December', 'March']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Scale and snowfall solutions', sourceNote: supplementalVisualNote, sections: [{ kind: 'equations', label: 'Official answers', lines: ['Bike-color graph scale: 3', 'February and March combined exceed November and December by 10 inches', 'January and March combine to equal February', 'Yasmin incorrectly combined December and March'] }] }
  },
  {
    key: 'v1-u3-l19-s5-final-journal', unit: 3, lesson: 19, session: 5, order: 2,
    label: 'Problems 4–7', title: 'Complete Volume 1 lesson sessions with scaled graphs', printedPages: '451–452', viewerPage: 463,
    sourceMarkers: ['Adan picks cloudberries', 'True or False', 'Soccer Goals Scored This Season', 'MATH JOURNAL'],
    blankVisual: responseWorkspace('Complete Lesson 19', [
      { lead: '4–5.', prompt: 'Evaluate the cloudberry statements and convert Wednesday’s 10 cups using 2 cups per symbol.', lines: ['statements: ___, ___, ___, ___', 'berry symbols = ___'], answers: [['true', 'false', 'false', 'false'], ['5']], openWorkspace: true },
      { lead: '6.', prompt: 'Choose all true soccer-goal statements.', lines: ['true choices: ___, ___, ___'], answers: [['A', 'C', 'E']], openWorkspace: true },
      { lead: '7. Math Journal', prompt: 'Choose a scale for 20, 10, 50, and 30 votes and explain.', lines: ['recommended scale = ___'], answers: [['10']], openWorkspace: true }
    ]),
    solvedVisual: { title: 'Final Lesson 19 solutions', sourceNote: supplementalVisualNote, sections: [
      { kind: 'equations', label: 'Official answers', lines: ['Cloudberry statements: true, false, false, false', '10÷2=5 berry symbols', 'Soccer statements: A, C, E', 'A scale of 10 is efficient for 10, 20, 30, and 50'] },
      { kind: 'data-chart', chart: 'picture', label: 'Soccer check', values: [{ label: 'Kangaroos', value: 10 }, { label: 'Owls', value: 8 }, { label: 'Wolves', value: 18 }, { label: 'Leopards', value: 12 }], unitSize: 2, keyLabel: 'Each symbol represents 2 goals.', caption: 'Wolves 18 = Kangaroos 10 + Owls 8; Wolves 18 + Leopards 12 = 30.' }
    ] }
  }
];

const problemEvidence = problemEvidenceJson as Readonly<{
  schemaVersion: number;
  program: string;
  publisher: string;
  grade: number;
  volume: number;
  sourceId: string;
  solvedSourceId: string;
  coverageStatus: string;
  completedLessons: readonly Readonly<{ lesson: number; printedPages: string; sessions: readonly number[] }>[];
  problems: readonly Readonly<Omit<IReadySourceProblem, 'label' | 'title' | 'blankVisual' | 'solvedVisual'>>[];
}>;
const teacherProvenance = teacherProvenanceJson as Readonly<{
  schemaVersion: number;
  program: string;
  publisher: string;
  grade: number;
  volume: number;
  studentSourceId: string;
  solvedSourceId: string;
  coverageStatus: string;
  spreads: readonly IReadyTeacherGuideProvenance[];
}>;
if (
  problemEvidence.schemaVersion !== 1
  || problemEvidence.program !== 'i-ready-classroom-mathematics-california'
  || problemEvidence.publisher !== 'Curriculum Associates'
  || problemEvidence.grade !== 3
  || problemEvidence.volume !== 1
  || problemEvidence.sourceId !== 'grade3-student-worktext-v1'
  || problemEvidence.solvedSourceId !== 'grade3-teacher-guide-v1'
  || problemEvidence.coverageStatus !== 'complete-lesson-session-sequence'
  || problemEvidence.problems.length !== sourceProblems.length
) {
  throw new Error('i-Ready problem sequence rejected: source identity or coverage status is invalid.');
}
const pageRange = (value: string): readonly number[] => {
  const endpoints = [...value.matchAll(/\d+/g)].map((match) => Number(match[0]));
  const start = endpoints[0];
  const end = endpoints[1] ?? start;
  return Number.isFinite(start) && Number.isFinite(end) && end >= start
    ? Array.from({ length: end - start + 1 }, (_, offset) => start + offset)
    : [];
};
for (const problem of sourceProblems) {
  const evidence = problemEvidence.problems.find((candidate) => candidate.key === problem.key);
  if (
    !evidence
    || evidence.unit !== problem.unit
    || evidence.lesson !== problem.lesson
    || evidence.session !== problem.session
    || evidence.order !== problem.order
    || evidence.printedPages !== problem.printedPages
    || evidence.viewerPage !== problem.viewerPage
    || JSON.stringify(evidence.sourceMarkers) !== JSON.stringify(problem.sourceMarkers)
    || /eureka|\bmodule\b/i.test(JSON.stringify(problem))
  ) {
    throw new Error(`i-Ready problem sequence rejected: ${problem.key} lacks matching official evidence.`);
  }
}
if (
  teacherProvenance.schemaVersion !== 1
  || teacherProvenance.program !== problemEvidence.program
  || teacherProvenance.publisher !== problemEvidence.publisher
  || teacherProvenance.grade !== problemEvidence.grade
  || teacherProvenance.volume !== problemEvidence.volume
  || teacherProvenance.studentSourceId !== problemEvidence.sourceId
  || teacherProvenance.solvedSourceId !== problemEvidence.solvedSourceId
  || teacherProvenance.coverageStatus !== 'complete-lesson-session-spread-map'
  || /eureka|\bmodule\b/i.test(JSON.stringify(teacherProvenance))
) {
  throw new Error('i-Ready teacher-guide provenance rejected: identity, scope, or cross-program boundary is invalid.');
}
for (const problem of sourceProblems) {
  if (!teacherGuideProvenanceForProblem(problem)) {
    throw new Error(`i-Ready problem sequence rejected: ${problem.key} has no exact Teacher Guide Volume 1 spread.`);
  }
}
for (const lessonCoverage of problemEvidence.completedLessons) {
  const lessonProblems = sourceProblems.filter((problem) => problem.lesson === lessonCoverage.lesson);
  const expectedPages = pageRange(lessonCoverage.printedPages);
  const coveredPages = new Set(lessonProblems.flatMap((problem) => pageRange(problem.printedPages)));
  const coveredSessions = new Set(lessonProblems.map((problem) => problem.session));
  if (
    expectedPages.length === 0
    || expectedPages.some((page) => !coveredPages.has(page))
    || coveredPages.size !== expectedPages.length
    || lessonCoverage.sessions.some((session) => !coveredSessions.has(session))
    || coveredSessions.size !== lessonCoverage.sessions.length
  ) {
    throw new Error(`i-Ready problem sequence rejected: Lesson ${lessonCoverage.lesson} is marked complete without full page/session coverage.`);
  }
}

const THIN_VISUAL_REVIEWED_EXCEPTIONS = new Set<string>();

const solvedLinesFor = (problem: IReadySourceProblem): string[] => problem.solvedVisual.sections.flatMap((section) =>
  section.kind === 'equations' ? section.lines : []
);

const exactFactsFor = (problem: IReadySourceProblem): Array<{ left: number; operator: '×' | '÷'; right: number; result: number; source: string }> => {
  const facts: Array<{ left: number; operator: '×' | '÷'; right: number; result: number; source: string }> = [];
  for (const line of solvedLinesFor(problem)) {
    for (const match of line.matchAll(/(\d+)\s*([×÷])\s*(\d+)\s*(?:=|is not)\s*(\d+)/g)) {
      facts.push({ left: Number(match[1]), operator: match[2] as '×' | '÷', right: Number(match[3]), result: Number(match[4]), source: line });
    }
  }
  return facts;
};

const arrayModelsForFacts = (problem: IReadySourceProblem, item: 'dot' | 'square' = 'dot'): ProblemVisualSection[] => {
  const seen = new Set<string>();
  const models: ProblemVisualSection[] = [];
  for (const fact of exactFactsFor(problem)) {
    const rows = fact.operator === '÷' ? fact.right : fact.left;
    const columns = fact.operator === '÷' ? fact.result : fact.right;
    if (rows < 1 || columns < 1 || rows > 12 || columns > 12) continue;
    const key = `${rows}×${columns}`;
    if (seen.has(key)) continue;
    seen.add(key);
    models.push({
      kind: 'array',
      label: `${fact.source.split(/[.;]/)[0]} · build the official relationship`,
      rows,
      columns,
      item,
      caption: fact.source
    });
    if (models.length === 4) break;
  }
  return models;
};

const groupedArrayModelsFor = (problem: IReadySourceProblem): ProblemVisualSection[] => {
  const models: ProblemVisualSection[] = [];
  const seen = new Set<string>();
  for (const line of solvedLinesFor(problem)) {
    const patterns = [
      ...line.matchAll(/\((\d+)×(\d+)\)×(\d+)/g),
      ...line.matchAll(/(\d+)×\((\d+)×(\d+)\)/g)
    ];
    for (const match of patterns) {
      const first = Number(match[1]);
      const second = Number(match[2]);
      const third = Number(match[3]);
      const rows = match[0].startsWith('(') ? first * second : first;
      const columns = match[0].startsWith('(') ? third : second * third;
      if (rows < 1 || columns < 1 || rows > 12 || columns > 12) continue;
      const key = `${rows}×${columns}`;
      if (seen.has(key)) continue;
      seen.add(key);
      models.push({
        kind: 'array',
        label: `${match[0]} · regroup without changing the total`,
        rows,
        columns,
        item: 'dot',
        groupEveryColumns: match[0].startsWith('(') ? undefined : second,
        caption: line
      });
    }
  }
  return models.slice(0, 4);
};

const tensModelsFor = (problem: IReadySourceProblem): ProblemVisualSection[] => {
  const models: ProblemVisualSection[] = [];
  for (const line of solvedLinesFor(problem)) {
    const sequence = line.match(/^(\d+(?:,\s*\d+){3,})/);
    if (sequence) {
      const values = sequence[1].split(',').map((value) => value.trim());
      models.push({ kind: 'number-line', label: 'Count equal groups of tens', ticks: values.map((label, index) => ({ label, target: index === values.length - 1 })), caption: line });
      continue;
    }
    const fact = line.match(/(\d+)×(\d+)\s*=\s*(\d+)/);
    if (!fact) continue;
    const groups = Number(fact[1]);
    const groupValue = Number(fact[2]);
    if (groups < 1 || groups > 10 || groupValue % 10 !== 0) continue;
    models.push({
      kind: 'tape',
      label: `${groups} equal groups of ${groupValue}`,
      totalLabel: fact[3],
      parts: Array.from({ length: groups }, () => ({ label: String(groupValue), emphasize: true })),
      equations: [`${groups}×${groupValue}=${fact[3]}`],
      caption: line
    });
  }
  return models.slice(0, 3);
};

const relatedFactsModelFor = (problem: IReadySourceProblem): ProblemVisualSection[] => {
  const rows = solvedLinesFor(problem).flatMap((line) => {
    const statements = line.split(/;|, so | and (?=\d)/).map((value) => value.trim()).filter((value) => /[=×÷]/.test(value));
    if (statements.length < 2) return [];
    return [{ left: statements[0], right: statements.slice(1).join(' · ') }];
  });
  return rows.length ? [{ kind: 'related-facts', label: 'Use the same official numbers in both operations', rows: rows.slice(0, 6) }] : [];
};

const reviewedPatternModels: Readonly<Record<string, ProblemVisualSection[]>> = {
  'v1-u2-l13-s1-prepare-practice': [{ kind: 'data-table', label: 'Compare the two official growing patterns', columns: ['Step', '1', '2', '3', '4', '5', '6'], rows: [['Add 2', '2', '4', '6', '8', '10', '12'], ['Add 8', '8', '16', '24', '32', '40', '48']] }],
  'v1-u2-l13-s2-table-models': [{ kind: 'data-table', label: 'Test parity with official cases', columns: ['First', 'Second', 'Sum', 'Pattern'], rows: [['odd', 'even', 'odd', 'odd + even'], ['even', 'even', 'even', 'even + even'], ['odd', 'odd', 'even', 'odd + odd']] }],
  'v1-u2-l13-s2-practice': [{ kind: 'data-table', label: 'Apply each verified pattern to its official case', columns: ['Case', 'What the pattern shows'], rows: [['583 + 118', 'odd + even = odd'], ['equally spaced triple', 'ends sum to twice the middle'], ['factor 0 or 1', '0 gives 0; 1 preserves the factor'], ['8×6', 'even factor gives an even product']] }],
  'v1-u2-l13-s3-apply': [{ kind: 'data-table', label: 'Build and compare the official patterns', columns: ['Relationship', 'Values'], rows: [['pairs that total 4', '1+3, 2+2, 3+1'], ['common multiples', '10, 20, 30, 40, 50'], ['odd × odd', 'odd']] }]
};

const reviewedTensModels: Readonly<Record<string, ProblemVisualSection[]>> = {
  'v1-u2-l9-s1-prepare': [{ kind: 'number-line', label: 'Count six equal groups of 5 tens', ticks: ['50', '100', '150', '200', '250', '300'].map((label, index) => ({ label, target: index === 5 })), caption: 'Six groups of 5 tens make 30 tens, or 300.' }],
  'v1-u2-l9-s1-practice': [{ kind: 'tape', label: 'Keep the unit of ten visible', totalLabel: '180', parts: Array.from({ length: 6 }, () => ({ label: '30', sublabel: '3 tens', emphasize: true })), equations: ['6 × (3 × 10) = (6 × 3) × 10 = 180'], caption: 'Six groups of 3 tens make 18 tens, or 180 prizes.' }],
  'v1-u2-l9-s2-connect-apply': [{ kind: 'tape', label: 'Eight groups of 6 tens', totalLabel: '480', parts: Array.from({ length: 8 }, () => ({ label: '60', emphasize: true })), equations: ['8 × 60 = 480'] }, { kind: 'tape', label: 'Seven groups of 4 tens', totalLabel: '280', parts: Array.from({ length: 7 }, () => ({ label: '40', emphasize: true })), equations: ['7 × 40 = 280'] }],
  'v1-u2-l9-s2-practice': [{ kind: 'data-table', label: 'Track the tens unit through each official product', columns: ['Fact', 'Tens product', 'Value'], rows: [['3×5 tens', '15 tens', '150'], ['5×6 tens', '30 tens', '300'], ['7×3 tens', '21 tens', '210'], ['8×4 tens', '32 tens', '320']] }]
};

const reviewedAreaCountModels: Readonly<Record<string, ProblemVisualSection[]>> = {
  'v1-u2-l11-s1-prepare': [{ kind: 'source-directions', label: 'Read the official array without inventing values', items: [{ lead: 'Notice', text: 'Count the rows in the printed array.' }, { lead: 'Represent', text: 'Count the equal number of objects in each row and multiply to find the total.' }, { lead: 'Connect', text: 'Use the same three values to write the related division equation.' }] }],
  'v1-u3-l14-s2-practice-1-2': [{ kind: 'data-table', label: 'Count each same-size square once', columns: ['Official figure', 'Area', 'Unit'], rows: [['1', '14', 'square units'], ['2', '10', 'square units'], ['3', '6', 'square inches']] }],
  'v1-u3-l16-s3-connect-apply': [
    { kind: 'number-bond', label: 'Decompose shape 4 into nonoverlapping rectangles', whole: '110 m²', parts: [{ label: '90 m²' }, { label: '20 m²' }], equations: ['90 + 20 = 110'] },
    { kind: 'number-bond', label: 'Decompose shape 5 into nonoverlapping rectangles', whole: '38 cm²', parts: [{ label: '35 cm²' }, { label: '3 cm²' }], equations: ['35 + 3 = 38'] },
    { kind: 'array', label: 'Five equal table sections', rows: 1, columns: 5, item: 'square', caption: '5 sections × 9 square feet = 45 square feet.' }
  ],
  'v1-u3-l16-s3-practice': [
    { kind: 'number-bond', label: 'First official partition', whole: '13 in²', parts: [{ label: '10 in²' }, { label: '3 in²' }], equations: ['10 + 3 = 13'] },
    { kind: 'number-bond', label: 'Gray and white regions', whole: '12 in²', parts: [{ label: '10 in²' }, { label: '2 in²' }], equations: ['10 + 2 = 12'] },
    { kind: 'number-bond', label: 'Final official shape', whole: '44 ft²', parts: [{ label: '12 ft²' }, { label: '32 ft²' }], equations: ['12 + 32 = 44'] }
  ]
};

const reviewedGraphModels: Readonly<Record<string, ProblemVisualSection[]>> = {
  'v1-u3-l19-s2-connect-apply': [{ kind: 'data-chart', chart: 'picture', label: 'Favorite seasons · official 5-student key', values: [{ label: 'Winter', value: 20 }, { label: 'Spring', value: 15 }, { label: 'Summer', value: 30 }, { label: 'Fall', value: 25 }], unitSize: 5, keyLabel: 'Each symbol represents 5 students.', caption: 'Winter + fall = 45; spring + fall = 40, which is 10 more than summer.' }],
  'v1-u3-l19-s2-practice': [{ kind: 'data-chart', chart: 'picture', label: 'Animal visits · official 4-animal key', values: [{ label: 'Snakes', value: 12 }, { label: 'Hippos', value: 16 }, { label: 'Elephants', value: 28 }], unitSize: 4, keyLabel: 'Each symbol represents 4 animals.', caption: 'Hippos exceed snakes by 4; elephants total 28.' }, { kind: 'data-chart', chart: 'picture', label: 'Favorite flowers · official 6-student key', values: [{ label: 'Roses', value: 18 }, { label: 'Lilies', value: 36 }, { label: 'Sunflowers', value: 54 }, { label: 'Poppies', value: 60 }], unitSize: 6, keyLabel: 'Each symbol represents 6 students.', caption: 'Sunflowers exceed lilies by 18; lilies + poppies = 96.' }],
  'v1-u3-l19-s3-practice': [{ kind: 'data-table', label: 'Read the exact scale before comparing bars', columns: ['Official graph', 'Verified relationship'], rows: [['Milk', 'two least days total 110 pints; week total 370 pints'], ['National parks', 'Yellowstone 10 = Death Valley 6 + Joshua Tree 4'], ['National parks', 'Death Valley 6 is 2 less than Yosemite 8']] }],
  'v1-u3-l19-s4-connect-apply': [{ kind: 'data-table', label: 'Build both official insect graphs from one table', columns: ['Graph requirement', 'Verified choice'], rows: [['same category values', 'use the official table'], ['picture-graph key', '2 insects'], ['bar-graph scale', '2 insects'], ['labels', 'title, categories, and scale']] }],
  'v1-u3-l19-s5-example-3': [{ kind: 'data-table', label: 'Keep every comparison attached to the official bars', columns: ['Official graph', 'Verified reading'], rows: [['Bike colors', 'scale = 3'], ['Snowfall', 'February + March is 10 inches more than November + December'], ['Snowfall', 'January + March equals February'], ['Error check', 'December + March was the wrong pair']] }]
};

const reviewedThinTeachingFor = (problem: IReadySourceProblem): ProblemVisualSection[] => {
  if (reviewedPatternModels[problem.key]) return reviewedPatternModels[problem.key];
  if (reviewedTensModels[problem.key]) return reviewedTensModels[problem.key];
  if (reviewedAreaCountModels[problem.key]) return reviewedAreaCountModels[problem.key];
  if (reviewedGraphModels[problem.key]) return reviewedGraphModels[problem.key];
  if (problem.lesson === 6 || problem.lesson === 17) return arrayModelsForFacts(problem, problem.lesson === 17 && problem.session === 4 ? 'square' : 'dot');
  if (problem.lesson === 8) return [...groupedArrayModelsFor(problem), ...arrayModelsForFacts(problem)].slice(0, 4);
  if (problem.lesson === 9) return tensModelsFor(problem);
  if (problem.lesson === 12) return [...relatedFactsModelFor(problem), ...arrayModelsForFacts(problem)].slice(0, 4);
  if (problem.lesson >= 14 && problem.lesson <= 16) return arrayModelsForFacts(problem, 'square');
  if (problem.lesson === 18) return solvedLinesFor(problem).length ? [{ kind: 'source-directions', label: 'Solve the official two-step structure in order', items: solvedLinesFor(problem).slice(0, 6).map((line, index) => ({ lead: `${index + 1}`, text: line })) }] : [];
  return [];
};

const completedLessonTraceability = (
  problem: IReadySourceProblem,
  teacherEvidence: IReadyTeacherGuideProvenance
): IReadyActivityTraceability => {
  const printedPages = pageRange(problem.printedPages);
  const viewerPages = printedPages.map((page) => page + 12);
  const modelKinds = [...new Set(problem.solvedVisual.sections.map((section) => section.kind))];
  return {
    volume: 1,
    unit: problem.unit,
    lesson: problem.lesson,
    session: problem.session,
    officialActivityName: problem.label,
    studentDocument: 'iready-grade3-volume1-548-pages.pdf',
    studentSearchableDocument: 'iready-grade3-volume1-548-pages-searchable.pdf',
    studentPrintedPages: problem.printedPages,
    studentPdfViewerPages: viewerPages.join('–'),
    teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf',
    teacherSearchableDocument: 'iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf',
    teacherPrintedPages: teacherEvidence.teacherGuidePages,
    teacherPdfViewerPage: teacherEvidence.teacherPdfPage,
    modelType: modelKinds.join(' + '),
    verifiedValues: problem.sourceMarkers,
    verifiedAnswers: solvedLinesFor(problem),
    verificationStatus: 'verified-student-and-teacher',
    implementationLocation: 'src/app/pages/iready-interactive/iready-volume1-problems.ts'
  };
};

const reviewedSourceProblems = sourceProblems.map((problem): IReadySourceProblem => {
  const sequentiallyVerifiedLesson = problem.lesson >= 1 && problem.lesson <= 19;
  const recordedActivityEvidence = problem.lesson === 1
    ? lessonOneTraceabilityByKey[problem.key]
    : problem.lesson === 2
      ? lessonTwoTraceabilityByKey[problem.key]
      : problem.lesson === 3
        ? lessonThreeTraceabilityByKey[problem.key]
        : problem.lesson === 4
          ? lessonFourTraceabilityByKey[problem.key]
          : problem.lesson === 5
            ? lessonFiveTraceabilityByKey[problem.key]
            : problem.lesson === 6
              ? lessonSixTraceabilityByKey[problem.key]
              : problem.lesson === 7
                ? lessonSevenTraceabilityByKey[problem.key]
                : problem.lesson === 8
                  ? lessonEightTraceabilityByKey[problem.key]
                  : problem.lesson === 9
                    ? lessonNineTraceabilityByKey[problem.key]
                    : problem.lesson === 10
                      ? lessonTenTraceabilityByKey[problem.key]
                      : problem.lesson === 11
                        ? lessonElevenTraceabilityByKey[problem.key]
                        : problem.lesson === 12
                          ? lessonTwelveTraceabilityByKey[problem.key]
                          : problem.lesson === 13
                            ? lessonThirteenTraceabilityByKey[problem.key]
                            : undefined;
  const teacherEvidence = sequentiallyVerifiedLesson ? teacherGuideProvenanceForProblem(problem) : undefined;
  const activityEvidence = recordedActivityEvidence
    ?? (problem.lesson >= 14 && teacherEvidence ? completedLessonTraceability(problem, teacherEvidence) : undefined);
  if (sequentiallyVerifiedLesson && !activityEvidence) {
    throw new Error(`i-Ready Lesson ${problem.lesson} traceability rejected: ${problem.key} is missing activity-level source evidence.`);
  }
  if (activityEvidence && (!teacherEvidence ||
    activityEvidence.unit !== problem.unit
    || activityEvidence.lesson !== problem.lesson
    || activityEvidence.session !== problem.session
    || activityEvidence.studentPrintedPages !== problem.printedPages
    || Number(activityEvidence.studentPdfViewerPages.split('–')[0]) !== problem.viewerPage
    || activityEvidence.teacherPdfViewerPage !== teacherEvidence.teacherPdfPage
  )) {
    throw new Error(`i-Ready Lesson ${problem.lesson} traceability rejected: ${problem.key} does not match its implementation provenance.`);
  }
  const tracedProblem: IReadySourceProblem = activityEvidence
    ? { ...problem, traceability: activityEvidence }
    : problem;
  const sections = tracedProblem.solvedVisual.sections;
  const thin = sections.length === 1 && (sections[0].kind === 'equations' || sections[0].kind === 'note');
  if (!thin || THIN_VISUAL_REVIEWED_EXCEPTIONS.has(problem.key)) return tracedProblem;
  const reviewed = reviewedThinTeachingFor(tracedProblem);
  if (!reviewed.length) throw new Error(`i-Ready visual teaching rejected: ${tracedProblem.key} still has no reviewed mathematical model.`);
  return {
    ...tracedProblem,
    solvedVisual: {
      ...tracedProblem.solvedVisual,
      sections: [...reviewed, ...sections]
    }
  };
});

export const IREADY_VOLUME1_SOURCE_PROBLEMS = Object.freeze([...reviewedSourceProblems]);

export function sourceProblemsForSession(lesson: number, session: number): readonly IReadySourceProblem[] {
  return IREADY_VOLUME1_SOURCE_PROBLEMS
    .filter((problem) => problem.lesson === lesson && problem.session === session)
    .sort((left, right) => left.order - right.order);
}

export function lessonHasCompleteSourceProblemCoverage(lesson: number): boolean {
  return problemEvidence.completedLessons.some((coverage) => coverage.lesson === lesson);
}

export function teacherGuideProvenanceForProblem(problem: IReadySourceProblem): IReadyTeacherGuideProvenance | undefined {
  const problemPages = pageRange(problem.printedPages);
  return teacherProvenance.spreads.find((spread) => {
    const spreadPages = new Set(pageRange(spread.studentPages));
    return spread.lesson === problem.lesson && problemPages.every((page) => spreadPages.has(page));
  });
}
