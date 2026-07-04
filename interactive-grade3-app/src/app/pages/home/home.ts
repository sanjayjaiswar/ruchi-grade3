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
    m1: { accent: '#4285f4', strong: '#1a73e8', soft: '#e8f0fe', muted: '#d2e3fc' },
    m2: { accent: '#ea4335', strong: '#c5221f', soft: '#fce8e6', muted: '#fad2cf' },
    m3: { accent: '#fbbc04', strong: '#b06000', soft: '#fef7e0', muted: '#feefc3' },
    m4: { accent: '#34a853', strong: '#188038', soft: '#e6f4ea', muted: '#ceead6' },
    m5: { accent: '#4285f4', strong: '#174ea6', soft: '#e8f0fe', muted: '#d2e3fc' },
    m6: { accent: '#ea4335', strong: '#a50e0e', soft: '#fce8e6', muted: '#fad2cf' },
    m7: { accent: '#34a853', strong: '#0d652d', soft: '#e6f4ea', muted: '#ceead6' }
  };

  constructor(private readonly title: Title) {
    this.title.setTitle('Ruchika Grade 3 Maths | Home');
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
