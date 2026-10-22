import { Component, input, signal } from '@angular/core';
import { TeachingImage } from './social-studies.lessons';

@Component({
  selector: 'app-social-studies-image',
  templateUrl: './social-studies-image.component.html',
  styleUrl: './social-studies-image.component.css'
})
export class SocialStudiesImage {
  readonly picture = input.required<TeachingImage>();
  readonly failedUrl = signal<string | null>(null);
}
