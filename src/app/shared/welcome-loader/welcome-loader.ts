import { Component, input } from '@angular/core';

@Component({
  selector: 'app-welcome-loader',
  imports: [],
  templateUrl: './welcome-loader.html',
  styleUrl: './welcome-loader.css',
})
export class WelcomeLoader {
  msg = input.required<string>();
}
