import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

export interface ReadingSourcePage {
  label: string;
  image: string;
  original: string;
  description: string;
  fullSpreadImage?: string;
}

@Component({
  selector: 'app-reading-source-viewer',
  imports: [NgFor, NgIf],
  templateUrl: './reading-source-viewer.html',
  styleUrl: './reading-source-viewer.css'
})
export class ReadingSourceViewer implements OnChanges {
  @Input() title = 'Official source';
  @Input() pages: readonly ReadingSourcePage[] = [];
  selected = 0;
  failed = false;
  get page(): ReadingSourcePage | undefined { return this.pages[this.selected]; }
  ngOnChanges(): void { this.selected = 0; this.failed = false; }
  select(index: number, viewport: HTMLElement): void {
    this.selected = index;
    this.failed = false;
    viewport.scrollTop = 0;
  }
}
