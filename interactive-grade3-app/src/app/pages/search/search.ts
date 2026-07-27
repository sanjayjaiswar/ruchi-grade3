import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LocalSearchRecord, LocalSearchResult, searchLocalRecords } from '../../search/local-search';
import { LocalSearchService } from '../../search/local-search.service';

type SearchContextLink = {
  label: string;
  path: string;
  anchor?: string;
};

@Component({
  selector: 'app-search-page',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchPage implements OnInit {
  readonly pageSizeOptions = [10, 20, 50];
  query = '';
  results: LocalSearchResult[] = [];
  total = 0;
  page = 1;
  pageSize = 10;
  loading = false;
  error = '';
  private searchSequence = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly search: LocalSearchService,
    private readonly title: Title,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = (params.get('q') ?? '').trim();
      const requestedPageSize = Number(params.get('pageSize'));
      this.pageSize = this.pageSizeOptions.includes(requestedPageSize) ? requestedPageSize : 10;
      this.page = Math.max(1, Number(params.get('page')) || 1);
      this.title.setTitle(this.query ? `Search: ${this.query} | Ruchika Grade 3 Maths` : 'Search | Ruchika Grade 3 Maths');
      void this.runSearch();
    });
  }

  get pagedResults(): LocalSearchResult[] {
    const start = (this.page - 1) * this.pageSize;
    return this.results.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  get firstResultNumber(): number {
    return this.total ? (this.page - 1) * this.pageSize + 1 : 0;
  }

  get lastResultNumber(): number {
    return Math.min(this.page * this.pageSize, this.total);
  }

  context(record: LocalSearchRecord): SearchContextLink[] {
    const links: SearchContextLink[] = [];
    if (record.kind === 'home') {
      return links;
    }
    links.push({ label: 'Grade 3 curriculum', path: '/ruchika-grade3' });
    if (!record.moduleId || !record.moduleNumber) {
      return links;
    }
    if (record.kind === 'module-concepts' || record.kind === 'module-topics') {
      return links;
    }
    links.push({
      label: `Module ${record.moduleNumber}: ${record.moduleTitle ?? ''}`.replace(/:\s*$/, ''),
      path: `/ruchika-grade3/modules/${record.moduleId}`
    });
    if (record.kind === 'topic' || !record.topicId || !record.topicLabel || !record.topicTitle) {
      return links;
    }
    links.push({
      label: `${record.topicLabel}: ${record.topicTitle}`,
      path: `/ruchika-grade3/modules/${record.moduleId}`,
      anchor: record.topicId
    });
    if (record.kind === 'lesson' || !record.lessonNumber || !record.lessonId) {
      return links;
    }
    links.push({
      label: `Lesson ${record.lessonNumber}: ${record.lessonTitle ?? ''}`.replace(/:\s*$/, ''),
      path: `/ruchika-grade3/modules/${record.moduleId}/lessons/${record.lessonNumber}/concept`,
      anchor: `${record.lessonId}-concept`
    });
    return links;
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) {
      return;
    }
    void this.navigatePagination(page, this.pageSize);
  }

  setPageSize(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (this.pageSizeOptions.includes(value) && value !== this.pageSize) {
      void this.navigatePagination(1, value);
    }
  }

  private async runSearch(): Promise<void> {
    const sequence = ++this.searchSequence;
    this.results = [];
    this.total = 0;
    this.error = '';
    if (!this.query) {
      this.loading = false;
      return;
    }
    this.loading = true;
    try {
      const payload = await this.search.load();
      if (sequence !== this.searchSequence) {
        return;
      }
      const match = searchLocalRecords(payload.records, this.query);
      this.results = match.results;
      this.total = match.total;
      this.page = Math.min(this.page, this.totalPages);
    } catch {
      this.error = 'The local search index could not be loaded. Run the normal Grade 3 start command or build to refresh it.';
    } finally {
      this.loading = false;
      this.changeDetector.markForCheck();
    }
  }

  private navigatePagination(page: number, pageSize: number): Promise<boolean> {
    return this.router.navigate(['/ruchika-grade3', 'search'], {
      queryParams: {
        q: this.query,
        page: page > 1 ? page : null,
        pageSize: pageSize !== 10 ? pageSize : null
      }
    });
  }
}
