import type {
  LessonAnimationModel,
  LessonRuntimeConfig,
  ProblemSetCenteredConceptSection,
  ProblemVisualSpec
} from '../lesson-runtime.types';

export const M5_TEACHER_PAGE_RANGES: Record<number, [number, number]> = {
  1: [12, 21], 2: [22, 30], 3: [31, 40], 4: [41, 53], 5: [54, 63],
  6: [64, 74], 7: [75, 85], 8: [86, 97], 9: [98, 111], 10: [112, 123],
  11: [124, 135], 12: [136, 147], 13: [148, 167], 14: [168, 177], 15: [178, 187],
  16: [188, 199], 17: [200, 210], 18: [211, 220], 19: [221, 233], 20: [234, 244],
  21: [245, 254], 22: [255, 264], 23: [265, 275], 24: [276, 288], 25: [289, 303],
  26: [304, 315], 27: [316, 328], 28: [329, 339], 29: [340, 351], 30: [352, 359]
};

export const M5_TEACHER_OBJECTIVES: Record<number, string> = {
  1: 'Specify and partition a whole into equal parts, identifying and counting unit fractions using concrete models.',
  2: 'Specify and partition a whole into equal parts, identifying and counting unit fractions by folding fraction strips.',
  3: 'Specify and partition a whole into equal parts, identifying and counting unit fractions by drawing pictorial area models.',
  4: 'Represent and identify fractional parts of different wholes.',
  5: 'Partition a whole into equal parts and define the equal parts to identify the unit fraction numerically.',
  6: 'Build non-unit fractions less than one whole from unit fractions.',
  7: 'Identify and represent shaded and non-shaded parts of one whole as fractions.',
  8: 'Represent parts of one whole as fractions with number bonds.',
  9: 'Build and write fractions greater than one whole using unit fractions.',
  10: 'Compare unit fractions by reasoning about their size using fraction strips.',
  11: 'Compare unit fractions with different-sized models representing the whole.',
  12: 'Specify the corresponding whole when presented with one equal part.',
  13: 'Identify a shaded fractional part in different ways depending on the designation of the whole.',
  14: 'Place fractions on a number line with endpoints 0 and 1.',
  15: 'Place any fraction on a number line with endpoints 0 and 1.',
  16: 'Place whole number fractions and fractions between whole numbers on the number line.',
  17: 'Practice placing various fractions on the number line.',
  18: 'Compare fractions and whole numbers on the number line by reasoning about their distance from 0.',
  19: 'Understand distance and position on the number line as strategies for comparing fractions. (Optional)',
  20: 'Recognize and show that equivalent fractions have the same size, though not necessarily the same shape.',
  21: 'Recognize and show that equivalent fractions refer to the same point on the number line.',
  22: 'Generate simple equivalent fractions by using visual fraction models and the number line.',
  23: 'Generate simple equivalent fractions by using visual fraction models and the number line.',
  24: 'Express whole numbers as fractions and recognize equivalence with different units.',
  25: 'Express whole number fractions on the number line when the unit interval is 1.',
  26: 'Decompose whole number fractions greater than 1 using whole number equivalence with various models.',
  27: 'Explain equivalence by manipulating units and reasoning about their size.',
  28: 'Compare fractions with the same numerator pictorially.',
  29: 'Compare fractions with the same numerator using <, >, or =, and use a model to reason about their size.',
  30: 'Partition various wholes precisely into equal parts using a number line method.'
};

export function m5TeacherSource(lessonNumber: number): string {
  const [start, end] = M5_TEACHER_PAGE_RANGES[lessonNumber];
  return `Module 5 Teacher Edition, lesson pages ${start}-${end}.`;
}

type FractionUnit = { label: string; numerator: number; denominator: number };
type NumberLineModel = { label: string; ticks: string[]; targets?: number[] };
type ConceptSpec = {
  title: string;
  context: string;
  equation: string;
  question: string;
  focus: string[];
  fractions?: FractionUnit[];
  lines?: NumberLineModel[];
  table?: { columns: string[]; rows: string[][] };
  sourceCrop?: { src: string; imageWidth?: number; imageHeight?: number; crop: { x: number; y: number; width: number; height: number }; caption: string };
};

const M5_CONCEPT_SPECS: Record<number, ConceptSpec> = {
  1: { title: 'partition concrete wholes', context: 'Measure the same 12-inch whole into halves, fourths, thirds, and sixths, then connect the equal parts to a beaker whole.', equation: '1 whole = 2 halves = 4 fourths = 3 thirds = 6 sixths', question: 'How do measurement and equal pours prove that every part is equal?', focus: ['named whole', 'equal parts', 'unit fraction', 'count the units'], fractions: units(['1/2', '1/4', '1/3', '1/6']) },
  2: { title: 'fold fraction strips', context: 'Fold the same strip into halves, fourths, and eighths, and another strip into thirds and sixths.', equation: '1 whole = 2 halves = 4 fourths = 8 eighths', question: 'Which folds create equal parts, and how can the edges verify equality?', focus: ['same strip', 'folding', 'equal parts', 'unit names'], fractions: units(['1/2', '1/4', '1/8', '1/3', '1/6']) },
  3: { title: 'draw pictorial area models', context: 'Partition whole shapes into equal areas before shading or naming eighths, thirds, halves, and fourths.', equation: 'fraction = shaded equal parts / total equal parts', question: 'What visual evidence proves the parts have equal area?', focus: ['whole shape', 'equal area', 'shade', 'fractional unit'], fractions: [unit('5/8'), unit('3/3'), unit('1/2'), unit('1/4')] },
  4: { title: 'name fractions of different wholes', context: 'Identify the whole before naming the fractional part; the same fraction name can refer to different-sized amounts.', equation: '1/2 of Whole A and 1/2 of Whole B are not the same amount unless the wholes match', question: 'How does changing the whole change the size represented by the same fraction?', focus: ['designated whole', 'equal groups', 'part size', 'fraction name'], table: { columns: ['Model', 'Designated whole', 'Named part'], rows: [['A', 'small whole', '1/2'], ['B', 'large whole', '1/2']] } },
  5: { title: 'define unit fractions numerically', context: 'Read the official chart by counting total equal parts and the one shaded equal part in differently shaped wholes.', equation: '1 shaded equal part out of n equal parts = 1/n', question: 'Why is the denominator determined by all equal parts, not the shape of the whole?', focus: ['different shapes', 'equal parts', 'unit form', 'fraction form'], sourceCrop: { src: '/source-pages/m5-student/workbook-page-017.png', crop: { x: 60, y: 160, width: 700, height: 790 }, caption: 'The official chart requires the same four facts for six differently shaped wholes.' } },
  6: { title: 'build non-unit fractions', context: 'Compose several copies of one unit fraction while keeping the denominator and whole fixed.', equation: '3 copies of 1/4 = 3/4', question: 'How does each shaded unit contribute one copy of the same unit fraction?', focus: ['unit fraction', 'compose', 'numerator', 'less than one whole'], fractions: [unit('3/4'), unit('3/7'), unit('4/5'), unit('2/6')] },
  7: { title: 'relate shaded and unshaded parts', context: 'Name both the shaded and unshaded parts of one whole and verify that their numerators combine to the denominator.', equation: '1/5 + 4/5 = 5/5 = 1 whole', question: 'How do the shaded and unshaded fractions account for every equal part?', focus: ['shaded fraction', 'unshaded fraction', 'same denominator', 'one whole'], fractions: [unit('1/5'), unit('4/5'), unit('5/5')] },
  8: { title: 'represent fractions with number bonds', context: 'Decompose one whole into shaded and unshaded fractional parts, then decompose each part into unit fractions.', equation: '2/5 + 3/5 = 5/5 = 1 whole', question: 'How does the number bond preserve the whole while showing two fractional parts?', focus: ['number bond', 'part-part-whole', 'unit fractions', 'visual model'], fractions: [unit('2/5'), unit('3/5'), unit('5/5')] },
  9: { title: 'compose fractions greater than one', context: 'Count unit fractions continuously across complete wholes and the remaining part.', equation: '15/8 = 8/8 + 7/8 = 1 7/8', question: 'Why does the numerator continue increasing after one whole is completed?', focus: ['unit fraction', 'complete whole', 'fraction greater than one', 'continuous count'], fractions: [unit('8/8'), unit('7/8')] },
  10: { title: 'compare unit fractions with strips', context: 'Use same-size fraction strips to compare one half, one fourth, one eighth, one third, and one sixth.', equation: 'For the same whole: 1/2 > 1/3 > 1/4 > 1/6 > 1/8', question: 'Why does dividing the same whole into more equal parts make each unit fraction smaller?', focus: ['same whole', 'unit fraction', 'denominator', 'relative size'], fractions: units(['1/2', '1/3', '1/4', '1/6', '1/8']) },
  11: { title: 'compare unit fractions of different wholes', context: 'Compare the source models only after identifying whether the wholes are the same size.', equation: 'A larger-looking piece does not prove a larger fraction when the wholes differ', question: 'Which comparison is about fraction size, and which is only about the physical piece?', focus: ['different wholes', 'unit fractions', 'model size', 'valid comparison'], sourceCrop: { src: '/source-pages/m5-student/workbook-page-041.png', crop: { x: 60, y: 175, width: 700, height: 760 }, caption: 'The official models deliberately change whole shape and size, so the whole must be named first.' } },
  12: { title: 'reconstruct the corresponding whole', context: 'Treat the presented piece as one equal part and assemble enough copies to make a possible whole.', equation: '1 unit part × number of equal parts = 1 whole', question: 'What different wholes can contain the same given unit part?', focus: ['given part', 'possible whole', 'equal copies', 'number bond'], table: { columns: ['Given part', 'Copies used', 'Possible whole'], rows: [['yellow strip', '2', '2/2'], ['orange square', '4', '4/4'], ['piece of yarn', '3', '3/3']] } },
  13: { title: 'change the designation of the whole', context: 'First treat the full shape as one whole; then treat only the shaded part as one whole and repartition it.', equation: 'The same shaded region can be 1/n of one whole and n/n of a newly designated whole', question: 'Which boundary tells us what counts as one whole in each part?', focus: ['designated whole', 'same shaded region', 'repartition', 'unit fraction'], sourceCrop: { src: '/source-pages/m5-student/workbook-page-052.png', crop: { x: 60, y: 170, width: 700, height: 790 }, caption: 'The two official columns change which region is designated as one whole.' } },
  14: { title: 'partition the unit interval', context: 'Partition the distance from 0 to 1 into equal intervals and label each point in the same fractional unit.', equation: '4 equal intervals: 0/4, 1/4, 2/4, 3/4, 4/4 = 1', question: 'Why do four equal intervals require five tick marks?', focus: ['0 endpoint', '1 endpoint', 'equal intervals', 'fraction labels'], lines: [line('Fourths from 0 to 1', ['0/4 = 0', '1/4', '2/4', '3/4', '4/4 = 1'], [1, 2, 3])] },
  15: { title: 'place any fraction from 0 to 1', context: 'Choose the denominator, partition the unit interval into that many equal intervals, and count from 0.', equation: '7/8 is seven equal eighth intervals from 0', question: 'How does the denominator control the partition and the numerator control the location?', focus: ['unit interval', 'denominator', 'numerator', 'distance from 0'], lines: [line('Eighths from 0 to 1', ['0/8 = 0', '1/8', '2/8', '3/8', '4/8', '5/8', '6/8', '7/8', '8/8 = 1'], [7])] },
  16: { title: 'extend fractional units beyond one', context: 'Repeat the same fractional interval across consecutive wholes and name whole-number points as fractions.', equation: '3/3 = 1, 6/3 = 2, 9/3 = 3', question: 'How do equal third intervals continue unchanged across every whole?', focus: ['fractions beyond one', 'whole-number fractions', 'repeated unit', 'number line'], lines: [line('Thirds from 0 to 3', ['0/3 = 0', '1/3', '2/3', '3/3 = 1', '4/3', '5/3', '6/3 = 2', '7/3', '8/3', '9/3 = 3'], [3, 6, 9])] },
  17: { title: 'place varied fractions precisely', context: 'Partition extended number lines into sixths, fourths, thirds, and fifths before locating the requested values.', equation: 'fraction location = numerator equal intervals from 0', question: 'What stays consistent when the denominator or endpoints change?', focus: ['extended line', 'equal intervals', 'fraction labels', 'context units'], lines: [line('Sixths from 0 to 3', ['0', '3/6', '6/6 = 1', '9/6', '12/6 = 2', '18/6 = 3'], [1, 3, 5])] },
  18: { title: 'compare by distance from zero', context: 'Place both values on the same number line and compare their distances from 0 before writing a symbol.', equation: '2/6 < 3/6 because 2/6 is closer to 0', question: 'How does position prove the comparison without relying only on numerator and denominator rules?', focus: ['same number line', 'distance from 0', 'greater position', 'comparison symbol'], lines: [line('Sixths comparison', ['0', '1/6', '2/6', '3/6', '4/6', '5/6', '6/6 = 1'], [2, 3])] },
  19: { title: 'coordinate distance and position', context: 'Use aligned halves, fourths, and eighths number lines to compare locations and whole-number endpoints.', equation: 'Equivalent positions have the same distance from 0', question: 'When do different fraction names land at the same point?', focus: ['aligned lines', 'distance', 'position', 'equivalence'], lines: [line('Halves', ['0/2', '1/2', '2/2 = 1'], [1]), line('Fourths', ['0/4', '1/4', '2/4 = 1/2', '3/4', '4/4 = 1'], [2]), line('Eighths', ['0/8', '2/8', '4/8 = 1/2', '6/8', '8/8 = 1'], [2])] },
  20: { title: 'show equivalent areas in different shapes', context: 'Partition the same-size whole in different ways and identify models that shade the same total area.', equation: '1/2 = 2/4 = 3/6', question: 'What must stay the same for differently shaped pieces to represent equivalent fractions?', focus: ['same-size whole', 'same shaded area', 'different partitions', 'equivalent fractions'], fractions: [unit('1/2'), unit('2/4'), unit('3/6')] },
  21: { title: 'locate equivalent fractions at one point', context: 'Align number lines with different units and identify fraction names that land at the same distance from 0.', equation: '1/2 = 3/6', question: 'Why can one point on a number line have more than one fraction name?', focus: ['aligned number lines', 'same point', 'different units', 'equivalence'], lines: [line('Sixths with one-half', ['0/6', '1/6', '2/6', '3/6 = 1/2', '4/6', '5/6', '6/6 = 1'], [3])] },
  22: { title: 'generate equivalent fractions', context: 'Split each existing fractional unit into the same number of smaller equal units without changing the shaded amount.', equation: '1/2 = 2/4 and 1/3 = 2/6', question: 'How do the numerator and denominator change together while the amount stays fixed?', focus: ['split every unit', 'same amount', 'multiply numerator', 'multiply denominator'], fractions: [unit('1/2'), unit('2/4'), unit('1/3'), unit('2/6')] },
  23: { title: 'connect fourths and eighths', context: 'Partition the same 0-to-1 interval into fourths and then eighths, aligning every equivalent point.', equation: '1/4 = 2/8, 2/4 = 4/8, 3/4 = 6/8', question: 'Which eighths marks coincide with the fourths marks?', focus: ['fourths', 'eighths', 'aligned points', 'equivalent labels'], lines: [line('Fourth and eighth labels', ['0/4 = 0/8', '1/8', '1/4 = 2/8', '3/8', '2/4 = 4/8', '5/8', '3/4 = 6/8', '7/8', '4/4 = 8/8'], [2, 4, 6])] },
  24: { title: 'name whole numbers as fractions', context: 'Use different fractional units to name one whole and extend the same reasoning to other whole numbers.', equation: '1 = 2/2 = 3/3 = 4/4 = 5/5', question: 'Why must a fraction equal to one whole have matching numerator and denominator?', focus: ['whole number', 'fractional unit', 'equivalence', 'number bond'], table: { columns: ['Whole', 'Equivalent fraction names'], rows: [['1', '2/2, 3/3, 4/4, 5/5'], ['2', '4/2, 6/3, 8/4']] } },
  25: { title: 'place whole-number fractions', context: 'Keep every unit interval equal to 1 and partition each whole into the chosen fractional unit.', equation: '4/4 = 1, 8/4 = 2, 12/4 = 3', question: 'How do denominator-sized groups of intervals identify each whole-number point?', focus: ['unit interval is 1', 'whole-number fractions', 'repeated partition', 'number line'], lines: [line('Fourths across three wholes', ['0/4 = 0', '1/4', '2/4', '3/4', '4/4 = 1', '6/4', '8/4 = 2', '10/4', '12/4 = 3'], [4, 6, 8])] },
  26: { title: 'decompose fractions greater than one', context: 'Separate complete denominator-sized groups from the remaining unit fractions.', equation: '4/3 = 3/3 + 1/3 = 1 + 1/3', question: 'Which units make a complete whole, and which units remain?', focus: ['whole-number equivalence', 'decompose', 'unit fractions', 'number bond'], fractions: [unit('3/3'), unit('1/3')] },
  27: { title: 'explain equivalence by changing units', context: 'Cut each half into two fourths or three sixths and reason about the size and number of units.', equation: '1/2 = 2/4 = 3/6', question: 'Why do smaller units require more copies to cover the same amount?', focus: ['manipulate units', 'unit size', 'unit count', 'same amount'], fractions: [unit('1/2'), unit('2/4'), unit('3/6')] },
  28: { title: 'compare fractions with the same numerator', context: 'Hold the number of selected parts constant and compare the sizes of the fractional units pictorially.', equation: '2/5 < 2/3', question: 'Why does the fraction with the smaller denominator have larger parts when the wholes match?', focus: ['same numerator', 'same whole', 'unit size', 'pictorial comparison'], fractions: [unit('2/5'), unit('2/3')] },
  29: { title: 'compare and write a relation symbol', context: 'Model fractions with the same numerator, determine which occupies more of the same whole, then write <, >, or =.', equation: '3/4 > 3/8', question: 'How does the model justify the direction of the comparison symbol?', focus: ['same numerator', 'model', 'unit size', 'comparison symbol'], fractions: [unit('3/4'), unit('3/8')] },
  30: { title: 'transfer equal partitions to any whole', context: 'Use lined paper as a base number line, extend equal guide marks, and transfer thirds to an angled strip.', equation: '0, 1/3, 2/3, 3/3 = 1', question: 'Why does transferring parallel guide marks preserve equal parts on a different-length whole?', focus: ['base number line', 'equal paper spaces', 'parallel transfer', 'arbitrary whole'], lines: [line('Thirds transfer guide', ['0', '1/3', '2/3', '3/3 = 1'], [1, 2])], sourceCrop: { src: '/source-pages/m5-teacher/page-355.png', imageWidth: 1275, imageHeight: 1650, crop: { x: 740, y: 150, width: 425, height: 900 }, caption: 'The Teacher Edition photographs show the angled red strip crossing parallel extensions from equal base-number-line intervals.' } }
};

function unit(value: string): FractionUnit {
  const [numerator, denominator] = value.split('/').map(Number);
  return { label: value, numerator, denominator };
}

function units(values: string[]): FractionUnit[] {
  return values.map(unit);
}

function line(label: string, ticks: string[], targets: number[] = []): NumberLineModel {
  return { label, ticks, targets };
}

function fractionSection(model: FractionUnit): ProblemVisualSpec['sections'][number] {
  return {
    kind: 'fraction-strip', label: model.label, wholeLabel: '1 whole', numerator: model.numerator,
    denominator: model.denominator, unitLabel: `1/${model.denominator}`,
    caption: `${model.numerator}/${model.denominator} uses ${model.numerator} of ${model.denominator} equal parts.`
  };
}

function numberLineSection(model: NumberLineModel): ProblemVisualSpec['sections'][number] {
  return {
    kind: 'number-line', label: model.label,
    ticks: model.ticks.map((label, index) => ({ label, target: model.targets?.includes(index) })),
    caption: 'Every adjacent tick is separated by one equal fractional interval.'
  };
}

function conceptVisual(lessonNumber: number, spec: ConceptSpec): ProblemVisualSpec {
  if (spec.sourceCrop) {
    return {
      title: spec.title,
      sections: [{
        kind: 'source-crop', label: `Official Lesson ${lessonNumber} model`, src: spec.sourceCrop.src,
        alt: `Official Module 5 Lesson ${lessonNumber} fraction model`, imageWidth: spec.sourceCrop.imageWidth ?? 850, imageHeight: spec.sourceCrop.imageHeight ?? 1100,
        crop: spec.sourceCrop.crop, caption: spec.sourceCrop.caption
      }]
    };
  }
  if (spec.table) {
    return { title: spec.title, sections: [{ kind: 'data-table', label: spec.title, ...spec.table }] };
  }
  if (spec.lines?.length) {
    const lineSections = spec.lines.map(numberLineSection);
    return lineSections.length === 1
      ? { title: spec.title, sections: lineSections }
      : { title: spec.title, sections: [{ kind: 'card-grid', label: spec.title, cards: spec.lines.map((model) => ({ label: model.label, sections: [numberLineSection(model)] })) }] };
  }
  const fractionSections = (spec.fractions ?? [unit('1/2')]).map(fractionSection);
  return fractionSections.length === 1
    ? { title: spec.title, sections: fractionSections }
    : { title: spec.title, sections: [{ kind: 'card-grid', label: spec.title, cards: (spec.fractions ?? []).map((model) => ({ label: model.label, sections: [fractionSection(model)] })) }] };
}

function conceptSteps(spec: ConceptSpec): NonNullable<LessonAnimationModel['conceptSteps']> {
  return [
    { label: 'Establish', action: spec.context, result: `The whole and ${spec.focus[0]} are identified.` },
    { label: 'Model', action: `Build the source relationship: ${spec.equation}.`, result: `The ${spec.focus[1]} structure is visible.` },
    { label: 'Explain', action: spec.question, result: `The model justifies ${spec.focus[2]} and ${spec.focus[3]}.` }
  ];
}

export const M5_FUNCTIONAL_ANIMATIONS: Record<number, LessonAnimationModel> = Object.fromEntries(
  Object.entries(M5_CONCEPT_SPECS).map(([lessonKey, spec]) => {
    const lessonNumber = Number(lessonKey);
    const firstFraction = spec.fractions?.[0] ?? unit('1/2');
    const lineLabels = spec.lines?.[0]?.ticks;
    const kind: LessonAnimationModel['kind'] = spec.lines?.length ? 'number-line' : 'fraction-strip';
    return [lessonNumber, {
      kind,
      title: `Lesson ${lessonNumber} animation: ${spec.title}`,
      context: spec.context,
      equation: spec.equation,
      teacherPrompt: spec.question,
      focus: spec.focus,
      fractionPartCount: firstFraction.denominator,
      fractionShadedCount: Math.min(firstFraction.numerator, firstFraction.denominator),
      numberLineLabels: lineLabels,
      numberLineJumps: lineLabels?.slice(1).map(() => 'equal interval'),
      conceptSteps: conceptSteps(spec),
      conceptVisual: conceptVisual(lessonNumber, spec)
    } satisfies LessonAnimationModel];
  })
) as Record<number, LessonAnimationModel>;

export function m5FunctionalConceptSections(lessonNumber: number): ProblemSetCenteredConceptSection[] {
  const spec = M5_CONCEPT_SPECS[lessonNumber];
  const source = m5TeacherSource(lessonNumber);
  return [
    {
      title: `1. Establish the Lesson ${lessonNumber} whole`, body: spec.context, teacherSource: source,
      checkpoints: [`Name ${spec.focus[0]}.`, `Keep ${spec.focus[1]} explicit.`, 'Use the official whole and quantities.']
    },
    {
      title: `2. Build the ${spec.title} model`, body: spec.equation, teacherSource: source,
      checkpoints: [`Show ${spec.focus[1]}.`, `Connect the model to ${spec.focus[2]}.`, 'Keep every fractional unit equal.']
    },
    {
      title: '3. Explain what the model proves', body: spec.question, teacherSource: source,
      checkpoints: [`Justify ${spec.focus[2]}.`, `Use ${spec.focus[3]} in the explanation.`, 'Check the result against the designated whole.']
    }
  ];
}

export function alignM5RuntimeSources(runtime: LessonRuntimeConfig, lessonNumber: number): LessonRuntimeConfig {
  const teacherSource = m5TeacherSource(lessonNumber);
  const exactObjective = M5_TEACHER_OBJECTIVES[lessonNumber];
  return {
    ...runtime,
    lessonAnimation: M5_FUNCTIONAL_ANIMATIONS[lessonNumber],
    teacherEditionSteps: runtime.teacherEditionSteps?.map((step) => ({
      ...step,
      studentPrompt: step.id === 'source-goal' ? exactObjective : step.studentPrompt,
      teacherEditionBasis: /Teacher Edition|teacher_edition|lesson pages/i.test(step.teacherEditionBasis)
        ? teacherSource
        : step.teacherEditionBasis
    })),
    sourceRows: runtime.sourceRows
      ? Object.fromEntries(Object.entries(runtime.sourceRows).map(([key, rows]) => [
          key,
          rows.map((row) => ({
            ...row,
            value: key === 'source-goal' && row.label === 'Source text'
              ? exactObjective
              : row.label === 'Source' && /Teacher Edition|teacher_edition|lesson pages/i.test(row.value)
                ? teacherSource
                : row.value
          }))
        ]))
      : runtime.sourceRows
  };
}
