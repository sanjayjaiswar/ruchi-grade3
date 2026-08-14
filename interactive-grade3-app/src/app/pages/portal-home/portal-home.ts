import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portal-home-page',
  imports: [RouterLink],
  templateUrl: './portal-home.html',
  styleUrl: './portal-home.css'
})
export class PortalHomePage {
  constructor(private readonly title: Title) {
    this.title.setTitle('Ruchika Grade 3 Learning Portal');
  }
}
