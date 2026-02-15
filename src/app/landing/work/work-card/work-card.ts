import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { WorkData } from '@core/models';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-work-card',
  imports: [NgOptimizedImage, RevealDirective],
  templateUrl: './work-card.html',
  styleUrl: './work-card.scss',
})
export class WorkCard {
  public readonly workData = input<WorkData>();
}
