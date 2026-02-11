import { Component, input, effect, ElementRef, inject, viewChildren, AfterViewInit } from '@angular/core';
import { Technology } from '@core/models';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-details-displayer',
  imports: [RevealDirective],
  templateUrl: './details-displayer.html',
  styleUrl: './details-displayer.scss',
})
export class DetailsDisplayer {
  public readonly details = input.required<Technology>();
}