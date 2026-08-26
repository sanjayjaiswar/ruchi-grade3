import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

interface FamilyRoundingRecord {
  readonly digits: readonly number[];
  readonly value: number;
  readonly rounded: number;
}

@Component({
  selector: 'app-iready-family-rounding',
  imports: [NgFor, NgIf],
  templateUrl: './iready-family-rounding.html',
  styleUrl: './iready-family-rounding.css'
})
export class IReadyFamilyRoundingComponent {
  readonly players = [0, 1] as const;
  readonly hundreds = Array.from({ length: 9 }, (_, index) => (index + 1) * 100);
  readonly teachingSteps = [
    'Build 217 with place-value blocks.',
    'Place 217 between 200 and 300.',
    'Compare 217 with the halfway point, 250.',
    'Round 217 to the nearer hundred.'
  ] as const;

  viewMode: 'learn' | 'play' = 'learn';
  teachingStep = 1;
  activePlayer: 0 | 1 = 0;
  turnDigits: number[] = [];
  unplacedDigits: number[] = [];
  arrangedDigits: number[] = [];
  selectedHundred?: number;
  feedback = 'Player 1: draw three digit cards to begin.';
  winner?: 0 | 1;
  readonly records: [FamilyRoundingRecord[], FamilyRoundingRecord[]] = [[], []];
  readonly shadedHundreds: [Set<number>, Set<number>] = [new Set(), new Set()];

  get builtNumber(): number | undefined {
    if (this.arrangedDigits.length !== 3 || this.arrangedDigits[0] === 0) return undefined;
    return this.arrangedDigits[0] * 100 + this.arrangedDigits[1] * 10 + this.arrangedDigits[2];
  }

  get lowerHundred(): number | undefined {
    const value = this.builtNumber;
    return value === undefined ? undefined : Math.floor(value / 100) * 100;
  }

  get upperHundred(): number | undefined {
    const lower = this.lowerHundred;
    return lower === undefined ? undefined : lower + 100;
  }

  get midpoint(): number | undefined {
    const lower = this.lowerHundred;
    return lower === undefined ? undefined : lower + 50;
  }

  get markerPosition(): number {
    const value = this.builtNumber;
    const lower = this.lowerHundred;
    return value === undefined || lower === undefined ? 0 : value - lower;
  }

  get canCheckRound(): boolean {
    return this.builtNumber !== undefined && this.selectedHundred !== undefined && this.winner === undefined;
  }

  get remainingDigitSlots(): number[] {
    return Array.from({ length: 3 - this.arrangedDigits.length }, (_, index) => index);
  }

  selectView(mode: 'learn' | 'play'): void {
    this.viewMode = mode;
  }

  nextTeachingStep(): void {
    this.teachingStep = Math.min(this.teachingSteps.length, this.teachingStep + 1);
  }

  replayTeaching(): void {
    this.teachingStep = 1;
  }

  startGame(): void {
    this.viewMode = 'play';
  }

  drawDigits(): void {
    if (this.turnDigits.length || this.winner !== undefined) return;
    const pool = Array.from({ length: 9 }, (_, value) => value);
    for (let index = pool.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
    }
    this.turnDigits = pool.slice(0, 3);
    this.unplacedDigits = [...this.turnDigits];
    this.arrangedDigits = [];
    this.selectedHundred = undefined;
    this.feedback = `Player ${this.activePlayer + 1}: arrange the cards into a three-digit number.`;
  }

  placeDigit(digit: number): void {
    if (this.arrangedDigits.length >= 3 || this.winner !== undefined) return;
    if (this.arrangedDigits.length === 0 && digit === 0) {
      this.feedback = 'A three-digit number cannot begin with 0. Choose a different first digit.';
      return;
    }
    const index = this.unplacedDigits.indexOf(digit);
    if (index < 0) return;
    this.unplacedDigits.splice(index, 1);
    this.arrangedDigits.push(digit);
    this.selectedHundred = undefined;
    this.feedback = this.arrangedDigits.length === 3
      ? `Now decide which hundred ${this.builtNumber} is nearest to.`
      : `Choose ${3 - this.arrangedDigits.length} more digit${this.arrangedDigits.length === 2 ? '' : 's'}.`;
  }

  returnDigit(index: number): void {
    if (index < 0 || index >= this.arrangedDigits.length || this.winner !== undefined) return;
    const [digit] = this.arrangedDigits.splice(index, 1);
    this.unplacedDigits.push(digit);
    this.selectedHundred = undefined;
    this.feedback = 'Rearrange the cards to make a three-digit number.';
  }

  chooseHundred(value: number): void {
    if (this.builtNumber === undefined || this.winner !== undefined) return;
    this.selectedHundred = value;
    this.feedback = `You chose ${value}. Check the rounding to finish the turn.`;
  }

  checkRound(): void {
    const value = this.builtNumber;
    if (value === undefined || this.selectedHundred === undefined || this.winner !== undefined) return;
    const correctHundred = Math.round(value / 100) * 100;
    if (this.selectedHundred !== correctHundred) {
      const tensDigit = Math.floor(value / 10) % 10;
      this.feedback = tensDigit < 5
        ? `Not yet. The tens digit is ${tensDigit}, which is less than 5, so ${value} is closer to ${this.lowerHundred}.`
        : `Not yet. The tens digit is ${tensDigit}, which is 5 or more, so ${value} is closer to ${this.upperHundred}.`;
      return;
    }

    const player = this.activePlayer;
    const alreadyShaded = this.shadedHundreds[player].has(correctHundred);
    this.records[player].push({ digits: [...this.turnDigits], value, rounded: correctHundred });
    this.shadedHundreds[player].add(correctHundred);

    if (this.shadedHundreds[player].size >= 5) {
      this.winner = player;
      this.feedback = `Player ${player + 1} rounded ${value} to ${correctHundred} and shaded five hundreds. Player ${player + 1} wins!`;
      return;
    }

    this.activePlayer = player === 0 ? 1 : 0;
    this.clearTurn();
    this.feedback = alreadyShaded
      ? `Correct: ${value} rounds to ${correctHundred}. That hundred was already shaded. Player ${this.activePlayer + 1}, draw three cards.`
      : `Correct: ${value} rounds to ${correctHundred}. Player ${this.activePlayer + 1}, draw three cards.`;
  }

  hasShaded(player: 0 | 1, hundred: number): boolean {
    return this.shadedHundreds[player].has(hundred);
  }

  emptyRows(player: 0 | 1): number[] {
    return Array.from({ length: Math.max(0, 5 - this.records[player].length) }, (_, index) => index);
  }

  newGame(): void {
    this.activePlayer = 0;
    this.winner = undefined;
    this.records[0].splice(0);
    this.records[1].splice(0);
    this.shadedHundreds[0].clear();
    this.shadedHundreds[1].clear();
    this.clearTurn();
    this.feedback = 'Player 1: draw three digit cards to begin.';
  }

  private clearTurn(): void {
    this.turnDigits = [];
    this.unplacedDigits = [];
    this.arrangedDigits = [];
    this.selectedHundred = undefined;
  }
}
