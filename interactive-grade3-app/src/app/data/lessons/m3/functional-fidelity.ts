import type {
  LessonAnimationModel,
  LessonRuntimeConfig,
  ProblemSetCenteredConceptSection
} from '../lesson-runtime.types';

export const M3_TEACHER_PAGE_RANGES: Record<number, [number, number]> = {
  1: [14, 25], 2: [26, 37], 3: [38, 50], 4: [51, 61], 5: [62, 72],
  6: [73, 84], 7: [85, 96], 8: [97, 107], 9: [108, 118], 10: [119, 129],
  11: [130, 149], 12: [150, 162], 13: [163, 175], 14: [176, 186],
  15: [187, 199], 16: [200, 211], 17: [212, 224], 18: [225, 237],
  19: [238, 247], 20: [248, 257], 21: [258, 269]
};

export function m3TeacherSource(lessonNumber: number): string {
  const [start, end] = M3_TEACHER_PAGE_RANGES[lessonNumber];
  return `Module 3 Teacher Edition, lesson pages ${start}-${end}.`;
}

type ConceptGuide = Array<{
  title: string;
  body: string;
  checkpoints: string[];
}>;

const M3_FUNCTIONAL_CONCEPT_GUIDES: Record<number, ConceptGuide> = {
  6: [
    { title: '1. Break apart a hard multiplication fact', body: 'Model 9 sevens, then split the tape into 5 sevens and 4 sevens: 35 + 28 = 63.', checkpoints: ['Keep every unit equal to 7.', 'Show both partial products.', 'Combine the parts to recover 9 × 7.'] },
    { title: '2. Distribute division across friendly parts', body: 'Split 48 into 30 and 18 because both parts divide evenly by 6. Then 30 ÷ 6 + 18 ÷ 6 = 5 + 3 = 8.', checkpoints: ['Keep the divisor 6.', 'Use parts divisible by 6.', 'Add the partial quotients.'] },
    { title: '3. Explain why the strategy works', body: 'The whole is unchanged when it is decomposed into compatible parts, so the partial products or quotients recombine to the original value.', checkpoints: ['Name the unchanged whole.', 'Name the two compatible parts.', 'Check with the related fact.'] }
  ],
  7: [
    { title: '1. Locate the unknown in the story', body: 'A tape can show an unknown total, number of groups, or size of each group. In the beetle example, 7 beetles with 6 legs each gives an unknown total.', checkpoints: ['Name what is known.', 'Name what the letter represents.', 'Include the story unit.'] },
    { title: '2. Match tape and equation', body: 'Seven equal parts labeled 6 match 7 × 6 = b. The same whole-part relationship supports related division equations.', checkpoints: ['Match each tape part to one group.', 'Place the unknown correctly.', 'Do not change the given quantities.'] },
    { title: '3. Solve and interpret', body: 'Use the familiar 6 and 7 facts, then state what the answer means in the original context.', checkpoints: ['Solve the matching fact.', 'Check with the inverse operation.', 'Write a labeled answer.'] }
  ],
  8: [
    { title: '1. Read parentheses as a direction', body: 'Parentheses identify the operation to complete first. They determine which quantities are treated as one expression.', checkpoints: ['Locate the grouped expression.', 'Evaluate inside it first.', 'Carry the result into the remaining operation.'] },
    { title: '2. Compare different groupings', body: 'Richard has 2 cartons of 6 eggs and drops 2 eggs. The source situation is (2 × 6) − 2 = 10; changing the grouping changes the meaning and may change the value.', checkpoints: ['Connect the grouping to the story.', 'Compare both values.', 'Reject a grouping that changes the situation.'] },
    { title: '3. Use parentheses to reach a target', body: 'Place parentheses so the written expression produces the required result, then explain which operation happened first.', checkpoints: ['Preserve the number and operation order.', 'Add only parentheses.', 'Verify the target value.'] }
  ],
  9: [
    { title: '1. Decompose one factor', body: 'Rewrite 16 as 8 × 2 so a three-factor expression becomes visible.', checkpoints: ['Keep the value 16 unchanged.', 'Show 16 = 8 × 2.', 'Use the same three factors.'] },
    { title: '2. Regroup without reordering', body: '(8 × 2) × 3 can be regrouped as 8 × (2 × 3). The factors stay in the same order while the grouping changes.', checkpoints: ['Move the parentheses only.', 'Multiply 2 × 3 first.', 'Connect the regrouping to the array.'] },
    { title: '3. Use the friendlier fact', body: 'Compute 8 × 6 = 48 and check that it matches 16 × 3.', checkpoints: ['Evaluate the inner group.', 'Use the known fact.', 'Check both expressions have the same product.'] }
  ],
  10: [
    { title: '1. Split an eights array', body: 'Partition a 6-by-8 array into 5 eights and 1 eight so the known five-fact supports the unknown fact.', checkpoints: ['Keep rows and columns tied to the source.', 'Mark the five-part split.', 'Show both partial products.'] },
    { title: '2. Write the distributive equation', body: '6 × 8 = (5 × 8) + (1 × 8) = 40 + 8 = 48.', checkpoints: ['Use the same unit of 8.', 'Add the partial products.', 'Match the full array total.'] },
    { title: '3. Apply the same structure to division', body: 'Decompose a dividend into friendly multiples of 8, divide each part by 8, and combine the partial quotients.', checkpoints: ['Choose compatible dividend parts.', 'Keep divisor 8.', 'Check with multiplication.'] }
  ],
  11: [
    { title: '1. Represent each word problem', body: 'Draw a tape that preserves the source whole, equal parts, known quantity, and unknown letter.', checkpoints: ['Identify the unknown position.', 'Label every given quantity.', 'Use the requested unit.'] },
    { title: '2. Write the matching equation', body: 'Use multiplication for an unknown total and division for an unknown group count or group size.', checkpoints: ['Match the equation to the tape.', 'Keep the letter tied to the story.', 'Solve only after modeling.'] },
    { title: '3. Check the answer in context', body: 'Substitute the value into the relationship and state the answer with its story label.', checkpoints: ['Use the inverse operation.', 'Check reasonableness.', 'Answer the question asked.'] }
  ],
  12: [
    { title: '1. Build ten groups', body: 'Use the familiar ten-fact as a benchmark. For example, 6 × 10 = 60.', checkpoints: ['Keep the unit size fixed.', 'Find ten groups.', 'Label the benchmark product.'] },
    { title: '2. Remove one group', body: 'Because 9 = 10 − 1, subtract one group: 6 × 9 = 60 − 6 = 54.', checkpoints: ['Remove exactly one group.', 'Subtract one unit of the factor.', 'Connect the result to the nines fact.'] },
    { title: '3. Connect models and equations', body: 'The split array or tape and the equation n × 9 = (n × 10) − n show the same relationship.', checkpoints: ['Show ten groups first.', 'Mark the removed group.', 'Verify the product.'] }
  ],
  13: [
    { title: '1. List multiples of 9', body: 'Read the products 9, 18, 27, 36, 45, 54, 63, 72, 81, and 90 in order.', checkpoints: ['Add 9 each time.', 'Keep the factor order visible.', 'Check each product.'] },
    { title: '2. Notice the digit pattern', body: 'As the tens digit increases by 1, the ones digit decreases by 1; the two digits in each product through 90 sum to 9.', checkpoints: ['Compare consecutive products.', 'Describe both digit changes.', 'Test the sum of the digits.'] },
    { title: '3. Use the pattern to multiply', body: 'Use add-ten-subtract-one and the digit pattern to predict and check a nines product.', checkpoints: ['Name the pattern used.', 'Calculate the product.', 'Check it against the sequence.'] }
  ],
  14: [
    { title: '1. Connect 9 × n to 10 × n − n', body: 'Use add ten, subtract one to generate each nines fact from a related tens fact.', checkpoints: ['Find the tens fact.', 'Subtract one group.', 'Check the nines product.'] },
    { title: '2. Read the tens-and-ones pattern', body: 'For 2 × 9 through 10 × 9, the tens digit is one less than the factor and the digits sum to 9.', checkpoints: ['Compare factor and tens digit.', 'Find the missing ones digit.', 'Verify the digit sum.'] },
    { title: '3. Explain a chosen strategy', body: 'A correct answer must name how the pattern or 9 = 10 − 1 relationship produces the product.', checkpoints: ['State the strategy.', 'Show the calculation.', 'Explain why it works.'] }
  ],
  15: [
    { title: '1. Identify the unknown quantity', body: 'Decide whether the story asks for a total, the number of groups, or the size of each group.', checkpoints: ['Name the unknown.', 'Name its unit.', 'Locate it on a tape.'] },
    { title: '2. Model and solve', body: 'Use the exact source quantities with multiplication or division, such as 36 ÷ 9 = 4 or 7 × 9 = 63.', checkpoints: ['Preserve the source values.', 'Write an equation with an unknown.', 'Solve with a known nines fact.'] },
    { title: '3. Interpret and check', body: 'State the result in context and use the related multiplication or division fact to check it.', checkpoints: ['Attach the requested unit.', 'Substitute the answer.', 'Confirm the whole is preserved.'] }
  ],
  16: [
    { title: '1. Multiply and divide with 1', body: 'One group of a number and a number in groups of 1 preserve that number: 1 × n = n, n × 1 = n, and n ÷ 1 = n.', checkpoints: ['Model one group.', 'Model groups of one.', 'State what remains unchanged.'] },
    { title: '2. Multiply and divide with 0', body: 'Zero groups contain zero objects, so 0 × n = 0. A zero total shared among a nonzero number of groups gives 0 in each group.', checkpoints: ['Distinguish zero groups from one group.', 'Keep the divisor nonzero.', 'Explain the result with a model.'] },
    { title: '3. Generalize the patterns', body: 'Use letters to state and explain the identity and zero patterns rather than memorizing disconnected facts.', checkpoints: ['Write a general equation.', 'Give a matching example.', 'Explain the pattern.'] }
  ],
  17: [
    { title: '1. Complete the multiplication table', body: 'Use known products and commutative partners to complete the table accurately.', checkpoints: ['Use row and column factors.', 'Reflect commutative facts.', 'Check every product.'] },
    { title: '2. Mark visible product patterns', body: 'Compare even and odd products, square products on the diagonal, and repeated patterns across rows and columns.', checkpoints: ['Use table evidence.', 'Name the rows or columns compared.', 'Distinguish a pattern from a guess.'] },
    { title: '3. Explain why a pattern occurs', body: 'Connect the marked cells to factor structure and arrays so the explanation accounts for every highlighted product.', checkpoints: ['State the observed pattern.', 'Connect it to factors.', 'Test another example.'] }
  ],
  18: [
    { title: '1. Read and draw the two-step story', body: 'Identify the quantities, draw a model, and decide which intermediate value must be found first.', checkpoints: ['Represent every given.', 'Mark the unknown.', 'Name the first step.'] },
    { title: '2. Solve both operations in order', body: 'Use the exact source operations and carry the first result into the second equation.', checkpoints: ['Show two equations.', 'Use the intermediate result.', 'Keep units attached.'] },
    { title: '3. Assess reasonableness', body: 'Estimate or use inverse operations to decide whether the result makes sense in the story.', checkpoints: ['Compare with a benchmark.', 'Check both steps.', 'Write a complete answer sentence.'] }
  ],
  19: [
    { title: '1. Relate ones to tens', body: 'Use a known ones fact, such as 4 × 3 = 12, then reinterpret 3 as 3 tens.', checkpoints: ['Solve the basic fact.', 'Name the tens unit.', 'Keep the factor count unchanged.'] },
    { title: '2. Use the place value chart', body: 'Four groups of 3 tens make 12 tens, which is 120.', checkpoints: ['Place the product in tens.', 'Rename 12 tens as 1 hundred 2 tens.', 'Write the standard number.'] },
    { title: '3. Check the zero relationship', body: 'The tens fact has a product ten times the related ones fact because the unit changed from ones to tens.', checkpoints: ['Compare both products.', 'Explain the factor of 10.', 'Check with place value.'] }
  ],
  20: [
    { title: '1. Decompose a multiple of 10', body: 'Read m × 10 as m groups of ten, then place it inside the multiplication expression.', checkpoints: ['Identify m.', 'Keep the factor n.', 'Show the factor of 10.'] },
    { title: '2. Regroup with the associative property', body: 'Use n × (m × 10) = (n × m) × 10. Multiply the single-digit factors first.', checkpoints: ['Regroup without reordering.', 'Solve n × m.', 'Multiply that product by 10.'] },
    { title: '3. Connect to place value', body: 'The final factor of 10 changes the basic-fact product into tens, explaining the zero in the product.', checkpoints: ['Name the basic fact.', 'Name the tens value.', 'Verify both expressions are equal.'] }
  ],
  21: [
    { title: '1. Model the two-step quantities', body: 'Draw a tape or equation plan that includes every source quantity and identifies the intermediate result.', checkpoints: ['Preserve the given values.', 'Mark the final unknown.', 'Choose the first operation.'] },
    { title: '2. Multiply with a multiple of 10', body: 'Use place value or association for the multiplication step, then combine it with the second operation.', checkpoints: ['Use the related basic fact.', 'Interpret tens correctly.', 'Carry the result into step two.'] },
    { title: '3. Check the result in context', body: 'Verify both operations and state the final answer with the requested unit, such as seconds, cents, grams, or dollars.', checkpoints: ['Check operation order.', 'Check the unit.', 'Assess reasonableness.'] }
  ]
};

export function m3FunctionalConceptSections(lessonNumber: number): ProblemSetCenteredConceptSection[] | undefined {
  return M3_FUNCTIONAL_CONCEPT_GUIDES[lessonNumber]?.map((section) => ({
    ...section,
    teacherSource: m3TeacherSource(lessonNumber)
  }));
}

export const M3_FUNCTIONAL_ANIMATIONS: Partial<Record<number, LessonAnimationModel>> = {
  12: {
    kind: 'array', title: 'Lesson 12 animation: build a nines fact from ten groups',
    context: 'Build 6 groups of 10, then remove one group of 6 to represent 6 × 9.',
    equation: '6 × 9 = (6 × 10) − 6 = 60 − 6 = 54',
    teacherPrompt: 'Which one group is removed from the ten-fact, and why does the unit stay 6?',
    rowCount: 6, columnCount: 10, firstPart: 9, secondPart: 1,
    focus: ['ten-fact', 'remove one group', 'same unit', 'nines product'],
    conceptSteps: [
      { label: 'Build ten groups', action: 'Show 6 × 10.', result: 'The benchmark product is 60.' },
      { label: 'Remove one group', action: 'Subtract one group of 6.', result: '60 − 6 = 54.' },
      { label: 'Name the fact', action: 'Nine groups remain.', result: '6 × 9 = 54.' }
    ]
  },
  13: {
    kind: 'number-line', title: 'Lesson 13 animation: reveal the multiples-of-9 pattern',
    context: 'Advance through the multiples of 9 and compare the tens and ones digits in each product.',
    equation: '9, 18, 27, 36, 45, 54, 63, 72, 81, 90',
    teacherPrompt: 'What changes by 1 in opposite directions, and what stays true about the sum of the digits?',
    numberLineLabels: ['0', '9', '18', '27', '36', '45', '54', '63', '72', '81', '90'],
    numberLineJumps: ['+9', '+9', '+9', '+9', '+9', '+9', '+9', '+9', '+9', '+9'],
    focus: ['add 9', 'tens increase', 'ones decrease', 'digits sum to 9']
  },
  14: {
    kind: 'array', title: 'Lesson 14 animation: connect nines patterns to 10 − 1',
    context: 'Generate a nines product from the related tens fact, then check its tens digit, ones digit, and digit sum.',
    equation: '7 × 9 = (7 × 10) − 7 = 70 − 7 = 63',
    teacherPrompt: 'How do the 10 − 1 strategy and the digit pattern both verify 7 × 9?',
    rowCount: 7, columnCount: 10, firstPart: 9, secondPart: 1,
    focus: ['10 − 1', 'remove one group', 'tens digit', 'digit sum'],
    conceptSteps: [
      { label: 'Use the tens fact', action: 'Find 7 × 10.', result: 'The benchmark is 70.' },
      { label: 'Subtract one seven', action: 'Compute 70 − 7.', result: 'The product is 63.' },
      { label: 'Check the digits', action: 'Compare factor 7 with 63.', result: 'The tens digit is 6 and 6 + 3 = 9.' }
    ]
  },
  15: {
    kind: 'tape-diagram', title: 'Lesson 15 animation: place the unknown in the equal-groups relationship',
    context: 'Compare an unknown number of groups, an unknown group size, and an unknown total using the source nines stories.',
    equation: 'whole = number of groups × size of each group',
    teacherPrompt: 'Which quantity is unknown, and where must it appear on the tape and in the equation?',
    tapePartCount: 9, tapePartLabel: 'equal part', tapeWholeLabel: 'story whole',
    focus: ['story quantities', 'unknown position', 'equal parts', 'labeled answer']
  },
  16: {
    kind: 'array', title: 'Lesson 16 animation: compare the zero and one patterns',
    context: 'Contrast one group, groups of one, and zero groups to explain multiplication and division with 0 and 1.',
    equation: '1 × n = n; n × 1 = n; n ÷ 1 = n; 0 × n = 0',
    teacherPrompt: 'What does the model show for one group, groups of one, and zero groups?',
    rowCount: 4, columnCount: 1, firstPart: 1, secondPart: 0,
    focus: ['one group', 'groups of one', 'zero groups', 'general rule']
  },
  17: {
    kind: 'array', title: 'Lesson 17 animation: reveal patterns in the multiplication table',
    context: 'Complete products, reflect commutative partners, and mark even, odd, and square-product patterns.',
    equation: 'row factor × column factor = table product',
    teacherPrompt: 'Which highlighted products share a factor structure, and why does that pattern repeat?',
    rowCount: 10, columnCount: 10, firstPart: 5, secondPart: 5,
    focus: ['row and column factors', 'commutative reflection', 'square products', 'even and odd products']
  },
  18: {
    kind: 'tape-diagram', title: 'Lesson 18 animation: solve and check a two-step story',
    context: 'Find the known yarn total first, then subtract it from 81 centimeters to find the unknown piece.',
    equation: '6 × 9 = 54; 81 − 54 = 27 centimeters',
    teacherPrompt: 'Which intermediate value must be found before the final subtraction, and how can we check 27 centimeters?',
    tapePartCount: 6, tapePartLabel: '9 cm', tapeWholeLabel: '81 cm',
    focus: ['draw the story', 'intermediate result', 'second operation', 'reasonableness']
  },
  19: {
    kind: 'array', title: 'Lesson 19 animation: move from a ones fact to a tens fact',
    context: 'Use 4 × 3 = 12, then reinterpret 3 as 3 tens so 4 groups make 12 tens.',
    equation: '4 × 3 = 12; 4 × 30 = 12 tens = 120',
    teacherPrompt: 'What changed when 3 ones became 3 tens, and why is the product ten times as large?',
    rowCount: 4, columnCount: 3, firstPart: 3, secondPart: 0,
    focus: ['basic fact', 'tens unit', '12 tens', '120']
  },
  20: {
    kind: 'array', title: 'Lesson 20 animation: regroup factors before multiplying by 10',
    context: 'Regroup 3 × (5 × 10) so the single-digit fact is solved first and the factor of 10 remains visible.',
    equation: '3 × (5 × 10) = (3 × 5) × 10 = 15 × 10 = 150',
    teacherPrompt: 'Which factors are regrouped, and how does the final factor of 10 change 15 into 150?',
    rowCount: 3, columnCount: 5, firstPart: 5, secondPart: 0,
    focus: ['associative property', 'single-digit fact', 'factor of 10', 'place value']
  },
  21: {
    kind: 'tape-diagram', title: 'Lesson 21 animation: carry an intermediate result into step two',
    context: 'Convert five minutes to 300 seconds, then add the remaining 45 seconds.',
    equation: '5 × 60 = 300; 300 + 45 = 345 seconds',
    teacherPrompt: 'Why must the minutes be converted before the extra seconds are added?',
    tapePartCount: 6, tapePartLabel: 'time part', tapeWholeLabel: '345 seconds',
    focus: ['first operation', 'intermediate result', 'second operation', 'labeled answer']
  }
};

export function alignM3RuntimeSources(runtime: LessonRuntimeConfig, lessonNumber: number): LessonRuntimeConfig {
  const teacherSource = m3TeacherSource(lessonNumber);
  const exactObjective = lessonNumber === 20
    ? 'Use place value strategies and the associative property n × (m × 10) = (n × m) × 10 (where n and m are less than 10) to multiply by multiples of 10.'
    : undefined;
  return {
    ...runtime,
    lessonAnimation: M3_FUNCTIONAL_ANIMATIONS[lessonNumber] ?? runtime.lessonAnimation,
    teacherEditionSteps: runtime.teacherEditionSteps?.map((step) => ({
      ...step,
      studentPrompt: exactObjective && step.id === 'source-goal' ? exactObjective : step.studentPrompt,
      teacherEditionBasis: /Teacher Edition|teacher_edition|lesson pages/i.test(step.teacherEditionBasis)
        ? teacherSource
        : step.teacherEditionBasis
    })),
    sourceRows: runtime.sourceRows
      ? Object.fromEntries(Object.entries(runtime.sourceRows).map(([key, rows]) => [
          key,
          rows.map((row) => ({
            ...row,
            value: exactObjective && key === 'source-goal' && row.label === 'Source text'
              ? exactObjective
              : row.label === 'Source' && /Teacher Edition|teacher_edition|lesson pages/i.test(row.value)
                ? teacherSource
                : row.value
          }))
        ]))
      : runtime.sourceRows
  };
}
