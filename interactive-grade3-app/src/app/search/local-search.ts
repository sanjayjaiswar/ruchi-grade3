export type LocalSearchKind =
  | 'home'
  | 'module-concepts'
  | 'module-topics'
  | 'topic'
  | 'lesson'
  | 'activity';

export type LocalSearchRecord = {
  kind: LocalSearchKind;
  title: string;
  url: string;
  text: string;
  moduleId?: string;
  moduleNumber?: number;
  moduleTitle?: string;
  topicId?: string;
  topicLabel?: string;
  topicTitle?: string;
  lessonId?: string;
  lessonNumber?: number;
  lessonTitle?: string;
  activityId?: string;
  problemNumber?: number;
  anchor: string;
};

export type LocalSearchPayload = {
  version: number;
  counts: {
    modules: number;
    topics: number;
    lessons: number;
    activities: number;
    records: number;
  };
  records: LocalSearchRecord[];
};

export type SearchSnippetPart = {
  text: string;
  matched: boolean;
};

export type LocalSearchResult = {
  record: LocalSearchRecord;
  score: number;
  snippet: string;
  snippetParts: SearchSnippetPart[];
  path: string;
};

const KIND_SCORE: Record<LocalSearchKind, number> = {
  home: 600,
  'module-concepts': 500,
  'module-topics': 450,
  topic: 400,
  lesson: 300,
  activity: 200
};
const GENERIC_SINGLE_WORD_QUERIES = new Set(['activity', 'lesson', 'module', 'problem', 'topic']);

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[×✕]/g, ' x ')
    .replace(/÷/g, ' / ')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function searchWords(query: string): string[] {
  return Array.from(new Set(normalizeSearchText(query).split(' ').filter(Boolean)));
}

function hasSearchWord(text: string, word: string): boolean {
  return ` ${text} `.includes(` ${word} `);
}

function wordPositions(text: string, words: string[]): number[] {
  const paddedText = ` ${text} `;
  return words
    .map((word) => paddedText.indexOf(` ${word} `))
    .filter((position) => position >= 0)
    .sort((left, right) => left - right);
}

function resultScore(record: LocalSearchRecord, normalizedQuery: string, words: string[]): number {
  const title = normalizeSearchText(record.title);
  const body = normalizeSearchText(record.text);
  const genericSingleWord = words.length === 1 && GENERIC_SINGLE_WORD_QUERIES.has(words[0]);
  let score = KIND_SCORE[record.kind];

  if (!genericSingleWord) {
    if (title === normalizedQuery) {
      score += 40_000;
    } else if (title.startsWith(normalizedQuery)) {
      score += 30_000;
    } else if (title.includes(normalizedQuery)) {
      score += 25_000;
    }

    const titleMatches = words.filter((word) => hasSearchWord(title, word)).length;
    score += titleMatches * 1_200;
    if (titleMatches === words.length) {
      score += 15_000;
    }
  }
  if (body.includes(normalizedQuery)) {
    score += 10_000;
  }

  const positions = wordPositions(body, words);
  if (positions.length > 1) {
    score += Math.max(0, 2_000 - (positions.at(-1)! - positions[0]));
  }
  return score;
}

function dynamicSnippet(text: string, words: string[], maxLength = 220): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) {
    return clean;
  }
  const normalized = normalizeSearchText(clean);
  const positions = wordPositions(normalized, words);
  const center = positions.length ? positions[0] : 0;
  const startTarget = Math.max(0, center - Math.floor(maxLength * 0.3));
  const startSpace = startTarget > 0 ? clean.lastIndexOf(' ', startTarget) : 0;
  const start = startSpace >= 0 ? startSpace + (startSpace > 0 ? 1 : 0) : startTarget;
  const endTarget = Math.min(clean.length, start + maxLength);
  const endSpace = endTarget < clean.length ? clean.lastIndexOf(' ', endTarget) : clean.length;
  const end = endSpace > start ? endSpace : endTarget;
  return `${start > 0 ? '…' : ''}${clean.slice(start, end).trim()}${end < clean.length ? '…' : ''}`;
}

function snippetParts(snippet: string, words: string[]): SearchSnippetPart[] {
  if (!words.length) {
    return [{ text: snippet, matched: false }];
  }
  const escaped = words
    .slice()
    .sort((left, right) => right.length - left.length)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const matcher = new RegExp(`(?<![\\p{L}\\p{N}])(${escaped.join('|')})(?![\\p{L}\\p{N}])`, 'giu');
  return snippet
    .split(matcher)
    .filter(Boolean)
    .map((text) => ({ text, matched: words.includes(normalizeSearchText(text)) }));
}

function recordOrder(left: LocalSearchRecord, right: LocalSearchRecord): number {
  return (
    (left.moduleId ?? '').localeCompare(right.moduleId ?? '', undefined, { numeric: true }) ||
    (left.lessonNumber ?? 0) - (right.lessonNumber ?? 0) ||
    (left.activityId ?? '').localeCompare(right.activityId ?? '', undefined, { numeric: true }) ||
    left.title.localeCompare(right.title, undefined, { numeric: true })
  );
}

export function searchLocalRecords(
  records: LocalSearchRecord[],
  query: string,
  limit = Number.POSITIVE_INFINITY
): { results: LocalSearchResult[]; total: number } {
  const words = searchWords(query);
  if (!words.length) {
    return { results: [], total: 0 };
  }
  const normalizedQuery = words.join(' ');
  const matches = records
    .filter((record) => {
      const searchable = normalizeSearchText(`${record.title} ${record.text}`);
      return words.every((word) => hasSearchWord(searchable, word));
    })
    .map((record) => {
      const snippet = dynamicSnippet(record.text, words);
      return {
        record,
        score: resultScore(record, normalizedQuery, words),
        snippet,
        snippetParts: snippetParts(snippet, words),
        path: record.url.split('#')[0]
      };
    })
    .sort((left, right) => right.score - left.score || recordOrder(left.record, right.record));
  return {
    results: Number.isFinite(limit) ? matches.slice(0, Math.max(0, limit)) : matches,
    total: matches.length
  };
}
