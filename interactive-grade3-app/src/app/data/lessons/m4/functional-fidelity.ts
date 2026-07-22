import type {
  LessonAnimationModel,
  LessonRuntimeConfig,
  ProblemSetCenteredConceptSection,
  ProblemVisualSpec
} from '../lesson-runtime.types';

export const M4_TEACHER_PAGE_RANGES: Record<number, [number, number]> = {
  1: [11, 20], 2: [21, 31], 3: [32, 43], 4: [44, 56],
  5: [57, 67], 6: [68, 79], 7: [80, 91], 8: [92, 115],
  9: [116, 126], 10: [127, 137], 11: [138, 149], 12: [150, 160],
  13: [161, 172], 14: [173, 184], 15: [185, 195], 16: [196, 204]
};

export const M4_TEACHER_OBJECTIVES: Record<number, string> = {
  1: 'Understand area as an attribute of plane figures.',
  2: 'Decompose and recompose shapes to compare areas.',
  3: 'Model tiling with centimeter and inch unit squares as a strategy to measure area.',
  4: 'Relate side lengths with the number of tiles on a side.',
  5: 'Form rectangles by tiling with unit squares to make arrays.',
  6: 'Draw rows and columns to determine the area of a rectangle given an incomplete array.',
  7: 'Interpret area models to form rectangular arrays.',
  8: 'Find the area of a rectangle through multiplication of the side lengths.',
  9: 'Analyze different rectangles and reason about their area.',
  10: 'Apply the distributive property as a strategy to find the total area of a large rectangle by adding two products.',
  11: 'Demonstrate the possible whole number side lengths of rectangles with areas of 24, 36, 48, or 72 square units using the associative property.',
  12: 'Solve word problems involving area.',
  13: 'Find areas by decomposing into rectangles or completing composite figures to form rectangles.',
  14: 'Find areas by decomposing into rectangles or completing composite figures to form rectangles.',
  15: 'Apply knowledge of area to determine areas of rooms in a given floor plan.',
  16: 'Apply knowledge of area to determine areas of rooms in a given floor plan.'
};

export function m4TeacherSource(lessonNumber: number): string {
  const [start, end] = M4_TEACHER_PAGE_RANGES[lessonNumber];
  return `Module 4 Teacher Edition, lesson pages ${start}-${end}.`;
}

type ConceptGuide = Array<{ title: string; body: string; checkpoints: string[] }>;

const M4_CONCEPT_GUIDES: Record<number, ConceptGuide> = {
  1: [
    { title: '1. Cover the whole figure', body: 'Cover Shapes A and B with same-size triangle pattern blocks. Six triangles cover each shape with no gaps, overlaps, or pieces outside the boundary.', checkpoints: ['Cover every part of the figure.', 'Use one unit size at a time.', 'Count 6 triangles for each source shape.'] },
    { title: '2. Change the area unit', body: 'The same shapes take 3 rhombuses or 2 trapezoids. A larger unit requires fewer units to cover the same area.', checkpoints: ['Keep the target shape unchanged.', 'Name the pattern-block unit.', 'Compare the counts, not only the shapes.'] },
    { title: '3. Define area', body: 'Area is the amount of flat space a plane figure covers. Square units are used when the covering units are squares.', checkpoints: ['No gaps or overlaps.', 'Count each unit once.', 'State the unit with the area.'] }
  ],
  2: [
    { title: '1. Make 12 equal square units', body: 'Cut the source strips into 12 square inches or 12 square centimeters and keep every square.', checkpoints: ['Use all 12 squares.', 'Keep the unit named.', 'Do not change the total area.'] },
    { title: '2. Recompose three rectangles', body: 'Arrange the same 12 squares as 2 × 6, 3 × 4, and 4 × 3 rectangles.', checkpoints: ['Build equal rows.', 'Use all squares each time.', 'Record 12 square units for every rectangle.'] },
    { title: '3. Explain the invariant', body: 'The rectangles have different side lengths and shapes, but their areas are equal because the same 12 square units are merely rearranged.', checkpoints: ['Compare shape and area separately.', 'Name what changed.', 'Name what stayed 12.'] }
  ],
  3: [
    { title: '1. Tile a rectangle', body: 'Arrange 10 square-centimeter tiles into a rectangle with no gaps or overlaps.', checkpoints: ['Tiles touch edge to edge.', 'Every tile is the same size.', 'The area is 10 square centimeters.'] },
    { title: '2. Transfer the model to a grid', body: 'Shade one grid square for each tile so the drawing preserves the tiled rectangle.', checkpoints: ['Match the tile arrangement.', 'Use centimeter or inch units correctly.', 'Count the shaded squares.'] },
    { title: '3. Remove and recount', body: 'Remove one tile while keeping a rectangle, then erase the matching grid square. The area changes from 10 to 9 square centimeters.', checkpoints: ['Remove exactly one unit.', 'Keep a rectangular arrangement.', 'Update the area and unit.'] }
  ],
  4: [
    { title: '1. Build a 3 by 5 tiled rectangle', body: 'Fifteen square-inch tiles form 3 rows of 5. The tile count along each edge matches the side length.', checkpoints: ['Count 3 tiles on one side.', 'Count 5 tiles on the other.', 'Keep opposite side lengths equal.'] },
    { title: '2. Measure the side lengths', body: 'Trace the tiled rectangle, remove the tiles, and label the sides 3 inches and 5 inches.', checkpoints: ['Use linear units for sides.', 'Use square units for area.', 'Match labels to tile counts.'] },
    { title: '3. Relate length and area', body: 'The side lengths describe the rows and columns, while the 15 inside tiles describe 15 square inches of area.', checkpoints: ['Do not call a side square inches.', 'Do not call area inches.', 'Connect 3 × 5 to 15.'] }
  ],
  5: [
    { title: '1. Tile the source rectangle', body: 'Use 12 square-inch tiles to make 6 groups of 2, then push the groups together into a rectangular array.', checkpoints: ['Use all 12 tiles.', 'Make 6 equal groups of 2.', 'Keep rows and columns visible.'] },
    { title: '2. Read the unknown side', body: 'When one side is 6 and the area is 12 square inches, the other side is 2 inches.', checkpoints: ['Distinguish area from side length.', 'Use 12 ÷ 6 = 2.', 'Label the side in inches.'] },
    { title: '3. Connect array and multiplication', body: 'The tiled rectangle shows 6 × 2 = 12, so multiplication replaces counting every tile one at a time.', checkpoints: ['Name rows and columns.', 'Write the matching fact.', 'State area in square inches.'] }
  ],
  6: [
    { title: '1. Read the incomplete array', body: 'Use the visible corners, partial rows, and partial columns to determine how the rectangle continues.', checkpoints: ['Extend straight row lines.', 'Extend straight column lines.', 'Keep every unit square equal.'] },
    { title: '2. Complete the rectangle', body: 'Draw the missing rows and columns until the whole rectangular array is visible.', checkpoints: ['No missing interior units.', 'No extra row or column.', 'Label both side lengths.'] },
    { title: '3. Multiply side lengths', body: 'For a 5 by 6 completed array, 5 × 6 = 30 square units.', checkpoints: ['Use the completed dimensions.', 'Multiply instead of guessing from visible tiles.', 'Check the unit.'] }
  ],
  7: [
    { title: '1. Interpret the outside rectangle', body: 'The side lengths tell how many equal rows and columns the area model must contain.', checkpoints: ['Read both side lengths.', 'Choose equal-size squares.', 'Keep the outer boundary fixed.'] },
    { title: '2. Draw the internal grid', body: 'Use a straightedge to form a rectangular array inside the boundary.', checkpoints: ['Rows and columns are straight.', 'Units are equal size.', 'The grid fills the rectangle.'] },
    { title: '3. Name the unit and area', body: 'A 3 by 4 model has 12 square units, but square inches, square centimeters, square feet, and square meters represent different-sized areas.', checkpoints: ['Write 3 × 4 = 12.', 'Name the square unit.', 'Explain why the unit label matters.'] }
  ],
  8: [
    { title: '1. Use side lengths instead of counting tiles', body: 'A rectangle 4 units high and 7 units wide has 4 rows of 7 square units.', checkpoints: ['Identify rows and columns.', 'Label both side lengths.', 'Do not require every grid line before multiplying.'] },
    { title: '2. Multiply for area', body: 'Multiply the side lengths: 4 × 7 = 28 square units.', checkpoints: ['Use both side lengths.', 'Write a multiplication equation.', 'Use square units.'] },
    { title: '3. Divide for an unknown side', body: 'When area and one side are known, divide the area by the known side to find the other length.', checkpoints: ['Identify the unknown side.', 'Use area ÷ known side.', 'Answer in linear units.'] }
  ],
  9: [
    { title: '1. Find two equal areas', body: 'A 5 by 10 rectangle has area 50 square centimeters. Two such rectangles have 50 + 50 square centimeters.', checkpoints: ['Find one part area.', 'Keep the parts equal.', 'Add both areas.'] },
    { title: '2. Recompose the rectangles', body: 'Place the two rectangles side by side to make a 5 by 20 rectangle.', checkpoints: ['No gap or overlap.', 'Preserve all square units.', 'Update the combined side length.'] },
    { title: '3. Compare the methods', body: '5 × 20 = 100 and 50 + 50 = 100 describe the same total area.', checkpoints: ['Match the whole and its parts.', 'Use square centimeters.', 'Explain why moving pieces does not change area.'] }
  ],
  10: [
    { title: '1. Decompose the large rectangle', body: 'Split an 8 by 6 rectangle into a 5 by 6 shaded part and a 3 by 6 unshaded part.', checkpoints: ['Keep the shared side 6.', 'Make 5 + 3 = 8.', 'Label both smaller rectangles.'] },
    { title: '2. Find both partial areas', body: 'Compute 5 × 6 = 30 and 3 × 6 = 18.', checkpoints: ['Multiply each part.', 'Keep square-centimeter units.', 'Account for every unit once.'] },
    { title: '3. Add the products', body: '(5 × 6) + (3 × 6) = 30 + 18 = 48, which equals 8 × 6.', checkpoints: ['Add partial products.', 'Check against the whole rectangle.', 'Name the distributive property.'] }
  ],
  11: [
    { title: '1. Decompose a side length', body: 'Rewrite 12 as 2 × 6 so 3 × 12 becomes 3 × (2 × 6).', checkpoints: ['Keep the value 12.', 'Show all three factors.', 'Do not reorder factors unnecessarily.'] },
    { title: '2. Regroup factors', body: 'Use (3 × 2) × 6 to produce the related side lengths 6 and 6 while keeping area 36.', checkpoints: ['Move parentheses.', 'Preserve the product.', 'Connect each grouping to rectangle dimensions.'] },
    { title: '3. Organize all whole-number factor pairs', body: 'Use factor pairs to demonstrate possible side lengths for areas 24, 36, 48, and 72 square units.', checkpoints: ['Use whole numbers.', 'Avoid duplicate turned pairs when listing possibilities.', 'Verify every product.'] }
  ],
  12: [
    { title: '1. Decide what the story asks', body: 'Area stories may ask for the total area or an unknown side length. Identify the unknown before choosing an operation.', checkpoints: ['Name the known area or sides.', 'Mark the unknown.', 'Keep the story unit.'] },
    { title: '2. Draw an accurate area model', body: 'For an area of 32 square feet with one side 4 feet, draw a rectangle whose unknown side is longer than 4.', checkpoints: ['Make the scale reasonable.', 'Label 4 ft and 32 sq ft.', 'Place the unknown on the other side.'] },
    { title: '3. Solve and interpret', body: 'Use 32 ÷ 4 = 8, then state that the missing side length is 8 feet.', checkpoints: ['Choose multiplication or division from the unknown.', 'Check 4 × 8 = 32.', 'Use feet, not square feet, for the side.'] }
  ],
  13: [
    { title: '1. Recognize a composite figure', body: 'A non-rectangular shaded figure cannot be solved by multiplying only its outside side lengths.', checkpoints: ['Identify the component rectangles.', 'Mark known and unknown lengths.', 'Choose add or subtract.'] },
    { title: '2. Decompose and add', body: 'Split the figure into rectangles, find each area, and add the partial areas.', checkpoints: ['Parts cover the whole exactly.', 'Find each rectangle area.', 'Add square units.'] },
    { title: '3. Complete and subtract', body: 'Alternatively, complete a larger rectangle and subtract the missing rectangle, such as 6 × 6 − 2 × 4 = 28 square centimeters.', checkpoints: ['Find the large area.', 'Find the cutout area.', 'Subtract only the missing part.'] }
  ],
  14: [
    { title: '1. Choose a composite-area strategy', body: 'Decide whether the source figure is clearer as rectangles to add or as a large rectangle with a cutout.', checkpoints: ['Use the actual source dimensions.', 'Show the chosen partition or completion.', 'Keep units consistent.'] },
    { title: '2. Find original and removed areas', body: 'Fanny’s 8 ft by 5 ft fabric has area 40 square feet; the 3 ft by 2 ft cutout has area 6 square feet.', checkpoints: ['Compute 8 × 5.', 'Compute 3 × 2.', 'Distinguish whole from cutout.'] },
    { title: '3. Subtract and explain', body: '40 − 6 = 34 square feet remain, regardless of where the rectangular cutout lies inside the fabric.', checkpoints: ['Subtract the cutout once.', 'Use square feet.', 'Explain why placement does not change its area.'] }
  ],
  15: [
    { title: '1. Measure or infer room dimensions', body: 'Use the floor-plan grid, shared boundaries, and ruler measurements to determine each rectangular room’s side lengths.', checkpoints: ['Line the ruler up at zero.', 'Use shared lengths when possible.', 'Record centimeters.'] },
    { title: '2. Find every room area', body: 'Multiply the side lengths for rectangular rooms and decompose non-rectangular rooms into rectangles.', checkpoints: ['Show a strategy for each room.', 'Use square centimeters.', 'Compare calculated areas, not appearance alone.'] },
    { title: '3. Find the whole plan', body: 'The seven room areas are 60, 56, 42, 24, 25, 28, and 88 square centimeters; together they make 323 square centimeters.', checkpoints: ['Account for all seven rooms.', 'Add each room once.', 'Check against the 19 by 17 whole-house rectangle.'] }
  ],
  16: [
    { title: '1. Preserve each required room area', body: 'Choose new whole-number side lengths for every room while keeping its required area from Lesson 15.', checkpoints: ['Use the listed required area.', 'Choose whole-number dimensions.', 'Show multiplication evidence.'] },
    { title: '2. Build alternate rectangles', body: 'For the 24-square-centimeter hallway, the Teacher Edition names 3 × 8, 1 × 24, 2 × 12, and 6 × 4 as possible side pairs. The redesign must not reuse the original 8 by 3 orientation.', checkpoints: ['Use a true factor pair.', 'Avoid changing the target area.', 'Do not reuse the original hallway dimensions.'] },
    { title: '3. Assemble and justify the floor plan', body: 'Fit the redesigned rooms together and show how rectangular parts combine for any non-rectangular room.', checkpoints: ['Rooms do not overlap.', 'Required areas remain correct.', 'Explain composite-room totals.'] }
  ]
};

export function m4FunctionalConceptSections(lessonNumber: number): ProblemSetCenteredConceptSection[] {
  return M4_CONCEPT_GUIDES[lessonNumber].map((section) => ({
    ...section,
    teacherSource: m4TeacherSource(lessonNumber)
  }));
}

function arrayVisual(label: string, rows: number, columns: number, caption: string): ProblemVisualSpec {
  return { title: label, sections: [{ kind: 'array', label, rows, columns, item: 'square', caption }] };
}

function tableVisual(label: string, columns: string[], rows: string[][]): ProblemVisualSpec {
  return { title: label, sections: [{ kind: 'data-table', label, columns, rows }] };
}

function compositeVisual(label: string, equation: string, caption: string): ProblemVisualSpec {
  return {
    title: label,
    sections: [
      {
        kind: 'geometry-diagram', label, diagram: 'composite',
        shapes: [
          { label: 'large rectangle', shape: 'rectangle', x: 8, y: 8, width: 82, height: 72, tone: 'given' },
          { label: 'part or cutout', shape: 'rectangle', x: 58, y: 46, width: 32, height: 34, tone: 'target' }
        ],
        caption
      },
      { kind: 'equations', label: 'Area relationship', lines: [equation] }
    ]
  };
}

const FLOOR_PLAN_VISUAL: ProblemVisualSpec = {
  title: 'Lesson 15 source floor plan',
  sections: [{
    kind: 'floor-plan', label: 'Seven-room floor plan', widthUnits: 19, heightUnits: 17,
    rooms: [
      { label: 'Living Room', x: 0, y: 0, width: 8, height: 11, area: 88, lengthLabel: '11 cm', widthLabel: '8 cm', tone: 'answer' },
      { label: 'Bedroom 2', x: 8, y: 0, width: 4, height: 14, area: 56, lengthLabel: '14 cm', widthLabel: '4 cm' },
      { label: 'Dining Room', x: 12, y: 0, width: 2, height: 14, area: 28, lengthLabel: '14 cm', widthLabel: '2 cm' },
      { label: 'Bedroom 1', x: 14, y: 0, width: 5, height: 12, area: 60, lengthLabel: '12 cm', widthLabel: '5 cm' },
      { label: 'Hallway', x: 0, y: 11, width: 8, height: 3, area: 24, lengthLabel: '8 cm', widthLabel: '3 cm' },
      { label: 'Bathroom', x: 14, y: 12, width: 5, height: 5, area: 25, lengthLabel: '5 cm', widthLabel: '5 cm' },
      { label: 'Kitchen', x: 0, y: 14, width: 14, height: 3, area: 42, lengthLabel: '14 cm', widthLabel: '3 cm' }
    ],
    caption: 'Room areas total 323 square centimeters, matching the 19 cm by 17 cm whole plan.'
  }]
};

function animation(
  lessonNumber: number,
  title: string,
  context: string,
  equation: string,
  teacherPrompt: string,
  rows: number,
  columns: number,
  focus: string[],
  conceptSteps: NonNullable<LessonAnimationModel['conceptSteps']>,
  conceptVisual?: ProblemVisualSpec
): LessonAnimationModel {
  return {
    kind: 'area-model', title: `Lesson ${lessonNumber} animation: ${title}`, context, equation, teacherPrompt,
    areaRows: rows, areaColumns: columns, rowCount: rows, columnCount: columns, focus, conceptSteps, conceptVisual
  };
}

const steps = (first: [string, string, string], second: [string, string, string], third: [string, string, string]) => [
  { label: first[0], action: first[1], result: first[2] },
  { label: second[0], action: second[1], result: second[2] },
  { label: third[0], action: third[1], result: third[2] }
];

export const M4_FUNCTIONAL_ANIMATIONS: Record<number, LessonAnimationModel> = {
  1: animation(1, 'cover and compare area units', 'Cover the same two source shapes with triangles, rhombuses, and trapezoids.', '6 triangles = 3 rhombuses = 2 trapezoids for each shape', 'Why does the count decrease when the covering unit gets larger?', 2, 3, ['same figure', 'same-size units', 'no gaps or overlaps', 'unit name'], steps(['Cover', 'Place 6 triangles on each shape.', 'Both shapes are fully covered.'], ['Change unit', 'Recompose with 3 rhombuses, then 2 trapezoids.', 'The covered area stays the same.'], ['Compare', 'Relate unit size to unit count.', 'Larger units require fewer pieces.']), tableVisual('Pattern-block cover counts', ['Target', 'Triangles', 'Rhombuses', 'Trapezoids'], [['Shape A', '6', '3', '2'], ['Shape B', '6', '3', '2']])),
  2: animation(2, 'recompose 12 square units', 'Rearrange the same 12 square units into three rectangles.', '2 × 6 = 3 × 4 = 4 × 3 = 12 square units', 'What changes about the rectangles, and what remains 12?', 3, 4, ['12 units', 'rearrange', 'same area', 'different side lengths'], steps(['Start', 'Keep all 12 square units.', 'The total area is fixed.'], ['Recompose', 'Build 2 × 6, 3 × 4, and 4 × 3.', 'Each arrangement uses all 12 units.'], ['Explain', 'Compare shape and area.', 'Shape changes; area does not.']), { title: 'Three rectangles with area 12', sections: [{ kind: 'card-grid', label: 'Recomposed rectangles', cards: [{ label: '2 × 6', sections: arrayVisual('2 × 6', 2, 6, '12 square units').sections }, { label: '3 × 4', sections: arrayVisual('3 × 4', 3, 4, '12 square units').sections }, { label: '4 × 3', sections: arrayVisual('4 × 3', 4, 3, '12 square units').sections }] }] }),
  3: animation(3, 'tile, shade, and remove one unit', 'Transfer a 10-tile rectangle to a grid, then remove one square unit.', '10 square centimeters − 1 square centimeter = 9 square centimeters', 'How does the grid preserve the physical tile model?', 2, 5, ['tile', 'grid', 'square centimeter', 'remove one'], steps(['Tile', 'Make a rectangle from 10 tiles.', 'Area is 10 square centimeters.'], ['Shade', 'Copy one grid square for each tile.', 'The drawing matches the model.'], ['Remove', 'Take away one tile and one shaded square.', 'Area becomes 9 square centimeters.']), arrayVisual('Ten square-centimeter tiles', 2, 5, 'Remove one tile after the 10-unit rectangle is recorded.')),
  4: animation(4, 'connect tile counts and side lengths', 'Trace a 3 by 5 rectangle made from 15 square-inch tiles.', '3 in × 5 in = 15 sq in', 'Why are the sides measured in inches but the inside in square inches?', 3, 5, ['tile counts', 'side length', 'opposite sides', 'square inches'], steps(['Build', 'Arrange 15 tiles in 3 rows of 5.', 'The edge counts are 3 and 5.'], ['Trace', 'Remove tiles and label the outline.', 'Side lengths remain 3 in and 5 in.'], ['Connect', 'Multiply the side lengths.', 'The inside area is 15 sq in.']), arrayVisual('3 by 5 tiled rectangle', 3, 5, 'Tile counts along the edges match the side lengths.')),
  5: animation(5, 'form an array from unit squares', 'Use 12 tiles as 6 groups of 2, then push them together into a rectangle.', '6 × 2 = 12 square inches; 12 ÷ 6 = 2 inches', 'How does the area help reveal the unknown side length?', 6, 2, ['unit squares', 'array', 'area', 'unknown side'], steps(['Group', 'Make 6 equal groups of 2 tiles.', 'All 12 tiles are used.'], ['Form rectangle', 'Push the groups together.', 'Rows and columns become visible.'], ['Find side', 'Use 12 ÷ 6.', 'The unknown side is 2 inches.']), arrayVisual('Six rows of two', 6, 2, 'The rectangle is an array of 12 square-inch tiles.')),
  6: animation(6, 'complete an incomplete array', 'Extend the visible top row and side column to recover a 5 by 6 rectangle.', '5 × 6 = 30 square units', 'Which visible edges prove the missing row and column structure?', 5, 6, ['incomplete array', 'extend lines', 'rows', 'columns'], steps(['Inspect', 'Read the visible partial rows and columns.', 'The rectangle structure is identified.'], ['Complete', 'Extend grid lines across the whole figure.', 'A 5 by 6 array appears.'], ['Multiply', 'Use the completed side lengths.', 'Area is 30 square units.']), { title: 'From incomplete edges to full array', sections: [{ kind: 'card-grid', label: 'Complete the row-and-column structure', cards: [{ label: 'Visible top row', sections: arrayVisual('1 row of 6', 1, 6, 'The top edge establishes 6 columns.').sections }, { label: 'Visible side column', sections: arrayVisual('1 column of 5', 5, 1, 'The side edge establishes 5 rows.').sections }, { label: 'Completed rectangle', sections: arrayVisual('5 by 6', 5, 6, 'The full area is 30 square units.').sections }] }] }),
  7: animation(7, 'interpret an area model as an array', 'Draw equal internal grid lines from the rectangle side lengths.', '3 × 4 = 12 square units', 'Why must an area answer name whether the units are square inches, centimeters, feet, or meters?', 3, 4, ['outer rectangle', 'internal grid', 'unit size', 'area label'], steps(['Read sides', 'Identify 3 rows and 4 columns.', 'The outside dimensions determine the grid.'], ['Draw grid', 'Partition into equal square units.', 'The area model becomes an array.'], ['Name unit', 'Multiply and attach the square unit.', 'The area is 12 square units of the named size.']), tableVisual('Same count, different-sized units', ['Model', 'Count', 'Unit'], [['3 × 4 grid', '12', 'square centimeters'], ['3 × 4 grid', '12', 'square inches'], ['3 × 4 grid', '12', 'square feet']])),
  8: animation(8, 'multiply side lengths for area', 'Use a 4-high by 7-wide model to connect side lengths directly to area.', '4 × 7 = 28 square units', 'When should area be found by multiplication, and when should a missing side be found by division?', 4, 7, ['side lengths', 'rows', 'columns', 'unknown side'], steps(['Label', 'Mark side lengths 4 and 7.', 'Rows and columns are known.'], ['Multiply', 'Compute 4 × 7.', 'Area is 28 square units.'], ['Reverse', 'Use area ÷ known side when a side is missing.', 'Division recovers the unknown length.']), arrayVisual('4 by 7 area model', 4, 7, 'Every inside unit is accounted for by 4 rows of 7.')),
  9: animation(9, 'cut and join equal rectangle areas', 'Cut a 10 by 10 grid into two 5 by 10 rectangles, then join them as 5 by 20.', '50 + 50 = 100 and 5 × 20 = 100 square centimeters', 'Why does moving the two rectangles change the dimensions but not the total area?', 5, 20, ['two equal parts', 'recompose', 'add areas', 'same total'], steps(['Cut', 'Make two 5 × 10 rectangles.', 'Each area is 50 sq cm.'], ['Join', 'Place the two parts side by side.', 'The new dimensions are 5 by 20.'], ['Compare', 'Calculate by addition and multiplication.', 'Both methods give 100 sq cm.']), { title: 'Cut and recompose', sections: [{ kind: 'card-grid', label: 'Same 100 square centimeters in two arrangements', cards: [{ label: 'Part A', sections: arrayVisual('5 × 10', 5, 10, '50 sq cm').sections }, { label: 'Part B', sections: arrayVisual('5 × 10', 5, 10, '50 sq cm').sections }, { label: 'Joined rectangle', sections: arrayVisual('5 × 20', 5, 20, '100 sq cm').sections }] }] }),
  10: animation(10, 'distribute area across two rectangles', 'Split an 8 by 6 rectangle into 5 by 6 and 3 by 6 parts.', '8 × 6 = (5 × 6) + (3 × 6) = 30 + 18 = 48', 'How do the two partial areas account for every square unit in the large rectangle?', 8, 6, ['decompose side', 'shared length', 'partial products', 'total area'], steps(['Split', 'Decompose 8 as 5 + 3.', 'The large rectangle becomes two parts.'], ['Multiply parts', 'Find 5 × 6 and 3 × 6.', 'Partial areas are 30 and 18.'], ['Add', 'Combine 30 + 18.', 'The whole area is 48.']), { title: 'Distributive area model', sections: [{ kind: 'card-grid', label: 'Parts and whole', cards: [{ label: 'Shaded part', sections: arrayVisual('5 × 6', 5, 6, '30 square centimeters').sections }, { label: 'Unshaded part', sections: arrayVisual('3 × 6', 3, 6, '18 square centimeters').sections }, { label: 'Whole rectangle', sections: arrayVisual('8 × 6', 8, 6, '48 square centimeters').sections }] }] }),
  11: animation(11, 'regroup factors into new side lengths', 'Use the associative property to generate rectangles with the same area.', '3 × (2 × 6) = (3 × 2) × 6 = 36', 'How does regrouping factors change the side lengths without changing area?', 6, 6, ['factor pairs', 'associative property', 'whole numbers', 'same area'], steps(['Decompose', 'Rewrite 12 as 2 × 6.', 'Three factors are visible.'], ['Regroup', 'Move parentheses to (3 × 2) × 6.', 'The factors remain the same.'], ['Interpret', 'Read the new side lengths 6 and 6.', 'The area remains 36.']), tableVisual('Whole-number side lengths', ['Area', 'Possible side pairs'], [['24', '1×24, 2×12, 3×8, 4×6'], ['36', '1×36, 2×18, 3×12, 4×9, 6×6'], ['48', '1×48, 2×24, 3×16, 4×12, 6×8'], ['72', '1×72, 2×36, 3×24, 4×18, 6×12, 8×9']])),
  12: animation(12, 'model an area word problem accurately', 'An area of 32 square feet and one 4-foot side require an 8-foot missing side.', '32 ÷ 4 = 8 feet; 4 × 8 = 32 square feet', 'How can the model show that the unknown side should be longer than 4 feet?', 4, 8, ['story quantities', 'accurate model', 'division', 'linear unit'], steps(['Represent', 'Label area 32 sq ft and one side 4 ft.', 'The unknown is the other side.'], ['Solve', 'Compute 32 ÷ 4.', 'The unknown side is 8 ft.'], ['Check', 'Multiply 4 × 8.', 'The model returns 32 sq ft.']), { title: 'Unknown-side area model', sections: [{ kind: 'geometry-diagram', label: '32-square-foot rectangle', diagram: 'rectangle', shapes: [{ label: 'rectangle', shape: 'rectangle', x: 10, y: 15, width: 80, height: 40, sideLabels: ['8 ft', '4 ft'], valueLabel: 'Area = 32 sq ft', tone: 'answer' }], caption: 'The 8-foot side is longer than the 4-foot side, so the drawing supports the quantities.' }] }),
  13: animation(13, 'add parts or subtract a cutout', 'Find a composite area by decomposing it or completing a larger rectangle.', '6 × 6 − 2 × 4 = 36 − 8 = 28 square centimeters', 'Which view—adding rectangle parts or subtracting the missing rectangle—is clearer for this figure?', 6, 6, ['composite figure', 'decompose', 'complete', 'add or subtract'], steps(['Choose view', 'Mark rectangle parts or a missing cutout.', 'The non-rectangle becomes manageable.'], ['Find areas', 'Multiply each rectangle’s side lengths.', 'Whole and part areas are known.'], ['Combine', 'Add parts or subtract the cutout.', 'The shaded area is justified.']), compositeVisual('Composite area', '6 × 6 − 2 × 4 = 28 sq cm', 'The target area can be found without counting unit squares one by one.')),
  14: animation(14, 'subtract a rectangular cutout', 'Find the area of Fanny’s fabric and remove the area of the 3-foot by 2-foot piece.', '8 × 5 − 3 × 2 = 40 − 6 = 34 square feet', 'Why does the cutout location not change how much fabric remains?', 5, 8, ['original rectangle', 'cutout', 'subtraction', 'remaining area'], steps(['Find whole', 'Compute 8 × 5.', 'Original area is 40 sq ft.'], ['Find cutout', 'Compute 3 × 2.', 'Removed area is 6 sq ft.'], ['Subtract', 'Compute 40 − 6.', '34 sq ft remain.']), compositeVisual('Fanny’s fabric', '8 × 5 − 3 × 2 = 34 sq ft', 'Only the cutout area, not its position, determines the remaining area.')),
  15: animation(15, 'calculate a seven-room floor plan', 'Measure or infer room dimensions, calculate each room, and combine the seven areas.', '60 + 56 + 42 + 24 + 25 + 28 + 88 = 323 square centimeters', 'How can shared room boundaries help find lengths without measuring every side?', 17, 19, ['floor plan', 'shared boundaries', 'room areas', 'whole area'], steps(['Measure/infer', 'Label each room’s side lengths.', 'Every rectangular part has dimensions.'], ['Calculate', 'Multiply or decompose for each room.', 'Seven room areas are found.'], ['Combine', 'Add all rooms and check 19 × 17.', 'The whole area is 323 sq cm.']), FLOOR_PLAN_VISUAL),
  16: animation(16, 'redesign rooms with equivalent areas', 'Choose alternate whole-number dimensions that preserve every required room area.', '3 × 8 = 24; 1 × 24 = 24; 2 × 12 = 24; 6 × 4 = 24', 'How do the multiplication equations prove that a redesigned room keeps its required area?', 6, 4, ['required area', 'factor pairs', 'new dimensions', 'floor-plan design'], steps(['Choose factors', 'Select a whole-number pair for each area.', 'The target area is preserved.'], ['Draw rooms', 'Build rectangles from the chosen dimensions.', 'New shapes can differ from Lesson 15.'], ['Verify', 'Multiply every pair and explain composite rooms.', 'All room requirements are satisfied.']), tableVisual('Room redesign workspace', ['Room', 'Required area', 'New side lengths'], [['Bedroom 1', '60 sq cm', '____ × ____'], ['Bedroom 2', '56 sq cm', '____ × ____'], ['Kitchen', '42 sq cm', '____ × ____'], ['Hallway', '24 sq cm', '3×8, 1×24, 2×12, or 6×4'], ['Bathroom', '25 sq cm', '____ × ____'], ['Dining Room', '28 sq cm', '____ × ____'], ['Living Room', '88 sq cm', '____ × ____']]))
};

export function alignM4RuntimeSources(runtime: LessonRuntimeConfig, lessonNumber: number): LessonRuntimeConfig {
  const teacherSource = m4TeacherSource(lessonNumber);
  const exactObjective = M4_TEACHER_OBJECTIVES[lessonNumber];
  return {
    ...runtime,
    lessonAnimation: M4_FUNCTIONAL_ANIMATIONS[lessonNumber],
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
