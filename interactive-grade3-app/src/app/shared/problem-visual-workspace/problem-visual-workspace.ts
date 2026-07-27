import '@browser.style/analog-clock';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Input } from '@angular/core';
import { animate, stagger } from 'animejs';
import { scaleLinear } from 'd3-scale';
import { TimeBoardComponent } from '../time-board/time-board';
import type {
  ProblemVisualArraySection,
  ProblemVisualAdditionStudioSection,
  ProblemVisualCardGridSection,
  ProblemVisualClockSection,
  ProblemVisualDataChartSection,
  ProblemVisualDataTableSection,
  ProblemVisualEquationsSection,
  ProblemVisualEstimateDifferenceWorkbookSection,
  ProblemVisualExpressionMatchSection,
  ProblemVisualFractionStripSection,
  ProblemVisualFloorPlanSection,
  ProblemVisualGeometryDiagramSection,
  ProblemVisualLinePlotSection,
  ProblemVisualMeasurementModelSection,
  ProblemVisualMeasurementLabSection,
  ProblemVisualNoteSection,
  ProblemVisualNumberBondSection,
  ProblemVisualNumberLineSection,
  ProblemVisualRelatedFactsSection,
  ProblemVisualSection,
  ProblemVisualSolutionPartsSection,
  ProblemVisualSpec,
  ProblemVisualSourceDirectionsSection,
  ProblemVisualSourceFirstWorkspaceSection,
  ProblemVisualSourceCropSection,
  ProblemVisualSourceResponseWorkspaceSection,
  ProblemVisualStopwatchSection,
  ProblemVisualTapeSection,
  ProblemVisualTimeLineSection,
  ProblemVisualUnitFormWorkspaceSection,
  ProblemVisualUnknownRiddleWorkspaceSection
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
  continuousMotionPaused = false;

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

  numberBondSection(section: ProblemVisualSection): ProblemVisualNumberBondSection | undefined {
    return section.kind === 'number-bond' ? section : undefined;
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

  clockFaceTicks(): number[] {
    return Array.from({ length: 60 }, (_, index) => index);
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

  additionStudioSection(section: ProblemVisualSection): ProblemVisualAdditionStudioSection | undefined {
    return section.kind === 'addition-studio' ? section : undefined;
  }

  estimateDifferenceWorkbookSection(section: ProblemVisualSection): ProblemVisualEstimateDifferenceWorkbookSection | undefined {
    return section.kind === 'estimate-difference-workbook' ? section : undefined;
  }

  sourceCropSection(section: ProblemVisualSection): ProblemVisualSourceCropSection | undefined {
    return section.kind === 'source-crop' ? section : undefined;
  }

  sourceFirstWorkspaceSection(section: ProblemVisualSection): ProblemVisualSourceFirstWorkspaceSection | undefined {
    return section.kind === 'source-first-workspace' ? section : undefined;
  }

  unitFormWorkspaceSection(section: ProblemVisualSection): ProblemVisualUnitFormWorkspaceSection | undefined {
    return section.kind === 'unit-form-workspace' ? section : undefined;
  }

  unknownRiddleWorkspaceSection(section: ProblemVisualSection): ProblemVisualUnknownRiddleWorkspaceSection | undefined {
    return section.kind === 'unknown-riddle-workspace' ? section : undefined;
  }

  sourceResponseWorkspaceSection(section: ProblemVisualSection): ProblemVisualSourceResponseWorkspaceSection | undefined {
    return section.kind === 'source-response-workspace' ? section : undefined;
  }

  sourceCropAspect(section: ProblemVisualSourceCropSection): string {
    return `${section.crop.width} / ${section.crop.height}`;
  }

  sourceCropImageWidth(section: ProblemVisualSourceCropSection): string {
    return `${section.imageWidth / section.crop.width * 100}%`;
  }

  sourceCropImageLeft(section: ProblemVisualSourceCropSection): string {
    return `${-section.crop.x / section.crop.width * 100}%`;
  }

  sourceCropImageTop(section: ProblemVisualSourceCropSection): string {
    return `${-section.crop.y / section.crop.height * 100}%`;
  }

  toggleContinuousMotion(): void {
    this.continuousMotionPaused = !this.continuousMotionPaused;
  }

  estimateRowDelay(groupIndex: number, rowIndex: number): string {
    return `${(groupIndex * 4 + rowIndex) * 0.85}s`;
  }

  distanceDomain(section: ProblemVisualEstimateDifferenceWorkbookSection): [number, number] {
    const values = section.distancePairs.flatMap((pair) => [pair.left, pair.right, pair.roundedLeft, pair.roundedRight]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = Math.max(10, (max - min) * 0.08);
    return [min - padding, max + padding];
  }

  distancePointPosition(section: ProblemVisualEstimateDifferenceWorkbookSection, value: number): string {
    const [min, max] = this.distanceDomain(section);
    return `${scaleLinear().domain([min, max]).range([3, 97]).clamp(true)(value)}%`;
  }

  range(count: number, max = 160): number[] {
    return Array.from({ length: Math.max(0, Math.min(count, max)) }, (_, index) => index);
  }

  arrayColumns(section: ProblemVisualArraySection): string {
    const minimum = section.columns > 16 ? 10 : 18;
    return `repeat(${Math.max(1, section.columns)}, minmax(${minimum}px, 1fr))`;
  }

  arrayCellIsAfterSplit(section: ProblemVisualArraySection, index: number): boolean {
    if (!section.splitAfterRows) {
      return false;
    }

    const row = Math.floor(index / section.columns);
    return row === section.splitAfterRows;
  }

  arrayCellIsAfterColumnSplit(section: ProblemVisualArraySection, index: number): boolean {
    if (!section.splitAfterColumns) {
      return false;
    }

    return index % section.columns === section.splitAfterColumns;
  }

  arrayCellIsSourceShaded(section: ProblemVisualArraySection, index: number): boolean {
    const row = Math.floor(index / section.columns);
    const column = index % section.columns;
    return (
      (section.shadeBeforeRows !== undefined && row < section.shadeBeforeRows) ||
      (section.shadeBeforeColumns !== undefined && column < section.shadeBeforeColumns) ||
      (section.shadeAfterRows !== undefined && row >= section.rows - section.shadeAfterRows) ||
      (section.shadeAfterColumns !== undefined && column >= section.columns - section.shadeAfterColumns)
    );
  }

  arrayCellIsGroupEnd(section: ProblemVisualArraySection, index: number): boolean {
    if (!section.groupEveryColumns) {
      return false;
    }

    const column = index % section.columns;
    return (column + 1) % section.groupEveryColumns === 0 && column < section.columns - 1;
  }

  arrayCellIsOutlined(section: ProblemVisualArraySection, index: number): boolean {
    if (section.outlineAfterColumns === undefined) {
      return false;
    }

    return index % section.columns >= section.outlineAfterColumns;
  }

  expressionMatchPairs(section: ProblemVisualExpressionMatchSection): Array<{ top: string; bottom: string }> {
    const count = Math.max(section.topItems.length, section.bottomItems.length);
    return Array.from({ length: count }, (_, index) => ({
      top: section.topItems[index] ?? '',
      bottom: section.bottomItems[index] ?? ''
    }));
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

  fractionStripCellCount(section: ProblemVisualFractionStripSection): number {
    const denominator = Math.max(1, section.denominator);
    const wholeCount = Math.max(1, Math.ceil(Math.max(0, section.numerator) / denominator));
    return denominator * wholeCount;
  }

  fractionStripIsShaded(section: ProblemVisualFractionStripSection, index: number): boolean {
    return this.mode === 'solved' && index < Math.max(0, section.numerator);
  }

  fractionStripIsRowEnd(section: ProblemVisualFractionStripSection, index: number): boolean {
    return (index + 1) % Math.max(1, section.denominator) === 0;
  }

  fractionStripHasRowBelow(section: ProblemVisualFractionStripSection, index: number): boolean {
    return index < this.fractionStripCellCount(section) - Math.max(1, section.denominator);
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
      return [];
    }
    const maxValue = Math.max(1, ...section.values.map((value) => value.value ?? 0));
    const scale = scaleLinear().domain([0, maxValue]).range([0, Math.min(maxValue, 12)]);
    const count = Math.round(scale(item.value ?? 0));
    return this.range(Math.max(0, count), 12);
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
      return '0%';
    }
    const max = section.maxValue && section.maxValue > 0
      ? section.maxValue
      : Math.max(1, ...section.values.map((value) => value.value ?? 0));
    return `${Math.max(0, Math.min(100, ((item.value ?? 0) / max) * 100))}%`;
  }

  chartSymbols(section: ProblemVisualDataChartSection, item: ProblemVisualDataChartSection['values'][number]): number[] {
    if (this.mode === 'blank' && !section.showBlankValues) {
      return [];
    }
    const unit = Math.max(1, section.unitSize ?? 1);
    const count = item.value === undefined ? 0 : Math.ceil(item.value / unit);
    return this.range(Math.max(0, count), 24);
  }

  chartTallyGroups(section: ProblemVisualDataChartSection, item: ProblemVisualDataChartSection['values'][number]): number[] {
    if (this.mode === 'blank' && !section.showBlankValues) {
      return [];
    }
    return this.range(Math.max(0, Math.ceil((item.value ?? 0) / 5)), 8);
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
    const measurementItems = Array.from(host.querySelectorAll<HTMLElement>('.visual-measurement .measurement-bars span, .visual-measurement .measurement-liquid .liquid-vessel, .visual-measurement .measurement-conversion span, .visual-measurement .measurement-rounding span, .visual-measurement .measurement-operation span, .visual-measurement-lab .kg-pan, .visual-measurement-lab .kg-ten-frame span, .visual-measurement-lab .kg-place-row, .visual-place-value-addition i, .visual-pv-regroupings span, .visual-pv-sum span, .visual-estimate-row:not(.is-head), .visual-addition-bridge span, .visual-addition-algorithm span, .visual-addition-compound span'));
    const numberLineItems = Array.from(host.querySelectorAll<HTMLElement>('.visual-number-line span, .visual-number-line-target'));
    const diagramItems = Array.from(host.querySelectorAll<HTMLElement>('.visual-floor-room, .visual-line-plot-x, .visual-geometry-shape'));
    const unitMarkers = Array.from(host.querySelectorAll<HTMLElement>('.unit-dot-column span, .unit-form-source-model'));
    const unitFormLines = Array.from(host.querySelectorAll<HTMLElement>('.unit-form-fields > span'));
    const riddlePairs = Array.from(host.querySelectorAll<HTMLElement>('.unknown-riddle-pairs article'));
    const decoderSlots = Array.from(host.querySelectorAll<HTMLElement>('.unknown-riddle-decoder span'));
    const responseLines = Array.from(host.querySelectorAll<HTMLElement>('.source-response-lines > span'));
    const instructionalCards = Array.from(host.querySelectorAll<HTMLElement>('.visual-sub-card'));

    const allAnimatedItems = [
      ...sections,
      ...arrayCells,
      ...tapeParts,
      ...matchCards,
      ...tableRows,
      ...equations,
      ...measurementItems,
      ...numberLineItems,
      ...diagramItems,
      ...unitMarkers,
      ...unitFormLines,
      ...riddlePairs,
      ...decoderSlots,
      ...responseLines,
      ...instructionalCards
    ];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      allAnimatedItems.forEach((element) => {
        element.style.opacity = '1';
        element.style.removeProperty('transform');
      });
      return;
    }

    if (sections.length) {
      animate(sections, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        translateY: [10, 0],
        duration: 320,
        delay: stagger(45),
        ease: 'out(2)'
      });
    }

    if (arrayCells.length) {
      animate(arrayCells, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        scale: [0.6, 1],
        duration: 420,
        delay: stagger(16, { from: 'first' }),
        ease: 'out(3)'
      });
    }

    if (tapeParts.length) {
      animate(tapeParts, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        scaleX: [0.72, 1],
        duration: 360,
        delay: stagger(28),
        ease: 'out(2)'
      });
    }

    if (matchCards.length) {
      animate(matchCards, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        translateY: [8, 0],
        duration: 340,
        delay: stagger(24),
        ease: 'out(2)'
      });
    }

    const rowItems = [...tableRows, ...equations, ...measurementItems];
    if (rowItems.length) {
      animate(rowItems, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        translateX: [-8, 0],
        duration: 320,
        delay: stagger(24),
        ease: 'out(2)'
      });
    }

    if (numberLineItems.length) {
      animate(numberLineItems, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        translateX: [-10, 0],
        scale: [0.88, 1],
        duration: 360,
        delay: stagger(34),
        ease: 'out(3)'
      });
    }

    if (diagramItems.length) {
      animate(diagramItems, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        scale: [0.82, 1],
        duration: 420,
        delay: stagger(22),
        ease: 'out(3)'
      });
    }

    if (unitMarkers.length) {
      animate(unitMarkers, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        scale: [0.68, 1],
        duration: 360,
        delay: stagger(70),
        ease: 'out(3)'
      });
    }

    if (unitFormLines.length) {
      animate(unitFormLines, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        translateX: [-10, 0],
        duration: 340,
        delay: stagger(85, { start: 180 }),
        ease: 'out(2)'
      });
    }

    if (riddlePairs.length) {
      animate(riddlePairs, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        translateY: [8, 0],
        duration: 330,
        delay: stagger(55),
        ease: 'out(2)'
      });
    }

    if (decoderSlots.length) {
      animate(decoderSlots, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        scale: [0.82, 1],
        duration: 300,
        delay: stagger(45, { start: 300 }),
        ease: 'out(3)'
      });
    }

    const workedResponseItems = [
      ...responseLines,
      ...instructionalCards
    ];
    if (workedResponseItems.length) {
      animate(workedResponseItems, {
        opacity: keepTextOpaque ? 1 : [0, 1],
        translateY: [8, 0],
        duration: 340,
        delay: stagger(70),
        ease: 'out(2)'
      });
    }
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
      this.styleWorkspaceLibraryClock(clock);
      clock.style.setProperty('--_dh', this.clockHourDelay(Number(host.dataset['hour'] ?? 12), Number(host.dataset['minute'] ?? 0)));
      clock.style.setProperty('--_dm', this.clockMinuteDelay(Number(host.dataset['minute'] ?? 0)));
      clock.style.setProperty('--_ds', '0s');
    });
  }

  private styleWorkspaceLibraryClock(clock: HTMLElement): void {
    clock.style.width = '126px';
    clock.style.height = '126px';
    clock.style.display = 'block';
    clock.style.colorScheme = 'light';
    clock.style.setProperty('--analog-clock-bg', 'radial-gradient(circle at 50% 50%, #ffffff 0 70%, #f5f5f5 71% 100%)');
    clock.style.setProperty('--analog-clock-c', '#202124');
    clock.style.setProperty('--analog-clock-hour', '#202124');
    clock.style.setProperty('--analog-clock-minute', '#202124');
    clock.style.setProperty('--analog-clock-second', 'transparent');
    clock.style.setProperty('--analog-clock-cap', '#202124');
    clock.style.setProperty('--analog-clock-cap-sz', '7cqi');
    clock.style.setProperty('--analog-clock-indices-c', '#5f6368');
    clock.style.setProperty('--analog-clock-indices-hour-c', '#202124');
    clock.style.setProperty('--analog-clock-indices-fs', '5cqi');
    clock.style.setProperty('--analog-clock-fs', '7cqi');
    clock.style.setProperty('--analog-clock-label-fs', '0');
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
