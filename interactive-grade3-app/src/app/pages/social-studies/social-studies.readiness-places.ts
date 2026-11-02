import { SocialStudiesPlan, StudySource } from './social-studies.readiness-types';

// Original supplemental instruction. These plans do not reproduce publisher lessons.
// Research verified 2026-11-02 UTC. References remain evidence, not required downloads.
const standards: StudySource = { label: 'CDE Grade 3 standards, printed page 9', url: 'https://www.cde.ca.gov/be/st/SS/documents/histsocscistnd.pdf#page=16', kind: 'official guidance' };
const county: StudySource = { label: 'Santa Clara County: natural environment', url: 'https://files.santaclaracounty.gov/migrated/GP_Book_A.pdf', kind: 'official guidance' };
const river: StudySource = { label: 'Valley Water: Guadalupe watershed', url: 'https://www.valleywater.org/accordion/guadalupe-watershed-upcoming', kind: 'official guidance' };
const water: StudySource = { label: 'Valley Water: watersheds and water uses', url: 'https://www.valleywater.org/learning-center/watersheds-of-santa-clara-valley', kind: 'official guidance' };
const bayshore: StudySource = { label: 'NPS: Yelamu homeland and Crissy Field marsh', url: 'https://www.nps.gov/places/000/6-heritage-of-a-bayshore-culture.htm', kind: 'institutional history' };
const muwekma: StudySource = { label: 'Muwekma Ohlone Tribe: its own historical account', url: 'https://muwekma.org/historical-overview.html', kind: 'tribal account' };
const publicNarrative: StudySource = { label: 'NUMU and Muwekma Ohlone: public homeland exhibition', url: 'https://www.numulosgatos.org/reclamation-homeland-muwekma-ohlone-virtual-tour', kind: 'tribal account' };
const tamien: StudySource = { label: 'Tamien Nation: living cultural traditions', url: 'https://www.tamien.org/culture', kind: 'tribal account' };
const nativeHistory: StudySource = { label: 'NPS: Ohlone and Coast Miwok history', url: 'https://www.nps.gov/articles/ohlones-and-coast-miwoks.htm', kind: 'institutional history' };
const eastBay: StudySource = { label: 'NPS: East Bay seasonal foods and materials', url: 'https://www.nps.gov/places/stop-6-american-indians-in-the-east-bay.htm', kind: 'institutional history' };
const environment: StudySource = { label: 'East Bay Regional Park District: environmental adaptations, printed page 39', url: 'https://www.ebparks.org/node/7280#page=73', kind: 'official guidance' };
const council: StudySource = { label: 'Federated Indians of Graton Rancheria: Tribal Council', url: 'https://gratonrancheria.com/government/tribal-council/', kind: 'tribal account' };
const constitution: StudySource = { label: 'Federated Indians of Graton Rancheria: published constitution', url: 'https://gratonrancheria.com/wp-content/uploads/2018/08/Amended-Constitution-7.2012.pdf', kind: 'primary evidence' };
const governments: StudySource = { label: 'Bureau of Indian Affairs: tribal, federal and state relationships', url: 'https://www.bia.gov/frequently-asked-questions', kind: 'official guidance' };
const missionRecords: StudySource = { label: 'Santa Clara University Archives: mission records and their perspective', url: 'https://libguides.scu.edu/c.php?g=1018983&p=7380825', kind: 'institutional history' };

export const SOCIAL_STUDIES_PLACES_PLANS: Record<string, SocialStudiesPlan> = {
  '3.1.1': {
    objective: 'Locate and name Santa Clara Valley landforms and water features, and explain how a map key helps you read them.',
    requirement: 'Identify geographic features in the local region using spatial evidence.',
    prerequisite: 'Know that land and water are different; use west, east and north with the displayed direction labels.',
    warmup: {
      prompt: 'Five-minute warm-up: A valley is lower land between higher areas. A mountain range is a group of mountains. A river is moving water. Sort these names: Santa Clara Valley, Santa Cruz Mountains, Guadalupe River. Which is a water feature?',
      answer: 'Santa Clara Valley is a valley; Santa Cruz Mountains is a mountain range; Guadalupe River is a water feature. A place name is a clue, but a reliable map or source confirms what it names.'
    },
    evidence: [
      { title: 'Our local land', text: 'Santa Clara County describes the Santa Clara Valley between the Santa Cruz Mountains to the west and the Diablo Range to the east. These are three different geographic features.', source: county },
      { title: 'A local water route', text: 'Valley Water explains that the Guadalupe watershed begins in the Santa Cruz Mountains. The Guadalupe River flows north through San José and reaches San Francisco Bay through Alviso Slough.', source: river },
      { title: 'Read this practice key', text: 'Original practice key: triangle = mountain; wavy line = river; outlined oval = valley. A symbol is a small sign used for a feature. This key is for this practice example only; another map may use different signs.' }
    ],
    model: {
      prompt: 'Use the evidence cards to answer: Which mountain range is west of Santa Clara Valley, and which water feature flows through San José?',
      answer: 'The Santa Cruz Mountains are west of Santa Clara Valley. The Guadalupe River flows through San José.',
      reasoning: ['Find the county evidence card and match the word west with Santa Cruz Mountains.', 'Find the Valley Water evidence card and distinguish a river from the bay it reaches.', 'Name the source with each claim; the schematic does not supply measured distances.']
    },
    guided: {
      prompt: 'Complete both relationships: Santa Clara Valley is between ___ and ___. Guadalupe River water reaches ___.',
      hint: 'Use the county card for the first pair and the Valley Water card for the destination.',
      answer: 'The valley is between the Santa Cruz Mountains and the Diablo Range. The river reaches San Francisco Bay through Alviso Slough.'
    },
    practice: {
      support: { prompt: 'Choose the water feature from this pair: Diablo Range / Guadalupe River. Explain one clue.', answer: 'Guadalupe River is the water feature. The evidence calls it a river that flows toward the bay; the Diablo Range is mountains.' },
      core: { prompt: 'Using the original practice key above, which symbol would show the Guadalupe River? Which would show the Santa Cruz Mountains?', answer: 'A wavy line would show the river; a triangle would show mountains. Those meanings come from the practice key, not from a rule that all maps must follow.' },
      challenge: { prompt: 'A learner says, "The river is drawn with a short line, so it must be one mile long." Does the relationship diagram prove that? What information is missing?', answer: 'No. The diagram is not to scale. A measured map with a scale and a suitable route would be needed to estimate distance.' }
    },
    checks: [
      { id: 'west-feature', prompt: 'Which named feature is west of Santa Clara Valley?', options: ['Diablo Range', 'Santa Cruz Mountains', 'San Francisco Bay'], correctIndex: 1, explanation: 'The county evidence places the Santa Cruz Mountains west of the valley and the Diablo Range east of it.', retry: 'Reread Our local land and connect west with its named mountain range.' },
      { id: 'water-destination', prompt: 'The evidence says the Guadalupe River reaches which place?', options: ['San Francisco Bay through Alviso Slough', 'The top of the Diablo Range', 'Every California lake'], correctIndex: 0, explanation: 'Valley Water identifies the bay as the river’s destination through Alviso Slough.', retry: 'Find the destination at the end of A local water route.' },
      { id: 'map-key', prompt: 'A different map uses a triangle. How should you learn what it means?', options: ['Use this practice key for every map', 'Guess from the color', 'Read that map’s own legend'], correctIndex: 2, explanation: 'Each map’s legend explains its symbols. A symbol can be reused for a different purpose.', retry: 'Separate this original practice key from the key of another map.' }
    ],
    independent: {
      prompt: 'Without copying the model, write or say three complete facts: one valley location, one mountain location, and one water route. Name the evidence card used. Then state one thing the schematic cannot prove.',
      answer: 'Santa Clara Valley lies between the two ranges. The Santa Cruz Mountains lie west of it, according to the county card. The Guadalupe River flows north through San José toward San Francisco Bay, according to Valley Water. The schematic cannot prove exact distances.',
      criteria: ['Names a valley, mountain range and water feature accurately.', 'Uses at least one correct spatial relationship.', 'Connects facts to the county or Valley Water evidence.', 'Recognizes that the diagram is not a measured map.']
    },
    misconceptions: ['A bay and a river are both water features, but they are not the same kind of feature.', 'The west/east labels apply to these named places; screen position alone is not evidence.', 'Point Reyes is a regional comparison from the full lesson, not a neighborhood in San José.'],
    nextPreparation: 'Prepare 3.1.2 by asking how people use water and what changes when water is stored or land is rebuilt. Keep these local feature names available.',
    visual: {
      kind: 'map', title: 'Santa Clara Valley relationship map',
      caption: 'Original schematic cards based on county and Valley Water evidence. Direction words show relationships; placement is not a scale map or a route for travel. Select a feature to inspect its evidence.',
      nodes: [
        { id: 'west', label: 'West: Santa Cruz Mountains', detail: 'Mountain range west of Santa Clara Valley.', source: county },
        { id: 'valley', label: 'Between: Santa Clara Valley', detail: 'Lower valley area between the Santa Cruz Mountains and Diablo Range.', source: county },
        { id: 'east', label: 'East: Diablo Range', detail: 'Mountain range east of Santa Clara Valley.', source: county },
        { id: 'river', label: 'Water: Guadalupe River', detail: 'Flows north through San José and toward the bay.', source: river },
        { id: 'bay', label: 'Destination: San Francisco Bay', detail: 'The river enters the bay through Alviso Slough.', source: river }
      ]
    },
    sources: [standards, county, river]
  },
  '3.1.2': {
    objective: 'Explain a local resource-use decision, the physical change it makes, and an effect that people should investigate.',
    requirement: 'Trace local resource uses and human changes to the physical environment.',
    prerequisite: 'Identify land and water; distinguish a human need from a natural resource.',
    warmup: {
      prompt: 'Five-minute warm-up: In an imagined garden, people need to grow vegetables. They use soil and water and add paths and watering pipes. Name the need, two natural resources and one human-made change.',
      answer: 'Need: growing food. Natural resources: soil and water. Changes: adding paths or watering pipes. The garden is an invented practice setting, not a report about a real farm.'
    },
    evidence: [
      { title: 'Water is used in several ways', text: 'Valley Water explains that local rivers and creeks carry water toward bays. Some water fills reservoirs for drinking supplies, replenishes underground water and supports habitat. A reservoir is a place where water is stored.', source: water },
      { title: 'A changed marsh and an important discovery', text: 'At Crissy Field in San Francisco, evidence of a seasonal Yelamu village was found before marsh reconstruction. NPS consulted Ohlone people and archaeologists and changed the marsh plan to preserve the site. This is a Bay Area comparison, separate from Santa Clara County.', source: bayshore },
      { title: 'Ask about more than the benefit', text: 'Original decision method: identify the need, name the resource, describe what people change, and ask who or what is affected. A useful project can have effects that require careful investigation.' }
    ],
    model: {
      prompt: 'Explain the Crissy Field decision in four parts: planned change, evidence, response and reason.',
      answer: 'A marsh reconstruction was planned. Evidence of a Yelamu village was discovered. NPS changed the plan after consulting Ohlone people and archaeologists. The change protected the cultural site while planning the marsh work.',
      reasoning: ['The planned change concerns the physical environment.', 'The discovery adds evidence about people already connected with the place.', 'Consultation and redesign are documented responses; the example does not require guessing anyone’s private feelings.']
    },
    guided: {
      prompt: 'A fictional town plans a paved path beside a creek. Plan A removes more plants; Plan B uses a narrower path and keeps more plants. Both allow walking. Name a benefit shared by both and one difference to investigate.',
      hint: 'First identify the travel need. Then compare the stated changes to plants.',
      answer: 'Both plans provide a walking route. Plan A removes more plants, while Plan B keeps more. The town should investigate how each design affects the creek bank and people using the path; the scenario gives no final safety finding.'
    },
    practice: {
      support: { prompt: 'In the fictional garden warm-up, is water the resource or the pipe? Explain.', answer: 'Water is the natural resource. The pipe is a made object used to move it.' },
      core: { prompt: 'Complete this original chain: need for vegetables → soil and water → garden beds and watering pipes → one benefit and one question.', answer: 'Benefit: a place to grow food. Question: how much water will be used, or how will the paths affect water soaking into the ground? A question is not a proven harm.' },
      challenge: { prompt: 'Someone says, "A project helps people, so it cannot damage anything." Use the two path plans to explain why more information is needed.', answer: 'Both paths help walkers, but they remove different amounts of plants. We must compare effects on people and the creek environment before deciding. A benefit does not prove there are no costs.' }
    },
    checks: [
      { id: 'resource-change', prompt: 'Which pair correctly separates a resource from a human change?', options: ['Water / building a storage reservoir', 'A pipe / rainfall', 'A road / a mountain'], correctIndex: 0, explanation: 'Water is a resource; building a reservoir changes where and how water can be stored.', retry: 'Ask which item comes from nature and which action people take.' },
      { id: 'crissy-evidence', prompt: 'Why was the Crissy Field marsh plan changed in the account?', options: ['To prove that no people had lived there', 'To make the map a different color', 'To protect the discovered Yelamu cultural site'], correctIndex: 2, explanation: 'The NPS account connects the redesign with preserving the site after consultation.', retry: 'Return to A changed marsh and identify what was discovered.' },
      { id: 'evaluate-impact', prompt: 'Which question best investigates the fictional creek path?', options: ['Which plan is newest?', 'What needs does each plan meet, and how does each change the creek bank?', 'Can we ignore every effect once walking is possible?'], correctIndex: 1, explanation: 'A useful inquiry considers both the purpose and the changes to the place.', retry: 'Use need, resource, change and effect as four separate questions.' }
    ],
    independent: {
      prompt: 'Explain either the real Crissy Field example or the fictional garden in four linked sentences: need/plan, resource or place, change, and consequence or question. Say which kind of example you chose.',
      answer: 'I chose the fictional garden. People want to grow food using soil and water. They build beds, paths and watering pipes. The garden may provide vegetables, and people should investigate how much water it needs.',
      criteria: ['Identifies a need and a resource or place.', 'Names an actual physical change.', 'Explains a consequence or a relevant unanswered question.', 'Distinguishes the sourced event from the invented practice example.']
    },
    misconceptions: ['A benefit and a cost can occur in the same project.', 'An investigation question is not proof that damage has occurred.', 'A cultural site is connected with people and history as well as its physical location.'],
    nextPreparation: 'Prepare 3.2.1 with the named communities and source labels. Explain that protecting a place can matter to a living community.',
    visual: {
      kind: 'process', title: 'A marsh decision changed by evidence',
      caption: 'Original process diagram of the NPS account. Put the events in their supported sequence; do not infer that consultation erases every historical harm.',
      nodes: [
        { id: 'plan', label: 'Marsh reconstruction planned', detail: 'The Crissy Field marsh was to be reconstructed.', source: bayshore },
        { id: 'discovery', label: 'Yelamu village evidence found', detail: 'A seasonal village site was identified before the work began.', source: bayshore },
        { id: 'consult', label: 'People consult', detail: 'NPS consulted Ohlone people and archaeologists.', source: bayshore },
        { id: 'redesign', label: 'Plan redesigned', detail: 'The marsh design was changed to preserve the site.', source: bayshore }
      ], correctOrder: ['plan', 'discovery', 'consult', 'redesign']
    },
    sources: [standards, water, bayshore]
  },
  '3.2.1': {
    objective: 'Describe named local Native communities, a publicly shared spiritual narrative, living customs and the evidence that supports them.',
    requirement: 'Describe Native national identities, religious beliefs, customs and folklore traditions.',
    prerequisite: 'Understand that a community has its own name and that a tradition can continue while everyday life changes.',
    warmup: {
      prompt: 'Five-minute warm-up: A named community shares a story on its own website. Another person invents a story and calls it that community’s tradition. Which is evidence about the community? Why?',
      answer: 'The community’s attributed account is evidence of what it publicly shares. The invented story is not evidence of that community’s beliefs. We can ask questions without inventing answers.'
    },
    evidence: [
      { title: 'A living named community', text: 'The Muwekma Ohlone Tribe describes family connections between its present members and earlier Bay Area generations. Its own account includes most of Santa Clara County in its homeland.', source: muwekma },
      { title: 'A publicly shared origin narrative', text: 'An exhibition developed with Muwekma Ohlone participation presents Eagle, Coyote and Hummingbird in an origin story. It connects the narrative with community identity and homeland. This is a spiritual and storytelling tradition of a named people, not a claim that every Native nation shares one belief.', source: publicNarrative },
      { title: 'Customs continuing today', text: 'Tamien Nation describes members gathering and preparing acorns, making tule boats, and teaching basketmaking to the next generation. Tamien Nation and Muwekma Ohlone Tribe are named communities; their accounts should not be blended into one unnamed group.', source: tamien },
      { title: 'How to discuss a belief respectfully', text: 'Original discussion rule: describe what the named source shares, give credit, and ask what the narrative means to the community. Learning about a belief does not require a student to adopt it or act out a ceremony.' }
    ],
    model: {
      prompt: 'Build a two-part evidence answer: name a publicly shared spiritual/storytelling tradition and a present-day custom. Attribute each to the right source.',
      answer: 'The Muwekma co-created exhibition presents an origin narrative involving Eagle, Coyote and Hummingbird. Tamien Nation describes teaching basketmaking to the next generation. The first is a shared spiritual narrative; the second is a living custom and skill.',
      reasoning: ['Keep the named communities and source labels with the facts.', 'Identify what kind of cultural evidence each card supplies.', 'Do not invent private practices or assume all members have identical experiences.']
    },
    guided: {
      prompt: 'Correct this sentence: "All Native people disappeared, and they all told the same story." Use two evidence cards.',
      hint: 'Find a present-day action on the Tamien card and a named narrative on the exhibition card.',
      answer: 'Native communities continue today: Tamien Nation describes teaching basketmaking. The exhibition presents a particular Muwekma Ohlone origin narrative, not one story for every Native people.'
    },
    practice: {
      support: { prompt: 'Which word best fits teaching basketmaking from one generation to another: tradition or disappearance? Explain.', answer: 'Tradition. People continue and teach knowledge; that is evidence of continuity.' },
      core: { prompt: 'Sort these evidence-card facts: Muwekma family connections; Eagle/Coyote/Hummingbird narrative; Tamien acorn preparation. Use identity, spiritual/storytelling tradition, and custom.', answer: 'Family connections help describe identity. The origin narrative is a spiritual/storytelling tradition. Acorn preparation is a documented custom. These categories can connect without being identical.' },
      challenge: { prompt: 'Why should we not say that a photograph of a basket proves what every Native person believes?', answer: 'The object does not establish everyone’s beliefs. We need a named, attributed account for the specific question. One artifact or image cannot represent all communities or all parts of a culture.' }
    },
    checks: [
      { id: 'named-narrative', prompt: 'Which claim matches the displayed origin-narrative evidence?', options: ['Every Native nation has the same story', 'The Muwekma co-created exhibition presents a named community’s narrative', 'The portal invented an official tribal ceremony'], correctIndex: 1, explanation: 'The source identifies a particular public narrative; the lesson does not generalize it to all Native nations.', retry: 'Look for the community name and the phrase publicly shared.' },
      { id: 'living-custom', prompt: 'Which displayed fact is evidence of a living custom?', options: ['Tamien members teach basketmaking to the next generation', 'Every Native person lives only in the past', 'A made-up story is an official tradition'], correctIndex: 0, explanation: 'Teaching a skill today shows people continuing cultural knowledge.', retry: 'Reread Customs continuing today and find an action people perform now.' },
      { id: 'belief-evidence', prompt: 'What should a careful student do when a source does not explain a ceremony?', options: ['Invent details to fill the gap', 'Assume all communities perform it alike', 'State what is known and leave the unsupported detail unanswered'], correctIndex: 2, explanation: 'Good inquiry respects both evidence limits and what communities choose to share.', retry: 'Separate a question you can ask from an answer the evidence actually gives.' }
    ],
    independent: {
      prompt: 'Explain identity, a spiritual/storytelling tradition and a custom using the cards. Include community names and one sentence showing Native life continues today.',
      answer: 'Muwekma Ohlone members describe connections to earlier Bay Area families. Their co-created exhibition shares an origin narrative involving Eagle, Coyote and Hummingbird. Tamien Nation describes continuing basket teaching and acorn preparation today. These are specific living communities, not one identical culture.',
      criteria: ['Names the community for each claim.', 'Includes a supported identity fact, narrative and custom.', 'Describes present-day continuity.', 'Does not invent beliefs, private ceremonies or universal claims.']
    },
    misconceptions: ['Ohlone is not the name of one identical culture with one government.', 'A living tradition can coexist with modern clothing, tools and work.', 'A spiritual narrative is studied as an attributed cultural account; students need not perform or endorse it.'],
    nextPreparation: 'Prepare 3.2.2 by keeping the named sources visible and asking how local materials, weather, seasons and learned skills connect.',
    visual: {
      kind: 'comparison', title: 'Different evidence, connected cultural life',
      caption: 'Original comparison cards. Select each card and connect its claim to the named source. These categories overlap; they are not a ranking of cultures.',
      nodes: [
        { id: 'identity', label: 'Identity and family', detail: 'Muwekma Ohlone members describe connections to earlier Bay Area generations.', source: muwekma },
        { id: 'narrative', label: 'Public spiritual narrative', detail: 'Eagle, Coyote and Hummingbird appear in a Muwekma co-created exhibit’s origin story.', source: publicNarrative },
        { id: 'custom', label: 'Living custom', detail: 'Tamien Nation describes teaching basketmaking and preparing acorns today.', source: tamien }
      ]
    },
    sources: [standards, muwekma, publicNarrative, tamien]
  },
  '3.2.2': {
    objective: 'Connect geography, seasons and climate with documented Native foods, clothing and tools, explaining the skill people supplied.',
    requirement: 'Explain how local geography and climate shaped adaptations for food, clothing and tools.',
    prerequisite: 'Distinguish a material from the useful object made with it; understand that weather and seasons affect needs and resources.',
    warmup: {
      prompt: 'Five-minute warm-up: Match each pair and explain the difference: tule reeds / boat; animal fur / warm cape; acorns / food. Which item is a material or resource, and which is a use?',
      answer: 'Tule reeds are a material used for boats; fur is a material used in warm clothing; acorns are a food resource that needs preparation. A material does not turn itself into an object or prepared food.'
    },
    evidence: [
      { title: 'Waterways and a useful plant', text: 'NPS describes Ohlone people making tule boats for travel, fishing and hunting on the bay. People combined reeds from their surroundings with learned boatmaking skills.', source: bayshore },
      { title: 'Seasons and food', text: 'The NPS East Bay account describes fishing in creeks and gathering acorns in autumn. Location and season helped determine which foods people could obtain; preparing them required knowledge.', source: eastBay },
      { title: 'Cold weather and clothing', text: 'East Bay Regional Park District describes winter capes made with otter or jackrabbit fur, along with clothing using prepared hide or bark materials. This connects weather, available materials and skilled work. It does not mean every community dressed in one identical way.', source: environment },
      { title: 'Plants became tools', text: 'The park district describes woven plant baskets used for tasks such as carrying, storing and preparing foods. Knowing suitable plants and weaving methods mattered as much as finding materials.', source: environment }
    ],
    model: {
      prompt: 'Explain the tule-boat example with four links: place, resource, skill and purpose.',
      answer: 'In the bay region, people had access to tule reeds. Boatmakers used their knowledge to shape and join reeds into boats. The boats supported travel, fishing and hunting on water.',
      reasoning: ['Begin with the environment where the resource is available.', 'Name what people must know or do; geography alone cannot make the object.', 'Finish with the purpose supported by the attributed source.']
    },
    guided: {
      prompt: 'Complete a climate connection: cold weather → ___ material → ___ work → ___ purpose.',
      hint: 'Use the clothing card. Name the material, what people make, and the need it meets.',
      answer: 'Cold weather → fur → skilled making of a cape → clothing that helps keep a person warm. This is the documented regional clothing example, not a claim that everyone wore the same cape.'
    },
    practice: {
      support: { prompt: 'Match each need with a displayed example: water travel, cold-weather clothing, seasonal food. Choices: tule boat, fur cape, autumn acorns.', answer: 'Water travel: tule boat. Cold-weather clothing: fur cape. Seasonal food: autumn acorns.' },
      core: { prompt: 'Compare a basket and a tule boat. Name one shared feature and one different purpose from the evidence.', answer: 'Both use plant materials and learned making skills. A basket can carry or store food; a boat can carry people on water. Similar materials do not make their purposes identical.' },
      challenge: { prompt: 'A learner says, "The environment made people build boats." Improve the explanation without losing geography’s importance.', answer: 'The watery environment created uses for boats and supplied useful plants, but people chose, learned and developed methods to make them. Explain both the local setting and human knowledge.' }
    },
    checks: [
      { id: 'climate', prompt: 'Which connection most clearly concerns climate or weather?', options: ['A map has a title', 'A boat has a name', 'A warm cape helps meet a cold-weather need'], correctIndex: 2, explanation: 'The clothing example links a condition people experience with material knowledge and a useful response.', retry: 'Look for a weather condition and the need it creates.' },
      { id: 'season', prompt: 'Which timing is supported by the displayed East Bay food account?', options: ['Acorns were gathered in autumn', 'All food was gathered on the same day', 'Season never affected available foods'], correctIndex: 0, explanation: 'The sourced example connects acorn gathering with autumn.', retry: 'Find the season named on the food card.' },
      { id: 'skills', prompt: 'What is missing from "reeds were nearby, so a boat appeared"?', options: ['A new name for the river', 'People’s boatmaking knowledge and work', 'A claim that every tribe was identical'], correctIndex: 1, explanation: 'Materials must be selected and worked by skilled people; the resource alone does not produce a boat.', retry: 'Use the model’s place, resource, skill and purpose chain.' }
    ],
    independent: {
      prompt: 'Give three short explanations using the displayed cards: one for food, one for clothing and one for a tool or useful object. Connect each to place, season or climate and to a learned skill.',
      answer: 'Autumn acorns supplied food when people knew when and how to gather and prepare them. Fur could be made into capes for cold weather. Plants could be woven into baskets for carrying and storing food. These examples connect environment with human knowledge.',
      criteria: ['Includes food, clothing and a tool or useful object.', 'Makes at least one explicit climate or season connection.', 'Names a material and a learned skill.', 'Keeps the named regional evidence separate from claims about every Native nation.']
    },
    misconceptions: ['Native people used knowledge and choice; they did not simply receive finished objects from nature.', 'A historical clothing example does not describe what all Native people wear today.', 'Learning a traditional food’s history is not an instruction to gather or eat unfamiliar plants.'],
    nextPreparation: 'Prepare 3.2.3 by distinguishing making/exchanging resources from deciding community rules. Culture, economy and government connect but answer different questions.',
    visual: {
      kind: 'comparison', title: 'Environment, knowledge and useful work',
      caption: 'Original evidence comparison. Choose each card and explain the connection. The full lesson’s credited illustrations remain supporting visuals.',
      nodes: [
        { id: 'water-travel', label: 'Waterways: tule boat', detail: 'Reeds plus boatmaking knowledge support travel on the bay.', source: bayshore },
        { id: 'season-food', label: 'Autumn: acorn foods', detail: 'Seasonal availability is joined with gathering and preparation knowledge.', source: eastBay },
        { id: 'cold-clothing', label: 'Cold weather: fur cape', detail: 'Materials and clothing-making skills help meet a weather-related need.', source: environment },
        { id: 'plant-tools', label: 'Plants: woven basket', detail: 'Weaving turns selected plants into a useful tool for food-related tasks.', source: environment }
      ]
    },
    sources: [standards, bayshore, eastBay, environment]
  },
  '3.2.3': {
    objective: 'Explain a named tribal government and economy, the purpose of a constitution, and distinct federal and state relationships.',
    requirement: 'Describe tribal economies, government systems and constitutions, including federal and state relationships.',
    prerequisite: 'Distinguish culture, economy and government: shared practices, obtaining/using resources, and authority to make community decisions.',
    warmup: {
      prompt: 'Five-minute warm-up: Sort these original examples: teaching a traditional song; organizing resources for a community business; deciding who may make a rule. Use culture, economy and government. Can the categories connect?',
      answer: 'Teaching the song concerns culture; organizing business resources concerns the economy; deciding authority concerns government. They can connect, such as a government supporting a cultural learning program.'
    },
    evidence: [
      { title: 'A specific government', text: 'The Federated Indians of Graton Rancheria publishes a Tribal Council with roles including chair, secretary and treasurer. Its council accounts describe education, cultural learning, environmental protection and economic-development work. This is a regional comparison, not a description of every Santa Clara Native community.', source: council },
      { title: 'Economy and government can connect', text: 'The Graton council page describes an economic-development board and tribal business responsibilities. Economic work concerns resources and livelihoods; government decides how community responsibilities are organized. They are connected, not interchangeable.', source: council },
      { title: 'A constitution is evidence', text: 'Graton Rancheria publishes a written constitution. It sets out how its government is organized. A constitution is different from one everyday decision: it gives the governing structure for making decisions.', source: constitution },
      { title: 'The federal relationship', text: 'BIA describes federally recognized tribes and the United States as having a government-to-government relationship. Tribal self-government has legal limits, but a tribal government is not merely a city department.', source: governments },
      { title: 'The state relationship', text: 'BIA also explains that tribes and states can cooperate through agreements on shared concerns, including environmental protection. State and tribal governments have distinct authority. Tribal identity and federal-recognition status are different questions.', source: governments }
    ],
    model: {
      prompt: 'Describe Graton Rancheria with four ideas: government, economy, constitution and government relationships. Use the evidence cards.',
      answer: 'Graton Rancheria has a Tribal Council. Its published responsibilities include economic-development work. Its constitution describes its governing organization. BIA explains how federally recognized tribes relate to the United States as governments and can work with states on shared concerns.',
      reasoning: ['Name a real tribe instead of using one imaginary system for all tribes.', 'Use the council page for its responsibilities and the constitution for organization.', 'Keep the federal and state relationships distinct; do not draw the tribe underneath a city.']
    },
    guided: {
      prompt: 'A fictional state and a tribal government agree to work together on a shared river. Does this make the tribe a department of the state? Explain using the evidence.',
      hint: 'An agreement between governments is different from one office controlling another.',
      answer: 'No. They can cooperate on environmental concerns while remaining distinct governments. The river agreement is an original example of the relationship BIA describes, not a claim about a specific signed agreement.'
    },
    practice: {
      support: { prompt: 'Choose the best source for how Graton Rancheria organizes government: a basket photograph or its published constitution. Why?', answer: 'Its published constitution. A basket photograph may show material culture but cannot establish government organization.' },
      core: { prompt: 'Explain how economic-development work differs from the constitution, using the Graton evidence.', answer: 'Economic-development work concerns resources and business responsibilities. The constitution concerns how governing authority is organized. A government can make economic decisions using its governing rules.' },
      challenge: { prompt: 'Correct this diagram description: "United States → California → city → every tribe." What comparison should replace it?', answer: 'Use separate named government boxes and explain their relationships. BIA describes federal-tribal government-to-government relations and state-tribal cooperation. Every tribe is not a city department at the bottom of one ladder.' }
    },
    checks: [
      { id: 'constitution-role', prompt: 'What does the published tribal constitution primarily help us understand?', options: ['How the government is organized', 'The weather every day', 'The design of every tribe’s baskets'], correctIndex: 0, explanation: 'A constitution supplies evidence about governing structure and authority.', retry: 'Separate a community’s governing rules from its weather and objects.' },
      { id: 'state-relation', prompt: 'Which statement matches the BIA state-relationship evidence?', options: ['All tribes are departments of cities', 'Tribes and states can cooperate on shared environmental concerns', 'A state agreement erases tribal identity'], correctIndex: 1, explanation: 'Cooperation through agreements is possible between distinct governments.', retry: 'Reread The state relationship and identify cooperation without subordination.' },
      { id: 'economy-evidence', prompt: 'Which Graton evidence best connects government with economic work?', options: ['An unrelated mountain photograph', 'The color of a webpage', 'Published economic-development and business responsibilities'], correctIndex: 2, explanation: 'Those responsibilities concern organizing resources and economic decisions.', retry: 'Find the evidence about work and resources, not appearance.' }
    ],
    independent: {
      prompt: 'Give a four-sentence explanation of a tribal government using this lesson: a named institution, an economic responsibility, a constitution’s purpose, and both federal and state relationships.',
      answer: 'The Federated Indians of Graton Rancheria has a Tribal Council. Its published work includes economic development. Its constitution explains governing organization. BIA describes federal government-to-government relationships and cooperation between tribes and states on shared concerns.',
      criteria: ['Names the tribe and its governing institution.', 'Includes an evidenced economic responsibility.', 'Explains what a constitution does.', 'Distinguishes federal relations from state cooperation.', 'Does not equate tribal identity with a claimed federal-recognition status for every local community.']
    },
    misconceptions: ['Culture, economy and government are connected but not synonyms.', 'A tribe is not a neighborhood club or city department.', 'One tribe’s constitution is not the constitution of every Native community.', 'Do not infer a community’s recognition status from its name, image or cultural traditions.'],
    nextPreparation: 'Prepare 3.2.4 by asking how outside settlement changed the authority and everyday lives of established Native communities. Keep Native-authored evidence alongside institutional accounts.',
    visual: {
      kind: 'comparison', title: 'A tribal government and its relationships',
      caption: 'Original relationship cards, not a chain of command. Select each to see the source supporting its different role.',
      nodes: [
        { id: 'council', label: 'Graton Tribal Council', detail: 'A named governing institution with published community and economic responsibilities.', source: council },
        { id: 'constitution', label: 'Constitution', detail: 'A primary governing document describing the tribe’s organization.', source: constitution },
        { id: 'federal', label: 'United States relationship', detail: 'BIA describes government-to-government relations with federally recognized tribes.', source: governments },
        { id: 'state', label: 'State cooperation', detail: 'Governments can make agreements on shared matters such as environmental protection.', source: governments }
      ]
    },
    sources: [standards, council, constitution, governments]
  },
  '3.2.4': {
    objective: 'Use attributed evidence to explain newcomer actions, effects on established Native communities, and continuing Native life.',
    requirement: 'Examine interactions between newcomers and already-established local Native communities.',
    prerequisite: 'Understand past and present; know that a source has a maker and a point of view, and that settlement did not begin all local human history.',
    warmup: {
      prompt: 'Five-minute warm-up: In an imagined town, a new group arrives where families already live. Which question is more complete: "What did the newcomers build?" or "What did they build, and how were existing families affected?" Explain.',
      answer: 'The second question is more complete because it includes people already connected with the place. It does not assume that everyone experienced the change in the same way.'
    },
    evidence: [
      { title: 'Established communities', text: 'The Muwekma Ohlone Tribe traces family connections to earlier Bay Area communities. Native peoples were living in the region before Spanish colonial settlements.', source: muwekma },
      { title: 'Newcomer actions and effects', text: 'NPS describes Spanish missions and military settlements in the Bay Area. Introduced diseases, forced labor and pressure to replace Native religious life harmed Ohlone and Coast Miwok communities. Building a settlement and its effects on existing people are both parts of the history.', source: nativeHistory },
      { title: 'Who made the record?', text: 'Santa Clara University Archives explains that many Mission Santa Clara manuscripts were written by the priests running the mission. Those records show the writers’ perspective; they are not Native people’s own accounts of their experiences.', source: missionRecords },
      { title: 'Continuing life', text: 'Tamien Nation describes cultural practices its members continue today, including basket teaching and acorn preparation. Change and serious harm did not mean Native people disappeared.', source: tamien }
    ],
    model: {
      prompt: 'Make a supported action-and-effect statement, then add evidence of continuity. Do not invent an individual person’s thoughts.',
      answer: 'Spanish colonial missions changed life for established Native communities. The NPS account describes disease, forced labor and disruption of Native religious life. Tamien Nation’s present-day cultural account shows continuing practices and teaching today.',
      reasoning: ['Name the newcomer action and the established communities affected.', 'Use the account’s documented effects rather than guessing feelings.', 'Add a Native community’s own present-day evidence so the story does not stop at harm.']
    },
    guided: {
      prompt: 'A priest’s mission record describes building work. Can that single record tell us every Native person’s experience? Which displayed source adds a different kind of evidence?',
      hint: 'A source can be useful and limited at the same time. Compare who created each account.',
      answer: 'No. The record reflects its writer’s perspective and does not speak for every Native person. A Native community’s own account, such as the Muwekma or Tamien card, adds community evidence; it does not turn us into witnesses to every past event.'
    },
    practice: {
      support: { prompt: 'Improve this sentence: "Newcomers reached empty land." Use the first evidence card.', answer: 'Newcomers reached a region where Native communities already lived. The land was not empty of people or history.' },
      core: { prompt: 'Fill three evidence boxes: newcomer action; documented effect; continuing Native life.', answer: 'Action: Spanish missions and military settlement. Effect: the NPS account describes disease, forced labor and disruption. Continuity: Tamien Nation describes basket teaching and other practices today.' },
      challenge: { prompt: 'Two sources emphasize different things: a mission manuscript describes its administrators’ work; a Native account describes family continuity. Must one be useless? Explain what question each can help answer.', answer: 'Neither is automatically useless. The manuscript can show what its writer recorded about mission administration. The Native account can explain community and family continuity. Compare sources, authors and limits instead of treating one account as everyone’s experience.' }
    },
    checks: [
      { id: 'already-here', prompt: 'Which sentence includes the people already living in the region?', options: ['California had no history until settlers arrived', 'Settlers arrived in established Native homelands', 'Every account tells the same story'], correctIndex: 1, explanation: 'The evidence identifies Native communities before colonial settlement.', retry: 'Begin with Established communities before describing newcomers.' },
      { id: 'source-perspective', prompt: 'Why identify the writer of a mission manuscript?', options: ['To understand whose perspective and experience it records', 'To assume it describes everyone’s private thoughts', 'To avoid looking at evidence'], correctIndex: 0, explanation: 'Authorship helps explain what a record can and cannot tell us.', retry: 'Use the archive card: the writer’s role affects the perspective of the record.' },
      { id: 'continuity-evidence', prompt: 'Which displayed evidence challenges the claim that Native communities disappeared?', options: ['A blank date on a timeline', 'An invented ritual', 'Tamien Nation’s account of continuing cultural teaching'], correctIndex: 2, explanation: 'A named community describes cultural practices and teaching today.', retry: 'Find a present-day action reported by the community itself.' }
    ],
    independent: {
      prompt: 'Write or say a short evidence explanation with four parts: who was already here, what newcomers did, one supported effect, and one sign of continuing Native life. Identify at least two sources and one source limit.',
      answer: 'Native communities already lived in the Bay Area. Spanish newcomers established missions and military settlements. NPS describes forced labor and other harms. Tamien Nation describes continuing cultural teaching today. A priest’s mission record reflects its writer’s perspective and cannot by itself explain every Native person’s experience.',
      criteria: ['Includes established Native communities before newcomers.', 'Connects a documented action with a supported effect.', 'Includes a named present-day continuity example.', 'Identifies at least two attributed sources.', 'Explains a source limit without inventing motives or treating all communities alike.']
    },
    misconceptions: ['A founding date for a Spanish pueblo is not the beginning of Native life.', 'Reading more than one perspective does not require treating documented harms as imaginary.', 'Native people experienced change and harm and also continued family and cultural life.', 'A later institution’s explanation is different from a record written during the event.'],
    nextPreparation: 'Prepare 3.3.1 by researching explorers, later newcomers and people who continue arriving, while keeping the Native homeland in the story. No lesson completion is inferred from today’s date.',
    visual: {
      kind: 'timeline', title: 'Established lives, colonial changes, continuing communities',
      caption: 'Original broad sequence, not a dated history of every tribe. Select a stage to inspect its evidence; Native communities continue across the sequence.',
      nodes: [
        { id: 'before', label: 'Before colonial settlement', detail: 'Established Native communities and family histories in Bay Area homelands.', source: muwekma },
        { id: 'colonial', label: 'Spanish colonial changes', detail: 'Missions and military settlement changed Native life and caused documented harms.', source: nativeHistory },
        { id: 'continuing', label: 'Communities today', detail: 'Tamien Nation describes practices and cultural teaching continuing now.', source: tamien }
      ], correctOrder: ['before', 'colonial', 'continuing']
    },
    sources: [standards, muwekma, nativeHistory, missionRecords, tamien]
  }
};
