import { ReadingSelection, ReadingUnit, readingUnitById } from './reading-curriculum.data';

export const READING_TEXT_EVIDENCE_SOURCE =
  'https://ruskin.berryessa.k12.ca.us/subsites/Lan-Pham/documents/3rd%20reading%20closely.pdf';

export type ReadingStrategy =
  | 'main-idea'
  | 'text-evidence'
  | 'inference'
  | 'cause-effect'
  | 'sequence'
  | 'compare'
  | 'character'
  | 'point-of-view'
  | 'vocabulary'
  | 'text-feature'
  | 'theme'
  | 'poetry';

export type ReadingEvidenceQuestion = {
  id: string;
  unitId: string;
  unitNumber: number;
  weekNumber: number;
  questionNumber: number;
  selectionRole: ReadingSelection['role'];
  selectionTitle: string;
  strategy: ReadingStrategy;
  learningGoal: string;
  prompt: string;
};

export type ReadingStrategyGuide = {
  title: string;
  learnerMove: string;
  steps: [string, string, string];
  tapLabels: [string, string, string];
  responseFrame: string;
  evidenceLabels: [string, string, string];
  checkLabels: [string, string, string];
};

const STRATEGY_GUIDES: Record<ReadingStrategy, ReadingStrategyGuide> = {
  'main-idea': {
    title: 'Find the main idea',
    learnerMove: 'Decide what the section is mostly teaching, then choose details that directly support that idea.',
    steps: ['Name the topic', 'State the most important idea', 'Prove it with two details'],
    tapLabels: ['I found the topic', 'I found the big idea', 'I found supporting details'],
    responseFrame: 'The section is mostly about ___ . One detail that supports this is ___ .',
    evidenceLabels: ['The section is mostly about…', 'One supporting detail…', 'Another supporting detail…'],
    checkLabels: ['My answer covers the whole section.', 'My details come from the named text.', 'My details directly support my main idea.']
  },
  'text-evidence': {
    title: 'Answer with text evidence',
    learnerMove: 'Answer the question first, locate the strongest detail, and explain how that detail proves your answer.',
    steps: ['Answer', 'Point to evidence', 'Explain the connection'],
    tapLabels: ['I answered the question', 'I found exact evidence', 'I can explain the connection'],
    responseFrame: 'My answer is ___ . The text shows ___, which proves ___ .',
    evidenceLabels: ['My answer…', 'The text or picture shows…', 'This proves my answer because…'],
    checkLabels: ['I answered every part.', 'I named a page, paragraph, line, or feature.', 'I explained the evidence instead of only copying it.']
  },
  inference: {
    title: 'Make an inference',
    learnerMove: 'Combine what the text shows with what you already know. The inference must fit every important clue.',
    steps: ['Collect clues', 'Add what you know', 'State what the clues suggest'],
    tapLabels: ['I found a clue', 'I connected what I know', 'My inference fits both'],
    responseFrame: 'I infer ___ because the text shows ___ and I know ___ .',
    evidenceLabels: ['A clue from the text…', 'What I know about this clue…', 'My inference…'],
    checkLabels: ['My inference is not copied word-for-word.', 'I used a specific clue.', 'My explanation connects the clue to the inference.']
  },
  'cause-effect': {
    title: 'Trace cause and effect',
    learnerMove: 'Identify what happened, what made it happen, and the evidence connecting the two events.',
    steps: ['Name the cause', 'Name the effect', 'Explain the connection'],
    tapLabels: ['I found what happened first', 'I found what happened next', 'I can explain why'],
    responseFrame: 'Because ___ happened, ___ happened next.',
    evidenceLabels: ['Because…', 'This caused…', 'The text connects them by showing…'],
    checkLabels: ['The cause happens before the effect.', 'Both events come from the text.', 'I explained why one event led to the other.']
  },
  sequence: {
    title: 'Follow the sequence',
    learnerMove: 'Put the important events or steps in order and explain how an earlier event leads to a later one.',
    steps: ['Find the starting event', 'Order the next events', 'Explain the result'],
    tapLabels: ['I found the first event', 'I ordered what came next', 'I found the result'],
    responseFrame: 'First, ___ . Next, ___ . As a result, ___ .',
    evidenceLabels: ['First…', 'Next…', 'As a result…'],
    checkLabels: ['My events are in text order.', 'I included only important events.', 'My final event answers the question.']
  },
  compare: {
    title: 'Compare and contrast',
    learnerMove: 'Use the same category for both subjects. State one meaningful similarity and one meaningful difference.',
    steps: ['Choose one category', 'Compare a similarity', 'Contrast a difference'],
    tapLabels: ['I used the same category', 'I found what is alike', 'I found what is different'],
    responseFrame: 'Both ___ . However, the first ___ while the second ___ .',
    evidenceLabels: ['Both…', 'Only the first text…', 'Only the second text…'],
    checkLabels: ['I compared the same feature in both texts.', 'I included a similarity when requested.', 'I included a difference when requested.']
  },
  character: {
    title: 'Understand a character',
    learnerMove: 'Use what the character says, thinks, feels, and does to explain a trait, motivation, or change.',
    steps: ['Notice the action or words', 'Name the trait or feeling', 'Explain the effect on events'],
    tapLabels: ['I found words or actions', 'I named a trait or feeling', 'I explained why it matters'],
    responseFrame: 'The character is ___ because the text shows ___ .',
    evidenceLabels: ['The character says or does…', 'This reveals…', 'That matters because…'],
    checkLabels: ['I named a precise character trait or feeling.', 'I used an action or quotation as evidence.', 'I explained how the evidence reveals the trait.']
  },
  'point-of-view': {
    title: 'Compare points of view',
    learnerMove: 'Identify what each person thinks and the experience or evidence that explains why the views differ.',
    steps: ['State the first view', 'State the second view', 'Explain why they differ'],
    tapLabels: ['I found the first view', 'I found the second view', 'I know why they differ'],
    responseFrame: 'The first person thinks ___, but the second thinks ___ because ___ .',
    evidenceLabels: ['The first person thinks…', 'The second person thinks…', 'Their views differ because…'],
    checkLabels: ['I kept each person’s view separate.', 'I used evidence for both views.', 'I explained the reason for the difference.']
  },
  vocabulary: {
    title: 'Determine a word’s meaning',
    learnerMove: 'Reread around the word, collect context clues, test a meaning, and check that it makes sense in the sentence.',
    steps: ['Find nearby clues', 'Test a possible meaning', 'Replace and reread'],
    tapLabels: ['I found a nearby clue', 'I tried a meaning', 'The meaning fits the sentence'],
    responseFrame: '___ probably means ___ because the nearby words say ___ .',
    evidenceLabels: ['The nearby clue…', 'The word probably means…', 'That meaning fits because…'],
    checkLabels: ['I used clues from the same section.', 'My meaning fits the exact sentence.', 'I explained which clue helped most.']
  },
  'text-feature': {
    title: 'Use a text or graphic feature',
    learnerMove: 'Study the feature and the nearby words together. Explain what the feature adds that the paragraph alone does not show.',
    steps: ['Read the feature', 'Connect it to nearby text', 'Explain what it adds'],
    tapLabels: ['I studied the feature', 'I reread nearby words', 'I connected both'],
    responseFrame: 'The ___ shows ___ . This adds to the text by ___ .',
    evidenceLabels: ['The feature shows…', 'The nearby text says…', 'Together they help me understand…'],
    checkLabels: ['I named the exact feature.', 'I used information visible in the feature.', 'I explained how it changes or deepens understanding.']
  },
  theme: {
    title: 'Determine a lesson or message',
    learnerMove: 'Study the problem, the character’s response, and the ending. Express the message as a complete idea about life.',
    steps: ['Name the central problem', 'Notice the response and result', 'State the message'],
    tapLabels: ['I found the problem', 'I noticed the choice and result', 'I found a life lesson'],
    responseFrame: 'The story shows that ___ because the character ___ .',
    evidenceLabels: ['The problem…', 'The character responds by…', 'The story shows that…'],
    checkLabels: ['My message is broader than one event.', 'I used the character’s actions and the ending.', 'My evidence supports the same message.']
  },
  poetry: {
    title: 'Read poetry closely',
    learnerMove: 'Reread the named lines or stanza, notice the poet’s images and word choices, and explain the picture or feeling they create.',
    steps: ['Reread the lines aloud', 'Notice words and images', 'Explain their effect'],
    tapLabels: ['I reread aloud', 'I noticed an image or word', 'I can explain the effect'],
    responseFrame: 'The words ___ create an image or feeling of ___ .',
    evidenceLabels: ['The poet describes…', 'The words or image…', 'This helps the reader imagine or feel…'],
    checkLabels: ['I used the named lines or stanza.', 'I explained an image or word choice.', 'I connected the language to its effect.']
  }
};

const q = (
  unitId: string,
  weekNumber: number,
  questionNumber: number,
  selectionRole: ReadingSelection['role'],
  selectionTitle: string,
  strategy: ReadingStrategy,
  learningGoal: string,
  prompt: string
): ReadingEvidenceQuestion => ({
  id: `${unitId}-q${questionNumber}`,
  unitId,
  unitNumber: Number(unitId.slice(1)),
  weekNumber,
  questionNumber,
  selectionRole,
  selectionTitle,
  strategy,
  learningGoal,
  prompt
});

export const READING_EVIDENCE_QUESTIONS: ReadingEvidenceQuestion[] = [
  q('u1', 1, 1, 'Short Read 1', 'Working Together', 'inference', 'Infer what people are like from their actions.', 'The citizens of Fargo, North Dakota, paid attention to the National Weather Service’s predictions. What does this tell you about the people of Fargo?'),
  q('u1', 1, 2, 'Short Read 1', 'Working Together', 'text-feature', 'Use a map to understand flood risk.', 'Look at the map on page 4. What does the location of Fargo tell you about the flood risk in the state?'),
  q('u1', 1, 3, 'Short Read 2', 'Election Day', 'theme', 'Determine the message created by words and a timeline.', 'Reread the last two sentences of the text and the last section of the timeline on page 9. What message does the author want to share with readers?'),
  q('u1', 1, 4, 'Short Read 2', 'Election Day', 'text-feature', 'Explain how a photograph adds information.', 'Reread paragraph 7 and review the photograph on page 8. How does the photograph help you understand the information in the text?'),
  q('u1', 2, 5, 'Extended Read 1', 'It Is My Right!', 'sequence', 'Trace a person’s actions across time.', 'Reread paragraphs 1–4. What did Alice Paul do when she was in England? What did she do after she returned to America?'),
  q('u1', 2, 6, 'Extended Read 1', 'It Is My Right!', 'compare', 'Compare actions taken to create change.', 'How were the actions of Alice Paul, Dr. Martin Luther King, or Cesar Chavez similar to the actions of the officials in Fargo, North Dakota?'),
  q('u1', 2, 7, 'Extended Read 1', 'It Is My Right!', 'cause-effect', 'Explain why movements began.', 'What sparked the beginning of each movement discussed in the text? Why did people want to speak out and organize?'),
  q('u1', 2, 8, 'Extended Read 1', 'It Is My Right!', 'text-evidence', 'Explain the meaning of a historical change.', 'What did the addition of the Nineteenth Amendment to the Constitution mean for women’s rights?'),
  q('u1', 3, 9, 'Extended Read 2', 'Winning the Right to Vote', 'main-idea', 'Determine the main idea of a section.', 'What is the main idea of paragraphs 4–5?'),
  q('u1', 3, 10, 'Extended Read 2', 'Winning the Right to Vote', 'main-idea', 'Connect a title to the text’s central idea.', 'Why is “Winning the Right to Vote” an appropriate title for this text?'),

  q('u2', 1, 1, 'Short Read 1', 'Two Fables from Aesop: The Peasant and the Apple Tree and The Fox and the Crow', 'character', 'Infer a trait from a character’s actions.', 'Reread “The Peasant and the Apple Tree.” What do the peasant’s actions reveal about him?'),
  q('u2', 1, 2, 'Short Read 1', 'Two Fables from Aesop: The Peasant and the Apple Tree and The Fox and the Crow', 'character', 'Explain how a trait affects an event.', 'Reread “The Fox and the Crow.” Which of Crow’s character traits make her fall for Fox’s trick?'),
  q('u2', 1, 3, 'Short Read 2', 'Two Famous Poems: The Ballad of John Henry and The Village Blacksmith', 'text-feature', 'Connect an illustration to lines of poetry.', 'Look at the illustration at the top of page 7 and reread lines 11–15 of “The Ballad of John Henry.” How does the illustration help you understand what is described in these lines?'),
  q('u2', 1, 4, 'Short Read 2', 'Two Famous Poems: The Ballad of John Henry and The Village Blacksmith', 'vocabulary', 'Use context to determine a word’s meaning.', 'Reread “The Village Blacksmith.” What does the word “brawny” in line 5 mean? What context clues help reveal the meaning of the word?'),
  q('u2', 2, 5, 'Extended Read 1', 'The Tale of King Midas: A Greek Myth', 'cause-effect', 'Explain what causes a character’s reaction.', 'Reread paragraph 6. Why does King Midas get upset when he looks at his garden?'),
  q('u2', 2, 6, 'Extended Read 1', 'The Tale of King Midas: A Greek Myth', 'character', 'Infer a character’s feelings from the text.', 'Reread paragraphs 19–22. How does Dionysus feel about Midas’s wish?'),
  q('u2', 2, 7, 'Extended Read 1', 'The Tale of King Midas: A Greek Myth', 'theme', 'Determine the lesson learned by a character.', 'What lesson does King Midas learn by the end of the story?'),
  q('u2', 3, 8, 'Extended Read 2', 'Snow White: A Russian Folktale', 'sequence', 'Trace a problem and what happens next.', 'What problem do Marie and Ivan face at the beginning of the story? What happens after the stranger visits?'),
  q('u2', 3, 9, 'Extended Read 2', 'Snow White: A Russian Folktale', 'cause-effect', 'Explain how one character changes others’ lives.', 'How does Snow White change Marie and Ivan’s lives?'),
  q('u2', 3, 10, 'Extended Read 2', 'Snow White: A Russian Folktale', 'cause-effect', 'Use story details to explain a decision.', 'Why does Snow White stay indoors when the weather turns warmer?'),

  q('u3', 1, 1, 'Short Read 1', 'Animal Disguises', 'text-evidence', 'Explain camouflage with a text example.', 'How do most animals camouflage themselves? Give an example of one animal mentioned in the text.'),
  q('u3', 1, 2, 'Short Read 1', 'Animal Disguises', 'cause-effect', 'Predict an effect using information from the text.', 'Reread page 5. What would happen to these animals if they did not have the ability to camouflage themselves?'),
  q('u3', 1, 3, 'Short Read 2', 'Animals’ Tools for Survival', 'cause-effect', 'Explain how an adaptation supports survival.', 'Why are adaptations important to many animals’ survival? Give an example of one animal mentioned in the text.'),
  q('u3', 1, 4, 'Short Read 2', 'Animals’ Tools for Survival', 'text-feature', 'Infer information from a chart.', 'Review the Animal Body Parts chart on page 9. What can you infer about animal adaptations from the information in the chart?'),
  q('u3', 2, 5, 'Extended Read 1', 'Fur, Skin, Scales, or Feathers', 'text-feature', 'Combine information from a map and paragraph.', 'Look at the map on page 13 and reread paragraph 9. In which regions are frogs most likely to be found? Why?'),
  q('u3', 2, 6, 'Extended Read 1', 'Fur, Skin, Scales, or Feathers', 'compare', 'Compare two body coverings.', 'Reread “Furry Coats” and “Fantastic Feathers.” How are fur and feathers—and the animals that are covered in them—alike? How are they different?'),
  q('u3', 2, 7, 'Extended Read 1', 'Fur, Skin, Scales, or Feathers', 'main-idea', 'Determine a section’s main idea and details.', 'Reread “Dry Scales.” What is the main idea of this section? What details does the author include to support the main idea?'),
  q('u3', 3, 8, 'Extended Read 2', 'One Body, Many Adaptations', 'vocabulary', 'Use words and a photograph as context clues.', 'Reread paragraph 4 and look at the photograph on the page. What does the word “projections” mean? What context clues help reveal the meaning of the word?'),
  q('u3', 3, 9, 'Extended Read 2', 'One Body, Many Adaptations', 'main-idea', 'Use signal words to find supporting details.', 'Reread paragraphs 8–10. What is the main idea of this section? What signal words help point to the supporting details the author provides?'),
  q('u3', 3, 10, 'Extended Read 2', 'One Body, Many Adaptations', 'text-feature', 'Explain how several text features support meaning.', 'Reread paragraphs 13–20. Name the text features that appear in this section. How do these features help you understand the information presented in the text?'),

  q('u4', 1, 1, 'Short Read 1', 'Cinderella’s Very Bad Day', 'character', 'Explain a character’s response to a problem.', 'According to Cinderella, how do her stepsisters and stepmother treat her? How does Cinderella respond to their treatment?'),
  q('u4', 1, 2, 'Short Read 1', 'Cinderella’s Very Bad Day', 'vocabulary', 'Use context clues to determine meaning.', 'Reread paragraphs 1–3. What does the word “toil” mean? What context clues reveal the meaning of the word?'),
  q('u4', 1, 3, 'Short Read 2', 'Cinderella, Too Much for Words', 'compare', 'Compare two versions of a character’s story.', 'How are “Cinderella’s Very Bad Day” and “Cinderella, Too Much for Words” alike? How do they differ?'),
  q('u4', 1, 4, 'Short Read 2', 'Cinderella, Too Much for Words', 'point-of-view', 'Connect a title to characters’ viewpoints.', 'Why is the title of this story an appropriate choice? How does the title relate to what the stepsisters and stepmother think of Cinderella?'),
  q('u4', 2, 5, 'Extended Read 1', 'Jack and the Beanstalk', 'cause-effect', 'Explain what causes a character’s reaction.', 'Why does Jack’s mother get upset over the trade Jack made with the butcher?'),
  q('u4', 2, 6, 'Extended Read 1', 'Jack and the Beanstalk', 'inference', 'Use earlier events to explain a later action.', 'Based on Jack’s previous encounters with the giantess, why does he sneak into her house the third time?'),
  q('u4', 2, 7, 'Extended Read 1', 'Jack and the Beanstalk', 'character', 'Explain how a character uses others.', 'How does Jack take advantage of the giantess and her husband, the giant?'),
  q('u4', 3, 8, 'Extended Read 2', 'The True Jack?', 'point-of-view', 'Compare several characters’ views.', 'Each person in the play feels differently about Jack. What is each person’s point of view? Why do they have different opinions of Jack?'),
  q('u4', 3, 9, 'Extended Read 2', 'The True Jack?', 'character', 'Find evidence of a character trait across texts.', 'Mom says that Jack acts first and thinks later. The host calls this behavior “impulsive.” What other examples of Jack’s impulsive behavior can be found in “Jack and the Beanstalk”?'),
  q('u4', 3, 10, 'Extended Read 2', 'The True Jack?', 'point-of-view', 'Explain how new information changes a viewpoint.', 'Reread the first three lines on page 29. How do these lines change your view of Jack’s crimes in “Jack and the Beanstalk”?'),

  q('u5', 1, 1, 'Short Read 1', 'Alexander Graham Bell: “It Talks!”', 'cause-effect', 'Connect prior knowledge to an invention.', 'What did Alexander Graham Bell already know about sound that helped him create his “electrical speech machine”?'),
  q('u5', 1, 2, 'Short Read 1', 'Alexander Graham Bell: “It Talks!”', 'vocabulary', 'Explain a word using the invention’s impact.', 'Why does the author call Bell’s invention “revolutionary”?'),
  q('u5', 1, 3, 'Short Read 2', 'From Telephone to FaceTime!', 'text-feature', 'Combine a paragraph and photograph.', 'Reread paragraph 5 and look at the photograph on page 7. Why were so many switchboard operators needed?'),
  q('u5', 1, 4, 'Short Read 2', 'From Telephone to FaceTime!', 'main-idea', 'Connect a section title to its information.', 'Reread “Off-the-Wall Technology.” Why is this an appropriate title for this section?'),
  q('u5', 2, 5, 'Extended Read 1', 'Thomas Edison: “It Sings!”', 'sequence', 'Explain a process using text and a visual.', 'Reread paragraph 4 and look at the photograph of the telegraph code. How did Edison use the dots and dashes to translate coded messages?'),
  q('u5', 2, 6, 'Extended Read 1', 'Thomas Edison: “It Sings!”', 'cause-effect', 'Explain why an invention would be useful.', 'In 1871, Edison invented a new type of stock ticker that sent prices of company stock shares through telegraphs. Why would a business have wanted to buy this invention?'),
  q('u5', 2, 7, 'Extended Read 1', 'Thomas Edison: “It Sings!”', 'character', 'Explain how traits affect a person’s actions.', 'How did Edison’s personality and ambition inspire him to open his laboratory?'),
  q('u5', 3, 8, 'Extended Read 2', 'From Phonograph to Playlist', 'cause-effect', 'Trace how changes led to improvement.', 'How did other inventors’ changes to Edison’s phonograph help Edison improve the invention?'),
  q('u5', 3, 9, 'Extended Read 2', 'From Phonograph to Playlist', 'compare', 'Compare two inventions.', 'How were the phonograph and the gramophone similar? How were they different?'),
  q('u5', 3, 10, 'Extended Read 2', 'From Phonograph to Playlist', 'compare', 'Synthesize evidence across two texts.', 'How did Edison’s and Bell’s inventions allow people to communicate and share ideas with others? Use evidence from at least two texts to support your answer.'),

  q('u6', 1, 1, 'Short Read 1', 'The Fox and the Geese', 'character', 'Explain a character’s choice.', 'Why doesn’t Fox eat the geese while he has the chance?'),
  q('u6', 1, 2, 'Short Read 1', 'The Fox and the Geese', 'sequence', 'Explain how characters solve a problem.', 'How do the geese solve their problem?'),
  q('u6', 1, 3, 'Short Read 2', 'The Three Spinsters', 'point-of-view', 'Compare characters’ opinions.', 'What is the girl’s opinion about spinning? How does her opinion differ from the spinsters’ opinion about spinning?'),
  q('u6', 1, 4, 'Short Read 2', 'The Three Spinsters', 'compare', 'Compare the results of two tricks.', 'The characters in “The Three Spinsters” and “The Fox and the Geese” trick others to solve their problem. How does the result of both tricks differ?'),
  q('u6', 2, 5, 'Extended Read 1', 'Doctor Knowall', 'inference', 'Infer a trait from advice.', 'At the beginning of the story, the kind doctor gives Crabb advice about how to become a doctor. What can you infer about the kind doctor based on his advice to Crabb?'),
  q('u6', 2, 6, 'Extended Read 1', 'Doctor Knowall', 'compare', 'Compare characters across two stories.', 'Reread “The Three Spinsters.” How is the girl in “The Three Spinsters” different from Dr. Knowall?'),
  q('u6', 2, 7, 'Extended Read 1', 'Doctor Knowall', 'text-evidence', 'Explain why a quotation matters to the plot.', 'Dr. Knowall says, “Grete, that is the first.” Why are these specific words important to the story?'),
  q('u6', 3, 8, 'Extended Read 2', 'The Wolf and the Fox', 'text-feature', 'Use an illustration and text together.', 'Reread paragraph 1. Then look at the illustration below it. How does the illustration help you understand Fox and Wolf’s relationship?'),
  q('u6', 3, 9, 'Extended Read 2', 'The Wolf and the Fox', 'character', 'Explain a character’s motivation.', 'Why does Fox want to get rid of Wolf?'),
  q('u6', 3, 10, 'Extended Read 2', 'The Wolf and the Fox', 'vocabulary', 'Use context clues to determine meaning.', 'What does the word “glutton” mean? What context clues help reveal the meaning of the word?'),

  q('u7', 1, 1, 'Short Read 1', 'Exploring My Community', 'main-idea', 'Identify why a place is important.', 'Reread paragraph 3. According to the author, what makes St. Augustine a popular tourist destination?'),
  q('u7', 1, 2, 'Short Read 1', 'Exploring My Community', 'text-evidence', 'Locate a precise fact in the text.', 'How old are some of the buildings in St. Augustine?'),
  q('u7', 1, 3, 'Short Read 2', 'A New Life in Vermont', 'character', 'Infer a trait from actions across a story.', 'What can you conclude about Mami based on her actions throughout the story?'),
  q('u7', 1, 4, 'Short Read 2', 'A New Life in Vermont', 'cause-effect', 'Explain a family’s unusual decision.', 'Why does the family eat peculiar things for dinner that night?'),
  q('u7', 2, 5, 'Extended Read 1', 'All Kinds of Communities', 'vocabulary', 'Interpret figurative historical language.', 'Reread paragraph 9. What does Mason Streeter mean when he says, “Cotton was king here until 1925”?'),
  q('u7', 2, 6, 'Extended Read 1', 'All Kinds of Communities', 'cause-effect', 'Explain why a geographic feature is important.', 'Why does Keisha Paul think the Mississippi River is so important to St. Louis, Missouri?'),
  q('u7', 2, 7, 'Extended Read 1', 'All Kinds of Communities', 'compare', 'Compare essays using words and images.', 'How is the essay about Los Angeles different from the essays on Farmersville and St. Louis? Look at both the text and images of each essay.'),
  q('u7', 3, 8, 'Extended Read 2', 'Sarah and the Chickens', 'point-of-view', 'Compare two characters’ feelings.', 'How do Sarah’s and Anna’s feelings about life on the prairie differ?'),
  q('u7', 3, 9, 'Extended Read 2', 'Sarah and the Chickens', 'compare', 'Compare life in two settings.', 'What must Sarah learn to do on the prairie that she did not have to know how to do while living in Maine?'),
  q('u7', 3, 10, 'Extended Read 2', 'Sarah and the Chickens', 'inference', 'Use a late-story detail to predict a decision.', 'Reread paragraph 44. Will Sarah stay on the prairie? Why or why not?'),

  q('u8', 1, 1, 'Short Read 1', 'Fairweather Clouds', 'poetry', 'Interpret a stanza’s description.', 'Reread the third stanza of the poem. What does the author describe?'),
  q('u8', 1, 2, 'Short Read 1', 'Fairweather Clouds', 'text-feature', 'Explain how photographs illustrate poetry.', 'How do the two photographs on page 5 work together to illustrate the descriptions in the third and fourth stanzas of the poem?'),
  q('u8', 1, 3, 'Short Read 2', 'Earth’s Weather and Climate', 'cause-effect', 'Predict the effect of changing conditions.', 'Reread paragraph 4. What would happen if temperature and precipitation levels changed in a climate zone?'),
  q('u8', 1, 4, 'Short Read 2', 'Earth’s Weather and Climate', 'text-feature', 'Read a climate map and explain a pattern.', 'Look at the map on page 8. What two cities have the same climate? Why do they have the same climate?'),
  q('u8', 2, 5, 'Extended Read 1', 'Water Sky', 'vocabulary', 'Interpret a character’s figurative statement.', 'In paragraph 9, Lincoln says, “I have walked into those pictures.” What does Lincoln mean by these words?'),
  q('u8', 2, 6, 'Extended Read 1', 'Water Sky', 'compare', 'Compare clothing using text and illustration.', 'Why does Kusiq think that Lincoln needs “Eskimo clothes”? Based on the illustration on page 18, how are Kusiq’s clothes different from Lincoln’s?'),
  q('u8', 2, 7, 'Extended Read 1', 'Water Sky', 'cause-effect', 'Explain what changes a character’s feelings.', 'Lincoln is suddenly unsure about his visit to Barrow. What changes his feelings about the climate of Barrow?'),
  q('u8', 3, 8, 'Extended Read 2', 'The Tropical Rain Belt', 'cause-effect', 'Explain how geographic forces affect climate.', 'How do the equator and the Intertropical Convergence Zone (ITCZ) affect tropical regions?'),
  q('u8', 3, 9, 'Extended Read 2', 'The Tropical Rain Belt', 'text-feature', 'Draw conclusions from a graph.', 'Look at the graph on page 27. What can you conclude about the average rainfall for Lagos and Kano from March to October? What is significant about the average monthly rainfall in August?'),
  q('u8', 3, 10, 'Extended Read 2', 'The Tropical Rain Belt', 'text-feature', 'Infer daily-life effects from photographs.', 'Look at the photographs on pages 28–29. Based on these photos, how does Nigeria’s tropical climate affect people’s daily lives?'),

  q('u9', 1, 1, 'Short Read 1', 'Making Choices: Ben Franklin’s “Two Cents” and The Ant and the Grasshopper', 'character', 'Compare a choice with others’ reactions.', 'What does the grasshopper choose to do instead of gathering food? How do the ants feel about the grasshopper’s actions?'),
  q('u9', 1, 2, 'Short Read 1', 'Making Choices: Ben Franklin’s “Two Cents” and The Ant and the Grasshopper', 'vocabulary', 'Use a moral as context for a word.', 'Reread the moral at the bottom of page 5. What does “necessity” mean? What context clues help reveal the meaning of the word?'),
  q('u9', 1, 3, 'Short Read 2', 'Let It Grow: The Booming Business of Farmers’ Markets', 'sequence', 'Explain what someone must do to succeed.', 'There can be many stands or booths at a farmers’ market. What must a farmer do to become successful?'),
  q('u9', 1, 4, 'Short Read 2', 'Let It Grow: The Booming Business of Farmers’ Markets', 'main-idea', 'Identify values supported by choices.', 'In the last paragraph, Michael Pollan says, “You support a lot of values when you shop at the farmers’ market.” What values are mentioned in this text?'),
  q('u9', 2, 5, 'Extended Read 1', 'Lazy Harry', 'sequence', 'Identify a problem and proposed solution.', 'On page 13, the narrator says, “Harry sighed. He had to solve his problem.” What problem does Harry have? What solution does he think of?'),
  q('u9', 2, 6, 'Extended Read 1', 'Lazy Harry', 'inference', 'Infer why an author chose an animal.', 'Why do you think the Brothers Grimm chose bees for this fable?'),
  q('u9', 2, 7, 'Extended Read 1', 'Lazy Harry', 'compare', 'Contrast two sayings and their lessons.', 'Lazy Harry says, “He who rises early…wastes his substance.” How does this belief contrast with Ben Franklin’s proverb, “Early to bed, early to rise, makes a man healthy, wealthy, and wise”?'),
  q('u9', 3, 8, 'Extended Read 2', 'From Fruit to Jam: A Tasty List of Choices', 'cause-effect', 'Explain why careful planning is necessary.', 'Why must orange farmers carefully plan ahead for their crop of oranges?'),
  q('u9', 3, 9, 'Extended Read 2', 'From Fruit to Jam: A Tasty List of Choices', 'compare', 'Compare two production methods.', 'What are the key differences between the open-pan and vacuum-pan methods?'),
  q('u9', 3, 10, 'Extended Read 2', 'From Fruit to Jam: A Tasty List of Choices', 'vocabulary', 'Use context clues to determine meaning.', 'What does the word “organic” mean? What context clues help reveal the meaning of the word?'),

  q('u10', 1, 1, 'Short Read 1', 'Poems of Movement: “The Swing” and “The Wind”', 'poetry', 'Explain an experience described in a poem.', 'Reread “The Swing.” What does the poet find enjoyable about riding a swing?'),
  q('u10', 1, 2, 'Short Read 1', 'Poems of Movement: “The Swing” and “The Wind”', 'poetry', 'Interpret the meaning of poetic lines.', 'Reread lines 7–8 of “The Wind.” What does the poet mean by these words?'),
  q('u10', 1, 3, 'Short Read 2', 'What Makes Things Move?', 'cause-effect', 'Explain how a surface changes motion.', 'A ball is rolling on a sidewalk. Then it rolls onto the grass. Will the ball roll as fast on the grass as it did on the sidewalk? Why or why not?'),
  q('u10', 1, 4, 'Short Read 2', 'What Makes Things Move?', 'text-evidence', 'Identify forces acting on an object.', 'What forces act upon a moving swing?'),
  q('u10', 2, 5, 'Extended Read 1', 'The Great Tug-of-War', 'cause-effect', 'Explain why an action has an unexpected effect.', 'Why is Mmutla unaffected when Tlou blows a trunkful of air toward him? What is affected instead?'),
  q('u10', 2, 6, 'Extended Read 1', 'The Great Tug-of-War', 'cause-effect', 'Explain balanced forces in a story event.', 'Why does the tug-of-war last so long? Why does the rope not give with Tlou and Kubu each pulling on it?'),
  q('u10', 2, 7, 'Extended Read 1', 'The Great Tug-of-War', 'character', 'Distinguish physical strength from another strength.', 'Mmutla is not physically strong, but what kind of strength does he have?'),
  q('u10', 3, 8, 'Extended Read 2', 'Investigate: Magnetism', 'vocabulary', 'Use context clues to determine meaning.', 'Reread paragraph 10. What does the word “repel” mean? What context clues help reveal the meaning of the word?'),
  q('u10', 3, 9, 'Extended Read 2', 'Investigate: Magnetism', 'cause-effect', 'Predict what happens when charged and uncharged objects meet.', 'You have one balloon charged with static electricity and one balloon that is not charged. What would happen if you put them next to each other?'),
  q('u10', 3, 10, 'Extended Read 2', 'Investigate: Magnetism', 'text-evidence', 'Identify examples supported by the text.', 'What three technological inventions mentioned in this text are powered by magnetism?')
];

export const readingQuestionsForUnit = (unitId: string): ReadingEvidenceQuestion[] =>
  READING_EVIDENCE_QUESTIONS.filter((question) => question.unitId === unitId);

export const readingQuestionsForWeek = (unitId: string, weekNumber: number): ReadingEvidenceQuestion[] =>
  READING_EVIDENCE_QUESTIONS.filter((question) => question.unitId === unitId && question.weekNumber === weekNumber);

export const readingQuestionByNumber = (unitId: string | null, questionNumber: number): ReadingEvidenceQuestion | undefined =>
  READING_EVIDENCE_QUESTIONS.find((question) => question.unitId === unitId && question.questionNumber === questionNumber);

export const readingStrategyGuide = (strategy: ReadingStrategy): ReadingStrategyGuide => STRATEGY_GUIDES[strategy];

export const readingQuestionUnit = (question: ReadingEvidenceQuestion): ReadingUnit =>
  readingUnitById(question.unitId) ?? (() => { throw new Error(`Missing Reading unit ${question.unitId}`); })();
