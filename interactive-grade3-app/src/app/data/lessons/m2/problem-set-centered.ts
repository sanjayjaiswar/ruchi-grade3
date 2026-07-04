import type {
  ProblemSetAnimationType,
  ProblemSetBlankVisualType,
  ProblemSetCenteredLesson,
  ProblemSetCenteredProblem,
  ProblemSetDataDisplay,
  ProblemSetNumberLineModel
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
    1: 'Times will vary.',
    2: 'Times will vary.',
    3: 'Times will vary.',
    4: 'Times will vary.',
    5: 'Times will vary.',
    6: 'Times will vary.'
  },
  2: {
    1: 'a. First and last tick marks labeled as 7:00 a.m. and 8:00 a.m.; b. each interval labeled by fives up to 8:00 a.m.; c. D at 7:10 a.m.; d. E at 7:35 a.m.; e. T at 7:40 a.m.; f. L at 7:45 a.m.; g. W at 7:55 a.m.',
    2: 'Every 5 minutes labeled below the number line. First clock not matched; second clock 5:50 p.m.; third clock 5:15 p.m.; fourth clock not matched; fifth clock 5:40 p.m.; last clock 5:25 p.m.',
    3: 'First and last tick marks labeled 5:00 p.m. and 6:00 p.m.; each interval labeled by fives up to 6:00 p.m.; 5:45 p.m. located and plotted on the number line.',
    4: 'Answers will vary.'
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
    1: 'Illustrations and descriptions will vary.',
    2: 'Illustrations and descriptions will vary.',
    3: 'Illustrations and descriptions will vary.',
    4: 'Illustrations and descriptions will vary.',
    5: 'Answers will vary.'
  },
  7: {
    1: 'A-D. Objects and weights will vary.',
    2: 'E. 1. grams; 2. kilograms; 3. grams; 4. kilograms; 5. kilograms; 6. grams.',
    3: 'F. 2 kilograms since 1 bottle of water weighs about 1 kilogram.',
    4: 'G. Yes; 10 units of 100 grams equal 1000 grams, which is the same as 1 kilogram.'
  },
  8: {
    1: '464; 355.',
    2: 'a. 78; problem modeled with tape diagram. b. 8; problem modeled with tape diagram.',
    3: 'Tape diagram drawn correctly; about 15 kg.',
    4: 'a. About 3 kg; b. About 21 kg.'
  },
  9: {
    1: 'a. Predictions will vary. b. Answers will vary.',
    2: 'c. Illustrations and descriptions will vary.',
    3: 'd. Illustrations and descriptions will vary.',
    4: 'e. Illustrations and descriptions will vary. f. They both break apart into 1 thousand units. 1 liter is 1000 milliliters, and 1 kilogram is 1000 grams.',
    5: 'g. 1 gram; 1 liter is the same as 1 kilogram, and they break apart the same way into 1 thousand units.'
  },
  10: {
    1: 'Vertical number line on container labeled by hundreds. a. 500 mL; reasons will vary. b. Explanations will vary. c. 700 mL.',
    2: '3 L; 6 L; 4 L; 0 L.',
    3: '400 mL; 200 mL; 1000 mL; 700 mL.',
    4: 'a. Capacity of each barrel plotted and labeled correctly on number line. b. Barrel C. c. Barrel D. d. Barrel B because it is closest to 70 mL OR Barrel A because it has enough capacity to hold 70 L. e. Number line used to find answer; 28 more liters.'
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
    1: 'Measurements and estimates will vary.',
    2: 'Measurements and estimates will vary.',
    3: 'Measurements and estimates will vary.',
    4: 'Measurements and estimates will vary.'
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
    4: 'Both are correct; explanations will vary.'
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
    4: 'a. 21 min. b. Estimates will vary; actual: 94 min. c. Because the estimate is close to the actual answer.'
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
    1: 'Follow the directions to label the number line: Ingrid gets ready for school between 7:00 a.m. and 8:00 a.m.; label the endpoints, label each 5-minute interval, and plot D at 7:10, E at 7:35, T at 7:40, L at 7:45, and W at 7:55.',
    2: 'Label every 5 minutes below the 5:00 p.m. to 6:00 p.m. number line. Draw a line from each clock to the point on the number line that shows its time. Not all clocks have matching points.',
    3: 'Noah uses a number line to locate 5:45 p.m. Each interval is 5 minutes. The number line shows the hour from 5 p.m. to 6 p.m. Label the number line to show his work.',
    4: 'Tanner tells his friend, "Meet me at the park at 11:25 p.m." His friend says, "I can\'t meet you then because I will be sleeping!" Tanner says, "I meant 11:25 a.m." Do you agree with Tanner\'s friend? Explain.'
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
    4: 'The chart shows the capacity of 4 barrels: A 75 liters, B 68 liters, C 96 liters, D 52 liters. Label the number line, identify greatest and smallest capacity, decide which barrel Ben most likely bought if it holds about 70 liters, and find how many more liters Barrel C can hold than Barrel B.'
  },
  11: {
    1: 'The total weight of a can of tomatoes and a jar of baby food is 671 grams. a. The jar weighs 113 grams. How much does the can weigh? b. How much more does the can weigh than the jar?',
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
    1: 'Round to the nearest ten. Use the number line to model your thinking for 32, 36, 62, 162, 278, and 405.',
    2: 'Round the weight of each item to the nearest 10 grams. Draw number lines to model your thinking for 36 grams, 52 grams, and 142 grams.',
    3: 'Carl\'s basketball game begins at 3:03 p.m. and ends at 3:51 p.m. a. How many minutes did the game last? b. Round the total number of minutes to the nearest 10 minutes.'
  },
  14: {
    1: 'Round to the nearest hundred. Use the number line to model your thinking for 143, 286, 320, 1,320, 1,572, and 1,250.',
    2: 'Complete the chart by rounding 480 stickers, 525 pages, 750 milliliters, $1,297, and 1,842 kilometers to the nearest hundred.',
    3: 'Circle the numbers that round to 600 when rounding to the nearest hundred: 527, 550, 639, 681, 713, and 603.',
    4: 'The teacher asks students to round 1,865 to the nearest hundred. Christian says it is one thousand, nine hundred. Alexis says it is 19 hundreds. Who is correct? Explain.'
  },
  15: {
    1: 'Find the sums. Choose mental math or the algorithm for the eleven measurement addition problems in milliliters, centimeters, grams, liters/milliliters, and kilograms/grams.',
    2: 'Nadine and Jen buy popcorn and a pretzel. The pretzel weighs 63 grams more than the 44-gram popcorn. What is the weight of the pretzel?',
    3: 'Jason and Andrea find the total liquid volume in their beakers. Jason says 782 milliliters, but Andrea says 792 milliliters. Jason has 475 mL and Andrea has 317 mL. Show whose calculation is correct and explain the mistake.',
    4: 'Greg takes 15 minutes to mow the front lawn. The back lawn takes 17 more minutes than the front lawn. What is the total amount of time Greg spends mowing the lawns?'
  },
  16: {
    1: 'Find the sums for the eleven measurement addition problems in milliliters, centimeters, grams, liters/milliliters, and kilograms/grams.',
    2: 'Lane makes sauerkraut. He uses 907 grams of cabbage and 93 grams of salt. Draw and label a tape diagram to find the total weight.',
    3: 'Sue bakes mini-muffins. After wrapping 86 muffins, she still has 58 muffins cooling. How many muffins did she bake altogether?',
    4: 'The milk carton holds 183 milliliters more liquid than the 279 mL juice box. What is the total capacity of the juice box and milk carton?'
  },
  17: {
    1: 'a. Find the actual sum either on paper or using mental math. Round each addend to the nearest hundred, and find the estimated sums. Circle the estimated sum that is the closest to its real sum. b. Look at the sums that gave the most precise estimates. Explain what they have in common.',
    2: 'Janet watched a 94-minute movie on Friday night and a 151-minute movie on Saturday night. a. Decide how to round the minutes and estimate the total. b. How much time did Janet actually spend watching movies? c. Explain whether the estimate is close to the actual sum. Round in a different way and compare.',
    3: 'Sadie, a bear at the zoo, weighs 182 kilograms. Her cub weighs 74 kilograms. a. Estimate the total weight using the method you think best. b. What is the actual weight? Model the problem with a tape diagram.'
  },
  18: {
    1: 'Solve the eleven subtraction problems in milliliters, centimeters, grams, kilometers/meters, and kilograms/grams.',
    2: 'The total weight of 3 books is 405 grams. If 2 books weigh 233 grams, how much does the third book weigh? Use a tape diagram to model the problem.',
    3: 'The chart shows movie lengths. Champions is 22 minutes shorter than The Lost Ship at 117 minutes, and Magical Forests is 145 minutes. a. How long is Champions? b. How much longer is Magical Forests than Champions?',
    4: 'The total length of a rope is 208 centimeters. Scott cuts it into 3 pieces: 80 centimeters, 94 centimeters, and a third piece. How long is the third piece?'
  },
  19: {
    1: 'Solve the eight subtraction problems in centimeters, grams, milliliters, kilometers/meters, and liters/milliliters.',
    2: 'David is driving from Los Angeles to San Francisco. The total distance is 617 kilometers, and he has 468 kilometers left. How many kilometers has he driven so far?',
    3: 'The piano weighs 289 kilograms more than the piano bench. The piano weighs 297 kilograms. How much does the bench weigh?',
    4: 'Tank A holds 165 fewer liters of water than Tank B. Tank B holds 400 liters. How much water does Tank A hold?'
  },
  20: {
    1: 'a. Find the actual differences either on paper or using mental math. Round each total and part to the nearest hundred and find the estimated differences. Circle the estimated differences closest to the actual differences. b. Explain what the most precise estimates have in common.',
    2: 'Camden uses 372 liters of gas in two months. He uses 184 liters in the first month. a. Estimate the amount used in the second month by rounding each number as you think best. b. How many liters does Camden actually use in the second month? Model with a tape diagram.',
    3: 'The pear, apple, and peach weigh 500 grams total. The pear and apple together weigh 372 grams. a. Estimate the weight of the peach by rounding each number as you think best and explain your choice. b. How much does the peach actually weigh? Model with a tape diagram.'
  },
  21: {
    1: 'Weigh the bags of beans and rice on the scale. Then write the weight on the scales. a. Estimate and find the total weight. b. Estimate and find the difference. c. Are your answers reasonable? Explain why.',
    2: 'Measure the lengths of the three pieces of yarn. a. Estimate the total length of Yarn A and Yarn C, then find the actual total. b. Estimate the difference between that total and Yarn B, then find the actual difference. Model with a tape diagram.',
    3: 'Plot the amount of liquid in Containers D, E, and F on the number lines and round to the nearest 10 milliliters. a. Estimate and find the total amount of liquid in the three containers. b. Estimate and find the difference between Containers D and E. Model with a tape diagram.',
    4: 'Shane watches a 115-minute movie including trailers. The chart gives trailer lengths of 5, 4, 3, 5, and 4 minutes. a. Find the total trailer minutes. b. Estimate and find the movie length without trailers. c. Is your answer reasonable? Explain why.'
  }
};

function dataTable(title: string, columns: string[], rows: string[][], note?: string): ProblemSetDataDisplay {
  return { kind: 'data-table', title, columns, rows, note };
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

  return {
    ...item,
    solvedAnswer: officialAnswer,
    equations: item.equations?.length ? item.equations : [officialAnswer],
    explanation: `Teacher Edition Answer Key: ${officialAnswer}`,
    validationChecks: [
      `Solved answer is checked against ${TEACHER_SOURCE}, Lesson ${lessonNumber} Answer Key, Problem Set ${item.number}.`,
      ...item.validationChecks
    ]
  };
}

function applyTeacherPrompt(lessonNumber: number, item: ProblemSetCenteredProblem): ProblemSetCenteredProblem {
  const officialPrompt = TEACHER_PROBLEM_PROMPTS[lessonNumber]?.[item.number];
  if (!officialPrompt) {
    return item;
  }

  return {
    ...item,
    sourcePrompt: officialPrompt,
    blankPrompts: [officialPrompt]
  };
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
    equations: seed.equations ?? [seed.solvedAnswer],
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
    problems: seed.problems.map((item) => applyTeacherAnswerKey(seed.lessonNumber, applyTeacherPrompt(seed.lessonNumber, 'validationChecks' in item ? item : problem(item))))
  };
}

const timeTicks = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'];
const tensTicks = ['lower ten', 'halfway', 'upper ten'];
const hundredTicks = ['lower hundred', 'halfway', 'upper hundred'];

export const M2_PROBLEM_SET_CENTERED_LESSONS: Record<number, ProblemSetCenteredLesson> = {
  1: lesson({
    lessonNumber: 1,
    title: 'time is measured in seconds',
    concept: 'A stopwatch measures elapsed seconds for real activities. Times vary, but every answer needs a number and the unit seconds.',
    contrast: 'Record measured seconds, then compare or total the measurements with units.',
    summary: 'Elapsed time is continuous and can be measured, recorded, compared, and totaled.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Use a stopwatch to time snapping your fingers 10 times.', solvedAnswer: 'Answers vary; record the measured seconds.', dataDisplay: dataTable('Stopwatch result', ['Activity', 'Time'], [['Snap 10 times', '____ seconds']]) }),
      problem({ number: 2, sourcePrompt: 'Use a stopwatch to time writing every whole number from 0 to 25.', solvedAnswer: 'Answers vary; record the measured seconds.', dataDisplay: dataTable('Stopwatch result', ['Activity', 'Time'], [['Write 0 to 25', '____ seconds']]) }),
      problem({ number: 3, sourcePrompt: 'Use a stopwatch to time naming 10 animals and record them.', solvedAnswer: 'Answers vary; record 10 animals and elapsed seconds.', dataDisplay: dataTable('Animal timing', ['List', 'Time'], [['10 animals', '____ seconds']]) }),
      problem({ number: 4, sourcePrompt: 'Use a stopwatch to time writing 7 x 8 = 56 fifteen times.', solvedAnswer: 'Answers vary; record the measured seconds.', dataDisplay: dataTable('Equation writing', ['Activity', 'Time'], [['Write 15 equations', '____ seconds']]) }),
      problem({ number: 5, sourcePrompt: 'Measure six group activities with a stopwatch and record each time.', solvedAnswer: 'Answers vary; every activity row should have seconds recorded.', dataDisplay: dataTable('Group activity times', ['Activity', 'Time'], [['Full name', '____ seconds'], ['20 jumping jacks', '____ seconds'], ['Count by twos', '____ seconds'], ['Draw 8 squares', '____ seconds'], ['Count by fours backward', '____ seconds'], ['Teacher names', '____ seconds']]) }),
      problem({ number: 6, sourcePrompt: '100 meter relay: record team member times and total time.', solvedAnswer: 'Answers vary; add all runner times for total team time.', equations: ['runner times added = total time'], dataDisplay: dataTable('Relay timing', ['Name', 'Time'], [['Runner 1', '____ seconds'], ['Runner 2', '____ seconds'], ['Runner 3', '____ seconds'], ['Runner 4', '____ seconds'], ['Total', '____ seconds']]) })
    ]
  }),
  2: lesson({
    lessonNumber: 2,
    title: 'clocks connect to 5-minute number lines',
    concept: 'A one-hour number line can be partitioned into 5-minute intervals to locate clock times.',
    contrast: 'First check the hour interval, then count by fives to the minute mark.',
    summary: 'Use 0-60 minute intervals to connect clock times and number-line positions.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Label Ingrid\'s 7:00 a.m. to 8:00 a.m. number line and plot D, E, T, L, and W.', solvedAnswer: 'D = 7:10, E = 7:35, T = 7:40, L = 7:45, W = 7:55.', equations: ['7:00 + 10 = 7:10', '7:00 + 35 = 7:35', '7:00 + 55 = 7:55'], numberLineModels: [numberLine('7:00 a.m. to 8:00 a.m.', timeTicks, [2, 7, 8, 9, 11])] }),
      problem({ number: 2, sourcePrompt: 'Label 5:00 p.m. to 6:00 p.m. by fives and match clocks. Not all clocks match.', solvedAnswer: '5:15 and 5:40 match the number line; 8:35 does not belong in the 5:00-6:00 interval.', equations: ['5:15 = 15 minutes after 5:00', '5:40 = 40 minutes after 5:00'], numberLineModels: [numberLine('5:00 p.m. to 6:00 p.m.', timeTicks, [3, 8])] }),
      problem({ number: 3, sourcePrompt: 'Label Noah\'s number line to locate 5:45 p.m.', solvedAnswer: '5:45 p.m. is 45 minutes after 5:00 p.m.', equations: ['5:00 + 45 minutes = 5:45'], numberLineModels: [numberLine('5:00 p.m. to 6:00 p.m.', timeTicks, [9])] }),
      problem({ number: 4, sourcePrompt: 'Tanner says 11:25 p.m. comes after 11:20 a.m. Do you agree?', solvedAnswer: 'Yes. 11:25 p.m. is later in the day than 11:20 a.m.', equations: ['a.m. before noon', 'p.m. after noon'], blankVisualType: 'clock-workspace', animationType: 'clock-model', meaning: 'The comparison depends on a.m. and p.m., not only the minute numbers.' })
    ]
  }),
  3: lesson({
    lessonNumber: 3,
    title: 'tell time to the nearest minute',
    concept: 'Count by fives and then ones to read or draw exact minute times.',
    contrast: 'Use the nearest five-minute mark as a benchmark, then count individual minutes.',
    summary: 'Exact time combines the hour, five-minute groups, and extra ones.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Plot points for the clock times and match the clocks to the number line.', solvedAnswer: 'Read each Teacher Edition clock visual, plot its minute count, and match it to the same point.', numberLineModels: [numberLine('7:00 p.m. to 8:00 p.m.', ['7:00', '10', '20', '30', '40', '50', '8:00'])] }),
      problem({ number: 2, sourcePrompt: 'Draw hands for 6:48 a.m.', solvedAnswer: 'Minute hand at 48 minutes; hour hand close to 7.', equations: ['6:48 = 48 minutes after 6:00'], blankVisualType: 'clock-workspace', animationType: 'clock-model' }),
      problem({ number: 3, sourcePrompt: 'Draw hands for 8:23 a.m.', solvedAnswer: 'Minute hand at 23 minutes; hour hand a little past 8.', equations: ['8:23 = 23 minutes after 8:00'], blankVisualType: 'clock-workspace', animationType: 'clock-model' }),
      problem({ number: 4, sourcePrompt: 'Read the clock showing when Rebecca finishes homework.', solvedAnswer: 'Read the exact time from the Teacher Edition clock visual.', blankVisualType: 'clock-workspace', animationType: 'clock-model' }),
      problem({ number: 5, sourcePrompt: 'Read Mason\'s drop-off clock and find the coach arrival time 11 minutes before.', solvedAnswer: 'Read Mason\'s official drop-off time, then subtract 11 minutes.', equations: ['drop-off time - 11 minutes = coach arrival'], blankVisualType: 'clock-workspace', animationType: 'clock-model' })
    ]
  }),
  4: lesson({
    lessonNumber: 4,
    title: 'elapsed time within 1 hour',
    concept: 'Elapsed-time problems ask for start time, end time, or the time interval.',
    contrast: 'Identify which part is unknown before counting forward or backward.',
    summary: 'A number line supports elapsed-time addition and subtraction.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Cole reads from 6:23 p.m. to 6:49 p.m.', solvedAnswer: 'Cole reads for 26 minutes.', equations: ['6:49 - 6:23 = 26 minutes'], quotient: 26, unitLabel: 'minutes', numberLineModels: [numberLine('6:23 to 6:49', ['6:23', '+7', '+20', '6:49'], [3])] }),
      problem({ number: 2, sourcePrompt: 'Natalie finishes practice at 2:45 p.m. after 37 minutes.', solvedAnswer: 'Natalie started at 2:08 p.m.', equations: ['2:45 - 37 minutes = 2:08'], numberLineModels: [numberLine('count back 37 minutes', ['2:08', '+37', '2:45'], [0])] }),
      problem({ number: 3, sourcePrompt: 'Genevieve works from 11:27 a.m. to 11:58 a.m.', solvedAnswer: 'She works for 31 minutes.', equations: ['11:58 - 11:27 = 31 minutes'], quotient: 31, unitLabel: 'minutes', numberLineModels: [numberLine('11:27 to 11:58', ['11:27', '+31', '11:58'], [2])] }),
      problem({ number: 4, sourcePrompt: 'Nate finishes at 4:47 p.m. after 38 minutes.', solvedAnswer: 'Nate started at 4:09 p.m.', equations: ['4:47 - 38 minutes = 4:09'], numberLineModels: [numberLine('count back 38 minutes', ['4:09', '+38', '4:47'], [0])] }),
      problem({ number: 5, sourcePrompt: 'Andrea fishes from 9:03 a.m. for 49 minutes.', solvedAnswer: 'Andrea is done at 9:52 a.m.', equations: ['9:03 + 49 minutes = 9:52'], numberLineModels: [numberLine('9:03 plus 49', ['9:03', '+49', '9:52'], [2])] }),
      problem({ number: 6, sourcePrompt: 'Use the clocks to find Dion\'s walk time to school.', solvedAnswer: 'Read the official leave and arrival clocks, then count the elapsed minutes.', blankVisualType: 'clock-workspace', animationType: 'clock-model' }),
      problem({ number: 7, sourcePrompt: 'Sydney cleans for 45 minutes starting at 11:13 a.m.', solvedAnswer: 'Sydney finishes at 11:58 a.m.', equations: ['11:13 + 45 minutes = 11:58'], numberLineModels: [numberLine('11:13 plus 45', ['11:13', '+45', '11:58'], [2])] }),
      problem({ number: 8, sourcePrompt: 'A musical lasts 42 minutes and ends at 1:59 p.m.', solvedAnswer: 'The musical started at 1:17 p.m.', equations: ['1:59 - 42 minutes = 1:17'], numberLineModels: [numberLine('count back 42 minutes', ['1:17', '+42', '1:59'], [0])] })
    ]
  }),
  5: lesson({
    lessonNumber: 5,
    title: 'add and subtract time intervals',
    concept: 'Time intervals can be totaled, compared, or used to find a missing part.',
    contrast: 'Use addition for total time and subtraction for missing or comparison time.',
    summary: 'Time interval stories use the same part-whole logic as other measurement stories.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Cole reads 25 minutes yesterday and 28 minutes today.', solvedAnswer: 'Cole read for 53 minutes.', equations: ['25 + 28 = 53'], quotient: 53, unitLabel: 'minutes', numberLineModels: [numberLine('0 to 60 minutes', ['0', '10', '20', '30', '40', '50', '60'], [5])] }),
      problem({ number: 2, sourcePrompt: 'Tessa spends 34 minutes washing her dog; 12 minutes are shampoo and rinse.', solvedAnswer: 'She spends 22 minutes getting the dog in the bathtub.', equations: ['34 - 12 = 22'], quotient: 22, unitLabel: 'minutes', animationType: 'two-step-model' }),
      problem({ number: 3, sourcePrompt: 'Tessa walks 47 minutes and Jeremiah walks 30 minutes.', solvedAnswer: 'Tessa walks 17 more minutes.', equations: ['47 - 30 = 17'], quotient: 17, unitLabel: 'minutes', animationType: 'two-step-model' }),
      problem({ number: 4, sourcePrompt: 'Austin does chores for 4, 12, and 13 minutes, then compares to a 7:55 bus after starting at 7:30.', solvedAnswer: 'Chores take 29 minutes; he finishes at 7:59 a.m. and is not done in time.', equations: ['4 + 12 + 13 = 29', '7:30 + 29 minutes = 7:59'], quotient: 29, unitLabel: 'minutes', animationType: 'two-step-model' }),
      problem({ number: 5, sourcePrompt: 'Gilberto\'s cat sleeps 23 minutes and wakes at the time shown on the clock.', solvedAnswer: 'Read the official wake time, then subtract 23 minutes.', equations: ['wake time - 23 minutes = sleep time'], blankVisualType: 'clock-workspace', animationType: 'clock-model' })
    ]
  }),
  6: lesson({
    lessonNumber: 6,
    title: 'kilograms decompose into grams',
    concept: 'Metric mass units follow base-ten structure: 1 kg = 1,000 g, 100 g = ten 10 g, and 10 g = ten 1 g.',
    contrast: 'Explain every decomposition as ten equal smaller units.',
    summary: 'Kilograms and grams mirror thousands, hundreds, tens, and ones.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Illustrate and describe making a 1-kilogram weight.', solvedAnswer: 'A 1-kilogram weight is 1,000 grams.', equations: ['1 kg = 1,000 g'], dataDisplay: dataTable('Mass equivalence', ['Unit', 'Equivalent'], [['1 kilogram', '1,000 grams']]) }),
      problem({ number: 2, sourcePrompt: 'Illustrate and describe decomposing 1 kilogram into groups of 100 grams.', solvedAnswer: '1 kilogram decomposes into ten 100-gram groups.', equations: ['1,000 g = 10 x 100 g'], knownTotal: 10, knownGroupSize: 1, quotient: 10, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({ number: 3, sourcePrompt: 'Illustrate and describe decomposing 100 grams into groups of 10 grams.', solvedAnswer: '100 grams decomposes into ten 10-gram groups.', equations: ['100 g = 10 x 10 g'], knownTotal: 10, knownGroupSize: 1, quotient: 10, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({ number: 4, sourcePrompt: 'Illustrate and describe decomposing 10 grams into groups of 1 gram.', solvedAnswer: '10 grams decomposes into ten 1-gram groups.', equations: ['10 g = 10 x 1 g'], knownTotal: 10, knownGroupSize: 1, quotient: 10, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({ number: 5, sourcePrompt: 'Compare kilograms/grams to a place value chart.', solvedAnswer: '1 kg, 100 g, 10 g, and 1 g align with thousands, hundreds, tens, and ones.', dataDisplay: dataTable('Metric mass and place value', ['Mass', 'Place value'], [['1 kilogram', 'Thousands'], ['100 grams', 'Hundreds'], ['10 grams', 'Tens'], ['1 gram', 'Ones']]) })
    ]
  }),
  7: lesson({
    lessonNumber: 7,
    title: 'estimate weights with benchmarks',
    concept: 'Use benchmark weights to decide whether grams or kilograms are reasonable.',
    contrast: 'Light objects use grams; heavier familiar objects use kilograms.',
    summary: 'A benchmark estimate should be checked against an actual scale weight.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Estimate classroom objects near 1 kg, 100 g, 10 g, and 1 g; then check actual weights.', solvedAnswer: 'Answers vary; each row needs a reasonable object and actual weight.', dataDisplay: dataTable('Benchmark estimates', ['Benchmark', 'Object', 'Actual'], [['1 kg', '____', '____'], ['100 g', '____', '____'], ['10 g', '____', '____'], ['1 g', '____', '____']]) }),
      problem({ number: 2, sourcePrompt: 'Circle grams or kilograms for cereal, watermelon, postcard, cat, bicycle, and lemon.', solvedAnswer: 'Cereal grams; watermelon kilograms; postcard grams; cat kilograms; bicycle kilograms; lemon grams.', equations: ['350 g', '3 kg', '6 g', '4 kg', '15 kg', '58 g'], dataDisplay: dataTable('Reasonable units', ['Object', 'Unit'], [['Cereal', 'grams'], ['Watermelon', 'kilograms'], ['Postcard', 'grams'], ['Cat', 'kilograms'], ['Bicycle', 'kilograms'], ['Lemon', 'grams']]) }),
      problem({ number: 3, sourcePrompt: 'A bottle of water weighs 1 kg. A laptop weighs the same as 2 bottles.', solvedAnswer: 'The laptop weighs 2 kilograms.', equations: ['1 kg + 1 kg = 2 kg'], quotient: 2, unitLabel: 'kilograms', knownGroupCount: 2, blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 4, sourcePrompt: 'Does 1 kg of rice weigh the same as ten 100 g bags of beans?', solvedAnswer: 'Yes. Ten 100-gram bags weigh 1,000 grams, or 1 kilogram.', equations: ['10 x 100 g = 1,000 g', '1,000 g = 1 kg'], knownTotal: 10, knownGroupSize: 1, quotient: 10, blankVisualType: 'bar-units', animationType: 'grouping-by-size' })
    ]
  }),
  8: lesson({
    lessonNumber: 8,
    title: 'metric weight word problems',
    concept: 'Use scale readings, tape diagrams, and operation meanings to solve weight problems.',
    contrast: 'Estimate first, then verify the exact answer is reasonable.',
    summary: 'Metric weight problems use addition, subtraction, multiplication, and division in context.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Read the scale weights for string beans and grapes.', solvedAnswer: 'Read each weight from the Teacher Edition scale visuals and record grams.', dataDisplay: dataTable('Scale readings', ['Item', 'Weight'], [['String beans', '____ grams'], ['Grapes', '____ grams']]) }),
      problem({ number: 2, sourcePrompt: 'Keiko weighs 35 kg and Jiro weighs 43 kg. Find total and difference.', solvedAnswer: 'Total = 78 kg; Jiro is 8 kg heavier.', equations: ['35 + 43 = 78', '43 - 35 = 8'], quotient: 78, unitLabel: 'kilograms', blankVisualType: 'tape-diagram', animationType: 'tape-split', knownTotal: 78, knownGroupCount: 2, shareLabels: ['Keiko', 'Jiro'] }),
      problem({ number: 3, sourcePrompt: 'A houseplant is estimated as heavy as a 5 kg bowling ball. Estimate 3 houseplants.', solvedAnswer: 'About 15 kilograms.', equations: ['3 x 5 kg = 15 kg'], knownTotal: 15, knownGroupSize: 5, quotient: 3, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({ number: 4, sourcePrompt: 'Jane and 8 friends share 27 kg of apples; then compare 7 pumpkins to Jane\'s share.', solvedAnswer: 'Jane takes about 3 kg; 7 pumpkins weigh about 21 kg.', equations: ['27 kg divided by 9 = 3 kg', '7 x 3 kg = 21 kg'], quotient: 3, animationType: 'two-step-model' })
    ]
  }),
  9: lesson({
    lessonNumber: 9,
    title: 'liters decompose into milliliters',
    concept: 'Capacity units decompose by powers of ten, parallel to mass units.',
    contrast: 'Use 1 L = 1,000 mL and 1 kg = 1,000 g as matching base-ten structures.',
    summary: 'A liter can be decomposed into 100 mL, 10 mL, and 1 mL units.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Predict and measure whether four containers hold less than, more than, or about 1 liter.', solvedAnswer: 'Answers vary; each row needs a prediction and actual result.', dataDisplay: dataTable('Liter estimates', ['Container', 'Prediction', 'Actual'], [['1', 'less / more / about', '____'], ['2', 'less / more / about', '____'], ['3', 'less / more / about', '____'], ['4', 'less / more / about', '____']]) }),
      problem({ number: 2, sourcePrompt: 'Illustrate decomposing 1 liter into 10 smaller units.', solvedAnswer: '1 liter decomposes into ten 100-milliliter units.', equations: ['1 L = 1,000 mL', '1,000 mL = 10 x 100 mL'], knownTotal: 10, knownGroupSize: 1, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({ number: 3, sourcePrompt: 'Illustrate decomposing Cup K and Cup L into 10 smaller units.', solvedAnswer: 'Each cup is decomposed into ten equal smaller units using its measured capacity.', equations: ['cup capacity divided by 10 = one smaller unit'], knownTotal: 10, knownGroupSize: 1, blankVisualType: 'bar-units', animationType: 'grouping-by-size' }),
      problem({ number: 4, sourcePrompt: 'What is the same about decomposing 1 liter into milliliters and 1 kilogram into grams?', solvedAnswer: 'Both use a base-ten structure: 1 whole unit equals 1,000 smaller units.', equations: ['1 L = 1,000 mL', '1 kg = 1,000 g'], dataDisplay: dataTable('Base-ten decompositions', ['Whole', 'Small units'], [['1 liter', '1,000 milliliters'], ['1 kilogram', '1,000 grams']]) }),
      problem({ number: 5, sourcePrompt: 'One liter of water weighs 1 kilogram. How much does 1 milliliter weigh?', solvedAnswer: '1 milliliter of water weighs 1 gram.', equations: ['1 L = 1,000 mL', '1 kg = 1,000 g'], quotient: 1, unitLabel: 'gram' })
    ]
  }),
  10: lesson({
    lessonNumber: 10,
    title: 'liquid volume on a vertical number line',
    concept: 'A marked container is a vertical number line for liters and milliliters.',
    contrast: 'Use equal intervals and halfway marks to read or estimate volume.',
    summary: 'Liquid volume can be read, estimated, compared, and subtracted on a vertical scale.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Label the container number line; explain halfway and pouring; find what remains after pouring out 300 mL.', solvedAnswer: 'For a 1-liter container, halfway is 500 mL; 700 mL remain after pouring out 300 mL.', equations: ['1,000 mL - 300 mL = 700 mL'], numberLineModels: [numberLine('container scale', ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1,000'], [7])] }),
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
      problem({ number: 4, sourcePrompt: 'Use barrel capacities A 75 L, B 68 L, C 96 L, D 52 L.', solvedAnswer: 'C has the greatest capacity, D the smallest, Ben most likely bought B, and C holds 28 L more than B.', equations: ['96 L - 68 L = 28 L'], dataDisplay: dataTable('Barrel capacity', ['Barrel', 'Capacity'], [['A', '75 L'], ['B', '68 L'], ['C', '96 L'], ['D', '52 L']]) })
    ]
  }),
  11: lesson({
    lessonNumber: 11,
    title: 'mixed metric word problems',
    concept: 'When units match, metric stories can use all four operations.',
    contrast: 'Identify total, part, comparison, or equal groups before choosing the operation.',
    summary: 'Model the relationship, compute, and state the unit.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Can and jar weigh 671 g total; jar weighs 113 g. Find can and difference.', solvedAnswer: 'Can = 558 g; can is 445 g heavier.', equations: ['671 - 113 = 558', '558 - 113 = 445'], knownTotal: 671, quotient: 558, unitLabel: 'grams', blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 2, sourcePrompt: 'A pen weighs 6 g. Find 10 pens and then a box of 10 pens with an 82 g empty box.', solvedAnswer: '10 pens = 60 g; box with pens = 142 g.', equations: ['10 x 6 = 60', '60 + 82 = 142'], quotient: 142, unitLabel: 'grams' }),
      problem({ number: 3, sourcePrompt: 'Apple, lemon, and banana weigh 508 g total; apple and lemon weigh 317 g; lemon is 68 g less than banana.', solvedAnswer: 'Banana = 191 g, lemon = 123 g, apple = 194 g.', equations: ['508 - 317 = 191', '191 - 68 = 123', '317 - 123 = 194'], quotient: 191, unitLabel: 'grams' }),
      problem({ number: 4, sourcePrompt: 'A frozen turkey is about 5 kg; chef orders 45 kg.', solvedAnswer: 'About 9 turkeys.', equations: ['45 divided by 5 = 9'], quotient: 9, unitLabel: 'turkeys' }),
      problem({ number: 5, sourcePrompt: 'A recipe needs 300 mL milk; Sara triples it.', solvedAnswer: 'Sara needs 900 mL.', equations: ['3 x 300 = 900'], quotient: 900, unitLabel: 'milliliters' }),
      problem({ number: 6, sourcePrompt: 'Marian fills 3 buckets of 4 L each and has 2 L left.', solvedAnswer: 'The container holds 14 liters.', equations: ['3 x 4 = 12', '12 + 2 = 14'], quotient: 14, unitLabel: 'liters' })
    ]
  }),
  12: lesson({
    lessonNumber: 12,
    title: 'round two-digit measurements to the nearest ten',
    concept: 'Find the two tens around a measurement and compare the measurement to halfway.',
    contrast: 'Below halfway rounds down; halfway or above rounds up.',
    summary: 'Round a measurement by locating it between tens on a vertical number line.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Measure four classroom lengths and round each to the nearest 10 cm.', solvedAnswer: 'Answers vary; each row needs actual cm, two bounding tens, and nearest 10 cm.', dataDisplay: dataTable('Length rounding', ['Object', 'Measurement', 'Between tens', 'Nearest 10 cm'], [['Desk long side', '____ cm', '____ and ____', '____'], ['New pencil', '____ cm', '____ and ____', '____'], ['Paper short side', '____ cm', '____ and ____', '____'], ['Paper long side', '____ cm', '____ and ____', '____']]) }),
      problem({ number: 2, sourcePrompt: 'Measure bags of rice and round each weight to the nearest 10 g.', solvedAnswer: 'Answers vary; each row needs actual g, bounding tens, and nearest 10 g.', dataDisplay: dataTable('Weight rounding', ['Bag', 'Measurement', 'Between tens', 'Nearest 10 g'], [['B', '____ g', '____ and ____', '____'], ['C', '____ g', '____ and ____', '____'], ['D', '____ g', '____ and ____', '____'], ['E', '____ g', '____ and ____', '____']]) }),
      problem({ number: 3, sourcePrompt: 'Measure containers and round liquid volume to nearest 10 mL.', solvedAnswer: 'Answers vary; each row needs actual mL, bounding tens, and nearest 10 mL.', dataDisplay: dataTable('Liquid volume rounding', ['Container', 'Measurement', 'Between tens', 'Nearest 10 mL'], [['B', '____ mL', '____ and ____', '____'], ['C', '____ mL', '____ and ____', '____'], ['D', '____ mL', '____ and ____', '____'], ['E', '____ mL', '____ and ____', '____']]) }),
      problem({ number: 4, sourcePrompt: 'Use a clock to record activity times and round to nearest 10 minutes.', solvedAnswer: 'Answers vary; each actual time is placed between two 10-minute marks and rounded.', dataDisplay: dataTable('Time rounding', ['Activity', 'Actual time', 'Between tens', 'Nearest 10 minutes'], [['Started Problem Set', '____', '____ and ____', '____'], ['Finished Station 1', '____', '____ and ____', '____']]) })
    ]
  }),
  13: lesson({
    lessonNumber: 13,
    title: 'round to the nearest ten',
    concept: 'Use a vertical number line to decide whether a number is closer to the lower or upper ten.',
    contrast: 'Halfway and above rounds to the upper ten.',
    summary: 'Locate the number between tens, compare to halfway, and round.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Round 32, 36, 62, 162, 278, and 405 to the nearest ten.', solvedAnswer: '32 -> 30, 36 -> 40, 62 -> 60, 162 -> 160, 278 -> 280, 405 -> 410.', equations: ['32 ~= 30', '36 ~= 40', '62 ~= 60', '162 ~= 160', '278 ~= 280', '405 ~= 410'], numberLineModels: [numberLine('nearest ten', tensTicks, [0, 2])] }),
      problem({ number: 2, sourcePrompt: 'Round 36 g, 52 g, and 142 g to nearest 10 g.', solvedAnswer: '36 g -> 40 g, 52 g -> 50 g, 142 g -> 140 g.', equations: ['36 g ~= 40 g', '52 g ~= 50 g', '142 g ~= 140 g'], numberLineModels: [numberLine('nearest 10 grams', tensTicks, [0, 2])] }),
      problem({ number: 3, sourcePrompt: 'Carl\'s game starts at 3:03 p.m. and ends at 3:51 p.m.; find and round the duration.', solvedAnswer: 'The game lasted 48 minutes, which rounds to 50 minutes.', equations: ['3:51 - 3:03 = 48', '48 ~= 50'], quotient: 50, unitLabel: 'minutes' })
    ]
  }),
  14: lesson({
    lessonNumber: 14,
    title: 'round to the nearest hundred',
    concept: 'Use lower hundred, halfway, and upper hundred to round.',
    contrast: 'Numbers at halfway or above round to the upper hundred.',
    summary: 'Round to the nearest hundred by comparing to the halfway hundred.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Round 143, 286, 320, 1,320, 1,572, and 1,250 to nearest hundred.', solvedAnswer: '143 -> 100, 286 -> 300, 320 -> 300, 1,320 -> 1,300, 1,572 -> 1,600, 1,250 -> 1,300.', equations: ['143 ~= 100', '286 ~= 300', '320 ~= 300', '1,320 ~= 1,300', '1,572 ~= 1,600', '1,250 ~= 1,300'], numberLineModels: [numberLine('nearest hundred', hundredTicks, [0, 2])] }),
      problem({ number: 2, sourcePrompt: 'Round 480, 525, 750 mL, $1,297, and 1,842 km to nearest hundred.', solvedAnswer: '480 -> 500, 525 -> 500, 750 mL -> 800 mL, $1,297 -> $1,300, 1,842 km -> 1,800 km.', equations: ['480 ~= 500', '525 ~= 500', '750 ~= 800', '1,297 ~= 1,300', '1,842 ~= 1,800'], dataDisplay: dataTable('Nearest hundred', ['Quantity', 'Rounded'], [['480 stickers', '500'], ['525 pages', '500'], ['750 mL', '800 mL'], ['$1,297', '$1,300'], ['1,842 km', '1,800 km']]) }),
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
      problem({ number: 1, sourcePrompt: 'Find eleven measurement sums from mL, cm, g, L/mL, and kg/g.', solvedAnswer: '51 mL, 71 mL, 171 mL, 89 cm, 592 cm, 627 cm, 92 g, 639 g, 956 g, 3 L 657 mL, 5 kg 876 g.', equations: ['46 + 5 = 51', '509 + 83 = 592', '480 + 476 = 956', '1 L 245 mL + 2 L 412 mL = 3 L 657 mL'] }),
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
      problem({ number: 1, sourcePrompt: 'Find eleven measurement sums requiring composition.', solvedAnswer: '120 mL, 420 mL, 820 mL, 150 cm, 600 cm, 900 cm, 835 g, 942 g, 983 g, 4 L 800 mL, 6 kg 851 g.', equations: ['52 + 68 = 120', '352 + 468 = 820', '506 + 394 = 900', '486 + 497 = 983'] }),
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
      problem({ number: 1, sourcePrompt: 'Find actual sums, round addends to nearest hundred, estimate, and circle closest estimates.', solvedAnswer: 'Close estimates include 451 + 249 = 700, 356 + 148 = 504 estimated as 500, and 647 + 158 = 805 estimated as 800.', equations: ['451 + 249 = 700', '356 + 148 = 504', '647 + 158 = 805'] }),
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
      problem({ number: 1, sourcePrompt: 'Solve eleven measurement subtraction problems.', solvedAnswer: '36 mL, 336 mL, 136 mL, 497 cm, 361 cm, 498 cm, 177 g, 73 g, 75 g, 1 km 315 m, 2 kg 31 g.', equations: ['60 - 24 = 36', '360 - 224 = 136', '807 - 732 = 75'] }),
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
      problem({ number: 1, sourcePrompt: 'Solve eight measurement subtraction problems requiring decomposition.', solvedAnswer: '280 cm, 80 cm, 365 g, 254 g, 648 mL, 248 mL, 4 km 233 m, 2 L 51 mL.', equations: ['340 - 60 = 280', '700 - 452 = 248', '5 L 920 mL - 3 L 869 mL = 2 L 51 mL'] }),
      problem({ number: 2, sourcePrompt: 'David drives 617 km total with 468 km left.', solvedAnswer: 'David has driven 149 km.', equations: ['617 - 468 = 149'], quotient: 149, unitLabel: 'kilometers', blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 3, sourcePrompt: 'Piano weighs 297 kg and is 289 kg more than the bench.', solvedAnswer: 'The bench weighs 8 kg.', equations: ['297 - 289 = 8'], quotient: 8, unitLabel: 'kilograms' }),
      problem({ number: 4, sourcePrompt: 'Tank A holds 165 fewer liters than Tank B; Tank B holds 400 L.', solvedAnswer: 'Tank A holds 235 L.', equations: ['400 - 165 = 235'], quotient: 235, unitLabel: 'liters' })
    ]
  }),
  20: lesson({
    lessonNumber: 20,
    title: 'estimate differences by rounding',
    concept: 'Round totals and parts to estimate differences, then subtract exactly.',
    contrast: 'The closest estimate depends on how both numbers round.',
    summary: 'Estimate, solve exactly, and compare for reasonableness.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Find actual differences, round to nearest hundred, estimate, and circle closest estimates.', solvedAnswer: 'Close cases include 451 - 153 = 298 estimated as 300, 448 - 149 = 299 estimated as 300, 756 - 261 = 495 estimated as 500, and 747 - 249 = 498 estimated as 500.', equations: ['451 - 153 = 298', '448 - 149 = 299', '756 - 261 = 495', '747 - 249 = 498'] }),
      problem({ number: 2, sourcePrompt: 'Camden uses 372 L of gas total and 184 L in the first month.', solvedAnswer: 'Second month = 188 L; about 200 L is reasonable.', equations: ['372 - 184 = 188', '400 - 200 = 200'], quotient: 188, unitLabel: 'liters', blankVisualType: 'tape-diagram', animationType: 'tape-split' }),
      problem({ number: 3, sourcePrompt: 'Pear, apple, and peach weigh 500 g total; pear and apple weigh 372 g.', solvedAnswer: 'The peach weighs 128 g; about 100 g is reasonable.', equations: ['500 - 372 = 128'], quotient: 128, unitLabel: 'grams', blankVisualType: 'tape-diagram', animationType: 'tape-split' })
    ]
  }),
  21: lesson({
    lessonNumber: 21,
    title: 'estimate and solve mixed measurement problems',
    concept: 'Mixed problems combine measuring, rounding, addition, subtraction, and reasonableness checks.',
    contrast: 'Use rounded values for estimates and exact values for final answers.',
    summary: 'Round first when asked, then solve exactly and explain reasonableness.',
    problems: [
      problem({ number: 1, sourcePrompt: 'Weigh beans and rice, estimate and find total and difference.', solvedAnswer: 'Answers vary by measured weights; complete estimated and actual sum and difference.', dataDisplay: dataTable('Beans and rice', ['Item', 'Actual', 'Rounded'], [['Beans', '____ g', '____ g'], ['Rice', '____ g', '____ g'], ['Sum', '____ g', '____ g'], ['Difference', '____ g', '____ g']]) }),
      problem({ number: 2, sourcePrompt: 'Measure three pieces of yarn, estimate total of A and C, then compare with B.', solvedAnswer: 'Answers vary; exact comparison is Yarn A + Yarn C - Yarn B.', equations: ['Yarn A + Yarn C = total', 'total - Yarn B = difference'], dataDisplay: dataTable('Yarn lengths', ['Yarn', 'Actual', 'Rounded'], [['A', '____ cm', '____ cm'], ['B', '____ cm', '____ cm'], ['C', '____ cm', '____ cm']]) }),
      problem({
        number: 3,
        sourcePrompt: 'Plot liquid in Containers D, E, F, round to nearest 10 mL, then find total and difference.',
        solvedAnswer: 'Container D is 212 mL ≈ 210 mL, Container E is 238 mL ≈ 240 mL, and Container F is 195 mL ≈ 200 mL. The actual total is 645 mL, and D to E differs by 26 mL.',
        equations: ['212 + 238 + 195 = 645', '238 - 212 = 26'],
        dataDisplay: dataTable('Container rounding', ['Container', 'Actual volume', 'Rounded to nearest 10 mL'], [['D', '____ mL', '____ mL'], ['E', '____ mL', '____ mL'], ['F', '____ mL', '____ mL']]),
        solvedDataDisplay: dataTable('Container rounding', ['Container', 'Actual volume', 'Rounded to nearest 10 mL'], [['D', '212 mL', '210 mL'], ['E', '238 mL', '240 mL'], ['F', '195 mL', '200 mL']])
      }),
      problem({ number: 4, sourcePrompt: 'Movie is 115 minutes including trailers of 5, 4, 3, 5, and 4 minutes.', solvedAnswer: 'Trailers total 21 minutes; movie without trailers is 94 minutes, about 100 minutes.', equations: ['5 + 4 + 3 + 5 + 4 = 21', '115 - 21 = 94'], quotient: 94, unitLabel: 'minutes', dataDisplay: dataTable('Trailer lengths', ['Trailer', 'Minutes'], [['1', '5'], ['2', '4'], ['3', '3'], ['4', '5'], ['5', '4'], ['Total', '21']]) })
    ]
  })
};
