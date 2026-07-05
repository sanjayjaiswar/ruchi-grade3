import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import type {
  ProblemVisualArraySection,
  ProblemVisualClockSection,
  ProblemVisualDataTableSection,
  ProblemVisualEquationsSection,
  ProblemVisualNoteSection,
  ProblemVisualNumberLineSection,
  ProblemVisualRelatedFactsSection,
  ProblemVisualSection,
  ProblemVisualSpec,
  ProblemVisualTapeSection
} from '../../data/lessons/lesson-runtime.types';

@Component({
  selector: 'app-problem-visual-workspace',
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './problem-visual-workspace.html',
  styleUrl: './problem-visual-workspace.css'
})
export class ProblemVisualWorkspaceComponent {
  @Input({ required: true }) spec?: ProblemVisualSpec;
  @Input() mode: 'blank' | 'solved' = 'blank';

  arraySection(section: ProblemVisualSection): ProblemVisualArraySection | undefined {
    return section.kind === 'array' ? section : undefined;
  }

  relatedFactsSection(section: ProblemVisualSection): ProblemVisualRelatedFactsSection | undefined {
    return section.kind === 'related-facts' ? section : undefined;
  }

  tapeSection(section: ProblemVisualSection): ProblemVisualTapeSection | undefined {
    return section.kind === 'tape' ? section : undefined;
  }

  dataTableSection(section: ProblemVisualSection): ProblemVisualDataTableSection | undefined {
    return section.kind === 'data-table' ? section : undefined;
  }

  numberLineSection(section: ProblemVisualSection): ProblemVisualNumberLineSection | undefined {
    return section.kind === 'number-line' ? section : undefined;
  }

  clockSection(section: ProblemVisualSection): ProblemVisualClockSection | undefined {
    return section.kind === 'clock' ? section : undefined;
  }

  equationsSection(section: ProblemVisualSection): ProblemVisualEquationsSection | undefined {
    return section.kind === 'equations' ? section : undefined;
  }

  noteSection(section: ProblemVisualSection): ProblemVisualNoteSection | undefined {
    return section.kind === 'note' ? section : undefined;
  }

  range(count: number, max = 160): number[] {
    return Array.from({ length: Math.max(0, Math.min(count, max)) }, (_, index) => index);
  }

  arrayColumns(section: ProblemVisualArraySection): string {
    return `repeat(${Math.max(1, section.columns)}, minmax(18px, 1fr))`;
  }
}
