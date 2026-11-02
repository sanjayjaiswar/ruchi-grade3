/**
 * Original, standards-linked formative tasks. Not Savvas/Moreland textbook pages.
 * Each fact-bearing task points to the relevant primary institution or curriculum.
 * This is formative practice, not evidence of student mastery or persisted progress.
 */
export interface SocialStudiesActivity {
  objective: string;
  vocabulary: { term: string; meaning: string }[];
  observe: string;
  observeAnswer: string;
  question: string;
  options: [string, string, string];
  correctIndex: 0 | 1 | 2;
  explanation: string;
  misconception: string;
  independent: string;
  sample: string;
  source: { label: string; url: string };
}
export interface SocialStudiesTimelineEvent {
  year: string;
  description: string;
  source: { label: string; url: string };
}
const cde = 'https://www.cde.ca.gov/be/st/SS/documents/histsocscistnd.pdf';
const npsAnza = 'https://www.nps.gov/juba/learn/historyculture/california-anza-trail-sites.htm';
const historyCanning = 'https://historysanjose.org/plan-your-visit/exhibits-activities/online-exhibits/cannery-life-del-monte-in-the-santa-clara-valley/';
const historyNgShing = 'https://chinesemuseum.historysanjose.org/ng-shing-gung/';
const map1869 = 'https://www.loc.gov/item/75693107/';
const prusch = 'https://www.sanjoseca.gov/Home/Components/FacilityDirectory/FacilityDirectory/2180/2028';
const npsOhlone = 'https://www.nps.gov/articles/ohlones-and-coast-miwoks.htm';
const bia = 'https://www.bia.gov/faqs/what-does-tribal-sovereignty-mean-american-indians-and-alaska-natives';
const npsTubman = 'https://www.nps.gov/people/harriet-tubman.htm';
const constitution = 'https://www.archives.gov/founding-docs/constitution';
const sanJoseCity = 'https://www.sanjoseca.gov/your-government/departments-offices/office-of-the-city-manager';
export const SOCIAL_STUDIES_ACTIVITIES: Record<string, SocialStudiesActivity> = {
  '3.1.1': {
    objective: 'Use a map title, legend, and features to describe a regional place.',
    vocabulary: [{term:'legend',meaning:'a guide to a map’s symbols and colors'},{term:'peninsula',meaning:'land with water on three sides'}],
    observe: 'Look at the map already shown in this lesson. What does its color key describe? Do not guess from the colors alone.',
    observeAnswer: 'The map key identifies protected marine areas. A colored region is not automatically a different landform.',
    question: 'A blue area appears on a map. What should a careful map reader do first?',
    options: ['Assume it is an ocean.', 'Read the map title and legend.', 'Assume it is a mountain.'],
    correctIndex: 1,
    explanation: 'The legend tells us what a color or symbol means on this particular map.',
    misconception: 'Colors have no single meaning across every map. Check the legend.',
    independent: 'Name one landform and one body of water shown or described. Explain how you know.',
    sample: 'Point Reyes is a peninsula, and the Pacific Ocean surrounds it on three sides. I used the map labels and description.',
    source: {label:'California standard 3.1.1 and map inquiry',url:cde+'#page=16'}
  },
  '3.1.2': {
    objective: 'Explain how one local resource is used and how a change affects people and nature.',
    vocabulary: [{term:'resource',meaning:'something people use to meet a need'},{term:'impact',meaning:'an effect of an action'}],
    observe: 'Look at the local land or wetland image. What changed, and what evidence in the picture supports your observation?',
    observeAnswer: 'First describe visible land, water, plants, or buildings. A photograph alone does not always explain why a change happened.',
    question: 'A community changes a wetland to build a road. Which question best investigates the impact?',
    options: ['What does the road help, and what happens to the habitat?', 'Is the road a nice color?', 'Does everyone want to drive?'],
    correctIndex: 0,
    explanation: 'Historical and geographic inquiry looks at both a human need and its effect on the environment.',
    misconception: 'A change can help one need while creating a cost elsewhere.',
    independent: 'Draw or describe a resource-use chain: natural resource, how people use it, and one possible effect.',
    sample: 'Water → irrigates a garden → helps plants grow, but the community must also consider how much water it uses.',
    source: {label:'California standard 3.1.2',url:cde+'#page=16'}
  },
  '3.2.1': {
    objective: 'Describe local Native communities by their own names and recognize traditions and continuing lives today.',
    vocabulary: [{term:'identity',meaning:'how a person or community describes who they are'},{term:'tradition',meaning:'a practice or knowledge shared across generations'}],
    observe: 'Examine the credited Native-history source. Which community does it identify, and who tells the story?',
    observeAnswer: 'Use the exact community name and the source author; do not treat all Ohlone communities as one identical group.',
    question: 'Which is the most respectful way to learn about a Native community?',
    options: ['Invent a story about its ceremonies.', 'Assume its people existed only in the past.', 'Use its name and community-authored account.'],
    correctIndex: 2,
    explanation: 'Named communities and their own accounts help avoid stereotypes and show continuity.',
    misconception: 'Native cultures are living and diverse, not one vanished group.',
    independent: 'Write two facts from a named, attributed Native-community source. Include one fact about the community today.',
    sample: 'I would name the community, link to its own account, and distinguish a documented present-day fact from a historical one.',
    source: {label:'California standard 3.2.1',url:cde+'#page=16'}
  },
  '3.2.2': {
    objective: 'Connect a local environment with documented food, clothing, or toolmaking methods.',
    vocabulary: [{term:'tule',meaning:'a wetland reed used in some local traditional technologies'},{term:'material',meaning:'what an object is made from'}],
    observe: 'Study the National Park Service tule-boat illustration and its caption. What material and skill are connected?',
    observeAnswer: 'The pictured boat is made from tule reeds using learned construction knowledge. It is a modern explanatory drawing, not a historical photo.',
    question: 'Which explanation best connects environment and technology?',
    options: ['The maker used locally available tule reeds and boatmaking knowledge.', 'The boat built itself in the wetland.', 'Every Native community made the same boat.'],
    correctIndex: 0,
    explanation: 'A useful object depends on materials available in a place and people’s expertise.',
    misconception: 'Do not assume every named Native group made objects in the same way.',
    independent: 'Choose one sourced local object. Explain its material, purpose, and evidence.',
    sample: 'A tule boat uses wetland reeds. I would cite the NPS caption for how it was used.',
    source: {label:'National Park Service · Ohlone and Coast Miwok history',url:'https://www.nps.gov/places/000/6-heritage-of-a-bayshore-culture.htm'}
  },
  '3.2.3': {
    objective: 'Distinguish tribal sovereignty and government from city government, with evidence.',
    vocabulary: [{term:'sovereignty',meaning:'a government’s authority to govern itself'},{term:'constitution',meaning:'a written system of basic governing principles'}],
    observe: 'Read the attributed tribal-governance example in the lesson. What decisions does that government make?',
    observeAnswer: 'Identify the particular government and its documented responsibilities. The arrangement varies by tribe.',
    question: 'Which statement about tribal government is accurate?',
    options: ['Every tribe is a department of its nearest city.', 'Tribal governments exercise their own governmental authority.', 'All tribes use exactly the same constitution.'],
    correctIndex: 1,
    explanation: 'Tribal nations are governments, and their authority is not the same as a city department.',
    misconception: 'Tribal identity, sovereign authority, and federal-recognition status must not be treated as synonyms.',
    independent: 'Describe one documented responsibility of a named tribal government and cite its own source.',
    sample: 'Name the tribal government, one published governing responsibility, and the source. Avoid guessing its legal status.',
    source: {label:'Bureau of Indian Affairs · Tribal sovereignty',url:bia}
  },
  '3.2.4': {
    objective: 'Describe an encounter from more than one perspective, including effects on Native communities.',
    vocabulary: [{term:'colonization',meaning:'outsiders taking control and creating settlements in a place'},{term:'continuity',meaning:'what carries on through change'}],
    observe: 'Find evidence of newcomers’ arrival and Native people’s lives in the sources already linked. Whose perspective is visible?',
    observeAnswer: 'Record who made each account and what it can tell us; look for Native perspectives and communities today.',
    question: 'Which question makes a more complete account of colonization?',
    options: ['What did newcomers build, and how were Native people affected?', 'What did settlers wear?', 'How can we skip Native people from the story?'],
    correctIndex: 0,
    explanation: 'A balanced historical account includes newcomers’ actions, Native experiences, and lasting effects.',
    misconception: 'Settlement did not begin human history in California, and Native people are still here.',
    independent: 'Make two evidence notes: a documented newcomer action and a documented Native experience or response.',
    sample: 'I would date both events, identify the sources and explain the effect without assuming every community had the same experience.',
    source: {label:'California standard 3.2.4',url:cde+'#page=16'}
  },
  '3.3.1': {
    objective: 'Research a regional explorer, later newcomers, and documented cultural or religious contributions.',
    vocabulary: [{term:'expedition',meaning:'a planned journey for a purpose'},{term:'migration',meaning:'movement of people from one place to another'},{term:'contribution',meaning:'something people bring or do that shapes a community'}],
    observe: 'Compare the Anza Trail account with the local history of the 1888 Ng Shing Gung. Who moved or acted, and what evidence of community life remains?',
    observeAnswer: 'NPS documents Anza’s 1776 exploratory passage through Santa Clara County. The local museum documents Ng Shing Gung as an 1888 Chinese community cultural and religious center. These are different stories, not one group.',
    question: 'Which pair is supported by the two history sources?',
    options: ['Anza explored through Santa Clara County; Ng Shing Gung served as a community center.', 'Anza built Ng Shing Gung in 1776.', 'All newcomers shared one reason to move and one religion.'],
    correctIndex: 0,
    explanation: 'The sources identify different people, periods, and contributions. Research needs those distinctions.',
    misconception: 'The Spanish pueblo’s founding is not the beginning of Native history; cultural or religious traditions cannot be guessed from identity.',
    independent: 'Make a two-row arrival-and-contribution card with names, dates, one supported action, and one question still unanswered.',
    sample: '1776: Anza’s exploratory group traveled through Santa Clara County (NPS). 1888: Ng Shing Gung served Chinese residents as a religious and cultural center (History San José). I still need a family account to know an individual motive.',
    source: {label:'NPS · Anza Trail in Santa Clara County',url:npsAnza}
  },
  '3.3.2': {
    objective: 'Explain how a local historical business used property and entrepreneurship and influenced later work.',
    vocabulary: [{term:'entrepreneur',meaning:'someone who organizes a business and takes risks'},{term:'private property',meaning:'things owned by people or organizations rather than the public'},{term:'economy',meaning:'how a community produces and uses goods and services'}],
    observe: 'Read the museum account of the Dawson family’s early canning business. What did the family contribute, and which tools or land were needed?',
    observeAnswer: 'The museum credits the Dawson family with an early successful commercial fruit-canning operation, using cooking, scientific, and tinsmith skills. The growing business needed equipment, supplies, and space.',
    question: 'What makes the Dawson family’s canning work an example of entrepreneurship?',
    options: ['The peaches were growing outdoors.', 'The family organized skills and equipment to create a commercial product.', 'Every orchard was owned by the city.'],
    correctIndex: 1,
    explanation: 'Entrepreneurs combine resources and skills to develop a business, with uncertainty and risk.',
    misconception: 'Learning the word entrepreneurship is not enough; link the actual enterprise to local work, land, and later changes.',
    independent: 'Use the museum timeline to explain one way fruit canning changed local jobs or transportation. Identify an actual consequence and its source.',
    sample: 'The museum records that San José’s canning businesses processed fruit for shipment beyond local markets; this connected orchard growing to factory work and transport.',
    source: {label:'History San José · Cannery Life',url:historyCanning}
  },
  '3.3.3': {
    objective: 'Use dated maps and other evidence to explain local founding, people’s contributions, and change.',
    vocabulary: [{term:'primary source',meaning:'evidence made during the time studied'},{term:'timeline',meaning:'events placed in date order'},{term:'inference',meaning:'a possible explanation built from evidence'}],
    observe: 'Study the 1869 bird’s-eye view from the Library of Congress. Which details can you see, and what would require a second source?',
    observeAnswer: 'You can observe drawn streets and buildings. The picture alone cannot prove a family’s motivations, exact street measurements, or all changes after 1869.',
    question: 'What can the 1869 map most directly help us investigate?',
    options: ['The exact feelings of every resident.', 'The future of technology jobs.', 'The arrangement of streets and buildings in a historical view.'],
    correctIndex: 2,
    explanation: 'A period image supports visible spatial evidence; a reason or later change needs another source.',
    misconception: 'A later museum interpretation is not the same source type as an image made in 1869; a bird’s-eye drawing is not to scale.',
    independent: 'Put the 1777 pueblo, 1869 map and 1962 park donation in order. Make one then-and-now claim and cite two sources.',
    sample: '1777 → 1869 → 1962. San José grew from its Spanish pueblo period into a mapped city, and later some former farm land was protected as Emma Prusch Farm Park. A historical map and city park history support separate parts of that statement.',
    source: {label:'Library of Congress · San José, 1869',url:map1869}
  },
  '3.4.1': {
    objective: 'Explain why rules, laws, and the Constitution exist and how people help improve rules.',
    vocabulary: [{term:'law',meaning:'a rule made and enforced by government'},{term:'Constitution',meaning:'the basic framework of U.S. government'}],
    observe: 'Look at the National Archives Constitution image and the opening words. What group is government supposed to serve?',
    observeAnswer: 'The document opens with “We the People,” signaling that it establishes government for the people.',
    question: 'What is one major purpose of the U.S. Constitution?',
    options: ['To list every school’s lunch menu.', 'To establish the structure and powers of national government.', 'To pick a classroom game.'],
    correctIndex: 1,
    explanation: 'The Constitution organizes government, while classroom rules address narrower shared needs.',
    misconception: 'A classroom rule can be a helpful comparison, but it is not a federal law or the Constitution.',
    independent: 'Propose one fair classroom rule; explain its purpose and how students could help improve it.',
    sample: 'Everyone gets a speaking turn, because people need to be heard. Students could discuss whether the rule works fairly.',
    source: {label:'U.S. National Archives · Constitution',url:constitution}
  },
  '3.4.2': {
    objective: 'Practice responsible community participation using reasons and listening.',
    vocabulary: [{term:'civic',meaning:'connected with community and government'},{term:'responsibility',meaning:'something a person should do or care for'}],
    observe: 'Read the imaginary park example. Which needs are different, and how does the proposal respond?',
    observeAnswer: 'Games, quiet seating, and accessible walking routes may all matter; good participation listens to each.',
    question: 'Neighbors disagree about a park. Which action shows civic responsibility?',
    options: ['Listen to needs and suggest a reasoned compromise.', 'Ignore anyone who disagrees.', 'Choose only the loudest speaker’s idea.'],
    correctIndex: 0,
    explanation: 'Responsible participation includes listening, reasons, and regard for other people.',
    misconception: 'Participation does not require everyone to agree; it requires a respectful process.',
    independent: 'Write a two-sentence proposal for a fictional school improvement and explain whom it helps.',
    sample: 'Add a shaded reading spot near the play area. It helps students who want quiet and cool space.',
    source: {label:'California standard 3.4.2',url:cde+'#page=17'}
  },
  '3.4.3': {
    objective: 'Explain the history and meaning of a landmark, symbol, or founding document.',
    vocabulary: [{term:'landmark',meaning:'a place or structure remembered for its meaning'},{term:'symbol',meaning:'something that stands for an idea'}],
    observe: 'Compare the Declaration and Constitution references. What purpose is different for each?',
    observeAnswer: 'The Declaration announced independence and expressed ideals; the Constitution later established a structure for governing.',
    question: 'Which statement correctly distinguishes the two founding documents?',
    options: ['They are the same document.', 'The Constitution announced the 1776 independence vote.', 'The Declaration expressed independence; the Constitution organized government.'],
    correctIndex: 2,
    explanation: 'Their dates, purposes, and legal roles differ, even though both matter in U.S. history.',
    misconception: 'Recognizing an image is not enough; connect it to the source’s date and meaning.',
    independent: 'Choose one real landmark or symbol, and make a history-and-meaning card with its source.',
    sample: 'I would name the object, verify when and why it was made, then explain what idea it represents.',
    source: {label:'U.S. National Archives · Constitution',url:constitution}
  },
  '3.4.4': {
    objective: 'Distinguish making, carrying out, and interpreting laws, including local-government examples.',
    vocabulary: [{term:'legislative',meaning:'the branch that makes laws'},{term:'executive',meaning:'the branch that carries them out'},{term:'judicial',meaning:'the branch that interprets laws in cases'}],
    observe: 'Follow the three jobs in the lesson’s diagram. Which job is performed when a program is managed?',
    observeAnswer: 'Executing a policy means arranging to carry out the decision. In San José the city manager administers city work under council policy.',
    question: 'Which government job involves deciding how a law applies in a court case?',
    options: ['Judicial', 'Executive', 'Legislative'],
    correctIndex: 0,
    explanation: 'Courts interpret laws; executives administer them; legislatures create them.',
    misconception: 'City government is not a miniature copy of all three federal branches; use the actual local arrangement.',
    independent: 'Match one hypothetical community issue to the lawmaking job and the carrying-out job; identify the distinction.',
    sample: 'A city council votes on a park policy; city staff organize the work. They perform different jobs.',
    source: {label:'City of San José · Council-manager government',url:sanJoseCity}
  },
  '3.4.5': {
    objective: 'Distinguish national, state, local, and sovereign tribal governments from branches.',
    vocabulary: [{term:'federal',meaning:'relating to the national government'},{term:'state',meaning:'one of the governments in the United States'},{term:'sovereign',meaning:'having authority to govern'}],
    observe: 'Look at the lesson’s government relationships. Which labels are levels or kinds of governments, and which name branches?',
    observeAnswer: 'United States, California, San José, and a named tribal government refer to different governments; legislative, executive, and judicial name functions.',
    question: 'Which statement correctly describes a tribal government?',
    options: ['It is a neighborhood club.', 'It is a distinct government with its own authority.', 'It is the judicial branch of a city.'],
    correctIndex: 1,
    explanation: 'Tribal governments are distinct from state and municipal departments.',
    misconception: 'A sovereign tribal nation cannot be reduced to a city or county agency.',
    independent: 'Draw a labeled comparison of California, the United States, and a named tribal government; do not invent authority claims.',
    sample: 'I would place each government in a separate labeled box and cite the appropriate government source for its role.',
    source: {label:'Bureau of Indian Affairs · Tribal sovereignty',url:bia}
  },
  '3.4.6': {
    objective: 'Use biography evidence to connect an individual’s courageous action, risk, and contribution to freedom.',
    vocabulary: [{term:'freedom',meaning:'having rights and liberty'},{term:'risk',meaning:'the possibility of harm or loss'}],
    observe: 'Study the National Park Service Harriet Tubman biography. Identify an action and the danger she faced.',
    observeAnswer: 'The source describes Tubman’s work guiding enslaved people to freedom and the danger involved.',
    question: 'What makes a strong historical explanation of someone’s struggle for freedom?',
    options: ['Only the person’s clothing color.', 'Only the year of birth.', 'The person’s action, the risks, and the effect on people.'],
    correctIndex: 2,
    explanation: 'A biography should connect documented choices with their consequences.',
    misconception: 'A portrait cannot prove what someone did; corroborate actions with documentary accounts.',
    independent: 'Write three labels: Action, Risk, Effect. Fill them with sourced facts about Tubman.',
    sample: 'Action: guided people to freedom. Risk: capture and harm. Effect: helped people escape slavery. Cite the NPS biography.',
    source: {label:'National Park Service · Harriet Tubman',url:npsTubman}
  },
  '3.5.1': {
    objective: 'Sort natural, human, and capital resources used in making a good, past and present.',
    vocabulary: [{term:'natural resource',meaning:'a material from nature'},{term:'human resource',meaning:'people’s labor and skill'},{term:'capital resource',meaning:'equipment made to help produce goods or services'}],
    observe: 'Look at the bakery example. Which resources come from nature, which involve skills, and which are tools?',
    observeAnswer: 'Water and grain are natural inputs; the baker’s effort and skill are human inputs; the oven is capital equipment.',
    question: 'In a bakery, which is a capital resource?',
    options: ['An oven', 'Water', 'A baker’s knowledge'],
    correctIndex: 0,
    explanation: 'An oven is made equipment used to produce bread. It is not a naturally occurring ingredient.',
    misconception: 'Do not mistake a person’s learned skill for the physical tool they use.',
    independent: 'Compare resource inputs for the historical orchard and the present-day bakery in this lesson.',
    sample: 'The orchard needs land, water, growers, and farm tools. The bakery needs ingredients, bakers, and ovens.',
    source: {label:'California standard 3.5.1',url:cde+'#page=18'}
  },
  '3.5.2': {
    objective: 'Use product labels to distinguish local, other U.S., and overseas origins.',
    vocabulary: [{term:'origin',meaning:'where something came from'},{term:'evidence',meaning:'information supporting a claim'}],
    observe: 'Find the country-of-origin statement on a real product package, or use the sourced example in the lesson.',
    observeAnswer: 'A country-of-origin label is useful evidence; a store or brand name alone cannot establish where something was made.',
    question: 'A product is sold in San José. What is the best evidence of where it was produced?',
    options: ['The seller’s favorite color.', 'A verified country-of-origin label.', 'The location of the store.'],
    correctIndex: 1,
    explanation: 'Where a product is sold is not necessarily where it was made.',
    misconception: 'A company’s name or headquarters does not prove a specific item’s manufacturing origin.',
    independent: 'Make an origin chart with one verified local, U.S., or overseas item, and an “unknown” option.',
    sample: 'Product: [name]. Label says: [place]. Evidence: [packaging detail]. If no label exists, I write unknown.',
    source: {label:'California standard 3.5.2',url:cde+'#page=18'}
  },
  '3.5.3': {
    objective: 'Identify a choice, benefit, cost, and next-best alternative given up.',
    vocabulary: [{term:'trade-off',meaning:'giving up one possibility to gain another'},{term:'opportunity cost',meaning:'the next-best option given up'}],
    observe: 'Revisit the lesson’s fictional time-choice example. Which alternatives cannot be chosen at the same time?',
    observeAnswer: 'With limited time, choosing one activity means not doing another at that moment. The next-best forgone option is opportunity cost.',
    question: 'You have time for one activity. Reading is your second choice, but you pick drawing. What is the opportunity cost?',
    options: ['Every book in the library.', 'The pencil you use.', 'The reading time you gave up.'],
    correctIndex: 2,
    explanation: 'Opportunity cost is the value of the next-best alternative not chosen.',
    misconception: 'It is not every possible option; focus on the next-best alternative.',
    independent: 'Choose among three imaginary activities. State your preferred choice, benefit, and next-best option given up.',
    sample: 'I choose drawing because I can make art. I give up reading, my next-best choice.',
    source: {label:'California standard 3.5.3',url:cde+'#page=18'}
  },
  '3.5.4': {
    objective: 'Explain how learning and practice develop skills useful in work and daily life.',
    vocabulary: [{term:'human capital',meaning:'people’s knowledge and skills'},{term:'practice',meaning:'doing something repeatedly to improve'}],
    observe: 'Compare the sewing-machine and sewing-skill examples. Which is equipment and which is learned knowledge?',
    observeAnswer: 'The machine is capital equipment; knowing how to sew is a skill gained through teaching and practice.',
    question: 'Which is an example of human capital?',
    options: ['A sewing machine.', 'Knowing how to repair clothing.', 'A box of thread.'],
    correctIndex: 1,
    explanation: 'Knowledge and skills are capabilities people develop. They are not the same as a tool.',
    misconception: 'Human capital describes a learned capability; it is never a measure of a person’s value.',
    independent: 'Choose one classroom skill and show how practice develops it step by step.',
    sample: 'I practiced reading maps. First I learned the legend; then I found directions; now I can explain a route.',
    source: {label:'California standard 3.5.4',url:cde+'#page=18'}
  }
};

export const SOCIAL_STUDIES_HISTORY_TIMELINES: Record<string, SocialStudiesTimelineEvent[]> = {
  '3.3.1': [
    {year:'1776',description:'Anza’s exploratory group passes through Santa Clara County; Indigenous communities already live along the route.',source:{label:'NPS · Anza Trail',url:npsAnza}},
    {year:'1777',description:'Moraga and settlers establish the Spanish pueblo of San José near the Guadalupe River.',source:{label:'NPS · Santa Clara sites',url:npsAnza}},
    {year:'1888',description:'Ng Shing Gung is built as a religious and cultural center in San José’s Chinese community.',source:{label:'History San José · Chinese American museum',url:historyNgShing}}
  ],
  '3.3.2': [
    {year:'1871',description:'The Dawson family processes an early successful commercial pack of fruit.',source:{label:'History San José · Cannery Life',url:historyCanning}},
    {year:'1872',description:'The Dawson family’s commercial canning company is founded.',source:{label:'History San José · Cannery Life',url:historyCanning}},
    {year:'1893',description:'San Jose Fruit Packing Company builds a larger cannery near downtown.',source:{label:'History San José · Cannery Life',url:historyCanning}},
    {year:'1999',description:'The museum’s Plant 3 timeline reaches the end of the plant’s years of operation.',source:{label:'History San José · Cannery Life',url:historyCanning}}
  ],
  '3.3.3': [
    {year:'1777',description:'Spanish settlers establish the pueblo; earlier Native community history remains essential.',source:{label:'NPS · Anza Trail',url:npsAnza}},
    {year:'1869',description:'Gray and Gifford publish a bird’s-eye view of San José, now held by the Library of Congress.',source:{label:'Library of Congress · San José, 1869',url:map1869}},
    {year:'1962',description:'Emma Prusch donates land to the city that becomes a farm park.',source:{label:'City of San José · Emma Prusch Farm Park',url:prusch}}
  ]
};
