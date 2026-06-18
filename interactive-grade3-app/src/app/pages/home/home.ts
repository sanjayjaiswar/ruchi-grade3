import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MODULES } from '../../data/curriculum.data';

@Component({
  selector: 'app-home-page',
  imports: [NgFor, NgIf, NgStyle, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomePage {
  modules = MODULES;

  private readonly moduleThemes: Record<string, { accent: string; strong: string; soft: string; muted: string }> = {
    m1: { accent: '#c76a22', strong: '#8f470f', soft: '#fff1d8', muted: '#f5d49c' },
    m2: { accent: '#197c72', strong: '#0f5d55', soft: '#e1f6f1', muted: '#a9ddd3' },
    m3: { accent: '#6d5bd0', strong: '#4f3aa8', soft: '#eeebff', muted: '#c9c0ff' },
    m4: { accent: '#4f8a2f', strong: '#35681d', soft: '#ecf7df', muted: '#c3dfa8' },
    m5: { accent: '#c44f73', strong: '#943555', soft: '#ffedf2', muted: '#f4bfd0' },
    m6: { accent: '#2474a6', strong: '#18577d', soft: '#e5f4ff', muted: '#afd8f2' },
    m7: { accent: '#8a5a28', strong: '#684017', soft: '#fff0dc', muted: '#e8c494' }
  };

  constructor(private readonly title: Title) {
    this.title.setTitle('Ruchika Grade 3 Math | Home');
  }

  moduleThemeVars(moduleId: string) {
    const theme = this.moduleThemes[moduleId] ?? this.moduleThemes['m1'];
    return {
      '--module-accent': theme.accent,
      '--module-accent-strong': theme.strong,
      '--module-accent-soft': theme.soft,
      '--module-accent-muted': theme.muted
    };
  }
}
