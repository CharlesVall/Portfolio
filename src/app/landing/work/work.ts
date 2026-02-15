import { Component, ElementRef, viewChild, inject, NgZone, afterNextRender, DestroyRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WorkCard } from './work-card/work-card';
import { RevealDirective } from "@shared/directives/reveal.directive";
import { WorkService } from '@core/services/work-service/work-service';
import { FullscreenWork } from './fullscreen-work/fullscreen-work';
import { WorkData } from '@core/models';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [WorkCard, RevealDirective, FullscreenWork],
  templateUrl: './work.html',
  styleUrls: ['./work.scss']
})
export class Work {
  private readonly ngZone = inject(NgZone);
  private readonly workService = inject(WorkService);
  private readonly destroyRef = inject(DestroyRef);
  private mm = gsap.matchMedia();

  private readonly container = viewChild.required<ElementRef>('container');
  private readonly wrapper = viewChild.required<ElementRef>('wrapper');
  protected readonly isWorkFullscreen = this.workService.isWorkFullscreen;
  protected readonly workDataList = this.workService.workDataList;
  
  public constructor() {
    afterNextRender(() => {
      requestAnimationFrame(() => {
        this.ngZone.runOutsideAngular(() => {
          this.initHorizontalScroll();
        });
      });
    });

    this.destroyRef.onDestroy(() => this.mm.revert());
  }
  
  private initHorizontalScroll(): void {
    gsap.registerPlugin(ScrollTrigger);

    const containerEl = this.container().nativeElement;
    const wrapperEl = this.wrapper().nativeElement;

    this.mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {

      const savedScroll = window.scrollY;

      const { isDesktop, isMobile, reduceMotion } = context.conditions as any;

      if (isDesktop && !reduceMotion) {
        ScrollTrigger.create({
          trigger: containerEl,
          pin: true,
          start: "top top",
          scrub: 1,
          end: () => `+=${wrapperEl.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          animation: gsap.to(wrapperEl, {
            x: () => -(wrapperEl.scrollWidth - window.innerWidth),
            ease: "none"
          })
        });
      }

      if (isMobile || reduceMotion) {
        gsap.set(wrapperEl, { clearProps: "all" });
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: savedScroll,
            behavior: 'auto'
          });
        });
      });
    });
  }

  protected openFullscreen(work: WorkData): void {
    this.workService.openFullscreen(work);
  }
}