import { TeachingImage, TeachingSection, TeachingSource } from './social-studies.lessons';

export interface Exploration { title: string; sections: TeachingSection[]; images?: TeachingImage[]; }
const history: TeachingSource = {label:'History San José · Eastside Art & History',url:'https://historysanjose.org/plan-your-visit/exhibits-activities/online-exhibits/welcome-to-eastside-art-history/'};
const mapSource: TeachingSource = {label:'Library of Congress · San José, 1869',url:'https://www.loc.gov/item/75693107/'};
const bakers: TeachingSource = {label:'U.S. Bureau of Labor Statistics · What bakers do',url:'https://www.bls.gov/ooh/production/bakers.htm#tab-2'};
const landsEnd: TeachingSource = {label:'National Park Service · Yelamu Ohlone life at Lands End',url:'https://www.nps.gov/places/000/9-ohlone-life.htm'};
const eastBay: TeachingSource = {label:'National Park Service · Ohlone life in the East Bay',url:'https://www.nps.gov/places/stop-6-american-indians-in-the-east-bay.htm'};
const graton: TeachingSource = {label:'Federated Indians of Graton Rancheria · Tribal Council',url:'https://gratonrancheria.com/government/tribal-council/'};
const rights: TeachingSource = {label:'National Archives · Bill of Rights',url:'https://www.archives.gov/founding-docs/bill-of-rights'};
const declaration: TeachingSource = {label:'National Archives · Declaration of Independence',url:'https://www.archives.gov/founding-docs/declaration'};
const yosemite: TeachingSource = {label:'National Park Service · Yosemite Junior Ranger Handbook, pp. 20–23',url:'https://www.nps.gov/yose/learn/kidsyouth/upload/junior-ranger-book-sm.pdf#page=20'};

export const SAN_JOSE_MAP: TeachingImage = {
 url:'https://tile.loc.gov/image-services/iiif/service:gmd:gmd436:g4364:g4364s:pm000400/full/pct:12.5/0/default.jpg',
 alt:'Bird’s-eye drawing of San José in 1869, showing streets, buildings, fields, and surrounding hills.',
 caption:'San José in 1869. This is a drawn bird’s-eye view, not a photograph or a map for measuring distances. Notice the town’s streets and the open land around them.',
 credit:'Gray & C. B. Gifford · 1869 · Library of Congress, Geography and Map Division',source:mapSource
};
export const FARM_PAST: TeachingImage = {
 url:'https://i0.wp.com/historysanjose.org/wp-content/uploads/2022/05/ca603-prusch-img-3.jpg?resize=985%2C714&ssl=1',
 alt:'Historical photograph of the Prusch dairy herd grazing, around 1940.',
 caption:'Around 1940: cows graze on the Prusch dairy farm. This photograph records one use of the land at that time.',credit:'History San José · Prusch dairy herd, circa 1940',source:history
};
export const FARM_PRESENT: TeachingImage = {
 url:'https://i0.wp.com/historysanjose.org/wp-content/uploads/2022/05/6d28f-prusch-img-1.jpg?resize=800%2C533&ssl=1',
 alt:'The preserved Prusch farmhouse at Emma Prusch Farm Park.',
 caption:'The preserved farmhouse at the park. History San José explains that it is used for exhibits and park operations. The building remains while its use has changed.',credit:'History San José · Prusch farmhouse; photograph date not stated',source:history
};
export const BAKER_IMAGE: TeachingImage = {
 url:'https://www.bls.gov/ooh/images/3074.jpg',alt:'A baker preparing baked goods in a kitchen.',
 caption:'Look for the person, ingredients, and equipment. Making baked goods brings several kinds of resources together.',credit:'U.S. Bureau of Labor Statistics · Bakers',source:bakers
};
export const TRAINING_IMAGE: TeachingImage = {
 url:'https://www.bls.gov/ooh/images/3077.jpg',alt:'Baking work shown on the Bureau of Labor Statistics page about learning to become a baker.',
 caption:'Bakers often learn at work. Measuring ingredients, following recipes, and handling equipment are learned skills.',credit:'U.S. Bureau of Labor Statistics · How to become a baker',source:{...bakers,url:'https://www.bls.gov/ooh/production/bakers.htm#tab-4'}
};

// These are original teaching passages, not extracts or a publisher's lessons.
export const SOCIAL_STUDIES_EXPLORATIONS: Record<string, Exploration> = {
 '3.1.1': {title:'From high land to the sea',sections:[
  {title:'Land has different shapes',text:'A mountain rises high above the land around it. A hill is a smaller rise. A valley is lower land between higher areas. The coast is where land meets the sea. These words let us describe a place more precisely than “over there.”'},
  {title:'Water connects places',text:'In Yosemite, melting snow feeds streams and rivers. A watershed is the area of land that drains into a river system. Water travels across a landscape, connecting higher places with lower ones. The park’s handbook shows the Merced River, Central Valley, delta, bay, and Pacific Ocean.',source:yosemite},
  {title:'A valley is not always shaped the same way',text:'Yosemite Valley has a broad U shape shaped by glaciers—large moving masses of ice. Rivers, ice, and falling rock can change the land over a long time. A landform is a shape we see now, with a history behind it.',source:yosemite},
  {title:'Two views of a place',text:'A photograph shows what a place looks like from one viewpoint. A map can show how several places fit together. Imagine looking at a hill from a road, then seeing that hill marked beside a river on a map. Each view adds information.'}
 ]},
 '3.1.2': {title:'The same land can serve different needs',images:[FARM_PAST,FARM_PRESENT],sections:[
  {title:'Follow one real place',text:'The Prusch farm photographs show a dairy herd and a preserved farmhouse. The farmhouse later became a place for exhibits and park work. A building can remain while the way people use it changes.',source:history},
  {title:'Use, change, and care',text:'Imagine a grassy field becoming a community garden. People might add beds, paths, and a water supply. The garden provides food, but the work also changes the soil and where water flows. “People used the land” is only the beginning of the explanation.'},
  {title:'Explain the whole connection',text:'Start with a need, such as growing food. Name the resource, such as soil and water. Then describe the change, such as adding irrigation. Finally, consider the effects on nearby places and people. This gives a fuller explanation than simply naming the new garden.'}
 ]},
 '3.2.1': {title:'Meet a named community: the Yelamu',sections:[
  {title:'A place beside the ocean',text:'The National Park Service describes the Yelamu as an Ohlone tribe that lived at Lands End in seasonal settlements. Fresh-water springs, plants for shelter, and access to the shore helped support life there.',source:landsEnd},
  {title:'Life included work and enjoyment',text:'The Lands End exhibit describes fishing, repairing nets, carrying food in baskets, playing stick games, and telling tribal stories. A community’s life includes leisure and shared stories as well as obtaining food.',source:landsEnd},
  {title:'Objects carry knowledge',text:'The exhibit also describes a soaproot brush and stone-working tools. Its replica objects were made by contemporary Ohlone people. Replicas can show how an object was made and used, while original objects provide evidence from an earlier time.',source:landsEnd},
  {title:'A tradition can travel through generations',text:'Think of the imagined family song described above. The song continues because people remember it, teach it, and choose to sing it. In the same way, learning about culture means noticing the people who keep knowledge alive—not only looking at old objects.'}
 ]},
 '3.2.2': {title:'A year of finding food and making useful things',sections:[
  {title:'Different places offered different foods',text:'In the East Bay, Ohlone people caught fish in creeks, hunted animals, and gathered berries and shellfish. In autumn, acorns were harvested and prepared as an important food. Knowing the seasons helped people know when resources were available.',source:eastBay},
  {title:'A useful plant could have several uses',text:'The NPS account describes tule for baskets and boats, soaproot for cleaning, and miner’s lettuce as a leafy food. These examples show knowledge of particular plants, not simply using any plant that happened to be nearby.',source:eastBay},
  {title:'Clothing also connected people with their surroundings',text:'East Bay Regional Park District describes Ohlone clothing made with softened deer hide and strips of inner bark. For cold weather, people made capes from otter or jackrabbit fur. Materials had to be carefully prepared and joined together: knowing how to make clothing was a learned skill.',source:{label:'East Bay Regional Park District · Ohlone and Bay Miwok curriculum, p. 39',url:'https://www.ebparks.org/node/7280#page=73'}},
  {title:'Connect place, season, and need',text:'“Acorns were a food” names a resource. Adding “harvested in autumn” explains timing. Adding where the oak trees grew connects the food with geography. Each detail makes the relationship between people and place clearer.',source:eastBay}
 ]},
 '3.2.3': {title:'A real tribal government today',sections:[
  {title:'Council members have different roles',text:'The Federated Indians of Graton Rancheria publishes a Tribal Council page with a chair, vice-chair, secretary, treasurer, and members at large. These are government roles in a particular tribe. They are not titles shared by every Native community.',source:graton},
  {title:'Government work reaches everyday life',text:'The tribe’s published accounts describe work involving education, cultural learning, environmental protection, and economic decisions. These examples connect government with people’s daily needs and their plans for the future.',source:graton},
  {title:'A constitution organizes authority',text:'A constitution sets out how a government is organized and what it may do. Think of the difference between making one decision and having rules about who can make decisions. A constitution concerns that larger structure. The Graton Rancheria constitution is linked as a real example.',source:{label:'Federated Indians of Graton Rancheria · Published constitution',url:'https://gratonrancheria.com/wp-content/uploads/2018/08/Amended-Constitution-7.2012.pdf'}},
  {title:'Keep culture, economy, and government connected',text:'Imagine a community planning a cultural learning center. It would need decisions about the building, people to teach, and resources to support the work. That imagined example shows how cultural goals, economic choices, and government decisions can connect.'}
 ]},
 '3.2.4': {title:'Understand what changed—and what continued',sections:[
  {title:'Homeland means more than a location',text:'A homeland connects people with places where families live, food is gathered, knowledge is shared, and important events are remembered. Losing control of that place can affect many parts of life at once.'},
  {title:'Read a second California example carefully',text:'The Yosemite Junior Ranger Handbook explains that newcomers brought diseases and harsh treatment, and that the Gold Rush brought people who took land and displaced Native communities. It also explains that Native people continued living in the region. This is a Yosemite example, separate from the Bay Area mission history.',source:{label:'National Park Service · Yosemite’s Native communities, pp. 16–17',url:'https://www.nps.gov/yose/learn/kidsyouth/upload/junior-ranger-book-sm.pdf#page=16'}},
  {title:'Change is not the same as disappearance',text:'A community can suffer great harm and still continue. Its members may work to keep a language, protect a place, or pass on family knowledge. The words “past and present” help us remember to learn about both parts of the story.'}
 ]},
 '3.3.1': {title:'From arriving to building a community',images:[SAN_JOSE_MAP],sections:[
  {title:'Work drew people to San José',text:'History San José describes how farm and cannery work drew people from many backgrounds to the Eastside. Workers included Mexican, Filipino, Portuguese, Italian, Chinese, Japanese, and other immigrants. Work helps explain part of the area’s growth.',source:history},
  {title:'An arrival changes more than one life',text:'Imagine a family arriving to work in a town. They need a place to live, routes to work, and connections with neighbors. Shops may gain customers and schools may gain students. A move affects both the newcomers and the community they join.'},
  {title:'A place can hold many stories',text:'The 1869 map shows one view of San José at one time. It cannot show every family’s language, beliefs, or reasons for moving. Pairing a map with personal accounts gives us a fuller picture: the map shows the setting; the accounts explain experiences.'}
 ]},
 '3.3.2': {title:'Follow the work behind a loaf of bread',images:[FARM_PAST],sections:[
  {title:'Businesses connect with other businesses',text:'In an imagined bakery, a farmer grows grain, a mill turns it into flour, a driver delivers supplies, and a baker makes bread. The bakery depends on work done beyond its own doorway. One business is part of a larger economy.'},
  {title:'The owner has decisions to make',text:'BLS explains that some bakers own shops. In addition to baking, owners may order supplies, set prices, decide how much to produce, and train workers. Running a business includes organizing resources as well as making a product.',source:bakers},
  {title:'Private property can be used to produce',text:'In our imagined shop, the oven and tables belong to the owner. They are property used in the business. The owner pays for supplies and hopes customers will buy the bread. If too few customers come, some supplies and effort may not earn enough money back.'},
  {title:'Make a useful past-and-present comparison',text:'Look at the farm photograph and then think about the bakery. Both involve land, labor, equipment, and customers. To compare old and new economies, describe what was produced and how it reached people—not only which machines look old.'}
 ]},
 '3.3.3': {title:'Read a real historical map',images:[SAN_JOSE_MAP,FARM_PRESENT],sections:[
  {title:'Begin with what the source tells us',text:'The Library of Congress identifies this as an 1869 bird’s-eye view of San José by Gray and Gifford. It is a perspective drawing and is not drawn to scale. That means we should not use it to measure exact distances.',source:mapSource},
  {title:'Notice, then explain',text:'You can see rows of streets, buildings, and open areas. Those are observations. Saying why a family lived on one street would need another source. Good history connects claims with evidence instead of filling gaps with guesses.'},
  {title:'Change and continuity can happen together',text:'The Prusch farmhouse photograph shows a building preserved at a park. The structure links the place to farming history, even though it is now used differently. “Change” names what became different. “Continuity” names what carried on.'},
  {title:'Why more than one source helps',text:'A map can show a street’s location. A photograph can show a building’s appearance. A letter might explain someone’s experience there. Together, they can answer questions that no single source answers alone.'}
 ]},
 '3.4.1': {title:'Rules also need to protect people',sections:[
  {title:'Rights and responsibilities belong together',text:'In an imagined discussion, each person has a chance to speak. The others have a responsibility to listen. A rule that lets only one friend speak would not serve the same fair purpose. Explaining the purpose helps us judge the rule.'},
  {title:'What is the Bill of Rights?',text:'The first ten amendments to the Constitution are called the Bill of Rights. An amendment is a change or addition. These amendments protect important freedoms and limit government power.',source:rights},
  {title:'A rule can be questioned respectfully',text:'Imagine a classroom rule that accidentally prevents some students from joining an activity. The group can explain the problem, listen to the people affected, and propose a better rule. Responsible participation includes improving rules, not only obeying them.'},
  {title:'Consequences should connect to the problem',text:'If someone scatters shared materials, helping put them back can repair the problem. If someone takes another person’s speaking turn, returning the turn helps restore fairness. These are classroom examples; laws and courts have their own procedures.'}
 ]},
 '3.4.2': {title:'A shared problem needs shared care',sections:[
  {title:'Begin with listening',text:'Imagine a neighborhood wants to improve a small park. One person wants space for games, another wants a quiet bench, and someone else needs a clear path. Listening reveals needs that the first idea may have missed.'},
  {title:'Explain a proposal with reasons',text:'A useful proposal could say: “Keep the path clear, put the bench beside it, and use the open field for games.” The explanation should connect each part of the plan with a need. A loud voice does not make an idea stronger; clear reasons do.'},
  {title:'Cooperation includes disagreement',text:'People may still disagree about space, cost, or noise. They can compare possibilities, revise the plan, and look for a fair solution. Working together does not mean everyone started with the same opinion.'},
  {title:'Follow through',text:'After a decision, community members still have responsibilities. In this imagined park, they might keep the path clear and look after shared equipment. Civic responsibility includes the small actions that make a shared plan work.'}
 ]},
 '3.4.3': {title:'Two documents, two different purposes',sections:[
  {title:'The Declaration describes ideals',text:'The Declaration of Independence expresses ideas about rights, liberty, and equality. The National Archives explains that it is not a legally binding document. Its ideas have nevertheless inspired people seeking freedom.',source:declaration},
  {title:'The Constitution organizes government',text:'The Constitution sets out the government’s structure. The Declaration and Constitution are connected with the country’s history, but they do different jobs. A statement of ideals is different from a framework for governing.'},
  {title:'Why preserve an old document?',text:'Preserving an original lets people study the actual historical object. The Declaration’s parchment has faded after years of display. Archives protect such documents so later generations can examine the evidence for themselves.',source:declaration},
  {title:'A landmark tells a story in a place',text:'A document carries words. A memorial uses a location, shapes, images, and often an inscription to remember an event or person. Understanding either one means connecting the object with its history—not just recognizing what it looks like.'}
 ]},
 '3.4.4': {title:'Follow the jobs, not just the names',sections:[
  {title:'A law needs more than words',text:'Imagine a new rule creates a public program. Writing the rule does not automatically make the program happen. People must organize the work, explain procedures, and deliver the service. This imagined example helps separate lawmaking from carrying a law out.'},
  {title:'Courts answer a different question',text:'If a dispute reaches a court, the question may be what the law means or whether it fits the Constitution. The judicial branch’s work concerns cases and interpretation. It is not the same job as managing the public program.',source:{label:'Ben’s Guide · Judicial branch',url:'https://bensguide.gpo.gov/a-judicial'}},
  {title:'Local government makes the idea concrete',text:'In San José, the city council provides policy direction while the city manager carries out policies and manages services. “Decide the policy” and “organize the work” are different responsibilities, even though both help the city function.',source:{label:'City of San José · Council-manager government',url:'https://www.sanjoseca.gov/your-government/departments-offices/office-of-the-city-manager'}},
  {title:'Use the diagram as a guide',text:'Read one branch name, then connect it to its job and the people or institutions shown. A picture of a building alone is not enough: the important idea is the responsibility carried out there.'}
 ]},
 '3.4.5': {title:'A place belongs to more than one community',sections:[
  {title:'Start with a familiar place',text:'San José is a city in California, and California is a state in the United States. Those names describe different geographic and governmental scales. Your neighborhood is smaller than your city, but “neighborhood” is not a branch of government.'},
  {title:'A shared government does not erase local life',text:'Think about an imagined country with several states. People share a national government while their states and towns also make decisions within their authority. “United” does not mean every community has the same needs or makes every decision in the same place.'},
  {title:'Tribal governments are distinct',text:'The Graton Rancheria council’s published work includes education, culture, and economic decisions. A tribal government is not simply another name for a city council. The tribe has its own citizens, institutions, and government relationships.',source:graton},
  {title:'Keep the two organizing ideas clear',text:'National, state, local, and tribal describe governments. Legislative, executive, and judicial describe functions or branches. Saying “California is executive” mixes those two ideas. California is a state; its government has different responsibilities.'}
 ]},
 '3.4.6': {title:'Freedom is an idea people act on',sections:[
  {title:'A right and the reality can differ',text:'A country may express an ideal such as equality while people still experience injustice. Learning history means studying both the words and what happened in people’s lives. Tubman’s story makes the need for freedom concrete.'},
  {title:'Look at the person in the portrait',text:'The picture helps us remember that this was a real person. It cannot show the danger of every journey or the planning behind each decision. The biography adds the events and actions that a portrait cannot display.'},
  {title:'Helping others required knowledge',text:'Tubman used knowledge of the woods, fields, stars, and communication networks in her work. Courage was joined with observation, planning, and help from other people.',source:{label:'National Park Service · Harriet Tubman',url:'https://www.nps.gov/people/harriet-tubman.htm'}},
  {title:'Connect action with its importance',text:'“She helped others” is true but broad. A fuller explanation names whom she helped, what she did, and the danger she faced. That same approach helps us understand the lives of other people who worked for freedom.'}
 ]},
 '3.5.1': {title:'Inside a real kind of workplace: a bakery',images:[BAKER_IMAGE],sections:[
  {title:'Production has several steps',text:'Bakers measure ingredients, mix them, shape dough, prepare pans, and monitor baking. They also check ingredients and finished products. Making bread takes a sequence of decisions, not just putting something in an oven.',source:bakers},
  {title:'Resources work together',text:'In our bakery example, water alone cannot make bread. An oven alone cannot choose a recipe. A skilled person still needs ingredients and equipment. Production brings natural materials, people’s work, and made tools together.'},
  {title:'Ingredients and equipment have different jobs',text:'Flour becomes part of the loaf. The oven is used to bake many loaves and does not become part of the bread. That difference helps explain why we name an ingredient separately from a tool used in production.'},
  {title:'Goods and services connect',text:'The loaf is a good: an object someone can use. Delivering it is a service: work done for someone. In the imagined bakery’s journey, both goods and services help the bread reach a customer.'}
 ]},
 '3.5.2': {title:'Follow a product’s journey',images:[BAKER_IMAGE],sections:[
  {title:'Production and shopping are different places',text:'Imagine a loaf baked in your town with flour delivered from another state. The baking is local, while an ingredient traveled farther. “Where was it made?” and “Where did its materials come from?” can have different answers.'},
  {title:'A route connects producers and users',text:'In this imagined example, grain goes from a farm to a mill, flour goes to a bakery, and bread goes to a shop. A truck, train, or ship may carry goods between places. Transportation is part of the connection between communities.'},
  {title:'Read the label carefully',text:'A label might name a manufacturer, a distributor, or a production location. Those words are not interchangeable. If the label gives only a company address, we do not yet know every place where the object was made.'},
  {title:'Why communities exchange goods',text:'Imagine a coastal town with fish and an inland farm with grain. Exchanging goods can give each place access to something the other produces. The point is the connection between places—not that every place must produce everything it uses.'}
 ]},
 '3.5.3': {title:'The same choice can have different trade-offs',sections:[
  {title:'Money is not the only limit',text:'Time, space, and materials can also be limited. In an imagined classroom, one empty shelf can hold either a plant display or a set of large building models. The class cannot put both there at once without changing the plan.'},
  {title:'Compare the benefits',text:'The plant display could make it easier to observe growing things. The model display could preserve students’ work for others to see. Both have benefits. Naming a benefit does not make the other choice worthless.'},
  {title:'Name the next-best choice given up',text:'If the class chooses plants and the models were its next choice, displaying the models is the opportunity cost. The cost is not every other possible use of the shelf. It is the best alternative they would otherwise choose.'},
  {title:'A decision can change when the situation changes',text:'If a second shelf becomes available, the class may be able to display both. Choices depend on the resources available. Explaining the limit helps explain why a trade-off existed in the first place.'}
 ]},
 '3.5.4': {title:'Skills grow through learning',images:[TRAINING_IMAGE],sections:[
  {title:'Learning happens in different places',text:'Bakers commonly learn through training at work. Some also study in culinary or technical programs. The work connects reading recipes, measuring, shaping, timing, and using equipment.',source:bakers},
  {title:'Knowledge travels with the person',text:'Imagine a learner who becomes good at measuring fabric. If they move to another workspace, they keep that skill. A measuring tool can be carried or replaced; knowing how to measure accurately is a capability the person has developed.'},
  {title:'One subject can support many kinds of work',text:'Reading can help someone understand directions. Mathematics can help with measurement. Clear speaking can help explain a problem. These are original everyday examples of how school learning can become useful in different settings.'},
  {title:'Tools and skills improve different things',text:'A better tool may make a task easier, but a person still needs to understand the task. More learning may improve how an existing tool is used. When you describe improved work, explain whether the equipment changed, the skill changed, or both.'}
 ]}
};
