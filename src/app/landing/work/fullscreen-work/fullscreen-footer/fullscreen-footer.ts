import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fullscreen-footer',
  imports: [],
  templateUrl: './fullscreen-footer.html',
  styleUrl: './fullscreen-footer.scss',
})
export class FullscreenFooter {
  public readonly workAlt = input.required<string>();
}
