export const READING_SCOPE_SOURCE =
  'https://static1.squarespace.com/static/64cae4391e09f2159371a541/t/64e660c923b355487a21356e/1692819670477/ELA%2B3rd%2BGrade%2BScope%2B%26%2BSequence.pdf';

export const MORELAND_CURRICULUM_SOURCE =
  'https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021541&type=d&uREC_ID=427284';

export const MORELAND_ASSESSMENT_SOURCE =
  'https://www.moreland.org/apps/pages/index.jsp?pREC_ID=1021540&type=d&uREC_ID=427284';

export const BAKER_CURRICULUM_SOURCE =
  'https://baker.moreland.org/apps/pages/index.jsp?pREC_ID=990480&type=d&uREC_ID=456713';

export const CALIFORNIA_ADOPTION_SOURCE =
  'https://www.cde.ca.gov/ci/rl/im/sbeadoptedelaeldprogs.asp';

export const SCCOE_STANDARDS_SOURCE =
  'https://www.sccoe.org/resources/standards/Pages/default.aspx';

export type ReadingSelection = {
  role: 'Short Read 1' | 'Short Read 2' | 'Extended Read 1' | 'Extended Read 2' | 'Word Study Read 1' | 'Word Study Read 2' | 'Word Study Read 3';
  title: string;
  genre: string;
  lexile: string;
};

export type ReadingWeek = {
  number: number;
  selections: ReadingSelection[];
  readingFocus: string[];
  wordStudy: string;
  writingFocus: string;
};

export type ReadingUnit = {
  id: string;
  number: number;
  title: string;
  accent: 'blue' | 'red' | 'gold' | 'green' | 'teal';
  weeks: [ReadingWeek, ReadingWeek, ReadingWeek];
};

// The verified public PDF is one page per unit. These are the printed footer
// page numbers in that Benchmark Education Company document.
export const READING_SCOPE_PRINTED_PAGES = [68, 70, 72, 74, 76, 78, 80, 82, 84, 86] as const;

const selection = (role: ReadingSelection['role'], title: string, genre: string, lexile: string): ReadingSelection => ({ role, title, genre, lexile });
const week = (number: number, selections: ReadingSelection[], readingFocus: string[], wordStudy: string, writingFocus: string): ReadingWeek => ({ number, selections, readingFocus, wordStudy, writingFocus });

export const READING_UNITS: ReadingUnit[] = [
  {
    id: 'u1', number: 1, title: 'Government for the People', accent: 'blue', weeks: [
      week(1, [
        selection('Short Read 1', 'Working Together', 'Informational text: Social Studies', '630'),
        selection('Short Read 2', 'Election Day', 'Informational text: Social Studies', '650'),
        selection('Word Study Read 1', "Robert's Rules of Order", 'Informational text: Social Studies', '520')
      ], ['Identify key details and determine main idea.', 'Analyze cause-and-effect connections and graphic features.', 'Analyze sequence and compare texts on the same topic.'], 'Short vowels', 'Narrative prompt and personal letter: gather evidence, plan, draft, revise, and edit.'),
      week(2, [
        selection('Extended Read 1', 'It Is My Right!', 'Informational text: Social Studies', '730'),
        selection('Word Study Read 2', 'Thomas Paine', 'Informational text: Social Studies', '630')
      ], ['Identify key details and summarize.', 'Use the text when answering questions; analyze cause and effect.', 'Draw inferences and compare texts on the same topic.'], 'Long a (VCe, ai, ay, a)', 'Informative/explanatory text: find evidence, plan, draft, revise, and edit.'),
      week(3, [
        selection('Extended Read 2', 'Winning the Right to Vote', 'Informational text: Social Studies', '760'),
        selection('Word Study Read 3', 'One Nation from Many', 'Informational text: Social Studies', '670')
      ], ['Identify main idea and key details.', 'Analyze informational genre features and sequential connections.', 'Use graphic features to infer; compare texts on the same topic.'], 'Long o and long u', 'Opinion text: find evidence, plan, draft, revise, and edit.')
    ]
  },
  {
    id: 'u2', number: 2, title: 'Ways Characters Shape Stories', accent: 'red', weeks: [
      week(1, [
        selection('Short Read 1', 'Two Fables from Aesop: The Peasant and the Apple Tree and The Fox and the Crow', 'Literary text: Fable', '600'),
        selection('Short Read 2', 'Two Famous Poems: The Ballad of John Henry and The Village Blacksmith', 'Literary text: Ballad', 'NP'),
        selection('Word Study Read 1', 'Geese for the Queen', 'Literary text: Folktale', '560')
      ], ['Identify key events and summarize.', 'Analyze genre features in fables, myths, folktales, and poetry.', 'Analyze and compare characters.'], 'Long e', 'Write a fable: analyze the prompt, find evidence, plan, draft, revise, and edit.'),
      week(2, [
        selection('Extended Read 1', 'The Tale of King Midas: A Greek Myth', 'Literary text: Myth', '640'),
        selection('Word Study Read 2', 'Theseus and the Minotaur', 'Literary text: Myth', '680')
      ], ['Identify key events and summarize.', 'Analyze how character traits influence a story.', 'Compare stories with similar characters.'], 'Long i', 'Explanatory text: find evidence, plan, draft, revise, and edit.'),
      week(3, [
        selection('Extended Read 2', 'Snow White: A Russian Folktale', 'Literary text: Folktale', '760'),
        selection('Word Study Read 3', 'Paul Bunyan’s Big Thirst', 'Literary text: Tall Tale', '660')
      ], ['Identify key events and summarize.', 'Analyze how illustrations convey mood and character.', 'Analyze and compare characters.'], 'Compound words', 'Opinion review: find evidence, plan, draft, revise, and edit.')
    ]
  },
  {
    id: 'u3', number: 3, title: 'Animal Adaptations', accent: 'gold', weeks: [
      week(1, [
        selection('Short Read 1', 'Animal Disguises', 'Informational text: Science', '720'),
        selection('Short Read 2', 'Animals’ Tools for Survival', 'Informational text: Science', '840'),
        selection('Word Study Read 1', 'The Remarkable Teeth of a Shark', 'Informational text: Science', '820')
      ], ['Identify key details and main idea.', 'Use information from photographs and charts.', 'Analyze compare-and-contrast connections and compare texts.'], 'r-controlled vowels /är/ and /ôr/', 'Research: analyze a guiding question, evaluate sources, search, and take notes.'),
      week(2, [
        selection('Extended Read 1', 'Fur, Skin, Scales, or Feathers', 'Informational text: Science', '740'),
        selection('Word Study Read 2', 'Caterpillar Self-Defense', 'Informational text: Science', '680')
      ], ['Identify key details and determine main idea.', 'Identify reasons and evidence.', 'Analyze compare-and-contrast connections; infer from text and graphics.'], 'r-controlled vowels er, ir, and ur', 'Research: evaluate print and online sources, use keywords, and take notes.'),
      week(3, [
        selection('Extended Read 2', 'One Body, Many Adaptations', 'Informational text: Science', '780'),
        selection('Word Study Read 3', 'How the Chameleon Learned to Change Color', 'Literary text: Pourquoi Tale', '560')
      ], ['Identify key details and determine main idea.', 'Identify reasons and evidence; infer causes and effects.', 'Compare texts on the same topic.'], 'Closed syllable pattern', 'Research: evaluate source authorship and web-page types, search, and take notes.')
    ]
  },
  {
    id: 'u4', number: 4, title: 'Comparing Points of View', accent: 'green', weeks: [
      week(1, [
        selection('Short Read 1', 'Cinderella’s Very Bad Day', 'Narrative nonfiction: Diary', '620'),
        selection('Short Read 2', 'Cinderella, Too Much for Words', 'Literary text: Play', 'NP'),
        selection('Word Study Read 1', 'Cap o’ Rushes', 'Literary text: Folktale', '530')
      ], ['Identify and summarize key events.', 'Identify narrator point of view and analyze drama.', 'Distinguish hyperbole and idioms; compare points of view.'], 'Open syllable pattern', 'Compare-and-contrast essay: use quotations, organize, link ideas, conclude, revise, and edit.'),
      week(2, [
        selection('Extended Read 1', 'Jack and the Beanstalk', 'Literary text: Fairy Tale', '710'),
        selection('Word Study Read 2', 'The Giant’s Complaint', 'Literary text: Humor', '590')
      ], ['Identify and summarize key events.', 'Distinguish the reader’s point of view from narrator and characters.', 'Compare and contrast points of view.'], 'Consonant-le syllable pattern', 'Write a play: plan, add stage directions, develop dialogue, revise, and edit.'),
      week(3, [
        selection('Extended Read 2', 'The True Jack?', 'Literary text: Play', 'NP'),
        selection('Word Study Read 3', 'The Beanstalk Experiment', 'Literary text: Science Fiction', '620')
      ], ['Identify and summarize key events.', 'Analyze how illustrations affect mood and point of view.', 'Compare stories and drama.'], 'Vowel-team syllable pattern', 'Opinion text using two sources: state an opinion, organize, draft, conclude, revise, and edit.')
    ]
  },
  {
    id: 'u5', number: 5, title: 'Advancements in Technology', accent: 'teal', weeks: [
      week(1, [
        selection('Short Read 1', 'Alexander Graham Bell: “It Talks!”', 'Informational text: Biography', '590'),
        selection('Short Read 2', 'From Telephone to FaceTime!', 'Informational text: Social Studies', '780'),
        selection('Word Study Read 1', 'The Longest Wire', 'Informational text: Social Studies', '650')
      ], ['Identify key details and determine main idea.', 'Review text connections and analyze author’s purpose.', 'Use text features and compare texts on the same topic.'], 'Vowel-C-e syllable pattern', 'Narrative: choose point of view, organize, use time/order words and dialogue, and revise with sensory details.'),
      week(2, [
        selection('Extended Read 1', 'Thomas Edison: “It Sings!”', 'Informational text: Biography', '800'),
        selection('Word Study Read 2', 'George Eastman and the Kodak Camera', 'Informational text: Social Studies', '650')
      ], ['Identify key details and determine main idea.', 'Analyze author’s purpose and sequential connections.', 'Compare and contrast sequential texts.'], 'Vowel-r syllable pattern', 'Evidence-based informational essay: combine text structures, organize, illustrate, draft, revise, and edit.'),
      week(3, [
        selection('Extended Read 2', 'From Phonograph to Playlist', 'Informational text: Social Studies', '750'),
        selection('Word Study Read 3', 'From Snapshots to Selfies', 'Informational text: Social Studies', '770')
      ], ['Identify key details and determine main idea.', 'Analyze cause/effect and sequential connections.', 'Draw inferences and compare texts on the same topic.'], 'Inflectional endings -ed and -ing', 'Opinion text: opening, organize from two sources, use an authoritative tone, draft, and revise.')
    ]
  },
  {
    id: 'u6', number: 6, title: 'Making Decisions', accent: 'blue', weeks: [
      week(1, [
        selection('Short Read 1', 'The Fox and the Geese', 'Literary text: Folktale', '560'),
        selection('Short Read 2', 'The Three Spinsters', 'Literary text: Folktale', '710'),
        selection('Word Study Read 1', 'The Incredible Goose', 'Informational text: Science', '770')
      ], ['Identify and summarize key events.', 'Analyze character traits and story elements.', 'Compare central lessons in stories by the same author.'], 'Irregular plurals', 'Research: organize relevant information, paraphrase, quote accurately, and evaluate findings.'),
      week(2, [
        selection('Extended Read 1', 'Doctor Knowall', 'Literary text: Folktale', '770'),
        selection('Word Study Read 2', 'The Kid and the Wolf', 'Literary text: Folktale', '660')
      ], ['Identify and summarize key events.', 'Analyze character point of view and actions.', 'Compare stories by the same author.'], 'Long oo and short oo', 'Research: search for sources, paraphrase, use direct quotations, and evaluate findings.'),
      week(3, [
        selection('Extended Read 2', 'The Wolf and the Fox', 'Literary text: Folktale', '770'),
        selection('Word Study Read 3', 'Canine Cousins: The Fox and the Wolf', 'Informational text: Science', '720')
      ], ['Identify and summarize key events.', 'Analyze how character actions influence events and determine central message.', 'Compare themes in stories by the same author.'], '/ou/ as in how and out', 'Research: search, paraphrase, quote accurately, and evaluate findings.')
    ]
  },
  {
    id: 'u7', number: 7, title: 'Communities Then and Now', accent: 'red', weeks: [
      week(1, [
        selection('Short Read 1', 'Exploring My Community', 'Narrative nonfiction: Personal Essay', '630'),
        selection('Short Read 2', 'A New Life in Vermont', 'Literary text: Realistic Fiction', '930'),
        selection('Word Study Read 1', 'The Mission District', 'Informational text: Social Studies', '740')
      ], ['Identify key details and main idea; analyze author point of view.', 'Identify and summarize literary events; infer from character actions.', 'Analyze illustrations and compare texts on the same topic.'], 'Suffixes -er and -or', 'Informative compare-and-contrast essay: avoid first person, organize, link facts, draft, revise, and edit.'),
      week(2, [
        selection('Extended Read 1', 'All Kinds of Communities', 'Narrative nonfiction: Personal Essay', '670'),
        selection('Word Study Read 2', 'The Levi Coffin House', 'Informational text: Social Studies', '710')
      ], ['Identify key details and main idea.', 'Analyze maps, photos, captions, and author’s point of view.', 'Compare two texts on the same topic.'], 'Homophones', 'Narrative: vary dialogue attribution, organize, develop characters, draft, revise, and edit.'),
      week(3, [
        selection('Extended Read 2', 'Sarah and the Chickens', 'Literary text: Historical Fiction', '630'),
        selection('Word Study Read 3', 'Wind and Wildflowers', 'Narrative nonfiction: Memoir', '670')
      ], ['Identify key details and summarize.', 'Identify historical-fiction genre features and analyze illustrations.', 'Infer from character actions and compare texts on the same topic.'], 'Variant vowel /ô/', 'Opinion essay from multiple sources: link reasons and evidence, draft, conclude, and revise.')
    ]
  },
  {
    id: 'u8', number: 8, title: 'Weather and Climate', accent: 'gold', weeks: [
      week(1, [
        selection('Short Read 1', 'Fairweather Clouds', 'Literary text: Free Verse', 'NP'),
        selection('Short Read 2', 'Earth’s Weather and Climate', 'Informational text: Science', '740'),
        selection('Word Study Read 1', 'Blizzard Alert!', 'Informational text: Science', '850')
      ], ['Respond to poetry and use text features.', 'Identify key details, main idea, and descriptive-text features.', 'Compare a poem and an informational text.'], 'Hard and soft c', 'Research project: choose topics using print and online sources, form questions, and categorize information.'),
      week(2, [
        selection('Extended Read 1', 'Water Sky', 'Literary text: Realistic Fiction', '810'),
        selection('Word Study Read 2', 'How Indian Summer Began', 'Literary text: Pourquoi Tale', '590')
      ], ['Identify and summarize key story events.', 'Identify realistic-fiction features and analyze text features.', 'Compare two texts on the same topic.'], 'Hard and soft g', 'Research and narrative: take notes, paraphrase, evaluate research, choose point of view, and plan.'),
      week(3, [
        selection('Extended Read 2', 'The Tropical Rain Belt', 'Informational text: Science', '860'),
        selection('Word Study Read 3', 'Predicting Hurricanes', 'Informational text: Science', '820')
      ], ['Identify key details and main idea.', 'Analyze graphic aids and descriptive-text connections.', 'Draw inferences and compare texts on the same topic.'], 'Diphthongs', 'Firsthand account: incorporate research, use temporal language, and bring the narrative to a close.')
    ]
  },
  {
    id: 'u9', number: 9, title: 'Spending Time and Money', accent: 'green', weeks: [
      week(1, [
        selection('Short Read 1', 'Making Choices: Ben Franklin’s “Two Cents” and The Ant and the Grasshopper', 'Informational text and fable', '710'),
        selection('Short Read 2', 'Let It Grow: The Booming Business of Farmers’ Markets', 'Informational text: Social Studies', '710'),
        selection('Word Study Read 1', 'The Milkmaid', 'Literary text: Folktale', '650')
      ], ['Identify main idea, key details, and story events.', 'Distinguish proverbs and analyze steps in a procedure.', 'Compare informational and literary texts.'], 'Prefixes dis- and un-', 'Research project: identify topics, formulate guiding questions, and categorize possible sources.'),
      week(2, [
        selection('Extended Read 1', 'Lazy Harry', 'Literary text: Folktale', '720'),
        selection('Word Study Read 2', 'Two Foolish Brothers', 'Literary text: Folktale', '630')
      ], ['Identify and summarize key story events.', 'Analyze idioms, illustrations, and character.', 'Determine theme.'], 'Prefixes pre- and re-', 'Informational essay: introduce, organize around main ideas, quote and credit sources, and conclude.'),
      week(3, [
        selection('Extended Read 2', 'From Fruit to Jam: A Tasty List of Choices', 'Informational text: Social Studies', '750'),
        selection('Word Study Read 3', 'Where Do You Get Your Produce?', 'Informational text: Social Studies', '730')
      ], ['Identify key details and main idea.', 'Analyze text connections, sidebars, and author purpose.', 'Compare authors’ points of view.'], 'Suffixes -able, -ful, and -less', 'Research: distinguish important information, interview, quote sources, evaluate quality, and plan an informational essay.')
    ]
  },
  {
    id: 'u10', number: 10, title: 'Forces and Interactions', accent: 'teal', weeks: [
      week(1, [
        selection('Short Read 1', 'Poems of Movement: “The Swing” and “The Wind”', 'Literary text: Rhymed Verse', 'NP'),
        selection('Short Read 2', 'What Makes Things Move?', 'Informational text: Science', '590'),
        selection('Word Study Read 1', 'The Tortoise and the Hare', 'Literary text: Fable', '520')
      ], ['Respond to poetry and identify rhymed-verse features.', 'Identify key details, main idea, and procedural-text features.', 'Compare the experience of reading poems and scientific text.'], 'Compound words', 'Research project: choose topics, formulate questions, and develop an opinion with reasons.'),
      week(2, [
        selection('Extended Read 1', 'The Great Tug-of-War', 'Literary text: Folktale', '710'),
        selection('Word Study Read 2', 'The Merchant’s Donkey', 'Literary text: Fable', '710')
      ], ['Identify and summarize key story events.', 'Distinguish shades of meaning and analyze imagery.', 'Draw inferences and read across texts.'], 'Suffixes -ment and -ness', 'Research an opinion: support reasons, address an opposing opinion, interview sources, and evaluate research.'),
      week(3, [
        selection('Extended Read 2', 'Investigate: Magnetism', 'Informational text: Science', '830'),
        selection('Word Study Read 3', 'Why Didn’t I Think of That?', 'Informational text: Science', '600')
      ], ['Identify key details and main idea.', 'Analyze multiple text formats and procedural text.', 'Draw inferences and integrate information from two texts.'], 'Related words', 'Opinion essay: state and support an opinion, link reasons, refute opposing views, and conclude.')
    ]
  }
];

export const readingUnitById = (unitId: string | null): ReadingUnit | undefined =>
  READING_UNITS.find((unit) => unit.id === unitId);

export const scopePrintedPage = (unit: ReadingUnit): number =>
  READING_SCOPE_PRINTED_PAGES[unit.number - 1];

export const weekForLesson = (unit: ReadingUnit, lessonNumber: number): ReadingWeek =>
  unit.weeks[Math.floor((lessonNumber - 1) / 5)];
