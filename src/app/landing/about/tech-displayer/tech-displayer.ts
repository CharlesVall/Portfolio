import { Component, input } from '@angular/core';
import { Technology } from '@core/models';

@Component({
  selector: 'app-tech-displayer',
  imports: [],
  templateUrl: './tech-displayer.html',
  styleUrl: './tech-displayer.scss',
})
export class TechDisplayer {
  public readonly technology = input.required<Technology>(); 
}
