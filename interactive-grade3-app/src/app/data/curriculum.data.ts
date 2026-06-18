import { LessonContent, ModuleMeta } from './curriculum.types';

export const MODULES: ModuleMeta[] = [
  {
    id: 'm1',
    number: 1,
    title: 'Properties of Multiplication and Division and Solving Problems with Units of 2-5 and 10',
    sourcePdf: 'EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf',
    summary:
      'Module 1 begins Grade 3 multiplication and division by building from equal groups, repeated addition, arrays, skip-counting, tape diagrams, and word problems.',
    visualModels: ['equal-groups', 'array', 'tape-diagram'],
    topics: [
      {
        id: 'm1-ta',
        label: 'Topic A',
        title: 'Multiplication and the Meaning of the Factors',
        days: 3,
        lessonIds: ['m1-l1', 'm1-l2', 'm1-l3']
      },
      {
        id: 'm1-tb',
        label: 'Topic B',
        title: 'Division as an Unknown Factor Problem',
        days: 3,
        lessonIds: ['m1-l4', 'm1-l5', 'm1-l6']
      },
      {
        id: 'm1-tc',
        label: 'Topic C',
        title: 'Multiplication Using Units of 2 and 3',
        days: 4,
        lessonIds: ['m1-l7', 'm1-l8', 'm1-l9', 'm1-l10']
      },
      {
        id: 'm1-td',
        label: 'Topic D',
        title: 'Division Using Units of 2 and 3',
        days: 3,
        lessonIds: ['m1-l11', 'm1-l12', 'm1-l13']
      },
      {
        id: 'm1-te',
        label: 'Topic E',
        title: 'Multiplication and Division Using Units of 4',
        days: 4,
        lessonIds: ['m1-l14', 'm1-l15', 'm1-l16', 'm1-l17']
      },
      {
        id: 'm1-tf',
        label: 'Topic F',
        title: 'Distributive Property and Problem Solving Using Units of 2-5 and 10',
        days: 4,
        lessonIds: ['m1-l18', 'm1-l19', 'm1-l20', 'm1-l21']
      }
    ]
  },
  {
    id: 'm2',
    number: 2,
    title: 'Place Value and Problem Solving with Units of Measure',
    sourcePdf: 'EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf',
    summary:
      'Module 2 uses time, metric weight, liquid volume, rounding, and measurement contexts to strengthen place value and problem solving.',
    visualModels: ['number-line', 'clock', 'measurement'],
    topics: [
      {
        id: 'm2-ta',
        label: 'Topic A',
        title: 'Time Measurement and Problem Solving',
        days: 5,
        lessonIds: ['m2-l1', 'm2-l2', 'm2-l3', 'm2-l4', 'm2-l5']
      },
      {
        id: 'm2-tb',
        label: 'Topic B',
        title: 'Measuring Weight and Liquid Volume in Metric Units',
        days: 6,
        lessonIds: ['m2-l6', 'm2-l7', 'm2-l8', 'm2-l9', 'm2-l10', 'm2-l11']
      },
      {
        id: 'm2-tc',
        label: 'Topic C',
        title: 'Rounding to the Nearest Ten and Hundred',
        days: 3,
        lessonIds: ['m2-l12', 'm2-l13', 'm2-l14']
      },
      {
        id: 'm2-td',
        label: 'Topic D',
        title: 'Two- and Three-Digit Measurement Addition Using the Standard Algorithm',
        days: 3,
        lessonIds: ['m2-l15', 'm2-l16', 'm2-l17']
      },
      {
        id: 'm2-te',
        label: 'Topic E',
        title: 'Two- and Three-Digit Measurement Subtraction Using the Standard Algorithm',
        days: 4,
        lessonIds: ['m2-l18', 'm2-l19', 'm2-l20', 'm2-l21']
      }
    ]
  },
  {
    id: 'm3',
    number: 3,
    title: 'Multiplication and Division with Units of 0, 1, 6-9, and Multiples of 10',
    sourcePdf: 'EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf',
    summary:
      'Module 3 extends multiplication and division fluency to the remaining factors and multiples of 10.',
    visualModels: ['array', 'tape-diagram'],
    topics: [
      {
        id: 'm3-ta',
        label: 'Topic A',
        title: 'The Properties of Multiplication and Division',
        days: 3,
        lessonIds: ['m3-l1', 'm3-l2', 'm3-l3']
      },
      {
        id: 'm3-tb',
        label: 'Topic B',
        title: 'Multiplication and Division Using Units of 6 and 7',
        days: 4,
        lessonIds: ['m3-l4', 'm3-l5', 'm3-l6', 'm3-l7']
      },
      {
        id: 'm3-tc',
        label: 'Topic C',
        title: 'Multiplication and Division Using Units up to 8',
        days: 4,
        lessonIds: ['m3-l8', 'm3-l9', 'm3-l10', 'm3-l11']
      },
      {
        id: 'm3-td',
        label: 'Topic D',
        title: 'Multiplication and Division Using Units of 9',
        days: 4,
        lessonIds: ['m3-l12', 'm3-l13', 'm3-l14', 'm3-l15']
      },
      {
        id: 'm3-te',
        label: 'Topic E',
        title: 'Analysis of Patterns and Problem Solving Including Units of 0 and 1',
        days: 3,
        lessonIds: ['m3-l16', 'm3-l17', 'm3-l18']
      },
      {
        id: 'm3-tf',
        label: 'Topic F',
        title: 'Multiplication of Single-Digit Factors and Multiples of 10',
        days: 3,
        lessonIds: ['m3-l19', 'm3-l20', 'm3-l21']
      }
    ]
  },
  {
    id: 'm4',
    number: 4,
    title: 'Multiplication and Area',
    sourcePdf: 'EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf',
    summary:
      'Module 4 develops area through tiling, arrays, side lengths, multiplication, and decomposed rectangles.',
    visualModels: ['area-model', 'array'],
    topics: [
      {
        id: 'm4-ta',
        label: 'Topic A',
        title: 'Foundations for Understanding Area',
        days: 4,
        lessonIds: ['m4-l1', 'm4-l2', 'm4-l3', 'm4-l4']
      },
      {
        id: 'm4-tb',
        label: 'Topic B',
        title: 'Concepts of Area Measurement',
        days: 4,
        lessonIds: ['m4-l5', 'm4-l6', 'm4-l7', 'm4-l8']
      },
      {
        id: 'm4-tc',
        label: 'Topic C',
        title: 'Arithmetic Properties Using Area Models',
        days: 3,
        lessonIds: ['m4-l9', 'm4-l10', 'm4-l11']
      },
      {
        id: 'm4-td',
        label: 'Topic D',
        title: 'Applications of Area Using Side Lengths of Figures',
        days: 5,
        lessonIds: ['m4-l12', 'm4-l13', 'm4-l14', 'm4-l15', 'm4-l16']
      }
    ]
  },
  {
    id: 'm5',
    number: 5,
    title: 'Fractions as Numbers on the Number Line',
    sourcePdf: 'EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf',
    summary:
      'Module 5 builds fractions from equal parts of a whole, fraction strips, number lines, and equivalence.',
    visualModels: ['fraction-strip', 'number-line'],
    topics: [
      {
        id: 'm5-ta',
        label: 'Topic A',
        title: 'Partitioning a Whole into Equal Parts',
        days: 4,
        lessonIds: ['m5-l1', 'm5-l2', 'm5-l3', 'm5-l4']
      },
      {
        id: 'm5-tb',
        label: 'Topic B',
        title: 'Unit Fractions and Their Relation to the Whole',
        days: 5,
        lessonIds: ['m5-l5', 'm5-l6', 'm5-l7', 'm5-l8', 'm5-l9']
      },
      {
        id: 'm5-tc',
        label: 'Topic C',
        title: 'Comparing Unit Fractions and Specifying the Whole',
        days: 4,
        lessonIds: ['m5-l10', 'm5-l11', 'm5-l12', 'm5-l13']
      },
      {
        id: 'm5-td',
        label: 'Topic D',
        title: 'Fractions on the Number Line',
        days: 6,
        lessonIds: ['m5-l14', 'm5-l15', 'm5-l16', 'm5-l17', 'm5-l18', 'm5-l19']
      },
      {
        id: 'm5-te',
        label: 'Topic E',
        title: 'Equivalent Fractions',
        days: 8,
        lessonIds: ['m5-l20', 'm5-l21', 'm5-l22', 'm5-l23', 'm5-l24', 'm5-l25', 'm5-l26', 'm5-l27']
      },
      {
        id: 'm5-tf',
        label: 'Topic F',
        title: 'Comparison, Order, and Size of Fractions',
        days: 3,
        lessonIds: ['m5-l28', 'm5-l29', 'm5-l30']
      }
    ]
  },
  {
    id: 'm6',
    number: 6,
    title: 'Collecting and Displaying Data',
    sourcePdf: 'EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf',
    summary:
      'Module 6 focuses on categorical and measurement data, scaled graphs, and line plots.',
    visualModels: ['graph', 'number-line'],
    topics: [
      {
        id: 'm6-ta',
        label: 'Topic A',
        title: 'Generate and Analyze Categorical Data',
        days: 4,
        lessonIds: ['m6-l1', 'm6-l2', 'm6-l3', 'm6-l4']
      },
      {
        id: 'm6-tb',
        label: 'Topic B',
        title: 'Generate and Analyze Measurement Data',
        days: 5,
        lessonIds: ['m6-l5', 'm6-l6', 'm6-l7', 'm6-l8', 'm6-l9']
      }
    ]
  },
  {
    id: 'm7',
    number: 7,
    title: 'Geometry and Measurement Word Problems',
    sourcePdf: 'EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf',
    summary:
      'Module 7 closes the year with word problems, geometry, perimeter, area, and review.',
    visualModels: ['geometry', 'area-model', 'graph'],
    topics: [
      {
        id: 'm7-ta',
        label: 'Topic A',
        title: 'Solving Word Problems',
        days: 3,
        lessonIds: ['m7-l1', 'm7-l2', 'm7-l3']
      },
      {
        id: 'm7-tb',
        label: 'Topic B',
        title: 'Attributes of Two-Dimensional Figures',
        days: 6,
        lessonIds: ['m7-l4', 'm7-l5', 'm7-l6', 'm7-l7', 'm7-l8', 'm7-l9']
      },
      {
        id: 'm7-tc',
        label: 'Topic C',
        title: 'Problem Solving with Perimeter',
        days: 8,
        lessonIds: ['m7-l10', 'm7-l11', 'm7-l12', 'm7-l13', 'm7-l14', 'm7-l15', 'm7-l16', 'm7-l17']
      },
      {
        id: 'm7-td',
        label: 'Topic D',
        title: 'Recording Perimeter and Area Data on Line Plots',
        days: 5,
        lessonIds: ['m7-l18', 'm7-l19', 'm7-l20', 'm7-l21', 'm7-l22']
      },
      {
        id: 'm7-te',
        label: 'Topic E',
        title: 'Problem Solving with Perimeter and Area',
        days: 8,
        lessonIds: ['m7-l23', 'm7-l24', 'm7-l25', 'm7-l26', 'm7-l27', 'm7-l28', 'm7-l29', 'm7-l30']
      },
      {
        id: 'm7-tf',
        label: 'Topic F',
        title: 'Year in Review',
        days: 4,
        lessonIds: ['m7-l31', 'm7-l32', 'm7-l33', 'm7-l34']
      }
    ]
  }
];

export const LESSONS: LessonContent[] = [
  {
    id: 'm1-l1',
    moduleId: 'm1',
    topicId: 'm1-ta',
    lessonNumber: 1,
    title: 'Understand Equal Groups as Multiplication',
    objective: 'Understand equal groups of as multiplication.',
    studentGoal:
      'I can use equal groups, repeated addition, unit form, and a multiplication sentence to describe the same total.',
    sourceRefs: [
      {
        sourceType: 'teacher-edition',
        path: 'EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf',
        pageStart: 19,
        pageEnd: 29,
        note: 'Lesson 1 objective, concept development, problem set, exit ticket, and homework.'
      }
    ],
    vocabulary: ['equal groups', 'multiplication', 'multiply', 'repeated addition', 'unit form'],
    visualModels: ['equal-groups'],
    steps: [
      {
        id: 'lesson-focus',
        title: 'Start with the lesson goal',
        shortTitle: 'Goal',
        studentPrompt:
          'Start with equal groups and repeated addition. The multiplication symbol comes after the picture and words make sense.',
        teacherEditionBasis:
          'Lesson 1 objective: understand equal groups of as multiplication.',
        visualModel: 'equal-groups'
      },
      {
        id: 'skip-count',
        title: 'Count equal groups',
        shortTitle: 'Count',
        studentPrompt:
          'When every group has the same amount, you can count by the group size instead of counting one object at a time.',
        teacherEditionBasis:
          'Lesson 1 fluency and Problem 1 use group counting and skip-counting by twos to find totals.',
        visualModel: 'equal-groups'
      },
      {
        id: 'count-total',
        title: 'Use skip-counting to find the total',
        shortTitle: 'Total',
        studentPrompt:
          'The count lands on the total after every equal group has been counted.',
        teacherEditionBasis:
          'Lesson 1 Problem 1 asks students to skip-count volunteers by twos to find the total number of raised arms.',
        visualModel: 'equal-groups'
      },
      {
        id: 'make-groups',
        title: 'Make groups of 2',
        shortTitle: 'Make',
        studentPrompt:
          'Make equal groups and name how many groups there are and how many are in each group.',
        teacherEditionBasis:
          'Lesson 1 Problem 2 has students use 12 counters to make equal groups of two.',
        visualModel: 'equal-groups'
      },
      {
        id: 'name-groups',
        title: 'Name the groups in words',
        shortTitle: 'Name',
        studentPrompt:
          'Say the model in words before writing equations: 6 equal groups of 2 counters make 12 counters.',
        teacherEditionBasis:
          'Lesson 1 asks students to state 6 equal groups of 2 counters equal 12 counters.',
        visualModel: 'equal-groups'
      },
      {
        id: 'write-addition',
        title: 'Write repeated addition',
        shortTitle: 'Add',
        studentPrompt:
          'Each equal group becomes one addend in the repeated addition sentence.',
        teacherEditionBasis:
          'Lesson 1 connects 6 equal groups of 2 counters to 2 + 2 + 2 + 2 + 2 + 2 = 12.',
        visualModel: 'equal-groups'
      },
      {
        id: 'unit-form',
        title: 'Use unit form',
        shortTitle: 'Units',
        studentPrompt:
          'Unit form names how many equal units were counted: 6 twos make 12.',
        teacherEditionBasis:
          'Lesson 1 records 6 twos = 12 below the repeated addition sentence.',
        visualModel: 'equal-groups'
      },
      {
        id: 'multiplication-symbol',
        title: 'Use the multiplication symbol',
        shortTitle: 'Symbol',
        studentPrompt:
          'A multiplication sentence is a more efficient way to write equal groups.',
        teacherEditionBasis:
          'Lesson 1 records repeated addition, 6 twos = 12, and 6 x 2 = 12 as connected number sentences.',
        visualModel: 'equal-groups'
      },
      {
        id: 'equal-example',
        title: 'Check an equal-groups example',
        shortTitle: 'Example',
        studentPrompt:
          'When the groups are equal, the picture can match a multiplication sentence.',
        teacherEditionBasis:
          'Lesson 1 Problem 3 begins by showing equal groups and asking for repeated addition and multiplication sentences.',
        visualModel: 'equal-groups'
      },
      {
        id: 'unequal-check',
        title: 'Check a non-example',
        shortTitle: 'Check',
        studentPrompt:
          'Before multiplying, check whether every group has the same number of objects.',
        teacherEditionBasis:
          'Lesson 1 Problem 3 includes a non-example where the last group is not the same size.',
        visualModel: 'equal-groups'
      },
      {
        id: 'exit-addition',
        title: 'Exit check: repeated addition',
        shortTitle: 'Exit',
        studentPrompt:
          'Use a picture, repeated addition, and multiplication to show equal groups.',
        teacherEditionBasis:
          'Lesson 1 exit ticket asks students to write repeated addition and multiplication sentences and draw a matching picture.',
        visualModel: 'equal-groups'
      },
      {
        id: 'lesson-summary',
        title: 'Say the takeaway',
        shortTitle: 'Sum',
        studentPrompt:
          'Multiplication is a faster way to add equal groups. Always check the groups first.',
        teacherEditionBasis:
          'Lesson 1 debrief reviews equal groups, multiplication, multiply, repeated addition, unit form, and multiplication sentence.',
        visualModel: 'equal-groups'
      }
    ],
    summary: {
      takeaway: 'Multiplication is a faster way to add equal groups.',
      check: 'Ask: Are the groups equal? How many groups? How many in each group?'
    }
  }
];

const LESSON_OBJECTIVES: Record<string, string> = {
  'm1-l1': 'Understand equal groups of as multiplication.',
  'm1-l2': 'Relate multiplication to the array model.',
  'm1-l3': 'Interpret the meaning of factors: the size of the group or the number of groups.',
  'm1-l4': 'Understand the meaning of the unknown as the size of the group in division.',
  'm1-l5': 'Understand the meaning of the unknown as the number of groups in division.',
  'm1-l6': 'Interpret the unknown in division using the array model.',
  'm1-l7': 'Demonstrate the commutativity of multiplication, and practice related facts by skip-counting objects in array models.',
  'm1-l8': 'Demonstrate the commutativity of multiplication, and practice related facts by skip-counting objects in array models.',
  'm1-l9': 'Find related multiplication facts by adding and subtracting equal groups in array models.',
  'm1-l10': 'Model the distributive property with arrays to decompose units as a strategy to multiply.',
  'm1-l11': 'Model division as the unknown factor in multiplication using arrays and tape diagrams.',
  'm1-l12': 'Interpret the quotient as the number of groups or the number of objects in each group using units of 2.',
  'm1-l13': 'Interpret the quotient as the number of groups or the number of objects in each group using units of 3.',
  'm1-l14': 'Skip-count objects in models to build fluency with multiplication facts using units of 4.',
  'm1-l15': 'Relate arrays to tape diagrams to model the commutative property of multiplication.',
  'm1-l16': 'Use the distributive property as a strategy to find related multiplication facts.',
  'm1-l17': 'Model the relationship between multiplication and division.',
  'm1-l18': 'Apply the distributive property to decompose units.',
  'm1-l19': 'Apply the distributive property to decompose units.',
  'm1-l20': 'Solve two-step word problems involving multiplication and division, and assess the reasonableness of answers.',
  'm1-l21': 'Solve two-step word problems involving all four operations, and assess the reasonableness of answers.',

  'm2-l1': 'Explore time as a continuous measurement using a stopwatch.',
  'm2-l2': 'Relate skip-counting by fives on the clock and telling time to a continuous measurement model, the number line.',
  'm2-l3': 'Count by fives and ones on the number line as a strategy to tell time to the nearest minute on the clock.',
  'm2-l4': 'Solve word problems involving time intervals within 1 hour by counting backward and forward using the number line and clock.',
  'm2-l5': 'Solve word problems involving time intervals within 1 hour by adding and subtracting on the number line.',
  'm2-l6': 'Build and decompose a kilogram to reason about the size and weight of 1 kilogram, 100 grams, 10 grams, and 1 gram.',
  'm2-l7': 'Develop estimation strategies by reasoning about the weight in kilograms of a series of familiar objects to establish mental benchmark measures.',
  'm2-l8': 'Solve one-step word problems involving metric weights within 100 and estimate to reason about solutions.',
  'm2-l9': 'Decompose a liter to reason about the size of 1 liter, 100 milliliters, 10 milliliters, and 1 milliliter.',
  'm2-l10': 'Estimate and measure liquid volume in liters and milliliters using the vertical number line.',
  'm2-l11': 'Solve mixed word problems involving all four operations with grams, kilograms, liters, and milliliters given in the same units.',
  'm2-l12': 'Round two-digit measurements to the nearest ten on the vertical number line.',
  'm2-l13': 'Round two- and three-digit numbers to the nearest ten on the vertical number line.',
  'm2-l14': 'Round to the nearest hundred on the vertical number line.',
  'm2-l15': 'Add measurements using the standard algorithm to compose larger units once.',
  'm2-l16': 'Add measurements using the standard algorithm to compose larger units twice.',
  'm2-l17': 'Estimate sums by rounding and apply to solve measurement word problems.',
  'm2-l18': 'Decompose once to subtract measurements including three-digit minuends with zeros in the tens or ones place.',
  'm2-l19': 'Decompose twice to subtract measurements including three-digit minuends with zeros in the tens and ones places.',
  'm2-l20': 'Estimate differences by rounding and apply to solve measurement word problems.',
  'm2-l21': 'Estimate sums and differences of measurements by rounding, and then solve mixed word problems.',

  'm3-l1': 'Study commutativity to find known facts of 6, 7, 8, and 9.',
  'm3-l2': 'Apply the distributive and commutative properties to relate multiplication facts 5 x n + n to 6 x n and n x 6 where n is the size of the unit.',
  'm3-l3': 'Multiply and divide with familiar facts using a letter to represent the unknown.',
  'm3-l4': 'Count by units of 6 to multiply and divide using number bonds to decompose.',
  'm3-l5': 'Count by units of 7 to multiply and divide using number bonds to decompose.',
  'm3-l6': 'Use the distributive property as a strategy to multiply and divide using units of 6 and 7.',
  'm3-l7': 'Interpret the unknown in multiplication and division to model and solve problems using units of 6 and 7.',
  'm3-l8': 'Understand the function of parentheses and apply to solving problems.',
  'm3-l9': 'Model the associative property as a strategy to multiply.',
  'm3-l10': 'Use the distributive property as a strategy to multiply and divide.',
  'm3-l11': 'Interpret the unknown in multiplication and division to model and solve problems.',
  'm3-l12': 'Apply the distributive property and the fact 9 = 10 - 1 as a strategy to multiply.',
  'm3-l13': 'Identify and use arithmetic patterns to multiply.',
  'm3-l14': 'Identify and use arithmetic patterns to multiply.',
  'm3-l15': 'Interpret the unknown in multiplication and division to model and solve problems.',
  'm3-l16': 'Reason about and explain arithmetic patterns using units of 0 and 1 as they relate to multiplication and division.',
  'm3-l17': 'Identify patterns in multiplication and division facts using the multiplication table.',
  'm3-l18': 'Solve two-step word problems involving all four operations and assess the reasonableness of solutions.',
  'm3-l19': 'Multiply by multiples of 10 using the place value chart.',
  'm3-l20': 'Use place value strategies and the associative property n x (m x 10) = (n x m) x 10 to multiply by multiples of 10.',
  'm3-l21': 'Solve two-step word problems involving multiplying single-digit factors and multiples of 10.',

  'm4-l1': 'Understand area as an attribute of plane figures.',
  'm4-l2': 'Decompose and recompose shapes to compare areas.',
  'm4-l3': 'Model tiling with centimeter and inch unit squares as a strategy to measure area.',
  'm4-l4': 'Relate side lengths with the number of tiles on a side.',
  'm4-l5': 'Form rectangles by tiling with unit squares to make arrays.',
  'm4-l6': 'Draw rows and columns to determine the area of a rectangle given an incomplete array.',
  'm4-l7': 'Interpret area models to form rectangular arrays.',
  'm4-l8': 'Find the area of a rectangle through multiplication of the side lengths.',
  'm4-l9': 'Analyze different rectangles and reason about their area.',
  'm4-l10': 'Apply the distributive property as a strategy to find the total area of a large rectangle by adding two products.',
  'm4-l11': 'Demonstrate the possible whole number side lengths of rectangles with areas of 24, 36, 48, or 72 square units using the associative property.',
  'm4-l12': 'Solve word problems involving area.',
  'm4-l13': 'Find areas by decomposing into rectangles or completing composite figures to form rectangles.',
  'm4-l14': 'Find areas by decomposing into rectangles or completing composite figures to form rectangles.',
  'm4-l15': 'Apply knowledge of area to determine areas of rooms in a given floor plan.',
  'm4-l16': 'Apply knowledge of area to determine areas of rooms in a given floor plan.',

  'm5-l1': 'Specify and partition a whole into equal parts, identifying and counting unit fractions using concrete models.',
  'm5-l2': 'Specify and partition a whole into equal parts, identifying and counting unit fractions by folding fraction strips.',
  'm5-l3': 'Specify and partition a whole into equal parts, identifying and counting unit fractions by drawing pictorial area models.',
  'm5-l4': 'Represent and identify fractional parts of different wholes.',
  'm5-l5': 'Partition a whole into equal parts and define the equal parts to identify the unit fraction numerically.',
  'm5-l6': 'Build non-unit fractions less than one whole from unit fractions.',
  'm5-l7': 'Identify and represent shaded and non-shaded parts of one whole as fractions.',
  'm5-l8': 'Represent parts of one whole as fractions with number bonds.',
  'm5-l9': 'Build and write fractions greater than one whole using unit fractions.',
  'm5-l10': 'Compare unit fractions by reasoning about their size using fraction strips.',
  'm5-l11': 'Compare unit fractions with different-sized models representing the whole.',
  'm5-l12': 'Specify the corresponding whole when presented with one equal part.',
  'm5-l13': 'Identify a shaded fractional part in different ways depending on the designation of the whole.',
  'm5-l14': 'Place fractions on a number line with endpoints 0 and 1.',
  'm5-l15': 'Place any fraction on a number line with endpoints 0 and 1.',
  'm5-l16': 'Place whole number fractions and fractions between whole numbers on the number line.',
  'm5-l17': 'Practice placing various fractions on the number line.',
  'm5-l18': 'Compare fractions and whole numbers on the number line by reasoning about their distance from 0.',
  'm5-l19': 'Understand distance and position on the number line as strategies for comparing fractions.',
  'm5-l20': 'Recognize and show that equivalent fractions have the same size, though not necessarily the same shape.',
  'm5-l21': 'Recognize and show that equivalent fractions refer to the same point on the number line.',
  'm5-l22': 'Generate simple equivalent fractions by using visual fraction models and the number line.',
  'm5-l23': 'Generate simple equivalent fractions by using visual fraction models and the number line.',
  'm5-l24': 'Express whole numbers as fractions and recognize equivalence with different units.',
  'm5-l25': 'Express whole number fractions on the number line when the unit interval is 1.',
  'm5-l26': 'Decompose whole number fractions greater than 1 using whole number equivalence with various models.',
  'm5-l27': 'Explain equivalence by manipulating units and reasoning about their size.',
  'm5-l28': 'Compare fractions with the same numerator pictorially.',
  'm5-l29': 'Compare fractions with the same numerator using <, >, or =, and use a model to reason about their size.',
  'm5-l30': 'Partition various wholes precisely into equal parts using a number line method.',

  'm6-l1': 'Generate and organize data.',
  'm6-l2': 'Rotate tape diagrams vertically.',
  'm6-l3': 'Create scaled bar graphs.',
  'm6-l4': 'Solve one- and two-step problems involving graphs.',
  'm6-l5': 'Create ruler with 1-inch, 1/2-inch, and 1/4-inch intervals, and generate measurement data.',
  'm6-l6': 'Interpret measurement data from various line plots.',
  'm6-l7': 'Represent measurement data with line plots.',
  'm6-l8': 'Represent measurement data with line plots.',
  'm6-l9': 'Analyze data to problem solve.',

  'm7-l1': 'Solve word problems in varied contexts using a letter to represent the unknown.',
  'm7-l2': 'Solve word problems in varied contexts using a letter to represent the unknown.',
  'm7-l3': 'Share and critique peer solution strategies to varied word problems.',
  'm7-l4': 'Compare and classify quadrilaterals.',
  'm7-l5': 'Compare and classify other polygons.',
  'm7-l6': 'Draw polygons with specified attributes to solve problems.',
  'm7-l7': 'Reason about composing and decomposing polygons using tetrominoes.',
  'm7-l8': 'Create a tangram puzzle and observe relationships among the shapes.',
  'm7-l9': 'Reason about composing and decomposing polygons using tangrams.',
  'm7-l10': 'Decompose quadrilaterals to understand perimeter as the boundary of a shape.',
  'm7-l11': 'Tessellate to understand perimeter as the boundary of a shape.',
  'm7-l12': 'Measure side lengths in whole number units to determine the perimeter of polygons.',
  'm7-l13': 'Explore perimeter as an attribute of plane figures and solve problems.',
  'm7-l14': 'Determine the perimeter of regular polygons and rectangles when whole number measurements are unknown.',
  'm7-l15': 'Solve word problems to determine perimeter with given side lengths.',
  'm7-l16': 'Use string to measure the perimeter of various circles to the nearest quarter inch.',
  'm7-l17': 'Use all four operations to solve problems involving perimeter and unknown measurements.',
  'm7-l18': 'Construct rectangles from a given number of unit squares and determine the perimeters.',
  'm7-l19': 'Use a line plot to record the number of rectangles constructed from a given number of unit squares.',
  'm7-l20': 'Construct rectangles with a given perimeter using unit squares and determine their areas.',
  'm7-l21': 'Construct rectangles with a given perimeter using unit squares and determine their areas.',
  'm7-l22': 'Use a line plot to record the number of rectangles constructed in Lessons 20 and 21.',
  'm7-l23': 'Solve a variety of word problems with perimeter.',
  'm7-l24': 'Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.',
  'm7-l25': 'Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.',
  'm7-l26': 'Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.',
  'm7-l27': 'Use rectangles to draw a robot with specified perimeter measurements, and reason about the different areas that may be produced.',
  'm7-l28': 'Solve a variety of word problems involving area and perimeter using all four operations.',
  'm7-l29': 'Solve a variety of word problems involving area and perimeter using all four operations.',
  'm7-l30': 'Share and critique peer strategies for problem solving.',
  'm7-l31': 'Explore and create unconventional representations of one-half.',
  'm7-l32': 'Explore and create unconventional representations of one-half.',
  'm7-l33': 'Solidify fluency with Grade 3 skills.',
  'm7-l34': 'Create resource booklets to support fluency with Grade 3 skills.'
};

const OVERVIEW_PAGE_RANGES: Record<string, { pageStart: number; pageEnd: number }> = {
  m1: { pageStart: 6, pageEnd: 7 },
  m2: { pageStart: 5, pageEnd: 6 },
  m3: { pageStart: 7, pageEnd: 8 },
  m4: { pageStart: 5, pageEnd: 6 },
  m5: { pageStart: 5, pageEnd: 7 },
  m6: { pageStart: 4, pageEnd: 4 },
  m7: { pageStart: 8, pageEnd: 9 }
};

function findTopic(module: ModuleMeta, lessonId: string) {
  return module.topics.find((topic) => topic.lessonIds.includes(lessonId));
}

function generatedLesson(module: ModuleMeta, lessonNumber: number): LessonContent | undefined {
  const lessonId = `${module.id}-l${lessonNumber}`;
  const objective = LESSON_OBJECTIVES[lessonId];
  const topic = findTopic(module, lessonId);

  if (!objective || !topic) {
    return undefined;
  }

  const overviewPages = OVERVIEW_PAGE_RANGES[module.id] ?? { pageStart: 1, pageEnd: 1 };
  const visualModel = module.visualModels[0] ?? 'equal-groups';

  return {
    id: lessonId,
    moduleId: module.id,
    topicId: topic.id,
    lessonNumber,
    title: objective.replace(/\.$/, ''),
    objective,
    studentGoal: `I can work toward this Eureka Math objective: ${objective}`,
    sourceRefs: [
      {
        sourceType: 'teacher-edition',
        path: module.sourcePdf,
        pageStart: overviewPages.pageStart,
        pageEnd: overviewPages.pageEnd,
        note: 'Objective sourced from the module overview table. Lesson-specific deep authoring should use the full lesson pages next.'
      }
    ],
    vocabulary: [topic.label, topic.title],
    visualModels: module.visualModels,
    steps: [
      {
        id: 'source-objective',
        title: 'Read the Eureka objective',
        shortTitle: 'Goal',
        studentPrompt: objective,
        teacherEditionBasis: `${topic.label}: ${topic.title}. Objective from the teacher-edition module overview table.`,
        visualModel
      },
      {
        id: 'model-the-idea',
        title: 'Choose the lesson model',
        shortTitle: 'Model',
        studentPrompt: `Use the module model for this objective: ${module.visualModels.join(', ')}.`,
        teacherEditionBasis: `The module overview names the tools and representations used across ${module.title}.`,
        visualModel
      },
      {
        id: 'connect-representations',
        title: 'Connect words, model, and equation',
        shortTitle: 'Connect',
        studentPrompt: 'Say what the model shows, then connect it to the lesson objective.',
        teacherEditionBasis: 'Eureka lessons move between concrete or pictorial models, words, and equations.',
        visualModel
      },
      {
        id: 'lesson-check',
        title: 'Check your explanation',
        shortTitle: 'Check',
        studentPrompt: 'Explain the objective using the visual model and the lesson words.',
        teacherEditionBasis: 'The check is aligned to the stated teacher-edition objective, not an added outside skill.',
        visualModel
      }
    ],
    summary: {
      takeaway: objective,
      check: 'Can you explain the lesson objective using the model shown on this page?'
    }
  };
}

export function findModule(moduleId: string): ModuleMeta | undefined {
  return MODULES.find((module) => module.id === moduleId);
}

export function findLesson(moduleId: string, lessonNumber: number): LessonContent | undefined {
  const authored = LESSONS.find((lesson) => lesson.moduleId === moduleId && lesson.lessonNumber === lessonNumber);
  if (authored) {
    return authored;
  }
  const module = findModule(moduleId);
  return module ? generatedLesson(module, lessonNumber) : undefined;
}

export function lessonTitle(moduleId: string, lessonId: string): string {
  const lesson = LESSONS.find((item) => item.moduleId === moduleId && item.id === lessonId);
  if (lesson) {
    return `Lesson ${lesson.lessonNumber}: ${lesson.title}`;
  }
  const objective = LESSON_OBJECTIVES[lessonId];
  const numberMatch = lessonId.match(/l(\d+)$/);
  if (numberMatch && objective) {
    return `Lesson ${numberMatch[1]}: ${objective.replace(/\.$/, '')}`;
  }
  return numberMatch ? `Lesson ${numberMatch[1]}` : 'Lesson';
}
