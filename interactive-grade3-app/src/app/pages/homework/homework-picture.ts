import { Component, input } from '@angular/core';

// Original, curriculum-neutral illustrations. No worksheet photos or student details.
@Component({
  selector: 'app-homework-picture',
  templateUrl: './homework-picture.html',
  styles: [':host { display: block; } svg { display: block; width: 100%; height: auto; max-height: 190px; }']
})
export class HomeworkPicture {
  readonly kind = input.required<string>();
  readonly label = input.required<string>();
}
