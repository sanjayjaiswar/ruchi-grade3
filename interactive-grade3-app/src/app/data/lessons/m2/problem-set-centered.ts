import type {
  PlaceValueAdditionModel,
  PlaceValueSubtractionModel,
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetDataDisplay,
  ProblemSetNumberLineModel,
  ProblemVisualMeasurementLabSection,
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
    3: 'Capacity of the 3 containers plotted and labeled on number lines. Container D: 212 mL ≈ 210 mL. Container E: 238 mL ≈ 240 mL. Container F: 195 mL ≈ 200 mL. a. Estimate: 650 mL; actual: 645 mL. b. Estimate: 30 mL; actual: 26 mL; tape diagram drawn and labeled.',
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
    2: 'Complete the chart. a. Shauna has 480 stickers. Round the number of stickers to the nearest hundred. b. There are 525 pages in a book. Round the number of pages to the nearest hundred. c. A container holds 750 milliliters of water. Round the capacity to the nearest 100 milliliters. d. Glen spends $1,297 on a new computer. Round the amount Glen spends to the nearest $100. e. The drive between two cities is 1,842 kilometers. Round the distance to the nearest 100 kilometers.',
    3: 'Circle the numbers that round to 600 when rounding to the nearest hundred: 527, 550, 639, 681, 713, and 603.',
    4: 'The teacher asks students to round 1,865 to the nearest hundred. Christian says that it is one thousand, nine hundred. Alexis disagrees and says it is 19 hundreds. Who is correct? Explain your thinking.'
  },
  15: {
    1: 'Find the sums below. Choose mental math or the algorithm. a. 46 mL + 5 mL b. 46 mL + 25 mL c. 46 mL + 125 mL d. 59 cm + 30 cm e. 509 cm + 83 cm f. 597 cm + 30 cm g. 29 g + 63 g h. 345 g + 294 g i. 480 g + 476 g j. 1 L 245 mL + 2 L 412 mL k. 2 kg 509 g + 3 kg 367 g.',
    2: 'Nadine and Jen buy a small bag of popcorn and a pretzel at the movie theater. The pretzel weighs 63 grams more than the popcorn. What is the weight of the pretzel?',
    3: 'In math class, Jason and Andrea find the total liquid volume of water in their beakers. Jason says the total is 782 milliliters, but Andrea says it is 792 milliliters. The amount of water in each beaker can be found in the table to the right. Show whose calculation is correct. Explain the mistake of the other student.',
    4: 'It takes Greg 15 minutes to mow the front lawn. It takes him 17 more minutes to mow the back lawn than the front lawn. What is the total amount of time Greg spends mowing the lawns?'
  },
  16: {
    1: 'Find the sums below. a. 52 mL + 68 mL b. 352 mL + 68 mL c. 352 mL + 468 mL d. 56 cm + 94 cm e. 506 cm + 94 cm f. 506 cm + 394 cm g. 697 g + 138 g h. 345 g + 597 g i. 486 g + 497 g j. 3 L 251 mL + 1 L 549 mL k. 4 kg 384 g + 2 kg 467 g.',
    2: 'Lane makes sauerkraut. He weighs the amounts of cabbage and salt he uses. Draw and label a tape diagram to find the total weight of the cabbage and salt Lane uses.',
    3: 'Sue bakes mini-muffins for the school bake sale. After wrapping 86 muffins, she still has 58 muffins left cooling on the table. How many muffins did she bake altogether?',
    4: 'The milk carton to the right holds 183 milliliters more liquid than the juice box. What is the total capacity of the juice box and milk carton?'
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

function nearestTenLine(value: number, unit = ''): ProblemSetNumberLineModel {
  const lower = Math.floor(value / 10) * 10;
  const upper = lower + 10;
  const halfway = lower + 5;
  const targetIndex = value - lower;
  const roundedIndex = targetIndex >= 5 ? 10 : 0;
  const suffix = unit ? ` ${unit}` : '';
  const tickLabels = Array.from({ length: 11 }, () => '');

  tickLabels[0] = `${lower}${suffix}`;
  tickLabels[5] = `${halfway}${suffix}`;
  tickLabels[10] = `${upper}${suffix}`;
  tickLabels[targetIndex] = `${value}${suffix}`;

  return {
    label: `${value}${suffix}: ${lower}${suffix} to ${upper}${suffix}`,
    denominator: 10,
    tickLabels,
    targetNumerators: [targetIndex],
    roundedNumerators: [roundedIndex],
    orientation: 'vertical'
  };
}

function nearestHundredLine(value: number, unit = '', prefix = ''): ProblemSetNumberLineModel {
  const lower = Math.floor(value / 100) * 100;
  const upper = lower + 100;
  const halfway = lower + 50;
  const position = value - lower;
  const roundedIndex = position >= 50 ? 10 : 0;
  const suffix = unit ? ` ${unit}` : '';
  const format = (amount: number) => `${prefix}${amount.toLocaleString('en-US')}${suffix}`;
  const tickLabels = Array.from({ length: 11 }, () => '');

  tickLabels[0] = format(lower);
  tickLabels[5] = format(halfway);
  tickLabels[10] = format(upper);

  return {
    label: `${format(value)}: ${format(lower)} to ${format(upper)}`,
    denominator: 10,
    tickLabels,
    roundedNumerators: [roundedIndex],
    orientation: 'vertical',
    targetMarker: {
      label: format(value),
      position
    }
  };
}

function numberLineCaption(line: ProblemSetNumberLineModel, solved: boolean): string {
  const targetIndex = line.targetNumerators?.[0];
  const roundedIndex = line.roundedNumerators?.[0];
  const target = line.targetMarker?.label ?? (targetIndex === undefined ? undefined : line.tickLabels?.[targetIndex]);
  const rounded = roundedIndex === undefined ? undefined : line.tickLabels?.[roundedIndex];

  if (solved && target && rounded) {
    return `${target} rounds to ${rounded}. Follow the shorter distance from the target dot.`;
  }

  const roundingUnit = line.orientation === 'vertical'
    ? line.targetMarker ? 'hundred' : 'ten'
    : 'benchmark';
  return `Mark the number, compare it with halfway, and choose the closer ${roundingUnit}.`;
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
  const exactLesson11ProblemOne = makeExactLesson11ProblemOneVisual(seed, solved);
  if (exactLesson11ProblemOne) {
    return exactLesson11ProblemOne;
  }
  const exactTopicDProblemOne = makeExactTopicDProblemOneVisual(seed, solved);
  if (exactTopicDProblemOne) {
    return exactTopicDProblemOne;
  }
  const exactTopicDStory = makeExactTopicDStoryVisual(seed, solved);
  if (exactTopicDStory) {
    return exactTopicDStory;
  }

  const sections: ProblemVisualSpec['sections'] = [];
  const sourceNote = solved
    ? 'Solved view uses the Module 2 Teacher Edition answer key, authored visuals, and unit checks.'
    : 'Blank view keeps the student Problem Set workspace visual and leaves the official answer work open.';

  const text = [seed.sourcePrompt, seed.solvedAnswer, ...(seed.equations ?? []), seed.unitLabel ?? ''].join(' ');
  const kilogramLabSections = makeM2KilogramLabSections(seed, solved, text.toLowerCase());
  if (kilogramLabSections?.length) {
    sections.push(...kilogramLabSections);
  } else {
    const topicDLabSections = makeM2TopicDLabSections(seed, solved, text.toLowerCase());
    if (topicDLabSections?.length) {
      sections.push(...topicDLabSections);
    } else {
      const topicCLabSections = makeM2TopicCLabSections(seed, solved, text.toLowerCase());
      if (topicCLabSections?.length) {
        sections.push(...topicCLabSections);
      } else {
        const topicBLabSections = makeM2TopicBLabSections(seed, solved, text.toLowerCase());
        if (topicBLabSections?.length) {
          sections.push(...topicBLabSections);
        } else {
          const measurementModel = makeM2MeasurementModel(seed, solved);
          if (measurementModel) {
            sections.push(measurementModel);
          }
        }
      }
    }
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
    const numberLines = seed.numberLineModels.map((line) => ({
      kind: 'number-line' as const,
      label: line.label,
      orientation: line.orientation,
      targetMarker: line.targetMarker,
      ticks: (line.tickLabels ?? []).map((label, index) => ({
        label,
        target: (line.orientation === 'vertical' || solved) && (line.targetNumerators ?? []).includes(index),
        rounded: solved && (line.roundedNumerators ?? []).includes(index)
      })),
      caption: numberLineCaption(line, solved)
    }));

    if (numberLines.length > 1) {
      sections.push({
        kind: 'card-grid',
        label: solved ? 'Solved vertical number lines' : 'Vertical number-line workspaces',
        cards: numberLines.map((line) => ({
          label: line.label ?? 'Number line',
          sections: [{ ...line, label: undefined }]
        }))
      });
    } else {
      sections.push(numberLines[0]);
    }
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

/**
 * Lesson 11 Problem 1 is a two-stage tape relationship, not a repeated-groups
 * tape.  The first subtraction finds the missing part of a 671 g whole; the
 * second compares that 558 g part with the 113 g jar.  Keeping this exact model
 * here prevents the generic tape fallback from repeating "558 g" in every box.
 */
function makeExactLesson11ProblemOneVisual(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean
): ProblemVisualSpec | undefined {
  const lower = seed.sourcePrompt.toLowerCase();
  if (!/can of tomatoes/.test(lower) || !/671 grams/.test(lower) || !/113 grams/.test(lower)) {
    return undefined;
  }

  return {
    title: 'Problem 1: whole-part and comparison tapes',
    sourceNote: solved
      ? 'Solved values follow the Module 2 Teacher Edition Lesson 11 Answer Key.'
      : 'Blank tapes preserve the two different relationships in the Teacher Edition prompt.',
    sections: [
      {
        kind: 'tape',
        label: 'a. Find the can weight from the 671 g whole',
        totalLabel: '671 g total',
        parts: [
          { label: '113 g', sublabel: 'baby-food jar' },
          { label: solved ? '558 g' : '', sublabel: 'can of tomatoes', emphasize: true }
        ],
        caption: solved ? '671 g − 113 g = 558 g' : '671 g − 113 g = ____ g'
      },
      {
        kind: 'tape',
        label: 'b. Compare the 558 g can with the 113 g jar',
        totalLabel: solved ? 'can: 558 g' : 'can: ____ g',
        parts: [
          { label: '113 g', sublabel: 'same as jar' },
          { label: solved ? '445 g' : '', sublabel: 'how much more', emphasize: true }
        ],
        caption: solved ? '558 g − 113 g = 445 g' : '____ g − 113 g = ____ g'
      },
      {
        kind: 'equations',
        label: solved ? 'Checked equations' : 'Student equations',
        lines: solved ? ['671 − 113 = 558', '558 − 113 = 445'] : ['671 − 113 = ____', '____ − 113 = ____']
      },
      {
        kind: 'note',
        label: solved ? 'Answer meaning' : 'Model check',
        text: solved
          ? 'The can weighs 558 grams and is 445 grams heavier than the jar.'
          : 'The first unknown is a missing part. The second unknown is a comparison difference.'
      }
    ]
  };
}

/**
 * Lesson 15 and 16 Problem 1 each contain eleven separate source items.  A
 * single representative measurement model is not faithful to those pages, so
 * these two workspaces deliberately render every item and its own strategy.
 */
function makeExactTopicDProblemOneVisual(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean
): ProblemVisualSpec | undefined {
  const lower = seed.sourcePrompt.toLowerCase();
  const lesson21 = /weigh the bags of beans and rice/.test(lower);
  if (lesson21) {
    return {
      title: 'Problem 1: weigh, round, estimate, solve, and check reasonableness',
      sourceNote: solved
        ? 'The two source scale readings, both estimates, both exact answers, and the reasonableness statement match the Lesson 21 Teacher Edition answer key.'
        : 'The official beans-and-rice scale task is preserved. Read the virtual scales before completing the open estimate and actual equations.',
      sections: [
        {
          kind: 'source-crop',
          label: 'Official Lesson 21 beans-and-rice scale workspace',
          src: '/source-pages/m2-teacher/page-261.png',
          alt: 'Official Lesson 21 Problem Set picture of beans and rice on two digital scales',
          imageWidth: 1143,
          imageHeight: 1443,
          crop: { x: 260, y: 315, width: 520, height: 330 },
          caption: 'The app keeps the two official source objects and scale relationship rather than substituting a generic table.'
        },
        {
          kind: 'measurement-model',
          label: solved ? 'Measured scale readings' : 'Read both virtual scales',
          model: 'mass',
          unitLabel: 'g',
          maxValue: 100,
          values: [
            { label: 'beans', value: 91, valueLabel: solved ? '91 g → 90 g' : 'read and round', tone: 'target' },
            { label: 'rice', value: 58, valueLabel: solved ? '58 g → 60 g' : 'read and round', tone: 'given' }
          ],
          equation: solved ? '91 g ≈ 90 g; 58 g ≈ 60 g' : '____ g ≈ ____ g; ____ g ≈ ____ g',
          steps: solved
            ? ['Read 91 g and round to 90 g.', 'Read 58 g and round to 60 g.', 'Use those values in both source equations.']
            : ['Read each scale.', 'Record each exact mass.', 'Round each mass to the nearest ten.'],
          note: solved ? 'These are the Teacher Edition’s pre-measured source values.' : 'The bar position is the virtual measurement; the equation remains open.'
        },
        {
          kind: 'solution-parts',
          label: 'Complete the source sequence',
          parts: [
            {
              label: 'a',
              prompt: 'Estimate, and then find the total weight of the beans and rice.',
              equation: solved ? '91 g + 58 g ≈ 90 g + 60 g = 150 g; actual: 91 g + 58 g = 149 g' : '____ g + ____ g ≈ ____ g + ____ g = ____ g; actual: ____ g + ____ g = ____ g',
              answer: solved ? 'Estimated total: 150 g. Actual total: 149 g.' : 'Estimated total: ____ g. Actual total: ____ g.'
            },
            {
              label: 'b',
              prompt: 'Estimate, and then find the difference between the weight of the beans and rice.',
              equation: solved ? '91 g − 58 g ≈ 90 g − 60 g = 30 g; actual: 91 g − 58 g = 33 g' : '____ g − ____ g ≈ ____ g − ____ g = ____ g; actual: ____ g − ____ g = ____ g',
              answer: solved ? 'Estimated difference: 30 g. Actual difference: 33 g.' : 'Estimated difference: ____ g. Actual difference: ____ g.'
            },
            {
              label: 'c',
              prompt: 'Are your answers reasonable? Explain why.',
              equation: solved ? '|150 − 149| = 1 g; |33 − 30| = 3 g' : '|estimate − actual| = ____ g',
              answer: solved ? 'Yes. Both estimates are close to the actual answers: 150 g is 1 g from 149 g, and 30 g is 3 g from 33 g.' : 'Yes / No: ____. My evidence is ____.'
            }
          ]
        }
      ]
    };
  }
  const lesson20 = /448\s*-\s*153/.test(lower) && /756\s*-\s*248/.test(lower);
  if (lesson20) {
    return {
      title: 'Problem 1: actual and estimated differences in the source A/B layout',
      sourceNote: solved
        ? 'Every value, nearest-hundred estimate, selected closest estimate, and rounding-direction explanation follows the Lesson 20 Teacher Edition worked page.'
        : 'The two source columns and all eight expressions are preserved. Answers and circles remain open for student work.',
      sections: [lesson20DifferenceWorkbookSection()]
    };
  }
  const lesson15 = /46 ml \+ 5 ml/.test(lower) && /2 kg 509 g \+ 3 kg 367 g/.test(lower);
  const lesson16 = /52 ml \+ 68 ml/.test(lower) && /4 kg 384 g \+ 2 kg 467 g/.test(lower);
  if (!lesson15 && !lesson16) {
    return undefined;
  }

  return {
    title: `Problem ${seed.number}: ${lesson15 ? 'choose a useful addition strategy' : 'compose larger units twice'}`,
    sourceNote: solved
      ? lesson15
        ? 'The exact Teacher Edition questions are organized by measurement context. Animated paths show mental-math bridges; place-value boards show the standard algorithm.'
        : 'The exact Teacher Edition questions are organized by measurement context. Place-value boards animate each composition into the next unit.'
      : 'The studio preserves all eleven Teacher Edition expressions and leaves the strategy and sum open.',
    sections: [
      {
        kind: 'addition-studio',
        label: solved ? 'Animated measurement addition studio' : 'Measurement addition studio',
        groups: lesson15 ? lesson15StrategyGroups(solved) : lesson16StrategyGroups(solved)
      },
      {
        kind: 'note',
        label: solved ? 'Lesson check' : 'Unit check',
        text: solved
          ? lesson15
            ? 'All eleven source questions are present. The path or algorithm is chosen to fit that question, and the measurement unit remains attached.'
            : 'All eleven source questions are present. Each place-value board records the actual compositions for its own addends.'
          : 'Copy the measurement unit into the answer. For j and k, keep the two named units in separate columns.'
      }
    ]
  };
}

function lesson20DifferenceWorkbookSection(): Extract<ProblemVisualSpec['sections'][number], { kind: 'estimate-difference-workbook' }> {
  return {
    kind: 'estimate-difference-workbook',
    label: '1a. Find each actual difference, round to the nearest hundred, and circle the closest estimates',
    groups: [
      {
        label: 'A',
        rows: [
          { exactExpression: '448 − 153', actual: '295', roundedExpression: '400 − 200', estimate: '200', movement: 'opposite-in' },
          { exactExpression: '451 − 153', actual: '298', roundedExpression: '500 − 200', estimate: '300', best: true, movement: 'both-up' },
          { exactExpression: '448 − 149', actual: '299', roundedExpression: '400 − 100', estimate: '300', best: true, movement: 'both-down' },
          { exactExpression: '451 − 149', actual: '302', roundedExpression: '500 − 100', estimate: '400', movement: 'opposite-out' }
        ]
      },
      {
        label: 'B',
        rows: [
          { exactExpression: '747 − 261', actual: '486', roundedExpression: '700 − 300', estimate: '400', movement: 'opposite-in' },
          { exactExpression: '756 − 261', actual: '495', roundedExpression: '800 − 300', estimate: '500', best: true, movement: 'both-up' },
          { exactExpression: '747 − 249', actual: '498', roundedExpression: '700 − 200', estimate: '500', best: true, movement: 'both-down' },
          { exactExpression: '756 − 248', actual: '508', roundedExpression: '800 − 200', estimate: '600', movement: 'opposite-out' }
        ]
      }
    ],
    distancePairs: [
      {
        label: '451 − 153 → 298',
        left: 153,
        right: 451,
        roundedLeft: 200,
        roundedRight: 500,
        caption: 'Both numbers round up. The distance changes from 298 to 300.',
        precise: true
      },
      {
        label: '448 − 149 → 299',
        left: 149,
        right: 448,
        roundedLeft: 100,
        roundedRight: 400,
        caption: 'Both numbers round down. The distance changes from 299 to 300.',
        precise: true
      },
      {
        label: '448 − 153 → 295',
        left: 153,
        right: 448,
        roundedLeft: 200,
        roundedRight: 400,
        caption: 'The numbers round toward each other, shrinking the distance to 200.',
        precise: false
      },
      {
        label: '451 − 149 → 302',
        left: 149,
        right: 451,
        roundedLeft: 100,
        roundedRight: 500,
        caption: 'The numbers round away from each other, stretching the distance to 400.',
        precise: false
      }
    ],
    conclusion: 'The most precise estimates occur when both numbers round in the same direction. Their movements mostly cancel, so the distance stays about the same. Opposite directions shrink or stretch the distance.'
  };
}

function lesson15StrategyGroups(solved: boolean): Extract<ProblemVisualSpec['sections'][number], { kind: 'addition-studio' }>['groups'] {
  return [
    {
      label: 'a–c · Liquid volume chain',
      caption: 'Reuse a known landing to solve the next question.',
      tone: 'liquid',
      items: [
        bridgeStudioItem('a', '46 mL + 5 mL', '51 mL', '46', '+4', '50', '+1', '51'),
        bridgeStudioItem('b', '46 mL + 25 mL', '71 mL', '46', '+5', '51', '+20', '71'),
        bridgeStudioItem('c', '46 mL + 125 mL', '171 mL', '46', '+25', '71', '+100', '171')
      ]
    },
    {
      label: 'd–f · Length jumps',
      caption: 'Land on a friendly ten or hundred, then add what remains.',
      tone: 'length',
      items: [
        bridgeStudioItem('d', '59 cm + 30 cm', '89 cm', '59', '+30', '89'),
        bridgeStudioItem('e', '509 cm + 83 cm', '592 cm', '509', '+1', '510', '+82', '592'),
        bridgeStudioItem('f', '597 cm + 30 cm', '627 cm', '597', '+3', '600', '+27', '627')
      ]
    },
    {
      label: 'g–i · Mass strategy station',
      caption: 'Make 30 mentally, or compose with aligned place values.',
      tone: 'mass',
      items: [
        bridgeStudioItem('g', '29 g + 63 g', '92 g', '29', '+1', '30', '+62', '92'),
        algorithmStudioItem('h', '345 g + 294 g', '639 g', 345, 294, 'g', solved),
        algorithmStudioItem('i', '480 g + 476 g', '956 g', 480, 476, 'g', solved)
      ]
    },
    {
      label: 'j–k · Compound-unit trays',
      caption: 'Keep unlike named units in separate columns, then combine.',
      tone: 'compound',
      items: [
        compoundStudioItem('j', '1 L 245 mL + 2 L 412 mL', '3 L 657 mL', [['L', '1', '2', '3'], ['mL', '245', '412', '657']]),
        compoundStudioItem('k', '2 kg 509 g + 3 kg 367 g', '5 kg 876 g', [['kg', '2', '3', '5'], ['g', '509', '367', '876']])
      ]
    }
  ];
}

function lesson16StrategyGroups(solved: boolean): Extract<ProblemVisualSpec['sections'][number], { kind: 'addition-studio' }>['groups'] {
  return [
    {
      label: 'a–c · Liquid volume composition',
      caption: 'Watch the same addends grow from two places to three.',
      tone: 'liquid',
      items: [
        algorithmStudioItem('a', '52 mL + 68 mL', '120 mL', 52, 68, 'mL', solved),
        algorithmStudioItem('b', '352 mL + 68 mL', '420 mL', 352, 68, 'mL', solved),
        algorithmStudioItem('c', '352 mL + 468 mL', '820 mL', 352, 468, 'mL', solved)
      ]
    },
    {
      label: 'd–f · Length composition',
      caption: 'Compose ones into a ten, then tens into a hundred.',
      tone: 'length',
      items: [
        algorithmStudioItem('d', '56 cm + 94 cm', '150 cm', 56, 94, 'cm', solved),
        algorithmStudioItem('e', '506 cm + 94 cm', '600 cm', 506, 94, 'cm', solved),
        algorithmStudioItem('f', '506 cm + 394 cm', '900 cm', 506, 394, 'cm', solved)
      ]
    },
    {
      label: 'g–i · Mass composition',
      caption: 'Each board shows the actual carried units for that question.',
      tone: 'mass',
      items: [
        algorithmStudioItem('g', '697 g + 138 g', '835 g', 697, 138, 'g', solved),
        algorithmStudioItem('h', '345 g + 597 g', '942 g', 345, 597, 'g', solved),
        algorithmStudioItem('i', '486 g + 497 g', '983 g', 486, 497, 'g', solved)
      ]
    },
    {
      label: 'j–k · Compound-unit trays',
      caption: 'Add each named unit in its own tray.',
      tone: 'compound',
      items: [
        compoundStudioItem('j', '3 L 251 mL + 1 L 549 mL', '4 L 800 mL', [['L', '3', '1', '4'], ['mL', '251', '549', '800']]),
        compoundStudioItem('k', '4 kg 384 g + 2 kg 467 g', '6 kg 851 g', [['kg', '4', '2', '6'], ['g', '384', '467', '851']])
      ]
    }
  ];
}

function bridgeStudioItem(
  item: string,
  expression: string,
  answer: string,
  start: string,
  firstJump: string,
  landing: string,
  secondJump?: string,
  finish?: string
) {
  return {
    item,
    expression,
    answer,
    method: 'bridge' as const,
    bridge: { start, firstJump, landing, secondJump, finish }
  };
}

function algorithmStudioItem(
  item: string,
  expression: string,
  answer: string,
  top: number,
  bottom: number,
  unit: string,
  solved: boolean
) {
  return {
    item,
    expression,
    answer,
    method: 'algorithm' as const,
    algorithm: additionStudioModel(top, bottom, unit, solved)
  };
}

function compoundStudioItem(
  item: string,
  expression: string,
  answer: string,
  columns: Array<[string, string, string, string]>
) {
  return {
    item,
    expression,
    answer,
    method: 'compound' as const,
    compoundColumns: columns.map(([unit, top, bottom, total]) => ({ unit, top, bottom, total }))
  };
}

function additionStudioModel(top: number, bottom: number, unit: string, solved: boolean): PlaceValueAdditionModel {
  const result = top + bottom;
  const width = Math.max(String(top).length, String(bottom).length, String(result).length);
  const columns = ['thousands', 'hundreds', 'tens', 'ones'].slice(-width);
  const digits = (value: number) => String(value).padStart(width, '0').split('').map(Number);
  const topDigits = digits(top);
  const bottomDigits = digits(bottom);
  const regroupings: PlaceValueAdditionModel['regroupings'] = [];
  let carry = 0;
  for (let column = width - 1; column > 0; column -= 1) {
    const total = topDigits[column] + bottomDigits[column] + carry;
    carry = total >= 10 ? 1 : 0;
    if (carry) {
      regroupings.push({
        fromColumn: column,
        toColumn: column - 1,
        label: `10 ${columns[column]} → 1 ${columns[column - 1].replace(/s$/, '')}`
      });
    }
  }
  return {
    unit,
    columns,
    addends: [
      { label: `${top}`, digits: topDigits },
      { label: `+ ${bottom}`, digits: bottomDigits }
    ],
    resultDigits: solved ? digits(result).map(String) : Array.from({ length: width }, () => '?'),
    regroupings,
    result: solved ? `${result} ${unit}` : `____ ${unit}`
  };
}

function makeExactTopicDStoryVisual(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean
): ProblemVisualSpec | undefined {
  const lower = seed.sourcePrompt.toLowerCase();
  const sourceNote = solved
    ? 'The diagram keeps the source quantities and unknown in the same relationship as the official Problem Set, then reveals each calculation in order.'
    : 'The diagram keeps the source quantities visible and leaves only the requested unknown open.';

  if (/measure the lengths of the three pieces of yarn/.test(lower)) {
    return {
      title: 'Problem 2: measure and compare the three source yarn lengths',
      sourceNote: solved
        ? 'The measured and rounded yarn lengths, 100 cm estimate, 102 cm actual total, 10 cm estimate, 14 cm actual difference, and tape relationship match the Lesson 21 answer key.'
        : 'The source yarn table, estimate-first order, and tape-diagram workspace are preserved with answers open.',
      sections: [
        {
          kind: 'data-table',
          label: 'Measure each yarn and round to the nearest ten',
          columns: ['Yarn', 'Measured length', 'Rounded length'],
          rows: solved
            ? [['A', '64 cm', '60 cm'], ['B', '88 cm', '90 cm'], ['C', '38 cm', '40 cm']]
            : [['A', '____ cm', '____ cm'], ['B', '____ cm', '____ cm'], ['C', '____ cm', '____ cm']]
        },
        {
          kind: 'solution-parts',
          label: 'Estimate first, then calculate exactly',
          parts: [
            {
              label: 'a',
              prompt: 'Find the total length of Yarn A and Yarn C.',
              equation: solved ? '60 cm + 40 cm = 100 cm; 64 cm + 38 cm = 102 cm' : '____ cm + ____ cm = ____ cm; ____ cm + ____ cm = ____ cm',
              answer: solved ? 'Estimate: 100 cm. Actual total: 102 cm.' : 'Estimate: ____ cm. Actual total: ____ cm.'
            },
            {
              label: 'b',
              prompt: 'Find the difference between the A + C total and Yarn B.',
              equation: solved ? '100 cm − 90 cm = 10 cm; 102 cm − 88 cm = 14 cm' : '____ cm − ____ cm = ____ cm; ____ cm − ____ cm = ____ cm',
              answer: solved ? 'Estimate: 10 cm. Actual difference: 14 cm.' : 'Estimate: ____ cm. Actual difference: ____ cm.'
            }
          ]
        },
        {
          kind: 'tape',
          label: 'Model the actual difference with the source relationship',
          totalLabel: solved ? 'Yarn A + Yarn C = 102 cm' : 'Yarn A + Yarn C = ____ cm',
          parts: [
            { label: solved ? '88 cm' : '', sublabel: 'Yarn B' },
            { label: solved ? '14 cm' : '', sublabel: 'difference', emphasize: true }
          ],
          caption: solved ? '88 cm + 14 cm = 102 cm' : '____ cm + ____ cm = ____ cm'
        }
      ]
    };
  }

  if (/plot the amount of liquid in the three containers/.test(lower) && /containers d and e/.test(lower)) {
    const containerLine = (
      label: string,
      lowerValue: number,
      value: number,
      rounded: number
    ): Extract<ProblemVisualSpec['sections'][number], { kind: 'number-line' }> => ({
      kind: 'number-line',
      label: '',
      orientation: 'vertical',
      ticks: Array.from({ length: 11 }, (_, index) => {
        const tickValue = lowerValue + index;
        return {
          label: (index === 0 || index === 5 || index === 10) && tickValue !== value ? `${tickValue} mL` : '',
          target: tickValue === value,
          rounded: solved && tickValue === rounded
        };
      }),
      targetMarker: {
        label: solved ? `${value} mL → ${rounded} mL` : `plot ${label}`,
        position: value - lowerValue === 10 ? 100 : (value - lowerValue) * 10
      },
      caption: solved ? `${value} mL rounds to ${rounded} mL.` : 'Read the container, plot its capacity, and round to the nearest 10 mL.'
    });

    return {
      title: 'Problem 3: plot, round, estimate, solve, and model liquid volume',
      sourceNote: solved
        ? 'All three plotted capacities, nearest-ten values, the 650 mL/645 mL totals, and the 30 mL/26 mL differences match the Lesson 21 answer key.'
        : 'The three source container number lines and the estimate-before-exact sequence remain open for student work.',
      sections: [
        {
          kind: 'card-grid',
          label: 'Plot each measured container on its own number line',
          cards: [
            { label: 'Container D', sections: [containerLine('Container D', 210, 212, 210)] },
            { label: 'Container E', sections: [containerLine('Container E', 230, 238, 240)] },
            { label: 'Container F', sections: [containerLine('Container F', 190, 195, 200)] }
          ]
        },
        {
          kind: 'solution-parts',
          label: 'Use the plotted measurements',
          parts: [
            {
              label: 'a',
              prompt: 'Estimate and then find the total amount of liquid.',
              equation: solved ? '210 + 240 + 200 = 650 mL; 212 + 238 + 195 = 645 mL' : '____ + ____ + ____ = ____ mL; ____ + ____ + ____ = ____ mL',
              answer: solved ? 'Estimate: 650 mL. Actual total: 645 mL.' : 'Estimate: ____ mL. Actual total: ____ mL.'
            },
            {
              label: 'b',
              prompt: 'Estimate and then find the difference between Containers D and E.',
              equation: solved ? '240 mL − 210 mL = 30 mL; 238 mL − 212 mL = 26 mL' : '____ mL − ____ mL = ____ mL; ____ mL − ____ mL = ____ mL',
              answer: solved ? 'Estimate: 30 mL. Actual difference: 26 mL.' : 'Estimate: ____ mL. Actual difference: ____ mL.'
            }
          ]
        },
        {
          kind: 'tape',
          label: 'Model the actual D-to-E difference',
          totalLabel: solved ? 'Container E = 238 mL' : 'Container E = ____ mL',
          parts: [
            { label: solved ? '212 mL' : '', sublabel: 'Container D' },
            { label: solved ? '26 mL' : '', sublabel: 'difference', emphasize: true }
          ],
          caption: solved ? '212 mL + 26 mL = 238 mL' : '____ mL + ____ mL = ____ mL'
        }
      ]
    };
  }

  if (/shane watches a movie in the theater that is 115 minutes/.test(lower)) {
    return {
      title: 'Problem 4: separate trailer time from Shane’s 115-minute theater time',
      sourceNote: solved
        ? 'The five source trailer lengths, 21-minute total, 94-minute movie, and reasonableness statement match the Lesson 21 answer key.'
        : 'The official trailer chart and all three source questions are preserved with the total, estimate, exact answer, and explanation open.',
      sections: [
        {
          kind: 'data-table',
          label: 'Trailer length chart',
          columns: ['Trailer', 'Length in minutes'],
          rows: [
            ['1', '5 minutes'],
            ['2', '4 minutes'],
            ['3', '3 minutes'],
            ['4', '5 minutes'],
            ['5', '4 minutes'],
            ['Total', solved ? '21 minutes' : '____ minutes']
          ]
        },
        {
          kind: 'solution-parts',
          label: 'Complete the movie-and-trailers sequence',
          parts: [
            {
              label: 'a',
              prompt: 'Find the total number of minutes for all 5 trailers.',
              equation: solved ? '5 + 4 + 3 + 5 + 4 = 21 minutes' : '5 + 4 + 3 + 5 + 4 = ____ minutes',
              answer: solved ? 'The trailers last 21 minutes altogether.' : 'The trailers last ____ minutes altogether.'
            },
            {
              label: 'b',
              prompt: 'Estimate and then find the movie length without trailers.',
              equation: solved ? '115 min ≈ 120 min; 21 min ≈ 20 min; 120 − 20 = 100 min; actual: 115 − 21 = 94 min' : '115 min ≈ ____ min; ____ min ≈ ____ min; ____ − ____ = ____ min; actual: 115 − ____ = ____ min',
              answer: solved ? 'A reasonable estimate is 100 minutes. The actual movie is 94 minutes.' : 'Estimate: ____ minutes. Actual movie: ____ minutes.'
            },
            {
              label: 'c',
              prompt: 'Is your answer reasonable? Explain why.',
              equation: solved ? '|100 − 94| = 6 minutes' : '|estimate − actual| = ____ minutes',
              answer: solved ? 'Yes. The 100-minute estimate is close to the 94-minute actual answer.' : 'Yes / No: ____. My evidence is ____.'
            }
          ]
        },
        {
          kind: 'tape',
          label: 'Model the theater time as trailers plus movie',
          totalLabel: '115 minutes including trailers',
          parts: [
            { label: solved ? '21 min' : '', sublabel: '5 trailers' },
            { label: solved ? '94 min' : '', sublabel: 'movie without trailers', emphasize: true }
          ],
          caption: solved ? '21 min + 94 min = 115 min' : '____ min + ____ min = 115 min'
        }
      ]
    };
  }

  if (/camden uses a total of 372 liters/.test(lower)) {
    return {
      title: 'Problem 2: estimate and find Camden’s second-month gas use',
      sourceNote: solved
        ? 'The estimate, exact tape relationship, subtraction, and answer sentence reproduce the Lesson 20 Teacher Edition worked solution.'
        : 'The source gives the two-month total and first-month part. The estimate and missing tape part remain open.',
      sections: [
        {
          kind: 'solution-parts',
          label: 'a. Estimate first',
          parts: [{
            label: 'a',
            prompt: 'Round the total and first-month amount to useful hundreds.',
            equation: solved ? '372 L ≈ 400 L; 184 L ≈ 200 L; 400 L − 200 L = 200 L' : '372 L ≈ ____ L; 184 L ≈ ____ L; ____ L − ____ L = ____ L',
            answer: solved ? 'Camden uses about 200 liters in the second month.' : 'Camden uses about ____ liters in the second month.'
          }]
        },
        {
          kind: 'tape',
          label: 'b. Model the actual amount with a tape diagram',
          totalLabel: '372 L total for two months',
          parts: [
            { label: '184 L', sublabel: 'first month' },
            { label: solved ? '188 L' : '', sublabel: 'second month', emphasize: true }
          ],
          caption: solved ? '184 L + 188 L = 372 L' : '184 L + ____ L = 372 L'
        },
        {
          kind: 'equations',
          label: solved ? 'Exact subtraction and answer' : 'Exact subtraction workspace',
          lines: solved
            ? ['372 L − 184 L = 188 L', 'Camden actually uses 188 liters of gas in the second month.']
            : ['372 L − 184 L = ____ L', 'Camden actually uses ____ liters of gas in the second month.']
        }
      ]
    };
  }

  if (/pear, apple, and peach (?:are shown|weigh|is)/.test(lower) && /372 grams/.test(lower)) {
    return {
      title: 'Problem 3: estimate and find the peach’s weight',
      sourceNote: solved
        ? 'The 500 g source scale, nearest-ten estimate, tape relationship, exact subtraction, and answer sentence follow the selected Teacher Edition worked page.'
        : 'The source scale reads 500 g. The known 372 g part and unknown peach part are kept in the same relationship as the Problem Set.',
      sections: [
        {
          kind: 'source-crop',
          label: 'Official Teacher Edition fruit-scale picture',
          src: '/source-pages/m2-teacher/page-253.png',
          alt: 'Pear, apple, and peach on a digital scale that reads 500 grams',
          imageWidth: 1143,
          imageHeight: 1443,
          crop: { x: 725, y: 600, width: 230, height: 270 },
          caption: 'The source picture shows all three fruits together on a scale reading 500 g.'
        },
        {
          kind: 'solution-parts',
          label: 'a. Estimate with the Teacher Edition worked choice',
          parts: [{
            label: 'a',
            prompt: 'Round 372 g to the nearest ten. The 500 g total is already a multiple of ten.',
            equation: solved ? '372 g ≈ 370 g; 500 g − 370 g = 130 g' : '372 g ≈ ____ g; 500 g − ____ g = ____ g',
            answer: solved ? 'The peach weighs about 130 grams.' : 'The peach weighs about ____ grams.'
          }]
        },
        {
          kind: 'tape',
          label: 'b. Model the actual weight with a tape diagram',
          totalLabel: '500 g total',
          parts: [
            { label: '372 g', sublabel: 'pear + apple' },
            { label: solved ? '128 g' : '', sublabel: 'peach', emphasize: true }
          ],
          caption: solved ? '372 g + 128 g = 500 g' : '372 g + ____ g = 500 g'
        },
        {
          kind: 'equations',
          label: solved ? 'Exact subtraction and answer' : 'Exact subtraction workspace',
          lines: solved
            ? ['500 g − 372 g = 128 g', 'The peach weighs 128 grams.']
            : ['500 g − 372 g = ____ g', 'The peach weighs ____ grams.']
        }
      ]
    };
  }

  if (/pretzel weighs 63 grams more/.test(lower)) {
    return {
      title: 'Problem 2: compare popcorn and pretzel weights',
      sourceNote,
      sections: [
        {
          kind: 'data-table',
          label: 'Source picture labels',
          columns: ['Item', 'Weight shown'],
          rows: [['Popcorn', '44 g'], ['Pretzel', solved ? '107 g' : '? g'], ['Difference', '63 g more']]
        },
        {
          kind: 'tape',
          label: solved ? 'Solved comparison tape' : 'Source comparison tape',
          totalLabel: solved ? 'pretzel = 107 g' : 'pretzel = ? g',
          parts: [
            { label: '44 g', sublabel: 'same as popcorn' },
            { label: '63 g', sublabel: 'more' }
          ],
          caption: solved ? '44 g + 63 g = 107 g' : 'The pretzel is the popcorn weight plus 63 grams.'
        },
        {
          kind: 'equations',
          label: solved ? 'Worked calculation' : 'Student equation',
          lines: solved ? ['44 g + 63 g = 107 g', 'The pretzel weighs 107 grams.'] : ['44 g + 63 g = ____ g']
        }
      ]
    };
  }

  if (/jason says the total is 782 milliliters/.test(lower)) {
    return {
      title: 'Problem 3: check Jason and Andrea’s calculations',
      sourceNote,
      sections: [
        {
          kind: 'data-table',
          label: 'Official source table',
          columns: ['Student', 'Liquid volume'],
          rows: [['Jason', '475 mL'], ['Andrea', '317 mL']]
        },
        {
          kind: 'card-grid',
          label: solved ? 'Column check and conclusion' : 'Calculation and explanation workspace',
          cards: [
            {
              label: 'Add the two beaker amounts',
              sections: [{
                kind: 'equations',
                lines: solved
                  ? ['ones: 5 + 7 = 12 → write 2, compose 1 ten', 'tens: 7 + 1 + 1 = 9', 'hundreds: 4 + 3 = 7', '475 mL + 317 mL = 792 mL']
                  : ['475 mL + 317 mL = ____ mL', 'show the composed ten: __________________']
              }]
            },
            {
              label: 'Compare the claims',
              sections: [{
                kind: 'note',
                text: solved
                  ? 'Andrea is correct. Jason’s 782 mL leaves out the 1 ten composed from 12 ones.'
                  : 'Circle Jason or Andrea. Explain what happens after 5 ones + 7 ones.'
              }]
            }
          ]
        }
      ]
    };
  }

  if (/greg 15 minutes to mow the front lawn/.test(lower)) {
    return twoStepPartWholeVisual(
      4,
      'Greg’s front lawn, back lawn, and total mowing time',
      { label: 'Step 1: find the back-lawn time', whole: solved ? 'back lawn = 32 min' : 'back lawn = ? min', parts: [['15 min', 'front-lawn time'], ['17 min', 'more']], equation: solved ? '15 min + 17 min = 32 min' : '15 min + 17 min = ____ min' },
      { label: 'Step 2: find both lawns', whole: solved ? 'both lawns = 47 min' : 'both lawns = ? min', parts: [['15 min', 'front lawn'], [solved ? '32 min' : '? min', 'back lawn']], equation: solved ? '15 min + 32 min = 47 min' : '15 min + ____ min = ____ min' },
      solved,
      sourceNote
    );
  }

  if (/lane makes sauerkraut/.test(lower)) {
    return {
      title: 'Problem 2: total cabbage and salt weight',
      sourceNote,
      sections: [
        {
          kind: 'data-table',
          label: 'Source scale readings',
          columns: ['Ingredient', 'Weight'],
          rows: [['Cabbage', '907 g'], ['Salt', '93 g']]
        },
        {
          kind: 'tape',
          label: solved ? 'Solved labeled tape diagram' : 'Tape diagram workspace',
          totalLabel: solved ? 'total = 1,000 g' : 'total = ? g',
          parts: [{ label: '907 g', sublabel: 'cabbage' }, { label: '93 g', sublabel: 'salt' }],
          caption: solved ? '907 g + 93 g = 1,000 g = 1 kg' : 'Join the two source weights and label the total.'
        },
        {
          kind: 'equations',
          label: solved ? 'Worked calculation and rename' : 'Student equation',
          lines: solved ? ['907 g + 93 g = 1,000 g', '1,000 g = 1 kg'] : ['907 g + 93 g = ____ g', '____ g = ____ kg']
        }
      ]
    };
  }

  if (/after wrapping 86 muffins/.test(lower)) {
    return {
      title: 'Problem 3: all of Sue’s mini-muffins',
      sourceNote,
      sections: [
        {
          kind: 'tape',
          label: solved ? 'Solved part–whole tape' : 'Part–whole tape workspace',
          totalLabel: solved ? 'baked altogether = 144 muffins' : 'baked altogether = ? muffins',
          parts: [{ label: '86', sublabel: 'wrapped' }, { label: '58', sublabel: 'cooling' }],
          caption: solved ? 'Both groups were baked, so they are parts of one total.' : 'Join wrapped muffins and cooling muffins.'
        },
        {
          kind: 'equations',
          label: solved ? 'Compose twice' : 'Student calculation',
          lines: solved
            ? ['ones: 6 + 8 = 14 → write 4, compose 1 ten', 'tens: 8 + 5 + 1 = 14', '86 + 58 = 144 muffins']
            : ['86 + 58 = ____ muffins', 'show both composed units: __________________']
        }
      ]
    };
  }

  if (/milk carton to the right holds 183 milliliters more/.test(lower)) {
    return twoStepPartWholeVisual(
      4,
      'Juice-box and milk-carton capacities',
      { label: 'Step 1: find the milk carton', whole: solved ? 'milk carton = 462 mL' : 'milk carton = ? mL', parts: [['279 mL', 'same as juice box'], ['183 mL', 'more']], equation: solved ? '279 mL + 183 mL = 462 mL' : '279 mL + 183 mL = ____ mL' },
      { label: 'Step 2: find the combined capacity', whole: solved ? 'combined = 741 mL' : 'combined = ? mL', parts: [['279 mL', 'juice box'], [solved ? '462 mL' : '? mL', 'milk carton']], equation: solved ? '279 mL + 462 mL = 741 mL' : '279 mL + ____ mL = ____ mL' },
      solved,
      sourceNote
    );
  }

  return undefined;
}

function twoStepPartWholeVisual(
  problemNumber: number,
  title: string,
  first: { label: string; whole: string; parts: [string, string][]; equation: string },
  second: { label: string; whole: string; parts: [string, string][]; equation: string },
  solved: boolean,
  sourceNote: string
): ProblemVisualSpec {
  return {
    title: `Problem ${problemNumber}: ${title}`,
    sourceNote,
    sections: [{
      kind: 'card-grid',
      label: solved ? 'Two-step solved model' : 'Two-step source workspace',
      cards: [first, second].map((step) => ({
        label: step.label,
        sections: [
          {
            kind: 'tape',
            totalLabel: step.whole,
            parts: step.parts.map(([label, sublabel]) => ({ label, sublabel })),
            caption: step.equation
          },
          { kind: 'equations', lines: [step.equation] }
        ]
      }))
    }]
  };
}

function makeM2KilogramLabSections(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string
): ProblemVisualSpec['sections'] | undefined {
  if (/making a 1-kilogram weight|making a 1 kilogram weight/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Pan balance: solved model' : 'Pan balance: build 1 kilogram',
        model: 'kilogram-balance',
        leftLabel: 'benchmark bag 1 kg',
        rightLabel: solved ? 'rice bag 1 kg' : 'rice bag ____ kg',
        equation: solved ? 'rice bag = benchmark bag = 1 kg' : 'rice bag = benchmark bag = ____ kg',
        rows: solved
          ? [
              { left: '1. Known weight', right: 'The benchmark bag is 1 kilogram.' },
              { left: '2. Match it', right: 'Add rice until both pans are level.' },
              { left: '3. Name the unit', right: 'The rice bag is also 1 kilogram.' }
            ]
          : [
              { left: '1. Put', right: '1 kg benchmark on one pan.' },
              { left: '2. Add', right: 'rice to the other pan.' },
              { left: '3. Stop', right: 'when the pans balance, then label kg.' }
            ],
        caption: solved
          ? 'Equal pans show equal weight.'
          : 'Use the balance to prove the weight, not a guess.'
      }
    ];
  }

  const decomposition = m2KilogramDecomposition(lower);
  if (decomposition) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Animated ten-frame decomposition' : 'Ten-frame decomposition workspace',
        model: 'kilogram-decompose',
        wholeLabel: decomposition.whole,
        wholeDetail: decomposition.detail,
        partLabel: decomposition.part,
        equation: solved ? decomposition.equation : `${decomposition.whole} = 10 equal parts of ____`,
        rows: solved
          ? [
              { left: 'Whole', right: decomposition.whole },
              { left: 'Action', right: 'Split the whole into 10 equal parts.' },
              { left: 'Each part', right: decomposition.part }
            ]
          : [
              { left: 'Whole', right: decomposition.whole },
              { left: 'Draw', right: '10 equal boxes over the whole.' },
              { left: 'Label', right: 'one smaller part with the correct gram unit.' }
            ],
        caption: solved
          ? `The smaller unit comes from ten equal parts of ${decomposition.whole}.`
          : 'Do not convert by memory first; show the ten equal parts.'
      }
    ];
  }

  if (/compare the two place value charts|place value/.test(lower) && /1\s*(?:kilogram|kg)|100\s*(?:grams|g)|10\s*(?:grams|g)|1\s*(?:gram|g)/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Kilograms and place value match' : 'Compare the two charts',
        model: 'kilogram-place-value',
        rows: solved
          ? [
              { left: '1 kilogram', right: '10 groups of 100 grams' },
              { left: '100 grams', right: '10 groups of 10 grams' },
              { left: '10 grams', right: '10 groups of 1 gram' },
              { left: 'Place value', right: '1 thousand -> 10 hundreds -> 10 tens -> 10 ones' }
            ]
          : [
              { left: 'Metric mass', right: '1 kg -> 100 g -> 10 g -> 1 g' },
              { left: 'Place value', right: 'thousands -> hundreds -> tens -> ones' },
              { left: 'Shared idea', right: 'each larger unit is ten of the next smaller unit' }
            ],
        caption: solved
          ? 'Both charts use the same base-ten structure: each unit decomposes into ten of the next smaller unit.'
          : 'Compare one column at a time and name the ten-to-one relationship.'
      }
    ];
  }

  return undefined;
}

function makeM2TopicBLabSections(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string
): ProblemVisualSpec['sections'] | undefined {
  if (/objects that weigh about 1 kilogram|100 grams|10 grams|1 gram/.test(lower) && /classroom|partner|estimate/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Benchmark table: estimate, then check' : 'Benchmark estimate workspace',
        model: 'benchmark-estimate',
        rows: [
          { left: '1 kg', right: 'Heavier classroom object; then check on the scale.' },
          { left: '100 g', right: 'Small object that is still easy to feel.' },
          { left: '10 g', right: 'Light object; compare before weighing.' },
          { left: '1 g', right: 'Very light object; the scale confirms the estimate.' }
        ],
        caption: solved
          ? 'A valid response names real objects and records checked weights.'
          : 'The estimate is not the answer until it is checked with the scale.'
      }
    ];
  }

  if (/circle the correct unit of weight|cereal|watermelon|postcard|cat|bicycle|lemon/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Reasonable unit sort' : 'Choose grams or kilograms',
        model: 'unit-sort',
        rows: solved
          ? [
              { left: 'grams', right: 'cereal 350 g, postcard 6 g, lemon 58 g' },
              { left: 'kilograms', right: 'watermelon 3 kg, cat 4 kg, bicycle 15 kg' },
              { left: 'unit fit', right: 'small/light objects use grams; heavier objects use kilograms' }
            ]
          : [
              { left: 'Ask', right: 'Can I hold it easily in one hand?' },
              { left: 'grams', right: 'small or light object' },
              { left: 'kilograms', right: 'heavier familiar object' }
            ],
        caption: 'The unit should fit the object before the number is read.'
      }
    ];
  }

  if (/bottle of water weighs the same as a 1-kilogram bag of rice|laptop weighs the same as 2 bottles/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Benchmark multiplication' : 'Benchmark relationship',
        model: 'weight-reason',
        equation: solved ? '2 bottles x 1 kg = 2 kg' : '2 bottles x 1 kg = ____ kg',
        rows: [
          { left: '1 bottle', right: 'same weight as a 1 kg bag of rice' },
          { left: 'laptop', right: 'same weight as 2 bottles' },
          { left: 'answer', right: solved ? '2 kilograms' : 'kilograms' }
        ],
        caption: 'Use the benchmark as one equal unit, then count the number of units.'
      }
    ];
  }

  if (/10 bags containing 100 grams|ten units of 100 grams/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Ten 100-gram bags make 1 kilogram' : 'Check Nessa with ten equal bags',
        model: 'kilogram-decompose',
        wholeLabel: '1 kg',
        wholeDetail: '1,000 grams total',
        partLabel: '100 g',
        equation: solved ? '10 x 100 g = 1,000 g = 1 kg' : '10 x 100 g = ____ g = ____ kg',
        rows: [
          { left: 'Count bags', right: '10 equal bags' },
          { left: 'Each bag', right: '100 grams' },
          { left: 'Total', right: solved ? '1,000 grams, or 1 kilogram' : 'Use grams first, then kilograms.' }
        ],
        caption: solved ? 'Nessa is correct because 1,000 grams is 1 kilogram.' : 'Compare using the same unit before deciding.'
      }
    ];
  }

  if (/string beans|grapes|464 grams|355 grams/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Scale readings recorded' : 'Read each scale, then list the weight',
        model: 'scale-read',
        rows: solved
          ? [
              { left: 'string beans', right: '464 grams' },
              { left: 'grapes', right: '355 grams' },
              { left: 'unit check', right: 'both weights are recorded in grams' }
            ]
          : [
              { left: 'Read', right: 'Find the scale mark for each food.' },
              { left: 'Record', right: 'Write the number and grams.' },
              { left: 'Check', right: 'The unit stays attached.' }
            ],
        caption: 'This problem is about reading the measurement before solving.'
      }
    ];
  }

  if (/keiko|jiro|35 kilograms|43 kilograms/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Two tape diagrams: total and difference' : 'Draw both Keiko and Jiro tape diagrams',
        model: 'weight-reason',
        equation: solved ? '35 kg + 43 kg = 78 kg; 43 kg - 35 kg = 8 kg' : '35 kg + 43 kg = ____ kg; 43 kg - 35 kg = ____ kg',
        rows: solved
          ? [
              { left: 'Keiko', right: '35 kg' },
              { left: 'Jiro', right: '43 kg' },
              { left: 'total', right: '78 kg altogether' },
              { left: 'difference', right: 'Jiro is 8 kg heavier' }
            ]
          : [
              { left: 'part 1', right: 'join both weights to find total kg' },
              { left: 'part 2', right: 'compare the longer tape to the shorter tape' },
              { left: 'unit', right: 'each answer is in kilograms' }
            ],
        caption: 'The source asks for two meanings: altogether and heavier than.'
      }
    ];
  }

  if (/houseplant|bowling ball|3 houseplants/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Equal groups tape diagram' : 'Three equal houseplant units',
        model: 'weight-reason',
        equation: solved ? '3 x 5 kg = 15 kg' : '3 x 5 kg = ____ kg',
        rows: solved
          ? [
              { left: '1 plant', right: 'about 5 kg' },
              { left: '3 plants', right: '3 equal 5 kg units' },
              { left: 'estimate', right: 'about 15 kg' }
            ]
          : [
              { left: 'draw', right: '3 equal boxes' },
              { left: 'label', right: '5 kg on each box' },
              { left: 'answer', right: 'multiply equal groups' }
            ],
        caption: 'The bowling ball is the benchmark for one houseplant.'
      }
    ];
  }

  if (/apple picking|pumpkin|27 kg/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Two-step sharing and multiplying' : 'Share apples, then use the pumpkin benchmark',
        model: 'weight-reason',
        equation: solved ? '27 kg / 9 = 3 kg; 7 x 3 kg = 21 kg' : '27 kg / 9 = ____ kg; 7 x ____ kg = ____ kg',
        rows: solved
          ? [
              { left: 'people', right: 'Jane + 8 friends = 9 people' },
              { left: 'share', right: '27 kg shared equally gives 3 kg each' },
              { left: 'pumpkins', right: '7 pumpkins at about 3 kg each make 21 kg' }
            ]
          : [
              { left: 'step 1', right: 'divide the apple weight among 9 people' },
              { left: 'step 2', right: 'use Jane\'s share as one pumpkin benchmark' },
              { left: 'unit', right: 'kilograms stay attached' }
            ],
        caption: 'This card keeps the two operations separate so the story is easier to follow.'
      }
    ];
  }

  if (/predict whether each container holds less than, more than, or about the same as 1 liter|container holds less than/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Capacity prediction checked by measuring' : 'Capacity prediction workspace',
        model: 'capacity-estimate',
        rows: [
          { left: 'Predict', right: 'less than 1 L, about 1 L, or more than 1 L' },
          { left: 'Measure', right: 'pour or read the container result' },
          { left: 'Explain', right: 'tell what surprised you and why' }
        ],
        caption: 'Shape can trick the eye; measured capacity is the evidence.'
      }
    ];
  }

  if (/1 liter into milliliters and decomposing 1 kilogram into grams/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Liter and kilogram use the same base-ten structure' : 'Compare the two decompositions',
        model: 'water-mass-link',
        equation: solved ? '1 L = 1,000 mL; 1 kg = 1,000 g' : '1 L = ____ mL; 1 kg = ____ g',
        rows: solved
          ? [
              { left: 'liter', right: 'breaks into 1,000 milliliters' },
              { left: 'kilogram', right: 'breaks into 1,000 grams' },
              { left: 'same idea', right: 'both wholes decompose into one thousand smaller units' }
            ]
          : [
              { left: 'compare', right: 'name the whole unit' },
              { left: 'decompose', right: 'name the thousand smaller units' },
              { left: 'explain', right: 'tell what is the same' }
            ],
        caption: 'The source asks what is the same about the two decompositions.'
      }
    ];
  }

  if (/1 milliliter of water weigh/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Liter and kilogram match by thousands' : 'Compare liquid and mass units',
        model: 'water-mass-link',
        equation: solved ? '1 L water = 1 kg, so 1 mL water = 1 g' : '1 L = 1,000 mL and 1 kg = 1,000 g',
        rows: solved
          ? [
              { left: 'capacity', right: '1 liter is 1,000 milliliters' },
              { left: 'mass', right: '1 kilogram is 1,000 grams' },
              { left: 'water link', right: '1 milliliter of water weighs 1 gram' }
            ]
          : [
              { left: 'compare wholes', right: '1 L of water matches 1 kg' },
              { left: 'compare parts', right: 'both split into 1,000 smaller parts' },
              { left: 'explain', right: 'match mL to g for water' }
            ],
        caption: 'The relationship works here because the source says 1 liter of water weighs 1 kilogram.'
      }
    ];
  }

  const literDecomposition = m2LiterDecomposition(lower);
  if (literDecomposition) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Liter decomposition' : 'Liter decomposition workspace',
        model: 'liquid-decompose',
        wholeLabel: literDecomposition.whole,
        wholeDetail: literDecomposition.detail,
        partLabel: literDecomposition.part,
        equation: solved ? literDecomposition.equation : `${literDecomposition.whole} = 10 equal parts of ____`,
        rows: [
          { left: 'whole', right: literDecomposition.whole },
          { left: 'action', right: 'split the capacity into 10 equal parts' },
          { left: 'each part', right: solved ? literDecomposition.part : 'label the smaller mL unit' }
        ],
        caption: solved
          ? `Each smaller cup is ${literDecomposition.part}.`
          : 'Use ten equal parts, the same structure as the kilogram lesson.'
      }
    ];
  }

  return undefined;
}

function m2LiterDecomposition(lower: string): { whole: string; detail: string; part: string; equation: string } | undefined {
  if (/decomposing 1 liter|1 liter of water into 10 smaller units|1,000 ml|100 milliliters/.test(lower)) {
    return { whole: '1 L', detail: '1,000 milliliters total', part: '100 mL', equation: '1,000 mL = 10 x 100 mL' };
  }
  if (/cup k|cup l|cup capacity divided by 10/.test(lower)) {
    return { whole: 'cup capacity', detail: 'measured amount', part: 'one tenth', equation: 'cup capacity divided by 10 = one smaller unit' };
  }
  return undefined;
}

function makeM2TopicDLabSections(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string
): ProblemVisualSpec['sections'] | undefined {
  if (/choose mental math or the algorithm|pretzel weighs|jason and andrea|greg mows|mow the front lawn/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Add measurements: compose one larger unit when needed' : 'Add same-unit measurements',
        model: 'compose-once',
        equation: solved ? topicDEquationSummary(seed, 'add') : 'line up place values, add, compose once if needed',
        rows: topicDComposeRows(seed, solved, lower, 'once'),
        placeValueAddition: topicDPlaceValueAddition(seed, solved, lower, 'once'),
        caption: 'The unit stays attached while the place-value digits are added.'
      }
    ];
  }

  if (/52 ml \+ 68 ml|352 ml \+ 468 ml|697 g \+ 138 g|compose larger units twice|907 \+ 93|cabbage and salt|wrapping 86 muffins|milk carton(?: to the right)? holds 183 milliliters|milk carton(?: to the right)? holds 183 ml/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Add measurements: compose across two places' : 'Add and check each place',
        model: 'compose-twice',
        equation: solved ? topicDEquationSummary(seed, 'add') : 'ones compose to tens; tens may compose to hundreds',
        rows: topicDComposeRows(seed, solved, lower, 'twice'),
        placeValueAddition: topicDPlaceValueAddition(seed, solved, lower, 'twice'),
        caption: 'When two places compose, regroup each place before writing the final unit.'
      }
    ];
  }

  if (/actual sum|estimated sums|circle the estimated sum|janet watched|janet watches|sadie, a bear|sadie weighs/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Estimate sums, then compare with the actual sum' : 'Round first, then add exactly',
        model: 'estimate-sum',
        equation: solved ? topicDEquationSummary(seed, 'estimate') : 'rounded addends give an estimate; exact addends give the actual sum',
        rows: topicDEstimateRows(seed, solved, lower),
        estimateRows: topicDEstimateComparisonRows(seed, solved),
        caption: 'A useful estimate is close enough to check whether the exact answer is reasonable.'
      }
    ];
  }

  if (/60 ml - 24 ml|405 - 233|champions is 22 minutes shorter|208 cm rope|decomposing once/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Subtract measurements: decompose once when a digit is too small' : 'Subtract with one regrouping',
        model: 'decompose-once',
        equation: solved ? topicDEquationSummary(seed, 'subtract') : 'decompose one larger unit, subtract, keep the unit',
        rows: topicDSubtractRows(seed, solved, lower),
        placeValueSubtraction: topicDPlaceValueSubtraction(seed, solved, lower, 'once'),
        caption: 'Decompose only where the top digit is too small, then subtract by place value.'
      }
    ];
  }

  if (/340 cm - 60 cm|700 ml - 52 ml|decomposing twice|617 kilometers|468 kilometers left|piano weighs 289 kilograms more|tank a holds 165 fewer liters/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Subtract measurements: prepare every place before subtracting' : 'Unbundle every place that needs a larger unit',
        model: 'decompose-twice',
        equation: solved ? topicDEquationSummary(seed, 'subtract') : 'decompose hundreds to tens, then tens to ones, and keep the unit',
        rows: topicDDecomposeTwiceRows(seed, solved, lower),
        placeValueSubtraction: topicDPlaceValueSubtraction(seed, solved, lower, 'twice'),
        caption: 'Unbundle only where needed; when a zero blocks the path, one larger unit may travel through two places.'
      }
    ];
  }

  if (/actual differences|estimated differences|camden uses a total of 372 liters|pear, apple, and peach (weighs?|is) 500 grams/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Estimate differences, then compare with the exact difference' : 'Round first, then subtract exactly',
        model: 'estimate-difference',
        equation: solved ? topicDEquationSummary(seed, 'estimate') : 'rounded total - rounded part gives an estimate; exact numbers give the actual difference',
        rows: topicDEstimateDifferenceRows(seed, solved, lower),
        estimateRows: topicDEstimateComparisonRows(seed, solved),
        caption: 'For subtraction, rounding both numbers can move the estimate closer or farther from the exact difference.'
      }
    ];
  }

  if (/beans and rice|three pieces of yarn|container d|container e|container f|trailer length|shane watches a movie/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Mixed measurements: estimate, solve exactly, then explain reasonableness' : 'Measure, round, operate, and check',
        model: 'mixed-measure',
        equation: solved ? topicDEquationSummary(seed, 'estimate') : 'measure -> round -> estimate -> exact answer -> reasonable?',
        rows: topicDMixedMeasureRows(seed, solved, lower),
        estimateRows: topicDMixedMeasurementChecks(solved, lower),
        caption: 'Lesson 21 asks students to use measurement as evidence for whether each answer makes sense.'
      }
    ];
  }

  return undefined;
}

function topicDEquationSummary(seed: ProblemSetCenteredProblem | ProblemSeed, mode: 'add' | 'subtract' | 'estimate'): string {
  const equations = seed.equations ?? [];
  if (!equations.length) {
    return seed.solvedAnswer;
  }
  const limit = mode === 'estimate' ? 4 : 3;
  const summary = equations.slice(0, limit).join('; ');
  return equations.length > limit ? `${summary}; ...` : summary;
}

function topicDPlaceValueAddition(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string,
  composeMode: 'once' | 'twice'
): PlaceValueAdditionModel | undefined {
  let addends: [number, number] | undefined;
  let forcedUnit: string | undefined;

  if (composeMode === 'once' && /choose mental math or the algorithm/.test(lower)) {
    addends = [29, 63];
    forcedUnit = 'g';
  } else if (composeMode === 'twice' && /52 ml \+ 68 ml/.test(lower)) {
    addends = [352, 468];
    forcedUnit = 'mL';
  } else {
    const equation = seed.equations?.find((line) => /\d[\d,]*[^=]*\+\s*\d/.test(line));
    const match = equation?.match(/(\d[\d,]*)[^\d+]*\+\s*(\d[\d,]*)/);
    if (match) {
      addends = [Number(match[1].replaceAll(',', '')), Number(match[2].replaceAll(',', ''))];
    }
  }

  if (!addends || addends.some((value) => !Number.isFinite(value))) {
    return undefined;
  }

  const result = addends[0] + addends[1];
  const width = Math.max(String(result).length, String(addends[0]).length, String(addends[1]).length);
  const placeNames = ['thousands', 'hundreds', 'tens', 'ones'].slice(-width);
  const digits = (value: number) => String(value).padStart(width, '0').split('').map(Number);
  const addendDigits = addends.map(digits) as [number[], number[]];
  const regroupings: PlaceValueAdditionModel['regroupings'] = [];
  let carry = 0;

  for (let column = width - 1; column > 0; column -= 1) {
    const total = addendDigits[0][column] + addendDigits[1][column] + carry;
    carry = total >= 10 ? 1 : 0;
    if (carry) {
      regroupings.push({
        fromColumn: column,
        toColumn: column - 1,
        label: `10 ${placeNames[column]} → 1 ${placeNames[column - 1].replace(/s$/, '')}`
      });
    }
  }

  const unit = forcedUnit ?? (/\bml\b|milliliter/.test(lower) ? 'mL'
    : /\bcm\b|centimeter/.test(lower) ? 'cm'
      : /\bg\b|gram/.test(lower) ? 'g'
        : /minute/.test(lower) ? 'minutes'
          : /muffin/.test(lower) ? 'muffins'
            : seed.unitLabel === 'units' ? '' : seed.unitLabel ?? '');
  const unitSuffix = unit ? ` ${unit}` : '';

  return {
    unit,
    columns: placeNames,
    addends: [
      { label: `${addends[0]}${unitSuffix}`, digits: addendDigits[0] },
      { label: `${addends[1]}${unitSuffix}`, digits: addendDigits[1] }
    ],
    resultDigits: solved ? digits(result).map(String) : Array.from({ length: width }, () => '?'),
    regroupings,
    result: solved ? `${result.toLocaleString('en-US')}${unitSuffix}` : `____${unitSuffix}`
  };
}

function topicDPlaceValueSubtraction(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string,
  decomposeMode: 'once' | 'twice'
): PlaceValueSubtractionModel | undefined {
  let values: [number, number] | undefined;

  if (decomposeMode === 'once' && /60 ml - 24 ml/.test(lower)) {
    values = [360, 224];
  } else if (decomposeMode === 'twice' && /340 cm - 60 cm/.test(lower)) {
    values = [700, 452];
  } else {
    const equation = seed.equations?.find((line) => /\d[\d,]*\s*(?:ml|cm|g|l|km|minutes?)?\s*-\s*\d/i.test(line));
    const match = equation?.match(/(\d[\d,]*)\s*(?:ml|cm|g|l|km|minutes?)?\s*-\s*(\d[\d,]*)/i);
    if (match) {
      values = [Number(match[1].replaceAll(',', '')), Number(match[2].replaceAll(',', ''))];
    }
  }

  if (!values || values[0] < values[1] || values.some((value) => !Number.isFinite(value))) {
    return undefined;
  }

  const difference = values[0] - values[1];
  const width = Math.max(String(values[0]).length, String(values[1]).length);
  const placeNames = ['thousands', 'hundreds', 'tens', 'ones'].slice(-width);
  const digits = (value: number) => String(value).padStart(width, '0').split('').map(Number);
  const beforeDigits = digits(values[0]);
  const afterDigits = [...beforeDigits];
  const subtrahendDigits = digits(values[1]);
  const decompositions: PlaceValueSubtractionModel['decompositions'] = [];

  for (let column = width - 1; column > 0; column -= 1) {
    if (afterDigits[column] >= subtrahendDigits[column]) {
      continue;
    }

    let donor = column - 1;
    while (donor >= 0 && afterDigits[donor] === 0) {
      donor -= 1;
    }
    if (donor < 0) {
      return undefined;
    }

    for (let move = donor; move < column; move += 1) {
      afterDigits[move] -= 1;
      afterDigits[move + 1] += 10;
      decompositions.push({
        fromColumn: move,
        toColumn: move + 1,
        label: `1 ${placeNames[move].replace(/s$/, '')} -> 10 ${placeNames[move + 1]}`
      });
    }
  }

  const unit = /\bml\b|milliliter/.test(lower) ? 'mL'
    : /\bcm\b|centimeter/.test(lower) ? 'cm'
      : /\bkg\b|kilogram/.test(lower) ? 'kg'
        : /\bg\b|gram/.test(lower) ? 'g'
          : /\bkm\b|kilometer/.test(lower) ? 'km'
            : /minute/.test(lower) ? 'minutes'
              : /\bl\b|liter/.test(lower) ? 'L'
                : seed.unitLabel === 'units' ? '' : seed.unitLabel ?? '';
  const unitSuffix = unit ? ` ${unit}` : '';
  const solvedDigits = String(difference).padStart(width, '0').split('');
  for (let index = 0; index < solvedDigits.length - 1 && solvedDigits[index] === '0'; index += 1) {
    solvedDigits[index] = '';
  }

  return {
    unit,
    columns: placeNames,
    minuendLabel: `${values[0]}${unitSuffix}`,
    subtrahendLabel: `${values[1]}${unitSuffix}`,
    beforeDigits,
    afterDigits,
    subtrahendDigits,
    resultDigits: solved ? solvedDigits : Array.from({ length: width }, () => '?'),
    decompositions,
    result: solved ? `${difference.toLocaleString('en-US')}${unitSuffix}` : `____${unitSuffix}`
  };
}

function topicDEstimateComparisonRows(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean
): NonNullable<ProblemVisualMeasurementLabSection['estimateRows']> | undefined {
  const parsed = (seed.equations ?? []).map((line, index) => {
    const match = line.match(/^(.+?)\s*=\s*([\d,]+);\s*(.+?)\s*=\s*([\d,]+)$/);
    if (!match) {
      return undefined;
    }
    const actual = Number(match[2].replaceAll(',', ''));
    const estimate = Number(match[4].replaceAll(',', ''));
    return {
      group: String.fromCharCode(65 + Math.floor(index / 3)),
      expression: match[1].trim(),
      actual,
      roundedExpression: match[3].trim(),
      estimate,
      error: Math.abs(actual - estimate)
    };
  }).filter((row): row is NonNullable<typeof row> => Boolean(row));

  if (!parsed.length) {
    const exactMatch = seed.equations?.[0]?.match(/^(.+?)\s*=\s*([\d,]+)(?:\s*([A-Za-z]+))?$/);
    const estimateMatch = seed.equations?.[1]?.match(/^(.+?)\s*=\s*([\d,]+)(?:\s*([A-Za-z]+))?$/);
    if (!exactMatch || !estimateMatch) {
      return undefined;
    }
    const actual = Number(exactMatch[2].replaceAll(',', ''));
    const estimate = Number(estimateMatch[2].replaceAll(',', ''));
    const operator = exactMatch[1].includes('-') ? '-' : '+';
    const unitSuffix = exactMatch[3] ? ` ${exactMatch[3]}` : '';
    return [{
      group: 'story',
      expression: exactMatch[1].trim(),
      actual: solved ? `${actual}${unitSuffix}` : '____',
      roundedExpression: solved ? estimateMatch[1].trim() : `____ ${operator} ____`,
      estimate: solved ? `${estimate}${estimateMatch[3] ? ` ${estimateMatch[3]}` : unitSuffix}` : '____',
      error: solved ? `${Math.abs(actual - estimate)}${unitSuffix}` : '____',
      best: solved
    }];
  }

  const groupSize = parsed.length === 8 && parsed.every((row) => row.expression.includes('-')) ? 4 : 3;
  parsed.forEach((row, index) => row.group = String.fromCharCode(65 + Math.floor(index / groupSize)));
  const bestErrors = new Map<string, number>();
  parsed.forEach((row) => bestErrors.set(row.group, Math.min(bestErrors.get(row.group) ?? Number.POSITIVE_INFINITY, row.error)));

  return parsed.map((row, index) => ({
    group: row.group,
    expression: row.expression,
    actual: solved ? String(row.actual) : '____',
    roundedExpression: solved ? row.roundedExpression : `____ ${row.expression.includes('-') ? '-' : '+'} ____`,
    estimate: solved ? String(row.estimate) : '____',
    error: solved ? String(row.error) : '____',
    best: solved && (groupSize === 4 ? [1, 2, 5, 6].includes(index) : row.error === bestErrors.get(row.group))
  }));
}

function topicDComposeRows(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string,
  composeMode: 'once' | 'twice'
): Array<{ left: string; right: string }> {
  if (/pretzel weighs/.test(lower)) {
    return solved
      ? [
          { left: 'popcorn', right: '44 g' },
          { left: 'more', right: '63 g more than popcorn' },
          { left: 'pretzel', right: '44 g + 63 g = 107 g' }
        ]
      : [
          { left: 'start', right: 'popcorn weight' },
          { left: 'add', right: 'more grams for the pretzel' },
          { left: 'answer', right: 'write grams' }
        ];
  }
  if (/jason and andrea/.test(lower)) {
    return solved
      ? [
          { left: 'addends', right: '475 mL and 317 mL' },
          { left: 'compose', right: '5 + 7 makes 12 ones, so compose 1 ten' },
          { left: 'correct sum', right: '792 mL; Andrea is correct' }
        ]
      : [
          { left: 'check ones', right: 'compose if ones make 10 or more' },
          { left: 'check tens', right: 'include the composed ten' },
          { left: 'decide', right: 'compare Jason and Andrea' }
        ];
  }
  if (/greg mows|mow the front lawn/.test(lower)) {
    return solved
      ? [
          { left: 'front lawn', right: '15 minutes' },
          { left: 'back lawn', right: '15 + 17 = 32 minutes' },
          { left: 'total', right: '15 + 32 = 47 minutes' }
        ]
      : [
          { left: 'part 1', right: 'find back lawn time first' },
          { left: 'part 2', right: 'add front and back' },
          { left: 'unit', right: 'minutes' }
        ];
  }
  if (/907 \+ 93|lane uses 907 g|cabbage and salt|cabbage and 93 g salt/.test(lower)) {
    return solved
      ? [
          { left: 'cabbage', right: '907 g' },
          { left: 'salt', right: '93 g' },
          { left: 'compose', right: '907 g + 93 g = 1,000 g = 1 kg' }
        ]
      : [
          { left: 'add grams', right: '907 g + 93 g' },
          { left: 'compose', right: '1,000 g becomes 1 kg' },
          { left: 'answer', right: 'write grams and kilograms' }
        ];
  }
  if (/wrapping 86 muffins|sue wraps 86 muffins/.test(lower)) {
    return solved
      ? [
          { left: 'wrapped', right: '86 muffins' },
          { left: 'cooling', right: '58 muffins' },
          { left: 'baked', right: '86 + 58 = 144 muffins' }
        ]
      : [
          { left: 'parts', right: 'wrapped muffins and cooling muffins' },
          { left: 'add', right: 'compose if needed' },
          { left: 'answer', right: 'total muffins baked' }
        ];
  }
  if (/milk carton(?: to the right)? holds 183 milliliters|milk carton(?: to the right)? holds 183 ml/.test(lower)) {
    return solved
      ? [
          { left: 'juice box', right: '279 mL' },
          { left: 'milk carton', right: '279 + 183 = 462 mL' },
          { left: 'total capacity', right: '279 + 462 = 741 mL' }
        ]
      : [
          { left: 'first', right: 'find milk carton capacity' },
          { left: 'then', right: 'add both containers' },
          { left: 'unit', right: 'milliliters' }
        ];
  }

  const equations = seed.equations ?? [];
  const examples = composeMode === 'once'
    ? [
        { left: 'same unit', right: 'add mL, cm, g, L/mL, or kg/g in aligned places' },
        { left: 'compose once', right: solved ? '29 g + 63 g = 92 g shows 12 ones compose 1 ten' : 'when a place makes 10 or more, compose one larger unit' },
        { left: 'compound units', right: solved ? '5 kg 876 g keeps kg and g separate' : 'add kg with kg and g with g' }
      ]
    : [
        { left: 'same unit', right: 'add each place value from right to left' },
        { left: 'compose twice', right: solved ? '352 mL + 468 mL = 820 mL' : 'ones and tens can both need regrouping' },
        { left: 'compound units', right: solved ? '6 kg 851 g keeps kg and g separate' : 'compose inside the smaller unit before naming the answer' }
      ];
  if (solved && equations.length) {
    examples.push({ left: 'checked examples', right: equations.slice(0, 3).join('; ') });
  }
  return examples;
}

function topicDEstimateRows(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string
): Array<{ left: string; right: string }> {
  if (/janet watched|janet watches/.test(lower)) {
    return solved
      ? [
          { left: 'actual', right: '94 + 151 = 245 minutes' },
          { left: 'estimate', right: '90 + 150 = 240 minutes' },
          { left: 'check', right: '240 is close to 245' }
        ]
      : [
          { left: 'round', right: 'round each movie length' },
          { left: 'estimate', right: 'add rounded minutes' },
          { left: 'actual', right: 'add exact minutes and compare' }
        ];
  }
  if (/sadie, a bear|sadie weighs/.test(lower)) {
    return solved
      ? [
          { left: 'Sadie', right: '182 kg' },
          { left: 'cub', right: '74 kg' },
          { left: 'actual', right: '182 + 74 = 256 kg' },
          { left: 'estimate', right: 'about 260 kg or 300 kg, depending on rounding' }
        ]
      : [
          { left: 'estimate first', right: 'round both weights' },
          { left: 'actual', right: 'add exact weights' },
          { left: 'model', right: 'tape diagram for total kilograms' }
        ];
  }
  return solved
    ? [
        { left: 'A close case', right: '451 + 249 = 700; 500 + 200 = 700' },
        { left: 'B close case', right: '356 + 148 = 504; 400 + 100 = 500' },
        { left: 'C close case', right: '647 + 158 = 805; 600 + 200 = 800' },
        { left: 'pattern', right: 'closest estimates happen when rounding errors balance' }
      ]
    : [
        { left: '1. actual', right: 'add the exact numbers first' },
        { left: '2. estimate', right: 'round addends to hundreds and add' },
        { left: '3. compare', right: 'circle the estimate closest to the actual sum' }
      ];
}

function topicDSubtractRows(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string
): Array<{ left: string; right: string }> {
  if (/405 - 233|three books/.test(lower)) {
    return solved
      ? [
          { left: 'three books', right: '405 g total' },
          { left: 'two books', right: '233 g' },
          { left: 'third book', right: '405 g - 233 g = 172 g' }
        ]
      : [
          { left: 'whole', right: 'three-book weight' },
          { left: 'part', right: 'two-book weight' },
          { left: 'unknown', right: 'subtract to find the third book' }
        ];
  }
  if (/champions is 22 minutes shorter/.test(lower)) {
    return solved
      ? [
          { left: 'Lost Ship', right: '117 minutes' },
          { left: 'Champions', right: '117 - 22 = 95 minutes' },
          { left: 'compare', right: '145 - 95 = 50 minutes longer' }
        ]
      : [
          { left: 'subtract', right: 'find Champions first' },
          { left: 'compare', right: 'Magical Forests minus Champions' },
          { left: 'unit', right: 'minutes' }
        ];
  }
  if (/208 cm rope/.test(lower)) {
    return solved
      ? [
          { left: 'known pieces', right: '80 cm + 94 cm = 174 cm' },
          { left: 'whole rope', right: '208 cm' },
          { left: 'third piece', right: '208 - 174 = 34 cm' }
        ]
      : [
          { left: 'add first', right: 'combine the two known rope pieces' },
          { left: 'subtract', right: 'whole rope minus known length' },
          { left: 'unit', right: 'centimeters' }
        ];
  }
  return solved
    ? [
        { left: 'decompose once', right: '60 mL - 24 mL = 36 mL' },
        { left: 'same structure', right: '360 mL - 24 mL = 336 mL' },
        { left: 'three digits', right: '360 mL - 224 mL = 136 mL' },
        { left: 'compound units', right: '3 kg 924 g - 1 kg 893 g = 2 kg 31 g' }
      ]
    : [
        { left: '1. line up', right: 'align place values and units' },
        { left: '2. decompose', right: 'regroup one larger unit when needed' },
        { left: '3. subtract', right: 'subtract each place and keep the unit' }
      ];
}

function topicDDecomposeTwiceRows(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string
): Array<{ left: string; right: string }> {
  if (/617 kilometers|468 kilometers left/.test(lower)) {
    return solved
      ? [
          { left: 'whole trip', right: '617 km from Los Angeles to San Francisco' },
          { left: 'left to drive', right: '468 km' },
          { left: 'driven so far', right: '617 km - 468 km = 149 km' }
        ]
      : [
          { left: 'whole', right: 'total distance' },
          { left: 'part', right: 'kilometers left' },
          { left: 'unknown part', right: 'kilometers already driven' }
        ];
  }
  if (/piano weighs 289 kilograms more/.test(lower)) {
    return solved
      ? [
          { left: 'piano', right: '297 kg' },
          { left: 'more than bench', right: '289 kg' },
          { left: 'bench', right: '297 kg - 289 kg = 8 kg' }
        ]
      : [
          { left: 'compare', right: 'piano is the larger amount' },
          { left: 'difference', right: '289 kg more than bench' },
          { left: 'bench', right: 'subtract the difference from the piano weight' }
        ];
  }
  if (/tank a holds 165 fewer liters/.test(lower)) {
    return solved
      ? [
          { left: 'Tank B', right: '400 L' },
          { left: 'fewer', right: 'Tank A has 165 L fewer' },
          { left: 'Tank A', right: '400 L - 165 L = 235 L' }
        ]
      : [
          { left: 'larger tank', right: 'Tank B holds 400 L' },
          { left: 'compare', right: 'Tank A is 165 L less' },
          { left: 'subtract', right: 'find the smaller capacity' }
        ];
  }
  const equations = seed.equations ?? [];
  const rows = solved
    ? [
        { left: 'through zero', right: '340 cm - 260 cm = 80 cm' },
        { left: 'grams', right: '513 g - 148 g = 365 g' },
        { left: 'milliliters', right: '700 mL - 452 mL = 248 mL' },
        { left: 'compound units', right: '5 L 920 mL - 3 L 869 mL = 2 L 51 mL' }
      ]
    : [
        { left: '1. line up', right: 'align place values and units' },
        { left: '2. unbundle twice', right: 'hundreds to tens, then tens to ones when needed' },
        { left: '3. subtract', right: 'write the difference with the same unit' }
      ];
  if (solved && equations.length) {
    rows.push({ left: 'checked examples', right: equations.slice(0, 3).join('; ') });
  }
  return rows;
}

function topicDEstimateDifferenceRows(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string
): Array<{ left: string; right: string }> {
  if (/camden uses a total of 372 liters/.test(lower)) {
    return solved
      ? [
          { left: 'total gas', right: '372 L' },
          { left: 'first month', right: '184 L' },
          { left: 'actual', right: '372 L - 184 L = 188 L' },
          { left: 'estimate', right: '400 L - 200 L = 200 L' }
        ]
      : [
          { left: 'round', right: 'round total and first month' },
          { left: 'estimate', right: 'subtract rounded liters' },
          { left: 'actual', right: 'subtract exact liters and compare' }
        ];
  }
  if (/pear, apple, and peach (weighs?|is) 500 grams/.test(lower)) {
    return solved
      ? [
          { left: 'total fruit', right: '500 g' },
          { left: 'pear + apple', right: '372 g' },
          { left: 'peach actual', right: '500 g - 372 g = 128 g' },
          { left: 'estimate', right: '500 g - 400 g = 100 g' }
        ]
      : [
          { left: 'whole', right: 'all three fruits' },
          { left: 'known part', right: 'pear and apple together' },
          { left: 'unknown', right: 'estimate and subtract for peach' }
        ];
  }
  return solved
    ? [
        { left: 'both round up', right: '451 - 153 ≈ 500 - 200; 756 - 261 ≈ 800 - 300' },
        { left: 'both round down', right: '448 - 149 ≈ 400 - 100; 747 - 249 ≈ 700 - 200' },
        { left: 'why these are precise', right: 'both numbers move in the same direction, so the distance changes very little' },
        { left: 'contrast', right: 'opposite rounding directions stretch or shrink the estimated difference' }
      ]
    : [
        { left: '1. actual', right: 'subtract the exact numbers' },
        { left: '2. estimate', right: 'round total and part to hundreds, then subtract' },
        { left: '3. compare', right: 'circle the estimate closest to the actual difference' }
      ];
}

function topicDMixedMeasureRows(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string
): Array<{ left: string; right: string }> {
  if (/beans and rice/.test(lower)) {
    return solved
      ? [
          { left: 'measure', right: 'beans 91 g; rice 58 g' },
          { left: 'sum', right: '91 g + 58 g = 149 g; estimate 150 g' },
          { left: 'difference', right: '91 g - 58 g = 33 g; estimate 30 g' },
          { left: 'reasonable', right: 'estimates are close to actual answers' }
        ]
      : [
          { left: 'measure', right: 'weigh beans and rice first' },
          { left: 'round', right: 'nearest ten grams' },
          { left: 'operate', right: 'find total and difference' }
        ];
  }
  if (/three pieces of yarn/.test(lower)) {
    return solved
      ? [
          { left: 'measure', right: 'Yarn A 64 cm, B 88 cm, C 38 cm' },
          { left: 'sum', right: 'A + C = 102 cm; estimate 100 cm' },
          { left: 'difference', right: '102 cm - 88 cm = 14 cm; estimate 10 cm' }
        ]
      : [
          { left: 'measure', right: 'record each yarn length' },
          { left: 'add first', right: 'Yarn A plus Yarn C' },
          { left: 'subtract next', right: 'compare that total with Yarn B' }
        ];
  }
  if (/container d|container e|container f/.test(lower)) {
    return solved
      ? [
          { left: 'plot', right: 'place each container on the mL number line' },
          { left: 'round', right: 'nearest 10 milliliters' },
          { left: 'operate', right: 'estimate and find actual total and difference' }
        ]
      : [
          { left: 'read', right: 'find each container amount' },
          { left: 'round', right: 'nearest 10 mL' },
          { left: 'check', right: 'compare estimates with exact mL answers' }
        ];
  }
  if (/trailer length|shane watches a movie/.test(lower)) {
    return solved
      ? [
          { left: 'trailers', right: '5 + 4 + 3 + 5 + 4 = 21 minutes' },
          { left: 'movie only', right: '115 min - 21 min = 94 min' },
          { left: 'estimate', right: '115 min - about 20 min is about 95 min' }
        ]
      : [
          { left: 'add', right: 'find all trailer minutes first' },
          { left: 'subtract', right: 'theater time minus trailers' },
          { left: 'explain', right: 'use the estimate to check reasonableness' }
        ];
  }
  return solved
    ? [
        { left: 'estimate', right: seed.equations?.slice(0, 2).join('; ') || 'round the measurements' },
        { left: 'actual', right: seed.equations?.slice(2, 4).join('; ') || seed.solvedAnswer },
        { left: 'explain', right: 'the rounded answer should be close to the exact answer' }
      ]
    : [
        { left: 'measure', right: 'read the source measurement' },
        { left: 'round', right: 'make an estimate' },
        { left: 'solve', right: 'use exact values and check reasonableness' }
      ];
}

function topicDMixedMeasurementChecks(
  solved: boolean,
  lower: string
): NonNullable<ProblemVisualMeasurementLabSection['estimateRows']> | undefined {
  const row = (
    group: string,
    expression: string,
    actual: string,
    roundedExpression: string,
    estimate: string,
    error: string
  ) => ({
    group,
    expression,
    actual: solved ? actual : '____',
    roundedExpression: solved ? roundedExpression : roundedExpression.replace(/[\d,]+/g, '____'),
    estimate: solved ? estimate : '____',
    error: solved ? error : '____'
  });

  if (/beans and rice/.test(lower)) {
    return [
      row('sum', '91 g + 58 g', '149 g', '90 g + 60 g', '150 g', '1 g'),
      row('difference', '91 g - 58 g', '33 g', '90 g - 60 g', '30 g', '3 g')
    ];
  }
  if (/three pieces of yarn/.test(lower)) {
    return [
      row('A + C', '64 cm + 38 cm', '102 cm', '60 cm + 40 cm', '100 cm', '2 cm'),
      row('minus B', '102 cm - 88 cm', '14 cm', '100 cm - 90 cm', '10 cm', '4 cm')
    ];
  }
  if (/container d|container e|container f/.test(lower)) {
    return [
      row('total', '212 + 238 + 195 mL', '645 mL', '210 + 240 + 200 mL', '650 mL', '5 mL'),
      row('E - D', '238 mL - 212 mL', '26 mL', '240 mL - 210 mL', '30 mL', '4 mL')
    ];
  }
  if (/trailer length|shane watches a movie/.test(lower)) {
    return [row('movie only', '115 min - 21 min', '94 min', '115 min - 20 min', '95 min', '1 min')];
  }
  return undefined;
}

function makeM2TopicCLabSections(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string
): ProblemVisualSpec['sections'] | undefined {
  if (/can of tomatoes|10 pens|apple, lemon, and banana|frozen turkey|recipe (requires|needs) 300 milliliters|sara triples|capacity of her container|fills 3 buckets|3 buckets with 4 liters|how many liters of water does the container hold/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Operation selected from the measurement story' : 'Choose the operation from the relationship',
        model: 'mixed-operation',
        equation: solved ? (seed.equations ?? []).join('; ') : 'draw the relationship, then compute',
        rows: topicCMixedRows(seed, solved, lower),
        caption: 'The unit stays attached while the operation changes.'
      }
    ];
  }

  const isLesson10LiquidScale = /label the vertical number line|how much liquid|estimate each container to the nearest hundred milliliters|capacity of 4 barrels|barrel/.test(lower);

  if (isLesson10LiquidScale) {
    if (/barrel/.test(lower)) {
      return [
        {
          kind: 'measurement-lab',
          label: solved ? 'Barrels plotted on a liter scale' : 'Plot each barrel capacity',
          model: 'vertical-liquid-scale',
          equation: solved ? '96 L - 68 L = 28 L' : 'greatest, smallest, closest to 70 L, and difference',
          rows: solved
            ? [
                { left: 'D', right: '52 L: smallest' },
                { left: 'B', right: '68 L: closest to 70 L' },
                { left: 'A', right: '75 L: given point' },
                { left: 'C', right: '96 L: greatest' }
              ]
            : [
                { left: 'label', right: 'mark 50, 60, 70, 80, 90, 100 L' },
                { left: 'plot', right: 'place A, B, C, and D on the same scale' },
                { left: 'compare', right: 'use position, then subtract liters' }
              ],
          caption: 'The number line shows order and distance at the same time.'
        }
      ];
    }

    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Container as a vertical number line' : 'Build the container scale',
        model: 'vertical-liquid-scale',
        equation: solved ? '1,000 mL - 300 mL = 700 mL' : '1 L = 1,000 mL; each cup adds 100 mL',
        rows: solved
          ? [
              { left: 'whole', right: '1,000 mL full container' },
              { left: 'halfway', right: '500 mL' },
              { left: 'interval', right: 'each equal cup marks 100 mL' },
              { left: 'left after pour', right: '700 mL' }
            ]
          : [
              { left: 'pour', right: 'add one equal cup at a time' },
              { left: 'mark', right: 'label each equal interval' },
              { left: 'read', right: 'subtract what is poured out' }
            ],
        caption: 'A measuring bottle is a number line turned upright.'
      }
    ];
  }

  if (/nearest hundred|round to 600|19 hundreds|1,865|1,250|1,842/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Nearest hundred: lower hundred, halfway, upper hundred' : 'Round to the nearest hundred',
        model: 'rounding-hundred',
        equation: solved ? (seed.equations ?? []).slice(0, 6).join('; ') : 'below 50 rounds down; 50 or more rounds up',
        rows: topicCRoundingRows(seed, solved, 'hundred'),
        caption: 'The halfway mark decides whether the rounded number moves up.'
      }
    ];
  }

  if (/nearest 10|nearest ten|two tens|basketball game/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Nearest ten: lower ten, halfway, upper ten' : 'Round to the nearest ten',
        model: 'rounding-ten',
        equation: solved ? (seed.equations ?? []).slice(0, 6).join('; ') : 'below 5 rounds down; 5 or more rounds up',
        rows: topicCRoundingRows(seed, solved, 'ten'),
        caption: 'Locate the number between two tens before naming the rounded answer.'
      }
    ];
  }

  if (/vertical number line|liquid volume/.test(lower)) {
    return [
      {
        kind: 'measurement-lab',
        label: solved ? 'Container as a vertical number line' : 'Build the container scale',
        model: 'vertical-liquid-scale',
        equation: solved ? '1,000 mL - 300 mL = 700 mL' : '1 L = 1,000 mL; each cup adds 100 mL',
        rows: solved
          ? [
              { left: 'whole', right: '1,000 mL full container' },
              { left: 'halfway', right: '500 mL' },
              { left: 'interval', right: 'each equal cup marks 100 mL' },
              { left: 'left after pour', right: '700 mL' }
            ]
          : [
              { left: 'pour', right: 'add one equal cup at a time' },
              { left: 'mark', right: 'label each equal interval' },
              { left: 'read', right: 'subtract what is poured out' }
            ],
        caption: 'A measuring bottle is a number line turned upright.'
      }
    ];
  }

  return undefined;
}

function topicCMixedRows(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  lower: string
): Array<{ left: string; right: string }> {
  if (/can of tomatoes/.test(lower)) {
    return solved
      ? [
          { left: 'whole', right: '671 g total' },
          { left: 'known part', right: 'baby food jar is 113 g' },
          { left: 'unknown part', right: 'tomatoes are 558 g' },
          { left: 'compare', right: 'tomatoes are 445 g more' }
        ]
      : [
          { left: 'subtract', right: 'find the missing part from the total' },
          { left: 'subtract again', right: 'compare can and jar' },
          { left: 'unit', right: 'grams' }
        ];
  }
  if (/10 pens/.test(lower)) {
    return solved
      ? [
          { left: '1 pen', right: '6 g' },
          { left: '10 pens', right: '60 g' },
          { left: 'empty box', right: '82 g' },
          { left: 'box + pens', right: '142 g' }
        ]
      : [
          { left: 'multiply', right: '10 equal pen weights' },
          { left: 'add', right: 'include the empty box' },
          { left: 'unit', right: 'grams' }
        ];
  }
  if (/apple, lemon, and banana/.test(lower)) {
    return solved
      ? [
          { left: 'total fruit', right: '508 g' },
          { left: 'banana', right: '508 g - 317 g = 191 g' },
          { left: 'lemon', right: '191 g - 68 g = 123 g' },
          { left: 'apple', right: '317 g - 123 g = 194 g' }
        ]
      : [
          { left: 'part 1', right: 'find banana from the total' },
          { left: 'part 2', right: 'find lemon from banana' },
          { left: 'part 3', right: 'find apple from apple + lemon' }
        ];
  }
  if (/frozen turkey/.test(lower)) {
    return solved
      ? [
          { left: 'one turkey', right: 'about 5 kg' },
          { left: 'total order', right: '45 kg' },
          { left: 'groups', right: '9 turkeys' }
        ]
      : [
          { left: 'draw', right: '45 kg split into 5 kg units' },
          { left: 'divide', right: 'count the groups' },
          { left: 'answer unit', right: 'turkeys' }
        ];
  }
  if (/recipe (requires|needs) 300 milliliters|sara triples/.test(lower)) {
    return solved
      ? [
          { left: 'one recipe', right: '300 mL milk' },
          { left: 'triple recipe', right: '3 equal recipes' },
          { left: 'needed', right: '900 mL milk' }
        ]
      : [
          { left: 'multiply', right: '3 groups of 300 mL' },
          { left: 'record', right: 'answer in milliliters' }
        ];
  }
  return solved
    ? [
        { left: '3 buckets', right: '3 x 4 L = 12 L' },
        { left: 'left over', right: '2 L' },
        { left: 'container', right: '14 L total' }
      ]
    : [
        { left: 'multiply', right: 'filled buckets first' },
        { left: 'add', right: 'include the leftover water' },
        { left: 'unit', right: 'liters' }
      ];
}

function topicCRoundingRows(
  seed: ProblemSetCenteredProblem | ProblemSeed,
  solved: boolean,
  unit: 'ten' | 'hundred'
): Array<{ left: string; right: string }> {
  if (!solved) {
    return unit === 'ten'
      ? [
          { left: '1. lower ten', right: 'write the ten below the number' },
          { left: '2. halfway', right: 'mark 5 ones after the lower ten' },
          { left: '3. upper ten', right: 'round to the closer ten' }
        ]
      : [
          { left: '1. lower hundred', right: 'write the hundred below the number' },
          { left: '2. halfway', right: 'mark 50 after the lower hundred' },
          { left: '3. upper hundred', right: 'round to the closer hundred' }
        ];
  }

  const equations = seed.equations ?? [];
  const first = equations.slice(0, 6).map((line, index) => {
    const parts = line.split(/~=|≈/u).map((part) => part.trim());
    if (parts.length < 2) {
      return { left: `reason ${index + 1}`, right: line };
    }
    return { left: parts[0] || 'number', right: parts[1] || line };
  });
  return first.length ? first : [{ left: 'rounded answer', right: seed.solvedAnswer }];
}

function makeM2MeasurementModel(seed: ProblemSetCenteredProblem | ProblemSeed, solved: boolean): ProblemVisualMeasurementModelSection | undefined {
  const text = [seed.sourcePrompt, seed.solvedAnswer, ...(seed.equations ?? []), seed.unitLabel ?? ''].join(' ');
  const lower = text.toLowerCase();
  const kilogramLabModel = m2KilogramLabModel(seed, solved, lower);
  if (kilogramLabModel) {
    return kilogramLabModel;
  }
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

function m2KilogramLabModel(seed: ProblemSetCenteredProblem | ProblemSeed, solved: boolean, lower: string): ProblemVisualMeasurementModelSection | undefined {
  if (/making a 1-kilogram weight|making a 1 kilogram weight/.test(lower)) {
    return {
      kind: 'measurement-model',
      label: solved ? 'Pan balance model' : 'Teacher Edition lab model',
      model: 'mass',
      unitLabel: 'kg',
      referenceLabel: 'balance the rice bag with the 1 kg benchmark',
      equation: solved ? 'rice bag = benchmark bag = 1 kg' : 'rice bag = benchmark bag = ____ kg',
      maxValue: 1,
      values: [
        { label: 'benchmark bag', value: 1, valueLabel: '1 kg', tone: 'benchmark' },
        { label: 'rice bag', value: solved ? 1 : undefined, valueLabel: solved ? '1 kg' : '____ kg', tone: solved ? 'answer' : 'target' }
      ],
      steps: solved
        ? ['Place the 1 kg benchmark on one pan.', 'Add rice to the empty bag on the other pan.', 'When the pans balance, the rice bag is 1 kg.']
        : ['Draw the pan balance.', 'Show rice being added until the pans balance.', 'Label the finished rice bag with kilograms.'],
      note: solved ? seed.solvedAnswer : seed.blankWorkspaceLabel ?? 'Show how the pan balance proves the rice bag is 1 kilogram.'
    };
  }

  const decomposition = m2KilogramDecomposition(lower);
  if (decomposition) {
    return {
      kind: 'measurement-model',
      label: solved ? 'Ten-frame decomposition' : 'Decomposition workspace',
      model: 'conversion',
      unitLabel: 'g',
      referenceLabel: `${decomposition.whole} -> 10 equal parts`,
      equation: solved ? decomposition.equation : `${decomposition.whole} = 10 x ____`,
      values: [
        { label: 'whole', valueLabel: decomposition.whole, tone: 'benchmark' },
        { label: 'number of parts', value: 10, valueLabel: '10 equal parts', tone: 'given' },
        { label: 'each part', valueLabel: solved ? decomposition.part : '____', tone: solved ? 'answer' : 'target' }
      ],
      steps: solved
        ? [`Start with ${decomposition.whole}.`, 'Draw or imagine a ten-frame over that whole.', `Each equal part is ${decomposition.part}.`]
        : [`Start with ${decomposition.whole}.`, 'Split the whole into ten equal parts.', 'Label each smaller part.'],
      note: solved ? seed.solvedAnswer : seed.blankWorkspaceLabel ?? 'Use the Teacher Edition ten-frame decomposition.'
    };
  }

  if (/compare the two place value charts|place value/.test(lower) && /1\s*(?:kilogram|kg)|100\s*(?:grams|g)|10\s*(?:grams|g)|1\s*(?:gram|g)/.test(lower)) {
    return {
      kind: 'measurement-model',
      label: solved ? 'Base-ten comparison' : 'Chart comparison model',
      model: 'conversion',
      referenceLabel: 'each column is 10 of the next smaller column',
      equation: solved ? '1 kg -> 100 g -> 10 g -> 1 g matches thousands -> hundreds -> tens -> ones' : '1 kg -> ____ -> ____ -> ____',
      values: [
        { label: 'metric mass', valueLabel: '1 kg, 100 g, 10 g, 1 g', tone: 'benchmark' },
        { label: 'place value', valueLabel: 'thousands, hundreds, tens, ones', tone: 'given' },
        { label: 'relationship', valueLabel: solved ? '10 of the next smaller unit' : '____', tone: solved ? 'answer' : 'target' }
      ],
      steps: solved
        ? ['Read the metric mass chart left to right.', 'Read the place value chart left to right.', 'Match the ten-to-one relationship in both charts.']
        : ['Compare one column at a time.', 'Ask what each column is made of.', 'Write the shared base-ten pattern.'],
      note: solved ? seed.solvedAnswer : 'Use the two source charts to explain how kilograms and grams follow place value.'
    };
  }

  return undefined;
}

function m2KilogramDecomposition(lower: string): { whole: string; detail: string; part: string; equation: string } | undefined {
  if (/decomposing 1 kilogram into groups of 100 grams|decompose 1 kilogram/.test(lower)) {
    return { whole: '1 kg', detail: '1,000 grams total', part: '100 g', equation: '1,000 g = 10 x 100 g' };
  }
  if (/decomposing 100 grams into groups of 10 grams|decompose 100 grams/.test(lower)) {
    return { whole: '100 g', detail: 'one 100-gram part', part: '10 g', equation: '100 g = 10 x 10 g' };
  }
  if (/decomposing 10 grams into groups of 1 gram|decompose 10 grams/.test(lower)) {
    return { whole: '10 g', detail: 'one 10-gram part', part: '1 g', equation: '10 g = 10 x 1 g' };
  }
  return undefined;
}

function measurementValues(seed: ProblemSetCenteredProblem | ProblemSeed, solved: boolean, unitLabel?: string): NonNullable<ProblemVisualMeasurementModelSection['values']> {
  const values: NonNullable<ProblemVisualMeasurementModelSection['values']> = [];
  const equationText = seed.equations?.join(' ') ?? '';
  const evidenceText = solved
    ? [equationText, seed.sourcePrompt, seed.solvedAnswer].join(' ')
    : seed.sourcePrompt;
  const labeledValues = Array.from(evidenceText.matchAll(/\b\d{1,3}(?:,\d{3})*\s*(?:kg|kilograms?|g|grams?|mL|milliliters?|L|liters?|cm|centimeters?|minutes?|mins?)\b/gi));
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

  const equationNumbers = solved ? Array.from(equationText.matchAll(/\b\d{1,3}(?:,\d{3})*\b/g))
    .map((match) => Number(match[0].replace(/,/g, '')))
    .filter((value) => Number.isFinite(value)) : [];
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
  const total = solved ? seed.knownTotal ?? seed.quotient : seed.knownTotal;
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
    title: solved ? 'Sample measured response' : 'Official worksheet panel',
    sections: [
      {
        kind: 'stopwatch-workspace',
        label: solved ? 'Completed stopwatch sentence' : 'Stopwatch and answer line',
        prompt: seed.sourcePrompt,
        answerLine: seed.blankSentence,
        sampleAnswer: solved ? seed.sampleResponse : undefined,
        startLabel: '0 seconds',
        elapsedLabel: solved ? duration : 'measure',
        stopLabel: solved ? duration : '____ seconds',
        sampleWork: solved ? seed.sampleWork : undefined,
        sourceWorkLabel: solved ? seed.sourceWorkLabel : undefined,
        sourceWorkLines: solved ? seed.sourceWorkLines : undefined,
        sourceWorkColumns: solved ? seed.sourceWorkColumns : undefined,
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
    title: solved ? 'Sample filled chart' : 'Official chart',
    sections: [
      {
        kind: 'stopwatch-workspace',
        label: solved ? seed.title : seed.title,
        prompt: seed.sourcePrompt,
        icon: seed.number === 6 ? 'relay' : 'activity',
        columns: seed.columns,
        rows: seed.blankRows.slice(0, seed.number === 6 ? 4 : undefined).map((row, index) => ({
          label: solved ? seed.solvedRows[index]?.[0] || row[0] : row[0],
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

const M2_CONCEPT_CHECKPOINTS: Record<number, string[]> = {
  1: ['Experience 1, 5, and 40 seconds with a stopwatch.', 'Distinguish seconds from minutes.', 'Explain that stopping the stopwatch stops measurement, not time.'],
  2: ['Build 60 minutes as 12 equal intervals of 5.', 'Count spaces as intervals rather than tick marks.', 'Connect the straight 0-60 line to the same scale wrapped around a clock.'],
  3: ['Count by fives to the nearest benchmark below the target.', 'Count the remaining one-minute intervals.', 'Transfer the exact minute position from the line to the circular clock.'],
  4: ['Identify whether start, end, or elapsed time is unknown.', 'Choose forward or backward counting to match the unknown.', 'Use efficient benchmark jumps on both a number line and a clock.'],
  5: ['Plot all known times on the same one-hour line.', 'Relate elapsed intervals as parts of a whole.', 'Use addition or subtraction to find the missing part, whole, start, or end.'],
  6: ['Establish 1 kilogram with a physical pan balance.', 'Decompose 1 kg into 100 g, 10 g, and 1 g units by tens.', 'Connect metric decomposition to base-ten place value.'],
  7: ['Determine the value of one spring-scale interval before reading.', 'Use 1 kg, 100 g, 10 g, and 1 g as mental benchmarks.', 'Estimate first, then check on the actual scale.'],
  8: ['Read exact weights from the scales.', 'Draw the weight relationship with a tape diagram.', 'Choose addition, subtraction, multiplication, or division from the relationship.'],
  9: ['Distinguish container capacity from the liquid volume currently inside.', 'Verify that capacity is conserved across container shapes.', 'Decompose 1 L into 100 mL, 10 mL, and 1 mL units.'],
  10: ['Build the bottle scale with ten equal 100 mL pours.', 'Treat the calibrated bottle as a vertical number line.', 'Read hundreds exactly and estimate positions between marks.'],
  11: ['Keep like metric units together.', 'Model the whole, parts, comparison, or equal groups before operating.', 'Use all four operations and check the answer in context.'],
  12: ['Name the two tens surrounding the measured value.', 'Locate the halfway value and apply the halfway-rounds-up convention.', 'Keep the original measurement separate from its rounded estimate.'],
  13: ['Use the same nearest-ten structure for two- and three-digit numbers.', 'Label lower ten, halfway, upper ten, and target on a vertical line.', 'Explain the rounded value with distance, not a memorized digit rule alone.'],
  14: ['Name the two hundreds and the halfway hundred.', 'Round three- and four-digit numbers on a vertical line.', 'Connect standard form with unit form such as 1,900 = 19 hundreds.'],
  15: ['Model the addends with place-value disks.', 'Compose 10 ones as 1 ten exactly once.', 'Connect the physical trade to the written standard algorithm.'],
  16: ['Compose ones into a ten.', 'Compose tens into a hundred in the same problem.', 'Record both compositions accurately in the standard algorithm.'],
  17: ['Compare estimates made with more than one rounding precision.', 'Track whether each addend rounds up or down.', 'Explain how opposing addition errors can balance before checking the actual sum.'],
  18: ['Identify the one place that needs a larger unit.', 'Unbundle one hundred or ten with place-value disks.', 'Match the decomposition to the written subtraction algorithm.'],
  19: ['Decompose across two places when necessary.', 'Handle a zero by unbundling from the next available place.', 'Check that every place is ready before subtracting.'],
  20: ['Compare estimated and actual differences.', 'Explain why same-direction rounding tends to preserve a difference.', 'Contrast subtraction error behavior with the balancing pattern for addition.'],
  21: ['Measure the source masses, lengths, and liquid volumes.', 'Round, estimate, and then solve using the exact measurements.', 'Use the estimate-to-exact gap to justify reasonableness.']
};

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
        checkpoints: M2_CONCEPT_CHECKPOINTS[seed.lessonNumber]
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
        sourcePrompt: 'Use a stopwatch. How long does it take you to snap your fingers 10 times?',
        blankSentence: 'It takes __________ to snap 10 times.',
        sampleResponse: 'It takes 9 seconds to snap 10 times.',
        sampleWork: ['Sample variable response: 9 seconds.'],
        solvedAnswer: 'Times will vary. A complete response records one measured stopwatch time and writes it in the sentence blank as a number of seconds.',
        blankWorkspaceLabel: 'Time the exact snap task, then fill the sentence blank with the measured number of seconds.',
        meaning: 'The answer tells how many seconds passed while snapping your fingers 10 times.',
        explanation: 'Use the stopwatch to measure the activity once. Write the measured elapsed time in the sentence blank and attach seconds.',
        checks: [
          'The official snap task is unchanged.',
          'The answer is a measured stopwatch result, not an invented fixed answer.',
          'The unit seconds is attached to the number.'
        ]
      }),
      stopwatchSentenceProblem({
        number: 2,
        sourcePrompt: 'Use a stopwatch. How long does it take to write every whole number from 0 to 25?',
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
        sourcePrompt: 'Use a stopwatch. How long does it take you to name 10 animals? Record them below.',
        blankSentence: 'It takes __________ to name 10 animals.',
        sampleResponse: 'It takes 40 seconds to name 10 animals.',
        sampleWork: ['Sample animal list: dog, cat, horse, turtle, fish, hamster, rabbit, cow, pig, mouse.'],
        sourceWorkLabel: 'Source work: 10 recorded animals',
        sourceWorkLines: ['dog', 'cat', 'horse', 'turtle', 'fish', 'hamster', 'rabbit', 'cow', 'pig', 'mouse'],
        sourceWorkColumns: 5,
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
        sourcePrompt: 'Use a stopwatch. How long does it take you to write 7 x 8 = 56 fifteen times? Record the time.',
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
        sourcePrompt: '100 meter relay: Use a stopwatch to measure and record your team’s times, then find the total time.',
        title: 'Problem 6 relay table',
        columns: ['Name', 'Time'],
        blankRows: [
          ['', '________ seconds'],
          ['', '________ seconds'],
          ['', '________ seconds']
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
        sourcePrompt: 'Label every 5 minutes below the 5:00 p.m. to 6:00 p.m. number line. Draw a line from each clock to the point on the number line that shows its time. Not all clocks have matching points.',
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
        sourcePrompt: 'Noah uses a number line to locate 5:45 p.m. Each interval is 5 minutes. The number line shows the hour from 5 p.m. to 6 p.m. Label the number line to show his work.',
        startLabel: '5:00 p.m.',
        endLabel: '6:00 p.m.',
        points: [{ label: '5:45 p.m.', minute: 45 }],
        jumps: [{ label: '9 fives', fromMinute: 0, toMinute: 45 }],
        showPointDetails: false,
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
          { label: '7:03', minute: 3 },
          { label: '7:17', minute: 17 },
          { label: '7:28', minute: 28, open: true },
          { label: '7:41', minute: 41 },
          { label: '7:55', minute: 55 }
        ],
        jumps: [],
        showPointDetails: false,
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
        points: [{ label: '6:48 a.m.', minute: 48 }],
        showPointDetails: false,
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
        points: [{ label: '8:23 a.m.', minute: 23 }],
        showPointDetails: false,
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
        startLabel: '5:00 p.m.',
        endLabel: '6:00 p.m.',
        tickLabels: exactMinuteTicks,
        clocks: [
          {
            label: 'Source clock',
            timeLabel: '5:27 p.m.',
            blankTimeLabel: '5:27 p.m.',
            showInBlank: true,
            caption: 'Read the source clock: 27 minutes after 5.'
          }
        ],
        points: [{ label: '5:27 p.m.', minute: 27 }],
        showPointDetails: false,
        jumps: [
          { label: '5 fives = 25', fromMinute: 0, toMinute: 25 },
          { label: '+2 ones', fromMinute: 25, toMinute: 27 }
        ],
        blankNote: 'Read the clock by counting fives to the nearest benchmark and ones to the exact minute.',
        solvedNote: 'The clock reads 5:27 p.m.: five groups of five minutes make 25, then two more minutes make 27.',
        solvedAnswer: 'Rebecca finishes her homework at 5:27 p.m.',
        equations: ['5 x 5 = 25', '25 + 2 = 27', 'Rebecca finishes at 5:27 p.m.'],
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
        startLabel: '3:00 p.m.',
        endLabel: '4:00 p.m.',
        tickLabels: exactMinuteTicks,
        clocks: [
          {
            label: 'Source clock',
            timeLabel: '3:56 p.m.',
            blankTimeLabel: '3:56 p.m.',
            showInBlank: true,
            caption: 'Read part a from the clock, then count back 11 minutes for part b.'
          }
        ],
        points: [
          { label: '3:56 p.m.', minute: 56 },
          { label: '3:45 p.m.', minute: 45 }
        ],
        showPointDetails: false,
        jumps: [{ label: 'count back 11 min', fromMinute: 56, toMinute: 45 }],
        blankNote: 'First read Mason\'s drop-off time. Then count back 11 minutes on the same hour line.',
        solvedNote: 'Mason is dropped off at 3:56 p.m. Counting back 11 minutes lands on 3:45 p.m.',
        solvedAnswer: 'Mason is dropped off at 3:56 p.m.; the coach arrives at 3:45 p.m.',
        equations: ['3:56 p.m. - 11 min = 3:45 p.m.', '56 - 11 = 45'],
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
    concept: 'Elapsed-time stories vary the unknown: start time, end time, or elapsed minutes. The Teacher Edition first plots 5:31 p.m. and 5:43 p.m., then compares efficient forward and backward counts on both a number line and a clock.',
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
    concept: 'Time intervals are parts of a one-hour whole. Plot the known times, then add parts to find a total or subtract a known part from the whole to find the missing interval.',
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
    concept: 'The Teacher Edition builds the unit with a pan balance first: a bag of rice balances a 1-kilogram benchmark bag. Students then decompose that same kilogram into ten 100-gram parts, decompose 100 grams into ten 10-gram parts, and decompose 10 grams into ten 1-gram parts.',
    contrast: 'This lesson is a measurement lab, not just a conversion chart. Every answer should name the physical action, the whole unit, the ten equal smaller parts, and the gram label.',
    summary: 'A kilogram-to-gram decomposition follows the same base-ten pattern as thousands, hundreds, tens, and ones.',
    problems: [
      problem({
        number: 1,
        sourcePrompt: 'Illustrate and describe the process of making a 1-kilogram weight.',
        solvedAnswer: 'Illustrations and descriptions will vary. A valid response shows a bag of rice balanced with a 1-kilogram benchmark weight or bag, so the rice bag is 1 kilogram.',
        equations: ['rice bag = 1 kg', '1 kg = 1,000 g'],
        blankWorkspaceLabel: 'Draw the pan balance: 1-kilogram benchmark on one side and rice added to the other side until both sides balance.',
        dataDisplay: dataTable('Teacher Edition lab setup', ['Step', 'Action', 'Result'], [
          ['1', 'Put the 1 kg benchmark bag on one pan.', 'known 1 kg'],
          ['2', 'Add rice to the empty bag on the other pan.', 'adjust the amount'],
          ['3', 'Stop when the pans balance.', 'the rice bag weighs 1 kg']
        ])
      }),
      problem({
        number: 2,
        sourcePrompt: 'Illustrate and describe the process of decomposing 1 kilogram into groups of 100 grams.',
        solvedAnswer: 'Illustrations and descriptions will vary. A valid model shows 1 kilogram decomposed into ten equal 100-gram groups.',
        equations: ['1 kg = 1,000 g', '1,000 g = 10 x 100 g'],
        blankWorkspaceLabel: 'Draw a ten-frame over the 1-kilogram bag and label each equal part 100 g.',
        knownTotal: 10,
        knownGroupSize: 100,
        quotient: 10,
        unitLabel: 'g',
        blankVisualType: 'open-workspace',
        dataDisplay: dataTable('Teacher Edition decomposition', ['Whole', 'Action', 'Each part'], [
          ['1 kg of rice', 'Draw a ten-frame over the whole bag.', '100 g']
        ])
      }),
      problem({
        number: 3,
        sourcePrompt: 'Illustrate and describe the process of decomposing 100 grams into groups of 10 grams.',
        solvedAnswer: 'Illustrations and descriptions will vary. A valid model shows 100 grams decomposed into ten equal 10-gram groups.',
        equations: ['100 g = 10 x 10 g'],
        blankWorkspaceLabel: 'Zoom into one 100-gram part, draw a new ten-frame, and label each smaller part 10 g.',
        knownTotal: 10,
        knownGroupSize: 10,
        quotient: 10,
        unitLabel: 'g',
        blankVisualType: 'open-workspace',
        dataDisplay: dataTable('Teacher Edition decomposition', ['Whole', 'Action', 'Each part'], [
          ['100 g of rice', 'Draw a new ten-frame inside one 100 g part.', '10 g']
        ])
      }),
      problem({
        number: 4,
        sourcePrompt: 'Illustrate and describe the process of decomposing 10 grams into groups of 1 gram.',
        solvedAnswer: 'Illustrations and descriptions will vary. A valid model shows 10 grams decomposed into ten equal 1-gram groups.',
        equations: ['10 g = 10 x 1 g'],
        blankWorkspaceLabel: 'Zoom into one 10-gram part, draw ten equal pieces, and label each piece 1 g.',
        knownTotal: 10,
        knownGroupSize: 1,
        quotient: 10,
        unitLabel: 'g',
        blankVisualType: 'open-workspace',
        dataDisplay: dataTable('Teacher Edition decomposition', ['Whole', 'Action', 'Each part'], [
          ['10 g of rice', 'Draw a new ten-frame inside one 10 g part.', '1 g']
        ])
      }),
      problem({
        number: 5,
        sourcePrompt: 'Compare the two place value charts below. How does today\'s exploration using kilograms and grams relate to your understanding of place value?',
        solvedAnswer: 'Answers will vary. A strong response explains that each mass unit is decomposed into ten of the next smaller unit, just as each place value is decomposed into ten of the place to its right.',
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
    concept: 'First determine the value of each spring-scale interval; different scales can count by 500 g, 200 g, 100 g, or 20 g. Then use 1 kg, 100 g, 10 g, and 1 g benchmarks to estimate and check familiar objects.',
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
    concept: 'Read exact scale weights, estimate mentally, and use a tape diagram to distinguish joining, comparing, equal groups, and sharing. The operation follows the weight relationship, not a keyword.',
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
    concept: 'When metric units match, model the whole, parts, comparison, or equal groups before choosing addition, subtraction, multiplication, or division. Use place-value and mental strategies to simplify the calculation.',
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
      problem({
        number: 1,
        sourcePrompt: 'Round to the nearest ten. Use the number line to model your thinking. a. 32. b. 36. c. 62. d. 162. e. 278. f. 405.',
        solvedAnswer: 'a. 32 rounds to 30. b. 36 rounds to 40. c. 62 rounds to 60. d. 162 rounds to 160. e. 278 rounds to 280. f. 405 rounds to 410. Each answer is modeled on a vertical number line.',
        equations: ['32 ~= 30', '36 ~= 40', '62 ~= 60', '162 ~= 160', '278 ~= 280', '405 ~= 410'],
        numberLineModels: [32, 36, 62, 162, 278, 405].map((value) => nearestTenLine(value))
      }),
      problem({
        number: 2,
        sourcePrompt: 'Round the weight of each item to the nearest 10 grams. Draw number lines to model your thinking: 36 grams, 52 grams, and 142 grams.',
        solvedAnswer: 'The rounded weights are 40 grams, 50 grams, and 140 grams. Each row also needs a labeled number line model.',
        equations: ['36 g ~= 40 g', '52 g ~= 50 g', '142 g ~= 140 g'],
        numberLineModels: [36, 52, 142].map((value) => nearestTenLine(value, 'g'))
      }),
      problem({
        number: 3,
        sourcePrompt: 'Carl\'s basketball game begins at 3:03 p.m. and ends at 3:51 p.m. a. How many minutes did Carl\'s basketball game last? b. Round the total number of minutes in the game to the nearest 10 minutes.',
        solvedAnswer: 'a. Carl\'s basketball game lasted 48 minutes. b. 48 minutes rounds to 50 minutes.',
        equations: ['3:51 - 3:03 = 48', '48 ~= 50'],
        numberLineModels: [nearestTenLine(48, 'min')],
        quotient: 50,
        unitLabel: 'minutes'
      })
    ]
  }),
  14: lesson({
    lessonNumber: 14,
    title: 'round to the nearest hundred',
    concept: 'Use lower hundred, halfway, and upper hundred to round.',
    contrast: 'Numbers at halfway or above round to the upper hundred.',
    summary: 'Round to the nearest hundred by comparing to the halfway hundred.',
    problems: [
      problem({
        number: 1,
        sourcePrompt: 'Round to the nearest hundred. Use the number line to model your thinking. a. 143. b. 286. c. 320. d. 1,320. e. 1,572. f. 1,250.',
        solvedAnswer: 'a. 143 rounds to 100. b. 286 rounds to 300. c. 320 rounds to 300. d. 1,320 rounds to 1,300. e. 1,572 rounds to 1,600. f. 1,250 rounds to 1,300. Each answer is modeled on a vertical number line.',
        equations: ['143 ≈ 100', '286 ≈ 300', '320 ≈ 300', '1,320 ≈ 1,300', '1,572 ≈ 1,600', '1,250 ≈ 1,300'],
        explanation: 'For each number, label the lower hundred, the halfway point, and the upper hundred. A number below halfway rounds down; a number at or above halfway rounds up.',
        checks: [
          'All six numbers and rounded answers match the Lesson 14 Answer Key.',
          'Every answer is supported by its own vertical number line.',
          'The halfway case 1,250 rounds up to 1,300.'
        ],
        numberLineModels: [143, 286, 320, 1320, 1572, 1250].map((value) => nearestHundredLine(value))
      }),
      problem({
        number: 2,
        sourcePrompt: 'Complete the chart. a. Shauna has 480 stickers. Round the number of stickers to the nearest hundred. b. There are 525 pages in a book. Round the number of pages to the nearest hundred. c. A container holds 750 milliliters of water. Round the capacity to the nearest 100 milliliters. d. Glen spends $1,297 on a new computer. Round the amount Glen spends to the nearest $100. e. The drive between two cities is 1,842 kilometers. Round the distance to the nearest 100 kilometers.',
        solvedAnswer: 'a. 500 stickers. b. 500 pages. c. 800 mL. d. $1,300. e. 1,800 km.',
        equations: ['480 ≈ 500', '525 ≈ 500', '750 ≈ 800', '$1,297 ≈ $1,300', '1,842 km ≈ 1,800 km'],
        explanation: 'Compare each quantity with the halfway value between its two surrounding hundreds. The halfway values are 450, 550, 750, 1,250, and 1,850.',
        checks: [
          'The names, contexts, quantities, and units match the official Lesson 14 Problem Set.',
          'All five rounded values match the Lesson 14 Answer Key.',
          'Each chart row is paired with a vertical number line showing lower hundred, halfway, upper hundred, target, and rounded endpoint.'
        ],
        dataDisplay: dataTable('Nearest hundred chart', ['Source item', 'Rounded answer'], [['480 stickers', '____ stickers'], ['525 pages', '____ pages'], ['750 mL', '____ mL'], ['$1,297', '$____'], ['1,842 km', '____ km']]),
        solvedDataDisplay: dataTable('Nearest hundred chart', ['Source item', 'Rounded answer'], [['480 stickers', '500 stickers'], ['525 pages', '500 pages'], ['750 mL', '800 mL'], ['$1,297', '$1,300'], ['1,842 km', '1,800 km']]),
        numberLineModels: [
          nearestHundredLine(480, 'stickers'),
          nearestHundredLine(525, 'pages'),
          nearestHundredLine(750, 'mL'),
          nearestHundredLine(1297, '', '$'),
          nearestHundredLine(1842, 'km')
        ]
      }),
      problem({
        number: 3,
        sourcePrompt: 'Circle the numbers that round to 600 when rounding to the nearest hundred: 527, 550, 639, 681, 713, and 603.',
        solvedAnswer: 'Circle 550, 639, and 603. These—and only these choices—round to 600.',
        equations: ['527 ≈ 500', '550 ≈ 600', '639 ≈ 600', '681 ≈ 700', '713 ≈ 700', '603 ≈ 600'],
        explanation: 'Whole numbers from 550 through 649 round to 600. Check each choice against that interval: 550, 639, and 603 are inside it; 527, 681, and 713 are outside it.',
        checks: [
          'The six choices match the official Lesson 14 Problem Set.',
          '550, 639, and 603 match the Lesson 14 Answer Key.',
          'All six choices have individual number-line evidence, including the three choices that do not round to 600.'
        ],
        dataDisplay: dataTable('Which numbers round to 600?', ['Number', 'Circle or leave?'], [['527', '____'], ['550', '____'], ['639', '____'], ['681', '____'], ['713', '____'], ['603', '____']]),
        solvedDataDisplay: dataTable('Which numbers round to 600?', ['Number', 'Decision'], [['527', 'Leave: rounds to 500'], ['550', 'Circle: rounds to 600'], ['639', 'Circle: rounds to 600'], ['681', 'Leave: rounds to 700'], ['713', 'Leave: rounds to 700'], ['603', 'Circle: rounds to 600']]),
        numberLineModels: [527, 550, 639, 681, 713, 603].map((value) => nearestHundredLine(value))
      }),
      problem({
        number: 4,
        sourcePrompt: 'The teacher asks students to round 1,865 to the nearest hundred. Christian says that it is one thousand, nine hundred. Alexis disagrees and says it is 19 hundreds. Who is correct? Explain your thinking.',
        solvedAnswer: 'Both are correct. Since 1,865 is above the halfway point of 1,850, it rounds to 1,900. The value 1,900 is also 19 hundreds because 19 × 100 = 1,900.',
        equations: ['1,800 < 1,850 < 1,865 < 1,900', '1,865 ≈ 1,900', '19 × 100 = 1,900', '1,900 = 19 hundreds'],
        explanation: 'First use the vertical number line to justify the rounded value. Then use place-value unit form to show that Christian and Alexis named the same value in two different ways.',
        checks: [
          'The disagreement and question match the official Lesson 14 Problem Set.',
          'The rounded value and both-correct conclusion match the Lesson 14 Answer Key.',
          'The explanation proves both the rounding decision and the equivalence of 1,900 and 19 hundreds.'
        ],
        numberLineModels: [nearestHundredLine(1865)]
      })
    ]
  }),
  15: lesson({
    lessonNumber: 15,
    title: 'add measurements composing once',
    concept: 'Add same-unit measurements with mental math or the standard algorithm, composing when needed.',
    contrast: 'Line up units and place values before adding.',
    summary: 'Measurement addition follows place value and keeps units attached.',
    problems: [
      problem({
        number: 1,
        sourcePrompt: 'Find the sums below. Choose mental math or the algorithm. a. 46 mL + 5 mL. b. 46 mL + 25 mL. c. 46 mL + 125 mL. d. 59 cm + 30 cm. e. 509 cm + 83 cm. f. 597 cm + 30 cm. g. 29 g + 63 g. h. 345 g + 294 g. i. 480 g + 476 g. j. 1 L 245 mL + 2 L 412 mL. k. 2 kg 509 g + 3 kg 367 g.',
        solvedAnswer: 'a. 51 mL. b. 71 mL. c. 171 mL. d. 89 cm. e. 592 cm. f. 627 cm. g. 92 g. h. 639 g. i. 956 g. j. 3 L 657 mL. k. 5 kg 876 g.',
        equations: ['46 mL + 5 mL = 51 mL', '46 mL + 25 mL = 71 mL', '46 mL + 125 mL = 171 mL', '59 cm + 30 cm = 89 cm', '509 cm + 83 cm = 592 cm', '597 cm + 30 cm = 627 cm', '29 g + 63 g = 92 g', '345 g + 294 g = 639 g', '480 g + 476 g = 956 g', '1 L 245 mL + 2 L 412 mL = 3 L 657 mL', '2 kg 509 g + 3 kg 367 g = 5 kg 876 g'],
        explanation: 'Choose mental math when a friendly benchmark makes the sum immediate. Otherwise align equal place values, add from right to left, and compose one larger unit when a column reaches 10 or more. In j and k, add liters with liters and milliliters with milliliters, or kilograms with kilograms and grams with grams.',
        checks: ['All eleven expressions match the official Lesson 15 Problem Set.', 'All eleven sums match the Lesson 15 Answer Key.', 'Each final answer preserves the source measurement unit or compound units.'],
        dataDisplay: dataTable('Lesson 15 addition record', ['Item', 'Source expression', 'Sum'], [['a', '46 mL + 5 mL', '____ mL'], ['b', '46 mL + 25 mL', '____ mL'], ['c', '46 mL + 125 mL', '____ mL'], ['d', '59 cm + 30 cm', '____ cm'], ['e', '509 cm + 83 cm', '____ cm'], ['f', '597 cm + 30 cm', '____ cm'], ['g', '29 g + 63 g', '____ g'], ['h', '345 g + 294 g', '____ g'], ['i', '480 g + 476 g', '____ g'], ['j', '1 L 245 mL + 2 L 412 mL', '____ L ____ mL'], ['k', '2 kg 509 g + 3 kg 367 g', '____ kg ____ g']]),
        solvedDataDisplay: dataTable('Lesson 15 addition record', ['Item', 'Source expression', 'Checked sum'], [['a', '46 mL + 5 mL', '51 mL'], ['b', '46 mL + 25 mL', '71 mL'], ['c', '46 mL + 125 mL', '171 mL'], ['d', '59 cm + 30 cm', '89 cm'], ['e', '509 cm + 83 cm', '592 cm'], ['f', '597 cm + 30 cm', '627 cm'], ['g', '29 g + 63 g', '92 g'], ['h', '345 g + 294 g', '639 g'], ['i', '480 g + 476 g', '956 g'], ['j', '1 L 245 mL + 2 L 412 mL', '3 L 657 mL'], ['k', '2 kg 509 g + 3 kg 367 g', '5 kg 876 g']])
      }),
      problem({
        number: 2,
        sourcePrompt: 'Nadine and Jen buy a small bag of popcorn and a pretzel at the movie theater. The pretzel weighs 63 grams more than the popcorn. What is the weight of the pretzel? The source tape diagram labels the popcorn as 44 grams.',
        solvedAnswer: 'The pretzel weighs 107 grams.',
        equations: ['44 g + 63 g = 107 g'],
        explanation: 'The tape shows the pretzel as the 44-gram popcorn plus 63 more grams, so add the two parts.',
        checks: ['The story wording and 44-gram diagram value match the official Problem Set.', '44 g + 63 g = 107 g matches the Answer Key.', 'The tape diagram keeps both known parts visible.'],
        quotient: 107,
        unitLabel: 'grams',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split',
        knownGroupCount: 2,
        shareLabels: ['popcorn', 'more']
      }),
      problem({
        number: 3,
        sourcePrompt: 'In math class, Jason and Andrea find the total liquid volume of water in their beakers. Jason says the total is 782 milliliters, but Andrea says it is 792 milliliters. The amount of water in each beaker can be found in the table to the right. Show whose calculation is correct. Explain the mistake of the other student.',
        solvedAnswer: 'Andrea is correct: 475 mL + 317 mL = 792 mL. Jason forgot to include the ten composed from 5 ones + 7 ones = 12 ones, so his tens digit is 1 too small.',
        equations: ['475 mL + 317 mL = 792 mL', '5 ones + 7 ones = 12 ones', '7 tens + 1 ten + 1 composed ten = 9 tens'],
        explanation: 'Add the ones first, compose 10 ones as 1 ten, and include that new ten when adding the tens column.',
        checks: ['The two student claims and source table values match the official Problem Set.', '792 mL and Andrea are confirmed by the Answer Key.', 'The explanation identifies Jason’s missed composed ten.'],
        quotient: 792,
        unitLabel: 'milliliters',
        dataDisplay: dataTable('Student liquid-volume table', ['Student', 'Liquid volume'], [['Jason', '475 mL'], ['Andrea', '317 mL']]),
        solvedDataDisplay: dataTable('Student liquid-volume table', ['Student', 'Liquid volume'], [['Jason', '475 mL'], ['Andrea', '317 mL']], 'The two beaker amounts total 792 mL.')
      }),
      problem({
        number: 4,
        sourcePrompt: 'It takes Greg 15 minutes to mow the front lawn. It takes him 17 more minutes to mow the back lawn than the front lawn. What is the total amount of time Greg spends mowing the lawns?',
        solvedAnswer: 'The back lawn takes 32 minutes, and Greg spends 47 minutes mowing both lawns.',
        equations: ['15 min + 17 min = 32 min', '15 min + 32 min = 47 min'],
        explanation: 'This is a two-step problem: first find the back-lawn time, then add the front- and back-lawn times.',
        checks: ['The wording and quantities match the official Problem Set.', '47 minutes matches the Lesson 15 Answer Key.', 'The visual separates the intermediate 32-minute result from the 47-minute total.'],
        quotient: 47,
        unitLabel: 'minutes',
        dataDisplay: dataTable('Greg’s two-step mowing record', ['Quantity', 'Work'], [['Front lawn', '15 min'], ['Back lawn', '15 min + 17 min = ____ min'], ['Both lawns', '15 min + ____ min = ____ min']]),
        solvedDataDisplay: dataTable('Greg’s two-step mowing record', ['Quantity', 'Checked work'], [['Front lawn', '15 min'], ['Back lawn', '15 min + 17 min = 32 min'], ['Both lawns', '15 min + 32 min = 47 min']])
      })
    ]
  }),
  16: lesson({
    lessonNumber: 16,
    title: 'add measurements composing twice',
    concept: 'Some sums require composing across more than one place.',
    contrast: 'Regroup each place value as needed and keep compound units separate.',
    summary: 'Compose twice when needed, then write the compound measurement accurately.',
    problems: [
      problem({
        number: 1,
        sourcePrompt: 'Find the sums below. a. 52 mL + 68 mL. b. 352 mL + 68 mL. c. 352 mL + 468 mL. d. 56 cm + 94 cm. e. 506 cm + 94 cm. f. 506 cm + 394 cm. g. 697 g + 138 g. h. 345 g + 597 g. i. 486 g + 497 g. j. 3 L 251 mL + 1 L 549 mL. k. 4 kg 384 g + 2 kg 467 g.',
        solvedAnswer: 'a. 120 mL. b. 420 mL. c. 820 mL. d. 150 cm. e. 600 cm. f. 900 cm. g. 835 g. h. 942 g. i. 983 g. j. 4 L 800 mL. k. 6 kg 851 g.',
        equations: ['52 mL + 68 mL = 120 mL', '352 mL + 68 mL = 420 mL', '352 mL + 468 mL = 820 mL', '56 cm + 94 cm = 150 cm', '506 cm + 94 cm = 600 cm', '506 cm + 394 cm = 900 cm', '697 g + 138 g = 835 g', '345 g + 597 g = 942 g', '486 g + 497 g = 983 g', '3 L 251 mL + 1 L 549 mL = 4 L 800 mL', '4 kg 384 g + 2 kg 467 g = 6 kg 851 g'],
        explanation: 'Align like place values and add from right to left. When the ones total 10 or more, compose a ten; when the tens total 10 or more, compose a hundred. Keep compound units in separate aligned columns.',
        checks: ['All eleven expressions match the official Lesson 16 Problem Set.', 'All eleven sums match the Lesson 16 Answer Key.', 'The place-value model demonstrates both compositions with 352 mL + 468 mL.'],
        dataDisplay: dataTable('Lesson 16 addition record', ['Item', 'Source expression', 'Sum'], [['a', '52 mL + 68 mL', '____ mL'], ['b', '352 mL + 68 mL', '____ mL'], ['c', '352 mL + 468 mL', '____ mL'], ['d', '56 cm + 94 cm', '____ cm'], ['e', '506 cm + 94 cm', '____ cm'], ['f', '506 cm + 394 cm', '____ cm'], ['g', '697 g + 138 g', '____ g'], ['h', '345 g + 597 g', '____ g'], ['i', '486 g + 497 g', '____ g'], ['j', '3 L 251 mL + 1 L 549 mL', '____ L ____ mL'], ['k', '4 kg 384 g + 2 kg 467 g', '____ kg ____ g']]),
        solvedDataDisplay: dataTable('Lesson 16 addition record', ['Item', 'Source expression', 'Checked sum'], [['a', '52 mL + 68 mL', '120 mL'], ['b', '352 mL + 68 mL', '420 mL'], ['c', '352 mL + 468 mL', '820 mL'], ['d', '56 cm + 94 cm', '150 cm'], ['e', '506 cm + 94 cm', '600 cm'], ['f', '506 cm + 394 cm', '900 cm'], ['g', '697 g + 138 g', '835 g'], ['h', '345 g + 597 g', '942 g'], ['i', '486 g + 497 g', '983 g'], ['j', '3 L 251 mL + 1 L 549 mL', '4 L 800 mL'], ['k', '4 kg 384 g + 2 kg 467 g', '6 kg 851 g']])
      }),
      problem({
        number: 2,
        sourcePrompt: 'Lane makes sauerkraut. He weighs the amounts of cabbage and salt he uses. Draw and label a tape diagram to find the total weight of the cabbage and salt Lane uses. The source tape diagram labels the parts 907 grams and 93 grams.',
        solvedAnswer: 'Lane uses 1,000 grams in total, which is 1 kilogram.',
        equations: ['907 g + 93 g = 1,000 g', '1,000 g = 1 kg'],
        explanation: 'The source tape has two parts. Adding 907 grams and 93 grams completes a full 1,000 grams, which can be renamed as 1 kilogram.',
        checks: ['The story, tape instruction, and diagram values match the official Problem Set.', '1,000 grams and the labeled tape match the Answer Key.', 'The solution explicitly connects 1,000 g to 1 kg.'],
        quotient: 1000,
        unitLabel: 'grams',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split',
        knownGroupCount: 2,
        shareLabels: ['cabbage', 'salt']
      }),
      problem({
        number: 3,
        sourcePrompt: 'Sue bakes mini-muffins for the school bake sale. After wrapping 86 muffins, she still has 58 muffins left cooling on the table. How many muffins did she bake altogether?',
        solvedAnswer: 'Sue baked 144 muffins altogether.',
        equations: ['86 muffins + 58 muffins = 144 muffins'],
        explanation: 'The wrapped muffins and cooling muffins are two parts of the total baked, so add 86 and 58. Compose once in the ones and once in the tens.',
        checks: ['The complete school-bake-sale wording matches the official Problem Set.', '144 muffins matches the Lesson 16 Answer Key.', 'The two source parts remain visible in the model.'],
        quotient: 144,
        unitLabel: 'muffins',
        knownGroupCount: 2,
        shareLabels: ['wrapped', 'cooling']
      }),
      problem({
        number: 4,
        sourcePrompt: 'The milk carton to the right holds 183 milliliters more liquid than the juice box. What is the total capacity of the juice box and milk carton? The source diagram labels the juice box 279 milliliters and the milk carton unknown.',
        solvedAnswer: 'The milk carton holds 462 milliliters. The juice box and milk carton hold 741 milliliters in total.',
        equations: ['279 mL + 183 mL = 462 mL', '279 mL + 462 mL = 741 mL'],
        explanation: 'First add 183 milliliters to the juice-box capacity to find the milk-carton capacity. Then add the two container capacities.',
        checks: ['The official wording and diagram values are preserved separately.', '741 mL matches the Lesson 16 Answer Key.', 'The visual shows the intermediate 462 mL capacity before the 741 mL total.'],
        quotient: 741,
        unitLabel: 'milliliters',
        dataDisplay: dataTable('Container capacities', ['Container', 'Capacity'], [['Juice box', '279 mL'], ['Milk carton', '____ mL'], ['Combined capacity', '____ mL']]),
        solvedDataDisplay: dataTable('Container capacities', ['Container', 'Checked capacity'], [['Juice box', '279 mL'], ['Milk carton', '462 mL'], ['Combined capacity', '741 mL']])
      })
    ]
  }),
  17: lesson({
    lessonNumber: 17,
    title: 'estimate sums by rounding',
    concept: 'Compare estimates made by rounding to hundreds, tens, and fifties. For addition, the closest estimate often occurs when one rounding error moves up and the other moves down so the errors balance.',
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
      problem({ number: 2, sourcePrompt: 'Camden uses a total of 372 liters of gas in two months. He uses 184 liters of gas in the first month. How many liters of gas does he use in the second month?', solvedAnswer: 'Second month = 188 L; estimates will vary.', equations: ['372 L - 184 L = 188 L', '400 L - 200 L = 200 L'], quotient: 188, unitLabel: 'liters', blankVisualType: 'tape-diagram', animationType: 'tape-split', numberLineModels: [nearestHundredLine(372, 'L'), nearestHundredLine(184, 'L')] }),
      problem({ number: 3, sourcePrompt: 'The pear, apple, and peach weigh 500 grams total. The pear and apple together weigh 372 grams. How much does the peach weigh?', solvedAnswer: 'The peach weighs 128 g; estimates and explanations will vary.', equations: ['500 g - 372 g = 128 g', '372 g ≈ 370 g; 500 g - 370 g = 130 g'], quotient: 128, unitLabel: 'grams', blankVisualType: 'tape-diagram', animationType: 'tape-split', numberLineModels: [nearestTenLine(372, 'g')] })
    ]
  }),
  21: lesson({
    lessonNumber: 21,
    title: 'estimate and solve mixed measurement problems',
    concept: 'Measure real masses, lengths, and liquid volumes; round the measured values; estimate; solve with the exact values; and use the gap between estimate and exact answer as evidence of reasonableness.',
    contrast: 'Use rounded values for estimates and exact values for final answers.',
    summary: 'Round first when asked, then solve exactly and explain reasonableness.',
    problems: [
      problem({
        number: 1,
        sourcePrompt: 'Weigh the bags of beans and rice on the scale. Then, write the weight on the scales below. Estimate and find the total weight and difference, then explain whether the answers are reasonable.',
        solvedAnswer: 'Beans weigh 91 g and rice weighs 58 g. The estimated total is 150 g, the actual total is 149 g, the estimated difference is 30 g, and the actual difference is 33 g.',
        equations: ['91 g + 58 g ≈ 90 g + 60 g = 150 g', '91 g + 58 g = 149 g', '91 g - 58 g ≈ 90 g - 60 g = 30 g', '91 g - 58 g = 33 g'],
        blankWorkspaceLabel: 'Read both virtual scales, then complete the official estimate, actual, and reasonableness sequence.'
      }),
      problem({
        number: 2,
        sourcePrompt: 'Measure the lengths of the three pieces of yarn. Estimate and find the total length of Yarn A and Yarn C. Then subtract to estimate and find the difference between that total and Yarn B.',
        solvedAnswer: 'Yarn A is 64 cm, Yarn B is 88 cm, and Yarn C is 38 cm. A + C is 102 cm, estimated as 100 cm. The difference from Yarn B is 14 cm, estimated as 10 cm.',
        equations: ['64 cm ≈ 60 cm', '88 cm ≈ 90 cm', '38 cm ≈ 40 cm', '64 cm + 38 cm = 102 cm', '60 cm + 40 cm = 100 cm', '102 cm - 88 cm = 14 cm', '100 cm - 90 cm = 10 cm'],
        quotient: 14,
        unitLabel: 'centimeters',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split',
        blankWorkspaceLabel: 'Measure and round each yarn before completing the estimate, exact sum, difference, and tape diagram.'
      }),
      problem({
        number: 3,
        sourcePrompt: 'Plot the amount of liquid in Containers D, E, and F on the number lines. Then, round to the nearest 10 milliliters. Estimate and find the total amount, then estimate and find the difference between Containers D and E.',
        solvedAnswer: 'Container D is 212 mL ≈ 210 mL, Container E is 238 mL ≈ 240 mL, and Container F is 195 mL ≈ 200 mL. The actual total is 645 mL, and D to E differs by 26 mL.',
        equations: ['212 mL ≈ 210 mL', '238 mL ≈ 240 mL', '195 mL ≈ 200 mL', '210 mL + 240 mL + 200 mL = 650 mL', '212 mL + 238 mL + 195 mL = 645 mL', '240 mL - 210 mL = 30 mL', '238 mL - 212 mL = 26 mL'],
        quotient: 26,
        unitLabel: 'milliliters',
        blankVisualType: 'tape-diagram',
        animationType: 'tape-split',
        numberLineModels: [nearestTenLine(212, 'mL'), nearestTenLine(238, 'mL'), nearestTenLine(195, 'mL')],
        blankWorkspaceLabel: 'Plot all three measured capacities, round each to the nearest ten, then solve and model both source questions.'
      }),
      problem({ number: 4, sourcePrompt: 'Shane watches a movie in the theater that is 115 minutes long, including the trailers. The trailer lengths are 5, 4, 3, 5, and 4 minutes.', solvedAnswer: 'Trailers total 21 minutes; movie without trailers is 94 minutes. Estimates will vary.', equations: ['5 min + 4 min + 3 min + 5 min + 4 min = 21 min', '115 min - 21 min = 94 min'], quotient: 94, unitLabel: 'minutes', blankWorkspaceLabel: 'Total the five source trailer lengths, estimate the movie-only time, solve exactly, and justify reasonableness.' })
    ]
  })
};
