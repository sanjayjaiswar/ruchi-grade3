export interface CurrentMathSource {
  label: string;
  owner: string;
  url: string;
  establishes: string;
}

export interface Grade3CmcBook {
  id: string;
  title: string;
  audience: 'Student' | 'Teacher';
  volume?: 1 | 2;
  isbn: string;
  itemNumber: string;
  reviewPages: number;
  coverage: string;
  sourceUrl: string;
}

export interface Grade3CmcLesson {
  number: number;
  title: string;
  standards: string;
  printPage: number;
  sessions: number;
}

export interface Grade3CmcUnit {
  number: number;
  title: string;
  subtitle: string;
  volume: 1 | 2;
  printPages: string;
  pacingDays: number;
  stemProfile: string;
  performanceTask: string;
  bigIdeas: string[];
  sourceUrl: string;
  lessons: Grade3CmcLesson[];
}

export const SYLLABUS_BOOKS_SOURCES = {
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
    establishes: 'The publisher identifies browser-based review editions for both Grade 3 Student Worktext volumes, both Teacher Guide volumes, and Fluency and Skills Practice.'
  },
  grade3StudentWorktextVolume1: {
    label: 'Grade 3 Student Worktext · Volume 1 · Online Review',
    owner: 'Curriculum Associates',
    url: 'https://online.flippingbook.com/view/336581625/',
    establishes: 'The publisher-listed 548-page browser review of the English Grade 3 Student Worktext, Volume 1; download and print are disabled.'
  },
  grade3StudentWorktextVolume2: {
    label: 'Grade 3 Student Worktext · Volume 2 · Online Review',
    owner: 'Curriculum Associates',
    url: 'https://online.flippingbook.com/view/336471940/',
    establishes: 'The publisher-listed 396-page browser review of the English Grade 3 Student Worktext, Volume 2; download and print are disabled.'
  },
  grade3TeacherGuideVolume1: {
    label: 'Grade 3 Teacher Guide · Volume 1 · Online Review',
    owner: 'Curriculum Associates',
    url: 'https://online.flippingbook.com/view/336223898/',
    establishes: 'The publisher-listed 764-page browser review of the English Grade 3 Teacher Guide, Volume 1; download and print are disabled.'
  },
  grade3TeacherGuideVolume2: {
    label: 'Grade 3 Teacher Guide · Volume 2 · Online Review',
    owner: 'Curriculum Associates',
    url: 'https://online.flippingbook.com/view/336020956/',
    establishes: 'The publisher-listed 540-page browser review of the English Grade 3 Teacher Guide, Volume 2; download and print are disabled.'
  },
  grade3FluencySkillsPractice: {
    label: 'Grade 3 Fluency and Skills Practice · Online Review',
    owner: 'Curriculum Associates',
    url: 'https://online.flippingbook.com/view/336586740/',
    establishes: 'The publisher-listed 135-page browser review of Grade 3 Fluency and Skills Practice; download and print are disabled.'
  },
  grade3ReviewerGuide: {
    label: 'Classroom Mathematics California · Reviewer Guide',
    owner: 'Curriculum Associates',
    url: 'https://online.flippingbook.com/view/37754220/',
    establishes: 'The publisher-listed 14-page reviewer guide for navigating the California program review materials.'
  },
  grade3StudentDigitalResourcesDashboard: {
    label: 'Grade 3 Student Worktext · Digital Resources',
    owner: 'Curriculum Associates',
    url: 'https://online.flippingbook.com/view/336581625/4/',
    establishes: 'The Grade 3 Student Worktext identifies the Student Dashboard, assignments, Comprehension Checks, My Path when available, Personalized Instruction when available, and Interactive Practice.'
  },
  grade3StudentDigitalResourcesToolkit: {
    label: 'Grade 3 Student Worktext · Books, Games, and Math Tools',
    owner: 'Curriculum Associates',
    url: 'https://online.flippingbook.com/view/336581625/5/',
    establishes: 'The Grade 3 Student Worktext identifies its online worktext, videos, multilingual glossaries, family resources, Student Handbook, accessibility tools, learning games, digital math tools, and Fluency Flight.'
  },
  grade3TeacherPacing: {
    label: 'Grade 3 Teacher Guide · Yearly Pacing',
    owner: 'Curriculum Associates',
    url: 'https://online.flippingbook.com/view/336020956/14/',
    establishes: 'The Teacher Guide gives lesson-level session counts and unit totals: Unit 1, 21 days; Unit 2, 42; Unit 3, 30; Unit 4, 28; Unit 5, 16; and Unit 6, 18, plus separate diagnostic or practice-test windows.'
  },
  grade3TeacherProgramResources: {
    label: 'Grade 3 Teacher Guide · Program Resources',
    owner: 'Curriculum Associates',
    url: 'https://online.flippingbook.com/view/336020956/16/',
    establishes: 'The Teacher Guide distinguishes the print and online student, teacher, assessment, differentiation, family, and professional-learning resources.'
  },
  iReadyLogin: {
    label: 'i-Ready Connect Sign In',
    owner: 'Curriculum Associates',
    url: 'https://login.i-ready.com/',
    establishes: 'The official sign-in destination for school-provisioned i-Ready access.'
  },
  curriculumAssociatesOrdering: {
    label: 'How to Order',
    owner: 'Curriculum Associates',
    url: 'https://www.curriculumassociates.com/support/how-to-order',
    establishes: 'The publisher’s current ordering routes for quotes, purchase orders, and credit-card orders.'
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

export const GRADE3_CMC_BOOKS: Grade3CmcBook[] = [
  {
    id: 'student-v1',
    title: 'Student Worktext · Volume 1',
    audience: 'Student',
    volume: 1,
    isbn: '978-1-7280-9833-3',
    itemNumber: '38981.0',
    reviewPages: 548,
    coverage: 'Units 1–3 · Lessons 1–19',
    sourceUrl: SYLLABUS_BOOKS_SOURCES.grade3StudentWorktextVolume1.url
  },
  {
    id: 'student-v2',
    title: 'Student Worktext · Volume 2',
    audience: 'Student',
    volume: 2,
    isbn: '978-1-7280-9834-0',
    itemNumber: '38982.0',
    reviewPages: 396,
    coverage: 'Units 4–6 · Lessons 20–33',
    sourceUrl: SYLLABUS_BOOKS_SOURCES.grade3StudentWorktextVolume2.url
  },
  {
    id: 'teacher-v1',
    title: 'Teacher’s Guide · Volume 1',
    audience: 'Teacher',
    volume: 1,
    isbn: '978-1-7280-9851-7',
    itemNumber: '38981.9',
    reviewPages: 764,
    coverage: 'Program overview and Units 1–3',
    sourceUrl: SYLLABUS_BOOKS_SOURCES.grade3TeacherGuideVolume1.url
  },
  {
    id: 'teacher-v2',
    title: 'Teacher’s Guide · Volume 2',
    audience: 'Teacher',
    volume: 2,
    isbn: '978-1-7280-9852-4',
    itemNumber: '38982.9',
    reviewPages: 540,
    coverage: 'Program overview and Units 4–6',
    sourceUrl: SYLLABUS_BOOKS_SOURCES.grade3TeacherGuideVolume2.url
  },
  {
    id: 'fluency',
    title: 'Fluency and Skills Practice',
    audience: 'Student',
    isbn: '978-1-7280-9866-1',
    itemNumber: '38996.0',
    reviewPages: 135,
    coverage: '63 named practice sets across all 33 Grade 3 lessons',
    sourceUrl: SYLLABUS_BOOKS_SOURCES.grade3FluencySkillsPractice.url
  }
];

export const GRADE3_CMC_UNITS: Grade3CmcUnit[] = [
  {
    number: 1,
    title: 'Three-Digit Numbers',
    subtitle: 'Place Value, Addition, and Subtraction',
    volume: 1,
    printPages: '1–91',
    pacingDays: 21,
    stemProfile: 'Mae Jemison',
    performanceTask: 'School Lunches',
    bigIdeas: ['Number Flexibility to 100 for All Four Operations', 'Patterns in Four Operations'],
    sourceUrl: 'https://online.flippingbook.com/view/336581625/13/',
    lessons: [
      { number: 1, title: 'Use Place Value to Round Numbers', standards: '3.NBT.1', printPage: 7, sessions: 4 },
      { number: 2, title: 'Add Three-Digit Numbers', standards: '3.NBT.2', printPage: 29, sessions: 4 },
      { number: 3, title: 'Subtract Three-Digit Numbers', standards: '3.NBT.2', printPage: 51, sessions: 5 }
    ]
  },
  {
    number: 2,
    title: 'Multiplication and Division',
    subtitle: 'Concepts, Relationships, and Patterns',
    volume: 1,
    printPages: '93–303',
    pacingDays: 42,
    stemProfile: 'William “Bill” Hewlett',
    performanceTask: 'School Store',
    bigIdeas: ['Square Tiles', 'Number Flexibility to 100 for All Four Operations'],
    sourceUrl: 'https://online.flippingbook.com/view/336581625/105/',
    lessons: [
      { number: 4, title: 'Understand the Meaning of Multiplication', standards: '3.OA.1', printPage: 99, sessions: 3 },
      { number: 5, title: 'Multiply with 0, 1, 2, 5, and 10', standards: '3.OA.3, 3.OA.5, 3.OA.7', printPage: 111, sessions: 4 },
      { number: 6, title: 'Multiply with 3, 4, and 6', standards: '3.OA.3, 3.OA.5, 3.OA.7', printPage: 133, sessions: 5 },
      { number: 7, title: 'Multiply with 7, 8, and 9', standards: '3.OA.3, 3.OA.5, 3.OA.7', printPage: 161, sessions: 5 },
      { number: 8, title: 'Use Order and Grouping to Multiply', standards: '3.OA.5', printPage: 189, sessions: 5 },
      { number: 9, title: 'Use Place Value to Multiply', standards: '3.NBT.3', printPage: 217, sessions: 3 },
      { number: 10, title: 'Understand the Meaning of Division', standards: '3.OA.2', printPage: 233, sessions: 3 },
      { number: 11, title: 'Understand How Multiplication and Division Are Connected', standards: '3.OA.6', printPage: 245, sessions: 3 },
      { number: 12, title: 'Multiplication and Division Facts', standards: '3.OA.4, 3.OA.7', printPage: 257, sessions: 4 },
      { number: 13, title: 'Understand Patterns', standards: '3.OA.9', printPage: 279, sessions: 3 }
    ]
  },
  {
    number: 3,
    title: 'Multiplication',
    subtitle: 'Finding Area, Solving Word Problems, and Using Scaled Graphs',
    volume: 1,
    printPages: '307–465',
    pacingDays: 30,
    stemProfile: 'Rachel Carson',
    performanceTask: 'Dan’s Porch',
    bigIdeas: ['Square Tiles', 'Number Flexibility to 100 for All Four Operations', 'Patterns in Four Operations', 'Represent Multivariable Data'],
    sourceUrl: 'https://online.flippingbook.com/view/336581625/319/',
    lessons: [
      { number: 14, title: 'Understand Area', standards: '3.MD.5, 3.MD.5.a, 3.MD.5.b, 3.MD.6', printPage: 313, sessions: 3 },
      { number: 15, title: 'Multiply to Find Area', standards: '3.MD.7.a, 3.MD.7.b', printPage: 325, sessions: 4 },
      { number: 16, title: 'Add Areas', standards: '3.MD.7.c, 3.MD.7.d', printPage: 347, sessions: 4 },
      { number: 17, title: 'Solve One-Step Word Problems Using Multiplication and Division', standards: '3.OA.3', printPage: 369, sessions: 5 },
      { number: 18, title: 'Solve Two-Step Word Problems Using the Four Operations', standards: '3.OA.8', printPage: 397, sessions: 5 },
      { number: 19, title: 'Scaled Graphs', standards: '3.MD.3', printPage: 425, sessions: 5 }
    ]
  },
  {
    number: 4,
    title: 'Fractions',
    subtitle: 'Equivalence and Comparison, Measurement, and Data',
    volume: 2,
    printPages: '467–599',
    pacingDays: 28,
    stemProfile: 'Grant Imahara',
    performanceTask: 'Pizzeria',
    bigIdeas: ['Fractions as Relationships', 'Unit Fraction Models', 'Measuring'],
    sourceUrl: 'https://online.flippingbook.com/view/336471940/13/',
    lessons: [
      { number: 20, title: 'Understand What a Fraction Is', standards: '3.NF.1', printPage: 473, sessions: 3 },
      { number: 21, title: 'Understand Fractions on a Number Line', standards: '3.NF.2.a, 3.NF.2.b', printPage: 485, sessions: 3 },
      { number: 22, title: 'Understand Equivalent Fractions', standards: '3.NF.3.a', printPage: 497, sessions: 3 },
      { number: 23, title: 'Find Equivalent Fractions', standards: '3.NF.3.b, 3.NF.3.c', printPage: 509, sessions: 5 },
      { number: 24, title: 'Understand Comparing Fractions', standards: '3.NF.3.d', printPage: 537, sessions: 3 },
      { number: 25, title: 'Use Symbols to Compare Fractions', standards: '3.NF.3.d', printPage: 549, sessions: 3 },
      { number: 26, title: 'Measure Length and Plot Data on Line Plots', standards: '3.MD.4', printPage: 565, sessions: 4 }
    ]
  },
  {
    number: 5,
    title: 'Measurement',
    subtitle: 'Time, Liquid Volume, and Mass',
    volume: 2,
    printPages: '601–691',
    pacingDays: 16,
    stemProfile: 'Argelia Velez-Rodriguez',
    performanceTask: 'Aquarium Deliveries',
    bigIdeas: ['Number Flexibility to 100 for All Four Operations', 'Measuring'],
    sourceUrl: 'https://online.flippingbook.com/view/336471940/147/',
    lessons: [
      { number: 27, title: 'Time', standards: '3.MD.1', printPage: 607, sessions: 5 },
      { number: 28, title: 'Liquid Volume', standards: '3.MD.2', printPage: 635, sessions: 4 },
      { number: 29, title: 'Mass', standards: '3.MD.2', printPage: 657, sessions: 4 }
    ]
  },
  {
    number: 6,
    title: 'Shapes',
    subtitle: 'Attributes and Categories, Perimeter and Area, and Partitioning',
    volume: 2,
    printPages: '693–789',
    pacingDays: 18,
    stemProfile: 'David Hayes-Bautista',
    performanceTask: 'Quadrilateral Riddles',
    bigIdeas: ['Analyze Quadrilaterals', 'Fractions of Shape and Time'],
    sourceUrl: 'https://online.flippingbook.com/view/336471940/239/',
    lessons: [
      { number: 30, title: 'Understand Categories of Shapes', standards: '3.G.1', printPage: 699, sessions: 3 },
      { number: 31, title: 'Classify Quadrilaterals', standards: '3.G.1', printPage: 711, sessions: 4 },
      { number: 32, title: 'Area and Perimeter of Shapes', standards: '3.MD.8', printPage: 733, sessions: 5 },
      { number: 33, title: 'Partition Shapes into Parts with Equal Areas', standards: '3.G.2', printPage: 761, sessions: 3 }
    ]
  }
];


