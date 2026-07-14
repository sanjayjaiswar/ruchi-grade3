import '@browser.style/analog-clock';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Input } from '@angular/core';
import { animate, stagger } from 'animejs';
import { scaleLinear } from 'd3-scale';
import { TimeBoardComponent } from '../time-board/time-board';
import type {
  ProblemVisualArraySection,
  ProblemVisualCardGridSection,
  ProblemVisualClockSection,
  ProblemVisualDataChartSection,
  ProblemVisualDataTableSection,
  ProblemVisualEquationsSection,
  ProblemVisualExpressionMatchSection,
  ProblemVisualFractionStripSection,
  ProblemVisualFloorPlanSection,
  ProblemVisualGeometryDiagramSection,
  ProblemVisualLinePlotSection,
  ProblemVisualMeasurementModelSection,
  ProblemVisualMeasurementLabSection,
  ProblemVisualNoteSection,
  ProblemVisualNumberLineSection,
  ProblemVisualRelatedFactsSection,
  ProblemVisualSection,
  ProblemVisualSolutionPartsSection,
  ProblemVisualSpec,
  ProblemVisualSourceDirectionsSection,
  ProblemVisualStopwatchSection,
  ProblemVisualTapeSection,
  ProblemVisualTimeLineSection
} from '../../data/lessons/lesson-runtime.types';

@Component({
  selector: 'app-problem-visual-workspace',
  imports: [TimeBoardComponent, NgClass, NgFor, NgIf],
  templateUrl: './problem-visual-workspace.html',
  styleUrl: './problem-visual-workspace.css'
})
export class ProblemVisualWorkspaceComponent implements AfterViewChecked {
  @Input({ required: true }) spec?: ProblemVisualSpec;
  @Input() mode: 'blank' | 'solved' = 'blank';
  private animationSignature = '';

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  visibleSections(sections: ProblemVisualSection[] = []): ProblemVisualSection[] {
    return sections;
  }

  ngAfterViewChecked(): void {
    this.updateLibraryClocks();
    const signature = `${this.mode}|${this.spec?.title ?? ''}|${this.spec?.sections.map((section) => section.kind).join(',') ?? ''}`;
    if (signature === this.animationSignature) {
      return;
    }

    this.animationSignature = signature;
    queueMicrotask(() => this.playWorkspaceAnimation());
  }

  arraySection(section: ProblemVisualSection): ProblemVisualArraySection | undefined {
    return section.kind === 'array' ? section : undefined;
  }

  relatedFactsSection(section: ProblemVisualSection): ProblemVisualRelatedFactsSection | undefined {
    return section.kind === 'related-facts' ? section : undefined;
  }

  floorPlanSection(section: ProblemVisualSection): ProblemVisualFloorPlanSection | undefined {
    return section.kind === 'floor-plan' ? section : undefined;
  }

  linePlotSection(section: ProblemVisualSection): ProblemVisualLinePlotSection | undefined {
    return section.kind === 'line-plot' ? section : undefined;
  }

  dataChartSection(section: ProblemVisualSection): ProblemVisualDataChartSection | undefined {
    return section.kind === 'data-chart' ? section : undefined;
  }

  geometryDiagramSection(section: ProblemVisualSection): ProblemVisualGeometryDiagramSection | undefined {
    return section.kind === 'geometry-diagram' ? section : undefined;
  }

  tapeSection(section: ProblemVisualSection): ProblemVisualTapeSection | undefined {
    return section.kind === 'tape' ? section : undefined;
  }

  fractionStripSection(section: ProblemVisualSection): ProblemVisualFractionStripSection | undefined {
    return section.kind === 'fraction-strip' ? section : undefined;
  }

  cardGridSection(section: ProblemVisualSection): ProblemVisualCardGridSection | undefined {
    return section.kind === 'card-grid' ? section : undefined;
  }

  dataTableSection(section: ProblemVisualSection): ProblemVisualDataTableSection | undefined {
    return section.kind === 'data-table' ? section : undefined;
  }

  expressionMatchSection(section: ProblemVisualSection): ProblemVisualExpressionMatchSection | undefined {
    return section.kind === 'expression-match' ? section : undefined;
  }

  numberLineSection(section: ProblemVisualSection): ProblemVisualNumberLineSection | undefined {
    return section.kind === 'number-line' ? section : undefined;
  }

  clockSection(section: ProblemVisualSection): ProblemVisualClockSection | undefined {
    return section.kind === 'clock' ? section : undefined;
  }

  clockHasTime(clock: ProblemVisualClockSection): boolean {
    return this.clockTimeParts(clock) !== undefined;
  }

  clockHour(clock: ProblemVisualClockSection): number {
    return this.clockTimeParts(clock)?.hour ?? 12;
  }

  clockMinute(clock: ProblemVisualClockSection): number {
    return this.clockTimeParts(clock)?.minute ?? 0;
  }

  equationsSection(section: ProblemVisualSection): ProblemVisualEquationsSection | undefined {
    return section.kind === 'equations' ? section : undefined;
  }

  solutionPartsSection(section: ProblemVisualSection): ProblemVisualSolutionPartsSection | undefined {
    return section.kind === 'solution-parts' ? section : undefined;
  }

  sourceDirectionsSection(section: ProblemVisualSection): ProblemVisualSourceDirectionsSection | undefined {
    return section.kind === 'source-directions' ? section : undefined;
  }

  noteSection(section: ProblemVisualSection): ProblemVisualNoteSection | undefined {
    return section.kind === 'note' ? section : undefined;
  }

  stopwatchSection(section: ProblemVisualSection): ProblemVisualStopwatchSection | undefined {
    return section.kind === 'stopwatch-workspace' ? section : undefined;
  }

  stopwatchSourceColumns(section: ProblemVisualStopwatchSection): string {
    return `repeat(${Math.max(1, Math.min(6, Math.round(section.sourceWorkColumns ?? 1)))}, minmax(0, 1fr))`;
  }

  timeLineSection(section: ProblemVisualSection): ProblemVisualTimeLineSection | undefined {
    return section.kind === 'time-number-line' ? section : undefined;
  }

  measurementModelSection(section: ProblemVisualSection): ProblemVisualMeasurementModelSection | undefined {
    return section.kind === 'measurement-model' ? section : undefined;
  }

  measurementLabSection(section: ProblemVisualSection): ProblemVisualMeasurementLabSection | undefined {
    return section.kind === 'measurement-lab' ? section : undefined;
  }

  range(count: number, max = 160): number[] {
    return Array.from({ length: Math.max(0, Math.min(count, max)) }, (_, index) => index);
  }

  arrayColumns(section: ProblemVisualArraySection): string {
    return `repeat(${Math.max(1, section.columns)}, minmax(18px, 1fr))`;
  }

  arrayCellIsAfterSplit(section: ProblemVisualArraySection, index: number): boolean {
    if (!section.splitAfterRows) {
      return false;
    }

    const row = Math.floor(index / section.columns);
    return row === section.splitAfterRows;
  }

  tapeBraceGridColumn(brace: NonNullable<ProblemVisualTapeSection['braces']>[number]): string {
    const start = Math.max(0, Math.round(brace.startPart));
    const span = Math.max(1, Math.round(brace.partCount));
    return `${start + 1} / span ${span}`;
  }

  tapeBraceGridColumnStart(brace: NonNullable<ProblemVisualTapeSection['braces']>[number]): number {
    return Math.max(0, Math.round(brace.startPart)) + 1;
  }

  tapeBraceGridColumnEnd(brace: NonNullable<ProblemVisualTapeSection['braces']>[number]): string {
    return `span ${Math.max(1, Math.round(brace.partCount))}`;
  }

  tapeBraceOffsetPercent(brace: NonNullable<ProblemVisualTapeSection['braces']>[number], partCount: number): number {
    const total = Math.max(1, partCount);
    return (Math.max(0, Math.round(brace.startPart)) / total) * 100;
  }

  tapeBraceWidthPercent(brace: NonNullable<ProblemVisualTapeSection['braces']>[number], partCount: number): number {
    const total = Math.max(1, partCount);
    return (Math.max(1, Math.round(brace.partCount)) / total) * 100;
  }

  tapeBraceOffsetStyle(brace: NonNullable<ProblemVisualTapeSection['braces']>[number], partCount: number): string {
    return `${this.tapeBraceOffsetPercent(brace, partCount)}%`;
  }

  tapeBraceWidthStyle(brace: NonNullable<ProblemVisualTapeSection['braces']>[number], partCount: number): string {
    return `${this.tapeBraceWidthPercent(brace, partCount)}%`;
  }

  tapeBraceStyle(brace: NonNullable<ProblemVisualTapeSection['braces']>[number], partCount: number): string {
    return `left: ${this.tapeBraceOffsetStyle(brace, partCount)}; width: ${this.tapeBraceWidthStyle(brace, partCount)};`;
  }

  tapeTopPartGridColumn(topPart: NonNullable<ProblemVisualTapeSection['topParts']>[number]): string {
    const start = Math.max(0, Math.round(topPart.startPart));
    const span = Math.max(1, Math.round(topPart.partCount ?? 1));
    return `${start + 1} / span ${span}`;
  }

  tapeTopPartGridColumnStart(topPart: NonNullable<ProblemVisualTapeSection['topParts']>[number]): number {
    return Math.max(0, Math.round(topPart.startPart)) + 1;
  }

  tapeTopPartGridColumnEnd(topPart: NonNullable<ProblemVisualTapeSection['topParts']>[number]): string {
    return `span ${Math.max(1, Math.round(topPart.partCount ?? 1))}`;
  }

  fractionStripColumns(section: ProblemVisualFractionStripSection): string {
    return `repeat(${Math.max(1, section.denominator)}, minmax(42px, 1fr))`;
  }

  fractionStripIsShaded(section: ProblemVisualFractionStripSection, index: number): boolean {
    return this.mode === 'solved' && index < Math.max(0, Math.min(section.numerator, section.denominator));
  }

  fractionStripCellLabel(section: ProblemVisualFractionStripSection, index: number): string {
    if (!this.fractionStripIsShaded(section, index)) {
      return '';
    }
    return section.unitLabel ?? `1/${section.denominator}`;
  }


  expressionMatchColumns(count: number): string {
    return `repeat(${Math.max(1, count)}, minmax(110px, 1fr))`;
  }

  expressionMatchTop(
    section: ProblemVisualExpressionMatchSection,
    match: NonNullable<ProblemVisualExpressionMatchSection['matches']>[number]
  ): string {
    return section.topItems[match.topIndex] ?? '';
  }

  expressionMatchBottom(
    section: ProblemVisualExpressionMatchSection,
    match: NonNullable<ProblemVisualExpressionMatchSection['matches']>[number]
  ): string {
    return section.bottomItems[match.bottomIndex] ?? '';
  }

  measurementFill(section: ProblemVisualMeasurementModelSection, value: NonNullable<ProblemVisualMeasurementModelSection['values']>[number]): string {
    if (value.value === undefined) {
      return '0%';
    }

    const max = section.maxValue && section.maxValue > 0 ? section.maxValue : Math.max(1, value.value);
    return `${Math.max(0, Math.min(100, value.value / max * 100))}%`;
  }

  floorRoomLeft(plan: ProblemVisualFloorPlanSection, room: ProblemVisualFloorPlanSection['rooms'][number]): number {
    return this.percentScale(plan.widthUnits)(room.x);
  }

  floorRoomTop(plan: ProblemVisualFloorPlanSection, room: ProblemVisualFloorPlanSection['rooms'][number]): number {
    return this.percentScale(plan.heightUnits)(room.y);
  }

  floorRoomWidth(plan: ProblemVisualFloorPlanSection, room: ProblemVisualFloorPlanSection['rooms'][number]): number {
    return this.percentScale(plan.widthUnits)(room.width);
  }

  floorRoomHeight(plan: ProblemVisualFloorPlanSection, room: ProblemVisualFloorPlanSection['rooms'][number]): number {
    return this.percentScale(plan.heightUnits)(room.height);
  }

  linePlotColumns(section: ProblemVisualLinePlotSection): string {
    return `repeat(${Math.max(1, section.values.length)}, minmax(42px, 1fr))`;
  }

  linePlotXs(section: ProblemVisualLinePlotSection, item: ProblemVisualLinePlotSection['values'][number]): number[] {
    if (this.mode === 'blank' && !section.showBlankValues) {
      return [0];
    }
    const maxValue = Math.max(1, ...section.values.map((value) => value.value ?? 0));
    const scale = scaleLinear().domain([0, maxValue]).range([0, Math.min(maxValue, 12)]);
    const count = Math.round(scale(item.value ?? 0));
    return this.range(Math.max(this.mode === 'blank' ? 1 : 0, count), 12);
  }

  chartValueLabel(section: ProblemVisualDataChartSection, item: ProblemVisualDataChartSection['values'][number]): string {
    if (this.mode === 'blank' && !section.showBlankValues) {
      return item.valueLabel ?? '____';
    }
    if (item.value !== undefined) {
      return String(item.value);
    }
    return item.valueLabel ?? '____';
  }

  chartBarWidth(section: ProblemVisualDataChartSection, item: ProblemVisualDataChartSection['values'][number]): string {
    if (this.mode === 'blank' && !section.showBlankValues) {
      return '18%';
    }
    const max = section.maxValue && section.maxValue > 0
      ? section.maxValue
      : Math.max(1, ...section.values.map((value) => value.value ?? 0));
    return `${Math.max(6, Math.min(100, ((item.value ?? 0) / max) * 100))}%`;
  }

  chartSymbols(section: ProblemVisualDataChartSection, item: ProblemVisualDataChartSection['values'][number]): number[] {
    if (this.mode === 'blank' && !section.showBlankValues) {
      return [0, 1, 2];
    }
    const unit = Math.max(1, section.unitSize ?? 1);
    const count = item.value === undefined ? 0 : Math.ceil(item.value / unit);
    return this.range(Math.max(this.mode === 'blank' ? 1 : 0, count), 24);
  }

  chartTallyGroups(section: ProblemVisualDataChartSection, item: ProblemVisualDataChartSection['values'][number]): number[] {
    if (this.mode === 'blank' && !section.showBlankValues) {
      return [0];
    }
    return this.range(Math.max(this.mode === 'blank' ? 1 : 0, Math.ceil((item.value ?? 0) / 5)), 8);
  }

  geometryShapeLeft(shape: ProblemVisualGeometryDiagramSection['shapes'][number]): number {
    return shape.x;
  }

  geometryShapeTop(shape: ProblemVisualGeometryDiagramSection['shapes'][number]): number {
    return shape.y;
  }

  geometryShapeWidth(shape: ProblemVisualGeometryDiagramSection['shapes'][number]): number {
    return shape.width;
  }

  geometryShapeHeight(shape: ProblemVisualGeometryDiagramSection['shapes'][number]): number {
    return shape.height;
  }

  private playWorkspaceAnimation(): void {
    const host = this.elementRef.nativeElement;
    const keepTextOpaque = Boolean(host.closest(
      '.lesson-m2-l6, .lesson-m2-l7, .lesson-m2-l8, .lesson-m2-l9, .lesson-m2-l10, .lesson-m2-l11, .lesson-m2-l12, .lesson-m2-l13, .lesson-m2-l14, .lesson-m2-l15, .lesson-m2-l16, .lesson-m2-l17, .lesson-m2-l18, .lesson-m2-l19, .lesson-m2-l20, .lesson-m2-l21'
    ));
    const sections = Array.from(host.querySelectorAll<HTMLElement>('.visual-section'));
    const arrayCells = Array.from(host.querySelectorAll<HTMLElement>('.visual-array span'));
    const tapeParts = Array.from(host.querySelectorAll<HTMLElement>('.visual-tape span, .visual-fraction-strip span'));
    const matchCards = Array.from(host.querySelectorAll<HTMLElement>('.visual-expression-match-row span, .visual-expression-match-key span'));
    const tableRows = Array.from(host.querySelectorAll<HTMLElement>('.visual-data-row:not(.is-head)'));
    const equations = Array.from(host.querySelectorAll<HTMLElement>('.visual-equations span'));
    const measurementItems = Array.from(host.querySelectorAll<HTMLElement>('.visual-measurement .measurement-bars span, .visual-measurement .measurement-liquid .liquid-vessel, .visual-measurement .measurement-conversion span, .visual-measurement .measurement-rounding span, .visual-measurement .measurement-operation span, .visual-measurement-lab .kg-pan, .visual-measurement-lab .kg-ten-frame span, .visual-measurement-lab .kg-place-row, .visual-place-value-addition i, .visual-pv-regroupings span, .visual-pv-sum span, .visual-estimate-row:not(.is-head)'));
    const numberLineItems = Array.from(host.querySelectorAll<HTMLElement>('.visual-number-line span, .visual-number-line-target'));
    const diagramItems = Array.from(host.querySelectorAll<HTMLElement>('.visual-floor-room, .visual-line-plot-x, .visual-geometry-shape'));

    animate(sections, {
      opacity: keepTextOpaque ? 1 : [0, 1],
      translateY: [10, 0],
      duration: 320,
      delay: stagger(45),
      ease: 'out(2)'
    });

    animate(arrayCells, {
      opacity: keepTextOpaque ? 1 : [0, 1],
      scale: [0.6, 1],
      duration: 420,
      delay: stagger(16, { from: 'first' }),
      ease: 'out(3)'
    });

    animate(tapeParts, {
      opacity: keepTextOpaque ? 1 : [0, 1],
      scaleX: [0.72, 1],
      duration: 360,
      delay: stagger(28),
      ease: 'out(2)'
    });

    animate(matchCards, {
      opacity: keepTextOpaque ? 1 : [0, 1],
      translateY: [8, 0],
      duration: 340,
      delay: stagger(24),
      ease: 'out(2)'
    });

    animate([...tableRows, ...equations, ...measurementItems], {
      opacity: keepTextOpaque ? 1 : [0, 1],
      translateX: [-8, 0],
      duration: 320,
      delay: stagger(24),
      ease: 'out(2)'
    });

    animate(numberLineItems, {
      opacity: keepTextOpaque ? 1 : [0, 1],
      translateX: [-10, 0],
      scale: [0.88, 1],
      duration: 360,
      delay: stagger(34),
      ease: 'out(3)'
    });

    animate(diagramItems, {
      opacity: keepTextOpaque ? 1 : [0, 1],
      scale: [0.82, 1],
      duration: 420,
      delay: stagger(22),
      ease: 'out(3)'
    });
  }

  private percentScale(max: number): (value: number) => number {
    return scaleLinear().domain([0, Math.max(1, max)]).range([0, 100]).clamp(true);
  }

  private updateLibraryClocks(): void {
    this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.workspace-library-clock[data-hour][data-minute]').forEach((host) => {
      if (!host.querySelector('analog-clock')) {
        host.innerHTML = '<analog-clock aria-hidden="true" indices marker="·" marker-hour="●" numerals="12"></analog-clock>';
      }
      const clock = host.querySelector<HTMLElement>('analog-clock');
      if (!clock) {
        return;
      }
      clock.style.setProperty('--_dh', this.clockHourDelay(Number(host.dataset['hour'] ?? 12), Number(host.dataset['minute'] ?? 0)));
      clock.style.setProperty('--_dm', this.clockMinuteDelay(Number(host.dataset['minute'] ?? 0)));
      clock.style.setProperty('--_ds', '0s');
    });
  }

  private clockTimeParts(clock: ProblemVisualClockSection): { hour: number; minute: number } | undefined {
    const source = clock.timeValue ?? clock.timeLabel;
    const match = source.match(/\b(\d{1,2}):(\d{2})\b/);
    if (!match) {
      return undefined;
    }
    return {
      hour: Number(match[1]),
      minute: Number(match[2])
    };
  }

  private clockHourDelay(hour: number, minute: number): string {
    return `${-3600 * (hour % 12) - 60 * minute}s`;
  }

  private clockMinuteDelay(minute: number): string {
    return `${-60 * minute}s`;
  }

}
