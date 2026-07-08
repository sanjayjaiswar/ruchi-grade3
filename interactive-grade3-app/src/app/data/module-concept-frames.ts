export type ModuleConceptFrame = {
  moduleId: string;
  title: string;
  bigIdea: string;
  modelLabel: string;
  studentQuestion: string;
  visual:
    | 'groups'
    | 'equal-groups'
    | 'array-rows-columns'
    | 'division-tape'
    | 'distributive-array'
    | 'measurement'
    | 'clock-time'
    | 'elapsed-time-line'
    | 'metric-measure'
    | 'vertical-rounding-line'
    | 'rounding-number-line'
    | 'measurement-operation'
    | 'measurement-compose'
    | 'measurement-decompose'
    | 'facts'
    | 'commutative-array'
    | 'distributive-facts'
    | 'pattern-facts'
    | 'fluency-facts'
    | 'unknown-factor'
    | 'place-value-facts'
    | 'area'
    | 'tile-area'
    | 'area-array'
    | 'area-decompose'
    | 'area-floor-plan'
    | 'fractions'
    | 'fraction-folds'
    | 'fraction-area'
    | 'fraction-number-bond'
    | 'fraction-greater-one'
    | 'fraction-whole-unit'
    | 'fraction-number-line'
    | 'fraction-beyond-one'
    | 'fraction-number-line-compare'
    | 'fraction-number-line-equivalence'
    | 'fraction-equivalence'
    | 'fraction-whole-equivalence'
    | 'fraction-compare'
    | 'fraction-precise-partition'
    | 'one-half-area'
    | 'data'
    | 'scaled-bar-graph'
    | 'tally-data'
    | 'vertical-tape-data'
    | 'ruler-intervals'
    | 'line-plot-interpret'
    | 'shapes'
    | 'geometry-attributes'
    | 'geometry-compose'
    | 'perimeter'
    | 'perimeter-tessellate'
    | 'perimeter-measure'
    | 'perimeter-side-measure'
    | 'perimeter-unknown'
    | 'circle-perimeter'
    | 'perimeter-rdw'
    | 'rectangle-unit-squares'
    | 'rectangle-given-perimeter'
    | 'strategy-critique'
    | 'fluency-book'
    | 'robot-project'
    | 'measurement-line-plot'
    | 'line-plot'
    | 'rdw';
  transform: {
    from: string;
    action: string;
    to: string;
  };
  lessonBands: Array<{
    label: string;
    lessons: string;
    start: number;
    end: number;
    focus: string;
  }>;
  teacherLookFor: string[];
};

export const MODULE_CONCEPT_FRAMES: Record<string, ModuleConceptFrame> = {
  m1: {
    moduleId: 'm1',
    title: 'Equal groups become multiplication and division',
    bigIdea: 'Every problem starts by identifying the unit: how many groups, how many in each group, and what total the model represents.',
    modelLabel: 'groups -> array -> unknown factor -> decompose',
    studentQuestion: 'What does the quotient or product mean in this model?',
    visual: 'groups',
    transform: {
      from: '6 groups of 4',
      action: 'split 6 as 2 + 4, multiply both parts',
      to: '(2 x 4) + (4 x 4) = 24'
    },
    lessonBands: [
      { label: 'Build', lessons: 'L1-L3', start: 1, end: 3, focus: 'equal groups, arrays, products' },
      { label: 'Invert', lessons: 'L4-L13', start: 4, end: 13, focus: 'division as an unknown factor' },
      { label: 'Decompose', lessons: 'L14-L21', start: 14, end: 21, focus: 'distributive property and RDW' }
    ],
    teacherLookFor: [
      'Student labels the unit before writing the equation.',
      'Arrays and tape diagrams match the story, not just the numbers.',
      'Decomposition keeps the total unchanged.'
    ]
  },
  m2: {
    moduleId: 'm2',
    title: 'Measurement numbers only make sense with units',
    bigIdea: 'Time, weight, capacity, and measurement word problems all use the same structure: choose the unit, read or model the scale, then operate while keeping units attached.',
    modelLabel: 'unit -> scale -> benchmark -> operation',
    studentQuestion: 'What unit is being counted, and does the answer keep that unit?',
    visual: 'measurement',
    transform: {
      from: 'start value + measured change',
      action: 'mark the scale or tape, then add/subtract/round',
      to: 'answer with seconds, minutes, oz, lb, cups, qt, or gal'
    },
    lessonBands: [
      { label: 'Time', lessons: 'L1-L5', start: 1, end: 5, focus: 'continuous time, clocks, number lines' },
      { label: 'US Units', lessons: 'L6-L11', start: 6, end: 11, focus: 'oz/lb and cup/qt/gal benchmarks' },
      { label: 'Rounding', lessons: 'L12-L14', start: 12, end: 14, focus: 'nearest ten and hundred' },
      { label: 'Operate', lessons: 'L15-L21', start: 15, end: 21, focus: 'add/subtract measurements with composing' }
    ],
    teacherLookFor: [
      'Student reads intervals, not just tick marks.',
      'Every answer carries the correct unit.',
      'Estimates are checked against the exact measurement.'
    ]
  },
  m3: {
    moduleId: 'm3',
    title: 'Known facts generate new facts',
    bigIdea: 'Multiplication and division facts become fluent when students use properties, patterns, and decompositions instead of memorizing isolated answers.',
    modelLabel: 'known fact -> property -> related fact',
    studentQuestion: 'Which known fact or property makes this fact easier?',
    visual: 'facts',
    transform: {
      from: '6 x 7',
      action: 'break 6 into 5 + 1',
      to: '(5 x 7) + (1 x 7)'
    },
    lessonBands: [
      { label: 'Use Known Facts', lessons: 'L1-L7', start: 1, end: 7, focus: '6s and 7s through properties' },
      { label: 'Extend', lessons: 'L8-L14', start: 8, end: 14, focus: '8s, 9s, patterns, distributive reasoning' },
      { label: 'Fluency', lessons: 'L15-L21', start: 15, end: 21, focus: '0, 1, 10, multiples of 10, mixed problems' }
    ],
    teacherLookFor: [
      'Student names the property or known fact used.',
      'The model proves the equation is equivalent.',
      'Division is explained as a related multiplication fact.'
    ]
  },
  m4: {
    moduleId: 'm4',
    title: 'Area is counted in square units',
    bigIdea: 'Area problems all come back to tiling a flat region with equal square units, then using rows, columns, and decomposition to count efficiently.',
    modelLabel: 'tile -> array -> rectangle -> decomposed area',
    studentQuestion: 'What square unit covers the inside, and how can the area be split or recombined?',
    visual: 'area',
    transform: {
      from: 'one rectangle',
      action: 'split into two smaller rectangles',
      to: 'area A + area B = total area'
    },
    lessonBands: [
      { label: 'Tile', lessons: 'L1-L4', start: 1, end: 4, focus: 'area attribute and square units' },
      { label: 'Multiply', lessons: 'L5-L12', start: 5, end: 12, focus: 'rows, columns, side lengths' },
      { label: 'Compose', lessons: 'L13-L16', start: 13, end: 16, focus: 'composite figures and floor plans' }
    ],
    teacherLookFor: [
      'Student counts inside square units, not perimeter.',
      'Rows and columns match side lengths.',
      'Decomposed rectangles recombine to the original whole.'
    ]
  },
  m5: {
    moduleId: 'm5',
    title: 'Fractions name equal parts of a whole',
    bigIdea: 'Before naming any fraction, students must identify the whole, partition it into equal parts, then count unit fractions.',
    modelLabel: 'whole -> equal parts -> unit fraction -> equivalence',
    studentQuestion: 'What is the whole, and are the parts equal?',
    visual: 'fractions',
    transform: {
      from: '1 whole',
      action: 'partition into 4 equal parts and shade 3',
      to: '3 fourths'
    },
    lessonBands: [
      { label: 'Partition', lessons: 'L1-L9', start: 1, end: 9, focus: 'equal parts and unit fractions' },
      { label: 'Number Line', lessons: 'L10-L19', start: 10, end: 19, focus: 'fractions as positions and distances' },
      { label: 'Equivalent', lessons: 'L20-L30', start: 20, end: 30, focus: 'same amount, different units' }
    ],
    teacherLookFor: [
      'Student identifies the whole first.',
      'Parts are equal before the fraction is named.',
      'Equivalent fractions refer to the same amount of the same whole.'
    ]
  },
  m6: {
    moduleId: 'm6',
    title: 'Data displays organize counts and measurements',
    bigIdea: 'Graphs and line plots are measurement models: the scale tells what each mark means, and questions are answered by reading and comparing the display.',
    modelLabel: 'data -> scale -> display -> comparison',
    studentQuestion: 'What does one mark, picture, or interval represent?',
    visual: 'data',
    transform: {
      from: 'collected measurements',
      action: 'choose a scale and place each value',
      to: 'answer questions from the display'
    },
    lessonBands: [
      { label: 'Collect', lessons: 'L1-L3', start: 1, end: 3, focus: 'data tables and scaled graphs' },
      { label: 'Measure', lessons: 'L4-L6', start: 4, end: 6, focus: 'inch, half-inch, quarter-inch line plots' },
      { label: 'Interpret', lessons: 'L7-L9', start: 7, end: 9, focus: 'compare and solve from displays' }
    ],
    teacherLookFor: [
      'Student reads the scale before answering.',
      'Each plotted mark represents one data value.',
      'Comparisons cite the graph, not memory.'
    ]
  },
  m7: {
    moduleId: 'm7',
    title: 'Shapes are composed, decomposed, and measured',
    bigIdea: 'Geometry work connects attributes, perimeter, area, and composition: students reason about what changes and what stays the same.',
    modelLabel: 'attributes -> compose/decompose -> measure',
    studentQuestion: 'Which attribute is being used, and what stays equal after the shape changes?',
    visual: 'shapes',
    transform: {
      from: 'one polygon',
      action: 'compose or decompose into known shapes',
      to: 'new shape with trackable sides and area'
    },
    lessonBands: [
      { label: 'Attributes', lessons: 'L1-L8', start: 1, end: 8, focus: 'sides, angles, quadrilaterals' },
      { label: 'Compose', lessons: 'L9-L19', start: 9, end: 19, focus: 'tangrams, perimeter, area relationships' },
      { label: 'Solve', lessons: 'L20-L34', start: 20, end: 34, focus: 'multi-step geometry and measurement problems' }
    ],
    teacherLookFor: [
      'Student names the attribute being used.',
      'Perimeter and area are not confused.',
      'Composed parts account for the whole shape.'
    ]
  }
};
