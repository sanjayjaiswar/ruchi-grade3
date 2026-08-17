import { ReadingStrategy } from './reading-evidence-questions.data';

export type ReadingStrategyExample = {
  title: string;
  sourceText: string;
  question: string;
  visualLabels: [string, string, string];
  modelThinking: [string, string, string];
  modelResponse: string;
  visualKind?: 'map' | 'timeline' | 'photograph';
  visualCaption?: string;
};

// These short examples are original portal teaching material. They demonstrate a
// reading move without supplying or pretending to reproduce a Benchmark passage,
// answer key, learner result, or district lesson.
export const READING_STRATEGY_EXAMPLES: Record<ReadingStrategy, ReadingStrategyExample> = {
  inference: {
    title: 'Clues plus what you know',
    sourceText: 'Nia zipped her coat to her chin. She could see her breath, and frost covered the grass.',
    question: 'What can you infer about the weather?',
    visualLabels: ['Clue from the words', 'What a reader knows', 'Inference'],
    modelThinking: ['Nia zips her coat; breath and frost are visible.', 'Breath and frost appear when the air is very cold.', 'The weather is freezing cold.'],
    modelResponse: 'The weather is freezing cold because Nia bundles up and frost covers the grass.'
  },
  'main-idea': {
    title: 'One idea holds the details together',
    sourceText: 'Bees carry pollen between flowers. Butterflies do this too. Even some bats move pollen as they feed.',
    question: 'What is the main idea?',
    visualLabels: ['Topic', 'Important idea', 'Supporting details'],
    modelThinking: ['Animals and pollen', 'Several animals help move pollen between flowers.', 'Bees, butterflies, and bats all move pollen.'],
    modelResponse: 'Several kinds of animals help flowers by moving pollen from one flower to another.'
  },
  'text-evidence': {
    title: 'Build a bridge from claim to proof',
    sourceText: 'Omar returned the lost wallet without opening it. He waited until its owner came back.',
    question: 'What does Omar’s behavior show?',
    visualLabels: ['Answer the question', 'Point to exact evidence', 'Explain why it proves the answer'],
    modelThinking: ['Omar is honest.', 'He returned the closed wallet and waited for its owner.', 'An honest person protects something that belongs to someone else.'],
    modelResponse: 'Omar is honest because he returned the unopened wallet and waited for its owner.'
  },
  'cause-effect': {
    title: 'Show what made something happen',
    sourceText: 'Rain fell all night. By morning, the field was muddy, so soccer practice moved indoors.',
    question: 'Why did practice move indoors?',
    visualLabels: ['Cause', 'Change caused by it', 'Effect'],
    modelThinking: ['Rain fell all night.', 'The rain made the field muddy.', 'Soccer practice moved indoors.'],
    modelResponse: 'Practice moved indoors because overnight rain made the field muddy.'
  },
  sequence: {
    title: 'Follow the important steps',
    sourceText: 'First, Luis planted a seed. Next, he watered it each day. Soon, a green shoot appeared.',
    question: 'How did the plant begin to grow?',
    visualLabels: ['First', 'Next', 'Result'],
    modelThinking: ['Luis planted a seed.', 'He watered it each day.', 'A green shoot appeared.'],
    modelResponse: 'Luis planted the seed and watered it each day; then a green shoot appeared.'
  },
  compare: {
    title: 'Use the same lens for both',
    sourceText: 'A bicycle and a scooter both have wheels. A bicycle uses pedals, while a scooter is pushed by one foot.',
    question: 'How are a bicycle and scooter alike and different?',
    visualLabels: ['Only the bicycle', 'Both', 'Only the scooter'],
    modelThinking: ['It has pedals.', 'Both have wheels and carry a rider.', 'It is pushed by one foot.'],
    modelResponse: 'Both carry a rider on wheels, but a bicycle uses pedals and a scooter is pushed by one foot.'
  },
  character: {
    title: 'Actions reveal character',
    sourceText: 'The trail was steep, but Ana carried her younger brother’s pack and kept encouraging him.',
    question: 'What character trait does Ana show?',
    visualLabels: ['What Ana does', 'Trait it reveals', 'Why the action matters'],
    modelThinking: ['She carries the pack and encourages her brother.', 'Ana is caring and determined.', 'She helps someone else even when the climb is hard.'],
    modelResponse: 'Ana is caring and determined because she supports her brother during a difficult climb.'
  },
  'point-of-view': {
    title: 'Two people can see one event differently',
    sourceText: 'Jules cheered when snow closed school. His mother worried because the roads were icy.',
    question: 'How do their points of view differ?',
    visualLabels: ['Jules sees…', 'The same event', 'His mother sees…'],
    modelThinking: ['A fun day away from school', 'Snow closes school and covers the roads.', 'Dangerous travel on icy roads'],
    modelResponse: 'Jules is excited by the day off, while his mother is concerned about unsafe roads.'
  },
  vocabulary: {
    title: 'Use nearby clues to unlock a word',
    sourceText: 'The pond was tranquil. Its smooth water barely moved, and no sounds disturbed the quiet.',
    question: 'What does tranquil mean?',
    visualLabels: ['Nearby clues', 'Possible meaning', 'Reread and test'],
    modelThinking: ['Smooth water; no sounds; quiet', 'Calm and peaceful', '“The pond was calm and peaceful” makes sense.'],
    modelResponse: 'Tranquil means calm and peaceful; the smooth water and quiet are context clues.'
  },
  'text-feature': {
    title: 'Read words and features together',
    sourceText: 'A short paragraph says the river rises in spring. A nearby chart shows March: 3 ft, April: 5 ft, May: 7 ft.',
    question: 'What does the chart add?',
    visualLabels: ['Paragraph says', 'Feature shows', 'Together we understand'],
    modelThinking: ['The river rises in spring.', 'The water increases from 3 to 7 feet.', 'The chart shows exactly how much the river rises.'],
    modelResponse: 'The chart adds measurements that show the river rising from three to seven feet.'
  },
  theme: {
    title: 'Turn events into a message about life',
    sourceText: 'Milo rushed and his tower fell. He rebuilt slowly, checked every block, and finished a stronger tower.',
    question: 'What lesson does the story show?',
    visualLabels: ['Problem', 'Response and result', 'Life lesson'],
    modelThinking: ['Rushing makes Milo’s tower fall.', 'He slows down and rebuilds successfully.', 'Careful work can lead to better results.'],
    modelResponse: 'The story shows that taking time and working carefully can produce a better result.'
  },
  poetry: {
    title: 'See the picture made by poetic words',
    sourceText: '“The moon stitched silver / across the sleeping lake.”',
    question: 'What picture do these lines create?',
    visualLabels: ['Words to notice', 'Picture in the mind', 'Effect on the reader'],
    modelThinking: ['“stitched silver” and “sleeping lake”', 'Moonlight forms a bright line on still water.', 'The lake feels quiet and peaceful.'],
    modelResponse: 'The words create a peaceful image of silver moonlight stretching across a still lake.'
  }
};

// A broad strategy is not always a sufficiently close teaching model. These
// question-specific examples remain original supplemental material, but match
// the kind of visual reasoning explicitly named by the admitted Benchmark
// question. They do not reproduce the school text, image, map, or answer.
export const READING_QUESTION_EXAMPLES: Record<string, ReadingStrategyExample> = {
  'u1-q2': {
    title: 'Read location and direction on a map',
    sourceText: 'A paragraph says Milltown sometimes floods after heavy rain. A simple map places Milltown beside Pine River, just below the point where North Creek joins it.',
    question: 'What does the map add to the paragraph?',
    visualLabels: ['Locate the town and water', 'Read how the places connect', 'Explain the added risk'],
    modelThinking: ['Milltown is beside Pine River and downstream from North Creek.', 'Water from the creek joins the river before the river reaches the town.', 'The map shows why extra water could reach Milltown after heavy rain.'],
    modelResponse: 'The map adds that Milltown is beside the river and downstream from a creek, so water from both places can move toward the town.',
    visualKind: 'map',
    visualCaption: 'Original schematic: North Creek joins Pine River before the river reaches Milltown.'
  },
  'u1-q3': {
    title: 'Combine words with a timeline',
    sourceText: 'A paragraph says neighbors kept working until their street became safer. A timeline shows: March—families request a crosswalk; April—the council approves it; May—the crosswalk is painted.',
    question: 'What message do the paragraph and timeline create together?',
    visualLabels: ['Read the words', 'Trace change across time', 'State the shared message'],
    modelThinking: ['The neighbors continue working toward a safer street.', 'The timeline shows their request moving from an idea to approval and action.', 'Working together and staying involved can improve a community.'],
    modelResponse: 'Together, the paragraph and timeline show that people can improve their community by working together and continuing to act.',
    visualKind: 'timeline',
    visualCaption: 'Original timeline: request → approval → completed crosswalk.'
  },
  'u1-q4': {
    title: 'Use a photograph to add visible evidence',
    sourceText: 'A paragraph says volunteers made the library entrance easier to use. A photograph shows a new ramp beside the front steps and a wide handrail leading to the door.',
    question: 'How does the photograph deepen the information?',
    visualLabels: ['Read the paragraph', 'Study visible details', 'Explain what the image adds'],
    modelThinking: ['The paragraph says the entrance became easier to use.', 'The photograph shows the ramp, its location, and the handrail.', 'The image makes the improvement concrete by showing exactly what changed.'],
    modelResponse: 'The photograph adds visible details of the new ramp and handrail, showing exactly how the entrance became easier to use.',
    visualKind: 'photograph',
    visualCaption: 'Original photo description: front steps beside a ramp and handrail.'
  }
};

export const readingStrategyExampleFor = (
  questionId: string,
  strategy: ReadingStrategy
): ReadingStrategyExample => READING_QUESTION_EXAMPLES[questionId] ?? READING_STRATEGY_EXAMPLES[strategy];
