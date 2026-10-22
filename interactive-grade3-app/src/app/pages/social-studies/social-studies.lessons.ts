/** Original supplemental explanations. Source links travel with each factual passage
 * and image; the CDE expectation codes are the navigation, not a textbook sequence.
 * Verified against the linked primary sources on 2026-10-21. */
export interface TeachingSource { label: string; url: string; }
export interface TeachingImage {
  url: string; alt: string; caption: string; credit: string; source: TeachingSource;
}
export interface TeachingSection { title: string; text: string; source?: TeachingSource; }
export interface TeachingLesson {
  question: string;
  introduction: string;
  sections: TeachingSection[];
  image?: TeachingImage;
  connections?: { title: string; text: string }[];
  connectionLabel?: string;
  example: { title: string; text: string; source?: TeachingSource };
  takeaway: string;
  reading?: { title: string; note: string; source: TeachingSource };
}
const nps = { label: 'National Park Service · Ohlone and Coast Miwok history', url: 'https://www.nps.gov/articles/ohlones-and-coast-miwoks.htm' };
const bayshore = { label: 'National Park Service · Heritage of a Bayshore Culture', url: 'https://www.nps.gov/places/000/6-heritage-of-a-bayshore-culture.htm' };
const muwekma = { label: 'Muwekma Ohlone Tribe · Historical overview', url: 'https://muwekma.org/historical-overview.html' };
const bia = { label: 'Bureau of Indian Affairs · Tribal sovereignty', url: 'https://www.bia.gov/faqs/what-does-tribal-sovereignty-mean-american-indians-and-alaska-natives' };
const coast = { label: 'National Park Service · Point Reyes and the Pacific Ocean', url: 'https://www.nps.gov/pore/learn/nature/oceans.htm' };
const founding = { label: 'City of San José · Pueblo founding memorial', url: 'https://www.sanjoseca.gov/Home/Components/FacilityDirectory/FacilityDirectory/2521/1396' };
const farm = { label: 'City of San José · Emma Prusch Farm Park', url: 'https://www.sanjoseca.gov/Home/Components/FacilityDirectory/FacilityDirectory/2180/2028' };
const city = { label: 'City of San José · How the city is governed', url: 'https://www.sanjoseca.gov/your-government/departments-offices/office-of-the-city-manager' };
const archives = { label: 'National Archives · The U.S. Constitution', url: 'https://www.archives.gov/founding-docs/constitution' };
const legislature = { label: 'Ben’s Guide · Legislative branch', url: 'https://bensguide.gpo.gov/a-legislative' };
const executive = { label: 'Ben’s Guide · Executive branch', url: 'https://bensguide.gpo.gov/a-executive' };
const judiciary = { label: 'Ben’s Guide · Judicial branch', url: 'https://bensguide.gpo.gov/a-judicial' };
const econ = { label: 'Federal Reserve Bank of St. Louis · Economics concepts', url: 'https://www.stlouisfed.org/~/media/education/tools/pdf/scope_and_sequence_economics.pdf?la=en#page=6' };
const human = { label: 'Federal Reserve Bank of St. Louis · Education and human capital', url: 'https://www.stlouisfed.org/publications/page-one-economics/2013/02/01/investing-in-yourself-an-economic-approach-to-education-decisions/' };
const cde = (page: number): TeachingSource => ({ label: 'California Grade 3 teaching framework', url: `https://www.cde.ca.gov/ci/hs/cf/documents/hssfwchapter6.pdf#page=${page}` });
const constitution: TeachingImage = {
  url: 'https://www.archives.gov/files/founding-docs/constitution_1_of_4_630.jpg',
  alt: 'The first handwritten page of the United States Constitution, beginning We the People.',
  caption: 'Look at the large opening words, “We the People.” This is a reproduction of the actual document, not a modern classroom poster.',
  credit: 'U.S. National Archives · Constitution, page 1', source: archives
};
const boat: TeachingImage = {
  url: 'https://www.nps.gov/goga/learn/historyculture/images/tuleboat1_1.jpg?autorotate=false&maxwidth=650',
  alt: 'Linda Yamane’s illustration of people traveling in a tule boat on the bay.',
  caption: 'Tule reeds were made into boats for travel, fishing, and hunting. This illustration helps connect a local plant with a useful object.',
  credit: 'Illustration courtesy of Linda Yamane · published by NPS', source: bayshore
};
const gathering: TeachingImage = {
  url: 'https://www.nps.gov/goga/learn/historyculture/images/ohlonegathering1.jpg?autorotate=false&maxwidth=650',
  alt: 'Linda Yamane’s illustration of Ohlone people gathering food and carrying baskets.',
  caption: 'The National Park Service describes willow baskets used to carry mussels and other foods. A drawing explains an activity; it is not a photograph of the past.',
  credit: 'Illustration courtesy of Linda Yamane · published by NPS', source: nps
};
export const SOCIAL_STUDIES_LESSONS: Record<string, TeachingLesson> = {
  '3.1.1': {
    question: 'What can a map tell us about a place?',
    introduction: 'Before we learn a community’s history, we need to picture its setting. Look for the land, the water, and the places where they meet. A map helps us see how these features fit together.',
    sections: [
      { title: 'Read the shape of the coast', text: 'Point Reyes is a peninsula with the Pacific Ocean on three sides. Follow its outline on the map. Land reaches out into the water, while bays curve inward along the coast. Those shapes help us describe where a place is.', source: coast },
      { title: 'Read the map’s message', text: 'This map’s colored areas show marine sanctuaries. They do not show different kinds of land. Read the title and key before deciding what a color means. A map can tell a story about boundaries as well as land and water.', source: coast },
      { title: 'Connect a feature to life nearby', text: 'The ocean affects the weather around Point Reyes and supports many living things. Geography is more than a list of place names: the setting helps explain what people can find and do in a region.', source: coast }
    ],
    image: { url: 'https://www.nps.gov/pore/learn/nature/images/map_gfnms_cbnms_2015_960x1242.jpg?autorotate=false&maxwidth=650', alt: '2015 map of Greater Farallones and Cordell Bank marine sanctuaries, with Point Reyes and San Francisco Bay.', caption: 'Start with the coastline. Find Point Reyes, the Pacific Ocean, and San Francisco Bay. The colored offshore boundaries show sanctuaries as mapped in 2015.', credit: 'NOAA map · published by the National Park Service · 2015', source: coast },
    example: { title: 'Describing a place clearly', text: '“Near water” is a start. “On a peninsula beside the Pacific Ocean” tells us much more. In your own neighborhood, a hill, creek, or valley can help you describe a location more precisely.' },
    takeaway: 'Use a map’s labels, shapes, and key together. Color alone does not tell you what a feature is.',
    reading: { title: 'The Geography of Where We Live', note: 'California’s framework points to this EEI unit for 3.1.1–3.1.2. It is a supporting resource, not a verified school textbook.', source: cde(4) }
  },
  '3.1.2': {
    question: 'How do people use and change a place?',
    introduction: 'A community needs water, food, shelter, and ways to travel. People use their surroundings to meet those needs. Their choices can also change the places that other people, plants, and animals depend on.',
    sections: [
      { title: 'A real example beside the bay', text: 'Before the Crissy Field marsh was rebuilt, people found remains of a seasonal Yelamu village. The National Park Service worked with Ohlone community members and archaeologists and changed the marsh design to preserve the site.', source: bayshore },
      { title: 'One place, several responsibilities', text: 'This example connects the environment with community history. Rebuilding the marsh was not only a question of where water would go. The work also needed to protect evidence of people who had lived there.', source: bayshore }
    ],
    connectionLabel: 'Following the decision · based on the NPS account',
    connections: [{title:'A place is changed',text:'A marsh reconstruction is planned.'},{title:'Evidence is found',text:'Remains of a Yelamu village are identified.'},{title:'People respond',text:'The design changes to preserve the site.'}],
    example: { title: 'A neighborhood example · imagined', text: 'Imagine a town needs a new path beside a creek. A wide paved path might make travel easier, but remove plants. A narrower route might protect more of the creek bank. To understand the choice, explain both the need and the change to the place.' },
    takeaway: 'When people change a place, ask what need they are meeting and what else the change affects.',
    reading: { title: 'Read together: A River Ran Wild', note: 'Lynne Cherry’s book is named in the California framework to explore people and their environment.', source: cde(4) }
  },
  '3.2.1': {
    question: 'Who are the Ohlone peoples, past and present?',
    introduction: 'Meet the Native peoples of the Bay Area. Different communities have their own names, languages, and traditions. Their stories are about the past—and about people living here today.',
    sections: [
      { title: 'Communities with their own identities', text: 'Ohlone peoples lived in many independent communities around the Bay Area. Stories, songs, dance, and spiritual traditions were part of community life. A single picture or object cannot tell us everything about a people.', source: nps },
      { title: 'A living community', text: 'The Muwekma Ohlone Tribe tells its own story. Its homeland includes much of Santa Clara County. Members today trace their family connections to earlier generations in the Bay Area.', source: muwekma },
      { title: 'Learn from the people themselves', text: 'A tradition is something a community passes from one generation to the next. Imagine learning a song from a grandparent, then sharing it with a younger family member. That is one way a tradition can continue. This family example is imagined.' }
    ], image: gathering,
    example: { title: 'What this illustration can explain', text: 'Notice the basket carried on the person’s back. It leaves their hands free while they move. The source tells us that willow baskets carried mussels and other food. The picture helps us imagine how a useful object fits into daily life.' },
    takeaway: 'Native peoples have distinct identities and living communities. Learn their names and listen to their accounts.'
  },
  '3.2.2': {
    question: 'How did local materials become useful things?',
    introduction: 'A plant can be much more than something growing beside the water. With knowledge and skill, people can turn a local material into a boat or a shelter. Geography and human knowledge work together.',
    sections: [
      { title: 'Tule reeds and water travel', text: 'The National Park Service describes Ohlone boats made from tule reeds. People used them to travel, fish, and hunt. The plant supplied the material; people supplied the knowledge needed to make and use the boat.', source: bayshore },
      { title: 'Materials for a home', text: 'Along the bay shore, a common Ohlone home used willow wood for a domed frame and tule for its covering. This is a specific regional example, not a description of every California Native home.', source: bayshore },
      { title: 'An environment does not build a boat', text: 'Seeing reeds beside water is only the first part of the connection. People must know which materials to gather and how to shape them. Explain both the natural resource and the skill, rather than saying “they lived near water.”' }
    ], image: boat,
    connectionLabel: 'Two connections described by NPS',
    connections: [{title:'Tule reeds → boat',text:'A local material supports travel on the bay.'},{title:'Willow + tule → shelter',text:'A frame and covering work together.'}],
    example: { title: 'Read the illustration', text: 'Look at the long, narrow boat and the water around it. The illustration makes the connection between material, object, and use visible. It is a historical illustration, not evidence that people only traveled this way.' },
    takeaway: 'Explain the chain: local material → people’s knowledge and skill → a useful object.',
    reading: { title: 'California Indian People: Exploring Tribal Regions', note: 'An EEI resource named in California’s Grade 3 framework for 3.2.2.', source: cde(5) }
  },
  '3.2.3': {
    question: 'What does it mean for a tribe to govern itself?',
    introduction: 'A tribe is not just a group of people who share traditions. Tribal communities also have ways to make decisions, organize life, and care for their people and lands.',
    sections: [
      { title: 'Community decisions', text: 'Historically, the Ohlone and Coast Miwok peoples were organized in independent groups. Their communities had their own organization; they were not one government for all Native people in California.', source: nps },
      { title: 'Sovereignty means self-government', text: 'Sovereignty means authority to govern. A tribe makes decisions about its own people and affairs. Federally recognized tribes keep this authority within limits set by U.S. laws and treaties. They work with the United States as governments.', source: bia },
      { title: 'Study each tribe specifically', text: 'Tribes can organize their governments in different ways. A constitution describes how a government works. To learn about a particular tribe, start with the information that tribe shares about its leaders and rules.' }
    ],
    connectionLabel: 'Keep these ideas distinct',
    connections: [{title:'Culture',text:'Identity, beliefs, customs, and traditions.'},{title:'Economy',text:'How people obtain, make, and exchange what they need.'},{title:'Government',text:'How a community organizes decisions and authority.'}],
    example: { title: 'Why the distinction matters', text: 'A picture of a basket can help explain a material or a skill. It cannot tell us how a tribe selects its leaders. Different questions require different evidence.' },
    takeaway: 'A tribal government is a government. Its history and authority must be described specifically.',
    reading: {title:'Tribal sovereignty, explained by Indian Affairs',note:'Explore the official explanation of a tribe’s authority to govern itself.',source:bia}
  },
  '3.2.4': {
    question: 'How did colonization change Native communities?',
    introduction: 'When newcomers arrived, they entered places where Native communities already lived. To understand this history, we need to consider what changed for the people who were already there.',
    sections: [
      { title: 'Spanish settlement in the Bay Area', text: 'Spanish settlers established military posts, missions, and towns. Mission life brought major changes to Native communities. Introduced diseases, forced labor, and pressure to replace Native religious practices harmed people and their ways of life.', source: nps },
      { title: 'History continues into the present', text: 'Ohlone and Coast Miwok descendants still live in the Bay Area. Work to sustain languages, stories, songs, and other traditions continues. The history does not end with the missions.', source: nps },
      { title: 'More than one viewpoint', text: 'A newcomer’s account might describe a new settlement. A Native account may describe losing control of a homeland. Reading both helps us notice whose experiences are included and whose experiences are missing.' }
    ],
    connectionLabel:'Read the history across time',
    connections:[{title:'Before colonization',text:'Established Native communities and homelands.'},{title:'During colonization',text:'Disruption, disease, forced labor, and loss.'},{title:'Continuing today',text:'Living communities and cultural renewal.'}],
    example:{title:'Choosing careful words',text:'“Settlers arrived in an empty place” erases the people already there. “Settlers arrived in Native homelands” keeps those communities in the story.'},
    takeaway:'Describe both the arrival of newcomers and its consequences for Native people.'
  },
  '3.3.1': {
    question:'Why do people move to a community?',
    introduction:'A community’s story includes people who were already there and people who arrived later. Learning when people moved is useful. Learning why they moved and what they brought helps explain change.',
    sections:[
      {title:'One part of San José’s story',text:'The City of San José dates the founding of the Spanish pueblo to November 29, 1777. It was an agricultural settlement intended to supply nearby Spanish missions and military posts. That date marks a Spanish settlement, not the beginning of Native life in the region.',source:founding},
      {title:'Moves have different reasons',text:'In an imagined example, one family moves for a job and another moves to live near relatives. They arrive in the same town for different reasons. Neither story should be used to guess why all families move.'},
      {title:'People bring more than belongings',text:'Language, food, religious practices, celebrations, and skills can travel with people. To describe a real community’s traditions, use a named family’s or community’s account instead of inventing a story about them.'}
    ],
    connectionLabel:'A way to understand a migration account',
    connections:[{title:'Where and when?',text:'Locate the move in place and time.'},{title:'Why move?',text:'Look for a reason in the account.'},{title:'What changed?',text:'Notice contributions and effects on people already there.'}],
    example:{title:'A founding date is only one chapter',text:'“San José’s Spanish pueblo was founded in 1777” and “Native people lived in the region earlier” can both be true. The first statement describes a particular event, not everyone’s beginning.',source:founding},
    takeaway:'A community’s history includes different arrivals, reasons, contributions, and experiences.',
    reading:{title:'Read together: My Diary from Here to There',note:'Amada Irma Pérez’s book is named in the California framework for discussing why people move.',source:cde(5)}
  },
  '3.3.2': {
    question:'How does the work in a community change?',
    introduction:'An economy is the way people make, exchange, and use goods and services. To understand a community, look at its work: what people produce, the resources they use, and the people who buy what they make.',
    sections:[
      {title:'From orchards to other kinds of work',text:'The City of San José describes its earlier farming community and orchards, followed by growth in technology industries. The kinds of work changed. Comparing these periods helps us ask how tools, skills, and land use changed too.',source:city},
      {title:'Starting a business',text:'An entrepreneur starts and organizes a business. In an imagined example, a person opens a small repair shop. They decide what service to offer, gather tools, and try to attract customers. Success is not guaranteed.',source:econ},
      {title:'Property and choices',text:'Private property belongs to individuals or organizations rather than to the public. In the imagined shop, the owner’s tools are private property. Owning equipment allows the owner to decide how to use it, within the law.',source:econ}
    ],
    connectionLabel:'Compare the work · original examples',
    connections:[{title:'An orchard',text:'Land, water, trees, tools, and growing skills.'},{title:'A repair shop',text:'Workspace, tools, parts, and repair skills.'}],
    example:{title:'Look beyond “old” and “new”',text:'Both examples need people with knowledge and equipment. The useful comparison is what they produce and what resources they use—not simply that one belongs to the past.'},
    takeaway:'Changing work can change a community’s skills, tools, businesses, and use of land.'
  },
  '3.3.3': {
    question:'How do we know what happened long ago?',
    introduction:'Historians use evidence. A map, photograph, letter, or remembered account can tell us something about the past. Each source has a maker, a time, and a point of view.',
    sections:[
      {title:'Put events in order',text:'A timeline puts events in time order. San José’s Spanish pueblo was founded in 1777. That is one event in the community’s long story. The later park donation shown here happened many generations afterward.',source:founding},
      {title:'A local example of continuity',text:'In 1962, Emma Prusch gave land to the city for a park. Emma Prusch Farm Park keeps a connection with the area’s farming history. Its purpose changed, but its link with farming remains.',source:farm},
      {title:'A clue is not the whole story',text:'Imagine a photograph showing a street with a horse-drawn wagon. You can describe the wagon you see. You cannot conclude that everyone in the town owned one. Keep an observation separate from a guess.'}
    ],
    connectionLabel:'Two local events · dates from the City of San José',
    connections:[{title:'1777',text:'The Spanish pueblo is founded.'},{title:'1962',text:'Emma Prusch gives land for a park.'}],
    example:{title:'Two kinds of evidence',text:'A letter written during an event is a primary source. A historian’s later explanation is a secondary source. Both can help, but they answer different questions. Ask who made the source, when, and what it can actually show.',source:cde(6)},
    takeaway:'Build a history from dated evidence, and explain what each source can and cannot tell you.',
    reading:{title:'Read together: The House on Maple Street',note:'Bonnie Pryor’s book is named in the California framework to introduce how a place changes over time.',source:cde(6)}
  },
  '3.4.1': {
    question:'Why do communities need rules and laws?',
    introduction:'People share spaces and make decisions that affect others. Rules help explain what people may do and what responsibilities they have. A fair rule needs a clear purpose—not just an order to follow.',
    sections:[
      {title:'Start with a shared need',text:'Imagine a classroom where everyone speaks at once. A rule about taking turns helps people hear one another. If someone interrupts, a fair response could be to pause and return the turn to the speaker. The response connects to the purpose of the rule.'},
      {title:'The Constitution has a different role',text:'The U.S. Constitution is the nation’s highest law. Government laws and actions must fit within it. It provides the framework for government; it is not a list of classroom rules.',source:judiciary},
      {title:'People have a part in lawmaking',text:'Citizens elect members of Congress, which makes federal laws. This connects people’s choices in elections to the government’s decisions.',source:legislature}
    ],image:constitution,
    example:{title:'Explain the reason behind a rule',text:'“Take turns speaking so that everyone can be heard” explains both the action and its purpose. “Because I said so” does not explain how the rule helps the community.'},
    takeaway:'Connect a rule to its purpose, responsibilities, and fair consequences. The Constitution sets the framework for U.S. government.'
  },
  '3.4.2': {
    question:'What does helping a community look like?',
    introduction:'Civic responsibility means thinking about the people who share a community with you. It includes listening, taking care of shared places, and helping solve problems—not only following directions.',
    sections:[
      {title:'Notice a shared concern',text:'Imagine children notice that a playground path is often blocked by loose equipment. The problem affects more than one person. Before suggesting a solution, they listen to people who use the path in different ways.'},
      {title:'Move from a complaint to a proposal',text:'They could suggest a marked storage area and explain how it would help. A proposal is stronger when it names a problem, offers a possible solution, and gives a reason. Respectful disagreement can help improve the idea.'},
      {title:'Participate thoughtfully',text:'California’s Grade 3 framework connects citizenship with civic engagement and improving the community. The playground story here is an original example of those ideas, not a report about a real school.',source:cde(7)}
    ],connectionLabel:'A community example · imagined',
    connections:[{title:'Notice',text:'The path is blocked.'},{title:'Listen',text:'Understand who is affected.'},{title:'Explain',text:'Propose storage that keeps the path clear.'}],
    example:{title:'A reason that includes others',text:'“I want it moved” is a preference. “Let’s store the equipment here so people can use the path safely” connects the suggestion to a shared need.'},
    takeaway:'Good participation combines listening, reasons, and concern for other people.'
  },
  '3.4.3': {
    question:'What do documents and landmarks help us remember?',
    introduction:'A community can remember its history through a document, a symbol, or a place. To understand one, look beyond its appearance: find out what it represents and why people preserve it.',
    sections:[
      {title:'A national document',text:'The Constitution begins with “We the People.” The National Archives preserves the original four-page document. Looking at the actual page connects our reading to a real historical object.',source:archives},
      {title:'A local memorial',text:'San José’s pueblo founding memorial was created in 1997. Its columns and images commemorate the 1777 Spanish settlement. The memorial and the event are from different times.',source:founding},
      {title:'Ask what is being remembered',text:'A memorial shows what its makers chose to emphasize. It may leave out other experiences. To understand a place fully, read the memorial’s explanation alongside other accounts.'}
    ],image:constitution,
    example:{title:'Object, meaning, history',text:'For the Constitution, the object is a written document. Its opening words identify the people as the source of its authority. For a memorial, we need its title and historical explanation to understand what its shapes represent.',source:archives},
    takeaway:'Explain what a symbol or landmark represents, when it was made, and which story it tells.'
  },
  '3.4.4': {
    question:'Why does government have different jobs?',
    introduction:'Making a law, carrying it out, and deciding how it applies are different jobs. The federal government divides these responsibilities among three branches.',
    sections:[
      {title:'Legislative: makes laws',text:'Congress is the lawmaking branch. It includes the House of Representatives and the Senate. Making a law means deciding the rule that will be used.',source:legislature},
      {title:'Executive: carries laws out',text:'The President leads the executive branch. This branch carries out laws through the work of departments and agencies. A law needs people and organizations to put it into action.',source:executive},
      {title:'Judicial: interprets laws',text:'Courts decide what laws mean and how they apply to cases. They also consider whether laws conflict with the Constitution. This is different from writing a new law.',source:judiciary},
      {title:'Connect it to San José',text:'San José uses a council-manager system. The elected city council provides policy leadership; an appointed city manager runs day-to-day services and carries out those policies. The federal diagram is not an exact diagram of city government.',source:city}
    ],image:{url:'https://bensguide.gpo.gov/sites/default/files/styles/large/public/2026-01/Branches-of-Government.jpg.avif?itok=kqqk-JEW',alt:'Ben’s Guide infographic showing the legislative, executive, and judicial branches of the United States government.',caption:'Read the three branches across the official GPO diagram. Use the short explanations beside it to understand each branch’s main job.',credit:'U.S. Government Publishing Office · Ben’s Guide',source:{label:'Ben’s Guide · Official teaching infographic',url:'https://bensguide.gpo.gov/for-parents-and-educators/15-parents-educators/186-infographics'}},
    example:{title:'Three jobs, not three steps',text:'The branches are not simply stations in a line. A court may consider a law long after it was passed. The diagram organizes responsibilities; it does not show that every law must travel through the courts.'},
    takeaway:'Remember the different jobs: make laws, carry them out, and interpret them.'
  },
  '3.4.5': {
    question:'How do governments fit together?',
    introduction:'The United States has a national government and state governments. Local governments serve communities. Tribal governments also have their own authority and a distinct relationship with the United States.',
    sections:[
      {title:'A union of states',text:'The Constitution joined states in a national framework. California is part of that union. National and state government are different from the branches within a government: “state” is not a fourth branch.',source:archives},
      {title:'Tribes have a distinct position',text:'Federally recognized tribes retain sovereignty within limits established by U.S. law. They are not simply neighborhoods or city departments. Their relationship with the federal government is a government-to-government relationship.',source:bia},
      {title:'Avoid a misleading ladder',text:'A diagram placing all tribes underneath a city would give the wrong idea. When comparing governments, ask whom each serves and what authority it has, rather than imagining every decision comes from one simple chain.'}
    ],connectionLabel:'Different governments · not a chain of command',
    connections:[{title:'National',text:'The United States government.'},{title:'State and local',text:'California and communities within it.'},{title:'Tribal',text:'Tribal governments with distinct sovereignty.'}],
    example:{title:'Two questions that sound alike',text:'“Is this a state or national responsibility?” asks about governments. “Is this a legislative or executive job?” asks about functions. Keeping those questions separate makes government easier to understand.'},
    takeaway:'Levels of government and branches of government describe different things.'
  },
  '3.4.6': {
    question:'How did Harriet Tubman help people gain freedom?',
    introduction:'Freedom has often required people to challenge injustice. A biography helps us connect a person’s choices with the risks they faced and the people their actions helped.',
    sections:[
      {title:'Seeking her own freedom',text:'Harriet Tubman was born enslaved in Maryland. In 1849 she escaped. Slavery denied people freedom and forced them to work under the control of enslavers.',source:{label:'National Park Service · Harriet Tubman',url:'https://www.nps.gov/people/harriet-tubman.htm'}},
      {title:'Returning to help others',text:'Tubman returned to Maryland many times to help family and friends escape, despite the danger of capture. Her knowledge of the land and help from others supported this work.',source:{label:'National Park Service · Harriet Tubman',url:'https://www.nps.gov/people/harriet-tubman.htm'}},
      {title:'Continuing the work',text:'She later worked for women’s voting rights and cared for others. Her life connects freedom with action: helping people was something she did over many years.',source:{label:'National Park Service · Harriet Tubman',url:'https://www.nps.gov/people/harriet-tubman.htm'}}
    ],image:{url:'https://www.nps.gov/common/uploads/people/nri/20190709/people/70A8AE31-C040-9D69-7CB06EDF2006F8E1/70A8AE31-C040-9D69-7CB06EDF2006F8E1.jpg',alt:'Portrait of Harriet Tubman seated, photographed in 1868 or 1869.',caption:'This portrait dates to 1868 or 1869, after Tubman’s escape and rescue journeys. The photograph shows a person; the historical account explains her actions.',credit:'Library of Congress · published by the National Park Service',source:{label:'National Park Service · Portrait and biography',url:'https://www.nps.gov/people/harriet-tubman.htm'}},
    example:{title:'Explain courage with evidence',text:'Instead of only saying “She was brave,” explain the action and risk: Tubman returned to help other people escape even though she could be captured.',source:{label:'National Park Service · Harriet Tubman',url:'https://www.nps.gov/people/harriet-tubman.htm'}},
    takeaway:'A strong biography connects what a person did, why it mattered, and what it cost them.'
  },
  '3.5.1': {
    question:'What does it take to produce something?',
    introduction:'A finished object can hide all the work behind it. To understand production, look backward: which materials, people, and tools made the object possible?',
    sections:[
      {title:'Three kinds of resources',text:'Natural resources come from nature. Human resources are the people doing the work. Capital resources are made objects, such as tools and equipment, used to produce other goods or services.',source:econ},
      {title:'Follow an imagined bakery',text:'Water is a natural resource. The baker is a human resource. The oven is a capital resource. Flour is an ingredient made by processing grain; it is not the same thing as an untouched resource from nature.'},
      {title:'Compare past and present',text:'Imagine two bakeries, one mixing dough by hand and the other using an electric mixer. Both need ingredients and skilled people. The changed equipment may change how the work is done. This is a comparison example, not a claim about a particular historical bakery.'}
    ],connectionLabel:'Inside an imagined bakery',
    connections:[{title:'Nature',text:'Water and the land where grain grows.'},{title:'People',text:'A baker’s work and attention.'},{title:'Equipment',text:'A mixing bowl, tools, and an oven.'}],
    example:{title:'The finished loaf tells only part of the story',text:'A loaf is the output. The ingredients, labor, and equipment are inputs. Naming those inputs helps us see how people depend on nature, skills, and tools together.'},
    takeaway:'Explain production by connecting resources with the work that turns them into a good or service.'
  },
  '3.5.2': {
    question:'Where do the things in our community come from?',
    introduction:'An item can be sold nearby even when it was produced far away. To understand where goods originate, distinguish where something was made from where someone bought it.',
    sections:[
      {title:'Three useful distances',text:'California’s standard distinguishes goods produced locally, elsewhere in the United States, and overseas. “Local” depends on the community we are describing. A shop’s location alone does not tell us where its goods were produced.',source:{label:'California standard 3.5.2',url:'https://www.cde.ca.gov/be/st/SS/documents/histsocscistnd.pdf#page=18'}},
      {title:'Follow the information',text:'In an imagined example, a shop sells apples from a nearby farm, a chair made in another state, and a toy made in another country. All three are sold locally. Their production locations are different.'},
      {title:'One object can connect several places',text:'A product’s materials and assembly may come from different places. A “made in” label is a useful clue, but it does not describe every material’s journey. Be clear about which part of the journey your evidence describes.'}
    ],connectionLabel:'Same shop, different origins · imagined examples',
    connections:[{title:'Nearby farm',text:'Apples grown in the local area.'},{title:'Another U.S. state',text:'A chair made elsewhere in the country.'},{title:'Another country',text:'A toy produced overseas.'}],
    example:{title:'Sold here does not mean made here',text:'The shop is the destination in this example. The farm or factory is a production location. Those are two different facts about the same object.'},
    takeaway:'Trace a good’s origin using evidence; do not infer it from the store where it is sold.'
  },
  '3.5.3': {
    question:'What do we give up when we choose?',
    introduction:'A choice can give us something we want and also mean giving up something else. Thinking about both sides helps explain why two people might make different choices.',
    sections:[
      {title:'Costs and benefits',text:'A benefit is something gained from a choice. A cost is something given up. Opportunity cost is the next-best alternative you give up—not a list of every possible thing you could have done.',source:econ},
      {title:'A choice about time',text:'Imagine you have one free half-hour and want to either read a story or draw a picture. If you choose the story, the benefit is reading time. The opportunity cost is the drawing time you would otherwise have chosen. No money changes hands, but there is still a trade-off.'},
      {title:'Different people, different reasons',text:'A friend may choose drawing because making art matters more to them that afternoon. Neither choice is automatically the best for everyone. Explain the goal and the trade-off before judging the decision.'}
    ],connectionLabel:'One half-hour · an imagined choice',
    connections:[{title:'Read a story',text:'Gain reading time; give up drawing time.'},{title:'Draw a picture',text:'Gain drawing time; give up reading time.'}],
    example:{title:'The missing part of “I chose it”',text:'A complete explanation might say: “I chose to read because I want to finish the story. I gave up drawing during that half-hour.” It names the choice, reason, and alternative.'},
    takeaway:'Understand a choice by naming its benefit and the next-best alternative given up.'
  },
  '3.5.4': {
    question:'How does learning help us do more?',
    introduction:'A tool can help someone work, but knowledge matters too. Learning develops abilities that people can use in school, at home, and in future work.',
    sections:[
      {title:'Knowledge is a resource',text:'Economists use “human capital” for the knowledge and skills people develop. Education and training can build it. This is different from physical capital, such as a machine or a tool.',source:human},
      {title:'See the difference',text:'Imagine two people with the same sewing machine. One is learning to thread it; the other knows how to measure, cut, and repair a seam. The equipment is the same, but their learned skills differ.'},
      {title:'Schoolwork connects with everyday life',text:'In original examples, reading helps someone follow instructions, mathematics helps someone measure materials, and speaking and listening help a group explain a plan. A skill can be useful in many settings; it is not tied to only one job.'}
    ],connectionLabel:'Equipment and knowledge work together · original example',
    connections:[{title:'The tool',text:'A sewing machine: physical capital.'},{title:'The skill',text:'Knowing how to sew: human capital.'},{title:'The result',text:'Using both to repair a seam.'}],
    example:{title:'Learning changes what a person can do',text:'At first, a learner may need every step demonstrated. With teaching and practice, they may be able to explain and complete the work independently. The new capability is part of what the learning has built.'},
    takeaway:'Education develops capabilities. Tools are useful, but knowing how to use them matters too.'
  }
};
