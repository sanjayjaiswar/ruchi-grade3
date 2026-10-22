const standards = 'https://www.cde.ca.gov/be/st/SS/documents/histsocscistnd.pdf';
const framework = 'https://www.cde.ca.gov/ci/hs/cf/documents/hssfwchapter6.pdf';

export interface SocialStudiesExpectation {
  code: string;
  title: string;
  scope: string;
}
export interface SocialStudiesChapter {
  id: string;
  number: number;
  title: string;
  question: string;
  standard: string;
  source: string;
  frameworkSource: string;
  color: string;
  soft: string;
  expectations: SocialStudiesExpectation[];
}

// Titles and scope are portal paraphrases, not textbook lessons. Each entry maps
// one-to-one to a CDE substandard on the linked printed pages 9–11 (PDF 16–18).
export const SOCIAL_STUDIES_CHAPTERS: SocialStudiesChapter[] = [
  {
    id: 'geography', number: 1, title: 'Geography',
    question: 'How do people and places shape each other?',
    standard: '3.1', source: `${standards}#page=16`, frameworkSource: `${framework}#page=3`,
    color: '#17685b', soft: '#e5f3ed',
    expectations: [
      { code: '3.1.1', title: 'Local geographic features', scope: 'Identify regional landforms and water features.' },
      { code: '3.1.2', title: 'Resources and environmental changes', scope: 'Trace local resource use and changes people make to their surroundings.' }
    ]
  },
  {
    id: 'native-peoples', number: 2, title: 'Native Peoples',
    question: 'Who are the Native peoples of our region?',
    standard: '3.2', source: `${standards}#page=16`, frameworkSource: `${framework}#page=4`,
    color: '#96522a', soft: '#fbefdf',
    expectations: [
      { code: '3.2.1', title: 'Identity and traditions', scope: 'Study national identities, religious beliefs, customs, and folklore.' },
      { code: '3.2.2', title: 'Geography and daily life', scope: 'Connect climate and geography with obtaining food, clothing, and tools.' },
      { code: '3.2.3', title: 'Economies and tribal governments', scope: 'Study tribal economies, governments, constitutions, and state–federal relationships.' },
      { code: '3.2.4', title: 'Interactions with settlers', scope: 'Examine encounters between newcomers and established local Native communities.' }
    ]
  },
  {
    id: 'community-history', number: 3, title: 'Community History',
    question: 'How has our community developed over time?',
    standard: '3.3', source: `${standards}#page=17`, frameworkSource: `${framework}#page=5`,
    color: '#7354a0', soft: '#f0eaf8',
    expectations: [
      { code: '3.3.1', title: 'Explorers and newcomers', scope: 'Research arrivals, continuing migration, cultural and religious traditions, and contributions.' },
      { code: '3.3.2', title: 'Economic foundations', scope: 'Connect settler economies with today, including private property and entrepreneurship.' },
      { code: '3.3.3', title: 'Founding and change', scope: 'Use primary evidence to trace community origins, contributions, and development.' }
    ]
  },
  {
    id: 'government-citizenship', number: 4, title: 'Government & Citizenship',
    question: 'How do government and civic participation work?',
    standard: '3.4', source: `${standards}#page=17`, frameworkSource: `${framework}#page=7`,
    color: '#345e9b', soft: '#e9f0fb',
    expectations: [
      { code: '3.4.1', title: 'Rules, laws, and the Constitution', scope: 'Examine their purposes, citizenship in lawmaking, and consequences of violations.' },
      { code: '3.4.2', title: 'Civic responsibility', scope: 'Explore public virtue and participation in classrooms, communities, and civic life.' },
      { code: '3.4.3', title: 'Landmarks, symbols, and documents', scope: 'Investigate local and national examples, their histories, and shared ideals.' },
      { code: '3.4.4', title: 'Government branches', scope: 'Understand legislative, executive, and judicial branches, emphasizing local government.' },
      { code: '3.4.5', title: 'The federal system', scope: 'Study how California, other states, and sovereign tribes contribute and participate.' },
      { code: '3.4.6', title: 'People who secured freedoms', scope: 'Explore lives of Americans who risked themselves for freedom.' }
    ]
  },
  {
    id: 'economics', number: 5, title: 'Economics',
    question: 'How does our local economy work?',
    standard: '3.5', source: `${standards}#page=18`, frameworkSource: `${framework}#page=12`,
    color: '#8c6016', soft: '#faf1d6',
    expectations: [
      { code: '3.5.1', title: 'Resources and production', scope: 'Compare local production using natural, human, and capital resources, past and present.' },
      { code: '3.5.2', title: 'Where goods originate', scope: 'Distinguish local, other U.S., and overseas production.' },
      { code: '3.5.3', title: 'Choices and trade-offs', scope: 'Weigh costs and benefits when making economic choices.' },
      { code: '3.5.4', title: 'Education and human capital', scope: 'Connect schoolwork with developing personal capabilities.' }
    ]
  }
];
