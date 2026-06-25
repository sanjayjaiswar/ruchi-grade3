import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { lessonTitle, MODULES } from './data/curriculum.data';
import {
  preferredReadAloudVoice,
  READ_ALOUD_TEST_TEXT,
  READ_ALOUD_VOICE_STORAGE_KEY,
  sortedReadAloudVoices
} from './shared/read-aloud-preferences';

const MODULE_THEME: Record<string, { label: string; accent: string; strong: string; soft: string; muted: string }> = {
  m1: { label: 'Groups', accent: '#2563eb', strong: '#1d4ed8', soft: '#dbeafe', muted: '#bfdbfe' },
  m2: { label: 'Measure', accent: '#197c72', strong: '#0f5d55', soft: '#e1f6f1', muted: '#a9ddd3' },
  m3: { label: 'Facts', accent: '#6d5bd0', strong: '#4f3aa8', soft: '#eeebff', muted: '#c9c0ff' },
  m4: { label: 'Area', accent: '#4f8a2f', strong: '#35681d', soft: '#ecf7df', muted: '#c3dfa8' },
  m5: { label: 'Fractions', accent: '#c44f73', strong: '#943555', soft: '#ffedf2', muted: '#f4bfd0' },
  m6: { label: 'Data', accent: '#2474a6', strong: '#18577d', soft: '#e5f4ff', muted: '#afd8f2' },
  m7: { label: 'Shapes', accent: '#8a5a28', strong: '#684017', soft: '#fff0dc', muted: '#e8c494' }
};

const LESSON_SHORT_LABELS: Record<string, string> = {
  'm1-l1': 'Equal Groups',
  'm1-l2': 'Arrays',
  'm1-l3': 'Factors',
  'm1-l4': 'Division Size',
  'm1-l5': 'Number of Groups',
  'm1-l6': 'Array Division',
  'm1-l7': 'Turn Arrays',
  'm1-l8': 'More Arrays',
  'm1-l9': 'Related Facts',
  'm1-l10': 'Break Apart Arrays',
  'm1-l11': 'Division Models',
  'm1-l12': 'Quotients of 2',
  'm1-l13': 'Quotients of 3',
  'm1-l14': 'Count by 4',
  'm1-l15': 'Arrays to Tape',
  'm1-l16': 'Break Apart Facts',
  'm1-l17': 'Multiply and Divide',
  'm1-l18': 'Decompose Units',
  'm1-l19': 'More Decomposing',
  'm1-l20': 'Two-Step Problems',
  'm1-l21': 'All Operations',
  'm2-l1': 'Stopwatch Time',
  'm2-l2': 'Clock Fives',
  'm2-l3': 'Nearest Minute',
  'm2-l4': 'Time Intervals',
  'm2-l5': 'Add Time',
  'm2-l6': 'Kilograms',
  'm2-l7': 'Estimate Weight',
  'm2-l8': 'Weight Problems',
  'm2-l9': 'Liters',
  'm2-l10': 'Liquid Volume',
  'm2-l11': 'Metric Problems',
  'm2-l12': 'Round Tens',
  'm2-l13': 'Round Numbers',
  'm2-l14': 'Round Hundreds',
  'm2-l15': 'Add Measures',
  'm2-l16': 'Compose Twice',
  'm2-l17': 'Estimate Sums',
  'm2-l18': 'Subtract Once',
  'm2-l19': 'Subtract Twice',
  'm2-l20': 'Estimate Differences',
  'm2-l21': 'Mixed Measures',
  'm3-l1': 'Known Facts',
  'm3-l2': 'Six Facts',
  'm3-l3': 'Unknown Letter',
  'm3-l4': 'Units of 6',
  'm3-l5': 'Units of 7',
  'm3-l6': 'Break Apart 6 and 7',
  'm3-l7': 'Unknowns',
  'm3-l8': 'Parentheses',
  'm3-l9': 'Associative Property',
  'm3-l10': 'Distributive Property',
  'm3-l11': 'Model Problems',
  'm3-l12': 'Nine as Ten Less One',
  'm3-l13': 'Patterns',
  'm3-l14': 'More Patterns',
  'm3-l15': 'Unknown Problems',
  'm3-l16': 'Zero and One',
  'm3-l17': 'Fact Table',
  'm3-l18': 'Two-Step Word Problems',
  'm3-l19': 'Tens on Chart',
  'm3-l20': 'Multiply Tens',
  'm3-l21': 'Tens Word Problems',
  'm4-l1': 'What Is Area',
  'm4-l2': 'Compare Areas',
  'm4-l3': 'Tile Area',
  'm4-l4': 'Side Lengths',
  'm4-l5': 'Make Rectangles',
  'm4-l6': 'Rows and Columns',
  'm4-l7': 'Area Arrays',
  'm4-l8': 'Multiply Side Lengths',
  'm4-l9': 'Reason About Area',
  'm4-l10': 'Split Rectangles',
  'm4-l11': 'Side Length Choices',
  'm4-l12': 'Area Problems',
  'm4-l13': 'Composite Area',
  'm4-l14': 'More Composite Area',
  'm4-l15': 'Floor Plans',
  'm4-l16': 'More Floor Plans',
  'm5-l1': 'Equal Parts',
  'm5-l2': 'Fold Strips',
  'm5-l3': 'Draw Fractions',
  'm5-l4': 'Different Wholes',
  'm5-l5': 'Unit Fractions',
  'm5-l6': 'Non-Unit Fractions',
  'm5-l7': 'Shaded Parts',
  'm5-l8': 'Fraction Bonds',
  'm5-l9': 'More Than One',
  'm5-l10': 'Compare Unit Fractions',
  'm5-l11': 'Different Wholes',
  'm5-l12': 'Find the Whole',
  'm5-l13': 'Name the Part',
  'm5-l14': 'Fractions 0 to 1',
  'm5-l15': 'Place Fractions',
  'm5-l16': 'Fractions Beyond 1',
  'm5-l17': 'Number Line Practice',
  'm5-l18': 'Compare on Line',
  'm5-l19': 'Distance on Line',
  'm5-l20': 'Same Size',
  'm5-l21': 'Same Point',
  'm5-l22': 'Equivalent Fractions',
  'm5-l23': 'More Equivalence',
  'm5-l24': 'Whole Numbers',
  'm5-l25': 'Wholes on Line',
  'm5-l26': 'Decompose Wholes',
  'm5-l27': 'Explain Equivalence',
  'm5-l28': 'Same Numerator',
  'm5-l29': 'Compare Fractions',
  'm5-l30': 'Partition Precisely',
  'm6-l1': 'Collect Data',
  'm6-l2': 'Tape Diagrams',
  'm6-l3': 'Bar Graphs',
  'm6-l4': 'Graph Problems',
  'm6-l5': 'Measure Inches',
  'm6-l6': 'Read Line Plots',
  'm6-l7': 'Make Line Plots',
  'm6-l8': 'More Line Plots',
  'm6-l9': 'Analyze Data',
  'm7-l1': 'Word Problems',
  'm7-l2': 'More Word Problems',
  'm7-l3': 'Compare Strategies',
  'm7-l4': 'Quadrilaterals',
  'm7-l5': 'Polygons',
  'm7-l6': 'Draw Polygons',
  'm7-l7': 'Tetrominoes',
  'm7-l8': 'Tangrams',
  'm7-l9': 'More Tangrams',
  'm7-l10': 'Perimeter Boundary',
  'm7-l11': 'Tessellate',
  'm7-l12': 'Measure Perimeter',
  'm7-l13': 'Perimeter Problems',
  'm7-l14': 'Unknown Sides',
  'm7-l15': 'Given Sides',
  'm7-l16': 'Circle Perimeters',
  'm7-l17': 'Unknown Measures',
  'm7-l18': 'Rectangles',
  'm7-l19': 'Plot Rectangles',
  'm7-l20': 'Perimeter and Area',
  'm7-l21': 'More Rectangles',
  'm7-l22': 'Line Plot Review',
  'm7-l23': 'Perimeter Word Problems',
  'm7-l24': 'Robot Shapes',
  'm7-l25': 'Robot Areas',
  'm7-l26': 'Robot Reasoning',
  'm7-l27': 'Robot Review',
  'm7-l28': 'Area and Perimeter',
  'm7-l29': 'More Area Problems',
  'm7-l30': 'Share Strategies',
  'm7-l31': 'One-Half',
  'm7-l32': 'More Halves',
  'm7-l33': 'Fluency Review',
  'm7-l34': 'Resource Booklet'
};

@Component({
  selector: 'app-root',
  imports: [NgFor, NgIf, NgStyle, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None
})
export class App implements OnInit, OnDestroy {
  readonly modules = MODULES;
  drawerCollapsed = true;
  activeModuleId = 'm1';
  activeLessonId = '';
  availableReadAloudVoices: SpeechSynthesisVoice[] = [];
  selectedReadAloudVoiceName = '';
  isTestingReadAloudVoice = false;
  private readonly expandedModules = new Set<string>(['m1']);
  private readonly voicesChangedHandler = () => this.loadReadAloudVoices();

  constructor(
    private readonly router: Router,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    this.syncActiveRoute(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.syncActiveRoute(event.urlAfterRedirects));
  }

  ngOnInit(): void {
    this.loadReadAloudVoices();
    if (this.canReadAloud()) {
      window.speechSynthesis.addEventListener('voiceschanged', this.voicesChangedHandler);
    }
  }

  ngOnDestroy(): void {
    if (this.canReadAloud()) {
      window.speechSynthesis.removeEventListener('voiceschanged', this.voicesChangedHandler);
      if (this.isTestingReadAloudVoice) {
        window.speechSynthesis.cancel();
      }
    }
  }

  toggleDrawer(): void {
    this.drawerCollapsed = !this.drawerCollapsed;
  }

  toggleModule(moduleId: string): void {
    if (this.expandedModules.has(moduleId)) {
      this.expandedModules.delete(moduleId);
      return;
    }
    this.expandedModules.add(moduleId);
  }

  isModuleExpanded(moduleId: string): boolean {
    return this.expandedModules.has(moduleId);
  }

  lessonNumber(lessonId: string): string {
    return lessonId.replace(/^m\d+-l/, '');
  }

  lessonLabel(moduleId: string, lessonId: string): string {
    return `Lesson ${this.lessonNumber(lessonId)} ${LESSON_SHORT_LABELS[lessonId] ?? this.shortObjective(moduleId, lessonId)}`;
  }

  moduleTheme(moduleId: string) {
    return MODULE_THEME[moduleId] ?? MODULE_THEME['m1'];
  }

  moduleThemeVars(moduleId: string) {
    const theme = this.moduleTheme(moduleId);
    return {
      '--module-accent': theme.accent,
      '--module-accent-strong': theme.strong,
      '--module-accent-soft': theme.soft,
      '--module-accent-muted': theme.muted
    };
  }

  moduleLabel(moduleId: string): string {
    return this.moduleTheme(moduleId).label;
  }

  selectReadAloudVoice(event: Event): void {
    const voiceName = (event.target as HTMLSelectElement).value;
    this.selectedReadAloudVoiceName = voiceName;
    this.stopReadAloudTest();

    if (typeof window === 'undefined') {
      return;
    }
    if (voiceName) {
      window.localStorage.setItem(READ_ALOUD_VOICE_STORAGE_KEY, voiceName);
    } else {
      window.localStorage.removeItem(READ_ALOUD_VOICE_STORAGE_KEY);
    }
  }

  testReadAloudVoice(): void {
    if (!this.canReadAloud()) {
      return;
    }

    if (this.isTestingReadAloudVoice) {
      this.stopReadAloudTest();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(READ_ALOUD_TEST_TEXT);
    const voice = preferredReadAloudVoice(window.speechSynthesis.getVoices(), this.selectedReadAloudVoiceName);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    utterance.onend = () => this.clearReadAloudTest();
    utterance.onerror = () => this.clearReadAloudTest();
    this.isTestingReadAloudVoice = true;
    window.speechSynthesis.speak(utterance);
  }

  private shortObjective(moduleId: string, lessonId: string): string {
    return lessonTitle(moduleId, lessonId)
      .replace(/^Lesson\s+\d+:\s*/, '')
      .replace(/[.,].*$/, '')
      .split(/\s+/)
      .slice(0, 4)
      .join(' ');
  }

  private canReadAloud(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined'
    );
  }

  private loadReadAloudVoices(): void {
    if (!this.canReadAloud()) {
      return;
    }

    const voices = sortedReadAloudVoices(window.speechSynthesis.getVoices());
    const storedVoiceName = window.localStorage.getItem(READ_ALOUD_VOICE_STORAGE_KEY) ?? '';
    this.availableReadAloudVoices = voices;
    this.selectedReadAloudVoiceName =
      storedVoiceName && voices.some((voice) => voice.name === storedVoiceName) ? storedVoiceName : '';
    this.changeDetector.detectChanges();
  }

  private stopReadAloudTest(): void {
    if (this.canReadAloud() && this.isTestingReadAloudVoice) {
      window.speechSynthesis.cancel();
    }
    this.isTestingReadAloudVoice = false;
  }

  private clearReadAloudTest(): void {
    this.isTestingReadAloudVoice = false;
    this.changeDetector.detectChanges();
  }

  private syncActiveRoute(url: string): void {
    const moduleMatch = url.match(/\/modules\/(m\d+)/);
    const lessonMatch = url.match(/\/modules\/(m\d+)\/lessons\/(\d+)/);

    if (moduleMatch) {
      this.activeModuleId = moduleMatch[1];
      this.expandedModules.add(this.activeModuleId);
    }

    this.activeLessonId = lessonMatch ? `${lessonMatch[1]}-l${lessonMatch[2]}` : '';
  }
}
