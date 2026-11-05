// Original supplemental teaching notes based on the spelling focus on each lesson's opening page.
// These are not a separate publisher Teacher Edition or a transcription of workbook exercises.
export const TEACHING_NOTES = [
  'Say the word slowly. Notice where a or o appears, then remember the letters around it.',
  'Look closely at e, ea, i, and u. Say the whole word before you cover it.',
  'Notice ai, ay, oa, and words ending in e. Keep every letter in order, including a final e.',
  'Look for the vowel letters in each word. Notice pairs such as ee and the three-letter group igh.',
  'These words share the /ü/ sound, but use different spellings. Look closely at oo, ew, ue, and words ending in e.',
  'Find the two matching consonants at the end. Remember to include both letters.',
  'Notice le at the end of each word. Keep those two letters together as you practice.',
  'Find the matching consonants inside each word. Two matching letters still need two places in your spelling.',
  'Notice the ending ed or ing. These words come from verbs ending in e, with that e removed before the ending.',
  'Find oi or oy in the word. Remember which pair belongs in this spelling.',
  'Find ou or ow. Say the word and remember which pair it uses.',
  'Notice the vowel spelling in each word. Words in this list do not all spell their vowel sound the same way.',
  'Compare each neighboring pair. These words sound alike but have different spellings and meanings. Study the exact word shown.',
  'Find the apostrophe. It marks omitted letters. Remember its place, and keep the capital I in contractions beginning with I.',
  'Study the whole word. Look for any letter you might forget, then cover the word and try it from memory.',
  'Look at the first three letters: spl, spr, or str. Keep their order when you build the word.',
  'Look for s and c. The /s/ sound can have different spellings, so study the letters in this word.',
  'Look at j, g, or ge. Remember which spelling this word uses for the /j/ sound.',
  'Compare each singular word with its plural. In these pairs, y changes to ies.',
  'Days of the week start with capital letters. The time words in this list start with lowercase letters.',
  'Begin each month with a capital letter. Check the rest of the word carefully too.',
  'Keep the capitals, spaces, and any apostrophe in each holiday name, exactly as shown in this workbook list.',
  'Find ld or ft. Keep the two consonants in order.',
  'Find qu or squ. Notice that quiet and quite contain the same letters in a different order.',
  'Notice kn or wr at the beginning. The first letter is silent, but it still belongs in the spelling.',
  'Look for lf, mb, or tch. Some letters may be quiet when you speak, but still need a place in the word.',
  'Find are, ear, or air. Notice which group belongs in each word.',
  'Look closely at the letters around r. Remember the spelling of each word instead of guessing from its sound.',
  'Read the two smaller words, then join them with no space to make the compound word.',
  'Read the two smaller words, then join them with no space to make the compound word.'
] as const;

const PATTERNS = [
  /a|o/g, /ea|e|i|u/g, /ai|ay|oa|a|o|e$/g, /igh|ee|ea|e|i|y/g,
  /oo|ew|ue|[ou]|e$/g, /ll$|ss$|ff$/g, /le$/g, /([a-z])\1/g,
  /ing$|ed$/g, /oi|oy/g, /ou|ow/g, /au|aw|a|o/g,
  /./g, /’/g, /./g, /^spl|^spr|^str/g, /s|c/g, /ge|j|g/g,
  /ies$|y$/g, /^[A-Z]/g, /^[A-Z]/g, /[A-Z]|’/g, /ld|ft/g,
  /^squ|^qu/g, /^kn|^wr/g, /lf|mb|tch/g, /air|are|ear/g,
  /oor|ore|or|ir|ur/g
];
const COMPOUNDS: Record<string, readonly [string, string]> = {
  popcorn: ['pop', 'corn'], cookout: ['cook', 'out'], sailboat: ['sail', 'boat'],
  seashell: ['sea', 'shell'], barefoot: ['bare', 'foot'], birthday: ['birth', 'day'],
  moonlight: ['moon', 'light'], airplane: ['air', 'plane'], sandcastle: ['sand', 'castle'],
  everything: ['every', 'thing'], hallway: ['hall', 'way'], sidewalk: ['side', 'walk'],
  farmhouse: ['farm', 'house'], hillside: ['hill', 'side'], inside: ['in', 'side'],
  springtime: ['spring', 'time'], driveway: ['drive', 'way'], cornfield: ['corn', 'field'],
  downstairs: ['down', 'stairs'], horseback: ['horse', 'back']
};
export function wordParts(word: string, lesson: number): { text: string; highlight: boolean }[] {
  if (COMPOUNDS[word] && lesson >= 29) {
    return COMPOUNDS[word].map((text, index) => ({ text, highlight: index === 0 }));
  }
  const pattern = PATTERNS[lesson - 1];
  const positions = new Set<number>();
  for (const match of word.matchAll(new RegExp(pattern))) {
    for (let i = match.index!; i < match.index! + match[0].length; i++) positions.add(i);
  }
  return [...word].map((text, index) => ({ text, highlight: positions.has(index) }));
}
