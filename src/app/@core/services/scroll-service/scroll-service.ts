import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { Injectable, NgZone, OnDestroy } from '@angular/core';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollToPlugin);

@Injectable({
  providedIn: 'root',
})
export class ScrollService {

  public scrollTo(id: string): void {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: `#${id}`, offsetY: 80 },
      ease: 'power3.inOut'
    });
  }

  public lenis: Lenis | undefined;

  constructor(private ngZone: NgZone) {
    this.init();
  }

  private init() {
    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      this.lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        this.lenis?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    });
  }

  ngOnDestroy() {
    this.lenis?.destroy();
  }
}

