import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fullscreen-image',
  imports: [NgOptimizedImage],
  templateUrl: './fullscreen-image.html',
  styleUrl: './fullscreen-image.scss',
})
export class FullscreenImage {
  public readonly imageUrl = input.required<string>();
  public readonly imageTitle = input.required<string>();
  public readonly imageAlt = input.required<string>();
}
