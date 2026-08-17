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
    url: 'https://www2.cde.ca.gov/cacs/math?dl=0&maxgrade=3&mingrade=3&order=0&page=0&perpage=100',
    establishes: 'The official Grade 3 learning expectations that every local curriculum must teach.'
  },
  californiaFramework: {
    label: 'California Mathematics Framework · Chapter 13',
    owner: 'California Department of Education',
    url: 'https://www.cde.ca.gov/ci/ma/cf/documents/mathframeworkch13.pdf',
    establishes: 'California adoption provides standards-aligned choices; local education agencies select the instructional materials they use.'
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

export const MATHEMATICAL_PRACTICES = [
  'Make sense of problems and persevere',
  'Reason abstractly and quantitatively',
  'Construct arguments and critique reasoning',
  'Model with mathematics',
  'Use tools strategically',
  'Attend to precision',
  'Look for and use structure',
  'Notice and express repeated reasoning'
];
