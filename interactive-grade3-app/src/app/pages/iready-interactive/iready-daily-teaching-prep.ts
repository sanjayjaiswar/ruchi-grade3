// Six-lesson parent/teacher preparation: original supplemental instruction only.
// Session/page citations are checked against the existing official CMC Volume 1
// student-session evidence and Teacher Guide spread provenance registries.
// Do not mark Ruchika's actual progress completed from this preparation list.
export interface DailyMathTeachingPrep {
  readonly lesson: number;
  readonly session: number;
  readonly role: 'Recap' | 'Current' | 'Upcoming';
  readonly title: string;
  readonly sourceAnchor: string;
  readonly goal: string;
  readonly warmup: string;
  readonly visual: string;
  readonly explain: string;
  readonly alternate: string;
  readonly guided: string;
  readonly guidedAnswer: string;
  readonly practice: string;
  readonly practiceAnswer: string;
  readonly misconception: string;
  readonly mastery: string;
  readonly masteryAnswer: string;
  readonly studentPages: string;
  readonly teacherPages: string;
  readonly studentSourceUrl: string;
  readonly teacherSourceUrl: string;
  readonly lessonUrl: string;
}

export const DAILY_MATH_TEACHING_PREP: readonly DailyMathTeachingPrep[] = [
  {
    "lesson": 6,
    "session": 5,
    "role": "Recap",
    "title": "Multiplying with 3, 4, and 6",
    "sourceAnchor": "Student p. 157: Toya makes 7 cowrie-shell bracelets using 4 shells each; 7 × 4 = 28 shells.",
    "goal": "Recall equal groups, arrays, and splitting a factor into easier products.",
    "warmup": "Draw four rows of three dots. Count by threes: 3, 6, 9, 12.",
    "visual": "Draw 4 rows with 6 dots per row. Separate each row into 3 dots and 3 dots; both halves show 12.",
    "explain": "An array has four groups of six, so 4 × 6 = 24. Each row represents an equal group.",
    "alternate": "Split 6 into 3 + 3: (4 × 3) + (4 × 3) = 12 + 12 = 24.",
    "guided": "Show how 7 × 4 can be solved by making two groups of 7 × 2.",
    "guidedAnswer": "7 × 4 = 7 × (2 + 2) = 14 + 14 = 28.",
    "practice": "Try 3 × 6. Draw an array, then write the multiplication sentence.",
    "practiceAnswer": "Three rows of six make 18; 3 × 6 = 18.",
    "misconception": "Adding the factors (3 + 6) gives 9, not the product; count equal groups instead.",
    "mastery": "Without recounting, explain why 6 × 4 = 4 × 6.",
    "masteryAnswer": "The array can be rotated; both have 24 counters.",
    "studentPages": "157–160",
    "teacherPages": "300–303",
    "studentSourceUrl": "https://online.flippingbook.com/view/336581625/169/",
    "teacherSourceUrl": "https://online.flippingbook.com/view/336223898/300/",
    "lessonUrl": "/ruchika/grade3/iready-interactive/lessons/6"
  },
  {
    "lesson": 7,
    "session": 5,
    "role": "Recap",
    "title": "Multiplying with 7, 8, and 9",
    "sourceAnchor": "Student pp. 185–186: 7 teams with 8 players each; 7 × 8 = 56 players.",
    "goal": "Use nearby known facts, doubling, and decomposition instead of guessing products.",
    "warmup": "If 6 × 7 = 42, what is 7 × 7? Add one more group of seven.",
    "visual": "Draw seven rows of eight dots. Split each row in half to show two 7 × 4 arrays.",
    "explain": "Seven groups of eight contain two groups of seven times four.",
    "alternate": "For 6 × 9, use six groups of ten minus six: 60 - 6 = 54.",
    "guided": "Show two correct ways to work out 7 × 8.",
    "guidedAnswer": "(7 × 4) + (7 × 4) = 28 + 28 = 56, or (7 × 10) - (7 × 2) = 70 - 14 = 56.",
    "practice": "Find 8 × 9 by using a nearby fact.",
    "practiceAnswer": "8 × 9 = 8 × (10 - 1) = 80 - 8 = 72.",
    "misconception": "Splitting 8 into 4 + 4 requires adding both partial products; one 7 × 4 is only half.",
    "mastery": "Find 7 × 9 and explain your strategy.",
    "masteryAnswer": "7 × (10 - 1) = 70 - 7 = 63.",
    "studentPages": "185–188",
    "teacherPages": "332–335",
    "studentSourceUrl": "https://online.flippingbook.com/view/336581625/197/",
    "teacherSourceUrl": "https://online.flippingbook.com/view/336223898/332/",
    "lessonUrl": "/ruchika/grade3/iready-interactive/lessons/7"
  },
  {
    "lesson": 8,
    "session": 4,
    "role": "Current",
    "title": "Using Order and Grouping to Multiply",
    "sourceAnchor": "Student pp. 207–208: Jada has 2 boxes, 8 packages per box, and 5 rolls per package; 2 × 8 × 5 = 80 rolls.",
    "goal": "Understand how the order and grouping of factors can make a multiplication easier.",
    "warmup": "Make ten: 2 × 5 = 10. Then find 8 × 10.",
    "visual": "Arrange 2 equal boxes, with 6 bundles in each box and 5 objects in each bundle; circle 2 × 5 to make tens.",
    "explain": "Changing the order of three factors does not change the total. Use 2 × 6 × 5 = 6 × (2 × 5) = 60.",
    "alternate": "Multiply from left to right: (2 × 6) × 5 = 12 × 5 = 60. Both paths yield the same amount.",
    "guided": "Choose a helpful grouping for 4 × 3 × 5.",
    "guidedAnswer": "3 × (4 × 5) = 3 × 20 = 60.",
    "practice": "There are 2 shelves, 9 packages per shelf, and 5 items per package. How many items?",
    "practiceAnswer": "2 × 9 × 5 = 9 × (2 × 5) = 90 items.",
    "misconception": "Parentheses group factors; they do not mean add. This is not the same rule as moving numbers across subtraction or division.",
    "mastery": "Use regrouping to find 2 × 7 × 5.",
    "masteryAnswer": "7 × (2 × 5) = 7 × 10 = 70. Session 5 remains pending until completion is verified.",
    "studentPages": "207–212",
    "teacherPages": "358–363",
    "studentSourceUrl": "https://online.flippingbook.com/view/336581625/219/",
    "teacherSourceUrl": "https://online.flippingbook.com/view/336223898/358/",
    "lessonUrl": "/ruchika/grade3/iready-interactive/lessons/8"
  },
  {
    "lesson": 9,
    "session": 1,
    "role": "Upcoming",
    "title": "Using Place Value to Multiply",
    "sourceAnchor": "Student pp. 219–220: 4 stacks of 20 books; 4 × 20 = 80 books.",
    "goal": "Multiply a single-digit number by a multiple of ten by reasoning with tens.",
    "warmup": "Show 3 groups of 2 tens with sticks or base-ten rods. How many tens is that?",
    "visual": "Show six groups of three ten-rods. Count 18 tens, then exchange for 180 ones.",
    "explain": "6 × 30 means 6 groups of 3 tens. That is 18 tens, or 180.",
    "alternate": "Use an equation: 6 × (3 × 10) = (6 × 3) × 10 = 18 × 10 = 180.",
    "guided": "Represent 4 × 20 with base-ten rods and an equation.",
    "guidedAnswer": "4 × 2 tens = 8 tens = 80.",
    "practice": "Find 7 × 20 and explain the place value.",
    "practiceAnswer": "7 × 2 tens = 14 tens = 140.",
    "misconception": "A rule such as 'add a zero' is not the explanation. First multiply the number of tens, then regroup if needed.",
    "mastery": "Find 8 × 40 using tens.",
    "masteryAnswer": "8 × 4 tens = 32 tens = 320.",
    "studentPages": "219–222",
    "teacherPages": "374–377",
    "studentSourceUrl": "https://online.flippingbook.com/view/336581625/231/",
    "teacherSourceUrl": "https://online.flippingbook.com/view/336223898/374/",
    "lessonUrl": "/ruchika/grade3/iready-interactive/lessons/9"
  },
  {
    "lesson": 10,
    "session": 1,
    "role": "Upcoming",
    "title": "The Meaning of Division",
    "sourceAnchor": "Student pp. 235–236: 8 slices of halloumi shared into 2 equal groups; 8 ÷ 2 = 4 in each group.",
    "goal": "Distinguish equal sharing from finding how many equal groups can be made.",
    "warmup": "Share 12 counters equally between 3 plates. How many counters per plate?",
    "visual": "Draw 18 counters, circle them into 3 equal groups, and show 6 counters in each group.",
    "explain": "Equal sharing: 18 ÷ 3 = 6 means 18 counters shared equally among 3 groups gives 6 per group.",
    "alternate": "Equal grouping: 20 ÷ 5 = 4 asks how many groups of five can be made from twenty counters.",
    "guided": "Share 15 dots among 3 children. Then check by multiplication.",
    "guidedAnswer": "15 ÷ 3 = 5, and 3 × 5 = 15.",
    "practice": "Make groups of 4 from 24 counters. How many groups are there?",
    "practiceAnswer": "24 ÷ 4 = 6 groups, because 6 × 4 = 24.",
    "misconception": "The divisor can mean the number of groups or how many are in each group. Read the story to identify what is unknown.",
    "mastery": "There are 12 cookies and 3 children. How many cookies does each child receive equally?",
    "masteryAnswer": "12 ÷ 3 = 4 cookies each.",
    "studentPages": "235–238",
    "teacherPages": "398–401",
    "studentSourceUrl": "https://online.flippingbook.com/view/336581625/247/",
    "teacherSourceUrl": "https://online.flippingbook.com/view/336223898/398/",
    "lessonUrl": "/ruchika/grade3/iready-interactive/lessons/10"
  },
  {
    "lesson": 11,
    "session": 1,
    "role": "Upcoming",
    "title": "How Multiplication and Division Are Connected",
    "sourceAnchor": "Student pp. 247–248: 20 stickers arranged across 5 pages; 20 ÷ 5 = 4 stickers per page.",
    "goal": "Use the same equal-groups model to write related multiplication and division facts.",
    "warmup": "Draw 3 rows of 5 dots. Write 3 × 5 and 15 ÷ 3.",
    "visual": "Sketch 4 rows of 7 dots; rotate the array to see both factors, then divide 28 by either factor.",
    "explain": "For 4 × 7 = 28, the related divisions are 28 ÷ 4 = 7 and 28 ÷ 7 = 4.",
    "alternate": "Think of an unknown factor: 28 ÷ 7 asks '7 times what makes 28?' The answer is 4.",
    "guided": "Write one multiplication fact and both related division facts for 5 and 6.",
    "guidedAnswer": "5 × 6 = 30; 30 ÷ 5 = 6; 30 ÷ 6 = 5.",
    "practice": "If 9 × 3 = 27, what is 27 ÷ 9?",
    "practiceAnswer": "27 ÷ 9 = 3.",
    "misconception": "The total, or product, becomes the number being divided. Do not reverse the division to 4 ÷ 28.",
    "mastery": "Use 6 × 8 = 48 to write the two related division facts.",
    "masteryAnswer": "48 ÷ 6 = 8 and 48 ÷ 8 = 6.",
    "studentPages": "247–250",
    "teacherPages": "414–417",
    "studentSourceUrl": "https://online.flippingbook.com/view/336581625/259/",
    "teacherSourceUrl": "https://online.flippingbook.com/view/336223898/414/",
    "lessonUrl": "/ruchika/grade3/iready-interactive/lessons/11"
  }
];
