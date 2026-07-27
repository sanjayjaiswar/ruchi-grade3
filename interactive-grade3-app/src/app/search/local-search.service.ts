import { Injectable } from '@angular/core';
import { LocalSearchPayload } from './local-search';

@Injectable({ providedIn: 'root' })
export class LocalSearchService {
  private indexRequest?: Promise<LocalSearchPayload>;

  load(): Promise<LocalSearchPayload> {
    this.indexRequest ??= fetch('/tmp/local-search-index.json', {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' }
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Search index request failed with status ${response.status}.`);
      }
      const payload = (await response.json()) as LocalSearchPayload;
      if (payload.version !== 1 || !Array.isArray(payload.records)) {
        throw new Error('Search index format is not supported.');
      }
      return payload;
    });
    return this.indexRequest;
  }
}
