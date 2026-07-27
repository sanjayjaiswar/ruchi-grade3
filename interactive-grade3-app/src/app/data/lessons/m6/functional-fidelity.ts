import type {
  LessonAnimationModel,
  LessonRuntimeConfig,
  ProblemSetCenteredConceptSection,
  ProblemVisualSpec
} from '../lesson-runtime.types';

export const M6_TEACHER_PAGE_RANGES: Record<number, [number, number]> = {
  1: [10, 21], 2: [22, 32], 3: [33, 49], 4: [50, 65], 5: [66, 77],
  6: [78, 92], 7: [93, 105], 8: [106, 119], 9: [120, 134]
};

export const M6_TEACHER_OBJECTIVES: Record<number, string> = {
  1: 'Generate and organize data.',
  2: 'Rotate tape diagrams vertically.',
  3: 'Create scaled bar graphs.',
  4: 'Solve one- and two-step problems involving graphs.',
  5: 'Create ruler with 1-inch, ½-inch, and ¼-inch intervals, and generate measurement data.',
  6: 'Interpret measurement data from various line plots.',
  7: 'Represent measurement data with line plots.',
  8: 'Represent measurement data with line plots.',
  9: 'Analyze data to problem solve.'
};

export function m6TeacherSource(lessonNumber: number): string {
  const [start, end] = M6_TEACHER_PAGE_RANGES[lessonNumber];
  return `Module 6 Teacher Edition, lesson pages ${start}-${end}.`;
}

type ConceptSpec = {
  title: string;
  context: string;
  equation: string;
  question: string;
  focus: [string, string, string, string];
  kind: LessonAnimationModel['kind'];
  visual: ProblemVisualSpec;
  graphBars?: Array<{ label: string; value: number }>;
  tape?: { count: number; label: string; whole: string };
  measurementTicks?: string[];
};

const M6_CONCEPT_SPECS: Record<number, ConceptSpec> = {
  1: {
    title: 'turn survey tallies into picture-graph units',
    context: 'Collect one favorite-color response per student, organize the responses in a tally chart, total the data, and represent the same counts with a stated picture-graph key.',
    equation: '4 + 2 + 6 + 7 + 3 = 22 students',
    question: 'How does changing the key from 1 student per symbol to 2 students per symbol change the number of symbols without changing the data?',
    focus: ['one response per student', 'tally counts', 'picture-graph key', 'same data'],
    kind: 'graph',
    graphBars: [{ label: 'Green', value: 4 }, { label: 'Yellow', value: 2 }, { label: 'Red', value: 6 }, { label: 'Blue', value: 7 }, { label: 'Orange', value: 3 }],
    visual: {
      title: 'Favorite-color survey: tally to picture graph',
      sections: [
        { kind: 'data-table', label: 'Example Board survey counts', columns: ['Color', 'Students'], rows: [['Green', '4'], ['Yellow', '2'], ['Red', '6'], ['Blue', '7'], ['Orange', '3']] },
        { kind: 'data-chart', chart: 'picture', label: 'Favorite Colors', values: [{ label: 'Green', value: 4 }, { label: 'Yellow', value: 2 }, { label: 'Red', value: 6 }, { label: 'Blue', value: 7 }, { label: 'Orange', value: 3 }], unitSize: 2, keyLabel: '1 full symbol = 2 students; 1 half symbol = 1 student', showBlankValues: true, caption: 'The key determines how many students each symbol represents.' }
      ]
    }
  },
  2: {
    title: 'rotate equal-unit tape diagrams vertically',
    context: 'Keep each student total fixed while turning horizontal equal-unit tapes upright. Then regroup units of 4 as units of 8 and explain why the number of units changes.',
    equation: 'Anna: 8 × 4 = 32 stamps = 4 × 8 stamps',
    question: 'Why does doubling the value of each unit halve the number of units needed for the same total?',
    focus: ['fixed stamp total', 'equal tape units', 'vertical orientation', 'unit-size reasoning'],
    kind: 'tape-diagram',
    tape: { count: 8, label: '4 stamps', whole: 'Anna: 8 units of 4 = 32 stamps' },
    visual: {
      title: 'Stamps by student',
      sections: [{
        kind: 'card-grid', label: 'Vertical tapes with a unit size of 4', cards: [
          { label: 'Dana', sections: [{ kind: 'tape', label: 'Dana', totalLabel: '16 stamps', parts: Array.from({ length: 4 }, () => ({ label: '4' })), caption: '4 units of 4' }] },
          { label: 'Tanisha', sections: [{ kind: 'tape', label: 'Tanisha', totalLabel: '8 stamps', parts: Array.from({ length: 2 }, () => ({ label: '4' })), caption: '2 units of 4' }] },
          { label: 'Raquel', sections: [{ kind: 'tape', label: 'Raquel', totalLabel: '24 stamps', parts: Array.from({ length: 6 }, () => ({ label: '4' })), caption: '6 units of 4' }] },
          { label: 'Anna', sections: [{ kind: 'tape', label: 'Anna', totalLabel: '32 stamps', parts: Array.from({ length: 8 }, () => ({ label: '4' })), caption: '8 units of 4' }] }
        ]
      }]
    }
  },
  3: {
    title: 'build and read a scaled bar graph',
    context: 'Transfer exact table values to bars, label equal scale intervals, and read values or comparisons from bar height—even when a value falls between numbered scale marks.',
    equation: '9 + 16 + 13 + 18 = 56 students',
    question: 'How does the scale tell the value of a bar whose height falls between two numbered marks?',
    focus: ['source table', 'equal scale intervals', 'bar height', 'comparison equation'],
    kind: 'graph',
    graphBars: [{ label: 'Baking', value: 9 }, { label: 'Sports', value: 16 }, { label: 'Chorus', value: 13 }, { label: 'Drama', value: 18 }],
    visual: { title: 'Number of Students in Each Class', sections: [{ kind: 'data-chart', chart: 'bar', label: 'Scaled bar graph', values: [{ label: 'Baking', value: 9 }, { label: 'Sports', value: 16 }, { label: 'Chorus', value: 13 }, { label: 'Drama', value: 18 }], maxValue: 20, scaleLabel: '0 to 20 by 2 students', showBlankValues: true, caption: 'Every equal vertical interval represents 2 students.' }] }
  },
  4: {
    title: 'solve multi-step questions from graph evidence',
    context: 'Choose a scale that displays values from 100 to 600, draw exact bar heights, combine the requested categories, and compare the resulting totals.',
    equation: '300 + 450 − 600 = 150 magazines',
    question: 'Which values must be combined before the comparison is made, and how does the graph verify the result?',
    focus: ['appropriate scale', 'exact bar values', 'combine categories', 'compare totals'],
    kind: 'graph',
    graphBars: [{ label: 'Ben', value: 300 }, { label: 'Rachel', value: 250 }, { label: 'Jeff', value: 100 }, { label: 'Stanley', value: 450 }, { label: 'Debbie', value: 600 }],
    visual: { title: 'Number of Magazines Sold', sections: [{ kind: 'data-chart', chart: 'bar', label: 'Third-grade magazine sales', values: [{ label: 'Ben', value: 300 }, { label: 'Rachel', value: 250 }, { label: 'Jeff', value: 100 }, { label: 'Stanley', value: 450 }, { label: 'Debbie', value: 600 }], maxValue: 600, scaleLabel: 'A valid equal-interval scale from 0 to 600', showBlankValues: true, caption: 'The graph supplies the values used in each one- or two-step comparison.' }] }
  },
  5: {
    title: 'partition one ruler into increasingly precise intervals',
    context: 'Mark whole inches first, then halve each inch, then halve each half-inch to create quarter-inch intervals on the same strip.',
    equation: '1 inch = 2 half inches = 4 quarter inches',
    question: 'Why can the quarter-inch ruler report a more precise straw measurement than the whole-inch or half-inch ruler?',
    focus: ['zero endpoint', 'whole inches', 'half and quarter inches', 'measurement precision'],
    kind: 'measurement',
    measurementTicks: ['0', '1/4', '1/2', '3/4', '1', '1 1/4', '1 1/2', '1 3/4', '2', '2 1/4', '2 1/2', '2 3/4', '3'],
    visual: {
      title: 'Whole-, half-, and quarter-inch ruler',
      sections: [
        { kind: 'number-line', label: 'Paper ruler', ticks: ['0', '1/4', '1/2', '3/4', '1', '1 1/4', '1 1/2', '1 3/4', '2'].map((label) => ({ label, target: label.includes('/4') })), caption: 'Each inch is partitioned into four equal quarter-inch intervals.' },
        { kind: 'data-table', label: 'Equivalent interval counts', columns: ['Length', 'Equal intervals'], rows: [['1 inch', '2 half inches'], ['1 inch', '4 quarter inches'], ['1/2 inch', '2 quarter inches'], ['4 inches', '8 half inches']] }
      ]
    }
  },
  6: {
    title: 'interpret fractional measurement line plots',
    context: 'Label the measurement scale in equal fractional intervals, read each X as one observation, total frequencies, and compare groups of measurements.',
    equation: '15 children total; 6 shorter than 53 inches; 4 at least 54 inches',
    question: 'How do the fractional tick labels and stacks of Xs provide the evidence for each answer?',
    focus: ['fractional scale', 'one X per measurement', 'frequency stacks', 'comparison statement'],
    kind: 'graph',
    visual: { title: 'Basketball team heights', sections: [{ kind: 'line-plot', label: 'Heights of Children on Third-Grade Basketball Team', values: lineValues(['51', '51 1/2', '52', '52 1/2', '53', '53 1/2', '54', '54 1/2', '55'], [2, 0, 3, 1, 2, 3, 1, 2, 1]), keyLabel: 'X = 1 child', showBlankValues: true, caption: 'Count Xs at each half-inch measurement.' }] }
  },
  7: {
    title: 'construct a quarter-inch line plot from raw data',
    context: 'Find the smallest and largest bean-plant heights, select quarter-inch intervals, plot each measurement exactly once, and add a title, unit label, and key.',
    equation: '1 3/4: 4 plants; 2: 2; 2 1/4: 3; 2 1/2: 3; 2 3/4: 2; 3: 3; 3 1/4: 3',
    question: 'Why must the line-plot interval be one quarter inch for every source measurement to land on the scale?',
    focus: ['raw measurements', 'quarter-inch scale', 'one X per value', 'frequency interpretation'],
    kind: 'graph',
    visual: { title: 'Heights of Bean Plants', sections: [{ kind: 'line-plot', label: 'Bean-plant heights', values: lineValues(['1 3/4', '2', '2 1/4', '2 1/2', '2 3/4', '3', '3 1/4'], [4, 2, 3, 3, 2, 3, 3]), keyLabel: 'X = 1 bean plant', showBlankValues: true, caption: 'The scale advances by one quarter inch from the smallest to the largest value.' }] }
  },
  8: {
    title: 'use a larger line plot to describe typical values',
    context: 'Plot every silver-maple leaf width to the nearest quarter inch, compare frequencies, and use the three tallest stacks to describe a typical range.',
    equation: '6-inch leaves: 8; 6 1/2-inch leaves: 4; difference = 4',
    question: 'What do the three most frequent measurements reveal about the typical width of these leaves?',
    focus: ['large data set', 'quarter-inch positions', 'frequency shape', 'typical values'],
    kind: 'graph',
    visual: { title: 'Widths of Silver Maple Tree Leaves', sections: [{ kind: 'line-plot', label: 'Leaf widths', values: lineValues(['5 1/2', '5 3/4', '6', '6 1/4', '6 1/2', '6 3/4'], [1, 5, 8, 6, 4, 1]), keyLabel: 'X = 1 leaf', showBlankValues: true, caption: 'The tallest stacks occur at 6, 6 1/4, and 5 3/4 inches.' }] }
  },
  9: {
    title: 'select and analyze an appropriate data display',
    context: 'Use a picture graph for categorical apple counts and a line plot for measured grass lengths, then solve comparison, equal-group, total, and frequency questions.',
    equation: '72 − (16 + 12 + 20) = 24 apples for Roxanne',
    question: 'Why does categorical apple data fit a picture graph while measured grass lengths fit a line plot?',
    focus: ['data type', 'appropriate display', 'scale or interval', 'problem-solving evidence'],
    kind: 'graph',
    graphBars: [{ label: 'Stewart', value: 16 }, { label: 'Roxanne', value: 24 }, { label: 'Trisha', value: 12 }, { label: 'Philip', value: 20 }],
    visual: {
      title: 'Choose the display that matches the data',
      sections: [
        { kind: 'data-chart', chart: 'picture', label: 'Apples Picked', values: [{ label: 'Stewart', value: 16 }, { label: 'Roxanne', value: 24 }, { label: 'Trisha', value: 12 }, { label: 'Philip', value: 20 }], unitSize: 4, keyLabel: '1 symbol = 4 apples', showBlankValues: true, caption: 'Children are categories, so a picture graph compares their counts.' },
        { kind: 'line-plot', label: 'Lengths of Blades of Grass', values: lineValues(['2', '2 1/4', '2 1/2', '2 3/4', '3', '3 1/4', '3 1/2', '3 3/4'], [1, 3, 2, 6, 4, 5, 0, 3]), keyLabel: 'X = 1 blade of grass', showBlankValues: true, caption: 'Measured lengths belong at ordered quarter-inch positions.' }
      ]
    }
  }
};

function lineValues(labels: string[], counts: number[]) {
  return labels.map((label, index) => ({ label, value: counts[index] ?? 0, target: Boolean(counts[index]) }));
}

function conceptSteps(spec: ConceptSpec): NonNullable<LessonAnimationModel['conceptSteps']> {
  return [
    { label: 'Establish', action: spec.context, result: `${spec.focus[0]} and ${spec.focus[1]} are explicit.` },
    { label: 'Model', action: `Build the source relationship: ${spec.equation}.`, result: `The ${spec.focus[2]} structure is visible.` },
    { label: 'Interpret', action: spec.question, result: `The conclusion is justified by ${spec.focus[3]}.` }
  ];
}

export const M6_FUNCTIONAL_ANIMATIONS: Record<number, LessonAnimationModel> = Object.fromEntries(
  Object.entries(M6_CONCEPT_SPECS).map(([lessonKey, spec]) => {
    const lessonNumber = Number(lessonKey);
    return [lessonNumber, {
      kind: spec.kind,
      title: `Lesson ${lessonNumber} animation: ${spec.title}`,
      context: spec.context,
      equation: spec.equation,
      teacherPrompt: spec.question,
      focus: spec.focus,
      graphBars: spec.graphBars,
      tapePartCount: spec.tape?.count,
      tapePartLabel: spec.tape?.label,
      tapeWholeLabel: spec.tape?.whole,
      measurementTicks: spec.measurementTicks,
      conceptSteps: conceptSteps(spec),
      conceptVisual: spec.visual
    } satisfies LessonAnimationModel];
  })
) as Record<number, LessonAnimationModel>;

export function m6FunctionalConceptSections(lessonNumber: number): ProblemSetCenteredConceptSection[] {
  const spec = M6_CONCEPT_SPECS[lessonNumber];
  const source = m6TeacherSource(lessonNumber);
  return [
    {
      title: `1. Establish the Lesson ${lessonNumber} data and units`, body: spec.context, teacherSource: source,
      checkpoints: [`Identify ${spec.focus[0]}.`, `State ${spec.focus[1]}.`, 'Preserve the official labels, values, and units.']
    },
    {
      title: `2. Build the ${spec.title} model`, body: spec.equation, teacherSource: source,
      checkpoints: [`Show ${spec.focus[1]}.`, `Make ${spec.focus[2]} visible.`, 'Use one consistent scale, key, or interval.']
    },
    {
      title: '3. Interpret what the display proves', body: spec.question, teacherSource: source,
      checkpoints: [`Reason from ${spec.focus[2]}.`, `Justify the answer with ${spec.focus[3]}.`, 'Write the requested count, comparison, or explanation with units.']
    }
  ];
}

export function alignM6RuntimeSources(runtime: LessonRuntimeConfig, lessonNumber: number): LessonRuntimeConfig {
  const teacherSource = m6TeacherSource(lessonNumber);
  const exactObjective = M6_TEACHER_OBJECTIVES[lessonNumber];
  return {
    ...runtime,
    lessonAnimation: M6_FUNCTIONAL_ANIMATIONS[lessonNumber],
    teacherEditionSteps: runtime.teacherEditionSteps?.map((step) => ({
      ...step,
      studentPrompt: step.id === 'source-goal' ? exactObjective : step.studentPrompt,
      teacherEditionBasis: /Teacher Edition|teacher_edition|lesson pages/i.test(step.teacherEditionBasis)
        ? teacherSource
        : step.teacherEditionBasis
    }))
  };
}
