import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, OnDestroy } from '@angular/core';
import { FoundationFrame, FoundationSequence } from './foundation-sequence';

@Component({
  selector: 'app-foundation-player',
  imports: [NgFor, NgIf],
  templateUrl: './foundation-player.html',
  styleUrl: './foundation-player.css'
})
export class FoundationPlayerComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) sequence!: FoundationSequence;
  @Input() preferredMethod?: string;
  methodIndex = 0;
  step = 0;
  readonly placeNames = ['Hundreds', 'Tens', 'Ones'];
  readonly placeValues = [100, 10, 1];
  playing = false;
  paused = false;
  completed = false;
  speed = 1;
  private run = 0;
  private animations = new Set<Animation>();
  private destroyed = false;
  private readonly reducedMotion = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(private readonly host: ElementRef<HTMLElement>, private readonly changeDetector: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.stop();
    this.methodIndex = Math.max(0, this.sequence.methods.findIndex(m => m.id === this.preferredMethod));
    this.step = 0;
  }
  ngOnDestroy(): void { this.destroyed = true; this.stop(); }
  @HostListener('document:visibilitychange')
  visibilityChanged(): void { if (document.hidden && this.playing) this.pause(); }

  get method() { return this.sequence.methods[this.methodIndex]; }
  get frame() { return this.method.frames[this.step]; }
  get sourceLinks() { return this.sequence.source.studentLinks.filter(link => this.method.sourcePages.includes(link.page)); }
  get playbackLabel(): string {
    if (this.completed) return 'Walkthrough complete';
    return `${this.playing ? 'Playing' : this.paused ? 'Paused' : 'Ready'} · Way ${this.methodIndex + 1} of ${this.sequence.methods.length}`;
  }
  trackIndex(index: number): number { return index; }
  chooseMethod(index: number): void {
    this.stop();
    this.methodIndex = index;
    this.step = 0;
    this.render();
    void this.animateScene(undefined, new Map(), undefined, this.run);
  }
  next(): void { this.manualStep(Math.min(this.step + 1, this.method.frames.length - 1)); }
  back(): void { this.manualStep(Math.max(this.step - 1, 0)); }
  replay(): void {
    this.stop();
    this.methodIndex = Math.max(0, this.sequence.methods.findIndex(m => m.id === this.preferredMethod));
    this.step = 0;
    this.render();
    this.play();
  }
  togglePlayback(): void { if (this.playing) this.pause(); else this.play(); }
  setSpeed(value: string): void {
    this.speed = Number(value);
    for (const animation of this.animations) animation.updatePlaybackRate(this.speed);
  }
  private pause(): void {
    this.playing = false;
    this.paused = true;
    for (const animation of this.animations) animation.pause();
    this.render();
  }
  private play(): void {
    if (this.paused) {
      this.playing = true;
      this.paused = false;
      for (const animation of this.animations) animation.play();
      this.render();
      return;
    }
    if (this.completed) {
      this.methodIndex = Math.max(0, this.sequence.methods.findIndex(m => m.id === this.preferredMethod));
      this.step = 0;
    }
    this.stop();
    this.playing = true;
    const run = this.run;
    this.render();
    void this.walkthrough(run);
  }
  private stop(): void {
    this.run++;
    this.playing = false;
    this.paused = false;
    this.completed = false;
    for (const animation of this.animations) animation.cancel();
    this.animations.clear();
  }
  private render(): void { if (!this.destroyed) this.changeDetector.detectChanges(); }
  private current(run: number): boolean { return !this.destroyed && this.run === run; }
  private async walkthrough(run: number): Promise<void> {
    await this.animateScene(undefined, new Map(), undefined, run);
    while (this.current(run)) {
      // A reading pause follows the motion; playback speed also controls this pause.
      const readingTime = Math.max(3500, this.frame.note.split(/\s+/).length * 230);
      await this.motion(this.host.nativeElement.querySelector('.foundation-equation'), [{opacity: 1}, {opacity: 1}], readingTime, 0, true);
      if (!this.current(run)) return;
      if (this.step < this.method.frames.length - 1) {
        await this.transition(this.step + 1, run);
      } else if (this.methodIndex < this.sequence.methods.length - 1) {
        this.methodIndex++;
        this.step = 0;
        this.render();
        await this.animateScene(undefined, new Map(), undefined, run);
      } else {
        this.playing = false;
        this.completed = true;
        this.render();
        return;
      }
    }
  }
  private manualStep(step: number): void {
    this.stop();
    void this.transition(step, this.run);
  }
  private elements(selector: string): HTMLElement[] {
    return Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>(selector));
  }
  private async transition(step: number, run: number): Promise<void> {
    const previous = this.frame;
    const next = this.method.frames[step];
    const rects = new Map<Element, DOMRect>();
    this.elements('.unit-bank .unit, .group-board .counter, .group-board .unit, .foundation-array > span').forEach(el => rects.set(el, el.getBoundingClientRect()));
    let origin: DOMRect | undefined;
    const trade = step > this.step ? next.places?.trade : undefined;
    if (trade) {
      const donors = this.elements('.place-column')[trade.from]?.querySelectorAll('.unit-bank .unit');
      const selected = Array.from(donors ?? []).slice(-trade.fromCount);
      origin = selected[0]?.getBoundingClientRect();
      // Keep the complete old collection visible until the donor has been identified.
      await Promise.all(selected.map(el => this.motion(el, [
        { boxShadow: '0 0 0 0px #e9a52f', transform: 'scale(1)' },
        { boxShadow: '0 0 0 5px #e9a52f', transform: 'scale(1.12)', offset: .5 },
        { boxShadow: '0 0 0 0px #e9a52f', transform: 'scale(1)' }
      ], 1100)));
    } else if (previous.groups?.pool && next.groups) {
      origin = this.host.nativeElement.querySelector('.pool .counter')?.getBoundingClientRect();
    }
    if (!this.current(run)) return;
    this.step = step;
    this.render();
    await this.animateScene(previous, rects, origin, run);
  }
  private async animateScene(previous: FoundationFrame | undefined, rects: Map<Element, DOMRect>, origin: DOMRect | undefined, run: number): Promise<void> {
    if (!this.current(run)) return;
    const jobs: Promise<void>[] = [];
    const add = (el: Element | null, frames: Keyframe[], duration = 850, delay = 0) => jobs.push(this.motion(el, frames, duration, delay));
    const enter = (el: Element, delay = 0) => add(el, [{opacity: 0, transform: 'translateY(-14px)'}, {opacity: 1, transform: 'translateY(0)'}], 650, delay);
    if (this.frame.places) {
      this.elements('.place-column').forEach((column, place) => {
        Array.from(column.querySelectorAll('.unit-bank .unit')).forEach((el, index) => {
          const before = previous?.places;
          const newlyRemoved = this.removed(index, place) && (!before || index < before.counts[place] - (before.removed?.[place] ?? 0));
          if (newlyRemoved) {
            add(el, [{opacity: 1, transform: 'scale(1.2)'}, {opacity: .5, transform: 'scale(1)'}], 650, (index - (this.frame.places!.counts[place] - (this.frame.places!.removed?.[place] ?? 0))) * 130);
          } else if (!before || index >= before.counts[place]) {
            if (origin) {
              const target = el.getBoundingClientRect();
              add(el, [{opacity: .35, transform: `translate(${origin.x - target.x}px, ${origin.y - target.y}px)`}, {opacity: 1, transform: 'translate(0, 0)'}], 1100, (index - (before?.counts[place] ?? 0)) * 60);
            } else enter(el, (place * 3 + index) * 65);
          }
        });
      });
    }
    if (this.frame.line) {
      const line = this.frame.line;
      const sameScale = previous?.line?.points.join(',') === line.points.join(',');
      const before = sameScale ? previous?.line?.reached ?? 0 : 0;
      this.elements('.number-line path').forEach((path, i) => {
        if (i >= before) add(path, [{strokeDasharray: '1', strokeDashoffset: '1'}, {strokeDasharray: '1', strokeDashoffset: '0'}], 1200, (i - before) * 450);
      });
      if (sameScale && line.reached === before + 1) {
        const start = this.lineX(before), end = this.lineX(line.reached);
        add(this.host.nativeElement.querySelector('.number-line circle'), Array.from({length: 25}, (_, i) => {
          const t = i / 24;
          return { transform: `translate(${(start - end) * (1 - t)}px, ${-212 * t * (1 - t)}px)`, offset: t };
        }), 1200);
      }
    }
    this.elements('.group-board .counter, .group-board .unit, .foundation-array > span').forEach((el, i) => {
      const old = rects.get(el), target = el.getBoundingClientRect();
      if (!old) {
        if (origin) add(el, [{opacity: .4, transform: `translate(${origin.x - target.x}px, ${origin.y - target.y}px)`}, {opacity: 1, transform: 'translate(0, 0)'}], 950, i * 60);
        else if (!el.classList.contains('unfilled')) enter(el, i * 55);
      } else if (this.frame.array?.area && i >= (previous?.array?.filled ?? 0) && i < (this.frame.array.filled ?? 0)) {
        add(el, [{opacity: .1}, {opacity: 1}], 850, (i - (previous?.array?.filled ?? 0)) * 180);
      } else if (Math.abs(old.x - target.x) > 1 || Math.abs(old.y - target.y) > 1) {
        const final = getComputedStyle(el).transform;
        add(el, [{transform: `translate(${old.x - target.x}px, ${old.y - target.y}px) ${final === 'none' ? '' : final}`}, {transform: final}], 1100);
      }
    });
    if (this.frame.graph) {
      if (!previous?.graph) this.elements('.graph-row .ball').forEach((el, i) => enter(el, i * 100));
      if (!previous?.graph?.bars) this.elements('.bar-track > span').forEach((el, i) => add(el, [{transform: 'scaleX(0)'}, {transform: 'scaleX(1)'}], 1300, i * 200));
    }
    if (this.frame.flow && !previous?.flow) {
      this.elements('.flow-parts > div').forEach((el, i) => enter(el, i * 500));
      const result = this.host.nativeElement.querySelector('.flow-result');
      if (result) enter(result, 1300);
    }
    // When a frame explains an unchanged model, direct attention to its equation.
    add(this.host.nativeElement.querySelector('.foundation-equation'), [{backgroundColor: '#fff0c2'}, {backgroundColor: getComputedStyle(this.host.nativeElement.querySelector('.foundation-equation')!).backgroundColor}], 1000);
    await Promise.all(jobs);
  }
  private async motion(element: Element | null, frames: Keyframe[], duration: number, delay = 0, hold = false): Promise<void> {
    if (!element || this.destroyed || (this.reducedMotion && !hold)) return;
    const animation = element.animate(frames, {duration, delay, fill: 'both', easing: hold ? 'linear' : 'ease-in-out'});
    animation.playbackRate = this.speed;
    if (this.paused) animation.pause();
    this.animations.add(animation);
    try { await animation.finished; } catch { /* Cancelled by navigation, restart, or manual stepping. */ }
    finally { this.animations.delete(animation); animation.cancel(); }
  }
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
