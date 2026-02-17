import { Component, input } from '@angular/core';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-fullscreen-aside',
  imports: [RevealDirective],
  templateUrl: './fullscreen-aside.html',
  styleUrl: './fullscreen-aside.scss',
})
export class FullscreenAside {
  public readonly workTitle = input.required<string>();
  public readonly description = input.required<string>();
}

