import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import {
  CURRENT_MATH_SOURCES,
  GRADE3_MATH_DOMAINS,
  MATHEMATICAL_PRACTICES
} from '../../data/current-math-sources.data';

type IReadyPageKind = 'overview' | 'curriculum' | 'syllabus' | 'assessment' | 'access' | 'sources';

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
  readonly practices = MATHEMATICAL_PRACTICES;
  readonly tabs: Array<{ kind: IReadyPageKind; label: string; link: string }> = [
    { kind: 'overview', label: 'Overview', link: '/ruchika/grade3/iready' },
    { kind: 'curriculum', label: 'Official Curriculum', link: '/ruchika/grade3/iready/curriculum' },
    { kind: 'syllabus', label: 'Grade 3 Syllabus', link: '/ruchika/grade3/iready/syllabus' },
    { kind: 'assessment', label: 'Assessment & My Path', link: '/ruchika/grade3/iready/assessment' },
    { kind: 'access', label: 'Access', link: '/ruchika/grade3/iready/access' },
    { kind: 'sources', label: 'Sources', link: '/ruchika/grade3/iready/sources' }
  ];

  pageKind: IReadyPageKind = 'overview';
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

  private syncPage(url: string): void {
    const path = url.split(/[?#]/)[0];
    const segment = path.split('/').filter(Boolean).at(-1);
    const routeKinds: IReadyPageKind[] = ['curriculum', 'syllabus', 'assessment', 'access', 'sources'];
    this.pageKind = routeKinds.includes(segment as IReadyPageKind) ? segment as IReadyPageKind : 'overview';
    const label = this.tabs.find((tab) => tab.kind === this.pageKind)?.label ?? 'Overview';
    this.title.setTitle(`${label} · i-Ready Math | Ruchika Grade 3`);
  }
}
