import type {
  ProblemVisualCardGridSection,
  ProblemVisualSection,
  ProblemVisualSpec
} from './lesson-runtime.types';

const BLANK_PATTERN = /_{2,}/g;
const LEADING_SUBPART_PATTERN = /^\s*[a-z]\s*[.)]\s*/i;
const MATH_TOKEN_PATTERN = /\d+\s+\d+\/\d+|\d+\/\d+|[<>]=?|=|\d+(?:\.\d+)?/g;

function blankCount(text?: string): number {
  return text?.match(BLANK_PATTERN)?.length ?? 0;
}

function escapePattern(text: string): string {
  return text
    .replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    .replace(/\s+/g, '\\s+');
}

function cleanAnswerText(text: string): string {
  return text
    .replace(LEADING_SUBPART_PATTERN, '')
    .replace(/^\s*(?:answer|fractions?|located fractions?|placed|place|circle|box)\s*:\s*/i, '')
    .replace(/[.;]\s*$/, '')
    .trim();
}

function templateAnswers(blankText: string, solvedText: string): string[] {
  const count = blankCount(blankText);
  if (!count) return [];

  const normalizedBlank = blankText.replace(LEADING_SUBPART_PATTERN, '');
  const normalizedSolved = solvedText.replace(LEADING_SUBPART_PATTERN, '');
  const chunks = normalizedBlank.split(BLANK_PATTERN);
  const pattern = new RegExp(
    `^\\s*${chunks.map(escapePattern).join('\\s*(.*?)\\s*')}\\s*$`,
    'i'
  );
  const match = normalizedSolved.match(pattern);
  if (!match) return [];
  return match.slice(1).map(cleanAnswerText);
}

function mathTokens(text: string): string[] {
  return text.match(MATH_TOKEN_PATTERN)?.map((token) => token.replace(/\s+/g, ' ').trim()) ?? [];
}

function removePrintedTokens(blankText: string, solvedTokens: string[]): string[] {
  const remaining = [...solvedTokens];
  for (const printed of mathTokens(blankText.replace(BLANK_PATTERN, ''))) {
    const index = remaining.indexOf(printed);
    if (index >= 0) remaining.splice(index, 1);
  }
  return remaining;
}

function unique(tokens: string[]): string[] {
  return tokens.filter((token, index) => tokens.indexOf(token) === index);
}

function tokenFallback(blankText: string, solvedText: string): string[] {
  const count = blankCount(blankText);
  if (!count) return [];

  if (count === 1 && /\bdecompose\b/i.test(blankText)) {
    return [cleanAnswerText(solvedText)];
  }

  const solvedTokens = mathTokens(solvedText);
  const remaining = removePrintedTokens(blankText, solvedTokens);
  if (count > 1) {
    if (remaining.length >= count) return remaining.slice(0, count);
    if (solvedTokens.length === count) return solvedTokens;
    return [];
  }

  const distinctRemaining = unique(remaining);
  if (distinctRemaining.length) {
    const needsCombinedAnswer = /\b(?:box|decompose|equal to|locate|place|through|above)\b/i.test(blankText)
      || distinctRemaining.length > 1 && /\b(?:blue|yellow|green|red)\b/i.test(blankText);
    if (needsCombinedAnswer) {
      return [distinctRemaining.join(' and ')];
    }
    return [distinctRemaining[distinctRemaining.length - 1]];
  }

  const cleaned = cleanAnswerText(solvedText);
  if (!cleaned || /answers? will vary/i.test(cleaned)) return [];
  return [cleaned];
}

export function answersFromSolvedTemplate(blankText: string, solvedText?: string): string[] {
  if (!solvedText || !blankCount(blankText)) return [];
  const exact = templateAnswers(blankText, solvedText);
  return exact.length === blankCount(blankText)
    ? exact
    : tokenFallback(blankText, solvedText);
}

function resolvedAnswers(blankText: string | undefined, solvedText: string | undefined): string[] | undefined {
  if (!blankText || !blankCount(blankText)) return undefined;
  const answers = answersFromSolvedTemplate(blankText, solvedText);
  return answers.length === blankCount(blankText) && answers.every(Boolean) ? answers : undefined;
}

function pairCardSections(
  blank: ProblemVisualCardGridSection,
  solved: ProblemVisualSection | undefined
): void {
  const solvedCards = solved?.kind === 'card-grid' ? solved.cards : [];
  blank.cards.forEach((card, cardIndex) => {
    const solvedCard = solvedCards[cardIndex];
    card.labelAnswers ??= resolvedAnswers(card.label, solvedCard?.label);
    card.sections.forEach((section, sectionIndex) => {
      pairSection(section, solvedCard?.sections[sectionIndex]);
    });
  });
}

function pairSection(blank: ProblemVisualSection, solved: ProblemVisualSection | undefined): void {
  if (blank.kind === 'card-grid') {
    pairCardSections(blank, solved);
    return;
  }

  if (blank.kind === 'source-response-workspace' || blank.kind === 'unit-form-workspace') {
    const solvedParts = solved?.kind === blank.kind ? solved.parts : [];
    blank.parts.forEach((part, partIndex) => {
      part.lineAnswers ??= part.lines.map((line, lineIndex) =>
        resolvedAnswers(line, solvedParts[partIndex]?.lines[lineIndex]) ?? []
      );
    });
    return;
  }

  if (blank.kind === 'array') {
    const solvedArray = solved?.kind === 'array' ? solved : undefined;
    blank.labelAnswers ??= resolvedAnswers(blank.label, solvedArray?.label);
    blank.captionAnswers ??= resolvedAnswers(blank.caption, solvedArray?.caption);
    return;
  }

  if (blank.kind === 'equations') {
    const solvedLines = solved?.kind === 'equations' ? solved.lines : [];
    blank.lineAnswers ??= blank.lines.map((line, lineIndex) =>
      resolvedAnswers(line, solvedLines[lineIndex]) ?? []
    );
    return;
  }

  if (blank.kind === 'tape') {
    const solvedTape = solved?.kind === 'tape' ? solved : undefined;
    blank.partAnswers ??= blank.parts.map((part, partIndex) =>
      resolvedAnswers(part.label, solvedTape?.parts[partIndex]?.label) ?? []
    );
    blank.braceAnswers ??= blank.braces?.map((brace, braceIndex) =>
      resolvedAnswers(
        brace.boxLabel || brace.label,
        solvedTape?.braces?.[braceIndex]?.boxLabel || solvedTape?.braces?.[braceIndex]?.label
      ) ?? []
    );
    blank.equationAnswers ??= blank.equations?.map((line, lineIndex) =>
      resolvedAnswers(line, solvedTape?.equations?.[lineIndex]) ?? []
    );
    blank.captionAnswers ??= resolvedAnswers(blank.caption, solvedTape?.caption);
    return;
  }

  if (blank.kind === 'number-bond') {
    const solvedBond = solved?.kind === 'number-bond' ? solved : undefined;
    blank.partAnswers ??= blank.parts.map((part, partIndex) =>
      resolvedAnswers(part.label, solvedBond?.parts[partIndex]?.label) ?? []
    );
    blank.equationAnswers ??= blank.equations?.map((line, lineIndex) =>
      resolvedAnswers(line, solvedBond?.equations?.[lineIndex]) ?? []
    );
    return;
  }

  if (blank.kind === 'data-table') {
    const solvedTable = solved?.kind === 'data-table' ? solved : undefined;
    blank.cellAnswers ??= blank.rows.map((row, rowIndex) =>
      row.map((cell, cellIndex) =>
        resolvedAnswers(cell, solvedTable?.rows[rowIndex]?.[cellIndex]) ?? []
      )
    );
    return;
  }

  if (blank.kind === 'note') {
    if (blankCount(blank.text)) {
      blank.textAnswers = undefined;
      blank.text = blank.text.replace(BLANK_PATTERN, '[student response]');
    }
    return;
  }

  if (blank.kind === 'geometry-diagram') {
    const solvedDiagram = solved?.kind === 'geometry-diagram' ? solved : undefined;
    blank.shapeAnswers ??= blank.shapes.map((shape, shapeIndex) =>
      resolvedAnswers(shape.label, solvedDiagram?.shapes[shapeIndex]?.label) ?? []
    );
    blank.captionAnswers ??= resolvedAnswers(blank.caption, solvedDiagram?.caption);
    return;
  }

  if (blank.kind === 'expression-match') {
    const solvedMatch = solved?.kind === 'expression-match' ? solved : undefined;
    blank.topItemAnswers ??= blank.topItems.map((item, itemIndex) =>
      resolvedAnswers(item, solvedMatch?.topItems[itemIndex]) ?? []
    );
    blank.bottomItemAnswers ??= blank.bottomItems.map((item, itemIndex) =>
      resolvedAnswers(item, solvedMatch?.bottomItems[itemIndex]) ?? []
    );
    return;
  }

  if (blank.kind === 'solution-parts') {
    const solvedParts = solved?.kind === 'solution-parts' ? solved.parts : [];
    blank.parts.forEach((part, partIndex) => {
      part.promptAnswers ??= resolvedAnswers(part.prompt, solvedParts[partIndex]?.prompt);
      part.equationAnswers ??= resolvedAnswers(part.equation, solvedParts[partIndex]?.equation);
    });
  }
}

export function hydrateVisualAnswerMetadata(
  blankSpec: ProblemVisualSpec,
  solvedSpec: ProblemVisualSpec
): ProblemVisualSpec {
  blankSpec.sections.forEach((section, sectionIndex) => {
    pairSection(section, solvedSpec.sections[sectionIndex]);
  });
  return blankSpec;
}
