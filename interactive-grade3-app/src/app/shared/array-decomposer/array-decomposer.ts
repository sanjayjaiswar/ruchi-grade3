import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { animate, stagger } from 'animejs';

@Component({
  selector: 'app-array-decomposer',
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './array-decomposer.html',
  styleUrl: './array-decomposer.css'
})
export class ArrayDecomposerComponent implements AfterViewInit, OnChanges, OnInit {
  @Input() totalGroups = 7;
  @Input() groupSize = 3;
  @Input() initialSplit = 5;
  @Input() title = 'Break apart the array';
  @Input() context = 'Move the split to decompose the rows.';
  @Input() itemLabel = 'objects';

  @ViewChildren('dotEl') private readonly dotElements?: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('partLabelEl') private readonly partLabelElements?: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('splitLineEl') private readonly splitLineElement?: ElementRef<HTMLElement>;
  @ViewChild('equationEl') private readonly equationElement?: ElementRef<HTMLElement>;

  split = 1;
  stage: 0 | 1 | 2 | 3 = 0;
  isPlaying = false;

  ngOnInit(): void {
    this.split = this.validSplit(this.initialSplit);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialSplit'] || changes['totalGroups']) {
      this.split = this.validSplit(this.initialSplit);
    }
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.playAnimation());
  }

  get rows(): number[] {
    return Array.from({ length: this.totalGroups }, (_, index) => index + 1);
  }

  get columns(): number[] {
    return Array.from({ length: this.groupSize }, (_, index) => index + 1);
  }

  get secondPart(): number {
    return this.totalGroups - this.split;
  }

  get firstProduct(): number {
    return this.split * this.groupSize;
  }

  get secondProduct(): number {
    return this.secondPart * this.groupSize;
  }

  get totalProduct(): number {
    return this.totalGroups * this.groupSize;
  }

  get equation(): string {
    return `${this.totalGroups} × ${this.groupSize} = (${this.split} × ${this.groupSize}) + (${this.secondPart} × ${this.groupSize}) = ${this.firstProduct} + ${this.secondProduct} = ${this.totalProduct}`;
  }

  get splitOptions(): number[] {
    return Array.from({ length: Math.max(1, this.totalGroups - 1) }, (_, index) => index + 1);
  }

  get playLabel(): string {
    return this.isPlaying ? 'Playing' : 'Play';
  }

  rowClass(row: number): Record<string, boolean> {
    return {
      'is-first-part': this.stage >= 2 && row <= this.split,
      'is-second-part': this.stage >= 2 && row > this.split,
      'is-whole': this.stage < 2
    };
  }

  chooseSplit(value: number): void {
    this.split = this.validSplit(value);
    this.stage = 3;
    this.flashCurrentSplit();
  }

  async playAnimation(): Promise<void> {
    if (this.isPlaying) {
      return;
    }

    this.isPlaying = true;
    this.stage = 0;
    await this.waitForRender();
    await this.animateWholeArray();

    this.stage = 1;
    await this.waitForRender();
    await this.animateSplitLine();

    this.stage = 2;
    await this.waitForRender();
    await this.animateParts();

    this.stage = 3;
    await this.waitForRender();
    await this.animateEquation();
    this.isPlaying = false;
  }

  private async animateWholeArray(): Promise<void> {
    const dots = this.dotElementsArray();
    if (!dots.length) {
      return;
    }

    await animate(dots, {
      opacity: [0, 1],
      scale: [0.4, 1],
      duration: 520,
      delay: stagger(24, { grid: [this.totalGroups, this.groupSize], from: 'first' }),
      ease: 'out(3)'
    }).then();
  }

  private async animateSplitLine(): Promise<void> {
    const splitLine = this.splitLineElement?.nativeElement;
    if (!splitLine) {
      return;
    }

    await animate(splitLine, {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 520,
      ease: 'out(3)'
    }).then();
  }

  private async animateParts(): Promise<void> {
    const labels = this.partLabelElements?.map((label) => label.nativeElement) ?? [];
    const dots = this.dotElementsArray();

    await animate(dots, {
      scale: [1, 1.18, 1],
      duration: 580,
      delay: stagger(18, { grid: [this.totalGroups, this.groupSize], from: 'center' }),
      ease: 'out(3)'
    }).then();

    if (labels.length) {
      await animate(labels, {
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 320,
        delay: stagger(90),
        ease: 'out(2)'
      }).then();
    }
  }

  private async animateEquation(): Promise<void> {
    const equation = this.equationElement?.nativeElement;
    if (!equation) {
      return;
    }

    await animate(equation, {
      opacity: [0, 1],
      translateY: [8, 0],
      scale: [0.98, 1],
      duration: 360,
      ease: 'out(2)'
    }).then();
  }

  private flashCurrentSplit(): void {
    const splitLine = this.splitLineElement?.nativeElement;
    const equation = this.equationElement?.nativeElement;
    const targets = [splitLine, equation].filter((item): item is HTMLElement => Boolean(item));
    if (!targets.length) {
      return;
    }

    animate(targets, {
      scale: [1, 1.03, 1],
      duration: 320,
      ease: 'out(2)'
    });
  }

  private dotElementsArray(): HTMLElement[] {
    return this.dotElements?.map((dot) => dot.nativeElement) ?? [];
  }

  private waitForRender(): Promise<void> {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }

  private validSplit(value: number): number {
    const max = Math.max(1, this.totalGroups - 1);
    return Math.max(1, Math.min(Math.round(value || 1), max));
  }
}
