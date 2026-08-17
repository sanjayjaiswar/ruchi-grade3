export interface CurrentMathSource {
  label: string;
  owner: string;
  url: string;
  establishes: string;
}

export interface Grade3MathDomain {
  code: string;
  title: string;
  shortTitle: string;
  summary: string;
  focus: string[];
}

export interface Grade3StandardRecord {
  code: string;
  cluster: string;
  summary: string;
  details?: string[];
}

export interface Grade3DetailedDomain {
  id: 'oa' | 'nbt' | 'nf' | 'md' | 'g';
  code: string;
  title: string;
  focus: string;
  sourcePages: string;
  frameworkIdeas: string[];
  conceptSpine: Grade3ConceptStep[];
  mastery: string[];
  watchFor: {
    title: string;
    explanation: string;
  };
  standards: Grade3StandardRecord[];
}

export interface Grade3ConceptStep {
  stage: string;
  title: string;
  standards: string[];
  explanation: string;
  studentEvidence: string;
}

export interface Grade3FrameworkBigIdea {
  title: string;
  connection: string;
  standards: string;
  summary: string;
  guidance: string;
  connectedTo: string[];
}

export interface Grade3MathematicalPractice {
  code: `MP${number}`;
  title: string;
  parentView: string;
  grade3Example: string;
}

export const CURRENT_MATH_SOURCES = {
  californiaAdoption: {
    label: '2025 Mathematics Instructional Materials Adoption',
    owner: 'California Department of Education',
    url: 'https://www.cde.ca.gov/ci/ma/im/2025mathpublishers.asp',
    establishes: 'California adopted Classroom Mathematics California for grades K–8 on November 6, 2025.'
  },
  californiaFindings: {
    label: 'Classroom Mathematics California · Report of Findings',
    owner: 'California Department of Education',
    url: 'https://www.cde.ca.gov/ci/ma/im/documents/currassociatesk82025.docx',
    establishes: 'The state review found the K–8 program aligned to the California mathematics standards and identifies its Grade 3 print and digital components.'
  },
  californiaStandards: {
    label: 'California Grade 3 Mathematics Standards',
    owner: 'California Department of Education',
    url: 'https://www2.cde.ca.gov/cacs/math?dl=0&maxgrade=3&mingrade=3&order=0&page=0&perpage=10',
    establishes: 'The official Grade 3 learning expectations that every local curriculum must teach.'
  },
  californiaStandardsPdf: {
    label: 'California Common Core State Standards: Mathematics',
    owner: 'California Department of Education',
    url: 'https://www.cde.ca.gov/be/st/ss/documents/ccssmathstandardaug2013.pdf',
    establishes: 'The controlling standards publication; Grade 3 overview and standards appear on printed pages 24–27.'
  },
  californiaFramework: {
    label: 'California Mathematics Framework · Chapter 13',
    owner: 'California Department of Education',
    url: 'https://www.cde.ca.gov/ci/ma/cf/documents/mathframeworkch13.pdf',
    establishes: 'California adoption provides standards-aligned choices; local education agencies select the instructional materials they use.'
  },
  californiaFrameworkGrade3: {
    label: 'California Mathematics Framework · Chapter 6',
    owner: 'California Department of Education',
    url: 'https://www.cde.ca.gov/ci/ma/cf/documents/mathframeworkch6.pdf',
    establishes: 'The official Grade 3 big-ideas map, content connections, representations, and instructional guidance; see chapter pages 51–56, 67–70, 84–92.'
  },
  californiaFrameworkNumberSense: {
    label: 'California Mathematics Framework · Chapter 3',
    owner: 'California Department of Education',
    url: 'https://www.cde.ca.gov/ci/ma/cf/documents/mathframeworkch3.pdf',
    establishes: 'The official number-sense progression, including Grade 3 multiplication through equal groups, number-line jumps, arrays, area, and flexible decomposition; see chapter pages 25–26.'
  },
  californiaFrameworkLongDescriptions: {
    label: 'California Mathematics Framework · Chapter 6 Figure Descriptions',
    owner: 'California Department of Education',
    url: 'https://www.cde.ca.gov/ci/ma/cf/ch6longdescriptions.asp',
    establishes: 'The accessible official description of Figure 6.53 lists every direct connection among California’s nine Grade 3 mathematics big ideas.'
  },
  californiaAssessment: {
    label: 'California Assessment System',
    owner: 'California Department of Education',
    url: 'https://www.cde.ca.gov/TA/TG/ai/caassessmentsystem.asp',
    establishes: 'Smarter Balanced mathematics testing begins in Grade 3 and is separate from the textbook and i-Ready assessments.'
  },
  classroomMathematics: {
    label: 'Classroom Mathematics California',
    owner: 'Curriculum Associates',
    url: 'https://www.curriculumassociates.com/programs/i-ready-learning/classroom-mathematics-california',
    establishes: 'The official 2026 core program, its instructional model, two-volume Student Worktext, and print and digital resources.'
  },
  iReadyGrade3InAction: {
    label: 'i-Ready Classroom Mathematics · Grade 3 in Action',
    owner: 'Curriculum Associates',
    url: 'https://www.curriculumassociates.com/programs/i-ready-learning/i-ready-classroom-mathematics-2024-in-action',
    establishes: 'The publisher’s public Grade 3 classroom example identifies the Start, Try It, Discuss It, and Connect It lesson phases.'
  },
  californiaSamples: {
    label: 'California Mathematics Review Samples',
    owner: 'Curriculum Associates',
    url: 'https://www.curriculumassociates.com/review-site-pages/californiasamples',
    establishes: 'Publisher sample access is form-gated; a complete public Grade 3 unit and lesson table of contents was not available for verification.'
  },
  iReadyFamily: {
    label: 'i-Ready Resources for Families',
    owner: 'Curriculum Associates',
    url: 'https://www.curriculumassociates.com/family',
    establishes: 'The distinction among the core curriculum, i-Ready Inform assessment, and Personalized Instruction/My Path.'
  },
  iReadyAccess: {
    label: 'i-Ready licensing and access',
    owner: 'Curriculum Associates',
    url: 'https://www.curriculumassociates.com/support?sc_lang=en',
    establishes: 'The software has no personal or homeschool license; access is provisioned through a school or organization.'
  },
  iReadyPrivacy: {
    label: 'i-Ready Student Data Privacy Policy',
    owner: 'Curriculum Associates',
    url: 'https://www.curriculumassociates.com/privacy/i-ready?sc_lang=en',
    establishes: 'School customers authorize student access, provide roster information, and associate students with instructional content and assessments.'
  },
  morelandLegacy: {
    label: 'Moreland Math Curriculum',
    owner: 'Moreland School District',
    url: 'https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1132411&type=d&uREC_ID=718172',
    establishes: 'The public district page still describes the older Eureka Math adoption and does not document the current classroom change.'
  },
  morelandIReady: {
    label: 'i-Ready Diagnostic Assessments',
    owner: 'Anderson Elementary · Moreland School District',
    url: 'https://anderson.moreland.org/apps/news/article/1952561?categoryId=6720',
    establishes: 'Moreland publicly documented i-Ready Diagnostic use for Grades 1–8 mathematics; Grades 3–8 also take the state assessment.'
  }
} satisfies Record<string, CurrentMathSource>;

export const GRADE3_MATH_DOMAINS: Grade3MathDomain[] = [
  {
    code: '3.OA',
    title: 'Operations & Algebraic Thinking',
    shortTitle: 'Multiplication & division',
    summary: 'Build meaning, fluency, and problem-solving with multiplication and division.',
    focus: ['Equal groups, arrays, and word problems', 'Properties and multiplication–division relationships', 'Fluency within 100 and two-step problems']
  },
  {
    code: '3.NBT',
    title: 'Number & Operations in Base Ten',
    shortTitle: 'Place value & computation',
    summary: 'Use place value to round and calculate efficiently with whole numbers.',
    focus: ['Round to the nearest 10 or 100', 'Add and subtract within 1,000', 'Multiply one-digit numbers by multiples of 10']
  },
  {
    code: '3.NF',
    title: 'Number & Operations—Fractions',
    shortTitle: 'Fractions as numbers',
    summary: 'Understand fractions as numbers, including position, equivalence, and comparison.',
    focus: ['Unit fractions and equal parts', 'Fractions on a number line', 'Equivalent fractions and valid comparisons']
  },
  {
    code: '3.MD',
    title: 'Measurement & Data',
    shortTitle: 'Time, data, area & perimeter',
    summary: 'Solve measurement problems and connect area to multiplication and addition.',
    focus: ['Time intervals, mass, and liquid volume', 'Picture graphs, bar graphs, and measurement data', 'Area, perimeter, and rectilinear figures']
  },
  {
    code: '3.G',
    title: 'Geometry',
    shortTitle: 'Shapes & equal areas',
    summary: 'Reason about shape attributes and partition shapes into equal areas.',
    focus: ['Classify shapes and quadrilaterals', 'Recognize shared attributes', 'Partition shapes and name each share as a unit fraction']
  }
];

export const CALIFORNIA_GRADE3_BIG_IDEAS: Grade3FrameworkBigIdea[] = [
  {
    title: 'Represent Multivariable Data',
    connection: 'Reasoning with Data',
    standards: '3.MD.1–4 · 3.NBT.1',
    summary: 'Collect, organize, graph, and interpret measurement data with several categories.',
    guidance: 'Collect and organize measurement data; read and create scaled bar graphs and pictographs; use data sets with three or more categories.',
    connectedTo: ['Unit Fraction Models', 'Number Flexibility to 100 for All Four Operations', 'Patterns in Four Operations', 'Measuring', 'Fractions of Shape and Time']
  },
  {
    title: 'Fractions of Shape and Time',
    connection: 'Data · Wholes and Parts · Shape and Space',
    standards: '3.MD.1 · 3.NF.1–3 · 3.G.2',
    summary: 'Connect fractions to time, shapes, space, and the unit used to describe the whole.',
    guidance: 'Collect and visualize time-of-day data, then reason about fractions of time, shape, and space by expressing the base unit as a unit fraction of the whole.',
    connectedTo: ['Square Tiles', 'Fractions as Relationships', 'Unit Fraction Models', 'Represent Multivariable Data']
  },
  {
    title: 'Measuring',
    connection: 'Reasoning with Data',
    standards: '3.MD.2 · 3.MD.4 · 3.NBT.1',
    summary: 'Measure mass, volume, and length; compare results, display data, and round when appropriate.',
    guidance: 'Measure volume, mass, and length; compare measured objects; display measurement data on line plots; use rounding when it is appropriate.',
    connectedTo: ['Number Flexibility to 100 for All Four Operations', 'Analyze Quadrilaterals', 'Represent Multivariable Data']
  },
  {
    title: 'Patterns in Four Operations',
    connection: 'Exploring Changing Quantities',
    standards: '3.NBT.2 · 3.OA.8–9 · 3.MD.1',
    summary: 'Use models and place value to calculate, investigate patterns, generalize, and justify findings.',
    guidance: 'Add and subtract within 1,000 with student-generated strategies and models, connect expanded notation to place value, and investigate and justify patterns in operation tables.',
    connectedTo: ['Number Flexibility to 100 for All Four Operations', 'Unit Fraction Models', 'Analyze Quadrilaterals', 'Represent Multivariable Data']
  },
  {
    title: 'Number Flexibility to 100 for All Four Operations',
    connection: 'Exploring Changing Quantities',
    standards: '3.OA.1–8 · 3.NBT.1, 3 · 3.MD.7',
    summary: 'Connect all four operations and build flexible multiplication and division reasoning with arrays, visual representations, estimation, and rounding.',
    guidance: 'Multiply and divide within 100, justify with arrays and student-generated representations, develop number flexibility instead of rote fact work alone, and use estimation and rounding.',
    connectedTo: ['Square Tiles', 'Analyze Quadrilaterals', 'Represent Multivariable Data', 'Measuring', 'Patterns in Four Operations']
  },
  {
    title: 'Square Tiles',
    connection: 'Taking Wholes Apart, Putting Parts Together',
    standards: '3.MD.5–7 · 3.OA.7 · 3.NF.1',
    summary: 'Use unit squares to measure area and connect multiplication, area, and fractional parts of a whole region.',
    guidance: 'Use square tiles to measure area, express the result in square units, and recognize one tile as a unit fraction of the total tiled area.',
    connectedTo: ['Fractions as Relationships', 'Number Flexibility to 100 for All Four Operations', 'Fractions of Shape and Time']
  },
  {
    title: 'Fractions as Relationships',
    connection: 'Taking Wholes Apart, Putting Parts Together',
    standards: '3.NF.1 · 3.NF.3',
    summary: 'Reason about the numerator, denominator, same whole, and equivalent names for the same amount.',
    guidance: 'Interpret a fraction as a relationship between numerator and denominator in context and explain equivalences such as 1/2 = 2/4 = 3/6.',
    connectedTo: ['Square Tiles', 'Fractions of Shape and Time', 'Unit Fraction Models']
  },
  {
    title: 'Unit Fraction Models',
    connection: 'Wholes and Parts · Shape and Space',
    standards: '3.NF.2–3 · 3.MD.1',
    summary: 'Compare and justify fractions with number lines, time, measurement tools, and area models.',
    guidance: 'Compare unit fractions with linear models—including number lines, tape measures, time, and clocks—and with area models; justify the comparison visually.',
    connectedTo: ['Fractions as Relationships', 'Patterns in Four Operations', 'Fractions of Shape and Time', 'Represent Multivariable Data']
  },
  {
    title: 'Analyze Quadrilaterals',
    connection: 'Discovering Shape and Space',
    standards: '3.G.1–2 · 3.MD.8 · 3.NBT.1 · 3.OA.8',
    summary: 'Describe and compare quadrilaterals and investigate how area and perimeter change with side lengths.',
    guidance: 'Describe, analyze, and compare quadrilaterals; model how area and perimeter change when side lengths change; round lengths when appropriate.',
    connectedTo: ['Number Flexibility to 100 for All Four Operations', 'Patterns in Four Operations', 'Measuring']
  }
];

export const MATHEMATICAL_PRACTICES: Grade3MathematicalPractice[] = [
  {
    code: 'MP1',
    title: 'Make sense of problems and persevere in solving them',
    parentView: 'Understand what is known and unknown, choose a route, monitor progress, and try another route when needed.',
    grade3Example: 'For a two-step word problem, draw or write what each step finds, then check whether the final answer fits the situation.'
  },
  {
    code: 'MP2',
    title: 'Reason abstractly and quantitatively',
    parentView: 'Move between the quantities in a situation and the symbols used to represent them without losing their meaning.',
    grade3Example: 'Connect 4 × 6 = 24 to four equal groups of six objects, including what 4, 6, and 24 mean.'
  },
  {
    code: 'MP3',
    title: 'Construct viable arguments and critique the reasoning of others',
    parentView: 'Explain why a strategy works, use mathematical evidence, and decide whether another explanation is valid.',
    grade3Example: 'Compare two fraction models and explain why 2/4 and 1/2 name the same amount of the same whole.'
  },
  {
    code: 'MP4',
    title: 'Model with mathematics',
    parentView: 'Represent a real situation with mathematics and interpret the result back in the original situation.',
    grade3Example: 'Use an array, equation, or bar model to represent equal groups in a multiplication problem.'
  },
  {
    code: 'MP5',
    title: 'Use appropriate tools strategically',
    parentView: 'Choose a useful tool, recognize what it can show, and decide whether another tool would work better.',
    grade3Example: 'Choose a ruler for quarter-inch measurements, a number line for fraction locations, or tiles for rectangular area.'
  },
  {
    code: 'MP6',
    title: 'Attend to precision',
    parentView: 'Calculate accurately and communicate with clear symbols, labels, definitions, and units.',
    grade3Example: 'Report an area as 12 square units and a perimeter as 14 units rather than using the same unit label for both.'
  },
  {
    code: 'MP7',
    title: 'Look for and make use of structure',
    parentView: 'Notice how a mathematical object is organized and use that organization to reason efficiently.',
    grade3Example: 'See 7 × 8 as 7 × 5 plus 7 × 3 by splitting an array into two easier parts.'
  },
  {
    code: 'MP8',
    title: 'Look for and express regularity in repeated reasoning',
    parentView: 'Notice repeated calculations or reasoning, form a general method, and monitor whether it continues to work.',
    grade3Example: 'Use repeated groups of ten to explain why 4 × 30 is 12 tens, or 120.'
  }
];

export const DETAILED_GRADE3_MATH_DOMAINS: Grade3DetailedDomain[] = [
  {
    id: 'oa',
    code: '3.OA',
    title: 'Operations & Algebraic Thinking',
    focus: 'Interpret multiplication and division, solve problems, build fluency within 100, and explain arithmetic patterns.',
    sourcePages: 'pp. 24–25',
    frameworkIdeas: ['Number Flexibility to 100 for All Four Operations', 'Patterns in Four Operations', 'Square Tiles'],
    conceptSpine: [
      {
        stage: 'Build the meaning',
        title: 'Equal groups become multiplication',
        standards: ['3.OA.1', '3.OA.3'],
        explanation: 'A product describes a number of equal groups and the number of objects in each group. Drawings and equations keep both quantities visible.',
        studentEvidence: 'Names the groups, the group size, and the total in a context—not only the answer.'
      },
      {
        stage: 'Invert the question',
        title: 'Division asks two different questions',
        standards: ['3.OA.2', '3.OA.6'],
        explanation: 'A division situation can ask for the size of each equal share or for the number of equal groups. Both connect to an unknown multiplication factor.',
        studentEvidence: 'Explains whether the unknown is group size or number of groups and writes the related multiplication equation.'
      },
      {
        stage: 'Connect representations',
        title: 'Groups, jumps, arrays, and area show the same structure',
        standards: ['3.OA.3', '3.OA.5', '3.MD.7'],
        explanation: 'Equal groups can be reorganized as number-line jumps, rows and columns, or unit squares without changing the product.',
        studentEvidence: 'Moves between a context, visual model, and equation and explains what stays the same.'
      },
      {
        stage: 'Use structure',
        title: 'Decompose difficult facts into known facts',
        standards: ['3.OA.5', '3.OA.7'],
        explanation: 'Properties of operations support flexible strategies. For example, 8 × 7 can be seen as 8 × 5 plus 8 × 2.',
        studentEvidence: 'Breaks apart a factor, records both partial products, and recombines them accurately.'
      },
      {
        stage: 'Solve and justify',
        title: 'Unknowns and two-step problems require a plan',
        standards: ['3.OA.4', '3.OA.8'],
        explanation: 'Students represent an unknown with a symbol, choose operations for each step, and use estimation or mental computation to judge the result.',
        studentEvidence: 'Labels what each step finds and checks whether the final answer is reasonable in the situation.'
      },
      {
        stage: 'Generalize',
        title: 'Fluency grows from relationships and patterns',
        standards: ['3.OA.7', '3.OA.9'],
        explanation: 'Students use operation relationships and arithmetic patterns to become fluent within 100 and explain why patterns continue.',
        studentEvidence: 'Uses known facts or a pattern to derive an unfamiliar fact and explains the relationship.'
      }
    ],
    mastery: [
      'Interprets products and quotients in the situation that produced them.',
      'Solves equal-group, array, and measurement problems within 100 with a drawing or equation.',
      'Uses properties and inverse relationships as strategies, not merely as vocabulary.',
      'Solves two-step problems and explains why the operations and answer make sense.',
      'Multiplies and divides fluently within 100 and knows all one-digit products by year end.'
    ],
    watchFor: {
      title: 'Do not reduce multiplication to memorized facts',
      explanation: 'The California framework emphasizes number flexibility: students should justify with arrays and other visual representations, use estimation, and build fluency from relationships before relying on recall alone.'
    },
    standards: [
      {
        code: '3.OA.1',
        cluster: 'Represent and solve multiplication and division problems',
        summary: 'Interpret a whole-number product as equal groups—for example, understand 5 × 7 as 5 groups with 7 objects in each group.'
      },
      {
        code: '3.OA.2',
        cluster: 'Represent and solve multiplication and division problems',
        summary: 'Interpret a whole-number quotient as either the size of each equal share or the number of equal shares.'
      },
      {
        code: '3.OA.3',
        cluster: 'Represent and solve multiplication and division problems',
        summary: 'Use multiplication and division within 100 to solve problems involving equal groups, arrays, and measurement quantities.',
        details: ['Represent the situation with drawings.', 'Use an equation with a symbol for the unknown.']
      },
      {
        code: '3.OA.4',
        cluster: 'Represent and solve multiplication and division problems',
        summary: 'Find an unknown whole number in a multiplication or division equation relating three whole numbers.'
      },
      {
        code: '3.OA.5',
        cluster: 'Properties and the multiplication–division relationship',
        summary: 'Apply properties of operations as strategies for multiplication and division.',
        details: ['Students are not required to use the formal property names.']
      },
      {
        code: '3.OA.6',
        cluster: 'Properties and the multiplication–division relationship',
        summary: 'Understand division as an unknown-factor problem.'
      },
      {
        code: '3.OA.7',
        cluster: 'Multiply and divide within 100',
        summary: 'Fluently multiply and divide within 100 using strategies and operation relationships.',
        details: ['By the end of Grade 3, know from memory all products of two one-digit numbers.']
      },
      {
        code: '3.OA.8',
        cluster: 'Four operations and arithmetic patterns',
        summary: 'Solve two-step whole-number problems using the four operations, represent the unknown with a letter, and check whether answers are reasonable.',
        details: ['Use mental computation and estimation strategies, including rounding.']
      },
      {
        code: '3.OA.9',
        cluster: 'Four operations and arithmetic patterns',
        summary: 'Identify arithmetic patterns and explain them using properties of operations.'
      }
    ]
  },
  {
    id: 'nbt',
    code: '3.NBT',
    title: 'Number & Operations in Base Ten',
    focus: 'Use place value and operation properties to round, add, subtract, and multiply with whole numbers.',
    sourcePages: 'pp. 25–26',
    frameworkIdeas: ['Patterns in Four Operations', 'Number Flexibility to 100 for All Four Operations', 'Measuring'],
    conceptSpine: [
      {
        stage: 'Locate and compare',
        title: 'Rounding is a place-value decision',
        standards: ['3.NBT.1'],
        explanation: 'A number is placed between nearby multiples of 10 or 100, and its distance from those benchmarks determines the rounded value.',
        studentEvidence: 'Names the two bounding multiples and explains which is closer.'
      },
      {
        stage: 'Compose and decompose',
        title: 'Hundreds, tens, and ones organize computation',
        standards: ['3.NBT.2'],
        explanation: 'Students can break numbers into place-value parts, combine or separate those parts, and use operation properties to calculate within 1,000.',
        studentEvidence: 'Connects a strategy or written method to the value of each digit.'
      },
      {
        stage: 'Check the structure',
        title: 'Addition and subtraction explain one another',
        standards: ['3.NBT.2'],
        explanation: 'The relationship between addition and subtraction supports efficient strategies and provides a way to verify a result.',
        studentEvidence: 'Checks a subtraction result with addition or explains an addition using a related difference.'
      },
      {
        stage: 'Scale by tens',
        title: 'A one-digit fact extends to a multiple of 10',
        standards: ['3.NBT.3'],
        explanation: 'Four groups of 3 tens are 12 tens, so 4 × 30 = 120. The place-value unit changes while the basic fact remains visible.',
        studentEvidence: 'Explains the answer in tens before recording the standard numeral.'
      }
    ],
    mastery: [
      'Rounds to the nearest 10 or 100 using place-value reasoning.',
      'Adds and subtracts within 1,000 and explains the strategy through place value or operation relationships.',
      'Uses estimation or an inverse operation to check whether an answer is reasonable.',
      'Multiplies a one-digit number by 10, 20, …, 90 by reasoning in groups of tens.'
    ],
    watchFor: {
      title: 'A digit rule is not the whole rounding idea',
      explanation: 'Standard 3.NBT.1 requires place-value understanding. The Grade 3 framework map calls for number flexibility, estimation, and rounding rather than reducing the work to an unexplained digit procedure.'
    },
    standards: [
      {
        code: '3.NBT.1',
        cluster: 'Use place value for multi-digit arithmetic',
        summary: 'Round whole numbers to the nearest 10 or 100 using place-value understanding.'
      },
      {
        code: '3.NBT.2',
        cluster: 'Use place value for multi-digit arithmetic',
        summary: 'Fluently add and subtract within 1,000 using place value, operation properties, and the addition–subtraction relationship.'
      },
      {
        code: '3.NBT.3',
        cluster: 'Use place value for multi-digit arithmetic',
        summary: 'Multiply a one-digit whole number by a multiple of 10 from 10 through 90 using place-value and operation strategies.'
      }
    ]
  },
  {
    id: 'nf',
    code: '3.NF',
    title: 'Number & Operations—Fractions',
    focus: 'Understand fractions as numbers, place them on number lines, and reason about equivalence and comparison.',
    sourcePages: 'p. 26',
    frameworkIdeas: ['Fractions as Relationships', 'Unit Fraction Models', 'Fractions of Shape and Time', 'Square Tiles'],
    conceptSpine: [
      {
        stage: 'Establish the whole',
        title: 'A fraction only has meaning relative to a whole',
        standards: ['3.NF.1', '3.NF.3'],
        explanation: 'The whole is partitioned into equal parts. The denominator names the number of equal parts, and the numerator counts parts of that size.',
        studentEvidence: 'Identifies the whole and verifies that the parts are equal before naming a fraction.'
      },
      {
        stage: 'Build with unit fractions',
        title: 'The numerator counts copies of the unit fraction 1/b',
        standards: ['3.NF.1'],
        explanation: 'Three fourths can be built as three lengths or regions of size one fourth. This makes numerator and denominator roles visible.',
        studentEvidence: 'Builds and labels a fraction from repeated unit-fraction pieces.'
      },
      {
        stage: 'Treat fractions as numbers',
        title: 'A fraction is a location on a number line',
        standards: ['3.NF.2'],
        explanation: 'The unit interval from 0 to 1 is partitioned into equal lengths, and repeated unit-fraction lengths locate a/b.',
        studentEvidence: 'Starts at 0, marks equal intervals, and explains why the endpoint is the named fraction.'
      },
      {
        stage: 'Name the same amount',
        title: 'Equivalent fractions share a size or location',
        standards: ['3.NF.3'],
        explanation: 'Different numerators and denominators can describe the same amount when the fractions refer to the same whole.',
        studentEvidence: 'Uses an area model or number line to justify a simple equivalence such as 1/2 = 2/4.'
      },
      {
        stage: 'Compare validly',
        title: 'Fraction comparisons require the same whole',
        standards: ['3.NF.3'],
        explanation: 'Students reason about size using models, benchmarks, or equivalent fractions, but only when both fractions refer to the same whole.',
        studentEvidence: 'States the common whole and supports <, >, or = with a visual or size argument.'
      }
    ],
    mastery: [
      'Names and builds fractions from equal parts of a clearly identified whole.',
      'Locates fractions on a number line using equal unit-fraction lengths from zero.',
      'Explains simple equivalent fractions with a visual model.',
      'Expresses whole numbers as fractions and recognizes fractions equal to whole numbers.',
      'Compares fractions only when they refer to the same whole and justifies the comparison.'
    ],
    watchFor: {
      title: 'Four pieces do not automatically mean fourths',
      explanation: 'The California framework specifically warns that students may count pieces without checking their sizes. A fourth must be one of four equal-area parts of the same whole. Grade 3 work in this domain is limited to denominators 2, 3, 4, 6, and 8.'
    },
    standards: [
      {
        code: '3.NF.1',
        cluster: 'Develop understanding of fractions as numbers',
        summary: 'Understand 1/b as one part of a whole divided into b equal parts, and a/b as a parts of size 1/b.'
      },
      {
        code: '3.NF.2',
        cluster: 'Develop understanding of fractions as numbers',
        summary: 'Understand a fraction as a number on the number line and represent it with a number-line diagram.'
      },
      {
        code: '3.NF.2.a',
        cluster: 'Fractions on a number line',
        summary: 'Define the interval from 0 to 1 as the whole, partition it into b equal parts, and locate 1/b at the endpoint of one part.'
      },
      {
        code: '3.NF.2.b',
        cluster: 'Fractions on a number line',
        summary: 'Locate a/b by marking off a lengths of size 1/b from 0 and recognizing that endpoint as the number a/b.'
      },
      {
        code: '3.NF.3',
        cluster: 'Develop understanding of fractions as numbers',
        summary: 'Explain fraction equivalence in special cases and compare fractions by reasoning about their size.'
      },
      {
        code: '3.NF.3.a',
        cluster: 'Equivalence and comparison',
        summary: 'Understand two fractions as equivalent when they have the same size or identify the same point on a number line.'
      },
      {
        code: '3.NF.3.b',
        cluster: 'Equivalence and comparison',
        summary: 'Recognize and generate simple equivalent fractions and explain why they are equivalent, including with a visual fraction model.'
      },
      {
        code: '3.NF.3.c',
        cluster: 'Equivalence and comparison',
        summary: 'Express whole numbers as fractions and recognize fractions that are equal to whole numbers.'
      },
      {
        code: '3.NF.3.d',
        cluster: 'Equivalence and comparison',
        summary: 'Compare two fractions with the same numerator or denominator by reasoning about size; comparisons are valid only when both fractions refer to the same whole.',
        details: ['Record the result with >, =, or <.', 'Justify the conclusion with a visual fraction model.']
      }
    ]
  },
  {
    id: 'md',
    code: '3.MD',
    title: 'Measurement & Data',
    focus: 'Work with time, mass, liquid volume, graphs, area, and perimeter.',
    sourcePages: 'pp. 26–27',
    frameworkIdeas: ['Represent Multivariable Data', 'Measuring', 'Fractions of Shape and Time', 'Square Tiles', 'Analyze Quadrilaterals'],
    conceptSpine: [
      {
        stage: 'Measure change',
        title: 'Time intervals can be composed and decomposed',
        standards: ['3.MD.1'],
        explanation: 'Elapsed-time problems can be broken at useful landmarks, such as the next hour, then recombined in minutes.',
        studentEvidence: 'Shows the interval with a clock, number line, or sequence of time jumps and verifies the total.'
      },
      {
        stage: 'Choose a unit',
        title: 'Mass and liquid volume require meaningful units',
        standards: ['3.MD.2'],
        explanation: 'Students estimate and measure with grams, kilograms, and liters, then solve problems only when the quantities use compatible units.',
        studentEvidence: 'Selects a reasonable unit and labels the result rather than reporting a bare number.'
      },
      {
        stage: 'Represent data',
        title: 'A scale changes what one mark represents',
        standards: ['3.MD.3'],
        explanation: 'Scaled picture graphs and bar graphs compress data, so students must read the scale before comparing categories or solving two-step questions.',
        studentEvidence: 'Uses the scale to convert marks or bar lengths into quantities and explains a comparison.'
      },
      {
        stage: 'Measure precisely',
        title: 'Line plots preserve fractional measurements',
        standards: ['3.MD.4'],
        explanation: 'Lengths measured to halves and fourths of an inch become points on a shared number line, making the distribution visible.',
        studentEvidence: 'Places each measurement at the correct fractional location and reads the frequency.'
      },
      {
        stage: 'Build area',
        title: 'Unit squares connect area and multiplication',
        standards: ['3.MD.5', '3.MD.6', '3.MD.7'],
        explanation: 'A rectangle tiled without gaps reveals rows, squares per row, total square units, and the distributive property when it is decomposed.',
        studentEvidence: 'Explains why side lengths multiply and why the unit is square units.'
      },
      {
        stage: 'Distinguish attributes',
        title: 'Area and perimeter measure different things',
        standards: ['3.MD.8'],
        explanation: 'Area measures the region inside a figure; perimeter measures the distance around its boundary. Equal areas need not have equal perimeters.',
        studentEvidence: 'Chooses the correct attribute and unit and can compare rectangles with the same area or perimeter.'
      }
    ],
    mastery: [
      'Solves elapsed-time problems to the nearest minute and shows how the interval was composed.',
      'Measures and estimates mass and liquid volume with correct units.',
      'Creates and interprets scaled graphs and line plots, including one- and two-step questions.',
      'Measures area by counting unit squares and relates rectangular area to multiplication and addition.',
      'Solves perimeter problems and clearly distinguishes linear units from square units.'
    ],
    watchFor: {
      title: 'Area and perimeter are not interchangeable',
      explanation: 'The California framework identifies persistent confusion between the two attributes. Keep the visual meaning and units explicit: covering inside versus measuring around.'
    },
    standards: [
      {
        code: '3.MD.1',
        cluster: 'Time, liquid volume, and mass',
        summary: 'Tell and write time to the nearest minute, measure time intervals, and solve addition and subtraction problems involving minutes.'
      },
      {
        code: '3.MD.2',
        cluster: 'Time, liquid volume, and mass',
        summary: 'Measure and estimate liquid volume and mass in liters, grams, and kilograms, and solve one-step problems in the same units.'
      },
      {
        code: '3.MD.3',
        cluster: 'Represent and interpret data',
        summary: 'Create scaled picture and bar graphs and solve one- and two-step comparison problems using their data.'
      },
      {
        code: '3.MD.4',
        cluster: 'Represent and interpret data',
        summary: 'Measure lengths to halves and fourths of an inch and display the measurements on a line plot.'
      },
      {
        code: '3.MD.5',
        cluster: 'Area concepts',
        summary: 'Recognize area as an attribute of plane figures and understand how area is measured.'
      },
      {
        code: '3.MD.5.a',
        cluster: 'Area concepts',
        summary: 'A square with side length one unit is a unit square and has an area of one square unit.'
      },
      {
        code: '3.MD.5.b',
        cluster: 'Area concepts',
        summary: 'A plane figure covered without gaps or overlaps by n unit squares has an area of n square units.'
      },
      {
        code: '3.MD.6',
        cluster: 'Area concepts',
        summary: 'Measure area by counting unit squares.'
      },
      {
        code: '3.MD.7',
        cluster: 'Relate area to multiplication and addition',
        summary: 'Relate area to multiplication and addition.'
      },
      {
        code: '3.MD.7.a',
        cluster: 'Relate area to multiplication and addition',
        summary: 'Tile a rectangle and show that its area from counting tiles matches the product of its side lengths.'
      },
      {
        code: '3.MD.7.b',
        cluster: 'Relate area to multiplication and addition',
        summary: 'Multiply side lengths to find rectangular area and represent whole-number products as rectangular areas.'
      },
      {
        code: '3.MD.7.c',
        cluster: 'Relate area to multiplication and addition',
        summary: 'Use area models to show the distributive property and connect the model to a multiplication strategy.'
      },
      {
        code: '3.MD.7.d',
        cluster: 'Relate area to multiplication and addition',
        summary: 'Recognize area as additive and find the area of a figure by adding the areas of non-overlapping rectangles.'
      },
      {
        code: '3.MD.8',
        cluster: 'Perimeter',
        summary: 'Solve perimeter problems, including unknown side lengths and comparisons between area and perimeter.'
      }
    ]
  },
  {
    id: 'g',
    code: '3.G',
    title: 'Geometry',
    focus: 'Reason about shared shape attributes and partition shapes into equal areas.',
    sourcePages: 'p. 27',
    frameworkIdeas: ['Analyze Quadrilaterals', 'Fractions of Shape and Time', 'Square Tiles'],
    conceptSpine: [
      {
        stage: 'Notice attributes',
        title: 'Shapes belong to categories because of properties',
        standards: ['3.G.1'],
        explanation: 'Side count, side relationships, and other defining attributes—not orientation, size, or color—support classification.',
        studentEvidence: 'Names the attribute that places a shape in a category and ignores nondefining visual features.'
      },
      {
        stage: 'Build a hierarchy',
        title: 'Quadrilateral is a larger category',
        standards: ['3.G.1'],
        explanation: 'Rhombuses, rectangles, and squares all have four sides and therefore belong to the quadrilateral category while retaining more specific attributes.',
        studentEvidence: 'Explains why a square can belong to more than one shape category.'
      },
      {
        stage: 'Test the boundary',
        title: 'Examples and nonexamples clarify a definition',
        standards: ['3.G.1'],
        explanation: 'Drawing quadrilaterals outside familiar subcategories helps separate the defining idea “four sides” from the appearance of common rectangles and squares.',
        studentEvidence: 'Draws and defends an unfamiliar quadrilateral that is not a square, rectangle, or rhombus.'
      },
      {
        stage: 'Partition area',
        title: 'Equal-area parts connect geometry and fractions',
        standards: ['3.G.2', '3.NF.1'],
        explanation: 'A shape partitioned into b equal areas creates unit-fraction regions of size 1/b, linking spatial reasoning with fraction meaning.',
        studentEvidence: 'Verifies equal areas and names each region as a unit fraction of the same whole.'
      },
      {
        stage: 'Connect measures',
        title: 'Side lengths affect perimeter and area differently',
        standards: ['3.G.1', '3.MD.8'],
        explanation: 'Rectangle investigations reveal that changing dimensions can preserve one attribute while changing the other.',
        studentEvidence: 'Builds or draws examples and compares both the inside area and the boundary length.'
      }
    ],
    mastery: [
      'Classifies shapes by defining attributes and explains the category relationship.',
      'Recognizes rhombuses, rectangles, and squares as quadrilaterals.',
      'Draws quadrilaterals that do not belong to the named subcategories.',
      'Partitions shapes into equal areas and names each share as a unit fraction of the whole.',
      'Connects geometric reasoning to area and perimeter without confusing the two attributes.'
    ],
    watchFor: {
      title: 'A rotated or stretched example is still the same shape category',
      explanation: 'Classification depends on defining attributes. Varying orientation and proportions helps prevent students from treating only the most familiar-looking example as valid.'
    },
    standards: [
      {
        code: '3.G.1',
        cluster: 'Reason with shapes and their attributes',
        summary: 'Recognize that shapes can share attributes that define a larger category, including quadrilaterals.',
        details: ['Recognize rhombuses, rectangles, and squares as quadrilaterals.', 'Draw quadrilaterals outside those subcategories.']
      },
      {
        code: '3.G.2',
        cluster: 'Reason with shapes and their attributes',
        summary: 'Partition shapes into equal-area parts and express each part as a unit fraction of the whole.'
      }
    ]
  }
];
