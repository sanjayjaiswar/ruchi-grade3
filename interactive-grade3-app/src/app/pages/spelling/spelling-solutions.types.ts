export interface SolutionItem { prompt: string; answer: string; explanation?: string; }
export interface SolutionSection {
  title: string;
  instruction: string;
  items: SolutionItem[];
  explanation?: string;
  sample?: boolean;
}
export type LessonSolutions = readonly [SolutionSection[], SolutionSection[], SolutionSection[]];

export function section(title: string, instruction: string, rows: string[], explanation?: string): SolutionSection {
  return { title, instruction, explanation, items: rows.map(row => {
    const [prompt, answer, reason] = row.split(' | ');
    return { prompt, answer, explanation: reason };
  }) };
}
export function ordered(title: string, instruction: string, answers: string, explanation?: string): SolutionSection {
  return section(title, instruction, answers.split(' / ').map((answer, i) => `${i + 1} | ${answer}`), explanation);
}
export function context(title: string, answers: string): SolutionSection {
  return ordered('Words in Context', `${title} — fill the blanks in reading order.`, answers,
    'Read the whole sentence with each answer in place. Check that the word makes sense and matches the spelling list.');
}
export function challenge(words: string): SolutionSection {
  return section('Challenge', 'Circle the additional words marked in the supplied answer key (including repeated occurrences).',
    ['Words to circle | ' + words], 'These are the publisher’s marked words. Read each one aloud and compare it with this lesson’s sound or spelling pattern.');
}
export function copyWords(words: string): SolutionSection {
  return ordered('Words Across the Curriculum — write the words', 'Say each word, then copy it on the matching line.', words,
    'Check each letter against the model before moving to the next word.');
}
export function writing(prompt: string, answer: string, explanation: string): SolutionSection {
  return { title: 'Words in Writing', instruction: prompt, sample: true,
    items: [{ prompt: 'One possible response', answer, explanation }],
    explanation: 'Original supplemental sample, not a publisher answer. Other responses can be correct when they meet the workbook’s directions.' };
}
export function corrections(rows: string[]): SolutionSection {
  return section('Misspelled Words', 'Circle each misspelling and write its correction.', rows,
    'Replace the misspelled word, then reread the sentence. Keep the meaning of the sentence the same.');
}
