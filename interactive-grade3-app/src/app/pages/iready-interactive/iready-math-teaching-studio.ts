import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface MathStudioModel {
  readonly label: string;
  readonly situation: string;
  readonly rows: number;
  readonly columns: number;
  readonly tokens: readonly string[];
  readonly kind: 'counters' | 'stickers' | 'pattern' | 'number-pattern' | 'tiles';
  readonly equation: string;
  readonly inference: string;
  readonly talk: string;
  readonly predictionPrompt: string;
  readonly predictionAnswer: number;
}

interface MathStudioLesson {
  readonly lesson: number;
  readonly title: string;
  readonly source: string;
  readonly student: string;
  readonly teacher: string;
  readonly models: readonly [MathStudioModel, MathStudioModel];
  readonly challenge: string;
  readonly answer: number;
  readonly answerUnit: string;
  readonly why: string;
  readonly error: string;
}

// Original supplemental, interactive models of verified i-Ready Volume 1 S1 tasks.
// Official printed pages, model values and expected answers are documented in
// iready-volume1-problems.ts and iready-volume1-teacher-provenance.json.
const MATH_STUDIO_LESSONS: readonly MathStudioLesson[] = [
  {
    lesson: 11,
    title: 'See how multiplication and division undo each other',
    source: 'Model It, pp. 247–248: 4 rows of 3 pennies and 20 flag stickers shared across 5 scrapbook pages.',
    student: 'https://online.flippingbook.com/view/336581625/259/',
    teacher: 'https://online.flippingbook.com/view/336223898/414/',
    models: [
      { label: 'Pennies: 4 rows of 3', situation: 'Arrange 12 pennies in four equal rows. The same array tells you the size of each group and how many groups there are.', rows: 4, columns: 3, tokens: ['●'], kind: 'counters', equation: '4 × 3 = 12   •   12 ÷ 4 = 3   •   12 ÷ 3 = 4', inference: 'Multiplication joins the four groups. Division can ask for the missing group size or the number of groups.', talk: 'Point to the four rows. If you know there are 12 pennies, how can you find 3 without recounting every penny?', predictionPrompt: 'How many pennies when all four rows are built?', predictionAnswer: 12 },
      { label: 'Flag stickers: 5 pages of 4', situation: 'Deal 20 flag stickers one at a time among five scrapbook pages, then use multiplication to check.', rows: 5, columns: 4, tokens: ['⚑'], kind: 'stickers', equation: '5 × 4 = 20   •   20 ÷ 5 = 4', inference: 'Five pages each contain four flag stickers. Division finds the unknown stickers per page.', talk: 'Which is the total: 20 or 5? What does 4 count here?', predictionPrompt: 'How many flag stickers on all five pages?', predictionAnswer: 20 }
    ],
    challenge: 'Practice p. 250: 21 flower stickers are shared across 7 scrapbook pages. How many stickers on each page?',
    answer: 3, answerUnit: 'stickers per page', why: '21 ÷ 7 = 3 because 7 × 3 = 21.',
    error: 'Do not put the total where the unknown group size belongs. Check by multiplying pages × stickers per page.'
  },
  {
    lesson: 12,
    title: 'Build a whole fact family from one array',
    source: 'Try It/Connect It, pp. 259–260: 24 balls in 3 bags and the related facts for 6, 9 and 54.',
    student: 'https://online.flippingbook.com/view/336581625/271/',
    teacher: 'https://online.flippingbook.com/view/336223898/430/',
    models: [
      { label: 'Balls: 3 bags of 8', situation: 'Twenty-four sepak takraw balls are shared among three bags. Create equal groups and name all four connected facts.', rows: 3, columns: 8, tokens: ['●'], kind: 'counters', equation: '3 × 8 = 24   •   8 × 3 = 24   •   24 ÷ 3 = 8   •   24 ÷ 8 = 3', inference: 'The family uses only 3, 8 and 24. The product 24 stays the starting total in both division equations.', talk: 'Which number is always the total? How do you know the quotient without dividing from scratch?', predictionPrompt: 'How many balls will three full bags contain?', predictionAnswer: 24 },
      { label: 'Facts: 6 groups of 9', situation: 'Model six groups of nine and use the same three numbers to write two multiplication and two division equations.', rows: 6, columns: 9, tokens: ['●'], kind: 'counters', equation: '6 × 9 = 54   •   9 × 6 = 54   •   54 ÷ 6 = 9   •   54 ÷ 9 = 6', inference: 'Rotate the six-by-nine array to see nine-by-six. Reversing the roles of the factors does not change the 54 items.', talk: 'If 54 ÷ 9 is unknown, which multiplication fact answers it immediately?', predictionPrompt: 'How many items will six groups of nine contain?', predictionAnswer: 54 }
    ],
    challenge: 'Prepare p. 261: 32 objects are arranged in groups of 8. How many equal groups?',
    answer: 4, answerUnit: 'groups', why: '32 ÷ 8 = 4, checked by 8 × 4 = 32.',
    error: 'The divisor 8 is the group size in this question; the answer 4 is the number of groups. Special case: 5 × 5 = 25 has only TWO distinct related equations (5 × 5 = 25 and 25 ÷ 5 = 5), because the factors repeat.'
  },
  {
    lesson: 13,
    title: 'Predict patterns from the repeating unit',
    source: 'Model It, pp. 281–282: two clips then one bead; bead positions 3, 6, 9; and the 9, 18, 27 number pattern.',
    student: 'https://online.flippingbook.com/view/336581625/293/',
    teacher: 'https://online.flippingbook.com/view/336223898/456/',
    models: [
      { label: 'Clips, clips, bead', situation: 'Repeat the three-item unit. At which positions do the beads land?', rows: 4, columns: 3, tokens: ['clip', 'clip', 'bead'], kind: 'pattern', equation: '3, 6, 9, 12, …   •   each next bead position adds 3', inference: 'Each full group ends in a bead. There are three positions per group, so the bead positions are multiples of 3.', talk: 'Can you predict the fourth bead position before showing the fourth group? Explain your rule.', predictionPrompt: 'What position will contain the fourth bead?', predictionAnswer: 12 },
      { label: 'Number pattern: add 9', situation: 'Continue the sequence and explain why every term also appears among the multiples of three.', rows: 4, columns: 1, tokens: ['9', '18', '27', '36'], kind: 'number-pattern', equation: '9, 18, 27, 36, …   •   each step adds 9', inference: '9 is three groups of 3. Each number in the add-nine sequence is also a multiple of 3.', talk: 'What is the next number? How can you prove it belongs to both the +9 and +3 patterns?', predictionPrompt: 'Which number follows 9, 18, 27?', predictionAnswer: 36 }
    ],
    challenge: 'Continue the student-number pattern 9, 18, 27. What number comes next?',
    answer: 36, answerUnit: 'next number', why: 'Add 9 each time: 27 + 9 = 36.',
    error: 'Do not confuse a repeating shape unit (clip, clip, bead) with a growing number pattern (add 9).'
  },
  {
    lesson: 14,
    title: 'Measure area by covering a shape with squares',
    source: 'Model It, pp. 315–316: same-size square units completely cover the rug, giving area 6 square units.',
    student: 'https://online.flippingbook.com/view/336581625/327/',
    teacher: 'https://online.flippingbook.com/view/336223898/516/',
    models: [
      { label: 'Rug: 2 rows of 3 tiles', situation: 'Build a rug using six same-size square tiles, with no gaps and no overlaps.', rows: 2, columns: 3, tokens: ['■'], kind: 'tiles', equation: '2 rows × 3 tiles = 6 equal square units', inference: 'Area counts how many same-size square units cover the entire surface, not merely its edge length.', talk: 'If one tile is missing, have we covered the whole rug? Can differently sized tiles be counted together?', predictionPrompt: 'How many same-size square units cover the first rug?', predictionAnswer: 6 },
      { label: 'Compare: 2 rows of 5 tiles', situation: 'Cover a rectangular surface with two rows of five equal square units.', rows: 2, columns: 5, tokens: ['■'], kind: 'tiles', equation: '2 rows × 5 tiles = 10 equal square units', inference: 'Each square covers one equal unit of surface. Two complete rows of five cover ten square units.', talk: 'How can you count the squares without pointing to each one? Why is the unit square units, not just squares?', predictionPrompt: 'How many square units cover the larger rug?', predictionAnswer: 10 }
    ],
    challenge: 'Practice pp. 317–318: a correctly tiled rug has two rows of five equal square units. What is its area?',
    answer: 10, answerUnit: 'square units', why: '2 × 5 = 10 equal square units, with no gaps or overlaps.',
    error: 'Tiles must be the same size and cover the whole surface without overlapping or crossing the border.'
  }
];

@Component({
  selector: 'app-iready-math-teaching-studio',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './iready-math-teaching-studio.html',
  styleUrl: './iready-math-teaching-studio.css'
})
export class IReadyMathTeachingStudioComponent implements OnChanges {
  @Input({ required: true }) lessonNumber = 11;
  modelIndex = 0;
  stage = 1;
  builtGroups = 1;
  prediction = '';
  predictionFeedback = '';
  studentAnswer = '';
  feedback = '';
  showTeacher = false;
  showMultiplesOfThree = true;
  showMultiplesOfNine = false;
  showInvalidArea = false;
  readonly chartNumbers = Array.from({ length: 40 }, (_, index) => index + 1);

  get lesson(): MathStudioLesson { return MATH_STUDIO_LESSONS.find((candidate) => candidate.lesson === this.lessonNumber) ?? MATH_STUDIO_LESSONS[0]; }
  get model(): MathStudioModel { return this.lesson.models[this.modelIndex]; }
  get groups(): number[] { return Array.from({ length: this.model.rows }, (_, index) => index); }
  get cells(): number[] { return Array.from({ length: this.model.columns }, (_, index) => index); }
  get shownGroupCount(): number { return this.stage === 1 ? this.builtGroups : this.model.rows; }
  get correct(): boolean { return this.feedback.startsWith('Correct'); }

  ngOnChanges(): void { this.reset(); }

  reset(): void { this.modelIndex = 0; this.stage = 1; this.builtGroups = 1; this.prediction = ''; this.predictionFeedback = ''; this.studentAnswer = ''; this.feedback = ''; this.showTeacher = false; this.showMultiplesOfThree = true; this.showMultiplesOfNine = false; this.showInvalidArea = false; }
  showModel(index: number): void { this.modelIndex = index; this.stage = 1; this.builtGroups = 1; this.prediction = ''; this.predictionFeedback = ''; this.studentAnswer = ''; this.feedback = ''; this.showTeacher = false; this.showInvalidArea = false; }
  addGroup(): void { if (this.builtGroups < this.model.rows) this.builtGroups++; }
  removeGroup(): void { if (this.builtGroups > 1) this.builtGroups--; }
  checkPrediction(): void {
    const answer = this.prediction.trim();
    this.predictionFeedback = !/^\d+$/.test(answer) ? 'Enter a whole-number prediction.' : Number(answer) === this.model.predictionAnswer
      ? 'Correct prediction! Explain the repeated groups before revealing the equation.'
      : 'Not yet. Look at the repeated group and try counting by groups.';
  }
  next(): void { if (this.stage < 3 && (this.stage > 1 || this.builtGroups === this.model.rows)) { this.stage++; this.feedback = ''; } }
  previous(): void { if (this.stage > 1) { this.stage--; this.feedback = ''; } }
  check(): void {
    const answer = this.studentAnswer.trim();
    if (!/^\d+$/.test(answer)) { this.feedback = 'Enter a whole-number answer, then explain your model.'; return; }
    this.feedback = Number(answer) === this.lesson.answer
      ? `Correct - ${this.lesson.answer} ${this.lesson.answerUnit}. Explain how your groups prove it.`
      : 'Try again. Use the groups, the inverse operation, or the number pattern to check.';
  }
  token(groupIndex: number, cellIndex: number): string {
    const model = this.model;
    return model.kind === 'pattern' ? model.tokens[cellIndex]
      : model.kind === 'number-pattern' ? model.tokens[groupIndex]
      : model.tokens[0];
  }
}
