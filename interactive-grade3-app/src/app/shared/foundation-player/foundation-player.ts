import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FoundationSequence } from './foundation-sequence';

@Component({
  selector: 'app-foundation-player',
  imports: [NgFor, NgIf],
  templateUrl: './foundation-player.html',
  styleUrl: './foundation-player.css'
})
export class FoundationPlayerComponent implements OnChanges {
  @Input({ required: true }) sequence!: FoundationSequence;
  @Input() preferredMethod?: string;
  methodIndex = 0;
  step = 0;
  readonly placeNames = ['Hundreds', 'Tens', 'Ones'];
  readonly placeValues = [100, 10, 1];
  ngOnChanges(): void { this.methodIndex = Math.max(0, this.sequence.methods.findIndex(m => m.id === this.preferredMethod)); this.step = 0; }
  get method() { return this.sequence.methods[this.methodIndex]; }
  get frame() { return this.method.frames[this.step]; }
  get sourceLinks() { return this.sequence.source.studentLinks.filter(link => this.method.sourcePages.includes(link.page)); }
  chooseMethod(index: number): void { this.methodIndex = index; this.step = 0; }
  next(): void { this.step = Math.min(this.step + 1, this.method.frames.length - 1); }
  back(): void { this.step = Math.max(this.step - 1, 0); }
  replay(): void { this.step = 0; }
  unitName(place: number, count: number): string { return count === 1 ? ['hundred', 'ten', 'one'][place] : this.placeNames[place].toLowerCase(); }
  range(count: number): number[] { return Array.from({ length: count }, (_, i) => i); }
  removed(index: number, place: number): boolean {
    const p = this.frame.places;
    return !!p && index >= p.counts[place] - (p.removed?.[place] ?? 0);
  }
  lineX(index: number): number {
    const line = this.frame.line!;
    return 60 + (line.proportional ? (line.points[index] - line.points[0]) / (line.points.at(-1)! - line.points[0]) : index / (line.points.length - 1)) * 720;
  }
  arc(index: number): string {
    const start = this.lineX(index), end = this.lineX(index + 1);
    return `M ${start} 130 Q ${(start + end) / 2} 24 ${end} 130`;
  }
}
