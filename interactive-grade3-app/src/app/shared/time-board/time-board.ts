import '@browser.style/analog-clock';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewChecked, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import type {
  ProblemVisualTimeLineJump,
  ProblemVisualTimeLineSection,
  ProblemVisualTimeLineSourceItem
} from '../../data/lessons/lesson-runtime.types';

type SourceLayoutItem = ProblemVisualTimeLineSourceItem & {
  x: number;
  statusLabel: string;
  hour?: number;
};

type MatchLine = {
  sourceX: number;
  targetX: number;
  label: string;
  provided: boolean;
};

@Component({
  selector: 'app-time-board',
  imports: [NgClass, NgFor, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './time-board.html',
  styleUrl: './time-board.css'
})
export class TimeBoardComponent implements AfterViewChecked {
  @Input() timeLine?: ProblemVisualTimeLineSection;
  @Input() mode: 'blank' | 'solved' = 'blank';

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewChecked(): void {
    this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.library-clock[data-hour][data-minute]').forEach((host) => {
      if (!host.querySelector('analog-clock')) {
        host.innerHTML = '<analog-clock aria-hidden="true" indices marker="·" marker-hour="●" numerals="12"></analog-clock>';
      }
      const clock = host.querySelector<HTMLElement>('analog-clock');
      if (!clock) {
        return;
      }
      this.styleLibraryClock(clock);
      clock.style.setProperty('--_dh', this.clockHourDelayFromValues(Number(host.dataset['hour'] ?? 12), Number(host.dataset['minute'] ?? 0)));
      clock.style.setProperty('--_dm', this.clockMinuteDelayFromValue(Number(host.dataset['minute'] ?? 0)));
      clock.style.setProperty('--_ds', '0s');
    });
  }

  sourceItems(section: ProblemVisualTimeLineSection): SourceLayoutItem[] {
    const items = section.sourceItems ?? [];
    return items.map((item, index) => {
      const minute = item.minute ?? this.minuteFromLabel(item);
      return {
        ...item,
        minute,
        hour: this.hourFromItem(item),
        x: this.itemX(item, index, items.length, section, minute),
        statusLabel: this.sourceStatus(item)
      };
    });
  }

  pointX(minute: number, section: ProblemVisualTimeLineSection): number {
    return scaleLinear([this.domainStart(section), this.domainEnd(section)], [0, 100]).clamp(true)(minute);
  }

  ticks(section: ProblemVisualTimeLineSection): number[] {
    const parsed = section.tickLabels.map((label) => Number(label)).filter((value) => Number.isFinite(value));
    if (parsed.length === section.tickLabels.length && parsed.length > 0) {
      return parsed;
    }
    const start = this.domainStart(section);
    const end = this.domainEnd(section);
    const step = end - start > 30 ? 5 : 1;
    return Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, index) => start + index * step);
  }

  majorTicks(section: ProblemVisualTimeLineSection): number[] {
    const labelEvery = Math.max(1, Math.round(section.labelEvery ?? 5));
    return this.ticks(section).filter((minute) => minute % labelEvery === 0);
  }

  visiblePoints(section: ProblemVisualTimeLineSection): NonNullable<ProblemVisualTimeLineSection['points']> {
    const points = section.points ?? [];
    return this.mode === 'solved' ? points : points.filter((point) => point.open);
  }

  hasSourceItems(section: ProblemVisualTimeLineSection): boolean {
    return Boolean(section.sourceItems?.length);
  }

  showPointDetail(section: ProblemVisualTimeLineSection): boolean {
    return section.showPointDetails !== false;
  }

  jumpLeft(jump: ProblemVisualTimeLineJump, section: ProblemVisualTimeLineSection): number {
    return this.pointX(Math.min(jump.fromMinute, jump.toMinute), section);
  }

  jumpWidth(jump: ProblemVisualTimeLineJump, section: ProblemVisualTimeLineSection): number {
    return Math.max(1.5, Math.abs(this.pointX(jump.toMinute, section) - this.pointX(jump.fromMinute, section)));
  }

  jumpIsBackward(jump: ProblemVisualTimeLineJump): boolean {
    return jump.toMinute < jump.fromMinute;
  }

  matchLines(section: ProblemVisualTimeLineSection): MatchLine[] {
    return this.sourceItems(section)
      .filter((item) => {
        if (item.minute === undefined || item.status === 'unmatched') {
          return false;
        }
        return this.mode === 'solved' || item.status === 'provided';
      })
      .map((item) => ({
        sourceX: item.x,
        targetX: this.pointX(item.minute ?? 0, section),
        label: item.statusLabel,
        provided: item.status === 'provided'
      }));
  }

  clockHourDelay(item: SourceLayoutItem): string {
    return this.clockHourDelayFromValues(item.hour ?? 12, item.minute ?? 0);
  }

  clockMinuteDelay(item: SourceLayoutItem): string {
    return this.clockMinuteDelayFromValue(item.minute ?? 0);
  }

  private clockHourDelayFromValues(hour: number, minute: number): string {
    return `${-3600 * (hour % 12) - 60 * minute}s`;
  }

  private clockMinuteDelayFromValue(minute: number): string {
    return `${-60 * minute}s`;
  }

  private styleLibraryClock(clock: HTMLElement): void {
    clock.style.width = '104px';
    clock.style.height = '104px';
    clock.style.display = 'block';
    clock.style.colorScheme = 'light';
    clock.style.setProperty('--analog-clock-bg', 'radial-gradient(circle at 50% 50%, #ffffff 0 56%, #eef6ff 57% 70%, #d9ecff 71% 100%)');
    clock.style.setProperty('--analog-clock-c', '#17233c');
    clock.style.setProperty('--analog-clock-hour', '#263238');
    clock.style.setProperty('--analog-clock-minute', '#1a73e8');
    clock.style.setProperty('--analog-clock-second', 'transparent');
    clock.style.setProperty('--analog-clock-cap', '#34a853');
    clock.style.setProperty('--analog-clock-cap-sz', '9cqi');
    clock.style.setProperty('--analog-clock-indices-c', '#90a4ae');
    clock.style.setProperty('--analog-clock-indices-hour-c', '#0f4c81');
    clock.style.setProperty('--analog-clock-indices-fs', '5.5cqi');
    clock.style.setProperty('--analog-clock-fs', '7cqi');
    clock.style.setProperty('--analog-clock-label-fs', '0');
  }

  private itemX(item: ProblemVisualTimeLineSourceItem, index: number, count: number, section: ProblemVisualTimeLineSection, minute?: number): number {
    if (item.sourceX !== undefined) {
      return Math.max(0, Math.min(100, item.sourceX));
    }
    if (this.mode === 'solved' && minute !== undefined && item.status !== 'unmatched') {
      return this.pointX(minute, section);
    }
    if (this.mode === 'solved' && item.status === 'unmatched') {
      return index < count / 2 ? 4 : 96;
    }
    return count <= 1 ? 50 : index / (count - 1) * 100;
  }

  private sourceStatus(item: ProblemVisualTimeLineSourceItem): string {
    const sourceOrder = item.detail?.replace(/\s*-\s*\d{1,2}:\d{2}.*$/i, '').trim();
    if (item.status === 'unmatched') {
      const unmatchedTime = item.detail?.match(/\b\d{1,2}:\d{2}\b/);
      return this.mode === 'solved' ? (unmatchedTime ? `${unmatchedTime[0]} not matched` : 'not matched') : sourceOrder || 'source clock';
    }
    if (item.status === 'provided') {
      return sourceOrder || 'provided example';
    }
    if (this.mode === 'solved') {
      const match = item.detail?.match(/\b\d{1,2}:\d{2}\b/);
      return match?.[0] ?? sourceOrder ?? 'matched';
    }
    return sourceOrder || 'source clock';
  }

  private hourFromItem(item: ProblemVisualTimeLineSourceItem): number | undefined {
    const match = [item.detail, item.label].join(' ').match(/\b(\d{1,2}):(\d{2})\b/);
    return match ? Number(match[1]) : undefined;
  }

  private minuteFromLabel(item: ProblemVisualTimeLineSourceItem): number | undefined {
    const match = [item.detail, item.label].join(' ').match(/\b\d{1,2}:(\d{2})\b/);
    return match ? Number(match[1]) : undefined;
  }

  private domainStart(section: ProblemVisualTimeLineSection): number {
    if (section.displayStartMinute !== undefined) {
      return section.displayStartMinute;
    }
    const firstTick = Number(section.tickLabels[0]);
    return Number.isFinite(firstTick) ? firstTick : 0;
  }

  private domainEnd(section: ProblemVisualTimeLineSection): number {
    if (section.displayEndMinute !== undefined) {
      return section.displayEndMinute;
    }
    const lastTick = Number(section.tickLabels[section.tickLabels.length - 1]);
    return Number.isFinite(lastTick) ? lastTick : 60;
  }

}
