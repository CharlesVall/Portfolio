import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-title.html',
  styleUrls: ['./hero-title.scss']
})
export class HeroTitle implements OnInit, OnDestroy {

  protected line1 = signal('');
  protected line2 = signal('');
  
  protected alpha1 = signal(0);
  protected alpha2 = signal(0);
  
  protected cursor1 = signal('_');
  protected cursor2 = signal('');

  private intervalId: any;
  private fullText1 = 'Dev';
  private fullText2 = 'Fullstack';

  public ngOnInit(): void {
    let animationOffset = 0;
    let len1 = 0;
    let len2 = 0;

    this.intervalId = setInterval(() => {
      animationOffset++;
      const delta = 1;

      if (this.alpha1() < 1) this.alpha1.update(v => Math.min(v + 0.02 * delta, 1));
      if (this.alpha2() < 1) this.alpha2.update(v => Math.min(v + 0.008 * delta, 1));

      if (len1 < this.fullText1.length) {
        if (animationOffset % 7 === 0) {
          len1++;
          this.line1.set(this.fullText1.slice(0, len1));
          this.cursor1.set(len1 < this.fullText1.length ? '_' : '');
        }
      }

      if (len1 >= this.fullText1.length && len2 < this.fullText2.length && animationOffset >= 60) {
        if (animationOffset % 7 === 0) {
          len2++;
          this.line2.set(this.fullText2.slice(0, len2));
          this.cursor2.set(len2 < this.fullText2.length ? '_' : '');
        }
      }
    }, 11);
  }

  public ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}