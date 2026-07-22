import type {
  LessonAnimationModel,
  LessonRuntimeConfig,
  ProblemSetCenteredConceptSection,
  ProblemVisualSpec
} from '../lesson-runtime.types';

export const M7_TEACHER_PAGE_RANGES: Record<number, [number, number]> = {
  1: [15, 26], 2: [27, 38], 3: [39, 54], 4: [55, 67], 5: [68, 82], 6: [83, 96],
  7: [97, 113], 8: [114, 125], 9: [126, 139], 10: [140, 150], 11: [151, 157], 12: [158, 169],
  13: [170, 183], 14: [184, 194], 15: [195, 206], 16: [207, 219], 17: [220, 247], 18: [248, 258],
  19: [259, 268], 20: [269, 281], 21: [282, 294], 22: [295, 310], 23: [311, 321], 24: [322, 331],
  25: [332, 341], 26: [342, 353], 27: [354, 367], 28: [368, 379], 29: [380, 391], 30: [392, 419],
  31: [420, 430], 32: [431, 442], 33: [443, 453], 34: [454, 462]
};

export const M7_TEACHER_OBJECTIVES: Record<number, string> = {
  1: 'Solve word problems in varied contexts using a letter to represent the unknown.',
  2: 'Solve word problems in varied contexts using a letter to represent the unknown.',
  3: 'Share and critique peer solution strategies to varied word problems.',
  4: 'Compare and classify quadrilaterals.',
  5: 'Compare and classify other polygons.',
  6: 'Draw polygons with specified attributes to solve problems.',
  7: 'Reason about composing and decomposing polygons using tetrominoes.',
  8: 'Create a tangram puzzle and observe relationships among the shapes.',
  9: 'Reason about composing and decomposing polygons using tangrams.',
  10: 'Decompose quadrilaterals to understand perimeter as the boundary of a shape.',
  11: 'Tessellate to understand perimeter as the boundary of a shape. (Optional.)',
  12: 'Measure side lengths in whole number units to determine the perimeter of polygons.',
  13: 'Explore perimeter as an attribute of plane figures and solve problems.',
  14: 'Determine the perimeter of regular polygons and rectangles when whole number measurements are unknown.',
  15: 'Solve word problems to determine perimeter with given side lengths.',
  16: 'Use string to measure the perimeter of various circles to the nearest quarter inch.',
  17: 'Use all four operations to solve problems involving perimeter and unknown measurements.',
  18: 'Construct rectangles from a given number of unit squares and determine the perimeters.',
  19: 'Use a line plot to record the number of rectangles constructed from a given number of unit squares.',
  20: 'Construct rectangles with a given perimeter using unit squares and determine their areas.',
  21: 'Construct rectangles with a given perimeter using unit squares and determine their areas.',
  22: 'Use a line plot to record the number of rectangles constructed in Lessons 20 and 21.',
  23: 'Solve a variety of word problems with perimeter.',
  24: 'Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.',
  25: 'Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.',
  26: 'Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.',
  27: 'Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.',
  28: 'Solve a variety of word problems involving area and perimeter using all four operations.',
  29: 'Solve a variety of word problems involving area and perimeter using all four operations.',
  30: 'Share and critique peer strategies for problem solving.',
  31: 'Explore and create unconventional representations of one-half.',
  32: 'Explore and create unconventional representations of one-half.',
  33: 'Solidify fluency with Grade 3 skills.',
  34: 'Create resource booklets to support fluency with Grade 3 skills.'
};

export const M7_PROBLEM_COUNTS = [0, 4, 6, 6, 4, 4, 6, 4, 7, 4, 3, 4, 4, 3, 5, 6, 4, 3, 3, 4, 2, 4, 5, 6, 1, 1, 4, 4, 4, 4, 1, 1, 4, 1, 1];

export function m7TeacherSource(lessonNumber: number): string {
  const [start, end] = M7_TEACHER_PAGE_RANGES[lessonNumber];
  return `Module 7 Teacher Edition, lesson pages ${start}-${end}.`;
}

type ConceptModel = 'rdw' | 'critique' | 'polygon' | 'composition' | 'perimeter' | 'area' | 'line-plot' | 'robot' | 'half' | 'fluency';

type ConceptSpec = {
  title: string;
  context: string;
  equation: string;
  question: string;
  focus: [string, string, string, string];
  kind: LessonAnimationModel['kind'];
  model: ConceptModel;
};

const M7_CONCEPT_SPECS: Record<number, ConceptSpec> = {
  1: spec('use RDW to model the hayride cost', 'Read the orchard sign, draw 2 adult tickets at $7 and 2 child tickets at $4, label the total with a letter, solve, and answer in context.', '(2 x $7) + (2 x $4) = n; n = $22', 'How do the drawing, letter, and equation represent the same unknown total?', ['known prices', 'labeled unknown', 'matching equation', 'answer sentence'], 'tape-diagram', 'rdw'),
  2: spec('compare multiple models for a two-step problem', 'Represent Leanne’s 120-tile total, subtract the 56 tiles she has, then divide the remaining 64 tiles into boxes of 8.', '120 - 56 = 64; 64 / 8 = b; b = 8 boxes', 'Why must the subtraction be completed before the division?', ['total and part', 'remaining tiles', 'equal boxes', 'two-step reasoning'], 'tape-diagram', 'rdw'),
  3: spec('critique a complete RDW solution', 'Use Monica’s 91 milliliters, remove the 19 milliliters in the ninth beaker, divide the remaining water equally among 8 beakers, and evaluate whether each model and equation matches.', '91 - 19 = 72; 72 / 8 = 9 mL', 'What specific evidence makes a peer model clear, correct, and efficient?', ['source quantities', 'labeled model', 'valid equations', 'constructive critique'], 'tape-diagram', 'critique'),
  4: spec('classify quadrilaterals by attributes', 'Sort source polygons A–L by side count, parallel sides, right angles, and equal sides; a polygon may belong to more than one group.', 'attributes -> polygon letters -> classification', 'Why can the same quadrilateral belong to several attribute groups?', ['four sides', 'parallel sides', 'right angles', 'inclusive classification'], 'geometry', 'polygon'),
  5: spec('classify polygons beyond quadrilaterals', 'Sort source polygons M–X by equal sides, equal angles, parallel sides, and regularity, then name shapes from their defining attributes.', 'sides + angles + equality -> polygon name', 'Which attributes are sufficient to prove that a polygon is regular?', ['side count', 'equal sides', 'equal angles', 'regular polygon'], 'geometry', 'polygon'),
  6: spec('draw polygons from stated attributes', 'Construct each requested source polygon: a right triangle, a 2-inch square, a quadrilateral with parallel sides, and polygons with specified equal sides.', 'stated attributes -> drawing -> labels -> check', 'How can you verify that a drawing satisfies every requested attribute?', ['shape family', 'angle evidence', 'side evidence', 'complete attribute check'], 'geometry', 'polygon'),
  7: spec('compose rectangles with tetrominoes', 'Join tetrominoes edge to edge on the grid, keep every unit square visible, and compare different rectangle compositions and their areas.', 'tetromino unit squares -> rectangle composition', 'What stays the same when the same tetromino pieces are rearranged?', ['unit squares', 'shared edges', 'rectangle outline', 'area conservation'], 'geometry', 'composition'),
  8: spec('build the seven-piece tangram', 'Fold and cut the source square in sequence to create two large triangles, a medium triangle, two small triangles, a square, and a parallelogram.', '1 square -> 7 tangram pieces', 'How does each cut preserve the area of the original square?', ['source square', 'fold and cut', 'seven pieces', 'whole-area conservation'], 'geometry', 'composition'),
  9: spec('compose polygons with tangram pieces', 'Use at least two tangram pieces, show every join line, and build the requested rectangles, triangles, parallelograms, and trapezoids.', 'tangram pieces -> joined polygon -> attribute check', 'How do the outside edges prove the name of the composed polygon?', ['source pieces', 'join lines', 'outside boundary', 'polygon attributes'], 'geometry', 'composition'),
  10: spec('distinguish perimeter from area', 'Trace the boundary in red and color the inside in blue so decomposing and recomposing the 2-inch square makes changes to perimeter visible while area stays fixed.', 'perimeter = outside boundary; area = inside region', 'Why can two shapes have equal area but different perimeters?', ['outside boundary', 'inside area', 'same square units', 'perimeter comparison'], 'measurement', 'perimeter'),
  11: spec('trace the boundary of a tessellation', 'Tessellate the source shape, color the repeated pattern, outline only the outside perimeter, and measure that boundary with string.', 'repeated tiles -> one outside boundary', 'Why are the interior shared edges excluded from the perimeter?', ['tessellation', 'shared edges', 'outside outline', 'string measurement'], 'measurement', 'perimeter'),
  12: spec('measure every polygon side before adding', 'Measure and label each source side in whole centimeters, then add every outside length exactly once.', '3 cm + 3 cm + 3 cm + 3 cm = 12 cm', 'How do the labels ensure that no boundary side is omitted or counted twice?', ['whole-unit measure', 'side labels', 'outside boundary', 'perimeter sum'], 'measurement', 'perimeter'),
  13: spec('use labeled side lengths to find perimeter', 'Read each source side label and add around the entire boundary, retaining the specified linear unit.', '3 in + 8 in + 3 in + 8 in = 22 in', 'What check shows that the perimeter equation follows the boundary once?', ['given lengths', 'boundary order', 'perimeter equation', 'linear unit'], 'measurement', 'perimeter'),
  14: spec('infer unknown lengths before finding perimeter', 'Use regular-polygon equality or opposite sides of a rectangle to label missing lengths before adding the boundary.', 'regular heptagon: 7 x 8 in = 56 in', 'Which shape attribute lets you determine each unknown side length?', ['regular sides', 'opposite sides', 'unknown labels', 'perimeter'], 'measurement', 'perimeter'),
  15: spec('solve a perimeter word problem with a rectangle model', 'Draw the 5-foot by 6-foot bulletin board, label all four sides, and find the border around it.', '5 + 6 + 5 + 6 = 22 ft', 'Why does the answer use linear feet rather than square feet?', ['context sketch', 'four side labels', 'boundary sum', 'linear unit'], 'measurement', 'perimeter'),
  16: spec('measure a curved perimeter with string', 'Wrap string once around a circular object, mark the meeting point, straighten it on a ruler, and read to the nearest quarter inch.', 'curved boundary -> straight string -> nearest 1/4 inch', 'Why is string useful for a circle but inefficient for a rectangle?', ['curved boundary', 'one complete wrap', 'quarter-inch ruler', 'method evaluation'], 'measurement', 'perimeter'),
  17: spec('find missing sides of composite rectangles', 'Use aligned rectangle sides to label each unknown boundary segment, then add only the outside sides and solve with the required operation.', 'missing sides -> outside-side sum -> perimeter', 'How can the component rectangles determine a missing outside length?', ['composed rectangles', 'unknown lengths', 'outside boundary', 'operation check'], 'measurement', 'perimeter'),
  18: spec('build every rectangle with area 24', 'Arrange 24 unit squares into all whole-number factor-pair rectangles and compare their perimeters.', '1 x 24, 2 x 12, 3 x 8, 4 x 6; area = 24', 'Why can rectangles with the same area have different perimeters?', ['24 unit squares', 'factor pairs', 'same area', 'different perimeter'], 'area-model', 'area'),
  19: spec('record rectangle counts on a line plot', 'Build rectangles from 12 through 18 unit squares, count the factor-pair rectangles for each total, and plot one X per rectangle.', '12:3, 13:1, 14:2, 15:2, 16:3, 17:1, 18:3', 'How do the X stacks reveal which totals make the most rectangles?', ['unit-square total', 'rectangle count', 'one X per rectangle', 'frequency comparison'], 'graph', 'line-plot'),
  20: spec('hold perimeter fixed while area changes', 'Build every whole-number rectangle whose outside boundary has the required perimeter, label its side lengths, and compare the enclosed square units.', 'perimeter 12: length + width = 6', 'Why does a fixed perimeter not force one fixed area?', ['fixed perimeter', 'dimension pairs', 'square-unit area', 'area comparison'], 'area-model', 'area'),
  21: spec('systematically generate rectangles from perimeter', 'Use centimeter grid paper to list complementary length-width pairs for the given perimeter and calculate each corresponding area.', 'perimeter 16: length + width = 8; areas 7, 12, 15, 16', 'Which dimension pair produces the greatest area, and what pattern do you notice?', ['perimeter constraint', 'dimension pairs', 'area products', 'systematic search'], 'area-model', 'area'),
  22: spec('plot how many rectangles each perimeter makes', 'Combine the rectangle data from Lessons 20 and 21, place one X per constructed rectangle, and interpret the resulting line plot.', 'perimeter data -> rectangle frequency line plot', 'What does the plot show about perimeter and the number of possible rectangles?', ['prior lesson data', 'perimeter scale', 'one X per rectangle', 'relationship interpretation'], 'graph', 'line-plot'),
  23: spec('solve varied perimeter situations', 'Represent each perimeter context with a labeled shape or equation, including the 48-centimeter regular octagon with 8 equal sides.', '48 cm / 8 = 6 cm per side', 'How does the shape structure determine which operation solves the unknown?', ['context model', 'equal or known sides', 'operation choice', 'perimeter unit'], 'measurement', 'perimeter'),
  24: spec('plan a robot from perimeter constraints', 'Choose rectangle dimensions for 7–9 robot parts and 6–8 environment items while satisfying the source perimeter relationships.', 'arms 14 cm; legs 18 cm; body 28 cm; head 16 cm; neck 8 cm', 'How can different dimensions satisfy the same required perimeter?', ['project chart', 'required perimeters', 'dimension choices', 'constraint check'], 'area-model', 'robot'),
  25: spec('draw and label the planned robot', 'Transfer the Lesson 24 plan to a complete robot and environment drawing, labeling rectangle dimensions and all rectangular or curved perimeters.', 'plan -> scaled drawing -> labels -> verification', 'How do the labels prove that the drawing follows the plan?', ['planned parts', 'complete drawing', 'dimension labels', 'perimeter verification'], 'area-model', 'robot'),
  26: spec('compare areas of equal-perimeter robot bodies', 'Collect class robot-body areas on a line plot and explain why one required perimeter can produce several different areas.', 'same perimeter does not imply same area', 'What evidence in the class line plot proves that area is not fixed by perimeter?', ['class area data', 'line plot', 'same perimeter', 'different areas'], 'graph', 'robot'),
  27: spec('evaluate a peer robot by measurement', 'Measure every required robot and environment part, calculate perimeter, compare with the project targets, and star discrepancies.', 'measure -> calculate -> compare -> star mismatch', 'What calculation is needed before deciding whether a measurement matches?', ['peer project', 'measured dimensions', 'perimeter calculation', 'evidence-based evaluation'], 'area-model', 'robot'),
  28: spec('connect area and perimeter in multi-part problems', 'Draw Gia’s 9-yard by 7-yard garden, distinguish inside square units from outside linear units, and solve each requested part.', 'area = 9 x 7 = 63 sq yd; perimeter = 2(9 + 7) = 32 yd', 'How does the same rectangle support both an area equation and a perimeter equation?', ['labeled rectangle', 'inside area', 'outside perimeter', 'correct units'], 'area-model', 'area'),
  29: spec('analyze an L-shaped composite figure', 'Use Kyle’s labeled L-shape to find the full outside perimeter, add component rectangle areas, then compare with the rectangle made from two copies.', 'L-shape: perimeter 56 in; area 144 sq in; two-copy rectangle perimeter 72 in', 'Which segments belong to the perimeter, and which measurements determine the area?', ['composite shape', 'missing segments', 'component areas', 'two-copy comparison'], 'area-model', 'area'),
  30: spec('give evidence-based peer critique', 'Identify the classmate’s strategy, name specific strengths, suggest an actionable improvement, and record a useful strategy to try.', 'observe -> cite evidence -> suggest -> transfer strategy', 'What makes feedback mathematically useful rather than merely positive?', ['named strategy', 'specific evidence', 'actionable suggestion', 'strategy transfer'], 'graph', 'critique'),
  31: spec('judge unconventional representations of one-half', 'Analyze each source square by comparing shaded and unshaded area, then describe a revision when the two areas are not equal.', 'one-half means equal shaded and unshaded area', 'Why is visual symmetry unnecessary when the two areas are equal?', ['same whole', 'shaded area', 'unshaded area', 'equal-area proof'], 'fraction-strip', 'half'),
  32: spec('construct and justify nonstandard halves', 'Create and analyze source circle representations, including dividing into fourths, shading two parts, and relocating equal small circles without changing shaded area.', '2/4 = 1/2; equal removed area = equal replaced area', 'Why does relocating matching pieces preserve one-half of the total area?', ['whole circle', 'equal fourths', 'area relocation', 'one-half justification'], 'fraction-strip', 'half'),
  33: spec('reflect on Grade 3 fluency', 'List the official fluency games, mark which facts are fluent or still need practice, and select activities for summer review.', 'activity -> fluency evidence -> practice choice', 'How does honest reflection produce a useful practice plan?', ['activity list', 'fluency check', 'practice need', 'summer choice'], 'graph', 'fluency'),
  34: spec('assemble and use the summer practice booklet', 'Fold and cut the booklet in the Teacher Edition sequence, record favorite games, and use the 10-week calendar as a daily completion tracker.', 'fold -> cut -> form booklet -> record and practice', 'Which booklet and calendar features make independent practice usable?', ['fold sequence', 'booklet assembly', 'activity variety', 'completion tracking'], 'graph', 'fluency')
};

function spec(
  title: string,
  context: string,
  equation: string,
  question: string,
  focus: [string, string, string, string],
  kind: LessonAnimationModel['kind'],
  model: ConceptModel
): ConceptSpec {
  return { title, context, equation, question, focus, kind, model };
}

function m7ConceptVisual(lessonNumber: number, specValue: ConceptSpec): ProblemVisualSpec {
  const title = `Lesson ${lessonNumber}: ${specValue.title}`;
  if (specValue.model === 'rdw' || specValue.model === 'critique') {
    return {
      title,
      sections: [{
        kind: 'data-table', label: specValue.model === 'critique' ? 'Source strategy evidence' : 'Read-Draw-Write model',
        columns: ['Stage', 'Teacher Edition relationship'],
        rows: [['Read', specValue.context], ['Draw / model', specValue.focus[1]], ['Write / solve', specValue.equation], ['Check / explain', specValue.question]]
      }]
    };
  }
  if (specValue.model === 'polygon' || specValue.model === 'composition') {
    return {
      title,
      sections: [
        {
          kind: 'geometry-diagram', label: specValue.model === 'composition' ? 'Compose and inspect' : 'Attribute evidence', diagram: 'polygon',
          shapes: [
            { label: specValue.focus[0], shape: lessonNumber === 6 ? 'triangle' : 'polygon', x: 8, y: 18, width: 24, height: 48, valueLabel: specValue.focus[1], tone: 'given' },
            { label: specValue.focus[2], shape: lessonNumber >= 7 ? 'rectangle' : 'polygon', x: 38, y: 12, width: 26, height: 56, valueLabel: specValue.focus[2], tone: 'target' },
            { label: specValue.focus[3], shape: 'polygon', x: 70, y: 18, width: 22, height: 48, valueLabel: 'justify', tone: 'answer' }
          ], caption: specValue.context
        },
        { kind: 'data-table', label: 'Source check', columns: ['Evidence', 'Meaning'], rows: specValue.focus.map((item, index) => [item, index === 3 ? specValue.question : 'must be visible in the construction']) }
      ]
    };
  }
  if (specValue.model === 'perimeter') {
    return {
      title,
      sections: [{
        kind: 'geometry-diagram', label: lessonNumber === 16 ? 'String follows the curved boundary' : 'Outside boundary model', diagram: lessonNumber === 16 ? 'circle-string' : 'perimeter',
        shapes: [{ label: specValue.focus[0], shape: lessonNumber === 16 ? 'circle' : lessonNumber === 17 || lessonNumber === 29 ? 'l-shape' : 'rectangle', x: 18, y: 12, width: 64, height: 64, sideLabels: specValue.focus, valueLabel: specValue.equation, tone: 'target' }],
        caption: specValue.context
      }]
    };
  }
  if (specValue.model === 'area') {
    if (lessonNumber === 29) {
      return {
        title,
        sections: [
          {
            kind: 'geometry-diagram', label: 'Kyle’s composite figure', diagram: 'composite',
            shapes: [
              { label: 'L-shaped copy', shape: 'l-shape', x: 8, y: 14, width: 38, height: 62, sideLabels: ['8 in', '12 in', '6 in', '16 in'], valueLabel: 'P = 56 in; A = 144 sq in', tone: 'target' },
              { label: 'two copies form a rectangle', shape: 'rectangle', x: 55, y: 20, width: 38, height: 50, valueLabel: 'P = 72 in', tone: 'answer' }
            ], caption: specValue.context
          },
          { kind: 'data-table', label: 'Composite reasoning', columns: ['Measure', 'Source result'], rows: [['Outside boundary', '56 inches'], ['Inside area', '144 square inches'], ['Two-copy rectangle boundary', '72 inches']] }
        ]
      };
    }
    const cards = lessonNumber === 18
      ? [['1 x 24', 1, 12], ['2 x 12', 2, 12], ['3 x 8', 3, 8], ['4 x 6', 4, 6]] as const
      : lessonNumber === 28
        ? [['Gia: 7 x 9', 7, 9]] as const
        : [['Rectangle A', 2, 6], ['Rectangle B', 3, 4]] as const;
    return {
      title,
      sections: [
        { kind: 'card-grid', label: 'Square-unit models', cards: cards.map(([label, rows, columns]) => ({ label, sections: [{ kind: 'array', label, rows, columns, item: 'square', caption: specValue.equation }] })) },
        { kind: 'data-table', label: 'Area/perimeter distinction', columns: ['Evidence', 'Meaning'], rows: [['Inside', specValue.focus[2]], ['Boundary', specValue.focus[0]], ['Conclusion', specValue.question]] }
      ]
    };
  }
  if (specValue.model === 'line-plot') {
    const values = lessonNumber === 19
      ? ['12:3', '13:1', '14:2', '15:2', '16:3', '17:1', '18:3'].map((item) => { const [label, value] = item.split(':'); return { label, value: Number(value), target: true }; })
      : ['P1', 'P2', 'P3', 'P4', 'P5'].map((label) => ({ label, value: 1, target: false }));
    return { title, sections: [{ kind: 'line-plot', label: specValue.title, values, keyLabel: 'X = 1 rectangle', showBlankValues: true, caption: specValue.context }] };
  }
  if (specValue.model === 'robot') {
    return {
      title,
      sections: [
        {
          kind: 'geometry-diagram', label: 'Robot measurement project', diagram: 'robot',
          shapes: [
            { label: 'head', shape: 'rectangle', x: 41, y: 5, width: 18, height: 15, valueLabel: 'P = 16 cm', tone: 'given' },
            { label: 'body', shape: 'rectangle', x: 35, y: 24, width: 30, height: 29, valueLabel: 'P = 28 cm', tone: 'target' },
            { label: 'arms', shape: 'rectangle', x: 15, y: 27, width: 16, height: 22, valueLabel: 'P = 14 cm each', tone: 'given' },
            { label: 'legs', shape: 'rectangle', x: 38, y: 58, width: 24, height: 24, valueLabel: 'P = 18 cm each', tone: 'given' }
          ], caption: specValue.context
        },
        { kind: 'data-table', label: 'Project sequence', columns: ['Action', 'Evidence'], rows: [['Plan', specValue.focus[0]], ['Measure', specValue.focus[1]], ['Calculate', specValue.focus[2]], ['Evaluate', specValue.focus[3]]] }
      ]
    };
  }
  if (specValue.model === 'half') {
    return {
      title,
      sections: [{
        kind: 'geometry-diagram', label: 'Equal-area evidence', diagram: 'one-half',
        shapes: [
          { label: 'unconventional square half', shape: 'square', x: 12, y: 16, width: 32, height: 52, valueLabel: 'equal shaded/unshaded area', tone: 'target' },
          { label: 'circle half', shape: 'circle', x: 56, y: 16, width: 32, height: 52, valueLabel: lessonNumber === 32 ? '2/4 with equal areas relocated' : 'compare equal areas', tone: 'answer' }
        ], caption: specValue.context
      }]
    };
  }
  return {
    title,
    sections: [{
      kind: 'data-table', label: lessonNumber === 34 ? 'Summer practice workflow' : 'Fluency reflection workflow',
      columns: ['Step', 'Teacher Edition action'],
      rows: [['1', specValue.focus[0]], ['2', specValue.focus[1]], ['3', specValue.focus[2]], ['4', specValue.focus[3]]]
    }]
  };
}

function conceptSteps(specValue: ConceptSpec): NonNullable<LessonAnimationModel['conceptSteps']> {
  return [
    { label: 'Establish', action: specValue.context, result: `${specValue.focus[0]} and ${specValue.focus[1]} are explicit.` },
    { label: 'Model', action: `Build the source relationship: ${specValue.equation}.`, result: `${specValue.focus[2]} is visible in the model.` },
    { label: 'Explain', action: specValue.question, result: `The conclusion is justified by ${specValue.focus[3]}.` }
  ];
}

export const M7_FUNCTIONAL_ANIMATIONS: Record<number, LessonAnimationModel> = Object.fromEntries(
  Object.entries(M7_CONCEPT_SPECS).map(([lessonKey, specValue]) => {
    const lessonNumber = Number(lessonKey);
    return [lessonNumber, {
      kind: specValue.kind,
      title: `Lesson ${lessonNumber} animation: ${specValue.title}`,
      context: specValue.context,
      equation: specValue.equation,
      teacherPrompt: specValue.question,
      focus: specValue.focus,
      conceptSteps: conceptSteps(specValue),
      conceptVisual: m7ConceptVisual(lessonNumber, specValue)
    } satisfies LessonAnimationModel];
  })
) as Record<number, LessonAnimationModel>;

export function m7FunctionalConceptSections(lessonNumber: number): ProblemSetCenteredConceptSection[] {
  const specValue = M7_CONCEPT_SPECS[lessonNumber];
  const source = m7TeacherSource(lessonNumber);
  return [
    {
      title: `1. Understand the Lesson ${lessonNumber} task`, body: specValue.context, teacherSource: source,
      checkpoints: [`Identify ${specValue.focus[0]}.`, `State ${specValue.focus[1]}.`, 'Use every given quantity, shape, label, and unit.']
    },
    {
      title: '2. Build and label the model', body: specValue.equation, teacherSource: source,
      checkpoints: [`Show ${specValue.focus[1]}.`, `Make ${specValue.focus[2]} visible.`, 'Check that the model shows the same relationship as the problem.']
    },
    {
      title: '3. Explain what the model proves', body: specValue.question, teacherSource: source,
      checkpoints: [`Reason from ${specValue.focus[2]}.`, `Justify with ${specValue.focus[3]}.`, 'Answer every requested part with the correct unit or attribute language.']
    }
  ];
}

export function alignM7RuntimeSources(runtime: LessonRuntimeConfig, lessonNumber: number): LessonRuntimeConfig {
  const teacherSource = m7TeacherSource(lessonNumber);
  const exactObjective = M7_TEACHER_OBJECTIVES[lessonNumber];
  return {
    ...runtime,
    lessonAnimation: M7_FUNCTIONAL_ANIMATIONS[lessonNumber],
    teacherEditionSteps: runtime.teacherEditionSteps?.map((step) => ({
      ...step,
      studentPrompt: step.id === 'source-goal' ? exactObjective : step.studentPrompt,
      teacherEditionBasis: /Teacher Edition|teacher_edition|lesson pages/i.test(step.teacherEditionBasis)
        ? teacherSource
        : step.teacherEditionBasis
    }))
  };
}
