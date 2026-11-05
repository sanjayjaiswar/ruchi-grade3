import type { SocialStudiesPlan, StudySource } from './social-studies.readiness-types';

const anza: StudySource = { label: 'National Park Service: Anza Trail in Santa Clara County', url: 'https://www.nps.gov/juba/learn/historyculture/california-anza-trail-sites.htm', kind: 'institutional history' };
const temple: StudySource = { label: 'History San Jose and CHCP: Ng Shing Gung', url: 'https://chinesemuseum.historysanjose.org/ng-shing-gung/', kind: 'institutional history' };
const welcome: StudySource = { label: 'City of San Jose: Welcoming Plan 2025-2030', url: 'https://www.sanjoseca.gov/your-government/departments-offices/office-of-the-city-manager/racial-equity/immigrant-affairs/about-us', kind: 'official guidance' };
const cannery: StudySource = { label: 'History San Jose: Cannery Life', url: 'https://historysanjose.org/plan-your-visit/exhibits-activities/online-exhibits/cannery-life-del-monte-in-the-santa-clara-valley/', kind: 'institutional history' };
const valleyShift: StudySource = { label: 'History San Jose: Dairy Hill and the valley economy', url: 'https://historysanjose.org/plan-your-visit/exhibits-activities/online-exhibits/dairy-hill-san-jose-california/', kind: 'institutional history' };
const pueblo: StudySource = { label: 'History San Jose: Pueblo Papers background', url: 'https://sites.google.com/historysanjose.org/spanishmexicanarchives/background', kind: 'institutional history' };
const adobe: StudySource = { label: 'History San Jose: Gonzales/Peralta Adobe timeline', url: 'https://historysanjose.org/plan-your-visit/peralta-fallon-historic-site/luis-maria-peralta-adobe/', kind: 'institutional history' };
const map: StudySource = { label: 'Library of Congress: San Jose bird\'s-eye view, 1869', url: 'https://www.loc.gov/item/75693107/', kind: 'primary evidence' };
const park: StudySource = { label: 'City of San Jose: Emma Prusch Farm Park', url: 'https://www.sanjoseca.gov/Home/Components/FacilityDirectory/FacilityDirectory/2180/2028', kind: 'official guidance' };

export const SOCIAL_STUDIES_COMMUNITY_PLANS: Record<string, SocialStudiesPlan> = {
  '3.3.1': {
    objective: 'Use dated evidence to connect explorers, settlers, later immigrants, and continuing newcomers with cultural and religious contributions.',
    requirement: 'Research regional explorers and settlers, continuing arrivals, and their cultural and religious traditions and contributions.',
    prerequisite: 'Know that Native communities lived here before Spanish colonization and continue today. Read a date and name the maker of a source.',
    warmup: { prompt: 'Fictional example: a family moves to find work; another moves to join relatives. What is alike, and what differs? Can this tell us why every family moves?', answer: 'Both families change where they live. Their reasons differ. These invented examples cannot explain every real family\'s move.' },
    evidence: [
      { title: '1776: exploration during colonization', text: 'NPS describes Anza\'s exploratory journey through Santa Clara County in 1776. The land already had Native communities; an explorer\'s arrival was not the beginning of its history.', source: anza },
      { title: '1777: a Spanish farming settlement', text: 'Moraga led settlers who established the San Jose pueblo to grow grain for Spanish military settlements. This is a documented settlement purpose, not the personal reason of every settler.', source: pueblo },
      { title: '1888: cultural and religious contributions', text: 'Chinese residents built Ng Shing Gung as a cultural and religious center. Children learned calligraphy and literature downstairs; an altar stood upstairs. Today\'s museum building is a reconstruction, with the original altar preserved.', source: temple },
      { title: '2025-2030: continuing newcomers', text: 'San Jose\'s Welcoming Plan addresses immigrants and newcomers today. Its English, Spanish, Vietnamese, and Chinese editions show a city response to a multilingual community. The plan does not reveal each family\'s motive or religion.', source: welcome }
    ],
    model: {
      prompt: 'How does one place provide evidence of both a cultural and a religious contribution?',
      answer: 'Ng Shing Gung supported Chinese calligraphy and literature learning, a cultural contribution. Its altar supported religious life. The museum explains both uses of the 1888 building.',
      reasoning: ['Name the place and date.', 'Match each contribution to a specific activity in the evidence.', 'Avoid assuming that every Chinese resident held the same beliefs.']
    },
    guided: { prompt: 'Does the Welcoming Plan support "newcomers stopped arriving in 1888" or "newcomers remain part of community life"? Explain.', hint: 'Compare the 1888 institution with the date and purpose of the 2025-2030 plan.', answer: 'Newcomers remain part of community life. The recent plan addresses welcoming immigrants and newcomers; it does not say that all arrivals happened in the nineteenth century.' },
    practice: {
      support: { prompt: 'Match the cards: 1776 / 1888 / 2025-2030 to explorer / cultural and religious center / welcoming plan.', answer: '1776: explorer. 1888: cultural and religious center. 2025-2030: welcoming plan.' },
      core: { prompt: 'Name an explorer, a settler leader, and one later community contribution. Give the source for each.', answer: 'Anza: NPS journey account. Moraga: Pueblo Papers background. Chinese residents\' Ng Shing Gung classroom and altar: the History San Jose/CHCP museum account.' },
      challenge: { prompt: 'A student says, "Every family moved here for the same job and shared one religion." What evidence is missing?', answer: 'We would need each family\'s own account to know its motives or beliefs. Our sources describe different events and institutions; they cannot justify a claim about every person.' }
    },
    checks: [
      { id: 'arrivals', prompt: 'Which order matches the evidence?', options: ['Ng Shing Gung, Anza, Welcoming Plan', 'Anza, Ng Shing Gung, Welcoming Plan', 'Welcoming Plan, Anza, Ng Shing Gung'], correctIndex: 1, explanation: '1776 comes before 1888, which comes before 2025-2030.', retry: 'Compare the years on the evidence cards, starting with the smallest year.' },
      { id: 'contributions', prompt: 'Which pair shows BOTH cultural and religious contributions?', options: ['A classroom for calligraphy/literature and a religious altar', 'A street name and an unknown family motive', 'Two dates without descriptions'], correctIndex: 0, explanation: 'Learning language and literature and maintaining an altar document two different kinds of community life.', retry: 'Look for an example of shared cultural knowledge and an example of religious practice.' },
      { id: 'continuing', prompt: 'What can the city\'s 2025-2030 plan support?', options: ['Every immigrant has the same religion.', 'No one arrived after 1888.', 'Welcoming newcomers remains a community concern.'], correctIndex: 2, explanation: 'The recent plan concerns continuing community life. It does not give every person\'s story.', retry: 'Separate a city policy about newcomers from unsupported claims about individuals.' }
    ],
    independent: { prompt: 'Write three evidence sentences: an explorer or settler, a later cultural AND religious contribution, and continuing newcomers. Name the sources and one fact they do not establish.', answer: 'NPS describes Anza\'s 1776 journey. The Ng Shing Gung museum explains its classroom and altar. The city\'s 2025-2030 plan addresses newcomers. These sources do not tell us why every family moved.', criteria: ['Dates and people match the supplied evidence.', 'Both cultural and religious contributions are explained.', 'Continuing newcomers and a limit of the evidence are included.'] },
    misconceptions: ['An expedition or pueblo founding is not the beginning of Native history.', 'A cultural practice is not automatically a religious practice.', 'One community institution does not describe every individual.'],
    nextPreparation: 'Next, use the Dawson cannery evidence to investigate work, resources, property, and business decisions in 3.3.2.',
    visual: {
      kind: 'timeline', title: 'Order the evidence, then explain each contribution', caption: 'Choose the dated cards from earliest to latest. This is a selected timeline, not the whole history of the region.',
      nodes: [
        { id: '1888', label: '1888: Ng Shing Gung', detail: 'Cultural learning and religious life in a community institution.', source: temple },
        { id: '2025', label: '2025-2030: welcoming', detail: 'The city addresses continuing arrivals and inclusion.', source: welcome },
        { id: '1776', label: '1776: Anza', detail: 'Exploration through a region already inhabited by Native people.', source: anza },
        { id: '1777', label: '1777: pueblo', detail: 'Settlers led by Moraga establish a farming pueblo.', source: pueblo }
      ], correctOrder: ['1776', '1777', '1888', '2025']
    },
    sources: [anza, pueblo, temple, welcome]
  },
  '3.3.2': {
    objective: 'Explain a documented local enterprise, private property and business risk, and how its industrial site influenced later community land use.',
    requirement: 'Describe earlier local economies and their influence today, including private property and entrepreneurship.',
    prerequisite: 'Distinguish a good from a service. Know that evidence can support a comparison without proving that one event caused another.',
    warmup: { prompt: 'Fictional shop: a baker owns an oven, buys ingredients, and hopes to sell bread. Name a good, property used to produce it, and a risk.', answer: 'Bread is a good. The oven is private property used in the business. The baker risks spending money on bread that might not sell.' },
    evidence: [
      { title: 'A family organizes knowledge and equipment', text: 'History San Jose identifies James, Eloise, and Thomas Dawson in a successful local canning enterprise. Their scientific, cooking, and tinsmith skills helped preserve fruit for sale. The first pack was in 1871; the company began in 1872.', source: cannery },
      { title: 'Production changes local work', text: 'Preserving fruit allowed it to reach distant markets. Canneries connected orchards with factory jobs and transport. Plant Number 3 operated from 1893 to 1999; the museum documents its changing machinery and work.', source: cannery },
      { title: 'A documented influence on the later community', text: 'The museum documents Monte Vista housing on the former Plant Number 3 site, with patterned wall fragments and the water tower retained. Earlier industrial land and structures helped shape a later residential landscape. This is the museum\'s documented account, not a new inspection of the site.', source: cannery },
      { title: 'Property and risk: an original application', text: 'An entrepreneur organizes resources for a business and accepts uncertainty. Buildings and equipment can be privately owned. This explains the concept; it does not prove who legally owned a particular historical parcel. A deed would provide that evidence.' },
      { title: 'Compare two documented kinds of change', text: 'History San Jose\'s Dairy Hill exhibit describes agricultural land giving way to high-technology industries, housing and infrastructure in the valley. Compare that regional change with the separately documented reuse of Plant Number 3 for housing. Neither account shows that the Dawson cannery caused today\'s technology companies.', source: valleyShift }
    ],
    model: { prompt: 'How did canning connect the farm economy with other work?', answer: 'Fruit growers supplied harvests. Skilled workers and equipment preserved fruit. Packing and transport carried it to distant markets. This created connections among farms, factories, and transportation.', reasoning: ['Identify the problem: fresh fruit can spoil before it reaches customers.', 'Identify the enterprise: organize skills and equipment to preserve it.', 'Explain the documented connections without inventing a single cause for all later industries.'] },
    guided: { prompt: 'Fictional cannery: its owner buys a sealing machine. A poor harvest leaves less fruit to can. Which part is property, and which is business risk?', hint: 'Property is something owned. Risk is an uncertain result that may cause a loss.', answer: 'The sealing machine is the owner\'s property. A smaller harvest could leave the business with too little fruit to earn enough income; that is a risk.' },
    practice: {
      support: { prompt: 'Match: orchard fruit / trained canner / sealing machine to natural input / human skill / made equipment.', answer: 'Fruit is the farm input; the trained canner supplies human skill; the sealing machine is made equipment. Fruit growing also uses natural resources such as land and water.' },
      core: { prompt: 'Use the Dawson account to explain why this was entrepreneurship rather than simply picking fruit.', answer: 'The family organized cooking, scientific and metalworking skills with equipment to preserve and sell fruit. Organizing a commercial enterprise goes beyond gathering a crop.' },
      challenge: { prompt: 'Does "the city has technology companies now" prove that one cannery caused them? Make a supported comparison instead.', answer: 'No. Both periods involve skilled work, equipment, businesses and customers. The sources support change in the local economy, but not a direct causal claim from one cannery to every technology company.' }
    },
    checks: [
      { id: 'enterprise', prompt: 'Which action best demonstrates entrepreneurship?', options: ['Noticing a tree', 'Organizing skills, equipment and money to produce goods for sale', 'Reading a date without investigating it'], correctIndex: 1, explanation: 'Entrepreneurship involves organizing an enterprise and accepting uncertainty.', retry: 'Look for a business decision that brings resources together.' },
      { id: 'property', prompt: 'In the fictional cannery, which is private property used in production?', options: ['A machine the owner bought', 'Every river in the county', 'Every worker\'s personal freedom'], correctIndex: 0, explanation: 'The scenario explicitly says the owner bought the machine. We cannot infer ownership of all natural features or people.', retry: 'Use the ownership fact actually supplied in the scenario.' },
      { id: 'link', prompt: 'Which historical-to-present statement is supported?', options: ['One cannery invented every modern industry.', 'All orchard work and all technology work are identical.', 'Local kinds of work changed; skilled people and organized production matter in both periods.'], correctIndex: 2, explanation: 'This compares evidence while respecting differences and avoiding an unsupported claim of cause.', retry: 'Choose a statement that names continuity and change without saying one business caused everything.' }
    ],
    independent: { prompt: 'Explain how a historical local business connected resources, property, workers and markets. Name a documented influence on later community land use and identify a limit in the evidence.', answer: 'The Dawson enterprise combined skilled work and canning equipment to sell preserved fruit. Private equipment is a production resource, although a particular land ownership claim needs a deed. The museum documents later housing on the Plant Number 3 site with parts of the industrial structures retained. Earlier industry helped shape that later landscape; this does not prove that canning caused all technology growth.', criteria: ['Uses the documented enterprise and a specific input/output connection.', 'Explains private property and entrepreneurship without inventing a deed.', 'Names the documented later site reuse and retained structures as an influence, and identifies an evidence limit.'] },
    misconceptions: ['Private property is not the same as every natural resource.', 'An entrepreneur can lose money; success is not guaranteed.', 'A comparison across time does not automatically prove causation.'],
    nextPreparation: 'For 3.3.3, distinguish the pueblo founding account, surviving adobe, 1869 image, and later park record.',
    visual: {
      kind: 'process', title: 'Trace production from orchard to market', caption: 'Select each stage to connect its work with the next. This original diagram summarizes the museum account.',
      nodes: [
        { id: 'grow', label: 'Grow fruit', detail: 'Orchard work supplies fruit; crops also depend on land and water.', source: cannery },
        { id: 'preserve', label: 'Preserve and pack', detail: 'People combine scientific, cooking and tinsmith knowledge with equipment.', source: cannery },
        { id: 'transport', label: 'Transport', detail: 'Preserved fruit can travel beyond local markets.', source: cannery },
        { id: 'compare', label: 'Later community influence', detail: 'The museum documents housing on the old cannery site with patterned wall fragments and the water tower retained.', source: cannery }
      ]
    },
    sources: [cannery, valleyShift]
  },
  '3.3.3': {
    objective: 'Use a period image and separate historical accounts to explain community founding, named family contributions, and change over time.',
    requirement: 'Trace community founding and development, individual and family contributions, and change using maps, photographs and other primary evidence.',
    prerequisite: 'Put dates in order. Distinguish an observation in an image from an explanation that needs another source.',
    warmup: { prompt: 'Fictional photograph: you can see a bridge, but no people. Which claim is an observation: "a bridge is pictured" or "every resident liked the bridge"?', answer: 'A bridge is pictured is an observation. The photograph cannot reveal what every resident thought.' },
    evidence: [
      { title: '1777: why establish the pueblo?', text: 'The Pueblo Papers archive explains that the Spanish pueblo was established on November 29, 1777, to supply grain to nearby Spanish military settlements. Moraga led the settlers. This founding date does not describe the beginning of Native life.', source: pueblo },
      { title: '1797 and 1808: named family contributions', text: 'The museum timeline identifies Manuel Gonzales as the builder of the adobe in 1797. Luis Maria Peralta moved there in 1808. The surviving home connects the town\'s history with particular people and families.', source: adobe },
      { title: '1869: evidence made in the period', text: 'The Library of Congress holds Gray and Gifford\'s bird\'s-eye drawing of San Jose from 1869. Its pictured streets and buildings are evidence of that view. It is not a photograph or a scale map for measuring exact distances.', source: map },
      { title: '1962: land contributes to community life', text: 'The city records Emma Prusch\'s 1962 land gift, which became a farm park. This modern city account explains the gift; it is a different kind of source from the 1869 drawing.', source: park }
    ],
    model: { prompt: 'Which source supports each claim: founding purpose, pictured streets, and the later park gift?', answer: 'The Pueblo Papers background supports the founding purpose. The 1869 drawing supports observations about pictured streets. The city\'s park history supports the 1962 gift.', reasoning: ['Break a long historical statement into separate claims.', 'Choose evidence that can actually support each claim.', 'Use the old image as primary evidence for its period and identify modern explanations as later accounts.'] },
    guided: { prompt: 'A student uses the 1869 picture to prove the 1962 gift. What should change?', hint: 'Ask whether the source was made before or after the event and what it actually shows.', answer: 'Use the city park history for the gift. Keep the 1869 image for observations about the earlier town; it cannot record a later gift.' },
    practice: {
      support: { prompt: 'Put 1962, 1777 and 1869 in chronological order.', answer: '1777, 1869, 1962.' },
      core: { prompt: 'Name one individual or family contribution, then explain which supplied source supports it.', answer: 'Manuel Gonzales built the adobe in 1797, according to the museum timeline. Alternatively, Emma Prusch gave land in 1962, according to the city park history.' },
      challenge: { prompt: 'Use the old city view and the park account to explain both change and continuity, without claiming every part of the city changed in the same way.', answer: 'The 1869 view records streets, buildings and open areas at one time. The park account shows some later land being preserved for community agriculture and learning. Uses changed while links with agricultural history continued; these sources do not describe every neighborhood.' }
    },
    checks: [
      { id: 'founding', prompt: 'According to the Pueblo Papers background, what was one reason for the Spanish pueblo?', options: ['To build modern computers', 'To grow grain for Spanish military settlements', 'To begin all human history in the region'], correctIndex: 1, explanation: 'The archive identifies agricultural supply as its purpose; Native history predates the pueblo.', retry: 'Return to the founding evidence card and separate its period from modern industry.' },
      { id: 'primary', prompt: 'Which item was created in the period it depicts?', options: ['The 1869 bird\'s-eye drawing', 'Our newly written lesson summary', 'A modern imagined diary'], correctIndex: 0, explanation: 'The dated drawing is primary evidence for that historical view. Our lesson is a later explanation.', retry: 'Compare when each item was created with the period under study.' },
      { id: 'limits', prompt: 'What can you conclude directly from the 1869 drawing?', options: ['The motives of every resident', 'Exactly what happened in 1962', 'The arrangement of the streets and buildings depicted'], correctIndex: 2, explanation: 'Visible features support observations; motives and later events need other evidence.', retry: 'Choose a claim about what the image actually depicts.' }
    ],
    independent: { prompt: 'Explain why the pueblo was founded, name a person or family contribution, and describe change using the period image plus another source. State one limit of the image.', answer: 'The pueblo supplied grain to Spanish military settlements. Gonzales built the adobe in 1797. The 1869 drawing shows the town at one moment; the city records Prusch\'s later land gift. These show different stages and contributions. The drawing cannot prove motives or measure exact distances.', criteria: ['Founding purpose and named contribution match their sources.', 'Combines the period image with a separately identified account.', 'Chronology is correct and a source limitation is explicit.'] },
    misconceptions: ['A modern museum summary is not the same artifact as a period record.', 'A founding date for one settlement is not the start of everyone\'s history.', 'A bird\'s-eye drawing cannot establish precise measured distances.'],
    nextPreparation: 'For 3.4.1, compare the purpose of a classroom rule with the purpose of laws and the Constitution.',
    visual: {
      kind: 'timeline', title: 'Build a sourced community timeline', caption: 'Select all five events from earliest to latest. Then explain which source supports each one.',
      nodes: [
        { id: '1869', label: '1869: city drawing', detail: 'A period image gives evidence of pictured streets and buildings.', source: map },
        { id: '1777', label: '1777: pueblo', detail: 'Agricultural supply was an identified founding purpose.', source: pueblo },
        { id: '1962', label: '1962: Prusch gift', detail: 'The city records land given for the future farm park.', source: park },
        { id: '1808', label: '1808: Peralta family', detail: 'Luis Maria Peralta moved into the adobe.', source: adobe },
        { id: '1797', label: '1797: Gonzales adobe', detail: 'Manuel Gonzales built the surviving adobe home.', source: adobe }
      ], correctOrder: ['1777', '1797', '1808', '1869', '1962']
    },
    sources: [pueblo, adobe, map, park]
  }
};
