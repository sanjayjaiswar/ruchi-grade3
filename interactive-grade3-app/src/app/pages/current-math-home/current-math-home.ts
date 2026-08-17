import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import {
  CALIFORNIA_GRADE3_BIG_IDEAS,
  CURRENT_MATH_SOURCES,
  DETAILED_GRADE3_MATH_DOMAINS,
  GRADE3_MATH_DOMAINS,
  MATHEMATICAL_PRACTICES,
  Grade3DetailedDomain
} from '../../data/current-math-sources.data';

type IReadyPageKind = 'overview' | 'curriculum' | 'syllabus' | 'assessment' | 'access' | 'sources';
type SyllabusSection = 'overview' | 'oa' | 'nbt' | 'nf' | 'md' | 'g' | 'practices';

@Component({
  selector: 'app-current-math-home-page',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './current-math-home.html',
  styleUrl: './current-math-home.css'
})
export class CurrentMathHomePage implements OnDestroy {
  readonly sources = CURRENT_MATH_SOURCES;
  readonly sourceList = Object.values(CURRENT_MATH_SOURCES);
  readonly domains = GRADE3_MATH_DOMAINS;
  readonly detailedDomains = DETAILED_GRADE3_MATH_DOMAINS;
  readonly bigIdeas = CALIFORNIA_GRADE3_BIG_IDEAS;
  readonly practices = MATHEMATICAL_PRACTICES;
  readonly twelveDots = Array.from({ length: 12 });
  readonly nineTensGroups = Array.from({ length: 9 });
  readonly tabs: Array<{ kind: IReadyPageKind; label: string; link: string }> = [
    { kind: 'overview', label: 'Overview', link: '/ruchika/grade3/iready' },
    { kind: 'curriculum', label: 'Official Curriculum', link: '/ruchika/grade3/iready/curriculum' },
    { kind: 'syllabus', label: 'Grade 3 Syllabus', link: '/ruchika/grade3/iready/syllabus' },
    { kind: 'assessment', label: 'Assessment & My Path', link: '/ruchika/grade3/iready/assessment' },
    { kind: 'access', label: 'Access', link: '/ruchika/grade3/iready/access' },
    { kind: 'sources', label: 'Sources', link: '/ruchika/grade3/iready/sources' }
  ];
  readonly syllabusTabs: Array<{ kind: SyllabusSection; label: string; link: string }> = [
    { kind: 'overview', label: 'Overview', link: '/ruchika/grade3/iready/syllabus' },
    { kind: 'oa', label: '3.OA · Operations', link: '/ruchika/grade3/iready/syllabus/oa' },
    { kind: 'nbt', label: '3.NBT · Base Ten', link: '/ruchika/grade3/iready/syllabus/nbt' },
    { kind: 'nf', label: '3.NF · Fractions', link: '/ruchika/grade3/iready/syllabus/nf' },
    { kind: 'md', label: '3.MD · Measurement', link: '/ruchika/grade3/iready/syllabus/md' },
    { kind: 'g', label: '3.G · Geometry', link: '/ruchika/grade3/iready/syllabus/g' },
    { kind: 'practices', label: 'MP1–MP8', link: '/ruchika/grade3/iready/syllabus/practices' }
  ];

  pageKind: IReadyPageKind = 'overview';
  syllabusSection: SyllabusSection = 'overview';
  private readonly routerSubscription: Subscription;

  constructor(
    private readonly title: Title,
    private readonly router: Router
  ) {
    this.syncPage(this.router.url);
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.syncPage(event.urlAfterRedirects));
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  get selectedSyllabusDomain(): Grade3DetailedDomain | undefined {
    return this.detailedDomains.find((domain) => domain.id === this.syllabusSection);
  }

  get selectedFrameworkIdeas() {
    const selectedTitles = new Set(this.selectedSyllabusDomain?.frameworkIdeas ?? []);
    return this.bigIdeas.filter((idea) => selectedTitles.has(idea.title));
  }

  private syncPage(url: string): void {
    const path = url.split(/[?#]/)[0];
    const segment = path.split('/').filter(Boolean).at(-1);
    const routeKinds: IReadyPageKind[] = ['curriculum', 'syllabus', 'assessment', 'access', 'sources'];
    const syllabusSections: SyllabusSection[] = ['oa', 'nbt', 'nf', 'md', 'g', 'practices'];
    if (path.includes('/iready/syllabus')) {
      this.pageKind = 'syllabus';
      this.syllabusSection = syllabusSections.includes(segment as SyllabusSection) ? segment as SyllabusSection : 'overview';
    } else {
      this.pageKind = routeKinds.includes(segment as IReadyPageKind) ? segment as IReadyPageKind : 'overview';
      this.syllabusSection = 'overview';
    }
    const syllabusLabel = this.syllabusTabs.find((tab) => tab.kind === this.syllabusSection)?.label;
    const label = this.pageKind === 'syllabus' && this.syllabusSection !== 'overview'
      ? syllabusLabel
      : this.tabs.find((tab) => tab.kind === this.pageKind)?.label ?? 'Overview';
    this.title.setTitle(`${label} · i-Ready Math | Ruchika Grade 3`);
  }
}
