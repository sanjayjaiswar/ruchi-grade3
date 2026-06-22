import { LessonContent, ModuleMeta } from './curriculum.types';
import { LESSON_SOURCE_NOTES } from './lesson-source-notes.generated';

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

const MODULE_1_PDF = 'EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf';

type Module1LessonSeed = {
  lessonNumber: number;
  topicId: string;
  pageStart: number;
  pageEnd: number;
  title: string;
  objective: string;
  goal: string;
  vocabulary: string[];
  visualModels: LessonContent['visualModels'];
  modelFocus: string;
  concept: string;
  example: string;
  teacherMove: string;
  check: string;
};

function module1SourceLesson(seed: Module1LessonSeed): LessonContent {
  return {
    id: `m1-l${seed.lessonNumber}`,
    moduleId: 'm1',
    topicId: seed.topicId,
    lessonNumber: seed.lessonNumber,
    title: seed.title,
    objective: seed.objective,
    studentGoal: seed.goal,
    sourceRefs: [
      {
        sourceType: 'teacher-edition',
        path: MODULE_1_PDF,
        pageStart: seed.pageStart,
        pageEnd: seed.pageEnd,
        note: `Lesson ${seed.lessonNumber} objective, concept development, problem set, exit ticket, and homework.`
      }
    ],
    vocabulary: seed.vocabulary,
    visualModels: seed.visualModels,
    steps: [
      {
        id: 'source-goal',
        title: 'Start with the lesson idea',
        shortTitle: 'Goal',
        studentPrompt: seed.goal,
        teacherEditionBasis: `Lesson ${seed.lessonNumber} objective: ${seed.objective}`,
        visualModel: seed.visualModels[0]
      },
      {
        id: 'source-model',
        title: 'Use the lesson model',
        shortTitle: 'Model',
        studentPrompt: seed.modelFocus,
        teacherEditionBasis: seed.concept,
        visualModel: seed.visualModels[0]
      },
      {
        id: 'source-meaning',
        title: 'Name what each part means',
        shortTitle: 'Meaning',
        studentPrompt: seed.concept,
        teacherEditionBasis: 'Ask the student to name what the visual parts, quantities, and unknown represent before solving.',
        visualModel: seed.visualModels[0]
      },
      {
        id: 'source-picture',
        title: 'Read the picture',
        shortTitle: 'Picture',
        studentPrompt: seed.example,
        teacherEditionBasis: seed.teacherMove,
        visualModel: seed.visualModels[0]
      },
      {
        id: 'source-draw',
        title: 'Draw or label the model',
        shortTitle: 'Draw',
        studentPrompt: seed.modelFocus,
        teacherEditionBasis: 'Have the student draw, label, or point to the model before writing the equation or final answer.',
        visualModel: seed.visualModels[0]
      },
      {
        id: 'source-exit',
        title: 'Exit check',
        shortTitle: 'Exit',
        studentPrompt: seed.check,
        teacherEditionBasis:
          'Use this as the teacher-led check before moving to the lesson problem set or exit ticket.',
        visualModel: seed.visualModels[0]
      },
      {
        id: 'source-summary',
        title: 'Say the takeaway',
        shortTitle: 'Sum',
        studentPrompt: seed.check,
        teacherEditionBasis:
          'The summary is a concise teacher-facing restatement of the lesson target from the inspected lesson pages.',
        visualModel: seed.visualModels[0]
      }
    ],
    summary: {
      takeaway: seed.check,
      check: seed.teacherMove
    }
  };
}

const MODULE_1_SOURCE_LESSONS: LessonContent[] = [
  module1SourceLesson({
    lessonNumber: 2,
    topicId: 'm1-ta',
    pageStart: 34,
    pageEnd: 48,
    title: 'Relate Multiplication to Arrays',
    objective: 'Relate multiplication to the array model.',
    goal: 'I can use rows and columns in an array to show equal groups and write a multiplication sentence.',
    vocabulary: ['array', 'row', 'column', 'equal groups', 'multiplication'],
    visualModels: ['array'],
    modelFocus: 'Use an array to show equal rows. The number of rows is one factor, and the number in each row is the other factor.',
    concept: 'Lesson 2 develops multiplication through rows and columns in the array model.',
    example: 'Ask: How many rows? How many in each row? Then write the multiplication sentence for the total.',
    teacherMove: 'Point to rows first, then columns or objects in each row. Keep the factor meanings tied to the picture.',
    check: 'The student should explain that an array is equal rows and that the factors describe rows and row size.'
  }),
  module1SourceLesson({
    lessonNumber: 3,
    topicId: 'm1-ta',
    pageStart: 49,
    pageEnd: 60,
    title: 'Interpret the Meaning of Factors',
    objective: 'Interpret the meaning of factors: the size of the group or the number of groups.',
    goal: 'I can tell whether a factor means the number of groups or the size of each group.',
    vocabulary: ['factor', 'number of groups', 'size of group', 'array', 'number bond'],
    visualModels: ['array', 'equal-groups'],
    modelFocus: 'Use pictures and arrays to identify which factor counts groups and which factor tells the size of each group.',
    concept: 'Lesson 3 focuses on interpreting factors, not only finding products.',
    example: 'Ask what each factor means before solving. For an array, the first factor can represent rows and the second factor the size of each row.',
    teacherMove: 'Require a sentence such as, "The 4 means 4 groups, and the 2 means 2 in each group."',
    check: 'The student should name both factor meanings before giving the product.'
  }),
  module1SourceLesson({
    lessonNumber: 7,
    topicId: 'm1-tc',
    pageStart: 97,
    pageEnd: 108,
    title: 'Use Arrays to Show Commutativity',
    objective: 'Demonstrate the commutativity of multiplication, and practice related facts by skip-counting objects in array models.',
    goal: 'I can rotate or read an array two ways to show related multiplication facts.',
    vocabulary: ['array', 'commutative property', 'related facts', 'row', 'column'],
    visualModels: ['array'],
    modelFocus: 'Use one array to see two multiplication facts by reading rows first, then columns first.',
    concept: 'Lesson 7 begins Topic C by using arrays and skip-counting to show commutativity.',
    example: 'Ask the student to write one multiplication sentence for rows, then a second sentence for columns.',
    teacherMove: 'Keep the total fixed. Only the order of the factors changes.',
    check: 'The student should explain that 2 times 8 and 8 times 2 have the same total because they describe the same array.'
  }),
  module1SourceLesson({
    lessonNumber: 8,
    topicId: 'm1-tc',
    pageStart: 109,
    pageEnd: 118,
    title: 'Practice Related Facts with Arrays',
    objective: 'Demonstrate the commutativity of multiplication, and practice related facts by skip-counting objects in array models.',
    goal: 'I can use arrays and skip-counting to practice related multiplication facts.',
    vocabulary: ['array', 'commutative property', 'skip-count', 'related facts'],
    visualModels: ['array'],
    modelFocus: 'Use arrays with units of 3 to connect facts such as 5 threes and 3 fives.',
    concept: 'Lesson 8 continues the array and commutativity work with practice using units of 3.',
    example: 'Ask the student to draw or read a related array pair, then write both multiplication sentences.',
    teacherMove: 'Have the student skip-count by the unit before writing the product.',
    check: 'The student should connect the two related facts to the same total and explain the factor order.'
  }),
  module1SourceLesson({
    lessonNumber: 9,
    topicId: 'm1-tc',
    pageStart: 119,
    pageEnd: 130,
    title: 'Find Related Facts by Adding and Subtracting Groups',
    objective: 'Find related multiplication facts by adding and subtracting equal groups in array models.',
    goal: 'I can use a known multiplication fact and add or subtract one equal group to find a related fact.',
    vocabulary: ['array', 'related facts', 'equal groups', 'add a group', 'subtract a group'],
    visualModels: ['array'],
    modelFocus: 'Use an array to see how adding or removing a row changes the total by one equal group.',
    concept: 'Lesson 9 uses arrays to relate nearby multiplication facts by adding or subtracting equal groups.',
    example: 'Ask: If I know 5 threes, how can I find 6 threes? Add one more group of 3.',
    teacherMove: 'Keep attention on the added or removed group, not recounting every object by ones.',
    check: 'The student should use a known fact plus or minus one equal group to find the new fact.'
  }),
  module1SourceLesson({
    lessonNumber: 10,
    topicId: 'm1-tc',
    pageStart: 131,
    pageEnd: 141,
    title: 'Use the Distributive Property with Arrays',
    objective: 'Model the distributive property with arrays to decompose units as a strategy to multiply.',
    goal: 'I can break an array into two smaller arrays and add the products to find the total.',
    vocabulary: ['distributive property', 'array', 'decompose', 'unit', 'product'],
    visualModels: ['array'],
    modelFocus: 'Split one array into two known parts, then add the two smaller products.',
    concept: 'Lesson 10 introduces decomposing arrays as a multiplication strategy.',
    example: 'Ask the student to break a larger array into two easier arrays and write an addition sentence for the partial products.',
    teacherMove: 'Emphasize that the split changes the strategy, not the total array.',
    check: 'The student should explain the whole product as the sum of two smaller products.'
  }),
  module1SourceLesson({
    lessonNumber: 11,
    topicId: 'm1-td',
    pageStart: 151,
    pageEnd: 161,
    title: 'Model Division as an Unknown Factor',
    objective: 'Model division as the unknown factor in multiplication using arrays and tape diagrams.',
    goal: 'I can connect a division equation to a related multiplication equation with an unknown factor.',
    vocabulary: ['division', 'unknown factor', 'array', 'tape diagram', 'quotient'],
    visualModels: ['array', 'tape-diagram'],
    modelFocus: 'Use arrays and tape diagrams to show that division finds a missing factor.',
    concept: 'Lesson 11 starts Topic D by connecting division, arrays, tape diagrams, and unknown factors.',
    example: 'Ask what multiplication equation matches the division situation, then solve the missing factor.',
    teacherMove: 'Move between the array, tape diagram, division sentence, and multiplication sentence.',
    check: 'The student should state the related multiplication equation for a division problem.'
  }),
  module1SourceLesson({
    lessonNumber: 12,
    topicId: 'm1-td',
    pageStart: 162,
    pageEnd: 173,
    title: 'Interpret Quotients with Units of 2',
    objective: 'Interpret the quotient as the number of groups or the number of objects in each group using units of 2.',
    goal: 'I can tell whether a quotient means number of groups or number in each group when working with twos.',
    vocabulary: ['quotient', 'units of 2', 'number of groups', 'size of group', 'division'],
    visualModels: ['array', 'tape-diagram'],
    modelFocus: 'Use units of 2 to decide what the quotient represents in each division situation.',
    concept: 'Lesson 12 focuses on interpreting quotients using units of 2.',
    example: 'Ask: Does the answer tell how many groups of 2, or how many objects in each group?',
    teacherMove: 'Make the student name the meaning of the quotient after solving.',
    check: 'The student should solve and interpret the quotient in words.'
  }),
  module1SourceLesson({
    lessonNumber: 13,
    topicId: 'm1-td',
    pageStart: 174,
    pageEnd: 185,
    title: 'Interpret Quotients with Units of 3',
    objective: 'Interpret the quotient as the number of groups or the number of objects in each group using units of 3.',
    goal: 'I can tell whether a quotient means number of groups or number in each group when working with threes.',
    vocabulary: ['quotient', 'units of 3', 'number of groups', 'size of group', 'division'],
    visualModels: ['array', 'tape-diagram'],
    modelFocus: 'Use units of 3 to connect division situations to quotient meanings.',
    concept: 'Lesson 13 extends quotient interpretation from units of 2 to units of 3.',
    example: 'Ask the student to solve with threes and then say what the quotient represents.',
    teacherMove: 'Do not accept a number alone; require the meaning of the quotient.',
    check: 'The student should distinguish between groups of 3 and 3 groups.'
  }),
  module1SourceLesson({
    lessonNumber: 14,
    topicId: 'm1-te',
    pageStart: 188,
    pageEnd: 199,
    title: 'Build Fluency with Units of 4',
    objective: 'Skip-count objects in models to build fluency with multiplication facts using units of 4.',
    goal: 'I can skip-count by fours in a model to build multiplication facts.',
    vocabulary: ['skip-count', 'units of 4', 'array', 'multiplication fact'],
    visualModels: ['array', 'equal-groups'],
    modelFocus: 'Use models with groups of 4 and count 4, 8, 12, 16, and so on.',
    concept: 'Lesson 14 builds fluency with multiplication facts using units of 4.',
    example: 'Ask the student to count the groups of 4 and write the matching multiplication fact.',
    teacherMove: 'Have the student track both the count-by total and the number of groups counted.',
    check: 'The student should use skip-counting by 4 to find a product and name the fact.'
  }),
  module1SourceLesson({
    lessonNumber: 15,
    topicId: 'm1-te',
    pageStart: 200,
    pageEnd: 209,
    title: 'Relate Arrays to Tape Diagrams',
    objective: 'Relate arrays to tape diagrams to model the commutative property of multiplication.',
    goal: 'I can show the same multiplication fact with an array and a tape diagram.',
    vocabulary: ['array', 'tape diagram', 'commutative property', 'factor'],
    visualModels: ['array', 'tape-diagram'],
    modelFocus: 'Use an array and a tape diagram to show related facts with the same total.',
    concept: 'Lesson 15 connects arrays and tape diagrams while modeling commutativity.',
    example: 'Ask the student to read the same model as rows and as equal tape parts.',
    teacherMove: 'Point out how the same total can be represented in two different models.',
    check: 'The student should match an array, tape diagram, and related multiplication equations.'
  }),
  module1SourceLesson({
    lessonNumber: 16,
    topicId: 'm1-te',
    pageStart: 210,
    pageEnd: 220,
    title: 'Use the Distributive Property for Related Facts',
    objective: 'Use the distributive property as a strategy to find related multiplication facts.',
    goal: 'I can break a multiplication fact into known facts and add the parts.',
    vocabulary: ['distributive property', 'related facts', 'decompose', 'array'],
    visualModels: ['array'],
    modelFocus: 'Decompose one factor to create easier related facts.',
    concept: 'Lesson 16 uses the distributive property to find related multiplication facts.',
    example: 'Ask how a difficult fact can be split into two known facts, then add the products.',
    teacherMove: 'Keep the decomposition visible in the model or equation.',
    check: 'The student should explain the original fact as two smaller facts added together.'
  }),
  module1SourceLesson({
    lessonNumber: 17,
    topicId: 'm1-te',
    pageStart: 221,
    pageEnd: 231,
    title: 'Model the Relationship Between Multiplication and Division',
    objective: 'Model the relationship between multiplication and division.',
    goal: 'I can use related multiplication and division equations to describe the same model.',
    vocabulary: ['multiplication', 'division', 'related facts', 'quotient', 'factor'],
    visualModels: ['array', 'tape-diagram'],
    modelFocus: 'Use one model to write related multiplication and division facts.',
    concept: 'Lesson 17 explicitly models the relationship between multiplication and division.',
    example: 'Ask the student to write a multiplication equation and a related division equation from the same model.',
    teacherMove: 'Keep the factor, product, divisor, and quotient meanings tied to the picture.',
    check: 'The student should explain how multiplication and division undo or relate to each other in the model.'
  }),
  module1SourceLesson({
    lessonNumber: 18,
    topicId: 'm1-tf',
    pageStart: 234,
    pageEnd: 244,
    title: 'Decompose Units with the Distributive Property',
    objective: 'Apply the distributive property to decompose units.',
    goal: 'I can decompose a multiplication problem into easier units and combine the parts.',
    vocabulary: ['distributive property', 'decompose', 'unit', 'array', 'number bond'],
    visualModels: ['array'],
    modelFocus: 'Break a unit into friendlier parts and use the distributive property.',
    concept: 'Lesson 18 begins Topic F with applying the distributive property to decompose units.',
    example: 'Ask the student to split one factor, solve the two smaller products, and add them.',
    teacherMove: 'Use number bonds or array splits to show the decomposition.',
    check: 'The student should show the original product as the sum of decomposed products.'
  }),
  module1SourceLesson({
    lessonNumber: 19,
    topicId: 'm1-tf',
    pageStart: 245,
    pageEnd: 254,
    title: 'Continue Decomposing Units',
    objective: 'Apply the distributive property to decompose units.',
    goal: 'I can choose a useful decomposition and use it to solve multiplication facts.',
    vocabulary: ['distributive property', 'decompose', 'related facts', 'array'],
    visualModels: ['array'],
    modelFocus: 'Use the distributive property again, now choosing decompositions more flexibly.',
    concept: 'Lesson 19 continues applying decomposition strategies from Lesson 18.',
    example: 'Ask which known facts can help solve the new fact, then write the decomposed equation.',
    teacherMove: 'Have the student justify why the chosen split helps.',
    check: 'The student should choose a decomposition and combine partial products correctly.'
  }),
  module1SourceLesson({
    lessonNumber: 20,
    topicId: 'm1-tf',
    pageStart: 255,
    pageEnd: 266,
    title: 'Solve Two-Step Multiplication and Division Word Problems',
    objective: 'Solve two-step word problems involving multiplication and division, and assess the reasonableness of answers.',
    goal: 'I can solve a two-step word problem with multiplication or division and check whether my answer makes sense.',
    vocabulary: ['two-step problem', 'multiplication', 'division', 'reasonableness', 'read-draw-write'],
    visualModels: ['tape-diagram', 'array'],
    modelFocus: 'Use Read-Draw-Write, tape diagrams, or arrays to organize a two-step problem.',
    concept: 'Lesson 20 applies multiplication and division to two-step word problems and reasonableness checks.',
    example: 'Ask the student to identify step 1, solve it, then use that result in step 2.',
    teacherMove: 'Require a reasonableness check after the calculation.',
    check: 'The student should explain both steps and why the final answer is reasonable.'
  }),
  module1SourceLesson({
    lessonNumber: 21,
    topicId: 'm1-tf',
    pageStart: 267,
    pageEnd: 276,
    title: 'Solve Two-Step Word Problems with All Four Operations',
    objective: 'Solve two-step word problems involving all four operations, and assess the reasonableness of answers.',
    goal: 'I can solve two-step word problems using any operation and check that my answer makes sense.',
    vocabulary: ['two-step problem', 'all four operations', 'reasonableness', 'read-draw-write'],
    visualModels: ['tape-diagram', 'array'],
    modelFocus: 'Use the problem context to decide which operation each step needs.',
    concept: 'Lesson 21 extends two-step problem solving to all four operations.',
    example: 'Ask the student to read, draw, choose operations for each step, write equations, and check the answer.',
    teacherMove: 'Focus on operation choice and reasonableness, not only computation.',
    check: 'The student should solve with two equations and defend why the operations match the story.'
  })
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
        pageStart: 23,
        pageEnd: 33,
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
  },
  {
    id: 'm1-l4',
    moduleId: 'm1',
    topicId: 'm1-tb',
    lessonNumber: 4,
    title: 'Find the Size of the Group in Division',
    objective: 'Understand the meaning of the unknown as the size of the group in division.',
    studentGoal:
      'I can divide when I know the total and the number of equal groups, then explain that the answer is the size of each group.',
    sourceRefs: [
      {
        sourceType: 'teacher-edition',
        path: 'EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf',
        pageStart: 63,
        pageEnd: 74,
        note: 'Lesson 4 objective, fair-share concept development, pictorial division comparison, problem set, exit ticket, and homework.'
      }
    ],
    vocabulary: ['division', 'divided by', 'unknown factor', 'size of the group', 'equal groups'],
    visualModels: ['equal-groups', 'array'],
    steps: [
      {
        id: 'l4-goal',
        title: 'Know what the unknown means',
        shortTitle: 'Goal',
        studentPrompt:
          'In this lesson, the total is known and the number of equal groups is known. The unknown tells how many are in each group.',
        teacherEditionBasis:
          'Lesson 4 objective and Concept Development focus on division where the answer represents the size of each group.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l4-fair-share',
        title: 'Share 18 markers into 2 equal groups',
        shortTitle: 'Share',
        studentPrompt:
          'Use the fair-share model: 18 markers are divided into 2 equal groups. Find how many markers are in each group.',
        teacherEditionBasis:
          'Lesson 4 Concept Development begins with 18 counters divided into 2 equal groups to find 9 in each group.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l4-equation-meaning',
        title: 'Read the division sentence',
        shortTitle: 'Meaning',
        studentPrompt:
          'In 18 divided by 2 equals 9, name what each number means before thinking about the answer.',
        teacherEditionBasis:
          'Lesson 4 records 18 divided by 2 equals 9 and asks students to identify the total, number of equal groups, and unknown factor.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l4-sticker-picture',
        title: 'Choose the sentence that answers group size',
        shortTitle: 'Picture',
        studentPrompt:
          'Diana has 12 stickers in 3 equal groups. Choose the division sentence where the answer tells the size of each group.',
        teacherEditionBasis:
          'Lesson 4 compares 12 divided by 3 equals 4 and 12 divided by 4 equals 3 so students distinguish group size from number of groups.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l4-draw-equation',
        title: 'Use a picture for 8 divided by 4',
        shortTitle: 'Draw',
        studentPrompt:
          'If 8 is the total and 4 is the number of equal groups, use the picture to find the size of each group.',
        teacherEditionBasis:
          'Lesson 4 moves from abstract equation to pictorial representation with 8 divided by 4 equals unknown and repeats with 10 divided by 2.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l4-exit-check',
        title: 'Exit check: size of each group',
        shortTitle: 'Exit',
        studentPrompt:
          'Complete the Lesson 4 exit-style checks. Both answers should tell how many are in each group.',
        teacherEditionBasis:
          'Lesson 4 Exit Ticket asks students to draw 16 glue sticks divided into 4 equal groups and solve 15 divided by 3.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l4-summary',
        title: 'Say the Lesson 4 takeaway',
        shortTitle: 'Sum',
        studentPrompt:
          'When the total and number of equal groups are known, division can find the size of each group.',
        teacherEditionBasis:
          'Lesson 4 debrief asks students to compare multiplication and division and use vocabulary such as unknown factor and divided by.',
        visualModel: 'equal-groups'
      }
    ],
    summary: {
      takeaway:
        'Division can find the size of each group when the total and number of equal groups are known.',
      check: 'Ask: What is the total? How many equal groups? What does the answer represent?'
    }
  },
  {
    id: 'm1-l5',
    moduleId: 'm1',
    topicId: 'm1-tb',
    lessonNumber: 5,
    title: 'Find the Number of Groups in Division',
    objective: 'Understand the meaning of the unknown as the number of groups in division.',
    studentGoal:
      'I can divide when I know the total and the size of each group, then explain that the answer is the number of groups.',
    sourceRefs: [
      {
        sourceType: 'teacher-edition',
        path: 'EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf',
        pageStart: 75,
        pageEnd: 84,
        note: 'Lesson 5 objective, group-making concept development, count-by strategy, problem set, exit ticket, and homework.'
      }
    ],
    vocabulary: ['division', 'divided by', 'unknown factor', 'number of groups', 'size of the group'],
    visualModels: ['equal-groups', 'array'],
    steps: [
      {
        id: 'l5-goal',
        title: 'Know what the unknown means now',
        shortTitle: 'Goal',
        studentPrompt:
          'In this lesson, the total is known and the size of each group is known. The unknown tells how many groups there are.',
        teacherEditionBasis:
          'Lesson 5 objective and Concept Development focus on division where the answer represents the number of groups.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l5-make-groups',
        title: 'Make groups of 6 from 18 people',
        shortTitle: 'Group',
        studentPrompt:
          'Cynthia has 18 people coming. Each table seats 6 people. Find how many tables, or groups, she needs.',
        teacherEditionBasis:
          'Lesson 5 Problem 1 uses 18 counters grouped by 6 to find 3 groups, represented by 18 divided by 6 equals 3.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l5-meaning',
        title: 'Name what the answer means',
        shortTitle: 'Meaning',
        studentPrompt:
          'In 18 divided by 6 equals 3, decide whether the 3 means group size or number of groups.',
        teacherEditionBasis:
          'Lesson 5 compares the bracelet problem from Lesson 4 with the table problem so students see the unknown changes.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l5-count-by',
        title: 'Use count-by to find groups',
        shortTitle: 'Count',
        studentPrompt:
          'Cynthia buys 15 burgers. Each pack has 3 burgers. Count by 3s until 15 to find the number of packs.',
        teacherEditionBasis:
          'Lesson 5 Problem 2 connects finding the number of groups to counting by the divisor: 3, 6, 9, 12, 15.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l5-picture',
        title: 'Read the group picture',
        shortTitle: 'Picture',
        studentPrompt:
          'Use the picture to confirm that the total is split into groups of the known size. The answer counts how many groups were made.',
        teacherEditionBasis:
          'Lesson 5 repeatedly asks students to distinguish the given group size from the unknown number of groups using counters and drawings.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l5-exit-check',
        title: 'Exit check: number of groups',
        shortTitle: 'Exit',
        studentPrompt:
          'Complete the Lesson 5 exit-style checks. Both answers should tell the number of groups.',
        teacherEditionBasis:
          'Lesson 5 Exit Ticket asks students to divide 12 triangles into groups of 6 and use a count-by for 20 strawberries with 5 per smoothie.',
        visualModel: 'equal-groups'
      },
      {
        id: 'l5-summary',
        title: 'Say the Lesson 5 takeaway',
        shortTitle: 'Sum',
        studentPrompt:
          'When the total and size of each group are known, division can find the number of groups.',
        teacherEditionBasis:
          'Lesson 5 debrief reviews that division can find either factor and emphasizes the number-of-groups unknown for this lesson.',
        visualModel: 'equal-groups'
      }
    ],
    summary: {
      takeaway:
        'Division can find the number of groups when the total and the size of each group are known.',
      check: 'Ask: What is the total? How many are in each group? What does the answer represent?'
    }
  },
  {
    id: 'm1-l6',
    moduleId: 'm1',
    topicId: 'm1-tb',
    lessonNumber: 6,
    title: 'Use Arrays to Connect Division and Unknown Factors',
    objective: 'Interpret the unknown in division using the array model.',
    studentGoal:
      'I can use an array to connect a division quotient with the unknown factor in a related multiplication equation.',
    sourceRefs: [
      {
        sourceType: 'teacher-edition',
        path: 'EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf',
        pageStart: 85,
        pageEnd: 94,
        note: 'Lesson 6 objective, array concept development, related multiplication/division equations, problem set, exit ticket, and homework.'
      }
    ],
    vocabulary: ['array', 'division', 'quotient', 'unknown factor', 'rows', 'equal groups'],
    visualModels: ['array', 'equal-groups'],
    steps: [
      {
        id: 'l6-goal',
        title: 'Use arrays for division',
        shortTitle: 'Goal',
        studentPrompt:
          'In this lesson, an array helps show the total, the equal rows or groups, and the unknown in a division equation.',
        teacherEditionBasis:
          'Lesson 6 introduces division in the context of the array model and begins with 20 children, 5 on each team.',
        visualModel: 'array'
      },
      {
        id: 'l6-teams-array',
        title: 'Use an array for 20 children',
        shortTitle: 'Array',
        studentPrompt:
          'There are 20 children and 5 children on each team. Use the array to find how many teams play.',
        teacherEditionBasis:
          'Lesson 6 Application Problem and Problem 1 connect 20 children, 5 per team, number of teams, and rows in an array.',
        visualModel: 'array'
      },
      {
        id: 'l6-equation-bridge',
        title: 'Connect division to multiplication',
        shortTitle: 'Bridge',
        studentPrompt:
          'Use the same array to connect 15 divided by 3 equals 5 with 3 times 5 equals 15.',
        teacherEditionBasis:
          'Lesson 6 Problem 2 asks students to write both 15 divided by 3 equals 5 and 3 times 5 equals 15 for the same array.',
        visualModel: 'array'
      },
      {
        id: 'l6-meaning',
        title: 'Name what the quotient means',
        shortTitle: 'Meaning',
        studentPrompt:
          'In the division equation, the quotient names the missing factor in the related multiplication equation. In the array, it can name the number of rows or groups.',
        teacherEditionBasis:
          'Lesson 6 asks students to interpret the unknown in division by connecting the quotient to the unknown factor shown in the array model.',
        visualModel: 'array'
      },
      {
        id: 'l6-related-equations',
        title: 'Find the unknown factor',
        shortTitle: 'Factor',
        studentPrompt:
          'Use the related division equation to solve the unknown factor in blank times 3 equals 24.',
        teacherEditionBasis:
          'Lesson 6 Problem 3 relates blank times 3 equals 24 to 24 divided by 3 equals 8.',
        visualModel: 'array'
      },
      {
        id: 'l6-exit-check',
        title: 'Exit check: quotient and unknown factor',
        shortTitle: 'Exit',
        studentPrompt:
          'Complete the Lesson 6 exit-style equations and name what the quotient and unknown factor represent.',
        teacherEditionBasis:
          'Lesson 6 Exit Ticket uses 12 notecards arranged into rows of 6, then asks for 12 divided by 6, blank times 6 equals 12, and the meaning of the unknown.',
        visualModel: 'array'
      },
      {
        id: 'l6-summary',
        title: 'Say the Lesson 6 takeaway',
        shortTitle: 'Sum',
        studentPrompt:
          'The quotient in division can be the same number as the unknown factor in a related multiplication equation.',
        teacherEditionBasis:
          'Lesson 6 debrief asks students to explain the relationship between the quotient in division and the unknown factor in multiplication.',
        visualModel: 'array'
      }
    ],
    summary: {
      takeaway:
        'An array can show that the division quotient and the unknown multiplication factor are the same value in context.',
      check: 'Ask: What does the array show? Where does the quotient appear in the related multiplication equation?'
    }
  },
  ...MODULE_1_SOURCE_LESSONS
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

const LESSON_PAGE_RANGES: Record<string, Record<number, { pageStart: number; pageEnd: number }>> = {
  m1: {
    1: { pageStart: 23, pageEnd: 33 },
    2: { pageStart: 34, pageEnd: 48 },
    3: { pageStart: 49, pageEnd: 60 },
    4: { pageStart: 63, pageEnd: 74 },
    5: { pageStart: 75, pageEnd: 84 },
    6: { pageStart: 85, pageEnd: 94 },
    7: { pageStart: 97, pageEnd: 108 },
    8: { pageStart: 109, pageEnd: 118 },
    9: { pageStart: 119, pageEnd: 130 },
    10: { pageStart: 131, pageEnd: 141 },
    11: { pageStart: 151, pageEnd: 161 },
    12: { pageStart: 162, pageEnd: 173 },
    13: { pageStart: 174, pageEnd: 185 },
    14: { pageStart: 188, pageEnd: 199 },
    15: { pageStart: 200, pageEnd: 209 },
    16: { pageStart: 210, pageEnd: 220 },
    17: { pageStart: 221, pageEnd: 231 },
    18: { pageStart: 234, pageEnd: 244 },
    19: { pageStart: 245, pageEnd: 254 },
    20: { pageStart: 255, pageEnd: 266 },
    21: { pageStart: 267, pageEnd: 276 }
  },
  m2: {
    1: { pageStart: 13, pageEnd: 23 },
    2: { pageStart: 24, pageEnd: 36 },
    3: { pageStart: 37, pageEnd: 49 },
    4: { pageStart: 50, pageEnd: 60 },
    5: { pageStart: 61, pageEnd: 74 },
    6: { pageStart: 75, pageEnd: 84 },
    7: { pageStart: 85, pageEnd: 95 },
    8: { pageStart: 96, pageEnd: 105 },
    9: { pageStart: 106, pageEnd: 115 },
    10: { pageStart: 116, pageEnd: 126 },
    11: { pageStart: 127, pageEnd: 149 },
    12: { pageStart: 150, pageEnd: 159 },
    13: { pageStart: 160, pageEnd: 170 },
    14: { pageStart: 171, pageEnd: 184 },
    15: { pageStart: 185, pageEnd: 195 },
    16: { pageStart: 196, pageEnd: 206 },
    17: { pageStart: 207, pageEnd: 221 },
    18: { pageStart: 222, pageEnd: 232 },
    19: { pageStart: 233, pageEnd: 242 },
    20: { pageStart: 243, pageEnd: 256 },
    21: { pageStart: 257, pageEnd: 266 }
  },
  m3: {
    1: { pageStart: 14, pageEnd: 25 },
    2: { pageStart: 26, pageEnd: 37 },
    3: { pageStart: 38, pageEnd: 50 },
    4: { pageStart: 51, pageEnd: 61 },
    5: { pageStart: 62, pageEnd: 72 },
    6: { pageStart: 73, pageEnd: 84 },
    7: { pageStart: 85, pageEnd: 96 },
    8: { pageStart: 97, pageEnd: 107 },
    9: { pageStart: 108, pageEnd: 118 },
    10: { pageStart: 119, pageEnd: 129 },
    11: { pageStart: 130, pageEnd: 149 },
    12: { pageStart: 150, pageEnd: 163 },
    13: { pageStart: 164, pageEnd: 175 },
    14: { pageStart: 176, pageEnd: 186 },
    15: { pageStart: 187, pageEnd: 199 },
    16: { pageStart: 200, pageEnd: 211 },
    17: { pageStart: 212, pageEnd: 224 },
    18: { pageStart: 225, pageEnd: 237 },
    19: { pageStart: 238, pageEnd: 247 },
    20: { pageStart: 248, pageEnd: 257 },
    21: { pageStart: 258, pageEnd: 269 }
  },
  m4: {
    1: { pageStart: 11, pageEnd: 20 },
    2: { pageStart: 21, pageEnd: 31 },
    3: { pageStart: 32, pageEnd: 43 },
    4: { pageStart: 44, pageEnd: 56 },
    5: { pageStart: 57, pageEnd: 67 },
    6: { pageStart: 68, pageEnd: 79 },
    7: { pageStart: 80, pageEnd: 91 },
    8: { pageStart: 92, pageEnd: 115 },
    9: { pageStart: 116, pageEnd: 126 },
    10: { pageStart: 127, pageEnd: 137 },
    11: { pageStart: 138, pageEnd: 149 },
    12: { pageStart: 150, pageEnd: 160 },
    13: { pageStart: 161, pageEnd: 172 },
    14: { pageStart: 173, pageEnd: 184 },
    15: { pageStart: 185, pageEnd: 195 },
    16: { pageStart: 196, pageEnd: 204 }
  },
  m5: {
    1: { pageStart: 12, pageEnd: 21 },
    2: { pageStart: 22, pageEnd: 30 },
    3: { pageStart: 31, pageEnd: 40 },
    4: { pageStart: 41, pageEnd: 53 },
    5: { pageStart: 54, pageEnd: 63 },
    6: { pageStart: 64, pageEnd: 74 },
    7: { pageStart: 75, pageEnd: 85 },
    8: { pageStart: 86, pageEnd: 97 },
    9: { pageStart: 98, pageEnd: 111 },
    10: { pageStart: 112, pageEnd: 123 },
    11: { pageStart: 124, pageEnd: 135 },
    12: { pageStart: 136, pageEnd: 147 },
    13: { pageStart: 148, pageEnd: 158 },
    14: { pageStart: 168, pageEnd: 177 },
    15: { pageStart: 178, pageEnd: 187 },
    16: { pageStart: 188, pageEnd: 199 },
    17: { pageStart: 200, pageEnd: 210 },
    18: { pageStart: 211, pageEnd: 220 },
    19: { pageStart: 221, pageEnd: 233 },
    20: { pageStart: 234, pageEnd: 244 },
    21: { pageStart: 245, pageEnd: 254 },
    22: { pageStart: 255, pageEnd: 264 },
    23: { pageStart: 265, pageEnd: 275 },
    24: { pageStart: 276, pageEnd: 288 },
    25: { pageStart: 289, pageEnd: 303 },
    26: { pageStart: 304, pageEnd: 315 },
    27: { pageStart: 316, pageEnd: 328 },
    28: { pageStart: 329, pageEnd: 339 },
    29: { pageStart: 340, pageEnd: 351 },
    30: { pageStart: 352, pageEnd: 359 }
  },
  m6: {
    1: { pageStart: 10, pageEnd: 21 },
    2: { pageStart: 22, pageEnd: 32 },
    3: { pageStart: 33, pageEnd: 49 },
    4: { pageStart: 50, pageEnd: 65 },
    5: { pageStart: 66, pageEnd: 77 },
    6: { pageStart: 78, pageEnd: 92 },
    7: { pageStart: 93, pageEnd: 105 },
    8: { pageStart: 106, pageEnd: 119 },
    9: { pageStart: 120, pageEnd: 134 }
  },
  m7: {
    1: { pageStart: 15, pageEnd: 26 },
    2: { pageStart: 27, pageEnd: 38 },
    3: { pageStart: 39, pageEnd: 54 },
    4: { pageStart: 55, pageEnd: 67 },
    5: { pageStart: 68, pageEnd: 82 },
    6: { pageStart: 83, pageEnd: 96 },
    7: { pageStart: 97, pageEnd: 113 },
    8: { pageStart: 114, pageEnd: 125 },
    9: { pageStart: 126, pageEnd: 139 },
    10: { pageStart: 140, pageEnd: 150 },
    11: { pageStart: 151, pageEnd: 157 },
    12: { pageStart: 158, pageEnd: 169 },
    13: { pageStart: 170, pageEnd: 183 },
    14: { pageStart: 184, pageEnd: 194 },
    15: { pageStart: 195, pageEnd: 206 },
    16: { pageStart: 207, pageEnd: 219 },
    17: { pageStart: 220, pageEnd: 247 },
    18: { pageStart: 248, pageEnd: 258 },
    19: { pageStart: 259, pageEnd: 268 },
    20: { pageStart: 269, pageEnd: 281 },
    21: { pageStart: 282, pageEnd: 294 },
    22: { pageStart: 295, pageEnd: 310 },
    23: { pageStart: 311, pageEnd: 321 },
    24: { pageStart: 322, pageEnd: 331 },
    25: { pageStart: 332, pageEnd: 341 },
    26: { pageStart: 342, pageEnd: 353 },
    27: { pageStart: 354, pageEnd: 367 },
    28: { pageStart: 368, pageEnd: 379 },
    29: { pageStart: 380, pageEnd: 391 },
    30: { pageStart: 392, pageEnd: 419 },
    31: { pageStart: 420, pageEnd: 430 },
    32: { pageStart: 431, pageEnd: 442 },
    33: { pageStart: 443, pageEnd: 453 },
    34: { pageStart: 454, pageEnd: 462 }
  }
};

function findTopic(module: ModuleMeta, lessonId: string) {
  return module.topics.find((topic) => topic.lessonIds.includes(lessonId));
}

function selectPrimaryVisualModel(module: ModuleMeta, objective: string): LessonContent['visualModels'][number] {
  const text = objective.toLowerCase();
  const has = (model: LessonContent['visualModels'][number]) => module.visualModels.includes(model);

  if ((text.includes('word problem') || text.includes('two-step') || text.includes('unknown')) && has('tape-diagram')) {
    return 'tape-diagram';
  }
  if ((text.includes('time') || text.includes('clock')) && has('clock')) {
    return 'clock';
  }
  if ((text.includes('number line') || text.includes('round') || text.includes('nearest')) && has('number-line')) {
    return 'number-line';
  }
  if ((text.includes('fraction') || text.includes('whole') || text.includes('unit fraction')) && has('fraction-strip')) {
    return 'fraction-strip';
  }
  if ((text.includes('line plot') || text.includes('graph') || text.includes('data')) && has('graph')) {
    return 'graph';
  }
  if ((text.includes('perimeter') || text.includes('geometry') || text.includes('attribute') || text.includes('figure')) && has('geometry')) {
    return 'geometry';
  }
  if ((text.includes('area') || text.includes('square unit')) && has('area-model')) {
    return 'area-model';
  }
  if ((text.includes('array') || text.includes('multiply') || text.includes('division') || text.includes('factor')) && has('array')) {
    return 'array';
  }
  if ((text.includes('weight') || text.includes('kilogram') || text.includes('gram') || text.includes('liter') || text.includes('milliliter') || text.includes('measure')) && has('measurement')) {
    return 'measurement';
  }

  return module.visualModels[0] ?? 'equal-groups';
}

function modelTeachingGuide(visualModel: LessonContent['visualModels'][number]) {
  const guides: Record<LessonContent['visualModels'][number], {
    board: string;
    ask: string;
    listen: string;
    misconception: string;
    exit: string;
  }> = {
    'equal-groups': {
      board: 'Draw equal groups first. Label number of groups, size of each group, and total before writing an equation.',
      ask: 'Ask: What is one group? How many groups are there? How many are in each group? What does the total count?',
      listen: 'The student should connect groups, group size, total, and equation without counting unrelated objects.',
      misconception: 'Watch for counting by ones without naming the unit, or using multiplication when the groups are not equal.',
      exit: 'Use the exit ticket to check whether the student can name the unit and write a matching equation.'
    },
    array: {
      board: 'Draw a compact row-and-column array. Label rows, columns, and total; then connect the array to multiplication or division.',
      ask: 'Ask: What does each row show? What does each column show? Which factor is unknown? How does the same array show a related fact?',
      listen: 'The student should explain rows and columns as equal groups, not just say the answer.',
      misconception: 'Watch for swapping row count and row size without explaining what each factor means.',
      exit: 'Use the exit ticket to check whether the student can read the array and explain the equation it represents.'
    },
    'tape-diagram': {
      board: 'Draw one bar for the whole and partition it into equal units. Label known quantities before solving the unknown.',
      ask: 'Ask: What does the whole bar represent? What is one unit? How many equal units are known? What is missing?',
      listen: 'The student should use the diagram to justify the operation and the meaning of the answer.',
      misconception: 'Watch for choosing an operation from keywords instead of from the relationship in the tape diagram.',
      exit: 'Use the exit ticket to check whether the student can draw, label, solve, and answer in context.'
    },
    'number-line': {
      board: 'Draw a clean number line with endpoints, benchmarks, and jumps. Label the unit before placing numbers or fractions.',
      ask: 'Ask: What are the endpoints? What is one unit? What does each jump represent? How far is the point from 0 or from the benchmark?',
      listen: 'The student should reason from distance and position on the number line.',
      misconception: 'Watch for counting tick marks instead of intervals, or placing a point without defining the whole/unit.',
      exit: 'Use the exit ticket to check whether the student labels intervals and explains position or distance.'
    },
    clock: {
      board: 'Draw or use an analog clock. Mark the start time, end time, and elapsed-minute jumps around the clock.',
      ask: 'Ask: Where does the minute hand start? Where does it end? How many minutes are in each jump? How do the hour and minute hands work together?',
      listen: 'The student should count elapsed time by useful chunks, not treat the clock like a normal base-ten number line.',
      misconception: 'Watch for confusing the hour hand with the minute hand or counting by ones around the entire clock.',
      exit: 'Use the exit ticket to check whether the student can explain elapsed time with clock movement and a written answer.'
    },
    measurement: {
      board: 'Write the measurement unit clearly, draw or show the tool, and keep labels attached to every number.',
      ask: 'Ask: What unit are we using? What does the tool show? Are we estimating, measuring, rounding, adding, or subtracting?',
      listen: 'The student should keep the unit with the number and explain whether the answer is exact, rounded, or computed.',
      misconception: 'Watch for dropping units, mixing units, or computing before deciding what the measurement represents.',
      exit: 'Use the exit ticket to check whether the student writes a measured or computed answer with the correct unit.'
    },
    'area-model': {
      board: 'Draw a rectangle tiled with square units. Label side lengths, rows, columns, and total square units.',
      ask: 'Ask: What is one square unit? How many rows? How many in each row? How can the rectangle be decomposed?',
      listen: 'The student should connect tiling, side lengths, multiplication, and area units.',
      misconception: 'Watch for counting boundary lengths when the lesson is about area, or writing units without "square".',
      exit: 'Use the exit ticket to check whether the student can find area from a tiled or labeled rectangle.'
    },
    'fraction-strip': {
      board: 'Draw the whole first, partition into equal parts, shade or mark the fraction, and label the unit fraction.',
      ask: 'Ask: What is the whole? Are the parts equal? What is one unit fraction? How many unit fractions are named?',
      listen: 'The student should define the whole before naming or comparing fractions.',
      misconception: 'Watch for naming a fraction from shaded parts before checking that parts are equal and the whole is clear.',
      exit: 'Use the exit ticket to check whether the student names the part, the unit, and the whole.'
    },
    graph: {
      board: 'Display the data, choose the scale, label axes or categories, and read values from the graph before comparing.',
      ask: 'Ask: What does each mark or bar represent? What is the scale? Which category is more or less? What question does the graph answer?',
      listen: 'The student should read the scale correctly and use graph evidence in the answer.',
      misconception: 'Watch for counting marks as ones when the graph scale is greater than one.',
      exit: 'Use the exit ticket to check whether the student can create or read the graph and justify a comparison.'
    },
    geometry: {
      board: 'Draw the figure large enough to mark sides, angles, attributes, area, or perimeter clearly.',
      ask: 'Ask: What attributes define the figure? Which measurements matter? Are we finding area, perimeter, or classifying shape?',
      listen: 'The student should use properties and measurements, not visual guessing.',
      misconception: 'Watch for confusing area with perimeter or naming a shape from appearance instead of attributes.',
      exit: 'Use the exit ticket to check whether the student labels the figure and explains the property or measurement used.'
    }
  };

  return guides[visualModel];
}

function conceptVocabularyForObjective(objective: string): string[] {
  const text = objective.toLowerCase();
  const terms = new Set<string>();
  const addIf = (condition: boolean, values: string[]) => {
    if (condition) {
      values.forEach((value) => terms.add(value));
    }
  };

  addIf(text.includes('add') || text.includes('sum'), ['addend']);
  addIf(text.includes('array'), ['array', 'row', 'column']);
  addIf(text.includes('area') || text.includes('square unit'), ['area', 'square unit']);
  addIf(text.includes('attribute'), ['attribute']);
  addIf(text.includes('capacity') || text.includes('liquid volume'), ['capacity']);
  addIf(text.includes('commutative'), ['commutative property']);
  addIf(text.includes('decompose') || text.includes('break apart'), ['decompose']);
  addIf(text.includes('distributive'), ['distributive property']);
  addIf(text.includes('divid'), ['division', 'divisor', 'quotient']);
  addIf(text.includes('elapsed time') || text.includes('time'), ['elapsed time']);
  addIf(text.includes('equal group'), ['equal groups']);
  addIf(text.includes('equivalent fraction'), ['equivalent fractions']);
  addIf(text.includes('factor') || text.includes('multiply') || text.includes('multiplication'), ['factor', 'product', 'multiplication']);
  addIf(text.includes('fraction'), ['fraction', 'whole']);
  addIf(text.includes('gram'), ['gram']);
  addIf(text.includes('kilogram'), ['kilogram']);
  addIf(text.includes('line plot'), ['line plot', 'scale']);
  addIf(text.includes('liter'), ['liter']);
  addIf(text.includes('milliliter'), ['milliliter']);
  addIf(text.includes('number line'), ['number line']);
  addIf(text.includes('perimeter'), ['perimeter']);
  addIf(text.includes('round') || text.includes('nearest'), ['round']);
  addIf(text.includes('scale') || text.includes('graph') || text.includes('data'), ['scale']);
  addIf(text.includes('tape diagram'), ['tape diagram']);
  addIf(text.includes('unit fraction'), ['unit fraction']);
  addIf(text.includes('unknown'), ['unknown', 'unknown factor']);
  addIf(text.includes('angle'), ['angle']);
  addIf(text.includes('right angle'), ['right angle']);

  return Array.from(terms);
}

function generatedLesson(module: ModuleMeta, lessonNumber: number): LessonContent | undefined {
  const lessonId = `${module.id}-l${lessonNumber}`;
  const objective = LESSON_OBJECTIVES[lessonId];
  const topic = findTopic(module, lessonId);

  if (!objective || !topic) {
    return undefined;
  }

  const sourcePages = LESSON_PAGE_RANGES[module.id]?.[lessonNumber];
  if (!sourcePages) {
    return undefined;
  }

  const visualModel = selectPrimaryVisualModel(module, objective);
  const guide = modelTeachingGuide(visualModel);
  const note = LESSON_SOURCE_NOTES[lessonId];
  const sourceNote = `Lesson ${lessonNumber} objective, concept development, problem set, exit ticket, and homework.`;

  return {
    id: lessonId,
    moduleId: module.id,
    topicId: topic.id,
    lessonNumber,
    title: objective.replace(/\.$/, ''),
    objective,
    studentGoal: `I can teach and explain this Eureka Math objective using the source model: ${objective}`,
    sourceRefs: [
      {
        sourceType: 'teacher-edition',
        path: module.sourcePdf,
        pageStart: sourcePages.pageStart,
        pageEnd: sourcePages.pageEnd,
        note: sourceNote
      }
    ],
    vocabulary: [...conceptVocabularyForObjective(objective), topic.label, topic.title, ...module.visualModels],
    visualModels: module.visualModels,
    steps: [
      {
        id: 'source-goal',
        title: 'Know the lesson question',
        shortTitle: 'Goal',
        studentPrompt: note?.sourceProblem ?? `Student-facing target: ${objective}`,
        teacherEditionBasis: `Use ${module.sourcePdf}, pdf pages ${sourcePages.pageStart}-${sourcePages.pageEnd}. Start from the concept development, then use the problem set and exit ticket for evidence.`,
        visualModel
      },
      {
        id: 'source-model',
        title: 'Put the model on the board',
        shortTitle: 'Model',
        studentPrompt: guide.board,
        teacherEditionBasis: note?.teacherMove ?? `${topic.label}: ${topic.title}. Model family for this lesson: ${module.visualModels.join(', ')}.`,
        visualModel
      },
      {
        id: 'source-meaning',
        title: 'Name what each part means',
        shortTitle: 'Meaning',
        studentPrompt: guide.listen,
        teacherEditionBasis: note?.teacherMove ?? 'Before solving, make the student name what the labels, units, quantities, and unknown represent.',
        visualModel
      },
      {
        id: 'source-picture',
        title: 'Read the picture',
        shortTitle: 'Picture',
        studentPrompt: note?.sourceProblem ?? guide.ask,
        teacherEditionBasis: 'Run one source-page example slowly. Require the student to explain the model before accepting the numerical answer.',
        visualModel
      },
      {
        id: 'source-draw',
        title: 'Draw or label the model',
        shortTitle: 'Draw',
        studentPrompt: guide.board,
        teacherEditionBasis: note?.teacherMove ?? 'Have the student reproduce the model with labels, then connect it to the equation or written answer.',
        visualModel
      },
      {
        id: 'source-exit',
        title: 'Exit check',
        shortTitle: 'Exit',
        studentPrompt: `${note?.exitEvidence ?? guide.exit} Misconception to catch: ${guide.misconception}`,
        teacherEditionBasis: 'Use the lesson exit ticket or problem-set pattern as evidence. Do not count a bare numerical answer as enough.',
        visualModel
      },
      {
        id: 'source-summary',
        title: 'Say the lesson takeaway',
        shortTitle: 'Sum',
        studentPrompt: `The student should explain the model, the lesson words, and the answer in one connected sentence.`,
        teacherEditionBasis: `Close by asking for one sentence that connects the model to the objective: ${objective}`,
        visualModel
      }
    ],
    summary: {
      takeaway: objective,
      check: `${guide.listen} ${guide.exit}`
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
