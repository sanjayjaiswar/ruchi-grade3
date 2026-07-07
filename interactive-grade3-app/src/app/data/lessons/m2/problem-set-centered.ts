import type {
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetDataDisplay,
  ProblemSetNumberLineModel,
  ProblemVisualMeasurementModelSection,
  ProblemVisualSpec
} from '../lesson-runtime.types';

type ProblemSeed = {
  number: number;
  sourcePrompt: string;
  solvedAnswer: string;
  equations?: string[];
  explanation?: string;
  checks?: string[];
  blankVisualType?: ProblemSetBlankVisualType;
  animationType?: ProblemSetAnimationType;
  blankWorkspaceLabel?: string;
  knownTotal?: number;
  knownGroupCount?: number;
  knownGroupSize?: number;
  quotient?: number;
  unitLabel?: string;
  groupLabel?: string;
  meaning?: string;
  shareLabels?: string[];
  dataDisplay?: ProblemSetDataDisplay;
  solvedDataDisplay?: ProblemSetDataDisplay;
  numberLineModels?: ProblemSetNumberLineModel[];
};

type LessonSeed = {
  lessonNumber: number;
  title: string;
  concept: string;
  contrast: string;
  summary: string;
  problems: Array<ProblemSeed | ProblemSetCenteredProblem>;
};

type StopwatchSentenceSeed = {
  number: number;
  sourcePrompt: string;
  blankSentence: string;
  sampleResponse: string;
  sampleWork?: string[];
  sourceWorkLabel?: string;
  sourceWorkLines?: string[];
  sourceWorkColumns?: number;
  blankWorkspaceLabel: string;
  solvedAnswer: string;
  meaning: string;
  explanation: string;
  checks: string[];
};

type StopwatchTableSeed = {
  number: number;
  sourcePrompt: string;
  title: string;
  columns: string[];
  blankRows: string[][];
  solvedRows: string[][];
  totalLabel?: string;
  totalBlank?: string;
  totalSample?: string;
  blankNote: string;
  solvedNote: string;
  blankWorkspaceLabel: string;
  solvedAnswer: string;
  meaning: string;
  explanation: string;
  checks: string[];
  equations?: string[];
};

type TimeLinePointSeed = {
  label: string;
  minute: number;
  detail?: string;
  open?: boolean;
};

type TimeLineJumpSeed = {
  label: string;
  fromMinute: number;
  toMinute: number;
};

type TimeLineSourceItemSeed = {
  label: string;
  minute?: number;
  sourceX?: number;
  detail?: string;
  kind?: 'digital' | 'analog' | 'note';
  status?: 'matched' | 'unmatched' | 'provided';
};

type TimeLineClockSeed = {
  label: string;
  timeLabel: string;
  blankTimeLabel?: string;
  showInBlank?: boolean;
  caption?: string;
};

type TimeLineProblemSeed = {
  number: number;
  sourcePrompt: string;
  startLabel: string;
  endLabel: string;
  displayStartMinute?: number;
  displayEndMinute?: number;
  tickLabels?: string[];
  labelEvery?: number;
  sourceItems?: TimeLineSourceItemSeed[];
  clocks?: TimeLineClockSeed[];
  points: TimeLinePointSeed[];
  jumps?: TimeLineJumpSeed[];
  showPointDetails?: boolean;
  directions?: Array<{ lead?: string; text: string }>;
  blankNote: string;
  solvedNote: string;
  solvedAnswer: string;
  equations: string[];
  blankWorkspaceLabel: string;
  meaning: string;
  explanation: string;
  checks: string[];
};

const TEACHER_SOURCE = 'EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf';
const TEACHER_PROBLEM_SET_PAGES: Record<number, number[]> = {
  1: [19, 20],
  2: [31, 32],
  3: [44, 45],
  4: [55, 56],
  5: [67, 68],
  6: [80, 81],
  7: [91, 92],
  8: [101, 102],
  9: [111, 112],
  10: [122, 123],
  11: [132, 133],
  12: [155, 156],
  13: [166, 167],
  14: [177, 178],
  15: [191, 192],
  16: [202, 203],
  17: [215, 216],
  18: [228, 229],
  19: [238, 239],
  20: [252, 253],
  21: [261, 262, 263]
};
const TEACHER_ANSWER_KEY_PAGES: Record<number, number[]> = {
  1: [281],
  2: [282],
  3: [283],
  4: [284],
  5: [285],
  6: [286],
  7: [287],
  8: [288],
  9: [289],
  10: [290],
  11: [291],
  12: [292],
  13: [293],
  14: [295],
  15: [296],
  16: [297],
  17: [299],
  18: [300],
  19: [301],
  20: [303],
  21: [304]
};
const TEACHER_ANSWER_KEY: Record<number, Record<number, string>> = {
  1: {
    1: 'Times will vary. A complete response records one measured stopwatch time and writes it in the sentence blank as a number of seconds.',
    2: 'Times will vary. A complete response records one measured stopwatch time for writing every whole number from 0 to 25 and labels the result in seconds.',
    3: 'Times will vary. A complete response lists 10 animals, records one measured stopwatch time, and labels the result in seconds.',
    4: 'Times will vary. A complete response times writing 7 x 8 = 56 fifteen times, records the elapsed time, and labels it in seconds.',
    5: 'Times will vary. Each of the six official group activity rows needs a measured stopwatch time recorded in seconds.',
    6: 'Times will vary. Each relay runner needs a measured time in seconds, and the total time is the sum of the runner times.'
  },
  2: {
    1: 'a. First and last tick marks labeled as 7:00 a.m. and 8:00 a.m.; b. each interval labeled by fives up to 8:00 a.m.; c. D at 7:10 a.m.; d. E at 7:35 a.m.; e. T at 7:40 a.m.; f. L at 7:45 a.m.; g. W at 7:55 a.m.',
    2: 'Every 5 minutes labeled below the number line. First clock not matched; second clock 5:50 p.m.; third clock 5:15 p.m.; fourth clock not matched; fifth clock 5:40 p.m.; last clock 5:25 p.m.',
    3: 'First and last tick marks labeled 5:00 p.m. and 6:00 p.m.; each interval labeled by fives up to 6:00 p.m.; 5:45 p.m. located and plotted on the number line.',
    4: 'Answers will vary. A complete explanation says Tanner is correct because 11:25 p.m. is a night time that comes after 11:20 a.m., a morning time.'
  },
  3: {
    1: 'The times shown on the clocks are plotted correctly on the number line. First clock 7:17 p.m.; second clock 7:03 p.m.; third clock 7:55 p.m.; fourth clock 7:41 p.m.; fifth clock answer provided.',
    2: 'Hands on the clock drawn to show 6:48 a.m.',
    3: 'Hands on the clock drawn to show 8:23 a.m.',
    4: '5:27',
    5: 'a. 3:56; b. 3:45.'
  },
  4: {
    1: '26',
    2: '2:08',
    3: '31',
    4: '4:09',
    5: '9:52',
    6: '19 min',
    7: '11:58 a.m.',
    8: '1:17 p.m.'
  },
  5: {
    1: '53; problem modeled on number line; 25 + 28 = 53.',
    2: '22 minutes; problem modeled on number line; 34 - 12 = 22.',
    3: '17 minutes; 47 - 30 = 17.',
    4: 'a. 29 minutes; b. No; Austin will be 4 minutes late.',
    5: '11:13.'
  },
  6: {
    1: 'Illustrations and descriptions will vary. A complete response shows the process of making a 1-kilogram weight.',
    2: 'Illustrations and descriptions will vary. A complete response decomposes 1 kilogram into groups of 100 grams.',
    3: 'Illustrations and descriptions will vary. A complete response decomposes 100 grams into groups of 10 grams.',
    4: 'Illustrations and descriptions will vary. A complete response decomposes 10 grams into groups of 1 gram.',
    5: 'Answers will vary. A complete comparison connects the kilogram and gram exploration to the place value chart.'
  },
  7: {
    1: 'A-D. Objects and weights will vary. Each benchmark row should name classroom objects and record actual checked weights.',
    2: 'E. 1. grams; 2. kilograms; 3. grams; 4. kilograms; 5. kilograms; 6. grams.',
    3: 'F. 2 kilograms since 1 bottle of water weighs about 1 kilogram.',
    4: 'G. Yes; 10 units of 100 grams equal 1000 grams, which is the same as 1 kilogram.'
  },
  8: {
    1: 'The string beans weigh 464 grams. The grapes weigh 355 grams.',
    2: 'a. Keiko and Jiro weigh 78 kilograms altogether; problem modeled with a tape diagram. b. Jiro is 8 kilograms heavier than Keiko; problem modeled with a tape diagram.',
    3: 'Tape diagram drawn correctly; 3 houseplants weigh about 15 kilograms.',
    4: 'a. Jane takes home about 3 kilograms of apples. b. Seven pumpkins weigh about 21 kilograms altogether.'
  },
  9: {
    1: 'a. Variable predictions. b. Each container must have a measured result checked against the less than, more than, or about 1 liter prediction.',
    2: 'c. A correct illustration decomposes 1 liter into ten 100-milliliter units.',
    3: 'd-e. Correct illustrations decompose Cup K and Cup L into ten equal smaller units using each cup\'s measured capacity.',
    4: 'f. They both break apart into 1 thousand units. 1 liter is 1000 milliliters, and 1 kilogram is 1000 grams.',
    5: 'g. 1 gram; 1 liter is the same as 1 kilogram, and they break apart the same way into 1 thousand units.'
  },
  10: {
    1: 'Vertical number line on container labeled by hundreds. a. 500 mL; the reason identifies halfway between 0 and 1,000 mL. b. A correct explanation uses equal 100 mL intervals on the container scale. c. 700 mL.',
    2: '3 L; 6 L; 4 L; 0 L.',
    3: '400 mL; 200 mL; 1000 mL; 700 mL.',
    4: 'a. Capacity of each barrel plotted and labeled correctly on number line. b. Barrel C. c. Barrel D. d. Barrel B because it is closest to 70 L OR Barrel A because it has enough capacity to hold 70 L. e. Number line used to find answer; 28 more liters.'
  },
  11: {
    1: 'a. 558 g; b. 445 g.',
    2: 'a. 60 g; b. 142 g.',
    3: 'a. 191 g; b. 123 g; c. 194 g.',
    4: 'Tape diagram drawn and labeled to represent the problem; 9 turkeys.',
    5: '900 mL of milk.',
    6: '14 L.'
  },
  12: {
    1: 'Variable measurements; each length must have an actual centimeter value, surrounding tens, and nearest 10 cm.',
    2: 'Variable measurements; each bag must have an actual gram value, surrounding tens, and nearest 10 g.',
    3: 'Variable measurements; each container must have an actual milliliter value, surrounding tens, and nearest 10 mL.',
    4: 'Variable times; each activity must have an actual clock time, surrounding 10-minute marks, and nearest 10 minutes.'
  },
  13: {
    1: 'a. 30; b. 40; rounding modeled on number line; c. 60; rounding modeled on number line; d. 160; rounding modeled on number line; e. 280; rounding modeled on number line; f. 410; rounding modeled on number line.',
    2: 'Number line drawn and labeled to model rounding; 40 g. Number line drawn and labeled to model rounding; 50 g. Number line drawn and labeled to model rounding; 140 g.',
    3: 'a. 48 min; b. 50 min.'
  },
  14: {
    1: 'a. 100; rounding modeled on number line; b. 300; rounding modeled on number line; c. 300; rounding modeled on number line; d. 1,300; rounding modeled on number line; e. 1,600; rounding modeled on number line; f. 1,300; rounding modeled on number line.',
    2: 'a. 500 stickers; b. 500 pages; c. 800 mL; d. $1,300; e. 1,800 km.',
    3: '550, 639, 603.',
    4: 'Both are correct; explanations will vary. A complete explanation may say 1,865 rounds to 1,900, and 1,900 is the same value as 19 hundreds.'
  },
  15: {
    1: 'a. 51 mL; b. 71 mL; c. 171 mL; d. 89 cm; e. 592 cm; f. 627 cm; g. 92 g; h. 639 g; i. 956 g; j. 3 L 657 mL; k. 5 kg 876 g.',
    2: '107 g.',
    3: '475 mL + 317 mL = 792 mL; Andrea is correct; explanations will vary.',
    4: '47 min.'
  },
  16: {
    1: 'a. 120 mL; b. 420 mL; c. 820 mL; d. 150 cm; e. 600 cm; f. 900 cm; g. 835 g; h. 942 g; i. 983 g; j. 4 L 800 mL; k. 6 kg 851 g.',
    2: 'Tape diagram drawn and labeled; 1,000 g.',
    3: '144 muffins.',
    4: '741 mL.'
  },
  17: {
    1: 'a. A: 704; 500, 300, 800. 700; 500, 200, 700. 697; 400, 200, 600. B: 517; 400, 200, 600. 504; 400, 100, 500. 496; 300, 100, 400. C: 810; 700, 200, 900. 805; 600, 200, 800. 793; 600, 100, 700. b. Explanations will vary; both addends are close to the halfway point, so they balance each other out.',
    2: 'a. Estimates will vary. b. 245 min. c. Explanations will vary; a different way of rounding is shown and compared.',
    3: 'a. Estimates will vary. b. 256 kilograms; a tape diagram is drawn and labeled to represent the problem.'
  },
  18: {
    1: 'a. 36 mL; b. 336 mL; c. 136 mL; d. 497 cm; e. 361 cm; f. 498 cm; g. 177 g; h. 73 g; i. 75 g; j. 1 km 315 m; k. 2 kg 31 g.',
    2: '172 g; tape diagram drawn and labeled to model problem.',
    3: 'a. 95 min; b. 50 min.',
    4: '34 cm.'
  },
  19: {
    1: 'a. 280 cm; b. 80 cm; c. 365 g; d. 254 g; e. 648 mL; f. 248 mL; g. 4 km 233 m; h. 2 L 51 mL.',
    2: '149 km.',
    3: '8 kg.',
    4: '235 L.'
  },
  20: {
    1: 'a. A: 295; 400, 200, 200. 298; 500, 200, 300. 299; 400, 100, 300. 302; 500, 100, 400. B: 486; 700, 300, 400. 495; 800, 300, 500. 498; 700, 200, 500. 508; 800, 200, 600. b. Explanations will vary; in the differences that gave the most precise estimates, both numbers either rounded down or both numbers rounded up.',
    2: 'a. Estimates will vary. b. 188 L; tape diagram drawn and labeled to model problem.',
    3: 'a. Estimates and explanations will vary. b. 128 g; tape diagram drawn and labeled to model problem.'
  },
  21: {
    1: 'a. 91 g, 58 g, 90 g, 60 g, 150 g; 91 g, 58 g, 149 g. b. 91 g, 58 g, 90 g, 60 g, 30 g; 91 g, 58 g, 33 g. c. Because both estimates are close to the actual answers.',
    2: 'Yarn A: 64; 60. Yarn B: 88; 90. Yarn C: 38; 40. a. Estimate: 100 cm; actual: 102 cm. b. Estimate: 10 cm; actual: 14 cm; tape diagram drawn and labeled.',
    3: 'Capacity of the 3 containers plotted and labeled on number lines. Container D: 212 mL ~= 210 mL. Container E: 238 mL ~= 240 mL. Container F: 195 mL ~= 200 mL. a. Estimate: 650 mL; actual: 645 mL. b. Estimate: 30 mL; actual: 26 mL; tape diagram drawn and labeled.',
    4: 'a. 21 min. b. Estimate may use a reasonable rounding strategy; actual: 94 min. c. The estimate is acceptable when it is close to the actual answer.'
  }
};
const TEACHER_PROBLEM_PROMPTS: Record<number, Record<number, string>> = {
  1: {
    1: 'Use a stopwatch. How long does it take you to snap your fingers 10 times?',
    2: 'Use a stopwatch. How long does it take to write every whole number from 0 to 25?',
    3: 'Use a stopwatch. How long does it take you to name 10 animals? Record them.',
    4: 'Use a stopwatch. How long does it take you to write 7 x 8 = 56 fifteen times? Record the time.',
    5: 'Work with your group. Use a stopwatch to measure the time for each activity: write your full name, do 20 jumping jacks, whisper count by twos from 0 to 30, draw 8 squares, skip-count by fours from 24 to 0, and say the names of your teachers from Kindergarten to Grade 3.',
    6: '100 meter relay: Use a stopwatch to measure and record your team\'s times, then find the total time.'
  },
  2: {
    1: 'Follow the directions to label the number line below.',
    2: 'Label every 5 minutes below the 5:00 p.m. to 6:00 p.m. number line. Draw a line from each clock to the point on the number line that shows its time. Not all clocks have matching points.',
    3: 'Noah uses a number line to locate 5:45 p.m. Each interval is 5 minutes. The number line shows the hour from 5 p.m. to 6 p.m. Label the number line to show his work.',
    4: 'Tanner tells his little brother that 11:25 p.m. comes after 11:20 a.m. Do you agree with Tanner? Why or why not?'
  },
  3: {
    1: 'Plot a point on the number line for the times shown on the clocks. Then, draw a line to match the clocks to the points.',
    2: 'Jessie woke up this morning at 6:48 a.m. Draw hands on the clock to show what time Jessie woke up.',
    3: 'Mrs. Barnes starts teaching math at 8:23 a.m. Draw hands on the clock to show what time Mrs. Barnes starts teaching math.',
    4: 'The clock shows what time Rebecca finishes her homework. What time does Rebecca finish her homework?',
    5: 'The clock shows what time Mason\'s mom drops him off for practice. a. What time does Mason\'s mom drop him off? b. Mason\'s coach arrives 11 minutes before Mason\'s mom drops him off. What time does Mason\'s coach arrive?'
  },
  4: {
    1: 'Use a number line. Cole starts reading at 6:23 p.m. He stops at 6:49 p.m. How many minutes does Cole read?',
    2: 'Use a number line. Natalie finishes piano practice at 2:45 p.m. after practicing for 37 minutes. What time did Natalie\'s practice start?',
    3: 'Use a number line. Genevieve works on her scrapbook from 11:27 a.m. to 11:58 a.m. How many minutes does she work on her scrapbook?',
    4: 'Use a number line. Nate finishes his homework at 4:47 p.m. after working on it for 38 minutes. What time did Nate start his homework?',
    5: 'Use a number line. Andrea goes fishing at 9:03 a.m. She fishes for 49 minutes. What time is Andrea done fishing?',
    6: 'Dion walks to school. The clocks show when he leaves his house and when he arrives at school. How many minutes does it take Dion to walk to school?',
    7: 'Sydney cleans her room for 45 minutes. She starts at 11:13 a.m. What time does Sydney finish cleaning her room?',
    8: 'The third-grade chorus performs a musical for the school. The musical lasts 42 minutes. It ends at 1:59 p.m. What time did the musical start?'
  },
  5: {
    1: 'Cole read his book for 25 minutes yesterday and for 28 minutes today. How many minutes did Cole read altogether? Model the problem on the number line, and write an equation to solve.',
    2: 'Tessa spends 34 minutes washing her dog. It takes her 12 minutes to shampoo and rinse and the rest of the time to get the dog in the bathtub. How many minutes does Tessa spend getting her dog in the bathtub? Draw a number line and write an equation.',
    3: 'Tessa walks her dog for 47 minutes. Jeremiah walks his dog for 30 minutes. How many more minutes does Tessa walk her dog than Jeremiah?',
    4: 'a. It takes Austin 4 minutes to take out the garbage, 12 minutes to wash the dishes, and 13 minutes to mop the kitchen floor. How long does it take Austin to do his chores? b. Austin\'s bus arrives at 7:55 a.m. If he starts at 7:30 a.m., will he be done in time? Explain.',
    5: 'Gilberto\'s cat sleeps in the sun for 23 minutes. It wakes up at the time shown on the clock. What time did the cat go to sleep?'
  },
  6: {
    1: 'Illustrate and describe the process of making a 1-kilogram weight.',
    2: 'Illustrate and describe the process of decomposing 1 kilogram into groups of 100 grams.',
    3: 'Illustrate and describe the process of decomposing 100 grams into groups of 10 grams.',
    4: 'Illustrate and describe the process of decomposing 10 grams into groups of 1 gram.',
    5: 'Compare the two place value charts. How does today\'s exploration using kilograms and grams relate to your understanding of place value?'
  },
  7: {
    1: 'Work with a partner. Use the corresponding weights to estimate the weight of objects in the classroom. Then, check your estimate by weighing on a scale for objects that weigh about 1 kilogram, 100 grams, 10 grams, and 1 gram.',
    2: 'Circle the correct unit of weight for each estimation: cereal, watermelon, postcard, cat, bicycle, and lemon.',
    3: 'Derrick finds that his bottle of water weighs the same as a 1-kilogram bag of rice. He says the class laptop weighs the same as 2 bottles of water. How much does the laptop weigh in kilograms? Explain.',
    4: 'Nessa says 1 kilogram of rice weighs the same as 10 bags containing 100 grams of beans each. Do you agree? Explain why or why not.'
  },
  8: {
    1: 'Tim goes to the market to buy fruits and vegetables. He weighs some string beans and some grapes. List the weights for both the string beans and grapes.',
    2: 'Use tape diagrams to model the problems. Keiko and her brother Jiro get weighed at the doctor\'s office. Keiko weighs 35 kilograms, and Jiro weighs 43 kilograms. a. What is Keiko and Jiro\'s total weight? b. How much heavier is Jiro than Keiko?',
    3: 'Jared estimates that his houseplant is as heavy as a 5-kilogram bowling ball. Draw a tape diagram to estimate the weight of 3 houseplants.',
    4: 'Jane and her 8 friends go apple picking. They share what they pick equally. The total weight is 27 kg. a. About how many kilograms of apples will Jane take home? b. Jane estimates that a pumpkin weighs about as much as her share of the apples. About how much do 7 pumpkins weigh altogether?'
  },
  9: {
    1: 'Part 1. Predict whether each container holds less than, more than, or about the same as 1 liter. After measuring, record the actual results and explain what surprised you.',
    2: 'Part 2c. Illustrate and describe the process of decomposing 1 liter of water into 10 smaller units.',
    3: 'Part 2d-e. Illustrate and describe the process of decomposing Cup K and Cup L into 10 smaller units.',
    4: 'Part 2f. What is the same about decomposing 1 liter into milliliters and decomposing 1 kilogram into grams?',
    5: 'Part 2g. One liter of water weighs 1 kilogram. How much does 1 milliliter of water weigh? Explain how you know.'
  },
  10: {
    1: 'Label the vertical number line on the container. a. What did you label as the halfway mark? Why? b. Explain how pouring each plastic cup of water helped you create a vertical number line. c. If you pour out 300 mL of water, how many mL are left in the container?',
    2: 'How much liquid is in each container?',
    3: 'Estimate the amount of liquid in each container to the nearest hundred milliliters.',
    4: 'The chart shows the capacity of 4 barrels: A 75 liters, B 68 liters, C 96 liters, D 52 liters. a. Label the number line to show the capacity of each barrel. Barrel A has been done for you. b. Which barrel has the greatest capacity? c. Which barrel has the smallest capacity? d. Ben buys a barrel that holds about 70 liters. Which barrel did he most likely buy? Explain. e. Use the number line to find how many more liters Barrel C can hold than Barrel B.'
  },
  11: {
    1: 'The total weight of a can of tomatoes and a jar of baby food is 671 grams. a. The jar of baby food weighs 113 grams. How much does the can of tomatoes weigh? b. How much more does the can of tomatoes weigh than the jar of baby food?',
    2: 'The weight of a pen is 6 grams. a. What is the total weight of 10 pens? b. An empty box weighs 82 grams. What is the total weight of a box of 10 pens?',
    3: 'The total weight of an apple, lemon, and banana is 508 grams. a. If the apple and lemon together weigh 317 grams, what is the weight of the banana? b. If the lemon weighs 68 grams less than the banana, how much does the lemon weigh? c. What is the weight of the apple?',
    4: 'A frozen turkey weighs about 5 kilograms. The chef orders 45 kilograms of turkey. About how many frozen turkeys does he order? Draw and label a tape diagram.',
    5: 'A recipe needs 300 milliliters of milk. Sara triples the recipe. How many milliliters of milk does Sara need?',
    6: 'Marian fills 3 buckets with 4 liters of water in each bucket. She has 2 liters left. How many liters of water does the container hold?'
  },
  12: {
    1: 'Work with a partner. Use a ruler or a meter stick to complete the length chart and round each measurement to the nearest 10 centimeters.',
    2: 'Work with a partner. Use a digital scale to complete the rice-bag chart and round each measurement to the nearest 10 grams.',
    3: 'Work with a partner. Use a beaker to complete the liquid-volume chart and round each measurement to the nearest 10 milliliters.',
    4: 'Work with a partner. Use a clock to complete the activity-time chart and round each time to the nearest 10 minutes.'
  },
  13: {
    1: 'Round to the nearest ten. Use the number line to model your thinking. a. 32 b. 36 c. 62 d. 162 e. 278 f. 405.',
    2: 'Round the weight of each item to the nearest 10 grams. Draw number lines to model your thinking for 36 grams, 52 grams, and 142 grams.',
    3: 'Carl\'s basketball game begins at 3:03 p.m. and ends at 3:51 p.m. a. How many minutes did the game last? b. Round the total number of minutes to the nearest 10 minutes.'
  },
  14: {
    1: 'Round to the nearest hundred. Use the number line to model your thinking. a. 143 b. 286 c. 320 d. 1,320 e. 1,572 f. 1,250.',
    2: 'Complete the chart. a. Julie has 480 stickers in her collection. To the nearest hundred, about how many stickers does Julie have? b. The library has 525 pages in its copy of Charlie and the Chocolate Factory. To the nearest hundred, about how many pages does the book have? c. A container holds 750 milliliters of water. To the nearest hundred, about how many milliliters of water does the container hold? d. Marsha pays $1,297 for a computer. To the nearest hundred dollars, about how much does the computer cost? e. The Nile River is 1,842 kilometers long. To the nearest hundred kilometers, about how long is the Nile River?',
    3: 'Circle the numbers that round to 600 when rounding to the nearest hundred: 527, 550, 639, 681, 713, and 603.',
    4: 'The teacher asks students to round 1,865 to the nearest hundred. Christian says it is one thousand, nine hundred. Alexis says it is 19 hundreds. Who is correct? Explain.'
  },
  15: {
    1: 'Find the sums below. Choose mental math or the algorithm. a. 46 mL + 5 mL b. 46 mL + 25 mL c. 46 mL + 125 mL d. 59 cm + 30 cm e. 509 cm + 83 cm f. 597 cm + 30 cm g. 29 g + 63 g h. 345 g + 294 g i. 480 g + 476 g j. 1 L 245 mL + 2 L 412 mL k. 2 kg 509 g + 3 kg 367 g.',
    2: 'Nadine and Jen buy a small bag of popcorn and a pretzel at the movie theater. The pretzel weighs 63 grams more than the popcorn. What is the weight of the pretzel?',
    3: 'In math class, Jason and Andrea find the total liquid volume of water in their beakers. Jason says the total is 782 milliliters, but Andrea says it is 792 milliliters. The amount of water in each beaker can be found in the table: Jason 475 mL, Andrea 317 mL. Show whose calculation is correct. Explain the mistake of the other student.',
    4: 'It takes Greg 15 minutes to mow the front lawn. It takes him 17 more minutes to mow the back lawn than the front lawn. What is the total amount of time Greg spends mowing the lawns?'
  },
  16: {
    1: 'Find the sums below. a. 52 mL + 68 mL b. 352 mL + 68 mL c. 352 mL + 468 mL d. 56 cm + 94 cm e. 506 cm + 94 cm f. 506 cm + 394 cm g. 697 g + 138 g h. 345 g + 597 g i. 486 g + 497 g j. 3 L 251 mL + 1 L 549 mL k. 4 kg 384 g + 2 kg 467 g.',
    2: 'Lane makes sauerkraut. He weighs the amounts of cabbage and salt he uses. Draw and label a tape diagram to find the total weight of the cabbage and salt Lane uses.',
    3: 'Sue bakes mini-muffins. After wrapping 86 muffins, she still has 58 muffins cooling. How many muffins did she bake altogether?',
    4: 'The milk carton holds 183 milliliters more liquid than the juice box. The juice box holds 279 mL. What is the total capacity of the juice box and milk carton?'
  },
  17: {
    1: 'a. Find the actual sum either on paper or using mental math. Round each addend to the nearest hundred, and find the estimated sums. A: 451 + 253, 451 + 249, 448 + 249. B: 356 + 161, 356 + 148, 347 + 149. C: 652 + 158, 647 + 158, 647 + 146. Circle the estimated sum that is the closest to its real sum. b. Look at the sums that gave the most precise estimates. Explain below what they have in common. You might use a number line to support your explanation.',
    2: 'Janet watched a movie that is 94 minutes long on Friday night. She watched a movie that is 151 minutes long on Saturday night. a. Decide how to round the minutes. Then, estimate the total minutes Janet watched movies on Friday and Saturday. b. How much time did Janet actually spend watching movies? c. Explain whether or not your estimated sum is close to the actual sum. Round in a different way, and see which estimate is closer.',
    3: 'Sadie, a bear at the zoo, weighs 182 kilograms. Her cub weighs 74 kilograms. a. Estimate the total weight of Sadie and her cub using whatever method you think best. b. What is the actual weight of Sadie and her cub? Model the problem with a tape diagram.'
  },
  18: {
    1: 'Solve the subtraction problems below. a. 60 mL - 24 mL b. 360 mL - 24 mL c. 360 mL - 224 mL d. 518 cm - 21 cm e. 629 cm - 268 cm f. 938 cm - 440 cm g. 307 g - 130 g h. 307 g - 234 g i. 807 g - 732 g j. 2 km 770 m - 1 km 455 m k. 3 kg 924 g - 1 kg 893 g.',
    2: 'The total weight of 3 books is 405 grams. If 2 books weigh 233 grams, how much does the third book weigh? Use a tape diagram to model the problem.',
    3: 'The chart shows the lengths of three movies. The Lost Ship is 117 minutes, Magical Forests is 145 minutes, and Champions is unknown. a. The movie Champions is 22 minutes shorter than The Lost Ship. How long is Champions? b. How much longer is Magical Forests than Champions?',
    4: 'The total length of a rope is 208 centimeters. Scott cuts it into 3 pieces. The first piece is 80 centimeters long. The second piece is 94 centimeters long. How long is the third piece of rope?'
  },
  19: {
    1: 'Solve the subtraction problems below. a. 340 cm - 60 cm b. 340 cm - 260 cm c. 513 g - 148 g d. 641 g - 387 g e. 700 mL - 52 mL f. 700 mL - 452 mL g. 6 km 802 m - 2 km 569 m h. 5 L 920 mL - 3 L 869 mL.',
    2: 'David is driving from Los Angeles to San Francisco. The total distance is 617 kilometers, and he has 468 kilometers left. How many kilometers has he driven so far?',
    3: 'The piano weighs 289 kilograms more than the piano bench. The piano weighs 297 kilograms. How much does the bench weigh?',
    4: 'Tank A holds 165 fewer liters of water than Tank B. Tank B holds 400 liters. How much water does Tank A hold?'
  },
  20: {
    1: 'a. Find the actual differences either on paper or using mental math. Round each total and part to the nearest hundred and find the estimated differences. A: 448 - 153, 451 - 153, 448 - 149, 451 - 149. B: 747 - 261, 756 - 261, 747 - 249, 756 - 248. Circle the estimated differences that are the closest to the actual differences. b. Look at the differences that gave the most precise estimates. Explain below what they have in common. You might use a number line to support your explanation.',
    2: 'Camden uses a total of 372 liters of gas in two months. He uses 184 liters of gas in the first month. How many liters of gas does he use in the second month? a. Estimate the amount of gas Camden uses in the second month by rounding each number as you think best. b. How many liters of gas does Camden actually use in the second month? Model the problem with a tape diagram.',
    3: 'The weight of a pear, apple, and peach is 500 grams total. The pear and apple together weigh 372 grams. How much does the peach weigh? a. Estimate the weight of the peach by rounding each number as you think best. Explain your choice. b. How much does the peach actually weigh? Model the problem with a tape diagram.'
  },
  21: {
    1: 'Weigh the bags of beans and rice on the scale. Then, write the weight on the scales below. a. Estimate, and then find the total weight of the beans and rice. b. Estimate, and then find the difference between the weight of the beans and rice. c. Are your answers reasonable? Explain why.',
    2: 'Measure the lengths of the three pieces of yarn. a. Estimate the total length of Yarn A and Yarn C. Then, find the actual total length. b. Subtract to estimate the difference between the total length of Yarns A and C, and the length of Yarn B. Then, find the actual difference. Model the problem with a tape diagram.',
    3: 'Plot the amount of liquid in the three containers on the number lines below. Then, round to the nearest 10 milliliters. a. Estimate the total amount of liquid in three containers. Then, find the actual amount. b. Estimate to find the difference between the amount of water in Containers D and E. Then, find the actual difference. Model the problem with a tape diagram.',
    4: 'Shane watches a movie in the theater that is 115 minutes long, including the trailers. The chart shows trailer lengths of 5 minutes, 4 minutes, 3 minutes, 5 minutes, and 4 minutes. a. Find the total number of minutes for all 5 trailers. b. Estimate to find the length of the movie without trailers. Then, find the actual length of the movie by calculating the difference between 115 minutes and the total minutes of trailers. c. Is your answer reasonable? Explain why.'
  }
};

function dataTable(title: string, columns: string[], rows: string[][], note?: string): ProblemSetDataDisplay {
  return { kind: 'data-table', title, columns, rows, note };
}

function checkTable(title: string, rows: string[][], note?: string): ProblemSetDataDisplay {
  return dataTable(title, ['Source item', 'Solved evidence required'], rows, note);
}

function numberLine(label: string, tickLabels: string[], targetNumerators: number[] = []): ProblemSetNumberLineModel {
  return { label, denominator: Math.max(1, tickLabels.length - 1), tickLabels, targetNumerators };
}

function teacherProblemSetPageImages(lessonNumber: number): string[] {
  return (TEACHER_PROBLEM_SET_PAGES[lessonNumber] ?? []).map((page) => `/source-pages/m2-teacher/page-${String(page).padStart(3, '0')}.png`);
}

function teacherAnswerKeyPageImages(lessonNumber: number): string[] {
  return (TEACHER_ANSWER_KEY_PAGES[lessonNumber] ?? []).map((page) => `/source-pages/m2-answer-key/page-${String(page).padStart(3, '0')}.png`);
}

function maskMeasurementEquation(text: string): string {
  return text
    .replace(/\b\d{1,2}:\d{2}\s*(?:a\.m\.|p\.m\.)?/gi, '____')
    .replace(/\$\s*\d[\d,]*(?:\.\d+)?/g, '$____')
    .replace(/\b\d[\d,]*(?:\.\d+)?\b/g, '____');
}

function blankEquationTemplates(equations: string[] | undefined): string[] {
  return (equations ?? [])
    .map((equation) => maskMeasurementEquation(equation).trim())
    .filter(Boolean)
    .map((equation) => equation.includes('____') ? equation : `${equation}: ____`);
}

function applyTeacherAnswerKey(lessonNumber: number, item: ProblemSetCenteredProblem): ProblemSetCenteredProblem {
  const officialAnswer = TEACHER_ANSWER_KEY[lessonNumber]?.[item.number];
  if (!officialAnswer) {
    return item;
  }
  const answerEquations = item.equations?.length
    ? item.equations
    : teacherAnswerLooksLikeWork(officialAnswer)
      ? [officialAnswer]
      : [];

  return {
    ...item,
    solvedAnswer: officialAnswer,
    equations: answerEquations,
    explanation: item.explanation,
    validationChecks: [
      `Solved answer is checked against ${TEACHER_SOURCE}, Lesson ${lessonNumber} Answer Key, Problem Set ${item.number}.`,
      ...item.validationChecks
    ]
  };
}

function teacherAnswerLooksLikeWork(answer: string): boolean {
  return /[=+\-x×÷]|->|≈|~=/u.test(answer) || /^\s*(?:\$?\d|[a-z]\.)/i.test(answer) && answer.length < 80;
}

function applyTeacherPrompt(lessonNumber: number, item: ProblemSetCenteredProblem): ProblemSetCenteredProblem {
  const officialPrompt = TEACHER_PROBLEM_PROMPTS[lessonNumber]?.[item.number];
  if (!officialPrompt) {
    return item;
  }

  return {
    ...item,
    sourcePrompt: officialPrompt,
    blankPrompts: item.blankPrompts?.length ? item.blankPrompts : [officialPrompt]
  };
}

function createM2ProblemVisual(seed: ProblemSetCenteredProblem | ProblemSeed, solved: boolean): ProblemVisualSpec {
  const sections: ProblemVisualSpec['sections'] = [];
  const sourceNote = solved
    ? 'Solved view uses the Module 2 Teacher Edition answer key, authored visuals, and unit checks.'
    : 'Blank view keeps the student Problem Set workspace visual and leaves the official answer work open.';

  const measurementModel = makeM2MeasurementModel(seed, solved);
  if (measurementModel) {
    sections.push(measurementModel);
  }

  const dataDisplay = solved ? seed.solvedDataDisplay ?? seed.dataDisplay : seed.dataDisplay;
  if (dataDisplay) {
    sections.push({
      kind: 'data-table',
      label: dataDisplay.title,
      columns: dataDisplay.columns ?? ['Label', 'Value'],
      rows: dataDisplay.rows ?? dataDisplay.values?.map((value) => [value.label, value.valueLabel ?? String(value.value ?? '____')]) ?? []
    });
  }

  if (seed.numberLineModels?.length) {
    seed.numberLineModels.forEach((line) => {
      sections.push({
        kind: 'number-line',
        label: line.label,
        ticks: (line.tickLabels ?? []).map((label, index) => ({
          label,
          target: solved && (line.targetNumerators ?? []).includes(index)
        })),
        caption: solved ? seed.solvedAnswer : seed.blankWorkspaceLabel ?? 'Label the official number line and mark the requested point.'
      });
    });
  }

  if (seed.blankVisualType === 'clock-workspace' || seed.animationType === 'clock-model') {
    sections.push({
      kind: 'clock',
      label: solved ? 'Solved clock model' : 'Blank clock workspace',
      timeLabel: solved ? clockAnswerLabel(seed) : 'Draw or read the hands from the official clock prompt.',
      caption: solved ? seed.solvedAnswer : seed.blankWorkspaceLabel ?? 'Use the official clock face and keep a.m./p.m. when given.'
    });
  }

  if (!dataDisplay && !seed.numberLineModels?.length && seed.blankVisualType !== 'clock-workspace') {
    sections.push(makeM2TapeOrWorkspace(seed, solved));
  } else if (usesM2Tape(seed)) {
    sections.push(makeM2TapeOrWorkspace(seed, solved));
  }

  const equations = seed.equations?.length ? seed.equations : solved ? [seed.solvedAnswer] : [];
  sections.push({
    kind: 'equations',
    label: solved ? 'Solved work' : 'Student work blanks',
    lines: solved ? equations : blankEquationTemplates(equations)
  });

  sections.push({
    kind: 'note',
    label: solved ? 'Answer meaning' : 'Source workspace direction',
    text: solved ? seed.solvedAnswer : seed.blankWorkspaceLabel ?? 'Complete the official Problem Set scaffold with labels, units, and reasoning.'
  });

  return {
    title: `Problem ${seed.number}: ${m2VisualTitle(seed)}`,
    sourceNote,
    sections
  };
}

function makeM2MeasurementModel(seed: ProblemSetCenteredProblem | ProblemSeed, solved: boolean): ProblemVisualMeasurementModelSection | undefined {
  const text = [seed.sourcePrompt, seed.solvedAnswer, ...(seed.equations ?? []), seed.unitLabel ?? ''].join(' ');
  const lower = text.toLowerCase();
  const isTimeNumberLine = !!seed.numberLineModels?.length && /a\.m\.|p\.m\.|minute|minutes|\d{1,2}:\d{2}/i.test(text);
  const hasMass = /\bkg\b|kilogram|gram|weigh|weight|mass|scale|rice|bean|pumpkin|turkey|piano|bench|apple|pear|peach/i.test(text);
  const hasLiquid = /\bl\b|\bml\b|liter|milliliter|liquid|container|barrel|beaker|water|milk|bucket|tank|gas/i.test(text);
  const hasRounding = /round|nearest|estimate|about|halfway|surrounding/i.test(text);
  const hasOperation = !!seed.equations?.length && /[+\-x×÷]/.test(seed.equations.join(' '));
  const hasLabeledMeasurement = /\b\d{1,3}(?:,\d{3})*\s*(?:kg|kilograms?|g|grams?|mL|milliliters?|L|liters?|cm|centimeters?|minutes?|mins?)\b/i.test(text);
  const isBenchmarkWorkspace = /work with a partner|objects that weigh about|classroom object|corresponding weights|benchmark/i.test(text);
  const isUnitChoiceWorkspace = /circle the correct unit|reasonable unit/i.test(text);

  if (seed.blankVisualType === 'tape-diagram') {
    return undefined;
  }

  if (isTimeNumberLine || seed.blankVisualType === 'clock-workspace') {
    return undefined;
  }

  if (!solved && (isBenchmarkWorkspace || isUnitChoiceWorkspace) && seed.dataDisplay?.rows?.length) {
    return undefined;
  }

  if (!hasOperation && !hasLiquid && !hasRounding && !hasLabeledMeasurement && seed.dataDisplay?.rows?.length) {
    return undefined;
  }

  if (!hasMass && !hasLiquid && !hasRounding && !hasOperation) {
    return undefined;
  }

  const model: ProblemVisualMeasurementModelSection['model'] =
    hasRounding ? 'rounding' :
      (hasMass && hasLiquid) || /\b1,?000\b|decompos/.test(lower) ? 'conversion' :
        hasLiquid ? 'liquid' :
          hasMass ? 'mass' :
            'operation';

  const unitLabel = measurementUnitLabel(text, seed.unitLabel);
  const values = measurementValues(seed, solved, unitLabel);

  return {
    kind: 'measurement-model',
    label: solved ? 'Solved measurement model' : 'Source measurement model',
    model,
    unitLabel,
    referenceLabel: measurementReferenceLabel(model, unitLabel),
    equation: solved ? seed.equations?.join(' | ') : blankEquationTemplates(seed.equations).join(' | '),
    maxValue: measurementMax(values),
    values,
    steps: measurementSteps(model, solved),
    note: solved
      ? seed.solvedAnswer
      : seed.blankWorkspaceLabel ?? 'Use the Teacher Edition quantities, units, and model before calculating.'
  };
}

function measurementValues(seed: ProblemSetCenteredProblem | ProblemSeed, solved: boolean, unitLabel?: string): NonNullable<ProblemVisualMeasurementModelSection['values']> {
  const values: NonNullable<ProblemVisualMeasurementModelSection['values']> = [];
  const equationText = seed.equations?.join(' ') ?? '';
  const labeledValues = Array.from([equationText, seed.sourcePrompt, seed.solvedAnswer].join(' ').matchAll(/\b\d{1,3}(?:,\d{3})*\s*(?:kg|kilograms?|g|grams?|mL|milliliters?|L|liters?|cm|centimeters?|minutes?|mins?)\b/gi));
  const seenLabels = new Set<string>();

  labeledValues.slice(0, 5).forEach((match, index) => {
    const valueLabel = normalizeMeasurementLabel(match[0]);
    if (seenLabels.has(valueLabel)) {
      return;
    }
    seenLabels.add(valueLabel);
    const value = Number(match[0].match(/\d{1,3}(?:,\d{3})*/)?.[0].replace(/,/g, '') ?? NaN);
    values.push({
      label: index === labeledValues.length - 1 && solved ? 'answer' : `given ${values.length + 1}`,
      value: Number.isFinite(value) ? value : undefined,
      valueLabel,
      tone: index === labeledValues.length - 1 && solved ? 'answer' : 'given'
    });
  });

  if (values.length) {
    return values;
  }

  const equationNumbers = Array.from(equationText.matchAll(/\b\d{1,3}(?:,\d{3})*\b/g))
    .map((match) => Number(match[0].replace(/,/g, '')))
    .filter((value) => Number.isFinite(value));
  const promptNumbers = Array.from(seed.sourcePrompt.matchAll(/\b\d{1,3}(?:,\d{3})*\b/g))
    .map((match) => Number(match[0].replace(/,/g, '')))
    .filter((value) => Number.isFinite(value));
  const sourceNumbers = equationNumbers.length ? equationNumbers : promptNumbers;
  const uniqueNumbers = Array.from(new Set(sourceNumbers)).slice(0, 4);

  uniqueNumbers.forEach((value, index) => {
    values.push({
      label: index === uniqueNumbers.length - 1 && solved ? 'answer' : `given ${index + 1}`,
      value,
      valueLabel: `${value.toLocaleString()}${unitLabel ? ` ${unitLabel}` : ''}`,
      tone: index === uniqueNumbers.length - 1 && solved ? 'answer' : 'given'
    });
  });

  if (!values.length && seed.dataDisplay?.rows?.length) {
    seed.dataDisplay.rows.slice(0, 4).forEach((row, index) => {
      values.push({
        label: row[0] ?? `item ${index + 1}`,
        valueLabel: solved ? row.at(-1) ?? 'check' : '____',
        tone: solved ? 'answer' : 'given'
      });
    });
  }

  return values.length ? values : [
    { label: 'given measurement', valueLabel: solved ? seed.solvedAnswer : '____', tone: solved ? 'answer' : 'given' }
  ];
}

function normalizeMeasurementLabel(label: string): string {
  return label
    .replace(/\bkilograms?\b/gi, 'kg')
    .replace(/\bgrams?\b/gi, 'g')
    .replace(/\bmilliliters?\b/gi, 'mL')
    .replace(/\bliters?\b/gi, 'L')
    .replace(/\bcentimeters?\b/gi, 'cm')
    .replace(/\bminutes?\b|\bmins?\b/gi, 'min')
    .replace(/\s+/g, ' ')
    .trim();
}

function measurementUnitLabel(text: string, seedUnit?: string): string | undefined {
  if (seedUnit && seedUnit !== 'units') {
    return seedUnit;
  }
  if (/\bml\b|milliliter/i.test(text)) {
    return 'mL';
  }
  if (/\bl\b|liter/i.test(text)) {
    return 'L';
  }
  if (/\bkg\b|kilogram/i.test(text)) {
    return 'kg';
  }
  if (/\bg\b|gram/i.test(text)) {
    return 'g';
  }
  if (/minute/i.test(text)) {
    return 'min';
  }
  if (/centimeter|\bcm\b/i.test(text)) {
    return 'cm';
  }
  return undefined;
}

function measurementReferenceLabel(model: ProblemVisualMeasurementModelSection['model'], unitLabel?: string): string {
  if (model === 'rounding') {
    return 'lower mark - halfway - upper mark';
  }
  if (model === 'conversion') {
    return '1 whole unit = 1,000 smaller units';
  }
  if (model === 'liquid') {
    return `marked container${unitLabel ? ` (${unitLabel})` : ''}`;
  }
  if (model === 'mass') {
    return `scale model${unitLabel ? ` (${unitLabel})` : ''}`;
  }
  return 'known parts -> answer';
}

function measurementMax(values: NonNullable<ProblemVisualMeasurementModelSection['values']>): number | undefined {
  const numericValues = values.map((value) => value.value).filter((value): value is number => value !== undefined);
  return numericValues.length ? Math.max(...numericValues, 1) : undefined;
}

function measurementSteps(model: ProblemVisualMeasurementModelSection['model'], solved: boolean): string[] {
  if (model === 'rounding') {
    return solved
      ? ['Place the measurement between two marks.', 'Compare it to halfway.', 'Choose the nearer mark and keep the unit.']
      : ['Mark the two surrounding values.', 'Find halfway.', 'Decide which mark is closer.'];
  }
  if (model === 'conversion') {
    return ['Keep the whole unit attached.', 'Decompose into equal metric units.', 'Check the base-ten relationship.'];
  }
  if (model === 'operation') {
    return solved
      ? ['Identify the known parts.', 'Add or subtract with the same unit.', 'Label the final answer.']
      : ['Label the known measurements.', 'Choose addition or subtraction.', 'Keep units in the answer.'];
  }
  return solved
    ? ['Read the measurement.', 'Model the quantity.', 'Write the answer with units.']
    : ['Use the source measurement tool.', 'Record the quantity.', 'Keep the unit label attached.'];
}

function makeM2TapeOrWorkspace(seed: ProblemSetCenteredProblem | ProblemSeed, solved: boolean): ProblemVisualSpec['sections'][number] {
  const unit = seed.unitLabel ?? 'units';
  const total = seed.knownTotal ?? seed.quotient;
  const equationPartLabels = m2EquationPartLabels(seed, unit);
  const partCount = equationPartLabels?.length ?? boundedM2Count(seed.knownGroupCount ?? (seed.knownGroupSize ? seed.quotient : 3), 1, 10);
  const partLabel = solved
    ? m2QuantityLabel(seed.knownGroupSize ?? seed.quotient, unit) ?? seed.solvedAnswer
    : seed.knownGroupSize
      ? m2QuantityLabel(seed.knownGroupSize, unit) ?? String(seed.knownGroupSize)
      : '?';

  if (usesM2Tape(seed)) {
    return {
      kind: 'tape',
      label: solved ? 'Solved measurement model' : 'Blank measurement model',
      totalLabel: total ? `${total} ${unit}` : `${unit} total`,
      parts: Array.from({ length: partCount }, (_, index) => ({
        label: equationPartLabels?.[index] ?? partLabel,
        sublabel: seed.shareLabels?.[index],
        emphasize: index < Math.min(2, partCount)
      })),
      caption: solved ? seed.solvedAnswer : seed.blankWorkspaceLabel ?? 'Draw and label the matching measurement model.'
    };
  }

  return {
    kind: 'data-table',
    label: solved ? 'Solved measurement workspace' : 'Blank measurement workspace',
    columns: ['Known', 'Work', 'Answer'],
    rows: [
      [
        seed.sourcePrompt,
        solved ? (seed.equations?.join('; ') ?? seed.solvedAnswer) : blankEquationTemplates(seed.equations).join('; ') || '____',
        solved ? seed.solvedAnswer : '____'
      ]
    ]
  };
}

function m2QuantityLabel(value: number | undefined, unit: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return unit === 'units' ? String(value) : `${value.toLocaleString()} ${unit}`;
}

function m2EquationPartLabels(seed: ProblemSetCenteredProblem | ProblemSeed, unit: string): string[] | undefined {
  const firstEquation = seed.equations?.find((equation) => /[+]/.test(equation));
  if (!firstEquation) {
    return undefined;
  }

  const leftSide = firstEquation.split('=')[0] ?? '';
  const addends = leftSide
    .split('+')
    .map((part) => Number(part.match(/\b\d{1,3}(?:,\d{3})*\b/)?.[0].replace(/,/g, '')))
    .filter((value) => Number.isFinite(value));

  if (addends.length < 2 || addends.length > 10) {
    return undefined;
  }

  return addends.map((value) => m2QuantityLabel(value, unit) ?? String(value));
}

function usesM2Tape(seed: ProblemSetCenteredProblem | ProblemSeed): boolean {
  return (
    seed.blankVisualType === 'tape-diagram' ||
    seed.blankVisualType === 'bar-units' ||
    seed.blankVisualType === 'share-tape' ||
    seed.animationType === 'tape-split' ||
    seed.animationType === 'two-step-model' ||
    seed.animationType === 'grouping-by-size'
  );
}

function clockAnswerLabel(seed: ProblemSetCenteredProblem | ProblemSeed): string {
  const text = [seed.solvedAnswer, ...(seed.equations ?? [])].join(' ');
  const timeMatch = text.match(/\b\d{1,2}:\d{2}\s*(?:a\.m\.|p\.m\.)?/i);
  return timeMatch ? timeMatch[0] : seed.solvedAnswer;
}

function m2VisualTitle(seed: ProblemSetCenteredProblem | ProblemSeed): string {
  if (seed.dataDisplay?.title) {
    return seed.dataDisplay.title;
  }
  if (seed.numberLineModels?.[0]?.label) {
    return seed.numberLineModels[0].label;
  }
  if (seed.blankVisualType === 'clock-workspace') {
    return 'official clock interval';
  }
  if (seed.unitLabel && seed.unitLabel !== 'units' && seed.knownTotal) {
    return `${seed.knownTotal} ${seed.unitLabel}`;
  }
  if (seed.unitLabel && seed.unitLabel !== 'units' && seed.quotient) {
    return `${seed.quotient} ${seed.unitLabel}`;
  }
  return seed.sourcePrompt;
}

function boundedM2Count(value: number | undefined, min: number, max: number): number {
  if (!value || !Number.isFinite(value)) {
    return min;
  }

  return Math.max(min, Math.min(max, Math.round(value)));
}

function problem(seed: ProblemSeed): ProblemSetCenteredProblem {
  return {
    number: seed.number,
    sourcePrompt: seed.sourcePrompt,
    blankPrompts: ['Complete the official Teacher Edition Problem Set scaffold, labels, units, and answer blanks.'],
    blankEquations: blankEquationTemplates(seed.equations),
    blankWorkspaceLabel: seed.blankWorkspaceLabel ?? 'Use the Teacher Edition Problem Set visual model and keep the measurement units attached.',
    blankVisualType: seed.blankVisualType ?? (seed.dataDisplay ? 'data-table-template' : seed.numberLineModels ? 'number-line-template' : 'equation-workspace'),
    dataDisplay: seed.dataDisplay,
    solvedDataDisplay: seed.solvedDataDisplay ?? seed.dataDisplay,
    numberLineModels: seed.numberLineModels,
    solvedAnswer: seed.solvedAnswer,
    equations: seed.equations ?? [],
    knownTotal: seed.knownTotal,
    knownGroupCount: seed.knownGroupCount,
    knownGroupSize: seed.knownGroupSize,
    quotient: seed.quotient ?? 1,
    quotientMeaning: seed.meaning ?? 'The answer states the requested measurement with the correct unit and context.',
    animationType: seed.animationType ?? (seed.dataDisplay ? 'data-display-model' : seed.numberLineModels ? 'number-line-model' : 'two-step-model'),
    unitLabel: seed.unitLabel ?? 'units',
    groupLabel: seed.groupLabel ?? 'parts',
    explanation: seed.explanation ?? 'Use the official quantities, complete the visual model or computation, and state the measurement unit in the answer.',
    validationChecks: seed.checks ?? [
      'The prompt and quantities match the Teacher Edition Problem Set.',
      'The visual model, equation, and answer use the same measurement units.',
      'The final sentence answers the exact question asked.'
    ],
    shareLabels: seed.shareLabels
  };
}

function stopwatchSentenceProblem(seed: StopwatchSentenceSeed): ProblemSetCenteredProblem {
  const centered = problem({
    number: seed.number,
    sourcePrompt: seed.sourcePrompt,
    solvedAnswer: seed.solvedAnswer,
    equations: [seed.sampleResponse],
    blankVisualType: 'clock-workspace',
    animationType: 'clock-model',
    blankWorkspaceLabel: seed.blankWorkspaceLabel,
    meaning: seed.meaning,
    explanation: seed.explanation,
    checks: seed.checks,
    unitLabel: 'seconds',
    groupLabel: 'elapsed time'
  });

  return {
    ...centered,
    blankPrompts: ['Use the stopwatch, then complete the answer line with a measured number of seconds.'],
    blankEquations: [],
    blankVisual: stopwatchSentenceVisual(seed, false),
    solvedVisual: stopwatchSentenceVisual(seed, true)
  };
}

function stopwatchTableProblem(seed: StopwatchTableSeed): ProblemSetCenteredProblem {
  const centered = problem({
    number: seed.number,
    sourcePrompt: seed.sourcePrompt,
    solvedAnswer: seed.solvedAnswer,
    equations: seed.equations ?? [],
    blankVisualType: 'clock-workspace',
    animationType: 'clock-model',
    blankWorkspaceLabel: seed.blankWorkspaceLabel,
    meaning: seed.meaning,
    explanation: seed.explanation,
    checks: seed.checks,
    unitLabel: 'seconds',
    groupLabel: 'elapsed time'
  });

  return {
    ...centered,
    blankPrompts: ['Use the stopwatch for each row, then record seconds in the official chart.'],
    blankEquations: [],
    dataDisplay: undefined,
    solvedDataDisplay: undefined,
    blankVisual: stopwatchTableVisual(seed, false),
    solvedVisual: stopwatchTableVisual(seed, true)
  };
}

function stopwatchSentenceVisual(seed: StopwatchSentenceSeed, solved: boolean): ProblemVisualSpec {
  const duration = solved ? stopwatchDurationLabel(seed.sampleResponse) : '____ seconds';
  return {
    title: solved ? `Problem ${seed.number}: sample variable response` : `Problem ${seed.number}: Teacher Edition worksheet panel`,
    sections: [
      {
        kind: 'stopwatch-workspace',
        label: solved ? 'Sample measured response' : 'Stopwatch measurement workspace',
        prompt: seed.sourcePrompt,
        answerLine: seed.blankSentence,
        sampleAnswer: solved ? seed.sampleResponse : undefined,
        startLabel: '0 seconds',
        elapsedLabel: solved ? duration : 'measure',
        stopLabel: solved ? duration : '____ seconds',
        sampleWork: solved ? seed.sampleWork : undefined,
        sourceWorkLabel: seed.sourceWorkLabel,
        sourceWorkLines: seed.sourceWorkLines,
        sourceWorkColumns: seed.sourceWorkColumns,
        icon: seed.number === 1 ? 'snap' : seed.number === 2 ? 'numbers' : seed.number === 3 ? 'animals' : 'equation',
        note: solved
          ? 'The number can vary. The important evidence is that the activity was timed and the answer is written in seconds.'
          : seed.blankWorkspaceLabel
      }
    ]
  };
}

function stopwatchTableVisual(seed: StopwatchTableSeed, solved: boolean): ProblemVisualSpec {
  return {
    title: solved ? `${seed.title}: sample filled response` : `${seed.title}: Teacher Edition chart`,
    sections: [
      {
        kind: 'stopwatch-workspace',
        label: solved ? 'Sample stopwatch data' : 'Official stopwatch chart',
        prompt: seed.sourcePrompt,
        icon: seed.number === 6 ? 'relay' : 'activity',
        startLabel: '0 seconds',
        elapsedLabel: solved ? (seed.number === 6 ? 'add runner times' : 'time each task') : 'measure each row',
        stopLabel: solved ? (seed.number === 6 ? seed.totalSample ?? 'total seconds' : 'record seconds') : '____ seconds',
        columns: seed.columns,
        rows: seed.blankRows.slice(0, seed.number === 6 ? 4 : undefined).map((row, index) => ({
          label: row[0],
          blank: row[1],
          sample: solved ? seed.solvedRows[index]?.[1] : undefined
        })),
        totalLabel: seed.totalLabel,
        totalBlank: seed.totalBlank,
        totalSample: solved ? seed.totalSample : undefined,
        note: solved ? seed.solvedNote : seed.blankNote
      }
    ]
  };
}

function stopwatchDurationLabel(text: string): string {
  const match = text.match(/\b\d+\s+seconds\b/i);
  return match?.[0] ?? 'measured seconds';
}

function timeLineProblem(seed: TimeLineProblemSeed): ProblemSetCenteredProblem {
  const centered = problem({
    number: seed.number,
    sourcePrompt: seed.sourcePrompt,
    solvedAnswer: seed.solvedAnswer,
    equations: seed.equations,
    blankVisualType: 'number-line-template',
    animationType: 'number-line-model',
    blankWorkspaceLabel: seed.blankWorkspaceLabel,
    meaning: seed.meaning,
    explanation: seed.explanation,
    checks: seed.checks,
    unitLabel: 'minutes',
    groupLabel: 'time'
  });

  return {
    ...centered,
    blankPrompts: ['Use the official time number line. Label the hour endpoints, count intervals by fives, then plot or read the requested time.'],
    blankEquations: blankEquationTemplates(seed.equations),
    numberLineModels: undefined,
    blankVisual: timeLineVisual(seed, false),
    solvedVisual: timeLineVisual(seed, true)
  };
}

function timeLineVisual(seed: TimeLineProblemSeed, solved: boolean): ProblemVisualSpec {
  const sections: ProblemVisualSpec['sections'] = [
    ...(seed.clocks ?? []).map((clock) => {
      const showClockTime = solved || clock.showInBlank;
      return {
        kind: 'clock' as const,
        label: clock.label,
        timeLabel: showClockTime ? clock.timeLabel : clock.blankTimeLabel ?? 'Draw or read the source clock.',
        timeValue: showClockTime ? clock.timeLabel : '',
        caption: clock.caption
      };
    }),
    {
      kind: 'time-number-line',
      label: solved ? `Solved ${timeLineRangeLabel(seed)} minute line` : `Blank ${timeLineRangeLabel(seed)} minute line`,
      startLabel: seed.startLabel,
      endLabel: seed.endLabel,
      displayStartMinute: seed.displayStartMinute,
      displayEndMinute: seed.displayEndMinute,
      tickLabels: seed.tickLabels ?? timeTicks,
      labelEvery: seed.labelEvery,
      sourceItems: seed.sourceItems,
      points: solved ? seed.points : seed.points.filter((point) => point.open),
      jumps: solved ? seed.jumps : undefined,
      showPointDetails: seed.showPointDetails,
      note: solved ? seed.solvedNote : seed.blankNote
    }
  ];

  if (seed.directions?.length) {
    sections.push({
      kind: 'source-directions',
      label: solved ? 'Teacher Edition directions checked' : 'Teacher Edition directions',
      items: seed.directions
    });
  }

  sections.push(
    {
      kind: 'equations',
      label: solved ? 'Source-backed reasoning' : 'Student work blanks',
      lines: solved ? seed.equations : blankEquationTemplates(seed.equations)
    },
    {
      kind: 'note',
      label: solved ? 'Answer meaning' : 'Source workspace direction',
      text: solved ? seed.explanation : seed.blankWorkspaceLabel
    }
  );

  return {
    title: solved ? `Problem ${seed.number}: time number line solved` : `Problem ${seed.number}: source number line workspace`,
    sections
  };
}

function timeLineRangeLabel(seed: TimeLineProblemSeed): string {
  const ticks = seed.tickLabels ?? timeTicks;
  const start = seed.displayStartMinute ?? ticks[0] ?? '0';
  const end = seed.displayEndMinute ?? ticks.at(-1) ?? '60';
  return `${start}-${end}`;
}

function lesson(seed: LessonSeed): ProblemSetCenteredLesson {
  const sourcePageImages = teacherProblemSetPageImages(seed.lessonNumber);
  const answerKeyImages = teacherAnswerKeyPageImages(seed.lessonNumber);

  return {
    title: `Lesson ${seed.lessonNumber} concept: ${seed.title}`,
    concept: seed.concept,
    teacherEditionBasis: `${TEACHER_SOURCE}, Lesson ${seed.lessonNumber} objective, Concept Development, Problem Set, and Student Debrief.`,
    contrast: seed.contrast,
    summary: seed.summary,
    sourceNote: `${TEACHER_SOURCE}, Lesson ${seed.lessonNumber} Problem Set is the source of truth for prompts, quantities, visuals, and solved reasoning.`,
    sourcePageImages,
    blankSourcePageImages: sourcePageImages,
    solvedSourcePageImages: [...sourcePageImages, ...answerKeyImages],
    conceptSections: [
      {
        title: '1. Teacher Edition concept',
        body: seed.concept,
        teacherSource: `${TEACHER_SOURCE}, Lesson ${seed.lessonNumber} Concept Development.`,
        checkpoints: ['Name the measurement unit.', 'Use the lesson model before calculating.', 'Check whether the answer is reasonable.']
      },
      {
        title: '2. Official Problem Set',
        body: 'Blank mode preserves the Teacher Edition problem scaffold. Solved mode completes the same numbered problems with visual reasoning and unit checks.',
        teacherSource: `${TEACHER_SOURCE}, Lesson ${seed.lessonNumber} Problem Set.`,
        checkpoints: ['Use the numbered Problem Set item in order.', 'Keep visual-only source items source-referenced rather than guessed.', 'Do not substitute invented parallel problems.']
      },
      {
        title: '3. Validation focus',
        body: seed.contrast,
        teacherSource: `${TEACHER_SOURCE}, Lesson ${seed.lessonNumber} Student Debrief.`,
        checkpoints: ['Estimate when the lesson asks for it.', 'Compute exactly when the problem asks for actual measurement.', 'Use units in every final answer.']
      }
    ],
    problems: seed.problems.map((item) => {
      const centeredProblem = applyTeacherAnswerKey(
        seed.lessonNumber,
        applyTeacherPrompt(seed.lessonNumber, 'validationChecks' in item ? item : problem(item))
      );

      return {
        ...centeredProblem,
        sourcePageImages: centeredProblem.sourcePageImages ?? sourcePageImages,
        blankSourcePageImages: centeredProblem.blankSourcePageImages ?? sourcePageImages,
        solvedSourcePageImages: centeredProblem.solvedSourcePageImages ?? [...sourcePageImages, ...answerKeyImages],
        blankVisual: centeredProblem.blankVisual ?? createM2ProblemVisual(centeredProblem, false),
        solvedVisual: centeredProblem.solvedVisual ?? createM2ProblemVisual(centeredProblem, true)
      };
    })
  };
}

const timeTicks = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'];
const exactMinuteTicks = Array.from({ length: 61 }, (_, minute) => String(minute));
const tensTicks = ['lower ten', 'halfway', 'upper ten'];
const hundredTicks = ['lower hundred', 'halfway', 'upper hundred'];

export const M2_PROBLEM_SET_CENTERED_LESSONS: Record<number, ProblemSetCenteredLesson> = {
  1: lesson({
    lessonNumber: 1,
    title: 'time is a continuous measurement',
    concept: 'A stopwatch measures a short slice of time in seconds or minutes. The Teacher Edition concept sequence has students feel 1 second, 5 seconds, and 40 seconds, then use the stopwatch to measure real activities. Stopping the stopwatch stops the measurement, not time itself.',
    contrast: 'Estimate first when useful, measure the activity with the stopwatch, record the elapsed number, attach seconds, and explain why time keeps moving even after the stopwatch stops.',
    summary: 'Seconds measure short activities, minutes measure longer ones, and time is continuous. A correct Lesson 1 Problem Set keeps each official stopwatch blank open until a real measurement is recorded in seconds; the relay also totals the measured runner times.',
    problems: [
      stopwatchSentenceProblem({
        number: 1,
        sourcePrompt: 'Use a stopwatch to time snapping your fingers 10 times.',
        blankSentence: 'It takes __________ to snap 10 times.',
        sampleResponse: 'It takes 9 seconds to snap 10 times.',
        sampleWork: ['Sample variable response: 9 seconds.'],
        solvedAnswer: 'Times will vary. A complete response records one measured stopwatch time and writes it in the sentence blank as a number of seconds.',
        blankWorkspaceLabel: 'Time the exact snapping task, then fill the sentence blank with the measured number of seconds.',
        meaning: 'The answer tells how many seconds passed while snapping 10 times.',
        explanation: 'Use the stopwatch to measure the activity once. Write the measured elapsed time in the sentence blank and attach seconds.',
        checks: [
          'The official snapping task is unchanged.',
          'The answer is a measured stopwatch result, not an invented fixed answer.',
          'The unit seconds is attached to the number.'
        ]
      }),
      stopwatchSentenceProblem({
        number: 2,
        sourcePrompt: 'Use a stopwatch to time writing every whole number from 0 to 25.',
        blankSentence: 'It takes __________ to write every whole number from 0 to 25.',
        sampleResponse: 'It takes 37 seconds to write every whole number from 0 to 25.',
        sampleWork: ['Sample work writes 0, 1, 2, 3, ... 25 before recording the elapsed time.'],
        sourceWorkLabel: 'Source work: numbers written before timing stops',
        sourceWorkLines: [
          '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,',
          '11, 12, 13, 14, 15, 16, 17, 18,',
          '19, 20, 21, 22, 23, 24, 25.'
        ],
        solvedAnswer: 'Times will vary. A complete response records one measured stopwatch time for writing every whole number from 0 to 25 and labels the result in seconds.',
        blankWorkspaceLabel: 'Write 0 through 25 while timed, then complete the sentence blank with the measured seconds.',
        meaning: 'The answer tells how many seconds passed while writing the whole-number sequence.',
        explanation: 'Measure the actual writing task and record the elapsed seconds in the official sentence blank.',
        checks: [
          'The student writes every whole number from 0 to 25.',
          'The response records one measured elapsed time.',
          'The final entry includes seconds.'
        ]
      }),
      stopwatchSentenceProblem({
        number: 3,
        sourcePrompt: 'Use a stopwatch to time naming 10 animals and record them.',
        blankSentence: 'It takes __________ to name 10 animals.',
        sampleResponse: 'It takes 40 seconds to name 10 animals.',
        sampleWork: ['Sample animal list: dog, cat, horse, turtle, fish, hamster, rabbit, cow, pig, mouse.'],
        sourceWorkLabel: 'Source work: 10 recorded animals',
        sourceWorkLines: ['dog', 'cat', 'horse', 'turtle', 'fish', 'hamster', 'rabbit', 'cow', 'pig', 'mouse'],
        solvedAnswer: 'Times will vary. A complete response lists 10 animals, records one measured stopwatch time, and labels the result in seconds.',
        blankWorkspaceLabel: 'Name and record 10 animals, time the naming task, and complete the elapsed-time sentence.',
        meaning: 'The answer tells how many seconds passed while naming the 10 recorded animals.',
        explanation: 'The content of the animal list can vary, but the list must contain 10 animals and the elapsed time must be measured in seconds.',
        checks: [
          'The list has 10 animals.',
          'The timing result comes from a stopwatch.',
          'The measured value is written with seconds.'
        ]
      }),
      stopwatchSentenceProblem({
        number: 4,
        sourcePrompt: 'Use a stopwatch to time writing 7 x 8 = 56 fifteen times. Record the time.',
        blankSentence: 'It takes __________ to write 7 x 8 = 56 fifteen times.',
        sampleResponse: 'It takes 53 seconds to write 7 x 8 = 56 fifteen times.',
        sampleWork: ['Sample work repeats 7 x 8 = 56 fifteen times before recording the elapsed time.'],
        sourceWorkLabel: 'Source work: equation written 15 times',
        sourceWorkLines: Array.from({ length: 15 }, () => '7 x 8 = 56'),
        sourceWorkColumns: 3,
        solvedAnswer: 'Times will vary. A complete response times writing 7 x 8 = 56 fifteen times, records the elapsed time, and labels it in seconds.',
        blankWorkspaceLabel: 'Write the equation 15 times while timed, then fill the official sentence blank with seconds.',
        meaning: 'The answer tells how many seconds passed while writing the multiplication sentence 15 times.',
        explanation: 'The Teacher Edition gives a variable answer because different students will record different elapsed times.',
        checks: [
          'The repeated equation is 7 x 8 = 56.',
          'The equation is written 15 times.',
          'The measured elapsed time is labeled in seconds.'
        ]
      }),
      stopwatchTableProblem({
        number: 5,
        sourcePrompt: 'Work with your group. Use a stopwatch to measure the time for each of the following activities.',
        title: 'Problem 5 activity chart',
        columns: ['Activity', 'Time'],
        blankRows: [
          ['Write your full name.', '________ seconds'],
          ['Do 20 jumping jacks.', '________ seconds'],
          ['Whisper count by twos from 0 to 30.', '________ seconds'],
          ['Draw 8 squares.', '________ seconds'],
          ['Skip-count out loud by fours from 24 to 0.', '________ seconds'],
          ['Say the names of your teachers from Kindergarten to Grade 3.', '________ seconds']
        ],
        solvedRows: [
          ['Write your full name.', '5 seconds'],
          ['Do 20 jumping jacks.', '25 seconds'],
          ['Whisper count by twos from 0 to 30.', '16 seconds'],
          ['Draw 8 squares.', '20 seconds'],
          ['Skip-count out loud by fours from 24 to 0.', '15 seconds'],
          ['Say the names of your teachers from Kindergarten to Grade 3.', '11 seconds']
        ],
        blankNote: 'Use a stopwatch for each row. Leave the time blank until the group measures the activity.',
        solvedNote: 'Sample variable response: every official row has a measured number of seconds.',
        solvedAnswer: 'Times will vary. Each of the six official group activity rows needs a measured stopwatch time recorded in seconds.',
        equations: ['each activity row = measured seconds'],
        blankWorkspaceLabel: 'Measure each official group activity and fill every chart row with elapsed seconds.',
        meaning: 'The chart compares several short activities by the number of seconds each one takes.',
        explanation: 'The solved work is complete only when all six official chart rows have measured stopwatch times in seconds.',
        checks: [
          'All six official activity rows are present.',
          'Every row has a measured elapsed time.',
          'Every time is labeled in seconds.'
        ]
      }),
      stopwatchTableProblem({
        number: 6,
        sourcePrompt: '100 meter relay: Use a stopwatch to measure and record your team’s times.',
        title: 'Problem 6 relay table',
        columns: ['Name', 'Time'],
        blankRows: [
          ['Gina', '________ seconds'],
          ['Tom', '________ seconds'],
          ['Carlos', '________ seconds']
        ],
        solvedRows: [
          ['Gina', '18 seconds'],
          ['Tom', '15 seconds'],
          ['Carlos', '20 seconds']
        ],
        totalLabel: 'Total time',
        totalBlank: '________ seconds',
        totalSample: '53 seconds',
        blankNote: 'Record each runner time in seconds. Add the runner times to complete the total time.',
        solvedNote: 'Sample variable response: 18 + 15 + 20 = 53 seconds.',
        solvedAnswer: 'Times will vary. Each relay runner needs a measured time in seconds, and the total time is the sum of the runner times.',
        equations: ['18 + 15 + 20 = 53 seconds'],
        blankWorkspaceLabel: 'Record each relay runner time, then add the runner times to complete the total time.',
        meaning: 'The total time tells how many seconds the whole relay team took altogether.',
        explanation: 'Unlike Problems 1-5, this chart also needs an addition check: the total must equal the sum of the runner times.',
        checks: [
          'The relay table records each team member time.',
          'The total time is computed by adding the runner times.',
          'Runner times and total time are labeled in seconds.'
        ]
      })
    ]
  }),
  2: lesson({
    lessonNumber: 2,
    title: 'clocks connect to 5-minute number lines',
    concept: 'The Teacher Edition moves from a one-hour tape diagram to a straight number line: 12 equal intervals of 5 minutes make 60 minutes. A clock can then be read as the same 0-60 minute line wrapped into a circle.',
    contrast: 'The important count is the interval count, not the tick-mark count. First name the hour span, then count five-minute intervals from the start of the hour and plot the matching clock time.',
    summary: 'Lesson 2 uses continuous time lines to connect 7:00-8:00 and 5:00-6:00 clock times to minute positions. Solved work must show endpoints, fives, plotted points, and whether a clock belongs in the hour interval.',
    problems: [
      timeLineProblem({
        number: 1,
        sourcePrompt: 'Follow the directions to label the number line below.',
        startLabel: '7:00 a.m.',
        endLabel: '8:00 a.m.',
        points: [
          { label: 'D', minute: 10, detail: '7:10' },
          { label: 'E', minute: 35, detail: '7:35' },
          { label: 'T', minute: 40, detail: '7:40' },
          { label: 'L', minute: 45, detail: '7:45' },
          { label: 'W', minute: 55, detail: '7:55' }
        ],
        showPointDetails: false,
        directions: [
          { lead: 'Endpoints', text: 'Ingrid gets ready for school between 7:00 a.m. and 8:00 a.m. Label the first and last tick marks as 7:00 a.m. and 8:00 a.m.' },
          { lead: 'Five-minute scale', text: 'Each interval represents 5 minutes. Count by fives starting at 0, or 7:00 a.m. Label each 5 minute interval below the number line up to 8:00 a.m.' },
          { lead: 'D at 7:10', text: 'Ingrid starts getting dressed at 7:10 a.m. Plot a point and write D above it.' },
          { lead: 'E at 7:35', text: 'Ingrid starts eating breakfast at 7:35 a.m. Plot a point and write E above it.' },
          { lead: 'T at 7:40', text: 'Ingrid starts brushing her teeth at 7:40 a.m. Plot a point and write T above it.' },
          { lead: 'L at 7:45', text: 'Ingrid starts packing her lunch at 7:45 a.m. Plot a point and write L above it.' },
          { lead: 'W at 7:55', text: 'Ingrid starts waiting for the bus at 7:55 a.m. Plot a point and write W above it.' }
        ],
        blankNote: 'Label the first tick 7:00 a.m., the last tick 8:00 a.m., and the intervals 0, 5, 10, ... 60 before plotting letters.',
        solvedNote: 'Each plotted letter is a minute position after 7:00: D 10, E 35, T 40, L 45, W 55.',
        solvedAnswer: 'D = 7:10, E = 7:35, T = 7:40, L = 7:45, W = 7:55.',
        equations: ['D: 7:00 + 10 min = 7:10', 'E: 7:00 + 35 min = 7:35', 'T: 7:00 + 40 min = 7:40', 'L: 7:00 + 45 min = 7:45', 'W: 7:00 + 55 min = 7:55'],
        blankWorkspaceLabel: 'Use the official Ingrid number line. Count by fives from 7:00 to 8:00, then plot each letter above the correct minute mark.',
        meaning: 'The letters name events between 7:00 and 8:00 a.m.',
        explanation: 'The number line measures the 60 minutes after 7:00 a.m.; each letter sits at its elapsed-minute position.',
        checks: [
          'The endpoints are labeled 7:00 a.m. and 8:00 a.m.',
          'The intervals are counted by fives from 0 to 60.',
          'D, E, T, L, and W match the Teacher Edition answer-key positions.'
        ]
      }),
      timeLineProblem({
        number: 2,
        sourcePrompt: 'Label 5:00 p.m. to 6:00 p.m. by fives and match clocks. Not all clocks match.',
        startLabel: '5:00 p.m.',
        endLabel: '6:00 p.m.',
        sourceItems: [
          { label: '8:35', sourceX: 4, detail: 'outside 5:00-6:00', kind: 'digital', status: 'unmatched' },
          { label: 'analog clock', minute: 50, sourceX: 20, detail: '5:50', kind: 'analog', status: 'matched' },
          { label: '5:15', minute: 15, sourceX: 36, detail: '5:15', kind: 'digital', status: 'matched' },
          { label: 'analog clock', sourceX: 52, detail: '6:10 outside 5:00-6:00', kind: 'analog', status: 'unmatched' },
          { label: '5:40', minute: 40, sourceX: 68, detail: '5:40', kind: 'digital', status: 'matched' },
          { label: 'analog clock', minute: 25, sourceX: 84, detail: '5:25', kind: 'analog', status: 'matched' }
        ],
        points: [
          { label: '5:15', minute: 15, detail: 'matches 15 minutes after 5:00' },
          { label: '5:25', minute: 25, detail: 'matches 25 minutes after 5:00' },
          { label: '5:40', minute: 40, detail: 'matches 40 minutes after 5:00' },
          { label: '5:50', minute: 50, detail: 'matches 50 minutes after 5:00' }
        ],
        blankNote: 'The source gives six clock/digital items above the line. Label every 5-minute interval, then connect only items that fall between 5:00 p.m. and 6:00 p.m.',
        solvedNote: 'The source answer key says: first clock not matched, second clock 5:50, third 5:15, fourth not matched, fifth 5:40, last 5:25.',
        solvedAnswer: 'Every 5 minutes is labeled; clocks at 5:50, 5:15, 5:40, and 5:25 match. The first and fourth clocks do not match.',
        equations: ['5:15 = 15 min after 5:00', '5:25 = 25 min after 5:00', '5:40 = 40 min after 5:00', '5:50 = 50 min after 5:00'],
        blankWorkspaceLabel: 'Recreate the source task: read each item above the line, label the 0-60 minute scale, and leave unmatched items off the number line.',
        meaning: 'A matching clock must show a time in the same hour interval as the number line.',
        explanation: 'The source asks students to reject nonmatching clocks, so solved work needs both matched and unmatched evidence.',
        checks: [
          'The 5:00-6:00 line is labeled by fives.',
          'Four matching clock times are plotted.',
          'The nonmatching clocks are explicitly left off the line.'
        ]
      }),
      timeLineProblem({
        number: 3,
        sourcePrompt: 'Label Noah\'s number line to locate 5:45 p.m.',
        startLabel: '5:00 p.m.',
        endLabel: '6:00 p.m.',
        points: [{ label: '5:45', minute: 45, detail: 'Noah' }],
        jumps: [{ label: '9 fives', fromMinute: 0, toMinute: 45 }],
        blankNote: 'Use the 5:00 to 6:00 line. Count 5, 10, 15, ... until the 45-minute mark.',
        solvedNote: '5:45 is 45 minutes after 5:00, so it is the ninth five-minute interval.',
        solvedAnswer: '5:45 p.m. is 45 minutes after 5:00 p.m.',
        equations: ['9 x 5 min = 45 min', '5:00 + 45 min = 5:45'],
        blankWorkspaceLabel: 'Label each five-minute interval and plot 5:45 at the 45-minute mark.',
        meaning: 'The plotted point shows Noah\'s target time in the hour from 5:00 to 6:00 p.m.',
        explanation: 'Counting nine five-minute intervals from the start of the hour lands on 5:45 p.m.',
        checks: [
          'The line starts at 5:00 p.m. and ends at 6:00 p.m.',
          'The tick labels increase by 5 minutes.',
          'The point for 5:45 is plotted at 45 minutes.'
        ]
      }),
      timeLineProblem({
        number: 4,
        sourcePrompt: 'Tanner tells his little brother that 11:25 p.m. comes after 11:20 a.m. Do you agree with Tanner? Why or why not?',
        startLabel: '11:00 p.m.',
        endLabel: '12:00 a.m.',
        sourceItems: [
          { label: '11:25 p.m.', minute: 25, detail: 'source number-line point', kind: 'note', status: 'matched' },
          { label: '11:20 a.m.', detail: 'morning, not on this night line', kind: 'note', status: 'unmatched' }
        ],
        points: [{ label: '11:25 p.m.', minute: 25, detail: 'night' }],
        jumps: [{ label: '25 min after 11:00 p.m.', fromMinute: 0, toMinute: 25 }],
        blankNote: 'The source sample uses a line from 11:00 p.m. to 12:00 a.m. to place 11:25 p.m. Then compare that night time to 11:20 a.m.',
        solvedNote: 'Answer key: answers vary. A complete answer must explain that p.m. is night and a.m. is morning, not just compare 25 and 20.',
        solvedAnswer: 'Yes. 11:25 p.m. comes after 11:20 a.m.; 11:20 a.m. is morning and 11:25 p.m. is night.',
        equations: ['11:25 p.m. = 25 min after 11:00 p.m.', '11:20 a.m. is morning', 'p.m. and a.m. are different parts of the day'],
        blankWorkspaceLabel: 'Use the source idea: locate 11:25 p.m. on the night hour line, then explain why 11:20 a.m. is a morning time.',
        meaning: 'The comparison depends on a.m. and p.m., not only the minute numbers.',
        explanation: 'A complete response explains why p.m. is a night time and a.m. is a morning time, then answers Tanner\'s story question.',
        checks: [
          'The explanation names a.m. and p.m.',
          'The response answers whether Tanner is correct.',
          'The final answer is not based only on 25 being greater than 20.'
        ]
      })
    ]
  }),
  3: lesson({
    lessonNumber: 3,
    title: 'tell time to the nearest minute',
    concept: 'The Teacher Edition starts with the 0-60 number line from Lesson 2, then inserts the small one-minute ticks inside each 5-minute interval. Students count by fives to the nearest five-minute benchmark and then count ones to the exact minute.',
    contrast: 'Lesson 2 stops on five-minute marks. Lesson 3 reads between the fives: for 7:37, count seven fives to 35 and two more ones to 37.',
    summary: 'Exact clock times are modeled as five-minute groups plus extra one-minute ticks. Solved work should show the hour, the five-minute benchmark, the leftover ones, and the final clock time.',
    problems: [
      timeLineProblem({
        number: 1,
        sourcePrompt: 'Plot a point on the number line for the times shown on the clocks below. Then, draw a line to match the clocks to the points.',
        startLabel: '7:00 p.m.',
        endLabel: '8:00 p.m.',
        tickLabels: exactMinuteTicks,
        labelEvery: 10,
        sourceItems: [
          { label: 'analog clock', minute: 17, sourceX: 6, detail: 'first clock - 7:17', kind: 'analog', status: 'matched' },
          { label: '7:03', minute: 3, sourceX: 26, detail: 'second clock - 7:03', kind: 'digital', status: 'matched' },
          { label: 'analog clock', minute: 55, sourceX: 52, detail: 'third clock - 7:55', kind: 'analog', status: 'matched' },
          { label: 'analog clock', minute: 41, sourceX: 70, detail: 'fourth clock - 7:41', kind: 'analog', status: 'matched' },
          { label: '7:28', minute: 28, sourceX: 90, detail: 'fifth clock - provided example', kind: 'digital', status: 'provided' }
        ],
        points: [
          { label: 'clock 1', minute: 17, detail: '7:17' },
          { label: 'clock 2', minute: 3, detail: '7:03' },
          { label: 'clock 3', minute: 55, detail: '7:55' },
          { label: 'clock 4', minute: 41, detail: '7:41' },
          { label: 'provided', minute: 28, detail: '7:28', open: true }
        ],
        jumps: [
          { label: '15 + 2', fromMinute: 15, toMinute: 17 },
          { label: '25 + 3', fromMinute: 25, toMinute: 28 },
          { label: '40 + 1', fromMinute: 40, toMinute: 41 }
        ],
        blankNote: 'The source page already shows the 7:28 digital clock connected to minute 28 as an example. Use that model to match the remaining clocks.',
        solvedNote: 'The answer key identifies 7:17, 7:03, 7:55, and 7:41, with the fifth 7:28 item already provided in the source visual.',
        solvedAnswer: 'First clock 7:17 p.m.; second clock 7:03 p.m.; third clock 7:55 p.m.; fourth clock 7:41 p.m.; fifth clock answer provided.',
        equations: ['7:17 = 15 + 2 min after 7:00', '7:03 = 0 + 3 min after 7:00', '7:28 = 25 + 3 min after 7:00', '7:55 = 11 x 5 min', '7:41 = 40 + 1 min after 7:00'],
        blankWorkspaceLabel: 'Use the provided 7:28 example, then match each remaining clock to the exact minute on the 7:00-8:00 number line.',
        meaning: 'Each clock time is an exact minute position in the hour after 7:00 p.m.',
        explanation: 'The solved model shows why exact times between five-minute marks still belong on the continuous time line.',
        checks: [
          'The hour interval is 7:00 p.m. to 8:00 p.m.',
          'Clock times are plotted to the nearest minute, not rounded to fives.',
          'Known answer-key times are labeled on the line.'
        ]
      }),
      timeLineProblem({
        number: 2,
        sourcePrompt: 'Jessie woke up this morning at 6:48 a.m. Draw hands on the clock below to show what time Jessie woke up.',
        startLabel: '6:00 a.m.',
        endLabel: '7:00 a.m.',
        tickLabels: exactMinuteTicks,
        clocks: [
          {
            label: 'Clock to draw',
            timeLabel: '6:48 a.m.',
            blankTimeLabel: 'Draw hands for 6:48 a.m.',
            caption: 'Minute hand at 48; hour hand close to 7.'
          }
        ],
        points: [{ label: '6:48', minute: 48, detail: 'Jessie' }],
        jumps: [
          { label: '9 fives = 45', fromMinute: 0, toMinute: 45 },
          { label: '+3 ones', fromMinute: 45, toMinute: 48 }
        ],
        blankNote: 'Count by fives to 45, then count three one-minute ticks to 48 before drawing the clock hands.',
        solvedNote: '6:48 means the minute hand points to the 48th minute and the hour hand is close to 7.',
        solvedAnswer: 'Hands on the clock drawn to show 6:48 a.m.',
        equations: ['9 x 5 = 45', '45 + 3 = 48', '6:00 + 48 min = 6:48'],
        blankWorkspaceLabel: 'Use the number line to locate 48 minutes after 6:00, then transfer that minute position to the clock.',
        meaning: 'The time Jessie woke up is 48 minutes after 6:00 a.m.',
        explanation: 'The five-minute benchmark is 45; three extra one-minute ticks make 48.',
        checks: [
          'The minute count reaches 48.',
          'The five-minute and one-minute parts are both visible.',
          'The final time is labeled 6:48 a.m.'
        ]
      }),
      timeLineProblem({
        number: 3,
        sourcePrompt: 'Mrs. Barnes starts teaching math at 8:23 a.m. Draw hands on the clock below to show what time Mrs. Barnes starts teaching math.',
        startLabel: '8:00 a.m.',
        endLabel: '9:00 a.m.',
        tickLabels: exactMinuteTicks,
        clocks: [
          {
            label: 'Clock to draw',
            timeLabel: '8:23 a.m.',
            blankTimeLabel: 'Draw hands for 8:23 a.m.',
            caption: 'Minute hand at 23; hour hand a little past 8.'
          }
        ],
        points: [{ label: '8:23', minute: 23, detail: 'Mrs. Barnes' }],
        jumps: [
          { label: '4 fives = 20', fromMinute: 0, toMinute: 20 },
          { label: '+3 ones', fromMinute: 20, toMinute: 23 }
        ],
        blankNote: 'Count 5, 10, 15, 20, then three more one-minute ticks to find 23.',
        solvedNote: '8:23 is 23 minutes after 8:00, so the minute hand is at 23 and the hour hand is a little past 8.',
        solvedAnswer: 'Hands on the clock drawn to show 8:23 a.m.',
        equations: ['4 x 5 = 20', '20 + 3 = 23', '8:00 + 23 min = 8:23'],
        blankWorkspaceLabel: 'Locate 23 minutes on the line before drawing the clock hands.',
        meaning: 'Mrs. Barnes starts teaching 23 minutes after 8:00 a.m.',
        explanation: 'The exact minute comes from four groups of five minutes and three extra minutes.',
        checks: [
          'The five-minute benchmark is 20.',
          'Three one-minute ticks are counted after 20.',
          'The final time is 8:23 a.m.'
        ]
      }),
      timeLineProblem({
        number: 4,
        sourcePrompt: 'The clock shows what time Rebecca finishes her homework. What time does Rebecca finish her homework?',
        startLabel: '5:00',
        endLabel: '6:00',
        tickLabels: exactMinuteTicks,
        clocks: [
          {
            label: 'Source clock',
            timeLabel: '5:27',
            blankTimeLabel: '5:27',
            showInBlank: true,
            caption: 'Read the source clock: 27 minutes after 5.'
          }
        ],
        points: [{ label: '5:27', minute: 27, detail: 'Rebecca' }],
        jumps: [
          { label: '5 fives = 25', fromMinute: 0, toMinute: 25 },
          { label: '+2 ones', fromMinute: 25, toMinute: 27 }
        ],
        blankNote: 'Read the clock by counting fives to the nearest benchmark and ones to the exact minute.',
        solvedNote: 'The clock reads 5:27: five groups of five minutes make 25, then two more minutes make 27.',
        solvedAnswer: 'Rebecca finishes her homework at 5:27.',
        equations: ['5 x 5 = 25', '25 + 2 = 27', 'Rebecca finishes at 5:27'],
        blankWorkspaceLabel: 'Use fives and ones to translate the clock hands into an exact time.',
        meaning: 'The answer names Rebecca\'s homework finish time.',
        explanation: 'The minute hand is two minutes after the 25-minute benchmark, so the time is 5:27.',
        checks: [
          'The answer is not rounded to 5:25 or 5:30.',
          'The exact minute 27 is shown.',
          'The final sentence answers Rebecca\'s finish-time question.'
        ]
      }),
      timeLineProblem({
        number: 5,
        sourcePrompt: 'The clock shows what time Mason\'s mom drops him off for practice. a. What time does Mason\'s mom drop him off? b. Mason\'s coach arrives 11 minutes before Mason\'s mom drops him off. What time does Mason\'s coach arrive?',
        startLabel: '3:00',
        endLabel: '4:00',
        tickLabels: exactMinuteTicks,
        clocks: [
          {
            label: 'Source clock',
            timeLabel: '3:56',
            blankTimeLabel: '3:56',
            showInBlank: true,
            caption: 'Read part a from the clock, then count back 11 minutes for part b.'
          }
        ],
        points: [
          { label: 'drop-off', minute: 56, detail: '3:56' },
          { label: 'coach', minute: 45, detail: '3:45' }
        ],
        jumps: [{ label: 'count back 11 min', fromMinute: 56, toMinute: 45 }],
        blankNote: 'First read Mason\'s drop-off time. Then count back 11 minutes on the same hour line.',
        solvedNote: 'Mason is dropped off at 3:56. Counting back 11 minutes lands on 3:45.',
        solvedAnswer: 'Mason is dropped off at 3:56; the coach arrives at 3:45.',
        equations: ['3:56 - 11 min = 3:45', '56 - 11 = 45'],
        blankWorkspaceLabel: 'Mark the drop-off time first, then move backward 11 minutes to find the coach arrival time.',
        meaning: 'The two points show Mason\'s drop-off time and the earlier coach arrival time.',
        explanation: 'This problem extends the clock-reading strategy into a short elapsed-time count-back.',
        checks: [
          'Part a identifies 3:56.',
          'Part b counts back exactly 11 minutes.',
          'The coach time is earlier than the drop-off time.'
        ]
      })
    ]
  }),
  4: lesson({
    lessonNumber: 4,
    title: 'elapsed time within 1 hour',
    concept: 'Elapsed-time problems ask for start time, end time, or the time interval.',
    contrast: 'Identify which part is unknown before counting forward or backward.',
    summary: 'A number line supports elapsed-time addition and subtraction.',
    problems: [
      timeLineProblem({
        number: 1,
        sourcePrompt: 'Use a number line. Cole starts reading at 6:23 p.m. He stops at 6:49 p.m. How many minutes does Cole read?',
        startLabel: '6:00 p.m.',
        endLabel: '7:00 p.m.',
        tickLabels: exactMinuteTicks,
        points: [
          { label: 'start', minute: 23, detail: '6:23' },
          { label: 'stop', minute: 49, detail: '6:49' }
        ],
        jumps: [{ label: '26 min', fromMinute: 23, toMinute: 49 }],
        blankNote: 'Use the source number-line workspace to count from 6:23 to 6:49.',
        solvedNote: 'Counting forward from 6:23 to 6:49 gives 26 elapsed minutes.',
        solvedAnswer: 'Cole reads for 26 minutes.',
        equations: ['49 - 23 = 26', '6:23 p.m. + 26 min = 6:49 p.m.'],
        blankWorkspaceLabel: 'Mark 6:23 and 6:49 on the same hour line, then count the elapsed minutes between them.',
        meaning: 'The elapsed interval is Cole’s reading time.',
        explanation: 'The number line shows the start time, stop time, and the 26 minutes between them.',
        checks: ['Start time is 6:23 p.m.', 'End time is 6:49 p.m.', 'Answer is in minutes.']
      }),
      timeLineProblem({
        number: 2,
        sourcePrompt: 'Use a number line. Natalie finishes piano practice at 2:45 p.m. after practicing for 37 minutes. What time did Natalie\'s practice start?',
        startLabel: '2:00 p.m.',
        endLabel: '3:00 p.m.',
        tickLabels: exactMinuteTicks,
        points: [
          { label: 'start', minute: 8, detail: '2:08' },
          { label: 'finish', minute: 45, detail: '2:45' }
        ],
        jumps: [{ label: '37 min', fromMinute: 45, toMinute: 8 }],
        blankNote: 'The finish time and elapsed time are known. Count back 37 minutes from 2:45.',
        solvedNote: 'Counting back 37 minutes from 2:45 lands on 2:08.',
        solvedAnswer: 'Natalie’s practice started at 2:08 p.m.',
        equations: ['45 - 37 = 8', '2:45 p.m. - 37 min = 2:08 p.m.'],
        blankWorkspaceLabel: 'Mark 2:45, count back 37 minutes, and label the start time.',
        meaning: 'The unknown is Natalie’s start time.',
        explanation: 'The number line counts backward from the known finish time to the start time.',
        checks: ['Finish time is 2:45 p.m.', 'Elapsed time is 37 minutes.', 'Start time is earlier than 2:45.']
      }),
      timeLineProblem({
        number: 3,
        sourcePrompt: 'Use a number line. Genevieve works on her scrapbook from 11:27 a.m. to 11:58 a.m. How many minutes does she work on her scrapbook?',
        startLabel: '11:00 a.m.',
        endLabel: '12:00 p.m.',
        tickLabels: exactMinuteTicks,
        points: [
          { label: 'start', minute: 27, detail: '11:27' },
          { label: 'stop', minute: 58, detail: '11:58' }
        ],
        jumps: [{ label: '31 min', fromMinute: 27, toMinute: 58 }],
        blankNote: 'Use the source number-line workspace to count from 11:27 to 11:58.',
        solvedNote: 'Counting forward from 11:27 to 11:58 gives 31 elapsed minutes.',
        solvedAnswer: 'Genevieve works on her scrapbook for 31 minutes.',
        equations: ['58 - 27 = 31', '11:27 a.m. + 31 min = 11:58 a.m.'],
        blankWorkspaceLabel: 'Mark 11:27 and 11:58, then count the elapsed minutes between them.',
        meaning: 'The elapsed interval is Genevieve’s scrapbook time.',
        explanation: 'The number line shows 31 minutes from the start time to the stop time.',
        checks: ['Start time is 11:27 a.m.', 'End time is 11:58 a.m.', 'Answer is in minutes.']
      }),
      timeLineProblem({
        number: 4,
        sourcePrompt: 'Use a number line. Nate finishes his homework at 4:47 p.m. after working on it for 38 minutes. What time did Nate start his homework?',
        startLabel: '4:00 p.m.',
        endLabel: '5:00 p.m.',
        tickLabels: exactMinuteTicks,
        points: [
          { label: 'start', minute: 9, detail: '4:09' },
          { label: 'finish', minute: 47, detail: '4:47' }
        ],
        jumps: [{ label: '38 min', fromMinute: 47, toMinute: 9 }],
        blankNote: 'The finish time and elapsed time are known. Count back 38 minutes from 4:47.',
        solvedNote: 'Counting back 38 minutes from 4:47 lands on 4:09.',
        solvedAnswer: 'Nate started his homework at 4:09 p.m.',
        equations: ['47 - 38 = 9', '4:47 p.m. - 38 min = 4:09 p.m.'],
        blankWorkspaceLabel: 'Mark 4:47, count back 38 minutes, and label Nate’s start time.',
        meaning: 'The unknown is Nate’s homework start time.',
        explanation: 'The number line counts backward from the known finish time to the start time.',
        checks: ['Finish time is 4:47 p.m.', 'Elapsed time is 38 minutes.', 'Start time is earlier than 4:47.']
      }),
      timeLineProblem({
        number: 5,
        sourcePrompt: 'Use a number line. Andrea goes fishing at 9:03 a.m. She fishes for 49 minutes. What time is Andrea done fishing?',
        startLabel: '9:00 a.m.',
        endLabel: '10:00 a.m.',
        tickLabels: exactMinuteTicks,
        points: [
          { label: 'start', minute: 3, detail: '9:03' },
          { label: 'done', minute: 52, detail: '9:52' }
        ],
        jumps: [{ label: '49 min', fromMinute: 3, toMinute: 52 }],
        blankNote: 'The start time and elapsed time are known. Count forward 49 minutes from 9:03.',
        solvedNote: 'Counting forward 49 minutes from 9:03 lands on 9:52.',
        solvedAnswer: 'Andrea is done fishing at 9:52 a.m.',
        equations: ['3 + 49 = 52', '9:03 a.m. + 49 min = 9:52 a.m.'],
        blankWorkspaceLabel: 'Mark 9:03, count forward 49 minutes, and label the ending time.',
        meaning: 'The unknown is Andrea’s ending time.',
        explanation: 'The number line counts forward from the start time to the done time.',
        checks: ['Start time is 9:03 a.m.', 'Elapsed time is 49 minutes.', 'End time is after 9:03.']
      }),
      timeLineProblem({
        number: 6,
        sourcePrompt: 'Dion walks to school. The clocks below show when he leaves his house and when he arrives at school. How many minutes does it take Dion to walk to school?',
        startLabel: '7:00',
        endLabel: '8:00',
        tickLabels: exactMinuteTicks,
        clocks: [
          { label: 'Dion leaves his house', timeLabel: '7:35', blankTimeLabel: '7:35', showInBlank: true, caption: 'Source clock: Dion leaves.' },
          { label: 'Dion arrives at school', timeLabel: '7:54', blankTimeLabel: '7:54', showInBlank: true, caption: 'Source clock: Dion arrives.' }
        ],
        points: [
          { label: 'leave', minute: 35, detail: '7:35' },
          { label: 'arrive', minute: 54, detail: '7:54' }
        ],
        jumps: [{ label: '19 min', fromMinute: 35, toMinute: 54 }],
        blankNote: 'Read both source clocks, then count the minutes from the leave time to the arrival time.',
        solvedNote: 'Dion leaves at 7:35 and arrives at 7:54. The elapsed time is 19 minutes.',
        solvedAnswer: 'Dion takes 19 minutes to walk to school.',
        equations: ['54 - 35 = 19', '7:35 + 19 min = 7:54'],
        blankWorkspaceLabel: 'Read the two clocks first, then count from the leave time to the arrival time.',
        meaning: 'The elapsed interval is Dion’s walking time.',
        explanation: 'The clock pair gives the start and end times; the number line shows the 19-minute walk.',
        checks: ['Leave clock is 7:35.', 'Arrival clock is 7:54.', 'Answer is 19 minutes.']
      }),
      timeLineProblem({
        number: 7,
        sourcePrompt: 'Sydney cleans her room for 45 minutes. She starts at 11:13 a.m. What time does Sydney finish cleaning her room?',
        startLabel: '11:00 a.m.',
        endLabel: '12:00 p.m.',
        tickLabels: exactMinuteTicks,
        points: [
          { label: 'start', minute: 13, detail: '11:13' },
          { label: 'finish', minute: 58, detail: '11:58' }
        ],
        jumps: [{ label: '45 min', fromMinute: 13, toMinute: 58 }],
        blankNote: 'The start time and elapsed time are known. Count forward 45 minutes from 11:13.',
        solvedNote: 'Counting forward 45 minutes from 11:13 lands on 11:58.',
        solvedAnswer: 'Sydney finishes cleaning her room at 11:58 a.m.',
        equations: ['13 + 45 = 58', '11:13 a.m. + 45 min = 11:58 a.m.'],
        blankWorkspaceLabel: 'Mark 11:13, count forward 45 minutes, and label the finish time.',
        meaning: 'The unknown is Sydney’s finish time.',
        explanation: 'The number line counts forward from the known start time to the ending time.',
        checks: ['Start time is 11:13 a.m.', 'Elapsed time is 45 minutes.', 'Finish time is after 11:13.']
      }),
      timeLineProblem({
        number: 8,
        sourcePrompt: 'The third-grade chorus performs a musical for the school. The musical lasts 42 minutes. It ends at 1:59 p.m. What time did the musical start?',
        startLabel: '1:00 p.m.',
        endLabel: '2:00 p.m.',
        tickLabels: exactMinuteTicks,
        points: [
          { label: 'start', minute: 17, detail: '1:17' },
          { label: 'end', minute: 59, detail: '1:59' }
        ],
        jumps: [{ label: '42 min', fromMinute: 59, toMinute: 17 }],
        blankNote: 'The end time and elapsed time are known. Count back 42 minutes from 1:59.',
        solvedNote: 'Counting back 42 minutes from 1:59 lands on 1:17.',
        solvedAnswer: 'The musical started at 1:17 p.m.',
        equations: ['59 - 42 = 17', '1:59 p.m. - 42 min = 1:17 p.m.'],
        blankWorkspaceLabel: 'Mark 1:59, count back 42 minutes, and label the start time.',
        meaning: 'The unknown is the musical start time.',
        explanation: 'The number line counts backward from the known ending time to the start time.',
        checks: ['End time is 1:59 p.m.', 'Elapsed time is 42 minutes.', 'Start time is earlier than 1:59.']
      })
    ]
  }),
  5: lesson({
    lessonNumber: 5,
    title: 'add and subtract time intervals',
    concept: 'Time intervals can be totaled, compared, or used to find a missing part.',
    contrast: 'Use addition for total time and subtraction for missing or comparison time.',
    summary: 'Time interval stories use the same part-whole logic as other measurement stories.',
    problems: [
      timeLineProblem({
        number: 1,
        sourcePrompt: 'Cole read his book for 25 minutes yesterday and for 28 minutes today. How many minutes did Cole read altogether? Model the problem on the number line, and write an equation to solve.',
        startLabel: '0 minutes',
        endLabel: '60 minutes',
        points: [
          { label: 'yesterday', minute: 25, detail: '25 min', open: true },
          { label: 'total', minute: 53, detail: '53 min' }
        ],
        jumps: [
          { label: '25 min', fromMinute: 0, toMinute: 25 },
          { label: '+28 min', fromMinute: 25, toMinute: 53 }
        ],
        blankNote: 'Use the source 0-60 minute line. Mark 25 minutes first, then add today\'s 28 minutes.',
        solvedNote: 'The two reading intervals land at 53 minutes altogether.',
        solvedAnswer: 'Cole read for 53 minutes.',
        equations: ['25 + 28 = 53'],
        blankWorkspaceLabel: 'Model 25 minutes and 28 more minutes on the number line, then write the addition equation.',
        meaning: 'The total point shows how many minutes Cole read across both days.',
        explanation: 'Start at 0, move 25 minutes for yesterday, then move 28 more minutes for today. The endpoint is 53 minutes.',
        checks: [
          'Both official intervals, 25 and 28 minutes, are used.',
          'The movement is addition because the question asks altogether.',
          'The final answer is labeled minutes.'
        ]
      }),
      timeLineProblem({
        number: 2,
        sourcePrompt: 'Tessa spends 34 minutes washing her dog. It takes her 12 minutes to shampoo and rinse and the rest of the time to get the dog in the bathtub! How many minutes does Tessa spend getting her dog in the bathtub? Draw a number line to model the problem, and write an equation to solve.',
        startLabel: '0 minutes',
        endLabel: '60 minutes',
        points: [
          { label: 'bathtub', minute: 22, detail: '22 min' },
          { label: 'total', minute: 34, detail: '34 min', open: true }
        ],
        jumps: [
          { label: 'unknown', fromMinute: 0, toMinute: 22 },
          { label: '+12 min', fromMinute: 22, toMinute: 34 }
        ],
        blankNote: 'The total is 34 minutes. The known shampoo-and-rinse part is 12 minutes; the missing first part ends at 22.',
        solvedNote: '34 minutes total minus 12 known minutes leaves 22 minutes.',
        solvedAnswer: 'She spends 22 minutes getting the dog in the bathtub.',
        equations: ['34 - 12 = 22'],
        blankWorkspaceLabel: 'Show the 34-minute total and separate the 12-minute known part from the unknown bathtub time.',
        meaning: 'The 22-minute point is the missing part of the washing time.',
        explanation: 'Subtract the known shampoo-and-rinse time from the total washing time: 34 - 12 = 22.',
        checks: [
          'The total time is 34 minutes.',
          'The known part is 12 minutes.',
          'The unknown part plus 12 minutes returns to 34 minutes.'
        ]
      }),
      timeLineProblem({
        number: 3,
        sourcePrompt: 'Tessa walks her dog for 47 minutes. Jeremiah walks his dog for 30 minutes. How many more minutes does Tessa walk her dog than Jeremiah?',
        startLabel: '0 minutes',
        endLabel: '60 minutes',
        points: [
          { label: 'Jeremiah', minute: 30, detail: '30 min', open: true },
          { label: 'Tessa', minute: 47, detail: '47 min', open: true }
        ],
        jumps: [{ label: '17 more', fromMinute: 30, toMinute: 47 }],
        blankNote: 'Plot both walking times on the same minute line. The distance between the points is the comparison difference.',
        solvedNote: 'The gap from 30 minutes to 47 minutes is 17 minutes.',
        solvedAnswer: 'Tessa walks 17 more minutes.',
        equations: ['47 - 30 = 17'],
        blankWorkspaceLabel: 'Model the two walking times and mark the gap between Jeremiah\'s 30 minutes and Tessa\'s 47 minutes.',
        meaning: 'The jump between the two points shows how many more minutes Tessa walks.',
        explanation: 'A comparison problem asks for the distance between the two times: 47 - 30 = 17.',
        checks: [
          'Jeremiah is plotted at 30 minutes.',
          'Tessa is plotted at 47 minutes.',
          'The answer is the gap, not the total of both walks.'
        ]
      }),
      timeLineProblem({
        number: 4,
        sourcePrompt: 'a. It takes Austin 4 minutes to take out the garbage, 12 minutes to wash the dishes, and 13 minutes to mop the kitchen floor. How long does it take Austin to do his chores? b. Austin\'s bus arrives at 7:55 a.m. If he starts his chores at 7:30 a.m., will he be done in time to meet his bus? Explain your reasoning.',
        startLabel: '7:30 a.m.',
        endLabel: '8:00 a.m.',
        displayEndMinute: 30,
        tickLabels: ['0', '5', '10', '15', '20', '25', '30'],
        points: [
          { label: 'bus', minute: 25, detail: '7:55', open: true },
          { label: 'finish', minute: 29, detail: '7:59' }
        ],
        jumps: [
          { label: '4 + 12 + 13 = 29', fromMinute: 0, toMinute: 29 },
          { label: '4 min late', fromMinute: 25, toMinute: 29 }
        ],
        blankNote: 'Start at 7:30. Add Austin\'s three chore intervals, then compare the finish point with the 7:55 bus point.',
        solvedNote: 'Chores take 29 minutes, so Austin finishes at 7:59, which is 4 minutes after the bus arrives.',
        solvedAnswer: 'a. 29 minutes. b. No; Austin will be 4 minutes late.',
        equations: ['4 + 12 + 13 = 29', '7:30 + 29 minutes = 7:59'],
        blankWorkspaceLabel: 'Use the line as minutes after 7:30. Mark the bus at 25 minutes and Austin\'s finish time at 29 minutes.',
        meaning: 'The bus and finish points show whether Austin is done before 7:55.',
        explanation: 'Austin needs 29 minutes after 7:30, so he finishes at 7:59. That is 4 minutes after 7:55.',
        checks: [
          'The three chore intervals add to 29 minutes.',
          'The bus is 25 minutes after 7:30.',
          'The finish point is after the bus point.'
        ]
      }),
      timeLineProblem({
        number: 5,
        sourcePrompt: 'Gilberto\'s cat sleeps in the sun for 23 minutes. It wakes up at the time shown on the clock below. What time did the cat go to sleep?',
        startLabel: '11:00',
        endLabel: '12:00',
        clocks: [
          {
            label: 'Source wake-up clock',
            timeLabel: '11:36',
            blankTimeLabel: '11:36',
            showInBlank: true,
            caption: 'The source clock shows when Gilberto\'s cat wakes up.'
          }
        ],
        points: [
          { label: 'sleep start', minute: 13, detail: '11:13' },
          { label: 'wake', minute: 36, detail: '11:36', open: true }
        ],
        jumps: [{ label: 'count back 23 min', fromMinute: 36, toMinute: 13 }],
        blankNote: 'Read the source wake-up clock, then count back 23 minutes on the same hour line.',
        solvedNote: 'The answer key gives 11:13, so the source wake-up clock is 23 minutes later.',
        solvedAnswer: 'Gilberto\'s cat went to sleep at 11:13.',
        equations: ['11:36 - 23 minutes = 11:13'],
        blankWorkspaceLabel: 'Mark the wake-up time from the official clock, then move backward 23 minutes to find when the cat went to sleep.',
        meaning: 'The start point is 23 minutes before the wake-up time.',
        explanation: 'Counting back from 11:36 by 23 minutes lands on 11:13.',
        checks: [
          'The interval is 23 minutes.',
          'The count moves backward because the start time is unknown.',
          'The final time matches the Teacher Edition answer key.'
        ]
      })
    ]
  }),
  6: lesson({
    lessonNumber: 6,
    title: 'kilograms decompose into grams',
    concept: 'Metric mass units follow base-ten structure: 1 kg = 1,000 g, 100 g = ten 10 g, and 10 g = ten 1 g.',
    contrast: 'Explain every decomposition as ten equal smaller units.',
    summary: 'Kilograms and grams mirror thousands, hundreds, tens, and ones.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Illustrate and describe making a 1-kilogram weight.', solvedAnswer: 'Illustrations and descriptions will vary. A valid model shows that a 1-kilogram weight is 1,000 grams.', equations: ['1 kg = 1,000 g'], dataDisplay: dataTable('Mass equivalence', ['Unit', 'Equivalent'], [['1 kilogram', '1,000 grams']]) }),
      problem({ number: 2, sourcePrompt: 'Illustrate and describe decomposing 1 kilogram into groups of 100 grams.', solvedAnswer: 'Illustrations and descriptions will vary. A valid model shows 1 kilogram decomposed into ten 100-gram groups.', equations: ['1,000 g = 10 x 100 g'], knownTotal: 10, knownGroupSize: 1, quotient: 10, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({ number: 3, sourcePrompt: 'Illustrate and describe decomposing 100 grams into groups of 10 grams.', solvedAnswer: 'Illustrations and descriptions will vary. A valid model shows 100 grams decomposed into ten 10-gram groups.', equations: ['100 g = 10 x 10 g'], knownTotal: 10, knownGroupSize: 1, quotient: 10, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({ number: 4, sourcePrompt: 'Illustrate and describe decomposing 10 grams into groups of 1 gram.', solvedAnswer: 'Illustrations and descriptions will vary. A valid model shows 10 grams decomposed into ten 1-gram groups.', equations: ['10 g = 10 x 1 g'], knownTotal: 10, knownGroupSize: 1, quotient: 10, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({
        number: 5,
        sourcePrompt: 'Compare the two place value charts below. How does today\'s exploration using kilograms and grams relate to your understanding of place value?',
        solvedAnswer: 'Answers will vary. A strong response explains that each mass unit is 10 times the unit to its right, just as each place value is 10 times the place to its right.',
        equations: ['1 kg = 10 x 100 g', '100 g = 10 x 10 g', '10 g = 10 x 1 g'],
        dataDisplay: dataTable('Source comparison charts', ['Chart', 'Column 1', 'Column 2', 'Column 3', 'Column 4'], [
          ['Metric mass', '1 kilogram', '100 grams', '10 grams', '1 gram'],
          ['Place value', 'Thousands', 'Hundreds', 'Tens', 'Ones']
        ]),
        solvedDataDisplay: dataTable('Sample comparison', ['Metric mass idea', 'Place value idea'], [
          ['1 kilogram is made from ten 100-gram groups', '1 thousand is made from ten hundreds'],
          ['100 grams is made from ten 10-gram groups', '1 hundred is made from ten tens'],
          ['10 grams is made from ten 1-gram groups', '1 ten is made from ten ones']
        ])
      })
    ]
  }),
  7: lesson({
    lessonNumber: 7,
    title: 'estimate weights with benchmarks',
    concept: 'Use benchmark weights to decide whether grams or kilograms are reasonable.',
    contrast: 'Light objects use grams; heavier familiar objects use kilograms.',
    summary: 'A benchmark estimate should be checked against an actual scale weight.',
    problems: [
      problem({
        number: 1,
        sourcePrompt: 'A-D. Work with a partner. Use the corresponding weights to estimate the weight of objects in the classroom. Then, check your estimate by weighing on a scale.',
        solvedAnswer: 'Objects and weights will vary. A correct response records classroom objects and actual weights for about 1 kilogram, 100 grams, 10 grams, and 1 gram.',
        dataDisplay: dataTable('Source benchmark tables', ['Part', 'Objects to estimate', 'Actual weight'], [
          ['A', 'Objects that weigh about 1 kilogram', '3 blank rows'],
          ['B', 'Objects that weigh about 100 grams', '3 blank rows'],
          ['C', 'Objects that weigh about 10 grams', '3 blank rows'],
          ['D', 'Objects that weigh about 1 gram', '3 blank rows']
        ]),
        solvedDataDisplay: checkTable('Benchmark estimates checked', [['1 kg benchmark', 'Reasonable classroom object named; actual weight checked with kilograms or grams.'], ['100 g benchmark', 'Reasonable classroom object named; actual weight checked in grams.'], ['10 g benchmark', 'Reasonable classroom object named; actual weight checked in grams.'], ['1 g benchmark', 'Reasonable classroom object named; actual weight checked in grams.']])
      }),
      problem({
        number: 2,
        sourcePrompt: 'E. Circle the correct unit of weight for each estimation.',
        solvedAnswer: 'Cereal grams; watermelon kilograms; postcard grams; cat kilograms; bicycle kilograms; lemon grams.',
        equations: ['350 g', '3 kg', '6 g', '4 kg', '15 kg', '58 g'],
        dataDisplay: dataTable('Reasonable units', ['Source item', 'Unit options'], [
          ['A box of cereal weighs about 350', 'grams / kilograms'],
          ['A watermelon weighs about 3', 'grams / kilograms'],
          ['A postcard weighs about 6', 'grams / kilograms'],
          ['A cat weighs about 4', 'grams / kilograms'],
          ['A bicycle weighs about 15', 'grams / kilograms'],
          ['A lemon weighs about 58', 'grams / kilograms']
        ]),
        solvedDataDisplay: dataTable('Reasonable units checked', ['Object', 'Correct unit'], [
          ['Cereal', 'grams'],
          ['Watermelon', 'kilograms'],
          ['Postcard', 'grams'],
          ['Cat', 'kilograms'],
          ['Bicycle', 'kilograms'],
          ['Lemon', 'grams']
        ])
      }),
      problem({ number: 3, sourcePrompt: 'F. During the exploration, Derrick finds that his bottle of water weighs the same as a 1-kilogram bag of rice. He then exclaims, "Our class laptop weighs the same as 2 bottles of water!" How much does the laptop weigh in kilograms? Explain your reasoning.', solvedAnswer: 'The laptop weighs 2 kilograms since 1 bottle of water weighs about 1 kilogram.', equations: ['1 kg + 1 kg = 2 kg'], knownTotal: 2, knownGroupCount: 2, knownGroupSize: 1, quotient: 2, unitLabel: 'kg', blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 4, sourcePrompt: 'G. Nessa tells her brother that 1 kilogram of rice weighs the same as 10 bags containing 100 grams of beans each. Do you agree with her? Explain why or why not.', solvedAnswer: 'Yes. Ten units of 100 grams equal 1,000 grams, which is the same as 1 kilogram.', equations: ['10 x 100 g = 1,000 g', '1,000 g = 1 kg'], knownTotal: 10, knownGroupSize: 1, quotient: 10, blankVisualType: 'bar-units', animationType: 'grouping-by-size' })
    ]
  }),
  8: lesson({
    lessonNumber: 8,
    title: 'metric weight word problems',
    concept: 'Use scale readings, tape diagrams, and operation meanings to solve weight problems.',
    contrast: 'Estimate first, then verify the exact answer is reasonable.',
    summary: 'Metric weight problems use addition, subtraction, multiplication, and division in context.',
    problems: [
      problem({
        number: 1,
        sourcePrompt: 'Tim goes to the market to buy fruits and vegetables. He weighs some string beans and some grapes. List the weights for both the string beans and grapes.',
        solvedAnswer: 'The string beans weigh 464 grams. The grapes weigh 355 grams.',
        equations: ['string beans = 464 g', 'grapes = 355 g'],
        dataDisplay: dataTable('Teacher Edition scale readings', ['Item', 'Weight to list'], [['String beans', '____ grams'], ['Grapes', '____ grams']]),
        solvedDataDisplay: dataTable('Scale readings', ['Item', 'Weight'], [['String beans', '464 grams'], ['Grapes', '355 grams']])
      }),
      problem({ number: 2, sourcePrompt: 'Use tape diagrams to model the following problems. Keiko and her brother Jiro get weighed at the doctor\'s office. Keiko weighs 35 kilograms, and Jiro weighs 43 kilograms. a. What is Keiko and Jiro\'s total weight? b. How much heavier is Jiro than Keiko?', solvedAnswer: 'a. Keiko and Jiro weigh 78 kilograms altogether. b. Jiro is 8 kilograms heavier than Keiko.', equations: ['35 + 43 = 78 kg', '43 - 35 = 8 kg'], quotient: 78, unitLabel: 'kg', blankVisualType: 'tape-diagram', animationType: 'tape-split', knownTotal: 78, knownGroupCount: 2, shareLabels: ['Keiko', 'Jiro'] }),
      problem({ number: 3, sourcePrompt: 'Jared estimates that his houseplant is as heavy as a 5-kilogram bowling ball. Draw a tape diagram to estimate the weight of 3 houseplants.', solvedAnswer: 'A correct tape diagram shows 3 equal houseplant units of about 5 kilograms each. The 3 houseplants weigh about 15 kilograms.', equations: ['3 x 5 kg = 15 kg'], knownTotal: 15, knownGroupCount: 3, knownGroupSize: 5, quotient: 3, unitLabel: 'kg', blankVisualType: 'tape-diagram', animationType: 'grouping-by-size' }),
      problem({ number: 4, sourcePrompt: 'Jane and her 8 friends go apple picking. They share what they pick equally. The total weight is 27 kg. a. About how many kilograms of apples will Jane take home? b. Jane estimates that a pumpkin weighs about as much as her share of the apples. About how much do 7 pumpkins weigh altogether?', solvedAnswer: 'a. Jane takes home about 3 kilograms of apples. b. Seven pumpkins weigh about 21 kilograms altogether.', equations: ['Jane + 8 friends = 9 people', '27 kg divided by 9 = 3 kg', '7 x 3 kg = 21 kg'], knownTotal: 27, knownGroupCount: 9, knownGroupSize: 3, quotient: 3, unitLabel: 'kg', blankVisualType: 'tape-diagram', animationType: 'two-step-model' })
    ]
  }),
  9: lesson({
    lessonNumber: 9,
    title: 'liters decompose into milliliters',
    concept: 'Capacity units decompose by powers of ten, parallel to mass units.',
    contrast: 'Use 1 L = 1,000 mL and 1 kg = 1,000 g as matching base-ten structures.',
    summary: 'A liter can be decomposed into 100 mL, 10 mL, and 1 mL units.',
    problems: [
      problem({
        number: 1,
        sourcePrompt: 'Part 1. a. Predict whether each container holds less than, more than, or about the same as 1 liter. After measuring, record the actual results. b. What surprised you after measuring? Why?',
        solvedAnswer: 'a. Predictions and actual measurements will vary. b. A complete response explains one surprise using the measured results.',
        dataDisplay: dataTable('Part 1a liter estimates', ['Container', 'Prediction', 'Actual'], [['1', 'less than / more than / about 1 L', '____'], ['2', 'less than / more than / about 1 L', '____'], ['3', 'less than / more than / about 1 L', '____'], ['4', 'less than / more than / about 1 L', '____']]),
        solvedDataDisplay: checkTable('Part 1a-b checked', [['Container 1', 'Prediction is marked less than, more than, or about 1 liter; actual measured result is recorded.'], ['Container 2', 'Prediction is marked less than, more than, or about 1 liter; actual measured result is recorded.'], ['Container 3', 'Prediction is marked less than, more than, or about 1 liter; actual measured result is recorded.'], ['Container 4', 'Prediction is marked less than, more than, or about 1 liter; actual measured result is recorded.'], ['Part 1b', 'A written response tells what surprised the student and why.']])
      }),
      problem({ number: 2, sourcePrompt: 'Part 2c. Illustrate and describe the process of decomposing 1 liter of water into 10 smaller units.', solvedAnswer: 'c. A correct illustration shows 1 liter split into 10 equal units of 100 milliliters each.', equations: ['1 L = 1,000 mL', '1,000 mL = 10 x 100 mL'], knownTotal: 10, knownGroupSize: 1, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({ number: 3, sourcePrompt: 'Part 2d-e. Illustrate and describe the process of decomposing Cup K into 10 smaller units, then decomposing Cup L into 10 smaller units.', solvedAnswer: 'd-e. Answers will vary with the measured capacities of Cups K and L. Each illustration should split the cup capacity into 10 equal smaller units.', equations: ['Cup K capacity divided by 10 = one smaller unit', 'Cup L capacity divided by 10 = one smaller unit'], knownTotal: 10, knownGroupSize: 1, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({ number: 4, sourcePrompt: 'Part 2f. What is the same about decomposing 1 liter into milliliters and decomposing 1 kilogram into grams?', solvedAnswer: 'f. They both break apart into 1 thousand units. 1 liter is 1,000 milliliters, and 1 kilogram is 1,000 grams.', equations: ['1 L = 1,000 mL', '1 kg = 1,000 g'], dataDisplay: dataTable('Base-ten decompositions', ['Whole', 'Small units'], [['1 liter', '1,000 milliliters'], ['1 kilogram', '1,000 grams']]) }),
      problem({ number: 5, sourcePrompt: 'Part 2g. One liter of water weighs 1 kilogram. How much does 1 milliliter of water weigh? Explain how you know.', solvedAnswer: 'g. One milliliter of water weighs 1 gram because 1 liter and 1 kilogram each decompose into 1,000 equal smaller units.', equations: ['1 L = 1,000 mL', '1 kg = 1,000 g', '1 mL of water = 1 g'], quotient: 1, unitLabel: 'gram' })
    ]
  }),
  10: lesson({
    lessonNumber: 10,
    title: 'liquid volume on a vertical number line',
    concept: 'A marked container is a vertical number line for liters and milliliters.',
    contrast: 'Use equal intervals and halfway marks to read or estimate volume.',
    summary: 'Liquid volume can be read, estimated, compared, and subtracted on a vertical scale.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Label the vertical number line on the container to the right. a. What did you label as the halfway mark? Why? b. Explain how pouring each plastic cup of water helped you create a vertical number line. c. If you pour out 300 mL of water, how many mL are left in the container?', solvedAnswer: 'The container number line is labeled by hundreds from 0 mL to 1,000 mL. a. The halfway mark is 500 mL because it is halfway between 0 and 1,000. b. Each plastic cup adds one equal 100 mL interval. c. 700 mL are left.', equations: ['1,000 mL - 300 mL = 700 mL'], numberLineModels: [numberLine('container scale', ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1,000'], [7])] }),
      problem({
        number: 2,
        sourcePrompt: 'Read how much liquid is in each container.',
        solvedAnswer: 'Container readings are 3 L, 6 L, 4 L, and 0 L.',
        dataDisplay: dataTable('Container readings', ['Container', 'Liquid volume'], [['A', '____ L'], ['B', '____ L'], ['C', '____ L'], ['D', '____ L']]),
        solvedDataDisplay: dataTable('Container readings', ['Container', 'Liquid volume'], [['A', '3 L'], ['B', '6 L'], ['C', '4 L'], ['D', '0 L']])
      }),
      problem({
        number: 3,
        sourcePrompt: 'Estimate each container to the nearest hundred milliliters.',
        solvedAnswer: 'The nearest-hundred estimates are 400 mL, 200 mL, 1,000 mL, and 700 mL.',
        dataDisplay: dataTable('Nearest hundred milliliters', ['Container', 'Rounded volume'], [['A', '____ mL'], ['B', '____ mL'], ['C', '____ mL'], ['D', '____ mL']]),
        solvedDataDisplay: dataTable('Nearest hundred milliliters', ['Container', 'Rounded volume'], [['A', '400 mL'], ['B', '200 mL'], ['C', '1,000 mL'], ['D', '700 mL']])
      }),
      problem({ number: 4, sourcePrompt: 'The chart shows the capacity of 4 barrels: A 75 liters, B 68 liters, C 96 liters, D 52 liters. a. Label the number line to show the capacity of each barrel. Barrel A has been done for you. b. Which barrel has the greatest capacity? c. Which barrel has the smallest capacity? d. Ben buys a barrel that holds about 70 liters. Which barrel did he most likely buy? Explain. e. Use the number line to find how many more liters Barrel C can hold than Barrel B.', solvedAnswer: 'a. A, B, C, and D are plotted at 75 L, 68 L, 96 L, and 52 L. b. Barrel C has the greatest capacity. c. Barrel D has the smallest capacity. d. Barrel B is closest to 70 L; Barrel A is also a reasonable answer if the explanation says it has enough capacity to hold 70 L. e. Barrel C can hold 28 more liters than Barrel B.', equations: ['96 L - 68 L = 28 L'], dataDisplay: dataTable('Barrel capacity', ['Barrel', 'Capacity'], [['A', '75 L'], ['B', '68 L'], ['C', '96 L'], ['D', '52 L']]) })
    ]
  }),
  11: lesson({
    lessonNumber: 11,
    title: 'mixed metric word problems',
    concept: 'When units match, metric stories can use all four operations.',
    contrast: 'Identify total, part, comparison, or equal groups before choosing the operation.',
    summary: 'Model the relationship, compute, and state the unit.',
    problems: [
      problem({ number: 1, sourcePrompt: 'The total weight of a can of tomatoes and a jar of baby food is 671 grams. a. The jar of baby food weighs 113 grams. How much does the can of tomatoes weigh? b. How much more does the can of tomatoes weigh than the jar of baby food?', solvedAnswer: 'a. The can of tomatoes weighs 558 grams. b. The can weighs 445 grams more than the jar.', equations: ['671 - 113 = 558', '558 - 113 = 445'], knownTotal: 671, quotient: 558, unitLabel: 'grams', blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 2, sourcePrompt: 'The weight of a pen is shown to the right. a. What is the total weight of 10 pens? b. An empty box weighs 82 grams. What is the total weight of a box of 10 pens?', solvedAnswer: 'a. Ten pens weigh 60 grams. b. A box with 10 pens weighs 142 grams.', equations: ['10 x 6 = 60', '60 + 82 = 142'], quotient: 142, unitLabel: 'grams' }),
      problem({ number: 3, sourcePrompt: 'The total weight of an apple, lemon, and banana is shown to the right. a. If the apple and lemon together weigh 317 grams, what is the weight of the banana? b. If the lemon weighs 68 grams less than the banana, how much does the lemon weigh? c. What is the weight of the apple?', solvedAnswer: 'a. The banana weighs 191 grams. b. The lemon weighs 123 grams. c. The apple weighs 194 grams.', equations: ['508 - 317 = 191', '191 - 68 = 123', '317 - 123 = 194'], quotient: 191, unitLabel: 'grams' }),
      problem({ number: 4, sourcePrompt: 'A frozen turkey weighs about 5 kilograms. The chef orders 45 kilograms of turkey. About how many frozen turkeys does he order? Draw and label a tape diagram.', solvedAnswer: 'A correct tape diagram shows 45 kilograms split into 5-kilogram units. The chef orders about 9 frozen turkeys.', equations: ['45 divided by 5 = 9'], quotient: 9, unitLabel: 'turkeys', blankVisualType: 'tape-diagram', animationType: 'grouping-by-size' }),
      problem({ number: 5, sourcePrompt: 'A recipe requires 300 milliliters of milk. Sara triples the recipe. How many milliliters of milk does Sara need?', solvedAnswer: 'Sara needs 900 milliliters of milk.', equations: ['3 x 300 = 900'], quotient: 900, unitLabel: 'milliliters' }),
      problem({ number: 6, sourcePrompt: 'Marian pours a full container of water equally into buckets. Each bucket has a capacity of 4 liters. After filling 3 buckets, she still has 2 liters left in her container. What is the capacity of her container?', solvedAnswer: 'The container holds 14 liters.', equations: ['3 x 4 = 12', '12 + 2 = 14'], quotient: 14, unitLabel: 'liters' })
    ]
  }),
  12: lesson({
    lessonNumber: 12,
    title: 'round two-digit measurements to the nearest ten',
    concept: 'Find the two tens around a measurement and compare the measurement to halfway.',
    contrast: 'Below halfway rounds down; halfway or above rounds up.',
    summary: 'Round a measurement by locating it between tens on a vertical number line.',
    problems: [
      problem({
        number: 1,
        sourcePrompt: 'Work with a partner. Use a ruler or a meter stick to complete the chart. Measure each object, write the two tens it is between, and round to the nearest 10 centimeters.',
        solvedAnswer: 'Measurements and estimates will vary. Each official row needs an actual centimeter measurement, the two surrounding tens, and a nearest-10-centimeter estimate.',
        dataDisplay: dataTable('Length rounding chart', ['Object', 'Measurement', 'Between', 'Estimate'], [['My shoe', '____ cm', '____ and ____ cm', '____ cm'], ['Long side of a desk', '____ cm', '____ and ____ cm', '____ cm'], ['A new pencil', '____ cm', '____ and ____ cm', '____ cm'], ['Short side of a piece of paper', '____ cm', '____ and ____ cm', '____ cm'], ['Long side of a piece of paper', '____ cm', '____ and ____ cm', '____ cm']]),
        solvedDataDisplay: checkTable('Length rounding checked', [['My shoe', 'Actual cm length, surrounding tens, and nearest 10 cm recorded.'], ['Long side of a desk', 'Actual cm length, surrounding tens, and nearest 10 cm recorded.'], ['A new pencil', 'Actual cm length, surrounding tens, and nearest 10 cm recorded.'], ['Short side of a piece of paper', 'Actual cm length, surrounding tens, and nearest 10 cm recorded.'], ['Long side of a piece of paper', 'Actual cm length, surrounding tens, and nearest 10 cm recorded.']])
      }),
      problem({
        number: 2,
        sourcePrompt: 'Work with a partner. Use a digital scale to complete the chart. Weigh each bag of rice, write the two tens it is between, and round to the nearest 10 grams.',
        solvedAnswer: 'Measurements and estimates will vary. Each official bag row needs an actual gram weight, the two surrounding tens, and a nearest-10-gram estimate.',
        dataDisplay: dataTable('Rice-bag rounding chart', ['Bag', 'Measurement', 'Between', 'Estimate'], [['Bag A', '____ g', '____ and ____ g', '____ g'], ['Bag B', '____ g', '____ and ____ g', '____ g'], ['Bag C', '____ g', '____ and ____ g', '____ g'], ['Bag D', '____ g', '____ and ____ g', '____ g'], ['Bag E', '____ g', '____ and ____ g', '____ g']]),
        solvedDataDisplay: checkTable('Weight rounding checked', [['Bag A', 'Actual gram weight, surrounding tens, and nearest 10 g recorded.'], ['Bag B', 'Actual gram weight, surrounding tens, and nearest 10 g recorded.'], ['Bag C', 'Actual gram weight, surrounding tens, and nearest 10 g recorded.'], ['Bag D', 'Actual gram weight, surrounding tens, and nearest 10 g recorded.'], ['Bag E', 'Actual gram weight, surrounding tens, and nearest 10 g recorded.']])
      }),
      problem({
        number: 3,
        sourcePrompt: 'Work with a partner. Use a beaker to complete the chart. Measure each container, write the two tens it is between, and round to the nearest 10 milliliters.',
        solvedAnswer: 'Measurements and estimates will vary. Each official container row needs an actual milliliter amount, the two surrounding tens, and a nearest-10-milliliter estimate.',
        dataDisplay: dataTable('Liquid-volume rounding chart', ['Container', 'Measurement', 'Between', 'Estimate'], [['Container A', '____ mL', '____ and ____ mL', '____ mL'], ['Container B', '____ mL', '____ and ____ mL', '____ mL'], ['Container C', '____ mL', '____ and ____ mL', '____ mL'], ['Container D', '____ mL', '____ and ____ mL', '____ mL'], ['Container E', '____ mL', '____ and ____ mL', '____ mL']]),
        solvedDataDisplay: checkTable('Liquid volume rounding checked', [['Container A', 'Actual mL amount, surrounding tens, and nearest 10 mL recorded.'], ['Container B', 'Actual mL amount, surrounding tens, and nearest 10 mL recorded.'], ['Container C', 'Actual mL amount, surrounding tens, and nearest 10 mL recorded.'], ['Container D', 'Actual mL amount, surrounding tens, and nearest 10 mL recorded.'], ['Container E', 'Actual mL amount, surrounding tens, and nearest 10 mL recorded.']])
      }),
      problem({
        number: 4,
        sourcePrompt: 'Work with a partner. Use a clock to complete the chart. Record the activity time, write the two 10-minute marks it is between, and round to the nearest 10 minutes.',
        solvedAnswer: 'Measurements and estimates will vary. Each official activity row needs an actual clock time, the two surrounding 10-minute marks, and a nearest-10-minute estimate.',
        dataDisplay: dataTable('Time rounding chart', ['Activity', 'Actual time', 'Between', 'Estimate'], [['Time we started math', '____', '____ and ____', '____'], ['Time I started the Problem Set', '____', '____ and ____', '____'], ['Time I finished Station 1', '____', '____ and ____', '____'], ['Time I finished Station 2', '____', '____ and ____', '____'], ['Time I finished Station 3', '____', '____ and ____', '____']]),
        solvedDataDisplay: checkTable('Time rounding checked', [['Time we started math', 'Actual clock time, surrounding 10-minute marks, and nearest 10 minutes recorded.'], ['Time I started the Problem Set', 'Actual clock time, surrounding 10-minute marks, and nearest 10 minutes recorded.'], ['Time I finished Station 1', 'Actual clock time, surrounding 10-minute marks, and nearest 10 minutes recorded.'], ['Time I finished Station 2', 'Actual clock time, surrounding 10-minute marks, and nearest 10 minutes recorded.'], ['Time I finished Station 3', 'Actual clock time, surrounding 10-minute marks, and nearest 10 minutes recorded.']])
      })
    ]
  }),
  13: lesson({
    lessonNumber: 13,
    title: 'round to the nearest ten',
    concept: 'Use a vertical number line to decide whether a number is closer to the lower or upper ten.',
    contrast: 'Halfway and above rounds to the upper ten.',
    summary: 'Locate the number between tens, compare to halfway, and round.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Round to the nearest ten. Use the number line to model your thinking. a. 32. b. 36. c. 62. d. 162. e. 278. f. 405.', solvedAnswer: 'a. 32 rounds to 30. b. 36 rounds to 40. c. 62 rounds to 60. d. 162 rounds to 160. e. 278 rounds to 280. f. 405 rounds to 410. Each answer is modeled on a vertical number line.', equations: ['32 ~= 30', '36 ~= 40', '62 ~= 60', '162 ~= 160', '278 ~= 280', '405 ~= 410'], numberLineModels: [numberLine('nearest ten', tensTicks, [0, 2])] }),
      problem({ number: 2, sourcePrompt: 'Round the weight of each item to the nearest 10 grams. Draw number lines to model your thinking: 36 grams, 52 grams, and 142 grams.', solvedAnswer: 'The rounded weights are 40 grams, 50 grams, and 140 grams. Each row also needs a labeled number line model.', equations: ['36 g ~= 40 g', '52 g ~= 50 g', '142 g ~= 140 g'], numberLineModels: [numberLine('nearest 10 grams', tensTicks, [0, 2])] }),
      problem({ number: 3, sourcePrompt: 'Carl\'s basketball game begins at 3:03 p.m. and ends at 3:51 p.m. a. How many minutes did Carl\'s basketball game last? b. Round the total number of minutes in the game to the nearest 10 minutes.', solvedAnswer: 'a. Carl\'s basketball game lasted 48 minutes. b. 48 minutes rounds to 50 minutes.', equations: ['3:51 - 3:03 = 48', '48 ~= 50'], quotient: 50, unitLabel: 'minutes' })
    ]
  }),
  14: lesson({
    lessonNumber: 14,
    title: 'round to the nearest hundred',
    concept: 'Use lower hundred, halfway, and upper hundred to round.',
    contrast: 'Numbers at halfway or above round to the upper hundred.',
    summary: 'Round to the nearest hundred by comparing to the halfway hundred.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Round to the nearest hundred. Use the number line to model your thinking. a. 143. b. 286. c. 320. d. 1,320. e. 1,572. f. 1,250.', solvedAnswer: 'a. 143 rounds to 100. b. 286 rounds to 300. c. 320 rounds to 300. d. 1,320 rounds to 1,300. e. 1,572 rounds to 1,600. f. 1,250 rounds to 1,300. Each answer is modeled on a vertical number line.', equations: ['143 ~= 100', '286 ~= 300', '320 ~= 300', '1,320 ~= 1,300', '1,572 ~= 1,600', '1,250 ~= 1,300'], numberLineModels: [numberLine('nearest hundred', hundredTicks, [0, 2])] }),
      problem({ number: 2, sourcePrompt: 'Complete the chart. a. Shauna has 480 stickers. Round the number of stickers to the nearest hundred. b. There are 525 pages in a book. Round the number of pages to the nearest hundred. c. A container holds 750 milliliters of water. Round the capacity to the nearest 100 milliliters. d. Glen spends $1,297 on a new computer. Round the amount Glen spends to the nearest $100. e. The drive between two cities is 1,842 kilometers. Round the distance to the nearest 100 kilometers.', solvedAnswer: 'a. 500 stickers. b. 500 pages. c. 800 mL. d. $1,300. e. 1,800 km.', equations: ['480 ~= 500', '525 ~= 500', '750 ~= 800', '1,297 ~= 1,300', '1,842 ~= 1,800'], dataDisplay: dataTable('Nearest hundred chart', ['Source item', 'Rounded answer'], [['480 stickers', '____ stickers'], ['525 pages', '____ pages'], ['750 mL', '____ mL'], ['$1,297', '$____'], ['1,842 km', '____ km']]), solvedDataDisplay: dataTable('Nearest hundred chart', ['Source item', 'Rounded answer'], [['480 stickers', '500 stickers'], ['525 pages', '500 pages'], ['750 mL', '800 mL'], ['$1,297', '$1,300'], ['1,842 km', '1,800 km']]) }),
      problem({ number: 3, sourcePrompt: 'Circle numbers that round to 600: 527, 550, 639, 681, 713, 603.', solvedAnswer: '550, 639, and 603 round to 600.', equations: ['550 ~= 600', '639 ~= 600', '603 ~= 600'], numberLineModels: [numberLine('500 to 700', ['500', '550', '600', '650', '700'], [1, 2])] }),
      problem({ number: 4, sourcePrompt: 'Christian says 1,865 rounds to one thousand, nine hundred; Alexis says 19 hundreds.', solvedAnswer: 'Both are correct: 1,900 is 19 hundreds.', equations: ['1,865 ~= 1,900', '1,900 = 19 hundreds'] })
    ]
  }),
  15: lesson({
    lessonNumber: 15,
    title: 'add measurements composing once',
    concept: 'Add same-unit measurements with mental math or the standard algorithm, composing when needed.',
    contrast: 'Line up units and place values before adding.',
    summary: 'Measurement addition follows place value and keeps units attached.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Find the sums below. Choose mental math or the algorithm.', solvedAnswer: '51 mL, 71 mL, 171 mL, 89 cm, 592 cm, 627 cm, 92 g, 639 g, 956 g, 3 L 657 mL, 5 kg 876 g.', equations: ['46 mL + 5 mL = 51 mL', '46 mL + 25 mL = 71 mL', '46 mL + 125 mL = 171 mL', '59 cm + 30 cm = 89 cm', '509 cm + 83 cm = 592 cm', '597 cm + 30 cm = 627 cm', '29 g + 63 g = 92 g', '345 g + 294 g = 639 g', '480 g + 476 g = 956 g', '1 L 245 mL + 2 L 412 mL = 3 L 657 mL', '2 kg 509 g + 3 kg 367 g = 5 kg 876 g'] }),
      problem({ number: 2, sourcePrompt: 'A pretzel weighs 63 g more than a 44 g popcorn.', solvedAnswer: 'The pretzel weighs 107 grams.', equations: ['44 + 63 = 107'], quotient: 107, unitLabel: 'grams', blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 3, sourcePrompt: 'Jason and Andrea add 475 mL and 317 mL; Jason says 782, Andrea says 792.', solvedAnswer: 'Andrea is correct: 475 + 317 = 792 mL. Jason is 10 mL too low.', equations: ['475 + 317 = 792'], quotient: 792, unitLabel: 'milliliters' }),
      problem({ number: 4, sourcePrompt: 'Greg mows front lawn for 15 minutes and back lawn for 17 more minutes than front.', solvedAnswer: 'Back lawn = 32 minutes; total = 47 minutes.', equations: ['15 + 17 = 32', '15 + 32 = 47'], quotient: 47, unitLabel: 'minutes' })
    ]
  }),
  16: lesson({
    lessonNumber: 16,
    title: 'add measurements composing twice',
    concept: 'Some sums require composing across more than one place.',
    contrast: 'Regroup each place value as needed and keep compound units separate.',
    summary: 'Compose twice when needed, then write the compound measurement accurately.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Find the sums below.', solvedAnswer: '120 mL, 420 mL, 820 mL, 150 cm, 600 cm, 900 cm, 835 g, 942 g, 983 g, 4 L 800 mL, 6 kg 851 g.', equations: ['52 mL + 68 mL = 120 mL', '352 mL + 68 mL = 420 mL', '352 mL + 468 mL = 820 mL', '56 cm + 94 cm = 150 cm', '506 cm + 94 cm = 600 cm', '506 cm + 394 cm = 900 cm', '697 g + 138 g = 835 g', '345 g + 597 g = 942 g', '486 g + 497 g = 983 g', '3 L 251 mL + 1 L 549 mL = 4 L 800 mL', '4 kg 384 g + 2 kg 467 g = 6 kg 851 g'] }),
      problem({ number: 2, sourcePrompt: 'Lane uses 907 g cabbage and 93 g salt.', solvedAnswer: 'Total = 1,000 g, or 1 kg.', equations: ['907 + 93 = 1,000'], quotient: 1000, unitLabel: 'grams', blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 3, sourcePrompt: 'Sue wraps 86 muffins and has 58 left cooling.', solvedAnswer: 'Sue baked 144 muffins.', equations: ['86 + 58 = 144'], quotient: 144, unitLabel: 'muffins' }),
      problem({ number: 4, sourcePrompt: 'Milk carton holds 183 mL more than 279 mL juice box; find total capacity.', solvedAnswer: 'Milk carton = 462 mL; total = 741 mL.', equations: ['279 + 183 = 462', '279 + 462 = 741'], quotient: 741, unitLabel: 'milliliters' })
    ]
  }),
  17: lesson({
    lessonNumber: 17,
    title: 'estimate sums by rounding',
    concept: 'Rounded addends estimate a sum; actual sums validate the estimate.',
    contrast: 'Compare the estimate and actual sum to judge closeness.',
    summary: 'Use rounding to estimate, then exact addition to solve.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Find actual sums, round addends to the nearest hundred, estimate, and circle closest estimates. A: 451 + 253, 451 + 249, 448 + 249. B: 356 + 161, 356 + 148, 347 + 149. C: 652 + 158, 647 + 158, 647 + 146.', solvedAnswer: 'Close estimates include 451 + 249 = 700, 356 + 148 = 504 estimated as 500, and 647 + 158 = 805 estimated as 800.', equations: ['451 + 253 = 704; 500 + 300 = 800', '451 + 249 = 700; 500 + 200 = 700', '448 + 249 = 697; 400 + 200 = 600', '356 + 161 = 517; 400 + 200 = 600', '356 + 148 = 504; 400 + 100 = 500', '347 + 149 = 496; 300 + 100 = 400', '652 + 158 = 810; 700 + 200 = 900', '647 + 158 = 805; 600 + 200 = 800', '647 + 146 = 793; 600 + 100 = 700'] }),
      problem({ number: 2, sourcePrompt: 'Janet watches 94 minutes Friday and 151 minutes Saturday.', solvedAnswer: 'Actual total = 245 minutes; 90 + 150 = 240 is a close estimate.', equations: ['94 + 151 = 245', '90 + 150 = 240'], quotient: 245, unitLabel: 'minutes' }),
      problem({ number: 3, sourcePrompt: 'Sadie weighs 182 kg; her cub weighs 74 kg.', solvedAnswer: 'Actual total = 256 kg; a reasonable estimate is about 260 kg or 300 kg depending on rounding.', equations: ['182 + 74 = 256'], quotient: 256, unitLabel: 'kilograms', blankVisualType: 'tape-diagram', animationType: 'tape-split' })
    ]
  }),
  18: lesson({
    lessonNumber: 18,
    title: 'subtract measurements decomposing once',
    concept: 'Subtract same-unit measurements by decomposing one place when needed.',
    contrast: 'Regroup once only when the minuend digit is too small.',
    summary: 'Decompose, subtract by place value, and keep units attached.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Solve the subtraction problems below.', solvedAnswer: '36 mL, 336 mL, 136 mL, 497 cm, 361 cm, 498 cm, 177 g, 73 g, 75 g, 1 km 315 m, 2 kg 31 g.', equations: ['60 mL - 24 mL = 36 mL', '360 mL - 24 mL = 336 mL', '360 mL - 224 mL = 136 mL', '518 cm - 21 cm = 497 cm', '629 cm - 268 cm = 361 cm', '938 cm - 440 cm = 498 cm', '307 g - 130 g = 177 g', '307 g - 234 g = 73 g', '807 g - 732 g = 75 g', '2 km 770 m - 1 km 455 m = 1 km 315 m', '3 kg 924 g - 1 kg 893 g = 2 kg 31 g'] }),
      problem({ number: 2, sourcePrompt: 'Three books weigh 405 g; two weigh 233 g.', solvedAnswer: 'The third book weighs 172 g.', equations: ['405 - 233 = 172'], quotient: 172, unitLabel: 'grams', blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 3, sourcePrompt: 'Champions is 22 minutes shorter than The Lost Ship at 117 minutes; Magical Forests is 145 minutes.', solvedAnswer: 'Champions = 95 minutes; Magical Forests is 50 minutes longer.', equations: ['117 - 22 = 95', '145 - 95 = 50'], quotient: 95, unitLabel: 'minutes' }),
      problem({ number: 4, sourcePrompt: 'A 208 cm rope is cut into 80 cm, 94 cm, and an unknown third piece.', solvedAnswer: 'The third piece is 34 cm.', equations: ['80 + 94 = 174', '208 - 174 = 34'], quotient: 34, unitLabel: 'centimeters' })
    ]
  }),
  19: lesson({
    lessonNumber: 19,
    title: 'subtract measurements decomposing twice',
    concept: 'Subtraction across zeros can require decomposing twice.',
    contrast: 'Regroup through zeros carefully before subtracting.',
    summary: 'Decompose twice when needed and check the difference.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Solve the subtraction problems below.', solvedAnswer: '280 cm, 80 cm, 365 g, 254 g, 648 mL, 248 mL, 4 km 233 m, 2 L 51 mL.', equations: ['340 cm - 60 cm = 280 cm', '340 cm - 260 cm = 80 cm', '513 g - 148 g = 365 g', '641 g - 387 g = 254 g', '700 mL - 52 mL = 648 mL', '700 mL - 452 mL = 248 mL', '6 km 802 m - 2 km 569 m = 4 km 233 m', '5 L 920 mL - 3 L 869 mL = 2 L 51 mL'] }),
      problem({ number: 2, sourcePrompt: 'David is driving from Los Angeles to San Francisco. The total distance is 617 kilometers. He has 468 kilometers left to drive. How many kilometers has he driven so far?', solvedAnswer: 'David has driven 149 km.', equations: ['617 km - 468 km = 149 km'], quotient: 149, unitLabel: 'kilometers', blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 3, sourcePrompt: 'The piano weighs 289 kilograms more than the piano bench. The piano weighs 297 kilograms. How much does the bench weigh?', solvedAnswer: 'The bench weighs 8 kg.', equations: ['297 kg - 289 kg = 8 kg'], quotient: 8, unitLabel: 'kilograms' }),
      problem({ number: 4, sourcePrompt: 'Tank A holds 165 fewer liters of water than Tank B. Tank B holds 400 liters of water. How much water does Tank A hold?', solvedAnswer: 'Tank A holds 235 L.', equations: ['400 L - 165 L = 235 L'], quotient: 235, unitLabel: 'liters' })
    ]
  }),
  20: lesson({
    lessonNumber: 20,
    title: 'estimate differences by rounding',
    concept: 'Round totals and parts to estimate differences, then subtract exactly.',
    contrast: 'The closest estimate depends on how both numbers round.',
    summary: 'Estimate, solve exactly, and compare for reasonableness.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Find actual differences, round totals and parts to the nearest hundred, estimate, and circle closest estimates. A: 448 - 153, 451 - 153, 448 - 149, 451 - 149. B: 747 - 261, 756 - 261, 747 - 249, 756 - 248.', solvedAnswer: 'Close cases include 451 - 153 = 298 estimated as 300, 448 - 149 = 299 estimated as 300, 756 - 261 = 495 estimated as 500, and 747 - 249 = 498 estimated as 500.', equations: ['448 - 153 = 295; 400 - 200 = 200', '451 - 153 = 298; 500 - 200 = 300', '448 - 149 = 299; 400 - 100 = 300', '451 - 149 = 302; 500 - 100 = 400', '747 - 261 = 486; 700 - 300 = 400', '756 - 261 = 495; 800 - 300 = 500', '747 - 249 = 498; 700 - 200 = 500', '756 - 248 = 508; 800 - 200 = 600'] }),
      problem({ number: 2, sourcePrompt: 'Camden uses a total of 372 liters of gas in two months. He uses 184 liters of gas in the first month. How many liters of gas does he use in the second month?', solvedAnswer: 'Second month = 188 L; estimates will vary.', equations: ['372 L - 184 L = 188 L', '400 L - 200 L = 200 L'], quotient: 188, unitLabel: 'liters', blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 3, sourcePrompt: 'The pear, apple, and peach weigh 500 grams total. The pear and apple together weigh 372 grams. How much does the peach weigh?', solvedAnswer: 'The peach weighs 128 g; estimates and explanations will vary.', equations: ['500 g - 372 g = 128 g', '500 g - 400 g = 100 g'], quotient: 128, unitLabel: 'grams', blankVisualType: 'tape-diagram', animationType: 'tape-split' })
    ]
  }),
  21: lesson({
    lessonNumber: 21,
    title: 'estimate and solve mixed measurement problems',
    concept: 'Mixed problems combine measuring, rounding, addition, subtraction, and reasonableness checks.',
    contrast: 'Use rounded values for estimates and exact values for final answers.',
    summary: 'Round first when asked, then solve exactly and explain reasonableness.',
    problems: [
      problem({
        number: 1,
        sourcePrompt: 'Weigh the bags of beans and rice on the scale. Then, write the weight on the scales below. Estimate and find the total weight and difference, then explain whether the answers are reasonable.',
        solvedAnswer: 'Beans weigh 91 g and rice weighs 58 g. The estimated total is 150 g, the actual total is 149 g, the estimated difference is 30 g, and the actual difference is 33 g.',
        equations: ['91 g + 58 g ~= 90 g + 60 g = 150 g', '91 g + 58 g = 149 g', '91 g - 58 g ~= 90 g - 60 g = 30 g', '91 g - 58 g = 33 g'],
        dataDisplay: dataTable('Beans and rice', ['Item', 'Actual', 'Rounded'], [['Beans', '____ g', '____ g'], ['Rice', '____ g', '____ g'], ['Sum', '____ g', '____ g'], ['Difference', '____ g', '____ g']]),
        solvedDataDisplay: dataTable('Beans and rice', ['Item', 'Actual', 'Rounded'], [['Beans', '91 g', '90 g'], ['Rice', '58 g', '60 g'], ['Sum', '149 g', '150 g'], ['Difference', '33 g', '30 g']])
      }),
      problem({
        number: 2,
        sourcePrompt: 'Measure the lengths of the three pieces of yarn. Estimate and find the total length of Yarn A and Yarn C. Then subtract to estimate and find the difference between that total and Yarn B.',
        solvedAnswer: 'Yarn A is 64 cm, Yarn B is 88 cm, and Yarn C is 38 cm. A + C is 102 cm, estimated as 100 cm. The difference from Yarn B is 14 cm, estimated as 10 cm.',
        equations: ['64 cm ~= 60 cm', '88 cm ~= 90 cm', '38 cm ~= 40 cm', '64 cm + 38 cm = 102 cm', '60 cm + 40 cm = 100 cm', '102 cm - 88 cm = 14 cm', '100 cm - 90 cm = 10 cm'],
        dataDisplay: dataTable('Yarn lengths', ['Yarn', 'Actual', 'Rounded'], [['A', '____ cm', '____ cm'], ['B', '____ cm', '____ cm'], ['C', '____ cm', '____ cm']]),
        solvedDataDisplay: dataTable('Yarn lengths', ['Yarn', 'Actual', 'Rounded'], [['A', '64 cm', '60 cm'], ['B', '88 cm', '90 cm'], ['C', '38 cm', '40 cm'], ['A + C', '102 cm', '100 cm'], ['A + C minus B', '14 cm', '10 cm']])
      }),
      problem({
        number: 3,
        sourcePrompt: 'Plot the amount of liquid in Containers D, E, and F on the number lines. Then, round to the nearest 10 milliliters. Estimate and find the total amount, then estimate and find the difference between Containers D and E.',
        solvedAnswer: 'Container D is 212 mL ≈ 210 mL, Container E is 238 mL ≈ 240 mL, and Container F is 195 mL ≈ 200 mL. The actual total is 645 mL, and D to E differs by 26 mL.',
        equations: ['212 mL ~= 210 mL', '238 mL ~= 240 mL', '195 mL ~= 200 mL', '210 mL + 240 mL + 200 mL = 650 mL', '212 mL + 238 mL + 195 mL = 645 mL', '240 mL - 210 mL = 30 mL', '238 mL - 212 mL = 26 mL'],
        dataDisplay: dataTable('Container rounding', ['Container', 'Actual volume', 'Rounded to nearest 10 mL'], [['D', '____ mL', '____ mL'], ['E', '____ mL', '____ mL'], ['F', '____ mL', '____ mL']]),
        solvedDataDisplay: dataTable('Container rounding', ['Container', 'Actual volume', 'Rounded to nearest 10 mL'], [['D', '212 mL', '210 mL'], ['E', '238 mL', '240 mL'], ['F', '195 mL', '200 mL']])
      }),
      problem({ number: 4, sourcePrompt: 'Shane watches a movie in the theater that is 115 minutes long, including the trailers. The trailer lengths are 5, 4, 3, 5, and 4 minutes.', solvedAnswer: 'Trailers total 21 minutes; movie without trailers is 94 minutes. Estimates will vary.', equations: ['5 min + 4 min + 3 min + 5 min + 4 min = 21 min', '115 min - 21 min = 94 min'], quotient: 94, unitLabel: 'minutes', dataDisplay: dataTable('Trailer lengths', ['Trailer', 'Minutes'], [['1', '5'], ['2', '4'], ['3', '3'], ['4', '5'], ['5', '4'], ['Total', '21']]) })
    ]
  })
};
