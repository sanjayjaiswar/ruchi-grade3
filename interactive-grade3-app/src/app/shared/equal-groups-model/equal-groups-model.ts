import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-equal-groups-model',
  imports: [NgFor, NgIf],
  templateUrl: './equal-groups-model.html',
  styleUrl: './equal-groups-model.css'
})
export class EqualGroupsModelComponent {
  @Input() groupCount = 6;
  @Input() groupSize = 2;
  @Input() lastGroupSize?: number;
  @Input() itemLabel = 'counter';
  @Input() showLabels = true;
  @Input() showAddition = true;
  @Input() showUnitForm = true;
  @Input() showMultiplication = true;
  @Input() compact = false;

  get groups(): number[] {
    return Array.from({ length: this.groupCount }, (_, index) => {
      if (this.lastGroupSize !== undefined && index === this.groupCount - 1) {
        return this.lastGroupSize;
      }
      return this.groupSize;
    });
  }

  get isEqual(): boolean {
    return this.groups.every((size) => size === this.groups[0]);
  }

  get total(): number {
    return this.groups.reduce((sum, size) => sum + size, 0);
  }

  get repeatedAddition(): string {
    return `${this.groups.join(' + ')} = ${this.total}`;
  }

  get unitForm(): string {
    return this.isEqual ? `${this.groupCount} ${this.groupSize}s = ${this.total}` : 'Groups are not equal';
  }

  get multiplicationSentence(): string {
    return this.isEqual ? `${this.groupCount} x ${this.groupSize} = ${this.total}` : 'Not a multiplication match yet';
  }

  items(size: number): number[] {
    return Array.from({ length: size }, (_, index) => index);
  }
}
