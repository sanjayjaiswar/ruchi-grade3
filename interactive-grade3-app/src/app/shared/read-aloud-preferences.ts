export const READ_ALOUD_VOICE_STORAGE_KEY = 'grade3.readAloudVoiceName';

export const READ_ALOUD_TEST_TEXT =
  'Equal groups have the same number in each group. The group size is how many are in each group.';

export const READ_ALOUD_VOICE_PREFERENCES = [
  'Samantha',
  'Victoria',
  'Allison',
  'Ava',
  'Susan',
  'Karen',
  'Moira',
  'Daniel'
];

export function preferredReadAloudVoice(
  voices: SpeechSynthesisVoice[],
  selectedVoiceName = ''
): SpeechSynthesisVoice | undefined {
  const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
  if (selectedVoice) {
    return selectedVoice;
  }

  return (
    READ_ALOUD_VOICE_PREFERENCES
      .map((preferredName) => voices.find((voice) => voice.name.toLowerCase().includes(preferredName.toLowerCase())))
      .find((voice): voice is SpeechSynthesisVoice => Boolean(voice)) ??
    voices.find((voice) => voice.lang === 'en-US' && voice.localService) ??
    voices.find((voice) => voice.lang.startsWith('en'))
  );
}

export function sortedReadAloudVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return voices
    .filter((voice) => voice.lang.startsWith('en'))
    .sort((a, b) => voiceSortScore(a) - voiceSortScore(b) || a.name.localeCompare(b.name));
}

function voiceSortScore(voice: SpeechSynthesisVoice): number {
  const preferenceIndex = READ_ALOUD_VOICE_PREFERENCES.findIndex((preferredName) =>
    voice.name.toLowerCase().includes(preferredName.toLowerCase())
  );
  if (preferenceIndex >= 0) {
    return preferenceIndex;
  }
  if (voice.lang === 'en-US' && voice.localService) {
    return 100;
  }
  if (voice.lang === 'en-US') {
    return 110;
  }
  return 200;
}
