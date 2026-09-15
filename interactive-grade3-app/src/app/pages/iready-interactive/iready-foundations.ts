import { FoundationFrame, FoundationMethod, FoundationSequence } from '../../shared/foundation-player/foundation-sequence';
import { IREADY_VOLUME1_SOURCE_PROBLEMS, teacherGuideProvenanceForProblem } from './iready-volume1-problems';

// Original supplemental sequences. Each method is anchored to visually reviewed publisher pages.
// Related-lesson links are app-authored review suggestions, never replacement activity answers.
const place = (title: string, note: string, counts: number[], equation: string, trade?: NonNullable<FoundationFrame['places']>['trade'], removed?: number[]): FoundationFrame => ({
  title, note, equation, places: { counts, removed, trade, total: counts.reduce((n, count, i) => n + (count - (removed?.[i] ?? 0)) * [100, 10, 1][i], 0) }
});
const method = (id: string, label: string, modelType: string, sourcePages: number[], frames: FoundationFrame[]): FoundationMethod => ({ id, label, modelType, sourcePages, frames });
function sequence(id: string, title: string, prompt: string, key: string, pages: number[], methods: FoundationMethod[]): FoundationSequence {
  const problem = IREADY_VOLUME1_SOURCE_PROBLEMS.find(p => p.key === key);
  const teacher = problem && teacherGuideProvenanceForProblem(problem);
  if (!problem || !teacher) throw new Error(`Foundation source is not verified: ${id}`);
  const bounds = problem.printedPages.match(/\d+/g)!.map(Number);
  if (pages.some(p => p < bounds[0] || p > bounds.at(-1)!) || methods.some(m => !m.frames.length || m.sourcePages.some(p => !pages.includes(p)))) throw new Error(`Foundation page mismatch: ${id}`);
  return { id, title, prompt, methods, source: {
    document: 'iready-grade3-volume1-548-pages.pdf', lesson: problem.lesson, session: problem.session, activityKey: key,
    printedPages: pages, viewerPages: pages.map(p => problem.viewerPage + p - bounds[0]),
    teacherDocument: 'iready-grade3-teacher-guide-volume1-764-pages.pdf', teacherPrintedPages: teacher.teacherGuidePages,
    teacherViewerPage: teacher.teacherPdfPage,
    studentLinks: pages.map(page => ({ page, url: `/assets/iready-volume1/student/p-${String(page).padStart(3, '0')}.jpg` })),
    implementationLocation: 'src/app/pages/iready-interactive/iready-foundations.ts',
    teacherUrl: `/assets/iready-volume1/teacher-pages/reader-${teacher.teacherGuidePages.match(/\d+/)![0]}.webp`
  } };
}
const subtractionFrames = [
  place('Start with all 365 flowers', 'No trade has happened yet. Build 3 hundreds, 6 tens, and 5 ones.', [3, 6, 5], '300 + 60 + 5 = 365'),
  place('Trade 1 ten for 10 ones', 'We need to remove 6 ones, but have only 5. One of the 6 tens becomes 10 ones.', [3, 5, 15], '300 + 50 + 15 = 365', {from:1,to:2,fromCount:1,toCount:10}),
  place('Trade 1 hundred for 10 tens', 'We need 8 tens, but now have only 5. One hundred becomes 10 tens. This is why only 2 hundreds remain.', [2, 15, 15], '200 + 150 + 15 = 365', {from:0,to:1,fromCount:1,toCount:10}),
  place('Take away 6 ones', 'Cross out 6 of the 15 ones. There are 9 ones left.', [2, 15, 15], '15 ones − 6 ones = 9 ones', undefined, [0,0,6]),
  place('Take away 8 tens', 'The 6 ones are already gone. Cross out 8 of the 15 tens.', [2, 15, 9], '15 tens − 8 tens = 7 tens', undefined, [0,8,0]),
  place('Take away 1 hundred', 'The 8 tens are already gone. Cross out 1 of the 2 hundreds.', [2, 7, 9], '2 hundreds − 1 hundred = 1 hundred', undefined, [1,0,0]),
  place('Read what is left', '1 hundred, 7 tens, and 9 ones represent the flowers that are not lilies.', [1,7,9], '365 − 186 = 179 flowers')
];
const groups = (title: string, note: string, counts: number[], equation: string, unit: 'one'|'ten' = 'one', pool?: number): FoundationFrame => ({title,note,equation,groups:{counts,unit,label:pool === undefined ? 'Group' : 'Plate',pool}});
const array = (title: string,note: string,rows: number,columns: number,equation: string,split?: number,area?: boolean,filled?: number): FoundationFrame => ({title,note,equation,array:{rows,columns,split,area,filled}});
const scores = [{label:'Abu',value:2},{label:'Ode',value:6},{label:'Gil',value:10},{label:'Max',value:8}];
export const IREADY_FOUNDATIONS: readonly FoundationSequence[] = [
  sequence('place-value', 'The unit tells us the value', '384: what does each digit represent, and where does the number belong?', 'v1-u1-l1-s1-try-it', [9], [
    method('chart','Read the places','place-value-chart',[9],[
      place('Build 384','The same kind of counter has a different value in each labeled column.',[3,8,4],'3 hundreds + 8 tens + 4 ones = 384'),
      place('Connect units to amounts','3 hundreds mean 300. 8 tens mean 80. 4 ones mean 4.',[3,8,4],'300 + 80 + 4 = 384')]),
    method('line','Locate the number','number-line',[9],[
      {title:'Between neighboring tens',note:'384 is 4 after 380 and 6 before 390.',equation:'380 < 384 < 390',line:{points:[380,384,390],reached:1,proportional:true}},
      {title:'Between neighboring hundreds',note:'The scale changes. 384 is 84 after 300 and 16 before 400.',equation:'300 < 384 < 400',line:{points:[300,384,400],reached:1,proportional:true}}
    ])]),
  sequence('addition-trades','Combine, then trade equal values','Greg takes 130 photos. Mora takes 280. How many photos altogether?','v1-u1-l2-s2-try-model',[35,36],[method('blocks','Base-ten blocks','base-ten-blocks',[35,36],[
    place('Build Greg’s 130 photos','Start with 1 hundred and 3 tens. Keep the empty ones column.',[1,3,0],'100 + 30 = 130'),
    place('Add Mora’s 280 photos','Add 2 hundreds and 8 tens. The combined collection has 3 hundreds and 11 tens.',[3,11,0],'130 + 280 = 300 + 110'),
    place('Trade 10 tens for 1 hundred','10 of the 11 tens make another hundred. 1 ten remains. The total stays 410.',[4,1,0],'300 + 110 = 400 + 10 = 410',{from:1,to:0,fromCount:10,toCount:1})
  ])]),
  sequence('subtraction-trades','One problem, three ways','Mateo has 365 flowers. 186 are lilies. How many flowers are not lilies?','v1-u1-l3-s2-try-model',[57,58],[
    method('blocks','Base-ten blocks','base-ten-blocks',[57,58],subtractionFrames),
    method('chart','Place-value chart','place-value-chart',[57],subtractionFrames),
    method('line','Number line','adding-on-number-line',[57],[
      {title:'Start at 186',note:'Find the distance from the lilies to all the flowers. Count up to 365.',equation:'186 + ? = 365',line:{points:[186,190,200,300,365],reached:0}},
      {title:'Add 4 to reach 190',note:'This first jump gets to the next ten.',equation:'186 + 4 = 190',line:{points:[186,190,200,300,365],reached:1}},
      {title:'Add 10 to reach 200',note:'The distance traveled so far is 4 + 10 = 14.',equation:'190 + 10 = 200',line:{points:[186,190,200,300,365],reached:2}},
      {title:'Add 100 to reach 300',note:'The distance traveled so far is 4 + 10 + 100 = 114.',equation:'200 + 100 = 300',line:{points:[186,190,200,300,365],reached:3}},
      {title:'Add 65 to reach 365',note:'Add the jumps to find how many flowers are not lilies.',equation:'4 + 10 + 100 + 65 = 179 flowers',line:{points:[186,190,200,300,365],reached:4}}
    ])]),
  sequence('equal-groups','Groups × amount in each group','Three pairs of players fly kites. Show 3 equal groups of 2 kites.','v1-u2-l4-s1-model-1-3',[101],[method('groups','Equal groups','equal-groups',[101],[
    groups('One pair','One group contains 2 kites.',[2],'1 group of 2 = 2'),
    groups('Make three equal groups','Each group contains the same number of kites.',[2,2,2],'2 + 2 + 2 = 6'),
    groups('Name the roles of the numbers','3 counts the groups. 2 counts the kites in each group. 6 counts all the kites.',[2,2,2],'3 groups × 2 kites in each = 6 kites')
  ])]),
  sequence('split-arrays','Split an array; keep the total','There are 6 meals with 3 pupusas in each meal. Find the total.','v1-u2-l6-s1-try-connect',[135,136],[method('array','Break apart the array','split-array',[135,136],[
    array('Build 6 rows of 3','Each row represents one meal.',6,3,'6 × 3 = ?'),
    array('Split 3 into 1 and 2','Every row keeps all 3 counters. The right part has 2 in each row.',6,3,'6 × 3 = (6 × 1) + (6 × 2)',1),
    array('Add the two products','The left part has 6. The right part has 12. No counters were added or removed.',6,3,'6 + 12 = 18 pupusas',1)
  ])]),
  sequence('multiply-tens','Count tens as units','Use base-ten rods to understand 4 × 20.','v1-u2-l9-s1-try-connect',[220],[method('rods','Groups of tens','base-ten-groups',[220],[
    groups('20 is 2 tens','Each rod contains 10 ones. A pair of rods represents 20.',[2],'2 tens = 20','ten'),
    groups('Make 4 groups of 20','Each group has two ten-rods, just like the source model.',[2,2,2,2],'2 tens + 2 tens + 2 tens + 2 tens = 8 tens','ten'),
    groups('Name the total in ones','There are 8 rods. Their value is 80 ones.',[2,2,2,2],'4 × 20 = 8 tens = 80','ten')
  ])]),
  sequence('division-meanings','Two questions that division answers','Compare sharing into a known number of groups with making groups of a known size.','v1-u2-l10-s1-models',[235,236],[
    method('share','How many in each?','equal-sharing',[235],Array.from({length:5},(_,i)=>groups(i===0?'Start with 8 slices and 2 plates':i===4?'Read the equal shares':`Put ${i} slice${i===1?'':'s'} on each plate`,i===4?'All 8 slices are shared. Each of the 2 plates has 4.':'The number of plates is known. Share the slices equally to find the amount on each plate.',[i,i],i===4?'8 slices ÷ 2 plates = 4 slices per plate':`${8-i*2} still to share + ${i*2} shared = 8`,'one',8-i*2))),
    method('group','How many groups?','equal-grouping',[236],Array.from({length:6},(_,i)=>groups(i===0?'Start with 10 slices':i===5?'Count the plates':`Make ${i} group${i===1?'':'s'} of 2`,'The size of each group is known: 2 slices. Count how many plates are needed.',Array.from({length:i},()=>2),i===5?'10 slices ÷ 2 per plate = 5 plates':`${10-i*2} still to group + ${i*2} grouped = 10`,'one',10-i*2)))
  ]),
  sequence('related-facts','A missing factor connects the operations','Show 4 rows of 3 pennies. Use the same collection for multiplication and division.','v1-u2-l11-s1-models',[247],[method('array','Related facts','array-and-equations',[247],[
    array('Count the whole array','There are 4 equal rows with 3 pennies in each row.',4,3,'4 × 3 = 12'),
    array('The total and rows are known','12 pennies are arranged in 4 equal rows. Find the number in each row.',4,3,'12 ÷ 4 = ?     4 × ? = 12'),
    array('The missing factor is 3','The same 12 pennies show both operations.',4,3,'12 ÷ 4 = 3     4 × 3 = 12')
  ])]),
  sequence('area-units','Cover space with equal squares','Measure the area of the rug using square units.','v1-u3-l14-s1-model-area',[316],[method('cover','Cover and count','unit-square-area',[316],[
    array('One square is one unit of area','The outline is the rug. Start by covering one square unit.',2,3,'1 square covers 1 square unit',undefined,true,1),
    array('Cover one complete row','Three equal squares cover the first row.',2,3,'3 square units covered',undefined,true,3),
    array('Cover all the space','Six equal squares touch edge to edge. No gaps or overlaps remain.',2,3,'Area = 6 square units',undefined,true,6)
  ])]),
  sequence('dependent-steps','Find one amount before the next','A store has 438 shirts. A delivery brings 4 colors with 8 shirts of each color. How many shirts are there now?','v1-u3-l18-s1-try-connect',[399],[method('flow','Connect the quantities','equal-groups-and-quantity-flow',[399],[
    groups('First, find the delivery amount','The delivery contains 4 equal groups of 8 shirts.',[8,8,8,8],'4 × 8 = 32 shirts delivered'),
    {title:'Use that result in the next step',note:'Combine the shirts already in the store with the 32 delivered shirts.',equation:'438 + 32 = 470',flow:{parts:[{label:'Already in the store',value:'438 shirts'},{label:'Delivery: 4 × 8',value:'32 shirts'}],result:'470 shirts now'}},
    {title:'Keep track of what each number means',note:'32 is the result of the first step and an input to the second.',equation:'438 + (4 × 8) = 470 shirts',flow:{parts:[{label:'First: multiply',value:'4 × 8 → 32'},{label:'Then: add',value:'438 + 32'}],result:'470 shirts now'}}
  ])]),
  sequence('graph-scale','A symbol can stand for more than one','Use the key to read the picture graph, then connect it to the bar graph.','v1-u3-l19-s1-try-connect',[427,428],[method('graphs','Key → values → scale','scaled-picture-and-bar-graphs',[427,428],[
    {title:'Read the key before counting',note:'Each basketball symbol represents 2 points.',equation:'1 symbol = 2 points',graph:{values:scores,unit:2,maxValue:10,unitLabel:'points',bars:false,count:false}},
    {title:'Count by the value of each symbol',note:'For Gil, 5 symbols represent 5 groups of 2 points.',equation:'5 × 2 = 10 points',graph:{values:scores,unit:2,maxValue:10,unitLabel:'points',bars:false,count:true}},
    {title:'Show the same values with bars',note:'Each interval on the bar graph is 2 points. Both graphs show the same scores.',equation:'Key: 2 points per symbol · Scale: 2 points per interval',graph:{values:scores,unit:2,maxValue:10,unitLabel:'points',bars:true,count:true}}
  ])])
];

// Explicit review choices from the Volume 1 audit. These are prerequisite examples,
// not claims that every linked activity uses the same strategy or numerical values.
const REVIEW_BY_LESSON: Readonly<Record<number, readonly string[]>> = {
  1:['place-value'],2:['addition-trades','place-value'],3:['subtraction-trades','place-value'],
  4:['equal-groups'],5:['equal-groups'],6:['split-arrays','equal-groups'],7:['split-arrays','equal-groups'],8:['split-arrays','equal-groups'],
  9:['multiply-tens','equal-groups','place-value'],10:['division-meanings','equal-groups'],11:['related-facts','division-meanings'],12:['related-facts','division-meanings','split-arrays'],
  13:['split-arrays'],14:['area-units'],15:['area-units','split-arrays'],16:['area-units','split-arrays'],17:['related-facts','equal-groups','area-units'],
  18:['dependent-steps','subtraction-trades','addition-trades','equal-groups'],19:['graph-scale']
};
export function foundationsForLesson(lesson: number): FoundationSequence[] {
  return (REVIEW_BY_LESSON[lesson] ?? []).map(id => IREADY_FOUNDATIONS.find(f => f.id === id)!);
}


export interface IReadyFoundationConcept {
  id: string;
  title: string;
  idea: string;
  examples: { sequenceId: string; label: string; method?: string }[];
  /** Explicit session placements from the source-linked Volume 1 review. */
  sessions: Readonly<Record<number, readonly number[]>>;
}
export const IREADY_FOUNDATION_CONCEPTS: readonly IReadyFoundationConcept[] = [
  {id:'units-and-trades',title:'Place value & equal-value trades',idea:'A ten is 10 ones. A hundred is 10 tens. Combining or exchanging units changes their arrangement while keeping their value.',examples:[{sequenceId:'place-value',label:'Read the units · 384'},{sequenceId:'addition-trades',label:'Combine units · 130 + 280'},{sequenceId:'subtraction-trades',label:'Trade units · 365 − 186'},{sequenceId:'multiply-tens',label:'Multiply tens · 4 × 20'}],sessions:{1:[1,2,3,4],2:[1,2,3,4],3:[1,2,3,4,5],9:[1,2,3],18:[1,2,3,4,5]}},
  {id:'number-lines',title:'Number lines: position & distance',idea:'The marks locate numbers. The scale tells what a distance means. A jump changes the number; adding the jumps finds the total distance.',examples:[{sequenceId:'place-value',label:'Locate a number · 384',method:'line'},{sequenceId:'subtraction-trades',label:'Find a difference · 365 − 186',method:'line'}],sessions:{1:[1,2,3,4],3:[2,3,5],12:[2],18:[4]}},
  {id:'equal-groups',title:'Equal groups & what the numbers mean',idea:'Keep three quantities distinct: how many groups, how many in each group, and how many altogether. Name the unit being counted.',examples:[{sequenceId:'equal-groups',label:'Groups of ones · 3 × 2'},{sequenceId:'multiply-tens',label:'Groups of tens · 4 × 20'},{sequenceId:'division-meanings',label:'Find a missing quantity'},{sequenceId:'dependent-steps',label:'Use groups in a two-step problem'}],sessions:{4:[1,2,3],5:[1,2,3,4],6:[1,2,3,4,5],7:[1,2,3,4,5],8:[1,2,3,4,5],9:[1,2,3],10:[1,2,3],11:[1,2,3],12:[1,2,3,4],17:[1,2,3,5],18:[1,2,3,5]}},
  {id:'arrays',title:'Rows, columns & breaking apart arrays',idea:'An array organizes equal groups into rows and columns. Split it into smaller arrays without losing or adding objects, then combine the partial totals.',examples:[{sequenceId:'split-arrays',label:'Break apart · 6 × 3'},{sequenceId:'related-facts',label:'Connect rows and division · 12 ÷ 4'},{sequenceId:'area-units',label:'Connect rows and square units'}],sessions:{4:[2,3],6:[1,2,3,4,5],7:[1,2,3,4,5],8:[1,2,3,4,5],11:[1,2,3],12:[1,2,3,4],13:[1,2,3],15:[1,2,3,4],16:[1,2,3,4],17:[3,4,5]}},
  {id:'division',title:'Division meanings & related facts',idea:'Division can find the amount in each group or the number of groups. A related multiplication equation helps identify the missing quantity.',examples:[{sequenceId:'division-meanings',label:'Compare both meanings'},{sequenceId:'related-facts',label:'Find the missing factor'}],sessions:{10:[1,2,3],11:[1,2,3],12:[1,2,3,4],17:[1,2,3,4,5],18:[2,3,5]}},
  {id:'area',title:'Area: covering space with square units',idea:'Equal squares measure the space a shape covers. They must cover it completely without gaps or overlaps. Rows help organize the count.',examples:[{sequenceId:'area-units',label:'Cover a rug · 6 square units'},{sequenceId:'split-arrays',label:'Review how rows break apart'}],sessions:{14:[1,2,3],15:[1,2,3,4],16:[1,2,3,4],17:[4]}},
  {id:'quantity-relationships',title:'Known quantities, unknowns & connected steps',idea:'Identify what each quantity means and what must be found. In a two-step problem, the result of one operation becomes an input to the next.',examples:[{sequenceId:'equal-groups',label:'Name the quantities'},{sequenceId:'related-facts',label:'Identify the unknown'},{sequenceId:'dependent-steps',label:'Connect two steps · shirt delivery'}],sessions:{17:[1,2,3,4,5],18:[1,2,3,4,5]}},
  {id:'scaled-data',title:'Graph keys & scales',idea:'A symbol or an interval can represent more than one. Use the stated key or scale to turn the display into actual amounts before comparing them.',examples:[{sequenceId:'graph-scale',label:'Picture key → values → bar scale'}],sessions:{19:[1,2,3,4,5]}}
];
export function conceptsForLesson(lesson: number, session?: number): IReadyFoundationConcept[] {
  return IREADY_FOUNDATION_CONCEPTS.filter(c => c.sessions[lesson] && (session === undefined || c.sessions[lesson].includes(session)));
}
export function conceptsForUnit(unit: number): IReadyFoundationConcept[] {
  const lessons = unit === 1 ? [1,2,3] : unit === 2 ? [4,5,6,7,8,9,10,11,12,13] : [14,15,16,17,18,19];
  return IREADY_FOUNDATION_CONCEPTS.filter(c => lessons.some(l => c.sessions[l]));
}
