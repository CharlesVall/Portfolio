import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-work-card',
  imports: [NgOptimizedImage],
  templateUrl: './work-card.html',
  styleUrl: './work-card.scss',
})
export class WorkCard {
  public readonly color = input<string>();
  public readonly imageUrl = input.required<string>();
  public readonly imageTitle = input<string>();
  public readonly imageAlt = input<string>();
  public readonly workTitle = input.required<string>();
  public readonly workAlt = input.required<string>();
  public readonly reverseOnMobile = input<boolean>();
}
