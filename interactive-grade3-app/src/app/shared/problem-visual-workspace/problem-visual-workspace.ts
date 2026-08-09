import '@browser.style/analog-clock';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Input, OnChanges } from '@angular/core';
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
  imports: [TimeBoardComponent, NgClass, NgFor, NgIf, NgTemplateOutlet],
  templateUrl: './problem-visual-workspace.html',
  styleUrl: './problem-visual-workspace.css'
})
export class ProblemVisualWorkspaceComponent implements AfterViewChecked, OnChanges {
  @Input({ required: true }) spec?: ProblemVisualSpec;
  @Input() mode: 'blank' | 'solved' = 'blank';
  private animationSignature = '';
  private interactionSignature = '';
  private readonly interactiveMatchPairs = new Map<number, number>();
  private readonly interactiveEntryValues = new Map<number, string>();
  private readonly interactiveResponseValues = new Map<string, string>();
  private readonly interactiveInlineValues = new Map<string, string>();
  private readonly inlineTokenCache = new Map<
    string,
    Array<{ text: string; input: boolean; answerIndex?: number; answer?: string }>
  >();
  private readonly selectedDataCells = new WeakMap<object, Set<string>>();
  private readonly selectedArrayCells = new WeakMap<object, Set<number>>();
  private readonly interactiveOwnerIds = new WeakMap<object, number>();
  private nextInteractiveOwnerId = 1;
  selectedExpressionTopIndex?: number;
  continuousMotionPaused = false;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  visibleSections(sections: ProblemVisualSection[] = []): ProblemVisualSection[] {
    return sections;
  }

  ngOnChanges(): void {
    const nextSignature = `${this.mode}|${this.spec?.title ?? ''}|${this.spec?.sections.map((section) => section.kind).join(',') ?? ''}`;
    if (nextSignature === this.interactionSignature) {
      return;
    }
    this.interactionSignature = nextSignature;
    this.selectedExpressionTopIndex = undefined;
    this.interactiveMatchPairs.clear();
    this.interactiveEntryValues.clear();
    this.interactiveResponseValues.clear();
    this.interactiveInlineValues.clear();
    this.selectedDataCells.delete(this.spec ?? {});
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

  unitFormWorkspaceSection(section: ProblemVisualSection): ProblemVisualUnitFormWorkspaceSection | undefined {
    return section.kind === 'unit-form-workspace' ? section : undefined;
  }

  unknownRiddleWorkspaceSection(section: ProblemVisualSection): ProblemVisualUnknownRiddleWorkspaceSection | undefined {
    return section.kind === 'unknown-riddle-workspace' ? section : undefined;
  }

  sourceResponseWorkspaceSection(section: ProblemVisualSection): ProblemVisualSourceResponseWorkspaceSection | undefined {
    return section.kind === 'source-response-workspace' ? section : undefined;
  }

  toggleDataCell(section: ProblemVisualDataTableSection, row: number, column: number, event: Event): void {
    if (this.mode !== 'blank' || !section.selectableCells || event.target instanceof HTMLInputElement) {
      return;
    }
    const selected = this.dataCellSelections(section);
    const key = `${row}:${column}`;
    selected.has(key) ? selected.delete(key) : selected.add(key);
  }

  dataCellSelectionState(
    section: ProblemVisualDataTableSection,
    row: number,
    column: number
  ): 'correct' | 'incorrect' | 'selected' | 'unselected' {
    const key = `${row}:${column}`;
    if (this.mode === 'solved' && section.showCorrectSelections && section.correctCellKeys?.includes(key)) {
      return 'correct';
    }
    if (!this.dataCellSelections(section).has(key)) {
      return 'unselected';
    }
    if (!section.correctCellKeys?.length) {
      return 'selected';
    }
    return section.correctCellKeys.includes(key) ? 'correct' : 'incorrect';
  }

  dataCellHasDrawingWorkspace(section: ProblemVisualDataTableSection, row: number, column: number): boolean {
    return this.mode === 'blank' && Boolean(section.drawingCellKeys?.includes(`${row}:${column}`));
  }

  toggleArrayCell(section: ProblemVisualArraySection, index: number): void {
    if (this.mode !== 'blank' || !section.selectableCells) return;
    const selected = this.arrayCellSelections(section);
    selected.has(index) ? selected.delete(index) : selected.add(index);
  }

  arrayCellIsSelected(section: ProblemVisualArraySection, index: number): boolean {
    return this.arrayCellSelections(section).has(index);
  }

  clearArraySelection(section: ProblemVisualArraySection): void {
    this.arrayCellSelections(section).clear();
  }

  startSketch(event: PointerEvent): void {
    const canvas = event.currentTarget as HTMLCanvasElement;
    canvas.setPointerCapture(event.pointerId);
    const context = canvas.getContext('2d');
    if (!context) return;
    const point = this.sketchPoint(canvas, event);
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = '#202124';
  }

  continueSketch(event: PointerEvent): void {
    const canvas = event.currentTarget as HTMLCanvasElement;
    if (!canvas.hasPointerCapture(event.pointerId)) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const point = this.sketchPoint(canvas, event);
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  finishSketch(event: PointerEvent): void {
    const canvas = event.currentTarget as HTMLCanvasElement;
    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  }

  clearSketch(canvas?: HTMLCanvasElement | null): void {
    if (!canvas) {
      return;
    }
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  }

  clearSketchFromControl(event: Event): void {
    const control = event.currentTarget as HTMLElement | null;
    this.clearSketch(control?.parentElement?.querySelector('canvas'));
  }

  selectExpressionTop(index: number): void {
    if (this.mode === 'blank') {
      this.selectedExpressionTopIndex = index;
    }
  }

  selectExpressionBottom(index: number): void {
    if (this.mode !== 'blank' || this.selectedExpressionTopIndex === undefined) {
      return;
    }
    for (const [topIndex, bottomIndex] of this.interactiveMatchPairs.entries()) {
      if (bottomIndex === index) {
        this.interactiveMatchPairs.delete(topIndex);
      }
    }
    this.interactiveMatchPairs.set(this.selectedExpressionTopIndex, index);
    this.selectedExpressionTopIndex = undefined;
  }

  clearExpressionMatches(): void {
    this.interactiveMatchPairs.clear();
    this.interactiveResponseValues.clear();
    this.selectedExpressionTopIndex = undefined;
  }

  setExpressionEntry(index: number, value: string): void {
    this.interactiveEntryValues.set(index, value);
  }

  expressionEntryState(
    section: ProblemVisualExpressionMatchSection,
    index: number
  ): 'correct' | 'incorrect' | 'unanswered' {
    const rawValue = this.interactiveEntryValues.get(index)?.trim();
    if (!rawValue) {
      return 'unanswered';
    }
    return rawValue === section.topAnswers?.[index] ? 'correct' : 'incorrect';
  }

  setExpressionResponse(rowIndex: number, answerIndex: number, value: string): void {
    this.interactiveResponseValues.set(`${rowIndex}:${answerIndex}`, value);
  }

  expressionResponseState(
    section: ProblemVisualExpressionMatchSection,
    rowIndex: number,
    answerIndex: number
  ): 'correct' | 'incorrect' | 'unanswered' {
    const rawValue = this.interactiveResponseValues.get(`${rowIndex}:${answerIndex}`)?.trim();
    if (!rawValue) {
      return 'unanswered';
    }
    return rawValue === section.rightAnswers?.[rowIndex]?.[answerIndex] ? 'correct' : 'incorrect';
  }

  expressionTopMatchState(
    section: ProblemVisualExpressionMatchSection,
    topIndex: number
  ): 'correct' | 'incorrect' | 'unanswered' {
    const bottomIndex = this.interactiveMatchPairs.get(topIndex);
    if (bottomIndex === undefined) {
      return this.mode === 'solved' ? 'correct' : 'unanswered';
    }
    return this.expressionPairIsCorrect(section, topIndex, bottomIndex) ? 'correct' : 'incorrect';
  }

  expressionBottomMatchState(
    section: ProblemVisualExpressionMatchSection,
    bottomIndex: number
  ): 'correct' | 'incorrect' | 'unanswered' {
    if (this.mode === 'solved') {
      return 'correct';
    }
    const pair = [...this.interactiveMatchPairs.entries()].find(([, selectedBottom]) => selectedBottom === bottomIndex);
    if (!pair) {
      return 'unanswered';
    }
    return this.expressionPairIsCorrect(section, pair[0], bottomIndex) ? 'correct' : 'incorrect';
  }

  expressionPairIsCorrect(
    section: ProblemVisualExpressionMatchSection,
    topIndex: number,
    bottomIndex: number
  ): boolean {
    return section.matches?.some((match) => match.topIndex === topIndex && match.bottomIndex === bottomIndex) ?? false;
  }

  interactiveExpressionPairs(
    section: ProblemVisualExpressionMatchSection
  ): Array<{ topIndex: number; bottomIndex: number }> {
    if (this.mode === 'solved') {
      return (section.matches ?? []).map(({ topIndex, bottomIndex }) => ({ topIndex, bottomIndex }));
    }
    return [...this.interactiveMatchPairs.entries()].map(([topIndex, bottomIndex]) => ({ topIndex, bottomIndex }));
  }

  expressionMatchStatus(section: ProblemVisualExpressionMatchSection): string {
    const pairs = this.interactiveExpressionPairs(section);
    if (this.mode === 'solved') {
      return `All ${pairs.length} correct matches are shown.`;
    }
    if (!pairs.length) {
      return 'No matches yet. Select an item in the first column, then select its match.';
    }
    const correct = pairs.filter((pair) => this.expressionPairIsCorrect(section, pair.topIndex, pair.bottomIndex)).length;
    return `${correct} correct · ${pairs.length - correct} need another try · ${Math.max(0, section.topItems.length - pairs.length)} remaining`;
  }

  matchLineY(index: number, count: number): number {
    return (index + 0.5) / Math.max(1, count) * 100;
  }

  responseLineTokens(line: string): Array<{ text: string; input: boolean; answerIndex?: number }> {
    let answerIndex = 0;
    return line
      .split(/(_{2,})/g)
      .filter(Boolean)
      .map((text) => {
        const input = /^_{2,}$/.test(text);
        return { text, input, answerIndex: input ? answerIndex++ : undefined };
      });
  }

  inlineTokens(line: string, answers: string[] | null | undefined = []): Array<{ text: string; input: boolean; answerIndex?: number; answer?: string }> {
    const normalizedAnswers = answers ?? [];
    const cacheKey = JSON.stringify([line, normalizedAnswers]);
    const cached = this.inlineTokenCache.get(cacheKey);
    if (cached) {
      return cached;
    }
    let answerIndex = 0;
    const tokens = line
      .split(/(_{2,})/g)
      .filter(Boolean)
      .map((text) => {
        const input = /^_{2,}$/.test(text);
        if (!input) {
          return { text, input };
        }
        const index = answerIndex++;
        return { text, input, answerIndex: index, answer: normalizedAnswers[index] };
      });
    this.inlineTokenCache.set(cacheKey, tokens);
    return tokens;
  }

  setInlineValue(owner: object, field: string, row: number, column: number, answerIndex: number, value: string): void {
    this.interactiveInlineValues.set(this.inlineKey(owner, field, row, column, answerIndex), value);
  }

  inlineState(
    owner: object,
    field: string,
    row: number,
    column: number,
    answerIndex: number,
    answer?: string
  ): 'correct' | 'incorrect' | 'unanswered' {
    if (!answer) {
      return 'unanswered';
    }
    const value = this.interactiveInlineValues.get(this.inlineKey(owner, field, row, column, answerIndex));
    if (!value?.trim()) {
      return 'unanswered';
    }
    return this.normalizeInlineAnswer(value) === this.normalizeInlineAnswer(answer) ? 'correct' : 'incorrect';
  }

  inlineInputMode(answer?: string): 'numeric' | 'text' {
    return answer && /^[$¢]?\s*-?\d+(?:\.\d+)?\s*(?:[$¢]|cm|g|kg|mL|L|minutes?|seconds?)?$/i.test(answer)
      ? 'numeric'
      : 'text';
  }

  private inlineKey(owner: object, field: string, row: number, column: number, answerIndex: number): string {
    let ownerId = this.interactiveOwnerIds.get(owner);
    if (!ownerId) {
      ownerId = this.nextInteractiveOwnerId++;
      this.interactiveOwnerIds.set(owner, ownerId);
    }
    return `${ownerId}:${field}:${row}:${column}:${answerIndex}`;
  }

  private dataCellSelections(section: ProblemVisualDataTableSection): Set<string> {
    let selected = this.selectedDataCells.get(section);
    if (!selected) {
      selected = new Set<string>();
      this.selectedDataCells.set(section, selected);
    }
    return selected;
  }

  private arrayCellSelections(section: ProblemVisualArraySection): Set<number> {
    let selected = this.selectedArrayCells.get(section);
    if (!selected) {
      selected = new Set<number>();
      this.selectedArrayCells.set(section, selected);
    }
    return selected;
  }

  private sketchPoint(canvas: HTMLCanvasElement, event: PointerEvent): { x: number; y: number } {
    const bounds = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * canvas.width / bounds.width,
      y: (event.clientY - bounds.top) * canvas.height / bounds.height
    };
  }

  private normalizeInlineAnswer(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/[×·]/g, 'x')
      .replace(/÷/g, 'divided by')
      .replace(/[;,&]/g, ' and ')
      .replace(/\band\b/g, ' ')
      .replace(/[.]$/g, '')
      .replace(/\s+/g, ' ');
  }

  sourceCropAspect(section: ProblemVisualSourceCropSection): string {
    return `${section.crop.width} / ${section.crop.height}`;
  }

  sourceCropSketchHeight(section: ProblemVisualSourceCropSection): number {
    return Math.max(180, Math.round(1200 * section.crop.height / section.crop.width));
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
