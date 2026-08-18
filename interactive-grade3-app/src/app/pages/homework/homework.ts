import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

type HomeworkMode = 'concept' | 'blank' | 'solved';

type SpellingItem = {
  word: string;
  explanation: string;
};

type ContextItem = {
  before: string;
  answer: string;
  after: string;
  explanation: string;
};

@Component({
  selector: 'app-homework-page',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './homework.html',
  styleUrl: './homework.css'
})
export class HomeworkPage {
  mode: HomeworkMode = 'concept';

  readonly spellingWords: SpellingItem[] = [
    { word: 'bath', explanation: 'The a makes the short a sound heard in cat.' },
    { word: 'hobby', explanation: 'The first o makes the short o sound heard in hot.' },
    { word: 'than', explanation: 'The a makes the short a sound heard in cat.' },
    { word: 'damp', explanation: 'The a makes the short a sound heard in cat.' },
    { word: 'bottle', explanation: 'The first o makes the short o sound heard in hot.' },
    { word: 'lots', explanation: 'The o makes the short o sound heard in hot.' },
    { word: 'trash', explanation: 'The a makes the short a sound heard in cat.' },
    { word: 'flock', explanation: 'The o makes the short o sound heard in hot.' },
    { word: 'pocket', explanation: 'The first o makes the short o sound heard in hot.' },
    { word: 'flap', explanation: 'The a makes the short a sound heard in cat.' }
  ];

  readonly contextAnswers: ContextItem[] = [
    {
      before: 'I like science more',
      answer: 'than',
      after: ' any other subject at school.',
      explanation: 'Than follows more when two things are being compared.'
    },
    {
      before: 'Science is also my',
      answer: 'hobby',
      after: '.',
      explanation: 'A hobby is an activity someone enjoys doing in free time.'
    },
    {
      before: 'I always keep a pen and a notebook in my',
      answer: 'pocket',
      after: ' to record things that I see.',
      explanation: 'A pocket is a place where someone can carry small items.'
    },
    {
      before: 'Old pieces of glass that once were',
      answer: 'trash',
      after: ' were taken to the recycling center.',
      explanation: 'Trash means unwanted material that would otherwise be thrown away.'
    },
    {
      before: 'The recycled glass was made into a new',
      answer: 'bottle',
      after: '.',
      explanation: 'Bottle names an object commonly made from glass.'
    },
    {
      before: 'I noticed',
      answer: 'lots',
      after: ' of patches of soft, green moss.',
      explanation: 'Lots means many, which fits the plural noun patches.'
    },
    {
      before: 'The moss was growing in the',
      answer: 'damp',
      after: ' soil.',
      explanation: 'Damp means slightly wet, a condition in which moss commonly grows.'
    },
    {
      before: 'I watched a',
      answer: 'flock',
      after: ' of birds looking for worms.',
      explanation: 'Flock is a word for a group of birds.'
    },
    {
      before: 'The birds started to',
      answer: 'flap',
      after: ' their wings against the water.',
      explanation: 'Flap means to move wings up and down.'
    },
    {
      before: 'The birds were taking a',
      answer: 'bath',
      after: '.',
      explanation: 'Bath fits because the birds were splashing and cleaning themselves in water.'
    }
  ];

  readonly animalGroups = [
    { animal: 'cows', answer: 'herd', explanation: 'Herd is the usual group word for cows or other cattle.' },
    { animal: 'whales', answer: 'pod', explanation: 'Pod is a common group word for whales.' },
    { animal: 'ants', answer: 'colony', explanation: 'Ants that live together form a colony.' },
    { animal: 'geese', answer: 'gaggle', explanation: 'Gaggle is a group of geese, especially when they are on the ground.' },
    { animal: 'fish', answer: 'school', explanation: 'A group of fish swimming together is called a school.' },
    { animal: 'bees', answer: 'swarm', explanation: 'Swarm describes a large group of bees moving together.' },
    { animal: 'wolves', answer: 'pack', explanation: 'Wolves that live and hunt together form a pack.' },
    { animal: 'clams', answer: 'bed', explanation: 'A group of clams living together in one area is called a bed.' }
  ];

  readonly wordBank = ['pack', 'swarm', 'colony', 'school', 'pod', 'gaggle', 'herd', 'bed'];

  constructor(private readonly title: Title) {
    this.title.setTitle('August 17 Homework | Ruchika Grade 3 Learning Portal');
  }

  setMode(mode: HomeworkMode): void {
    this.mode = mode;
  }

  answer(value: string): string {
    return this.mode === 'solved' ? value : '';
  }
}
