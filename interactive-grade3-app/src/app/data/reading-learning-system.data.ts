export const CALIFORNIA_GRADE3_ELA_STANDARDS_SOURCE =
  'https://www2.cde.ca.gov/cacs/ela?dl=0&maxgrade=3&mingrade=3&order=0&page=0&perpage=50';

export const CALIFORNIA_TEXT_COMPLEXITY_SOURCE =
  'https://www.cde.ca.gov/ci/rl/cf/documents/elaeldfwchapter2.pdf';

export const CAASPP_ELA_SCORE_SOURCE =
  'https://www.caaspp-elpac.org/s/docs/scoresmeanela.pdf';

export const BAKER_2025_SPSA_SOURCE =
  'https://4.files.edl.io/8b0c/11/12/25/163836-0e42c10d-39b5-4494-a1bb-290af8913064.pdf';

export const LEXILE_FRAMEWORK_SOURCE =
  'https://hub.lexile.com/faqs/';

export type ElaStandard = {
  code: string;
  summary: string;
  note?: string;
};

export type ElaStandardCluster = {
  name: string;
  standards: ElaStandard[];
};

export type ElaStandardDomain = {
  id: 'rl' | 'ri' | 'rf' | 'w' | 'sl' | 'l';
  name: string;
  plainLanguage: string;
  source: string;
  clusters: ElaStandardCluster[];
};

const standardsUrl = (domain: number) =>
  `https://www2.cde.ca.gov/cacs/ela?c0=1&c1=${domain}&dl=0&maxgrade=3&mingrade=3&order=0&perpage=20`;

export const GRADE3_ELA_DOMAINS: ElaStandardDomain[] = [
  {
    id: 'rl',
    name: 'Reading Standards for Literature',
    plainLanguage: 'Understand stories, dramas, and poetry through evidence, structure, point of view, illustrations, and comparison.',
    source: standardsUrl(6),
    clusters: [
      {
        name: 'Key ideas and details',
        standards: [
          { code: 'RL.3.1', summary: 'Ask and answer questions, referring explicitly to the text as the basis for answers.' },
          { code: 'RL.3.2', summary: 'Recount stories, fables, folktales, and myths; determine a central message, lesson, or moral and explain how key details convey it.' },
          { code: 'RL.3.3', summary: 'Describe story characters and explain how their traits, motivations, feelings, and actions contribute to events.' }
        ]
      },
      {
        name: 'Craft and structure',
        standards: [
          { code: 'RL.3.4', summary: 'Determine the meaning of words and phrases in a text, distinguishing literal from nonliteral language.' },
          { code: 'RL.3.5', summary: 'Refer to chapters, scenes, and stanzas and describe how successive parts build on earlier parts.' },
          { code: 'RL.3.6', summary: 'Distinguish the reader’s point of view from that of the narrator or characters.' }
        ]
      },
      {
        name: 'Knowledge, ideas, and reading range',
        standards: [
          { code: 'RL.3.7', summary: 'Explain how specific aspects of illustrations contribute to what the words convey.' },
          { code: 'RL.3.8', summary: 'Not applicable to literature.', note: 'The CDE retains this numbered record so the cross-domain numbering stays aligned.' },
          { code: 'RL.3.9', summary: 'Compare and contrast themes, settings, and plots in stories by the same author about the same or similar characters.' },
          { code: 'RL.3.10', summary: 'By year end, read and comprehend literature at the high end of the Grades 2–3 text-complexity band independently and proficiently.' }
        ]
      }
    ]
  },
  {
    id: 'ri',
    name: 'Reading Standards for Informational Text',
    plainLanguage: 'Understand nonfiction through main ideas, evidence, relationships, vocabulary, features, point of view, graphics, and comparison.',
    source: standardsUrl(3),
    clusters: [
      {
        name: 'Key ideas and details',
        standards: [
          { code: 'RI.3.1', summary: 'Ask and answer questions, referring explicitly to the text as the basis for answers.' },
          { code: 'RI.3.2', summary: 'Determine the main idea, recount key details, and explain how the details support the main idea.' },
          { code: 'RI.3.3', summary: 'Describe relationships among historical events, scientific ideas, or procedural steps using time, sequence, and cause/effect language.' }
        ]
      },
      {
        name: 'Craft and structure',
        standards: [
          { code: 'RI.3.4', summary: 'Determine the meaning of general academic and domain-specific words and phrases.' },
          { code: 'RI.3.5', summary: 'Use text features and search tools such as key words, sidebars, and hyperlinks to locate information efficiently.' },
          { code: 'RI.3.6', summary: 'Distinguish the reader’s point of view from the author’s point of view.' }
        ]
      },
      {
        name: 'Knowledge, ideas, and reading range',
        standards: [
          { code: 'RI.3.7', summary: 'Use illustrations and words together to demonstrate understanding.' },
          { code: 'RI.3.8', summary: 'Describe logical connections among sentences and paragraphs, including comparison, cause/effect, and sequence.' },
          { code: 'RI.3.9', summary: 'Compare and contrast the most important points and key details in two texts on the same topic.' },
          { code: 'RI.3.10', summary: 'By year end, read and comprehend informational texts at the high end of the Grades 2–3 text-complexity band independently and proficiently.' }
        ]
      }
    ]
  },
  {
    id: 'rf',
    name: 'Reading Standards: Foundational Skills',
    plainLanguage: 'Decode unfamiliar words accurately and read connected text with accuracy, purpose, rate, expression, and self-correction.',
    source: standardsUrl(2),
    clusters: [
      {
        name: 'Phonics, word recognition, and fluency',
        standards: [
          { code: 'RF.3.3', summary: 'Apply Grade 3 phonics and word-analysis skills: common prefixes and derivational suffixes, common Latin suffixes, multisyllabic words, and irregularly spelled words.' },
          { code: 'RF.3.4', summary: 'Read with sufficient accuracy and fluency; read purposefully, use appropriate rate and expression, and use context to confirm or self-correct.' }
        ]
      }
    ]
  },
  {
    id: 'w',
    name: 'Writing Standards',
    plainLanguage: 'Write opinions, explanations, and narratives; plan, revise, publish, research, take notes, and write for different purposes and time frames.',
    source: standardsUrl(8),
    clusters: [
      {
        name: 'Text types and purposes',
        standards: [
          { code: 'W.3.1', summary: 'Write opinion pieces that state a point of view, organize and support reasons, use linking words, and conclude.' },
          { code: 'W.3.2', summary: 'Write informative/explanatory texts that group related information, develop facts and definitions, use linking words, and conclude.' },
          { code: 'W.3.3', summary: 'Write narratives with a clear situation, sequence, dialogue and description, temporal words, and a sense of closure.' }
        ]
      },
      {
        name: 'Production and distribution',
        standards: [
          { code: 'W.3.4', summary: 'With guidance and support, produce writing whose development and organization fit the task and purpose.' },
          { code: 'W.3.5', summary: 'With peer and adult guidance, strengthen writing through planning, revising, and editing.' },
          { code: 'W.3.6', summary: 'With adult guidance, use technology and keyboarding to produce, publish, interact, and collaborate.' }
        ]
      },
      {
        name: 'Research and range of writing',
        standards: [
          { code: 'W.3.7', summary: 'Conduct short research projects that build knowledge about a topic.' },
          { code: 'W.3.8', summary: 'Recall or gather information from print and digital sources, take brief notes, and sort evidence into categories.' },
          { code: 'W.3.9', summary: 'Begins in Grade 4.', note: 'This is an explicit CDE placeholder, not a Grade 3 expectation.' },
          { code: 'W.3.10', summary: 'Write routinely over extended and shorter time frames for varied tasks, purposes, and audiences.' }
        ]
      }
    ]
  },
  {
    id: 'sl',
    name: 'Speaking and Listening Standards',
    plainLanguage: 'Prepare for discussions, listen and question carefully, explain ideas, and present information clearly with appropriate details and media.',
    source: standardsUrl(7),
    clusters: [
      {
        name: 'Comprehension and collaboration',
        standards: [
          { code: 'SL.3.1', summary: 'Participate effectively in collaborative discussions: prepare, follow rules, ask questions, stay on topic, connect comments, and explain ideas.' },
          { code: 'SL.3.2', summary: 'Determine main ideas and supporting details from read-aloud text and information presented in visual, quantitative, and oral formats.' },
          { code: 'SL.3.3', summary: 'Ask and answer questions about a speaker’s information with appropriate elaboration and detail.' }
        ]
      },
      {
        name: 'Presentation of knowledge and ideas',
        standards: [
          { code: 'SL.3.4', summary: 'Report on a topic or text, tell a story, or recount an experience with relevant facts and descriptive details at an understandable pace.' },
          { code: 'SL.3.5', summary: 'Create fluid audio recordings of stories or poems and add visual displays when they strengthen facts or details.' },
          { code: 'SL.3.6', summary: 'Speak in complete sentences when the task and situation require detail or clarification.' }
        ]
      }
    ]
  },
  {
    id: 'l',
    name: 'Language Standards',
    plainLanguage: 'Use Grade 3 grammar, usage, capitalization, punctuation, spelling, language choices, context, word parts, references, and vocabulary.',
    source: standardsUrl(1),
    clusters: [
      {
        name: 'Conventions of standard English',
        standards: [
          { code: 'L.3.1', summary: 'Use Grade 3 grammar and usage, including nouns, pronouns, verbs, agreement, modifiers, conjunctions, and simple, compound, and complex sentences.' },
          { code: 'L.3.2', summary: 'Use Grade 3 capitalization, punctuation, and spelling conventions, including dialogue, possessives, suffixes, patterns, and reference materials.' }
        ]
      },
      {
        name: 'Knowledge of language and vocabulary',
        standards: [
          { code: 'L.3.3', summary: 'Use knowledge of language and conventions: choose words and phrases for effect and recognize differences between spoken and written standard English.' },
          { code: 'L.3.4', summary: 'Determine unknown and multiple-meaning words using context, affixes and roots, known roots, and glossaries or dictionaries.' },
          { code: 'L.3.5', summary: 'Understand word relationships and nuances: literal/nonliteral meanings, real-life connections, and shades of meaning.' },
          { code: 'L.3.6', summary: 'Acquire and use conversational, academic, and domain-specific words and phrases, including spatial and temporal signal words.' }
        ]
      }
    ]
  }
];

export const GRADE3_ELA_STANDARD_COUNT = GRADE3_ELA_DOMAINS.reduce(
  (total, domain) => total + domain.clusters.reduce((domainTotal, cluster) => domainTotal + cluster.standards.length, 0),
  0
);

export type AssessmentRecord = {
  name: string;
  scope: string;
  cadence: string;
  meaning: string;
  source: string;
  confidence: 'District-published' | 'School-plan evidence' | 'State-published';
};

export const GRADE3_ASSESSMENT_SYSTEM: AssessmentRecord[] = [
  {
    name: 'Classroom evidence',
    scope: 'Day-to-day instruction',
    cadence: 'Ongoing',
    meaning: 'Moreland names classroom observations, checks for understanding, exit slips, running records, and classroom exams as measures teachers use to adjust instruction.',
    source: 'https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021540&type=d&uREC_ID=427284',
    confidence: 'District-published'
  },
  {
    name: 'Scholastic Reading Inventory (SRI)',
    scope: 'Moreland Grades 3–8',
    cadence: 'Twice yearly',
    meaning: 'A district-listed reading inventory. The public district table does not publish Grade 3 score targets, testing dates, or an individual learner placement.',
    source: 'https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021540&type=d&uREC_ID=427284',
    confidence: 'District-published'
  },
  {
    name: 'ELA benchmarks',
    scope: 'Moreland Grades 3–8',
    cadence: 'Three times yearly',
    meaning: 'District benchmark checks. The public table does not expose the Grade 3 forms, question sequence, dates, or individual results.',
    source: 'https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021540&type=d&uREC_ID=427284',
    confidence: 'District-published'
  },
  {
    name: 'CAASPP / Smarter Balanced ELA',
    scope: 'California Grades 3–8 and 11',
    cadence: 'Yearly',
    meaning: 'A computer-adaptive assessment plus performance task, reported overall and through Reading and Listening plus Writing and Research/Inquiry composite areas.',
    source: CAASPP_ELA_SCORE_SOURCE,
    confidence: 'State-published'
  }
];

export const BAKER_ASSESSMENT_EVIDENCE = [
  'Baker’s 2025–26 school plan says its planning analyzed CAASPP, iReady Benchmark, Fountas & Pinnell, and Panorama data.',
  'The plan calls for appropriate grade-level local assessments using iReady, Fountas & Pinnell, SRI, and classroom assessments.',
  'The public plan does not identify which of those measures every Grade 3 learner receives, nor does it publish an individual Grade 3 target level.'
];

export const READING_LEVEL_FACTS = [
  {
    label: 'Grade 3 year-end reading expectation',
    fact: 'California expects independent and proficient comprehension at the high end of the Grades 2–3 text-complexity band. The CDE framework gives 420L–820L as one quantitative text band; it is not an individual learner placement.',
    source: CALIFORNIA_TEXT_COMPLEXITY_SOURCE
  },
  {
    label: 'Lexile numbers',
    fact: 'A Lexile measure can describe either reader ability or text difficulty. The publisher Lexile labels in this portal describe selections; they are not Ruchika’s reading score.',
    source: LEXILE_FRAMEWORK_SOURCE
  },
  {
    label: 'Fountas & Pinnell',
    fact: 'Moreland’s district assessment table lists F&P Early Literacy for TK–2. Baker’s school plan also uses F&P in schoolwide ELA planning. Those sources do not establish a public Grade 3 learner target for this portal.',
    source: BAKER_2025_SPSA_SOURCE
  },
  {
    label: 'SRI',
    fact: 'Moreland lists SRI for Grades 3–8 twice yearly. Without an official learner report or district target table, this portal does not estimate a score, placement, or growth goal.',
    source: 'https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021540&type=d&uREC_ID=427284'
  }
];
