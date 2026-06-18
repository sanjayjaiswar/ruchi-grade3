import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { findModule, lessonTitle } from '../../data/curriculum.data';
import { ModuleMeta } from '../../data/curriculum.types';

@Component({
  selector: 'app-module-overview-page',
  imports: [NgFor, NgIf, NgStyle, RouterLink],
  templateUrl: './module-overview.html',
  styleUrl: './module-overview.css'
})
export class ModuleOverviewPage implements OnInit {
  module?: ModuleMeta;
  private readonly moduleThemes: Record<string, { accent: string; strong: string; soft: string; muted: string }> = {
    m1: { accent: '#c76a22', strong: '#8f470f', soft: '#fff1d8', muted: '#f5d49c' },
    m2: { accent: '#197c72', strong: '#0f5d55', soft: '#e1f6f1', muted: '#a9ddd3' },
    m3: { accent: '#6d5bd0', strong: '#4f3aa8', soft: '#eeebff', muted: '#c9c0ff' },
    m4: { accent: '#4f8a2f', strong: '#35681d', soft: '#ecf7df', muted: '#c3dfa8' },
    m5: { accent: '#c44f73', strong: '#943555', soft: '#ffedf2', muted: '#f4bfd0' },
    m6: { accent: '#2474a6', strong: '#18577d', soft: '#e5f4ff', muted: '#afd8f2' },
    m7: { accent: '#8a5a28', strong: '#684017', soft: '#fff0dc', muted: '#e8c494' }
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly title: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const moduleId = params.get('moduleId') ?? 'm1';
      this.module = findModule(moduleId);
      if (this.module) {
        this.title.setTitle(`Module ${this.module.number}: ${this.module.title} | Ruchika Grade 3 Math`);
      } else {
        this.title.setTitle('Module Not Found | Ruchika Grade 3 Math');
      }
    });
  }

  lessonLabel(lessonId: string): string {
    return `Lesson ${this.lessonNumber(lessonId)}`;
  }

  lessonObjective(lessonId: string): string {
    return this.module ? lessonTitle(this.module.id, lessonId).replace(/^Lesson\s+\d+:\s*/, '') : lessonId;
  }

  lessonNumber(lessonId: string): string {
    return lessonId.replace(/^m\d+-l/, '');
  }

  lessonCount(): number {
    return this.module?.topics.reduce((count, topic) => count + topic.lessonIds.length, 0) ?? 0;
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

  assessmentCheckpoint(): string {
    switch (this.module?.id) {
      case 'm1':
        return 'Mid-Module Assessment after Topic C; End-of-Module Assessment after Topic F.';
      case 'm2':
        return 'Mid-Module Assessment after Topic B; End-of-Module Assessment after Topic E.';
      case 'm3':
        return 'Mid-Module Assessment after Topic C; End-of-Module Assessment after Topic F.';
      case 'm4':
        return 'Mid-Module Assessment after Topic B; End-of-Module Assessment after Topic D.';
      case 'm5':
        return 'Mid-Module Assessment after Topic C; End-of-Module Assessment after Topic F.';
      case 'm6':
        return 'End-of-Module Assessment after Topic B.';
      case 'm7':
        return 'Mid-Module Assessment after Topic C; End-of-Module Assessment after Topic E; Topic F is year review.';
      default:
        return 'Assessment checkpoint unavailable for this route.';
    }
  }
}
