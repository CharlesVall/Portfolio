import { Injectable, NgZone, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class ScrollService implements OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  
  public lenis: Lenis | undefined;
  private tickerUpdateFn?: (time: number) => void;

  public constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  private init() {
    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      this.lenis.on('scroll', ScrollTrigger.update);

      this.tickerUpdateFn = (time: number) => {
        this.lenis?.raf(time * 1000);
      };

      gsap.ticker.add(this.tickerUpdateFn);
      gsap.ticker.lagSmoothing(0);
    });
  }

  public scrollTo(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: `#${id}`, offsetY: 80 },
        ease: 'power3.inOut'
      });
    }
  }

  ngOnDestroy() {
    if (this.lenis) {
      this.lenis.destroy();
    }
    if (this.tickerUpdateFn) {
      gsap.ticker.remove(this.tickerUpdateFn);
    }
  }
}