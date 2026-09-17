import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { HomeworkPicture } from './homework-picture';

type Mode = 'concept' | 'blank' | 'solved';

@Component({
  selector: 'app-spelling-lesson5',
  imports: [RouterLink, NgTemplateOutlet, HomeworkPicture],
  templateUrl: './spelling-lesson5.html',
  styleUrls: ['./homework.css', './spelling-lesson5.css']
})
export class SpellingLesson5Page {
  mode: Mode = 'concept';
  readonly modes: Mode[] = ['concept', 'blank', 'solved'];
  soundIndex = 0;
  scienceIndex = 0;
  riddleStep = 0;
  readonly soundPatterns = [
    { pattern: 'oo', words: [{ before: 'c', sound: 'oo', after: 'l' }, { before: 'n', sound: 'oo', after: 'n' }, { before: 'r', sound: 'oo', after: 't' }], hint: 'Two o’s work together. Hold the sound as you say each word.' },
    { pattern: 'ew', words: [{ before: 'gr', sound: 'ew', after: '' }, { before: 'd', sound: 'ew', after: '' }], hint: 'Listen to the end of grew and dew. Here, ew spells the same sound.' },
    { pattern: 'ue', words: [{ before: 'tr', sound: 'ue', after: '' }, { before: 'cl', sound: 'ue', after: '' }], hint: 'Look at the last two letters of true and clue. Here, ue spells the same sound.' }
  ];
  readonly pictureWords = [
    { word: 'dew', label: 'Water droplets resting on a leaf', heading: 'Tiny drops on a cool leaf', detail: 'Look for the small drops sitting on the leaf. Those drops are dew.' },
    { word: 'dune', label: 'Wind blowing above a hill of sand', heading: 'A hill made of sand', detail: 'Follow the curved sandy hill. Wind can pile sand into a dune.' },
    { word: 'root', label: 'A plant with branching roots below the soil', heading: 'Look below the soil', detail: 'The brown branching parts are roots. They take in water for the plant.' },
    { word: 'pollute', label: 'A bottle and other litter making river water dirty', heading: 'Litter makes the water dirty', detail: 'Putting waste into the water can pollute it. Notice the rubbish floating in the river.' }
  ];
  readonly storyFrames = [
    { picture: 'characters', label: 'Two toy characters side by side', title: 'Who?', prompt: 'Name the movie and its main characters.', example: 'Toy Story: Woody and Buzz.', word: 'mood', use: 'Woody is in a bad mood.' },
    { picture: 'problem', label: 'A winding route with a question mark', title: 'What happens?', prompt: 'Tell the main problem and what the characters do.', example: 'The toys get lost and work together to return.', word: 'cool', use: 'Buzz has cool equipment.' },
    { picture: 'ending', label: 'A home and a check mark showing a successful return', title: 'How does it end?', prompt: 'Explain how the problem is solved.', example: 'They become friends and reunite with Andy.', word: 'true · move', use: 'True friends return during the family’s move.' }
  ];
  // Primary evidence: user-supplied Spectrum Spelling Grade 3 worksheet photos.
  // Page 24: tmp/homework/20260916_180329.jpg; page 25: tmp/homework/20260916_180345.jpg.
  // Prompts and letter positions are transcribed; solutions/explanations are app-authored.
  readonly clues = [
    { prompt: 'became bigger', word: 'grew', positions: [1], why: 'Grew is the past tense of grow. A plant grew when it became bigger.' },
    { prompt: 'midday', word: 'noon', positions: [2, 3], why: 'Noon is 12:00 in the daytime.' },
    { prompt: 'unable to find something', word: 'lose', positions: [3, 4], why: 'When you lose something, you cannot find it.' },
    { prompt: 'a law or order', word: 'rule', positions: [3], why: 'A rule tells you what you must or must not do.' },
    { prompt: 'a feeling', word: 'mood', positions: [2, 3], why: 'Your mood is how you feel, such as happy or sad.' },
    { prompt: 'to lift up and out', word: 'scoop', positions: [1], why: 'You scoop ice cream when you lift it out with a spoon or scoop.' },
    { prompt: 'real', word: 'true', positions: [4], why: 'A true story tells about something that really happened.' }
  ];
  readonly riddleTiles = this.clues.flatMap((clue, index) =>
    clue.positions.map(position => ({ letter: clue.word[position - 1], step: index + 1 }))
  );
  readonly scienceWords = ['dew', 'dune', 'root', 'pollute'];
  readonly science = [
    { prompt: 'a hill of sand', word: 'dune', why: 'Wind can pile sand into a hill called a dune.' },
    { prompt: 'water droplets', word: 'dew', why: 'Dew is small drops of water that form on cool surfaces, such as grass.' },
    { prompt: 'a plant part', word: 'root', why: 'A root usually grows underground and takes in water for the plant.' },
    { prompt: 'to spoil or make dirty', word: 'pollute', why: 'To pollute means to make air, water, or land dirty or harmful.' }
  ];
  readonly wordBank = ['cool', 'lose', 'true', 'mood', 'clue', 'dew', 'root', 'rule', 'noon', 'move', 'grew', 'scoop', 'pollute', 'dune'];
  readonly corrections = [
    { wrong: 'trew', word: 'true', why: 'A true story really happened. Spell this word with ue.' },
    { wrong: 'mude', word: 'mood', why: 'The mood is the feeling of the movie. Spell this word with oo.' },
    { wrong: 'clew', word: 'clue', why: 'A clue helps solve a mystery. Clue is the word needed here.' },
    { wrong: 'grue', word: 'grew', why: 'The suspense grew means it increased. Grew is spelled with ew.' },
    { wrong: 'loose', word: 'lose', why: 'Lose track means no longer know where someone is. Lose has one o and a /z/ sound at the end. Loose means free or not tight.' }
  ];

  constructor(title: Title) {
    title.setTitle('September 16 Homework | Words with the /ü/ Sound');
  }
}
