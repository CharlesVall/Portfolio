import { Component, input } from '@angular/core';
import { Technology } from '@core/models';

@Component({
  selector: 'app-details-displayer',
  imports: [],
  templateUrl: './details-displayer.html',
  styleUrl: './details-displayer.scss',
})
export class DetailsDisplayer {
  public readonly details = input.required<Technology>();
}
