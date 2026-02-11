import { Directive, ElementRef, inject, OnDestroy, afterNextRender, input } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnDestroy {
  private readonly element = inject(ElementRef);
  private observer?: IntersectionObserver;

  public readonly revealDelay = input();

  public constructor() {
    afterNextRender(() => {
      this.initObserver();
    });
  }

  private initObserver() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.animateIn();
        this.observer?.disconnect();
      }
    }, { threshold: 0.8 });

    this.observer.observe(this.element.nativeElement);
  }

  private animateIn() {
    this.element.nativeElement.animate([
      { opacity: 0, transform: 'translateY(30px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], {
      delay: this.revealDelay(),
      duration: 3000,
      easing: 'cubic-bezier(0.2, 1, 0.3, 1)',
      fill: 'forwards'
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}