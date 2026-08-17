export type WordStudyGroup = {
  label: string;
  words: string[];
};

export type ReadingStudioWeek = {
  wordStudy: {
    explanation: string;
    groups: WordStudyGroup[];
    checks: [string, string, string];
  };
  writing: {
    title: string;
    steps: [string, string, string, string];
    checks: [string, string, string];
  };
};

// Original supplemental studios for the Unit 1 pilot. The official coordinate
// is the publisher-listed weekly focus rendered beside each studio. The words,
// explanations, and learner moves below are portal-authored examples grounded
// in California's Grades 2–3 literacy guidance and Grade 3 standards.
export const UNIT1_READING_STUDIOS: Record<number, ReadingStudioWeek> = {
  1: {
    wordStudy: {
      explanation: 'Listen for the vowel sound in the middle of each one-syllable word, then connect the sound to its spelling.',
      groups: [
        { label: 'short a', words: ['map', 'plan'] },
        { label: 'short e', words: ['step', 'help'] },
        { label: 'short i', words: ['sit', 'list'] },
        { label: 'short o', words: ['stop', 'block'] },
        { label: 'short u', words: ['club', 'trust'] }
      ],
      checks: ['I read every word aloud.', 'I named the middle vowel sound.', 'I used one word in a complete sentence.']
    },
    writing: {
      title: 'Plan a personal letter that recounts an event',
      steps: [
        'Name the reader and the event you will recount.',
        'Choose two or three important moments in order.',
        'Draft an opening, the ordered events, and a closing.',
        'Revise by adding precise actions, feelings, and time words.'
      ],
      checks: ['My letter has a clear audience.', 'The events are in an order a reader can follow.', 'I revised at least one detail for clarity.']
    }
  },
  2: {
    wordStudy: {
      explanation: 'Compare the spellings that can represent long a. Read each word, notice the pattern, and sort it by spelling.',
      groups: [
        { label: 'a–e', words: ['made', 'safe'] },
        { label: 'ai', words: ['rain', 'trail'] },
        { label: 'ay', words: ['day', 'play'] },
        { label: 'a', words: ['apron', 'table'] }
      ],
      checks: ['I read every word aloud.', 'I explained which letters spell long a.', 'I added another word to one group.']
    },
    writing: {
      title: 'Build an informative explanation from evidence',
      steps: [
        'State the topic and what the reader should understand.',
        'Collect facts or details from the school text or prompt.',
        'Group related information and add linking words.',
        'Revise the explanation for accuracy, order, and a clear ending.'
      ],
      checks: ['My topic is clear.', 'Every detail belongs with the topic.', 'I explained how the evidence supports the information.']
    }
  },
  3: {
    wordStudy: {
      explanation: 'Compare long o and long u words. Read the whole word, locate the spelling pattern, and check the sound in context.',
      groups: [
        { label: 'long o', words: ['home', 'vote', 'road', 'show'] },
        { label: 'long u', words: ['use', 'cube', 'music', 'student'] }
      ],
      checks: ['I read every word aloud.', 'I identified the long vowel sound.', 'I used one long o and one long u word in context.']
    },
    writing: {
      title: 'Organize an opinion with reasons and evidence',
      steps: [
        'State a clear opinion for the school prompt.',
        'Choose reasons that directly support the opinion.',
        'Add evidence or examples and connect ideas with linking words.',
        'Revise the order of reasons and write a concluding statement.'
      ],
      checks: ['My opinion is unmistakable.', 'My reasons support the same opinion.', 'My ending restates the idea without merely copying it.']
    }
  }
};
